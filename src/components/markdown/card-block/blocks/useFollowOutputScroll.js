import {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const BOTTOM_THRESHOLD = 24;

const getDistanceToBottom = (node) => {
    return Math.max(0, node.scrollHeight - node.scrollTop - node.clientHeight);
};

const useFollowOutputScroll = ({contentKey = '', enabled = true} = {}) => {
    const scrollContainerRef = useRef(null);
    const followModeRef = useRef('following');
    const [followMode, setFollowModeState] = useState('following');

    const setFollowMode = useCallback((nextMode) => {
        followModeRef.current = nextMode;
        setFollowModeState(nextMode);
    }, []);

    const scrollToBottom = useCallback(({behavior = 'auto', resume = true} = {}) => {
        const node = scrollContainerRef.current;

        if (resume) {
            setFollowMode('following');
        }

        if (!node) {
            return;
        }

        node.scrollTo({
            top: node.scrollHeight,
            behavior,
        });
    }, [setFollowMode]);

    const pauseFollowing = useCallback(() => {
        setFollowMode('manual');
    }, [setFollowMode]);

    const resumeFollowing = useCallback(() => {
        scrollToBottom({behavior: 'auto', resume: true});
    }, [scrollToBottom]);

    const toggleFollowing = useCallback(() => {
        if (followModeRef.current === 'following') {
            pauseFollowing();
            return;
        }

        resumeFollowing();
    }, [pauseFollowing, resumeFollowing]);

    const handleScroll = useCallback((event) => {
        const node = event.currentTarget;
        const currentMode = followModeRef.current;

        // An explicit toolbar pause stays paused even when the viewport happens to be
        // at the bottom. Only the user can resume it from the toolbar.
        if (currentMode === 'manual') {
            return;
        }

        const isAtBottom = getDistanceToBottom(node) <= BOTTOM_THRESHOLD;
        const nextMode = isAtBottom ? 'following' : 'scrolled';

        if (nextMode !== currentMode) {
            setFollowMode(nextMode);
        }
    }, [setFollowMode]);

    const handleWheel = useCallback((event) => {
        const node = scrollContainerRef.current;
        const hasVerticalOverflow = node && node.scrollHeight > node.clientHeight + BOTTOM_THRESHOLD;

        if (
            hasVerticalOverflow &&
            event.deltaY < 0 &&
            followModeRef.current === 'following'
        ) {
            setFollowMode('scrolled');
        }
    }, [setFollowMode]);

    const handleTouchMove = useCallback(() => {
        const node = scrollContainerRef.current;

        if (
            node &&
            followModeRef.current === 'following' &&
            getDistanceToBottom(node) > BOTTOM_THRESHOLD
        ) {
            setFollowMode('scrolled');
        }
    }, [setFollowMode]);

    useLayoutEffect(() => {
        if (!enabled || followModeRef.current !== 'following') {
            return;
        }

        const node = scrollContainerRef.current;

        if (!node) {
            return;
        }

        // Run before paint so a streaming update does not briefly jump the viewport.
        node.scrollTop = node.scrollHeight;
    }, [contentKey, enabled]);

    return {
        followMode,
        handleScroll,
        handleTouchMove,
        handleWheel,
        isFollowing: followMode === 'following',
        pauseFollowing,
        resumeFollowing,
        scrollContainerRef,
        scrollToBottom,
        toggleFollowing,
    };
};

export default useFollowOutputScroll;
