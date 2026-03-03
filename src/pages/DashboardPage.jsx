import React, {useEffect, useState, useRef, useCallback} from 'react';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/ChatPage.jsx';
import {generateUUID, getMarkId, UnifiedErrorScreen, UnifiedLoadingScreen, useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {useTranslation} from "react-i18next";
import DocEditorHome from "@/pages/DocEditorHome.jsx";
import {emitEvent, onEvent} from "@/context/useEventStore.jsx";
import {toast} from "sonner";
import {useUserStore} from "@/context/userContext.jsx";
import {motion, AnimatePresence} from 'framer-motion';

const DashboardPage = ({type = "chat"}) => {
    const [markId, setMarkId] = useState(getMarkId());
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [sidebarSettings, setSidebarSettings] = useState({});
    const [randomUUID, setRandomUUID] = useState();

    const [pageType, setPageType] = useState(type);

    const { user, setUser, clearUser } = useUserStore();

    const {t} = useTranslation();

    // 页面加载动画层
    useEffect(() => {
        const loadDashboard = async () => {
            setIsLoading(true);
            setIsLoadingError(false);
            const settings = await apiClient.get(apiEndpoint.DASHBOARD_ENDPOINT);
            if (settings.sidebar) {
                setSidebarSettings(settings.sidebar);
            }
        };

        const loadUserInfo = async () => {
            const user = await apiClient.get(apiEndpoint.USER_INFO_ENDPOINT);

            if (!user.username) {
                user.username = "User";
                console.warn("UserInfo is missing username.")
            }

            // 设置默认内容
            if (!user.nickname) user.nickname = user.username;

            // 全局共享
            setUser(user);
        }

        const loadAll = async () => {
            try {
                await loadDashboard();
                await loadUserInfo();
            } catch (error) {
                toast.error(t("load_page_error", {message: error?.message || t("unknown_error")}))
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
            }
        }

        loadAll();

    }, []);

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_dashboard")}
        />
    );

    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t("load_dashboard_error")}
            subtitle={t("retry_after_network")}
            retryText={t("retry")}
            onRetry={() => window.location.reload()}
        />
    );

    useEffect(() => {
        emitEvent({
            type: "page",
            target: "Dashboard",
            payload: {
                command: "Dashboard-Change",
                pageType: pageType,
            },
            markId: markId
        })
    }, [pageType, markId]);

    return (
        <div className="flex full-screen-height bg-white relative">
            {isLoadingError ? (
                <LoadingFailedScreen/>
            ) : isLoading ? (
                <LoadingScreen/>
            ) : (
                <>

                    <Sidebar markId={markId} setMarkId={setMarkId} settings={sidebarSettings}
                             pageType={pageType} setPageType={setPageType} setRandomUUID={setRandomUUID}/>

                    <main className="flex-1 overflow-hidden relative transition-all duration-300 ease-in-out">
                        <AnimatePresence mode="wait">
                            {pageType === "chat" && (
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <ChatPage key={randomUUID} markId={markId} setMarkId={setMarkId}/>
                                </motion.div>
                            )}
                            {pageType === "doc" && (
                                <motion.div
                                    key="doc"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <DocEditorHome key={randomUUID} markId={markId} setMarkId={setMarkId}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>

                </>
            )}
        </div>
    );
};

export default DashboardPage;