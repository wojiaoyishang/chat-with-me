import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {renderToStaticMarkup} from 'react-dom/server';
import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';

import {remarkCardReplace} from '../src/components/markdown/remarkDirectiveToComponent.js';
import {remarkCollapseExecutionStatuses} from '../src/components/markdown/remarkCollapseExecutionStatuses.js';
import {getExecutionDisplayState, getExecutionStatusGroupKey} from '../src/features/execution/executionStatusModel.js';

const makeStatus = (id, overrides = {}) => ({
    type: 'executionStatus',
    content: JSON.stringify({
        executionId: 'run-1',
        statusId: id,
        inlineState: 'completed',
        status: 'running',
        label: '处理文档 · 已完成',
        phase: 'document',
        ...overrides,
    }),
});

const parse = (source, replacement, renderSurface = 'conversation') => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkCardReplace)
        .use(remarkCollapseExecutionStatuses, {replacement, renderSurface});
    return processor.runSync(processor.parse(source));
};

test('adjacent duplicate execution statuses keep a stable first host plus all history IDs', () => {
    const source = '{{cardReplace id=first}}\n\n{{cardReplace id=second}}\n\n{{cardReplace id=third}}';
    const tree = parse(source, {
        first: makeStatus('status-1'),
        second: makeStatus('status-2'),
        third: makeStatus('status-3'),
    });

    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].data.hProperties.id, 'first');
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['first', 'second', 'third']);
    assert.match(source, /cardReplace id=first/);

    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkCardReplace, [remarkCollapseExecutionStatuses, {
            replacement: {
                first: makeStatus('status-1'),
                second: makeStatus('status-2'),
                third: makeStatus('status-3'),
            },
        }]],
        components: {
            'card-replace': ({node}) => React.createElement('div', {
                'data-latest': node.properties.id,
                'data-history': node.properties.groupedIds,
            }),
        },
    }, source));
    assert.match(html, /data-latest="first"/);
    assert.match(html, /data-history="\[&quot;first&quot;,&quot;second&quot;,&quot;third&quot;\]"/);
});

test('visible text and different tools, executions, and runs break a group', () => {
    const tree = parse([
        '{{cardReplace id=a}}',
        '{{cardReplace id=b}}',
        '中间文字',
        '{{cardReplace id=c}}',
        '{{cardReplace id=d}}',
        '{{cardReplace id=e}}',
        '{{cardReplace id=f}}',
    ].join('\n\n'), {
        a: makeStatus('a', {toolNames: ['query']}),
        b: makeStatus('b', {toolNames: ['query']}),
        c: makeStatus('c', {toolNames: ['query']}),
        d: makeStatus('d', {toolNames: ['write']}),
        e: makeStatus('e', {toolNames: ['write'], executionId: 'run-2'}),
        f: makeStatus('f', {toolNames: ['write'], executionId: 'run-2', runId: 'retry'}),
    });

    assert.equal(tree.children.length, 6);
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['a', 'b']);
    assert.equal(tree.children[1].children[0].value, '中间文字');
    assert.deepEqual(tree.children.slice(2).map((node) => node.data.hProperties.id), ['c', 'd', 'e', 'f']);
});

test('same tool groups across state and action changes without losing guidance records', () => {
    const tree = parse('{{cardReplace id=a}}\n\n{{cardReplace id=b}}\n\n{{cardReplace id=c}}', {
        a: makeStatus('a', {toolNames: ['query'], label: '首次查询已完成', action: '查找定义'}),
        b: makeStatus('b', {toolNames: ['query'], inlineState: 'failed', label: '调用失败'}),
        c: makeStatus('c', {toolNames: ['query'], inlineState: 'running', label: '正在重试', action: '补查关联观点', guidancePrompt: {label: '等待输入'}}),
    });
    assert.equal(tree.children.length, 1);
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['a', 'b', 'c']);

    const withContext = parse('{{cardReplace id=a}}\n\n{{cardReplace id=c}}', {
        a: makeStatus('a'),
        c: {...makeStatus('c'), contextStatus: {status: 'ignored'}},
    });
    assert.equal(withContext.children.length, 2);
});

