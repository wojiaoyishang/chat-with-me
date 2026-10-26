import test from "node:test";
import assert from "node:assert/strict";
import { useTaskStore } from "../src/features/tasks/useTaskStore.js";

test("summary task events preserve the last observation; stale snapshots cannot replace newer data", (t) => {
  const before = useTaskStore.getState();
  t.after(() => useTaskStore.setState(before, true));
  useTaskStore.setState({ tasks: {} });
  const observation = { version: 1, revision: 7, scopes: { task: { components: [{ id: "progress", type: "indicator", title: "已处理", value: 5 }] } } };
  useTaskStore.getState().merge([{ taskId: "run", revision: 2, status: "running", observation }]);
  useTaskStore.getState().merge([{ taskId: "run", revision: 3, status: "running" }]);
  assert.equal(useTaskStore.getState().tasks.run.observation, observation);
  useTaskStore.getState().merge([{ taskId: "run", revision: 4, observation: { version: 1, revision: 6, scopes: {} } }]);
  assert.equal(useTaskStore.getState().tasks.run.observation, observation);
  useTaskStore.getState().merge([{ taskId: "run", revision: 1, status: "queued" }]);
  assert.equal(useTaskStore.getState().tasks.run.status, "running");
  useTaskStore.getState().merge([{ taskId: "run", revision: 5, observation: null }]);
  assert.equal(useTaskStore.getState().tasks.run.observation, null);
});
