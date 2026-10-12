import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../Python/Chat-With-Me-Backend/application/management_pages",
);
const script = await readFile(path.join(root, "static/management.js"), "utf8");
const template = await readFile(
  path.join(root, "templates/management.html"),
  "utf8",
);
const settle = () => new Promise((resolve) => setTimeout(resolve, 20));
async function page(
  kind,
  responder,
  { mobile = false, reducedMotion = false, animate = false, quickTimeout = false } = {},
) {
  const html = template
    .replace("{{ config | tojson }}", JSON.stringify({ kind, apiBase: "/api" }))
    .replace("{{ stylesheet | safe }}", "")
    .replace("{{ script | safe }}", "");
  const dom = new JSDOM(html, {
    url: `http://localhost/api/${kind}/page`,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const calls = [];
  const scrollCalls = [];
  const animations = [];
  dom.window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion")
      ? reducedMotion
      : mobile && query.includes("max-width"),
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {},
  });
  if (animate)
    dom.window.Element.prototype.animate = function (frames, options) {
      const record = { element: this, frames, options, cancelled: false };
      animations.push(record);
      return {
        finished: Promise.resolve(),
        cancel() {
          record.cancelled = true;
        },
      };
    };
  dom.window.HTMLElement.prototype.scrollIntoView = function () {
    scrollCalls.push(this.id);
  };
  dom.window.confirm = () => true;
  dom.window.Range.prototype.getClientRects = () => [];
  dom.window.Range.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, right: 1, bottom: 1, width: 1, height: 1 });
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  dom.window.fetch = async (url, options = {}) => {
    calls.push({ url, ...options });
    let value = await responder(url, options);
    if (new URL(url,'http://localhost').pathname.endsWith('/actions') && value?.node) value={nodeId:value.node.id,canWrite:value.node.canWrite===true,canManage:value.node.canManage===true,canDelete:value.node.canDelete===true};
    if (value instanceof Response) return value;
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: value }),
    };
  };
  if (quickTimeout) {
    const timeout = dom.window.setTimeout.bind(dom.window);
    dom.window.setTimeout = (callback, ms, ...args) => timeout(callback, ms === 20000 ? 30 : ms, ...args);
  }
  dom.window.eval(script);
  await settle();
  await settle();
  await settle();
  return { dom, document: dom.window.document, calls, scrollCalls, animations };
}

async function openNodeAction(dom, document, id, actionName) {
  document.querySelector(`.knowledge-node[data-node-id="${id}"]`).dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  await settle();
  const action=document.querySelector(`.graph-context-menu [data-action="${actionName}"]`);
  assert.ok(action && !action.hidden && !action.disabled, `${actionName} must be available`);
  action.click(); await settle();
}

test('knowledge property editor preserves unknown values and blocks invalid or reserved JSON before PUT', async (t) => {
  const node = { id: 'editable', name: '知识', canWrite: true, canManagePolicy: false, properties: { name: '知识', custom: false, count: 0, nested: { note: '保留' }, obsolete: 'remove', owner_user_id: 1 } };
  const { dom, document, calls } = await page('knowledge', (url) => {
    if (url.endsWith('/overview')) return { nodes: 1, relationships: 0, labels: ['Custom'] };
    if (url.includes('/nodes/editable') && !url.includes('/graph')) return { node, chunks: [], images: [], relationships: [] };
    return { nodes: [node], relationships: [], total: 1 };
  });
  t.after(() => dom.window.close());
  document.querySelector('[data-node-id="editable"]').dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })); await settle();
  await openNodeAction(dom, document, 'editable', 'node-edit');
  const editor = document.querySelector('.cwm-json-editor')._cwmJsonEditor;
  assert.equal(editor.getState().mode, 'form'); assert.equal(editor.getValue().custom, false);
  assert.equal(editor.getValue().owner_user_id, undefined);
  for (const draft of ['{', '{"name":"知识","owner_user_id":2}']) {
    editor.setDraft(draft); document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
    assert.equal(calls.filter((call) => call.method === 'PUT').length, 0); assert.equal(document.querySelector('#create-dialog').open, true);
  }
  document.querySelector('[name="name"]').value = '修改';
  editor.setDraft('{"custom":false,"count":0,"nested":{"note":"保留"}}');
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  const body = JSON.parse(calls.find((call) => call.method === 'PUT').body);
  assert.deepEqual(body.properties, { name: '修改', custom: false, count: 0, nested: { note: '保留' }, obsolete: null });
});

test('collection grant editor uses account search and independent permission controls instead of raw JSON', async (t) => {
  const { dom, document, calls } = await page('knowledge', (url) => {
    if (url.endsWith('/overview')) return { nodes: 0, labels: [] };
    if (url === '/api/knowledge/policies') return { policies: [{ id: 'user:1', title: '我的知识', canManage: true, grants: [] }] };
    if (url.includes('/share-users')) return { users: [{ userId: 2, username: 'bobby', nickname: '博比' }] };
    return { nodes: [], total: 0 };
  });
  t.after(() => dom.window.close());
  document.querySelector('#create').click(); await settle();
  [...document.querySelectorAll('button')].find((node) => node.textContent === '管理共享授权').click();
  [...document.querySelectorAll('.cwm-json-editor button')].find((node) => node.textContent.includes('添加项')).click();
  const search = document.querySelector('[aria-label="搜索共享账户"]'); search.value = 'bo'; search.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 280));
  [...document.querySelectorAll('.cje-picker-results button')].find((node) => node.textContent.includes('bobby')).click();
  const write = document.querySelector('[aria-label="允许写入"]'); write.checked = true; write.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  const body = JSON.parse(calls.find((call) => call.method === 'PUT').body);
  assert.deepEqual(body.grants, [{ userId: 2, conversationId: '', read: false, write: true, manage: false }]);
});

