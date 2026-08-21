import {decodeFrame, encodeEventFrame, encodeMediaFrame, FrameKind} from '../protocol/frame.js';

export class WebSocketTransport {
    constructor(url, handlers = {}) {
        this.url = url;
        this.handlers = handlers;
        this.socket = null;
        this.connectPromise = null;
    }

    get isOpen() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect() {
        if (this.isOpen) return Promise.resolve(this);
        if (this.connectPromise) return this.connectPromise;
        this.connectPromise = new Promise((resolve, reject) => {
            const socket = new WebSocket(this.url);
            socket.binaryType = 'arraybuffer';
            this.socket = socket;
            let settled = false;

            socket.onopen = (event) => {
                settled = true;
                this.handlers.onOpen?.(event, this);
                resolve(this);
            };
            socket.onmessage = async (event) => {
                try {
                    const data = event.data instanceof Blob ? await event.data.arrayBuffer() : event.data;
                    const frame = decodeFrame(data);
                    if (frame.kind === FrameKind.EVENT) this.handlers.onEvent?.(frame.header, frame);
                    else if (frame.kind === FrameKind.MEDIA) this.handlers.onMedia?.(frame.header, frame.body, frame);
                    else this.handlers.onBinary?.(frame.header, frame.body, frame);
                } catch (error) {
                    this.handlers.onProtocolError?.(error, event);
                }
            };
            socket.onerror = (event) => {
                this.handlers.onError?.(event, this);
                if (!settled) reject(new Error('WebSocket connection failed'));
            };
            socket.onclose = (event) => {
                this.socket = null;
                this.connectPromise = null;
                this.handlers.onClose?.(event, this);
                if (!settled) reject(new Error(`WebSocket closed during connection (${event.code})`));
            };
        });
        return this.connectPromise;
    }

    close(code = 1000, reason = 'Client closed') {
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
