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
const finishCollapse = async (ui, group) => act(async () => {
    const event = new ui.dom.window.Event('transitionend', {bubbles: true});
    Object.defineProperty(event, 'propertyName', {value: 'grid-template-rows'});
    group.querySelector('[data-work-process-panel]').dispatchEvent(event);
});

test('first analysis defaults open before prose or tools and displays live public text', async (t) => {
    const ui = await setup(t);
    const source = token('initial', 'thinking');
    let replacement = {initial: {frontend: '', backend: 'private backend', reasoning: 'private replay', workProcess: {
        kind: 'reasoning', runId: 'run', conversationId: 'chat', state: 'running', label: '分析中', startedAt: 1000,
    }}};
    await ui.render(source, replacement);
    const group = ui.host.querySelector('[data-work-process]');
    assert.ok(group, 'a nonempty analysis body or a tool must not be required');
    assert.equal(group.dataset.processState, 'running');
    const button = group.querySelector('button[aria-expanded]');
    assert.match(button.textContent, /分析中/);
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    assert.match(group.textContent, /正在等待模型返回可展示的分析内容/);
    assert.doesNotMatch(group.textContent, /private backend|private replay/);
    assert.equal(group.querySelectorAll('button[aria-expanded]').length, 1, 'analysis has no second nested disclosure');
    replacement = {...replacement, initial: {...replacement.initial, frontend: '模型返回的公开分析'}};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(group.querySelector('button[aria-expanded]'), button);
    assert.match(group.textContent, /模型返回的公开分析/);
});

test('analysis-only completion folds naturally and a hidden-reasoning provider does not invent display text', async (t) => {
    const ui = await setup(t);
    const source = token('hidden', 'thinking');
    const running = {frontend: '', workProcess: {kind: 'reasoning', runId: 'run', conversationId: 'chat',
        state: 'running', label: '分析中', startedAt: 1000}};
    await ui.render(source, {hidden: running});
    const group = ui.host.querySelector('[data-work-process]');
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    const done = {...running, frontend: '\n[DONE]',
        workProcess: {...running.workProcess, state: 'completed', finishedAt: 2000}};
    await ui.render(source, {hidden: done});
    assert.equal(group.dataset.processState, 'running', 'completed reasoning does not finish the user turn');
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false', 'analysis folds before later prose arrives');
    await ui.render(source + '\n\n最终回答。', {hidden: done}, false);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.match(group.textContent, /分析完成/);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');
    assert.equal(group.querySelector('[data-work-process-panel]').dataset.state, 'closed');
    await finishCollapse(ui, group);
    assert.equal(group.querySelector('[data-work-process-records]'), null);
    await act(async () => group.querySelector('button[aria-expanded]').click());
    assert.match(group.textContent, /模型未提供可展示的分析内容/);
    assert.match(ui.host.textContent, /最终回答/);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
});

test('a failed or cancelled first analysis stops spinning and leaves its public details inspectable', async (t) => {
    const ui = await setup(t);
    for (const state of ['failed', 'cancelled']) {
        const id = `analysis-${state}`;
        await ui.render(token(id, 'thinking'), {[id]: {frontend: `公开的部分内容\n[${state === 'failed' ? 'FAILED' : 'DONE'}]`,
            workProcess: {kind: 'reasoning', state, runId: id, conversationId: 'chat'}}}, false);
        const group = ui.host.querySelector('[data-work-process]');
        assert.equal(group.dataset.processState, state);
        assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
        assert.match(group.textContent, /公开的部分内容/);
        assert.equal(group.querySelector('.animate-spin'), null);
    }
});

test('analysis inside a tool group opens while running and folds after completion without manual input', async (t) => {
    const ui = await setup(t);
    const source = token('grouped-tool', 'executionStatus') + token('grouped-analysis', 'thinking');
    const thinking = {frontend: '实时分析内容', workProcess: {kind: 'reasoning', runId: 'run',
        conversationId: 'chat', state: 'running'}};
    const replacement = {'grouped-tool': status('grouped-tool'), 'grouped-analysis': thinking};
    await ui.render(source, replacement);
    const group = ui.host.querySelector('[data-work-process]');
    const analysis = group.querySelector('[data-process-reasoning="grouped-analysis"]');
    assert.equal(analysis.querySelector('button').getAttribute('aria-expanded'), 'true');
    assert.match(analysis.textContent, /实时分析内容/);
    await ui.render(source + token('next-tool', 'executionStatus'), {...replacement,
        'grouped-analysis': {...thinking, frontend: '实时分析内容\n[DONE]',
            workProcess: {...thinking.workProcess, state: 'completed'}},
        'next-tool': status('next-tool', {inlineState: 'running'})});
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    assert.equal(analysis.querySelector('button').getAttribute('aria-expanded'), 'false');
    assert.equal(analysis.querySelector('[data-work-process-panel]').dataset.state, 'closed');
    await finishCollapse(ui, analysis);
    assert.doesNotMatch(analysis.textContent, /实时分析内容/);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
});

