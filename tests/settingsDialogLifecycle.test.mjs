import test from 'node:test';
import assert from 'node:assert/strict';

process.env.CWM_TEST_REAL_SETTINGS_DIALOGS = '1';
const { mount, mountSettingsPage, mountBootstrapGate, resource, click, button, act, edit, ref, React, DynamicSettings, registerSettingsComponent } = await import('./helpers/settingsRuntimeHarness.mjs');

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

test('closing a resource editor retains its form without rendering the fields or background records again', async () => {
    let fieldRenders = 0;
    let titleReads = 0;
    registerSettingsComponent('dialog-render-probe', () => { fieldRenders += 1; return React.createElement('p', null, 'expensive field'); });
    const row = { id: 'one', get title() { titleReads += 1; return 'original'; } };
    const ui = await mount([resourceEditor({ options: [
        { type: 'text', name: 'title', text: '用户名' }, { type: 'dialog-render-probe', name: 'graph' },
    ] })], { items: [row] });
    animateExit();
    try {
        await click(button('编辑'));
        await edit(field(), 'changed');
        const renders = fieldRenders;
        const reads = titleReads;
        await click(button('取消'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.equal(field().value, 'changed');
        assert.equal(fieldRenders, renders, 'the outgoing form must be reused throughout exit');
        assert.equal(titleReads, reads, 'draft changes and exit must not re-read the background records');
        await finishExit();
        await click(button('编辑'));
        assert.equal(field().value, 'original');
        assert.ok(fieldRenders > renders, 'a fresh opening must mount a fresh form');
    } finally { await ui.close(); }
});

test('echoing the current form value does not serialize a large object for equality checks', async () => {
    let serializations = 0;
    const graph = { nodes: Array.from({ length: 500 }, (_, id) => ({ id })), toJSON() { serializations += 1; return { nodes: this.nodes }; } };
    registerSettingsComponent('dialog-echo-probe', ({ onChange }) => React.createElement('button', { onClick: () => onChange(graph) }, '更新图数据'));
    const config = [{ type: 'dialog-echo-probe', name: 'graph' }];
    const runtimeContext = {};
    function EchoForm() {
        const [values, setValues] = React.useState({});
        return React.createElement(DynamicSettings, { config, runtimeContext, initialValues: values, onChange: setValues });
    }
    const ui = await mount([]);
    try {
        await ui.render(React.createElement(EchoForm));
        await click(button('更新图数据'));
        assert.equal(serializations, 0);
    } finally { await ui.close(); }
});

test('a newer opening supersedes an interrupted large-form render', { timeout: 5000 }, async () => {
    let resume;
    let ready = false;
    const pending = new Promise(resolve => { resume = resolve; });
    registerSettingsComponent('interrupted-editor-probe', ({ context }) => {
        if (context.item?.id === 'one' && !ready) throw pending;
        return React.createElement('p', null, `record: ${context.item?.id}`);
    });
    const ui = await mount([resourceEditor({ options: [
        { type: 'text', name: 'title', text: '用户名' }, { type: 'interrupted-editor-probe', name: 'graph' },
    ] })], { items: [{ id: 'one', title: 'old' }, { id: 'two', title: 'new' }] });
    try {
        const edits = [...document.querySelectorAll('button')].filter(node => node.textContent.trim() === '编辑');
        await click(edits[0]);
        assert.equal(currentDialog(), null, 'the unfinished form must not replace the usable parent window');
        await click(edits[1]);
        assert.equal(field().value, 'new');
        await act(async () => { ready = true; resume(); });
        assert.equal(field().value, 'new');
        assert.match(currentDialog().textContent, /record: two/);
    } finally { ready = true; resume(); await ui.close(); }
});

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
    let renders = 0;
    registerSettingsComponent('detail-render-probe', () => { renders += 1; return React.createElement('p', null, 'detail field'); });
    const ui = await mount([{ type: 'actions', actions: [{ id: 'details', label: '查看详情', endpoint: '/details', effects: [{ type: 'open-dialog', value: {
        title: '工作流参数', description: '本次运行的参数', dialog: { width: 420 },
        options: [{ type: 'text', name: 'note', text: '备注' }, { type: 'detail-render-probe', name: 'graph' }], defaultOptions: { note: '保持到退出结束' },
    } }] }] }], {});
    animateExit();
    try {
        await click(button('查看详情'));
        const width = currentDialog().style.width;
        const openingRenders = renders;
        await click(button('关闭'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        assert.match(currentDialog().textContent, /工作流参数.*本次运行的参数/s);
        assert.equal(field().value, '保持到退出结束');
        assert.equal(currentDialog().style.width, width);
        assert.equal(renders, openingRenders, 'closing a detail window must reuse the outgoing fields');
        await finishExit();
        assert.equal(currentDialog(), null);
    } finally { await ui.close(); }
});

const enrollmentAction = {
    id: 'enroll', label: '生成连接凭据', endpoint: '/setting/actions/workspace/enrollment', method: 'POST',
    body: { expiresMinutes: ref('form.expiresMinutes') }, retainResponse: false,
    effects: [{ type: 'open-dialog', value: {
        title: '远程设备连接凭据', description: '关闭后无法再次查看。', dialog: { width: 640, dismissible: false },
        options: [
            { type: 'readonly-text', name: 'command', text: '设备启动命令', copyable: true, monospace: true },
            { type: 'readonly-text', name: 'token', text: '一次性凭据', copyable: true, monospace: true },
            { type: 'readonly-text', name: 'expiresAt', text: '有效期至', format: 'datetime' },
        ],
        defaultOptions: { command: ref('response.command'), token: ref('response.token'), expiresAt: ref('response.expiresAt') },
    } }],
};
const enrollmentFields = [
    { type: 'number', name: 'expiresMinutes', text: '有效期', default: 10 },
    { type: 'actions', actions: [enrollmentAction] },
];

test('one-time result remains only in its locked dialog and supports explicit copying', async () => {
    const snapshots = [];
    registerSettingsComponent('credential-operation-probe', ({ context }) => { snapshots.push(JSON.stringify(context.operations)); return null; });
    const ui = await mount([...enrollmentFields, { type: 'credential-operation-probe' }], null,
        () => ({ command: 'agent --token-stdin', token: 'cwm_enroll_test_secret', expiresAt: '2026-10-28T09:00:00Z' }));
    animateExit();
    try {
        await click(button('生成连接凭据'));
        assert.deepEqual(settingsUI.calls[0].slice(0, 3), ['post', '/setting/actions/workspace/enrollment', { expiresMinutes: 10 }]);
        const dialog = currentDialog();
        assert.match(dialog.textContent, /关闭后无法再次查看/);
        assert.equal(dialog.getAttribute('aria-modal'), 'true');
        assert.equal(dialog.querySelector('[aria-label="设备启动命令"]').textContent, 'agent --token-stdin');
        assert.equal(dialog.querySelector('[aria-label="一次性凭据"]').textContent, 'cwm_enroll_test_secret');
        assert.equal(document.querySelector('[data-slot="dialog-overlay"][data-state="open"]').style.pointerEvents, 'auto');
        const overlay = document.querySelector('[data-slot="dialog-overlay"][data-state="open"]');
        await act(async () => { overlay.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true, button: 0 })); });
        await act(async () => document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        await act(async () => button('生成连接凭据').focus());
        assert.ok(dialog.contains(document.activeElement), 'keyboard focus remains inside the locked dialog');
        await click(dialog.querySelector('[aria-label="复制设备启动命令"]'));
        await click(dialog.querySelector('[aria-label="复制一次性凭据"]'));
        assert.deepEqual(settingsUI.copied, ['agent --token-stdin', 'cwm_enroll_test_secret']);
        settingsUI.copyError = true;
        await click(dialog.querySelector('[aria-label="复制一次性凭据"]'));
        assert.match(settingsUI.errors.at(-1)[0], /复制失败/);
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        assert.equal(settingsUI.calls.length, 1);
        assert.ok(snapshots.every(value => !value.includes('cwm_enroll_test_secret')), 'operation state must not retain the response');
        assert.ok(settingsUI.changed.every(value => !JSON.stringify(value).includes('cwm_enroll_test_secret')), 'parent form must not retain the credential');
        await click(button('关闭'));
        assert.equal(currentDialog().getAttribute('data-state'), 'closed');
        await finishExit();
        assert.equal(currentDialog(), null);
        assert.doesNotMatch(document.body.textContent, /cwm_enroll_test_secret/);
    } finally { await ui.close(); }
});

