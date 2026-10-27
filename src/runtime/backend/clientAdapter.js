import {
    BACKEND_MANAGE_EVENT, deleteBackendProfile, getBackendConnection,
    readBackendProfiles, saveBackendProfile, subscribeBackend, switchBackend, backendStorageKey,
    isCurrentConnection, setConnectionToken,
} from './connection.js';
import { getLocalSetting, setLocalSetting } from '../../lib/tools.jsx';

const LOCAL_EVENT = 'chat-local-setting-change';
function storageKey(key, options) {
    if (typeof key !== 'string' || !key || key.length > 200 || ['__proto__', 'prototype', 'constructor'].includes(key))
        throw new Error('客户端设置键无效。');
    const scope = options?.scope || 'device';
    if (scope === 'backend-user') return backendStorageKey(key);
    if (scope === 'backend') return backendStorageKey(key, 'shared');
    // Backend descriptions may name device preferences, never connection-owned
    // storage. A scoped preference is always wrapped with the current identity.
    if (scope !== 'device' || !/^[A-Za-z][A-Za-z0-9._-]*$/.test(key))
        throw new Error('此设置不能访问客户端保留的存储空间。');
    return key;
}
export const clientAdapter = {
    read: async (key, options) => key === 'backends' ? {
        items: readBackendProfiles().profiles.map((profile) => ({ ...profile, active: profile.id === getBackendConnection().id })),
    } : getLocalSetting(storageKey(key, options), undefined),
    write: async (key, value, options) => { setLocalSetting(storageKey(key, options), value); return value; },
    invoke: async (name, payload = {}) => {
        if (name === 'backend.save') return saveBackendProfile(payload);
        if (name === 'backend.delete') return deleteBackendProfile(payload.profileId);
        if (name === 'backend.switch') return switchBackend(payload.profileId);
        if (name === 'backend.manage') { window.dispatchEvent(new CustomEvent(BACKEND_MANAGE_EVENT)); return {}; }
        if (name === 'client.local-settings') { setLocalSetting(storageKey(payload.key, payload), payload.value); return payload.value; }
        if (name === 'auth.logout') {
            const scope = getBackendConnection();
            const { default: api } = await import('../../lib/apiClient.js');
            if (!isCurrentConnection(scope)) throw new Error('后端连接已切换。');
            await api.get('/user/logout');
            if (!isCurrentConnection(scope)) throw new Error('后端连接已切换。');
            setConnectionToken('', scope);
            window.location.assign('/login');
            return {};
        }
        if (name === 'notification.permission') {
            const module = await import('../../features/notification/systemNotifications.js');
            if (payload.enabled === false) module.setSystemNotificationsEnabled(false);
            else await module.requestSystemNotificationPermission();
            return module.systemNotificationState();
        }
        throw new Error(`客户端不支持此操作：${name}`);
    },
    subscribe: (callback) => {
        const off = subscribeBackend(callback);
        window.addEventListener(LOCAL_EVENT, callback);
        window.addEventListener('storage', callback);
        return () => { off(); window.removeEventListener(LOCAL_EVENT, callback); window.removeEventListener('storage', callback); };
    },
};
export default clientAdapter;