test("backend task descriptor renders stage statistics and routes task creation through templates", async (t) => {
  const definition = {
    kind: "knowledge.extract",
    name: "知识提取",
    version: 1,
    capabilities: { pause: true, pauseAfterStage: true, resume: true },
    parameterSchema: {
      required: ["sourceType"],
      properties: {
        sourceType: { enum: ["text", "image", "document"], default: "text" },
        text: { type: "string", ui: { visibleWhen: { sourceType: "text" } } },
        documentId: {
          type: "string",
          ui: { visibleWhen: { sourceType: "document" } },
        },
        revision: { type: ["integer", "string", "null"] },
        imageUris: {
          type: "array",
          ui: { visibleWhen: { sourceType: "image" } },
        },
      },
    },
  };
  let status = "running";
  const { dom, document, calls } = await page("tasks", (url, options) => {
    if (url === "/api/tasks/definitions") return { definitions: [definition] };
    if (url === "/api/tasks?limit=200")
      return {
        tasks: [
          {
            taskId: "task-1",
            title: "安装说明",
            kind: "knowledge.extract",
            status,
          },
        ],
      };
    if (url === "/api/tasks/task-1/details")
      return {
        task: { taskId: "task-1", title: "安装说明", status },
        definition,
        runtime: { activeSeconds: 61, elapsedSeconds: 80 },
        usage: {
          totalTokens: 300,
          inputTokens: 200,
          outputTokens: 100,
          knownCalls: 1,
        },
        stages: [
          {
            key: "extract",
            name: "提取",
            status: "running",
            usage: { totalTokens: 300, inputTokens: 200, outputTokens: 100 },
          },
        ],
      };
    if (url === "/api/tasks/task-1/pause") {
      status = "pause_requested";
      assert.equal(JSON.parse(options.body).afterStage, "extract");
      return {};
    }
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  assert.match(document.querySelector("#detail").textContent, /300/);
  assert.match(document.querySelector("#detail").textContent, /1 分 1 秒/);
  [...document.querySelectorAll("#detail button")]
    .find((node) => node.textContent === "此阶段后暂停")
    .click();
  await settle();
  assert.ok(calls.some((call) => call.url.endsWith("/pause")));
  document.querySelector("#create").click();
  assert.equal(document.querySelector("#create").getAttribute("aria-expanded"), "true");
  assert.equal(document.querySelectorAll("#task-create-menu [role=menuitem]").length, 1);
  assert.equal(document.querySelector("#quick-template-run").textContent, "快速模板新建");
  assert.equal(document.querySelector("#create-dialog").open, false);
  assert.equal(calls.some((call) => call.url === "/api/tasks" && call.method === "POST"), false);
});

test("knowledge conversation context reaches read, image, and edit APIs", async (t) => {
  const { dom, document, calls } = await page("knowledge", (url, options) => {
    const parsed = new URL(url, "http://localhost");
    if (parsed.pathname === "/api/knowledge/overview")
      return { nodes: 1, relationships: 0, chunks: 0, images: 1, labels: [] };
    if (
      ["/api/knowledge/search", "/api/knowledge/graph"].includes(
        parsed.pathname,
      )
    )
      return { nodes: [{ id: "node-1", name: "受限知识" }], total: 1 };
    if (
      parsed.pathname === "/api/knowledge/nodes/node-1" &&
      options.method === "PUT"
    ) {
      const body = JSON.parse(options.body);
      assert.equal(body.conversationId, "conversation-1");
      assert.deepEqual(body.properties, { name: "受限知识" });
      assert.equal(body.policyId, undefined);
      return {};
    }
    if (parsed.pathname === "/api/knowledge/nodes/node-1/actions")
      return {nodeId:'node-1',canWrite:true,canManage:false,canDelete:false};
    if (parsed.pathname === "/api/knowledge/nodes/node-1" || parsed.pathname === "/api/knowledge/nodes/node-1/edit-data")
      return {
        node: {
          id: "node-1",
          name: "受限知识",
          policyId: "policy-1",
          canWrite: true,
          canManage: false,
          properties: {
            name: "受限知识",
            knowledge_id: "node-1",
            knowledge_key: "key",
            uri: "cwm://artifact/source",
            source_metadata: "{}",
            acl_id: "policy-1",
            owner_user_id: 1,
          },
        },
      };
    if (parsed.pathname === "/api/knowledge/nodes/node-1/images")
      return { images: [{ id: "image-1", url: "/api/knowledge/images/image-1/content" }] };
    if (parsed.pathname === "/api/knowledge/policies")
      return { policies: [{ id: "policy-1", title: "会话知识" }] };
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  document.querySelector("#scope-context").click();
  document.querySelector("[name=conversationId]").value = "conversation-1";
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.ok(
    calls.some(
      (call) =>
        call.url.includes("/knowledge/graph?") &&
        call.url.includes("conversationId=conversation-1"),
    ),
  );
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  document.querySelector('#detail details[data-key="images:node-1"]').open = true;
  await settle();
  assert.ok(
    document
      .querySelector(".image-card img")
      .src.endsWith("/content?conversationId=conversation-1"),
  );
  await openNodeAction(dom, document, 'node-1', 'node-edit');
  await settle();
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.ok(calls.some((call) => call.method === "PUT"));
  assert.ok(
    !calls.some((call) => call.url.startsWith("/api/knowledge/policies")),
  );
});

test("unknown token usage remains unknown and partial completed tasks expose retry", async (t) => {
  const task = {
      taskId: "task-1",
      kind: "knowledge.extract",
      title: "部分提取",
      status: "completed",
      result: { partial: true },
    },
    definition = { kind: "knowledge.extract", capabilities: { retry: true } };
  const { dom, document } = await page("tasks", (url) =>
    url === "/api/tasks/definitions"
      ? { definitions: [definition] }
      : url === "/api/tasks?limit=200"
        ? { tasks: [task] }
        : {
            ...task,
            definition,
            usage: {
              totalTokens: null,
              inputTokens: null,
              outputTokens: null,
              knownCalls: 0,
              unknownCalls: 1,
            },
            stages: [],
            runtime: { activeSeconds: 2, elapsedSeconds: 4 },
          },
  );
  t.after(() => dom.window.close());
  const cards = [...document.querySelectorAll("#detail .stat")];
  assert.equal(
    cards
      .find((card) => card.textContent.startsWith("总 Token"))
      .querySelector("strong").textContent,
    "—",
  );
  assert.match(document.querySelector("#detail").textContent, /部分完成/);
  assert.ok(
    [...document.querySelectorAll("#detail button")].some(
      (node) => node.textContent === "重试失败部分",
    ),
  );
});

test("mobile initial selection does not scroll; explicit selection does", async (t) => {
  const { dom, document, scrollCalls } = await page(
    "tasks",
    (url) =>
      url === "/api/tasks/definitions"
        ? { definitions: [] }
        : url === "/api/tasks?limit=200"
          ? {
              tasks: [{ taskId: "task-1", title: "任务", status: "completed" }],
            }
          : { taskId: "task-1", status: "completed" },
    { mobile: true },
  );
  t.after(() => dom.window.close());
  assert.deepEqual(scrollCalls, []);
  document.querySelector(".list-item").click();
  assert.deepEqual(scrollCalls, ["detail"]);
  await settle();
});

test("administrator health section renders only server-provided indexes and constraints", async (t) => {
  const { dom, document } = await page("knowledge", (url) =>
    url === "/api/knowledge/overview"
      ? {
          nodes: 0,
          relationships: 0,
          chunks: 0,
          images: 0,
          labels: [],
          indexes: [{ name: "scoped_key", type: "RANGE", state: "ONLINE" }],
          constraints: [{ name: "scoped_unique", type: "UNIQUENESS" }],
        }
      : { nodes: [], total: 0 },
  );
  t.after(() => dom.window.close());
  assert.match(
    document.querySelector("[data-admin-health]").textContent,
    /ONLINE/,
  );
  assert.match(
    document.querySelector("[data-admin-health]").textContent,
    /scoped_unique/,
  );
  assert.equal(document.querySelector("[data-admin-health]").open, false);
});

test("task creation menu closes on Escape and outside click", async (t) => {
  const { dom, document } = await page("tasks", (url) => {
    if (url === "/api/tasks/definitions") return { definitions: [] };
    if (url === "/api/tasks?limit=200") return { tasks: [] };
    return { task: {}, stages: [], calls: [], usage: {} };
  });
  t.after(() => dom.window.close());
  const trigger = document.querySelector("#create");
  const menu = document.querySelector("#task-create-menu");
  trigger.click();
  assert.equal(menu.hidden, false);
  document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  assert.equal(menu.hidden, true);
  assert.equal(document.activeElement, trigger);
  trigger.click();
  document.body.dispatchEvent(new dom.window.PointerEvent("pointerdown", { bubbles: true }));
  assert.equal(menu.hidden, true);
});

test("knowledge body is lazy folded plain text and only same-origin images can open", async (t) => {
  const malicious = '<img src=x onerror="window.compromised=true">';
  const { dom, document, calls } = await page("knowledge", (url) => {
    if (url === "/api/knowledge/overview")
      return {
        nodes: 1,
        relationships: 0,
        chunks: 1,
        images: 1,
        labels: ["Entity"],
      };
    if (
      url.startsWith("/api/knowledge/search?") ||
      url.startsWith("/api/knowledge/graph?")
    )
      return {
        nodes: [
          { id: "node-1", name: "接口", properties: { summary: malicious } },
        ],
        total: 1,
      };
    if (url === "/api/knowledge/nodes/node-1")
      return {
        node: {
          id: "node-1",
          name: "接口",
          canWrite: false,
          properties: {
            name: "接口",
            type: "设备",
            description: malicious,
            summary: "简短概括也需要按需查看",
            recognized_text: "图中的文字内容",
            contextInterpretation: "结合上下文得到的图片说明",
            note: "较长的自定义字段\n也不直接铺开段落",
          },
        },
      };
    if (url === "/api/knowledge/nodes/node-1/images")
      return { images: [
          {
            id: "image-1",
            url: "https://evil.invalid/image.png",
            summary: "接线图",
          },
        ],
      };
    if (url === "/api/knowledge/images/image-1")
      return { url: "/api/resource/image-1", summary: "接口位置" };
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  assert.ok(!document.querySelector("#detail").textContent.includes("onerror"));
  assert.match(
    document.querySelector("#detail .property-grid").textContent,
    /接口/,
  );
  assert.match(
    document.querySelector("#detail .property-grid").textContent,
    /设备/,
  );
  for (const key of [
    "description",
    "summary",
    "recognized_text",
    "contextInterpretation",
    "note",
  ]) {
    const folded = document.querySelector(
      `#detail details[data-key="node-property:node-1:${key}"]`,
    );
    assert.ok(folded, `fold text field ${key}`);
    assert.equal(folded.open, false);
    assert.equal(folded.querySelector(".text-block"), null);
  }
  assert.equal(document.querySelectorAll("#detail .text-block").length, 0);
  const body = document.querySelector(
    '#detail details[data-key="node-property:node-1:description"]',
  );
  body.open = true;
  document.querySelector('#detail details[data-key="images:node-1"]').open = true;
  await settle();
  assert.equal(body.querySelector(".text-block").textContent, malicious);
  assert.match(document.querySelector("#detail").textContent, /onerror/);
  assert.equal(document.querySelectorAll("#detail img[src]").length, 0);
  assert.equal(dom.window.compromised, undefined);
  document.querySelector(".image-card").click();
  await settle();
  assert.equal(
    document.querySelector("#full-image").src,
    "http://localhost/api/resource/image-1",
  );
  assert.equal(document.querySelector("#image-dialog").open, true);
  assert.ok(calls.some((call) => call.url.endsWith("/images/image-1")));
});

test("unchanged task refresh keeps list and detail DOM stable and does not replay entrance animations", async (t) => {
  let title = "稳定任务";
  const { dom, document, animations } = await page(
    "tasks",
    (url) => {
      const task = {
        taskId: "motion-task",
        title,
        kind: "knowledge.extract",
        status: "running",
      };
      if (url === "/api/tasks/definitions") return { definitions: [] };
      if (url === "/api/tasks?limit=200") return { tasks: [task] };
      if (url === "/api/tasks/motion-task/details")
        return {
          task,
          stages: [],
          calls: [],
          usage: {},
          runtime: { activeSeconds: 12 },
        };
      throw new Error(`Unexpected task motion API ${url}`);
    },
    { animate: true },
  );
  t.after(() => dom.window.close());
  const listItem = document.querySelector("#list .list-item"),
    detailNode = document.querySelector("#detail").firstElementChild,
    animationCount = animations.length;
  assert.equal(typeof dom.window.CWMPageMotion?.enter, "function");
  assert.ok(
    animationCount > 0,
    "the generated page should include the shared motion helper",
  );
  assert.ok(listItem);
  assert.match(document.querySelector("#detail").textContent, /稳定任务/);
  document.querySelector("#refresh").click();
  await settle();
  assert.equal(document.querySelector("#list .list-item"), listItem);
  assert.equal(document.querySelector("#detail").firstElementChild, detailNode);
  assert.equal(
    animations.length,
    animationCount,
    "polling an unchanged task must not replay the whole list and details",
  );
  title = "更新后的任务";
  document.querySelector("#refresh").click();
  await settle();
  assert.match(document.querySelector("#list").textContent, /更新后的任务/);
  assert.match(document.querySelector("#detail").textContent, /更新后的任务/);
});

test("task detail refresh preserves the focused stage pause action instead of targeting the first stage", async (t) => {
  let activeSeconds = 12;
  const definition = {
    kind: "knowledge.extract",
    name: "知识提取",
    capabilities: { pause: true },
  };
  const task = {
    taskId: "stage-focus-task",
    title: "两阶段提取",
    kind: "knowledge.extract",
    status: "running",
  };
  const { dom, document, calls } = await page("tasks", (url, options) => {
    if (url === "/api/tasks/definitions") return { definitions: [definition] };
    if (url === "/api/tasks?limit=200") return { tasks: [task] };
    if (url === "/api/tasks/stage-focus-task/details")
      return {
        task,
        definition,
        runtime: { activeSeconds },
        stages: [
          { key: "extract", name: "提取阶段", status: "running" },
          { key: "persist", name: "入库阶段", status: "pending" },
        ],
      };
    if (url === "/api/tasks/stage-focus-task/pause") {
      assert.equal(options.method, "POST");
      return {};
    }
    throw new Error(`Unexpected stage focus API ${url}`);
  });
  t.after(() => dom.window.close());
  const pauseButtons = document.querySelectorAll(".phase-list button");
  assert.equal(pauseButtons.length, 2);
  assert.equal(pauseButtons[0].textContent, pauseButtons[1].textContent);
  const secondPause = pauseButtons[1];
  secondPause.focus();
  assert.equal(document.activeElement, secondPause);

  activeSeconds = 13;
  document.querySelector("#refresh").click();
  await settle();
  const refreshedButtons = document.querySelectorAll(".phase-list button");
  assert.notEqual(
    refreshedButtons[1],
    secondPause,
    "a changed runtime should exercise focus restoration after detail rendering",
  );
  assert.equal(document.activeElement, refreshedButtons[1]);
  assert.equal(
    document.activeElement.closest(".phase").querySelector("strong")
      .textContent,
    "入库阶段",
  );
  document.activeElement.click();
  await settle();
  const pauseRequest = calls.find((call) =>
    call.url.endsWith("/stage-focus-task/pause"),
  );
  assert.ok(pauseRequest);
  assert.deepEqual(JSON.parse(pauseRequest.body), { afterStage: "persist" });
});

test("reduced motion preserves immediate task rendering and creation menu without animations", async (t) => {
  const task = {
    taskId: "reduced-task",
    title: "减少动态任务",
    status: "completed",
  };
  const { dom, document, animations } = await page(
    "tasks",
    (url) => {
      if (url === "/api/tasks/definitions")
        return {
          definitions: [
            {
              kind: "knowledge.extract",
              name: "知识提取",
              parameterSchema: { properties: {} },
            },
          ],
        };
      if (url === "/api/tasks?limit=200") return { tasks: [task] };
      return { task, stages: [], calls: [], usage: {} };
    },
    { animate: true, reducedMotion: true },
  );
  t.after(() => dom.window.close());
  assert.match(document.querySelector("#detail").textContent, /减少动态任务/);
  document.querySelector("#create").click();
  assert.equal(document.querySelector("#task-create-menu").hidden, false);
  document.querySelector("#create").click();
  assert.equal(document.querySelector("#task-create-menu").hidden, true);
  assert.deepEqual(animations, []);
});

async function sharingPage(override = () => undefined) {
  const node = {
    id: "shared-node",
    elementId: "element:shared-node",
    name: "共享的知识节点",
    label: "Person",
    labels: ["Knowledge", "Person"],
    policyId: "user:1",
    canWrite: true,
    canManage: true,
    canManagePolicy: false,
    canDelete: false,
    properties: { name: "共享的知识节点", owner_user_id: 1 },
  };
  return await page("knowledge", async (url, options) => {
    const parsed = new URL(url, "http://localhost"),
      custom = await override(parsed, options);
    if (custom !== undefined) return custom;
    if (parsed.pathname === "/api/knowledge/overview")
      return {
        nodes: 1,
        relationships: 0,
        chunks: 1,
        images: 1,
        labels: ["Person"],
      };
    if (
      ["/api/knowledge/graph", "/api/knowledge/search"].includes(
        parsed.pathname,
      )
    )
      return { nodes: [node], relationships: [], total: 1, hasMore: false };
    if (parsed.pathname === "/api/knowledge/nodes/shared-node/actions")
      return {nodeId:node.id,canWrite:node.canWrite,canManage:node.canManage,canDelete:node.canDelete};
    if (parsed.pathname === "/api/knowledge/nodes/shared-node/edit-data") return {node};
    if (parsed.pathname === "/api/knowledge/nodes/shared-node")
      return {
        node,
        relationships: [],
        chunks: [],
        sourceParents: [],
        images: [],
      };
    if (parsed.pathname === "/api/knowledge/nodes/shared-node/sharing") {
      if (options.method === "PUT") return { revision: 5 };
      return {
        owner: { userId: 1, username: "owner", nickname: "归属用户" },
        members: [],
        revision: 4,
        includeSources: false,
        sourceCount: 2,
      };
    }
    if (parsed.pathname === "/api/knowledge/nodes/shared-node/share-users")
      return {
        users: [{ userId: 2, username: "reader", nickname: "协作用户" }],
      };
    throw new Error(`Unexpected node sharing API ${url}`);
  });
}

test("task page sends users to the workflow dialog for template creation", async (t) => {
  const { dom, document, calls } = await page("tasks", (url) => {
    if (url === "/api/tasks/definitions") return { definitions: [] };
    if (url === "/api/tasks?limit=200") return { tasks: [] };
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  document.querySelector("#create-template").click();
  assert.match(document.querySelector("#notice").textContent, /CWM 应用/);
  assert.equal(document.querySelector("#create-dialog").open, false);
  assert.equal(calls.some((call) => call.method === "POST"), false);
});

async function openSharing(dom, document) {
  document
    .querySelector('[data-node-id="shared-node"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  await openNodeAction(dom, document, 'shared-node', 'node-share');
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, true);
}

test("node sharing presents the owner and natural controls, defaults new members to viewer and saves a revisioned payload", async (t) => {
  const { dom, document, calls } = await sharingPage();
  t.after(() => dom.window.close());
  await openSharing(dom, document);
  assert.match(
    document.querySelector(".sharing-owner").textContent,
    /归属用户/,
  );
  assert.ok(document.querySelector(".node-sharing-form"));
  assert.equal(document.querySelector("#create-fields textarea"), null);
  assert.equal(
    [...document.querySelectorAll("#detail button")].some(
      (button) => button.textContent === "删除",
    ),
    false,
    "object managers must not get a delete action for the original owner's data",
  );
  const search = document.querySelector("#sharing-user-search");
  search.value = "r";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(
    calls.filter((call) => call.url.includes("share-users")).length,
    0,
  );
  search.value = "reader";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  assert.equal(
    calls.filter((call) => call.url.includes("share-users")).length,
    0,
  );
  await new Promise((resolve) => setTimeout(resolve, 300));
  document.querySelector('.sharing-user-option[data-user-id="2"]').click();
  const member = document.querySelector('.sharing-member[data-user-id="2"]'),
    role = member.querySelector(".sharing-member-role"),
    conversation = member.querySelector(".sharing-member-conversation");
  assert.equal(role.value, "viewer");
  role.value = "editor";
  role.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  conversation.value = "reader-session";
  conversation.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  const sources = document.querySelector("#sharing-include-sources");
  sources.checked = true;
  sources.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  const graphCalls = calls.filter((call) =>
    call.url.includes("/knowledge/graph"),
  ).length;
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  const update = calls.find(
    (call) => call.url.endsWith("/sharing") && call.method === "PUT",
  );
  assert.ok(update);
  assert.deepEqual(JSON.parse(update.body), {
    members: [{ userId: 2, conversationId: "reader-session", role: "editor" }],
    includeSources: true,
    revision: 4,
  });
  assert.equal(document.querySelector("#create-dialog").open, false);
  assert.equal(
    calls.filter((call) => call.url.includes("/knowledge/graph")).length,
    graphCalls,
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
});

test("cancelling sharing never writes grants and late user search responses cannot reopen a closed dialog", async (t) => {
  let release;
  const { dom, document, calls } = await sharingPage(async (url) => {
    if (url.pathname.endsWith("/share-users"))
      return await new Promise((resolve) => {
        release = resolve;
      });
  });
  t.after(() => dom.window.close());
  await openSharing(dom, document);
  const search = document.querySelector("#sharing-user-search");
  search.value = "reader";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(typeof release, "function");
  document.querySelector("#create-dialog footer [data-close]").click();
  assert.equal(document.querySelector("#create-dialog").open, false);
  release({
    users: [{ userId: 2, username: "late-user", nickname: "迟到用户" }],
  });
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, false);
  assert.equal(document.querySelectorAll(".sharing-user-option").length, 0);
  assert.ok(!calls.some((call) => call.method === "PUT"));
  await openNodeAction(dom, document, 'shared-node', 'node-share');
  await settle();
  assert.equal(document.querySelector("#sharing-user-search").value, "");
  assert.equal(document.querySelectorAll(".sharing-user-option").length, 0);
});

test("sharing conflicts keep the dialog and unsaved role choices available for an explicit refresh", async (t) => {
  const { dom, document } = await sharingPage((url, options) => {
    if (!url.pathname.endsWith("/sharing")) return;
    if (options.method === "PUT")
      return new Response(
        JSON.stringify({
          success: false,
          message: "共享设置已变化，请刷新后重试",
        }),
        { status: 409 },
      );
    return {
      owner: { userId: 1, username: "owner", nickname: "归属用户" },
      members: [
        {
          userId: 2,
          username: "reader",
          nickname: "协作用户",
          conversationId: "",
          role: "viewer",
        },
      ],
      revision: 4,
      includeSources: false,
      sourceCount: 2,
    };
  });
  t.after(() => dom.window.close());
  await openSharing(dom, document);
  const role = document.querySelector(".sharing-member-role");
  role.value = "manager";
  role.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, true);
  assert.equal(document.querySelector(".sharing-member-role").value, "manager");
  assert.equal(document.querySelector("#form-error").hidden, false);
  assert.match(document.querySelector("#form-error").textContent, /刷新|变化/);
  assert.ok(
    [...document.querySelectorAll("#create-dialog button")].some((button) =>
      /刷新共享设置/.test(button.textContent),
    ),
  );
});

test("node context menu opens sharing for its clicked node rather than changing its policy or the graph", async (t) => {
  const { dom, document, calls } = await sharingPage();
  t.after(() => dom.window.close());
  document.querySelector('[data-node-id="shared-node"]').dispatchEvent(
    new dom.window.MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 100,
    }),
  );
  await settle();
  const share = document.querySelector(
    '.graph-context-menu [data-action="node-share"]',
  );
  assert.ok(share);
  share.click();
  await settle();
  assert.equal(document.querySelector(".graph-context-menu"), null);
  assert.equal(document.querySelector("#create-dialog").open, true);
  assert.match(
    document.querySelector(".sharing-owner").textContent,
    /归属用户/,
  );
  assert.ok(
    calls.some((call) => call.url.endsWith("/nodes/shared-node/sharing")),
  );
  assert.ok(!calls.some((call) => ["PUT", "DELETE"].includes(call.method)));
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
});

test("a late sharing save cannot close or enable the newer scope form while its own request is pending", async (t) => {
  let releaseSharing, releaseScope;
  const { dom, document } = await sharingPage(async (url, options) => {
    if (url.pathname.endsWith("/sharing") && options.method === "PUT")
      return await new Promise((resolve) => {
        releaseSharing = resolve;
      });
    if (
      url.pathname === "/api/knowledge/overview" &&
      url.searchParams.get("conversationId") === "reader-session"
    )
      return await new Promise((resolve) => {
        releaseScope = resolve;
      });
  });
  t.after(() => dom.window.close());
  await openSharing(dom, document);
  const form = document.querySelector("#create-form"),
    save = document.querySelector("#submit-create");
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.equal(typeof releaseSharing, "function");
  assert.equal(save.disabled, true);

  document.querySelector("#create-dialog footer [data-close]").click();
  document.querySelector("#scope-context").click();
  const context = document.querySelector('[name="conversationId"]');
  assert.match(
    document.querySelector("#dialog-title").textContent,
    /查询会话范围/,
  );
  context.value = "reader-session";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.equal(typeof releaseScope, "function");
  assert.equal(save.disabled, true);

  releaseSharing({ revision: 5 });
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, true);
  assert.equal(document.querySelector('[name="conversationId"]'), context);
  assert.equal(context.value, "reader-session");
  assert.equal(
    save.disabled,
    true,
    "the old request must not enable a newer pending submission",
  );
  assert.equal(document.querySelector("#form-error").hidden, true);
  assert.match(
    document.querySelector("#dialog-title").textContent,
    /查询会话范围/,
  );

  releaseScope({
    nodes: 1,
    relationships: 0,
    chunks: 1,
    images: 1,
    labels: ["Person"],
  });
  await settle();
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, false);
  assert.equal(save.disabled, false);
  assert.match(
    document.querySelector("#scope-context").textContent,
    /会话范围/,
  );
});


test("grouped inspector lazily pages relationships and does not request original chunks", async (t) => {
  const root = { id: "root", name: "Root", label: "Event", properties: {} };
  const { dom, document, calls } = await page("knowledge", (url) => {
    const parsed = new URL(url, "http://localhost");
    if (parsed.pathname.endsWith("/overview")) return { nodes: 30, labels: ["Event"] };
    if (["/api/knowledge/search", "/api/knowledge/graph"].includes(parsed.pathname)) return { nodes: [root], total: 1 };
    if (parsed.pathname === "/api/knowledge/nodes/root") return { node: root, kind: "knowledge", relationGroups: [{ type: "LINK", direction: "out", count: 30 }, { type: "LINK", direction: "in", count: 12 }] };
    if (parsed.pathname.endsWith("/relations")) {
      const offset = Number(parsed.searchParams.get("offset")), limit = Number(parsed.searchParams.get("limit"));
      return { items: Array.from({ length: limit }, (_, i) => ({ node: { id: `neighbor-${offset+i}`, name: `Neighbor ${offset+i}`, label: "Event" }, relationship: { id: `edge-${offset+i}`, source: "root", target: `neighbor-${offset+i}` } })), total: 30, hasMore: offset + limit < 30 };
    }
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })); await settle();
  assert.equal(document.querySelectorAll(".relation-group").length, 2);
  assert.equal(calls.some((call) => /\/(relations|sources|content|images)/.test(call.url)), false);
  const group = document.querySelector(".relation-group"); group.open = true; await settle();
  assert.equal(group.querySelectorAll(".relation-entry").length, 5);
  [...group.querySelectorAll("button")].find((b) => b.textContent === "加载更多").click(); await settle();
  assert.equal(group.querySelectorAll(".relation-entry").length, 25);
  assert.equal(document.querySelectorAll('.relation-group')[1].querySelectorAll('.relation-entry').length, 0);
  assert.equal(document.querySelector('#detail [data-key^="source-chunk:"]'), null);
});

test("manual source menus add Chunk and parent nodes, double-click does not expand Chunk, and original text is paged", async (t) => {
  const root = { id: "root", name: "Knowledge", label: "Event", labels: ["Event"], properties: {} };
  const child = { id: "child", name: "Child excerpt", label: "Chunk", labels: ["Chunk"], properties: { chunk_type: "child" } };
  const parent = { id: "parent", name: "Parent paragraph", label: "Chunk", labels: ["Chunk"], properties: { chunk_type: "parent" } };
  const original = '<img src=x onerror="bad()">' + "原文".repeat(5000);
  const { dom, document, calls } = await page("knowledge", (url) => {
    const parsed = new URL(url, "http://localhost"), path = parsed.pathname;
    if (path.endsWith("/overview")) return { nodes: 1, chunks: 2, labels: ["Event"] };
    if (["/api/knowledge/search", "/api/knowledge/graph"].includes(path)) return { nodes: [root], total: 1 };
    if (path.endsWith("/sources")) {
      if (parsed.searchParams.get("kind") === "parent") return { centerId: "child", nodes: [child, parent], relationships: [{ id: "parent-edge", source: "child", target: "parent", type: "CHILD_OF" }], total: 1, hasMore: false };
      return { centerId: "root", nodes: [root, child], relationships: [{ id: "source-edge", source: "root", target: "child", type: "EXTRACTED_FROM" }], total: 1, hasMore: false };
    }
    if (path.endsWith("/content")) {
      const offset = Number(parsed.searchParams.get("offset")), limit = Number(parsed.searchParams.get("limit")), text = original.slice(offset, offset+limit);
      return { text, offset, nextOffset: offset+text.length, total: original.length, hasMore: offset+text.length < original.length };
    }
    if (path === "/api/knowledge/nodes/child") return { node: child, kind: "chunk", chunk: { type: "child", charCount: original.length, source: { title: "Document", headingPath: ["Heading", "Section"], documentId: "doc", revision: "f".repeat(64), contextBefore: "Previous context" } }, relationGroups: [] };
    if (path === "/api/knowledge/nodes/parent") return { node: parent, kind: "chunk", chunk: { type: "parent", charCount: original.length, source: { title: "Document" } }, relationGroups: [] };
    if (path === "/api/knowledge/nodes/root") return { node: root, kind: "knowledge", relationGroups: [] };
    throw new Error(`Unexpected API ${url}`);
  });
  t.after(() => dom.window.close());
  const rightClick = (id) => document.querySelector(`[data-node-id="${id}"]`).dispatchEvent(new dom.window.MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: 100, clientY: 150 }));
  rightClick("root"); document.querySelector('[data-action="source-chunks"]').click(); await settle();
  assert.equal(document.querySelector('[data-node-id="child"].knowledge-node'), null);
  document.querySelector('[data-action="source-add"]').click(); await settle();
  assert.ok(document.querySelector('[data-node-id="child"].knowledge-node'));
  const beforeGraph = calls.filter((c) => c.url.includes('/graph')).length;
  document.querySelector('[data-node-id="child"].knowledge-node').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true, button: 0 })); await settle();
  assert.equal(calls.filter((c) => c.url.includes('/graph')).length, beforeGraph);
  assert.equal(document.querySelector('.chunk-content').textContent, original.slice(0,8000));
  assert.equal(document.querySelector('.chunk-content img'), null);
  assert.match(document.querySelector('.chunk-breadcrumb').textContent, /Heading › Section/);
  [...document.querySelectorAll('.chunk-controls button')].find((b) => b.textContent === "加载更多原文").click(); await settle();
  assert.equal(document.querySelector('.chunk-content').textContent, original);
  rightClick("child"); document.querySelector('[data-action="source-parent"]').click(); await settle();
  document.querySelector('[data-action="source-add"]').click(); await settle();
  assert.ok(document.querySelector('[data-node-id="parent"].knowledge-node'));
  assert.ok(document.querySelector('[data-edge-id="parent-edge"]'));
  const saved = JSON.parse(Object.values(dom.window.sessionStorage)[0]);
  assert.equal(saved.nodes.some((node) => node.id === 'parent'), true);
  assert.equal(JSON.stringify(saved).includes(original), false);
});

