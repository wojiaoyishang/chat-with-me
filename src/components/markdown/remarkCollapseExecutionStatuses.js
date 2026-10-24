import {visit} from 'unist-util-visit';

import {normalizeReplacementEntry} from './replacementProtocol.js';
import {getExecutionStatusGroupKey, parseExecutionStatus} from '../../features/execution/executionStatusModel.js';

const getCardId = (node) => String(node?.data?.hProperties?.id || '').trim();

const getCard = (node, replacement) => {
    if (node?.type !== 'cardReplace') return null;
    const id = getCardId(node);
    if (!id) return null;

    const normalized = normalizeReplacementEntry(
        replacement,
        id,
        node.data?.hProperties?.type || '',
    );
    return normalized.exists && !normalized.contextStatus ? normalized : null;
};

/**
 * Merge visually consecutive calls of the same tool in one execution. The first
 * host stays mounted while new calls arrive; each original record remains in the
 * replacement map and groupedIds preserves exact per-call navigation.
 */
export function remarkCollapseExecutionStatuses({replacement = {}, renderSurface = 'conversation'} = {}) {
    return (tree) => {
        visit(tree, (node) => Array.isArray(node.children), (parent) => {
            const collapsed = [];
            let group = null;

            const flush = () => {
                if (!group) return;
                const anchor = group.nodes[0];
                if (group.nodes.length > 1) {
                    anchor.data.hProperties.groupedIds = JSON.stringify(group.nodes.map(getCardId));
                }
                collapsed.push(anchor, ...group.hidden);
                group = null;
            };

            for (const child of parent.children) {
                const card = getCard(child, replacement);
                // Cleared continuation rows and suppressed control tools (empty
                // markdown replacements) render nothing on either surface;
                // tool hosts only render in the Task Window. Preserve their AST
                // hosts without splitting visually consecutive status records.
                // Missing/unknown cards and visible context badges still break.
                const invisible = (['executionStatus', 'markdown'].includes(card?.type) && !card.content.trim())
                    || (card?.type === 'taskWindowTool' && String(renderSurface).toLowerCase() !== 'task_window');
                if (invisible && group) {
                    group.hidden.push(child);
                    continue;
                }
                const key = card?.type === 'executionStatus'
                    ? getExecutionStatusGroupKey(parseExecutionStatus(card.content)) : null;
                if (!key) {
                    flush();
                    collapsed.push(child);
                    continue;
                }
                if (group?.key === key) {
                    group.nodes.push(child);
                    continue;
                }
                flush();
                group = {key, nodes: [child], hidden: []};
            }
            flush();
            parent.children = collapsed;
        });
    };
}
