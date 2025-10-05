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

    return {
        listeners: {},

        addListener: (type, target, callback, listenerMarkId, acceptReply = false) => {
            const registrationStack = debugLogger
                ? new Error('Listener registered at:').stack.split('\n').slice(2).join('\n')
                : null;

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
                            registrationStack
                        }
                    ];
                }

                return { listeners: newListeners };
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
            };
        },

        _emit: (event, emitStack = null) => {
            const { listeners } = get();
            const { type, target, markId: eventMarkId = null, isReply = false, payload, id = null } = event;

            if (debugLogger) {
                if (!isReply) {
                    debugLogger.logEmit(event, emitStack);
                } else {
                    debugLogger.logReceive(event, emitStack);
                }
            }

            const targetListeners = [...(listeners[type]?.[target] || [])];

            targetListeners.forEach(listener => {
                if (!listener.active) return;

                if (listener.acceptReply !== isReply) {
                    return;
                }

                const listenerMarkId = listener.markId;
                if (eventMarkId !== null && listenerMarkId !== eventMarkId) {
                    return;
                }

                const reply = (data) => {
                    get()._emit({
                        type,
                        target,
                        payload: data,
                        markId: listenerMarkId,
                        isReply: true,
                        id: id
                    }, new Error('Reply initiated at:').stack);
                };

                Promise.resolve().then(() => {
                    if (!listener.active || (isReply && !listener.acceptReply)) return;
                    try {
                        listener.callback(payload, eventMarkId, isReply, id, reply, listenerMarkId);
                    } catch (error) {
                        console.groupCollapsed(
                            `%c[EVENT ERROR] %c${type}/${target}`,
                            'color: #cc0000; font-weight: bold',
                            'color: #666'
                        );
                        console.error(`Error in event listener:`, error);
                        console.log('Event payload:', payload);
                        console.log('Event markId:', eventMarkId);
                        console.log('Listener markId:', listenerMarkId);
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
// 发送事件函数
// =======================
export let emitEvent = ({
                            type,
                            target,
                            payload,
                            markId = null,
                            isReply = false,
                            id = null,
                            fromWebsocket = false
                        }) => {
    const emitStack = typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE
        ? new Error('Event emitted at:').stack
        : null;

    if (!id) {
        id = generateUUID();
    }

    if (type !== 'websocket' && !fromWebsocket) {  // 不是 websocket 事件不发送，是从 websocket 来的事件也不发送
        sendWebSocketMessage({
            type: type,
            target: target,
            payload: payload,
            markId: markId,
            isReply: isReply,
            id: id,
        });
    }


    useEventStore.getState()._emit({type, target, payload, markId, isReply, id}, emitStack);
};

if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
    window.emitEvent = emitEvent;
}

// =======================
// 监听事件函数（支持 markId 和 acceptReply）
// acceptReply = true 时只接受 reply = true 的消息
// =======================
export let onEvent = (type, target, markId, acceptReply=false) => {

    return {
        then: (callback) => {
            return useEventStore.getState().addListener(type, target, callback, markId, acceptReply);
        }
    };
};