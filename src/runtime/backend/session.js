import apiClient from '../../lib/apiClient.js';
import { getBackendConnection, getConnectionToken, setConnectionToken, backendSocketUrl, isCurrentConnection } from './connection.js';

let exchanging = null;
export async function ensureClientSession() {
    const scope = getBackendConnection();
    // An explicit remote profile without its own token never inherits cookies.
    if (!getConnectionToken(scope) && scope.id !== 'default') return;
    if (!exchanging) exchanging = apiClient.post('/client/session', {}, { skipAuthCheck: true })
        .then((data) => setConnectionToken(data.accessToken, scope))
        .finally(() => { exchanging = null; });
    await exchanging;
}

export async function authenticatedSocketUrl() {
    const scope = getBackendConnection();
    await ensureClientSession();
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    const result = await apiClient.post('/client/socket-ticket', {}, { skipAuthCheck: true });
    if (!isCurrentConnection(scope)) throw new Error('Backend changed');
    return `${backendSocketUrl('ws')}?ticket=${encodeURIComponent(result.ticket)}`;
}
