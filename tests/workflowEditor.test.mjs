import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const catalog = {
  nodes: [
    {
      kind: "input",
      version: 1,
      title: "输入来源",
      description: "初始化输入",
      configSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          sourceType: { type: "string", default: "text" },
          text: { type: "string", default: "" },
          resources: { type: "array", default: [] },
          documentId: { type: "string" },
        },
      },
      inputs: [{ name: "value", type: "source-config", title: "输入覆盖" }],
      outputs: [{ name: "source", type: "source" }],
    },
    {
      kind: "extract",
      version: 1,
      title: "知识提取",
      description: "提取知识",
      configSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          schemaId: { type: "string" },
          schemaText: { type: "string" },
          max_concurrency: {
            type: "integer",
            title: "内部并发",
            default: 2,
            minimum: 1,
          },
          modelId: { type: "string" },
        },
      },
      inputs: [{ name: "bundle", type: "bundle" }],
      outputs: [{ name: "extracted", type: "extracted" }],
    },
  ],
  standardGraph: {
    version: 1,
    nodes: [
      {
        id: "input-1",
        kind: "input",
        version: 1,
        config: { sourceType: "text", text: "原内容" },
        inputs: {},
        position: { x: 20, y: 20 },
      },
      {
        id: "extract-1",
        kind: "extract",
        version: 1,
        config: { max_concurrency: 2 },
        inputs: {},
        position: { x: 300, y: 20 },
      },
    ],
    edges: [],
    settings: { maxConcurrency: 2 },
    variables: { prompt: "default" },
  },
};

