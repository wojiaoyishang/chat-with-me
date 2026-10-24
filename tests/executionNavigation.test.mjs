import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

test('inline execution nodes locate their own tool result or text without jumping back to the latest activity', async () => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
        globalThis[key] = ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key)
            ? dom.window[key].bind(dom.window) : dom.window[key];
    }
    Object.defineProperty(globalThis, 'navigator', {configurable: true, value: dom.window.navigator});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const {createRoot} = await import('react-dom/client');
    const scrolls = [];
    HTMLElement.prototype.scrollTo = function ({top}) { this.scrollTop = top; scrolls.push(top); };
    HTMLElement.prototype.getBoundingClientRect = function () {
        const container = document.querySelector('[data-execution-tool-call-id]')?.closest('.overflow-y-auto');
        const offset = this.hasAttribute('data-execution-guidance-editor') ? 550 : this.hasAttribute('data-card-block-id') ? 450
            : this.hasAttribute('data-execution-activity-id') ? 700 : this.hasAttribute('data-execution-tool-call-id') ? 400 : 0;
        return {top: offset - (this === container ? 0 : container?.scrollTop || 0), bottom: offset + 40, height: 40};
    };
    await build({stdin: {contents: `export {default as Status} from './src/features/execution/ExecutionStatus.jsx';
        export {default as Host} from './src/features/execution/ExecutionHost.jsx';
        export {useExecutionStore,upsertExecution} from './src/features/execution/useExecutionStore.js';
        export {getExpandedKey,getExpandedValue} from './src/components/markdown/card-block/expandedStore.js';`, resolveDir: process.cwd()},
        bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node', outfile: 'temp/execution-navigation-test.mjs',
        plugins: [{name: 'fixture', setup(builder) {
            builder.onResolve({filter: /react-i18next|ExecutionGuidanceBubble|ExecutionThinkingControl|ExecutionPauseControl|ExecutionGuidanceAction|WidgetResponseDetails|WorkspaceTransferCard|@\/context\/useEventStore|@\/components\/window$|@\/components\/markdown\/MarkdownRenderer/},
                ({path: modulePath}) => ({path: modulePath, namespace: 'fixture'}));
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: modulePath}) => ({loader: 'jsx', resolveDir: process.cwd(), contents:
                modulePath === 'react-i18next' ? 'export const useTranslation=()=>({t:(key)=>key});'
                : modulePath.includes('useEventStore') ? 'export const onEvent=()=>({then:()=>()=>{}}); export const emitEvent=()=>{};'
                : modulePath.endsWith('/window') ? 'export const FloatingDockWindow=({children,headerActions})=><section data-execution-window>{headerActions}{children}</section>;'
                : modulePath.includes('MarkdownRenderer') ? `export default ({content}) => <div data-card-block-id={content.match(/id=([^}]+)/)?.[1]+'-toolCommand-t1'}>工具结果正文</div>;`
                : 'export default ()=>null;'}));
            builder.onResolve({filter: /^@\//}, ({path: modulePath}) => {
                const target = path.resolve('src', modulePath.slice(2));
                return {path: [target, `${target}.tsx`, `${target}.jsx`, `${target}.js`].find(existsSync)};
            });
        }}]});
    const {Status, Host, useExecutionStore, upsertExecution, getExpandedKey, getExpandedValue} = await import('../temp/execution-navigation-test.mjs');
    const execution = {executionId: 'exec', conversationId: 'chat', messageId: 'message', statusId: 'latest',
        status: 'running', active: true, updatedAt: 10, plan: [], executionMode: {title: '知识关联分析', objective: '核对来源之间的关联'},
        toolCards: [{toolCallId: 'first', replacementId: 'first', innerReplacementId: 'first-toolCalling', surface: 'execution_window', state: 'completed', startedAt: 1}],
        activities: [{id: 'text', kind: 'model', time: 2, label: '对应文本', state: 'completed'}]};
    const messages = {message: {extraInfo: {replace: {first: {frontend: '工具调用'}}}}};
    function Fixture({fixtureMessages = messages}) {
        return React.createElement(React.Fragment, null,
            React.createElement(Status, {content: JSON.stringify({...execution, updatedAt: 1, statusId: 'first-status', inlineState: 'completed', label: '图片已查看', navigationTarget: {toolCallId: 'first', replacementId: 'first-toolCommand-t1'}})}),
            React.createElement(Status, {content: JSON.stringify({...execution, updatedAt: 1, statusId: 'text-status', inlineState: 'completed', label: '查看对应文本', navigationTarget: {activityId: 'text'}})}),
            React.createElement(Host, {conversationId: 'chat', messageOrder: ['message'], messages: fixtureMessages}));
    }
    const root = createRoot(document.getElementById('root'));
    const settle = () => new Promise(resolve => setTimeout(resolve, 60));
    try {
        upsertExecution(execution);
        await act(async () => root.render(React.createElement(Fixture)));
        assert.equal(document.querySelector('[data-execution-window]'), null);
        await act(async () => document.querySelector('[data-execution-status-id="first-status"] button').click());
        await act(settle);
        assert.match(document.querySelector('[data-execution-window]').textContent, /核对来源之间的关联/);
        assert.equal(scrolls.at(-1), 438);
        assert.equal(getExpandedValue(getExpandedKey('message', 'first-toolCalling', 'toolCalling:execution_window')), true);
        assert.equal(document.querySelector('[data-execution-tool-call-id="first"]').dataset.executionNavigationActive, 'true');
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest, null);
        const count = scrolls.length;
        await act(async () => upsertExecution({...execution, updatedAt: 20, statusId: 'new-latest', label: '后续更新'}));
        await act(settle);
        assert.equal(scrolls.length, count);
        await act(async () => document.querySelector('[data-execution-status-id="text-status"] button').click());
        await act(settle);
        assert.equal(scrolls.at(-1), 688);
        assert.equal(document.querySelector('[data-execution-activity-id="text"]').dataset.executionNavigationActive, 'true');
        await act(async () => document.querySelector('[data-execution-status-id="first-status"] button').click());
        await act(settle);
        assert.equal(scrolls.at(-1), 438);
        assert.equal(useExecutionStore.getState().sessions.chat.executions.exec.updatedAt, 20);
        await act(async () => root.render(React.createElement(Fixture, {fixtureMessages: {}})));
        const beforePending = scrolls.length;
        await act(async () => document.querySelector('[data-execution-status-id="first-status"] button').click());
        await act(settle);
        assert.ok(useExecutionStore.getState().sessions.chat.navigationRequest);
        assert.equal(scrolls.length, beforePending);
        await act(async () => root.render(React.createElement(Fixture)));
        await act(settle);
        assert.equal(scrolls.at(-1), 438);
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest, null);

        const editableExecution = {...execution, updatedAt: 30, activities: [...execution.activities, {
            id: 'edit-source', kind: 'guidance', source: 'user_guidance', state: 'withdrawn',
            canRewrite: true, canToggle: false, content: '需要修改后重发的原补充',
        }]};
        await act(async () => upsertExecution(editableExecution));
        await act(async () => assert.equal(useExecutionStore.getState().openGuidanceEditor(editableExecution,
            {guidanceId: 'edit-source', mode: 'rewrite'}), true));
        await act(settle);
        assert.equal(scrolls.at(-1), 538, 'editor navigation scrolls only the execution viewport');
        const editorInput = document.querySelector('[data-execution-guidance-editor] textarea');
        assert.equal(editorInput.value, '需要修改后重发的原补充');
        assert.equal(document.activeElement, editorInput);
        assert.equal(useExecutionStore.getState().sessions.chat.navigationRequest, null);
    } finally {
        await act(async () => root.unmount());
        useExecutionStore.setState({sessions: {}});
        dom.window.close();
    }
});
