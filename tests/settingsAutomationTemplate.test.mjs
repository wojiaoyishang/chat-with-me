import test from 'node:test';
import assert from 'node:assert/strict';
import { EditorView } from '@codemirror/view';
import { mount, button, click, edit, ref, act } from './helpers/settingsRuntimeHarness.mjs';

const is = (name, value) => ({ left: ref(`form.${name}`), op: 'eq', right: value });
const fields = [
    { type: 'form-layout', columns: 2, options: [
        { type: 'select', name: 'contentFormat', text: '补充内容格式', options: [{ value: 'text', label: '纯文本' }, { value: 'jinja2', label: 'Jinja 模板' }] },
        { type: 'select', name: 'role', text: '投递身份', options: [{ value: 'user', label: '用户' }, { value: 'system', label: '系统' }, { value: 'assistant', label: '助手' }] },
    ] },
    { type: 'text', name: 'content', text: '补充要求', multiline: true, inlineMultiline: true, maxLength: 15000, when: is('contentFormat', 'text') },
    { type: 'code-editor', name: 'content', text: '补充要求模板', language: 'jinja2', editorHeight: 260, maxLength: 15000, when: is('contentFormat', 'jinja2') },
    { type: 'switch', name: 'includeEvent', text: '包含触发事件内容', when: is('contentFormat', 'text') },
    { type: 'switch', name: 'includeEvent', text: '携带事件附件', tips: '正文请在模板中引用，不自动附加事件 JSON 或规则说明。', when: is('contentFormat', 'jinja2') },
    { type: 'action', id: 'save', label: '保存规则', endpoint: '/rules', method: 'POST', body: {
        content: ref('form.content'), contentFormat: ref('form.contentFormat'), role: ref('form.role'), includeEvent: ref('form.includeEvent'),
    } },
];

function codeEnvironment() {
    for (const name of ['Window', 'NodeFilter', 'HTMLButtonElement', 'HTMLInputElement', 'HTMLTextAreaElement']) globalThis[name] = window[name];
    globalThis.getComputedStyle = window.getComputedStyle.bind(window);
    globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
    globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
    globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.ResizeObserver = globalThis.ResizeObserver;
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: window.navigator });
    window.Range.prototype.getClientRects = () => [];
    window.Range.prototype.getBoundingClientRect = () => new window.DOMRect();
    HTMLElement.prototype.scrollIntoView = () => {};
}

async function choose(name, label) {
    await click(document.querySelector(`[data-settings-field="${name}"] button[aria-haspopup="listbox"]`));
    await click([...document.querySelectorAll('[role="option"]')].find((option) => option.textContent.trim() === label));
}

test('plain and Jinja fields share one draft while fixed role survives save and reopen', async () => {
    let saved;
    let ui = await mount(fields, {}, async (_method, endpoint, body) => {
        if (endpoint === '/rules') saved = body;
        return { saved: true };
    }, {}, { contentFormat: 'text', role: 'user', includeEvent: true, content: '原始 {{ event.payload.text }}' });
    try {
        codeEnvironment();
        assert.equal(document.querySelector('.cm-editor'), null);
        assert.ok(document.querySelector('[aria-label="包含触发事件内容"]'));
        await edit(document.querySelector('[aria-label="补充要求"]'), '共同草稿 {{ event.payload.text }}');
        await choose('contentFormat', 'Jinja 模板');
        let view = EditorView.findFromDOM(document.querySelector('.cm-editor'));
        assert.ok(view);
        assert.equal(view.state.doc.toString(), '共同草稿 {{ event.payload.text }}');
        assert.ok(document.querySelector('[aria-label="携带事件附件"]'));
        assert.equal(document.querySelector('[aria-label="包含触发事件内容"]'), null);
        await click(document.querySelector('[aria-label="携带事件附件"]'));
        await act(async () => view.dispatch({ changes: { from: view.state.doc.length, insert: '！' }, userEvent: 'input.type' }));
        await choose('role', '系统');
        assert.equal(EditorView.findFromDOM(document.querySelector('.cm-editor')), view, 'role edits do not reset the template editor');
        await choose('contentFormat', '纯文本');
        assert.equal(view.destroyed, true);
        assert.equal(document.querySelector('[aria-label="补充要求"]').value, '共同草稿 {{ event.payload.text }}！');
        assert.equal(document.querySelector('[aria-label="包含触发事件内容"]').checked, false);
        await choose('contentFormat', 'Jinja 模板');
        view = EditorView.findFromDOM(document.querySelector('.cm-editor'));
        assert.equal(view.state.doc.toString(), '共同草稿 {{ event.payload.text }}！');
        await choose('role', '助手');
        await click(button('保存规则'));
        assert.deepEqual(saved, { contentFormat: 'jinja2', role: 'assistant', content: '共同草稿 {{ event.payload.text }}！', includeEvent: false });
        await ui.close();
        ui = await mount(fields, {}, null, {}, saved);
        codeEnvironment();
        await act(async () => new Promise((resolve) => setTimeout(resolve, 15)));
        assert.equal(document.querySelector('[data-settings-field="role"] button').textContent.trim(), '助手');
        assert.equal(document.querySelector('[data-settings-field="contentFormat"] button').textContent.trim(), 'Jinja 模板');
        assert.equal(EditorView.findFromDOM(document.querySelector('.cm-editor')).state.doc.toString(), saved.content);
    } finally { await ui.close(); }
});
