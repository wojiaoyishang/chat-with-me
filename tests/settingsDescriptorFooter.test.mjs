import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref } from './helpers/settingsRuntimeHarness.mjs';

const detail = (selected = '') => ({
    title: '配置触发器', dialog: { width: 580 }, layout: 'stacked',
    options: [
        { type: 'select', name: 'conversationId', text: '目标会话', required: true, placeholder: '请选择目标会话', options: [{ value: 'chat-one', label: '我的对话' }] },
        { type: 'text', name: 'instruction', text: '要求' },
    ],
    defaultOptions: { conversationId: selected, instruction: '旧要求' },
    footerActions: [{ id: 'save', label: '保存触发规则', endpoint: '/save-trigger', method: 'POST', body: { conversationId: ref('form.conversationId'), instruction: ref('form.instruction') }, effects: [{ type: 'close-dialog' }] }],
});
const open = [{ type: 'actions', actions: [{ id: 'open', label: '配置', endpoint: '/trigger-editor', effects: [{ type: 'open-dialog', value: ref('response') }] }] }];

test('dialog footer actions use edited body values, remain in footer and close the same dialog after saving', async () => {
    const ui = await mount(open, {}, async method => method === 'get' ? detail('chat-one') : ({ saved: true }));
    try {
        await click(button('配置'));
        const save = button('保存触发规则');
        assert.ok(save.closest('footer'), 'save belongs to the fixed dialog footer');
        assert.equal(button('关闭').parentElement, save.parentElement);
        await edit(document.querySelector('input'), '新的要求');
        await click(save);
        const posted = settingsUI.calls.find(([method]) => method === 'post');
        assert.deepEqual(posted.slice(0, 3), ['post', '/save-trigger', { conversationId: 'chat-one', instruction: '新的要求' }]);
        assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('empty selection shows placeholder rather than silently showing the first option, and footer validation prevents an empty target request', async () => {
    const ui = await mount(open, detail());
    try {
        await click(button('配置'));
        assert.ok(button('请选择目标会话'));
        assert.equal(button('我的对话'), undefined);
        await click(button('保存触发规则'));
        assert.equal(settingsUI.calls.some(([method]) => method === 'post'), false);
        assert.ok(document.querySelector('[role="dialog"]'));
    } finally { await ui.close(); }
});

test('a stale selector value is explicitly unavailable and cannot be submitted from the footer', async () => {
    const ui = await mount(open, detail('deleted-chat'));
    try {
        await click(button('配置'));
        assert.ok(button('当前选项已不可用，请重新选择'));
        await click(button('保存触发规则'));
        assert.equal(settingsUI.calls.some(([method]) => method === 'post'), false);
    } finally { await ui.close(); }
});
