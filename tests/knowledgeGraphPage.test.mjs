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
const settle = (ms = 35) => new Promise((resolve) => setTimeout(resolve, ms));
const nodes = [
  {
    id: "node-1",
    elementId: "element-1",
    name: "设备 A",
    label: "设备",
    properties: {},
  },
  {
    id: "node-2",
    elementId: "element-2",
    name: "接口 B",
    label: "接口",
    properties: {},
  },
  {
    id: "node-3",
    name: "<script>unsafe()</script>",
    label: "事件",
    properties: {},
  },
];
const relationships = [
  { id: "r-1", type: "连接", source: "node-1", target: "node-2" },
  // An alternate provider may use element IDs. Both resolve to the visible node.
  { id: "r-2", type: "包含", source: "element-1", target: "element-2" },
  { id: "r-hidden", type: "不可见", source: "node-1", target: "hidden-node" },
];

async function page(
  responder = () => undefined,
  {
    controlledAnimation = false,
    reducedMotion = false,
    fullGraph = false,
    seedStorage = {},
    conversationId = "",
    databaseId = "",
    localSettings,
    iframeParent,
  } = {},
) {
  const config = JSON.stringify({ kind: "knowledge", apiBase: "/api" });
  const html = template
    .replace("{{ config | tojson }}", config)
    .replace("{{ stylesheet | safe }}", "")
    .replace("{{ script | safe }}", "");
  const dom = new JSDOM(html, {
    url: `http://localhost/api/knowledge/page${conversationId ? `?conversationId=${encodeURIComponent(conversationId)}` : ""}${databaseId ? `${conversationId ? "&" : "?"}databaseId=${encodeURIComponent(databaseId)}` : ""}`,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const calls = [];
  if (localSettings !== undefined) dom.window.localStorage.setItem('LocalSetting', JSON.stringify(localSettings));
  if (iframeParent) Object.defineProperty(dom.window, 'parent', { value: iframeParent });
  for (const [key, value] of Object.entries(seedStorage))
    dom.window.sessionStorage.setItem(key, value);
  const frames = new Map();
  let nextFrame = 0;
  let animationTime = 0;
  if (controlledAnimation) {
    dom.window.performance.now = () => animationTime;
    dom.window.requestAnimationFrame = (callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    };
    dom.window.cancelAnimationFrame = (id) => frames.delete(id);
  }
  dom.window.matchMedia = (query) => ({
    matches: reducedMotion && query.includes("prefers-reduced-motion"),
  });
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  dom.window.fetch = async (url, options = {}) => {
    const parsed = new URL(url, "http://localhost");
    calls.push({ url, parsed, ...options });
    let data = await responder(parsed, options);
    if (data instanceof Response) return data;
    if (data === undefined) {
      if (parsed.pathname === "/api/knowledge/databases")
        data = { databases: [{ id: "db-default", name: "primary", title: "默认知识库", enabled: true, legacyDefault: true }] };
      else if (parsed.pathname === "/api/knowledge/overview")
        data = {
          nodes: 3,
          relationships: 2,
          chunks: 0,
          images: 0,
          labels: ["设备", "接口"],
        };
      else if (parsed.pathname.endsWith('/actions')) data={nodeId:decodeURIComponent(parsed.pathname.split('/')[4]),canWrite:true,canManage:true,canDelete:true};
      else if (parsed.pathname === "/api/knowledge/canvas" || parsed.pathname === "/api/knowledge/canvas/import") {
        const body = JSON.parse(options.body);
        data = { nodes: nodes.filter((node) => body.nodeIds.includes(node.id)), relationships: relationships.filter((edge) => body.edgeIds.includes(edge.id)) };
      }
      else if (parsed.pathname === "/api/knowledge/graph") {
        const limit = fullGraph
            ? nodes.length
            : Number(parsed.searchParams.get("limit") || 50),
          visible = nodes.slice(0, limit),
          visibleIds = new Set(
            visible.flatMap((node) => [node.id, node.elementId]),
          );
        data = {
          nodes: visible,
          relationships: relationships.filter(
            (edge) =>
              visibleIds.has(edge.source) && visibleIds.has(edge.target),
          ),
          offset: 0,
          total_nodes: 3,
          hasMore: visible.length < nodes.length,
        };
      } else if (parsed.pathname === "/api/knowledge/node-types")
        data = {
          types: [
            { label: "设备", count: 1 },
            { label: "接口", count: 2 },
            { label: "事件", count: 1 },
          ],
        };
      else if (parsed.pathname === "/api/knowledge/search") {
        const pool =
            parsed.searchParams.get("primaryLabel") === "true"
              ? [...nodes, { id: "node-4", name: "新节点", label: "接口" }]
              : nodes.slice(0, 2),
          label = parsed.searchParams.get("label"),
          query = parsed.searchParams.get("q")?.toLowerCase() || "",
          matches =
            parsed.searchParams.get("primaryLabel") === "true"
              ? pool.filter(
                  (node) =>
                    (!label || node.label === label) &&
                    (!query || node.name.toLowerCase().includes(query)),
                )
              : pool;
        data = { nodes: matches, total: matches.length, hasMore: false };
      } else if (parsed.pathname.startsWith("/api/knowledge/nodes/")) {
        const id = decodeURIComponent(parsed.pathname.split("/")[4]);
        if (parsed.pathname.endsWith("/connection")) {
          const targetId = parsed.searchParams.get("targetId"),
            pool = [...nodes, { id: "node-4", name: "新节点", label: "接口" }];
          data = {
            found: true,
            centerId: id,
            targetId,
            hops: id === targetId ? 0 : 1,
            maxHops: 6,
            nodes: pool.filter(
              (node) => node.id === id || node.id === targetId,
            ),
            relationships:
              id === targetId
                ? []
                : [
                    {
                      id: `connection-${id}-${targetId}`,
                      source: id,
                      target: targetId,
                      type: "关联",
                    },
                  ],
          };
        } else if (parsed.pathname.endsWith("/graph"))
          data = {
            nodes: [...nodes, { id: "node-4", name: "新节点", label: "接口" }],
            relationships: [
              ...relationships,
              { id: "r-3", type: "关联", source: id, target: "node-4" },
            ],
            centerId: id,
          };
        else
          data = {
            node: nodes.find((node) => node.id === id) || {
              id,
              name: id,
              properties: {},
            },
          };
      } else throw new Error(`Unexpected API ${url}`);
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, data }),
    };
  };
  dom.window.eval(script);
  await settle(controlledAnimation ? 130 : 65);
  return {
    dom,
    document: dom.window.document,
    calls,
    runFrames(count, frameMs = 1000 / 60) {
      for (let index = 0; index < count; index += 1) {
        animationTime += frameMs;
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(animationTime));
      }
    },
    pendingFrames: () => frames.size,
    dumpStorage() {
      return Object.fromEntries(
        Array.from({ length: dom.window.sessionStorage.length }, (_, index) => {
          const key = dom.window.sessionStorage.key(index);
          return [key, dom.window.sessionStorage.getItem(key)];
        }),
      );
    },
  };
}
const pointer = (dom, target, type, x, y, options = {}) => {
  const event = new dom.window.Event(type, { bubbles: true, cancelable: true });
  const button = options.button ?? 0;
  Object.assign(event, {
    pointerId: 1,
    pointerType: "mouse",
    button,
    buttons:
      type === "pointerup" || type === "pointercancel"
        ? 0
        : button === 1
          ? 4
          : button === 2
            ? 2
            : 1,
    clientX: x,
    clientY: y,
    ...options,
  });
  target.dispatchEvent(event);
  return event;
};

const positionOf = (node) =>
  node
    .getAttribute("transform")
    .match(/-?\d+(?:\.\d+)?/g)
    .map(Number);

const positionsOf = (document) =>
  [...document.querySelectorAll(".knowledge-node")].map(positionOf);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

test('knowledge edge animation obeys only trusted parent preferences and updates without resetting layout', async () => {
  const trustedParent = { postMessage() {} };
  const ui = await page(() => undefined, { fullGraph: true, controlledAnimation: true, iframeParent: trustedParent });
  try {
    ui.runFrames(700);
    const svg = ui.document.getElementById('knowledge-canvas');
    assert.equal(svg.dataset.edgeAnimation, 'true');
    assert.equal(svg.dataset.edgeAnimationActive, 'true');
    assert.equal(ui.pendingFrames(), 0);
    const flows = [...svg.querySelectorAll('.knowledge-edge-flow')];
    assert.equal(flows.length, 2);
    for (const flow of flows) assert.equal(flow.getAttribute('d'), flow.previousElementSibling.getAttribute('d'));
    const camera = ui.document.getElementById('graph-camera').getAttribute('transform');
    const send = (source, origin, value) => ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent('message', {
      source, origin, data: { type: 'cwm.graph-preferences', edgeAnimation: value },
    }));
    send({}, 'http://localhost', false); send(trustedParent, 'https://untrusted.example', false); send(trustedParent, 'http://localhost', 'false');
    assert.equal(svg.dataset.edgeAnimation, 'true');
    send(trustedParent, 'http://localhost', false); assert.equal(svg.dataset.edgeAnimation, 'false');
    send(trustedParent, 'http://localhost', true); assert.equal(svg.dataset.edgeAnimation, 'true');
    assert.equal(ui.pendingFrames(), 0); assert.equal(ui.document.getElementById('graph-camera').getAttribute('transform'), camera);
    ui.document.getElementById('graph-physics').click(); assert.equal(svg.dataset.edgeAnimationActive, 'false');
  } finally { ui.dom.window.close(); }
});

test('standalone knowledge page respects persisted animation preference and live storage updates', async () => {
  const ui = await page(() => undefined, { fullGraph: true, controlledAnimation: true, localSettings: { KnowledgeGraphEdgeAnimation: false } });
  try {
    const svg = ui.document.getElementById('knowledge-canvas');
    assert.equal(svg.dataset.edgeAnimation, 'false');
    ui.dom.window.localStorage.setItem('LocalSetting', JSON.stringify({ KnowledgeGraphEdgeAnimation: true }));
    ui.dom.window.dispatchEvent(new ui.dom.window.StorageEvent('storage', { key: 'LocalSetting' }));
    assert.equal(svg.dataset.edgeAnimation, 'true');
    assert.equal(svg.querySelectorAll('.knowledge-edge-flow').length, 2);
  } finally { ui.dom.window.close(); }
});
const cameraOf = (document) =>
  document
    .querySelector("#graph-camera")
    .getAttribute("transform")
    .match(/-?\d+(?:\.\d+)?/g)
    .map(Number);

const graphFixture = (fixtureNodes, fixtureRelationships) => (url) => {
  if (url.pathname === "/api/knowledge/graph")
    return {
      nodes: fixtureNodes,
      relationships: fixtureRelationships,
      offset: 0,
      hasMore: false,
    };
};

test('standalone ordered rows preserve exact order and rigid dragging without inventing missing adjacency', async (t) => {
  const ordered = (id, key, extra = {}) => ({ id, name: id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], properties: { ordered_axis: 'timeline', ordered_kind: 'time', ordered_key: key, ordered_value: id, ...extra } });
  const fixtureNodes = [ordered('late', '63745056000000004'), ordered('early', '63745056000000001'), ordered('middle', '63745056000000002'), ordered('unknown', null, { ordered_missing: true }), { id: 'axis', label: 'OrderAxis' }, { id: 'ordinary', name: '普通事件', label: 'Event' }];
  const ui = await page(graphFixture(fixtureNodes, [
    { id: 'actual-next', source: 'early', target: 'middle', type: 'NEXT_ORDERED' },
    { id: 'internal', source: 'axis', target: 'late', type: 'HAS_ORDERED_NODE' },
    { id: 'semantic', source: 'ordinary', target: 'middle', type: 'HAPPENS_AT' },
  ]), { controlledAnimation: true, fullGraph: true });
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui, svg = document.getElementById('knowledge-canvas');
  const node = id => document.querySelector(`[data-node-id="${id}"]`), at = id => positionOf(node(id));
  ui.runFrames(420);
  assert.equal(node('axis'), null); assert.equal(svg.querySelectorAll('.ordered-node').length, 4);
  assert.equal(svg.querySelectorAll('.ordered-link').length, 1, 'a gap in the loaded subset has no synthesized edge');
  assert.equal(node('late').querySelector('circle').getAttribute('r'), '8');
  assert.ok(at('early')[0] < at('middle')[0] && at('middle')[0] < at('late')[0]);
  assert.equal(at('early')[1], at('late')[1]); assert.notEqual(at('unknown')[1], at('late')[1]);
  assert.match(node('unknown').textContent, /未定位/);
  const before = at('early'), delta = at('late')[0] - before[0], missing = at('unknown');
  const [cx, cy, scale] = cameraOf(document), x = cx + before[0] * scale, y = cy + before[1] * scale;
  pointer(dom, node('early'), 'pointerdown', x, y);
  pointer(dom, dom.window, 'pointermove', x + 70, y + 45); ui.runFrames(1);
  const dragged = at('early');
  assert.ok(Math.abs(dragged[0] - before[0] - 70 / scale) < 0.02);
  assert.equal(at('late')[0] - dragged[0], delta); assert.equal(at('late')[1], dragged[1]); assert.deepEqual(at('unknown'), missing);
  pointer(dom, dom.window, 'pointerup', x + 70, y + 45); ui.runFrames(420);
  assert.deepEqual(at('early'), dragged); assert.equal(ui.pendingFrames(), 0);
  document.getElementById('graph-layout').click(); ui.runFrames(420);
  assert.equal(at('early')[1], at('late')[1]); assert.equal(at('late')[0] - at('early')[0], delta);
});

const canvasKey = (conversationId = "", databaseId = "db-default") =>
  `cwm.knowledge.canvas.v1:${encodeURIComponent(`/api|${databaseId}|${conversationId}`)}`;
const visibleContextMenu = (document) => {
  const menu = document.querySelector(".graph-context-menu");
  return menu && !menu.hidden && menu.style.display !== "none" ? menu : null;
};
const openNodeMenu = (dom, document, id) => {
  const node = document.querySelector(`[data-node-id="${id}"]`),
    event = new dom.window.MouseEvent("contextmenu", {
      button: 2,
      clientX: 250,
      clientY: 200,
      bubbles: true,
      cancelable: true,
    });
  node.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true);
  return visibleContextMenu(document);
};
const ctrlSelect = (dom, document, id) =>
  document.querySelector(`[data-node-id="${id}"]`).dispatchEvent(
    new dom.window.MouseEvent("click", {
      button: 0,
      ctrlKey: true,
      bubbles: true,
    }),
  );
const switchScope = async (dom, document, id) => {
  document.querySelector("#scope-context").click();
  document.querySelector('[name="conversationId"]').value = id;
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
};

test("Ctrl marquee selects node centers without panning, survives restoration, and Esc clears only graph selection", async (t) => {
  const ui = await page(undefined, {
    fullGraph: true,
    controlledAnimation: true,
    reducedMotion: true,
  });
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui,
    svg = document.querySelector("#knowledge-canvas");
  ui.runFrames(2);
  const camera = cameraOf(document),
    positions = positionsOf(document);
  pointer(dom, svg, "pointerdown", 0, 0, { ctrlKey: true });
  pointer(dom, dom.window, "pointermove", 800, 540, { ctrlKey: true });
  assert.equal(document.querySelectorAll(".knowledge-node.selected").length, 3);
  assert.equal(
    document.querySelector(".graph-marquee").hasAttribute("hidden"),
    false,
  );
  pointer(dom, dom.window, "pointerup", 800, 540, { ctrlKey: true });
  assert.deepEqual(cameraOf(document), camera);
  assert.deepEqual(positionsOf(document), positions);
  assert.equal(
    document.querySelector(".graph-marquee").hasAttribute("hidden"),
    true,
  );
  await settle(250);
  const saved = ui.dumpStorage();
  assert.deepEqual(
    JSON.parse(saved[canvasKey()]).multiSelectedIds.slice().sort(),
    nodes.map((n) => n.id).sort(),
  );
  const restored = await page(undefined, {
    seedStorage: saved,
    controlledAnimation: true,
  });
  t.after(() => restored.dom.window.close());
  assert.equal(
    restored.document.querySelectorAll(".knowledge-node.selected").length,
    3,
  );
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
      cancelable: true,
    }),
  );
  assert.equal(document.querySelectorAll(".knowledge-node.selected").length, 0);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 3);
});

test("selected node menu hides every captured target while ordinary clicks restore one selection", async (t) => {
  const { dom, document } = await page(undefined, {
    fullGraph: true,
    controlledAnimation: true,
  });
  t.after(() => dom.window.close());
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  assert.equal(document.querySelectorAll(".knowledge-node.selected").length, 2);
  let menu = openNodeMenu(dom, document, "node-2");
  assert.match(menu.textContent, /2 个节点/);
  menu.querySelector('[data-action="hide"]').click();
  assert.deepEqual(
    [...document.querySelectorAll(".knowledge-node")].map(
      (n) => n.dataset.nodeId,
    ),
    ["node-3"],
  );
  document
    .querySelector('[data-node-id="node-3"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  assert.equal(document.querySelectorAll(".knowledge-node.selected").length, 1);
  await settle();
});

test("Ctrl keyboard and context clicks add nodes without resetting the knowledge canvas selection", async (t) => {
  const { dom, document } = await page(undefined, { fullGraph: true, controlledAnimation: true });
  t.after(() => dom.window.close());
  const root = document.querySelector('.knowledge-node[data-node-id="node-1"]');
  root.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  const other = document.querySelector('.knowledge-node[data-node-id="node-2"]');
  other.dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: ' ', ctrlKey: true }));
  assert.equal(document.querySelectorAll('.knowledge-node.selected').length, 2);
  document.querySelector('.knowledge-node[data-node-id="node-3"]').dispatchEvent(new dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, ctrlKey: true }));
  assert.equal(document.querySelectorAll('.knowledge-node.selected').length, 3);
  assert.match(document.querySelector('.graph-context-selection').textContent, /3/);
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
  // The first Esc closes the menu; the next clears the selected nodes.
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
  assert.equal(document.querySelectorAll('.knowledge-node.selected').length, 0);
  await settle();
});

test("multi-root type expansion waits for every root and never partially mutates the canvas on failure", async (t) => {
  let fail = true;
  const ui = await page(
    (url) => {
      if (url.pathname.endsWith("/related-types"))
        return { types: [{ label: "接口", count: 1 }] };
      if (url.pathname.endsWith("/related")) {
        const root = url.pathname.split("/")[4];
        if (root === "node-2" && fail)
          return new Response(
            JSON.stringify({
              success: false,
              message: "second root unavailable",
            }),
            { status: 403 },
          );
        const extra = {
          id: root === "node-1" ? "extra-1" : "extra-2",
          name: "新接口",
          label: "接口",
        };
        return {
          nodes: [nodes.find((n) => n.id === root), extra],
          relationships: [],
          total_nodes: 1,
          hasMore: false,
        };
      }
    },
    { fullGraph: true, controlledAnimation: true },
  );
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui;
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  const apply = async () => {
    openNodeMenu(dom, document, "node-1")
      .querySelector('[data-action="related-types"]')
      .click();
    await settle();
    document.querySelector('.graph-context-type[data-label="接口"]').click();
    await settle();
  };
  await apply();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 3);
  assert.match(document.querySelector("#notice").textContent, /unavailable/);
  fail = false;
  await apply();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 5);
  assert.ok(document.querySelector('[data-node-id="extra-1"]'));
  assert.ok(document.querySelector('[data-node-id="extra-2"]'));
});

test("multi-node permissions preview an exact range and require explicit replacement before one revisioned batch save", async (t) => {
  const owner = { userId: 1, username: "owner", nickname: "归属用户" };
  const ui = await page(
    (url, options) => {
      if (url.pathname.endsWith("/sharing/preview")) {
        const body = JSON.parse(options.body);
        return {
          targets: (body.hops ? nodes : nodes.slice(0, 2)).map(
            (node, index) => ({
              nodeId: node.id,
              name: node.name,
              revision: index + 10,
              owner,
            }),
          ),
          total: body.hops ? 3 : 2,
          relationshipCount: 1,
        };
      }
      if (url.pathname.endsWith("/sharing/batch"))
        return { updated: 2, total: 2 };
    },
    { fullGraph: true, controlledAnimation: true },
  );
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  const permissionMenu = openNodeMenu(dom, document, "node-2");
  await settle();
  permissionMenu.querySelector('[data-action="node-share"]').click();
  await settle();
  assert.match(
    document.querySelector("#sharing-preview").textContent,
    /2 个节点/,
  );
  const form = document.querySelector("#create-form");
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  assert.equal(
    calls.filter((c) => c.parsed.pathname.endsWith("/sharing/batch")).length,
    0,
  );
  assert.match(
    document.querySelector("#form-error").textContent,
    /确认统一替换/,
  );
  document.querySelector("#sharing-replace-confirm").checked = true;
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  const put = calls.find((c) => c.parsed.pathname.endsWith("/sharing/batch"));
  assert.deepEqual(JSON.parse(put.body), {
    targets: [
      { nodeId: "node-1", revision: 10 },
      { nodeId: "node-2", revision: 11 },
    ],
    members: [],
    includeSources: false,
  });
});

