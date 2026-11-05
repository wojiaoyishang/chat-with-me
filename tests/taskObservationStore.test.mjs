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

test("task badge snapshots stay scoped to the actor and cannot undo a newer status event", (t) => {
  const before = useTaskStore.getState();
  t.after(() => useTaskStore.setState(before, true));
  useTaskStore.getState().bindOwner('account-a');
  const epoch = useTaskStore.getState().statusEpoch;
  useTaskStore.getState().merge([{taskId: 'run', revision: 1, status: 'queued'}]);
  assert.equal(useTaskStore.getState().setSummary({activeCount: 0}, 'account-a', epoch), false);
  const current = useTaskStore.getState().statusEpoch;
  assert.equal(useTaskStore.getState().setSummary({activeCount: 1}, 'account-a', current), true);
  useTaskStore.getState().merge([{taskId: 'run', revision: 2, observation: null}]);
  assert.equal(useTaskStore.getState().statusEpoch, current);
  useTaskStore.getState().bindOwner('account-b');
  assert.deepEqual(useTaskStore.getState().tasks, {});
  assert.equal(useTaskStore.getState().summary, null);
  assert.equal(useTaskStore.getState().setSummary({activeCount: 9}, 'account-a', 0), false);
});
