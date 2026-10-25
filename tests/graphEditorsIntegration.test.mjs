import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { mergeNetworkData } from '../src/features/chat/page/utils/networkMerge.js';
import { orderedTimeGraph } from './fixtures/orderedTimeV2.mjs';
import { orderedTimeForks } from './fixtures/orderedTimeForks.mjs';

await build({ entryPoints: ['src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx'], outfile: 'temp/graph-expansion-react-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', loader: { '.css': 'empty' }, plugins: [{ name: 'test-scene', setup(builder) {
    builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
    builder.onResolve({ filter: /^@\// }, ({ path: name }) => ['@/features/knowledge/graphSettings.js', '@/features/knowledge/graphHistory.js'].includes(name) ? { path: path.resolve('src', name.slice(2)) } : { path: name, namespace: 'fixture' });
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

const orderedChatNode = (id, key) => ({ id, name: id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], properties: {
    ordered_axis: 'timeline', ordered_kind: 'time', ordered_key: key, ordered_value: id,
} });
async function orderedMenu(ui, id = 'root', keyboard = false) {
    await act(async () => ui.container.querySelector(`[data-node-id="${id}"]`).dispatchEvent(keyboard
        ? new ui.dom.window.KeyboardEvent('keydown', { key: 'ContextMenu', bubbles: true })
        : new ui.dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 600, clientY: 280 })));
    return ui.container.querySelector('[role="menu"]');
}
async function showOrdered(ui, id = 'root') {
    const menu = await orderedMenu(ui, id); assert.ok(menu);
    await act(async () => menu.querySelector('[data-action="ordered-neighbors"]').click());
}
async function selectOrderedType(ui, label, id = null) {
    if (id == null) await act(async () => ui.container.querySelector('.chat-knowledge-canvas').dispatchEvent(
        new ui.dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 300, clientY: 160 })));
    else await orderedMenu(ui, id);
    const action = id == null ? 'ordered-skeleton' : 'ordered-nearest';
    await act(async () => ui.container.querySelector(`[data-action="${action}"]`).click());
    await ui.settle();
    const entry = ui.container.querySelector(`.knowledge-compact-submenu [data-label="${label}"]`);
    assert.ok(entry, `dynamic ordered type ${label} should be available`);
    await act(async () => entry.click());
}
const numericOrdered = (id, value) => ({ id, label: 'Priority', name: `优先级 ${value}`, labels: ['Knowledge', 'Priority', 'OrderedNode'], properties: {
    ordered_axis: 'priorities', ordered_kind: 'number', ordered_key: String(value), ordered_rank: value, ordered_value: value,
} });

test('blank chat canvas loads dynamic ordered types and bounded skeleton pages with reversible cursors', async t => {
    const calls = [], first = numericOrdered('priority-1', 1), second = numericOrdered('priority-2', 2);
    const ui = await setup(t, async (url, options) => {
        calls.push([url, options]);
        if (url === '/knowledge/ordered-types') return { databaseId: options.params.databaseId, orderedTypes: [{ label: 'Priority', displayName: '优先级', kind: 'number', count: 2 }] };
        const later = options.params.offset === 80;
        return { databaseId: options.params.databaseId, centerId: null, label: 'Priority', nodes: [later ? second : first],
            relationships: later ? [{ id: 'priority-next', source: first.id, target: second.id, type: 'NEXT_ORDERED' }] : [],
            completeParentIds: [], offset: options.params.offset, limit: 80, hasMore: !later, totalNodes: 2 };
    });
    const original = structuredClone(ui.msg.network);
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await selectOrderedType(ui, 'Priority');
    assert.deepEqual(calls[0][1].params, { databaseId: 'default', conversationId: 'conv' });
    assert.equal(calls[1][0], '/knowledge/ordered-graph');
    assert.deepEqual(calls[1][1].params, { databaseId: 'default', conversationId: 'conv', label: 'Priority', depth: 1, limit: 80, offset: 0 });
    assert.ok(ui.container.querySelector('[data-node-id="root"]')); assert.ok(ui.container.querySelector('[data-node-id="priority-1"]'));
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /还有更多/);
    await selectOrderedType(ui, 'Priority'); assert.equal(calls.at(-1)[1].params.offset, 80);
    assert.equal(ui.container.querySelectorAll('.ordered-link').length, 1);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="priority-2"]'), null); assert.ok(ui.container.querySelector('[data-node-id="priority-1"]'));
    await act(async () => ui.container.querySelector('[aria-label="重做图谱操作"]').click());
    assert.ok(ui.container.querySelector('[data-node-id="priority-2"]'));
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    await selectOrderedType(ui, 'Priority'); assert.equal(calls.at(-1)[1].params.offset, 80, 'undo restores the next-page cursor');
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="priority-1"]'), null);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.deepEqual(ui.msg.network, original);
});

