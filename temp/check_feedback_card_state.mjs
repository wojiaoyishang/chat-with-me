import assert from 'node:assert/strict';
import fs from 'node:fs';
const slots = [];
let cursor = 0,
    deps,
    cleanup,
    listener;
const queries = [],
    requests = [];
globalThis.feedbackHarness = {
    useState(initial) {
        const i = cursor++;
        if (!(i in slots)) slots[i] = initial;
        return [
            slots[i],
            (value) => {
                slots[i] = typeof value === 'function' ? value(slots[i]) : value;
            },
        ];
    },
    useEffect(effect, next) {
        if (!deps || next.some((value, i) => value !== deps[i])) {
            cleanup?.();
            deps = next;
            cleanup = effect();
        }
    },
    toast: {
        error(message) {
            throw new Error(message);
        },
    },
    onEvent() {
        return {
            then(callback) {
                listener = callback;
                return () => {
                    listener = null;
                };
            },
        };
    },
    emitEvent(request) {
        requests.push(request);
        return new Promise((resolve) => queries.push({ request, resolve }));
    },
};
const source = fs
    .readFileSync('src/features/chat/speech/useFrontendFeedback.js', 'utf8')
    .replace(/^import.*;\r?\n/gm, '');
const { default: useFeedback } = await import(
    `data:text/javascript;base64,${Buffer.from('const {useState,useEffect,toast,onEvent,emitEvent}=globalThis.feedbackHarness;\n' + source).toString('base64')}`
);
const props = { items: [{ toolid: 'a' }, { toolid: 'b' }], conversationId: 'conversation', messageId: 'message' };
const render = () => {
    cursor = 0;
    return useFeedback(props);
};
render();
assert.equal(queries.length, 2);
listener({
    payload: {
        msgid: 'message',
        toolid: 'a',
        revision: 3,
        status: 'completed',
        results: [{ success: true, content: 'first result' }],
    },
});
queries[0].resolve({ success: true, msgid: 'message', toolid: 'a', revision: 1, status: 'scheduled' });
queries[1].resolve({ success: true, msgid: 'message', toolid: 'b', revision: 1, status: 'scheduled' });
await Promise.resolve();
assert.equal(render().states.a.results[0].content, 'first result');
listener({ payload: { msgid: 'other', toolid: 'a', revision: 99, status: 'failed' } });
assert.equal(render().states.a.status, 'completed');
const request = render().trigger('b', { stopPropagation() {} });
assert.equal(render().pendingIds.b, true);
assert.deepEqual(requests.at(-1).payload, { msgid: 'message', toolid: 'b' });
listener({
    payload: { msgid: 'message', toolid: 'b', revision: 3, status: 'failed', message: 'execution error', results: [] },
});
queries.at(-1).resolve({ success: true, msgid: 'message', toolid: 'b', revision: 2, status: 'running' });
await request;
assert.equal(render().states.b.status, 'failed');
assert.equal(render().pendingIds.b, false);
cleanup();
assert.equal(listener, null);
console.log(
    'Feedback card state: multiple calls, stale snapshots, execution errors, scoped locators and cleanup passed',
);
