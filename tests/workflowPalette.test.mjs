import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const categories = [
  { id: "source", title: "输入数据" },
  { id: "process", title: "处理节点" },
  { id: "sink", title: "输出节点" },
];
const nodes = [
  {
    kind: "text",
    version: 1,
    category: "source",
    display: { title: "文本", subtitle: "str", description: "输入文字" },
  },
  {
    kind: "extract",
    version: 1,
    category: "process",
    title: "不应出现的备用标题",
    display: {
      title: "知识提取",
      subtitle: "KnowledgeExtractor",
      description: "按指定 Schema 提取",
    },
  },
  {
    kind: "hidden",
    version: 1,
    category: "process",
    hidden: true,
    display: { title: "隐藏节点", subtitle: "HiddenClass" },
  },
  {
    kind: "write",
    version: 1,
    category: "sink",
    display: { title: "写入图数据库", subtitle: "DumpToNeo4j" },
  },
];

async function environment() {
  const dom = new JSDOM('<html><body><div id="root"></div></body></html>', {
    url: "http://localhost",
    pretendToBeVisual: true,
  });
  for (const name of [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "Node",
    "CustomEvent",
  ]) {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value: dom.window[name],
    });
  }
  globalThis.getComputedStyle = dom.window.getComputedStyle;
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame;
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  await build({
    entryPoints: ["src/features/workflows/WorkflowPalette.jsx"],
    outfile: "temp/workflow-palette-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    alias: {
      "@/components/ui/input": path.resolve("src/components/ui/input.tsx"),
      "@/components/ui/accordion": path.resolve(
        "src/components/ui/accordion.tsx",
      ),
      "@/lib/utils": path.resolve("src/lib/utils.ts"),
    },
    loader: { ".css": "empty" },
  });
  const { default: Palette } = await import(
    `../temp/workflow-palette-test.mjs?v=${Date.now()}`
  );
  const root = createRoot(document.getElementById("root"));
  const additions = [];
  let state = {
    categories,
    nodes,
    controls: React.createElement("input", {
      "aria-label": "模板名称",
      defaultValue: "默认工作流",
    }),
    search: "",
    onAdd: (definition) => additions.push(definition.kind),
    onSearch: (value) => render({ search: value }),
  };
  const render = async (next = {}) => {
    state = { ...state, ...next };
    await act(async () => {
      root.render(React.createElement(Palette, state));
    });
  };
  await render();
  const click = async (element) => {
    assert.ok(element);
    await act(async () => {
      element.dispatchEvent(
        new dom.window.MouseEvent("click", { bubbles: true }),
      );
    });
  };
  const category = (title) =>
    [...document.querySelectorAll('[data-slot="accordion-trigger"]')].find(
      (item) => item.textContent.includes(title),
    );
  return {
    dom,
    root,
    render,
    click,
    category,
    additions,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

test("palette keeps controls and search outside the independently scrolling node list", async () => {
  const app = await environment();
  try {
    const list = document.querySelector(".workflow-palette-list");
    const input = document.querySelector('[aria-label="搜索工作流节点"]');
    assert.equal(list.contains(input), false);
    assert.equal(
      list.contains(document.querySelector('[aria-label="模板名称"]')),
      false,
    );
    assert.equal(list.classList.contains("pretty-scrollbar"), true);
    const styles = await readFile(
      "src/features/workflows/WorkflowPalette.css",
      "utf8",
    );
    assert.match(
      styles,
      /\.workflow-palette-list\s*\{[^}]*flex: 1 1 0;[^}]*min-height: 0;[^}]*overflow-y: auto;/s,
    );
  } finally {
    await app.close();
  }
});

test("accordion remembers manual expansion and search opens matches without changing it", async () => {
  const app = await environment();
  try {
    assert.equal(
      app.category("处理节点").getAttribute("aria-expanded"),
      "true",
    );
    await app.click(app.category("处理节点"));
    assert.equal(
      app.category("处理节点").getAttribute("aria-expanded"),
      "false",
    );
    await app.render({ search: "KnowledgeExtractor" });
    assert.equal(
      app.category("处理节点").getAttribute("aria-expanded"),
      "true",
    );
    assert.equal(app.category("输入数据"), undefined);
    assert.match(
      document.querySelector(".workflow-palette-list").textContent,
      /知识提取/,
    );
    await app.render({ search: "" });
    assert.equal(
      app.category("处理节点").getAttribute("aria-expanded"),
      "false",
    );
    await app.render({ nodes: [...nodes] });
    assert.equal(
      app.category("处理节点").getAttribute("aria-expanded"),
      "false",
    );
    await app.render({ search: "不存在的节点" });
    assert.equal(
      document.querySelector('[role="status"]').textContent,
      "没有匹配的节点",
    );
  } finally {
    await app.close();
  }
});

test("palette uses backend captions, hides legacy nodes, and retains click and drag addition", async () => {
  const app = await environment();
  try {
    assert.doesNotMatch(
      document.body.textContent,
      /隐藏节点|不应出现的备用标题/,
    );
    const text = document.querySelector(".workflow-palette-node");
    await app.click(text);
    assert.deepEqual(app.additions, ["text"]);
    const transferred = {};
    const event = new app.dom.window.Event("dragstart", { bubbles: true });
    const transfer = { setData: (key, value) => (transferred[key] = value) };
    Object.defineProperty(event, "dataTransfer", { value: transfer });
    await act(() => text.dispatchEvent(event));
    assert.equal(transferred["application/cwm-workflow-node"], "text");
    assert.equal(transfer.effectAllowed, "copy");
    await app.render({ disabled: true });
    assert.equal(text.disabled, true);
    assert.equal(text.draggable, false);
    await app.click(text);
    assert.deepEqual(app.additions, ["text"]);
  } finally {
    await app.close();
  }
});

test("accordion categories can be reached with arrow keys and expose their expansion state", async () => {
  const app = await environment();
  try {
    const source = app.category("输入数据");
    const process = app.category("处理节点");
    source.focus();
    await act(() => {
      source.dispatchEvent(
        new app.dom.window.KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
        }),
      );
    });
    assert.equal(document.activeElement, process);
    assert.ok(process.getAttribute("aria-controls"));
    await app.click(process);
    assert.equal(process.getAttribute("aria-expanded"), "false");
  } finally {
    await app.close();
  }
});
