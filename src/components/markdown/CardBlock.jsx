import React, {
    memo,
    useCallback,
    useMemo,
    useSyncExternalStore,
} from 'react';

import {
    Check,
    ChevronDown,
    CircleX,
    Code,
    Lightbulb,
    Loader2,
    Wrench,
    X,
    Bot,
    BookOpen,
} from 'lucide-react';

import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';

const expandedMap = new Map();
const expandedListeners = new Map();

const CARD_REPLACE_TOKEN_RE = /\{\{cardReplace\s+[^}]*\}\}/g;

const defaultRenderMarkdown = (content) => {
    return <>{content}</>;
};

const toSafeString = (value) => {
    return typeof value === 'string' ? value : String(value ?? '');
};

const stripCardReplaceTokensForPreview = (content) => {
    return toSafeString(content)
        .replace(CARD_REPLACE_TOKEN_RE, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

const getParagraphsForPreview = (content) => {
    const previewContent = stripCardReplaceTokensForPreview(content);

    if (!previewContent) {
        return [];
    }

    return previewContent
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph.length > 0);
};

const getLastLineForPreview = (content) => {
    const previewContent = stripCardReplaceTokensForPreview(content);

    if (!previewContent) {
        return '';
    }

    const allLines = previewContent
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    return allLines[allLines.length - 1] || '';
};

const getExpandedKey = (contextId, id, type = '') => {
    const safeId = String(id || '');

    if (safeId) {
        return contextId ? `${contextId}::${safeId}` : safeId;
    }

    return contextId ? `${contextId}::__type__${type}` : `__type__${type}`;
};

const subscribeExpanded = (expandedKey, listener) => {
    if (!expandedListeners.has(expandedKey)) {
        expandedListeners.set(expandedKey, new Set());
    }

    const listeners = expandedListeners.get(expandedKey);
    listeners.add(listener);

    return () => {
        listeners.delete(listener);

        if (listeners.size === 0) {
            expandedListeners.delete(expandedKey);
        }
    };
};

const notifyExpandedListeners = (expandedKey) => {
    const listeners = expandedListeners.get(expandedKey);

    if (!listeners) return;

    for (const listener of listeners) {
        listener();
    }
};

const initializeExpandedValue = (expandedKey, defaultExpanded) => {
    if (!expandedMap.has(expandedKey)) {
        expandedMap.set(expandedKey, defaultExpanded === true);
    }
};

const getExpandedValue = (expandedKey) => {
    return expandedMap.get(expandedKey) === true;
};

const setExpandedValue = (expandedKey, value) => {
    const nextValue = value === true;
    const currentValue = expandedMap.get(expandedKey) === true;

    if (expandedMap.has(expandedKey) && currentValue === nextValue) {
        return;
    }

    expandedMap.set(expandedKey, nextValue);
    notifyExpandedListeners(expandedKey);
};

const toggleExpandedValue = (expandedKey) => {
    setExpandedValue(expandedKey, !getExpandedValue(expandedKey));
};

const useExpandedState = (expandedKey, defaultExpanded = false) => {
    initializeExpandedValue(expandedKey, defaultExpanded);

    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    const setIsExpanded = useCallback((nextValueOrUpdater) => {
        const currentValue = getExpandedValue(expandedKey);

        const nextValue = typeof nextValueOrUpdater === 'function'
            ? nextValueOrUpdater(currentValue)
            : nextValueOrUpdater;

        setExpandedValue(expandedKey, nextValue);
    }, [expandedKey]);

    return [isExpanded, setIsExpanded];
};

const StableStepsButton = memo(({
                                    expandedKey,
                                }) => {
    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    const handlePointerDownCapture = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleExpandedValue(expandedKey);
    }, [expandedKey]);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        toggleExpandedValue(expandedKey);
    }, [expandedKey]);

    return (
        <button
            type="button"
            className="cursor-pointer flex items-center justify-center rounded hover:opacity-80 text-gray-600 border border-transparent hover:border-gray-300 whitespace-nowrap flex-shrink-0 ml-2 pointer-events-auto select-none touch-manipulation"
            onPointerDownCapture={handlePointerDownCapture}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={isExpanded ? 'Collapse steps' : 'Expand steps'}
            style={{
                position: 'relative',
                zIndex: 10,
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                width: '28px',
                minWidth: '28px',
                height: '22px',
                minHeight: '22px',
            }}
        >
            <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
            />
        </button>
    );
}, (prev, next) => {
    return prev.expandedKey === next.expandedKey;
});

