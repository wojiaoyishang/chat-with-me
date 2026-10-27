import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, upload, ref, resource, act } from './helpers/settingsRuntimeHarness.mjs';

test('the same resource renderer edits nested fields and preserves masked credentials', async () => {
    const ui = await mount([resource()], { items: [{ id: 's1', title: '示例', revision: 3, connection: { headers: { Authorization: '' } }, tools: ['server-owned'] }] });
    try {
        await click(button('编辑'));
        const secret = document.querySelector('[aria-label="请求头内容 1"]');
        assert.equal(secret.type, 'password');
        assert.equal(secret.value, '');
        await click(button('保存'));
        const saved = settingsUI.calls.find(([method]) => method === 'patch');
        assert.deepEqual(saved.slice(0, 2), ['patch', '/fixtures/s1']);
        assert.deepEqual(saved[2], { title: '示例', revision: 3, connection: { headers: { Authorization: '' } } });
        assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('a version conflict preserves the open editor and its current values', async () => {
    const row = { id: 's2', title: '待保存', revision: 1 };
    const ui = await mount([resource()], null, async method => {
        if (method === 'get') return { items: [row] };
        throw Object.assign(new Error('配置版本冲突'), { code: 409 });
    });
    try {
        await click(button('编辑'));
        const title = [...document.querySelectorAll('input')].find(input => input.value === '待保存');
        await edit(title, '我编辑后的草稿');
        await click(button('保存'));
        assert.ok(document.querySelector('[role="dialog"]'));
        assert.match(document.body.textContent, /配置版本冲突/);
        assert.ok([...document.querySelectorAll('input')].some(input => input.value === '我编辑后的草稿'));
        assert.equal(settingsUI.calls.find(([method]) => method === 'patch')[2].title, '我编辑后的草稿');
    } finally { await ui.close(); }
});

test('rapid asynchronous action clicks submit once and keep their exact task link', async () => {
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    const action = { id: 'detect', label: '检测', method: 'POST', endpoint: '/operations', body: {}, watch: { endpoint: '/tasks/{response.taskId}', statusPath: 'status', terminal: ['completed'], success: ['completed'], taskPage: '/tasks?taskId={response.taskId}' } };
    const ui = await mount([{ type: 'actions', actions: [action] }], null, async method => method === 'post' ? { taskId: 'task-1' } : pending);
    try {
        await act(async () => { button('检测').click(); button('检测').click(); });
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
        await click(button('查看详情'));
        assert.deepEqual(settingsUI.navigated, ['/tasks?taskId=task-1']);
    } finally { release({ status: 'completed' }); await ui.close(); }
});

test('unknown business component names fail visibly instead of opening a dedicated page', async () => {
    const ui = await mount([{ type: 'unregistered-business-page' }], {});
    try { assert.match(document.body.textContent, /客户端暂不支持组件/); } finally { await ui.close(); }
});

test('removing a secret row explicitly removes its key from the saved map', async () => {
    const ui = await mount([resource()], { items: [{ id: 's3', title: '删除凭据', revision: 2, connection: { headers: { Authorization: '' } } }] });
    try {
        await click(button('编辑'));
        await click(document.querySelector('[aria-label="删除键"]'));
        await click(button('保存'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'patch')[2].connection.headers, {});
    } finally { await ui.close(); }
});

test('candidate publication uses backend-declared identity and version references', async () => {
    const publish = { id: 'publish', label: '发布候选', endpoint: '/fixtures/{item.id}/publish', method: 'POST', body: { candidateId: ref('item.candidateId'), revision: ref('item.revision') }, when: { left: ref('item.candidateId'), op: 'truthy' } };
    const ui = await mount([resource({ actions: [publish] })], { items: [{ id: 's4', title: '有候选', revision: 9, candidateId: 'candidate-9' }, { id: 's5', title: '无候选', revision: 1 }] });
    try {
        assert.equal([...document.querySelectorAll('button')].filter(node => node.textContent === '发布候选').length, 1);
        await click(button('发布候选'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post').slice(0, 3), ['post', '/fixtures/s4/publish', { candidateId: 'candidate-9', revision: 9 }]);
    } finally { await ui.close(); }
});

test('local field bindings preserve literal dotted keys and storage scope', async () => {
    let preferences = { 'custom.event': { toast: true } };
    const writes = [];
    const adapter = { read: async () => preferences, write: async (key, value, options) => { preferences = value; writes.push({ key, value, options }); }, invoke: async () => {}, subscribe: () => () => {} };
    const ui = await mount([{ type: 'switch', name: 'enabled', text: '动态偏好', storage: { key: 'preferences', scope: 'backend-user', path: ['custom.event', 'toast'] } }], {}, null, { client: adapter });
    try {
        const input = document.querySelector('input[type="checkbox"]');
        assert.equal(input.checked, true);
        await click(input);
        assert.deepEqual(preferences, { 'custom.event': { toast: false } });
        assert.equal(writes[0].options.scope, 'backend-user');
        assert.equal(settingsUI.changed.length, 1);
    } finally { await ui.close(); }
});

test('progress read failures keep the submitted task and retry only its status', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let offline = true;
    const action = { id: 'slow', label: '启动操作', method: 'POST', endpoint: '/operations', watch: { endpoint: '/tasks/{response.taskId}', terminal: ['completed'], success: ['completed'], taskPage: '/tasks?taskId={response.taskId}' } };
    const ui = await mount([{ type: 'actions', actions: [action] }], null, async method => {
        if (method === 'post') return { taskId: 'running-task' };
        if (offline) throw new Error('读取暂不可用');
        return { status: 'completed' };
    });
    try {
        await click(button('启动操作'));
        for (let attempt = 0; attempt < 3; attempt += 1) await act(async () => t.mock.timers.tick(10000));
        assert.ok(button('继续读取进度'));
        assert.ok(button('查看详情'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
        offline = false;
        await click(button('继续读取进度'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
        assert.equal(button('继续读取进度'), undefined);
    } finally { await ui.close(); t.mock.timers.reset(); }
});

test('rapid clicks reserve a confirmation action once and release it after cancellation', async () => {
    const ui = await mount([{ type: 'actions', actions: [{ id: 'danger', label: '删除资源', method: 'POST', endpoint: '/operations', confirm: { title: '确认删除？', confirmText: '确认删除' } }] }]);
    try {
        settingsUI.autoConfirm = false;
        await act(async () => { button('删除资源').click(); button('删除资源').click(); });
        assert.equal(settingsUI.confirmations.length, 1);
        assert.equal(settingsUI.calls.length, 0);
        await click(button('取消'));
        await click(button('删除资源'));
        assert.equal(settingsUI.confirmations.length, 2);
        await click(button('确认删除'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
    } finally { await ui.close(); }
});

test('an action opens a backend-described dialog with its own editable fields and scoped invocation', async () => {
    const descriptor = { title: '运行表单', options: [{ type: 'text', name: 'inputs.prompt', text: '动态参数', required: true }, { type: 'actions', actions: [{ id: 'run', label: '运行', endpoint: '/workflows/run', method: 'POST', body: { inputs: ref('form.inputs'), workflowId: ref('form.workflowId') } }] }], defaultOptions: { workflowId: 'graph-7', inputs: { prompt: '初始值' } } };
    const ui = await mount([{ type: 'actions', actions: [{ id: 'open', label: '准备运行', endpoint: '/workflows/graph-7/form', method: 'GET', effects: [{ type: 'open-dialog', value: ref('response') }] }] }], null, method => method === 'get' ? descriptor : { outputs: [] });
    try {
        await click(button('准备运行')); assert.ok(document.querySelector('[role="dialog"]'));
        await edit(document.querySelector('[aria-label="动态参数"]'), '我输入的新提示词'); await click(button('运行'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post').slice(0, 3), ['post', '/workflows/run', { inputs: { prompt: '我输入的新提示词' }, workflowId: 'graph-7' }]);
        await click(button('关闭')); assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('image upload previews are declared separately from the submitted artifact identity', async () => {
    const ui = await mount([{ type: 'image', name: 'pictureId', text: '头像预览', previewValue: ref('form.previousImage'), upload: { endpoint: '/upload', resultPath: 'id', previewPath: 'thumbnail' } }], null, () => ({ id: 'artifact-8', thumbnail: '/previews/new.png' }), {}, { pictureId: '', previousImage: '/previews/current.png' });
    try {
        assert.equal(document.querySelector('img').getAttribute('src'), '/previews/current.png');
        await upload(document.querySelector('input[type="file"]'), new Blob(['image']));
        assert.equal(document.querySelector('img').getAttribute('src'), '/previews/new.png');
        assert.equal(settingsUI.changed.at(-1).pictureId, 'artifact-8');
        assert.equal(settingsUI.changed.at(-1).previousImage, '/previews/current.png');
    } finally { await ui.close(); }
});

test('resource edit controls obey backend action visibility and disabled conditions', async () => {
    const page = resource({ actions: [{ kind: 'edit', label: '编辑权限', when: { left: ref('item.permission'), op: 'eq', right: 'manage' }, disabledWhen: { left: ref('item.locked'), op: 'truthy' } }] });
    const ui = await mount([page], { items: [{ id: 'view', title: '只读', permission: 'view' }, { id: 'locked', title: '锁定', permission: 'manage', locked: true }, { id: 'editable', title: '允许编辑', permission: 'manage' }] });
    try {
        const edits = [...document.querySelectorAll('button')].filter(node => node.textContent === '编辑权限');
        assert.equal(edits.length, 2); assert.equal(edits[0].disabled, true); assert.equal(edits[1].disabled, false);
        await click(edits[1]); assert.ok(document.querySelector('[role="dialog"]'));
    } finally { await ui.close(); }
});

test('readonly containers disable primitive, matrix and resource mutations consistently', async () => {
    const page = resource({ id: 'readonly-resource', create: { label: '创建资源' } });
    const ui = await mount([{ type: 'group', text: '只读组件树', readOnly: true, children: [{ type: 'text', name: 'title', text: '只读字段', default: '保持原值' }, { type: 'matrix', name: 'permissions', rows: [{ id: 'one', label: '选项' }], columns: [{ value: 'allow', label: '允许' }], bulkActions: [{ label: '全部设置', value: 'allow' }] }, page] }], { items: [{ id: 'r1', title: '记录' }] });
    try {
        assert.equal(document.querySelector('[aria-label="只读字段"]').matches(':disabled'), true);
        assert.equal(button('全部设置').disabled, true); assert.equal(button('创建资源').disabled, true); assert.equal(button('编辑').disabled, true);
        await click(button('全部设置')); await click(button('创建资源'));
        assert.equal(settingsUI.changed.length, 0); assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});
