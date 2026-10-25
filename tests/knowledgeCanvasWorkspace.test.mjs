import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const script = await readFile(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-workspace.js",
  ),
  "utf8",
);
const scope = "/api|conversation-1";
const key = (value) => `cwm.knowledge.canvas.v1:${encodeURIComponent(value)}`;
const snapshot = (nodes = ["node-1", "node-2"]) => ({
  version: 1,
  initialized: true,
  nodes: nodes.map((id, index) => ({ id, x: 10 + index, y: -20 - index })),
  edgeIds: ["edge-1"],
  edges: [{ id: "edge-1", source: "node-1", target: "node-2" }],
  camera: { x: 120, y: 80, scale: 0.75 },
  selected: nodes[0] ?? null,
  multiSelectedIds: nodes.length ? [nodes[0]] : [],
  hiddenIds: ["hidden-1"],
});
function page() {
  const dom = new JSDOM("", {
    url: "http://localhost/api/knowledge/page",
    runScripts: "outside-only",
  });
  dom.window.eval(script);
  return { dom, workspace: dom.window.CWMGraphWorkspace };
}
const plain = (value) => JSON.parse(JSON.stringify(value));

test('ordered orbit metadata persists as bounded layout only, without source or business content', () => {
  const { dom, workspace } = page(), input = snapshot();
  input.nodes[0].orderedOrbit = { anchorId: 'node-2', slot: 3, offset: { x: 120, y: -80 }, content: 'secret' };
  input.nodes[1].orderedManualOffset = { x: 50, y: 20 };
  workspace.write(scope, input);
  const saved = plain(workspace.read(scope));
  assert.deepEqual(saved.nodes[0].orderedOrbit, { anchorId: 'node-2', slot: 3, offset: { x: 120, y: -80 } });
  assert.deepEqual(saved.nodes[1].orderedManualOffset, { x: 50, y: 20 });
  assert.doesNotMatch(dom.window.sessionStorage.getItem(key(scope)), /secret/);
  input.nodes[0].orderedOrbit.slot = Infinity; workspace.write(scope, input);
  assert.equal(workspace.read(scope).nodes[0].orderedOrbit, undefined);
  dom.window.close();
});

test("canvas storage persists only identities and layout, isolated by scope", () => {
  const { dom, workspace } = page();
  const input = snapshot();
  input.name = "secret";
  input.nodes[0].name = "secret";
  input.nodes[0].properties = { content: "private text", uri: "image.png" };
  input.edges[0].type = "secret relationship";
  input.edges[0].properties = { description: "private edge" };
  assert.equal(workspace.write(scope, input), true);
  const raw = dom.window.sessionStorage.getItem(key(scope));
  assert.doesNotMatch(raw, /secret|private|content|properties|image\.png/);
  assert.deepEqual(plain(workspace.read(scope)), snapshot());
  assert.equal(workspace.read("/api|conversation-2"), null);
  assert.equal(workspace.read("/other-api|conversation-1"), null);
  workspace.write("/api|conversation-2", snapshot([]));
  assert.equal(workspace.read("/api|conversation-2").nodes.length, 0);
  assert.equal(workspace.read(scope).nodes.length, 2);
  dom.window.close();
});

test("multiselection stores only visible identities and drops denied targets on restoration", async () => {
  const { dom, workspace } = page(),
    value = snapshot();
  value.multiSelectedIds = [
    "node-1",
    "node-2",
    "node-2",
    "hidden-1",
    "not-on-canvas",
  ];
  workspace.write(scope, value);
  const saved = workspace.read(scope);
  assert.deepEqual(plain(saved.multiSelectedIds), ["node-1", "node-2"]);
  const restored = await workspace.hydrate(saved, async (id) => {
    if (id === "node-2")
      throw Object.assign(new Error("denied"), { status: 403 });
    return { nodes: [{ id: "node-1", name: "fresh" }], relationships: [] };
  });
  assert.deepEqual(plain(restored.multiSelectedIds), ["node-1"]);
  delete value.multiSelectedIds;
  workspace.write(scope, value);
  assert.deepEqual(plain(workspace.read(scope).multiSelectedIds), ["node-1"]);
  dom.window.close();
});

test("corrupt, obsolete or unavailable session storage cannot break the page", () => {
  const { dom, workspace } = page();
  for (const value of ["bad json", "null", '{"version":2}', '{"version":1}']) {
    dom.window.sessionStorage.setItem(key(scope), value);
    assert.equal(workspace.read(scope), null);
  }
  Object.defineProperty(dom.window, "sessionStorage", {
    get() {
      throw new Error("Storage unavailable");
    },
  });
  assert.equal(workspace.read(scope), null);
  assert.equal(workspace.write(scope, snapshot()), false);
  assert.equal(workspace.write(scope, null), false);
  dom.window.close();
});