test('a locked detail dialog prevents the enclosing settings window from closing or switching pages', async () => {
    const catalog = [{ scope: 'backend', id: 'enrollment', name: '设备注册', descriptor: '/settings/enrollment' }];
    const page = { schema: 'cwm.settings.v1', scope: 'backend', id: 'enrollment', saveMode: 'actions', options: enrollmentFields, defaultOptions: { expiresMinutes: 10 } };
    const ui = await mountSettingsPage((_method, endpoint) => endpoint === '/custom/settings-index' ? catalog
        : endpoint === '/settings/enrollment' ? page : { command: 'agent', token: 'secret', expiresAt: '2026-10-28T09:00:00Z' });
    animateExit();
    try {
        await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
        await click(button('生成连接凭据'));
        await click(document.querySelector('[aria-label="关闭设置"]'));
        assert.equal(settingsUI.closed, undefined);
        await click(document.querySelector('[role="tab"][aria-label="前端设置"]'));
        assert.equal(document.querySelector('[role="tab"][aria-label="后端设置"]').getAttribute('aria-selected'), 'true');
        assert.equal(currentDialog().getAttribute('data-state'), 'open');
        await click(button('关闭'));
        await finishExit();
        await click(document.querySelector('[aria-label="关闭设置"]'));
        assert.equal(settingsUI.closed, true);
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
