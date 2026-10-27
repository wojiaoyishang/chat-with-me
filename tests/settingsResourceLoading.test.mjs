import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, resource, click, button, act } from './helpers/settingsRuntimeHarness.mjs';

test('inline resource loading remains in its own card and retains records during refresh', async () => {
    let complete;
    const ui = await mount([resource({ loadingMode: 'inline' })], null, () => new Promise(resolve => { complete = resolve; }));
    try {
        assert.ok(document.querySelector('section [role="status"] [data-slot="spinner"]'));
        assert.equal(document.querySelector('[data-settings-test-toaster] [role="status"]'), null);
        await act(async () => complete({ items: [{ id: 'one', title: '保留原条目' }] }));
        assert.equal(document.querySelector('section [role="status"]'), null);
        await click(document.querySelector('[aria-label="刷新列表"]'));
        assert.match(document.querySelector('section').textContent, /保留原条目/);
        assert.ok(document.querySelector('section [role="status"]'));
        await act(async () => complete({ items: [{ id: 'two', title: '新条目' }] }));
        assert.match(document.querySelector('section').textContent, /新条目/);
        assert.equal(settingsUI.toastEvents?.some(event => event.kind === 'loading') || false, false);
    } finally { await ui.close(); }
});

test('an inline failed read can be retried in its card without an additional toast', async () => {
    let failed = true;
    const ui = await mount([resource({ loadingMode: 'inline' })], null, () => { if (failed) throw new Error('设备读取失败'); return { items: [] }; });
    try {
        assert.match(document.querySelector('section [role="alert"]').textContent, /设备读取失败/);
        assert.equal(document.querySelector('[data-settings-test-toaster] [role="alert"]'), null);
        failed = false;
        await click(button('重新加载'));
        assert.match(document.querySelector('section').textContent, /暂无数据/);
        assert.equal(document.querySelector('section [role="alert"]'), null);
    } finally { await ui.close(); }
});
