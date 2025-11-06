import React, { forwardRef, useState } from 'react';
import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const ChatContainer = forwardRef(({ messagesOrder = [], messages = {}, onLoadMore }, ref) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { t } = useTranslation(); // 如果你没用 i18n，可移除这行和相关逻辑

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

    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messagesOrder.map((id) => {
                if (id === "<PREV_MORE>") {
                    return (
                        <div key={id} className="flex justify-center w-full py-4">
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

                const isRight = msg.position === 'right';
                const avatar = msg.avatar || (isRight ? HumanIcon : AIIcon);
                const displayName = isRight ? null : msg.name;

                return (
                    <div
                        key={id}
                        className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
                    >
                        {isRight ? (
                            <div className="flex items-start gap-3 max-w-[80%]">
                                <div className="bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100">
                                    {msg.content}
                                </div>
                                <img
                                    src={avatar}
                                    alt="User"
                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                />
                            </div>
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
                                        <MarkdownRenderer content={msg.content} index={id} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

export default ChatContainer;