test("closed and superseded permission previews cannot replace the latest batch range or re-enable a closed dialog", async (t) => {
  const owner = { userId: 1, username: "owner" };
  let releaseOld;
  const { dom, document } = await page(
    async (url, options) => {
      if (!url.pathname.endsWith("/sharing/preview")) return;
      const request = JSON.parse(options.body),
        data = {
          targets: (request.hops === 2 ? nodes : nodes.slice(0, 2)).map(
            (node) => ({
              nodeId: node.id,
              name: node.name,
              revision: 5,
              owner,
            }),
          ),
          total: request.hops === 2 ? 3 : 2,
        };
      if (request.hops === 1)
        return await new Promise((resolve) => {
          releaseOld = () => resolve(data);
        });
      return data;
    },
    { fullGraph: true, controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  const permissionMenu = openNodeMenu(dom, document, "node-1");
  await settle();
  permissionMenu.querySelector('[data-action="node-share"]').click();
  await settle();
  const hops = document.querySelector("#sharing-hops");
  hops.value = "1";
  hops.dispatchEvent(new dom.window.Event("change"));
  await settle();
  assert.equal(document.querySelector("#submit-create").disabled, true);
  hops.value = "2";
  hops.dispatchEvent(new dom.window.Event("change"));
  await settle();
  assert.match(
    document.querySelector("#sharing-preview").textContent,
    /3 个节点/,
  );
  releaseOld();
  await settle();
  assert.match(
    document.querySelector("#sharing-preview").textContent,
    /3 个节点/,
  );
  assert.equal(document.querySelector("#submit-create").disabled, false);
  hops.value = "1";
  hops.dispatchEvent(new dom.window.Event("change"));
  await settle();
  document.querySelector("#create-dialog [data-close]").click();
  releaseOld();
  await settle();
  assert.equal(document.querySelector("#create-dialog").open, false);
});

test("multi-root connection lookup queries every root and highlights the merged paths", async (t) => {
  const target = { id: "node-4", name: "目标", label: "接口" },
    extra = { id: "node-5", name: "中介", label: "事件" };
  const { dom, document, calls } = await page(
    (url) => {
      if (!url.pathname.endsWith("/connection")) return;
      const root = url.pathname.split("/")[4],
        middle = root === "node-1" ? nodes[2] : extra;
      return {
        found: true,
        hops: 2,
        nodes: [nodes.find((n) => n.id === root), middle, target],
        relationships: [
          { id: `${root}-a`, source: root, target: middle.id, type: "关联" },
          {
            id: `${root}-b`,
            source: middle.id,
            target: target.id,
            type: "关联",
          },
        ],
      };
    },
    { fullGraph: true, controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  openNodeMenu(dom, document, "node-1")
    .querySelector('[data-action="related"]')
    .click();
  await settle();
  document
    .querySelector('.graph-context-neighbor[data-node-id="node-4"]')
    .click();
  await settle();
  assert.deepEqual(
    calls
      .filter((c) => c.parsed.pathname.endsWith("/connection"))
      .map((c) => c.parsed.pathname.split("/")[4])
      .sort(),
    ["node-1", "node-2"],
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 5);
  assert.equal(document.querySelectorAll(".knowledge-edge.selected").length, 4);
  assert.equal(document.querySelectorAll(".knowledge-node.dimmed").length, 0);
});

test("multi-root type hiding unions the original branch plans and retains every selected root", async (t) => {
  const fixture = [
      ...nodes.slice(0, 2).map((node) => ({ ...node, label: "设备" })),
      { id: "seed-a", name: "接口 A", label: "接口" },
      { id: "seed-b", name: "接口 B", label: "接口" },
      { id: "extension", name: "延伸", label: "事件" },
    ],
    edges = [
      { id: "a", source: "node-1", target: "seed-a" },
      { id: "b", source: "node-2", target: "seed-b" },
      { id: "extension-edge", source: "seed-a", target: "extension" },
    ];
  const { dom, document } = await page(graphFixture(fixture, edges), {
    controlledAnimation: true,
  });
  t.after(() => dom.window.close());
  ctrlSelect(dom, document, "node-1");
  ctrlSelect(dom, document, "node-2");
  openNodeMenu(dom, document, "node-1")
    .querySelector('[data-action="hide-types"]')
    .click();
  await settle();
  const item = document.querySelector('.graph-context-type[data-label="接口"]');
  assert.equal(item.dataset.count, "2");
  assert.equal(item.dataset.hideCount, "3");
  item.click();
  assert.deepEqual(
    [...document.querySelectorAll(".knowledge-node")]
      .map((n) => n.dataset.nodeId)
      .sort(),
    ["node-1", "node-2"],
  );
  assert.equal(document.querySelectorAll(".knowledge-node.selected").length, 2);
});
const openTypeAction = (dom, document, id, action, { global = false } = {}) => {
  let menu;
  if (id) menu = openNodeMenu(dom, document, id);
  else {
    if (global)
      document
        .querySelector("#knowledge-canvas")
        .dispatchEvent(
          new dom.window.MouseEvent("click", { button: 0, bubbles: true }),
        );
    document.querySelector("#knowledge-canvas").dispatchEvent(
      new dom.window.MouseEvent("contextmenu", {
        button: 2,
        clientX: 650,
        clientY: 300,
        bubbles: true,
        cancelable: true,
      }),
    );
    menu = visibleContextMenu(document);
  }
  const trigger = menu.querySelector(`[data-action="${action}"]`);
  assert.ok(trigger, `the context menu should expose ${action}`);
  return trigger;
};
const typedButton = (document, action, label) =>
  document.querySelector(
    `.graph-context-type[data-action="${action}"][data-label="${label}"]`,
  );
const openTopSearch = (document) => {
  const search = document.querySelector("#search");
  if (document.activeElement === search) search.click();
  else search.focus();
  return search;
};

const trackPointerCapture = (svg) => {
  const active = new Set(),
    calls = [];
  svg.setPointerCapture = (id) => {
    active.add(id);
    calls.push({ action: "capture", id });
  };
  svg.hasPointerCapture = (id) => active.has(id);
  svg.releasePointerCapture = (id) => {
    active.delete(id);
    calls.push({ action: "release", id });
  };
  return { active, calls };
};

// Pointer capture changes the native click target to the nearest common ancestor
// of the press and release. Model that route instead of sending dblclick alone.
const pointerClick = (dom, svg, node, x, y, detail, dx = 0, dy = 0) => {
  const down = pointer(dom, node, "pointerdown", x, y);
  pointer(dom, node, "pointermove", x + dx, y + dy);
  const draggingBeforeRelease = svg.classList.contains("dragging"),
    upTarget = svg.hasPointerCapture(1) ? svg : node;
  pointer(dom, upTarget, "pointerup", x + dx, y + dy);
  upTarget.dispatchEvent(
    new dom.window.MouseEvent("click", { button: 0, detail, bubbles: true }),
  );
  if (detail === 2)
    upTarget.dispatchEvent(
      new dom.window.MouseEvent("dblclick", {
        button: 0,
        detail,
        bubbles: true,
      }),
    );
  return { down, draggingBeforeRelease };
};

test("small pointer jitter keeps native node clicks and double clicks on the node without starting a drag", async (t) => {
  const { dom, document, calls, runFrames, pendingFrames } = await page(
    undefined,
    {
      controlledAnimation: true,
    },
  );
  t.after(() => dom.window.close());
  runFrames(420);
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    captures = trackPointerCapture(svg),
    [panX, panY] = cameraOf(document),
    before = node.getAttribute("transform");
  const firstDown = pointerClick(dom, svg, node, panX, panY, 1, 2, 1);
  assert.equal(firstDown.down.defaultPrevented, false);
  assert.equal(firstDown.draggingBeforeRelease, false);
  assert.equal(svg.classList.contains("dragging"), false);
  assert.deepEqual(captures.calls, []);
  assert.equal(
    pendingFrames(),
    0,
    "ordinary clicks must not reheat a settled graph",
  );
  assert.equal(node.getAttribute("transform"), before);
  await settle();
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-1",
  );
  assert.equal(
    calls.filter((call) => call.parsed.pathname.endsWith("/nodes/node-1/graph"))
      .length,
    0,
  );
  const secondDown = pointerClick(dom, svg, node, panX, panY, 2, 3, 2);
  assert.equal(secondDown.down.defaultPrevented, false);
  assert.equal(secondDown.draggingBeforeRelease, false);
  assert.deepEqual(captures.calls, []);
  assert.equal(svg.classList.contains("dragging"), false);
  await settle();
  assert.equal(
    calls.filter((call) => call.parsed.pathname.endsWith("/nodes/node-1/graph"))
      .length,
    1,
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
});

test("left dragging captures only beyond the movement threshold and suppresses trailing node clicks", async (t) => {
  const { dom, document, calls, runFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(420);
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    captures = trackPointerCapture(svg),
    [panX, panY, scale] = cameraOf(document),
    initial = positionOf(node),
    x = panX + initial[0] * scale,
    y = panY + initial[1] * scale;
  const down = pointer(dom, node, "pointerdown", x, y);
  assert.equal(down.defaultPrevented, false);
  assert.equal(svg.classList.contains("dragging"), false);
  assert.deepEqual(captures.calls, []);
  pointer(dom, node, "pointermove", x + 4, y + 4);
  assert.deepEqual(captures.calls, []);
  assert.equal(svg.classList.contains("dragging"), false);
  pointer(dom, node, "pointermove", x + 8, y + 1);
  assert.deepEqual(captures.calls, [{ action: "capture", id: 1 }]);
  assert.equal(svg.classList.contains("dragging"), true);
  runFrames(1);
  assert.ok(distance(positionOf(node), initial) > 1);
  pointer(dom, svg, "pointerup", x + 8, y + 1);
  assert.equal(svg.classList.contains("dragging"), false);
  assert.equal(captures.active.size, 0);
  node.dispatchEvent(
    new dom.window.MouseEvent("click", { button: 0, bubbles: true }),
  );
  node.dispatchEvent(
    new dom.window.MouseEvent("dblclick", { button: 0, bubbles: true }),
  );
  await settle();
  assert.equal(document.querySelector(".knowledge-node.selected"), null);
  assert.ok(
    !calls.some((call) =>
      call.parsed.pathname.startsWith("/api/knowledge/nodes/"),
    ),
    "a completed drag must not select or expand its node",
  );
});

test("the workspace starts with one unselected seed and refresh preserves expanded nodes, camera and selection", async (t) => {
  const { dom, document, calls, runFrames } = await page(undefined, {
    controlledAnimation: true,
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  assert.equal(document.querySelector("#graph-more")?.hidden ?? true, true);
  assert.equal(
    calls
      .find((call) => call.parsed.pathname === "/api/knowledge/graph")
      .parsed.searchParams.get("limit"),
    "1",
  );
  assert.equal(document.querySelector(".knowledge-node.selected"), null);
  assert.equal(document.querySelector(".knowledge-node.dimmed"), null);
  assert.ok(
    !calls.some((call) =>
      /^\/api\/knowledge\/nodes\/[^/]+$/.test(call.parsed.pathname),
    ),
  );
  assert.match(document.querySelector("#detail").textContent, /选择图谱节点/);
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  runFrames(500);
  const node = document.querySelector('[data-node-id="node-2"]');
  node.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  const svg = document.querySelector("#knowledge-canvas");
  pointer(dom, svg, "pointerdown", 200, 200, { button: 1 });
  pointer(dom, svg, "pointermove", 270, 230, { button: -1, buttons: 4 });
  pointer(dom, svg, "pointerup", 270, 230, { button: 1 });
  runFrames(1);
  const before = positionsOf(document),
    cameraBefore = cameraOf(document);
  document.querySelector("#refresh").click();
  await settle();
  runFrames(30);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.deepEqual(positionsOf(document), before);
  assert.deepEqual(cameraOf(document), cameraBefore);
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-2",
  );
  assert.match(document.querySelector("#detail").textContent, /接口 B/);
});

test("search results do not replace canvas nodes or clear a selection absent from the results", async (t) => {
  const { dom, document } = await page(
    (url) => {
      if (url.searchParams.get("q"))
        return {
          nodes: [nodes[0]],
          relationships: [],
          total: 1,
          offset: 0,
          hasMore: false,
        };
    },
    { fullGraph: true },
  );
  t.after(() => dom.window.close());
  document
    .querySelector('[data-node-id="node-2"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  document.querySelector("#search").value = "设备";
  document
    .querySelector("#search")
    .dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(320);
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-2",
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 3);
  assert.equal(document.querySelector(".list-item.selected"), null);
  assert.match(document.querySelector("#detail").textContent, /接口 B/);
});

test("dense connected nodes repel into separated positions and clicking does not pin them", async (t) => {
  const dense = Array.from({ length: 8 }, (_, index) => ({
    id: `dense-${index}`,
    name: `节点${index}`,
    label: "实体",
    properties: {},
  }));
  const links = [];
  for (let i = 0; i < dense.length; i += 1)
    for (let j = i + 1; j < dense.length; j += 1)
      links.push({
        id: `link-${i}-${j}`,
        source: dense[i].id,
        target: dense[j].id,
        type: "关联",
      });
  const { dom, document, runFrames } = await page(
    (url) => {
      if (url.pathname.endsWith("/graph"))
        return {
          nodes: dense,
          relationships: links,
          offset: 0,
          hasMore: false,
        };
      if (url.pathname.includes("/nodes/")) return { node: dense[0] };
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  const first = document.querySelector(".knowledge-node");
  const before = first.getAttribute("transform");
  first.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  runFrames(30);
  assert.notEqual(
    first.getAttribute("transform"),
    before,
    "a clicked node must still participate in physics",
  );
  await settle();
  runFrames(260);
  const points = [...document.querySelectorAll(".knowledge-node")].map(
    (node) => ({
      position: positionOf(node),
      radius: Number(node.querySelector("circle").getAttribute("r")),
    }),
  );
  for (let i = 0; i < points.length; i += 1)
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i],
        b = points[j];
      assert.ok(
        Math.hypot(
          a.position[0] - b.position[0],
          a.position[1] - b.position[1],
        ) >
          a.radius + b.radius + 50,
        "dense nodes should have a visible gap rather than merely avoid overlap",
      );
    }
});

test("the workspace renders protected graph, directed parallel edges, and safe selectable text", async (t) => {
  const { dom, document, calls } = await page(undefined, { fullGraph: true });
  t.after(() => dom.window.close());
  assert.equal(document.querySelectorAll(".knowledge-node").length, 3);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 2);
  assert.equal(document.querySelectorAll(".knowledge-node script").length, 0);
  assert.equal(document.querySelector("#graph-modes"), null);
  assert.equal(document.querySelector("#mode-explore"), null);
  assert.equal(document.querySelector("#mode-search"), null);
  const edges = [...document.querySelectorAll(".knowledge-edge")];
  assert.notEqual(edges[0].getAttribute("d"), edges[1].getAttribute("d"));
  const node = document.querySelector('[data-node-id="node-3"]');
  node.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  assert.ok(node.classList.contains("selected"));
  assert.match(
    document.querySelector("#detail").textContent,
    /<script>unsafe\(\)<\/script>/,
  );
  assert.equal(document.querySelectorAll("#detail script").length, 0);
});

test("knowledge source relationships share a dashed arc while Chunk hierarchy and other relations stay directed", async (t) => {
  const fixtureNodes = [
    { id: "knowledge", name: "知识节点", label: "Event" },
    { id: "chunk", name: "来源片段", labels: ["Knowledge", "Chunk"] },
    { id: "parent", name: "父片段", label: "Chunk" },
    { id: "other", name: "另一知识", label: "Person", labels: ["Person"] },
    { id: "image", name: "来源图片", label: "Image" },
  ], fixtureEdges = [
    { id: "extracted", source: "knowledge", target: "chunk", type: "EXTRACTED_FROM" },
    { id: "contains", source: "chunk", target: "knowledge", type: "CONTAINS_KNOWLEDGE" },
    { id: "child", source: "chunk", target: "parent", type: "CHILD_OF" },
    { id: "chunk-reverse", source: "parent", target: "chunk", type: "CONTAINS_KNOWLEDGE" },
    { id: "semantic", source: "knowledge", target: "other", type: "关联" },
    { id: "non-chunk-source", source: "knowledge", target: "other", type: "EXTRACTED_FROM" },
    { id: "illustration", source: "image", target: "chunk", type: "ILLUSTRATES" },
    { id: "custom", source: "chunk", target: "knowledge", type: "用户自定义关系" },
  ];
  const { dom, document, dumpStorage } = await page(graphFixture(fixtureNodes, fixtureEdges), {
    fullGraph: true, controlledAnimation: true,
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 7);
  assert.equal(document.querySelectorAll(".knowledge-edge.source-link").length, 2);
  const source = document.querySelector('[data-edge-id="extracted"]');
  assert.deepEqual(JSON.parse(source.dataset.edgeIds), ["extracted", "contains"]);
  assert.equal(source.hasAttribute("marker-end"), false);
  assert.match(source.querySelector("title").textContent, /EXTRACTED_FROM/);
  assert.match(source.querySelector("title").textContent, /CONTAINS_KNOWLEDGE/);
  const points = source.getAttribute("d").match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.equal(points.length, 6);
  assert.match(source.getAttribute("d"), /^M .* Q .*$/);
  assert.ok(Math.abs((points[2] - points[0]) * (points[5] - points[1]) - (points[3] - points[1]) * (points[4] - points[0])) > 1, "the source association should be a gentle arc rather than a straight line or closed outline");
  const label = document.querySelector('.knowledge-edge-label.source-label');
  assert.equal(label.textContent, "来源");
  assert.ok(Math.abs(Number(label.getAttribute('x')) - (points[0] + 2 * points[2] + points[4]) / 4) < 0.01);
  assert.ok(Math.abs(Number(label.getAttribute('y')) - (points[1] + 2 * points[3] + points[5]) / 4) < 0.01);
  for (const id of ["child", "chunk-reverse", "semantic", "non-chunk-source", "custom"]) {
    const edge = document.querySelector(`[data-edge-id="${id}"]`);
    assert.equal(edge.classList.contains("source-link"), false);
    assert.equal(edge.getAttribute("marker-end"), "url(#graph-arrow)");
    assert.match(edge.getAttribute("d"), / Q /);
  }
  pointer(dom, document.querySelector('[data-node-id="knowledge"]'), "pointerenter", 300, 200);
  assert.equal(source.classList.contains("selected"), true);
  assert.equal(document.querySelector('[data-edge-id="illustration"]').classList.contains("dimmed"), true);
  await settle(250);
  assert.deepEqual(JSON.parse(dumpStorage()[canvasKey()]).edgeIds.sort(), fixtureEdges.map(edge => edge.id).sort(), "visual grouping must retain every original relationship for refresh and authorization");
});

test("source arcs follow node dragging and merge a later reverse relationship without duplicate visuals", async (t) => {
  const root = { id: "root", name: "知识", label: "Event" },
    chunk = { id: "chunk", name: "原文", label: "Chunk" },
    forward = { id: "forward", source: "root", target: "chunk", type: "EXTRACTED_FROM" },
    reverse = { id: "reverse", source: "chunk", target: "root", type: "CONTAINS_KNOWLEDGE" };
  const fixtureNodes = [root, chunk];
  const responder = (url) => {
    if (url.pathname === "/api/knowledge/graph") return { nodes: fixtureNodes, relationships: [forward], hasMore: false };
    if (url.pathname.endsWith("/sources")) return { centerId: "root", nodes: fixtureNodes, relationships: [reverse, forward], hasMore: false };
    if (url.pathname === "/api/knowledge/canvas") return { nodes: fixtureNodes, relationships: [reverse, forward] };
  };
  const ui = await page(responder, { fullGraph: true, controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, runFrames } = ui;
  runFrames(420);
  const source = document.querySelector(".source-link"), before = source.getAttribute("d");
  pointer(dom, document.querySelector('[data-node-id="root"]'), "pointerdown", 200, 200);
  pointer(dom, dom.window, "pointermove", 450, 380);
  runFrames(1);
  assert.notEqual(source.getAttribute("d"), before);
  assert.doesNotMatch(source.getAttribute("d"), /NaN|Infinity/);
  pointer(dom, dom.window, "pointerup", 450, 380);
  openNodeMenu(dom, document, "root").querySelector('[data-action="source-chunks"]').click();
  await settle();
  document.querySelector('[data-action="source-add-page"]').click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 1);
  assert.equal(document.querySelector(".source-link"), source);
  assert.deepEqual(JSON.parse(source.dataset.edgeIds), ["forward", "reverse"]);
  await settle(250);
  const restored = await page(responder, { seedStorage: ui.dumpStorage(), controlledAnimation: true });
  t.after(() => restored.dom.window.close());
  assert.equal(restored.document.querySelectorAll(".source-link").length, 1);
  assert.deepEqual(JSON.parse(restored.document.querySelector(".source-link").dataset.edgeIds).sort(), ["forward", "reverse"]);
  openNodeMenu(restored.dom, restored.document, "root").querySelector('[data-action="source-hide"]').click();
  assert.equal(restored.document.querySelectorAll(".knowledge-edge").length, 0);
  assert.ok(restored.document.querySelector('[data-node-id="root"]'));
});

test("dragged nodes influence neighbors and return to free motion on release; pan and zoom stay available", async (t) => {
  const { dom, document, runFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(420);
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    neighbor = document.querySelector('[data-node-id="node-2"]');
  const neighborBefore = positionOf(neighbor);
  pointer(dom, node, "pointerdown", 250, 210);
  pointer(dom, svg, "pointermove", 520, 320);
  runFrames(1);
  const moved = node.getAttribute("transform");
  runFrames(30);
  assert.equal(
    node.getAttribute("transform"),
    moved,
    "the node stays under the pointer while it is being dragged",
  );
  assert.ok(
    distance(positionOf(neighbor), neighborBefore) > 2,
    "linked neighbors should respond while the user moves a node",
  );
  pointer(dom, svg, "pointerup", 520, 320);
  runFrames(20);
  assert.notEqual(
    node.getAttribute("transform"),
    moved,
    "releasing the node lets the physical forces move it naturally",
  );
  const camera = document.querySelector("#graph-camera");
  const beforePan = camera.getAttribute("transform");
  pointer(dom, svg, "pointerdown", 350, 210);
  pointer(dom, svg, "pointermove", 400, 235);
  pointer(dom, svg, "pointerup", 400, 235);
  runFrames(1);
  assert.notEqual(camera.getAttribute("transform"), beforePan);
  const beforeZoom = parseInt(
    document.querySelector("#graph-zoom").textContent,
  );
  const wheel = new dom.window.WheelEvent("wheel", {
    deltaY: -80,
    clientX: 400,
    clientY: 250,
    cancelable: true,
  });
  svg.dispatchEvent(wheel);
  assert.equal(wheel.defaultPrevented, true);
  assert.ok(
    parseInt(document.querySelector("#graph-zoom").textContent) > beforeZoom,
  );
});

test("continuous drag input is rendered once per frame without neighbor jumps and preserves the grab offset", async (t) => {
  const { dom, document, runFrames } = await page(
    graphFixture(nodes.slice(0, 2), relationships.slice(0, 1)),
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  runFrames(420);
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    neighbor = document.querySelector('[data-node-id="node-2"]'),
    initial = positionOf(node),
    [panX, panY, scale] = cameraOf(document),
    grabX = panX + initial[0] * scale + 7,
    grabY = panY + initial[1] * scale + 4;
  const renderWrites = new Map();
  for (const element of [node, neighbor]) {
    const setAttribute = element.setAttribute.bind(element);
    element.setAttribute = (name, value) => {
      if (name === "transform")
        renderWrites.set(element, (renderWrites.get(element) || 0) + 1);
      setAttribute(name, value);
    };
  }
  pointer(dom, node, "pointerdown", grabX, grabY);
  const neighborBeforeInput = neighbor.getAttribute("transform");
  renderWrites.clear();
  for (const delta of [30, 60, 90])
    pointer(dom, svg, "pointermove", grabX + delta, grabY + delta / 3);
  assert.equal(
    neighbor.getAttribute("transform"),
    neighborBeforeInput,
    "input must not render the neighbor's next physics step ahead of interpolation",
  );
  assert.equal(
    renderWrites.size,
    0,
    "pointer input should coalesce before rendering",
  );
  runFrames(1);
  assert.equal(renderWrites.get(node), 1);
  assert.equal(renderWrites.get(neighbor), 1);
  assert.ok(
    distance(positionOf(node), [
      initial[0] + 90 / scale,
      initial[1] + 30 / scale,
    ]) < 0.05,
    "dragging at the edge of a circle keeps the original pointer-to-node offset",
  );
  for (let index = 0; index < 12; index += 1) {
    // High refresh rate exposes the interpolated half-step that pointermove used to overwrite.
    runFrames(1, 1000 / 120);
    const renderedBeforeInput = neighbor.getAttribute("transform");
    pointer(dom, svg, "pointermove", grabX + 100 + index * 2, grabY + 30);
    pointer(dom, svg, "pointermove", grabX + 101 + index * 2, grabY + 30);
    assert.equal(neighbor.getAttribute("transform"), renderedBeforeInput);
  }
  runFrames(1);
  let movingFrames = 0,
    previous = positionOf(neighbor);
  for (let index = 0; index < 24; index += 1) {
    runFrames(1);
    const next = positionOf(neighbor);
    if (distance(previous, next) > 0.001) movingFrames += 1;
    previous = next;
  }
  assert.ok(
    movingFrames >= 20,
    "while a node is held, connected neighbors should respond continuously across frames",
  );
  pointer(dom, svg, "pointerup", grabX + 123, grabY + 30);
});

test("middle-button drag pans from canvas or node even when paused and suppresses browser autoscroll", async (t) => {
  const { dom, document, runFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(420);
  document.querySelector("#graph-physics").click();
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    captures = trackPointerCapture(svg),
    originalNodes = positionsOf(document);
  for (const target of [svg, node]) {
    const beforePan = cameraOf(document);
    const down = pointer(dom, target, "pointerdown", 250, 210, {
      button: 1,
      pointerId: 4,
    });
    assert.equal(down.defaultPrevented, true);
    assert.equal(svg.classList.contains("dragging"), true);
    assert.equal(captures.active.has(4), true);
    pointer(dom, svg, "pointermove", 310, 235, {
      button: -1,
      buttons: 4,
      pointerId: 4,
    });
    runFrames(1);
    const afterPan = cameraOf(document);
    assert.ok(Math.abs(afterPan[0] - beforePan[0] - 60) < 0.05);
    assert.ok(Math.abs(afterPan[1] - beforePan[1] - 25) < 0.05);
    assert.equal(afterPan[2], beforePan[2]);
    assert.deepEqual(positionsOf(document), originalNodes);
    assert.equal(document.querySelector(".knowledge-node.selected"), null);
    pointer(dom, svg, "pointerup", 310, 235, { button: 1, pointerId: 4 });
    assert.equal(svg.classList.contains("dragging"), false);
    assert.equal(captures.active.size, 0);
    const auxclick = new dom.window.MouseEvent("auxclick", {
      button: 1,
      bubbles: true,
      cancelable: true,
    });
    target.dispatchEvent(auxclick);
    assert.equal(auxclick.defaultPrevented, true);
    assert.equal(document.querySelector(".knowledge-node.selected"), null);
  }
  const cameraBeforeRightClick = cameraOf(document);
  const rightDown = pointer(dom, node, "pointerdown", 250, 210, { button: 2 });
  assert.equal(rightDown.defaultPrevented, false);
  assert.equal(svg.classList.contains("dragging"), false);
  pointer(dom, svg, "pointermove", 320, 250, { button: -1, buttons: 2 });
  pointer(dom, svg, "pointerup", 320, 250, { button: 2 });
  runFrames(1);
  assert.deepEqual(cameraOf(document), cameraBeforeRightClick);
  assert.deepEqual(positionsOf(document), originalNodes);
});

test("paused physics still renders left-button node drags and the final movement before release", async (t) => {
  const { dom, document, runFrames, pendingFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(420);
  document.querySelector("#graph-physics").click();
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    neighbor = document.querySelector('[data-node-id="node-2"]'),
    initial = positionOf(node),
    neighborBefore = positionOf(neighbor),
    [panX, panY, scale] = cameraOf(document),
    grabX = panX + initial[0] * scale + 6,
    grabY = panY + initial[1] * scale + 3;
  pointer(dom, node, "pointerdown", grabX, grabY);
  pointer(dom, svg, "pointermove", grabX + 40, grabY + 20);
  assert.deepEqual(positionOf(node), initial);
  runFrames(1);
  assert.ok(
    distance(positionOf(node), [
      initial[0] + 40 / scale,
      initial[1] + 20 / scale,
    ]) < 0.05,
  );
  assert.deepEqual(positionOf(neighbor), neighborBefore);
  // A fast release before the next display frame must not lose the last pointer move.
  pointer(dom, svg, "pointermove", grabX + 80, grabY + 40);
  pointer(dom, svg, "pointerup", grabX + 80, grabY + 40);
  runFrames(1);
  assert.ok(
    distance(positionOf(node), [
      initial[0] + 80 / scale,
      initial[1] + 40 / scale,
    ]) < 0.05,
  );
  const dropped = positionsOf(document);
  runFrames(120);
  assert.deepEqual(positionsOf(document), dropped);
  assert.equal(pendingFrames(), 0);
  assert.equal(
    document.querySelector("#graph-physics").getAttribute("aria-pressed"),
    "false",
  );
});

test("physical animation can pause without a position jump and resume from the same layout", async (t) => {
  const { dom, document, runFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  const control = document.querySelector("#graph-physics");
  assert.ok(control, "the graph should expose an animation control");
  assert.equal(control.getAttribute("aria-pressed"), "true");
  assert.match(control.textContent, /暂停动画/);
  runFrames(12);
  const beforePause = positionsOf(document);
  control.click();
  assert.equal(control.getAttribute("aria-pressed"), "false");
  assert.match(control.textContent, /恢复动画/);
  runFrames(120);
  assert.deepEqual(positionsOf(document), beforePause);
  control.click();
  assert.equal(control.getAttribute("aria-pressed"), "true");
  assert.deepEqual(
    positionsOf(document),
    beforePause,
    "resuming should not reset or teleport the nodes",
  );
  runFrames(20);
  assert.ok(
    positionsOf(document).some(
      (point, index) => distance(point, beforePause[index]) > 0.1,
    ),
  );
});

test("cancelled pointer drags release the node, settle again, and never refit the user's camera", async (t) => {
  const { dom, document, runFrames, pendingFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(420);
  const svg = document.querySelector("#knowledge-canvas"),
    node = document.querySelector('[data-node-id="node-1"]'),
    camera = document.querySelector("#graph-camera");
  for (const cancelEvent of ["pointercancel", "lostpointercapture"]) {
    pointer(dom, node, "pointerdown", 250, 210);
    pointer(dom, svg, "pointermove", 480, 310);
    runFrames(1);
    const cameraAtDrag = camera.getAttribute("transform"),
      heldPosition = node.getAttribute("transform");
    runFrames(20);
    assert.equal(node.getAttribute("transform"), heldPosition);
    assert.equal(camera.getAttribute("transform"), cameraAtDrag);
    pointer(dom, svg, cancelEvent, 480, 310);
    assert.equal(svg.classList.contains("dragging"), false);
    runFrames(30);
    assert.notEqual(
      node.getAttribute("transform"),
      heldPosition,
      `${cancelEvent} must not leave a node fixed or a simulation reheated forever`,
    );
    runFrames(500);
    assert.equal(pendingFrames(), 0);
    assert.equal(camera.getAttribute("transform"), cameraAtDrag);
  }
});

test("reduced motion keeps the graph animation setting enabled and lets the user pause it", async (t) => {
  const { dom, document, runFrames, pendingFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
    reducedMotion: true,
  });
  t.after(() => dom.window.close());
  const control = document.querySelector("#graph-physics"),
    original = positionsOf(document);
  assert.equal(control.getAttribute("aria-pressed"), "true");
  runFrames(20);
  assert.ok(
    positionsOf(document).some(
      (point, index) => distance(point, original[index]) > 1,
    ),
  );
  control.click();
  assert.equal(control.getAttribute("aria-pressed"), "false");
  const paused = positionsOf(document);
  runFrames(120);
  assert.deepEqual(positionsOf(document), paused);
  assert.equal(pendingFrames(), 0);
});

test("a settled graph stays still across refresh but reheats when new neighbors are added", async (t) => {
  const { dom, document, runFrames, pendingFrames } = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => dom.window.close());
  runFrames(500);
  const settled = positionsOf(document);
  assert.equal(
    pendingFrames(),
    0,
    "a settled graph should stop consuming frames",
  );
  runFrames(60);
  assert.deepEqual(positionsOf(document), settled);
  document.querySelector("#refresh").click();
  await settle();
  runFrames(60);
  assert.deepEqual(
    positionsOf(document),
    settled,
    "refreshing unchanged data must not restart the layout",
  );
  assert.equal(pendingFrames(), 0);
  document
    .querySelector('[data-node-id="node-2"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  runFrames(40);
  assert.ok(
    positionsOf(document)
      .slice(0, settled.length)
      .some((point, index) => distance(point, settled[index]) > 0.1),
    "adding a connected neighbor should bring the existing nodes back into motion",
  );
});

test("the force layout advances at the same pace on 60 Hz and 120 Hz displays", async (t) => {
  const slow = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  const fast = await page(undefined, {
    controlledAnimation: true,
    fullGraph: true,
  });
  t.after(() => slow.dom.window.close());
  t.after(() => fast.dom.window.close());
  // Give both simulations their first animation frame, then compare equal time.
  slow.runFrames(1);
  fast.runFrames(1);
  slow.runFrames(90, 1000 / 60);
  fast.runFrames(180, 1000 / 120);
  const a = positionsOf(slow.document),
    b = positionsOf(fast.document);
  a.forEach((point, index) =>
    assert.ok(
      distance(point, b[index]) < 2,
      "display refresh rate must not change the physical simulation speed",
    ),
  );
});

test("parallel visual relationships do not multiply the force between the same two nodes", async (t) => {
  const one = await page(
    graphFixture(nodes.slice(0, 2), relationships.slice(0, 1)),
    {
      controlledAnimation: true,
      fullGraph: true,
    },
  );
  const parallel = await page(
    graphFixture(nodes.slice(0, 2), relationships.slice(0, 2)),
    {
      controlledAnimation: true,
      fullGraph: true,
    },
  );
  t.after(() => one.dom.window.close());
  t.after(() => parallel.dom.window.close());
  assert.equal(one.document.querySelectorAll(".knowledge-edge").length, 1);
  assert.equal(parallel.document.querySelectorAll(".knowledge-edge").length, 2);
  one.runFrames(120);
  parallel.runFrames(120);
  const a = positionsOf(one.document),
    b = positionsOf(parallel.document);
  a.forEach((point, index) =>
    assert.ok(
      distance(point, b[index]) < 2,
      "multiple relationship records should share one physical spring",
    ),
  );
});

test("canvas undo restores an expansion with its exact camera, selection and layout", async (t) => {
  const ui = await page(undefined, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  const canvas = document.querySelector("#knowledge-canvas");
  assert.equal(document.querySelector("#graph-undo").disabled, true);
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  const beforeCamera = cameraOf(document), beforeLayout = positionsOf(document);
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.equal(document.querySelector("#graph-undo").disabled, false);
  canvas.focus();
  const undo = new dom.window.KeyboardEvent("keydown", { key: "z", ctrlKey: true, bubbles: true, cancelable: true });
  canvas.dispatchEvent(undo);
  await settle();
  assert.equal(undo.defaultPrevented, true);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  assert.deepEqual(cameraOf(document), beforeCamera);
  assert.deepEqual(positionsOf(document), beforeLayout);
  assert.ok(document.querySelector('[data-node-id="node-1"].selected'));
  assert.match(document.querySelector("#detail").textContent, /设备 A/);
  assert.equal(document.querySelector("#graph-undo").disabled, true);
  assert.ok(!calls.some((call) => call.method === "DELETE" || call.method === "PUT"));
});

test("canvas undo cancels pending expansion and ignores its late response without consuming earlier history", async (t) => {
  let release, hold = false;
  const { dom, document } = await page(async (url) => {
    if (hold && url.pathname.endsWith("/nodes/node-1/graph")) return await new Promise((resolve) => { release = resolve; });
  });
  t.after(() => dom.window.close());
  const node = () => document.querySelector('[data-node-id="node-1"]');
  node().dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  hold = true;
  node().dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(typeof release, "function");
  document.querySelector("#graph-undo").click();
  release({ nodes: [{ id: "late", name: "迟到节点", label: "知识" }], relationships: [] });
  await settle();
  assert.equal(document.querySelector('[data-node-id="late"]'), null);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.equal(document.querySelectorAll(".knowledge-node.expanding").length, 0);
  assert.equal(document.querySelector("#graph-undo").disabled, false);
  document.querySelector("#graph-undo").click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  await settle();
});

test("canvas undo restores hidden nodes and clear, while duplicate expansions add no empty history entries", async (t) => {
  const { dom, document } = await page(undefined, { controlledAnimation: true });
  t.after(() => dom.window.close());
  const expand = () => document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  expand(); await settle();
  expand(); await settle();
  openNodeMenu(dom, document, "node-2").querySelector('[data-action="hide"]').click();
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
  document.querySelector("#graph-undo").click();
  assert.ok(document.querySelector('[data-node-id="node-2"]'));
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 3);
  document.querySelector("#graph-clear").click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  document.querySelector("#graph-undo").click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  document.querySelector("#graph-undo").click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(document.querySelector("#graph-undo").disabled, true);
  await settle();
});

test("canvas undo shortcuts preserve text editing and ignore unrelated page focus and open dialogs", async (t) => {
  const { dom, document } = await page();
  t.after(() => dom.window.close());
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  const shortcut = (target) => {
    const event = new dom.window.KeyboardEvent("keydown", { key: "z", ctrlKey: true, bubbles: true, cancelable: true });
    target.dispatchEvent(event); return event;
  };
  const search = document.querySelector("#search");
  search.focus();
  assert.equal(shortcut(search).defaultPrevented, false);
  document.querySelector("#filter").focus();
  assert.equal(shortcut(document.body).defaultPrevented, false);
  const canvas = document.querySelector("#knowledge-canvas");
  canvas.focus();
  document.querySelector("#create-dialog").showModal();
  assert.equal(shortcut(canvas).defaultPrevented, false);
  document.querySelector("#create-dialog").close();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  const undo = new dom.window.KeyboardEvent("keydown", { key: "z", metaKey: true, bubbles: true, cancelable: true });
  canvas.dispatchEvent(undo);
  assert.equal(undo.defaultPrevented, true);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  await settle();
});

test("scope changes discard canvas undo instead of restoring knowledge from another authorization scope", async (t) => {
  const { dom, document } = await page();
  t.after(() => dom.window.close());
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(document.querySelector("#graph-undo").disabled, false);
  await switchScope(dom, document, "another-conversation");
  assert.equal(document.querySelector("#graph-undo").disabled, true);
  const canvas = document.querySelector("#knowledge-canvas"); canvas.focus();
  const undo = new dom.window.KeyboardEvent("keydown", { key: "z", ctrlKey: true, bubbles: true, cancelable: true });
  canvas.dispatchEvent(undo);
  assert.equal(undo.defaultPrevented, false);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
});

test("successful database deletion clears undo so locally hidden history cannot revive deleted knowledge", async (t) => {
  const { dom, document, calls } = await page((url, options) => {
    if (url.pathname === "/api/knowledge/nodes/node-2" && options.method === "DELETE") return { deleted: true };
  });
  t.after(() => dom.window.close());
  dom.window.confirm = () => true;
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  openNodeMenu(dom, document, "node-2"); await settle();
  document.querySelector('[data-action="node-delete"]').click(); await settle();
  assert.ok(calls.some((call) => call.method === "DELETE"));
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
  assert.equal(document.querySelector("#graph-undo").disabled, true);
  document.querySelector("#graph-undo").click();
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
});

test("relayout undo restores exact node positions without replaying the force simulation", async (t) => {
  const ui = await page(undefined, { controlledAnimation: true, fullGraph: true });
  t.after(() => ui.dom.window.close());
  ui.runFrames(40);
  const before = positionsOf(ui.document), camera = cameraOf(ui.document);
  ui.document.querySelector("#graph-layout").click();
  ui.runFrames(12);
  ui.document.querySelector("#graph-undo").click();
  assert.deepEqual(positionsOf(ui.document), before);
  assert.deepEqual(cameraOf(ui.document), camera);
  ui.runFrames(20);
  assert.deepEqual(positionsOf(ui.document), before);
});

test("drag undo restores the graph layout and camera as one gesture", async (t) => {
  const ui = await page(undefined, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui;
  const node = document.querySelector('[data-node-id="node-1"]'), canvas = document.querySelector("#knowledge-canvas");
  const before = positionsOf(document), camera = cameraOf(document);
  pointer(dom, node, "pointerdown", 400, 270);
  pointer(dom, dom.window, "pointermove", 500, 320);
  ui.runFrames(1);
  pointer(dom, dom.window, "pointerup", 500, 320);
  ui.runFrames(3);
  assert.notDeepEqual(positionsOf(document), before);
  document.querySelector("#graph-undo").click();
  assert.deepEqual(positionsOf(document), before);
  pointer(dom, canvas, "pointerdown", 500, 350, { button: 1 });
  pointer(dom, dom.window, "pointermove", 550, 400, { button: 1 });
  ui.runFrames(1);
  pointer(dom, dom.window, "pointerup", 550, 400, { button: 1 });
  assert.notDeepEqual(cameraOf(document), camera);
  document.querySelector("#graph-undo").click();
  assert.deepEqual(cameraOf(document), camera);
});

test("double click merges neighbors without duplicate nodes and keeps details available", async (t) => {
  const { dom, document, calls } = await page();
  t.after(() => dom.window.close());
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 3);
  assert.match(document.querySelector("#detail").textContent, /设备 A/);
  assert.ok(
    calls.some(
      (call) => call.parsed.pathname === "/api/knowledge/nodes/node-1/graph",
    ),
  );
  assert.match(document.querySelector("#graph-count").textContent, /4 个节点/);
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 3);
});

test("typing searches the result list without replacing the working canvas", async (t) => {
  const { dom, document, calls } = await page();
  t.after(() => dom.window.close());
  const search = document.querySelector("#search");
  search.value = "接口";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(320);
  assert.equal(document.querySelector("#mode-search"), null);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname.endsWith("/search") &&
        call.parsed.searchParams.get("q") === "接口",
    ),
  );
  assert.match(document.querySelector("#count").textContent, /2 个匹配结果/);
  assert.equal(document.querySelectorAll("#list .list-item").length, 2);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
  search.value = "";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.equal(document.querySelector("#search-dropdown").hidden, false);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
});

test("unified search shows all results on focus and treats empty or whitespace queries as server searches", async (t) => {
  const { dom, document, calls } = await page((url) => {
    if (url.pathname === "/api/knowledge/search") {
      const result =
        url.searchParams.get("label") === "接口"
          ? [nodes[1]]
          : nodes.slice(0, 2);
      return { nodes: result, total: result.length, hasMore: false };
    }
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelector(".graph-modes"), null);
  assert.equal(document.querySelector("#search-dropdown").hidden, true);
  const search = openTopSearch(document);
  await settle();
  assert.equal(document.querySelector("#search-dropdown").hidden, false);
  assert.equal(document.querySelectorAll("#list .list-item").length, 2);
  document.querySelector("#graph-caption").click();
  const filter = document.querySelector("#filter");
  filter.value = "接口";
  filter.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  await settle();
  assert.equal(document.querySelector("#search-dropdown").hidden, false);
  assert.equal(document.querySelectorAll("#list .list-item").length, 1);
  search.value = "   ";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  const latestSearch = calls
    .filter((call) => call.parsed.pathname === "/api/knowledge/search")
    .at(-1);
  assert.equal(latestSearch.parsed.searchParams.get("q").trim(), "");
  assert.equal(latestSearch.parsed.searchParams.get("label"), "接口");
  assert.equal(document.querySelector("#search-dropdown").hidden, false);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
});

test("choosing a search result appends only that node with visible connections and never duplicates it", async (t) => {
  const { dom, document, calls } = await page(undefined, {
    controlledAnimation: true,
  });
  t.after(() => dom.window.close());
  const search = document.querySelector("#search");
  search.value = "接口";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(320);
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-2",
  );
  assert.ok(document.querySelector('[data-node-id="node-1"]'));
  assert.equal(document.querySelector('[data-node-id="node-3"]'), null);
  assert.equal(document.querySelector('[data-node-id="node-4"]'), null);
  assert.ok(document.querySelector('[data-edge-id="r-1"]'));
  assert.match(document.querySelector("#detail").textContent, /接口 B/);
  openTopSearch(document);
  await settle();
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  document.querySelector("#refresh").click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-2",
  );
  assert.ok(!calls.some((call) => call.method === "POST"));
});

test("knowledge results open directly from search and dismiss on selection, outside click and Escape", async (t) => {
  const { dom, document } = await page();
  t.after(() => dom.window.close());
  const search = document.querySelector("#search"),
    dropdown = document.querySelector("#search-dropdown");
  assert.equal(dropdown.hidden, true);
  assert.equal(search.getAttribute("aria-expanded"), "false");
  assert.equal(document.querySelector("#list").parentElement, dropdown);
  assert.equal(document.querySelector("#pagination").parentElement, dropdown);
  assert.ok(dropdown.contains(document.querySelector("#count")));
  assert.equal(document.querySelector("#graph-panel #list"), null);
  assert.equal(document.querySelector("#search-results-close"), null);

  openTopSearch(document);
  await settle();
  assert.equal(dropdown.hidden, false);
  assert.equal(search.getAttribute("aria-expanded"), "true");
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.equal(dropdown.hidden, true);
  assert.match(document.querySelector("#detail").textContent, /接口 B/);

  openTopSearch(document);
  await settle();
  search.click();
  assert.equal(dropdown.hidden, false);
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  assert.equal(dropdown.hidden, true);
  assert.match(document.querySelector("#detail").textContent, /设备 A/);

  search.click();
  document.querySelector("#graph-caption").click();
  assert.equal(dropdown.hidden, true);
  search.click();
  search.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
      cancelable: true,
    }),
  );
  assert.equal(dropdown.hidden, true);
  assert.equal(document.activeElement, search);
  search.click();
  document.querySelector("#graph-caption").click();
  await settle();
  assert.equal(dropdown.hidden, true);
  assert.equal(search.getAttribute("aria-expanded"), "false");
});

test("a late search response and refresh do not reopen dismissed search results", async (t) => {
  let release;
  const { dom, document, calls } = await page(async (url) => {
    if (
      url.pathname.endsWith("/search") &&
      url.searchParams.get("q") === "接口" &&
      !release
    )
      return await new Promise((resolve) => {
        release = resolve;
      });
  });
  t.after(() => dom.window.close());
  const search = document.querySelector("#search"),
    dropdown = document.querySelector("#search-dropdown");
  search.value = "接口";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  assert.equal(dropdown.hidden, false);
  await settle(300);
  assert.equal(typeof release, "function");
  document.querySelector("#graph-caption").click();
  assert.equal(dropdown.hidden, true);
  release({ nodes: [nodes[1]], total: 1, hasMore: false });
  await settle();
  assert.equal(dropdown.hidden, true);
  assert.equal(document.querySelectorAll("#list .list-item").length, 1);

  document.querySelector("#refresh").click();
  await settle();
  assert.equal(dropdown.hidden, true);
  assert.equal(
    calls.filter(
      (call) =>
        call.parsed.pathname.endsWith("/search") &&
        call.parsed.searchParams.get("q") === "接口",
    ).length,
    2,
  );
  search.click();
  assert.equal(dropdown.hidden, false);
  assert.equal(document.querySelectorAll("#list .list-item").length, 2);
  await settle();
});

test("search dropdown retains pagination and shows empty results without hiding itself", async (t) => {
  const { dom, document, calls } = await page((url) => {
    if (url.pathname.endsWith("/search")) {
      if (url.searchParams.get("q") === "missing")
        return { nodes: [], total: 0, hasMore: false };
      return {
        nodes: url.searchParams.get("offset") === "0" ? [nodes[0]] : [nodes[1]],
        total: 21,
        hasMore: url.searchParams.get("offset") === "0",
      };
    }
  });
  t.after(() => dom.window.close());
  const search = document.querySelector("#search"),
    dropdown = document.querySelector("#search-dropdown");
  openTopSearch(document);
  await settle();
  assert.equal(document.querySelector("#pagination").hidden, false);
  assert.equal(document.querySelector("#previous").disabled, true);
  document.querySelector("#next").click();
  await settle();
  assert.equal(dropdown.hidden, false);
  assert.match(document.querySelector("#list").textContent, /接口 B/);
  assert.equal(document.querySelector("#next").disabled, true);
  assert.equal(document.querySelector("#previous").disabled, false);
  assert.match(document.querySelector("#page-number").textContent, /第 2 页/);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname.endsWith("/search") &&
        Number(call.parsed.searchParams.get("offset")) > 0,
    ),
  );
  document.querySelector("#previous").click();
  await settle();
  assert.equal(dropdown.hidden, false);
  assert.match(document.querySelector("#list").textContent, /设备 A/);
  search.value = "missing";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(320);
  assert.equal(dropdown.hidden, false);
  assert.match(document.querySelector("#list").textContent, /没有匹配的结果/);
  assert.match(document.querySelector("#count").textContent, /0 个匹配结果/);
  assert.equal(document.querySelector("#pagination").hidden, true);
});

test("switching authorization context discards pending expansion from previous scope", async (t) => {
  let release;
  const { dom, document, calls } = await page(async (url) => {
    if (url.pathname.endsWith("/nodes/node-1/graph"))
      return await new Promise((resolve) => {
        release = resolve;
      });
    if (
      url.searchParams.get("conversationId") === "conversation-new" &&
      url.pathname.endsWith("/graph")
    )
      return {
        nodes: [{ id: "scoped-node", name: "会话知识", label: "知识" }],
        relationships: [],
        offset: 0,
        hasMore: false,
      };
  });
  t.after(() => dom.window.close());
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  document.querySelector("#scope-context").click();
  document.querySelector('[name="conversationId"]').value = "conversation-new";
  document
    .querySelector("#create-form")
    .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  await settle();
  release({
    nodes: [{ id: "old-scope-node", name: "旧范围节点" }],
    relationships: [],
  });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.ok(document.querySelector('[data-node-id="scoped-node"]'));
  assert.equal(document.querySelector('[data-node-id="old-scope-node"]'), null);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname.endsWith("/graph") &&
        call.parsed.searchParams.get("conversationId") === "conversation-new",
    ),
  );
});

