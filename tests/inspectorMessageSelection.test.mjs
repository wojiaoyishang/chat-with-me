import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {build, transformSync} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

await build({
    stdin: {contents: `export {Checkbox} from './src/components/ui/checkbox.tsx';
        export {default as MessageSummaryItem} from './src/features/chat/page/components/MessageSummaryItem.jsx';`, resolveDir: process.cwd()},
    outfile: 'temp/inspector-selection-components.cjs', bundle: true, packages: 'external',
    platform: 'node', format: 'cjs', jsx: 'automatic', alias: {'@': `${process.cwd()}/src`},
});

const source = fs.readFileSync(new URL('../src/features/chat/page/components/InspectorMessageBrowser.jsx', import.meta.url), 'utf8')
    .replace(/^import .+;\r?\n/gm, '').replace('export default function', 'function');
const code = transformSync(`
const React = require('react');
const {useEffect, useMemo, useRef, useState} = React;
const Button = ({children, variant, size, ...props}) => <button {...props}>{children}</button>;
const EyeOff = () => null, Loader2 = () => null, Undo2 = () => null, Maximize2 = () => null;
const Virtuoso = React.forwardRef(({data, itemContent}, _ref) => <div>{data.map((item, index) => <div key={item.messageId}>{itemContent(index, item)}</div>)}</div>);
const {Checkbox, MessageSummaryItem} = require('../temp/inspector-selection-components.cjs');
const useConversationMutationGuard = () => fixture.freeze;
const apiClient = {post: (...args) => {fixture.calls.push(args); return fixture.post(...args)}};
const emitEvent = value => fixture.events.push(value);
const toast = {success: value => fixture.successes.push(value), error: value => fixture.errors.push(value)};
${source}
exports.Component = InspectorMessageBrowser;
`, {loader: 'jsx', format: 'cjs', jsx: 'automatic'}).code;

async function setup(t) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'Event', 'Node', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'IS_REACT_ACT_ENVIRONMENT'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, {configurable: true, value: key === 'IS_REACT_ACT_ENVIRONMENT'
        ? true : key.endsWith('AnimationFrame') || key === 'getComputedStyle' ? dom.window[key].bind(dom.window) : dom.window[key]});
    const fixture = {calls: [], events: [], errors: [], successes: [], freeze: {blocked: false, canMutate: () => !fixture.freeze.blocked},
        post: async () => ({contextRevision: 3, messageStates: {}})};
    const context = {require: createRequire(import.meta.url), exports: {}, fixture,
        requestAnimationFrame: globalThis.requestAnimationFrame, cancelAnimationFrame: globalThis.cancelAnimationFrame,
        AbortController};
    vm.runInNewContext(code, context);
    const Component = context.exports.Component;
    const root = createRoot(document.getElementById('root'));
    let props = {section: {conversationId: 'owned', orderFingerprint: 'chain', items: ['a', 'b', 'c', 'd'].map(messageId => ({
        messageId, role: 'user', preview: `正文 ${messageId}`, readonly: messageId === 'b',
    }))}, onJump: id => fixture.jumped = id};
    const render = async patch => {
        props = {...props, ...patch};
        await act(async () => root.render(React.createElement(Component, {...props, key: props.section.conversationId})));
    };
    const click = async (element, options = {}) => {
        assert.ok(element);
        await act(async () => element.dispatchEvent(new dom.window.MouseEvent('click', {bubbles: true, ...options})));
    };
    const checkbox = id => document.querySelector(`[role="checkbox"][aria-label="选择消息 ${id}"]`);
    const button = label => [...document.querySelectorAll('button')].find(element => element.textContent === label);
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    });
    await render();
    return {fixture, render, click, checkbox, button, get props() {return props;}};
}

