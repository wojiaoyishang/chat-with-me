import assert from 'node:assert/strict';
import test from 'node:test';
import { bindingState, layoutGraph, scopedGraph, toggleBinding, updateBindingMetadata, updateGraphPositions } from '../src/components/configuration/nodeGraphModel.js';

test('graph fields require server-supplied targets and do not guess file or seed semantics', () => {
  const unspecified = { name: 'image_seed', valueType: 'text' };
  assert.deepEqual(toggleBinding([], unspecified, true), []);
  const field = {
    ...unspecified,
    targets: [{ nodeId: '171:107', field: 'values.a' }],
    allowedKinds: [{ value: 'text', label: '普通文本' }],
    defaultBinding: { name: 'server_identity', kind: 'text', required: false },
  };
  const bindings = toggleBinding([], field, true);
  assert.deepEqual(bindings, [{ name: 'server_identity', kind: 'text', required: false, nodeId: '171:107', field: 'values.a' }]);
  assert.throws(() => toggleBinding([], field, true, { name: 'wrong', kind: 'image' }), /不适用/);
  assert.deepEqual(toggleBinding(bindings, { ...field, linked: true }, false), bindings);
});

test('one explicit field can bind multiple targets and edits share one parameter identity', () => {
  const field = {
    targets: [{ nodeId: '2', field: 'text' }, { nodeId: '5', field: 'text' }],
    defaultBinding: { name: 'prompt', label: '提示', kind: 'text' },
  };
  let bindings = toggleBinding([], field, true);
  bindings.push({ nodeId: '9', field: 'description', name: 'prompt', label: '提示', kind: 'text' });
  assert.equal(bindingState(bindings, field).complete, true);
  bindings = updateBindingMetadata(bindings, field, { description: '共同说明' });
  assert.equal(bindings.filter((entry) => entry.description === '共同说明').length, 3);
  bindings = updateBindingMetadata(bindings, field, { name: 'separate' });
  assert.deepEqual(bindings.map((entry) => entry.name), ['separate', 'separate', 'prompt']);
  assert.equal(toggleBinding(bindings, field, false).length, 1);
});

test('scope projection keeps opaque execution IDs and does not rewrite executable links', () => {
  const graph = {
    nodes: [{ id: '1' }, { id: '171', subgraphId: '171' }, { id: '171:107', scopeId: '171' }],
    scopes: [{ id: '171', title: '子图', parentId: 'root', entryNodeId: '171' }],
    edges: [{ id: 'link', source: '1', target: '171:107', targetHandle: 'values.a' }],
  };
  const original = structuredClone(graph);
  const layer = scopedGraph(graph, 'root');
  assert.equal(layer.edges[0].target, '171');
  assert.equal(layer.edges[0].targetHandle, 'scope-in');
  assert.deepEqual(graph, original);
});

test('moving diagram nodes preserves prompt and canvas metadata, including child positions', () => {
  const graph = {
    prompt: { '171:107': { inputs: { values: ['4', 0] } } },
    nodes: [{ id: '171:107' }, { id: '1' }],
    uiWorkflow: { nodes: [{ id: 1, type: 'Custom', widgets_values: ['original'], pos: [1, 2] }], extra: { untouched: true } },
  };
  const original = structuredClone(graph);
  const moved = updateGraphPositions(graph, [{ id: '171:107', position: { x: 300, y: 150 } }, { id: '1', position: { x: 10, y: 20 } }]);
  assert.deepEqual(moved.prompt, original.prompt);
  assert.deepEqual(moved.uiWorkflow.nodes[0].widgets_values, ['original']);
  assert.deepEqual(moved.uiWorkflow._cwm.positions['171:107'], [300, 150]);
  assert.equal(moved.uiWorkflow.nodes.length, 1);
  assert.deepEqual(graph, original);
  assert.deepEqual(layoutGraph([{ id: 'a' }, { id: 'b' }], [{ source: 'a', target: 'b' }]).map((node) => node.position.x), [0, 300]);
});
