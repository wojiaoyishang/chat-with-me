import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { mergeNetworkData } from '../src/features/chat/page/utils/networkMerge.js';

await build({ entryPoints: ['src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx'], outfile: 'temp/graph-expansion-react-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', loader: { '.css': 'empty' }, plugins: [{ name: 'test-scene', setup(builder) {
    builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
    builder.onResolve({ filter: /^@\// }, ({ path: name }) => name === '@/features/knowledge/graphSettings.js' ? { path: path.resolve('src/features/knowledge/graphSettings.js') } : { path: name, namespace: 'fixture' });
    builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: name }) => ({ loader: 'jsx', contents: name.endsWith('apiClient.js') ? 'export default {get:(...args)=>globalThis.__graphGet(...args)}' : name === '@/components/ui/select' ? `import{createContext,useContext}from'react';const C=createContext({});export const Select=({value,onValueChange,children})=><C.Provider value={{value,onValueChange}}>{children}</C.Provider>;export const SelectTrigger=props=><span {...props}/>;export const SelectValue=()=>null;export const SelectContent=({children})=>{const c=useContext(C);return <select aria-label="切换图谱知识库" value={c.value} onChange={e=>c.onValueChange(e.target.value)}>{children}</select>};export const SelectItem=props=><option {...props}/>;` : name === '@/lib/tools.jsx' ? 'export const useLocalSetting=(_key,defaultValue)=>[defaultValue];' : 'export default function Visibility({children}){return children}' }));
} }] });
await build({ entryPoints: ['src/components/ui/MultilineEditor.jsx'], outfile: 'temp/multiline-react-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external' });
const { default: Graph } = await import('../temp/graph-expansion-react-test.mjs');
const { default: MultilineEditor } = await import('../temp/multiline-react-test.mjs');

