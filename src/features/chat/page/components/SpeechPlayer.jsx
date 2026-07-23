import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import {
    ChevronDown,
    Gauge,
    GripVertical,
    Pause,
    Play,
    SkipBack,
    SkipForward,
    Square,
    Target,
    Volume2,
    ChevronsRight
} from 'lucide-react';
import {getLocalSetting, setLocalSetting, TTS_LOCAL_SETTING_KEYS} from '@/lib/tools.jsx';

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const ACTIVE_STATUSES = new Set(['loading', 'playing', 'paused']);
const DESKTOP_DEFAULT_WIDTH_RATIO = 0.52;
const DESKTOP_MIN_WIDTH = 360;
const MOBILE_MIN_WIDTH = 288;
const DESKTOP_MAX_WIDTH = 880;
const MOBILE_BREAKPOINT = 640;
const COMPACT_PANEL_WIDTH = 680;
const VERY_COMPACT_PANEL_WIDTH = 430;
const PLAYER_Z_INDEX = 2147483600;
const SIDE_SNAP_DISTANCE = 28;
const MOBILE_SIDE_SNAP_DISTANCE = 56;
const EDGE_MARGIN = 8;

const getVisualViewportMetrics = () => {
    if (typeof window === 'undefined') {
        return {width: 0, height: 0, offsetLeft: 0, offsetTop: 0};
    }

    const viewport = window.visualViewport;
    return {
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
        offsetLeft: viewport?.offsetLeft ?? 0,
        offsetTop: viewport?.offsetTop ?? 0,
    };
};

const fallbackText = (t, key, fallback) => {
    const value = t?.(key);
    return value && value !== key ? value : fallback;
};

const clamp = (value, min, max) => {
    if (max < min) return min;
    return Math.min(Math.max(value, min), max);
};

const normalizeProgress = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    return clamp(parsed > 1 ? parsed / 100 : parsed, 0, 1);
};

