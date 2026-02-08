import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Check, ChevronDown, CircleX, Code, Lightbulb, Loader2, Wrench, X, Bot} from "lucide-react";

import MarkdownRenderer from "./MarkdownRenderer.jsx";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import LazyVisibility from "@/components/markdown/LazyVisibility.jsx";

const StepsButton = React.memo(({id, isExpanded, linesLength, onToggleExpand}) => {
        const clickTimeoutRef = useRef(null);

        const handleInteraction = useCallback((e) => {
            e.preventDefault();
            e.stopPropagation();
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
            if (!clickTimeoutRef.current) {  // Only proceed if not already in debounce period
                onToggleExpand(id);
                clickTimeoutRef.current = setTimeout(() => {
                    clickTimeoutRef.current = null;
                }, 300);  // Increased to 300ms for mobile reliability
            }
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
                className="cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded hover:opacity-80 text-xs text-gray-600 border border-transparent hover:border-gray-300 whitespace-nowrap flex-shrink-0 ml-2 pointer-events-auto select-none touch-manipulation"
                onClick={handleInteraction}
                style={{
                    position: 'relative',
                    zIndex: 10,
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',  // Improves touch handling
                    minWidth: '30px',  // Ensures touch target size
                    minHeight: '20px',
                }}
            >
                <span className="font-mono opacity-80">{linesLength} {linesLength <= 1 ? 'Step' : 'Steps'}</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
        );
    }, (prev, next) =>
        prev.id === next.id &&
        prev.isExpanded === next.isExpanded &&
        prev.linesLength === next.linesLength &&
        prev.onToggleExpand === next.onToggleExpand
);

StepsButton.displayName = 'StepsButton';

const StatusWidget = React.memo(({
                                     activeColor,
                                     content,
                                     doneColor,
                                     Icon,
                                     id,
                                     expandedMap,
                                     isProcessing = false,
                                     onToggleExpand,
                                     references,
                                     title,
                                     withCustomComponent = false,
                                     defaultExpanded = false,
                                 }) => {
        // 从 map 中获取当前的展开状态
        const isExpanded = Boolean(defaultExpanded ^ expandedMap?.has(id));

        const {cleanContent, isDone, isFailed, lastLine, paragraphs} = useMemo(() => {
            const trimmedContent = content.trim();
            const isDone = trimmedContent.endsWith('[DONE]');
            const isFailed = trimmedContent.endsWith('[FAILED]');

            let cleanContent = content;
            if (isDone) {
                cleanContent = content.replace(/\n\[DONE\]\s*$/, '').trimEnd();
            } else if (isFailed) {
                cleanContent = content.replace(/\n\[FAILED\]\s*$/, '').trimEnd();
            }

            const allLines = cleanContent.split('\n').filter(l => l.trim());
            const lastLine = allLines[allLines.length - 1] || '';

            const paragraphs = cleanContent
                .split(/\n\s*\n/)
                .map(p => p.trim())
                .filter(p => p.length > 0);

            return {cleanContent, isDone, isFailed, lastLine, paragraphs};
        }, [content]);

        const handleToggleExpand = useCallback((widgetId) => {
            onToggleExpand?.(widgetId);
        }, [onToggleExpand]);

        const getTruncatedLastLine = useCallback((str) => {
            if (!str) return '';
            const maxLen = 80;
            if (str.length <= maxLen) return str;
            return '...' + str.slice(-maxLen);
        }, []);

        const truncatedLastLine = useMemo(() =>
                getTruncatedLastLine(lastLine),
            [getTruncatedLastLine, lastLine]);

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
                                <X className="w-4 h-4 stroke-[3]"/>
                            ) : isDone ? (
                                <Check className="w-4 h-4 stroke-[3]"/>
                            ) : (
                                <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`}/>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-sm font-medium ${isFinished ? 'text-gray-500' : 'text-gray-800'}`}>
                              {displayTitle}
                            </span>
                            {!isFinished && (
                                <div className={`flex items-center gap-1 ${activeColor}`}>
                                    <div
                                        className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"/>
                                    <div
                                        className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"/>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                                </div>
                            )}
                        </div>
                        {!isFinished && truncatedLastLine && (
                            <span
                                className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
              {truncatedLastLine}
            </span>
                        )}
                    </div>
                    {paragraphs.length > 0 && (
                        <StepsButton
                            id={id}
                            isExpanded={isExpanded}
                            linesLength={paragraphs.length}
                            onToggleExpand={handleToggleExpand}
                        />
                    )}
                </div>
                {isExpanded && (
                    <LazyVisibility placeholder={<div className="text-gray-400">Loading...</div>}>
                        <div className="mt-2 ml-2 pl-4 border-l border-gray-200">
                            <MarkdownRenderer
                                content={cleanContent}
                                references={references}
                                withCustomComponent={withCustomComponent}
                                expandedMap={expandedMap}
                                onToggleExpand={onToggleExpand}
                            />
                        </div>
                    </LazyVisibility>
                )}
            </div>
        );
    }, (prev, next) =>
        prev.activeColor === next.activeColor &&
        prev.content === next.content &&
        prev.doneColor === next.doneColor &&
        prev.Icon === next.Icon &&
        prev.id === next.id &&
        prev.expandedMap === next.expandedMap && // 比较 map 引用
        prev.isProcessing === next.isProcessing &&
        prev.onToggleExpand === next.onToggleExpand &&
        prev.references === next.references &&
        prev.title === next.title &&
        prev.withCustomComponent === next.withCustomComponent
);
StatusWidget.displayName = 'StatusWidget';

