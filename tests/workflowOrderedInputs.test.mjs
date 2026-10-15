import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import {
  connectWorkflow,
  copyWorkflowSelection,
  createWorkflowNode,
  effectiveWorkflowDefinition,
  initializeGraph,
  nextWorkflowRepeatedItemId,
  normalizeGraph,
  pasteWorkflowSelection,
  setWorkflowRepeatedItems,
  workflowAddCandidates,
} from "../src/features/workflows/workflowModel.js";

const items = [
  { id: "before", kind: "text", title: "段落 A" },
  { id: "image", kind: "source", title: "图片 A" },
  { id: "after", kind: "text", title: "段落 B" },
];
const definition = {
  kind: "ordered_assemble",
  version: 1,
  display: { title: "顺序内容编排" },
  configSchema: {
    type: "object",
    properties: { items: { type: "array", default: items } },
  },
  inputs: [{ name: "item_old", type: "any" }],
  outputs: [{ name: "bundle", type: "content-bundle" }],
  inputSchema: { properties: { item_old: {} }, required: ["item_old"] },
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
          name: "item_value",
          type: "str",
          required: true,
          inlineAllowed: true,
          schema: { type: "string" },
          display: { subtitle: "item_value · str" },
        },
      },
      {
        kind: "source",
        type: "source-snapshot",
        title: "附件 / 文档",
        port: { type: "source-snapshot", required: true, inlineAllowed: false },
      },
      {
        kind: "bundle",
        type: "content-bundle",
        title: "有序内容",
        port: {
          type: "content-bundle",
          accepts: ["image-enriched-bundle", "bundle"],
          inlineAllowed: false,
        },
      },
    ],
  },
};
const definitions = [
  definition,
  {
    kind: "attachment",
    outputs: [{ name: "source", type: "source-snapshot" }],
    display: { title: "附件" },
  },
  {
    kind: "text",
    outputs: [{ name: "text", type: "str" }],
    display: { title: "文本" },
  },
  {
    kind: "images",
    outputs: [{ name: "bundle", type: "image-enriched-bundle" }],
    display: { title: "图片理解" },
  },
];

function fixture() {
  return normalizeGraph({
    nodes: [
      {
        id: "ordered",
        kind: "ordered_assemble",
        config: { items },
        inputs: {
          item_before: { type: "literal", value: "段落 A 内容" },
          item_after: { type: "literal", value: "段落 B 内容" },
        },
      },
      { id: "attachment", kind: "attachment", name: "原图", inputs: {} },
      { id: "text", kind: "text", inputs: {} },
      { id: "images", kind: "images", inputs: {} },
    ],
    edges: [
      {
        id: "image-link",
        source: "attachment",
        sourcePort: "source",
        target: "ordered",
        targetPort: "item_image",
      },
    ],
  });
}

test("effective ports reflect configured order and preserve backend type descriptors", () => {
  const graph = fixture();
  const actual = effectiveWorkflowDefinition(graph.nodes[0], definition);
  assert.deepEqual(
    actual.inputs.map((port) => port.name),
    ["item_before", "item_image", "item_after"],
  );
  assert.deepEqual(
    actual.inputs.map((port) => port.display.title),
    ["段落 A", "图片 A", "段落 B"],
  );
  assert.equal(actual.inputs[0].display.subtitle, "item_before · str");
  assert.deepEqual(actual.inputSchema.required, [
    "item_before",
    "item_image",
    "item_after",
  ]);
  assert.equal(actual.inputs[1].inlineAllowed, false);
  assert.deepEqual(definition.inputs, [{ name: "item_old", type: "any" }]);
});

