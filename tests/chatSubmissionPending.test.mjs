import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MESSAGE_STREAM_EVENTS } from '../src/features/chat/page/utils/messageStreamBatch.js';

const pageSource = fs.readFileSync('src/features/chat/ChatPage.jsx', 'utf8');
const composerSource = fs.readFileSync('src/features/chat/ui/ChatBox.jsx', 'utf8');

// Exercise the real callbacks without replacing a chat's network/store lifecycle
// with a second implementation. Parsing the declaration avoids depending on its
// hook dependency list or formatting.
function callback(source, name, scope) {
    const tree = ts.createSourceFile('chat.jsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
    let expression;
    const visit = (node) => {
        if (ts.isVariableDeclaration(node) && node.name.getText(tree) === name && ts.isCallExpression(node.initializer)) {
            expression = node.initializer.arguments[0].getText(tree);
        }
        ts.forEachChild(node, visit);
    };
    visit(tree);
    assert.ok(expression, `Missing callback ${name}`);
    return new Function(...Object.keys(scope), `return (${expression});`)(...Object.values(scope));
}

function eventHandler(source, eventName, scope) {
    scope = { MESSAGE_STREAM_EVENTS, streamBatch: { flush() {} }, ...scope };
    const tree = ts.createSourceFile('chat.jsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
    let expression;
    const visit = (node) => {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'then') {
            const registration = node.expression.expression;
            if (ts.isCallExpression(registration) && registration.expression.getText(tree) === 'onEvent') {
                const options = registration.arguments[0];
                const event = options?.properties?.find((property) => property.name?.getText(tree) === 'event')?.initializer;
                const names = event && ts.isArrayLiteralExpression(event) ? event.elements : [event];
                if (names.some((name) => name && ts.isStringLiteral(name) && name.text === eventName)) {
                    expression = node.arguments[0].getText(tree);
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(tree);
    assert.ok(expression, `Missing event handler ${eventName}`);
    return new Function(...Object.keys(scope), `return (${expression});`)(...Object.values(scope));
}

const deferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    return { promise, resolve, reject };
};
const tick = async () => { for (let i = 0; i < 8; i += 1) await Promise.resolve(); };
const t = (key) => key;

function pageHarness(overrides = {}) {
    const state = { submission: null, events: [], errors: [] };
    let sequence = 0;
    const scope = {
        canMutateConversation: () => true,
        uploadFiles: [],
        toast: { error: (value) => state.errors.push(value) },
        t,
        normalizeAttachmentList: (attachments) => attachments || [],
        isFirstMessageSend: false,
        setIsFirstMessageSend() {},
        generateUUID: () => `turn-${++sequence}`,
        getVisionAttachmentIds: () => [],
        selectedModel: { id: 'model' },
        advancedSettingsValues: {},
        pageType: 'chat',
        documentId: null,
        currentTurnIdempotencyKeyRef: { current: 'first-request' },
        conversationId: 'conversation',
        isNewConversationIdRef: { current: false },
        setIsNewConversationId() {},
        onNewConversationId() {},
        persistPendingWorkspaceSelection: async () => {},
        turnSubmissionRef: { current: null },
        setTurnSubmission: (value) => { state.submission = value; },
        emitEvent: (event) => { state.events.push(event); return Promise.resolve({ success: true }); },
        ...overrides,
    };
    return { state, scope, send: callback(pageSource, 'handleSendMessage', scope) };
}

function turnLifecycle(scope) {
    const start = pageSource.indexOf("                case 'turn.started':");
    const end = pageSource.indexOf("                case 'conversation.tree.changed':", start);
    assert.ok(start !== -1 && end > start);
    return new Function(...Object.keys(scope), 'event', 'eventTurnId', `
        const payload = {}; const eventRunId = null;
        switch (event) { ${pageSource.slice(start, end)} }
    `).bind(null, ...Object.values(scope));
}

function composerHarness(overrides = {}) {
    const state = { submitting: false, sends: [], content: 'message', cleared: [] };
    const attachments = overrides.attachmentsMeta ?? [];
    const scope = {
        canMutateConversation: () => true,
        turnSubmissionRef: { current: null },
        turnSubmissionPhaseRef: { current: '' },
        editDraftRef: { current: null },
        isEditMessageRef: { current: false },
        messageContentRef: { current: 'message' },
        activeExecutionRef: { current: null },
        sendButtonStatusRef: { current: 'normal' },
        draftConversationIdRef: { current: 'conversation' },
        setIsTurnSubmitting: (value) => { state.submitting = value; },
        attachmentsMeta: attachments,
        attachmentsMetaRef: { current: attachments },
        waitForConversationToolSync: async () => {},
        waitForWorkspaceSelectionSync: async () => {},
        runtimeToolPermissionRevisionRef: { current: 0 },
        runtimeToolPermissionRunIdRef: { current: null },
        setRuntimeToolPermissions() {},
        persistActiveDraft() {},
        readComposerDraft: () => ({ updatedAt: 1, content: 'message' }),
        pendingNormalCommitRef: { current: null },
        pendingEditCommitRef: { current: null },
        pendingEditClearRef: { current: false },
        buildOutboundToolsStatus: () => ({}),
        editMessageId: null,
        currentRole: { name: 'user' },
        isForkMode: false,
        leaveEditMode() {},
        conversationId: 'conversation',
        clearComposerDraft: (value) => state.cleared.push(value),
        clearMountedComposerDraft() {},
        textareaRef: { current: { focus() {} } },
        toast: { warning() {}, error() {} },
        t,
        console: { error() {} },
        onSendMessage: (value) => { state.sends.push(value); return Promise.resolve({ success: true }); },
        ...overrides,
    };
    return { state, scope, send: callback(composerSource, 'handleSendMessage', scope) };
}

test('normal submission occupies the composer before permission/workspace synchronization and preserves the outbound status', async () => {
    const permissions = deferred();
    const workspace = deferred();
    const admission = deferred();
    const sent = [];
    const harness = composerHarness({
        waitForConversationToolSync: () => permissions.promise,
        waitForWorkspaceSelectionSync: () => workspace.promise,
        onSendMessage: (value) => { sent.push(value); return admission.promise; },
    });
    const sending = harness.send();
    assert.equal(harness.state.submitting, true, 'spinner must start before the first await');
    assert.ok(harness.scope.turnSubmissionRef.current);
    await harness.send();
    assert.equal(sent.length, 0, 'rapid second send must not start another admission');
    permissions.resolve();
    await tick();
    assert.equal(harness.state.submitting, true);
    assert.equal(sent.length, 0);
    workspace.resolve();
    await tick();
    assert.equal(sent.length, 1);
    assert.equal(sent[0].sendButtonStatus, 'normal', 'local loading must not change the request into another action');
    admission.resolve({ success: true, conversationId: 'conversation' });
    await sending;
    assert.equal(harness.state.submitting, false);
    assert.equal(harness.scope.turnSubmissionRef.current, null);
});

test('a synchronization failure releases the local loading state and leaves the text untouched', async () => {
    const failure = new Error('workspace unavailable');
    const harness = composerHarness({ waitForWorkspaceSelectionSync: () => Promise.reject(failure) });
    await assert.rejects(harness.send(), failure);
    assert.equal(harness.state.submitting, false);
    assert.equal(harness.scope.turnSubmissionRef.current, null);
    assert.equal(harness.scope.messageContentRef.current, 'message');
    assert.deepEqual(harness.state.sends, []);
});

test('conversation creation is occupied immediately and an accepted reply retains the parent lock until the matching turn lifecycle event', async () => {
    const creation = deferred();
    const workspace = deferred();
    const events = [];
    const harness = pageHarness({
        conversationId: null,
        persistPendingWorkspaceSelection: () => workspace.promise,
        emitEvent: (event) => {
            events.push(event);
            return event.event === 'conversation.create' ? creation.promise : Promise.resolve({ success: true });
        },
    });
    const sending = harness.send({ messageContent: 'message', sendButtonStatus: 'normal' });
    assert.equal(harness.state.submission.phase, 'pending');
    assert.equal(events[0].event, 'conversation.create');
    creation.resolve({ success: true, value: 'created' });
    await tick();
    assert.equal(events.some((event) => event.event === 'turn.start'), false);
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'pending');
    workspace.resolve();
    assert.equal((await sending).success, true);
    const sentTurn = events.find((event) => event.event === 'turn.start');
    assert.equal(sentTurn.conversationId, 'created');
    assert.equal(harness.scope.turnSubmissionRef.current.turnId, sentTurn.turnId);
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'pending', 'protocol.reply precedes composer.clear and cannot release loading');
    const receive = turnLifecycle({
        turnSubmissionRef: harness.scope.turnSubmissionRef,
        setTurnSubmission: harness.scope.setTurnSubmission,
        messageSummariesRef: { current: [] },
        showQuickUserMessageNavigator: false,
        runtimeInspectorOpenRef: { current: false },
    });
    receive('turn.started', 'different-turn');
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'pending');
    receive('turn.started', sentTurn.turnId);
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'running');
    receive('turn.failed', 'different-turn');
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'running', 'a stale terminal event cannot release another turn');
    receive('turn.completed', sentTurn.turnId);
    assert.equal(harness.scope.turnSubmissionRef.current, null);
});

