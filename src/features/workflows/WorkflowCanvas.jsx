import { useCallback, useEffect, useState } from "react";
import { applyNodeChanges, ReactFlow } from "@xyflow/react";
import {
  reconcileCanvasNodes,
  selectCanvasNodes,
} from "./workflowCanvasModel.js";

/** Dragging and measurement update only the canvas; a gesture saves once. */
export default function WorkflowCanvas({
  nodes,
  selectionRequest,
  onPositionsCommit,
  ...props
}) {
  const [canvasNodes, setCanvasNodes] = useState(() =>
    selectCanvasNodes(nodes, selectionRequest?.ids || []),
  );
  useEffect(() => {
    setCanvasNodes((current) => reconcileCanvasNodes(current, nodes));
  }, [nodes]);
  // Only explicit actions such as loading/adding a node command a selection.
  // Selection notifications to the inspector must not feed back into the canvas.
  useEffect(() => {
    if (selectionRequest)
      setCanvasNodes((current) =>
        selectCanvasNodes(current, selectionRequest.ids),
      );
  }, [selectionRequest]);
  const changeNodes = useCallback(
    (changes) => {
      setCanvasNodes((current) => applyNodeChanges(changes, current));
      // Keyboard movement also emits final position changes, without dragStop.
      const finished = changes.filter(
        (change) =>
          change.type === "position" &&
          change.position &&
          change.dragging === false,
      );
      if (finished.length) onPositionsCommit(finished);
    },
    [onPositionsCommit],
  );
  const stopNodeDrag = useCallback(
    (_event, node, moved) => onPositionsCommit(moved?.length ? moved : [node]),
    [onPositionsCommit],
  );
  const stopSelectionDrag = useCallback(
    (_event, moved) => onPositionsCommit(moved),
    [onPositionsCommit],
  );
  return (
    <ReactFlow
      {...props}
      nodes={canvasNodes}
      onNodesChange={changeNodes}
      onNodeDragStop={stopNodeDrag}
      onSelectionDragStop={stopSelectionDrag}
    />
  );
}
