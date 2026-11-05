import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

const source = readFileSync(new URL('../src/runtime/backend/session.js', import.meta.url), 'utf8')
    .replace(/^import .*;\r?\n/gm, '').replaceAll('export async function ', 'async function ');

function harness() {
    const requests = [];
    let token = 'token', epoch = 0, now = 1000, tickets = 0;
    const apiClient = { post: async (path, body, options) => {
        requests.push({ path, body, options });
        if (apiClient.failure && (!apiClient.failPath || apiClient.failPath === path)) throw apiClient.failure;
        if (path === '/client/session' && apiClient.pending) return apiClient.pending;
        return path === '/client/session' ? { accessToken: token || 'session' } : { ticket: 'fresh-ticket' + (++tickets > 1 ? '-' + tickets : '') };
    } };
    const context = { exports: {}, apiClient, Date: {now: () => now}, getBackendConnection: () => ({ id: 'default', url: '/api', epoch }),
        getConnectionToken: () => token, setConnectionToken: value => { token = value; }, isCurrentConnection: scope => scope.epoch === epoch,
        backendSocketUrl: () => 'ws://test/ws' };
    vm.runInNewContext(source + '\nexports.prepare = authenticatedSocketUrl; exports.exchange = ensureClientSession;', context);
    return { ...context.exports, requests, apiClient, token: value => {token = value;}, switch: () => {epoch++;}, advance: value => {now += value;} };
}

test('session exchange and one-use socket tickets have bounded HTTP timeouts', async () => {
    const app = harness();
    assert.equal(await app.prepare(), 'ws://test/ws?ticket=fresh-ticket');
    assert.deepEqual(app.requests.map(item => item.path), ['/client/session', '/client/socket-ticket']);
    for (const { options } of app.requests) {
        assert.equal(options.timeout, 10000);
        assert.equal(options.skipAuthCheck, true);
    }
});

test('failed credential preparation releases the exchange so the next retry can recover', async () => {
    const app = harness(); app.apiClient.failure = new Error('network timed out');
    await assert.rejects(app.prepare(), /network timed out/);
    app.apiClient.failure = null;
    assert.equal(await app.prepare(), 'ws://test/ws?ticket=fresh-ticket');
    assert.equal(app.requests.filter(item => item.path === '/client/session').length, 2);
});

test('bootstrap then websocket reuse the successful exchange but never a socket ticket', async () => {
    const app = harness();
    await app.exchange();
    const first = await app.prepare();
    const second = await app.prepare();
    assert.notEqual(first, second);
    assert.equal(app.requests.filter(item => item.path === '/client/session').length, 1);
    assert.equal(app.requests.filter(item => item.path === '/client/socket-ticket').length, 2);
    app.token('new-login');
    await app.prepare();
    app.switch();
    await app.prepare();
    app.advance(60001);
    await app.prepare();
    assert.equal(app.requests.filter(item => item.path === '/client/session').length, 4);
});

test('ticket failure invalidates session readiness so a retry reconciles credentials', async () => {
    const app = harness();
    await app.exchange();
    app.apiClient.failure = new Error('expired'); app.apiClient.failPath = '/client/socket-ticket';
    await assert.rejects(app.prepare(), /expired/);
    app.apiClient.failure = null;
    await app.prepare();
    assert.equal(app.requests.filter(item => item.path === '/client/session').length, 2);
});

test('an old exchange cannot restore credentials after another login or backend switch', async () => {
    for (const change of ['token', 'switch']) {
        const app = harness();
        let resolve;
        app.apiClient.pending = new Promise(yes => {resolve = yes;});
        const pending = app.exchange();
        if (change === 'token') app.token('new-login'); else app.switch();
        resolve({accessToken: 'token'});
        await assert.rejects(pending, change === 'token' ? /Login changed/ : /Backend changed/);
    }
});
