import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import {emitEvent} from "@/store/useEventStore.jsx";

// ====== 用于外部访问 WebSocket 实例 ======
let globalWsRef = null;

// ====== 外部可调用的发送函数 ======
export const sendWebSocketMessage = (data) => {
    if (globalWsRef && globalWsRef.readyState === WebSocket.OPEN) {
        globalWsRef.send(JSON.stringify(data));
    } else {
        console.warn('WebSocket is not connected or not available');
    }
};

// ====== Context 部分保持不变 ======
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const { t } = useTranslation();
    const wsRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const connect = () => {
        if (wsRef.current) return;

        const ws = new WebSocket('ws://127.0.0.1:8000/ws');

        ws.onopen = () => {
            emitEvent({
                type: "websocket",
                target: "onopen",
                payload: null,
                isReply: false
            })
            setIsConnected(true);
            globalWsRef = ws; // 更新全局引用
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            globalMessageCallback(message);
            setMessages((prev) => [...prev, message]);
        };

        ws.onclose = () => {
            emitEvent({
                type: "websocket",
                target: "onclose",
                payload: null,
                isReply: false
            })
            setIsConnected(false);
            wsRef.current = null;
            globalWsRef = null;
        };

        ws.onerror = (error) => {
            emitEvent({
                type: "websocket",
                target: "onerror",
                payload: null,
                isReply: false
            })
            toast.error(t('websocket.error', { message: error?.message || t('unknown_error') }));
            FatalErrorPopoverElement.show({
                title: t('websocket.popover_title'),
                message: t('websocket.popover_content'),
                showCloseButton: true,
                showCancelButton: false,
                onRetry: () => {
                    const retryPromise = () => {
                        return new Promise((resolve, reject) => {
                            try {
                                const newWs = new WebSocket('ws://127.0.0.1:8000/ws');
                                newWs.onopen = () => {
                                    emitEvent({
                                        type: "websocket",
                                        target: "onopen",
                                        payload: null,
                                        isReply: false
                                    })
                                    globalWsRef = newWs;
                                    wsRef.current = newWs;
                                    setIsConnected(true);
                                    resolve({ name: 'WebSocket' });
                                };
                                newWs.onerror = (err) => {
                                    emitEvent({
                                        type: "websocket",
                                        target: "onerror",
                                        payload: null,
                                        isReply: false
                                    })
                                    reject(err?.message || t('unknown_error'));
                                };
                            } catch (err) {
                                reject(err?.message || t('unknown_error'));
                            }
                        });
                    };

                    toast.promise(retryPromise(), {
                        loading: t('websocket.reconnecting'),
                        success: (data) => t('websocket.reconnect_success', { name: data.name }),
                        error: (err) => t('websocket.reconnect_failed', { message: err }),
                    });
                },
                onClose: () => {},
            });
            ws.close();
        };

        wsRef.current = ws;
        return ws;
    };

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
            globalWsRef = null;
        }
    };

    // 注意：这里不再需要 sendMessage，因为外部用 sendWebSocketMessage
    const sendMessage = (data) => {
        sendWebSocketMessage(data); // 内部也复用同一个函数
    };

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{
                sendMessage,
                messages,
                isConnected,
                disconnect,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};