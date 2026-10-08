import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView, WidgetType } from '@codemirror/view';
export const setEscDrafts = StateEffect.define();
class DraftWidget extends WidgetType {
    constructor(row, actions) {
        super();
        this.row = row;
        this.actions = actions;
    }
    get lineBreaks() {
        return (this.row.text || '').split('\n').length - 1;
    }
    eq(other) {
        return JSON.stringify(this.row) === JSON.stringify(other.row);
    }
    toDOM() {
        const root = document.createElement('span');
        root.className = 'cm-esc-draft';
        root.dataset.streamId = this.row.streamId || '';
        root.style.display = 'inline';
        root.style.whiteSpace = 'pre-wrap';
        root.contentEditable = 'false';
        root.setAttribute('aria-label', 'AI 暂存正文');
        const body = document.createElement('span');
        body.textContent = this.row.text || '';
        root.append(body);
        const cursor = document.createElement('span');
        cursor.className = `cm-esc-cursor ${this.row.status === 'streaming' ? 'is-writing' : ''}`;
        cursor.textContent = '▏';
        cursor.style.color = '#3b82f6';
        cursor.style.borderLeft = '2px solid #3b82f6';
        cursor.style.display = 'inline-block';
        cursor.style.height = '1em';
        cursor.style.verticalAlign = 'text-bottom';
        root.append(cursor);
        const label = document.createElement('span');
        label.className = 'cm-esc-label';
        label.textContent = `${this.row.modelName || 'AI'} · ${this.row.status === 'streaming' ? '撰写中 · 暂存' : this.row.status === 'awaiting_confirmation' ? '等待确认 · 暂存' : this.row.status === 'conflict' ? '版本冲突 · 暂存' : '已中断 · 暂存'}`;
        root.append(label);
        if (this.row.error) root.title = this.row.error;
        const toolbar = document.createElement('span');
        toolbar.className = 'cm-esc-actions';
        toolbar.setAttribute('role', 'toolbar');
        toolbar.setAttribute('aria-label', 'AI 草稿操作');
        toolbar.style.display = 'none';
        const show = (event) => {
            if (toolbar.contains(event.target)) return;
            const range = document.caretRangeFromPoint?.(event.clientX, event.clientY);
            const rect = range?.getBoundingClientRect() || event.target.getBoundingClientRect();
            toolbar.style.display = 'flex';
            toolbar.style.left = `${Math.max(8, Math.min(event.clientX - toolbar.offsetWidth / 2, window.innerWidth - toolbar.offsetWidth - 8))}px`;
            toolbar.style.top = `${Math.max(8, rect.top - toolbar.offsetHeight - 8)}px`;
        };
        root.addEventListener('pointermove', (event) => {
            if (event.pointerType !== 'touch') show(event);
        });
        root.addEventListener('click', show);
        let hideTimer;
        root.addEventListener('pointerleave', () => {
            hideTimer = setTimeout(() => {
                toolbar.style.display = 'none';
            }, 180);
        });
        root.addEventListener('pointerenter', () => clearTimeout(hideTimer));
        toolbar.addEventListener('pointerenter', () => clearTimeout(hideTimer));
        root.addEventListener('focusout', () => {
            toolbar.style.display = 'none';
        });
        if (this.row.owned)
            for (const [title, action] of [
                ['复制', 'copy'],
                ['接受', 'commit'],
                ['拒绝', 'discard'],
            ]) {
                if (action === 'commit' && !['interrupted', 'awaiting_confirmation'].includes(this.row.status))
                    continue;
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.action = action;
                const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                icon.setAttribute('viewBox', '0 0 24 24');
                icon.setAttribute('fill', 'none');
                icon.setAttribute('stroke', 'currentColor');
                icon.setAttribute('stroke-width', '1.8');
                icon.setAttribute('stroke-linecap', 'round');
                icon.setAttribute('stroke-linejoin', 'round');
                icon.setAttribute('aria-hidden', 'true');
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute(
                    'd',
                    {
                        copy: 'M9 9h11v11H9z M5 15H4V4h11v1',
                        commit: 'm5 12 4 4L19 6',
                        discard: 'm6 6 12 12 M18 6 6 18',
                    }[action],
                );
                icon.append(path);
                const text = document.createElement('span');
                text.textContent = title;
                button.append(icon, text);
                button.disabled = this.row.busy;
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.actions(this.row, action);
                });
                toolbar.append(button);
            }
        root.append(toolbar);
        return root;
    }
    ignoreEvent() {
        return true;
    }
}
export function escDecorations(actions) {
    return StateField.define({
        create: () => Decoration.none,
        update(value, transaction) {
            value = value.map(transaction.changes);
            for (const effect of transaction.effects)
                if (effect.is(setEscDrafts))
                    value = Decoration.set(
                        effect.value.map((row) =>
                            Decoration.widget({ widget: new DraftWidget(row, actions), side: 1 }).range(
                                Math.max(0, Math.min(row.displayPosition, transaction.state.doc.length)),
                            ),
                        ),
                        true,
                    );
            return value;
        },
        provide: (field) => EditorView.decorations.from(field),
    });
}
export const escTheme = EditorView.baseTheme({
    '.cm-esc-draft': {
        whiteSpace: 'pre-wrap',
        background: 'color-mix(in srgb, #3b82f6 9%, transparent)',
        textDecoration: 'underline dotted #60a5fa',
        textUnderlineOffset: '4px',
        color: 'inherit',
    },
    '.cm-esc-cursor': { color: '#3b82f6', fontWeight: 'bold' },
    '.cm-esc-cursor.is-writing': { animation: 'esc-caret 1s ease-in-out infinite' },
    '.cm-esc-label': {
        fontSize: '11px',
        color: '#2563eb',
        padding: '2px 6px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
    },
    '.cm-esc-actions': {
        position: 'fixed',
        zIndex: '100',
        gap: '3px',
        padding: '5px',
        background: 'var(--background, #fff)',
        color: 'var(--foreground, #334155)',
        border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
        borderRadius: '14px',
        boxShadow: '0 8px 28px #0002, 0 1px 4px #0001',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
    },
    '.cm-esc-actions button': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '12px',
        fontWeight: '500',
        padding: '7px 10px',
        border: 'none',
        borderRadius: '9px',
        cursor: 'pointer',
        background: 'transparent',
        color: 'inherit',
        transition: 'background 150ms ease',
    },
    '.cm-esc-actions button svg': { width: '15px', height: '15px' },
    '.cm-esc-actions button:hover': { background: 'color-mix(in srgb, currentColor 8%, transparent)' },
    '.cm-esc-actions button[data-action=commit]': { color: '#16835d' },
    '.cm-esc-actions button[data-action=discard]': { color: '#dc5263' },
    '.cm-esc-actions button:focus-visible': { outline: '2px solid #60a5fa', outlineOffset: '1px' },
    '.cm-esc-actions button:disabled': { opacity: '0.45', cursor: 'wait' },
    '@keyframes esc-caret': { '50%': { opacity: '0.25' } },
    '@media (prefers-reduced-motion: reduce)': { '.cm-esc-cursor.is-writing': { animation: 'none' } },
});