test('known invisible tool hosts do not split a transcript group but remain visible boundaries in the execution window', () => {
    const source = '{{cardReplace id=a}}\n\n{{cardReplace id=host}}\n\n{{cardReplace id=b}}';
    const replacement = {
        a: makeStatus('a', {toolNames: ['query']}), b: makeStatus('b', {toolNames: ['query'], inlineState: 'running'}),
        host: {type: 'executionWindowTool', content: 'tool details'},
    };
    const tree = parse(source, replacement);
    assert.equal(tree.children.length, 2);
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['a', 'b']);
    assert.equal(tree.children[1].data.hProperties.id, 'host');
    assert.equal(parse(source, replacement, 'execution_window').children.length, 3);
    assert.equal(parse(source, {...replacement, host: {...replacement.host, contextStatus: {status: 'ignored'}}}).children.length, 3);
    assert.equal(parse(source, {...replacement, host: {type: 'markdown', content: 'visible details'}}).children.length, 3);
});

test('cleared continuation statuses between fast calls retain their hosts without splitting the group', () => {
    const source = ['a', 'continuation', 'progress', 'host', 'b'].map((id) => `{{cardReplace id=${id}}}`).join('\n\n');
    const replacement = {
        a: makeStatus('a', {toolNames: ['query']}),
        continuation: {type: 'executionStatus', content: '  \n'},
        progress: {frontend: '[markdown]\n'},
        host: {type: 'executionWindowTool', content: 'tool details'},
        b: makeStatus('b', {toolNames: ['query'], inlineState: 'running', action: '补查关联内容'}),
    };
    const tree = parse(source, replacement);
    assert.deepEqual(tree.children.map((node) => node.data.hProperties.id), ['a', 'continuation', 'progress', 'host']);
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['a', 'b']);

    // Empty continuation hosts are invisible on both rendering surfaces, while a
    // nonempty continuation, visible badge, or absent replacement is a boundary.
    const withoutToolHost = source.replace('{{cardReplace id=host}}', '');
    assert.equal(parse(withoutToolHost, replacement, 'execution_window').children.length, 3);
    const visibleContinuation = parse(source, {...replacement, continuation: makeStatus('continuation', {inlineState: 'running', label: '正在分析下一步'})});
    assert.deepEqual(visibleContinuation.children.map((node) => node.data.hProperties.id), ['a', 'continuation', 'progress', 'host', 'b']);
    assert.equal(visibleContinuation.children[0].data.hProperties.groupedIds, undefined);
    assert.equal(parse(source, {...replacement, continuation: {...replacement.continuation, contextStatus: {status: 'ignored'}}}).children.length, 5);
    assert.equal(parse(source, {...replacement, continuation: undefined}).children.length, 5);
    assert.equal(parse(source, {...replacement, progress: {type: 'unknown', content: ''}}).children.length, 5);
    assert.equal(parse(source, {...replacement, progress: {frontend: '[markdown]\n可见正文'}}).children.length, 5);
    assert.equal(parse(source, {...replacement, progress: {frontend: '[markdown]\n', contextStatus: {status: 'ignored'}}}).children.length, 5);
    assert.equal(parse(source, {...replacement, continuation: {type: 'executionStatus', content: '{incomplete json'}}).children.length, 5);
});

test('finished per-call state is not overwritten by a later execution failure', () => {
    assert.equal(getExecutionDisplayState({inlineState: 'completed', status: 'failed'}), 'completed');
    assert.equal(getExecutionDisplayState({inlineState: 'failed', status: 'completed'}), 'failed');
    assert.equal(getExecutionDisplayState({status: 'recoverable_failed'}), 'failed');
});

