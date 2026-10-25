import {
  catalogNode,
  effectiveWorkflowDefinition,
  updateWorkflowGraphAtPath,
  workflowGraphAtPath,
  workflowGraphContext,
} from "./workflowModel.js";

const PREFIX = "@interface:";
export const workflowInterfaceId = (direction, name) =>
  `${PREFIX}${direction}:${name}`;
export function parseWorkflowInterfaceId(id) {
  const match = /^@interface:(inputs|outputs):(.+)$/.exec(id || "");
  return match ? { direction: match[1], name: match[2] } : null;
}
export const WORKFLOW_INTERFACE_DEFINITIONS = [
  ["inputs", "输入参数", "外层输入 → 内部节点"],
  ["outputs", "输出参数", "内部节点 → 外层输出"],
].map(([direction, title, description]) => ({
  kind: `interface_${direction}`,
  version: 1,
  category: "control",
  virtualInterface: direction,
  display: { title, subtitle: "子图接口", description },
  inputs: [],
  outputs: [],
}));

export function workflowInterfaceContainer(root, path) {
  if (!path.length) return null;
  return workflowGraphAtPath(root, path.slice(0, -1))?.nodes.find(
    (node) => node.id === path.at(-1),
  );
}

/** Interface pills are a canvas projection, never executable workflow nodes. */
export function workflowInterfaceProjection(root, path, definitions) {
  const container = workflowInterfaceContainer(root, path);
  if (!container) return { nodes: [], edges: [] };
  const graph = container.subgraph.graph;
  const parent = workflowGraphAtPath(root, path.slice(0, -1));
  const ports = catalogNode(
    definitions,
    container,
    parent,
    new Set(),
    workflowGraphContext(root, path.slice(0, -1)),
  );
  const xs = graph.nodes.map((node) => node.position?.x || 0);
  const left = Math.min(100, ...xs) - 240;
  const right = Math.max(300, ...xs) + 360;
  const nodes = [],
    edges = [];
  for (const direction of ["inputs", "outputs"])
    for (const [index, entry] of (
      container.subgraph.interface?.[direction] || []
    ).entries()) {
      const id = workflowInterfaceId(direction, entry.name);
      const endpoint = direction === "inputs" ? entry.target : entry.source;
      nodes.push({
        id,
        type: "workflowInterface",
        position: entry.position || {
          x: direction === "inputs" ? left : right,
          y: 80 + index * 100,
        },
        data: {
          direction,
          entry,
          port: ports?.[direction]?.find((port) => port.name === entry.name),
        },
      });
      if (endpoint && graph.nodes.some((node) => node.id === endpoint.nodeId))
        edges.push({
          id,
          source: direction === "inputs" ? id : endpoint.nodeId,
          sourcePort: direction === "inputs" ? "value" : endpoint.port,
          target: direction === "inputs" ? endpoint.nodeId : id,
          targetPort: direction === "inputs" ? endpoint.port : "value",
          interfaceBinding: true,
        });
    }
  return { nodes, edges };
}

