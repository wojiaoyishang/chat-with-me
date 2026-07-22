import {
    memo,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    Check,
    Loader2,
    X,
} from 'lucide-react';

import { toSafeString } from '../utils.js';
import OutputToolbar from './OutputToolbar.jsx';
import useFollowOutputScroll from './useFollowOutputScroll.js';

const TOOL_LOG_TITLE_RE = /^\s*\[TITLE:([^\]]+)]\s*$/i;
const TOOL_LOG_PROTOCOL_BOUNDARY_RE = /]\s*(?=\[(?:TITLE:|START(?::|])|DONE(?::|])|FAILED(?::|])|TERMINAL]|\/TERMINAL]))/gi;
const TOOL_LOG_META_LINE_WITH_VALUE_RE = /^\s*\[(START|DONE|FAILED)(?::([^\]]+))?]\s*$/i;
const TOOL_LOG_TERMINAL_OPEN_LINE_RE = /^\s*\[TERMINAL]\s*$/i;
const TOOL_LOG_TERMINAL_CLOSE_LINE_RE = /^\s*\[\/TERMINAL]\s*$/i;

const parseTimeToMs = (value) => {
    const safeValue = toSafeString(value).trim();

    if (!safeValue) {
        return null;
    }

    const numericValue = Number(safeValue);

    if (Number.isFinite(numericValue)) {
        // 10 位通常是 Unix 秒；13 位通常是 Unix 毫秒。
        if (safeValue.length === 10) {
            return numericValue * 1000;
        }

        if (safeValue.length === 13) {
            return numericValue;
        }
    }

    const parsed = Date.parse(safeValue);

    if (Number.isNaN(parsed)) {
        return null;
    }

    return parsed;
};

const formatDuration = (durationMs) => {
    if (!Number.isFinite(durationMs) || durationMs < 0) {
        return '';
    }

    const totalSeconds = Math.round(durationMs / 1000);

    if (totalSeconds < 60) {
        return `${totalSeconds}s`;
    }

    if (totalSeconds < 3600) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
};

const parseToolLogBodySegments = (body) => {
    const lines = toSafeString(body).split(/\r?\n/);
    const segments = [];

    let currentType = 'text';
    let buffer = [];

    const flush = () => {
        const segmentContent = buffer.join('\n').trimEnd();

        if (segmentContent.trim().length > 0) {
            segments.push({
                type: currentType,
                content: segmentContent,
            });
        }

        buffer = [];
    };

    for (const line of lines) {
        if (currentType === 'text' && TOOL_LOG_TERMINAL_OPEN_LINE_RE.test(line)) {
            flush();
            currentType = 'terminal';
            continue;
        }

        if (currentType === 'terminal' && TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test(line)) {
            flush();
            currentType = 'text';
            continue;
        }

        buffer.push(line);
    }

    flush();

    return segments;
};

const parseToolLogContent = (content) => {
    // Redis replacement deltas can be coalesced at an arbitrary boundary. Historical
    // messages may therefore contain adjacent protocol markers such as
    // [DONE:...][TITLE:...]. Normalize only recognized tool-log markers before the
    // line parser so protocol text never leaks into the visible body.
    const safeContent = toSafeString(content)
        .replace(/^\uFEFF/, '')
        .replace(TOOL_LOG_PROTOCOL_BOUNDARY_RE, ']\n')
        .trimEnd();
    const lines = safeContent.split(/\r?\n/);

    let status = 'running';
    let titleText = '';
    let startTimeText = '';
    let doneTimeText = '';
    let failedTimeText = '';
    let isInsideTerminal = false;

    const contentLines = [];

    for (const line of lines) {
        if (TOOL_LOG_TERMINAL_OPEN_LINE_RE.test(line)) {
            isInsideTerminal = true;
            contentLines.push(line);
            continue;
        }

        if (TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test(line)) {
            isInsideTerminal = false;
            contentLines.push(line);
            continue;
        }

        const titleMatch = !isInsideTerminal
            ? line.match(TOOL_LOG_TITLE_RE)
            : null;

        if (titleMatch) {
            // Keep the first title. A duplicate title can exist in legacy messages
            // created by a resumed wait tool, but it is still protocol metadata.
            if (!titleText) {
                titleText = titleMatch[1].trim();
            }
            continue;
        }

        const metaMatch = !isInsideTerminal
            ? line.match(TOOL_LOG_META_LINE_WITH_VALUE_RE)
            : null;

        if (metaMatch) {
            const metaName = metaMatch[1].toUpperCase();
            const metaValue = metaMatch[2]?.trim() || '';

            if (metaName === 'START') {
                startTimeText = metaValue;
            }

            if (metaName === 'DONE') {
                status = 'done';
                doneTimeText = metaValue;
            }

            if (metaName === 'FAILED') {
                status = 'failed';
                failedTimeText = metaValue;
            }

            continue;
        }

        contentLines.push(line);
    }

    const contentWithoutStatus = contentLines.join('\n').trimEnd();

    const startTimeMs = parseTimeToMs(startTimeText);
    const doneTimeMs = parseTimeToMs(doneTimeText);
    const failedTimeMs = parseTimeToMs(failedTimeText);

    if (titleText) {
        return {
            title: titleText || 'Tool Log',
            bodySegments: parseToolLogBodySegments(contentWithoutStatus.trimStart()),
            status,
            startTimeMs,
            doneTimeMs,
            failedTimeMs,
        };
    }

    const [firstLine = '', ...restLines] = contentWithoutStatus.split(/\r?\n/);
    const title = firstLine.trim() || 'Tool Log';
    const body = restLines.join('\n').trimStart();

    return {
        title,
        bodySegments: parseToolLogBodySegments(body),
        status,
        startTimeMs,
        doneTimeMs,
        failedTimeMs,
    };
};

