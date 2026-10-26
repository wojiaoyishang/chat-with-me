import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const catalog = {
  defaultTitle: "知识提取工作流",
  categories: [
    { id: "source", title: "输入数据" },
    { id: "process", title: "处理节点" },
    { id: "sink", title: "输出节点" },
  ],
  settingsDefaults: { maxConcurrency: 4, commonConfig: { modelId: "" } },
  settingsSchema: {
    type: "object",
    properties: {
      maxConcurrency: {
        type: "integer",
        title: "同时运行的节点数",
        minimum: 1,
        maximum: 16,
      },
      commonConfig: {
        type: "object",
        properties: {
          modelId: { type: "string", ui: { widget: "model-picker" } },
        },
      },
    },
  },
  permissionsDefaults: { sharingMembers: [], includeSources: true },
  permissionsSchema: {
    type: "object",
    properties: {
      sharingMembers: {
        type: "array",
        items: {
          type: "object",
          properties: { userId: { type: "integer" }, role: { type: "string" } },
        },
      },
      includeSources: { type: "boolean" },
    },
  },
  templateSharingSchema: { type: "array", items: { type: "object" } },
  nodes: [
    {
      kind: "input",
      version: 1,
      title: "输入来源",
      description: "初始化输入",
      display: {
        title: "输入来源",
        subtitle: "SourceInput",
        description: "初始化输入",
      },
      category: "source",
      source: {
        configField: null,
        required: true,
        default: { sourceType: "text", text: "" },
        valueSchema: {
          type: "object",
          ui: {
            widget: "source-picker",
            sources: [
              { value: "file", label: "上传或选择附件" },
              { value: "document", label: "选择整个文档" },
              { value: "image", label: "图片附件" },
              { value: "text", label: "文本内容" },
            ],
          },
        },
      },
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
      inputs: [
        {
          name: "value",
          type: "source-config",
          display: {
            title: "输入覆盖",
            subtitle: "value · SourceConfig",
            description: "替代来源配置",
          },
        },
      ],
      outputs: [
        {
          name: "source",
          type: "source",
          display: {
            title: "输入来源",
            subtitle: "source · SourceSnapshot",
            description: "固定的来源内容",
          },
        },
      ],
    },
    {
      kind: "extract",
      version: 1,
      effects: ["knowledge.write"],
      title: "知识提取",
      description: "提取知识",
      display: {
        title: "知识提取",
        subtitle: "KnowledgeExtractor",
        description: "提取知识",
      },
      category: "process",
      configurationWidgets: [
        {
          widget: "knowledge-schema",
          fields: ["schemaId", "schemaRevision", "schemaText"],
        },
      ],
      configSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          schemaId: { type: "string" },
          schemaText: {
            type: "string",
            display: {
              title: "本次知识 Schema",
              subtitle: "schema_text · str",
              description: "用于本次提取的 Schema",
            },
          },
          max_concurrency: {
            type: "integer",
            title: "内部并发",
            display: {
              title: "内部并发",
              subtitle: "max_concurrency · int",
              description: "模型请求的并发数",
            },
            default: 2,
            minimum: 1,
          },
          modelId: {
            type: "string",
            display: { title: "提取模型", subtitle: "modelId · str" },
            ui: { widget: "model-picker" },
          },
        },
      },
      inputs: [
        {
          name: "bundle",
          type: "bundle",
          display: {
            title: "待提取内容",
            subtitle: "bundle · ContentBundle",
            description: "用于提取的内容",
          },
        },
      ],
      outputs: [
        {
          name: "extracted",
          type: "extracted",
          display: {
            title: "提取结果",
            subtitle: "extracted · ExtractedKnowledge",
            description: "提取的知识结果",
          },
        },
      ],
    },
    {
      kind: "text",
      version: 1,
      title: "文本数据",
      display: {
        title: "文本数据",
        subtitle: "TextInput",
        description: "提供文本输入",
      },
      category: "source",
      configSchema: {
        type: "object",
        properties: { value: { type: "string", default: "" } },
      },
      source: {
        configField: "value",
        valueSchema: { type: "string" },
        default: "",
        required: true,
      },
      outputs: [
        {
          name: "value",
          type: "str",
          display: {
            title: "文本",
            subtitle: "value · str",
            description: "文本输入值",
          },
        },
      ],
      inputs: [],
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

async function environment(request = {}, options = {}) {
  const fixtureTemplate = !options.empty && !options.component && !request.taskId && !request.templateId;
  if (fixtureTemplate) request = { ...request, templateId: "built-in:test-fixture" };
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/tasks",
    pretendToBeVisual: true,
  });
  for (const name of [
    "window",
    "Window",
    "document",
    "Document",
    "MutationObserver",
    "HTMLElement",
    "Element",
    "Node",
    "CustomEvent",
    "localStorage",
    "FormData",
    "File",
  ])
    globalThis[name] = dom.window[name];
  dom.window.Range.prototype.getClientRects = () => [];
  dom.window.Range.prototype.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    right: 1,
    bottom: 1,
    width: 1,
    height: 1,
  });
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
      if (url.endsWith("/catalog")) {
        const definitions = structuredClone(options.catalog || catalog);
        if (options.graph)
          definitions.standardGraph = structuredClone(options.graph);
        if (options.builtinTemplates)
          definitions.builtinTemplates = structuredClone(
            options.builtinTemplates,
          );
        if (fixtureTemplate) definitions.builtinTemplates = [...(definitions.builtinTemplates || []), {
          id: "built-in:test-fixture", title: "测试流程", graph: definitions.standardGraph,
        }];
        return definitions;
      }
      if (url === "/tasks/workflows/templates")
        return {
          templates: options.template
            ? [
                {
                  id: options.template.id,
                  title: options.template.title,
                  revision: options.template.revision,
                },
              ]
            : [],
        };
      if (url === `/tasks/workflows/templates/${options.template?.id}`) {
        if (options.templateLoadError) throw new Error("模板加载失败，请重试");
        if (options.templateDeferred)
          await new Promise((resolve) => {
            options.templateDeferred.resolve = resolve;
          });
        return {
          template: structuredClone(options.template),
          inputFields: structuredClone(options.template.inputFields),
        };
      }
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
        return structuredClone(
          options.taskDetails || {
            taskId: "existing-task",
            status: "completed",
            parameters: { graph: structuredClone(catalog.standardGraph) },
            workflowNodes: { "input-1": { status: "completed" } },
            stages: [{ key: "extract-1", status: "failed" }],
          },
        );
      if (url === "/tasks/task-1/details")
        return structuredClone(
          options.taskDetails || {
            taskId: "task-1",
            status: "completed",
            parameters: {
              graph: calls.findLast(
                (call) => call.url === "/tasks/workflows/run",
              )?.payload.graph,
            },
          },
        );
      if (url.includes("/nodes/") && url.includes("/output?")) {
        if (options.outputDeferred?.[url])
          return new Promise((resolve) => {
            options.outputDeferred[url].resolve = resolve;
          });
        return { output: [], total: 0, hasMore: false };
      }
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
      if (url === "/tasks/workflows/run") {
        if (options.runDeferred)
          await new Promise((resolve) => {
            options.runDeferred.resolve = resolve;
          });
        return {
          task: structuredClone(
            options.runTask || {
              taskId: "task-1",
              jobId: "task-1",
              status: "completed",
            },
          ),
        };
      }
      if (url === "/attachments/resolve")
        return {
          items: payload.uris.map((uri) => ({
            uri,
            id: uri.split("/").at(-1),
            type: "text",
            name: uri.endsWith("uploaded-1") ? "上传文档.md" : "附件一",
          })),
          unavailable: [],
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
  globalThis.workflowUITest = {
    api,
    fail: "",
    changes: [],
    closed: false,
    zoom: options.zoom || 1,
    fitViewCalls: [],
    taskEventListeners: new Map(),
  };
  await build({
    entryPoints: [
      options.component || "src/features/workflows/WorkflowEditor.jsx",
    ],
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
          builder.onResolve({ filter: /^test:flow-changes$/ }, () => ({
            path: path.resolve("node_modules/@xyflow/react/dist/esm/index.mjs"),
          }));
          if (options.mockTaskEvents)
            builder.onResolve(
              { filter: /^@\/context\/useEventStore\.jsx$/ },
              () => ({ path: "task-events", namespace: "mock" }),
            );
          builder.onResolve({ filter: /^@\// }, ({ path: requested }) => {
            if (
              requested.startsWith("@/lib/apiClient") ||
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
                contents = `export {applyNodeChanges} from 'test:flow-changes';export const ReactFlowProvider=({children})=>children;export const ViewportPortal=({children})=><div data-viewport-overlay>{children}</div>;export const useReactFlow=()=>({fitView:options=>{globalThis.workflowUITest.fitViewCalls.push(options);return Promise.resolve(true)},getViewport:()=>({zoom:1}),getNodes:()=>globalThis.workflowUITest.flow?.nodes||[],screenToFlowPosition:x=>globalThis.workflowUITest.screenToFlowPosition?.(x)||x});export const useViewport=()=>({zoom:globalThis.workflowUITest.zoom||1});export const useNodesInitialized=()=>true;export const useUpdateNodeInternals=()=>()=>{};export const MarkerType={ArrowClosed:'arrowclosed'};export const getBezierPath=()=>['M 0 0 C 40 0 60 100 100 100'];export const BaseEdge=({path})=><path className="react-flow__edge-path" d={path}/>;export const ReactFlow=props=>{globalThis.workflowUITest.flow=props;return <section className="react-flow" data-canvas><div className="react-flow__pane" data-blank-canvas/>{props.nodes.map(node=>{const Component=props.nodeTypes[node.type];return <div key={node.id} data-node={node.id} onClick={event=>props.onNodeClick(event,node)}><Component data={node.data} selected={node.selected}/></div>})}<svg>{props.edges.map(edge=>{const Edge=props.edgeTypes?.[edge.type];return Edge?<g key={edge.id} className={edge.className}><Edge {...edge} sourceX={0} sourceY={0} targetX={100} targetY={100}/></g>:null})}</svg>{props.children}</section>};export const Handle=()=>null;export const Background=()=>null;export const Controls=()=>null;export const Position={Left:'left',Right:'right'};`;
              else if (requested === "task-events")
                contents =
                  "export const onEvent=({event})=>({then:callback=>{const listeners=globalThis.workflowUITest.taskEventListeners;listeners.set(event,callback);return ()=>listeners.delete(event)}});";
              else if (requested.startsWith("@/lib/apiClient"))
                contents = "export default globalThis.workflowUITest.api;";
              else if (requested.endsWith("/button"))
                contents =
                  "export const Button=({variant,size,...props})=><button {...props}/>;";
              else if (requested.endsWith("/input"))
                contents =
                  "export const Input=({autoFocus,onChange,...props})=><input onChange={onChange} onInput={onChange} {...props}/>;";
              else if (requested.endsWith("/dialog"))
                contents =
                  'export const Dialog=({children})=>children;export const DialogContent=({showCloseButton,onInteractOutside,onEscapeKeyDown,...props})=><div role="dialog" {...props}/>;export const DialogHeader=props=><header {...props}/>;export const DialogTitle=props=><h2 {...props}/>;export const DialogDescription=props=><p {...props}/>;';
              else if (requested.endsWith("/select"))
                contents = `import {createContext,useContext} from 'react';const Context=createContext({});export const Select=({value,onValueChange,disabled,children})=><Context.Provider value={{value,onValueChange,disabled}}>{children}</Context.Provider>;export const SelectTrigger=props=>{const context=useContext(Context);return <span {...props} data-select-label={props['aria-label']}/>};export const SelectValue=()=>null;export const SelectContent=({children})=>{const context=useContext(Context);return <select value={context.value} disabled={context.disabled} onChange={event=>context.onValueChange(event.target.value)}>{children}</select>};export const SelectItem=({children,value})=><option value={value}>{children}</option>;`;
              else if (requested.endsWith("/popover"))
                contents =
                  "export const Popover=({children})=>children;export const PopoverTrigger=({asChild,children})=>children;export const PopoverContent=({children,sideOffset,align,onOpenAutoFocus,onCloseAutoFocus,onEscapeKeyDown,...props})=><div {...props}>{children}</div>;";
              else if (requested.endsWith("/accordion"))
                contents =
                  "export const Accordion=({children})=>children;export const AccordionItem=({children})=><section>{children}</section>;export const AccordionTrigger=({children,...props})=><button {...props}>{children}</button>;export const AccordionContent=({children,...props})=><div {...props}>{children}</div>;";
              else if (requested.endsWith("/switch"))
                contents =
                  "export const Switch=({checked,onCheckedChange,...props})=><input type='checkbox' checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;";
              else if (requested.endsWith("/checkbox"))
                contents =
                  "export const Checkbox=({checked,onCheckedChange,...props})=><input type='checkbox' checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;";
              else if (requested.endsWith("/alert-dialog"))
                contents =
                  "export const AlertDialog=({open,children})=>open?children:null;export const AlertDialogContent=({children,...props})=><section {...props}>{children}</section>;export const AlertDialogDescription=({children})=><p>{children}</p>;export const AlertDialogFooter=({children})=><footer>{children}</footer>;export const AlertDialogHeader=({children})=><header>{children}</header>;export const AlertDialogTitle=({children})=><h3>{children}</h3>;";
              else if (requested.endsWith("/dropdown-menu"))
                contents =
                  "export const DropdownMenu=({open,children})=>open?children:null;export const DropdownMenuTrigger=({children})=>children;export const DropdownMenuContent=({children})=><div>{children}</div>;export const DropdownMenuItem=({children,onSelect,...props})=><button onClick={onSelect} {...props}>{children}</button>;export const DropdownMenuLabel=({children})=><div>{children}</div>;export const DropdownMenuSeparator=()=>null;export const DropdownMenuShortcut=({children})=><small>{children}</small>;export const DropdownMenuSub=({children})=><div>{children}</div>;export const DropdownMenuSubTrigger=({children})=><button>{children}</button>;export const DropdownMenuSubContent=({children,...props})=><div {...props}>{children}</div>;export const DropdownMenuCheckboxItem=({children,checked,onCheckedChange})=><button role='menuitemcheckbox' aria-checked={checked} onClick={()=>onCheckedChange(!checked)}>{children}</button>;";
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

async function menuNode(app, title) {
  await act(() => globalThis.workflowUITest.flow.onPaneContextMenu(new app.dom.window.MouseEvent("contextmenu", { clientX: 350, clientY: 260 })));
  return [...document.querySelectorAll(".workflow-menu-node-label")].find((node) => node.firstElementChild.textContent === title)?.closest("button");
}

test("ordered content ports update the canvas, preserve links during reorder, and undo removal", async () => {
  const custom = structuredClone(catalog);
  const items = [
    { id: "before", kind: "text", title: "段落 A" },
    { id: "after", kind: "text", title: "段落 B" },
  ];
  custom.nodes.push({
    kind: "ordered_assemble",
    version: 1,
    category: "process",
    display: { title: "顺序内容编排" },
    configSchema: {
      type: "object",
      properties: { items: { type: "array", default: items } },
    },
    inputs: [],
    outputs: [{ name: "bundle", type: "content-bundle" }],
    repeatedInputs: {
      parameter: "items",
      configField: "items",
      prefix: "item_",
      maxItems: 32,
      kinds: [
        {
          kind: "text",
          type: "str",
          title: "文本",
          port: {
            type: "str",
            inlineAllowed: true,
            schema: { type: "string" },
          },
        },
      ],
    },
  });
  const graph = {
    nodes: [
      {
        id: "text-1",
        kind: "text",
        version: 1,
        config: { value: "输入段落" },
        inputs: {},
        position: { x: 0, y: 0 },
      },
      {
        id: "ordered",
        kind: "ordered_assemble",
        version: 1,
        config: { items },
        inputs: { item_after: { type: "literal", value: "尾段内容" } },
        position: { x: 300, y: 0 },
      },
    ],
    edges: [
      {
        id: "link",
        source: "text-1",
        sourcePort: "value",
        target: "ordered",
        targetPort: "item_before",
      },
    ],
  };
  const app = await environment({}, { catalog: custom, graph });
  try {
    await click(document.querySelector('[data-node="ordered"]'), app.dom);
    const inspector = document.querySelector(".workflow-inspector");
    assert.ok(inspector.querySelector(".workflow-ordered-inputs"));
    assert.equal(
      inspector.querySelector('[aria-label="节点初始化参数"]'),
      null,
    );
    await click(document.querySelector('[aria-label="上移 段落 B"]'), app.dom);
    let node = globalThis.workflowUITest.flow.nodes.find(
      (entry) => entry.id === "ordered",
    );
    assert.deepEqual(
      node.data.definition.inputs.map((port) => port.name),
      ["item_after", "item_before"],
    );
    assert.equal(
      globalThis.workflowUITest.flow.edges[0].targetHandle,
      "item_before",
    );
    const add = [...inspector.querySelectorAll("button")].find(
      (entry) => entry.textContent.trim() === "文本",
    );
    await click(add, app.dom);
    node = globalThis.workflowUITest.flow.nodes.find(
      (entry) => entry.id === "ordered",
    );
    assert.equal(node.data.definition.inputs.at(-1).name, "item_slot-1");
    assert.equal(node.data.node.inputs["item_slot-1"].type, "literal");
    await click(document.querySelector('[aria-label="删除 段落 A"]'), app.dom);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      globalThis.workflowUITest.flow.edges[0].targetHandle,
      "item_before",
    );
    await click(button("校验"), app.dom);
    const saved = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.deepEqual(
      saved.nodes[1].config.items.map((item) => item.id),
      ["after", "before", "slot-1"],
    );
    assert.equal(saved.edges[0].targetPort, "item_before");
    assert.equal(saved.nodes[1].inputs.item_after.value, "尾段内容");
  } finally {
    await app.close();
  }
});
async function click(node, dom) {
  assert.ok(node);
  await act(async () => {
    node.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

test("subgraph grouping, breadcrumb editing, serial settings and undo keep one complete root graph", async () => {
  const app = await environment();
  try {
    const selected = globalThis.workflowUITest.flow.nodes;
    await act(() =>
      globalThis.workflowUITest.flow.onSelectionChange({
        nodes: selected,
        edges: [],
      }),
    );
    await click(
      document.querySelector('[aria-label="将选中节点组合为子图"]'),
      app.dom,
    );
    let group = globalThis.workflowUITest.flow.nodes[0];
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 1);
    assert.equal(group.data.node.kind, "subgraph");
    assert.equal(
      document.querySelector(".workflow-node-state"),
      null,
      "designer does not fabricate runtime waiting/progress",
    );
    assert.match(
      document.querySelector(".workflow-subgraph-summary").textContent,
      /按依赖执行/,
    );
    assert.equal(document.querySelector(".workflow-subgraph-parallel-note"), null);
    await input(
      document.querySelector('[aria-label="子图执行方式"]'),
      "serial",
      app.dom,
      "change",
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes[0].data.node.subgraph.execution.mode,
      "serial",
    );
    await click(button("进入子图"), app.dom);
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    assert.match(
      document.querySelector('[aria-label="子图路径"]').textContent,
      /知识处理子图/,
    );
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    await input(
      document.querySelector('[aria-label="节点名称"]'),
      "子图中的提取",
      app.dom,
    );
    await click(button("校验"), app.dom);
    const root = app.calls.findLast((call) => call.url.endsWith("/validate"))
      .payload.graph;
    assert.equal(root.nodes.length, 1);
    assert.equal(
      root.nodes[0].subgraph.graph.nodes.find((node) => node.id === "extract-1")
        .name,
      "子图中的提取",
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.notEqual(
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.id === "extract-1",
      ).data.node.name,
      "子图中的提取",
    );
    await click(
      [...document.querySelectorAll('[aria-label="子图路径"] button')][0],
      app.dom,
    );
    group = globalThis.workflowUITest.flow.nodes[0];
    await act(() =>
      globalThis.workflowUITest.flow.onNodeContextMenu(
        { preventDefault() {}, clientX: 10, clientY: 10 },
        group,
      ),
    );
    await click(button("解除子图组合"), app.dom);
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes[0].data.node.kind,
      "subgraph",
    );
  } finally {
    await app.close();
  }
});

test("explicit subgraph nodes expose internal parameter pills, synchronize ports and save the current subgraph", async () => {
  const app = await environment(
    {},
    {
      graph: { version: 3, nodes: [], edges: [], settings: {}, variables: {} },
    },
  );
  try {
    const paletteButton = (title) => menuNode(app, title);
    assert.equal(
      await paletteButton("输入参数"),
      undefined,
      "root palette excludes interface constructors",
    );
    await click(await paletteButton("子图"), app.dom);
    let group = globalThis.workflowUITest.flow.nodes.find(
      (node) => node.data.kind === "subgraph",
    );
    assert.ok(group);
    await act(() => new Promise((resolve) => setTimeout(resolve, 60)));
    assert.ok(
      globalThis.workflowUITest.fitViewCalls.some(
        (request) => request.nodes?.[0]?.id === group.id,
      ),
      "a new subgraph focuses its mandatory on-card setup controls",
    );
    assert.equal(group.data.node.subgraph.initialized, false);
    assert.equal(button("进入子图"), undefined);
    assert.equal(button("保存模板"), undefined);
    assert.equal(document.querySelector('[aria-label="进入选中子图"]'), null);
    assert.ok(!document.body.textContent.includes("插入可复用子图"));
    await act(() =>
      globalThis.workflowUITest.flow.onNodeDoubleClick({}, group),
    );
    assert.equal(globalThis.workflowUITest.flow.nodes[0].id, group.id);
    await input(
      document.querySelector('[aria-label="子图创建方式"]'),
      "new",
      app.dom,
      "change",
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes[0].data.node.subgraph.initialized,
      false,
    );
    await click(button("确认新建"), app.dom);
    assert.equal(globalThis.workflowUITest.flow.nodes[0].id, group.id);
    assert.equal(
      globalThis.workflowUITest.flow.nodes[0].data.node.subgraph.initialized,
      true,
    );
    assert.ok(button("保存模板"));
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes[0].data.node.subgraph.initialized,
      false,
    );
    await click(
      document.querySelector('[aria-label="重做工作流修改"]'),
      app.dom,
    );
    await click(button("进入子图"), app.dom);
    assert.ok(await paletteButton("输入参数"));
    await click(await paletteButton("知识提取"), app.dom);
    const childId = globalThis.workflowUITest.flow.nodes.find(
      (node) => node.data.kind === "extract",
    ).id;
    const capsuleId = (direction) =>
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.data.direction === direction,
      ).id;
    await click(await paletteButton("输入参数"), app.dom);
    await act(() =>
      globalThis.workflowUITest.flow.onConnect({
        source: capsuleId("inputs"),
        sourceHandle: "value",
        target: childId,
        targetHandle: "bundle",
      }),
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) =>
        node.id.startsWith("@interface:"),
      ).type,
      "workflowInterface",
    );
    assert.equal(
      document.querySelector(".workflow-interface-node small").textContent,
      "input_1 · bundle",
    );
    await input(
      document.querySelector('[aria-label="参数名称"]'),
      "待处理资料",
      app.dom,
    );
    await act(() =>
      globalThis.workflowUITest.flow.onNodeDragStop(
        {},
        { id: capsuleId("inputs"), position: { x: -150, y: 75 } },
      ),
    );
    await click(await paletteButton("输出参数"), app.dom);
    await act(() =>
      globalThis.workflowUITest.flow.onConnect({
        source: childId,
        sourceHandle: "extracted",
        target: capsuleId("outputs"),
        targetHandle: "value",
      }),
    );
    await click(button("保存当前子图模板"), app.dom);
    const saved = app.calls.findLast(
      (call) => call.url === "/tasks/workflows/templates",
    ).payload.graph;
    assert.equal(saved.nodes.length, 1);
    assert.equal(
      saved.nodes[0].subgraph.graph.nodes.length,
      1,
      "pills are not executable child nodes",
    );
    assert.deepEqual(saved.nodes[0].subgraph.interface.inputs[0].position, {
      x: -150,
      y: 75,
    });
    assert.equal(
      saved.nodes[0].subgraph.interface.inputs[0].title,
      "待处理资料",
    );
    await click(
      [...document.querySelectorAll('[aria-label="子图路径"] button')][0],
      app.dom,
    );
    group = globalThis.workflowUITest.flow.nodes.find(
      (node) => node.data.kind === "subgraph",
    );
    assert.equal(group.data.definition.inputs[0].display.title, "待处理资料");
    assert.equal(group.data.definition.outputs[0].type, "extracted");
    assert.equal(await paletteButton("输入参数"), undefined);
  } finally {
    await app.close();
  }
});

test("copying a saved template initializes the same subgraph only after confirmation", async () => {
  const reusable = {
    id: "reusable",
    title: "已保存处理流程",
    revision: 2,
    graph: catalog.standardGraph,
  };
  const app = await environment({}, { template: reusable });
  try {
    const palette = await menuNode(app, "子图");
    await click(palette, app.dom);
    let group = globalThis.workflowUITest.flow.nodes.find(
      (node) => node.data.kind === "subgraph",
    );
    const id = group.id,
      position = group.position;
    await input(
      document.querySelector('[aria-label="子图创建方式"]'),
      "template",
      app.dom,
      "change",
    );
    assert.equal(button("确认复制").disabled, true);
    await input(
      document.querySelector('[aria-label="子图来源模板"]'),
      "reusable",
      app.dom,
      "change",
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === id).data
        .node.subgraph.graph.nodes.length,
      0,
    );
    assert.equal(
      app.calls.filter((call) => call.url.endsWith("/templates/reusable"))
        .length,
      0,
    );
    await click(button("确认复制"), app.dom);
    group = globalThis.workflowUITest.flow.nodes.find((node) => node.id === id);
    assert.equal(
      globalThis.workflowUITest.flow.nodes.length,
      3,
      "does not add another outer node",
    );
    assert.deepEqual(group.position, position);
    assert.equal(group.data.node.subgraph.initialized, true);
    assert.equal(group.data.node.subgraph.graph.nodes.length, 2);
    assert.deepEqual(group.data.node.subgraph.origin, {
      templateId: "reusable",
      revision: 2,
    });
    assert.ok(button("进入子图"));
    await click(button("保存模板"), app.dom);
    assert.equal(
      app.calls.findLast((call) => call.url === "/tasks/workflows/templates")
        .payload.graph.nodes[0].id,
      id,
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === id).data
        .node.subgraph.initialized,
      false,
    );
  } finally {
    await app.close();
  }
});

