import React, {memo, useCallback} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

const MessagePaginator = memo(({
                                   msg,
                                   messages,
                                   isRight,
                                   onSwitchMessage,
                                   switchingMessageId,
                                   setSwitchingMessageId,
                                   setFadeMessages,
                                   t
                               }) => {
    const prevMsgId = msg?.prevMessage;
    const msgPrev = messages?.[prevMsgId];

    if (!msgPrev?.messages?.length) return null;

    const msgIdIndex = msgPrev.messages.indexOf(msgPrev.nextMessage);
    const totalPages = msgPrev.messages.length;
    const disabledNext = msgIdIndex === totalPages - 1;
    const disabledPrev = msgIdIndex === 0;

    const handleSwitch = useCallback(async (direction) => {
        if (!onSwitchMessage) return;

        const nextIndex = direction === 'next' ? msgIdIndex + 1 : msgIdIndex - 1;
        const nextMessageId = msgPrev.messages[nextIndex];

        setSwitchingMessageId(msgPrev.nextMessage);
        setFadeMessages(prev => new Set([...prev, nextMessageId]));

        try {
            await onSwitchMessage(msgPrev, prevMsgId, direction === 'next' ? 1 : -1);
        } finally {
            setSwitchingMessageId(null);
        }
    }, [msgIdIndex, msgPrev, prevMsgId, onSwitchMessage, setSwitchingMessageId, setFadeMessages]);

    return (
        <div
            className={`flex items-center gap-1 text-sm transition-opacity duration-300 ${isRight ? 'justify-end' : 'justify-start'}`}
        >
            <button
                onClick={() => handleSwitch('prev')}
                disabled={disabledPrev || switchingMessageId !== null}
                className={`p-1 rounded-full transition-colors cursor-pointer ${disabledPrev || switchingMessageId !== null
                    ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                    : 'hover:bg-gray-200'
                }`}
                aria-label={t('prev_page')}
            >
                <ChevronLeft size={12}/>
            </button>
            <span className="px-1.5 py-0.5 rounded-md">
                {msgIdIndex + 1} / {totalPages}
            </span>
            <button
                onClick={() => handleSwitch('next')}
                disabled={disabledNext || switchingMessageId !== null}
                className={`p-1 rounded-full transition-colors cursor-pointer ${disabledNext || switchingMessageId !== null
                    ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                    : 'hover:bg-gray-200'
                }`}
                aria-label={t('next_page')}
            >
                <ChevronRight size={12}/>
            </button>
        </div>
    );
});

MessagePaginator.displayName = 'MessagePaginator';

export default MessagePaginator;
