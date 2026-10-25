import test from "node:test";
import assert from "node:assert/strict";
import {
  catalogNode,
  clone,
  connectWorkflow,
  normalizeGraph,
  pasteWorkflowSelection,
  updateWorkflowGraphAtPath,
  unwrapWorkflowSubgraph,
  workflowGraphAtPath,
  workflowGraphContext,
  workflowInputFields,
  workflowRuntimeForGraph,
  workflowSourceKeys,
  wrapWorkflowSubgraph,
} from "../src/features/workflows/workflowModel.js";

const definitions = [
  {
    kind: "source",
    version: 1,
    source: { configField: "value", valueSchema: { type: "string" } },
    outputs: [{ name: "value", type: "text", schema: { type: "string" } }],
  },
  {
    kind: "process",
    version: 1,
    inputs: [
      {
        name: "text",
        type: "text",
        required: true,
        inlineAllowed: true,
        schema: { type: "string" },
      },
    ],
    outputs: [{ name: "text", type: "text", schema: { type: "string" } }],
    configSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", minimum: 1, default: 4 },
        language: { type: "string" },
      },
    },
  },
  {
    kind: "sink",
    version: 1,
    inputs: [{ name: "text", type: "text" }],
    outputs: [],
  },
  {
    kind: "condition",
    version: 1,
    inputs: [{ name: "value", type: "any", acceptsAny: true }],
    outputs: [
      { name: "true", type: "any" },
      { name: "false", type: "any" },
    ],
  },
  {
    kind: "image_sink",
    version: 1,
    inputs: [{ name: "image", type: "image" }],
    outputs: [],
  },
];
const leaf = (id, kind = "process", x = 0) => ({
  id,
  kind,
  version: 1,
  name: id,
  config: {},
  inputs: {},
  position: { x, y: 20 },
});
const link = (
  id,
  source,
  target,
  sourcePort = "text",
  targetPort = "text",
) => ({ id, source, target, sourcePort, targetPort });
const fixture = () =>
  normalizeGraph({
    version: 3,
    nodes: [
      leaf("a", "source"),
      leaf("b", "process", 300),
      leaf("c", "process", 600),
      leaf("d", "sink", 900),
    ],
    edges: [
      link("ab", "a", "b", "value"),
      link("bc", "b", "c"),
      link("cd", "c", "d"),
    ],
  });

test("wrapping preserves dependencies, derives boundary types and unwrap restores child positions", () => {
  const graph = fixture();
  const result = wrapWorkflowSubgraph(graph, ["b", "c"], definitions);
  assert.equal(result.graph.nodes.length, 3);
  assert.equal(result.graph.version, 3);
  assert.deepEqual(result.node.subgraph.execution, {
    mode: "parallel",
    maxConcurrency: 4,
  });
  assert.equal(result.node.subgraph.graph.edges[0].id, "bc");
  assert.equal(result.graph.edges[0].target, result.node.id);
  assert.equal(result.graph.edges[1].source, result.node.id);
  const definition = catalogNode(definitions, result.node);
  assert.equal(definition.inputs[0].type, "text");
  assert.deepEqual(definition.inputs[0].schema, { type: "string" });
  assert.equal(definition.outputs[0].type, "text");
  const unwrapped = unwrapWorkflowSubgraph(result.graph, result.node.id);
  assert.deepEqual(
    unwrapped.graph.nodes.find((node) => node.id === "b").position,
    graph.nodes[1].position,
  );
  assert.deepEqual(
    unwrapped.graph.nodes.find((node) => node.id === "c").position,
    graph.nodes[2].position,
  );
  assert.deepEqual(
    unwrapped.graph.edges
      .map(({ source, sourcePort, target, targetPort }) => ({
        source,
        sourcePort,
        target,
        targetPort,
      }))
      .sort((a, b) => a.source.localeCompare(b.source)),
    graph.edges.map(({ source, sourcePort, target, targetPort }) => ({
      source,
      sourcePort,
      target,
      targetPort,
    })),
  );
  assert.equal(graph.nodes.length, 4, "original graph remains unchanged");
});

