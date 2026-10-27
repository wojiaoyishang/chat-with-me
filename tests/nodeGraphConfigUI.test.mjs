import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act, useState } from 'react';

const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
globalThis.requestAnimationFrame = callback => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { createRoot } = await import('react-dom/client');

await build({ entryPoints: ['src/components/configuration/NodeGraphField.jsx'], outfile: 'temp/node-graph-ui.mjs', bundle: true, format: 'esm', platform: 'node', packages: 'external', jsx: 'automatic', plugins: [{ name: 'graph-controls', setup(builder) {
  builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
  builder.onResolve({ filter: /\.css$/ }, () => ({ path: 'css', namespace: 'empty' }));
  builder.onLoad({ filter: /.*/, namespace: 'empty' }, () => ({ contents: '' }));
  builder.onResolve({ filter: /^@xyflow\/react$/ }, () => ({ path: 'flow', namespace: 'mock' }));
  builder.onResolve({ filter: /^@\// }, ({ path: name }) => name.includes('/components/ui/') ? ({ path: name, namespace: 'mock' }) : ({ path: path.resolve('src', name.slice(2)) }));
  builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => {
    if (name === 'flow') return { loader: 'jsx', contents: `
      import React,{useState} from 'react';
      const flow={fitView:()=>{},getNodes:()=>globalThis.graphUI.nodes};
      export const useReactFlow=()=>flow,useNodesInitialized=()=>true,useNodesState=(initial)=>{const [nodes,setNodes]=useState(initial);return [nodes,setNodes,()=>{}];};
      export const ReactFlowProvider=({children})=><>{children}</>,Position={Left:'left',Right:'right'},Handle=()=>null,Background=()=>null,Controls=()=>null;
      export function ReactFlow(props){globalThis.graphUI.props=props;globalThis.graphUI.nodes=props.nodes;return <div>{props.nodes.map(node=><button key={node.id} data-node={node.id} onClick={event=>props.onNodeClick(event,node)} onDoubleClick={event=>props.onNodeDoubleClick(event,node)}>{node.data.node.title}</button>)}</div>;}
    ` };
    if (name.endsWith('/dialog')) return { loader: 'jsx', contents: 'export const Dialog=({open,children})=>open?<div>{children}</div>:null;export const DialogContent=({children})=><div role="dialog">{children}</div>;export const DialogHeader=({children})=><header>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;' };
    if (name.endsWith('/button')) return { loader: 'jsx', contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;' };
    if (name.endsWith('/badge')) return { loader: 'jsx', contents: 'export const Badge=({children,variant})=><span>{children}</span>;' };
    if (name.endsWith('/input')) return { loader: 'jsx', contents: 'export const Input=props=><input {...props}/>;' };
    if (name.endsWith('/checkbox') || name.endsWith('/switch')) return { loader: 'jsx', contents: 'export const Checkbox=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked===true} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;export const Switch=Checkbox;' };
    if (name.endsWith('/select')) return { loader: 'jsx', contents: 'export const Select=({children})=><div>{children}</div>;export const SelectContent=Select,SelectTrigger=Select,SelectValue=()=>null,SelectItem=({children})=><span>{children}</span>;' };
    throw new Error(`Unexpected graph dependency ${name}`);
  });
} }] });
const { default: NodeGraphField } = await import('../temp/node-graph-ui.mjs');

const fixture = () => ({
  prompt: { '171:107': { inputs: { 'values.a': 'original' } } },
  nodes: [
    { id: '1', title: '参数节点', inputs: [{ name: 'field', label: '共用提示', value: '原文', bindable: true, targets: [{ nodeId: '2', field: 'text' }, { nodeId: '5', field: 'text' }], defaultBinding: { name: 'shared', kind: 'text' }, allowedKinds: [{ value: 'text' }], parameterOptions: [{ name: 'description', type: 'text' }] }, { name: 'upstream', label: '上游值', value: ['7', 0], linked: true }] },
    { id: '171', title: '可进入分组', subgraphId: '171' },
    { id: '171:107', title: '内部产物', scopeId: '171', inputs: [], outputSelectable: true, defaultOutput: { kind: 'auto' }, outputOptions: [] },
  ],
  scopes: [{ id: '171', title: '子流程', parentId: 'root', entryNodeId: '171' }],
  edges: [{ source: '1', target: '171:107', targetHandle: 'values.a' }],
  bindings: [], outputBindings: [],
});
const click = async node => { assert.ok(node); await act(async () => node.click()); };
const button = text => [...document.querySelectorAll('button')].find(node => node.textContent.trim() === text);
async function mount(readOnly = false) {
  globalThis.graphUI = {};
  const root = createRoot(document.getElementById('root'));
  function Host() {
    const [graph, setGraph] = useState(fixture());
    graphUI.value = graph;
    return React.createElement(NodeGraphField, { item: { readOnly }, value: graph, onChange: setGraph, context: {}, renderFields: (fields, value, onChange) => React.createElement('button', { onClick: () => onChange({ ...value, description: '共同说明' }) }, '修改参数元信息') });
  }
  await act(async () => root.render(React.createElement(Host)));
  await click(button('打开图配置'));
  return async () => { await act(async () => root.unmount()); };
}

test('graph control exposes explicit many-target bindings through the shared parameter form', async () => {
  const close = await mount();
  try {
    await click(document.querySelector('[data-node="1"]'));
    assert.match(document.body.textContent, /来自上游/);
    assert.equal(document.querySelectorAll('input[type="checkbox"]').length, 1);
    await click(document.querySelector('[aria-label="开放 共用提示"]'));
    assert.deepEqual(graphUI.value.bindings.map(row => [row.nodeId, row.field]), [['2', 'text'], ['5', 'text']]);
    await click(button('修改参数元信息'));
    assert.ok(graphUI.value.bindings.every(row => row.description === '共同说明'));
  } finally { await close(); }
});

test('scope navigation, output selection and layout keep opaque execution IDs intact', async () => {
  const close = await mount();
  try {
    await click(document.querySelector('[data-node="171"]'));
    await click(button('进入子图'));
    assert.ok(document.querySelector('[data-node="171:107"]'));
    assert.equal(document.querySelector('[data-node="1"]'), null);
    await click(document.querySelector('[data-node="171:107"]'));
    await click(document.querySelector('aside input[type="checkbox"]'));
    assert.deepEqual(graphUI.value.outputBindings, [{ kind: 'auto', nodeId: '171:107' }]);
    const moved = graphUI.nodes.map(node => ({ ...node, position: { x: 425, y: 120 } }));
    await act(async () => { graphUI.nodes = moved; graphUI.props.onNodeDragStop(); });
    assert.deepEqual(graphUI.value.uiWorkflow._cwm.positions['171:107'], [425, 120]);
    assert.deepEqual(graphUI.value.prompt, fixture().prompt);
  } finally { await close(); }
});

test('read-only graph remains navigable without editable bindings or drag writes', async () => {
  const close = await mount(true);
  try {
    assert.equal(graphUI.props.nodesDraggable, false);
    await click(document.querySelector('[data-node="1"]'));
    assert.equal(document.querySelector('[aria-label="开放 共用提示"]').disabled, true);
    assert.deepEqual(graphUI.value.bindings, []);
  } finally { await close(); }
});
