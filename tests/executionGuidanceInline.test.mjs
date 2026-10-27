import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

await build({
    stdin: {
        contents: `export {default as Bubble} from './src/features/execution/ExecutionGuidanceBubble.jsx';
            export {default as Action} from './src/features/execution/ExecutionGuidanceAction.jsx';`,
        resolveDir: process.cwd(),
    },
    bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
    outfile: 'temp/execution-guidance-inline-test.mjs',
    plugins: [{name: 'guidance-controls', setup(builder) {
        builder.onResolve({filter: /useExecutionStore\.js$|useEventStore\.jsx$|^@\/components\/ui\/button$|^sonner$/},
            ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({
            loader: 'jsx', resolveDir: process.cwd(), contents: path.endsWith('useExecutionStore.js')
                ? `export const upsertExecution = (value) => globalThis.__guidanceHarness.snapshots.push(value);
                    export const openGuidanceEditor = (execution, target) => {
                        globalThis.__guidanceHarness.editors.push({execution, target});
                        return globalThis.__guidanceHarness.openResult;
                    };`
                : path.endsWith('useEventStore.jsx')
                    ? 'export const emitEvent = (event) => { globalThis.__guidanceHarness.events.push(event); return globalThis.__guidanceHarness.reply(event); };'
                    : path === 'sonner'
                        ? 'export const toast = {error: (value) => globalThis.__guidanceHarness.errors.push(value)};'
                        : 'export const Button = ({children, variant, size, ...props}) => <button {...props}>{children}</button>;',
        }));
    }}],
});
const {Bubble, Action} = await import('../temp/execution-guidance-inline-test.mjs');
const activity = {id: 'guidance-1', kind: 'guidance', source: 'user_guidance', state: 'consumed', content: '请着重比较模型的泛化能力。', canToggle: true, canRewrite: true};
const execution = {executionId: 'execution-1', conversationId: 'conversation-1', runId: 'run-1', turnId: 'turn-1', active: true, status: 'running'};
const snapshot = (overrides = {}) => ({...execution, activities: [{...activity, state: 'withdrawn', ...overrides}]});
const deferred = () => { let resolve; const promise = new Promise((done) => {resolve = done;}); return {promise, resolve}; };

test('queued supplements have no inline bubble or withdrawal controls', async (t) => {
    const ui = await mount(t, Bubble, {activity: {...activity, state: 'pending'}, execution});
    assert.equal(document.querySelector('[data-execution-guidance-bubble]'), null);
    await ui.render({activity: {...activity, state: 'removed'}, execution});
    assert.equal(ui.button('撤回'), undefined);
    assert.equal(ui.button('撤回并编辑'), undefined);
});

test('a received attachment-only supplement retains readable attachment links', async (t) => {
    await mount(t, Bubble, {activity: {...activity, content: '', attachments: [{
        serverId: 'attachment-1', name: '教材图片.png', fileType: 'image', downloadUrl: 'cwm://artifact/attachment-1',
    }]}, execution});
    const link = document.querySelector('[data-guidance-attachments] a');
    assert.match(link.getAttribute('href'), /attachment-1/);
    assert.match(link.textContent, /教材图片\.png/);
});

async function mount(t, Component, props) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const state = {events: [], snapshots: [], editors: [], errors: [], openResult: true,
        reply: () => Promise.resolve({success: true, value: {execution: snapshot()}})};
    globalThis.__guidanceHarness = state;
    const root = createRoot(document.getElementById('root'));
    let unmounted = false;
    const render = (next) => act(async () => root.render(React.createElement(Component, next)));
    const unmount = async () => {if (!unmounted) {await act(async () => root.unmount()); unmounted = true;}};
    t.after(async () => {await unmount(); dom.window.close(); delete globalThis.window; delete globalThis.document; delete globalThis.HTMLElement; delete globalThis.__guidanceHarness;});
    await render(props);
    return {
        state, render, unmount,
        button: (name) => [...document.querySelectorAll('button')].find((button) => button.getAttribute('aria-label') === name || button.textContent === name),
        click: async (button) => act(async () => button.click()),
        html: () => document.getElementById('root').innerHTML,
    };
}

test('ordinary guidance is left aligned, has no avatar, and expands long content', async (t) => {
    const long = ['第一周学习线性模型。', '第二周比较不同的评估方法。', '第三周整理模型选择流程。', '第四周复盘实验结果。'].join('\n');
    const ui = await mount(t, Bubble, {activity: {...activity, content: long}, execution});
    const content = document.querySelector('[data-guidance-content]');
    assert.match(content.className, /text-left/);
    assert.match(content.className, /line-clamp-3/);
    assert.equal(document.querySelector('[data-slot="avatar"]'), null);
    assert.doesNotMatch(ui.html(), /justify-end|text-right/);
    await ui.click(ui.button('展开全文'));
    assert.doesNotMatch(content.className, /line-clamp-3/);
    assert.equal(ui.button('收起').getAttribute('aria-expanded'), 'true');
    await ui.click(ui.button('收起'));
    assert.match(content.className, /line-clamp-3/);
    assert.ok(ui.button('撤回'));
    assert.ok(ui.button('撤回并编辑'));
});

