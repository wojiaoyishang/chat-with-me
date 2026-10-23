import {
  defaultBinding,
  defaultModeForBinding,
  inputKindsForField,
  logicalInputs,
  updateBinding,
} from "./graphModel.js";

// Virtual canvas inputs are selectable only when the backend verified their
// explicit links against API literals. Ordinary inputs have one concrete target.
export function fieldTargets(node, field) {
  if (node.displayOnly) return field.readonly ? [] : field.targets || [];
  return field.linked || field.valueType === "json"
    ? []
    : [{ nodeId: String(node.id), field: field.name }];
}

const isTarget = (binding, target) =>
  String(binding.nodeId) === String(target.nodeId) &&
  binding.field === target.field;

export function fieldBindingState(bindings, node, field) {
  const targets = fieldTargets(node, field);
  const entries = targets
    .map((target) => bindings.find((binding) => isTarget(binding, target)))
    .filter(Boolean);
  const complete = targets.length > 0 && entries.length === targets.length;
  const mixed = new Set(entries.map((entry) => entry.name)).size > 1;
  return {
    targets,
    entries,
    complete,
    mixed,
    binding: entries.length && !mixed ? entries[0] : null,
  };
}

export function setFieldBinding(bindings, node, field, enabled, shared = null) {
  const { targets, binding } = fieldBindingState(bindings, node, field);
  if (!targets.length) return bindings;
  const rest = bindings.filter(
    (item) => !targets.some((target) => isTarget(item, target)),
  );
  if (!enabled) return rest;
  const prototype = shared || binding || defaultBinding(node, field);
  if (!inputKindsForField(field).some((kind) => kind.value === prototype.kind))
    throw new Error("所选参数类型不适用于这个字段。");
  return [
    ...rest,
    ...targets.map((target) => ({
      ...prototype,
      nodeId: String(target.nodeId),
      field: target.field,
    })),
  ];
}

export function updateFieldBinding(bindings, node, field, patch) {
  return fieldTargets(node, field).reduce(
    (current, target) =>
      updateBinding(current, target.nodeId, target.field, patch),
    bindings,
  );
}

export function reusableParameters(bindings, node, field) {
  const kinds = new Set(inputKindsForField(field).map((kind) => kind.value));
  const { targets } = fieldBindingState(bindings, node, field);
  return logicalInputs(bindings).filter(
    (binding) =>
      kinds.has(binding.kind) &&
      binding.targets.some(
        (target) => !targets.some((own) => isTarget(target, own)),
      ),
  );
}

function numericValue(value, label, integer = false) {
  if (
    !["string", "number"].includes(typeof value) ||
    String(value).trim() === ""
  )
    throw new Error(`“${label}”需要有效数字。`);
  const result = Number(value);
  if (!Number.isFinite(result) || (integer && !Number.isSafeInteger(result)))
    throw new Error(
      `“${label}”需要${integer ? "安全范围内的整数" : "有限数字"}。`,
    );
  return result;
}

/** Form editing can contain partial numeric strings. Only serialize valid,
 * typed defaults, so an empty/invalid number never silently becomes 0 or null. */
export function prepareBindingsForSave(bindings) {
  return bindings.map((binding) => {
    const result = Object.fromEntries(
      Object.entries(binding).filter(([, value]) => value !== undefined),
    );
    const mode = defaultModeForBinding(binding);
    const label = binding.label || binding.name;
    result.defaultMode = mode;
    if (mode !== "fixed") delete result.default;
    if (mode !== "random") {
      delete result.randomMin;
      delete result.randomMax;
    }
    if (mode === "fixed") {
      if (!Object.hasOwn(result, "default"))
        throw new Error(`请设置“${label}”的默认值。`);
      if (["integer", "number"].includes(binding.kind))
        result.default = numericValue(
          result.default,
          `${label}的默认值`,
          binding.kind === "integer",
        );
      else if (
        ["image", "video"].includes(binding.kind) &&
        !/^cwm:\/\/artifact\/[^/?#]+$/.test(result.default)
      )
        throw new Error(`请选择“${label}”的默认附件。`);
    } else if (mode === "random") {
      if (!["integer", "number"].includes(binding.kind))
        throw new Error("只有数字参数支持默认随机整数。");
      result.randomMin = numericValue(
        binding.randomMin ?? 0,
        `${label}的随机最小值`,
        true,
      );
      result.randomMax = numericValue(
        binding.randomMax ?? 4294967295,
        `${label}的随机最大值`,
        true,
      );
      if (result.randomMin > result.randomMax)
        throw new Error(`“${label}”的随机最小值不能大于最大值。`);
    } else if (mode !== "original")
      throw new Error(`“${label}”的默认取值方式无效。`);
    return result;
  });
}
