import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';
import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import {emitEvent} from "@/store/useEventStore.jsx";
import {WEBSOCKET_URL} from "@/config.js";

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

export const WebSocketProvider = ({children}) => {
    const {t} = useTranslation();
    const wsRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    // 标记是否是初始连接（用于区分初始化连接和重连）
    const isInitialConnectionRef = useRef(true);
    // 标记是否正在重连（防止重复重连）
    const isRetryingRef = useRef(false);

    // ====== 重试函数实现 ======
    const retryConnection = () => {
        return new Promise((resolve, reject) => {
            // 防止重复重连
            if (isRetryingRef.current) {
                reject(new Error('Already retrying'));
                return;
            }

            isRetryingRef.current = true;

            // 清理现有连接
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }

            // 初始化新连接
            try {
                const ws = new WebSocket(WEBSOCKET_URL);

                ws.onopen = (event) => {
                    // 连接成功后重置状态
                    isRetryingRef.current = false;
                    globalWsRef = ws;
                    wsRef.current = ws;
                    setIsConnected(true);

                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });

                    resolve({name: 'WebSocket'});
                };

                ws.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        globalMessageCallback(message);
                        setMessages(prev => [...prev, message]);
                    } catch (e) {
                        console.error('Failed to parse WebSocket message:', e);
                    }
                };

                ws.onclose = (event) => {
                    isRetryingRef.current = false;
                    globalWsRef = null;
                    wsRef.current = null;
                    setIsConnected(false);

                    emitEvent({
                        type: "websocket",
                        target: "onclose",
                        payload: null,
                        isReply: false
                    });

                    // 如果不是正常关闭，且不是初始连接失败，尝试重连
                    if (event.code !== 1000 && !isInitialConnectionRef.current) {
                        // 服务器主动断开连接，自动重连
                        if (event.code === 1012) {
                            setTimeout(() => {
                                toast.promise(retryConnection(), {
                                    loading: t('websocket.reconnecting'),
                                    success: (data) => t('websocket.connect_success'),
                                    error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                });
                            }, 1000);
                        } else {
                            // 其他断开情况，弹出错误窗口
                            FatalErrorPopoverElement.show({
                                title: t('websocket.popover_title'),
                                message: t('websocket.popover_content'),
                                showCloseButton: true,
                                showCancelButton: false,
                                onRetry: () => {
                                    toast.promise(retryConnection(), {
                                        loading: t('websocket.connecting'),
                                        success: (data) => t('websocket.connect_success'),
                                        error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                    });
                                },
                                onClose: () => {
                                    toast(t("websocket.reconnect_tip"), {
                                        action: {
                                            label: t("retry"),
                                            onClick: () => {
                                                toast.promise(retryConnection(), {
                                                    loading: t('websocket.connecting'),
                                                    success: (data) => t('websocket.connect_success'),
                                                    error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                                });
                                            },
                                        },
                                        position: 'bottom-right',
                                        closeButton: false,
                                        dismissible: false,
                                        duration: Infinity,
                                    });
                                }
                            });
                        }
                    }
                };

                ws.onerror = (error) => {
                    isRetryingRef.current = false;
                    globalWsRef = null;
                    wsRef.current = null;
                    setIsConnected(false);

                    emitEvent({
                        type: "websocket",
                        target: "onerror",
                        payload: error?.message || 'Unknown error',
                        isReply: false
                    });

                    reject(error);
                };

                // 超时处理（10秒）
                const timeoutId = setTimeout(() => {
                    if (ws.readyState !== WebSocket.OPEN) {
                        ws.close();
                        isRetryingRef.current = false;
                        reject(new Error(t('websocket.connection_timeout')));
                    }
                }, 10000);

                // 成功连接后清除超时
                ws.onopen = (event) => {
                    clearTimeout(timeoutId);
                    // 调用原始的onopen处理
                    globalWsRef = ws;
                    wsRef.current = ws;
                    setIsConnected(true);

                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });

                    resolve({name: 'WebSocket'});
                };

            } catch (error) {
                isRetryingRef.current = false;
                reject(new Error(t('websocket.initialization_failed')));
            }
        });
    };

    // ====== 暴露重试函数 ======
    useEffect(() => {
        currentRetryFunction = retryConnection;
        return () => {
            currentRetryFunction = null;
        };
    }, []);

    // ====== 初始连接 ======
    useEffect(() => {
        isInitialConnectionRef.current = true;

        // 初始化连接
        const initConnection = () => {
            try {
                const ws = new WebSocket(WEBSOCKET_URL);

                ws.onopen = (event) => {
                    isInitialConnectionRef.current = false;
                    isRetryingRef.current = false;
                    globalWsRef = ws;
                    wsRef.current = ws;
                    setIsConnected(true);

                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });
                };

                ws.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        globalMessageCallback(message);
                        setMessages(prev => [...prev, message]);
                    } catch (e) {
                        console.error('Failed to parse WebSocket message:', e);
                    }
                };

                ws.onclose = (event) => {
                    isRetryingRef.current = false;
                    globalWsRef = null;
                    wsRef.current = null;
                    setIsConnected(false);

                    emitEvent({
                        type: "websocket",
                        target: "onclose",
                        payload: null,
                        isReply: false
                    });

                    if (event.code === 401) {  // 没有登录
                        isInitialConnectionRef.current = false;
                        return;
                    }

                    // 如果不是正常关闭，且不是初始连接失败，尝试重连
                    if (event.code !== 1000 && !isInitialConnectionRef.current) {
                        // 服务器主动断开连接，自动重连
                        if (event.code === 1012) {
                            setTimeout(() => {
                                toast.promise(retryConnection(), {
                                    loading: t('websocket.reconnecting'),
                                    success: (data) => t('websocket.connect_success'),
                                    error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                });
                            }, 1000);
                        } else {
                            // 其他断开情况，弹出错误窗口
                            FatalErrorPopoverElement.show({
                                title: t('websocket.popover_title'),
                                message: t('websocket.popover_content'),
                                showCloseButton: true,
                                showCancelButton: false,
                                onRetry: () => {
                                    toast.promise(retryConnection(), {
                                        loading: t('websocket.connecting'),
                                        success: (data) => t('websocket.connect_success'),
                                        error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                    });
                                },
                                onClose: () => {
                                    toast(t("websocket.reconnect_tip"), {
                                        action: {
                                            label: t("retry"),
                                            onClick: () => {
                                                toast.promise(retryConnection(), {
                                                    loading: t('websocket.connecting'),
                                                    success: (data) => t('websocket.connect_success'),
                                                    error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                                });
                                            },
                                        },
                                        position: 'bottom-right',
                                        closeButton: false,
                                        dismissible: false,
                                        duration: Infinity,
                                    });
                                }
                            });
                        }
                    }
                };

                ws.onerror = (error) => {
                    isRetryingRef.current = false;
                    globalWsRef = null;
                    wsRef.current = null;
                    setIsConnected(false);

                    emitEvent({
                        type: "websocket",
                        target: "onerror",
                        payload: error?.message || 'Unknown error',
                        isReply: false
                    });

                };

                // 超时处理（10秒）
                const timeoutId = setTimeout(() => {
                    if (ws.readyState !== WebSocket.OPEN) {
                        ws.close();
                        isRetryingRef.current = false;
                    }
                }, 10000);

                // 成功连接后清除超时
                ws.onopen = (event) => {
                    clearTimeout(timeoutId);
                    isInitialConnectionRef.current = false;
                    isRetryingRef.current = false;
                    globalWsRef = ws;
                    wsRef.current = ws;
                    setIsConnected(true);

                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });
                };

            } catch (error) {
                isInitialConnectionRef.current = false;
                isRetryingRef.current = false;

                // 初始化失败，弹出错误窗口
                FatalErrorPopoverElement.show({
                    title: t('websocket.popover_title'),
                    message: t('websocket.popover_content'),
                    showCloseButton: true,
                    showCancelButton: false,
                    onRetry: () => {
                        toast.promise(retryConnection(), {
                            loading: t('websocket.connecting'),
                            success: (data) => t('websocket.connect_success'),
                            error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                        });
                    },
                    onClose: () => {
                        toast(t("websocket.reconnect_tip"), {
                            action: {
                                label: t("retry"),
                                onClick: () => {
                                    toast.promise(retryConnection(), {
                                        loading: t('websocket.connecting'),
                                        success: (data) => t('websocket.connect_success'),
                                        error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                                    });
                                },
                            },
                            position: 'bottom-right',
                            closeButton: false,
                            dismissible: false,
                            duration: Infinity,
                        });
                    }
                });
            }
        };

        initConnection();

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