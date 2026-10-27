import test from 'node:test';
import assert from 'node:assert/strict';
import { mountSettingsPage, button, click, edit, ref, act } from './helpers/settingsRuntimeHarness.mjs';

const catalog = [{ id: 'external-plugin', name: '插件提供的设置', descriptor: '/custom/page-definition' }];
const page = { schema: 'cwm.settings.v1', id: 'external-plugin', title: '自定义组件树', saveMode: 'page', options: [{ type: 'text', name: 'nested.title', text: '自定义字段' }], defaultOptions: { nested: { title: '服务器初值' } }, save: { id: 'save', label: '应用配置', endpoint: '/custom/save-definition', method: 'POST', body: { setting: ref('form.nested.title') } } };

test('the settings shell loads its declared catalog and page URL then saves declared fields', async () => {
    const ui = await mountSettingsPage((method, url) => method === 'post' ? { values: { nested: { title: '新值' } } } : url === '/custom/settings-index' ? catalog : page);
    try {
        assert.deepEqual(settingsUI.calls.slice(0, 2).map(([, url]) => url), ['/custom/settings-index', '/custom/page-definition']);
        assert.equal(document.querySelector('[aria-label="自定义字段"]').value, '服务器初值');
        assert.equal(button('应用配置').disabled, true);
        await edit(document.querySelector('[aria-label="自定义字段"]'), '新值'); await click(button('应用配置'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post').slice(0, 3), ['post', '/custom/save-definition', { setting: '新值' }]);
        assert.equal(button('应用配置').disabled, true);
    } finally { await ui.close(); }
});

test('missing manifest settings capability is visible and never calls a legacy endpoint', async () => {
    const ui = await mountSettingsPage(() => [], null);
    try { assert.match(document.body.textContent, /没有提供设置功能/); assert.equal(settingsUI.calls.length, 0); } finally { await ui.close(); }
});

test('save conflicts retain the active draft and confirmation portals do not close the page', async () => {
    const ui = await mountSettingsPage((method, url) => { if (method === 'post') throw Object.assign(new Error('修改版本冲突'), { code: 409 }); return url === '/custom/settings-index' ? catalog : page; });
    try {
        await edit(document.querySelector('[aria-label="自定义字段"]'), '仍需保留的草稿'); await click(button('应用配置'));
        assert.equal(document.querySelector('[aria-label="自定义字段"]').value, '仍需保留的草稿'); assert.match(document.body.textContent, /修改版本冲突/);
        settingsUI.autoConfirm = false; await click(document.querySelector('[aria-label="关闭设置"]'));
        assert.ok(document.querySelector('[role="alertdialog"]')); await click(button('取消'));
        assert.equal(settingsUI.closed, undefined); assert.equal(settingsUI.confirmations.length, 1);
        assert.equal(document.querySelector('[aria-label="自定义字段"]').value, '仍需保留的草稿');
    } finally { await ui.close(); }
});

test('a delayed descriptor response cannot replace the subsequently selected page', async () => {
    let release;
    const delayed = new Promise(resolve => { release = resolve; });
    const ui = await mountSettingsPage((_method, url) => url === '/custom/settings-index' ? [...catalog, { id: 'other', name: '另一个页面', descriptor: '/custom/other' }] : url === '/custom/page-definition' ? delayed : { ...page, id: 'other', title: '正确页面', save: undefined, saveMode: 'actions' });
    try {
        await click(button('另一个页面')); await act(async () => release({ ...page, title: '过期页面' }));
        assert.match(document.body.textContent, /正确页面/); assert.doesNotMatch(document.body.textContent, /过期页面/); assert.equal(button('应用配置'), undefined);
    } finally { await ui.close(); }
});
