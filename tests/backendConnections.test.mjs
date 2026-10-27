import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, 'temp'), { recursive: true });
const entry = path.join(root, 'temp', 'backend-connections-test.mjs');
await build({ stdin: { contents: `export { default as api } from './src/lib/apiClient.js'; export * from './src/runtime/backend/connection.js'; export * as channel from './src/runtime/transport/channel.js';`, resolveDir: root }, outfile: entry, bundle: true, platform: 'node', format: 'esm', packages: 'external', alias: { '@': path.join(root, 'src') } });
class Storage {
    constructor() { this.values = new Map(); }
    getItem(key) { return this.values.get(key) ?? null; }
    setItem(key, value) { this.values.set(key, String(value)); }
    removeItem(key) { this.values.delete(key); }
}
const localStorage = new Storage(), sessionStorage = new Storage(), navigations = [];
const browser = new EventTarget();
browser.localStorage = localStorage;
browser.sessionStorage = sessionStorage;
browser.location = { origin: 'https://client.example', pathname: '/chat', search: '', hash: '', assign: (url) => navigations.push(url), replace: (url) => navigations.push(url) };
globalThis.window = browser;
Object.defineProperty(globalThis, 'navigator', { value: { language: 'zh-CN' }, configurable: true });
const runtime = await import(pathToFileURL(entry).href);

test('selected backend is persisted and remains unchanged until an explicit switch', async () => {
    assert.equal(runtime.getBackendConnection().id, 'default');
    runtime.saveBackendProfile({ id: 'a', title: '后端 A', url: 'https://a.example/api/' });
    runtime.saveBackendProfile({ id: 'b', title: '后端 B', url: 'https://b.example' });
    assert.equal(runtime.getBackendConnection().id, 'default');
    await runtime.switchBackend('a', { reload: false });
    assert.equal(JSON.parse(localStorage.getItem(runtime.BACKEND_STORAGE_KEY)).activeId, 'a');
    assert.equal(runtime.readBackendProfiles().activeId, 'a');
    assert.equal(runtime.getBackendConnection().url, 'https://a.example/api');
    assert.throws(() => runtime.saveBackendProfile({ id: 'a', title: 'replacement', url: 'https://evil.example' }), /新建|不可修改|新增/);
    assert.throws(() => runtime.deleteBackendProfile('a'), /切换/);
});

test('tokens, resources and identical business IDs are isolated by backend and user', async () => {
    runtime.setConnectionToken('token-a'); runtime.setConnectionUserId('7'); runtime.setResourceTicket('resource-a');
    const aKey = runtime.backendStorageKey('document:same-id');
    const image = runtime.authorizedResourceUrl('https://a.example/api/upload/image-1');
    assert.match(image, /client_ticket=resource-a/);
    await runtime.switchBackend('b', { reload: false });
    assert.equal(runtime.getConnectionToken(), '');
    runtime.setConnectionUserId('7');
    assert.notEqual(runtime.backendStorageKey('document:same-id'), aKey);
    assert.equal(runtime.authorizedResourceUrl('https://a.example/api/upload/image-1'), 'https://a.example/api/upload/image-1');
    assert.equal(sessionStorage.getItem('cwm:backend-token:a'), 'token-a');
    assert.equal(localStorage.getItem(runtime.BACKEND_STORAGE_KEY).includes('token-a'), false);
});

test('renaming the selected connection notifies its title without switching or resetting credentials', () => {
    const previousToken = runtime.getConnectionToken(), previousResource = runtime.getResourceTicket(), previousUser = runtime.getConnectionUserId();
    runtime.setConnectionToken('rename-session-token'); runtime.setResourceTicket('rename-resource-ticket');
    const before = runtime.getBackendConnection();
    const token = runtime.getConnectionToken();
    const resource = runtime.getResourceTicket();
    const manifest = runtime.getBackendManifest();
    const notices = [];
    let switches = 0;
    const off = runtime.subscribeBackend(() => notices.push(runtime.getBackendConnection()));
    const switched = () => { switches += 1; };
    window.addEventListener(runtime.BACKEND_CHANGE_EVENT, switched);
    try {
        runtime.saveBackendProfile({ id: before.id, title: '重新命名的当前连接', url: before.url });
        assert.deepEqual(runtime.getBackendConnection(), { ...before, title: '重新命名的当前连接' });
        assert.equal(notices.length, 1);
        assert.equal(notices[0].title, '重新命名的当前连接');
        assert.equal(runtime.getConnectionToken(), token);
        assert.equal(runtime.getResourceTicket(), resource);
        assert.equal(runtime.getBackendManifest(), manifest);
        assert.equal(switches, 0);
        assert.equal(JSON.parse(localStorage.getItem(runtime.BACKEND_STORAGE_KEY)).activeId, before.id);
    } finally {
        off(); window.removeEventListener(runtime.BACKEND_CHANGE_EVENT, switched);
        runtime.saveBackendProfile(before);
        runtime.setConnectionToken(previousToken); runtime.setResourceTicket(previousResource); runtime.setConnectionUserId(previousUser);
    }
});

