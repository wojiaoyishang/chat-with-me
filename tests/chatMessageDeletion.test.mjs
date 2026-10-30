import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {projectMessageDeletion} from '../src/features/chat/page/utils/messageDeletion.js';

const source = fs.readFileSync('src/features/chat/ChatPage.jsx', 'utf8').replace(/\r\n/g, '\n');
const callbackSource = source.slice(source.indexOf('    const submitMessageDeletion = useCallback('),
    source.indexOf('    const switchMessage = useCallback('));
const deferred = () => {
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    return {promise, resolve, reject};
};
const fixture = () => {
    const response = deferred();
    const applying = deferred();
    const state = {deleting: false, dialog: true, pending: 'removed', calls: 0, applied: [], errors: [], summaries: 0, stale: 0};
    const scope = {
        conversationId: 'chat', activeConversationIdRef: {current: 'chat'}, messageDeletionRef: {current: null},
        canMutateConversation: () => true,
        setIsDeletingMessage: (value) => { state.deleting = value; },
        setPendingDeleteMsgId: (value) => { state.pending = value; },
        setShowDeleteConfirm: (value) => { state.dialog = value; },
        apiClient: {delete: () => { state.calls++; return response.promise; }},
        apiEndpoint: {CHAT_MESSAGES_ENDPOINT: '/messages'},
        deleteMessageLocally: async (...args) => { state.applied.push(args); await applying.promise; return true; },
        loadMessageSummaries: async () => { state.summaries++; },
        markRuntimeInspectorStale: () => { state.stale++; },
        toast: {error: (value) => state.errors.push(value)}, t: (key) => key,
    };
    const submit = new Function(...Object.keys(scope),
        `const useCallback = callback => callback;\n${callbackSource}\nreturn submitMessageDeletion;`)(...Object.values(scope));
    return {state, scope, response, applying, submit};
};

test('server branch selection is applied when deleting the first sibling instead of showing an empty tail', () => {
    const messages = {parent: {messages: ['removed', 'kept'], nextMessage: 'removed'},
        removed: {messages: ['descendant'], nextMessage: 'descendant'}, descendant: {},
        kept: {nextMessage: 'stale'}, tail: {nextMessage: 'stale'}, stale: {}};
    const result = projectMessageDeletion(messages, ['<PREV_MORE>', 'parent', 'removed', 'descendant'], 'removed', {
        parentMessageId: 'parent', activeChildMessageId: 'kept', activeOrder: ['root', 'parent', 'kept', 'tail'],
    });
    assert.equal(result.childId, 'kept');
    assert.deepEqual(result.prefix, ['<PREV_MORE>', 'parent']);
    assert.equal(result.messages.parent.nextMessage, 'kept');
    assert.deepEqual(result.messages.parent.messages, ['kept']);
    assert.equal(result.messages.kept.nextMessage, 'tail');
    assert.equal(result.messages.tail.nextMessage, null);
    assert.equal(result.messages.removed, undefined);
    assert.equal(result.messages.descendant, undefined);
    assert.equal(messages.parent.nextMessage, 'removed', 'projection must not mutate the old React snapshot');
});

test('the server can select a different surviving sibling and a terminal deletion has no replacement', () => {
    const messages = {p: {messages: ['a', 'removed', 'b']}, removed: {}, a: {}, b: {}};
    assert.equal(projectMessageDeletion(messages, ['p', 'removed'], 'removed', {
        parentMessageId: 'p', activeChildMessageId: 'b', activeOrder: ['p', 'b'],
    }).childId, 'b');
    const ended = projectMessageDeletion({p: {messages: ['removed']}, removed: {}}, ['p', 'removed'], 'removed', {
        parentMessageId: 'p', activeChildMessageId: null, activeOrder: ['p'],
    });
    assert.equal(ended.childId, null);
    assert.deepEqual(ended.prefix, ['p']);
});

test('invalid deletion snapshots are rejected and a missing visible parent requests a normal reload', () => {
    assert.throws(() => projectMessageDeletion({}, [], 'removed', {}), /分支/);
    assert.throws(() => projectMessageDeletion({}, [], 'removed', {
        parentMessageId: 'p', activeChildMessageId: 'b', activeOrder: ['p', 'a'],
    }), /不一致/);
    assert.throws(() => projectMessageDeletion({}, [], 'removed', {
        parentMessageId: 'p', activeChildMessageId: 'removed', activeOrder: ['p', 'removed'],
    }), /分支/);
    assert.equal(projectMessageDeletion({removed: {}}, ['removed'], 'removed', {
        parentMessageId: 'p', activeChildMessageId: null, activeOrder: ['p'],
    }), null);
});

test('actual delete callback keeps confirmation busy through HTTP and branch hydration and blocks double submission', async () => {
    const ui = fixture();
    const pending = ui.submit('removed', {closeDialog: true});
    assert.equal(ui.state.deleting, true);
    assert.equal(ui.state.dialog, true);
    assert.equal(await ui.submit('removed'), false);
    assert.equal(ui.state.calls, 1);
    const canonical = {parentMessageId: 'p', activeChildMessageId: 'b', activeOrder: ['p', 'b']};
    ui.response.resolve(canonical);
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(ui.state.applied, [['removed', canonical]]);
    assert.equal(ui.state.deleting, true, 'branch loading remains part of the delete operation');
    ui.applying.resolve();
    assert.equal(await pending, true);
    assert.equal(ui.state.deleting, false);
    assert.equal(ui.state.dialog, false);
    assert.equal(ui.state.pending, null);
    assert.equal(ui.state.summaries, 1);
    assert.equal(ui.state.stale, 1);
});

test('a failed delete leaves the visible branch and confirmation intact', async () => {
    const ui = fixture();
    const pending = ui.submit('removed', {closeDialog: true});
    ui.response.reject(new Error('denied'));
    assert.equal(await pending, false);
    assert.equal(ui.state.deleting, false);
    assert.equal(ui.state.dialog, true);
    assert.equal(ui.state.pending, 'removed');
    assert.deepEqual(ui.state.applied, []);
    assert.equal(ui.state.errors.length, 1);
});

test('a late delete response cannot change a new conversation or release its newer operation', async () => {
    const ui = fixture();
    const pending = ui.submit('removed', {closeDialog: true});
    ui.scope.activeConversationIdRef.current = 'other';
    const newerRequest = {conversationId: 'other', msgId: 'newer'};
    ui.scope.messageDeletionRef.current = newerRequest;
    ui.response.resolve({parentMessageId: 'p', activeChildMessageId: null, activeOrder: ['p']});
    assert.equal(await pending, false);
    assert.deepEqual(ui.state.applied, []);
    assert.equal(ui.scope.messageDeletionRef.current, newerRequest);
    assert.equal(ui.state.deleting, true);
    assert.equal(ui.state.dialog, true);
    assert.deepEqual(ui.state.errors, []);
});
