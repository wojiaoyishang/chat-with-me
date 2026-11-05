import apiClient from '../../lib/apiClient.js';
import { getBackendConnection, getConnectionToken, setConnectionToken, backendSocketUrl, isCurrentConnection } from './connection.js';

let exchanging = null;
let ready = null;
const SESSION_REQUEST_TIMEOUT_MS = 10000;
const SESSION_READY_TTL_MS = 60000;
const sessionKey = (scope, token) => JSON.stringify([scope.id, scope.url, scope.epoch, token]);

export async function ensureClientSession() {
    const scope = getBackendConnection();
    const token = getConnectionToken(scope);
    const key = sessionKey(scope, token);
    // An explicit remote profile without its own token never inherits cookies.
    if (!token && scope.id !== 'default') return;
    if (ready?.key === key && ready.expiresAt > Date.now()) return;
    if (exchanging?.key === key) return exchanging.promise;
    const exchange = { key, promise: null };
    exchange.promise = apiClient.post('/client/session', {}, { skipAuthCheck: true, timeout: SESSION_REQUEST_TIMEOUT_MS })
        .then((data) => {
            if (!isCurrentConnection(scope)) throw new Error('Backend changed');
            const currentToken = getConnectionToken(scope);
            if (currentToken !== token && currentToken !== data.accessToken) throw new Error('Login changed');
            if (typeof data.accessToken !== 'string' || !data.accessToken) throw new Error('Invalid client session credentials');
            setConnectionToken(data.accessToken, scope);
            ready = { key: sessionKey(scope, getConnectionToken(scope)), expiresAt: Date.now() + SESSION_READY_TTL_MS };
        })
        .finally(() => { if (exchanging === exchange) exchanging = null; });
    exchanging = exchange;
    return exchange.promise;
}

export async function authenticatedSocketUrl() {
    const scope = getBackendConnection();
    await ensureClientSession();
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    let result;
    try {
        // Tickets remain connection-specific and are never cached or shared.
        result = await apiClient.post('/client/socket-ticket', {}, { skipAuthCheck: true, timeout: SESSION_REQUEST_TIMEOUT_MS });
    } catch (error) {
        ready = null;
        throw error;
    }
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    return `${backendSocketUrl('ws')}?ticket=${encodeURIComponent(result.ticket)}`;
}
