import React, {forwardRef, useState, useEffect, useRef} from 'react';
import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import AttachmentShowcase from './AttachmentShowcase';
import {Menu, PenLine, Copy, RotateCw, Info} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

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

import {copyTextToClipboard, useIsMobile} from "@/lib/tools.js";
import {onEvent} from "@/store/useEventStore.jsx";

const MessageToolsFunction = (action, msg, markId, msgId, t) => {

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
                fromWebsocket: true  // 确保中间数据不要发送到 websocket
            });
            break;
        case "copy":
            copyTextToClipboard(msg.content).then(() => {
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
                    immediate: true,   // 马上发送
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId: msgId
                },
                markId: markId,
                fromWebsocket: true  // 确保中间数据不要发送到 websocket
            });
            break;
    }

}

/**
 * 消息菜单组件
 */
const MessageMenuButton = ({msg, markId, msgId}) => {
    const {t} = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer md:hidden"
                        aria-label={t("menu_function")}
                >
                    <Menu size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem className="flex items-center gap-2"
                                  onSelect={() => MessageToolsFunction("edit", msg, markId, msgId, t)}>
                    <PenLine size={16}/>
                    {t('edit_message')}
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2"
                                  onSelect={() => MessageToolsFunction("copy", msg, markId, msgId, t)}>
                    <Copy size={16}/>
                    {t('copy_message')}
                </DropdownMenuItem>

                {msg.allowRegenerate || msg.allowRegenerate === undefined ? (
                    <DropdownMenuItem className="flex items-center gap-2"
                                      onSelect={() => MessageToolsFunction("regenerate", msg, markId, msgId, t)}>
                        <RotateCw size={16}/>
                        {t('regenerate_message')}
                    </DropdownMenuItem>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

/**
 * 消息工具栏组件 - 显示编辑按钮
 * 独立于分页选择器，与分页选择器平齐显示
 */
const MessageTools = ({msg, markId, msgId}) => {
    const {t} = useTranslation();

    const isMobile = useIsMobile();

    return (
        <div className="flex gap-1">

            <button
                onClick={() => {
                    MessageToolsFunction("edit", msg, markId, msgId, t)
                }}
                className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                aria-label={t("edit_message")}
            >
                <PenLine size={16} className="text-gray-600 hover:text-gray-800"/>
            </button>

            <button
                onClick={() => {
                    MessageToolsFunction("copy", msg, markId, msgId, t)
                }}
                className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                aria-label={t("copy_message")}
            >
                <Copy size={16} className="text-gray-600 hover:text-gray-800"/>
            </button>

            {msg.allowRegenerate || msg.allowRegenerate === undefined ? (
                <button
                    onClick={() => {
                        MessageToolsFunction("regenerate", msg, markId, msgId, t)
                    }}
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                    aria-label={t("regenerate_message")}
                >
                    <RotateCw size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            ) : null}

            {msg.tip && (
                <>
                    {isMobile ? (
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
                                <div style={{ whiteSpace: 'pre-line' }} className="text-sm">
                                    {msg.tip}
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
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
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    {msg.tip}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </>
            )}

            <MessageMenuButton msg={msg} markId={markId} id={msgId}/>
        </div>
    );
};

/**
 * 左侧消息的头像和名称组件
 */
const LeftAvatarName = ({avatar, displayName, isLeaving}) => (
    <div className={`flex items-center gap-2 mb-1 transition-opacity duration-300 ${
        isLeaving ? 'opacity-0' : 'opacity-100'
    }`}>
        <img
            src={avatar}
            alt="Assistant Avatar"
            className="w-8 h-8 rounded-full"
        />
        {displayName && (
            <span className="text-sm font-semibold text-gray-700">
        {displayName}
      </span>
        )}
    </div>
);

/**
 * 消息分页选择器组件
 */
const MessagePaginator = ({
                              isRight,
                              msgPrev,
                              msgId,
                              onSwitchMessage,
                              switchingMessageId,
                              setSwitchingMessageId,
                              setFadeMessages,
                              t
                          }) => {
    const msgId_index = msgPrev.messages.indexOf(msgPrev.nextMessage);
    const disabledNext = msgId_index === msgPrev.messages.length - 1;
    const disabledPrev = msgId_index === 0;

    const handleSwitch = async (direction) => {
        if (!onSwitchMessage) return;

        const nextIndex = direction === 'next' ? msgId_index + 1 : msgId_index - 1;
        const nextMessageId = msgPrev.messages[nextIndex];

        setSwitchingMessageId(msgPrev.nextMessage);
        setFadeMessages(prev => new Set([...prev, nextMessageId]));

        try {
            await onSwitchMessage(msgPrev, msgId, direction === 'next');
        } finally {
            setSwitchingMessageId(null);
        }
    };

    return (
        <div className={`flex items-center gap-1 text-sm transition-opacity duration-300 ${
            isRight ? 'justify-end' : 'justify-start'
        }`}>
            <button
                onClick={() => handleSwitch('prev')}
                disabled={disabledPrev || switchingMessageId !== null}
                className={`p-1 rounded-full transition-colors cursor-pointer ${
                    disabledPrev || switchingMessageId !== null
                        ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                        : 'hover:bg-gray-200'
                }`}
                aria-label={t("prev_page")}
            >
                <FaChevronLeft size={12}/>
            </button>
            <span className="px-1.5 py-0.5 rounded-md">{msgId_index + 1} / {msgPrev.messages.length}</span>
            <button
                onClick={() => handleSwitch('next')}
                disabled={disabledNext || switchingMessageId !== null}
                className={`p-1 rounded-full transition-colors cursor-pointer ${
                    disabledNext || switchingMessageId !== null
                        ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                        : 'hover:bg-gray-200'
                }`}
                aria-label={t("next_page")}
            >
                <FaChevronRight size={12}/>
            </button>
        </div>
    );
};

/**
 * 消息内容组件
 */
const MessageContent = ({
                            isRight,
                            content,
                            avatar,
                            isLeaving
                        }) => {
    if (isRight) {
        return (
            <div className="flex items-start gap-3 max-w-[80%] ml-auto">
                <div
                    className={`bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100 transition-opacity duration-300 ${
                        isLeaving ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {content}
                </div>
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                />
            </div>
        );
    }

    return (
        <div className="w-full pl-10 pr-10">
            <div className="text-gray-800 break-words max-w-none">
                <MarkdownRenderer content={content} index={content}/>
            </div>
        </div>
    );
};

const MessageContainer = forwardRef(({
                                         messagesOrder = [],
                                         messages = {},
                                         onLoadMore,
                                         onSwitchMessage,
                                         markId
                                     }, ref) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [switchingMessageId, setSwitchingMessageId] = useState(null);
    const [enteringMessages, setEnteringMessages] = useState(new Set());
    const [leavingMessages, setLeavingMessages] = useState(new Set());
    const [fadeMessages, setFadeMessages] = useState(new Set());
    const [hoveredMessageId, setHoveredMessageId] = useState(null); // 新增：跟踪悬停的消息ID
    const prevMessagesOrderRef = useRef([]);
    const animationFrameRef = useRef(null);
    const {t} = useTranslation();

    useEffect(() => {

        const unsubscribe = onEvent("widget", "ChatPage", markId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Set-SwitchingMessage":
                    setSwitchingMessageId(payload.value);
                    reply({success: true });
                    break;
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // 动画管理效果
    useEffect(() => {
        const prevOrder = prevMessagesOrderRef.current;
        const newOrder = messagesOrder;

        // 识别新消息（排除分页占位符）
        const normalNewMessages = newOrder.filter(id =>
            !prevOrder.includes(id) &&
            id !== "<PREV_MORE>" &&
            !fadeMessages.has(id)
        );

        normalNewMessages.forEach(id => {
            setEnteringMessages(prev => new Set([...prev, id]));
        });

        // 识别移除的消息
        const removedMessages = prevOrder.filter(id => !newOrder.includes(id));
        removedMessages.forEach(id => {
            setLeavingMessages(prev => new Set([...prev, id]));
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

    // 处理加载更多请求
    const handleLoadMore = async () => {
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
    };

    // 渲染加载更多占位符
    const renderLoadMore = (id) => (
        <div
            key={id}
            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${
                leavingMessages.has(id)
                    ? 'opacity-0 -translate-y-2'
                    : enteringMessages.has(id)
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
    );

    // 渲染切换消息加载器
    const renderSwitchingLoader = (id) => (
        <div
            key={`loading-${id}`}
            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${
                fadeMessages.has(id)
                    ? 'animate-fade-in'
                    : enteringMessages.has(id)
                        ? 'animate-fade-in-up'
                        : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center justify-center">
                <ThreeDotLoading/>
                <span className="mt-2 text-sm text-gray-500">{t("loading_new_message")}</span>
            </div>
        </div>
    );

    // 获取消息动画类
    const getMessageAnimationClass = (id, isFading) => {
        if (leavingMessages.has(id)) {
            return 'opacity-0 -translate-y-2 pointer-events-none';
        }
        if (isFading) {
            return 'opacity-100 animate-fade-in';
        }
        if (enteringMessages.has(id)) {
            return 'opacity-100 translate-y-0 animate-fade-in-up';
        }
        return 'opacity-100';
    };

    // 渲染单条消息
    const renderMessage = (id, index) => {
        const hasSwitchingMessageBefore = messagesOrder
            .slice(0, index)
            .some(msgId => switchingMessageId === msgId);

        if (hasSwitchingMessageBefore) return null;

        // 处理加载更多占位符
        if (id === "<PREV_MORE>") {
            return renderLoadMore(id);
        }

        const msg = messages[id];
        if (!msg || msg.position === null || msg.position === undefined) return null;

        // 处理消息切换状态
        if (switchingMessageId === id) {
            return renderSwitchingLoader(id);
        }

        const isRight = msg.position === 'right';
        const avatar = msg.avatar || (isRight ? HumanIcon : AIIcon);
        const displayName = isRight ? null : msg.name;
        const showPaginator = messages[msg?.prevMessage]?.messages?.length > 1;
        const isFading = fadeMessages.has(id) && !enteringMessages.has(id);

        // 检查内容类型
        const hasAttachments = msg.attachments?.length > 0;
        const hasContent = msg.content?.trim();

        // 分页选择器和工具栏的公共属性
        const paginatorProps = {
            isRight,
            msgId: msg?.prevMessage,
            msgPrev: messages[msg?.prevMessage],
            onSwitchMessage,
            switchingMessageId,
            setSwitchingMessageId,
            setFadeMessages,
            t
        };

        // 消息底部操作区域（分页选择器 + 工具栏）
        const renderMessageActions = () => {
            // 只有右侧消息才需要条件显示 MessageTools
            const showRightTools = isRight && hoveredMessageId === id;

            return (
                <div
                    className={`flex items-center mt-1 transition-opacity duration-300 ${
                        leavingMessages.has(id) ? 'opacity-0' : 'opacity-100'
                    } ${isRight ? 'justify-end pr-12' : 'justify-between pl-10 pr-10'}`}
                    // 为右侧消息添加鼠标事件
                    onMouseEnter={() => isRight && setHoveredMessageId(id)}
                    onMouseLeave={() => isRight && setHoveredMessageId(null)}
                >
                    {isRight && (
                        <div className={"ml-2 flex items-center " + (showPaginator ? 'pr-1' : '')}>
                            {/* 为右侧消息的编辑按钮保留占位空间 */}
                            <div className="relative flex items-center justify-center flex-shrink-0">
                                <div
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                                        showRightTools ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                                >
                                    <MessageTools msg={msg} markId={markId} msgId={id}/>
                                </div>
                                {/* 占位元素，保持空间一致性 */}
                                <div className="flex items-center justify-center invisible">
                                    <MessageTools msg={msg} markId={markId} msgId={id}/>
                                </div>
                            </div>
                        </div>
                    )}

                    {showPaginator && (
                        <div className={isRight ? '' : 'flex-1'}>
                            <MessagePaginator {...paginatorProps} />
                        </div>
                    )}

                    {!isRight && (
                        <div
                            className={"text-right flex-shrink-0 " + (showPaginator ? 'pl-1' : 'translate-x-[-0.4em]')}>
                            <MessageTools msg={msg} markId={markId} msgId={id}/>
                        </div>
                    )}

                </div>
            );
        };

        // 情况1: 只有附件
        if (hasAttachments && !hasContent) {
            return (
                <div
                    key={id}
                    className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                        isRight ? 'items-end' : 'items-start'
                    } ${getMessageAnimationClass(id, isFading)}`}
                    // 为整个消息容器添加鼠标事件，以确保悬停状态的准确性
                    onMouseEnter={() => isRight && setHoveredMessageId(id)}
                    onMouseLeave={() => isRight && setHoveredMessageId(null)}
                >
                    {!isRight && (
                        <LeftAvatarName
                            avatar={avatar}
                            displayName={displayName}
                            isLeaving={leavingMessages.has(id)}
                        />
                    )}

                    {isRight ? (
                        <div className="flex items-center justify-end gap-2">
                            <div className="max-w-[20.8%] md:max-w-[56.8%] lg:max-w-[70.2%]">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <img
                                src={avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                        </div>
                    ) : (
                        <div className="max-w-[95%] pl-7 mb-2">
                            <AttachmentShowcase
                                attachmentsMeta={msg.attachments}
                                msgMode={true}
                            />
                        </div>
                    )}

                    {/* 渲染消息底部操作区域 */}
                    {renderMessageActions()}
                </div>
            );
        }

        // 情况2: 附件和内容都有
        if (hasAttachments && hasContent) {
            return (
                <div
                    key={id}
                    className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                        isRight ? 'items-end' : 'items-start'
                    } ${getMessageAnimationClass(id, isFading)}`}
                    // 为整个消息容器添加鼠标事件
                    onMouseEnter={() => isRight && setHoveredMessageId(id)}
                    onMouseLeave={() => isRight && setHoveredMessageId(null)}
                >
                    {isRight ? (
                        <>
                            <div className="max-w-[90%] lg:max-w-[55%] ml-auto pr-10 mb-2">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <MessageContent
                                isRight={true}
                                content={msg.content}
                                avatar={avatar}
                                isLeaving={leavingMessages.has(id)}
                            />
                            {/* 渲染消息底部操作区域 */}
                            {renderMessageActions()}
                        </>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            <LeftAvatarName
                                avatar={avatar}
                                displayName={displayName}
                                isLeaving={leavingMessages.has(id)}
                            />
                            <div className="max-w-[95%] pl-7 mb-2">
                                <AttachmentShowcase
                                    attachmentsMeta={msg.attachments}
                                    msgMode={true}
                                />
                            </div>
                            <MessageContent
                                isRight={false}
                                content={msg.content}
                                avatar={avatar}
                                isLeaving={leavingMessages.has(id)}
                            />
                            {/* 渲染消息底部操作区域 */}
                            {renderMessageActions()}
                        </div>
                    )}
                </div>
            );
        }

        // 情况3: 只有内容
        if (hasContent) {
            return (
                <div
                    key={id}
                    className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                        isRight ? 'items-end' : 'items-start'
                    } ${getMessageAnimationClass(id, isFading)}`}
                    // 为整个消息容器添加鼠标事件
                    onMouseEnter={() => isRight && setHoveredMessageId(id)}
                    onMouseLeave={() => isRight && setHoveredMessageId(null)}
                >
                    {isRight ? (
                        <>
                            <MessageContent
                                isRight={true}
                                content={msg.content}
                                avatar={avatar}
                                isLeaving={leavingMessages.has(id)}
                            />
                            {/* 渲染消息底部操作区域 */}
                            {renderMessageActions()}
                        </>
                    ) : (
                        <div className="flex flex-col items-start w-full">
                            <LeftAvatarName
                                avatar={avatar}
                                displayName={displayName}
                                isLeaving={leavingMessages.has(id)}
                            />
                            <MessageContent
                                isRight={false}
                                content={msg.content}
                                avatar={avatar}
                                isLeaving={leavingMessages.has(id)}
                            />
                            {/* 渲染消息底部操作区域 */}
                            {renderMessageActions()}
                        </div>
                    )}
                </div>
            );
        }

        // 没有内容可显示
        return null;
    };

    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messagesOrder.map((id, index) => renderMessage(id, index))}
        </div>
    );
});

// 添加动画样式（只在浏览器环境中注入）
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

export default MessageContainer;