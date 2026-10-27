import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act, useEffect, useRef, useState } from 'react';

test('native schema menus stay in their owning dialog for pointer and keyboard selection', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    const keys = ['window', 'document', 'HTMLElement', 'Element', 'Node', 'NodeFilter', 'MutationObserver', 'CustomEvent', 'HTMLInputElement', 'HTMLTextAreaElement', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'];
    for (const key of keys) globalThis[key] = ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key];
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const { createRoot } = await import('react-dom/client');
    const { createSelectControl } = await import('@cwm/json-config-editor');
    await build({ stdin: { contents: "export {Dialog,DialogContent,DialogTitle} from './src/components/ui/dialog.tsx';export {isOwnedWindowPopoverTarget,useWindowLayers} from './src/lib/windowLayers.js';", resolveDir: process.cwd() }, bundle: true, packages: 'external', jsx: 'automatic', platform: 'node', format: 'esm', outfile: 'temp/settings-owned-popover.mjs', plugins: [{ name: 'aliases', setup(builder) {
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => {
            const target = path.resolve('src', name.slice(2));
            return { path: [target, `${target}.tsx`, `${target}.ts`, `${target}.jsx`, `${target}.js`].find(existsSync) };
        });
    } }] });
    const { Dialog, DialogContent, DialogTitle, isOwnedWindowPopoverTarget, useWindowLayers } = await import('../temp/settings-owned-popover.mjs');
    let select;
    const values = [];
    function SchemaSelect() {
        const host = useRef(null);
        useEffect(() => {
            const input = document.createElement('select');
            input.setAttribute('aria-label', '枚举参数');
            input.innerHTML = '<option value="one">选项一</option><option value="two">选项二</option><option value="three">选项三</option>';
            input.addEventListener('change', () => values.push(input.value));
            select = createSelectControl(input);
            host.current.append(select.root);
            return () => select.destroy();
        }, []);
        return React.createElement('div', { ref: host });
    }
    function Fixture() {
        const [open, setOpen] = useState(true);
        return React.createElement(Dialog, { open, onOpenChange: setOpen }, React.createElement(DialogContent, { 'aria-describedby': undefined }, React.createElement(DialogTitle, null, '参数配置'), React.createElement(SchemaSelect)));
    }
    const root = createRoot(document.getElementById('root'));
    const pointer = target => target.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true, button: 0 }));
    const key = (target, name) => target.dispatchEvent(new window.KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
    const tick = () => new Promise(resolve => setTimeout(resolve, 0));
    try {
        await act(async () => { root.render(React.createElement(Fixture)); await tick(); });
        await act(tick);
        const owner = document.querySelector('[data-slot="dialog-content"]');
        await act(async () => select.trigger.click());
        let popup = document.querySelector('.cwm-select-popover');
        assert.ok(popup);
        assert.equal(popup.dataset.windowLayer, owner.dataset.windowLayer);
        assert.equal(popup.dataset.windowPopover, 'true');
        assert.ok(Number(popup.style.zIndex) > Number(owner.style.zIndex));
        assert.equal(document.activeElement, popup, 'native menu can receive keyboard focus outside the React portal');
        await act(async () => { pointer(popup.children[1]); popup.children[1].click(); });
        assert.deepEqual(values, ['two']);
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), owner);
        assert.equal(document.activeElement, select.trigger);
        await act(async () => select.trigger.click());
        popup = document.querySelector('.cwm-select-popover');
        await act(async () => key(popup, 'Escape'));
        assert.equal(document.querySelector('.cwm-select-popover'), null);
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), owner, 'Escape closes only the owned menu');
        await act(async () => select.trigger.click());
        popup = document.querySelector('.cwm-select-popover');
        await act(async () => { key(popup, 'ArrowUp'); key(popup, 'Enter'); });
        assert.deepEqual(values, ['two', 'one']);
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), owner);

        const foreign = document.createElement('button');
        foreign.dataset.windowLayer = 'another-window';
        foreign.dataset.windowPopover = 'true';
        document.body.append(foreign);
        assert.equal(isOwnedWindowPopoverTarget({ target: foreign }, owner.dataset.windowLayer), false);
        await act(async () => pointer(foreign));
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), owner, 'another window does not dismiss this window');
        foreign.remove();
        assert.equal(isOwnedWindowPopoverTarget({ target: owner }, owner.dataset.windowLayer), false, 'owner IDs alone do not bypass outside handling');
        await act(async () => { pointer(document.body); await tick(); });
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), null, 'ordinary outside clicks still dismiss the dialog');
    } finally {
        await act(async () => root.unmount());
        assert.deepEqual(useWindowLayers.getState().windows, []);
        dom.window.close();
    }
});
