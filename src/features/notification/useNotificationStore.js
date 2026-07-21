import {create} from 'zustand';
import {getLocalSetting, setLocalSetting} from '@/lib/tools.jsx';

export const NOTIFICATION_SUBSCRIPTIONS_KEY = 'notificationSubscriptionsV1';

const readSubscriptions = () => {
    const value = getLocalSetting(NOTIFICATION_SUBSCRIPTIONS_KEY, {});
    return value && typeof value === 'object' ? value : {};
};

const normalizeNotification = (notification) => ({
    ...(notification || {}),
    revision: Number(notification?.revision || 0),
});

export const useNotificationStore = create((set, get) => ({
    types: [],
    notifications: {},
    resolvedRevisions: {},
    subscriptions: readSubscriptions(),

    setTypes: (types) => set({types: Array.isArray(types) ? types : []}),

    replaceNotifications: (notifications) => set((state) => {
        const next = {};
        for (const notification of notifications || []) {
            if (!notification?.id || notification?.status === 'resolved') continue;
            const incoming = normalizeNotification(notification);
            const resolvedRevision = Number(state.resolvedRevisions[incoming.id] || 0);
            if (resolvedRevision >= incoming.revision) continue;
            next[incoming.id] = incoming;
        }
        return {notifications: next};
    }),

    mergeNotifications: (notifications) => set((state) => {
        const next = {...state.notifications};
        for (const notification of notifications || []) {
            if (!notification?.id || notification?.status === 'resolved') continue;
            const incoming = normalizeNotification(notification);
            const resolvedRevision = Number(state.resolvedRevisions[incoming.id] || 0);
            const currentRevision = Number(next[incoming.id]?.revision || 0);
            if (resolvedRevision >= incoming.revision || currentRevision > incoming.revision) continue;
            next[incoming.id] = incoming;
        }
        return {notifications: next};
    }),

    upsertNotification: (notification) => set((state) => {
        if (!notification?.id) return state;
        const current = state.notifications[notification.id];
        const incoming = normalizeNotification(notification);
        const resolvedRevision = Number(state.resolvedRevisions[incoming.id] || 0);
        if (resolvedRevision >= incoming.revision) return state;
        if (current && Number(current.revision || 0) > incoming.revision) return state;
        return {notifications: {...state.notifications, [notification.id]: incoming}};
    }),

    resolveNotification: (notificationId, revision = 0) => set((state) => {
        const incomingRevision = Number(revision || 0);
        const current = state.notifications[notificationId];
        const currentRevision = Number(current?.revision || 0);
        if (currentRevision > incomingRevision) return state;
        const next = {...state.notifications};
        delete next[notificationId];
        return {
            notifications: next,
            resolvedRevisions: {
                ...state.resolvedRevisions,
                [notificationId]: Math.max(
                    incomingRevision,
                    Number(state.resolvedRevisions[notificationId] || 0),
                ),
            },
        };
    }),

    removeNotification: (notificationId, revision = 0) => set((state) => {
        const next = {...state.notifications};
        delete next[notificationId];
        return {
            notifications: next,
            resolvedRevisions: {
                ...state.resolvedRevisions,
                [notificationId]: Math.max(
                    Number(revision || 0),
                    Number(state.resolvedRevisions[notificationId] || 0),
                ),
            },
        };
    }),

    setSubscription: (typeId, patch) => set((state) => {
        const subscriptions = {
            ...state.subscriptions,
            [typeId]: {
                ...(state.subscriptions[typeId] || {}),
                ...(patch || {}),
            },
        };
        setLocalSetting(NOTIFICATION_SUBSCRIPTIONS_KEY, subscriptions);
        window.dispatchEvent(new CustomEvent('notification-subscriptions-changed', {detail: subscriptions}));
        return {subscriptions};
    }),

    reloadSubscriptions: () => set({subscriptions: readSubscriptions()}),

    isToastEnabled: (typeId) => {
        const state = get();
        const explicit = state.subscriptions[typeId]?.toast;
        if (typeof explicit === 'boolean') return explicit;
        const spec = state.types.find((item) => item.typeId === typeId);
        return spec?.defaultSubscribed !== false;
    },
}));
