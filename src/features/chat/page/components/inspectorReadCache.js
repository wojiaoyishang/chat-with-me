import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { getBackendConnection, getConnectionUserId, isCurrentConnection } from '@/runtime/backend/connection.js';

/** A view-owned LRU. It never retains Axios/XHR objects or their responseText. */
export function createInspectorReadCache({ maxEntries = 16, maxBytes = 16 * 1024 * 1024 } = {}) {
    const entries = new Map();
    const pending = new Map();
    const scope = getBackendConnection();
    const userId = getConnectionUserId();
    let bytes = 0;
    const assertScope = () => {
        if (!isCurrentConnection(scope) || getConnectionUserId() !== userId) {
            entries.clear();
            bytes = 0;
            throw new Error('连接或账户已变更，请重新打开检查器。');
        }
    };
    return {
        async read(params, { signal } = {}) {
            assertScope();
            const key = JSON.stringify(params);
            const cached = entries.get(key);
            if (cached) {
                entries.delete(key);
                entries.set(key, cached);
                return cached.value;
            }
            if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
            let request = pending.get(key);
            if (!request) {
                const controller = new AbortController();
                request = { controller, listeners: 0, settled: false };
                request.promise = apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, {
                    params, signal: controller.signal, timeout: 30000,
                }).then((response) => {
                    assertScope();
                    const { _response, ...value } = response;
                    if (controller.signal.aborted) throw new DOMException('Aborted', 'AbortError');
                    const size = JSON.stringify(value).length * 2;
                    if (size <= maxBytes) {
                        if (entries.has(key)) { bytes -= entries.get(key).size; entries.delete(key); }
                        entries.set(key, { value, size });
                        bytes += size;
                        while (entries.size > maxEntries || bytes > maxBytes) {
                            const oldest = entries.keys().next().value;
                            bytes -= entries.get(oldest).size;
                            entries.delete(oldest);
                        }
                    }
                    return value;
                }).finally(() => {
                    request.settled = true;
                    if (pending.get(key) === request) pending.delete(key);
                });
                pending.set(key, request);
            }
            request.listeners++;
            return new Promise((resolve, reject) => {
                let finished = false;
                const finish = (callback, value) => {
                    if (finished) return;
                    finished = true;
                    signal?.removeEventListener('abort', abort);
                    request.listeners--;
                    if (!request.listeners && !request.settled) {
                        request.controller.abort();
                        if (pending.get(key) === request) pending.delete(key);
                    }
                    callback(value);
                };
                const abort = () => finish(reject, new DOMException('Aborted', 'AbortError'));
                signal?.addEventListener('abort', abort, { once: true });
                request.promise.then((value) => finish(resolve, value), (error) => finish(reject, error));
            });
        },
    };
}
