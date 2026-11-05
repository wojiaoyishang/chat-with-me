import test from 'node:test';
import assert from 'node:assert/strict';
import { chatboxResourceIdentity, createChatboxResourceLoader, chatboxConfigurationFingerprint } from '../src/features/chat/ui/chatbox/chatboxResource.js';

const deferred = () => {
    let resolve, reject;
    const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
    return { promise, resolve, reject };
};
const descriptor = (overrides = {}) => ({
    catalogRevision: 'catalog-1', catalogChanged: true,
    extra_tools: [{ type: 'tool', name: 'read', default: 'ask' }],
    toolPermissions: { revision: 1, values: { read: 'ask' }, defaultValues: { read: 'ask' }, source: 'conversation' },
    roles: [{ name: 'user', default: true }], builtin_tools: [],
    capabilities: { realtimeVoice: { available: false } }, readOnly: false, ignoreAttachmentTools: false,
    ...overrides,
});

test('hydrating the same bearer principal does not invalidate first login, while credentials and cookie accounts stay isolated', () => {
    const backend = { id: 'one', url: '/api', epoch: 1 };
    assert.equal(chatboxResourceIdentity(backend, '', 'token-A'), chatboxResourceIdentity(backend, 'user-A', 'token-A'));
    assert.notEqual(chatboxResourceIdentity(backend, 'user-A', 'token-A'), chatboxResourceIdentity(backend, 'user-B', 'token-B'));
    assert.notEqual(chatboxResourceIdentity(backend, 'user-A', ''), chatboxResourceIdentity(backend, 'user-B', ''));
});

test('StrictMode replacement shares one request; abandoned reads abort only after the last subscriber leaves', async () => {
    const pending = deferred();
    const calls = [];
    const loader = createChatboxResourceLoader({ getScope: () => 'user-1', fetchConfiguration: (request) => { calls.push(request); return pending.promise; } });
    const first = loader.acquire({ conversationId: 'one' });
    first.release();
    const replacement = loader.acquire({ conversationId: 'one' });
    await Promise.resolve();
    await new Promise((done) => setTimeout(done, 5));
    assert.equal(calls.length, 1);
    assert.equal(calls[0].signal.aborted, false);
    pending.resolve(descriptor());
    assert.equal(await first.promise, await replacement.promise);
    replacement.release();

    const abandoned = deferred();
    const other = createChatboxResourceLoader({ getScope: () => 'user-1', fetchConfiguration: (request) => {
        request.signal.addEventListener('abort', () => abandoned.reject(new DOMException('cancelled', 'AbortError')));
        return abandoned.promise;
    } });
    const read = other.acquire();
    const rejected = assert.rejects(read.promise, { name: 'AbortError' });
    await Promise.resolve();
    read.release();
    await rejected;
});

test('each conversation requests fresh permissions while catalog and static setup are reused', async () => {
    const calls = [];
    const loader = createChatboxResourceLoader({ getScope: () => 'user-1', fetchConfiguration: async (request) => {
        calls.push(request);
        return calls.length === 1 ? descriptor() : {
            catalogRevision: 'catalog-1', catalogChanged: false,
            toolPermissions: { revision: calls.length, values: { read: 'deny' }, source: 'conversation' },
            readOnly: false, ignoreAttachmentTools: false,
        };
    } });
    const first = loader.acquire({ conversationId: 'one' });
    const original = await first.promise;
    first.release();
    const second = loader.acquire({ conversationId: 'two' });
    const next = await second.promise;
    second.release();
    assert.equal(calls.length, 2);
    assert.equal(calls[1].catalogRevision, 'catalog-1');
    assert.equal(calls[1].includeSetup, false);
    assert.equal(next.extra_tools, original.extra_tools);
    assert.equal(next.roles, original.roles);
    assert.equal(next.setupChanged, false);
    assert.deepEqual(next.toolPermissions.values, { read: 'deny' });
    const remount = loader.acquire({ conversationId: 'two' });
    await remount.promise;
    remount.release();
    assert.equal(calls.length, 3, 'completed permission responses must not be reused as a new conversation admission');
});

