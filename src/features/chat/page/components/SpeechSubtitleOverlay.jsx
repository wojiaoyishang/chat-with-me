import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
    DEFAULT_SUBTITLE_POSITION,
    readSubtitlePosition,
    readSubtitleStyle,
    saveSubtitlePosition,
    SUBTITLE_POSITION_CHANGE_EVENT,
    SUBTITLE_PREVIEW_EVENT,
    SUBTITLE_QUICK_POSITIONS,
    SUBTITLE_STYLE_CHANGE_EVENT,
    normalizeSubtitlePosition,
    normalizeSubtitleStyle,
} from '@/features/chat/speech/subtitleSettings.js';

const OVERLAY_Z_INDEX = 2147483610;
const MENU_Z_INDEX = 2147483620;
const MENU_MARGIN = 8;

const fallbackText = (t, key, fallback) => {
    const value = t?.(key);
    return value && value !== key ? value : fallback;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getViewportMetrics = () => {
    if (typeof window === 'undefined') {
        return {width: 1024, height: 768, offsetLeft: 0, offsetTop: 0};
    }

    const viewport = window.visualViewport;
    return {
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
        offsetLeft: viewport?.offsetLeft ?? 0,
        offsetTop: viewport?.offsetTop ?? 0,
    };
};

const getCurrentSegment = (speechState) => {
    const segments = Array.isArray(speechState?.segments) ? speechState.segments : [];
    if (!segments.length) return null;

    if (speechState?.currentSegmentId !== undefined && speechState?.currentSegmentId !== null) {
        const matched = segments.find(item => String(item.id) === String(speechState.currentSegmentId));
        if (matched) return matched;
    }

    const position = Number(speechState?.currentSegmentPosition);
    if (Number.isInteger(position) && position >= 0 && position < segments.length) {
        return segments[position];
    }

    const index = Number(speechState?.currentSegmentIndex);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) {
        return segments[index];
    }

    return null;
};

const getQuickPositionLabel = (t, id) => {
    const labels = {
        'top-left': ['speech_subtitle_position_top_left', '左上'],
        'top-center': ['speech_subtitle_position_top_center', '顶部居中'],
        'top-right': ['speech_subtitle_position_top_right', '右上'],
        'middle-left': ['speech_subtitle_position_middle_left', '左侧居中'],
        center: ['speech_subtitle_position_center', '屏幕中央'],
        'middle-right': ['speech_subtitle_position_middle_right', '右侧居中'],
        'bottom-left': ['speech_subtitle_position_bottom_left', '左下'],
        'bottom-center': ['speech_subtitle_position_bottom_center', '底部居中'],
        'bottom-right': ['speech_subtitle_position_bottom_right', '右下'],
    };
    const [key, fallback] = labels[id] || labels['bottom-center'];
    return fallbackText(t, key, fallback);
};