test("search pagination never exposes bulk graph loading or replaces the canvas", async (t) => {
  const { dom, document, calls } = await page((url) => {
    if (url.pathname.endsWith("/search"))
      return { nodes: nodes.slice(0, 2), total: 50, hasMore: true };
  });
  t.after(() => dom.window.close());
  assert.equal(document.querySelector("#graph-more")?.hidden ?? true, true);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  openTopSearch(document);
  await settle();
  assert.equal(document.querySelector("#graph-more")?.hidden ?? true, true);
  document.querySelector("#next").click();
  await settle();
  assert.ok(!calls.some((call) => call.method === "POST"));
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
});

test("a real page reload restores authorized nodes, hidden IDs, dragged layout and camera from metadata only", async (t) => {
  const snapshot = {
    version: 1,
    initialized: true,
    nodes: [
      { id: "node-1", x: -135, y: 90 },
      { id: "node-2", x: 145, y: -70 },
    ],
    edgeIds: ["r-1", "r-2"],
    camera: { x: 385, y: 245, scale: 1.6 },
    selected: "node-2",
    hiddenIds: ["node-3"],
  };
  const first = await page(undefined, {
    controlledAnimation: true,
    seedStorage: { [canvasKey()]: JSON.stringify(snapshot) },
  });
  t.after(() => first.dom.window.close());
  assert.equal(first.document.querySelectorAll(".knowledge-node").length, 2);
  assert.deepEqual(positionsOf(first.document), [
    [-135, 90],
    [145, -70],
  ]);
  assert.deepEqual(cameraOf(first.document), [385, 245, 1.6]);
  assert.equal(
    first.document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "node-2",
  );
  assert.ok(
    first.calls.some((call) =>
      call.parsed.pathname === "/api/knowledge/canvas",
    ),
    "cached identities must be rehydrated through an authorized backend request",
  );
  assert.ok(
    !first.calls.some(
      (call) => call.parsed.pathname === "/api/knowledge/graph",
    ),
  );
  first.runFrames(120);
  assert.deepEqual(positionsOf(first.document), [
    [-135, 90],
    [145, -70],
  ]);
  first.document.querySelector("#graph-physics").click();
  const svg = first.document.querySelector("#knowledge-canvas"),
    node = first.document.querySelector('[data-node-id="node-2"]'),
    initial = positionOf(node),
    [panX, panY, scale] = cameraOf(first.document),
    x = panX + initial[0] * scale,
    y = panY + initial[1] * scale;
  pointer(first.dom, node, "pointerdown", x, y);
  pointer(first.dom, svg, "pointermove", x + 55, y + 35);
  first.runFrames(1);
  pointer(first.dom, svg, "pointerup", x + 55, y + 35);
  pointer(first.dom, svg, "pointerdown", 200, 200, { button: 1 });
  pointer(first.dom, svg, "pointermove", 275, 245, { button: -1, buttons: 4 });
  pointer(first.dom, svg, "pointerup", 275, 245, { button: 1 });
  first.runFrames(1);
  await settle(300);
  const layout = positionsOf(first.document),
    camera = cameraOf(first.document),
    storage = first.dumpStorage(),
    serialized = storage[canvasKey()];
  assert.ok(serialized);
  assert.ok(
    !serialized.includes("设备") &&
      !serialized.includes("接口") &&
      !serialized.includes("properties"),
    "the persisted workspace must not cache knowledge content",
  );
  assert.deepEqual(JSON.parse(serialized).hiddenIds, ["node-3"]);
  first.dom.window.close();
  const restored = await page(undefined, {
    controlledAnimation: true,
    seedStorage: storage,
  });
  t.after(() => restored.dom.window.close());
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 2);
  assert.deepEqual(positionsOf(restored.document), layout);
  assert.deepEqual(cameraOf(restored.document), camera);
  assert.equal(
    restored.document.querySelector('[data-node-id="node-3"]'),
    null,
  );
  restored.runFrames(120);
  assert.deepEqual(positionsOf(restored.document), layout);
  assert.deepEqual(cameraOf(restored.document), camera);
});

