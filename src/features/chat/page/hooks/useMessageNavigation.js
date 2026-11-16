import {useCallback, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

const waitForMessage = (messageId, scrollToMessage, signal) => new Promise(resolve => {
    let frame;
    let attempts = 0;
    const finish = success => {
        cancelAnimationFrame(frame);
        signal.removeEventListener('abort', abort);
        resolve(success);
    };
    const abort = () => finish(false);
    const locate = () => {
        if (signal.aborted) return finish(false);
        if (scrollToMessage(messageId, 'auto')) return finish(true);
        if (++attempts >= 30) return finish(false);
        frame = requestAnimationFrame(locate);
    };
    signal.addEventListener('abort', abort, {once: true});
    frame = requestAnimationFrame(locate);
});

export default function useMessageNavigation({conversationId, scrollToMessage, applyWindow}) {
    const [pendingMessageId, setPendingMessageId] = useState('');
    const request = useRef(null);
    const activeConversation = useRef(conversationId);
    activeConversation.current = conversationId;

    const cancelJump = useCallback(() => {
        request.current?.controller.abort();
        request.current = null;
        setPendingMessageId('');
    }, []);
    useEffect(() => {
        setPendingMessageId('');
        return () => {
            request.current?.controller.abort();
            request.current = null;
        };
    }, [conversationId]);

    const jumpToMessage = useCallback(messageId => {
        if (!conversationId || !messageId) return Promise.resolve(false);
        if (request.current?.messageId === messageId) return request.current.promise;
        cancelJump();
        if (scrollToMessage(messageId)) return Promise.resolve(true);

        const controller = new AbortController();
        const operation = {messageId, controller};
        request.current = operation;
        setPendingMessageId(messageId);
        const active = () => !controller.signal.aborted && activeConversation.current === conversationId;
        operation.promise = (async () => {
            try {
                const data = await apiClient.post(apiEndpoint.CHAT_MESSAGES_BATCH_ENDPOINT, {
                    conversationId, aroundMessageId: messageId, before: 3, after: 6,
                }, {signal: controller.signal, timeout: 30000});
                if (!active()) return false;
                if (!Array.isArray(data?.messagesOrder) || !data.messagesOrder.includes(messageId) || !data.messages?.[messageId]) {
                    throw new Error('目标消息已变化，请刷新消息列表后重试。');
                }
                applyWindow(data);
                const located = await waitForMessage(messageId, scrollToMessage, controller.signal);
                if (!active()) return false;
                if (!located) throw new Error('消息已加载，定位失败，请重试。');
                return true;
            } catch (error) {
                if (active()) toast.error(error?.message || '跳转消息失败，请重试。');
                return false;
            } finally {
                if (request.current === operation) {
                    request.current = null;
                    setPendingMessageId('');
                }
            }
        })();
        return operation.promise;
    }, [applyWindow, cancelJump, conversationId, scrollToMessage]);

    return {jumpToMessage, pendingMessageId, cancelJump};
}