test("failed subgraph template loading keeps the pending node available for retry", async () => {
  const reusable = {
    id: "reusable",
    title: "模板",
    revision: 1,
    graph: catalog.standardGraph,
  };
  const app = await environment(
    {},
    { template: reusable, templateLoadError: true },
  );
  try {
    await click(
      await menuNode(app, "子图"),
      app.dom,
    );
    const pending = globalThis.workflowUITest.flow.nodes.at(-1).data.node;
    await input(
      document.querySelector('[aria-label="子图创建方式"]'),
      "template",
      app.dom,
      "change",
    );
    await input(
      document.querySelector('[aria-label="子图来源模板"]'),
      "reusable",
      app.dom,
      "change",
    );
    await click(button("确认复制"), app.dom);
    assert.match(document.body.textContent, /模板加载失败/);
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes.at(-1).data.node,
      pending,
    );
    assert.equal(button("进入子图"), undefined);
    assert.equal(button("确认复制").disabled, false);
  } finally {
    await app.close();
  }
});

test("default built-in template is displayed once in the three-preset selector", async () => {
  const custom = structuredClone(catalog);
  custom.standardTemplateId = "built-in:main";
  custom.standardGraphTitle = "资料知识提取";
  custom.builtinTemplates = [
    { id: "built-in:main", title: "资料知识提取", graph: custom.standardGraph },
    {
      id: "built-in:export",
      title: "知识图谱导出",
      graph: custom.standardGraph,
    },
    {
      id: "built-in:import",
      title: "知识图谱导入",
      graph: custom.standardGraph,
    },
  ];
  const app = await environment({}, { catalog: custom, empty: true });
  try {
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 0);
    assert.equal(document.querySelector(".workflow-sidebar-drawer").hidden, true);
    await click(document.querySelector('[aria-label="模板预设"]'), app.dom);
    assert.equal(document.querySelector(".workflow-sidebar-drawer").hidden, false);
    const select = document.querySelector(
      '[data-select-label="选择工作流模板"]',
    ).nextElementSibling;
    assert.deepEqual(
      [...select.options].map((option) => option.textContent),
      ["空白工作流", "资料知识提取", "知识图谱导出", "知识图谱导入"],
    );
    assert.equal(select.value, "_none");
  } finally {
    await app.close();
  }
});

