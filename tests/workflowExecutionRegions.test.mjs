import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeWorkflowParallelism,
  workflowParallelBounds,
} from "../src/features/workflows/workflowParallelModel.js";
import {
  normalizeGraph,
  initializeGraph,
  instantiateWorkflowGraph,
  copyWorkflowSelection,
  pasteWorkflowSelection,
  wrapWorkflowSubgraph,
  unwrapWorkflowSubgraph,
  removeWorkflowNodes,
  updateWorkflowGraphAtPath,
  workflowSubgraphTemplateNode,
} from "../src/features/workflows/workflowModel.js";
import {
  workflowLeafIds,
  workflowAncestorRegions,
  pruneDeletedWorkflowRegions,
} from "../src/features/workflows/workflowRegions.js";

const step = (id) => ({
  id,
  kind: "step",
  config: {},
  inputs: {},
  position: { x: 0, y: 0 },
});
const region = (id, nodeIds, maxConcurrency) => ({
  id,
  nodeIds,
  maxConcurrency,
});
const graph = () =>
  normalizeGraph({
    nodes: ["a", "b", "c"].map(step),
    settings: { maxConcurrency: 4 },
  });
const current = (value, path = []) =>
  analyzeWorkflowParallelism(value, path).current;

test("configured cap 1 keeps an editable frame and survives normalization and JSON", () => {
  const value = graph();
  value.executionRegions = [region("stable", ["a", "b", "c"], 1)];
  const restored = initializeGraph(JSON.parse(JSON.stringify(value)), []);
  const level = current(restored);
  assert.equal(level.containsParallel, false);
  assert.equal(level.regions[0].id, "stable");
  assert.equal(level.regions[0].limit, 1);
  assert.equal(level.regions[0].configured, true);
  restored.nodes = [restored.nodes[0]];
  assert.equal(workflowParallelBounds(level.regions, restored.nodes).length, 1);
  restored.executionRegions = [];
  assert.equal(current(restored).regions.length, 0);
});

test("requested cap stays persisted while the smaller ancestor and overlapping budgets apply", () => {
  const child = graph();
  child.executionRegions = [region("local", ["a", "b", "c"], 4)];
  const root = normalizeGraph({
    nodes: [
      {
        id: "wrapper",
        kind: "subgraph",
        subgraph: {
          graph: child,
          execution: { maxConcurrency: 2 },
          interface: {},
        },
      },
    ],
  });
  root.executionRegions = [region("ancestor", ["a", "b", "c"], 1)];
  assert.equal(current(root, ["wrapper"]).regions[0].limit, 1);
  assert.equal(current(root, ["wrapper"]).regions[0].maxConcurrency, 4);
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.wrapper.containsParallel,
    false,
  );
  root.executionRegions = [];
  assert.equal(current(root, ["wrapper"]).regions[0].limit, 2);
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.wrapper.containsParallel,
    true,
  );
});

test("overlapping cap 1 regions cannot advertise a blocked parallel pair", () => {
  const value = graph();
  value.executionRegions = [
    region("ab", ["a", "b"], 1),
    region("bc", ["b", "c"], 1),
    region("ac", ["a", "c"], 1),
  ];
  assert.equal(current(value).containsParallel, false);
  assert.equal(current(value).regions.length, 3);
  value.executionRegions.pop();
  assert.equal(current(value).containsParallel, true);
});

test("saved membership remains explicit after topology changes", () => {
  const value = graph();
  value.executionRegions = [region("stable", ["a", "b"], 2)];
  value.edges = [
    {
      id: "wire",
      source: "a",
      sourcePort: "out",
      target: "b",
      targetPort: "in",
    },
  ];
  const saved = current(value).regions.find((item) => item.id === "stable");
  assert.deepEqual(saved.nodeIds, ["a", "b"]);
  assert.equal(saved.kind, "custom");
  assert.equal(saved.limit, 2);
});

