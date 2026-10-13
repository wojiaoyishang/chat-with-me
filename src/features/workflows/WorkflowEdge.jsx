import { BaseEdge, getBezierPath, useViewport } from "@xyflow/react";

/** Keep the same curve and hit area as React Flow's default edge. */
export default function WorkflowEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  style,
  data,
}) {
  const { zoom } = useViewport();
  const visibleZoom = Math.max(zoom, 0.15);
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const duration = data?.active ? 1.9 : 2.8;
  const phaseSeed = [...String(id)].reduce(
    (hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619),
    2166136261,
  );
  const phase = ((phaseSeed >>> 0) / 4294967295) * duration;

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {data?.flowing && (
        <g className="workflow-flow-pulse" aria-hidden="true">
          <circle className="workflow-flow-halo" r={12 / visibleZoom} />
          <circle className="workflow-flow-core" r={5 / visibleZoom} />
          <animateMotion
            path={path}
            begin={`-${phase.toFixed(2)}s`}
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </g>
      )}
    </>
  );
}
