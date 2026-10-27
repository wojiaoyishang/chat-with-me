import { produce } from 'immer';

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
                        message.extraInfo.replace[id] = (message.extraInfo.replace[id] || '') + delta;
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
export function createMessageStreamBatch({ getMessages, commit, delay = 32, schedule = setTimeout, cancel = clearTimeout }) {
    let pending = [];
    let timer = null;
    let runId = null;
    const flush = () => {
        if (timer !== null) cancel(timer);
        timer = null;
        if (!pending.length) return;
        const operations = pending;
        pending = [];
        commit(applyMessageStreamOperations(getMessages(), operations), [...new Set(operations.flatMap(({ value }) => Object.keys(value)))]);
    };
    return {
        flush,
        enqueue(operation) {
            if (pending.length && operation.runId !== runId) flush();
            runId = operation.runId;
            pending.push(operation);
            // Explicit full text and terminal tool states are display barriers.
            const terminal = operation.event === 'message.content.set'
                || Object.values(operation.value).some((patch) => patch && typeof patch === 'object'
                    && Object.values(patch).some((value) => /\[(?:DONE|FAILED)(?::[^\]]*)?\]/i.test(typeof value === 'string' ? value : value?.content ?? value?.frontend ?? value?.value ?? '')));
            if (terminal || pending.length >= 256) flush();
            else if (timer === null) timer = schedule(flush, delay);
        },
    };
}
