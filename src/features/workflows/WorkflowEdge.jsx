import { BaseEdge, getBezierPath } from "@xyflow/react";

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
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const duration = data?.active ? 4.2 : 5.6;
  const phaseSeed = [...String(id)].reduce(
    (hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619),
    2166136261,
  );
  const phase = ((phaseSeed >>> 0) / 4294967295) * duration;

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {data?.flowing && (
        <path
          className="workflow-edge-flow"
          d={path}
          aria-hidden="true"
          style={{
            animationDelay: `-${phase.toFixed(2)}s`,
            animationDuration: `${duration}s`,
          }}
        />
      )}
    </>
  );
}
