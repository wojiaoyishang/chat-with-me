import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {MAX_MESSAGE_DELTA_CHARACTERS, mergeMessageDeltaValues} from '../src/runtime/protocol/messageDeltas.js';

const tasks = [];
const previousChannel = globalThis.MessageChannel;
globalThis.MessageChannel = class {
    port1 = {onmessage: null};
    port2 = {postMessage: () => tasks.push(() => this.port1.onmessage())};
};
globalThis.__streamScope = {id: 'backend', epoch: 1};
globalThis.__streamSent = [];
let uuid = 0;
globalThis.__streamUUID = () => `local-${++uuid}`;
await build({stdin: {contents: `export {onEvent, dispatchIncomingEvent} from './src/context/useEventStore.jsx';
    export {getIncomingEventSchedulerStats} from './src/runtime/transport/EventDispatchScheduler.js';`, resolveDir: process.cwd()},
    bundle: true, packages: 'external', platform: 'node', format: 'esm', outfile: 'temp/stream-catchup-test.mjs',
    alias: {'@': path.resolve('src')}, plugins: [{name: 'isolated-transport', setup(builder) {
        builder.onResolve({filter: /(?:tools\.jsx|transport\/channel\.js|backend\/connection\.js)$/}, ({path: name}) => ({path: name, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: name}) => ({contents: name.endsWith('tools.jsx')
            ? 'export const generateUUID=()=>globalThis.__streamUUID();'
            : name.endsWith('channel.js') ? 'export const sendRealtimeEvent=(event)=>globalThis.__streamSent.push(event);'
                : 'export const getBackendConnection=()=>({...globalThis.__streamScope}); export const isCurrentConnection=(scope)=>scope.id===globalThis.__streamScope.id && scope.epoch===globalThis.__streamScope.epoch;', loader: 'js'}));
    }}]});
const {onEvent, dispatchIncomingEvent, getIncomingEventSchedulerStats} = await import('../temp/stream-catchup-test.mjs');
globalThis.MessageChannel = previousChannel;
let sequence = 0;
const send = (event, value, extra = {}) => dispatchIncomingEvent({version: 1, event_id: `incoming-${++sequence}`,
    event, conversation_id: 'chat', document_id: null, run_id: 'run', turn_id: 'turn', stream_id: null,
    trace_id: 'trace', timestamp_ms: sequence, sequence, reply_to: null, payload: {value}, ...extra});
const drain = () => {
    let count = 0;
    while (tasks.length && ++count < 1000) tasks.shift()();
    assert.equal(tasks.length, 0);
    assert.equal(getIncomingEventSchedulerStats().pending, 0);
};

test('a queued 10000-delta burst is delivered in batches with every character intact', (t) => {
    const received = [];
    const off = onEvent({event: 'message.*', conversationId: 'chat'}).then((event) => received.push(event));
    t.after(() => {drain(); off();});
    const warn = console.warn;
    console.warn = () => {};
    try {
        for (let index = 0; index < 10000; index++) send('message.content.delta', {answer: `${index}🙂`});
    } finally {console.warn = warn;}
    drain();
    assert.ok(received.length <= 3, `expected a few bounded batches, got ${received.length} callbacks`);
    t.diagnostic(`10000 incoming deltas -> ${received.length} listener callbacks`);
    assert.equal(received.map((event) => event.payload.value.answer).join(''), Array.from({length: 10000}, (_, index) => `${index}🙂`).join(''));
});

