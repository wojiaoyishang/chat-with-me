export function workflowTokens(value) {
  return value?.totalTokens ?? value?.total_tokens ?? value?.total ?? 0;
}

export function workflowElapsedSeconds(value) {
  const runtime = value?.runtime || {};
  const explicit =
    value?.durationSeconds ??
    value?.elapsedSeconds ??
    value?.activeSeconds ??
    runtime.elapsedSeconds ??
    runtime.activeSeconds ??
    value?.duration;
  if (Number.isFinite(Number(explicit))) return Number(explicit);
  if (!value?.startedAt) return 0;
  const end = value.finishedAt ? Date.parse(value.finishedAt) : Date.now();
  const start = Date.parse(value.startedAt);
  return Number.isFinite(end - start) ? Math.max(0, (end - start) / 1000) : 0;
}

export const workflowPhaseLabels = {
  preparing: "准备输入",
  queued: "等待 Worker",
  processing: "节点处理",
  uploading: "上传输入",
  submitting: "提交外部请求",
  external_queue: "远端排队",
  external_execution: "远端执行",
  downloading: "下载结果",
  collecting: "收集结果",
  registering: "登记附件",
  completed: "完成",
  failed: "失败",
  cancelled: "取消",
};

export function workflowTelemetry(value) {
  const measured =
    value?.telemetry ||
    value?.workflowMetrics ||
    value?.runtime?.workflowMetrics ||
    value?.runtime?.checkpoint?.data?.workflowMetrics ||
    null;
  const result = { ...measured };
  for (const field of ["preparationSeconds", "queueSeconds"])
    if (Number.isFinite(value?.runtime?.[field]))
      result[field] = value.runtime[field];
  return Object.keys(result).length ? result : null;
}

export function workflowBytes(value) {
  if (!Number.isFinite(value) || value < 0) return "未知";
  const units = ["B", "KB", "MB", "GB"];
  let amount = value,
    index = 0;
  while (amount >= 1024 && index < units.length - 1) {
    amount /= 1024;
    index += 1;
  }
  return `${index ? amount.toFixed(1) : amount} ${units[index]}`;
}

/** Unknown measurements stay absent; node time can overlap in parallel runs. */
export function workflowTelemetryRows(value) {
  const metrics = workflowTelemetry(value);
  if (!metrics) return [];
  const rows = [];
  const add = (key, label, format = (item) => String(item), detail) => {
    if (Number.isFinite(metrics[key]))
      rows.push({ key, label, value: format(metrics[key]), detail });
  };
  add(
    "activeRequests",
    "存在连接数",
    undefined,
    "当前尚未结束的外部请求，不含空闲连接与监控通道",
  );
  add("totalRequests", "累计请求");
  add("peakActiveRequests", "请求峰值");
  add("failedRequests", "失败请求");
  add("cachedNodes", "缓存命中节点");
  add("externalWaitingNodes", "等待外部服务节点");
  add("retryCount", "重试次数");
  add(
    "preparationSeconds",
    "提交准备",
    (seconds) => `${seconds.toFixed(1)} 秒`,
  );
  add("queueSeconds", "等待 Worker", (seconds) => `${seconds.toFixed(1)} 秒`);
  add("uploadedBytes", "已上传", workflowBytes);
  add("downloadedBytes", "已下载", workflowBytes);
  add("artifactCount", "产物数量");
  add("artifactBytes", "产物大小", workflowBytes);
  add("remoteQueuePosition", "远端前方请求数");
  for (const [kind, seconds] of Object.entries(
    metrics.requestSecondsByKind || {},
  ))
    if (Number.isFinite(seconds))
      rows.push({
        key: `requestSeconds:${kind}`,
        label: `${{ database: "数据库", http: "HTTP", model: "模型" }[kind] || kind}响应累计耗时`,
        value: `${seconds.toFixed(1)} 秒`,
        detail:
          "已结束请求的响应耗时，并行时可重叠，不等于 CPU 时间或任务经过时间",
      });
  if (Number.isFinite(metrics.remoteProgress))
    rows.push({
      key: "remoteProgress",
      label: "远端步骤",
      value: `${metrics.remoteProgress}${Number.isFinite(metrics.remoteProgressTotal) ? `/${metrics.remoteProgressTotal}` : ""}`,
    });
  if (metrics.phase)
    rows.unshift({
      key: "phase",
      label: "当前阶段",
      value: workflowPhaseLabels[metrics.phase] || metrics.phase,
    });
  if (metrics.outputFormat)
    rows.push({
      key: "outputFormat",
      label: "输出格式",
      value: metrics.outputFormat,
    });
  if (metrics.requestReused)
    rows.push({ key: "requestReused", label: "远端请求", value: "复用原请求" });
  if (metrics.resumedFromCheckpoint)
    rows.push({
      key: "resumedFromCheckpoint",
      label: "恢复方式",
      value: "从检查点继续",
    });
  if (metrics.artifactValidated !== undefined)
    rows.push({
      key: "artifactValidated",
      label: "产物校验",
      value: metrics.artifactValidated ? "通过" : "未通过",
    });
  return rows;
}

export function aggregateWorkflowTelemetry(states) {
  const values = states.map(workflowTelemetry).filter(Boolean);
  if (!values.length) return undefined;
  const result = { version: 1, phaseSeconds: {}, requestSecondsByKind: {} };
  for (const key of [
    "activeRequests",
    "totalRequests",
    "completedRequests",
    "failedRequests",
    "cancelledRequests",
    "uploadedBytes",
    "downloadedBytes",
    "artifactCount",
    "artifactBytes",
    "retryCount",
  ])
    if (values.some((value) => Number.isFinite(value[key])))
      result[key] = values.reduce(
        (total, value) => total + (value[key] || 0),
        0,
      );
  for (const value of values)
    for (const [phase, elapsed] of Object.entries(value.phaseSeconds || {}))
      result.phaseSeconds[phase] = (result.phaseSeconds[phase] || 0) + elapsed;
  for (const value of values)
    for (const [kind, elapsed] of Object.entries(
      value.requestSecondsByKind || {},
    ))
      result.requestSecondsByKind[kind] =
        (result.requestSecondsByKind[kind] || 0) + elapsed;
  return result;
}
