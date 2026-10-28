import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WebSocketTransport } from '../src/runtime/transport/WebSocketTransport.js';
import { encodeEventFrame } from '../src/runtime/protocol/frame.js';

class BrowserSocket {
    static OPEN = 1;
    static instances = [];
    constructor(url) { this.url = url; this.readyState = 0; BrowserSocket.instances.push(this); }
    open() { this.readyState = 1; this.onopen?.({}); }
    end(code = 1006) { this.readyState = 3; this.onclose?.({ code, reason: '' }); }
    close(code, reason) { this.readyState = 2; this.closeRequest = { code, reason }; }
    send(data) { this.sent = data; }
}

function install(t) {
    const original = globalThis.WebSocket;
    BrowserSocket.instances = [];
    globalThis.WebSocket = BrowserSocket;
    t.after(() => { globalThis.WebSocket = original; });
    return () => BrowserSocket.instances.at(-1);
}

test('a black-holed handshake times out and releases the pending attempt for recovery', async t => {
    const latest = install(t);
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const transport = new WebSocketTransport('ws://test');
    const first = transport.connect();
    assert.equal(transport.connect(), first);
    const rejected = assert.rejects(first, /timed out/);
    t.mock.timers.tick(15000); await rejected;
    assert.equal(latest().closeRequest.code, 4000);
    const second = transport.connect(); latest().open();
    assert.equal(await second, transport);
    assert.equal(transport.isOpen, true);
    transport.close();
});

test('an old socket close cannot erase a newer socket after a handshake failure', async t => {
    const latest = install(t), closes = [];
    const transport = new WebSocketTransport('ws://test', { onClose: event => closes.push(event) });
    const first = transport.connect(), old = latest();
    const rejected = assert.rejects(first, /connection failed/);
    old.onerror({}); await rejected;
    const second = transport.connect(), current = latest(); current.open(); await second;
    old.end();
    assert.equal(transport.socket, current);
    assert.equal(transport.isOpen, true);
    assert.equal(closes.length, 0);
    current.end(1012);
    assert.equal(closes.length, 1);
    assert.equal(transport.socket, null);
});

test('explicitly closing a connecting socket settles its promise even without a close event', async t => {
    const latest = install(t), opened = [];
    const transport = new WebSocketTransport('ws://test', { onOpen: () => opened.push(true) });
    const pending = transport.connect(), old = latest();
    const rejected = assert.rejects(pending, /Provider unmounted/);
    transport.close(1000, 'Provider unmounted'); await rejected;
    old.open();
    assert.equal(opened.length, 0);
    assert.equal(old.closeRequest.reason, 'Superseded connection');
});

test('a deferred Blob from a retired socket cannot dispatch into the new connection', async t => {
    const latest = install(t), events = [];
    const transport = new WebSocketTransport('ws://test', { onEvent: event => events.push(event) });
    const first = transport.connect(), old = latest(); old.open(); await first;
    let release;
    class DeferredBlob extends Blob {
        arrayBuffer() { return new Promise(resolve => { release = resolve; }); }
    }
    const pendingMessage = old.onmessage({ data: new DeferredBlob() });
    old.end();
    const second = transport.connect(); latest().open(); await second;
    release(new ArrayBuffer(1)); await pendingMessage;
    assert.equal(events.length, 0);
    const frame = encodeEventFrame({ version: 1, event: 'transport.connected',
        event_id: crypto.randomUUID(), trace_id: crypto.randomUUID(), timestamp_ms: 1,
        sequence: 0, payload: { connectionId: 'fresh' } });
    await latest().onmessage({ data: frame });
    assert.equal(events[0].payload.connectionId, 'fresh');
    transport.close();
});
