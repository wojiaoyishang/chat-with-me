import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import { emitEvent } from "@/context/useEventStore.jsx";
import { WEBSOCKET_URL } from "@/config.js";

// ====== 全局状态管理 ======
let globalWsRef = null;
let currentRetryFunction = null; // 保存当前实例的重试函数

// ====== 开发模式标识（用于处理 React StrictMode 的双重挂载）======
const isDevelopment = process.env.NODE_ENV === 'development';

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

export const WebSocketProvider = ({ children }) => {
    const { t } = useTranslation();
    const wsRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    // 标记是否是初始连接（用于区分初始化连接和重连）
    const isInitialConnectionRef = useRef(true);
    // 标记是否正在重连（防止重复重连）
    const isRetryingRef = useRef(false);

    // ====== 统一的连接创建函数（带连接锁）======
    const createWebSocketConnection = (isRetry = false) => {
        return new Promise((resolve, reject) => {
            // ====== 【核心锁】防止瞬时重复连接 ======
            if (globalWsRef) {
                // 如果已有连接（不管是 OPEN 还是 CONNECTING），强制关闭旧的
                console.warn(
                    '[WebSocket] Duplicate connection attempt detected. ' +
                    'Closing previous connection to ensure only one active link.'
                );
                globalWsRef.close(1000, 'New connection requested (lock acquired)');
                globalWsRef = null;
            }

            // 防止重复重连
            if (isRetryingRef.current && isRetry) {
                reject(new Error('Already retrying'));
                return;
            }

            if (isRetry) {
                isRetryingRef.current = true;
            }

            // 清理本地引用
            if (wsRef.current) {
                wsRef.current = null;
            }

            try {
                const ws = new WebSocket(WEBSOCKET_URL);

                // 【重要】立即把实例挂到全局，后面任何地方都能检测到正在连接中
                globalWsRef = ws;
                wsRef.current = ws;

                // 超时处理（10秒）
                const timeoutId = setTimeout(() => {
                    if (ws.readyState !== WebSocket.OPEN) {
                        ws.close();
                        isRetryingRef.current = false;
                        reject(new Error(t('websocket.connection_timeout')));
                    }
                }, 10000);

                // ====== 成功连接 ======
                ws.onopen = (event) => {
                    clearTimeout(timeoutId);

                    isRetryingRef.current = false;
                    isInitialConnectionRef.current = false; // 重连也算成功连接

                    globalWsRef = ws;
                    wsRef.current = ws;
                    setIsConnected(true);

                    emitEvent({
                        type: "websocket",
                        target: "onopen",
                        payload: null,
                        isReply: false
                    });

                    resolve({ name: 'WebSocket' });
                };

                // ====== 消息处理 ======
                ws.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        globalMessageCallback(message);
                        setMessages(prev => [...prev, message]);
                    } catch (e) {
                        console.error('Failed to parse WebSocket message:', e);
                    }
                };

                // ====== 关闭处理 ======
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

                    if (event.code === 401) { // 未登录
                        isInitialConnectionRef.current = false;
                        return;
                    }

                    // 非正常关闭 + 非首次连接失败 → 触发重连/错误弹窗
                    if (event.code !== 1000 && !isInitialConnectionRef.current) {
                        if (event.code === 1012) {
                            // 服务器主动要求重连
                            setTimeout(() => {
                                toast.promise(retryConnection(), {
                                    loading: t('websocket.reconnecting'),
                                    success: () => t('websocket.connect_success'),
                                    error: (err) => t('websocket.connect_failed', { message: err.message || t('unknown_error') }),
                                });
                            }, 1000);
                        } else {
                            // 其他异常 → 弹出错误窗口
                            FatalErrorPopoverElement.show({
                                title: t('websocket.popover_title'),
                                message: t('websocket.popover_content'),
                                showCloseButton: true,
                                showCancelButton: false,
                                onRetry: () => {
                                    toast.promise(retryConnection(), {
                                        loading: t('websocket.connecting'),
                                        success: () => t('websocket.connect_success'),
                                        error: (err) => t('websocket.connect_failed', { message: err.message || t('unknown_error') }),
                                    });
                                },
                                onClose: () => {
                                    toast(t("websocket.reconnect_tip"), {
                                        action: {
                                            label: t("retry"),
                                            onClick: () => {
                                                toast.promise(retryConnection(), {
                                                    loading: t('websocket.reconnecting'),
                                                    success: () => t('websocket.connect_success'),
                                                    error: (err) => t('websocket.connect_failed', { message: err.message || t('unknown_error') }),
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

                // ====== 错误处理 ======
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

            } catch (error) {
                isRetryingRef.current = false;
                reject(new Error(t('websocket.initialization_failed')));
            }
        });
    };

    // ====== 重试函数（暴露给外部）======
    const retryConnection = () => createWebSocketConnection(true);

    // ====== 暴露重试函数到全局 ======
    useEffect(() => {
        currentRetryFunction = retryConnection;
        return () => {
            currentRetryFunction = null;
        };
    }, []);

    // ====== 初始连接（仅在开发模式下处理 StrictMode 双重挂载）======
    useEffect(() => {
        isInitialConnectionRef.current = true;

        const initConnection = () => {
            // 已有有效连接 直接复用（开发模式下 StrictMode 第二次挂载会命中这里）
            if (globalWsRef && (globalWsRef.readyState === WebSocket.OPEN || globalWsRef.readyState === WebSocket.CONNECTING)) {
                wsRef.current = globalWsRef;
                setIsConnected(true);
                return;
            }

            createWebSocketConnection(false);
        };

        initConnection();

        // 清理函数（开发模式下不关闭连接，防止 StrictMode 导致的重复创建）
        return () => {
            if (wsRef.current) {
                if (!isDevelopment) {
                    // 生产环境正常关闭
                    wsRef.current.close();
                    globalWsRef = null;
                }
                wsRef.current = null;
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
                retryConnection,
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