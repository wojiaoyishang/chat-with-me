import {
  workflowPhaseLabels,
  workflowTelemetry,
  workflowTelemetryRows,
} from "./workflowMetrics.js";

export default function WorkflowTelemetryStats({ value }) {
  const rows = workflowTelemetryRows(value);
  const phases = Object.entries(
    workflowTelemetry(value)?.phaseSeconds || {},
  ).filter(([, seconds]) => seconds > 0);
  if (!rows.length && !phases.length) return null;
  return (
    <div className="space-y-3" aria-label="工作流处理指标">
      <div className="workflow-runtime-stats">
        {rows.map((row) => (
          <div key={row.key}>
            <small>{row.label}</small>
            <strong>{row.value}</strong>
            {row.detail && (
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                {row.detail}
              </p>
            )}
          </div>
        ))}
      </div>
      {phases.length > 0 && (
        <div className="rounded-lg border p-3 text-xs text-muted-foreground">
          <p className="mb-2">节点阶段累计耗时（并行时可重叠）</p>
          {phases.map(([phase, seconds]) => (
            <p key={phase} className="flex justify-between gap-2">
              <span>{workflowPhaseLabels[phase] || phase}</span>
              <span>{seconds.toFixed(1)} 秒</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
