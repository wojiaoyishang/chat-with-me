export const NEW_MCP_SERVER = Object.freeze({
  slug: "",
  title: "",
  description: "",
  transport: "http",
  enabled: true,
  connectTimeout: 10,
  callTimeout: 120,
  maxConcurrency: 4,
});

export const TERMINAL_PROBE_STATES = new Set([
  "completed",
  "failed",
  "cancelled",
  "interrupted",
]);

export function serverDraft(record) {
  const connection = record?.connection || {};
  return {
    ...NEW_MCP_SERVER,
    ...Object.fromEntries(
      Object.keys(NEW_MCP_SERVER).map((key) => [
        key,
        record?.[key] ?? NEW_MCP_SERVER[key],
      ]),
    ),
    url: connection.url || "",
    command: connection.command || "",
    cwd: connection.cwd || "",
    args: JSON.stringify(connection.args || [], null, 2),
    headers: Object.entries(connection.headers || {}).map(([key]) => ({
      key,
      value: "",
    })),
    env: Object.entries(connection.env || {}).map(([key]) => ({
      key,
      value: "",
    })),
  };
}

function secretPairs(rows) {
  const result = {};
  for (const { key, value } of rows) {
    if (!key.trim())
      throw new Error("请填写每个请求头或环境变量的名称，或删除空白行。");
    if (Object.hasOwn(result, key)) throw new Error(`名称重复：${key}`);
    result[key] = value;
  }
  return result;
}

export function serverPayload(draft, record) {
  const payload = Object.fromEntries(
    Object.keys(NEW_MCP_SERVER).map((key) => [key, draft[key]]),
  );
  if (!payload.slug.trim() || !payload.title.trim())
    throw new Error("请填写工具集标识和名称。");
  if (record) payload.revision = record.revision;
  if (draft.transport === "stdio") {
    let args;
    try {
      args = JSON.parse(draft.args);
    } catch {
      throw new Error("命令参数需要填写为 JSON 字符串数组。");
    }
    if (!Array.isArray(args) || args.some((item) => typeof item !== "string"))
      throw new Error("命令参数需要填写为 JSON 字符串数组。");
    payload.connection = {
      command: draft.command,
      args,
      cwd: draft.cwd,
      env: secretPairs(draft.env),
    };
  } else {
    payload.connection = {
      url: draft.url,
      headers: secretPairs(draft.headers),
    };
  }
  return payload;
}

export function updateToolPolicy(policies, name, key, value) {
  const result = { ...policies, [name]: { ...(policies[name] || {}) } };
  if (value === undefined) delete result[name][key];
  else result[name][key] = value;
  if (!Object.keys(result[name]).length) delete result[name];
  return result;
}

export function policyFor(server, name, overrides = server.toolPolicies || {}) {
  return {
    enabled: true,
    default: "ask",
    directExposure: false,
    execution: { promote: false },
    ...(server.defaults || {}),
    ...(overrides[name] || {}),
  };
}
