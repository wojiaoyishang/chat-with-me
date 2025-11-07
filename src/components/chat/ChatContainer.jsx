import React, {forwardRef, useState} from 'react';
import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';

import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";

const ChatContainer = forwardRef(({messagesOrder = [], messages = {}, onLoadMore, onSwitchMessage}, ref) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [switchingMessageId, setSwitchingMessageId] = useState(null); // 新增：记录正在切换的消息ID
    const {t} = useTranslation();

    const handleLoadMore = async () => {
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
    };

    // 分页选择器组件
    const MessagePaginator = ({isRight, msgPrev, msgId}) => {
        const msgId_index = msgPrev.messages.indexOf(msgPrev.nextMessage)
        const disabledNext = msgId_index === msgPrev.messages.length - 1;
        const disabledPrev = msgId_index === 0;

        return (
            // 传入的是 msgPrev 前一条消息
            <div className={`flex items-center gap-1 mt-1 text-sm ${
                isRight ? 'justify-end pr-12 pt-1' : 'justify-start pl-10'
            }`}>
                <button
                    onClick={async () => {
                        if (!disabledPrev && onSwitchMessage) {
                            const targetMsgId = msgPrev.messages[msgId_index - 1]; // 获取前一条消息的ID
                            setSwitchingMessageId(targetMsgId); // 设置正在切换的消息ID
                            try {
                                await onSwitchMessage(msgPrev, msgId, false);
                            } finally {
                                setSwitchingMessageId(null); // 切换完成，重置状态
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
                    <FaChevronLeft size={12}/>
                </button>
                <span
                    className="px-1.5 py-0.5 rounded-md">{msgId_index + 1} / {msgPrev.messages.length}</span>
                <button
                    onClick={async () => {
                        if (!disabledNext && onSwitchMessage) {
                            setSwitchingMessageId(msgPrev.nextMessage); // 设置正在切换的消息ID
                            try {
                                await onSwitchMessage(msgPrev, msgId, true);
                            } finally {
                                setSwitchingMessageId(null); // 切换完成，重置状态
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
                    <FaChevronRight size={12}/>
                </button>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messagesOrder.map((id, index) => {
                // 检查是否已经遇到了正在切换的消息
                const hasSwitchingMessageBefore = messagesOrder
                    .slice(0, index)
                    .some(msgId => switchingMessageId === msgId);

                if (hasSwitchingMessageBefore) {
                    // 如果前面已经有正在切换的消息，则不再渲染后续消息
                    return null;
                }

                if (id === "<PREV_MORE>") {
                    return (
                        <div key={id} className="flex justify-center w-full py-4">
                            {isLoadingMore ? (
                                <div className="flex items-center justify-center">
                                    <div
                                        className="w-5 h-5 border-t-2 border-gray-400 border-solid rounded-full animate-spin"></div>
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
                if (msg.position === null || msg.position === undefined) return null;  // 隐藏消息

                // 检查是否是正在切换的消息
                if (switchingMessageId === id) {
                    return (
                        <div key={id} className="flex justify-center w-full py-4">
                            <div className="flex flex-col items-center justify-center">
                                <ThreeDotLoading />
                                <span className="mt-2 text-sm text-gray-500">{ t("loading_new_message") }</span>
                            </div>
                        </div>
                    );
                }

                const isRight = msg.position === 'right';
                const avatar = msg.avatar || (isRight ? HumanIcon : AIIcon);
                const displayName = isRight ? null : msg.name;
                const showPaginator = messages[msg?.prevMessage]?.messages?.length > 1;

                return (
                    <div
                        key={id}
                        className={`flex flex-col ${isRight ? 'items-end' : 'items-start'} w-full`}
                    >
                        {isRight ? (
                            <>
                                <div className="flex items-start gap-3 max-w-[80%]">
                                    <div
                                        className="bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100">
                                        {msg.content}
                                    </div>
                                    <img
                                        src={avatar}
                                        alt="User"
                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                    />
                                </div>
                                {showPaginator ? (
                                    <MessagePaginator isRight={true} msgId={msg?.prevMessage} msgPrev={messages[msg?.prevMessage]}/>) : null}
                            </>
                        ) : (
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <img
                                        src={avatar}
                                        alt="AI"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {displayName && (
                                        <span className="text-sm font-semibold text-gray-700">
                                            {displayName}
                                        </span>
                                    )}
                                </div>
                                <div className="w-full pl-10 pr-10">
                                    <div className="text-gray-800 break-words max-w-none">
                                        <MarkdownRenderer content={msg.content} index={id}/>
                                    </div>
                                </div>
                                {showPaginator ? (
                                    <MessagePaginator isRight={false} msgId={msg?.prevMessage} msgPrev={messages[msg?.prevMessage]}/>) : null}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

export default ChatContainer;