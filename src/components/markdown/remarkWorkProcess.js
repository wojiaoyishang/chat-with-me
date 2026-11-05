import {visit} from 'unist-util-visit';
import {normalizeReplacementEntry} from './replacementProtocol.js';
import {processIdentity, sameProcess, workProcessEntry} from '../../features/execution/workProcessModel.js';
import {hasExecutionGuidanceBoundary} from '../../features/execution/executionStatusModel.js';

/** Group adjacent reasoning/tool traces, leaving prose, results and interaction UIs in place. */
export function remarkWorkProcess({replacement = {}, renderSurface = 'conversation', snapshot = false} = {}) {
    return (tree) => {
        if (snapshot || renderSurface !== 'conversation') return;
        const entries = new WeakMap();
        const seenStatuses = new Set();
        // Old transcripts can contain the same outer-call token once per script
        // child. Retain the first host in document order, including nested blocks;
        // repeated tokens must not create another process/supplement boundary.
        visit(tree, 'cardReplace', (node) => {
            const props = node.data?.hProperties;
            const entry = workProcessEntry(replacement, String(props?.id || ''), String(props?.type || ''));
            entries.set(node, entry);
            if (!entry?.execution) return;
            const {conversationId, executionId, runId, statusId} = entry.execution;
            const identity = JSON.stringify([conversationId || '', executionId, runId || '', statusId]);
            if (seenStatuses.has(identity)) props.processHidden = 'true';
            else seenStatuses.add(identity);
        });
        visit(tree, (node) => Array.isArray(node.children), (parent) => {
            let group = null;
            const output = [];
            const flush = (tail = false) => {
                if (!group) return;
                const anchor = group.nodes[0];
                anchor.data.hProperties.processEntries = JSON.stringify(group.entries);
                anchor.data.hProperties.processTail = tail ? 'true' : 'false';
                // Retain every original host position. Late type/metadata arrival
                // must not renumber an already-mounted video or interaction below.
                for (const node of group.allNodes) {
                    if (node !== anchor && group.nodes.includes(node)) node.data.hProperties.processHidden = 'true';
                    output.push(node);
                }
                group = null;
            };
            for (const node of parent.children) {
                const props = node.type === 'cardReplace' ? node.data?.hProperties : null;
                const id = String(props?.id || '');
                const type = String(props?.type || '');
                if (props?.processHidden === 'true') {
                    if (group) group.allNodes.push(node);
                    else output.push(node);
                    continue;
                }
                const entry = entries.get(node);
                if (entry) {
                    const identity = processIdentity(entry);
                    if (group && !sameProcess(group.identity, identity)) flush();
                    group ||= {nodes: [], entries: [], allNodes: [], identity: {}};
                    for (const key of Object.keys(identity)) if (identity[key]) group.identity[key] = identity[key];
                    group.nodes.push(node);
                    group.allNodes.push(node);
                    group.entries.push({id, type: entry.type});
                    // The supplement renders below its anchor group. Work added
                    // after it belongs to a new group, including an empty active
                    // bridge before the next model output arrives.
                    if (hasExecutionGuidanceBoundary(entry.execution)) flush();
                    continue;
                }
                const other = id && normalizeReplacementEntry(replacement, id, type);
                // The stream emits a tool-result reference before (and sometimes
                // without) its frontend value. The renderer shows no content for
                // that slot, so it cannot split a visually continuous process.
                // Keep the host untouched: when real content arrives, the
                // grouping topology invalidates and restores its own boundary.
                const invisible = other && (!other.exists || (!other.snapshot && !other.contextStatus && (
                    other.type === 'executionWindowTool'
                    || (['markdown', 'executionStatus'].includes(other.type) && !other.content.trim()))));
                if (group && invisible) group.allNodes.push(node);
                else {
                    flush();
                    output.push(node);
                }
            }
            flush(true);
            parent.children = output;
        });
    };
}