test("clearing the workspace cancels late expansion and search results and survives refresh and reload", async (t) => {
  let releaseExpansion, releaseAddition, releaseSearch;
  const { dom, document, calls, dumpStorage } = await page(async (url) => {
    if (url.pathname.endsWith("/nodes/node-1/graph"))
      return await new Promise((resolve) => {
        releaseExpansion = resolve;
      });
    if (url.pathname.endsWith("/nodes/node-2/graph"))
      return await new Promise((resolve) => {
        releaseAddition = resolve;
      });
    if (
      url.pathname.endsWith("/search") &&
      url.searchParams.get("q") === "late" &&
      !releaseSearch
    )
      return await new Promise((resolve) => {
        releaseSearch = resolve;
      });
  });
  t.after(() => dom.window.close());
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(typeof releaseExpansion, "function");
  openTopSearch(document);
  await settle();
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.equal(typeof releaseAddition, "function");
  const search = document.querySelector("#search");
  search.value = "late";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.equal(typeof releaseSearch, "function");
  assert.equal(document.querySelector("#graph-clear").disabled, false);
  document.querySelector("#graph-clear").click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  assert.equal(document.querySelector(".knowledge-node.selected"), null);
  releaseExpansion({ nodes, relationships });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  releaseAddition({ nodes, relationships });
  await settle();
  assert.equal(
    document.querySelectorAll(".knowledge-node").length,
    0,
    "a search selection made before clear must not add its node after the lookup returns",
  );
  releaseSearch({ nodes, total: 3, hasMore: false });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  const previousAddition = releaseAddition;
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.notEqual(releaseAddition, previousAddition);
  assert.equal(
    document.querySelector("#graph-clear").disabled,
    false,
    "an empty canvas must still allow cancelling a pending node addition",
  );
  document.querySelector("#graph-clear").click();
  releaseAddition({ nodes, relationships });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  document.querySelector("#refresh").click();
  await settle(300);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  const storage = dumpStorage();
  assert.deepEqual(JSON.parse(storage[canvasKey()]).nodes, []);
  assert.equal(JSON.parse(storage[canvasKey()]).initialized, true);
  dom.window.close();
  const restored = await page(undefined, { seedStorage: storage });
  t.after(() => restored.dom.window.close());
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 0);
  assert.ok(
    !restored.calls.some(
      (call) => call.parsed.pathname === "/api/knowledge/graph",
    ),
    "an intentionally empty workspace must not reseed on reload",
  );
  assert.ok(!calls.some((call) => call.method === "DELETE"));
});

test("switching authorization scope restores an independent cached canvas and its empty state", async (t) => {
  let releaseOldSearch, releaseNewOverview;
  const seedStorage = {
    [canvasKey()]: JSON.stringify({
      version: 1,
      initialized: true,
      nodes: [{ id: "node-1", x: 32, y: 18 }],
      edgeIds: [],
      camera: { x: 300, y: 210, scale: 1.1 },
      selected: null,
      hiddenIds: [],
    }),
    [canvasKey("conversation-b")]: JSON.stringify({
      version: 1,
      initialized: true,
      nodes: [{ id: "node-2", x: -28, y: 62 }],
      edgeIds: [],
      camera: { x: 425, y: 275, scale: 1.4 },
      selected: null,
      hiddenIds: ["node-1"],
    }),
  };
  const { dom, document, calls } = await page(
    async (url) => {
      if (
        url.pathname === "/api/knowledge/search" &&
        url.searchParams.get("q") === "old-scope" &&
        !url.searchParams.get("conversationId") &&
        !releaseOldSearch
      )
        return await new Promise((resolve) => {
          releaseOldSearch = resolve;
        });
      if (
        url.pathname === "/api/knowledge/overview" &&
        url.searchParams.get("conversationId") === "conversation-b" &&
        !releaseNewOverview
      )
        return await new Promise((resolve) => {
          releaseNewOverview = resolve;
        });
    },
    { controlledAnimation: true, seedStorage },
  );
  t.after(() => dom.window.close());
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
  assert.deepEqual(cameraOf(document), [300, 210, 1.1]);
  document.querySelector("#search").value = "old-scope";
  document
    .querySelector("#search")
    .dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.equal(typeof releaseOldSearch, "function");
  await switchScope(dom, document, "conversation-b");
  assert.equal(typeof releaseNewOverview, "function");
  releaseOldSearch({
    nodes: [
      {
        id: "old-private-node",
        name: "旧范围私密名称",
        properties: { summary: "旧范围私密摘要" },
      },
    ],
    total: 1,
    hasMore: false,
  });
  await settle();
  assert.ok(
    !document.querySelector("#list").textContent.includes("旧范围私密"),
    "a previous-scope search must not render while the new-scope overview is still pending",
  );
  assert.equal(
    document.querySelector('[data-node-id="old-private-node"]'),
    null,
  );
  releaseNewOverview({
    nodes: 3,
    relationships: 2,
    chunks: 0,
    images: 0,
    labels: ["设备", "接口"],
  });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-2",
  );
  assert.deepEqual(
    positionOf(document.querySelector(".knowledge-node")),
    [-28, 62],
  );
  assert.deepEqual(cameraOf(document), [425, 275, 1.4]);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname === "/api/knowledge/canvas" &&
        JSON.parse(call.body).conversationId === "conversation-b",
    ),
  );
  document.querySelector("#graph-clear").click();
  await switchScope(dom, document, "");
  assert.equal(
    document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
  assert.deepEqual(cameraOf(document), [300, 210, 1.1]);
  await switchScope(dom, document, "conversation-b");
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
});

test("context actions add one chosen neighbor, hide locally and allow explicit restoration of hidden nodes", async (t) => {
  const { dom, document, calls, dumpStorage } = await page();
  t.after(() => dom.window.close());
  dom.window.innerWidth = 390;
  const related = openNodeMenu(dom, document, "node-1").querySelector(
    '[data-action="related"]',
  );
  related.dispatchEvent(
    Object.assign(new dom.window.Event("pointerenter"), {
      pointerType: "mouse",
    }),
  );
  await settle();
  assert.equal(
    document.querySelector(".graph-context-submenu"),
    null,
    "narrow-screen hover must not cover the related button before its click",
  );
  dom.window.innerWidth = 1200;
  related.dispatchEvent(
    Object.assign(new dom.window.Event("pointerenter"), {
      pointerType: "touch",
    }),
  );
  await settle();
  assert.equal(
    document.querySelector(".graph-context-submenu"),
    null,
    "touch pointers must use the explicit submenu action even on a wide viewport",
  );
  assert.ok(
    !calls.some((call) => call.parsed.pathname.endsWith("/nodes/node-1/graph")),
  );
  dom.window.innerWidth = 390;
  related.click();
  await settle();
  assert.ok(document.querySelector(".graph-context-submenu"));
  document
    .querySelector('.graph-context-neighbor[data-node-id="node-2"]')
    .click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  assert.ok(document.querySelector('[data-node-id="node-2"]'));
  assert.equal(document.querySelector('[data-node-id="node-4"]'), null);
  document
    .querySelector('[data-node-id="node-2"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  openNodeMenu(dom, document, "node-2")
    .querySelector('[data-action="hide"]')
    .click();
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  assert.equal(document.querySelector(".knowledge-node.selected"), null);
  assert.ok(!calls.some((call) => call.method === "DELETE"));
  document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(new dom.window.MouseEvent("dblclick", { bubbles: true }));
  await settle();
  assert.equal(
    document.querySelector('[data-node-id="node-2"]'),
    null,
    "automatic neighbor expansion must respect local hidden nodes",
  );
  await settle(300);
  const storage = dumpStorage();
  assert.ok(JSON.parse(storage[canvasKey()]).hiddenIds.includes("node-2"));
  dom.window.close();
  const restored = await page(undefined, { seedStorage: storage });
  t.after(() => restored.dom.window.close());
  assert.equal(
    restored.document.querySelector('[data-node-id="node-2"]'),
    null,
  );
  openNodeMenu(restored.dom, restored.document, "node-1")
    .querySelector('[data-action="related"]')
    .click();
  await settle();
  restored.document
    .querySelector('.graph-context-neighbor[data-node-id="node-2"]')
    .click();
  await settle();
  assert.ok(restored.document.querySelector('[data-node-id="node-2"]'));
  openNodeMenu(restored.dom, restored.document, "node-2")
    .querySelector('[data-action="hide"]')
    .click();
  openTopSearch(restored.document);
  await settle();
  restored.document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  assert.ok(
    restored.document.querySelector('[data-node-id="node-2"]'),
    "a deliberate search result selection can restore a locally hidden node",
  );
});

test("closed context menus ignore late global search responses and dismiss on outside click or Escape", async (t) => {
  const releases = [];
  const { dom, document } = await page(async (url) => {
    if (
      url.pathname === "/api/knowledge/search" &&
      url.searchParams.get("primaryLabel") === "true"
    )
      return await new Promise((resolve) => {
        releases.push(resolve);
      });
  });
  t.after(() => dom.window.close());
  openNodeMenu(dom, document, "node-1")
    .querySelector('[data-action="related"]')
    .click();
  await settle();
  assert.equal(releases.length, 1);
  document.querySelector("#graph-caption").click();
  assert.equal(visibleContextMenu(document), null);
  releases[0]({ nodes, total: 3, hasMore: false });
  await settle();
  assert.equal(visibleContextMenu(document), null);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  openNodeMenu(dom, document, "node-1")
    .querySelector('[data-action="related"]')
    .click();
  await settle();
  assert.equal(releases.length, 2);
  document.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  );
  assert.equal(visibleContextMenu(document), null);
  releases[1]({ nodes, total: 3, hasMore: false });
  await settle();
  assert.equal(visibleContextMenu(document), null);
});

test("typed neighbor menus use complete counts and atomically append every page of only the chosen type", async (t) => {
  const target = [
      nodes[1],
      ...Array.from({ length: 100 }, (_, index) => ({
        id: `typed-${index + 2}`,
        name: `类型项 ${index + 2}`,
        label: "接口",
        properties: {},
      })),
    ],
    edges = target.map((node, index) => ({
      id: `typed-edge-${index}`,
      source: "node-1",
      target: node.id,
      type: "连接",
    })),
    otherEdge = {
      id: "other-edge",
      source: "node-1",
      target: "node-3",
      type: "发生",
    };
  let releaseSecond;
  const { dom, document, calls } = await page(
    (url) => {
      if (url.pathname.endsWith("/related-types"))
        return {
          centerId: "node-1",
          types: [
            { label: "接口", count: 101 },
            { label: "事件", count: 1 },
          ],
        };
      if (url.pathname === "/api/knowledge/search")
        return { nodes: [nodes[1], nodes[2]], total: 2, hasMore: false };
      if (/\/nodes\/node-[23]\/graph$/.test(url.pathname))
        return {
          nodes,
          relationships: [edges[0], otherEdge],
          centerId: url.pathname.includes("node-2") ? "node-2" : "node-3",
        };
      if (url.pathname === "/api/knowledge/nodes/node-1/related") {
        const offset = Number(url.searchParams.get("offset")),
          payload = {
            centerId: "node-1",
            label: "接口",
            offset,
            limit: 100,
            total_nodes: 101,
            nodes: [nodes[0], ...target.slice(offset, offset + 100)],
            relationships: edges.slice(offset, offset + 100),
            hasMore: offset === 0,
          };
        if (offset === 100 && !releaseSecond)
          return new Promise((resolve) => {
            releaseSecond = () => resolve(payload);
          });
        return payload;
      }
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  openTopSearch(document);
  await settle();
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  openNodeMenu(dom, document, "node-2")
    .querySelector('[data-action="hide"]')
    .click();
  document.querySelector("#search").click();
  document.querySelector('#list [data-id="node-3"]').click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  dom.window.innerWidth = 390;
  const trigger = openTypeAction(dom, document, "node-1", "related-types");
  trigger.dispatchEvent(
    Object.assign(new dom.window.Event("pointerenter"), {
      pointerType: "mouse",
    }),
  );
  await settle();
  assert.equal(
    document.querySelector('.graph-context-submenu[data-kind="related-types"]'),
    null,
  );
  dom.window.innerWidth = 1200;
  trigger.dispatchEvent(
    Object.assign(new dom.window.Event("pointerenter"), {
      pointerType: "touch",
    }),
  );
  await settle();
  assert.equal(
    document.querySelector('.graph-context-submenu[data-kind="related-types"]'),
    null,
  );
  dom.window.innerWidth = 390;
  trigger.click();
  await settle();
  assert.match(
    typedButton(document, "add-related-type", "接口").textContent,
    /101/,
    "the count must come from the type service rather than a truncated neighborhood",
  );
  typedButton(document, "add-related-type", "接口").click();
  await settle();
  assert.equal(typeof releaseSecond, "function");
  assert.equal(
    document.querySelectorAll(".knowledge-node").length,
    2,
    "the first page must not partially appear before the final page succeeds",
  );
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
  releaseSecond();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 103);
  assert.ok(document.querySelector('[data-node-id="node-1"]'));
  assert.ok(document.querySelector('[data-node-id="node-3"]'));
  assert.ok(document.querySelector('[data-edge-id="other-edge"]'));
  assert.ok(
    document.querySelector('[data-node-id="node-2"]'),
    "explicitly adding the type restores its hidden nodes",
  );
  assert.equal(document.querySelector('[data-node-id="node-4"]'), null);
  const requests = calls.filter(
    (call) => call.parsed.pathname === "/api/knowledge/nodes/node-1/related",
  );
  assert.deepEqual(
    requests.map((call) => call.parsed.searchParams.get("offset")),
    ["0", "100"],
  );
  assert.ok(
    requests.every(
      (call) =>
        call.parsed.searchParams.get("limit") === "100" &&
        call.parsed.searchParams.get("label") === "接口",
    ),
  );
  openTypeAction(dom, document, "node-1", "related-types").click();
  await settle();
  typedButton(document, "add-related-type", "接口").click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 103);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 102);
});

