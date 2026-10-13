import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";

/** Model order is the retry order; the backend owns model eligibility. */
export default function WorkflowModelQueue({
  value,
  onChange,
  models = [],
  disabled,
  label,
  schema = {},
}) {
  const ids = Array.isArray(value) ? value : [];
  const full =
    Number.isFinite(schema.maxItems) && ids.length >= schema.maxItems;
  const available = models.filter(
    (model) => !ids.some((id) => String(id) === String(model.id)),
  );
  const move = (index, direction) => {
    const next = [...ids];
    [next[index], next[index + direction]] = [
      next[index + direction],
      next[index],
    ];
    onChange(next);
  };
  return (
    <div className="workflow-model-queue space-y-2" aria-label={label}>
      {ids.length ? (
        <ol className="space-y-1.5" aria-label={`${label || "模型"}执行顺序`}>
          {ids.map((id, index) => {
            const model = models.find((item) => String(item.id) === String(id));
            const title = model?.name || model?.title || String(id);
            return (
              <li
                key={`${id}:${index}`}
                className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/30 p-1.5"
              >
                <span className="w-4 shrink-0 text-center text-xs text-muted-foreground">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm" title={title}>
                  {title}
                  {!model && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      （不可用）
                    </span>
                  )}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  aria-label={`上移 ${title}`}
                  disabled={disabled || index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  aria-label={`下移 ${title}`}
                  disabled={disabled || index === ids.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  aria-label={`移除模型 ${title}`}
                  disabled={disabled}
                  onClick={() =>
                    onChange(ids.filter((_, item) => item !== index))
                  }
                >
                  <X className="size-3.5" />
                </Button>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          {schema.ui?.emptyLabel || "自动选择可用模型"}
        </p>
      )}
      <div className="flex items-center gap-2">
        <Plus
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <WorkflowSelect
          label={`添加${label || "模型"}`}
          value=""
          disabled={disabled || full || !available.length}
          options={[
            {
              value: "",
              label: full
                ? "已达到模型数量上限"
                : available.length
                  ? "添加模型…"
                  : "没有其他可用模型",
            },
            ...available.map((model) => ({
              value: String(model.id),
              label: model.name || model.title || String(model.id),
            })),
          ]}
          onChange={(id) => {
            if (id) onChange([...ids, id]);
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {schema.ui?.orderLabel || "按顺序尝试，当前模型失败后使用下一项。"}
      </p>
    </div>
  );
}
