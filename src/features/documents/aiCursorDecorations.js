import * as Y from 'yjs';
import {Decoration, ViewPlugin, WidgetType, EditorView} from '@codemirror/view';

class AiCaret extends WidgetType {
    constructor(name, color) { super(); this.name = name; this.color = color; }
    eq(other) { return other.name === this.name && other.color === this.color; }
    toDOM() {
        const caret = document.createElement('span');
        caret.className = 'cm-ai-caret';
        caret.style.borderColor = this.color;
        caret.setAttribute('aria-label', `AI 光标：${this.name}`);
        const label = caret.appendChild(document.createElement('span'));
        label.className = 'cm-ai-caret-label';
        label.style.backgroundColor = this.color;
        label.textContent = this.name || 'AI';
        return caret;
    }
    ignoreEvent() { return true; }
}

export function aiCursorDecorations(awareness) {
    const build = () => {
        const ranges = [], text = awareness.doc.getText('content');
        for (const state of awareness.getStates().values()) {
            if (state.user?.kind !== 'ai' || !state.aiCursor?.head) continue;
            const resolve = (position) => Y.createAbsolutePositionFromRelativePosition(Y.createRelativePositionFromJSON(position), awareness.doc);
            const head = resolve(state.aiCursor.head), anchor = resolve(state.aiCursor.anchor);
            if (!head || head.type !== text) continue;
            const color = state.user.color || '#6366f1';
            if (anchor?.type === text && anchor.index !== head.index)
                ranges.push(Decoration.mark({class: 'cm-ai-selection', attributes: {style: `background-color:${color}26`}}).range(Math.min(anchor.index, head.index), Math.max(anchor.index, head.index)));
            ranges.push(Decoration.widget({widget: new AiCaret(state.user.name, color), side: 1}).range(head.index));
        }
        return Decoration.set(ranges, true);
    };
    return [ViewPlugin.fromClass(class {
        constructor(view) {
            this.view = view; this.decorations = build(); this.queued = false; this.destroyed = false;
            this.changed = () => {
                if (this.queued) return;
                this.queued = true;
                queueMicrotask(() => { this.queued = false; if (!this.destroyed) this.view.dispatch({}); });
            };
            awareness.on('change', this.changed);
        }
        update() { this.decorations = build(); }
        destroy() { this.destroyed = true; awareness.off('change', this.changed); }
    }, {decorations: (plugin) => plugin.decorations}), EditorView.baseTheme({
        '.cm-ai-caret': {position: 'relative', display: 'inline-block', height: '1.15em', verticalAlign: '-.15em', borderLeft: '2px solid', width: '0', pointerEvents: 'none'},
        '.cm-ai-caret-label': {position: 'absolute', bottom: '100%', left: '-2px', color: 'white', fontSize: '10px', lineHeight: '16px', padding: '0 4px', borderRadius: '3px 3px 3px 0', whiteSpace: 'nowrap', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', zIndex: '20'},
        '.cm-ai-selection': {borderRadius: '2px'},
    })];
}