async function environment(request = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/tasks",
    pretendToBeVisual: true,
  });
  for (const name of [
    "window",
    "document",
    "MutationObserver",
    "HTMLElement",
    "Element",
    "Node",
    "CustomEvent",
    "FormData",
    "File",
  ])
    globalThis[name] = dom.window[name];
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(
    dom.window,
  );
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(
    dom.window,
  );
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [];
  const api = {
    get: async (url) => {
      calls.push({ method: "get", url });
      if (url.endsWith("/catalog")) return structuredClone(catalog);
      if (url === "/tasks/workflows/templates") return { templates: [] };
      if (url === "/chat/models") return [{ id: "model-1", name: "测试模型" }];
      if (url === "/schemas/templates")
        return {
          templates: [
            {
              id: "reference",
              title: "参考图谱",
              text: "entity Person { name: string }",
            },
          ],
        };
      if (url === "/schemas") return { schemas: [] };
      if (url === "/tasks/existing-task/details")
        return {
          taskId: "existing-task",
          status: "completed",
          parameters: { graph: structuredClone(catalog.standardGraph) },
          workflowNodes: { "input-1": { status: "completed" } },
          stages: [{ key: "extract-1", status: "failed" }],
        };
      if (url.startsWith("/attachments"))
        return {
          items: [
            {
              id: "doc-1",
              title: "整个文档",
              revision: 4,
              name: "附件一",
              uri: "cwm://artifact/file-1",
            },
          ],
          total: 1,
        };
      return {};
    },
    post: async (url, payload) => {
      calls.push({
        method: "post",
        url,
        payload:
          payload instanceof dom.window.FormData
            ? payload
            : structuredClone(payload),
      });
      if (globalThis.workflowUITest.fail === url)
        throw new Error("参数验证失败，草稿已保留");
      if (url === "/tasks/workflows/templates")
        return {
          template: {
            id: "saved-1",
            title: payload.title,
            graph: payload.graph,
            revision: 1,
            canEdit: true,
          },
        };
      if (url === "/tasks/workflows/run")
        return {
          task: { taskId: "task-1", jobId: "task-1", status: "completed" },
        };
      if (url === "/upload/") return { artifactId: "uploaded-1" };
      if (url === "/schemas")
        return { id: "schema-1", ...payload, revision: 1 };
      return { valid: true };
    },
    put: async (url, payload) => {
      calls.push({ method: "put", url, payload });
      return { template: { id: "saved-1", ...payload, revision: 2 } };
    },
  };
  globalThis.workflowUITest = { api, fail: "", changes: [], closed: false };
  await build({
    entryPoints: ["src/features/workflows/WorkflowEditor.jsx"],
    outfile: "temp/workflow-editor-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "isolated-ui",
        setup(builder) {
          builder.onResolve(
            { filter: /^react(?:\/|$)/ },
            ({ path: requested }) => ({ path: requested, external: true }),
          );
          builder.onResolve({ filter: /\.css$/ }, () => ({
            path: "css",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@xyflow\/react$/ }, () => ({
            path: "flow",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@\// }, ({ path: requested }) => {
            if (
              requested === "@/lib/apiClient.js" ||
              (requested.startsWith("@/components/ui/") &&
                !requested.endsWith("MultilineEditor.jsx"))
            )
              return { path: requested, namespace: "mock" };
            return { path: path.resolve("src", requested.slice(2)) };
          });
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: requested }) => {
              let contents = "";
              if (requested === "flow")
                contents = `export const ReactFlowProvider=({children})=>children;export const useReactFlow=()=>({fitView:()=>{},screenToFlowPosition:x=>x});export const ReactFlow=props=>{globalThis.workflowUITest.flow=props;return <section data-canvas>{props.nodes.map(node=><button key={node.id} data-node={node.id} onClick={event=>props.onNodeClick(event,node)}>{node.data.definition.title}</button>)}{props.children}</section>};export const Handle=()=>null;export const Background=()=>null;export const Controls=()=>null;export const Position={Left:'left',Right:'right'};`;
              else if (requested === "@/lib/apiClient.js")
                contents = "export default globalThis.workflowUITest.api;";
              else if (requested.endsWith("/button"))
                contents =
                  "export const Button=({variant,size,...props})=><button {...props}/>;";
              else if (requested.endsWith("/input"))
                contents = "export const Input=props=><input {...props}/>;";
              else if (requested.endsWith("/dialog"))
                contents =
                  'export const Dialog=({children})=>children;export const DialogContent=({showCloseButton,onInteractOutside,onEscapeKeyDown,...props})=><div role="dialog" {...props}/>;export const DialogTitle=props=><h2 {...props}/>;export const DialogDescription=props=><p {...props}/>;';
              else if (requested.endsWith("/select"))
                contents = `import {createContext,useContext} from 'react';const Context=createContext({});export const Select=({value,onValueChange,disabled,children})=><Context.Provider value={{value,onValueChange,disabled}}>{children}</Context.Provider>;export const SelectTrigger=props=>{const context=useContext(Context);return <span {...props} data-select-label={props['aria-label']}/>};export const SelectValue=()=>null;export const SelectContent=({children})=>{const context=useContext(Context);return <select value={context.value} disabled={context.disabled} onChange={event=>context.onValueChange(event.target.value)}>{children}</select>};export const SelectItem=({children,value})=><option value={value}>{children}</option>;`;
              return { loader: "jsx", contents };
            },
          );
        },
      },
    ],
  });
  let root;
  await act(async () => {
    const { default: Editor } = await import(
      `../temp/workflow-editor-test.mjs?v=${Date.now()}`
    );
    root = createRoot(document.getElementById("root"));
    root.render(
      React.createElement(Editor, {
        onClose: () => {
          globalThis.workflowUITest.closed = true;
        },
        onChanged: (message) => globalThis.workflowUITest.changes.push(message),
        request,
      }),
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return {
    dom,
    calls,
    root,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

const button = (text) =>
  [...document.querySelectorAll("button")].find(
    (node) => node.textContent.trim() === text,
  );
async function click(node, dom) {
  assert.ok(node);
  await act(async () => {
    node.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}
async function input(node, value, dom, event = "input") {
  assert.ok(node);
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      node.tagName === "TEXTAREA"
        ? dom.window.HTMLTextAreaElement.prototype
        : node.tagName === "SELECT"
          ? dom.window.HTMLSelectElement.prototype
          : dom.window.HTMLInputElement.prototype,
      "value",
    ).set.call(node, value);
    node.dispatchEvent(new dom.window.Event(event, { bubbles: true }));
  });
}

test("workflow UI keeps constructor config separate, retains failed drafts, and saves/run explicit source + schema", async () => {
  const app = await environment();
  try {
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "正在配置的正文",
      app.dom,
    );
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    await input(
      document.querySelector('.cje-form input[aria-label="内部并发"]') ||
        document.querySelector('input[aria-label="内部并发"]'),
      "5",
      app.dom,
    );
    const schemaSelect = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === "template:reference"),
    );
    await input(schemaSelect, "template:reference", app.dom, "change");
    await input(
      document.querySelector('[aria-label="Schema 定义"]'),
      "entity Person { name: string, age: int }",
      app.dom,
    );
    globalThis.workflowUITest.fail = "/tasks/workflows/validate";
    await click(button("保存模板"), app.dom);
    assert.match(
      document.querySelector('[role="alert"]').textContent,
      /草稿已保留/,
    );
    assert.equal(
      document.querySelector('[aria-label="Schema 定义"]').value,
      "entity Person { name: string, age: int }",
    );
    globalThis.workflowUITest.fail = "";
    await click(button("保存模板"), app.dom);
    const saved = app.calls.find(
      (call) =>
        call.url === "/tasks/workflows/templates" && call.method === "post",
    ).payload.graph;
    assert.equal(saved.nodes[0].config.text, "正在配置的正文");
    assert.equal(saved.nodes[1].config.max_concurrency, 5);
    assert.equal(
      saved.nodes[1].config.schemaText,
      "entity Person { name: string, age: int }",
    );
    assert.equal(saved.nodes[1].config.schemaId, undefined);
    assert.deepEqual(saved.nodes[1].inputs, {});
    await click(button("开始任务"), app.dom);
    assert.equal(
      app.calls.find((call) => call.url === "/tasks/workflows/run").payload
        .templateRevision,
      1,
    );
    assert.deepEqual(globalThis.workflowUITest.changes.at(-1), {
      taskId: "task-1",
    });
  } finally {
    await app.close();
  }
});

