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
    const showRightTools = isRight && isHovered;

    return (
        <div
            className={`flex items-center mt-1 transition-opacity duration-300 ${isRight ? 'justify-end pr-12' : 'justify-between pl-2 lg:pl-10'}`}
        >
            {isRight && (
                <div className={'ml-2 flex items-center ' + (showPaginator ? 'pr-1' : '')}>
                    <div className="relative flex items-center justify-center flex-shrink-0">
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${showRightTools ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            {shouldShowTools && <MessageTools msg={msg} msgId={msgId} markId={markId} readonly={readonly} speechState={speechState}/>} 
                        </div>
                        <div className="flex items-center justify-center invisible">
                            {shouldShowTools && <MessageTools msg={msg} msgId={msgId} markId={markId} readonly={readonly} speechState={speechState}/>} 
                        </div>
                    </div>
                </div>
            )}

            {showPaginator && (
                <div className={isRight ? '' : 'flex-1'}>
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
                <div className={'text-right flex-shrink-0 ' + (showPaginator ? 'pl-1' : 'translate-x-[-0.4em]')}>
                    {shouldShowTools && <MessageTools msg={msg} msgId={msgId} markId={markId} readonly={readonly} speechState={speechState}/>} 
                </div>
            )}
        </div>
    );
});

MessageActions.displayName = 'MessageActions';

export default MessageActions;
