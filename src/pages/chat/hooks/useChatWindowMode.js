import {useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';

const useChatWindowMode = ({onWindowModeChange}) => {
    const [isReady, setIsReady] = useState(false);
    const [isWindowMode, setIsWindowMode] = useState(false);
    const [windowPos, setWindowPos] = useState({left: 0, top: 0});
    const [windowDimensions, setWindowDimensions] = useState({width: 900, height: 700});
    const windowRef = useRef(null);

    const dragOffsetRef = useRef({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [isDragReady, setIsDragReady] = useState(false);
    const longPressTimerRef = useRef(null);

    const [isResizing, setIsResizing] = useState(false);
    const resizeOffsetRef = useRef({width: 0, height: 0, startX: 0, startY: 0, direction: ''});

    useLayoutEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 计算允许的最大宽高，设置为网页大小的 0.98
    const getMaxDimensions = useCallback(() => {
        return {
            maxWidth: window.innerWidth * 0.98,
            maxHeight: window.innerHeight * 0.98
        };
    }, []);

    const handleDragMove = useCallback((clientX, clientY) => {
        if (!windowRef.current) return;
        let newLeft = clientX - dragOffsetRef.current.x;
        let newTop = clientY - dragOffsetRef.current.y;
        const maxLeft = window.innerWidth - windowDimensions.width;
        const maxTop = window.innerHeight - windowDimensions.height;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));
        setWindowPos({left: newLeft, top: newTop});
    }, [windowDimensions]);

    const startDragging = useCallback((clientX, clientY) => {
        if (!windowRef.current || !isWindowMode) return;
        const rect = windowRef.current.getBoundingClientRect();
        dragOffsetRef.current = {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
        setIsDragging(true);
    }, [isWindowMode]);

    const handleDragMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragReady(true);
        startDragging(e.clientX, e.clientY);

        const handleMouseMove = (ev) => handleDragMove(ev.clientX, ev.clientY);
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setIsDragging(false);
            setIsDragReady(false);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [startDragging, handleDragMove]);

    const handleDragTouchStart = useCallback((e) => {
        if (!isWindowMode) return;
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;

        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);

        longPressTimerRef.current = setTimeout(() => {
            setIsDragReady(true);
            if (navigator.vibrate) navigator.vibrate(50);
            startDragging(startX, startY);
        }, 500);
    }, [isWindowMode, startDragging]);

    const handleDragTouchMove = useCallback((e) => {
        if (!isDragging) {
            if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
            }
            return;
        }
        if (e.cancelable) e.preventDefault();
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }, [isDragging, handleDragMove]);

    const handleDragTouchEnd = useCallback(() => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        setIsDragging(false);
        setIsDragReady(false);
    }, []);

    const handleResizeMove = useCallback((clientX, clientY) => {
        const deltaX = clientX - resizeOffsetRef.current.startX;
        const deltaY = clientY - resizeOffsetRef.current.startY;
        const dir = resizeOffsetRef.current.direction;

        const {maxWidth, maxHeight} = getMaxDimensions();
        const minWidth = 320;
        const minHeight = 400;

        let newWidth = resizeOffsetRef.current.startWidth;
        let newHeight = resizeOffsetRef.current.startHeight;
        let newLeft = resizeOffsetRef.current.startLeft;
        let newTop = resizeOffsetRef.current.startTop;

        if (dir.includes('e')) {
            newWidth = Math.max(minWidth, Math.min(resizeOffsetRef.current.startWidth + deltaX, maxWidth, window.innerWidth - newLeft));
        } else if (dir.includes('w')) {
            const tempWidth = resizeOffsetRef.current.startWidth - deltaX;
            const clampedWidth = Math.max(minWidth, Math.min(tempWidth, maxWidth, resizeOffsetRef.current.startLeft + resizeOffsetRef.current.startWidth));
            newLeft = resizeOffsetRef.current.startLeft + (resizeOffsetRef.current.startWidth - clampedWidth);
            newWidth = clampedWidth;
        }

        if (dir.includes('s')) {
            newHeight = Math.max(minHeight, Math.min(resizeOffsetRef.current.startHeight + deltaY, maxHeight, window.innerHeight - newTop));
        } else if (dir.includes('n')) {
            const tempHeight = resizeOffsetRef.current.startHeight - deltaY;
            const clampedHeight = Math.max(minHeight, Math.min(tempHeight, maxHeight, resizeOffsetRef.current.startTop + resizeOffsetRef.current.startHeight));
            newTop = resizeOffsetRef.current.startTop + (resizeOffsetRef.current.startHeight - clampedHeight);
            newHeight = clampedHeight;
        }

        setWindowDimensions({width: newWidth, height: newHeight});
        setWindowPos({left: newLeft, top: newTop});
    }, [getMaxDimensions]);

    const startResizing = useCallback((clientX, clientY, direction) => {
        if (!isWindowMode) return;
        resizeOffsetRef.current = {
            startX: clientX,
            startY: clientY,
            startWidth: windowDimensions.width,
            startHeight: windowDimensions.height,
            startLeft: windowPos.left,
            startTop: windowPos.top,
            direction: direction
        };
        setIsResizing(true);
    }, [isWindowMode, windowDimensions, windowPos]);

    const handleResizeMouseDown = useCallback((e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        startResizing(e.clientX, e.clientY, direction);

        const handleMove = (ev) => handleResizeMove(ev.clientX, ev.clientY);
        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            setIsResizing(false);
        };
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }, [startResizing, handleResizeMove]);

    const handleResizeTouchStart = useCallback((e, direction) => {
        e.stopPropagation();
        const touch = e.touches[0];
        startResizing(touch.clientX, touch.clientY, direction);

        const handleTouchMoveLocal = (ev) => {
            if (ev.cancelable) ev.preventDefault();
            handleResizeMove(ev.touches[0].clientX, ev.touches[0].clientY);
        };
        const handleTouchEndLocal = () => {
            document.removeEventListener('touchmove', handleTouchMoveLocal);
            document.removeEventListener('touchend', handleTouchEndLocal);
            setIsResizing(false);
        };

        document.addEventListener('touchmove', handleTouchMoveLocal, {passive: false});
        document.addEventListener('touchend', handleTouchEndLocal);
    }, [startResizing, handleResizeMove]);

    // 幽灵层光标计算（用于拖拽/缩放期间保持正确鼠标样式）
    const ghostCursor = useMemo(() => {
        if (isDragging) {
            return 'grabbing';
        }
        if (isResizing) {
            const dir = resizeOffsetRef.current.direction;
            const cursorMap = {
                'n': 'n-resize',
                's': 's-resize',
                'w': 'w-resize',
                'e': 'e-resize',
                'nw': 'nw-resize',
                'ne': 'ne-resize',
                'sw': 'sw-resize',
                'se': 'se-resize',
            };
            return cursorMap[dir] || 'move';
        }
        return 'default';
    }, [isDragging, isResizing]);

    const toggleWindowMode = useCallback(() => {
        const newMode = !isWindowMode;
        onWindowModeChange?.(newMode);

        if (isWindowMode) {
            setIsWindowMode(false);
        } else {
            const initialW = window.innerWidth * 0.85;
            const initialH = window.innerHeight * 0.85;
            const l = (window.innerWidth - initialW) / 2;
            const t = (window.innerHeight - initialH) / 2;
            setWindowDimensions({width: initialW, height: initialH});
            setWindowPos({left: l, top: t});
            setIsWindowMode(true);
        }
    }, [isWindowMode, onWindowModeChange]);

    return {
        isReady,
        isWindowMode,
        windowPos,
        windowDimensions,
        windowRef,
        isDragging,
        isDragReady,
        isResizing,
        ghostCursor,
        toggleWindowMode,
        handleDragMouseDown,
        handleDragTouchStart,
        handleDragTouchMove,
        handleDragTouchEnd,
        handleResizeMouseDown,
        handleResizeTouchStart,
    };
};

export default useChatWindowMode;
