/** Measure the actual ports so the temporary link follows zoom and node layout. */
export function pendingWorkflowConnectionPath(canvas, ghost, connection) {
  if (!canvas || !ghost || !connection?.nodeId || !connection?.handleId)
    return null;
  const handle = [...canvas.querySelectorAll(".react-flow__handle")].find(
    (element) =>
      element.dataset.nodeid === connection.nodeId &&
      element.dataset.handleid === connection.handleId &&
      element.classList.contains(`react-flow__handle-${connection.handleType}`),
  );
  const ghostHandle = ghost.querySelector("[data-pending-handle]");
  if (!handle || !ghostHandle) return null;
  const canvasRect = canvas.getBoundingClientRect();
  const center = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - canvasRect.left,
      y: rect.top + rect.height / 2 - canvasRect.top,
    };
  };
  const existing = center(handle);
  const virtual = center(ghostHandle);
  const from = connection.handleType === "source" ? existing : virtual;
  const to = connection.handleType === "source" ? virtual : existing;
  const bend = Math.max(48, Math.abs(to.x - from.x) * 0.45);
  return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`;
}
