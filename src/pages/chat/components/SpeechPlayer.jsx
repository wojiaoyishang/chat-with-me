import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    ChevronDown,
    Gauge,
    GripVertical,
    MoveHorizontal,
    Pause,
    Play,
    SkipBack,
    SkipForward,
    Square,
    Volume2,
    ChevronsRight
} from 'lucide-react';

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const ACTIVE_STATUSES = new Set(['loading', 'playing', 'paused']);
const STORAGE_KEY = 'chat-speech-player-position-v2';
const DEFAULT_WIDTH_RATIO = 0.6;
const MIN_WIDTH = 360;
const PLAYER_Z_INDEX = 2147483000;
const SIDE_SNAP_DISTANCE = 28;

const fallbackText = (t, key, fallback) => {
    const value = t?.(key);
    return value && value !== key ? value : fallback;
};

const clamp = (value, min, max) => {
    if (max < min) return min;
    return Math.min(Math.max(value, min), max);
};

const getViewportSize = () => ({
    width: window.innerWidth || document.documentElement.clientWidth || 1024,
    height: window.innerHeight || document.documentElement.clientHeight || 768,
});

const getMaxPanelWidth = (viewportWidth) => Math.max(280, viewportWidth - 32);

const getMinPanelWidth = (viewportWidth) => Math.min(MIN_WIDTH, getMaxPanelWidth(viewportWidth));

const getDefaultWidth = (viewport = getViewportSize()) => {
    const maxWidth = getMaxPanelWidth(viewport.width);
    const minWidth = getMinPanelWidth(viewport.width);
    return Math.round(clamp(viewport.width * DEFAULT_WIDTH_RATIO, minWidth, maxWidth));
};

const normalizePanelState = (state, viewport = getViewportSize()) => {
    const width = clamp(
        typeof state?.width === 'number' ? state.width : getDefaultWidth(viewport),
        getMinPanelWidth(viewport.width),
        getMaxPanelWidth(viewport.width),
    );

    const dockedSide = state?.dockedSide === 'right' ? 'right' : null;
    const x = dockedSide === 'right'
        ? Math.max(8, viewport.width - width - 8)
        : clamp(typeof state?.x === 'number' ? state.x : Math.max(16, Math.round((viewport.width - width) / 2)), 8, Math.max(8, viewport.width - width - 8));

    return {
        x,
        y: clamp(typeof state?.y === 'number' ? state.y : Math.max(88, viewport.height - 220), 64, Math.max(64, viewport.height - 110)),
        width,
        dockedSide,
        collapsed: state?.collapsed === true,
    };
};

const getInitialPosition = () => {
    if (typeof window === 'undefined') {
        return {x: 24, y: 120, width: 720, dockedSide: null, collapsed: false};
    }

    try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
        if (saved && typeof saved === 'object') {
            return normalizePanelState(saved);
        }
    } catch (_) {
        // ignore invalid cache
    }

    return normalizePanelState({});
};

