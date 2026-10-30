import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const bundle = `temp/conversation-sidebar-${process.pid}.mjs`;
await build({
    entryPoints: ['src/features/chat/page/components/RightSidebar.jsx'],
    outfile: bundle, bundle: true, format: 'esm', platform: 'node', packages: 'external', jsx: 'automatic',
    plugins: [{ name: 'sidebar-boundaries', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
        builder.onResolve({ filter: /^@\/components\/setting\/DynamicSettings\.jsx$/ }, () => ({ path: 'settings', namespace: 'fixture' }));
        builder.onResolve({ filter: /^framer-motion$/ }, () => ({ path: 'motion', namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: name }) => ({ loader: 'jsx', contents: name === 'settings'
            ? 'export default function Settings(){return <input aria-label="当前设置草稿" defaultValue="保留的草稿"/>;}'
            : 'import {forwardRef} from "react";const Div=forwardRef(({initial,animate,transition,exit,style,...props},ref)=><div {...props} ref={ref} style={{...style,...(animate?.width!==undefined?{width:animate.width}:{})}}/>);export const motion={div:Div};' }));
    } }],
});
const { default: RightSidebar } = await import(pathToFileURL(path.resolve(bundle)).href);
const storageKey = 'chat-with-me:conversation-settings-sidebar-width';

async function mountSidebar(width, storedWidth) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node']) globalThis[key] = dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    if (storedWidth !== undefined) window.localStorage.setItem(storageKey, String(storedWidth));
    const container = document.getElementById('root');
    Object.defineProperty(container, 'clientWidth', { configurable: true, value: width });
    const root = createRoot(container);
    let closed = 0;
    const props = { isOpen: true, onClose: () => { closed += 1; }, advancedSettings: [{ type: 'text', name: 'value' }],
        settingsInstanceKey: 'chat-one', conversationId: 'chat-one', initialSettingValues: {},
        t: (key) => key === 'close' ? '关闭设置' : 'Advanced Conversation Settings', containerRef: { current: container } };
    await act(async () => root.render(React.createElement(RightSidebar, props)));
    return { container, get closed() { return closed; }, close: async () => { await act(async () => root.unmount()); dom.window.close(); } };
}

test('desktop resizing preserves saved width and the mounted settings draft', async () => {
    const ui = await mountSidebar(1200, 420);
    try {
        const separator = document.querySelector('[role="separator"]');
        const draft = document.querySelector('[aria-label="当前设置草稿"]');
        assert.equal(separator.getAttribute('aria-valuenow'), '420');
        draft.value = '编辑中';
        await act(async () => separator.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })));
        assert.equal(separator.getAttribute('aria-valuenow'), '436');
        assert.equal(window.localStorage.getItem(storageKey), '436');
        assert.equal(document.querySelector('[aria-label="当前设置草稿"]'), draft);
        assert.equal(draft.value, '编辑中');
        const scroll = draft.closest('.overflow-y-auto');
        assert.ok(scroll.classList.contains('px-4'));
        assert.ok(scroll.classList.contains('min-h-0'));
        assert.ok(scroll.classList.contains('min-w-0'));
        assert.ok(document.querySelector('[aria-label="关闭设置"]').classList.contains('shrink-0'));
        await act(async () => document.querySelector('[aria-label="关闭设置"]').click());
        assert.equal(ui.closed, 1);
    } finally { await ui.close(); }
});

test('fresh desktop settings get a usable default while existing narrow widths remain respected', async () => {
    for (const [storedWidth, expected] of [[undefined, '360'], [256, '256']]) {
        const ui = await mountSidebar(1200, storedWidth);
        try { assert.equal(document.querySelector('[role="separator"]').getAttribute('aria-valuenow'), expected); }
        finally { await ui.close(); }
    }
});

test('mobile settings use the available width with the same inset and independently scrollable body', async () => {
    const ui = await mountSidebar(320);
    try {
        assert.equal(document.querySelector('[role="separator"]'), null);
        const draft = document.querySelector('[aria-label="当前设置草稿"]');
        const scroll = draft.closest('.overflow-y-auto');
        const panel = scroll.parentElement;
        assert.ok(panel.classList.contains('w-full'));
        assert.ok(panel.classList.contains('max-w-sm'));
        assert.ok(scroll.classList.contains('px-4'));
        assert.ok(scroll.classList.contains('min-h-0'));
        assert.ok(scroll.classList.contains('min-w-0'));
        assert.equal(scroll.classList.contains('overflow-x-hidden'), false);
        await act(async () => document.querySelector('[aria-label="关闭设置"]').click());
        assert.equal(ui.closed, 1);
    } finally { await ui.close(); }
});
