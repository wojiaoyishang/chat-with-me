import { useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/** One editor for frame headers and the persistent region list. */
export default function WorkflowRegionControl({ region, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    String(region.maxConcurrency ?? region.limit),
  );
  const maximum = Number(value);
  const valid =
    value.trim() && Number.isInteger(maximum) && maximum >= 1 && maximum <= 16;
  const stop = (event) => event.stopPropagation();
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setValue(String(region.maxConcurrency ?? region.limit));
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="workflow-region-limit nodrag nopan"
          aria-label="设置区域并发"
          disabled={disabled}
          onPointerDown={stop}
          onClick={stop}
          onDoubleClick={stop}
        >
          <SlidersHorizontal size={13} />
          {region.configured ? "自定义" : "继承"} · 上限 {region.limit}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="workflow-region-popover"
        sideOffset={8}
        aria-label="区域并发设置"
        onPointerDown={stop}
        onClick={stop}
        onDoubleClick={stop}
      >
        <header className="workflow-region-popover-header">
          <span className="workflow-region-popover-icon" aria-hidden="true">
            <SlidersHorizontal />
          </span>
          <div>
            <h4>区域并发设置</h4>
            <p>{region.nodeIds.length} 个节点 · 按连线依赖执行</p>
          </div>
        </header>
        <div className="workflow-region-popover-body">
          <label className="workflow-region-field">
            <span>
              <strong>最大并发节点数</strong>
              <small>1–16，设为 1 时逐个执行</small>
            </span>
            <Input
              className="workflow-region-input"
              type="number"
              min="1"
              max="16"
              step="1"
              value={value}
              aria-label="区域最大并发节点数"
              aria-invalid={!valid}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
          <div className="workflow-region-inherited">
            <span>上级并发上限</span>
            <strong>{region.inheritedLimit ?? region.limit}</strong>
          </div>
          <p className="workflow-region-help">
            全局、子图和重叠区域的限制同时生效。
          </p>
          {region.partialLimits && (
            <p className="workflow-region-help">
              部分成员另受其他执行区域限制。
            </p>
          )}
          {!valid && (
            <p role="alert" className="workflow-region-error">
              请输入 1–16 的整数。
            </p>
          )}
        </div>
        <footer className="workflow-region-popover-footer">
          <Button
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => {
              onChange(region, null);
              setOpen(false);
            }}
          >
            <RotateCcw aria-hidden="true" />
            继承上级
          </Button>
          <Button
            size="sm"
            disabled={disabled || !valid}
            onClick={() => {
              onChange(region, maximum);
              setOpen(false);
            }}
          >
            应用
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
}

export function WorkflowRegionList({ regions, numbers, onChange, disabled }) {
  const saved = regions.filter((region) => region.configured);
  if (!saved.length) return null;
  return (
    <section className="space-y-3" aria-label="已配置执行区域">
      <h3 className="text-sm font-medium">执行区域 · {saved.length}</h3>
      <p className="text-xs text-muted-foreground">
        成员按节点 ID 保存。调整连线或折叠子图后，仍可在这里修改限制。
      </p>
      {saved.map((region, index) => (
        <div key={region.id} className="space-y-2 rounded-xl border p-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <strong>区域 {index + 1}</strong>
            <WorkflowRegionControl
              region={region}
              onChange={onChange}
              disabled={disabled}
            />
          </div>
          <p className="break-words text-xs text-muted-foreground">
            {region.nodeIds
              .map((id) => (numbers?.[id] ? `#${numbers[id]}` : id))
              .join(" · ")}
          </p>
        </div>
      ))}
    </section>
  );
}
