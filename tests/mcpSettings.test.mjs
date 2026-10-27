import assert from 'node:assert/strict';
import test from 'node:test';
import { applyToolPermissionsToStatus, collectToolPermissions } from '../src/features/tools/toolPermissions.js';
import { executeRequest, getValue, resolveValue, setValue, validateFields } from '../src/features/settings-runtime/model.js';

const ref = $ref => ({ $ref });

test('resource action projection submits only declared fields and preserves masked credentials', async () => {
    const record = { id: 'id', revision: 4, slug: 'robot', title: 'Robot', connection: { url: 'http://localhost:9023/mcp', headers: { Authorization: '' } }, tools: [{ name: 'echo' }], configuredSecrets: { headers: ['Authorization'] } };
    let sent;
    await executeRequest({ method: 'PATCH', endpoint: '/settings/{item.id}', body: { title: ref('form.title'), connection: ref('form.connection'), revision: ref('item.revision') } }, { form: record, item: record }, { api: { patch: async (url, body) => { sent = { url, body }; } } });
    assert.equal(sent.url, '/settings/id');
    assert.deepEqual(sent.body, { title: 'Robot', connection: record.connection, revision: 4 });
    assert.equal(Object.hasOwn(sent.body, 'tools'), false);
    assert.equal(Object.hasOwn(sent.body, 'configuredSecrets'), false);
});

test('structured argument arrays pass through finite refs without string or transport heuristics', async () => {
    const form = { connection: { url: 'not-selected', args: ['server.py', '--value=a b'], command: 'python' } };
    const body = resolveValue({ connection: { command: ref('form.connection.command'), args: ref('form.connection.args') } }, { form });
    assert.deepEqual(body.connection.args, ['server.py', '--value=a b']);
    assert.equal(Object.hasOwn(body.connection, 'url'), false);
    assert.throws(() => resolveValue({ $transform: 'json-parse', value: ref('form.arguments') }, { form: { arguments: '[malformed' } }), /JSON|Unexpected/i);
});

test('removing secret entries is represented explicitly rather than losing the parent object', () => {
    const form = setValue({ connection: { headers: { Authorization: '' } } }, ['connection', 'headers'], {});
    assert.deepEqual(resolveValue(ref('form.connection.headers'), { form }), {});
    assert.equal(getValue(form, ['connection', 'headers', 'Authorization']), undefined);
});

test('advanced tool policy objects retain literal dotted names and reset by deleting only the override', () => {
    const original = { 'odd.tool': { enabled: true, default: 'deny', execution: { promote: true } } };
    const changed = setValue(original, ['odd.tool', 'default'], 'ask');
    assert.deepEqual(changed['odd.tool'].execution, { promote: true });
    const reset = structuredClone(changed);
    delete reset['odd.tool'].default;
    assert.deepEqual(resolveValue(ref('form.toolPolicies'), { form: { toolPolicies: reset } }), { 'odd.tool': { enabled: true, execution: { promote: true } } });
    assert.equal(original['odd.tool'].default, 'deny');
});

test('conditional resource forms validate only declared active connection fields', () => {
    const fields = [
        { type: 'group', when: { left: ref('form.transport'), op: 'eq', right: 'http' }, children: [{ name: 'connection.url', required: true }] },
        { type: 'group', when: { left: ref('form.transport'), op: 'eq', right: 'stdio' }, children: [{ name: 'connection.command', required: true }] },
    ];
    assert.deepEqual(validateFields(fields, { transport: 'stdio', connection: { command: 'python' } }), {});
    assert.ok(validateFields(fields, { transport: 'http', connection: {} })['connection.url']);
});

test('MCP permission paths retain dots and hyphens through composer state', () => {
    const name = 'test_robot.odd.tool-name';
    const menu = [{ type: 'group', name: 'test_robot', children: [{ type: 'tool', name, permissionKey: name, default: 'ask' }] }];
    const status = applyToolPermissionsToStatus(menu, {}, { [name]: 'deny' });
    assert.deepEqual(collectToolPermissions(menu, status), { [name]: 'deny' });
});