test("inspector shares node identity and product state with the canvas", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.find((node) => node.kind === "extract").publicOutput = true;
  const app = await environment({}, { catalog: custom });
  try {
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    const inspector = document.querySelector(".workflow-inspector");
    const canvasNode = document.querySelector('[data-node="extract-1"]');
    assert.equal(inspector.querySelector(".workflow-node-badge").textContent, canvasNode.querySelector(".workflow-node-badge").textContent);
    assert.equal(inspector.querySelector('[aria-label="节点 ID"]').textContent, "extract-1");
    let copiedId;
    document.execCommand = () => { copiedId = document.activeElement.value; return true; };
    await click(inspector.querySelector('[aria-label="复制节点 ID"]'), app.dom);
    assert.equal(copiedId, "extract-1");
    await click(inspector.querySelector('[aria-label="收集此节点产物"]'), app.dom);
    assert.ok(inspector.querySelector(".workflow-node-badge.role-output"));
    assert.ok(canvasNode.querySelector(".workflow-node-badge.role-output"));
    assert.equal(globalThis.workflowUITest.flow.nodes.find((node) => node.id === "extract-1").data.isOutput, true);
    await click(inspector.querySelector('[aria-label="收集此节点产物"]'), app.dom);
    assert.ok(canvasNode.querySelector(".workflow-node-badge.role-process"));
  } finally { await app.close(); }
});

test("parallel overlay follows live node geometry without adding workflow nodes or saving a drag", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push({ kind: "step", category: "process", display: { title: "处理", subtitle: "Step" }, configSchema: {type:"object",properties:{}}, inputs:[{name:"in",type:"any",display:{title:"输入"}}], outputs:[{name:"out",type:"any",display:{title:"输出"}}] });
  const graph = { version:3, settings:{maxConcurrency:4}, nodes:[
    {id:"a",kind:"step",config:{},inputs:{},position:{x:0,y:140}},
    {id:"b",kind:"step",config:{},inputs:{},position:{x:320,y:0}},
    {id:"c",kind:"step",config:{},inputs:{},position:{x:320,y:300}},
    {id:"join",kind:"step",config:{},inputs:{},position:{x:640,y:140}},
  ], edges:[["a","b"],["a","c"],["b","join"],["c","join"]].map(([source,target],index)=>({id:`e${index}`,source,target,sourcePort:"out",targetPort:"in"})) };
  const app = await environment({}, { catalog:custom, graph });
  try {
    const box = document.querySelector(".workflow-parallel-region");
    assert.ok(box);
    assert.equal(box.dataset.nodeIds, "b c");
    assert.equal(box.style.left, "288px");
    assert.equal(box.style.width, "344px");
    await act(() => globalThis.workflowUITest.flow.onNodesChange([{id:"c",type:"position",position:{x:700,y:400},dragging:true}]));
    assert.equal(box.style.width, "724px");
    assert.deepEqual(globalThis.workflowUITest.flow.nodes.find((node)=>node.id==="c").data.node.position,{x:320,y:300});
    await act(() => globalThis.workflowUITest.flow.onNodesChange([{id:"c",type:"dimensions",dimensions:{width:400,height:260},setAttributes:true}]));
    assert.equal(box.style.width, "844px");
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 4);
    await click(document.querySelector('[aria-label="显示并行区域"]'), app.dom);
    assert.equal(document.querySelector(".workflow-parallel-region"),null);
  } finally { await app.close(); }
});

test("monitor summarizes active subgraph leaves and reads outputs using the compiled leaf ID", async () => {
  const graph = {
    version: 3,
    nodes: [
      {
        id: "group",
        kind: "subgraph",
        version: 1,
        name: "并行增强",
        config: {},
        inputs: {},
        position: { x: 0, y: 0 },
        subgraph: {
          graph: structuredClone(catalog.standardGraph),
          interface: { inputs: [], outputs: [], parameters: [] },
          execution: { mode: "parallel", maxConcurrency: 2 },
        },
      },
    ],
    edges: [],
  };
  const app = await environment(
    { taskId: "existing-task" },
    {
      taskDetails: {
        taskId: "existing-task",
        status: "completed",
        parameters: { graph },
        runtime: {
          workflowMetrics: {
            activeRequests: 2,
            totalRequests: 5,
            peakActiveRequests: 2,
          },
        },
        workflowNodes: {
          sg_input: {
            status: "completed",
            nodePath: ["group", "input-1"],
            namePath: ["并行增强", "来源"],
          },
          sg_extract: {
            status: "running",
            nodePath: ["group", "extract-1"],
            namePath: ["并行增强", "知识提取"],
            progressMessage: "正在处理：九月十二日的日记",
            telemetry: {
              activeRequests: 2,
              totalRequests: 5,
              phase: "external_execution",
              downloadedBytes: 2048,
            },
          },
        },
      },
    },
  );
  try {
    assert.match(
      document.querySelector(".workflow-subgraph-summary").textContent,
      /正在运行 1 个节点/,
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /九月十二日/,
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /存在连接数/,
    );
    assert.match(
      document.querySelector(".workflow-node-state").parentElement.textContent,
      /存在连接数：2/,
    );
    assert.equal(
      button("查看节点完整输出"),
      undefined,
      "group has no fabricated leaf output endpoint",
    );
    await click(button("展开子图"), app.dom);
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /远端执行/,
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /2\.0 KB/,
    );
    await click(button("查看节点完整输出"), app.dom);
    assert.ok(
      app.calls.some((call) => call.url.includes("/nodes/sg_extract/output?")),
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /并行增强 › 知识提取/,
    );
  } finally {
    await app.close();
  }
});

test("IF nodes edit declarative comparisons without exposing Python code", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push({
    kind: "condition",
    version: 1,
    category: "process",
    display: { title: "条件判断", subtitle: "IF" },
    configSchema: { type: "object", properties: {} },
    inputs: [{ name: "value", type: "any", acceptsAny: true }],
    outputs: [
      { name: "true", type: "any" },
      { name: "false", type: "any" },
    ],
  });
  const graph = {
    version: 3,
    nodes: [
      {
        id: "if",
        kind: "condition",
        version: 1,
        name: "是否处理",
        config: { match: "all", rules: [] },
        inputs: {},
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
  };
  const app = await environment({}, { catalog: custom, graph });
  try {
    await click(document.querySelector('[data-node="if"]'), app.dom);
    await click(button("添加判断规则"), app.dom);
    await input(
      document.querySelector('[aria-label="规则 1 字段路径"]'),
      "metadata.0.enabled",
      app.dom,
    );
    await input(
      document.querySelector('[aria-label="规则组合方式"]'),
      "any",
      app.dom,
      "change",
    );
    const node = globalThis.workflowUITest.flow.nodes[0].data.node;
    assert.deepEqual(node.config.rules, [
      { path: ["metadata", 0, "enabled"], operator: "exists" },
    ]);
    assert.equal(node.config.match, "any");
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /不执行代码/,
    );
    assert.equal(document.querySelector('[aria-label="节点初始化参数"]'), null);
  } finally {
    await app.close();
  }
});

