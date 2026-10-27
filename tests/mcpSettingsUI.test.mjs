import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref, resource, act } from './helpers/settingsRuntimeHarness.mjs';

const fixture = (changes = {}) => ({ id: 'server-id', slug: 'robot', title: 'Robot', transport: 'http', revision: 2, connection: { url: 'http://localhost:9023/mcp', headers: { Authorization: '' } }, defaults: { default: 'ask' }, toolPolicies: {}, ...changes });
const descriptor = () => resource({ id: 'mcp-servers', source: { endpoint: '/mcp', listPath: 'servers' }, editor: {
    options: [{ type: 'text', name: 'title', text: '名称', required: true }, { type: 'secret-map', name: 'connection.headers', text: '请求头' }, { type: 'json', name: 'defaults', text: '工具默认策略' }, { type: 'json', name: 'toolPolicies', text: '工具策略' }],
    defaults: {}, update: { id: 'save', endpoint: '/settings/{item.id}', method: 'PATCH', body: { title: ref('form.title'), connection: ref('form.connection'), defaults: ref('form.defaults'), toolPolicies: ref('form.toolPolicies'), revision: ref('item.revision') } },
} });

test('MCP settings use the shared resource editor with masked and unchanged secrets', async () => {
    const ui = await mount([descriptor()], { servers: [fixture()] });
    try {
        await click(button('编辑'));
        const secret = document.querySelector('[aria-label="请求头内容 1"]');
        assert.equal(secret.type, 'password'); assert.equal(secret.value, '');
        await click(button('保存'));
        const payload = settingsUI.calls.find(([method]) => method === 'patch')[2];
        assert.deepEqual(payload.connection.headers, { Authorization: '' }); assert.equal(payload.revision, 2);
        assert.equal(Object.hasOwn(payload, 'id'), false);
    } finally { await ui.close(); }
});

test('probe submits once for rapid clicks and opens the exact background task', async () => {
    const page = descriptor();
    page.actions = [{ id: 'probe', label: '检测', method: 'POST', endpoint: '/mcp/{item.id}/probe', watch: { endpoint: '/tasks/{response.taskId}', terminal: ['completed', 'failed', 'cancelled', 'interrupted'], success: ['completed'], taskPage: '/tasks?taskId={response.taskId}' } }];
    let finish;
    const pending = new Promise(resolve => { finish = resolve; });
    const ui = await mount([page], null, (method, url) => method === 'post' ? { taskId: 'probe-task' } : url.startsWith('/tasks/') ? pending : { servers: [fixture()] });
    try {
        await act(async () => { button('检测').click(); button('检测').click(); });
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
        await click(button('查看详情'));
        assert.deepEqual(settingsUI.navigated, ['/tasks?taskId=probe-task']);
    } finally { finish({ status: 'completed' }); await ui.close(); }
});

test('candidate publication requires its identity and saved revision from the record', async () => {
    const page = descriptor();
    page.actions = [{ id: 'publish', label: '发布', method: 'POST', endpoint: '/mcp/{item.id}/publish', when: { left: ref('item.candidateId'), op: 'truthy' }, body: { candidateId: ref('item.candidateId'), revision: ref('item.revision') } }];
    const ui = await mount([page], { servers: [fixture({ candidateId: 'candidate-3', revision: 6 })] });
    try { await click(button('发布')); assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post').slice(0, 3), ['post', '/mcp/server-id/publish', { candidateId: 'candidate-3', revision: 6 }]); } finally { await ui.close(); }
});

test('advanced tool policies with reserved or dotted names do not collide with defaults', async () => {
    const ui = await mount([descriptor()], { servers: [fixture()] });
    try {
        await click(button('编辑'));
        await edit(document.querySelector('[aria-label="工具策略"]'), JSON.stringify({ defaults: { default: 'deny' }, 'odd.tool': { default: 'allow', execution: { promote: true } } }));
        await click(button('保存'));
        const payload = settingsUI.calls.find(([method]) => method === 'patch')[2];
        assert.deepEqual(payload.defaults, { default: 'ask' });
        assert.equal(payload.toolPolicies.defaults.default, 'deny');
        assert.equal(payload.toolPolicies['odd.tool'].execution.promote, true);
    } finally { await ui.close(); }
});

test('duplicate secret keys block saving until the invalid row is fixed', async () => {
    const ui = await mount([descriptor()], { servers: [fixture()] });
    try {
        await click(button('编辑'));
        await click(button('添加键值'));
        await edit(document.querySelector('[aria-label="请求头名称 2"]'), 'Authorization');
        await click(button('保存'));
        assert.match(document.body.textContent, /键名不能重复/);
        assert.equal(settingsUI.calls.some(([method]) => method === 'patch'), false);
    } finally { await ui.close(); }
});
