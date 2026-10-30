import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref, resource } from './helpers/settingsRuntimeHarness.mjs';
import { EditorView } from '@codemirror/view';
import { undoDepth } from '@codemirror/commands';
import { act } from 'react';

test('template preview patches only the result while preserving the dialog draft and fixed save action', async () => {
    const editor = {
        title: '回复模板', layout: 'stacked', dialog: { width: 680 },
        defaultOptions: { template: '{{ message }}', previewMessage: '原始示例', rendered: '' },
        options: [
            { type: 'code-editor', name: 'template', text: 'Jinja 模板', language: 'jinja2', editorHeight: 260, maxLength: 8192 },
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
        globalThis.Window = window.Window;
        globalThis.getComputedStyle = window.getComputedStyle.bind(window);
        globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
        globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
        window.Range.prototype.getClientRects = () => [];
        window.Range.prototype.getBoundingClientRect = () => new window.DOMRect();
        await click(button('回复模板'));
        const original = document.querySelector('[role="dialog"]');
        assert.ok(original);
        const codeView = EditorView.findFromDOM(document.querySelector('.cm-editor'));
        assert.ok(codeView, 'the backend code-editor descriptor loads a real CodeMirror field lazily');
        await act(async () => codeView.dispatch({ changes: { from: 0, to: codeView.state.doc.length, insert: '【{{ account.name }}】{{ message }}' }, userEvent: 'input.type' }));
        await act(async () => codeView.dispatch({ selection: { anchor: 4 } }));
        const history = undoDepth(codeView.state);
        await edit(document.querySelector('[aria-label="示例原文"]'), '新的示例');
        await click(button('预览效果'));
        assert.equal(document.querySelector('[role="dialog"]'), original, 'preview never reopens or nests the editor');
        assert.equal(EditorView.findFromDOM(document.querySelector('.cm-editor')), codeView);
        assert.equal(codeView.state.doc.toString(), '【{{ account.name }}】{{ message }}');
        assert.equal(codeView.state.selection.main.anchor, 4);
        assert.equal(undoDepth(codeView.state), history);
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
        assert.equal(codeView.destroyed, true);
        assert.ok(settingsUI.successes.some(([message]) => message === '已保存'));
    } finally { await ui.close(); }
});