test("public parameters choose distinct targets and preserve typed defaults", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push({
    kind: "parameter-test",
    version: 1,
    category: "process",
    display: { title: "处理", subtitle: "ParameterTest" },
    configSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", default: 3 },
        language: { type: "string", default: "中文" },
      },
    },
    inputs: [],
    outputs: [],
  });
  const inner = {
    version: 3,
    nodes: [
      {
        id: "process",
        kind: "parameter-test",
        version: 1,
        config: { limit: 3, language: "中文" },
        inputs: {},
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
  };
  const graph = {
    version: 3,
    nodes: [
      {
        id: "group",
        kind: "subgraph",
        version: 1,
        name: "参数子图",
        config: {},
        inputs: {},
        position: { x: 0, y: 0 },
        subgraph: {
          graph: inner,
          interface: { inputs: [], outputs: [], parameters: [] },
          execution: { mode: "parallel", maxConcurrency: 2 },
        },
      },
    ],
    edges: [],
  };
  const app = await environment({}, { catalog: custom, graph });
  try {
    await click(document.querySelector('[data-node="group"]'), app.dom);
    await click(button("公开内部参数"), app.dom);
    const select = document.querySelector('[aria-label="参数 1 目标 1"]');
    await input(select, "process\u0000language", app.dom, "change");
    let group = globalThis.workflowUITest.flow.nodes[0].data.node;
    assert.equal(
      group.subgraph.interface.parameters[0].targets[0].field,
      "language",
    );
    assert.equal(group.subgraph.interface.parameters[0].default, "中文");
    await click(button("公开内部参数"), app.dom);
    group = globalThis.workflowUITest.flow.nodes[0].data.node;
    assert.deepEqual(
      group.subgraph.interface.parameters.map(
        (parameter) => parameter.targets[0].field,
      ),
      ["language", "limit"],
    );
    assert.equal(button("公开内部参数").disabled, true);
  } finally {
    await app.close();
  }
});

test("renaming a nested public port rewires its containing subgraph interface", async () => {
  const leaf = structuredClone(catalog.standardGraph.nodes[1]);
  const inner = {
    id: "inner",
    kind: "subgraph",
    version: 1,
    name: "内部",
    config: {},
    inputs: {},
    position: { x: 0, y: 0 },
    subgraph: {
      graph: { version: 3, nodes: [leaf], edges: [] },
      interface: {
        inputs: [
          {
            id: "content",
            name: "content",
            target: { nodeId: leaf.id, port: "bundle" },
          },
        ],
        outputs: [],
        parameters: [],
      },
      execution: { mode: "parallel", maxConcurrency: 2 },
    },
  };
  const graph = {
    version: 3,
    nodes: [
      {
        id: "outer",
        kind: "subgraph",
        version: 1,
        name: "外部",
        config: {},
        inputs: {},
        position: { x: 0, y: 0 },
        subgraph: {
          graph: { version: 3, nodes: [inner], edges: [] },
          interface: {
            inputs: [
              {
                id: "root_content",
                name: "root_content",
                target: { nodeId: "inner", port: "content" },
              },
            ],
            outputs: [],
            parameters: [],
          },
          execution: { mode: "parallel", maxConcurrency: 2 },
        },
      },
    ],
    edges: [],
  };
  const app = await environment({}, { graph });
  try {
    await click(button("进入子图"), app.dom);
    await click(document.querySelector('[data-node="inner"]'), app.dom);
    await input(
      document.querySelector('[aria-label="输入 1 标识"]'),
      "renamed",
      app.dom,
    );
    await click(button("校验"), app.dom);
    const saved = app.calls.findLast((call) => call.url.endsWith("/validate"))
      .payload.graph;
    assert.equal(
      saved.nodes[0].subgraph.interface.inputs[0].target.port,
      "content",
    );
    assert.equal(
      saved.nodes[0].subgraph.graph.nodes[0].subgraph.interface.inputs[0].name,
      "renamed",
    );
  } finally {
    await app.close();
  }
});
async function waitForFocusedNode(id) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (
      globalThis.workflowUITest.fitViewCalls.findLast((call) => call?.nodes)
        ?.nodes?.[0]?.id === id
    )
      return;
    await act(() => new Promise((resolve) => setTimeout(resolve, 20)));
  }
  assert.equal(
    globalThis.workflowUITest.fitViewCalls.findLast((call) => call?.nodes)
      ?.nodes?.[0]?.id,
    id,
  );
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

function attachmentExpansionFixture() {
  const custom = structuredClone(catalog);
  const boolean = {
    kind: "boolean",
    version: 1,
    category: "source",
    presentation: { icon: "boolean" },
    display: { title: "布尔值", subtitle: "bool" },
    configSchema: {
      type: "object",
      properties: { value: { type: "boolean", default: false } },
    },
    source: {
      configField: "value",
      valueSchema: { type: "boolean", default: false },
      default: false,
      required: true,
    },
    inputs: [],
    outputs: [
      {
        name: "boolean",
        type: "boolean",
        display: { title: "布尔值", subtitle: "boolean · bool" },
      },
    ],
  };
  const convert = {
    kind: "content_to_text_chunks",
    version: 1,
    category: "process",
    display: { title: "内容转文本块", subtitle: "ContentToTextChunks" },
    configSchema: { type: "object", properties: {} },
    inputSchema: {
      type: "object",
      properties: {
        expand_attachment_content: { type: "boolean", default: false },
      },
    },
    inputs: [
      {
        name: "expand_attachment_content",
        type: "boolean",
        required: false,
        inlineAllowed: true,
        schema: { type: "boolean" },
        display: {
          title: "将附件解析结果写入正文",
          subtitle: "expand_attachment_content · bool",
        },
      },
    ],
    outputs: [],
  };
  custom.nodes = [boolean, convert];
  custom.standardGraph = {
    version: 2,
    nodes: [
      {
        id: "attachment-content",
        kind: "boolean",
        version: 1,
        name: "将附件解析结果写入正文",
        config: { value: false },
        inputs: {},
        position: { x: 20, y: 20 },
      },
      {
        id: "convert",
        kind: "content_to_text_chunks",
        version: 1,
        config: {},
        inputs: {},
        position: { x: 300, y: 20 },
      },
    ],
    edges: [],
    settings: { maxConcurrency: 2 },
    variables: {},
  };
  return custom;
}

test("attachment expansion boolean source can be edited, connected and replaced with an inline value", async () => {
  const custom = attachmentExpansionFixture();
  const app = await environment({}, { catalog: custom });
  const sourceSwitch = () =>
    document.querySelector(
      '[data-node="attachment-content"] input[type="checkbox"]',
    );
  const convertSwitch = () =>
    document.querySelector('[data-node="convert"] input[type="checkbox"]');
  const connect = () =>
    globalThis.workflowUITest.flow.onConnect({
      source: "attachment-content",
      sourceHandle: "boolean",
      target: "convert",
      targetHandle: "expand_attachment_content",
    });
  const openPortMenu = async () => {
    const port = document.querySelector('[data-node="convert"] .workflow-port');
    await act(() =>
      port.dispatchEvent(
        new app.dom.window.MouseEvent("contextmenu", {
          bubbles: true,
          button: 2,
          clientX: 450,
          clientY: 180,
        }),
      ),
    );
  };
  try {
    assert.equal(sourceSwitch().checked, false);
    assert.equal(convertSwitch(), null);
    await click(sourceSwitch(), app.dom);
    assert.equal(sourceSwitch().checked, true);
    await act(connect);
    await click(button("校验"), app.dom);
    const first = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.equal(first.nodes[0].config.value, true);
    assert.equal(first.edges[0].targetPort, "expand_attachment_content");
    assert.equal(first.edges[0].sourcePort, "boolean");
    assert.equal(convertSwitch(), null);

    await openPortMenu();
    await click(button("在节点内填写"), app.dom);
    assert.equal(convertSwitch().checked, false);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    await click(convertSwitch(), app.dom);
    await click(button("校验"), app.dom);
    const inline = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.deepEqual(inline.nodes[1].inputs.expand_attachment_content, {
      type: "literal",
      value: true,
    });
    assert.equal(
      document.querySelector('[data-pointer="/expand_attachment_content"]'),
      null,
    );

    await act(connect);
    assert.equal(convertSwitch(), null);
    await click(sourceSwitch(), app.dom);
    await click(button("校验"), app.dom);
    const external = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.equal(external.nodes[0].config.value, false);
    assert.deepEqual(external.nodes[1].inputs, {});
    assert.equal(external.edges.length, 1);
  } finally {
    await app.close();
  }
});

test("attachment expansion quick form submits false as a valid required input and preserves boolean changes", async () => {
  const custom = attachmentExpansionFixture();
  const builtin = {
    id: "built-in:attachment-expansion",
    title: "附件解析提取",
    description: "可选择是否将附件解析结果写入正文",
    graph: custom.standardGraph,
  };
  const app = await environment(
    { templateId: builtin.id },
    {
      catalog: custom,
      builtinTemplates: [builtin],
      component: "src/features/workflows/QuickTemplateRunDialog.jsx",
    },
  );
  try {
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    const field = document.querySelector(
      'input[aria-label="将附件解析结果写入正文"]',
    );
    assert.equal(field.checked, false);
    await click(button("创建并开始"), app.dom);
    assert.equal(document.querySelector('[role="alert"]'), null);
    assert.equal(
      app.calls.filter((call) => call.url === "/tasks/workflows/run").at(-1)
        .payload.inputValues["attachment-content"],
      false,
    );

    await click(field, app.dom);
    assert.equal(field.checked, true);
    await click(button("创建并开始"), app.dom);
    const enabled = app.calls
      .filter((call) => call.url === "/tasks/workflows/run")
      .at(-1).payload;
    assert.equal(enabled.inputValues["attachment-content"], true);
    assert.equal(typeof enabled.inputValues["attachment-content"], "boolean");
    assert.equal(enabled.graph.nodes[0].config.value, false);
  } finally {
    await app.close();
  }
});

test("workflow edge animation follows the saved setting without remounting the canvas", async () => {
  const graph = structuredClone(catalog.standardGraph);
  graph.edges.push({
    id: "edge-1",
    source: "input-1",
    sourcePort: "source",
    target: "extract-1",
    targetPort: "bundle",
  });
  const app = await environment({}, { graph });
  try {
    const flow = () => globalThis.workflowUITest.flow;
    assert.ok(flow().edges.length > 0);
    assert.ok(
      flow().edges.every((edge) => edge.className.includes("is-flowing")),
    );
    assert.ok(flow().edges.every((edge) => edge.type === "workflow"));
    assert.ok(flow().edges.every((edge) => edge.data.flowing));
    assert.equal(document.querySelectorAll(".react-flow__edge-path").length, 1);
    assert.equal(document.querySelectorAll(".workflow-edge-orb").length, 1);
    assert.match(
      document.querySelector(".react-flow__edge-path").getAttribute("d"),
      /^M 0 0 C/,
    );
    assert.equal(
      document
        .querySelector(".workflow-edge-orb animateMotion")
        ?.getAttribute("path"),
      document.querySelector(".react-flow__edge-path")?.getAttribute("d"),
    );
    const originalCanvas = document.querySelector("[data-canvas]");
    const motion = document.querySelector(".workflow-edge-orb animateMotion");
    const duration = motion.getAttribute("dur");
    const begin = motion.getAttribute("begin");
    const originalRadius = Number(
      document.querySelector(".workflow-edge-orb-core").getAttribute("r"),
    );
    globalThis.workflowUITest.zoom = 2;
    await input(
      document.querySelector('[aria-label="工作流名称"]'),
      "缩放时保持动画进度",
      app.dom,
    );
    assert.equal(
      document.querySelector(".workflow-edge-orb animateMotion"),
      motion,
    );
    assert.equal(motion.getAttribute("dur"), duration);
    assert.equal(motion.getAttribute("begin"), begin);
    assert.equal(
      Number(
        document.querySelector(".workflow-edge-orb-core").getAttribute("r"),
      ),
      originalRadius / 2,
    );

    await act(async () => {
      localStorage.setItem(
        "LocalSetting",
        JSON.stringify({ WorkflowEdgeAnimation: "false" }),
      );
      window.dispatchEvent(
        new app.dom.window.CustomEvent("chat-local-setting-change", {
          detail: { key: "WorkflowEdgeAnimation", value: false },
        }),
      );
    });
    assert.ok(
      flow().edges.every((edge) => edge.className === "workflow-data-edge"),
    );
    assert.ok(flow().edges.every((edge) => !edge.data.flowing));
    assert.equal(document.querySelectorAll(".react-flow__edge-path").length, 1);
    assert.equal(document.querySelectorAll(".workflow-edge-orb").length, 0);
    assert.equal(document.querySelector("[data-canvas]"), originalCanvas);

    await act(async () => {
      localStorage.setItem(
        "LocalSetting",
        JSON.stringify({ WorkflowEdgeAnimation: "true" }),
      );
      window.dispatchEvent(
        new app.dom.window.CustomEvent("chat-local-setting-change", {
          detail: { key: "WorkflowEdgeAnimation", value: true },
        }),
      );
    });
    assert.ok(
      flow().edges.every((edge) => edge.className.includes("is-flowing")),
    );
    assert.equal(document.querySelectorAll(".react-flow__edge-path").length, 1);
    assert.equal(document.querySelectorAll(".workflow-edge-orb").length, 1);
  } finally {
    await app.close();
  }
});