test("without a selection, hiding a global primary type removes its visible nodes and persists across reload", async (t) => {
  const fixtureNodes = [
      nodes[0],
      nodes[1],
      { ...nodes[2], labels: ["接口", "事件"] },
    ],
    fixtureEdges = [
      { id: "type-12", source: "node-1", target: "node-2", type: "连接" },
      { id: "type-23", source: "node-2", target: "node-3", type: "连接" },
      { id: "type-13", source: "node-1", target: "node-3", type: "发生" },
    ],
    responder = (url) => {
      if (
        url.pathname === "/api/knowledge/graph" ||
        /\/nodes\/[^/]+\/graph$/.test(url.pathname)
      )
        return {
          nodes: fixtureNodes,
          relationships: fixtureEdges,
          offset: 0,
          hasMore: false,
        };
    };
  const first = await page(responder, { controlledAnimation: true });
  t.after(() => first.dom.window.close());
  first.document
    .querySelector('[data-node-id="node-2"]')
    .dispatchEvent(new first.dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  openTypeAction(first.dom, first.document, null, "hide-types", {
    global: true,
  }).click();
  await settle();
  assert.match(
    typedButton(first.document, "hide-type", "接口").textContent,
    /1/,
  );
  typedButton(first.document, "hide-type", "接口").click();
  assert.equal(first.document.querySelectorAll(".knowledge-node").length, 2);
  assert.equal(first.document.querySelector('[data-node-id="node-2"]'), null);
  assert.ok(
    first.document.querySelector('[data-node-id="node-3"]'),
    "a secondary label must not override the node's primary type",
  );
  assert.equal(first.document.querySelectorAll(".knowledge-edge").length, 1);
  assert.ok(first.document.querySelector('[data-edge-id="type-13"]'));
  assert.equal(first.document.querySelector(".knowledge-node.selected"), null);
  assert.ok(!first.calls.some((call) => call.method === "DELETE"));
  await settle(300);
  const storage = first.dumpStorage();
  assert.ok(JSON.parse(storage[canvasKey()]).hiddenIds.includes("node-2"));
  const restored = await page(responder, {
    controlledAnimation: true,
    seedStorage: storage,
  });
  t.after(() => restored.dom.window.close());
  assert.equal(
    restored.document.querySelector('[data-node-id="node-2"]'),
    null,
  );
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 2);
  openTypeAction(restored.dom, restored.document, null, "hide-types", {
    global: true,
  }).click();
  await settle();
  typedButton(restored.document, "hide-type", "事件").click();
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    restored.document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
  assert.equal(restored.document.querySelectorAll(".knowledge-edge").length, 0);
});

test("a permission failure on a later typed page leaves the existing canvas completely unchanged", async (t) => {
  const target = Array.from({ length: 101 }, (_, index) => ({
    id: `acl-type-${index}`,
    name: `类型项${index}`,
    label: "接口",
  }));
  const { dom, document } = await page(
    (url) => {
      if (url.pathname.endsWith("/related-types"))
        return { centerId: "node-1", types: [{ label: "接口", count: 101 }] };
      if (url.pathname.endsWith("/node-1/related")) {
        if (url.searchParams.get("offset") === "100")
          return new Response(
            JSON.stringify({ success: false, message: "没有查询权限" }),
            { status: 403, headers: { "Content-Type": "application/json" } },
          );
        return {
          centerId: "node-1",
          label: "接口",
          nodes: [nodes[0], ...target.slice(0, 100)],
          relationships: [],
          total_nodes: 101,
          hasMore: true,
          offset: 0,
          limit: 100,
        };
      }
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  const before = positionsOf(document);
  openTypeAction(dom, document, "node-1", "related-types").click();
  await settle();
  typedButton(document, "add-related-type", "接口").click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  assert.deepEqual(positionsOf(document), before);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  assert.match(document.querySelector("#notice").textContent, /权限/);
});

test("clear, scope changes and hiding the center each invalidate a late typed batch", async (t) => {
  for (const interruption of ["clear", "scope", "hide"]) {
    let release;
    const { dom, document } = await page(async (url) => {
      if (url.pathname.endsWith("/related-types"))
        return { centerId: "node-1", types: [{ label: "接口", count: 2 }] };
      if (url.pathname.endsWith("/node-1/related"))
        return await new Promise((resolve) => {
          release = resolve;
        });
    });
    t.after(() => dom.window.close());
    openTypeAction(dom, document, "node-1", "related-types").click();
    await settle();
    typedButton(document, "add-related-type", "接口").click();
    await settle();
    assert.equal(typeof release, "function");
    if (interruption === "clear")
      document.querySelector("#graph-clear").click();
    else if (interruption === "scope")
      await switchScope(dom, document, "typed-new-scope");
    else
      openNodeMenu(dom, document, "node-1")
        .querySelector('[data-action="hide"]')
        .click();
    release({
      centerId: "node-1",
      label: "接口",
      nodes: [
        nodes[0],
        { id: "late-type-a", label: "接口" },
        { id: "late-type-b", label: "接口" },
      ],
      relationships: [],
      total_nodes: 2,
      hasMore: false,
      offset: 0,
      limit: 100,
    });
    await settle();
    assert.equal(
      document.querySelector('[data-node-id="late-type-a"]'),
      null,
      `${interruption} must invalidate the pending bulk action`,
    );
    assert.equal(document.querySelector('[data-node-id="late-type-b"]'), null);
  }
});

test("typed additions respect remaining capacity atomically and exclude the center from the candidate count", async (t) => {
  const initial = [
      nodes[0],
      ...Array.from({ length: 398 }, (_, index) => ({
        id: `present-${index}`,
        name: `现有${index}`,
        label: "事件",
      })),
    ],
    candidates = [
      { id: "capacity-a", name: "新接口A", label: "接口" },
      { id: "capacity-b", name: "新接口B", label: "接口" },
    ];
  let requestedCount = 2;
  const { dom, document } = await page(
    (url) => {
      if (url.pathname === "/api/knowledge/graph")
        return { nodes: initial, relationships: [], offset: 0, hasMore: false };
      if (url.pathname.endsWith("/related-types"))
        return {
          centerId: "node-1",
          types: [{ label: "接口", count: requestedCount }],
        };
      if (url.pathname.endsWith("/node-1/related"))
        return {
          centerId: "node-1",
          label: "接口",
          nodes: [nodes[0], ...candidates.slice(0, requestedCount)],
          relationships: [],
          total_nodes: requestedCount,
          hasMore: false,
          offset: 0,
          limit: 100,
        };
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  openTypeAction(dom, document, "node-1", "related-types").click();
  await settle();
  typedButton(document, "add-related-type", "接口").click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 399);
  assert.equal(document.querySelector('[data-node-id="capacity-a"]'), null);
  assert.equal(document.querySelector('[data-node-id="capacity-b"]'), null);
  assert.match(document.querySelector("#notice").textContent, /还可容纳 1/);
  requestedCount = 1;
  openTypeAction(dom, document, "node-1", "related-types").click();
  await settle();
  typedButton(document, "add-related-type", "接口").click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 400);
  assert.ok(document.querySelector('[data-node-id="capacity-a"]'));
  assert.equal(document.querySelector('[data-node-id="capacity-b"]'), null);
});

test("blank-canvas search uses global types and server filters and appends one node after initial hydration", async (t) => {
  const paper = { id: "unloaded-paper", name: "未上屏论文", label: "论文" };
  let releaseSeed;
  const { dom, document, calls } = await page(
    (url) => {
      if (url.pathname === "/api/knowledge/graph")
        return new Promise((resolve) => {
          releaseSeed = resolve;
        });
      if (url.pathname === "/api/knowledge/node-types")
        return {
          types: [
            { label: "论文", count: 999 },
            { label: "设备", count: 1 },
          ],
        };
      if (
        url.pathname === "/api/knowledge/search" &&
        url.searchParams.get("primaryLabel") === "true"
      )
        return {
          nodes: [paper],
          total: 1,
          hasMore: false,
          offset: 0,
          limit: 30,
        };
      if (url.pathname === "/api/knowledge/nodes/unloaded-paper/graph")
        return {
          centerId: paper.id,
          nodes: [paper, ...nodes.slice(0, 2)],
          relationships: [
            {
              id: "paper-link",
              source: "node-1",
              target: paper.id,
              type: "引用",
            },
          ],
        };
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  openTypeAction(dom, document, null, "search-nodes").click();
  await settle();
  const type = document.querySelector(".graph-context-node-type"),
    input = document.querySelector(".graph-context-filter");
  assert.ok(
    [...type.options].some(
      (option) => option.value === "论文" && option.textContent.includes("999"),
    ),
    "type choices must include the authorized database, not just visible graph types",
  );
  type.value = "论文";
  type.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  input.value = "未上屏论文";
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  const filtered = calls.find(
    (call) =>
      call.parsed.pathname === "/api/knowledge/search" &&
      call.parsed.searchParams.get("q") === "未上屏论文",
  );
  assert.ok(filtered);
  assert.equal(filtered.parsed.searchParams.get("label"), "论文");
  assert.equal(filtered.parsed.searchParams.get("primaryLabel"), "true");
  assert.equal(filtered.parsed.searchParams.get("limit"), "30");
  document
    .querySelector(`.graph-context-neighbor[data-node-id="${paper.id}"]`)
    .click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  releaseSeed({
    nodes: [nodes[0]],
    relationships: [],
    offset: 0,
    hasMore: true,
  });
  await settle(140);
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  assert.ok(document.querySelector('[data-node-id="node-1"]'));
  assert.ok(document.querySelector(`[data-node-id="${paper.id}"]`));
  assert.equal(document.querySelector('[data-node-id="node-2"]'), null);
  assert.ok(document.querySelector('[data-edge-id="paper-link"]'));
});

test("connection targets prioritize all canvas nodes by Euclidean distance, deduplicate pages and keep remote order", async (t) => {
  const fixture = [
    { id: "root", name: "当前节点", label: "实体" },
    { id: "far", name: "远节点", label: "实体" },
    { id: "axis", name: "轴向节点", label: "实体" },
    { id: "diagonal", name: "斜向节点", label: "实体" },
    { id: "near", name: "近节点", label: "实体" },
    { id: "chunk", name: "原文", label: "Chunk" },
  ];
  const remote = Array.from({ length: 28 }, (_, index) => ({
    id: `remote-${index}`, name: `全库节点${index}`, label: "实体",
  }));
  const results = [fixture[0], fixture[1], ...remote, fixture[3]];
  let resolveSearch;
  const snapshot = {
    version: 1, initialized: true,
    nodes: [
      { id: "root", x: 0, y: 0 },
      { id: "far", x: -500, y: 0 },
      { id: "axis", x: 150, y: 0 },
      { id: "diagonal", x: 90, y: 90 },
      { id: "near", x: 0, y: 10 },
      { id: "chunk", x: 0, y: 1 },
    ], edgeIds: [], camera: { x: 300, y: 200, scale: 1.6 }, hiddenIds: [],
  };
  const ui = await page((url) => {
    if (url.pathname === "/api/knowledge/canvas") return { nodes: fixture, relationships: [] };
    if (url.pathname === "/api/knowledge/nodes/root/connection") return {
      found: true, centerId: "root", targetId: "near", hops: 1,
      nodes: [fixture[0], fixture[4]],
      relationships: [{ id: "near-link", source: "root", target: "near", type: "关联" }],
    };
    if (url.pathname === "/api/knowledge/search" && url.searchParams.get("primaryLabel") === "true") {
      const offset = Number(url.searchParams.get("offset"));
      const data = { nodes: results.slice(offset, offset + 30), total: results.length, hasMore: offset + 30 < results.length };
      return offset ? data : new Promise((resolve) => { resolveSearch = () => resolve(data); });
    }
  }, { controlledAnimation: true, seedStorage: { [canvasKey()]: JSON.stringify(snapshot) } });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  const ids = () => [...document.querySelectorAll(".graph-context-neighbor")].map((node) => node.dataset.nodeId);
  openNodeMenu(dom, document, "root").querySelector('[data-action="related"]').click();
  assert.deepEqual(ids(), ["near", "diagonal", "axis", "far"], "canvas targets must be ready before backend search finishes");
  await settle();
  assert.equal(typeof resolveSearch, "function");
  resolveSearch();
  await settle();
  assert.deepEqual(ids(), ["near", "diagonal", "axis", "far", ...remote.map((node) => node.id)]);
  assert.equal(document.querySelector('.graph-context-neighbor[data-node-id="chunk"]'), null, "source chunks remain manual source actions");
  assert.equal(document.querySelectorAll('.graph-context-neighbor[data-on-canvas="true"]').length, 4);
  assert.match(document.querySelector('.graph-context-neighbor[data-node-id="near"]').textContent, /画布上/);
  const before = ids();
  ui.runFrames(90);
  assert.deepEqual(ids(), before, "physics frames must not shuffle the open target list");
  document.querySelector('[data-action="search-more"]').click();
  await settle();
  assert.deepEqual(ids(), before, "a canvas node found on a later page appears only once");
  assert.ok(calls.some((call) => call.parsed.searchParams.get("offset") === "30"), "server pagination counts excluded roots and duplicate canvas nodes");
  document.querySelector('.graph-context-neighbor[data-node-id="near"]').click();
  await settle();
  assert.ok(calls.some((call) => call.parsed.pathname === "/api/knowledge/nodes/root/connection" && call.parsed.searchParams.get("targetId") === "near"));
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="near-link"].selected'));
});

test("canvas-first connection targets respect filters and tokenized server matches without changing search-add", async (t) => {
  const remote = { id: "remote", name: "全库", label: "接口" };
  const ui = await page((url) => {
    if (url.pathname === "/api/knowledge/search" && url.searchParams.get("primaryLabel") === "true") {
      const query = url.searchParams.get("q"), label = url.searchParams.get("label");
      const matches = query === "分词结果" ? [remote, nodes[2]] : label === "接口" ? [remote, nodes[1]] : [remote];
      return { nodes: matches, total: matches.length, hasMore: false };
    }
  }, { fullGraph: true, controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  const ids = () => [...document.querySelectorAll(".graph-context-neighbor")].map((node) => node.dataset.nodeId);
  openNodeMenu(dom, document, "node-1").querySelector('[data-action="related"]').click();
  await settle();
  const type = document.querySelector(".graph-context-node-type");
  type.value = "接口";
  type.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  await settle();
  assert.deepEqual(ids(), ["node-2", "remote"]);
  const filter = document.querySelector(".graph-context-filter");
  type.value = "";
  filter.value = "分词结果";
  filter.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.deepEqual(ids(), ["node-3", "remote"], "server matches need not contain the literal query to receive canvas priority");
  assert.ok(calls.some((call) => call.parsed.searchParams.get("q") === "分词结果"));
  visibleContextMenu(document).querySelector('[data-action="search-nodes"]').click();
  await settle();
  assert.deepEqual(ids(), ["remote"], "search-and-add must retain server ordering without injecting canvas candidates");
});

test("two-node relationship creation has explicit directions and canvas-first suggestions and preserves the camera", async (t) => {
  const ui = await page((url, options) => {
    if (url.pathname === "/api/knowledge/relationship-types") return { types: [{ type: "连接", count: 100 }, { type: "热门关系", count: 80 }] };
    if (url.pathname === "/api/knowledge/relationships" && options.method === "POST") {
      const body = JSON.parse(options.body);
      return { nodes: [], relationships: [{ id: "manual-edge", source: body.fromNodeId, target: body.toNodeId, type: body.type, properties: {} }] };
    }
  }, { fullGraph: true, controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  ctrlSelect(dom, document, "node-1"); ctrlSelect(dom, document, "node-2");
  const camera = cameraOf(document);
  openNodeMenu(dom, document, "node-1"); await settle();
  document.querySelector('[data-action="relationship-directions"]').click();
  const directions = [...document.querySelectorAll('[data-action="create-directed-relationship"]')];
  assert.deepEqual(directions.map((button) => [button.dataset.fromNodeId, button.dataset.toNodeId]), [["node-1", "node-2"], ["node-2", "node-1"]]);
  directions[1].click(); await settle();
  assert.match(document.querySelector("#dialog-description").textContent, /接口 B → 设备 A/);
  const groups = [...document.querySelectorAll('.graph-edit-suggestion-group')];
  assert.match(groups[0].textContent, /画布已有/); assert.match(groups[1].textContent, /知识库热门/);
  assert.equal([...document.querySelectorAll('.graph-edit-chips button')].filter((button) => button.textContent.startsWith("连接 ·")).length, 1);
  [...document.querySelectorAll('.graph-edit-chips button')].find((button) => button.textContent.startsWith("热门关系 ·")).click();
  document.querySelector("#create-form").dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await settle();
  const request = calls.find((call) => call.parsed.pathname === "/api/knowledge/relationships" && call.method === "POST");
  assert.deepEqual(JSON.parse(request.body), { fromNodeId: "node-2", toNodeId: "node-1", type: "热门关系" });
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="manual-edge"]'));
  assert.deepEqual(cameraOf(document), camera); assert.equal(document.querySelector('#create-dialog').open, false);
});

test("blank-node creation retains failed drafts and places the saved node at the captured world point", async (t) => {
  let failWrite = true;
  const ui = await page((url, options) => {
    if (url.pathname === "/api/knowledge/nodes" && options.method === "POST") {
      if (failWrite) return new Response(JSON.stringify({ success: false, message: "类型名称无效" }), { status: 400 });
      const body = JSON.parse(options.body);
      return { nodes: [{ id: "new-node", name: body.name, label: body.label, properties: body.properties }], relationships: [] };
    }
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  const camera = cameraOf(document), x = 600, y = 350;
  document.querySelector('#knowledge-canvas').dispatchEvent(new dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  document.querySelector('[data-action="node-create"]').click(); await settle();
  document.querySelector('[name="name"]').value = '.NET：知识'; document.querySelector('[name="label"]').value = 'Bad.Type';
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.equal(document.querySelector('#create-dialog').open, true);
  assert.equal(document.querySelector('[name="name"]').value, '.NET：知识'); assert.match(document.querySelector('#form-error').textContent, /类型名称无效/);
  assert.equal(document.querySelectorAll('.knowledge-node').length, 1);
  failWrite = false; document.querySelector('[name="label"]').value = '新类型';
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  const position = positionOf(document.querySelector('.knowledge-node[data-node-id="new-node"]'));
  assert.ok(Math.abs(position[0] - (x - camera[0]) / camera[2]) < 0.02);
  assert.ok(Math.abs(position[1] - (y - camera[1]) / camera[2]) < 0.02);
  assert.deepEqual(cameraOf(document), camera); assert.equal(document.querySelector('#create-dialog').open, false);
  assert.equal(calls.filter((call) => call.parsed.pathname === '/api/knowledge/nodes' && call.method === 'POST').length, 2);
});

test("node name is always editable and modal scrolling never reaches the graph", async (t) => {
  const node = { ...nodes[0], properties: { custom: 1 } };
  const ui = await page((url, options) => {
    if (url.pathname.endsWith('/node-1/edit-data')) return { node: { ...node, canWrite: true, canManagePolicy: false } };
    if (url.pathname.endsWith('/nodes/node-1') && options.method === 'PUT') {
      const body = JSON.parse(options.body); return { ...node, name: body.properties.name, properties: body.properties };
    }
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui;
  const originalElement = document.querySelector('.knowledge-node'), originalPosition = positionOf(originalElement), camera = cameraOf(document);
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="node-edit"]').click(); await settle();
  assert.equal(document.querySelector('[name="name"]').value, node.name);
  assert.equal(document.documentElement.classList.contains('cwm-modal-open'), true);
  const wheel = new dom.window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 150 });
  document.querySelector('#knowledge-canvas').dispatchEvent(wheel);
  assert.equal(wheel.defaultPrevented, true); assert.deepEqual(cameraOf(document), camera);
  const innerWheel = new dom.window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 100 });
  document.querySelector('.form-fields').dispatchEvent(innerWheel); assert.equal(innerWheel.defaultPrevented, false);
  document.querySelector('[name="name"]').value = '.NET：重命名';
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.equal(document.querySelector('.knowledge-node'), originalElement); assert.deepEqual(positionOf(originalElement), originalPosition);
  assert.equal(originalElement.querySelector('title').textContent, '.NET：重命名');
  assert.equal(document.documentElement.classList.contains('cwm-modal-open'), false);
});

test('ordered node editing keeps axis metadata and sort inputs out of editable payloads', async (t) => {
  const ordered = { ...nodes[0], labels: ['Knowledge', 'Time', 'OrderedNode'], label: 'Time', properties: {
    name: '发生时间', value: '2026-10', precision: 'month', description: '旧说明', ordered_axis: 'axis-id', ordered_kind: 'time', ordered_key: '1790812800000000',
    ordered_rank: 1790812800000000, ordered_field: 'value', ordered_value: '2026-10', ordered_missing: false,
  } };
  let saved;
  const ui = await page((url, options) => {
    if (url.pathname === '/api/knowledge/graph') return { nodes: [ordered], relationships: [] };
    if (url.pathname.endsWith('/node-1/edit-data')) return { node: { ...ordered, canWrite: true, canManage: true, canManagePolicy: true } };
    if (url.pathname.endsWith('/nodes/node-1') && options.method === 'PUT') { saved = JSON.parse(options.body); return { ...ordered, properties: { ...ordered.properties, ...saved.properties } }; }
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document } = ui;
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="node-edit"]').click(); await settle();
  const editor = document.querySelector('[name="properties"]')._jsonEditor;
  assert.deepEqual(JSON.parse(JSON.stringify(editor.getValue())), { description: '旧说明' });
  assert.match(document.querySelector('#create-fields').textContent, /排序信息（只读）/);
  assert.match(document.querySelector('#create-fields').textContent, /2026-10/);
  assert.equal(document.querySelector('[name="policyId"]'), null);
  editor.setDraft(JSON.stringify({ description: '新说明' }));
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.deepEqual(saved, { properties: { description: '新说明', name: '发生时间' } });
  assert.equal(document.querySelector('#create-dialog').open, false);
});

test("individual relationship menus rename and delete the exact ID while retaining parallel edges", async (t) => {
  let edge = { id: 'r-1', source: 'node-1', target: 'node-2', type: '连接', properties: { note: '原属性' } };
  const ui = await page((url, options) => {
    if (url.pathname === '/api/knowledge/relationships/r-1/actions') return { relationship: edge, canWrite: true, canRename: true, canDelete: true };
    if (url.pathname === '/api/knowledge/relationship-types') return { types: [] };
    if (url.pathname === '/api/knowledge/relationships/r-1' && options.method === 'PUT') {
      edge = { ...edge, type: JSON.parse(options.body).type, elementId: 'new-element' }; return { nodes: [], relationships: [edge] };
    }
    if (url.pathname === '/api/knowledge/relationships/r-1' && options.method === 'DELETE') return { deletedRelationshipIds: ['r-1'] };
  }, { fullGraph: true, controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  const hit = () => document.querySelector('.knowledge-edge-hit[data-relationship-id="r-1"]');
  hit().dispatchEvent(new dom.window.MouseEvent('click', { button: 0, bubbles: true }));
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="r-1"].hit-selected'));
  hit().dispatchEvent(new dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true })); await settle();
  document.querySelector('[data-action="relationship-rename"]').click(); await settle();
  document.querySelector('[name="type"]').value = '新关系';
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.match(document.querySelector('.knowledge-edge[data-edge-id="r-1"] title').textContent, /新关系/);
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="r-2"]'));
  hit().dispatchEvent(new dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true })); await settle();
  document.querySelector('[data-action="relationship-delete"]').click(); await settle();
  assert.equal(document.querySelector('#create-dialog').open, true);
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="r-1"]'), 'delete needs an explicit save');
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.equal(document.querySelector('.knowledge-edge[data-edge-id="r-1"]'), null);
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="r-2"]'));
  const request = calls.find((call) => call.method === 'DELETE');
  assert.equal(request.parsed.pathname, '/api/knowledge/relationships/r-1'); assert.equal(JSON.parse(request.body).expectedType, '新关系');
});

