import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildTimelineLanes, callOverlapCounts, inputRelationships, buildCallCoverage } from '../src/features/chat/page/components/inspectorTimelineLayout.js';

test('messages and calls occupy distinct rows on the same event-order axis', () => {
    const events = ['system', 'user', 'assistant', 'model_call', 'tool_result', 'model_call']
        .map((kind, index) => ({ kind, eventId: `event-${index}`, modelCallId: kind === 'model_call' ? `call-${index}` : 'shared' }));
    const [messages, calls] = buildTimelineLanes(events);
    assert.equal(messages.slots.length, calls.slots.length);
    assert.equal(messages.slots[3], null);
    assert.equal(calls.slots[3], events[3]);
    assert.equal(calls.slots[5], events[5]);
    assert.equal(messages.slots[4], events[4]);
    assert.equal(calls.slots[4], null);
    const filtered = buildTimelineLanes([events[3], events[5]]);
    assert.deepEqual(filtered[0].slots, [null, null]);
    assert.equal(filtered[1].slots.length, 2);
});

test('actual time overlap is marked, while touching boundaries and missing dates are not guessed', () => {
    const call = (id, start, end) => ({ modelCallId: id, createdAt: `2026-10-09T00:00:0${start}Z`, completedAt: `2026-10-09T00:00:0${end}Z` });
    const counts = callOverlapCounts([call('a', 0, 2), call('b', 1, 3), call('c', 3, 4), call('zero', 1, 1), { modelCallId: 'missing' }]);
    assert.equal(counts.get('a'), 1);
    assert.equal(counts.get('b'), 1);
    assert.equal(counts.has('c'), false);
    assert.equal(counts.has('zero'), false);
    assert.equal(counts.has('missing'), false);
    const pending = callOverlapCounts([{ ...call('a', 0, 1), completedAt: null, status: 'running' }, call('b', 2, 3)]);
    assert.equal(pending.get('a'), 1);
    assert.equal(pending.get('b'), 1);
});


test('coverage follows actual input, excludes owned output, and separates inherited history', () => {
    const events = [
        { eventId: 'sys', kind: 'system' },
        { eventId: 'gap', kind: 'assistant', modelCallId: 'a' },
        { eventId: 'result', kind: 'tool_result', modelCallId: 'a' },
        { eventId: 'call:a', kind: 'model_call', modelCallId: 'a', sentEventIds: ['sys'] },
        { eventId: 'call:b', kind: 'model_call', modelCallId: 'b', sentEventIds: ['result'], inheritedEventIds: ['sys'] },
    ];
    const relation = inputRelationships(events, events[4]);
    assert.equal(relation.sent.has('gap'), false);
    assert.deepEqual(buildCallCoverage(events, relation), [
        { mode: 'sent', start: 2, end: 3 }, { mode: 'inherited', start: 0, end: 1 },
    ]);
    assert.equal(inputRelationships(events, events[1]).calls.size, 0);
    assert.equal(inputRelationships(events, { kind: 'model_call', modelCallId: 'old' }).sent.size, 0);
});
