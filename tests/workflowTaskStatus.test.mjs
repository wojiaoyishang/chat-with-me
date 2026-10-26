import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, useLocation } from 'react-router-dom';

async function loadCard() {
    await build({
        stdin: {
            contents: [
                "export { default as CardBlock } from './src/components/markdown/card-block/CardBlock.jsx';",
                "export { useTaskStore } from './src/features/tasks/useTaskStore.js';",
            ].join('\n'),
            resolveDir: process.cwd(),
        },
        bundle: true,
        packages: 'external',
        jsx: 'automatic',
        format: 'esm',
        platform: 'node',
        outfile: 'temp/workflow-task-status-test.mjs',
        plugins: [{
            name: 'isolate-card-block',
            setup(builder) {
                builder.onResolve({ filter: /^@\/features\/tasks\/useTaskStore\.js$/ }, () => ({
                    path: path.resolve('src/features/tasks/useTaskStore.js'),
                }));
                builder.onResolve({ filter: /^@\/(config\.js|lib\/apiClient\.js)$/ }, (args) => ({
                    path: path.resolve('src', args.path.slice(2)),
                }));
                builder.onResolve({ filter: /^(\.\/|@\/)/ }, (args) => {
                    if (!args.importer.endsWith('CardBlock.jsx')) return null;
                    if (args.path === '@/features/workflows/WorkflowTaskStatus.jsx') return {
                        path: path.resolve('src/features/workflows/WorkflowTaskStatus.jsx'),
                    };
                    return { path: args.path, namespace: 'card-stub' };
                });
                builder.onLoad({ filter: /.*/, namespace: 'card-stub' }, () => ({
                    loader: 'jsx',
                    contents: 'export default () => null; export const defaultRenderMarkdown = () => null; export const ExecutionStatus = () => null;',
                }));
            },
        }],
    });
    return import('../temp/workflow-task-status-test.mjs');
}

test('workflow task card follows the live task and opens its own detail URL', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat', pretendToBeVisual: true });
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const { CardBlock, useTaskStore } = await loadCard();
    const root = createRoot(document.getElementById('root'));
    const locations = [];
    const LocationProbe = () => {
        locations.push(useLocation().pathname + useLocation().search);
        return null;
    };
    const id = 'job/图文-1';
    const content = JSON.stringify({ taskId: id, title: '图文混合直接知识提取', status: 'queued', revision: 2, kind: 'workflow.run' });
    const render = async (props = {}) => act(async () => root.render(
        React.createElement(MemoryRouter, { initialEntries: ['/chat'] },
            React.createElement(React.Fragment, null,
                React.createElement(CardBlock, { type: 'workflowTaskStatus', content, ...props }),
                React.createElement(LocationProbe),
            ),
        ),
    ));
    try {
        await render();
        const card = document.querySelector('[data-workflow-task-id]');
        assert.equal(card?.dataset.workflowTaskStatus, 'queued');
        assert.match(card.textContent, /图文混合直接知识提取.*排队中/);

        await act(async () => useTaskStore.getState().merge([{ taskId: id, title: '图文混合直接知识提取', status: 'running', revision: 3,
            observation: { version: 1, revision: 1, scopes: { task: { kind: 'task', title: '任务', components: [
                { id: 'count', type: 'indicator', title: '已提取观点', value: 12, unit: '条' },
            ] } } },
        }]));
        assert.equal(card.dataset.workflowTaskStatus, 'running');
        assert.match(card.textContent, /运行中/);
        assert.match(card.textContent, /已提取观点12 条/);

        await act(async () => document.querySelector('[data-workflow-task-id] button').click());
        assert.equal(locations.at(-1), `/tasks?taskId=${encodeURIComponent(id)}`);

        await act(async () => useTaskStore.getState().merge([{ taskId: id, status: 'completed', revision: 4 }]));
        assert.equal(card.dataset.workflowTaskStatus, 'completed');
        assert.match(card.textContent, /已完成/);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
        delete globalThis.window;
        delete globalThis.document;
        delete globalThis.HTMLElement;
        delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    }
});

test('workflow task card ignores malformed content and stays out of execution-window details', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat', pretendToBeVisual: true });
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const { CardBlock } = await loadCard();
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(MemoryRouter, null,
            React.createElement(CardBlock, { type: 'workflowTaskStatus', content: '{bad' }),
        )));
        assert.equal(document.querySelector('[data-workflow-task-id]'), null);
        await act(async () => root.render(React.createElement(MemoryRouter, null,
            React.createElement(CardBlock, {
                type: 'workflowTaskStatus',
                content: JSON.stringify({ taskId: 'task-1', status: 'running' }),
                renderSurface: 'execution_window',
            }),
        )));
        assert.equal(document.querySelector('[data-workflow-task-id]'), null);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
        delete globalThis.window;
        delete globalThis.document;
        delete globalThis.HTMLElement;
        delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    }
});
