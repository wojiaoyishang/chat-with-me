/** Keep measured canvas state separate from the serialized workflow. */
export function selectCanvasNodes(current, ids) {
  const selected = new Set(ids);
  let changed = false;
  const next = current.map((node) => {
    const value = selected.has(node.id);
    if (node.selected === value) return node;
    changed = true;
    return { ...node, selected: value };
  });
  return changed ? next : current;
}

export function reconcileCanvasNodes(current, incoming) {
  const byId = new Map(current.map((node) => [node.id, node]));
  const next = incoming.map((node) => {
    const previous = byId.get(node.id);
    if (
      !previous ||
      previous.type !== node.type ||
      previous.data?.kind !== node.data?.kind ||
      (previous.data?.definition?.baseDefinition ||
        previous.data?.definition) !==
        (node.data?.definition?.baseDefinition || node.data?.definition)
    )
      return node;
    const position =
      previous.dragging ||
      (previous.position.x === node.position.x &&
        previous.position.y === node.position.y)
        ? previous.position
        : node.position;
    const data =
      Object.keys(previous.data).length === Object.keys(node.data).length &&
      Object.entries(node.data).every(([key, value]) =>
        Object.is(previous.data[key], value),
      )
        ? previous.data
        : node.data;
    const merged = { ...previous, ...node, position, data };
    return Object.keys(merged).every((key) =>
      Object.is(previous[key], merged[key]),
    )
      ? previous
      : merged;
  });
  return next.length === current.length &&
    next.every((node, index) => node === current[index])
    ? current
    : next;
}
