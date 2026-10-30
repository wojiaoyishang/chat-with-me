import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { EditorView } from '@codemirror/view';
import { isolateHistory, undoDepth } from '@codemirror/commands';
import { ensureSyntaxTree } from '@codemirror/language';

test('code field supports Jinja highlighting, real keyboard editing, external patches, read-only and cleanup', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'Window', 'document', 'HTMLElement', 'Element', 'Node', 'MutationObserver', 'CustomEvent', 'Event']) globalThis[key] = dom.window[key];
    globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
    globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
    globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    dom.window.Range.prototype.getClientRects = () => [];
    dom.window.Range.prototype.getBoundingClientRect = () => new dom.window.DOMRect();
    document.elementFromPoint = () => null;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    await build({ entryPoints: ['src/features/settings-runtime/SettingsCodeEditor.jsx'], outfile: `temp/settings-code-editor-${process.pid}.mjs`,
        bundle: true, packages: 'external', jsx: 'automatic', platform: 'node', format: 'esm',
        plugins: [{ name: 'editor-buttons', setup(builder) {
            builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
            builder.onResolve({ filter: /^@\/components\/ui\/button$/ }, () => ({ path: 'button', namespace: 'mock' }));
            builder.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ loader: 'jsx', contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;' }));
        } }] });
    const { default: CodeEditor } = await import(`../temp/settings-code-editor-${process.pid}.mjs`);
    const { createRoot } = await import('react-dom/client');
    const root = createRoot(document.getElementById('root'));
    const changes = [];
    const item = { type: 'code-editor', text: '回复源码', language: 'jinja2', editorHeight: 260, maxLength: 8192 };
    let latest = '你好 {{ message | trim }}\n{% if account.name %}\n示例正文\n{% endif %}';
    const render = async (props = {}) => act(async () => root.render(React.createElement(CodeEditor,
        { item, value: latest, onChange: (next) => changes.push(next), ...props })));
    const key = async (view, value, options = {}) => {
        const event = new window.KeyboardEvent('keydown', { key: value, code: ['Tab', 'Escape'].includes(value) ? value : `Key${value.toUpperCase()}`,
            keyCode: value === 'Tab' ? 9 : value === 'Escape' ? 27 : value.toUpperCase().charCodeAt(0), bubbles: true, cancelable: true, ...options });
        await act(async () => view.contentDOM.dispatchEvent(event));
        return event;
    };
    try {
        await render();
        const element = document.querySelector('.cm-editor');
        const view = EditorView.findFromDOM(element);
        assert.ok(view);
        assert.equal(document.querySelectorAll('.cm-lineNumbers').length, 1);
        assert.equal(view.contentDOM.getAttribute('aria-label'), '回复源码');
        assert.equal(element.parentElement.style.height, '260px');
        const syntax = ensureSyntaxTree(view.state, view.state.doc.length, 100);
        const tokens = [];
        syntax.iterate({ enter: (node) => tokens.push(node.name) });
        assert.ok(tokens.includes('keyword'));
        assert.ok(tokens.includes('variableName'));
        assert.ok(tokens.includes('variableName.function'));
        assert.ok(document.querySelector('.cm-line span'), 'Jinja tokens receive actual syntax styling');

        await act(async () => { view.focus(); view.dispatch({ selection: { anchor: 0, head: view.state.doc.length } }); });
        await key(view, 'Tab');
        assert.ok(view.state.doc.toString().split('\n').every((line) => line.startsWith('  ')));
        await key(view, 'Tab', { shiftKey: true });
        assert.equal(view.state.doc.toString(), latest);
        await act(async () => view.dispatch({ changes: { from: view.state.doc.length, insert: '!' },
            annotations: isolateHistory.of('full'), userEvent: 'input.type' }));
        latest = view.state.doc.toString();
        assert.equal(changes.at(-1), latest);
        await key(view, 'z', { ctrlKey: true });
        assert.equal(view.state.doc.toString(), latest.slice(0, -1));
        await key(view, 'y', { ctrlKey: true });
        assert.equal(view.state.doc.toString(), latest);
        await key(view, 'a', { ctrlKey: true });
        assert.equal(view.state.selection.main.from, 0);
        assert.equal(view.state.selection.main.to, latest.length);
        await key(view, 'Escape');
        const tabAfterEscape = await key(view, 'Tab');
        assert.equal(tabAfterEscape.defaultPrevented, false, 'Escape then Tab leaves indentation to ordinary focus navigation');
        assert.equal(view.state.doc.toString(), latest);

        await act(async () => view.dispatch({ selection: { anchor: 4 } }));
        const depth = undoDepth(view.state);
        const emitted = changes.length;
        latest += ' external';
        await render();
        assert.equal(EditorView.findFromDOM(document.querySelector('.cm-editor')), view);
        assert.equal(view.state.selection.main.anchor, 4);
        assert.equal(undoDepth(view.state), depth);
        assert.equal(changes.length, emitted, 'controlled patches are not reported as fresh user edits');
        await render({ item: { ...item, readOnly: true } });
        assert.equal(view.state.readOnly, true);
        assert.equal(view.contentDOM.getAttribute('contenteditable'), 'false');
        assert.equal(EditorView.findFromDOM(document.querySelector('.cm-editor')), view);
        await key(view, 'Tab');
        assert.equal(view.state.doc.toString(), latest);
        assert.equal(document.querySelector('button[aria-label="撤销"]').disabled, true);
        await render({ item: { ...item, editorHeight: 900 } });
        assert.equal(view.state.readOnly, false);
        assert.equal(element.parentElement.style.height, '640px');
        await act(async () => document.querySelector('button[aria-label="撤销"]').click());
        assert.ok(view.state.doc.toString().endsWith(' external'));
        assert.ok(!view.state.doc.toString().includes('!'));

        latest = view.state.doc.toString();
        await render();
        await act(async () => { view.dispatch({ selection: { anchor: 0 } }); view.focus(); });
        await act(async () => view.contentDOM.dispatchEvent(new window.CompositionEvent('compositionstart', { bubbles: true })));
        await render({ value: '已被取消的外部补丁' });
        await render({ value: latest });
        await act(async () => {
            view.contentDOM.dispatchEvent(new window.CompositionEvent('compositionend', { bubbles: true }));
            await new Promise((resolve) => setTimeout(resolve, 65));
        });
        assert.equal(view.state.doc.toString(), latest, 'a reverted external update cannot replay its stale deferred patch');
        await act(async () => view.contentDOM.dispatchEvent(new window.CompositionEvent('compositionstart', { bubbles: true })));
        await render({ value: '外部补丁等待输入法结束' });
        assert.equal(view.state.doc.toString(), latest, 'external patches do not replace an active composition');
        await act(async () => {
            view.contentDOM.dispatchEvent(new window.CompositionEvent('compositionend', { bubbles: true }));
            await new Promise((resolve) => setTimeout(resolve, 65));
        });
        assert.equal(view.state.doc.toString(), '外部补丁等待输入法结束');
        latest = view.state.doc.toString();
        await render({ item: { ...item, maxLength: 5 } });
        await act(async () => view.dispatch({ changes: { from: 0, to: 1, insert: '' }, userEvent: 'delete.backward' }));
        assert.equal(view.state.doc.toString(), latest.slice(1), 'an existing over-limit value can be shortened progressively');
        const shortened = view.state.doc.toString();
        await act(async () => view.dispatch({ changes: { from: view.state.doc.length, insert: 'x' }, userEvent: 'input.type' }));
        assert.equal(view.state.doc.toString(), shortened, 'over-limit values cannot grow through user edits');
        await act(async () => root.unmount());
        assert.equal(view.destroyed, true);
        assert.equal(document.querySelector('.cm-editor'), null);
    } finally {
        if (document.querySelector('.cm-editor')) await act(async () => root.unmount());
        dom.window.close();
    }
});
