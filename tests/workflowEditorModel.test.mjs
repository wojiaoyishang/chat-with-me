import test from "node:test";
import assert from "node:assert/strict";
import {
  bindWorkflowInput,
  addWorkflowNodeWithConnection,
  connectWorkflow,
  createWorkflowNode,
  isWorkflowEditorMessage,
  isWorkflowTextEditing,
  normalizeWorkflowSchema,
  normalizeGraph,
  removeWorkflowNodes,
  scalarSchema,
  workflowPortsCompatible,
  workflowAddCandidates,
  isWorkflowCanvasBlankTarget,
  workflowInputFields,
  sourceNodeValue,
  sourceValueConfig,
  nodeCategory,
  resolveWorkflowSchema,
  workflowValueMissing,
} from "../src/features/workflows/workflowModel.js";

const definitions = [
  {
    kind: "input",
    version: 1,
    category: "source",
    source: { configField: null, valueSchema: { type: "object" }, default: {} },
    configSchema: {
      type: "object",
      properties: {
        text: { type: "string", default: "" },
        max_concurrency: { type: "integer", default: 3 },
      },
    },
    inputs: [{ name: "value", type: "source" }],
    outputs: [{ name: "source", type: "source" }],
  },
  {
    kind: "parse",
    version: 1,
    inputs: [{ name: "source", type: "source", required: true }],
    outputs: [{ name: "bundle", type: "bundle" }],
  },
  {
    kind: "images",
    version: 1,
    inputs: [{ name: "bundle", type: "bundle", required: true }],
    outputs: [{ name: "bundle", type: "bundle" }],
  },
];
const graph = normalizeGraph({
  nodes: [
    {
      id: "input-1",
      kind: "input",
      version: 1,
      config: { max_concurrency: 3 },
      inputs: {},
    },
    {
      id: "parse-1",
      kind: "parse",
      version: 1,
      config: {},
      inputs: { source: { type: "variable", name: "source" } },
    },
    { id: "images-1", kind: "images", version: 1, config: {}, inputs: {} },
  ],
  variables: { source: { sourceType: "text", text: "hello" } },
});

test("node picker searches declared displays and keeps only compatible ports in either direction", () => {
  const available = [
    ...definitions,
    {
      kind: "many-inputs",
      version: 1,
      display: { title: "合并片段", subtitle: "MergeChunks" },
      inputs: [
        { name: "first", type: "bundle", display: { title: "第一内容" } },
        { name: "second", type: "bundle", display: { title: "第二内容" } },
        { name: "text", type: "str", display: { title: "说明文字" } },
      ],
      outputs: [],
    },
    {
      kind: "hidden-reader",
      hidden: true,
      inputs: [{ name: "source", type: "bundle" }],
      outputs: [{ name: "data", type: "bundle" }],
    },
  ];
  const candidates = workflowAddCandidates(available, graph, {
    nodeId: "parse-1",
    handleId: "bundle",
    handleType: "source",
  });
  assert.deepEqual(
    candidates.map(({ definition, port }) => [definition.kind, port.name]),
    [
      ["images", "bundle"],
      ["many-inputs", "first"],
      ["many-inputs", "second"],
    ],
  );
  assert.deepEqual(
    workflowAddCandidates(
      available,
      graph,
      { nodeId: "parse-1", handleId: "bundle", handleType: "source" },
      "第二",
    ).map(({ port }) => port.name),
    ["second"],
  );
  assert.deepEqual(
    workflowAddCandidates(available, graph, {
      nodeId: "parse-1",
      handleId: "source",
      handleType: "target",
    }).map(({ definition, port }) => [definition.kind, port.name]),
    [["input", "source"]],
  );
  assert.deepEqual(
    workflowAddCandidates(available, graph, {
      nodeId: "missing",
      handleId: "source",
      handleType: "target",
    }),
    [],
  );
});

test("quick add links one chosen port atomically, supports reverse links, and retains source graph on failure", () => {
  const before = structuredClone(graph);
  const forward = addWorkflowNodeWithConnection(
    graph,
    definitions[2],
    { x: 480, y: -120 },
    { nodeId: "parse-1", handleId: "bundle", handleType: "source" },
    definitions[2].inputs[0],
    definitions,
  );
  assert.deepEqual(forward.node.position, { x: 480, y: -120 });
  assert.equal(forward.graph.nodes.length, graph.nodes.length + 1);
  assert.deepEqual(forward.graph.edges.at(-1), {
    id: "edge-1",
    source: "parse-1",
    sourcePort: "bundle",
    target: forward.node.id,
    targetPort: "bundle",
  });
  const reverse = addWorkflowNodeWithConnection(
    graph,
    definitions[0],
    { x: -120, y: 30 },
    { nodeId: "parse-1", handleId: "source", handleType: "target" },
    definitions[0].outputs[0],
    definitions,
  );
  assert.equal(reverse.graph.edges.at(-1).source, reverse.node.id);
  assert.equal(reverse.graph.edges.at(-1).target, "parse-1");
  assert.equal(
    reverse.graph.nodes.find((node) => node.id === "parse-1").inputs.source,
    undefined,
  );
  assert.throws(
    () =>
      addWorkflowNodeWithConnection(
        graph,
        definitions[0],
        { x: 0, y: 0 },
        { nodeId: "parse-1", handleId: "bundle", handleType: "source" },
        definitions[0].inputs[0],
        definitions,
      ),
    /不兼容/,
  );
  assert.deepEqual(graph, before);
});