test("initial loading is delayed, never shows empty prematurely, and stops after drawing", async (t) => {
  let release;
  const pending = new Promise((resolve) => { release = resolve; });
  const { dom, document } = await page("knowledge", (url) => {
    if (url.includes('/overview')) return { nodes: 1, labels: [] };
    if (url.includes('/graph')) return pending;
    return { nodes: [], total: 0 };
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelector('#graph-empty').hidden, true);
  assert.equal(document.querySelector('#graph-loading').hidden, true);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(document.querySelector('#graph-loading').hidden, false);
  assert.match(document.querySelector('#graph-loading').textContent, /正在读取/);
  release({ nodes: [{ id: 'root', name: 'Root', properties: {} }], relationships: [] });
  await new Promise((resolve) => setTimeout(resolve, 65));
  assert.equal(document.querySelector('#graph-loading').hidden, true);
  assert.equal(document.querySelector('#knowledge-canvas').getAttribute('aria-busy'), 'false');
  assert.equal(document.querySelector('#graph-empty').hidden, true);
});

test("initial graph failure leaves a finite retry status and retries successfully", async (t) => {
  let fail = true;
  const { dom, document } = await page("knowledge", (url) => {
    if (url.includes('/overview')) return { nodes: 1, labels: [] };
    if (url.includes('/graph')) {
      if (fail) return new Response(JSON.stringify({ success: false, message: 'Network unavailable' }), { status: 503 });
      return { nodes: [], relationships: [] };
    }
    return { nodes: [], total: 0 };
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelector('#knowledge-canvas').getAttribute('aria-busy'), 'false');
  assert.match(document.querySelector('#graph-loading').textContent, /Network unavailable/);
  fail = false; document.querySelector('#graph-loading button').click();
  await new Promise((resolve) => setTimeout(resolve, 65));
  assert.equal(document.querySelector('#graph-loading').hidden, true);
  assert.equal(document.querySelector('#graph-empty').hidden, false);
});


test("hung graph read aborts on its time limit and shows retry instead of an endless loading indicator", async (t) => {
  const { dom, document } = await page('knowledge', (url, options) => {
    if (url.includes('/overview')) return { nodes: 1, labels: [] };
    if (url.includes('/graph')) return new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })), { once: true }));
    return { nodes: [], total: 0 };
  }, { quickTimeout: true });
  t.after(() => dom.window.close());
  assert.equal(document.querySelector('#knowledge-canvas').getAttribute('aria-busy'), 'false');
  assert.match(document.querySelector('#graph-loading').textContent, /读取超时/);
  assert.ok(document.querySelector('#graph-loading button'));
  assert.equal(document.querySelector('#graph-empty').hidden, true);
});

