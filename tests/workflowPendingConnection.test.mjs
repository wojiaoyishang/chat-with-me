import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { pendingWorkflowConnectionPath } from "../src/features/workflows/workflowPendingConnection.js";

function fixture(handleType) {
  const dom = new JSDOM(`
    <main id="canvas">
      <span class="react-flow__handle react-flow__handle-${handleType}"
        data-nodeid="existing" data-handleid="content"></span>
      <div id="ghost"><span data-pending-handle></span></div>
    </main>
  `);
  const canvas = dom.window.document.getElementById("canvas");
  const ghost = dom.window.document.getElementById("ghost");
  canvas.getBoundingClientRect = () => ({ left: 100, top: 50 });
  canvas.querySelector(".react-flow__handle").getBoundingClientRect = () => ({
    left: 150,
    top: 100,
    width: 8,
    height: 8,
  });
  ghost.querySelector("[data-pending-handle]").getBoundingClientRect = () => ({
    left: 350,
    top: 210,
    width: 8,
    height: 8,
  });
  return { canvas, ghost, close: () => dom.window.close() };
}

test("temporary link joins the existing output to the ghost input", () => {
  const { canvas, ghost, close } = fixture("source");
  try {
    assert.equal(
      pendingWorkflowConnectionPath(canvas, ghost, {
        nodeId: "existing",
        handleId: "content",
        handleType: "source",
      }),
      "M 54 54 C 144 54, 164 164, 254 164",
    );
  } finally {
    close();
  }
});

test("reverse connection starts at the ghost output", () => {
  const { canvas, ghost, close } = fixture("target");
  try {
    assert.match(
      pendingWorkflowConnectionPath(canvas, ghost, {
        nodeId: "existing",
        handleId: "content",
        handleType: "target",
      }),
      /^M 254 164 C /,
    );
    assert.equal(
      pendingWorkflowConnectionPath(canvas, ghost, {
        nodeId: "other",
        handleId: "content",
        handleType: "target",
      }),
      null,
    );
  } finally {
    close();
  }
});