test('live continuations update the current group without adding calls or splitting consecutive tools', () => {
    const source = ['a', 'bridge', 'hidden', 'b', 'tail'].map((id) => `{{cardReplace id=${id}}}`).join('\n\n');
    const replacement = {
        a: makeStatus('a', {inlineKind: 'tool', toolNames: ['query']}),
        b: makeStatus('b', {inlineKind: 'tool', toolNames: ['query'], inlineState: 'running'}),
        hidden: {type: 'executionWindowTool', content: 'tool details'},
        bridge: makeStatus('bridge', {inlineKind: 'continuation', inlineState: 'running', label: '调用工具中'}),
        tail: makeStatus('tail', {inlineKind: 'continuation', inlineState: 'running', label: '正在分析结果'}),
    };
    const live = parse(source, replacement);
    assert.deepEqual(live.children.map((node) => node.data.hProperties.id), ['a', 'hidden']);
    assert.deepEqual(JSON.parse(live.children[0].data.hProperties.groupedIds), ['a', 'b']);
    assert.equal(live.children[0].data.hProperties.continuationId, 'tail');

    const onlyNewCall = parse(source, {...replacement, tail: {type: 'executionStatus', content: ''}});
    assert.equal(onlyNewCall.children[0].data.hProperties.continuationId, undefined, 'new call supersedes the previous bridge even if its clear delta is delayed');
    const replay = parse(source, {...replacement, bridge: {type: 'executionStatus', content: ''}, tail: {type: 'executionStatus', content: ''}});
    assert.deepEqual(JSON.parse(replay.children[0].data.hProperties.groupedIds), ['a', 'b']);
});

test('continuations never cross prose, a different execution/run, visible badges or other operation families', () => {
    const a = makeStatus('a', {inlineKind: 'tool', toolNames: ['query']});
    const tail = makeStatus('tail', {inlineKind: 'continuation', inlineState: 'running'});
    const pair = '{{cardReplace id=a}}\n\n{{cardReplace id=tail}}';
    for (const overrides of [{executionId: 'other'}, {runId: 'other'}, {conversationId: 'other'}]) {
        assert.equal(parse(pair, {a, tail: makeStatus('tail', {inlineKind: 'continuation', ...overrides})}).children.length, 2);
    }
    assert.equal(parse(pair.replace('\n\n', '\n\n可见正文\n\n'), {a, tail}).children.length, 3);
    assert.equal(parse(pair, {a, tail: {...tail, contextStatus: {status: 'ignored'}}}).children.length, 2);
    const differentTool = parse(`${pair}\n\n{{cardReplace id=b}}`, {a, tail, b: makeStatus('b', {inlineKind: 'tool', toolNames: ['write']})});
    assert.equal(differentTool.children.length, 2);
    assert.equal(differentTool.children[0].data.hProperties.continuationId, undefined, 'another concrete tool supersedes the pending bridge without merging unrelated tool families');
});

test('known knowledge operations share a family while writes, phases, and unknown namespaces stay separate', () => {
    const key = (toolNames, overrides = {}) => getExecutionStatusGroupKey(JSON.parse(makeStatus('one', {
        toolNames, label: '处理知识图谱 · 已完成', phase: 'investigation', ...overrides,
    }).content));
    const read = key(['knowledgeNetwork_search_nodes_by_keywords']);
    assert.equal(read, key(['knowledgeNetwork_get_related_graph', 'knowledgeNetwork_get_chunk_content']));
    assert.equal(read, key(['knowledgeNetwork_get_schema'], {inlineState: 'running', label: '正在处理知识图谱'}));
    assert.notEqual(read, key(['knowledgeNetwork_add_node']));
    assert.notEqual(read, key(['knowledgeNetwork_get_schema'], {phase: 'verification'}));
    assert.notEqual(read, key(['knowledgeNetwork_future_unknown_method']));
    assert.notEqual(key(['arbitrary_search']), key(['arbitrary_delete']));
    assert.notEqual(read, key(['knowledgeNetwork_search_nodes_by_keywords', 'knowledgeNetwork_add_node']));

    // New payloads can explicitly identify another family without guessing by
    // name. Historical knowledge batches commonly persisted toolset: null.
    const withMeta = (name, evidence) => key([name], {toolCallId: 'call', toolStatusNodes: {
        call: {executionMeta: {toolset: 'explicit-family', promote: true, evidence}},
    }});
    assert.equal(withMeta('first_read', []), withMeta('second_read', []));
    assert.notEqual(withMeta('first_read', []), withMeta('write', ['mutation']));
});

