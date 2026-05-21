import React, {forwardRef, memo, useCallback, useState} from 'react';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';
import MessageItem from './message/components/MessageItem.jsx';
import useMessageAnimation from './message/hooks/useMessageAnimation.js';
import useMessageEvents from './message/hooks/useMessageEvents.js';
import './message/styles/messageAnimations.js';

const MessageContainer = forwardRef(({
                                         messagesOrder = [],
                                         messages = {},
                                         onLoadMore,
                                         onSwitchMessage,
                                         markId
                                     }, ref) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [switchingMessageId, setSwitchingMessageId] = useState(null);
    const {t} = useTranslation();

    const {
        enteringMessages,
        leavingMessages,
        fadeMessages,
        setFadeMessages,
        getMessageAnimationClass
    } = useMessageAnimation(messagesOrder);

    useMessageEvents(markId, setSwitchingMessageId);

    const handleLoadMore = useCallback(async () => {
        if (isLoadingMore || !onLoadMore) return;

        setIsLoadingMore(true);
        try {
            const result = await onLoadMore();
            if (result === false) {
                throw new Error(t('unknown_error'));
            }
        } catch (error) {
            toast.error(t('load_more_error', {message: error?.message || t('unknown_error')}));
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, onLoadMore, t]);

    const renderLoadMore = useCallback((msgId) => (
        <div
            key={msgId}
            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${leavingMessages.has(msgId)
                ? 'opacity-0 -translate-y-2'
                : enteringMessages.has(msgId)
                    ? 'opacity-100 translate-y-0 animate-fade-in-up'
                    : 'opacity-100'
            }`}
        >
            {isLoadingMore ? (
                <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-gray-400 border-solid rounded-full animate-spin"/>
                </div>
            ) : (
                <button
                    onClick={handleLoadMore}
                    className="px-5 py-2 text-gray-600 text-sm font-medium bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors duration-200 cursor-pointer"
                >
                    {t('load_more')}
                </button>
            )}
        </div>
    ), [isLoadingMore, leavingMessages, enteringMessages, handleLoadMore, t]);

    const renderSwitchingLoader = useCallback((msgId) => (
        <div
            key={`loading-${msgId}`}
            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${fadeMessages.has(msgId)
                ? 'animate-fade-in'
                : enteringMessages.has(msgId)
                    ? 'animate-fade-in-up'
                    : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center justify-center">
                <ThreeDotLoading/>
                <span className="mt-2 text-sm text-gray-500">{t('loading_new_message')}</span>
            </div>
        </div>
    ), [fadeMessages, enteringMessages, t]);

    const renderMessage = useCallback((msgId, index) => {
        if (messagesOrder.slice(0, index).some(id => switchingMessageId === id)) return null;

        if (msgId === '<PREV_MORE>') return renderLoadMore(msgId);

        const msg = messages[msgId];
        if (!msg || msg.position === null || msg.position === undefined) return null;

        if (switchingMessageId === msgId) return renderSwitchingLoader(msgId);

        const requiredFields = ['prevMessage', 'messages', 'nextMessage'];
        for (const field of requiredFields) {
            if (msg[field] === undefined) {
                console.error(`Message ${msgId} is invalid, missing ${field}.`);
                return null;
            }
        }

        if (!Array.isArray(msg.messages)) {
            console.error(`Message ${msgId} is invalid, messages is not an array.`);
            return null;
        }

        const isFading = fadeMessages.has(msgId) && !enteringMessages.has(msgId);
        const animationClass = getMessageAnimationClass(msgId, isFading);

        return (
            <MessageItem
                key={msgId}
                msgId={msgId}
                msg={msg}
                markId={markId}
                messages={messages}
                isFading={isFading}
                animationClass={animationClass}
                switchingMessageId={switchingMessageId}
                setSwitchingMessageId={setSwitchingMessageId}
                setFadeMessages={setFadeMessages}
                onSwitchMessage={onSwitchMessage}
                leavingMessages={leavingMessages}
                t={t}
            />
        );
    }, [
        messagesOrder,
        switchingMessageId,
        messages,
        renderLoadMore,
        renderSwitchingLoader,
        fadeMessages,
        enteringMessages,
        getMessageAnimationClass,
        markId,
        onSwitchMessage,
        setFadeMessages,
        leavingMessages,
        t
    ]);

    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messagesOrder.map((msgId, index) => renderMessage(msgId, index))}
        </div>
    );
});

MessageContainer.displayName = 'MessageContainer';

export default memo(MessageContainer);