test("closing source menus aborts their request and late responses cannot reopen or add Chunk nodes", async (t) => {
  const root={id:'root',name:'Root',label:'Event',properties:{}};
  let release, sourceSignal;
  const { dom, document } = await page('knowledge', (url, options) => {
    if(url.includes('/overview')) return { nodes:1,labels:[] };
    if(url.includes('/sources')) { sourceSignal=options.signal; return new Promise((resolve)=>{release=resolve;}); }
    if(url.endsWith('/nodes/root')) return {node:root,kind:'knowledge',relationGroups:[]};
    return {nodes:[root],total:1};
  });
  t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  document.querySelector('[data-action="source-chunks"]').click(); await settle();
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
  assert.equal(sourceSignal.aborted,true);
  release({centerId:'root',nodes:[root,{id:'child',label:'Chunk'}],relationships:[],hasMore:false}); await settle();
  assert.equal(document.querySelector('.graph-context-submenu'),null);
  assert.equal(document.querySelector('[data-node-id="child"]'),null);
});

test("original text changed between pages is reset instead of concatenated with an older revision", async (t) => {
  const child={id:'child',name:'Excerpt',label:'Chunk',labels:['Chunk'],properties:{}};
  const {dom,document}=await page('knowledge',(url)=>{
    if(url.includes('/overview'))return{nodes:0,chunks:1,labels:[]};
    if(url.includes('/content')){
      const offset=Number(new URL(url,'http://localhost').searchParams.get('offset'));
      return {text:offset?'new second':'old first',nextOffset:offset+9,total:18,hasMore:!offset,revision:offset?'new':'old'};
    }
    if(url.endsWith('/nodes/child'))return{node:child,kind:'chunk',chunk:{charCount:18,source:{}},relationGroups:[]};
    return{nodes:[child],total:1};
  });
  t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="child"]').dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true}));await settle();
  assert.equal(document.querySelector('.chunk-content').textContent,'old first');
  [...document.querySelectorAll('.chunk-controls button')].find(b=>b.textContent==='加载更多原文').click();await settle();
  assert.equal(document.querySelector('.chunk-content').textContent,'原文已更新，请重新读取。');
  assert.ok([...document.querySelectorAll('.chunk-controls button')].some(b=>b.textContent==='重新读取'));
});


