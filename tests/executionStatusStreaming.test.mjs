import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

const mocks = new Map([
    ['tools.jsx', 'export const copyTextToClipboard=text=>navigator.clipboard.writeText(text);'],
    ['react-i18next', 'export const useTranslation=()=>({t:(key,fallback)=>fallback||key});'],
    ['documentCardSpec.js', 'export const useDocumentCardSpec=()=>({spec:null,loading:false,error:null});'],
    ['CardBlock.jsx', `import Status from './src/features/execution/ExecutionStatus.jsx';
        export default function Card({type,content,renderMarkdown,...props}) {
            return type === 'markdown' ? renderMarkdown(content)
                : type === 'executionStatus' ? <Status content={content} {...props}/> : null;
        }`],
    ['ReplacementContextBadge.jsx', 'export default ()=>null;'],
    ['ExecutionGuidanceBubble.jsx', 'export default ()=>null;'],
    ['universalModal.js', 'export const isUniversalModalLink=()=>false; export const openUniversalModalLink=()=>{};'],
    ['useImageViewer.js', 'export const openImageViewer=()=>{};'],
]);
await build({
    stdin: {contents: `export {default as Renderer} from './src/components/markdown/MarkdownRenderer.jsx';
        export {useExecutionStore} from './src/features/execution/useExecutionStore.js';`, resolveDir: process.cwd()},
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    outfile: 'temp/execution-status-streaming-test.mjs', alias: {'@': path.resolve('src')},
    loader: {'.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty'},
    plugins: [{name: 'streaming-status-fixture', setup(builder) {
        builder.onResolve({filter: /\.css$/}, () => ({path: 'css', namespace: 'style'}));
        builder.onLoad({filter: /.*/, namespace: 'style'}, () => ({contents: '', loader: 'js'}));
        builder.onResolve({filter: /.*/}, ({path: name}) => {
            const key = [...mocks.keys()].find((item) => name === item || name.endsWith(`/${item}`));
            return key ? {path: key, namespace: 'fixture'} : undefined;
        });
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: name}) => ({contents: mocks.get(name), loader: 'jsx', resolveDir: process.cwd()}));
    }}],
});
const {Renderer, useExecutionStore} = await import('../temp/execution-status-streaming-test.mjs');