// Decorate rendered Markdown without adding control markers to its source.
export function draftPreviewPlugin({ ranges = [] } = {}) {
    return (tree) => {
        const visit = (parent) => {
            if (!parent.children) return;
            parent.children = parent.children.flatMap((node) => {
                if (node.type !== 'text' || node.position?.start?.offset == null) {
                    visit(node);
                    return [node];
                }
                const start = node.position.start.offset;
                const end = node.position.end.offset;
                const matching = ranges.filter((range) => range.from < end && range.to > start);
                if (!matching.length) return [node];
                const result = [];
                let cursor = 0;
                for (const range of matching.sort((a, b) => a.from - b.from)) {
                    const from = Math.max(0, range.from - start);
                    const to = Math.min(node.value.length, range.to - start);
                    if (from > cursor) result.push({ type: 'text', value: node.value.slice(cursor, from) });
                    result.push({
                        type: 'element',
                        tagName: 'span',
                        properties: {
                            className: ['bg-blue-500/10', 'underline', 'decoration-dotted', 'decoration-blue-400'],
                            title: `${range.modelName || 'AI'} · 暂存`,
                        },
                        children: [{ type: 'text', value: node.value.slice(from, to) }],
                    });
                    if (range.to <= end)
                        result.push({
                            type: 'element',
                            tagName: 'span',
                            properties: { className: ['text-blue-500'], 'aria-label': 'AI 光标' },
                            children: [{ type: 'text', value: '▏' }],
                        });
                    cursor = to;
                }
                if (cursor < node.value.length) result.push({ type: 'text', value: node.value.slice(cursor) });
                return result;
            });
        };
        visit(tree);
    };
}