test('ordinary chat node finds nearest dynamic ordered type by its actual evidence path and one undo', async t => {
    const calls = [], target = numericOrdered('priority-1', 1);
    const ui = await setup(t, async (url, options) => {
        calls.push([url, options]);
        if (url === '/knowledge/ordered-types') return { orderedTypes: [{ label: 'Priority', displayName: '优先级', kind: 'number', count: 1 }] };
        return { centerId: 'root', databaseId: options.params.databaseId, label: 'Priority', found: true, nearestHops: 2, hasMore: false,
            nodes: [target, { id: 'evidence', label: 'Thing', name: '中间证据' }], relationships: [
                { id: 'evidence-1', source: 'root', target: 'evidence', type: '依赖' },
                { id: 'evidence-2', source: 'evidence', target: target.id, type: '优先级' },
            ], anchors: [{ nodeId: target.id, hops: 2, nodeIds: ['root', 'evidence', target.id], relationshipIds: ['evidence-1', 'evidence-2'] }] };
    });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await selectOrderedType(ui, 'Priority', 'root');
    assert.equal(calls.at(-1)[0], '/knowledge/nodes/root/nearest-ordered');
    assert.deepEqual(calls.at(-1)[1].params, { databaseId: 'default', conversationId: 'conv', label: 'Priority', maxHops: 3, limit: 20 });
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 3);
    assert.equal(ui.container.querySelectorAll('.knowledge-edge').length, 2);
    assert.equal(ui.container.querySelectorAll('.ordered-link').length, 0, 'evidence expansion must not invent NEXT edges');
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /最近的有序节点（2 跳）/);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 1);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /已撤销找到最近的有序节点/);
});

test('chat nearest search reports an exhausted budget without claiming no match or changing the canvas', async t => {
    let found = false;
    const calls = [], ui = await setup(t, async (url, options) => {
        if (url === '/knowledge/ordered-types') return { orderedTypes: [{ label: 'Priority', kind: 'number' }] };
        calls.push([url, options]);
        return { databaseId: options.params.databaseId, centerId: 'root', found, nearestHops: found ? 1 : null,
            truncated: true, truncationReason: 'scan_limit', hasMore: true,
            nodes: found ? [numericOrdered('partial-priority', 1)] : [],
            relationships: found ? [{ id: 'partial-evidence', source: 'root', target: 'partial-priority', type: '优先级' }] : [] };
    });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await selectOrderedType(ui, 'Priority', 'root');
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /达到扫描预算.*缩小范围/);
    assert.doesNotMatch(ui.container.querySelector('.chat-knowledge-feedback').textContent, /没有.*有序节点/);
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 1);
    assert.equal(ui.container.querySelectorAll('.knowledge-edge').length, 0);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.deepEqual(calls[0][1].params, { databaseId: 'default', conversationId: 'conv', label: 'Priority', maxHops: 3, limit: 20 });
    found = true; await selectOrderedType(ui, 'Priority', 'root');
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /部分并列结果.*缩小范围/);
    assert.ok(ui.container.querySelector('[data-node-id="partial-priority"]'));
});