test("quick add never treats an existing node or control as empty canvas", () => {
  const target = (blocked) => ({
    closest: (selector) =>
      selector === ".react-flow__pane" ? {} : blocked ? {} : null,
  });
  assert.equal(isWorkflowCanvasBlankTarget(target(false)), true);
  assert.equal(isWorkflowCanvasBlankTarget(target(true)), false);
  assert.equal(isWorkflowCanvasBlankTarget(null), false);
});

test("native editors retain their own undo shortcuts", () => {
  assert.equal(isWorkflowTextEditing({ closest: () => ({}) }), true);
  assert.equal(isWorkflowTextEditing({ closest: () => null }), false);
});

test("unseen node kinds use catalog source bindings, categories and type names", () => {
  const definition = {
    kind: "future-clock-input",
    version: 7,
    category: "custom-inputs",
    title: "过时标题",
    display: {
      title: "预约时间",
      subtitle: "ClockSource",
      description: "预约时间输入",
    },
    source: {
      configField: "timestamp",
      required: false,
      valueSchema: { type: "integer", default: 42 },
      default: 42,
    },
    configSchema: {
      type: "object",
      properties: { timestamp: { type: "integer", default: 42 } },
    },
  };
  const created = createWorkflowNode(definition, normalizeGraph());
  assert.match(created.id, /^[a-f0-9-]{36}$/);
  assert.equal(nodeCategory(definition), "custom-inputs");
  assert.equal(nodeCategory({ kind: "text" }), "");
  assert.equal(sourceNodeValue(created, definition), 42);
  assert.deepEqual(sourceValueConfig(definition, 108, { timezone: "UTC" }), {
    timezone: "UTC",
    timestamp: 108,
  });
  assert.deepEqual(workflowInputFields({ nodes: [created] }, [definition]), [
    {
      key: created.id,
      nodeId: created.id,
      title: "预约时间",
      required: false,
      schema: { type: "integer", default: 42 },
      default: 42,
    },
  ]);
  assert.equal(created.name, "预约时间");
  const settings = normalizeGraph(
    { settings: { commonConfig: { retries: 2 } } },
    { maxConcurrency: 12, commonConfig: { retries: 5, timeout: 80 } },
  ).settings;
  assert.deepEqual(settings, {
    maxConcurrency: 12,
    commonConfig: { retries: 2, timeout: 80 },
  });
  assert.deepEqual(normalizeGraph().settings, {});
});

test("backend schema controls required compound sources and referenced configuration", () => {
  const root = {
    $defs: {
      Shared: {
        type: "object",
        properties: { concurrency: { type: "integer" } },
      },
    },
  };
  assert.equal(
    resolveWorkflowSchema({ $ref: "#/$defs/Shared", title: "共享参数" }, root)
      .type,
    "object",
  );
  assert.equal(
    resolveWorkflowSchema({ $ref: "#/$defs/Shared", title: "共享参数" }, root)
      .title,
    "共享参数",
  );
  assert.equal(
    workflowValueMissing({ documentId: "" }, { required: ["documentId"] }),
    true,
  );
  assert.equal(
    workflowValueMissing({ documentId: "doc-1" }, { required: ["documentId"] }),
    false,
  );
  assert.equal(workflowValueMissing([], { type: "array", minItems: 1 }), true);
  assert.equal(workflowValueMissing([], { type: "array" }), false);
  assert.equal(workflowValueMissing(false, { type: "boolean" }), false);
});

test("annotated catalog ranges become standard form constraints without mutation", () => {
  const source = {
    type: "object",
    properties: {
      retry_delay: {
        anyOf: [{ type: "number" }, { type: "integer" }],
        ge: 0,
        le: 120,
      },
    },
  };
  const schema = normalizeWorkflowSchema(source);
  assert.equal(schema.properties.retry_delay.minimum, 0);
  assert.equal(schema.properties.retry_delay.maximum, 120);
  assert.equal(source.properties.retry_delay.minimum, undefined);
  assert.deepEqual(
    scalarSchema({
      anyOf: [
        {
          anyOf: [{ type: "number" }, { type: "integer" }],
          minimum: 0,
          maximum: 120,
        },
        { type: "null" },
      ],
      default: null,
    }),
    { type: "number", minimum: 0, maximum: 120, default: null },
  );
});