test("reordering and renaming keep existing links and text values; copying survives save/load", () => {
  const original = fixture();
  const next = setWorkflowRepeatedItems(original, "ordered", definition, [
    { ...items[2], title: "尾段" },
    items[1],
    items[0],
  ]);
  assert.deepEqual(next.edges, original.edges);
  assert.deepEqual(next.nodes[0].inputs, original.nodes[0].inputs);
  assert.deepEqual(original.nodes[0].config.items, items);
  const restored = initializeGraph(
    JSON.parse(JSON.stringify(next)),
    definitions,
  );
  const copy = copyWorkflowSelection(restored, ["ordered", "attachment"]);
  const pasted = pasteWorkflowSelection(restored, copy);
  const newNode = pasted.graph.nodes.find(
    (node) => pasted.ids.includes(node.id) && node.kind === definition.kind,
  );
  assert.deepEqual(
    effectiveWorkflowDefinition(newNode, definition).inputs.map(
      (port) => port.name,
    ),
    ["item_after", "item_image", "item_before"],
  );
  assert.equal(pasted.graph.edges.at(-1).targetPort, "item_image");
});

test("removal and kind changes clean only affected input bindings and connections", () => {
  const original = fixture();
  const removed = setWorkflowRepeatedItems(original, "ordered", definition, [
    items[0],
    items[2],
  ]);
  assert.equal(removed.edges.length, 0);
  assert.equal(removed.nodes[0].inputs.item_before.value, "段落 A 内容");
  const changed = setWorkflowRepeatedItems(original, "ordered", definition, [
    items[0],
    { ...items[1], kind: "text" },
    { ...items[2], kind: "bundle" },
  ]);
  assert.deepEqual(changed.nodes[0].inputs.item_image, {
    type: "literal",
    value: "",
  });
  assert.equal(changed.nodes[0].inputs.item_after, undefined);
  assert.equal(changed.edges.length, 0);
});

test("created and newly added text slots use inline values and IDs stay valid and unique", () => {
  const created = createWorkflowNode(definition, normalizeGraph());
  assert.deepEqual(created.config.items, items);
  assert.equal(created.inputs.item_before.type, "literal");
  assert.equal(created.inputs.item_image, undefined);
  assert.equal(
    nextWorkflowRepeatedItemId([{ id: "slot-1" }, { id: "slot-3" }]),
    "slot-2",
  );
  assert.throws(
    () => setWorkflowRepeatedItems(fixture(), "ordered", definition, []),
    /1 至 32/,
  );
  assert.throws(
    () =>
      setWorkflowRepeatedItems(fixture(), "ordered", definition, [
        ...items,
        items[0],
      ]),
    /重复/,
  );
  assert.throws(
    () =>
      setWorkflowRepeatedItems(fixture(), "ordered", definition, [
        { id: "bad.id", kind: "text" },
      ]),
    /无效/,
  );
});

test("new ports connect with backend-declared compatibility and participate in both picker directions", () => {
  let graph = setWorkflowRepeatedItems(fixture(), "ordered", definition, [
    ...items,
    { id: "additional", kind: "bundle" },
  ]);
  graph = connectWorkflow(
    graph,
    {
      source: "images",
      sourcePort: "bundle",
      target: "ordered",
      targetPort: "item_additional",
    },
    definitions,
  );
  assert.equal(graph.edges.at(-1).targetPort, "item_additional");
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "text",
          sourcePort: "text",
          target: "ordered",
          targetPort: "item_additional",
        },
        definitions,
      ),
    /不兼容/,
  );
  assert.throws(
    () =>
      connectWorkflow(
        graph,
        {
          source: "images",
          sourcePort: "bundle",
          target: "ordered",
          targetPort: "item_old",
        },
        definitions,
      ),
    /不存在/,
  );
  const reverse = workflowAddCandidates(definitions, graph, {
    nodeId: "ordered",
    handleId: "item_additional",
    handleType: "target",
  });
  assert.deepEqual(
    reverse.map((candidate) => candidate.definition.kind),
    ["ordered_assemble", "images"],
  );
  const forward = workflowAddCandidates(definitions, graph, {
    nodeId: "attachment",
    handleId: "source",
    handleType: "source",
  });
  assert.deepEqual(
    forward.map((candidate) => candidate.port.name),
    ["item_image"],
  );
});