test('all ordered kinds use generic local skeleton on double-click while the menu can expand business associations', async t => {
    const calls = [], root = numericOrdered('root', 1), ui = await setup(t, async (url, options) => {
        calls.push([url, options]); return { centerId: 'root', databaseId: options.params.databaseId, nodes: [root], relationships: [], hasMore: false };
    });
    ui.msg.network.nodes = [root];
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls[0][0], '/knowledge/ordered-graph'); assert.equal(calls[0][1].params.label, 'Priority'); assert.equal(calls[0][1].params.nodeId, 'root');
    const menu = await orderedMenu(ui); await act(async () => menu.querySelector('[data-action="node-expand"]').click());
    assert.equal(calls.at(-1)[0], '/knowledge/nodes/root/graph'); assert.equal(calls.at(-1)[1].params.depth, 1);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true, 'repeated empty results do not create undo entries');
});

test('global chat skeleton requests deduplicate, cancel with undo, and ignore late responses across database scopes', async t => {
    let complete, signal, queries = 0;
    const ui = await setup(t, async (url, options) => {
        if (url === '/knowledge/ordered-types') return { orderedTypes: [{ label: 'Priority', kind: 'number' }] };
        signal = options.signal; queries++; return new Promise(resolve => { complete = resolve; });
    });
    ui.msg.network.databaseId = 'library-a';
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await selectOrderedType(ui, 'Priority'); await selectOrderedType(ui, 'Priority'); assert.equal(queries, 1);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(signal.aborted, true); assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /取消刚才的有序骨架请求/);
    await act(async () => complete({ databaseId: 'library-a', nodes: [numericOrdered('late-cancelled', 3)], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="late-cancelled"]'), null);
    await selectOrderedType(ui, 'Priority'); await switchDatabase(ui, 'library-b'); assert.equal(signal.aborted, true);
    assert.ok(ui.container.querySelector('.chat-knowledge-canvas'), 'a database without AI results still exposes a blank canvas');
    await act(async () => complete({ databaseId: 'library-a', nodes: [numericOrdered('late-other-db', 4)], relationships: [] }));
    await switchDatabase(ui, 'library-a');
    assert.equal(ui.container.querySelector('[data-node-id="late-other-db"]'), null);
});

test('chat ordered menu uses scoped immediate neighbors and one undo entry without changing double-click expansion', async t => {
    const root = orderedChatNode('root', '20'), previous = orderedChatNode('previous', '10'), next = orderedChatNode('next', '30'), calls = [];
    const ui = await setup(t, async (url, options) => {
        calls.push([url, options]);
        return url.endsWith('/ordered-neighbors') ? { databaseId: options.params.databaseId, centerId: 'root', previousId: 'previous', nextId: 'next', nodes: [root, previous, next], relationships: [
            { id: 'previous-root', source: 'previous', target: 'root', type: 'NEXT_ORDERED' }, { id: 'root-next', source: 'root', target: 'next', type: 'NEXT_ORDERED' },
        ] } : { nodes: [root, { id: 'far-entity', label: 'Event' }], relationships: [] };
    });
    ui.msg.network.nodes = [root, { id: 'unrelated', label: 'Event' }];
    const original = structuredClone(ui.msg.network);
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await showOrdered(ui);
    assert.equal(calls[0][0], '/knowledge/nodes/root/ordered-neighbors'); assert.deepEqual(calls[0][1].params, { databaseId: 'default', conversationId: 'conv' });
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 4); assert.equal(ui.container.querySelectorAll('.ordered-link').length, 2);
    assert.ok(ui.container.querySelector('[data-node-id="unrelated"]')); assert.deepEqual(ui.msg.network, original);
    await showOrdered(ui); assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /已在画布中显示/);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="next"]'), null); assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /已撤销展示前后顺序节点/);
    await act(async () => ui.container.querySelector('[aria-label="重做图谱操作"]').click()); assert.ok(ui.container.querySelector('[data-node-id="previous"]'));
    await act(async () => ui.container.querySelector('[data-node-id="unrelated"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls.at(-1)[0], '/knowledge/nodes/unrelated/graph'); assert.equal(calls.at(-1)[1].params.depth, 1);
    assert.ok(ui.container.querySelector('[data-node-id="far-entity"]'));
});

