import test from 'node:test';
import assert from 'node:assert/strict';
import {
    mount, RemoteSettingsPanel, ReadonlyMarkdown, registerSettingsComponent,
    React, act, click, button, edit, resource,
} from './helpers/settingsRuntimeHarness.mjs';

const descriptor = (title = '服务器字段') => ({ schema: 'cwm.settings.v1', scope: 'backend',
    options: [{ type: 'text', name: 'name', text: title }], defaultOptions: { name: title } });
const panel = (props = {}) => React.createElement(RemoteSettingsPanel, {
    active: true, endpoint: '/remote/one', conversationId: 'one', ...props,
});
const wait = (milliseconds) => act(async () => new Promise((resolve) => setTimeout(resolve, milliseconds)));

test('remote panel loads server components only when open, retaining content during close and refreshing on reopen', async () => {
    let revision = 0;
    const ui = await mount([], null, () => descriptor(`字段${++revision}`));
    try {
        await ui.render(panel({ active: false }));
        assert.equal(settingsUI.calls.length, 0);
        await ui.render(panel());
        assert.equal(document.querySelector('[aria-label="字段1"]').value, '字段1');
        await ui.render(panel({ active: false }));
        assert.ok(document.querySelector('[aria-label="字段1"]'), 'outgoing content stays mounted for sidebar exit');
        assert.equal(document.querySelector('[data-remote-settings-panel]').getAttribute('data-state'), 'closed');
        assert.equal(document.querySelector('[aria-label="字段1"]').matches(':disabled'), true);
        await ui.render(panel());
        assert.equal(document.querySelector('[aria-label="字段2"]').value, '字段2');
        assert.equal(settingsUI.calls.length, 2);
    } finally { await ui.close(); }
});

test('switching target aborts the previous descriptor read and rejects late content', async () => {
    const requests = new Map();
    const ui = await mount([], null, (_method, endpoint, options) => new Promise((resolve) => requests.set(endpoint, { resolve, options })));
    try {
        await ui.render(panel());
        assert.ok(document.querySelector('[role="status"]'));
        await ui.render(panel({ endpoint: '/remote/two', conversationId: 'two' }));
        assert.equal(requests.get('/remote/one').options.signal.aborted, true);
        await act(async () => requests.get('/remote/two').resolve(descriptor('当前会话')));
        await act(async () => requests.get('/remote/one').resolve(descriptor('旧会话')));
        assert.ok(document.querySelector('[aria-label="当前会话"]'));
        assert.equal(document.querySelector('[aria-label="旧会话"]'), null);
    } finally { await ui.close(); }
});

test('load errors stay in the panel and can retry without a loading toast', async () => {
    let calls = 0;
    const ui = await mount([], null, () => { if (++calls === 1) throw new Error('暂时断开'); return descriptor(); });
    try {
        await ui.render(panel());
        assert.match(document.querySelector('[role="alert"]').textContent, /暂时断开/);
        await click(button('重试'));
        assert.ok(document.querySelector('[aria-label="服务器字段"]'));
        assert.equal(settingsUI.toastEvents?.some((event) => event.kind === 'loading') || false, false);
    } finally { await ui.close(); }
});

test('a synchronously changed backend cannot receive an old panel action before React processes its notification', async () => {
    const page = { ...descriptor(), options: [{ type: 'actions', actions: [
        { id: 'apply', label: '发送设置', endpoint: '/remote/apply', method: 'POST', body: { value: 'old' } },
    ] }] };
    const ui = await mount([], null, () => page);
    try {
        await ui.render(panel());
        settingsUI.connection = { id: 'other', url: 'https://other.invalid/api', epoch: 1 };
        await click(button('发送设置'));
        assert.deepEqual(settingsUI.calls.map((call) => call[1]), ['/remote/one']);
        await act(async () => { for (const listener of settingsUI.backendSubscribers) listener(); });
        assert.match(document.querySelector('[role="alert"]').textContent, /后端连接已切换/);
        assert.equal(settingsUI.calls.length, 1);
    } finally { await ui.close(); }
});

test('resource polling retains an open editor draft and stops reads when the panel closes', async () => {
    let reads = 0;
    const page = { ...descriptor(), options: [resource({ refreshIntervalMs: 500 })] };
    const ui = await mount([], null, (_method, endpoint) => endpoint === '/remote/one' ? page : {
        items: [{ id: 'one', title: `服务器名称${++reads}` }],
    });
    const ref = React.createRef();
    try {
        await ui.render(panel({ ref }));
        await click(button('编辑'));
        await edit(document.querySelector('[aria-label="名称"]'), '未保存草稿');
        await wait(570);
        assert.ok(reads >= 2);
        assert.equal(document.querySelector('[aria-label="名称"]').value, '未保存草稿');
        await act(async () => assert.equal(await ref.current.canClose(), true));
        assert.match(settingsUI.confirmations.at(-1).title, /放弃未保存/);
        await ui.render(panel({ ref, active: false }));
        const closedReads = reads;
        await wait(570);
        assert.equal(reads, closedReads);
    } finally { await ui.close(); }
});