test("snapshot normalization bounds identities, coordinates, camera and edges", () => {
  const { dom, workspace } = page();
  const input = snapshot([]);
  input.nodes = [
    { id: "hidden-1", x: 2, y: 3 },
    { id: "node-1", x: Infinity, y: 1e12 },
    { id: "node-1", x: 99, y: 99 },
    { id: "", x: 1, y: 2 },
    { id: "x".repeat(201) },
    ...Array.from({ length: 450 }, (_, index) => ({
      id: `many-${index}`,
      x: index,
      y: -index,
    })),
  ];
  input.camera = { x: NaN, y: -1e12, scale: 999 };
  input.selected = "hidden-1";
  input.edgeIds = Array.from({ length: 2200 }, (_, index) => `edge-${index}`);
  input.edges = [
    { id: "edge-1", source: "node-1", target: "many-1" },
    { id: "edge-1", source: "node-1", target: "many-1" },
    { id: "edge-2", source: "hidden-1", target: "node-1" },
  ];
  assert.equal(workspace.write(scope, input), true);
  const clean = plain(workspace.read(scope));
  assert.equal(clean.nodes.length, 400);
  assert.equal(clean.edgeIds.length, 2000);
  assert.deepEqual(clean.nodes[0], { id: "node-1", x: 0, y: 1000000 });
  assert.deepEqual(clean.camera, { x: 400, y: -1000000, scale: 3.5 });
  assert.deepEqual(clean.edges, [
    { id: "edge-1", source: "node-1", target: "many-1" },
  ]);
  assert.equal(clean.selected, null);
  dom.window.close();
});

test("restore uses freshly authorized graph data and only cached node and edge IDs", async () => {
  const { dom, workspace } = page();
  const input = snapshot(["node-1", "node-2", "revoked"]);
  input.selected = "revoked";
  input.nodes[0].name = "cached secret";
  let active = 0;
  let maxActive = 0;
  const result = await workspace.hydrate(input, async (id) => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await new Promise((resolve) => setTimeout(resolve, 1));
    active -= 1;
    if (id === "revoked")
      throw Object.assign(new Error("Denied"), { status: 404 });
    return {
      nodes: [
        {
          id: "node-1",
          elementId: "element-1",
          name: "fresh 1",
          properties: {},
        },
        { id: "node-2", name: "fresh 2", properties: {} },
        { id: "new-neighbor", name: "not in saved board" },
      ],
      relationships: [
        {
          id: "edge-1",
          source: "element-1",
          target: "node-2",
          type: "fresh edge",
        },
        {
          id: "new-edge",
          source: "node-1",
          target: "node-2",
          type: "not saved",
        },
        { id: "other-edge", source: "node-1", target: "new-neighbor" },
      ],
    };
  });
  assert.ok(maxActive <= 3);
  assert.deepEqual(plain(result.nodes.map((node) => node.id)), [
    "node-1",
    "node-2",
  ]);
  assert.deepEqual(plain(result.nodes.map((node) => node.name)), [
    "fresh 1",
    "fresh 2",
  ]);
  assert.deepEqual(
    plain(result.positions),
    input.nodes.slice(0, 2).map(({ id, x, y }) => ({ id, x, y })),
  );
  assert.deepEqual(plain(result.relationships.map((edge) => edge.id)), [
    "edge-1",
  ]);
  assert.equal(result.relationships[0].source, "node-1");
  assert.equal(result.selected, null);
  assert.deepEqual(plain(result.camera), input.camera);
  assert.deepEqual(plain(result.hiddenIds), input.hiddenIds);
  dom.window.close();
});

test("empty initialized canvas remains empty without even issuing a graph request", async () => {
  const { dom, workspace } = page();
  let requests = 0;
  const result = await workspace.hydrate(snapshot([]), () => {
    requests += 1;
    throw new Error("Should not request a seed");
  });
  assert.equal(requests, 0);
  assert.equal(result.initialized, true);
  assert.deepEqual(plain(result.nodes), []);
  assert.deepEqual(plain(result.relationships), []);
  assert.equal(result.selected, null);
  dom.window.close();
});

