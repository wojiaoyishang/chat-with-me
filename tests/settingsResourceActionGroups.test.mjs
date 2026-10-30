import test from 'node:test';
import assert from 'node:assert/strict';

process.env.CWM_TEST_REAL_SETTINGS_MENUS = '1';
const { mount, resource, click, button, act } = await import('./helpers/settingsRuntimeHarness.mjs');

const menuItem = (label) => [...document.querySelectorAll('[role="menuitem"]')].find((node) => node.textContent.trim() === label);
const openMenu = async () => {
    const trigger = document.querySelector('[aria-label="绑定操作"]');
    assert.ok(trigger);
    await act(async () => {
        trigger.focus();
        trigger.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    });
    assert.ok(document.querySelector('[role="menu"]'));
};
const grouped = (extra = {}) => resource({
    display: 'cards', recordView: { type: 'connection-card', actionLayout: 'split-menu', moreLabel: '绑定操作' },
    actions: [
        { id: 'contacts', label: '联系人与触发', icon: 'users', endpoint: '/fixtures/{item.id}/contacts', method: 'GET' },
        { id: 'templates', label: '回复模板', endpoint: '/fixtures/{item.id}/templates', method: 'GET' },
        { id: 'pause', label: '暂停接收', icon: 'pause', placement: 'menu', endpoint: '/fixtures/{item.id}/state', method: 'PATCH', body: { enabled: false }, when: { left: { $ref: 'item.enabled' }, op: 'eq', right: true } },
        { id: 'enable', label: '启用', icon: 'play', placement: 'menu', endpoint: '/fixtures/{item.id}/state', method: 'PATCH', body: { enabled: true }, when: { left: { $ref: 'item.enabled' }, op: 'eq', right: false } },
        { id: 'rescan', label: '重新扫码', icon: 'qr-code', placement: 'menu', endpoint: '/fixtures/{item.id}/rescan', method: 'POST' },
        { id: 'remove', label: '解除绑定', icon: 'unplug', tone: 'danger', placement: 'menu', endpoint: '/fixtures/{item.id}', method: 'DELETE', confirm: { title: '解除 {item.title} 的绑定？', description: '需要重新扫码才能再次使用。', danger: true } },
    ], ...extra,
});
const records = { items: [{ id: 'account-one', title: '微信一', enabled: true }] };

test('resource split menus keep common actions inline and reveal grouped actions through keyboard', async () => {
    const ui = await mount([grouped()], records);
    try {
        assert.ok(button('联系人与触发'));
        assert.ok(button('回复模板'));
        assert.equal(menuItem('暂停接收'), undefined);
        assert.equal(button('解除绑定'), undefined);
        const layout = document.querySelector('[data-settings-action-layout="split-menu"]');
        assert.ok(layout.classList.contains('flex-1'));
        assert.ok(layout.firstElementChild.classList.contains('flex-wrap'), 'inline actions wrap naturally at narrow widths');
        await openMenu();
        assert.ok(menuItem('暂停接收'));
        assert.equal(menuItem('启用'), undefined);
        assert.ok(menuItem('重新扫码').querySelector('[data-slot="action-icon"]'));
        assert.equal(menuItem('解除绑定').dataset.variant, 'destructive');
        assert.equal(document.querySelectorAll('[role="separator"]').length, 1);
        await act(async () => menuItem('重新扫码').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })));
        assert.equal(document.querySelector('[role="menu"]'), null);
        assert.equal(settingsUI.calls.filter(([method, url]) => method === 'post' && url === '/fixtures/account-one/rescan').length, 1);
    } finally { await ui.close(); }
});

test('menu actions retain record scope and shared in-flight exclusion when reopened', async () => {
    let finish;
    const ui = await mount([grouped()], {}, async (method, url) => method === 'get' ? records : new Promise((resolve) => { finish = resolve; }));
    try {
        await openMenu();
        await click(menuItem('暂停接收'));
        const calls = () => settingsUI.calls.filter(([method]) => method === 'patch');
        assert.equal(calls().length, 1);
        assert.equal(calls()[0][1], '/fixtures/account-one/state');
        assert.deepEqual(calls()[0][2], { enabled: false });
        await openMenu();
        assert.equal(menuItem('暂停接收').getAttribute('aria-busy'), 'true');
        assert.ok(menuItem('暂停接收').hasAttribute('data-disabled'));
        await click(menuItem('暂停接收'));
        assert.equal(calls().length, 1);
        await act(async () => finish({ updated: true }));
        assert.equal(menuItem('暂停接收').hasAttribute('data-disabled'), false);
    } finally { await ui.close(); }
});

test('dangerous menu actions preserve cancellation and confirmation without issuing early requests', async () => {
    const ui = await mount([grouped()], records);
    settingsUI.autoConfirm = false;
    try {
        await openMenu();
        await click(menuItem('解除绑定'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /解除 微信一 的绑定/);
        assert.equal(settingsUI.calls.filter(([method]) => method === 'delete').length, 0);
        await click(button('取消'));
        await openMenu();
        await click(menuItem('解除绑定'));
        await click(button('确认'));
        assert.equal(settingsUI.calls.filter(([method, url]) => method === 'delete' && url === '/fixtures/account-one').length, 1);
    } finally { await ui.close(); }
});

test('menu actions keep conflict and disabled-when restrictions, including editor actions', async () => {
    const ui = await mount([grouped({ actions: [
        { id: 'blocked', label: '不可用', placement: 'menu', endpoint: '/blocked', disabledWhen: { left: { $ref: 'item.enabled' }, op: 'eq', right: true } },
        { id: 'edit', kind: 'edit', label: '编辑绑定', placement: 'menu' },
        { id: 'conflict', label: '冲突操作', placement: 'menu', endpoint: '/conflict', method: 'POST' },
    ] })], {}, async (method, url) => {
        if (method === 'get') return records;
        if (url === '/conflict') throw Object.assign(new Error('版本已改变'), { code: 409 });
        return {};
    });
    try {
        await openMenu();
        assert.ok(menuItem('不可用').hasAttribute('data-disabled'));
        await click(menuItem('不可用'));
        assert.equal(settingsUI.calls.some(([, url]) => url === '/blocked'), false);
        await click(menuItem('冲突操作'));
        await openMenu();
        assert.ok(menuItem('冲突操作').hasAttribute('data-disabled'));
        await click(menuItem('编辑绑定'));
        assert.ok(document.querySelector('[role="dialog"]'));
        assert.equal(document.querySelector('[aria-label="名称"]').value, '微信一');
    } finally { await ui.close(); }
});

test('resources without split-menu metadata preserve all inline actions', async () => {
    const ui = await mount([grouped({ recordView: { type: 'connection-card' } })], records);
    try {
        assert.ok(button('暂停接收'));
        assert.ok(button('解除绑定'));
        assert.equal(document.querySelector('[aria-haspopup="menu"]'), null);
    } finally { await ui.close(); }
});
