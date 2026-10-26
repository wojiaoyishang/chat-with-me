import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";

test("workflow icon drawers preserve draft controls across switches and restore focus on close", async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost" });
  for (const key of ["window", "document", "HTMLElement", "Element", "Node"])
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value: dom.window[key],
    });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  await build({
    entryPoints: ["src/features/workflows/WorkflowSidebar.jsx"],
    outfile: "temp/workflow-sidebar-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    packages: "external",
    jsx: "automatic",
  });
  const { default: Sidebar } = await import(
    `../temp/workflow-sidebar-test.mjs?v=${Date.now()}`
  );
  function Harness() {
    const [active, onActiveChange] = useState(null);
    return React.createElement(Sidebar, {
      active,
      onActiveChange,
      templates: React.createElement(
        "select",
        { "aria-label": "模板" },
        React.createElement("option", null, "空白工作流"),
      ),
      details: React.createElement("input", {
        "aria-label": "模板名称",
        defaultValue: "项目",
      }),
      transfer: React.createElement("input", {
        "aria-label": "导入文件",
        type: "file",
      }),
    });
  }
  const root = createRoot(document.getElementById("root"));
  const click = async (label) =>
    act(() => document.querySelector(`[aria-label="${label}"]`).click());
  try {
    await act(() => root.render(React.createElement(Harness)));
    const drawer = document.querySelector(".workflow-sidebar-drawer");
    assert.equal(drawer.hidden, true);
    assert.equal(
      document.querySelectorAll(".workflow-sidebar-rail button").length,
      3,
    );
    await click("名称与说明");
    assert.equal(drawer.hidden, false);
    assert.equal(
      document
        .querySelector('[aria-label="名称与说明"]')
        .getAttribute("aria-expanded"),
      "true",
    );
    const name = document.querySelector('[aria-label="模板名称"]');
    name.value = "新项目";
    const file = document.querySelector('[aria-label="导入文件"]');
    await click("导入与导出");
    assert.equal(name.closest(".workflow-sidebar-content").hidden, true);
    assert.equal(file.closest(".workflow-sidebar-content").hidden, false);
    await click("名称与说明");
    assert.equal(document.querySelector('[aria-label="模板名称"]'), name);
    assert.equal(name.value, "新项目");
    assert.equal(document.querySelector('[aria-label="导入文件"]'), file);
    await click("关闭工作流侧栏");
    assert.equal(drawer.hidden, true);
    assert.equal(
      document.activeElement.getAttribute("aria-label"),
      "名称与说明",
    );
    assert.equal(document.querySelector(".workflow-palette-node"), null);
  } finally {
    await act(() => root.unmount());
    dom.window.close();
  }
});
