import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
// 新增引入 X 图标
import { Check, Lightbulb, ChevronDown, Loader2, Wrench, X } from "lucide-react";

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
                                     references
                                 }) => {
    // 逻辑更新：同时检测 DONE 和 FAILED
    const { isDone, isFailed, cleanContent, lines, lastLine } = useMemo(() => {
        const trimmedContent = content.trim();
        const isDone = trimmedContent.endsWith('[DONE]');
        const isFailed = trimmedContent.endsWith('[FAILED]'); // 新增失败检测

        let cleanContent = content;
        if (isDone) {
            cleanContent = content.replace(/\n\[DONE\]\s*$/, '').trimEnd();
        } else if (isFailed) {
            cleanContent = content.replace(/\n\[FAILED\]\s*$/, '').trimEnd();
        }

        const lines = cleanContent.split('\n').filter(l => l.trim());
        const lastLine = lines[lines.length - 1] || '';
        return { isDone, isFailed, cleanContent, lines, lastLine };
    }, [content]);

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

    // 动态计算显示状态
    const isFinished = isDone || isFailed;

    // 计算当前应该显示的标题
    let displayTitle = title;
    if (isDone) displayTitle = `${title} Finished`;
    if (isFailed) displayTitle = `${title} Failed`;

    // 计算当前颜色
    let currentColor = activeColor;
    if (isDone) currentColor = doneColor;
    if (isFailed) currentColor = "text-red-600"; // 失败强制显示红色

    return (
        <div className="w-full py-1.5">
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                    <div className={`${currentColor} flex-shrink-0`}>
                        {/* 图标显示逻辑：失败显示 X，成功显示勾，进行中显示原图标 */}
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
                    // 修改：成功时改为绿色 (emerald-600 或 green-600)
                    doneColor="text-emerald-600"
                    Icon={Wrench}
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