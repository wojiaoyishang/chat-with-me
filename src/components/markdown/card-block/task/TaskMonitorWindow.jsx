import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {createPortal} from 'react-dom';
import {
    ArrowDownToLine,
    CheckCircle2,
    CircleAlert,
    GripHorizontal,
    ListChecks,
    RotateCcw,
    Square,
    X,
} from 'lucide-react';

import {emitEvent} from '@/context/useEventStore.jsx';

const WINDOW_MARGIN = 12;
const DEFAULT_BOTTOM_GAP = 92;
const DEFAULT_WINDOW_SIZE = {width: 440, height: 560};
const MIN_WINDOW_SIZE = {width: 320, height: 256};
const WINDOW_SIZE_STORAGE_KEY = 'task-monitor-window-size-v1';
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

const readStoredWindowSize = () => {
    if (typeof window === 'undefined') return DEFAULT_WINDOW_SIZE;
    try {
        const parsed = JSON.parse(window.localStorage.getItem(WINDOW_SIZE_STORAGE_KEY) || 'null');
        const width = Number(parsed?.width);
        const height = Number(parsed?.height);
        if (Number.isFinite(width) && Number.isFinite(height)) {
            return {width, height};
        }
    } catch {
        // Ignore malformed user preferences and fall back to defaults.
    }
    return DEFAULT_WINDOW_SIZE;
};

const persistWindowSize = (size) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(WINDOW_SIZE_STORAGE_KEY, JSON.stringify(size));
    } catch {
        // Storage may be unavailable in private browsing; the window remains usable.
    }
};

const RESIZE_HANDLES = [
    ['n', 'left-3 right-3 top-0 h-2 cursor-n-resize'],
    ['s', 'bottom-0 left-3 right-3 h-2 cursor-s-resize'],
    ['e', 'bottom-3 right-0 top-3 w-2 cursor-e-resize'],
    ['w', 'bottom-3 left-0 top-3 w-2 cursor-w-resize'],
    ['nw', 'left-0 top-0 h-4 w-4 cursor-nw-resize'],
    ['ne', 'right-0 top-0 h-4 w-4 cursor-ne-resize'],
    ['sw', 'bottom-0 left-0 h-4 w-4 cursor-sw-resize'],
    ['se', 'bottom-0 right-0 h-4 w-4 cursor-se-resize'],
];