test("resource initialization selects full document and invoke literal independently overrides input config", async () => {
  const app = await environment();
  try {
    const typeSelect = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === "document"),
    );
    await input(typeSelect, "document", app.dom, "change");
    await act(() => new Promise((resolve) => setTimeout(resolve, 220)));
    await click(button("整个文档"), app.dom);
    await click(button("调用变量"), app.dom);
    const bindingSelect = [...document.querySelectorAll("select")].find(
      (node) => [...node.options].some((option) => option.value === "literal"),
    );
    await input(bindingSelect, "literal", app.dom, "change");
    const literalType = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === "text"),
    );
    await input(literalType, "text", app.dom, "change");
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "invoke 覆盖内容",
      app.dom,
    );
    await click(button("校验"), app.dom);
    const payload = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload;
    assert.equal(payload.graph.nodes[0].config.documentId, "doc-1");
    assert.equal(payload.graph.nodes[0].config.revision, 4);
    assert.equal(
      payload.graph.nodes[0].inputs.value.value.text,
      "invoke 覆盖内容",
    );
    assert.equal(payload.graph.nodes[0].inputs.value.type, "literal");
  } finally {
    await app.close();
  }
});

test("uploaded files initialize resource URIs using the returned artifact ID", async () => {
  const app = await environment();
  try {
    const typeSelect = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === "file"),
    );
    await input(typeSelect, "file", app.dom, "change");
    const upload = document.querySelector('input[type="file"]');
    Object.defineProperty(upload, "files", {
      configurable: true,
      value: [
        new app.dom.window.File(["file body"], "上传文档.md", {
          type: "text/markdown",
        }),
      ],
    });
    await act(async () => {
      upload.dispatchEvent(
        new app.dom.window.Event("change", { bubbles: true }),
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.match(
      document.querySelector(".workflow-source").textContent,
      /上传文档\.md/,
    );
    await click(button("校验"), app.dom);
    const payload = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload;
    assert.deepEqual(payload.graph.nodes[0].config.resources, [
      "cwm://artifact/uploaded-1",
    ]);
    assert.deepEqual(Object.keys(payload).sort(), ["graph", "runnable"]);
    assert.equal(
      app.calls.find((call) => call.url === "/upload/").payload.get("file")
        .name,
      "上传文档.md",
    );
  } finally {
    await app.close();
  }
});

test("opening an existing task uses its immutable graph and real taskId runtime DTO", async () => {
  const app = await environment({ taskId: "existing-task" });
  try {
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').value,
      "原内容",
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /existing-task/,
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .data.status,
      "completed",
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.id === "extract-1",
      ).data.status,
      "failed",
    );
    await click(button("定位到任务"), app.dom);
    assert.deepEqual(globalThis.workflowUITest.changes.at(-1), {
      taskId: "existing-task",
    });
  } finally {
    await app.close();
  }
});