test("workflow UI keeps constructor config separate, retains failed drafts, and saves/run explicit source + schema", async () => {
  const app = await environment();
  try {
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "正在配置的正文",
      app.dom,
    );
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    assert.equal(
      document.querySelector('[data-pointer="/max_concurrency"] .cje-subtitle')
        .textContent,
      "max_concurrency · int",
    );
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
      document.querySelector('[aria-label="本次知识 Schema"]'),
      "entity Person { name: string, age: int }",
      app.dom,
    );
    globalThis.workflowUITest.fail = "/tasks/workflows/validate";
    await click(button("保存模板预设"), app.dom);
    assert.match(
      document.querySelector('[role="alert"]').textContent,
      /草稿已保留/,
    );
    assert.equal(
      document.querySelector('[aria-label="本次知识 Schema"]').value,
      "entity Person { name: string, age: int }",
    );
    globalThis.workflowUITest.fail = "";
    await click(button("保存模板预设"), app.dom);
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
    await click(button("直接开始任务"), app.dom);
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

test("optional knowledge prompt connects from a text node instead of appearing in constructor settings", async () => {
  const custom = structuredClone(catalog);
  const extractor = custom.nodes.find((node) => node.kind === "extract");
  extractor.inputSchema = {
    type: "object",
    properties: {
      prompt_prefix: {
        anyOf: [{ type: "string", maxLength: 20000 }, { type: "null" }],
        default: null,
      },
    },
  };
  extractor.inputs.push({
    name: "prompt_prefix",
    type: "str",
    required: false,
    inlineAllowed: true,
    schema: { type: "string" },
    display: {
      title: "前置提示词",
      subtitle: "prompt_prefix · str",
    },
  });
  const graph = structuredClone(custom.standardGraph);
  graph.nodes.push({
    id: "text-1",
    kind: "text",
    version: 1,
    config: { value: "请优先提取人物关系" },
    inputs: {},
    position: { x: 20, y: 220 },
  });
  const app = await environment({}, { catalog: custom, graph });
  try {
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    assert.match(
      document.querySelector('[data-node="extract-1"]').textContent,
      /前置提示词/,
    );
    assert.equal(
      document.querySelector('[data-pointer="/prompt_prefix"]'),
      null,
    );
    assert.equal(
      document.querySelector('textarea[aria-label="前置提示词"]'),
      null,
    );
    await act(() =>
      globalThis.workflowUITest.flow.onConnect({
        source: "text-1",
        sourceHandle: "value",
        target: "extract-1",
        targetHandle: "prompt_prefix",
      }),
    );
    assert.ok(
      globalThis.workflowUITest.flow.edges.some(
        (edge) =>
          edge.source === "text-1" &&
          edge.sourceHandle === "value" &&
          edge.target === "extract-1" &&
          edge.targetHandle === "prompt_prefix",
      ),
    );
    const promptPort = [
      ...document.querySelectorAll('[data-node="extract-1"] .workflow-port'),
    ].find((port) => port.textContent.includes("前置提示词"));
    await act(() =>
      promptPort.dispatchEvent(
        new app.dom.window.MouseEvent("contextmenu", {
          bubbles: true,
          button: 2,
          clientX: 450,
          clientY: 180,
        }),
      ),
    );
    await click(button("在节点内填写"), app.dom);
    const inlinePrompt = document.querySelector(
      'textarea[aria-label="前置提示词"]',
    );
    assert.equal(inlinePrompt.maxLength, 20000);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    await input(inlinePrompt, "请保留原文名称", app.dom);
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.id === "extract-1",
      ).data.node.inputs.prompt_prefix.value,
      "请保留原文名称",
    );
    assert.equal(
      document.querySelector('[data-pointer="/prompt_prefix"]'),
      null,
    );
  } finally {
    await app.close();
  }
});

test("unknown workflow nodes and settings render from catalog metadata without kind switches", async () => {
  const custom = {
    ...structuredClone(catalog),
    defaultTitle: "后端定义流程",
    categories: [{ id: "custom-inputs", title: "自定义输入" }],
    settingsDefaults: { parallelism: 9 },
    settingsSchema: {
      type: "object",
      properties: {
        parallelism: { type: "integer", title: "自定义并行数", minimum: 1 },
      },
    },
    nodes: [
      {
        kind: "future-clock-input",
        version: 4,
        title: "过时节点标题不应显示",
        className: "HiddenImplementation",
        description: "过时节点描述不应显示",
        display: {
          title: "预约时间",
          subtitle: "ClockSource",
          description: "后端声明的节点说明",
        },
        category: "custom-inputs",
        configSchema: {
          type: "object",
          properties: { timestamp: { type: "integer", default: 42 } },
        },
        source: {
          configField: "timestamp",
          default: 42,
          valueSchema: { type: "integer" },
        },
        inputs: [],
        outputs: [
          {
            name: "instant",
            type: "epoch-seconds",
            title: "过时端口标题",
            typeLabel: "过时类型标签",
            display: {
              title: "时间戳",
              subtitle: "instant · int",
              description: "后端声明的端口说明",
            },
          },
        ],
      },
    ],
    standardGraph: {
      version: 2,
      nodes: [
        {
          id: "clock-1",
          kind: "future-clock-input",
          version: 4,
          config: {},
          inputs: {},
          position: { x: 20, y: 20 },
        },
      ],
      edges: [],
      settings: {},
    },
  };
  const app = await environment({}, { catalog: custom });
  try {
    await menuNode(app, "预约时间");
    assert.ok(button("自定义输入"));
    assert.match(
      document.querySelector('[data-node="clock-1"]').textContent,
      /时间戳/,
    );
    const rendered = document.querySelector('[data-node="clock-1"]');
    assert.equal(
      rendered.querySelector(".workflow-node-title strong").textContent,
      "预约时间",
    );
    assert.equal(
      rendered.querySelector(".workflow-node-id").textContent,
      "ClockSource",
    );
    assert.equal(
      rendered.querySelector(".workflow-port strong").textContent,
      "时间戳",
    );
    assert.equal(
      rendered.querySelector(".workflow-port small").textContent,
      "instant · int",
    );
    assert.equal(
      rendered.querySelector(".workflow-port span").title,
      "后端声明的端口说明",
    );
    assert.doesNotMatch(
      rendered.textContent,
      /过时|HiddenImplementation|epoch-seconds/,
    );
    const palette = await menuNode(app, "预约时间");
    assert.match(palette.title, /后端声明的节点说明/);
    assert.doesNotMatch(palette.textContent, /过时|HiddenImplementation/);
    assert.equal(document.querySelector('[aria-label="预约时间"]').value, "42");
    await input(
      document.querySelector('[aria-label="预约时间"]'),
      "108",
      app.dom,
    );
    await click(button("全局设置"), app.dom);
    assert.equal(
      document.querySelector('[aria-label="自定义并行数"]').value,
      "9",
    );
    await click(button("校验"), app.dom);
    const payload = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload;
    assert.deepEqual(payload.graph.nodes[0].config, { timestamp: 108 });
    assert.deepEqual(payload.graph.settings, { parallelism: 9 });
  } finally {
    await app.close();
  }
});

test("resource initialization selects the full document at its revision", async () => {
  const app = await environment();
  try {
    const typeSelect = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === "document"),
    );
    await input(typeSelect, "document", app.dom, "change");
    await act(() => new Promise((resolve) => setTimeout(resolve, 280)));
    await click(
      document.querySelector('[aria-label="选择 整个文档"]'),
      app.dom,
    );
    await click(button("校验"), app.dom);
    const payload = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload;
    assert.equal(payload.graph.nodes[0].config.documentId, "doc-1");
    assert.equal(payload.graph.nodes[0].config.revision, 4);
    assert.deepEqual(payload.graph.nodes[0].inputs, {});
  } finally {
    await app.close();
  }
});

test("omitted display subtitles stay absent and instance names override only the title", async () => {
  const custom = structuredClone(catalog);
  const inputDefinition = custom.nodes[0];
  delete inputDefinition.display.subtitle;
  inputDefinition.className = "ShouldNotBeInferred";
  delete inputDefinition.outputs[0].display.subtitle;
  inputDefinition.outputs[0].typeLabel = "ShouldNotBeInferredType";
  custom.standardGraph.nodes[0].name = "用户输入名";
  const app = await environment({}, { catalog: custom });
  try {
    const rendered = document.querySelector('[data-node="input-1"]');
    assert.equal(
      rendered.querySelector(".workflow-node-title strong").textContent,
      "用户输入名",
    );
    assert.equal(rendered.querySelector(".workflow-node-id"), null);
    assert.equal(rendered.querySelector(".workflow-port-output small"), null);
    assert.doesNotMatch(rendered.textContent, /ShouldNotBeInferred/);
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
    const upload = document.querySelector(
      '.workflow-source input[type="file"]',
    );
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
    assert.equal(button("定位到任务").getAttribute("aria-pressed"), "true");
    await waitForFocusedNode("extract-1");
    assert.deepEqual(
      globalThis.workflowUITest.fitViewCalls.findLast((call) => call?.nodes)
        ?.nodes,
      [{ id: "extract-1" }],
    );
    assert.deepEqual(globalThis.workflowUITest.changes, []);
  } finally {
    await app.close();
  }
});

