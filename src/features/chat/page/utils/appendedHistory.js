import {mergeLiveMessageWithSnapshot} from './liveMessageReconcile.js';

const SENTINEL = '<PREV_MORE>';
const ids = (order) => (order || []).filter((id) => id !== SENTINEL);
const same = (left, right) => Array.isArray(left) && Array.isArray(right)
    ? left.length === right.length && left.every((item, index) => item === right[index]) : left === right;

/** Extend only an unchanged active history window; never resurrect a deleted branch.
 * Old bodies and component registries keep their identity, including playing media.
 * The included anchor updates child pointers without downloading older bodies.
 */
export function reconcileAppendedHistory({snapshot, currentMessages, currentOrder, liveMessageIds = new Set()}) {
    const branch = snapshot?.branchOrder;
    const page = snapshot?.messagesOrder;
    const visible = ids(currentOrder);
    if (snapshot?.requiresReload || !Array.isArray(branch) || !Array.isArray(page) || !page.length
        || page[0] !== snapshot.appendFrom || !visible.includes(snapshot.appendFrom)) return null;
    const start = branch.indexOf(visible[0]);
    const anchor = branch.indexOf(snapshot.appendFrom);
    if (start < 0 || anchor < start || new Set(branch).size !== branch.length
        || !same(page, branch.slice(anchor, anchor + page.length))) return null;
    const shared = Math.min(visible.length, branch.length - start);
    if (!same(visible.slice(0, shared), branch.slice(start, start + shared))) return null;

    // A newer WebSocket suffix can arrive before the HTTP snapshot. Keep only
    // known live messages with exact parent links, never an arbitrary old branch.
    let previous = branch[branch.length - 1];
    for (const id of visible.slice(shared)) {
        if (!liveMessageIds.has(id) || currentMessages[id]?.prevMessage !== previous) return null;
        previous = id;
    }
    const end = Math.max(start + shared, anchor + page.length);
    const nextVisible = [...branch.slice(start, end), ...visible.slice(shared)];
    const messages = {...currentMessages};
    for (const id of page) {
        const incoming = snapshot.messages?.[id];
        if (!incoming || typeof incoming !== 'object') return null;
        const current = currentMessages[id];
        if (!current) messages[id] = incoming;
        else if (liveMessageIds.has(id)) messages[id] = mergeLiveMessageWithSnapshot(incoming, current);
        else {
            const structure = Object.fromEntries(['messages', 'nextMessage', 'prevMessage']
                .filter((key) => Object.hasOwn(incoming, key) && !same(current[key], incoming[key]))
                .map((key) => [key, incoming[key]]));
            if (Object.keys(structure).length) messages[id] = {...current, ...structure};
        }
    }
    if (nextVisible.some((id) => !messages[id])) return null;
    const order = currentOrder[0] === SENTINEL ? [SENTINEL, ...nextVisible] : nextVisible;
    return {messages, order: same(order, currentOrder) ? currentOrder : order};
}

/** Coalesce bursty append/reconnect events and page forward without a global loader.
 * Invalidating a pending request prevents stale replies after navigation/deletion.
 */
export function createAppendSynchronizer({read, load, apply, complete, mismatch, error, isCurrent = () => true}) {
    let running = null;
    let dirty = false;
    let revision = 0;
    const invalidate = () => { revision += 1; dirty = false; };
    const request = () => {
        dirty = true;
        if (running) return running;
        running = (async () => {
            let appliedRevision = null;
            while (dirty && isCurrent()) {
                dirty = false;
                const before = read();
                const anchor = ids(before?.order).at(-1);
                if (!anchor || !before.ready) break;
                const currentRevision = revision;
                try {
                    const snapshot = await load(anchor);
                    if (!isCurrent()) break;
                    if (currentRevision !== revision) continue;
                    const current = read();
                    if (!current.ready) break;
                    const next = reconcileAppendedHistory({snapshot, currentMessages: current.messages,
                        currentOrder: current.order, liveMessageIds: current.liveMessageIds});
                    if (!next) { invalidate(); mismatch(); break; }
                    apply(next);
                    appliedRevision = currentRevision;
                    if (snapshot.haveMoreAfter) {
                        if (ids(next.order).at(-1) === anchor) throw new Error('消息增量未能向后推进');
                        dirty = true;
                    }
                } catch (cause) {
                    if (isCurrent() && currentRevision === revision) error(cause);
                    break;
                }
            }
            if (appliedRevision === revision && isCurrent()) complete();
        })().finally(() => { running = null; });
        return running;
    };
    return {request, invalidate};
}
