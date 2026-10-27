import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
for (const key of ['window', 'document', 'navigator', 'Element', 'HTMLElement', 'Node']) {
    Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const copied = [];
Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => copied.push(text) } });

const mocks = new Map([
    ['tools.jsx', 'export const copyTextToClipboard = (text) => navigator.clipboard.writeText(text);'],
    ['react-i18next', 'export const useTranslation = () => ({ t: (key, fallback) => fallback || key });'],
    ['documentCardSpec.js', 'export const useDocumentCardSpec = () => ({ spec: null, loading: false, error: null });'],
    ['CardBlock.jsx', 'export default function CardBlock() { return null; }'],
    ['ExecutionStatusGroup.jsx', 'export default function ExecutionStatusGroup() { return null; }'],
    ['ReplacementContextBadge.jsx', 'export default function ReplacementContextBadge() { return null; }'],
    ['universalModal.js', 'export const isUniversalModalLink = () => false; export const openUniversalModalLink = () => {};'],
    ['useImageViewer.js', 'export const openImageViewer = () => {};'],
]);
await build({
    stdin: { contents: "export { default } from './src/components/markdown/MarkdownRenderer.jsx';", resolveDir: process.cwd() },
    bundle: true,
    packages: 'external',
    platform: 'node',
    format: 'esm',
    jsx: 'automatic',
    outfile: 'temp/markdown-streaming-copy-test.mjs',
    alias: { '@': path.resolve('src') },
    loader: { '.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty' },
    plugins: [{ name: 'isolated-markdown-ui', setup(builder) {
        builder.onResolve({ filter: /\.css$/ }, () => ({ path: 'css', namespace: 'markdown-test-style' }));
        builder.onLoad({ filter: /.*/, namespace: 'markdown-test-style' }, () => ({ contents: '', loader: 'js' }));
        builder.onResolve({ filter: /.*/ }, (args) => {
            const key = [...mocks.keys()].find((name) => args.path === name || args.path.endsWith(`/${name}`));
            return key ? { path: key, namespace: 'markdown-test-mock' } : undefined;
        });
        builder.onLoad({ filter: /.*/, namespace: 'markdown-test-mock' }, (args) => ({ contents: mocks.get(args.path), loader: 'js' }));
    } }],
});
const { default: MarkdownRenderer } = await import('../temp/markdown-streaming-copy-test.mjs');

async function withRenderer(run) {
    copied.length = 0;
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);
    const render = async (content, props = {}) => act(async () => root.render(React.createElement(MarkdownRenderer, { content, msg: { readonly: true }, ...props })));
    try { await run(host, render); }
    finally { await act(async () => root.unmount()); host.remove(); }
}

test('a completed code block keeps its copy button while the same readonly message streams a new tail', async () => {
    await withRenderer(async (host, render) => {
        const source = '```text\nprint("ready")\n```\n\n';
        await render(`${source}Continuing`);
        const button = host.querySelector('.copy-button');
        assert.equal(button.disabled, false);
        button.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true }));
        for (const tail of [' more', ' more text', ' more text after the block']) await render(`${source}Continuing${tail}`);
        assert.ok(host.querySelector('.copy-button') === button, 'streaming must not replace a pressed copy button');
        await act(async () => { button.dispatchEvent(new window.MouseEvent('mouseup', { bubbles: true })); button.click(); });
        assert.deepEqual(copied, ['print("ready")']);
        assert.equal(button.getAttribute('aria-label'), '已复制');
        await render(`${source}Continuing more text`, { msg: { readonly: false } });
        assert.ok(host.querySelector('.copy-button') === button, 'the direct code renderer stays stable at the final stream barrier');
    });
});

test('quoted completed blocks also retain interactive copy controls across message deltas', async () => {
    await withRenderer(async (host, render) => {
        const source = '> ```text\n> quoted code\n> ```\n\n';
        await render(`${source}Tail 1`, { isStreaming: true });
        const button = host.querySelector('.copy-button');
        await render(`${source}Tail 2`, { isStreaming: true });
        assert.ok(host.querySelector('.copy-button') === button);
        await act(async () => button.click());
        assert.deepEqual(copied, ['quoted code']);
        await render(`${source}Tail 2`, { msg: { readonly: false }, isStreaming: false });
        assert.equal(host.querySelector('.copy-button'), button, 'completion keeps the quote ancestor and copied state');
        assert.equal(button.getAttribute('aria-label'), '已复制');
    });
});

test('completion preserves the native video, paragraph, list and table DOM identities', async () => {
    await withRenderer(async (host, render) => {
        const source = '![Demo](https://example.invalid/demo.mp4){type=video}\n\n- Stable list\n\n| Name | Value |\n| --- | --- |\n| A | 1 |\n\n';
        await render(`${source}Tail 1`, { msg: { readonly: true } });
        const video = host.querySelector('video');
        const paragraph = video.closest('p');
        const list = host.querySelector('ul');
        const table = host.querySelector('table');
        video.currentTime = 12.5;
        video.volume = 0.4;
        await render(`${source}Tail 2`, { msg: { readonly: true } });
        await render(`${source}Tail 2`, { msg: { readonly: false }, messageContextState: { label: 'updated' } });
        assert.equal(host.querySelector('video'), video);
        assert.equal(video.isConnected, true);
        assert.equal(video.currentTime, 12.5);
        assert.equal(video.volume, 0.4);
        assert.equal(video.closest('p'), paragraph);
        assert.equal(host.querySelector('ul'), list);
        assert.equal(host.querySelector('table'), table);
        await render(source.replace('demo.mp4', 'another.mp4'), { msg: { readonly: false } });
        assert.notEqual(host.querySelector('video'), video, 'a genuinely different media source creates its own player');
    });
});

test('an unfinished block copies its currently rendered snapshot without disabling the button', async () => {
    await withRenderer(async (host, render) => {
        await render('```text\npartial');
        const button = host.querySelector('.copy-button');
        await render('```text\npartial current snapshot');
        assert.ok(host.querySelector('.copy-button') === button);
        await act(async () => button.click());
        assert.deepEqual(copied, ['partial current snapshot']);
    });
});

test('editable document checkboxes still receive the latest source content', async () => {
    await withRenderer(async (host, render) => {
        const toggles = [];
        const props = { renderSurface: 'document', msg: { readonly: false }, onTaskToggle: (value) => toggles.push(value) };
        await render('- [ ] First task', props);
        const latest = 'New introduction\n\n- [ ] First task';
        await render(latest, props);
        const checkbox = host.querySelector('input[type="checkbox"]');
        assert.equal(checkbox.disabled, false);
        await act(async () => checkbox.click());
        assert.equal(toggles[0].sourceContent, latest);
    });
});
