/** Structural parallelism is an editor projection, never a runtime node/group. */
const concurrency = (value, fallback = 4) =>
  Number.isInteger(value) && value >= 1 ? value : fallback;

function graphRegions(graph, limit, sourceKinds) {
  if (limit <= 1) return [];
  const nodes = graph.nodes || [];
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const outgoing = new Map(nodes.map((node) => [node.id, []]));
  const incoming = new Map(nodes.map((node) => [node.id, []]));
  for (const edge of graph.edges || []) {
    if (!byId.has(edge.source) || !byId.has(edge.target)) continue;
    outgoing.get(edge.source).push(edge);
    incoming.get(edge.target).push(edge);
  }
  const degree = new Map(
    nodes.map((node) => [node.id, incoming.get(node.id).length]),
  );
  const order = nodes
    .filter((node) => !degree.get(node.id))
    .map((node) => node.id);
  for (let index = 0; index < order.length; index++) {
    for (const edge of outgoing.get(order[index])) {
      degree.set(edge.target, degree.get(edge.target) - 1);
      if (!degree.get(edge.target)) order.push(edge.target);
    }
  }
  // Invalid/cyclic drafts can still be edited without inventing parallel claims.
  if (order.length !== nodes.length) return [];

  const reach = new Map();
  for (const id of [...order].reverse()) {
    const reachable = new Set([id]);
    for (const edge of outgoing.get(id))
      for (const target of reach.get(edge.target)) reachable.add(target);
    reach.set(id, reachable);
  }
  const gates = new Map();
  for (const id of order) {
    const current = new Map();
    const add = (gate, port) => {
      if (!current.has(gate)) current.set(gate, new Set());
      current.get(gate).add(port);
    };
    for (const edge of incoming.get(id)) {
      for (const [gate, ports] of gates.get(edge.source))
        for (const port of ports) add(gate, port);
      if (byId.get(edge.source).kind === "condition")
        add(edge.source, edge.sourcePort || edge.sourceHandle);
    }
    gates.set(id, current);
  }
  const compatible = (left, right) => {
    for (const [gate, ports] of gates.get(left)) {
      const other = gates.get(right).get(gate);
      if (ports.size === 1 && other?.size === 1 && !other.has([...ports][0]))
        return false;
    }
    return true;
  };
  const candidates = [];
  const addRegion = (branches, metadata) => {
    // A subgraph card describes its contents; actual boxes appear after entry.
    const actual = branches
      .map((branch) =>
        [...branch].filter((id) => byId.get(id)?.kind !== "subgraph"),
      )
      .filter((branch) => branch.length);
    if (actual.length < 2) return;
    const nodeIds = [...new Set(actual.flat())].sort();
    if (nodeIds.length < 2) return;
    candidates.push({
      ...metadata,
      nodeIds,
      branchCount: actual.length,
      limit,
    });
  };
  const hasWork = (branch) =>
    [...branch].some(
      (id) =>
        byId.get(id)?.kind !== "subgraph" &&
        !sourceKinds.has(byId.get(id)?.kind),
    );
  const addFork = (targets, metadata, requireWork = false) => {
    const heads = [...targets].filter(
      (id) =>
        ![...targets].some((other) => other !== id && reach.get(other).has(id)),
    );
    if (
      heads.length < 2 ||
      heads.some((id, index) =>
        heads.slice(index + 1).some((other) => !compatible(id, other)),
      )
    )
      return;
    const counts = new Map();
    for (const head of heads)
      for (const id of reach.get(head))
        counts.set(id, (counts.get(id) || 0) + 1);
    // Shared descendants are the join and everything after it, not branches.
    const branches = heads.map(
      (head) =>
        new Set([...reach.get(head)].filter((id) => counts.get(id) === 1)),
    );
    addRegion(requireWork ? branches.filter(hasWork) : branches, metadata);
  };
  for (const node of nodes) {
    const routes = new Map();
    for (const edge of outgoing.get(node.id)) {
      const port =
        node.kind === "condition" ? edge.sourcePort || edge.sourceHandle : "*";
      if (!routes.has(port)) routes.set(port, new Set());
      routes.get(port).add(edge.target);
    }
    for (const [port, targets] of routes) {
      addFork(targets, {
        id: `parallel:${node.id}:${port}`,
        kind: "branches",
        forkId: node.id,
        conditional: node.kind === "condition",
      });
    }
  }
  const unseen = new Set(byId.keys()),
    components = [];
  while (unseen.size) {
    const stack = [unseen.values().next().value],
      component = new Set();
    while (stack.length) {
      const id = stack.pop();
      if (!unseen.delete(id)) continue;
      component.add(id);
      for (const edge of outgoing.get(id)) stack.push(edge.target);
      for (const edge of incoming.get(id)) stack.push(edge.source);
    }
    components.push(component);
  }
  addRegion(components.filter(hasWork), {
    id: "parallel:independent",
    kind: "independent",
  });
  // Public subgraph inputs are virtual capsules, not runtime nodes. Their ready
  // roots can still be separate processing branches that later meet at a join.
  // Ignore branches doing nothing except constructing input/configuration values.
  addFork(
    nodes
      .filter((node) => !incoming.get(node.id).length)
      .map((node) => node.id),
    { id: "parallel:inputs", kind: "branches" },
    true,
  );
  // Keep a readable outer region instead of stacking equivalent/nested boxes.
  return candidates
    .sort(
      (a, b) => b.nodeIds.length - a.nodeIds.length || a.id.localeCompare(b.id),
    )
    .filter(
      (region, index, all) =>
        !all
          .slice(0, index)
          .some((outer) =>
            region.nodeIds.every((id) => outer.nodeIds.includes(id)),
          ),
    );
}

