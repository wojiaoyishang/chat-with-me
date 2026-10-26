import { useState } from "react";
import {
  Check,
  Copy,
  LocateFixed,
  MoreHorizontal,
  PackageCheck,
  PackagePlus,
} from "lucide-react";
import { copyTextToClipboard } from "@/lib/tools.jsx";
import WorkflowNodeBadge from "./WorkflowNodeBadge.jsx";

export default function WorkflowNodeDetailsHeader({
  node,
  definition,
  number,
  isOutput,
  parallelInfo,
  disabled,
  readOnly,
  onLocate,
  onMenu,
  onToggleOutput,
}) {
  const [copyStatus, setCopyStatus] = useState("");
  return (
    <div className="workflow-node-details-header">
      <div className="workflow-node-details-title">
        <div>
          <h3 className="font-semibold">
            {definition?.display?.title || node.name || node.kind}
          </h3>
          <div className="workflow-node-details-meta">
            {definition?.display?.subtitle && (
              <p className="text-xs text-muted-foreground">
                {definition.display.subtitle}
              </p>
            )}
            {node.kind === "subgraph" && parallelInfo?.containsParallel && (
              <span className="workflow-subgraph-parallel-note">
                ∥ 内部包含并行
              </span>
            )}
          </div>
        </div>
        <WorkflowNodeBadge {...{ node, definition, number, isOutput }} />
      </div>
      <div className="workflow-node-stable-id">
        <code aria-label="节点 ID">{node.id}</code>
        <button
          type="button"
          aria-label="复制节点 ID"
          title="复制完整节点 ID"
          onClick={async () => {
            try {
              await copyTextToClipboard(node.id);
              setCopyStatus("copied");
            } catch {
              setCopyStatus("failed");
            }
          }}
        >
          {copyStatus === "copied" ? <Check /> : <Copy />}
        </button>
      </div>
      {copyStatus === "failed" && (
        <p role="alert" className="text-xs text-destructive">
          复制失败，请手动选择节点 ID 复制。
        </p>
      )}
      <div className="workflow-node-details-actions">
        <button type="button" aria-label="定位节点" onClick={onLocate}>
          <LocateFixed />
          定位
        </button>
        {definition?.publicOutput && (
          <button
            type="button"
            aria-label="收集此节点产物"
            aria-pressed={Boolean(isOutput)}
            disabled={disabled || readOnly}
            onClick={() => onToggleOutput?.(!isOutput)}
          >
            {isOutput ? <PackageCheck /> : <PackagePlus />}
            {isOutput ? "已收集产物" : "收集产物"}
          </button>
        )}
        {!readOnly && (
          <button
            type="button"
            aria-label="节点更多操作"
            title="节点更多操作"
            disabled={disabled}
            onClick={onMenu}
          >
            <MoreHorizontal />
          </button>
        )}
      </div>
    </div>
  );
}