test("graph hydration covers many saved nodes in one graph and recovers missing cached edges", async () => {
  const { dom, workspace } = page();
  const names = Array.from({ length: 10 }, (_, index) => `node-${index + 1}`);
  const input = snapshot(names);
  const requests = [];
  const result = await workspace.hydrate(input, async (id) => {
    requests.push(id);
    return {
      nodes: names.map((nodeId) => ({ id: nodeId, name: "fresh" })),
      relationships:
        id === "node-4"
          ? [{ id: "edge-1", source: "node-4", target: "node-5" }]
          : [],
    };
  });
  // Sources 1/2 were already queried, so their missing edge cannot invent data.
  assert.deepEqual(requests, ["node-1", "node-2", "node-3"]);
  assert.equal(result.relationships.length, 0);

  requests.length = 0;
  input.edges = [{ id: "edge-1", source: "node-4", target: "node-5" }];
  const recovered = await workspace.hydrate(input, async (id) => {
    requests.push(id);
    return {
      nodes: names.map((nodeId) => ({ id: nodeId, name: "fresh" })),
      relationships:
        id === "node-4"
          ? [{ id: "edge-1", source: "node-4", target: "node-5" }]
          : [],
    };
  });
  assert.deepEqual(requests, [
    "node-1",
    "node-2",
    "node-3",
    "node-4",
    "node-5",
  ]);
  assert.equal(recovered.relationships.length, 1);
  dom.window.close();
});

test("lost permission is pruned, while authentication, network and server errors reject restoration", async () => {
  const { dom, workspace } = page();
  for (const status of [403, 404]) {
    const result = await workspace.hydrate(snapshot(["node-1"]), async () => {
      throw Object.assign(new Error("No longer visible"), { status });
    });
    assert.deepEqual(plain(result.nodes), []);
    assert.equal(result.selected, null);
  }
  for (const status of [undefined, 401, 500]) {
    await assert.rejects(
      workspace.hydrate(snapshot(["node-1"]), async () => {
        throw Object.assign(new Error("Stop restoration"), { status });
      }),
      /Stop restoration/,
    );
  }
  await assert.rejects(
    workspace.hydrate(snapshot(), async () => ({ message: "invalid" })),
    /有效/,
  );
  dom.window.close();
});


test("batch restoration keeps manually added Chunk source edges and never falls back to auto expansion", async (t) => {
  const { dom, workspace } = page();
  t.after(() => dom.window.close());
  const saved = snapshot(["node-1", "node-2", "revoked"]);
  let calls = 0;
  const result = await workspace.hydrate(saved, async () => { throw new Error("Must not auto-expand"); }, async (ids, edges) => {
    calls++;
    assert.deepEqual(Array.from(ids), ["node-1", "node-2", "revoked"]);
    assert.deepEqual(Array.from(edges), ["edge-1"]);
    return { nodes: [{ id: "node-1", label: "Event" }, { id: "node-2", label: "Chunk" }], relationships: [{ id: "edge-1", source: "node-1", target: "node-2", type: "EXTRACTED_FROM" }] };
  });
  assert.equal(calls, 1);
  assert.equal(result.nodes.length, 2);
  assert.equal(result.relationships[0].type, "EXTRACTED_FROM");
  assert.equal(result.nodes.some((node) => node.id === 'revoked'), false);
  assert.equal(result.positions.length, 2);
});

test('hydration forwards only fresh completeness proofs whose children and containment edges survive filtering', async t => {
  const { dom, workspace } = page(); t.after(() => dom.window.close());
  const data = { nodes: [{ id: 'node-1' },
    { id: 'node-2', properties: { ordered_parent: 'node-1' } },
    { id: 'node-3', properties: { ordered_parent: 'node-1' } }],
    relationships: [{ id: 'edge-1', source: 'node-1', target: 'node-2', type: 'ORDERED_CONTAINS' },
      { id: 'edge-2', source: 'node-1', target: 'node-3', type: 'ORDERED_CONTAINS' }], completeParentIds: ['node-1'] };
  const full = snapshot(['node-1', 'node-2', 'node-3']);
  full.edgeIds.push('edge-2'); full.edges.push({ id: 'edge-2', source: 'node-1', target: 'node-3' });
  const hydrate = (saved, response = data) => workspace.hydrate(saved, async () => response, async () => response);
  assert.deepEqual(plain((await hydrate(full)).completeParentIds), ['node-1']);
  assert.deepEqual(plain((await hydrate(snapshot())).completeParentIds), [], 'a fallback result cannot certify a child filtered out of the saved view');
  assert.deepEqual(plain((await hydrate({ ...full, edgeIds: ['edge-1'], edges: full.edges.filter(edge => edge.id === 'edge-1') })).completeParentIds), [], 'saved node identities alone do not prove membership');
  full.completeParentIds = ['node-1']; workspace.write(scope, full);
  assert.equal(workspace.read(scope).completeParentIds, undefined);
  assert.deepEqual(plain((await hydrate(full, { ...data, completeParentIds: [] })).completeParentIds), [], 'cached declarations are never trusted');
});
