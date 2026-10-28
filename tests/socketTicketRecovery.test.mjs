import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

const source = readFileSync(new URL('../src/runtime/backend/session.js', import.meta.url), 'utf8')
    .replace(/^import .*;\r?\n/gm, '').replaceAll('export async function ', 'async function ');

function harness() {
    const requests = [];
    const apiClient = { post: async (path, body, options) => {
        requests.push({ path, body, options });
        if (apiClient.failure) throw apiClient.failure;
        return { accessToken: 'session', ticket: 'fresh-ticket' };
    } };
    const context = { exports: {}, apiClient, getBackendConnection: () => ({ id: 'default', epoch: 0 }),
        getConnectionToken: () => 'token', setConnectionToken: () => {}, isCurrentConnection: () => true,
        backendSocketUrl: () => 'ws://test/ws' };
    vm.runInNewContext(source + '\nexports.prepare = authenticatedSocketUrl;', context);
    return { prepare: context.exports.prepare, requests, apiClient };
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
