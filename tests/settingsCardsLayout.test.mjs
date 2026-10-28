import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, upload, ref, resource, subscribeSettingsNavigation } from './helpers/settingsRuntimeHarness.mjs';
import { findSettingsField, pageValues, validateFields } from '../src/features/settings-runtime/model.js';

test('declared card title actions open only the clicked resource and leave destructive actions separate', async () => {
    const requests = [];
    const off = subscribeSettingsNavigation((request) => requests.push(request));
    const open = { id: 'configure', label: '配置工作区', effects: [{ type: 'open-settings', value: {
        pageId: 'workspace', endpoint: '/setting/resources/workspaces/connection', params: { connectionId: ref('item.id') },
    } }] };
    const ui = await mount([{ type: 'resource', id: 'devices', text: '设备连接', titleField: 'name', source: { endpoint: '/devices' },
        recordView: { type: 'connection-card', primaryAction: open }, actions: [open, { id: 'delete', label: '撤销设备', endpoint: '/devices/{item.id}', method: 'DELETE' }],
    }], [{ id: 'backend', name: '后端服务器' }, { id: 'agent-a', name: '远程设备 A' }]);
    try {
        await click(button('远程设备 A'));
        assert.equal(requests[0].params.connectionId, 'agent-a');
        assert.equal(settingsUI.calls.some(([method]) => method === 'delete'), false);
        assert.equal([...document.querySelectorAll('button')].filter((node) => node.textContent === '配置工作区').length, 2);
        await click(button('后端服务器'));
        assert.equal(requests[1].params.connectionId, 'backend');
    } finally { off(); await ui.close(); }
});

test('profile and form layouts preserve root field identity, defaults and required validation', () => {
    const nickname = { type: 'text', name: 'nickname', text: '昵称', default: '', required: true };
    const fields = [{ type: 'profile-card', name: 'visual-card', options: [{ type: 'form-layout', name: 'visual-layout', layout: 'compact', options: [nickname] }] }];
    assert.deepEqual(pageValues(fields), { nickname: '' });
    assert.equal(findSettingsField(fields, ['nickname']), nickname);
    assert.deepEqual(validateFields(fields, { nickname: '' }), { nickname: '昵称不能为空。' });
});

test('profile cards show one avatar upload and save edits through ordinary form actions', async () => {
    const config = [{
        type: 'profile-card', title: ref('form.username'), subtitle: ref('form.email'),
        meta: [{ label: '身份', value: ref('form.role') }],
        options: [
            { type: 'image', name: 'avatarId', text: '更换头像', slot: 'avatar', previewValue: ref('form.avatar'), upload: { endpoint: '/avatar', resultPath: 'serverId', previewPath: 'url' } },
        ],
    }, {
        type: 'group', text: '个人资料', variant: 'divided', children: [{ type: 'form-layout', layout: 'compact', options: [
            { type: 'text', name: 'nickname', text: '昵称', required: true },
            { type: 'action', label: '保存资料', icon: 'save', endpoint: '/profile', method: 'PATCH', body: { nickname: ref('form.nickname'), avatarId: ref('form.avatarId') } },
        ] }],
    }];
    const ui = await mount(config, {}, async (_method, endpoint) => endpoint === '/avatar' ? { serverId: 'new-image', url: '/previews/new-avatar.png' } : {}, {}, { username: 'demo', email: 'demo@example.test', role: '用户', nickname: '旧昵称', avatar: '/previews/avatar.png' });
    try {
        const card = document.querySelector('[data-settings-profile-card]');
        assert.equal(card.querySelectorAll('img').length, 1);
        assert.equal(card.querySelectorAll('input[type="file"]').length, 1);
        assert.equal(card.querySelector('[aria-label="昵称"]'), null);
        const nickname = document.querySelector('[aria-label="昵称"]');
        assert.equal(nickname.closest('[data-field-layout]').dataset.fieldLayout, 'compact');
        assert.match(nickname.closest('section').textContent, /个人资料.*保存资料/s);
        await edit(nickname, '新昵称');
        await upload(card.querySelector('input[type="file"]'), new window.File(['image'], 'avatar.png', { type: 'image/png' }));
        assert.equal(card.querySelectorAll('img').length, 1);
        assert.equal(card.querySelector('img').getAttribute('src'), '/previews/new-avatar.png');
        await click(button('保存资料'));
        assert.deepEqual(settingsUI.calls.find(([, endpoint]) => endpoint === '/profile').slice(0, 3), ['patch', '/profile', { nickname: '新昵称', avatarId: 'new-image' }]);
        assert.ok(button('保存资料').querySelector('[data-slot="action-icon"]'));
    } finally { await ui.close(); }
});

