// Connection demand and routing hints only; business state stays in its owner.
const routes = new Map();
const listeners = new Set();
let transientTimer = null;
let transient = false;
let queued = false;
const notify = () => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => { queued = false; for (const listener of [...listeners]) listener(); });
};

export const hasRealtimeDemand = () => transient || [...routes.values()].some(route => route.keepAlive);
export const subscribeRealtimeDemand = callback => { listeners.add(callback); return () => listeners.delete(callback); };
export const realtimeSubscriptions = () => {
    const groups = new Map();
    for (const route of routes.values()) {
        const {conversationId, documentId, includeGlobal, onlyWithoutConversation} = route;
        const key = JSON.stringify([conversationId, documentId, includeGlobal, onlyWithoutConversation]);
        if (!groups.has(key)) groups.set(key, {conversationId, documentId, includeGlobal, onlyWithoutConversation, events: new Set()});
        for (const event of route.events) groups.get(key).events.add(event);
    }
    const result = [...groups.values()].flatMap(({events, ...scope}) => {
        const names = [...events];
        return Array.from({length: Math.ceil(names.length / 128)}, (_, index) =>
            ({...scope, events: names.slice(index * 128, (index + 1) * 128)}));
    });
    // The user's existing unfiltered feed is a safe fallback for an extreme
    // extension count. Never silently omit a consumer or lose an approval.
    return result.length <= 512 ? result : [{events: ['*']}];
};

/** Mirror incoming listener scope; local/outgoing-only listeners need no server feed. */
export function registerRealtimeSubscription(id, registration, keepAlive) {
    if (registration.directions && !registration.directions.has('incoming')) return () => {};
    routes.set(id, {events: registration.events, conversationId: registration.conversationId,
        documentId: registration.documentId, includeGlobal: registration.includeGlobal,
        onlyWithoutConversation: registration.onlyWithoutConversation, keepAlive});
    notify();
    return () => { routes.delete(id); notify(); };
}

/** A command can open the connection before any view has registered a listener. */
export function requestRealtimeConnection() {
    transient = true;
    clearTimeout(transientTimer);
    transientTimer = setTimeout(() => { transient = false; transientTimer = null; notify(); }, 30000);
    transientTimer.unref?.();
    notify();
}
