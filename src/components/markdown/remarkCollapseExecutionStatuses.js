import {visit} from 'unist-util-visit';

import {normalizeReplacementEntry} from './replacementProtocol.js';

const getCardId = (node) => String(node?.data?.hProperties?.id || '').trim();

const getDisplayState = (execution) => {
    const inlineState = String(execution.inlineState || '').toLowerCase();
    const status = String(execution.status || '').toLowerCase();
    const failed = inlineState === 'failed' || ['blocked', 'failed', 'recoverable_failed'].includes(status);
    const cancelled = inlineState === 'cancelled' || status === 'cancelled';
    const recovering = !inlineState && status === 'recovering';
    const completed = inlineState === 'completed' || status === 'completed';
    const historicalDone = Boolean(execution.done) && !failed && !cancelled && !completed;
    const active = inlineState === 'running' || (
        !inlineState && Boolean(execution.active) && !failed && !cancelled && !completed && !historicalDone
    );

    if (failed) return ['failed', status === 'blocked' ? '执行需要处理' : '执行失败'];
    if (cancelled) return ['cancelled', '执行已停止'];
    if (recovering) return ['recovering', '正在恢复执行'];
    if (completed) return ['completed', '执行完成'];
    if (historicalDone) return ['historicalDone', '阶段已完成'];
    if (active) return [execution.thinking?.paused ? 'paused' : 'running', '正在执行'];
    return null;
};

const getStatusSummary = (node, replacement) => {
    if (node?.type !== 'cardReplace') return null;
    const id = getCardId(node);
    if (!id) return null;

    const normalized = normalizeReplacementEntry(
        replacement,
        id,
        node.data?.hProperties?.type || '',
    );
    if (!normalized.exists || normalized.type !== 'executionStatus' || normalized.contextStatus) return null;

    try {
        const execution = JSON.parse(normalized.content);
        if (!execution || typeof execution !== 'object' || Array.isArray(execution)) return null;
        const executionId = String(execution.executionId || '').trim();
        const statusId = String(execution.statusId || '').trim();
        const state = getDisplayState(execution);
        if (!executionId || !statusId || !state) return null;

        // These rows contain visible details beneath the status line and must keep
        // their own place in the conversation rather than disappear into a group.
        const hasGuidance = Boolean(
            execution.guidancePrompt
            || execution.guidancePrompts?.[statusId]
            || execution.activities?.some?.((activity) =>
                String(activity?.kind || '').toLowerCase() === 'guidance'
                && String(activity?.anchorStatusId || '').trim() === statusId),
        );
        if (hasGuidance) return null;

        const label = String(execution.label || '').trim() || state[1];
        return {id, key: JSON.stringify([executionId, state[0], label])};
    } catch {
        return null;
    }
};

/**
 * Merge only adjacent, visually identical execution rows from the same run.
 * The replacement map and raw Markdown stay untouched; the last row remains
 * the primary navigation target, while groupedIds lets the UI expose older rows.
 */
export function remarkCollapseExecutionStatuses({replacement = {}} = {}) {
    return (tree) => {
        visit(tree, (node) => Array.isArray(node.children), (parent) => {
            const collapsed = [];
            let group = null;

            const flush = () => {
                if (!group) return;
                const latest = group.nodes[group.nodes.length - 1];
                if (group.nodes.length > 1) {
                    latest.data.hProperties.groupedIds = JSON.stringify(group.nodes.map(getCardId));
                }
                collapsed.push(latest);
                group = null;
            };

            for (const child of parent.children) {
                const summary = getStatusSummary(child, replacement);
                if (!summary) {
                    flush();
                    collapsed.push(child);
                    continue;
                }
                if (group?.key === summary.key) {
                    group.nodes.push(child);
                    continue;
                }
                flush();
                group = {key: summary.key, nodes: [child]};
            }
            flush();
            parent.children = collapsed;
        });
    };
}
