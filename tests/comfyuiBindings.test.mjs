import test from "node:test";
import assert from "node:assert/strict";
import {
  fieldBindingState,
  fieldTargets,
  prepareBindingsForSave,
  reusableParameters,
  setFieldBinding,
  updateFieldBinding,
} from "../src/features/comfyui/bindingModel.js";
import { buildRunInputs } from "../src/features/comfyui/graphModel.js";
import { readWorkflowFiles } from "../src/features/comfyui/importModel.js";

const primitive = {
  id: "3",
  title: "图一提示词",
  classType: "PrimitiveNode",
  displayOnly: true,
};
const valueField = {
  name: "value",
  value: "original",
  valueType: "text",
  targets: [
    { nodeId: "2", field: "text" },
    { nodeId: "5", field: "text" },
  ],
};

test("verified primitive source becomes one parameter with two concrete API targets", () => {
  const bindings = setFieldBinding([], primitive, valueField, true);
  assert.equal(bindings.length, 2);
  assert.deepEqual(
    bindings.map(({ nodeId, field }) => ({ nodeId, field })),
    valueField.targets,
  );
  assert.equal(bindings[0].name, bindings[1].name);
  assert.equal(
    fieldBindingState(bindings, primitive, valueField).complete,
    true,
  );
  assert.deepEqual(
    buildRunInputs(bindings, { [bindings[0].name]: 'line 1\n"line 2"' }),
    { [bindings[0].name]: 'line 1\n"line 2"' },
  );
  assert.equal(
    bindings.some((item) => item.nodeId === "3"),
    false,
  );
});

test("editing a source updates both targets; unbinding keeps unrelated fields", () => {
  const original = setFieldBinding(
    [{ name: "negative", nodeId: "6", field: "text", kind: "text" }],
    primitive,
    valueField,
    true,
  );
  const renamed = updateFieldBinding(original, primitive, valueField, {
    name: "positive_prompt",
  });
  assert.equal(
    renamed.filter((item) => item.name === "positive_prompt").length,
    2,
  );
  const described = updateFieldBinding(renamed, primitive, valueField, {
    description: "Use English",
    required: true,
  });
  assert.ok(
    described
      .filter((item) => item.name === "positive_prompt")
      .every((item) => item.description === "Use English" && item.required),
  );
  assert.deepEqual(setFieldBinding(described, primitive, valueField, false), [
    original[0],
  ]);
  assert.equal(original[1].description, "");
});

test("explicit parameter reuse copies complete metadata and keeps one run input", () => {
  const shared = {
    name: "prompt",
    label: "正面提示词",
    kind: "text",
    description: "请保持主体",
    required: true,
    default: "",
  };
  const original = [{ ...shared, nodeId: "2", field: "text" }];
  const node = { id: "5", classType: "Encode" };
  const field = { name: "text", value: "other", valueType: "text" };
  const options = reusableParameters(original, node, field);
  assert.equal(options.length, 1);
  const joined = setFieldBinding(original, node, field, true, shared);
  assert.equal(joined[1].default, "");
  assert.equal(joined[1].description, shared.description);
  assert.deepEqual(buildRunInputs(joined, { prompt: "sunrise" }), {
    prompt: "sunrise",
  });
  assert.equal(original.length, 1);
  assert.equal(
    reusableParameters(joined, node, { ...field, valueType: "boolean" }).length,
    0,
  );
  assert.throws(
    () =>
      setFieldBinding(
        [],
        node,
        { ...field, valueType: "boolean" },
        true,
        shared,
      ),
    /类型/,
  );
});

test("unverified canvas nodes and linked/compound fields cannot create inferred bindings", () => {
  assert.deepEqual(
    fieldTargets(primitive, { ...valueField, readonly: true }),
    [],
  );
  assert.deepEqual(
    setFieldBinding([], primitive, { ...valueField, targets: [] }, true),
    [],
  );
  assert.deepEqual(
    fieldTargets({ id: "5" }, { ...valueField, linked: true }),
    [],
  );
  assert.deepEqual(
    fieldTargets({ id: "5" }, { ...valueField, valueType: "json" }),
    [],
  );
});

