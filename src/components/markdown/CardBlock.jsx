import React, {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
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

// 使用 import.meta.glob 静态收集所有语言模块，供 toolCommand 按需加载高亮语言。
const languageModules = import.meta.glob('/node_modules/highlight.js/es/languages/*.js');

if (typeof window !== 'undefined' && !window.hljsFailedLanguages) {
    window.hljsFailedLanguages = new Set();
}

let hljs = null;
let loadingPromise = null;

const loadHljs = () => {
    if (hljs) {
        return Promise.resolve(hljs);
    }

    if (!loadingPromise) {
        loadingPromise = import('highlight.js/lib/core')
            .then((module) => {
                hljs = module.default;
                return hljs;
            })
            .finally(() => {
                loadingPromise = null;
            });
    }

    return loadingPromise;
};

const HIGHLIGHT_LANGUAGE_ALIASES = {
    csharp: 'csharp',
    'c#': 'csharp',
    cpp: 'cpp',
    'c++': 'cpp',
    html: 'xml',
    js: 'javascript',
    md: 'markdown',
    py: 'python',
    python3: 'python',
    shell: 'bash',
    sh: 'bash',
    ts: 'typescript',
};

const normalizeHighlightLanguage = (language) => {
    const normalized = toSafeString(language).trim().toLowerCase();

    if (!normalized) {
        return '';
    }

    return HIGHLIGHT_LANGUAGE_ALIASES[normalized] || normalized;
};

const expandedMap = new Map();
const expandedListeners = new Map();

const CARD_REPLACE_TOKEN_RE = /\{\{cardReplace\s+[^}]*\}\}/g;
const PROGRESS_LINE_RE = /^\[PROGRESS\s+(\d+)\/(\d+)\]$/;
const PROGRESS_LINE_GLOBAL_RE = /^[ \t]*\[PROGRESS\s+\d+\/\d+\][ \t]*$/gm;

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


