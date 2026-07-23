import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import AttachmentShowcase from '../../AttachmentShowcase';
import KnowledgeGraphViewer from './KnowledgeGraphViewer.jsx';
import LeftAvatarName from './LeftAvatarName.jsx';
import MessageActions from './MessageActions.jsx';
import MessageAvatarMenu from './MessageAvatarMenu.jsx';
import TextOnlyMessageContent from './TextOnlyMessageContent.jsx';
import SpeechOverlayHighlighter from './SpeechOverlayHighlighter.jsx';
import {useIsMobile} from '@/lib/tools.jsx';

const MID_COLLAPSED_CONTENT_MAX_HEIGHT = 360;
const MID_OVERFLOW_TOLERANCE = 18;

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
                              onSpeechTextClick,
                              highlighted = false,
                              t
                          }) => {
    const isRight = msg.position === 'right';
    const isMid = msg.position === 'mid';
    const readonly = msg.readonly;
    const rootRef = useRef(null);
    const markdownRef = useRef(null);
    const midBodyRef = useRef(null);
    const displayName = msg.name || 'U';
    const hasAttachments = msg.attachments?.length > 0;
    const hasContent = msg.content?.trim();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMidOverflowing, setIsMidOverflowing] = useState(false);
    const shouldShowExpand = isMid && isMidOverflowing;
    const [isMobileActive, setIsMobileActive] = useState(false);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    const [isHovered, setIsHovered] = useState(false);
    const canRevealActions = !readonly && (isRight || isMid);
    const isActionActive = !canRevealActions || isHovered || isMobileActive;
    const hoverHandlers = !isMobile && canRevealActions ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    } : {};

    const getLabel = useCallback((key, fallback) => {
        const value = typeof t === 'function' ? t(key) : undefined;
        return value && value !== key ? value : fallback;
    }, [t]);

    const actionProps = {
        msg,
        msgId,
        markId,
        messages,
        onSwitchMessage,
        switchingMessageId,
        setSwitchingMessageId,
        setFadeMessages,
        isActionActive,
        readonly,
        speechState,
        t
    };

    const closeAvatarMenu = useCallback(() => {
        setIsAvatarMenuOpen(false);
    }, []);

    const openAvatarMenu = useCallback((event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        setIsAvatarMenuOpen(true);
    }, []);

    const handleRootClickCapture = useCallback((event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest('[data-message-avatar-trigger="true"]')) return;
        openAvatarMenu(event);
    }, [openAvatarMenu]);

    const handleRootClick = useCallback((event) => {
        if (!isMobile || !canRevealActions) return;

        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest('button, a, input, textarea, select, [role="button"], [data-message-avatar-trigger="true"], [data-radix-popper-content-wrapper]')) {
            return;
        }

        setIsMobileActive(true);
    }, [canRevealActions, isMobile]);

    useEffect(() => {
        if (!isMobile || !isMobileActive) return undefined;

        const handlePointerDown = (event) => {
            const target = event.target;
            if (target instanceof Node && rootRef.current?.contains(target)) return;
            setIsMobileActive(false);
        };

        document.addEventListener('pointerdown', handlePointerDown, true);
        return () => document.removeEventListener('pointerdown', handlePointerDown, true);
    }, [isMobile, isMobileActive]);

    useEffect(() => {
        if (!isMid) return;
        setIsExpanded(false);
    }, [isMid, msgId, msg.content, msg.attachments?.length]);

    useEffect(() => {
        if (!isMid) {
            setIsMidOverflowing(false);
            return undefined;
        }

        const node = midBodyRef.current;
        if (!node) return undefined;

        let frameId = null;
        const measure = () => {
            if (frameId) cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                const nextOverflowing = node.scrollHeight > MID_COLLAPSED_CONTENT_MAX_HEIGHT + MID_OVERFLOW_TOLERANCE;
                setIsMidOverflowing(prev => (prev === nextOverflowing ? prev : nextOverflowing));
            });
        };

        measure();

        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
        resizeObserver?.observe(node);
        window.addEventListener('resize', measure);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            resizeObserver?.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [isMid, msg.content, msg.extraInfo?.replace, msg.attachments?.length]);

    const avatarTriggerProps = {
        'data-message-avatar-trigger': 'true',
        title: getLabel('message_menu', '点击打开消息菜单'),
    };

    const renderLeftAvatarName = () => (
        <div
            {...avatarTriggerProps}
            className="inline-flex cursor-pointer select-none touch-manipulation"
        >
            <LeftAvatarName msg={msg} isLeaving={leavingMessages.has(msgId)}/>
        </div>
    );

    const renderRightAvatar = (className = 'h-10 w-10 flex-shrink-0') => (
        <Avatar
            {...avatarTriggerProps}
            className={`${className} cursor-pointer select-none touch-manipulation`}
        >
            <AvatarImage src={msg.avatar} alt={displayName}/>
            <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
    );

    const textOnlyMessageProps = {
        msg,
        msgId,
        markId,
        isLeaving: leavingMessages.has(msgId),
        speechState,
        onSpeechTextClick,
        avatarClickProps: avatarTriggerProps,
    };

    const renderMidExpandControl = () => {
        if (!shouldShowExpand) return null;

        return (
            <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className="shrink-0 cursor-pointer flex items-center gap-1 text-gray-400 hover:text-blue-500 text-sm font-medium transition-colors"
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
        );
    };

    const renderMessageContent = () => {
        if (isMid) {
            const showMidActionsRow = shouldShowExpand || isActionActive;

            return (
                <div className="w-full py-2 px-1">
                    <div
                        className={`relative bg-gray-50/40 border border-gray-100 rounded-2xl transition-all duration-300 ${isActionActive ? 'shadow-sm' : ''}`}
                    >
                        <div className="flex flex-col items-start w-full px-4 py-4 sm:px-5 sm:py-5">
                            <KnowledgeGraphViewer key={msgId} msg={msg} className="w-full"/>

                            <div
                                ref={midBodyRef}
                                className={`relative w-full bg-gray-50/40 rounded-2xl transition-[max-height] duration-300 outline-none ${shouldShowExpand && !isExpanded ? 'max-h-[360px] overflow-hidden' : 'max-h-none overflow-visible'}`}
                            >
                                <div
                                        ref={markdownRef}
                                        data-tts-message-id={msgId}
                                        data-speech-seek-active={speechState?.messageId === msgId && ['loading', 'playing', 'paused'].includes(speechState?.status) ? 'true' : undefined}
                                        onClickCapture={onSpeechTextClick ? (event) => onSpeechTextClick(event, msgId) : undefined}
                                        className={`relative ${speechState?.messageId === msgId && ['loading', 'playing', 'paused'].includes(speechState?.status) ? 'cursor-pointer' : ''}`}
                                    >
                                    <div className="relative z-[2]">
                                        <MarkdownRenderer
                                            contextId={msgId}
                                            markId={markId}
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
                                className={`w-full grid transition-all duration-300 ease-in-out ${showMidActionsRow ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr] mt-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <MessageActions
                                        {...actionProps}
                                        leadingContent={renderMidExpandControl()}
                                    />
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
                    {!isRight && renderLeftAvatarName()}

                    {isRight ? (
                        <div className="flex items-start gap-2 max-w-full mt-1">
                            <div className="flex-1 min-w-[150px] max-w-[calc(100%-3rem)] sm:pl-0 pl-7">
                                <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                            </div>
                            {renderRightAvatar('h-10 w-10 flex-shrink-0 mt-1')}
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
                            <TextOnlyMessageContent {...textOnlyMessageProps}/>
                        </>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            {renderLeftAvatarName()}
                            <div className="max-w-[95%] pl-7 mb-2">
                                <AttachmentShowcase attachmentsMeta={msg.attachments} msgMode={true}/>
                            </div>
                            <TextOnlyMessageContent {...textOnlyMessageProps}/>
                        </div>
                    )}
                </>
            );
        }

        if (hasContent) {
            return isRight ? (
                <TextOnlyMessageContent {...textOnlyMessageProps}/>
            ) : (
                <div className="flex flex-col items-start w-full">
                    {renderLeftAvatarName()}
                    <TextOnlyMessageContent {...textOnlyMessageProps}/>
                </div>
            );
        }

        return (
            <>
                {isRight ? (
                    <div className="flex justify-end items-start gap-3 max-w-[80%] ml-auto">
                        <div className="h-10 w-10"/>
                        {renderRightAvatar()}
                    </div>
                ) : (
                    <div className="flex flex-col items-start w-full">
                        {renderLeftAvatarName()}
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
            ref={rootRef}
            data-message-id={msgId}
            data-message-role={msg?.role || (isMid ? 'system' : (isRight ? 'user' : 'assistant'))}
            className={`flex flex-col w-full rounded-2xl transition-all duration-300 ease-in-out ${isRight ? 'items-end' : 'items-start'} ${animationClass} ${highlighted ? 'ring-2 ring-blue-400/80 ring-offset-4 ring-offset-white' : ''}`}
            onClickCapture={handleRootClickCapture}
            onClick={handleRootClick}
            {...hoverHandlers}
        >
            {renderMessageContent()}

            {!isMid && <MessageActions {...actionProps}/>}            
            <MessageAvatarMenu
                open={isAvatarMenuOpen}
                onClose={closeAvatarMenu}
                msg={msg}
                msgId={msgId}
                markId={markId}
                readonly={readonly}
                speechState={speechState}
                displayName={displayName}
                t={t}
            />
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
        prevProps.highlighted === nextProps.highlighted &&
        prevProps.leavingMessages.has(prevProps.msgId) === nextProps.leavingMessages.has(nextProps.msgId) &&
        (prevProps.speechState?.messageId === prevProps.msgId ? `${prevProps.speechState?.status || ''}:${prevProps.speechState?.currentSegmentId || ''}:${prevProps.speechState?.currentSegmentPosition ?? ''}` : '') ===
        (nextProps.speechState?.messageId === nextProps.msgId ? `${nextProps.speechState?.status || ''}:${nextProps.speechState?.currentSegmentId || ''}:${nextProps.speechState?.currentSegmentPosition ?? ''}` : '')
    );
});

MessageItem.displayName = 'MessageItem';

export default MessageItem;
