import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act, createRef } from "react";
import { createRoot } from "react-dom/client";
import path from "node:path";

async function bundled(entry, outfile) {
  await build({
    entryPoints: [entry],
    bundle: true,
    packages: "external",
    jsx: "automatic",
    format: "esm",
    platform: "node",
    outfile,
    plugins: [
      {
        name: "extraction-test",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, (args) => ({
            path: args.path,
            external: true,
          }));
          builder.onResolve({ filter: /DocumentDiff\.jsx$/ }, () => ({
            path: "document-diff",
            namespace: "mock",
          }));
          builder.onResolve(
            {
              filter:
                /WorkflowDataField\.jsx$|WorkflowSourcePicker\.jsx$|\.css$/,
            },
            (args) => ({
              path: args.path.endsWith(".css") ? "css" : args.path,
              namespace: "mock",
            }),
          );
          builder.onResolve(
            { filter: /^(@\/|react-i18next$|react-router-dom$|sonner$)/ },
            (args) =>
              args.path === "@/features/knowledge/graphSettings.js" ||
              [
                "@/features/workflows/QuickTemplateRunDialog.jsx",
                "@/features/workflows/workflowApi.js",
                "@/features/workflows/workflowModel.js",
              ].includes(args.path)
                ? { path: path.resolve("src", args.path.slice(2)) }
                : { path: args.path, namespace: "mock" },
          );
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({
            loader: "jsx",
            contents:
              path === "@/lib/apiClient.js"
                ? "export default {post:(...args)=>globalThis.extractionTest.post(...args),get:(...args)=>globalThis.extractionTest.get(...args)}; export const isAuthRedirectError=()=>false;"
                : path.endsWith("WorkflowDataField.jsx")
                  ? 'export default ({label,value,onChange,disabled})=><input aria-label={label} value={typeof value==="string"?value:JSON.stringify(value)} disabled={disabled} onInput={event=>onChange(event.target.value)}/>;'
                  : path.endsWith("WorkflowSourcePicker.jsx")
                    ? "export const WorkflowSelect=({label,value,onChange,disabled,options})=><select aria-label={label} value={value} disabled={disabled} onChange={event=>onChange(event.target.value)}>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>;"
                    : path === "css"
                      ? ""
                      : path === "@/components/setting/JsonConfigEditor.jsx"
                        ? "export default ({label,value,onChange,readOnly})=><textarea aria-label={label} value={JSON.stringify(value)} readOnly={readOnly} onInput={event=>onChange(JSON.parse(event.target.value))}/>;"
                        : path === "@/components/ui/dropdown-menu"
                          ? 'import {createContext,useContext,cloneElement} from "react";const Context=createContext({});export const DropdownMenu=({open,onOpenChange,children})=><Context.Provider value={{open,onOpenChange}}>{children}</Context.Provider>;export const DropdownMenuTrigger=({children})=>{const context=useContext(Context);return cloneElement(children,{onClick:()=>context.onOpenChange(!context.open)});};export const DropdownMenuContent=({children})=>useContext(Context).open?<section role="menu">{children}</section>:null;export const DropdownMenuItem=({children,onSelect,...props})=><button role="menuitem" onClick={onSelect} {...props}>{children}</button>;export const DropdownMenuLabel=({children})=><p>{children}</p>;export const DropdownMenuSeparator=()=>null;'
                          : path === "@/features/tasks/useTaskStore.js"
                            ? "export const useTaskStore=(selector)=>selector?selector(globalThis.extractionTest.taskState):globalThis.extractionTest.taskState; useTaskStore.getState=()=>({merge:()=>{}});"
                            : path === "react-router-dom"
                              ? 'export const useNavigate=()=>globalThis.extractionTest.navigate;export const useLocation=()=>({pathname:"/knowledge",search:""});'
                              : path === "@/config.js"
                                ? 'export const BASE_BACKEND_URL="/api";export const apiEndpoint={TASKS_ENDPOINT:"/tasks"};'
                                : path === "@/context/useEventStore.jsx"
                                  ? "export const onEvent=()=>({then:()=>()=>{}});"
                                  : path === "@/lib/clientText.js"
                                    ? 'export const formatLocalTimestamp=(value)=>String(value||"");'
                                    : path === "@/lib/virtualUrl.js"
                                      ? "export const resolveResourceUrl=value=>value;"
                                    : path === "@/lib/resourceDownload.js"
                                      ? "export const downloadAttachmentResource=async()=>{};"
                                      : path === "@/components/ui/progress"
                                        ? "export const Progress=()=>null;"
                                        : path === "@/components/ui/sheet"
                                          ? "export const Sheet=({children})=><div>{children}</div>;export const SheetContent=Sheet,SheetHeader=Sheet,SheetTitle=Sheet,SheetDescription=Sheet;"
                                          : path === "@/components/ui/dialog"
                                            ? "export const Dialog=({children})=><div>{children}</div>;export const DialogContent=({showCloseButton,onInteractOutside,...props})=><section role='dialog' {...props}/>;export const DialogHeader=Dialog,DialogTitle=Dialog,DialogDescription=Dialog;"
                                            : path === "@/components/ui/input"
                                              ? "export const Input=(props)=><input {...props}/>;"
                                              : path === "document-diff"
                                                ? "export default ()=>null;"
                                                : path === "sonner"
                                                  ? "export const toast={success:(...args)=>globalThis.extractionTest.success(...args),error:(...args)=>globalThis.extractionTest.error(...args)};"
                                                  : path === "react-i18next"
                                                    ? "export const useTranslation=()=>({t:(key,options)=>options?.defaultValue||key});"
                                                    : path ===
                                                        "@/components/ui/button"
                                                      ? "export const Button=({variant,size,...props})=><button {...props}/>;"
                                                      : "export const UnifiedErrorScreen=()=>null; export const UnifiedLoadingScreen=()=>null; export const useLocalSetting=(_key,defaultValue)=>[defaultValue]; export const setLocalSetting=()=>{};",
          }));
        },
      },
    ],
  });
  return (await import(`../${outfile}?time=${Date.now()}`)).default;
}

