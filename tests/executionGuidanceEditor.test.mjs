import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';

// React's input-event support probe must see a DOM before the client renderer
// loads. The editor focuses its real textarea; no legacy IE event shim is used.
const bootstrap = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.window = bootstrap.window;
globalThis.document = bootstrap.window.document;
const {createRoot} = await import('react-dom/client');
bootstrap.window.close();

await build({
    stdin: {contents: `export {default as Editor} from './src/features/execution/ExecutionGuidanceEditor.jsx';
        export {default as Record} from './src/features/execution/ExecutionGuidanceRecord.jsx';
        export {submitGuidanceDraft} from './src/features/execution/guidanceEditorSubmission.js';
        export {useExecutionStore} from './src/features/execution/useExecutionStore.js';`, resolveDir: process.cwd()},
    bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
    outfile: 'temp/execution-guidance-editor-test.mjs',
    plugins: [{name: 'editor-transport', setup(builder) {
        builder.onResolve({filter: /^@\/context\/useEventStore\.jsx$|^@\/lib\/tools\.jsx$|^@\/components\/ui\/(?:button|textarea)$|^sonner$/},
            ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({
            loader: 'jsx', resolveDir: process.cwd(), contents: path.endsWith('useEventStore.jsx')
                ? 'export const emitEvent = (event) => { globalThis.__guidanceEditorHarness.events.push(event); return globalThis.__guidanceEditorHarness.reply(event); };'
                : path.endsWith('tools.jsx')
                    ? 'export const generateUUID = () => `new-guidance-${++globalThis.__guidanceEditorHarness.sequence}`;'
                    : path.endsWith('textarea')
                        ? 'export const Textarea = (props) => <textarea {...props} />;'
                        : path === 'sonner'
                            ? 'export const toast = {error: (value) => globalThis.__guidanceEditorHarness.errors.push(value)};'
                            : 'export const Button = ({children, variant, size, ...props}) => <button {...props}>{children}</button>;',
        }));
    }}],
});
const {Editor, Record, submitGuidanceDraft, useExecutionStore} = await import('../temp/execution-guidance-editor-test.mjs');
const cid = 'conversation-1';
const eid = 'execution-1';
const source = {id: 'original-guidance', kind: 'guidance', source: 'user_guidance',
    state: 'withdrawn', content: '原补充内容', canToggle: false, canRewrite: true};
const execution = {executionId: eid, conversationId: cid, runId: 'run-1', turnId: 'turn-1',
    active: true, status: 'running', statusId: 'status-1', updatedAt: 1, activities: [source]};
const deferred = () => {
    let resolve; let reject;
    const promise = new Promise((yes, no) => {resolve = yes; reject = no;});
    return {promise, resolve, reject};
};
const getSession = () => useExecutionStore.getState().sessions[cid];
const getDraft = (key) => getSession().guidanceDrafts[key];

function initialize(mode = 'rewrite', initial = execution) {
    useExecutionStore.setState({sessions: {}});
    assert.equal(useExecutionStore.getState().openGuidanceEditor(initial, {guidanceId: source.id, mode}), true);
    return getSession().guidanceEditor.draftKey;
}

function controller(draftKey, overrides = {}) {
    const state = {events: [], sequence: 0, reply: () => Promise.resolve({success: true, value: {guidance: {}}})};
    const options = {
        conversationId: cid, executionId: eid, draftKey,
        emitEvent: (event) => {state.events.push(event); return state.reply(event);},
        createId: () => `generated-${++state.sequence}`,
        ...overrides,
    };
    return {state, submit: () => submitGuidanceDraft(options)};
}

async function mount(t, Component, props, {chatBox = false} = {}) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const state = {events: [], errors: [], sequence: 0,
        reply: () => Promise.resolve({success: true, value: {guidance: {}}})};
    globalThis.__guidanceEditorHarness = state;
    const root = createRoot(document.getElementById('root'));
    const view = (next) => chatBox
        ? React.createElement(React.Fragment, null,
            React.createElement('textarea', {'aria-label': 'ChatBox草稿', defaultValue: '用户尚未发送的聊天草稿'}),
            React.createElement(Component, next))
        : React.createElement(Component, next);
    const render = (next) => act(async () => root.render(view(next)));
    t.after(async () => {await act(async () => root.unmount()); dom.window.close(); delete globalThis.__guidanceEditorHarness;});
    await render(props);
    return {state, render,
        button: (name) => [...document.querySelectorAll('button')].find((button) => button.getAttribute('aria-label') === name || button.textContent === name),
        click: (button) => act(async () => button.click()),
        html: () => document.getElementById('root').innerHTML,
    };
}