test("fan-out edges share one public output instead of duplicating ports", () => {
  const graph = fixture();
  graph.edges.push(link("bd", "b", "d"));
  const result = wrapWorkflowSubgraph(graph, ["b"], definitions);
  assert.equal(result.node.subgraph.interface.outputs.length, 1);
  assert.equal(
    result.graph.edges.filter((edge) => edge.source === result.node.id).length,
    2,
  );
});

test("unwrap assigns collision-free child IDs and applies public literal and parameter values", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b", "c"], definitions);
  const group = wrapped.node;
  group.inputs.in_1 = { type: "literal", value: "override" };
  group.subgraph.interface.parameters = [
    {
      name: "limit",
      title: "预算",
      default: 2,
      targets: [
        { nodeId: "b", field: "limit" },
        { nodeId: "c", field: "limit" },
      ],
    },
  ];
  group.config.limit = 9;
  wrapped.graph.nodes.push(leaf("b"));
  const result = unwrapWorkflowSubgraph(wrapped.graph, group.id);
  assert.equal(
    new Set(result.graph.nodes.map((node) => node.id)).size,
    result.graph.nodes.length,
  );
  const child = result.graph.nodes.find((node) => node.id === result.ids[0]);
  assert.equal(child.config.limit, 9);
  assert.equal(child.inputs.text.value, "override");
  assert.deepEqual(
    result.boundary.parameters[`${group.id}\u0000limit`].map(
      (target) => target.field,
    ),
    ["limit", "limit"],
  );
  assert.equal(
    result.graph.nodes.find((node) => node.id === result.ids[1]).config.limit,
    9,
  );
});

test("editing nested graphs changes only that scope and retains the root envelope", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b", "c"], definitions);
  const next = updateWorkflowGraphAtPath(
    wrapped.graph,
    [wrapped.node.id],
    (inner) => ({
      ...inner,
      nodes: inner.nodes.map((node) => ({ ...node, name: `new-${node.name}` })),
    }),
  );
  assert.equal(
    workflowGraphAtPath(next, [wrapped.node.id]).nodes[0].name,
    "new-b",
  );
  assert.equal(wrapped.node.subgraph.graph.nodes[0].name, "b");
  assert.equal(next.nodes.find((node) => node.id === "a").name, "a");
  assert.equal(workflowGraphAtPath(next, ["missing"]), null);
});

test("nested wrap/unwrap rewire the containing subgraph's own public ports and parameters", () => {
  const outer = wrapWorkflowSubgraph(fixture(), ["b", "c"], definitions);
  outer.node.subgraph.interface.parameters = [
    { name: "budget", targets: [{ nodeId: "b", field: "limit" }], default: 3 },
  ];
  const inner = wrapWorkflowSubgraph(
    outer.node.subgraph.graph,
    ["b"],
    definitions,
    "inner",
    outer.node.subgraph.interface,
  );
  const next = updateWorkflowGraphAtPath(
    outer.graph,
    [outer.node.id],
    inner.graph,
    inner.boundary,
  );
  const contract = next.nodes.find((node) => node.id === outer.node.id).subgraph
    .interface;
  assert.equal(contract.inputs[0].target.nodeId, inner.node.id);
  assert.equal(contract.parameters[0].targets[0].nodeId, inner.node.id);
  assert.equal(
    catalogNode(
      definitions,
      next.nodes.find((node) => node.id === outer.node.id),
    ).inputs[0].type,
    "text",
  );
  const unwrapped = unwrapWorkflowSubgraph(
    workflowGraphAtPath(next, [outer.node.id]),
    inner.node.id,
  );
  const restored = updateWorkflowGraphAtPath(
    next,
    [outer.node.id],
    unwrapped.graph,
    unwrapped.boundary,
  );
  const restoredContract = restored.nodes.find(
    (node) => node.id === outer.node.id,
  ).subgraph.interface;
  assert.equal(restoredContract.inputs[0].target.nodeId, "b");
  assert.deepEqual(restoredContract.parameters[0].targets, [
    { nodeId: "b", field: "limit" },
  ]);
});

