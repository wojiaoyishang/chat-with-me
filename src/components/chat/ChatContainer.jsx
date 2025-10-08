// ChatContainer.jsx
import React, { forwardRef } from 'react';
import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';

const ChatContainer = forwardRef(({ messages = [] }, ref) => {
    return (
        <div
            ref={ref}
            className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60"
        >
            {messages.map((msg, index) => {
                const isRight = msg.position === 'right';
                const avatar = msg.avatar || (isRight ? HumanIcon : AIIcon);
                const displayName = isRight ? null : msg.name;

                return (
                    <div
                        key={index}
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
                                        <MarkdownRenderer content={msg.content} index={index} />
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