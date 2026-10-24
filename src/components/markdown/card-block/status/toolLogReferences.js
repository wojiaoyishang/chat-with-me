import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import {
    getCardReplaceIdFromAttributes,
    normalizeReplacementEntry,
    parseCardReplaceAttributes,
} from '../../replacementProtocol.js';

const parser = unified().use(remarkParse);
const REFERENCE = /\{\{\s*(?:cardReplace|card-replace|card)\s+([^{}]*?)\s*\}\}/g;

/** Repair duplicate references in one tool-calling card, never duplicate titles.
 * Markdown positions let us preserve code examples and every unrelated byte.
 */
export function deduplicateToolLogReferences(content, replacement = {}) {
    if (typeof content !== 'string' || !content.includes('{{')) return content;
    const types = new Map();
    const toolLogId = (match) => {
        const attrs = parseCardReplaceAttributes(match[1]);
        const id = getCardReplaceIdFromAttributes(attrs);
        if (!id) return '';
        const key = JSON.stringify([id, attrs.type || '']);
        if (!types.has(key)) {
            const declared = String(attrs.type || replacement?.[id]?.type || '').trim();
            const type = declared || normalizeReplacementEntry(replacement, id, attrs.type).type;
            types.set(key, String(type).toLowerCase() === 'toollog');
        }
        return types.get(key) ? id : '';
    };
    // The ordinary streaming path has zero or one reference per log. Only
    // duplicate candidates justify parsing Markdown to distinguish code examples.
    const candidates = new Set();
    let hasDuplicate = false;
    for (const match of content.matchAll(REFERENCE)) {
        const id = toolLogId(match);
        if (!id) continue;
        if (candidates.has(id)) { hasDuplicate = true; break; }
        candidates.add(id);
    }
    if (!hasDuplicate) return content;
    const seen = new Set();
    const removals = [];
    visit(parser.parse(content), 'text', (node) => {
        const start = node.position?.start?.offset;
        const end = node.position?.end?.offset;
        if (start == null || end == null) return;
        const source = content.slice(start, end);
        for (const match of source.matchAll(REFERENCE)) {
            // Escaped examples are not references. Inline/fenced/indented code
            // has already been excluded by visiting text nodes only.
            let escapes = 0;
            for (let cursor = match.index - 1; cursor >= 0 && source[cursor] === '\\'; cursor -= 1) escapes += 1;
            if (escapes % 2) continue;
            const id = toolLogId(match);
            if (!id) continue;
            if (seen.has(id)) removals.push([start + match.index, start + match.index + match[0].length]);
            else seen.add(id);
        }
    });
    let result = content;
    for (const [start, end] of removals.reverse()) result = result.slice(0, start) + result.slice(end);
    return result;
}
