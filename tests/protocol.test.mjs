import assert from 'node:assert/strict';
import test from 'node:test';

import {
    decodeFrame,
    encodeEventFrame,
    encodeMediaFrame,
    FrameKind,
} from '../src/runtime/protocol/frame.js';
import {decodeMessagePack, encodeMessagePack} from '../src/runtime/protocol/msgpack.js';

const UUIDS = {
    event: '00000000-0000-4000-8000-000000000001',
    trace: '00000000-0000-4000-8000-000000000002',
    conversation: '00000000-0000-4000-8000-000000000003',
    turn: '00000000-0000-4000-8000-000000000004',
    run: '00000000-0000-4000-8000-000000000005',
    stream: '00000000-0000-4000-8000-000000000006',
};

const eventEnvelope = () => ({
    version: 1,
    event_id: UUIDS.event,
    event: 'turn.started',
    conversation_id: UUIDS.conversation,
    document_id: null,
    turn_id: UUIDS.turn,
    run_id: UUIDS.run,
    stream_id: null,
    trace_id: UUIDS.trace,
    timestamp_ms: 1_787_300_000_123,
    sequence: 7,
    reply_to: null,
    payload: {text: '你好', enabled: true, nested: [1, '二', null]},
});

test('MessagePack preserves protocol payload values', () => {
    const value = {text: '中文', bytes: new Uint8Array([1, 2, 255]), list: [true, null, 3.5]};
    const restored = decodeMessagePack(encodeMessagePack(value));
    assert.equal(restored.text, value.text);
    assert.deepEqual([...restored.bytes], [1, 2, 255]);
    assert.deepEqual(restored.list, value.list);
});

test('event frame round-trips without a body', () => {
    const frame = decodeFrame(encodeEventFrame(eventEnvelope()));
    assert.equal(frame.kind, FrameKind.EVENT);
    assert.equal(frame.header.event, 'turn.started');
    assert.equal(frame.header.payload.text, '你好');
    assert.equal(frame.body.byteLength, 0);
});

test('media frame keeps raw bytes outside MessagePack', () => {
    const header = {
        ...eventEnvelope(),
        event: 'speech.audio.chunk',
        stream_id: UUIDS.stream,
        codec: 'pcm',
        sample_rate: 24_000,
        channels: 1,
        metadata: {segmentIndex: 0},
    };
    delete header.payload;
    const raw = new Uint8Array([0, 1, 2, 253, 254, 255]);
    const frame = decodeFrame(encodeMediaFrame(header, raw));
    assert.equal(frame.kind, FrameKind.MEDIA);
    assert.deepEqual([...frame.body], [...raw]);
    assert.equal(frame.header.metadata.segmentIndex, 0);
});

test('event envelope rejects legacy transport fields', () => {
    assert.throws(
        () => encodeEventFrame({...eventEnvelope(), target: 'ChatPage'}),
        /Unexpected event envelope fields/,
    );
});

test('decoder rejects invalid frame magic', () => {
    const bytes = new Uint8Array(encodeEventFrame(eventEnvelope()));
    bytes[0] = 0;
    assert.throws(() => decodeFrame(bytes), /Invalid CWM frame magic/);
});
