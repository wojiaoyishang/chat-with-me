import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import { workflowApi } from "./workflowApi.js";
import { workflowStatusLabels } from "./workflowStatus.js";
import { workflowElapsedSeconds, workflowTokens } from "./workflowMetrics.js";

const printable = (value) =>
  typeof value === "string" ? value : JSON.stringify(value, null, 2);
export default function WorkflowMonitorPanel({
  task,
  node,
  definition,
  runtime = {},
  stages = [],
}) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [opened, setOpened] = useState(false);
  const taskId = task?.id;
  const nodeId = node?.id;
  const preview = runtime.outputPreview;
  const stage = stages.find((item) => item.key === nodeId) || {};
  useEffect(() => {
    setOutput(null);
    setOffset(0);
    setOpened(false);
    setError("");
  }, [taskId, nodeId]);
  useEffect(() => {
    if (!opened || !taskId || !nodeId) return;
    const controller = new AbortController();
    setLoading(true);
    workflowApi
      .nodeOutput(taskId, nodeId, offset, controller.signal)
      .then((value) => {
        if (!controller.signal.aborted) {
          setOutput(value);
          setError("");
        }
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [taskId, nodeId, opened, offset, runtime.status, preview?.summary]);
  const completed = Object.values(
    task?.workflowNodes || task?.runtime?.checkpoint?.data?.workflowNodes || {},
  ).filter((item) => ["completed", "succeeded"].includes(item.status)).length;
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
          <div>
            <small>进度</small>
            <strong>{task?.progress ?? 0}%</strong>
          </div>
          <div>
            <small>总 Token</small>
            <strong>{workflowTokens(task?.usage)}</strong>
          </div>
          <div>
            <small>已完成节点</small>
            <strong>{completed}</strong>
          </div>
          <div>
            <small>耗时</small>
            <strong>{Math.round(workflowElapsedSeconds(task))} 秒</strong>
          </div>
        </div>
      </section>
      {node ? (
        <>
          <section className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">
              {node.name || definition?.title || node.id}
            </h3>
            <p className="text-xs text-muted-foreground">
              {definition?.className || node.kind}
            </p>
            <div className="workflow-runtime-stats">
              <div>
                <small>节点状态</small>
                <strong>
                  {workflowStatusLabels[runtime.status || stage.status] ||
                    runtime.status ||
                    stage.status ||
                    "等待"}
                </strong>
              </div>
              <div>
                <small>Token</small>
                <strong>
                  {workflowTokens(runtime.usage || stage.usage || stage)}
                </strong>
              </div>
              <div>
                <small>耗时</small>
                <strong>
                  {Math.round(
                    workflowElapsedSeconds(runtime) ||
                      workflowElapsedSeconds(stage),
                  )}{" "}
                  秒
                </strong>
              </div>
              {runtime.nodeProgress && (
                <div>
                  <small>处理数量</small>
                  <strong>
                    {runtime.nodeProgress.processed}/
                    {runtime.nodeProgress.total}
                  </strong>
                </div>
              )}
            </div>
            {runtime.error && (
              <p role="alert" className="break-words text-sm text-destructive">
                {runtime.error}
              </p>
            )}
          </section>
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
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          选择节点查看进度、错误和输出。
        </p>
      )}
    </div>
  );
}
