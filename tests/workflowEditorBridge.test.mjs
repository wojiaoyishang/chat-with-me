import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

test("task editor authenticates iframe messages and refreshes task data without reloading the frame", async () => {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/tasks",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.workflowBridgeTest = {};
  await build({
    entryPoints: ["src/features/tasks/BackendManagementPage.jsx"],
    outfile: "temp/workflow-editor-bridge-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "bridge-ui",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve(
            { filter: /^@\/|^react-router-dom$/ },
            ({ path }) => ({ path, namespace: "mock" }),
          );
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => {
            let contents = "";
            if (path === "react-router-dom")
              contents =
                'export const useNavigate=()=>()=>{};export const useLocation=()=>({pathname:"/tasks",search:""});';
            else if (path.endsWith("/button"))
              contents =
                "export const Button=({variant,size,...props})=><button {...props}/>;";
            else if (path === "@/lib/apiClient.js")
              contents =
                'export default {get:async()=>({username:"admin"})};export const isAuthRedirectError=()=>false;';
            else if (path === "@/config.js")
              contents = 'export const BASE_BACKEND_URL="/api";';
            else if (path === "@/lib/tools.jsx")
              contents = "export const useLocalSetting=(_key,value)=>[value];";
            else if (path.endsWith("graphSettings.js"))
              contents =
                'export const KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY="animation";export const DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION=true;';
            else if (path.endsWith("WorkflowEditor.jsx"))
              contents =
                'export default function Editor(props){globalThis.workflowBridgeTest.editor=props;return <div data-workflow-editor><button onClick={()=>props.onChanged({taskId:"created-task"})}>运行完成</button></div>;}';
            return { loader: "jsx", contents };
          });
        },
      },
    ],
  });
  let root;
  try {
    await act(async () => {
      const { default: Page } = await import(
        `../temp/workflow-editor-bridge-test.mjs?t=${Date.now()}`
      );
      root = createRoot(document.getElementById("root"));
      root.render(
        React.createElement(Page, { kind: "tasks", sidebarMode: true }),
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const frame = document.querySelector("iframe"),
      frameWindow = frame.contentWindow;
    const send = async (origin, source) =>
      act(async () => {
        window.dispatchEvent(
          new dom.window.MessageEvent("message", {
            origin,
            source,
            data: { type: "cwm.workflow-editor", templateId: "template-1" },
          }),
        );
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    await send("http://localhost", window);
    await send("https://other.example", frameWindow);
    assert.equal(document.querySelector("[data-workflow-editor]"), null);
    await send("http://localhost", frameWindow);
    assert.ok(document.querySelector("[data-workflow-editor]"));
    assert.deepEqual(globalThis.workflowBridgeTest.editor.request, {
      templateId: "template-1",
    });
    const posted = [];
    frameWindow.postMessage = (...args) => posted.push(args);
    await act(() =>
      document.querySelector("[data-workflow-editor] button").click(),
    );
    assert.deepEqual(posted, [
      [
        { taskId: "created-task", type: "cwm.workflow-changed" },
        "http://localhost",
      ],
    ]);
    assert.equal(document.querySelector("iframe"), frame);
    assert.equal(frame.contentWindow, frameWindow);
    assert.equal(frame.getAttribute("src"), "/api/tasks/page");
  } finally {
    if (root) await act(() => root.unmount());
    dom.window.close();
  }
});
