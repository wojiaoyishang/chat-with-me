import { produce } from 'immer';
import {MAX_MESSAGE_DELTA_CHARACTERS, mergeMessageDeltaValues} from '../../../../runtime/protocol/messageDeltas.js';

export const MESSAGE_STREAM_EVENTS = new Set([
    'message.content.set', 'message.content.delta',
    'message.replacement.set', 'message.replacement.delta',
]);

/** Apply received operations in order in a single Immer transaction. */
export function applyMessageStreamOperations(messages, operations) {
    return produce(messages, (draft) => {
        for (const { event, value } of operations) {
            for (const [messageId, patch] of Object.entries(value)) {
                const message = Object.hasOwn(draft, messageId) ? draft[messageId] : null;
                if (!message) continue;
                if (event === 'message.content.set') message.content = patch || '';
                else if (event === 'message.content.delta') message.content = (message.content || '') + (patch || '');
                else {
                    message.extraInfo ||= {};
                    message.extraInfo.replace ||= {};
                    if (event === 'message.replacement.set') Object.assign(message.extraInfo.replace, patch);
                    else for (const [id, delta] of Object.entries(patch)) {
                        const current = message.extraInfo.replace[id];
                        if (current && typeof current === 'object') {
                            const field = Object.hasOwn(current, 'content') ? 'content'
                                : Object.hasOwn(current, 'frontend') ? 'frontend' : 'value';
                            current[field] = String(current[field] || '') + delta;
                        } else message.extraInfo.replace[id] = (current || '') + delta;
                    }
                }
            }
        }
    });
}

/**
 * A short lived projection queue owned by one ChatPage subscription. It holds
 * received operations, never a second message/run state. Non-stream events and
 * replies flush it before reading or mutating the canonical messagesRef.
 * A timer also works in background tabs where animation frames are suspended.
 */
export function createMessageStreamBatch({ getMessages, commit, delay = 32, maxDelay = 120,
    schedule = setTimeout, cancel = clearTimeout, now = () => globalThis.performance?.now?.() ?? Date.now() }) {
    let pending = [];
    let pendingCharacters = 0;
    let timer = null;
    let deadline = 0;
    let batchDelay = delay;
    let runId = null;
    const flush = () => {
        const lateness = timer === null ? 0 : Math.max(0, now() - deadline);
        if (timer !== null) cancel(timer);
        timer = null;
        if (!pending.length) return;
        const operations = pending;
        pending = [];
        pendingCharacters = 0;
        const started = now();
        commit(applyMessageStreamOperations(getMessages(), operations), [...new Set(operations.flatMap(({ value }) => Object.keys(value)))]);
        // Busy main threads need fewer, larger commits instead of replaying each
        // token. Recover toward the normal cadence once catch-up becomes cheap.
        batchDelay = Math.min(Math.max(delay, maxDelay), Math.max(delay,
            Math.ceil(Math.max(now() - started, lateness) * 2), Math.ceil(batchDelay * 0.75)));
    };
    return {
        flush,
        enqueue(operation) {
            if (pending.length && operation.runId !== runId) flush();
            runId = operation.runId;
            const previous = pending.at(-1);
            const merged = previous?.event === operation.event
                ? mergeMessageDeltaValues(operation.event, previous.value, operation.value) : null;
            if (merged) previous.value = merged;
            else pending.push({...operation});
            for (const patch of Object.values(operation.value)) {
                if (typeof patch === 'string') pendingCharacters += patch.length;
                else for (const value of Object.values(patch || {})) {
                    const text = typeof value === 'string' ? value : value?.content ?? value?.frontend ?? value?.value;
                    if (typeof text === 'string') pendingCharacters += text.length;
                }
            }
            // Explicit full text and terminal tool states are display barriers.
            const terminal = operation.event === 'message.content.set'
                || Object.values(operation.value).some((patch) => patch && typeof patch === 'object'
                    && Object.values(patch).some((value) => /\[(?:DONE|FAILED)(?::[^\]]*)?\]/i.test(typeof value === 'string' ? value : value?.content ?? value?.frontend ?? value?.value ?? '')));
            if (terminal || pending.length >= 256 || pendingCharacters >= MAX_MESSAGE_DELTA_CHARACTERS) flush();
            else if (timer === null) {
                deadline = now() + batchDelay;
                timer = schedule(flush, batchDelay);
            }
        },
    };
}