test('readonly markdown displays results without chat directives, raw HTML, image requests, or editable tasks', async () => {
    const unregister = registerSettingsComponent('readonly-markdown', ReadonlyMarkdown);
    const text = '# 独立结果\n\n- [x] 已完成\n\n```esc[doc]\n{{replace id=secret}}\n```\n\n<img src="bad" onerror="alert(1)">\n\n![不自动请求](https://private.invalid/image.png)\n\n[危险链接](javascript:alert(1))';
    const ui = await mount([{ type: 'readonly-markdown', name: 'result', text: '生成结果' }], null, null, {}, { result: text });
    try {
        assert.equal(document.querySelector('h1').textContent, '独立结果');
        assert.equal(document.querySelector('img'), null);
        assert.equal(document.querySelector('input').disabled, true);
        assert.equal(document.querySelector('input').readOnly, true);
        assert.match(document.querySelector('code').textContent, /replace id=secret/);
        assert.equal(document.querySelector('a').getAttribute('href'), '');
        assert.equal(document.querySelector('[data-tool-call]'), null);
        await click(document.querySelector('[aria-label="复制生成结果"]'));
        assert.equal(settingsUI.copied.at(-1), text);
        assert.equal(settingsUI.calls.length, 0);
    } finally { await ui.close(); unregister(); }
});

test('an optional initial detail is opened once while background resource polling never reopens a dismissed dialog', async () => {
    const root = { ...descriptor(), options: [resource({ refreshIntervalMs: 500 })] };
    const detail = { title: '独立详情', options: [{ type: 'readonly-text', name: 'body', text: '结果' }], defaultOptions: { body: '只在独立记录中展示' } };
    const ui = await mount([], null, (_method, endpoint) => endpoint === '/remote/one' ? root : endpoint === '/remote/detail' ? detail : { items: [] });
    try {
        await ui.render(panel({ initialDetailEndpoint: '/remote/detail' }));
        assert.match(document.querySelector('[role="dialog"]').textContent, /独立详情.*只在独立记录中展示/s);
        await click(button('关闭'));
        await wait(620);
        assert.equal(document.querySelector('[role="dialog"]'), null);
        assert.equal(settingsUI.calls.filter((call) => call[1] === '/remote/detail').length, 1);
    } finally { await ui.close(); }
});

test('a delayed initial detail is aborted with its panel and cannot open on another target', async () => {
    let resolveDetail, detailSignal;
    const ui = await mount([], null, (_method, endpoint, options) => {
        if (endpoint === '/remote/detail') { detailSignal = options.signal; return new Promise((resolve) => { resolveDetail = resolve; }); }
        return descriptor(endpoint);
    });
    try {
        await ui.render(panel({ initialDetailEndpoint: '/remote/detail' }));
        await ui.render(panel({ endpoint: '/remote/two', conversationId: 'two' }));
        assert.equal(detailSignal.aborted, true);
        await act(async () => resolveDetail({ title: '旧详情', options: [] }));
        assert.equal(document.querySelector('[role="dialog"]'), null);
        assert.ok(document.querySelector('[aria-label="/remote/two"]'));
    } finally { await ui.close(); }
});

test('response-authored edit dialogs protect unsaved drafts when an external focus tries to leave the panel', async () => {
    const ref = React.createRef();
    const detail = { title: '配置规则', options: [{ type: 'text', name: 'title', text: '规则名称' }], defaultOptions: { title: '原名称' } };
    const ui = await mount([], null, (_method, endpoint) => endpoint === '/remote/detail' ? detail : descriptor());
    try {
        await ui.render(panel({ ref, initialDetailEndpoint: '/remote/detail' }));
        await edit(document.querySelector('[aria-label="规则名称"]'), '未保存的名称');
        settingsUI.autoConfirm = false;
        let allowed;
        await act(async () => { void ref.current.canClose().then((value) => { allowed = value; }); });
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /放弃未保存/);
        await click(button('取消'));
        assert.equal(allowed, false);
        assert.equal(document.querySelector('[aria-label="规则名称"]').value, '未保存的名称');
    } finally { await ui.close(); }
});