test('withdrawn and replaced ordinary messages disappear while widget details remain unchanged', async (t) => {
    const ui = await mount(t, Bubble, {activity: {...activity, state: 'withdrawn'}, execution});
    assert.equal(ui.html(), '');
    await ui.render({activity: {...activity, state: 'replaced'}, execution});
    assert.equal(ui.html(), '');
    await ui.render({activity: {...activity, replacedByGuidanceId: 'replacement'}, execution});
    assert.equal(ui.html(), '');
    await ui.render({activity: {...activity, source: 'widget_response', state: 'withdrawn',
        widgetResponse: {summary: '已选择两项', title: '模型评估练习'}}, execution});
    assert.ok(document.querySelector('[data-widget-response="true"]'));
    assert.match(ui.html(), /已选择两项|查看选择详情|模型评估练习/);
    assert.equal(document.querySelector('[data-guidance-actions]'), null);
});

test('withdraw and edit waits for successful ACK and uses the returned withdrawn snapshot', async (t) => {
    const ui = await mount(t, Action, {activity, execution});
    const response = deferred();
    ui.state.reply = () => response.promise;
    await ui.click(ui.button('撤回并编辑'));
    assert.equal(ui.state.events.length, 1);
    assert.deepEqual(ui.state.events[0], {
        event: 'execution.guidance.withdraw', conversationId: execution.conversationId,
        runId: execution.runId, turnId: execution.turnId,
        payload: {executionId: execution.executionId, guidanceId: activity.id},
    });
    assert.equal(ui.state.editors.length, 0);
    assert.equal(ui.state.snapshots.length, 0);
    assert.equal(ui.button('撤回').disabled, true);
    await act(async () => response.resolve({success: true, value: {execution: snapshot()}}));
    assert.equal(ui.state.snapshots.length, 1);
    assert.deepEqual(ui.state.editors[0].target, {guidanceId: activity.id, mode: 'rewrite'});
    assert.equal(ui.state.editors[0].execution.activities[0].state, 'withdrawn');
});

test('rejected withdraw keeps the visible source and never opens an editor', async (t) => {
    const ui = await mount(t, Bubble, {activity, execution});
    ui.state.reply = () => Promise.resolve({success: false, value: '模型已经开始回复，不能撤回。'});
    await ui.click(ui.button('撤回并编辑'));
    assert.match(ui.html(), /请着重比较模型的泛化能力/);
    assert.deepEqual(ui.state.errors, ['模型已经开始回复，不能撤回。']);
    assert.equal(ui.state.snapshots.length, 0);
    assert.equal(ui.state.editors.length, 0);
    assert.equal(ui.button('撤回并编辑').disabled, false);
});

test('window history can rewrite a locked withdrawal but restore still requires canToggle', async (t) => {
    const ui = await mount(t, Action, {activity: {...activity, state: 'withdrawn', canToggle: false}, execution, surface: 'execution_window'});
    assert.ok(ui.button('重新编辑'));
    assert.equal(ui.button('恢复原文'), undefined);
    await ui.click(ui.button('重新编辑'));
    assert.deepEqual(ui.state.editors[0].target, {guidanceId: activity.id, mode: 'rewrite'});
    assert.equal(ui.state.events.length, 0);
    await ui.render({activity: {...activity, state: 'withdrawn'}, execution, surface: 'execution_window'});
    ui.state.reply = () => Promise.resolve({success: true, value: {execution: snapshot({state: 'consumed'})}});
    await ui.click(ui.button('恢复原文'));
    assert.equal(ui.state.events[0].event, 'execution.guidance.restore');
    await ui.render({activity: {...activity, state: 'replaced'}, execution, surface: 'execution_window'});
    assert.equal(ui.html(), '');
});

test('locked guidance offers a correction without retracting or replacing the original', async (t) => {
    const ui = await mount(t, Action, {activity: {...activity, canToggle: false, canRewrite: false}, execution});
    assert.equal(ui.button('撤回'), undefined);
    await ui.click(ui.button('补充更正'));
    assert.equal(ui.state.events.length, 0);
    assert.deepEqual(ui.state.editors[0].target, {guidanceId: activity.id, mode: 'correction'});
    assert.equal(Object.hasOwn(ui.state.editors[0].target, 'replaces'), false);
});

test('an ACK placeholder without server toggle permissions is not mistaken for locked guidance', async (t) => {
    const ui = await mount(t, Action, {activity: {...activity, canToggle: undefined, canRewrite: undefined, state: 'pending'}, execution});
    assert.equal(ui.button('补充更正'), undefined);
    assert.equal(ui.button('撤回'), undefined);
    assert.equal(ui.html(), '');
});

