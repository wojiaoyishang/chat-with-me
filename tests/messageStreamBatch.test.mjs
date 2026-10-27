import test from 'node:test';
import assert from 'node:assert/strict';
import { applyMessageStreamOperations, createMessageStreamBatch } from '../src/features/chat/page/utils/messageStreamBatch.js';
import { reconcileHistorySnapshotWithLiveState } from '../src/features/chat/page/utils/liveMessageReconcile.js';

function fixture() {
    let messages = { a: { content: '', extraInfo: { replace: {} } }, b: { content: 'unrelated' } };
    let commits = 0;
    let nextTimer = 0;
    const timers = new Map();
    const batch = createMessageStreamBatch({
        getMessages: () => messages,
        commit: (next) => { messages = next; commits += 1; },
        schedule: (callback) => { timers.set(++nextTimer, callback); return nextTimer; },
        cancel: (id) => timers.delete(id),
    });
    const enqueue = (event, value, runId = 'run-1') => batch.enqueue({ event, value, runId });
    const tick = () => [...timers.values()].forEach((callback) => callback());
    return { batch, enqueue, tick, timers, get messages() { return messages; }, get commits() { return commits; } };
}

test('a high-rate body and 12 concurrent card streams commit once without losing order or text', () => {
    const f = fixture();
    for (let i = 0; i < 200; i += 1) f.enqueue('message.content.delta', { a: `片段${i}🙂` });
    f.enqueue('message.content.delta', { a: '**注意，' });
    for (let i = 0; i < 12; i += 1) {
        f.enqueue('message.replacement.set', { a: { [`tool-${i}`]: '[toolLog]\n' } });
        f.enqueue('message.replacement.delta', { a: { [`tool-${i}`]: `progress ${i}` } });
    }
    assert.equal(f.commits, 0);
    assert.equal(f.timers.size, 1);
    f.tick();
    assert.equal(f.commits, 1);
    assert.equal(f.timers.size, 0);
    assert.equal(f.messages.a.content, Array.from({ length: 200 }, (_, i) => `片段${i}🙂`).join('') + '**注意，');
    for (let i = 0; i < 12; i += 1) assert.equal(f.messages.a.extraInfo.replace[`tool-${i}`], `[toolLog]\nprogress ${i}`);
    assert.equal(f.messages.b.content, 'unrelated');
});

test('sets, deltas, terminal states and explicit barriers keep receive order', () => {
    const f = fixture();
    f.enqueue('message.content.delta', { a: 'old' });
    f.enqueue('message.content.set', { a: 'reset' });
    assert.equal(f.messages.a.content, 'reset');
    f.enqueue('message.replacement.set', { a: { tool: 'old' } });
    f.enqueue('message.replacement.delta', { a: { tool: '+delta' } });
    f.enqueue('message.replacement.set', { a: { tool: 'new' } });
    f.enqueue('message.replacement.delta', { a: { tool: '+last' } });
    f.enqueue('message.content.delta', { a: '+tail' });
    f.enqueue('message.replacement.delta', { a: { tool: '\n[DONE]' } });
    assert.equal(f.messages.a.content, 'reset+tail');
    assert.equal(f.messages.a.extraInfo.replace.tool, 'new+last\n[DONE]');
    f.enqueue('message.content.delta', { a: '+last received before cancellation' });
    f.batch.flush();
    assert.ok(f.messages.a.content.endsWith('cancellation'));
    assert.equal(f.timers.size, 0);
    const commits = f.commits;
    f.batch.flush();
    assert.equal(f.commits, commits);
});

test('run transitions flush independently and missing messages cannot be resurrected', () => {
    const f = fixture();
    f.enqueue('message.content.delta', { a: 'one' });
    f.enqueue('message.content.delta', { a: 'two' }, 'run-2');
    assert.equal(f.messages.a.content, 'one');
    f.batch.flush();
    assert.equal(f.messages.a.content, 'onetwo');
    assert.deepEqual(applyMessageStreamOperations({}, [{ event: 'message.content.delta', value: { old: 'stale' } }]), {});
});

test('long bursts have a bounded pending operation count and preserve all content', () => {
    const f = fixture();
    for (let i = 0; i < 2000; i += 1) f.enqueue('message.content.delta', { a: 'x' });
    f.batch.flush();
    assert.equal(f.messages.a.content, 'x'.repeat(2000));
    assert.equal(f.commits, 8);
});

test('flushing before a durable snapshot prevents replaying a prefix twice', () => {
    let messages = { a: { content: 'start', extraInfo: { replace: {} } } };
    const batch = createMessageStreamBatch({ getMessages: () => messages, commit: (next) => { messages = next; } });
    batch.enqueue({ event: 'message.content.delta', value: { a: '+received' } });
    batch.flush();
    messages = reconcileHistorySnapshotWithLiveState({
        snapshotMessages: { a: { content: 'start+received' } }, snapshotOrder: ['a'],
        currentMessages: messages, currentOrder: ['a'], liveMessageIds: new Set(['a']),
    }).messages;
    batch.flush();
    assert.equal(messages.a.content, 'start+received');
});
