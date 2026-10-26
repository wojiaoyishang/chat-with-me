import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeWorkflowParallelism,
  workflowParallelBounds,
} from "../src/features/workflows/workflowParallelModel.js";

const node = (id, kind = "step") => ({ id, kind, position: { x: 0, y: 0 } });
const graph = (ids, links, maxConcurrency = 4) => ({
  nodes: ids.map((id) => (typeof id === "string" ? node(id) : id)),
  edges: links.map(([source, target, sourcePort = "out"], index) => ({
    id: `edge-${index}`,
    source,
    target,
    sourcePort,
    targetPort: "in",
  })),
  settings: { maxConcurrency },
});
const regions = (value) => analyzeWorkflowParallelism(value).current.regions;
const diamond = () =>
  graph(
    ["a", "b", "c", "join", "after"],
    [
      ["a", "b"],
      ["a", "c"],
      ["b", "join"],
      ["c", "join"],
      ["join", "after"],
    ],
  );

test("fork frame includes both full branches and stops before the shared join", () => {
  const value = graph(
    ["a", "b", "b2", "c", "c2", "join", "after"],
    [
      ["a", "b"],
      ["a", "c"],
      ["b", "b2"],
      ["c", "c2"],
      ["b2", "join"],
      ["c2", "join"],
      ["join", "after"],
    ],
  );
  const [region] = regions(value);
  assert.deepEqual(region.nodeIds, ["b", "b2", "c", "c2"]);
  assert.equal(region.branchCount, 2);
  assert.equal(region.limit, 4);
});
test("cross dependencies and duplicate output links do not invent parallel branches", () => {
  assert.equal(
    regions(
      graph(
        ["a", "b", "c"],
        [
          ["a", "b"],
          ["a", "c"],
          ["b", "c"],
        ],
      ),
    ).length,
    0,
  );
  assert.equal(
    regions(
      graph(
        ["a", "b"],
        [
          ["a", "b", "x"],
          ["a", "b", "y"],
        ],
      ),
    ).length,
    0,
  );
});
test("mutually exclusive IF routes stay separate, but fan-out on one chosen port can run together", () => {
  const value = graph(
    [node("if", "condition"), "b", "c", "join"],
    [
      ["if", "b", "true"],
      ["if", "c", "false"],
      ["b", "join"],
      ["c", "join"],
    ],
  );
  assert.equal(regions(value).length, 0);
  value.edges[1].sourcePort = "true";
  assert.deepEqual(regions(value)[0].nodeIds, ["b", "c"]);
  assert.equal(regions(value)[0].conditional, true);
});
test("a separate common data fork cannot override an IF gate on its targets", () => {
  const value = graph(
    ["a", node("if", "condition"), "b", "c"],
    [
      ["a", "b"],
      ["a", "c"],
      ["if", "b", "true"],
      ["if", "c", "false"],
    ],
  );
  assert.ok(
    regions(value).every(
      (region) =>
        !region.nodeIds.includes("b") && !region.nodeIds.includes("c"),
    ),
  );
});
test("nested parallel branches keep one readable outer frame", () => {
  const value = graph(
    ["a", "b", "c", "d", "e", "f", "join"],
    [
      ["a", "b"],
      ["a", "c"],
      ["b", "d"],
      ["b", "e"],
      ["d", "f"],
      ["e", "f"],
      ["f", "join"],
      ["c", "join"],
    ],
  );
  assert.equal(regions(value).length, 1);
  assert.deepEqual(regions(value)[0].nodeIds, ["b", "c", "d", "e", "f"]);
});
test("independent graphs get a flow frame without any synthetic workflow nodes", () => {
  const value = graph(
    ["a", "b", "x", "y"],
    [
      ["a", "b"],
      ["x", "y"],
    ],
  );
  const before = JSON.stringify(value);
  const [region] = regions(value);
  assert.equal(region.kind, "independent");
  assert.equal(region.branchCount, 2);
  assert.deepEqual(region.nodeIds, ["a", "b", "x", "y"]);
  assert.equal(JSON.stringify(value), before);
});
test("subgraph cards only report internal parallelism, with actual regions shown on entry", () => {
  const child = {
    ...node("child", "subgraph"),
    subgraph: {
      graph: diamond(),
      execution: { mode: "parallel", maxConcurrency: 2 },
    },
  };
  const root = graph([child], []);
  const outside = analyzeWorkflowParallelism(root);
  assert.equal(outside.current.regions.length, 0);
  assert.deepEqual(outside.subgraphs.child, {
    containsParallel: true,
    limit: 2,
  });
  const inside = analyzeWorkflowParallelism(root, ["child"]);
  assert.deepEqual(inside.current.regions[0].nodeIds, ["b", "c"]);
  child.subgraph.graph = graph(
    ["linear-a", "linear-b"],
    [["linear-a", "linear-b"]],
  );
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.child.containsParallel,
    false,
  );
});
test("serial parents and root/child concurrency limits suppress unavailable parallelism", () => {
  const inner = {
    ...node("inner", "subgraph"),
    subgraph: {
      graph: diamond(),
      execution: { mode: "parallel", maxConcurrency: 4 },
    },
  };
  const outer = {
    ...node("outer", "subgraph"),
    subgraph: { graph: graph([inner], []), execution: { mode: "serial" } },
  };
  const root = graph([outer], []);
  assert.equal(
    analyzeWorkflowParallelism(root, ["outer", "inner"]).current.regions.length,
    0,
  );
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.outer.containsParallel,
    false,
  );
  outer.subgraph.execution.mode = "parallel";
  root.settings.maxConcurrency = 2;
  assert.equal(
    analyzeWorkflowParallelism(root, ["outer", "inner"]).current.regions[0]
      .limit,
    2,
  );
  inner.subgraph.graph.settings.maxConcurrency = 1;
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.inner.containsParallel,
    false,
  );
});
test("frames do not claim a subgraph card itself is a parallel leaf", () => {
  const child = {
    ...node("child", "subgraph"),
    subgraph: { graph: diamond() },
  };
  const root = graph(
    ["a", child, "c", "join"],
    [
      ["a", "child"],
      ["a", "c"],
      ["child", "join"],
      ["c", "join"],
    ],
  );
  assert.ok(regions(root).every((region) => !region.nodeIds.includes("child")));
  assert.equal(
    analyzeWorkflowParallelism(root).subgraphs.child.containsParallel,
    true,
  );
});
test("cyclic drafts stay editable without false frames", () => {
  assert.deepEqual(
    regions(
      graph(
        ["a", "b"],
        [
          ["a", "b"],
          ["b", "a"],
        ],
      ),
    ),
    [],
  );
});
test("processing roots supplied by virtual subgraph inputs are parallel up to their join", () => {
  const value = graph(
    ["summary", "tokens", "merge"],
    [
      ["summary", "merge"],
      ["tokens", "merge"],
    ],
  );
  assert.deepEqual(regions(value)[0].nodeIds, ["summary", "tokens"]);
  assert.equal(regions(value)[0].branchCount, 2);
});
test("independent configuration inputs alone do not create an enormous processing frame", () => {
  const value = graph(
    [node("a", "text"), node("b", "text"), "parse", "merge"],
    [
      ["a", "merge"],
      ["b", "parse"],
      ["parse", "merge"],
    ],
  );
  const result = analyzeWorkflowParallelism(
    value,
    [],
    [{ kind: "text", source: {} }],
  );
  assert.equal(result.current.regions.length, 0);
});
test("frame bounds track measured sizes and transient dragging without mutating graph data", () => {
  const region = { id: "fork", nodeIds: ["a", "b"], branchCount: 2 };
  const nodes = [
    {
      id: "a",
      position: { x: 200, y: 300 },
      measured: { width: 300, height: 80 },
    },
    {
      id: "b",
      position: { x: 600, y: 450 },
      measured: { width: 200, height: 220 },
    },
  ];
  const before = JSON.stringify(nodes);
  const [box] = workflowParallelBounds([region], nodes);
  assert.deepEqual([box.x, box.y, box.width, box.height], [168, 236, 664, 466]);
  const [moved] = workflowParallelBounds(
    [region],
    [nodes[0], { ...nodes[1], position: { x: 50, y: 900 }, dragging: true }],
  );
  assert.deepEqual(
    [moved.x, moved.y, moved.width, moved.height],
    [18, 236, 514, 916],
  );
  assert.equal(JSON.stringify(nodes), before);
});