test('a withdrawn source can be rewritten after locking even though it cannot be restored', () => {
    const key = initialize();
    assert.equal(getDraft(key).mode, 'rewrite');
    assert.equal(getDraft(key).content, source.content);
    assert.equal(getDraft(key).replacesGuidanceId, source.id);
    assert.equal(getSession().executions[eid].activities[0].canToggle, false);
});

test('editor owns a separate draft, closing never restores the source, and reopening preserves edits', async (t) => {
    const key = initialize();
    const ui = await mount(t, Editor, {execution}, {chatBox: true});
    assert.equal(document.querySelector('textarea[aria-label="补充内容"]').value, source.content);
    await act(async () => useExecutionStore.getState().updateGuidanceDraft(cid, key, '尚未重发的编辑内容'));
    assert.equal(document.querySelector('textarea[aria-label="ChatBox草稿"]').value, '用户尚未发送的聊天草稿');
    assert.equal(document.querySelector('textarea[aria-label="补充内容"]').value, '尚未重发的编辑内容');
    await ui.click(ui.button('取消'));
    assert.equal(document.querySelector('[data-execution-guidance-editor]'), null);
    assert.equal(getSession().executions[eid].activities[0].state, 'withdrawn');
    assert.equal(ui.state.events.length, 0);
    assert.equal(getDraft(key).content, '尚未重发的编辑内容');
    await ui.click(ui.button('继续编辑补充'));
    assert.equal(document.querySelector('textarea[aria-label="补充内容"]').value, '尚未重发的编辑内容');
    assert.equal(document.querySelector('textarea[aria-label="ChatBox草稿"]').value, '用户尚未发送的聊天草稿');
    assert.equal(getSession().guidanceEditor.draftKey, key);
});

test('first submission fixes a new guidance ID and replacement link, while duplicate clicks send once', async (t) => {
    const key = initialize();
    const ui = await mount(t, Editor, {execution});
    const response = deferred();
    ui.state.reply = () => response.promise;
    const send = ui.button('发送补充');
    await act(async () => {send.click(); send.click();});
    assert.equal(ui.state.events.length, 1);
    assert.equal(getDraft(key).state, 'submitting');
    assert.deepEqual(ui.state.events[0].payload, {executionId: eid, guidanceId: 'new-guidance-1',
        content: source.content, attachments: [], visionAttachmentIds: [], replacesGuidanceId: source.id});
    assert.equal(document.querySelector('textarea[aria-label="补充内容"]').disabled, true);
    assert.equal(ui.button('正在发送').disabled, true);
    await act(async () => response.resolve({success: true, value: {guidance: {}}}));
    assert.equal(getDraft(key).state, 'sent');
    assert.equal(getSession().guidanceEditor, null);
});

test('uncertain delivery freezes the ID and body and retries exactly the same payload', async () => {
    const key = initialize();
    useExecutionStore.getState().updateGuidanceDraft(cid, key, '  编辑后的补充  ');
    const submission = controller(key);
    submission.state.reply = () => Promise.reject(new Error('WebSocket reply timed out'));
    assert.equal(await submission.submit(), false);
    const originalPayload = {...submission.state.events[0].payload};
    assert.equal(getDraft(key).state, 'uncertain');
    assert.equal(getDraft(key).submittedContent, '编辑后的补充');
    useExecutionStore.getState().updateGuidanceDraft(cid, key, '不能变成这个内容');
    assert.equal(getDraft(key).content, '  编辑后的补充  ');
    assert.equal(getDraft(key).submissionId, originalPayload.guidanceId);
    submission.state.reply = () => Promise.resolve({success: true, value: {guidance: {}}});
    assert.equal(await submission.submit(), true);
    assert.deepEqual(submission.state.events[1].payload, originalPayload);
    assert.equal(submission.state.sequence, 1);
    assert.equal(getDraft(key).state, 'sent');
});

