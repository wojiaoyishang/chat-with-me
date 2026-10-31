/** Sparse model option state: absence inherits, while 0/false stay explicit. */
export function setWorkflowModelOptions(options, id, next) {
  const result = { ...(options || {}) };
  const parameters = next?.parameters || {};
  const effort = next?.reasoningEffort;
  const value = {
    ...(Object.keys(parameters).length
      ? { parameters: { ...parameters } }
      : {}),
    ...(effort && effort !== "default" ? { reasoningEffort: effort } : {}),
  };
  if (Object.keys(value).length) result[id] = value;
  else delete result[id];
  return result;
}

export function workflowModelOptionErrors(value, schema = {}, path = "") {
  if (value === undefined) return [];
  if (value === null)
    return schema.type === "null" || !schema.type
      ? []
      : [`${path}：不能为 null`];
  if (schema.enum && !schema.enum.includes(value))
    return [`${path}：请选择模型支持的选项`];
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value))
      return [`${path}：需要对象`];
    return Object.entries(value).flatMap(([key, item]) => {
      const child = schema.properties?.[key];
      if (!child && schema.additionalProperties === false)
        return [`${path}.${key}：模型不支持此参数`];
      return child
        ? workflowModelOptionErrors(item, child, path ? `${path}.${key}` : key)
        : [];
    });
  }
  if (["number", "integer"].includes(schema.type)) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      (schema.type === "integer" && !Number.isInteger(value))
    )
      return [
        `${path}：请输入有效${schema.type === "integer" ? "整数" : "数字"}`,
      ];
    if (
      (schema.minimum != null && value < schema.minimum) ||
      (schema.maximum != null && value > schema.maximum)
    )
      return [`${path}：超出模型允许范围`];
  }
  if (schema.type === "array") {
    if (!Array.isArray(value)) return [`${path}：需要列表`];
    if (
      (schema.minItems != null && value.length < schema.minItems) ||
      (schema.maxItems != null && value.length > schema.maxItems)
    )
      return [`${path}：列表数量超出模型允许范围`];
    return value.flatMap((item, index) =>
      workflowModelOptionErrors(item, schema.items || {}, `${path}[${index}]`),
    );
  }
  if (schema.type === "string") {
    if (typeof value !== "string") return [`${path}：需要文本`];
    if (
      (schema.minLength != null && value.length < schema.minLength) ||
      (schema.maxLength != null && value.length > schema.maxLength)
    )
      return [`${path}：文本长度超出模型允许范围`];
  }
  if (schema.type === "boolean" && typeof value !== "boolean")
    return [`${path}：需要布尔值`];
  return [];
}

export function workflowModelOptionDefault(schema = {}) {
  if (Object.hasOwn(schema, "default")) return schema.default;
  if (schema.enum?.length) return schema.enum[0];
  if (schema.type === "boolean") return false;
  if (["number", "integer"].includes(schema.type)) return schema.minimum ?? 0;
  if (schema.type === "array") return [];
  return "";
}

export function workflowModelOptionsDraft(value, schema = {}) {
  const draft = structuredClone(value || {});
  // The backend normalizes inheritance to an explicit default even for models
  // without a reasoning control. It is not an unknown user-supplied override.
  if (
    draft.reasoningEffort === "default" &&
    !schema.properties?.reasoningEffort
  )
    delete draft.reasoningEffort;
  return draft;
}