test('chat ordered menu reports empty results without fabricating segments and adds edge-only results to history', async t => {
    const root = orderedChatNode('root', '20'), next = orderedChatNode('next', '30');
    let empty = true;
    const ui = await setup(t, async () => ({ centerId: 'root', previousId: null, nextId: empty ? null : 'next', nodes: empty ? [root] : [root, next],
        relationships: empty ? [] : [{ id: 'actual-next', source: 'root', target: 'next', type: 'NEXT_ORDERED' }] }));
    ui.msg.network.nodes = [root, next];
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await showOrdered(ui); assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /没有可展示/);
    assert.equal(ui.container.querySelectorAll('.knowledge-edge').length, 0); assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    empty = false; await showOrdered(ui); assert.equal(ui.container.querySelectorAll('.ordered-link').length, 1);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 2); assert.equal(ui.container.querySelectorAll('.ordered-link').length, 0);
});

test('ordered requests deduplicate against all-neighbor expansion and can be cancelled with undo', async t => {
    let resolveRequest, signal, count = 0;
    const ui = await setup(t, (_url, options) => { signal = options.signal; count++; return new Promise(resolve => { resolveRequest = resolve; }); });
    ui.msg.network.nodes = [orderedChatNode('root', '20')];
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await showOrdered(ui); await showOrdered(ui);
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(count, 1);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click()); assert.equal(signal.aborted, true);
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /取消刚才的顺序节点请求/);
    await act(async () => resolveRequest({ centerId: 'root', nodes: [orderedChatNode('late', '30')], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="late"]'), null);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
});

test('chat ordered menu supports keyboard closing and disappears when database scope changes', async t => {
    let complete, signal;
    const ui = await setup(t, (_url, options) => { signal = options.signal; return new Promise(resolve => { complete = resolve; }); });
    ui.msg.network = { databaseId: 'library-a', nodes: [orderedChatNode('root', '20')], relationships: [], databaseViews: {
        'library-b': { databaseId: 'library-b', nodes: [{ id: 'b-root', label: 'Event' }], relationships: [] },
    } };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.ok(await orderedMenu(ui, 'root', true));
    await act(async () => ui.dom.window.document.activeElement.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    assert.equal(ui.container.querySelector('[role="menu"]'), null); assert.equal(ui.dom.window.document.activeElement.dataset.nodeId, 'root');
    await showOrdered(ui); assert.ok(await orderedMenu(ui));
    await switchDatabase(ui, 'library-b'); assert.equal(signal.aborted, true); assert.equal(ui.container.querySelector('[role="menu"]'), null);
    await act(async () => complete({ databaseId: 'library-a', centerId: 'root', nodes: [orderedChatNode('private', '30')], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="private"]'), null); assert.ok(ui.container.querySelector('[data-node-id="b-root"]'));
    assert.equal(ui.container.querySelector('.chat-knowledge-feedback'), null);
});

test('time double-click expands a local hierarchical region with undo while ordinary nodes keep event expansion', async t => {
    const full = orderedTimeGraph(), center = full.nodes.find(node => node.id === 'day'), calls = [];
    const ui = await setup(t, async (url, options) => { calls.push([url, options]); return {
        centerId: 'day', databaseId: options.params.databaseId, nodes: full.nodes.filter(node => node.id !== 'event'),
        relationships: full.relationships.filter(edge => edge.id !== 'event-time'), completeParentIds: full.completeParentIds, hasMore: false,
    }; });
    ui.msg.network.nodes = [center, { id: 'event', label: 'Event', name: '已有事件' }];
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="day"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls[0][0], '/knowledge/ordered-graph'); assert.equal(calls[0][1].params.nodeId, 'day'); assert.equal(calls[0][1].params.label, 'Time'); assert.equal(calls[0][1].params.depth, 1); assert.equal(calls[0][1].params.limit, 80);
    assert.ok(ui.container.querySelector('[data-node-id="month"]')); assert.ok(ui.container.querySelector('[data-node-id="event"]'));
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /有序骨架/);
    assert.equal(ui.container.querySelector('[data-node-id="day"] text').textContent, '2026年9月12日');
    assert.ok(ui.container.querySelectorAll('path[data-layout-only]').length > 0);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="month"]'), null); assert.ok(ui.container.querySelector('[data-node-id="event"]'));
    assert.equal(ui.container.querySelectorAll('path[data-layout-only]').length, 0);
    assert.match(ui.container.querySelector('.chat-knowledge-feedback').textContent, /已撤销展开有序骨架/);
});

