import React, {useRef, useState, useCallback, useEffect} from 'react';
import ChatPage from '@/pages/ChatPage.jsx';
import CollaboraOnlineEditor from '@/components/editor/CollaboraOnlineEditor.jsx';
import {useIsMobile} from "@/lib/tools.jsx";

const ChatWithEditor = ({url, chatMarkId, documentMarkId, setDocModifiedStatus, onNewChatMarkId}) => {

    const isMobile = useIsMobile();
    const [isMounted, setIsMounted] = useState(false);

    // ==================== 核心状态 ====================
    const [leftWidth, setLeftWidth] = useState(70);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isChatMinimized, setIsChatMinimized] = useState(false);   // 仅最小化按钮触发
    const [isWindowMode, setIsWindowMode] = useState(false);         // ChatPage 窗口化状态
    const lastLeftWidthRef = useRef(70);

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

    const getSidebarOffset = useCallback(() => {
        if (!containerRef.current) return 0;
        const styles = getComputedStyle(containerRef.current);
        const sidebarWidth = styles.getPropertyValue('--sidebar-width') || '0px';
        return parseFloat(sidebarWidth) || 0;
    }, []);

    // ==================== 拖拽逻辑 ====================
    const startResizing = useCallback((e) => {
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
    }, [isCollapsed, isChatMinimized, isWindowMode, getSidebarOffset, isMobile]);

    const onGhostResize = useCallback((e) => {
        if (!isResizing || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const sidebarOffset = getSidebarOffset();
        let newX = e.clientX - containerRect.left - sidebarOffset;
        newX = Math.max(0, Math.min(newX, containerWidth));
        setGhostPos(newX);
    }, [isResizing, getSidebarOffset]);

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

    // ==================== 分隔条点击 ====================
    const handleDividerClick = useCallback(() => {
        if (isChatMinimized) {
            setIsChatMinimized(false);
            setIsCollapsed(false);
            setLeftWidth(lastLeftWidthRef.current);
        } else if (isMobile) {
            setIsCollapsed(prev => !prev);
        } else if (isCollapsed) {
            setIsCollapsed(false);
            setLeftWidth(75);
            lastLeftWidthRef.current = 75;
        }
    }, [isChatMinimized, isCollapsed, isMobile]);

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
    const showChatPanel = !isChatMinimized && !isWindowMode;   // aside 是否显示占位
    const chatVisible = !isChatMinimized;                      // ChatPage 内部浮窗是否可见

    // ==================== RenderDivider ====================
    const RenderDivider = ({position}) => {
        const showWideBar = isMobile || isCollapsed || isChatMinimized;

        let labelText = isChatMinimized
            ? '点击这里打开AI对话'
            : isMobile
                ? (isCollapsed ? '点击这里打开AI面板' : '点击这里关闭AI面板')
                : '点击这里打开AI面板';

        return (
            <div
                className={`relative z-10 flex-shrink-0 flex items-center justify-center transition-all duration-200 border-gray-300
                    ${showWideBar ? 'w-8 bg-gray-100 hover:bg-gray-200 cursor-pointer' : 'w-2 bg-gray-400 hover:bg-blue-600 cursor-col-resize'}
                    ${position === 'left' ? 'border-r' : 'border-l'} 
                `}
                onMouseDown={(!isMobile && !isCollapsed && !isChatMinimized && !isWindowMode) ? startResizing : undefined}
                onClick={handleDividerClick}
                title={isChatMinimized ? '打开AI对话' : (isMobile ? (isCollapsed ? '打开AI' : '关闭AI') : (isCollapsed ? '展开' : '拖拽调整'))}
                style={{userSelect: 'none'}}
            >
                {showWideBar && (
                    <div className="writing-vertical-rl text-gray-500 text-xs tracking-widest whitespace-nowrap select-none pointer-events-none"
                         style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                        {labelText}
                    </div>
                )}
            </div>
        );
    };

    // ==================== 样式 ====================
    const desktopDocStyle = {
        width: (isCollapsed || isChatMinimized || isWindowMode) ? '100%' : `${leftWidth}%`,
        flex: (isCollapsed || isChatMinimized || isWindowMode) ? '1' : 'none'
    };

    const desktopChatStyle = {
        width: showChatPanel ? `${100 - leftWidth}%` : '0px',
        overflow: 'hidden',
        transition: 'width 0.3s ease'
    };

    // ==================== 编辑器消息 ====================
    const handleEditorMessage = useCallback((msg) => {
        if (msg.MessageId === 'Doc_ModifiedStatus') {
            if (msg.Values) setDocModifiedStatus(msg.Values.Modified === true ? "Modified" : "Saved");
        } else if (msg.MessageId === 'Action_Save_Resp') {
            if (msg.Values) setDocModifiedStatus(msg.Values.success === true ? "Saved" : "Modified");
        }
    }, [setDocModifiedStatus]);

    return (
        <div ref={containerRef}
             className={`flex h-screen w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacity-0'}`}>

            {/* 幽灵拖拽层 */}
            {!isMobile && isResizing && (
                <div className="fixed inset-0 z-[999] cursor-col-resize bg-transparent" style={{userSelect: 'none'}}>
                    <div className="absolute top-0 bottom-0 w-1 bg-blue-500 shadow-xl opacity-80 pointer-events-none"
                         style={{left: `${ghostPos + (containerRef.current?.getBoundingClientRect().left || 0) + getSidebarOffset()}px`}}/>
                </div>
            )}

            {/* 移动端左侧分隔条 */}
            {isMobile && !isCollapsed && !isChatMinimized && <RenderDivider position="left"/>}

            {/* 左侧：文档编辑器 */}
            <main className="h-full flex flex-col bg-white shadow-lg relative min-w-0"
                  style={isMobile ? {flex: 1, width: '100%'} : desktopDocStyle}>
                <div className="flex-1 overflow-y-auto">
                    <CollaboraOnlineEditor iframeUrl={url} onMessageReceived={handleEditorMessage} ref={editorRef}/>
                </div>
            </main>

            {/* 分隔条 */}
            {(!isMobile || (isMobile && (isCollapsed || isChatMinimized))) && (
                <RenderDivider position="middle"/>
            )}

            {/* 右侧：AI 聊天面板 */}
            <aside
                className={`h-full border-l border-gray-200 bg-white flex flex-col relative min-w-0 transition-all duration-300 ${isWindowMode ? 'border-none' : ''}`}
                style={isMobile ? {flex: 1, width: '100%'} : desktopChatStyle}
            >
                <div className="flex-1 overflow-hidden">
                    <ChatPage
                        chatMarkId={chatMarkId}
                        documentMarkId={documentMarkId}
                        pageType="doc"
                        onNewChatMarkId={onNewChatMarkId}
                        showWindowButton={true}
                        showMinimizeButton={true}
                        onMinimize={handleMinimizeChat}
                        visible={chatVisible}
                        onWindowModeChange={handleWindowModeChange}
                    />
                </div>
            </aside>
        </div>
    );
};

export default ChatWithEditor;