test('collapsed status group shows one row and can expand older process links', async () => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;

    await build({
        stdin: {
            contents: "export {default} from './src/features/execution/ExecutionStatusGroup.jsx';",
            resolveDir: process.cwd(),
        },
        bundle: true,
        packages: 'external',
        jsx: 'automatic',
        format: 'esm',
        platform: 'node',
        outfile: 'temp/execution-status-group-test.mjs',
        plugins: [{name: 'status-fixture', setup(builder) {
            builder.onResolve({filter: /(?:ExecutionStatus\.jsx|useExecutionStore\.js)$/}, ({path}) => ({path, namespace: 'fixture'}));
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({
                loader: 'jsx',
                resolveDir: process.cwd(),
                contents: path.endsWith('useExecutionStore.js')
                    ? 'export const useExecutionStore = (selector) => selector({sessions:globalThis.__groupSessions || {}});'
                    : 'export default ({content}) => <button data-status-id={JSON.parse(content).statusId}>查看过程</button>;',
            }));
        }}],
    });

    const {default: ExecutionStatusGroup} = await import('../temp/execution-status-group-test.mjs');
    const entries = ['first', 'second', 'latest'].map((id) => ({id, content: makeStatus(id).content}));
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(ExecutionStatusGroup, {entries: [...entries], conversationId: 'chat'})));
        assert.deepEqual([...document.querySelectorAll('[data-status-id]')].map((node) => node.dataset.statusId), ['latest']);
        const toggle = document.querySelector('button[aria-expanded]');
        assert.equal(toggle.textContent.includes('3 次'), true);

        await act(async () => toggle.click());
        assert.deepEqual([...document.querySelectorAll('[data-status-id]')].map((node) => node.dataset.statusId), ['latest', 'first', 'second']);
        assert.equal(toggle.getAttribute('aria-expanded'), 'true');

        await act(async () => toggle.click());
        assert.equal(document.querySelectorAll('[data-status-id]').length, 1);
        globalThis.__groupSessions = {chat: {executions: {'run-1': {guidancePrompts: {first: {label: '等待输入'}}}}}};
        await act(async () => root.render(React.createElement(ExecutionStatusGroup, {entries: [...entries], conversationId: 'chat'})));
        assert.deepEqual([...document.querySelectorAll('[data-status-id]')].map((node) => node.dataset.statusId), ['first']);
        assert.equal(toggle.disabled, false);

        // Multiple guidance anchors stay consolidated in the main section and no
        // longer force unrelated historical tool rows open.
        globalThis.__groupSessions.chat.executions['run-1'].guidancePrompts.second = {label: '等待模型响应'};
        await act(async () => root.render(React.createElement(ExecutionStatusGroup, {entries: [...entries], conversationId: 'chat'})));
        assert.equal(document.querySelectorAll('[data-status-id]').length, 1);
        assert.equal(toggle.disabled, false);

        delete globalThis.__groupSessions;
        const activeEntries = entries.map((entry, index) => ({...entry, content: makeStatus(entry.id, {
            toolNames: ['query'], inlineState: index === 1 ? 'running' : index === 0 ? 'failed' : 'completed',
        }).content}));
        await act(async () => root.render(React.createElement(ExecutionStatusGroup, {entries: activeEntries, conversationId: 'chat'})));
        assert.deepEqual([...document.querySelectorAll('[data-status-id]')].map((node) => node.dataset.statusId), ['second']);
        assert.match(toggle.textContent, /1 次失败/);
        await act(async () => toggle.click());
        assert.deepEqual([...document.querySelectorAll('[data-status-id]')].map((node) => node.dataset.statusId), ['second', 'first', 'latest']);
        assert.deepEqual([...document.querySelectorAll('[data-execution-status-group-history] span')].map((node) => node.textContent), ['第 1 次', '第 3 次']);
    } finally {
        await act(async () => root.unmount());
        delete globalThis.__groupSessions;
        dom.window.close();
    }
});

