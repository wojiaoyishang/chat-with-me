import { AnimatePresence, motion } from 'framer-motion';
import { NotificationCenterTrigger } from '@/features/notification/NotificationCenter.jsx';
import { TaskCenterTrigger } from '@/features/tasks/TaskCenter.jsx';
import useIndependentChatWindow from '@/features/chat/page/hooks/useIndependentChatWindow.js';
import { openChatWindow } from '@/features/chat/page/openChatWindow.js';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import ChatPage from '@/pages/ChatPage.jsx';
import CollaboraOnlineEditor from '@/components/editor/CollaboraOnlineEditor.jsx';
import MarkdownDocumentEditor from '@/features/documents/MarkdownDocumentEditor.jsx';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot } from 'lucide-react';
import DocumentConversationControls from '@/features/documents/DocumentConversationControls.jsx';
import DocumentExtractButton from '@/features/documents/DocumentExtractButton.jsx';
import { useIsMobile } from '@/lib/tools.jsx';

const ChatWithEditor = ({
    onBack,
    onChatMode,
    url,
    editorType,
    conversationId,
    documentId,
    setDocModifiedStatus,
    onNewConversationId,
    settingsRefreshVersions,
}) => {
    const { t } = useTranslation();
    const sourceRevision = new URLSearchParams(window.location.search).get('sourceRevision');
    const [headerContainer, setHeaderContainer] = useState(null);
    const [mobilePanel, setMobilePanel] = useState('document');
    const isMobile = useIsMobile();
    const detached = useIndependentChatWindow(conversationId, documentId);
    const [isMounted, setIsMounted] = useState(false);

    // ==================== 核心状态 ====================
    const [leftWidth, setLeftWidth] = useState(70);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isChatMinimized, setIsChatMinimized] = useState(false); // 仅最小化按钮触发
    const [isWindowMode, setIsWindowMode] = useState(false); // ChatPage 窗口化状态
    const lastLeftWidthRef = useRef(70);
    const chatPanelRef = useRef(null);
    const attentionTimerRef = useRef(null);
    const [chatAttention, setChatAttention] = useState(false);
    useEffect(() => () => clearTimeout(attentionTimerRef.current), []);
    const openCollaboratorConversation = useCallback(
        (targetId) => {
            if (!targetId) return false;
            if (targetId !== conversationId || detached) {
                return openChatWindow({ conversationId: targetId, documentId });
            }
            setIsCollapsed(false);
            setIsChatMinimized(false);
            setMobilePanel('chat');
            if (isCollapsed || isChatMinimized) setLeftWidth(lastLeftWidthRef.current);
            clearTimeout(attentionTimerRef.current);
            setChatAttention(true);
            attentionTimerRef.current = setTimeout(() => setChatAttention(false), 2800);
            requestAnimationFrame(() => chatPanelRef.current?.focus({ preventScroll: true }));
            return true;
        },
        [conversationId, detached, documentId, isCollapsed, isChatMinimized],
    );

    const [isResizing, setIsResizing] = useState(false);
    const [ghostPos, setGhostPos] = useState(0);

    const containerRef = useRef(null);
    const dragStartTime = useRef(0);
    const startXPos = useRef(0);

    // 常量
    const MIN_CHAT_PERCENT = 20;
    const MAX_CHAT_PERCENT = 50;
    const MIN_LEFT_PERCENT = 100 - MAX_CHAT_PERCENT;
    const MAX_LEFT_PERCENT = 100 - MIN_CHAT_PERCENT;
    const AUTO_COLLAPSE_THRESHOLD_PX = 100;
    const CLICK_TOLERANCE_MS = 300;
    const DRAG_TOLERANCE_PX = 5;

    const editorRef = useRef(null);

    const getSidebarOffset = useCallback(() => 0, []);

    // ==================== 拖拽逻辑 ====================
    const startResizing = useCallback(
        (e) => {
            if (isMobile || isCollapsed || isChatMinimized || isWindowMode) return;
            e.preventDefault();
            dragStartTime.current = Date.now();

            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const sidebarOffset = getSidebarOffset();
                const startX = e.clientX - containerRect.left - sidebarOffset;
                setGhostPos(startX);
                startXPos.current = e.clientX;
                setIsResizing(true);
            }
        },
        [isCollapsed, isChatMinimized, isWindowMode, getSidebarOffset, isMobile],
    );

    const onGhostResize = useCallback(
        (e) => {
            if (!isResizing || !containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const sidebarOffset = getSidebarOffset();
            let newX = e.clientX - containerRect.left - sidebarOffset;
            newX = Math.max(0, Math.min(newX, containerWidth));
            setGhostPos(newX);
        },
        [isResizing, getSidebarOffset],
    );

    const stopResizing = useCallback(() => {
        if (!isResizing || !containerRef.current) {
            setIsResizing(false);
            return;
        }

        const dragDuration = Date.now() - dragStartTime.current;
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const currentX = ghostPos + containerRect.left + getSidebarOffset();
        const deltaX = Math.abs(currentX - startXPos.current);

        if (dragDuration < CLICK_TOLERANCE_MS && deltaX < DRAG_TOLERANCE_PX) {
            setIsResizing(false);
            return;
        }

        const distanceToRight = containerWidth - ghostPos;
        if (distanceToRight < AUTO_COLLAPSE_THRESHOLD_PX) {
            setIsCollapsed(true);
            setLeftWidth(100);
            setIsResizing(false);
            return;
        }

        let newLeftWidthPercent = (ghostPos / containerWidth) * 100;
        newLeftWidthPercent = Math.min(Math.max(newLeftWidthPercent, MIN_LEFT_PERCENT), MAX_LEFT_PERCENT);

        setIsCollapsed(false);
        setLeftWidth(newLeftWidthPercent);
        lastLeftWidthRef.current = newLeftWidthPercent;
        setIsResizing(false);
    }, [isResizing, ghostPos, getSidebarOffset]);

    const toggleChatPanel = useCallback(() => {
        if (detached && !isMobile) {
            openChatWindow({ conversationId, documentId });
            return;
        }
        if (isMobile) {
            setMobilePanel((panel) => (panel === 'chat' ? 'document' : 'chat'));
            setIsChatMinimized(false);
            return;
        }
        const opening = isChatMinimized || isCollapsed;
        setIsChatMinimized(!opening);
        setIsCollapsed(false);
        setLeftWidth(lastLeftWidthRef.current);
    }, [isMobile, isChatMinimized, isCollapsed, detached, conversationId, documentId]);

    // ==================== ChatPage 回调 ====================
    const handleMinimizeChat = useCallback(() => {
        setIsChatMinimized(true);
    }, []);

    const handleWindowModeChange = useCallback((newIsWindowMode) => {
        setIsWindowMode(newIsWindowMode);
        // 窗口化时只隐藏 aside 占位（不影响 fixed 浮窗）
    }, []);

    // ==================== 鼠标事件 ====================
    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', onGhostResize);
            window.addEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', onGhostResize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing, onGhostResize, stopResizing]);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // ==================== 显示控制 ====================
    const showChatPanel = !detached && !isCollapsed && !isChatMinimized && !isWindowMode; // aside 是否显示占位
    const chatVisible = !detached && !isCollapsed && !isChatMinimized; // ChatPage 内部浮窗是否可见

    // ==================== 样式 ====================
    const desktopDocStyle = {
        width: detached || isCollapsed || isChatMinimized || isWindowMode ? '100%' : `${leftWidth}%`,
        flex: detached || isCollapsed || isChatMinimized || isWindowMode ? '1' : 'none',
    };

    const desktopChatStyle = {
        width: showChatPanel ? `${100 - leftWidth}%` : '0px',
        overflow: 'hidden',
        transition: 'width 0.3s ease',
    };

    // ==================== 编辑器消息 ====================
    const handleEditorMessage = useCallback(
        (msg) => {
            if (msg.MessageId === 'Doc_ModifiedStatus') {
                if (msg.Values) setDocModifiedStatus(msg.Values.Modified === true ? 'Modified' : 'Saved');
            } else if (msg.MessageId === 'Action_Save_Resp') {
                if (msg.Values) setDocModifiedStatus(msg.Values.success === true ? 'Saved' : 'Modified');
            }
        },
        [setDocModifiedStatus],
    );

    return (
        <div
            ref={containerRef}
            className={`flex flex-col h-full w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="flex h-14 shrink-0 items-center border-b bg-background">
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 shrink-0"
                    onClick={onBack}
                    title={t('documents_back_to_documents')}
                    aria-label={t('documents_back_to_documents')}
                >
                    <ArrowLeft className="size-4" />
                    <span className="hidden sm:inline">{t('documents_documents')}</span>
                </Button>
                <div ref={setHeaderContainer} className="min-w-0 flex-1">
                    {editorType !== 'markdown' && (
                        <span className="px-4 text-sm font-medium">{t('documents_document_editor')}
                            {sourceRevision !== null && /^\d+$/.test(sourceRevision) && <span className="ml-2 text-xs font-normal text-muted-foreground">知识来源版本 {sourceRevision} · 当前为最新文档</span>}
                        </span>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    aria-label={t(
                        isMobile
                            ? mobilePanel === 'chat'
                                ? 'documents_back_to_document'
                                : 'documents_open_ai_panel'
                            : chatVisible
                              ? 'documents_close_ai_panel'
                              : 'documents_open_ai_panel',
                    )}
                    title={t(
                        isMobile
                            ? mobilePanel === 'chat'
                                ? 'documents_back_to_document'
                                : 'documents_open_ai_panel'
                            : chatVisible
                              ? 'documents_close_ai_panel'
                              : 'documents_open_ai_panel',
                    )}
                    aria-pressed={isMobile ? mobilePanel === 'chat' : chatVisible}
                    onClick={toggleChatPanel}
                >
                    <Bot className="size-4" />
                </Button>
                <NotificationCenterTrigger />
                <TaskCenterTrigger />
                {editorType !== 'markdown' && <DocumentExtractButton documentId={documentId} conversationId={conversationId}
                    onBeforeSubmit={() => {
                        if (!editorRef.current?.save) throw new Error('文档编辑器尚未就绪。');
                        return editorRef.current.save();
                    }} />}
                <DocumentConversationControls
                    conversationId={conversationId}
                    onSelect={onNewConversationId}
                    onChatMode={onChatMode}
                />
            </div>
            <div className="flex min-h-0 flex-1">
                {/* 幽灵拖拽层 */}
                {!isMobile && isResizing && (
                    <div
                        className="fixed inset-0 z-[999] cursor-col-resize bg-transparent"
                        style={{ userSelect: 'none' }}
                    >
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-blue-500 shadow-xl opacity-80 pointer-events-none"
                            style={{
                                left: `${ghostPos + (containerRef.current?.getBoundingClientRect().left || 0) + getSidebarOffset()}px`,
                            }}
                        />
                    </div>
                )}

                {/* 移动端左侧分隔条 */}

                {/* 左侧：文档编辑器 */}
                <main
                    className="h-full flex flex-col bg-white shadow-lg relative min-w-0"
                    style={
                        isMobile
                            ? { flex: 1, width: '100%', display: mobilePanel === 'document' ? undefined : 'none' }
                            : desktopDocStyle
                    }
                >
                    <div className="min-h-0 flex-1 overflow-hidden">
                        {editorType === 'markdown' ? (
                            <MarkdownDocumentEditor
                                headerContainer={headerContainer}
                                onOpenCollaboratorConversation={openCollaboratorConversation}
                                key={documentId}
                                documentId={documentId}
                                conversationId={conversationId}
                                onStatus={setDocModifiedStatus}
                            />
                        ) : (
                            <CollaboraOnlineEditor
                                iframeUrl={url}
                                onMessageReceived={handleEditorMessage}
                                ref={editorRef}
                            />
                        )}
                    </div>
                </main>

                {/* 分隔条 */}
                {!isMobile && showChatPanel && (
                    <div
                        className="w-1 shrink-0 cursor-col-resize bg-border transition-colors hover:bg-primary/40"
                        onMouseDown={startResizing}
                        title={t('documents_drag_to_resize')}
                    />
                )}

                {/* 右侧：AI 聊天面板 */}
                <aside
                    ref={chatPanelRef}
                    tabIndex={-1}
                    aria-label="会话聊天区域"
                    className={`h-full border-l border-gray-200 bg-white flex flex-col relative min-w-0 transition-all duration-300 ${isWindowMode ? 'border-none' : ''} ${chatAttention ? 'ring-4 ring-inset ring-blue-400 shadow-[inset_0_0_24px_rgba(59,130,246,0.15)]' : ''}`}
                    style={
                        isMobile
                            ? { flex: 1, width: '100%', display: mobilePanel === 'chat' ? undefined : 'none' }
                            : desktopChatStyle
                    }
                >
                    <div className="min-h-0 flex-1 overflow-hidden">
                        <ChatPage
                            conversationId={conversationId}
                            documentId={documentId}
                            pageType="doc"
                            onNewConversationId={onNewConversationId}
                            showWindowButton={true}
                            showMinimizeButton={!isMobile}
                            onMinimize={handleMinimizeChat}
                            visible={chatVisible}
                            onWindowModeChange={handleWindowModeChange}
                            settingsRefreshVersions={settingsRefreshVersions}
                        />
                    </div>
                    <AnimatePresence>
                        {chatAttention && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="pointer-events-none absolute inset-0 z-50 border-3 border-blue-400 bg-blue-500/5"
                                aria-hidden="true"
                            />
                        )}
                    </AnimatePresence>
                </aside>
            </div>
        </div>
    );
};

export default ChatWithEditor;
