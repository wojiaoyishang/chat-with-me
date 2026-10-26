import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import Observation from "../src/features/tasks/observation-components.js";

const snapshot = (components, scope = "task") => ({ version: 1, revision: 1, scopes: { [scope]: { kind: scope === "task" ? "task" : "node", title: "测试", components } } });
function setup(t, options = {}) {
  const dom = new JSDOM('<div id="host"></div>');
  const host = dom.window.document.getElementById("host");
  const renderer = Observation.createRenderer(host, options);
  t.after(() => { renderer.dispose(); dom.window.close(); });
  return { host, renderer, dom };
}
const click = (node, dom) => node.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
const settle = () => new Promise((resolve) => setTimeout(resolve, 10));

test("new node metrics, nested groups and visibility render without a frontend field list", (t) => {
  const { host, renderer } = setup(t);
  const value = snapshot([
    { id: "notes", type: "group", title: "资料", layout: "grid", components: [
      { id: "arbitrary", type: "indicator", title: "已整理参考文献", value: 1234, format: "number", unit: "篇" },
      { id: "missing", type: "indicator", title: "尚未确认", value: null, format: "number" },
      { id: "detail", type: "indicator", title: "详细值", value: 2, visibility: "detail" },
    ] },
    { id: "future", type: "new-widget", title: "未来组件" },
  ]);
  renderer.update(value, { scopeId: "task", view: "summary", compact: true });
  assert.match(host.textContent, /已整理参考文献1,234 篇/);
  assert.match(host.textContent, /尚未确认未知/);
  assert.doesNotMatch(host.textContent, /详细值/);
  assert.match(host.textContent, /未来组件.*暂不支持/);
  renderer.update(value, { scopeId: "task", view: "detail" });
  assert.match(host.textContent, /详细值2/);
  renderer.update({ runtime: { workflowMetrics: { activeRequests: 4 } } });
  assert.equal(host.textContent, "", "old task protocols are not read");
});

test("request activity is a shared component and missing fields stay unknown", (t) => {
  const { host, renderer } = setup(t);
  renderer.update(snapshot([{ id: "requests", type: "request-activity", title: "外部请求", active: 2, total: 9, peak: 3, description: "响应未结束的外部请求；不含空闲连接" }]));
  assert.match(host.textContent, /存在连接数2/);
  assert.match(host.textContent, /失败请求未知/);
  assert.doesNotMatch(host.textContent, /GPU/);
  assert.equal(Observation.format(2048, "bytes"), "2.0 KB");
  assert.equal(Observation.format(null, "duration"), "未知");
  assert.equal(Observation.format({ value: 2 }), "未知");
});

test("unrelated node updates preserve DOM and stale scoped data is ignored", (t) => {
  const { host, renderer } = setup(t);
  const value = snapshot([{ id: "metric", type: "indicator", title: "自定义数量", value: 4 }]);
  renderer.update(value, { taskId: "same", scopeId: "task" });
  const element = host.firstElementChild;
  renderer.update({ ...structuredClone(value), revision: 2, scopes: { ...value.scopes, "node:other": { components: [] } } }, { taskId: "same", scopeId: "task" });
  assert.equal(host.firstElementChild, element, "another node must not rebuild an unchanged panel");
  renderer.update({ ...snapshot([{ id: "metric", type: "indicator", title: "旧数量", value: 1 }]), revision: 1 }, { taskId: "same", scopeId: "task" });
  assert.match(host.textContent, /自定义数量4/);
});

test("model usage keeps unknown tokens and source explanations across updates", (t) => {
  const { host, renderer } = setup(t);
  const value = snapshot([{ id: "usage", type: "model-usage", title: "模型用量", summary: { inputTokens: 10, unknownCalls: 1 }, stages: [{ id: "a", title: "提取", usage: { inputTokens: 10, totalTokens: 15 } }], rows: [{ id: "call", stage: "提取", modelId: "model-a", status: "failed", usage: { inputTokens: 10, provenance: { inputTokens: "provider", outputTokens: "estimated", totalTokens: "derived" } } }] }]);
  renderer.update(value, { taskId: "t" });
  assert.match(host.textContent, /总 Token未知/);
  assert.match(host.textContent, /1 次请求未提供用量/);
  assert.match(host.textContent, /model-a/);
  assert.match(host.textContent, /混合来源（含估算）/);
  const calls = host.querySelector('[data-observation-key="task:usage:calls"]');
  const source = host.querySelector(".usage-source");
  calls.open = source.open = true;
  renderer.update(structuredClone(value), { taskId: "t" });
  assert.equal(host.querySelector('[data-observation-key="task:usage:calls"]').open, true);
  assert.equal(host.querySelector(".usage-source").open, true);
  assert.doesNotMatch(host.textContent, /\[object Object\]/);
});

