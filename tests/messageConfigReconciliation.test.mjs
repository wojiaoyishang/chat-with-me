import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {applyMessageConfigUpdate, mergeMessageConfig, mergeMessageContextState} from '../src/features/chat/page/utils/messageConfigUpdates.js';
import {mergeLiveMessageWithSnapshot, reconcileHistorySnapshotWithLiveState} from '../src/features/chat/page/utils/liveMessageReconcile.js';

const protectedBadge = {id: 'context.protected', label: '不可压缩', icon: 'shield-check', tone: 'warning', order: 100};
const config = (compressible, revision, badges = compressible ? [] : [protectedBadge]) => ({compressible, canConfigure: true, revision, badges});

test('configuration responses only change loaded message metadata and restore affected context badges', () => {
    const attachment = {serverId: 'image-one'}, mount = () => {};
    const original = {
        message: {content: '原始正文', attachments: [attachment], registerComponent: mount, messageConfig: config(true, 1), contextState: {compactions: ['summary']}, contextStateRevision: 1},
        affected: {content: '关联正文', contextState: {compactions: ['summary']}, contextStateRevision: 1},
        untouched: {content: '保持不变'},
    };
    const next = applyMessageConfigUpdate(original, {
        messageId: 'message', messageConfig: config(false, 5), contextRevision: 5,
        restoredArtifactIds: ['summary'], affectedMessageIds: ['message', 'affected', 'unloaded'],
        messageStates: {message: {}, affected: {}, unloaded: {}},
    });
    assert.equal(next.message.content, '原始正文');
    assert.equal(next.message.attachments, original.message.attachments);
    assert.equal(next.message.registerComponent, mount);
    assert.deepEqual(next.message.messageConfig, config(false, 5));
    assert.deepEqual(next.message.contextState, {});
    assert.deepEqual(next.affected.contextState, {});
    assert.equal(next.untouched, original.untouched);
    assert.equal(Object.hasOwn(next, 'unloaded'), false, 'a hidden branch is never injected into the visible chat');
    assert.deepEqual(original.message.messageConfig, config(true, 1), 'the old message snapshot is not mutated');
});

test('late HTTP or websocket acknowledgements cannot undo a newer compression choice or restored state', () => {
    const current = {message: {content: '正文', messageConfig: config(false, 12), contextState: {}, contextStateRevision: 12}};
    const next = applyMessageConfigUpdate(current, {
        messageId: 'message', messageConfig: config(true, 9), contextRevision: 9,
        messageStates: {message: {compactions: ['old-summary'], forgotten: true}},
    });
    assert.deepEqual(next.message.messageConfig, config(false, 12));
    assert.deepEqual(next.message.contextState, {});
    assert.equal(next.message.contextStateRevision, 12);
    assert.deepEqual(mergeMessageConfig(config(true, 15), config(false, 10)), config(true, 15), 'a newer explicit unprotect choice is monotonic too');
});

test('a committed restoration clears only its old badges even if the server cannot rebuild context states', () => {
    const messages = {
        message: {messageConfig: config(true, 2), contextState: {compactions: [{artifactId: 'restored'}]}},
        affected: {contextState: {forgotten: true, compactions: [{artifactId: 'restored'}, {artifactId: 'keep'}]}},
    };
    const next = applyMessageConfigUpdate(messages, {
        messageId: 'message', messageConfig: config(false, 3), contextRevision: 3,
        restoredArtifactIds: ['restored'], affectedMessageIds: ['message', 'affected'], messageStates: {},
    });
    assert.deepEqual(next.message.contextState, {});
    assert.deepEqual(next.affected.contextState, {forgotten: true, compactions: [{artifactId: 'keep'}]});
});

test('protected metadata removes stale compaction badges even when a snapshot has no context revision', () => {
    const message = {content: '原文', messageConfig: config(false, 8)};
    const next = mergeMessageContextState(message, {compactions: ['summary'], source: 'history'});
    assert.deepEqual(next.contextState, {source: 'history'});
    assert.equal(next.messageConfig.compressible, false);
    assert.equal(mergeMessageConfig(config(false, 8), {compressible: 'true', revision: 99}).compressible, false);
});

