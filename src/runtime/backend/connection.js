/** A window owns one explicit backend selection. Business IDs are local to it. */
export const BACKEND_STORAGE_KEY = 'cwm:backend-profiles:v1';
export const BACKEND_CHANGE_EVENT = 'cwm:backend-change';
export const BACKEND_MANAGE_EVENT = 'cwm:backend-manage';
const DEFAULT_PROFILE = Object.freeze({ id: 'default', title: '默认后端', url: '/api' });
const listeners = new Set();
const preparations = new Set();
let epoch = 0;
let switching = false;
let manifest = null;

function browserStorage(kind = 'localStorage') {
    try { return globalThis.window?.[kind]; } catch { return null; }
}

export function normalizeBackendUrl(value) {
    const trimmed = String(value || '').trim();
    const raw = trimmed === '/' ? '/' : trimmed.replace(/\/+$/, '');
    if (!raw) throw new Error('请填写后端 API 地址。');
    const origin = globalThis.window?.location?.origin || 'http://localhost';
    const parsed = new URL(raw, origin);
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash || raw.startsWith('//'))
        throw new Error('后端地址必须是无账号、查询参数和片段的 HTTP(S) 地址。');
    if (raw.startsWith('/') && parsed.origin === origin) return parsed.pathname.replace(/\/+$/, '') || '/';
    return parsed.href.replace(/\/+$/, '');
}

export function readBackendProfiles() {
    let data;
    try { data = JSON.parse(browserStorage()?.getItem(BACKEND_STORAGE_KEY) || 'null'); } catch { /* Start with the local deployment. */ }
    const profiles = [];
    for (const item of Array.isArray(data?.profiles) ? data.profiles : []) {
        try {
            if (typeof item.id !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(item.id) || profiles.some((p) => p.id === item.id)) continue;
            profiles.push({ id: item.id, title: String(item.title || item.url).slice(0, 200), url: normalizeBackendUrl(item.url) });
        } catch { /* Ignore an invalid stored entry, never auto-connect to it. */ }
    }
    if (!profiles.some((p) => p.id === DEFAULT_PROFILE.id)) profiles.unshift({ ...DEFAULT_PROFILE });
    return { version: 1, profiles, activeId: typeof data?.activeId === 'string' && data.activeId ? data.activeId : DEFAULT_PROFILE.id };
}

let activeProfile = (() => {
    const state = readBackendProfiles();
    return Object.freeze(state.profiles.find((p) => p.id === state.activeId) || { id: 'unavailable', title: '已选择的连接配置不可用', url: '' });
})();

export const getBackendConnection = () => ({ ...activeProfile, epoch });
export const getBackendManifest = () => manifest;
export const setBackendManifest = (value) => { manifest = value; notify(); };
export const getBackendService = (name, fallback) => manifest?.services?.[name] || fallback;
export const isCurrentConnection = (scope) => scope?.id === activeProfile.id && scope?.epoch === epoch;
export const subscribeBackend = (callback) => { listeners.add(callback); return () => listeners.delete(callback); };
export const beforeBackendSwitch = (callback) => { preparations.add(callback); return () => preparations.delete(callback); };
const notify = () => listeners.forEach((callback) => callback());

function persist(state) {
    const storage = browserStorage();
    if (!storage) throw new Error('无法保存后端选择，请检查浏览器存储权限。');
    storage.setItem(BACKEND_STORAGE_KEY, JSON.stringify(state));
    notify();
}