test('empty regeneration uses the same immediate admission lock and rejected admission releases it', async () => {
    const admission = deferred();
    const harness = pageHarness({ emitEvent: () => admission.promise });
    const sending = harness.send({ messageContent: '', sendButtonStatus: 'normal', isRegenerate: true });
    assert.equal(harness.scope.turnSubmissionRef.current.phase, 'pending');
    admission.resolve({ success: false, value: 'rejected' });
    await sending;
    assert.equal(harness.scope.turnSubmissionRef.current, null);
    assert.equal(harness.state.submission, null);
    assert.equal(harness.state.errors.length, 1);
});

test('saving system/assistant messages or a branch releases on acknowledgement while regeneration keeps its lifecycle lock', async () => {
    for (const action of [
        { role: 'system' },
        { role: 'assistant' },
        { role: 'assistant', isEditMessage: true },
        { role: 'system', isEditMessage: true },
        { role: 'user', isFork: true, isEditMessage: true },
    ]) {
        const response = deferred();
        const harness = pageHarness({ emitEvent: () => response.promise });
        const sending = harness.send({ messageContent: 'saved content', sendButtonStatus: 'normal', ...action });
        assert.equal(harness.scope.turnSubmissionRef.current.phase, 'pending');
        response.resolve({ success: true });
        await sending;
        assert.equal(harness.scope.turnSubmissionRef.current, null, `${JSON.stringify(action)} has no generating Turn`);
    }
    const response = deferred();
    const regenerating = pageHarness({ emitEvent: () => response.promise });
    const sending = regenerating.send({ role: 'assistant', isEditMessage: true, isRegenerate: true, messageContent: '', sendButtonStatus: 'normal' });
    response.resolve({ success: true });
    await sending;
    assert.equal(regenerating.scope.turnSubmissionRef.current.phase, 'pending');
});

