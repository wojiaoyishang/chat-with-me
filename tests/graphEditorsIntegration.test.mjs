import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

await build({ entryPoints: ['src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx'], outfile: 'temp/graph-expansion-react-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', loader: { '.css': 'empty' }, plugins: [{ name: 'test-scene', setup(builder) {
    builder.onResolve({ filter: /^@\// }, ({ path: name }) => name === '@/features/knowledge/graphSettings.js' ? { path: path.resolve('src/features/knowledge/graphSettings.js') } : { path: name, namespace: 'fixture' });
    builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: name }) => ({ loader: 'jsx', contents: name.endsWith('apiClient.js') ? 'export default {get:(...args)=>globalThis.__graphGet(...args)}' : name === '@/lib/tools.jsx' ? 'export const useLocalSetting=(_key,defaultValue)=>[defaultValue];' : 'export default function Visibility({children}){return children}' }));
} }] });
await build({ entryPoints: ['src/components/ui/MultilineEditor.jsx'], outfile: 'temp/multiline-react-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external' });
const { default: Graph } = await import('../temp/graph-expansion-react-test.mjs');
const { default: MultilineEditor } = await import('../temp/multiline-react-test.mjs');

async function setup(t, get) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat/conv', pretendToBeVisual: true });
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'requestAnimationFrame', 'cancelAnimationFrame'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, { configurable: true, value: ['requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key] });
    dom.window.matchMedia = () => ({ matches: true });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true; globalThis.__graphGet = get;
    const container = dom.window.document.getElementById('root'), root = createRoot(container);
    const render = async component => act(async () => { root.render(component); await new Promise(resolve => setTimeout(resolve, 30)); });
    t.after(async () => { await act(async () => root.unmount()); dom.window.close(); for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; delete globalThis.IS_REACT_ACT_ENVIRONMENT; delete globalThis.__graphGet; });
    const settle = async () => act(async () => { await new Promise(resolve => setTimeout(resolve, 35)); });
    const store = new Map(), msg = { id: 'message', network: { nodes: [{ id: 'root', name: '根节点', label: 'Event' }], relationships: [] }, registerComponent: (key, value) => store.set(key, value), getComponent: key => store.get(key), unregisterComponent: key => store.delete(key) };
    return { dom, container, render, settle, msg, store };
}

test('chat double-click queries the scoped backend, appends neighbors, and preserves model focus registration', async t => {
    const calls = [], ui = await setup(t, async (...args) => { calls.push(args); return { nodes: [{ id: 'root', label: 'Event' }, { id: 'neighbor', name: '关联节点', label: 'Thing' }], relationships: [{ id: 'edge', source: 'root', target: 'neighbor', type: '关联' }] }; });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    const instance = ui.store.get('nvlInstance'), original = ui.container.querySelector('[data-node-id="root"]');
    await act(async () => { original.dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })); });
    assert.equal(calls.length, 1); assert.equal(calls[0][0], '/knowledge/nodes/root/graph');
    assert.equal(calls[0][1].params.conversationId, 'conv'); assert.equal(calls[0][1].params.depth, 1);
    assert.ok(ui.container.querySelector('[data-node-id="neighbor"]')); assert.equal(ui.container.querySelector('[data-node-id="root"]'), original);
    assert.equal(ui.store.get('nvlInstance'), instance); assert.match(ui.container.querySelector('.chat-knowledge-heading small').textContent, /2 个节点/);
    assert.equal(ui.msg.network.nodes.length, 1, 'manual expansion must not rewrite conversation history');
});

test('duplicate expansion is deduplicated and switching conversation aborts and ignores a late response', async t => {
    let resolveRequest, signal, calls = 0;
    const ui = await setup(t, (_url, options) => { calls++; signal = options.signal; return new Promise(resolve => resolveRequest = resolve); });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    const root = ui.container.querySelector('[data-node-id="root"]');
    await act(async () => { for (let i = 0; i < 2; i++) root.dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })); });
    assert.equal(calls, 1); assert.equal(root.classList.contains('expanding'), true);
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'other-conversation' }));
    assert.equal(signal.aborted, true);
    await act(async () => resolveRequest({ nodes: [{ id: 'private-neighbor', label: 'Event' }], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="private-neighbor"]'), null);
    assert.equal(ui.container.querySelector('.chat-knowledge-feedback'), null);
});

test('permission failures retain the chat graph and provide an actionable error rather than hiding it', async t => {
    const ui = await setup(t, async () => { throw new Error('没有访问该节点的权限'); });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.ok(ui.container.querySelector('[data-node-id="root"]')); assert.match(ui.container.querySelector('[role="alert"]').textContent, /权限/);
    assert.equal(ui.container.querySelector('.expanding'), null);
});

test('chat graph open action is an icon and sends current expanded node identities without changing conversation data', async t => {
    const ui = await setup(t, async () => ({ nodes: [{id:'root',label:'Event'},{id:'neighbor',name:'关联',label:'Thing'}], relationships:[{id:'edge',source:'root',target:'neighbor',type:'关系'}] }));
    await ui.render(React.createElement(Graph,{msg:ui.msg,conversationId:'conv'})); await ui.settle();
    await act(async()=>ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick',{bubbles:true})));
    let sent; ui.dom.window.addEventListener('cwm.open-knowledge',event=>sent=event.detail);
    const action=ui.container.querySelector('[aria-label="在知识库中打开"]'); assert.ok(action.querySelector('svg')); assert.equal(action.textContent,'');
    await act(async()=>action.click()); assert.deepEqual(sent.nodeIds.sort(),['neighbor','root']);assert.deepEqual(sent.edgeIds,['edge']);assert.equal(sent.conversationId,'conv');
    assert.equal(ui.msg.network.nodes.length,1);
});

test('shared React multiline editor preserves cursor, copies current draft and applies read-only without losing content', async t => {
    const ui = await setup(t), copied = [], changes = [];
    Object.defineProperty(ui.dom.window.navigator, 'clipboard', { value: { writeText: async text => copied.push(text) } });
    const props = { label: '系统提示词', value: '首行\n末行', onChange: event => changes.push(event.target.value) };
    await ui.render(React.createElement(MultilineEditor, props));
    const area = ui.container.querySelector('textarea');
    await act(async () => { area.value = '\n新的正文\n'; area.setSelectionRange(2, 2); area.dispatchEvent(new ui.dom.window.Event('input', { bubbles: true })); });
    await ui.render(React.createElement(MultilineEditor, { ...props, value: changes.at(-1) }));
    assert.equal(ui.container.querySelector('textarea'), area); assert.equal(area.selectionStart, 2);
    await act(async () => ui.container.querySelector('[aria-label="复制系统提示词"]').click()); assert.deepEqual(copied, ['\n新的正文\n']);
    await ui.render(React.createElement(MultilineEditor, { ...props, value: changes.at(-1), readOnly: true }));
    assert.equal(area.readOnly, true); assert.equal(area.value, '\n新的正文\n');
});
