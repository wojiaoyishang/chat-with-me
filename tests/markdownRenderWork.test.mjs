import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {JSDOM} from 'jsdom';

const mocks = new Map([
    ['tools.jsx', 'export const copyTextToClipboard=()=>{};'],
    ['react-i18next', 'export const useTranslation=()=>({t:(key)=>key});'],
    ['documentCardSpec.js', 'export const useDocumentCardSpec=()=>({spec:null,loading:false,error:null});'],
    ['CardBlock.jsx', 'export default ({id,content,renderMarkdown})=>{globalThis.__renderCounts.cards[id]=(globalThis.__renderCounts.cards[id]||0)+1;return <div data-card={id}>{renderMarkdown(content)}</div>};'],
    ['ResourceImage.jsx', 'export default ({src,alt})=>{globalThis.__renderCounts.images++;return <img src={src} alt={alt}/>};'],
    ['ReplacementContextBadge.jsx', 'export default ()=>null;'],
    ['ExecutionGuidanceBubble.jsx', 'export default ()=>null;'],
    ['universalModal.js', 'export const isUniversalModalLink=()=>false;export const openUniversalModalLink=()=>{};'],
    ['useImageViewer.js', 'export const openImageViewer=()=>{};'],
]);
await build({stdin: {contents: "export {default as Renderer} from './src/components/markdown/MarkdownRenderer.jsx';export {parseMarkdownSyntax} from './src/components/markdown/markdownParser.js';", resolveDir: process.cwd()},
    bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', alias: {'@': path.resolve('src')},
    outfile: 'temp/markdown-render-work-test.mjs', loader: {'.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty'},
    plugins: [{name: 'render-work', setup(builder) {
        builder.onResolve({filter: /\.css$/}, () => ({path: 'css', namespace: 'style'}));
        builder.onLoad({filter: /.*/, namespace: 'style'}, () => ({contents: '', loader: 'js'}));
        builder.onResolve({filter: /.*/}, ({path: name}) => {
            const key = [...mocks.keys()].find((key) => name === key || name.endsWith(`/${key}`));
            return key ? {path: key, namespace: 'fixture'} : undefined;
        });
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: name}) => ({contents: mocks.get(name), loader: 'jsx', resolveDir: process.cwd()}));
    }}]});
const {Renderer, parseMarkdownSyntax} = await import('../temp/markdown-render-work-test.mjs');

async function setup(t) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    const names = ['window', 'document', 'navigator', 'Element', 'HTMLElement', 'Node', 'IS_REACT_ACT_ENVIRONMENT'];
    const previous = new Map(names.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of names.slice(0, -1)) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.__renderCounts = {images: 0, cards: {}};
    const root = createRoot(document.getElementById('root'));
    t.after(async () => {await act(async () => root.unmount()); dom.window.close();
        for (const [key, value] of previous) value ? Object.defineProperty(globalThis, key, value) : delete globalThis[key];
        delete globalThis.__renderCounts;});
    const render = (content, replacement = {}, options = {}) => act(async () => root.render(React.createElement(Renderer,
        {content, replacement, contextId: 'message', conversationId: 'chat', isStreaming: true, ...options})));
    return {render, host: document.getElementById('root')};
}

test('appending a tail does not rerender 80 existing image elements', async (t) => {
    const ui = await setup(t);
    const prefix = Array.from({length: 80}, (_, index) => `![image ${index}](https://example.com/${index}.png)`).join('\n\n') + '\n\n';
    await ui.render(prefix + '正文');
    const first = ui.host.querySelector('img');
    for (let index = 1; index <= 10; index++) await ui.render(prefix + '正文' + '新增'.repeat(index));
    t.diagnostic(`80 images with 10 tail updates: ${globalThis.__renderCounts.images} image renders`);
    assert.equal(globalThis.__renderCounts.images, 80);
    assert.equal(ui.host.querySelector('img'), first);
});

test('one changing replacement does not rerender the other 19 tool cards', async (t) => {
    const ui = await setup(t);
    const source = Array.from({length: 20}, (_, index) => `{{cardReplace id=card${index}}}`).join('\n\n');
    let replacement = Object.fromEntries(Array.from({length: 20}, (_, index) => [`card${index}`, {frontend: `正文${index}`} ]));
    await ui.render(source, replacement);
    const before = globalThis.__renderCounts.cards.card1;
    const first = ui.host.querySelector('[data-card="card1"]');
    for (let index = 0; index < 10; index++) {
        replacement = {...replacement, card0: {frontend: `新结果${index}`}};
        await ui.render(source, replacement);
    }
    t.diagnostic(`unchanged card: ${globalThis.__renderCounts.cards.card1 - before} extra renders`);
    assert.equal(globalThis.__renderCounts.cards.card1, before);
    assert.equal(ui.host.querySelector('[data-card="card1"]'), first);
    assert.match(ui.host.querySelector('[data-card="card0"]').textContent, /新结果9/);
});

