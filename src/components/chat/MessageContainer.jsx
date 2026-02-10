import React, {forwardRef, useState, useEffect, useRef, useCallback, useMemo, memo} from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import AttachmentShowcase from './AttachmentShowcase';
import {Menu, PenLine, Copy, RotateCw, Info, ChevronLeft, ChevronRight} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {emitEvent, onEvent} from "@/context/useEventStore.jsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {copyTextToClipboard, useIsMobile} from "@/lib/tools.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

/**
 * 处理消息操作工具函数
 * @param {string} action - 操作类型: "edit", "copy", "regenerate"
 * @param {object} messageData - 消息数据对象
 * @param {function} t - 翻译函数
 */
const handleMessageAction = (action, messageData, t) => {
    const {msg, markId, msgId, displayContent} = messageData;

    switch (action) {
        case "edit":
            emitEvent({
                type: "widget",
                target: "ChatBox",
                payload: {
                    command: "Set-EditMessage",
                    isEdit: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId: msgId
                },
                markId: markId,
                fromWebsocket: true
            });
            break;
        case "copy":
            copyTextToClipboard(displayContent).then(() => {
                toast.success(t("message_copied"));
            }).catch(err => {
                toast.error(t("message_not_copied", {message: err}));
            });
            break;
        case "regenerate":
            emitEvent({
                type: "widget",
                target: "ChatBox",
                payload: {
                    command: "Set-EditMessage",
                    isEdit: true,
                    immediate: true,
                    isRegenerate: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId: msgId
                },
                markId: markId,
                fromWebsocket: true
            });
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
};

/**
 * 消息菜单组件 - 移动端下拉菜单
 */
const MessageMenuButton = memo(({messageData}) => {
    const {t} = useTranslation();
    const {msg, markId, msgId, displayContent} = messageData;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer md:hidden"
                    aria-label={t("menu_function")}
                >
                    <Menu size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onSelect={() => handleMessageAction("edit", messageData, t)}
                >
                    <PenLine size={16}/>
                    {t('edit_message')}
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onSelect={() => handleMessageAction("copy", messageData, t)}
                >
                    <Copy size={16}/>
                    {t('copy_message')}
                </DropdownMenuItem>

                {(msg.allowRegenerate || msg.allowRegenerate === undefined) && (
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={() => handleMessageAction("regenerate", messageData, t)}
                    >
                        <RotateCw size={16}/>
                        {t('regenerate_message')}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

/**
 * 工具提示组件 - 根据设备类型显示不同的提示方式
 */
const TooltipInfo = memo(({tip, t}) => {
    const isMobile = useIsMobile();

    if (!tip) return null;

    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label={t("message_info")}
                    >
                        <Info size={16} className="text-gray-600 hover:text-gray-800"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-3">
                    <div style={{whiteSpace: 'pre-line'}} className="text-sm">
                        {tip}
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label={t("message_info")}
                >
                    <Info size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <div style={{whiteSpace: 'pre-line'}}>
                    {tip}
                </div>
            </TooltipContent>
        </Tooltip>
    );
});

/**
 * 消息工具栏组件 - 桌面端显示的工具按钮
 */
const MessageTools = memo(({messageData}) => {
    const {t} = useTranslation();
    const {msg, markId, msgId, displayContent} = messageData;

    return (
        <div className="flex gap-1">
            <button
                onClick={() => handleMessageAction("edit", messageData, t)}
                className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                aria-label={t("edit_message")}
            >
                <PenLine size={16} className="text-gray-600 hover:text-gray-800"/>
            </button>

            <button
                onClick={() => handleMessageAction("copy", messageData, t)}
                className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                aria-label={t("copy_message")}
            >
                <Copy size={16} className="text-gray-600 hover:text-gray-800"/>
            </button>

            {(msg.allowRegenerate || msg.allowRegenerate === undefined) && (
                <button
                    onClick={() => handleMessageAction("regenerate", messageData, t)}
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                    aria-label={t("regenerate_message")}
                >
                    <RotateCw size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            )}

            <TooltipInfo tip={msg.tip} t={t}/>
            <MessageMenuButton messageData={messageData}/>
        </div>
    );
});

/**
 * 左侧消息头像和名称组件
 */
const LeftAvatarName = memo(({avatar, displayName, isLeaving}) => (
    <div
        className={`flex items-center gap-2 mb-1 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}>
        <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={displayName}/>
            <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        {displayName && (
            <span className="text-sm font-semibold text-gray-700">
                {displayName}
            </span>
        )}
    </div>
));

/**
 * 消息分页选择器组件
 */
const MessagePaginator = memo(({
                                   isRight,
                                   msgPrev,
                                   prevMsgId,
                                   onSwitchMessage,
                                   switchingMessageId,
                                   setSwitchingMessageId,
                                   setFadeMessages,
                                   t
                               }) => {
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
            await onSwitchMessage(msgPrev, prevMsgId, direction === 'next');
        } finally {
            setSwitchingMessageId(null);
        }
    }, [msgIdIndex, msgPrev, prevMsgId, onSwitchMessage, setSwitchingMessageId, setFadeMessages]);

    return (
        <div
            className={`flex items-center gap-1 text-sm transition-opacity duration-300 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <button
                onClick={() => handleSwitch('prev')}
                disabled={disabledPrev || switchingMessageId !== null}
                className={`p-1 rounded-full transition-colors cursor-pointer ${disabledPrev || switchingMessageId !== null
                    ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                    : 'hover:bg-gray-200'
                }`}
                aria-label={t("prev_page")}
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
                aria-label={t("next_page")}
            >
                <ChevronRight size={12}/>
            </button>
        </div>
    );
});

/**
 * 纯文本消息内容组件
 */
const TextOnlyMessageContent = memo(({isRight, content, avatar, displayName, isLeaving}) => {
    if (isRight) {
        return (
            <div className="flex justify-end items-center gap-3 max-w-[80%] ml-auto">
                <div
                    className={`max-w-[100%] bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {content}
                </div>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt={displayName}/>
                    <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
            </div>
        );
    }

    return (
        <div className="w-full pl-10 pr-10">
            <div className="text-gray-800 break-words max-w-none">
                <MarkdownRenderer content={content}/>
            </div>
        </div>
    );
});

/**
 * 消息底部操作区域组件 - 现在使用来自父组件的 isHovered
 */
const MessageActions = memo(({
                                 isRight,
                                 showPaginator,
                                 msgPrev,
                                 prevMsgId,
                                 onSwitchMessage,
                                 switchingMessageId,
                                 setSwitchingMessageId,
                                 setFadeMessages,
                                 messageData,
                                 isHovered,
                                 readonly,
                                 t
                             }) => {
    const showRightTools = isRight && isHovered;

    return (
        <div
            className={`flex items-center mt-1 transition-opacity duration-300 ${isRight ? 'justify-end pr-12' : 'justify-between pl-10 pr-10'}`}
        >
            {isRight && (
                <div className={"ml-2 flex items-center " + (showPaginator ? 'pr-1' : '')}>
                    <div className="relative flex items-center justify-center flex-shrink-0">
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${showRightTools ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            {!readonly && <MessageTools messageData={messageData}/>}
                        </div>
                        <div className="flex items-center justify-center invisible">
                            {!readonly && <MessageTools messageData={messageData}/>}
                        </div>
                    </div>
                </div>
            )}

            {showPaginator && (
                <div className={isRight ? '' : 'flex-1'}>
                    {!readonly && (
                        <MessagePaginator
                            isRight={isRight}
                            msgPrev={msgPrev}
                            prevMsgId={prevMsgId}
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
                <div className={"text-right flex-shrink-0 " + (showPaginator ? 'pl-1' : 'translate-x-[-0.4em]')}>
                    {!readonly && <MessageTools messageData={messageData}/>}
                </div>
            )}
        </div>
    );
});

/**
 * 自定义Hook：管理消息动画状态
 */
const useMessageAnimation = (messagesOrder) => {
    const [enteringMessages, setEnteringMessages] = useState(new Set());
    const [leavingMessages, setLeavingMessages] = useState(new Set());
    const [fadeMessages, setFadeMessages] = useState(new Set());
    const prevMessagesOrderRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const prevOrder = prevMessagesOrderRef.current;
        const newOrder = messagesOrder;

        // 识别新消息（排除分页占位符）
        const normalNewMessages = newOrder.filter(msgId =>
            !prevOrder.includes(msgId) &&
            msgId !== "<PREV_MORE>" &&
            !fadeMessages.has(msgId)
        );

        normalNewMessages.forEach(msgId => {
            setEnteringMessages(prev => new Set([...prev, msgId]));
        });

        // 识别移除的消息
        const removedMessages = prevOrder.filter(msgId => !newOrder.includes(msgId));
        removedMessages.forEach(msgId => {
            setLeavingMessages(prev => new Set([...prev, msgId]));
        });

        // 清理动画状态
        if (normalNewMessages.length > 0 || removedMessages.length > 0 || fadeMessages.size > 0) {
            animationFrameRef.current = requestAnimationFrame(() => {
                setTimeout(() => {
                    setEnteringMessages(new Set());
                    setLeavingMessages(new Set());
                    setFadeMessages(new Set());
                }, 300);
            });
        }

        prevMessagesOrderRef.current = newOrder;

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [messagesOrder, fadeMessages]);

    /**
     * 获取消息动画类名
     */
    const getMessageAnimationClass = useCallback((msgId, isFading) => {
        if (leavingMessages.has(msgId)) {
            return 'opacity-0 -translate-y-2 pointer-events-none';
        }
        if (isFading) {
            return 'opacity-100 animate-fade-in';
        }
        if (enteringMessages.has(msgId)) {
            return 'opacity-100 translate-y-0 animate-fade-in-up';
        }
        return 'opacity-100';
    }, [leavingMessages, enteringMessages]);

    return {
        enteringMessages,
        leavingMessages,
        fadeMessages,
        setFadeMessages,
        getMessageAnimationClass
    };
};

/**
 * 自定义Hook：处理消息事件监听
 */
const useMessageEvents = (markId, setSwitchingMessageId) => {
    useEffect(() => {
        const unsubscribe = onEvent("widget", "ChatPage", markId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Set-SwitchingMessage":
                    setSwitchingMessageId(payload.value);

                    // 设置不要编辑消息
                    emitEvent({
                        type: "widget",
                        target: "ChatBox",
                        payload: {
                            command: "Set-EditMessage",
                            isEdit: false
                        },
                        markId: markId,
                        fromWebsocket: true,
                        notReplyToWebsocket: true
                    });

                    reply({success: true});
                    break;
            }
        });

        return () => {
            unsubscribe();
        };
    }, [markId, setSwitchingMessageId]);
};

/**
 * 处理内容替换逻辑
 */
const processContentReplacements = (content, extraInfo) => {
    if (!content || !extraInfo?.replace) return content;

    let processedContent = content;
    const cardRegex = /:::card\{type=replace\s+id=([^}\s]+)\}:::/g;
    const MAX_ITERATIONS = 100;
    let iterations = 0;

    while (cardRegex.test(processedContent) && iterations < MAX_ITERATIONS) {
        cardRegex.lastIndex = 0;
        processedContent = processedContent.replace(cardRegex, (match, id) => {
            return extraInfo.replace[id] ?? '';
        });
        iterations++;
    }

    if (iterations >= MAX_ITERATIONS) {
        console.warn('Content replacement reached maximum recursion limit');
    }

    return processedContent;
};

/**
 * 单个消息渲染器 - 现在在 MessageItem 级别管理 hover 状态
 */
const MessageItem = React.memo(({
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
                                    readonly,
                                    t
                                }) => {
    const isRight = msg.position === 'right';
    const avatar = msg.avatar;
    const displayName = msg.name || "U";
    const showPaginator = messages[msg?.prevMessage]?.messages?.length > 1;
    const msgPrev = messages[msg?.prevMessage];

    const hasAttachments = msg.attachments?.length > 0;
    const hasContent = msg.content?.trim();
    const displayContent = processContentReplacements(msg.content, msg.extraInfo);

    // 只在右侧消息上启用 hover 检测
    const [isHovered, setIsHovered] = useState(false);
    const hoverHandlers = isRight && !readonly ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    } : {};

    // 准备消息数据对象
    const messageData = useMemo(() => ({
        msg,
        markId,
        msgId,
        displayContent
    }), [msg, markId, msgId, displayContent]);

    // 渲染消息内容
    const renderMessageContent = () => {
        // 情况1: 只有附件
        if (hasAttachments && !hasContent) {
            return (
                <>
                    {!isRight && (
                        <LeftAvatarName
                            avatar={avatar}
                            displayName={displayName}
                            isLeaving={leavingMessages.has(msgId)}
                        />
                    )}

                    {isRight ? (
                        <div className="flex items-start gap-2 max-w-full mt-1">
                            <div className="flex-1 min-w-[150px] max-w-[calc(100%-3rem)] sm:pl-0 pl-7">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
                                <AvatarImage src={avatar} alt={displayName}/>
                                <AvatarFallback>{displayName[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                        <div className="max-w-[95%] pl-7 mb-2">
                            <AttachmentShowcase
                                attachmentsMeta={msg.attachments}
                                msgMode={true}
                            />
                        </div>
                    )}
                </>
            );
        }

        // 情况2: 附件和内容都有
        if (hasAttachments && hasContent) {
            return (
                <>
                    {isRight ? (
                        <>
                            <div className="max-w-[90%] lg:max-w-[55%] ml-auto pr-10 mb-2">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <TextOnlyMessageContent
                                key={msgId}
                                isRight={true}
                                content={displayContent}
                                avatar={avatar}
                                displayName={displayName}
                                isLeaving={leavingMessages.has(msgId)}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            <LeftAvatarName
                                avatar={avatar}
                                displayName={displayName}
                                isLeaving={leavingMessages.has(msgId)}
                            />
                            <div className="max-w-[95%] pl-7 mb-2">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <TextOnlyMessageContent
                                key={msgId}
                                isRight={false}
                                content={displayContent}
                                avatar={avatar}
                                displayName={displayName}
                                isLeaving={leavingMessages.has(msgId)}
                            />
                        </div>
                    )}
                </>
            );
        }

        // 情况3: 只有内容
        if (hasContent) {
            return isRight ? (
                <TextOnlyMessageContent
                    key={msgId}
                    isRight={true}
                    content={displayContent}
                    avatar={avatar}
                    displayName={displayName}
                    isLeaving={leavingMessages.has(msgId)}
                />
            ) : (
                <div className="flex flex-col items-start w-full">
                    <LeftAvatarName
                        avatar={avatar}
                        displayName={displayName}
                        isLeaving={leavingMessages.has(msgId)}
                    />
                    <TextOnlyMessageContent
                        key={msgId}
                        isRight={false}
                        content={displayContent}
                        avatar={avatar}
                        displayName={displayName}
                        isLeaving={leavingMessages.has(msgId)}
                    />
                </div>
            );
        }

        // 情况4: 无内容
        return (
            <>
                {isRight ? (
                    <div className="flex justify-end items-start gap-3 max-w-[80%] ml-auto">
                        <div className="h-10 w-10"></div>
                        <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={avatar} alt={displayName}/>
                            <AvatarFallback>{displayName[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                ) : (
                    <div className="flex flex-col items-start w-full">
                        <LeftAvatarName
                            avatar={avatar}
                            displayName={displayName}
                            isLeaving={leavingMessages.has(msgId)}
                        />
                        <div className="pl-7 min-h-[1.25rem]"></div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div
            key={msgId}
            className={`flex flex-col w-full transition-all duration-300 ease-in-out ${isRight ? 'items-end' : 'items-start'
            } ${animationClass}`}
            {...hoverHandlers}
        >
            {renderMessageContent()}
            <MessageActions
                isRight={isRight}
                showPaginator={showPaginator}
                msgPrev={msgPrev}
                prevMsgId={msg?.prevMessage}
                onSwitchMessage={onSwitchMessage}
                switchingMessageId={switchingMessageId}
                setSwitchingMessageId={setSwitchingMessageId}
                setFadeMessages={setFadeMessages}
                messageData={messageData}
                isHovered={isHovered}
                readonly={readonly}
                t={t}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.msgId === nextProps.msgId &&
        prevProps.markId === nextProps.markId &&
        prevProps.messages[prevProps.msgId] === nextProps.messages[nextProps.msgId] &&
        prevProps.animationClass === nextProps.animationClass &&
        prevProps.readonly === nextProps.readonly &&
        prevProps.isFading === nextProps.isFading &&
        prevProps.leavingMessages.has(prevProps.msgId) === nextProps.leavingMessages.has(nextProps.msgId)
    )
});

MessageItem.displayName = 'MessageItem';

/**
 * 消息容器主组件
 */
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

    // 使用自定义Hooks管理状态
    const {
        enteringMessages,
        leavingMessages,
        fadeMessages,
        setFadeMessages,
        getMessageAnimationClass
    } = useMessageAnimation(messagesOrder);

    useMessageEvents(markId, setSwitchingMessageId);

    /**
     * 处理加载更多请求
     */
    const handleLoadMore = useCallback(async () => {
        if (isLoadingMore || !onLoadMore) return;
        setIsLoadingMore(true);
        try {
            const result = await onLoadMore();
            if (result === false) {
                throw new Error(t('unknown_error'));
            }
        } catch (error) {
            toast.error(t('load_more_error', {
                message: error?.message || t('unknown_error')
            }));
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, onLoadMore, t]);

    /**
     * 渲染加载更多占位符
     */
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

    /**
     * 渲染切换消息加载器
     */
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
                <span className="mt-2 text-sm text-gray-500">{t("loading_new_message")}</span>
            </div>
        </div>
    ), [fadeMessages, enteringMessages, t]);

    /**
     * 渲染单条消息
     */
    const renderMessage = useCallback((msgId, index) => {
        // 检查是否有切换消息在前
        const hasSwitchingMessageBefore = messagesOrder
            .slice(0, index)
            .some(currentMsgId => switchingMessageId === currentMsgId);

        if (hasSwitchingMessageBefore) return null;

        // 处理加载更多占位符
        if (msgId === "<PREV_MORE>") {
            return renderLoadMore(msgId);
        }

        const msg = messages[msgId];
        if (!msg || msg.position === null || msg.position === undefined) return null;

        // 处理消息切换状态
        if (switchingMessageId === msgId) {
            return renderSwitchingLoader(msgId);
        }

        // 验证消息数据完整性
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
        const readonly = msg.readonly;

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
                readonly={readonly}
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

// 添加动画样式
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  `;
    document.head.appendChild(style);
}

export default memo(MessageContainer);