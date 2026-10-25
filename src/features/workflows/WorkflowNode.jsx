import { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import {
  Check,
  Database,
  File,
  FileText,
  GitBranch,
  Image,
  Loader2,
  ListOrdered,
  Paperclip,
  ScanSearch,
  Type,
  XCircle,
  Hash,
  ToggleLeft,
} from "lucide-react";
import { nodeCategory, sourceNodeValue } from "./workflowModel.js";
import WorkflowDataField from "./WorkflowDataField.jsx";
import WorkflowSubgraphSetup from "./WorkflowSubgraphSetup.jsx";
import { workflowStatusLabels } from "./workflowStatus.js";

export default function WorkflowNode({ data, selected }) {
  const { node, definition, runtime = {}, readOnly } = data;
  const status = data.status;
  const subgraph = node.kind === "subgraph" ? node.subgraph : null;
  const category = nodeCategory(definition);
  const refresh = useUpdateNodeInternals();
  const inlineSignature = Object.keys(node.inputs || {})
    .filter((key) => node.inputs[key]?.type === "literal")
    .join("|");
  const portSignature = [
    ...(definition?.inputs || []),
    ...(definition?.outputs || []),
  ]
    .map((port) => `${port.name}:${port.display?.title}`)
    .join("|");
  useEffect(() => {
    refresh(node.id);
  }, [refresh, node.id, inlineSignature, portSignature]);
  const Icon =
    {
      file: File,
      "file-text": FileText,
      database: Database,
      workflow: GitBranch,
      attachment: Paperclip,
      image: Image,
      text: Type,
      number: Hash,
      boolean: ToggleLeft,
      "list-ordered": ListOrdered,
      "scan-search": ScanSearch,
    }[definition?.presentation?.icon] || GitBranch;
  return (
    <div
      className={`workflow-node category-${category} ${subgraph ? "is-subgraph" : ""} ${selected ? "is-selected" : ""} ${status ? `status-${status}` : ""}`}
    >
      <div className="workflow-node-title">
        <Icon className="size-4 text-primary" />
        <strong title={node.name || definition?.display?.title}>
          {node.name || definition?.display?.title}
        </strong>
        {status === "running" && <Loader2 className="size-3 animate-spin" />}
        {["completed", "succeeded"].includes(status) && (
          <Check className="size-3 text-emerald-600" />
        )}
        {status === "failed" && <XCircle className="size-3 text-destructive" />}
      </div>
      {definition?.display?.subtitle && (
        <p className="workflow-node-id">{definition.display.subtitle}</p>
      )}
      {subgraph?.initialized === false && !data.monitor ? (
        <WorkflowSubgraphSetup
          nodeId={node.id}
          templates={data.subgraphTemplates}
          disabled={readOnly}
          onConfirm={data.onInitializeSubgraph}
        />
      ) : (
        subgraph && (
          <div className="workflow-subgraph-summary">
            <span>
              {subgraph.execution?.mode === "serial" ? "串行" : "并行"} ·{" "}
              {subgraph.graph?.nodes?.length || 0} 个节点
              {subgraph.execution?.mode !== "serial" &&
                ` · 上限 ${subgraph.execution?.maxConcurrency || 4}`}
            </span>
            {runtime.activeCount > 0 && (
              <span>正在运行 {runtime.activeCount} 个节点</span>
            )}
            <button
              className="nodrag"
              type="button"
              disabled={data.interactionDisabled}
              onClick={(event) => {
                event.stopPropagation();
                data.onEnter?.(node.id);
              }}
            >
              {data.monitor ? "展开子图" : "进入子图"}
            </button>
            {!data.monitor && (
              <button
                className="nodrag"
                type="button"
                disabled={data.interactionDisabled}
                onClick={(event) => {
                  event.stopPropagation();
                  data.onSaveSubgraphTemplate?.(node.id);
                }}
              >
                保存模板
              </button>
            )}
          </div>
        )
      )}
      {definition?.source && (
        <div
          className="workflow-source-value nodrag nowheel"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <WorkflowDataField
            value={sourceNodeValue(node, definition)}
            schema={definition.source.valueSchema}
            label={node.name || definition?.display?.title}
            compact
            disabled={readOnly}
            onChange={(value) => data.onValue(node.id, value)}
            onBusyChange={(busy) => data.onBusy(node.id, busy)}
          />
        </div>
      )}
      <div className="workflow-node-ports">
        <div>
          {(definition?.inputs || []).map((port) => {
            const inline = node.inputs?.[port.name]?.type === "literal";
            const schema = {
              ...(port.schema || {}),
              ...(definition.inputSchema?.properties?.[port.name] || {}),
            };
            return (
              <div
                className={`workflow-port ${inline ? "is-inline" : ""}`}
                key={port.name}
                onContextMenu={(event) => {
                  if (!readOnly && port.inlineAllowed) {
                    event.preventDefault();
                    event.stopPropagation();
                    data.onPortMenu(event, node.id, port);
                  }
                }}
              >
                {!inline && (
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={port.name}
                  />
                )}
                <span title={port.display?.description}>
                  <strong>{port.display?.title}</strong>
                  {port.display?.subtitle && (
                    <small>{port.display.subtitle}</small>
                  )}
                </span>
                {inline && (
                  <div
                    className="nodrag nowheel"
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <WorkflowDataField
                      label={port.display?.title}
                      schema={schema}
                      compact
                      value={node.inputs[port.name].value}
                      disabled={readOnly}
                      onChange={(value) =>
                        data.onBinding(node.id, port.name, {
                          type: "literal",
                          value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div>
          {(definition?.outputs || []).map((port) => (
            <div className="workflow-port workflow-port-output" key={port.name}>
              <span title={port.display?.description}>
                <strong>{port.display?.title}</strong>
                {port.display?.subtitle && (
                  <small>{port.display.subtitle}</small>
                )}
              </span>
              <Handle type="source" position={Position.Right} id={port.name} />
            </div>
          ))}
        </div>
      </div>
      {status && (
        <div className="workflow-node-state">
          <span>{workflowStatusLabels[status] || status}</span>
          {runtime.nodeProgress && (
            <span>
              已处理{runtime.nodeProgress.unit || "项目"}：
              {runtime.nodeProgress.processed ?? 0}/
              {runtime.nodeProgress.total ?? 0}
            </span>
          )}
          {runtime.nodeProgress?.total > 0 &&
            Number.isFinite(runtime.nodeProgress.percent) && (
              <progress
                max="100"
                value={runtime.nodeProgress.percent}
                aria-label={`已处理${runtime.nodeProgress.unit || "项目"}`}
              />
            )}
        </div>
      )}
      {runtime.outputPreview?.summary && (
        <p className="workflow-output-summary">
          {runtime.outputPreview.summary}
        </p>
      )}
      {(runtime.nodeProgress?.currentItem?.preview ||
        runtime.progressMessage ||
        runtime.nodeProgress?.message) && (
        <p className="workflow-output-summary" role="status">
          {runtime.nodeProgress?.currentItem?.preview ||
            runtime.progressMessage ||
            runtime.nodeProgress?.message}
        </p>
      )}
    </div>
  );
}
