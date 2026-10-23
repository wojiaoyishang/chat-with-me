const ROOT_SCOPE = { id: "root", title: "主流程", parentId: null };

/** Execution IDs remain opaque; scopes only decide which nodes are visible. */
export function graphScopes(graph) {
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
  const result = [];
  const visited = new Set();
  let scope = scopes.get(String(scopeId)) || ROOT_SCOPE;
  while (scope && !visited.has(scope.id)) {
    visited.add(scope.id);
    result.unshift(scope);
    scope = scope.parentId == null ? null : scopes.get(String(scope.parentId));
  }
  if (result[0]?.id !== "root") result.unshift(scopes.get("root"));
  return result;
}

/** Project connections entering/leaving a child graph onto its container.
 * Executable edges and field source IDs themselves remain untouched. */
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
  const edges = [];
  const seen = new Set();
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
  return {
    nodes,
    edges,
  };
}

export function childScopeNodeIds(graph, scopeId) {
  const scopes = graphScopes(graph);
  const descendants = new Set([String(scopeId)]);
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
