import test from 'node:test';
import assert from 'node:assert/strict';
import {acceptFreezeEvent, createConversationFreezeController, normalizeConversationFreeze} from '../src/features/chat/freeze/conversationFreezeState.js';

const snapshot = (patch = {}) => ({conversationId: 'source', frozen: false, operationId: null, reason: '', expiresAt: null, revision: 0, ...patch});
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return {promise, resolve, reject}; };
const settle = () => new Promise(resolve => setImmediate(resolve));
function setup(t, fetchState, pollMs = 100000) {
    const listeners = new Map(), changes = [];
    const controller = createConversationFreezeController({conversationId: 'source', fetchState, pollMs,
        subscribe: (event, callback) => { listeners.set(event, callback); return () => listeners.delete(event); },
        notify: value => changes.push(value),
    });
    t.after(() => controller.dispose());
    return {controller, changes, emit: value => listeners.get('conversation.freeze.changed')?.({payload: value}), reconnect: () => listeners.get('transport.connected')?.({})};
}

test('freeze snapshots require the correct conversation and a real boolean', () => {
    assert.equal(normalizeConversationFreeze(snapshot(), 'another'), null);
    assert.equal(normalizeConversationFreeze(snapshot({frozen: 'true'}), 'source'), null);
    assert.equal(normalizeConversationFreeze(snapshot({revision: null}), 'source').revision, null);
    assert.equal(normalizeConversationFreeze(snapshot({frozen: true}), 'source').frozen, true);
});

test('slow authoritative fetches are coalesced across polling and reconnect', async t => {
    const pending = deferred(); let calls = 0;
    const ui = setup(t, () => { calls++; return pending.promise; }, 5);
    await new Promise(resolve => setTimeout(resolve, 23));
    ui.reconnect();
    assert.equal(calls, 1);
    pending.resolve(snapshot());
    await settle();
    assert.equal(ui.changes.at(-1).state.frozen, false);
});

test('late unfrozen GET cannot override a newer cross-device freeze event', async t => {
    const pending = deferred();
    const ui = setup(t, () => pending.promise);
    ui.emit(snapshot({frozen: true, operationId: 'fork-A', revision: 3}));
    pending.resolve(snapshot({revision: 1}));
    await settle();
    assert.equal(ui.changes.length, 1);
    assert.equal(ui.changes[0].state.frozen, true);
});

test('a stale release cannot unlock a newer operation, and unrelated events are ignored', async t => {
    let authority = snapshot({frozen: true, operationId: 'fork-B', revision: 9});
    const ui = setup(t, async () => authority);
    await settle();
    ui.emit(snapshot({frozen: false, operationId: 'fork-A', revision: 8}));
    ui.emit(snapshot({conversationId: 'other', frozen: false, revision: 999}));
    await settle();
    assert.equal(ui.changes.at(-1).state.operationId, 'fork-B');
    assert.equal(ui.changes.at(-1).state.frozen, true);
    authority = snapshot({revision: 10});
    ui.reconnect(); await settle();
    assert.equal(ui.changes.at(-1).state.frozen, false);
});

test('lease expiry and a failed refresh never unlock locally; authoritative polling releases', async t => {
    let authority = snapshot({frozen: true, operationId: 'fork', revision: 3, expiresAt: '2000-01-01T00:00:00Z'});
    const ui = setup(t, async () => { if (authority instanceof Error) throw authority; return authority; }, 5);
    await settle();
    authority = new Error('offline');
    await new Promise(resolve => setTimeout(resolve, 15));
    assert.equal(ui.changes.at(-1).state.frozen, true);
    assert.equal(ui.changes.at(-1).error, 'offline');
    authority = snapshot({revision: 4});
    await new Promise(resolve => setTimeout(resolve, 15));
    assert.equal(ui.changes.at(-1).state.frozen, false);
});

test('GET responses also respect monotonic revisions', async t => {
    let authority = snapshot({frozen: true, operationId: 'fork', revision: 6});
    const ui = setup(t, async () => authority);
    await settle();
    authority = snapshot({revision: 4});
    await ui.controller.refresh();
    assert.equal(ui.changes.at(-1).state.frozen, true);
    assert.equal(acceptFreezeEvent(snapshot({revision: 6}), snapshot({revision: 5})), false);
});

test('disposal aborts work and drops late updates', async t => {
    const pending = deferred(); let signal;
    const ui = setup(t, input => { signal = input; return pending.promise; });
    ui.controller.dispose();
    assert.equal(signal.aborted, true);
    pending.resolve(snapshot()); await settle();
    assert.deepEqual(ui.changes, []);
});
