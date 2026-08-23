import {REALTIME_VOICE_WEBSOCKET_URL} from '@/config.js';
import {generateUUID} from '@/lib/tools.jsx';
import {WebSocketTransport} from '@/runtime/transport/WebSocketTransport.js';

const nowMs = () => Date.now();
const DEFAULT_CONNECT_TIMEOUT_MS = 8000;

const withMediaTicket = (url, ticket) => {
    if (!ticket) throw new Error('Realtime voice media ticket is required');
    const separator = String(url).includes('?') ? '&' : '?';
    return `${url}${separator}ticket=${encodeURIComponent(ticket)}`;
};

const timeoutError = (label, timeoutMs) => {
    const error = new Error(`${label} timed out after ${timeoutMs}ms`);
    error.code = 'REALTIME_VOICE_TIMEOUT';
    return error;
};

export class RealtimeVoiceTransport {
    constructor({url = REALTIME_VOICE_WEBSOCKET_URL, ticket, onEvent, onMedia, onClose, onError} = {}) {
        this.sequence = 0;
        this.waiters = new Map();
        this.onEvent = onEvent;
        this.ready = false;
        this.readyWaiters = new Set();
        this.transport = new WebSocketTransport(withMediaTicket(url, ticket), {
            onEvent: (event) => this.#handleEvent(event),
            onMedia,
            onClose: (event) => {
                const reason = String(event?.reason || '').trim();
                const error = new Error(reason || `Realtime voice transport closed (${event.code})`);
                this.#rejectReady(error);
                this.#rejectAll(error);
                onClose?.(event);
            },
            onError,
            onProtocolError: (error) => onError?.(error),
        });
    }

    get isOpen() {
        return this.transport.isOpen;
    }

    async connect({timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS} = {}) {
        let timer = null;
        try {
            const readyPromise = this.#waitUntilReady();
            await Promise.race([
                (async () => {
                    await this.transport.connect();
                    await readyPromise;
                })(),
                new Promise((_, reject) => {
                    timer = globalThis.setTimeout(
                        () => reject(timeoutError('Realtime voice WebSocket authorization', timeoutMs)),
                        timeoutMs,
                    );
                }),
            ]);
            return this;
        } catch (error) {
            const isTimeout = error?.code === 'REALTIME_VOICE_TIMEOUT';
            this.close(isTimeout ? 4000 : 4001, isTimeout
                ? 'Realtime voice connection timeout'
                : 'Realtime voice connection failed');
            throw error;
        } finally {
            if (timer !== null) globalThis.clearTimeout(timer);
        }
    }

    close(code = 1000, reason = 'Voice session closed') {
        this.#rejectAll(new Error(reason));
        try {
            this.transport.close(code, reason);
        } catch {
            // Some browsers throw if close() races a CONNECTING socket. Pending
            // waiters are already rejected, so the late socket event is harmless.
        }
    }

    request({event, payload = {}, conversationId = null, turnId = null, streamId = null, timeoutMs = 12000}) {
        const envelope = this.#eventEnvelope({event, payload, conversationId, turnId, streamId});
        return new Promise((resolve, reject) => {
            const timeout = globalThis.setTimeout(() => {
                this.waiters.delete(envelope.event_id);
                reject(timeoutError(`Realtime voice request ${event}`, timeoutMs));
            }, timeoutMs);
            this.waiters.set(envelope.event_id, {resolve, reject, timeout});
            try {
                this.transport.sendEvent(envelope);
            } catch (error) {
                globalThis.clearTimeout(timeout);
                this.waiters.delete(envelope.event_id);
                reject(error);
            }
        });
    }

    sendEvent({event, payload = {}, conversationId = null, turnId = null, streamId = null}) {
        const envelope = this.#eventEnvelope({event, payload, conversationId, turnId, streamId});
        this.transport.sendEvent(envelope);
        return envelope;
    }

    sendAudio({conversationId, streamId, pcm, durationMs = null, timestampMs = null}) {
        const header = {
            version: 1,
            event_id: generateUUID(),
            event: 'voice.input.audio',
            conversation_id: conversationId,
            document_id: null,
            turn_id: null,
            run_id: null,
            stream_id: streamId,
            trace_id: generateUUID(),
            timestamp_ms: timestampMs ?? nowMs(),
            sequence: this.sequence++,
            reply_to: null,
            codec: 'pcm16',
            sample_rate: 16000,
            channels: 1,
            metadata: durationMs == null ? {} : {durationMs},
        };
        this.transport.sendMedia(header, pcm);
    }

    #eventEnvelope({event, payload, conversationId, turnId, streamId}) {
        return {
            version: 1,
            event_id: generateUUID(),
            event,
            conversation_id: conversationId,
            document_id: null,
            turn_id: turnId,
            run_id: null,
            stream_id: streamId,
            trace_id: generateUUID(),
            timestamp_ms: nowMs(),
            sequence: this.sequence++,
            reply_to: null,
            payload,
        };
    }

    #handleEvent(envelope) {
        if (envelope.event === 'transport.connected' && envelope.payload?.channel === 'realtime_voice') {
            this.ready = true;
            for (const waiter of this.readyWaiters) waiter.resolve();
            this.readyWaiters.clear();
        }
        if (envelope.event === 'protocol.error' && !this.ready) {
            const error = new Error(envelope.payload?.message || 'Realtime voice authorization failed');
            this.#rejectReady(error);
        }
        if (envelope.reply_to) {
            const waiter = this.waiters.get(envelope.reply_to);
            if (waiter) {
                globalThis.clearTimeout(waiter.timeout);
                this.waiters.delete(envelope.reply_to);
                if (envelope.event === 'protocol.error' || envelope.payload?.success === false) {
                    waiter.reject(new Error(envelope.payload?.message || envelope.payload?.value || 'Realtime voice request failed'));
                } else {
                    waiter.resolve(envelope);
                }
            }
        }
        this.onEvent?.(envelope);
    }

    #waitUntilReady() {
        if (this.ready) return Promise.resolve();
        return new Promise((resolve, reject) => {
            this.readyWaiters.add({resolve, reject});
        });
    }

    #rejectReady(error) {
        for (const waiter of this.readyWaiters) waiter.reject(error);
        this.readyWaiters.clear();
    }

    #rejectAll(error) {
        for (const waiter of this.waiters.values()) {
            globalThis.clearTimeout(waiter.timeout);
            waiter.reject(error);
        }
        this.waiters.clear();
    }
}
