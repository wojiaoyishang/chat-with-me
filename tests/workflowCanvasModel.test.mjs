import test from "node:test";
import assert from "node:assert/strict";
import {
  reconcileCanvasNodes,
  selectCanvasNodes,
} from "../src/features/workflows/workflowCanvasModel.js";
import { updateWorkflowNodePositions } from "../src/features/workflows/workflowModel.js";

const definition = { kind: "parse" };
const incomingNode = {
  id: "parse",
  type: "workflow",
  position: { x: 10, y: 20 },
  data: { kind: "parse", definition, status: "queued" },
};

test("explicit selection commands preserve geometry and clear the previous selection", () => {
  const measured = { width: 220, height: 90 };
  const current = [
    { ...incomingNode, id: "first", measured, selected: true },
    { ...incomingNode, id: "second", selected: false },
  ];
  const next = selectCanvasNodes(current, ["second"]);
  assert.deepEqual(
    next.map((node) => node.selected),
    [false, true],
  );
  assert.equal(next[0].measured, measured);
  assert.equal(selectCanvasNodes(next, ["second"]), next);
});

test("a selection or status refresh keeps measured geometry and in-progress dragging", () => {
  const moving = {
    ...incomingNode,
    position: { x: 80, y: 100 },
    measured: { width: 220, height: 90 },
    dragging: true,
  };
  const next = reconcileCanvasNodes(
    [moving],
    [
      {
        ...incomingNode,
        selected: true,
        data: { ...incomingNode.data, status: "running" },
      },
    ],
  );
  assert.equal(next[0].measured, moving.measured);
  assert.equal(next[0].position, moving.position);
  assert.equal(next[0].dragging, true);
  assert.equal(next[0].data.status, "running");
});

test("undo moves a resting node without remeasuring it and unchanged nodes retain identity", () => {
  const resting = {
    ...incomingNode,
    measured: { width: 220, height: 90 },
    dragging: false,
  };
  const current = [resting];
  assert.equal(
    reconcileCanvasNodes(current, [
      { ...incomingNode, data: { ...incomingNode.data } },
    ]),
    current,
  );
  const undo = reconcileCanvasNodes(current, [
    { ...incomingNode, position: { x: 0, y: 0 } },
  ]);
  assert.equal(undo[0].measured, resting.measured);
  assert.deepEqual(undo[0].position, { x: 0, y: 0 });
});

test("replacing a node type resets its obsolete geometry and removes deleted nodes", () => {
  const measured = { ...incomingNode, measured: { width: 220, height: 90 } };
  const replacement = {
    ...incomingNode,
    data: { kind: "input", definition: { kind: "input" } },
  };
  assert.equal(reconcileCanvasNodes([measured], [replacement])[0], replacement);
  assert.deepEqual(reconcileCanvasNodes([measured], []), []);
});

test("a group move updates positions once, preserves configuration, and strips canvas-only state", () => {
  const graph = {
    nodes: [
      { id: "a", position: { x: 0, y: 0 }, config: { workers: 2 } },
      { id: "b", position: { x: 100, y: 0 }, inputs: {} },
    ],
    edges: [],
  };
  const moved = [
    {
      id: "a",
      position: { x: 20, y: 30 },
      measured: { width: 220 },
      dragging: false,
    },
    {
      id: "b",
      position: { x: 120, y: 30 },
      measured: { width: 220 },
      dragging: false,
    },
  ];
  const next = updateWorkflowNodePositions(graph, moved);
  assert.equal(next.nodes[0].config, graph.nodes[0].config);
  assert.equal(next.nodes[1].inputs, graph.nodes[1].inputs);
  assert.deepEqual(
    next.nodes.map((node) => node.position),
    [
      { x: 20, y: 30 },
      { x: 120, y: 30 },
    ],
  );
  assert.equal(updateWorkflowNodePositions(next, moved), next);
  assert.equal(
    updateWorkflowNodePositions(graph, [
      { id: "a", position: { x: NaN, y: 0 } },
    ]),
    graph,
  );
  assert(
    next.nodes.every(
      (node) =>
        !Object.hasOwn(node, "measured") && !Object.hasOwn(node, "dragging"),
    ),
  );
});
