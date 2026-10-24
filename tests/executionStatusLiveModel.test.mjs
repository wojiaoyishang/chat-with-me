import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

import {getExecutionDisplayState, projectExecutionStatus} from '../src/features/execution/executionStatusModel.js';

const snapshot = (overrides = {}) => ({executionId: 'execution', conversationId: 'chat',
    statusId: 'status-latest', toolCallId: 'call-latest', inlineKind: 'tool', inlineState: 'running',
    status: 'running', updatedAt: 10, label: '处理知识图谱', action: '正在核对来源', ...overrides});

test('live projection updates only the matching call, preserving its identity and navigation', () => {
    const frozen = snapshot({navigationTarget: {replacementId: 'latest-result'}});
    const live = {...snapshot({updatedAt: 20, status: 'running', statusId: 'unrelated'}), toolStatusNodes: {
        'call-latest': {toolCallId: 'call-latest', statusId: 'status-latest', state: 'completed',
            label: '处理知识图谱 · 已完成', action: '正在核对第一手原文'},
        unrelated: {statusId: 'unrelated', state: 'failed'},
    }};
    const projected = projectExecutionStatus(frozen, live);
    assert.equal(getExecutionDisplayState(projected), 'completed');
    assert.equal(projected.action, '正在核对第一手原文');
    assert.equal(projected.statusId, frozen.statusId);
    assert.equal(projected.toolCallId, frozen.toolCallId);
    assert.deepEqual(projected.navigationTarget, {replacementId: 'latest-result'});
    assert.equal(frozen.inlineState, 'running', 'projection must not mutate persisted replacements');

    const byStatus = projectExecutionStatus(snapshot({toolCallId: null}), live);
    assert.equal(getExecutionDisplayState(byStatus), 'completed');
});

test('execution completion and stale or mismatched snapshots cannot invent per-call success', () => {
    const frozen = snapshot({inlineState: 'failed'});
    for (const live of [
        {...snapshot({status: 'completed', updatedAt: 20}), toolStatusNodes: {}},
        {...snapshot({updatedAt: 20}), toolStatusNodes: {'call-latest': {statusId: 'different', state: 'completed'}}},
        {...snapshot({updatedAt: 5}), toolStatusNodes: {'call-latest': {statusId: frozen.statusId, state: 'completed'}}},
        {...snapshot({executionId: 'other', updatedAt: 20}), toolStatusNodes: {'call-latest': {statusId: frozen.statusId, state: 'completed'}}},
        {...snapshot({conversationId: 'other', updatedAt: 20}), toolStatusNodes: {'call-latest': {statusId: frozen.statusId, state: 'completed'}}},
        {...snapshot({runId: 'new-run', updatedAt: 20}), toolStatusNodes: {'call-latest': {statusId: frozen.statusId, state: 'completed'}}},
        {...snapshot({updatedAt: 20}), toolStatusNodes: {'call-latest': {statusId: frozen.statusId, state: 'running'}}},
    ]) {
        const scoped = live.runId ? {...frozen, runId: 'old-run'} : frozen;
        assert.equal(projectExecutionStatus(scoped, live), scoped);
        assert.equal(getExecutionDisplayState(projectExecutionStatus(scoped, live)), 'failed');
    }
    const missing = snapshot();
    assert.equal(getExecutionDisplayState(projectExecutionStatus(missing, snapshot({status: 'completed', updatedAt: 20}))), 'running');
});

