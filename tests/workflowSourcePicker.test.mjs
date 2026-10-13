import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

async function mount() {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/",
    pretendToBeVisual: true,
  });
  for (const key of ["window", "document", "HTMLElement", "Node", "Event"])
    globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.sourcePickerUITest = {
    get: async () => ({
      items: [
        {
          id: "file-1",
          name: "示例附件.png",
          type: "image",
          uri: "cwm://artifact/file-1",
        },
        {
          id: "file-2",
          name: "阅读材料.md",
          type: "text",
          uri: "cwm://artifact/file-2",
        },
      ],
      total: 2,
    }),
    post: async () => ({
      source: { contentHash: "revision-1" },
      blocks: [{ id: "block-1", text: "可预览的正文" }],
      total: 1,
      hasMore: false,
    }),
  };
  await build({
    entryPoints: ["src/features/workflows/WorkflowSourcePicker.jsx"],
    outfile: "temp/workflow-source-picker-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "isolated-source-picker",
        setup(builder) {
          builder.onResolve(
            { filter: /^react(?:\/|$)/ },
            ({ path: requested }) => ({ path: requested, external: true }),
          );
          builder.onResolve({ filter: /^@\// }, ({ path: requested }) => ({
            path: requested,
            namespace: "mock",
          }));
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: requested }) => {
              let contents = "";
              if (requested.includes("apiClient"))
                contents = "export default globalThis.sourcePickerUITest;";
              else if (requested.endsWith("/popover"))
                contents = `import {createContext,useContext} from 'react';const Context=createContext(null);export const Popover=({children,open,onOpenChange})=><Context.Provider value={{open,onOpenChange}}>{children}</Context.Provider>;export const PopoverTrigger=({children})=>{const c=useContext(Context);return <div onClick={()=>c.onOpenChange(!c.open)}>{children}</div>};export const PopoverContent=({children})=>useContext(Context).open?<section>{children}</section>:null;`;
              else if (requested.endsWith("/button"))
                contents =
                  "import {cloneElement} from 'react';export const Button=({children,variant,size,asChild,...props})=>asChild?cloneElement(children,props):<button {...props}>{children}</button>;";
              else if (requested.endsWith("/input"))
                contents = "export const Input=props=><input {...props}/>;";
              else if (requested.endsWith("/dialog"))
                contents = `export const Dialog=({open,onOpenChange,children})=>open?<div data-testid="resource-preview">{children}<button aria-label="关闭资源预览" onClick={()=>onOpenChange(false)}>关闭</button></div>:null;export const DialogContent=({children,...props})=><div {...props}>{children}</div>;export const DialogHeader=({children,...props})=><div {...props}>{children}</div>;export const DialogTitle=({children,...props})=><h2 {...props}>{children}</h2>;export const DialogDescription=({children,...props})=><p {...props}>{children}</p>;`;
              else if (requested.endsWith("virtualUrl.js"))
                contents =
                  "export const resolveResourceUrl=value=>value.replace('cwm://artifact/','/api/upload/');";
              else if (requested.endsWith("MultilineEditor.jsx"))
                contents = "export default ()=>null;";
              else if (requested.endsWith("/select"))
                contents =
                  "export const Select=()=>null;export const SelectTrigger=()=>null;export const SelectContent=()=>null;export const SelectItem=()=>null;export const SelectValue=()=>null;";
              return { contents, loader: "jsx" };
            },
          );
        },
      },
    ],
  });
  const { default: Picker } = await import(
    `../temp/workflow-source-picker-test.mjs?v=${Date.now()}`
  );
  const state = { value: { resources: [] } };
  function Form() {
    const [value, onChange] = React.useState({ resources: [] });
    state.value = value;
    return React.createElement(Picker, {
      compact: true,
      fixedType: "file",
      value,
      onChange,
    });
  }
  const root = createRoot(document.getElementById("root"));
  await act(async () => root.render(React.createElement(Form)));
  return {
    state,
    close: async () => {
      await act(async () => root.unmount());
      dom.window.close();
    },
  };
}

async function click(element, delay = 0) {
  await act(async () => {
    element.click();
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
  });
}

test("attachment picker confirms staged selection and discards unconfirmed changes", async () => {
  const ui = await mount();
  try {
    const trigger = document.querySelector('[aria-label="选择附件输入"]');
    await click(trigger, 230);
    await click(document.querySelector(".workflow-resource"));
    assert.deepEqual(ui.state.value.resources, []);
    assert.match(document.querySelector("section").textContent, /已选择 1 项/);
    await click(
      [...document.querySelectorAll("button")].find(
        (button) => button.textContent === "确认选择",
      ),
    );
    assert.deepEqual(ui.state.value.resources, ["cwm://artifact/file-1"]);
    await click(trigger, 230);
    await click(document.querySelector(".workflow-resource"));
    assert.deepEqual(ui.state.value.resources, ["cwm://artifact/file-1"]);
    await click(trigger);
    assert.deepEqual(ui.state.value.resources, ["cwm://artifact/file-1"]);
  } finally {
    await ui.close();
  }
});

test("viewing an attachment does not select it or close the picker", async () => {
  const ui = await mount();
  try {
    await click(document.querySelector('[aria-label="选择附件输入"]'), 230);
    await click(document.querySelector('[aria-label="查看 示例附件.png"]'));
    assert.deepEqual(ui.state.value.resources, []);
    assert.ok(document.querySelector('[data-testid="resource-preview"] img'));
    assert.ok(document.querySelector(".workflow-resource-list"));
    await click(document.querySelector('[aria-label="关闭资源预览"]'));
    assert.equal(
      document.querySelector('[data-testid="resource-preview"]'),
      null,
    );
    assert.ok(document.querySelector(".workflow-resource-list"));
    await click(document.querySelector('[aria-label="查看 阅读材料.md"]'), 20);
    assert.match(
      document.querySelector('[data-testid="resource-preview"]').textContent,
      /可预览的正文/,
    );
    assert.deepEqual(ui.state.value.resources, []);
  } finally {
    await ui.close();
  }
});