StableStepsButton.displayName = 'StableStepsButton';

const StatusHeader = memo(({
                               activeColor,
                               currentColor,
                               displayTitle,
                               Icon,
                               expandedKey,
                               hasSteps,
                               isDone,
                               isFailed,
                               isFinished,
                               isProcessing,
                               truncatedLastLine,
                           }) => {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <div className={`${currentColor} flex-shrink-0`}>
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[3]"/>
                    ) : isDone ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : (
                        <Icon
                            className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`}
                        />
                    )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-sm font-medium ${isFinished ? 'text-gray-500' : 'text-gray-800'}`}>
                        {displayTitle}
                    </span>

                    {!isFinished && (
                        <div className={`flex items-center gap-1 ${activeColor}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"/>
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"/>
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                        </div>
                    )}
                </div>

                {!isFinished && truncatedLastLine && (
                    <span className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
                        {truncatedLastLine}
                    </span>
                )}
            </div>

            {hasSteps && (
                <StableStepsButton expandedKey={expandedKey}/>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.activeColor === next.activeColor &&
        prev.currentColor === next.currentColor &&
        prev.displayTitle === next.displayTitle &&
        prev.Icon === next.Icon &&
        prev.expandedKey === next.expandedKey &&
        prev.hasSteps === next.hasSteps &&
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isProcessing === next.isProcessing &&
        prev.truncatedLastLine === next.truncatedLastLine
    );
});

StatusHeader.displayName = 'StatusHeader';

const StatusBody = memo(({
                             cleanContent,
                             expandedKey,
                             renderMarkdown,
                         }) => {
    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    if (!isExpanded) {
        return null;
    }

    return (
        <div className="mt-2 ml-2 pl-4 border-l border-gray-200">
            {renderMarkdown(cleanContent)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.cleanContent === next.cleanContent &&
        prev.expandedKey === next.expandedKey &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

StatusBody.displayName = 'StatusBody';

const StatusWidget = memo(({
                               activeColor,
                               content = '',
                               doneColor,
                               Icon,
                               id,
                               isProcessing = false,
                               title,
                               defaultExpanded = false,
                               contextId = '',
                               type = '',
                               renderMarkdown = defaultRenderMarkdown,
                           }) => {
    const expandedKey = useMemo(() => {
        return getExpandedKey(contextId, id, type);
    }, [contextId, id, type]);

    useExpandedState(expandedKey, defaultExpanded);

    const {
        cleanContent,
        isDone,
        isFailed,
        lastLine,
        paragraphs,
    } = useMemo(() => {
        const safeContent = toSafeString(content);
        const trimmedContent = safeContent.trim();

        const isDone = trimmedContent.endsWith('[DONE]');
        const isFailed = trimmedContent.endsWith('[FAILED]');

        let cleanContent = safeContent;

        if (isDone) {
            cleanContent = safeContent.replace(/\n\[DONE\]\s*$/, '').trimEnd();
        } else if (isFailed) {
            cleanContent = safeContent.replace(/\n\[FAILED\]\s*$/, '').trimEnd();
        }

        const previewContent = stripCardReplaceTokensForPreview(cleanContent);
        const lastLine = getLastLineForPreview(previewContent);
        const paragraphs = getParagraphsForPreview(previewContent);

        return {
            cleanContent,
            isDone,
            isFailed,
            lastLine,
            paragraphs,
        };
    }, [content]);

    const truncatedLastLine = useMemo(() => {
        if (!lastLine) return '';

        const maxLen = 80;

        if (lastLine.length <= maxLen) {
            return lastLine;
        }

        return `...${lastLine.slice(-maxLen)}`;
    }, [lastLine]);

    const isFinished = isDone || isFailed;

    let displayTitle = title;
    if (isDone) displayTitle = `${title} Finished`;
    if (isFailed) displayTitle = `${title} Failed`;

    let currentColor = activeColor;
    if (isDone) currentColor = doneColor;
    if (isFailed) currentColor = 'text-red-600';

    return (
        <div className="w-full py-1.5">
            <StatusHeader
                activeColor={activeColor}
                currentColor={currentColor}
                displayTitle={displayTitle}
                Icon={Icon}
                expandedKey={expandedKey}
                hasSteps={paragraphs.length > 0}
                isDone={isDone}
                isFailed={isFailed}
                isFinished={isFinished}
                isProcessing={isProcessing}
                truncatedLastLine={truncatedLastLine}
            />

            <StatusBody
                cleanContent={cleanContent}
                expandedKey={expandedKey}
                renderMarkdown={renderMarkdown}
            />
        </div>
    );
}, (prev, next) => {
    return (
        prev.contextId === next.contextId &&
        prev.activeColor === next.activeColor &&
        prev.content === next.content &&
        prev.doneColor === next.doneColor &&
        prev.Icon === next.Icon &&
        prev.id === next.id &&
        prev.isProcessing === next.isProcessing &&
        prev.title === next.title &&
        prev.defaultExpanded === next.defaultExpanded &&
        prev.type === next.type &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

StatusWidget.displayName = 'StatusWidget';

const AgentHeader = memo(({
                              Icon,
                              expandedKey,
                              hasSteps,
                              isDone,
                              isFailed,
                              isFinished,
                              isProcessing,
                              lastLine,
                              statusConfig,
                              title,
                              hasContent,
                          }) => {
    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    return (
        <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                    className={`
                        flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center
                        ${statusConfig.iconBg}
                    `}
                >
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[2.5]"/>
                    ) : isDone ? (
                        <Check className="w-4 h-4 stroke-[2.5]"/>
                    ) : (
                        <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`}/>
                    )}
                </div>

                <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="text-[13px] font-semibold text-zinc-800 whitespace-nowrap">
                        {title}
                    </span>

                    <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-zinc-100/80 border border-zinc-200/50 flex-shrink-0">
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${!isFinished ? 'animate-pulse' : ''}`}
                        />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                            {statusConfig.label}
                        </span>
                    </div>

                    {!isFinished && lastLine && !isExpanded && (
                        <span className="text-[11px] font-mono text-zinc-400 truncate hidden sm:block border-l border-zinc-200 ml-1 pl-2">
                            {lastLine}
                        </span>
                    )}
                </div>
            </div>

            {hasContent && hasSteps && (
                <StableStepsButton expandedKey={expandedKey}/>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.Icon === next.Icon &&
        prev.expandedKey === next.expandedKey &&
        prev.hasSteps === next.hasSteps &&
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isProcessing === next.isProcessing &&
        prev.lastLine === next.lastLine &&
        prev.statusConfig === next.statusConfig &&
        prev.title === next.title &&
        prev.hasContent === next.hasContent
    );
});

AgentHeader.displayName = 'AgentHeader';

const AgentBody = memo(({
                            cleanContent,
                            expandedKey,
                            hasContent,
                            renderMarkdown,
                        }) => {
    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    if (!isExpanded || !hasContent) {
        return null;
    }

    return (
        <div className="border-t p-4 bg-white">
            {renderMarkdown(cleanContent)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.cleanContent === next.cleanContent &&
        prev.expandedKey === next.expandedKey &&
        prev.hasContent === next.hasContent &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

AgentBody.displayName = 'AgentBody';

const AgentWidget = memo(({
                              content = '',
                              Icon = Bot,
                              id,
                              isProcessing = false,
                              title = 'Sub-Agent',
                              defaultExpanded = false,
                              contextId = '',
                              type = 'agent',
                              renderMarkdown = defaultRenderMarkdown,
                          }) => {
    const expandedKey = useMemo(() => {
        return getExpandedKey(contextId, id, type);
    }, [contextId, id, type]);

    useExpandedState(expandedKey, defaultExpanded);

    const {
        cleanContent,
        isDone,
        isFailed,
        lastLine,
        paragraphs,
        hasContent,
    } = useMemo(() => {
        const safeContent = toSafeString(content);
        const trimmedRaw = safeContent.trim();

        const isDone = trimmedRaw.endsWith('[AGENT-DONE]');
        const isFailed = trimmedRaw.endsWith('[AGENT-FAILED]');

        let clean = safeContent;

        if (isDone) {
            clean = safeContent.replace(/\n?\[AGENT-DONE\]\s*$/, '').trim();
        } else if (isFailed) {
            clean = safeContent.replace(/\n?\[AGENT-FAILED\]\s*$/, '').trim();
        } else {
            clean = clean.trim();
        }

        const previewContent = stripCardReplaceTokensForPreview(clean);
        const paragraphs = getParagraphsForPreview(previewContent);
        const lastLine = getLastLineForPreview(previewContent);
        const hasContent = clean.length > 0;

        return {
            cleanContent: clean,
            isDone,
            isFailed,
            lastLine,
            paragraphs,
            hasContent,
        };
    }, [content]);

    const isFinished = isDone || isFailed;

    const statusConfig = useMemo(() => {
        if (isFailed) {
            return {
                bg: 'bg-red-50/50',
                border: 'border-red-100',
                iconBg: 'bg-red-100 text-red-600',
                dot: 'bg-red-500',
                label: 'Failed',
            };
        }

        if (isDone) {
            return {
                bg: 'bg-zinc-50/30',
                border: 'border-zinc-200/60',
                iconBg: 'bg-emerald-100 text-emerald-600',
                dot: 'bg-emerald-500',
                label: 'Completed',
            };
        }

        return {
            bg: 'bg-white',
            border: 'border-zinc-200',
            iconBg: 'bg-blue-50 text-blue-600',
            dot: 'bg-blue-500',
            label: 'Running',
        };
    }, [isDone, isFailed]);

    return (
        <div
            className={`
                w-full my-2 border rounded-lg overflow-hidden transition-colors duration-200
                ${statusConfig.bg} ${statusConfig.border}
            `}
        >
            <AgentHeader
                Icon={Icon}
                expandedKey={expandedKey}
                hasSteps={paragraphs.length > 0}
                isDone={isDone}
                isFailed={isFailed}
                isFinished={isFinished}
                isProcessing={isProcessing}
                lastLine={lastLine}
                statusConfig={statusConfig}
                title={title}
                hasContent={hasContent}
            />

            <AgentBody
                cleanContent={cleanContent}
                expandedKey={expandedKey}
                hasContent={hasContent}
                renderMarkdown={renderMarkdown}
            />
        </div>
    );
}, (prev, next) => {
    return (
        prev.contextId === next.contextId &&
        prev.content === next.content &&
        prev.id === next.id &&
        prev.isProcessing === next.isProcessing &&
        prev.title === next.title &&
        prev.defaultExpanded === next.defaultExpanded &&
        prev.type === next.type &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

AgentWidget.displayName = 'AgentWidget';

const HtmlBlock = memo(({content = '', id}) => {
    return (
        <div
            className="my-3"
            data-card-block-id={id}
            dangerouslySetInnerHTML={{
                __html: toSafeString(content),
            }}
        />
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

HtmlBlock.displayName = 'HtmlBlock';

const MarkdownBlock = memo(({
                                content = '',
                                renderMarkdown = defaultRenderMarkdown,
                            }) => {
    return (
        <div className="my-3">
            {renderMarkdown(content)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.content === next.content &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

MarkdownBlock.displayName = 'MarkdownBlock';

const CardBlock = memo(({
                            content = '',
                            id,
                            type = 'markdown',
                            contextId = '',
                            replacement,
                            renderMarkdown = defaultRenderMarkdown,
                        }) => {
    const commonProps = {
        content,
        id,
        type,
        contextId,
        replacement,
        renderMarkdown,
    };

    switch (type) {
        case 'markdown':
            return (
                <MarkdownBlock
                    {...commonProps}
                />
            );

        case 'text':
            return (
                <div
                    className="my-3 whitespace-pre-wrap"
                    data-card-block-id={id}
                >
                    {content}
                </div>
            );

        case 'html':
            return (
                <HtmlBlock
                    id={id}
                    content={content}
                />
            );

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

        case 'doc':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-cyan-600"
                    doneColor="text-teal-600"
                    Icon={BookOpen}
                    title="Writing"
                    defaultExpanded={false}
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

        case 'error':
            return (
                <div className="group my-3 flex items-start gap-3 overflow-hidden rounded-xl border border-red-100 bg-red-50/40 p-4 transition-all hover:bg-red-50/60 shadow-sm">
                    <div className="flex-shrink-0">
                        <CircleX className="h-5 w-5 text-red-500/90 shadow-sm rounded-full"/>
                    </div>

                    <div className="flex-1 min-w-0">
                        <pre className="font-mono text-[13px] leading-relaxed text-red-800/90 whitespace-pre-wrap break-all selection:bg-red-200">
                            {content}
                        </pre>
                    </div>
                </div>
            );

        default:
            return (
                <div className="bg-red-50/40 border border-red-200 p-3 my-2 rounded-md">
                    <div className="text-red-700 text-xs mb-1.5 flex items-center gap-1.5">
                        <span className="bg-red-200 text-red-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            !
                        </span>
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
        prev.contextId === next.contextId &&
        prev.content === next.content &&
        prev.id === next.id &&
        prev.type === next.type &&
        prev.replacement === next.replacement &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

CardBlock.displayName = 'CardBlock';

export default CardBlock;