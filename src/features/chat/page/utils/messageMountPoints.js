// 给消息对象安全注入组件挂载点能力。
// mountPoints 使用闭包存储，避免把不可序列化对象直接塞进消息数据结构。
export const ensureMessageMountPoints = (msg) => {
    if (!msg || typeof msg !== 'object') return msg;
    if (typeof msg.registerComponent === 'function') return msg;

    const mountPoints = {};

    msg.registerComponent = (componentKey, componentRef) => {
        mountPoints[componentKey] = componentRef;
    };

    msg.unregisterComponent = (componentKey) => {
        delete mountPoints[componentKey];
    };

    msg.getComponent = (componentKey) => {
        return mountPoints[componentKey];
    };

    return msg;
};