test('action summaries retain real completion/failure states and grouped links navigate to the exact call or completed overview', async () => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    await build({
        stdin: {contents: `export {default as Status} from './src/features/execution/ExecutionStatus.jsx';
            export {default as Group} from './src/features/execution/ExecutionStatusGroup.jsx';
            export {useExecutionStore} from './src/features/execution/useExecutionStore.js';`, resolveDir: process.cwd()},
        bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
        outfile: 'temp/execution-status-actions-test.mjs',
        plugins: [{name: 'action-fixture', setup(builder) {
            builder.onResolve({filter: /^(?:react-i18next)$|ExecutionGuidanceBubble\.jsx$/}, ({path}) => ({path, namespace: 'fixture'}));
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({loader: 'jsx', resolveDir: process.cwd(), contents:
                path === 'react-i18next' ? 'export const useTranslation=()=>({t:(key)=>key});'
                    : 'export default ({activity})=><div data-test-guidance={activity.id}>{activity.content}</div>;'}));
        }}],
    });
    const {Status, Group, useExecutionStore} = await import('../temp/execution-status-actions-test.mjs');
    const root = createRoot(document.getElementById('root'));
    const records = ['first', 'second'].map((id) => ({id, content: makeStatus(id, {
        conversationId: 'chat', toolNames: ['knowledge_query'], toolCallId: `call-${id}`,
        action: '正在核对两篇论文的关联观点',
        navigationTarget: {toolCallId: `call-${id}`, replacementId: `result-${id}`},
    }).content}));
    try {
        await act(async () => root.render(React.createElement(Status, {content: records[0].content})));
        assert.match(document.body.textContent, /核对两篇论文的关联观点/);
        assert.doesNotMatch(document.body.textContent, /正在核对/);
        assert.equal(document.querySelector('[data-execution-action-state]').textContent.trim(), '已完成');
        await act(async () => document.querySelector('[data-execution-status-id] button').click());
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, 'call-first');
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.replacementId, 'result-first');

        await act(async () => root.render(React.createElement(Status, {content: makeStatus('failed', {
            conversationId: 'chat', inlineState: 'failed', status: 'running', action: '正在写入知识库',
        }).content})));
        assert.equal(document.querySelector('[data-execution-action-state]').textContent.trim(), '失败');
        assert.doesNotMatch(document.body.textContent, /正在写入/);

        await act(async () => root.render(React.createElement(Group, {entries: records, conversationId: 'chat'})));
        await act(async () => document.querySelector('[data-execution-status-id] button').click());
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest, null);
        assert.match(document.querySelector('button[aria-expanded]').textContent, /2 次完成/);
        await act(async () => document.querySelector('button[aria-expanded]').click());
        await act(async () => document.querySelector('[data-execution-status-group-history] [data-execution-status-id] button').click());
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, 'call-first');
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.replacementId, 'result-first');

        const running = records.map((entry, index) => index === 0 ? {...entry, content: makeStatus('first', {
            conversationId: 'chat', toolNames: ['knowledge_query'], inlineState: 'running', status: 'running',
            action: '正在查找补充证据', toolCallId: 'call-first',
        }).content} : entry);
        await act(async () => root.render(React.createElement(Group, {entries: running, conversationId: 'chat'})));
        assert.match(document.querySelector('[data-execution-status-group] > div').textContent, /正在查找补充证据/);
        await act(async () => document.querySelector('[data-execution-status-group] > div [data-execution-status-id] button').click());
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, 'call-first');

        const guidanceActivities = [
            {id: 'first-note', kind: 'guidance', state: 'pending', anchorStatusId: 'first', content: '先核对定义', time: 1},
            {id: 'second-note', kind: 'guidance', state: 'consumed', anchorStatusId: 'second', content: '再比较来源', time: 2},
            {id: 'withdrawn-note', kind: 'guidance', state: 'withdrawn', anchorStatusId: 'first', content: '已撤回旧要求', time: 3},
            {id: 'replaced-note', kind: 'guidance', state: 'replaced', anchorStatusId: 'second', content: '已被替代旧要求', time: 4},
            {id: 'widget-note', kind: 'guidance', source: 'widget_response', state: 'responded', anchorStatusId: 'second', content: '组件反馈', time: 5},
        ];
        const prompts = {first: {label: '等待工具调用完成'}, second: {label: '等待模型响应'}};
        const frozenEntries = records.map((entry) => ({...entry, content: JSON.stringify({
            ...JSON.parse(entry.content), activities: guidanceActivities, guidancePrompts: prompts,
        })}));
        await act(async () => useExecutionStore.getState().upsertExecution({
            executionId: 'run-1', conversationId: 'chat', active: true, status: 'running', updatedAt: 100,
            activities: guidanceActivities, guidancePrompts: prompts,
        }));
        await act(async () => root.render(React.createElement(Group, {key: 'guidance', entries: frozenEntries, conversationId: 'chat'})));
        assert.deepEqual([...document.querySelectorAll('[data-test-guidance]')].map((node) => node.dataset.testGuidance), ['second-note', 'widget-note'], 'pending supplements stay in the composer queue rather than grouped transcript hints');
        assert.equal(document.querySelectorAll('[data-execution-guidance-prompt]').length, 1);
        assert.match(document.querySelector('[data-execution-guidance-prompt]').textContent, /等待模型响应/);
        await act(async () => document.querySelector('button[aria-expanded]').click());
        assert.equal(document.querySelectorAll('[data-test-guidance]').length, 2, 'expanded call history must not repeat received supplements or reveal pending ones');
        assert.equal(document.querySelectorAll('[data-execution-guidance-prompt]').length, 1);

        await act(async () => useExecutionStore.getState().upsertExecution({
            executionId: 'run-1', conversationId: 'chat', active: true, status: 'running', updatedAt: 200,
            activities: guidanceActivities.map((activity) => activity.id === 'widget-note' ? activity : {...activity, state: 'withdrawn'}),
            guidancePrompts: {},
        }));
        assert.deepEqual([...document.querySelectorAll('[data-test-guidance]')].map((node) => node.dataset.testGuidance), ['widget-note']);
        assert.equal(document.querySelectorAll('[data-execution-guidance-prompt]').length, 0, 'authoritative empty maps must suppress frozen waiting hints');
    } finally {
        await act(async () => root.unmount());
        useExecutionStore.setState({sessions: {}});
        dom.window.close();
    }
});

