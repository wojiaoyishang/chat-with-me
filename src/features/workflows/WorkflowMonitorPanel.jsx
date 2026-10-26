import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import { workflowApi } from "./workflowApi.js";
import { workflowStatusLabels } from "./workflowStatus.js";
import WorkflowLogViewer from "./WorkflowLogViewer.jsx";
import RunObservation from "../tasks/RunObservation.jsx";

const printable = (value) =>
  typeof value === "string" ? value : JSON.stringify(value, null, 2);
export default function WorkflowMonitorPanel({
  task,
  node,
  definition,
  runtime = {},
  onOpenLogs,
  onEnterSubgraph,
  nodeHeader,
}) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [opened, setOpened] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const taskId = task?.id;
  const nodeId = runtime.runtimeId || node?.id;
  const isSubgraph = node?.kind === "subgraph";
  const preview = runtime.outputPreview;
  useEffect(() => {
    setOutput(null);
    setOffset(0);
    setOpened(false);
    setLoading(false);
    setError("");
  }, [taskId, nodeId]);
  useEffect(() => {
    if (!opened || !taskId || !nodeId) return;
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => {
      if (!active) return;
      active = false;
      controller.abort();
      setError("读取节点输出超时，请重试。");
      setLoading(false);
    }, 30000);
    setLoading(true);
    workflowApi
      .nodeOutput(taskId, nodeId, offset, controller.signal)
      .then((value) => {
        if (active) {
          setOutput(value);
          setError("");
        }
      })
      .catch((cause) => {
        if (active) setError(cause.message);
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [taskId, nodeId, opened, offset, refresh]);
  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <h3 className="font-semibold">任务执行状态</h3>
        <p className="break-all text-xs text-muted-foreground">{taskId}</p>
        <div className="workflow-runtime-stats">
          <div>
            <small>状态</small>
            <strong>
              {workflowStatusLabels[task?.status] || task?.status}
            </strong>
          </div>
        </div>
        <RunObservation observation={task?.observation} taskId={taskId} />
      </section>
      <WorkflowLogViewer
        taskId={taskId}
        compact
        live={["running", "queued", "pending"].includes(task?.status)}
        onExpand={onOpenLogs}
      />
      {node ? (
        <>
          <section className="space-y-3 border-t pt-4">
            {nodeHeader || (
              <>
                <h3 className="font-semibold">
                  {node.name || definition?.display?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {definition?.display?.subtitle}
                </p>
              </>
            )}
            {runtime.namePath?.length > 1 && (
              <p className="text-xs text-muted-foreground">
                位置：{runtime.namePath.join(" › ")}
              </p>
            )}
            {isSubgraph && (
              <div className="space-y-2">
                <p className="text-sm">
                  {runtime.activeCount || 0} 个节点正在执行 ·{" "}
                  {node.subgraph.execution?.mode === "serial" ? "串行" : "并行"}
                </p>
                <Button variant="outline" size="sm" onClick={onEnterSubgraph}>
                  进入子图查看各支路
                </Button>
                {(runtime.children || [])
                  .filter((child) =>
                    ["running", "failed"].includes(child.status),
                  )
                  .map((child) => (
                    <p
                      key={child.runtimeId}
                      className="text-xs text-muted-foreground"
                    >
                      {child.namePath?.join(" › ") ||
                        child.nodePath?.join(" / ")}{" "}
                      · {workflowStatusLabels[child.status] || child.status}
                    </p>
                  ))}
              </div>
            )}
            <div className="workflow-runtime-stats">
              <div>
                <small>节点状态</small>
                <strong>
                  {workflowStatusLabels[runtime.status] ||
                    runtime.status ||
                    "等待"}
                </strong>
              </div>
            </div>
            <RunObservation observation={task?.observation} taskId={taskId} scopeId={`${isSubgraph ? "subgraph" : "node"}:${isSubgraph ? node.id : nodeId}`} />
            {runtime.error && (
              <p role="alert" className="break-words text-sm text-destructive">
                {runtime.error}
              </p>
            )}
          </section>
          {!isSubgraph && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold">节点输出</h4>
              {preview?.summary && (
                <p className="rounded-lg border bg-muted/30 p-3 text-sm">
                  {preview.summary}
                </p>
              )}
              {preview?.items?.length > 0 && (
                <MultilineEditor
                  label="最近输出"
                  value={printable(preview.items)}
                  rows={6}
                  readOnly
                />
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => {
                  setOpened(true);
                  setOffset(0);
                  setRefresh((value) => value + 1);
                }}
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                查看节点完整输出
              </Button>
              {opened && (
                <>
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  {output && (
                    <>
                      <MultilineEditor
                        label="节点输出详情"
                        value={printable(
                          output.output ?? output.preview ?? "当前尚未产生输出",
                        )}
                        rows={12}
                        readOnly
                      />
                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={offset === 0 || loading}
                          onClick={() =>
                            setOffset((value) => Math.max(0, value - 20))
                          }
                        >
                          上一页
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {output.total != null ? `共 ${output.total} 项` : ""}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={!output.hasMore || loading}
                          onClick={() => setOffset((value) => value + 20)}
                        >
                          下一页
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </section>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          选择节点查看进度、错误和输出。
        </p>
      )}
    </div>
  );
}