test("constructor defaults and invoke bindings remain separate when nodes are created or connected", () => {
  const created = createWorkflowNode(definitions[0], graph);
  assert.match(created.id, /^[a-f0-9-]{36}$/);
  assert.equal(created.config.max_concurrency, 3);
  assert.deepEqual(created.inputs, {});
  const next = connectWorkflow(
    graph,
    {
      source: "input-1",
      sourceHandle: "source",
      target: "parse-1",
      targetHandle: "source",
    },
    definitions,
  );
  assert.deepEqual(next.nodes.find((node) => node.id === "parse-1").inputs, {});
  assert.deepEqual(next.nodes[0].config, graph.nodes[0].config);
  assert.equal(next.edges[0].sourcePort, "source");
  assert.match(
    next.edges[0].id,
    /^[A-Za-z0-9_-]{1,64}$/,
    "edge IDs conform to the server registry",
  );
  assert.equal(
    graph.nodes[1].inputs.source.type,
    "variable",
    "original draft is immutable",
  );
});

test("typed ports reject malformed and cyclic connections and permit valid branches", () => {
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "input-1",
          sourcePort: "source",
          target: "images-1",
          targetPort: "bundle",
        },
        definitions,
      ),
    /类型不兼容/,
  );
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "input-1",
          sourcePort: "missing",
          target: "parse-1",
          targetPort: "source",
        },
        definitions,
      ),
    /端口不存在/,
  );
  const connected = connectWorkflow(
    graph,
    {
      source: "parse-1",
      sourcePort: "bundle",
      target: "images-1",
      targetPort: "bundle",
    },
    definitions,
  );
  const withSecondImages = {
    ...connected,
    nodes: [...connected.nodes, { id: "images-2", kind: "images", version: 1 }],
  };
  const chain = connectWorkflow(
    withSecondImages,
    {
      source: "images-1",
      sourcePort: "bundle",
      target: "images-2",
      targetPort: "bundle",
    },
    definitions,
  );
  assert.throws(
    () =>
      connectWorkflow(
        chain,
        {
          source: "images-2",
          sourcePort: "bundle",
          target: "images-1",
          targetPort: "bundle",
        },
        definitions,
      ),
    /循环/,
  );
  const fork = connectWorkflow(
    withSecondImages,
    {
      source: "parse-1",
      sourcePort: "bundle",
      target: "images-2",
      targetPort: "bundle",
    },
    definitions,
  );
  assert.equal(fork.edges.length, 2);
});

test("annotated port types stay distinct and accept only declared legacy-compatible values", () => {
  const source = { type: "content-bundle" };
  assert.equal(
    workflowPortsCompatible(source, { type: "image-enriched-bundle" }),
    false,
  );
  assert.equal(
    workflowPortsCompatible(source, {
      type: "image-enriched-bundle",
      accepts: ["content-bundle"],
    }),
    true,
  );
  assert.equal(
    workflowPortsCompatible(source, { type: "any", acceptsAny: true }),
    true,
  );
  assert.equal(workflowPortsCompatible(source, { type: "any" }), false);
  const annotated = [
    {
      kind: "source-bundle",
      outputs: [{ name: "value", type: "content-bundle" }],
    },
    {
      kind: "consume-images",
      inputs: [
        {
          name: "value",
          type: "image-enriched-bundle",
          accepts: ["content-bundle"],
        },
      ],
    },
  ];
  const empty = normalizeGraph({
    nodes: [
      { id: "source", kind: "source-bundle", inputs: {} },
      { id: "target", kind: "consume-images", inputs: {} },
    ],
    edges: [],
  });
  const linked = connectWorkflow(
    empty,
    {
      source: "source",
      sourcePort: "value",
      target: "target",
      targetPort: "value",
    },
    annotated,
  );
  assert.equal(linked.edges.length, 1);
});

test("a literal/variable replaces its incoming edge and deleting nodes removes incident edges only", () => {
  const connected = connectWorkflow(
    graph,
    {
      source: "input-1",
      sourcePort: "source",
      target: "parse-1",
      targetPort: "source",
    },
    definitions,
  );
  const bound = bindWorkflowInput(connected, "parse-1", "source", {
    type: "literal",
    value: { sourceType: "text", text: "new source" },
  });
  assert.equal(bound.edges.length, 0);
  assert.equal(bound.nodes[1].inputs.source.value.text, "new source");
  const removed = removeWorkflowNodes(connected, ["input-1"]);
  assert.equal(removed.nodes.length, 2);
  assert.equal(removed.edges.length, 0);
  assert.deepEqual(removed.variables, graph.variables);
});

test("workflow dialogs accept requests only from their own same-origin task iframe", () => {
  const frame = {},
    other = {};
  const event = {
    origin: "http://localhost",
    source: frame,
    data: { type: "cwm.workflow-editor", templateId: "template-1" },
  };
  assert.equal(isWorkflowEditorMessage(event, frame, event.origin), true);
  assert.equal(
    isWorkflowEditorMessage({ ...event, source: other }, frame, event.origin),
    false,
  );
  assert.equal(
    isWorkflowEditorMessage(
      { ...event, origin: "https://foreign.example" },
      frame,
      event.origin,
    ),
    false,
  );
  assert.equal(
    isWorkflowEditorMessage(
      { ...event, data: "cwm.workflow-editor" },
      frame,
      event.origin,
    ),
    false,
  );
});
