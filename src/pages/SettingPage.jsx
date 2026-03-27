import React, {useState, useEffect} from 'react';
import {
    X,
    Maximize2,
    Minimize2,
    ChevronLeft,
    User,
    Layout
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {toast} from "sonner";
import {useIsMobile} from "@/lib/tools.jsx";
import {useUserStore} from "@/context/userContext.jsx";
import {useTranslation} from "react-i18next";
import {UserProfileCard} from "@/components/setting/UserProfileCard.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {
    UnifiedLoadingScreen,
    UnifiedErrorScreen
} from "@/lib/tools.jsx";

// 侧边栏动态区域骨架屏
const SidebarSkeleton = () => (
    <div className="flex flex-col gap-1">
        {[1, 2, 3].map((i) => (
            <div
                key={i}
                className="w-full h-11 px-3 py-2.5 rounded-lg bg-gray-100 animate-pulse"
            />
        ))}
    </div>
);

const SettingPage = ({
                         open,
                         onClose,
                         handleLogout
                     }) => {
    const isMobile = useIsMobile();
    const {user} = useUserStore();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const {t} = useTranslation();

    // ==================== Tabs 状态 ====================
    const [activeTab, setActiveTab] = useState('account');
    const [dynamicTabs, setDynamicTabs] = useState([]);
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [tabsError, setTabsError] = useState(false);

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    // ==================== Tab 合法性校验 ====================
    const isValidTab = (tabId) => {
        if (tabId === 'account' || tabId === 'interface') return true;
        return dynamicTabs.some(tab => tab.id === tabId);
    };

    // ==================== 加载动态 Tabs ====================
    const loadDynamicTabs = async () => {
        try {
            setLoadingTabs(true);
            setTabsError(false);
            const response = await apiClient.get(apiEndpoint.SETTING_TABS_ENDPOINT);
            const tabs = Array.isArray(response) ? response : [];
            setDynamicTabs(tabs);
        } catch (error) {
            console.error("Failed to load setting tabs:", error);
            setDynamicTabs([]);
            setTabsError(true);
            toast.error(t("load_tabs_error") || "Failed to load settings tabs");
        } finally {
            setLoadingTabs(false);
        }
    };

    // 每次打开设置窗口时重新加载
    useEffect(() => {
        if (open) {
            loadDynamicTabs();
        }
    }, [open]);

    // ==================== 强回退策略 ====================
    // 1. 加载失败时强制回退到内置 Tab
    useEffect(() => {
        if (tabsError && activeTab !== 'account' && activeTab !== 'interface') {
            setActiveTab('account');
        }
    }, [tabsError]);

    // 2. 通用合法性守护（防止残留无效 tab）
    useEffect(() => {
        if (!isValidTab(activeTab)) {
            setActiveTab('account');
        }
    }, [activeTab, dynamicTabs, tabsError]);

    // ==================== 左侧侧边栏 ====================
    const renderSidebar = () => (
        <div className={`${isMobile ? 'w-16' : 'w-auto'} border-r bg-gray-50/50 p-2 flex flex-col gap-1`}>
            {/* 固定 Tab - 始终显示 */}
            <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium
                    ${activeTab === 'account' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
            >
                <User className="w-5 h-5 shrink-0"/>
                {!isMobile && <span className="text-sm whitespace-nowrap">{t("Settings.Account")}</span>}
            </button>

            <button
                onClick={() => setActiveTab('interface')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium
                    ${activeTab === 'interface' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
            >
                <Layout className="w-5 h-5 shrink-0"/>
                {!isMobile && <span className="text-sm whitespace-nowrap">{t("Settings.Interface")}</span>}
            </button>

            {/* 分隔线 - 仅在加载成功且有动态 Tab 时显示 */}
            {(!tabsError && !loadingTabs && dynamicTabs.length > 0) && !isMobile && (
                <div className="h-px bg-gray-200 my-2 mx-2"/>
            )}

            {/* 动态 Tabs 区域 - 错误提示仅在此处显示 */}
            <AnimatePresence mode="wait">
                {loadingTabs ? (
                    <SidebarSkeleton/>
                ) : tabsError ? (
                    <div className="px-3 py-3 mt-2">
                        <UnifiedErrorScreen
                            title={t("load_error") || "加载失败"}
                            subtitle={t("retry_after_network") || "请检查网络后重试"}
                            retryText={t("retry") || "重试"}
                            onRetry={loadDynamicTabs}
                            compact
                        />
                    </div>
                ) : dynamicTabs.length > 0 ? (
                    dynamicTabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            initial={{opacity: 0, x: -10}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.2}}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium
                                ${activeTab === tab.id ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            <img
                                src={tab.preview}
                                alt={tab.name}
                                className="w-5 h-5 shrink-0 transition-colors"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            {!isMobile && <span className="text-sm whitespace-nowrap">{tab.name}</span>}
                        </motion.button>
                    ))
                ) : null}
            </AnimatePresence>
        </div>
    );

    // ==================== 右侧内容区 ====================
    const renderContent = () => {
        if (activeTab === 'account') {
            return (
                <motion.div
                    initial={{opacity: 0, x: 10}}
                    animate={{opacity: 1, x: 0}}
                    className="max-w-3xl mx-auto"
                >
                    <UserProfileCard handleLogout={handleLogout}/>
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
                            {t("Settings.Account")}
                        </p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">
                            No other settings to display
                        </div>
                    </div>
                </motion.div>
            );
        }

        if (activeTab === 'interface') {
            return (
                <motion.div
                    initial={{opacity: 0, x: 10}}
                    animate={{opacity: 1, x: 0}}
                    className="max-w-3xl mx-auto"
                >
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
                            {t("Settings.Interface")}
                        </p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">
                            No interface settings to display
                        </div>
                    </div>
                </motion.div>
            );
        }

        // 动态 Tab 内容占位
        const currentTab = dynamicTabs.find(tab => tab.id === activeTab);
        return (
            <motion.div
                initial={{opacity: 0, x: 10}}
                animate={{opacity: 1, x: 0}}
                className="max-w-3xl mx-auto"
            >
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
                    {currentTab?.name || 'Settings'}
                </p>
                <div className="p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-gray-400 flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-lg">🚧</p>
                    <p className="mt-3">此功能正在开发中</p>
                    <p className="text-sm text-gray-500 mt-1">Coming soon: {currentTab?.name}</p>
                </div>
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
                    />
                    {/* 设置窗口 */}
                    <motion.div
                        layout
                        initial={isMobile ? {y: "100%"} : {opacity: 0, scale: 0.95, y: 20}}
                        animate={
                            isFullscreen || isMobile
                                ? {width: "100%", height: "100%", borderRadius: 0, scale: 1, y: 0, opacity: 1}
                                : {width: "900px", height: "600px", borderRadius: "12px", scale: 1, y: 0, opacity: 1}
                        }
                        exit={isMobile ? {y: "100%"} : {opacity: 0, scale: 0.95, y: 20}}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className="relative bg-white shadow-2xl flex flex-col overflow-hidden cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 顶部导航栏 */}
                        <div className="flex items-center justify-between px-4 h-14 border-b shrink-0 bg-white">
                            <div className="flex items-center gap-4">
                                {(isFullscreen || isMobile) && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600"/>
                                    </button>
                                )}
                                <h2 className="font-bold text-lg text-gray-800">{t("Settings.Settings")}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                {!isMobile && (
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors cursor-pointer"
                                    >
                                        {isFullscreen ? <Minimize2 className="w-4 h-4"/> : <Maximize2 className="w-4 h-4"/>}
                                    </button>
                                )}
                                {!isFullscreen && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 内容主体 */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* 左侧侧边栏 */}
                            {renderSidebar()}
                            {/* 右侧内容区 - 始终可用 */}
                            <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10">
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingPage;