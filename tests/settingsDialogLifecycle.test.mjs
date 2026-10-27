import test from 'node:test';
import assert from 'node:assert/strict';

process.env.CWM_TEST_REAL_SETTINGS_DIALOGS = '1';
const { mount, mountBootstrapGate, resource, click, button, act, edit, ref } = await import('./helpers/settingsRuntimeHarness.mjs');

const resourceEditor = (extra = {}) => resource({
    create: { label: '添加用户' },
    editor: {
        title: '编辑用户', createTitle: '创建用户', description: '账户和工具分配',
        dialog: { width: 880 }, defaults: { title: '' },
        options: [{ type: 'text', name: 'title', text: '用户名' }],
        create: { id: 'create', endpoint: '/fixtures', method: 'POST', body: { title: ref('form.title') } },
        update: { id: 'save', endpoint: '/fixtures/{item.id}', method: 'PATCH', body: { title: ref('form.title') } },
        ...extra,
    },
});
const currentDialog = () => document.querySelector('[data-slot="dialog-content"]');
const animateExit = () => {
    const style = document.createElement('style');
    style.textContent = '[data-slot="dialog-content"][data-state="open"]{animation-name:enter;}[data-slot="dialog-content"][data-state="closed"]{animation-name:settings-exit;animation-duration:1s;}';
    document.head.append(style);
};
const finishExit = async () => act(async () => {
    for (const node of document.querySelectorAll('[data-slot="dialog-content"][data-state="closed"]')) {
        const event = new window.Event('animationend', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: 'settings-exit' });
        node.dispatchEvent(event);
    }
});
const field = () => currentDialog().querySelector('input');

for (const [name, width] of [['用户', 880], ['ComfyUI 工作流', 640], ['MCP 服务', 720], ['知识库连接', 640]]) test(`cancelling ${name} retains title, fields and width through its real Radix exit`, async () => {
    const ui = await mount([resourceEditor({ title: `编辑${name}`, createTitle: `创建${name}`, dialog: { width } })], { items: [{ id: 'one', title: 'original value' }] });
    animateExit();
    try {
        await click(button('编辑'));
        assert.equal(field().value, 'original value');
        const originalWidth = currentDialog().style.width;
        await click(button('取消'));
        const closing = currentDialog();
        assert.equal(closing.getAttribute('data-state'), 'closed');
        assert.equal(closing.querySelector('[data-slot="dialog-title"]').textContent, `编辑${name}`);
        assert.equal(field().value, 'original value');
        assert.equal(closing.style.width, originalWidth);
        await finishExit();
        assert.equal(currentDialog(), null);
        assert.equal(settingsUI.calls.filter(call => call[0] !== 'get').length, 0);
    } finally { await ui.close(); }
});

