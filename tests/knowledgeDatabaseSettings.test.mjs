import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { mount, button, click, edit, ref, act } from './helpers/settingsRuntimeHarness.mjs';

const connection = { id: 'db-one', name: 'default', title: '旧知识库', uri: 'bolt://localhost:7687', database: 'neo4j', revision: 3, hasPassword: true };
const fields = [{ type: 'text', name: 'title', text: '知识库名称', required: true }, { type: 'text', name: 'name', text: '知识库标识', required: true }, { type: 'text', name: 'uri', text: '连接地址', required: true }, { type: 'text', name: 'password', text: '密码', inputType: 'password', requiredOnCreate: true }];
const body = Object.fromEntries(['title', 'name', 'uri', 'password'].map(key => [key, ref(`form.${key}`)]));
const descriptor = { type: 'resource', id: 'databases', text: '知识库连接', source: { endpoint: '/knowledge/databases', listPath: 'databases' }, titleField: 'title', create: { label: '添加知识库连接' }, editor: { options: fields, defaults: { title: '', name: '', uri: '', password: '' }, load: { endpoint: '/knowledge/databases/{item.id}' }, create: { id: 'create', method: 'POST', endpoint: '/knowledge/databases', body }, update: { id: 'save', method: 'PUT', endpoint: '/knowledge/databases/{item.id}', body: { ...body, revision: ref('item.revision') } } }, actions: [{ kind: 'edit', label: '编辑' }, { id: 'verify', label: '验证连接', method: 'POST', endpoint: '/knowledge/databases/{item.id}/verify' }, { id: 'delete', label: '删除', method: 'DELETE', endpoint: '/knowledge/databases/{item.id}', params: { revision: ref('item.revision') }, confirm: { title: '删除知识库连接？', danger: true }, effects: [{ type: 'refresh', target: 'databases' }] }] };
const input = label => document.querySelector(`[aria-label="${label}"]`);

test('backend resource descriptors render and create a connection without a dedicated settings page', async () => {
    const ui = await mount([descriptor], { databases: [connection] });
    try {
        assert.match(document.body.textContent, /旧知识库/);
        await click(button('添加知识库连接'));
        await edit(input('知识库名称'), '新知识库'); await edit(input('知识库标识'), 'default');
        await edit(input('连接地址'), 'bolt://database:7687'); await edit(input('密码'), 'new-secret');
        await click(button('保存'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post').slice(0, 3), ['post', '/knowledge/databases', { title: '新知识库', name: 'default', uri: 'bolt://database:7687', password: 'new-secret' }]);
    } finally { await ui.close(); }
});

test('editing keeps blank passwords and sends the saved record revision; verification has its own action', async () => {
    const ui = await mount([descriptor], null, (method, url) => method === 'get' ? url.endsWith('/db-one') ? connection : { databases: [connection] } : {});
    try {
        await click(button('编辑'));
        assert.equal(input('密码').value, ''); assert.equal(input('密码').type, 'password');
        await click(button('保存'));
        assert.equal(settingsUI.calls.find(([method]) => method === 'put')[2].password, '');
        assert.equal(settingsUI.calls.find(([method]) => method === 'put')[2].revision, 3);
        await click(button('验证连接'));
        assert.ok(settingsUI.calls.some(([method, url]) => method === 'post' && url === '/knowledge/databases/db-one/verify'));
    } finally { await ui.close(); }
});

test('a conflict preserves draft values and deleting refers only to the saved identity', async () => {
    const ui = await mount([descriptor], null, (method, url) => {
        if (method === 'get') return url.endsWith('/db-one') ? connection : { databases: [connection] };
        if (method === 'put') throw Object.assign(new Error('版本冲突'), { code: 409 });
        return {};
    });
    try {
        await click(button('编辑')); await edit(input('知识库名称'), '我的草稿'); await click(button('保存'));
        assert.ok(document.querySelector('[role="dialog"]')); assert.equal(input('知识库名称').value, '我的草稿');
        assert.match(document.body.textContent, /版本冲突/);
        await click(button('取消'));
        await click(button('删除'));
        assert.equal(settingsUI.calls.find(([method]) => method === 'delete')[1], '/knowledge/databases/db-one');
        assert.equal(settingsUI.calls.find(([method]) => method === 'delete')[2].params.revision, 3);
    } finally { await ui.close(); }
});

test('a stale deletion cannot be repeated before the resource list is refreshed', async () => {
    let revision = 3;
    const ui = await mount([descriptor], null, method => {
        if (method === 'get') return { databases: [{ ...connection, revision }] };
        throw Object.assign(new Error('删除版本冲突'), { code: 409 });
    });
    try {
        await click(button('删除'));
        assert.equal(button('删除').disabled, true);
        await click(button('删除'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'delete').length, 1);
        revision = 4; await click(document.querySelector('[aria-label="刷新列表"]'));
        assert.equal(button('删除').disabled, false);
        await click(button('删除'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'delete').at(-1)[2].params.revision, 4);
    } finally { await ui.close(); }
});

test('an older resource read cannot overwrite the list after a newer refresh', async () => {
    let release, reads = 0;
    const pending = new Promise(resolve => { release = resolve; });
    const ui = await mount([descriptor], null, method => {
        if (method !== 'get') return {};
        reads += 1;
        return reads === 1 ? pending : { databases: [{ ...connection, title: '最新连接' }] };
    });
    try {
        await click(document.querySelector('[aria-label="刷新列表"]'));
        await act(async () => release({ databases: [{ ...connection, title: '旧响应' }] }));
        assert.match(document.body.textContent, /最新连接/); assert.doesNotMatch(document.body.textContent, /旧响应/);
    } finally { await ui.close(); }
});

test('the settings shell consumes descriptor URLs and save modes without business page imports', async () => {
    const source = await readFile(new URL('../src/pages/SettingPage.jsx', import.meta.url), 'utf8');
    assert.doesNotMatch(source, /KnowledgeDatabaseSettings|MCPSettings|ComfyUISettings|workspaceManagement|userManagement/);
    assert.match(source, /\?\.descriptor/);
    assert.match(source, /saveMode/);
});
