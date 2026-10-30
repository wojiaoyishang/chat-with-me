import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ts from 'typescript';
import {
    acceptGuidanceSnapshot, clearAcceptedGuidanceDraft, collectPendingGuidance,
    guidanceDraftFingerprint, mergePendingGuidanceDraft, mutatePendingGuidance, pendingGuidanceSummary,
} from '../src/features/chat/composer/pendingGuidance.js';
import { getVisionAttachmentIds } from '../src/features/chat/attachmentVision.js';
import { clearComposerDraft, clearComposerGuidanceSubmission, readComposerGuidanceSubmission,
    saveComposerGuidanceSubmission, saveComposerSnapshot, readComposerGuidanceEdits,
    saveComposerGuidanceEdit, clearComposerGuidanceEdit } from '../src/features/chat/composer/draftStore.js';

const execution = { executionId: 'execution-1', conversationId: 'chat-1', runId: 'run-1', turnId: 'turn-1', active: true, status: 'running' };
const image = { serverId: 'image-1', name: '页面.png', fileType: 'image', preview: 'cwm://artifact/image-1/preview', visionEnabled: true };
const file = { serverId: 'file-1', name: '笔记.md', fileType: 'text' };
const guidance = { id: 'supplement-1', state: 'pending', content: '请对比图中的定义', attachments: [image, file], visionAttachmentIds: ['image-1'] };
const ack = (extra = {}) => ({ success: true, value: { execution: { ...execution, pendingGuidance: [] }, guidance, ...extra } });
const deferred = () => { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; };

test('pending queue uses only server pendingGuidance, preserving several executions and receipt order', () => {
    const received = { ...guidance, id: 'received', state: 'consumed' };
    const data = collectPendingGuidance({
        first: { ...execution, pendingGuidance: [{ ...guidance, createdAt: 20 }, received], activities: [{ id: 'optimistic', kind: 'guidance', state: 'pending' }] },
        second: { ...execution, executionId: 'execution-2', pendingGuidance: [{ ...guidance, id: 'earlier', createdAt: 10 }] },
    });
    assert.deepEqual(data.map((item) => item.guidance.id), ['earlier', guidance.id]);
    assert.equal(pendingGuidanceSummary({ attachments: [image, file] }), '页面.png、笔记.md');
    assert.deepEqual(collectPendingGuidance(), []);
});

test('editing merges a newer text draft and attachments, retaining user vision choices', () => {
    const merged = mergePendingGuidanceDraft({ content: '刚输入的新草稿', attachments: [{ ...image, visionEnabled: false }] }, guidance);
    assert.equal(merged.content, '刚输入的新草稿\n\n请对比图中的定义');
    assert.deepEqual(merged.attachments.map((item) => item.serverId), ['image-1', 'file-1']);
    assert.equal(merged.attachments[0].visionEnabled, false);
    const restored = mergePendingGuidanceDraft({}, { ...guidance, visionAttachmentIds: [] });
    assert.equal(restored.attachments[0].visionEnabled, false);
});

test('admission clears submitted content and attachments, retaining later edits/uploads', () => {
    const submitted = { content: guidance.content, attachments: [image] };
    assert.deepEqual(clearAcceptedGuidanceDraft({ ...submitted, attachments: [image, file] }, submitted), { content: '', attachments: [file] });
    assert.deepEqual(clearAcceptedGuidanceDraft({ content: '更新后的草稿', attachments: [image, file] }, submitted), { content: '更新后的草稿', attachments: [file] });
});

test('edit waits for atomic ACK and returns the complete editable attachment payload', async () => {
    const wait = deferred();
    const events = []; const snapshots = []; let completed = false;
    const promise = mutatePendingGuidance({ action: 'edit', execution, guidance, emitEvent: (event) => { events.push(event); return wait.promise; }, upsert: (value) => snapshots.push(value) }).then((value) => { completed = true; return value; });
    assert.equal(completed, false);
    assert.deepEqual(events[0], { event: 'execution.guidance.edit', conversationId: execution.conversationId,
        runId: execution.runId, turnId: execution.turnId, payload: { executionId: execution.executionId, guidanceId: guidance.id } });
    wait.resolve(ack());
    assert.deepEqual(await promise, guidance);
    assert.equal(snapshots.length, 1);
});

