import test from 'node:test';
import assert from 'node:assert/strict';
import { applyRules, cloneData, executeRequest, getValue, matchesCondition, pageValues, requestEndpoint, resolveValue, setValue, validateFields } from '../src/features/settings-runtime/model.js';

test('descriptors resolve only explicit references and finite transforms', () => {
    const scope = { form: { title: '服务', args: '["--port", "9023"]' }, item: { id: 'x', revision: 4 } };
    assert.deepEqual(resolveValue({ title: { $ref: 'form.title' }, revision: { $ref: 'item.revision' }, missing: { $ref: 'form.missing', default: false }, args: { $transform: 'json-parse', value: { $ref: 'form.args' } } }, scope), { title: '服务', revision: 4, missing: false, args: ['--port', '9023'] });
    assert.throws(() => resolveValue({ $transform: 'eval', value: '1 + 1' }), /不支持/);
    assert.equal(getValue(scope, '__proto__.constructor'), undefined);
    assert.throws(() => setValue({}, '__proto__.polluted', true), /无效/);
});

test('path placeholders encode values and reject missing identifiers before requests', () => {
    assert.equal(requestEndpoint('/items/{item.id}?revision={item.revision}', { item: { id: 'a/b', revision: 3 } }), '/items/a%2Fb?revision=3');
    assert.throws(() => requestEndpoint('/items/{item.id}', { item: {} }), /缺少参数/);
    for (const endpoint of ['https://external.invalid/items', '//external.invalid', '/../items', '/items\\x']) assert.throws(() => requestEndpoint(endpoint, {}), /无效/);
});

test('conditions and directed change rules are declared by the server', () => {
    const rules = [{ on: 'image', when: { $ref: 'form.image', eq: true }, set: { vision: true } }, { on: 'vision', when: { left: { $ref: 'form.vision' }, op: 'eq', right: false }, set: { image: false } }];
    assert.deepEqual(applyRules({ image: true, vision: false }, rules, { changedField: 'vision' }), { image: false, vision: false });
    assert.deepEqual(applyRules({ image: true, vision: false }, rules, { changedField: 'image' }), { image: true, vision: true });
    assert.equal(matchesCondition({ all: [{ left: { $ref: 'form.kind' }, op: 'in', right: ['number'] }, { not: { $ref: 'form.disabled', eq: true } }] }, { form: { kind: 'number' } }), true);
});

test('nested form names and defaults preserve raw values without inventing entity IDs', () => {
    const result = pageValues([{ type: 'text', name: 'connection.url', default: 'http://local' }, { type: 'list', name: 'rules', default: [{}] }], { revision: 2 });
    assert.deepEqual(result, { revision: 2, connection: { url: 'http://local' }, rules: [{}] });
    assert.equal(result.rules[0].id, undefined);
    assert.deepEqual(cloneData({ value: 1, _response: { secret: 'not a form field' } }), { value: 1 });
});

test('required validation respects unnamed conditional groups and nested list entries', () => {
    const fields = [{ type: 'group', when: { $ref: 'form.transport', eq: 'stdio' }, children: [{ name: 'connection.command', text: '命令', required: true }] }, { type: 'list', name: 'items', children: [{ name: 'name', text: '名称', required: true }] }];
    assert.deepEqual(validateFields(fields, { transport: 'http', items: [{ name: 'ok' }] }), {});
    assert.deepEqual(Object.keys(validateFields(fields, { transport: 'stdio', items: [{ name: '' }] })), ['connection.command', 'items.0.name']);
});

test('generic actions select payload fields, keep revision, and reuse current API client', async () => {
    const calls = [];
    const api = { patch: async (...args) => { calls.push(args); return { saved: true }; } };
    const response = await executeRequest({ method: 'PATCH', endpoint: '/resources/{item.id}', body: { title: { $ref: 'form.title' }, revision: { $ref: 'item.revision' } } }, { item: { id: 'one', revision: 7 }, form: { title: 'new', tools: ['read-only'] } }, { api });
    assert.deepEqual(calls[0].slice(0, 2), ['/resources/one', { title: 'new', revision: 7 }]);
    assert.deepEqual(response, { saved: true });
});

test('pure navigation actions do not issue a dummy HTTP request', async () => {
    const api = new Proxy({}, { get: () => { throw new Error('No HTTP request expected'); } });
    assert.deepEqual(await executeRequest({ id: 'configure', effects: [{ type: 'open-settings', value: { pageId: 'plugin', endpoint: '/plugin/editor' } }] }, {}, { api }), {});
    await assert.rejects(executeRequest({ id: 'invalid' }, {}, { api }), /无效/);
});

test('sequential actions pass response references and client actions use the adapter', async () => {
    const calls = [];
    const api = { post: async () => ({ id: 'created' }), put: async (url, body) => { calls.push([url, body]); return { done: true }; } };
    await executeRequest({ steps: [{ endpoint: '/items', method: 'POST' }, { endpoint: '/items/{response.id}/links', method: 'PUT', body: { links: { $ref: 'form.links' } } }] }, { form: { links: ['a'] } }, { api });
    assert.deepEqual(calls, [['/items/created/links', { links: ['a'] }]]);
    const client = { invoke: async (name, body) => ({ name, body }) };
    assert.deepEqual(await executeRequest({ clientAction: 'backend.switch', body: { profileId: { $ref: 'item.id' } } }, { item: { id: 'b' } }, { client }), { name: 'backend.switch', body: { profileId: 'b' } });
});
