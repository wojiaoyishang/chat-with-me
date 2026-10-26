import test from "node:test";
import assert from "node:assert/strict";
import {
  createWorkflowNode,
  initializeGraph,
  normalizeGraph,
  pasteWorkflowSelection,
  SUBGRAPH_CANVAS_DEFINITION,
  catalogNode,
} from "../src/features/workflows/workflowModel.js";
import {
  addWorkflowInterface,
  connectWorkflowInterface,
  updateWorkflowInterface,
  workflowInterfaceId,
  workflowInterfaceProjection,
} from "../src/features/workflows/workflowInterfaceModel.js";
const definitions = [
  {
    kind: "processor",
    version: 1,
    inputs: [{ name: "text", type: "text", schema: { type: "string" } }],
    outputs: [{ name: "result", type: "text", schema: { type: "string" } }],
  },
];
function fixture() {
  const root = normalizeGraph();
  const group = createWorkflowNode(SUBGRAPH_CANVAS_DEFINITION, root);
  group.subgraph.initialized = true;
  group.subgraph.graph.nodes = [
    {
      id: "child",
      kind: "processor",
      version: 1,
      inputs: { text: { type: "literal", value: "old" } },
      config: {},
      position: { x: 100, y: 100 },
    },
  ];
  root.nodes.push(group);
  return root;
}
test("virtual pills only exist within a subgraph, with stable independent IDs", () => {
  let root = fixture();
  const path = [root.nodes[0].id];
  assert.deepEqual(workflowInterfaceProjection(root, [], definitions), {
    nodes: [],
    edges: [],
  });
  assert.throws(
    () => addWorkflowInterface(root, [], "inputs"),
    /只能在子图内部/,
  );
  const added = addWorkflowInterface(root, path, "inputs", { x: -100, y: 40 });
  root = added.graph;
  const entry = root.nodes[0].subgraph.interface.inputs[0];
  const view = workflowInterfaceProjection(root, path, definitions);
  assert.equal(view.nodes[0].id, workflowInterfaceId("inputs", entry.id));
  assert.equal(view.nodes[0].id, added.id);
  assert.deepEqual(view.nodes[0].position, { x: -100, y: 40 });
  assert.equal(root.nodes[0].subgraph.graph.nodes.length, 1);
  assert.equal(
    catalogNode(definitions, root.nodes[0], root).inputs[0].name,
    entry.id,
  );
});
test("pills wire the real internal endpoints and propagate types", () => {
  let root = fixture();
  const path = [root.nodes[0].id];
  root = addWorkflowInterface(root, path, "inputs").graph;
  root = addWorkflowInterface(root, path, "outputs").graph;
  const input = root.nodes[0].subgraph.interface.inputs[0].id,
    output = root.nodes[0].subgraph.interface.outputs[0].id;
  root = connectWorkflowInterface(
    root,
    path,
    {
      source: workflowInterfaceId("inputs", input),
      sourceHandle: "value",
      target: "child",
      targetHandle: "text",
    },
    definitions,
  );
  root = connectWorkflowInterface(
    root,
    path,
    {
      source: "child",
      sourceHandle: "result",
      target: workflowInterfaceId("outputs", output),
      targetHandle: "value",
    },
    definitions,
  );
  assert.deepEqual(root.nodes[0].subgraph.graph.nodes[0].inputs, {});
  assert.equal(
    workflowInterfaceProjection(root, path, definitions).edges.length,
    2,
  );
  assert.equal(
    catalogNode(definitions, root.nodes[0], root).outputs[0].type,
    "text",
  );
});
test("renaming never rewires identity; deletion removes corresponding bindings", () => {
  let root = fixture();
  const path = [root.nodes[0].id];
  root = addWorkflowInterface(root, path, "inputs").graph;
  const id = root.nodes[0].subgraph.interface.inputs[0].id;
  root.nodes[0].inputs[id] = { type: "literal", value: "value" };
  root.edges = [
    {
      id: "edge",
      source: "outer",
      sourcePort: "text",
      target: path[0],
      targetPort: id,
    },
  ];
  root = updateWorkflowInterface(root, path, "inputs", id, {
    name: "prompt",
    title: "提示",
  });
  assert.equal(root.edges[0].targetPort, id);
  assert.equal(root.nodes[0].inputs[id].value, "value");
  assert.equal(
    workflowInterfaceProjection(root, path, definitions).nodes[0].id,
    workflowInterfaceId("inputs", id),
  );
  root = updateWorkflowInterface(root, path, "inputs", id, null);
  assert.equal(root.edges.length, 0);
  assert.equal(root.nodes[0].inputs[id], undefined);
});
test("deleting an interface still referenced by an ancestor is rejected", () => {
  let root = fixture();
  const path = [root.nodes[0].id];
  root = addWorkflowInterface(root, path, "inputs").graph;
  const inner = root.nodes[0],
    id = inner.subgraph.interface.inputs[0].id;
  root = fixture();
  const outer = root.nodes[0];
  outer.subgraph.graph.nodes = [inner];
  outer.subgraph.interface.inputs = [
    {
      id: "outer-input",
      name: "outer_input",
      target: { nodeId: inner.id, port: id },
    },
  ];
  const nested = [outer.id, inner.id];
  root = updateWorkflowInterface(root, nested, "inputs", id, {
    name: "renamed",
  });
  assert.equal(root.nodes[0].subgraph.interface.inputs[0].target.port, id);
  assert.throws(
    () => updateWorkflowInterface(root, nested, "inputs", id, null),
    /外层/,
  );
});
test("virtual executable nodes are rejected on import and paste", () => {
  const fake = { id: "bad", kind: "interface_inputs", version: 1 };
  assert.throws(
    () => initializeGraph({ nodes: [fake] }, definitions),
    /不能作为执行节点/,
  );
  assert.throws(
    () =>
      pasteWorkflowSelection(normalizeGraph(), { nodes: [fake], edges: [] }),
    /不能作为执行节点/,
  );
});
