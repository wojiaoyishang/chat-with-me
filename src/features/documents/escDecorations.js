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
        root.contentEditable = 'false';
        root.setAttribute('aria-label', 'AI 暂存正文');
        const body = document.createElement('span');
        body.textContent = this.row.text || '';
        root.append(body);
        const cursor = document.createElement('span');
        cursor.className = `cm-esc-cursor ${this.row.status === 'streaming' ? 'is-writing' : ''}`;
        cursor.textContent = '▏';
        root.append(cursor);
        const label = document.createElement('span');
        label.className = 'cm-esc-label';
        label.textContent = `${this.row.modelName || 'AI'} · ${this.row.status === 'streaming' ? '撰写中 · 暂存' : this.row.status === 'conflict' ? '版本冲突 · 暂存' : '已中断 · 暂存'}`;
        root.append(label);
        if (this.row.error) root.title = this.row.error;
        if (this.row.owned)
            for (const [title, action] of [
                ['复制', 'copy'],
                ['提交', 'commit'],
                ['丢弃', 'discard'],
            ]) {
                if (action === 'commit' && this.row.status !== 'interrupted') continue;
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = title;
                button.disabled = this.row.busy;
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.actions(this.row, action);
                });
                root.append(button);
            }
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
    '.cm-esc-draft button': {
        fontSize: '11px',
        margin: '0 3px',
        padding: '1px 4px',
        border: '1px solid #93c5fd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
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