test('delete sends no withdrawal and applies the authoritative empty queue', async () => {
    let event;
    const snapshots = [];
    assert.equal(await mutatePendingGuidance({ action: 'delete', execution, guidance, emitEvent: async (value) => { event = value; return ack(); }, upsert: (value) => snapshots.push(value) }), null);
    assert.equal(event.event, 'execution.guidance.delete');
    assert.deepEqual(snapshots[0].pendingGuidance, []);
    assert.equal(Object.hasOwn(event.payload, 'withdraw'), false);
});

test('consumption conflict refreshes the queue but never restores stale content', async () => {
    const snapshots = [];
    await assert.rejects(mutatePendingGuidance({ action: 'edit', execution, guidance, emitEvent: async () => ({ ...ack(), success: false, message: '模型已接收这条补充' }), upsert: (value) => snapshots.push(value) }), /模型已接收/);
    assert.deepEqual(snapshots[0].pendingGuidance, []);
    assert.throws(() => acceptGuidanceSnapshot(ack({ execution: { ...execution, conversationId: 'other-chat' } }), execution, () => assert.fail('must not change another chat')), /对应执行/);
    await assert.rejects(mutatePendingGuidance({ action: 'edit', execution, guidance, emitEvent: async () => ack({ guidance: { ...guidance, id: 'another-item' } }), upsert: () => {} }), /对应消息/);
    await assert.rejects(mutatePendingGuidance({ action: 'edit', execution, guidance, emitEvent: async () => ack({ execution: { ...execution, pendingGuidance: [guidance] } }), upsert: () => {} }), /尚未移出/);
    await assert.rejects(mutatePendingGuidance({ action: 'edit', execution, guidance,
        emitEvent: async () => ({ success: false, conflict: true, value: '补充已被接收', execution: { ...execution, pendingGuidance: [] } }),
        upsert: (value) => snapshots.push(value) }), /补充已被接收/);
    assert.equal(snapshots.length, 2);
});

// Exercise the real composer send callback, keeping transports and browser draft
// storage fake rather than invoking an LLM or altering a real conversation.
const chatBoxSource = readFileSync(new URL('../src/features/chat/ui/ChatBox.jsx', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('ChatBox.jsx', chatBoxSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
let sendCallback;
let commitCallback;
const findCallback = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'handleSendMessage') sendCallback = node.initializer.arguments[0].getText(parsed);
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'commitAcceptedGuidanceDraft') commitCallback = node.initializer.arguments[0].getText(parsed);
    ts.forEachChild(node, findCallback);
};
findCallback(parsed);
assert.ok(sendCallback);

