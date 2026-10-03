import {lazy, Suspense, useCallback} from 'react';
import {Box, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {emitEvent} from '@/context/useEventStore.jsx';
import {useWebSocket} from '@/context/WebSocketContext.jsx';
import {getRealtimeTransport} from '@/runtime/transport/channel.js';
const AvatarScene = lazy(() => import('./AvatarScene.jsx'));

/** Non-modal scene host leaves the chat composer available for typing. */
export default function AvatarScenePanel({conversationId, onClose}) {
    const {isConnected, connectionId} = useWebSocket();
    const requestScene = useCallback(async (event, payload = {}) => {
        // Ephemeral scene operations must never join the offline event queue.
        if (!getRealtimeTransport()?.isOpen) throw new Error('聊天连接已断开，请重新打开场景');
        const result = await emitEvent({event, payload, conversationId, timeoutMs: 6000});
        if (result?.success !== true) throw new Error(result?.message || '场景请求失败');
        return {payload: result};
    }, [conversationId]);
    return <aside aria-label="3D 动作模式" className="fixed bottom-24 right-2 z-[10020] flex max-h-[65dvh] w-[calc(100vw-1rem)] max-w-sm flex-col overflow-hidden rounded-xl border bg-background text-foreground shadow-xl sm:bottom-28 sm:right-4">
        <header className="flex shrink-0 items-center justify-between border-b px-3 py-1">
            <span className="flex items-center gap-2 text-sm font-medium"><Box size={16}/>3D 动作模式</span>
            <Button size="icon" variant="ghost" onClick={onClose} aria-label="关闭 3D 场景"><X size={18}/></Button>
        </header>
        <div className="min-h-0 overflow-y-auto">
            {isConnected && connectionId ? <Suspense fallback={<p className="p-4 text-center">正在加载场景…</p>}>
                <AvatarScene key={connectionId} requestScene={requestScene} conversationId={conversationId}/>
            </Suspense> : <p className="p-4 text-sm" role="status">聊天连接已断开；恢复连接后会重新加载场景。</p>}
        </div>
    </aside>;
}
