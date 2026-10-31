import { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkflowDataField from "./WorkflowDataField.jsx";
import {
  workflowModelOptionDefault,
  workflowModelOptionErrors,
  workflowModelOptionsDraft,
  setWorkflowModelOptions,
} from "./workflowModelOptionsState.js";

/** Per-model drawers consume server capabilities, never a client parameter list. */
export default function WorkflowModelOptions({
  value = {},
  onChange,
  models = [],
  modelIds = [],
  disabled,
  label = "模型调用参数",
}) {
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const ids = [
    ...new Set([
      ...(Array.isArray(modelIds) ? modelIds : []),
      ...Object.keys(value || {}),
    ]),
  ];
  const model = models.find((item) => String(item.id) === editing);
  const schema = model?.callOptionsSchema;
  const fields = Object.entries(
    schema?.properties?.parameters?.properties || {},
  );
  const effort = schema?.properties?.reasoningEffort;
  const errors = schema
    ? workflowModelOptionErrors(draft, schema)
    : ["该模型的参数定义暂不可用"];
  const invalidEditor = Object.entries(invalidFields).some(
    ([key, valid]) =>
      valid === false && Object.hasOwn(draft.parameters || {}, key),
  );
  return (
    <div className="min-w-0 space-y-2" aria-label={label}>
      {ids.length ? (
        <ul className="divide-y rounded-md border">
          {ids.map((rawId) => {
            const id = String(rawId);
            const item = models.find(
              (candidate) => String(candidate.id) === id,
            );
            const title = item?.name || item?.title || id;
            const options = value?.[id] || {};
            const count =
              Object.keys(options.parameters || {}).length +
              Number(
                Boolean(
                  options.reasoningEffort &&
                  options.reasoningEffort !== "default",
                ),
              );
            return (
              <li
                className="flex min-w-0 items-center gap-2 px-3 py-2"
                key={id}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium" title={title}>
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {!item
                      ? "模型已不可用，保留原配置"
                      : count
                        ? `${count} 项自定义参数`
                        : "继承模型设置"}
                  </p>
                </div>
                {count > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    aria-label={`重置 ${title} 参数`}
                    disabled={disabled}
                    onClick={() =>
                      onChange(setWorkflowModelOptions(value, id, {}))
                    }
                  >
                    <RotateCcw className="size-3.5" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  aria-label={`配置 ${title} 调用参数`}
                  disabled={disabled || !item?.callOptionsSchema}
                  onClick={() => {
                    setDraft(
                      workflowModelOptionsDraft(
                        options,
                        item.callOptionsSchema,
                      ),
                    );
                    setEditing(id);
                    setInvalidFields({});
                    setOpen(true);
                  }}
                >
                  <SlidersHorizontal className="size-3.5" />
                  参数
                </Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-md bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
          先选择模型，再为每个模型设置调用参数。
        </p>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="shrink-0 border-b px-5 py-4 text-left">
            <DialogTitle>
              {model?.name || model?.title || "模型"} · 调用参数
            </DialogTitle>
            <DialogDescription>
              只影响当前工作流配置。未勾选的参数继承模型设置，不修改模型本身。
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-4">
            {effort && (
              <section className="space-y-2">
                <label className="text-sm font-medium">
                  {effort.title || "思考程度"}
                </label>
                <WorkflowDataField
                  label={effort.title || "思考程度"}
                  value={draft.reasoningEffort || "default"}
                  schema={effort}
                  disabled={disabled}
                  onChange={(reasoningEffort) =>
                    setDraft((previous) => ({ ...previous, reasoningEffort }))
                  }
                />
              </section>
            )}
            {fields.map(([key, property]) => {
              const enabled = Object.hasOwn(draft.parameters || {}, key);
              const title = property.title || key;
              return (
                <section className="space-y-2 border-t pt-3" key={key}>
                  <label className="flex items-center justify-between gap-3 text-sm">
                    <span>
                      {title}
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {title !== key ? key : ""}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                      <Checkbox
                        checked={enabled}
                        disabled={disabled}
                        aria-label={`自定义 ${title}`}
                        onCheckedChange={(checked) =>
                          setDraft((previous) => {
                            const parameters = { ...previous.parameters };
                            if (checked)
                              parameters[key] =
                                workflowModelOptionDefault(property);
                            else delete parameters[key];
                            return { ...previous, parameters };
                          })
                        }
                      />
                      自定义
                    </span>
                  </label>
                  <WorkflowDataField
                    label={title}
                    schema={property}
                    value={enabled ? draft.parameters[key] : property.default}
                    disabled={disabled || !enabled}
                    onValidity={(valid) =>
                      setInvalidFields((previous) =>
                        previous[key] === valid
                          ? previous
                          : { ...previous, [key]: valid },
                      )
                    }
                    onChange={(next) =>
                      setDraft((previous) => ({
                        ...previous,
                        parameters: { ...previous.parameters, [key]: next },
                      }))
                    }
                  />
                  {property.description && (
                    <p className="text-xs leading-5 text-muted-foreground">
                      {property.description}
                    </p>
                  )}
                </section>
              );
            })}
            {!effort && !fields.length && (
              <p className="text-sm text-muted-foreground">
                此模型没有可覆盖的调用参数。
              </p>
            )}
            {errors.length > 0 && (
              <p role="alert" className="break-words text-sm text-destructive">
                {errors[0]}
              </p>
            )}
            {invalidEditor && (
              <p role="alert" className="text-sm text-destructive">
                请先修正尚未完成的参数编辑。
              </p>
            )}
          </div>
          <DialogFooter className="shrink-0 border-t px-5 py-3">
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={() => {
                setDraft({});
                setInvalidFields({});
              }}
            >
              继承模型设置
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              disabled={
                disabled || !schema || errors.length > 0 || invalidEditor
              }
              onClick={() => {
                onChange(setWorkflowModelOptions(value, editing, draft));
                setOpen(false);
              }}
            >
              应用
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
