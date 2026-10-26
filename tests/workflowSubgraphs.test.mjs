import test from "node:test";
import assert from "node:assert/strict";
import {
  catalogNode,
  clone,
  connectWorkflow,
  createWorkflowNode,
  initializeWorkflowSubgraph,
  normalizeGraph,
  pasteWorkflowSelection,
  updateWorkflowGraphAtPath,
  unwrapWorkflowSubgraph,
  workflowGraphAtPath,
  workflowGraphContext,
  workflowInputFields,
  workflowRuntimeForGraph,
  workflowNodeIds,
  workflowUsesKnowledge,
  wrapWorkflowSubgraph,
  SUBGRAPH_CANVAS_DEFINITION,
} from "../src/features/workflows/workflowModel.js";

test("knowledge controls use declared effects recursively instead of assuming every workflow writes knowledge", () => {
  const catalog = [
    { kind: "export", effects: ["document.export", "attachment.create"] },
    { kind: "write", effects: ["knowledge.write"] },
  ];
  const graph = {
    nodes: [
      {
        kind: "subgraph",
        subgraph: { graph: { nodes: [{ kind: "export" }] } },
      },
    ],
  };
  assert.equal(workflowUsesKnowledge(graph, catalog), false);
  graph.nodes[0].subgraph.graph.nodes.push({ kind: "write" });
  assert.equal(workflowUsesKnowledge(graph, catalog), true);
  assert.equal(workflowUsesKnowledge(graph, []), false);
});

