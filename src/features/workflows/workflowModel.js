/** Serializable workflow helpers shared by the canvas, forms, and tests. */
export const clone = (value) =>
  value === undefined ? undefined : JSON.parse(JSON.stringify(value));
export const SUBGRAPH_CANVAS_DEFINITION = Object.freeze({
  kind: "subgraph",
  version: 1,
  category: "control",
  display: {
    title: "子图",
    subtitle: "Subgraph",
    description:
      "独立编辑内部流程，通过输入、输出参数连接外层，也可保存为模板复用。",
  },
  inputs: [],
  outputs: [],
});

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
    version: graph?.version || 3,
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
  if (
    next.nodes.some(
      (node) =>
        ["interface_inputs", "interface_outputs"].includes(node.kind) ||
        node.id?.startsWith("@interface:"),
    )
  )
    throw new Error(
      "参数节点属于子图接口，请使用 subgraph.interface 定义，不能作为执行节点导入。",
    );
  next.nodes = next.nodes.map((node) => ({
    ...node,
    ...(node.kind === "subgraph" && node.subgraph?.graph
      ? {
          subgraph: {
            ...node.subgraph,
            graph: initializeGraph(node.subgraph.graph, definitions),
          },
        }
      : {}),
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

export function workflowInputFields(graph, definitions = [], path = []) {
  const fields = graph.nodes
    .filter((node) => Boolean(catalogNode(definitions, node)?.source))
    .map((node) => {
      const definition = catalogNode(definitions, node);
      return {
        key: node.inputKey || node.id,
        nodeId: node.id,
        title: node.name || definition?.display?.title,
        required:
          definition.source.required !== false &&
          !(node.kind === "attachments" && node.config?.optional),
        schema: definition.source.valueSchema || {},
        default: sourceNodeValue(node, definition),
      };
    });
  for (const node of graph.nodes.filter(
    (node) => node.kind === "subgraph" && node.subgraph?.graph,
  )) {
    // Quick Run must expose the compiler's effective source values. Public
    // parameters may target either source configuration or nested parameters;
    // materialize them on a private graph before recursively reading sources.
    const childGraph = clone(node.subgraph.graph);
    for (const parameter of node.subgraph.interface?.parameters || []) {
      const configured =
        Object.hasOwn(node.config || {}, parameter.name) &&
        node.config[parameter.name] !== undefined;
      if (!configured && !Object.hasOwn(parameter, "default")) continue;
      const value = configured
        ? node.config[parameter.name]
        : parameter.default;
      for (const target of parameter.targets || []) {
        const child = childGraph.nodes.find(
          (entry) => entry.id === target.nodeId,
        );
        if (child)
          child.config = { ...child.config, [target.field]: clone(value) };
      }
    }
    fields.push(
      ...workflowInputFields(childGraph, definitions, [...path, node.id]),
    );
  }
  const keys = new Set();
  for (const field of fields) {
    if (keys.has(field.key))
      throw new Error(
        `模板输入标识重复：${field.key}。请为子图中的输入节点设置独立标识。`,
      );
    keys.add(field.key);
  }
  return fields;
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
    ...(definition.kind === "subgraph"
      ? {
          subgraph: {
            initialized: false,
            graph: normalizeGraph(),
            interface: { inputs: [], outputs: [], parameters: [] },
            execution: { mode: "parallel", maxConcurrency: 4 },
          },
        }
      : {}),
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
  context = [],
) {
  let origin;
  if (connection) {
    const node = graph.nodes.find((item) => item.id === connection.nodeId);
    const definition =
      node &&
      effectiveWorkflowDefinition(
        node,
        catalogNode(definitions, node, graph, new Set(), context),
      );
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
  context = [],
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
    next = connectWorkflow(next, link, definitions, context);
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

export function workflowSourceKeys(graph) {
  return graph.nodes.flatMap((node) =>
    [
      node.inputKey,
      ...(node.subgraph?.graph ? workflowSourceKeys(node.subgraph.graph) : []),
    ].filter(Boolean),
  );
}

export function pasteWorkflowSelection(
  graph,
  clipboard,
  position,
  options = {},
) {
  if (!clipboard?.nodes?.length) return { graph, ids: [] };
  initializeGraph({ nodes: clipboard.nodes, edges: [] }, []);
  const used = new Set(graph.nodes.map((node) => node.id));
  const usedKeys = new Set(options.inputKeys || workflowSourceKeys(graph));
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
    const rekeyNestedSources = (nested, prefix) => {
      for (const child of nested.nodes) {
        if (child.inputKey) {
          const base = `${prefix}-${child.id}`;
          let suffix = 1,
            key = child.inputKey;
          while (usedKeys.has(key)) key = `${base}-${suffix++}`;
          child.inputKey = key;
          usedKeys.add(key);
        }
        if (child.subgraph?.graph)
          rekeyNestedSources(child.subgraph.graph, `${prefix}-${child.id}`);
      }
    };
    if (node.subgraph?.graph) rekeyNestedSources(node.subgraph.graph, node.id);
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

/** Confirm a placeholder in place; template sources are copied and globally rekeyed. */
export function initializeWorkflowSubgraph(
  graph,
  nodeId,
  saved,
  definitions,
  inputKeys = workflowSourceKeys(graph),
) {
  const target = graph.nodes.find((node) => node.id === nodeId);
  if (target?.kind !== "subgraph" || target.subgraph?.initialized !== false)
    throw new Error("该子图已完成配置或已被删除，请重新选择。");
  let replacement;
  if (saved) {
    const source = initializeGraph(saved.graph, definitions);
    if (!source.nodes.length) throw new Error("所选模板没有可复制的节点。");
    const wrapper =
      source.nodes.length === 1 && source.nodes[0].kind === "subgraph"
        ? clone(source.nodes[0])
        : wrapWorkflowSubgraph(
            source,
            source.nodes.map((node) => node.id),
            definitions,
            saved.title,
          ).node;
    if (wrapper.subgraph.initialized === false)
      throw new Error("所选子图模板尚未确认创建，请先完成模板配置。");
    const pasted = pasteWorkflowSelection(
      { ...graph, nodes: graph.nodes.filter((node) => node.id !== nodeId) },
      { nodes: [wrapper], edges: [] },
      target.position,
      { inputKeys },
    );
    replacement = pasted.graph.nodes.at(-1);
    replacement.id = target.id;
    replacement.position = clone(target.position);
    replacement.name = target.name || saved.title || wrapper.name;
    replacement.subgraph = {
      ...replacement.subgraph,
      initialized: true,
      origin: { templateId: saved.id, revision: saved.revision || 1 },
    };
  } else {
    replacement = {
      ...target,
      subgraph: { ...target.subgraph, initialized: true },
    };
  }
  return {
    ...graph,
    version: 3,
    nodes: graph.nodes.map((node) =>
      node.id === target.id ? replacement : node,
    ),
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

export function connectWorkflow(graph, connection, definitions, context = []) {
  const source = graph.nodes.find((node) => node.id === connection.source);
  const target = graph.nodes.find((node) => node.id === connection.target);
  if (!source || !target || source.id === target.id)
    throw new Error("请选择不同节点的输入和输出端口。");
  const sourcePort = connection.sourcePort || connection.sourceHandle;
  const targetPort = connection.targetPort || connection.targetHandle;
  const output = effectiveWorkflowDefinition(
    source,
    catalogNode(definitions, source, graph, new Set(), context),
  )?.outputs?.find((port) => port.name === sourcePort);
  const input = effectiveWorkflowDefinition(
    target,
    catalogNode(definitions, target, graph, new Set(), context),
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

export function catalogNode(
  definitions,
  node,
  graph,
  visited = new Set(),
  context = [],
) {
  const token = [...context.map((entry) => entry.container.id), node?.id].join(
    "/",
  );
  if (node?.kind === "subgraph")
    return workflowSubgraphDefinition(
      node,
      definitions,
      context.length,
      graph,
      context,
      visited,
    );
  const definition =
    definitions.find(
      (definition) =>
        definition.kind === node.kind &&
        String(definition.version) === String(node.version),
    ) || definitions.find((definition) => definition.kind === node.kind);
  if (
    !["condition", "branch_merge"].includes(node?.kind) ||
    !graph ||
    visited.has(token)
  )
    return definition;
  visited.add(token);
  const resolveEdges = (sourceGraph, targetId, targetPort, ancestors) => {
    // Literal Any bindings cannot acquire a trusted contract from a sibling
    // edge. Follow public bindings too, so nested joins use the same rule.
    const boundNode = sourceGraph?.nodes.find((entry) => entry.id === targetId);
    const found = Object.entries(boundNode?.inputs || {})
      .filter(([name]) => !targetPort || name === targetPort)
      .map(() => ({ type: "any" }));
    found.push(
      ...(sourceGraph?.edges || [])
        .filter(
          (entry) =>
            entry.target === targetId &&
            (!targetPort || entry.targetPort === targetPort),
        )
        .map((edge) => {
          const upstream = sourceGraph.nodes.find(
            (entry) => entry.id === edge.source,
          );
          return (
            upstream &&
            effectiveWorkflowDefinition(
              upstream,
              catalogNode(
                definitions,
                upstream,
                sourceGraph,
                new Set(visited),
                ancestors,
              ),
            )?.outputs?.find((entry) => entry.name === edge.sourcePort)
          );
        })
        .filter(Boolean),
    );
    const enclosing = ancestors.at(-1);
    if (enclosing)
      for (const input of enclosing.container.subgraph.interface?.inputs ||
        []) {
        if (
          input.target?.nodeId === targetId &&
          (!targetPort || input.target.port === targetPort)
        )
          found.push(
            ...resolveEdges(
              enclosing.graph,
              enclosing.container.id,
              input.name,
              ancestors.slice(0, -1),
            ),
          );
      }
    return found;
  };
  const ports = resolveEdges(graph, node.id, null, context);
  const port =
    ports.length && new Set(ports.map((item) => item.type)).size === 1
      ? ports[0]
      : null;
  if (!port || !definition) return definition;
  return {
    ...definition,
    baseDefinition: definition.baseDefinition || definition,
    outputs: (definition.outputs || []).map((output) => ({
      ...output,
      type: port.type,
      typeDescriptor: port.typeDescriptor,
      pythonType: port.pythonType,
      schema: port.schema,
      accepts: port.accepts,
      acceptsAny: false,
      display: { ...output.display, subtitle: `${output.name} · ${port.type}` },
    })),
  };
}

/** Subgraphs are scoped graphs. Editor navigation never replaces the root draft. */
export function workflowGraphAtPath(graph, path = []) {
  for (const id of path) {
    const node = graph?.nodes?.find(
      (item) => item.id === id && item.kind === "subgraph",
    );
    if (!node?.subgraph?.graph) return null;
    graph = node.subgraph.graph;
  }
  return graph;
}

/** Context permits typed passthrough inference across explicit subgraph ports. */
export function workflowGraphContext(graph, path = []) {
  const context = [];
  for (const id of path) {
    const container = graph?.nodes.find(
      (node) => node.id === id && node.kind === "subgraph",
    );
    if (!container) break;
    context.push({ graph, container });
    graph = container.subgraph.graph;
  }
  return context;
}

export function updateWorkflowGraphAtPath(graph, path, update, boundary) {
  if (!path.length)
    return typeof update === "function" ? update(graph) : update;
  const [id, ...remaining] = path;
  return {
    ...graph,
    version: 3,
    nodes: graph.nodes.map((node) =>
      node.id !== id || !node.subgraph?.graph
        ? node
        : {
            ...node,
            subgraph: {
              ...node.subgraph,
              graph: updateWorkflowGraphAtPath(
                node.subgraph.graph,
                remaining,
                update,
                boundary,
              ),
              ...(!remaining.length && boundary
                ? {
                    interface: {
                      ...node.subgraph.interface,
                      ...Object.fromEntries(
                        ["inputs", "outputs"].map((direction) => {
                          const key =
                            direction === "inputs" ? "target" : "source";
                          return [
                            direction,
                            (node.subgraph.interface?.[direction] || []).map(
                              (entry) => ({
                                ...entry,
                                [key]:
                                  boundary[direction]?.[
                                    `${entry[key]?.nodeId}\u0000${entry[key]?.port}`
                                  ] || entry[key],
                              }),
                            ),
                          ];
                        }),
                      ),
                      parameters: (
                        node.subgraph.interface?.parameters || []
                      ).map((parameter) => ({
                        ...parameter,
                        targets: (parameter.targets || []).flatMap(
                          (target) =>
                            boundary.parameters?.[
                              `${target.nodeId}\u0000${target.field}`
                            ] || [target],
                        ),
                      })),
                    },
                  }
                : {}),
            },
          },
    ),
  };
}

/** Public port contracts always come from the actual internal endpoint. */
export function workflowSubgraphDefinition(
  node,
  definitions,
  depth = 0,
  parentGraph,
  context = [],
  visited = new Set(),
) {
  const subgraph = node.subgraph || {};
  const graph = subgraph.graph || { nodes: [], edges: [] };
  const endpointPort = (entry, direction) => {
    const endpoint = direction === "inputs" ? entry.target : entry.source;
    if (!endpoint)
      return {
        name: entry.name,
        type: "any",
        schema: {},
        display: {
          title: entry.title || entry.name,
          subtitle: `${entry.name} · 待连接`,
          description:
            entry.description || "进入子图连接内部端口后自动确定类型。",
        },
      };
    const internal = graph.nodes.find((item) => item.id === endpoint?.nodeId);
    if (!internal || depth > 8) return null;
    const definition = effectiveWorkflowDefinition(
      internal,
      catalogNode(definitions, internal, graph, new Set(visited), [
        ...context,
        { container: node, graph: parentGraph },
      ]),
    );
    const port = definition?.[direction]?.find(
      (item) => item.name === endpoint.port,
    );
    if (!port) return null;
    return {
      ...port,
      name: entry.name,
      inlineAllowed:
        direction === "inputs" ? port.inlineAllowed === true : false,
      display: {
        ...port.display,
        title: entry.title || port.display?.title || entry.name,
        subtitle: `${entry.name} · ${port.type || "any"}`,
        description: entry.description || port.display?.description,
      },
    };
  };
  const inputs = (subgraph.interface?.inputs || [])
    .map((entry) => endpointPort(entry, "inputs"))
    .filter(Boolean);
  const outputs = (subgraph.interface?.outputs || [])
    .map((entry) => endpointPort(entry, "outputs"))
    .filter(Boolean);
  const properties = {};
  for (const parameter of subgraph.interface?.parameters || []) {
    const target = parameter.targets?.[0];
    const child = graph.nodes.find((item) => item.id === target?.nodeId);
    const schema = child && catalogNode(definitions, child)?.configSchema;
    properties[parameter.name] = {
      ...resolveWorkflowSchema(
        schema?.properties?.[target?.field] || {},
        schema,
      ),
      title: parameter.title || parameter.name,
      ...(parameter.description ? { description: parameter.description } : {}),
      ...(parameter.default !== undefined
        ? { default: parameter.default }
        : {}),
    };
  }
  const mode = subgraph.execution?.mode === "serial" ? "串行" : "并行";
  return {
    kind: "subgraph",
    baseDefinition: SUBGRAPH_CANVAS_DEFINITION,
    version: 1,
    category: "control",
    presentation: { icon: "workflow" },
    display: {
      title: node.name || "子图",
      subtitle: `${mode}子图 · ${graph.nodes.length} 个节点`,
      description:
        subgraph.description ||
        "端口类型继承内部节点。双击进入子图，内部日志、缓存与检查点仍属于当前任务。",
    },
    inputs,
    outputs,
    inputSchema: {
      type: "object",
      properties: Object.fromEntries(
        inputs.map((port) => [port.name, port.schema || {}]),
      ),
    },
    configSchema: { type: "object", properties },
  };
}

function workflowUniqueId(used, prefix) {
  let index = 1;
  while (used.has(`${prefix}-${index}`)) index += 1;
  const id = `${prefix}-${index}`;
  used.add(id);
  return id;
}

/** Boundary rewiring, positions and interface creation form one undoable edit. */
export function wrapWorkflowSubgraph(
  graph,
  ids,
  definitions,
  name = "知识处理子图",
  parentInterface = {},
) {
  const selected = new Set(ids);
  const children = graph.nodes.filter((node) => selected.has(node.id));
  if (!children.length) throw new Error("请先选择需要组合的节点。");
  const id = workflowUniqueId(
    new Set(graph.nodes.map((node) => node.id)),
    "subgraph",
  );
  const x = Math.min(...children.map((node) => node.position?.x || 0));
  const y = Math.min(...children.map((node) => node.position?.y || 0));
  const inputs = [],
    outputs = [];
  const boundary = (direction, nodeId, port) => {
    const list = direction === "inputs" ? inputs : outputs;
    const key = direction === "inputs" ? "target" : "source";
    let entry = list.find(
      (item) => item[key].nodeId === nodeId && item[key].port === port,
    );
    if (!entry) {
      const child = children.find((node) => node.id === nodeId);
      const endpoint = effectiveWorkflowDefinition(
        child,
        catalogNode(definitions, child),
      )?.[direction]?.find((item) => item.name === port);
      entry = {
        name: `${direction === "inputs" ? "in" : "out"}_${list.length + 1}`,
        title: endpoint?.display?.title || port,
        [key]: { nodeId, port },
      };
      list.push(entry);
    }
    return entry.name;
  };
  const internalEdges = graph.edges.filter(
    (edge) => selected.has(edge.source) && selected.has(edge.target),
  );
  const edges = graph.edges
    .filter((edge) => !internalEdges.includes(edge))
    .map((edge) => {
      if (selected.has(edge.target))
        return {
          ...edge,
          target: id,
          targetPort: boundary("inputs", edge.target, edge.targetPort),
        };
      if (selected.has(edge.source))
        return {
          ...edge,
          source: id,
          sourcePort: boundary("outputs", edge.source, edge.sourcePort),
        };
      return edge;
    });
  const node = {
    id,
    kind: "subgraph",
    version: 1,
    name,
    config: {},
    inputs: {},
    position: { x, y },
    subgraph: {
      graph: normalizeGraph({
        version: 3,
        nodes: clone(children).map((child) => ({
          ...child,
          position: {
            x: (child.position?.x || 0) - x + 80,
            y: (child.position?.y || 0) - y + 80,
          },
        })),
        edges: internalEdges,
        variables: graph.variables,
      }),
      interface: { inputs, outputs, parameters: [] },
      execution: { mode: "parallel", maxConcurrency: 4 },
    },
  };
  const remap = { inputs: {}, outputs: {}, parameters: {} };
  for (const direction of ["inputs", "outputs"]) {
    const key = direction === "inputs" ? "target" : "source";
    for (const entry of parentInterface[direction] || []) {
      if (!selected.has(entry[key]?.nodeId)) continue;
      const endpoint = entry[key];
      remap[direction][`${endpoint.nodeId}\u0000${endpoint.port}`] = {
        nodeId: id,
        port: boundary(direction, endpoint.nodeId, endpoint.port),
      };
    }
  }
  for (const parameter of parentInterface.parameters || [])
    for (const target of parameter.targets || []) {
      if (!selected.has(target.nodeId)) continue;
      const name = `parameter_${Object.keys(remap.parameters).length + 1}`;
      const key = `${target.nodeId}\u0000${target.field}`;
      if (remap.parameters[key]) continue;
      node.subgraph.interface.parameters.push({
        name,
        title: parameter.title || target.field,
        default: parameter.default,
        targets: [clone(target)],
      });
      remap.parameters[key] = { nodeId: id, field: name };
    }
  return {
    graph: {
      ...graph,
      version: 3,
      nodes: [...graph.nodes.filter((item) => !selected.has(item.id)), node],
      edges,
    },
    node,
    boundary: remap,
  };
}

/** Removing a group restores public literal bindings and parameter overrides. */
export function unwrapWorkflowSubgraph(graph, id) {
  const group = graph.nodes.find((node) => node.id === id);
  if (!group?.subgraph?.graph) throw new Error("请选择一个子图。");
  const inner = group.subgraph.graph,
    contract = group.subgraph.interface || {};
  const used = new Set(
    graph.nodes.filter((node) => node.id !== id).map((node) => node.id),
  );
  const mapping = new Map(
    inner.nodes.map((node) => [
      node.id,
      used.has(node.id)
        ? workflowUniqueId(used, `${id}-${node.kind}`)
        : (used.add(node.id), node.id),
    ]),
  );
  const children = clone(inner.nodes).map((node) => ({
    ...node,
    id: mapping.get(node.id),
    position: {
      x: (group.position?.x || 0) + (node.position?.x || 0) - 80,
      y: (group.position?.y || 0) + (node.position?.y || 0) - 80,
    },
  }));
  for (const entry of contract.inputs || []) {
    if (!entry.target) continue;
    const child = children.find(
      (node) => node.id === mapping.get(entry.target.nodeId),
    );
    if (child && group.inputs?.[entry.name])
      child.inputs = {
        ...child.inputs,
        [entry.target.port]: clone(group.inputs[entry.name]),
      };
  }
  for (const parameter of contract.parameters || []) {
    const value = Object.hasOwn(group.config || {}, parameter.name)
      ? group.config[parameter.name]
      : parameter.default;
    if (value === undefined) continue;
    for (const target of parameter.targets || []) {
      const child = children.find(
        (node) => node.id === mapping.get(target.nodeId),
      );
      if (child)
        child.config = { ...child.config, [target.field]: clone(value) };
    }
  }
  const edges = [];
  for (const edge of graph.edges) {
    let next = edge;
    if (edge.source === id) {
      const entry = contract.outputs?.find(
        (item) => item.name === edge.sourcePort,
      );
      if (!entry?.source || !mapping.has(entry.source.nodeId))
        throw new Error("子图输出端口失效，请先修复公开端口。");
      next = {
        ...next,
        source: mapping.get(entry.source.nodeId),
        sourcePort: entry.source.port,
      };
    }
    if (edge.target === id) {
      const entry = contract.inputs?.find(
        (item) => item.name === edge.targetPort,
      );
      if (!entry?.target || !mapping.has(entry.target.nodeId))
        throw new Error("子图输入端口失效，请先修复公开端口。");
      next = {
        ...next,
        target: mapping.get(entry.target.nodeId),
        targetPort: entry.target.port,
      };
    }
    edges.push(next);
  }
  const edgeIds = new Set(edges.map((edge) => edge.id));
  for (const edge of inner.edges)
    edges.push({
      ...edge,
      id: workflowUniqueId(edgeIds, "edge"),
      source: mapping.get(edge.source),
      target: mapping.get(edge.target),
    });
  const boundary = { inputs: {}, outputs: {}, parameters: {} };
  for (const direction of ["inputs", "outputs"]) {
    const key = direction === "inputs" ? "target" : "source";
    for (const entry of contract[direction] || [])
      if (entry[key])
        boundary[direction][`${id}\u0000${entry.name}`] = {
          nodeId: mapping.get(entry[key].nodeId),
          port: entry[key].port,
        };
  }
  for (const parameter of contract.parameters || []) {
    boundary.parameters[`${id}\u0000${parameter.name}`] = (
      parameter.targets || []
    ).map((target) => ({
      nodeId: mapping.get(target.nodeId),
      field: target.field,
    }));
  }
  return {
    graph: {
      ...graph,
      version: 3,
      nodes: [...graph.nodes.filter((node) => node.id !== id), ...children],
      edges,
    },
    ids: children.map((node) => node.id),
    boundary,
  };
}

/** Runtime leaves retain slash paths; collapsed groups aggregate all descendants. */
export function workflowRuntimeForGraph(
  graph,
  runtime = {},
  path = [],
  paths = {},
) {
  const local = {};
  const leafCount = (value) =>
    value.nodes.reduce(
      (total, node) =>
        total +
        (node.kind === "subgraph" && node.subgraph?.graph
          ? leafCount(node.subgraph.graph)
          : 1),
      0,
    );
  const entries = Object.entries(runtime).map(([id, state]) => ({
    ...state,
    runtimeId: id,
    nodePath: state.nodePath || paths[id]?.nodePath || id.split("/"),
  }));
  for (const node of graph.nodes) {
    const nodePath = [...path, node.id];
    const id = nodePath.join("/");
    if (node.kind !== "subgraph") {
      local[node.id] = entries.find(
        (state) => state.nodePath.join("/") === id,
      ) || { runtimeId: id };
      continue;
    }
    const descendants = entries.filter(
      (state) =>
        state.nodePath.length > nodePath.length &&
        nodePath.every((part, index) => state.nodePath[index] === part),
    );
    const count = (statuses) =>
      descendants.filter((value) => statuses.includes(value.status)).length;
    const total = Math.max(descendants.length, leafCount(node.subgraph.graph));
    const status = !descendants.length
      ? "pending"
      : count(["running"])
        ? "running"
        : count(["failed"])
          ? "failed"
          : count(["paused"])
            ? "paused"
            : count(["cancelled"])
              ? "cancelled"
              : count(["completed", "succeeded", "skipped"]) === total
                ? count(["skipped"]) === total
                  ? "skipped"
                  : "completed"
                : "pending";
    local[node.id] = {
      status,
      runtimeId: id,
      namePath: descendants
        .find((state) => state.namePath)
        ?.namePath.slice(0, nodePath.length),
      usage: {
        totalTokens: descendants.reduce(
          (total, state) =>
            total +
            Number(
              state.usage?.totalTokens ??
                state.usage?.total_tokens ??
                state.usage?.total ??
                0,
            ),
          0,
        ),
      },
      startedAt: descendants
        .map((state) => state.startedAt)
        .filter(Boolean)
        .sort()[0],
      ...(["completed", "skipped", "cancelled", "failed"].includes(status)
        ? {
            finishedAt: descendants
              .map((state) => state.finishedAt)
              .filter(Boolean)
              .sort()
              .at(-1),
          }
        : {}),
      error: descendants
        .filter((state) => state.status === "failed" && state.error)
        .map((state) => state.error)
        .join("；"),
      children: descendants,
      activeCount: count(["running"]),
      nodeProgress: {
        processed: count(["completed", "succeeded", "skipped"]),
        total,
        unit: "节点",
        percent: total
          ? (count(["completed", "succeeded", "skipped"]) * 100) / total
          : 0,
      },
      progressMessage: descendants
        .filter((value) => value.status === "running")
        .map((value) => value.progressMessage || value.message)
        .filter(Boolean)
        .join("；"),
    };
  }
  return local;
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
