import test from 'node:test';
import assert from 'node:assert/strict';
import { mountSettingsPage, SettingPage, React, act, button, click, edit, ref, resource } from './helpers/settingsRuntimeHarness.mjs';

const directory = [{ scope: 'backend', id: 'fixture', name: '测试设置', descriptor: '/fixtures/page' }];
const page = { schema: 'cwm.settings.v1', scope: 'backend', id: 'fixture', saveMode: 'actions', options: [resource()], defaultOptions: {} };
const requestCount = path => settingsUI.calls.filter(([, url]) => url === path).length;
const backend = () => click(document.querySelector('[aria-label="后端设置"]'));
const frontend = () => click(document.querySelector('[aria-label="前端设置"]'));
const handler = (_method, path) => path === '/custom/settings-index' ? directory : path === '/fixtures/page' ? page : { items: [{ id: 'one', title: '已加载条目' }] };

test('successful page and resource data are reused until a settings window closes', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        await backend();
        assert.match(document.body.textContent, /已加载条目/);
        await frontend(); await backend();
        for (const path of ['/custom/settings-index', '/fixtures/page', '/fixtures']) assert.equal(requestCount(path), 1);
        await click(document.querySelector('[aria-label="刷新列表"]'));
        assert.equal(requestCount('/fixtures'), 2);
        await ui.render(React.createElement(SettingPage, { open: false, onClose: () => {} }));
        await ui.render(React.createElement(SettingPage, { open: true, onClose: () => {} }));
        assert.equal(requestCount('/fixtures/page'), 2);
        assert.equal(requestCount('/fixtures'), 3);
    } finally { await ui.close(); }
});

test('disabling the cache refetches descriptors and records when revisiting', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        await backend(); await frontend();
        await click(document.querySelector('[aria-label="缓存已加载的设置页"]'));
        await backend(); await frontend(); await backend();
        assert.equal(requestCount('/fixtures/page'), 3);
        assert.equal(requestCount('/fixtures'), 3);
    } finally { await ui.close(); }
});

test('failed descriptors are retried and typed credentials are not cached as server snapshots', async () => {
    let failed = true;
    const secretPage = { ...page, options: [{ type: 'text', name: 'token', inputType: 'password', text: '令牌' }], defaultOptions: { token: '' } };
    const ui = await mountSettingsPage((_method, path) => {
        if (path === '/custom/settings-index') return directory;
        if (failed) throw new Error('暂时无法读取');
        return secretPage;
    });
    try {
        await backend(); assert.match(document.body.textContent, /暂时无法读取/);
        await frontend(); failed = false; await backend();
        assert.equal(requestCount('/fixtures/page'), 2);
        await edit(document.querySelector('[aria-label="令牌"]'), 'unsaved-private-value');
        await frontend(); await backend();
        assert.equal(document.querySelector('[aria-label="令牌"]').value, '');
        assert.equal(requestCount('/fixtures/page'), 2);
    } finally { await ui.close(); }
});

test('a connection epoch change discards the previous descriptor and records', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        await backend();
        await act(async () => {
            settingsUI.connection = { id: 'other', url: '/other-api', epoch: 1, title: '另一个后端' };
            for (const notify of settingsUI.backendSubscribers) notify();
        });
        assert.equal(requestCount('/fixtures/page'), 2);
        assert.equal(requestCount('/fixtures'), 2);
    } finally { await ui.close(); }
});

test('a saved server snapshot is reused and success feedback is emitted once', async () => {
    const savedPage = { ...page, saveMode: 'page', options: [{ type: 'text', name: 'title', text: '标题' }], defaultOptions: { title: '初值' }, save: { id: 'save', label: '保存配置', successText: '保存完成', method: 'POST', endpoint: '/fixtures/save', body: { title: ref('form.title') } } };
    const ui = await mountSettingsPage((method, path) => path === '/custom/settings-index' ? directory : method === 'post' ? { defaultOptions: { title: '服务器归一化值' } } : savedPage);
    try {
        await backend();
        await edit(document.querySelector('[aria-label="标题"]'), '新值');
        await click(button('保存配置'));
        assert.equal(settingsUI.successes.length, 1);
        await frontend(); await backend();
        assert.equal(document.querySelector('[aria-label="标题"]').value, '服务器归一化值');
        assert.equal(requestCount('/fixtures/page'), 1);
    } finally { await ui.close(); }
});