test('resource editors use stacked labels while preference rows keep their existing layout', async () => {
    const ui = await mount([
        { type: 'switch', name: 'enabled', text: '消息提醒', density: 'compact', default: true },
        resource(),
    ], { items: [{ id: 'one', title: '示例资源' }] });
    try {
        assert.equal(document.querySelector('[aria-label="消息提醒"]').closest('[data-field-layout]').dataset.fieldLayout, 'rows');
        await click(button('编辑'));
        const dialog = document.querySelector('[role="dialog"]');
        assert.equal(dialog.querySelector('[aria-label="名称"]').closest('[data-field-layout]').dataset.fieldLayout, 'stacked');
        await edit(dialog.querySelector('[aria-label="名称"]'), '尚未保存');
        await click(button('取消'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'patch').length, 0);
    } finally { await ui.close(); }
});

test('connection cards reuse resource actions and hide the action area when all actions are unavailable', async () => {
    const config = resource({
        titleField: 'title', columnsCount: 2,
        columns: [{ key: 'url', label: '地址' }, { key: 'enabled', label: '连接状态' }],
        recordView: { type: 'connection-card', state: { field: 'enabled', labels: { true: '已启用', false: '已停用' }, tones: { true: 'success', false: 'warning' } } },
        actions: [{ kind: 'edit', label: '编辑连接', icon: 'edit', when: { left: ref('item.permission'), op: 'eq', right: 'manage' } }],
    });
    const ui = await mount([config], { items: [{ id: 'view', title: '只读资源', enabled: false, url: 'https://example.test/long/resource/path', permission: 'view' }, { id: 'manage', title: '可管理资源', enabled: true, url: 'https://example.test', permission: 'manage' }] });
    try {
        const cards = [...document.querySelectorAll('[data-settings-connection-card]')];
        assert.equal(cards.length, 2);
        assert.match(cards[0].textContent, /只读资源.*已停用.*地址.*https:/s);
        assert.equal(cards[0].children.length, 1);
        assert.equal(cards[1].children.length, 2);
        assert.ok(button('编辑连接').querySelector('[data-slot="action-icon"]'));
        assert.equal(cards[0].textContent.includes('连接状态'), false);
        await click(button('编辑连接'));
        assert.equal(document.querySelector('[aria-label="名称"]').value, '可管理资源');
        await edit(document.querySelector('[aria-label="名称"]'), '新名称');
        await click(button('保存'));
        assert.equal(settingsUI.calls.filter(([method]) => method === 'get').length, 2);
        assert.equal(settingsUI.calls.find(([method]) => method === 'patch')[1], '/fixtures/manage');
    } finally { await ui.close(); }
});

test('standalone connection cards render references without creating another connection service', async () => {
    const ui = await mount([{ type: 'connection-card', title: ref('form.name'), state: { value: ref('form.state'), labels: { offline: '离线' }, tones: { offline: 'unknown-css' } }, fields: [{ label: '地址', value: ref('form.url') }] }], {}, null, {}, { name: '普通连接', state: 'offline', url: 'https://example.test' });
    try {
        assert.match(document.querySelector('[data-settings-connection-card]').textContent, /普通连接.*离线.*地址.*https:/s);
        assert.equal(document.querySelector('[title="离线"]').className.includes('unknown-css'), false);
        assert.equal(settingsUI.calls.length, 0);
        assert.equal(settingsUI.changed.length, 0);
    } finally { await ui.close(); }
});
