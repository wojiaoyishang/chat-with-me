import test from 'node:test';
import assert from 'node:assert/strict';
import { getSettingsDialogStyle } from '../src/features/settings-runtime/dialogSizing.js';
import { mount, button, click, resource, ref } from './helpers/settingsRuntimeHarness.mjs';

test('dialog dimensions accept bounded pixel numbers and always constrain the viewport', () => {
    const style = getSettingsDialogStyle({ width: 640, maxHeight: 720 });
    assert.equal(style.width, '640px');
    assert.equal(style.maxWidth, 'calc(100vw - 2rem)');
    assert.equal(style.maxHeight, 'min(720px, calc(100dvh - 2rem))');
    assert.equal(getSettingsDialogStyle({ width: '10000px;position:fixed' }, 960).width, '960px');
    assert.equal(getSettingsDialogStyle({ width: 999999 }).width, '1600px');
    assert.equal(getSettingsDialogStyle({ width: NaN }).maxHeight, '90dvh');
});

test('resource editors and returned dialogs each use their declared dimensions', async () => {
    const page = resource();
    page.editor.dialog = { width: 560, maxHeight: 620 };
    const ui = await mount([page, { type: 'actions', actions: [{
        id: 'details', label: '打开详情', method: 'GET', endpoint: '/details',
        effects: [{ type: 'open-dialog', value: ref('response') }],
    }] }], null, async (_method, endpoint) => endpoint === '/details'
        ? { title: '动态详情', dialog: { width: 700 }, options: [] }
        : { items: [{ id: 'one', title: '示例' }] });
    try {
        await click(button('编辑'));
        let dialog = document.querySelector('[role="dialog"]');
        assert.match(dialog.style.width, /560px/);
        assert.match(dialog.style.maxWidth, /100vw/);
        await click(button('取消'));
        await click(button('打开详情'));
        dialog = document.querySelector('[role="dialog"]');
        assert.match(dialog.style.width, /700px/);
        assert.match(dialog.textContent, /动态详情/);
    } finally { await ui.close(); }
});