test("partly bound or independently bound source targets are exposed as mixed state", () => {
  const partial = [{ name: "one", nodeId: "2", field: "text", kind: "text" }];
  assert.equal(
    fieldBindingState(partial, primitive, valueField).complete,
    false,
  );
  const mixed = [
    ...partial,
    { name: "two", nodeId: "5", field: "text", kind: "text" },
  ];
  assert.equal(fieldBindingState(mixed, primitive, valueField).mixed, true);
  const unified = setFieldBinding(mixed, primitive, valueField, true);
  assert.equal(fieldBindingState(unified, primitive, valueField).mixed, false);
});

test("file pairing accepts API and canvas in either order and rejects ambiguous pairs", () => {
  const api = {
    name: "api.json",
    text: JSON.stringify({ 2: { class_type: "Text", inputs: { text: "x" } } }),
  };
  const canvas = {
    name: "canvas.json",
    text: JSON.stringify({
      nodes: [{ id: 3, type: "PrimitiveNode" }],
      links: [],
    }),
  };
  for (const files of [
    [api, canvas],
    [canvas, api],
  ]) {
    const parsed = readWorkflowFiles(files);
    assert.equal(parsed.api.name, "api.json");
    assert.equal(parsed.canvas.name, "canvas.json");
  }
  assert.equal(readWorkflowFiles([canvas]).api, null);
  assert.throws(() => readWorkflowFiles([api, api]), /API JSON/);
  assert.throws(() => readWorkflowFiles([canvas, canvas]), /画布 JSON/);
  assert.throws(() => readWorkflowFiles([{ text: "[]" }]), /对象/);
});

test("saving defaults preserves explicit false/zero/empty and converts numeric form values", () => {
  const values = prepareBindingsForSave([
    { name: "seed", kind: "integer", defaultMode: "fixed", default: "0" },
    { name: "enabled", kind: "boolean", defaultMode: "fixed", default: false },
    { name: "prompt", kind: "text", defaultMode: "fixed", default: "" },
    { name: "legacy", kind: "number", default: 0.25 },
    {
      name: "fresh",
      kind: "integer",
      defaultMode: "random",
      randomMin: "-5",
      randomMax: "20",
      default: undefined,
    },
  ]);
  assert.deepEqual(
    values.map((value) => value.default),
    [0, false, "", 0.25, undefined],
  );
  assert.equal(values[4].randomMin, -5);
  assert.equal(values[4].randomMax, 20);
  assert.equal(Object.hasOwn(values[4], "default"), false);
  assert.equal(values[3].defaultMode, "fixed");
});

test("invalid numeric default/range cannot serialize as null or silently become zero", () => {
  const fixed = { name: "seed", kind: "integer", defaultMode: "fixed" };
  for (const value of ["", "-", "1.5", NaN, Infinity, "9007199254740992"])
    assert.throws(() => prepareBindingsForSave([{ ...fixed, default: value }]));
  assert.throws(
    () =>
      prepareBindingsForSave([
        { ...fixed, defaultMode: "random", randomMin: 10, randomMax: 1 },
      ]),
    /最小值/,
  );
  assert.throws(
    () =>
      prepareBindingsForSave([
        { ...fixed, defaultMode: "random", randomMin: "" },
      ]),
    /有效数字/,
  );
  assert.throws(
    () =>
      prepareBindingsForSave([
        {
          name: "image",
          kind: "image",
          defaultMode: "fixed",
          default: "example.png",
        },
      ]),
    /默认附件/,
  );
  assert.equal(
    prepareBindingsForSave([
      {
        name: "image",
        kind: "image",
        defaultMode: "fixed",
        default: "cwm://artifact/actual-id",
      },
    ])[0].default,
    "cwm://artifact/actual-id",
  );
});
