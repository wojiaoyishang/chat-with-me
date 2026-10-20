import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

const TASK_MARKER = /^(?:[-+*]|\d+[.)])[ \t]+\[([ xX])\](?=[ \t]|$)/;

function taskEntries(tree, source) {
    const entries = [];
    visit(tree, 'listItem', (node) => {
        if (typeof node.checked !== 'boolean') return;
        const start = node.position?.start?.offset;
        if (!Number.isSafeInteger(start)) return;
        const lineEnd = source.indexOf('\n', start);
        const line = source.slice(start, lineEnd < 0 ? undefined : lineEnd).replace(/\r$/, '');
        const marker = TASK_MARKER.exec(line);
        if (!marker || (marker[1] !== ' ') !== node.checked) return;
        entries.push({ node, checked: node.checked, line, offset: start + marker[0].indexOf('[') + 1 });
    });
    return entries;
}

function renderedTaskEntries(tree, source) {
    const entries = [];
    visit(tree, 'element', (node) => {
        if (node.tagName !== 'li') return;
        if (!node.properties?.className?.includes('task-list-item')) return;
        const input = node.children?.find((child) => child.tagName === 'input') ||
            node.children?.find((child) => child.tagName === 'p')?.children?.find((child) => child.tagName === 'input');
        if (input?.tagName !== 'input' || input.properties?.type !== 'checkbox') return;
        const start = node.position?.start?.offset;
        if (!Number.isSafeInteger(start)) return;
        const lineEnd = source.indexOf('\n', start);
        const line = source.slice(start, lineEnd < 0 ? undefined : lineEnd).replace(/\r$/, '');
        const marker = TASK_MARKER.exec(line);
        if (!marker || (marker[1] !== ' ') !== Boolean(input.properties.checked)) return;
        entries.push({ node, checked: Boolean(input.properties.checked), line, offset: start + marker[0].indexOf('[') + 1 });
    });
    return entries;
}

export function documentTaskChange(source, snapshot, offset, expectedChecked) {
    // Deferred previews and remote Yjs edits can invalidate a previously rendered offset.
    if (source !== snapshot || !Number.isSafeInteger(offset) || offset < 1 || offset >= source.length - 1) return null;
    const marker = source.slice(offset - 1, offset + 2);
    if (expectedChecked === false && marker === '[ ]') return { from: offset, to: offset + 1, insert: 'x' };
    if (expectedChecked === true && (marker === '[x]' || marker === '[X]'))
        return { from: offset, to: offset + 1, insert: ' ' };
    return null;
}

export function applyDocumentTaskToggle({ editor, text, sourceContent, offset, expectedChecked, undoManager }) {
    if (!editor || !text) return false;
    const current = text.toString();
    if (editor.state.doc.toString() !== current) return false;
    const change = documentTaskChange(current, sourceContent, offset, expectedChecked);
    if (!change) return false;
    undoManager?.stopCapturing();
    // CodeMirror's yCollab extension writes this change to Y.Text for every collaborator.
    editor.dispatch({ changes: change });
    undoManager?.stopCapturing();
    return true;
}

export default function rehypeDocumentTasks({ sourceContent = '', normalizeLine = null } = {}) {
    return (tree, file) => {
        const renderedContent = String(file.value ?? '');
        const rendered = renderedTaskEntries(tree, renderedContent);
        if (!rendered.length) return;
        const source = sourceContent === renderedContent
            ? rendered
            : taskEntries(unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkDirective).parse(sourceContent), sourceContent);
        // If preprocessing changed the parsed task count, ordinal matching is unsafe.
        if (source.length !== rendered.length) return;
        rendered.forEach((entry, index) => {
            const original = source[index];
            // Comparing the complete source line keeps duplicate and nested items distinct,
            // while allowing preprocessing to change the length of earlier paragraphs.
            const normalizedLine = typeof normalizeLine === 'function' ? normalizeLine(original.line) : original.line;
            if (entry.checked !== original.checked ||
                (entry.line !== original.line && entry.line !== normalizedLine)) return;
            entry.node.properties = {
                ...entry.node.properties,
                'data-document-task-offset': String(original.offset),
                'data-document-task-checked': String(original.checked),
            };
        });
    };
}
