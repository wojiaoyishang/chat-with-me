import test from 'node:test';
import assert from 'node:assert/strict';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {JSDOM} from 'jsdom';
import {build} from 'esbuild';

await build({stdin: {contents: `export {default as useFreeze} from './src/features/chat/freeze/useConversationFreeze.js'; export {ConversationFreezeContext as Context,useConversationMutationGuard as useGuard} from './src/features/chat/freeze/ConversationFreezeContext.jsx';`, resolveDir: process.cwd()},
    outfile: 'temp/conversation-freeze-ui-test.mjs', bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    plugins: [{name: 'freeze-fixtures', setup(builder) {
        builder.onResolve({filter: /^@\//}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => {
            const contents = path.endsWith('apiClient.js') ? 'export default {get:(...args)=>globalThis.__freezeUI.get(...args)}'
                : path.endsWith('config.js') ? 'export const apiEndpoint={CHAT_CONVERSATIONS_ENDPOINT:"/chat/conversations"}'
                    : 'export const onEvent=({event})=>({then:callback=>{const set=globalThis.__freezeUI.listeners.get(event)||new Set();globalThis.__freezeUI.listeners.set(event,set);set.add(callback);return()=>set.delete(callback)}})';
            return {contents, loader: 'js'};
        });
    }}],
});
const {useFreeze, Context, useGuard} = await import('../temp/conversation-freeze-ui-test.mjs');
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return {promise, resolve}; };
const state = (id, patch = {}) => ({conversationId: id, frozen: false, revision: 0, ...patch});

test('initial loading, conversation switches, cross-device events and reconnect use authoritative state', async t => {
    const dom = new JSDOM('<div id="root"></div>');
    const previous = new Map(['window', 'document'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of previous.keys()) Object.defineProperty(globalThis, key, {value: dom.window[key], configurable: true});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const requests = [], listeners = new Map(), mutations = [];
    globalThis.__freezeUI = {listeners, get: (url, options) => { const pending = deferred(); requests.push({url, options, ...pending}); return pending.promise; }};
    const root = createRoot(document.getElementById('root'));
    t.after(async () => { await act(async () => root.unmount()); dom.window.close(); for (const [key, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; delete globalThis.__freezeUI; delete globalThis.IS_REACT_ACT_ENVIRONMENT; });
    let lastGuard;
    function Controls({id}) { const freeze = useGuard(id); lastGuard = freeze.canMutate; return React.createElement('button', {disabled: freeze.blocked, onClick: () => { if (freeze.canMutate()) mutations.push(id); }, 'data-id': id}, freeze.blocked ? 'frozen' : 'available'); }
    function Probe({id}) { const freeze = useFreeze(id); return React.createElement(Context.Provider, {value: freeze}, React.createElement(Controls, {id})); }
    const render = id => act(async () => root.render(React.createElement(Probe, {id})));
    const button = () => document.querySelector('button');
    await render('source');
    assert.equal(button().disabled, true);
    assert.equal(lastGuard(), false);
    assert.match(requests[0].url, /source\/freeze-state$/);
    await act(async () => requests[0].resolve(state('source')));
    assert.equal(button().disabled, false);
    const heldCallback = lastGuard;
    await render('other');
    assert.equal(button().disabled, true, 'new conversation never inherits an old unfrozen snapshot');
    assert.equal(heldCallback(), false, 'a callback retained by a portal reads the latest guard');
    await act(async () => requests[1].resolve(state('other')));
    assert.equal(button().disabled, false);
    const emit = value => act(async () => { for (const callback of listeners.get('conversation.freeze.changed') || []) callback({payload: value}); });
    await emit(state('source', {frozen: true, revision: 5}));
    assert.equal(button().disabled, false, 'other conversations remain usable');
    await emit(state('other', {frozen: true, operationId: 'fork', revision: 6}));
    assert.equal(button().disabled, true);
    await act(async () => button().click());
    assert.deepEqual(mutations, []);
    await act(async () => { for (const callback of listeners.get('transport.connected') || []) callback({}); });
    await act(async () => requests.at(-1).resolve(state('other', {revision: 7})));
    assert.equal(button().disabled, false);
    await act(async () => button().click());
    assert.deepEqual(mutations, ['other']);
});
