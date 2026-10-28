import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act, useState } from 'react';

test('a locked dialog re-arms browser Back until an explicit close', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/settings', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'NodeFilter', 'MutationObserver', 'CustomEvent', 'HTMLInputElement', 'HTMLTextAreaElement']) globalThis[key] = dom.window[key];
    for (const key of ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) globalThis[key] = dom.window[key].bind(dom.window);
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    globalThis.CSS = dom.window.CSS || { escape: name => String(name) };
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const { createRoot } = await import('react-dom/client');
    const output = `temp/settings-dialog-back-${process.pid}.mjs`;
    await build({ stdin: { contents: "export {Dialog,DialogContent,DialogTitle} from './src/components/ui/dialog.tsx';", resolveDir: process.cwd() }, outfile: output, bundle: true, packages: 'external', jsx: 'automatic', platform: 'node', format: 'esm', plugins: [{ name: 'aliases', setup(builder) {
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => {
            const target = path.resolve('src', name.slice(2));
            return { path: [target, `${target}.tsx`, `${target}.ts`, `${target}.jsx`, `${target}.js`].find(existsSync) };
        });
    } }] });
    const { Dialog, DialogContent, DialogTitle } = await import(`../${output}`);
    function Fixture() {
        const [open, setOpen] = useState(true);
        const [locked, setLocked] = useState(true);
        return React.createElement(React.Fragment, null,
            React.createElement('button', { onClick: () => { setLocked(false); setOpen(true); } }, '打开普通窗口'),
            React.createElement(Dialog, { open, onOpenChange: setOpen, closeOnBack: !locked, lockInteraction: locked },
                React.createElement(DialogContent, { 'aria-describedby': undefined, 'aria-modal': locked || undefined },
                    React.createElement(DialogTitle, null, '凭据'),
                    React.createElement('button', { onClick: () => setOpen(false) }, '明确关闭'))));
    }
    const root = createRoot(document.getElementById('root'));
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await act(async () => { root.render(React.createElement(Fixture)); await delay(10); });
        await act(async () => delay(10));
        assert.ok(window.history.state.__cwmUiLayer, 'dialog registered a history layer');
        const tools = await readFile('src/lib/tools.jsx', 'utf8');
        const source = tools.slice(tools.indexOf('export async function copyTextToClipboard'), tools.indexOf('export function updateURL')).replace('export async function', 'async function');
        const sandbox = vm.createContext({ window, document, navigator: window.navigator });
        vm.runInContext(`${source}\nglobalThis.copy=copyTextToClipboard;`, sandbox);
        let copied = '';
        document.execCommand = () => {
            const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
            assert.ok(modal.contains(document.activeElement), 'fallback clipboard input remains in the modal focus scope');
            copied = document.activeElement.value;
            return true;
        };
        await act(async () => sandbox.copy('synthetic credential'));
        assert.equal(copied, 'synthetic credential');
        await act(async () => { window.history.back(); await delay(40); });
        assert.ok(document.querySelector('[data-slot="dialog-content"]'));
        assert.ok(window.history.state.__cwmUiLayer, 'blocked Back re-arms the dialog layer');
        await act(async () => { [...document.querySelectorAll('button')].find(button => button.textContent === '明确关闭').click(); await delay(40); });
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), null);
        await act(async () => { [...document.querySelectorAll('button')].find(button => button.textContent === '打开普通窗口').click(); await delay(10); });
        await act(async () => delay(10));
        await act(async () => { window.history.back(); await delay(40); });
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), null, 'ordinary dialogs still close on Back');
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
    }
});
