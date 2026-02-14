import { create } from 'zustand';

import { sendWebSocketMessage } from "@/context/WebSocketContext.jsx";
import { generateUUID } from '@/lib/tools.jsx';

const createDebugLogger = () => {
    if (typeof DEBUG_MODE === 'undefined' || !DEBUG_MODE) return null;

    return {
        logEmit: (event, stack) => {
            const { type, target, payload, markId, isReply, id } = event;

            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

            console.groupCollapsed(
                `%c[EVENT EMIT] %c${timestamp} %cEVENT`,
                'color: #0066ff; font-weight: bold',
                'color: #666; font-style: italic',
                'color: #009933; font-weight: bold'
            );

            console.log(
                `%cType:%c ${type} %c| %cTarget:%c ${target} %c| %cMark ID:%c ${markId || 'N/A'} %c| %cID:%c ${id || 'N/A'}`,
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff'
            );

            if (payload?.command) {
                console.log(
                    `%cCommand:%c ${payload.command}`,
                    'font-weight: bold', 'color: #ff6600; font-size: 1.1em'
                );
            }

            console.log('%cPayload:', 'font-weight: bold; color: #6600cc');
            console.log(payload);

            if (stack) {
                console.log('%cCall Stack:', 'font-weight: bold; color: #cc0000');
                console.group();
                console.trace(stack);
                console.groupEnd();
            }

            console.groupEnd();
        },

        logReceive: (event, listenerStack) => {
            const { type, target, payload, markId, isReply, id } = event;

            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

            console.groupCollapsed(
                `%c[EVENT RECEIVE] %c${timestamp} %cEVENT`,
                'color: #009933; font-weight: bold',
                'color: #666; font-style: italic',
                'color: #009933; font-weight: bold'
            );

            console.log(
                `%cType:%c ${type} %c| %cTarget:%c ${target} %c| %cMark ID:%c ${markId || 'N/A'} %c| %cID:%c ${id || 'N/A'}`,
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff',
                'color: #ccc',
                'font-weight: bold', 'color: #0066ff'
            );

            if (payload?.command) {
                console.log(
                    `%cCommand:%c ${payload.command}`,
                    'font-weight: bold', 'color: #ff6600; font-size: 1.1em'
                );
            }

            console.log('%cPayload:', 'font-weight: bold; color: #6600cc');
            console.log(payload);

            if (listenerStack) {
                console.log('%cRegistered at:', 'font-weight: bold; color: #cc0000');
                console.group();
                console.log(listenerStack);
                console.groupEnd();
            }

            console.groupEnd();
        }
    };
};