test("relationship keyboard focus follows its visible line without selecting or opening a menu", async (t) => {
  const { dom, document } = await page(() => undefined, { fullGraph: true, controlledAnimation: true });
  t.after(() => dom.window.close());
  const hit = document.querySelector('.knowledge-edge-hit[data-relationship-id="r-1"]');
  const line = document.querySelector('.knowledge-edge[data-edge-id="r-1"]');
  hit.dispatchEvent(new dom.window.FocusEvent('focus'));
  assert.equal(line.classList.contains('keyboard-focused'), true);
  assert.equal(line.classList.contains('hit-selected'), false);
  assert.equal(document.querySelector('.graph-context-menu'), null);
  hit.dispatchEvent(new dom.window.FocusEvent('blur'));
  assert.equal(line.classList.contains('keyboard-focused'), false);
  const css = await readFile(path.join(root, 'static/management.css'), 'utf8');
  assert.match(css, /\.knowledge-edge-hit\s*\{[^}]*outline:\s*none/s);
  assert.match(css, /\.knowledge-canvas \.knowledge-edge\.keyboard-focused\s*\{[^}]*stroke:/s);
});

test("manual source and parent chunks are explicit creations and collapsed source lines require choosing a concrete relationship", async (t) => {
  const chunk = { id: 'manual-chunk', name: '手动来源', label: 'Chunk', labels: ['Chunk'], properties: { summary: '摘要' } };
  const parent = { id: 'manual-parent', name: '父片段', label: 'Chunk', labels: ['Chunk'], properties: {} };
  const ui = await page((url, options) => {
    if (url.pathname.endsWith('/chunks') && options.method === 'POST') {
      if (url.pathname.includes('/node-1/')) return { nodes: [chunk], relationships: [
        { id: 'source-out', source: 'node-1', target: chunk.id, type: 'EXTRACTED_FROM' },
        { id: 'source-in', source: chunk.id, target: 'node-1', type: 'CONTAINS_KNOWLEDGE' },
      ] };
      return { nodes: [parent], relationships: [{ id: 'manual-parent-edge', source: chunk.id, target: parent.id, type: 'CHILD_OF' }] };
    }
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  const { dom, document, calls } = ui;
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="chunk-create-source"]').click();
  const originalText = '  原文\n内容  \n';
  document.querySelector('[name="name"]').value = '手动来源'; document.querySelector('[name="content"]').value = originalText;
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.ok(document.querySelector('.knowledge-node[data-node-id="manual-chunk"]'));
  assert.equal(JSON.parse(calls.find((call) => call.parsed.pathname.endsWith('/node-1/chunks')).body).content, originalText);
  assert.equal(document.querySelectorAll('.knowledge-edge.source-link').length, 1);
  document.querySelector('.knowledge-edge-hit[data-relationship-id="source-out"]').dispatchEvent(new dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
  assert.equal(document.querySelectorAll('[data-action="choose-relationship"]').length, 2);
  openNodeMenu(dom, document, 'manual-chunk'); await settle();
  assert.ok(document.querySelector('[data-action="chunk-create-child"]'));
  document.querySelector('[data-action="chunk-create-parent"]').click();
  document.querySelector('[name="name"]').value = '父片段'; document.querySelector('[name="content"]').value = '父原文';
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit', { cancelable: true })); await settle();
  assert.ok(document.querySelector('.knowledge-edge[data-edge-id="manual-parent-edge"]'));
  assert.equal(JSON.parse(calls.find((call) => call.parsed.pathname.includes('/manual-chunk/chunks')).body).kind, 'parent');
});

test('new editing forms reset reused scroll containers, failed reference saves retain the chosen source and draft', async t => {
  const ui = await page((url, options) => {
    if (url.pathname === '/api/attachments') return {items:[{id:'attachment-1',name:'来源.md',type:'text',uri:'cwm://artifact/blob'}],total:1,hasMore:false};
    if (url.pathname === '/api/knowledge/source-preview') return {source:{sourceUri:'cwm://artifact/blob',contentHash:'hash'},blocks:[{id:'block-1',text:'这是原文片段。'}],total:1,hasMore:false};
    if (url.pathname.endsWith('/chunks') && options.method === 'POST') return new Response(JSON.stringify({success:false,msg:'写入失败'}),{status:400});
  },{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());
  const {dom,document,calls}=ui;
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  const dialog=document.querySelector('#create-dialog'), fields=document.querySelector('#create-fields');
  dialog.scrollTop=200;fields.scrollTop=300;document.querySelector('#create-form').scrollTop=180;
  dialog.close();openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  assert.equal(dialog.scrollTop,0);assert.equal(fields.scrollTop,0);assert.equal(document.querySelector('#create-form').scrollTop,0);
  const kind=document.querySelector('[aria-label="片段来源"]');kind.value='attachment';kind.dispatchEvent(new dom.window.Event('change'));await settle();
  document.querySelector('.resource-browser-pick').click();
  document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  document.querySelector('.resource-source-range input[value="partial"]').click();
  document.querySelector('.resource-source-block input').click();
  assert.equal(document.querySelector('[name="name"]').value,'来源.md');
  fields.scrollTop=90;
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  assert.equal(dialog.open,true);assert.equal(fields.scrollTop,90);assert.match(document.querySelector('#form-error').textContent,/写入失败/);
  const saved=JSON.parse(calls.find(call=>call.parsed.pathname.endsWith('/chunks')&&call.method==='POST').body);
  assert.deepEqual(saved.reference,{sourceKind:'attachment',id:'attachment-1',version:'hash',blockIds:['block-1']});assert.equal(saved.content,'');
});

test('document references default to an explicit whole-document range after confirming a source', async t => {
  const ui = await page((url, options) => {
    if (url.pathname === '/api/attachments/documents') return {items:[{id:'doc-1',name:'完整文档',type:'document'}],total:1,hasMore:false};
    if (url.pathname === '/api/knowledge/source-preview') return {source:{commit:'a'.repeat(40)},blocks:[{id:'first',text:'第一段。'}],total:8,hasMore:true};
    if (url.pathname.endsWith('/chunks') && options.method === 'POST') return new Response(JSON.stringify({success:false,msg:'保持表单'}),{status:400});
  },{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const {dom,document,calls}=ui;
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  const source=document.querySelector('[aria-label="片段来源"]');source.value='document';source.dispatchEvent(new dom.window.Event('change'));await settle();
  document.querySelector('.resource-browser-pick').click();
  assert.equal(calls.filter(call=>call.parsed.pathname==='/api/knowledge/source-preview').length,0,'Choosing a row only stages the selection');
  document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  assert.equal(document.querySelector('.resource-source-range input[value="whole"]').checked,true);
  assert.match(document.querySelector('.resource-source-range').textContent,/整个文档/);
  assert.equal(document.querySelector('.resource-source-preview').hidden,true,'Content blocks remain hidden for a whole document reference');
  assert.equal(document.querySelector('.resource-source-card strong').textContent,'完整文档');
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  const request=JSON.parse(calls.find(call=>call.parsed.pathname.endsWith('/chunks')&&call.method==='POST').body);
  assert.deepEqual(request.reference,{sourceKind:'document',id:'doc-1',version:'a'.repeat(40),blockIds:[]});
});

test('partial resource references require a selection, page against the pinned version and can return to the whole source', async t => {
  const ui=await page((url,options)=>{
    if(url.pathname==='/api/attachments')return{items:[{id:'file-1',name:'报告.md',type:'text'}],total:1,hasMore:false};
    if(url.pathname==='/api/knowledge/source-preview'){
      const body=JSON.parse(options.body);return{source:{contentHash:'pinned-hash'},blocks:[{id:body.offset?'last':'first',text:body.offset?'后续段落':'初始段落'}],total:2,hasMore:!body.offset};
    }
    if(url.pathname.endsWith('/chunks')&&options.method==='POST')return new Response(JSON.stringify({success:false,msg:'保持表单'}),{status:400});
  },{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const{dom,document,calls}=ui;
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  const source=document.querySelector('[aria-label="片段来源"]');source.value='attachment';source.dispatchEvent(new dom.window.Event('change'));await settle();
  document.querySelector('.resource-browser-pick').click();document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  document.querySelector('.resource-source-range input[value="partial"]').click();
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  assert.match(document.querySelector('#form-error').textContent,/至少选择一个片段/);
  assert.equal(calls.filter(call=>call.parsed.pathname.endsWith('/chunks')&&call.method==='POST').length,0);
  document.querySelector('.resource-source-block input').click();document.querySelector('.resource-source-more').click();await settle();
  assert.equal(document.querySelectorAll('.resource-source-block').length,2);
  assert.equal(document.querySelector('.resource-source-block input').checked,true,'Pagination retains the staged content selection');
  const previews=calls.filter(call=>call.parsed.pathname==='/api/knowledge/source-preview');
  assert.deepEqual(JSON.parse(previews[1].body),{sourceKind:'attachment',id:'file-1',version:'pinned-hash',offset:1,limit:20});
  document.querySelectorAll('.resource-source-block input')[1].click();
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  assert.deepEqual(JSON.parse(calls.filter(call=>call.parsed.pathname.endsWith('/chunks')&&call.method==='POST').at(-1).body).reference.blockIds,['first','last']);
  document.querySelector('.resource-source-range input[value="whole"]').click();
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  assert.deepEqual(JSON.parse(calls.filter(call=>call.parsed.pathname.endsWith('/chunks')&&call.method==='POST').at(-1).body).reference.blockIds,[]);
  assert.equal(document.querySelector('.resource-source-preview').hidden,true);
});

test('replacing or removing a resource source aborts pending parsing and ignores its late response', async t => {
  let release;
  const ui=await page((url,options)=>{
    if(url.pathname==='/api/attachments')return{items:[{id:'old',name:'旧来源.md',type:'text'},{id:'new',name:'新来源.md',type:'text'}],total:2,hasMore:false};
    if(url.pathname==='/api/knowledge/source-preview'){
      if(JSON.parse(options.body).id==='old')return new Promise(resolve=>{release=resolve;});
      return{source:{contentHash:'new-hash'},blocks:[{id:'new-block',text:'新的正文'}],total:1,hasMore:false};
    }
  },{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const{dom,document,calls}=ui;
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  const source=document.querySelector('[aria-label="片段来源"]');source.value='attachment';source.dispatchEvent(new dom.window.Event('change'));await settle();
  document.querySelector('.resource-browser-pick').click();document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  const pending=calls.find(call=>call.parsed.pathname==='/api/knowledge/source-preview');
  [...document.querySelectorAll('.resource-source-card-actions button')].find(button=>button.textContent==='更换').click();await settle();
  assert.equal(pending.signal.aborted,true);
  document.querySelectorAll('.resource-browser-pick')[1].click();document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  release({source:{contentHash:'old-hash'},blocks:[{id:'old-block',text:'过期正文'}],total:1,hasMore:false});await settle();
  assert.equal(document.querySelector('.resource-source-card strong').textContent,'新来源.md');
  assert.equal(document.querySelector('[name="name"]').value,'新来源.md');
  assert.doesNotMatch(document.querySelector('.resource-source-control').textContent,/过期正文/);
  [...document.querySelectorAll('.resource-source-card-actions button')].find(button=>button.textContent==='移除').click();await settle();
  assert.equal(document.querySelector('.resource-source-card').hidden,true);
  document.querySelector('#create-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
  assert.match(document.querySelector('#form-error').textContent,/请选择来源/);
});

test('media references keep the entire attachment option and closing the editor aborts an unfinished source read', async t => {
  let hold=false,release;
  const ui=await page((url,options)=>{
    if(url.pathname==='/api/attachments')return{items:[{id:'image',name:'图片.png',type:'image',uri:'cwm://artifact/image'}],total:1,hasMore:false};
    if(url.pathname==='/api/knowledge/source-preview'){
      if(hold)return new Promise(resolve=>{release=resolve;});
      return{source:{contentHash:'image-hash'},blocks:[],total:0,hasMore:false};
    }
  },{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const{dom,document,calls}=ui;
  const openSource=async()=>{
    openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
    const source=document.querySelector('[aria-label="片段来源"]');source.value='attachment';source.dispatchEvent(new dom.window.Event('change'));await settle();
    document.querySelector('.resource-browser-pick').click();document.querySelector('[data-action="confirm-resource-selection"]').click();await settle();
  };
  await openSource();assert.equal(document.querySelector('.resource-source-range input[value="partial"]').disabled,true);
  assert.match(document.querySelector('.resource-source-range').textContent,/整个附件/);
  document.querySelector('#create-dialog [data-close]').click();hold=true;await openSource();
  const pending=calls.filter(call=>call.parsed.pathname==='/api/knowledge/source-preview').at(-1);
  document.querySelector('#create-dialog [data-close]').click();assert.equal(pending.signal.aborted,true);
  release({source:{contentHash:'late'},blocks:[],total:0,hasMore:false});await settle();
  assert.equal(document.querySelector('#create-dialog').open,false);
});

test('chat graph import authorizes identities, merges existing nodes, focuses only the sent nodes and consumes each request once', async t => {
  const ui=await page(undefined,{controlledAnimation:true});t.after(()=>ui.dom.window.close());
  const {dom,document,calls}=ui, messages=[], host={postMessage:message=>messages.push(message)};
  Object.defineProperty(dom.window,'parent',{value:host});
  const data={type:'cwm.knowledge-import',id:'import-1',nodeIds:['node-2','node-3','denied'],edgeIds:['r-1']};
  const send=()=>dom.window.dispatchEvent(new dom.window.MessageEvent('message',{origin:'http://localhost',source:host,data}));
  send();await settle(130);
  assert.equal(document.querySelectorAll('.knowledge-node').length,3,'Existing node remains on the canvas');
  assert.deepEqual([...document.querySelectorAll('.knowledge-node.selected')].map(n=>n.dataset.nodeId).sort(),['node-2','node-3']);
  assert.match(document.querySelector('#notice').textContent,/已跳过/);
  assert.ok(messages.some(message=>message.type==='cwm.knowledge-imported'));
  const count=calls.filter(call=>call.parsed.pathname==='/api/knowledge/canvas/import').length;
  send();await settle();assert.equal(calls.filter(call=>call.parsed.pathname==='/api/knowledge/canvas/import').length,count);
});

test('switching chunk source modes retains the manual text and summary draft', async t => {
  const ui=await page(url=>url.pathname==='/api/attachments'?{items:[],total:0,hasMore:false}:undefined,{controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const {dom,document}=ui;
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();
  document.querySelector('[name="content"]').value='原文草稿\n保留空白  ';
  document.querySelector('[name="summary"]').value='摘要草稿';
  let mode=document.querySelector('[aria-label="片段来源"]');mode.value='attachment';mode.dispatchEvent(new dom.window.Event('change'));await settle();
  mode=document.querySelector('[aria-label="片段来源"]');mode.value='manual';mode.dispatchEvent(new dom.window.Event('change'));
  assert.equal(document.querySelector('[name="content"]').value,'原文草稿\n保留空白  ');
  assert.equal(document.querySelector('[name="summary"]').value,'摘要草稿');await settle();
});

test("submenu server search debounces, pages, aborts old queries and never lets late errors replace a new submenu", async (t) => {
  const global = Array.from({ length: 31 }, (_, index) => ({
    id: `global-${index}`,
    name: `全库${index}`,
    label: "接口",
  }));
  let releasePending;
  const { dom, document, calls } = await page((url) => {
    if (url.pathname === "/api/knowledge/node-types")
      return { types: [{ label: "接口", count: 31 }] };
    if (url.pathname.endsWith("/node-1/related-types"))
      return { centerId: "node-1", types: [{ label: "接口", count: 1 }] };
    if (
      url.pathname === "/api/knowledge/search" &&
      url.searchParams.get("primaryLabel") === "true"
    ) {
      const query = url.searchParams.get("q"),
        offset = Number(url.searchParams.get("offset"));
      if (query === "pending" && !releasePending)
        return new Promise((resolve) => {
          releasePending = resolve;
        });
      const list = query ? global.slice(0, 1) : global;
      return {
        nodes: list.slice(offset, offset + 30),
        total: list.length,
        hasMore: offset + 30 < list.length,
        offset,
        limit: 30,
      };
    }
  });
  t.after(() => dom.window.close());
  openTypeAction(dom, document, "node-1", "related").click();
  await settle();
  assert.equal(document.querySelectorAll(".graph-context-neighbor").length, 30);
  document.querySelector('[data-action="search-more"]').click();
  await settle();
  assert.equal(document.querySelectorAll(".graph-context-neighbor").length, 31);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname === "/api/knowledge/search" &&
        call.parsed.searchParams.get("offset") === "30",
    ),
  );
  const input = document.querySelector(".graph-context-filter");
  input.focus();
  const left = new dom.window.KeyboardEvent("keydown", {
    key: "ArrowLeft",
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(left);
  assert.equal(
    left.defaultPrevented,
    false,
    "the menu must not replace the text input's native cursor movement",
  );
  assert.ok(
    document.querySelector('.graph-context-submenu[data-kind="related"]'),
  );
  const tab = new dom.window.KeyboardEvent("keydown", {
    key: "Tab",
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(tab);
  assert.equal(tab.defaultPrevented, false);
  const type = document.querySelector(".graph-context-node-type");
  type.focus();
  assert.ok(
    visibleContextMenu(document),
    "tabbing to another submenu control must keep it open",
  );
  for (const key of ["ArrowDown", "ArrowUp"]) {
    const nativeKey = new dom.window.KeyboardEvent("keydown", {
      key,
      bubbles: true,
      cancelable: true,
    });
    type.dispatchEvent(nativeKey);
    assert.equal(
      nativeKey.defaultPrevented,
      false,
      `${key} must remain a native SELECT action`,
    );
  }
  input.value = "discarded";
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  input.value = "latest";
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.ok(
    !calls.some((call) => call.parsed.searchParams.get("q") === "discarded"),
  );
  assert.ok(
    calls.some((call) => call.parsed.searchParams.get("q") === "latest"),
  );
  assert.equal(document.querySelectorAll(".graph-context-neighbor").length, 1);
  input.value = "pending";
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await settle(300);
  const oldRequest = calls.find(
    (call) => call.parsed.searchParams.get("q") === "pending",
  );
  assert.equal(typeof releasePending, "function");
  visibleContextMenu(document)
    .querySelector('[data-action="related-types"]')
    .click();
  await settle();
  assert.equal(oldRequest.signal.aborted, true);
  assert.ok(typedButton(document, "add-related-type", "接口"));
  assert.equal(
    visibleContextMenu(document).querySelectorAll('[aria-expanded="true"]')
      .length,
    1,
  );
  releasePending(
    new Response(
      JSON.stringify({ success: false, message: "旧查询私密错误" }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    ),
  );
  await settle();
  assert.ok(typedButton(document, "add-related-type", "接口"));
  assert.ok(
    !document
      .querySelector(".graph-context-submenu")
      .textContent.includes("旧查询私密错误"),
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
  visibleContextMenu(document)
    .querySelector('[data-action="search-nodes"]')
    .click();
  await settle();
  document.querySelector("#search").focus();
  await settle();
  assert.equal(
    visibleContextMenu(document),
    null,
    "moving keyboard focus outside the menus should close them",
  );
});

test("connection lookup retains existing nodes, merges and highlights the authorized path and handles bounded or failed searches atomically", async (t) => {
  const choices = ["remote", "unlinked", "denied", "late"].map((id) => ({
      id,
      name: id,
      label: "远端实体",
    })),
    middle = [
      { id: "middle-a", name: "中间A", label: "事件" },
      { id: "middle-b", name: "中间B", label: "接口" },
    ],
    pathEdges = [
      { id: "path-a", source: "node-1", target: "middle-a", type: "路径" },
      { id: "path-b", source: "middle-a", target: "middle-b", type: "路径" },
      { id: "path-c", source: "middle-b", target: "remote", type: "路径" },
    ];
  let releaseLate;
  const { dom, document, calls } = await page(
    (url) => {
      if (url.pathname === "/api/knowledge/node-types")
        return { types: [{ label: "远端实体", count: 4 }] };
      if (
        url.pathname === "/api/knowledge/search" &&
        url.searchParams.get("primaryLabel") === "true"
      )
        return { nodes: choices, total: 4, hasMore: false };
      if (url.pathname.endsWith("/node-1/connection")) {
        const targetId = url.searchParams.get("targetId");
        if (targetId === "unlinked")
          return {
            found: false,
            centerId: "node-1",
            targetId,
            nodes: [],
            relationships: [],
            hops: null,
            maxHops: 6,
          };
        if (targetId === "denied")
          return new Response(
            JSON.stringify({ success: false, message: "没有查询权限" }),
            { status: 403, headers: { "Content-Type": "application/json" } },
          );
        if (targetId === "late")
          return new Promise((resolve) => {
            releaseLate = resolve;
          });
        return {
          found: true,
          centerId: "node-1",
          targetId,
          nodes: [nodes[0], ...middle, choices[0]],
          relationships: pathEdges,
          hops: 3,
          maxHops: 6,
        };
      }
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  openTopSearch(document);
  await settle();
  document.querySelector('#list [data-id="node-2"]').click();
  await settle();
  const original = positionsOf(document);
  openTypeAction(dom, document, "node-1", "related").click();
  await settle();
  document
    .querySelector('.graph-context-neighbor[data-node-id="remote"]')
    .click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 5);
  assert.deepEqual(positionsOf(document).slice(0, 2), original);
  assert.ok(
    calls.some(
      (call) =>
        call.parsed.pathname.endsWith("/node-1/connection") &&
        call.parsed.searchParams.get("targetId") === "remote" &&
        call.parsed.searchParams.get("maxHops") === "6",
    ),
  );
  for (const id of ["node-1", "middle-a", "middle-b", "remote"])
    assert.equal(
      document
        .querySelector(`[data-node-id="${id}"]`)
        .classList.contains("dimmed"),
      false,
    );
  for (const edge of pathEdges)
    assert.equal(
      document
        .querySelector(`[data-edge-id="${edge.id}"]`)
        .classList.contains("dimmed"),
      false,
    );
  assert.equal(
    document
      .querySelector('[data-node-id="node-2"]')
      .classList.contains("dimmed"),
    true,
  );
  document
    .querySelector('[data-node-id="node-2"]')
    .dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  assert.equal(
    document
      .querySelector('[data-node-id="middle-b"]')
      .classList.contains("dimmed"),
    true,
    "selecting another node should clear the path highlight",
  );
  for (const id of ["unlinked", "denied"]) {
    openTypeAction(dom, document, "node-1", "related").click();
    await settle();
    document
      .querySelector(`.graph-context-neighbor[data-node-id="${id}"]`)
      .click();
    await settle();
    assert.equal(document.querySelectorAll(".knowledge-node").length, 5);
    assert.equal(document.querySelector(`[data-node-id="${id}"]`), null);
    assert.match(
      document.querySelector("#notice").textContent,
      id === "unlinked" ? /6/ : /权限/,
    );
  }
  openTypeAction(dom, document, "node-1", "related").click();
  await settle();
  document
    .querySelector('.graph-context-neighbor[data-node-id="late"]')
    .click();
  await settle();
  document.querySelector("#graph-clear").click();
  releaseLate({
    found: true,
    centerId: "node-1",
    targetId: "late",
    nodes: [nodes[0], choices[3]],
    relationships: [
      { id: "late-path", source: "node-1", target: "late", type: "路径" },
    ],
    hops: 1,
    maxHops: 6,
  });
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
});

test("all type actions fetch unfiltered neighbors and hiding all preserves their local hidden state across reload", async (t) => {
  const initial = [nodes[0], { id: "node-4", name: "已在画布", label: "接口" }];
  const { dom, document, calls, dumpStorage } = await page(
    (url) => {
      if (url.pathname === "/api/knowledge/graph")
        return { nodes: initial, relationships: [], offset: 0, hasMore: false };
      if (url.pathname.endsWith("/related-types"))
        return {
          centerId: "node-1",
          types: [
            { label: "接口", count: 1 },
            { label: "事件", count: 1 },
          ],
        };
      if (url.pathname.endsWith("/node-1/related"))
        return {
          centerId: "node-1",
          label: null,
          nodes,
          relationships: relationships.slice(0, 2),
          total_nodes: 2,
          hasMore: false,
          offset: 0,
          limit: 100,
        };
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  openTypeAction(dom, document, "node-1", "related-types").click();
  await settle();
  const all = document.querySelector(
    '.graph-context-type[data-action="add-related-type"][data-all="true"]',
  );
  assert.ok(all);
  assert.equal(document.querySelector(".graph-context-type"), all);
  assert.equal(all.dataset.label, "");
  all.click();
  await settle();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 4);
  assert.ok(document.querySelector('[data-node-id="node-4"]'));
  const request = calls.find((call) =>
    call.parsed.pathname.endsWith("/node-1/related"),
  );
  assert.equal(request.parsed.searchParams.has("label"), false);
  openTypeAction(dom, document, null, "hide-types", { global: true }).click();
  await settle();
  const hideAll = document.querySelector(
    '.graph-context-type[data-action="hide-type"][data-all="true"]',
  );
  assert.equal(document.querySelector(".graph-context-type"), hideAll);
  hideAll.click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 0);
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
  await settle(300);
  const storage = dumpStorage();
  assert.equal(JSON.parse(storage[canvasKey()]).initialized, true);
  assert.deepEqual(JSON.parse(storage[canvasKey()]).nodes, []);
  assert.deepEqual(JSON.parse(storage[canvasKey()]).hiddenIds.slice().sort(), [
    "node-1",
    "node-2",
    "node-3",
    "node-4",
  ]);
  const restored = await page(undefined, { seedStorage: storage });
  t.after(() => restored.dom.window.close());
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 0);
  assert.ok(
    !restored.calls.some(
      (call) => call.parsed.pathname === "/api/knowledge/graph",
    ),
  );
  openTopSearch(restored.document);
  await settle();
  restored.document.querySelector('#list [data-id="node-1"]').click();
  await settle();
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 1);
  assert.equal(
    restored.document.querySelector(".knowledge-node").dataset.nodeId,
    "node-1",
  );
  restored.document
    .querySelector('[data-node-id="node-1"]')
    .dispatchEvent(
      new restored.dom.window.MouseEvent("dblclick", { bubbles: true }),
    );
  await settle();
  assert.equal(
    restored.document.querySelectorAll(".knowledge-node").length,
    1,
    "restoring one hidden node must not bring the other hidden nodes back through automatic expansion",
  );
});

const branchFixture = () => ({
  nodes: [
    { id: "branch-root", name: "根节点", label: "根" },
    { id: "branch-cut", name: "目标入口", label: "目标" },
    { id: "branch-exclusive-a", name: "独占延伸A", label: "事件" },
    { id: "branch-exclusive-b", name: "独占延伸B", label: "接口" },
    { id: "branch-other", name: "其他入口", label: "保留" },
    { id: "branch-deep-target", name: "另一分支内的同类型", label: "目标" },
    { id: "branch-shared", name: "共享节点", label: "共享" },
    { id: "branch-shared-cycle", name: "共享环节点", label: "事件" },
    { id: "branch-outside-target", name: "独立组件同类型", label: "目标" },
    { id: "branch-outside-child", name: "独立组件延伸", label: "事件" },
  ],
  relationships: [
    ["root-cut", "branch-root", "branch-cut"],
    ["cut-exclusive", "branch-cut", "branch-exclusive-a"],
    ["exclusive-cycle-a", "branch-exclusive-a", "branch-exclusive-b"],
    ["exclusive-cycle-b", "branch-exclusive-b", "branch-cut"],
    ["root-other", "branch-root", "branch-other"],
    ["other-target", "branch-other", "branch-deep-target"],
    ["cut-shared", "branch-cut", "branch-shared"],
    ["other-shared", "branch-other", "branch-shared"],
    ["shared-cycle-a", "branch-shared", "branch-shared-cycle"],
    ["shared-cycle-b", "branch-shared-cycle", "branch-other"],
    ["outside-pair", "branch-outside-target", "branch-outside-child"],
  ].map(([id, source, target]) => ({ id, source, target, type: "连接" })),
});

const branchResponder = (fixture) => (url, options = {}) => {
  if (url.pathname === "/api/knowledge/canvas") {
    const body = JSON.parse(options.body);
    return { nodes: fixture.nodes.filter((node) => body.nodeIds.includes(node.id)), relationships: fixture.relationships.filter((edge) => body.edgeIds.includes(edge.id)) };
  }
  if (
    url.pathname === "/api/knowledge/graph" ||
    /\/nodes\/[^/]+\/graph$/.test(url.pathname)
  )
    return { ...fixture, offset: 0, hasMore: false };
  if (url.pathname === "/api/knowledge/search")
    return {
      nodes: fixture.nodes,
      total: fixture.nodes.length,
      hasMore: false,
    };
};

test("a selected root makes blank-menu type hiding cut only its branch and exclusive mixed descendants", async (t) => {
  const fixture = branchFixture(),
    responder = branchResponder(fixture),
    first = await page(responder, { controlledAnimation: true });
  t.after(() => first.dom.window.close());
  first.document
    .querySelector('[data-node-id="branch-root"]')
    .dispatchEvent(new first.dom.window.MouseEvent("click", { bubbles: true }));
  await settle();
  openTypeAction(first.dom, first.document, null, "hide-types").click();
  await settle();
  const target = typedButton(first.document, "hide-type", "目标");
  assert.equal(
    target.dataset.count,
    "1",
    "counts should describe direct typed neighbors, not other branches or components",
  );
  assert.equal(target.dataset.hideCount, "3");
  assert.equal(typedButton(first.document, "hide-type", "接口"), null);
  target.click();
  const hidden = ["branch-cut", "branch-exclusive-a", "branch-exclusive-b"],
    retained = [
      "branch-root",
      "branch-other",
      "branch-deep-target",
      "branch-shared",
      "branch-shared-cycle",
      "branch-outside-target",
      "branch-outside-child",
    ];
  hidden.forEach((id) =>
    assert.equal(first.document.querySelector(`[data-node-id="${id}"]`), null),
  );
  retained.forEach((id) =>
    assert.ok(first.document.querySelector(`[data-node-id="${id}"]`)),
  );
  assert.equal(first.document.querySelectorAll(".knowledge-node").length, 7);
  assert.equal(first.document.querySelectorAll(".knowledge-edge").length, 6);
  assert.equal(
    first.document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "branch-root",
  );
  await settle(300);
  const storage = first.dumpStorage();
  assert.deepEqual(
    JSON.parse(storage[canvasKey()]).hiddenIds.slice().sort(),
    hidden.slice().sort(),
  );
  const restored = await page(responder, {
    controlledAnimation: true,
    seedStorage: storage,
  });
  t.after(() => restored.dom.window.close());
  hidden.forEach((id) =>
    assert.equal(
      restored.document.querySelector(`[data-node-id="${id}"]`),
      null,
    ),
  );
  retained.forEach((id) =>
    assert.ok(restored.document.querySelector(`[data-node-id="${id}"]`)),
  );
  openTopSearch(restored.document);
  await settle();
  restored.document.querySelector('#list [data-id="branch-cut"]').click();
  await settle();
  assert.ok(restored.document.querySelector('[data-node-id="branch-cut"]'));
  restored.document
    .querySelector('[data-node-id="branch-cut"]')
    .dispatchEvent(
      new restored.dom.window.MouseEvent("dblclick", { bubbles: true }),
    );
  await settle();
  assert.equal(restored.document.querySelectorAll(".knowledge-node").length, 8);
  assert.equal(
    restored.document.querySelector('[data-node-id="branch-exclusive-a"]'),
    null,
  );
  assert.equal(
    restored.document.querySelector('[data-node-id="branch-exclusive-b"]'),
    null,
  );
});

test("a root menu's all action retains the root and independent components while unselected blank menus remain global", async (t) => {
  const fixture = branchFixture(),
    { dom, document } = await page(branchResponder(fixture), {
      controlledAnimation: true,
    });
  t.after(() => dom.window.close());
  openTypeAction(dom, document, "branch-root", "hide-types").click();
  await settle();
  const all = document.querySelector(
    '.graph-context-type[data-action="hide-type"][data-all="true"]',
  );
  assert.equal(all.dataset.hideCount, "7");
  all.click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 3);
  assert.ok(document.querySelector('[data-node-id="branch-root"]'));
  assert.ok(document.querySelector('[data-node-id="branch-outside-target"]'));
  assert.ok(document.querySelector('[data-node-id="branch-outside-child"]'));
  assert.equal(document.querySelectorAll(".knowledge-edge").length, 1);
  assert.equal(
    document.querySelector(".knowledge-node.selected").dataset.nodeId,
    "branch-root",
  );
  openTypeAction(dom, document, null, "hide-types", { global: true }).click();
  await settle();
  const target = typedButton(document, "hide-type", "目标");
  assert.equal(target.dataset.count, "1");
  target.click();
  assert.equal(document.querySelectorAll(".knowledge-node").length, 2);
  assert.ok(document.querySelector('[data-node-id="branch-root"]'));
  assert.ok(
    document.querySelector('[data-node-id="branch-outside-child"]'),
    "global type hiding must not cut descendants of a removed type",
  );
  assert.equal(
    document.querySelector('[data-node-id="branch-outside-target"]'),
    null,
  );
  assert.equal(document.querySelector(".knowledge-node.selected"), null);
});

test("branch hiding cancels a late typed addition even though the root remains visible", async (t) => {
  const fixture = branchFixture(),
    fallback = branchResponder(fixture);
  let release;
  const { dom, document } = await page(
    (url) => {
      if (url.pathname.endsWith("/branch-root/related-types"))
        return {
          centerId: "branch-root",
          types: [{ label: "新类型", count: 1 }],
        };
      if (url.pathname.endsWith("/branch-root/related"))
        return new Promise((resolve) => {
          release = resolve;
        });
      return fallback(url);
    },
    { controlledAnimation: true },
  );
  t.after(() => dom.window.close());
  openTypeAction(dom, document, "branch-root", "related-types").click();
  await settle();
  typedButton(document, "add-related-type", "新类型").click();
  await settle();
  assert.equal(typeof release, "function");
  openTypeAction(dom, document, "branch-root", "hide-types").click();
  await settle();
  typedButton(document, "hide-type", "目标").click();
  assert.ok(document.querySelector('[data-node-id="branch-root"]'));
  release({
    centerId: "branch-root",
    label: "新类型",
    nodes: [fixture.nodes[0], { id: "late-branch-node", label: "新类型" }],
    relationships: [
      {
        id: "late-branch-edge",
        source: "branch-root",
        target: "late-branch-node",
        type: "连接",
      },
    ],
    total_nodes: 1,
    hasMore: false,
    offset: 0,
    limit: 100,
  });
  await settle();
  assert.equal(
    document.querySelector('[data-node-id="late-branch-node"]'),
    null,
  );
  assert.equal(document.querySelectorAll(".knowledge-node").length, 7);
});


test("touch long-press opens node actions and survives the native context event and release click without expanding",async(t)=>{
  const {dom,document,calls}=await page(undefined,{controlledAnimation:true});t.after(()=>dom.window.close());
  const node=document.querySelector('[data-node-id="node-1"]');
  pointer(dom,node,'pointerdown',400,270,{pointerType:'touch'});
  await settle(540);
  const menu=document.querySelector('.graph-context-menu');assert.ok(menu);assert.equal(menu.dataset.nodeId,'node-1');
  node.dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  assert.equal(document.querySelector('.graph-context-menu'),menu);
  pointer(dom,dom.window,'pointerup',400,270,{pointerType:'touch'});
  const mouseDown=new dom.window.MouseEvent('mousedown',{bubbles:true,cancelable:true});node.dispatchEvent(mouseDown);
  assert.equal(mouseDown.defaultPrevented,true);
  node.dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));
  node.dispatchEvent(new dom.window.MouseEvent('dblclick',{bubbles:true,cancelable:true,detail:2}));
  assert.equal(document.querySelector('.graph-context-menu'),menu);
  assert.equal(calls.some(c=>/\/nodes\/node-1\/graph/.test(c.url)),false);
  assert.equal(document.querySelectorAll('.knowledge-node').length,1);
  // A deliberate new touch is available immediately after the held gesture.
  pointer(dom,node,'pointerdown',400,270,{pointerType:'touch'});
  pointer(dom,dom.window,'pointerup',400,270,{pointerType:'touch'});
  assert.equal(document.querySelector('.graph-context-menu'),null);
});

test("touch dragging and cancelled touches never trigger a delayed long-press menu",async(t)=>{
  const {dom,document}=await page(undefined,{controlledAnimation:true});t.after(()=>dom.window.close());
  const node=document.querySelector('[data-node-id="node-1"]');
  pointer(dom,node,'pointerdown',400,270,{pointerType:'touch'});
  pointer(dom,dom.window,'pointermove',440,280,{pointerType:'touch'});
  assert.equal(document.querySelector('#knowledge-canvas').classList.contains('dragging'),true);
  await settle(540);assert.equal(document.querySelector('.graph-context-menu'),null);
  pointer(dom,dom.window,'pointerup',440,280,{pointerType:'touch'});
  pointer(dom,node,'pointerdown',440,280,{pointerType:'touch'});
  pointer(dom,dom.window,'pointercancel',440,280,{pointerType:'touch'});
  await settle(540);assert.equal(document.querySelector('.graph-context-menu'),null);
});

test("a second touch cancels long-press while keeping pinch zoom available",async(t)=>{
  const {dom,document,runFrames}=await page(undefined,{controlledAnimation:true});t.after(()=>dom.window.close());
  const node=document.querySelector('[data-node-id="node-1"]'),svg=document.querySelector('#knowledge-canvas'),before=cameraOf(document)[2];
  pointer(dom,node,'pointerdown',400,270,{pointerType:'touch',pointerId:1});
  pointer(dom,svg,'pointerdown',500,270,{pointerType:'touch',pointerId:2});
  pointer(dom,dom.window,'pointermove',600,270,{pointerType:'touch',pointerId:2});
  runFrames(1);
  await settle(540);assert.equal(document.querySelector('.graph-context-menu'),null);
  pointer(dom,dom.window,'pointerup',400,270,{pointerType:'touch',pointerId:1});
  pointer(dom,dom.window,'pointerup',600,270,{pointerType:'touch',pointerId:2});
  assert.notEqual(cameraOf(document)[2],before);
});

test('search result changes keep the opened menu coordinates and input focus, viewport resizing clamps without dismissing', async t => {
  const ui=await page(url=>url.pathname==='/api/knowledge/search'&&url.searchParams.get('primaryLabel')==='true'
    ? {nodes:url.searchParams.get('q')==='empty'?[]:nodes,total:url.searchParams.get('q')==='empty'?0:3,hasMore:false}:undefined,
    {controlledAnimation:true});
  t.after(()=>ui.dom.window.close());const {dom,document}=ui;
  let submenuHeight=380;
  const original=dom.window.HTMLElement.prototype.getBoundingClientRect;
  dom.window.HTMLElement.prototype.getBoundingClientRect=function(){
    if(this.classList.contains('graph-context-menu')){const left=parseFloat(this.style.left)||0,top=parseFloat(this.style.top)||0;return{left,top,right:left+230,bottom:top+320,width:230,height:320};}
    if(this.classList.contains('graph-context-submenu'))return{left:parseFloat(this.style.left)||0,top:parseFloat(this.style.top)||0,width:340,height:submenuHeight};
    if(this.dataset.action==='related'){const parent=this.closest('.graph-context-menu'),rect=parent.getBoundingClientRect();return{...rect,top:rect.top+40,height:40};}
    return original.call(this);
  };
  document.querySelector('[data-node-id="node-1"]').dispatchEvent(new dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true,clientX:650,clientY:690}));
  await settle();document.querySelector('[data-action="related"]').click();await settle();
  const menu=document.querySelector('.graph-context-menu'),submenu=document.querySelector('.graph-context-submenu'),input=submenu.querySelector('input');
  const before=[menu.style.left,menu.style.top,submenu.style.left,submenu.style.top];
  input.focus();submenuHeight=180;input.value='empty';input.dispatchEvent(new dom.window.Event('input'));await settle(300);
  assert.deepEqual([menu.style.left,menu.style.top,submenu.style.left,submenu.style.top],before);
  assert.equal(document.activeElement,input);assert.equal(document.querySelector('.graph-context-submenu'),submenu);
  Object.defineProperty(dom.window,'innerHeight',{value:420,configurable:true});dom.window.dispatchEvent(new dom.window.Event('resize'));await settle();
  assert.equal(document.querySelector('.graph-context-submenu'),submenu);assert.equal(document.activeElement,input);
  assert.ok(parseFloat(submenu.style.top)+submenuHeight<=412);
});

test('node search menus remember their last type on reopening, including before type counts finish loading', async t => {
  let holdTypes = false, releaseTypes;
  const types = { types: [{ label: '接口', count: 12 }, { label: '设备', count: 4 }] };
  const ui = await page(url => {
    if (url.pathname === '/api/knowledge/node-types') return holdTypes ? new Promise(resolve => { releaseTypes = resolve; }) : types;
  }, { controlledAnimation: true, fullGraph: true });
  t.after(() => ui.dom.window.close()); const { dom, document, calls } = ui;
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="search-nodes"]').click(); await settle();
  const type = document.querySelector('.graph-context-node-type'); type.value = '接口'; type.dispatchEvent(new dom.window.Event('change')); await settle();
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  holdTypes = true; const before = calls.length;
  openNodeMenu(dom, document, 'node-2'); await settle(); document.querySelector('[data-action="search-nodes"]').click(); await settle();
  const restored = document.querySelector('.graph-context-node-type'); assert.equal(restored.value, '接口');
  const searches = calls.slice(before).filter(call => call.parsed.pathname === '/api/knowledge/search');
  assert.ok(searches.length); assert.equal(searches[0].parsed.searchParams.get('label'), '接口');
  releaseTypes(types); await settle(); assert.equal(restored.value, '接口');
  assert.match(restored.closest('.cwm-select-control').querySelector('[role="combobox"]').textContent, /接口（12）/);
  document.querySelector('[data-action="related"]').click(); await settle();
  assert.equal(document.querySelector('.graph-context-node-type').value, '', 'Each search menu keeps its own preference');
  document.querySelector('[data-action="search-nodes"]').click(); await settle();
  assert.equal(document.querySelector('.graph-context-node-type').value, '接口'); releaseTypes(types); await settle();
});

test('a removed remembered type falls back to all types and reruns the server search', async t => {
  let available = [{ label: '接口', count: 12 }];
  const ui = await page(url => url.pathname === '/api/knowledge/node-types' ? { types: available } : undefined, { controlledAnimation: true });
  t.after(() => ui.dom.window.close()); const { dom, document, calls } = ui;
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="search-nodes"]').click(); await settle();
  const type = document.querySelector('.graph-context-node-type'); type.value = '接口'; type.dispatchEvent(new dom.window.Event('change')); await settle();
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  available = [{ label: '设备', count: 4 }]; const before = calls.length;
  openNodeMenu(dom, document, 'node-1'); await settle(); document.querySelector('[data-action="search-nodes"]').click(); await settle();
  assert.equal(document.querySelector('.graph-context-node-type').value, '');
  const searches = calls.slice(before).filter(call => call.parsed.pathname === '/api/knowledge/search');
  assert.deepEqual(searches.map(call => call.parsed.searchParams.get('label')), ['接口', '']);
  assert.equal(searches[0].signal.aborted, true);
});

test('management selects use styled listboxes, update native values and release portals when the owner is removed', async t => {
  const ui=await page(undefined,{controlledAnimation:true});t.after(()=>ui.dom.window.close());
  const {dom,document}=ui;
  const native=document.querySelector('#filter'),control=native.closest('.cwm-select-control');assert.ok(control);
  control.querySelector('button').click();assert.ok(document.querySelector('[role="listbox"]'));
  document.querySelector('[role="option"][data-value="设备"]').click();
  assert.equal(native.value,'设备');assert.equal(document.querySelector('[role="listbox"]'),null);
  await settle();
  openNodeMenu(dom,document,'node-1');await settle();document.querySelector('[data-action="chunk-create-source"]').click();await settle();
  const source=document.querySelector('[aria-label="片段来源"]');assert.equal(source.tagName,'SELECT');
  const styled=source.closest('.cwm-select-control');assert.ok(styled);styled.querySelector('button').click();assert.ok(document.querySelector('[role="listbox"]'));
  document.querySelector('#create-dialog').close();document.querySelector('#create-fields').replaceChildren();await settle();
  assert.equal(document.querySelector('[role="listbox"]'),null);
});

const libraryRegistry = { databases: [
  { id: "db-one", name: "renamed-library", title: "工作知识", enabled: true, legacyDefault: true },
  { id: "db-two", name: "reference-library", title: "参考知识", enabled: true, readOnly: true },
  { id: "db-disabled", name: "disabled", title: "已停用库", enabled: false },
] };
async function switchDatabase(dom, document, databaseId) {
  const selector = document.querySelector("#knowledge-database");
  selector.value = databaseId;
  selector.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  await settle(160);
}

test("knowledge database selection resolves the registry first and scopes every graph request by stable ID", async t => {
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, databaseId: "default", conversationId: "conversation-one" });
  t.after(() => ui.dom.window.close());
  const selector = ui.document.querySelector("#knowledge-database");
  assert.equal(selector.value, "db-one");
  assert.match(selector.closest(".cwm-select-control").textContent, /工作知识/);
  assert.equal(selector.querySelector('[value="db-disabled"]').disabled, true);
  assert.equal(new URL(ui.dom.window.location.href).searchParams.get("databaseId"), "db-one");
  const registry = ui.calls.find(call => call.parsed.pathname === "/api/knowledge/databases");
  assert.equal(registry.parsed.searchParams.get("databaseId"), null);
  assert.equal(registry.parsed.searchParams.get("conversationId"), null);
  const graphCalls = ui.calls.filter(call => call.parsed.pathname.startsWith("/api/knowledge/") && call !== registry);
  assert.ok(graphCalls.length >= 3);
  assert.ok(graphCalls.every(call => call.parsed.searchParams.get("databaseId") === "db-one"));
  await switchDatabase(ui.dom, ui.document, "db-two");
  const last = ui.calls.filter(call => call.parsed.pathname === "/api/knowledge/search").at(-1);
  assert.equal(last.parsed.searchParams.get("databaseId"), "db-two");
  assert.equal(last.parsed.searchParams.get("conversationId"), "conversation-one");
});

test("knowledge database canvases persist independently and switching restores an intentionally empty library", async t => {
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, conversationId: "same-conversation" });
  t.after(() => ui.dom.window.close());
  ui.document.querySelector("#graph-clear").click();
  assert.equal(ui.document.querySelectorAll(".knowledge-node").length, 0);
  await switchDatabase(ui.dom, ui.document, "db-two");
  assert.equal(ui.document.querySelectorAll(".knowledge-node").length, 1);
  assert.ok(ui.dom.window.sessionStorage.getItem(canvasKey("same-conversation", "db-one")));
  assert.ok(ui.dom.window.sessionStorage.getItem(canvasKey("same-conversation", "db-two")));
  await switchDatabase(ui.dom, ui.document, "db-one");
  assert.equal(ui.document.querySelectorAll(".knowledge-node").length, 0);
  assert.equal(ui.document.querySelector("#graph-empty").hidden, false);
  assert.equal(JSON.parse(ui.dom.window.sessionStorage.getItem(canvasKey("same-conversation", "db-one"))).nodes.length, 0);
  assert.equal(JSON.parse(ui.dom.window.sessionStorage.getItem(canvasKey("same-conversation", "db-two"))).nodes.length, 1);
});

test("database switching aborts expansion and searches and ignores late results from the old library", async t => {
  let releaseSearch, releaseExpansion;
  const ui = await page(url => {
    if (url.pathname === "/api/knowledge/databases") return libraryRegistry;
    if (url.searchParams.get("databaseId") !== "db-one") return;
    if (url.pathname === "/api/knowledge/search" && url.searchParams.get("q") === "held") return new Promise(resolve => { releaseSearch = resolve; });
    if (url.pathname === "/api/knowledge/nodes/node-1/graph") return new Promise(resolve => { releaseExpansion = resolve; });
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  ui.document.querySelector('[data-node-id="node-1"]').dispatchEvent(new ui.dom.window.MouseEvent("dblclick", { bubbles: true }));
  ui.document.querySelector("#search").value = "held";
  ui.document.querySelector("#search").dispatchEvent(new ui.dom.window.Event("input", { bubbles: true }));
  await settle(300);
  assert.equal(typeof releaseSearch, "function"); assert.equal(typeof releaseExpansion, "function");
  const oldCalls = ui.calls.filter(call => call.parsed.searchParams.get("databaseId") === "db-one" && (call.parsed.searchParams.get("q") === "held" || call.parsed.pathname.endsWith("node-1/graph")));
  await switchDatabase(ui.dom, ui.document, "db-two");
  assert.ok(oldCalls.every(call => call.signal.aborted));
  releaseSearch({ nodes: [{ id: "old-search", name: "旧库搜索结果" }], total: 1 });
  releaseExpansion({ nodes: [{ id: "old-expansion", name: "旧库关联内容" }], relationships: [] });
  await settle();
  assert.doesNotMatch(ui.document.body.textContent, /旧库搜索结果|旧库关联内容/);
  assert.equal(ui.document.querySelector('[data-node-id="old-expansion"]'), null);
  assert.equal(ui.document.querySelector("#search").value, "");
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-two");
});

test("late overview results cannot replace the statistics or types of the newly selected database", async t => {
  let releaseOverview;
  const ui = await page(url => {
    if (url.pathname === "/api/knowledge/databases") return libraryRegistry;
    if (url.pathname === "/api/knowledge/overview" && url.searchParams.get("databaseId") === "db-one") return new Promise(resolve => { releaseOverview = resolve; });
    if (url.pathname === "/api/knowledge/overview" && url.searchParams.get("databaseId") === "db-two") return { nodes: 22, relationships: 2, chunks: 3, images: 4, labels: ["新库类型"] };
  }, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  assert.equal(typeof releaseOverview, "function");
  await switchDatabase(ui.dom, ui.document, "db-two");
  releaseOverview({ nodes: 999, relationships: 999, chunks: 999, images: 999, labels: ["旧库类型"] }); await settle();
  assert.match(ui.document.querySelector("#overview").textContent, /22/);
  assert.doesNotMatch(ui.document.querySelector("#overview").textContent, /999/);
  assert.match(ui.document.querySelector("#filter").textContent, /新库类型/);
  assert.doesNotMatch(ui.document.querySelector("#filter").textContent, /旧库类型/);
});

test("an unconfigured database registry provides settings guidance and refresh can activate a new connection", async t => {
  let configured = false;
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? configured ? libraryRegistry : { databases: [] } : undefined, { controlledAnimation: true });
  t.after(() => ui.dom.window.close());
  assert.equal(ui.document.querySelector("#search").disabled, true);
  assert.equal(ui.document.querySelector("#graph-empty").hidden, false);
  assert.match(ui.document.querySelector("#graph-empty").textContent, /设置 → 知识库连接/);
  assert.equal(ui.calls.filter(call => call.parsed.pathname !== "/api/knowledge/databases").length, 0);
  configured = true; ui.document.querySelector("#refresh").click(); await settle(180);
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-one");
  assert.equal(ui.document.querySelector("#search").disabled, false);
  assert.equal(ui.document.querySelectorAll(".knowledge-node").length, 1);
});

test("chat imports select their authorized database and send graph identities only to that library", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, iframeParent: trustedParent });
  t.after(() => ui.dom.window.close());
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "two-library-import", databaseId: "db-two", nodeIds: ["node-2"], edgeIds: [] } }));
  await settle(180);
  const imported = ui.calls.find(call => call.parsed.pathname === "/api/knowledge/canvas/import");
  assert.ok(imported); assert.equal(imported.parsed.searchParams.get("databaseId"), "db-two");
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-two");
  assert.ok(messages.some(message => message.type === "cwm.knowledge-imported" && message.databaseId === "db-two"));
  assert.ok(ui.dom.window.sessionStorage.getItem(canvasKey("", "db-two")));
});

test("chat imports restore the target database and conversation canvas before adding identities", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  const targetScope = canvasKey("conversation-new", "db-two");
  const targetSnapshot = { version: 1, initialized: true, nodes: [{ id: "node-2", x: 25, y: -38 }], edgeIds: [], camera: { x: 390, y: 220, scale: 1.6 }, selected: null, hiddenIds: [] };
  let beforeImport;
  const ui = await page((url) => {
    if (url.pathname === "/api/knowledge/databases") return libraryRegistry;
    if (url.pathname === "/api/knowledge/canvas/import") beforeImport = {
      ids: [...ui.document.querySelectorAll(".knowledge-node")].map(node => node.dataset.nodeId),
      position: positionOf(ui.document.querySelector('[data-node-id="node-2"]')),
      camera: cameraOf(ui.document),
    };
  }, { controlledAnimation: true, iframeParent: trustedParent, conversationId: "conversation-old", seedStorage: { [targetScope]: JSON.stringify(targetSnapshot) } });
  t.after(() => ui.dom.window.close());
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "conversation-library-import", databaseId: "db-two", conversationId: "conversation-new", nodeIds: ["node-3"], edgeIds: [] } }));
  await settle(220);
  assert.deepEqual(beforeImport, { ids: ["node-2"], position: [25, -38], camera: [390, 220, 1.6] });
  const imported = ui.calls.find(call => call.parsed.pathname === "/api/knowledge/canvas/import");
  assert.equal(imported.parsed.searchParams.get("databaseId"), "db-two");
  assert.equal(JSON.parse(imported.body).conversationId, "conversation-new");
  assert.deepEqual([...ui.document.querySelectorAll(".knowledge-node")].map(node => node.dataset.nodeId).sort(), ["node-2", "node-3"]);
  const savedOriginal = JSON.parse(ui.dumpStorage()[canvasKey("conversation-old", "db-one")]);
  assert.deepEqual(savedOriginal.nodes.map(node => node.id), ["node-1"]);
  assert.deepEqual(JSON.parse(ui.dumpStorage()[targetScope]).nodes.map(node => node.id).sort(), ["node-2", "node-3"]);
  assert.ok(messages.some(message => message.type === "cwm.knowledge-imported" && message.databaseId === "db-two"));
});