test("copied subgraphs retain private scope IDs but generate globally unique source input keys", () => {
  const graph = fixture();
  graph.nodes[0].inputKey = "diary";
  const result = wrapWorkflowSubgraph(graph, ["a", "b"], definitions);
  const pasted = pasteWorkflowSelection(result.graph, {
    nodes: [result.node],
    edges: [],
  });
  assert.notEqual(pasted.ids[0], result.node.id);
  assert.deepEqual(
    pasted.graph.nodes.at(-1).subgraph.graph.nodes.map((node) => node.id),
    ["a", "b"],
  );
  const keys = workflowSourceKeys(pasted.graph);
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.includes("diary"));
});

test("quick run discovers nested sources and rejects duplicate keys across branches", () => {
  const graph = fixture();
  graph.nodes[0].inputKey = "diary";
  graph.nodes[0].config.value = "正文";
  const wrapped = wrapWorkflowSubgraph(graph, ["a", "b"], definitions);
  const fields = workflowInputFields(wrapped.graph, definitions);
  assert.equal(fields.length, 1);
  assert.equal(fields[0].key, "diary");
  assert.equal(fields[0].default, "正文");
  wrapped.graph.nodes.push({ ...leaf("other", "source"), inputKey: "diary" });
  assert.throws(
    () => workflowInputFields(wrapped.graph, definitions),
    /标识重复/,
  );
});

test("public parameter schema is derived from the internal field, including nested parameters", () => {
  const result = wrapWorkflowSubgraph(fixture(), ["b"], definitions);
  result.node.subgraph.interface.parameters = [
    {
      name: "budget",
      title: "上限",
      default: 7,
      targets: [{ nodeId: "b", field: "limit" }],
    },
  ];
  const field = catalogNode(definitions, result.node).configSchema.properties
    .budget;
  assert.equal(field.type, "integer");
  assert.equal(field.minimum, 1);
  assert.equal(field.default, 7);
  const outer = wrapWorkflowSubgraph(
    result.graph,
    [result.node.id],
    definitions,
  );
  outer.node.subgraph.interface.parameters = [
    {
      name: "outerBudget",
      targets: [{ nodeId: result.node.id, field: "budget" }],
    },
  ];
  assert.equal(
    catalogNode(definitions, outer.node).configSchema.properties.outerBudget
      .type,
    "integer",
  );
});

test("condition outputs inherit the connected input contract; any never bypasses a typed target", () => {
  let graph = normalizeGraph({
    nodes: [
      leaf("source", "source"),
      leaf("if", "condition"),
      leaf("sink", "sink"),
      leaf("image", "image_sink"),
    ],
    edges: [],
  });
  graph = connectWorkflow(
    graph,
    {
      source: "source",
      sourcePort: "value",
      target: "if",
      targetPort: "value",
    },
    definitions,
  );
  assert.equal(
    catalogNode(definitions, graph.nodes[1], graph).outputs[0].type,
    "text",
  );
  graph = connectWorkflow(
    graph,
    { source: "if", sourcePort: "true", target: "sink", targetPort: "text" },
    definitions,
  );
  assert.equal(graph.edges.length, 2);
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "if",
          sourcePort: "false",
          target: "image",
          targetPort: "image",
        },
        definitions,
      ),
    /类型不兼容/,
  );
});

test("conditional payload types cross exposed nested subgraph inputs and outputs", () => {
  const graph = normalizeGraph({
    nodes: [
      leaf("source", "source"),
      leaf("if", "condition"),
      leaf("sink", "sink"),
    ],
    edges: [
      link("to-if", "source", "if", "value", "value"),
      link("to-sink", "if", "sink", "true", "text"),
    ],
  });
  const inner = wrapWorkflowSubgraph(graph, ["if"], definitions);
  const outer = wrapWorkflowSubgraph(inner.graph, [inner.node.id], definitions);
  const rootDefinition = catalogNode(definitions, outer.node, outer.graph);
  assert.equal(rootDefinition.outputs[0].type, "text");
  const context = workflowGraphContext(outer.graph, [
    outer.node.id,
    inner.node.id,
  ]);
  const scopedGraph = workflowGraphAtPath(outer.graph, [
    outer.node.id,
    inner.node.id,
  ]);
  assert.equal(
    catalogNode(
      definitions,
      scopedGraph.nodes[0],
      scopedGraph,
      new Set(),
      context,
    ).outputs[0].type,
    "text",
  );
});

