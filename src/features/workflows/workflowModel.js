/** Serializable workflow helpers shared by the canvas, forms, and tests. */
export const clone = (value) =>
  value === undefined ? undefined : JSON.parse(JSON.stringify(value));

/** Catalog annotations may use Pydantic range names; forms use JSON Schema. */
export function normalizeWorkflowSchema(value) {
  if (Array.isArray(value)) return value.map(normalizeWorkflowSchema);
  if (!value || typeof value !== "object") return value;
  const schema = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      normalizeWorkflowSchema(item),
    ]),
  );
  for (const [source, target] of [
    ["ge", "minimum"],
    ["gt", "exclusiveMinimum"],
    ["le", "maximum"],
    ["lt", "exclusiveMaximum"],
  ]) {
    if (schema[source] != null && schema[target] == null)
      schema[target] = schema[source];
    delete schema[source];
  }
  return schema;
}

export function scalarSchema(schema = {}) {
  const { anyOf, oneOf, ...base } = schema;
  const variant = (anyOf || oneOf || []).find(
    (item) => item.type !== "null" && (item.type || item.anyOf || item.oneOf),
  );
  return variant ? scalarSchema({ ...base, ...variant }) : schema;
}

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
    version: graph?.version || 2,
    nodes: clone(graph?.nodes || []),
    edges: clone(graph?.edges || []),
    settings: {
      maxConcurrency: 4,
      ...graph?.settings,
      commonConfig: {
        try_times: 3,
        retry_delay: 1,
        max_concurrency: 2,
        modelId: "",
        ...graph?.settings?.commonConfig,
      },
    },
    variables: clone(graph?.variables || {}),
  };
}