test("management actions form the final separated group and source previews remain readable", async(t)=>{
  const root={id:'root',name:'Root',label:'Event',properties:{}};
  const name='写于 2021-09-16 的日记：你好！本喵来了。'.repeat(4), summary='这是关于内容创作与录入的详细摘要。'.repeat(20);
  const {dom,document}=await page('knowledge',(url)=>{
    if(url.includes('/overview'))return{nodes:1,labels:[]};
    if(url.endsWith('/actions'))return{nodeId:'root',canWrite:true,canManage:true,canDelete:true};
    if(url.includes('/sources'))return{centerId:'root',nodes:[root,{id:'child',name,label:'Chunk',properties:{summary}}],relationships:[],hasMore:false};
    if(url.endsWith('/nodes/root'))return{node:root,kind:'knowledge',relationGroups:[]};
    return{nodes:[root],total:1};
  });
  t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  await settle();
  const menu=document.querySelector('.graph-context-menu');
  const actions=[...menu.querySelectorAll(':scope > [data-action]')].filter(button=>!button.hidden);
  assert.deepEqual(actions.slice(-3).map(button=>button.dataset.action),['node-share','node-edit','node-delete']);
  assert.deepEqual(actions.slice(-5).map(button=>button.dataset.action),['chunk-create-source','node-rename','node-share','node-edit','node-delete']);
  const divider=actions.at(-5).previousElementSibling;
  assert.equal(divider.getAttribute('role'),'separator');
  assert.equal(divider.previousElementSibling.dataset.action,'source-hide');
  assert.equal(divider.previousElementSibling.previousElementSibling.dataset.action,'source-chunks');
  assert.equal(divider.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('role'),'separator');
  document.querySelector('[data-action="source-chunks"]').click();await settle();
  const entry=document.querySelector('.graph-context-source');
  assert.equal(Array.from(entry.querySelector('.graph-context-name').textContent).length,25);
  assert.equal(Array.from(entry.querySelector('.graph-context-meta').textContent).length,49);
  assert.equal(entry.querySelector('.graph-context-name').title,name);
  assert.equal(entry.querySelector('.graph-context-meta').title,summary);
});