const TaskMonitorWindow = memo(({
    actions = [],
    cleanContent = '',
    elapsedText = '',
    error = '',
    isFailed = false,
    isFinished = false,
    markId = null,
    onClose,
    open = false,
    renderMarkdown,
    status = 'running',
    title = '',
    t,
}) => {
    const windowRef = useRef(null);
    const scrollRef = useRef(null);
    const dragStateRef = useRef(null);
    const resizeStateRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [size, setSize] = useState(readStoredWindowSize);
    const sizeRef = useRef(size);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [autoFollowBottom, setAutoFollowBottom] = useState(true);
    const [isMobile, setIsMobile] = useState(() => (
        typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false
    ));

    const getClampedSize = useCallback((nextSize) => {
        if (typeof window === 'undefined') return nextSize;
        return {
            width: clamp(nextSize.width, MIN_WINDOW_SIZE.width, window.innerWidth),
            height: clamp(nextSize.height, MIN_WINDOW_SIZE.height, window.innerHeight),
        };
    }, []);

    const fitPositionToViewport = useCallback((nextPosition, nextSize = size) => {
        if (typeof window === 'undefined') return nextPosition;
        const fittedSize = getClampedSize(nextSize);
        return {
            x: clamp(nextPosition.x, 0, window.innerWidth - fittedSize.width),
            y: clamp(nextPosition.y, 0, window.innerHeight - fittedSize.height),
        };
    }, [getClampedSize, size]);

    const scrollToBottom = useCallback(() => {
        const element = scrollRef.current;
        if (element) element.scrollTop = element.scrollHeight;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
        const syncMobileMode = () => setIsMobile(mediaQuery.matches);
        syncMobileMode();
        mediaQuery.addEventListener?.('change', syncMobileMode);
        return () => mediaQuery.removeEventListener?.('change', syncMobileMode);
    }, []);

    useLayoutEffect(() => {
        if (!open || typeof window === 'undefined') return undefined;
        if (isMobile) {
            setPosition(null);
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            const fittedSize = getClampedSize(size);
            if (fittedSize.width !== size.width || fittedSize.height !== size.height) {
                sizeRef.current = fittedSize;
                setSize(fittedSize);
            }
            setPosition(current => fitPositionToViewport(current || {
                x: Math.max(WINDOW_MARGIN, window.innerWidth - fittedSize.width - WINDOW_MARGIN),
                y: Math.max(WINDOW_MARGIN, window.innerHeight - fittedSize.height - DEFAULT_BOTTOM_GAP),
            }, fittedSize));
        });
        return () => window.cancelAnimationFrame(frame);
    }, [fitPositionToViewport, getClampedSize, isMobile, open, size]);

    useEffect(() => {
        if (!open || typeof window === 'undefined') return undefined;
        const handleViewportResize = () => {
            if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) return;
            setSize(current => {
                const fitted = getClampedSize(current);
                sizeRef.current = fitted;
                setPosition(positionValue => positionValue
                    ? fitPositionToViewport(positionValue, fitted)
                    : positionValue);
                return fitted;
            });
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose?.();
        };
        window.addEventListener('resize', handleViewportResize);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('resize', handleViewportResize);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [fitPositionToViewport, getClampedSize, onClose, open]);

    useEffect(() => {
        if (!open || !autoFollowBottom) return undefined;
        const frame = window.requestAnimationFrame(scrollToBottom);
        return () => window.cancelAnimationFrame(frame);
    }, [autoFollowBottom, cleanContent, error, open, scrollToBottom, status]);

    useEffect(() => {
        if (!open) {
            setIsDragging(false);
            setIsResizing(false);
            dragStateRef.current = null;
            resizeStateRef.current = null;
        }
    }, [open]);

    const handlePointerDown = (event) => {
        if (isMobile || event.button !== 0 || event.target.closest('button')) return;
        const element = windowRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: rect.left,
            originY: rect.top,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setIsDragging(true);
        event.preventDefault();
    };

    const handlePointerMove = (event) => {
        const dragState = dragStateRef.current;
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        setPosition(fitPositionToViewport({
            x: dragState.originX + event.clientX - dragState.startX,
            y: dragState.originY + event.clientY - dragState.startY,
        }));
    };

    const handlePointerUp = (event) => {
        const dragState = dragStateRef.current;
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        dragStateRef.current = null;
        setIsDragging(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleResizePointerDown = (event, direction) => {
        if (isMobile || event.button !== 0) return;
        const element = windowRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        resizeStateRef.current = {
            direction,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setIsResizing(true);
        event.preventDefault();
        event.stopPropagation();
    };

    const handleResizePointerMove = (event) => {
        const resizeState = resizeStateRef.current;
        if (!resizeState || resizeState.pointerId !== event.pointerId || typeof window === 'undefined') return;

        const deltaX = event.clientX - resizeState.startX;
        const deltaY = event.clientY - resizeState.startY;
        let nextLeft = resizeState.left;
        let nextTop = resizeState.top;
        let nextWidth = resizeState.width;
        let nextHeight = resizeState.height;

        if (resizeState.direction.includes('e')) {
            nextWidth = clamp(
                resizeState.width + deltaX,
                MIN_WINDOW_SIZE.width,
                window.innerWidth - resizeState.left,
            );
        }
        if (resizeState.direction.includes('s')) {
            nextHeight = clamp(
                resizeState.height + deltaY,
                MIN_WINDOW_SIZE.height,
                window.innerHeight - resizeState.top,
            );
        }
        if (resizeState.direction.includes('w')) {
            nextLeft = clamp(
                resizeState.left + deltaX,
                0,
                resizeState.right - MIN_WINDOW_SIZE.width,
            );
            nextWidth = resizeState.right - nextLeft;
        }
        if (resizeState.direction.includes('n')) {
            nextTop = clamp(
                resizeState.top + deltaY,
                0,
                resizeState.bottom - MIN_WINDOW_SIZE.height,
            );
            nextHeight = resizeState.bottom - nextTop;
        }

        const nextSize = {width: nextWidth, height: nextHeight};
        sizeRef.current = nextSize;
        setSize(nextSize);
        setPosition({x: nextLeft, y: nextTop});
    };

    const handleResizePointerUp = (event) => {
        const resizeState = resizeStateRef.current;
        if (!resizeState || resizeState.pointerId !== event.pointerId) return;
        resizeStateRef.current = null;
        setIsResizing(false);
        persistWindowSize(sizeRef.current);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleAction = (event, action) => {
        event.preventDefault();
        event.stopPropagation();
        const commandPayloads = {
            resumeTask: {
                command: 'Task-Resume',
                taskRunId: action.taskRunId,
                requestId: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
            },
            cancelTask: {
                command: 'Task-Cancel',
                taskRunId: action.taskRunId,
                requestId: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
            },
        };
        const payload = commandPayloads[action.command];
        if (!payload || !markId) return;
        emitEvent({type: 'message', target: 'ChatPage', payload, markId});
    };

    const resetPositionAndSize = () => {
        if (isMobile || typeof window === 'undefined') return;
        const fittedSize = getClampedSize(DEFAULT_WINDOW_SIZE);
        sizeRef.current = fittedSize;
        setSize(fittedSize);
        persistWindowSize(fittedSize);
        setPosition({
            x: Math.max(WINDOW_MARGIN, window.innerWidth - fittedSize.width - WINDOW_MARGIN),
            y: Math.max(WINDOW_MARGIN, window.innerHeight - fittedSize.height - DEFAULT_BOTTOM_GAP),
        });
    };

    const toggleAutoFollowBottom = () => {
        setAutoFollowBottom(current => {
            const next = !current;
            if (next) window.requestAnimationFrame(scrollToBottom);
            return next;
        });
    };

    if (!open || typeof document === 'undefined') return null;

    const statusLabel = isFailed
        ? t('task_monitor_failed', '任务失败')
        : isFinished
            ? t('task_monitor_finished', '任务已结束')
            : status === 'recovering' || status === 'retrying'
                ? t('task_monitor_recovering', '正在恢复')
                : t('task_monitor_running', '正在执行');

    const statusClass = isFailed
        ? 'bg-red-50 text-red-700 ring-red-200'
        : isFinished
            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
            : 'bg-blue-50 text-blue-700 ring-blue-200';

    const StatusIcon = isFailed ? CircleAlert : isFinished ? CheckCircle2 : Square;
    const desktopStyle = position
        ? {left: position.x, top: position.y, width: size.width, height: size.height}
        : {right: WINDOW_MARGIN, bottom: DEFAULT_BOTTOM_GAP, width: size.width, height: size.height};
    const mobileStyle = {inset: 0, width: '100vw', height: '100dvh'};

    return createPortal(
        <section
            ref={windowRef}
            role="dialog"
            aria-label={t('task_monitor_title', '任务过程监视器')}
            className={`fixed z-[119000] flex flex-col overflow-hidden border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl transition-shadow ${isMobile ? 'rounded-none border-0' : 'rounded-2xl'} ${isDragging || isResizing ? 'shadow-blue-200/70' : ''}`}
            style={isMobile ? mobileStyle : desktopStyle}
        >
            <header
                className={`flex shrink-0 select-none items-center gap-2 border-b border-gray-100 bg-gray-50/90 px-3 py-2.5 ${isMobile ? 'pt-[max(0.625rem,env(safe-area-inset-top))]' : `touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}`}
                onPointerDown={isMobile ? undefined : handlePointerDown}
                onPointerMove={isMobile ? undefined : handlePointerMove}
                onPointerUp={isMobile ? undefined : handlePointerUp}
                onPointerCancel={isMobile ? undefined : handlePointerUp}
            >
                {!isMobile ? <GripHorizontal className="h-4 w-4 shrink-0 text-gray-400"/> : null}
                <ListChecks className="h-4 w-4 shrink-0 text-blue-600"/>
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900">{title}</div>
                    <div className="mt-0.5 flex min-w-0 items-center gap-2">
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusClass}`}>
                            <StatusIcon className={`h-2.5 w-2.5 ${!isFinished && !isFailed ? 'animate-pulse fill-current' : ''}`}/>
                            {statusLabel}
                        </span>
                        {elapsedText ? <span className="truncate text-[11px] text-gray-500">{elapsedText}</span> : null}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={toggleAutoFollowBottom}
                    aria-pressed={autoFollowBottom}
                    className={`rounded-lg p-1.5 transition-colors ${autoFollowBottom ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-white hover:text-gray-800'}`}
                    title={autoFollowBottom
                        ? t('task_monitor_auto_bottom_disable', '关闭自动置底')
                        : t('task_monitor_auto_bottom_enable', '开启自动置底')}
                    aria-label={autoFollowBottom
                        ? t('task_monitor_auto_bottom_disable', '关闭自动置底')
                        : t('task_monitor_auto_bottom_enable', '开启自动置底')}
                >
                    <ArrowDownToLine className="h-4 w-4"/>
                </button>
                {!isMobile ? (
                    <button
                        type="button"
                        onClick={resetPositionAndSize}
                        className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white hover:text-gray-800"
                        title={t('task_monitor_reset_window', '恢复窗口位置和大小')}
                        aria-label={t('task_monitor_reset_window', '恢复窗口位置和大小')}
                    >
                        <RotateCcw className="h-4 w-4"/>
                    </button>
                ) : null}
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white hover:text-gray-800"
                    title={t('close', '关闭')}
                    aria-label={t('close', '关闭')}
                >
                    <X className="h-4 w-4"/>
                </button>
            </header>

            <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 pretty-scrollbar"
                onScroll={(event) => {
                    const element = event.currentTarget;
                    const isNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 48;
                    setAutoFollowBottom(current => current === isNearBottom ? current : isNearBottom);
                }}
            >
                {cleanContent ? (
                    <div className="task-monitor-content min-w-0">{renderMarkdown(cleanContent)}</div>
                ) : (
                    <div className="flex min-h-36 items-center justify-center text-center text-sm text-gray-500">
                        {t('task_monitor_waiting', '等待任务过程输出…')}
                    </div>
                )}
                {error ? (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}
            </div>

            {actions.length > 0 ? (
                <footer className={`flex shrink-0 items-center justify-end gap-2 border-t border-gray-100 bg-white/90 px-3 py-2.5 ${isMobile ? 'pb-[max(0.625rem,env(safe-area-inset-bottom))]' : ''}`}>
                    {actions.map(action => (
                        <button
                            key={`${action.command}-${action.taskRunId || action.name}`}
                            type="button"
                            onClick={event => handleAction(event, action)}
                            disabled={!markId || !action.taskRunId}
                            className="rounded-lg bg-orange-500/15 px-3 py-1.5 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {action.name}
                        </button>
                    ))}
                </footer>
            ) : null}

            {!isMobile ? RESIZE_HANDLES.map(([direction, className]) => (
                <div
                    key={direction}
                    aria-hidden="true"
                    className={`absolute z-20 touch-none ${className}`}
                    onPointerDown={event => handleResizePointerDown(event, direction)}
                    onPointerMove={handleResizePointerMove}
                    onPointerUp={handleResizePointerUp}
                    onPointerCancel={handleResizePointerUp}
                />
            )) : null}
        </section>,
        document.body,
    );
});

TaskMonitorWindow.displayName = 'TaskMonitorWindow';

export default TaskMonitorWindow;