async function setup(t) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'Element', 'HTMLElement', 'Node', 'IS_REACT_ACT_ENVIRONMENT'];
    const previous = new Map(keys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys.slice(0, -1)) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const copied = [];
    Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {writeText: async (text) => copied.push(text)}});
    const host = document.getElementById('root');
    const root = createRoot(host);
    t.after(async () => {
        await act(async () => root.unmount());
        useExecutionStore.setState({sessions: {}});
        dom.window.close();
        for (const [key, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    });
    const render = (content, replacement, readonly = true) => act(async () => root.render(React.createElement(Renderer, {
        contextId: 'message', conversationId: 'chat', content, replacement, msg: {readonly},
    })));
    return {dom, host, copied, render};
}

const token = (id, type = '') => `\n\n{{cardReplace id=${id}${type ? ` type=${type}` : ''}}}\n\n`;
const status = (id, overrides = {}) => JSON.stringify({
    executionId: 'execution', conversationId: 'chat', runId: 'run', statusId: id,
    updatedAt: 10, status: 'running', phase: 'investigation', inlineState: 'completed',
    inlineKind: 'tool', toolCallId: id, toolNames: ['knowledgeNetwork_get_related_graph'],
    label: '处理知识图谱 · 已完成', ...overrides,
});
const continuation = (id, overrides = {}) => status(id, {
    inlineKind: 'continuation', inlineState: 'running', toolCallId: null, toolNames: [],
    label: '正在分析下一步', ...overrides,
});
const primaryId = (host) => host.querySelector('[data-work-process]')?.dataset.processPrimary;

test('streamed calls, live-only state changes and continuations stay in one stable collapsed group until prose intervenes', async (t) => {
    const ui = await setup(t);
    let source = '```text\ncopy while executing\n```' + token('first', 'executionStatus');
    let replacement = {first: status('first')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    const copyButton = ui.host.querySelector('.copy-button');

    source += token('bridge-one', 'executionStatus');
    replacement = {...replacement, 'bridge-one': continuation('bridge-one')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]').dataset.processCallCount, '1');
    assert.equal(primaryId(ui.host), 'bridge-one');
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1, 'the completed tool and current continuation share one headline');

    source += token('second', 'executionStatus');
    replacement = {...replacement, second: status('second', {inlineState: 'running', label: '正在处理知识图谱', action: '正在核对第二份来源'})};
    // Even if a continuation's clear event arrives after the next tool, it must
    // not leave a spinner between two calls belonging to the same group.
    await ui.render(source, replacement);
    const group = ui.host.querySelector('[data-work-process]');
    assert.equal(group.dataset.processCallCount, '2');
    assert.equal(primaryId(ui.host), 'second');
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    await act(async () => useExecutionStore.getState().upsertExecution({
        executionId: 'execution', conversationId: 'chat', runId: 'run', active: true, status: 'running', updatedAt: 20,
        guidancePrompts: {}, toolStatusNodes: {second: {statusId: 'second', toolCallId: 'second', state: 'completed', action: '正在核对第二份来源'}},
    }));
    assert.equal(primaryId(ui.host), 'second');
    assert.match(group.textContent, /2 项操作/);
    assert.equal(group.dataset.processState, 'running', 'completed tools do not finish the still-streaming turn');

    source += token('bridge-two', 'executionStatus');
    replacement = {...replacement, 'bridge-two': continuation('bridge-two', {updatedAt: 20})};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(primaryId(ui.host), 'bridge-two');
    await act(async () => group.querySelector('button[aria-expanded]').click());
    assert.equal(group.querySelectorAll('[data-work-process-records] [data-execution-status-id]').length, 3);
    source += token('third', 'executionStatus');
    replacement = {...replacement, third: status('third', {inlineState: 'running', updatedAt: 30, action: '正在核对最后一份来源'})};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(primaryId(ui.host), 'third');
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true', 'new deltas retain the user expansion choice');
    assert.equal(ui.host.querySelector('[data-execution-status-id="bridge-two"]'), null);
    await act(async () => group.querySelector('button[aria-expanded]').click());

    copyButton.dispatchEvent(new ui.dom.window.MouseEvent('mousedown', {bubbles: true}));
    replacement = {...replacement, second: status('second', {updatedAt: 40}), third: status('third', {updatedAt: 40}), 'bridge-one': '', 'bridge-two': ''};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('.copy-button'), copyButton);
    await act(async () => { copyButton.dispatchEvent(new ui.dom.window.MouseEvent('mouseup', {bubbles: true})); copyButton.click(); });
    assert.deepEqual(ui.copied, ['copy while executing']);
    assert.equal(primaryId(ui.host), 'third');
    assert.match(group.textContent, /3 项操作/);
    await ui.render(source, replacement, false);
    assert.equal(primaryId(ui.host), 'third');
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);

    source += '\n\n新的可见正文\n\n' + token('fourth', 'executionStatus');
    replacement = {...replacement, fourth: status('fourth')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2, 'visible prose remains a group boundary');
    assert.match(ui.host.textContent, /新的可见正文/);
});

