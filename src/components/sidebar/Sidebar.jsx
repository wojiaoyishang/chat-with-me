import React, {useState, useEffect, useRef} from 'react';
import {format, isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import { ChevronRight, X, Plus, BookOpen } from 'lucide-react';
import {generateUUID, UnifiedErrorScreen, UnifiedLoadingScreen, updateURL} from "@/lib/tools.jsx";
import {Transition} from '@headlessui/react';
import {useTranslation} from "react-i18next";
import {useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {onEvent} from "@/store/useEventStore.jsx";

const Sidebar = ({
                     markId, setMarkId, setPageType,
                     settings, setRandomUUID
                 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const {t, i18n} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(min-width: 768px)');
        setIsOpen(mql.matches);
        const handler = (e) => setIsOpen(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', isOpen ? '16rem' : '0px');
    }, [isOpen]);

    useEffect(() => {
        if (!isMobile) return;
        let startX = 0;
        let startY = 0;
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = Math.abs(e.changedTouches[0].clientY - startY);
            const deltaX = endX - startX;
            const deltaY = Math.abs(endY - startY);
            if (deltaY > 50) return;
            if (!isOpen && deltaX > 30 && startX < 150) {
                setIsOpen(true);
            } else if (isOpen && deltaX < -30) {
                setIsOpen(false);
            }
        };
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isOpen, isMobile]);

    const [conversations, setConversations] = useState([]);
    const [oldPositions, setOldPositions] = useState(null);
    const [titleTransitioning, setTitleTransitioning] = useState({});
    const [titleCache, setTitleCache] = useState({}); // 缓存标题用于过渡
    const listRef = useRef(null);

    const loadConversations = async () => {
        setIsLoading(true);
        setIsLoadingError(false);
        try {
            const histories = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT);
            const formattedConversations = histories.map(conv => ({
                ...conv,
                updateDate: new Date(conv.updateDate)
            })).sort((a, b) => b.updateDate - a.updateDate);
            setConversations(formattedConversations);
        } catch (error) {
            setIsLoadingError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadConversations();
    }, []);

    const groupConversations = () => {
        const groups = {
            Today: [],
            Yesterday: [],
            'Past 7 Days': [],
            'Past Month': [],
            Earlier: [],
        };
        conversations.forEach((conv) => {
            const convDate = new Date(conv.updateDate);
            if (isToday(convDate)) {
                groups.Today.push(conv);
            } else if (isYesterday(convDate)) {
                groups.Yesterday.push(conv);
            } else if (isWithinInterval(convDate, {start: subDays(new Date(), 7), end: subDays(new Date(), 1)})) {
                groups['Past 7 Days'].push(conv);
            } else if (isWithinInterval(convDate, {start: subMonths(new Date(), 1), end: subDays(new Date(), 7)})) {
                groups['Past Month'].push(conv);
            } else {
                groups.Earlier.push(conv);
            }
        });

        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => b.updateDate - a.updateDate);
        });
        return groups;
    };

    const groupedConvs = groupConversations();

    const handleSelectConversation = (markId) => {
        setPageType('chat');
        updateURL(`/chat/${markId}`);
        setMarkId(markId);
    };

    const LoadingScreen = () => (
        <UnifiedLoadingScreen text={t("loading_history")} />
    );

    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t("load_history_error")}
            subtitle={t("retry_after_network")}
            retryText={t("retry")}
            onRetry={loadConversations}
        />
    );

    useEffect(() => {
        const unsubscribe1 = onEvent("widget", "Sidebar").then((payload, markId) => {
            switch (payload.command) {
                case "Reload-Conversations":
                    loadConversations();
                    break;
                case "Update-ConversationDate":
                    const currentPositions = {};
                    if (listRef.current) {
                        const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
                        elements.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            const id = el.dataset.markid || el.dataset.group;
                            currentPositions[id] = { top: rect.top, left: rect.left };
                        });
                    }
                    setOldPositions(currentPositions);
                    const newDate = payload.value ? new Date(payload.value) : new Date();
                    setConversations(prev => {
                        const updatedConvs = prev.map(c => c.markId === markId ? {...c, updateDate: newDate} : c);
                        return updatedConvs.sort((a, b) => b.updateDate - a.updateDate);
                    });
                    break;
                case "Update-ConversationTitle":
                    if (!markId) return;

                    // 记录当前布局位置
                    const currentTitlePositions = {};
                    if (listRef.current) {
                        const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
                        elements.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            const id = el.dataset.markid || el.dataset.group;
                            currentTitlePositions[id] = { top: rect.top, left: rect.left };
                        });
                    }
                    setOldPositions(currentTitlePositions);

                    // 先缓存旧标题，然后立即更新到新标题
                    setConversations(prev => {
                        const oldConv = prev.find(c => c.markId === markId);
                        if (oldConv) {
                            setTitleCache(prevCache => ({
                                ...prevCache,
                                [markId]: oldConv.title
                            }));
                        }

                        // 直接更新为新标题
                        const updatedConvs = prev.map(c =>
                            c.markId === markId
                                ? {...c, title: payload.value || c.title}
                                : c
                        );
                        return updatedConvs.sort((a, b) => b.updateDate - a.updateDate);
                    });

                    // 设置过渡动画状态
                    setTitleTransitioning(prev => ({
                        ...prev,
                        [markId]: true
                    }));

                    // 动画结束后清除缓存和过渡状态
                    setTimeout(() => {
                        setTitleTransitioning(prev => {
                            const newState = {...prev};
                            delete newState[markId];
                            return newState;
                        });
                        setTitleCache(prevCache => {
                            const newCache = {...prevCache};
                            delete newCache[markId];
                            return newCache;
                        });
                    }, 300); // 与动画持续时间匹配
                    break;
            }
        });
        return () => {
            unsubscribe1();
        };
    }, []);

    useEffect(() => {
        if (!oldPositions || !listRef.current) return;
        const container = listRef.current;
        const elements = Array.from(container.querySelectorAll('div[data-group], li[data-markid]'));
        elements.forEach(el => {
            const id = el.dataset.markid || el.dataset.group;
            const oldRect = oldPositions[id];
            if (oldRect) {
                const newRect = el.getBoundingClientRect();
                const deltaX = oldRect.left - newRect.left;
                const deltaY = oldRect.top - newRect.top;
                el.style.transition = 'none';
                el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });
        container.offsetHeight; // force reflow
        elements.forEach(el => {
            const id = el.dataset.markid || el.dataset.group;
            if (oldPositions[id]) {
                el.style.transition = 'transform 0.5s ease-in-out';
                el.style.transform = 'translate(0, 0)';
            }
        });
        const timer = setTimeout(() => {
            elements.forEach(el => {
                el.style.transition = '';
                el.style.transform = '';
            });
            setOldPositions(null);
        }, 500);
        return () => clearTimeout(timer);
    }, [conversations, oldPositions]);

    let logoElement;
    if (settings?.logoType === 'image' && settings?.logo) {
        logoElement = <img src={settings.logo} alt="Logo" className="h-8 w-auto" />;
    } else {
        const text = (settings?.logoType === 'text' && settings?.logo) ? settings.logo : 'Logo';
        logoElement = <h1 className="text-xl font-bold text-gray-800">{text}</h1>;
    }

    return (
        <>
            <div
                className={`fixed md:relative top-0 left-0 h-full bg-white shadow-lg z-40 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out`}
                style={{ width: 'var(--sidebar-width)' }}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between p-4 border-b">
                    {logoElement}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                        aria-label={t("close_sidebar")}
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div className="p-4 border-b">
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => {
                                setMarkId(null);
                                updateURL(`/chat`);
                                setPageType('chat');
                            }}
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <Plus className="w-5 h-5 mr-2"/>
                            {t('new_conversation')}
                        </button>
                        <button
                            onClick={() => {
                                updateURL(`/doc`);
                                setPageType('doc');
                                setMarkId(null);
                                setRandomUUID(generateUUID());
                            }}
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <BookOpen className="w-5 h-5 mr-2"/>
                            {t('doc_copilot')}
                        </button>
                    </div>
                </div>

                {/* History List */}
                <div ref={listRef} className="flex-1 p-4 overflow-y-auto pretty-scrollbar relative">
                    {isLoadingError ? (
                        <LoadingFailedScreen/>
                    ) : isLoading ? (
                        <LoadingScreen/>
                    ) : (
                        <>
                            {Object.entries(groupedConvs).map(([group, convs]) => (
                                convs.length > 0 && (
                                    <div key={group} data-group={group} className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                                            {t(group.replace(/\s/g, '_').toLowerCase())}
                                        </h3>
                                        <ul className="space-y-1">
                                            {convs.map((conv) => {
                                                const isSelected = conv.markId === markId;
                                                const isTitleTransitioning = titleTransitioning[conv.markId];
                                                const oldTitle = titleCache[conv.markId];
                                                const isFirstRender = !oldTitle;

                                                return (
                                                    <li key={conv.markId} data-markid={conv.markId}>
                                                        <button
                                                            onClick={() => handleSelectConversation(conv.markId)}
                                                            className={`w-full text-left px-3.5 py-1.5 rounded-lg transition-colors flex cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-gray-200 hover:bg-gray-200 text-gray-800'
                                                                    : 'hover:bg-gray-200 text-gray-800'
                                                            }`}
                                                        >
                                                            <div className="relative overflow-hidden flex-1 text-base">
                                                                {/* 新标题 - 使用绝对定位覆盖旧标题 */}
                                                                <span
                                                                    className={`font-medium truncate block transition-all duration-300 ease-in-out ${
                                                                        isTitleTransitioning
                                                                            ? 'absolute inset-0 opacity-100 transform translate-y-0'
                                                                            : 'relative opacity-100 transform translate-y-0'
                                                                    }`}
                                                                    style={{
                                                                        animation: isTitleTransitioning && !isFirstRender
                                                                            ? 'slideUp 0.3s ease-in-out forwards'
                                                                            : 'none'
                                                                    }}
                                                                >
                                                                    {conv.title}
                                                                </span>

                                                                {/* 旧标题 - 只在过渡期间显示 */}
                                                                {isTitleTransitioning && oldTitle && (
                                                                    <span
                                                                        className="font-medium truncate block absolute inset-0 opacity-0 transform translate-y-0"
                                                                        style={{
                                                                            animation: 'slideOut 0.3s ease-in-out forwards'
                                                                        }}
                                                                    >
                                                                        {oldTitle}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Backdrop */}
            <Transition
                show={isOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            </Transition>

            {/* Floating Open Button */}
            <Transition
                show={!isOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-4 h-32 bg-gray-100 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                    style={{
                        clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)'
                    }}
                    aria-label={t("open_sidebar")}
                >
                    <ChevronRight className="w-3 h-3"/>
                </button>
            </Transition>

            {/* CSS Animation for title transition */}
            <style>{`
                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideOut {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </>
    );
};

export default Sidebar;