import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {onEvent} from '@/context/useEventStore.jsx';
import {useIsMobile} from '@/lib/tools.jsx';
import NotificationToast from './NotificationToast.jsx';
import {getNotificationRenderer, registerNotificationRenderer} from './notificationRegistry.js';
import {useNotificationStore} from './useNotificationStore.js';

registerNotificationRenderer('tool.approval.required', NotificationToast);

const toastIdFor = (notificationId, mobile) => (
    `notification:${notificationId}:${mobile ? 'mobile' : 'desktop'}`
);

const toastIdsFor = (notificationId) => [
    toastIdFor(notificationId, false),
    toastIdFor(notificationId, true),
];

const notificationTimestamp = (notification) => Number(
    notification?.updatedAtTimestamp
    || notification?.createdAtTimestamp
    || (notification?.updatedAt ? Date.parse(notification.updatedAt) / 1000 : 0)
    || (notification?.createdAt ? Date.parse(notification.createdAt) / 1000 : 0)
    || 0
);

const NotificationHost = ({
    currentMarkId,
    isConversationVisible = true,
    onOpenConversation,
}) => {
    const types = useNotificationStore((state) => state.types);
    const notificationsMap = useNotificationStore((state) => state.notifications);
    const subscriptions = useNotificationStore((state) => state.subscriptions);
    const setTypes = useNotificationStore((state) => state.setTypes);
    const replaceNotifications = useNotificationStore((state) => state.replaceNotifications);
    const mergeNotifications = useNotificationStore((state) => state.mergeNotifications);
    const upsertNotification = useNotificationStore((state) => state.upsertNotification);
    const resolveNotification = useNotificationStore((state) => state.resolveNotification);
    const removeNotification = useNotificationStore((state) => state.removeNotification);
    const reloadSubscriptions = useNotificationStore((state) => state.reloadSubscriptions);
    const isMobile = useIsMobile();
    const [visibilityState, setVisibilityState] = useState(() => document.visibilityState);

    const shownRef = useRef(new Map());
    const hiddenRevisionRef = useRef(new Map());
    const backgroundRevisionRef = useRef(new Map());
    const hiddenSinceRef = useRef(document.hidden ? Date.now() / 1000 : null);
    const hiddenBaselineRef = useRef(new Map());
    const baseTitleRef = useRef(document.title.replace(/^\(\d+\)\s*/, ''));
    const syncPromiseRef = useRef(null);

    const notifications = useMemo(() => Object.values(notificationsMap), [notificationsMap]);

    const isToastEnabled = useCallback((notification) => {
        const explicit = subscriptions[notification.typeId]?.toast;
        if (typeof explicit === 'boolean') return explicit;
        const spec = types.find((item) => item.typeId === notification.typeId);
        return spec?.defaultSubscribed !== false;
    }, [subscriptions, types]);

    const hideToast = useCallback((notificationId) => {
        toastIdsFor(notificationId).forEach((toastId) => toast.dismiss(toastId));
        shownRef.current.delete(notificationId);
    }, []);

    const dismissToast = useCallback((notificationId, revision = null) => {
        hideToast(notificationId);
        backgroundRevisionRef.current.delete(notificationId);
        if (revision !== null) hiddenRevisionRef.current.set(notificationId, Number(revision || 0));
    }, [hideToast]);

    const rememberBackgroundNotifications = useCallback((items, since = null, baseline = null) => {
        for (const notification of items || []) {
            if (!notification?.id) continue;
            const arrivedWhileHidden = document.visibilityState !== 'visible';
            const changedSinceHidden = since !== null && notificationTimestamp(notification) >= Number(since || 0);
            const baselineRevision = Number(baseline?.get(notification.id) || 0);
            const changedSinceBaseline = baseline instanceof Map
                && Number(notification.revision || 0) > baselineRevision;
            if (arrivedWhileHidden || changedSinceHidden || changedSinceBaseline) {
                backgroundRevisionRef.current.set(
                    notification.id,
                    Number(notification.revision || 0),
                );
            }
        }
    }, []);

    const syncPendingNotifications = useCallback(({
        backgroundSince = null,
        backgroundBaseline = null,
    } = {}) => {
        if (syncPromiseRef.current) {
            return syncPromiseRef.current.then((items) => {
                rememberBackgroundNotifications(items, backgroundSince, backgroundBaseline);
                return items;
            });
        }
        const promise = apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT)
            .then((response) => {
                const items = response?.notifications || [];
                rememberBackgroundNotifications(items, backgroundSince, backgroundBaseline);
                // Initial/reconnect HTTP snapshots can race with a newer websocket upsert.
                // Merge here; authoritative Notification-Sync broadcasts still replace.
                mergeNotifications(items);
                return items;
            })
            .finally(() => {
                if (syncPromiseRef.current === promise) syncPromiseRef.current = null;
            });
        syncPromiseRef.current = promise;
        return promise;
    }, [mergeNotifications, rememberBackgroundNotifications]);

    const openNotification = useCallback((notification) => {
        const action = (notification.actions || []).find((item) => item.type === 'open-conversation');
        const markId = action?.markId || notification.source?.markId;
        if (markId) onOpenConversation?.(markId, notification);
        dismissToast(notification.id, notification.revision);
    }, [dismissToast, onOpenConversation]);

    useEffect(() => {
        let active = true;
        Promise.all([
            apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT),
            apiClient.get(apiEndpoint.NOTIFICATION_PENDING_ENDPOINT),
        ]).then(([typeResponse, pendingResponse]) => {
            if (!active) return;
            setTypes(typeResponse?.types || []);
            const pending = pendingResponse?.notifications || [];
            rememberBackgroundNotifications(
                pending,
                document.hidden ? hiddenSinceRef.current : null,
            );
            // Do not clear an upsert that arrived after the HTTP snapshot was taken.
            mergeNotifications(pending);
        }).catch((error) => {
            console.warn('Failed to initialize notifications:', error);
        });
        return () => { active = false; };
    }, [mergeNotifications, rememberBackgroundNotifications, setTypes]);

    useEffect(() => {
        const unsubscribe = onEvent({type: 'widget', target: 'NotificationCenter'}).then(({payload}) => {
            switch (payload?.command) {
                case 'Notification-Upsert':
                    rememberBackgroundNotifications([payload.notification], hiddenSinceRef.current);
                    upsertNotification(payload.notification);
                    break;
                case 'Notification-Resolve':
                    hiddenRevisionRef.current.delete(payload.notificationId);
                    backgroundRevisionRef.current.delete(payload.notificationId);
                    hideToast(payload.notificationId);
                    resolveNotification(payload.notificationId, payload.revision);
                    break;
                case 'Notification-Remove':
                    hiddenRevisionRef.current.delete(payload.notificationId);
                    backgroundRevisionRef.current.delete(payload.notificationId);
                    hideToast(payload.notificationId);
                    removeNotification(payload.notificationId, payload.revision);
                    break;
                case 'Notification-Sync': {
                    const items = payload.notifications || [];
                    rememberBackgroundNotifications(items, hiddenSinceRef.current);
                    replaceNotifications(items);
                    break;
                }
                default:
                    break;
            }
        });
        return () => unsubscribe();
    }, [
        hideToast,
        rememberBackgroundNotifications,
        removeNotification,
        replaceNotifications,
        resolveNotification,
        upsertNotification,
    ]);

    useEffect(() => {
        const unsubscribe = onEvent({type: 'websocket', target: 'onopen'}).then(() => {
            syncPendingNotifications({backgroundSince: hiddenSinceRef.current}).catch((error) => {
                console.warn('Failed to reconcile notifications after websocket reconnect:', error);
            });
        });
        return () => unsubscribe();
    }, [syncPendingNotifications]);

    useEffect(() => {
        const handleChange = () => reloadSubscriptions();
        window.addEventListener('notification-subscriptions-changed', handleChange);
        window.addEventListener('storage', handleChange);
        return () => {
            window.removeEventListener('notification-subscriptions-changed', handleChange);
            window.removeEventListener('storage', handleChange);
        };
    }, [reloadSubscriptions]);

    useEffect(() => {
        const handleVisibility = () => {
            const nextState = document.visibilityState;
            setVisibilityState(nextState);
            if (nextState !== 'visible') {
                hiddenSinceRef.current = Date.now() / 1000;
                hiddenBaselineRef.current = new Map(
                    Object.values(useNotificationStore.getState().notifications)
                        .filter((item) => item?.id)
                        .map((item) => [item.id, Number(item.revision || 0)]),
                );
                return;
            }

            const backgroundSince = hiddenSinceRef.current;
            const backgroundBaseline = hiddenBaselineRef.current;
            hiddenSinceRef.current = null;
            hiddenBaselineRef.current = new Map();
            reloadSubscriptions();
            syncPendingNotifications({backgroundSince, backgroundBaseline}).catch((error) => {
                console.warn('Failed to reconcile notifications after returning to foreground:', error);
            });
        };
        const handleFocus = () => {
            if (document.visibilityState !== 'visible') return;
            syncPendingNotifications().catch((error) => {
                console.warn('Failed to reconcile notifications on focus:', error);
            });
        };
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('focus', handleFocus);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('focus', handleFocus);
        };
    }, [reloadSubscriptions, syncPendingNotifications]);

    useEffect(() => {
        const liveIds = new Set(notifications.map((item) => item.id));
        for (const shownId of [...shownRef.current.keys()]) {
            if (!liveIds.has(shownId)) hideToast(shownId);
        }

        for (const notification of notifications) {
            const revision = Number(notification.revision || 0);
            const hiddenRevision = hiddenRevisionRef.current.get(notification.id);
            if (hiddenRevision !== undefined && hiddenRevision >= revision) {
                hideToast(notification.id);
                continue;
            }

            const backgroundRevision = Number(backgroundRevisionRef.current.get(notification.id) || 0);
            const needsBackgroundAttention = backgroundRevision >= revision;
            const sourceMarkId = notification.source?.markId;
            const isCurrentVisibleConversation = (
                isConversationVisible
                && sourceMarkId
                && sourceMarkId === currentMarkId
                && visibilityState === 'visible'
                && !needsBackgroundAttention
            );
            if (!isToastEnabled(notification) || isCurrentVisibleConversation) {
                hideToast(notification.id);
                continue;
            }

            const mobile = Boolean(isMobile);
            const mode = mobile ? 'mobile' : 'desktop';
            const previousMode = shownRef.current.get(notification.id);
            if (previousMode && previousMode !== mode) hideToast(notification.id);

            const Renderer = getNotificationRenderer(notification.typeId) || NotificationToast;
            shownRef.current.set(notification.id, mode);
            toast.custom(() => (
                <Renderer
                    notification={notification}
                    mobile={mobile}
                    onOpen={() => openNotification(notification)}
                    onDismiss={() => dismissToast(notification.id, notification.revision)}
                />
            ), {
                id: toastIdFor(notification.id, mobile),
                duration: Infinity,
                toasterId: mobile ? 'notifications-mobile' : 'notifications-desktop',
                position: mobile ? 'top-center' : 'bottom-right',
            });
        }
    }, [
        currentMarkId,
        dismissToast,
        hideToast,
        isConversationVisible,
        isMobile,
        isToastEnabled,
        notifications,
        openNotification,
        subscriptions,
        visibilityState,
    ]);

    useEffect(() => {
        const baseTitle = baseTitleRef.current;
        const attentionCount = notifications.filter(isToastEnabled).length;
        if (visibilityState !== 'visible' && attentionCount > 0) {
            document.title = `(${attentionCount}) ${baseTitle}`;
        } else {
            document.title = baseTitle;
        }

        try {
            if (attentionCount > 0 && typeof navigator.setAppBadge === 'function') {
                Promise.resolve(navigator.setAppBadge(attentionCount)).catch(() => {});
            } else if (typeof navigator.clearAppBadge === 'function') {
                Promise.resolve(navigator.clearAppBadge()).catch(() => {});
            }
        } catch (error) {
            console.debug('App badge is unavailable:', error);
        }

        return () => {
            if (visibilityState === 'visible') document.title = baseTitle;
        };
    }, [isToastEnabled, notifications, visibilityState]);

    useEffect(() => () => {
        document.title = baseTitleRef.current;
        if (typeof navigator.clearAppBadge === 'function') {
            Promise.resolve(navigator.clearAppBadge()).catch(() => {});
        }
    }, []);

    return null;
};

export default NotificationHost;
