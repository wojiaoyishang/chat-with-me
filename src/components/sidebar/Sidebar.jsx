import React, {useState, useEffect, useRef} from 'react';
import {format, isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import {enUS, zhCN} from 'date-fns/locale';
import {FaChevronRight, FaTimes, FaHome, FaCog, FaSearch, FaPlus} from 'react-icons/fa';
import {updateURL} from "@/lib/tools.js";
import {Transition} from '@headlessui/react';
import {useTranslation} from "react-i18next";
import {useIsMobile} from "@/lib/tools.js";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import {onEvent} from "@/store/useEventStore.jsx";
const Sidebar = ({
                     markId, setMarkId
                 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const {t, i18n} = useTranslation();
    // Loading states
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    // Determine date-fns locale based on current language
    const dateLocale = i18n.language === 'zh-CN' ? zhCN : enUS;
    useEffect(() => {
        const mql = window.matchMedia('(min-width: 768px)');
        setIsOpen(mql.matches);
        const handler = (e) => setIsOpen(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);
    // Add swipe gestures only on mobile devices
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
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = Math.abs(endY - startY);
            if (deltaY > 50) return;
            if (!isOpen && deltaX > 30 && startX < 150) {
                // Swipe right from left edge to open (increased sensitivity)
                setIsOpen(true);
            } else if (isOpen && deltaX < -30) {
                // Swipe left to close (anywhere on screen when open, increased sensitivity)
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
    // Group conversations by date categories
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
        // Sort within each group (though overall sort should preserve order)
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => b.updateDate - a.updateDate);
        });
        return groups;
    };
    const groupedConvs = groupConversations();
    const handleSelectConversation = (markId) => {
        updateURL(`/chat/${markId}`);
        setMarkId(markId);
    };
    const LoadingScreen = () => (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                <ThreeDotLoading/>
                <span className="mt-2 text-sm text-gray-500">{t("loading_history")}</span>
            </div>
        </div>
    );
    const LoadingFailedScreen = () => (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <p className="text-gray-700 text-base font-medium">{t("load_history_error")}</p>
                <p className="text-gray-500 text-sm mt-1">{t("retry_after_network")}</p>
                <button
                    onClick={loadConversations}
                    className="mt-4 text-sm text-blue-600 rounded-md transition-colors cursor-pointer"
                >
                    {t("retry")}
                </button>
            </div>
        </div>
    );
    useEffect(() => {
        const unsubscribe1 = onEvent("widget", "Sidebar").then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Reload-Conversations":
                    loadConversations();
                    break;
                case "Update-ConversationDate":
                    // Capture old positions before updating
                    const currentPositions = {};
                    if (listRef.current) {
                        const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
                        elements.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            const id = el.dataset.markid || el.dataset.group;
                            currentPositions[id] = {
                                top: rect.top,
                                left: rect.left
                            };
                        });
                    }
                    setOldPositions(currentPositions);
                    const newDate = payload.value ? new Date(payload.value) : new Date();
                    setConversations(prev => {
                        const updatedConvs = prev.map(c => c.markId === markId ? {...c, updateDate: newDate} : c);
                        return updatedConvs.sort((a, b) => b.updateDate - a.updateDate);
                    });
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
        // Force reflow to apply the invert
        container.offsetHeight;
        elements.forEach(el => {
            const id = el.dataset.markid || el.dataset.group;
            if (oldPositions[id]) {
                el.style.transition = 'transform 0.5s ease-in-out';
                el.style.transform = 'translate(0, 0)';
            }
        });
        // Cleanup after animation
        const timer = setTimeout(() => {
            elements.forEach(el => {
                el.style.transition = '';
                el.style.transform = '';
            });
            setOldPositions(null);
        }, 500);
        return () => clearTimeout(timer);
    }, [conversations, oldPositions]);
    return (
        <>
            <div
                className={`fixed md:relative top-0 left-0 h-full bg-white shadow-lg z-40 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full overflow-hidden'
                }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">{t('logo')}</h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                        aria-label={t("close_sidebar")}
                    >
                        <FaTimes className="w-5 h-5"/>
                    </button>
                </div>
                {/* Functional Buttons (placeholders) - Separate container */}
                <div className="p-4 border-b">
                    <div className="flex flex-col space-y-2">
                        {/* 功能按钮 */}
                        <button
                            onClick={() => {
                                setMarkId(null);
                                updateURL(`/chat`);
                            }}
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <FaPlus className="w-5 h-5 mr-2"/>
                            {t('new_conversation')}
                        </button>
                    </div>
                </div>
                {/* Conversation List - Separate container with scroll */}
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
                                                return (
                                                    <li key={conv.markId} data-markid={conv.markId}>
                                                        <button
                                                            onClick={() => handleSelectConversation(conv.markId)}
                                                            className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex flex-col cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-gray-200 hover:bg-gray-200 text-gray-800'
                                                                    : 'hover:bg-gray-200 text-gray-800'
                                                            }`}
                                                        >
                                                            <span className="font-medium truncate">
                                                                {conv.title}
                                                            </span>
                                                            <span
                                                                className={`text-xs transition-colors ${
                                                                    isSelected ? 'text-gray-600' : 'text-gray-500'
                                                                }`}
                                                            >
                                                                {format(new Date(conv.updateDate), 'PPP', {locale: dateLocale})}
                                                            </span>
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
                    <FaChevronRight className="w-3 h-3"/>
                </button>
            </Transition>
        </>
    );
};
export default Sidebar;