test('a mounted collapsed group follows live calls without reopening or hiding a previous failure', async (t) => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    const previous = Object.fromEntries(['window', 'document', 'HTMLElement', 'IS_REACT_ACT_ENVIRONMENT']
        .map((key) => [key, globalThis[key]]));
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    await build({
        stdin: {contents: `export {default as Group} from './src/features/execution/ExecutionStatusGroup.jsx';
            export {useExecutionStore} from './src/features/execution/useExecutionStore.js';`, resolveDir: process.cwd()},
        bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
        outfile: 'temp/execution-status-live-model-test.mjs',
        plugins: [{name: 'live-model-fixture', setup(builder) {
            builder.onResolve({filter: /^(?:react-i18next)$|ExecutionGuidanceBubble\.jsx$/}, ({path}) => ({path, namespace: 'fixture'}));
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({loader: 'jsx', contents:
                path === 'react-i18next' ? 'export const useTranslation=()=>({t:key=>key});' : 'export default ()=>null;'}));
        }}],
    });
    const {Group, useExecutionStore} = await import('../temp/execution-status-live-model-test.mjs');
    const root = createRoot(document.getElementById('root'));
    t.after(async () => {
        await act(async () => root.unmount());
        useExecutionStore.setState({sessions: {}});
        dom.window.close();
        for (const [key, value] of Object.entries(previous)) {
            if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
        }
    });
    const first = snapshot({statusId: 'status-first', toolCallId: 'call-first', inlineState: 'failed',
        action: '正在核对旧来源', navigationTarget: {toolCallId: 'call-first', replacementId: 'first-result'}});
    const latest = snapshot({navigationTarget: {toolCallId: 'call-latest', replacementId: 'latest-result'}});
    const entries = [first, latest].map((item) => ({id: item.statusId, content: JSON.stringify(item)}));
    const publish = async (updatedAt, state) => act(async () => useExecutionStore.getState().upsertExecution({
        executionId: 'execution', conversationId: 'chat', status: 'running', active: true, updatedAt,
        guidancePrompts: {}, toolStatusNodes: {
            'call-first': {statusId: first.statusId, toolCallId: first.toolCallId, state: 'failed'},
            'call-latest': {statusId: latest.statusId, toolCallId: latest.toolCallId, state,
                label: state === 'running' ? '正在处理知识图谱' : '处理知识图谱 · 已完成', action: '正在核对新来源'},
        },
    }));
    await publish(20, 'running');
    await act(async () => root.render(React.createElement(Group, {entries, conversationId: 'chat'})));
    const header = () => document.querySelector('[data-execution-status-group] > div');
    assert.equal(document.querySelectorAll('[data-execution-status-id]').length, 1);
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, latest.statusId);
    assert.match(header().textContent, /正在核对新来源/);
    assert.match(header().textContent, /1 次失败/);
    assert.equal(document.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');

    // Only the store changes; entries and mounted component remain the same.
    await publish(30, 'completed');
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, latest.statusId);
    assert.match(header().textContent, /核对新来源/);
    assert.doesNotMatch(header().textContent, /正在核对/);
    assert.equal(header().querySelector('[data-execution-action-state]').textContent, '已完成');
    assert.match(header().textContent, /1 次失败/);
    await act(async () => header().querySelector('[data-execution-status-id] button').click());
    assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, latest.toolCallId);
    assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.replacementId, 'latest-result');

    await act(async () => document.querySelector('button[aria-expanded]').click());
    const history = document.querySelector('[data-execution-status-group-history]');
    assert.equal(history.querySelector('[data-execution-status-id]').dataset.executionStatusId, first.statusId);
    assert.equal(history.querySelector('[data-execution-action-state]').textContent, '失败');
    await act(async () => history.querySelector('button').click());
    assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.toolCallId, first.toolCallId);
    assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.replacementId, 'first-result');

    await act(async () => useExecutionStore.getState().upsertExecution({executionId: 'execution', conversationId: 'chat',
        status: 'running', active: true, updatedAt: 40,
        guidancePrompts: {[first.statusId]: {label: '等待工具调用完成'}},
    }));
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, first.statusId,
        'an actionable guidance anchor must remain reachable even after later work finishes');

    const continuation = {id: 'continuation', content: JSON.stringify(snapshot({
        statusId: 'status-continuation', toolCallId: null, inlineKind: 'continuation',
        updatedAt: 50, action: '正在分析下一步', label: '正在继续执行',
    }))};
    await act(async () => useExecutionStore.getState().upsertExecution({executionId: 'execution', conversationId: 'chat',
        status: 'running', active: true, updatedAt: 50, guidancePrompts: {},
    }));
    await act(async () => root.render(React.createElement(Group, {entries, continuation, conversationId: 'chat'})));
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, 'status-continuation');
    assert.match(header().textContent, /正在分析下一步/);
    assert.match(header().textContent, /2 次 · 1 次失败/);
    assert.equal(document.querySelector('[data-execution-status-group]').dataset.executionStatusGroup, '2');
    assert.deepEqual([...document.querySelectorAll('[data-execution-status-group-history] [data-execution-status-id]')]
        .map((node) => node.dataset.executionStatusId), [first.statusId, latest.statusId]);
    await act(async () => header().querySelector('[data-execution-status-id] button').click());
    assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest.statusId, 'status-continuation');

    // Even one completed concrete call can share one headline with its temporary
    // continuation; the transient hint is never counted as a second tool call.
    await act(async () => root.render(React.createElement(Group, {entries: [entries[1]], continuation, conversationId: 'chat'})));
    assert.equal(document.querySelector('[data-execution-status-group]').dataset.executionStatusGroup, '1');
    assert.equal(document.querySelector('button[aria-expanded]').textContent.trim(), '1 次');
    assert.equal(document.querySelectorAll('[data-execution-status-group-history] [data-execution-status-id]').length, 1);
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, 'status-continuation');

    // Once the next tool replaces the bridge, it should disappear even from
    // expanded history, without changing the user's expanded/collapsed choice.
    await act(async () => root.render(React.createElement(Group, {entries, conversationId: 'chat'})));
    assert.equal(header().querySelector('[data-execution-status-id]').dataset.executionStatusId, latest.statusId);
    assert.equal(document.querySelector('[data-execution-status-id="status-continuation"]'), null);
    assert.equal(document.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
});
