export function executionModeForWorkflow(workflow) {
  return workflow?.executionMode === "task" ? "task" : "wait";
}

export function assertOutputSelection(requireOutput = true, outputs = []) {
  if (requireOutput && !outputs.length)
    throw new Error(
      "请先在流程图中选择至少一个输出节点，或关闭“必须选择输出节点”。",
    );
}

export function normalizeComfyRunResponse(response) {
  if (response?.mode === "wait") {
    if (
      response.status !== "completed" ||
      !response.result ||
      typeof response.result !== "object"
    )
      throw new Error("ComfyUI 尚未返回完成结果。");
    return { mode: "wait", result: response.result };
  }
  const task = response?.task || response;
  if (!task?.taskId && !task?.id && !task?.jobId)
    throw new Error("任务提交响应缺少任务标识。");
  return { mode: "task", task };
}
