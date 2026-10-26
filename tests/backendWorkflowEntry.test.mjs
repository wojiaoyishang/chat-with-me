import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../Python/Chat-With-Me-Backend/application/management_pages");
const script = await readFile(path.join(root, "static/management.js"), "utf8");
const template = await readFile(path.join(root, "templates/management.html"), "utf8");
const settle = () => new Promise((resolve) => setTimeout(resolve, 25));

async function page(embedded = false) {
  const html = template.replace("{{ config | tojson }}", JSON.stringify({ kind: "tasks", apiBase: "/api" })).replace("{{ stylesheet | safe }}", "").replace("{{ script | safe }}", "");
  const dom = new JSDOM(html, { url: "http://localhost/api/tasks/page", runScripts: "outside-only", pretendToBeVisual: true });
  const calls = [], messages = [];
  if (embedded) Object.defineProperty(dom.window, "parent", { value: { postMessage: (message, origin) => messages.push({ message, origin }) } });
  dom.window.matchMedia = () => ({ matches: false });
  dom.window.HTMLElement.prototype.scrollIntoView = function () {};
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  dom.window.fetch = async (url, options = {}) => {
    calls.push({ url, ...options });
    const data = url === "/api/tasks/definitions"
      ? { definitions: [{ kind: "workflow.run", name: "工作流", creationForm: { workflowEditor: true } }] }
      : url === "/api/tasks?limit=200" ? { tasks: [] } : null;
    assert.ok(data, `Unexpected request ${url}`);
    return { ok: true, status: 200, json: async () => ({ success: true, data }) };
  };
  dom.window.eval(script);
  await settle();
  return { dom, document: dom.window.document, calls, messages };
}

test("embedded task creation opens the workflow template picker without an old upload task", async (t) => {
  const { dom, document, calls, messages } = await page(true);
  t.after(() => dom.window.close());
  document.getElementById("create").click();
  document.getElementById("quick-template-run").click();
  const entry = messages.find(({message}) => message.type === "cwm.workflow-editor");
  assert.equal(entry.message.mode, "quick-run");
  assert.equal(entry.origin, "http://localhost");
  assert.equal(document.getElementById("extraction-files"), null);
  assert.equal(calls.some((call) => call.method === "POST"), false);
});

test("standalone task page explains the current workflow entry instead of submitting a retired type", async (t) => {
  const { dom, document, calls } = await page();
  t.after(() => dom.window.close());
  document.getElementById("create").click();
  document.getElementById("quick-template-run").click();
  assert.match(document.getElementById("notice").textContent, /模板工作流/);
  assert.equal(document.getElementById("create-dialog").open, false);
  assert.equal(calls.some((call) => call.method === "POST"), false);
});
