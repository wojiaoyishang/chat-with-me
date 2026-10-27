import test from 'node:test';
import assert from 'node:assert/strict';
import { createBackendProbeStore, probeBackendConnection } from '../src/runtime/backend/connectionProbes.js';
import { getBackendConnection, getBackendManifest } from '../src/runtime/backend/connection.js';

const success = () => ({ ok: true, json: async () => ({ success: true, data: { protocol: 'cwm.client.v1' } }) });
const profile = { id: 'remote', title: '远程后端', url: 'https://backend.example/prefix' };
const deferred = () => { let resolve; const promise = new Promise(complete => { resolve = complete; }); return { promise, resolve }; };

test('a probe measures the public bootstrap and never selects, authenticates or caches a connection', async () => {
    const before = getBackendConnection(), manifest = getBackendManifest();
    let calls = 0;
    let clock = 100;
    const result = await probeBackendConnection(profile, {
        now: () => { clock += 27; return clock; },
        request: async (url, options) => {
            calls += 1;
            assert.equal(url, 'https://backend.example/prefix/client/bootstrap');
            assert.equal(options.method, 'GET');
            assert.equal(options.credentials, 'omit');
            assert.equal(options.cache, 'no-store');
            assert.equal(options.redirect, 'error');
            assert.deepEqual(options.headers, { Accept: 'application/json' });
            return success();
        },
    });
    assert.equal(calls, 1);
    assert.equal(result.status, 'available');
    assert.equal(result.latencyMs, 27);
    assert.equal(result.latencyText, '27 ms');
    assert.deepEqual(getBackendConnection(), before);
    assert.equal(getBackendManifest(), manifest);
});

test('HTTP, HTML, incompatible protocol and browser failures are not reported as a usable backend', async () => {
    const cases = [
        [{ ok: false, status: 503, statusText: 'Service Unavailable' }, 'unavailable', /503/],
        [{ ok: true, json: async () => { throw new SyntaxError('html'); } }, 'unavailable', /客户端信息/],
        [{ ok: true, json: async () => ({ success: true, data: { protocol: 'other' } }) }, 'incompatible', /协议/],
        [{ ok: true, json: async () => ({ success: false, msg: '维护中' }) }, 'unavailable', /维护中/],
    ];
    for (const [response, status, pattern] of cases) {
        const result = await probeBackendConnection(profile, { request: async () => response });
        assert.equal(result.status, status);
        assert.match(result.detail, pattern);
        assert.equal(result.latencyMs, undefined);
    }
    const result = await probeBackendConnection(profile, { request: async () => { throw new TypeError('Failed to fetch'); } });
    assert.equal(result.status, 'unavailable');
    assert.match(result.detail, /网络.*跨域/);
});

test('the timeout covers the response body, while caller cancellation is propagated', async () => {
    const untilAbort = (signal) => new Promise((_, reject) => signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true }));
    const timeout = await probeBackendConnection(profile, {
        timeoutMs: 15,
        request: async (_, { signal }) => ({ ok: true, json: () => untilAbort(signal) }),
    });
    assert.equal(timeout.status, 'timeout');
    assert.match(timeout.detail, /完整响应/);
    const controller = new AbortController();
    const pending = probeBackendConnection(profile, { signal: controller.signal, request: (_, { signal }) => untilAbort(signal) });
    controller.abort();
    await assert.rejects(pending, { name: 'AbortError' });
    let calls = 0;
    await assert.rejects(probeBackendConnection(profile, { signal: controller.signal, request: async () => { calls += 1; } }), { name: 'AbortError' });
    assert.equal(calls, 0);
});

test('a bounded batch publishes each result by identity and refuses overlapping runs', async () => {
    const profiles = Array.from({ length: 5 }, (_, index) => ({ ...profile, id: `p${index}` }));
    const pending = new Map();
    let active = 0, peak = 0, notifications = 0;
    const store = createBackendProbeStore({ profiles: () => profiles, probe: async (target) => {
        active += 1; peak = Math.max(active, peak);
        const item = deferred(); pending.set(target.id, item);
        const result = await item.promise;
        active -= 1;
        return result;
    } });
    const off = store.subscribe(() => { notifications += 1; });
    const progress = [];
    const run = store.run({ onProgress: item => progress.push(item) });
    assert.equal(pending.size, 3);
    assert.equal(store.read().filter(item => item.probe.status === 'checking').length, 3);
    assert.equal(store.read()[4].probe.status, 'queued');
    await assert.rejects(store.run(), /正在测速/);
    pending.get('p1').resolve({ status: 'available', latencyText: '18 ms', latencyMs: 18, detail: '' });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(store.read()[1].probe.latencyText, '18 ms');
    assert.ok(pending.has('p3'));
    profiles[1] = { ...profiles[1], title: '重新命名' };
    pending.get('p0').resolve({ status: 'timeout', latencyText: '—', detail: '超时' });
    await new Promise(resolve => setImmediate(resolve));
    for (const id of ['p2', 'p3', 'p4']) pending.get(id).resolve({ status: 'available', latencyText: '22 ms', detail: '' });
    assert.deepEqual(await run, { total: 5, available: 4, failed: 1 });
    assert.equal(peak, 3);
    assert.equal(store.read()[1].title, '重新命名');
    assert.equal(store.read().some(item => item.probeRunning), false);
    assert.equal(progress.at(-1).percent, 100);
    assert.match(progress.at(-1).message, /5 \/ 5/);
    assert.ok(notifications > 5);
    off();
});

test('closing the owner cancels queued requests and late responses cannot overwrite a later probe', async () => {
    let profiles = Array.from({ length: 4 }, (_, index) => ({ ...profile, id: `p${index}` }));
    const pending = new Map();
    let immediate = false;
    const store = createBackendProbeStore({ profiles: () => profiles, probe: async (target) => {
        if (immediate) return { status: 'available', latencyText: '1 ms' };
        const item = deferred(); pending.set(target.id, item); return item.promise;
    } });
    const owner = new AbortController();
    const run = store.run({ signal: owner.signal });
    owner.abort();
    for (const item of pending.values()) item.resolve({ status: 'available', latencyText: '999 ms' });
    await assert.rejects(run, { name: 'AbortError' });
    assert.equal(pending.size, 3);
    assert.ok(store.read().every(item => item.probe.status === 'cancelled' && !item.probeRunning));
    immediate = true;
    assert.deepEqual(await store.run({ profileId: 'p1' }), { total: 1, available: 1, failed: 0 });
    assert.equal(store.read()[1].probe.latencyText, '1 ms');
    profiles = profiles.filter(item => item.id !== 'p1');
    assert.equal(store.read().some(item => item.id === 'p1'), false);
    await assert.rejects(store.run({ profileId: 'p1' }), /已被删除/);
});
