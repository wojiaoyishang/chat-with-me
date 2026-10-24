import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const isEditing = (target) => target?.closest?.('input, textarea, select, [contenteditable="true"], [role="textbox"]');

// A scroll event describes a position change, not its cause. Streamed results,
// collapsed cards and browser scroll anchoring also move the viewport.
export default function useExecutionAutoFollow({ open, executionId, navigationRequest }) {
    const [autoFollow, updateAutoFollow] = useState(!navigationRequest);
    const followingRef = useRef(!navigationRequest);
    const [scrollNode, setScrollNode] = useState(null);
    const [contentNode, setContentNode] = useState(null);
    const scrollRef = useRef(null);
    const scheduleRef = useRef(null);
    const contextRef = useRef({ open, navigationRequest });
    const previousExecutionRef = useRef(executionId);

    const setAutoFollow = useCallback((value) => {
        const next = typeof value === 'function' ? Boolean(value(followingRef.current)) : Boolean(value);
        followingRef.current = next;
        updateAutoFollow(next);
        if (next) scheduleRef.current?.();
    }, []);

    const attachScroll = useCallback((node) => {
        scrollRef.current = node;
        setScrollNode(node);
    }, []);

    useLayoutEffect(() => {
        contextRef.current = { open, navigationRequest };
        if (previousExecutionRef.current !== executionId) {
            previousExecutionRef.current = executionId;
            setAutoFollow(!navigationRequest);
        } else if (navigationRequest) {
            setAutoFollow(false);
        }
    }, [open, executionId, navigationRequest, setAutoFollow]);

    useLayoutEffect(() => {
        if (!open || !scrollNode || !contentNode) return undefined;
        const view = scrollNode.ownerDocument.defaultView;
        let frame = null;
        let remainingFrames = 0;
        let disposed = false;
        let scrollbarDragging = false;
        let touchY = null;
        let previousTop = scrollNode.scrollTop;
        let previousHeight = scrollNode.scrollHeight;
        let previousViewport = scrollNode.clientHeight;
        const canFollow = () => !disposed && followingRef.current && contextRef.current.open
            && !contextRef.current.navigationRequest && scrollRef.current === scrollNode;
        const pinToBottom = () => {
            if (!canFollow()) return;
            const top = Math.max(0, scrollNode.scrollHeight - scrollNode.clientHeight);
            // Avoid smooth-scroll animations racing with a second, faster tool result.
            try {
                scrollNode.scrollTo({ top, behavior: 'instant' });
            } catch {
                scrollNode.scrollTop = top;
            }
            previousTop = scrollNode.scrollTop;
            previousHeight = scrollNode.scrollHeight;
            previousViewport = scrollNode.clientHeight;
        };
        const tick = () => {
            frame = null;
            if (!canFollow()) return;
            pinToBottom();
            remainingFrames -= 1;
            if (remainingFrames > 0) frame = view.requestAnimationFrame(tick);
        };
        const schedule = () => {
            if (!canFollow()) return;
            // Coalesce bursts instead of cancelling a pending frame on every update.
            // One verification frame also catches layout settling after React commits.
            remainingFrames = 2;
            if (frame === null) frame = view.requestAnimationFrame(tick);
        };
        const pause = () => {
            setAutoFollow(false);
            remainingFrames = 0;
            if (frame !== null) view.cancelAnimationFrame(frame);
            frame = null;
        };
        const nestedCanScrollUp = (target) => {
            for (let node = target?.nodeType === 1 ? target : target?.parentElement;
                node && node !== scrollNode; node = node.parentElement) {
                if (node.scrollTop > 0 && node.scrollHeight > node.clientHeight
                    && /auto|scroll/.test(view.getComputedStyle(node).overflowY)) return true;
            }
            return false;
        };
        const onWheel = (event) => {
            if (!event.defaultPrevented && event.deltaY < 0 && !nestedCanScrollUp(event.target)) pause();
        };
        const onKeyDown = (event) => {
            if (event.defaultPrevented || isEditing(event.target) || nestedCanScrollUp(event.target)) return;
            if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)
                || (event.key === ' ' && event.shiftKey)) pause();
        };
        const onTouchStart = (event) => { touchY = event.touches?.[0]?.clientY ?? null; };
        const onTouchMove = (event) => {
            const next = event.touches?.[0]?.clientY ?? null;
            if (touchY !== null && next !== null && next - touchY > 3
                && !event.defaultPrevented && !nestedCanScrollUp(event.target)) pause();
            touchY = next;
        };
        const onTouchEnd = () => { touchY = null; };
        const onPointerDown = (event) => {
            scrollbarDragging = event.button === 0 && event.target === scrollNode;
            previousTop = scrollNode.scrollTop;
            previousHeight = scrollNode.scrollHeight;
            previousViewport = scrollNode.clientHeight;
        };
        const onPointerUp = () => { scrollbarDragging = false; };
        const onScroll = () => {
            const top = scrollNode.scrollTop;
            const height = scrollNode.scrollHeight;
            const viewport = scrollNode.clientHeight;
            if (scrollbarDragging && top < previousTop - 1 && height === previousHeight
                && viewport === previousViewport) pause();
            previousTop = top;
            previousHeight = height;
            previousViewport = viewport;
            // Browser anchoring or a card collapsing can emit scroll before ResizeObserver.
            schedule();
        };

        scheduleRef.current = schedule;
        scrollNode.addEventListener('wheel', onWheel, { passive: true });
        scrollNode.addEventListener('keydown', onKeyDown);
        scrollNode.addEventListener('touchstart', onTouchStart, { passive: true });
        scrollNode.addEventListener('touchmove', onTouchMove, { passive: true });
        scrollNode.addEventListener('touchend', onTouchEnd, { passive: true });
        scrollNode.addEventListener('touchcancel', onTouchEnd, { passive: true });
        scrollNode.addEventListener('pointerdown', onPointerDown);
        scrollNode.addEventListener('scroll', onScroll, { passive: true });
        view.addEventListener('pointerup', onPointerUp);
        view.addEventListener('pointercancel', onPointerUp);
        const Resize = view.ResizeObserver || globalThis.ResizeObserver;
        const resizeObserver = Resize ? new Resize(schedule) : null;
        resizeObserver?.observe(contentNode);
        resizeObserver?.observe(scrollNode);
        const Mutation = view.MutationObserver || globalThis.MutationObserver;
        const mutationObserver = Mutation ? new Mutation(schedule) : null;
        mutationObserver?.observe(contentNode, { childList: true, subtree: true, characterData: true });
        // Also cover media load when ResizeObserver is unavailable.
        contentNode.addEventListener('load', schedule, true);
        schedule();
        return () => {
            disposed = true;
            if (scheduleRef.current === schedule) scheduleRef.current = null;
            if (frame !== null) view.cancelAnimationFrame(frame);
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
            scrollNode.removeEventListener('wheel', onWheel);
            scrollNode.removeEventListener('keydown', onKeyDown);
            scrollNode.removeEventListener('touchstart', onTouchStart);
            scrollNode.removeEventListener('touchmove', onTouchMove);
            scrollNode.removeEventListener('touchend', onTouchEnd);
            scrollNode.removeEventListener('touchcancel', onTouchEnd);
            scrollNode.removeEventListener('pointerdown', onPointerDown);
            scrollNode.removeEventListener('scroll', onScroll);
            view.removeEventListener('pointerup', onPointerUp);
            view.removeEventListener('pointercancel', onPointerUp);
            contentNode.removeEventListener('load', schedule, true);
        };
    }, [open, scrollNode, contentNode, setAutoFollow]);

    // Replacement updates can keep the same timestamp/card count. Observe every
    // committed window update; the scheduler still does at most one scroll per frame.
    useLayoutEffect(() => { scheduleRef.current?.(); });

    const toggleAutoFollow = useCallback(() => setAutoFollow((value) => !value), [setAutoFollow]);

    return { autoFollow, setAutoFollow, toggleAutoFollow, scrollRef, attachScroll, attachContent: setContentNode };
}
