import { useCallback, useSyncExternalStore } from 'react';
import { isChatWindowOpen, subscribeChatWindows } from '../openChatWindow.js';
export default function useIndependentChatWindow(conversationId, documentId) {
    const snapshot = useCallback(() => isChatWindowOpen(conversationId, documentId), [conversationId, documentId]);
    return useSyncExternalStore(subscribeChatWindows, snapshot, () => false);
}
