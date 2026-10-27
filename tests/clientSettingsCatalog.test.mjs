import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import {
  CLIENT_SETTINGS_TABS,
  clientSettingsPage,
  filterClientSettingsOptions,
} from "../src/features/settings-client/catalog.js";

function fields(options) {
  return options.flatMap((item) => [item, ...fields(item.children || [])]);
}

test("client catalogs own only browser preferences and explicitly preserve storage contracts", () => {
  assert.deepEqual(
    CLIENT_SETTINGS_TABS.map((item) => item.id),
    ["interface", "connections", "notifications"],
  );
  const page = clientSettingsPage("interface");
  assert.equal(page.scope, "client");
  assert.equal(page.saveMode, "immediate");
  assert.equal(page.layout.columns, 1);
  assert.ok(page.options.every((item) => item.variant === "divided"));
  const preferences = fields(page.options).filter((item) => item.storage);
  assert.equal(preferences.length, 10);
  assert.equal(
    preferences.find((item) => item.name === "KnowledgeGraphPhysicsAnimation")
      .default,
    true,
  );
  assert.equal(
    preferences.find(
      (item) => item.name === "AutoCollapseCompletedToolCallsInExecutionWindow",
    ).default,
    false,
  );
  assert.ok(preferences.every((item) => item.storage.key === item.name));
  assert.throws(() => clientSettingsPage("mcp"), /不存在/);
});

test("local connection descriptions use current client capabilities and safe manual actions", () => {
  const [resource] = clientSettingsPage("connections").options;
  assert.equal(resource.source.endpoint, "client:backends");
  assert.equal(resource.editor.create.clientAction, "backend.save");
  const switchAction = resource.actions.find(
    (item) => item.id === "switch-connection",
  );
  assert.equal(switchAction.clientAction, "backend.switch");
  assert.equal(switchAction.confirm.confirmText, "切换");
  assert.ok(
    resource.actions.find((item) => item.id === "delete-connection")
      .disabledWhen,
  );
});

test("client tabs reuse their familiar icons without depending on backend resources", async () => {
  assert.equal(
    CLIENT_SETTINGS_TABS.find((item) => item.id === "interface").icon,
    "layout",
  );
  assert.equal(
    CLIENT_SETTINGS_TABS.find((item) => item.id === "notifications").icon,
    "bell",
  );
  const connection = CLIENT_SETTINGS_TABS.find(
    (item) => item.id === "connections",
  );
  assert.equal(connection.preview, "/settings/developer.svg");
  assert.equal(clientSettingsPage("connections").preview, connection.preview);
  assert.ok(!connection.preview.startsWith("cwm://"));
  assert.match(
    await readFile(
      new URL("../public/settings/developer.svg", import.meta.url),
      "utf8",
    ),
    /viewBox="0 0 1024 1024"/,
  );
});

test("notification data adds literal per-type client preferences without supplying page UI", () => {
  const page = clientSettingsPage("notifications", {
    permission: "granted",
    types: [
      {
        typeId: "workflow.finished",
        name: "工作流完成",
        category: "后台任务",
        defaultSubscribed: false,
      },
    ],
  });
  const entry = fields(page.options).find((item) => item.text === "工作流完成");
  assert.equal(page.layout.columns, 1);
  assert.ok(
    page.options
      .filter((item) => item.type === "group")
      .every((item) => item.variant === "plain"),
  );
  assert.equal(entry.density, "compact");
  assert.deepEqual(entry.name, ["workflow.finished"]);
  assert.equal(entry.default, false);
  assert.deepEqual(entry.storage, {
    key: "notificationSubscriptionsV1",
    scope: "backend-user",
    path: ["workflow.finished", "toast"],
  });
  const unavailable = clientSettingsPage("notifications", { error: "offline" });
  assert.ok(
    fields(unavailable.options).some(
      (item) => item.name === "systemNotificationsEnabled",
    ),
  );
  assert.ok(
    unavailable.options.some((item) =>
      /已有提醒偏好仍然保留/.test(item.text || ""),
    ),
  );
});

test("notification search keeps system controls and type storage unchanged", () => {
  const page = clientSettingsPage("notifications", {
    permission: "granted",
    types: [
      { typeId: "workflow.finished", name: "工作流完成", category: "任务" },
      { typeId: "document.ready", name: "文档完成", category: "文档" },
    ],
  });
  const original = structuredClone(page.options);
  const result = filterClientSettingsOptions(page.options, "document.ready");
  assert.equal(
    fields(result).filter((item) => item.type === "switch").length,
    2,
  );
  assert.ok(
    fields(result).some((item) => item.name === "systemNotificationsEnabled"),
  );
  assert.deepEqual(
    fields(result).find((item) => item.text === "文档完成").storage.path,
    ["document.ready", "toast"],
  );
  assert.deepEqual(page.options, original);
  assert.ok(
    filterClientSettingsOptions(page.options, "不存在").some(
      (item) => item.text === "没有匹配的通知类型",
    ),
  );
});

test("notification category display labels leave category and type identities intact", () => {
  const page = clientSettingsPage("notifications", {
    types: [
      {
        typeId: "workflow.finished",
        name: "工作流完成",
        category: "tasks",
        categoryLabel: "后台任务",
      },
    ],
  });
  const category = page.options.find((item) => item.id === "tasks");
  assert.equal(category.text, "后台任务");
  assert.deepEqual(category.children[0].storage.path, [
    "workflow.finished",
    "toast",
  ]);
  const unknown = clientSettingsPage("notifications", {
    types: [{ typeId: "plugin.result", category: "plugin-events" }],
  });
  assert.equal(
    unknown.options.find((item) => item.id === "plugin-events").text,
    "plugin-events",
  );
});
