import { create } from 'zustand';

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

    return {
        listeners: {},

        addListener: (type, target, callback, listenerMarkId) => {
            const registrationStack = debugLogger
                ? new Error('Listener registered at:').stack.split('\n').slice(2).join('\n')
                : null;

            set(state => {
                const newListeners = { ...state.listeners };
                if (!newListeners[type]) newListeners[type] = {};
                if (!newListeners[type][target]) newListeners[type][target] = [];

                // 避免重复注册相同 callback
                const exists = newListeners[type][target].some(l => l.callback === callback);
                if (!exists) {
                    newListeners[type][target] = [
                        ...newListeners[type][target],
                        {
                            callback,
                            active: true,
                            markId: listenerMarkId, // 保存监听器的 markId
                            registrationStack
                        }
                    ];
                }

                return { listeners: newListeners };
            });

            // 返回取消函数
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

            // 调试日志
            if (debugLogger) {
                if (!isReply) {
                    debugLogger.logEmit(event, emitStack);
                } else {
                    debugLogger.logReceive(event, emitStack);
                }
            }

            // 获取监听器快照
            const targetListeners = [...(listeners[type]?.[target] || [])];

            targetListeners.forEach(listener => {
                if (!listener.active || isReply) return;

                const listenerMarkId = listener.markId;
                // 如果 eventMarkId 为未定义则忽略匹配
                if (eventMarkId !== null  && listenerMarkId !== eventMarkId) {
                    return; // 不匹配，跳过
                }

                const reply = (data) => {
                    get()._emit({
                        type,
                        target,
                        payload: data,
                        markId: listenerMarkId,  // 监听器的 markId
                        isReply: true,
                        id: id
                    }, new Error('Reply initiated at:').stack);
                };

                Promise.resolve().then(() => {
                    if (!listener.active || isReply) return;
                    try {
                        // 传入 listener 自己的 markId 作为第5个参数（或你可调整顺序）
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
                            id = null
                        }) => {
    const emitStack = typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE
        ? new Error('Event emitted at:').stack
        : null;

    useEventStore.getState()._emit({ type, target, payload, markId, isReply, id }, emitStack);
};

if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
    window.emitEvent = emitEvent;
}

// =======================
// 监听事件函数（支持 markId）
// =======================
export let onEvent = (type, target, markId) => {
    return {
        then: (callback) => {
            // 注意：markId 可以是 undefined（表示通配），也可以是具体值
            return useEventStore.getState().addListener(type, target, callback, markId);
        }
    };
};