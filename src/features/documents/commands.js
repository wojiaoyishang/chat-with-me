import { EditorSelection } from '@codemirror/state';

export function wrapSelection(view, before, after = before, placeholder = 'Text') {
    view.dispatch(
        view.state.changeByRange((range) => {
            const selected = view.state.sliceDoc(range.from, range.to);
            const value = selected || placeholder;
            const wrapped =
                selected.startsWith(before) &&
                selected.endsWith(after) &&
                selected.length >= before.length + after.length;
            const insert = wrapped
                ? selected.slice(before.length, selected.length - after.length)
                : before + value + after;
            const surrounding =
                range.from >= before.length &&
                view.state.sliceDoc(range.from - before.length, range.from) === before &&
                view.state.sliceDoc(range.to, range.to + after.length) === after;
            if (surrounding && !wrapped)
                return {
                    changes: [
                        { from: range.from - before.length, to: range.from, insert: '' },
                        { from: range.to, to: range.to + after.length, insert: '' },
                    ],
                    range: EditorSelection.range(range.from - before.length, range.to - before.length),
                };
            const start = range.from + (wrapped ? 0 : before.length);
            return {
                changes: { from: range.from, to: range.to, insert },
                range: EditorSelection.range(start, start + (wrapped ? insert.length : value.length)),
            };
        }),
    );
    view.focus();
}

export function prefixLines(view, prefix) {
    const { from, to } = view.state.selection.main;
    const first = view.state.doc.lineAt(from);
    const last = view.state.doc.lineAt(to > from && view.state.doc.lineAt(to).from === to ? to - 1 : to);
    const lines = view.state.sliceDoc(first.from, last.to).split('\n');
    const remove = lines.every((line) => line.startsWith(prefix));
    const insert = lines.map((line) => (remove ? line.slice(prefix.length) : prefix + line)).join('\n');
    view.dispatch({
        changes: { from: first.from, to: last.to, insert },
        selection: { anchor: first.from, head: first.from + insert.length },
    });
    view.focus();
}