test("menu type selector keeps its parent menu open, filters the backend and closes one layer at a time", async(t)=>{
  const root={id:'root',name:'Root',label:'Event',properties:{}};
  const {dom,document,calls}=await page('knowledge',(url)=>{
    const parsed=new URL(url,'http://localhost'),path=parsed.pathname;
    if(path.endsWith('/overview'))return{nodes:2,labels:[]};
    if(path.endsWith('/node-types'))return{types:[{label:'Event',count:1},{label:'Person',count:1}]};
    if(path.endsWith('/search'))return{nodes:[root],total:1,hasMore:false};
    if(path.endsWith('/actions'))return{nodeId:'root',canWrite:true,canManage:true,canDelete:true};
    return{nodes:[root],relationships:[],total:1};
  });t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  document.querySelector('[data-action="search-nodes"]').click();await settle();
  const trigger=document.querySelector('.graph-context-submenu .cwm-select-trigger');trigger.click();
  assert.ok(document.querySelector('[role="listbox"]'));
  document.querySelector('[role="option"][data-value="Person"]').click();await settle();
  assert.ok(document.querySelector('.graph-context-menu'));
  assert.ok(document.querySelector('.graph-context-submenu'));
  assert.equal(document.querySelector('.graph-context-node-type').value,'Person');
  assert.ok(calls.some(call=>call.url.includes('/search')&&new URL(call.url,'http://localhost').searchParams.get('label')==='Person'));
  trigger.click();
  document.querySelector('[role="listbox"]').dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
  assert.equal(document.querySelector('[role="listbox"]'),null);
  assert.ok(document.querySelector('.graph-context-menu'));
  trigger.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
  assert.equal(document.querySelector('.graph-context-menu'),null);
});