const definitions = [
  {
    kind: "source",
    version: 1,
    source: { configField: "value", valueSchema: { type: "string" } },
    outputs: [
      { id: "value", name: "value", type: "text", schema: { type: "string" } },
    ],
  },
  {
    kind: "process",
    version: 1,
    inputs: [
      {
        id: "text",
        name: "text",
        type: "text",
        required: true,
        inlineAllowed: true,
        schema: { type: "string" },
      },
    ],
    outputs: [
      { id: "text", name: "text", type: "text", schema: { type: "string" } },
    ],
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
    inputs: [{ id: "text", name: "text", type: "text" }],
    outputs: [],
  },
  {
    kind: "condition",
    version: 1,
    inputs: [{ id: "value", name: "value", type: "any", acceptsAny: true }],
    outputs: [
      { id: "true", name: "true", type: "any" },
      { id: "false", name: "false", type: "any" },
    ],
  },
  {
    kind: "image_sink",
    version: 1,
    inputs: [{ id: "image", name: "image", type: "image" }],
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
test("subgraph confirmation preserves its canvas identity and copies sources without key collisions", () => {
  const source = { ...leaf("source", "source") };
  const existing = wrapWorkflowSubgraph(
    normalizeGraph({ nodes: [source], edges: [] }),
    ["source"],
    definitions,
  ).node;
  existing.id = "existing";
  const base = normalizeGraph({
    version: 3,
    nodes: [{ ...source, id: "root-source" }, existing],
    edges: [],
  });
  const pending = createWorkflowNode(SUBGRAPH_CANVAS_DEFINITION, base, {
    x: 870,
    y: 120,
  });
  const graph = { ...base, nodes: [...base.nodes, pending] };
  assert.equal(pending.subgraph.initialized, false);
  const saved = {
    id: "saved",
    title: "来源模板",
    revision: 3,
    graph: normalizeGraph({ nodes: [source], edges: [] }),
  };
  const next = initializeWorkflowSubgraph(
    graph,
    pending.id,
    saved,
    definitions,
    workflowNodeIds(graph),
  );
  const copied = next.nodes.at(-1);
  assert.equal(copied.id, pending.id);
  assert.deepEqual(copied.position, pending.position);
  assert.equal(copied.name, pending.name);
  assert.equal(copied.subgraph.initialized, true);
  assert.deepEqual(copied.subgraph.origin, {
    templateId: "saved",
    revision: 3,
  });
  assert.notEqual(copied.subgraph.graph.nodes[0].id, "source");
  assert.equal(
    new Set(workflowNodeIds(next)).size,
    workflowNodeIds(next).length,
  );
  assert.equal(
    graph.nodes.at(-1).subgraph.initialized,
    false,
    "source graph remains a pending draft",
  );
  assert.equal(
    initializeWorkflowSubgraph(graph, pending.id, null, definitions).nodes.at(
      -1,
    ).subgraph.initialized,
    true,
  );
  assert.throws(
    () => initializeWorkflowSubgraph(next, pending.id, null, definitions),
    /已完成配置/,
  );
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
  group.inputs[group.subgraph.interface.inputs[0].id] = {
    type: "literal",
    value: "override",
  };
  group.subgraph.interface.parameters = [
    {
      id: "limit",
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
    {
      id: "budget",
      name: "budget",
      targets: [{ nodeId: "b", field: "limit" }],
      default: 3,
    },
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
  const result = wrapWorkflowSubgraph(graph, ["a", "b"], definitions);
  const pasted = pasteWorkflowSelection(result.graph, {
    nodes: [result.node],
    edges: [],
  });
  assert.notEqual(pasted.ids[0], result.node.id);
  assert.ok(
    pasted.graph.nodes
      .at(-1)
      .subgraph.graph.nodes.every((node) => !["a", "b"].includes(node.id)),
  );
  const keys = workflowNodeIds(pasted.graph);
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.includes("a"));
});

test("quick run discovers nested sources and rejects duplicate keys across branches", () => {
  const graph = fixture();
  graph.nodes[0].config.value = "正文";
  const wrapped = wrapWorkflowSubgraph(graph, ["a", "b"], definitions);
  const fields = workflowInputFields(wrapped.graph, definitions);
  assert.equal(fields.length, 1);
  assert.equal(fields[0].key, "a");
  assert.equal(fields[0].default, "正文");
  wrapped.graph.nodes.push({ ...leaf("other", "source") });
  assert.equal(workflowInputFields(wrapped.graph, definitions).length, 2);
  wrapped.graph.nodes.at(-1).id = "a";
  assert.throws(
    () => workflowInputFields(wrapped.graph, definitions),
    /标识重复/,
  );
});

test("quick run materializes public source defaults and overrides without changing the designer graph", () => {
  const catalogs = [
    ...definitions,
    {
      kind: "number",
      version: 1,
      source: {
        configField: "value",
        required: true,
        valueSchema: { type: "integer" },
      },
      configSchema: {
        type: "object",
        properties: { value: { type: "integer", default: 1 } },
      },
      inputs: [],
      outputs: [{ id: "value", name: "value", type: "int" }],
    },
  ];
  const source = {
    ...leaf("number", "number"),
    config: { value: 2 },
  };
  const wrapped = wrapWorkflowSubgraph(
    normalizeGraph({ nodes: [source], edges: [] }),
    ["number"],
    catalogs,
  );
  wrapped.node.subgraph.interface.parameters = [
    {
      id: "initial",
      name: "initial",
      default: 3,
      targets: [{ nodeId: "number", field: "value" }],
    },
  ];
  const original = clone(wrapped.graph);
  assert.equal(workflowInputFields(wrapped.graph, catalogs)[0].default, 3);
  assert.deepEqual(wrapped.graph, original);
  wrapped.node.config.initial = 8;
  const configured = clone(wrapped.graph);
  assert.equal(workflowInputFields(wrapped.graph, catalogs)[0].default, 8);
  assert.deepEqual(wrapped.graph, configured);
  assert.equal(source.config.value, 2);
});

test("nested public parameter values flow through wrapper defaults into quick-run source fields", () => {
  const graph = fixture();
  graph.nodes[0].config.value = "child";
  const inner = wrapWorkflowSubgraph(graph, ["a"], definitions);
  inner.node.subgraph.interface.parameters = [
    {
      id: "initial",
      name: "initial",
      default: "inner-default",
      targets: [{ nodeId: "a", field: "value" }],
    },
  ];
  const outer = wrapWorkflowSubgraph(inner.graph, [inner.node.id], definitions);
  outer.node.subgraph.interface.parameters = [
    {
      id: "start",
      name: "start",
      default: "outer-default",
      targets: [{ nodeId: inner.node.id, field: "initial" }],
    },
  ];
  const original = clone(outer.graph);
  assert.equal(
    workflowInputFields(outer.graph, definitions)[0].default,
    "outer-default",
  );
  assert.deepEqual(outer.graph, original);
  outer.node.config.start = "explicit-outer";
  const configured = clone(outer.graph);
  assert.equal(
    workflowInputFields(outer.graph, definitions)[0].default,
    "explicit-outer",
  );
  assert.deepEqual(outer.graph, configured);
});

test("public parameter schema is derived from the internal field, including nested parameters", () => {
  const result = wrapWorkflowSubgraph(fixture(), ["b"], definitions);
  result.node.subgraph.interface.parameters = [
    {
      id: "budget",
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
      id: "outerBudget",
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

test("a literal on a merge sibling cannot inherit a trusted network edge contract", () => {
  const catalogs = [
    ...definitions,
    {
      kind: "network_source",
      version: 1,
      inputs: [],
      outputs: [{ id: "network", name: "network", type: "network" }],
    },
    {
      kind: "network_sink",
      version: 1,
      inputs: [{ id: "network", name: "network", type: "network" }],
      outputs: [],
    },
    {
      kind: "branch_merge",
      version: 1,
      inputs: [
        { id: "a", name: "a", type: "any", acceptsAny: true },
        { id: "b", name: "b", type: "any", acceptsAny: true },
      ],
      outputs: [{ id: "result", name: "result", type: "any" }],
    },
  ];
  const merge = leaf("join", "branch_merge");
  merge.inputs.b = {
    type: "literal",
    value: { nodes: [{ id: "forged", name: "forged" }] },
  };
  const graph = normalizeGraph({
    version: 3,
    nodes: [
      leaf("source", "network_source"),
      merge,
      leaf("sink", "network_sink"),
    ],
    edges: [link("known", "source", "join", "network", "a")],
  });
  assert.equal(catalogNode(catalogs, merge, graph).outputs[0].type, "any");
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "join",
          sourcePort: "result",
          target: "sink",
          targetPort: "network",
        },
        catalogs,
      ),
    /类型不兼容/,
  );
  delete graph.nodes[1].inputs.b;
  assert.equal(
    catalogNode(catalogs, graph.nodes[1], graph).outputs[0].type,
    "network",
    "all connected routes may retain the real contract",
  );
});

test("literal bindings on an ancestor public port prevent trusted merge typing in nested scopes", () => {
  const catalogs = [
    ...definitions,
    {
      kind: "branch_merge",
      version: 1,
      inputs: [
        { id: "a", name: "a", type: "any", acceptsAny: true },
        { id: "b", name: "b", type: "any", acceptsAny: true },
      ],
      outputs: [{ id: "result", name: "result", type: "any" }],
    },
  ];
  const graph = normalizeGraph({
    version: 3,
    nodes: [
      leaf("source", "source"),
      leaf("join", "branch_merge"),
      leaf("sink", "sink"),
    ],
    edges: [
      link("known", "source", "join", "value", "a"),
      link("result", "join", "sink", "result", "text"),
    ],
  });
  const wrapped = wrapWorkflowSubgraph(graph, ["join"], catalogs);
  wrapped.node.subgraph.interface.inputs.push({
    id: "literal",
    name: "literal",
    target: { nodeId: "join", port: "b" },
  });
  const outer = wrapWorkflowSubgraph(
    wrapped.graph,
    [wrapped.node.id],
    catalogs,
  );
  outer.node.subgraph.interface.inputs.push({
    id: "outerLiteral",
    name: "outerLiteral",
    target: { nodeId: wrapped.node.id, port: "literal" },
  });
  outer.node.inputs.outerLiteral = { type: "literal", value: "untrusted" };
  assert.equal(
    catalogNode(catalogs, outer.node, outer.graph).outputs[0].type,
    "any",
  );
  const context = workflowGraphContext(outer.graph, [
    outer.node.id,
    wrapped.node.id,
  ]);
  const scope = workflowGraphAtPath(outer.graph, [
    outer.node.id,
    wrapped.node.id,
  ]);
  assert.equal(
    catalogNode(catalogs, scope.nodes[0], scope, new Set(), context).outputs[0]
      .type,
    "any",
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
        config: { resources: [], optional: true },
      },
      { ...leaf("text", "source") },
    ],
    edges: [],
  });
  const wrapped = wrapWorkflowSubgraph(graph, ["files", "text"], catalogs);
  const fields = workflowInputFields(wrapped.graph, catalogs);
  assert.equal(fields.find((field) => field.key === "files").required, false);
  assert.equal(fields.find((field) => field.key === "text").required, true);
});