const ToolLogDuration = memo(({
                                  className = '',
                                  endTimeMs,
                                  isRunning,
                                  startTimeMs,
                              }) => {
    const [nowMs, setNowMs] = useState(() => Date.now());

    useEffect(() => {
        if (!isRunning || startTimeMs === null) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setNowMs(Date.now());
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [isRunning, startTimeMs]);

    const durationMs = startTimeMs !== null && (endTimeMs !== null || isRunning)
        ? (endTimeMs ?? nowMs) - startTimeMs
        : null;

    const durationText = formatDuration(durationMs);

    if (!durationText) {
        return null;
    }

    return (
        <span
            className={className}
            aria-label={`Tool log duration ${durationText}`}
            title={`Duration: ${durationText}`}
        >
            {durationText}
        </span>
    );
});

ToolLogDuration.displayName = 'ToolLogDuration';

const ToolLogStatus = memo(({
                                endTimeMs,
                                isDone,
                                isFailed,
                                isRunning,
                                shouldShowDuration,
                                startTimeMs,
                                tone,
                            }) => {
    return (
        <div className="ml-2 flex shrink-0 items-center gap-1">
            {shouldShowDuration && (
                <ToolLogDuration
                    className={`flex h-4 items-center whitespace-nowrap rounded bg-white/50 px-1 font-mono text-[10px] leading-4 backdrop-blur-sm ${tone.duration}`}
                    endTimeMs={endTimeMs}
                    isRunning={isRunning}
                    startTimeMs={startTimeMs}
                />
            )}

            {isRunning && (
                <span
                    className="flex h-4 w-4 items-center justify-center text-amber-600"
                    aria-label="Tool log is running"
                >
                    <Loader2 className="h-3.5 w-3.5 animate-spin"/>
                </span>
            )}

            {(isDone || isFailed) && (
                <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${tone.icon}`}
                    aria-label={isDone ? 'Tool log finished' : 'Tool log failed'}
                >
                    {isDone ? (
                        <Check className="h-2.5 w-2.5 stroke-[3]"/>
                    ) : (
                        <X className="h-2.5 w-2.5 stroke-[3]"/>
                    )}
                </span>
            )}
        </div>
    );
});

ToolLogStatus.displayName = 'ToolLogStatus';

const ToolLogTerminalBlock = memo(({content}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(15,23,42,0.16)]">
            <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-neutral-900/95 px-2">
                <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden="true"/>
                <span className="h-2 w-2 rounded-full bg-amber-300/90" aria-hidden="true"/>
                <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden="true"/>
                <span className="ml-1 truncate font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                    terminal
                </span>
            </div>

            <pre className="pretty-scrollbar m-0 overflow-x-auto whitespace-pre-wrap break-words px-3 py-2 font-mono text-[11px] leading-5 text-neutral-100 selection:bg-neutral-100 selection:text-neutral-950">{content}</pre>
        </div>
    );
});

ToolLogTerminalBlock.displayName = 'ToolLogTerminalBlock';

const ToolLogBodySegment = memo(({segment, tone}) => {
    if (segment.type === 'terminal') {
        return <ToolLogTerminalBlock content={segment.content}/>;
    }

    return (
        <pre className={`m-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 ${tone.body}`}>{segment.content}</pre>
    );
});

ToolLogBodySegment.displayName = 'ToolLogBodySegment';

const getToolLogTone = (status) => {
    if (status === 'failed') {
        return {
            card: 'border-red-200/80 bg-red-50/60',
            title: 'text-red-700',
            body: 'text-red-700/85',
            bodyWrap: 'border-red-100',
            icon: 'border-red-100 bg-red-50 text-red-600',
            duration: 'text-red-600/80',
        };
    }

    if (status === 'done') {
        return {
            card: 'border-emerald-200/80 bg-emerald-50/60',
            title: 'text-emerald-700',
            body: 'text-emerald-700/85',
            bodyWrap: 'border-emerald-100',
            icon: 'border-emerald-100 bg-emerald-50 text-emerald-600',
            duration: 'text-emerald-600/80',
        };
    }

    return {
        card: 'border-amber-200/60 bg-amber-50/60 shadow-[0_8px_24px_rgba(245,158,11,0.08)]',
        title: 'text-amber-800',
        body: 'text-amber-800/80',
        bodyWrap: 'border-amber-100/70',
        icon: 'border-amber-100 bg-amber-50 text-amber-600',
        duration: 'text-amber-700/80',
    };
};

const ToolLogBlock = memo(({content = '', id}) => {
    const {
        title,
        bodySegments,
        status,
        startTimeMs,
        doneTimeMs,
        failedTimeMs,
    } = useMemo(() => {
        return parseToolLogContent(content);
    }, [content]);

    const hasBody = bodySegments.length > 0;
    const copyContent = useMemo(() => {
        const bodyText = bodySegments
            .map((segment) => segment.content)
            .filter(Boolean)
            .join('\n\n');

        return bodyText ? `${title}\n${bodyText}` : title;
    }, [bodySegments, title]);
    const isDone = status === 'done';
    const isFailed = status === 'failed';
    const isRunning = status === 'running';

    const {
        handleScroll,
        handleTouchMove,
        handleWheel,
        isFollowing,
        resumeFollowing,
        scrollContainerRef,
        toggleFollowing,
    } = useFollowOutputScroll({
        contentKey: content,
    });

    const endTimeMs = isDone
        ? doneTimeMs
        : isFailed
            ? failedTimeMs
            : null;

    const shouldShowDuration = startTimeMs !== null && (endTimeMs !== null || isRunning);

    const tone = useMemo(() => {
        return getToolLogTone(status);
    }, [status]);

    return (
        <div
            className={`my-1.5 rounded-md border px-2.5 py-2 transition-colors duration-300 ${isRunning ? 'card-tool-log-running-breathe' : ''} ${tone.card}`}
            data-card-block-id={id}
        >
            <div className="flex min-w-0 items-center gap-2">
                <div className={`min-w-0 flex-1 truncate text-[11px] font-medium leading-4 ${tone.title}`}>
                    {title}
                </div>

                <ToolLogStatus
                    endTimeMs={endTimeMs}
                    isDone={isDone}
                    isFailed={isFailed}
                    isRunning={isRunning}
                    shouldShowDuration={shouldShowDuration}
                    startTimeMs={startTimeMs}
                    tone={tone}
                />
            </div>

            {hasBody && (
                <div className={`mt-1.5 -mx-2.5 overflow-hidden border-t ${tone.bodyWrap}`}>
                    <OutputToolbar
                        copyContent={copyContent}
                        isFollowing={isFollowing}
                        onScrollToBottom={resumeFollowing}
                        onToggleFollowing={toggleFollowing}
                    />

                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        onTouchMove={handleTouchMove}
                        onWheel={handleWheel}
                        className="pretty-scrollbar max-h-[300px] overflow-auto px-2.5 py-1.5 [scrollbar-gutter:stable]"
                    >
                        <div className="space-y-1.5">
                            {bodySegments.map((segment, index) => {
                                return (
                                    <ToolLogBodySegment
                                        key={`${segment.type}-${index}`}
                                        segment={segment}
                                        tone={tone}
                                    />
                                );
                            })}
                        </div>
                    </div>
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

export default ToolLogBlock;