test('reconnection keeps loading until an authoritative restored status replaces the old turn lock', () => {
    for (const restoredStatus of ['normal', 'generating', 'disabled']) {
        const state = { syncs: 0, submission: { turnId: 'old-turn', phase: 'running' } };
        const scope = {
        canMutateConversation: () => true,
            turnSubmissionRef: { current: state.submission },
            setTurnSubmission: (value) => { state.submission = value; },
            isMessageLoadedRef: { current: true },
            emitMessagesLoaded: () => { state.syncs += 1; },
        };
        const reconnect = eventHandler(pageSource, 'transport.connected', scope);
        const status = eventHandler(pageSource, 'composer.status.changed', scope);
        reconnect();
        assert.equal(scope.turnSubmissionRef.current.phase, 'recovering');
        assert.equal(state.submission.phase, 'recovering');
        assert.equal(state.syncs, 1);
        status({ event: 'composer.status.changed', payload: { value: 'loading' } });
        assert.equal(scope.turnSubmissionRef.current.phase, 'recovering', 'a loading notification cannot finish recovery');
        status({ event: 'composer.status.changed', payload: { value: restoredStatus } });
        assert.equal(scope.turnSubmissionRef.current, null);
        assert.equal(state.submission, null);

        // Ordinary pre-start normal events must still retain the new admission.
        scope.turnSubmissionRef.current = { turnId: 'new-turn', phase: 'pending' };
        status({ event: 'composer.status.changed', payload: { value: 'normal' } });
        assert.equal(scope.turnSubmissionRef.current.phase, 'pending');
    }
});

