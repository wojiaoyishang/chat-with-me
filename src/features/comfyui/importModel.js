/** Accept either export alone, or pair API + same-version original canvas. */
export function readWorkflowFiles(files) {
  let api = null;
  let canvas = null;
  for (const file of files) {
    const value = JSON.parse(file.text);
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error("工作流 JSON 必须是对象。");
    if (Array.isArray(value.nodes) && !value.prompt) {
      if (canvas) throw new Error("一次只能导入一份画布 JSON。");
      canvas = { ...file, value };
    } else {
      if (api)
        throw new Error("一次只能导入一份 API JSON；另一份应为普通画布 JSON。");
      api = { ...file, value };
    }
  }
  return { api, canvas };
}

export function workflowSourceKind(raw) {
  try {
    const value = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(value?.nodes) && !value.prompt ? "canvas" : "api";
  } catch {
    return "unknown";
  }
}

export function inspectWorkflowPayload(raw, canvasRaw = "", serverId = "") {
  const source = raw.trim() || canvasRaw.trim();
  if (!source) throw new Error("请选择或粘贴工作流 JSON。");
  const workflow = JSON.parse(source);
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow))
    throw new Error("工作流 JSON 必须是对象。");
  const canvasOnly = workflowSourceKind(workflow) === "canvas";
  return {
    workflow,
    ...(canvasOnly && serverId ? { serverId } : {}),
    ...(!canvasOnly && canvasRaw.trim()
      ? { uiWorkflow: JSON.parse(canvasRaw) }
      : {}),
  };
}
