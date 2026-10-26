/** Stable execution budgets attach to real leaf IDs, never canvas coordinates. */
export function workflowLeafIds(graph) {
  return (graph.nodes || []).flatMap((node) =>
    node.kind === "subgraph"
      ? workflowLeafIds(node.subgraph?.graph || {})
      : [node.id],
  );
}

/** Only prune genuinely deleted nodes, leaving invalid imports for validation. */
export function pruneDeletedWorkflowRegions(before, after) {
  const live = new Set(workflowLeafIds(after));
  const removed = new Set(
    workflowLeafIds(before).filter((id) => !live.has(id)),
  );
  if (!removed.size) return after;
  const visit = (graph) => ({
    ...graph,
    ...(graph.executionRegions
      ? {
          executionRegions: graph.executionRegions
            .map((region) => ({
              ...region,
              nodeIds: region.nodeIds.filter((id) => !removed.has(id)),
            }))
            .filter((region) => region.nodeIds.length),
        }
      : {}),
    nodes: graph.nodes.map((node) =>
      node.subgraph?.graph
        ? {
            ...node,
            subgraph: {
              ...node.subgraph,
              graph: visit(node.subgraph.graph),
              ...(node.subgraph.execution?.branchOrder
                ? {
                    execution: {
                      ...node.subgraph.execution,
                      branchOrder: node.subgraph.execution.branchOrder.filter(
                        (id) =>
                          node.subgraph.graph.nodes.some(
                            (child) => child.id === id,
                          ),
                      ),
                    },
                  }
                : {}),
            },
          }
        : node,
    ),
  });
  return visit(after);
}

/** Ancestor budgets projected during copy/save remain meaningful in isolation. */
export function workflowAncestorRegions(root, path) {
  const regions = [];
  let current = root;
  for (const id of path) {
    regions.push(...(current.executionRegions || []));
    current = current.nodes.find((node) => node.id === id)?.subgraph?.graph;
    if (!current) break;
  }
  return regions;
}

export function projectWorkflowRegions(regions, nodes) {
  const included = new Set(workflowLeafIds({ nodes }));
  return regions
    .map((region) => ({
      ...region,
      nodeIds: region.nodeIds.filter((id) => included.has(id)),
    }))
    .filter((region) => region.nodeIds.length);
}
