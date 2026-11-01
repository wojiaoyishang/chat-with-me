import test from 'node:test';
import assert from 'node:assert/strict';
import {createAppendSynchronizer, reconcileAppendedHistory} from '../src/features/chat/page/utils/appendedHistory.js';
import {pendingBodyForwarding, bodyForwardingDetails} from '../src/features/chat/page/utils/bodyForwardingStatus.js';

test('forwarding retry attempts remain visible without counting them as extra messages', () => {
    assert.deepEqual(bodyForwardingDetails({total: 2, retryCount: 3, counts: {accepted: 1, queued: 1}}), [
        {label: '已提交', value: '1 条'}, {label: '待发送', value: '1 条'}, {label: '已重试', value: '3 次'},
    ]);
});

const message = (id, prevMessage = null) => ({id, role: 'assistant', prevMessage, content: id, messages: [], extraInfo: {}});
const snapshot = (branch, page, messages = Object.fromEntries(page.map((id) => [id, message(id)])), more = false) => ({
    branchOrder: branch, messagesOrder: page, appendFrom: page[0], messages, haveMoreAfter: more,
});

test('bot appends preserve mounted media/registry and update only the anchor child pointer', () => {
    const video = {...message('a'), content: '<video src="video.mp4" />', registerComponent: () => {}};
    const anchor = message('b', 'a');
    const result = reconcileAppendedHistory({currentMessages: {a: video, b: anchor},
        currentOrder: ['<PREV_MORE>', 'a', 'b'], snapshot: snapshot(['older', 'a', 'b', 'c'], ['b', 'c'], {
            b: {...message('b', 'a'), messages: ['c'], nextMessage: 'c'}, c: message('c', 'b'),
        })});
    assert.deepEqual(result.order, ['<PREV_MORE>', 'a', 'b', 'c']);
    assert.equal(result.messages.a, video);
    assert.equal(result.messages.b.content, anchor.content);
    assert.deepEqual(result.messages.b.messages, ['c']);
});

test('slower HTTP cannot erase live body, cards, or newer forwarding acknowledgements', () => {
    const current = {...message('b', 'a'), content: '正在回复，正文仍在增长',
        extraInfo: {bodyForwarding: {revision: 8, total: 1, counts: {accepted: 1}},
            replace: {tool: {content: '完整结果'}}}};
    const result = reconcileAppendedHistory({currentMessages: {a: message('a'), b: current},
        currentOrder: ['a', 'b'], liveMessageIds: new Set(['b']),
        snapshot: snapshot(['a', 'b'], ['b'], {b: {...message('b', 'a'), content: '正在回复',
            extraInfo: {bodyForwarding: {revision: 5, total: 1, counts: {queued: 1}}}}})});
    assert.equal(result.messages.b.content, current.content);
    assert.equal(result.messages.b.extraInfo.bodyForwarding.revision, 8);
    assert.ok(result.messages.b.extraInfo.replace.tool);
    assert.equal(pendingBodyForwarding(result.messages, result.order), 0);
});

test('metadata arriving before bot history cannot prevent body and role hydration', () => {
    const forwarding = {revision: 8, total: 1, counts: {sending: 1}};
    const current = {a: message('a'), b: {messages: [], extraInfo: {bodyForwarding: forwarding}}};
    const result = reconcileAppendedHistory({currentMessages: current, currentOrder: ['a'],
        snapshot: snapshot(['a', 'b'], ['a', 'b'], {
            a: {...message('a'), messages: ['b'], nextMessage: 'b'},
            b: {...message('b', 'a'), content: '已经转发的正文也必须在聊天中显示',
                extraInfo: {bodyForwarding: {revision: 7, total: 1, counts: {queued: 1}}}},
        })});
    assert.deepEqual(result.order, ['a', 'b']);
    assert.equal(result.messages.b.role, 'assistant');
    assert.equal(result.messages.b.content, '已经转发的正文也必须在聊天中显示');
    assert.equal(result.messages.b.extraInfo.bodyForwarding, forwarding);
    assert.equal(pendingBodyForwarding(result.messages, result.order), 1);
});

test('a partial object containing early text still receives its missing history fields', () => {
    const current = {a: message('a'), b: {content: '正文完整结尾', extraInfo: {replace: {tool: '[DONE]'}}}};
    const result = reconcileAppendedHistory({currentMessages: current, currentOrder: ['a'],
        snapshot: snapshot(['a', 'b'], ['a', 'b'], {
            a: message('a'), b: {...message('b', 'a'), content: '正文', extraInfo: {replace: {thinking: '分析记录'}}},
        })});
    assert.equal(result.messages.b.content, '正文完整结尾');
    assert.equal(result.messages.b.role, 'assistant');
    assert.equal(result.messages.b.prevMessage, 'a');
    assert.deepEqual(result.messages.b.extraInfo.replace, {thinking: '分析记录', tool: '[DONE]'});
});

