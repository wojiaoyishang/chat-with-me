// components/GlobalEventLogger.jsx
import {useEffect} from 'react';
import {emitEvent, useEventStore} from "@/store/useEventStore.jsx";

// 全局事件监听器（仅用于调试/开发）
function GlobalEventLogger() {
    useEffect(() => {
        console.log('[EventLogger] 已启动，开始监听所有事件...');

        const unsubscribe = useEventStore.subscribe((state) => {
            const event = state.event;

            if (event.isReply) {
                console.info('%c[REPLY] ←', 'color: blue; font-weight: bold;', event);
            } else {
                console.warn('%c[COMMAND] →', 'color: green; font-weight: bold;', event);
            }

        });

        // 组件卸载时取消订阅
        return () => {
            unsubscribe();
            console.log('[EventLogger] 已停止');
        };
    }, []);

    return null; // 不渲染任何 UI
}

export default GlobalEventLogger;