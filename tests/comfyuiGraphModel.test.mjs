import test from "node:test";
import assert from "node:assert/strict";
import {
  buildRunInputs,
  defaultBinding,
  defaultModeForBinding,
  defaultPolicyHint,
  fieldSummary,
  inputKindsForField,
  initialRunValues,
  layoutGraph,
  logicalInputs,
  reconcileDiagramNodes,
  updateBinding,
  withNodePositions,
} from "../src/features/comfyui/graphModel.js";

test("configured defaults and backend random policies remain omitted from manual run inputs", () => {
  const bindings = [
    { name: "requiredText", kind: "text", required: true },
    {
      name: "seed",
      kind: "integer",
      required: true,
      defaultMode: "random",
      randomMin: 0,
      randomMax: 100,
    },
    { name: "enabled", kind: "boolean", required: true, default: false },
    { name: "scale", kind: "number", defaultMode: "fixed", default: 0 },
  ];
  assert.equal(defaultModeForBinding(bindings[0]), "original");
  assert.equal(defaultModeForBinding(bindings[2]), "fixed");
  assert.deepEqual(initialRunValues(bindings), { requiredText: "" });
  assert.deepEqual(buildRunInputs(bindings, { requiredText: "", seed: 0 }), {
    requiredText: "",
    seed: 0,
  });
  assert.deepEqual(buildRunInputs(bindings.slice(1), {}), {});
  assert.match(defaultPolicyHint(bindings[1]), /后端.*随机生成一次.*重试保留/);
  assert.match(defaultPolicyHint(bindings[2]), /false/);
});

test("same named parameter shares policy changes and clears inactive default properties", () => {
  const bindings = ["1", "2"].map((nodeId) => ({
    name: "seed",
    nodeId,
    field: "seed",
    kind: "integer",
    defaultMode: "fixed",
    default: 0,
  }));
  const random = updateBinding(bindings, "1", "seed", {
    defaultMode: "random",
    randomMin: 4,
    randomMax: 9,
  });
  assert.ok(
    random.every(
      (binding) =>
        binding.defaultMode === "random" &&
        binding.randomMin === 4 &&
        binding.randomMax === 9 &&
        !Object.hasOwn(binding, "default"),
    ),
  );
  const fixed = updateBinding(random, "2", "seed", {
    defaultMode: "fixed",
    default: 10,
  });
  assert.ok(
    fixed.every(
      (binding) =>
        binding.default === 10 &&
        !Object.hasOwn(binding, "randomMin") &&
        !Object.hasOwn(binding, "randomMax"),
    ),
  );
  const original = updateBinding(fixed, "1", "seed", {
    defaultMode: "original",
  });
  assert.ok(
    original.every(
      (binding) =>
        binding.defaultMode === "original" &&
        !Object.hasOwn(binding, "default"),
    ),
  );
  const changedKind = updateBinding(random, "1", "seed", { kind: "text" });
  assert.ok(
    changedKind.every(
      (binding) =>
        binding.kind === "text" &&
        binding.defaultMode === "original" &&
        !Object.hasOwn(binding, "randomMin"),
    ),
  );
  assert.equal(bindings[0].default, 0);
});

test("joining a shared parameter copies its complete policy and removes stale old fields", () => {
  const bindings = [
    {
      name: "shared",
      nodeId: "1",
      field: "seed",
      kind: "integer",
      defaultMode: "original",
    },
    {
      name: "own",
      nodeId: "2",
      field: "seed",
      kind: "integer",
      defaultMode: "random",
      randomMin: 4,
      randomMax: 9,
      default: 7,
    },
  ];
  const joined = updateBinding(bindings, "2", "seed", { name: "shared" });
  assert.equal(joined[1].defaultMode, "original");
  for (const key of ["randomMin", "randomMax", "default"])
    assert.equal(Object.hasOwn(joined[1], key), false);
  const random = updateBinding(joined, "1", "seed", { defaultMode: "random" });
  assert.ok(
    random.every(
      (binding) => binding.randomMin === 0 && binding.randomMax === 4294967295,
    ),
  );
});

