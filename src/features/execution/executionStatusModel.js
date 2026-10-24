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

export const getExecutionGuidance = (execution, live = null) => {
    const statusId = execution?.statusId;
    const prompt = live?.guidancePrompts?.[statusId]
        || execution?.guidancePrompt || execution?.guidancePrompts?.[statusId] || null;
    const activities = (live?.activities || execution?.activities || []).filter((activity) =>
        String(activity?.kind || '').toLowerCase() === 'guidance'
        && String(activity?.anchorStatusId || '').trim() === statusId);
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
