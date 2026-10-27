import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'NodeFilter', 'MutationObserver', 'CustomEvent', 'HTMLInputElement', 'HTMLTextAreaElement']) globalThis[key] = dom.window[key];
for (const key of ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) globalThis[key] = dom.window[key].bind(dom.window);
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
// JSDOM omits CSS.escape; these fixture animation names are plain identifiers.
globalThis.CSS = dom.window.CSS || { escape: (name) => String(name) };
after(() => dom.window.close());
const { createRoot } = await import('react-dom/client');
const bundle = `temp/confirmation-lifecycle-${process.pid}.mjs`;
await build({
    stdin: { contents: "export {useConfirmation} from './src/components/ui/useConfirmation.jsx';", resolveDir: process.cwd() },
    outfile: bundle, bundle: true, packages: 'external', jsx: 'automatic', platform: 'node', format: 'esm',
    plugins: [{ name: 'aliases', setup(builder) {
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => {
            const target = path.resolve('src', name.slice(2));
            return { path: [target, `${target}.tsx`, `${target}.ts`, `${target}.jsx`, `${target}.js`].find(existsSync) };
        });
    } }],
});
const { useConfirmation } = await import(`../${bundle}`);
const style = document.createElement('style');
style.textContent = `
    [data-slot="alert-dialog-content"][data-state="open"], [data-slot="alert-dialog-overlay"][data-state="open"] { animation-name: enter; }
    [data-slot="alert-dialog-content"][data-state="closed"], [data-slot="alert-dialog-overlay"][data-state="closed"] { animation-name: exit; animation-duration: 1s; }
`;
document.head.append(style);
let confirm, rendered;
function Fixture() {
    [confirm, rendered] = useConfirmation();
    return rendered;
}
const flushExit = async () => act(async () => {
    for (const node of document.querySelectorAll('[data-state="closed"]')) {
        const event = new window.Event('animationend', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: 'exit' });
        node.dispatchEvent(event);
    }
});

test('confirm and cancel preserve the complete closing content until the real Radix exit ends', { timeout: 10000 }, async () => {
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(Fixture)));
        for (const accepted of [true, false]) {
            let result;
            await act(async () => { result = confirm({ title: '允许这一组工具？', description: '需要确认的操作说明', confirmText: '允许本组', danger: true }); });
            assert.equal(document.querySelector('[role="alertdialog"]').getAttribute('data-state'), 'open');
            await act(async () => document.querySelector(`[data-slot="alert-dialog-${accepted ? 'action' : 'cancel'}"]`).click());
            assert.equal(await result, accepted);
            const closing = document.querySelector('[role="alertdialog"]');
            assert.ok(closing, 'the animation keeps the real dialog mounted');
            assert.equal(closing.getAttribute('data-state'), 'closed');
            assert.match(closing.textContent, /允许这一组工具？.*需要确认的操作说明.*允许本组/s);
            assert.match(closing.querySelector('[data-slot="alert-dialog-action"]').className, /bg-destructive/);
            await flushExit();
            assert.equal(document.querySelector('[role="alertdialog"]'), null);
            assert.equal(document.querySelector('[data-slot="alert-dialog-overlay"]'), null);
        }
    } finally { await act(async () => root.unmount()); }
});

test('replaced requests, late close callbacks and unmount resolve only their own confirmation', { timeout: 10000 }, async () => {
    const root = createRoot(document.getElementById('root'));
    let unmounted = false;
    try {
        await act(async () => root.render(React.createElement(Fixture)));
        let first, second, last;
        await act(async () => { first = confirm({ title: '第一个操作' }); });
        const staleClose = rendered.props.onOpenChange;
        await act(async () => { second = confirm({ title: '第二个操作', confirmText: '执行第二个' }); });
        assert.equal(await first, false);
        await act(async () => staleClose(false));
        assert.equal(document.querySelector('[role="alertdialog"]').getAttribute('data-state'), 'open');
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /第二个操作/);
        await act(async () => document.querySelector('[data-slot="alert-dialog-action"]').click());
        assert.equal(await second, true);
        await flushExit();
        await act(async () => { last = confirm({ title: '离开前的操作' }); });
        await act(async () => root.unmount());
        unmounted = true;
        assert.equal(await last, false);
        assert.equal(document.querySelector('[role="alertdialog"]'), null);
    } finally { if (!unmounted) await act(async () => root.unmount()); }
});
