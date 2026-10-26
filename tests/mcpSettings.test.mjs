import assert from "node:assert/strict";
import test from "node:test";
import { applyToolPermissionsToStatus, collectToolPermissions } from "../src/features/tools/toolPermissions.js";
import {
  policyFor,
  serverDraft,
  serverPayload,
  TERMINAL_PROBE_STATES,
  updateToolPolicy,
} from "../src/features/mcp/settingsModel.js";

test("editing only submits supported settings and preserves masked secret keys", () => {
  const record = {
    id: "id",
    revision: 4,
    slug: "robot",
    title: "Robot",
    transport: "http",
    connection: {
      url: "http://localhost:9023/mcp",
      headers: { Authorization: "" },
    },
    tools: [{ name: "echo" }],
    configuredSecrets: { headers: ["Authorization"] },
  };
  const payload = serverPayload(serverDraft(record), record);
  assert.equal(payload.revision, 4);
  assert.deepEqual(payload.connection.headers, { Authorization: "" });
  assert.equal(Object.hasOwn(payload, "tools"), false);
  assert.equal(Object.hasOwn(payload, "configuredSecrets"), false);
});

test("stdio uses an argument array, and transport changes do not send stale HTTP fields", () => {
  const draft = serverDraft({
    slug: "local",
    title: "Local",
    connection: {
      url: "http://unused.invalid",
      headers: { Authorization: "" },
    },
  });
  Object.assign(draft, {
    transport: "stdio",
    command: "python",
    args: '["server.py", "--value=a b"]',
  });
  const payload = serverPayload(draft);
  assert.deepEqual(payload.connection.args, ["server.py", "--value=a b"]);
  assert.equal(Object.hasOwn(payload.connection, "url"), false);
  assert.equal(Object.hasOwn(payload.connection, "headers"), false);
  draft.args = '"server.py"';
  assert.throws(() => serverPayload(draft), /JSON/);
});

test("removing an existing secret row is explicit and duplicate keys are rejected", () => {
  const draft = serverDraft({
    slug: "remote",
    title: "Remote",
    connection: { headers: { Authorization: "" } },
  });
  draft.headers = [];
  assert.deepEqual(serverPayload(draft).connection.headers, {});
  draft.headers = [
    { key: "A", value: "one" },
    { key: "A", value: "two" },
  ];
  assert.throws(() => serverPayload(draft), /重复/);
});

test("tool overrides inherit and can reset to server defaults without losing other fields", () => {
  let policies = {
    "odd.tool": { enabled: true, execution: { promote: true } },
  };
  policies = updateToolPolicy(policies, "odd.tool", "default", "deny");
  assert.equal(
    policyFor({ defaults: { default: "allow" } }, "odd.tool", policies).default,
    "deny",
  );
  policies = updateToolPolicy(policies, "odd.tool", "default", undefined);
  assert.equal(
    policyFor({ defaults: { default: "ask" } }, "odd.tool", policies).default,
    "ask",
  );
  assert.deepEqual(policies["odd.tool"].execution, { promote: true });
});

test("terminal probe states do not include queued, paused or running work", () => {
  for (const state of ["completed", "failed", "cancelled", "interrupted"])
    assert.equal(TERMINAL_PROBE_STATES.has(state), true);
  for (const state of ["queued", "running", "paused"])
    assert.equal(TERMINAL_PROBE_STATES.has(state), false);
});

test("MCP permission paths retain dots and hyphens through composer state", () => {
  const name = "test_robot.odd.tool-name";
  const menu = [{ type: "group", name: "test_robot", children: [{ type: "tool", name, permissionKey: name, default: "ask" }] }];
  const status = applyToolPermissionsToStatus(menu, {}, { [name]: "deny" });
  assert.deepEqual(collectToolPermissions(menu, status), { [name]: "deny" });
});