const SpeechProgressRail = ({speechState, className = ''}) => {
    const totalSegments = Number(speechState?.totalSegments || speechState?.segments?.length || 0);
    const playbackPosition = Number(speechState?.playbackSegmentPosition ?? speechState?.currentSegmentPosition);
    const bufferedPosition = Number(speechState?.bufferedSegmentPosition);

    const playbackFallback = totalSegments > 0 && Number.isInteger(playbackPosition) && playbackPosition >= 0
        ? (playbackPosition + 0.08) / totalSegments
        : 0;
    const bufferFallback = totalSegments > 0 && Number.isInteger(bufferedPosition) && bufferedPosition >= 0
        ? (bufferedPosition + 1) / totalSegments
        : playbackFallback;
    const playbackProgress = Math.max(normalizeProgress(speechState?.playbackPercent), playbackFallback);
    const bufferProgress = Math.max(
        playbackProgress,
        normalizeProgress(speechState?.bufferPercent),
        bufferFallback,
    );

    return (
        <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] overflow-hidden bg-slate-200/55 ${className}`}
            role="progressbar"
            aria-label="Speech playback and buffer progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(playbackProgress * 100)}
        >
            <div
                className="absolute inset-y-0 left-0 bg-indigo-300/70 transition-[width] duration-300 ease-out"
                style={{width: `${bufferProgress * 100}%`}}
            />
            <div
                className="absolute inset-y-0 left-0 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.95)] transition-[width] duration-200 ease-out"
                style={{width: `${playbackProgress * 100}%`}}
            />
        </div>
    );
};

const getViewportSize = () => ({
    width: window.innerWidth || document.documentElement.clientWidth || 1024,
    height: window.innerHeight || document.documentElement.clientHeight || 768,
});

const isCompactViewport = (viewportWidth) => viewportWidth <= MOBILE_BREAKPOINT;

const getMaxPanelWidth = (viewportWidth) => {
    if (isCompactViewport(viewportWidth)) {
        return Math.max(280, viewportWidth - EDGE_MARGIN * 2);
    }

    return Math.max(320, Math.min(DESKTOP_MAX_WIDTH, viewportWidth - 32));
};

const getMinPanelWidth = (viewportWidth) => Math.min(
    isCompactViewport(viewportWidth) ? MOBILE_MIN_WIDTH : DESKTOP_MIN_WIDTH,
    getMaxPanelWidth(viewportWidth),
);

const getDefaultWidth = (viewport = getViewportSize()) => {
    const maxWidth = getMaxPanelWidth(viewport.width);
    const minWidth = getMinPanelWidth(viewport.width);

    if (isCompactViewport(viewport.width)) {
        return Math.round(clamp(Math.min(360, viewport.width - EDGE_MARGIN * 2), minWidth, maxWidth));
    }

    return Math.round(clamp(viewport.width * DESKTOP_DEFAULT_WIDTH_RATIO, minWidth, maxWidth));
};

const getMinPanelY = (viewport = getViewportSize()) => (isCompactViewport(viewport.width) ? 12 : 64);

const getDockedSide = (state) => (
    state?.dockedSide === 'left' || state?.dockedSide === 'right' ? state.dockedSide : null
);

const getDockCandidate = (x, width, viewport, snapDistance) => {
    const leftDistance = x - EDGE_MARGIN;
    const rightDistance = viewport.width - (x + width) - EDGE_MARGIN;

    if (leftDistance > snapDistance && rightDistance > snapDistance) return null;
    return leftDistance <= rightDistance ? 'left' : 'right';
};

const getDockedX = (side, width, viewport) => (
    side === 'left' ? EDGE_MARGIN : Math.max(EDGE_MARGIN, viewport.width - width - EDGE_MARGIN)
);

const normalizePanelState = (state, viewport = getViewportSize(), measuredHeight) => {
    const width = clamp(
        typeof state?.width === 'number' ? state.width : getDefaultWidth(viewport),
        getMinPanelWidth(viewport.width),
        getMaxPanelWidth(viewport.width),
    );

    const dockedSide = getDockedSide(state);
    const maxX = Math.max(EDGE_MARGIN, viewport.width - width - EDGE_MARGIN);
    const fallbackX = Math.max(EDGE_MARGIN, Math.round((viewport.width - width) / 2));
    const x = dockedSide
        ? getDockedX(dockedSide, width, viewport)
        : clamp(typeof state?.x === 'number' ? state.x : fallbackX, EDGE_MARGIN, maxX);

    const minY = getMinPanelY(viewport);
    const defaultY = isCompactViewport(viewport.width)
        ? Math.max(24, viewport.height - 190)
        : Math.max(88, viewport.height - 220);
    const maxY = Math.max(
        minY,
        typeof measuredHeight === 'number'
            ? viewport.height - measuredHeight - EDGE_MARGIN
            : viewport.height - 88,
    );

    return {
        x,
        y: clamp(typeof state?.y === 'number' ? state.y : defaultY, minY, maxY),
        width,
        dockedSide,
        collapsed: state?.collapsed === true,
    };
};

const getInitialPosition = () => {
    if (typeof window === 'undefined') {
        return {x: 24, y: 120, width: 720, dockedSide: null, collapsed: false};
    }

    const saved = getLocalSetting(TTS_LOCAL_SETTING_KEYS.playerPosition, null);
    if (saved && typeof saved === 'object') {
        return normalizePanelState(saved);
    }

    return normalizePanelState({});
};

const getIsMobileInteraction = () => {
    if (typeof window === 'undefined') return false;

    const hasCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches;
    const hasNoHover = window.matchMedia?.('(hover: none)')?.matches;
    const isSmallScreen = window.innerWidth <= MOBILE_BREAKPOINT;

    return Boolean(hasCoarsePointer || hasNoHover || isSmallScreen);
};

const BrowserVoiceOptionsPortal = ({
    open,
    anchorRef,
    menuRef,
    options,
    selectedValue,
    defaultLabel,
    onOpenChange,
    onPointerEnter,
    onPointerLeave,
    t,
}) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        onOpenChange?.(Boolean(open));
        return () => {
            if (open) onOpenChange?.(false);
        };
    }, [onOpenChange, open]);

    useEffect(() => {
        if (!open || !anchorRef.current) return undefined;

        let rafId = null;

        const updatePosition = () => {
            const anchor = anchorRef.current;
            if (!anchor) return;

            const rect = anchor.getBoundingClientRect();
            const viewport = getVisualViewportMetrics();
            const viewportPadding = 12;
            const gap = 6;
            const preferredMaxHeight = 280;
            const fallbackOptionHeight = 36;
            const estimatedMenuHeight = Math.min(
                preferredMaxHeight,
                Math.max(44, ((options?.length || 0) + 1) * fallbackOptionHeight + 8),
            );

            const viewportLeft = viewport.offsetLeft;
            const viewportTop = viewport.offsetTop;
            const viewportRight = viewportLeft + viewport.width;
            const viewportBottom = viewportTop + viewport.height;
            const availableBelow = Math.max(0, viewportBottom - rect.bottom - gap - viewportPadding);
            const availableAbove = Math.max(0, rect.top - viewportTop - gap - viewportPadding);
            const shouldOpenUp = availableBelow < Math.min(estimatedMenuHeight, 120) && availableAbove > availableBelow;
            const availableInDirection = shouldOpenUp ? availableAbove : availableBelow;
            const fallbackMaxHeight = Math.max(0, viewport.height - viewportPadding * 2);
            const maxHeight = Math.min(
                preferredMaxHeight,
                Math.max(44, availableInDirection > 0 ? availableInDirection : fallbackMaxHeight),
            );
            const heightForPlacement = Math.min(estimatedMenuHeight, maxHeight);
            const maxWidth = Math.max(1, viewport.width - viewportPadding * 2);
            const width = Math.min(Math.max(rect.width, 220), maxWidth);
            const minLeft = viewportLeft + viewportPadding;
            const maxLeft = Math.max(minLeft, viewportRight - width - viewportPadding);
            const left = Math.max(minLeft, Math.min(rect.left, maxLeft));

            let top = shouldOpenUp ? rect.top - gap - heightForPlacement : rect.bottom + gap;
            if (availableInDirection < 44 && fallbackMaxHeight > 0) {
                top = viewportTop + viewportPadding;
            }
            top = Math.max(
                viewportTop + viewportPadding,
                Math.min(top, viewportBottom - viewportPadding - heightForPlacement),
            );

            setPosition({
                top,
                left,
                width,
                maxHeight: Math.max(44, Math.min(maxHeight, viewportBottom - viewportPadding - top)),
                placement: shouldOpenUp ? 'top' : 'bottom',
            });
        };

        const scheduleUpdate = () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(updatePosition);
        };

        updatePosition();
        window.addEventListener('resize', scheduleUpdate);
        window.addEventListener('scroll', scheduleUpdate, true);
        window.visualViewport?.addEventListener('resize', scheduleUpdate);
        window.visualViewport?.addEventListener('scroll', scheduleUpdate);

        return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            window.removeEventListener('resize', scheduleUpdate);
            window.removeEventListener('scroll', scheduleUpdate, true);
            window.visualViewport?.removeEventListener('resize', scheduleUpdate);
            window.visualViewport?.removeEventListener('scroll', scheduleUpdate);
        };
    }, [anchorRef, open, options]);

    if (!open || !position || typeof document === 'undefined') return null;

    const renderOptionLabel = (voice) => {
        const lang = voice.lang ? ` (${voice.lang})` : '';
        const defaultMark = voice.default ? ` · ${fallbackText(t, 'speech_voice_default', '默认')}` : '';
        return `${voice.name}${lang}${defaultMark}`;
    };

    return createPortal(
        <ListboxOptions
            ref={menuRef}
            static
            className="fixed overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-1 shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 outline-none"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                maxHeight: `${position.maxHeight}px`,
                zIndex: PLAYER_Z_INDEX + 2,
                transformOrigin: position.placement === 'top' ? 'bottom left' : 'top left',
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
        >
            <ListboxOption
                value=""
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 data-[selected]:font-semibold data-[selected]:text-indigo-600"
            >
                {({selected}) => (
                    <>
                        <span className="min-w-0 flex-1 truncate">{defaultLabel}</span>
                        {(selected || selectedValue === '') && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"/>}
                    </>
                )}
            </ListboxOption>
            {options.map((voice) => (
                <ListboxOption
                    key={voice.voiceURI}
                    value={voice.voiceURI}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 data-[selected]:font-semibold data-[selected]:text-indigo-600"
                >
                    {({selected}) => (
                        <>
                            <span className="min-w-0 flex-1 truncate" title={renderOptionLabel(voice)}>
                                {renderOptionLabel(voice)}
                            </span>
                            {(selected || selectedValue === voice.voiceURI) && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"/>}
                        </>
                    )}
                </ListboxOption>
            ))}
        </ListboxOptions>,
        document.body,
    );
};

const SpeechPlayer = memo(({
                               speechState,
                               message,
                               autoFollowEnabled = false,
                               onAutoFollowToggle,
                               onPause,
                               onResume,
                               onStop,
                               onPrevious,
                               onNext,
                               onRateChange,
                               browserSpeechVoices = [],
                               selectedBrowserSpeechVoiceURI = '',
                               onBrowserSpeechVoiceChange,
                               t,
                           }) => {
    const isVisible = ACTIVE_STATUSES.has(speechState?.status);
    const panelRef = useRef(null);
    const speedButtonRef = useRef(null);
    const browserVoiceButtonRef = useRef(null);
    const browserVoiceMenuRef = useRef(null);
    const speedMenuRef = useRef(null);
    const collapseTimerRef = useRef(null);
    const panelPointerInsideRef = useRef(false);
    const secondaryMenuOpenRef = useRef(false);
    const wasSecondaryMenuOpenRef = useRef(false);
    const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
    const [browserVoiceMenuOpen, setBrowserVoiceMenuOpen] = useState(false);
    const [speedMenuPosition, setSpeedMenuPosition] = useState({top: 0, left: 0});
    const interactionRef = useRef({active: false, type: null});
    const suppressCollapsedClickRef = useRef(false);
    const [floatingState, setFloatingState] = useState(getInitialPosition);
    const [isMobileInteraction, setIsMobileInteraction] = useState(getIsMobileInteraction);
    const [measuredPanelWidth, setMeasuredPanelWidth] = useState(null);
    const effectivePanelWidth = measuredPanelWidth ?? floatingState.width ?? DESKTOP_MIN_WIDTH;
    const isCompactPanel = effectivePanelWidth < COMPACT_PANEL_WIDTH;
    const isVeryCompactPanel = effectivePanelWidth < VERY_COMPACT_PANEL_WIDTH;

    const currentSegment = useMemo(() => {
        const segments = speechState?.segments || [];
        if (!segments.length) return null;

        if (speechState?.currentSegmentId !== undefined && speechState?.currentSegmentId !== null) {
            const byId = segments.find(item => String(item.id) === String(speechState.currentSegmentId));
            if (byId) return byId;
        }

        const position = Number(speechState?.currentSegmentPosition);
        if (Number.isInteger(position) && position >= 0 && position < segments.length) return segments[position];

        const index = Number(speechState?.currentSegmentIndex);
        if (Number.isInteger(index) && index >= 0 && index < segments.length) return segments[index];

        return null;
    }, [speechState?.segments, speechState?.currentSegmentId, speechState?.currentSegmentIndex, speechState?.currentSegmentPosition]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setLocalSetting(TTS_LOCAL_SETTING_KEYS.playerPosition, floatingState);
    }, [floatingState]);

    const keepPanelInViewport = useCallback(() => {
        if (typeof window === 'undefined') return;
        const measuredHeight = panelRef.current?.offsetHeight;

        setFloatingState(prev => {
            const next = normalizePanelState(prev, getViewportSize(), measuredHeight);
            if (
                prev.x === next.x &&
                prev.y === next.y &&
                prev.width === next.width &&
                prev.dockedSide === next.dockedSide &&
                prev.collapsed === next.collapsed
            ) {
                return prev;
            }
            return next;
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        keepPanelInViewport();
        window.addEventListener('resize', keepPanelInViewport);
        window.visualViewport?.addEventListener?.('resize', keepPanelInViewport);
        return () => {
            window.removeEventListener('resize', keepPanelInViewport);
            window.visualViewport?.removeEventListener?.('resize', keepPanelInViewport);
        };
    }, [keepPanelInViewport]);

    useEffect(() => {
        if (!isVisible) return undefined;
        const frame = window.requestAnimationFrame(keepPanelInViewport);
        return () => window.cancelAnimationFrame(frame);
    }, [isVisible, keepPanelInViewport, currentSegment?.text, speedMenuOpen, isCompactPanel]);

    useEffect(() => {
        if (!isVisible || (floatingState.dockedSide && floatingState.collapsed)) return undefined;

        const panel = panelRef.current;
        if (!panel) return undefined;

        const updateWidth = (width) => {
            if (!Number.isFinite(width) || width <= 0) return;
            setMeasuredPanelWidth(prev => (prev !== null && Math.abs(prev - width) < 0.5 ? prev : width));
        };

        updateWidth(panel.getBoundingClientRect().width);
        if (typeof ResizeObserver === 'undefined') return undefined;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect?.width;
            updateWidth(width);
        });
        observer.observe(panel);
        return () => observer.disconnect();
    }, [floatingState.collapsed, floatingState.dockedSide, isVisible]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQueries = [
            window.matchMedia?.('(pointer: coarse)'),
            window.matchMedia?.('(hover: none)'),
            window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT}px)`),
        ].filter(Boolean);

        const updateInteractionMode = () => {
            setIsMobileInteraction(getIsMobileInteraction());
        };

        updateInteractionMode();
        mediaQueries.forEach((query) => {
            if (typeof query.addEventListener === 'function') {
                query.addEventListener('change', updateInteractionMode);
            } else {
                query.addListener?.(updateInteractionMode);
            }
        });
        window.addEventListener('resize', updateInteractionMode);

        return () => {
            mediaQueries.forEach((query) => {
                if (typeof query.removeEventListener === 'function') {
                    query.removeEventListener('change', updateInteractionMode);
                } else {
                    query.removeListener?.(updateInteractionMode);
                }
            });
            window.removeEventListener('resize', updateInteractionMode);
        };
    }, []);

    const updateSpeedMenuPosition = useCallback(() => {
        if (typeof window === 'undefined') return;

        const rect = speedButtonRef.current?.getBoundingClientRect();
        if (!rect) return;

        const viewport = getViewportSize();
        const menuWidth = 152;
        const estimatedMenuHeight = 214;
        const hasRoomBelow = viewport.height - rect.bottom >= estimatedMenuHeight + 16;
        const rawTop = hasRoomBelow ? rect.bottom + 8 : rect.top - estimatedMenuHeight - 8;
        const alignCenter = viewport.width <= MOBILE_BREAKPOINT;
        const rawLeft = alignCenter
            ? rect.left + rect.width / 2 - menuWidth / 2
            : rect.right - menuWidth;

        const nextTop = clamp(rawTop, EDGE_MARGIN, Math.max(EDGE_MARGIN, viewport.height - estimatedMenuHeight - EDGE_MARGIN));
        const nextLeft = clamp(rawLeft, EDGE_MARGIN, Math.max(EDGE_MARGIN, viewport.width - menuWidth - EDGE_MARGIN));

        setSpeedMenuPosition({top: nextTop, left: nextLeft});
    }, []);

    const toggleSpeedMenu = useCallback(() => {
        setSpeedMenuOpen((open) => {
            const nextOpen = !open;
            if (nextOpen && typeof window !== 'undefined') {
                window.requestAnimationFrame(updateSpeedMenuPosition);
            }
            return nextOpen;
        });
    }, [updateSpeedMenuPosition]);

    useEffect(() => {
        if (!speedMenuOpen) return undefined;

        updateSpeedMenuPosition();
        window.addEventListener('resize', updateSpeedMenuPosition);
        window.addEventListener('scroll', updateSpeedMenuPosition, true);
        window.visualViewport?.addEventListener?.('resize', updateSpeedMenuPosition);

        return () => {
            window.removeEventListener('resize', updateSpeedMenuPosition);
            window.removeEventListener('scroll', updateSpeedMenuPosition, true);
            window.visualViewport?.removeEventListener?.('resize', updateSpeedMenuPosition);
        };
    }, [speedMenuOpen, updateSpeedMenuPosition]);

    useEffect(() => {
        if (!speedMenuOpen) return undefined;

        const handlePointerDown = (event) => {
            const target = event.target;
            if (panelRef.current?.contains(target)) return;
            if (speedMenuRef.current?.contains(target)) return;
            setSpeedMenuOpen(false);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setSpeedMenuOpen(false);
        };

        window.addEventListener('pointerdown', handlePointerDown, true);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown, true);
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
        if (isMobileInteraction || panelPointerInsideRef.current || secondaryMenuOpenRef.current) return;

        clearCollapseTimer();
        collapseTimerRef.current = window.setTimeout(() => {
            if (panelPointerInsideRef.current || secondaryMenuOpenRef.current) return;
            setFloatingState(prev => prev.dockedSide ? {...prev, collapsed: true} : prev);
        }, 380);
    }, [clearCollapseTimer, isMobileInteraction]);

    const handlePanelMouseEnter = useCallback(() => {
        panelPointerInsideRef.current = true;
        clearCollapseTimer();
    }, [clearCollapseTimer]);

    const handlePanelMouseLeave = useCallback(() => {
        panelPointerInsideRef.current = false;
        scheduleDockCollapse();
    }, [scheduleDockCollapse]);

    const handleBrowserVoiceMenuOpenChange = useCallback((open) => {
        setBrowserVoiceMenuOpen(Boolean(open));
    }, []);

    useEffect(() => {
        const hasOpenSecondaryMenu = speedMenuOpen || browserVoiceMenuOpen;
        const wasOpen = wasSecondaryMenuOpenRef.current;
        secondaryMenuOpenRef.current = hasOpenSecondaryMenu;
        wasSecondaryMenuOpenRef.current = hasOpenSecondaryMenu;

        if (hasOpenSecondaryMenu) {
            clearCollapseTimer();
            setFloatingState(prev => prev.collapsed ? {...prev, collapsed: false} : prev);
            return;
        }

        if (wasOpen && !isMobileInteraction && floatingState.dockedSide && !panelPointerInsideRef.current) {
            scheduleDockCollapse();
        }
    }, [
        browserVoiceMenuOpen,
        clearCollapseTimer,
        floatingState.dockedSide,
        isMobileInteraction,
        scheduleDockCollapse,
        speedMenuOpen,
    ]);

    const updateDragPosition = useCallback((clientX, clientY) => {
        const viewport = getViewportSize();
        const width = interactionRef.current.width || floatingState.width || getDefaultWidth(viewport);
        const height = panelRef.current?.offsetHeight || 120;
        const minY = getMinPanelY(viewport);
        const x = clamp(clientX - interactionRef.current.offsetX, EDGE_MARGIN, Math.max(EDGE_MARGIN, viewport.width - width - EDGE_MARGIN));
        const y = clamp(clientY - interactionRef.current.offsetY, minY, Math.max(minY, viewport.height - height - EDGE_MARGIN));
        const dockedSide = getDockCandidate(
            x,
            width,
            viewport,
            isMobileInteraction ? MOBILE_SIDE_SNAP_DISTANCE : SIDE_SNAP_DISTANCE,
        );
        const nextX = dockedSide ? getDockedX(dockedSide, width, viewport) : x;

        setFloatingState(prev => ({...prev, x: nextX, y, width, dockedSide, collapsed: false}));
    }, [floatingState.width, isMobileInteraction]);

    const updateCollapsedDragPosition = useCallback((clientX, clientY) => {
        const viewport = getViewportSize();
        const interaction = interactionRef.current;
        const tabHeight = interaction.height || 64;
        const width = clamp(
            interaction.panelWidth || floatingState.width || getDefaultWidth(viewport),
            getMinPanelWidth(viewport.width),
            getMaxPanelWidth(viewport.width),
        );
        const minY = getMinPanelY(viewport);
        const y = clamp(
            clientY - interaction.offsetY,
            minY,
            Math.max(minY, viewport.height - tabHeight - EDGE_MARGIN),
        );
        const movedDistance = Math.hypot(
            clientX - (interaction.startClientX || clientX),
            clientY - (interaction.startClientY || clientY),
        );
        if (movedDistance > 4) {
            suppressCollapsedClickRef.current = true;
        }

        const dockedSide = clientX <= viewport.width / 2 ? 'left' : 'right';

        setFloatingState(prev => ({
            ...prev,
            x: getDockedX(dockedSide, width, viewport),
            y,
            width,
            dockedSide,
            collapsed: true,
        }));
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
            const maxWidth = Math.min(maxPanelWidth, Math.max(minWidth, startRight - EDGE_MARGIN));
            width = clamp(startWidth - deltaX, minWidth, maxWidth);
            x = clamp(startRight - width, EDGE_MARGIN, Math.max(EDGE_MARGIN, viewport.width - width - EDGE_MARGIN));
        } else {
            const maxWidth = Math.min(maxPanelWidth, Math.max(minWidth, viewport.width - startLeft - EDGE_MARGIN));
            width = clamp(startWidth + deltaX, minWidth, maxWidth);
            x = clamp(startLeft, EDGE_MARGIN, Math.max(EDGE_MARGIN, viewport.width - width - EDGE_MARGIN));
        }

        const dockedSide = getDockCandidate(x, width, viewport, SIDE_SNAP_DISTANCE);
        const nextX = dockedSide ? getDockedX(dockedSide, width, viewport) : x;

        setFloatingState(prev => ({
            ...prev,
            x: nextX,
            width,
            dockedSide,
            collapsed: false,
        }));
    }, []);

    const finishInteraction = useCallback(() => {
        if (!interactionRef.current.active) return;
        const type = interactionRef.current.type;
        interactionRef.current = {active: false, type: null};
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        document.body.style.touchAction = '';

        const viewport = getViewportSize();
        const measuredHeight = panelRef.current?.offsetHeight;

        if (type === 'collapsed-drag') {
            const wasDragged = suppressCollapsedClickRef.current;

            if (!wasDragged) {
                setFloatingState(prev => ({...prev, collapsed: false}));
                return;
            }

            setFloatingState(prev => {
                const normalized = normalizePanelState(prev, viewport, measuredHeight);
                const dockedSide = normalized.dockedSide || prev.dockedSide || 'right';

                return {
                    ...normalized,
                    x: getDockedX(dockedSide, normalized.width, viewport),
                    dockedSide,
                    collapsed: true,
                };
            });
            window.setTimeout(() => {
                suppressCollapsedClickRef.current = false;
            }, 0);
            return;
        }

        if (type !== 'drag') return;

        setFloatingState(prev => {
            const normalized = normalizePanelState(prev, viewport, measuredHeight);
            const dockedSide = getDockCandidate(
                normalized.x,
                normalized.width,
                viewport,
                isMobileInteraction ? MOBILE_SIDE_SNAP_DISTANCE : SIDE_SNAP_DISTANCE,
            );

            return {
                ...normalized,
                x: dockedSide ? getDockedX(dockedSide, normalized.width, viewport) : normalized.x,
                dockedSide,
                collapsed: dockedSide ? !isMobileInteraction : false,
            };
        });
    }, [isMobileInteraction]);

    useEffect(() => {
        const handlePointerMove = (event) => {
            if (!interactionRef.current.active) return;
            if (interactionRef.current.type === 'resize') {
                updateResize(event.clientX);
                return;
            }
            if (interactionRef.current.type === 'collapsed-drag') {
                updateCollapsedDragPosition(event.clientX, event.clientY);
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
    }, [finishInteraction, updateCollapsedDragPosition, updateDragPosition, updateResize]);

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

        event.currentTarget?.setPointerCapture?.(event.pointerId);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        document.body.style.touchAction = 'none';
        setFloatingState(prev => ({...prev, collapsed: false}));
        event.preventDefault();
    }, [clearCollapseTimer]);

    const handleCollapsedDragStart = useCallback((event) => {
        if (event.button !== undefined && event.button !== 0) return;
        setSpeedMenuOpen(false);
        clearCollapseTimer();
        suppressCollapsedClickRef.current = false;

        const rect = event.currentTarget?.getBoundingClientRect?.();
        if (!rect) return;

        interactionRef.current = {
            active: true,
            type: 'collapsed-drag',
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            height: rect.height,
            panelWidth: floatingState.width,
            startClientX: event.clientX,
            startClientY: event.clientY,
        };

        event.currentTarget?.setPointerCapture?.(event.pointerId);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        document.body.style.touchAction = 'none';
        event.preventDefault();
    }, [clearCollapseTimer, floatingState.width]);


    const handleResizeStart = useCallback((event, direction) => {
        if (event.button !== undefined && event.button !== 0) return;
        if (isMobileInteraction) return;
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

        event.currentTarget?.setPointerCapture?.(event.pointerId);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
        setFloatingState(prev => ({...prev, collapsed: false}));
        event.preventDefault();
        event.stopPropagation();
    }, [clearCollapseTimer, isMobileInteraction]);

    const dockToSide = useCallback((side = 'right') => {
        setSpeedMenuOpen(false);
        const viewport = getViewportSize();
        setFloatingState(prev => {
            const width = clamp(prev.width || getDefaultWidth(viewport), getMinPanelWidth(viewport.width), getMaxPanelWidth(viewport.width));
            return {
                ...prev,
                width,
                x: getDockedX(side, width, viewport),
                dockedSide: side,
                collapsed: true,
            };
        });
    }, []);

    const dockToRight = useCallback(() => dockToSide('right'), [dockToSide]);

    const undock = useCallback(() => {
        clearCollapseTimer();
        setFloatingState(prev => ({...prev, collapsed: false}));
    }, [clearCollapseTimer]);

    const handleCollapsedClick = useCallback((event) => {
        if (suppressCollapsedClickRef.current) {
            suppressCollapsedClickRef.current = false;
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        undock();
    }, [undock]);

    const collapseToDock = useCallback(() => {
        clearCollapseTimer();
        setSpeedMenuOpen(false);
        setFloatingState(prev => prev.dockedSide ? {...prev, collapsed: true} : prev);
    }, [clearCollapseTimer]);

    useEffect(() => {
        if (!isVisible || !isMobileInteraction || !floatingState.dockedSide || floatingState.collapsed) {
            return undefined;
        }

        const handlePointerDownOutside = (event) => {
            if (interactionRef.current.active) return;
            if (panelRef.current?.contains(event.target)) return;
            if (speedMenuRef.current?.contains(event.target)) return;
            if (browserVoiceMenuRef.current?.contains(event.target)) return;
            collapseToDock();
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                collapseToDock();
            }
        };

        window.addEventListener('pointerdown', handlePointerDownOutside, true);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDownOutside, true);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [collapseToDock, floatingState.collapsed, floatingState.dockedSide, isMobileInteraction, isVisible]);

    useEffect(() => () => clearCollapseTimer(), [clearCollapseTimer]);

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
    const isBrowserSpeech = speechState?.engine === 'browser';
    const browserVoiceOptions = Array.isArray(browserSpeechVoices) ? browserSpeechVoices : [];
    const selectedBrowserVoiceValue = browserVoiceOptions.some(item => item.voiceURI === selectedBrowserSpeechVoiceURI)
        ? selectedBrowserSpeechVoiceURI
        : '';
    const canSelectBrowserVoice = isBrowserSpeech && browserVoiceOptions.length > 0;
    const dockedSide = floatingState.dockedSide;
    const isCollapsed = Boolean(dockedSide && floatingState.collapsed);
    const autoFollowLabel = autoFollowEnabled
        ? fallbackText(t, 'speech_auto_follow_on', '已开启跟随朗读，点击关闭')
        : fallbackText(t, 'speech_auto_follow_off', '跟随当前朗读位置');
    const browserVoiceDefaultLabel = fallbackText(t, 'speech_voice_browser_default', '浏览器默认');
    const selectedBrowserVoiceLabel = selectedBrowserVoiceValue
        ? (() => {
            const selectedVoice = browserVoiceOptions.find(item => item.voiceURI === selectedBrowserVoiceValue);
            if (!selectedVoice) return browserVoiceDefaultLabel;
            const lang = selectedVoice.lang ? ` (${selectedVoice.lang})` : '';
            const defaultMark = selectedVoice.default ? ` · ${fallbackText(t, 'speech_voice_default', '默认')}` : '';
            return `${selectedVoice.name}${lang}${defaultMark}`;
        })()
        : browserVoiceDefaultLabel;

    const renderSpeedMenu = () => (
        <div
            ref={speedMenuRef}
            className="fixed rounded-2xl border border-gray-200 bg-white/[0.98] p-1.5 shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 backdrop-blur-xl"
            style={{top: speedMenuPosition.top, left: speedMenuPosition.left, width: 152, zIndex: PLAYER_Z_INDEX + 2}}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseEnter={clearCollapseTimer}
            onMouseLeave={() => {
                if (!speedMenuOpen) scheduleDockCollapse();
            }}
            role="menu"
            aria-label={fallbackText(t, 'speech_speed', '播放速度')}
        >
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
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors cursor-pointer ${active
                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        aria-label={`${fallbackText(t, 'speech_speed', '速度')} ${item}x`}
                        role="menuitemradio"
                        aria-checked={active}
                    >
                        <span>{item}x</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"/>}
                    </button>
                );
            })}
        </div>
    );

    const speedMenuPortal = speedMenuOpen && typeof document !== 'undefined'
        ? createPortal(renderSpeedMenu(), document.body)
        : null;

    if (isCollapsed) {
        const tabStyle = {
            top: `${floatingState.y}px`,
            [dockedSide]: 0,
            zIndex: PLAYER_Z_INDEX,
        };
        const tabSideClass = dockedSide === 'left'
            ? 'rounded-r-2xl border-l-0'
            : 'rounded-l-2xl border-r-0';

        const collapsedLabel = `${fallbackText(t, 'expand_speech_player', '展开朗读播放器')} · ${progressText}`;

        const collapsedPlayer = (
            <div
                ref={panelRef}
                className="fixed pointer-events-auto touch-none"
                style={tabStyle}
            >
                <div className={`relative overflow-hidden border border-indigo-100 bg-white/95 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl ring-1 ring-white/60 ${tabSideClass}`}>
                    <button
                        type="button"
                        onPointerDown={handleCollapsedDragStart}
                        onClick={handleCollapsedClick}
                        className="flex min-h-16 min-w-12 max-w-24 cursor-grab touch-none select-none flex-col items-center justify-center gap-1.5 bg-transparent px-2 py-2 text-indigo-600 transition-all hover:bg-indigo-50 active:cursor-grabbing"
                        aria-label={collapsedLabel}
                        title={collapsedLabel}
                    >
                        <Volume2 size={18} className="shrink-0"/>
                        <span className="max-w-full truncate whitespace-nowrap rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-indigo-600">
                            {progressText}
                        </span>
                    </button>
                    <SpeechProgressRail speechState={speechState}/>
                </div>
            </div>
        );

        return typeof document !== 'undefined'
            ? createPortal(collapsedPlayer, document.body)
            : collapsedPlayer;
    }

    const panelStyle = {
        left: `${floatingState.x}px`,
        top: `${floatingState.y}px`,
        width: `${floatingState.width}px`,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100dvh - 24px)',
        zIndex: PLAYER_Z_INDEX,
    };

    const speechPlayerContent = (
        <>
            <div
                ref={panelRef}
                className="fixed pointer-events-auto"
                style={panelStyle}
                onMouseEnter={handlePanelMouseEnter}
                onMouseLeave={handlePanelMouseLeave}
            >
                <div className="relative overflow-visible rounded-3xl">
                    <button
                        type="button"
                        onPointerDown={(event) => handleResizeStart(event, 'left')}
                        className="absolute left-0 top-4 bottom-4 z-20 hidden w-2 -translate-x-1 cursor-ew-resize rounded-full hover:bg-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 sm:block"
                        aria-label={fallbackText(t, 'resize_speech_player_left', '向左调整播放器宽度')}
                        title={fallbackText(t, 'resize_speech_player_left', '向左调整播放器宽度')}
                    />
                    <button
                        type="button"
                        onPointerDown={(event) => handleResizeStart(event, 'right')}
                        className="absolute right-0 top-4 bottom-4 z-20 hidden w-2 translate-x-1 cursor-ew-resize rounded-full hover:bg-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 sm:block"
                        aria-label={fallbackText(t, 'resize_speech_player_right', '向右调整播放器宽度')}
                        title={fallbackText(t, 'resize_speech_player_right', '向右调整播放器宽度')}
                    />
                    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.20)] backdrop-blur-2xl ring-1 ring-indigo-100/70">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white/40 to-violet-50/70"/>
                        <div className="relative px-3 py-3 sm:px-3.5">
                            <div className={isCompactPanel
                                ? 'flex flex-col gap-2.5'
                                : 'flex items-center gap-3'
                            }>
                                <div className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${isCompactPanel ? 'w-full' : 'flex-1'}`}>
                                    <button
                                        type="button"
                                        onPointerDown={handleDragStart}
                                        className="flex h-10 w-8 flex-shrink-0 touch-none items-center justify-center rounded-2xl text-gray-400 transition-colors hover:bg-white/80 hover:text-gray-700 cursor-grab active:cursor-grabbing"
                                        aria-label={fallbackText(t, 'drag_speech_player', '拖动朗读播放器')}
                                        title={fallbackText(t, 'drag_speech_player', '拖动朗读播放器')}
                                    >
                                        <GripVertical size={17}/>
                                    </button>

                                    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
                                        <Volume2 size={18}/>
                                        {speechState.status === 'playing' && (
                                            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white"/>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1 basis-0">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="truncate text-sm font-semibold text-gray-900">
                                                {title}
                                            </span>
                                            <span className="flex-shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-600">
                                                {isLoading ? fallbackText(t, 'speech_loading', '准备中') : progressText}
                                            </span>
                                        </div>
                                        <div className="mt-1 truncate text-xs text-gray-500">
                                            {currentSegment?.text || fallbackText(t, 'speech_waiting_segment', '正在准备朗读内容...')}
                                        </div>
                                    </div>
                                </div>

                                <div className={isCompactPanel
                                    ? 'grid w-full min-w-0 grid-cols-1 gap-2'
                                    : 'flex min-w-0 items-center justify-end gap-2'
                                }>
                                    <div className={`flex min-w-0 items-center gap-1.5 rounded-2xl bg-white/30 p-0.5 ${isCompactPanel ? 'w-full' : 'shrink-0'}`}>
                                        {canSelectBrowserVoice && (
                                            <Listbox value={selectedBrowserVoiceValue} onChange={(value) => onBrowserSpeechVoiceChange?.(value)}>
                                                {({open}) => (
                                                    <div className={isCompactPanel ? 'min-w-0 flex-1' : 'min-w-0 max-w-[190px] shrink'}>
                                                        <ListboxButton
                                                            ref={browserVoiceButtonRef}
                                                            className="flex h-8 min-w-0 w-full cursor-pointer items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/80 px-2 text-left text-xs font-medium text-gray-700 shadow-sm outline-none transition-colors hover:bg-white focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"
                                                            aria-label={fallbackText(t, 'speech_voice', '朗读角色')}
                                                            title={selectedBrowserVoiceLabel}
                                                        >
                                                            <Volume2 size={14} className="shrink-0 text-indigo-500"/>
                                                            <span className="min-w-0 flex-1 truncate">{selectedBrowserVoiceLabel}</span>
                                                            <ChevronDown size={13} className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}/>
                                                        </ListboxButton>
                                                        <BrowserVoiceOptionsPortal
                                                            open={open}
                                                            anchorRef={browserVoiceButtonRef}
                                                            menuRef={browserVoiceMenuRef}
                                                            options={browserVoiceOptions}
                                                            selectedValue={selectedBrowserVoiceValue}
                                                            defaultLabel={browserVoiceDefaultLabel}
                                                            onOpenChange={handleBrowserVoiceMenuOpenChange}
                                                            onPointerEnter={clearCollapseTimer}
                                                            onPointerLeave={() => {
                                                                if (!open) scheduleDockCollapse();
                                                            }}
                                                            t={t}
                                                        />
                                                    </div>
                                                )}
                                            </Listbox>
                                        )}
                                        <div className="relative shrink-0">
                                            <button
                                                ref={speedButtonRef}
                                                type="button"
                                                onClick={toggleSpeedMenu}
                                                className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/80 px-2.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-white"
                                                aria-label={`${fallbackText(t, 'speech_speed', '速度')} ${rate}x`}
                                                aria-haspopup="menu"
                                                aria-expanded={speedMenuOpen}
                                            >
                                                <Gauge size={14} className="text-indigo-500"/>
                                                <span>{rate}x</span>
                                                <ChevronDown size={13} className={`text-gray-400 transition-transform ${speedMenuOpen ? 'rotate-180' : ''}`}/>
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => onAutoFollowToggle?.(!autoFollowEnabled)}
                                            className={`flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2 text-xs font-medium shadow-sm transition-colors ${autoFollowEnabled
                                                ? 'border-indigo-200 bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
                                                : 'border-gray-200/80 bg-white/80 text-gray-600 hover:bg-white hover:text-indigo-600'
                                            }`}
                                            aria-label={autoFollowLabel}
                                            title={autoFollowLabel}
                                            aria-pressed={autoFollowEnabled}
                                        >
                                            <Target size={14} className={autoFollowEnabled ? 'text-indigo-500' : 'text-gray-500'}/>
                                            <span className={isVeryCompactPanel ? 'sr-only' : 'whitespace-nowrap'}>
                                                {fallbackText(t, 'speech_auto_follow_short', '跟随')}
                                            </span>
                                        </button>


                                        <button
                                            type="button"
                                            onClick={dockToRight}
                                            className="flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/70 bg-white/70 px-2 text-xs text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                                            aria-label={fallbackText(t, 'dock_speech_player', '收起到右侧')}
                                            title={fallbackText(t, 'dock_speech_player', '收起到右侧')}
                                        >
                                            <ChevronsRight size={14} strokeWidth={1.5}/>
                                        </button>
                                    </div>

                                    <div className={`flex shrink-0 items-center justify-center gap-1.5 rounded-2xl bg-white/30 p-0.5 ${isCompactPanel ? 'w-full' : ''}`}>
                                        <button
                                            type="button"
                                            onClick={onPrevious}
                                            disabled={!canGoPrevious}
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-35"
                                            aria-label={fallbackText(t, 'previous_speech_segment', '上一句')}
                                            title={fallbackText(t, 'previous_speech_segment', '上一句')}
                                        >
                                            <SkipBack size={14}/>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={isPaused ? onResume : onPause}
                                            disabled={isLoading}
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                                            aria-label={isPaused ? fallbackText(t, 'resume_speech', '继续') : fallbackText(t, 'pause_speech', '暂停')}
                                        >
                                            {isPaused ? <Play size={15}/> : <Pause size={15}/>}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onNext}
                                            disabled={!canGoNext}
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-35"
                                            aria-label={fallbackText(t, 'next_speech_segment', '下一句')}
                                            title={fallbackText(t, 'next_speech_segment', '下一句')}
                                        >
                                            <SkipForward size={14}/>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onStop}
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
                                            aria-label={fallbackText(t, 'stop_speech', '停止')}
                                        >
                                            <Square size={14}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SpeechProgressRail speechState={speechState}/>
                    </div>
                </div>
            </div>
            {speedMenuPortal}
        </>
    );

    return typeof document !== 'undefined'
        ? createPortal(speechPlayerContent, document.body)
        : speechPlayerContent;
});

SpeechPlayer.displayName = 'SpeechPlayer';

export default SpeechPlayer;