test('an uncertain server acknowledgement preserves the same frozen submission for explicit retry', async () => {
    const key = initialize();
    const submission = controller(key);
    submission.state.reply = () => Promise.resolve({success: false, submissionUncertain: true,
        guidanceId: 'new-guidance-1', value: '暂时无法确认提交结果'});
    assert.equal(await submission.submit(), false);
    assert.equal(getDraft(key).state, 'uncertain');
    const original = {...submission.state.events[0].payload};
    useExecutionStore.getState().updateGuidanceDraft(cid, key, '不可修改未确认正文');
    assert.equal(getDraft(key).submittedContent, original.content);
    submission.state.reply = () => Promise.resolve({success: true, value: {guidanceId: original.guidanceId, guidance: {}}});
    assert.equal(await submission.submit(), true);
    assert.deepEqual(submission.state.events[1].payload, original);
    assert.equal(submission.state.sequence, 1);
});

test('a mismatched receipt cannot mark the draft sent or insert another conversation snapshot', async () => {
    const key = initialize();
    const submission = controller(key);
    submission.state.reply = (event) => Promise.resolve({success: true, value: {
        guidanceId: event.payload.guidanceId, execution: {...execution, conversationId: 'different-conversation'},
    }});
    assert.equal(await submission.submit(), false);
    assert.equal(getDraft(key).state, 'uncertain');
    assert.equal(useExecutionStore.getState().sessions['different-conversation'], undefined);
    assert.equal(getSession().guidanceEditor.draftKey, key);
});

test('late composer patches cannot resurrect withdrawn or replaced guidance while an authoritative restore remains valid', () => {
    initialize();
    useExecutionStore.getState().patchActivity(cid, eid, source.id, {state: 'failed'});
    useExecutionStore.getState().patchActivity(cid, eid, source.id, {state: 'pending', canToggle: true});
    assert.equal(getSession().executions[eid].activities[0].state, 'withdrawn');
    useExecutionStore.getState().upsertExecution({...execution, updatedAt: 2,
        activities: [{...source, state: 'pending', canToggle: true, canRewrite: false}]});
    assert.equal(getSession().executions[eid].activities[0].state, 'pending');
    useExecutionStore.getState().upsertExecution({...execution, updatedAt: 3,
        activities: [{...source, state: 'replaced', replacedByGuidanceId: 'new-version'}]});
    useExecutionStore.getState().patchActivity(cid, eid, source.id, {state: 'failed'});
    assert.equal(getSession().executions[eid].activities[0].state, 'replaced');
});

test('uncertain DOM disables edits and exposes explicit receipt retry', async (t) => {
    const key = initialize();
    const ui = await mount(t, Editor, {execution});
    ui.state.reply = () => Promise.reject(new Error('transport timeout'));
    await ui.click(ui.button('发送补充'));
    assert.equal(getDraft(key).state, 'uncertain');
    assert.equal(document.querySelector('textarea[aria-label="补充内容"]').disabled, true);
    assert.equal(ui.button('重试确认').disabled, false);
    assert.match(document.querySelector('[role="status"]').textContent, /确认前不能修改/);
    await ui.click(ui.button('取消'));
    assert.ok(ui.button('确认未完成的提交'));
    await ui.click(ui.button('确认未完成的提交'));
    assert.equal(getSession().guidanceEditor.draftKey, key);
    assert.equal(ui.button('重试确认').disabled, false);
});

test('a server activity receipt wins over a later transport timeout', async () => {
    const key = initialize();
    const submission = controller(key);
    const response = deferred();
    submission.state.reply = () => response.promise;
    const result = submission.submit();
    const guidanceId = submission.state.events[0].payload.guidanceId;
    useExecutionStore.getState().upsertActivity(execution, {id: guidanceId, kind: 'guidance',
        source: 'user_guidance', state: 'pending', content: source.content, replacesGuidanceId: source.id});
    assert.equal(getDraft(key).state, 'sent');
    assert.equal(getSession().guidanceEditor, null);
    response.reject(new Error('late timeout after receipt'));
    await result;
    assert.equal(getDraft(key).state, 'sent');
    assert.equal(getDraft(key).error, '');
});

