import React, {memo, useRef, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import AttachmentShowcase from '../../AttachmentShowcase';
import {resolveMessageCopyContent} from '../utils/copyContent.js';
import KnowledgeGraphViewer from './KnowledgeGraphViewer.jsx';
import LeftAvatarName from './LeftAvatarName.jsx';
import MessageActions from './MessageActions.jsx';
import TextOnlyMessageContent from './TextOnlyMessageContent.jsx';
import SpeechOverlayHighlighter from './SpeechOverlayHighlighter.jsx';

const MessageItem = memo(({
                              msgId,
                              msg,
                              markId,
                              messages,
                              isFading,
                              animationClass,
                              switchingMessageId,
                              setSwitchingMessageId,
                              setFadeMessages,
                              onSwitchMessage,
                              leavingMessages,
                              speechState,
                              t
                          }) => {
    const isRight = msg.position === 'right';
    const isMid = msg.position === 'mid';
    const readonly = msg.readonly;
    const markdownRef = useRef(null);
    const displayName = msg.name || 'U';
    const hasAttachments = msg.attachments?.length > 0;
    const hasContent = msg.content?.trim();
    const copyContent = resolveMessageCopyContent(msg.content, msg.extraInfo) || '';

    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowExpand = isMid && copyContent.length > 650;
    const [isMobileActive, setIsMobileActive] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    const hoverHandlers = isRight && !readonly ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    } : {};

    const actionProps = {
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
    };

    const renderMessageContent = () => {
        if (isMid) {
            return (
                <div className="w-full py-2 px-1">
                    <div
                        className="relative group bg-gray-50/40 border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-sm"
                    >
                        <div className="flex flex-col items-start w-full px-5 py-5">
                            <KnowledgeGraphViewer key={msgId} msg={msg} className="w-full"/>

                            <div
                                onClick={() => setIsMobileActive(!isMobileActive)}
                                onBlur={() => setIsMobileActive(false)}
                                tabIndex={0}
                                className="relative group bg-gray-50/40 rounded-2xl transition-all duration-300 outline-none"
                            >
                                <div ref={markdownRef} data-tts-message-id={msgId} className="relative">
                                    <div className="relative z-[2]">
                                    <MarkdownRenderer
                                        contextId={msgId}
                                        content={msg.content}
                                        replacement={msg?.extraInfo?.replace}
                                        msg={msg}
                                    />
                                    </div>
                                    <SpeechOverlayHighlighter containerRef={markdownRef} msgId={msgId} speechState={speechState}/>
                                </div>

                                {hasAttachments && (
                                    <div className="w-full border rounded-md mt-3">
                                        <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                                    </div>
                                )}

                                {!isExpanded && shouldShowExpand && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f9fafb] via-[#f9fafb]/95 to-transparent pointer-events-none"
                                    />
                                )}
                            </div>

                            <div
                                className={`w-full grid transition-all duration-300 ease-in-out ${shouldShowExpand ? 'grid-rows-[1fr] mt-3' : (isMobileActive ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr] group-hover:mt-4')}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="flex items-center justify-between w-full">
                                        {shouldShowExpand ? (
                                            <button
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                className="cursor-pointer flex items-center gap-1 text-gray-400 hover:text-blue-500 text-sm font-medium transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp size={16}/>
                                                        {t('collapse')}
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown size={16}/>
                                                        {t('expand')}
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div/>
                                        )}

                                        <div
                                            className={`transition-all duration-300 ${shouldShowExpand ? 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 delay-100' : 'opacity-100'}`}
                                        >
                                            <MessageActions {...actionProps}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (hasAttachments && !hasContent) {
            return (
                <>
                    {!isRight && <LeftAvatarName msg={msg} isLeaving={leavingMessages.has(msgId)}/>} 

                    {isRight ? (
                        <div className="flex items-start gap-2 max-w-full mt-1">
                            <div className="flex-1 min-w-[150px] max-w-[calc(100%-3rem)] sm:pl-0 pl-7">
                                <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                            </div>
                            <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
                                <AvatarImage src={msg.avatar} alt={displayName}/>
                                <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                        <div className="max-w-[95%] pl-7 mb-2">
                            <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                        </div>
                    )}

                    <KnowledgeGraphViewer key={msgId} msg={msg}/>
                </>
            );
        }

        if (hasAttachments && hasContent) {
            return (
                <>
                    {isRight ? (
                        <>
                            <div className="max-w-[90%] lg:max-w-[55%] ml-auto pr-10 mb-2">
                                <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                            </div>
                            <TextOnlyMessageContent
                                msg={msg}
                                msgId={msgId}
                                isLeaving={leavingMessages.has(msgId)}
                                speechState={speechState}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            <LeftAvatarName msg={msg} isLeaving={leavingMessages.has(msgId)}/>
                            <div className="max-w-[95%] pl-7 mb-2">
                                <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                            </div>
                            <TextOnlyMessageContent
                                msg={msg}
                                msgId={msgId}
                                isLeaving={leavingMessages.has(msgId)}
                                speechState={speechState}
                            />
                        </div>
                    )}
                </>
            );
        }

        if (hasContent) {
            return isRight ? (
                <TextOnlyMessageContent
                    msg={msg}
                    msgId={msgId}
                    isLeaving={leavingMessages.has(msgId)}
                    speechState={speechState}
                />
            ) : (
                <div className="flex flex-col items-start w-full">
                    <LeftAvatarName msg={msg} isLeaving={leavingMessages.has(msgId)}/>
                    <TextOnlyMessageContent
                        msg={msg}
                        msgId={msgId}
                        isLeaving={leavingMessages.has(msgId)}
                        speechState={speechState}
                    />
                </div>
            );
        }

        return (
            <>
                {isRight ? (
                    <div className="flex justify-end items-start gap-3 max-w-[80%] ml-auto">
                        <div className="h-10 w-10"/>
                        <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={msg.avatar} alt={displayName}/>
                            <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                    </div>
                ) : (
                    <div className="flex flex-col items-start w-full">
                        <LeftAvatarName msg={msg} isLeaving={leavingMessages.has(msgId)}/>
                        <div className="pl-7 min-h-[1.25rem]"/>
                    </div>
                )}
                <KnowledgeGraphViewer key={msgId} msg={msg}/>
            </>
        );
    };

    return (
        <div
            key={msgId}
            className={`flex flex-col w-full transition-all duration-300 ease-in-out ${isRight ? 'items-end' : 'items-start'} ${animationClass}`}
            {...hoverHandlers}
        >
            {renderMessageContent()}

            {!isMid && <MessageActions {...actionProps}/>}
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.msgId === nextProps.msgId &&
        prevProps.markId === nextProps.markId &&
        prevProps.msg === nextProps.msg &&
        prevProps.messages[prevProps.msgId] === nextProps.messages[nextProps.msgId] &&
        prevProps.animationClass === nextProps.animationClass &&
        prevProps.isFading === nextProps.isFading &&
        prevProps.leavingMessages.has(prevProps.msgId) === nextProps.leavingMessages.has(nextProps.msgId) &&
        (prevProps.speechState?.messageId === prevProps.msgId ? `${prevProps.speechState?.status || ''}:${prevProps.speechState?.currentSegmentId || ''}` : '') ===
        (nextProps.speechState?.messageId === nextProps.msgId ? `${nextProps.speechState?.status || ''}:${nextProps.speechState?.currentSegmentId || ''}` : '')
    );
});

MessageItem.displayName = 'MessageItem';

export default MessageItem;
