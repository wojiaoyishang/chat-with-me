import React, {memo} from 'react';
import MessagePaginator from './MessagePaginator.jsx';
import MessageTools from './MessageTools.jsx';

const MessageActions = memo(({
                                 msg,
                                 msgId,
                                 markId,
                                 messages,
                                 onSwitchMessage,
                                 switchingMessageId,
                                 setSwitchingMessageId,
                                 setFadeMessages,
                                 isHovered,
                                 readonly,
                                 speechState,
                                 t
                             }) => {
    const isRight = msg.position === 'right';
    const showPaginator = messages?.[msg?.prevMessage]?.messages?.length > 1;
    const shouldShowTools = !readonly;

    return (
        <div
            className={`flex w-full min-w-0 items-center mt-1 transition-opacity duration-300 ${isRight ? 'justify-end pr-12' : 'justify-between pl-2 lg:pl-10'}`}
        >
            {isRight && (
                <div className={`ml-2 min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] ${showPaginator ? 'pr-1' : ''}`}>
                    {shouldShowTools && (
                        <MessageTools
                            msg={msg}
                            msgId={msgId}
                            markId={markId}
                            readonly={readonly}
                            speechState={speechState}
                        />
                    )}
                </div>
            )}

            {showPaginator && (
                <div className={isRight ? 'flex-shrink-0' : 'flex-1 min-w-0'}>
                    {!readonly && (
                        <MessagePaginator
                            msg={msg}
                            messages={messages}
                            isRight={isRight}
                            onSwitchMessage={onSwitchMessage}
                            switchingMessageId={switchingMessageId}
                            setSwitchingMessageId={setSwitchingMessageId}
                            setFadeMessages={setFadeMessages}
                            t={t}
                        />
                    )}
                </div>
            )}

            {!isRight && (
                <div className={`min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-1 text-right flex-shrink-0 [-webkit-overflow-scrolling:touch] ${showPaginator ? 'pl-1' : 'translate-x-[-0.4em]'}`}>
                    {shouldShowTools && (
                        <MessageTools
                            msg={msg}
                            msgId={msgId}
                            markId={markId}
                            readonly={readonly}
                            speechState={speechState}
                        />
                    )}
                </div>
            )}
        </div>
    );
});

MessageActions.displayName = 'MessageActions';

export default MessageActions;
