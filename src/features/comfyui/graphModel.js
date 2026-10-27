export { layoutGraph, reconcileDiagramNodes } from "../../components/configuration/nodeGraphModel.js";
export const INPUT_KINDS = [
  { value: "text", label: "文本" },
  { value: "integer", label: "整数" },
  { value: "number", label: "数字" },
  { value: "boolean", label: "布尔值" },
  { value: "image", label: "图片附件" },
  { value: "video", label: "视频附件" },
];

export function fieldSummary(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return (text ?? "").replace(/\s+/g, " ").slice(0, 120);
}

export function defaultBinding(node, field) {
  const lower = field.name.toLowerCase();
  const kind = ["integer", "number", "boolean"].includes(field.valueType)
    ? field.valueType
    : /image/.test(lower)
      ? "image"
      : /video/.test(lower)
        ? "video"
        : "text";
  const identifier = `${field.name}_${node.id}`.replace(/[^a-zA-Z0-9_]/g, "_");
  return {
    name: (/^[A-Za-z_]/.test(identifier)
      ? identifier
      : `input_${identifier}`
    ).slice(0, 100),
    label: `${node.title || node.classType} · ${field.name}`,
    description: "",
    nodeId: String(node.id),
    field: field.name,
    kind,
    required: false,
  };
}

export function inputKindsForField(field) {
  const allowed =
    field.valueType === "text"
      ? ["text", "image", "video"]
      : field.valueType === "integer"
        ? ["integer", "number"]
        : [field.valueType];
  return INPUT_KINDS.filter((kind) => allowed.includes(kind.value));
}

/** Save visual positions beside the API prompt, preserving all original UI metadata. */
export function withNodePositions(uiWorkflow, diagramNodes) {
  const positions = new Map(
    diagramNodes
      .filter(
        (node) =>
          Number.isFinite(node.position?.x) &&
          Number.isFinite(node.position?.y),
      )
      .map((node) => [String(node.id), node.position]),
  );
  const previous = Array.isArray(uiWorkflow?.nodes) ? uiWorkflow.nodes : [];
  const existing = new Set(previous.map((node) => String(node.id)));
  const nodes = previous.map((node) => {
    const position = positions.get(String(node.id));
    return position ? { ...node, pos: [position.x, position.y] } : node;
  });
  positions.forEach((position, id) => {
    if (!existing.has(id) && !id.includes(":"))
      nodes.push({ id, pos: [position.x, position.y] });
  });
  return {
    ...(uiWorkflow || {}),
    nodes,
    _cwm: {
      ...uiWorkflow?._cwm,
      positions: {
        ...uiWorkflow?._cwm?.positions,
        ...Object.fromEntries(
          [...positions].map(([id, position]) => [
            id,
            [position.x, position.y],
          ]),
        ),
      },
    },
  };
}

export function applyUiLayout(graph, uiWorkflow) {
  const positions = new Map(
    (uiWorkflow?.nodes || [])
      .filter(
        (node) =>
          Array.isArray(node.pos) &&
          node.pos.length >= 2 &&
          node.pos.slice(0, 2).every(Number.isFinite),
      )
      .map((node) => [String(node.id), { x: node.pos[0], y: node.pos[1] }]),
  );
  Object.entries(uiWorkflow?._cwm?.positions || {}).forEach(([id, pos]) => {
    if (
      Array.isArray(pos) &&
      pos.length >= 2 &&
      pos.slice(0, 2).every(Number.isFinite)
    )
      positions.set(id, { x: pos[0], y: pos[1] });
  });
  return {
    ...graph,
    uiWorkflow,
    nodes: graph.nodes.map((node) =>
      positions.has(String(node.id))
        ? { ...node, position: positions.get(String(node.id)) }
        : node,
    ),
  };
}

export function logicalInputs(bindings = []) {
  const groups = new Map();
  bindings.forEach((binding) => {
    const previous = groups.get(binding.name);
    if (previous)
      previous.targets.push({ nodeId: binding.nodeId, field: binding.field });
    else
      groups.set(binding.name, {
        ...binding,
        targets: [{ nodeId: binding.nodeId, field: binding.field }],
      });
  });
  return [...groups.values()];
}

