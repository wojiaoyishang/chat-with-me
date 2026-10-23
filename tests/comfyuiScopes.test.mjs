import test from "node:test";
import assert from "node:assert/strict";
import {
  scopeBreadcrumbs,
  scopedGraph,
  scopeForNode,
  childScopeNodeIds,
} from "../src/features/comfyui/scopeModel.js";
import {
  applyUiLayout,
  withNodePositions,
} from "../src/features/comfyui/graphModel.js";
import {
  inspectWorkflowPayload,
  readWorkflowFiles,
  workflowSourceKind,
} from "../src/features/comfyui/importModel.js";

const graph = {
  prompt: {
    "171:104": { class_type: "ImageToVideo", inputs: { image: ["5", 0] } },
  },
  scopes: [
    { id: "root", title: "主流程", parentId: null },
    { id: "171", title: "图生视频", parentId: "root", entryNodeId: "171" },
    { id: "171:9", title: "采样", parentId: "171", entryNodeId: "171:9" },
  ],
  nodes: [
    { id: "5", scopeId: "root" },
    { id: "171", scopeId: "root", subgraphId: "171", displayOnly: true },
    { id: "92", scopeId: "root" },
    { id: "171:104", scopeId: "171" },
    { id: "171:9", scopeId: "171", subgraphId: "171:9", displayOnly: true },
    { id: "171:9:2", scopeId: "171:9" },
  ],
  edges: [
    {
      id: "in",
      source: "5",
      target: "171:104",
      sourceHandle: "0",
      targetHandle: "image",
    },
    {
      id: "inner",
      source: "171:104",
      target: "171:9:2",
      sourceHandle: "0",
      targetHandle: "value",
    },
    {
      id: "out",
      source: "171:9:2",
      target: "92",
      sourceHandle: "0",
      targetHandle: "video",
    },
  ],
};

test("scope navigation locates full execution IDs and breadcrumbs include nested instances", () => {
  assert.equal(scopeForNode(graph, "171:9:2"), "171:9");
  assert.deepEqual(
    scopeBreadcrumbs(graph, "171:9").map((scope) => scope.title),
    ["主流程", "图生视频", "采样"],
  );
  assert.deepEqual(
    [...childScopeNodeIds(graph, "171")],
    ["171:104", "171:9", "171:9:2"],
  );
  assert.deepEqual(
    scopeBreadcrumbs({ scopes: [{ id: "bad", parentId: "bad" }] }, "bad").map(
      (scope) => scope.id,
    ),
    ["root", "bad"],
  );
});

test("main graph keeps cross-scope edges through containers and child view keeps its own nodes", () => {
  const original = JSON.stringify(graph);
  const root = scopedGraph(graph);
  assert.deepEqual(
    root.nodes.map((node) => node.id),
    ["5", "171", "92"],
  );
  assert.deepEqual(
    root.edges.map((edge) => [edge.source, edge.target]),
    [
      ["5", "171"],
      ["171", "92"],
    ],
  );
  assert.equal(root.edges[0].targetHandle, "scope-in");
  assert.equal(root.edges[1].sourceHandle, "scope-out");
  const child = scopedGraph(graph, "171");
  assert.deepEqual(
    child.nodes.map((node) => node.id),
    ["171:104", "171:9"],
  );
  assert.deepEqual(
    child.edges.map((edge) => [edge.source, edge.target]),
    [["171:104", "171:9"]],
  );
  assert.equal(JSON.stringify(graph), original);
});

test("subgraph drag positions use full IDs without inserting child nodes into original root canvas", () => {
  const uiWorkflow = {
    nodes: [{ id: 171, pos: [10, 20] }],
    definitions: {
      subgraphs: [{ id: "definition", nodes: [{ id: 104, pos: [0, 0] }] }],
    },
    _cwm: { positions: { "other:5": [2, 3] } },
  };
  const moved = withNodePositions(uiWorkflow, [
    { id: "171:104", position: { x: 321, y: 654 } },
  ]);
  assert.equal(moved.nodes.length, 1);
  assert.deepEqual(moved.definitions, uiWorkflow.definitions);
  assert.deepEqual(moved._cwm.positions, {
    "other:5": [2, 3],
    "171:104": [321, 654],
  });
  const updated = applyUiLayout(graph, moved);
  assert.deepEqual(
    updated.nodes.find((node) => node.id === "171:104").position,
    { x: 321, y: 654 },
  );
  assert.equal(updated.prompt, graph.prompt);
  assert.equal(uiWorkflow._cwm.positions["171:104"], undefined);
});

test("API and canvas each import independently, with an optional connection for canvas definitions", () => {
  const api = JSON.stringify(graph.prompt);
  const canvas = JSON.stringify({
    nodes: [{ id: 1, type: "LoadImage" }],
    links: [],
  });
  assert.deepEqual(inspectWorkflowPayload(api), { workflow: graph.prompt });
  assert.deepEqual(inspectWorkflowPayload(canvas, "", "local"), {
    workflow: JSON.parse(canvas),
    serverId: "local",
  });
  assert.deepEqual(inspectWorkflowPayload(canvas), {
    workflow: JSON.parse(canvas),
  });
  assert.equal(workflowSourceKind(canvas), "canvas");
  assert.equal(workflowSourceKind("{"), "unknown");
  assert.equal(
    readWorkflowFiles([{ name: "ui.json", text: canvas }]).api,
    null,
  );
  assert.deepEqual(inspectWorkflowPayload(api, canvas), {
    workflow: graph.prompt,
    uiWorkflow: JSON.parse(canvas),
  });
});
