/** Serializable workflow helpers shared by the canvas, forms, and tests. */
export const clone = (value) => JSON.parse(JSON.stringify(value));

export function schemaDefaults(schema = {}) {
  if (Object.hasOwn(schema, "default")) return clone(schema.default);
  if (schema.type === "object" || schema.properties) {
    return Object.fromEntries(
      Object.entries(schema.properties || {})
        .filter(([, property]) => Object.hasOwn(property, "default"))
        .map(([key, property]) => [key, schemaDefaults(property)]),
    );
  }
  return undefined;
}

export function normalizeGraph(graph) {
  return {
    version: 1,
    nodes: clone(graph?.nodes || []),
    edges: clone(graph?.edges || []),
    settings: { maxConcurrency: 2, ...graph?.settings },
    variables: clone(graph?.variables || {}),
  };
}

export function initializeGraph(graph, definitions) {
  const next = normalizeGraph(graph);
  next.nodes = next.nodes.map((node) => ({
    ...node,
    config: {
      ...schemaDefaults(catalogNode(definitions, node)?.configSchema),
      ...node.config,
    },
  }));
  return next;
}

export function createWorkflowNode(definition, graph, position) {
  const used = new Set(graph.nodes.map((node) => node.id));
  let index = 1;
  while (used.has(`${definition.kind}-${index}`)) index += 1;
  return {
    id: `${definition.kind}-${index}`,
    kind: definition.kind,
    version: definition.version,
    config: schemaDefaults(definition.configSchema) || {},
    inputs: {},
    position: position || {
      x: 80 + graph.nodes.length * 35,
      y: 100 + graph.nodes.length * 25,
    },
  };
}

export function connectWorkflow(graph, connection, definitions) {
  const source = graph.nodes.find((node) => node.id === connection.source);
  const target = graph.nodes.find((node) => node.id === connection.target);
  if (!source || !target || source.id === target.id)
    throw new Error("请选择不同节点的输入和输出端口。");
  const sourcePort = connection.sourcePort || connection.sourceHandle;
  const targetPort = connection.targetPort || connection.targetHandle;
  const output = definitions
    .find((item) => item.kind === source.kind)
    ?.outputs?.find((port) => port.name === sourcePort);
  const input = definitions
    .find((item) => item.kind === target.kind)
    ?.inputs?.find((port) => port.name === targetPort);
  if (!output || !input)
    throw new Error("节点端口不存在，请重新加载节点定义。");
  if (output.type !== input.type && input.type !== "any")
    throw new Error(`端口类型不兼容：${output.type} → ${input.type}`);
  const reachable = new Set([target.id]);
  for (let round = 0; round < graph.nodes.length; round += 1) {
    for (const edge of graph.edges)
      if (reachable.has(edge.source)) reachable.add(edge.target);
  }
  if (reachable.has(source.id)) throw new Error("目前工作流不支持循环连接。");
  const edges = input.multiple
    ? [...graph.edges]
    : graph.edges.filter(
        (edge) =>
          !(edge.target === target.id && edge.targetPort === targetPort),
      );
  if (
    edges.some(
      (edge) =>
        edge.source === source.id &&
        edge.sourcePort === sourcePort &&
        edge.target === target.id &&
        edge.targetPort === targetPort,
    )
  )
    return graph;
  const inputs = { ...target.inputs };
  delete inputs[targetPort];
  let edgeIndex = 1;
  const ids = new Set(edges.map((edge) => edge.id));
  while (ids.has(`edge-${edgeIndex}`)) edgeIndex += 1;
  return {
    ...graph,
    nodes: graph.nodes.map((node) =>
      node.id === target.id ? { ...node, inputs } : node,
    ),
    edges: [
      ...edges,
      {
        id: `edge-${edgeIndex}`,
        source: source.id,
        sourcePort,
        target: target.id,
        targetPort,
      },
    ],
  };
}

export function bindWorkflowInput(graph, nodeId, port, binding) {
  return {
    ...graph,
    edges: graph.edges.filter(
      (edge) => !(edge.target === nodeId && edge.targetPort === port),
    ),
    nodes: graph.nodes.map((node) => {
      if (node.id !== nodeId) return node;
      const inputs = { ...node.inputs };
      if (binding) inputs[port] = binding;
      else delete inputs[port];
      return { ...node, inputs };
    }),
  };
}

export function removeWorkflowNodes(graph, ids) {
  const removed = new Set(ids);
  return {
    ...graph,
    nodes: graph.nodes.filter((node) => !removed.has(node.id)),
    edges: graph.edges.filter(
      (edge) => !removed.has(edge.source) && !removed.has(edge.target),
    ),
  };
}

export function catalogNode(definitions, node) {
  return (
    definitions.find(
      (definition) =>
        definition.kind === node.kind &&
        String(definition.version) === String(node.version),
    ) || definitions.find((definition) => definition.kind === node.kind)
  );
}

export function isWorkflowEditorMessage(event, frameWindow, origin) {
  return (
    event.origin === origin &&
    event.source === frameWindow &&
    event.data &&
    typeof event.data === "object" &&
    event.data.type === "cwm.workflow-editor"
  );
}
