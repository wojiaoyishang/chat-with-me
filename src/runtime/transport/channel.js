let activeTransport = null;
const pendingEvents = [];
const MAX_PENDING_EVENTS = 100;

export const setRealtimeTransport = (transport) => {
    activeTransport = transport || null;
};

export const getRealtimeTransport = () => activeTransport;

export const flushRealtimeEvents = () => {
    if (!activeTransport?.isOpen) return 0;
    let sent = 0;
    while (pendingEvents.length) {
        activeTransport.sendEvent(pendingEvents.shift());
        sent += 1;
    }
    return sent;
};

export const sendRealtimeEvent = (envelope, {queue = true} = {}) => {
    if (activeTransport?.isOpen) {
        activeTransport.sendEvent(envelope);
        return true;
    }
    if (queue) {
        pendingEvents.push(envelope);
        if (pendingEvents.length > MAX_PENDING_EVENTS) pendingEvents.shift();
    }
    return false;
};

export const sendRealtimeMedia = (header, body) => {
    if (!activeTransport?.isOpen) return false;
    activeTransport.sendMedia(header, body);
    return true;
};
