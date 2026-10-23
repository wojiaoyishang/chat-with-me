import test from "node:test";
import assert from "node:assert/strict";
import {
  assertOutputSelection,
  executionModeForWorkflow,
  normalizeComfyRunResponse,
} from "../src/features/comfyui/runModel.js";
import { applyUiLayout } from "../src/features/comfyui/graphModel.js";

test("workflows wait by default and can explicitly select background tasks", () => {
  assert.equal(executionModeForWorkflow(null), "wait");
  assert.equal(executionModeForWorkflow({ executionMode: "wait" }), "wait");
  assert.equal(executionModeForWorkflow({ executionMode: "task" }), "task");
});

test("required output selection is enforced and no-output workflows can opt out", () => {
  assert.throws(() => assertOutputSelection(), /至少一个输出节点/);
  assert.doesNotThrow(() =>
    assertOutputSelection(true, [{ nodeId: "10", kind: "image" }]),
  );
  assert.doesNotThrow(() => assertOutputSelection(false, []));
});

test("wait completion stays a direct result while task responses retain their identity", () => {
  const result = {
    outputs: [
      { artifactId: "image", kind: "image", url: "cwm://artifact/image" },
    ],
  };
  assert.deepEqual(
    normalizeComfyRunResponse({ mode: "wait", status: "completed", result }),
    { mode: "wait", result },
  );
  assert.deepEqual(
    normalizeComfyRunResponse({
      mode: "wait",
      status: "completed",
      result: { outputs: [] },
    }),
    { mode: "wait", result: { outputs: [] } },
  );
  const task = { taskId: "task-1", status: "queued" };
  assert.deepEqual(normalizeComfyRunResponse({ ...task, mode: "task", task }), {
    mode: "task",
    task,
  });
  assert.deepEqual(normalizeComfyRunResponse(task), { mode: "task", task });
  assert.throws(
    () => normalizeComfyRunResponse({ mode: "wait", status: "queued" }),
    /尚未返回完成结果/,
  );
  assert.throws(() => normalizeComfyRunResponse({}), /缺少任务标识/);
});

test("closing and reopening the graph editor retains local layout without changing execution JSON", () => {
  const prompt = {
    1: { class_type: "LoadImage", inputs: { image: "original.png" } },
  };
  const graph = {
    prompt,
    nodes: [
      { id: "1", position: { x: 0, y: 0 } },
      { id: "2", position: { x: 300, y: 0 } },
    ],
  };
  const uiWorkflow = { nodes: [{ id: 1, pos: [-23, 321] }] };
  const next = applyUiLayout(graph, uiWorkflow);
  assert.deepEqual(next.nodes[0].position, { x: -23, y: 321 });
  assert.deepEqual(next.nodes[1].position, { x: 300, y: 0 });
  assert.equal(next.prompt, prompt);
  assert.deepEqual(graph.nodes[0].position, { x: 0, y: 0 });
});
