import React, {useEffect, useState, useRef, useCallback} from 'react';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/ChatPage.jsx';
import {UnifiedErrorScreen, UnifiedLoadingScreen, updateURL} from "@/lib/tools.jsx";
import apiClient, {isAuthRedirectError} from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {useTranslation} from "react-i18next";
import DocEditorHome from "@/pages/DocEditorHome.jsx";
import {emitEvent} from "@/context/useEventStore.jsx";
import {toast} from "sonner";
import {useUserStore} from "@/context/userContext.jsx";
import {motion, AnimatePresence} from 'framer-motion';
import {useParams} from "react-router-dom";
import NotificationHost from "@/features/notification/NotificationHost.jsx";

const readDashboardLocation = () => {
    if (typeof window === 'undefined') return null;

    const base = String(import.meta.env.BASE_URL || '/');
    const normalizedBase = base === '/' ? '' : `/${base.replace(/^\/+|\/+$/g, '')}`;
    let pathname = window.location.pathname || '/';
    if (normalizedBase && pathname.startsWith(normalizedBase)) {
        pathname = pathname.slice(normalizedBase.length) || '/';
    }

    const parts = pathname.split('/').filter(Boolean).map((part) => {
        try { return decodeURIComponent(part); } catch { return part; }
    });

    if (parts[0] === 'chat') {
        return {pageType: 'chat', conversationId: parts[1] || null, documentId: null};
    }
    if (parts[0] === 'doc') {
        return {pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null};
    }
    return null;
};

const DashboardPage = ({type = "chat"}) => {

    const urlParams = useParams();

    const previousConversationIdRef = useRef("");
    const previousDocumentIdRef = useRef("");

    const [conversationId, setConversationId] = useState(urlParams.conversationId);
    const [documentId, setDocumentId] = useState(urlParams.documentId);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isAuthRedirecting, setIsAuthRedirecting] = useState(false);
    const [sidebarSettings, setSidebarSettings] = useState({});
    const [settingsRefreshVersions, setSettingsRefreshVersions] = useState({});

    const [pageType, setPageType] = useState(type);

    const {setUser} = useUserStore();

    const {t} = useTranslation();

    useEffect(() => {
        const syncFromBrowserHistory = () => {
            const next = readDashboardLocation();
            if (!next) return;
            setPageType(next.pageType);
            setConversationId(next.conversationId);
            setDocumentId(next.documentId);
        };

        window.addEventListener('popstate', syncFromBrowserHistory);
        return () => window.removeEventListener('popstate', syncFromBrowserHistory);
    }, []);

    const handleSettingsRefresh = useCallback((scopes = []) => {
        const normalizedScopes = [...new Set((Array.isArray(scopes) ? scopes : [scopes])
            .map((scope) => String(scope || '').trim())
            .filter(Boolean))];
        if (normalizedScopes.length === 0) return;

        setSettingsRefreshVersions((current) => {
            const next = {...current};
            normalizedScopes.forEach((scope) => {
                next[scope] = Number(next[scope] || 0) + 1;
            });
            return next;
        });
    }, []);

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
                if (isAuthRedirectError(error)) {
                    setIsAuthRedirecting(true);
                } else {
                    toast.error(t("load_page_error", {message: error?.message || t("unknown_error")}));
                    setIsLoadingError(true);
                }
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
            event: 'dashboard.selection.change',
            payload: {
                pageType: pageType,
                conversationId: conversationId,
                previousConversationId: previousConversationIdRef.current,
                documentId: documentId,
                previousDocumentId: previousDocumentIdRef.current
            }
        })

        previousConversationIdRef.current = conversationId;
        previousDocumentIdRef.current = documentId;
    }, [pageType, conversationId, documentId]);

    // 处理聊天 ConversationId 变化，组件中不能直接call这个函数，不然不知道是设为空还是真的没有提供
    const handleConversationIdSelect = useCallback(({newConversationId, newDocumentId}) => {

        const urlNewConversationId = newConversationId ? `/${newConversationId}` : "";
        const urlNewDocumentId = newDocumentId ? `/${newDocumentId}` : '';

        setConversationId(newConversationId);
        setDocumentId(newDocumentId);

        if (pageType === "chat") {
            updateURL(`/chat${urlNewConversationId}`);
        } else if (pageType === "doc") {
            updateURL(`/doc${urlNewDocumentId}${urlNewConversationId}`);
        }
    }, [pageType])

    return (
        <div className="flex full-screen-height bg-white relative">
            {!isLoading && !isLoadingError && !isAuthRedirecting && (
                <NotificationHost
                    currentConversationId={conversationId}
                    isConversationVisible={pageType === "chat"}
                    onOpenConversation={(conversationId) => {
                        setPageType("chat");
                        setConversationId(conversationId);
                        setDocumentId(null);
                        updateURL(`/chat/${conversationId}`);
                    }}
                />
            )}
            {isLoadingError ? (
                <LoadingFailedScreen/>
            ) : isLoading || isAuthRedirecting ? (
                <LoadingScreen/>
            ) : (
                <>

                    <Sidebar conversationId={conversationId} setConversationId={setConversationId} settings={sidebarSettings}
                             pageType={pageType} setPageType={setPageType}
                             onSettingsRefresh={handleSettingsRefresh}
                             onConversationIdSelect={(newConversationId) => {
                                 handleConversationIdSelect({
                                     newConversationId: newConversationId,
                                     newDocumentId: documentId,
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
                                    <ChatPage
                                              conversationId={conversationId}
                                              onNewConversationId={(newConversationId) => {
                                                  handleConversationIdSelect({
                                                      newConversationId: newConversationId,
                                                      newDocumentId: documentId,
                                                  });
                                              }}
                                              showWindowButton={false}
                                              settingsRefreshVersions={settingsRefreshVersions}
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
                                    <DocEditorHome
                                                   documentId={documentId}
                                                   conversationId={conversationId}
                                                   onNewConversationId={(newConversationId) => {
                                                       handleConversationIdSelect({
                                                           newConversationId: newConversationId,
                                                           newDocumentId: documentId,
                                                       });
                                                   }}
                                                   settingsRefreshVersions={settingsRefreshVersions}
                                                   onNewDocumentId={(newDocumentId) => {
                                                       handleConversationIdSelect({
                                                           newConversationId: conversationId,
                                                           newDocumentId: newDocumentId,
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