// =======================
// 全局事件存储
// =======================
export const useEventStore = create((set, get) => {
    const debugLogger = createDebugLogger();
    // 存储回复监听器 { [eventId]: resolveFunction }
    const replyListeners = new Map();

    return {
        listeners: {},
        processedEventIds: [],   // 普通事件（非回复）的已处理 ID
        processedReplyIds: [],   // 回复事件的已处理 ID（关键修复）
        uniqueListeners: new Set(),

        // 内部方法：注册回复监听器
        _registerReplyListener: (id, resolve) => {
            replyListeners.set(id, resolve);
        },

        // 内部方法：移除回复监听器
        _removeReplyListener: (id) => {
            replyListeners.delete(id);
        },

        // 内部方法：检查回复监听器是否存在
        _hasReplyListener: (id) => {
            return replyListeners.has(id);
        },

        addListener: (type, target, callback, listenerMarkId, acceptReply = false, onlyEmpty = false, unique = null) => {
            const registrationStack = debugLogger
                ? new Error('Listener registered at:').stack.split('\n').slice(2).join('\n')
                : null;

            if (unique !== null) {
                const { uniqueListeners } = get();
                if (uniqueListeners.has(unique)) {
                    console.warn(`Unique listener for "${unique}" already registered. Registration skipped.`);
                    return () => {};
                }
            }

            set(state => {
                const newListeners = { ...state.listeners };
                if (!newListeners[type]) newListeners[type] = {};
                if (!newListeners[type][target]) newListeners[type][target] = [];

                const exists = newListeners[type][target].some(l => l.callback === callback);
                if (!exists) {
                    newListeners[type][target] = [
                        ...newListeners[type][target],
                        {
                            callback,
                            active: true,
                            markId: listenerMarkId,
                            acceptReply,
                            onlyEmpty,
                            registrationStack
                        }
                    ];
                }

                let newState = { listeners: newListeners };
                if (unique !== null) {
                    newState.uniqueListeners = new Set([...state.uniqueListeners, unique]);
                }

                return newState;
            });

            return () => {
                set(state => {
                    const newListeners = { ...state.listeners };
                    if (newListeners[type]?.[target]) {
                        newListeners[type][target] = newListeners[type][target]
                            .map(l => l.callback === callback ? { ...l, active: false } : l)
                            .filter(l => l.active);

                        if (newListeners[type][target].length === 0) {
                            delete newListeners[type][target];
                            if (Object.keys(newListeners[type]).length === 0) {
                                delete newListeners[type];
                            }
                        }
                    }
                    return { listeners: newListeners };
                });

                if (unique !== null) {
                    set(state => {
                        const newUniqueListeners = new Set(state.uniqueListeners);
                        newUniqueListeners.delete(unique);
                        return { uniqueListeners: newUniqueListeners };
                    });
                }
            };
        },

        _emit: (event, emitStack = null) => {
            let {
                type = null,
                target = null,
                markId: eventMarkId = null,
                isReply = false,
                payload,
                id = null,
                fromWebsocket = false,
                notReplyToWebsocket = false
            } = event;

            const { listeners, processedEventIds, processedReplyIds } = get();

            // 生成唯一ID（如果未提供）
            if (!id) {
                id = generateUUID();
                event.id = id;
            }

            // 非WebSocket事件且不是来自WebSocket的事件才发送
            if (type !== 'websocket' && !fromWebsocket) {
                sendWebSocketMessage({
                    ...(type && { type }),
                    ...(target && { target }),
                    payload,
                    ...(eventMarkId && { markId: eventMarkId }),
                    isReply,
                    id
                });
            }

            if (debugLogger) {
                if (!isReply) {
                    debugLogger.logEmit(event, emitStack);
                } else {
                    debugLogger.logReceive(event, emitStack);
                }
            }

            // 处理回复事件：检查是否有等待此ID的回复监听器
            if (isReply) {
                const resolveFn = replyListeners.get(id);
                if (resolveFn) {
                    const safeReply = () => {
                        console.warn('Cannot reply to a reply event');
                    };
                    resolveFn(payload, eventMarkId, true, id, safeReply, undefined);
                    replyListeners.delete(id);
                }
            }

            // ==================== 关键修改部分 ====================
            // 分别检测普通事件和回复事件的重复
            if (isReply) {
                if (processedReplyIds.includes(id)) {
                    console.warn(`Duplicate reply event ignored: ${id}`);
                    return;
                }
            } else {
                if (processedEventIds.includes(id)) {
                    console.warn(`Duplicate event ignored: ${id}`);
                    return;
                }
            }

            // 分别加入对应的已处理列表（防止内存无限增长）
            set(state => ({
                ...(isReply
                        ? { processedReplyIds: [...state.processedReplyIds, id].slice(-100) }
                        : { processedEventIds: [...state.processedEventIds, id].slice(-100) }
                )
            }));
            // ====================================================

            // 标准事件分发
            const targetListeners = [...(listeners[type]?.[target] || [])];
            targetListeners.forEach(listener => {
                if (!listener.active) return;
                if (listener.acceptReply !== isReply) return;
                if (listener.markId != null && eventMarkId != null && listener.markId !== eventMarkId) return;
                if (listener.markId == null && listener.onlyEmpty && eventMarkId != null) return;

                const reply = (data) => {
                    get()._emit({
                        payload: data,
                        isReply: true,
                        id: id,
                        ...(notReplyToWebsocket && { fromWebsocket: notReplyToWebsocket })
                    }, new Error('Reply initiated at:').stack);
                };

                Promise.resolve().then(() => {
                    if (!listener.active || (isReply && !listener.acceptReply)) return;
                    try {
                        listener.callback(payload, eventMarkId, isReply, id, reply, listener.markId);
                    } catch (error) {
                        console.groupCollapsed(
                            `%c[EVENT ERROR] %c${type}/${target}`,
                            'color: #cc0000; font-weight: bold',
                            'color: #666'
                        );
                        console.error(`Error in event listener:`, error);
                        console.log('Event payload:', payload);
                        console.log('Event markId:', eventMarkId);
                        console.log('Listener markId:', listener.markId);
                        console.log('Is Reply:', isReply);
                        console.log('Listener registered at:');
                        console.log(listener.registrationStack || 'N/A');
                        console.groupEnd();
                    }
                });
            });
        }
    };
});

// =======================
// 增强的事件发射函数
// =======================
export let emitEvent = ({
                            type,
                            target,
                            payload,
                            markId = null,
                            isReply = false,
                            id = null,
                            fromWebsocket = false,
                            notReplyToWebsocket = false,
                            onTimeout = null
                        }) => {
    const emitStack = typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE
        ? new Error('Event emitted at:').stack
        : null;

    const event = { type, target, payload, markId, isReply, id, fromWebsocket, notReplyToWebsocket };

    const state = useEventStore.getState();
    state._emit(event, emitStack);

    const eventId = event.id;

    const thenable = {
        then: (callback) => {
            if (isReply) {
                return Promise.reject(new Error('Cannot wait for reply on a reply event'));
            }

            return new Promise((resolve, reject) => {
                const wrappedResolve = (payload, markId, isReply, id, reply, listenerMarkId) => {
                    try {
                        const result = callback(payload, markId, isReply, id, reply, listenerMarkId);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                };

                state._registerReplyListener(eventId, wrappedResolve);

                setTimeout(() => {
                    if (state._hasReplyListener(eventId)) {
                        state._removeReplyListener(eventId);
                        console.warn(`Timeout: No reply received for event ID ${eventId} after 10 seconds`);
                        if (onTimeout) onTimeout();
                        reject(new Error('Timeout waiting for reply'));
                    }
                }, 10000);
            });
        }
    };

    return thenable;
};

if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
    window.emitEvent = emitEvent;
}

// =======================
// 事件监听函数
// =======================
export let onEvent = (type, target, markId, acceptReply = false, onlyEmpty = false, unique = null) => {
    return {
        then: (callback) => {
            return useEventStore.getState().addListener(type, target, callback, markId, acceptReply, onlyEmpty, unique);
        }
    };
};