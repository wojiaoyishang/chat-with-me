import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

test("document stays mounted through chat selection and dialog-related rerenders; failed opens restore navigation", async () => {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/doc/doc/chat-1",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [];
  globalThis.documentNavigationTest = {
    get: async (url) => {
      calls.push(url);
      if (url === "/document") return [];
      if (url.includes("/missing/")) throw new Error("文档不存在");
      return { editor: "office", url: "http://localhost/office" };
    },
    errors: [],
  };
  const uiNames = [
    "Button",
    "Input",
    "Dialog",
    "DialogContent",
    "DialogFooter",
    "DialogHeader",
    "DialogTitle",
    "AlertDialog",
    "AlertDialogAction",
    "AlertDialogCancel",
    "AlertDialogContent",
    "AlertDialogDescription",
    "AlertDialogFooter",
    "AlertDialogHeader",
    "AlertDialogTitle",
    "Field",
    "FieldContent",
    "FieldDescription",
    "FieldLabel",
    "FieldTitle",
    "RadioGroup",
    "RadioGroupItem",
  ];
  await build({
    entryPoints: ["src/pages/DocEditorHome.jsx"],
    bundle: true,
    packages: "external",
    jsx: "automatic",
    format: "esm",
    platform: "node",
    outfile: "temp/document-navigation-test.mjs",
    plugins: [
      {
        name: "document-ui",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, (args) => ({
            path: args.path,
            external: true,
          }));
          builder.onResolve(
            { filter: /^(@\/|react-i18next$|sonner$)/ },
            (args) => ({ path: args.path, namespace: "mock" }),
          );
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({
            loader: "jsx",
            contents:
              path === "@/lib/apiClient.js"
                ? "export default {get:(...args)=>globalThis.documentNavigationTest.get(...args)};"
                : path === "@/config.js"
                  ? 'export const apiEndpoint={DOCUMENT_ENDPOINT:"/document"};'
                  : path === "react-i18next"
                    ? "export const useTranslation=()=>({t:(key)=>key});"
                    : path === "sonner"
                      ? "export const toast={error:(error)=>globalThis.documentNavigationTest.errors.push(error)};"
                      : path === "@/context/useEventStore.jsx"
                        ? "export const onEvent=()=>({then:()=>()=>{}});"
                        : path === "@/lib/tools.jsx"
                          ? "export const UnifiedLoadingScreen=()=>null;export const fileUpload=()=>{};export const processSelectedFiles=()=>[];"
                          : path === "@/lib/virtualUrl.js"
                            ? "export const resolveResourceUrl=(url)=>url;"
                            : path === "@/pages/ChatWithEditor.jsx"
                              ? "export default ({url,conversationId})=><iframe src={url} data-conversation={conversationId}/>;"
                              : `export default ()=>null;${uiNames.map((name) => `export const ${name}=()=>null;`).join("")}`,
          }));
        },
      },
    ],
  });
  const { default: DocEditorHome } =
    await import("../temp/document-navigation-test.mjs");
  const root = createRoot(document.getElementById("root"));
  const selections = [];
  const render = async (documentId, conversationId) => {
    // Dashboard creates fresh callbacks on every render. They must not reopen the document.
    await act(async () =>
      root.render(
        React.createElement(DocEditorHome, {
          documentId,
          conversationId,
          onNewDocumentId: (id) => selections.push(id),
          onNewConversationId: () => {},
          onChatMode: () => {},
        }),
      ),
    );
  };
  try {
    await render("doc", "chat-1");
    const iframe = document.querySelector("iframe");
    assert.ok(iframe);
    await render("doc", "chat-2");
    await render("doc", "chat-2");
    assert.equal(document.querySelector("iframe"), iframe);
    assert.equal(iframe.dataset.conversation, "chat-2");
    assert.equal(
      calls.filter((url) => url === "/document/doc/editor").length,
      1,
    );
    await render("missing", "chat-2");
    assert.deepEqual(selections, [null]);
    assert.deepEqual(globalThis.documentNavigationTest.errors, ["文档不存在"]);
    assert.equal(document.querySelector("iframe"), null);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});

test("document routes retain the same identity when conversation or history-layer URL changes", async () => {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/doc/doc",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  await build({
    entryPoints: ["src/main.jsx"],
    bundle: true,
    packages: "external",
    jsx: "automatic",
    format: "esm",
    platform: "node",
    outfile: "temp/document-routes-test.mjs",
    plugins: [
      {
        name: "route-isolation",
        setup(builder) {
          builder.onResolve({ filter: /^react-router$/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve({ filter: /^react-router-dom$/ }, () => ({
            path: "router",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^react-dom\/client$/ }, () => ({
            path: "root",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^(?:@\/|\.\/)/ }, ({ path, kind }) =>
            kind === "entry-point" ? null : { path, namespace: "mock" },
          );
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({
            loader: "js",
            contents:
              path === "router"
                ? 'import {createMemoryRouter} from "react-router";export {RouterProvider,Navigate} from "react-router";export const createBrowserRouter=(routes)=>globalThis.documentRoutes=createMemoryRouter(routes,{initialEntries:["/doc/doc/chat-1"]});'
                : path === "root"
                  ? "export default {createRoot:()=>({render:()=>{}})};"
                  : "export default ()=>null;export const WebSocketProvider=()=>null;export const subscribeBrowserRoutePop=()=>()=>{};",
          }));
        },
      },
    ],
  });
  await import("../temp/document-routes-test.mjs");
  const router = globalThis.documentRoutes;
  try {
    const routeId = router.state.matches.at(-1).route.id;
    for (const url of ["/doc/doc/chat-2", "/doc/doc", "/doc"]) {
      await router.navigate(url);
      assert.equal(router.state.matches.at(-1).route.id, routeId);
    }
  } finally {
    router.dispose();
    dom.window.close();
  }
});
