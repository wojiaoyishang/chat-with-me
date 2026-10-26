import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyNodeChanges,
  ReactFlow,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import {
  reconcileCanvasNodes,
  selectCanvasNodes,
} from "./workflowCanvasModel.js";
import WorkflowParallelRegions from "./WorkflowParallelRegions.jsx";

const NO_REGIONS = [];

/** Dragging and measurement update only the canvas; a gesture saves once. */
export default function WorkflowCanvas({
  nodes,
  selectionRequest,
  fitRequest,
  focusRequest,
  autoFollow = false,
  parallelRegions = NO_REGIONS,
  onPositionsCommit,
  ...props
}) {
  const flow = useReactFlow();
  const measured = useNodesInitialized();
  const fitted = useRef(-1);
  const [canvasNodes, setCanvasNodes] = useState(() =>
    selectCanvasNodes(nodes, selectionRequest?.ids || []),
  );
  useEffect(() => {
    if (!measured || !nodes.length || fitted.current === fitRequest) return;
    // A freshly installed graph reaches local canvas state one render later.
    if (
      canvasNodes.length !== nodes.length ||
      canvasNodes.some((node, index) => node.id !== nodes[index].id)
    )
      return;
    // A monitor that follows a task should focus its active node, not run the
    // initial whole-graph fit after the focus animation has already begun.
    if (autoFollow) {
      fitted.current = fitRequest;
      return;
    }
    // React Flow may report initialized before the final node dimensions land.
    // Fit after paint and only for a freshly installed graph, never during drag.
    let canceled = false;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(async () => {
        if (canceled) return;
        const success = await flow.fitView({
          padding: 0.18,
          duration: 0,
          maxZoom: 1,
        });
        if (canceled || !success) return;
        fitted.current = fitRequest;
        if (flow.getViewport().zoom < 0.65 && nodes.length > 3) {
          const visibleStart = flow
            .getNodes()
            .slice(0, window.innerWidth <= 760 ? 2 : 3);
          await flow.fitView({
            nodes: visibleStart,
            padding: 0.16,
            minZoom: 0.65,
            maxZoom: 0.8,
            duration: 220,
          });
        }
      });
    });
    return () => {
      canceled = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [fitRequest, flow, measured, nodes, canvasNodes, autoFollow]);
  const focusNodeReady = Boolean(
    focusRequest?.id && canvasNodes.some((node) => node.id === focusRequest.id),
  );
  useEffect(() => {
    if (!measured || !focusNodeReady) return;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => {
        void flow.fitView({
          nodes: [{ id: focusRequest.id }],
          padding: 0.65,
          duration: 350,
          minZoom: 0.5,
          maxZoom: 1,
        });
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [flow, measured, focusRequest, focusNodeReady]);
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
    >
      {props.children}
      <WorkflowParallelRegions regions={parallelRegions} nodes={canvasNodes} />
    </ReactFlow>
  );
}