test('Shift selects an inclusive range while skipping unfinished messages and submits stable IDs', async t => {
    const ui = await setup(t);
    await ui.click(ui.checkbox('a'));
    await ui.click(ui.checkbox('d'), {shiftKey: true});
    assert.equal(ui.checkbox('a').getAttribute('data-state'), 'checked');
    assert.equal(ui.checkbox('b').disabled, true);
    assert.equal(ui.checkbox('b').getAttribute('data-state'), 'unchecked');
    assert.equal(ui.checkbox('c').getAttribute('data-state'), 'checked');
    assert.equal(ui.checkbox('d').getAttribute('data-state'), 'checked');
    assert.equal(ui.checkbox('a').getAttribute('data-slot'), 'checkbox');
    await ui.click(ui.button('忽略所选'));
    const [endpoint, payload] = ui.fixture.calls[0];
    assert.equal(endpoint, '/chat/conversations/owned/context');
    assert.deepEqual(JSON.parse(JSON.stringify(payload)), {action: 'forget', messageIds: ['a', 'c', 'd'], orderFingerprint: 'chain'});
    assert.equal(ui.fixture.events[0].conversationId, 'owned');
    assert.equal(ui.fixture.events[0].event, 'context.state.changed');
    assert.equal(ui.fixture.events[0].localOnly, true);
    assert.equal(ui.checkbox('a').getAttribute('data-state'), 'unchecked');
    assert.match(document.body.textContent, /忽略会将消息原文和附件排除出模型上下文/);
    assert.match(document.body.textContent, /压缩会用摘要替代原文/);
});

test('batch restoration uses restore action and jump remains available on the summary', async t => {
    const ui = await setup(t);
    await ui.click(ui.checkbox('c'));
    await ui.click(ui.button('取消所选忽略'));
    assert.equal(ui.fixture.calls[0][1].action, 'restore');
    await ui.click([...document.querySelectorAll('button')].find(element => element.textContent.includes('正文 a')));
    assert.equal(ui.fixture.jumped, 'a');
});

test('failed updates keep the selection and expose the server error without reporting success', async t => {
    const ui = await setup(t);
    ui.fixture.post = async () => {throw new Error('消息链已变化，请重新选择');};
    await ui.click(ui.checkbox('a'));
    await ui.click(ui.button('忽略所选'));
    assert.equal(ui.checkbox('a').getAttribute('data-state'), 'checked');
    assert.match(document.querySelector('[role="alert"]').textContent, /消息链已变化/);
    assert.equal(ui.fixture.events.length, 0);
    assert.equal(ui.fixture.successes.length, 0);
});

test('branch changes prune missing selections and a new conversation aborts the pending update', async t => {
    const ui = await setup(t);
    await ui.click(ui.checkbox('a'));
    await ui.click(ui.checkbox('d'));
    await ui.render({section: {...ui.props.section, items: ui.props.section.items.slice(0, 3)}});
    assert.match(document.body.textContent, /已选 1 条/);
    let resolve;
    ui.fixture.post = () => new Promise(done => resolve = done);
    await ui.click(ui.button('忽略所选'));
    const signal = ui.fixture.calls[0][2].signal;
    assert.equal(ui.button('忽略所选').disabled, true);
    await ui.render({section: {...ui.props.section, conversationId: 'new'}});
    assert.equal(signal.aborted, true);
    await act(async () => resolve({contextRevision: 4}));
    assert.equal(ui.fixture.events.length, 0);
    assert.match(document.body.textContent, /已选 0 条/);
});

test('frozen conversations disable selection and mutation controls', async t => {
    const ui = await setup(t);
    ui.fixture.freeze.blocked = true;
    await ui.render();
    assert.equal(ui.checkbox('a').disabled, true);
    assert.equal(ui.button('全选').disabled, true);
    assert.equal(ui.button('忽略所选').disabled, true);
    assert.equal(ui.fixture.calls.length, 0);
});

test('selected compactions have a dedicated action and each state has an identifiable icon', async t => {
    const ui = await setup(t);
    await ui.render({section: {...ui.props.section, items: ui.props.section.items.map(item => ({...item,
        contextState: item.messageId === 'a' ? {forgotten: true, compactions: [{artifactId: 'summary'}]} : {},
    }))}});
    assert.ok(document.querySelector('svg[aria-label="已忽略"]'));
    assert.ok(document.querySelector('svg[aria-label="已压缩"]'));
    await ui.click(ui.checkbox('a'));
    await ui.click(ui.button('取消所选压缩'));
    assert.deepEqual(JSON.parse(JSON.stringify(ui.fixture.calls[0][1])), {
        action: 'restore_compactions', messageIds: ['a'], orderFingerprint: 'chain',
    });
    assert.equal(ui.fixture.successes[0], '已取消所选消息的压缩');
});
