import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const schema = {
  type: "object",
  ui: { widget: "workflow-schema" },
  properties: {
    schemaId: { type: "string" },
    schemaRevision: { type: ["integer", "null"] },
    schemaText: {
      type: "string",
      display: {
        title: "规则定义",
        subtitle: "schemaText · str",
        description: "后端声明的规则说明",
      },
    },
  },
};

async function mount({ compact = false, disabled = false, value = {} } = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/",
    pretendToBeVisual: true,
  });
  for (const key of ["window", "document", "HTMLElement", "Node", "Event"])
    globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [];
  const state = { value };
  globalThis.schemaInputUITest = {
    get: async (url) => {
      calls.push(url);
      if (url === "/schemas/templates")
        return {
          templates: [{ id: "ref", title: "参考定义", text: "Ref: Entity" }],
        };
      return {
        schemas: [
          { id: "mine", title: "个人规则", text: "Mine: Entity", revision: 4 },
        ],
      };
    },
    post: async () => ({ valid: true }),
  };
  await build({
    entryPoints: ["src/features/workflows/WorkflowDataField.jsx"],
    outfile: "temp/workflow-schema-input-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "isolated-schema-form",
        setup(builder) {
          builder.onResolve(
            { filter: /^react(?:\/|$)/ },
            ({ path: requested }) => ({ path: requested, external: true }),
          );
          builder.onResolve({ filter: /\.css$/ }, () => ({
            path: "css",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@\// }, ({ path: requested }) => ({
            path: requested,
            namespace: "mock",
          }));
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: requested }) => {
              let contents = "";
              if (requested.includes("apiClient"))
                contents = "export default globalThis.schemaInputUITest;";
              else if (requested.endsWith("/popover"))
                contents = `import {createContext,useContext} from 'react';const Context=createContext(null);export const Popover=({children,open,onOpenChange})=><Context.Provider value={{open,onOpenChange}}>{children}</Context.Provider>;export const PopoverTrigger=({children})=>{const c=useContext(Context);return <div onClick={()=>c.onOpenChange(!c.open)}>{children}</div>};export const PopoverContent=({children})=>useContext(Context).open?<section>{children}</section>:null;`;
              else if (requested.endsWith("/select"))
                contents = `import {createContext,useContext} from 'react';const Context=createContext(null);export const Select=({children,value,onValueChange,disabled})=><Context.Provider value={{value,onValueChange,disabled}}>{children}</Context.Provider>;export const SelectTrigger=()=>null;export const SelectValue=()=>null;export const SelectContent=({children})=>{const c=useContext(Context);return <select value={c.value} disabled={c.disabled} onChange={e=>c.onValueChange(e.target.value)}>{children}</select>};export const SelectItem=({children,value})=><option value={value}>{children}</option>;`;
              else if (requested.endsWith("/button"))
                contents =
                  "export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;";
              else if (requested.endsWith("/input"))
                contents = "export const Input=props=><input {...props}/>;";
              else if (requested.endsWith("/dialog"))
                contents =
                  "export const Dialog=({children})=>children;export const DialogContent=({children})=><div>{children}</div>;export const DialogHeader=({children})=><header>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;";
              else if (requested.endsWith("virtualUrl.js"))
                contents = "export const resolveResourceUrl=value=>value;";
              else if (requested.endsWith("/switch"))
                contents = "export const Switch=()=>null;";
              else if (requested.endsWith("MultilineEditor.jsx"))
                contents =
                  "export default ({label,value,onChange,disabled,rows})=><textarea aria-label={label} value={value} onInput={onChange} onChange={onChange} disabled={disabled} rows={rows}/>;";
              else if (requested.endsWith("JsonConfigEditor.jsx"))
                contents = "export default ()=>null;";
              return { contents, loader: "jsx" };
            },
          );
        },
      },
    ],
  });
  const { default: Field } = await import(
    `../temp/workflow-schema-input-test.mjs?v=${Date.now()}`
  );
  function Form() {
    const [current, change] = React.useState(value);
    state.value = current;
    return React.createElement(Field, {
      schema,
      label: "规则输入",
      compact,
      disabled,
      value: current,
      onChange: change,
    });
  }
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(React.createElement(Form));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return {
    calls,
    state,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

async function click(node) {
  await act(async () => {
    node.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}
async function choose(value) {
  await act(async () => {
    const input = document.querySelector("select");
    input.value = value;
    input.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
}

test("compact schema node stays small and opens the declared editor on demand", async () => {
  const ui = await mount({ compact: true });
  try {
    assert.equal(document.querySelector("textarea"), null);
    assert.deepEqual(ui.calls, []);
    await click(document.querySelector('[aria-label="配置规则输入"]'));
    assert.deepEqual(ui.calls.sort(), ["/schemas", "/schemas/templates"]);
    assert.match(document.body.textContent, /schemaText · str/);
    assert.match(document.body.textContent, /后端声明的规则说明/);
    assert.equal(
      document.querySelector("textarea").getAttribute("aria-label"),
      "规则定义",
    );
    await choose("template:ref");
    assert.deepEqual(ui.state.value, {});
    assert.equal(document.querySelector("textarea").value, "Ref: Entity");
    await click(
      [...document.querySelectorAll("button")].find(
        (button) => button.textContent === "确认选择",
      ),
    );
    assert.equal(ui.state.value.schemaId, "template:ref");
    assert.match(
      document.querySelector('[aria-label="配置规则输入"]').textContent,
      /参考定义/,
    );
    await click(document.querySelector('[aria-label="配置规则输入"]'));
    await choose("mine");
    await click(document.querySelector('[aria-label="配置规则输入"]'));
    assert.equal(ui.state.value.schemaId, "template:ref");
  } finally {
    await ui.close();
  }
});

test("saved schema reference displays its fetched title before opening the editor", async () => {
  const ui = await mount({
    compact: true,
    value: { schemaId: "mine", schemaRevision: 4 },
  });
  try {
    assert.match(
      document.querySelector('[aria-label="配置规则输入"]').textContent,
      /个人规则/,
    );
    assert.deepEqual(ui.state.value, { schemaId: "mine", schemaRevision: 4 });
  } finally {
    await ui.close();
  }
});

test("quick form saves selected personal schema revision and edits remove the old reference", async () => {
  const ui = await mount();
  try {
    await choose("mine");
    assert.deepEqual(ui.state.value, { schemaId: "mine", schemaRevision: 4 });
    await act(async () => {
      const input = document.querySelector("textarea");
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value",
      ).set;
      setter.call(input, "Edited: Entity");
      input.dispatchEvent(new window.Event("input", { bubbles: true }));
    });
    assert.deepEqual(ui.state.value, { schemaText: "Edited: Entity" });
  } finally {
    await ui.close();
  }
});

test("read-only schema nodes allow inspecting the frozen text without changing it", async () => {
  const ui = await mount({
    compact: true,
    disabled: true,
    value: { schemaText: "Frozen: Entity" },
  });
  try {
    await click(document.querySelector('[aria-label="配置规则输入"]'));
    assert.equal(document.querySelector("textarea").value, "Frozen: Entity");
    assert.equal(document.querySelector("textarea").disabled, true);
    assert.equal(document.querySelector("select").disabled, true);
    assert.deepEqual(ui.state.value, { schemaText: "Frozen: Entity" });
  } finally {
    await ui.close();
  }
});
