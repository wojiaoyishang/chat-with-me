import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workflowApi } from "./workflowApi.js";
import "./workflowLogViewer.css";

const levels = [
  { value: "all", label: "全部" },
  { value: "info", label: "信息" },
  { value: "warning", label: "警告" },
  { value: "error", label: "错误" },
  { value: "debug", label: "调试" },
];

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString(undefined, {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
};

export default function WorkflowLogViewer({
  taskId,
  compact = false,
  live = false,
  nodeId = null,
  onExpand,
}) {
  const [level, setLevel] = useState("all");
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const limit = compact ? 5 : 50;

  useEffect(() => {
    setOffset(0);
    setResult(null);
  }, [taskId, nodeId, level, compact]);

  useEffect(() => {
    if (!taskId) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    workflowApi
      .logs(taskId, {
        offset,
        limit,
        level,
        nodeId,
        signal: controller.signal,
      })
      .then((value) => {
        if (!controller.signal.aborted) setResult(value);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) {
          setError(cause?.message || "日志加载失败");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [taskId, offset, limit, level, nodeId, refreshKey]);

  useEffect(() => {
    if (!live || !taskId || loading) return;
    const timer = window.setTimeout(
      () => setRefreshKey((key) => key + 1),
      3000,
    );
    return () => window.clearTimeout(timer);
  }, [live, taskId, loading, refreshKey]);

  const items = Array.isArray(result?.items) ? result.items : [];
  const hasMore = Boolean(result?.hasMore);
  const total = Number.isFinite(result?.total) ? result.total : null;

  return (
    <section className={`workflow-log-viewer${compact ? " is-compact" : ""}`}>
      <div className="workflow-log-heading">
        <div>
          <h3>{compact ? "最近日志" : "执行日志"}</h3>
          {total !== null && <span>{total} 条</span>}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="刷新日志"
          title="刷新日志"
          disabled={!taskId || loading}
          onClick={() => setRefreshKey((key) => key + 1)}
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCw className="size-4" />
          )}
        </Button>
      </div>
      <div className="workflow-log-filters" aria-label="日志级别筛选">
        {levels.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={level === option.value}
            onClick={() => setLevel(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {!taskId ? (
        <p className="workflow-log-empty">先选择任务以查看日志。</p>
      ) : error ? (
        <div className="workflow-log-empty" role="alert">
          <span>{error}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRefreshKey((key) => key + 1)}
          >
            重试
          </Button>
        </div>
      ) : loading && !result ? (
        <p className="workflow-log-empty">正在加载日志…</p>
      ) : !items.length ? (
        <p className="workflow-log-empty">
          暂无
          {level === "all"
            ? ""
            : levels.find((item) => item.value === level)?.label}
          日志。
        </p>
      ) : (
        <ol
          className="workflow-log-list pretty-scrollbar"
          aria-label="任务日志"
          aria-live="polite"
        >
          {items.map((item, index) => {
            const severity = levels.some(
              (option) => option.value === item.level,
            )
              ? item.level
              : "info";
            return (
              <li
                key={item.id ?? `${item.timestamp}-${index}`}
                className={`workflow-log-entry level-${severity}`}
              >
                <div className="workflow-log-meta">
                  <span className="workflow-log-severity">
                    {severity.toUpperCase()}
                  </span>
                  <time dateTime={item.timestamp || undefined}>
                    {formatTime(item.timestamp)}
                  </time>
                  {(item.nodeName || item.nodeId) && (
                    <span
                      className="workflow-log-node"
                      title={item.nodeId || undefined}
                    >
                      {item.nodeName || item.nodeId}
                    </span>
                  )}
                </div>
                <p>{item.message}</p>
              </li>
            );
          })}
        </ol>
      )}
      {compact ? (
        onExpand && (
          <Button type="button" variant="outline" size="sm" onClick={onExpand}>
            查看全部日志
          </Button>
        )
      ) : (
        <div className="workflow-log-pagination">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={offset === 0 || loading}
            onClick={() => setOffset((value) => Math.max(0, value - limit))}
          >
            上一页
          </Button>
          <span>
            {total === null
              ? `第 ${Math.floor(offset / limit) + 1} 页`
              : `${Math.min(offset + 1, total)}–${Math.min(offset + limit, total)} / ${total}`}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasMore || loading}
            onClick={() => setOffset((value) => value + limit)}
          >
            下一页
          </Button>
        </div>
      )}
    </section>
  );
}
