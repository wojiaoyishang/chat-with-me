import React, {memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {X} from 'lucide-react';
import DynamicSettings from '@/components/setting/DynamicSettings.jsx';

const DEFAULT_DESKTOP_WIDTH = 256;
const MIN_DESKTOP_WIDTH = 256;
const MAX_DESKTOP_WIDTH = 720;
const MIN_CHAT_CONTENT_WIDTH = 420;
const SIDEBAR_WIDTH_STORAGE_KEY = 'chat-with-me:conversation-settings-sidebar-width';

function loadStoredDesktopWidth() {
    if (typeof window === 'undefined') return DEFAULT_DESKTOP_WIDTH;

    try {
        const storedValue = Number(window.localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY));
        return Number.isFinite(storedValue) && storedValue >= MIN_DESKTOP_WIDTH
            ? storedValue
            : DEFAULT_DESKTOP_WIDTH;
    } catch {
        return DEFAULT_DESKTOP_WIDTH;
    }
}

function storeDesktopWidth(width) {
    try {
        window.localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, String(Math.round(width)));
    } catch {
        // Browsers may deny localStorage in restricted/private contexts; resizing still works for this session.
    }
}

const RightSidebar = memo(({
                               isOpen,
                               onClose,
                               advancedSettings,
                               initialSettingValues,
                               settingsInstanceKey,
                               onSettingChange,
                               t,
                               containerRef,
                               isWindowMode
                           }) => {
    const [lockedMode, setLockedMode] = useState(null);
    const [desktopWidth, setDesktopWidth] = useState(loadStoredDesktopWidth);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);
    const resizeStateRef = useRef(null);
    const dynamicSettingsKey = useMemo(() => {
        const names = Array.isArray(advancedSettings)
            ? advancedSettings.map((item) => item?.name || item?.text || item?.type || '').join('|')
            : '';

        return `${settingsInstanceKey ?? 'conversationless'}:${names}`;
    }, [advancedSettings, settingsInstanceKey]);

    useLayoutEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const BREAKPOINT = 920;
        if (isOpen && lockedMode === null) {
            const isDesktop = container.clientWidth > BREAKPOINT;
            setLockedMode(isDesktop);
        } else if (!isOpen && lockedMode !== null) {
            const timer = setTimeout(() => {
                setLockedMode(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, containerRef, lockedMode]);

    const getMaxDesktopWidth = useCallback(() => {
        const fallbackWidth = typeof window === 'undefined'
            ? MIN_DESKTOP_WIDTH + MIN_CHAT_CONTENT_WIDTH
            : window.innerWidth;
        const containerWidth = containerRef?.current?.clientWidth || fallbackWidth;
        return Math.max(
            MIN_DESKTOP_WIDTH,
            Math.min(MAX_DESKTOP_WIDTH, containerWidth - MIN_CHAT_CONTENT_WIDTH)
        );
    }, [containerRef]);

    const clampDesktopWidth = useCallback((width) => (
        Math.min(getMaxDesktopWidth(), Math.max(MIN_DESKTOP_WIDTH, width))
    ), [getMaxDesktopWidth]);

    useLayoutEffect(() => {
        if (!lockedMode) return;

        const container = containerRef?.current;
        const syncWidth = () => {
            setDesktopWidth((currentWidth) => clampDesktopWidth(currentWidth));
        };

        syncWidth();
        const resizeObserver = container && typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(syncWidth)
            : null;
        resizeObserver?.observe(container);
        window.addEventListener('resize', syncWidth);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener('resize', syncWidth);
        };
    }, [clampDesktopWidth, containerRef, lockedMode]);

    const handleResizePointerDown = useCallback((event) => {
        if (!isOpen || lockedMode !== true || event.button !== 0) return;

        event.preventDefault();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        resizeStateRef.current = {
            startX: event.clientX,
            startWidth: desktopWidth,
        };
        setIsResizing(true);
    }, [desktopWidth, isOpen, lockedMode]);

    const handleResizeKeyDown = useCallback((event) => {
        if (!isOpen || lockedMode !== true || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

        event.preventDefault();
        const step = event.shiftKey ? 32 : 16;
        const direction = event.key === 'ArrowLeft' ? 1 : -1;
        setDesktopWidth((currentWidth) => {
            const nextWidth = clampDesktopWidth(currentWidth + direction * step);
            storeDesktopWidth(nextWidth);
            return nextWidth;
        });
    }, [clampDesktopWidth, isOpen, lockedMode]);

    useEffect(() => {
        if (!isResizing) return undefined;

        const previousCursor = document.body.style.cursor;
        const previousUserSelect = document.body.style.userSelect;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handlePointerMove = (event) => {
            const resizeState = resizeStateRef.current;
            if (!resizeState) return;

            const nextWidth = resizeState.startWidth + resizeState.startX - event.clientX;
            setDesktopWidth(clampDesktopWidth(nextWidth));
        };

        const stopResizing = () => {
            resizeStateRef.current = null;
            setIsResizing(false);
            setDesktopWidth((currentWidth) => {
                const nextWidth = clampDesktopWidth(currentWidth);
                storeDesktopWidth(nextWidth);
                return nextWidth;
            });
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', stopResizing, {once: true});
        window.addEventListener('pointercancel', stopResizing, {once: true});

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', stopResizing);
            window.removeEventListener('pointercancel', stopResizing);
            document.body.style.cursor = previousCursor;
            document.body.style.userSelect = previousUserSelect;
        };
    }, [clampDesktopWidth, isResizing]);

    const sidebarContent = useCallback(() => {
        const hasDynamicSettings = Array.isArray(advancedSettings) && advancedSettings.length > 0;
        return (
            <div className="pb-4">
                {hasDynamicSettings ? (
                    <div>
                        <DynamicSettings
                            key={dynamicSettingsKey}
                            config={advancedSettings}
                            initialValues={initialSettingValues}
                            onChange={onSettingChange ?? null}
                        />
                    </div>
                ) : (
                    <div className="p-4 text-gray-400 text-sm flex items-center justify-center">
                        {t('no_settings')}
                    </div>
                )}
            </div>
        );
    }, [advancedSettings, dynamicSettingsKey, initialSettingValues, onSettingChange, t]);

    if (lockedMode === null) return null;

    if (lockedMode) {
        return (
            <motion.div
                ref={sidebarRef}
                initial={{width: 0}}
                animate={{width: isOpen ? desktopWidth : 0}}
                transition={{duration: isResizing ? 0 : 0.3, ease: 'easeInOut'}}
                className="relative h-full bg-white border-l overflow-hidden flex-shrink-0"
            >
                <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-valuemin={MIN_DESKTOP_WIDTH}
                    aria-valuemax={getMaxDesktopWidth()}
                    aria-valuenow={Math.round(desktopWidth)}
                    tabIndex={0}
                    onPointerDown={handleResizePointerDown}
                    onKeyDown={handleResizeKeyDown}
                    className="group absolute inset-y-0 left-0 z-20 w-3 cursor-col-resize touch-none outline-none"
                    aria-label="调整会话设置宽度"
                    title="拖动调整会话设置宽度"
                >
                    <span className="absolute inset-y-0 left-0 w-px bg-transparent transition-colors group-hover:bg-blue-400 group-focus-visible:bg-blue-400 group-active:bg-blue-500"/>
                </div>
                <div className="h-full flex flex-col" style={{width: desktopWidth}}>
                    <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                        <span className="font-medium text-gray-700">
                            {t('advanced_conversation_settings')}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                            aria-label={t('close')}
                        >
                            <X className="h-4 w-4 text-gray-500"/>
                        </button>
                    </div>
                    <div className="p-1 flex-1 overflow-y-auto">
                        {sidebarContent()}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={isWindowMode
                        ? 'absolute inset-0 bg-black/20 z-[9998]'
                        : 'fixed inset-0 bg-black/20 z-40'
                    }
                    onClick={onClose}
                />
            )}
            <motion.div
                ref={sidebarRef}
                initial={{x: '100%'}}
                animate={{x: isOpen ? 0 : '100%'}}
                transition={{duration: 0.3, ease: 'easeInOut'}}
                className={isWindowMode
                    ? 'absolute top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-[9999] flex flex-col'
                    : 'fixed top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-50 flex flex-col'
                }
            >
                <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                    <span className="font-medium text-gray-700">
                        {t('advanced_conversation_settings')}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                        aria-label={t('close')}
                    >
                        <X className="h-4 w-4 text-gray-500"/>
                    </button>
                </div>
                <div className="p-1 flex-1 overflow-y-auto">
                    {sidebarContent()}
                </div>
            </motion.div>
        </>
    );
});

RightSidebar.displayName = 'RightSidebar';

export default RightSidebar;
