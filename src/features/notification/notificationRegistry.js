const notificationRenderers = new Map();
const notificationActions = new Map();

export const registerNotificationRenderer = (typeId, renderer) => {
    if (!typeId || typeof renderer !== 'function') return () => {};
    notificationRenderers.set(typeId, renderer);
    return () => {
        if (notificationRenderers.get(typeId) === renderer) notificationRenderers.delete(typeId);
    };
};

export const getNotificationRenderer = (typeId) => notificationRenderers.get(typeId) || null;

export const registerNotificationAction = (type, handler) => {
    if (!type || typeof handler !== 'function') return () => {};
    notificationActions.set(type, handler);
    return () => {
        if (notificationActions.get(type) === handler) notificationActions.delete(type);
    };
};

export const runNotificationAction = async (action, context) => {
    const handler = notificationActions.get(action?.type);
    if (!handler) return false;
    await handler(action, context);
    return true;
};
