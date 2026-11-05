import apiClient from '../../lib/apiClient.js';
import { getBackendConnection, getConnectionToken } from './connection.js';

// StrictMode may retire and immediately recreate a consumer. Keep the bounded
// request alive for that consumer, but never share it with another login/backend.
const pending = new Map();

export function backendAccountKey() {
    const scope = getBackendConnection();
    // The current login token already identifies its actor. User ID hydration
    // must not reset a live store after its first authenticated snapshot.
    return JSON.stringify([scope.id, scope.url, scope.epoch, getConnectionToken(scope)]);
}

export function loginRedirectTarget(search, origin) {
    const requested = new URLSearchParams(search).get('redirect') || '/chat';
    if (!requested.startsWith('/') || requested.startsWith('//')) return '/chat';
    try {
        const target = new URL(requested, origin);
        if (target.origin !== origin || target.pathname === '/login') return '/chat';
        return target.pathname + target.search + target.hash;
    } catch {
        return '/chat';
    }
}

export function loadBootstrapResource(path) {
    const scope = getBackendConnection();
    const key = JSON.stringify([
        scope.id, scope.url, scope.epoch, getConnectionToken(scope),
        globalThis.navigator?.language || '', path,
    ]);
    if (pending.has(key)) return pending.get(key);
    const request = apiClient.get(path, { timeout: 10000 }).finally(() => {
        if (pending.get(key) === request) pending.delete(key);
    });
    pending.set(key, request);
    return request;
}

/** Decorative dashboard data must never postpone authenticated chat/list mount. */
export function startDashboardLoad({
    userEndpoint, displayEndpoint, onUser, onDisplay, onUserError,
    onDisplayError, onReady,
}) {
    let disposed = false;
    void loadBootstrapResource(displayEndpoint)
        .then((value) => { if (!disposed) onDisplay(value); })
        .catch((error) => { if (!disposed) onDisplayError(error); });
    void loadBootstrapResource(userEndpoint)
        .then((value) => { if (!disposed) onUser(value); })
        .catch((error) => { if (!disposed) onUserError(error); })
        .finally(() => { if (!disposed) onReady(); });
    return () => { disposed = true; };
}
