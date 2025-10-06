import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import AIIcon from '@/assets/AI.png';
import HumanIcon from '@/assets/human.jpg';

import CodeBlock from '@/components/markdown/CodeBlock.jsx';

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

function ChatContainer({ messages = [] }) {
    return (
        <div className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6">
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
                            // 用户消息
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
                            // AI 消息
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
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm, remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                            components={{
                                                p: ({ children }) => <p className="my-2">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
                                                li: ({ children }) => <li className="my-1">{children}</li>,
                                                a: ({ href, children }) => (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
                                                h1: ({ children }) => <h1 className="text-xl font-bold my-3">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600">
                                                        {children}
                                                    </blockquote>
                                                ),
                                                // 行内代码
                                                code({ inline, className, children, ...props }) {
                                                    if (inline) {
                                                        return (
                                                            <code
                                                                className="bg-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono"
                                                                {...props}
                                                            >
                                                                {children}
                                                            </code>
                                                        );
                                                    }

                                                    // 块级代码：交给 CodeBlock 处理
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    const language = match?.[1] || '';
                                                    const codeString = String(children).replace(/\n$/, '');

                                                    return (
                                                        <CodeBlock
                                                            codeString={codeString}
                                                            language={language}
                                                            index={index}
                                                        />
                                                    );
                                                },
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ChatContainer;