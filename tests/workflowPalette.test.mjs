import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

// Node discovery lives in the real context-menu integration tests. This panel
// keeps editable project controls without a second, competing node list.
test("workflow sidebar preserves project controls and removes the permanent node palette", async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost" });
  for (const key of ["window", "document", "HTMLElement", "Element", "Node"])
    Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  await build({ entryPoints: ["src/features/workflows/WorkflowPalette.jsx"], outfile: "temp/workflow-project-panel-test.mjs", bundle: true, format: "esm", platform: "node", packages: "external", jsx: "automatic" });
  const { default: Panel } = await import(`../temp/workflow-project-panel-test.mjs?v=${Date.now()}`);
  const root = createRoot(document.getElementById("root"));
  try {
    await act(() => root.render(React.createElement(Panel, {controls: React.createElement("input", {"aria-label": "模板名称", defaultValue: "项目"})})));
    assert.equal(document.querySelector('[aria-label="模板名称"]').value, "项目");
    assert.equal(document.querySelector(".workflow-palette-node"), null);
    assert.equal(document.querySelector('[aria-label="搜索工作流节点"]'), null);
    assert.match(document.querySelector("aside").textContent, /右键画布/);
  } finally { await act(() => root.unmount()); dom.window.close(); }
});
