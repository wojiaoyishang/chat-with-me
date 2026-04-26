import React, {useEffect, useState, useRef, useCallback, useMemo, memo, useLayoutEffect} from 'react';
import {useImmer} from 'use-immer';
import {produce} from 'immer';
import {
    generateUUID,
    useIsMobile,
    UnifiedErrorScreen,
    UnifiedLoadingScreen
} from "@/lib/tools.jsx";
import {toast} from "sonner";
import {Transition} from '@headlessui/react';
import {motion, AnimatePresence} from 'framer-motion';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools.jsx";
import {emitEvent, onEvent} from "@/context/useEventStore.jsx";
import {useTranslation} from "react-i18next";
import {ArrowDown, ChevronDown, CircleCheck, PanelRight, X, Maximize2, Minimize2, Minus} from 'lucide-react';
import ChatBox from "@/components/chat/ChatBox.jsx";
import MessageContainer from "@/components/chat/MessageContainer.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import DynamicSettings from "@/components/setting/DynamicSettings.jsx";

// ========== 内部组件：模型项 ==========
const ModelItem = memo(({
                            model,
                            isSelected,
                            isMobile,
                            onMouseEnter,
                            onClick,
                            dataSelected
                        }) => {
    const itemContent = useMemo(() => (
        <>
            <Avatar className="h-6 w-6">
                <AvatarImage src={model.avatar} alt={model.name}/>
                <AvatarFallback>{model.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-left">
                <p className="font-medium text-sm text-gray-800">{model.name}</p>
                <p className="text-xs text-gray-500 truncate w-40">{model.description}</p>
            </div>
            {isSelected && (
                <CircleCheck className="ml-auto text-[#615CED] h-4 w-4"/>
            )}
        </>
    ), [model, isSelected]);
    if (!isMobile) {
        return (
            <div key={model.id} onMouseEnter={onMouseEnter}>
                <button
                    data-selected={dataSelected}
                    onClick={onClick}
                    className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                        isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                    }`}
                >
                    {itemContent}
                </button>
            </div>
        );
    } else {
        return (
            <button
                key={model.id}
                data-selected={dataSelected}
                onClick={onClick}
                className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                    isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                }`}
            >
                {itemContent}
            </button>
        );
    }
}, (prevProps, nextProps) => {
    return (
        prevProps.model.id === nextProps.model.id &&
        prevProps.model.name === nextProps.model.name &&
        prevProps.model.description === nextProps.model.description &&
        prevProps.model.avatar === nextProps.model.avatar &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.onMouseEnter === nextProps.onMouseEnter &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.dataSelected === nextProps.dataSelected
    );
});
ModelItem.displayName = 'ModelItem';

