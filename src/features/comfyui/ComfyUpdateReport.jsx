import { AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/** The backend reconciles bindings; this view only reports its decision. */
export default function ComfyUpdateReport({
  report,
  needsOutput,
  confirmed,
  onConfirm,
  onConfigure,
}) {
  const removedInputs = report.removedInputs || [];
  const removedOutputs = report.removedOutputs || [];
  const removed = [...removedInputs, ...removedOutputs];
  return (
    <section
      aria-label="工作流更新预览"
      className={`rounded-xl border p-4 space-y-3 ${removed.length ? "border-amber-400/50 bg-amber-50/40 dark:bg-amber-950/20" : "bg-muted/30"}`}
      role="status"
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        {removed.length ? (
          <AlertTriangle className="size-4 shrink-0" />
        ) : (
          <Check className="size-4 shrink-0" />
        )}
        新版工作流已载入草稿，尚未保存
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        已保留 {report.retainedInputs?.length || 0} 处输入绑定、
        {report.retainedOutputs?.length || 0}{" "}
        个输出设置。工作流说明、使用备注与运行方式保持当前配置。
      </p>
      {removed.length > 0 && (
        <>
          <p className="text-xs leading-relaxed">
            以下 {removed.length}{" "}
            处映射已失效，未带入新版。请重新配置，或确认移除后保存。
          </p>
          <ul
            className="max-h-40 overflow-auto overscroll-contain space-y-2 text-xs pretty-scrollbar"
            aria-label="失效映射"
          >
            {removed.map((item, index) => (
              <li
                key={`${item.nodeId}:${item.field || item.kind}:${index}`}
                className="break-words"
              >
                <span className="font-medium">
                  {item.label || item.name || "输出节点"}
                </span>
                {" · #"}
                {item.nodeId}
                {item.field ? ` · ${item.field}` : ""}
                <span className="block text-muted-foreground">
                  {item.reason || "目标节点或字段已变化，请重新配置。"}
                </span>
              </li>
            ))}
          </ul>
          {needsOutput && (
            <p className="text-xs text-destructive">
              当前工作流要求输出节点，请重新选择至少一个输出节点才能保存。
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onConfigure}
            >
              重新配置映射
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={confirmed}
              onClick={onConfirm}
            >
              {confirmed ? "已确认失效映射" : "确认移除失效映射"}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
