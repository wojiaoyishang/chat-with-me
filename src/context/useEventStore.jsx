import {create} from 'zustand';

import {generateUUID} from '@/lib/tools.jsx';
import {sendRealtimeEvent} from '@/runtime/transport/channel.js';
import {eventMatchesPattern, normalizeEventName, normalizeEventPattern} from '@/runtime/protocol/events.js';
import {normalizeEventDirections, shouldDeliverEventToListener} from '@/runtime/protocol/subscriptions.js';
import {getIncomingEventSchedulerStats, scheduleIncomingEventCallback} from '@/runtime/transport/EventDispatchScheduler.js';

const listeners = new Map();
const uniqueListeners = new Set();
const replyWaiters = new Map();
const replyBacklog = new Map();
const processedEventIds = [];
const MAX_PROCESSED_IDS = 500;
const DEFAULT_REPLY_TIMEOUT_MS = 10_000;

const debugEnabled = () => typeof DEBUG_MODE !== 'undefined' && Boolean(DEBUG_MODE);

const createEnvelope = ({
    event,
    payload = {},
    conversationId = null,
    documentId = null,
    turnId = null,
    runId = null,
    streamId = null,
    traceId = null,
    replyTo = null,
    eventId = null,
    sequence = 0,
    timestampMs = null,
}) => ({
    version: 1,
    event_id: eventId || generateUUID(),
    event: normalizeEventName(event),
    conversation_id: conversationId || null,
    document_id: documentId || null,
    turn_id: turnId || null,
    run_id: runId || null,
    stream_id: streamId || null,
    trace_id: traceId || generateUUID(),
    timestamp_ms: timestampMs ?? Date.now(),
    sequence: Number.isFinite(Number(sequence)) ? Math.max(0, Number(sequence)) : 0,
    reply_to: replyTo || null,
    payload: payload && typeof payload === 'object' ? payload : {value: payload},
});

const matchesEvent = (patterns, event) => patterns.some((pattern) => eventMatchesPattern(pattern, event));

const logEvent = (direction, envelope) => {
    if (!debugEnabled()) return;
    const style = direction === 'incoming' ? 'color:#079447;font-weight:bold' : 'color:#175cd3;font-weight:bold';
    console.groupCollapsed(`%c[CWM ${direction.toUpperCase()}] %c${envelope.event}`, style, 'color:inherit;font-weight:bold');
    console.log('event_id:', envelope.event_id);
    console.log('conversation_id:', envelope.conversation_id);
    console.log('turn_id:', envelope.turn_id);
    console.log('run_id:', envelope.run_id);
    console.log('reply_to:', envelope.reply_to);
    console.log('payload:', envelope.payload);
    console.groupEnd();
};

export const useEventStore = create(() => ({
    event: null,
    direction: null,
    processedCount: 0,
}));

const rememberEvent = (eventId) => {
    if (!eventId) return false;
    if (processedEventIds.includes(eventId)) return true;
    processedEventIds.push(eventId);
    if (processedEventIds.length > MAX_PROCESSED_IDS) processedEventIds.splice(0, processedEventIds.length - MAX_PROCESSED_IDS);
    return false;
};

const settleReply = (envelope) => {
    if (!envelope.reply_to) return false;
    const waiter = replyWaiters.get(envelope.reply_to);
    if (waiter) {
        clearTimeout(waiter.timeoutId);
        replyWaiters.delete(envelope.reply_to);
        waiter.resolve(envelope.payload);
    } else {
        replyBacklog.set(envelope.reply_to, envelope.payload);
        window.setTimeout(() => replyBacklog.delete(envelope.reply_to), DEFAULT_REPLY_TIMEOUT_MS);
    }
    return true;
};

