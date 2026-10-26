import { useMemo } from "react";
import { ViewportPortal } from "@xyflow/react";
import { workflowParallelBounds } from "./workflowParallelModel.js";
import WorkflowRegionControl from "./WorkflowRegionControl.jsx";

export default function WorkflowParallelRegions({
  regions,
  nodes,
  onRegionChange,
  disabled,
}) {
  const boxes = useMemo(
    () => workflowParallelBounds(regions, nodes),
    [regions, nodes],
  );
  if (!boxes.length) return null;
  return (
    <ViewportPortal>
      <div className="workflow-parallel-regions">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`workflow-parallel-region${box.limit === 1 ? " workflow-region-serial" : ""}`}
            role="group"
            data-region-id={box.id}
            data-node-ids={box.nodeIds.join(" ")}
            aria-label={`${box.configured ? "执行区域" : "可并行区域"}，${box.nodeIds.length}个节点，并发上限${box.limit}`}
            style={{
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
            }}
          >
            <div className="workflow-parallel-caption">
              <b aria-hidden="true">{box.limit === 1 ? "→" : "∥"}</b>
              <strong>
                {box.configured
                  ? "执行区域"
                  : box.kind === "independent"
                    ? "独立流程可并行"
                    : box.conditional
                      ? "条件分支内可并行"
                      : "分支可并行"}
              </strong>
              <span>
                {box.branchCount
                  ? `${box.branchCount}${box.kind === "independent" ? "个流程" : "条分支"} · `
                  : ""}
                {box.nodeIds.length}个节点
              </span>
              {onRegionChange ? (
                <WorkflowRegionControl
                  region={box}
                  onChange={onRegionChange}
                  disabled={disabled}
                />
              ) : (
                <span>上限 {box.limit}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ViewportPortal>
  );
}
