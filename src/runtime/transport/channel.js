import { getBackendConnection, isCurrentConnection, subscribeBackend } from '../backend/connection.js';

let activeTransport = null;
let transportScope = null;
const pendingEvents = [];
const MAX_PENDING_EVENTS = 100;

export const setRealtimeTransport = (transport) => {
    activeTransport = transport || null;
    transportScope = transport ? getBackendConnection() : null;
};

subscribeBackend(() => {
    if (transportScope && !isCurrentConnection(transportScope)) {
        activeTransport?.close(1000, 'Backend changed');
        activeTransport = null;
        transportScope = null;
    }
    for (let index = pendingEvents.length - 1; index >= 0; index -= 1)
        if (!isCurrentConnection(pendingEvents[index].scope)) pendingEvents.splice(index, 1);
});

export const getRealtimeTransport = () => isCurrentConnection(transportScope) ? activeTransport : null;

export const flushRealtimeEvents = () => {
    if (!activeTransport?.isOpen || !isCurrentConnection(transportScope)) return 0;
    let sent = 0;
    while (pendingEvents.length) {
        const item = pendingEvents.shift();
        if (isCurrentConnection(item.scope)) { activeTransport.sendEvent(item.envelope); sent += 1; }
    }
    return sent;
};

export const sendRealtimeEvent = (envelope, {queue = true} = {}) => {
    if (activeTransport?.isOpen && isCurrentConnection(transportScope)) {
        activeTransport.sendEvent(envelope);
        return true;
    }
    if (queue) {
        pendingEvents.push({ envelope, scope: getBackendConnection() });
        if (pendingEvents.length > MAX_PENDING_EVENTS) pendingEvents.shift();
    }
    return false;
};

export const sendRealtimeMedia = (header, body) => {
    if (!activeTransport?.isOpen || !isCurrentConnection(transportScope)) return false;
    activeTransport.sendMedia(header, body);
    return true;
};
