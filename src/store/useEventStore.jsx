import {create} from 'zustand';

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

        addListener: (type, target, callback) => {
            const registrationStack = debugLogger
                ? new Error('Listener registered at:').stack.split('\n').slice(2).join('\n')
                : null;

            set(state => {
                const newListeners = {...state.listeners};
                if (!newListeners[type]) newListeners[type] = {};
                if (!newListeners[type][target]) newListeners[type][target] = [];

                if (!newListeners[type][target].some(l => l.callback === callback)) {
                    newListeners[type][target] = [
                        ...newListeners[type][target],
                        {
                            callback,
                            active: true,
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
            const {listeners} = get();
            const {type, target, markId = null, isReply = false, payload, id = null} = event;

            // 调试日志 - 只记录非回复事件的发送
            if (debugLogger) {
                if (!isReply) {
                    debugLogger.logEmit(event, emitStack);
                } else {
                    debugLogger.logReceive(event, emitStack);
                }
            }

            // 获取匹配的监听器（复制快照）
            const targetListeners = [...(listeners[type]?.[target] || [])];

            // 处理每个监听器
            targetListeners.forEach(listener => {
                if (!listener.active || isReply) return;

                const reply = (data) => {
                    get()._emit({
                        type,
                        target,
                        payload: data,
                        markId,
                        isReply: true,
                        id: id
                    }, new Error('Reply initiated at:').stack);
                };

                // 异步处理确保消息不被覆盖
                Promise.resolve().then(() => {
                    if (!listener.active || isReply) return;
                    try {
                        listener.callback(payload, markId, isReply, id, reply);
                    } catch (error) {
                        console.groupCollapsed(
                            `%c[EVENT ERROR] %c${type}/${target}`,
                            'color: #cc0000; font-weight: bold',
                            'color: #666'
                        );
                        console.error(`Error in event listener:`, error);
                        console.log('Event payload:', payload);
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

    useEventStore.getState()._emit({type, target, payload, markId, isReply, id}, emitStack);
};

// 开发环境挂载到 window
if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
    window.emitEvent = emitEvent;
}

// =======================
// 监听事件函数
// =======================
export let onEvent = (type, target) => {
    return {
        then: (callback) => {
            return useEventStore.getState().addListener(type, target, callback);
        }
    };
};