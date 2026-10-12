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