const AgentWidget = React.memo(({
                                    activeColor = "text-blue-600",
                                    content = "",
                                    doneColor = "text-emerald-600",
                                    Icon = Bot,
                                    id,
                                    expandedMap,
                                    isProcessing = false,
                                    onToggleExpand,
                                    references,
                                    title = "Sub-Agent",
                                    withCustomComponent = true,
                                }) => {
        const isExpanded = expandedMap?.has(id);

        // 解析内容逻辑
        const {cleanContent, isDone, isFailed, lastLine, paragraphs, hasContent} = useMemo(() => {
            const trimmedRaw = content.trim();
            const isDone = trimmedRaw.endsWith('[AGENT-DONE]');
            const isFailed = trimmedRaw.endsWith('[AGENT-FAILED]');

            let clean = content;
            if (isDone) {
                clean = content.replace(/\n?\[AGENT-DONE\]\s*$/, '').trim();
            } else if (isFailed) {
                clean = content.replace(/\n?\[AGENT-FAILED\]\s*$/, '').trim();
            } else {
                clean = clean.trim();
            }

            const paragraphs = clean
                .split(/\n\s*\n/)
                .map(p => p.trim())
                .filter(p => p.length > 0);

            const allLines = clean.split('\n').filter(l => l.trim());
            const lastLine = allLines[allLines.length - 1] || '';

            // 判断是否有实际可展示的内容
            const hasContent = clean.length > 0;

            return {cleanContent: clean, isDone, isFailed, lastLine, paragraphs, hasContent};
        }, [content]);

        const handleToggleExpand = useCallback((widgetId) => {
            onToggleExpand?.(widgetId);
        }, [onToggleExpand]);

        const isFinished = isDone || isFailed;

        const statusConfig = useMemo(() => {
            if (isFailed) return {
                bg: "bg-red-50/50",
                border: "border-red-100",
                iconBg: "bg-red-100 text-red-600",
                dot: "bg-red-500",
                label: "Failed"
            };
            if (isDone) return {
                bg: "bg-zinc-50/30",
                border: "border-zinc-200/60",
                iconBg: "bg-emerald-100 text-emerald-600",
                dot: "bg-emerald-500",
                label: "Completed"
            };
            return {
                bg: "bg-white",
                border: "border-zinc-200",
                iconBg: "bg-blue-50 text-blue-600",
                dot: "bg-blue-500",
                label: "Running"
            };
        }, [isDone, isFailed]);

        return (
            <div className={`
            w-full my-2 border rounded-lg overflow-hidden transition-colors duration-200
            ${statusConfig.bg} ${statusConfig.border}
        `}>
                {/* Header 控制栏 */}
                <div className="flex items-center justify-between px-3 py-2.5">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* 简约方块 Icon */}
                        <div className={`
                        flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center
                        ${statusConfig.iconBg}
                    `}>
                            {isFailed ? <X className="w-4 h-4 stroke-[2.5]"/> :
                                isDone ? <Check className="w-4 h-4 stroke-[2.5]"/> :
                                    <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`}/>}
                        </div>

                        <div className="flex items-center gap-2 overflow-hidden flex-1">
                        <span className="text-[13px] font-semibold text-zinc-800 whitespace-nowrap">
                            {title}
                        </span>

                            {/* 状态标签 */}
                            <div
                                className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-zinc-100/80 border border-zinc-200/50 flex-shrink-0">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${!isFinished ? 'animate-pulse' : ''}`}/>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                                {statusConfig.label}
                            </span>
                            </div>

                            {/* 实时状态预览 - 仅在运行时且没有展开时显示 */}
                            {!isFinished && lastLine && !isExpanded && (
                                <span
                                    className="text-[11px] font-mono text-zinc-400 truncate hidden sm:block border-l border-zinc-200 ml-1 pl-2">
                                {lastLine}
                            </span>
                            )}
                        </div>
                    </div>

                    {/* 只有在有内容时才渲染展开按钮 */}
                    {hasContent && (
                        <StepsButton
                            id={id}
                            isExpanded={isExpanded}
                            linesLength={paragraphs.length}
                            onToggleExpand={handleToggleExpand}
                        />
                    )}
                </div>

                {/* 内容区 - 增加 hasContent 保护 */}
                {isExpanded && hasContent && (
                    <LazyVisibility placeholder={<div className="text-gray-400">Loading...</div>}>
                        <div className="border-t p-4 bg-white">
                            <MarkdownRenderer
                                content={cleanContent}
                                references={references}
                                withCustomComponent={withCustomComponent}
                                expandedMap={expandedMap}
                                onToggleExpand={onToggleExpand}
                            />
                        </div>
                    </LazyVisibility>
                )}
            </div>
        );
    }, (prev, next) =>
        prev.content === next.content &&
        prev.id === next.id &&
        prev.expandedMap === next.expandedMap &&
        prev.isProcessing === next.isProcessing &&
        prev.onToggleExpand === next.onToggleExpand &&
        prev.references === next.references &&
        prev.title === next.title
);
AgentWidget.displayName = 'AgentWidget';

