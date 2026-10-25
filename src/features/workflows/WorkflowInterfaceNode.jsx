import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

export default function WorkflowInterfaceNode({ data, selected }) {
  const input = data.direction === "inputs";
  const Icon = input ? ArrowRightFromLine : ArrowLeftToLine;
  return (
    <div
      className={`workflow-interface-node ${input ? "is-input" : "is-output"} ${selected ? "is-selected" : ""} ${data.entry[input ? "target" : "source"] ? "" : "is-unbound"}`}
    >
      {!input && <Handle id="value" type="target" position={Position.Left} />}
      <Icon className="size-4 shrink-0" />
      <div>
        <strong>{data.entry.title || data.entry.name}</strong>
        <small>
          {data.entry.name} ·{" "}
          {data.port?.type === "any" ? "待连接" : data.port?.type || "待连接"}
        </small>
      </div>
      {input && <Handle id="value" type="source" position={Position.Right} />}
    </div>
  );
}