test("monitor follows the running node by default and tracks runtime changes", async () => {
  const taskDetails = {
    taskId: "existing-task",
    status: "running",
    parameters: { graph: structuredClone(catalog.standardGraph) },
    workflowNodes: {
      "input-1": { status: "running" },
      "extract-1": { status: "queued" },
    },
  };
  const app = await environment(
    { taskId: "existing-task" },
    { taskDetails, mockTaskEvents: true },
  );
  try {
    const locate = button("定位到任务");
    assert.equal(locate?.getAttribute("aria-pressed"), "true");
    await waitForFocusedNode("input-1");
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        ?.selected,
      true,
    );

    taskDetails.workflowNodes = {
      "input-1": { status: "completed" },
      "extract-1": { status: "running" },
    };
    await act(async () => {
      globalThis.workflowUITest.taskEventListeners.get("task.changed")?.({
        payload: { taskId: "existing-task" },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await waitForFocusedNode("extract-1");
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.id === "extract-1",
      )?.selected,
      true,
    );
  } finally {
    await app.close();
  }
});

test("monitor follow stops on canvas movement or node dragging and the locate button toggles it", async () => {
  const taskDetails = {
    taskId: "existing-task",
    status: "running",
    parameters: { graph: structuredClone(catalog.standardGraph) },
    workflowNodes: {
      "input-1": { status: "running" },
      "extract-1": { status: "queued" },
    },
  };
  const app = await environment(
    { taskId: "existing-task" },
    { taskDetails, mockTaskEvents: true },
  );
  try {
    await waitForFocusedNode("input-1");
    const locate = button("定位到任务");
    const canvas = document.querySelector('[aria-label="工作流画布"]');
    await act(() =>
      canvas.dispatchEvent(
        new app.dom.window.MouseEvent("pointermove", {
          bubbles: true,
          clientX: 80,
          clientY: 50,
        }),
      ),
    );
    assert.equal(locate.getAttribute("aria-pressed"), "false");

    taskDetails.workflowNodes = {
      "input-1": { status: "completed" },
      "extract-1": { status: "running" },
    };
    await act(async () => {
      globalThis.workflowUITest.taskEventListeners.get("task.changed")?.({
        payload: { taskId: "existing-task" },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.equal(
      globalThis.workflowUITest.fitViewCalls.findLast((call) => call?.nodes)
        ?.nodes?.[0]?.id,
      "input-1",
    );

    await click(locate, app.dom);
    assert.equal(locate.getAttribute("aria-pressed"), "true");
    await waitForFocusedNode("extract-1");
    await act(() =>
      globalThis.workflowUITest.flow.onNodeDragStart?.(
        new app.dom.window.MouseEvent("mousedown", { bubbles: true }),
        globalThis.workflowUITest.flow.nodes.find(
          (node) => node.id === "extract-1",
        ),
      ),
    );
    assert.equal(locate.getAttribute("aria-pressed"), "false");

    await click(locate, app.dom);
    assert.equal(locate.getAttribute("aria-pressed"), "true");
    await act(() =>
      globalThis.workflowUITest.flow.onSelectionDragStart?.(
        new app.dom.window.MouseEvent("mousedown", { bubbles: true }),
        globalThis.workflowUITest.flow.nodes,
      ),
    );
    assert.equal(locate.getAttribute("aria-pressed"), "false");
    await click(locate, app.dom);
    assert.equal(locate.getAttribute("aria-pressed"), "true");
    await click(locate, app.dom);
    assert.equal(locate.getAttribute("aria-pressed"), "false");
  } finally {
    await app.close();
  }
});

test("task submission covers the editor until the run starts", async () => {
  const runDeferred = {};
  const app = await environment({}, { runDeferred });
  try {
    await click(button("直接开始任务"), app.dom);
    assert.match(
      document.querySelector(".workflow-submitting")?.textContent || "",
      /正在提交并启动任务/,
    );
    assert.equal(button("直接开始任务").disabled, true);
    await act(async () => {
      runDeferred.resolve();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.equal(document.querySelector(".workflow-submitting"), null);
    assert.match(
      document.querySelector(".workflow-header").textContent,
      /监控/,
    );
  } finally {
    await app.close();
  }
});

test("run monitors the execution graph and returns to the original editable draft with history", async () => {
  const executionGraph = structuredClone(catalog.standardGraph);
  executionGraph.nodes[0].config.text = "服务端固定正文";
  const scrubbedGraph = structuredClone(executionGraph);
  scrubbedGraph.nodes[0].config.text = "";
  const app = await environment(
    {},
    {
      runTask: {
        taskId: "task-1",
        status: "running",
        parameters: { graph: scrubbedGraph },
      },
      taskDetails: {
        taskId: "task-1",
        status: "running",
        parameters: { graph: executionGraph },
        workflowNodes: { "input-1": { status: "completed" } },
      },
    },
  );
  try {
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "提交前的编辑正文",
      app.dom,
    );
    const originalPosition = structuredClone(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .position,
    );
    await click(button("直接开始任务"), app.dom);
    assert.ok(document.querySelector(".workflow-workspace.is-monitor"));
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').value,
      "服务端固定正文",
    );
    assert.ok(document.querySelector('[aria-label="初始化文本"]').disabled);
    assert.ok(app.calls.some((call) => call.url === "/tasks/task-1/details"));
    await act(() =>
      globalThis.workflowUITest.flow.onNodesChange([
        {
          id: "input-1",
          type: "position",
          position: { x: 999, y: 888 },
          dragging: false,
        },
      ]),
    );
    await click(button("再次编辑"), app.dom);
    assert.equal(
      document.querySelector(".workflow-workspace.is-monitor"),
      null,
    );
    assert.match(
      document.querySelector(".workflow-header").textContent,
      /编辑工作流.*有未保存修改/,
    );
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').value,
      "提交前的编辑正文",
    );
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').disabled,
      false,
    );
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .position,
      originalPosition,
    );
    assert.ok(
      globalThis.workflowUITest.flow.nodes.every((node) => !node.data.status),
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').value,
      "原内容",
    );
    await click(
      document.querySelector('[aria-label="重做工作流修改"]'),
      app.dom,
    );
    await click(button("直接开始任务"), app.dom);
    const runs = app.calls.filter(
      (call) => call.url === "/tasks/workflows/run",
    );
    assert.equal(runs.length, 2);
    assert.equal(
      runs[1].payload.graph.nodes[0].config.text,
      "提交前的编辑正文",
    );
    assert.equal(runs[1].payload.taskId, undefined);
    assert.equal(executionGraph.nodes[0].config.text, "服务端固定正文");
  } finally {
    await app.close();
  }
});

test("reediting an existing task creates an editable copy from its authorized inputs", async () => {
  const app = await environment({ taskId: "existing-task" });
  try {
    await click(button("再次编辑"), app.dom);
    assert.equal(
      document.querySelector('[aria-label="初始化文本"]').value,
      "原内容",
    );
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "下一次任务的正文",
      app.dom,
    );
    await click(button("直接开始任务"), app.dom);
    const payload = app.calls.find(
      (call) => call.url === "/tasks/workflows/run",
    ).payload;
    assert.equal(payload.graph.nodes[0].config.text, "下一次任务的正文");
    assert.equal(payload.taskId, undefined);
    assert.equal(payload.templateId, undefined);
    assert.equal(
      app.calls.some((call) =>
        /existing-task\/(pause|resume|cancel)/.test(call.url),
      ),
      false,
    );
  } finally {
    await app.close();
  }
});

test("reediting after a run preserves the saved template revision and unsaved changes", async () => {
  const template = {
    id: "saved-edit",
    revision: 7,
    title: "可编辑模板",
    graph: structuredClone(catalog.standardGraph),
    canEdit: true,
  };
  const app = await environment({ templateId: template.id }, { template });
  try {
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "修改后的模板正文",
      app.dom,
    );
    await click(button("直接开始任务"), app.dom);
    await click(button("再次编辑"), app.dom);
    assert.match(
      document.querySelector(".workflow-header").textContent,
      /模板 v7.*有未保存修改/,
    );
    await click(button("保存模板预设"), app.dom);
    const saved = app.calls.find(
      (call) =>
        call.method === "put" &&
        call.url === "/tasks/workflows/templates/saved-edit",
    );
    assert.equal(saved.payload.revision, 7);
    assert.equal(saved.payload.graph.nodes[0].config.text, "修改后的模板正文");
  } finally {
    await app.close();
  }
});

test("monitor log page uses the full workspace and returns to centered task", async () => {
  const app = await environment({ taskId: "existing-task" });
  try {
    assert.ok(document.querySelector(".workflow-inspector .is-compact"));
    await click(button("查看全部日志"), app.dom);
    assert.ok(
      document.querySelector(".workflow-log-page .workflow-log-viewer"),
    );
    assert.equal(document.querySelector(".workflow-workspace"), null);
    // The first click turns the default follower off; the second resumes it
    // and opens the canvas from the full-screen log view.
    await click(button("定位到任务"), app.dom);
    assert.equal(button("定位到任务").getAttribute("aria-pressed"), "false");
    await click(button("定位到任务"), app.dom);
    assert.ok(document.querySelector(".workflow-workspace.is-monitor"));
    await waitForFocusedNode("extract-1");
    assert.deepEqual(
      globalThis.workflowUITest.fitViewCalls.findLast((call) => call?.nodes)
        ?.nodes,
      [{ id: "extract-1" }],
    );
  } finally {
    await app.close();
  }
});

test("monitor drag is local-only and switching nodes clears a pending output load", async () => {
  const outputUrl =
    "/tasks/workflows/tasks/existing-task/nodes/extract-1/output?offset=0&limit=20";
  const deferred = {};
  const app = await environment(
    { taskId: "existing-task" },
    { outputDeferred: { [outputUrl]: deferred } },
  );
  try {
    assert.equal(globalThis.workflowUITest.flow.nodesDraggable, true);
    assert.equal(globalThis.workflowUITest.flow.nodesConnectable, false);
    await act(() => {
      globalThis.workflowUITest.flow.onNodesChange([
        {
          id: "extract-1",
          type: "position",
          position: { x: 410, y: 210 },
          dragging: false,
        },
      ]);
    });
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes.find(
        (item) => item.id === "extract-1",
      ).position,
      { x: 410, y: 210 },
    );
    assert.doesNotMatch(
      document.querySelector(".workflow-header").textContent,
      /有未保存修改/,
    );

    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    await click(button("查看节点完整输出"), app.dom);
    assert.equal(button("查看节点完整输出").disabled, true);
    await click(document.querySelector('[data-node="input-1"]'), app.dom);
    assert.equal(button("查看节点完整输出").disabled, false);
    await act(async () => {
      deferred.resolve({ output: ["旧节点结果"], total: 1 });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.doesNotMatch(
      document.querySelector(".workflow-inspector").textContent,
      /旧节点结果/,
    );
  } finally {
    await app.close();
  }
});

test("drag updates preserve canvas measurements and JSON drafts, then commit one undo action", async () => {
  const app = await environment();
  try {
    await click(document.querySelector('[data-node="extract-1"]'), app.dom);
    const host = document.querySelector(".workflow-inspector .cwm-json-editor");
    const editor = host._cwmJsonEditor;
    await act(() => {
      editor.switchMode("json");
      editor.setDraft("{unfinished");
    });
    await act(() =>
      globalThis.workflowUITest.flow.onNodesChange([
        {
          id: "extract-1",
          type: "dimensions",
          dimensions: { width: 220, height: 100 },
        },
        {
          id: "extract-1",
          type: "position",
          position: { x: 350, y: 40 },
          dragging: true,
        },
      ]),
    );
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes.find(
        (node) => node.id === "extract-1",
      ).measured,
      { width: 220, height: 100 },
    );
    assert.equal(
      document.querySelector(".workflow-inspector .cwm-json-editor"),
      host,
    );
    assert.equal(editor.getState().draft, "{unfinished");
    assert.doesNotMatch(
      document.querySelector(".workflow-header").textContent,
      /有未保存修改/,
    );
    await act(() => {
      globalThis.workflowUITest.flow.onNodesChange([
        {
          id: "extract-1",
          type: "position",
          position: { x: 350, y: 40 },
          dragging: false,
        },
      ]);
      globalThis.workflowUITest.flow.onNodeDragStop(
        {},
        {
          id: "extract-1",
          position: { x: 350, y: 40 },
        },
      );
    });
    assert.match(
      document.querySelector(".workflow-header").textContent,
      /有未保存修改/,
    );
    assert.equal(editor.getState().draft, "{unfinished");
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    const restored = globalThis.workflowUITest.flow.nodes.find(
      (node) => node.id === "extract-1",
    );
    assert.deepEqual(restored.position, { x: 300, y: 20 });
    assert.deepEqual(restored.measured, { width: 220, height: 100 });
    assert.equal(
      document.querySelector('[aria-label="撤销工作流修改"]').disabled,
      true,
    );
    assert.equal(editor.getState().draft, "{unfinished");
    await click(button("保存模板预设"), app.dom);
    assert.match(
      document.querySelector('[role="alert"]').textContent,
      /无效的配置/,
    );
    assert.equal(
      app.calls.some(
        (call) =>
          call.url === "/tasks/workflows/templates" && call.method === "post",
      ),
      false,
    );
  } finally {
    await app.close();
  }
});

