import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const graphNodes = (count, prefix) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    type: "workflow",
    position: { x: index * 300, y: 0 },
    data: { kind: "text", definition: null },
  }));

async function mount(nodes, initial = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost",
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const frames = new Map();
  let nextFrame = 0;
  globalThis.requestAnimationFrame = (callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  const calls = [];
  const state = {
    measured: true,
    flow: {
      fitView: async (options) => {
        calls.push({ options, ids: state.nodes.map((node) => node.id) });
        return true;
      },
      getViewport: () => ({ zoom: 0.45 }),
      getNodes: () => state.nodes,
    },
  };
  globalThis.workflowCanvasFitTest = state;
  await build({
    entryPoints: ["src/features/workflows/WorkflowCanvas.jsx"],
    outfile: "temp/workflow-canvas-fit-test.mjs",
    bundle: true,
    packages: "external",
    platform: "node",
    format: "esm",
    jsx: "automatic",
    plugins: [
      {
        name: "measured-canvas",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve({ filter: /^@xyflow\/react$/ }, () => ({
            path: "flow",
            namespace: "mock",
          }));
          // Overlay controls have separate editor coverage; fit tests isolate
          // measurement and viewport scheduling from portals/UI dependencies.
          builder.onResolve({ filter: /WorkflowParallelRegions\.jsx$/ }, () => ({ path: "region-overlay", namespace: "mock" }));
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({path}) => ({
            loader: "jsx",
            contents: path === "region-overlay" ? "export default()=>null;" :
              "export const applyNodeChanges=(_,nodes)=>nodes;export const useReactFlow=()=>globalThis.workflowCanvasFitTest.flow;export const useNodesInitialized=()=>globalThis.workflowCanvasFitTest.measured;export const ReactFlow=({nodes})=>{globalThis.workflowCanvasFitTest.nodes=nodes;return <section>{nodes.map(node=><span key={node.id}>{node.id}</span>)}</section>};",
          }));
        },
      },
    ],
  });
  const { default: Canvas } = await import(
    `../temp/workflow-canvas-fit-test.mjs?${Date.now()}`
  );
  const root = createRoot(document.getElementById("root"));
  let current = { nodes, fitRequest: 1, onPositionsCommit: () => {}, ...initial };
  const render = async (patch = {}) => {
    current = { ...current, ...patch };
    await act(() => root.render(React.createElement(Canvas, current)));
  };
  const tick = async () => {
    const pending = [...frames];
    frames.clear();
    await act(async () => {
      for (const [, callback] of pending) callback(0);
      await Promise.resolve();
    });
  };
  await render();
  return {
    state,
    calls,
    render,
    tick,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

test("canceled measurement fit retries after nodes finish initialization", async () => {
  const app = await mount(graphNodes(3, "first"));
  try {
    await app.tick();
    app.state.measured = false;
    await app.render();
    await app.tick();
    assert.equal(app.calls.length, 0);
    app.state.measured = true;
    await app.render();
    await app.tick();
    await app.tick();
    assert.equal(app.calls.length, 1);
    assert.deepEqual(app.calls[0].ids, ["first-0", "first-1", "first-2"]);
  } finally {
    await app.close();
  }
});

test("switching from a large template fits every node of a small template after reconciliation", async () => {
  const app = await mount(graphNodes(12, "large"));
  try {
    await app.tick();
    await app.tick();
    assert.equal(
      app.calls.length,
      2,
      "large initial graph can focus its starting nodes",
    );
    app.calls.length = 0;
    await app.render({ nodes: graphNodes(3, "markdown"), fitRequest: 2 });
    await app.tick();
    await app.tick();
    assert.equal(app.calls.length, 1, "small replacement fits the full graph");
    assert.deepEqual(app.calls[0].ids, [
      "markdown-0",
      "markdown-1",
      "markdown-2",
    ]);
    assert.equal(app.calls[0].options.nodes, undefined);
    assert.equal(app.calls[0].options.maxZoom, 1);
  } finally {
    await app.close();
  }
});

test("task following focuses the active node without a competing whole-graph fit", async () => {
  const nodes = graphNodes(5, "stage");
  const app = await mount(nodes, {
    autoFollow: true,
    focusRequest: { id: "stage-2" },
  });
  try {
    await app.tick();
    await app.tick();
    assert.equal(app.calls.length, 1);
    assert.deepEqual(app.calls[0].options.nodes, [{ id: "stage-2" }]);

    await app.render({ nodes: graphNodes(5, "stage") });
    await app.tick();
    await app.tick();
    assert.equal(app.calls.length, 1, "runtime refresh must not restart the focus animation");

    await app.render({ autoFollow: false, focusRequest: null });
    await app.tick();
    await app.tick();
    assert.equal(app.calls.length, 1, "stopping follow must not fit the entire graph");
  } finally {
    await app.close();
  }
});
