const copy = value => value == null ? value : JSON.parse(JSON.stringify(value));

// History is local to a canvas. It never issues a database write or captures AI
// graph snapshots: callers retain only their manual additions and view state.
export function createGraphHistory(limit = 30) {
    const past = [], future = [];
    return {
        record(snapshot, label) {
            past.push({snapshot: copy(snapshot), label});
            if (past.length > limit) past.shift();
            future.length = 0;
        },
        undo(current) {
            const entry = past.pop();
            if (!entry) return null;
            future.push({snapshot: copy(current), label: entry.label});
            return copy(entry);
        },
        redo(current) {
            const entry = future.pop();
            if (!entry) return null;
            past.push({snapshot: copy(current), label: entry.label});
            return copy(entry);
        },
        clear() { past.length = future.length = 0; },
        canUndo: () => past.length > 0,
        canRedo: () => future.length > 0,
    };
}

export function graphHistoryShortcut(event) {
    if (event.defaultPrevented || event.isComposing || event.altKey || !(event.ctrlKey || event.metaKey)) return null;
    const target = event.target;
    if (target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"]')) return null;
    const key = String(event.key || '').toLowerCase();
    if (key === 'z') return event.shiftKey ? 'redo' : 'undo';
    return key === 'y' && !event.shiftKey ? 'redo' : null;
}
