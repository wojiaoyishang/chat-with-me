import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { emitEvent } from '@/context/useEventStore.jsx';
import { useWebSocket } from '@/context/WebSocketContext.jsx';
import { getRealtimeTransport } from '@/runtime/transport/channel.js';
import { FloatingDockWindow } from '@/components/window';
const AvatarScene = lazy(() => import('./AvatarScene.jsx'));

/** Non-modal scene host leaves the chat composer available for typing. */
export default function AvatarScenePanel({
    conversationId,
    onClose,
    hostElement,
    expanded,
    onToggleExpanded,
    onOpenHistory,
}) {
    const { isConnected, connectionId } = useWebSocket();
    useEffect(() => {
        if (!expanded) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape' && !event.defaultPrevented) onToggleExpanded();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [expanded, onToggleExpanded]);
    const requestScene = useCallback(
        async (event, payload = {}) => {
            // Ephemeral scene operations must never join the offline event queue.
            if (!getRealtimeTransport()?.isOpen) throw new Error('聊天连接已断开，请重新打开场景');
            const result = await emitEvent({ event, payload, conversationId, timeoutMs: 6000 });
            if (result?.success !== true) throw new Error(result?.message || '场景请求失败');
            return { payload: result };
        },
        [conversationId],
    );
    return (
        <FloatingDockWindow
            open
            title="3D 动作模式"
            onClose={onClose}
            portalTarget={hostElement}
            expanded={expanded}
            compactMobile
            zIndex={50}
            defaultLayout={{ width: 380, height: 440 }}
            storageKey="cwm:avatar-window:v1"
            headerActions={
                <>
                    {expanded && (
                        <Button size="sm" variant="ghost" onClick={onOpenHistory}>
                            查看聊天
                        </Button>
                    )}
                    <Button
                        size="icon"
                        className="size-8"
                        variant="ghost"
                        onClick={onToggleExpanded}
                        aria-label={expanded ? '还原 3D 窗口' : '放大 3D 窗口'}
                        title={expanded ? '还原' : '沉浸式模式'}
                    >
                        {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </Button>
                </>
            }
        >
            <div className="h-full min-h-0 overflow-hidden">
                {isConnected && connectionId ? (
                    <Suspense fallback={<p className="p-4 text-center">正在加载场景…</p>}>
                        <AvatarScene
                            key={connectionId}
                            requestScene={requestScene}
                            conversationId={conversationId}
                            immersive={expanded}
                        />
                    </Suspense>
                ) : (
                    <p className="p-4 text-sm" role="status">
                        聊天连接已断开；恢复连接后会重新加载场景。
                    </p>
                )}
            </div>
        </FloatingDockWindow>
    );
}
