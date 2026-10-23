import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkflowSourcePicker from "@/features/workflows/WorkflowSourcePicker.jsx";
import { defaultModeForBinding } from "./graphModel.js";

export default function BindingDefaultEditor({
  binding,
  field,
  onChange,
  onBusyChange,
}) {
  const mode = defaultModeForBinding(binding);
  const numeric = ["integer", "number"].includes(binding.kind);
  const setMode = (defaultMode) => {
    const patch = {
      defaultMode,
      default: undefined,
      randomMin: undefined,
      randomMax: undefined,
    };
    if (defaultMode === "fixed") {
      patch.default = Object.hasOwn(binding, "default")
        ? binding.default
        : ["image", "video"].includes(binding.kind)
          ? ""
          : field.value;
    } else if (defaultMode === "random") {
      patch.randomMin = 0;
      patch.randomMax = 4294967295;
    }
    onChange(patch);
  };
  return (
    <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
      <label className="comfy-label">
        未填写时
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="original">保留工作流原值</SelectItem>
            <SelectItem value="fixed">使用固定默认值</SelectItem>
            {numeric && <SelectItem value="random">生成随机整数</SelectItem>}
          </SelectContent>
        </Select>
      </label>
      {mode === "fixed" &&
        (["image", "video"].includes(binding.kind) ? (
          <div className="space-y-2">
            <span className="text-xs font-medium">默认附件</span>
            <WorkflowSourcePicker
              compact
              fixedType={binding.kind}
              maxItems={1}
              value={{
                sourceType: binding.kind,
                resources: binding.default ? [binding.default] : [],
              }}
              onChange={(source) =>
                onChange({ default: source.resources?.[0] || "" })
              }
              onBusyChange={onBusyChange}
            />
          </div>
        ) : binding.kind === "boolean" ? (
          <label className="flex items-center justify-between gap-2 text-sm">
            默认值：{binding.default === true ? "true / 是" : "false / 否"}
            <Switch
              checked={binding.default === true}
              onCheckedChange={(value) => onChange({ default: value })}
            />
          </label>
        ) : binding.kind === "text" ? (
          <label className="comfy-label">
            默认文本
            <textarea
              className="min-h-20 w-full rounded-lg border bg-background p-2 text-sm"
              value={binding.default ?? ""}
              onChange={(event) => onChange({ default: event.target.value })}
            />
          </label>
        ) : (
          <label className="comfy-label">
            默认值
            <Input
              inputMode={binding.kind === "integer" ? "numeric" : "decimal"}
              value={binding.default ?? ""}
              onChange={(event) => onChange({ default: event.target.value })}
            />
          </label>
        ))}
      {mode === "random" && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <label className="comfy-label">
              最小值
              <Input
                inputMode="numeric"
                value={binding.randomMin ?? 0}
                onChange={(event) =>
                  onChange({ randomMin: event.target.value })
                }
              />
            </label>
            <label className="comfy-label">
              最大值
              <Input
                inputMode="numeric"
                value={binding.randomMax ?? 4294967295}
                onChange={(event) =>
                  onChange({ randomMax: event.target.value })
                }
              />
            </label>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            包含两端。每个新任务由后端生成一次，共享字段使用同一个值；任务重试保持原值。
          </p>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        {mode === "original" && binding.required
          ? "此参数必填，运行时需要提供值。"
          : "用户或 AI 显式填写的值优先；未填写时才使用上述设置。"}
      </p>
    </div>
  );
}
