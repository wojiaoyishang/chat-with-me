import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {GripHorizontal, PanelRightClose, PanelRightOpen, X} from 'lucide-react';

const EDGE = 10;
const MIN_WIDTH = 360;
const MIN_HEIGHT = 320;
const DEFAULT_WIDTH = 680;
const DEFAULT_HEIGHT = 620;
const MOBILE_BREAKPOINT = 768;

const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

const readLayout = (storageKey) => {
    if (typeof window === 'undefined') return {};
    try {
        const raw = window.localStorage.getItem(storageKey);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
};

const writeLayout = (storageKey, value) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
        // Window geometry is a convenience only. Storage failures must not affect execution.
    }
};

const normalizeFloating = (layout = {}) => {
    if (typeof window === 'undefined') {
        return {x: 120, y: 80, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, docked: false};
    }
    const width = clamp(Number(layout.width) || DEFAULT_WIDTH, MIN_WIDTH, window.innerWidth - EDGE * 2);
    const height = clamp(Number(layout.height) || DEFAULT_HEIGHT, MIN_HEIGHT, window.innerHeight - EDGE * 2);
    const fallbackX = Math.max(EDGE, Math.round((window.innerWidth - width) / 2));
    const fallbackY = Math.max(EDGE, Math.round((window.innerHeight - height) / 2));
    return {
        x: clamp(Number.isFinite(Number(layout.x)) ? Number(layout.x) : fallbackX, EDGE, window.innerWidth - width - EDGE),
        y: clamp(Number.isFinite(Number(layout.y)) ? Number(layout.y) : fallbackY, EDGE, window.innerHeight - height - EDGE),
        width,
        height,
        docked: layout.docked === true,
    };
};