async function mount(disabled = false) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost",
    pretendToBeVisual: true,
  });
  for (const name of [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "Node",
    "Event",
  ])
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value: dom.window[name],
    });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  await build({
    entryPoints: ["src/features/workflows/WorkflowOrderedInputs.jsx"],
    outfile: "temp/workflow-ordered-inputs-test.mjs",
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    jsx: "automatic",
    plugins: [
      {
        name: "ordered-input-controls",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve({ filter: /^@\// }, ({ path }) => ({
            path,
            namespace: "controls",
          }));
          builder.onLoad(
            { filter: /.*/, namespace: "controls" },
            ({ path }) => {
              let contents = "";
              if (path.endsWith("/button"))
                contents =
                  "export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;";
              if (path.endsWith("/input"))
                contents =
                  "export const Input=({onChange,...props})=><input {...props} onInput={onChange}/>;";
              if (path.endsWith("/select"))
                contents =
                  "import {createContext,useContext} from 'react';const Context=createContext(null);export const Select=({children,value,onValueChange,disabled})=><Context.Provider value={{value,onValueChange,disabled}}>{children}</Context.Provider>;export const SelectTrigger=({children})=>children;export const SelectValue=()=>null;export const SelectContent=({children})=>{const c=useContext(Context);return <select value={c.value} disabled={c.disabled} onChange={e=>c.onValueChange(e.target.value)}>{children}</select>};export const SelectItem=({children,value})=><option value={value}>{children}</option>;";
              if (path.endsWith("MultilineEditor.jsx"))
                contents =
                  "export default ({value,label,onChange,disabled})=><textarea aria-label={label} value={value} onInput={onChange} disabled={disabled}/>;";
              return { contents, loader: "jsx" };
            },
          );
        },
      },
    ],
  });
  const { default: Component } = await import(
    `../temp/workflow-ordered-inputs-test.mjs?${Date.now()}`
  );
  const state = {};
  const root = createRoot(document.getElementById("root"));
  function Harness() {
    const [graph, update] = React.useState(fixture());
    state.graph = graph;
    return React.createElement(Component, {
      graph,
      node: graph.nodes[0],
      definition,
      onGraphChange: update,
      disabled,
    });
  }
  await act(() => root.render(React.createElement(Harness)));
  return {
    state,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

const click = async (label) =>
  act(() => document.querySelector(`button[aria-label="${label}"]`).click());

test("rendered controls edit text, reorder linked inputs, add and remove ports", async () => {
  const page = await mount();
  try {
    const before = document.querySelector('textarea[aria-label="段落 A"]');
    await act(() => {
      before.value = "修改后的段落";
      before.dispatchEvent(new window.Event("input", { bubbles: true }));
    });
    assert.equal(
      page.state.graph.nodes[0].inputs.item_before.value,
      "修改后的段落",
    );
    await click("上移 图片 A");
    assert.equal(page.state.graph.nodes[0].config.items[0].id, "image");
    assert.equal(page.state.graph.edges[0].targetPort, "item_image");
    const add = [...document.querySelectorAll("button")].find(
      (button) => button.textContent === "有序内容",
    );
    await act(() => add.click());
    assert.equal(page.state.graph.nodes[0].config.items.at(-1).kind, "bundle");
    assert.match(document.body.textContent, /连接文档顺序解析/);
    await click("删除 图片 A");
    assert.equal(page.state.graph.edges.length, 0);
    assert.equal(
      page.state.graph.nodes[0].inputs.item_before.value,
      "修改后的段落",
    );
  } finally {
    await page.close();
  }
});

test("rendered kind change removes old links and permits direct text entry", async () => {
  const page = await mount();
  try {
    await act(() => {
      const select = document.querySelectorAll("select")[1];
      select.value = "text";
      select.dispatchEvent(new window.Event("change", { bubbles: true }));
    });
    assert.equal(page.state.graph.edges.length, 0);
    assert.deepEqual(page.state.graph.nodes[0].inputs.item_image, {
      type: "literal",
      value: "",
    });
    assert.ok(document.querySelector('textarea[aria-label="图片 A"]'));
  } finally {
    await page.close();
  }
});

test("read-only controls disable configuration, reorder and drag", async () => {
  const page = await mount(true);
  try {
    assert.ok(
      [...document.querySelectorAll("button,input,textarea,select")].every(
        (control) => control.disabled,
      ),
    );
    assert.ok(
      [...document.querySelectorAll(".workflow-ordered-grip")].every(
        (control) => !control.draggable,
      ),
    );
  } finally {
    await page.close();
  }
});
