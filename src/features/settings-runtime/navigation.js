import { getBackendConnection } from '@/runtime/backend/connection.js';

const listeners = new Set();
let sequence = 0;

/** Open a server-described settings view in the currently connected backend.
 * No business page is registered in the client. Requests are ephemeral: changing
 * backend, closing the window, or reloading never replays a stale editor link.
 */
export function requestSettingsNavigation(target = {}) {
    if (!target.pageId || typeof target.pageId !== 'string') throw new Error('缺少设置页面标识。');
    const request = { ...target, sequence: ++sequence, backend: getBackendConnection() };
    for (const listener of listeners) listener(request);
    return request;
}

export function subscribeSettingsNavigation(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
