// A freeze is a server-owned lease. Its expiry triggers a refresh, never a local unlock.
export const normalizeConversationFreeze = (value, conversationId) => {
    if (!value || value.conversationId !== conversationId || typeof value.frozen !== 'boolean') return null;
    return {
        conversationId, frozen: value.frozen, reason: String(value.reason || ''),
        operationId: value.operationId || null, expiresAt: value.expiresAt || null,
        revision: Number.isInteger(value.revision) && value.revision >= 0 ? value.revision : null,
    };
};

export const acceptFreezeEvent = (previous, next) => {
    if (previous?.revision != null && next.revision != null && previous.revision > next.revision) return false;
    // A delayed release for an older operation must not unlock a newer lease.
    if (previous?.frozen && !next.frozen && previous.operationId && next.operationId && previous.operationId !== next.operationId) return false;
    return true;
};

export function createConversationFreezeController({conversationId, fetchState, subscribe, notify, pollMs = 5000}) {
    let disposed = false;
    let sequence = 0;
    let request = null;
    let state = null;
    let inFlight = null;
    const refresh = () => {
        if (disposed) return Promise.resolve();
        // Polling never cancels a slow authoritative request. WebSocket snapshots
        // invalidate it separately, so an older GET cannot undo a newer event.
        if (inFlight) return inFlight;
        const controller = new AbortController();
        request = controller;
        const version = ++sequence;
        inFlight = (async () => { try {
            const value = normalizeConversationFreeze(await fetchState(controller.signal), conversationId);
            if (disposed || controller.signal.aborted || version !== sequence) return;
            if (!value) throw new Error('Invalid conversation freeze state');
            if (!acceptFreezeEvent(state, value)) return;
            state = value;
            notify({state, loading: false, error: ''});
        } catch (error) {
            if (!disposed && !controller.signal.aborted && version === sequence) notify({state, loading: false, error: error?.message || 'Request failed'});
        } finally { if (request === controller) { request = null; inFlight = null; } } })();
        return inFlight;
    };
    const changed = subscribe('conversation.freeze.changed', ({payload, eventConversationId}) => {
        if ((payload?.conversationId || eventConversationId) !== conversationId) return;
        const value = normalizeConversationFreeze({...payload, conversationId}, conversationId);
        if (!value || !acceptFreezeEvent(state, value)) { void refresh(); return; }
        ++sequence;
        request?.abort();
        request = null;
        inFlight = null;
        state = value;
        notify({state, loading: false, error: ''});
    });
    const connected = subscribe('transport.connected', () => void refresh());
    const timer = setInterval(() => void refresh(), pollMs);
    void refresh();
    return {refresh, dispose() { disposed = true; ++sequence; request?.abort(); clearInterval(timer); changed(); connected(); }};
}