test('chat paused single-time dragging records one undoable gesture and retains full fork captions', async t => {
    const ui = await setup(t, async () => { throw new Error('dragging is local'); }), full = orderedTimeForks();
    ui.msg.network = full;
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    const graph = ui.store.get('nvlInstance');
    await act(async () => [...ui.container.querySelectorAll('button')].find(button => button.textContent === '暂停动画').click());
    const before = graph.getNodePositions(), selected = ui.container.querySelector('[data-node-id="fork-noon"]');
    const pointer = (target, type, x, y) => {
        const event = new ui.dom.window.Event(type, { bubbles: true, cancelable: true });
        Object.assign(event, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: x, clientY: y }); target.dispatchEvent(event);
    };
    await act(async () => { pointer(selected, 'pointerdown', 200, 130); pointer(ui.dom.window, 'pointermove', 225, 165); });
    const after = graph.getNodePositions();
    assert.notDeepEqual(after.find(node => node.id === 'fork-noon'), before.find(node => node.id === 'fork-noon'));
    for (const node of before) if (node.id !== 'fork-noon') assert.deepEqual(after.find(value => value.id === node.id), node);
    assert.equal(ui.container.querySelector('[data-node-id="fork-afternoon"] text').textContent, '2026年10月11日14:00:00');
    assert.match(ui.container.querySelector('.chat-knowledge-heading small').textContent, new RegExp(`${full.relationships.length} 条关系`));
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.deepEqual(graph.getNodePositions(), before);
    await act(async () => { pointer(ui.dom.window, 'pointermove', 350, 220); pointer(ui.dom.window, 'pointerup', 350, 220); });
    assert.deepEqual(graph.getNodePositions(), before, 'undo during a held drag cancels the old pointer gesture');
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    await act(async () => ui.container.querySelector('[aria-label="重做图谱操作"]').click());
    assert.deepEqual(graph.getNodePositions(), after);
});

