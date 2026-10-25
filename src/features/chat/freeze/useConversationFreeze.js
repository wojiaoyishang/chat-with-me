import {useCallback, useEffect, useRef, useState} from 'react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {onEvent} from '@/context/useEventStore.jsx';
import {createConversationFreezeController} from './conversationFreezeState.js';

export default function useConversationFreeze(conversationId) {
    const [snapshot, setSnapshot] = useState({conversationId, state: null, loading: Boolean(conversationId), error: ''});
    const controllerRef = useRef(null);
    useEffect(() => {
        if (!conversationId) { controllerRef.current = null; return; }
        setSnapshot({conversationId, state: null, loading: true, error: ''});
        const controller = createConversationFreezeController({
            conversationId,
            fetchState: signal => apiClient.get(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(conversationId)}/freeze-state`, {signal}),
            subscribe: (event, callback) => onEvent({event}).then(callback),
            notify: next => setSnapshot({conversationId, ...next}),
        });
        controllerRef.current = controller;
        const refreshWhenVisible = () => { if (!document.hidden) void controller.refresh(); };
        window.addEventListener('focus', refreshWhenVisible);
        document.addEventListener('visibilitychange', refreshWhenVisible);
        return () => {
            controller.dispose();
            window.removeEventListener('focus', refreshWhenVisible);
            document.removeEventListener('visibilitychange', refreshWhenVisible);
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [conversationId]);
    const current = snapshot.conversationId === conversationId ? snapshot : {state: null, loading: Boolean(conversationId), error: ''};
    const frozen = Boolean(current.state?.frozen);
    // Unknown state blocks mutations too: a second device may already hold the lease.
    const blocked = Boolean(conversationId) && (frozen || !current.state || Boolean(current.error));
    const blockedRef = useRef(blocked);
    blockedRef.current = blocked;
    const canMutate = useCallback(() => !blockedRef.current, []);
    const refresh = useCallback(() => controllerRef.current?.refresh(), []);
    return {...current, conversationId, frozen, blocked, canMutate, refresh};
}