const dispatchEnvelope = (envelope, {direction = 'local', localOnly = false} = {}) => {
    if (!envelope?.event || !envelope?.event_id) throw new TypeError('Invalid CWM event envelope');
    if (rememberEvent(envelope.event_id)) return;

    logEvent(direction, envelope);
    useEventStore.setState({
        event: envelope,
        direction,
        processedCount: processedEventIds.length,
    });
    settleReply(envelope);

    const listenerJobs = [];
    for (const registration of [...listeners.values()]) {
        if (!registration.active || !matchesEvent(registration.events, envelope.event)) continue;
        if (!shouldDeliverEventToListener({
            direction,
            replyTo: envelope.reply_to,
            listenerDirections: registration.directions,
            includeReplies: registration.includeReplies,
        })) continue;
        if (registration.conversationId) {
            const isGlobal = !envelope.conversation_id;
            if ((!isGlobal || !registration.includeGlobal) && registration.conversationId !== envelope.conversation_id) continue;
        }
        if (registration.documentId) {
            const isGlobal = !envelope.document_id;
            if ((!isGlobal || !registration.includeGlobal) && registration.documentId !== envelope.document_id) continue;
        }
        if (registration.onlyWithoutConversation && envelope.conversation_id) continue;

        const reply = (payload, event = `${envelope.event}.result`) => {
            const replyEnvelope = createEnvelope({
                event,
                payload,
                conversationId: envelope.conversation_id,
                documentId: envelope.document_id,
                turnId: envelope.turn_id,
                runId: envelope.run_id,
                streamId: envelope.stream_id,
                traceId: envelope.trace_id,
                replyTo: envelope.event_id,
            });
            dispatchEnvelope(replyEnvelope, {
                direction: localOnly ? 'local' : 'outgoing',
                localOnly,
            });
            if (!localOnly) sendRealtimeEvent(replyEnvelope);
            return replyEnvelope;
        };

        listenerJobs.push(() => {
            if (!registration.active) return;
            try {
                const result = registration.callback({
                    payload: envelope.payload,
                    event: envelope.event,
                    eventName: envelope.event,
                    eventConversationId: envelope.conversation_id,
                    eventDocumentId: envelope.document_id,
                    eventTurnId: envelope.turn_id,
                    eventRunId: envelope.run_id,
                    eventStreamId: envelope.stream_id,
                    eventTraceId: envelope.trace_id,
                    eventReplyTo: envelope.reply_to,
                    eventSequence: envelope.sequence,
                    eventDirection: direction,
                    id: envelope.event_id,
                    eventId: envelope.event_id,
                    reply,
                    envelope,
                });
                if (result && typeof result.then === 'function') {
                    Promise.resolve(result).catch((error) => {
                        console.error(`[CWM async event listener failed] ${envelope.event}`, error, registration.stack);
                    });
                }
            } catch (error) {
                console.error(`[CWM event listener failed] ${envelope.event}`, error, registration.stack);
            }
        });
    }

    if (listenerJobs.length) {
        const invokeEnvelopeListeners = () => {
            for (const job of listenerJobs) job();
        };
        if (direction === 'incoming') {
            scheduleIncomingEventCallback({
                event: envelope.event,
                replyTo: envelope.reply_to,
                callback: invokeEnvelopeListeners,
            });
        } else {
            Promise.resolve().then(invokeEnvelopeListeners);
        }
    }
};

export const dispatchIncomingEvent = (envelope) => dispatchEnvelope(envelope, {direction: 'incoming', localOnly: false});

const waitForReply = (eventId, timeoutMs, onTimeout) => {
    if (replyBacklog.has(eventId)) {
        const payload = replyBacklog.get(eventId);
        replyBacklog.delete(eventId);
        return Promise.resolve(payload);
    }
    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            replyWaiters.delete(eventId);
            onTimeout?.();
            reject(new Error(`Timeout waiting for reply to event ${eventId}`));
        }, timeoutMs);
        replyWaiters.set(eventId, {resolve, reject, timeoutId});
    });
};

/**
 * Emit one semantic event. The returned thenable waits for an event whose
 * ``reply_to`` references the generated ``event_id``.
 */
export const emitEvent = ({
    event,
    payload = {},
    conversationId = null,
    documentId = null,
    turnId = null,
    runId = null,
    streamId = null,
    traceId = null,
    replyTo = null,
    eventId = null,
    sequence = 0,
    localOnly = false,
    timeoutMs = DEFAULT_REPLY_TIMEOUT_MS,
    onTimeout = null,
}) => {
    const envelope = createEnvelope({
        event,
        payload,
        conversationId,
        documentId,
        turnId,
        runId,
        streamId,
        traceId,
        replyTo,
        eventId,
        sequence,
    });
    dispatchEnvelope(envelope, {direction: localOnly ? 'local' : 'outgoing', localOnly});
    if (!localOnly) sendRealtimeEvent(envelope);

    return {
        eventId: envelope.event_id,
        envelope,
        then: (onFulfilled, onRejected) => waitForReply(envelope.event_id, timeoutMs, onTimeout).then(onFulfilled, onRejected),
        catch: (onRejected) => waitForReply(envelope.event_id, timeoutMs, onTimeout).catch(onRejected),
        finally: (onFinally) => waitForReply(envelope.event_id, timeoutMs, onTimeout).finally(onFinally),
    };
};

/** Register a semantic event listener. Wildcards and direction filters are supported. */
export const onEvent = ({
    event,
    conversationId = null,
    documentId = null,
    onlyWithoutConversation = false,
    includeGlobal = false,
    direction = null,
    directions = null,
    includeReplies = false,
    unique = null,
}) => ({
    then: (callback) => {
        const normalizedEvents = (Array.isArray(event) ? event : [event]).map((item) => (
            normalizeEventPattern(item)
        ));
        const normalizedDirections = normalizeEventDirections(directions ?? direction);
        if (unique && uniqueListeners.has(unique)) {
            console.warn(`Unique listener "${unique}" is already registered.`);
            return () => {};
        }
        const id = generateUUID();
        const registration = {
            id,
            events: normalizedEvents,
            callback,
            conversationId,
            documentId,
            onlyWithoutConversation,
            includeGlobal,
            directions: normalizedDirections,
            includeReplies: includeReplies === true,
            active: true,
            stack: debugEnabled() ? new Error('Listener registered at').stack : null,
            unique,
        };
        listeners.set(id, registration);
        if (unique) uniqueListeners.add(unique);
        return () => {
            registration.active = false;
            listeners.delete(id);
            if (unique) uniqueListeners.delete(unique);
        };
    },
});

if (debugEnabled()) {
    window.emitCwmEvent = emitEvent;
    window.cwmEventStore = useEventStore;
    window.getCwmEventSchedulerStats = getIncomingEventSchedulerStats;
}
