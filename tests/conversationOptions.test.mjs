import test from 'node:test';
import assert from 'node:assert/strict';
import { ConversationOptionsWriter } from '../src/features/chat/page/utils/conversationOptions.js';
import { mergeBodyForwardingStatus } from '../src/features/chat/page/utils/bodyForwardingStatus.js';
import { mergeLiveMessageWithSnapshot } from '../src/features/chat/page/utils/liveMessageReconcile.js';

test('delivery snapshots replace counts and delayed HTTP/WS metadata cannot resurrect pending sends', () => {
    const queued = {revision: 10, counts: {queued: 1}};
    const accepted = {revision: 20, counts: {accepted: 1}};
    assert.deepEqual(mergeBodyForwardingStatus(queued, accepted), accepted);
    assert.deepEqual(mergeBodyForwardingStatus(accepted, queued), accepted);
    const result = mergeLiveMessageWithSnapshot(
        {content: '正文', extraInfo: {bodyForwarding: queued}},
        {content: '正文完毕', extraInfo: {bodyForwarding: accepted, replace: {}}});
    assert.deepEqual(result.extraInfo.bodyForwarding, accepted);
    assert.equal(result.content, '正文完毕');
});

const deferred = () => { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return {promise, resolve, reject}; };

test('saves serialize, preserve defaults, and a WS ack cannot erase a newer draft', async () => {
    const requests = [], values = [];
    const writer = new ConversationOptionsWriter({
        save: (patch) => { const result = deferred(); requests.push({patch, ...result}); return result.promise; },
        onValues: (value) => values.push(value), onError: assert.fail,
    });
    writer.apply({revision: 0, options: {font: 'default', botForwardSeparator: ''}});
    writer.edit({botForwardSeparator: '@'});
    writer.edit({botForwardSeparator: '@@'});
    assert.equal(requests.length, 1);
    writer.apply({revision: 1, options: {botForwardSeparator: '@'}});
    assert.equal(values.at(-1).botForwardSeparator, '@@');
    requests[0].resolve({revision: 1, options: {botForwardSeparator: '@'}});
    await Promise.resolve(); await Promise.resolve();
    assert.equal(requests.length, 2);
    requests[1].resolve({revision: 2, options: {botForwardSeparator: '@@'}});
    await writer.flush();
    writer.apply({revision: 1, options: {botForwardSeparator: '@'}});
    assert.deepEqual(values.at(-1), {font: 'default', botForwardSeparator: '@@'});
});

test('failed saving retains edits for explicit retry and surfaces the failure', async () => {
    const errors = [], calls = [];
    let unavailable = true;
    const writer = new ConversationOptionsWriter({save: async (patch) => {
        calls.push(patch);
        if (unavailable) throw new Error('offline');
        return {revision: 1, options: patch};
    }, onError: (error) => errors.push(error.message), onValues() {}});
    writer.edit({botForwardEnabled: true}, 10000);
    await assert.rejects(writer.flush(), /offline/);
    assert.deepEqual(errors, ['offline']);
    unavailable = false;
    await writer.flush();
    assert.equal(calls.length, 2);
    assert.equal(writer.options.botForwardEnabled, true);
});

test('independent conversations do not share drafts or revisions', async () => {
    const saved = [];
    const make = (id) => new ConversationOptionsWriter({save: async (patch) => {
        saved.push([id, patch]); return {revision: 1, options: patch};
    }, onValues() {}, onError: assert.fail});
    const one = make('one'), two = make('two');
    one.edit({botForwardEnabled: true}, 10000);
    two.edit({reasoningEffort: 'none'}, 10000);
    await Promise.all([one.flush(), two.flush()]);
    assert.deepEqual(saved, [['one', {botForwardEnabled: true}], ['two', {reasoningEffort: 'none'}]]);
    assert.equal(two.options.botForwardEnabled, undefined);
});
