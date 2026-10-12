import test from "node:test";
import assert from "node:assert/strict";
import {
  workflowElapsedSeconds,
  workflowTokens,
} from "../src/features/workflows/workflowMetrics.js";

test("task monitor reads elapsed time and tokens from the runtime DTO", () => {
  assert.equal(
    workflowElapsedSeconds({
      runtime: { elapsedSeconds: 12.5, activeSeconds: 9 },
    }),
    12.5,
  );
  assert.equal(workflowElapsedSeconds({ runtime: { activeSeconds: 9 } }), 9);
  assert.equal(workflowElapsedSeconds({ activeSeconds: 7 }), 7);
  assert.equal(
    workflowElapsedSeconds({
      startedAt: "2026-10-12T00:00:00Z",
      finishedAt: "2026-10-12T00:00:03Z",
    }),
    3,
  );
  assert.equal(workflowTokens({ totalTokens: 123 }), 123);
  assert.equal(workflowTokens({ total_tokens: 35 }), 35);
});
