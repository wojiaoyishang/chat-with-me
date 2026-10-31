import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import {
  setWorkflowModelOptions,
  workflowModelOptionErrors,
  workflowModelOptionsDraft,
} from "../src/features/workflows/workflowModelOptionsState.js";

const output = `temp/workflow-model-options-${process.pid}.mjs`;
await build({
  entryPoints: ["src/features/workflows/WorkflowSettingsFields.jsx"],
  outfile: output,
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  plugins: [
    {
      name: "options-ui",
      setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({
          path: name,
          external: true,
        }));
        builder.onResolve({ filter: /WorkflowSourcePicker.jsx$/ }, () => ({
          path: "source",
          namespace: "mock",
        }));
        builder.onResolve({ filter: /WorkflowKnowledgePicker.jsx$/ }, () => ({
          path: "knowledge",
          namespace: "mock",
        }));
        builder.onResolve({ filter: /WorkflowSchemaInput.jsx$/ }, () => ({
          path: "schema",
          namespace: "mock",
        }));
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => ({
          path: name,
          namespace: "mock",
        }));
        builder.onLoad(
          { filter: /.*/, namespace: "mock" },
          ({ path: name }) => {
            let contents = "export default ()=>null;";
            if (name === "source")
              contents =
                "export default ()=>null;export const WorkflowSelect=({label,value,onChange,options,disabled})=><select aria-label={label} value={value} disabled={disabled} onChange={event=>onChange(event.target.value)}>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>;";
            else if (name === "knowledge")
              contents =
                "export default ()=>null;export const WorkflowGraphDatabasePicker=()=>null;";
            else if (name.endsWith("JsonConfigEditor.jsx"))
              contents =
                "import {useState} from 'react';export default function JsonEditor({label,value,onChange,onStateChange,readOnly}){const [text,setText]=useState(JSON.stringify(value||[]));return <textarea aria-label={label} value={text} readOnly={readOnly} onInput={event=>{const text=event.target.value;setText(text);try{const value=JSON.parse(text);onChange(value);onStateChange({valid:true});}catch{onStateChange({valid:false});}}}/>;}";
            else if (name.endsWith("/button"))
              contents =
                "export const Button=({size,variant,...props})=><button {...props}/>;";
            else if (name.endsWith("/input"))
              contents = "export const Input=props=><input {...props}/>;";
            else if (name.endsWith("/checkbox"))
              contents =
                'export const Checkbox=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;';
            else if (name.endsWith("/switch"))
              contents =
                'export const Switch=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;';
            else if (name.endsWith("/dialog"))
              contents =
                'export const Dialog=({open,children})=>open?<section role="dialog">{children}</section>:null;export const DialogContent=({children,...props})=><div {...props}>{children}</div>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;export const DialogHeader=({children,...props})=><header {...props}>{children}</header>;export const DialogFooter=({children,...props})=><footer {...props}>{children}</footer>;';
            return { loader: "jsx", contents };
          },
        );
      },
    },
  ],
});
const { default: Fields } = await import(
  pathToFileURL(path.resolve(output)).href
);
const capabilities = {
  type: "object",
  additionalProperties: false,
  properties: {
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        top_k: {
          type: "integer",
          title: "Top K",
          minimum: 1,
          maximum: 100,
          default: 10,
        },
        stop: {
          type: "array",
          title: "停止序列",
          minItems: 1,
          maxItems: 20,
          items: { type: "string", minLength: 1 },
        },
      },
    },
    reasoningEffort: {
      type: "string",
      title: "思考程度",
      enum: ["default", "none", "high"],
      enumNames: ["继承模型", "不思考", "深度思考"],
    },
  },
};
const models = [
  { id: "one", name: "视觉模型", callOptionsSchema: capabilities },
  {
    id: "two",
    name: "文字模型",
    callOptionsSchema: {
      type: "object",
      properties: {
        parameters: {
          type: "object",
          properties: { top_p: { type: "number", minimum: 0, maximum: 1 } },
        },
      },
    },
  },
];
const schema = {
  type: "object",
  properties: {
    modelIds: { type: "array", ui: { widget: "model-list-picker" } },
    modelOptions: {
      type: "object",
      title: "模型调用参数",
      ui: { widget: "model-options", modelIdsField: "modelIds" },
    },
  },
};
async function mount(
  initial = {
    modelIds: ["one", "two"],
    modelOptions: { two: { parameters: { top_p: 0 } } },
  },
) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/",
    pretendToBeVisual: true,
  });
  for (const key of ["window", "document", "HTMLElement", "Node", "Event"])
    globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const state = { value: initial, changes: [] };
  function Form() {
    const [value, setValue] = React.useState(initial);
    state.value = value;
    return React.createElement(Fields, {
      schema,
      value,
      models,
      onChange: (next) => {
        state.changes.push(next);
        setValue(next);
      },
    });
  }
  const root = createRoot(document.getElementById("root"));
  await act(async () => root.render(React.createElement(Form)));
  return {
    state,
    close: async () => {
      await act(async () => root.unmount());
      dom.window.close();
    },
  };
}
const byLabel = (label) => document.querySelector(`[aria-label="${label}"]`);
const button = (label) =>
  [...document.querySelectorAll("button")].find(
    (item) => item.textContent.trim() === label,
  );
const click = async (node) => {
  assert.ok(node);
  await act(async () => node.click());
};
async function edit(node, value) {
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      node.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "value",
    ).set.call(node, value);
    node.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
}

