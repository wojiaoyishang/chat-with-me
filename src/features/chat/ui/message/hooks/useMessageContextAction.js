import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {emitEvent} from '@/context/useEventStore.jsx';
import {useConversationMutationGuard} from '../../../freeze/ConversationFreezeContext.jsx';

const waitForPoll = signal => new Promise(resolve => {
    const finish = () => {
        clearTimeout(timer);
        signal.removeEventListener('abort', finish);
        resolve();
    };
    const timer = setTimeout(finish, 1500);
    signal.addEventListener('abort', finish, {once: true});
    if (signal.aborted) finish();
});

export default function useMessageContextAction({conversationId, messageId, toolCallId}) {
    const {t} = useTranslation();
    const freeze = useConversationMutationGuard(conversationId);
    const [pending, setPending] = useState('');
    const [error, setError] = useState('');
    const request = useRef(null);
    const identity = `${conversationId}:${messageId}:${toolCallId || ''}`;
    const currentIdentity = useRef(identity);
    currentIdentity.current = identity;
    useEffect(() => {
        setPending('');
        setError('');
        return () => { request.current?.abort(); request.current = null; };
    }, [identity]);

    const run = async action => {
        if (request.current || !freeze.canMutate()) return false;
        const controller = new AbortController();
        const requestIdentity = identity;
        request.current = controller;
        const active = () => !controller.signal.aborted && currentIdentity.current === requestIdentity;
        const publish = (event, payload) => emitEvent({event, payload, conversationId, localOnly: true});
        setPending(action);
        setError('');
        try {
            const endpoint = `${apiEndpoint.CHAT_MESSAGES_ENDPOINT}/${encodeURIComponent(messageId)}/context`;
            let response = await apiClient.post(endpoint, {conversationId, action, ...(toolCallId ? {toolCallId} : {})}, {signal: controller.signal});
            if (!active()) return false;
            if (action === 'compress') {
                const jobId = response?.jobId;
                if (!jobId) throw new Error(t('messageConfig.invalidResponse'));
                publish('context.compaction_state.changed', {value: {...response, automatic: false}});
                while (['compressing', 'committing'].includes(response.status)) {
                    await waitForPoll(controller.signal);
                    if (!active()) return false;
                    response = await apiClient.get(endpoint, {params: {conversationId, jobId}, signal: controller.signal});
                    if (!active()) return false;
                    if (response?.jobId !== jobId) throw new Error(t('messageConfig.invalidResponse'));
                }
                publish('context.compaction_state.changed', {value: {...response, automatic: false}});
                if (response.status !== 'completed') throw new Error(response.error || t('messageContext.failed'));
                response = response.result;
            }
            if (!response || !Number.isInteger(response.contextRevision)) throw new Error(t('messageConfig.invalidResponse'));
            publish('context.state.changed', response);
            toast.success(t(`messageContext.${action}Success`));
            return true;
        } catch (cause) {
            if (active()) {
                const message = cause?.message || t('messageContext.failed');
                setError(message);
                toast.error(message);
            }
            return false;
        } finally {
            if (active()) setPending('');
            if (request.current === controller) request.current = null;
        }
    };
    return {run, pending, error, blocked: freeze.blocked};
}