test('service origins, URL prefixes and socket paths come from the selected connection', async () => {
    await runtime.switchBackend('a', { reload: false });
    runtime.setBackendManifest({ transports: { socket: '/ws', voice: '/ws/realtime' } });
    assert.equal(runtime.backendApiUrl('/user/info'), 'https://a.example/api/user/info');
    assert.equal(runtime.backendSocketUrl('ws'), 'wss://a.example/ws');
    assert.equal(runtime.backendSocketUrl('ws/realtime'), 'wss://a.example/ws/realtime');
    assert.throws(() => runtime.backendApiUrl('https://b.example/user/info'), /选定/);
    assert.throws(() => runtime.backendApiUrl('/%2e%2e/user/info'), /选定/);
    assert.throws(() => runtime.normalizeBackendUrl('https://user:password@a.example'), /HTTP/);
    assert.equal(runtime.normalizeBackendUrl('/'), '/');
});

test('a missing saved selection is retained for recovery instead of silently choosing the default', () => {
    const previous = localStorage.getItem(runtime.BACKEND_STORAGE_KEY);
    const state = JSON.parse(previous);
    state.activeId = 'missing-backend';
    localStorage.setItem(runtime.BACKEND_STORAGE_KEY, JSON.stringify(state));
    assert.equal(runtime.readBackendProfiles().activeId, 'missing-backend');
    localStorage.setItem(runtime.BACKEND_STORAGE_KEY, previous);
});

test('ordinary HTTP requests carry only the active backend credentials', async () => {
    runtime.api.defaults.adapter = async (config) => ({ status: 200, statusText: 'OK', headers: {}, config, data: { success: true, data: { url: config.url, auth: config.headers.Authorization, cookie: config.withCredentials } } });
    const response = await runtime.api.get('/user/info');
    assert.equal(response.url, 'https://a.example/api/user/info');
    assert.equal(response.auth, 'Bearer token-a');
    assert.equal(response.cookie, false);
});

test('an old in-flight response cannot redirect or overwrite the newly selected backend', async () => {
    let finish;
    runtime.api.defaults.adapter = (config) => new Promise((resolve) => { finish = () => resolve({ status: 200, headers: {}, config, data: { success: false, code: 401, msg: 'expired' } }); });
    const request = runtime.api.get('/user/info');
    await new Promise((resolve) => setImmediate(resolve));
    const old = runtime.getBackendConnection();
    await runtime.switchBackend('b', { reload: false });
    finish();
    await assert.rejects(request, /changed|canceled/i);
    assert.equal(runtime.isCurrentConnection(old), false);
    assert.deepEqual(navigations, []);
});

test('offline messages are discarded across backend boundaries and cannot enter the new socket', async () => {
    runtime.channel.setRealtimeTransport(null);
    runtime.channel.sendRealtimeEvent({ event: 'turn.start', event_id: 'old' });
    await runtime.switchBackend('a', { reload: false });
    const sent = [];
    runtime.channel.setRealtimeTransport({ isOpen: true, sendEvent: (value) => sent.push(value), close() {} });
    assert.equal(runtime.channel.flushRealtimeEvents(), 0);
    assert.deepEqual(sent, []);
    assert.equal(runtime.channel.sendRealtimeEvent({ event_id: 'new' }), true);
    assert.deepEqual(sent, [{ event_id: 'new' }]);
});

test('unsynchronized state can block a switch before persistence or navigation changes', async () => {
    const release = runtime.beforeBackendSwitch(async () => { throw new Error('Unsynchronized document'); });
    await assert.rejects(runtime.switchBackend('b', { reload: false }), /Unsynchronized/);
    assert.equal(runtime.getBackendConnection().id, 'a');
    assert.equal(runtime.readBackendProfiles().activeId, 'a');
    release();
    await runtime.switchBackend('b');
    assert.deepEqual(navigations, ['/chat']);
});
