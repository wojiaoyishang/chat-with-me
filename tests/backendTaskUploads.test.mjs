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
const definition = {
  kind: "knowledge.extract", name: "知识提取", version: 2,
  creationForm: {
    preset: { sourceType: "file" },
    upload: { field: "resources", endpoint: "/upload/", accept: ".txt,.md,.docx,.png", multiple: true, maxFiles: 100, maxFileBytes: 50 * 1024 * 1024, maxTotalBytes: 100 * 1024 * 1024 },
    basicFields: ["schema"], advancedFields: ["title", "modelId", "policyId"],
  },
  parameterSchema: { required: ["sourceType"], properties: {
    sourceType: { type: "string", enum: ["file", "text", "image", "document"] },
    text: { type: "string" },
    schema: { type: "string", enum: ["default", "context"], enumNames: ["通用知识", "会话与记忆"], default: "default" },
    modelId: { type: "string", title: "指定模型" },
    policyId: { type: "string", title: "权限范围" },
  } },
};

async function page() {
  const html = template.replace("{{ config | tojson }}", JSON.stringify({ kind: "tasks", apiBase: "/api" })).replace("{{ stylesheet | safe }}", "").replace("{{ script | safe }}", "");
  const dom = new JSDOM(html, { url: "http://localhost/api/tasks/page", runScripts: "outside-only", pretendToBeVisual: true });
  const calls = [];
  dom.window.matchMedia = () => ({ matches: false });
  dom.window.HTMLElement.prototype.scrollIntoView = function () {};
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  dom.window.fetch = async (url, options = {}) => {
    calls.push({ url, ...options });
    let data;
    if (url === "/api/tasks/definitions") data = { definitions: [definition] };
    else if (url === "/api/tasks?limit=200") data = { tasks: [] };
    else if (url === "/api/upload/") {
      assert.ok(options.body instanceof dom.window.FormData);
      assert.equal(options.headers["Content-Type"], undefined);
      const file = options.body.get("file");
      data = { artifactId: file.name === "说明.md" ? "markdown-1" : "picture-1" };
    } else if (url === "/api/tasks" && options.method === "POST") data = { taskId: "new-task" };
    else if (url === "/api/tasks/new-task/details") data = { taskId: "new-task", title: "新任务", status: "queued", definition, stages: [], calls: [], usage: {} };
    else throw new Error(`Unexpected request ${url}`);
    return { ok: true, status: 200, json: async () => ({ success: true, data }) };
  };
  dom.window.eval(script);
  await settle();
  dom.window.document.getElementById("create").click();
  return { dom, document: dom.window.document, calls };
}

test("knowledge task creation uploads files and uses configured models by default", async (t) => {
  const { dom, document, calls } = await page();
  t.after(() => dom.window.close());
  assert.equal(document.querySelector('[name="text"]'), null);
  assert.equal(document.querySelector('[name="sourceType"]'), null);
  assert.equal(document.querySelector(".advanced-options").open, false);
  const input = document.getElementById("extraction-files");
  Object.defineProperty(input, "files", { configurable: true, value: [new dom.window.File(["# 文档"], "说明.md"), new dom.window.File(["image"], "图.png")] });
  input.dispatchEvent(new dom.window.Event("change"));
  assert.equal(document.querySelectorAll(".selected-file").length, 2);
  document.getElementById("create-form").dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  const uploads = calls.filter((call) => call.url === "/api/upload/");
  assert.equal(uploads.length, 2);
  const created = calls.find((call) => call.url === "/api/tasks" && call.method === "POST");
  assert.deepEqual(JSON.parse(created.body), { kind: "knowledge.extract", parameters: { sourceType: "file", schema: "default", resources: ["cwm://artifact/markdown-1", "cwm://artifact/picture-1"] } });
  assert.ok(calls.indexOf(created) > calls.indexOf(uploads[1]));
  assert.equal(document.getElementById("create-dialog").open, false);
});

test("file creation rejects empty selection and unsupported formats before upload", async (t) => {
  const { dom, document, calls } = await page();
  t.after(() => dom.window.close());
  document.getElementById("create-form").dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.match(document.getElementById("form-error").textContent, /先选择/);
  const input = document.getElementById("extraction-files");
  Object.defineProperty(input, "files", { configurable: true, value: [new dom.window.File(["binary"], "test.exe")] });
  input.dispatchEvent(new dom.window.Event("change"));
  assert.match(document.getElementById("form-error").textContent, /不支持/);
  assert.equal(calls.filter((call) => call.url === "/api/upload/").length, 0);
  assert.equal(document.querySelectorAll(".selected-file").length, 0);
});
