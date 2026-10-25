import test from "node:test";
import assert from "node:assert/strict";
import {
  catalogNode,
  createWorkflowNode,
  initializeGraph,
  normalizeGraph,
  pasteWorkflowSelection,
  SUBGRAPH_CANVAS_DEFINITION,
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

test("public parameter pills exist only in subgraph projection and never in runtime nodes", () => {
  let root = fixture();
  assert.deepEqual(workflowInterfaceProjection(root, [], definitions), {
    nodes: [],
    edges: [],
  });
  assert.throws(
    () => addWorkflowInterface(root, [], "inputs"),
    /只能在子图内部/,
  );
  const added = addWorkflowInterface(root, ["subgraph-1"], "inputs", {
    x: -100,
    y: 40,
  });
  root = added.graph;
  const projection = workflowInterfaceProjection(
    root,
    ["subgraph-1"],
    definitions,
  );
  assert.equal(projection.nodes[0].id, added.id);
  assert.deepEqual(projection.nodes[0].position, { x: -100, y: 40 });
  assert.equal(root.nodes[0].subgraph.graph.nodes.length, 1);
  assert.equal(
    catalogNode(definitions, root.nodes[0], root).inputs[0].type,
    "any",
  );
});

test("connecting input/output pills updates outer contracts and clears conflicting input bindings", () => {
  let root = addWorkflowInterface(fixture(), ["subgraph-1"], "inputs").graph;
  root = addWorkflowInterface(root, ["subgraph-1"], "outputs").graph;
  root = connectWorkflowInterface(
    root,
    ["subgraph-1"],
    {
      source: workflowInterfaceId("inputs", "input_1"),
      sourceHandle: "value",
      target: "child",
      targetHandle: "text",
    },
    definitions,
  );
  root = connectWorkflowInterface(
    root,
    ["subgraph-1"],
    {
      source: "child",
      sourceHandle: "result",
      target: workflowInterfaceId("outputs", "output_1"),
      targetHandle: "value",
    },
    definitions,
  );
  const group = root.nodes[0],
    projected = workflowInterfaceProjection(root, [group.id], definitions);
  assert.equal(group.subgraph.graph.nodes[0].inputs.text, undefined);
  assert.equal(projected.edges.length, 2);
  const contract = catalogNode(definitions, group, root);
  assert.equal(contract.inputs[0].type, "text");
  assert.equal(contract.outputs[0].type, "text");
  assert.deepEqual(group.subgraph.interface.inputs[0].target, {
    nodeId: "child",
    port: "text",
  });
  assert.equal(group.subgraph.graph.edges.length, 0);
});

test("renaming and removing a pill rewires outer edges, literals and nested public references", () => {
  let root = addWorkflowInterface(fixture(), ["subgraph-1"], "inputs").graph;
  root.nodes[0].inputs.input_1 = { type: "literal", value: "value" };
  root.edges = [
    {
      id: "edge",
      source: "outer",
      sourcePort: "text",
      target: "subgraph-1",
      targetPort: "input_1",
    },
  ];
  root = updateWorkflowInterface(root, ["subgraph-1"], "inputs", "input_1", {
    name: "prompt",
    title: "提示",
  });
  assert.equal(root.edges[0].targetPort, "prompt");
  assert.equal(root.nodes[0].inputs.prompt.value, "value");
  root = updateWorkflowInterface(
    root,
    ["subgraph-1"],
    "inputs",
    "prompt",
    null,
  );
  assert.equal(root.edges.length, 0);
  assert.equal(root.nodes[0].inputs.prompt, undefined);
  assert.equal(root.nodes[0].subgraph.interface.inputs.length, 0);
});

test("fake executable interface nodes are rejected on import and paste", () => {
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

test("nested public parameter renames propagate to ancestors and deletion protects enclosing contracts", () => {
  const inner = addWorkflowInterface(fixture(), ["subgraph-1"], "inputs").graph
    .nodes[0];
  inner.id = "inner";
  const root = fixture();
  root.nodes[0].subgraph.graph.nodes = [inner];
  root.nodes[0].subgraph.interface.inputs = [
    { name: "outer_input", target: { nodeId: "inner", port: "input_1" } },
  ];
  const renamed = updateWorkflowInterface(
    root,
    ["subgraph-1", "inner"],
    "inputs",
    "input_1",
    { name: "renamed" },
  );
  assert.equal(
    renamed.nodes[0].subgraph.interface.inputs[0].target.port,
    "renamed",
  );
  assert.throws(
    () =>
      updateWorkflowInterface(
        renamed,
        ["subgraph-1", "inner"],
        "inputs",
        "renamed",
        null,
      ),
    /更外层/,
  );
  assert.equal(
    renamed.nodes[0].subgraph.graph.nodes[0].subgraph.interface.inputs.length,
    1,
  );
});
