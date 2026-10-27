import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

test('Headless menus consume Escape inside a real resource dialog and leave its editor usable', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'NodeFilter', 'MutationObserver', 'CustomEvent', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLButtonElement', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'])
        globalThis[key] = ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key];
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.ResizeObserver = globalThis.ResizeObserver;
    window.HTMLElement.prototype.scrollIntoView = () => {};
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const { createRoot } = await import('react-dom/client');
    await build({ entryPoints: ['src/components/setting/DynamicSettings.jsx'], outfile: 'temp/settings-headless-popover.mjs', bundle: true, packages: 'external', jsx: 'automatic', platform: 'node', format: 'esm', plugins: [{ name: 'real-dialog-and-listbox', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
        builder.onResolve({ filter: /^sonner$|^framer-motion$|^react-i18next$/ }, ({ path: name }) => ({ path: name, namespace: 'mock' }));
        builder.onResolve({ filter: /JsonConfigEditor\.jsx$/ }, () => ({ path: 'json', namespace: 'mock' }));
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => {
            if (['/apiClient.js', '/clientAdapter.js', '/extensions.jsx', '/useEventStore.jsx', '/virtualUrl.js'].some(suffix => name.endsWith(suffix))) return { path: name, namespace: 'mock' };
            const target = path.resolve('src', name.slice(2));
            return { path: [target, `${target}.tsx`, `${target}.ts`, `${target}.jsx`, `${target}.js`].find(existsSync) };
        });
        builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => {
            if (name === 'framer-motion') return { loader: 'jsx', contents: `import {forwardRef,createElement} from 'react';const cache={};export const motion=new Proxy({}, {get(_,tag){return cache[tag]||(cache[tag]=forwardRef(({children,initial,animate,exit,transition,layout,...props},ref)=>createElement(tag,{...props,ref},children)));}});export const AnimatePresence=({children})=><>{children}</>;` };
            if (name === 'react-i18next') return { contents: "const t=value=>value;export const useTranslation=()=>({t});" };
            if (name === 'sonner') return { contents: 'export const toast={error:()=>{},success:()=>{},info:()=>{},loading:()=>{},warning:()=>{},dismiss:()=>{}};' };
            if (name.endsWith('/apiClient.js')) return { contents: "export default {get:async()=>({items:[{id:'source',title:'成员权限',permission:'view'}]})};" };
            if (name.endsWith('/clientAdapter.js')) return { contents: 'export default {read:async()=>undefined,write:async()=>{},invoke:async()=>{},subscribe:()=>()=>{}};' };
            if (name.endsWith('/extensions.jsx')) return { contents: '' };
            if (name.endsWith('/useEventStore.jsx')) return { contents: 'export const onEvent=()=>({then:()=>()=>{}});' };
            if (name.endsWith('/virtualUrl.js')) return { contents: 'export const resolveResourceUrl=value=>value;' };
            if (name === 'json') return { contents: 'export default ()=>null;' };
            throw new Error(`Unexpected mock ${name}`);
        });
    } }] });
    const { default: DynamicSettings } = await import('../temp/settings-headless-popover.mjs');
    const config = [{ type: 'resource', id: 'members', text: '成员', source: { endpoint: '/members', listPath: 'items' }, titleField: 'title', actions: [{ kind: 'edit', label: '编辑权限' }], editor: { title: '编辑成员', options: [{ type: 'select', name: 'permission', text: '权限', options: [{ value: 'view', label: '查看' }, { value: 'use', label: '使用' }, { value: 'manage', label: '管理' }] }] } }];
    const root = createRoot(document.getElementById('root'));
    const settle = () => new Promise(resolve => setTimeout(resolve, 35));
    const key = (target, value) => target.dispatchEvent(new window.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true }));
    const pointerClick = (target) => {
        const event = new window.MouseEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 });
        Object.defineProperty(event, 'pointerType', { value: 'mouse' });
        target.dispatchEvent(event);
        target.click();
    };
    try {
        await act(async () => { root.render(React.createElement(DynamicSettings, { config })); await settle(); });
        const edit = () => [...document.querySelectorAll('button')].find(node => node.textContent.trim() === '编辑权限');
        await act(async () => { edit().click(); await settle(); });
        let editor = document.querySelector('[data-slot="dialog-content"]');
        const trigger = () => editor.querySelector('button[aria-haspopup="listbox"]');
        await act(async () => { pointerClick(trigger()); await settle(); });
        const menu = document.querySelector('[role="listbox"]');
        assert.ok(menu);
        assert.equal(trigger().getAttribute('aria-expanded'), 'true');
        await act(async () => { key(menu, 'Escape'); await settle(); });
        assert.ok(!document.querySelector('[role="listbox"]'), 'Escape closes the mouse-opened listbox');
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), editor);
        assert.equal(trigger().getAttribute('aria-expanded'), 'false');
        assert.equal(document.activeElement, trigger());
        assert.notEqual(editor.getAttribute('aria-hidden'), 'true');
        await act(async () => { key(trigger(), 'Escape'); await settle(); });
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), null, 'the next Escape still closes the unmodified editor');

        await act(async () => { edit().click(); await settle(); });
        editor = document.querySelector('[data-slot="dialog-content"]');
        await act(async () => { pointerClick(trigger()); await settle(); });
        const reopened = document.querySelector('[role="listbox"]');
        await act(async () => { key(reopened, 'ArrowDown'); await settle(); });
        await act(async () => { key(reopened, 'Enter'); await settle(); });
        assert.equal(document.querySelector('[role="listbox"]'), null);
        assert.match(trigger().textContent, /使用/);
        assert.equal(document.querySelector('[data-slot="dialog-content"]'), editor, 'keyboard selection retains the parent editor');
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
    }
});