test("wrap moves full regions inside, preserves cross-boundary budgets, and unwrap restores", () => {
  const value = graph();
  value.executionRegions = [
    region("inside", ["a", "b"], 2),
    region("cross", ["b", "c"], 1),
  ];
  const wrapped = wrapWorkflowSubgraph(value, ["a", "b"], []);
  assert.deepEqual(wrapped.graph.executionRegions, [value.executionRegions[1]]);
  assert.deepEqual(wrapped.node.subgraph.graph.executionRegions, [
    value.executionRegions[0],
  ]);
  const restored = unwrapWorkflowSubgraph(wrapped.graph, wrapped.node.id).graph;
  assert.deepEqual(
    new Set(restored.executionRegions.map((r) => r.id)),
    new Set(["inside", "cross"]),
  );
});

test("copies remap region IDs and descendant references; partial selections retain their budget", () => {
  const value = graph();
  value.executionRegions = [
    region("inside", ["a", "b"], 1),
    region("cross", ["b", "c"], 2),
  ];
  const wrapped = wrapWorkflowSubgraph(value, ["a", "b"], []);
  const copied = instantiateWorkflowGraph(wrapped.graph);
  const all = new Set(workflowLeafIds(copied));
  const records = [
    ...copied.executionRegions,
    ...copied.nodes.find((n) => n.kind === "subgraph").subgraph.graph
      .executionRegions,
  ];
  for (const item of records) {
    assert.ok(!["inside", "cross"].includes(item.id));
    assert.ok(
      item.nodeIds.every((id) => all.has(id) && !["a", "b", "c"].includes(id)),
    );
  }
  const selection = copyWorkflowSelection(
    wrapped.node.subgraph.graph,
    ["b"],
    workflowAncestorRegions(wrapped.graph, [wrapped.node.id]),
  );
  assert.deepEqual(
    selection.executionRegions.map((r) => r.nodeIds),
    [["b"], ["b"]],
  );
  const pasted = pasteWorkflowSelection(graph(), selection).graph;
  assert.equal(pasted.executionRegions.length, 2);
  assert.ok(
    pasted.executionRegions.every(
      (r) => r.nodeIds[0] === pasted.nodes.at(-1).id,
    ),
  );
});

test("deleting nested members prunes ancestor records without changing unrelated constraints", () => {
  const value = graph();
  value.executionRegions = [region("cross", ["a", "c"], 1)];
  const wrapped = wrapWorkflowSubgraph(value, ["a", "b"], []);
  const edited = updateWorkflowGraphAtPath(
    wrapped.graph,
    [wrapped.node.id],
    (inner) => removeWorkflowNodes(inner, ["a"]),
  );
  const clean = pruneDeletedWorkflowRegions(wrapped.graph, edited);
  assert.deepEqual(clean.executionRegions, [region("cross", ["c"], 1)]);
  assert.deepEqual(wrapped.graph.executionRegions[0].nodeIds, ["a", "c"]);
});

test("saving and reusing a subgraph carries projected ancestor budgets exactly once", () => {
  const value = graph();
  value.executionRegions = [region("cross", ["a", "c"], 1)];
  const wrapped = wrapWorkflowSubgraph(value, ["a", "b"], []);
  const standalone = normalizeGraph(copyWorkflowSelection(wrapped.graph, [wrapped.node.id]));
  const reusable = workflowSubgraphTemplateNode(standalone, [], "组件");
  assert.deepEqual(reusable.subgraph.graph.executionRegions, [region("cross", ["a"], 1)]);
  assert.equal(standalone.nodes[0].subgraph.graph.executionRegions.length, 0);
  const copied = instantiateWorkflowGraph(normalizeGraph({nodes:[reusable]}));
  const budget = copied.nodes[0].subgraph.graph.executionRegions[0];
  assert.notEqual(budget.id, "cross");
  assert.ok(workflowLeafIds(copied).includes(budget.nodeIds[0]));
  const allSelected = workflowSubgraphTemplateNode(value, [], "全部");
  assert.equal(allSelected.subgraph.graph.executionRegions.length, 1);
});