test("generic table paging requests only user-selected pages and preserves them on refresh", async (t) => {
  const calls = [], { host, renderer, dom } = setup(t);
  const value = snapshot([{ id: "examples", type: "table", title: "资料明细", columns: [{ key: "name", title: "名称" }], rows: [{ id: "one", name: "第一页" }], pagination: { offset: 0, limit: 1, total: 2, hasMore: true } }]);
  const options = { taskId: "task-a", scopeId: "task", loadRows: async (request) => { calls.push(request); return { rows: [{ id: "two", name: "<img src=x onerror=alert(1)>" }], offset: 1, limit: 1, total: 2, hasMore: false }; } };
  renderer.update(value, options);
  assert.equal(calls.length, 0);
  host.querySelector("details").open = true;
  click([...host.querySelectorAll("button")].find((node) => node.textContent === "下一页"), dom);
  await settle();
  assert.deepEqual(calls, [{ scope: "task", component: "examples", offset: 1, limit: 1 }]);
  assert.equal(host.querySelector("img"), null);
  assert.match(host.textContent, /<img src=x/);
  renderer.update(structuredClone(value), options);
  assert.match(host.textContent, /第 2 页/);
  assert.equal(host.querySelector("details").open, true);
});

test("opening node model details loads its first page even below the page limit", async (t) => {
  const calls = [], { host, renderer } = setup(t);
  const value = snapshot([{ id: "usage", type: "model-usage", title: "模型用量", summary: {}, stages: [], rows: [], pagination: { offset: 0, limit: 50, total: 2, hasMore: true } }], "node:n");
  renderer.update(value, { taskId: "task-a", scopeId: "node:n", loadRows: async (request) => {
    calls.push(request);
    return { rows: [{ id: "call-1", model: "真实模型", usage: { totalTokens: 3 } }], offset: 0, limit: 50, total: 2, hasMore: false };
  } });
  assert.equal(calls.length, 0);
  host.querySelector('[data-observation-key="node:n:usage:calls"]').open = true;
  await settle();
  assert.deepEqual(calls, [{ scope: "node:n", component: "usage", offset: 0, limit: 50 }]);
  assert.match(host.textContent, /真实模型/);
  assert.equal(host.querySelector('[data-observation-key="node:n:usage:calls"]').open, true);
});

test("a pending page response never leaks into a newly selected task", async (t) => {
  let finish;
  const { host, renderer, dom } = setup(t);
  const value = snapshot([{ id: "rows", type: "table", title: "明细", columns: [{ key: "name", title: "名称" }], rows: [], pagination: { offset: 0, limit: 1, total: 2, hasMore: true } }]);
  renderer.update(value, { taskId: "first", loadRows: () => new Promise((resolve) => { finish = resolve; }) });
  click([...host.querySelectorAll("button")].find((node) => node.textContent === "下一页"), dom);
  renderer.update(snapshot([{ id: "new", type: "indicator", title: "新任务", value: 1 }]), { taskId: "second" });
  finish({ rows: [{ name: "旧任务内容" }], offset: 1, limit: 1, total: 2, hasMore: false });
  await settle();
  assert.match(host.textContent, /新任务1/);
  assert.doesNotMatch(host.textContent, /旧任务内容/);
});

test("unknown progress never creates a fabricated percentage; scope selection stays independent", (t) => {
  const { host, renderer } = setup(t);
  const value = snapshot([{ id: "parse", type: "progress", title: "解析", completed: 4, total: null, unit: "页", message: "正在读取…" }], "node:n");
  renderer.update(value, { scopeId: "node:n" });
  assert.equal(host.querySelector("progress"), null);
  assert.match(host.querySelector('[role="progressbar"]').getAttribute("aria-label"), /总量未知/);
  assert.match(host.textContent, /正在读取/);
  renderer.update(value, { scopeId: "task" });
  assert.equal(host.textContent, "");
});

test("artifact references never turn untrusted URL schemes into links", (t) => {
  const { host, renderer } = setup(t);
  renderer.update(snapshot([{ id: "files", type: "artifacts", title: "产物", items: [
    { url: "cwm://artifact/abc", filename: "计划.pdf", size: 2048 },
    { url: "javascript:alert(1)", filename: "无效引用" },
  ] }]), { artifactUrl: (id) => `/api/upload/${id}` });
  assert.equal(host.querySelectorAll("a").length, 1);
  assert.equal(host.querySelector("a").getAttribute("href"), "/api/upload/abc");
});

test("the React renderer copy is generated from the backend canonical source", async () => {
  const canonical = await readFile(new URL("../../../Python/Chat-With-Me-Backend/application/management_pages/static/observation-components.js", import.meta.url), "utf8");
  const generated = await readFile(new URL("../src/features/tasks/observation-components.js", import.meta.url), "utf8");
  assert.ok(generated.includes(canonical.replace(/\r\n?/g, "\n").trimEnd()));
});
