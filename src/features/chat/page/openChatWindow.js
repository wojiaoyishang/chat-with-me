const windows = new Map();
const listeners = new Set();
let monitor = null;
const windowKey = (conversationId, documentId) => `${documentId || ''}:${conversationId || ''}`;
const notify = () => listeners.forEach((listener) => listener());
export function subscribeChatWindows(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
export function isChatWindowOpen(conversationId, documentId) {
    return Boolean(
        windows.get(windowKey(conversationId, documentId)) &&
        !windows.get(windowKey(conversationId, documentId)).closed,
    );
}
function monitorWindows() {
    if (monitor) return;
    monitor = window.setInterval(() => {
        let changed = false;
        for (const [key, child] of windows) {
            if (child.closed) {
                windows.delete(key);
                changed = true;
            }
        }
        if (changed) notify();
        if (!windows.size) {
            window.clearInterval(monitor);
            monitor = null;
        }
    }, 500);
}

export function chatWindowPath(conversationId, documentId) {
    const path = `/chat-window${conversationId ? `/${encodeURIComponent(conversationId)}` : ''}`;
    return documentId ? `${path}?documentId=${encodeURIComponent(documentId)}` : path;
}

export function openChatWindow({ conversationId, documentId }) {
    const key = windowKey(conversationId, documentId);
    const existing = windows.get(key);
    if (existing && !existing.closed) {
        existing.focus();
        return true;
    }
    const base = String(import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
    const url = `${base}${chatWindowPath(conversationId, documentId)}`;
    const child = window.open(
        url,
        `cwm-chat-${encodeURIComponent(key)}`,
        'popup=yes,width=960,height=800,resizable=yes,scrollbars=yes',
    );
    if (!child) return false;
    windows.set(key, child);
    monitorWindows();
    notify();
    child.focus();
    return true;
}
