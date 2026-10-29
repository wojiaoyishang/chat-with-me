import { getCardReplaceIdFromAttributes, normalizeReplacementEntry, parseCardReplaceAttributes } from './replacementProtocol.js';
import { getExecutionStatusGroupKey, parseExecutionStatus } from '../../features/execution/executionStatusModel.js';

// A conservative dependency scan, not a second Markdown parser. References in
// code examples may retain extra entries, but must never hide a real dependency.
const REFERENCES = /\{\{\s*(?:cardReplace|card-replace|card)\s+([^{}]*?)\s*\}\}|:{2,3}\s*(?:card|card-replace)\s*\{([^}]*?)\}/g;
const references = (content) => [...String(content || '').matchAll(REFERENCES)].map((match) => {
    const attrs = parseCardReplaceAttributes(match[1] || match[2]);
    return { id: getCardReplaceIdFromAttributes(attrs), type: attrs.type || '' };
}).filter(({ id }) => id);

/** Keep only the referenced card tree; reuse a prior projection when unchanged. */
export function projectReplacements(content, replacement, previous = null, maxDepth = 10) {
    replacement = replacement && typeof replacement === 'object' ? replacement : {};
    const selected = Object.create(null);
    const seen = new Set();
    const walk = (source, depth) => {
        if (depth > maxDepth) return;
        for (const { id, type } of references(source)) {
            if (seen.has(id)) continue;
            seen.add(id);
            if (Object.hasOwn(replacement, id)) selected[id] = replacement[id];
            const entry = normalizeReplacementEntry(replacement, id, type);
            // Tool context badges read this implicit result entry in addition to
            // explicit nested Markdown references.
            const resultId = `tool-result-${id.replace(/-toolCalling$/, '')}`;
            if (Object.hasOwn(replacement, resultId)) selected[resultId] = replacement[resultId];
            // Reasoning is displayed as lazy plain text, never as nested control
            // Markdown. Don't rescan its growing body on every streamed token.
            if (entry.exists && entry.type !== 'thinking') walk(entry.content, depth + 1);
        }
    };
    walk(content, 0);
    const ids = Object.keys(selected);
    return previous && ids.length === Object.keys(previous).length && ids.every((id) => previous[id] === selected[id])
        ? previous : selected;
}

/** Only facts that affect grouping invalidate the Markdown syntax pipeline. */
export function executionGroupingKey(content, replacement, process = false) {
    return JSON.stringify(references(content).map(({ id, type }) => {
        const entry = normalizeReplacementEntry(replacement, id, type);
        const status = entry.type === 'executionStatus' ? parseExecutionStatus(entry.content) : null;
        if (process) {
            const meta = replacement?.[id]?.workProcess;
            return [id, entry.exists, entry.type, Boolean(entry.contextStatus), entry.snapshot,
                entry.content.trim().length === 0, status?.executionId, status?.runId, status?.conversationId,
                status?.inlineKind === 'feedback', meta?.executionId, meta?.runId, meta?.conversationId];
        }
        return [id, entry.exists, entry.type, Boolean(entry.contextStatus), entry.snapshot,
            entry.content.trim().length === 0, getExecutionStatusGroupKey(status),
            status?.executionId, status?.runId, status?.conversationId, status?.inlineKind];
    }));
}
