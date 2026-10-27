/** Pure presentation helpers. Node IDs, targets, policies and editable fields
 * are supplied by the server; this module never interprets a business format. */
const ROOT_SCOPE = { id: "root", title: "主流程", parentId: null };

export function graphScopes(graph = {}) {
  const scopes = new Map([[ROOT_SCOPE.id, ROOT_SCOPE]]);
  for (const scope of graph.scopes || [])
    scopes.set(String(scope.id), { ...scope, id: String(scope.id) });
  return scopes;
}

export function scopeForNode(graph, nodeId) {
  return String(
    graph.nodes?.find((node) => String(node.id) === String(nodeId))?.scopeId ||
      "root",
  );
}

export function scopeBreadcrumbs(graph, scopeId) {
  const scopes = graphScopes(graph);
  const result = [],
    visited = new Set();
  let scope = scopes.get(String(scopeId)) || ROOT_SCOPE;
  while (scope && !visited.has(scope.id)) {
    visited.add(scope.id);
    result.unshift(scope);
    scope = scope.parentId == null ? null : scopes.get(String(scope.parentId));
  }
  if (result[0]?.id !== "root") result.unshift(scopes.get("root"));
  return result;
}

/** Display edges crossing a scope boundary on the visible containing node,
 * leaving the source graph and its executable links unchanged. */
export function scopedGraph(graph, scopeId = "root") {
  const nodes = (graph.nodes || []).filter(
    (node) => String(node.scopeId || "root") === String(scopeId),
  );
  const ids = new Set(nodes.map((node) => String(node.id)));
  const allNodes = new Map(
    (graph.nodes || []).map((node) => [String(node.id), node]),
  );
  const scopes = graphScopes(graph);
  const endpoint = (nodeId) => {
    const id = String(nodeId);
    if (ids.has(id)) return { id, projected: false };
    const visited = new Set();
    let scope = scopes.get(String(allNodes.get(id)?.scopeId));
    while (scope && !visited.has(scope.id)) {
      visited.add(scope.id);
      if (String(scope.parentId) === String(scopeId)) {
        const entry = String(scope.entryNodeId ?? "");
        return ids.has(entry) ? { id: entry, projected: true } : null;
      }
      scope = scopes.get(String(scope.parentId));
    }
    return null;
  };
  const edges = [],
    seen = new Set();
  for (const edge of graph.edges || []) {
    const source = endpoint(edge.source),
      target = endpoint(edge.target);
    if (!source || !target || source.id === target.id) continue;
    const projected = {
      ...edge,
      source: source.id,
      target: target.id,
      sourceHandle: source.projected ? "scope-out" : edge.sourceHandle,
      targetHandle: target.projected ? "scope-in" : edge.targetHandle,
    };
    const key = JSON.stringify([
      projected.source,
      projected.target,
      projected.sourceHandle,
      projected.targetHandle,
    ]);
    if (!seen.has(key)) {
      seen.add(key);
      edges.push(projected);
    }
  }
  return { nodes, edges };
}

export function childScopeNodeIds(graph, scopeId) {
  const scopes = graphScopes(graph),
    descendants = new Set([String(scopeId)]);
  let changed = true;
  while (changed) {
    changed = false;
    scopes.forEach((scope) => {
      if (
        descendants.has(String(scope.parentId)) &&
        !descendants.has(scope.id)
      ) {
        descendants.add(scope.id);
        changed = true;
      }
    });
  }
  return new Set(
    (graph.nodes || [])
      .filter((node) => descendants.has(String(node.scopeId || "root")))
      .map((node) => String(node.id)),
  );
}

/** Unpositioned graphs receive a simple dependency layout. Existing positions
 * are visual state and never get replaced by selection or metadata changes. */
export function layoutGraph(nodes = [], edges = [], usePositions = false) {
  if (usePositions)
    return nodes.map((node) => ({
      ...node,
      position: node.position || { x: 0, y: 0 },
    }));
  const ids = new Set(nodes.map((node) => String(node.id)));
  const downstream = new Map(nodes.map((node) => [String(node.id), []]));
  const incoming = new Map(nodes.map((node) => [String(node.id), 0]));
  const levels = new Map(nodes.map((node) => [String(node.id), 0]));
  edges.forEach((edge) => {
    const source = String(edge.source),
      target = String(edge.target);
    if (ids.has(source) && ids.has(target)) {
      downstream.get(source).push(target);
      incoming.set(target, incoming.get(target) + 1);
    }
  });
  const queue = [...incoming.entries()]
    .filter(([, count]) => count === 0)
    .map(([id]) => id);
  for (let index = 0; index < queue.length; index += 1) {
    const id = queue[index];
    downstream.get(id).forEach((target) => {
      levels.set(target, Math.max(levels.get(target), levels.get(id) + 1));
      incoming.set(target, incoming.get(target) - 1);
      if (!incoming.get(target)) queue.push(target);
    });
  }
  const rows = new Map();
  return nodes.map((node) => {
    const column = levels.get(String(node.id)),
      row = rows.get(column) || 0;
    rows.set(column, row + 1);
    return { ...node, position: { x: column * 300, y: row * 210 } };
  });
}

