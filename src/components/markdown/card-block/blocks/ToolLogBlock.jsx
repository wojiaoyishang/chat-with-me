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

const TOOL_LOG_TITLE_RE = /^\s*\[TITLE:([^\]]+)]\s*(?:\r?\n|$)/i;
const TOOL_LOG_META_LINE_RE = /^\s*\[(START|DONE|FAILED)(?::([^\]]+))?]\s*$/i;

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

const parseToolLogContent = (content) => {
    const safeContent = toSafeString(content).replace(/^\uFEFF/, '').trimEnd();
    const lines = safeContent.split(/\r?\n/);

    let status = 'running';
    let startTimeText = '';
    let doneTimeText = '';
    let failedTimeText = '';

    const contentLines = [];

    for (const line of lines) {
        const metaMatch = line.match(TOOL_LOG_META_LINE_RE);

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
    const titleMatch = contentWithoutStatus.match(TOOL_LOG_TITLE_RE);

    const startTimeMs = parseTimeToMs(startTimeText);
    const doneTimeMs = parseTimeToMs(doneTimeText);
    const failedTimeMs = parseTimeToMs(failedTimeText);

    if (titleMatch) {
        return {
            title: titleMatch[1].trim() || 'Tool Log',
            body: contentWithoutStatus.slice(titleMatch[0].length).trimStart(),
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
        body,
        status,
        startTimeMs,
        doneTimeMs,
        failedTimeMs,
    };
};

const ToolLogBlock = memo(({content = '', id}) => {
    const {
        title,
        body,
        status,
        startTimeMs,
        doneTimeMs,
        failedTimeMs,
    } = useMemo(() => {
        return parseToolLogContent(content);
    }, [content]);

    const hasBody = body.trim().length > 0;
    const isDone = status === 'done';
    const isFailed = status === 'failed';
    const isRunning = status === 'running';

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

    const endTimeMs = isDone
        ? doneTimeMs
        : isFailed
            ? failedTimeMs
            : null;

    const durationMs = startTimeMs !== null && (endTimeMs !== null || isRunning)
        ? (endTimeMs ?? nowMs) - startTimeMs
        : null;

    const durationText = formatDuration(durationMs);
    const shouldShowDuration = durationText.length > 0;

    const tone = isFailed
        ? {
            card: 'border-red-200/80 bg-red-50/60',
            title: 'text-red-700',
            body: 'border-red-100 text-red-700/85',
            icon: 'border-red-100 bg-red-50 text-red-600',
            duration: 'text-red-600/80',
        }
        : isDone
            ? {
                card: 'border-emerald-200/80 bg-emerald-50/60',
                title: 'text-emerald-700',
                body: 'border-emerald-100 text-emerald-700/85',
                icon: 'border-emerald-100 bg-emerald-50 text-emerald-600',
                duration: 'text-emerald-600/80',
            }
            : {
                card: 'border-amber-200/60 bg-amber-50/60 shadow-[0_8px_24px_rgba(245,158,11,0.08)]',
                title: 'text-amber-800',
                body: 'border-amber-100/70 text-amber-800/80',
                icon: 'border-amber-100 bg-amber-50 text-amber-600',
                duration: 'text-amber-700/80',
            };

    return (
        <div
            className={`relative my-1.5 rounded-md border px-2.5 py-2 ${shouldShowDuration ? 'pr-20' : 'pr-8'} transition-colors duration-300 ${isRunning ? 'card-tool-log-running-breathe' : ''} ${tone.card}`}
            data-card-block-id={id}
        >
            <div className={`min-w-0 truncate text-[11px] font-medium leading-4 ${tone.title}`}>
                {title}
            </div>

            {hasBody && (
                <pre className={`mt-1.5 max-h-[220px] overflow-auto whitespace-pre-wrap break-words border-t pt-1.5 font-mono text-[11px] leading-5 ${tone.body}`}>
                    {body}
                </pre>
            )}

            {shouldShowDuration && (
                <div
                    className={`absolute right-7 flex h-4 items-center whitespace-nowrap font-mono text-[10px] leading-4 ${isRunning ? 'top-1/2 -translate-y-1/2' : 'bottom-1.5'} ${tone.duration}`}
                    aria-label={`Tool log duration ${durationText}`}
                    title={`Duration: ${durationText}`}
                >
                    {durationText}
                </div>
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

export default ToolLogBlock;