test('set, replacement, RPC and run changes stay ordered and separate', (t) => {
    const received = [];
    const off = onEvent({event: 'message.*', conversationId: 'chat'}).then((event) => received.push(event));
    t.after(off);
    send('message.content.delta', {answer: 'a'});
    send('message.content.delta', {answer: 'b'});
    send('message.content.set', {answer: 'reset'});
    send('message.content.delta', {answer: 'c'});
    send('message.replacement.delta', {answer: {tool: 'one'}});
    send('message.replacement.delta', {answer: {tool: '+two'}});
    send('message.replacement.set', {answer: {tool: 'terminal\n[DONE]'}});
    send('message.content.delta', {answer: 'new-run'}, {run_id: 'next-run'});
    send('message.content.delta', {answer: 'rpc-one'}, {payload: {value: {answer: 'rpc-one'}, reply: true}});
    send('message.content.delta', {answer: 'rpc-two'}, {payload: {value: {answer: 'rpc-two'}, reply: true}});
    drain();
    assert.deepEqual(received.map((event) => event.payload.value), [{answer: 'ab'}, {answer: 'reset'}, {answer: 'c'},
        {answer: {tool: 'one+two'}}, {answer: {tool: 'terminal\n[DONE]'}}, {answer: 'new-run'}, {answer: 'rpc-one'}, {answer: 'rpc-two'}]);
});

test('listener remounts and backend switches cannot lose or cross-deliver accumulated text', (t) => {
    const old = [];
    const current = [];
    const off = onEvent({event: 'message.*', conversationId: 'chat'}).then((event) => old.push(event));
    send('message.content.delta', {answer: 'before'});
    off();
    const nextOff = onEvent({event: 'message.*', conversationId: 'chat'}).then((event) => current.push(event));
    t.after(nextOff);
    send('message.content.delta', {answer: '+after'});
    drain();
    assert.equal(old.length, 0);
    assert.equal(current[0].payload.value.answer, 'before+after');
    send('message.content.delta', {answer: 'old-backend'});
    globalThis.__streamScope = {id: 'backend', epoch: 2};
    send('message.content.delta', {answer: 'current-backend'});
    drain();
    assert.equal(current.at(-1).payload.value.answer, 'current-backend');
    assert.equal(current.length, 2);
});

test('control, speech and conversation boundaries prevent coalescing and remain responsive', (t) => {
    const received = [];
    const off = onEvent({event: ['message.*', 'turn.*', 'speech.*']}).then((event) => received.push(event));
    t.after(off);
    send('message.content.delta', {answer: 'a'});
    send('turn.cancelled', {});
    send('message.content.delta', {answer: 'b'});
    send('speech.segment.received', {text: 'audio'});
    send('message.content.delta', {answer: 'c'});
    send('message.content.delta', {answer: 'other-conversation'}, {conversation_id: 'other'});
    drain();
    assert.equal(received[0].event, 'turn.cancelled', 'control work is not trapped behind the text backlog');
    assert.deepEqual(received.filter((event) => event.event === 'message.content.delta').map((event) => event.payload.value.answer),
        ['a', 'b', 'c', 'other-conversation']);
    assert.equal(received.findIndex((event) => event.event === 'speech.segment.received'), 3);
});

test('delta merging is bounded and refuses typed snapshots without altering markers or Unicode boundaries', () => {
    const fragments = ['{{card', 'Replace id=tool}}', '[DO', 'NE]', '\uD83D', '\uDE42'];
    const merged = fragments.reduce((value, text) => mergeMessageDeltaValues('message.content.delta', value, {answer: text}), {});
    assert.equal(merged.answer, fragments.join(''));
    assert.equal(mergeMessageDeltaValues('message.replacement.delta', {a: {tool: 'x'}}, {a: {tool: {frontend: 'typed'}}}), null);
    assert.equal(mergeMessageDeltaValues('message.content.set', {a: 'x'}, {a: 'y'}), null);
    assert.equal(mergeMessageDeltaValues('message.content.delta', {a: 'x'.repeat(MAX_MESSAGE_DELTA_CHARACTERS)}, {a: 'y'}), null);
    const targets = Object.fromEntries(Array.from({length: 257}, (_, index) => [`m${index}`, '']));
    assert.equal(mergeMessageDeltaValues('message.content.delta', {}, targets), null);
    const unusualId = mergeMessageDeltaValues('message.content.delta', {}, JSON.parse('{"__proto__":"safe"}'));
    assert.equal(Object.hasOwn(unusualId, '__proto__'), true);
    assert.equal(unusualId.__proto__, 'safe');
    assert.equal(Object.getPrototypeOf(unusualId), Object.prototype);
});
