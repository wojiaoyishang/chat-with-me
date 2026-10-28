import {decodeFrame, encodeEventFrame, encodeMediaFrame, FrameKind} from '../protocol/frame.js';

const DEFAULT_CONNECT_TIMEOUT_MS = 15000;

export class WebSocketTransport {
    constructor(url, handlers = {}) {
        this.url = url;
        this.handlers = handlers;
        this.socket = null;
        this.connectPromise = null;
        this.cancelConnect = null;
        this.connectionId = null;
    }

    setHandlers(handlers = {}) {
        this.handlers = handlers;
        return this;
    }

    get isOpen() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect({timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS} = {}) {
        if (this.isOpen) return Promise.resolve(this);
        if (this.connectPromise) return this.connectPromise;
        const connecting = new Promise((resolve, reject) => {
            const socket = new WebSocket(this.url);
            socket.binaryType = 'arraybuffer';
            this.socket = socket;
            let settled = false;
            const isCurrent = () => this.socket === socket;
            const finish = (error) => {
                if (settled) return false;
                settled = true;
                globalThis.clearTimeout(timer);
                if (this.cancelConnect === cancel) this.cancelConnect = null;
                if (error) reject(error); else resolve(this);
                return true;
            };
            const cancel = (error) => finish(error);
            this.cancelConnect = cancel;
            // Browser TCP/TLS timeouts can take minutes. Release the pending
            // attempt so the owner can retry even without an onclose callback.
            const timer = globalThis.setTimeout(() => {
                if (finish(new Error('WebSocket connection timed out'))) socket.close(4000, 'Connection timeout');
            }, Math.max(1, Number(timeoutMs) || DEFAULT_CONNECT_TIMEOUT_MS));

            socket.onopen = (event) => {
                if (!isCurrent() || !finish()) {
                    socket.close(1000, 'Superseded connection');
                    return;
                }
                this.handlers.onOpen?.(event, this);
            };
            socket.onmessage = async (event) => {
                if (!isCurrent()) return;
                try {
                    const data = event.data instanceof Blob ? await event.data.arrayBuffer() : event.data;
                    if (!isCurrent()) return;
                    const frame = decodeFrame(data);
                    if (frame.kind === FrameKind.EVENT) this.handlers.onEvent?.(frame.header, frame);
                    else if (frame.kind === FrameKind.MEDIA) this.handlers.onMedia?.(frame.header, frame.body, frame);
                    else this.handlers.onBinary?.(frame.header, frame.body, frame);
                } catch (error) {
                    if (isCurrent()) this.handlers.onProtocolError?.(error, event);
                }
            };
            socket.onerror = (event) => {
                if (!isCurrent()) return;
                finish(new Error('WebSocket connection failed'));
                this.handlers.onError?.(event, this);
            };
            socket.onclose = (event) => {
                if (!isCurrent()) return;
                this.socket = null;
                finish(new Error(`WebSocket closed during connection (${event.code}${event.reason ? `: ${event.reason}` : ''})`));
                this.handlers.onClose?.(event, this);
            };
        });
        const attempt = connecting.finally(() => {
            if (this.connectPromise === attempt) this.connectPromise = null;
        });
        this.connectPromise = attempt;
        return attempt;
    }

    close(code = 1000, reason = 'Client closed') {
        this.cancelConnect?.(new Error(reason));
        this.socket?.close(code, reason);
    }

    sendEvent(envelope) {
        if (!this.isOpen) throw new Error('Realtime transport is not connected');
        this.socket.send(encodeEventFrame(envelope));
    }

    sendMedia(header, body) {
        if (!this.isOpen) throw new Error('Realtime transport is not connected');
        this.socket.send(encodeMediaFrame(header, body));
    }
}