test("hiding source chunks removes only local related fragments and their parents, preserving knowledge and unrelated sources", async(t)=>{
  const root={id:'root',name:'Root',label:'Event',properties:{}}, other={id:'other',name:'Other knowledge',label:'Event',properties:{}};
  const nodes=[root,other,...['child','parent','unrelated'].map(id=>({id,name:id,label:'Chunk',labels:['Chunk'],properties:{}}))];
  const edges=[{id:'source',source:'root',target:'child',type:'EXTRACTED_FROM'},{id:'parent-edge',source:'child',target:'parent',type:'CHILD_OF'},{id:'link',source:'root',target:'other',type:'LINK'},{id:'other-source',source:'other',target:'unrelated',type:'EXTRACTED_FROM'}];
  const {dom,document,calls}=await page('knowledge',(url)=>{
    if(url.includes('/overview'))return{nodes:2,chunks:3,labels:[]};
    if(url.endsWith('/nodes/root'))return{node:root,kind:'knowledge',relationGroups:[]};
    return{nodes,relationships:edges,total:2};
  });
  t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  document.querySelector('[data-action="source-hide"]').click();await settle();
  for(const id of ['root','other','unrelated'])assert.ok(document.querySelector(`.knowledge-node[data-node-id="${id}"]`));
  for(const id of ['child','parent'])assert.equal(document.querySelector(`.knowledge-node[data-node-id="${id}"]`),null);
  assert.equal(calls.some(c=>c.method==='DELETE'||c.method==='PUT'||c.url.includes('/sources')),false);
  const saved=JSON.parse(dom.window.sessionStorage.getItem('cwm.knowledge.canvas.v1:%2Fapi%7C'));
  assert.deepEqual(saved.hiddenIds.sort(),['child','parent']);
});