test('scope changes discard cached structures and cannot apply an old account response', async () => {
    let scope = 'account-A';
    const old = deferred();
    const calls = [];
    const loader = createChatboxResourceLoader({ getScope: () => scope, fetchConfiguration: (request) => {
        calls.push(request);
        return calls.length === 1 ? old.promise : Promise.resolve(descriptor({ catalogRevision: 'account-B-catalog' }));
    } });
    const first = loader.acquire({ conversationId: 'same-id' });
    const rejected = assert.rejects(first.promise, { name: 'AbortError' });
    await Promise.resolve();
    scope = 'account-B';
    const second = loader.acquire({ conversationId: 'same-id' });
    assert.equal((await second.promise).catalogRevision, 'account-B-catalog');
    old.resolve(descriptor());
    await rejected;
    assert.equal(calls[0].signal.aborted, true);
    assert.equal(calls[1].catalogRevision, undefined);
    assert.equal(calls[1].includeSetup, true);
    first.release(); second.release();
});

test('focus freshness expires and a catalog event forces a full catalog/setup refresh', async () => {
    let clock = 1_000;
    const calls = [];
    const loader = createChatboxResourceLoader({ getScope: () => 'user-1', now: () => clock,
        fetchConfiguration: async (request) => { calls.push(request); return descriptor(); } });
    const first = loader.acquire({ conversationId: 'one' });
    await first.promise; first.release();
    assert.equal(loader.isFresh('one'), true);
    clock += 30_001;
    assert.equal(loader.isFresh('one'), false);
    loader.invalidate({ catalog: true });
    const refreshed = loader.acquire({ conversationId: 'one' });
    await refreshed.promise; refreshed.release();
    assert.equal(calls[1].catalogRevision, undefined);
    assert.equal(calls[1].includeSetup, true);
});

test('runtime settings invalidation reloads speech and role setup while preserving the catalog revision', async () => {
    const calls = [];
    const loader = createChatboxResourceLoader({ getScope: () => 'one', fetchConfiguration: async (request) => {
        calls.push(request);
        return descriptor();
    } });
    const first = loader.acquire({ conversationId: 'one' });
    await first.promise; first.release();
    loader.invalidate({ setup: true });
    const refreshed = loader.acquire({ conversationId: 'one' });
    await refreshed.promise; refreshed.release();
    assert.equal(calls[1].catalogRevision, 'catalog-1');
    assert.equal(calls[1].includeSetup, true);
});

test('failed reads remain retryable and a changed catalog cannot silently reuse missing structure', async () => {
    let count = 0;
    const loader = createChatboxResourceLoader({ getScope: () => 'one', fetchConfiguration: async () => {
        count += 1;
        if (count === 1) throw new Error('temporary error');
        if (count === 3) return { catalogRevision: 'catalog-2', toolPermissions: { values: {} } };
        return descriptor();
    } });
    const first = loader.acquire();
    await assert.rejects(first.promise, /temporary error/); first.release();
    assert.equal(loader.isFresh(), false);
    const retry = loader.acquire();
    await retry.promise; retry.release();
    assert.equal(count, 2);
    const malformed = loader.acquire();
    await assert.rejects(malformed.promise, /工具目录未加载/); malformed.release();
});

test('unchanged effective configuration retains its fingerprint despite transport wrappers', () => {
    const original = descriptor();
    const repeated = { ...descriptor(), extra_tools: [...original.extra_tools], _response: { other: true } };
    assert.equal(chatboxConfigurationFingerprint(original), chatboxConfigurationFingerprint(repeated));
    assert.notEqual(chatboxConfigurationFingerprint(original), chatboxConfigurationFingerprint(descriptor({ toolPermissions: { revision: 2, values: { read: 'deny' } } })));
});

test('visiting many conversations retires inactive responses without evicting active shared reads', async () => {
    const pending = deferred();
    let activeReads = 0;
    const loader = createChatboxResourceLoader({ getScope: () => 'one', fetchConfiguration: async ({ conversationId }) => {
        if (conversationId === 'active') { activeReads += 1; return pending.promise; }
        return descriptor();
    } });
    const active = loader.acquire({ conversationId: 'active' });
    for (let index = 0; index < 90; index += 1) {
        const read = loader.acquire({ conversationId: String(index) });
        await read.promise; read.release();
    }
    assert.equal(loader.isFresh('0'), false);
    assert.equal(loader.isFresh('89'), true);
    const other = loader.acquire({ conversationId: 'active' });
    assert.equal(active.promise, other.promise);
    assert.equal(activeReads, 1);
    pending.resolve(descriptor());
    await active.promise;
    active.release(); other.release();
});
