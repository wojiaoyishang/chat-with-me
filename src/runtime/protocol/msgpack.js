/**
 * Small MessagePack codec used by CWM Protocol v1.
 *
 * It intentionally supports only the data types allowed in protocol envelopes:
 * null, booleans, finite numbers, strings, byte arrays, arrays and plain maps.
 */
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

class Writer {
    constructor() {
        this.parts = [];
        this.length = 0;
    }

    push(bytes) {
        const value = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        this.parts.push(value);
        this.length += value.byteLength;
    }

    byte(value) {
        this.push(Uint8Array.of(value & 0xff));
    }

    number(size, setter, value) {
        const buffer = new ArrayBuffer(size);
        const view = new DataView(buffer);
        view[setter](0, value, false);
        this.push(new Uint8Array(buffer));
    }

    finish() {
        const output = new Uint8Array(this.length);
        let offset = 0;
        for (const part of this.parts) {
            output.set(part, offset);
            offset += part.byteLength;
        }
        return output;
    }
}

const writeLength = (writer, length, fixBase, fixLimit, code8, code16, code32) => {
    if (length <= fixLimit) {
        writer.byte(fixBase | length);
    } else if (code8 !== null && length <= 0xff) {
        writer.byte(code8);
        writer.number(1, 'setUint8', length);
    } else if (length <= 0xffff) {
        writer.byte(code16);
        writer.number(2, 'setUint16', length);
    } else {
        writer.byte(code32);
        writer.number(4, 'setUint32', length);
    }
};

const encodeValue = (writer, value) => {
    if (value === null || value === undefined) {
        writer.byte(0xc0);
        return;
    }
    if (value === false) {
        writer.byte(0xc2);
        return;
    }
    if (value === true) {
        writer.byte(0xc3);
        return;
    }
    if (typeof value === 'number') {
        if (!Number.isFinite(value)) throw new TypeError('MessagePack only accepts finite numbers');
        if (!Number.isInteger(value)) {
            writer.byte(0xcb);
            writer.number(8, 'setFloat64', value);
            return;
        }
        if (!Number.isSafeInteger(value)) throw new RangeError('Integer exceeds JavaScript safe range');
        if (value >= 0) {
            if (value <= 0x7f) writer.byte(value);
            else if (value <= 0xff) { writer.byte(0xcc); writer.number(1, 'setUint8', value); }
            else if (value <= 0xffff) { writer.byte(0xcd); writer.number(2, 'setUint16', value); }
            else if (value <= 0xffffffff) { writer.byte(0xce); writer.number(4, 'setUint32', value); }
            else { writer.byte(0xcf); writer.number(8, 'setBigUint64', BigInt(value)); }
        } else if (value >= -32) writer.byte(0x100 + value);
        else if (value >= -0x80) { writer.byte(0xd0); writer.number(1, 'setInt8', value); }
        else if (value >= -0x8000) { writer.byte(0xd1); writer.number(2, 'setInt16', value); }
        else if (value >= -0x80000000) { writer.byte(0xd2); writer.number(4, 'setInt32', value); }
        else { writer.byte(0xd3); writer.number(8, 'setBigInt64', BigInt(value)); }
        return;
    }
    if (typeof value === 'string') {
        const bytes = textEncoder.encode(value);
        writeLength(writer, bytes.byteLength, 0xa0, 31, 0xd9, 0xda, 0xdb);
        writer.push(bytes);
        return;
    }
    if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
        const bytes = value instanceof ArrayBuffer
            ? new Uint8Array(value)
            : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        if (bytes.byteLength <= 0xff) { writer.byte(0xc4); writer.number(1, 'setUint8', bytes.byteLength); }
        else if (bytes.byteLength <= 0xffff) { writer.byte(0xc5); writer.number(2, 'setUint16', bytes.byteLength); }
        else { writer.byte(0xc6); writer.number(4, 'setUint32', bytes.byteLength); }
        writer.push(bytes);
        return;
    }
    if (Array.isArray(value)) {
        writeLength(writer, value.length, 0x90, 15, null, 0xdc, 0xdd);
        value.forEach((item) => encodeValue(writer, item));
        return;
    }
    if (typeof value === 'object') {
        const entries = Object.entries(value).filter(([, item]) => item !== undefined);
        writeLength(writer, entries.length, 0x80, 15, null, 0xde, 0xdf);
        for (const [key, item] of entries) {
            encodeValue(writer, key);
            encodeValue(writer, item);
        }
        return;
    }
    throw new TypeError(`Unsupported MessagePack value: ${typeof value}`);
};

