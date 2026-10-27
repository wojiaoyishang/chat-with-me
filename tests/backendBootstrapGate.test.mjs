import assert from "node:assert/strict";
import test from "node:test";
import {
  act,
  button,
  click,
  mountBootstrapGate,
} from "./helpers/settingsRuntimeHarness.mjs";

const manifest = {
  protocol: "cwm.client.v1",
  services: { settings: "/setting/tabs" },
};

test("the connection manager reuses local forms and cancelling a nested editor preserves its parent", async () => {
  const ui = await mountBootstrapGate((_method, url) => {
    assert.equal(url, "/client/bootstrap");
    return manifest;
  });
  try {
    assert.ok(document.querySelector("[data-application-ready]"));
    assert.equal(settingsUI.sessionChecks, 1);
    settingsUI.backendProfiles = [
      { id: "default", title: "本机服务", url: "/api", active: true },
    ];
    await act(async () =>
      window.dispatchEvent(new window.Event("cwm:backend-manage")),
    );
    const parentDialog = document.querySelector('[role="dialog"]');
    assert.ok(parentDialog);
    assert.match(parentDialog.textContent, /本机服务/);
    await click(button("添加连接"));
    assert.equal(document.querySelectorAll('[role="dialog"]').length, 2);
    assert.ok(document.querySelector('[aria-label="后端 API 地址"]'));
    await click(button("取消"));
    assert.equal(document.querySelectorAll('[role="dialog"]').length, 1);
    assert.equal(document.querySelector('[role="dialog"]'), parentDialog);
    assert.deepEqual(
      settingsUI.calls.map(([, url]) => url),
      ["/client/bootstrap"],
    );
    assert.equal(settingsUI.clientCalls, undefined);
  } finally {
    await ui.close();
  }
});

test("an unavailable backend still offers local connection management without resubmitting bootstrap", async () => {
  const ui = await mountBootstrapGate(() => {
    throw new Error("连接不可达");
  });
  try {
    assert.match(document.body.textContent, /连接不可达/);
    assert.equal(document.querySelector("[data-application-ready]"), null);
    await click(button("管理连接"));
    await click(button("添加连接"));
    assert.ok(document.querySelector('[aria-label="连接名称"]'));
    assert.equal(settingsUI.calls.length, 1);
    assert.equal(settingsUI.sessionChecks, undefined);
    await click(button("取消"));
  } finally {
    await ui.close();
  }
});

test("an unauthenticated session reaches the application login flow but other session failures stay in recovery", async () => {
  const first = await mountBootstrapGate(
    () => manifest,
    Object.assign(new Error("请登录"), { code: 401 }),
  );
  try {
    assert.ok(document.querySelector("[data-application-ready]"));
  } finally {
    await first.close();
  }
  const second = await mountBootstrapGate(
    () => manifest,
    Object.assign(new Error("会话服务不可用"), { code: 503 }),
  );
  try {
    assert.equal(document.querySelector("[data-application-ready]"), null);
    assert.match(document.body.textContent, /会话服务不可用/);
    assert.ok(button("管理连接"));
  } finally {
    await second.close();
  }
});