function composerHarness({ content = guidance.content, attachments = [image, file], response = ack() } = {}) {
    const state = { events: [], errors: [], warnings: [], snapshots: [], cleared: [], saved: [], pending: false, content, attachments, response, sequence: 0, receipts: new Map() };
    const contentRef = { current: content }; const attachmentsRef = { current: attachments };
    const currentConversation = { current: execution.conversationId };
    const scope = {
        canMutateConversation: () => true,
        turnSubmissionRef: { current: null }, turnSubmissionPhaseRef: { current: 'running' }, editDraftRef: { current: null }, isEditMessageRef: { current: false },
        messageContentRef: contentRef, attachmentsMetaRef: attachmentsRef, activeExecutionRef: { current: execution }, sendButtonStatusRef: { current: 'generating' },
        attachmentsMeta: attachments, draftConversationIdRef: { current: execution.conversationId }, renderedConversationIdRef: currentConversation,
        conversationId: execution.conversationId, uncertainGuidanceRef: { current: new Map() }, guidanceDraftFingerprint, refreshGuidanceSubmission: () => {},
        useExecutionStore: { getState: () => ({ sessions: {} }) },
        setIsTurnSubmitting: () => {}, setIsMessageSaving: () => {}, waitForConversationToolSync: async () => {}, waitForWorkspaceSelectionSync: async () => {}, uploadFiles: [],
        executionGuidancePendingRef: { current: false }, guidanceSubmissionRef: { current: null }, setIsExecutionGuidancePending: (value) => { state.pending = value; },
        createExecutionGuidanceId: () => `new-supplement-${++state.sequence}`, currentRoleRef: { current: { name: 'user' } }, persistActiveDraft: (value) => value,
        saveComposerGuidanceSubmission: (cid, value) => { state.receipts.set(cid, value); return value; },
        clearComposerGuidanceSubmission: (cid) => state.receipts.delete(cid),
        emitEvent: async (event) => { state.events.push(event); return await (typeof state.response === 'function' ? state.response(event) : state.response); },
        acceptGuidanceSnapshot, upsertExecution: (value) => state.snapshots.push(value), getVisionAttachmentIds, guidanceActionError: (value, fallback) => value.message || fallback,
        t: (_key, fallback) => fallback, readComposerDraft: () => state.otherDraft || {}, clearAcceptedGuidanceDraft,
        saveComposerSnapshot: (value) => state.saved.push(value), clearComposerDraft: (value) => state.cleared.push(value),
        setAttachments: (value) => { attachmentsRef.current = value; state.attachments = value; },
        updateMessageContent: (value) => { contentRef.current = value; state.content = value; }, textareaRef: { current: null },
        toast: { error: (value) => state.errors.push(value), warning: (value) => state.warnings.push(value) }, console: { error() {} },
    };
    scope.commitAcceptedGuidanceDraft = new Function(...Object.keys(scope), `return (${commitCallback});`)(...Object.values(scope));
    const send = new Function(...Object.keys(scope), `return (${sendCallback});`)(...Object.values(scope));
    return { state, send, contentRef, attachmentsRef, currentConversation, activeExecutionRef: scope.activeExecutionRef };
}

test('draft receipt preserves the original ID and exact attachment body through a refresh, independently of normal drafts', () => {
    const dom = new JSDOM('<div></div>', { url: 'http://localhost/chat' });
    globalThis.window = dom.window;
    try {
        saveComposerSnapshot({ conversationId: execution.conversationId, content: guidance.content, attachments: [image, file] });
        const saved = saveComposerGuidanceSubmission(execution.conversationId, { guidanceId: 'stable-id', execution, submitted: guidance });
        assert.equal(saved.guidanceId, 'stable-id');
        clearComposerDraft({ conversationId: execution.conversationId });
        const restored = readComposerGuidanceSubmission(execution.conversationId);
        assert.equal(restored.guidanceId, 'stable-id');
        assert.equal(guidanceDraftFingerprint(restored.submitted), guidanceDraftFingerprint(saved.submitted));
        clearComposerGuidanceSubmission(execution.conversationId, 'another-id');
        assert.ok(readComposerGuidanceSubmission(execution.conversationId));
        clearComposerGuidanceSubmission(execution.conversationId, 'stable-id');
        assert.equal(readComposerGuidanceSubmission(execution.conversationId), null);
    } finally { dom.window.close(); delete globalThis.window; }
});

test('edit recovery persists operation identities through draft clearing and isolates different conversations', () => {
    const dom = new JSDOM('<div></div>', { url: 'http://localhost/chat' }); globalThis.window = dom.window;
    try {
        const receipt = saveComposerGuidanceEdit(execution.conversationId, execution, guidance);
        saveComposerGuidanceEdit(execution.conversationId, execution, { ...guidance, id: 'second', content: '第二条' });
        saveComposerSnapshot({ conversationId: execution.conversationId, content: '当前草稿' });
        clearComposerDraft({ conversationId: execution.conversationId });
        const restored = readComposerGuidanceEdits(execution.conversationId);
        assert.equal(restored.length, 2);
        assert.equal(restored[0].guidanceId, guidance.id);
        assert.deepEqual(restored[0].guidance.attachments, receipt.guidance.attachments);
        assert.deepEqual(readComposerGuidanceEdits('another-chat'), []);
        clearComposerGuidanceEdit(execution.conversationId, 'another-execution', guidance.id);
        assert.equal(readComposerGuidanceEdits(execution.conversationId).length, 2);
        clearComposerGuidanceEdit(execution.conversationId, execution.executionId, guidance.id);
        assert.deepEqual(readComposerGuidanceEdits(execution.conversationId).map((item) => item.guidanceId), ['second']);
    } finally { dom.window.close(); delete globalThis.window; }
});