test("clearing a canvas invalidates an in-flight chat import without repopulating the empty view", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  let releaseImport;
  const ui = await page(url => {
    if (url.pathname === "/api/knowledge/databases") return libraryRegistry;
    if (url.pathname === "/api/knowledge/canvas/import") return new Promise(resolve => { releaseImport = resolve; });
  }, { controlledAnimation: true, iframeParent: trustedParent });
  t.after(() => ui.dom.window.close());
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "cleared-import", databaseId: "db-one", nodeIds: ["node-2"], edgeIds: [] } }));
  await settle();
  assert.equal(typeof releaseImport, "function");
  ui.document.querySelector("#graph-clear").click();
  releaseImport({ nodes: [nodes[1]], relationships: [] });
  await settle();
  assert.equal(ui.document.querySelectorAll(".knowledge-node").length, 0);
  assert.deepEqual(JSON.parse(ui.dumpStorage()[canvasKey("", "db-one")]).nodes, []);
  assert.ok(messages.some(message => message.type === "cwm.knowledge-import-failed" && message.id === "cleared-import"));
});

test("imports reject other frames and origins and normalize the default alias to the real database", async t => {
  const trustedParent = { postMessage() {} };
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, iframeParent: trustedParent, databaseId: "db-two" });
  t.after(() => ui.dom.window.close());
  const data = { type: "cwm.knowledge-import", id: "default-import", databaseId: "default", conversationId: "", nodeIds: ["node-2"], edgeIds: [] };
  for (const props of [{ source: {}, origin: "http://localhost" }, { source: trustedParent, origin: "http://elsewhere" }]) ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { ...props, data }));
  await settle();
  assert.equal(ui.calls.some(call => call.parsed.pathname === "/api/knowledge/canvas/import"), false);
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data }));
  await settle(180);
  const imported = ui.calls.find(call => call.parsed.pathname === "/api/knowledge/canvas/import");
  assert.equal(imported.parsed.searchParams.get("databaseId"), "db-one");
  assert.equal(new URL(ui.dom.window.location.href).searchParams.get("databaseId"), "db-one");
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-one");
});