test("hashed runtime IDs are matched by nodePath and groups aggregate active/failed/skipped leaves", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b", "c"], definitions);
  const id = wrapped.node.id;
  const runtime = {
    sg_hash1: {
      nodePath: [id, "b"],
      namePath: ["子图", "摘要"],
      status: "running",
      progressMessage: "正在处理：第一天",
    },
    sg_hash2: { nodePath: [id, "c"], status: "skipped" },
    a: { status: "completed" },
  };
  const local = workflowRuntimeForGraph(wrapped.graph, runtime);
  assert.equal(local[id].status, "running");
  assert.equal(local[id].activeCount, 1);
  assert.equal(local[id].nodeProgress.processed, 1);
  assert.match(local[id].progressMessage, /第一天/);
  const internal = workflowRuntimeForGraph(
    wrapped.node.subgraph.graph,
    runtime,
    [id],
  );
  assert.equal(internal.b.runtimeId, "sg_hash1");
  assert.deepEqual(internal.b.namePath, ["子图", "摘要"]);
  const failed = clone(runtime);
  failed.sg_hash1.status = "failed";
  assert.equal(
    workflowRuntimeForGraph(wrapped.graph, failed)[id].status,
    "failed",
  );
});

test("runtime path map restores monitoring after reload even if states omit metadata", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b"], definitions);
  const local = workflowRuntimeForGraph(
    wrapped.graph,
    { sg_hash: { status: "completed" } },
    [],
    { sg_hash: { nodePath: [wrapped.node.id, "b"] } },
  );
  assert.equal(local[wrapped.node.id].status, "completed");
});

test("pending monitor groups count all designed leaves before worker states arrive", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b", "c"], definitions);
  const local = workflowRuntimeForGraph(wrapped.graph, {});
  assert.equal(local[wrapped.node.id].nodeProgress.total, 2);
  assert.equal(local[wrapped.node.id].nodeProgress.processed, 0);
  assert.equal(local[wrapped.node.id].status, "pending");
});

test("derived subgraph and condition contracts retain stable canvas type identity across runtime refresh", () => {
  const wrapped = wrapWorkflowSubgraph(fixture(), ["b"], definitions);
  assert.equal(
    catalogNode(definitions, wrapped.node).baseDefinition,
    catalogNode(definitions, clone(wrapped.node)).baseDefinition,
  );
  const graph = normalizeGraph({
    nodes: [leaf("source", "source"), leaf("if", "condition")],
    edges: [link("if", "source", "if", "value", "value")],
  });
  assert.equal(
    catalogNode(definitions, graph.nodes[1], graph).baseDefinition,
    catalogNode(definitions, graph.nodes[1], clone(graph)).baseDefinition,
  );
});

test("optional attachments remain optional inside subgraphs while other required sources stay required", () => {
  const catalogs = [
    ...definitions,
    {
      kind: "attachments",
      version: 1,
      source: {
        configField: "resources",
        required: true,
        valueSchema: { type: "array" },
      },
      outputs: [],
    },
  ];
  const graph = normalizeGraph({
    nodes: [
      {
        ...leaf("files", "attachments"),
        inputKey: "files",
        config: { resources: [], optional: true },
      },
      { ...leaf("text", "source"), inputKey: "text" },
    ],
    edges: [],
  });
  const wrapped = wrapWorkflowSubgraph(graph, ["files", "text"], catalogs);
  const fields = workflowInputFields(wrapped.graph, catalogs);
  assert.equal(fields.find((field) => field.key === "files").required, false);
  assert.equal(fields.find((field) => field.key === "text").required, true);
});
