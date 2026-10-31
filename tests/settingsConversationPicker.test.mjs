import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const output = `temp/settings-conversation-picker-${process.pid}.mjs`;
await build({
  entryPoints: ["src/features/settings-runtime/SettingsConversationPicker.jsx"],
  outfile: output,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  plugins: [
    {
      name: "picker-ui",
      setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({
          path: name,
          external: true,
        }));
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => ({
          path: name,
          namespace: "mock",
        }));
        builder.onLoad(
          { filter: /.*/, namespace: "mock" },
          ({ path: name }) => {
            let contents;
            if (name.endsWith("/ConversationsList.jsx"))
              contents =
                "export default function List(props){globalThis.pickerProps=props;return <ul>{props.selectionOptions.map(item=><li key={item.value}><button disabled={item.disabled} aria-label={item.label} onClick={()=>props.onSelect(String(item.value))}>{item.label}</button></li>)}</ul>;}";
            else if (name.endsWith("/button"))
              contents =
                "export const Button=({variant,size,...props})=><button {...props}/>;";
            else if (name.endsWith("/dialog"))
              contents =
                'export const Dialog=({open,children})=>open?<section role="dialog">{children}</section>:null;export const DialogContent=({children,...props})=><div {...props}>{children}</div>;export const DialogHeader=({children,...props})=><header {...props}>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;';
            return { loader: "jsx", contents };
          },
        );
      },
    },
  ],
});
const { default: Picker } = await import(
  pathToFileURL(path.resolve(output)).href
);
async function mount(initial = "gone", options = []) {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const state = { value: initial, changes: [] };
  function Form() {
    const [value, setValue] = React.useState(initial);
    state.value = value;
    return React.createElement(Picker, {
      item: { text: "目标子智能体", options },
      value,
      onChange: (next) => {
        state.changes.push(next);
        setValue(next);
      },
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
test("unavailable selection is preserved and choosing an authorized candidate returns only its ID", async () => {
  const options = [
    {
      value: "child-1",
      label: "文档助手",
      group: "研究计划",
      description: "等待消息",
      status: "idle",
    },
    { value: "stopped", label: "已停止", disabled: true, status: "closed" },
  ];
  const ui = await mount("gone", options);
  try {
    assert.equal(ui.state.value, "gone");
    assert.equal(ui.state.changes.length, 0);
    assert.match(
      document.querySelector('[role="alert"]').textContent,
      /原选择仍会保留/,
    );
    await act(async () =>
      document.querySelector('[aria-label="目标子智能体"]').click(),
    );
    assert.ok(document.querySelector('[role="dialog"]'));
    assert.equal(globalThis.pickerProps.selectionOptions, options);
    assert.equal(globalThis.pickerProps.selectedConversationId, "gone");
    assert.equal(
      document.querySelector('[aria-label="已停止"]').disabled,
      true,
    );
    await act(async () =>
      document.querySelector('[aria-label="文档助手"]').click(),
    );
    assert.deepEqual(ui.state.changes, ["child-1"]);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.match(document.body.textContent, /研究计划/);
    assert.equal(document.querySelector('[role="alert"]'), null);
  } finally {
    await ui.close();
  }
});