test("removing defaults and entering non-finite numbers never leaks null defaults into JSON", () => {
  const bindings = [
    {
      name: "seed",
      nodeId: "1",
      field: "seed",
      kind: "number",
      defaultMode: "fixed",
      default: 2,
    },
  ];
  const removed = updateBinding(bindings, "1", "seed", { default: undefined });
  assert.equal(Object.hasOwn(removed[0], "default"), false);
  assert.equal(removed[0].defaultMode, "fixed");
  const invalid = updateBinding(bindings, "1", "seed", { default: Infinity });
  assert.equal(Object.hasOwn(invalid[0], "default"), false);
  assert.equal(JSON.stringify(invalid).includes('"default":null'), false);
});

test("arranged node positions survive selection and binding badge updates", () => {
  const current = [
    {
      id: "12",
      position: { x: 450, y: 120 },
      measured: { width: 230, height: 100 },
      data: { bindingCount: 0 },
      selected: false,
    },
  ];
  const refreshed = [
    {
      id: "12",
      position: { x: 0, y: 0 },
      data: { bindingCount: 1 },
      selected: true,
    },
  ];
  const updated = reconcileDiagramNodes(current, refreshed);
  assert.deepEqual(updated[0].position, { x: 450, y: 120 });
  assert.equal(updated[0].data.bindingCount, 1);
  assert.equal(updated[0].selected, true);
  assert.deepEqual(updated[0].measured, { width: 230, height: 100 });
  assert.deepEqual(
    reconcileDiagramNodes(current, refreshed, true)[0].position,
    { x: 0, y: 0 },
  );
});

test("visual position saving preserves the original workflow metadata and prompt", () => {
  const source = {
    version: 0.4,
    extra: { note: "keep" },
    nodes: [
      { id: 12, pos: [0, 0], type: "LoadImage", widgets_values: ["old.png"] },
      { id: 99, pos: [7, 8], type: "Note" },
    ],
    links: [[1, 12, 0, 40, 0, "IMAGE"]],
  };
  const before = JSON.stringify(source);
  const arranged = withNodePositions(source, [
    { id: "12", position: { x: -15, y: 230 } },
    { id: "40", position: { x: 600, y: 120 } },
  ]);
  assert.equal(JSON.stringify(source), before);
  assert.deepEqual(arranged.nodes[0], { ...source.nodes[0], pos: [-15, 230] });
  assert.deepEqual(arranged.nodes[1], source.nodes[1]);
  assert.deepEqual(arranged.nodes[2], { id: "40", pos: [600, 120] });
  assert.deepEqual(arranged.links, source.links);
  assert.deepEqual(arranged.extra, source.extra);
  assert.deepEqual(
    withNodePositions(null, [{ id: "3", position: { x: 3, y: 4 } }]),
    { nodes: [{ id: "3", pos: [3, 4] }], _cwm: { positions: { 3: [3, 4] } } },
  );
});

test("API-only layout follows dependencies and never changes original nodes or edges", () => {
  const nodes = [
    { id: "image", position: { x: 0, y: 0 } },
    { id: "text" },
    { id: "sample" },
    { id: "save" },
  ];
  const edges = [
    { source: "image", target: "sample" },
    { source: "text", target: "sample" },
    { source: "sample", target: "save" },
  ];
  const before = JSON.stringify({ nodes, edges });
  const graph = layoutGraph(nodes, edges);
  assert.equal(graph[0].position.x, graph[1].position.x);
  assert.notEqual(graph[0].position.y, graph[1].position.y);
  assert.ok(graph[2].position.x > graph[0].position.x);
  assert.ok(graph[3].position.x > graph[2].position.x);
  assert.equal(JSON.stringify({ nodes, edges }), before);
});

test("original ComfyUI canvas coordinates are retained when present", () => {
  assert.deepEqual(
    layoutGraph([{ id: "5", position: { x: 123, y: -45 } }], [], true)[0]
      .position,
    { x: 123, y: -45 },
  );
});

test("layout tolerates cycle and unknown references without hanging", () => {
  const nodes = [{ id: "1" }, { id: "2" }];
  const graph = layoutGraph(nodes, [
    { source: "1", target: "2" },
    { source: "2", target: "1" },
    { source: "missing", target: "2" },
  ]);
  assert.equal(graph.length, 2);
  assert.ok(graph.every((node) => Number.isFinite(node.position.x)));
});