const ComponentBlock = React.memo(({content, id, expandedMap, onToggleExpand, references, type}) => {
        // 通用的 props
        const commonProps = {
            content,
            id,
            expandedMap,
            onToggleExpand,
            references,
        };

        switch (type) {
            case 'processing':
                return (
                    <StatusWidget
                        {...commonProps}
                        activeColor="text-blue-600"
                        doneColor="text-green-600"
                        Icon={Loader2}
                        isProcessing={true}
                        title="Processing"
                    />
                );
            case 'thinking':
                return (
                    <StatusWidget
                        {...commonProps}
                        activeColor="text-indigo-600"
                        doneColor="text-emerald-600"
                        Icon={Lightbulb}
                        title="Thinking"
                    />
                );
            case 'toolCalling':
                return (
                    <StatusWidget
                        {...commonProps}
                        activeColor="text-amber-600"
                        doneColor="text-emerald-600"
                        Icon={Wrench}
                        title="Using Tool"
                    />
                );
            case 'coding':
                return (
                    <StatusWidget
                        {...commonProps}
                        activeColor="text-purple-600"
                        doneColor="text-green-600"
                        Icon={Code}
                        title="Coding"
                        defaultExpanded={true}
                    />
                );
            case 'agent':
                return (
                    <AgentWidget
                        {...commonProps}
                    />
                );
            case 'queuing':
                return (
                    <div className="w-full flex justify-start items-center py-2">
                        <ThreeDotLoading/>
                    </div>
                );
            case "error":
                return (
                    <div
                        className="group my-3 flex items-start gap-3 overflow-hidden rounded-xl border border-red-100 bg-red-50/40 p-4 transition-all hover:bg-red-50/60 shadow-sm">
                        <div className="flex-shrink-0">
                            <CircleX className="h-5 w-5 text-red-500/90 shadow-sm rounded-full"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <pre
                                className="font-mono text-[13px] leading-relaxed text-red-800/90 whitespace-pre-wrap break-all selection:bg-red-200">
                              {content}
                            </pre>
                        </div>
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
    }, (prev, next) =>
        prev.content === next.content &&
        prev.id === next.id &&
        prev.expandedMap === next.expandedMap && // 确保 map 变化时触发重绘
        prev.onToggleExpand === next.onToggleExpand &&
        prev.references === next.references &&
        prev.type === next.type
);
ComponentBlock.displayName = 'ComponentBlock';

export default ComponentBlock;