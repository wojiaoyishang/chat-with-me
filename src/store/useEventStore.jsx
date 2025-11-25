import {create} from 'zustand';

import {sendWebSocketMessage} from "@/context/WebSocketContext.jsx";
import {generateUUID} from '@/lib/tools.js'

const createDebugLogger = () => {
    if (typeof DEBUG_MODE === 'undefined' || !DEBUG_MODE) return null;

    return {
        logEmit: (event, stack) => {
            const {type, target, payload, markId, isReply, id} = event;

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
            const {type, target, payload, markId, isReply, id} = event;

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

        // 内部方法：注册回复监听器
        _registerReplyListener: (id, resolve) => {
            replyListeners.set(id, resolve);
        },

        // 内部方法：移除回复监听器
        _removeReplyListener: (id) => {
            replyListeners.delete(id);
        },

        addListener: (type, target, callback, listenerMarkId, acceptReply = false) => {
            const registrationStack = debugLogger
                ? new Error('Listener registered at:').stack.split('\n').slice(2).join('\n')
                : null;

            set(state => {
                const newListeners = {...state.listeners};
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
                            registrationStack
                        }
                    ];
                }

                return {listeners: newListeners};
            });

            return () => {
                set(state => {
                    const newListeners = {...state.listeners};
                    if (newListeners[type]?.[target]) {
                        newListeners[type][target] = newListeners[type][target]
                            .map(l => l.callback === callback ? {...l, active: false} : l)
                            .filter(l => l.active);

                        if (newListeners[type][target].length === 0) {
                            delete newListeners[type][target];
                            if (Object.keys(newListeners[type]).length === 0) {
                                delete newListeners[type];
                            }
                        }
                    }
                    return {listeners: newListeners};
                });
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

            const {listeners} = get();

            // 生成唯一ID（如果未提供）
            if (!id) {
                id = generateUUID();
                event.id = id;
            }

            // 非WebSocket事件且不是来自WebSocket的事件才发送
            if (type !== 'websocket' && !fromWebsocket) {
                sendWebSocketMessage({
                    ...(type && {type}),
                    ...(target && {target}),
                    payload,
                    ...(eventMarkId && {markId: eventMarkId}),
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
                    // 提供安全的reply函数（回复事件不能再回复）
                    const safeReply = () => {
                        console.warn('Cannot reply to a reply event');
                    };

                    // 调用resolve函数，传入标准参数
                    resolveFn(payload, eventMarkId, true, id, safeReply, undefined);

                    // 移除监听器（只处理一次）
                    replyListeners.delete(id);
                }
            }

            // 标准事件分发
            const targetListeners = [...(listeners[type]?.[target] || [])];
            targetListeners.forEach(listener => {
                if (!listener.active) return;
                if (listener.acceptReply !== isReply) return;
                if (listener.markId != null && eventMarkId != null && listener.markId !== eventMarkId) return;

                const reply = (data) => {
                    get()._emit({
                        payload: data,
                        isReply: true,
                        id: id,
                        ...(notReplyToWebsocket && {fromWebsocket: notReplyToWebsocket})
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
/**
 * 发射事件函数
 *
 * @param {Object} options - 事件配置对象
 * @param {string} options.type - 事件类型
 * @param {string} options.target - 事件目标
 * @param {any} options.payload - 事件载荷数据
 * @param {string|null} [options.markId=null] - 事件标记ID，用于精确匹配监听器
 * @param {boolean} [options.isReply=false] - 是否为回复事件
 * @param {string|null} [options.id=null] - 事件唯一ID（如未提供会自动生成）
 * @param {boolean} [options.fromWebsocket=false] - 是否来自WebSocket的消息
 *
 * @returns {Object} 返回一个thenable对象，支持链式调用.then()等待回复
 *
 * 使用示例：
 * // 普通事件发射
 * emitEvent({ type: 'user', target: 'login', payload: { username: 'test' } });
 *
 * // 等待回复的事件发射
 * emitEvent({ type: 'api', target: 'request', payload: { url: '/data' } })
 *   .then((replyPayload) => {
 *     console.log('收到回复:', replyPayload);
 *   });
 *
 * // 发射回复事件
 * emitEvent({
 *   type: 'api',
 *   target: 'response',
 *   payload: { data: 'result' },
 *   isReply: true,
 *   id: 'original-event-id'
 * });
 */
export let emitEvent = ({
                            type,
                            target,
                            payload,
                            markId = null,
                            isReply = false,
                            id = null,
                            fromWebsocket = false,
                            notReplyToWebsocket = false
                        }) => {
    const emitStack = typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE
        ? new Error('Event emitted at:').stack
        : null;

    // 创建事件对象
    const event = {type, target, payload, markId, isReply, id, fromWebsocket, notReplyToWebsocket};

    // 获取store状态
    const state = useEventStore.getState();

    // 发射事件（会生成ID）
    state._emit(event, emitStack);

    // 保存生成的ID（_emit会填充id）
    const eventId = event.id;

    // 创建thenable对象
    const thenable = {
        then: (callback) => {
            // 不能对回复事件使用then
            if (isReply) {
                return Promise.reject(new Error('Cannot wait for reply on a reply event'));
            }

            return new Promise((resolve, reject) => {
                // 包装resolve函数
                const wrappedResolve = (payload, markId, isReply, id, reply, listenerMarkId) => {
                    try {
                        const result = callback(payload, markId, isReply, id, reply, listenerMarkId);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                };

                // 注册回复监听器
                state._registerReplyListener(eventId, wrappedResolve);
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
/**
 * 事件监听函数 - 用于订阅特定类型的事件
 *
 * @param {string} type - 监听的事件类型
 * @param {string} target - 监听的事件目标
 * @param {string|null} markId - 监听器标记ID，用于精确匹配带有相同markId的事件
 * @param {boolean} [acceptReply=false] - 是否接受回复事件（默认只处理非回复事件）
 *
 * @returns {Object} 返回一个thenable对象，调用.then(callback)来设置事件回调函数
 *                   .then(callback) 返回取消监听的函数
 *
 * 使用示例：
 * // 监听普通事件
 * onEvent('user', 'login', null).then((payload, markId, isReply, id, reply) => {
 *   console.log('用户登录:', payload);
 * });
 *
 * // 监听带标记的事件
 * onEvent('api', 'response', 'request-123').then((payload) => {
 *   console.log('收到API响应:', payload);
 * });
 *
 * // 监听回复事件
 * onEvent('api', 'response', null, true).then((payload) => {
 *   console.log('收到回复:', payload);
 * });
 *
 * // 取消监听
 * const unsubscribe = onEvent('user', 'logout', null).then(() => { ... });
 * // 之后可以调用 unsubscribe() 来取消监听
 */
export let onEvent = (type, target, markId, acceptReply = false) => {
    return {
        then: (callback) => {
            return useEventStore.getState().addListener(type, target, callback, markId, acceptReply);
        }
    };
};