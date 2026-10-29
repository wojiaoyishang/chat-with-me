import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, resource, click, button, edit, act } from './helpers/settingsRuntimeHarness.mjs';

test('resource toolbar actions share progress, duplicate-click protection and success feedback', async () => {
    const action = { id: 'probe-all', clientAction: 'backend.probe', label: '全部测速', icon: 'gauge', successText: '测速完成：{response.available} / {response.total} 可连接' };
    const ui = await mount([resource({ toolbarActions: [action], actions: [] })], { items: [] });
    let finish, report, signal;
    settingsUI.clientInvoke = (_, __, options) => {
        ({ onProgress: report, signal } = options);
        return new Promise(resolve => { finish = resolve; });
    };
    try {
        await click(button('全部测速'));
        assert.equal(button('全部测速').disabled, true);
        await click(button('全部测速'));
        assert.equal(settingsUI.clientCalls.length, 1);
        assert.equal(signal.aborted, false);
        await act(async () => report({ message: '正在测速后端… 1 / 3', percent: 100 / 3 }));
        const toast = document.querySelector('[data-settings-test-toaster]');
        assert.match(toast.textContent, /1 \/ 3/);
        assert.match(toast.textContent, /33%/);
        assert.equal(document.querySelector('section [role="status"]'), null);
        await act(async () => finish({ available: 2, total: 3 }));
        assert.match(toast.textContent, /测速完成：2 \/ 3 可连接/);
        assert.equal(button('全部测速').disabled, false);
    } finally { await ui.close(); }
});

test('closing the settings owner aborts local actions and ignores late progress', async () => {
    const ui = await mount([resource({ toolbarActions: [{ id: 'probe', clientAction: 'backend.probe', label: '全部测速' }], actions: [] })], { items: [] });
    let signal, report, finish;
    settingsUI.clientInvoke = (_, __, options) => {
        ({ onProgress: report, signal } = options);
        return new Promise(resolve => { finish = resolve; });
    };
    await click(button('全部测速'));
    await ui.close();
    assert.equal(signal.aborted, true);
    const events = settingsUI.toastEvents.length;
    await act(async () => { report({ message: '迟到的进度', percent: 100 }); finish({}); });
    assert.equal(settingsUI.toastEvents.length, events);
});

test('server-authored dialog save refreshes its owning collection and closes only that dialog', async () => {
    let title = '保存前';
    const page = resource({actions: [], toolbarActions: [{id: 'new', label: '配置规则', method: 'GET', endpoint: '/rule-editor',
        effects: [{type: 'open-dialog', value: {$ref: 'response'}}]}]});
    const ui = await mount([page], {}, async (method, url, body) => {
        if (url === '/fixtures') return {items: [{id: 'rule', title}]};
        if (url === '/rule-editor') return {title: '通用规则配置', dialog: {width: 600}, defaultOptions: {name: title}, options: [
            {type: 'text', name: 'name', text: '规则名称'}, {type: 'actions', actions: [{id: 'save', label: '保存规则',
                endpoint: '/rules/save', method: 'POST', body: {name: {$ref: 'form.name'}}, effects: [
                    {type: 'refresh', target: 'fixtures'}, {type: 'toast', message: '规则已保存'}, {type: 'close-dialog'}]}]}]};
        if (url === '/rules/save') { title = body.name; return {saved: true}; }
        throw new Error(`Unexpected request ${method} ${url}`);
    });
    try {
        await click(button('配置规则'));
        assert.ok(document.querySelector('[role="dialog"]'));
        await edit(document.querySelector('[aria-label="规则名称"]'), '保存后');
        await click(button('保存规则'));
        assert.equal(document.querySelector('[role="dialog"]'), null);
        assert.match(document.body.textContent, /保存后/);
        assert.equal(settingsUI.calls.filter(([method, url]) => method === 'get' && url === '/fixtures').length, 2);
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
    } finally { await ui.close(); }
});

test('connection cards use declared busy states and conditional diagnostics', async () => {
    const ui = await mount([resource({
        display: 'cards', actions: [],
        recordView: { type: 'connection-card', state: { field: 'status', labels: { checking: '测速中' }, busyValues: ['checking'] } },
        columns: [{ key: 'detail', label: '检测说明', when: { left: { $ref: 'item.detail' }, op: 'truthy' } }],
    })], { items: [{ id: 'one', title: '后端一', status: 'checking', detail: '' }, { id: 'two', title: '后端二', status: 'error', detail: 'HTTP 503' }] });
    try {
        const cards = [...document.querySelectorAll('[data-settings-connection-card]')];
        assert.ok(cards[0].querySelector('[data-slot="spinner"]'));
        assert.doesNotMatch(cards[0].textContent, /检测说明/);
        assert.match(cards[1].textContent, /检测说明.*HTTP 503/);
    } finally { await ui.close(); }
});

test('local snapshot updates refresh results without another collection-loading toast', async () => {
    const ui = await mount([resource({ source: { endpoint: 'client:backends', listPath: 'items' }, actions: [] })], {});
    try {
        const firstLoads = (settingsUI.toastEvents || []).filter(event => event.kind === 'loading').length;
        settingsUI.backendProfiles = [{ id: 'one', title: '已更新 · 42 ms' }];
        await act(async () => { for (const update of settingsUI.clientSubscribers) update(); });
        assert.match(document.querySelector('section').textContent, /42 ms/);
        assert.equal((settingsUI.toastEvents || []).filter(event => event.kind === 'loading').length, firstLoads);
    } finally { await ui.close(); }
});
