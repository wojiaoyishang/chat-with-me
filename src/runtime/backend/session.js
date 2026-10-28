import apiClient from '../../lib/apiClient.js';
import { getBackendConnection, getConnectionToken, setConnectionToken, backendSocketUrl, isCurrentConnection } from './connection.js';

let exchanging = null;
const SESSION_REQUEST_TIMEOUT_MS = 10000;
export async function ensureClientSession() {
    const scope = getBackendConnection();
    // An explicit remote profile without its own token never inherits cookies.
    if (!getConnectionToken(scope) && scope.id !== 'default') return;
    if (!exchanging) exchanging = apiClient.post('/client/session', {}, { skipAuthCheck: true, timeout: SESSION_REQUEST_TIMEOUT_MS })
        .then((data) => setConnectionToken(data.accessToken, scope))
        .finally(() => { exchanging = null; });
    await exchanging;
}

export async function authenticatedSocketUrl() {
    const scope = getBackendConnection();
    await ensureClientSession();
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    const result = await apiClient.post('/client/socket-ticket', {}, { skipAuthCheck: true, timeout: SESSION_REQUEST_TIMEOUT_MS });
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    return `${backendSocketUrl('ws')}?ticket=${encodeURIComponent(result.ticket)}`;
}
