import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, 'temp'), { recursive: true });
const outfile = path.join(root, 'temp/backend-client-adapter-test.mjs');
await build({
    stdin: { contents: `export { default as adapter } from './src/runtime/backend/clientAdapter.js'; export * from './src/runtime/backend/connection.js';`, resolveDir: root },
    outfile, bundle: true, platform: 'node', format: 'esm', packages: 'external',
    plugins: [{ name: 'client-local-settings', setup(builder) {
        builder.onResolve({ filter: /lib\/tools\.jsx$/ }, () => ({ path: 'tools', namespace: 'mock' }));
        builder.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: `
            export const getLocalSetting=(key,fallback)=>globalThis.localPreferences.get(key)??fallback;
            export const setLocalSetting=(key,value)=>globalThis.localPreferences.set(key,value);
        ` }));
    } }],
    alias: { '@': path.join(root, 'src') },
});
class Storage {
    values = new Map();
    getItem(key) { return this.values.get(key) ?? null; }
    setItem(key, value) { this.values.set(key, String(value)); }
    removeItem(key) { this.values.delete(key); }
}
globalThis.window = new EventTarget();
window.localStorage = new Storage();
window.sessionStorage = new Storage();
window.location = { origin: 'https://client.example' };
globalThis.localPreferences = new Map();
const runtime = await import(pathToFileURL(outfile).href);

test('device preferences cannot read or overwrite connection-owned namespaces', async () => {
    localPreferences.set('cwm:backend:other:7:draft', 'secret');
    for (const key of ['cwm:backend-profiles:v1', 'cwm:backend:other:7:draft', '__proto__', 'constructor']) {
        await assert.rejects(runtime.adapter.read(key), /设置|存储/);
        await assert.rejects(runtime.adapter.write(key, 'replacement'), /设置|存储/);
        await assert.rejects(runtime.adapter.invoke('client.local-settings', { key, value: 'replacement' }), /设置|存储/);
    }
    assert.equal(localPreferences.get('cwm:backend:other:7:draft'), 'secret');
    await runtime.adapter.write('CompactConversationList', true);
    assert.equal(await runtime.adapter.read('CompactConversationList'), true);
});

test('backend scopes can only address the selected backend and current user', async () => {
    runtime.setConnectionUserId('7');
    await runtime.adapter.write('preferences', { enabled: true }, { scope: 'backend-user' });
    assert.deepEqual(localPreferences.get('cwm:backend:default:7:preferences'), { enabled: true });
    await runtime.adapter.invoke('client.local-settings', { key: 'preferences', value: 2, scope: 'backend' });
    assert.equal(localPreferences.get('cwm:backend:default:shared:preferences'), 2);
    assert.equal(await runtime.adapter.read('cwm:backend:other:7:draft', { scope: 'backend-user' }), undefined);
    runtime.setConnectionUserId('8');
    assert.equal(await runtime.adapter.read('preferences', { scope: 'backend-user' }), undefined);
    await assert.rejects(runtime.adapter.read('preferences', { scope: 'arbitrary' }), /存储/);
});

test('the connection adapter exposes live measurements without persisting or changing the selected backend', async () => {
    const before = runtime.getBackendConnection();
    const profiles = window.localStorage.getItem(runtime.BACKEND_STORAGE_KEY);
    const token = runtime.getConnectionToken();
    const originalFetch = globalThis.fetch;
    const notices = [];
    const progress = [];
    const off = runtime.adapter.subscribe(() => { notices.push(true); });
    try {
        globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: true, data: { protocol: 'cwm.client.v1' } }) });
        const result = await runtime.adapter.invoke('backend.probe', {}, { onProgress: value => progress.push(value) });
        assert.deepEqual(result, { total: 1, available: 1, failed: 0 });
        const row = (await runtime.adapter.read('backends')).items[0];
        assert.equal(row.active, true);
        assert.equal(row.probe.status, 'available');
        assert.match(row.probe.latencyText, /\d+ ms/);
        assert.equal(row.probeRunning, false);
        assert.ok(notices.length >= 3);
        assert.equal(progress.at(-1).percent, 100);
        assert.deepEqual(runtime.getBackendConnection(), before);
        assert.equal(runtime.getConnectionToken(), token);
        assert.equal(window.localStorage.getItem(runtime.BACKEND_STORAGE_KEY), profiles);
    } finally { off(); globalThis.fetch = originalFetch; }
});