test('real composer sends execution supplements with attachments and vision IDs, clearing only after ACK', async () => {
    const wait = deferred();
    const ui = composerHarness({ response: wait.promise });
    const request = ui.send();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(ui.state.pending, true);
    assert.equal(ui.state.content, guidance.content);
    assert.deepEqual(ui.state.attachments, [image, file]);
    assert.equal(ui.state.events[0].event, 'execution.guidance.add');
    assert.deepEqual(ui.state.events[0].payload.attachments, [image, file]);
    assert.deepEqual(ui.state.events[0].payload.visionAttachmentIds, ['image-1']);
    wait.resolve(ack());
    await request;
    assert.equal(ui.state.content, '');
    assert.deepEqual(ui.state.attachments, []);
    assert.equal(ui.state.pending, false);
});

test('real composer accepts attachment-only guidance and rejected admission leaves the original draft', async () => {
    const ui = composerHarness({ content: '', attachments: [image], response: { success: false, message: '附件不可访问' } });
    await ui.send();
    assert.equal(ui.state.events[0].event, 'execution.guidance.add');
    assert.equal(ui.state.events[0].payload.content, '');
    assert.deepEqual(ui.state.attachments, [image]);
    assert.deepEqual(ui.state.errors, ['附件不可访问']);
    assert.deepEqual(ui.state.cleared, []);
});

test('late composer ACK only commits its original draft and cannot clear a newly opened chat', async () => {
    const wait = deferred(); const ui = composerHarness({ response: wait.promise });
    const request = ui.send();
    await new Promise((resolve) => setImmediate(resolve));
    ui.currentConversation.current = 'another-chat';
    ui.contentRef.current = '另一会话草稿'; ui.state.content = ui.contentRef.current;
    ui.attachmentsRef.current = [file]; ui.state.attachments = [file];
    ui.state.otherDraft = { content: guidance.content, attachments: [image, file] };
    wait.resolve(ack()); await request;
    assert.equal(ui.state.content, '另一会话草稿');
    assert.deepEqual(ui.state.attachments, [file]);
    assert.deepEqual(ui.state.cleared, [{ conversationId: execution.conversationId, mode: 'normal' }]);
});

test('uncertain delivery retries the original ID and frozen attachments, while edited drafts remain untouched', async () => {
    const ui = composerHarness({ response: () => Promise.reject(new Error('timeout')) });
    await ui.send();
    const original = ui.state.events[0].payload;
    assert.equal(ui.state.sequence, 1);
    assert.equal(ui.state.receipts.size, 1);
    ui.contentRef.current = '新增草稿'; ui.state.content = '新增草稿';
    ui.attachmentsRef.current = [file]; ui.state.attachments = [file];
    await ui.send();
    assert.equal(ui.state.events.length, 1);
    assert.match(ui.state.warnings[0], /重试确认/);
    ui.state.response = ack();
    await ui.send({ retryGuidance: true });
    assert.deepEqual(ui.state.events[1].payload, original);
    assert.equal(ui.state.sequence, 1);
    assert.equal(ui.state.receipts.size, 0);
    assert.equal(ui.state.content, '新增草稿');
    assert.deepEqual(ui.state.attachments, []);
});

test('successful receipt without a full snapshot confirms once instead of generating another ID', async () => {
    const ui = composerHarness({ response: (event) => ({ success: true, value: { guidance: { id: event.payload.guidanceId } } }) });
    await ui.send();
    assert.equal(ui.state.content, '');
    assert.deepEqual(ui.state.attachments, []);
    assert.equal(ui.state.receipts.size, 0);
    assert.equal(ui.state.errors.length, 0);
});

test('uncertain receipt can still be confirmed against its original execution after that execution ends', async () => {
    const ui = composerHarness({ response: () => Promise.reject(new Error('timeout')) });
    await ui.send();
    const original = ui.state.events[0].payload;
    ui.activeExecutionRef.current = null;
    ui.state.response = (event) => ({ success: true, value: { guidance: { id: event.payload.guidanceId } } });
    await ui.send({ retryGuidance: true });
    assert.deepEqual(ui.state.events[1].payload, original);
    assert.equal(ui.state.content, '');
    assert.equal(ui.state.receipts.size, 0);
});