async function setup(t, get, databases = [{ id: 'default', title: '默认知识库', enabled: true }, { id: 'library-a', title: '库 A', enabled: true }, { id: 'library-b', title: '库 B', enabled: true }]) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat/conv', pretendToBeVisual: true });
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'requestAnimationFrame', 'cancelAnimationFrame'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, { configurable: true, value: ['requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key] });
    dom.window.matchMedia = () => ({ matches: true });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true; globalThis.__graphGet = (url, options) => url === '/knowledge/databases' ? Promise.resolve({ databases }) : get(url, options);
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

const switchDatabase = async (ui, id) => act(async () => {
    const select = ui.container.querySelector('[aria-label="切换图谱知识库"]');
    select.value = id; select.dispatchEvent(new ui.dom.window.Event('change', { bubbles: true }));
});

test('manual database views remain independent of AI queries, follow AI scope changes, and restore each canvas', async t => {
    const calls = [], ui = await setup(t, async (url, options) => {
        calls.push([url, options]);
        return { databaseId: options.params.databaseId, nodes: [{ id: 'shared', name: '库 A 节点', label: 'Event' }, { id: 'expanded-a', name: '手动展开 A', label: 'Thing' }], relationships: [{ id: 'expanded-edge-a', source: 'shared', target: 'expanded-a', type: '关联' }] };
    });
    ui.msg.network = { databaseId: 'library-a', nodes: [{ id: 'shared', name: '库 A 节点', label: 'Event' }], relationships: [] };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => [...ui.container.querySelectorAll('button')].find(button => button.textContent === '暂停动画').click());
    await act(async () => ui.container.querySelector('[data-node-id="shared"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    await act(async () => ui.container.querySelector('[aria-label="放大"]').click());
    const savedA = ui.store.get('nvlInstance').getViewState(), original = structuredClone(ui.msg.network);
    await switchDatabase(ui, 'library-b');
    assert.match(ui.container.textContent, /当前知识库尚无本条消息的图谱结果/);
    assert.equal(ui.container.querySelector('[data-node-id="shared"]'), null);
    assert.equal(ui.store.has('nvlInstance'), false, 'manual views must not receive AI focus commands');
    assert.deepEqual(ui.msg.network, original);
    assert.equal(calls.length, 1, 'switching views does not issue an AI query or fetch old IDs in the new database');
    ui.msg = { ...ui.msg, network: mergeNetworkData(ui.msg.network, { databaseId: 'library-a', nodes: [{ id: 'later-a', name: '稍后到达 A', label: 'Event' }] }) };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' }));
    assert.equal(ui.container.querySelector('select').value, 'library-b', 'same-database AI updates do not override manual selection');
    ui.msg = { ...ui.msg, network: mergeNetworkData(ui.msg.network, { databaseId: 'library-b', nodes: [{ id: 'shared', name: '库 B 节点', label: 'Fact' }], relationships: [] }) };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('select').value, 'library-b');
    assert.match(ui.container.querySelector('[data-node-id="shared"] title').textContent, /库 B 节点/);
    assert.equal(ui.container.querySelector('[data-node-id="expanded-a"]'), null);
    let sent; ui.dom.window.addEventListener('cwm.open-knowledge', event => sent = event.detail);
    await act(async () => ui.container.querySelector('[aria-label="在知识库中打开"]').click());
    assert.equal(sent.databaseId, 'library-b'); assert.deepEqual(sent.nodeIds, ['shared']); assert.ok(sent.viewState.camera);
    await switchDatabase(ui, 'library-a'); await ui.settle();
    assert.ok(ui.container.querySelector('[data-node-id="expanded-a"]')); assert.ok(ui.container.querySelector('[data-node-id="later-a"]'));
    assert.match(ui.container.querySelector('[data-node-id="shared"] title').textContent, /库 A 节点/);
    assert.equal(ui.store.has('nvlInstance'), false);
    await act(async () => ui.container.querySelector('[aria-label="在知识库中打开"]').click());
    assert.equal(sent.databaseId, 'library-a'); assert.deepEqual(sent.nodeIds.sort(), ['expanded-a', 'later-a', 'shared']);
    assert.equal(sent.viewState.physics, false); assert.equal(sent.viewState.camera.scale, savedA.camera.scale);
    assert.deepEqual(sent.viewState.positions.find(node => node.id === 'shared'), savedA.positions.find(node => node.id === 'shared'));
    assert.equal(ui.msg.network.databaseId, 'library-b', 'exporting a manual view never changes AI scope');
    assert.equal(ui.msg.network.databaseViews['library-a'].nodes.some(node => node.id === 'expanded-a'), false, 'manual expansion stays outside AI history');
    ui.msg = { ...ui.msg, network: mergeNetworkData(ui.msg.network, { databaseId: 'library-a', nodes: [], relationships: [] }) };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('select').value, 'library-a'); assert.ok(ui.store.get('nvlInstance'));
});

test('manual switching aborts pending expansion and ignores a stale response even after returning to that database', async t => {
    let resolveRequest, signal;
    const ui = await setup(t, (_url, options) => { signal = options.signal; return new Promise(resolve => resolveRequest = resolve); });
    ui.msg.network.databaseId = 'library-a';
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    await switchDatabase(ui, 'library-b'); assert.equal(signal.aborted, true);
    await switchDatabase(ui, 'library-a');
    await act(async () => resolveRequest({ databaseId: 'library-a', nodes: [{ id: 'stale-a', label: 'Event' }], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="stale-a"]'), null);
    assert.equal(ui.container.querySelector('.chat-knowledge-feedback'), null);
});

test('another message retains its own AI scope and duplicate IDs never leak across message or database boundaries', async t => {
    const ui = await setup(t, async () => ({ databaseId: 'library-b', nodes: [{ id: 'root', name: '错误库结果', label: 'Event' }], relationships: [] }));
    ui.msg.network.databaseId = 'library-a';
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /其他知识库/);
    assert.doesNotMatch(ui.container.querySelector('[data-node-id="root"] title').textContent, /错误库/);
    await switchDatabase(ui, 'library-b');
    const next = { ...ui.msg, id: 'different-message', network: { databaseId: 'library-a', nodes: [{ id: 'root', name: '另一消息 A', label: 'Thing' }], relationships: [] } };
    await ui.render(React.createElement(Graph, { msg: next, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('select').value, 'library-a');
    assert.match(ui.container.querySelector('[data-node-id="root"] title').textContent, /另一消息 A/);
    assert.equal(ui.container.querySelector('[role="alert"]'), null);
});

test('a stale focus request from another database never leaks or leaves a destroyed graph registered', async t => {
    const ui = await setup(t, async () => ({ nodes: [], relationships: [] }));
    ui.msg.network = { databaseId: 'library-b', nodes: [{ id: 'shared', name: '库 B 节点', label: 'Event' }], relationships: [] };
    ui.store.set('focusNode', { databaseId: 'library-a', nodeIds: ['shared'] });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelectorAll('.knowledge-node.selected').length, 0);
    assert.ok(ui.store.get('nvlInstance')); assert.equal(ui.store.get('nvlInstance').databaseId, 'library-b');
    await switchDatabase(ui, 'library-a');
    assert.equal(ui.store.has('nvlInstance'), false);
    assert.deepEqual(ui.store.get('focusNode'), { databaseId: 'library-a', nodeIds: ['shared'] });
});

test('the legacy default alias resolves to its stable database without stealing a manual view on canonical updates', async t => {
    const calls = [], ui = await setup(t, async (url, options) => { calls.push([url, options]); return { databaseId: 'library-a', nodes: [{ id: 'root', name: '默认库当前节点', label: 'Event' }], relationships: [] }; }, [{ id: 'library-a', title: '已改名的默认库', enabled: true, legacyDefault: true }, { id: 'library-b', title: '库 B', enabled: true }]);
    ui.msg.network = { databaseId: 'default', nodes: [{ id: 'root', name: '默认库当前节点', label: 'Event' }], relationships: [], databaseViews: { 'library-a': { databaseId: 'library-a', nodes: [{ id: 'root', name: '过时别名快照', label: 'Event' }], relationships: [] } } };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('select').value, 'library-a');
    assert.match(ui.container.querySelector('[data-node-id="root"] title').textContent, /默认库当前节点/);
    assert.equal(ui.container.querySelector('option[value="default"]'), null);
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls[0][1].params.databaseId, 'library-a'); assert.equal(ui.msg.network.databaseId, 'default');
    await switchDatabase(ui, 'library-b');
    ui.msg = { ...ui.msg, network: { ...ui.msg.network, databaseId: 'library-a' } };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' }));
    assert.equal(ui.container.querySelector('select').value, 'library-b', 'canonicalizing the same AI database is not a scope switch');
});

test('an explicit default slug takes precedence over the legacy default alias in graph previews', async t => {
    const calls = [], ui = await setup(t, async (url, options) => { calls.push([url, options]); return { databaseId: 'library-new', nodes: [{ id: 'root', name: '新默认库节点', label: 'Event' }], relationships: [] }; }, [{ id: 'library-old', name: 'renamed', title: '旧默认库', enabled: true, legacyDefault: true }, { id: 'library-new', name: 'default', title: '新默认库', enabled: true }]);
    ui.msg.network = { databaseId: 'default', nodes: [{ id: 'root', name: '新默认库节点', label: 'Event' }], relationships: [] };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('select').value, 'library-new');
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls[0][1].params.databaseId, 'library-new');
    assert.equal(ui.container.querySelector('option[value="library-old"]').textContent, '旧默认库');
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
