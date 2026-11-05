import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { getBackendConnection, getConnectionToken, getConnectionUserId, subscribeBackend } from '../../../../runtime/backend/connection.js';
import { chatboxResourceIdentity, createChatboxResourceLoader } from './chatboxResource.js';

export const chatboxResourceScope = () => {
    const connection = getBackendConnection();
    return chatboxResourceIdentity(connection, getConnectionUserId(), getConnectionToken(connection));
};

export const chatboxResources = createChatboxResourceLoader({
    getScope: chatboxResourceScope,
    fetchConfiguration: ({ conversationId, catalogRevision, includeSetup, signal }) => apiClient.get(apiEndpoint.CHATBOX_ENDPOINT, {
        params: { ...(conversationId ? { conversationId } : {}), ...(catalogRevision ? { catalogRevision } : {}), includeSetup },
        signal,
        timeout: 15_000,
    }),
});

let scope = chatboxResourceScope();
subscribeBackend(() => {
    const next = chatboxResourceScope();
    if (scope !== next) { scope = next; chatboxResources.clear(); }
});