test('manual analysis choices survive completion and joining a tool group', async (t) => {
    const ui = await setup(t);
    for (const keepOpen of [false, true]) {
        const id = `chosen-analysis-${keepOpen}`;
        const source = token(id, 'thinking');
        const thought = {frontend: '用户正在阅读的内容', workProcess: {kind: 'reasoning', state: 'running',
            conversationId: 'chat', runId: 'run'}};
        await ui.render(source, {[id]: thought});
        const group = ui.host.querySelector('[data-work-process]');
        await act(async () => group.querySelector('button[aria-expanded]').click());
        if (keepOpen) await act(async () => group.querySelector('button[aria-expanded]').click());
        const done = {...thought, frontend: thought.frontend + '\n[DONE]',
            workProcess: {...thought.workProcess, state: 'completed'}};
        await ui.render(source, {[id]: done});
        assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), String(keepOpen));
        await ui.render(source + token(`${id}-tool`, 'executionStatus'), {
            [id]: done, [`${id}-tool`]: status(`${id}-tool`, {inlineState: 'running'})});
        assert.equal(ui.host.querySelector('[data-work-process]'), group);
        assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), String(keepOpen));
        if (!keepOpen) await act(async () => group.querySelector('button[aria-expanded]').click());
        const record = group.querySelector('[data-process-reasoning]');
        assert.equal(record.querySelector('button').getAttribute('aria-expanded'), String(keepOpen));
        await act(async () => record.querySelector('button').click());
        await ui.render(source + token(`${id}-tool`, 'executionStatus'), {[id]: done,
            [`${id}-tool`]: status(`${id}-tool`, {inlineState: 'running', updatedAt: 30})});
        assert.equal(record.querySelector('button').getAttribute('aria-expanded'), String(!keepOpen));
    }
});

