import { nodeCategory } from "./workflowModel.js";

/** A display number shares the canvas identity; runtime always uses node.id. */
export default function WorkflowNodeBadge({
  node,
  definition,
  number,
  isOutput,
}) {
  const category = nodeCategory(definition);
  const role =
    definition?.source || category === "source"
      ? "input"
      : category === "sink" || isOutput
        ? "output"
        : "process";
  return (
    <span
      className={`workflow-node-badge role-${role}`}
      title={`节点 ID：${node.id}`}
    >
      <b>#{number}</b>
      <span>{{ input: "输入", output: "输出", process: "处理" }[role]}</span>
    </span>
  );
}