test('replacement-only updates regroup without a final message snapshot and never swallow a placeholder that later becomes visible', async (t) => {
    const ui = await setup(t);
    const source = token('one', 'executionStatus') + token('waiting') + token('two', 'executionStatus');
    let replacement = {one: status('one'), two: status('two')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2, 'unknown replacement conservatively breaks the group');
    replacement = {...replacement, waiting: {frontend: '[markdown]\n'}};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    replacement = {...replacement, waiting: {frontend: '[markdown]\n稍后到达的正文'}};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2);
    assert.match(ui.host.textContent, /稍后到达的正文/);
    const [first, second] = ui.host.querySelectorAll('[data-work-process]');
    const paragraph = [...ui.host.querySelectorAll('p')].find((node) => node.textContent === '稍后到达的正文');
    assert.ok(first.compareDocumentPosition(paragraph) & ui.dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(paragraph.compareDocumentPosition(second) & ui.dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
});

test('cleared tool placeholders leave no spaced Markdown block and can later display a result', async (t) => {
    const ui = await setup(t);
    const source = token('read', 'executionStatus') + token('empty') + token('write', 'executionStatus');
    const replacement = {read: status('read', {toolNames: ['code_read']}),
        write: status('write', {toolNames: ['code_write']}), empty: {frontend: '[markdown]\n  \n'}};
    await ui.render(source, replacement);
    const first = ui.host.querySelector('[data-work-process="read"]');
    const empty = ui.host.querySelector('[data-tts-source-id="empty"]');
    assert.ok(empty, 'the stable replacement slot remains available');
    assert.equal(empty.childElementCount, 0, 'a cleared slot must not leave a margin-bearing Markdown wrapper');
    await ui.render(source, {...replacement, empty: {frontend: '[markdown]\n实际产物说明'}});
    assert.match(ui.host.textContent, /实际产物说明/);
    assert.equal(ui.host.querySelector('[data-work-process="read"]'), first);
});

test('mixed reasoning and different tool families share one mounted process; final snapshots preserve media and manual expansion', async (t) => {
    const ui = await setup(t);
    let source = '![演示](/demo.mp4){type=video}' + token('reasoning-one', 'thinking');
    let replacement = {'reasoning-one': {frontend: '不应默认挂载的长推理', workProcess: {
        kind: 'reasoning', conversationId: 'chat', runId: 'run', executionId: 'execution', state: 'running', startedAt: 1000,
    }}};
    await ui.render(source, replacement);
    const video = ui.host.querySelector('video');
    assert.ok(video);
    video.currentTime = 12.5;
    const group = ui.host.querySelector('[data-work-process]');
    assert.ok(group);
    assert.doesNotMatch(group.textContent, /不应默认挂载/);
    replacement = {...replacement, 'reasoning-one': {...replacement['reasoning-one'], frontend: '不应默认挂载的长推理\n[DONE]'}};
    source += token('shell', 'executionStatus');
    replacement.shell = status('shell', {toolNames: ['code_shell'], inlineState: 'running', action: '正在检查环境'});
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.match(group.textContent, /正在检查环境/);
    await act(async () => group.querySelector('button[aria-expanded]').click());
    assert.ok(group.querySelector('[data-process-reasoning]'));
    assert.doesNotMatch(group.textContent, /不应默认挂载/, 'reasoning text remains lazy inside the expanded timeline');
    source += token('reasoning-two', 'thinking') + token('read', 'executionStatus');
    replacement = {...replacement, shell: status('shell', {toolNames: ['code_shell'], inlineState: 'failed'}),
        'reasoning-two': {frontend: '换一种办法\n[DONE]'}, read: status('read', {toolNames: ['code_read']})};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    assert.equal(group.dataset.processCallCount, '2');
    assert.match(group.querySelector('[data-process-outcomes]').textContent, /1 项失败/);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    assert.doesNotMatch(ui.host.textContent, /Thinking Finished/);
    await ui.render(source, structuredClone(replacement), false);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(ui.host.querySelector('video'), video);
    assert.equal(video.currentTime, 12.5);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    await act(async () => group.querySelector('[data-process-reasoning] button').click());
    assert.match(group.textContent, /不应默认挂载的长推理/);
    assert.doesNotMatch(group.textContent, /\[DONE\]/);
});

test('late replacement metadata can merge traces without remounting a following video', async (t) => {
    const ui = await setup(t);
    const source = token('thought', 'thinking') + token('unknown') + token('tool', 'executionStatus')
        + '\n\n![视频](/after.mp4){type=video}';
    const replacement = {thought: {frontend: 'analysis\n[DONE]'}, tool: status('tool')};
    await ui.render(source, replacement);
    const video = ui.host.querySelector('video');
    video.currentTime = 8;
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2);
    await ui.render(source, {...replacement, unknown: {frontend: '[markdown]\n'}}, false);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    assert.equal(ui.host.querySelector('video'), video);
    assert.equal(video.currentTime, 8);
});