test('the full Markdown renderer groups token-typed plain JSON statuses into 4 and 5 calls across a visible paragraph', async () => {
    const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const mocks = new Map([
        ['tools.jsx', 'export const copyTextToClipboard=()=>{};'],
        ['react-i18next', 'export const useTranslation=()=>({t:(key)=>key});'],
        ['documentCardSpec.js', 'export const useDocumentCardSpec=()=>({spec:null,loading:false,error:null});'],
        ['CardBlock.jsx', 'export default function CardBlock({type,content,renderMarkdown}) {return type === "markdown" ? renderMarkdown(content) : null;}'],
        ['ReplacementContextBadge.jsx', 'export default ()=>null;'],
        ['ExecutionGuidanceBubble.jsx', 'export default ()=>null;'],
        ['universalModal.js', 'export const isUniversalModalLink=()=>false; export const openUniversalModalLink=()=>{};'],
        ['useImageViewer.js', 'export const openImageViewer=()=>{};'],
    ]);
    await build({
        stdin: {contents: "export {default as Renderer} from './src/components/markdown/MarkdownRenderer.jsx'; export {useExecutionStore} from './src/features/execution/useExecutionStore.js';", resolveDir: process.cwd()},
        bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
        outfile: 'temp/execution-status-markdown-test.mjs', alias: {'@': path.resolve('src')},
        loader: {'.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty'},
        plugins: [{name: 'real-status-markdown-fixture', setup(builder) {
            builder.onResolve({filter: /\.css$/}, () => ({path: 'css', namespace: 'style'}));
            builder.onLoad({filter: /.*/, namespace: 'style'}, () => ({contents: '', loader: 'js'}));
            builder.onResolve({filter: /.*/}, ({path: modulePath}) => {
                const key = [...mocks.keys()].find((name) => modulePath === name || modulePath.endsWith(`/${name}`));
                return key ? {path: key, namespace: 'fixture'} : undefined;
            });
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: modulePath}) => ({
                contents: mocks.get(modulePath), loader: 'jsx', resolveDir: process.cwd(),
            }));
        }}],
    });
    const {Renderer, useExecutionStore} = await import('../temp/execution-status-markdown-test.mjs');
    const replacement = {};
    const methods = [
        ['search_nodes_by_keywords'], ['search_nodes_by_keywords'],
        ['search_nodes_by_keywords', 'get_related_graph'], ['search_nodes_by_keywords', 'get_related_graph'],
        ['get_related_chunks'], ['get_chunk_content', 'get_related_graph'], ['get_related_chunks'],
        ['get_chunk_content'], ['get_relationship_between_nodes'],
    ];
    const blocks = methods.map((names, index) => {
        const callId = `call-${index + 1}`;
        const statusId = `execution-tool-status-${callId}`;
        const status = JSON.parse(makeStatus(statusId, {
            executionId: 'knowledge-run', conversationId: 'chat', runId: 'worker-run', phase: 'investigation',
            label: '处理知识图谱 · 已完成', toolCallId: callId, inlineKind: 'tool',
            toolNames: names.map((name) => `knowledgeNetwork_${name}`),
            navigationTarget: {toolCallId: callId},
            toolStatusNodes: {[callId]: {phase: 'investigation', executionMeta: {
                toolset: null, promote: true, surface: 'execution_window', executionModeRouted: true, evidence: [],
            }}},
        }).content);
        // These entries intentionally have no type property/protocol marker.
        // The source token is the only place carrying executionStatus.
        replacement[statusId] = {frontend: JSON.stringify(status)};
        replacement[callId] = {frontend: '[executionWindowTool]\n工具详情'};
        replacement[`tool-result-${callId}`] = {frontend: ''};
        replacement[`continuation-${callId}`] = {frontend: ''};
        replacement[`progress-${callId}`] = {frontend: '[markdown]\n'};
        return `{{cardReplace id=${callId}}}\n\n{{cardReplace id=tool-result-${callId}}}\n\n{{cardReplace id=${statusId} type=executionStatus}}\n\n{{cardReplace id=continuation-${callId} type=executionStatus}}\n{{cardReplace id=progress-${callId}}}`;
    });
    const source = `${blocks.slice(0, 4).join('\n\n')}\n\n可见正文分隔段落\n\n${blocks.slice(4).join('\n\n')}`;
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(Renderer, {
            contextId: 'message', conversationId: 'chat', content: source, replacement, msg: {readonly: false},
        })));
        const groups = [...document.querySelectorAll('[data-work-process]')];
        assert.deepEqual(groups.map((node) => node.dataset.processCallCount), ['4', '5']);
        assert.equal(document.querySelectorAll('[data-execution-status-id]').length, 0, 'collapsed traces do not mount detailed records');
        const separator = [...document.querySelectorAll('p')].find((node) => node.textContent === '可见正文分隔段落');
        assert.ok(separator);
        assert.ok(groups[0].compareDocumentPosition(separator) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
        assert.ok(separator.compareDocumentPosition(groups[1]) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
        await act(async () => groups.forEach((node) => node.querySelector('button[aria-expanded]').click()));
        const allStatuses = [...document.querySelectorAll('[data-execution-status-id]')];
        assert.equal(allStatuses.length, 9);
        assert.equal(new Set(allStatuses.map((node) => node.dataset.executionStatusId)).size, 9);
        assert.equal(document.querySelectorAll('[data-work-process-records] [data-execution-status-id]').length, 9);
        const firstHistoryCall = document.querySelector('[data-execution-status-id="execution-tool-status-call-1"] button');
        await act(async () => firstHistoryCall.click());
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, 'call-1');
    } finally {
        await act(async () => root.unmount());
        useExecutionStore.setState({sessions: {}});
        dom.window.close();
    }
});