test('card isolation still observes a missing nested replacement when it becomes available', async (t) => {
    const ui = await setup(t);
    const outer = {frontend: '结果：{{cardReplace id=late}}'};
    await ui.render('{{cardReplace id=outer}}', {outer});
    await ui.render('{{cardReplace id=outer}}', {outer, late: {frontend: '已到达'}});
    assert.match(ui.host.textContent, /结果：\s*已到达/);
    await ui.render('{{cardReplace id=outer}}', {outer, late: {frontend: '已更新'}});
    assert.match(ui.host.textContent, /结果：\s*已更新/);
});

test('only newly received text fades; history and old prefix remain still and completion drains immediately', async (t) => {
    const ui = await setup(t);
    await ui.render('已有正文');
    assert.equal(ui.host.querySelector('[data-stream-token]'), null);
    await ui.render('已有正文，新增');
    const first = ui.host.querySelector('[data-stream-token]');
    assert.equal(first.textContent, '，新增');
    await ui.render('已有正文，新增后续');
    assert.equal(ui.host.querySelector('[data-stream-token]'), first, 'new batches must not restart a still-fading previous batch');
    assert.equal(ui.host.textContent, '已有正文，新增后续');
    assert.equal(ui.host.querySelectorAll('[data-stream-token]').length, 2);
    await act(async () => first.dispatchEvent(new ui.host.ownerDocument.defaultView.Event('animationend', {bubbles: true})));
    assert.equal(ui.host.querySelectorAll('[data-stream-token]').length, 1);
    await ui.render('已有正文，新增后续', {}, {isStreaming: false});
    assert.equal(ui.host.querySelector('[data-stream-token]'), null);
    assert.equal(ui.host.textContent, '已有正文，新增后续');
});

test('fade boundaries preserve emoji and combining marks, and never wrap code', async (t) => {
    const ui = await setup(t);
    await ui.render('👩');
    await ui.render('👩‍💻');
    assert.equal(ui.host.querySelector('[data-stream-token]').textContent, '👩‍💻');
    assert.equal(ui.host.textContent, '👩‍💻');
    await ui.render('e');
    await ui.render('e\u0301');
    assert.equal(ui.host.querySelector('[data-stream-token]').textContent, 'e\u0301');
    await ui.render('代码 `ab`');
    await ui.render('代码 `abc`');
    assert.equal(ui.host.querySelector('code').textContent, 'abc');
    assert.equal(ui.host.querySelector('code [data-stream-token]'), null);
});

test('reused blocks still resolve late Markdown definitions and real resource URL changes', async (t) => {
    const ui = await setup(t);
    await ui.render('[标签][ref]\n\n');
    await ui.render('[标签][ref]\n\n[ref]: https://example.com/new');
    assert.equal(ui.host.querySelector('a').href, 'https://example.com/new');
    await ui.render('![图片](assets/a.png)', {}, {resourceBaseUrl: 'https://example.com/first/'});
    assert.equal(ui.host.querySelector('img').src, 'https://example.com/first/a.png');
    await ui.render('![图片](assets/a.png)', {}, {resourceBaseUrl: 'https://example.com/next/'});
    assert.equal(ui.host.querySelector('img').src, 'https://example.com/next/a.png');
});

test('off-thread catch-up preserves existing image hosts, streams completed prefixes and falls back on failure', async t => {
    const ui=await setup(t), pending=[];
    const before=Object.getOwnPropertyDescriptor(globalThis,'Worker');
    globalThis.Worker=class {
        postMessage(input){pending.push({worker:this,input});}
        terminate(){}
    };
    t.after(()=>before?Object.defineProperty(globalThis,'Worker',before):delete globalThis.Worker);
    const finish=async()=>{const {worker,input}=pending.shift();await act(async()=>worker.onmessage({data:{id:input.id,
        tree:parseMarkdownSyntax(input.content,input.options)}}));};
    const prefix='![image](https://example.com/a.png)\n\n正文';
    await ui.render(prefix);const image=ui.host.querySelector('img');
    const long=prefix+'内容'.repeat(5000);
    await ui.render(long);assert.equal(ui.host.querySelector('img'),image);
    await finish();assert.ok(ui.host.textContent.includes('内容'.repeat(5000)));
    await ui.render(long+'A');await ui.render(long+'AB');
    await finish();assert.ok(ui.host.textContent.endsWith('A'));
    await finish();assert.ok(ui.host.textContent.endsWith('AB'));
    assert.equal(ui.host.querySelector('img'),image);
    await ui.render(long+'ABC');
    await act(async()=>pending.shift().worker.onerror(new Error('worker unavailable')));
    assert.ok(ui.host.textContent.endsWith('ABC'));
});