test('a late failed response from an old conversation cannot clear the new conversation admission', async () => {
    const oldResponse = deferred();
    const nextResponse = deferred();
    const shared = { current: null };
    const oldChat = pageHarness({ turnSubmissionRef: shared, emitEvent: () => oldResponse.promise });
    const oldSending = oldChat.send({ messageContent: 'old', sendButtonStatus: 'normal' });
    shared.current = null; // The actual navigation reset clears the previous chat's token.
    const newChat = pageHarness({ conversationId: 'next', turnSubmissionRef: shared, generateUUID: () => 'next-turn', emitEvent: () => nextResponse.promise });
    const nextSending = newChat.send({ messageContent: 'next', sendButtonStatus: 'normal' });
    const nextToken = shared.current;
    oldResponse.resolve({ success: false, value: 'late old failure' });
    await oldSending;
    assert.equal(shared.current, nextToken);
    assert.equal(newChat.state.submission, nextToken);
    nextResponse.resolve({ success: false, value: 'next failure' });
    await nextSending;
    assert.equal(shared.current, null);
});

test('an old composer completion cannot release the newer conversation local spinner', async () => {
    const oldResponse = deferred();
    const nextResponse = deferred();
    const shared = { current: null };
    const draft = { current: 'old' };
    const oldChat = composerHarness({ turnSubmissionRef: shared, draftConversationIdRef: draft, onSendMessage: () => oldResponse.promise });
    const oldSending = oldChat.send();
    await tick();
    shared.current = null;
    draft.current = 'next';
    const nextChat = composerHarness({ conversationId: 'next', turnSubmissionRef: shared, draftConversationIdRef: draft, onSendMessage: () => nextResponse.promise });
    const nextSending = nextChat.send();
    await tick();
    const nextToken = shared.current;
    oldResponse.resolve({ success: false });
    await oldSending;
    assert.equal(shared.current, nextToken);
    assert.equal(nextChat.state.submitting, true);
    nextResponse.resolve({ success: false });
    await nextSending;
    assert.equal(shared.current, null);
    assert.equal(nextChat.state.submitting, false);
});

test('voice rechecks the current admission/status and conversation after workspace synchronization', async () => {
    for (const change of ['submission', 'parent', 'status', 'conversation']) {
        const workspace = deferred();
        const calls = [];
        const scope = {
        canMutateConversation: () => true,
            turnSubmissionRef: { current: null },
            turnSubmissionPhaseRef: { current: '' },
            sendButtonStatusRef: { current: 'normal' },
            draftConversationIdRef: { current: 'conversation' },
            waitForWorkspaceSelectionSync: () => workspace.promise,
            onRealtimeVoiceStart: (payload) => calls.push(payload),
        };
        const start = callback(composerSource, 'handleRealtimeVoiceStartWithWorkspaceSync', scope);
        const starting = start({ composerStatus: 'normal' });
        if (change === 'submission') scope.turnSubmissionRef.current = {};
        if (change === 'parent') scope.turnSubmissionPhaseRef.current = 'pending';
        if (change === 'status') scope.sendButtonStatusRef.current = 'loading';
        if (change === 'conversation') scope.draftConversationIdRef.current = 'next';
        workspace.resolve();
        await starting;
        assert.deepEqual(calls, [], `${change} changed while waiting; microphone startup must not continue`);
    }
});

