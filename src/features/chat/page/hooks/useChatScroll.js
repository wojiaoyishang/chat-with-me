import {useCallback, useEffect, useRef, useState} from 'react';

const BOTTOM_EPSILON = 1.5;
const LARGE_SCROLL_DISTANCE = 6000;
const SETTLE_MAX_MS = 1400;
const SETTLE_STABLE_FRAMES = 6;

const getBottomScrollTop = (node) => Math.max(0, node.scrollHeight - node.clientHeight);

const useChatScroll = (messagesContainerRef) => {
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
    const [chatBoxHeight, setChatBoxHeight] = useState(0);

    const isAutoScrollEnabledRef = useRef(true);
    const scrollCheckTimeoutRef = useRef(null);
    const pendingScrollRef = useRef(false);
    const pendingScrollTimerRef = useRef(null);
    const chatBoxHeightRef = useRef(0);
    const lastScrollTopRef = useRef(0);
    const scrollDirectionRef = useRef('down');
    const scrollAnimationFrameRef = useRef(null);
    const settleAnimationFrameRef = useRef(null);
    const programmaticBottomScrollRef = useRef(false);

    const isStreamingRef = useRef(false);
    const streamingTimerRef = useRef(null);
    const lastStreamingCheckRef = useRef(0);

    const cancelScrollAnimation = useCallback(() => {
        if (scrollAnimationFrameRef.current !== null) {
            cancelAnimationFrame(scrollAnimationFrameRef.current);
            scrollAnimationFrameRef.current = null;
        }
    }, []);

    const cancelBottomSettle = useCallback(() => {
        if (settleAnimationFrameRef.current !== null) {
            cancelAnimationFrame(settleAnimationFrameRef.current);
            settleAnimationFrameRef.current = null;
        }
    }, []);

    const cancelPendingScrollTimer = useCallback(() => {
        if (pendingScrollTimerRef.current !== null) {
            clearTimeout(pendingScrollTimerRef.current);
            pendingScrollTimerRef.current = null;
        }
    }, []);

    const checkScrollPosition = useCallback((immediate = false) => {
        if (!messagesContainerRef.current) return;
        const {scrollTop, scrollHeight, clientHeight} = messagesContainerRef.current;
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;

        if (scrollTop < lastScrollTopRef.current) {
            scrollDirectionRef.current = 'up';
        } else if (scrollTop > lastScrollTopRef.current) {
            scrollDirectionRef.current = 'down';
        }
        lastScrollTopRef.current = scrollTop;

        const THRESHOLD = 100;
        const isNearBottom = distanceToBottom <= THRESHOLD;
        const isScrollingDownNearBottom = scrollDirectionRef.current === 'down' && distanceToBottom < 200;
        if (programmaticBottomScrollRef.current) {
            isAutoScrollEnabledRef.current = true;
        } else {
            isAutoScrollEnabledRef.current = isNearBottom || isScrollingDownNearBottom;
        }

        const shouldShowButton = !programmaticBottomScrollRef.current && distanceToBottom > THRESHOLD;
        if (immediate) {
            setShowScrollToBottomButton(shouldShowButton);
        } else {
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current);
            }
            scrollCheckTimeoutRef.current = setTimeout(() => {
                setShowScrollToBottomButton(shouldShowButton);
            }, 150);
        }
    }, [messagesContainerRef]);

    const settleAtBottom = useCallback((maxDuration = SETTLE_MAX_MS) => {
        cancelBottomSettle();

        const startedAt = performance.now();
        let lastScrollHeight = -1;
        let stableFrames = 0;

        const settle = (now) => {
            const container = messagesContainerRef.current;
            if (!container || !isAutoScrollEnabledRef.current) {
                settleAnimationFrameRef.current = null;
                programmaticBottomScrollRef.current = false;
                return;
            }

            const targetScrollTop = getBottomScrollTop(container);
            const distanceToBottom = targetScrollTop - container.scrollTop;
            if (Math.abs(distanceToBottom) > BOTTOM_EPSILON) {
                // 直接赋值，避免 CSS scroll-behavior 或浏览器平滑滚动仍朝旧 scrollHeight 前进。
                container.scrollTop = targetScrollTop;
            }

            const heightStable = Math.abs(container.scrollHeight - lastScrollHeight) <= BOTTOM_EPSILON;
            const positionStable = Math.abs(getBottomScrollTop(container) - container.scrollTop) <= BOTTOM_EPSILON;
            stableFrames = heightStable && positionStable ? stableFrames + 1 : 0;
            lastScrollHeight = container.scrollHeight;

            if (stableFrames >= SETTLE_STABLE_FRAMES || now - startedAt >= maxDuration) {
                settleAnimationFrameRef.current = null;
                pendingScrollRef.current = false;
                isAutoScrollEnabledRef.current = true;
                programmaticBottomScrollRef.current = false;
                checkScrollPosition(true);
                return;
            }

            settleAnimationFrameRef.current = requestAnimationFrame(settle);
        };

        settleAnimationFrameRef.current = requestAnimationFrame(settle);
    }, [cancelBottomSettle, checkScrollPosition, messagesContainerRef]);

    const smoothScrollToBottom = useCallback((isStreaming = false) => {
        const container = messagesContainerRef.current;
        if (!container) return;

        cancelScrollAnimation();
        cancelBottomSettle();
        programmaticBottomScrollRef.current = true;

        const startScrollTop = container.scrollTop;
        const initialTarget = getBottomScrollTop(container);
        const initialDistance = initialTarget - startScrollTop;

        if (Math.abs(initialDistance) <= BOTTOM_EPSILON) {
            container.scrollTop = initialTarget;
            isAutoScrollEnabledRef.current = true;
            pendingScrollRef.current = false;
            settleAtBottom();
            return;
        }

        // 流式输出或超长页面优先保证一次到位，不做跨越数万像素的长动画。
        if (isStreaming || Math.abs(initialDistance) >= LARGE_SCROLL_DISTANCE) {
            container.scrollTop = getBottomScrollTop(container);
            isAutoScrollEnabledRef.current = true;
            pendingScrollRef.current = false;
            settleAtBottom();
            return;
        }

        const duration = Math.min(420, Math.max(220, Math.abs(initialDistance) * 0.16));
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const currentContainer = messagesContainerRef.current;
            if (!currentContainer || !isAutoScrollEnabledRef.current) {
                scrollAnimationFrameRef.current = null;
                programmaticBottomScrollRef.current = false;
                return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            // 每一帧重新计算目标，避免图片、Markdown、高亮等异步撑高后仍停在旧目标。
            const liveTarget = getBottomScrollTop(currentContainer);
            currentContainer.scrollTop = startScrollTop + (liveTarget - startScrollTop) * easeOutCubic;

            if (progress < 1) {
                scrollAnimationFrameRef.current = requestAnimationFrame(animateScroll);
            } else {
                scrollAnimationFrameRef.current = null;
                currentContainer.scrollTop = getBottomScrollTop(currentContainer);
                isAutoScrollEnabledRef.current = true;
                pendingScrollRef.current = false;
                settleAtBottom();
            }
        };

        scrollAnimationFrameRef.current = requestAnimationFrame(animateScroll);
    }, [cancelBottomSettle, cancelScrollAnimation, messagesContainerRef, settleAtBottom]);

    const executePendingScroll = useCallback(() => {
        cancelPendingScrollTimer();
        if (!pendingScrollRef.current || !isAutoScrollEnabledRef.current) return;

        pendingScrollRef.current = false;
        // 等 React 提交和浏览器布局完成后再读取最新 scrollHeight。
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!isAutoScrollEnabledRef.current) return;
                smoothScrollToBottom(isStreamingRef.current);
            });
        });
    }, [cancelPendingScrollTimer, smoothScrollToBottom]);

    const requestScrollToBottom = useCallback(() => {
        if (!isAutoScrollEnabledRef.current) return;

        pendingScrollRef.current = true;
        cancelPendingScrollTimer();
        pendingScrollTimerRef.current = setTimeout(() => {
            pendingScrollTimerRef.current = null;
            executePendingScroll();
        }, isStreamingRef.current ? 0 : 16);
    }, [cancelPendingScrollTimer, executePendingScroll]);

    const handleScrollToBottomClick = useCallback(() => {
        cancelPendingScrollTimer();
        pendingScrollRef.current = false;
        isAutoScrollEnabledRef.current = true;
        setShowScrollToBottomButton(false);
        smoothScrollToBottom(false);
    }, [cancelPendingScrollTimer, smoothScrollToBottom]);

    const updateStreamingStatus = useCallback(() => {
        const now = Date.now();
        if (now - lastStreamingCheckRef.current < 500) {
            isStreamingRef.current = true;
            if (streamingTimerRef.current) {
                clearTimeout(streamingTimerRef.current);
            }
            streamingTimerRef.current = setTimeout(() => {
                isStreamingRef.current = false;
            }, 500);
        }
        lastStreamingCheckRef.current = now;
    }, []);

    const handleChatBoxHeightChange = useCallback((newHeight) => {
        setChatBoxHeight(newHeight);
        chatBoxHeightRef.current = newHeight;
    }, []);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            checkScrollPosition();
        };

        container.addEventListener('scroll', handleScroll, {passive: true});
        checkScrollPosition(true);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current);
            }
            if (streamingTimerRef.current) {
                clearTimeout(streamingTimerRef.current);
            }
            cancelPendingScrollTimer();
            cancelScrollAnimation();
            cancelBottomSettle();
        };
    }, [
        cancelBottomSettle,
        cancelPendingScrollTimer,
        cancelScrollAnimation,
        checkScrollPosition,
        messagesContainerRef,
    ]);

    useEffect(() => {
        executePendingScroll();
        if (isAutoScrollEnabledRef.current) {
            requestScrollToBottom();
        }
    }, [executePendingScroll, requestScrollToBottom]);

    return {
        showScrollToBottomButton,
        setShowScrollToBottomButton,
        chatBoxHeight,
        isAutoScrollEnabledRef,
        pendingScrollRef,
        checkScrollPosition,
        smoothScrollToBottom,
        executePendingScroll,
        requestScrollToBottom,
        handleScrollToBottomClick,
        updateStreamingStatus,
        handleChatBoxHeightChange,
    };
};

export default useChatScroll;