test("a database switch during import restoration cannot issue the old payload against the new library", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  let releaseRestore;
  const targetScope = canvasKey("", "db-two");
  const snapshot = { version: 1, initialized: true, nodes: [{ id: "node-2", x: 18, y: 29 }], edgeIds: [], camera: { x: 410, y: 230, scale: 1.2 }, selected: null, hiddenIds: [] };
  const ui = await page(url => {
    if (url.pathname === "/api/knowledge/databases") return libraryRegistry;
    if (url.pathname === "/api/knowledge/canvas" && url.searchParams.get("databaseId") === "db-two") return new Promise(resolve => { releaseRestore = resolve; });
  }, { controlledAnimation: true, iframeParent: trustedParent, seedStorage: { [targetScope]: JSON.stringify(snapshot) } });
  t.after(() => ui.dom.window.close());
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "switched-import", databaseId: "db-two", nodeIds: ["node-3"], edgeIds: [] } }));
  await settle();
  assert.equal(typeof releaseRestore, "function");
  await switchDatabase(ui.dom, ui.document, "db-one");
  releaseRestore({ nodes: [nodes[1]], relationships: [] });
  await settle();
  assert.equal(ui.calls.some(call => call.parsed.pathname === "/api/knowledge/canvas/import"), false);
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-one");
  assert.deepEqual([...ui.document.querySelectorAll(".knowledge-node")].map(node => node.dataset.nodeId), ["node-1"]);
  assert.deepEqual(JSON.parse(ui.dumpStorage()[targetScope]).nodes, snapshot.nodes);
  assert.ok(messages.some(message => message.type === "cwm.knowledge-import-failed" && message.id === "switched-import"));
});

test("import transport announces readiness while discovery is pending and resolves the payload database afterward", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  let releaseDatabases;
  const ui = await page(url => {
    if (url.pathname === "/api/knowledge/databases") return new Promise(resolve => { releaseDatabases = resolve; });
  }, { controlledAnimation: true, iframeParent: trustedParent });
  t.after(() => ui.dom.window.close());
  assert.ok(messages.some(message => message.type === "cwm.knowledge-ready"));
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "early-import", databaseId: "db-two", nodeIds: ["node-2"], edgeIds: [] } }));
  await settle();
  assert.equal(ui.calls.some(call => call.parsed.pathname === "/api/knowledge/canvas/import"), false);
  releaseDatabases(libraryRegistry);
  await settle(220);
  const imported = ui.calls.find(call => call.parsed.pathname === "/api/knowledge/canvas/import");
  assert.ok(imported);
  assert.equal(imported.parsed.searchParams.get("databaseId"), "db-two");
  assert.ok(messages.some(message => message.type === "cwm.knowledge-imported" && message.id === "early-import"));
});

test("opening an empty preview selects the database and restores its canvas without importing or changing its camera", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  const targetScope = canvasKey("conversation-two", "db-two");
  const snapshot = { version: 1, initialized: true, nodes: [{ id: "node-2", x: -21, y: 36 }], edgeIds: [], camera: { x: 385, y: 205, scale: 1.5 }, selected: null, hiddenIds: [] };
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, iframeParent: trustedParent, seedStorage: { [targetScope]: JSON.stringify(snapshot) } });
  t.after(() => ui.dom.window.close());
  await settle(100);
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "empty-preview", databaseId: "db-two", conversationId: "conversation-two", nodeIds: [], edgeIds: [] } }));
  await settle(220);
  assert.equal(ui.document.querySelector("#knowledge-database").value, "db-two");
  assert.equal(ui.calls.some(call => call.parsed.pathname === "/api/knowledge/canvas/import"), false);
  assert.deepEqual([...ui.document.querySelectorAll(".knowledge-node")].map(node => node.dataset.nodeId), ["node-2"]);
  assert.deepEqual(positionOf(ui.document.querySelector('[data-node-id="node-2"]')), [-21, 36]);
  assert.deepEqual(cameraOf(ui.document), [385, 205, 1.5]);
  assert.deepEqual(JSON.parse(ui.dumpStorage()[canvasKey("", "db-one")]).nodes.map(node => node.id), ["node-1"]);
  assert.match(ui.document.querySelector("#notice").textContent, /已打开该知识库/);
  assert.ok(messages.some(message => message.type === "cwm.knowledge-imported" && message.id === "empty-preview" && message.databaseId === "db-two"));
});

test("an import containing edges without nodes still validates instead of opening a view-only canvas", async t => {
  const messages = [], trustedParent = { postMessage(message) { messages.push(message); } };
  const ui = await page(url => url.pathname === "/api/knowledge/databases" ? libraryRegistry : undefined, { controlledAnimation: true, iframeParent: trustedParent });
  t.after(() => ui.dom.window.close());
  ui.dom.window.dispatchEvent(new ui.dom.window.MessageEvent("message", { source: trustedParent, origin: "http://localhost", data: { type: "cwm.knowledge-import", id: "edges-only", databaseId: "db-one", nodeIds: [], edgeIds: ["r-1"] } }));
  await settle();
  assert.equal(ui.calls.some(call => call.parsed.pathname === "/api/knowledge/canvas/import"), true);
  assert.match(ui.document.querySelector("#notice").textContent, /节点不存在或当前无权访问/);
  assert.ok(messages.some(message => message.type === "cwm.knowledge-import-failed" && message.id === "edges-only"));
});
