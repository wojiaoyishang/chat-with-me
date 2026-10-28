import test from 'node:test';
import assert from 'node:assert/strict';
import { mountSettingsPage, mount, button, click, edit, React, SettingPage, requestSettingsNavigation, subscribeSettingsNavigation } from './helpers/settingsRuntimeHarness.mjs';

const catalog = [{ id: 'workspace', name: 'Workspace 设置', scope: 'backend', descriptor: '/setting/tabs/workspace' }];
const listing = { schema: 'cwm.settings.v1', scope: 'backend', id: 'workspace', options: [{ type: 'info', text: '工作区列表' }], defaultOptions: {} };
const editor = { schema: 'cwm.settings.v1', scope: 'backend', id: 'workspace-editor', title: '新建工作区', cache: false, saveMode: 'page', layout: { maxWidth: 840 },
    returnTo: { pageId: 'workspace' }, options: [{ type: 'text', name: 'name', text: '名称', required: true }], defaultOptions: { name: '', conversationId: 'chat-test' },
    save: { id: 'create-workspace', label: '创建并挂载', endpoint: '/setting/actions/workspace/save', method: 'POST', body: { $ref: 'form' } } };
const handler = (_method, endpoint, body) => {
    if (endpoint === '/custom/settings-index') return catalog;
    if (endpoint === '/setting/tabs/workspace') return listing;
    if (endpoint === '/setting/resources/workspaces/editor') { assert.equal(body.params.conversationId, 'chat-test'); return editor; }
    if (endpoint === '/setting/actions/workspace/save') { assert.equal(body.conversationId, 'chat-test'); return { workspace: { id: 'created' } }; }
    throw new Error(`Unexpected request: ${endpoint}`);
};

test('generic resource actions navigate to server-defined editors without a request', async () => {
    const requests = [];
    const unsubscribe = subscribeSettingsNavigation((request) => requests.push(request));
    const ui = await mount([{ type: 'actions', actions: [{ id: 'configure', label: '新建', effects: [{ type: 'open-settings', value: { pageId: 'workspace', endpoint: '/setting/resources/workspaces/editor', params: { conversationId: 'chat-test' } } }] }] }]);
    try {
        await click(button('新建'));
        assert.equal(settingsUI.calls.length, 0);
        assert.equal(requests[0].pageId, 'workspace');
        assert.equal(requests[0].backend.id, 'default');
    } finally { unsubscribe(); await ui.close(); }
});

test('settings navigation opens the editor, saves conversation context, then returns to its parent', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        const navigationRequest = requestSettingsNavigation({ pageId: 'workspace', endpoint: '/setting/resources/workspaces/editor', params: { conversationId: 'chat-test' } });
        await ui.render(React.createElement(SettingPage, { open: true, navigationRequest, onClose: () => {} }));
        assert.ok(document.querySelector('[aria-label="名称"]'), JSON.stringify({ body: document.body.textContent, calls: settingsUI.calls, errors: settingsUI.errors }));
        assert.match(document.body.textContent, /新建工作区/);
        assert.equal(document.querySelector('#settings-page-panel > div').style.maxWidth, '840px');
        await edit(document.querySelector('[aria-label="名称"]'), '研究项目');
        await click(button('创建并挂载'));
        assert.match(document.body.textContent, /工作区列表/);
        assert.equal(document.querySelector('[aria-label="名称"]'), null);
        assert.equal(settingsUI.calls.filter(([method]) => method === 'post').length, 1);
    } finally { await ui.close(); }
});

test('canceling dirty editor navigation preserves the draft', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        const navigationRequest = requestSettingsNavigation({ pageId: 'workspace', endpoint: '/setting/resources/workspaces/editor', params: { conversationId: 'chat-test' } });
        await ui.render(React.createElement(SettingPage, { open: true, navigationRequest, onClose: () => {} }));
        await edit(document.querySelector('[aria-label="名称"]'), '保留草稿');
        settingsUI.autoConfirm = false;
        // Do not await the pending confirmation. Choosing cancel must retain the form.
        const pending = click(button('返回'));
        await new Promise((resolve) => setTimeout(resolve, 0));
        await click(button('取消'));
        await pending;
        assert.equal(document.querySelector('[aria-label="名称"]').value, '保留草稿');
    } finally { await ui.close(); }
});

test('a request belonging to another backend is not replayed', async () => {
    const ui = await mountSettingsPage(handler);
    try {
        const request = requestSettingsNavigation({ pageId: 'workspace', endpoint: '/setting/resources/workspaces/editor' });
        await ui.render(React.createElement(SettingPage, { open: true, navigationRequest: { ...request, backend: { ...request.backend, epoch: 99 } }, onClose: () => {} }));
        assert.equal(settingsUI.calls.some(([, endpoint]) => endpoint === '/setting/resources/workspaces/editor'), false);
    } finally { await ui.close(); }
});

test('saving a detail invalidates parent collections even without a WebSocket event', async () => {
    let records = [{ id: 'old', name: '已有工作区' }], reads = 0;
    const parent = { ...listing, options: [{ type: 'resource', id: 'managed', text: '工作区', source: { endpoint: '/managed', listPath: 'items' }, titleField: 'name', events: ['resource.changed'] }] };
    const ui = await mountSettingsPage((method, endpoint, body) => {
        if (endpoint === '/setting/tabs/workspace') return parent;
        if (endpoint === '/managed') { reads++; return { items: records }; }
        if (method === 'post') { records = [...records, { id: 'new', name: '新工作区' }]; return { saved: true }; }
        if (endpoint === '/setting/resources/workspaces/editor') return { ...editor, invalidateOnSave: ['resource.changed'] };
        return handler(method, endpoint, body);
    });
    try {
        await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
        assert.match(document.body.textContent, /已有工作区/);
        const navigationRequest = requestSettingsNavigation({ pageId: 'workspace', endpoint: '/setting/resources/workspaces/editor' });
        await ui.render(React.createElement(SettingPage, { open: true, navigationRequest, onClose: () => {} }));
        await edit(document.querySelector('[aria-label="名称"]'), '新工作区');
        await click(button('创建并挂载'));
        assert.match(document.body.textContent, /新工作区/);
        assert.equal(reads, 2);
    } finally { await ui.close(); }
});
