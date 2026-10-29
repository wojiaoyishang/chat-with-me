import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { getBackendConnection, getConnectionUserId, isCurrentConnection } from '@/runtime/backend/connection.js';

/** A view-owned LRU. It never retains Axios/XHR objects or their responseText. */
export function createInspectorReadCache({ maxEntries = 16, maxBytes = 16 * 1024 * 1024 } = {}) {
    const entries = new Map();
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
            const response = await apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { params, signal });
            assertScope();
            const { _response, ...value } = response;
            if (signal?.aborted) return null;
            // Count once, at the read boundary, rather than stringify all records
            // on every render/search. Transport metadata can contain cycles.
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
        },
    };
}
