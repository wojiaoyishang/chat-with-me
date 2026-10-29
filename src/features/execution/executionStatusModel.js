export const parseExecutionStatus = (content, conversationId = null) => {
    const raw = String(content ?? '').trim();
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
        const executionId = String(parsed.executionId || '').trim();
        const statusId = String(parsed.statusId || '').trim();
        if (!executionId || !statusId) return null;
        return {...parsed, executionId, statusId, conversationId: String(parsed.conversationId || conversationId || '').trim()};
    } catch {
        return null;
    }
};

export const getExecutionDisplayState = (execution = {}) => {
    const inline = String(execution.inlineState || '').toLowerCase();
    const status = String(execution.status || '').toLowerCase();
    // A completed historical call stays completed when a later call in the same
    // execution fails. The execution's overall state only fills missing call state.
    if (inline === 'failed') return 'failed';
    if (inline === 'cancelled') return 'cancelled';
    if (inline === 'completed') return 'completed';
    if (inline === 'running') return execution.thinking?.paused ? 'paused' : 'running';
    if (['blocked', 'failed', 'recoverable_failed'].includes(status)) return 'failed';
    if (status === 'cancelled') return 'cancelled';
    if (status === 'recovering') return 'recovering';
    if (status === 'completed') return 'completed';
    if (execution.done) return 'historicalDone';
    if (execution.active) return execution.thinking?.paused ? 'paused' : 'running';
    return null;
};

const CALL_STATES = new Set(['running', 'completed', 'failed', 'cancelled']);
const TERMINAL_CALL_STATES = new Set(['completed', 'failed', 'cancelled']);

// Replacements and execution snapshots arrive independently. Reconcile only the
// matching concrete call; the execution's overall result cannot finish every row.
export const projectExecutionStatus = (execution, live = null) => {
    if (!execution || !live || execution.executionId !== live.executionId
        || (execution.conversationId && live.conversationId && execution.conversationId !== live.conversationId)
        || (execution.runId && live.runId && execution.runId !== live.runId)
        || Number(execution.updatedAt || 0) > Number(live.updatedAt || 0)) return execution;
    const direct = live.toolStatusNodes?.[execution.toolCallId];
    const node = direct?.statusId === execution.statusId ? direct
        : Object.values(live.toolStatusNodes || {}).find((item) => item?.statusId === execution.statusId
            && (!execution.toolCallId || !item?.toolCallId || item.toolCallId === execution.toolCallId));
    if (!node || !CALL_STATES.has(node.state)) return execution;
    // A snapshot hydrated from an older row may still contain a running copy of
    // a call that has already published its terminal replacement.
    if (TERMINAL_CALL_STATES.has(execution.inlineState) && node.state === 'running') return execution;
    return {
        ...execution,
        inlineState: node.state,
        done: TERMINAL_CALL_STATES.has(node.state),
        label: node.label ?? execution.label,
        action: node.action ?? execution.action,
        actionSource: node.actionSource ?? execution.actionSource,
        actionUpdatedAt: node.actionUpdatedAt ?? execution.actionUpdatedAt,
        thinking: live.thinking || execution.thinking,
    };
};

export const isWidgetExecutionGuidance = (activity) => activity?.source === 'widget_response'
    || String(activity?.id || '').startsWith('widget-');

export const isUserExecutionGuidance = (activity) => !isWidgetExecutionGuidance(activity)
    && (!activity?.source || activity.source === 'user_guidance');

export const isQueuedExecutionGuidance = (activity) => isUserExecutionGuidance(activity)
    && ['pending', 'submitting', 'removed'].includes(String(activity?.state || '').toLowerCase());

export const isVisibleExecutionGuidance = (activity) => isWidgetExecutionGuidance(activity)
    || (isUserExecutionGuidance(activity) && !isQueuedExecutionGuidance(activity)
        && !['withdrawn', 'replaced'].includes(String(activity?.state || '').toLowerCase()) && !activity?.replacedByGuidanceId);

