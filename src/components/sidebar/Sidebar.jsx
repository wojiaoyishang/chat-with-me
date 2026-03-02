import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import {ChevronRight, X, Plus, BookOpen, MoreHorizontal, Settings, LogOut, Trash} from 'lucide-react';
import {generateUUID, UnifiedErrorScreen, UnifiedLoadingScreen, updateURL} from "@/lib/tools.jsx";
import {Transition} from '@headlessui/react';
import {useTranslation} from "react-i18next";
import {useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {onEvent} from "@/context/useEventStore.jsx";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {useUserStore} from "@/context/userContext.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {toast} from "sonner";
import {useNavigate} from 'react-router-dom';
import SettingPage from "@/pages/SettingPage.jsx";

import ConversationsList from './ConversationsList.jsx'

// ====================== 原 Sidebar 组件（事件监听移至此处） ======================
const Sidebar = ({markId, setMarkId, setPageType, settings, setRandomUUID}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {user, clearUser} = useUserStore();

    const conversationsListRef = useRef();

    // 侧边栏宽度响应
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

    // 移动端滑动
    useEffect(() => {
        if (!isMobile) return;
        let startX = 0, startY = 0;
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            const deltaY = Math.abs(e.changedTouches[0].clientY - startY);
            if (deltaY > 50) return;
            if (!isOpen && deltaX > 30 && startX < 150) setIsOpen(true);
            else if (isOpen && deltaX < -30) setIsOpen(false);
        };
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isOpen, isMobile]);

    // ========== 事件监听（广播事件全部放在 Sidebar） ==========
    useEffect(() => {

        const unsubscribe = onEvent({type: "widget", target: "Sidebar"}).then(({payload, eventMarkId}) => {
            switch (payload.command) {
                case "Reload-Conversations":
                    conversationsListRef.current?.reload();
                    break;
                case "Update-ConversationDate":
                    conversationsListRef.current?.updateDate(eventMarkId, payload.value ? new Date(payload.value) : new Date());
                    break;
                case "Update-ConversationTitle":
                    conversationsListRef.current?.updateTitle(eventMarkId, payload.value);
                    break;
                default:
                    break;
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // 处理选择对话
    const handleSelectConversation = (convMarkId) => {
        setPageType('chat');
        updateURL(`/chat/${convMarkId}`);
        setMarkId(convMarkId);
    };

    // 处理删除对话
    const handleDeleteConversation = (deletedMarkId) => {
        if (markId === deletedMarkId) {
            setMarkId(null);
            setPageType('chat');
            updateURL('/chat');
        }
    };

    // 登出
    const handleLogout = async () => {
        try {
            await apiClient.get(apiEndpoint.LOGOUT_ENDPOINT);
            toast.success(t("logout_success"));
            clearUser();
            navigate('/login');
        } catch (error) {
            toast.error(t("logout_error", {message: error?.message || t("unknown_error")}));
        }
    };

    // Logo 渲染
    let logoElement;
    if (settings?.logoType === 'image' && settings?.logo) {
        logoElement = <img src={settings.logo} alt="Logo" className="h-8 w-auto"/>;
    } else {
        const text = (settings?.logoType === 'text' && settings?.logo) ? settings.logo : 'Logo';
        logoElement = <h1 className="text-xl font-bold text-gray-800">{text}</h1>;
    }

    return (
        <>
            <SettingPage open={settingsOpen} onClose={() => setSettingsOpen(false)} handleLogout={handleLogout}/>

            {/* 侧边栏主体 */}
            <div
                className="fixed md:relative top-0 left-0 h-full bg-white shadow-lg z-40 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
                style={{width: 'var(--sidebar-width)'}}
            >
                <div
                    className="h-full w-[16rem] flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out"
                    style={{opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-40px)'}}
                >
                    {/* LOGO 区域 */}
                    <div className="flex items-center justify-between p-4 border-b">
                        {logoElement}
                        <button onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    {/* 导航按钮 */}
                    <div className="p-4 border-b">
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => {
                                    setMarkId(null);
                                    updateURL('/chat');
                                    setPageType('chat');
                                }}
                                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <Plus className="w-5 h-5 mr-2"/>
                                {t('new_conversation')}
                            </button>
                            <button
                                onClick={() => {
                                    updateURL('/doc');
                                    setPageType('doc');
                                    setMarkId(null);
                                    setRandomUUID(generateUUID());
                                }}
                                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <BookOpen className="w-5 h-5 mr-2"/>
                                {t('doc_copilot')}
                            </button>
                        </div>
                    </div>

                    {/* 对话列表区域 */}
                    <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
                        <ConversationsList
                            ref={conversationsListRef}
                            selectedMarkId={markId}
                            onSelect={handleSelectConversation}
                            onDelete={handleDeleteConversation}
                        />
                    </div>

                    {/* 用户信息 */}
                    <div className="border-t p-4 bg-white">
                        <div className="flex items-center gap-3 group">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarImage src={user.avatar} alt={user.nickname}/>
                                <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                                    {user.nickname[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{user.nickname}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors opacity-60 group-hover:opacity-100">
                                        <MoreHorizontal className="w-5 h-5"/>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-fit min-w-[140px]">
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => setSettingsOpen(true)}>
                                        <Settings className="mr-2 h-4 w-4"/>
                                        {t('settings')}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={handleLogout}
                                                      className="text-red-600 focus:text-red-600 cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4 text-red-600"/>
                                        {t('logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            {/* 移动端遮罩和浮动打开按钮 */}
            <Transition show={isOpen} enter="transition-opacity duration-300" enterFrom="opacity-0"
                        enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)}/>
            </Transition>
            <Transition show={!isOpen} enter="transition-opacity duration-300" enterFrom="opacity-0"
                        enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-4 h-32 bg-gray-100 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                    style={{clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)'}}
                >
                    <ChevronRight className="w-3 h-3"/>
                </button>
            </Transition>

            {/* 动画样式 */}
            <style>{`
                @keyframes slideUp { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes slideOut { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
            `}</style>
        </>
    );
};

export default Sidebar;