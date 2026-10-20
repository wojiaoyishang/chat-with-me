import test from 'node:test';
import assert from 'node:assert/strict';
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

const parse = (source, replacement) => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkCardReplace)
        .use(remarkCollapseExecutionStatuses, {replacement});
    return processor.runSync(processor.parse(source));
};

test('adjacent duplicate execution statuses show once and retain the newest target plus all history IDs', () => {
    const source = '{{cardReplace id=first}}\n\n{{cardReplace id=second}}\n\n{{cardReplace id=third}}';
    const tree = parse(source, {
        first: makeStatus('status-1'),
        second: makeStatus('status-2'),
        third: makeStatus('status-3'),
    });

    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].data.hProperties.id, 'third');
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
    assert.match(html, /data-latest="third"/);
    assert.match(html, /data-history="\[&quot;first&quot;,&quot;second&quot;,&quot;third&quot;\]"/);
});

test('separate text, a different state, and a different execution break a group', () => {
    const tree = parse([
        '{{cardReplace id=a}}',
        '{{cardReplace id=b}}',
        '中间文字',
        '{{cardReplace id=c}}',
        '{{cardReplace id=d}}',
        '{{cardReplace id=e}}',
    ].join('\n\n'), {
        a: makeStatus('a'),
        b: makeStatus('b'),
        c: makeStatus('c'),
        d: makeStatus('d', {inlineState: 'failed'}),
        e: makeStatus('e', {executionId: 'run-2'}),
    });

    assert.equal(tree.children.length, 5);
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.groupedIds), ['a', 'b']);
    assert.equal(tree.children[1].children[0].value, '中间文字');
    assert.deepEqual(tree.children.slice(2).map((node) => node.data.hProperties.id), ['c', 'd', 'e']);
});

test('guidance and context badges remain in their original places', () => {
    const tree = parse('{{cardReplace id=a}}\n\n{{cardReplace id=b}}\n\n{{cardReplace id=c}}', {
        a: makeStatus('a'),
        b: makeStatus('b', {guidancePrompt: {label: '等待输入'}}),
        c: makeStatus('c'),
    });
    assert.deepEqual(tree.children.map((node) => node.data.hProperties.id), ['a', 'b', 'c']);

    const withContext = parse('{{cardReplace id=a}}\n\n{{cardReplace id=c}}', {
        a: makeStatus('a'),
        c: {...makeStatus('c'), contextStatus: {status: 'ignored'}},
    });
    assert.equal(withContext.children.length, 2);
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
        assert.equal(document.querySelectorAll('[data-status-id]').length, 3);
        assert.equal(toggle.disabled, true);
    } finally {
        await act(async () => root.unmount());
        delete globalThis.__groupSessions;
        dom.window.close();
    }
});
