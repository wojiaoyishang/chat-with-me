import test from "node:test";
import assert from "node:assert/strict";
import {
  workflowElapsedSeconds,
  workflowTokens,
  workflowTelemetry,
  workflowTelemetryRows,
  aggregateWorkflowTelemetry,
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

test("workflow metrics expose in-flight requests and omit unavailable measurements", () => {
  const value = {
    runtime: {
      workflowMetrics: {
        activeRequests: 2,
        totalRequests: 9,
        failedRequests: 1,
        peakActiveRequests: 3,
        downloadedBytes: 2048,
        artifactCount: 1,
        artifactBytes: 1024,
        requestSecondsByKind: { database: 1.2 },
      },
      preparationSeconds: 1.2,
      queueSeconds: 3.4,
    },
  };
  assert.equal(workflowTelemetry(value).activeRequests, 2);
  const rows = workflowTelemetryRows(value);
  assert.deepEqual(
    rows.find((row) => row.key === "activeRequests"),
    {
      key: "activeRequests",
      label: "存在连接数",
      value: "2",
      detail: "当前尚未结束的外部请求，不含空闲连接与监控通道",
    },
  );
  assert.equal(
    rows.find((row) => row.key === "downloadedBytes").value,
    "2.0 KB",
  );
  assert.equal(rows.find((row) => row.key === "preparationSeconds").value, "1.2 秒");
  assert.equal(rows.find((row) => row.key === "queueSeconds").value, "3.4 秒");
  assert.equal(rows.find((row) => row.key === "requestSeconds:database").value, "1.2 秒");
  assert.equal(
    rows.some((row) => row.key === "uploadedBytes"),
    false,
  );
  assert.equal(
    rows.some((row) => row.label.includes("GPU")),
    false,
  );
  assert.deepEqual(workflowTelemetryRows({}), []);
});

test("subgraph metrics sum active responses but never sum independent historical peaks", () => {
  const result = aggregateWorkflowTelemetry([
    {
      telemetry: {
        activeRequests: 2,
        totalRequests: 4,
        peakActiveRequests: 2,
        phaseSeconds: { processing: 3 },
      },
    },
    {
      telemetry: {
        activeRequests: 1,
        totalRequests: 3,
        peakActiveRequests: 1,
        phaseSeconds: { processing: 4 },
      },
    },
  ]);
  assert.equal(result.activeRequests, 3);
  assert.equal(result.totalRequests, 7);
  assert.equal(result.phaseSeconds.processing, 7);
  assert.equal(result.peakActiveRequests, undefined);
  assert.equal(result.artifactCount, undefined);
});
