import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref, resource } from './helpers/settingsRuntimeHarness.mjs';

test('template preview patches only the result while preserving the dialog draft and fixed save action', async () => {
    const editor = {
        title: '回复模板', layout: 'stacked', dialog: { width: 680 },
        defaultOptions: { template: '{{ message }}', previewMessage: '原始示例', rendered: '' },
        options: [
            { type: 'text', name: 'template', text: 'Jinja 模板', multiline: true, inlineMultiline: true },
            { type: 'text', name: 'previewMessage', text: '示例原文', multiline: true, multilineStyle: 'plain' },
            { type: 'actions', actions: [{ id: 'preview', label: '预览效果', endpoint: '/templates/preview', method: 'POST',
                retainResponse: false, body: { template: ref('form.template'), message: ref('form.previewMessage') },
                effects: [{ type: 'patch', value: { rendered: ref('response.rendered') } }] }] },
            { type: 'readonly-text', name: 'rendered', text: '预览结果' },
        ],
        footerActions: [{ id: 'save', label: '保存回复模板', endpoint: '/templates', method: 'PUT',
            body: { template: ref('form.template') },
            effects: [{ type: 'toast', message: '已保存' }, { type: 'close-dialog' }] }],
    };
    const ui = await mount([resource({ actions: [{ id: 'template', label: '回复模板', endpoint: '/templates/editor', method: 'GET',
        effects: [{ type: 'open-dialog', value: ref('response') }] }] })], { items: [{ id: 'one', title: '示例连接' }] },
    async (_method, endpoint) => endpoint === '/fixtures' ? { items: [{ id: 'one', title: '示例连接' }] }
        : endpoint === '/templates/editor' ? editor : endpoint === '/templates/preview' ? { rendered: '【示例连接】新的示例' } : { saved: true });
    try {
        await click(button('回复模板'));
        const original = document.querySelector('[role="dialog"]');
        assert.ok(original);
        await edit(document.querySelector('[aria-label="Jinja 模板"]'), '【{{ account.name }}】{{ message }}');
        await edit(document.querySelector('[aria-label="示例原文"]'), '新的示例');
        await click(button('预览效果'));
        assert.equal(document.querySelector('[role="dialog"]'), original, 'preview never reopens or nests the editor');
        assert.equal(document.querySelector('[aria-label="Jinja 模板"]').value, '【{{ account.name }}】{{ message }}');
        assert.equal(document.querySelector('[aria-label="示例原文"]').value, '新的示例');
        assert.equal(document.querySelector('[aria-label="预览结果"]').textContent, '【示例连接】新的示例');
        assert.deepEqual(settingsUI.calls.find(([, endpoint]) => endpoint === '/templates/preview').slice(0, 3),
            ['post', '/templates/preview', { template: '【{{ account.name }}】{{ message }}', message: '新的示例' }]);
        assert.equal(settingsUI.calls.some(([method, endpoint]) => method === 'put' && endpoint === '/templates'), false);
        assert.ok(button('保存回复模板').closest('footer'));
        await click(button('保存回复模板'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'put').slice(0, 3),
            ['put', '/templates', { template: '【{{ account.name }}】{{ message }}' }]);
        assert.equal(document.querySelector('[role="dialog"]'), null);
        assert.ok(settingsUI.successes.some(([message]) => message === '已保存'));
    } finally { await ui.close(); }
});