test('the actual ChatPage message.updated handler applies metadata without scrolling or changing message order', () => {
    const source = fs.readFileSync('src/features/chat/ChatPage.jsx', 'utf8');
    const start = source.indexOf("case 'message.updated': {");
    assert.notEqual(start, -1);
    const end = source.indexOf("case 'message.created':", start);
    assert.notEqual(end, -1);
    const handler = new Function('payload', 'messagesRef', 'setMessages', 'applyMessageConfigUpdate', 'reply', 'scrollToBottomAfterRender', 'setMessagesOrder', `switch('message.updated') {${source.slice(start, end)}}`);
    const messagesRef = {current: {message: {content: '正文', messageConfig: config(true, 1)}}};
    const order = ['message'];
    const updates = [], replies = [];
    handler(
        {messageId: 'message', messageConfig: config(false, 2), reply: true},
        messagesRef,
        next => updates.push(next), applyMessageConfigUpdate,
        payload => replies.push(payload),
        () => assert.fail('configuration metadata must not scroll the chat'),
        () => assert.fail('configuration metadata must not change the visible branch order'),
    );
    assert.equal(updates.length, 1);
    assert.equal(updates[0], messagesRef.current);
    assert.equal(messagesRef.current.message.messageConfig.compressible, false);
    assert.deepEqual(order, ['message']);
    assert.deepEqual(replies, [{success: true}]);
});

test('history reconciliation preserves a newer configuration on ordinary non-streaming messages', () => {
    const snapshot = {message: {content: '正文', messageConfig: config(true, 4), contextState: {compactions: ['old-summary']}, contextStateRevision: 4}};
    const current = {message: {content: '正文', messageConfig: config(false, 11), contextState: {}, contextStateRevision: 11}};
    const reconciled = reconcileHistorySnapshotWithLiveState({
        snapshotMessages: snapshot, snapshotOrder: ['message'],
        currentMessages: current, currentOrder: ['message'], liveMessageIds: new Set(),
    });
    assert.deepEqual(reconciled.messages.message.messageConfig, config(false, 11));
    assert.deepEqual(reconciled.messages.message.contextState, {});
    assert.equal(reconciled.messages.message.contextStateRevision, 11);
    assert.deepEqual(reconciled.order, ['message']);
});

test('thin history snapshots retain protection while newer explicit snapshots can allow compression', () => {
    const current = {content: '原文', messageConfig: config(false, 11), contextState: {}, contextStateRevision: 11};
    const thin = reconcileHistorySnapshotWithLiveState({
        snapshotMessages: {message: {content: '原文'}}, snapshotOrder: ['message'],
        currentMessages: {message: current}, currentOrder: ['message'],
    });
    assert.deepEqual(thin.messages.message.messageConfig, config(false, 11));
    const newer = mergeLiveMessageWithSnapshot(
        {content: '原', messageConfig: config(true, 12), contextState: {compactions: ['new-summary']}, contextStateRevision: 12},
        {...current, content: '原文正在继续输出'},
    );
    assert.equal(newer.content, '原文正在继续输出');
    assert.deepEqual(newer.messageConfig, config(true, 12));
    assert.deepEqual(newer.contextState, {compactions: ['new-summary']});
});

test('badge arrays follow metadata revisions, explicit empty lists clear them and thin patches preserve them', () => {
    const first = config(false, 4);
    const thin = mergeMessageConfig(first, {compressible: false, canConfigure: true, revision: 5});
    assert.deepEqual(thin.badges, [protectedBadge]);
    const nextBadges = [{id: 'custom.info', label: '后端动态状态', icon: 'info', tone: 'info', order: 10}];
    const updated = mergeMessageConfig(thin, {badges: nextBadges, revision: 6});
    assert.deepEqual(updated.badges, nextBadges);
    assert.equal(updated.compressible, false);
    assert.notEqual(updated.badges, nextBadges);
    assert.deepEqual(mergeMessageConfig(updated, {badges: [], revision: 5}).badges, nextBadges);
    assert.deepEqual(mergeMessageConfig(updated, {badges: [], revision: 7}).badges, []);
});

test('live and ordinary history reconciliation preserve dynamic badge lists and accept authoritative clearing', () => {
    const badges = [{id: 'custom.dynamic', label: '任意后端标记', icon: 'tag', tone: 'neutral', order: 30}];
    const current = {message: {content: '原文', messageConfig: config(true, 9, badges)}};
    const reconciled = reconcileHistorySnapshotWithLiveState({
        snapshotMessages: {message: {content: '原文', messageConfig: {compressible: true, revision: 9}}},
        snapshotOrder: ['message'], currentMessages: current, currentOrder: ['message'],
    });
    assert.deepEqual(reconciled.messages.message.messageConfig.badges, badges);
    const newer = mergeLiveMessageWithSnapshot({content: '原', messageConfig: config(true, 10, [])}, current.message);
    assert.deepEqual(newer.messageConfig.badges, []);
    assert.equal(newer.content, '原文');
});
