import React, {useEffect, useState, useRef, useCallback, useMemo, memo, useLayoutEffect} from 'react';
import {useImmer} from 'use-immer';
import {produce} from 'immer';
import {
    generateUUID,
    getMarkId,
    getLocalSetting,
    updateURL,
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
import {ArrowDown, ChevronDown, CircleCheck, PanelRight, X} from 'lucide-react';
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
                <div className="flex flex-wrap gap-1">
                    {model.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
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
            {/* 移动端按钮 - 中屏及以下显示 (max-lg) */}
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="xl:hidden" // 大屏时隐藏
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

            {/* 桌面端按钮 - 大屏显示 (lg+) */}
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="hidden xl:block" // 仅大屏显示
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
                               containerRef
                           }) => {
    const [lockedMode, setLockedMode] = useState(null);
    const sidebarRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const BREAKPOINT = 920;

        if (isOpen && lockedMode === null) {
            // 首次打开：根据容器宽度锁定模式
            const isDesktop = container.clientWidth > BREAKPOINT;
            setLockedMode(isDesktop);
        } else if (!isOpen && lockedMode !== null) {
            // 关闭后延迟重置，避免闪烁，匹配 transition duration-300
            const timer = setTimeout(() => {
                setLockedMode(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, containerRef, lockedMode]);

    // 🎯 侧边栏内容渲染（抽离避免重复代码）
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

    if (lockedMode === null) {
        return null;
    }

    if (lockedMode) {
        return (
            <motion.div
                ref={sidebarRef}
                initial={{ width: 0 }}
                animate={{ width: isOpen ? '16rem' : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full bg-white border-l overflow-hidden flex-shrink-0"
            >
                {/* 内部固定宽度容器，避免内容随动画缩放 */}
                <div className="w-[16rem] h-full flex flex-col">
                    {/* 标题栏 */}
                    <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                        <span className="font-medium text-gray-700">
                            {t("advanced_conversation_settings")}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                            aria-label={t("close")}
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                    {/* 内容区域 */}
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={onClose}
                />
            )}

            {/* 🗄️ 侧边栏抽屉：从右侧滑入滑出 */}
            <motion.div
                ref={sidebarRef}
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-50 flex flex-col"
            >
                {/* 标题栏 */}
                <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                    <span className="font-medium text-gray-700">
                        {t("advanced_conversation_settings")}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                        aria-label={t("close")}
                    >
                        <X className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
                {/* 内容区域 */}
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
                             handleSidebarToggle,
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
                {/* 左侧：模型选择 */}
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

                {/* 右侧：侧边栏触发按钮 */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSidebarToggle}
                    className="cursor-pointer hover:bg-gray-100"
                >
                    <PanelRight className="h-5 w-5 text-gray-600"/>
                </Button>
            </header>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.models === nextProps.models &&
        prevProps.selectedModel?.id === nextProps.selectedModel?.id &&
        prevProps.isModelPopoverOpen === nextProps.isModelPopoverOpen &&
        prevProps.previewModel?.id === nextProps.previewModel?.id &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.t === nextProps.t &&
        prevProps.handlePopoverOpenChange === nextProps.handlePopoverOpenChange &&
        prevProps.handleModelItemClick === nextProps.handleModelItemClick &&
        prevProps.handleModelItemMouseEnter === nextProps.handleModelItemMouseEnter &&
        prevProps.scrollToSelectedItem === nextProps.scrollToSelectedItem &&
        prevProps.isSidebarOpen === nextProps.isSidebarOpen &&       // 新增
        prevProps.handleSidebarToggle === nextProps.handleSidebarToggle  // 新增
    );
});

ChatHeader.displayName = 'ChatHeader';

// ========== 主组件 ==========
function ChatPage({markId, setMarkId, pageType}) {
    const {t} = useTranslation();
    const chatPageRef = useRef(null);
    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);
    const [selfMarkId, setSelfMarkId] = [markId, setMarkId];

    const currentMessageSendRequestIDRef = useRef(generateUUID());
    const currentMessagesLoadedRequestIDRef = useRef(generateUUID());

    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

    // 加载相关
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
    const [randomMark, setRandomMark] = useState(null);
    const errorToastsIds = useRef(new Map())
    const isMessageLoadedRef = useRef(false);
    const isLoadingDataRef = useRef(false);  // 是否正在初始化请求内容

    // 消息状态
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesRef = useRef({});
    const messagesOrderRef = useRef([]);

    // 滚动相关 refs
    const isAutoScrollEnabledRef = useRef(true);
    const scrollCheckTimeoutRef = useRef(null);
    const pendingScrollRef = useRef(false);
    const chatBoxHeightRef = useRef(0);
    const lastScrollTopRef = useRef(0);
    const scrollDirectionRef = useRef('down');

    // 流式输出相关 refs
    const isStreamingRef = useRef(false);
    const streamingTimerRef = useRef(null);
    const lastStreamingCheckRef = useRef(0);

    const [chatBoxHeight, setChatBoxHeight] = useState(0);
    const isMobile = useIsMobile();
    const [previewModel, setPreviewModel] = useState(null);
    const [isNewMarkId, setIsNewMarkId] = useState(false);
    const isNewMarkIdRef = useRef(false);
    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

    // 模型控制相关
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({name: t("no_models")});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // 右侧边设置栏
    const [advancedSettings, setAdvancedSettings] = useState([]);  // 模型高级设置
    const [initialSettingValues, setInitialSettingValues] = useState({});  // 初始化配置
    const [advancedSettingsValues, setAdvancedSettingsValues] = useState({});  // 最终设置的结果


    // ========== 滚动控制逻辑 =========

    // 检查是否需要显示置底按钮
    const checkScrollPosition = useCallback((immediate = false) => {
        if (!messagesContainerRef.current) return;

        const {scrollTop, scrollHeight, clientHeight} = messagesContainerRef.current;
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;

        // 检测滚动方向
        if (scrollTop < lastScrollTopRef.current) {
            scrollDirectionRef.current = 'up';
        } else if (scrollTop > lastScrollTopRef.current) {
            scrollDirectionRef.current = 'down';
        }
        lastScrollTopRef.current = scrollTop;

        // 减小阈值，提高敏感度
        const THRESHOLD = 100; // 从200减小到100

        // 更新自动滚动状态 - 放宽条件
        // 如果用户在底部100像素范围内，或者正在向下滚动且距离底部小于200像素，都认为是自动滚动状态
        const isNearBottom = distanceToBottom <= THRESHOLD;
        const isScrollingDownNearBottom = scrollDirectionRef.current === 'down' && distanceToBottom < 200;

        isAutoScrollEnabledRef.current = isNearBottom || isScrollingDownNearBottom;

        // 是否需要显示置底按钮：不在底部且是向上滚动
        // 增加显示按钮的条件：只要不在底部就显示，不限制滚动方向
        const shouldShowButton = distanceToBottom > THRESHOLD;

        if (immediate) {
            setShowScrollToBottomButton(shouldShowButton);
        } else {
            // 防抖处理
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current);
            }
            scrollCheckTimeoutRef.current = setTimeout(() => {
                setShowScrollToBottomButton(shouldShowButton);
            }, 150);
        }
    }, []);

    // 平滑滚动到底部
    const smoothScrollToBottom = useCallback((isStreaming = false) => {
        if (!messagesContainerRef.current) return;

        const container = messagesContainerRef.current;
        const targetScrollTop = container.scrollHeight - container.clientHeight;

        // 如果已经在底部（相差小于1像素），不执行滚动
        if (Math.abs(container.scrollTop - targetScrollTop) < 1) {
            isAutoScrollEnabledRef.current = true;
            pendingScrollRef.current = false;
            return;
        }

        const currentScrollTop = container.scrollTop;
        const distance = targetScrollTop - currentScrollTop;

        // 增加最小滚动距离判断
        if (Math.abs(distance) < 1) return;

        // 如果距离很近，直接滚动
        if (Math.abs(distance) < 50) {
            container.scrollTo({
                top: targetScrollTop,
                behavior: isStreaming ? 'auto' : 'smooth'
            });

            // 滚动完成后更新状态
            setTimeout(() => {
                isAutoScrollEnabledRef.current = true;
                pendingScrollRef.current = false;
                checkScrollPosition(true);
            }, 100);
            return;
        }

        // 流式输出时使用更简单的滚动
        if (isStreaming) {
            container.scrollTo({
                top: targetScrollTop,
                behavior: 'auto'
            });
            return;
        }

        // 使用 requestAnimationFrame 实现平滑滚动
        const duration = 300;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const newScrollTop = currentScrollTop + distance * easeOutCubic;

            container.scrollTop = newScrollTop;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // 滚动完成后更新状态
                isAutoScrollEnabledRef.current = true;
                pendingScrollRef.current = false;
                checkScrollPosition(true);
            }
        };

        requestAnimationFrame(animateScroll);
    }, [checkScrollPosition]);

    // 执行延迟滚动（如果有待处理的滚动）
    const executePendingScroll = useCallback(() => {
        if (pendingScrollRef.current && isAutoScrollEnabledRef.current) {
            pendingScrollRef.current = false;

            // 延迟执行滚动，避免卡顿
            setTimeout(() => {
                smoothScrollToBottom(isStreamingRef.current);
            }, isStreamingRef.current ? 50 : 100); // 流式输出时使用更短的延迟
        }
    }, [smoothScrollToBottom]);

    // 请求滚动到底部（会被延迟执行）
    const requestScrollToBottom = useCallback(() => {
        if (isAutoScrollEnabledRef.current) {
            pendingScrollRef.current = true;

            // 如果是流式输出，立即执行滚动
            if (isStreamingRef.current) {
                executePendingScroll();
            }
        }
    }, [executePendingScroll]);

    // 立即滚动到底部（用户点击按钮时使用）
    const handleScrollToBottomClick = useCallback(() => {
        pendingScrollRef.current = false;
        isAutoScrollEnabledRef.current = true;
        smoothScrollToBottom();
        setShowScrollToBottomButton(false);
    }, [smoothScrollToBottom]);

    // 更新流式输出状态
    const updateStreamingStatus = useCallback(() => {
        const now = Date.now();

        // 如果最近500ms内有过更新，认为是流式输出
        if (now - lastStreamingCheckRef.current < 500) {
            isStreamingRef.current = true;

            // 清除之前的计时器
            if (streamingTimerRef.current) {
                clearTimeout(streamingTimerRef.current);
            }

            // 设置计时器，500ms没有更新则认为流式输出结束
            streamingTimerRef.current = setTimeout(() => {
                isStreamingRef.current = false;
            }, 500);
        }

        lastStreamingCheckRef.current = now;
    }, []);

    // 初始化滚动监听
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            checkScrollPosition();
        };

        container.addEventListener('scroll', handleScroll, {passive: true});

        // 初始化检查
        checkScrollPosition(true);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current);
            }
        };
    }, [checkScrollPosition]);

    // 消息更新后检查是否需要滚动
    useEffect(() => {
        // 如果有待处理的滚动，执行滚动
        executePendingScroll();

        // 新消息到达时，如果用户在看最新消息，延迟滚动
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
    });

    const handleSelectedFiles = useCallback((files, items) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'string' && item.type === 'text/plain') {
                item.getAsString(function (text) {
                    emitEvent({
                        type: "widget",
                        target: "ChatBox",
                        payload: {
                            command: "Get-MessageContent"
                        },
                        markId: selfMarkId,
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
                            markId: selfMarkId,
                            fromWebsocket: true
                        })
                    })
                });
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
                    toast.error(t("file_upload.error", {message: error?.message || 'Upload failed'}));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
                    );
                }
            );
            uploadIntervals.current.set(uploadFile.id, cleanup);
        });
        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    }, [selfMarkId]);

    const onAttachmentRemove = useCallback((attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
    });


    const handleImagePaste = useCallback((file) => {
        const fileList = {
            0: file,
            length: 1,
            item: (index) => (index === 0 ? file : null),
            [Symbol.iterator]: function* () {
                yield file;
            }
        };
        handleSelectedFiles(fileList);
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
    },);

    const handleCancelUpload = useCallback((uploadId) => {
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    }, []);

    const handleFilePicker = useCallback(() => {
        return createFilePicker('*', handleSelectedFiles);
    }, [handleSelectedFiles]);

    const handlePicPicker = useCallback(() => {
        return createFilePicker('image/*', handleSelectedFiles);
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
        }  // 发送的角色身份
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
                    payload: {
                        command: "Update-ConversationDate"
                    },
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
                    requestId: currentMessageSendRequestIDRef.current
                },
                markId: markId
            };
            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }
            emitEvent(eventPayload).then((payload, markId, isReply, id, reply) => {
                if (payload.success) {
                    currentMessageSendRequestIDRef.current = generateUUID();
                } else {
                    toast.error(t("send_message_error", {message: payload.value}));
                }
            });
        };

        if (!selfMarkId) {
            emitEvent({
                type: "page",
                target: "ChatPage",
                payload: {
                    command: "Get-MarkId",
                    requestId: currentMessageSendRequestIDRef.current
                }
            })
                .then((payload, markId, isReply, id, reply) => {
                    if (payload.success) {
                        setIsNewMarkId(true);
                        setSelfMarkId(payload.value);
                        updateURL("/chat/" + payload.value);
                        sendMessage(payload.value);
                    } else {
                        throw new Error(payload.value);
                    }
                })
                .catch((error) => {
                    toast.error(t("get_markid_error", {message: error?.message}));
                });
        } else {
            sendMessage(selfMarkId);
        }
    }, [selfMarkId, isFirstMessageSend, selectedModel, advancedSettingsValues]);


    const loadMoreHistory = useCallback(async () => {
        try {
            return new Promise((resolve, reject) => {
                apiClient
                    .get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                        params: {
                            markId: selfMarkId,
                            prevId: messagesOrder[1]
                        }
                    })
                    .then(data => {
                        // 保存当前的滚动状态
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

                        // 如果不是自动滚动状态，检查是否需要显示置底按钮
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
    }, [selfMarkId, checkScrollPosition]);

    const loadSwitchMessage = useCallback(async (msgId, newMsgId) => {
        if (!(msgId in messagesRef.current)) return false;

        let newOrders = [];
        let loadStartId = newMsgId;
        let needsLoad = !(newMsgId in messagesRef.current);

        // 1. 寻找本地断点 (保持原逻辑)
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

        let finalMessagesMap = messagesRef.current; // 临时变量持有最新内容

        // 2. 如果需要从服务端加载
        if (needsLoad) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: selfMarkId, nextId: loadStartId},
                });

                // 合并新加载的消息到临时对象
                finalMessagesMap = {...finalMessagesMap, ...data.messages};

                // 更新 Order (只在需要时更新)
                const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
                const newOrder = [
                    ...messagesOrderRef.current.slice(0, insertPoint),
                    ...newOrders,
                    ...data.messagesOrder,
                ];

                // 同步更新 Ref 和 State (Order)
                messagesOrderRef.current = newOrder;
                setMessagesOrder(newOrder);
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
                return false;
            }
        } else {
            // 3. 本地已存在，仅更新 Order
            const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
            const newOrder = [...messagesOrderRef.current.slice(0, insertPoint), ...newOrders];
            messagesOrderRef.current = newOrder;
            setMessagesOrder(newOrder);
        }

        // 4. 关键：统一更新指针并只调用一次 setMessages
        // 使用 produce 确保基于最新的 finalMessagesMap 操作
        const nextMessagesState = produce(finalMessagesMap, (draft) => {
            if (draft[msgId]) {
                draft[msgId].nextMessage = newMsgId;
            }
        });

        // 最终同步
        messagesRef.current = nextMessagesState;
        setMessages(nextMessagesState);

        return true;
    }, [selfMarkId]);

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
                markId: selfMarkId
            });

        };
        await loadSwitchMessage(msgId, newMsgId);
        sendSwitchRequest();
    }, [selfMarkId]);

    // // ========= 加载相关 =========

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
                markId: selfMarkId,
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

    // 添加一个ResizeObserver来监听内容高度变化
    useEffect(() => {
        if (!messagesContainerRef.current) return;

        const observer = new ResizeObserver(() => {
            // 如果自动滚动启用，立即滚动到底部
            if (isAutoScrollEnabledRef.current) {
                requestScrollToBottom();
            }
            // 总是检查滚动位置
            checkScrollPosition(true);
        });

        observer.observe(messagesContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [checkScrollPosition, requestScrollToBottom]);

    // 监听消息内容的变化
    useEffect(() => {
        // 如果消息有变化且自动滚动启用，滚动到底部
        if (isAutoScrollEnabledRef.current && messagesOrder.length > 0) {
            // 使用requestAnimationFrame确保在下一帧执行
            requestAnimationFrame(() => {
                if (pendingScrollRef.current) {
                    executePendingScroll();
                } else {
                    requestScrollToBottom();
                }
            });
        }
    }, [messagesOrder, executePendingScroll, requestScrollToBottom]);

    // === 广播事件 ===
    useEffect(() => {

        const unsubscribe1 = onEvent({
            type: "message",
            target: "ChatPage",
            markId: selfMarkId
        })
            .then(({
                       payload: payload,
                       reply: reply
                   }) => {
                switch (payload.command) {
                    case "Add-Message":
                        if (payload.value && typeof payload.value === 'object') {
                            // 保存当前的自动滚动状态
                            const wasAutoScroll = isAutoScrollEnabledRef.current;

                            let newMessages = {...messagesRef.current};
                            for (const [key, newValue] of Object.entries(payload.value)) {
                                if (payload.isEdit && !newMessages[key]) {
                                    reply({success: false});
                                    return;
                                }
                                if (newValue.messages === undefined) {
                                    newValue.messages = [];
                                }
                                if (typeof newValue === 'object') {
                                    if (newMessages[key] && typeof newMessages[key] === 'object' && newMessages[key] !== null) {
                                        newMessages[key] = {...newMessages[key], ...newValue};
                                    } else {
                                        newMessages[key] = newValue;
                                    }
                                } else {
                                    newMessages[key] = newValue;
                                }
                            }
                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            // 延迟检查滚动位置
                            setTimeout(() => {
                                if (wasAutoScroll) {
                                    requestScrollToBottom();
                                }
                                checkScrollPosition(true);
                            }, 50);

                            reply({success: true});
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
                            // 更新流式输出状态
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
                                    // 流式输出时使用更积极的滚动
                                    if (isStreamingRef.current) {
                                        smoothScrollToBottom(true);
                                    } else {
                                        requestScrollToBottom();
                                    }
                                }
                                checkScrollPosition(true);
                            }, 0); // 立即检查

                            if (payload.reply) reply({success: true});
                        } else {
                            console.error("Set-MessageContent Failed. msgId, value is need at least.")
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageContent":
                        if (payload.value && typeof payload.value === 'object') {
                            // 更新流式输出状态
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

                            // 流式输出时立即检查滚动，不使用延迟
                            setTimeout(() => {
                                if (isAutoScrollEnabledRef.current) {
                                    // 如果是流式输出，立即滚动
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
                            console.error("Add-MessageContent Failed. msgId, value is need at least.")
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
                            console.error("Add-MessageReplace Failed. msgId, value is need at least.")
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageReplaceContent":
                        if (payload.value && typeof payload.value === 'object') {
                            // 更新流式输出状态
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
                                    // 如果是流式输出，立即滚动
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
                            console.error("Add-MessageReplaceContent Failed. payload.value must be an object.");
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
                            console.error("Add-MessageReplace Failed. msgId, value is need at least.")
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

                            // 是否还有消息没加载完
                            if (messagesRef.current[payload.value].nextMessage) {

                                emitEvent({
                                    type: "widget",
                                    target: "ChatPage",
                                    payload: {
                                        command: "Set-SwitchingMessage",
                                        value: payload.value
                                    },
                                    markId: selfMarkId,
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
                                            markId: selfMarkId,
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
                        } else {
                            console.error('Add-Message-Messages Failed. msgId, value is need at least.');
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
                            markId: selfMarkId,
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
                                    markId: selfMarkId,
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
                }
            });

        const unsubscribe2 = onEvent({
            type: "websocket",
            target: "onopen",
            markId: selfMarkId
        }).then(() => {
            if (isMessageLoadedRef.current) emitMessagesLoaded();
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, [selfMarkId, checkScrollPosition, requestScrollToBottom, smoothScrollToBottom, updateStreamingStatus]);

    // 同步更新的 MarkID
    useEffect(() => {
        isNewMarkIdRef.current = isNewMarkId;
    }, [isNewMarkId]);

    // 进入新会话的情况
    useEffect(() => {
        if (selfMarkId === null || selfMarkId === undefined) {
            const emptyMessages = {};
            setMessages(emptyMessages);
            messagesRef.current = emptyMessages;

            const emptyOrder = [];
            setMessagesOrder(emptyOrder);
            messagesOrderRef.current = emptyOrder;

            setIsLoadingError(false);

            // 关掉所有加载错误
            errorToastsIds.current.forEach((id, _) => {
                toast.dismiss(id);
            });
        }
    }, [selfMarkId])

    // 页面初始化加载消息
    useEffect(() => {
        if (isNewMarkIdRef.current) {
            setIsNewMarkId(false);
            return;
        }

        let modelsData = [];

        const requestConversation = async () => {
            try {
                let data = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT + "/" + selfMarkId);

                // 设置当前选中模型
                const foundModel = modelsData.find(item => item.id === data.model)
                if (foundModel) setSelectedModel(foundModel);

                // 获取高级选项
                if (data.options) {
                    setAdvancedSettings(data.options);
                }

                // 高级选项的高级配置项
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
                    params: markId ? {markId: selfMarkId} : {}
                });

                setModels(modelsData);

                if (modelsData.length > 0) setSelectedModel(modelsData[0]);
            } catch (error) {
                toast.error(t("load_models_error", {message: error?.message || t("unknown_error")}));
            }
        };

        const requestMessages = async () => {
            try {
                const messagesData = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: selfMarkId}
                });

                setMessages(messagesData.messages);
                messagesRef.current = messagesData.messages;

                let initOrder = messagesData.messagesOrder;
                if (messagesData.haveMore) initOrder = ["<PREV_MORE>", ...messagesData.messagesOrder];
                setMessagesOrder(initOrder);
                messagesOrderRef.current = initOrder;

                // 使用双重的setTimeout确保DOM完全更新
                // 第一个setTimeout确保React状态更新
                setTimeout(() => {
                    // 第二个setTimeout确保DOM渲染完成
                    setTimeout(() => {
                        // 强制启用自动滚动
                        isAutoScrollEnabledRef.current = true;
                        pendingScrollRef.current = true;

                        // 立即检查滚动位置
                        checkScrollPosition(true);

                        // 执行滚动
                        executePendingScroll();

                        // 确保置底按钮正确显示
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

                // 确保滚动状态正确
                setTimeout(() => {
                    if (messagesContainerRef.current) {
                        const container = messagesContainerRef.current;
                        const {scrollTop, scrollHeight, clientHeight} = container;
                        const distanceToBottom = scrollHeight - scrollTop - clientHeight;

                        // 如果距离底部超过阈值，显示置底按钮
                        if (distanceToBottom > 100) {
                            setShowScrollToBottomButton(true);
                        }

                        // 强制滚动到底部
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

        if (selfMarkId && !isLoadingDataRef.current) {
            setIsLoading(true);
            loadData();
        } else {
            setIsLoading(false);
            requestModels();
        }

        setIsLoadingError(false);
        setIsFirstMessageSend(true);
    }, [selfMarkId, randomMark]);

    const handleChatBoxHeightChange = useCallback((newHeight) => {
        setChatBoxHeight(newHeight);
        chatBoxHeightRef.current = newHeight;
    }, []);

    const handleSidebarToggle = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    return (
        // 1. 根容器改为 flex，支持横向排列（桌面端侧边栏）
        <div className="flex h-screen overflow-hidden bg-white">

            {/* 2. 主内容区域包裹层：占据剩余空间，保持原有纵向布局 */}
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
                />

                {/* 消息容器区域 */}
                <div className="flex-1 w-full relative overflow-hidden">
                    <div
                        ref={messagesContainerRef}
                        className="h-full overflow-y-auto pb-20 scroll-smooth"
                        style={{maxHeight: 'calc(120vh - 256px)'}}
                    >
                        <MessageContainer
                            key={selfMarkId}
                            messagesOrder={messagesOrder}
                            messages={messages}
                            onLoadMore={loadMoreHistory}
                            onSwitchMessage={switchMessage}
                            markId={selfMarkId}
                        />
                    </div>
                    {isLoading && <LoadingScreen/>}
                    {isLoadingError && <LoadingFailedScreen/>}
                </div>

                {/* 置底按钮 */}
                <ScrollToBottomButton
                    isVisible={showScrollToBottomButton}
                    chatBoxHeight={chatBoxHeight}
                    onClick={handleScrollToBottomClick}
                />

                {/* 输入框区域 (保持绝对定位相对于父容器) */}
                <div className="absolute z-10 inset-x-0 bottom-10 pointer-events-none">
                    <ChatBox
                        onSendMessage={handleSendMessage}
                        markId={selfMarkId}
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
                    />
                </div>

                {/* Footer (保持绝对定位相对于父容器) */}
                <footer
                    className="absolute inset-x-0 bottom-0 h-14 bg-white flex items-center justify-center ml-5 mr-5">
                    <span className="text-xs text-gray-500">
                      © {new Date().getFullYear()} lovePikachu. All rights reserved.
                    </span>
                </footer>
            </div>

            {/* 3. 侧边栏组件：作为兄弟元素，根据 isMobile 决定是覆盖还是挤压 */}
            <RightSidebar
                isOpen={isSidebarOpen}
                onClose={handleSidebarToggle}
                advancedSettings={advancedSettings}
                initialSettingValues={initialSettingValues}
                onSettingChange={(values) => {
                    setAdvancedSettingsValues(values);
                }}
                t={t}
                containerRef={chatPageRef}
            />
        </div>
    );
}

export default ChatPage;