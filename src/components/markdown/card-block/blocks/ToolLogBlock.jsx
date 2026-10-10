import { memo, useEffect, useMemo, useState } from 'react';
import { Check, Loader2, X, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { toSafeString } from '../utils.js';
import OutputToolbar from './OutputToolbar.jsx';
import useFollowOutputScroll from './useFollowOutputScroll.js';
import ImageGallery from '@/features/images/ImageGallery.jsx';

const TOOL_LOG_TITLE_RE = /^\s*\[TITLE:([^\]]+)]\s*$/i;
const TOOL_LOG_PROTOCOL_BOUNDARY_RE =
    /]\s*(?=\[(?:TITLE:|START(?::|])|DONE(?::|])|FAILED(?::|])|TERMINAL]|\/TERMINAL]))/gi;
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
    let auditStatus = '';
    let auditDetails = null;
    let images = [];

    const contentLines = [];

    for (const line of lines) {
        if (!isInsideTerminal && line.startsWith('[IMAGES:') && line.endsWith(']')) {
            try { images = JSON.parse(line.slice('[IMAGES:'.length, -1)); } catch { /* Partial metadata is not log text. */ }
            continue;
        }
        if (!isInsideTerminal && line.startsWith('[TOOL_AUDIT_DETAIL:') && line.endsWith(']')) {
            try {
                const detail = JSON.parse(line.slice('[TOOL_AUDIT_DETAIL:'.length, -1));
                if (detail && typeof detail === 'object' && !Array.isArray(detail)) auditDetails = detail;
            } catch {
                /* A partial/malformed detail must not interrupt tool output. */
            }
            continue;
        }
        const auditMatch =
            !isInsideTerminal && line.match(/^\s*\[TOOL_AUDIT:(reviewing|passed|denied|failed|cancelled)]\s*$/);
        if (auditMatch) {
            auditStatus = auditMatch[1];
            continue;
        }
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

        const titleMatch = !isInsideTerminal ? line.match(TOOL_LOG_TITLE_RE) : null;

        if (titleMatch) {
            // Keep the first title. A duplicate title can exist in legacy messages
            // created by a resumed wait tool, but it is still protocol metadata.
            if (!titleText) {
                titleText = titleMatch[1].trim();
            }
            continue;
        }

        const metaMatch = !isInsideTerminal ? line.match(TOOL_LOG_META_LINE_WITH_VALUE_RE) : null;

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
            auditStatus,
            auditDetails,
            images,
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
        auditStatus,
        auditDetails,
        images,
        bodySegments: parseToolLogBodySegments(body),
        status,
        startTimeMs,
        doneTimeMs,
        failedTimeMs,
    };
};

const ToolLogDuration = memo(({ className = '', endTimeMs, isRunning, startTimeMs }) => {
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

    const durationMs =
        startTimeMs !== null && (endTimeMs !== null || isRunning) ? (endTimeMs ?? nowMs) - startTimeMs : null;

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

const ToolLogStatus = memo(({ endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone }) => {
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
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </span>
            )}

            {(isDone || isFailed) && (
                <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${tone.icon}`}
                    aria-label={isDone ? 'Tool log finished' : 'Tool log failed'}
                >
                    {isDone ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : <X className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
            )}
        </div>
    );
});

ToolLogStatus.displayName = 'ToolLogStatus';

const ToolLogTerminalBlock = memo(({ content }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(15,23,42,0.16)]">
            <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-neutral-900/95 px-2">
                <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden="true" />
                <span className="h-2 w-2 rounded-full bg-amber-300/90" aria-hidden="true" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden="true" />
                <span className="ml-1 truncate font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                    terminal
                </span>
            </div>

            <pre className="pretty-scrollbar m-0 overflow-x-auto whitespace-pre-wrap break-words px-3 py-2 font-mono text-[11px] leading-5 text-neutral-100 selection:bg-neutral-100 selection:text-neutral-950">
                {content}
            </pre>
        </div>
    );
});

ToolLogTerminalBlock.displayName = 'ToolLogTerminalBlock';

const ToolLogBodySegment = memo(({ segment, tone }) => {
    if (segment.type === 'terminal') {
        return <ToolLogTerminalBlock content={segment.content} />;
    }

    return (
        <pre className={`m-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 ${tone.body}`}>
            {segment.content}
        </pre>
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

const ToolLogBlock = memo(
    ({ content = '', id }) => {
        const { t } = useTranslation();
        const [showAudit, setShowAudit] = useState(false);
        const { title, auditStatus, auditDetails, images, bodySegments, status, startTimeMs, doneTimeMs, failedTimeMs } =
            useMemo(() => {
                return parseToolLogContent(content);
            }, [content]);

        const hasBody = bodySegments.length > 0;
        const hasCodeProcess = useMemo(() => {
            return bodySegments.some((segment) => segment.type === 'terminal');
        }, [bodySegments]);
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

        const endTimeMs = isDone ? doneTimeMs : isFailed ? failedTimeMs : null;

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

                    {auditStatus && (
                        <button
                            type="button"
                            aria-pressed={showAudit}
                            aria-label={t(showAudit ? 'tool_review_show_output' : 'tool_review_show_details')}
                            onClick={() => setShowAudit((value) => !value)}
                            className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium focus-visible:outline focus-visible:outline-2 ${showAudit ? 'ring-1 ring-current' : ''} ${auditStatus === 'passed' ? 'bg-emerald-100 text-emerald-700' : auditStatus === 'reviewing' ? 'bg-blue-100 text-blue-700' : auditStatus === 'denied' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}
                        >
                            {auditStatus === 'passed' ? (
                                <ShieldCheck className="size-3" />
                            ) : auditStatus === 'reviewing' ? (
                                <Shield className="size-3 animate-pulse" />
                            ) : (
                                <ShieldAlert className="size-3" />
                            )}
                            {t(`tool_review_${auditStatus}`)}
                        </button>
                    )}

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

                {showAudit && auditStatus ? (
                    <div className={`mt-1.5 -mx-2.5 border-t px-2.5 py-2 text-xs ${tone.bodyWrap}`}>
                        <div className="flex items-center gap-2 font-medium" role="status">
                            {auditStatus === 'reviewing' && (
                                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                            )}
                            {t(`tool_review_${auditStatus}`)}
                        </div>
                        {typeof auditDetails?.reason === 'string' && (
                            <p className="mt-1 whitespace-pre-wrap break-words">{auditDetails.reason}</p>
                        )}
                        {typeof auditDetails?.modelId === 'string' && (
                            <div className="mt-2 text-[10px] opacity-70">
                                {t('tool_review_model')}: {auditDetails.modelId}
                            </div>
                        )}
                    </div>
                ) : (
                    hasBody && (
                        <div className={`mt-1.5 -mx-2.5 overflow-hidden border-t ${tone.bodyWrap}`}>
                            {hasCodeProcess && (
                                <OutputToolbar
                                    copyContent={copyContent}
                                    isFollowing={isFollowing}
                                    onScrollToBottom={resumeFollowing}
                                    onToggleFollowing={toggleFollowing}
                                />
                            )}

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
                    )
                )}
                {isDone && !showAudit && <ImageGallery images={images} />}
            </div>
        );
    },
    (prev, next) => {
        return prev.id === next.id && prev.content === next.content;
    },
);

ToolLogBlock.displayName = 'ToolLogBlock';

export default ToolLogBlock;
