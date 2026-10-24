import useIndependentChatWindow from '@/features/chat/page/hooks/useIndependentChatWindow.js';
import React, { lazy, Suspense, useEffect, useState, useRef, useCallback } from 'react';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/ChatPage.jsx';
import { UnifiedErrorScreen, UnifiedLoadingScreen } from '@/lib/tools.jsx';
import apiClient, { isAuthRedirectError } from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { useTranslation } from 'react-i18next';
import DocEditorHome from '@/pages/DocEditorHome.jsx';
import { emitEvent } from '@/context/useEventStore.jsx';
import { toast } from 'sonner';
import { useUserStore } from '@/context/userContext.jsx';
import { motion as Motion } from 'framer-motion';
import { useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import NotificationHost from '@/features/notification/NotificationHost.jsx';
import BackendManagementPage from '@/features/tasks/BackendManagementPage.jsx';

const StoriesPage = lazy(() => import('@/features/story/StoriesPage.jsx'));

const readDashboardLocation = () => {
    if (typeof window === 'undefined') return null;

    const base = String(import.meta.env.BASE_URL || '/');
    const normalizedBase = base === '/' ? '' : `/${base.replace(/^\/+|\/+$/g, '')}`;
    let pathname = window.location.pathname || '/';
    if (normalizedBase && pathname.startsWith(normalizedBase)) {
        pathname = pathname.slice(normalizedBase.length) || '/';
    }

    const parts = pathname
        .split('/')
        .filter(Boolean)
        .map((part) => {
            try {
                return decodeURIComponent(part);
            } catch {
                return part;
            }
        });

    if (parts[0] === 'chat-window') {
        return {
            pageType: 'chat',
            conversationId: parts[1] || null,
            documentId: new URLSearchParams(window.location.search).get('documentId') || null,
        };
    }
    if (parts[0] === 'chat') {
        return { pageType: 'chat', conversationId: parts[1] || null, documentId: null };
    }
    if (parts[0] === 'doc') {
        return { pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null };
    }
    return null;
};

const DashboardPage = ({ type = 'chat', standaloneChat = false }) => {
    const urlParams = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const routeOutlet = useOutlet();
    const outlet = location.pathname.endsWith('/message-map') ? routeOutlet : null;
    const managementKind = /^\/(tasks|knowledge|attachments|stories)\/?$/.exec(location.pathname)?.[1] || null;
    const workspaceReturnPath = useRef(
        readDashboardLocation()
            ? `${window.location.pathname}${window.location.search}${window.location.hash}`
            : '/chat',
    );

    const previousConversationIdRef = useRef('');
    const previousDocumentIdRef = useRef('');

    const [conversationId, setConversationId] = useState(
        urlParams.conversationId || readDashboardLocation()?.conversationId || null,
    );
    const [documentId, setDocumentId] = useState(
        urlParams.documentId ||
            readDashboardLocation()?.documentId ||
            (standaloneChat ? new URLSearchParams(location.search).get('documentId') : null),
    );

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isAuthRedirecting, setIsAuthRedirecting] = useState(false);
    const [sidebarSettings, setSidebarSettings] = useState({});
    const [settingsRefreshVersions, setSettingsRefreshVersions] = useState({});

    const [pageType, setPageType] = useState(readDashboardLocation()?.pageType || type);
    const detached = useIndependentChatWindow(conversationId, documentId);

    const { setUser } = useUserStore();

    const { t } = useTranslation();

    useEffect(() => {
        const open = (event) => {
            const payload = event.detail;
            if (!payload || !Array.isArray(payload.nodeIds) || !Array.isArray(payload.edgeIds)) return;
            const query = new URLSearchParams();
            if (payload.conversationId) query.set('conversationId', payload.conversationId);
            if (payload.databaseId) query.set('databaseId', payload.databaseId);
            navigate('/knowledge' + (query.size ? `?${query}` : ''), { state: { knowledgeImport: payload } });
        };
        window.addEventListener('cwm.open-knowledge', open);
        return () => window.removeEventListener('cwm.open-knowledge', open);
    }, [navigate]);

    // Child routes share this Dashboard and its live ChatPage. Reconcile every
    // route entry, including reopening the same pathname after a history update.
    useEffect(() => {
        const next = readDashboardLocation();
        if (!next) return;
        setPageType(next.pageType);
        setConversationId(next.conversationId);
        setDocumentId(next.documentId);
        if (!location.pathname.endsWith('/message-map')) {
            workspaceReturnPath.current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        }
    }, [location.pathname, location.key]);

    useEffect(() => {
        if (!managementKind && !outlet && readDashboardLocation()) {
            workspaceReturnPath.current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        }
    }, [conversationId, documentId, location.pathname, location.search, managementKind, outlet, pageType]);

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
        const normalizedScopes = [
            ...new Set(
                (Array.isArray(scopes) ? scopes : [scopes]).map((scope) => String(scope || '').trim()).filter(Boolean),
            ),
        ];
        if (normalizedScopes.length === 0) return;

        setSettingsRefreshVersions((current) => {
            const next = { ...current };
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
                user.username = 'User';
                console.warn('UserInfo is missing username.');
            }

            // 设置默认内容
            if (!user.nickname) user.nickname = user.username;

            // 全局共享
            setUser(user);
        };

        const loadAll = async () => {
            try {
                await loadDashboard();
                await loadUserInfo();
            } catch (error) {
                if (isAuthRedirectError(error)) {
                    setIsAuthRedirecting(true);
                } else {
                    toast.error(t('load_page_error', { message: error?.message || t('unknown_error') }));
                    setIsLoadingError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadAll();
    }, []);

    const LoadingScreen = () => <UnifiedLoadingScreen text={t('loading_dashboard')} />;

    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t('load_dashboard_error')}
            subtitle={t('retry_after_network')}
            retryText={t('retry')}
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
                previousDocumentId: previousDocumentIdRef.current,
            },
        });

        previousConversationIdRef.current = conversationId;
        previousDocumentIdRef.current = documentId;
    }, [pageType, conversationId, documentId]);

    // 处理聊天 ConversationId 变化，组件中不能直接call这个函数，不然不知道是设为空还是真的没有提供
    const handleConversationIdSelect = useCallback(
        ({ newConversationId, newDocumentId }) => {
            const urlNewConversationId = newConversationId ? `/${newConversationId}` : '';
            const urlNewDocumentId = newDocumentId ? `/${newDocumentId}` : '';

            setConversationId(newConversationId);
            setDocumentId(newDocumentId);

            if (managementKind) {
                setPageType('chat');
                setDocumentId(null);
                navigate(`/chat${urlNewConversationId}`);
            } else if (standaloneChat) {
                const query = newDocumentId ? `?documentId=${encodeURIComponent(newDocumentId)}` : '';
                navigate(`/chat-window${urlNewConversationId}${query}`);
            } else if (pageType === 'chat') {
                navigate(`/chat${urlNewConversationId}`);
            } else if (pageType === 'doc') {
                navigate(`/doc${urlNewDocumentId}${urlNewConversationId}`);
            }
        },
        [managementKind, navigate, pageType, standaloneChat],
    );

    return (
        <>
            <div className="flex full-screen-height bg-white relative" inert={outlet ? true : undefined}>
                {!isLoading && !isLoadingError && !isAuthRedirecting && (
                    <NotificationHost
                        currentConversationId={conversationId}
                        isTaskPageVisible={!outlet && managementKind === 'tasks'}
                        isConversationVisible={
                            !outlet && !managementKind && (pageType === 'chat' || Boolean(documentId))
                        }
                        onOpenConversation={(conversationId, notification) => {
                            setPageType('chat');
                            setConversationId(conversationId);
                            setDocumentId(null);
                            const messageId = notification?.source?.messageId;
                            const target = `/chat/${conversationId}${messageId ? `?focusMessage=${encodeURIComponent(messageId)}` : ''}`;
                            navigate(target);
                        }}
                    />
                )}
                {isLoadingError ? (
                    <LoadingFailedScreen />
                ) : isLoading || isAuthRedirecting ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {(pageType === 'chat' || managementKind) && !standaloneChat && (
                            <Sidebar
                                forceClosed={detached && !managementKind}
                                conversationId={conversationId}
                                setConversationId={setConversationId}
                                settings={sidebarSettings}
                                pageType={managementKind || pageType}
                                setPageType={setPageType}
                                onSettingsRefresh={handleSettingsRefresh}
                                onOpenPage={(target) => {
                                    if (['tasks', 'knowledge', 'attachments', 'stories'].includes(target)) {
                                        navigate(`/${target}`);
                                    } else if (managementKind && target === pageType) {
                                        navigate(workspaceReturnPath.current);
                                    } else {
                                        navigate(target === 'doc' ? '/doc' : '/chat');
                                    }
                                }}
                                onConversationIdSelect={(newConversationId) => {
                                    handleConversationIdSelect({
                                        newConversationId: newConversationId,
                                        newDocumentId: documentId,
                                    });
                                }}
                            />
                        )}

                        <main className="min-w-0 flex-1 overflow-hidden relative transition-all duration-300 ease-in-out">
                            <React.Fragment>
                                {pageType === 'chat' && (
                                    <Motion.div
                                        key="chat"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="absolute inset-0"
                                        style={{ visibility: managementKind ? 'hidden' : 'visible' }}
                                        inert={managementKind ? true : undefined}
                                        aria-hidden={managementKind ? true : undefined}
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
                                            standaloneWindow={standaloneChat}
                                            documentId={standaloneChat ? documentId : undefined}
                                            pageType={standaloneChat && documentId ? 'doc' : 'chat'}
                                            settingsRefreshVersions={settingsRefreshVersions}
                                        />
                                    </Motion.div>
                                )}
                                {pageType === 'doc' && (
                                    <Motion.div
                                        key="doc"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="absolute inset-0"
                                        style={{ visibility: managementKind ? 'hidden' : 'visible' }}
                                        inert={managementKind ? true : undefined}
                                        aria-hidden={managementKind ? true : undefined}
                                    >
                                        <div className="flex h-full min-h-0 flex-col">
                                            {!documentId && (
                                                <header className="flex shrink-0 items-center gap-3 border-b bg-background px-3 py-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setPageType('chat');
                                                            setConversationId(null);
                                                            setDocumentId(null);
                                                            navigate('/chat');
                                                        }}
                                                    >
                                                        <ArrowLeft className="size-4" />
                                                        {t('documents_chat')}
                                                    </Button>
                                                    <span className="text-sm font-medium">
                                                        {t('documents_document_workspace')}
                                                    </span>
                                                </header>
                                            )}
                                            <div className="min-h-0 flex-1 overflow-auto">
                                                <DocEditorHome
                                                    onChatMode={() => {
                                                        setPageType('chat');
                                                        setDocumentId(null);
                                                        navigate(conversationId ? `/chat/${conversationId}` : '/chat');
                                                    }}
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
                                                            newConversationId: null,
                                                            newDocumentId: newDocumentId,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Motion.div>
                                )}
                            </React.Fragment>
                            {managementKind && (
                                <div
                                    className="absolute inset-0"
                                    role="region"
                                    aria-label={managementKind === 'tasks' ? '任务管理' : managementKind === 'attachments' ? '附件' : managementKind === 'stories' ? '故事' : '知识库'}
                                >
                                    {managementKind === 'stories' ? (
                                        <Suspense fallback={<UnifiedLoadingScreen text="正在加载故事…" />}>
                                            <StoriesPage
                                                conversationId={conversationId}
                                                onReturn={() => navigate(workspaceReturnPath.current)}
                                                returnLabel={pageType === 'doc' ? '返回文档' : '返回对话'}
                                                onNavigate={navigate}
                                            />
                                        </Suspense>
                                    ) : <BackendManagementPage
                                        kind={managementKind}
                                        sidebarMode
                                        onReturn={() => navigate(workspaceReturnPath.current)}
                                        returnLabel={pageType === 'doc' ? '返回文档' : '返回对话'}
                                    />}
                                </div>
                            )}
                        </main>
                    </>
                )}
            </div>
            {outlet && (
                <div
                    className="fixed inset-0 z-[2147483301] bg-background"
                    role="region"
                    aria-label={t('documents_message_history_map')}
                >
                    {outlet}
                </div>
            )}
        </>
    );
};

export default DashboardPage;
