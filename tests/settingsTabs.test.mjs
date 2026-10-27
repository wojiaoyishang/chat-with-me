import assert from "node:assert/strict";
import test from "node:test";
import { useEffect, useRef, useState } from "react";
import {
  findSettingsField,
  pageValues,
  validateFields,
} from "../src/features/settings-runtime/model.js";
import {
  mount,
  button,
  click,
  edit,
  ref,
  registerSettingsComponent,
  act,
  React,
} from "./helpers/settingsRuntimeHarness.mjs";

const tabs = (options = {}) => ({
  type: "tabs",
  id: "shared-form",
  defaultTab: "basic",
  tabs: [
    {
      id: "basic",
      label: "基础信息",
      icon: "settings",
      options: [
        { type: "text", name: "title", text: "名称", default: "原始名称" },
      ],
    },
    {
      id: "advanced",
      label: "高级配置",
      options: [
        { type: "text", name: "notes", text: "备注", default: "原始备注" },
      ],
    },
  ],
  ...options,
});
const tab = (label) =>
  [...document.querySelectorAll('[role="tab"]')].find(
    (node) => node.textContent.trim() === label,
  );
const pane = (label) =>
  document.getElementById(tab(label).getAttribute("aria-controls"));

test("tab presentation stays transparent to defaults, list entries, validation and field rules", () => {
  const ruleField = {
    type: "switch",
    name: "enabled",
    default: false,
    rules: [
      { when: { $ref: "form.enabled", eq: true }, set: { name: "from-rule" } },
    ],
  };
  const schema = [
    tabs({
      name: "presentation-only",
      tabs: [
        {
          id: "one",
          label: "第一项",
          options: [
            {
              type: "group",
              name: "connection",
              children: [{ name: "host", default: "localhost" }],
            },
          ],
        },
        {
          id: "two",
          label: "第二项",
          options: [
            {
              type: "list",
              name: "rows",
              children: [
                {
                  type: "tabs",
                  id: "nested",
                  tabs: [
                    {
                      id: "values",
                      label: "值",
                      options: [
                        { name: "name", default: "", required: true },
                        ruleField,
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ];
  const values = pageValues(schema, { rows: [{}] });
  assert.deepEqual(values, {
    rows: [{ name: "", enabled: false }],
    connection: { host: "localhost" },
  });
  assert.deepEqual(Object.keys(validateFields(schema, values)), [
    "rows.0.name",
  ]);
  assert.equal(findSettingsField(schema, ["rows", 0, "enabled"]), ruleField);
  assert.equal(
    findSettingsField(schema, ["presentation-only", "rows", 0, "enabled"]),
    null,
  );
});

test("switching settings tabs preserves the same inputs and never changes form values", async () => {
  const ui = await mount([tabs()]);
  try {
    const title = document.querySelector('[aria-label="名称"]');
    const notes = document.querySelector('[aria-label="备注"]');
    assert.equal(pane("高级配置").hidden, true);
    assert.equal(
      pane("基础信息").getAttribute("aria-labelledby"),
      tab("基础信息").id,
    );
    await edit(title, "我编辑的名称");
    const count = settingsUI.changed.length;
    await click(tab("高级配置"));
    assert.equal(settingsUI.changed.length, count);
    assert.equal(document.querySelector('[aria-label="备注"]'), notes);
    await edit(notes, "保留高级配置");
    await click(tab("基础信息"));
    assert.equal(document.querySelector('[aria-label="名称"]'), title);
    assert.equal(title.value, "我编辑的名称");
    assert.equal(notes.value, "保留高级配置");
    assert.deepEqual(settingsUI.changed.at(-1), {
      title: "我编辑的名称",
      notes: "保留高级配置",
    });
  } finally {
    await ui.close();
  }
});

test("tab keyboard navigation uses roving focus and separate instances have unique panel IDs", async () => {
  const ui = await mount([tabs(), tabs({ id: "second-instance" })]);
  try {
    const all = [...document.querySelectorAll('[role="tab"]')];
    assert.equal(new Set(all.map((node) => node.id)).size, 4);
    assert.equal(all[0].tabIndex, 0);
    assert.equal(all[1].tabIndex, -1);
    await act(async () =>
      all[0].dispatchEvent(
        new window.KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
        }),
      ),
    );
    assert.equal(document.activeElement, all[1]);
    assert.equal(all[1].getAttribute("aria-selected"), "true");
    await act(async () =>
      all[1].dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Home", bubbles: true }),
      ),
    );
    assert.equal(document.activeElement, all[0]);
    await act(async () =>
      all[0].dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "End", bubbles: true }),
      ),
    );
    assert.equal(document.activeElement, all[1]);
    assert.equal(settingsUI.changed.length, 0);
  } finally {
    await ui.close();
  }
});

test("rules in a hidden pane update the shared form and readonly panes remain navigable", async () => {
  const descriptor = tabs();
  descriptor.tabs[1].options.push({
    type: "switch",
    name: "enabled",
    text: "自动设置名称",
    default: false,
    rules: [
      {
        when: { $ref: "form.enabled", eq: true },
        set: { title: "规则同步的名称" },
      },
    ],
  });
  const ui = await mount([
    descriptor,
    {
      type: "group",
      text: "只读区",
      readOnly: true,
      children: [
        tabs({
          id: "readonly-tabs",
          tabs: [
            {
              id: "one",
              label: "只读第一项",
              options: [
                {
                  type: "text",
                  name: "locked",
                  text: "只读名称",
                  default: "保持原值",
                },
              ],
            },
            { id: "two", label: "只读第二项", options: [] },
          ],
        }),
      ],
    },
  ]);
  try {
    await click(tab("高级配置"));
    await click(document.querySelector('[aria-label="自动设置名称"]'));
    assert.equal(
      document.querySelector('[aria-label="名称"]').value,
      "规则同步的名称",
    );
    assert.equal(
      document.querySelector('[aria-label="只读名称"]').matches(":disabled"),
      true,
    );
    assert.equal(tab("只读第二项").matches(":disabled"), false);
    await click(tab("只读第二项"));
    assert.equal(tab("只读第二项").getAttribute("aria-selected"), "true");
  } finally {
    await ui.close();
  }
});

test("resource saves reveal the first missing field in an inactive tab", async () => {
  const descriptor = tabs();
  descriptor.tabs[1].options[0].required = true;
  const ui = await mount(
    [
      {
        type: "resource",
        id: "records",
        text: "记录",
        source: { endpoint: "/records", listPath: "items" },
        titleField: "title",
        actions: [{ kind: "edit", label: "编辑记录" }],
        editor: {
          options: [descriptor],
          defaults: {},
          update: {
            id: "save",
            method: "PATCH",
            endpoint: "/records/{item.id}",
            body: { title: ref("form.title"), notes: ref("form.notes") },
          },
        },
      },
    ],
    null,
    (method) =>
      method === "get"
        ? { items: [{ id: "r1", title: "现有名称", notes: "" }] }
        : { saved: true },
  );
  try {
    await click(button("编辑记录"));
    assert.equal(pane("高级配置").hidden, true);
    await click(button("保存"));
    assert.equal(pane("高级配置").hidden, false);
    assert.equal(
      settingsUI.calls.filter(([method]) => method === "patch").length,
      0,
    );
    await act(
      async () =>
        new Promise((resolve) => window.requestAnimationFrame(resolve)),
    );
    assert.equal(
      document.activeElement,
      document.querySelector('[aria-label="备注"]'),
    );
    await edit(document.querySelector('[aria-label="备注"]'), "已补充");
    await click(tab("基础信息"));
    await click(button("保存"));
    assert.deepEqual(
      settingsUI.calls.find(([method]) => method === "patch").slice(0, 3),
      ["patch", "/records/r1", { title: "现有名称", notes: "已补充" }],
    );
  } finally {
    await ui.close();
  }
});

test("JSON drafts remain mounted across tabs and hidden invalid drafts reveal their pane instead of saving", async () => {
  function DraftControl({ value, onChange }) {
    const host = useRef(null),
      draft = useRef(JSON.stringify(value));
    const [text, setText] = useState(draft.current);
    useEffect(() => {
      host.current._cwmJsonEditor = {
        readOnly: false,
        getValue: () => {
          try {
            return JSON.parse(draft.current);
          } catch {
            throw new Error("JSON 草稿格式错误");
          }
        },
      };
    }, []);
    return React.createElement(
      "div",
      { ref: host, className: "cwm-json-editor" },
      React.createElement("textarea", {
        "aria-label": "JSON 草稿",
        value: text,
        onChange: (event) => {
          draft.current = event.target.value;
          setText(draft.current);
          try {
            onChange(JSON.parse(draft.current));
          } catch {
            /* Invalid drafts stay local until corrected. */
          }
        },
      }),
    );
  }
  const unregister = registerSettingsComponent("test-json-draft", DraftControl);
  const descriptor = tabs();
  descriptor.tabs[1].options = [
    { type: "test-json-draft", name: "json", default: {} },
  ];
  const ui = await mount(
    [
      descriptor,
      {
        type: "actions",
        actions: [
          {
            id: "save-all",
            label: "保存全部",
            method: "POST",
            endpoint: "/save",
            body: ref("form"),
          },
        ],
      },
    ],
    null,
    () => ({ saved: true }),
  );
  try {
    await click(tab("高级配置"));
    const editor = document.querySelector('[aria-label="JSON 草稿"]');
    await edit(editor, "{");
    await click(tab("基础信息"));
    assert.equal(editor.value, "{");
    await click(button("保存全部"));
    assert.equal(pane("高级配置").hidden, false);
    assert.equal(document.querySelector('[aria-label="JSON 草稿"]'), editor);
    assert.equal(editor.value, "{");
    assert.equal(settingsUI.calls.length, 0);
    assert.match(settingsUI.errors.at(-1)[0], /JSON 草稿格式错误/);
    await act(
      async () =>
        new Promise((resolve) => window.requestAnimationFrame(resolve)),
    );
    assert.equal(document.activeElement, editor);
    await edit(editor, '{"okay":true}');
    await click(tab("基础信息"));
    await click(button("保存全部"));
    assert.deepEqual(settingsUI.calls[0].slice(0, 3), [
      "post",
      "/save",
      { title: "原始名称", json: { okay: true } },
    ]);
  } finally {
    await ui.close();
    unregister();
  }
});