export function defaultModeForBinding(binding) {
  return ["original", "fixed", "random"].includes(binding.defaultMode)
    ? binding.defaultMode
    : Object.hasOwn(binding, "default") && binding.default !== undefined
      ? "fixed"
      : "original";
}

function normalizeDefaultPolicy(binding) {
  const next = { ...binding };
  for (const key of Object.keys(next)) {
    if (
      next[key] === undefined ||
      (typeof next[key] === "number" && !Number.isFinite(next[key]))
    )
      delete next[key];
  }
  let mode = defaultModeForBinding(next);
  if (mode === "random" && !["integer", "number"].includes(next.kind))
    mode = "original";
  next.defaultMode = mode;
  if (mode !== "fixed") delete next.default;
  if (mode === "random") {
    next.randomMin ??= 0;
    next.randomMax ??= 4294967295;
  } else {
    delete next.randomMin;
    delete next.randomMax;
  }
  return next;
}

export function initialRunValues(bindings) {
  return Object.fromEntries(
    logicalInputs(bindings)
      .filter(
        (binding) =>
          binding.required && defaultModeForBinding(binding) === "original",
      )
      .map((binding) => [
        binding.name,
        binding.kind === "boolean" ? false : "",
      ]),
  );
}

export function defaultPolicyHint(binding) {
  const mode = defaultModeForBinding(binding);
  if (mode === "random")
    return `新任务由后端在 ${binding.randomMin ?? 0} ～ ${binding.randomMax ?? 4294967295} 范围内随机生成一次；同一参数的各个字段共用该值，重试保留本次值。`;
  if (mode === "fixed")
    return `默认使用固定值：${fieldSummary(binding.default)}。开启填写可覆盖本次输入。`;
  return binding.required
    ? "此参数必填，请填写本次输入。"
    : "保留工作流中的原值；开启填写可覆盖本次输入。";
}

/** Shared parameters keep one label, kind and requirement across all target fields. */
export function updateBinding(bindings, nodeId, field, patch) {
  const current = bindings.find(
    (binding) =>
      String(binding.nodeId) === String(nodeId) && binding.field === field,
  );
  if (!current) return bindings;
  const shared =
    Object.hasOwn(patch, "name") && patch.name !== current.name
      ? bindings.find((binding) => binding.name === patch.name)
      : null;
  const nextValue = shared
    ? {
        ...shared,
        nodeId: current.nodeId,
        field: current.field,
        name: patch.name,
      }
    : { ...current, ...patch };
  if (!shared && Object.hasOwn(patch, "kind") && patch.kind !== current.kind) {
    delete nextValue.default;
    delete nextValue.randomMin;
    delete nextValue.randomMax;
    nextValue.defaultMode = patch.defaultMode || "original";
    for (const key of ["default", "randomMin", "randomMax"]) {
      if (Object.hasOwn(patch, key)) nextValue[key] = patch[key];
    }
  }
  const next = normalizeDefaultPolicy(nextValue);
  return bindings.map((binding) => {
    if (binding === current) return next;
    if (!Object.hasOwn(patch, "name") && binding.name === current.name)
      return { ...next, nodeId: binding.nodeId, field: binding.field };
    return binding;
  });
}

export function buildRunInputs(bindings, values) {
  const result = {};
  for (const binding of logicalInputs(bindings)) {
    if (!Object.hasOwn(values, binding.name)) {
      if (binding.required && defaultModeForBinding(binding) === "original")
        throw new Error(`请填写“${binding.label || binding.name}”。`);
      continue;
    }
    const value = values[binding.name];
    if (["image", "video"].includes(binding.kind)) {
      if (!value) {
        if (binding.required)
          throw new Error(`请选择“${binding.label || binding.name}”。`);
        continue;
      }
      result[binding.name] = value;
    } else if (["integer", "number"].includes(binding.kind)) {
      if (value === "" || value == null || !Number.isFinite(Number(value)))
        throw new Error(`“${binding.label || binding.name}”需要有效数字。`);
      const number = Number(value);
      if (binding.kind === "integer" && !Number.isSafeInteger(number))
        throw new Error(
          `“${binding.label || binding.name}”需要安全范围内的整数。`,
        );
      result[binding.name] = number;
    } else if (binding.kind === "boolean") {
      result[binding.name] = value === true;
    } else result[binding.name] = String(value ?? "");
  }
  return result;
}