// ========== 内部组件：模型预览卡片 ==========
const ModelPreviewCard = React.memo(({model, isMobile}) => {
    if (!model) return null;
    return (
        <div className="p-4 bg-gray-50 border rounded-md">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={model.avatar} alt={model.name}/>
                        <AvatarFallback>{model.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{model.name}</p>
                        <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                </div>

                {model.tags && (
                    <div className="flex flex-wrap gap-1">
                        {model.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.model === nextProps.model &&
        prevProps.isMobile === nextProps.isMobile
    );
});
ModelPreviewCard.displayName = 'ModelPreviewCard';

// ========== 内部组件：置底按钮 ==========
const ScrollToBottomButton = memo(({
                                       isVisible,
                                       chatBoxHeight,
                                       onClick
                                   }) => {
    const buttonStyle = useMemo(() => {
        return {
            bottom: `${(chatBoxHeight || 60) + 60}px`,
            right: '16px',
        };
    }, [chatBoxHeight]);
    return (
        <>
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="xl:hidden"
            >
                <button
                    onClick={onClick}
                    className="cursor-pointer fixed z-40 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    style={buttonStyle}
                    aria-label="Scroll to bottom"
                >
                    <ArrowDown className="text-gray-600 w-5 h-5"/>
                </button>
            </Transition>
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="hidden xl:block"
            >
                <button
                    onClick={onClick}
                    className="cursor-pointer fixed z-40 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    style={{
                        bottom: '50px',
                        right: '20px',
                    }}
                    aria-label="Scroll to bottom"
                >
                    <ArrowDown className="text-gray-600 w-5 h-5 mx-auto"/>
                </button>
            </Transition>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isVisible === nextProps.isVisible &&
        prevProps.chatBoxHeight === nextProps.chatBoxHeight &&
        prevProps.onClick === nextProps.onClick
    );
});
ScrollToBottomButton.displayName = 'ScrollToBottomButton';

// ========== RightSidebar 组件 ==========
const RightSidebar = memo(({
                               isOpen,
                               onClose,
                               advancedSettings,
                               initialSettingValues,
                               onSettingChange,
                               t,
                               containerRef,
                               isWindowMode
                           }) => {
    const [lockedMode, setLockedMode] = useState(null);
    const sidebarRef = useRef(null);
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

    const sidebarContent = useCallback(() => {
        if (!advancedSettings || advancedSettings.length === 0) {
            return (
                <div className="p-4 text-gray-400 text-sm flex items-center justify-center">
                    {t("no_settings")}
                </div>
            );
        }
        return (
            <DynamicSettings
                config={advancedSettings}
                initialValues={initialSettingValues}
                onChange={onSettingChange ?? null}
            />
        );
    }, [advancedSettings, initialSettingValues, onSettingChange, t]);

    if (lockedMode === null) return null;

    if (lockedMode) {
        return (
            <motion.div
                ref={sidebarRef}
                initial={{width: 0}}
                animate={{width: isOpen ? '16rem' : 0}}
                transition={{duration: 0.3, ease: 'easeInOut'}}
                className="h-full bg-white border-l overflow-hidden flex-shrink-0"
            >
                <div className="w-[16rem] h-full flex flex-col">
                    <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                        <span className="font-medium text-gray-700">
                            {t("advanced_conversation_settings")}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                            aria-label={t("close")}
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
                        ? "absolute inset-0 bg-black/20 z-[9998]"
                        : "fixed inset-0 bg-black/20 z-40"
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
                    ? "absolute top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-[9999] flex flex-col"
                    : "fixed top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-50 flex flex-col"
                }
            >
                <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                    <span className="font-medium text-gray-700">
                        {t("advanced_conversation_settings")}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                        aria-label={t("close")}
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

// ========== Header 组件 ==========
const ChatHeader = memo(({
                             models,
                             selectedModel,
                             isModelPopoverOpen,
                             previewModel,
                             isMobile,
                             t,
                             handlePopoverOpenChange,
                             handleModelItemClick,
                             handleModelItemMouseEnter,
                             scrollToSelectedItem,
                             isSidebarOpen,
                             handleSidebarToggle,
                             isWindowMode,
                             handleDragMouseDown,
                             handleDragTouchStart,
                             handleDragTouchMove,
                             handleDragTouchEnd,
                             isDragReady,
                             showWindowButton,
                             onToggleWindow,
                             showMinimizeButton = false,
                             onMinimize,
                         }) => {
    const modelListRef = useRef(null);
    useEffect(() => {
        if (isModelPopoverOpen) {
            scrollToSelectedItem(modelListRef);
        }
    }, [isModelPopoverOpen, models, scrollToSelectedItem]);
    const modelItems = useMemo(() => {
        if (!models || models.length === 0) {
            return (
                <p className="text-center text-gray-500 py-4">
                    {t("no_models")}
                </p>
            );
        }
        return models.map((model) => {
            const isSelected = model.id === selectedModel?.id;
            const handleClick = () => handleModelItemClick(model);
            const handleMouseEnter = () => handleModelItemMouseEnter(model);
            return (
                <ModelItem
                    key={model.id}
                    model={model}
                    isSelected={isSelected}
                    isMobile={isMobile}
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    dataSelected={isSelected ? 'true' : 'false'}
                />
            );
        });
    }, [models, isMobile, handleModelItemClick, handleModelItemMouseEnter, selectedModel]);

    return (
        <>
            <header className="w-full bg-white flex items-center justify-between p-4 h-14">
                <Popover
                    open={isModelPopoverOpen}
                    onOpenChange={handlePopoverOpenChange}
                >
                    <PopoverTrigger asChild>
                        <Button variant="ghost"
                                className="justify-start px-0 hover:bg-transparent text-lg cursor-pointer">
                            {selectedModel?.name || t("no_models")}
                            <ChevronDown
                                className={`ml-2 h-4 w-4 transition-transform duration-200 ${isModelPopoverOpen ? 'rotate-180' : ''}`}/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className={isMobile ? "w-[90vw] max-w-md p-4" : "w-85"}
                        style={{ zIndex: isWindowMode ? 100000 : undefined }}
                    >
                        <div className="flex flex-col space-y-4">
                            <div
                                ref={modelListRef}
                                className="space-y-1 max-h-[200px] overflow-y-auto pr-1 pretty-scrollbar"
                            >
                                {modelItems}
                            </div>
                            {(!isMobile || (isMobile && previewModel)) && (
                                <ModelPreviewCard model={previewModel} isMobile={isMobile}/>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>

                {isWindowMode && (
                    <div
                        className={`flex-1 mx-4 h-full cursor-move active:cursor-grabbing transition-colors rounded-md flex flex-col justify-center items-center ${isDragReady ? 'bg-gray-100/50' : ''}`}
                        onMouseDown={handleDragMouseDown}
                        onTouchStart={handleDragTouchStart}
                        onTouchMove={handleDragTouchMove}
                        onTouchEnd={handleDragTouchEnd}
                        onTouchCancel={handleDragTouchEnd}
                        style={{ touchAction: 'none' }}
                    >
                        {isMobile && <div className="w-10 h-1 bg-gray-300 rounded-full" />}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSidebarToggle}
                        className="cursor-pointer hover:bg-gray-100"
                    >
                        <PanelRight className="h-5 w-5 text-gray-600"/>
                    </Button>

                    {showWindowButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleWindow}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            {isWindowMode ? (
                                <Maximize2 className="h-5 w-5 text-gray-600"/>
                            ) : (
                                <Minimize2 className="h-5 w-5 text-gray-600"/>
                            )}
                        </Button>
                    )}

                    {showMinimizeButton && onMinimize && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMinimize}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <Minus className="h-5 w-5 text-gray-600"/>
                        </Button>
                    )}

                </div>
            </header>
        </>
    );
});
ChatHeader.displayName = 'ChatHeader';

// ========== 主组件 ==========
function ChatPage({
                      chatMarkId,
                      documentMarkId,
                      pageType,
                      onNewChatMarkId,
                      showWindowButton = true,
                      showMinimizeButton = false,   // 是否显示最小化按钮（默认为 false）
                      onMinimize,                   // 最小化按钮点击回调
                      visible = true,               // 是否显示整个 ChatPage（默认为 true，变化时带动画）
                      onWindowModeChange,           // 窗口化模式变化回调
                  }) {
    const {t} = useTranslation();
    const chatPageRef = useRef(null);
    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);
    const currentMessageSendRequestIDRef = useRef(generateUUID());
    const currentMessagesLoadedRequestIDRef = useRef(generateUUID());
    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
    const [randomMark, setRandomMark] = useState(null);
    const errorToastsIds = useRef(new Map());
    const isMessageLoadedRef = useRef(false);
    const isLoadingDataRef = useRef(false);

    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesRef = useRef({});
    const messagesOrderRef = useRef([]);

    const isAutoScrollEnabledRef = useRef(true);
    const scrollCheckTimeoutRef = useRef(null);
    const pendingScrollRef = useRef(false);
    const chatBoxHeightRef = useRef(0);
    const lastScrollTopRef = useRef(0);
    const scrollDirectionRef = useRef('down');

    const isStreamingRef = useRef(false);
    const streamingTimerRef = useRef(null);
    const lastStreamingCheckRef = useRef(0);
    const [chatBoxHeight, setChatBoxHeight] = useState(0);
    const isMobile = useIsMobile();
    const [previewModel, setPreviewModel] = useState(null);
    const [isNewMarkId, setIsNewMarkId] = useState(false);
    const isNewMarkIdRef = useRef(false);
    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({name: t("no_models")});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [advancedSettings, setAdvancedSettings] = useState([]);
    const [initialSettingValues, setInitialSettingValues] = useState({});
    const [advancedSettingsValues, setAdvancedSettingsValues] = useState({});

    // ========== 窗口化模式状态与拖拽、缩放逻辑 ==========
    const [isReady, setIsReady] = useState(false);
    const [isWindowMode, setIsWindowMode] = useState(false);
    const [windowPos, setWindowPos] = useState({ left: 0, top: 0 });
    const [windowDimensions, setWindowDimensions] = useState({ width: 900, height: 700 });
    const windowRef = useRef(null);

    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isDragReady, setIsDragReady] = useState(false);
    const longPressTimerRef = useRef(null);

    const [isResizing, setIsResizing] = useState(false);
    const resizeOffsetRef = useRef({ width: 0, height: 0, startX: 0, startY: 0, direction: '' });

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
        setWindowPos({ left: newLeft, top: newTop });
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

        const { maxWidth, maxHeight } = getMaxDimensions();
        const minWidth = 320;
        const minHeight = 400;

        let newWidth = resizeOffsetRef.current.startWidth;
        let newHeight = resizeOffsetRef.current.startHeight;
        let newLeft = resizeOffsetRef.current.startLeft;
        let newTop = resizeOffsetRef.current.startTop;

        if (dir.includes('e')) {
            newWidth = Math.max(minWidth, Math.min(resizeOffsetRef.current.startWidth + deltaX, maxWidth, window.innerWidth - newLeft));
        } else if (dir.includes('w')) {
            let tempWidth = resizeOffsetRef.current.startWidth - deltaX;
            let clampedWidth = Math.max(minWidth, Math.min(tempWidth, maxWidth, resizeOffsetRef.current.startLeft + resizeOffsetRef.current.startWidth));
            newLeft = resizeOffsetRef.current.startLeft + (resizeOffsetRef.current.startWidth - clampedWidth);
            newWidth = clampedWidth;
        }

        if (dir.includes('s')) {
            newHeight = Math.max(minHeight, Math.min(resizeOffsetRef.current.startHeight + deltaY, maxHeight, window.innerHeight - newTop));
        } else if (dir.includes('n')) {
            let tempHeight = resizeOffsetRef.current.startHeight - deltaY;
            let clampedHeight = Math.max(minHeight, Math.min(tempHeight, maxHeight, resizeOffsetRef.current.startTop + resizeOffsetRef.current.startHeight));
            newTop = resizeOffsetRef.current.startTop + (resizeOffsetRef.current.startHeight - clampedHeight);
            newHeight = clampedHeight;
        }

        setWindowDimensions({ width: newWidth, height: newHeight });
        setWindowPos({ left: newLeft, top: newTop });
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

        document.addEventListener('touchmove', handleTouchMoveLocal, { passive: false });
        document.addEventListener('touchend', handleTouchEndLocal);
    }, [startResizing, handleResizeMove]);

    // ========== 幽灵层光标计算（用于拖拽/缩放期间保持正确鼠标样式） ==========
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

    // ========== 更新 toggleWindowMode（支持 onWindowModeChange 回调） ==========
    const toggleWindowMode = useCallback(() => {
        const newMode = !isWindowMode;
        onWindowModeChange?.(newMode);

        if (isWindowMode) {
            setIsWindowMode(false);
        } else {
            const { maxWidth, maxHeight } = getMaxDimensions();
            const initialW = window.innerWidth * 0.85;
            const initialH = window.innerHeight * 0.85;
            const l = (window.innerWidth - initialW) / 2;
            const t = (window.innerHeight - initialH) / 2;
            setWindowDimensions({ width: initialW, height: initialH });
            setWindowPos({ left: l, top: t });
            setIsWindowMode(true);
        }
    }, [isWindowMode, onWindowModeChange, getMaxDimensions]);

    // ========== 滚动控制逻辑 =========
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
    }, []);

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
    }, [checkScrollPosition]);

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
        };
    }, [checkScrollPosition]);

    useEffect(() => {
        executePendingScroll();
        if (isAutoScrollEnabledRef.current) {
            requestScrollToBottom();
        }
    }, [executePendingScroll, requestScrollToBottom]);

    // ========== Popover 相关函数 ==========
    const scrollToSelectedItem = useCallback((modelListRef) => {
        if (modelListRef?.current) {
            const selectedItem = modelListRef.current.querySelector('[data-selected="true"]');
            if (selectedItem) {
                requestAnimationFrame(() => {
                    selectedItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                });
            }
        }
    }, []);
    const handlePopoverOpenChange = useCallback((open) => {
        setIsModelPopoverOpen(open);
        if (!open) {
            setPreviewModel(null);
        } else {
            setPreviewModel(selectedModel);
        }
    }, [selectedModel]);
    const handleModelItemClick = useCallback((model) => {
        setSelectedModel(model);
        if (!isMobile) {
            setIsModelPopoverOpen(false);
        } else {
            setPreviewModel(model);
        }
    }, [isMobile]);
    const handleModelItemMouseEnter = useCallback((model) => {
        if (!isMobile) {
            setPreviewModel(model);
        }
    }, [isMobile]);

    // ========= 上传相关 =========
    const handleFolderDetected = useCallback(() => {
        toast.error(t("folder_upload_not_supported"));
    }, [t]);

    const handleSelectedFiles = useCallback((files, items = []) => {  // ← 默认值 items = []
        // 处理拖拽/粘贴时的纯文本插入（items 可能存在）
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.kind === 'string' && item.type === 'text/plain') {
                    item.getAsString(function (text) {
                        emitEvent({
                            type: "widget",
                            target: "ChatBox",
                            payload: { command: "Get-MessageContent" },
                            markId: chatMarkId,
                            fromWebsocket: true,
                            notReplyToWebsocket: true
                        }).then(payload => {
                            emitEvent({
                                type: "widget",
                                target: "ChatBox",
                                payload: {
                                    command: "Set-MessageContent",
                                    value: payload.value + text
                                },
                                markId: chatMarkId,
                                fromWebsocket: true
                            });
                        });
                    });
                }
            }
        }

        if (!(files && files.length > 0)) {
            return;
        }

        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const newUploadFiles = processSelectedFiles(files);
        if (newUploadFiles.length === 0) {
            isProcessingRef.current = false;
            return;
        }

        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx].progress = progress;
                    return updated;
                });
            };

            const handleComplete = (uploadId, attachment) => {
                setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                setAttachments(prev => [...prev, attachment]);
            };

            const cleanup = fileUpload(
                uploadFile,
                handleProgressUpdate,
                handleComplete,
                (error) => {
                    toast.error(t("file_upload.error", { message: error?.message || 'Upload failed' }));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? { ...f, error: true, progress: 0 } : f)
                    );
                }
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });

        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    }, [chatMarkId, t]);

    const onAttachmentRemove = useCallback((attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
    }, []);

    const handleImagePaste = useCallback((file) => {
        const fileList = {
            0: file,
            length: 1,
            item: (index) => (index === 0 ? file : null),
            [Symbol.iterator]: function* () {
                yield file;
            }
        };
        handleSelectedFiles(fileList, fileList);
    }, [handleSelectedFiles]);

    const handleRetryUpload = useCallback((uploadId) => {
        setUploadFiles(prev => {
            const fileToRetry = prev.find(f => f.id === uploadId);
            if (!fileToRetry || !fileToRetry.file) return prev;
            const updatedFile = {
                ...fileToRetry,
                progress: 0,
                error: null
            };
            const handleProgressUpdate = (id, progress) => {
                setUploadFiles(p => p.map(f => f.id === id ? {...f, progress} : f));
            };
            const handleComplete = (id, attachment) => {
                setUploadFiles(p => p.filter(f => f.id !== id));
                setAttachments(p => [...p, attachment]);
            };
            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || t("unknown_error")}));
                setUploadFiles(p => p.map(f => f.id === uploadId ? {...f, error: true, progress: 0} : f));
            };
            const cleanup = fileUpload(
                updatedFile,
                handleProgressUpdate,
                handleComplete,
                handleError
            );
            uploadIntervals.current.set(uploadId, cleanup);
            return prev.map(f => f.id === uploadId ? updatedFile : f);
        });
    }, [t]);

    const handleCancelUpload = useCallback((uploadId) => {
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    }, []);

    const handleFilePicker = useCallback(() => {
        return createFilePicker('*', handleSelectedFiles)();
    }, [handleSelectedFiles]);

    const handlePicPicker = useCallback(() => {
        return createFilePicker('image/*', handleSelectedFiles)();
    }, [handleSelectedFiles]);

    // ========= 消息相关 =========
    const handleSendMessage = useCallback((
        {
            messageContent,
            toolsStatus,
            isEditMessage = false,
            editMessageId,
            attachments,
            sendButtonStatus,
            isRegenerate = false,
            isFork = false,
            role
        }
    ) => {
        if (uploadFiles.length !== 0) {
            toast.error(t("file_upload_not_complete"));
            return;
        }
        const sendMessage = (markId) => {
            if (isFirstMessageSend) {
                emitEvent({
                    type: "widget",
                    target: "Sidebar",
                    payload: { command: "Update-ConversationDate" },
                    markId: markId,
                });
                setIsFirstMessageSend(false);
            }
            const eventPayload = {
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Message-Send",
                    content: messageContent,
                    toolsStatus: toolsStatus,
                    attachments: attachments,
                    isEdit: isEditMessage,
                    model: selectedModel.id,
                    sendButtonStatus: sendButtonStatus,
                    isRegenerate: isRegenerate,
                    isFork: isFork,
                    role: role,
                    options: advancedSettingsValues,
                    pageType: pageType,
                    documentMarkId: documentMarkId,
                    requestId: currentMessageSendRequestIDRef.current
                },
                markId: markId
            };
            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }
            emitEvent(eventPayload).then((payload) => {
                if (payload.success) {
                    currentMessageSendRequestIDRef.current = generateUUID();
                } else {
                    toast.error(t("send_message_error", {message: payload.value}));
                }
            });
            setAttachments([]);
        };
        if (!chatMarkId) {
            emitEvent({
                type: "page",
                target: "ChatPage",
                payload: {
                    command: "Get-MarkId",
                    requestId: currentMessageSendRequestIDRef.current
                }
            })
                .then((payload) => {
                    if (payload.success) {
                        setIsNewMarkId(true);
                        onNewChatMarkId(payload.value);
                        sendMessage(payload.value);
                    } else {
                        throw new Error(payload.value);
                    }
                })
                .catch((error) => {
                    toast.error(t("get_markid_error", {message: error?.message}));
                });
        } else {
            sendMessage(chatMarkId);
        }
    }, [chatMarkId, documentMarkId, isFirstMessageSend, selectedModel, advancedSettingsValues, pageType, t, uploadFiles, onNewChatMarkId]);

    const loadMoreHistory = useCallback(async () => {
        try {
            return new Promise((resolve, reject) => {
                apiClient
                    .get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                        params: {
                            markId: chatMarkId,
                            prevId: messagesOrder[1]
                        }
                    })
                    .then(data => {
                        const wasAutoScroll = isAutoScrollEnabledRef.current;
                        const newMessages = {...messagesRef.current, ...data.messages};
                        setMessages(newMessages);
                        messagesRef.current = newMessages;
                        let newOrder;
                        if (data.haveMore) {
                            newOrder = ['<PREV_MORE>', ...data.messagesOrder, ...messagesOrder.slice(1)];
                        } else {
                            newOrder = [...data.messagesOrder, ...messagesOrder.slice(1)];
                        }
                        setMessagesOrder(newOrder);
                        messagesOrderRef.current = newOrder;
                        if (!wasAutoScroll) {
                            checkScrollPosition(true);
                        }
                        resolve(true);
                    })
                    .catch(error => reject(error));
            });
        } catch (err) {
            throw err;
        }
    }, [chatMarkId, checkScrollPosition, messagesOrder, setMessages]);

    const loadSwitchMessage = useCallback(async (msgId, newMsgId) => {
        if (!(msgId in messagesRef.current)) return false;
        let newOrders = [];
        let loadStartId = newMsgId;
        let needsLoad = !(newMsgId in messagesRef.current);

        if (!needsLoad) {
            let cursor = messagesRef.current[newMsgId];
            newOrders.push(newMsgId);
            while (cursor.nextMessage) {
                const nextId = cursor.nextMessage;
                if (nextId in messagesRef.current) {
                    newOrders.push(nextId);
                    cursor = messagesRef.current[nextId];
                } else {
                    needsLoad = true;
                    loadStartId = nextId;
                    break;
                }
            }
        }
        let finalMessagesMap = messagesRef.current;

        if (needsLoad) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: chatMarkId, nextId: loadStartId},
                });
                finalMessagesMap = {...finalMessagesMap, ...data.messages};
                const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
                const newOrder = [
                    ...messagesOrderRef.current.slice(0, insertPoint),
                    ...newOrders,
                    ...data.messagesOrder,
                ];
                messagesOrderRef.current = newOrder;
                setMessagesOrder(newOrder);
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
                return false;
            }
        } else {
            const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
            const newOrder = [...messagesOrderRef.current.slice(0, insertPoint), ...newOrders];
            messagesOrderRef.current = newOrder;
            setMessagesOrder(newOrder);
        }

        const nextMessagesState = produce(finalMessagesMap, (draft) => {
            // 原有逻辑：设置 nextMessage
            if (draft[msgId]) {
                draft[msgId].nextMessage = newMsgId;
            }

            // 确保新消息也有挂载点功能（安全版本）
            if (newMsgId && draft[newMsgId]) {
                const msgDraft = draft[newMsgId];

                // 幂等保护：如果已经注入过，就不再重复注入
                if (typeof msgDraft.registerComponent === 'function') {
                    return;
                }

                // === 使用闭包存储 mountPoints，不依赖 draft ===
                const mountPoints = {};

                // 添加注册函数
                msgDraft.registerComponent = (componentKey, componentRef) => {
                    mountPoints[componentKey] = componentRef;
                };

                // 添加注销函数
                msgDraft.unregisterComponent = (componentKey) => {
                    delete mountPoints[componentKey];
                };

                // 添加获取函数
                msgDraft.getComponent = (componentKey) => {
                    return mountPoints[componentKey];
                };
            }
        });

        messagesRef.current = nextMessagesState;
        setMessages(nextMessagesState);
        return true;
    }, [chatMarkId, t, setMessages]);

    const switchMessage = useCallback(async (msg, msgId, delta) => {
        const msgId_index = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = msg.messages[msgId_index + delta];
        const sendSwitchRequest = () => {
            emitEvent({
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Switch-Message",
                    msgId,
                    nextMessage: newMsgId
                },
                markId: chatMarkId
            });
        };
        await loadSwitchMessage(msgId, newMsgId);
        sendSwitchRequest();
    }, [chatMarkId, loadSwitchMessage]);

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_messages")}
            zIndex="z-20"
        />
    );
    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t("load_error")}
            subtitle={t("retry_after_network")}
            zIndex="z-20"
        />
    );
    const emitMessagesLoaded = () => {
        setTimeout(() => {
            isMessageLoadedRef.current = true;
            emitEvent({
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Messages-Loaded",
                    requestId: currentMessagesLoadedRequestIDRef.current,
                    messagesOrder: messagesOrderRef.current[0] === '<PREV_MORE>' ? messagesOrderRef.current.slice(1) : messagesOrderRef.current
                },
                markId: chatMarkId,
                onTimeout: () => {
                    toast.warning(t("cannot_load_tasks"));
                }
            }).then((payload) => {
                if (payload.success) {
                    currentMessagesLoadedRequestIDRef.current = generateUUID();
                } else {
                    console.error("Cannot to load the tasks,", payload.value);
                }
            });
        }, 0)
    }

    useLayoutEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!messagesContainerRef.current) return;
        const observer = new ResizeObserver(() => {
            if (isAutoScrollEnabledRef.current) {
                requestScrollToBottom();
            }
            checkScrollPosition(true);
        });
        observer.observe(messagesContainerRef.current);
        return () => {
            observer.disconnect();
        };
    }, [checkScrollPosition, requestScrollToBottom]);

    useEffect(() => {
        if (isAutoScrollEnabledRef.current && messagesOrder.length > 0) {
            requestAnimationFrame(() => {
                if (pendingScrollRef.current) {
                    executePendingScroll();
                } else {
                    requestScrollToBottom();
                }
            });
        }
    }, [messagesOrder, executePendingScroll, requestScrollToBottom]);

    useEffect(() => {
        const unsubscribe1 = onEvent({
            type: "message",
            target: "ChatPage",
            markId: chatMarkId
        })
            .then(({ payload, reply }) => {
                switch (payload.command) {
                    case "Add-Message":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            let newMessages = { ...messagesRef.current };

                            for (const [key, newValue] of Object.entries(payload.value)) {
                                if (payload.isEdit && !newMessages[key]) {
                                    reply({ success: false });
                                    return;
                                }

                                if (newValue.messages === undefined) {
                                    newValue.messages = [];
                                }

                                if (typeof newValue === 'object') {
                                    if (newMessages[key] && typeof newMessages[key] === 'object' && newMessages[key] !== null) {
                                        newMessages[key] = { ...newMessages[key], ...newValue };
                                    } else {
                                        newMessages[key] = newValue;
                                    }
                                } else {
                                    newMessages[key] = newValue;
                                }

                                // === 安全注入 registerComponent / getComponent===
                                const msg = newMessages[key];
                                if (msg && typeof msg === 'object' && !msg.registerComponent) {
                                    const mountPoints = {};   // 真正的存储容器（不在 draft 上）

                                    msg.registerComponent = (componentKey, componentRef) => {
                                        mountPoints[componentKey] = componentRef;
                                    };

                                    msg.unregisterComponent = (componentKey) => {
                                        delete mountPoints[componentKey];
                                    };

                                    msg.getComponent = (componentKey) => {
                                        return mountPoints[componentKey];
                                    };
                                }
                            }

                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            setTimeout(() => {
                                if (wasAutoScroll) {
                                    requestScrollToBottom();
                                }
                                checkScrollPosition(true);
                            }, 50);

                            reply({ success: true });
                        }
                        break;
                    case "MessagesOrder-Meta":
                        if (Array.isArray(payload.value) && payload.value.length > 0) {
                            setTimeout(() => {
                                checkScrollPosition(true);
                                if (isAutoScrollEnabledRef.current) {
                                    requestScrollToBottom();
                                }
                            }, 50)
                            setMessagesOrder(payload.value);
                            messagesOrderRef.current = payload.value;
                            reply({value: payload.value});
                        } else {
                            reply({value: messagesOrderRef.current});
                        }
                        break;
                    case "Set-MessageContent":
                        if (payload.value && typeof payload.value === 'object') {
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newContent] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].content = newContent || '';
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0);
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageContent":
                        if (payload.value && typeof payload.value === 'object') {
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newContent] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].content = (draft[msgId].content || '') + (newContent || '');
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0);
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Set-MessageReplace":
                        if (payload.value && typeof payload.value === 'object') {
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newReplaces] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        if (!draft[msgId].extraInfo) {
                                            draft[msgId].extraInfo = {};
                                        }
                                        const currentReplace = draft[msgId].extraInfo.replace || {};
                                        draft[msgId].extraInfo.replace = {...currentReplace, ...newReplaces};
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    requestScrollToBottom();
                                }
                                checkScrollPosition(true);
                            }, 50);
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageReplaceContent":
                        if (payload.value && typeof payload.value === 'object') {
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, appendFields] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        if (!draft[msgId].extraInfo) {
                                            draft[msgId].extraInfo = {};
                                        }
                                        if (!draft[msgId].extraInfo.replace) {
                                            draft[msgId].extraInfo.replace = {};
                                        }
                                        for (const [key, appendString] of Object.entries(appendFields)) {
                                            const currentValue = draft[msgId].extraInfo.replace[key] || '';
                                            draft[msgId].extraInfo.replace[key] = currentValue + appendString;
                                        }
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0);
                            if (payload.reply) reply({success: true});
                        } else {
                            if (payload.reply) reply({success: false});
                        }
                        break;
                    case "Set-MessageAttachments":
                        if (payload.value && typeof payload.value === 'object') {
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newAttachments] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].attachments = newAttachments;
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    requestScrollToBottom();
                                }
                                checkScrollPosition(true);
                            }, 50);
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-Message-Messages":
                        if (payload.msgId && payload.value) {
                            if (!messagesRef.current[payload.msgId]) {
                                reply({success: false});
                                return;
                            }
                            if (messagesRef.current[payload.msgId].messages.includes(payload.value)) {
                                reply({success: false});
                                return;
                            }
                            const newMessages = produce(messagesRef.current, draft => {
                                draft[payload.msgId].messages = [...draft[payload.msgId].messages, payload.value];
                                if (payload.switch) {
                                    draft[payload.msgId].nextMessage = payload.value;
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            if (messagesRef.current[payload.value].nextMessage) {
                                emitEvent({
                                    type: "widget",
                                    target: "ChatPage",
                                    payload: {
                                        command: "Set-SwitchingMessage",
                                        value: payload.value
                                    },
                                    markId: chatMarkId,
                                    fromWebsocket: true,
                                    notReplyToWebsocket: true
                                }).then(() => {
                                    loadSwitchMessage(payload.msgId, payload.value).then(() => {
                                        emitEvent({
                                            type: "widget",
                                            target: "ChatPage",
                                            payload: {
                                                command: "Set-SwitchingMessage",
                                                value: null
                                            },
                                            markId: chatMarkId,
                                            fromWebsocket: true,
                                            notReplyToWebsocket: true
                                        })
                                        setTimeout(() => {
                                            if (isAutoScrollEnabledRef.current) {
                                                requestScrollToBottom();
                                            }
                                            checkScrollPosition(true);
                                        }, 50);
                                    });
                                });
                            } else {
                                setTimeout(() => {
                                    if (isAutoScrollEnabledRef.current) {
                                        requestScrollToBottom();
                                    }
                                    checkScrollPosition(true);
                                }, 50);
                            }
                            reply({success: true});
                        }
                        break;
                    case "Load-Switch-Message":
                        emitEvent({
                            type: "widget",
                            target: "ChatPage",
                            payload: {
                                command: "Set-SwitchingMessage",
                                value: payload.nextMessage
                            },
                            markId: chatMarkId,
                            fromWebsocket: true,
                            notReplyToWebsocket: true
                        }).then(() => {
                            loadSwitchMessage(payload.msgId, payload.nextMessage).then(() => {
                                emitEvent({
                                    type: "widget",
                                    target: "ChatPage",
                                    payload: {
                                        command: "Set-SwitchingMessage",
                                        value: null
                                    },
                                    markId: chatMarkId,
                                    fromWebsocket: true,
                                    notReplyToWebsocket: true
                                })
                            });
                        });
                        break;
                    case "Reload-Messages":
                        setRandomMark(generateUUID());
                        break;
                    case "Re-Messages-Loaded":
                        emitMessagesLoaded();
                        break;
                    case "Add-MessageNodes":
                        if (payload.value && typeof payload.value === 'object') {
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newNodes] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        if (!draft[msgId].network) {
                                            draft[msgId].network = {};
                                        }
                                        if (!draft[msgId].network.nodes) {
                                            draft[msgId].network.nodes = [];
                                        }

                                        // === 新增：按 id 去重 ===
                                        const currentNodes = draft[msgId].network.nodes;
                                        const incomingNodes = Array.isArray(newNodes) ? newNodes : [];
                                        const existingIds = new Set(currentNodes.map(n => n?.id).filter(Boolean));
                                        const uniqueNewNodes = incomingNodes.filter(n => n && n.id && !existingIds.has(n.id));

                                        draft[msgId].network.nodes = currentNodes.concat(uniqueNewNodes);
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0);
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageNetwork":
                        if (payload.value && typeof payload.value === 'object') {
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, networkUpdate] of Object.entries(payload.value)) {
                                    if (draft[msgId] && networkUpdate && typeof networkUpdate === 'object') {
                                        if (!draft[msgId].network) {
                                            draft[msgId].network = {};
                                        }

                                        // === 添加 nodes（支持部分更新 + id 去重）===
                                        if (networkUpdate.nodes !== undefined) {
                                            if (!draft[msgId].network.nodes) {
                                                draft[msgId].network.nodes = [];
                                            }
                                            const currentNodes = draft[msgId].network.nodes;
                                            const incomingNodes = Array.isArray(networkUpdate.nodes) ? networkUpdate.nodes : [];
                                            const existingIds = new Set(currentNodes.map(n => n?.id).filter(Boolean));
                                            const uniqueNewNodes = incomingNodes.filter(n => n && n.id && !existingIds.has(n.id));
                                            draft[msgId].network.nodes = currentNodes.concat(uniqueNewNodes);
                                        }

                                        // === 添加 relationships（支持部分更新 + id 去重）===
                                        if (networkUpdate.relationships !== undefined) {
                                            if (!draft[msgId].network.relationships) {
                                                draft[msgId].network.relationships = [];
                                            }
                                            const currentRels = draft[msgId].network.relationships;
                                            const incomingRels = Array.isArray(networkUpdate.relationships) ? networkUpdate.relationships : [];
                                            const existingRelIds = new Set(currentRels.map(r => r?.id).filter(Boolean));
                                            const uniqueNewRels = incomingRels.filter(r => r && r.id && !existingRelIds.has(r.id));
                                            draft[msgId].network.relationships = currentRels.concat(uniqueNewRels);
                                        }
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0);

                            if (payload.reply) reply({ success: true });
                        } else {
                            reply({ success: false });
                        }
                        break;
                    case "Focus-MessageNetwork":
                        if (payload.value && typeof payload.value === 'object') {
                            for (const [msgId, nodeIds] of Object.entries(payload.value)) {
                                const msg = messagesRef.current[msgId];

                                if (msg && nodeIds) {

                                    const nvlInstance = msg.getComponent("nvlInstance");

                                    // 将需要聚焦的节点挂载到 msg 中
                                    msg.registerComponent("focusNode", nodeIds);

                                    if (nvlInstance) {
                                        if (typeof nvlInstance.focusNetwork === 'function') {
                                            nvlInstance.focusNetwork(nodeIds);
                                            // 如果成功了，就取消挂载
                                            msg.unregisterComponent("focusNode");
                                        }
                                    } else {
                                        reply({ success: false })
                                    }

                                }
                            }

                            if (payload.reply) reply({ success: true });
                        } else {
                            if (payload.reply) reply({ success: false });
                        }
                        break;
                }
            });
        const unsubscribe2 = onEvent({
            type: "websocket",
            target: "onopen",
            markId: chatMarkId
        }).then(() => {
            if (isMessageLoadedRef.current) emitMessagesLoaded();
        });
        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, [chatMarkId, checkScrollPosition, requestScrollToBottom, smoothScrollToBottom, updateStreamingStatus, setMessages, loadSwitchMessage]);

    useEffect(() => {
        isNewMarkIdRef.current = isNewMarkId;
    }, [isNewMarkId]);

    useEffect(() => {
        if (chatMarkId === null || chatMarkId === undefined) {
            const emptyMessages = {};
            setMessages(emptyMessages);
            messagesRef.current = emptyMessages;
            const emptyOrder = [];
            setMessagesOrder(emptyOrder);
            messagesOrderRef.current = emptyOrder;
            setIsLoadingError(false);
            errorToastsIds.current.forEach((id) => {
                toast.dismiss(id);
            });
        }
    }, [chatMarkId, setMessages]);

    useEffect(() => {
        if (isNewMarkIdRef.current) {
            setIsNewMarkId(false);
            return;
        }
        let modelsData = [];
        const requestConversation = async () => {
            try {
                let data = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT + "/" + chatMarkId);
                const foundModel = modelsData.find(item => item.id === data.model)
                if (foundModel) setSelectedModel(foundModel);
                if (data.options) {
                    setAdvancedSettings(data.options);
                }
                if (data.defaultOptions) {
                    setAdvancedSettingsValues(data.defaultOptions);
                    setInitialSettingValues(data.defaultOptions);
                }
            } catch (error) {
                toast.error(t("load_conversation_error", {message: error?.message || t("unknown_error")}));
            }
        }
        const requestModels = async () => {
            try {
                modelsData = await apiClient.get(apiEndpoint.CHAT_MODELS_ENDPOINT, {
                    params: {markId: chatMarkId}
                });
                setModels(modelsData);
                if (modelsData.length > 0) {
                    setSelectedModel(modelsData[0]);
                    if (modelsData[0].options) {
                        setAdvancedSettings(modelsData[0].options);
                    }
                }
            } catch (error) {
                toast.error(t("load_models_error", {message: error?.message || t("unknown_error")}));
            }
        };
        const requestMessages = async () => {
            try {
                const messagesData = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: chatMarkId}
                });

                const messages = produce(messagesData.messages, (draft) => {
                    Object.keys(draft).forEach(key => {
                        const msgDraft = draft[key];

                        // 防御：确保是有效消息对象
                        if (!msgDraft || typeof msgDraft !== 'object') return;

                        // === 幂等判断，防止重复注入 ===
                        if (typeof msgDraft.registerComponent === 'function') return;

                        // 真正的存储容器（闭包变量，不会被 Immer freeze/revoke）
                        const mountPoints = {};

                        // 添加注册函数
                        msgDraft.registerComponent = (componentKey, componentRef) => {
                            mountPoints[componentKey] = componentRef;
                        };

                        // 添加注销函数
                        msgDraft.unregisterComponent = (componentKey) => {
                            delete mountPoints[componentKey];
                        };

                        // 添加获取函数
                        msgDraft.getComponent = (componentKey) => {
                            return mountPoints[componentKey];
                        };
                    });
                });

                setMessages(messages);
                messagesRef.current = messages;

                let initOrder = messagesData.messagesOrder;
                if (messagesData.haveMore) initOrder = ["<PREV_MORE>", ...messagesData.messagesOrder];
                setMessagesOrder(initOrder);
                messagesOrderRef.current = initOrder;

                setTimeout(() => {
                    setTimeout(() => {
                        isAutoScrollEnabledRef.current = true;
                        pendingScrollRef.current = true;
                        checkScrollPosition(true);
                        executePendingScroll();
                        const container = messagesContainerRef.current;
                        if (container) {
                            const {scrollHeight, clientHeight} = container;
                            const shouldShowButton = scrollHeight > clientHeight + 100;
                            setShowScrollToBottomButton(shouldShowButton);
                        }
                    }, 50);
                }, 100);
                emitMessagesLoaded();
            } catch (error) {
                errorToastsIds.current.set(toast(t("load_messages_error", {message: error?.message || t("unknown_error")}), {
                    action: {
                        label: t("retry"),
                        onClick: () => {
                            setIsLoading(true);
                            setIsLoadingError(false);
                            loadData();
                        },
                    },
                    closeButton: true,
                    duration: Infinity,
                }), true);
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
                setTimeout(() => {
                    if (messagesContainerRef.current) {
                        const container = messagesContainerRef.current;
                        const {scrollHeight} = container;
                        container.scrollTo({
                            top: scrollHeight,
                            behavior: 'auto'
                        });
                    }
                }, 200);
            }
        };
        const loadData = async () => {
            isLoadingDataRef.current = true;
            setIsLoading(true);
            await requestModels();
            await requestConversation();
            await requestMessages();
            isLoadingDataRef.current = false;
        };
        if (chatMarkId && !isLoadingDataRef.current) {
            setIsLoading(true);
            loadData();
        } else {
            setIsLoading(false);
            requestModels();
        }
        setIsLoadingError(false);
        setIsFirstMessageSend(true);
    }, [chatMarkId, randomMark, setMessages, t]);

    const handleChatBoxHeightChange = useCallback((newHeight) => {
        setChatBoxHeight(newHeight);
        chatBoxHeightRef.current = newHeight;
    }, []);

    const handleSidebarToggle = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    return (
        <>
            <motion.div
                ref={windowRef}
                className={`flex overflow-hidden bg-white ${
                    isWindowMode ? 'shadow-2xl border-2 border-gray-300' : ''
                }`}
                animate={{
                    left: isWindowMode ? windowPos.left : 0,
                    top: isWindowMode ? windowPos.top : 0,
                    width: isWindowMode ? windowDimensions.width : '100%',
                    height: isWindowMode ? windowDimensions.height : '100%',
                    borderRadius: isWindowMode ? 16 : 0,
                    scale: isWindowMode && isDragReady ? 1.02 : (visible ? 1 : 0.95),
                    opacity: visible ? 1 : 0,
                    boxShadow: isWindowMode
                        ? (isDragReady ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 30px -5px rgba(0, 0, 0, 0.2)')
                        : 'none'
                }}
                style={{
                    position: isWindowMode ? 'fixed' : 'relative',
                    zIndex: isWindowMode ? 9999 : 0,
                    pointerEvents: visible ? 'auto' : 'none',
                    width: isWindowMode ? undefined : '100%',
                    height: isWindowMode ? undefined : '100%',
                }}
                initial={false}
                layout={isReady}
                transition={
                    (isResizing || isDragging)
                        ? { duration: 0 }
                        : {
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1],
                            layout: {
                                duration: 0.35
                            },
                            width: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                restDelta: 0.5
                            },
                            left: { type: "tween", duration: isResizing || isDragging ? 0 : 0.35 },
                            top: { type: "tween", duration: isResizing || isDragging ? 0 : 0.35 },
                            opacity: { duration: 0.25 },
                            scale: { duration: 0.25 }
                        }
                }
            >
                <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden" ref={chatPageRef}>
                    <ChatHeader
                        models={models}
                        selectedModel={selectedModel}
                        isModelPopoverOpen={isModelPopoverOpen}
                        previewModel={previewModel}
                        isMobile={isMobile}
                        t={t}
                        handlePopoverOpenChange={handlePopoverOpenChange}
                        handleModelItemClick={handleModelItemClick}
                        handleModelItemMouseEnter={handleModelItemMouseEnter}
                        scrollToSelectedItem={scrollToSelectedItem}
                        isSidebarOpen={isSidebarOpen}
                        handleSidebarToggle={handleSidebarToggle}
                        isWindowMode={isWindowMode}
                        handleDragMouseDown={handleDragMouseDown}
                        handleDragTouchStart={handleDragTouchStart}
                        handleDragTouchMove={handleDragTouchMove}
                        handleDragTouchEnd={handleDragTouchEnd}
                        isDragReady={isDragReady}
                        showWindowButton={showWindowButton}
                        onToggleWindow={toggleWindowMode}
                        showMinimizeButton={showMinimizeButton}
                        onMinimize={onMinimize}
                    />

                    <div className="flex-1 w-full relative overflow-hidden">
                        <div
                            ref={messagesContainerRef}
                            className="h-full overflow-y-auto pb-20 scroll-smooth"
                            style={{maxHeight: 'calc(120vh - 256px)'}}
                        >
                            <MessageContainer
                                key={chatMarkId}
                                messagesOrder={messagesOrder}
                                messages={messages}
                                onLoadMore={loadMoreHistory}
                                onSwitchMessage={switchMessage}
                                markId={chatMarkId}
                            />
                        </div>
                        {isLoading && <LoadingScreen/>}
                        {isLoadingError && <LoadingFailedScreen/>}
                    </div>

                    <ScrollToBottomButton
                        isVisible={showScrollToBottomButton}
                        chatBoxHeight={chatBoxHeight}
                        onClick={handleScrollToBottomClick}
                    />

                    <div className="absolute z-10 inset-x-0 bottom-10 pointer-events-none">
                        <ChatBox
                            onSendMessage={handleSendMessage}
                            markId={chatMarkId}
                            attachmentsMeta={attachments}
                            setAttachments={setAttachments}
                            onAttachmentRemove={onAttachmentRemove}
                            uploadFiles={uploadFiles}
                            FilePickerCallback={handleFilePicker}
                            PicPickerCallback={handlePicPicker}
                            onImagePaste={handleImagePaste}
                            onRetryUpload={handleRetryUpload}
                            onCancelUpload={handleCancelUpload}
                            onDropFiles={handleSelectedFiles}
                            onFolderDetected={handleFolderDetected}
                            onHeightChange={handleChatBoxHeightChange}
                            dropTargetRef={chatPageRef}
                            selectedModel={selectedModel}
                            windowRef={windowRef}
                            isWindowMode={isWindowMode}
                        />
                    </div>

                    <footer
                        className="absolute inset-x-0 bottom-0 h-14 bg-white flex items-center justify-center ml-5 mr-5">
                        <span className="text-xs text-gray-500">
                          © {new Date().getFullYear()} lovePikachu. All rights reserved.
                        </span>
                    </footer>
                </div>

                <RightSidebar
                    isOpen={isSidebarOpen}
                    onClose={handleSidebarToggle}
                    advancedSettings={advancedSettings}
                    initialSettingValues={initialSettingValues || advancedSettingsValues}
                    onSettingChange={(values) => {
                        setAdvancedSettingsValues(values);
                        setInitialSettingValues(null);
                    }}
                    t={t}
                    containerRef={chatPageRef}
                    isWindowMode={isWindowMode}
                />

                {isWindowMode && (
                    <>
                        <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize z-[10000]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'n')} onTouchStart={(e) => handleResizeTouchStart(e, 'n')} style={{ touchAction: 'none' }}/>
                        <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-[10000]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 's')} onTouchStart={(e) => handleResizeTouchStart(e, 's')} style={{ touchAction: 'none' }}/>
                        <div className="absolute top-0 left-0 w-2 h-full cursor-w-resize z-[10000]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'w')} onTouchStart={(e) => handleResizeTouchStart(e, 'w')} style={{ touchAction: 'none' }}/>
                        <div className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-[10000]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'e')} onTouchStart={(e) => handleResizeTouchStart(e, 'e')} style={{ touchAction: 'none' }}/>

                        <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-[10001]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} onTouchStart={(e) => handleResizeTouchStart(e, 'nw')} style={{ touchAction: 'none' }}/>
                        <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-[10001]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} onTouchStart={(e) => handleResizeTouchStart(e, 'ne')} style={{ touchAction: 'none' }}/>
                        <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-[10001]"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} onTouchStart={(e) => handleResizeTouchStart(e, 'sw')} style={{ touchAction: 'none' }}/>
                        <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-[10001] flex items-end justify-end p-1"
                             onMouseDown={(e) => handleResizeMouseDown(e, 'se')} onTouchStart={(e) => handleResizeTouchStart(e, 'se')} style={{ touchAction: 'none' }}>
                            <svg className="w-3 h-3 text-gray-400 opacity-60 hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M21 15l-6 6 M21 9l-12 12 M21 3l-18 18" />
                            </svg>
                        </div>
                    </>
                )}
            </motion.div>

            {isWindowMode && (isDragging || isResizing) && (
                <div
                    className="fixed inset-0 bg-transparent pointer-events-auto z-[9998]"
                    style={{
                        cursor: ghostCursor,
                    }}
                />
            )}
        </>
    );
}
export default ChatPage;