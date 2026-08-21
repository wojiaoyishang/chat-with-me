import {decodeMessagePack, encodeMessagePack} from './msgpack.js';

export const PROTOCOL_VERSION = 1;
export const FrameKind = Object.freeze({EVENT: 1, MEDIA: 2, BINARY: 3});
const MAGIC = Uint8Array.of(0x43, 0x57, 0x4d); // CWM
const FIXED_HEADER_BYTES = 13;
const MAX_HEADER_BYTES = 1024 * 1024;
const MAX_BODY_BYTES = 128 * 1024 * 1024;
const EVENT_NAME_PATTERN = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9_-]*)+$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const OPTIONAL_IDENTIFIERS = [
    'conversation_id', 'document_id', 'turn_id', 'run_id', 'stream_id', 'reply_to',
];

const asBytes = (value) => {
    if (!value) return new Uint8Array();
    if (value instanceof Uint8Array) return value;
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    throw new TypeError('Binary payload must be an ArrayBuffer or typed array');
};

const assertObject = (value, label) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${label} must be a map`);
    }
};

const assertIdentifier = (value, field, required = false) => {
    if (value === null || value === undefined || value === '') {
        if (required) throw new TypeError(`${field} is required`);
        return;
    }
    if (typeof value !== 'string' || !UUID_PATTERN.test(value)) {
        throw new TypeError(`${field} must be a canonical UUID`);
    }
};

const assertCommonEnvelope = (envelope) => {
    assertObject(envelope, 'envelope');
    if (envelope.version !== PROTOCOL_VERSION) {
        throw new TypeError(`Unsupported protocol version: ${envelope.version}`);
    }
    if (typeof envelope.event !== 'string' || envelope.event !== envelope.event.trim() || !EVENT_NAME_PATTERN.test(envelope.event)) {
        throw new TypeError(`Invalid semantic event name: ${envelope.event}`);
    }
    assertIdentifier(envelope.event_id, 'event_id', true);
    assertIdentifier(envelope.trace_id, 'trace_id', true);
    for (const field of OPTIONAL_IDENTIFIERS) assertIdentifier(envelope[field], field, false);
    if (!Number.isInteger(envelope.sequence) || envelope.sequence < 0) {
        throw new TypeError('sequence must be a non-negative integer');
    }
    if (envelope.timestamp_ms !== null && envelope.timestamp_ms !== undefined) {
        if (!Number.isSafeInteger(envelope.timestamp_ms) || envelope.timestamp_ms < 0) {
            throw new TypeError('timestamp_ms must be a non-negative safe integer');
        }
    }
};

export const validateEventEnvelope = (envelope) => {
    assertCommonEnvelope(envelope);
    const allowed = new Set([
        'version', 'event_id', 'event', 'conversation_id', 'document_id',
        'turn_id', 'run_id', 'stream_id', 'trace_id', 'timestamp_ms',
        'sequence', 'reply_to', 'payload',
    ]);
    const extra = Object.keys(envelope).filter((key) => !allowed.has(key));
    if (extra.length) throw new TypeError(`Unexpected event envelope fields: ${extra.join(', ')}`);
    assertObject(envelope.payload, 'event payload');
    return envelope;
};

export const validateMediaEnvelope = (envelope) => {
    assertCommonEnvelope(envelope);
    assertIdentifier(envelope.stream_id, 'stream_id', true);
    if (typeof envelope.codec !== 'string' || !envelope.codec.trim()) {
        throw new TypeError('media codec is required');
    }
    if (envelope.sample_rate !== null && envelope.sample_rate !== undefined && (!Number.isInteger(envelope.sample_rate) || envelope.sample_rate <= 0)) {
        throw new TypeError('sample_rate must be a positive integer');
    }
    if (envelope.channels !== null && envelope.channels !== undefined && (!Number.isInteger(envelope.channels) || envelope.channels <= 0)) {
        throw new TypeError('channels must be a positive integer');
    }
    assertObject(envelope.metadata || {}, 'media metadata');
    return envelope;
};

const encodeFrame = (kind, header, body = null) => {
    const headerBytes = encodeMessagePack(header);
    const bodyBytes = asBytes(body);
    if (headerBytes.byteLength > MAX_HEADER_BYTES) throw new RangeError('Frame header exceeds protocol limit');
    if (bodyBytes.byteLength > MAX_BODY_BYTES) throw new RangeError('Frame body exceeds protocol limit');

    const output = new Uint8Array(FIXED_HEADER_BYTES + headerBytes.byteLength + bodyBytes.byteLength);
    output.set(MAGIC, 0);
    const view = new DataView(output.buffer);
    view.setUint8(3, PROTOCOL_VERSION);
    view.setUint8(4, kind);
    view.setUint32(5, headerBytes.byteLength, false);
    view.setUint32(9, bodyBytes.byteLength, false);
    output.set(headerBytes, FIXED_HEADER_BYTES);
    output.set(bodyBytes, FIXED_HEADER_BYTES + headerBytes.byteLength);
    return output.buffer;
};

export const encodeEventFrame = (envelope) => encodeFrame(FrameKind.EVENT, validateEventEnvelope(envelope));
export const encodeMediaFrame = (envelope, body) => encodeFrame(FrameKind.MEDIA, validateMediaEnvelope(envelope), body);

export const decodeFrame = (input) => {
    const bytes = asBytes(input);
    if (bytes.byteLength < FIXED_HEADER_BYTES) throw new RangeError('Frame is shorter than the fixed header');
    if (bytes[0] !== MAGIC[0] || bytes[1] !== MAGIC[1] || bytes[2] !== MAGIC[2]) {
        throw new TypeError('Invalid CWM frame magic');
    }
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const version = view.getUint8(3);
    if (version !== PROTOCOL_VERSION) throw new TypeError(`Unsupported protocol version: ${version}`);
    const kind = view.getUint8(4);
    if (![FrameKind.EVENT, FrameKind.MEDIA, FrameKind.BINARY].includes(kind)) {
        throw new TypeError(`Unsupported frame kind: ${kind}`);
    }
    const headerLength = view.getUint32(5, false);
    const bodyLength = view.getUint32(9, false);
    if (headerLength > MAX_HEADER_BYTES || bodyLength > MAX_BODY_BYTES) throw new RangeError('Frame exceeds protocol limits');
    const expected = FIXED_HEADER_BYTES + headerLength + bodyLength;
    if (bytes.byteLength !== expected) throw new RangeError(`Frame length mismatch: expected ${expected}, got ${bytes.byteLength}`);
    const header = decodeMessagePack(bytes.slice(FIXED_HEADER_BYTES, FIXED_HEADER_BYTES + headerLength));
    const body = bytes.slice(FIXED_HEADER_BYTES + headerLength);
    if (kind === FrameKind.EVENT) {
        validateEventEnvelope(header);
        if (body.byteLength) throw new TypeError('Event frames must not include a raw body');
    } else if (kind === FrameKind.MEDIA) {
        validateMediaEnvelope(header);
    } else {
        assertObject(header, 'binary frame header');
    }
    return {kind, header, body};
};