test('discarded creation values leave with the outgoing dialog and never enter the next edit', async () => {
    const guards = new Map();
    const ui = await mount([resourceEditor()], { items: [{ id: 'one', title: 'admin' }] }, null, {
        registerDraftGuard: (key, callback) => { guards.set(key, callback); return () => guards.delete(key); },
    });
    animateExit();
    try {
        await click(button('添加用户'));
        await edit(field(), 'discarded');
        assert.ok(guards.size > 0);
        await click(button('取消'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.equal(field().value, 'discarded');
        assert.equal(guards.size, 0);
        await click(button('编辑'));
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        assert.equal(field().value, 'admin');
        await finishExit();
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        assert.equal(field().value, 'admin');
    } finally { await ui.close(); }
});

test('saving preserves the outgoing editor and a late old save cannot close a newer editor', async () => {
    let complete;
    const rows = { items: [{ id: 'one', title: 'admin' }] };
    const ui = await mount([resourceEditor()], null, (method) => method === 'get' ? rows : new Promise(resolve => { complete = resolve; }));
    animateExit();
    try {
        await click(button('编辑'));
        await click(button('保存'));
        await click(button('取消'));
        await click(button('添加用户'));
        await edit(field(), 'new draft');
        await act(async () => complete({ saved: true }));
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        assert.match(currentDialog().querySelector('[data-slot="dialog-title"]').textContent, /创建用户/);
        assert.equal(field().value, 'new draft');
    } finally { complete?.({}); await ui.close(); }
});

test('a successful save closes with the original edit content until the animation finishes', async () => {
    const ui = await mount([resourceEditor()], { items: [{ id: 'one', title: 'admin' }] }, (method) => method === 'get' ? { items: [{ id: 'one', title: 'admin' }] } : { saved: true });
    animateExit();
    try {
        await click(button('编辑'));
        await edit(field(), 'saved');
        await click(button('保存'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.match(currentDialog().querySelector('[data-slot="dialog-title"]').textContent, /编辑用户/);
        assert.equal(field().value, 'saved');
        await finishExit();
        assert.equal(currentDialog(), null);
    } finally { await ui.close(); }
});

test('late errors and detail reads cannot write into another opening', async () => {
    let rejectSave, finishRead, detailSignal;
    let reads = 0;
    const ui = await mount([resourceEditor({ load: { endpoint: '/fixtures/{item.id}' } })], null, (method, endpoint, options) => {
        if (method === 'patch') return new Promise((_, reject) => { rejectSave = reject; });
        if (endpoint === '/fixtures') return { items: [{ id: 'one', title: 'admin' }] };
        reads += 1;
        if (reads === 1) { detailSignal = options.signal; return new Promise(resolve => { finishRead = resolve; }); }
        return { title: 'newest' };
    });
    animateExit();
    try {
        await click(button('编辑'));
        assert.match(currentDialog().querySelector('[role="status"]').textContent, /正在读取详情/);
        assert.equal(document.querySelector('[data-settings-test-toaster] [role="status"]'), null);
        await click(button('取消'));
        assert.equal(detailSignal.aborted, true);
        await click(button('编辑'));
        await act(async () => finishRead({ title: 'stale' }));
        assert.equal(field().value, 'newest');
        await click(button('保存'));
        await click(button('取消'));
        await click(button('添加用户'));
        await edit(field(), 'still mine');
        await act(async () => rejectSave(new Error('older save failed')));
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        assert.equal(field().value, 'still mine');
        assert.equal(currentDialog().querySelector('[role="alert"]'), null);
    } finally { await ui.close(); }
});

test('response-authored detail dialogs retain their description, values and size while closing', async () => {
    const ui = await mount([{ type: 'actions', actions: [{ id: 'details', label: '查看详情', endpoint: '/details', effects: [{ type: 'open-dialog', value: {
        title: '工作流参数', description: '本次运行的参数', dialog: { width: 420 },
        options: [{ type: 'text', name: 'note', text: '备注' }], defaultOptions: { note: '保持到退出结束' },
    } }] }] }], {});
    animateExit();
    try {
        await click(button('查看详情'));
        const width = currentDialog().style.width;
        await click(button('关闭'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.match(currentDialog().textContent, /工作流参数.*本次运行的参数/s);
        assert.equal(field().value, '保持到退出结束');
        assert.equal(currentDialog().style.width, width);
        await finishExit();
        assert.equal(currentDialog(), null);
    } finally { await ui.close(); }
});

test('offline connection management retains its resource content through its real Radix exit', async () => {
    const ui = await mountBootstrapGate(() => { throw new Error('后端离线'); });
    settingsUI.backendProfiles = [{ id: 'one', title: '已保存的离线连接', url: '/api' }];
    animateExit();
    try {
        assert.equal(currentDialog(), null);
        await click(button('管理连接'));
        assert.match(currentDialog().textContent, /已保存的离线连接/);
        await click(currentDialog().querySelector('[data-slot="dialog-close"]'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.match(currentDialog().textContent, /已保存的离线连接/);
        await finishExit();
        assert.equal(currentDialog(), null);
    } finally { await ui.close(); }
});
