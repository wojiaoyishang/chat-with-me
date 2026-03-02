import React, { useRef, useState, useCallback, useEffect } from 'react';
import ChatPage from '@/pages/ChatPage.jsx';
import CollaboraOnlineEditor from '@/components/editor/CollaboraOnlineEditor.jsx';
import {getMarkId, useIsMobile} from "@/lib/tools.jsx"; // 引入工具函数

const ChatWithEditor = ({ }) => {

    // 这个页面的 ID
    const [markId, setMarkId] = useState(getMarkId());

    const isMobile = useIsMobile(); // 获取移动端状态
    const [isMounted, setIsMounted] = useState(false);

    // --- 状态定义 ---
    const [leftWidth, setLeftWidth] = useState(75);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [ghostPos, setGhostPos] = useState(0);

    const containerRef = useRef(null);
    const dragStartTime = useRef(0);
    const startXPos = useRef(0);

    // --- 常量定义 ---
    const MIN_CHAT_PERCENT = 20;
    const MAX_CHAT_PERCENT = 50;
    const MIN_LEFT_PERCENT = 100 - MAX_CHAT_PERCENT;
    const MAX_LEFT_PERCENT = 100 - MIN_CHAT_PERCENT;
    const AUTO_COLLAPSE_THRESHOLD_PX = 100;
    const CLICK_TOLERANCE_MS = 300;
    const DRAG_TOLERANCE_PX = 5;

    const getSidebarOffset = useCallback(() => {
        if (!containerRef.current) return 0;
        const styles = getComputedStyle(containerRef.current);
        const sidebarWidth = styles.getPropertyValue('--sidebar-width') || '0px';
        return parseFloat(sidebarWidth) || 0;
    }, []);

    // 1. 开始拖拽 (onMouseDown) - 桌面端专用
    const startResizing = useCallback(
        (e) => {
            // 如果是移动端 或 已经折叠，禁止拖拽
            if (isMobile || isCollapsed) return;

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
        [isCollapsed, getSidebarOffset, isMobile]
    );

    // 2. 拖拽中 (onMouseMove)
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
        [isResizing, getSidebarOffset]
    );

    // 3. 结束拖拽/点击 (window.onMouseUp)
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

        // 如果是点击事件（位移小且时间短）
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
        newLeftWidthPercent = Math.min(
            Math.max(newLeftWidthPercent, MIN_LEFT_PERCENT),
            MAX_LEFT_PERCENT
        );

        setIsCollapsed(false);
        setLeftWidth(newLeftWidthPercent);
        setIsResizing(false);
    }, [isResizing, ghostPos, getSidebarOffset]);

    // 4. 处理点击逻辑 (兼容桌面和移动端)
    const handleDividerClick = useCallback(() => {
        if (isMobile) {
            // 移动端：简单切换状态
            setIsCollapsed(prev => !prev);
        } else {
            // 桌面端：只有在折叠状态下点击才展开
            if (isCollapsed) {
                setIsCollapsed(false);
                setLeftWidth(75);
            }
        }
    }, [isCollapsed, isMobile]);

    // --- 监听全局鼠标事件 ---
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

    // --- 内部组件：分隔条/操作条 ---
    // position: 'left' | 'middle' | 'right' (仅用于根据位置调整样式或文字)
    const RenderDivider = ({ position }) => {
        // 移动端始终显示宽条(w-8)，桌面端未折叠时显示细条(w-2)
        // 注意：移动端打开AI时(isCollapsed=false)，条在左侧，此时也需要显示宽条方便点击
        const showWideBar = isMobile || isCollapsed;

        let labelText = '';
        if (isMobile) {
            // 移动端逻辑：
            // 如果 isCollapsed=true (只有文档)，条在右边，提示"打开AI"
            // 如果 isCollapsed=false (只有AI)，条在左边，提示"关闭AI"
            labelText = isCollapsed ? '点击这里打开AI面板' : '点击这里关闭AI面板';
        } else {
            // 桌面端逻辑
            labelText = '点击这里打开AI面板';
        }

        return (
            <div
                className={`relative z-10 flex-shrink-0 flex items-center justify-center transition-all duration-200 border-gray-300
                    ${showWideBar
                    ? 'w-8 bg-gray-100 hover:bg-gray-200 cursor-pointer'
                    : 'w-2 bg-gray-400 hover:bg-blue-600 cursor-col-resize'
                }
                    ${position === 'left' ? 'border-r' : 'border-l'} 
                `}
                // 仅桌面端且未折叠时允许拖拽
                onMouseDown={(!isMobile && !isCollapsed) ? startResizing : undefined}
                // 移动端任何时候都允许点击，桌面端仅折叠时允许点击
                onClick={(isMobile || isCollapsed) ? handleDividerClick : undefined}
                title={isMobile ? (isCollapsed ? '打开AI' : '关闭AI') : (isCollapsed ? '展开' : '拖拽调整')}
                style={{ userSelect: 'none' }}
            >
                {showWideBar && (
                    <div
                        className="writing-vertical-rl text-gray-500 text-xs tracking-widest whitespace-nowrap select-none pointer-events-none"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        {labelText}
                    </div>
                )}
            </div>
        );
    };

    // --- 动态计算样式 ---
    // 移动端：如果 isCollapsed 为 false，意味着 AI 面板打开，此时 DocEditor 应该隐藏
    const showDocEditor = !isMobile || (isMobile && isCollapsed);
    // 移动端：如果 isCollapsed 为 true，意味着只看文档，此时 ChatPage 应该隐藏
    const showChatPage = !isMobile ? !isCollapsed : !isCollapsed;

    // 桌面端宽度计算
    const desktopDocStyle = { width: isCollapsed ? 'auto' : `${leftWidth}%`, flex: isCollapsed ? '1' : 'none' };
    const desktopChatStyle = { width: isCollapsed ? '0px' : `${100 - leftWidth}%`, display: isCollapsed ? 'none' : 'flex' };

    return (
        <div
            ref={containerRef}
            className={`flex h-screen w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${
                isMounted ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* 幽灵层：仅桌面端拖拽时显示 */}
            {!isMobile && isResizing && (
                <div
                    className="fixed inset-0 z-10 cursor-col-resize bg-transparent"
                    style={{ userSelect: 'none' }}
                >
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-blue-500 shadow-xl opacity-80 pointer-events-none"
                        style={{ left: ghostPos + (containerRef.current?.getBoundingClientRect().left || 0) + getSidebarOffset() }}
                    />
                </div>
            )}

            {/* --- 移动端特殊逻辑：当AI打开时，左侧显示关闭条 --- */}
            {isMobile && !isCollapsed && (
                <RenderDivider position="left" />
            )}

            {/* --- 左侧：文档编辑器 --- */}
            <main
                className={`h-full flex flex-col bg-white shadow-lg relative min-w-0 ${!showDocEditor ? 'hidden' : ''}`}
                style={isMobile ? { flex: 1, width: '100%' } : desktopDocStyle}
            >
                <div className="flex-1 overflow-y-auto">
                    {/*<CollaboraOnlineEditor iframeUrl={url} />*/}
                </div>
            </main>

            {/* --- 中间：分隔条 (桌面端常驻 / 移动端仅在关闭AI时显示在右侧) --- */}
            {(!isMobile || (isMobile && isCollapsed)) && (
                <RenderDivider position="middle" />
            )}

            {/* --- 右侧：AI 聊天 --- */}
            <aside
                className={`h-full border-l border-gray-200 bg-white flex flex-col relative min-w-0 ${!showChatPage ? 'hidden' : ''}`}
                style={isMobile ? { flex: 1, width: '100%' } : desktopChatStyle}
            >
                <div className="flex-1 overflow-hidden">
                    <ChatPage markId={markId} />
                </div>
            </aside>
        </div>
    );
};

export default ChatWithEditor;