await build({
    stdin: { contents: `export {default as Queue} from './src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx';
        export {default as SendButton} from './src/features/chat/ui/chatbox/components/SendButton.jsx';`, resolveDir: process.cwd() },
    bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node', outfile: 'temp/pending-guidance-composer-test.mjs',
    plugins: [{ name: 'queue-controls', setup(builder) {
        builder.onResolve({ filter: /^@\// }, ({ path }) => ({ path, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => ({ loader: 'jsx', resolveDir: process.cwd(), contents:
            path.endsWith('dropdown-menu') ? `export const DropdownMenu = ({children}) => <div>{children}</div>;
                export const DropdownMenuTrigger = ({children}) => children;
                export const DropdownMenuContent = ({children}) => <div>{children}</div>;
                export const DropdownMenuItem = ({children, onSelect}) => <button onClick={onSelect}>{children}</button>;`
                : path.endsWith('virtualUrl.js') ? 'export const resolveResourceUrl = (value) => value?.replace("cwm://artifact/", "http://localhost/preview/") || "";'
                    : path.endsWith('useExecutionStore.js') ? 'export const upsertExecution = (value) => globalThis.__pendingQueue.snapshots.push(value);'
                        : 'export const emitEvent = (event) => {globalThis.__pendingQueue.events.push(event); return globalThis.__pendingQueue.reply(event);};' }));
    } }],
});
const { Queue, SendButton } = await import('../temp/pending-guidance-composer-test.mjs');

async function mount(t, Component, props) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat', pretendToBeVisual: true });
    globalThis.window = dom.window; globalThis.document = dom.window.document; globalThis.HTMLElement = dom.window.HTMLElement; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const state = { events: [], snapshots: [], reply: async () => ack() }; globalThis.__pendingQueue = state;
    let root = createRoot(document.getElementById('root'));
    t.after(async () => { await act(async () => root.unmount()); dom.window.close(); delete globalThis.__pendingQueue; });
    const render = async (next) => act(async () => root.render(React.createElement(Component, next)));
    await render(props);
    return { state, render, remount: async (next) => {
        await act(async () => root.unmount()); root = createRoot(document.getElementById('root')); await render(next);
    }, click: async (button) => act(async () => button.click()) };
}

test('queue renders compact ordered rows, image thumbnails, attachment counts, and a bounded scroll viewport', async (t) => {
    await mount(t, Queue, { items: [{ execution, guidance }, { execution, guidance: { ...guidance, id: 'second', content: '', attachments: [file] } }] });
    const region = document.querySelector('[data-pending-guidance-queue]');
    assert.match(region.className, /max-h-\[180px\].*overflow-y-auto.*overscroll-contain/);
    assert.deepEqual([...region.querySelectorAll('[data-pending-guidance]')].map((row) => row.dataset.pendingGuidance), [guidance.id, 'second']);
    assert.match(region.textContent, /待接收/);
    assert.match(region.textContent, /2 个附件/);
    assert.match(region.textContent, /笔记.md/);
    assert.equal(region.querySelector('img').alt, '页面.png');
    assert.match(region.querySelector('[data-pending-guidance]').className, /h-11/);
    assert.doesNotMatch(region.textContent, /撤回/);
});

test('queue editing waits for the server and restores the complete payload only after removal', async (t) => {
    const edits = []; const ui = await mount(t, Queue, { items: [{ execution, guidance }], onEdit: (...args) => edits.push(args) });
    const wait = deferred(); ui.state.reply = () => wait.promise;
    const button = [...document.querySelectorAll('button')].find((item) => item.textContent === '编辑后重新发送');
    await ui.click(button);
    assert.equal(edits.length, 0);
    assert.equal(document.querySelector('[aria-label="删除待接收消息"]').disabled, true);
    await act(async () => wait.resolve(ack()));
    assert.deepEqual(edits[0], [guidance, execution]);
    assert.equal(ui.state.events[0].event, 'execution.guidance.edit');
});