const FloatingDockWindow = memo(({
    open = false,
    title,
    description,
    children,
    footer = null,
    headerActions = null,
    onClose,
    dockTarget = null,
    dockMount = null,
    storageKey = 'cwm:floating-window:v1',
    className = '',
}) => {
    const [layout, setLayout] = useState(() => normalizeFloating(readLayout(storageKey)));
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);
    const [dockTargetWidth, setDockTargetWidth] = useState(() => Number(dockTarget?.clientWidth || 0));
    const interactionRef = useRef(null);

    const commitLayout = useCallback((updater) => {
        setLayout((previous) => {
            const next = normalizeFloating(typeof updater === 'function' ? updater(previous) : updater);
            writeLayout(storageKey, next);
            return next;
        });
    }, [storageKey]);

    useEffect(() => {
        if (!dockTarget) {
            setDockTargetWidth(0);
            return undefined;
        }
        const measure = () => setDockTargetWidth(Number(dockTarget.clientWidth || 0));
        measure();
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
        observer?.observe(dockTarget);
        return () => observer?.disconnect();
    }, [dockTarget]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const onResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            commitLayout((previous) => previous);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [commitLayout]);

    const canDock = Boolean(dockTarget && dockMount && !isMobile && dockTargetWidth >= 720);
    const docked = Boolean(layout.docked && canDock);

    useEffect(() => {
        if (!dockMount) return undefined;

        const previousWidth = dockMount.style.width;
        const previousFlexBasis = dockMount.style.flexBasis;
        const previousTransition = dockMount.style.transition;
        const previousPointerEvents = dockMount.style.pointerEvents;

        if (!open || !docked || !dockTarget) {
            dockMount.style.width = '0px';
            dockMount.style.flexBasis = '0px';
            dockMount.style.pointerEvents = 'none';
            return () => {
                dockMount.style.width = previousWidth;
                dockMount.style.flexBasis = previousFlexBasis;
                dockMount.style.transition = previousTransition;
                dockMount.style.pointerEvents = previousPointerEvents;
            };
        }

        const maxDockWidth = Math.max(MIN_WIDTH, Math.min(760, Math.round(dockTarget.clientWidth * 0.52)));
        const width = clamp(layout.width, MIN_WIDTH, maxDockWidth);
        dockMount.style.transition = previousTransition || 'width 180ms ease, flex-basis 180ms ease';
        dockMount.style.width = `${width}px`;
        dockMount.style.flexBasis = `${width}px`;
        dockMount.style.pointerEvents = 'auto';

        return () => {
            dockMount.style.width = previousWidth;
            dockMount.style.flexBasis = previousFlexBasis;
            dockMount.style.transition = previousTransition;
            dockMount.style.pointerEvents = previousPointerEvents;
        };
    }, [dockMount, dockTarget, docked, layout.width, open]);

    useEffect(() => {
        const onPointerMove = (event) => {
            const current = interactionRef.current;
            if (!current) return;
            if (current.kind === 'drag') {
                const dx = event.clientX - current.startX;
                const dy = event.clientY - current.startY;
                setLayout((previous) => normalizeFloating({
                    ...previous,
                    docked: false,
                    x: current.startLayout.x + dx,
                    y: current.startLayout.y + dy,
                }));
            } else if (current.kind === 'resize') {
                const dx = event.clientX - current.startX;
                const dy = event.clientY - current.startY;
                setLayout((previous) => normalizeFloating({
                    ...previous,
                    width: current.startLayout.width + dx,
                    height: current.startLayout.height + dy,
                }));
            } else if (current.kind === 'dock-resize' && dockTarget) {
                const rect = dockTarget.getBoundingClientRect();
                const width = clamp(rect.right - event.clientX, MIN_WIDTH, Math.min(760, rect.width * 0.65));
                setLayout((previous) => ({...previous, width}));
            }
        };
        const onPointerUp = () => {
            const current = interactionRef.current;
            if (!current) return;
            interactionRef.current = null;
            setLayout((previous) => {
                let next = normalizeFloating(previous);
                if (current.kind === 'drag' && !isMobile) {
                    const rightDistance = window.innerWidth - (next.x + next.width);
                    if (rightDistance <= 34 && canDock) next = {...next, docked: true};
                }
                writeLayout(storageKey, next);
                return next;
            });
        };
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }, [canDock, dockTarget, isMobile, storageKey]);

    const startDrag = useCallback((event) => {
        if (docked || isMobile || event.button !== 0) return;
        interactionRef.current = {
            kind: 'drag',
            startX: event.clientX,
            startY: event.clientY,
            startLayout: {...layout},
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
    }, [docked, isMobile, layout]);

    const startResize = useCallback((event) => {
        if (isMobile || event.button !== 0) return;
        interactionRef.current = {
            kind: docked ? 'dock-resize' : 'resize',
            startX: event.clientX,
            startY: event.clientY,
            startLayout: {...layout},
        };
        event.preventDefault();
        event.stopPropagation();
    }, [docked, isMobile, layout]);

    const toggleDock = useCallback(() => {
        if (isMobile || !canDock) return;
        commitLayout((previous) => ({...previous, docked: !previous.docked}));
    }, [canDock, commitLayout, isMobile]);

    const panelStyle = useMemo(() => {
        if (isMobile) {
            return {position: 'fixed', inset: '8px', zIndex: 2147483200};
        }
        if (docked) {
            return {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 20,
            };
        }
        return {
            position: 'fixed',
            left: layout.x,
            top: layout.y,
            width: layout.width,
            height: layout.height,
            zIndex: 2147483200,
        };
    }, [docked, isMobile, layout]);

    if (!open || typeof document === 'undefined') return null;

    const panel = (
        <section
            role="dialog"
            aria-modal="false"
            aria-label={typeof title === 'string' ? title : 'Execution'}
            className={`flex min-h-0 flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl ${docked ? 'rounded-none border-y-0 border-r-0' : 'rounded-2xl'} ${className}`}
            style={panelStyle}
        >
            {docked && !isMobile && (
                <div
                    className="absolute inset-y-0 left-0 z-20 w-1.5 cursor-ew-resize hover:bg-blue-400/30"
                    onPointerDown={startResize}
                />
            )}
            <header
                className={`flex shrink-0 select-none items-start gap-3 border-b border-gray-100 px-4 py-3 ${!docked && !isMobile ? 'cursor-move' : ''}`}
                onPointerDown={startDrag}
            >
                <GripHorizontal className="mt-1 h-4 w-4 shrink-0 text-gray-300"/>
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-800">{title}</div>
                    {description && <div className="mt-0.5 line-clamp-2 text-xs leading-5 text-gray-400">{description}</div>}
                </div>
                {headerActions && (
                    <div
                        className="flex shrink-0 items-center gap-1"
                        onPointerDown={(event) => event.stopPropagation()}
                    >
                        {headerActions}
                    </div>
                )}
                {canDock && (
                    <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={toggleDock}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        title={docked ? '取消停靠' : '停靠到右侧'}
                    >
                        {docked ? <PanelRightClose className="h-4 w-4"/> : <PanelRightOpen className="h-4 w-4"/>}
                    </button>
                )}
                <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    title="关闭"
                >
                    <X className="h-4 w-4"/>
                </button>
            </header>

            <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
            {footer && <footer className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">{footer}</footer>}

            {!docked && !isMobile && (
                <div
                    className="absolute bottom-0 right-0 h-5 w-5 cursor-se-resize"
                    onPointerDown={startResize}
                    aria-hidden="true"
                />
            )}
        </section>
    );

    return createPortal(panel, docked && dockMount ? dockMount : document.body);
});

FloatingDockWindow.displayName = 'FloatingDockWindow';
export default FloatingDockWindow;
