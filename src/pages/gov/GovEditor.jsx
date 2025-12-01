import React, { useRef, useState, useCallback, useEffect } from 'react';
import ChatPage from '@/pages/chat/ChatPage';
import DocEditor from '@/components/editor/DocEditor';

const GovEditor = ({ fileId, markId }) => {
    // --- 新增：淡入动画状态 ---
    const [isMounted, setIsMounted] = useState(false);

    // --- 状态定义 ---
    const [leftWidth, setLeftWidth] = useState(75); // 文档区默认75%，聊天区25%
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [ghostPos, setGhostPos] = useState(0);

    const containerRef = useRef(null);
    const dragStartTime = useRef(0);
    const startXPos = useRef(0); // 全局坐标，用于判断拖拽位移

    // --- 常量定义 ---
    const MIN_CHAT_PERCENT = 20; // 聊天区最小宽度
    const MAX_CHAT_PERCENT = 50; // 聊天区最大宽度
    const MIN_LEFT_PERCENT = 100 - MAX_CHAT_PERCENT; // 文档区最小宽度 (50%)
    const MAX_LEFT_PERCENT = 100 - MIN_CHAT_PERCENT; // 文档区最大宽度 (80%)
    const AUTO_COLLAPSE_THRESHOLD_PX = 100;
    const CLICK_TOLERANCE_MS = 300;
    const DRAG_TOLERANCE_PX = 5;

    const docConfig = { fileId };

    // ✅ 获取 --sidebar-width 偏移量（每次调用时动态读取）
    const getSidebarOffset = useCallback(() => {
        if (!containerRef.current) return 0;
        const styles = getComputedStyle(containerRef.current);
        const sidebarWidth = styles.getPropertyValue('--sidebar-width') || '0px';
        return parseFloat(sidebarWidth) || 0;
    }, []);

    // 1. 开始拖拽 (onMouseDown)
    const startResizing = useCallback(
        (e) => {
            if (isCollapsed) return;

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
        [isCollapsed, getSidebarOffset]
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
        const currentX = ghostPos + containerRect.left + getSidebarOffset(); // 用于计算位移 delta
        const deltaX = Math.abs(currentX - startXPos.current);

        if (dragDuration < CLICK_TOLERANCE_MS && deltaX < DRAG_TOLERANCE_PX) {
            setIsResizing(false);
            return;
        }

        const distanceToRight = containerWidth - ghostPos;

        // 1. 自动折叠条件：距离右侧小于100px
        if (distanceToRight < AUTO_COLLAPSE_THRESHOLD_PX) {
            setIsCollapsed(true);
            setLeftWidth(100);
            setIsResizing(false);
            return;
        }

        // 2. 计算新宽度百分比
        let newLeftWidthPercent = (ghostPos / containerWidth) * 100;

        // 3. 应用业务规则限制（文档区50%-80%）
        newLeftWidthPercent = Math.min(
            Math.max(newLeftWidthPercent, MIN_LEFT_PERCENT),
            MAX_LEFT_PERCENT
        );

        // 4. 设置最终状态
        setIsCollapsed(false);
        setLeftWidth(newLeftWidthPercent);
        setIsResizing(false);
    }, [isResizing, ghostPos, getSidebarOffset]);

    // 4. 点击展开逻辑
    const handleExpand = useCallback(() => {
        if (!isCollapsed) return;
        setIsCollapsed(false);
        setLeftWidth(75); // 恢复默认宽度
    }, [isCollapsed]);

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

    // --- 淡入动画：组件挂载后触发 ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`flex h-screen w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${
                isMounted ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* 幽灵层：拖拽时显示 */}
            {isResizing && (
                <div
                    className="fixed inset-0 z-50 cursor-col-resize bg-transparent"
                    style={{ userSelect: 'none' }}
                >
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-blue-500 shadow-xl opacity-80 pointer-events-none"
                        style={{ left: ghostPos + (containerRef.current?.getBoundingClientRect().left || 0) + getSidebarOffset() }}
                    />
                </div>
            )}

            {/* --- 左侧：文档编辑器 --- */}
            <main
                className="h-full flex flex-col bg-white shadow-lg relative min-w-0"
                style={{
                    width: isCollapsed ? 'auto' : `${leftWidth}%`,
                    flex: isCollapsed ? '1' : 'none',
                }}
            >
                <div className="flex-1 overflow-y-auto">
                    <DocEditor config={docConfig} />
                </div>
            </main>

            {/* --- 中间：实体拖拽条 / 折叠栏 --- */}
            <div
                className={`relative z-30 flex-shrink-0 flex items-center justify-center transition-all duration-200
          ${isCollapsed
                    ? 'w-8 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 cursor-pointer'
                    : 'w-2 bg-gray-400 hover:bg-blue-600 cursor-col-resize'
                }`}
                onMouseDown={!isCollapsed ? startResizing : undefined}
                onClick={isCollapsed ? handleExpand : undefined}
                title={isCollapsed ? '点击展开' : '拖拽调整宽度'}
                style={{ userSelect: 'none' }}
            >
                {isCollapsed && (
                    <div
                        className="writing-vertical-rl text-gray-500 text-xs tracking-widest whitespace-nowrap select-none pointer-events-none"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        点击或拖动这里打开AI面板
                    </div>
                )}
            </div>

            {/* --- 右侧：AI 聊天 --- */}
            <aside
                className={`h-full border-l border-gray-200 bg-white flex flex-col relative min-w-0`}
                style={{
                    width: isCollapsed ? '0px' : `${100 - leftWidth}%`,
                    display: isCollapsed ? 'none' : 'flex',
                }}
            >
                <div className="flex-1 overflow-hidden">
                    <ChatPage markId={markId} />
                </div>
            </aside>
        </div>
    );
};

export default GovEditor;