const SpeechPlayer = memo(({speechState, message, onPause, onResume, onStop, onPrevious, onNext, onRateChange, t}) => {
    const isVisible = ACTIVE_STATUSES.has(speechState?.status);
    const panelRef = useRef(null);
    const collapseTimerRef = useRef(null);
    const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
    const interactionRef = useRef({active: false, type: null});
    const [floatingState, setFloatingState] = useState(getInitialPosition);

    const currentSegment = useMemo(() => {
        if (!speechState?.currentSegmentId) return null;
        return (speechState?.segments || []).find(item => item.id === speechState.currentSegmentId) || null;
    }, [speechState?.segments, speechState?.currentSegmentId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(floatingState));
    }, [floatingState]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setFloatingState(prev => normalizePanelState(prev));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!speedMenuOpen) return;

        const handlePointerDown = (event) => {
            if (panelRef.current && panelRef.current.contains(event.target)) return;
            setSpeedMenuOpen(false);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setSpeedMenuOpen(false);
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [speedMenuOpen]);

    const clearCollapseTimer = useCallback(() => {
        if (collapseTimerRef.current) {
            window.clearTimeout(collapseTimerRef.current);
            collapseTimerRef.current = null;
        }
    }, []);

    const scheduleDockCollapse = useCallback(() => {
        clearCollapseTimer();
        collapseTimerRef.current = window.setTimeout(() => {
            setFloatingState(prev => prev.dockedSide ? {...prev, collapsed: true} : prev);
        }, 380);
    }, [clearCollapseTimer]);

    const updateDragPosition = useCallback((clientX, clientY) => {
        const viewport = getViewportSize();
        const width = interactionRef.current.width || floatingState.width || getDefaultWidth(viewport);
        const height = panelRef.current?.offsetHeight || 120;
        const x = clamp(clientX - interactionRef.current.offsetX, 8, Math.max(8, viewport.width - width - 8));
        const y = clamp(clientY - interactionRef.current.offsetY, 64, Math.max(64, viewport.height - height - 8));

        setFloatingState(prev => ({...prev, x, y, width, dockedSide: null, collapsed: false}));
    }, [floatingState.width]);

    const updateResize = useCallback((clientX) => {
        const viewport = getViewportSize();
        const minWidth = getMinPanelWidth(viewport.width);
        const maxPanelWidth = getMaxPanelWidth(viewport.width);
        const interaction = interactionRef.current;
        const deltaX = clientX - interaction.startX;
        const startLeft = interaction.startLeft;
        const startWidth = interaction.startWidth;
        const startRight = startLeft + startWidth;

        let width;
        let x;

        if (interaction.direction === 'left') {
            const maxWidth = Math.min(maxPanelWidth, Math.max(minWidth, startRight - 8));
            width = clamp(startWidth - deltaX, minWidth, maxWidth);
            x = clamp(startRight - width, 8, Math.max(8, viewport.width - width - 8));
        } else {
            const maxWidth = Math.min(maxPanelWidth, Math.max(minWidth, viewport.width - startLeft - 8));
            width = clamp(startWidth + deltaX, minWidth, maxWidth);
            x = clamp(startLeft, 8, Math.max(8, viewport.width - width - 8));
        }

        const shouldKeepRightDock = viewport.width - (x + width) <= SIDE_SNAP_DISTANCE;

        setFloatingState(prev => ({
            ...prev,
            x,
            width,
            dockedSide: shouldKeepRightDock ? 'right' : null,
            collapsed: false,
        }));
    }, []);

    const finishInteraction = useCallback(() => {
        if (!interactionRef.current.active) return;
        const type = interactionRef.current.type;
        interactionRef.current = {active: false, type: null};
        document.body.style.userSelect = '';
        document.body.style.cursor = '';

        if (type !== 'drag') return;

        const viewport = getViewportSize();
        setFloatingState(prev => {
            const width = prev.width || getDefaultWidth(viewport);
            const shouldDockRight = viewport.width - (prev.x + width) <= SIDE_SNAP_DISTANCE;
            return {
                ...prev,
                x: shouldDockRight ? Math.max(8, viewport.width - width - 8) : prev.x,
                dockedSide: shouldDockRight ? 'right' : null,
                collapsed: shouldDockRight,
            };
        });
    }, []);

    useEffect(() => {
        const handlePointerMove = (event) => {
            if (!interactionRef.current.active) return;
            if (interactionRef.current.type === 'resize') {
                updateResize(event.clientX);
                return;
            }
            updateDragPosition(event.clientX, event.clientY);
        };

        const handlePointerUp = () => finishInteraction();

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [finishInteraction, updateDragPosition, updateResize]);

    const handleDragStart = useCallback((event) => {
        if (event.button !== undefined && event.button !== 0) return;
        setSpeedMenuOpen(false);
        clearCollapseTimer();
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;

        interactionRef.current = {
            active: true,
            type: 'drag',
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            width: rect.width,
        };

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        setFloatingState(prev => ({...prev, collapsed: false}));
        event.preventDefault();
    }, [clearCollapseTimer]);

    const handleResizeStart = useCallback((event, direction) => {
        if (event.button !== undefined && event.button !== 0) return;
        setSpeedMenuOpen(false);
        clearCollapseTimer();
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;

        interactionRef.current = {
            active: true,
            type: 'resize',
            direction,
            startX: event.clientX,
            startLeft: rect.left,
            startWidth: rect.width,
        };

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
        setFloatingState(prev => ({...prev, collapsed: false}));
        event.preventDefault();
        event.stopPropagation();
    }, [clearCollapseTimer]);

    const dockToRight = useCallback(() => {
        const viewport = getViewportSize();
        setFloatingState(prev => {
            const width = clamp(prev.width || getDefaultWidth(viewport), getMinPanelWidth(viewport.width), getMaxPanelWidth(viewport.width));
            return {
                ...prev,
                width,
                x: Math.max(8, viewport.width - width - 8),
                dockedSide: 'right',
                collapsed: true,
            };
        });
    }, []);

    const undock = useCallback(() => {
        clearCollapseTimer();
        setFloatingState(prev => ({...prev, collapsed: false}));
    }, [clearCollapseTimer]);

    if (!isVisible) return null;

    const isPaused = speechState.status === 'paused';
    const isLoading = speechState.status === 'loading';
    const segments = speechState?.segments || [];
    const currentIndex = currentSegment ? segments.findIndex(item => item.id === currentSegment.id) : -1;
    const progressText = currentIndex >= 0
        ? `${currentIndex + 1}/${Math.max(segments.length, 1)}`
        : `0/${segments.length || 0}`;
    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex >= 0 && currentIndex < segments.length - 1;
    const title = message?.name || fallbackText(t, 'speech_player_title', '语音朗读');
    const rate = Number(speechState?.rate || 1);
    const dockedSide = floatingState.dockedSide;
    const isCollapsed = Boolean(dockedSide && floatingState.collapsed);

    if (isCollapsed) {
        const tabStyle = {
            top: `${floatingState.y}px`,
            [dockedSide]: 0,
            zIndex: PLAYER_Z_INDEX,
        };

        return (
            <div
                className="fixed pointer-events-auto"
                style={tabStyle}
                onMouseEnter={undock}
                onFocus={undock}
            >
                <button
                    type="button"
                    onClick={undock}
                    className={`h-20 w-11 bg-white/95 border border-indigo-100 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl flex flex-col items-center justify-center gap-1 text-indigo-600 hover:bg-indigo-50 transition-all rounded-l-2xl border-r-0 ring-1 ring-white/60`}
                    aria-label={fallbackText(t, 'expand_speech_player', '展开朗读播放器')}
                >
                    <Volume2 size={18}/>
                    <span className="text-[10px] leading-none writing-mode-vertical">{isPaused ? fallbackText(t, 'paused', '暂停') : progressText}</span>
                </button>
            </div>
        );
    }

    const panelStyle = {
        left: `${floatingState.x}px`,
        top: `${floatingState.y}px`,
        width: `${floatingState.width}px`,
        maxWidth: 'calc(100vw - 32px)',
        zIndex: PLAYER_Z_INDEX,
    };

    return (
        <div
            ref={panelRef}
            className="fixed pointer-events-auto"
            style={panelStyle}
            onMouseEnter={clearCollapseTimer}
            onMouseLeave={() => dockedSide && scheduleDockCollapse()}
        >
            <div className="relative overflow-visible rounded-3xl border border-white/70 bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.20)] backdrop-blur-2xl ring-1 ring-indigo-100/70">
                <button
                    type="button"
                    onPointerDown={(event) => handleResizeStart(event, 'left')}
                    className="absolute left-0 top-4 bottom-4 z-20 w-2 -translate-x-1 cursor-ew-resize rounded-full hover:bg-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                    aria-label={fallbackText(t, 'resize_speech_player_left', '向左调整播放器宽度')}
                    title={fallbackText(t, 'resize_speech_player_left', '向左调整播放器宽度')}
                />
                <button
                    type="button"
                    onPointerDown={(event) => handleResizeStart(event, 'right')}
                    className="absolute right-0 top-4 bottom-4 z-20 w-2 translate-x-1 cursor-ew-resize rounded-full hover:bg-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                    aria-label={fallbackText(t, 'resize_speech_player_right', '向右调整播放器宽度')}
                    title={fallbackText(t, 'resize_speech_player_right', '向右调整播放器宽度')}
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white/40 to-violet-50/70"/>
                <div className="relative px-3.5 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onPointerDown={handleDragStart}
                            className="h-10 w-8 rounded-2xl text-gray-400 hover:text-gray-700 hover:bg-white/80 flex items-center justify-center cursor-grab active:cursor-grabbing flex-shrink-0 transition-colors"
                            aria-label={fallbackText(t, 'drag_speech_player', '拖动朗读播放器')}
                            title={fallbackText(t, 'drag_speech_player', '拖动朗读播放器')}
                        >
                            <GripVertical size={17}/>
                        </button>

                        <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
                            <Volume2 size={18}/>
                            {speechState.status === 'playing' && (
                                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white"/>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-sm font-semibold text-gray-900 truncate">
                                    {title}
                                </span>
                                <span className="text-[11px] text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 flex-shrink-0">
                                    {isLoading ? fallbackText(t, 'speech_loading', '准备中') : progressText}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 truncate mt-1">
                                {currentSegment?.text || fallbackText(t, 'speech_waiting_segment', '正在准备朗读内容...')}
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setSpeedMenuOpen(open => !open)}
                                    className="h-8 px-2.5 rounded-full flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white/80 hover:bg-white border border-gray-200/80 shadow-sm transition-colors cursor-pointer"
                                    aria-label={`${fallbackText(t, 'speech_speed', '速度')} ${rate}x`}
                                    aria-expanded={speedMenuOpen}
                                >
                                    <Gauge size={14} className="text-indigo-500"/>
                                    <span>{rate}x</span>
                                    <ChevronDown size={13} className={`text-gray-400 transition-transform ${speedMenuOpen ? 'rotate-180' : ''}`}/>
                                </button>

                                {speedMenuOpen && (
                                    <div className="absolute right-0 top-10 w-36 rounded-2xl border border-gray-200 bg-white/[0.98] p-1.5 shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 backdrop-blur-xl">
                                        <div className="px-2 py-1 text-[11px] text-gray-400">
                                            {fallbackText(t, 'speech_speed', '播放速度')}
                                        </div>
                                        {SPEEDS.map(item => {
                                            const active = Math.abs(rate - item) < 0.01;
                                            return (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    onClick={() => {
                                                        onRateChange?.(item);
                                                        setSpeedMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${active
                                                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                                    aria-label={`${fallbackText(t, 'speech_speed', '速度')} ${item}x`}
                                                >
                                                    <span>{item}x</span>
                                                    {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"/>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={onPrevious}
                                disabled={!canGoPrevious}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-700 bg-white/80 hover:bg-white hover:text-indigo-600 border border-gray-200/80 shadow-sm disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                aria-label={fallbackText(t, 'previous_speech_segment', '上一句')}
                                title={fallbackText(t, 'previous_speech_segment', '上一句')}
                            >
                                <SkipBack size={14}/>
                            </button>
                            <button
                                type="button"
                                onClick={onNext}
                                disabled={!canGoNext}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-700 bg-white/80 hover:bg-white hover:text-indigo-600 border border-gray-200/80 shadow-sm disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                aria-label={fallbackText(t, 'next_speech_segment', '下一句')}
                                title={fallbackText(t, 'next_speech_segment', '下一句')}
                            >
                                <SkipForward size={14}/>
                            </button>

                            <button
                                type="button"
                                onClick={isPaused ? onResume : onPause}
                                disabled={isLoading}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-700 bg-white/80 hover:bg-white hover:text-indigo-600 border border-gray-200/80 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                aria-label={isPaused ? fallbackText(t, 'resume_speech', '继续') : fallbackText(t, 'pause_speech', '暂停')}
                            >
                                {isPaused ? <Play size={15}/> : <Pause size={15}/>} 
                            </button>
                            <button
                                type="button"
                                onClick={onStop}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-700 bg-white/80 hover:text-red-600 hover:bg-red-50 border border-gray-200/80 shadow-sm transition-colors cursor-pointer"
                                aria-label={fallbackText(t, 'stop_speech', '停止')}
                            >
                                <Square size={14}/>
                            </button>
                            <button
                                type="button"
                                onClick={dockToRight}
                                className="h-8 px-2 rounded-full flex items-center justify-center text-xs text-gray-500 bg-white/70 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200/70 transition-colors cursor-pointer"
                                aria-label={fallbackText(t, 'dock_speech_player', '收起到右侧')}
                                title={fallbackText(t, 'dock_speech_player', '收起到右侧')}
                            >
                                <ChevronsRight size={14} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

SpeechPlayer.displayName = 'SpeechPlayer';

export default SpeechPlayer;
