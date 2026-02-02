import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import { Check, Lightbulb, ChevronDown, Loader2, Wrench, X, Code } from "lucide-react";

import MarkdownRenderer from "./MarkdownRenderer.jsx"

const StepsButton = React.memo(({ linesLength, isExpanded, onToggleExpand, id }) => {
        const clickTimeoutRef = useRef(null);
        const handleInteraction = useCallback((e) => {
            e.preventDefault();
            e.stopPropagation();
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
            onToggleExpand(id);
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
                    zIndex: 10,
                    WebkitTapHighlightColor: 'transparent'
                }}
                className="cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded hover:opacity-80 text-xs text-gray-600 border border-transparent hover:border-gray-300 whitespace-nowrap flex-shrink-0 ml-2 pointer-events-auto select-none touch-manipulation"
            >
                {/* 这里显示的是段落统计数量 */}
                <span className="font-mono opacity-80">{linesLength} {linesLength <= 1 ? 'Step' : 'Steps'}</span>
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
                                     references
                                 }) => {

    // 逻辑更新：处理段落统计
    const { isDone, isFailed, cleanContent, paragraphs, lastLine } = useMemo(() => {
        const trimmedContent = content.trim();
        const isDone = trimmedContent.endsWith('[DONE]');
        const isFailed = trimmedContent.endsWith('[FAILED]');

        let cleanContent = content;
        if (isDone) {
            cleanContent = content.replace(/\n\[DONE\]\s*$/, '').trimEnd();
        } else if (isFailed) {
            cleanContent = content.replace(/\n\[FAILED\]\s*$/, '').trimEnd();
        }

        // 1. 获取所有行用于显示最后一行的预览
        const allLines = cleanContent.split('\n').filter(l => l.trim());
        const lastLine = allLines[allLines.length - 1] || '';

        // 2. 核心逻辑：统计段落
        // 使用双换行符分割段落，并过滤掉空段落
        const paragraphs = cleanContent
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0);

        return { isDone, isFailed, cleanContent, paragraphs, lastLine };
    }, [content]);

    const handleToggleExpand = useCallback((widgetId) => {
        if (onToggleExpand) {
            onToggleExpand(widgetId);
        }
    }, [onToggleExpand]);

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

    const isFinished = isDone || isFailed;

    let displayTitle = title;
    if (isDone) displayTitle = `${title} Finished`;
    if (isFailed) displayTitle = `${title} Failed`;

    let currentColor = activeColor;
    if (isDone) currentColor = doneColor;
    if (isFailed) currentColor = "text-red-600";

    return (
        <div className="w-full py-1.5">
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                    <div className={`${currentColor} flex-shrink-0`}>
                        {isFailed ? (
                            <X className="w-4 h-4 stroke-[3]" />
                        ) : isDone ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                            <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`} />
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-medium ${isFinished ? 'text-gray-500' : 'text-gray-800'}`}>
                            {displayTitle}
                        </span>
                        {!isFinished && (
                            <div className={`flex items-center gap-1 ${activeColor}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                            </div>
                        )}
                    </div>
                    {!isFinished && truncatedLastLine && (
                        <span className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
                            {truncatedLastLine}
                        </span>
                    )}
                </div>
                {/* 传入 paragraphs.length 作为段落统计 */}
                {paragraphs.length > 0 && (
                    <StepsButton
                        linesLength={paragraphs.length}
                        isExpanded={isExpanded}
                        onToggleExpand={handleToggleExpand}
                        id={id}
                    />
                )}
            </div>
            {isExpanded && (
                <div className="mt-2 ml-2 pl-4 border-l border-gray-200">
                    <MarkdownRenderer
                        content={cleanContent}
                        withCustomComponent={false}
                        references={references}
                    />
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.isExpanded === next.isExpanded &&
        prev.content === next.content &&
        prev.title === next.title
    );
});
StatusWidget.displayName = 'StatusWidget';

const ComponentBlock = React.memo(({ type, content, id, isExpanded, onToggleExpand, references }) => {
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
                    references={references}
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
                    references={references}
                />
            );
        case 'toolCalling':
            return (
                <StatusWidget
                    title="Using Tool"
                    content={content}
                    id={id}
                    isExpanded={isExpanded}
                    onToggleExpand={onToggleExpand}
                    activeColor="text-amber-600"
                    doneColor="text-emerald-600"
                    Icon={Wrench}
                    references={references}
                />
            );
        case 'coding':
            return (
                <StatusWidget
                    title="Coding"
                    content={content}
                    id={id}
                    isExpanded={!isExpanded}  // 默认展开
                    onToggleExpand={onToggleExpand}
                    activeColor="text-purple-600"
                    doneColor="text-green-600"
                    Icon={Code}
                    references={references}
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
    return (
        prev.type === next.type &&
        prev.id === next.id &&
        prev.content === next.content &&
        prev.isExpanded === next.isExpanded
    );
});
ComponentBlock.displayName = 'ComponentBlock';
export default ComponentBlock;