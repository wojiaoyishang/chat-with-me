import test from 'node:test';
import assert from 'node:assert/strict';
import { settingsPublicContext } from '../src/features/settings-runtime/model.js';
import { mount, button, click, edit, ref } from './helpers/settingsRuntimeHarness.mjs';

const entry = { type: 'actions', actions: [{ id: 'memory', label: '编辑上下文记忆', method: 'GET', endpoint: '/memory/editor',
    params: { conversationId: ref('context.conversationId') },
    disabledWhen: { left: ref('context.conversationId'), op: 'eq', right: '' },
    effects: [{ type: 'open-dialog', value: ref('response') }] }] };

test('descriptor context exposes only the current conversation and surface', () => {
    assert.deepEqual(settingsPublicContext({ conversationId: 'owned', surface: 'conversation', api: 'secret', token: 'credential' }),
        { conversationId: 'owned', surface: 'conversation' });
    assert.deepEqual(settingsPublicContext(), { conversationId: '', surface: '' });
});

test('conversationless memory action is disabled instead of requesting another conversation', async () => {
    const ui = await mount([entry]);
    try {
        assert.equal(button('编辑上下文记忆').disabled, true);
        await click(button('编辑上下文记忆'));
        assert.equal(settingsUI.calls.length, 0);
    } finally { await ui.close(); }
});

test('backend memory editor loads and saves through generic actions with its exact revision', async () => {
    const descriptor = { title: '上下文记忆', defaultOptions: { content: '原来的记忆', revision: 'version-1' },
        options: [{ type: 'text', name: 'content', text: '记忆' }], footerActions: [{ id: 'save', label: '保存记忆',
            endpoint: '/memory', method: 'PUT', params: { conversationId: 'owned' },
            body: { content: ref('form.content'), revision: ref('form.revision') }, effects: [{ type: 'close-dialog' }] }] };
    const ui = await mount([entry], null, async method => method === 'get' ? descriptor : { saved: true },
        { surface: 'conversation', conversationId: 'owned' });
    try {
        await click(button('编辑上下文记忆'));
        const call = settingsUI.calls[0];
        assert.equal(call[2].params.conversationId, 'owned');
        await edit(document.querySelector('input[aria-label="记忆"]'), '新的记忆');
        await click(button('保存记忆'));
        const saved = settingsUI.calls.find(([method]) => method === 'put');
        assert.deepEqual(saved[2], { content: '新的记忆', revision: 'version-1' });
        assert.equal(document.querySelector('[role="dialog"]'), null);
        assert.equal(settingsUI.changed.length, 0, 'memory must not be stored as ChatBox options');
    } finally { await ui.close(); }
});