export function saveBackendProfile(values) {
    const state = readBackendProfiles();
    const id = values?.id || globalThis.crypto?.randomUUID?.() || `backend_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = normalizeBackendUrl(values?.url);
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) throw new Error('后端标识无效。');
    if (id === activeProfile.id && url !== activeProfile.url) throw new Error('请新增目标连接并手动切换，再修改当前连接地址。');
    const item = { id, title: String(values?.title || url).trim().slice(0, 200), url };
    const index = state.profiles.findIndex((entry) => entry.id === id);
    if (index >= 0 && state.profiles[index].url !== url) throw new Error('已保存连接的地址不可修改，请新建连接并手动切换。');
    if (index < 0) state.profiles.push(item); else state.profiles[index] = item;
    persist(state);
    return item;
}

export function deleteBackendProfile(id) {
    if (id === activeProfile.id) throw new Error('请先切换后端，再删除当前连接。');
    if (id === DEFAULT_PROFILE.id) throw new Error('默认连接不能删除。');
    const state = readBackendProfiles();
    if (id === state.activeId) throw new Error('此连接仍是浏览器保存的当前后端，请先切换。');
    state.profiles = state.profiles.filter((item) => item.id !== id);
    persist(state);
}

export async function switchBackend(profileId, { reload = true } = {}) {
    if (switching) throw new Error('正在切换后端。');
    const state = readBackendProfiles();
    const next = state.profiles.find((item) => item.id === profileId);
    if (!next) throw new Error('后端连接不存在。');
    if (profileId === activeProfile.id) return getBackendConnection();
    switching = true;
    try {
        await Promise.all([...preparations].map((prepare) => prepare({ from: getBackendConnection(), to: next })));
        const waiting = [];
        globalThis.window?.dispatchEvent(new CustomEvent('cwm:backend-before-switch', { detail: { waitUntil: (promise) => waiting.push(Promise.resolve(promise)) } }));
        await Promise.all(waiting);
        state.activeId = profileId;
        persist(state);
        activeProfile = Object.freeze(next);
        manifest = null;
        epoch += 1;
        notify();
        globalThis.window?.dispatchEvent(new CustomEvent(BACKEND_CHANGE_EVENT, { detail: getBackendConnection() }));
        // Reload is an intentional connection boundary; server runs are untouched.
        if (reload && globalThis.window) window.location.assign('/chat');
        return getBackendConnection();
    } finally { switching = false; }
}

export function backendApiUrl(path = '', scope = getBackendConnection()) {
    if (!scope.url) throw new Error('选定的后端配置不可用，请手动选择连接。');
    const value = String(path || '');
    const origin = globalThis.window?.location?.origin || 'http://localhost';
    const base = new URL(`${scope.url.replace(/\/$/, '')}/`, origin);
    if (/^https?:\/\//i.test(value)) {
        const url = new URL(value);
        if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) throw new Error('请求不属于选定的后端。');
        return url.href;
    }
    if (value.startsWith('//') || /(^|\/)\.\.(\/|$)/.test(value)) throw new Error('后端路径无效。');
    const resolved = new URL(value.replace(/^\/+/, ''), base);
    if (resolved.origin !== base.origin || !resolved.pathname.startsWith(base.pathname)) throw new Error('请求不属于选定的后端。');
    return resolved.href;
}

export function backendSocketUrl(path = 'ws', scope = getBackendConnection()) {
    if (!scope.url) return '';
    path = manifest?.transports?.[path === 'ws' ? 'socket' : 'voice'] || path;
    const url = new URL(path.startsWith('/') ? path : scope.id === 'default' && scope.url === '/api'
        ? `/${String(path).replace(/^\/+/, '')}`
        : backendApiUrl(path, scope), path.startsWith('/') ? backendApiUrl('', scope) : globalThis.window?.location?.origin || 'http://localhost');
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    return url.href;
}

export const getConnectionUserId = () => browserStorage('sessionStorage')?.getItem(`cwm:backend-user:${activeProfile.id}`) || '';
export const setConnectionUserId = (userId, scope = getBackendConnection()) => browserStorage('sessionStorage')?.setItem(`cwm:backend-user:${scope.id}`, String(userId || ''));
export const backendStorageKey = (key, userId = getConnectionUserId()) => `cwm:backend:${activeProfile.id}:${encodeURIComponent(String(userId))}:${key}`;
export const backendOrigin = () => new URL(backendApiUrl()).origin;
export function getConnectionToken(scope = getBackendConnection()) {
    return browserStorage('sessionStorage')?.getItem(`cwm:backend-token:${scope.id}`) || '';
}
export function setConnectionToken(token, scope = getBackendConnection()) {
    const storage = browserStorage('sessionStorage');
    if (!storage) return;
    if (token) {
        if (storage.getItem(`cwm:backend-token:${scope.id}`) !== token) storage.removeItem(`cwm:backend-resources:${scope.id}`);
        storage.setItem(`cwm:backend-token:${scope.id}`, token);
    }
    else {
        storage.removeItem(`cwm:backend-token:${scope.id}`);
        storage.removeItem(`cwm:backend-resources:${scope.id}`);
        storage.removeItem(`cwm:backend-user:${scope.id}`);
    }
}

export function getResourceTicket(scope = getBackendConnection()) {
    return browserStorage('sessionStorage')?.getItem(`cwm:backend-resources:${scope.id}`) || '';
}
export function setResourceTicket(ticket, scope = getBackendConnection()) {
    const storage = browserStorage('sessionStorage');
    if (ticket) storage?.setItem(`cwm:backend-resources:${scope.id}`, ticket);
    else storage?.removeItem(`cwm:backend-resources:${scope.id}`);
}
export function authorizedResourceUrl(value, scope = getBackendConnection()) {
    if (!value || !getResourceTicket(scope)) return value;
    try {
        const url = new URL(value, globalThis.window?.location?.origin || 'http://localhost');
        const base = new URL(backendApiUrl('', scope));
        if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return value;
        const path = '/' + url.pathname.slice(base.pathname.length).replace(/^\/+/, '');
        if (!/^\/(upload\/(?:preview\/)?[A-Za-z0-9._-]+|document\/preview\/[A-Za-z0-9._-]+|document\/[A-Za-z0-9._-]+\/(assets\/.+|files\/download|revisions\/[0-9a-f]{40}\/content)|knowledge\/images\/[A-Za-z0-9._/-]+)$/.test(path)) return value;
        url.searchParams.set('client_ticket', getResourceTicket(scope));
        return url.href;
    } catch { return value; }
}

export function requestBackendManager() {
    globalThis.window?.dispatchEvent(new CustomEvent(BACKEND_MANAGE_EVENT));
}
