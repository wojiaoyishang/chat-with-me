import test from "node:test";
import assert from "node:assert/strict";
import {
  mountSettingsPage,
  button,
  click,
  edit,
  ref,
  act,
} from "./helpers/settingsRuntimeHarness.mjs";

const catalog = [
  {
    scope: "backend",
    id: "external-plugin",
    name: "插件提供的设置",
    descriptor: "/custom/page-definition",
  },
];
const page = {
  schema: "cwm.settings.v1",
  scope: "backend",
  id: "external-plugin",
  title: "自定义组件树",
  saveMode: "page",
  options: [{ type: "text", name: "nested.title", text: "自定义字段" }],
  defaultOptions: { nested: { title: "服务器初值" } },
  save: {
    id: "save",
    label: "应用配置",
    endpoint: "/custom/save-definition",
    method: "POST",
    body: { setting: ref("form.nested.title") },
  },
};

test("browser preferences and saved connections work without requesting backend settings", async () => {
  const ui = await mountSettingsPage(() => {
    throw new Error("backend unavailable");
  }, null);
  try {
    assert.equal(
      document
        .querySelector('[role="tab"][aria-label="前端设置"]')
        .getAttribute("aria-selected"),
      "true",
    );
    assert.equal(settingsUI.calls.length, 0);
    await click(document.querySelector('[aria-label="紧凑显示对话列表"]'));
    assert.deepEqual(settingsUI.localWrites.at(-1), [
      "CompactConversationList",
      true,
      { key: "CompactConversationList" },
    ]);
    settingsUI.backendProfiles = [
      { id: "default", title: "本机服务", url: "/api", active: true },
    ];
    await click(button("后端连接"));
    assert.match(document.body.textContent, /本机服务/);
    assert.equal(settingsUI.calls.length, 0);
    assert.equal(button("使用此后端").disabled, true);
  } finally {
    await ui.close();
  }
});

test("frontend notification preferences read type data and remain usable when it is unavailable", async () => {
  const ui = await mountSettingsPage((_method, url) => {
    assert.equal(url, "/notification/types");
    throw new Error("offline");
  });
  try {
    await click(button("通知"));
    assert.ok(document.querySelector('[aria-label="启用系统通知"]'));
    assert.match(document.body.textContent, /已有提醒偏好仍然保留/);
    assert.deepEqual(
      settingsUI.calls.map(([, url]) => url),
      ["/notification/types"],
    );
    await click(button("界面"));
    assert.ok(document.querySelector('[aria-label="知识图谱节点动画"]'));
  } finally {
    await ui.close();
  }
});

test("notification rows remain aligned in one searchable list and preserve toggles across filtering", async () => {
  const ui = await mountSettingsPage(() => ({
    types: [
      { typeId: "workflow.finished", name: "任务完成", category: "任务" },
      { typeId: "document.ready", name: "文档完成", category: "文档" },
    ],
  }));
  try {
    await click(button("通知"));
    const search = document.querySelector('[aria-label="搜索通知类型"]');
    await edit(search, "document.ready");
    assert.equal(document.querySelector('[aria-label="任务完成"]'), null);
    await click(document.querySelector('[aria-label="文档完成"]'));
    assert.deepEqual(settingsUI.localWrites.at(-1), [
      "notificationSubscriptionsV1",
      { "document.ready": { toast: false } },
      {
        key: "notificationSubscriptionsV1",
        scope: "backend-user",
        path: ["document.ready", "toast"],
      },
    ]);
    await edit(search, "不存在");
    assert.match(document.body.textContent, /没有匹配的通知类型/);
    await edit(search, "");
    assert.equal(
      document.querySelector('[aria-label="文档完成"]').checked,
      false,
    );
    assert.ok(document.querySelector('[aria-label="任务完成"]'));
  } finally {
    await ui.close();
  }
});

