import { useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, Play } from "lucide-react";
import apiClient from "@/lib/apiClient.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkflowSourcePicker from "@/features/workflows/WorkflowSourcePicker.jsx";
import {
  buildRunInputs,
  defaultModeForBinding,
  defaultPolicyHint,
  initialRunValues,
  logicalInputs,
} from "./graphModel.js";
import "@/features/workflows/workflow.css";
import ComfyRunResult from "./ComfyRunResult.jsx";
import {
  executionModeForWorkflow,
  normalizeComfyRunResponse,
} from "./runModel.js";

export default function ComfyRunDialog({
  workflow,
  servers,
  endpoint,
  onClose,
  onTask,
}) {
  const fields = logicalInputs(workflow.bindings);
  const [serverId, setServerId] = useState(
    () =>
      servers.find(
        (server) => server.enabled !== false && server.name === "default",
      )?.id ||
      servers.find((server) => server.enabled !== false)?.id ||
      "",
  );
  const [title, setTitle] = useState(
    workflow.title || workflow.name || "ComfyUI 工作流",
  );
  const [values, setValues] = useState(() =>
    initialRunValues(workflow.bindings),
  );
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState(() => executionModeForWorkflow(workflow));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [completion, setCompletion] = useState(null);
  const task = completion?.mode === "task" ? completion.task : null;
  const [checking, setChecking] = useState(false);
  const [compatibility, setCompatibility] = useState("");
  const setValue = (name, value) =>
    setValues((current) => ({ ...current, [name]: value }));
  const submit = async () => {
    if (busy || uploading) return;
    setError("");
    try {
      if (!serverId) throw new Error("请先添加并选择可用的 ComfyUI 连接。");
      const inputs = buildRunInputs(workflow.bindings, values);
      setBusy(true);
      const result = await apiClient.post(`${endpoint}/run`, {
        serverId,
        workflowId: workflow.id,
        inputs,
        mode,
        title: title.trim() || workflow.title,
      });
      setCompletion(normalizeComfyRunResponse(result));
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusy(false);
    }
  };
  const validate = async () => {
    setChecking(true);
    setCompatibility("");
    setError("");
    try {
      const result = await apiClient.post(`${endpoint}/validate`, {
        serverId,
        workflowId: workflow.id,
      });
      if (result.valid === false || result.errors?.length)
        throw new Error(
          (result.errors || [])
            .map((item) =>
              typeof item === "string"
                ? item
                : item.message || JSON.stringify(item),
            )
            .join("\n") || "兼容性检查未通过。",
        );
      setCompatibility(
        "连接所需节点与选项检查通过。实际运行仍取决于工作流和模型配置。",
      );
    } catch (cause) {
      setError(cause.message);
    } finally {
      setChecking(false);
    }
  };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy && !uploading) onClose();
      }}
    >
      <DialogContent className="comfy-dialog sm:!max-w-[620px]">
        <DialogHeader className="comfy-dialog-header">
          <DialogTitle>运行 ComfyUI 工作流</DialogTitle>
          <DialogDescription>
            {workflow.title || workflow.name}
          </DialogDescription>
        </DialogHeader>
        <div className="comfy-dialog-body space-y-5 pretty-scrollbar">
          {completion ? (
            task ? (
              <div className="space-y-3 py-5 text-center">
                <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
                <h3 className="font-semibold">任务已提交</h3>
                <p className="text-sm text-muted-foreground">
                  可在任务页面查看进度与生成的附件。
                </p>
                <code className="block break-all text-xs text-muted-foreground">
                  {task.taskId || task.id || task.jobId}
                </code>
                <Button
                  onClick={() => onTask(task.taskId || task.id || task.jobId)}
                >
                  <ExternalLink className="size-4" />
                  查看任务
                </Button>
              </div>
            ) : (
              <ComfyRunResult result={completion.result} />
            )
          ) : (
            <>
              {workflow.notes && (
                <div className="rounded-xl bg-muted p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  <strong className="block mb-2">使用备注</strong>
                  {workflow.notes}
                </div>
              )}
              <label className="comfy-label">
                目标连接
                <Select
                  value={serverId || "_none"}
                  onValueChange={(value) => {
                    setServerId(value === "_none" ? "" : value);
                    setCompatibility("");
                    setError("");
                  }}
                  disabled={busy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择 ComfyUI 连接" />
                  </SelectTrigger>
                  <SelectContent>
                    {!servers.some((server) => server.enabled !== false) && (
                      <SelectItem value="_none" disabled>
                        请先添加连接
                      </SelectItem>
                    )}
                    {servers
                      .filter((server) => server.enabled !== false)
                      .map((server) => (
                        <SelectItem key={server.id} value={server.id}>
                          {server.title || server.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="comfy-label">
                本次运行方式
                <Select value={mode} onValueChange={setMode} disabled={busy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wait">等待完成并返回结果</SelectItem>
                    <SelectItem value="task">提交后台任务</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-xs font-normal text-muted-foreground">
                  {mode === "wait"
                    ? "直接等待 ComfyUI 完成，在此窗口显示生成结果。"
                    : "提交后返回任务标识，可稍后在任务页面查看。"}
                </span>
              </label>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={validate}
                  disabled={busy || checking || !serverId}
                >
                  {checking ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-4" />
                  )}
                  检查工作流兼容性
                </Button>
                {compatibility && (
                  <p role="status" className="text-xs text-muted-foreground">
                    {compatibility}
                  </p>
                )}
              </div>
              <label className="comfy-label">
                运行标题
                <Input
                  value={title}
                  disabled={busy}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              {fields.map((field) => {
                const provided = Object.hasOwn(values, field.name);
                const policy = defaultModeForBinding(field);
                const manualRequired = field.required && policy === "original";
                return (
                  <div
                    key={field.name}
                    className="rounded-xl border p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">
                        {field.label || field.name}
                        {field.required && (
                          <span className="ml-1 text-destructive">*</span>
                        )}
                      </span>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        本次填写
                        <Switch
                          checked={provided}
                          disabled={busy || uploading || manualRequired}
                          onCheckedChange={(checked) =>
                            setValues((current) => {
                              const next = { ...current };
                              if (checked)
                                next[field.name] =
                                  policy === "fixed" &&
                                  Object.hasOwn(field, "default")
                                    ? field.default
                                    : field.kind === "boolean"
                                      ? false
                                      : "";
                              else delete next[field.name];
                              return next;
                            })
                          }
                          aria-label={`填写 ${field.label || field.name}`}
                        />
                      </label>
                    </div>
                    {field.description && (
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {field.description}
                      </p>
                    )}
                    {!provided ? (
                      <p className="text-xs text-muted-foreground">
                        {defaultPolicyHint(field)}
                      </p>
                    ) : ["image", "video"].includes(field.kind) ? (
                      <WorkflowSourcePicker
                        compact
                        fixedType={field.kind}
                        maxItems={1}
                        value={{
                          sourceType: field.kind,
                          resources: values[field.name]
                            ? [values[field.name]]
                            : [],
                        }}
                        onChange={(source) =>
                          setValue(field.name, source.resources?.[0] || "")
                        }
                        onBusyChange={setUploading}
                        disabled={busy}
                      />
                    ) : field.kind === "boolean" ? (
                      <label className="flex items-center justify-between gap-3 text-sm">
                        <span>
                          {values[field.name] ? "true / 是" : "false / 否"}
                        </span>
                        <Switch
                          checked={values[field.name] === true}
                          disabled={busy}
                          onCheckedChange={(value) =>
                            setValue(field.name, value)
                          }
                        />
                      </label>
                    ) : field.kind === "text" ? (
                      <textarea
                        className="min-h-24 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={values[field.name] ?? ""}
                        disabled={busy}
                        onChange={(event) =>
                          setValue(field.name, event.target.value)
                        }
                      />
                    ) : (
                      <Input
                        type="number"
                        step={field.kind === "integer" ? "1" : "any"}
                        value={values[field.name] ?? ""}
                        disabled={busy}
                        onChange={(event) =>
                          setValue(field.name, event.target.value)
                        }
                      />
                    )}
                    <p className="text-xs text-muted-foreground break-all">
                      {field.name} ·{" "}
                      {field.targets
                        .map((target) => `#${target.nodeId}.${target.field}`)
                        .join("、")}
                    </p>
                  </div>
                );
              })}
              {!fields.length && (
                <p className="text-sm text-muted-foreground">
                  此模板没有开放参数，将使用原工作流中的全部值。
                </p>
              )}
            </>
          )}
          {busy && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-3 rounded-xl bg-muted p-4 text-sm"
            >
              <Loader2 className="size-5 shrink-0 animate-spin" />
              <span>
                {mode === "wait"
                  ? "正在等待 ComfyUI 执行完成并收集结果，请保留此窗口。"
                  : "正在提交后台任务…"}
              </span>
            </div>
          )}
          {error && (
            <p
              role="alert"
              className="text-sm text-destructive whitespace-pre-wrap"
            >
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="comfy-dialog-footer">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={busy || uploading}
          >
            {completion ? "关闭" : "取消"}
          </Button>
          {!completion && (
            <Button onClick={submit} disabled={busy || uploading || !serverId}>
              {busy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Play className="size-4" />
              )}
              {mode === "wait" ? "运行并等待结果" : "提交后台任务"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