const stripProgressMarkers = (content) => {
    return toSafeString(content)
        .replace(PROGRESS_LINE_GLOBAL_RE, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trimEnd();
};

const getLatestProgressMarker = (content) => {
    const lines = toSafeString(content).split(/\r?\n/);

    for (let index = lines.length - 1; index >= 0; index -= 1) {
        const line = lines[index].trim();
        const match = line.match(PROGRESS_LINE_RE);

        if (!match) {
            continue;
        }

        const rawCurrent = Number.parseInt(match[1], 10);
        const rawTotal = Number.parseInt(match[2], 10);

        if (!Number.isFinite(rawCurrent) || !Number.isFinite(rawTotal) || rawTotal <= 0) {
            return null;
        }

        const total = rawTotal;
        const current = Math.min(Math.max(rawCurrent, 0), total);

        return {
            current,
            total,
            isNotStarted: current === 0,
            isComplete: current >= total,
        };
    }

    return null;
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


const progressPercentMap = new Map();

const getProgressStorageKey = (progressKey, total) => {
    return `${progressKey || '__tool_progress__'}::${total || 0}`;
};

const AnimatedProgressFill = memo(({
                                       className = '',
                                       isActive = false,
                                       progressKey,
                                       storageKey,
                                       targetPercent,
                                   }) => {
    const safeTargetPercent = Math.max(0, Math.min(100, Number(targetPercent) || 0));
    const resolvedStorageKey = storageKey || progressKey || '__tool_progress__';
    const [displayPercent, setDisplayPercent] = useState(() => {
        if (progressPercentMap.has(resolvedStorageKey)) {
            return progressPercentMap.get(resolvedStorageKey);
        }

        return safeTargetPercent <= 0 ? 0 : Math.max(0, safeTargetPercent - 18);
    });

    useEffect(() => {
        let rafId = 0;

        rafId = window.requestAnimationFrame(() => {
            setDisplayPercent(safeTargetPercent);
            progressPercentMap.set(resolvedStorageKey, safeTargetPercent);
        });

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [resolvedStorageKey, safeTargetPercent]);

    return (
        <div
            className={className}
            style={{
                width: `${displayPercent}%`,
                animation: isActive ? 'card-progress-breathe 1.55s ease-in-out infinite' : undefined,
            }}
        />
    );
}, (prev, next) => {
    return (
        prev.className === next.className &&
        prev.isActive === next.isActive &&
        prev.progressKey === next.progressKey &&
        prev.storageKey === next.storageKey &&
        prev.targetPercent === next.targetPercent
    );
});

AnimatedProgressFill.displayName = 'AnimatedProgressFill';

const getCompactProgressSteps = (current, total) => {
    if (current <= 0) {
        return [];
    }

    return [Math.min(current, total)];
};

const getVisualProgressPercent = (current, total) => {
    if (total <= 0 || current <= 0) {
        return 0;
    }

    if (current >= total) {
        return 100;
    }

    // 完成一个工具后，视觉上向下一段轻轻推进一点点，
    // 让进度看起来还在持续流动，但不会越过下一个工具节点。
    const fakeAdvance = 0.22;
    const maxBeforeNextStep = current + 0.38;
    const visualCurrent = Math.min(current + fakeAdvance, maxBeforeNextStep, total);

    return Math.max(0, Math.min(96, (visualCurrent / total) * 100));
};

const ProgressTimeline = memo(({
                                   progress,
                                   progressKey,
                                   isFinished,
                                   isFailed,
                                   isDisappearing = false,
                               }) => {
    if (!progress) {
        return null;
    }

    const {current, total, isNotStarted} = progress;
    const steps = Array.from({length: total}, (_, index) => index + 1);
    const compactSteps = getCompactProgressSteps(current, total);
    const progressPercent = getVisualProgressPercent(current, total);
    const shouldBreathe = !isFailed && current > 0;
    const latestCompletedStep = current > 0 ? Math.min(current, total) : null;

    const tone = isFailed
        ? {
            active: 'bg-red-500 border-red-500 text-white',
            activeText: 'text-red-600',
            ring: 'ring-red-200',
            fill: 'from-red-400 via-red-500 to-red-400',
            glow: 'shadow-red-200/70',
        }
        : {
            active: 'bg-yellow-500 border-yellow-500 text-white',
            activeText: 'text-yellow-700',
            ring: 'ring-yellow-200',
            fill: 'from-yellow-300 via-yellow-500 to-yellow-300',
            glow: 'shadow-yellow-200/80',
        };

    const progressStorageKey = getProgressStorageKey(progressKey, total);

    return (
        <div
            className={`w-full min-w-0 flex-1 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDisappearing ? 'opacity-0 scale-x-[0.985] blur-[0.5px]' : 'opacity-100 scale-x-100 blur-0'}`}
            aria-label={`Tool progress ${current} of ${total}`}
        >
            <style>{`
                @keyframes card-progress-breathe {
                    0%, 100% { filter: saturate(1); opacity: 0.9; }
                    50% { filter: saturate(1.35) brightness(1.06); opacity: 1; }
                }

                @keyframes card-progress-node-breathe {
                    0%, 100% {
                        transform: scale(1);
                        filter: brightness(1) saturate(1);
                    }
                    50% {
                        transform: scale(1.045);
                        filter: brightness(1.06) saturate(1.18);
                    }
                }

                @keyframes card-progress-node-halo {
                    0%, 100% {
                        opacity: 0.14;
                        transform: scale(0.72);
                    }
                    50% {
                        opacity: 0.55;
                        transform: scale(0.98);
                    }
                }
            `}</style>

            <div className="hidden sm:flex items-center gap-3 w-full min-w-0 pr-0 overflow-visible">
                <span className={`text-xs font-bold tabular-nums whitespace-nowrap ${isNotStarted ? 'text-zinc-400' : tone.activeText}`}>
                    {current}/{total}
                </span>

                <div className="relative flex items-center min-w-0 flex-1 py-1.5">
                    <div className="absolute left-2 right-2 top-1/2 h-3.5 -translate-y-1/2 rounded-full bg-zinc-200/90 overflow-hidden shadow-inner">
                        <AnimatedProgressFill
                            className={`h-full rounded-full bg-gradient-to-r ${tone.fill} shadow-lg ${tone.glow} transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left`}
                            isActive={shouldBreathe && !isDisappearing}
                            progressKey={progressKey}
                            storageKey={`${progressStorageKey}::desktop`}
                            targetPercent={progressPercent}
                        />
                    </div>

                    <div className="relative z-[1] flex items-center justify-between w-full min-w-0">
                        {steps.map((step) => {
                            const isCompleted = step <= current;
                            const isLatestCompleted = step === latestCompletedStep && !isFailed;

                            return (
                                <div
                                    key={step}
                                    className={`
                                        relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible
                                        ${isCompleted ? tone.active : 'border-zinc-300 bg-white text-zinc-400'}
                                    `}
                                    style={{
                                        animation: isLatestCompleted ? 'card-progress-node-breathe 1.35s ease-in-out infinite' : undefined,
                                    }}
                                >

                                    {isLatestCompleted && (
                                        <span
                                            className="pointer-events-none absolute inset-[2px] rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.82) 0%, rgba(250, 204, 21, 0.34) 52%, rgba(250, 204, 21, 0) 74%)',
                                                animation: 'card-progress-node-halo 1.55s ease-in-out infinite',
                                            }}
                                        />
                                    )}

                                    {isCompleted ? (
                                        <Check className="relative z-[1] h-3.5 w-3.5 stroke-[3]"/>
                                    ) : (
                                        <span className="relative z-[1]">{step}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="sm:hidden flex items-center gap-2 w-full min-w-0 overflow-visible">
                <div className="relative h-4 min-w-0 flex-1 rounded-full bg-zinc-200/90 overflow-hidden shadow-inner">
                    <AnimatedProgressFill
                        className={`h-full rounded-full bg-gradient-to-r ${tone.fill} shadow-lg ${tone.glow} transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left`}
                        isActive={shouldBreathe && !isDisappearing}
                        progressKey={progressKey}
                        storageKey={`${progressStorageKey}::mobile`}
                        targetPercent={progressPercent}
                    />
                </div>

                {compactSteps.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {compactSteps.map((step) => {
                            const isCompleted = step <= current;
                            const isLatestCompleted = step === latestCompletedStep && !isFailed;

                            return (
                                <div
                                    key={step}
                                    className={`
                                        relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible
                                        ${isCompleted ? tone.active : 'border-zinc-300 bg-white text-zinc-400'}
                                    `}
                                    style={{
                                        animation: isLatestCompleted ? 'card-progress-node-breathe 1.35s ease-in-out infinite' : undefined,
                                    }}
                                >

                                    {isLatestCompleted && (
                                        <span
                                            className="pointer-events-none absolute inset-[2px] rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.82) 0%, rgba(250, 204, 21, 0.34) 52%, rgba(250, 204, 21, 0) 74%)',
                                                animation: 'card-progress-node-halo 1.55s ease-in-out infinite',
                                            }}
                                        />
                                    )}

                                    {isCompleted ? (
                                        <Check className="relative z-[1] h-3.5 w-3.5 stroke-[3]"/>
                                    ) : (
                                        <span className="relative z-[1]">{step}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <span className={`text-[10px] font-bold tabular-nums whitespace-nowrap ${isNotStarted ? 'text-zinc-400' : tone.activeText}`}>
                    {current}/{total}
                </span>
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.progressKey === next.progressKey &&
        prev.isFinished === next.isFinished &&
        prev.isFailed === next.isFailed &&
        prev.isDisappearing === next.isDisappearing &&
        prev.progress?.current === next.progress?.current &&
        prev.progress?.total === next.progress?.total
    );
});

ProgressTimeline.displayName = 'ProgressTimeline';


const ToolCallingRightStatus = memo(({
                                         isDone,
                                         isFailed,
                                         isFinished,
                                     }) => {
    if (isFailed) {
        return (
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100">
                <X className="h-3.5 w-3.5 stroke-[3]"/>
            </div>
        );
    }

    if (isFinished || isDone) {
        return (
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <Check className="h-3.5 w-3.5 stroke-[3]"/>
            </div>
        );
    }

    return (
        <div className="flex h-6 flex-shrink-0 items-center justify-center px-1.5 rounded-full bg-yellow-50/80 border border-yellow-100 text-yellow-600">
            <span className="flex items-center gap-1" aria-label="Tool calling is running">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.35s]"/>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.18s]"/>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"/>
            </span>
        </div>
    );
}, (prev, next) => {
    return (
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished
    );
});

ToolCallingRightStatus.displayName = 'ToolCallingRightStatus';

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
                               isToolCalling,
                               progress,
                               truncatedLastLine,
                           }) => {
    const previousIsFinishedRef = useRef(isFinished);
    const [isFinishingProgressVisible, setIsFinishingProgressVisible] = useState(false);
    const [isFinishingProgressFading, setIsFinishingProgressFading] = useState(false);

    const justFinishedDuringRender = Boolean(
        isToolCalling &&
        progress &&
        isFinished &&
        !previousIsFinishedRef.current &&
        !isFailed,
    );

    useEffect(() => {
        if (!isToolCalling || !progress || isFailed) {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
            previousIsFinishedRef.current = isFinished;
            return undefined;
        }

        const justFinished = isFinished && !previousIsFinishedRef.current;
        previousIsFinishedRef.current = isFinished;

        if (!isFinished) {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
            return undefined;
        }

        if (!justFinished) {
            return undefined;
        }

        setIsFinishingProgressVisible(true);
        setIsFinishingProgressFading(false);

        const fadeTimer = window.setTimeout(() => {
            setIsFinishingProgressFading(true);
        }, 650);

        const hideTimer = window.setTimeout(() => {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
        }, 1750);

        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(hideTimer);
        };
    }, [isToolCalling, progress, isFinished, isFailed]);

    const shouldShowProgress = Boolean(progress && (!isFinished || isFinishingProgressVisible || justFinishedDuringRender));
    const shouldFadeProgress = Boolean(progress && isFinished && isFinishingProgressFading && !isFailed);

    return (
        <div className="flex items-center justify-between gap-2 group">
            <div className={`flex items-center gap-2.5 min-w-0 flex-1 ${shouldShowProgress ? 'overflow-visible' : 'overflow-hidden'}`}>
                <div className={`${isToolCalling && !isFailed && !isFinished ? 'text-yellow-600' : currentColor} flex-shrink-0`}>
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[3]"/>
                    ) : isToolCalling && isFinished ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : isToolCalling ? (
                        <Icon className="w-4 h-4 animate-pulse"/>
                    ) : isDone ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : (
                        <Icon
                            className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`}
                        />
                    )}
                </div>

                {shouldShowProgress ? (
                    <>
                        <span
                            className="text-sm font-medium whitespace-nowrap flex-shrink-0 text-gray-800"
                        >
                            {displayTitle}
                        </span>

                        <ProgressTimeline
                            progress={progress}
                            progressKey={expandedKey}
                            isFinished={isFinished}
                            isFailed={isFailed}
                            isDisappearing={shouldFadeProgress}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                                className={`text-sm font-medium ${isFinished ? 'text-gray-500' : 'text-gray-800'}`}
                            >
                                {displayTitle}
                            </span>

                            {!isFinished && !isToolCalling && (
                                <div className={`flex items-center gap-1 ${activeColor}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"/>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"/>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                                </div>
                            )}
                        </div>

                        {!isFinished && !isToolCalling && truncatedLastLine && (
                            <span className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
                                {truncatedLastLine}
                            </span>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
                {isToolCalling && !isFinished && (
                    <ToolCallingRightStatus
                        isDone={isDone}
                        isFailed={isFailed}
                        isFinished={isFinished}
                    />
                )}

                {hasSteps && (
                    <StableStepsButton expandedKey={expandedKey}/>
                )}
            </div>
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
        prev.isToolCalling === next.isToolCalling &&
        prev.progress?.current === next.progress?.current &&
        prev.progress?.total === next.progress?.total &&
        prev.truncatedLastLine === next.truncatedLastLine
    );
});

StatusHeader.displayName = 'StatusHeader';

const StatusBody = memo(({
                             cleanContent,
                             expandedKey,
                             isFailed = false,
                             isFinished = false,
                             isToolCalling = false,
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
        <div
            className={`mt-2 ml-2 pl-4 border-l border-gray-200 ${isToolCalling ? 'transition-all duration-300' : ''}`}
            style={isToolCalling && !isFinished && !isFailed ? {
                animation: 'card-tool-body-breathe 1.8s ease-in-out infinite',
            } : undefined}
        >
            {isToolCalling && !isFinished && !isFailed && (
                <style>{`
                    @keyframes card-tool-body-breathe {
                        0%, 100% {
                            opacity: 0.92;
                            filter: saturate(1);
                        }
                        50% {
                            opacity: 1;
                            filter: saturate(1.08) brightness(1.015);
                        }
                    }
                `}</style>
            )}

            {renderMarkdown(cleanContent)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.cleanContent === next.cleanContent &&
        prev.expandedKey === next.expandedKey &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isToolCalling === next.isToolCalling &&
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
        progress,
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

        const progress = type === 'toolCalling'
            ? getLatestProgressMarker(cleanContent)
            : null;

        if (type === 'toolCalling') {
            cleanContent = stripProgressMarkers(cleanContent);
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
            progress,
        };
    }, [content, type]);

    const truncatedLastLine = useMemo(() => {
        if (!lastLine) return '';

        const maxLen = 80;

        if (lastLine.length <= maxLen) {
            return lastLine;
        }

        return `...${lastLine.slice(-maxLen)}`;
    }, [lastLine]);

    const isProgressComplete = type === 'toolCalling' && progress?.isComplete === true;
    const isFinished = isDone || isFailed || isProgressComplete;

    let displayTitle = title;
    if (type === 'toolCalling') {
        if (isFailed) {
            displayTitle = `${title} Failed`;
        } else if (isDone) {
            displayTitle = `${title} Finished`;
        } else if (isProgressComplete) {
            displayTitle = `${title} Done`;
        }
    } else {
        if (isDone) displayTitle = `${title} Finished`;
        if (isFailed) displayTitle = `${title} Failed`;
    }

    let currentColor = activeColor;
    if (isDone || isProgressComplete) currentColor = doneColor;
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
                isToolCalling={type === 'toolCalling'}
                progress={progress}
                truncatedLastLine={truncatedLastLine}
            />

            <StatusBody
                cleanContent={cleanContent}
                expandedKey={expandedKey}
                isFailed={isFailed}
                isFinished={isFinished}
                isToolCalling={type === 'toolCalling'}
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


const TOOL_COMMAND_CODE_RE = /^\s*\[CODE:([^\]]+)]\s*(?:\r?\n|$)/i;
const TOOL_LOG_TITLE_RE = /^\s*\[TITLE:([^\]]+)]\s*(?:\r?\n|$)/i;

const parseToolCommandContent = (content) => {
    const safeContent = toSafeString(content).replace(/^\uFEFF/, '');
    const match = safeContent.match(TOOL_COMMAND_CODE_RE);

    if (!match) {
        return {
            codeString: safeContent,
            language: 'text',
        };
    }

    const rawLanguage = match[1].trim();
    const language = normalizeHighlightLanguage(rawLanguage) || 'text';

    return {
        codeString: safeContent.slice(match[0].length),
        language,
    };
};

const parseToolLogContent = (content) => {
    const safeContent = toSafeString(content).replace(/^\uFEFF/, '').trimEnd();
    const lines = safeContent.split(/\r?\n/);
    const lastLine = lines[lines.length - 1]?.trim();
    const isDone = lastLine === '[DONE]';
    const isFailed = lastLine === '[FAILED]';
    const status = isFailed ? 'failed' : isDone ? 'done' : 'running';
    const contentWithoutStatus = (isDone || isFailed)
        ? lines.slice(0, -1).join('\n').trimEnd()
        : safeContent;
    const titleMatch = contentWithoutStatus.match(TOOL_LOG_TITLE_RE);

    if (titleMatch) {
        return {
            title: titleMatch[1].trim() || 'Tool Log',
            body: contentWithoutStatus.slice(titleMatch[0].length).trimStart(),
            status,
        };
    }

    const [firstLine = '', ...restLines] = contentWithoutStatus.split(/\r?\n/);
    const title = firstLine.trim() || 'Tool Log';
    const body = restLines.join('\n').trimStart();

    return {
        title,
        body,
        status,
    };
};

const ToolCommandBlock = memo(({content = '', id}) => {
    const codeRef = useRef(null);

    const {
        codeString,
        language,
    } = useMemo(() => {
        return parseToolCommandContent(content);
    }, [content]);

    useLayoutEffect(() => {
        if (!codeString || !codeRef.current || language === 'text') {
            return undefined;
        }

        let isDisposed = false;

        const doHighlight = async () => {
            const hljsInst = await loadHljs();

            if (isDisposed || !codeRef.current) {
                return;
            }

            const failedLanguages = typeof window !== 'undefined'
                ? window.hljsFailedLanguages
                : null;

            if (
                language &&
                !hljsInst.getLanguage(language) &&
                !(failedLanguages && failedLanguages.has(language))
            ) {
                const langPath = `/node_modules/highlight.js/es/languages/${language}.js`;
                const loadModule = languageModules[langPath];

                if (loadModule) {
                    try {
                        const mod = await loadModule();

                        if (!isDisposed) {
                            hljsInst.registerLanguage(language, mod.default);
                        }
                    } catch (err) {
                        console.error(`Failed to load language module for: ${language}`, err);
                        failedLanguages?.add(language);
                    }
                } else {
                    failedLanguages?.add(language);
                }
            }

            if (isDisposed || !codeRef.current) {
                return;
            }

            if (codeRef.current.dataset.highlighted) {
                delete codeRef.current.dataset.highlighted;
            }

            try {
                hljsInst.highlightElement(codeRef.current);
            } catch (err) {
                console.error('Highlight failed:', err);
            }
        };

        doHighlight();

        return () => {
            isDisposed = true;
        };
    }, [codeString, language]);

    if (!codeString.trim()) {
        return null;
    }

    return (
        <div
            className="my-1.5 max-h-[260px] overflow-auto rounded-md border border-zinc-200/80 bg-zinc-50/60"
            data-card-block-id={id}
        >
            <pre
                className="m-0 min-w-max bg-transparent px-2.5 py-2 text-[11px] leading-5 text-zinc-700"
                style={{background: 'transparent'}}
            >
                <code
                    ref={codeRef}
                    className={`hljs block bg-transparent font-mono text-[11px] leading-5 text-inherit ${language ? `language-${language}` : ''}`}
                    style={{background: 'transparent', padding: 0}}
                >
                    {codeString}
                </code>
            </pre>
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

ToolCommandBlock.displayName = 'ToolCommandBlock';

const ToolLogBlock = memo(({content = '', id}) => {
    const {
        title,
        body,
        status,
    } = useMemo(() => {
        return parseToolLogContent(content);
    }, [content]);

    const hasBody = body.trim().length > 0;
    const isDone = status === 'done';
    const isFailed = status === 'failed';
    const isRunning = status === 'running';

    const tone = isFailed
        ? {
            card: 'border-red-200/80 bg-red-50/60',
            title: 'text-red-700',
            body: 'border-red-100 text-red-700/85',
            icon: 'border-red-100 bg-red-50 text-red-600',
        }
        : isDone
            ? {
                card: 'border-emerald-200/80 bg-emerald-50/60',
                title: 'text-emerald-700',
                body: 'border-emerald-100 text-emerald-700/85',
                icon: 'border-emerald-100 bg-emerald-50 text-emerald-600',
            }
            : {
                card: 'border-amber-200/80 bg-amber-50/70',
                title: 'text-amber-800',
                body: 'border-amber-100 text-amber-800/80',
                icon: 'border-amber-100 bg-amber-50 text-amber-600',
            };

    return (
        <div
            className={`relative my-1.5 rounded-md border px-2.5 py-2 pr-8 transition-colors duration-300 ${tone.card}`}
            data-card-block-id={id}
            style={isRunning ? {animation: 'tool-log-running-breathe 1.8s ease-in-out infinite'} : undefined}
        >
            {isRunning && (
                <style>{`
                    @keyframes tool-log-running-breathe {
                        0%, 100% {
                            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.12);
                            filter: saturate(1);
                        }
                        50% {
                            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.18);
                            filter: saturate(1.18) brightness(1.015);
                        }
                    }
                `}</style>
            )}

            <div className={`min-w-0 truncate text-[11px] font-medium leading-4 ${tone.title}`}>
                {title}
            </div>

            {hasBody && (
                <pre className={`mt-1.5 max-h-[220px] overflow-auto whitespace-pre-wrap break-words border-t pt-1.5 font-mono text-[11px] leading-5 ${tone.body}`}>
                    {body}
                </pre>
            )}

            {isRunning && (
                <div
                    className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-amber-600"
                    aria-label="Tool log is running"
                >
                    <Loader2 className="h-3.5 w-3.5 animate-spin"/>
                </div>
            )}

            {(isDone || isFailed) && (
                <div
                    className={`absolute bottom-1.5 right-2 flex h-4 w-4 items-center justify-center rounded-full border ${tone.icon}`}
                    aria-label={isDone ? 'Tool log finished' : 'Tool log failed'}
                >
                    {isDone ? (
                        <Check className="h-2.5 w-2.5 stroke-[3]"/>
                    ) : (
                        <X className="h-2.5 w-2.5 stroke-[3]"/>
                    )}
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

ToolLogBlock.displayName = 'ToolLogBlock';

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

        case 'toolCommand':
            return (
                <ToolCommandBlock
                    id={id}
                    content={content}
                />
            );

        case 'toolLog':
            return (
                <ToolLogBlock
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
                    title="Tool Calling"
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