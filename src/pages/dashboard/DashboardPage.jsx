import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useParams,} from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/chat/ChatPage.jsx';
import {getMarkId, UnifiedErrorScreen, UnifiedLoadingScreen, useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import {useTranslation} from "react-i18next";

const DashboardPage = () => {
    const [markId, setMarkId] = useState(getMarkId());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);

    const [sidebarSettings, setSidebarSettings] = useState({});

    const {t} = useTranslation();

    const isMobile = useIsMobile();

    useEffect(() => {
        const loadDashboard = async () => {
            setIsLoading(true);
            setIsLoadingError(false);

            try {
                const settings = await apiClient.get(apiEndpoint.DASHBOARD_ENDPOINT);
                if (settings.sidebar) {
                    setSidebarSettings(settings.sidebar);
                }
            } catch (error) {
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_dashboard")}
            // 没有 z-index，故省略 zIndex 属性
        />
    );

    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t("load_dashboard_error")}
            subtitle={t("retry_after_network")}
            retryText={t("retry")}
            // 重试逻辑是刷新页面
            onRetry={() => window.location.reload()}
            // 没有 z-index，故省略 zIndex 属性
        />
    );

    return (
        <div className="flex full-screen-height bg-white relative">
            {isLoadingError ? (
                <LoadingFailedScreen />
            ) : isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <Sidebar markId={markId} setMarkId={setMarkId} settings={sidebarSettings}/>
                    <main className="flex-1 overflow-hidden relative transition-all duration-300 ease-in-out">
                        <ChatPage markId={markId} setMarkId={setMarkId}/>
                    </main>
                </>
            )}
        </div>
    );
};

export default DashboardPage;