test('a full server snapshot receipt wins over a later transport timeout', async () => {
    const key = initialize();
    const submission = controller(key);
    const response = deferred();
    submission.state.reply = () => response.promise;
    const result = submission.submit();
    const guidanceId = submission.state.events[0].payload.guidanceId;
    useExecutionStore.getState().upsertExecution({...execution, updatedAt: 2,
        activities: [source, {id: guidanceId, kind: 'guidance', state: 'pending', content: source.content}]});
    assert.equal(getDraft(key).state, 'sent');
    response.reject(new Error('late timeout after snapshot'));
    await result;
    assert.equal(getDraft(key).state, 'sent');
    assert.equal(getDraft(key).error, '');
});

test('switching the active execution rejects stale draft submission without generating an ID', async () => {
    const key = initialize();
    const another = {...execution, executionId: 'execution-2', runId: 'run-2'};
    useExecutionStore.getState().openExecution(another);
    const submission = controller(key);
    assert.equal(await submission.submit(), false);
    assert.equal(submission.state.events.length, 0);
    assert.equal(submission.state.sequence, 0);
    const wrongConversation = controller(key, {conversationId: 'conversation-2'});
    assert.equal(await wrongConversation.submit(), false);
    assert.equal(wrongConversation.state.events.length, 0);
    useExecutionStore.getState().close(cid);
    assert.equal(await submission.submit(), false);
    assert.equal(submission.state.events.length, 0);
});

test('rerendering for another conversation cannot reuse the old editor or send its content', async (t) => {
    const key = initialize();
    const ui = await mount(t, Editor, {execution});
    assert.ok(ui.button('发送补充'));
    const another = {...execution, executionId: 'execution-2', conversationId: 'conversation-2'};
    await ui.render({execution: another});
    assert.equal(ui.button('发送补充'), undefined);
    assert.equal(document.querySelector('[data-execution-guidance-editor]'), null);
    assert.equal(getDraft(key).state, 'editing');
    assert.equal(ui.state.events.length, 0);
});

test('correction creates a new guidance and never includes a replacement link', async () => {
    const locked = {...execution, activities: [{...source, state: 'responded', canRewrite: false}]};
    const key = initialize('correction', locked);
    const submission = controller(key);
    assert.equal(await submission.submit(), true);
    assert.equal(Object.hasOwn(submission.state.events[0].payload, 'replacesGuidanceId'), false);
    assert.equal(getDraft(key).mode, 'correction');
    assert.equal(getSession().executions[eid].activities.find((item) => item.id === source.id).state, 'responded');
});

test('withdrawn and replaced history default to collapsed and version links navigate only to present records', async (t) => {
    useExecutionStore.setState({sessions: {}});
    const old = {...source, canToggle: false, canRewrite: false, state: 'replaced', replacedByGuidanceId: 'new-version'};
    const next = {...source, id: 'new-version', state: 'pending', content: '新的补充版本', replacesGuidanceId: source.id};
    const versions = {...execution, activities: [old, next]};
    const ui = await mount(t, Record, {activity: old, execution: versions});
    assert.equal(document.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');
    assert.equal(ui.html().includes(source.content), false);
    await ui.click(ui.button('查看新的有效版本'));
    assert.equal(getSession().navigationRequest.activityId, next.id);
    await ui.click(document.querySelector('button[aria-expanded]'));
    assert.match(ui.html(), /原补充内容/);
    await ui.render({key: 'withdrawn-record', activity: {...source, id: 'withdrawn-record', state: 'withdrawn'}, execution: {...execution, activities: [source]}});
    assert.equal(document.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'false');
    await ui.render({activity: next, execution: versions});
    assert.equal(document.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), 'true');
    await ui.click(ui.button('此版本替代了已撤回的补充 · 查看原文'));
    assert.equal(getSession().navigationRequest.activityId, source.id);
    await ui.render({activity: next, execution: {...execution, activities: [next]}});
    assert.equal(ui.button('此版本替代了已撤回的补充 · 查看原文'), undefined);
    assert.match(ui.html(), /原补充记录已归档/);
    await ui.render({activity: old, execution: {...execution, activities: [old]}});
    assert.equal(ui.button('查看新的有效版本'), undefined);
    assert.match(ui.html(), /新版本记录已归档/);
});