test('late ACK updates only its original execution and cannot open an editor after navigation', async (t) => {
    const ui = await mount(t, Action, {activity, execution});
    const response = deferred();
    ui.state.reply = () => response.promise;
    await ui.click(ui.button('撤回并编辑'));
    await ui.render({activity: {...activity, id: 'guidance-2'}, execution: {...execution, conversationId: 'conversation-2', executionId: 'execution-2'}});
    await act(async () => response.resolve({success: true, value: {execution: snapshot()}}));
    assert.equal(ui.state.snapshots[0].conversationId, execution.conversationId);
    assert.equal(ui.state.editors.length, 0);
    assert.equal(ui.button('撤回').disabled, false);
});

test('wrong-session or superseded ACKs never start rewriting and report the reason', async (t) => {
    const ui = await mount(t, Action, {activity, execution});
    ui.state.reply = () => Promise.resolve({success: true, value: {execution: {...snapshot(), conversationId: 'another-chat'}}});
    await ui.click(ui.button('撤回并编辑'));
    assert.equal(ui.state.snapshots.length, 0);
    assert.equal(ui.state.editors.length, 0);
    assert.match(ui.state.errors[0], /对应执行/);
    ui.state.reply = () => Promise.resolve({success: true, value: {execution: snapshot({state: 'replaced', replacedByGuidanceId: 'new-guidance'})}});
    await ui.click(ui.button('撤回并编辑'));
    assert.equal(ui.state.snapshots.length, 1);
    assert.equal(ui.state.editors.length, 0);
    assert.match(ui.state.errors[1], /状态已变化/);
});

test('unmounted rows accept ACK state but never reopen the editor', async (t) => {
    const ui = await mount(t, Action, {activity, execution});
    const response = deferred();
    ui.state.reply = () => response.promise;
    await ui.click(ui.button('撤回并编辑'));
    await ui.unmount();
    await act(async () => response.resolve({success: true, value: {execution: snapshot()}}));
    assert.equal(ui.state.snapshots.length, 1);
    assert.equal(ui.state.editors.length, 0);
});

test('editor refusal is visible instead of silently losing the rewrite request', async (t) => {
    const ui = await mount(t, Action, {activity: {...activity, state: 'withdrawn'}, execution, surface: 'execution_window'});
    ui.state.openResult = false;
    await ui.click(ui.button('重新编辑'));
    assert.match(ui.state.errors[0], /无法打开这条补充的编辑区/);
});

test('received guidance withdraws before editing and its actual store-backed bubble disappears after ACK', async (t) => {
    await build({
        stdin: {contents: `import Bubble from './src/features/execution/ExecutionGuidanceBubble.jsx';
            import {useExecutionStore} from './src/features/execution/useExecutionStore.js';
            export {useExecutionStore};
            export default function StoreBubble() {
                const execution = useExecutionStore((state) => state.sessions['conversation-1']?.executions['execution-1']);
                return execution ? <Bubble execution={execution} activity={execution.activities[0]} /> : null;
            }`, resolveDir: process.cwd(), loader: 'jsx'},
        bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
        outfile: 'temp/execution-guidance-real-store-test.mjs',
        plugins: [{name: 'guidance-protocol', setup(builder) {
            builder.onResolve({filter: /useEventStore\.jsx$|^@\/components\/ui\/button$|^sonner$/},
                ({path}) => ({path, namespace: 'fixture'}));
            builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({
                loader: 'jsx', resolveDir: process.cwd(), contents: path.endsWith('useEventStore.jsx')
                    ? 'export const emitEvent = (event) => { globalThis.__guidanceHarness.events.push(event); return globalThis.__guidanceHarness.reply(event); };'
                    : path === 'sonner'
                        ? 'export const toast = {error: (value) => globalThis.__guidanceHarness.errors.push(value)};'
                        : 'export const Button = ({children, variant, size, ...props}) => <button {...props}>{children}</button>;',
            }));
        }}],
    });
    const {default: StoreBubble, useExecutionStore} = await import('../temp/execution-guidance-real-store-test.mjs');
    const staged = {...activity, state: 'consumed', canRewrite: false};
    useExecutionStore.getState().upsertExecution({...execution, updatedAt: 1, activities: [staged]});
    const ui = await mount(t, StoreBubble, {});
    const response = deferred();
    ui.state.reply = () => response.promise;
    assert.ok(ui.button('撤回并编辑'));
    await ui.click(ui.button('撤回并编辑'));
    assert.match(ui.html(), /请着重比较模型的泛化能力/);
    assert.equal(useExecutionStore.getState().sessions[execution.conversationId].guidanceEditor, null);
    const withdrawn = {...snapshot(), updatedAt: 2};
    await act(async () => response.resolve({success: true, value: {execution: withdrawn}}));
    assert.equal(document.querySelector('[data-execution-guidance-bubble]'), null);
    const session = useExecutionStore.getState().sessions[execution.conversationId];
    assert.equal(session.isOpen, true);
    assert.equal(session.guidanceEditor.executionId, execution.executionId);
    const draft = session.guidanceDrafts[session.guidanceEditor.draftKey];
    assert.equal(draft.mode, 'rewrite');
    assert.equal(draft.sourceId, activity.id);
    assert.equal(draft.content, activity.content);
    assert.equal(draft.replacesGuidanceId, activity.id);
    assert.deepEqual(ui.state.errors, []);
});
