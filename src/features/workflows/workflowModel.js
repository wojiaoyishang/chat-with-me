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

export function resolveWorkflowSchema(schema = {}, root = schema) {
  if (!schema.$ref?.startsWith("#/")) return schema;
  const target = schema.$ref
    .slice(2)
    .split("/")
    .reduce(
      (value, token) =>
        value?.[token.replaceAll("~1", "/").replaceAll("~0", "~")],
      root,
    );
  if (!target) return schema;
  const rest = { ...schema };
  delete rest.$ref;
  return { ...target, ...rest, ...(root.$defs ? { $defs: root.$defs } : {}) };
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

export function normalizeGraph(graph, settingsDefaults = {}) {
  return {
    version: graph?.version || 2,
    nodes: clone(graph?.nodes || []),
    edges: clone(graph?.edges || []),
    settings: {
      ...clone(settingsDefaults),
      ...graph?.settings,
      ...(settingsDefaults.commonConfig || graph?.settings?.commonConfig
        ? {
            commonConfig: {
              ...clone(settingsDefaults.commonConfig || {}),
              ...graph?.settings?.commonConfig,
            },
          }
        : {}),
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

export function initializeGraph(graph, definitions, settingsDefaults) {
  const next = normalizeGraph(graph, settingsDefaults);
  next.nodes = next.nodes.map((node) => ({
    ...node,
    config: {
      ...schemaDefaults(catalogNode(definitions, node)?.configSchema),
      ...node.config,
    },
  }));
  return next;
}

export function nodeCategory(definition) {
  return definition?.category || "";
}

/** Repeated ports use stable item IDs; their order belongs to configuration. */
export function workflowRepeatedItems(node, definition) {
  const repeated = definition?.repeatedInputs;
  if (!repeated) return [];
  const value = node?.config?.[repeated.configField];
  return Array.isArray(value)
    ? value
    : schemaDefaults(definition.configSchema)?.[repeated.configField] || [];
}

export function effectiveWorkflowDefinition(node, definition) {
  const repeated = definition?.repeatedInputs;
  if (!repeated) return definition;
  const prefix = repeated.prefix || "item_";
  const inputs = (definition.inputs || []).filter(
    (port) => !port.name.startsWith(prefix),
  );
  const properties = Object.fromEntries(
    Object.entries(definition.inputSchema?.properties || {}).filter(
      ([name]) => !name.startsWith(prefix),
    ),
  );
  const required = (definition.inputSchema?.required || []).filter(
    (name) => !name.startsWith(prefix),
  );
  workflowRepeatedItems(node, definition).forEach((item, index) => {
    const kind = repeated.kinds?.find((entry) => entry.kind === item.kind);
    if (!kind || !/^[A-Za-z0-9_-]{1,48}$/.test(item.id)) return;
    const template = kind.port || {};
    const name = `${prefix}${item.id}`;
    const title = item.title?.trim() || `${kind.title} ${index + 1}`;
    const display = Object.fromEntries(
      Object.entries(template.display || {}).map(([key, value]) => [
        key,
        template.name && typeof value === "string"
          ? value.replaceAll(template.name, name)
          : value,
      ]),
    );
    const port = {
      ...template,
      name,
      title,
      type: template.type || kind.type,
      inlineAllowed: template.inlineAllowed ?? item.kind === "text",
      display: {
        ...display,
        title,
      },
    };
    inputs.push(port);
    properties[name] = port.schema || {};
    if (port.required) required.push(name);
  });
  return {
    ...definition,
    baseDefinition: definition.baseDefinition || definition,
    inputs,
    inputSchema: { ...definition.inputSchema, properties, required },
  };
}

/** One graph update preserves links during reorder and removes obsolete ports. */
export function setWorkflowRepeatedItems(graph, nodeId, definition, items) {
  const repeated = definition?.repeatedInputs;
  const node = graph.nodes.find((item) => item.id === nodeId);
  if (!node || !repeated) return graph;
  const max = repeated.maxItems || 32;
  const min = repeated.minItems || 1;
  if (items.length < min || items.length > max)
    throw new Error(`请保留 ${min} 至 ${max} 个内容输入。`);
  const ids = new Set();
  for (const item of items) {
    if (!/^[A-Za-z0-9_-]{1,48}$/.test(item.id) || ids.has(item.id))
      throw new Error("内容输入的标识无效或重复。");
    if (!repeated.kinds?.some((kind) => kind.kind === item.kind))
      throw new Error("内容输入的类型不可用。");
    ids.add(item.id);
  }
  const prefix = repeated.prefix || "item_";
  const previous = new Map(
    workflowRepeatedItems(node, definition).map((item) => [item.id, item.kind]),
  );
  const retained = new Set(
    items
      .filter((item) => previous.get(item.id) === item.kind)
      .map((item) => `${prefix}${item.id}`),
  );
  const inputs = Object.fromEntries(
    Object.entries(node.inputs || {}).filter(
      ([name]) => !name.startsWith(prefix) || retained.has(name),
    ),
  );
  for (const item of items) {
    const name = `${prefix}${item.id}`;
    if (item.kind === "text" && !retained.has(name))
      inputs[name] = { type: "literal", value: "" };
  }
  return {
    ...graph,
    nodes: graph.nodes.map((entry) =>
      entry.id === nodeId
        ? {
            ...entry,
            config: { ...entry.config, [repeated.configField]: clone(items) },
            inputs,
          }
        : entry,
    ),
    edges: graph.edges.filter(
      (edge) =>
        edge.target !== nodeId ||
        !edge.targetPort.startsWith(prefix) ||
        retained.has(edge.targetPort),
    ),
  };
}

export function nextWorkflowRepeatedItemId(items) {
  const ids = new Set(items.map((item) => item.id));
  let index = 1;
  while (ids.has(`slot-${index}`)) index += 1;
  return `slot-${index}`;
}

export function workflowPortsCompatible(output, input) {
  return (
    input?.acceptsAny === true ||
    output?.type === input?.type ||
    (input?.accepts || []).includes(output?.type)
  );
}

export function workflowInputFields(graph, definitions = []) {
  return graph.nodes
    .filter((node) => Boolean(catalogNode(definitions, node)?.source))
    .map((node) => {
      const definition = catalogNode(definitions, node);
      return {
        key: node.inputKey || node.id,
        nodeId: node.id,
        title: node.name || definition?.display?.title,
        required: definition.source.required !== false,
        schema: definition.source.valueSchema || {},
        default: sourceNodeValue(node, definition),
      };
    });
}

export function sourceNodeValue(node, definition) {
  const source = definition?.source;
  if (!source) return undefined;
  const value =
    source.configField == null
      ? node.config
      : node.config?.[source.configField];
  return clone(value ?? source.default ?? schemaDefaults(source.valueSchema));
}

export function sourceValueConfig(definition, value, current = {}) {
  const source = definition?.source;
  if (!source) return current;
  return source.configField == null
    ? { ...current, ...value }
    : { ...current, [source.configField]: value };
}

/** Required inputs follow the supplied schema, including compound sources. */
export function workflowValueMissing(value, schema = {}) {
  if (value == null || value === "") return true;
  schema = scalarSchema(resolveWorkflowSchema(schema));
  if (Array.isArray(value)) return value.length < (schema.minItems || 0);
  if (typeof value === "object")
    return (schema.required || []).some((key) =>
      workflowValueMissing(value[key], schema.properties?.[key]),
    );
  return false;
}

export function createWorkflowNode(definition, graph, position) {
  const used = new Set(graph.nodes.map((node) => node.id));
  let index = 1;
  while (used.has(`${definition.kind}-${index}`)) index += 1;
  const config = schemaDefaults(definition.configSchema) || {};
  const inputs = {};
  for (const item of workflowRepeatedItems({ config }, definition)) {
    if (item.kind === "text")
      inputs[`${definition.repeatedInputs.prefix || "item_"}${item.id}`] = {
        type: "literal",
        value: "",
      };
  }
  return {
    id: `${definition.kind}-${index}`,
    kind: definition.kind,
    name: definition.display?.title || "",
    ...(definition.source ? { inputKey: `${definition.kind}-${index}` } : {}),
    version: definition.version,
    config,
    inputs,
    position: position || {
      x: 80 + graph.nodes.length * 35,
      y: 100 + graph.nodes.length * 25,
    },
  };
}

/** Picker candidates obey the same backend-declared port rules as manual links. */
export function workflowAddCandidates(
  definitions,
  graph,
  connection,
  query = "",
) {
  let origin;
  if (connection) {
    const node = graph.nodes.find((item) => item.id === connection.nodeId);
    const definition =
      node && effectiveWorkflowDefinition(node, catalogNode(definitions, node));
    origin = definition?.[
      connection.handleType === "source" ? "outputs" : "inputs"
    ]?.find((port) => port.name === connection.handleId);
    if (!origin) return [];
  }
  const term = query.trim().toLocaleLowerCase();
  return definitions
    .filter((definition) => !definition.hidden)
    .flatMap((definition) => {
      definition = effectiveWorkflowDefinition(null, definition);
      const ports = connection
        ? (
            definition[
              connection.handleType === "source" ? "inputs" : "outputs"
            ] || []
          ).filter((port) =>
            connection.handleType === "source"
              ? workflowPortsCompatible(origin, port)
              : workflowPortsCompatible(port, origin),
          )
        : [null];
      return ports
        .filter((port) =>
          [definition.display, port?.display].some((display) =>
            Object.values(display || {})
              .join(" ")
              .toLocaleLowerCase()
              .includes(term),
          ),
        )
        .map((port) => ({ definition, port }));
    });
}

/** Adding and linking is one immutable update, so one undo removes both. */
export function addWorkflowNodeWithConnection(
  graph,
  definition,
  position,
  connection,
  port,
  definitions,
) {
  const node = createWorkflowNode(definition, graph, position);
  let next = { ...graph, nodes: [...graph.nodes, node] };
  if (connection) {
    if (!port) throw new Error("请选择新节点的连接端口。");
    const link =
      connection.handleType === "source"
        ? {
            source: connection.nodeId,
            sourcePort: connection.handleId,
            target: node.id,
            targetPort: port.name,
          }
        : {
            source: node.id,
            sourcePort: port.name,
            target: connection.nodeId,
            targetPort: connection.handleId,
          };
    next = connectWorkflow(next, link, definitions);
  }
  return { graph: next, node };
}

/** Node controls, edges and canvas controls never count as empty canvas. */
export function isWorkflowCanvasBlankTarget(target) {
  return Boolean(
    target?.closest?.(".react-flow__pane") &&
    !target.closest(
      ".react-flow__node,.react-flow__edge,.react-flow__handle,.react-flow__controls,button,input,textarea,select,[role=dialog] [data-slot=popover-content]",
    ),
  );
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
          value: node.inputs?.[port]?.value ?? schemaDefaults(schema),
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
  const output = effectiveWorkflowDefinition(
    source,
    catalogNode(definitions, source),
  )?.outputs?.find((port) => port.name === sourcePort);
  const input = effectiveWorkflowDefinition(
    target,
    catalogNode(definitions, target),
  )?.inputs?.find((port) => port.name === targetPort);
  if (!output || !input)
    throw new Error("节点端口不存在，请重新加载节点定义。");
  if (!workflowPortsCompatible(output, input))
    throw new Error(
      `端口类型不兼容：${output.display?.subtitle || ""} → ${input.display?.subtitle || ""}`,
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