function environment() {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/doc/doc-1",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  return dom;
}

const documentTemplate = {
  id: "template-1",
  title: "文档提取模板",
  revision: 3,
  graph: {
    version: 2,
    nodes: [{ id: "document-node", kind: "document", inputKey: "document" }],
  },
  inputFields: [
    {
      key: "document",
      kind: "document",
      title: "待提取文档",
      required: true,
      schema: { type: "object", required: ["documentId"] },
      default: { documentId: "old", revision: 4 },
    },
  ],
};
const templateCatalog = {
  nodes: [],
  builtinTemplates: [],
  permissionsDefaults: { includeSources: true },
};
function templateResponse(
  url,
  templates = [documentTemplate],
  catalog = templateCatalog,
) {
  if (url === "/tasks/workflows/templates") return { templates };
  if (url === "/tasks/workflows/catalog") return catalog;
  throw new Error(`Unexpected request ${url}`);
}
async function clickExtractTemplate(title = documentTemplate.title) {
  await act(async () =>
    document.querySelector('[aria-label="提取知识"]').click(),
  );
  assert.equal(globalThis.extractionTest.calls?.length || 0, 0);
  const option = [...document.querySelectorAll('[role="menuitem"]')].find(
    (node) => node.textContent.includes(title),
  );
  assert.ok(option, `missing template ${title}`);
  await act(async () => {
    option.click();
    await Promise.resolve();
  });
}

