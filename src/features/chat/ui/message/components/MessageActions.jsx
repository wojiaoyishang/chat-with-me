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
                                 isActionActive = true,
                                 readonly,
                                 speechState,
                                 t,
                                 leadingContent = null
                             }) => {
    const isRight = msg.position === 'right';
    const isMid = msg.position === 'mid';
    const showPaginator = messages?.[msg?.prevMessage]?.messages?.length > 1;
    const shouldShowTools = !readonly;
    const revealOnInteraction = isRight || isMid;
    const toolVisibilityClassName = revealOnInteraction
        ? (isActionActive ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none')
        : 'opacity-100 visible pointer-events-auto';

    const renderPaginator = () => {
        if (!showPaginator || readonly) return null;

        return (
            <div className="shrink-0">
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
            </div>
        );
    };

    const renderTools = (extraClassName = '') => {
        if (!shouldShowTools) return null;

        return (
            <div
                className={`min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-1 transition-opacity duration-200 [-webkit-overflow-scrolling:touch] ${toolVisibilityClassName} ${extraClassName}`}
            >
                <MessageTools
                    msg={msg}
                    msgId={msgId}
                    markId={markId}
                    readonly={readonly}
                    speechState={speechState}
                />
            </div>
        );
    };

    if (isMid) {
        return (
            <div
                data-message-action-area="true"
                className="flex w-full min-w-0 items-center justify-between gap-3 mt-1 min-h-[2rem] transition-all duration-300"
            >
                <div className="flex min-w-0 shrink-0 items-center justify-start gap-2">
                    {leadingContent}
                </div>

                <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1">
                    {renderTools('ml-auto max-w-full')}
                    {renderPaginator()}
                </div>
            </div>
        );
    }

    if (isRight) {
        return (
            <div
                data-message-action-area="true"
                className="flex w-full min-w-0 items-center justify-end mt-1 min-h-[2rem] pr-12 transition-all duration-300"
            >
                <div className="ml-auto flex min-w-0 max-w-full items-center justify-end gap-1">
                    {renderTools('max-w-[calc(100vw-7rem)] sm:max-w-full')}
                    {renderPaginator()}
                </div>
            </div>
        );
    }

    return (
        <div
            data-message-action-area="true"
            className="flex w-full min-w-0 items-center justify-start mt-1 min-h-[2rem] pl-2 lg:pl-10 transition-all duration-300"
        >
            <div className="flex min-w-0 max-w-full items-center justify-start gap-1">
                {renderPaginator()}
                {renderTools('max-w-[calc(100vw-4rem)] sm:max-w-full')}
            </div>
        </div>
    );
});

MessageActions.displayName = 'MessageActions';

export default MessageActions;