/** Include ancestor limits; a serial parent prevents internal concurrency too. */
export function analyzeWorkflowParallelism(
  rootGraph,
  path = [],
  definitions = [],
) {
  const sourceKinds = new Set(
    definitions
      .filter((node) => node.source || node.category === "source")
      .map((node) => node.kind),
  );
  const levels = new Map(),
    subgraphs = {};
  const visit = (graph, parentLimit, inheritedCap, key = null, depth = 0) => {
    const cap = concurrency(graph.settings?.maxConcurrency, inheritedCap);
    const limit = Math.min(parentLimit, cap);
    const regions = graphRegions(graph, limit, sourceKinds);
    const level = { regions, limit, containsParallel: regions.length > 0 };
    levels.set(key, level);
    if (depth >= 8) return level;
    for (const node of graph.nodes || []) {
      if (node.kind !== "subgraph" || !node.subgraph?.graph) continue;
      const execution = node.subgraph.execution || {};
      const childLimit = Math.min(
        limit,
        execution.mode === "serial"
          ? 1
          : concurrency(execution.maxConcurrency, cap),
      );
      const child = visit(
        node.subgraph.graph,
        childLimit,
        cap,
        node.id,
        depth + 1,
      );
      subgraphs[node.id] = {
        containsParallel: child.containsParallel,
        limit: child.limit,
      };
      level.containsParallel ||= child.containsParallel;
    }
    return level;
  };
  const root = visit(rootGraph, Infinity, 4);
  return { current: levels.get(path.at(-1) || null) || root, subgraphs };
}

/** Canvas measurements and transient drag coordinates never enter graph JSON. */
export function workflowParallelBounds(regions, nodes) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return regions.flatMap((region) => {
    const members = region.nodeIds
      .map((id) => byId.get(id))
      .filter((node) => node && !node.hidden);
    if (members.length < 2) return [];
    const x = Math.min(...members.map((node) => node.position.x));
    const y = Math.min(...members.map((node) => node.position.y));
    const right = Math.max(
      ...members.map(
        (node) => node.position.x + (node.measured?.width || node.width || 280),
      ),
    );
    const bottom = Math.max(
      ...members.map(
        (node) =>
          node.position.y + (node.measured?.height || node.height || 120),
      ),
    );
    return [
      {
        ...region,
        x: x - 32,
        y: y - 64,
        width: right - x + 64,
        height: bottom - y + 96,
      },
    ];
  });
}
