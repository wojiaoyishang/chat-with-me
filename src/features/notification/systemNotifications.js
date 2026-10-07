import { toast } from 'sonner';
import { getLocalSetting, setLocalSetting } from '@/lib/tools.jsx';

export const SYSTEM_NOTIFICATION_ENABLED = 'systemNotificationsEnabled';
const ATTEMPTED = 'notificationPermissionAttempted';
const DENIED_NOTICE = 'notificationPermissionDeniedNoticeShown';
const DELIVERED = 'widgetSystemNotificationRevisions';
const PRESENCE = 'widgetNotificationTabPresence:';
export const notificationTabId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
let permissionRequest;

const permission = () => (typeof Notification === 'undefined' ? 'unsupported' : Notification.permission);
export const systemNotificationState = () => ({
    permission: permission(),
    enabled: getLocalSetting(SYSTEM_NOTIFICATION_ENABLED, true) !== false,
});
export const setSystemNotificationsEnabled = (enabled) => {
    setLocalSetting(SYSTEM_NOTIFICATION_ENABLED, Boolean(enabled));
    window.dispatchEvent(new Event('system-notification-settings-changed'));
};
export const requestSystemNotificationPermission = async ({ automatic = false } = {}) => {
    if (permissionRequest) return permissionRequest;
    permissionRequest = (async () => {
        if (permission() === 'unsupported') return 'unsupported';
        if (permission() === 'default' && (!automatic || !getLocalSetting(ATTEMPTED, false))) {
            setLocalSetting(ATTEMPTED, true);
            try {
                await Notification.requestPermission();
            } catch {
                /* Settings provide a user-gesture retry. */
            }
        }
        const result = permission();
        if (result === 'denied' && !getLocalSetting(DENIED_NOTICE, false)) {
            setLocalSetting(DENIED_NOTICE, true);
            toast.warning('浏览器通知权限已被拒绝，可在设置的通知页面重新启用。', {
                position: 'bottom-right',
                toasterId: 'notifications-desktop',
            });
        }
        if (!automatic && result === 'denied') toast.info('请在浏览器地址栏的网站设置中允许通知，再点击启用。');
        if (!automatic && result === 'granted') setSystemNotificationsEnabled(true);
        window.dispatchEvent(new Event('system-notification-settings-changed'));
        return result;
    })().finally(() => {
        permissionRequest = null;
    });
    return permissionRequest;
};

export const isNotificationConversationOpen = (conversationId) => {
    if (!conversationId) return false;
    return Array.from(document.querySelectorAll('[data-notification-conversation-id]')).some((element) => {
        const rect = element.getBoundingClientRect();
        return (
            element.dataset.notificationConversationId === conversationId &&
            rect.width > 0 &&
            rect.height > 0 &&
            !element.closest('[inert]') &&
            getComputedStyle(element).visibility !== 'hidden'
        );
    });
};

export const updateNotificationPresence = (state) => {
    try {
        localStorage.setItem(PRESENCE + notificationTabId, JSON.stringify({ ...state, updatedAt: Date.now() }));
    } catch {
        /* Storage may be unavailable. */
    }
};
export const removeNotificationPresence = () => {
    try {
        localStorage.removeItem(PRESENCE + notificationTabId);
    } catch {
        /* The closed tab will age out if storage is unavailable. */
    }
};
export const hasForegroundNotificationTab = () => {
    try {
        return Object.keys(localStorage)
            .filter((key) => key.startsWith(PRESENCE))
            .some((key) => {
                try {
                    const value = JSON.parse(localStorage.getItem(key));
                    return Date.now() - value.updatedAt < 6000 && value.visible && value.focused;
                } catch {
                    return false;
                }
            });
    } catch {
        return false;
    }
};

export const showWidgetSystemNotification = async (notification, onOpen) => {
    if (hasForegroundNotificationTab()) return false;
    const state = systemNotificationState();
    if (!state.enabled || state.permission !== 'granted') return false;
    const present = async () => {
        const delivered = getLocalSetting(DELIVERED, {});
        if (Number(delivered[notification.id] || 0) >= Number(notification.revision || 0)) return true;
        if (hasForegroundNotificationTab()) return false;
        try {
            const target = new URL(
                `${import.meta.env.BASE_URL}chat/${encodeURIComponent(notification.source?.conversationId || '')}`,
                location.origin,
            );
            if (notification.source?.messageId) target.searchParams.set('focusMessage', notification.source.messageId);
            const options = {
                body: notification.body,
                tag: `widget:${notification.id}`,
                data: { ...notification.source, url: target.href },
            };
            let serviceWorkerShown = false;
            if ('serviceWorker' in navigator && window.isSecureContext) {
                try {
                    const registration = await navigator.serviceWorker.register(
                        `${import.meta.env.BASE_URL}system-notification-worker.js`,
                    );
                    await Promise.race([
                        navigator.serviceWorker.ready,
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Notification worker timeout')), 5000),
                        ),
                    ]);
                    if (hasForegroundNotificationTab()) return false;
                    await registration.showNotification(notification.title, options);
                    serviceWorkerShown = true;
                } catch {
                    /* Desktop Notification is the fallback. */
                }
            }
            if (!serviceWorkerShown) {
                const native = new Notification(notification.title, {
                    body: notification.body,
                    tag: `widget:${notification.id}`,
                    data: notification.source,
                });
                native.onclick = () => {
                    window.focus();
                    onOpen(notification);
                    native.close();
                };
            }
            const entries = Object.entries({ ...delivered, [notification.id]: notification.revision }).slice(-300);
            setLocalSetting(DELIVERED, Object.fromEntries(entries));
            return true;
        } catch {
            return false;
        }
    };
    if (navigator.locks?.request) return navigator.locks.request(`widget-notification:${notification.id}`, present);
    return present();
};
