import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

test('real toast loading lifetimes leave no stale notice after fast completions and reopen', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'MutationObserver', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'])
        globalThis[key] = ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const output = path.resolve(`temp/settings-loading-toasts-${process.pid}.mjs`);
    await build({ entryPoints: ['src/features/settings-runtime/loadingToasts.js'], outfile: output, bundle: true, packages: 'external', platform: 'node', format: 'esm' });
    const { useSettingsLoadingToast } = await import(pathToFileURL(output).href);
    const { Toaster } = await import('sonner');
    const { createRoot } = await import('react-dom/client');
    function Loading({ active }) { useSettingsLoadingToast(active, '读取测试资料'); return null; }
    const root = createRoot(document.getElementById('root'));
    const render = active => act(async () => root.render(React.createElement(React.Fragment, null, React.createElement(Toaster, { theme: 'light' }), React.createElement(Loading, { active }))));
    const flushExit = async () => {
        for (let frame = 0; frame < 70; frame += 1) {
            await act(async () => new Promise(resolve => setTimeout(resolve, 20)));
            if (!document.querySelector('[data-sonner-toast]')) return;
        }
    };
    try {
        await render(false);
        for (let run = 0; run < 4; run += 1) { await render(true); await render(false); }
        await flushExit();
        assert.equal(document.querySelectorAll('[data-sonner-toast]').length, 0);
        await render(true);
        await act(async () => new Promise(resolve => setTimeout(resolve, 40)));
        assert.equal(document.querySelectorAll('[data-sonner-toast][data-type="loading"][data-removed="false"]').length, 1);
        await render(false);
        await render(true);
        for (let frame = 0; frame < 4; frame += 1) await act(async () => new Promise(resolve => setTimeout(resolve, 20)));
        assert.equal(document.querySelectorAll('[data-sonner-toast][data-type="loading"][data-removed="false"]').length, 1, 'a previous exit must not remove the next read');
        await render(false);
        await flushExit();
        assert.equal(document.querySelectorAll('[data-sonner-toast]').length, 0);
    } finally { await act(async () => root.unmount()); dom.window.close(); }
});
