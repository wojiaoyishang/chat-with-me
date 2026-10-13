import { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import {
  Check,
  FileOutput,
  GitBranch,
  Loader2,
  Paperclip,
  Type,
  XCircle,
} from "lucide-react";
import {
  nodeCategory,
  sourceNodeValue,
  workflowPortDescription,
  workflowPortTypeLabel,
} from "./workflowModel.js";
import WorkflowDataField from "./WorkflowDataField.jsx";
import { workflowStatusLabels } from "./workflowStatus.js";

export default function WorkflowNode({ data, selected }) {
  const { node, definition, runtime = {}, readOnly } = data;
  const status = data.status;
  const category = nodeCategory(definition, node);
  const refresh = useUpdateNodeInternals();
  const inlineSignature = Object.keys(node.inputs || {})
    .filter((key) => node.inputs[key]?.type === "literal")
    .join("|");
  useEffect(() => {
    refresh(node.id);
  }, [refresh, node.id, inlineSignature]);
  const Icon =
    category === "sink"
      ? FileOutput
      : category === "source"
        ? node.kind === "attachments"
          ? Paperclip
          : Type
        : GitBranch;
  return (
    <div
      className={`workflow-node category-${category} ${selected ? "is-selected" : ""} ${status ? `status-${status}` : ""}`}
    >
      <div className="workflow-node-title">
        <Icon className="size-4 text-primary" />
        <strong title={node.name || definition?.title}>
          {node.name || definition?.title || node.kind}
        </strong>
        {status === "running" && <Loader2 className="size-3 animate-spin" />}
        {["completed", "succeeded"].includes(status) && (
          <Check className="size-3 text-emerald-600" />
        )}
        {status === "failed" && <XCircle className="size-3 text-destructive" />}
      </div>
      <p className="workflow-node-id">
        {definition?.title || node.kind}
        {node.inputKey && ` · ${node.inputKey}`}
      </p>
      {category === "source" && (
        <div
          className="workflow-source-value nodrag nowheel"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <WorkflowDataField
            kind={node.kind}
            value={sourceNodeValue(node)}
            label={node.name || definition?.title || "输入内容"}
            compact
            disabled={readOnly}
            onChange={(value) => data.onValue(node.id, value)}
            onBusyChange={(busy) => data.onBusy(node.id, busy)}
          />
        </div>
      )}
      <div className="workflow-node-ports">
        <div>
          {category !== "source" &&
            (definition?.inputs || []).map((port) => {
              const inline = node.inputs?.[port.name]?.type === "literal";
              const schema =
                port.schema ||
                definition.inputSchema?.properties?.[port.name] ||
                {};
              return (
                <div
                  className={`workflow-port ${inline ? "is-inline" : ""}`}
                  key={port.name}
                  onContextMenu={(event) => {
                    if (
                      !readOnly &&
                      (port.inlineAllowed ||
                        [
                          "str",
                          "string",
                          "number",
                          "int",
                          "float",
                          "integer",
                          "boolean",
                          "bool",
                        ].includes(port.type))
                    ) {
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
                  <span title={workflowPortDescription(port)}>
                    {port.title || port.name}
                    <small>{workflowPortTypeLabel(port)}</small>
                  </span>
                  {inline && (
                    <div
                      className="nodrag nowheel"
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      <WorkflowDataField
                        kind={schema.type || port.type}
                        label={port.title || port.name}
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
          {category !== "sink" &&
            (definition?.outputs || []).map((port) => (
              <div
                className="workflow-port workflow-port-output"
                key={port.name}
              >
                <span title={workflowPortDescription(port)}>
                  {port.title || port.name}
                  <small>{workflowPortTypeLabel(port)}</small>
                </span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={port.name}
                />
              </div>
            ))}
        </div>
      </div>
      {status && (
        <div className="workflow-node-state">
          <span>{workflowStatusLabels[status] || status}</span>
          {runtime.nodeProgress && (
            <span>
              {runtime.nodeProgress.processed || 0}/
              {runtime.nodeProgress.total || 0}
            </span>
          )}
          {Number.isFinite(runtime.nodeProgress?.percent) && (
            <progress max="100" value={runtime.nodeProgress.percent} />
          )}
        </div>
      )}
      {runtime.outputPreview?.summary && (
        <p className="workflow-output-summary">
          {runtime.outputPreview.summary}
        </p>
      )}
    </div>
  );
}