test("keyboard moves and group drag positions save without transient canvas fields", async () => {
  const app = await environment();
  try {
    await act(() =>
      globalThis.workflowUITest.flow.onNodesChange([
        {
          id: "input-1",
          type: "position",
          position: { x: 30, y: 20 },
          dragging: false,
        },
      ]),
    );
    assert.match(
      document.querySelector(".workflow-header").textContent,
      /有未保存修改/,
    );
    await act(() =>
      globalThis.workflowUITest.flow.onSelectionDragStop({}, [
        {
          id: "input-1",
          position: { x: 60, y: 50 },
          measured: { width: 220 },
          dragging: false,
        },
        {
          id: "extract-1",
          position: { x: 330, y: 50 },
          measured: { width: 220 },
          dragging: false,
        },
      ]),
    );
    await click(button("保存模板预设"), app.dom);
    const saved = app.calls.find(
      (call) =>
        call.url === "/tasks/workflows/templates" && call.method === "post",
    ).payload.graph;
    assert.deepEqual(
      saved.nodes.map((node) => node.position),
      [
        { x: 60, y: 50 },
        { x: 330, y: 50 },
      ],
    );
    assert(
      saved.nodes.every(
        (node) =>
          !Object.hasOwn(node, "measured") && !Object.hasOwn(node, "dragging"),
      ),
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes.map((node) => node.position),
      [
        { x: 30, y: 20 },
        { x: 300, y: 20 },
      ],
    );
  } finally {
    await app.close();
  }
});

test("selection reports do not overwrite a live Ctrl multiselection", async () => {
  const app = await environment();
  try {
    await act(() => {
      globalThis.workflowUITest.flow.onNodesChange([
        { id: "extract-1", type: "select", selected: true },
      ]);
      globalThis.workflowUITest.flow.onNodeClick(
        { ctrlKey: true },
        globalThis.workflowUITest.flow.nodes.find(
          (node) => node.id === "extract-1",
        ),
      );
    });
    await act(() =>
      globalThis.workflowUITest.flow.onSelectionChange({
        nodes: globalThis.workflowUITest.flow.nodes.filter(
          (node) => node.selected,
        ),
        edges: [],
      }),
    );
    assert.deepEqual(
      globalThis.workflowUITest.flow.nodes
        .filter((node) => node.selected)
        .map((node) => node.id),
      ["input-1", "extract-1"],
    );
    await act(() =>
      globalThis.workflowUITest.flow.onNodesChange([
        { id: "input-1", type: "select", selected: false },
        { id: "extract-1", type: "select", selected: false },
      ]),
    );
    await act(() =>
      globalThis.workflowUITest.flow.onSelectionChange({
        nodes: [],
        edges: [],
      }),
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.some((node) => node.selected),
      false,
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /选择节点查看说明与类初始化设置/,
    );
  } finally {
    await app.close();
  }
});

test("quick template form preserves document revision and knowledge permissions", async () => {
  const template = {
    id: "quick-template",
    title: "文档提取模板",
    description: "根据文档提取知识",
    revision: 3,
    graph: {
      version: 2,
      nodes: [
        { id: "extract", kind: "extract", version: 1, config: {}, inputs: {} },
      ],
      edges: [],
      settings: {},
    },
    inputFields: [
      {
        key: "document",
        title: "待提取文档",
        kind: "document",
        schema: {
          type: "object",
          required: ["documentId"],
          properties: { documentId: { type: "string" } },
          ui: { widget: "document-source-picker" },
        },
        required: true,
        default: { documentId: "", revision: null },
      },
      {
        key: "note",
        title: "补充说明",
        kind: "text",
        schema: { type: "string" },
        required: false,
        default: "保留上下文",
      },
    ],
  };
  const app = await environment(
    { templateId: template.id },
    {
      template,
      component: "src/features/workflows/QuickTemplateRunDialog.jsx",
    },
  );
  try {
    await act(() => new Promise((resolve) => setTimeout(resolve, 280)));
    assert.match(
      document.querySelector("[role=dialog]").textContent,
      /待提取文档/,
    );
    await click(
      document.querySelector('[aria-label="选择 整个文档"]'),
      app.dom,
    );
    assert.equal(
      document.querySelector('[aria-label="快速任务名称"]').value,
      "文档提取模板",
    );
    const permissionEditor = document.querySelector(
      "details .cwm-json-editor",
    )._cwmJsonEditor;
    await act(() => {
      permissionEditor.switchMode("json");
      permissionEditor.setDraft(
        JSON.stringify({
          sharingMembers: [{ userId: 2, role: "viewer" }],
          includeSources: false,
        }),
      );
    });
    await click(button("创建并开始"), app.dom);
    const payload = app.calls.find(
      (call) => call.url === "/tasks/workflows/run" && call.method === "post",
    ).payload;
    assert.equal(payload.templateId, template.id);
    assert.equal(payload.templateRevision, 3);
    assert.equal(payload.title, "文档提取模板");
    assert.deepEqual(payload.inputValues.document, {
      documentId: "doc-1",
      revision: 4,
    });
    assert.equal(payload.inputValues.note, "保留上下文");
    assert.deepEqual(payload.permissions, {
      sharingMembers: [{ userId: 2, role: "viewer" }],
      includeSources: false,
    });
    assert.deepEqual(globalThis.workflowUITest.changes.at(-1), {
      taskId: "task-1",
      monitor: true,
    });
  } finally {
    await app.close();
  }
});

test("built-in workflow stays selected in the editor and quick runs submit its graph", async () => {
  const builtin = {
    id: "built-in:full-text-extraction",
    title: "完整文本知识提取",
    description: "完整处理文本后写入图数据库",
    graph: {
      version: 2,
      nodes: [
        {
          id: "text-1",
          kind: "text",
          name: "待提取文本",
          version: 1,
          config: { value: "默认内容" },
          inputs: {},
          position: { x: 20, y: 20 },
        },
      ],
      edges: [],
      settings: {},
    },
  };
  const editor = await environment({}, { builtinTemplates: [builtin] });
  try {
    const selector = [...document.querySelectorAll("select")].find((node) =>
      [...node.options].some((option) => option.value === builtin.id),
    );
    assert.ok(selector);
    await input(selector, builtin.id, editor.dom, "change");
    assert.equal(selector.value, builtin.id);
    assert.equal(
      document.querySelector('[aria-label="工作流名称"]').value,
      builtin.title,
    );
    assert.ok(document.querySelector('[data-node="text-1"]'));
    await click(button("保存模板预设"), editor.dom);
    assert.equal(
      editor.calls.find(
        (call) =>
          call.method === "post" && call.url === "/tasks/workflows/templates",
      ).payload.title,
      builtin.title,
    );
  } finally {
    await editor.close();
  }
  const quick = await environment(
    { templateId: builtin.id },
    {
      builtinTemplates: [builtin],
      component: "src/features/workflows/QuickTemplateRunDialog.jsx",
    },
  );
  try {
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    assert.equal(
      document.querySelector('[aria-label="快速任务名称"]').value,
      builtin.title,
    );
    await click(button("创建并开始"), quick.dom);
    const payload = quick.calls.find(
      (call) => call.method === "post" && call.url === "/tasks/workflows/run",
    ).payload;
    assert.deepEqual(payload.graph, builtin.graph);
    assert.equal(payload.templateId, undefined);
    assert.equal(payload.inputValues["text-1"], "默认内容");
    assert.equal(payload.title, builtin.title);
    assert.deepEqual(payload.permissions, {});
  } finally {
    await quick.close();
  }
});

