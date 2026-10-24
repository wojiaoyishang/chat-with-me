import {visit} from 'unist-util-visit';

import {normalizeReplacementEntry} from './replacementProtocol.js';
import {getExecutionStatusGroupKey, parseExecutionStatus} from '../../features/execution/executionStatusModel.js';

const getCardId = (node) => String(node?.data?.hProperties?.id || '').trim();
const sameExecution = (left, right) => left && right
    && left.executionId === right.executionId
    && (left.conversationId || '') === (right.conversationId || '')
    && (left.runId || '') === (right.runId || '');

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
 * host stays mounted while new calls arrive. A continuation is the current state
 * of the same stretch of work, not another tool call or a visual group boundary.
 * Original records stay in the replacement map for exact per-call navigation.
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
                if (group.continuation) {
                    anchor.data.hProperties.groupedIds = JSON.stringify(group.nodes.map(getCardId));
                    anchor.data.hProperties.continuationId = getCardId(group.continuation);
                }
                collapsed.push(anchor, ...group.hidden);
                group = null;
            };

            for (const child of parent.children) {
                const card = getCard(child, replacement);
                const execution = card?.type === 'executionStatus' ? parseExecutionStatus(card.content) : null;
                // Only explicit transient rows from the same run can be absorbed.
                // Other execution phases, feedback, unknown cards and real prose
                // retain their own position and split the group normally.
                if (execution?.inlineKind === 'continuation' && sameExecution(group?.execution, execution)) {
                    group.continuation = child;
                    continue;
                }
                // Cleared continuation rows and suppressed control tools (empty
                // markdown replacements) render nothing on either surface;
                // tool hosts only render in the Execution Window. Preserve their AST
                // hosts without splitting visually consecutive status records.
                // Missing/unknown cards and visible context badges still break.
                const invisible = (['executionStatus', 'markdown'].includes(card?.type) && !card.content.trim())
                    || (card?.type === 'executionWindowTool' && String(renderSurface).toLowerCase() !== 'execution_window');
                if (invisible && group) {
                    group.hidden.push(child);
                    continue;
                }
                const key = card?.type === 'executionStatus'
                    ? getExecutionStatusGroupKey(execution) : null;
                if (!key) {
                    flush();
                    collapsed.push(child);
                    continue;
                }
                if (group?.key === key) {
                    group.nodes.push(child);
                    group.continuation = null;
                    continue;
                }
                if (execution?.inlineKind === 'tool' && sameExecution(group?.execution, execution)) {
                    group.continuation = null;
                }
                flush();
                group = {key, execution, nodes: [child], hidden: [], continuation: null};
            }
            flush();
            parent.children = collapsed;
        });
    };
}