const SpeechSubtitleOverlay = memo(({speechState, enabled = true, t}) => {
    const subtitleRef = useRef(null);
    const dragRef = useRef(null);
    const [position, setPosition] = useState(readSubtitlePosition);
    const positionRef = useRef(position);
    const [subtitleStyle, setSubtitleStyle] = useState(readSubtitleStyle);
    const [viewport, setViewport] = useState(getViewportMetrics);
    const [contextMenu, setContextMenu] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const handlePositionChange = (event) => {
            const next = normalizeSubtitlePosition(event?.detail);
            positionRef.current = next;
            setPosition(next);
        };
        const handleStyleChange = (event) => setSubtitleStyle(normalizeSubtitleStyle(event?.detail));
        const handlePreview = (event) => setPreviewVisible(Boolean(event?.detail?.visible));

        window.addEventListener(SUBTITLE_POSITION_CHANGE_EVENT, handlePositionChange);
        window.addEventListener(SUBTITLE_STYLE_CHANGE_EVENT, handleStyleChange);
        window.addEventListener(SUBTITLE_PREVIEW_EVENT, handlePreview);
        return () => {
            window.removeEventListener(SUBTITLE_POSITION_CHANGE_EVENT, handlePositionChange);
            window.removeEventListener(SUBTITLE_STYLE_CHANGE_EVENT, handleStyleChange);
            window.removeEventListener(SUBTITLE_PREVIEW_EVENT, handlePreview);
        };
    }, []);

    const currentSegment = useMemo(() => getCurrentSegment(speechState), [speechState]);
    const isActive = speechState?.status === 'playing' || speechState?.status === 'paused';
    const testText = fallbackText(t, 'speech_subtitle_test_text', '字幕样式测试');
    const actualText = String(currentSegment?.text || '').trim();
    const displayText = previewVisible ? testText : (actualText || (isDragging ? testText : ''));
    const visible = Boolean((enabled && isActive && actualText) || previewVisible || isDragging);

    const persistPosition = useCallback((nextPosition) => {
        const normalized = saveSubtitlePosition(nextPosition);
        positionRef.current = normalized;
        setPosition(normalized);
        return normalized;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const updateViewport = () => setViewport(getViewportMetrics());
        updateViewport();
        window.addEventListener('resize', updateViewport);
        window.visualViewport?.addEventListener?.('resize', updateViewport);
        window.visualViewport?.addEventListener?.('scroll', updateViewport);
        return () => {
            window.removeEventListener('resize', updateViewport);
            window.visualViewport?.removeEventListener?.('resize', updateViewport);
            window.visualViewport?.removeEventListener?.('scroll', updateViewport);
        };
    }, []);

    useEffect(() => {
        if (!contextMenu || typeof window === 'undefined') return undefined;

        const closeMenu = () => setContextMenu(null);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeMenu();
        };

        window.addEventListener('pointerdown', closeMenu);
        window.addEventListener('contextmenu', closeMenu);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', closeMenu);
        return () => {
            window.removeEventListener('pointerdown', closeMenu);
            window.removeEventListener('contextmenu', closeMenu);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', closeMenu);
        };
    }, [contextMenu]);

    const updatePositionFromPointer = useCallback((event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        // 字幕的位置只限制中心点位于可视视口的 0–100%，不再根据字幕尺寸或屏幕 padding 夹紧。
        const centerX = clamp(
            event.clientX - drag.offsetX,
            viewport.offsetLeft,
            viewport.offsetLeft + viewport.width,
        );
        const centerY = clamp(
            event.clientY - drag.offsetY,
            viewport.offsetTop,
            viewport.offsetTop + viewport.height,
        );

        const nextPosition = {
            x: viewport.width > 0 ? (centerX - viewport.offsetLeft) / viewport.width : DEFAULT_SUBTITLE_POSITION.x,
            y: viewport.height > 0 ? (centerY - viewport.offsetTop) / viewport.height : DEFAULT_SUBTITLE_POSITION.y,
        };
        drag.latestPosition = nextPosition;
        positionRef.current = nextPosition;
        setPosition(nextPosition);
    }, [viewport]);

    const handlePointerDown = useCallback((event) => {
        if (event.button !== 0) return;
        const rect = subtitleRef.current?.getBoundingClientRect();
        if (!rect) return;

        event.preventDefault();
        setContextMenu(null);
        dragRef.current = {
            pointerId: event.pointerId,
            offsetX: event.clientX - (rect.left + rect.width / 2),
            offsetY: event.clientY - (rect.top + rect.height / 2),
        };
        setIsDragging(true);
        event.currentTarget.setPointerCapture?.(event.pointerId);
    }, []);

    const handlePointerMove = useCallback((event) => {
        if (!dragRef.current) return;
        event.preventDefault();
        updatePositionFromPointer(event);
    }, [updatePositionFromPointer]);

    const finishDrag = useCallback((event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        updatePositionFromPointer(event);
        const finalPosition = drag.latestPosition || positionRef.current || DEFAULT_SUBTITLE_POSITION;
        dragRef.current = null;
        setIsDragging(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
        persistPosition(finalPosition);
    }, [persistPosition, updatePositionFromPointer]);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        const viewportMetrics = getViewportMetrics();
        const compact = viewportMetrics.width <= 640;
        const menuWidth = compact
            ? Math.max(140, viewportMetrics.width - MENU_MARGIN * 2)
            : Math.min(228, Math.max(196, viewportMetrics.width - MENU_MARGIN * 2));
        const menuHeight = 216;
        const minLeft = viewportMetrics.offsetLeft + MENU_MARGIN;
        const minTop = viewportMetrics.offsetTop + MENU_MARGIN;
        const left = compact
            ? viewportMetrics.offsetLeft + (viewportMetrics.width - menuWidth) / 2
            : clamp(event.clientX, minLeft, Math.max(minLeft, viewportMetrics.offsetLeft + viewportMetrics.width - menuWidth - MENU_MARGIN));
        const top = compact
            ? Math.max(minTop, viewportMetrics.offsetTop + viewportMetrics.height - menuHeight - MENU_MARGIN)
            : clamp(event.clientY, minTop, Math.max(minTop, viewportMetrics.offsetTop + viewportMetrics.height - menuHeight - MENU_MARGIN));
        setContextMenu({left, top, width: menuWidth});
    }, []);

    const selectQuickPosition = useCallback((item) => {
        persistPosition({x: item.x, y: item.y});
        setContextMenu(null);
    }, [persistPosition]);

    if (!visible || !displayText || typeof document === 'undefined') return null;

    const centerX = viewport.offsetLeft + position.x * viewport.width;
    const centerY = viewport.offsetTop + position.y * viewport.height;
    const dragHint = fallbackText(t, 'speech_subtitle_drag_hint', '拖动字幕调整位置，右键快速定位');
    const backgroundAlpha = subtitleStyle.backgroundOpacity / 100;

    const overlay = (
        <>
            <div
                data-tts-overlay="true"
                className="pointer-events-none fixed inset-0"
                style={{zIndex: OVERLAY_Z_INDEX}}
                aria-live="polite"
            >
                <div
                    className="pointer-events-none absolute h-0 w-0"
                    style={{
                        left: `${centerX}px`,
                        top: `${centerY}px`,
                    }}
                >
                    <div
                        ref={subtitleRef}
                        data-dragging={isDragging ? 'true' : 'false'}
                        role="status"
                        tabIndex={0}
                        className="pointer-events-auto touch-none select-none overflow-y-auto overscroll-contain rounded-xl px-3 py-2 text-center font-medium text-white shadow-2xl outline-none backdrop-blur-sm transition-[box-shadow,background-color] focus-visible:ring-2 focus-visible:ring-amber-300 data-[dragging=true]:ring-2 data-[dragging=true]:ring-amber-300 sm:px-4 sm:py-2.5"
                        style={{
                            transform: 'translate(-50%, -50%)',
                            width: 'max-content',
                            maxWidth: `${subtitleStyle.maxWidthVw}dvw`,
                            maxHeight: `${subtitleStyle.maxHeightVh}dvh`,
                            boxSizing: 'border-box',
                            overflowWrap: 'anywhere',
                            cursor: isDragging ? 'grabbing' : 'move',
                            WebkitUserSelect: 'none',
                            userSelect: 'none',
                            fontSize: `${subtitleStyle.fontSizePx}px`,
                            lineHeight: subtitleStyle.lineHeight,
                            backgroundColor: `rgba(0, 0, 0, ${backgroundAlpha})`,
                        }}
                        title={dragHint}
                        aria-label={`${dragHint}：${displayText}`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={finishDrag}
                        onPointerCancel={finishDrag}
                        onContextMenu={handleContextMenu}
                    >
                        {displayText}
                    </div>
                </div>
            </div>

            {contextMenu && (
                <div
                    className="fixed rounded-2xl border border-white/70 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur-xl"
                    style={{left: contextMenu.left, top: contextMenu.top, width: contextMenu.width, zIndex: MENU_Z_INDEX}}
                    onPointerDown={(event) => event.stopPropagation()}
                    onContextMenu={(event) => event.preventDefault()}
                    role="menu"
                    aria-label={fallbackText(t, 'speech_subtitle_quick_position', '快速定位字幕')}
                >
                    <div className="mb-2 px-1 text-xs font-medium text-white/70">
                        {fallbackText(t, 'speech_subtitle_quick_position', '快速定位字幕')}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                        {SUBTITLE_QUICK_POSITIONS.map(item => {
                            const active = Math.abs(position.x - item.x) < 0.04 && Math.abs(position.y - item.y) < 0.04;
                            const label = getQuickPositionLabel(t, item.id);
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="menuitem"
                                    onClick={() => selectQuickPosition(item)}
                                    className={`group flex h-12 cursor-pointer items-center justify-center rounded-xl border transition-colors ${active
                                        ? 'border-amber-300/80 bg-amber-300/20'
                                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                                    }`}
                                    aria-label={label}
                                    title={label}
                                >
                                    <span className="relative h-5 w-8 rounded border border-white/25 bg-white/5">
                                        <span
                                            className={`absolute h-1.5 w-1.5 rounded-full ${active ? 'bg-amber-300' : 'bg-white/75 group-hover:bg-white'}`}
                                            style={{
                                                left: `${15 + item.column * 35}%`,
                                                top: `${15 + item.row * 35}%`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-2 px-1 text-[11px] leading-relaxed text-white/50">
                        {fallbackText(t, 'speech_subtitle_drag_hint', '拖动字幕调整位置，右键快速定位')}
                    </div>
                </div>
            )}
        </>
    );

    return createPortal(overlay, document.body);
});

SpeechSubtitleOverlay.displayName = 'SpeechSubtitleOverlay';

export default SpeechSubtitleOverlay;
