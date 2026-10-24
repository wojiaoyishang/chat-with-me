import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

await build({
  entryPoints: ["src/components/setting/ComfyUISettings.jsx"],
  bundle: true,
  packages: "external",
  jsx: "automatic",
  format: "esm",
  platform: "node",
  outfile: "temp/comfyui-workflow-maintenance-test.mjs",
  loader: { ".css": "empty" },
  plugins: [
    {
      name: "settings-fixtures",
      setup(builder) {
        builder.onResolve(
          { filter: /^@\/lib\/apiClient\.js$|^@\/components\/ui\// },
          ({ path: target }) => ({ path: target, namespace: "fixture" }),
        );
        builder.onResolve(
          { filter: /ComfyGraphDialog\.jsx$|ComfyRunDialog\.jsx$/ },
          ({ path: target }) => ({ path: target, namespace: "fixture" }),
        );
        builder.onResolve({ filter: /^@\// }, ({ path: target }) => ({
          path: path.resolve(target.replace(/^@\//, "src/")),
        }));
        builder.onLoad(
          { filter: /.*/, namespace: "fixture" },
          ({ path: target }) => {
            if (target.endsWith("apiClient.js"))
              return {
                contents:
                  "export default {get:(...args)=>globalThis.__comfySettings.api('get',...args),post:(...args)=>globalThis.__comfySettings.api('post',...args),put:(...args)=>globalThis.__comfySettings.api('put',...args),delete:(...args)=>globalThis.__comfySettings.api('delete',...args)};",
              };
            if (target.endsWith("ComfyGraphDialog.jsx"))
              return {
                loader: "jsx",
                resolveDir: process.cwd(),
                contents:
                  "export default function Graph(props) {globalThis.__comfySettings.graphProps=props; return <section aria-label='流程图窗口'><button onClick={props.onClose}>关闭流程图</button></section>;}",
              };
            if (target.endsWith("ComfyRunDialog.jsx"))
              return {
                contents: "export default function Run() {return null;}",
              };
            const name = target.split("/").at(-1);
            const contents =
              name === "button"
                ? "export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;"
                : name === "input"
                  ? "export const Input=(props)=><input {...props}/>;"
                  : name === "badge"
                    ? "export const Badge=({children})=><span>{children}</span>;"
                    : name === "switch"
                      ? "export const Switch=({checked,onCheckedChange,disabled})=><button role='switch' aria-checked={checked} disabled={disabled} onClick={()=>onCheckedChange(!checked)}/>;"
                      : name === "select"
                        ? "export const Select=({children})=><div>{children}</div>; export const SelectContent=()=>null; export const SelectTrigger=({children})=><span>{children}</span>; export const SelectItem=()=>null; export const SelectValue=()=>null;"
                        : name === "dialog"
                          ? "export const Dialog=({open,children})=>open?<div data-dialog='true'>{children}</div>:null; export const DialogContent=({children,...props})=><div {...props}>{children}</div>; export const DialogHeader=({children})=><header>{children}</header>; export const DialogTitle=({children})=><h2>{children}</h2>; export const DialogDescription=({children})=><p>{children}</p>; export const DialogFooter=({children})=><footer>{children}</footer>;"
                          : "export const AlertDialog=({open,children})=>open?<div>{children}</div>:null; export const AlertDialogAction=({children,...props})=><button {...props}>{children}</button>; export const AlertDialogCancel=AlertDialogAction; export const AlertDialogContent=({children})=><div>{children}</div>; export const AlertDialogDescription=AlertDialogContent; export const AlertDialogFooter=AlertDialogContent; export const AlertDialogHeader=AlertDialogContent; export const AlertDialogTitle=AlertDialogContent;";
            return { loader: "jsx", resolveDir: process.cwd(), contents };
          },
        );
      },
    },
  ],
});
const { default: Settings } =
  await import("../temp/comfyui-workflow-maintenance-test.mjs");
const original = {
  id: "workflow-1",
  revision: 7,
  name: "text-to-image",
  title: "提示词生成图片",
  notes: "保留使用备注",
  description: "原始说明",
  requireOutput: true,
  executionMode: "wait",
  prompt: {
    1: { class_type: "Text", inputs: { text: "旧文字" } },
    2: { class_type: "Text", inputs: { text: "旧文字" } },
    8: { class_type: "Sampler", inputs: { seed: 11 } },
    10: { class_type: "PreviewImage", inputs: {} },
  },
  nodes: [
    { id: "1", title: "提示词" },
    { id: "10", title: "输出" },
  ],
  bindings: [
    {
      name: "positive_prompt",
      label: "积极提示词",
      description: "适合教材图",
      kind: "text",
      nodeId: "1",
      field: "text",
      defaultMode: "fixed",
      default: "默认提示词",
      required: true,
    },
    {
      name: "positive_prompt",
      label: "积极提示词",
      description: "适合教材图",
      kind: "text",
      nodeId: "2",
      field: "text",
      defaultMode: "fixed",
      default: "默认提示词",
      required: true,
    },
    {
      name: "seed",
      label: "随机种子",
      kind: "integer",
      nodeId: "8",
      field: "seed",
      defaultMode: "random",
      randomMin: 10,
      randomMax: 99,
    },
  ],
  outputBindings: [{ nodeId: "10", kind: "image" }],
};
const api = {
  ...original.prompt,
  1: { class_type: "Text", inputs: { text: "新版文字" } },
};
const canvas = { nodes: [{ id: 1, type: "Text", pos: [200, 100] }] };
const cloned = (value) => structuredClone(value);

async function mount(t, options = {}) {
  const dom = new JSDOM("<div id='root'></div>", {
    url: "http://localhost/settings",
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const state = {
    workflows: [cloned(original)],
    calls: [],
    preview: null,
    ...options,
  };
  state.api = async (method, url, payload) => {
    state.calls.push({ method, url, payload: payload && cloned(payload) });
    if (state.intercept) {
      const result = await state.intercept(method, url, payload);
      if (result !== undefined) return result;
    }
    if (method === "get" && url.endsWith("/servers")) return { servers: [] };
    if (method === "get" && url.endsWith("/workflows"))
      return { workflows: cloned(state.workflows) };
    if (method === "get")
      return {
        workflow: cloned(
          state.workflows.find((entry) => url.endsWith(entry.id)),
        ),
      };
    if (url.endsWith("/reimport")) {
      const value = state.preview || {
        workflow: {
          ...cloned(original),
          prompt: payload.workflow,
          uiWorkflow: payload.uiWorkflow,
          bindings: payload.bindings,
          outputBindings: payload.outputBindings,
        },
        reconciliation: {
          retainedInputs: payload.bindings,
          retainedOutputs: payload.outputBindings,
          removedInputs: [],
          removedOutputs: [],
          requiresOutput: false,
        },
      };
      return cloned(value);
    }
    if (url.endsWith("/copy")) {
      const workflow = {
        ...cloned(original),
        id: "workflow-copy",
        revision: 1,
        name: "text-to-image-copy",
        title: "提示词生成图片（副本）",
      };
      state.workflows.push(workflow);
      return { workflow: cloned(workflow) };
    }
    if (method === "put") {
      const id = url.split("/").at(-1);
      const index = state.workflows.findIndex((entry) => entry.id === id);
      state.workflows[index] = {
        ...state.workflows[index],
        ...cloned(payload),
        prompt: payload.workflow,
        revision: payload.revision + 1,
      };
      return { workflow: cloned(state.workflows[index]) };
    }
    throw new Error(`Unexpected ${method} ${url}`);
  };
  globalThis.__comfySettings = state;
  const root = createRoot(document.getElementById("root"));
  t.after(async () => {
    await act(async () => root.unmount());
    dom.window.close();
    delete globalThis.__comfySettings;
  });
  await act(async () => root.render(React.createElement(Settings, {})));
  const button = (label) => {
    const buttons = [...document.querySelectorAll("button")];
    return (
      buttons.find((item) => item.getAttribute("aria-label") === label) ||
      [...document.querySelectorAll("[data-dialog] button")].find(
        (item) => item.textContent.trim() === label,
      ) ||
      buttons.find((item) => item.textContent.trim() === label)
    );
  };
  const click = async (label) => {
    const element = button(label);
    assert.ok(element, `missing button ${label}`);
    await act(async () => element.click());
  };
  const upload = async (files) => {
    const input = document.querySelector("input[type=file][multiple]");
    assert.ok(input);
    Object.defineProperty(input, "files", {
      configurable: true,
      value: files.map(([name, value, size = 500]) => ({
        name,
        size,
        text: async () =>
          typeof value === "string" ? value : JSON.stringify(value),
      })),
    });
    await act(async () =>
      input.dispatchEvent(new dom.window.Event("change", { bubbles: true })),
    );
  };
  return {
    state,
    button,
    click,
    upload,
    text: () => document.body.textContent,
  };
}

test("update button previews uploaded API/canvas while keeping shared targets, notes and random defaults until explicit save", async (t) => {
  const ui = await mount(t);
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([
    ["api.json", api],
    ["canvas.json", canvas],
  ]);
  await ui.click("预览工作流更新");
  const request = ui.state.calls.find((call) => call.url.endsWith("/reimport"));
  assert.deepEqual(request.payload.workflow, api);
  assert.deepEqual(request.payload.uiWorkflow, canvas);
  assert.deepEqual(request.payload.previousPrompt, original.prompt);
  assert.equal(request.payload.revision, original.revision);
  assert.deepEqual(request.payload.bindings, original.bindings);
  assert.match(ui.text(), /尚未保存/);
  assert.equal(
    ui.state.calls.some((call) => call.method === "put"),
    false,
  );
  assert.equal(ui.state.workflows[0].prompt[1].inputs.text, "旧文字");
  await ui.click("保存模板");
  const saved = ui.state.calls.find((call) => call.method === "put");
  assert.equal(saved.url, "/comfyui/workflows/workflow-1");
  assert.equal(saved.payload.notes, original.notes);
  assert.equal(saved.payload.description, original.description);
  assert.equal(saved.payload.name, original.name);
  assert.deepEqual(saved.payload.bindings, original.bindings);
  assert.deepEqual(saved.payload.outputBindings, original.outputBindings);
});

test("canceling an uploaded preview never updates the saved workflow", async (t) => {
  const ui = await mount(t);
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([["api.json", api]]);
  await ui.click("预览工作流更新");
  await ui.click("取消");
  assert.equal(
    ui.state.calls.some((call) => call.method === "put"),
    false,
  );
  assert.equal(ui.state.workflows[0].prompt[1].inputs.text, "旧文字");
  assert.equal(document.querySelector("[data-dialog]"), null);
});

test("an existing workflow also updates from a canvas export alone", async (t) => {
  const ui = await mount(t, {
    preview: {
      workflow: { ...cloned(original), prompt: api, uiWorkflow: canvas },
      reconciliation: {
        retainedInputs: original.bindings,
        retainedOutputs: original.outputBindings,
        removedInputs: [],
        removedOutputs: [],
        requiresOutput: false,
      },
    },
  });
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([["canvas.json", canvas]]);
  await ui.click("预览工作流更新");
  const preview = ui.state.calls.find((call) => call.url.endsWith("/reimport"));
  assert.deepEqual(preview.payload.workflow, canvas);
  assert.equal(Object.hasOwn(preview.payload, "uiWorkflow"), false);
  await ui.click("保存模板");
  assert.deepEqual(
    ui.state.calls.find((call) => call.method === "put").payload.workflow,
    api,
  );
});

test("invalid mappings are named and require confirmation while a missing required output still blocks save", async (t) => {
  const ui = await mount(t, {
    preview: {
      workflow: {
        ...cloned(original),
        prompt: api,
        bindings: [],
        outputBindings: [],
      },
      reconciliation: {
        retainedInputs: [],
        retainedOutputs: [],
        removedInputs: [
          {
            name: "positive_prompt",
            label: "积极提示词",
            nodeId: "1",
            field: "text",
            reason: "字段已经变成链接",
          },
        ],
        removedOutputs: [{ nodeId: "10", kind: "image", reason: "节点已移除" }],
        requiresOutput: true,
      },
    },
  });
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([["api.json", api]]);
  await ui.click("预览工作流更新");
  assert.match(ui.text(), /字段已经变成链接/);
  assert.match(ui.text(), /节点已移除/);
  assert.equal(ui.button("保存模板").disabled, true);
  await ui.click("确认移除失效映射");
  assert.equal(ui.button("保存模板").disabled, true);
  await ui.click("重新配置映射");
  await act(async () =>
    ui.state.graphProps.onOutputsChange([{ nodeId: "10", kind: "image" }]),
  );
  await ui.click("关闭流程图");
  assert.equal(ui.button("保存模板").disabled, false);
});

test("copy creates an independent server template and subsequent save targets only the copy", async (t) => {
  const ui = await mount(t);
  await ui.click("复制工作流 提示词生成图片");
  assert.equal(
    ui.state.calls.find((call) => call.url.endsWith("/copy")).payload.revision,
    original.revision,
  );
  assert.equal(ui.state.workflows.length, 2);
  await ui.click("保存模板");
  assert.equal(
    ui.state.calls.find((call) => call.method === "put").url,
    "/comfyui/workflows/workflow-copy",
  );
  assert.deepEqual(ui.state.workflows[0], original);
});

test("file validation and stale revision errors keep the saved template unchanged", async (t) => {
  const ui = await mount(t, {
    intercept: async (method, url) => {
      if (url.endsWith("/reimport")) {
        const error = new Error("模板已被其他窗口修改");
        error.code = 409;
        throw error;
      }
    },
  });
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([["large.json", api, 11 * 1024 * 1024]]);
  assert.match(ui.text(), /不能超过 10 MB/);
  await ui.upload([["bad.json", "{"]]);
  assert.match(ui.text(), /JSON 格式不正确/);
  await ui.upload([["api.json", api]]);
  await ui.click("预览工作流更新");
  assert.match(ui.text(), /请关闭并重新打开最新模板/);
  assert.equal(
    ui.state.calls.some((call) => call.method === "put"),
    false,
  );
  assert.deepEqual(ui.state.workflows[0], original);
});

test("a second preview validates draft mappings against the previously previewed prompt", async (t) => {
  const ui = await mount(t);
  await ui.click("更新工作流 提示词生成图片");
  await ui.upload([["api.json", api]]);
  await ui.click("预览工作流更新");
  await ui.click("更新工作流");
  await ui.upload([
    [
      "next.json",
      { ...api, 3: { class_type: "Text", inputs: { text: "第三版" } } },
    ],
  ]);
  await ui.click("预览工作流更新");
  const previews = ui.state.calls.filter((call) =>
    call.url.endsWith("/reimport"),
  );
  assert.equal(previews.length, 2);
  assert.deepEqual(previews[1].payload.previousPrompt, api);
});