test("per-model capabilities control parameters and sparse overrides preserve other models", async () => {
  const ui = await mount();
  try {
    await click(byLabel("配置 视觉模型 调用参数"));
    assert.ok(byLabel("Top K"));
    assert.equal(byLabel("Top K").disabled, true);
    await click(byLabel("自定义 Top K"));
    await edit(byLabel("Top K"), "8");
    await act(async () => {
      byLabel("思考程度").value = "none";
      byLabel("思考程度").dispatchEvent(
        new window.Event("change", { bubbles: true }),
      );
    });
    await click(button("应用"));
    assert.deepEqual(ui.state.value.modelOptions, {
      one: { parameters: { top_k: 8 }, reasoningEffort: "none" },
      two: { parameters: { top_p: 0 } },
    });
    assert.deepEqual(ui.state.value.modelIds, ["one", "two"]);
    await click(byLabel("配置 文字模型 调用参数"));
    assert.equal(
      byLabel("Top K"),
      null,
      "unsupported parameters must not appear",
    );
    assert.equal(
      byLabel("思考程度"),
      null,
      "unsupported reasoning must not appear",
    );
    await click(button("取消"));
    await click(byLabel("重置 视觉模型 参数"));
    assert.deepEqual(ui.state.value.modelOptions, {
      two: { parameters: { top_p: 0 } },
    });
  } finally {
    await ui.close();
  }
});

test("invalid model values cannot apply and cancelling keeps the original graph draft", async () => {
  const ui = await mount();
  try {
    await click(byLabel("配置 视觉模型 调用参数"));
    await click(byLabel("自定义 Top K"));
    await edit(byLabel("Top K"), "-1");
    assert.equal(button("应用").disabled, true);
    assert.match(document.querySelector('[role="alert"]').textContent, /超出/);
    await click(button("取消"));
    assert.deepEqual(ui.state.value.modelOptions, {
      two: { parameters: { top_p: 0 } },
    });
    assert.equal(ui.state.changes.length, 0);
  } finally {
    await ui.close();
  }
});

test("unfinished compound parameter edits disable apply until the editor reports valid content", async () => {
  const ui = await mount();
  try {
    await click(byLabel("配置 视觉模型 调用参数"));
    await click(byLabel("自定义 停止序列"));
    await edit(byLabel("停止序列"), "[");
    assert.equal(button("应用").disabled, true);
    assert.match(document.body.textContent, /尚未完成/);
    await edit(byLabel("停止序列"), '["END"]');
    assert.equal(button("应用").disabled, false);
    await click(button("应用"));
    assert.deepEqual(ui.state.value.modelOptions.one, {
      parameters: { stop: ["END"] },
    });
  } finally {
    await ui.close();
  }
});

test("unavailable model overrides remain visible and are never silently dropped", async () => {
  const ui = await mount({
    modelIds: ["missing"],
    modelOptions: { missing: { parameters: { top_k: 17 } } },
  });
  try {
    assert.match(document.body.textContent, /模型已不可用/);
    assert.equal(byLabel("配置 missing 调用参数").disabled, true);
    assert.deepEqual(ui.state.value.modelOptions, {
      missing: { parameters: { top_k: 17 } },
    });
  } finally {
    await ui.close();
  }
});

test("sparse override helpers retain explicit zero and reject unsupported or nonfinite values", () => {
  assert.deepEqual(
    setWorkflowModelOptions({ other: { parameters: { top_p: 0 } } }, "one", {
      parameters: { temperature: 0 },
      reasoningEffort: "default",
    }),
    {
      other: { parameters: { top_p: 0 } },
      one: { parameters: { temperature: 0 } },
    },
  );
  assert.ok(
    workflowModelOptionErrors({ parameters: { top_k: Infinity } }, capabilities)
      .length,
  );
  assert.ok(
    workflowModelOptionErrors({ parameters: { unsupported: 1 } }, capabilities)
      .length,
  );
  assert.ok(
    workflowModelOptionErrors({ reasoningEffort: "extreme" }, capabilities)
      .length,
  );
  const schemaWithoutReasoning = {
    type: "object",
    additionalProperties: false,
    properties: { parameters: { type: "object" } },
  };
  assert.deepEqual(
    workflowModelOptionsDraft(
      { parameters: {}, reasoningEffort: "default" },
      schemaWithoutReasoning,
    ),
    { parameters: {} },
  );
  assert.equal(
    workflowModelOptionErrors(
      workflowModelOptionsDraft(
        { parameters: {}, reasoningEffort: "default" },
        schemaWithoutReasoning,
      ),
      schemaWithoutReasoning,
    ).length,
    0,
  );
  assert.ok(
    workflowModelOptionErrors(
      workflowModelOptionsDraft(
        { reasoningEffort: "high" },
        schemaWithoutReasoning,
      ),
      schemaWithoutReasoning,
    ).length,
    "explicit unsupported overrides are not silently dropped",
  );
});

test("list and string constraints reject malformed stop values and retain valid arrays", () => {
  const stop = {
    type: "array",
    minItems: 1,
    maxItems: 20,
    items: { type: "string", minLength: 1, maxLength: 100 },
  };
  for (const value of [
    [1],
    [""],
    Array(21).fill("stop"),
    "stop",
    null,
    ["x".repeat(101)],
  ])
    assert.ok(workflowModelOptionErrors(value, stop).length);
  assert.deepEqual(workflowModelOptionErrors(["STOP", "结束"], stop), []);
});