export function reconcileDiagramNodes(current, next, resetPositions = false) {
  const previous = new Map(current.map((node) => [String(node.id), node]));
  return next.map((node) => {
    const old = previous.get(String(node.id));
    return old
      ? {
          ...old,
          ...node,
          position: resetPositions ? node.position : old.position,
        }
      : node;
  });
}

export function bindingTargets(field) {
  return field.linked || field.readonly || field.bindable === false
    ? []
    : (field.targets || []).map((target) => ({
        nodeId: String(target.nodeId),
        field: target.field,
      }));
}

const sameTarget = (binding, target) =>
  String(binding.nodeId) === String(target.nodeId) &&
  binding.field === target.field;

export function bindingState(bindings, field) {
  const targets = bindingTargets(field);
  const entries = targets
    .map((target) => bindings.find((binding) => sameTarget(binding, target)))
    .filter(Boolean);
  const mixed = new Set(entries.map((entry) => entry.name)).size > 1;
  return {
    targets,
    entries,
    mixed,
    complete: targets.length > 0 && entries.length === targets.length,
    binding: entries.length && !mixed ? entries[0] : null,
  };
}

/** Share metadata by the explicit parameter identity, preserving every opaque
 * target ID. A field's default is server-authored rather than guessed by name. */
export function toggleBinding(bindings, field, enabled, prototype = null) {
  const state = bindingState(bindings, field);
  if (!state.targets.length) return bindings;
  const rest = bindings.filter(
    (binding) => !state.targets.some((target) => sameTarget(binding, target)),
  );
  if (!enabled) return rest;
  const source = prototype || state.binding || field.defaultBinding;
  if (!source?.name) throw new Error("服务端未提供此字段的参数定义。");
  const {
    nodeId: _node,
    field: _field,
    targets: _targets,
    ...metadata
  } = source;
  void _node;
  void _field;
  void _targets;
  if (
    field.allowedKinds?.length &&
    !field.allowedKinds.some((kind) => (kind.value ?? kind) === metadata.kind)
  )
    throw new Error("所选参数类型不适用于此字段。");
  return [
    ...rest,
    ...state.targets.map((target) => ({ ...metadata, ...target })),
  ];
}

export function updateBindingMetadata(bindings, field, patch) {
  const state = bindingState(bindings, field);
  if (!state.binding) return bindings;
  const current = state.binding;
  const shared =
    patch.name && patch.name !== current.name
      ? bindings.find((entry) => entry.name === patch.name)
      : null;
  const metadata = shared || { ...current, ...patch };
  return bindings.map((entry) => {
    if (
      state.targets.some((target) => sameTarget(entry, target)) ||
      (!Object.hasOwn(patch, "name") && entry.name === current.name)
    )
      return { ...metadata, nodeId: entry.nodeId, field: entry.field };
    return entry;
  });
}

export function logicalParameters(bindings) {
  const result = new Map();
  for (const binding of bindings) {
    const previous = result.get(binding.name);
    if (previous)
      previous.targets.push({ nodeId: binding.nodeId, field: binding.field });
    else
      result.set(binding.name, {
        ...binding,
        targets: [{ nodeId: binding.nodeId, field: binding.field }],
      });
  }
  return [...result.values()];
}

/** Only the server-selected layout storage format is touched; raw node values
 * and executable connection objects survive layout editing byte-for-byte. */
export function updateGraphPositions(
  graph,
  diagramNodes,
  storage = "ui-workflow",
) {
  const positions = new Map(
    diagramNodes
      .map((node) => [String(node.id), node.position])
      .filter(
        ([, position]) =>
          Number.isFinite(position?.x) && Number.isFinite(position?.y),
      ),
  );
  const next = {
    ...graph,
    nodes: (graph.nodes || []).map((node) =>
      positions.has(String(node.id))
        ? { ...node, position: positions.get(String(node.id)) }
        : node,
    ),
  };
  if (storage === "positions")
    return {
      ...next,
      positions: { ...graph.positions, ...Object.fromEntries(positions) },
    };
  if (storage !== "ui-workflow") return next;
  const ui = graph.uiWorkflow || {},
    existing = new Set((ui.nodes || []).map((node) => String(node.id)));
  const nodes = (ui.nodes || []).map((node) =>
    positions.has(String(node.id))
      ? {
          ...node,
          pos: [
            positions.get(String(node.id)).x,
            positions.get(String(node.id)).y,
          ],
        }
      : node,
  );
  positions.forEach((position, id) => {
    if (!existing.has(id) && !id.includes(":"))
      nodes.push({ id, pos: [position.x, position.y] });
  });
  return {
    ...next,
    uiWorkflow: {
      ...ui,
      nodes,
      _cwm: {
        ...ui._cwm,
        positions: {
          ...ui._cwm?.positions,
          ...Object.fromEntries(
            [...positions].map(([id, point]) => [id, [point.x, point.y]]),
          ),
        },
      },
    },
  };
}
