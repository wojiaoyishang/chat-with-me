import {useCallback, useEffect, useRef, useState} from 'react';

const useChatScroll = (messagesContainerRef) => {
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
    const [chatBoxHeight, setChatBoxHeight] = useState(0);

    const isAutoScrollEnabledRef = useRef(true);
    const scrollCheckTimeoutRef = useRef(null);
    const pendingScrollRef = useRef(false);
    const chatBoxHeightRef = useRef(0);
    const lastScrollTopRef = useRef(0);
    const scrollDirectionRef = useRef('down');

    const isStreamingRef = useRef(false);
    const streamingTimerRef = useRef(null);
    const lastStreamingCheckRef = useRef(0);

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
        isAutoScrollEnabledRef.current = isNearBottom || isScrollingDownNearBottom;

        const shouldShowButton = distanceToBottom > THRESHOLD;
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

    const smoothScrollToBottom = useCallback((isStreaming = false) => {
        if (!messagesContainerRef.current) return;
        const container = messagesContainerRef.current;
        const targetScrollTop = container.scrollHeight - container.clientHeight;

        if (Math.abs(container.scrollTop - targetScrollTop) < 1) {
            isAutoScrollEnabledRef.current = true;
            pendingScrollRef.current = false;
            return;
        }

        const currentScrollTop = container.scrollTop;
        const distance = targetScrollTop - currentScrollTop;

        if (Math.abs(distance) < 1) return;

        if (Math.abs(distance) < 50) {
            container.scrollTo({
                top: targetScrollTop,
                behavior: isStreaming ? 'auto' : 'smooth'
            });
            setTimeout(() => {
                isAutoScrollEnabledRef.current = true;
                pendingScrollRef.current = false;
                checkScrollPosition(true);
            }, 100);
            return;
        }

        if (isStreaming) {
            container.scrollTo({
                top: targetScrollTop,
                behavior: 'auto'
            });
            return;
        }

        const duration = 300;
        const startTime = performance.now();
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const newScrollTop = currentScrollTop + distance * easeOutCubic;
            container.scrollTop = newScrollTop;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                isAutoScrollEnabledRef.current = true;
                pendingScrollRef.current = false;
                checkScrollPosition(true);
            }
        };
        requestAnimationFrame(animateScroll);
    }, [checkScrollPosition, messagesContainerRef]);

    const executePendingScroll = useCallback(() => {
        if (pendingScrollRef.current && isAutoScrollEnabledRef.current) {
            pendingScrollRef.current = false;
            setTimeout(() => {
                smoothScrollToBottom(isStreamingRef.current);
            }, isStreamingRef.current ? 50 : 100);
        }
    }, [smoothScrollToBottom]);

    const requestScrollToBottom = useCallback(() => {
        if (isAutoScrollEnabledRef.current) {
            pendingScrollRef.current = true;
            if (isStreamingRef.current) {
                executePendingScroll();
            }
        }
    }, [executePendingScroll]);

    const handleScrollToBottomClick = useCallback(() => {
        pendingScrollRef.current = false;
        isAutoScrollEnabledRef.current = true;
        smoothScrollToBottom();
        setShowScrollToBottomButton(false);
    }, [smoothScrollToBottom]);

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
        };
    }, [checkScrollPosition, messagesContainerRef]);

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
