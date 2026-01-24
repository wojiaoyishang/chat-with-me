import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import { Check, Lightbulb, ChevronDown, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock.jsx';

const preprocessContent = (text) => {
    if (typeof text !== 'string') return text;
    return text
        .replace(/\\\[/g, '$$$')
        .replace(/\\\]/g, '$$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
};

const StepsButton = React.memo(({ linesLength, isExpanded, onToggleExpand, id }) => {
        const clickTimeoutRef = useRef(null);
        const handleInteraction = useCallback((e) => {
            e.preventDefault();
            e.stopPropagation();
            // 清除之前的延迟
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
            // 立即执行切换
            onToggleExpand(id);
            // 防止短时间内重复触发
            clickTimeoutRef.current = setTimeout(() => {
                clickTimeoutRef.current = null;
            }, 200);
        }, [id, onToggleExpand]);
        useEffect(() => {
            return () => {
                if (clickTimeoutRef.current) {
                    clearTimeout(clickTimeoutRef.current);
                }
            };
        }, []);
        return (
            <button
                onMouseDown={handleInteraction}
                onTouchStart={handleInteraction}
                style={{
                    position: 'relative',
                    zIndex: 50,
                    WebkitTapHighlightColor: 'transparent'
                }}
                className="cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded hover:opacity-80 text-xs text-gray-600 border border-transparent hover:border-gray-300 whitespace-nowrap flex-shrink-0 ml-2 pointer-events-auto select-none touch-manipulation"
            >
                <span className="font-mono opacity-80">{linesLength} Steps</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
        );
    }, (prev, next) =>
        prev.linesLength === next.linesLength &&
        prev.isExpanded === next.isExpanded
);
StepsButton.displayName = 'StepsButton';

const StatusWidget = React.memo(({
                                     title,
                                     content,
                                     id,
                                     isExpanded,
                                     onToggleExpand,
                                     activeColor,
                                     doneColor,
                                     Icon,
                                     isProcessing = false,
                                 }) => {
    // 用 useMemo 缓存计算结果
    const { isDone, cleanContent, lines, lastLine } = useMemo(() => {
        const isDone = content.trim().endsWith('[DONE]');
        const cleanContent = isDone ? content.trim().replace(/\[DONE\]$/, '').trim() : content;
        const lines = cleanContent.split('\n').filter(l => l.trim());
        const lastLine = lines[lines.length - 1] || '';
        return { isDone, cleanContent, lines, lastLine };
    }, [content]);
    // 自定义截断：优先显示末尾80个字符
    const getTruncatedLastLine = useCallback((str) => {
        if (!str) return '';
        const maxLen = 80;
        if (str.length <= maxLen) return str;
        return '...' + str.slice(-maxLen);
    }, []);
    const truncatedLastLine = useMemo(() =>
            getTruncatedLastLine(lastLine),
        [lastLine, getTruncatedLastLine]
    );
    const displayTitle = isDone ? `${title} Finished` : title;

    // 缓存 Markdown 组件
    const markdownComponents = useMemo(() => ({
        p: ({ children }) => <p className="my-1 text-sm text-gray-600">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 my-1 text-sm text-gray-600">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 my-1 text-sm text-gray-600">{children}</ol>,
        li: ({ children }) => <li className="my-0.5">{children}</li>,
        h1: ({ children }) => <h1 className="text-lg font-bold my-2 text-gray-600">{children}</h1>,
        h2: ({ children }) => <h2 className="text-md font-semibold my-1.5 text-gray-600">{children}</h2>,
        hr: () => <hr className="my-2 border-t border-gray-200" />,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-200 pl-3 italic my-1 text-gray-500 text-sm">
                {children}
            </blockquote>
        ),
        a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                {children}
            </a>
        ),
        code({ inline, className, children, ...props }) {
            const match = /language-(.+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className || inline;
            if (isInline) {
                return (
                    <code className="bg-gray-100 px-1 py-0.5 rounded-md text-xs font-mono text-gray-800" {...props}>
                        {children}
                    </code>
                );
            }
            return (
                <CodeBlock
                    codeString={String(children).replace(/\n$/, '')}
                    language={language}
                />
            );
        },
    }), []);

    return (
        <div className="w-full py-1.5">
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                    <div className={`${isDone ? doneColor : activeColor} flex-shrink-0`}>
                        {isDone ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                            <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`} />
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-medium ${isDone ? 'text-gray-500' : 'text-gray-800'}`}>
                            {displayTitle}
                        </span>
                        {!isDone && (
                            <div className={`flex items-center gap-1 ${activeColor}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                            </div>
                        )}
                    </div>
                    {!isDone && truncatedLastLine && (
                        <span className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
                            {truncatedLastLine}
                        </span>
                    )}
                </div>
                {lines.length > 0 && (
                    <StepsButton
                        linesLength={lines.length}
                        isExpanded={isExpanded}
                        onToggleExpand={onToggleExpand}
                        id={id}
                    />
                )}
            </div>
            {isExpanded && (
                <div className="mt-2 ml-2 pl-4 border-l border-gray-200">
                    <ReactMarkdown
                        remarkPlugins={[
                            remarkGfm,
                            remarkMath,
                        ]}
                        rehypePlugins={[rehypeKatex]}
                        components={markdownComponents}
                    >
                        {preprocessContent(cleanContent)}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    // 优化的比较逻辑：只在关键属性变化时重新渲染
    return (
        prev.id === next.id &&
        prev.isExpanded === next.isExpanded &&
        prev.content === next.content &&
        prev.title === next.title
    );
});
StatusWidget.displayName = 'StatusWidget';

const ComponentBlock = React.memo(({ type, content, id, isExpanded, onToggleExpand }) => {
    switch (type) {
        case 'processing':
            return (
                <StatusWidget
                    title="Processing"
                    content={content}
                    id={id}
                    isExpanded={isExpanded}
                    onToggleExpand={onToggleExpand}
                    activeColor="text-blue-600"
                    doneColor="text-green-600"
                    Icon={Loader2}
                    isProcessing={true}
                />
            );
        case 'thinking':
            return (
                <StatusWidget
                    title="Thinking"
                    content={content}
                    id={id}
                    isExpanded={isExpanded}
                    onToggleExpand={onToggleExpand}
                    activeColor="text-indigo-600"
                    doneColor="text-emerald-600"
                    Icon={Lightbulb}
                />
            );
        case 'queuing':
            return (
                <div className="w-full flex justify-start items-center py-2">
                    <ThreeDotLoading />
                </div>
            );
        default:
            return (
                <div className="bg-red-50/40 border border-red-200 p-3 my-2 rounded-md">
                    <div className="text-red-700 text-xs mb-1.5 flex items-center gap-1.5">
                        <span className="bg-red-200 text-red-800 px-1.5 py-0.5 rounded text-[10px] font-bold">!</span>
                        <strong>Unknown widget:</strong> {type}
                    </div>
                    <pre className="text-xs bg-red-50/60 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {content}
                    </pre>
                </div>
            );
    }
}, (prev, next) => {
    // 自定义比较：只在这些属性变化时才重新渲染
    return (
        prev.type === next.type &&
        prev.id === next.id &&
        prev.content === next.content &&
        prev.isExpanded === next.isExpanded
    );
});
ComponentBlock.displayName = 'ComponentBlock';
export default ComponentBlock;