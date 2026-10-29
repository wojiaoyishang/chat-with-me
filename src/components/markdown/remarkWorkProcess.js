import {visit} from 'unist-util-visit';
import {normalizeReplacementEntry} from './replacementProtocol.js';
import {processIdentity, sameProcess, workProcessEntry} from '../../features/execution/workProcessModel.js';

/** Group adjacent reasoning/tool traces, leaving prose, results and interaction UIs in place. */
export function remarkWorkProcess({replacement = {}, renderSurface = 'conversation', snapshot = false} = {}) {
    return (tree) => {
        if (snapshot || renderSurface !== 'conversation') return;
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
                const entry = id && workProcessEntry(replacement, id, type);
                if (entry) {
                    const identity = processIdentity(entry);
                    if (group && !sameProcess(group.identity, identity)) flush();
                    group ||= {nodes: [], entries: [], allNodes: [], identity: {}};
                    for (const key of Object.keys(identity)) if (identity[key]) group.identity[key] = identity[key];
                    group.nodes.push(node);
                    group.allNodes.push(node);
                    group.entries.push({id, type: entry.type});
                    continue;
                }
                const other = id && normalizeReplacementEntry(replacement, id, type);
                const invisible = other?.exists && !other.snapshot && !other.contextStatus && (
                    other.type === 'executionWindowTool'
                    || (['markdown', 'executionStatus'].includes(other.type) && !other.content.trim()));
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
