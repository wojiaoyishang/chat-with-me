import { BaseEdge, getBezierPath, useViewport } from "@xyflow/react";

const ORB_COUNT_THRESHOLD = 360;

function edgePhase(id) {
  const hash = [...String(id)].reduce(
    (value, character) => Math.imul(value ^ character.charCodeAt(0), 16777619),
    2166136261,
  );
  return (hash >>> 0) / 4294967295;
}

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
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const screenZoom = Math.max(zoom || 1, 0.2);
  const screenDistance =
    Math.hypot(targetX - sourceX, targetY - sourceY) * screenZoom;
  const orbCount = screenDistance >= ORB_COUNT_THRESHOLD ? 2 : 1;
  const duration = Math.max(2.8, Math.min(5.6, screenDistance / 90));
  const phase = edgePhase(id);

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {data?.flowing &&
        Array.from({ length: orbCount }, (_, index) => {
          const begin = `-${(
            ((phase + index / orbCount) % 1) *
            duration
          ).toFixed(2)}s`;
          return (
            <g
              className="workflow-edge-orb"
              key={`${id}-orb-${index}`}
              opacity="0"
            >
              <circle className="workflow-edge-orb-glow" r={5.5 / screenZoom} />
              <circle
                className="workflow-edge-orb-core"
                r={2.5 / screenZoom}
                strokeWidth={0.8 / screenZoom}
              />
              <animateMotion
                path={path}
                dur={`${duration.toFixed(2)}s`}
                begin={begin}
                repeatCount="indefinite"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.04;0.96;1"
                dur={`${duration.toFixed(2)}s`}
                begin={begin}
                repeatCount="indefinite"
              />
            </g>
          );
        })}
    </>
  );
}