export const getExecutionGuidance = (execution, live = null) => {
    const statusId = execution?.statusId;
    const hasLiveMap = live && Object.prototype.hasOwnProperty.call(live, 'guidancePrompts');
    const prompt = hasLiveMap ? live.guidancePrompts?.[statusId] || null
        : execution?.guidancePrompt || execution?.guidancePrompts?.[statusId] || null;
    const activities = (live?.activities || execution?.activities || []).filter((activity) =>
        String(activity?.kind || '').toLowerCase() === 'guidance'
        && String(activity?.anchorStatusId || '').trim() === statusId && isVisibleExecutionGuidance(activity));
    return {prompt, activities};
};

const LEGACY_KNOWLEDGE_READS = new Set([
    'list_databases', 'get_source_images', 'get_source_image', 'search_nodes_by_keywords',
    'get_related_graph', 'get_related_chunks', 'read_chunk_source', 'get_chunk_content',
    'get_relationship_between_nodes', 'get_nodes_extracted_from_chunk',
    'get_related_chunks_from_chunk', 'get_path_between_nodes', 'get_schema',
]);
const LEGACY_KNOWLEDGE_WRITES = new Set(['add_relationship', 'remove_relationship', 'add_node', 'remove_node']);

const getLegacyKnowledgeOperation = (names) => {
    if (!names.length || !names.every((name) => name.startsWith('knowledgeNetwork_'))) return null;
    const operations = names.map((name) => name.slice('knowledgeNetwork_'.length));
    if (operations.every((name) => LEGACY_KNOWLEDGE_READS.has(name))) return 'read';
    if (operations.every((name) => LEGACY_KNOWLEDGE_WRITES.has(name))) return 'mutation';
    return null;
};

export const getExecutionStatusGroupKey = (execution) => {
    if (!execution) return null;
    const state = getExecutionDisplayState(execution);
    if (!execution?.executionId || !execution?.statusId || !state) return null;
    const names = [...new Set((Array.isArray(execution.toolNames) ? execution.toolNames : [])
        .map((value) => String(value || '').trim()).filter(Boolean))].sort();
    const node = execution.toolStatusNodes?.[execution.toolCallId]
        || Object.values(execution.toolStatusNodes || {}).find((item) => item?.statusId === execution.statusId);
    const activity = execution.activities?.find?.((item) => item?.statusId === execution.statusId
        || (execution.toolCallId && item?.toolCallId === execution.toolCallId));
    const meta = node?.executionMeta || activity?.executionMeta || execution.executionMeta || {};
    // Older Python batches omitted executionMeta.toolset. Only recognize the
    // established knowledge-network namespace for those saved transcripts; an
    // arbitrary shared title or name prefix is not proof of a shared tool family.
    const knowledgeOperation = getLegacyKnowledgeOperation(names);
    const toolset = String(meta.toolset || (knowledgeOperation ? 'knowledgeNetwork' : '')).trim();
    const baseLabel = String(execution.label || '').trim().replace(/^正在\s*/, '')
        .replace(/\s*·\s*(?:执行中|已完成|已取消|已停止|失败)\s*$/, '').trim();
    const evidence = [...new Set((Array.isArray(meta.evidence) ? meta.evidence : [])
        .filter((item) => ['mutation', 'verification'].includes(item)))].sort();
    const operation = evidence.includes('mutation') ? 'mutation'
        : evidence.includes('verification') ? 'verification' : knowledgeOperation || 'unspecified';
    const family = toolset && names.length && baseLabel ? [
        'family', toolset, node?.phase || execution.phase || '',
        meta.promote === true ? 'promoted' : 'routed', operation, evidence, baseLabel,
    ] : null;
    // Modern tool rows have a stable identity even while their action and state
    // change. Keep the conservative, identical-label fallback for old transcripts.
    const identity = family || (names.length ? ['tool', names] : ['legacy', state, String(execution.label || '').trim()]);
    return JSON.stringify([execution.conversationId || '', execution.executionId, execution.runId || '', identity]);
};
