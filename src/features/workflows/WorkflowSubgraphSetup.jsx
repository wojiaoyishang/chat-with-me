import { useState } from "react";

/** Transient choices stay local; only explicit confirmation changes the graph. */
export default function WorkflowSubgraphSetup({
  nodeId,
  templates = [],
  disabled,
  onConfirm,
}) {
  const [mode, setMode] = useState("");
  const [templateId, setTemplateId] = useState("");
  return (
    <div
      className="workflow-subgraph-setup nodrag nowheel"
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      <label>
        创建方式
        <select
          className="workflow-native-select"
          aria-label="子图创建方式"
          value={mode}
          disabled={disabled}
          onChange={(event) => setMode(event.target.value)}
        >
          <option value="">请选择新建或复制模板</option>
          <option value="new">新建子图</option>
          <option value="template">复制模板</option>
        </select>
      </label>
      {mode === "template" && (
        <label>
          模板
          <select
            className="workflow-native-select"
            aria-label="子图来源模板"
            value={templateId}
            disabled={disabled}
            onChange={(event) => setTemplateId(event.target.value)}
          >
            <option value="">选择要复制的模板</option>
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ·{" "}
                {item.builtin ? "内置" : `v${item.revision || 1}`}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        type="button"
        disabled={disabled || !mode || (mode === "template" && !templateId)}
        onClick={(event) => {
          event.stopPropagation();
          onConfirm?.(nodeId, mode === "template" ? templateId : null);
        }}
      >
        {mode === "template" ? "确认复制" : "确认新建"}
      </button>
    </div>
  );
}