test("manual document extraction waits for save and does not navigate or reload automatically", async () => {
  const dom = environment();
  const calls = [],
    notices = [],
    navigations = [];
  globalThis.extractionTest = {
    get: async (url) => templateResponse(url),
    post: async (...args) => {
      calls.push(args);
      return { taskId: "task-1" };
    },
    success: (...args) => notices.push(args),
    error: () => {},
    navigate: (path) => navigations.push(path),
  };
  const Component = await bundled(
    "src/features/documents/DocumentExtractButton.jsx",
    "temp/document-extraction-test.mjs",
  );
  let saved;
  const save = new Promise((resolve) => {
    saved = resolve;
  });
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () =>
      root.render(
        React.createElement(Component, {
          documentId: "doc-1",
          conversationId: "conversation-1",
          onBeforeSubmit: () => save,
        }),
      ),
    );
    await clickExtractTemplate();
    assert.equal(calls.length, 0);
    assert.equal(document.querySelector("button").disabled, true);
    await act(async () => {
      saved();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.deepEqual(calls, [
      [
        "/document/doc-1/extract",
        {
          templateId: "template-1",
          templateRevision: 3,
          documentInputKey: "document",
          inputValues: { document: { documentId: "doc-1", revision: null } },
          title: "文档提取模板",
          permissions: { includeSources: true },
          conversationId: "conversation-1",
        },
      ],
    ]);
    assert.deepEqual(navigations, []);
    notices[0][1].action.onClick();
    assert.deepEqual(navigations, ["/tasks?taskId=task-1"]);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("template without document input is explained and never saves or submits", async () => {
  const dom = environment(),
    calls = [],
    notices = [];
  let saves = 0;
  globalThis.extractionTest = {
    calls,
    get: async (url) =>
      templateResponse(url, [
        {
          ...documentTemplate,
          title: "文本模板",
          graph: { nodes: [{ kind: "text", id: "text" }] },
          inputFields: [],
        },
      ]),
    post: async (...args) => {
      calls.push(args);
    },
    success: () => {},
    error: (...args) => notices.push(args),
    navigate: () => {},
  };
  const Component = await bundled(
    "src/features/documents/DocumentExtractButton.jsx",
    "temp/document-extraction-no-input-test.mjs",
  );
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () =>
      root.render(
        React.createElement(Component, {
          documentId: "doc-1",
          onBeforeSubmit: () => {
            saves++;
          },
        }),
      ),
    );
    await clickExtractTemplate("文本模板");
    assert.equal(saves, 0);
    assert.deepEqual(calls, []);
    assert.match(notices[0][1].description, /未包含文档输入节点/);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("failed document save prevents template submission", async () => {
  const dom = environment(),
    calls = [],
    notices = [];
  globalThis.extractionTest = {
    calls,
    get: async (url) => templateResponse(url),
    post: async (...args) => {
      calls.push(args);
    },
    success: () => {},
    error: (...args) => notices.push(args),
    navigate: () => {},
  };
  const Component = await bundled(
    "src/features/documents/DocumentExtractButton.jsx",
    "temp/document-extraction-save-failure-test.mjs",
  );
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () =>
      root.render(
        React.createElement(Component, {
          documentId: "doc-1",
          onBeforeSubmit: async () => {
            throw new Error("保存失败");
          },
        }),
      ),
    );
    await clickExtractTemplate();
    assert.deepEqual(calls, []);
    assert.match(notices[0][1].description, /保存失败/);
    assert.equal(
      document.querySelector('[aria-label="提取知识"]').disabled,
      false,
    );
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("extra required inputs open the shared form while current document and template version stay fixed", async () => {
  const dom = environment(),
    calls = [],
    notices = [];
  const template = structuredClone(documentTemplate);
  template.inputFields.push({
    key: "note",
    kind: "text",
    title: "前置提示词",
    required: true,
    schema: { type: "string" },
    default: "",
  });
  let saves = 0;
  globalThis.extractionTest = {
    calls,
    get: async (url) => templateResponse(url, [template]),
    post: async (...args) => {
      calls.push(args);
      return { task: { taskId: "new-task" } };
    },
    success: (...args) => notices.push(args),
    error: () => {},
    navigate: () => {},
  };
  const Component = await bundled(
    "src/features/documents/DocumentExtractButton.jsx",
    "temp/document-extraction-extra-input-test.mjs",
  );
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () =>
      root.render(
        React.createElement(Component, {
          documentId: "doc-1",
          onBeforeSubmit: async () => {
            saves++;
          },
        }),
      ),
    );
    await clickExtractTemplate();
    assert.match(
      document.querySelector('[role="dialog"]').textContent,
      /当前文档 · doc-1/,
    );
    assert.equal(
      document.querySelector('[aria-label="任务模板"]').disabled,
      true,
    );
    assert.equal(saves, 0);
    assert.equal(calls.length, 0);
    await act(async () => {
      const input = document.querySelector('[aria-label="前置提示词"]');
      Object.getOwnPropertyDescriptor(
        dom.window.HTMLInputElement.prototype,
        "value",
      ).set.call(input, "仅提取事实");
      input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
    });
    await act(async () =>
      [...document.querySelectorAll("button")]
        .find((node) => node.textContent.includes("创建并开始"))
        .click(),
    );
    assert.equal(saves, 1);
    assert.equal(notices.length, 1);
    assert.equal(calls[0][0], "/document/doc-1/extract");
    assert.equal(calls[0][1].templateRevision, 3);
    assert.deepEqual(calls[0][1].inputValues, {
      document: { documentId: "doc-1", revision: null },
      note: "仅提取事实",
    });
    assert.equal(document.querySelector('[role="dialog"]'), null);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("multiple document inputs show a confirmation form and preserve other document versions", async () => {
  const dom = environment(),
    calls = [];
  const template = structuredClone(documentTemplate);
  template.inputFields.push({
    ...template.inputFields[0],
    key: "reference",
    title: "参考文档",
    default: { documentId: "reference-doc", revision: 8 },
  });
  globalThis.extractionTest = {
    calls,
    get: async (url) => templateResponse(url, [template]),
    post: async (...args) => {
      calls.push(args);
      return { task: { taskId: "new-task" } };
    },
    success: () => {},
    error: () => {},
    navigate: () => {},
  };
  const Component = await bundled(
    "src/features/documents/DocumentExtractButton.jsx",
    "temp/document-extraction-multi-input-test.mjs",
  );
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () =>
      root.render(React.createElement(Component, { documentId: "doc-1" })),
    );
    await clickExtractTemplate();
    assert.equal(calls.length, 0);
    assert.match(
      document.querySelector('[aria-label="参考文档"]').value,
      /reference-doc/,
    );
    await act(async () =>
      [...document.querySelectorAll("button")]
        .find((node) => node.textContent.includes("创建并开始"))
        .click(),
    );
    assert.deepEqual(calls[0][1].inputValues.reference, {
      documentId: "reference-doc",
      revision: 8,
    });
    assert.deepEqual(calls[0][1].inputValues.document, {
      documentId: "doc-1",
      revision: null,
    });
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("Office extraction save waits for trusted iframe acknowledgement and rejects failed save", async () => {
  const dom = environment();
  const Component = await bundled(
    "src/components/editor/CollaboraOnlineEditor.jsx",
    "temp/office-extraction-save-test.mjs",
  );
  const root = createRoot(document.getElementById("root")),
    ref = createRef();
  try {
    await act(async () =>
      root.render(
        React.createElement(Component, {
          ref,
          iframeUrl: "http://localhost/office",
        }),
      ),
    );
    const frame = document.querySelector("iframe"),
      messages = [];
    frame.contentWindow.postMessage = (message, origin) =>
      messages.push({ message: JSON.parse(message), origin });
    await act(async () => frame.dispatchEvent(new dom.window.Event("load")));
    let done = false;
    const first = ref.current.save();
    assert.equal(ref.current.save(), first);
    first.then(() => {
      done = true;
    });
    assert.equal(messages[0].message.MessageId, "Action_Save");
    assert.equal(messages[0].message.Values.Notify, true);
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "https://evil.invalid",
        source: frame.contentWindow,
        data: { MessageId: "Action_Save_Resp", Values: { success: true } },
      }),
    );
    await Promise.resolve();
    assert.equal(done, false);
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "http://localhost",
        source: frame.contentWindow,
        data: { MessageId: "Action_Save_Resp", Values: { success: true } },
      }),
    );
    await first;
    assert.equal(done, true);
    const failed = ref.current.save();
    const rejection = assert.rejects(failed, /保存失败/);
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "http://localhost",
        source: frame.contentWindow,
        data: { MessageId: "Action_Save_Resp", Values: { success: false } },
      }),
    );
    await rejection;
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("task popup gets phase names from backend definitions and exposes paused task management", async () => {
  const dom = environment(),
    navigations = [];
  const task = {
    taskId: "task-1",
    revision: 1,
    kind: "knowledge.extract",
    title: "文档提取",
    status: "paused",
    stage: "extract",
    progress: 60,
    history: [{ stage: "parse", time: "2026-10-11" }],
  };
  globalThis.extractionTest = {
    navigate: (value) => navigations.push(value),
    get: async (url) =>
      url.endsWith("/definitions")
        ? {
            definitions: [
              {
                kind: "knowledge.extract",
                stages: [
                  { key: "parse", name: "解析文档" },
                  { key: "extract", name: "知识提取" },
                ],
                capabilities: { resume: true },
              },
            ],
          }
        : url === "/tasks"
          ? { tasks: [task] }
          : task,
    taskState: {
      tasks: { "task-1": task },
      open: true,
      selectedId: null,
      setOpen: () => {},
      show: () => {},
      merge: () => {},
    },
  };
  const Component = await bundled(
    "src/features/tasks/TaskCenter.jsx",
    "temp/task-management-popup-test.mjs",
  );
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () => {
      root.render(React.createElement(Component));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    assert.match(document.body.textContent, /已暂停/);
    assert.match(document.body.textContent, /知识提取/);
    assert.doesNotMatch(
      document.body.textContent,
      /taskCenter\.extract|taskCenter\.parse/,
    );
    await act(async () =>
      [...document.querySelectorAll("button")]
        .find((node) => node.textContent.includes("查看任务详情"))
        .click(),
    );
    assert.deepEqual(navigations, ["/tasks?taskId=task-1"]);
    assert.ok(
      [...document.querySelectorAll("button")].some(
        (node) => node.textContent === "继续",
      ),
    );
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("source history selects captured commit rather than latest document version", async () => {
  const dom = environment(),
    calls = [];
  const commit = "a".repeat(40),
    latest = "b".repeat(40);
  globalThis.extractionTest = {
    get: async (url) => {
      calls.push(url);
      return url.endsWith("/history")
        ? [{ commit: latest }, { commit }]
        : { commit, content: "captured source" };
    },
    error: () => {},
  };
  const Component = await bundled(
      "src/features/documents/DocumentHistory.jsx",
      "temp/knowledge-source-history-test.mjs",
    ),
    root = createRoot(document.getElementById("root"));
  try {
    await act(async () => {
      root.render(
        React.createElement(Component, {
          documentId: "doc-1",
          open: true,
          initialCommit: commit,
          onOpenChange: () => {},
          currentContent: "latest content",
        }),
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.ok(calls.includes(`/document/doc-1/history/${commit}`));
    assert.ok(!calls.includes(`/document/doc-1/history/${latest}`));
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("backend page source navigation keeps safe revision metadata and checks frame origin", async () => {
  const dom = environment(),
    navigations = [];
  globalThis.extractionTest = {
    get: async () => ({}),
    post: async (url, body) => {
      assert.equal(url, "/client/frame-session");
      assert.deepEqual(body, { path: "/knowledge/page", clientOrigin: "http://localhost" });
      return { pageTicket: "page-ticket", resourceTicket: "resource-ticket" };
    },
    navigate: (value) => navigations.push(value),
  };
  const Component = await bundled(
      "src/features/tasks/BackendManagementPage.jsx",
      "temp/management-page-wrapper-test.mjs",
    ),
    root = createRoot(document.getElementById("root"));
  try {
    await act(async () => {
      root.render(React.createElement(Component, { kind: "knowledge" }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const frame = document.querySelector("iframe"),
      payload = {
        type: "cwm.open-source",
        clientChannel: new URL(frame.src).searchParams.get("client_channel"),
        documentId: "doc-1",
        sourceCommit: "c".repeat(40),
        sourceRevision: 7,
      };
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "https://evil.invalid",
        source: frame.contentWindow,
        data: payload,
      }),
    );
    assert.deepEqual(navigations, []);
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "http://localhost",
        source: window,
        data: payload,
      }),
    );
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "http://localhost",
        source: frame.contentWindow,
        data: { ...payload, clientChannel: "another-frame" },
      }),
    );
    assert.deepEqual(navigations, []);
    window.dispatchEvent(
      new dom.window.MessageEvent("message", {
        origin: "http://localhost",
        source: frame.contentWindow,
        data: payload,
      }),
    );
    assert.deepEqual(navigations, [
      `/doc/doc-1?sourceCommit=${"c".repeat(40)}&sourceRevision=7`,
    ]);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});