export const encodeMessagePack = (value) => {
    const writer = new Writer();
    encodeValue(writer, value);
    return writer.finish();
};

class Reader {
    constructor(input) {
        this.bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
        this.view = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength);
        this.offset = 0;
    }

    ensure(length) {
        if (this.offset + length > this.bytes.byteLength) throw new RangeError('Unexpected end of MessagePack data');
    }

    number(size, getter) {
        this.ensure(size);
        const value = this.view[getter](this.offset, false);
        this.offset += size;
        return value;
    }

    raw(length) {
        this.ensure(length);
        const result = this.bytes.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
    }

    string(length) {
        return textDecoder.decode(this.raw(length));
    }

    array(length) {
        const result = new Array(length);
        for (let index = 0; index < length; index += 1) result[index] = this.value();
        return result;
    }

    map(length) {
        const result = {};
        for (let index = 0; index < length; index += 1) {
            const key = this.value();
            result[String(key)] = this.value();
        }
        return result;
    }

    safeBigInt(value) {
        const number = Number(value);
        if (!Number.isSafeInteger(number)) throw new RangeError('MessagePack integer exceeds JavaScript safe range');
        return number;
    }

    value() {
        const code = this.number(1, 'getUint8');
        if (code <= 0x7f) return code;
        if (code >= 0xe0) return code - 0x100;
        if ((code & 0xe0) === 0xa0) return this.string(code & 0x1f);
        if ((code & 0xf0) === 0x90) return this.array(code & 0x0f);
        if ((code & 0xf0) === 0x80) return this.map(code & 0x0f);
        switch (code) {
            case 0xc0: return null;
            case 0xc2: return false;
            case 0xc3: return true;
            case 0xc4: return this.raw(this.number(1, 'getUint8'));
            case 0xc5: return this.raw(this.number(2, 'getUint16'));
            case 0xc6: return this.raw(this.number(4, 'getUint32'));
            case 0xca: return this.number(4, 'getFloat32');
            case 0xcb: return this.number(8, 'getFloat64');
            case 0xcc: return this.number(1, 'getUint8');
            case 0xcd: return this.number(2, 'getUint16');
            case 0xce: return this.number(4, 'getUint32');
            case 0xcf: return this.safeBigInt(this.number(8, 'getBigUint64'));
            case 0xd0: return this.number(1, 'getInt8');
            case 0xd1: return this.number(2, 'getInt16');
            case 0xd2: return this.number(4, 'getInt32');
            case 0xd3: return this.safeBigInt(this.number(8, 'getBigInt64'));
            case 0xd9: return this.string(this.number(1, 'getUint8'));
            case 0xda: return this.string(this.number(2, 'getUint16'));
            case 0xdb: return this.string(this.number(4, 'getUint32'));
            case 0xdc: return this.array(this.number(2, 'getUint16'));
            case 0xdd: return this.array(this.number(4, 'getUint32'));
            case 0xde: return this.map(this.number(2, 'getUint16'));
            case 0xdf: return this.map(this.number(4, 'getUint32'));
            default: throw new TypeError(`Unsupported MessagePack code: 0x${code.toString(16)}`);
        }
    }
}

export const decodeMessagePack = (input) => {
    const reader = new Reader(input);
    const value = reader.value();
    if (reader.offset !== reader.bytes.byteLength) throw new RangeError('Trailing MessagePack bytes');
    return value;
};
