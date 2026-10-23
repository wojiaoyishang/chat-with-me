import test from "node:test";
import assert from "node:assert/strict";
import { resolveEscStatus } from "../src/features/documents/escStatus.js";

test("rejected fragment stays failed even if the old stream completed", () => {
  const result = resolveEscStatus({ streamId: "old", status: "interrupted", code: "ESC_WRITE_REJECTED", message: "本段未写入" }, { streamId: "old", status: "completed" });
  assert.equal(result.status, "interrupted");
  assert.equal(result.label, "文档写入未完成");
  assert.equal(result.message, "本段未写入");
});

test("normal status still follows matching live document events", () => {
  assert.equal(resolveEscStatus({ streamId: "s", status: "writing" }, { streamId: "s", status: "completed" }).label, "文档撰写完成");
  assert.equal(resolveEscStatus({ streamId: "s", status: "writing" }, { streamId: "other", status: "completed" }).label, "正在撰写文档...");
  assert.equal(resolveEscStatus({ streamId: "s", status: "writing" }, { streamId: "s", status: "streaming" }).status, "writing");
});

test("only the known rejection exposes a bounded user message", () => {
  assert.equal(resolveEscStatus({ status: "written", message: "internal diagnostic" }).message, "");
  assert.equal(resolveEscStatus({ code: "ESC_WRITE_REJECTED", message: "x".repeat(500) }).message.length, 300);
});
