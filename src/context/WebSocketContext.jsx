import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import { emitEvent } from "@/store/useEventStore.jsx";

// ====== 全局状态管理 ======
let globalWsRef = null;
let currentRetryFunction = null; // 保存当前实例的重试函数

// ====== 外部可调用的发送函数 ======
export const sendWebSocketMessage = (data) => {
    if (globalWsRef?.readyState === WebSocket.OPEN) {
        globalWsRef.send(JSON.stringify(data));
        return true;
    }
    console.warn('WebSocket is not connected or not available');
    return false;
};

// ====== 可导出的重试函数 ======
export const retryWebSocketConnection = () => {
    if (typeof currentRetryFunction === 'function') {
        return currentRetryFunction();
    }
    return Promise.reject(new Error('No active WebSocket retry handler available'));
};

// ====== Context 设置 ======
const WebSocketContext = createContext(null);

// ====== WebSocket 初始化函数 ======
const initializeWebSocket = ({
                                 onOpen,
                                 onMessage,
                                 onClose,
                                 onError,
                                 setGlobalRef
                             }) => {
    try {
        const ws = new WebSocket('ws://127.0.0.1:8000/ws');

        ws.onopen = (event) => {
            setGlobalRef(ws);
            onOpen?.(event);
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                onMessage?.(message);
            } catch (e) {
                console.error('Failed to parse WebSocket message:', e);
            }
        };

        ws.onclose = (event) => {
            setGlobalRef(null);
            onClose?.(event);
        };

        ws.onerror = (error) => {
            onError?.(error);
            // 确保在错误时清理引用
            setGlobalRef(null);
        };

        return ws;
    } catch (error) {
        onError?.(error);
        return null;
    }
};

export const WebSocketProvider = ({ children }) => {
    const { t } = useTranslation();
    const wsRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    // ====== 重试函数实现 ======
    const retryConnection = () => {
        return new Promise((resolve, reject) => {
            // 清理现有连接
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }

            // 初始化新连接
            const ws = initializeWebSocket({
                onOpen: () => {
                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });
                    setIsConnected(true);
                    resolve({ name: 'WebSocket' });
                },
                onMessage: (message) => {
                    globalMessageCallback(message);
                    setMessages(prev => [...prev, message]);
                },
                onClose: () => {
                    emitEvent({
                        type: "websocket",
                        target: "onclose",
                        payload: null,
                        isReply: false
                    });
                    setIsConnected(false);
                    FatalErrorPopoverElement.show({
                        title: t('websocket.disconnect'),
                        message: t('websocket.disconnect_from_server'),
                        showCloseButton: true,
                        showCancelButton: false,
                        onRetry: () => {
                            connect();
                        },
                        onClose: () => {

                        }
                    });
                },
                onError: (error) => {
                    emitEvent({
                        type: "websocket",
                        target: "onerror",
                        payload: error?.message || 'Unknown error',
                        isReply: false
                    });
                    reject(error);
                },
                setGlobalRef: (wsInstance) => {
                    globalWsRef = wsInstance;
                    wsRef.current = wsInstance;
                }
            });

            if (!ws) {
                reject(new Error(t('websocket.initialization_failed')));
                return;
            }

            // 超时处理（10秒）
            const timeoutId = setTimeout(() => {
                if (ws.readyState !== WebSocket.OPEN) {
                    ws.close();
                    reject(new Error(t('websocket.connection_timeout')));
                }
            }, 10000);

            // 清理超时
            ws.onopen = (event) => {
                clearTimeout(timeoutId);
                if (typeof ws.onopen === 'function') {
                    ws.onopen(event);
                }
            };
        });
    };

    // ====== 暴露重试函数 ======
    useEffect(() => {
        currentRetryFunction = retryConnection;
        return () => {
            currentRetryFunction = null;
        };
    }, [retryConnection]);

    // ====== 初始连接 ======
    useEffect(() => {
        const connect = () => {
            const ws = initializeWebSocket({
                onOpen: (event) => {
                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });
                    setIsConnected(true);
                },
                onMessage: (message) => {
                    globalMessageCallback(message);
                    setMessages(prev => [...prev, message]);
                },
                onClose: (event) => {
                    emitEvent({
                        type: "websocket",
                        target: "onclose",
                        payload: null,
                        isReply: false
                    });
                    setIsConnected(false);
                    FatalErrorPopoverElement.show({
                        title: t('websocket.popover_title'),
                        message: t('websocket.popover_content'),
                        showCloseButton: true,
                        showCancelButton: false,
                        onRetry: () => {
                            connect();
                        },
                        onClose: () => {
                            toast(t("websocket.reconnect_tip"), {
                                action: {
                                    label: t("retry"),
                                    onClick: () => connect(),
                                },
                                position: 'bottom-right',
                                closeButton: false,
                                dismissible: false,
                                duration: Infinity,
                            });
                        }
                    });
                },
                onError: (error) => {
                    emitEvent({
                        type: "websocket",
                        target: "onerror",
                        payload: error?.message || 'Unknown error',
                        isReply: false
                    });

                    toast.error(t('websocket.error', {
                        message: error?.message || t('unknown_error')
                    }));

                    FatalErrorPopoverElement.show({
                        title: t('websocket.popover_title'),
                        message: t('websocket.popover_content'),
                        showCloseButton: true,
                        showCancelButton: false,
                        onRetry: () => {
                            toast.promise(retryConnection(), {
                                loading: t('websocket.reconnecting'),
                                success: (data) => t('websocket.reconnect_success', { name: data.name }),
                                error: (err) => t('websocket.reconnect_failed', {
                                    message: err.message || t('unknown_error')
                                }),
                            });
                        },
                        onClose: () => {

                        },
                    });
                },
                setGlobalRef: (wsInstance) => {
                    globalWsRef = wsInstance;
                    wsRef.current = wsInstance;
                }
            });

            if (!ws) {
                FatalErrorPopoverElement.show({
                    title: t('websocket.init_failed_title'),
                    message: t('websocket.init_failed_content'),
                    showCloseButton: true,
                    showCancelButton: false,
                    onRetry: () => {
                        connect();
                    },
                    onClose: () => {

                    }
                });
            }
        };

        connect();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
                globalWsRef = null;
            }
        };
    }, [t]);

    // ====== 消息发送封装 ======
    const sendMessage = (data) => {
        if (!isConnected) {
            toast.warning(t('websocket.not_connected'));
            return false;
        }
        return sendWebSocketMessage(data);
    };

    return (
        <WebSocketContext.Provider
            value={{
                sendMessage,
                messages,
                isConnected,
                retryConnection, // 暴露重试函数给子组件
                disconnect: () => {
                    if (wsRef.current) {
                        wsRef.current.close();
                        wsRef.current = null;
                        globalWsRef = null;
                        setIsConnected(false);
                    }
                },
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

// ====== Hook for easy access ======
export const useWebSocket = () => useContext(WebSocketContext);