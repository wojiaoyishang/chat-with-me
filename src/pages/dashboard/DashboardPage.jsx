import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useParams,} from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/chat/ChatPage.jsx';
import {getMarkId, UnifiedErrorScreen, UnifiedLoadingScreen, useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import {useTranslation} from "react-i18next";
import EditorHome from "@/pages/editor/EditorHome.jsx";
import {emitEvent, onEvent} from "@/store/useEventStore.jsx";

const DashboardPage = ({type = "chat"}) => {
    const [markId, setMarkId] = useState(getMarkId());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [sidebarSettings, setSidebarSettings] = useState({});
    const [randomUUID, setRandomUUID] = useState();

    const [pageType, setPageType] = useState(type);

    const {t} = useTranslation();

    // 页面加载动画层
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
                             setPageType={setPageType} setRandomUUID={setRandomUUID} />

                    <main className="flex-1 overflow-hidden relative transition-all duration-300 ease-in-out">
                        {pageType === "chat" && <ChatPage markId={markId} setMarkId={setMarkId}/>}
                        {pageType === "doc" && <EditorHome key={randomUUID}/>}
                    </main>

                </>
            )}
        </div>
    );
};

export default DashboardPage;