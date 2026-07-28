import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Card} from '@/components/ui/card';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

const MAX_VISIBLE_MARKERS = 9;
const MAX_COLLAPSED_MARKERS = 25;
const MARKER_WIDTHS_BY_DISTANCE = [34, 28, 22, 16, 12];
const COLLAPSE_DELAY_MS = 220;
const NAVIGATOR_IDLE_DELAY_MS = 2600;
const MARKER_SLOT_HEIGHT_PX = 20;
const WHEEL_ACCELERATION = 0.07;
const WHEEL_FRICTION = 0.86;
const WHEEL_MAX_VELOCITY = 22;
const WHEEL_STOP_VELOCITY = 0.12;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeWheelDelta = (event) => {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * 220;
    return event.deltaY;
};

const QuickUserMessageNavigator = memo(({
    items = [],
    activeMessageId,
    onSelect,
    visible = true,
    t,
}) => {
    const wheelVelocityRef = useRef(0);
    const wheelOffsetRef = useRef(0);
    const wheelFrameRef = useRef(null);
    const wheelLastFrameTimeRef = useRef(0);
    const cursorIndexRef = useRef(0);
    const markerStackRef = useRef(null);
    const collapseTimerRef = useRef(null);
    const idleTimerRef = useRef(null);
    const activityFrameRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAwake, setIsAwake] = useState(true);
    const userItems = useMemo(() => items.filter(item => item?.role === 'user'), [items]);
    const itemIndexById = useMemo(() => new Map(
        items.map((item, index) => [item?.messageId, index]),
    ), [items]);
    const userIndexById = useMemo(() => new Map(
        userItems.map((item, index) => [item?.messageId, index]),
    ), [userItems]);
    const effectiveActiveMessageId = useMemo(() => {
        const activeItemIndex = itemIndexById.get(activeMessageId);
        const activeItem = activeItemIndex === undefined ? null : items[activeItemIndex];
        if (!activeItem) return activeMessageId;

        const activeOrderIndex = Number(activeItem.orderIndex ?? -1);
        let low = 0;
        let high = userItems.length - 1;
        let nearestUserIndex = -1;
        while (low <= high) {
            const middle = Math.floor((low + high) / 2);
            if (Number(userItems[middle]?.orderIndex ?? -1) <= activeOrderIndex) {
                nearestUserIndex = middle;
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }
        return userItems[nearestUserIndex]?.messageId || activeMessageId;
    }, [activeMessageId, itemIndexById, items, userItems]);

    const activeIndex = useMemo(
        () => Math.max(0, userIndexById.get(effectiveActiveMessageId) ?? -1),
        [effectiveActiveMessageId, userIndexById]
    );
    const [cursorIndex, setCursorIndex] = useState(activeIndex);

    const activeItemIndex = useMemo(() => {
        const exactIndex = itemIndexById.get(activeMessageId);
        if (exactIndex !== undefined) return exactIndex;
        return Math.max(0, itemIndexById.get(effectiveActiveMessageId) ?? -1);
    }, [activeMessageId, effectiveActiveMessageId, itemIndexById]);

    const collapsedMarkerBuckets = useMemo(() => {
        if (items.length === 0) return [];
        const markerCount = Math.min(MAX_COLLAPSED_MARKERS, items.length);

        return Array.from({length: markerCount}, (_, markerIndex) => {
            const startIndex = Math.floor(markerIndex * items.length / markerCount);
            const endIndex = Math.max(
                startIndex + 1,
                Math.floor((markerIndex + 1) * items.length / markerCount)
            );
            const bucket = items.slice(startIndex, endIndex);

            return {
                key: `${startIndex}-${endIndex}`,
                startIndex,
                endIndex,
                containsUser: bucket.some(item => item?.role === 'user'),
            };
        });
    }, [items]);
    const collapsedMarkers = useMemo(() => collapsedMarkerBuckets.map(bucket => ({
        ...bucket,
        containsActive: activeItemIndex >= bucket.startIndex && activeItemIndex < bucket.endIndex,
    })), [activeItemIndex, collapsedMarkerBuckets]);

    const applyWheelOffset = useCallback((offset) => {
        if (!markerStackRef.current) return;
        markerStackRef.current.style.transform = `translate3d(0, ${-offset}px, 0)`;
    }, []);

    const stopWheelAnimation = useCallback((resetOffset = false) => {
        if (wheelFrameRef.current) {
            window.cancelAnimationFrame(wheelFrameRef.current);
            wheelFrameRef.current = null;
        }
        wheelVelocityRef.current = 0;
        wheelLastFrameTimeRef.current = 0;
        if (resetOffset) {
            wheelOffsetRef.current = 0;
            applyWheelOffset(0);
        }
    }, [applyWheelOffset]);

    useEffect(() => {
        stopWheelAnimation(true);
        cursorIndexRef.current = activeIndex;
        setCursorIndex(activeIndex);
    }, [activeIndex, stopWheelAnimation]);

    useEffect(() => {
        const nextIndex = clamp(cursorIndexRef.current, 0, Math.max(0, userItems.length - 1));
        cursorIndexRef.current = nextIndex;
        setCursorIndex(nextIndex);
        stopWheelAnimation(true);
    }, [stopWheelAnimation, userItems.length]);

    const clearIdleTimer = useCallback(() => {
        if (!idleTimerRef.current) return;
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
    }, []);

    const scheduleIdle = useCallback(() => {
        clearIdleTimer();
        if (!visible || isExpanded || userItems.length === 0) return;

        idleTimerRef.current = window.setTimeout(() => {
            setIsAwake(false);
            idleTimerRef.current = null;
        }, NAVIGATOR_IDLE_DELAY_MS);
    }, [clearIdleTimer, isExpanded, userItems.length, visible]);

    const wakeNavigator = useCallback((restartIdleTimer = true) => {
        setIsAwake(true);
        clearIdleTimer();
        if (restartIdleTimer) scheduleIdle();
    }, [clearIdleTimer, scheduleIdle]);

    useEffect(() => {
        if (isExpanded) {
            setIsAwake(true);
            clearIdleTimer();
            return;
        }
        scheduleIdle();
    }, [clearIdleTimer, isExpanded, scheduleIdle]);

    useEffect(() => {
        if (!visible || userItems.length === 0) return undefined;

        const handlePageActivity = () => {
            if (activityFrameRef.current) return;
            activityFrameRef.current = window.requestAnimationFrame(() => {
                activityFrameRef.current = null;
                wakeNavigator(true);
            });
        };

        // ChatPage 的消息区是内部滚动容器；捕获阶段可以同时监听窗口和嵌套容器滚动。
        window.addEventListener('scroll', handlePageActivity, true);
        window.addEventListener('wheel', handlePageActivity, true);
        window.addEventListener('touchmove', handlePageActivity, true);

        return () => {
            window.removeEventListener('scroll', handlePageActivity, true);
            window.removeEventListener('wheel', handlePageActivity, true);
            window.removeEventListener('touchmove', handlePageActivity, true);
        };
    }, [userItems.length, visible, wakeNavigator]);

    useEffect(() => {
        if (!visible || userItems.length === 0) return;
        wakeNavigator(true);
    }, [activeItemIndex, userItems.length, visible, wakeNavigator]);

    useEffect(() => () => {
        if (collapseTimerRef.current) window.clearTimeout(collapseTimerRef.current);
        clearIdleTimer();
        if (activityFrameRef.current) window.cancelAnimationFrame(activityFrameRef.current);
        stopWheelAnimation(false);
    }, [clearIdleTimer, stopWheelAnimation]);

    const visibleSlots = useMemo(() => {
        const half = Math.floor(MAX_VISIBLE_MARKERS / 2);
        return Array.from({length: MAX_VISIBLE_MARKERS}, (_, slotIndex) => {
            const offset = slotIndex - half;
            const absoluteIndex = cursorIndex + offset;
            return {
                offset,
                absoluteIndex,
                item: absoluteIndex >= 0 && absoluteIndex < userItems.length
                    ? userItems[absoluteIndex]
                    : null,
            };
        });
    }, [cursorIndex, userItems]);

    const clearCollapseTimer = () => {
        if (!collapseTimerRef.current) return;
        window.clearTimeout(collapseTimerRef.current);
        collapseTimerRef.current = null;
    };

    const expandNavigator = () => {
        clearCollapseTimer();
        wakeNavigator(false);
        setIsExpanded(true);
    };

    const scheduleCollapse = () => {
        clearCollapseTimer();
        collapseTimerRef.current = window.setTimeout(() => {
            setIsExpanded(false);
            collapseTimerRef.current = null;
        }, COLLAPSE_DELAY_MS);
    };

    const runWheelAnimation = useCallback((timestamp) => {
        const lastTimestamp = wheelLastFrameTimeRef.current || timestamp;
        const frameScale = clamp((timestamp - lastTimestamp) / (1000 / 60), 0.5, 2);
        wheelLastFrameTimeRef.current = timestamp;

        let velocity = wheelVelocityRef.current;
        let offset = wheelOffsetRef.current + velocity * frameScale;
        let nextIndex = cursorIndexRef.current;
        const lastIndex = Math.max(0, userItems.length - 1);

        while (offset >= MARKER_SLOT_HEIGHT_PX && nextIndex < lastIndex) {
            offset -= MARKER_SLOT_HEIGHT_PX;
            nextIndex += 1;
        }
        while (offset <= -MARKER_SLOT_HEIGHT_PX && nextIndex > 0) {
            offset += MARKER_SLOT_HEIGHT_PX;
            nextIndex -= 1;
        }

        if ((nextIndex === lastIndex && offset > 0) || (nextIndex === 0 && offset < 0)) {
            offset = 0;
            velocity = 0;
        }

        if (nextIndex !== cursorIndexRef.current) {
            cursorIndexRef.current = nextIndex;
            setCursorIndex(nextIndex);
        }

        velocity *= Math.pow(WHEEL_FRICTION, frameScale);

        if (Math.abs(velocity) < WHEEL_STOP_VELOCITY) {
            if (Math.abs(offset) >= MARKER_SLOT_HEIGHT_PX / 2) {
                const direction = offset > 0 ? 1 : -1;
                const settledIndex = clamp(nextIndex + direction, 0, lastIndex);
                if (settledIndex !== nextIndex) {
                    offset -= direction * MARKER_SLOT_HEIGHT_PX;
                    cursorIndexRef.current = settledIndex;
                    setCursorIndex(settledIndex);
                }
            }

            offset *= 0.68;
            if (Math.abs(offset) < 0.35) {
                wheelOffsetRef.current = 0;
                wheelVelocityRef.current = 0;
                wheelLastFrameTimeRef.current = 0;
                wheelFrameRef.current = null;
                applyWheelOffset(0);
                return;
            }
        }

        wheelOffsetRef.current = offset;
        wheelVelocityRef.current = velocity;
        applyWheelOffset(offset);
        wheelFrameRef.current = window.requestAnimationFrame(runWheelAnimation);
    }, [applyWheelOffset, userItems.length]);

    const handleWheel = (event) => {
        if (userItems.length <= 1 || Math.abs(event.deltaY) < 0.5) return;
        event.preventDefault();
        event.stopPropagation();
        wakeNavigator(false);

        const delta = normalizeWheelDelta(event);
        wheelVelocityRef.current = clamp(
            wheelVelocityRef.current + delta * WHEEL_ACCELERATION,
            -WHEEL_MAX_VELOCITY,
            WHEEL_MAX_VELOCITY,
        );

        if (!wheelFrameRef.current) {
            wheelLastFrameTimeRef.current = 0;
            wheelFrameRef.current = window.requestAnimationFrame(runWheelAnimation);
        }
    };

    if (!visible || userItems.length === 0) return null;

    const progressRatio = items.length <= 1
        ? 0
        : clamp(activeItemIndex / (items.length - 1), 0, 1);
    const progressPercent = progressRatio * 100;
    const thumbPercent = 7 + progressRatio * 86;

    return (
        <aside
            className={`pointer-events-auto absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 transition-[width] duration-300 ease-out md:block ${
                isExpanded ? 'w-[76px]' : 'w-5'
            }`}
            aria-label={t?.('quick_message_navigation') || '快速消息导航'}
            onMouseEnter={expandNavigator}
            onMouseLeave={scheduleCollapse}
            onFocusCapture={expandNavigator}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) scheduleCollapse();
            }}
        >
            <div className="relative flex h-[220px] w-full items-center justify-end overflow-visible">
                <button
                    type="button"
                    onClick={expandNavigator}
                    className={`absolute inset-y-0 right-0 flex w-5 items-center justify-end rounded-l-full outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
                        isExpanded ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                    aria-label={t?.('expand_quick_message_navigation') || '展开快速消息导航'}
                    aria-expanded={isExpanded}
                    aria-valuemin={1}
                    aria-valuemax={items.length}
                    aria-valuenow={Math.min(items.length, activeItemIndex + 1)}
                >
                    <span
                        className={`relative mr-0.5 block h-32 w-3 origin-right will-change-transform transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isAwake
                                ? 'translate-x-0 scale-y-100 opacity-90 blur-0'
                                : 'translate-x-2 scale-y-90 opacity-0 blur-[0.35px]'
                        }`}
                        aria-hidden="true"
                    >
                        <span className="absolute inset-y-0 right-0 w-[11px] overflow-hidden rounded-l-full border-y border-l border-border/30 bg-background/65 shadow-[0_10px_28px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-xl">
                            <span className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 overflow-hidden rounded-full bg-muted-foreground/10">
                                <span
                                    className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-primary/5 via-primary/20 to-primary/45 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={{height: `${progressPercent}%`}}
                                />
                            </span>

                            {collapsedMarkers.map((marker, markerIndex) => {
                                const markerTop = collapsedMarkers.length <= 1
                                    ? 50
                                    : 8 + (markerIndex / (collapsedMarkers.length - 1)) * 84;
                                const markerClass = marker.containsUser
                                    ? 'h-[3px] w-[3px] bg-primary/22'
                                    : 'h-[2px] w-[2px] bg-muted-foreground/12';

                                return (
                                    <span
                                        key={marker.key}
                                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[top,opacity,background-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${markerClass}`}
                                        style={{top: `${markerTop}%`}}
                                    />
                                );
                            })}

                            <span
                                className="absolute left-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 bg-background/90 shadow-[0_0_0_2px_hsl(var(--background)/0.45),0_0_10px_hsl(var(--primary)/0.2)] transition-[top,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                style={{top: `${thumbPercent}%`}}
                            >
                                <span className="absolute inset-[2px] rounded-full bg-primary/75"/>
                            </span>
                        </span>
                    </span>
                </button>

                <Card
                    className={`absolute right-2 top-1/2 w-14 -translate-y-1/2 gap-0 border-border/60 bg-background/80 px-2 py-3 shadow-md backdrop-blur-md transition-[opacity,transform] duration-300 ease-out ${
                        isExpanded
                            ? 'translate-x-0 scale-100 opacity-100'
                            : 'pointer-events-none translate-x-5 scale-95 opacity-0'
                    }`}
                    onWheel={handleWheel}
                    onPointerDown={() => stopWheelAnimation(true)}
                    aria-hidden={!isExpanded}
                >
                    <div className="pointer-events-none absolute bottom-3 left-1/2 top-3 -translate-x-1/2 border-l border-dashed border-border"/>
                    <div
                        ref={markerStackRef}
                        className="relative z-[1] flex flex-col items-center will-change-transform"
                    >
                        {visibleSlots.map(({item, absoluteIndex, offset}, slotIndex) => {
                            if (!item) {
                                return <div key={`empty-${slotIndex}`} className="h-5 w-full" aria-hidden="true"/>;
                            }

                            const isActive = item.messageId === effectiveActiveMessageId;
                            const isCursor = absoluteIndex === cursorIndex;
                            const markerWidth = MARKER_WIDTHS_BY_DISTANCE[Math.min(Math.abs(offset), MARKER_WIDTHS_BY_DISTANCE.length - 1)];

                            return (
                                <Tooltip key={item.messageId}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            onClick={() => onSelect?.(item.messageId)}
                                            className="group flex h-5 w-full cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                            aria-label={`${absoluteIndex + 1}. ${item.preview || ''}`}
                                            tabIndex={isExpanded ? 0 : -1}
                                        >
                                            <span
                                                className={`block h-1 origin-center rounded-full transition-[width,height,transform,background-color,opacity] duration-150 group-hover:h-1.5 group-hover:scale-x-125 group-focus-visible:h-1.5 group-focus-visible:scale-x-125 ${
                                                    isActive
                                                        ? 'h-1.5 bg-primary'
                                                        : isCursor
                                                            ? 'bg-muted-foreground/60'
                                                            : 'bg-muted-foreground/30 group-hover:bg-primary/70 group-focus-visible:bg-primary/70'
                                                }`}
                                                style={{width: `${markerWidth}px`}}
                                            />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left" sideOffset={10} className="max-w-72">
                                        <div className="max-w-64 truncate">
                                            {item.preview || (t?.('empty_message') || '空消息')}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </aside>
    );
});

QuickUserMessageNavigator.displayName = 'QuickUserMessageNavigator';

export default QuickUserMessageNavigator;