export function updateWorkflowNodePositions(graph, moved = []) {
  const positions = new Map(
    moved
      .filter(
        (node) =>
          Number.isFinite(node.position?.x) &&
          Number.isFinite(node.position?.y),
      )
      .map((node) => [node.id, node.position]),
  );
  let changed = false;
  const nodes = graph.nodes.map((node) => {
    const position = positions.get(node.id);
    if (
      !position ||
      (node.position?.x === position.x && node.position?.y === position.y)
    )
      return node;
    changed = true;
    return { ...node, position: { x: position.x, y: position.y } };
  });
  return changed ? { ...graph, nodes } : graph;
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

export function nodeCategory(definition, node) {
  if (definition?.category) return definition.category;
  if (
    ["input", "text", "number", "boolean", "attachments", "document"].includes(
      node?.kind || definition?.kind,
    )
  )
    return "source";
  return ["ingest", "result"].includes(node?.kind || definition?.kind)
    ? "sink"
    : "process";
}

const workflowPortLabels = {
  any: "任意结果",
  str: "文本",
  string: "文本",
  number: "数字",
  int: "整数",
  integer: "整数",
  float: "小数",
  bool: "布尔值",
  boolean: "布尔值",
  "text-chunks": "文本块列表",
  network: "知识网络",
  "source-snapshot": "来源快照",
  "content-bundle": "内容与图片",
  "image-enriched-bundle": "图片概括结果",
  "extracted-knowledge": "知识提取结果",
  // Old saved graphs retain these port types until explicitly migrated.
  source: "旧版来源",
  bundle: "旧版内容集合",
  extracted: "旧版提取结果",
};

export function workflowPortTypeLabel(port) {
  return (
    port?.typeLabel ||
    workflowPortLabels[port?.type] ||
    port?.type ||
    "未知类型"
  );
}

export function workflowPortDescription(port) {
  const type = workflowPortTypeLabel(port);
  const accepted = (port?.accepts || [])
    .filter((item) => item !== port.type)
    .map((item) => workflowPortTypeLabel({ type: item }));
  const compatibility = accepted.length
    ? `\n还接受：${accepted.join("、")}`
    : "";
  return `${port?.title || port?.name || "端口"} · ${type} (${port?.type || "?"})${compatibility}${port?.description ? `\n${port.description}` : ""}${port?.pythonAnnotation ? `\nPython: ${port.pythonAnnotation}` : ""}`;
}

export function workflowPortsCompatible(output, input) {
  return (
    input?.type === "any" ||
    output?.type === input?.type ||
    (input?.accepts || []).includes(output?.type)
  );
}

export function workflowInputFields(graph, definitions = []) {
  return graph.nodes
    .filter(
      (node) => nodeCategory(catalogNode(definitions, node), node) === "source",
    )
    .map((node) => {
      const definition = catalogNode(definitions, node);
      const schema = definition?.configSchema?.properties || {};
      return {
        key: node.inputKey || node.id,
        nodeId: node.id,
        title: node.name || definition?.title || node.id,
        kind: node.kind,
        required: true,
        schema: schema.value || {},
        default: sourceNodeValue(node),
      };
    });
}

export function sourceNodeValue(node) {
  if (node.kind === "attachments") return node.config?.resources || [];
  if (node.kind === "document")
    return {
      documentId: node.config?.documentId || "",
      revision: node.config?.revision ?? null,
    };
  if (node.kind === "input") return clone(node.config || {});
  return (
    node.config?.value ??
    (node.kind === "number" ? 0 : node.kind === "boolean" ? false : "")
  );
}

export function sourceValueConfig(kind, value, current = {}) {
  if (kind === "attachments") return { ...current, resources: value || [] };
  if (kind === "document") return { ...current, ...value };
  if (kind === "input") return { ...current, ...value };
  return { ...current, value };
}

export function createWorkflowNode(definition, graph, position) {
  const used = new Set(graph.nodes.map((node) => node.id));
  let index = 1;
  while (used.has(`${definition.kind}-${index}`)) index += 1;
  return {
    id: `${definition.kind}-${index}`,
    kind: definition.kind,
    name: definition.title || definition.kind,
    ...(nodeCategory(definition) === "source"
      ? { inputKey: `${definition.kind}-${index}` }
      : {}),
    version: definition.version,
    config: schemaDefaults(definition.configSchema) || {},
    inputs: {},
    position: position || {
      x: 80 + graph.nodes.length * 35,
      y: 100 + graph.nodes.length * 25,
    },
  };
}

export function copyWorkflowSelection(graph, ids) {
  const selected = new Set(ids);
  return clone({
    nodes: graph.nodes.filter((node) => selected.has(node.id)),
    edges: graph.edges.filter(
      (edge) => selected.has(edge.source) && selected.has(edge.target),
    ),
  });
}

export function pasteWorkflowSelection(graph, clipboard, position) {
  if (!clipboard?.nodes?.length) return { graph, ids: [] };
  const used = new Set(graph.nodes.map((node) => node.id));
  const usedKeys = new Set(
    graph.nodes.map((node) => node.inputKey).filter(Boolean),
  );
  const mapping = new Map();
  const minX = Math.min(
    ...clipboard.nodes.map((node) => node.position?.x || 0),
  );
  const minY = Math.min(
    ...clipboard.nodes.map((node) => node.position?.y || 0),
  );
  const base = position || { x: minX + 45, y: minY + 65 };
  const nodes = clipboard.nodes.map((original) => {
    let index = 1;
    while (used.has(`${original.kind}-${index}`)) index += 1;
    const id = `${original.kind}-${index}`;
    used.add(id);
    mapping.set(original.id, id);
    const node = clone(original);
    node.id = id;
    node.position = {
      x: base.x + (original.position?.x || 0) - minX,
      y: base.y + (original.position?.y || 0) - minY,
    };
    if (original.inputKey) {
      let suffix = 1,
        key = id;
      while (usedKeys.has(key)) key = `${id}-${suffix++}`;
      node.inputKey = key;
      usedKeys.add(key);
    }
    return node;
  });
  const edgeIds = new Set(graph.edges.map((edge) => edge.id));
  const edges = (clipboard.edges || [])
    .filter((edge) => mapping.has(edge.source) && mapping.has(edge.target))
    .map((original) => {
      let index = 1;
      while (edgeIds.has(`edge-${index}`)) index += 1;
      const id = `edge-${index}`;
      edgeIds.add(id);
      return {
        ...clone(original),
        id,
        source: mapping.get(original.source),
        target: mapping.get(original.target),
      };
    });
  return {
    graph: {
      ...graph,
      nodes: [...graph.nodes, ...nodes],
      edges: [...graph.edges, ...edges],
    },
    ids: nodes.map((node) => node.id),
  };
}

export function setWorkflowPortMode(graph, nodeId, port, mode, schema = {}) {
  const node = graph.nodes.find((item) => item.id === nodeId);
  if (!node) return graph;
  return bindWorkflowInput(
    graph,
    nodeId,
    port,
    mode === "inline"
      ? {
          type: "literal",
          value:
            node.inputs?.[port]?.value ??
            schema.default ??
            (schema.type === "boolean"
              ? false
              : ["number", "integer"].includes(schema.type)
                ? 0
                : ""),
        }
      : null,
  );
}

export function isWorkflowTextEditing(target) {
  return Boolean(
    target?.closest?.(
      'input,textarea,select,[contenteditable="true"],.cm-editor,[role="combobox"],[role="textbox"]',
    ),
  );
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
  if (!workflowPortsCompatible(output, input))
    throw new Error(
      `端口类型不兼容：${workflowPortTypeLabel(output)} (${output.type}) → ${workflowPortTypeLabel(input)} (${input.type})`,
    );
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
