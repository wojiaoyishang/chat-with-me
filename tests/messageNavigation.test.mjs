import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

await build({
    entryPoints: ['src/features/chat/page/hooks/useMessageNavigation.js'],
    outfile: 'temp/message-navigation-test.mjs', bundle: true, packages: 'external', platform: 'node', format: 'esm',
    plugins: [{name: 'navigation-fixture', setup(builder) {
        builder.onResolve({filter: /^(?:@\/|sonner$)/}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => ({contents:
            path === 'sonner' ? 'export const toast={error:value=>globalThis.__messageNavigation.errors.push(value)}'
                : path === '@/config.js' ? 'export const apiEndpoint={CHAT_MESSAGES_BATCH_ENDPOINT:"/chat/messages/batch"}'
                    : 'export default {post:(...args)=>globalThis.__messageNavigation.post(...args)}',
        }));
    }}],
});

const deferred = () => {
    let resolve, reject;
    const promise = new Promise((yes, no) => {resolve = yes; reject = no;});
    return {promise, resolve, reject};
};
const windowFor = id => ({messagesOrder: [id], messages: {[id]: {content: id}}});

async function setup(t) {
    const dom = new JSDOM('<div id="root"></div>', {pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'requestAnimationFrame', 'cancelAnimationFrame', 'IS_REACT_ACT_ENVIRONMENT'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, {configurable: true, value: key === 'IS_REACT_ACT_ENVIRONMENT'
        ? true : key.endsWith('AnimationFrame') ? dom.window[key].bind(dom.window) : dom.window[key]});
    const fixture = {requests: [], errors: [], applied: [], rendered: new Set(), scrolled: []};
    fixture.post = (...args) => {
        const pending = deferred();
        fixture.requests.push({args, ...pending});
        return pending.promise;
    };
    fixture.scroll = (id, behavior) => {
        if (!fixture.rendered.has(id)) return false;
        fixture.scrolled.push({id, behavior});
        return true;
    };
    fixture.apply = data => {
        fixture.applied.push(data);
        for (const id of data.messagesOrder) fixture.rendered.add(id);
    };
    globalThis.__messageNavigation = fixture;
    const {default: useMessageNavigation} = await import('../temp/message-navigation-test.mjs');
    function Harness({conversationId}) {
        fixture.navigation = useMessageNavigation({conversationId, scrollToMessage: fixture.scroll, applyWindow: fixture.apply});
        return React.createElement('div', {role: 'status'}, fixture.navigation.pendingMessageId);
    }
    const root = createRoot(document.getElementById('root'));
    const render = conversationId => act(async () => root.render(React.createElement(Harness, {conversationId})));
    const jump = async id => {
        let promise;
        await act(async () => {promise = fixture.navigation.jumpToMessage(id);});
        return {promise};
    };
    const resolve = (request, data) => act(async () => {
        request.resolve(data);
        await new Promise(done => setTimeout(done, 40));
    });
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        delete globalThis.__messageNavigation;
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    });
    await render('chat-one');
    return {fixture, render, jump, resolve};
}

test('unloaded navigation immediately reports progress and loads one bounded target window', async t => {
    const ui = await setup(t);
    const first = await ui.jump('old-message');
    assert.equal(document.querySelector('[role="status"]').textContent, 'old-message');
    assert.equal(ui.fixture.requests.length, 1);
    const request = ui.fixture.requests[0];
    assert.deepEqual(request.args.slice(0, 2), ['/chat/messages/batch', {
        conversationId: 'chat-one', aroundMessageId: 'old-message', before: 3, after: 6,
    }]);
    const duplicate = await ui.jump('old-message');
    assert.equal(first.promise, duplicate.promise);
    assert.equal(ui.fixture.requests.length, 1);
    await ui.resolve(request, windowFor('old-message'));
    assert.equal(await first.promise, true);
    assert.equal(document.querySelector('[role="status"]').textContent, '');
    assert.deepEqual(ui.fixture.scrolled, [{id: 'old-message', behavior: 'auto'}]);
});

test('rapid jumps abort the previous request and late responses cannot replace the new target', async t => {
    const ui = await setup(t);
    const first = await ui.jump('first');
    const second = await ui.jump('second');
    assert.equal(ui.fixture.requests[0].args[2].signal.aborted, true);
    await ui.resolve(ui.fixture.requests[1], windowFor('second'));
    await ui.resolve(ui.fixture.requests[0], windowFor('first'));
    assert.equal(await first.promise, false);
    assert.equal(await second.promise, true);
    assert.deepEqual(ui.fixture.applied.map(data => data.messagesOrder[0]), ['second']);
    assert.deepEqual(ui.fixture.errors, []);
});

test('rendered targets cancel obsolete network jumps and require no additional request', async t => {
    const ui = await setup(t);
    const old = await ui.jump('unloaded');
    ui.fixture.rendered.add('rendered');
    const current = await ui.jump('rendered');
    assert.equal(await current.promise, true);
    assert.equal(ui.fixture.requests.length, 1);
    assert.equal(ui.fixture.requests[0].args[2].signal.aborted, true);
    await ui.resolve(ui.fixture.requests[0], windowFor('unloaded'));
    assert.equal(await old.promise, false);
    assert.deepEqual(ui.fixture.applied, []);
});

test('conversation changes and explicit cancellation suppress old windows and clear progress', async t => {
    const ui = await setup(t);
    const old = await ui.jump('other-chat-message');
    await ui.render('chat-two');
    assert.equal(ui.fixture.requests[0].args[2].signal.aborted, true);
    await ui.resolve(ui.fixture.requests[0], windowFor('other-chat-message'));
    assert.equal(await old.promise, false);
    const next = await ui.jump('cancelled');
    await act(async () => ui.fixture.navigation.cancelJump());
    await ui.resolve(ui.fixture.requests[1], windowFor('cancelled'));
    assert.equal(await next.promise, false);
    assert.equal(document.querySelector('[role="status"]').textContent, '');
    assert.deepEqual(ui.fixture.applied, []);
});

test('deleted targets return feedback without changing the current messages', async t => {
    const ui = await setup(t);
    const failed = await ui.jump('deleted');
    await act(async () => ui.fixture.requests[0].reject(new Error('目标消息不属于当前活动消息链。')));
    assert.equal(await failed.promise, false);
    assert.deepEqual(ui.fixture.applied, []);
    assert.deepEqual(ui.fixture.errors, ['目标消息不属于当前活动消息链。']);
    assert.equal(document.querySelector('[role="status"]').textContent, '');
});
