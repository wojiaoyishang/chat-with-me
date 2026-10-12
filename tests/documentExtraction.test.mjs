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
            { filter: /^(@\/|react-i18next$|react-router-dom$|sonner$)/ },
            (args) => args.path === '@/features/knowledge/graphSettings.js'
              ? { path: path.resolve('src/features/knowledge/graphSettings.js') }
              : { path: args.path, namespace: "mock" },
          );
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({
            loader: "jsx",
            contents:
              path === "@/lib/apiClient.js"
                ? "export default {post:(...args)=>globalThis.extractionTest.post(...args),get:(...args)=>globalThis.extractionTest.get(...args)}; export const isAuthRedirectError=()=>false;"
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
                          : path === "@/lib/resourceDownload.js"
                            ? "export const downloadAttachmentResource=async()=>{};"
                            : path === "@/components/ui/progress"
                              ? "export const Progress=()=>null;"
                              : path === "@/components/ui/sheet"
                                ? "export const Sheet=({children})=><div>{children}</div>;export const SheetContent=Sheet,SheetHeader=Sheet,SheetTitle=Sheet,SheetDescription=Sheet;"
                                : path === "@/components/ui/dialog"
                                  ? "export const Dialog=({children})=><div>{children}</div>;export const DialogContent=Dialog,DialogHeader=Dialog,DialogTitle=Dialog;"
                                  : path === "@/components/ui/input"
                                    ? "export const Input=(props)=><input {...props}/>;"
                                    : path === "document-diff"
                                      ? "export default ()=>null;"
                                      : path === "sonner"
                                        ? "export const toast={success:(...args)=>globalThis.extractionTest.success(...args),error:(...args)=>globalThis.extractionTest.error(...args)};"
                                        : path === "react-i18next"
                                          ? "export const useTranslation=()=>({t:(key,options)=>options?.defaultValue||key});"
                                          : path === "@/components/ui/button"
                                            ? "export const Button=({variant,size,...props})=><button {...props}/>;"
                                            : "export const UnifiedErrorScreen=()=>null; export const UnifiedLoadingScreen=()=>null; export const useLocalSetting=(_key,defaultValue)=>[defaultValue];",
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

test("manual document extraction waits for save and does not navigate or reload automatically", async () => {
  const dom = environment();
  const calls = [],
    notices = [],
    navigations = [];
  globalThis.extractionTest = {
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
    await act(async () => document.querySelector("button").click());
    assert.equal(calls.length, 0);
    assert.equal(document.querySelector("button").disabled, true);
    await act(async () => {
      saved();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    assert.deepEqual(calls, [
      ["/document/doc-1/extract", { conversationId: "conversation-1" }],
    ]);
    assert.deepEqual(navigations, []);
    notices[0][1].action.onClick();
    assert.deepEqual(navigations, ["/tasks?taskId=task-1"]);
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