test('lost edit ACK survives removal broadcasts and refresh, then retries the same operation to recover server text and attachments', async (t) => {
    const edits = [];
    const props = { conversationId: execution.conversationId, items: [{ execution, guidance }], onEdit: (...args) => edits.push(args) };
    const ui = await mount(t, Queue, props);
    ui.state.reply = () => Promise.reject(new Error('Timeout waiting for edit ACK'));
    await ui.click([...document.querySelectorAll('button')].find((item) => item.textContent === '编辑后重新发送'));
    assert.equal(edits.length, 0);
    assert.equal(readComposerGuidanceEdits(execution.conversationId).length, 1);
    await ui.render({ ...props, items: [] });
    assert.equal(document.querySelector('[data-pending-guidance]'), null);
    assert.match(document.querySelector('[data-guidance-edit-recovery]').textContent, /编辑结果尚未确认/);
    await ui.remount({ ...props, items: [] });
    const retry = [...document.querySelectorAll('button')].find((item) => item.textContent === '重试取回');
    assert.ok(retry, 'recovery comes from the operation receipt, even with an empty server queue');
    const canonical = { ...guidance, content: '由服务端成功回执取回的正文', attachments: [file], visionAttachmentIds: [] };
    ui.state.reply = async () => ack({ guidance: canonical });
    await ui.click(retry);
    assert.deepEqual(ui.state.events[1], ui.state.events[0]);
    assert.deepEqual(edits[0][0], canonical);
    assert.equal(readComposerGuidanceEdits(execution.conversationId).length, 0);
    assert.equal(document.querySelector('[data-guidance-edit-recovery]'), null);
});

test('confirmed consumed conflict clears the edit receipt and updates the queue without restoring local hint content', async (t) => {
    const edits = [];
    const props = { conversationId: execution.conversationId, items: [{ execution, guidance }], onEdit: (value) => edits.push(value) };
    const ui = await mount(t, Queue, props);
    ui.state.reply = () => Promise.reject(new Error('Timeout'));
    await ui.click([...document.querySelectorAll('button')].find((item) => item.textContent === '编辑后重新发送'));
    await ui.render({ ...props, items: [] });
    ui.state.reply = async () => ({ success: false, conflict: true, value: '模型已接收，不能取回', execution: { ...execution, pendingGuidance: [] } });
    await ui.click([...document.querySelectorAll('button')].find((item) => item.textContent === '重试取回'));
    assert.equal(readComposerGuidanceEdits(execution.conversationId).length, 0);
    assert.equal(edits.length, 0);
    assert.deepEqual(ui.state.snapshots.at(-1).pendingGuidance, []);
    assert.equal(document.querySelector('[data-guidance-edit-recovery]'), null);
});

test('a late unmounted edit ACK and a remounted retry restore the same operation only once', async (t) => {
    const edits = []; const first = deferred(); const second = deferred();
    const props = { conversationId: execution.conversationId, items: [{ execution, guidance }], onEdit: (value) => edits.push(value) };
    const ui = await mount(t, Queue, props);
    ui.state.reply = () => first.promise;
    await ui.click([...document.querySelectorAll('button')].find((item) => item.textContent === '编辑后重新发送'));
    await ui.remount({ ...props, items: [] });
    ui.state.reply = () => second.promise;
    await ui.click([...document.querySelectorAll('button')].find((item) => item.textContent === '重试取回'));
    await act(async () => { first.resolve(ack()); second.resolve(ack()); });
    assert.equal(edits.length, 1);
    assert.equal(readComposerGuidanceEdits(execution.conversationId).length, 0);
    assert.equal(document.querySelector('[data-guidance-edit-recovery]'), null);
});

test('attachment-only execution input shows send rather than stop, and uploads keep it locked', async (t) => {
    const props = { status: 'generating', messageContent: '', attachmentsMeta: [image], executionActive: true, onClick() {}, t: (key, fallback) => fallback || key };
    const ui = await mount(t, SendButton, props);
    assert.equal(document.querySelector('button').getAttribute('aria-label'), '追加到当前执行');
    assert.equal(document.querySelector('button').disabled, false);
    await ui.render({ ...props, uploadPending: true });
    assert.equal(document.querySelector('button').disabled, true);
    await ui.render({ ...props, attachmentsMeta: [] });
    assert.equal(document.querySelector('button').getAttribute('aria-label'), '停止执行');
});