const outfile = 'temp/chat-submission-pending-test.mjs';
await build({
    entryPoints: ['src/features/chat/ui/chatbox/components/ComposerPrimaryAction.jsx'],
    bundle: true,
    packages: 'external',
    platform: 'node',
    format: 'esm',
    jsx: 'automatic',
    outfile,
    alias: { '@': path.resolve('src') },
    plugins: [{ name: 'composer-primary-action-test', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: modulePath }) => ({ path: modulePath, external: true }));
        builder.onResolve({ filter: /features\/chat\/voice\/index\.js$/ }, () => ({ path: 'voice', namespace: 'mock' }));
        builder.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({
            contents: 'export const RealtimeVoiceButton=({onClick})=><button aria-label="realtime voice" onClick={onClick}>voice</button>;',
            loader: 'jsx',
        }));
    } }],
});
const { default: ComposerPrimaryAction } = await import(`../${outfile}`);

test('cleared input remains a disabled spinner during admission and resumes voice only when idle', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat' });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node']) globalThis[key] = dom.window[key];
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const root = createRoot(document.getElementById('root'));
    let sends = 0;
    let voice = 0;
    const props = {
        status: 'normal', messageContent: '', attachmentsMeta: [],
        selectedModel: { id: 'model' }, realtimeVoiceCapability: { available: true },
        onSend: () => { sends += 1; }, onRealtimeVoiceStart: () => { voice += 1; }, t,
    };
    try {
        await act(async () => root.render(React.createElement(ComposerPrimaryAction, props)));
        assert.ok(document.querySelector('[aria-label="realtime voice"]'));
        for (const status of ['normal', 'loading']) {
            await act(async () => root.render(React.createElement(ComposerPrimaryAction, { ...props, status, submissionPending: true })));
            assert.equal(document.querySelector('[aria-label="realtime voice"]'), null);
            const button = document.querySelector('button');
            assert.equal(button.disabled, true);
            assert.ok(button.querySelector('.animate-spin'), 'empty cleared input must retain a visible loading indicator');
            await act(async () => button.click());
        }
        await act(async () => root.render(React.createElement(ComposerPrimaryAction, { ...props, status: 'loading', submissionPending: false })));
        const waitingForWorker = document.querySelector('button');
        assert.equal(document.querySelector('[aria-label="realtime voice"]'), null);
        assert.equal(waitingForWorker.disabled, true);
        assert.equal(waitingForWorker.getAttribute('aria-busy'), 'true');
        assert.ok(waitingForWorker.querySelector('.animate-spin'), 'server loading remains visible after the local admission is handed off');
        await act(async () => waitingForWorker.click());
        assert.equal(sends, 0);
        assert.equal(voice, 0);
        await act(async () => root.render(React.createElement(ComposerPrimaryAction, props)));
        await act(async () => document.querySelector('[aria-label="realtime voice"]').click());
        assert.equal(voice, 1);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
    }
});


test('conversation freeze blocks composer send, parent admission and delayed synchronization', async () => {
    const page = pageHarness({canMutateConversation: () => false});
    assert.equal((await page.send({messageContent: 'hello'})).success, false);
    assert.deepEqual(page.state.events, []);
    const composer = composerHarness({canMutateConversation: () => false});
    await composer.send();
    assert.deepEqual(composer.state.sends, []);
    const sync = deferred(); let available = true;
    const delayed = composerHarness({canMutateConversation: () => available, waitForWorkspaceSelectionSync: () => sync.promise});
    const send = delayed.send();
    await tick(); available = false; sync.resolve(); await send;
    assert.deepEqual(delayed.state.sends, []);
    assert.equal(delayed.state.content, 'message', 'freezing preserves the unsent draft');
    assert.equal(delayed.state.submitting, false);
});