export function updateWorkflowInterface(root, path, direction, name, patch) {
  const container = workflowInterfaceContainer(root, path);
  if (!container) throw new Error("参数节点只能在子图内部使用。");
  const entries = container.subgraph.interface?.[direction] || [];
  const old = entries.find((entry) => entry.name === name);
  const next =
    typeof patch === "function"
      ? patch(old)
      : patch === null
        ? null
        : { ...old, ...patch };
  if (
    next &&
    (!/^[A-Za-z0-9_-]{1,64}$/.test(next.name) ||
      entries.some((entry) => entry !== old && entry.name === next.name))
  )
    throw new Error(
      "参数标识需为 1–64 位字母、数字、短横线或下划线，且不可重复。",
    );
  // An enclosing interface depends on this public port. Require an explicit
  // edit there instead of silently deleting another level of public contract.
  if (!next) {
    const enclosing = workflowInterfaceContainer(root, path.slice(0, -1));
    const key = direction === "inputs" ? "target" : "source";
    if (
      enclosing?.subgraph.interface?.[direction]?.some(
        (entry) =>
          entry[key]?.nodeId === container.id && entry[key]?.port === name,
      )
    )
      throw new Error("此参数已被更外层子图公开，请先移除外层对应参数。");
  }
  const rename = next && old && next.name !== name;
  return updateWorkflowGraphAtPath(
    root,
    path.slice(0, -1),
    (parent) => ({
      ...parent,
      nodes: parent.nodes.map((node) => {
        if (node.id !== container.id) return node;
        const inputs = { ...node.inputs };
        if (direction === "inputs" && (rename || !next)) {
          if (rename && Object.hasOwn(inputs, name))
            inputs[next.name] = inputs[name];
          delete inputs[name];
        }
        return {
          ...node,
          inputs,
          subgraph: {
            ...node.subgraph,
            interface: {
              ...node.subgraph.interface,
              [direction]: old
                ? entries.flatMap((entry) =>
                    entry.name === name ? (next ? [next] : []) : [entry],
                  )
                : [...entries, next],
            },
          },
        };
      }),
      edges: parent.edges.flatMap((edge) => {
        const matches =
          direction === "inputs"
            ? edge.target === container.id && edge.targetPort === name
            : edge.source === container.id && edge.sourcePort === name;
        if (!matches) return [edge];
        return !next
          ? []
          : [
              {
                ...edge,
                [direction === "inputs" ? "targetPort" : "sourcePort"]:
                  next.name,
              },
            ];
      }),
    }),
    rename
      ? {
          [direction]: {
            [`${container.id}\u0000${name}`]: {
              nodeId: container.id,
              port: next.name,
            },
          },
        }
      : undefined,
  );
}

export function addWorkflowInterface(root, path, direction, position) {
  const container = workflowInterfaceContainer(root, path);
  if (!container) throw new Error("参数节点只能在子图内部使用。");
  const entries = container.subgraph.interface?.[direction] || [];
  const prefix = direction === "inputs" ? "input" : "output";
  let index = 1;
  while (entries.some((entry) => entry.name === `${prefix}_${index}`))
    index += 1;
  const name = `${prefix}_${index}`;
  const entry = {
    name,
    title: direction === "inputs" ? "输入参数" : "输出参数",
    [direction === "inputs" ? "target" : "source"]: null,
    ...(position ? { position } : {}),
  };
  return {
    graph: updateWorkflowInterface(root, path, direction, name, entry),
    id: workflowInterfaceId(direction, name),
  };
}

export function connectWorkflowInterface(root, path, connection, definitions) {
  const source = parseWorkflowInterfaceId(connection.source);
  const target = parseWorkflowInterfaceId(connection.target);
  if (
    (!source && !target) ||
    (source && target) ||
    (source && source.direction !== "inputs") ||
    (target && target.direction !== "outputs")
  )
    throw new Error("输入参数连接内部输入，内部输出连接输出参数。");
  const binding = source || target;
  const nodeId = source ? connection.target : connection.source;
  const port = source
    ? connection.targetPort || connection.targetHandle
    : connection.sourcePort || connection.sourceHandle;
  const graph = workflowGraphAtPath(root, path);
  const node = graph?.nodes.find((node) => node.id === nodeId);
  const definition =
    node &&
    effectiveWorkflowDefinition(
      node,
      catalogNode(
        definitions,
        node,
        graph,
        new Set(),
        workflowGraphContext(root, path),
      ),
    );
  if (
    !definition?.[source ? "inputs" : "outputs"]?.some(
      (entry) => entry.name === port,
    )
  )
    throw new Error("请选择内部节点的有效端口。");
  if (source) {
    const container = workflowInterfaceContainer(root, path);
    if (
      container.subgraph.interface.inputs.some(
        (entry) =>
          entry.name !== source.name &&
          entry.target?.nodeId === nodeId &&
          entry.target?.port === port,
      )
    )
      throw new Error("此内部输入已被其他输入参数公开。");
    root = updateWorkflowGraphAtPath(root, path, (inner) => ({
      ...inner,
      edges: inner.edges.filter(
        (edge) => !(edge.target === nodeId && edge.targetPort === port),
      ),
      nodes: inner.nodes.map((entry) => {
        if (entry.id !== nodeId) return entry;
        const inputs = { ...entry.inputs };
        delete inputs[port];
        return { ...entry, inputs };
      }),
    }));
  }
  return updateWorkflowInterface(root, path, binding.direction, binding.name, {
    [source ? "target" : "source"]: { nodeId, port },
  });
}
