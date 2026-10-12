import { useEffect, useRef, useState } from "react";
import { onEvent } from "@/context/useEventStore.jsx";
import { workflowApi } from "./workflowApi.js";

/** Realtime events trigger a detail refresh; polling survives a lost transport. */
export default function useWorkflowTask(initialTask) {
  const [task, setTask] = useState(initialTask);
  const [error, setError] = useState("");
  const taskId = task?.id || task?.taskId;
  const generation = useRef(0);
  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);
  useEffect(() => {
    if (!taskId) return;
    const controller = new AbortController();
    let pending = false;
    const epoch = ++generation.current;
    const refresh = async () => {
      if (pending || controller.signal.aborted) return;
      pending = true;
      try {
        const detail = await workflowApi.task(taskId, controller.signal);
        if (!controller.signal.aborted && epoch === generation.current) {
          setTask(detail.task || detail);
          setError("");
        }
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause.message);
      } finally {
        pending = false;
      }
    };
    const unsubscribe = onEvent({ event: "task.changed" }).then(
      ({ payload }) => {
        if ([payload?.id, payload?.taskId, payload?.jobId].includes(taskId))
          void refresh();
      },
    );
    const reconnect = onEvent({ event: "transport.connected" }).then(
      () => void refresh(),
    );
    const timer = setInterval(() => {
      if (!document.hidden) void refresh();
    }, 3000);
    return () => {
      controller.abort();
      clearInterval(timer);
      unsubscribe();
      reconnect();
    };
  }, [taskId]);
  return { task, error };
}