test('a completion-only time region response updates projection and creates exactly one reversible history entry', async t => {
    const full = orderedTimeForks(), ui = await setup(t, async (_url, options) => ({
        databaseId: options.params.databaseId, centerId: 'fork-day11', nodes: [], relationships: [], completeParentIds: ['fork-day11'],
    }));
    ui.msg.network = { ...full, completeParentIds: [] };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    const before = ui.container.querySelectorAll('[data-route-kind="join"]').length;
    const expand = async () => act(async () => ui.container.querySelector('[data-node-id="fork-day11"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    await expand();
    const after = ui.container.querySelectorAll('[data-route-kind="join"]').length;
    assert.ok(after > before, 'complete membership enables visual joining without adding graph objects');
    assert.match(ui.container.querySelector('.chat-knowledge-heading small').textContent, new RegExp(`${full.nodes.length} 个节点 · ${full.relationships.length} 条关系`));
    assert.equal(ui.container.querySelector('[data-edge-id="next-fork-day11"]').getAttribute('d'), '');
    await expand();
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelectorAll('[data-route-kind="join"]').length, before);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    await act(async () => ui.container.querySelector('[aria-label="重做图谱操作"]').click());
    assert.equal(ui.container.querySelectorAll('[data-route-kind="join"]').length, after);
});

test('ordinary related queries close completed time branches and later short AI results preserve joins through undo', async t => {
    const full = orderedTimeGraph(), calls = [];
    const ui = await setup(t, async (url, options) => {
        calls.push([url, options]); return { ...full, databaseId: options.params.databaseId };
    });
    ui.msg.network = { ...full, completeParentIds: [] };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    const joins = () => ui.container.querySelectorAll('[data-route-kind="join"]').length;
    assert.equal(joins(), 0, 'visible child nodes alone cannot prove completion');
    await act(async () => ui.container.querySelector('[data-node-id="event"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    await ui.settle();
    assert.equal(calls[0][0], '/knowledge/nodes/event/graph'); assert.ok(joins() >= 2);
    const completeCount = joins();
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click()); await ui.settle();
    assert.equal(joins(), 0);
    await act(async () => ui.container.querySelector('[aria-label="重做图谱操作"]').click()); await ui.settle();
    assert.equal(joins(), completeCount);
    ui.msg.network = mergeNetworkData(ui.msg.network, { nodes: [{ id: 'short-query', label: 'Event' }], relationships: [], completeParentIds: [] });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(joins(), completeCount);
});

test('a live graph publication opens a missing preview and follows later AI database scopes without reloading', async t => {
    const ui = await setup(t, async () => { throw new Error('publishing a graph must not query node details'); });
    const initialMessage = { ...ui.msg };
    delete initialMessage.network;
    ui.msg = initialMessage;
    const renderMessage = () => ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' }));
    await renderMessage(); await ui.settle();
    assert.equal(ui.container.querySelector('[aria-label="知识图谱记忆"]'), null);
    assert.equal(ui.store.has('nvlInstance'), false);

    const publish = async network => {
        ui.msg = { ...ui.msg, network: mergeNetworkData(ui.msg.network, network) };
        await renderMessage(); await ui.settle();
    };
    await publish({ databaseId: 'library-a', nodes: [
        { id: 'shared', name: '库 A 实时节点', label: 'Event' },
        { id: 'only-a', name: '库 A 关联', label: 'Thing' },
    ], relationships: [{ id: 'edge', from: 'shared', to: 'only-a', type: '支持' }] });
    const preview = ui.container.querySelector('[aria-label="知识图谱记忆"]');
    assert.ok(preview, 'the existing message must show a preview as soon as its graph arrives');
    assert.equal(ui.container.querySelector('select').value, 'library-a');
    assert.match(ui.container.querySelector('.chat-knowledge-heading small').textContent, /2 个节点 · 1 条关系/);
    assert.match(ui.container.querySelector('[data-node-id="shared"] title').textContent, /库 A 实时节点/);
    assert.ok(ui.container.querySelector('[data-edge-id="edge"]'));
    assert.equal(ui.store.get('nvlInstance').databaseId, 'library-a');

    await publish({ databaseId: 'library-b', nodes: [
        { id: 'shared', name: '库 B 实时节点', label: 'Fact' },
        { id: 'only-b', name: '库 B 关联', label: 'Thing' },
    ], relationships: [{ id: 'edge', from: 'shared', to: 'only-b', type: '解释' }] });
    assert.equal(ui.container.querySelector('[aria-label="知识图谱记忆"]'), preview, 'database events update the mounted preview');
    assert.equal(ui.container.querySelector('select').value, 'library-b');
    assert.match(ui.container.querySelector('[data-node-id="shared"] title').textContent, /库 B 实时节点/);
    assert.equal(ui.container.querySelector('[data-node-id="only-a"]'), null);
    assert.ok(ui.container.querySelector('[data-node-id="only-b"]'));
    assert.match(ui.container.querySelector('[data-edge-id="edge"] title').textContent, /解释/);
    assert.equal(ui.store.get('nvlInstance').databaseId, 'library-b');
    assert.equal(ui.msg.id, initialMessage.id, 'a live publication does not need a new message or navigation');
});

test('chat expansion can be undone and redone with shortcuts without fetching or reverting newer AI results', async t => {
    let calls = 0;
    const ui = await setup(t, async () => { calls++; return { nodes: [{ id: 'root', label: 'Event' }, { id: 'manual', name: '手动关联', label: 'Thing' }], relationships: [{ id: 'manual-edge', source: 'root', target: 'manual', type: '关联' }] }; });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.ok(ui.container.querySelector('[data-node-id="manual"]'));
    ui.msg = { ...ui.msg, network: mergeNetworkData(ui.msg.network, { nodes: [{ id: 'ai-new', name: '新 AI 结果', label: 'Event' }, { id: 'root', name: 'AI 更新的名称', label: 'Event' }], relationships: [] }) };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' }));
    assert.match(ui.container.querySelector('[data-node-id="root"] title').textContent, /AI 更新的名称/);
    const shortcut = async shiftKey => act(async () => {
        const event = new ui.dom.window.KeyboardEvent('keydown', { key: 'z', ctrlKey: true, shiftKey, bubbles: true, cancelable: true });
        ui.container.querySelector('.chat-knowledge-canvas').dispatchEvent(event); assert.equal(event.defaultPrevented, true);
    });
    await shortcut(false);
    assert.equal(ui.container.querySelector('[data-node-id="manual"]'), null);
    assert.equal(ui.container.querySelector('[data-edge-id="manual-edge"]'), null);
    assert.ok(ui.container.querySelector('[data-node-id="ai-new"]'), 'undo must retain new AI results');
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    await shortcut(true);
    assert.ok(ui.container.querySelector('[data-node-id="manual"]'));
    assert.ok(ui.container.querySelector('[data-node-id="ai-new"]'));
    assert.match(ui.container.querySelector('[data-node-id="root"] title').textContent, /AI 更新的名称/, 'redo must not restore stale AI node attributes');
    assert.equal(calls, 1, 'redo restores local state without repeating the query');
    const select = ui.container.querySelector('select');
    const inputUndo = new ui.dom.window.KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true, cancelable: true });
    select.dispatchEvent(inputUndo); assert.equal(inputUndo.defaultPrevented, false);
    assert.ok(ui.container.querySelector('[data-node-id="manual"]'));
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="manual"]'), null);
});

