import test from "node:test";
import assert from "node:assert/strict";
import {
  bindWorkflowInput,
  connectWorkflow,
  createWorkflowNode,
  isWorkflowEditorMessage,
  isWorkflowTextEditing,
  normalizeWorkflowSchema,
  normalizeGraph,
  removeWorkflowNodes,
  scalarSchema,
  workflowPortDescription,
  workflowPortTypeLabel,
  workflowPortsCompatible,
} from "../src/features/workflows/workflowModel.js";

const definitions = [
  {
    kind: "input",
    version: 1,
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

test("native editors retain their own undo shortcuts", () => {
  assert.equal(isWorkflowTextEditing({ closest: () => ({}) }), true);
  assert.equal(isWorkflowTextEditing({ closest: () => null }), false);
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
  assert.equal(created.id, "input-2");
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
  assert.equal(
    workflowPortTypeLabel({ type: "image-enriched-bundle" }),
    "图片概括结果",
  );
  assert.equal(
    workflowPortTypeLabel({ type: "custom-distribution" }),
    "custom-distribution",
  );
  assert.match(
    workflowPortDescription({
      name: "bundle",
      type: "content-bundle",
      accepts: ["bundle"],
      pythonAnnotation: "ContentBundle",
    }),
    /还接受：旧版内容集合.*Python: ContentBundle/s,
  );
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
  assert.equal(workflowPortsCompatible(source, { type: "any" }), true);
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