test('a live suffix arriving ahead of HTTP survives only with explicit identity and parent continuity', () => {
    const input = {currentMessages: {a: message('a'), b: message('b', 'a'), c: message('c', 'b')},
        currentOrder: ['a', 'b', 'c'], snapshot: snapshot(['a', 'b'], ['b'])};
    assert.equal(reconcileAppendedHistory(input), null);
    assert.deepEqual(reconcileAppendedHistory({...input, liveMessageIds: new Set(['c'])}).order, ['a', 'b', 'c']);
    assert.equal(reconcileAppendedHistory({...input, liveMessageIds: new Set(['c']),
        currentMessages: {...input.currentMessages, c: message('c', 'deleted')}}), null);
});

test('deleted anchors, changed branches, missing bodies, and deleted client tails require authoritative reload', () => {
    const input = {currentMessages: {a: message('a'), b: message('b', 'a')}, currentOrder: ['a', 'b']};
    for (const value of [
        {requiresReload: true}, snapshot(['a', 'other', 'b', 'c'], ['b', 'c']),
        snapshot(['a', 'b', 'c'], ['b', 'c'], {b: message('b')}),
        snapshot(['a'], ['a']), snapshot(['a', 'b', 'c'], ['missing', 'c']),
    ]) assert.equal(reconcileAppendedHistory({...input, snapshot: value}), null);
});

function synchronizer(load) {
    let state = {messages: {a: message('a')}, order: ['a'], ready: true};
    const events = {applied: 0, completed: 0, mismatch: 0, errors: 0};
    const sync = createAppendSynchronizer({read: () => state, load,
        apply: (next) => {state = {...state, ...next}; events.applied++;},
        complete: () => events.completed++, mismatch: () => events.mismatch++, error: () => events.errors++});
    return {sync, events, get state() {return state;}};
}

test('bursty trigger events coalesce and catch up bounded pages without a global reload', async () => {
    let resolve;
    let calls = 0;
    const f = synchronizer(() => ++calls === 1 ? new Promise((done) => {resolve = done;})
        : Promise.resolve(snapshot(['a', 'b', 'c'], ['b', 'c'])));
    const pending = f.sync.request();
    for (let i = 0; i < 12; i++) assert.equal(f.sync.request(), pending);
    resolve(snapshot(['a', 'b', 'c'], ['a', 'b'], undefined, true));
    await pending;
    assert.equal(calls, 2);
    assert.equal(f.events.completed, 1);
    assert.equal(f.events.mismatch, 0);
    assert.deepEqual(f.state.order, ['a', 'b', 'c']);
});

test('invalidating an in-flight append prevents stale content and stale loaded handshakes', async () => {
    let resolve;
    const f = synchronizer(() => new Promise((done) => {resolve = done;}));
    const pending = f.sync.request();
    f.sync.invalidate();
    resolve(snapshot(['a', 'b'], ['a', 'b']));
    await pending;
    assert.equal(f.events.applied, 0);
    assert.equal(f.events.completed, 0);
    assert.deepEqual(f.state.order, ['a']);
});

test('a mutation during the second page does not acknowledge the obsolete first-page chain', async () => {
    let resolve;
    let calls = 0;
    const f = synchronizer(() => ++calls === 1 ? Promise.resolve(snapshot(['a', 'b', 'c'], ['a', 'b'], undefined, true))
        : new Promise((done) => {resolve = done;}));
    const pending = f.sync.request();
    await new Promise(setImmediate);
    f.sync.invalidate();
    resolve(snapshot(['a', 'b', 'c'], ['b', 'c']));
    await pending;
    assert.equal(f.events.applied, 1);
    assert.equal(f.events.completed, 0);
});

test('failed catch-up retains old content and can retry', async () => {
    let fail = true;
    const f = synchronizer(async () => {if (fail) throw new Error('offline'); return snapshot(['a', 'b'], ['a', 'b']);});
    await f.sync.request();
    assert.deepEqual(f.state.order, ['a']);
    assert.equal(f.events.errors, 1);
    fail = false;
    await f.sync.request();
    assert.deepEqual(f.state.order, ['a', 'b']);
});

test('header pending is branch scoped and result tips remain available after all sends settle', () => {
    const accepted = {revision: 9, total: 3, counts: {accepted: 2, failed: 1}, lastError: '连接失败'};
    const messages = {a: {extraInfo: {bodyForwarding: accepted}},
        b: {extraInfo: {bodyForwarding: {total: 2, counts: {queued: 1, sending: 1}}}},
        hidden: {extraInfo: {bodyForwarding: {counts: {queued: 100}}}}};
    assert.equal(pendingBodyForwarding(messages, ['a']), 0);
    assert.equal(pendingBodyForwarding(messages, ['a', 'b', 'b']), 2);
    assert.deepEqual(bodyForwardingDetails(accepted), [
        {label: '已提交', value: '2 条'}, {label: '发送失败', value: '1 条'}, {label: '说明', value: '连接失败'},
    ]);
    assert.deepEqual(bodyForwardingDetails(null), []);
});
