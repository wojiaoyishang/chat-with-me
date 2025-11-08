import React, { forwardRef, useState, useEffect, useRef } from 'react';
import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import AttachmentShowcase from './AttachmentShowcase'; // 假设您有这个组件

const MessageContainer = forwardRef(({ messagesOrder = [], messages = {}, onLoadMore, onSwitchMessage }, ref) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [switchingMessageId, setSwitchingMessageId] = useState(null);
    const [enteringMessages, setEnteringMessages] = useState(new Set());
    const [leavingMessages, setLeavingMessages] = useState(new Set());
    const [fadeMessages, setFadeMessages] = useState(new Set()); // 专门用于分页切换的淡入动画
    const prevMessagesOrderRef = useRef([]);
    const animationFrameRef = useRef(null);
    const { t } = useTranslation();

    // 跟踪新消息和离开消息
    useEffect(() => {
        const prevOrder = prevMessagesOrderRef.current;
        const newOrder = messagesOrder;
        // 找出新加入的消息（排除分页切换的消息）
        const normalNewMessages = newOrder.filter(id =>
            !prevOrder.includes(id) &&
            id !== "<PREV_MORE>" &&
            !fadeMessages.has(id) // 排除分页切换带来的消息
        );
        normalNewMessages.forEach(id => {
            setEnteringMessages(prev => new Set([...prev, id]));
        });
        // 找出离开的消息
        const removedMessages = prevOrder.filter(id => !newOrder.includes(id));
        removedMessages.forEach(id => {
            setLeavingMessages(prev => new Set([...prev, id]));
        });
        // 设置定时器移除动画状态
        if (normalNewMessages.length > 0 || removedMessages.length > 0 || fadeMessages.size > 0) {
            animationFrameRef.current = requestAnimationFrame(() => {
                setTimeout(() => {
                    setEnteringMessages(new Set());
                    setLeavingMessages(new Set());
                    setFadeMessages(new Set()); // 同时清理淡入状态
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

    const handleLoadMore = async () => {
        if (isLoadingMore || !onLoadMore) return;
        setIsLoadingMore(true);
        try {
            const result = await onLoadMore();
            if (result === false) {
                throw new Error(t('unknown_error'));
            }
        } catch (error) {
            toast.error(t('load_more_error', { message: error?.message || t('unknown_error') }));
        } finally {
            setIsLoadingMore(false);
        }
    };

    // 分页选择器组件
    const MessagePaginator = ({ isRight, msgPrev, msgId }) => {
        const msgId_index = msgPrev.messages.indexOf(msgPrev.nextMessage);
        const disabledNext = msgId_index === msgPrev.messages.length - 1;
        const disabledPrev = msgId_index === 0;
        return (
            <div className={`flex items-center gap-1 mt-1 text-sm transition-opacity duration-300 ${
                isRight ? 'justify-end pr-12 pt-1' : 'justify-start pl-10'
            } ${leavingMessages.has(msgId) ? 'opacity-0' : 'opacity-100'}`}>
                <button
                    onClick={async () => {
                        if (!disabledPrev && onSwitchMessage) {
                            setSwitchingMessageId(msgPrev.nextMessage);
                            // 标记这条消息使用淡入动画
                            setFadeMessages(prev => new Set([...prev, msgPrev.messages[msgId_index - 1]]));
                            try {
                                await onSwitchMessage(msgPrev, msgId, false);
                            } finally {
                                setSwitchingMessageId(null);
                            }
                        }
                    }}
                    disabled={disabledPrev || switchingMessageId !== null}
                    className={`p-1 rounded-full transition-colors cursor-pointer ${
                        disabledPrev || switchingMessageId !== null
                            ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                            : 'hover:bg-gray-200'
                    }`}
                    aria-label={t("prev_page")}
                >
                    <FaChevronLeft size={12} />
                </button>
                <span className="px-1.5 py-0.5 rounded-md">{msgId_index + 1} / {msgPrev.messages.length}</span>
                <button
                    onClick={async () => {
                        if (!disabledNext && onSwitchMessage) {
                            setSwitchingMessageId(msgPrev.nextMessage);
                            // 标记这条消息使用淡入动画
                            setFadeMessages(prev => new Set([...prev, msgPrev.messages[msgId_index + 1]]));
                            try {
                                await onSwitchMessage(msgPrev, msgId, true);
                            } finally {
                                setSwitchingMessageId(null);
                            }
                        }
                    }}
                    disabled={disabledNext || switchingMessageId !== null}
                    className={`p-1 rounded-full transition-colors cursor-pointer ${
                        disabledNext || switchingMessageId !== null
                            ? 'text-gray-400 hover:bg-transparent cursor-not-allowed'
                            : 'hover:bg-gray-200'
                    }`}
                    aria-label={t("next_page")}
                >
                    <FaChevronRight size={12} />
                </button>
            </div>
        );
    };

    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messagesOrder.map((id, index) => {
                const hasSwitchingMessageBefore = messagesOrder
                    .slice(0, index)
                    .some(msgId => switchingMessageId === msgId);
                if (hasSwitchingMessageBefore) {
                    return null;
                }
                // 处理加载更多
                if (id === "<PREV_MORE>") {
                    return (
                        <div
                            key={id}
                            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${
                                leavingMessages.has(id) ? 'opacity-0 -translate-y-2' :
                                    enteringMessages.has(id) ? 'opacity-100 translate-y-0 animate-fade-in-up' :
                                        'opacity-100'
                            }`}
                        >
                            {isLoadingMore ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-gray-400 border-solid rounded-full animate-spin"></div>
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
                }
                const msg = messages[id];
                if (!msg) return null;
                if (msg.position === null || msg.position === undefined) return null;

                // 处理切换中的消息
                if (switchingMessageId === id) {
                    return (
                        <div
                            key={`loading-${id}`}
                            className={`flex justify-center w-full py-4 transition-all duration-300 ease-in-out ${
                                // 分页切换的加载状态也使用淡入效果
                                fadeMessages.has(id) ? 'animate-fade-in' :
                                    enteringMessages.has(id) ? 'animate-fade-in-up' : 'opacity-100'
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <ThreeDotLoading />
                                <span className="mt-2 text-sm text-gray-500">{t("loading_new_message")}</span>
                            </div>
                        </div>
                    );
                }

                const isRight = msg.position === 'right';
                const avatar = msg.avatar || (isRight ? HumanIcon : AIIcon);
                const displayName = isRight ? null : msg.name;
                const showPaginator = messages[msg?.prevMessage]?.messages?.length > 1;
                const isEntering = enteringMessages.has(id);
                const isLeaving = leavingMessages.has(id);
                const isFading = fadeMessages.has(id) && !isEntering; // 优先使用分页切换的淡入效果

                // 检查是否存在 attachments
                const hasAttachments = msg.attachments && Array.isArray(msg.attachments) && msg.attachments.length > 0;
                const hasContent = msg.content && msg.content.trim() !== '';

                const attachmentElement = hasAttachments ? (
                    <div className={`${isRight ? 'max-w-[55%] ml-auto pr-10' : 'max-w-[95%] pl-9'} mb-2`}>
                        <AttachmentShowcase
                            attachmentsMeta={msg.attachments}
                            onRemove={() => {}} // 留空的回调
                            msgMode={true}
                        />
                    </div>
                ) : null;

                const messageContentElement = hasContent ? (
                    isRight ? (
                        <div className="flex items-start gap-3 max-w-[80%] ml-auto">
                            <div
                                className={`bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100 transition-opacity duration-300 ${
                                    isLeaving ? 'opacity-0' : 'opacity-100'
                                }`}
                            >
                                {msg.content}
                            </div>
                            <img
                                src={avatar}
                                alt="Right User"
                                className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                        </div>
                    ) : (
                        <div className="w-full pl-10 pr-10">
                            <div className="text-gray-800 break-words max-w-none">
                                <MarkdownRenderer content={msg.content} index={id} />
                            </div>
                        </div>
                    )
                ) : null;

                // --- 渲染头像和名称 (仅左侧) ---
                const avatarAndNameElement = !isRight ? (
                    <div className={`flex items-center gap-2 mb-1 transition-opacity duration-300 ${
                        isLeaving ? 'opacity-0' : 'opacity-100'
                    }`}>
                        <img
                            src={avatar}
                            alt="Left Assistant"
                            className="w-8 h-8 rounded-full"
                        />
                        {displayName && (
                            <span className="text-sm font-semibold text-gray-700">
                                {displayName}
                            </span>
                        )}
                    </div>
                ) : null;

                // --- 组合最终的消息元素 ---
                let finalMessageElement = null;
                if (hasAttachments && !hasContent) {
                    // 情况1: 只有附件，没有内容
                    finalMessageElement = (
                        <div
                            key={id}
                            className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                                isRight ? 'items-end' : 'items-start'
                            } ${
                                isLeaving
                                    ? 'opacity-0 -translate-y-2 pointer-events-none'
                                    : isFading
                                        ? 'opacity-100 animate-fade-in' // 分页切换使用纯淡入
                                        : isEntering
                                            ? 'opacity-100 translate-y-0 animate-fade-in-up' // 普通新消息使用上浮
                                            : 'opacity-100'
                            }`}
                        >
                            {attachmentElement}
                            {avatarAndNameElement} {/* Avatar/name for left, only if no content */}
                            {showPaginator && (
                                <MessagePaginator
                                    isRight={isRight}
                                    msgId={msg?.prevMessage}
                                    msgPrev={messages[msg?.prevMessage]}
                                />
                            )}
                        </div>
                    );
                } else if (hasAttachments && hasContent) {
                    // 情况2: 既有附件又有内容
                    finalMessageElement = (
                        <div
                            key={id}
                            className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                                isRight ? 'items-end' : 'items-start'
                            } ${
                                isLeaving
                                    ? 'opacity-0 -translate-y-2 pointer-events-none'
                                    : isFading
                                        ? 'opacity-100 animate-fade-in' // 分页切换使用纯淡入
                                        : isEntering
                                            ? 'opacity-100 translate-y-0 animate-fade-in-up' // 普通新消息使用上浮
                                            : 'opacity-100'
                            }`}
                        >
                            {isRight ? (
                                // Right: Attachments -> Content -> Paginator
                                <>
                                    {attachmentElement}
                                    {messageContentElement}
                                    {showPaginator && (
                                        <MessagePaginator
                                            isRight={true}
                                            msgId={msg?.prevMessage}
                                            msgPrev={messages[msg?.prevMessage]}
                                        />
                                    )}
                                </>
                            ) : (
                                // Left: Avatar/Name -> Attachments -> Content -> Paginator
                                <div className="flex flex-col items-start w-full">
                                    {avatarAndNameElement}
                                    {attachmentElement}
                                    {messageContentElement}
                                    {showPaginator && (
                                        <MessagePaginator
                                            isRight={false}
                                            msgId={msg?.prevMessage}
                                            msgPrev={messages[msg?.prevMessage]}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                } else if (!hasAttachments && hasContent) {
                    // 情况3: 只有内容，没有附件
                    finalMessageElement = (
                        <div
                            key={id}
                            className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
                                isRight ? 'items-end' : 'items-start'
                            } ${
                                isLeaving
                                    ? 'opacity-0 -translate-y-2 pointer-events-none'
                                    : isFading
                                        ? 'opacity-100 animate-fade-in' // 分页切换使用纯淡入
                                        : isEntering
                                            ? 'opacity-100 translate-y-0 animate-fade-in-up' // 普通新消息使用上浮
                                            : 'opacity-100'
                            }`}
                        >
                            {isRight ? (
                                // Right: Content -> Paginator
                                <>
                                    {messageContentElement}
                                    {showPaginator && (
                                        <MessagePaginator
                                            isRight={true}
                                            msgId={msg?.prevMessage}
                                            msgPrev={messages[msg?.prevMessage]}
                                        />
                                    )}
                                </>
                            ) : (
                                // Left: Avatar/Name -> Content -> Paginator
                                <div className="flex flex-col items-start w-full">
                                    {avatarAndNameElement}
                                    {messageContentElement}
                                    {showPaginator && (
                                        <MessagePaginator
                                            isRight={false}
                                            msgId={msg?.prevMessage}
                                            msgPrev={messages[msg?.prevMessage]}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                }
                // If neither attachments nor content, do not render anything for this message

                return finalMessageElement;
            })}
        </div>
    );
});

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);

export default MessageContainer;