test("backend directories require an explicit backend scope without filtering business IDs", async () => {
  const ui = await mountSettingsPage(() => [
    { id: "interface", name: "旧目录项", descriptor: "/old/page" },
  ]);
  try {
    await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
    assert.match(document.body.textContent, /更新并重新加载后端服务/);
    assert.equal(button("旧目录项"), undefined);
    assert.deepEqual(
      settingsUI.calls.map(([, url]) => url),
      ["/custom/settings-index"],
    );
    await click(document.querySelector('[role="tab"][aria-label="前端设置"]'));
    assert.ok(document.querySelector('[aria-label="紧凑显示对话列表"]'));
  } finally {
    await ui.close();
  }
});

test("the settings shell loads its declared catalog and page URL then saves declared fields", async () => {
  const ui = await mountSettingsPage((method, url) =>
    method === "post"
      ? { values: { nested: { title: "新值" } } }
      : url === "/custom/settings-index"
        ? catalog
        : page,
  );
  try {
    await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
    assert.deepEqual(
      settingsUI.calls.slice(0, 2).map(([, url]) => url),
      ["/custom/settings-index", "/custom/page-definition"],
    );
    assert.equal(
      document.querySelector('[aria-label="自定义字段"]').value,
      "服务器初值",
    );
    assert.equal(button("应用配置").disabled, true);
    await edit(document.querySelector('[aria-label="自定义字段"]'), "新值");
    await click(button("应用配置"));
    assert.deepEqual(
      settingsUI.calls.find(([method]) => method === "post").slice(0, 3),
      ["post", "/custom/save-definition", { setting: "新值" }],
    );
    assert.equal(button("应用配置").disabled, true);
  } finally {
    await ui.close();
  }
});

test("missing manifest settings capability is visible and never calls a legacy endpoint", async () => {
  const ui = await mountSettingsPage(() => [], null);
  try {
    assert.match(document.body.textContent, /仅此浏览器/);
    assert.equal(settingsUI.calls.length, 0);
    await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
    assert.match(document.body.textContent, /没有提供设置功能/);
    assert.equal(settingsUI.calls.length, 0);
    await click(document.querySelector('[role="tab"][aria-label="前端设置"]'));
    assert.ok(document.querySelector('[aria-label="紧凑显示对话列表"]'));
  } finally {
    await ui.close();
  }
});

test("save conflicts retain the active draft and confirmation portals do not close the page", async () => {
  const ui = await mountSettingsPage((method, url) => {
    if (method === "post")
      throw Object.assign(new Error("修改版本冲突"), { code: 409 });
    return url === "/custom/settings-index" ? catalog : page;
  });
  try {
    await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
    await edit(
      document.querySelector('[aria-label="自定义字段"]'),
      "仍需保留的草稿",
    );
    await click(button("应用配置"));
    assert.equal(
      document.querySelector('[aria-label="自定义字段"]').value,
      "仍需保留的草稿",
    );
    assert.match(document.body.textContent, /修改版本冲突/);
    settingsUI.autoConfirm = false;
    await click(document.querySelector('[aria-label="关闭设置"]'));
    assert.ok(document.querySelector('[role="alertdialog"]'));
    await click(button("取消"));
    assert.equal(settingsUI.closed, undefined);
    assert.equal(settingsUI.confirmations.length, 1);
    assert.equal(
      document.querySelector('[aria-label="自定义字段"]').value,
      "仍需保留的草稿",
    );
  } finally {
    await ui.close();
  }
});

test("a delayed descriptor response cannot replace the subsequently selected page", async () => {
  let release;
  const delayed = new Promise((resolve) => {
    release = resolve;
  });
  const ui = await mountSettingsPage((_method, url) =>
    url === "/custom/settings-index"
      ? [
          ...catalog,
          {
            scope: "backend",
            id: "other",
            name: "另一个页面",
            descriptor: "/custom/other",
          },
        ]
      : url === "/custom/page-definition"
        ? delayed
        : {
            ...page,
            id: "other",
            title: "正确页面",
            save: undefined,
            saveMode: "actions",
          },
  );
  try {
    await click(document.querySelector('[role="tab"][aria-label="后端设置"]'));
    await click(button("另一个页面"));
    await act(async () => release({ ...page, title: "过期页面" }));
    assert.match(document.body.textContent, /正确页面/);
    assert.doesNotMatch(document.body.textContent, /过期页面/);
    assert.equal(button("应用配置"), undefined);
  } finally {
    await ui.close();
  }
});
