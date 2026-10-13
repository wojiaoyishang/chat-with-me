import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

async function mountLogViewer(responder, props = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/tasks",
    pretendToBeVisual: true,
  });
  for (const name of ["window", "document", "HTMLElement", "Node"])
    globalThis[name] = dom.window[name];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const requests = [];
  globalThis.workflowLogTest = {
    api: {
      get: async (url) => {
        requests.push(url);
        return responder(url);
      },
    },
  };
  await build({
    entryPoints: ["src/features/workflows/WorkflowLogViewer.jsx"],
    outfile: "temp/workflow-log-viewer-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "isolated-log-viewer",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({
            path: name,
            external: true,
          }));
          builder.onResolve({ filter: /\.css$/ }, () => ({
            path: "css",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@\/lib\/apiClient/ }, () => ({
            path: "api",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@\/components\/ui\/button$/ }, () => ({
            path: "button",
            namespace: "mock",
          }));
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: name }) => ({
              loader: "jsx",
              contents:
                name === "api"
                  ? "export default globalThis.workflowLogTest.api;"
                  : name === "button"
                    ? "export const Button=({variant,size,...props})=><button {...props}/>;"
                    : "",
            }),
          );
          builder.onResolve({ filter: /^@\// }, ({ path: name }) => ({
            path: path.resolve("src", name.slice(2)),
          }));
        },
      },
    ],
  });
  const { default: WorkflowLogViewer } = await import(
    `../temp/workflow-log-viewer-test.mjs?v=${Date.now()}`
  );
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(
      React.createElement(WorkflowLogViewer, { taskId: "task-1", ...props }),
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return {
    dom,
    requests,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

async function click(dom, element) {
  assert.ok(element);
  await act(async () => {
    element.dispatchEvent(
      new dom.window.MouseEvent("click", { bubbles: true }),
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

test("workflow logs filter by severity and page through task records", async () => {
  const view = await mountLogViewer((url) => {
    const query = new URL(url, "http://localhost").searchParams;
    const level = query.get("level");
    const offset = Number(query.get("offset"));
    return {
      total: 51,
      hasMore: offset === 0,
      items: [
        {
          id: `${level}-${offset}`,
          timestamp: "2026-10-13T11:00:00Z",
          level: level === "all" ? "info" : level,
          nodeId: "extract-1",
          nodeName: "知识提取",
          message: `${level} 第 ${offset} 条`,
        },
      ],
    };
  });
  try {
    assert.match(
      document.querySelector(".workflow-log-list").textContent,
      /all 第 0 条/,
    );
    await click(
      view.dom,
      [...document.querySelectorAll("button")].find(
        (button) => button.textContent === "警告",
      ),
    );
    assert.match(
      document.querySelector(".workflow-log-list").textContent,
      /warning 第 0 条/,
    );
    assert.equal(
      document.querySelector('button[aria-pressed="true"]').textContent,
      "警告",
    );
    await click(
      view.dom,
      [...document.querySelectorAll("button")].find(
        (button) => button.textContent === "下一页",
      ),
    );
    assert.match(
      document.querySelector(".workflow-log-list").textContent,
      /warning 第 50 条/,
    );
    assert.ok(
      view.requests.some((url) =>
        url.includes("offset=50&limit=50&level=warning"),
      ),
    );
  } finally {
    await view.close();
  }
});

test("workflow log errors keep a visible retry action", async () => {
  let attempts = 0;
  const view = await mountLogViewer(() => {
    attempts += 1;
    if (attempts === 1) throw new Error("暂时不可用");
    return { items: [], total: 0, hasMore: false };
  });
  try {
    assert.match(
      document.querySelector('[role="alert"]').textContent,
      /暂时不可用/,
    );
    await click(
      view.dom,
      [...document.querySelectorAll("button")].find(
        (button) => button.textContent === "重试",
      ),
    );
    assert.match(
      document.querySelector(".workflow-log-empty").textContent,
      /暂无日志/,
    );
    assert.equal(attempts, 2);
  } finally {
    await view.close();
  }
});