test('streamed calls default to expanded and retain a manual collapse until prose intervenes', async (t) => {
    const ui = await setup(t);
    let source = '```text\ncopy while executing\n```' + token('first', 'executionStatus');
    let replacement = {first: status('first')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    const initialGroup = ui.host.querySelector('[data-work-process]');
    assert.equal(initialGroup.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    await act(async () => initialGroup.querySelector('button[aria-expanded]').click());
    assert.ok(initialGroup.querySelector('[data-work-process-records]'), 'records remain mounted until the exit finishes');
    assert.equal(initialGroup.querySelector('[data-work-process-panel]').getAttribute('aria-hidden'), 'true');
    await finishCollapse(ui, initialGroup);
    assert.equal(initialGroup.querySelector('[data-work-process-records]'), null);
    const copyButton = ui.host.querySelector('.copy-button');

    source += token('bridge-one', 'executionStatus');
    replacement = {...replacement, 'bridge-one': continuation('bridge-one')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]').dataset.processCallCount, '1');
    assert.equal(initialGroup.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false', 'stream updates respect a manual collapse');
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
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1, 'an unresolved slot renders nothing and must not split the visible process');
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

test('mixed reasoning and tools collapse after completion without reloading media, and can be reopened manually', async (t) => {
    const ui = await setup(t);
    let source = '![演示](/demo.mp4){type=video}' + token('reasoning-one', 'thinking');
    let replacement = {'reasoning-one': {frontend: '首轮公开分析', workProcess: {
        kind: 'reasoning', conversationId: 'chat', runId: 'run', executionId: 'execution', state: 'running', startedAt: 1000,
    }}};
    await ui.render(source, replacement);
    const video = ui.host.querySelector('video');
    assert.ok(video);
    video.currentTime = 12.5;
    const group = ui.host.querySelector('[data-work-process]');
    assert.ok(group);
    assert.match(group.textContent, /首轮公开分析/);
    replacement = {...replacement, 'reasoning-one': {...replacement['reasoning-one'], frontend: '首轮公开分析\n[DONE]'}};
    source += token('shell', 'executionStatus');
    replacement.shell = status('shell', {toolNames: ['code_shell'], inlineState: 'running', action: '正在检查环境'});
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.match(group.textContent, /正在检查环境/);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    assert.ok(group.querySelector('[data-process-reasoning]'));
    assert.doesNotMatch(group.textContent, /首轮公开分析/, 'completed reasoning folds inside the expanded timeline');
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
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false', 'completion starts the automatic exit');
    assert.ok(group.querySelector('[data-work-process-records]'), 'records survive the closing animation');
    await finishCollapse(ui, group);
    assert.equal(group.querySelector('[data-work-process-records]'), null);
    await act(async () => group.querySelector('button[aria-expanded]').click());
    await ui.render(source, structuredClone(replacement), false);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true', 'an explicit reopen survives later completed snapshots');
    await act(async () => group.querySelector('[data-process-reasoning] button').click());
    assert.match(group.textContent, /首轮公开分析/);
    assert.doesNotMatch(group.textContent, /\[DONE\]/);
});

test('a late visible result splits traces without remounting a following video', async (t) => {
    const ui = await setup(t);
    const source = token('thought', 'thinking') + token('unknown') + token('tool', 'executionStatus')
        + '\n\n![视频](/after.mp4){type=video}';
    const replacement = {thought: {frontend: 'analysis\n[DONE]'}, tool: status('tool')};
    await ui.render(source, replacement);
    const video = ui.host.querySelector('video');
    video.currentTime = 8;
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    await ui.render(source, {...replacement, unknown: {frontend: '[markdown]\n'}}, false);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1);
    await ui.render(source, {...replacement, unknown: {frontend: '[markdown]\n独立的结果说明'}}, false);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2);
    assert.match(ui.host.textContent, /独立的结果说明/);
    assert.equal(ui.host.querySelector('video'), video);
    assert.equal(video.currentTime, 8);
});

test('real execution stream with absent backend-only results stays grouped before and after history hydration', async (t) => {
    const ui = await setup(t);
    let source = token('thought-one', 'thinking') + token('enter') + token('tool-result-enter')
        + token('prepare', 'executionStatus') + token('thought-two', 'thinking');
    let replacement = {'thought-one': {frontend: 'first\n[DONE]'}, enter: '[markdown]\n',
        prepare: continuation('prepare', {inlineState: 'completed'}), 'thought-two': {frontend: 'next\n[DONE]'}};
    await ui.render(source, replacement);
    const group = ui.host.querySelector('[data-work-process]');
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    for (let index = 1; index <= 4; index++) {
        source += token(`host-${index}`) + token(`tool-result-${index}`) + token(`call-${index}`, 'executionStatus')
            + token(`bridge-${index}`, 'executionStatus') + token(`thought-${index + 2}`, 'thinking');
        replacement = {...replacement, [`host-${index}`]: '[executionWindowTool]\nprivate command details',
            [`call-${index}`]: status(`call-${index}`, {toolNames: [index % 2 ? 'code_shell' : 'code_read_many']}),
            [`thought-${index + 2}`]: {frontend: 'continuing\n[DONE]'}};
        await ui.render(source, replacement);
        assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 1, 'no final message snapshot is needed to collapse');
        assert.equal(ui.host.querySelector('[data-work-process]'), group);
        assert.equal(group.dataset.processCallCount, String(index));
    }
    source += '\n\n继续检查环境。' + token('final', 'executionStatus');
    replacement = {...replacement, final: status('final')};
    await ui.render(source, replacement);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2, 'only visible prose separates work');
    const hydrated = {...replacement, 'tool-result-enter': ''};
    for (let index = 1; index <= 4; index++) {
        hydrated[`tool-result-${index}`] = '';
        hydrated[`bridge-${index}`] = '';
    }
    await ui.render(source, hydrated, false);
    assert.equal(ui.host.querySelectorAll('[data-work-process]').length, 2);
    assert.equal(ui.host.querySelector('[data-work-process]'), group);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');
    await finishCollapse(ui, group);
    await act(async () => group.querySelector('button[aria-expanded]').click());
    assert.equal(group.querySelectorAll('[data-work-process-records] [data-execution-status-id]').length, 4);
});

test('live completion animates once, a rapid manual reopen cancels exit, and failures remain expanded', async (t) => {
    const ui = await setup(t);
    const source = token('completion', 'executionStatus');
    await ui.render(source, {completion: status('completion', {inlineState: 'running'})});
    const group = ui.host.querySelector('[data-work-process]');
    const records = group.querySelector('[data-work-process-records]');
    await ui.render(source, {completion: status('completion')});
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true', 'one finished call does not close a still-streaming turn');
    await act(async () => useExecutionStore.getState().upsertExecution({
        conversationId: 'chat', runId: 'run', executionId: 'execution', active: false, status: 'completed', updatedAt: 100,
    }));
    assert.equal(group.dataset.processState, 'completed');
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');
    assert.equal(group.querySelector('[data-work-process-records]'), records, 'exit keeps the mounted records until it ends');
    await act(async () => group.querySelector('button[aria-expanded]').click());
    await finishCollapse(ui, group);
    assert.equal(group.querySelector('[data-work-process-records]'), records, 'a late exit event cannot unmount an already reopened panel');
    await ui.render(source, {completion: status('completion', {updatedAt: 110})}, false);
    assert.equal(group.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    for (const state of ['failed', 'cancelled']) {
        await ui.render(token(`attention-${state}`, 'executionStatus'), {
            [`attention-${state}`]: status(`attention-${state}`, {inlineState: state, executionId: `attention-${state}`, runId: `attention-${state}`}),
        }, false);
        const attention = ui.host.querySelector('[data-work-process]');
        assert.equal(attention.dataset.processState, state);
        assert.equal(attention.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true', 'unsuccessful work remains inspectable');
    }
});