test("large API graph layouts do not overflow the call stack", () => {
  const nodes = Array.from({ length: 5000 }, (_, id) => ({ id: String(id) }));
  const edges = nodes
    .slice(1)
    .map((node, index) => ({ source: String(index), target: node.id }));
  const graph = layoutGraph(nodes, edges);
  assert.equal(graph[4999].position.x, 4999 * 300);
});

test("run values preserve false, zero and deliberate empty text; omitted fields stay omitted", () => {
  const bindings = [
    { name: "prompt", kind: "text" },
    { name: "seed", kind: "integer" },
    { name: "enabled", kind: "boolean" },
    { name: "omitted", kind: "text" },
  ];
  assert.deepEqual(
    buildRunInputs(bindings, { prompt: "", seed: 0, enabled: false }),
    { prompt: "", seed: 0, enabled: false },
  );
  assert.throws(
    () => buildRunInputs([{ name: "seed", kind: "integer" }], { seed: "1.5" }),
    /整数/,
  );
  assert.throws(
    () => buildRunInputs([{ name: "seed", kind: "integer" }], { seed: "" }),
    /有效数字/,
  );
  assert.throws(
    () =>
      buildRunInputs([{ name: "seed", kind: "integer" }], {
        seed: "9007199254740993",
      }),
    /安全范围/,
  );
});

test("file parameters forward the artifact reference and required media cannot be empty", () => {
  const bindings = [{ name: "image", kind: "image", required: true }];
  assert.deepEqual(
    buildRunInputs(bindings, { image: "cwm://artifact/actual-id" }),
    { image: "cwm://artifact/actual-id" },
  );
  assert.throws(() => buildRunInputs(bindings, { image: "" }), /请选择/);
  assert.throws(() => buildRunInputs(bindings, {}), /请填写/);
  assert.deepEqual(
    buildRunInputs([{ name: "video", kind: "video" }], { video: "" }),
    {},
  );
});

test("one named parameter groups several target fields and updates common metadata", () => {
  const bindings = [
    {
      name: "prompt",
      nodeId: "1",
      field: "text",
      kind: "text",
      label: "提示词",
      description: "填写中文画面描述。",
      required: true,
    },
    {
      name: "prompt2",
      nodeId: "2",
      field: "text",
      kind: "text",
      label: "另一段",
      required: false,
    },
  ];
  const joined = updateBinding(bindings, "2", "text", { name: "prompt" });
  assert.equal(logicalInputs(joined).length, 1);
  assert.equal(logicalInputs(joined)[0].targets.length, 2);
  assert.equal(joined[1].label, "提示词");
  assert.equal(joined[1].required, true);
  assert.equal(joined[1].description, "填写中文画面描述。");
  const updated = updateBinding(joined, "1", "text", { label: "共同提示词" });
  assert.equal(updated[1].label, "共同提示词");
  assert.equal(
    updateBinding(joined, "1", "text", { description: "新说明" })[1]
      .description,
    "新说明",
  );
  assert.deepEqual(buildRunInputs(joined, { prompt: '有换行\n和"引号"' }), {
    prompt: '有换行\n和"引号"',
  });
  assert.equal(bindings[1].name, "prompt2");
});

test("binding defaults identify media purpose and do not replace original literal values", () => {
  const node = { id: "12", title: "参考图", classType: "LoadImage" };
  assert.equal(
    defaultBinding(node, {
      name: "image",
      value: "original.png",
      valueType: "text",
    }).kind,
    "image",
  );
  assert.equal(
    defaultBinding(node, {
      name: "enabled",
      value: false,
      valueType: "boolean",
    }).kind,
    "boolean",
  );
  assert.equal(
    defaultBinding(node, {
      name: "image_width",
      value: 1024,
      valueType: "integer",
    }).kind,
    "integer",
  );
  assert.deepEqual(
    inputKindsForField({ valueType: "text" }).map((kind) => kind.value),
    ["text", "image", "video"],
  );
  assert.deepEqual(
    inputKindsForField({ valueType: "integer" }).map((kind) => kind.value),
    ["integer", "number"],
  );
  assert.deepEqual(inputKindsForField({ valueType: "json" }), []);
  assert.equal(
    Object.hasOwn(defaultBinding(node, { name: "image" }), "default"),
    false,
  );
  assert.ok(fieldSummary("a".repeat(500)).length <= 120);
});
