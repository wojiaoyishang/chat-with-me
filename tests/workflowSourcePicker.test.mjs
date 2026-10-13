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
        { id: "file-1", name: "示例附件.png", uri: "cwm://artifact/file-1" },
      ],
      total: 1,
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
                  "export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;";
              else if (requested.endsWith("/input"))
                contents = "export const Input=props=><input {...props}/>;";
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
