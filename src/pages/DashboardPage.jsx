import React, {useEffect, useState, useRef, useCallback} from 'react';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/ChatPage.jsx';
import {generateUUID, UnifiedErrorScreen, UnifiedLoadingScreen, updateURL, useIsMobile} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {useTranslation} from "react-i18next";
import DocEditorHome from "@/pages/DocEditorHome.jsx";
import {emitEvent, onEvent} from "@/context/useEventStore.jsx";
import {toast} from "sonner";
import {useUserStore} from "@/context/userContext.jsx";
import {motion, AnimatePresence} from 'framer-motion';
import {useParams} from "react-router-dom";

const DashboardPage = ({type = "chat"}) => {

    const urlParams = useParams();

    const [chatMarkId, setChatMarkId] = useState(urlParams.chatMarkId);
    const [documentMarkId, setDocumentMarkId] = useState(urlParams.documentMarkId);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [sidebarSettings, setSidebarSettings] = useState({});
    const [randomUUID, setRandomUUID] = useState();

    const [pageType, setPageType] = useState(type);

    const {user, setUser, clearUser} = useUserStore();

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
            markId: chatMarkId
        })
    }, [pageType, chatMarkId]);

    // 处理聊天 MarkId 变化，组件中不能直接call这个函数，不然不知道是设为空还是真的没有提供
    const handleMarkIdSelect = useCallback(({newChatMarkId, newDocumentMarkId}) => {

        const urlNewChatMarkId = newChatMarkId ? `/${newChatMarkId}` : "";
        const urlNewDocumentMarkId = newDocumentMarkId ? `/${newDocumentMarkId}` : '';

        setChatMarkId(newChatMarkId);
        setDocumentMarkId(newDocumentMarkId);

        if (pageType === "chat") {
            updateURL(`/chat${urlNewChatMarkId}`);
        } else if (pageType === "doc") {
            updateURL(`/doc${urlNewDocumentMarkId}${urlNewChatMarkId}`);
        }
    }, [pageType])

    return (
        <div className="flex full-screen-height bg-white relative">
            {isLoadingError ? (
                <LoadingFailedScreen/>
            ) : isLoading ? (
                <LoadingScreen/>
            ) : (
                <>

                    <Sidebar chatMarkId={chatMarkId} setChatMarkId={setChatMarkId} settings={sidebarSettings}
                             pageType={pageType} setPageType={setPageType} setRandomUUID={setRandomUUID}
                             onChatMarkIdSelect={(newChatMarkId) => {
                                 handleMarkIdSelect({
                                     newChatMarkId: newChatMarkId,
                                     newDocumentMarkId: documentMarkId,
                                 });
                             }}/>

                    <main className="flex-1 overflow-hidden relative transition-all duration-300 ease-in-out">
                        <AnimatePresence mode="wait">
                            {pageType === "chat" && (
                                <motion.div
                                    key="chat"
                                    initial={{opacity: 0, x: 50}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -50}}
                                    transition={{duration: 0.3, ease: "easeInOut"}}
                                    className="absolute inset-0"
                                >
                                    <ChatPage key={randomUUID}
                                              chatMarkId={chatMarkId}
                                              onNewChatMarkId={(newChatMarkId) => {
                                                  handleMarkIdSelect({
                                                      newChatMarkId: newChatMarkId,
                                                      newDocumentMarkId: documentMarkId,
                                                  });
                                              }}
                                              showWindowButton={false}
                                    />
                                </motion.div>
                            )}
                            {pageType === "doc" && (
                                <motion.div
                                    key="doc"
                                    initial={{opacity: 0, x: 50}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -50}}
                                    transition={{duration: 0.3, ease: "easeInOut"}}
                                    className="absolute inset-0"
                                >
                                    <DocEditorHome key={randomUUID}
                                                   documentMarkId={documentMarkId}
                                                   chatMarkId={chatMarkId}
                                                   onNewChatMarkId={(newChatMarkId) => {
                                                       handleMarkIdSelect({
                                                           newChatMarkId: newChatMarkId,
                                                           newDocumentMarkId: documentMarkId,
                                                       });
                                                   }}
                                                   onNewDocumentMarkId={(newDocumentMarkId) => {
                                                       handleMarkIdSelect({
                                                           newChatMarkId: chatMarkId,
                                                           newDocumentMarkId: newDocumentMarkId,
                                                       });
                                                   }}
                                    />
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