test("node operations live only in the menu and editing fetches full current attributes rather than canvas previews",async(t)=>{
  const compact={id:'root',name:'Root',label:'Event',properties:{summary:'preview'}};
  const full={...compact,canWrite:true,canManagePolicy:false,properties:{name:'Root',content:'Full original text',custom:false,hiddenProperty:'must be preserved'}};
  const {dom,document,calls}=await page('knowledge',(url)=>{
    const path=new URL(url,'http://localhost').pathname;
    if(path.endsWith('/overview'))return{nodes:1,labels:[]};
    if(path.endsWith('/actions'))return{nodeId:'root',canWrite:true,canManage:true,canDelete:true};
    if(path.endsWith('/edit-data'))return{node:full};
    if(path.endsWith('/nodes/root'))return{node:full,kind:'knowledge',relationGroups:[]};
    return{nodes:[compact],total:1};
  });
  t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true}));await settle();
  assert.equal(document.querySelector('#detail .detail-actions'),null);
  assert.equal(document.querySelector('#detail .detail-title button'),null);
  await openNodeAction(dom,document,'root','node-edit');
  const editor=document.querySelector('.cwm-json-editor')._cwmJsonEditor;
  assert.equal(editor.getValue().content,'Full original text');
  assert.equal(editor.getValue().custom,false);
  assert.equal(editor.getValue().hiddenProperty,'must be preserved');
  assert.ok(calls.some(c=>c.url.endsWith('/edit-data')));
});

test("current menu capabilities hide readonly operations and prevent object managers deleting owner data",async(t)=>{
  const node={id:'root',name:'Root',label:'Event',canWrite:true,canManage:true,properties:{}};
  let manager=false;
  const {dom,document}=await page('knowledge',(url)=>{
    if(url.includes('/overview'))return{nodes:1,labels:[]};
    if(url.endsWith('/actions'))return{nodeId:'root',canWrite:manager,canManage:manager,canDelete:false};
    if(url.endsWith('/nodes/root'))return{node,kind:'knowledge',relationGroups:[]};
    return{nodes:[node],total:1};
  });t.after(()=>dom.window.close());
  const open=async()=>{document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));await settle();};
  await open();
  for(const action of ['node-share','node-edit','node-delete'])assert.equal(document.querySelector(`[data-action="${action}"]`).hidden,true);
  assert.equal(document.querySelector('[data-action="node-share"]').previousElementSibling.hidden,true);
  manager=true;await open();
  for(const action of ['node-share','node-edit'])assert.equal(document.querySelector(`[data-action="${action}"]`).hidden,false);
  assert.equal(document.querySelector('[data-action="node-delete"]').hidden,true);
});

test("delete menu keeps confirmation and removes only the clicked knowledge after a successful server delete",async(t)=>{
  const node={id:'root',name:'Root',label:'Event',properties:{}};
  let deleted=false;
  const {dom,document,calls}=await page('knowledge',(url,options)=>{
    if(url.endsWith('/actions'))return{nodeId:'root',canWrite:true,canManage:false,canDelete:true};
    if(options.method==='DELETE'){deleted=true;return{};}
    if(url.includes('/overview'))return{nodes:1,labels:[]};
    if(url.endsWith('/nodes/root'))return{node,kind:'knowledge',relationGroups:[]};
    return{nodes:deleted?[]:[node],total:deleted?0:1};
  });t.after(()=>dom.window.close());
  dom.window.confirm=()=>false;await openNodeAction(dom,document,'root','node-delete');
  assert.equal(calls.some(c=>c.method==='DELETE'),false);
  assert.ok(document.querySelector('.knowledge-node[data-node-id="root"]'));
  dom.window.confirm=()=>true;await openNodeAction(dom,document,'root','node-delete');
  assert.equal(calls.filter(c=>c.method==='DELETE').length,1);
  assert.equal(document.querySelector('.knowledge-node[data-node-id="root"]'),null);
});

test("moving from a submenu onto an ordinary item closes the submenu so its hover can be highlighted",async(t)=>{
  const node={id:'root',name:'Root',label:'Event',properties:{}};
  const {dom,document}=await page('knowledge',(url)=>{
    if(url.includes('/overview'))return{nodes:1,labels:[]};
    if(url.endsWith('/actions'))return{nodeId:'root',canWrite:true,canManage:true,canDelete:true};
    if(url.endsWith('/related-types'))return{types:[{label:'Event',count:1}]};
    if(url.endsWith('/nodes/root'))return{node,kind:'knowledge',relationGroups:[]};
    return{nodes:[node],total:1};
  });t.after(()=>dom.window.close());
  document.querySelector('[data-node-id="root"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));await settle();
  document.querySelector('[data-action="related-types"]').click();await settle();
  assert.ok(document.querySelector('.graph-context-submenu'));
  const event=new dom.window.Event('pointerenter');Object.assign(event,{pointerType:'mouse'});
  document.querySelector('[data-action="node-edit"]').dispatchEvent(event);
  assert.equal(document.querySelector('.graph-context-submenu'),null);
  assert.equal(document.querySelector('.graph-context-menu').hasAttribute('data-expanded'),false);
});

test("late operation permissions cannot mutate a newer menu after the old request is aborted",async(t)=>{
  const nodes=['root','other'].map(id=>({id,name:id,label:'Event',properties:{}}));
  let release,signal;
  const {dom,document}=await page('knowledge',(url,options)=>{
    if(url.includes('/overview'))return{nodes:2,labels:[]};
    if(url.endsWith('/root/actions')){signal=options.signal;return new Promise(resolve=>{release=resolve;});}
    if(url.endsWith('/other/actions'))return{nodeId:'other',canWrite:false,canManage:false,canDelete:false};
    if(/\/nodes\/(root|other)$/.test(url))return{node:nodes.find(n=>url.endsWith(n.id)),kind:'knowledge',relationGroups:[]};
    return{nodes,total:2};
  });t.after(()=>dom.window.close());
  const open=id=>document.querySelector(`.knowledge-node[data-node-id="${id}"]`).dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  open('root');await settle();open('other');await settle();assert.equal(signal.aborted,true);
  release({nodeId:'root',canWrite:true,canManage:true,canDelete:true});await settle();
  assert.equal(document.querySelector('.graph-context-menu').dataset.nodeId,'other');
  assert.equal(document.querySelector('[data-action="node-edit"]').hidden,true);
});