test("document-only workflows hide knowledge policy controls in editor and quick run", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push({
    kind: "document_export_source",
    version: 1,
    category: "source",
    effects: ["document.read", "document.export", "attachment.create"],
    display: { title: "文档导出快照" },
    configSchema: {
      type: "object",
      properties: { documentId: { type: "string", default: "doc-1" } },
    },
    inputs: [],
    outputs: [],
  });
  const graph = {
    version: 3,
    nodes: [
      {
        id: "source",
        kind: "document_export_source",
        version: 1,
        config: { documentId: "doc-1" },
        inputs: {},
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
    settings: {},
    variables: {},
  };
  const editor = await environment({}, { catalog: custom, graph });
  try {
    await click(button("全局设置"), editor.dom);
    assert.doesNotMatch(
      document.querySelector(".workflow-inspector").textContent,
      /生成知识的归属与共享/,
    );
    assert.match(
      document.querySelector(".workflow-inspector").textContent,
      /模板共享成员/,
    );
    await click(button("直接开始任务"), editor.dom);
    const run = editor.calls.find(
      (call) => call.url === "/tasks/workflows/run" && call.method === "post",
    );
    assert.deepEqual(run.payload.permissions, {});
  } finally {
    await editor.close();
  }
  const template = {
    id: "export-template",
    title: "导出文档",
    revision: 1,
    graph,
  };
  const quick = await environment(
    { templateId: template.id },
    {
      catalog: custom,
      template,
      component: "src/features/workflows/QuickTemplateRunDialog.jsx",
    },
  );
  try {
    assert.doesNotMatch(
      document.querySelector("[role=dialog]").textContent,
      /生成知识的归属与共享/,
    );
    await click(button("创建并开始"), quick.dom);
    const run = quick.calls.find(
      (call) => call.url === "/tasks/workflows/run" && call.method === "post",
    );
    assert.deepEqual(run.payload.permissions, {});
  } finally {
    await quick.close();
  }
});

test("closing a changed template uses a blocking save confirmation", async () => {
  const app = await environment();
  try {
    await input(
      document.querySelector('[aria-label="初始化文本"]'),
      "未保存的输入",
      app.dom,
    );
    await click(document.querySelector('[aria-label="关闭工作流"]'), app.dom);
    assert.equal(globalThis.workflowUITest.closed, false);
    assert.match(
      document.querySelector(".workflow-dialog").textContent,
      /保存修改后关闭/,
    );
    await click(button("继续编辑"), app.dom);
    assert.equal(globalThis.workflowUITest.closed, false);
    await click(document.querySelector('[aria-label="关闭工作流"]'), app.dom);
    globalThis.workflowUITest.fail = "/tasks/workflows/validate";
    await click(button("保存后关闭"), app.dom);
    assert.equal(globalThis.workflowUITest.closed, false);
    assert.match(
      document.querySelector(".workflow-dialog").textContent,
      /草稿已保留/,
    );
    globalThis.workflowUITest.fail = "";
    await click(button("保存后关闭"), app.dom);
    assert.equal(globalThis.workflowUITest.closed, true);
    assert.equal(
      app.calls.find(
        (call) =>
          call.url === "/tasks/workflows/templates" && call.method === "post",
      ).payload.graph.nodes[0].config.text,
      "未保存的输入",
    );
  } finally {
    await app.close();
  }
});

test("canvas keyboard copy, paste, undo, redo and save preserve native text editing", async () => {
  const app = await environment();
  const shortcut = async (key, { shift = false, target } = {}) => {
    await act(async () => {
      (target || document.querySelector(".workflow-dialog")).dispatchEvent(
        new app.dom.window.KeyboardEvent("keydown", {
          bubbles: true,
          key,
          ctrlKey: true,
          shiftKey: shift,
        }),
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };
  try {
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await shortcut("c");
    await shortcut("v");
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 3);
    await shortcut("z");
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await shortcut("z", { shift: true });
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 3);
    await shortcut("s");
    const saved = app.calls.find(
      (call) =>
        call.url === "/tasks/workflows/templates" && call.method === "post",
    ).payload.graph;
    assert.equal(saved.nodes.length, 3);
    assert.equal(
      new Set(saved.nodes.map((node) => node.id)).size,
      saved.nodes.length,
    );
  } finally {
    await app.close();
  }
});

test("deleting a right-clicked edge preserves an unrelated selected node", async () => {
  const graph = structuredClone(catalog.standardGraph);
  graph.nodes.push({
    ...structuredClone(graph.nodes[0]),
    id: "input-2",
    position: { x: 20, y: 220 },
  });
  graph.edges.push({
    id: "edge-2",
    source: "input-2",
    sourcePort: "source",
    target: "extract-1",
    targetPort: "bundle",
  });
  const app = await environment({}, { graph });
  try {
    await click(document.querySelector('[data-node="input-1"]'), app.dom);
    await act(async () => {
      globalThis.workflowUITest.flow.onEdgeContextMenu(
        new app.dom.window.MouseEvent("contextmenu", {
          bubbles: true,
          clientX: 200,
          clientY: 200,
        }),
        { id: "edge-2" },
      );
    });
    await click(button("删除Delete"), app.dom);
    await click(button("校验"), app.dom);
    const saved = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.deepEqual(
      saved.nodes.map((node) => node.id),
      ["input-1", "extract-1", "input-2"],
    );
    assert.deepEqual(saved.edges, []);
  } finally {
    await app.close();
  }
});

test("blank canvas context action and double click open pinned searchable node picker", async () => {
  const app = await environment();
  const blank = document.querySelector("[data-blank-canvas]");
  globalThis.workflowUITest.screenToFlowPosition = ({ x, y }) => ({
    x: x - 100,
    y: y - 50,
  });
  try {
    await act(() =>
      globalThis.workflowUITest.flow.onPaneContextMenu(
        new app.dom.window.MouseEvent("contextmenu", {
          clientX: 350,
          clientY: 260,
        }),
      ),
    );
    await click(button("搜索节点…"), app.dom);
    await input(
      document.querySelector('[aria-label="搜索可添加节点"]'),
      "TextInput",
      app.dom,
    );
    assert.equal(
      document.querySelectorAll(".workflow-node-picker-option").length,
      1,
    );
    await click(
      document.querySelector(".workflow-node-picker-option"),
      app.dom,
    );
    assert.deepEqual(globalThis.workflowUITest.flow.nodes.at(-1).position, {
      x: 250,
      y: 210,
    });
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await act(() =>
      blank.dispatchEvent(
        new app.dom.window.MouseEvent("dblclick", {
          bubbles: true,
          clientX: 380,
          clientY: 300,
        }),
      ),
    );
    assert.ok(document.querySelector(".workflow-node-picker"));
    await input(
      document.querySelector('[aria-label="搜索可添加节点"]'),
      "文本数据",
      app.dom,
    );
    await click(
      document.querySelector(".workflow-node-picker-option"),
      app.dom,
    );
    assert.deepEqual(globalThis.workflowUITest.flow.nodes.at(-1).position, {
      x: 280,
      y: 250,
    });
    assert.equal(globalThis.workflowUITest.flow.zoomOnDoubleClick, false);
  } finally {
    await app.close();
  }
});

test("dragging a connection to blank canvas previews before placing exact ports with one undo", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push(
    {
      kind: "source-consumer",
      version: 1,
      category: "process",
      display: { title: "资料处理", subtitle: "SourceConsumer" },
      configSchema: { type: "object", properties: {} },
      inputs: [
        {
          name: "primary",
          type: "source",
          display: { title: "主要资料", subtitle: "primary · SourceSnapshot" },
        },
        {
          name: "secondary",
          type: "source",
          display: {
            title: "备用资料",
            subtitle: "secondary · SourceSnapshot",
          },
        },
      ],
      outputs: [],
    },
    {
      kind: "bundle-source",
      version: 1,
      category: "source",
      display: { title: "内容来源", subtitle: "BundleInput" },
      configSchema: { type: "object", properties: {} },
      inputs: [],
      outputs: [
        {
          name: "content",
          type: "bundle",
          display: { title: "结构化内容", subtitle: "content · ContentBundle" },
        },
      ],
    },
  );
  const app = await environment({}, { catalog: custom, zoom: 0.5 });
  const blank = document.querySelector("[data-blank-canvas]");
  globalThis.workflowUITest.screenToFlowPosition = ({ x, y }) => ({
    x: x - 100,
    y: y - 50,
  });
  const start = (params) =>
    globalThis.workflowUITest.flow.onConnectStart(
      new app.dom.window.MouseEvent("mousedown", { clientX: 30, clientY: 30 }),
      params,
    );
  const finish = (state = {}) => {
    const event = new app.dom.window.MouseEvent("mouseup", {
      clientX: 450,
      clientY: 220,
    });
    Object.defineProperty(event, "target", { value: blank });
    globalThis.workflowUITest.flow.onConnectEnd(event, {
      isValid: false,
      ...state,
    });
  };
  try {
    await act(() => {
      start({ nodeId: "input-1", handleId: "source", handleType: "source" });
      finish();
    });
    assert.equal(
      document.querySelectorAll(".workflow-node-picker-option").length,
      2,
    );
    assert.doesNotMatch(
      document.querySelector(".workflow-node-picker-list").textContent,
      /文本数据|知识提取/,
    );
    await input(
      document.querySelector('[aria-label="搜索可添加节点"]'),
      "备用资料",
      app.dom,
    );
    await act(() =>
      document.querySelector(".workflow-node-picker-option").dispatchEvent(
        new app.dom.window.MouseEvent("click", {
          bubbles: true,
          clientX: 620,
          clientY: 350,
        }),
      ),
    );
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    assert.equal(document.querySelector(".workflow-node-picker"), null);
    assert.match(
      document.querySelector('[aria-label="待放置节点"]').textContent,
      /资料处理/,
    );
    assert.equal(
      document.querySelector('[aria-label="待放置节点"]').style.transform,
      "scale(0.5)",
    );
    assert.equal(
      document.querySelector('[aria-label="待放置节点"]').style.left,
      "584px",
    );
    assert.equal(
      document.querySelector('[aria-label="待放置节点"]').style.top,
      "338px",
    );
    await act(() =>
      blank.dispatchEvent(
        new app.dom.window.MouseEvent("pointermove", {
          bubbles: true,
          clientX: 510,
          clientY: 290,
        }),
      ),
    );
    assert.equal(
      document.querySelector('[aria-label="待放置节点"]').style.left,
      "474px",
    );
    assert.equal(
      document.querySelector('[aria-label="待放置节点"]').style.top,
      "278px",
    );
    await act(() =>
      blank.dispatchEvent(
        new app.dom.window.MouseEvent("click", {
          bubbles: true,
          button: 0,
          clientX: 510,
          clientY: 290,
        }),
      ),
    );
    assert.equal(document.querySelector('[aria-label="待放置节点"]'), null);
    assert.deepEqual(globalThis.workflowUITest.flow.nodes.at(-1).position, {
      x: 338,
      y: 216,
    });
    await click(button("校验"), app.dom);
    let saved = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.equal(saved.nodes.length, 3);
    assert.equal(saved.edges[0].targetPort, "secondary");
    assert.equal(saved.edges[0].source, "input-1");
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    assert.equal(
      document.querySelector('[aria-label="撤销工作流修改"]').disabled,
      true,
    );
    await act(() => {
      start({ nodeId: "extract-1", handleId: "bundle", handleType: "target" });
      finish();
    });
    assert.match(
      document.querySelector(".workflow-node-picker-hint").textContent,
      /新节点输出/,
    );
    await click(
      document.querySelector(".workflow-node-picker-option"),
      app.dom,
    );
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    await act(() =>
      blank.dispatchEvent(
        new app.dom.window.MouseEvent("click", {
          bubbles: true,
          button: 0,
          clientX: 560,
          clientY: 360,
        }),
      ),
    );
    await click(button("校验"), app.dom);
    saved = app.calls
      .filter((call) => call.url === "/tasks/workflows/validate")
      .at(-1).payload.graph;
    assert.equal(
      saved.nodes.find((node) => node.id === saved.edges[0].source).kind,
      "bundle-source",
    );
    assert.equal(saved.edges[0].target, "extract-1");
    assert.equal(saved.edges[0].sourcePort, "content");
  } finally {
    await app.close();
  }
});

test("right click cancels a chosen connection node without changing graph history", async () => {
  const custom = structuredClone(catalog);
  custom.nodes.push({
    kind: "bundle-source",
    version: 1,
    category: "source",
    display: { title: "内容来源", subtitle: "BundleInput" },
    configSchema: { type: "object", properties: {} },
    inputs: [],
    outputs: [
      {
        name: "content",
        type: "bundle",
        display: { title: "结构化内容", subtitle: "content · ContentBundle" },
      },
    ],
  });
  const app = await environment({}, { catalog: custom });
  const blank = document.querySelector("[data-blank-canvas]");
  try {
    await act(() =>
      globalThis.workflowUITest.flow.onNodeDragStop(null, null, [
        { id: "input-1", position: { x: 70, y: 20 } },
      ]),
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .position.x,
      70,
    );
    await act(() => {
      globalThis.workflowUITest.flow.onConnectStart(
        { clientX: 30, clientY: 30 },
        { nodeId: "extract-1", handleId: "bundle", handleType: "target" },
      );
      globalThis.workflowUITest.flow.onConnectEnd(
        { clientX: 450, clientY: 220, target: blank },
        { isValid: false },
      );
    });
    await click(
      document.querySelector(".workflow-node-picker-option"),
      app.dom,
    );
    assert.ok(document.querySelector('[aria-label="待放置节点"]'));
    assert.equal(
      document.querySelector('[aria-label="撤销工作流修改"]').disabled,
      true,
    );
    await act(() => {
      globalThis.workflowUITest.flow.onNodeDragStop(null, null, [
        { id: "input-1", position: { x: 90, y: 20 } },
      ]);
      globalThis.workflowUITest.flow.onDrop({
        preventDefault() {},
        dataTransfer: { getData: () => "bundle-source" },
        clientX: 100,
        clientY: 100,
      });
      globalThis.workflowUITest.flow.onConnect({
        source: "input-1",
        sourceHandle: "source",
        target: "extract-1",
        targetHandle: "bundle",
      });
    });
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .position.x,
      70,
    );
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    await act(() =>
      blank.dispatchEvent(
        new app.dom.window.MouseEvent("contextmenu", {
          bubbles: true,
          button: 2,
          clientX: 480,
          clientY: 250,
        }),
      ),
    );
    assert.equal(document.querySelector('[aria-label="待放置节点"]'), null);
    assert.equal(document.querySelector(".workflow-node-picker"), null);
    assert.equal(globalThis.workflowUITest.flow.nodes.length, 2);
    assert.equal(globalThis.workflowUITest.flow.edges.length, 0);
    assert.equal(
      document.querySelector('[aria-label="撤销工作流修改"]').disabled,
      false,
    );
    await click(
      document.querySelector('[aria-label="撤销工作流修改"]'),
      app.dom,
    );
    assert.equal(
      globalThis.workflowUITest.flow.nodes.find((node) => node.id === "input-1")
        .position.x,
      20,
    );
  } finally {
    await app.close();
  }
});

test("valid connections and drops on existing nodes do not open picker; monitor disallows quick add", async () => {
  const app = await environment();
  try {
    const nodeTarget = document.querySelector('[data-node="extract-1"]');
    await act(() => {
      globalThis.workflowUITest.flow.onConnectStart(
        { clientX: 0, clientY: 0 },
        { nodeId: "input-1", handleId: "source", handleType: "source" },
      );
      globalThis.workflowUITest.flow.onConnectEnd(
        { clientX: 250, clientY: 100, target: nodeTarget },
        { isValid: false, toNode: { id: "extract-1" } },
      );
    });
    assert.equal(document.querySelector(".workflow-node-picker"), null);
    await act(() => {
      globalThis.workflowUITest.flow.onConnectStart(
        { clientX: 0, clientY: 0 },
        { nodeId: "input-1", handleId: "source", handleType: "source" },
      );
      globalThis.workflowUITest.flow.onConnectEnd(
        {
          clientX: 250,
          clientY: 100,
          target: document.querySelector("[data-blank-canvas]"),
        },
        { isValid: true },
      );
    });
    assert.equal(document.querySelector(".workflow-node-picker"), null);
  } finally {
    await app.close();
  }
  const monitor = await environment({ taskId: "existing-task" });
  try {
    await act(() =>
      document.querySelector("[data-blank-canvas]").dispatchEvent(
        new monitor.dom.window.MouseEvent("dblclick", {
          bubbles: true,
          clientX: 200,
          clientY: 200,
        }),
      ),
    );
    assert.equal(document.querySelector(".workflow-node-picker"), null);
    assert.equal(globalThis.workflowUITest.flow.nodesConnectable, false);
    assert.equal(globalThis.workflowUITest.flow.zoomOnDoubleClick, true);
  } finally {
    await monitor.close();
  }
});