test('undo cancels a pending expansion and ignores its late response', async t => {
    let resolveRequest, signal;
    const ui = await setup(t, (_url, options) => { signal = options.signal; return new Promise(resolve => resolveRequest = resolve); });
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, false);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(signal.aborted, true);
    await act(async () => resolveRequest({ nodes: [{ id: 'late', label: 'Event' }], relationships: [] }));
    assert.equal(ui.container.querySelector('[data-node-id="late"]'), null);
    assert.ok(ui.container.querySelector('[data-node-id="root"]'));
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.equal(ui.container.querySelector('[aria-label="重做图谱操作"]').disabled, true);
});

test('concurrent expansion validates the combined canvas limit before committing history', async t => {
    const replies = [];
    const ui = await setup(t, () => new Promise(resolve => replies.push(resolve)));
    ui.msg.network.nodes = Array.from({ length: 250 }, (_, id) => ({ id: `root-${id}`, name: `节点 ${id}`, label: 'Event' }));
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => {
        for (let id = 0; id < 2; id++) ui.container.querySelector(`[data-node-id="root-${id}"]`).dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true }));
    });
    await act(async () => {
        replies.forEach((resolve, batch) => resolve({ nodes: Array.from({ length: 100 }, (_, id) => ({ id: `added-${batch}-${id}`, label: 'Thing' })), relationships: [] }));
    });
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 350);
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /400/);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelectorAll('.knowledge-node').length, 250);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
});

test('chat history remains isolated by database and no-op expansion does not add an undo step', async t => {
    let calls = 0;
    const ui = await setup(t, async (_url, options) => { calls++; return { databaseId: options.params.databaseId, nodes: [{ id: 'root', name: '根节点', label: 'Event' }, { id: 'manual', name: '手动关联', label: 'Thing' }], relationships: [] }; });
    ui.msg.network.databaseId = 'library-a';
    ui.msg.network.databaseViews = { 'library-b': { databaseId: 'library-b', nodes: [{ id: 'b-root', label: 'Event' }], relationships: [] } };
    await ui.render(React.createElement(Graph, { msg: ui.msg, conversationId: 'conv' })); await ui.settle();
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    await act(async () => ui.container.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true })));
    assert.equal(calls, 2);
    await switchDatabase(ui, 'library-b'); await ui.settle();
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true);
    assert.ok(ui.container.querySelector('[data-node-id="b-root"]'));
    await switchDatabase(ui, 'library-a'); await ui.settle();
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, false);
    await act(async () => ui.container.querySelector('[aria-label="撤销图谱操作"]').click());
    assert.equal(ui.container.querySelector('[data-node-id="manual"]'), null);
    assert.equal(ui.container.querySelector('[aria-label="撤销图谱操作"]').disabled, true, 'no-op query must not consume another history entry');
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
