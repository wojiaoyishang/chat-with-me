import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  FileJson,
  Loader2,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Upload,
  Workflow,
  Zap,
} from "lucide-react";
import apiClient from "@/lib/apiClient.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ComfyGraphDialog from "@/features/comfyui/ComfyGraphDialog.jsx";
import ComfyParameterSummary from "@/features/comfyui/ComfyParameterSummary.jsx";
import ComfyRunDialog from "@/features/comfyui/ComfyRunDialog.jsx";
import { applyUiLayout, logicalInputs } from "@/features/comfyui/graphModel.js";
import {
  assertOutputSelection,
  executionModeForWorkflow,
} from "@/features/comfyui/runModel.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  inspectWorkflowPayload,
  readWorkflowFiles,
  workflowSourceKind,
} from "@/features/comfyui/importModel.js";
import { prepareBindingsForSave } from "@/features/comfyui/bindingModel.js";
import "@/features/comfyui/comfyui.css";

const NEW_SERVER = {
  name: "default",
  title: "",
  baseUrl: "http://127.0.0.1:8188",
  enabled: true,
  authToken: "",
  authHeader: "Authorization",
  authScheme: "Bearer",
  requestTimeoutSeconds: 60,
  runTimeoutSeconds: 1800,
  maxFileBytes: 536870912,
};
const formRecord = (server) => ({ ...NEW_SERVER, ...server, authToken: "" });
const fieldClass =
  "min-h-24 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ServerEditor({ record, endpoint, onClose, onSaved }) {
  const [values, setValues] = useState(() => formRecord(record));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [clearToken, setClearToken] = useState(false);
  const set = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));
  const save = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const payload = Object.fromEntries(
        Object.keys(NEW_SERVER).map((key) => [key, values[key]]),
      );
      if (record) payload.revision = record.revision;
      if (record && !values.authToken && !clearToken) delete payload.authToken;
      if (clearToken) payload.authToken = "";
      if (record)
        await apiClient.put(
          `${endpoint}/servers/${encodeURIComponent(record.id)}`,
          payload,
        );
      else await apiClient.post(`${endpoint}/servers`, payload);
      await onSaved();
      onClose();
    } catch (cause) {
      setError(
        cause.code === 409
          ? `${cause.message} 请关闭并重新打开，加载最新配置后再修改。`
          : cause.message,
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <DialogContent className="comfy-dialog sm:!max-w-[620px]">
        <DialogHeader className="comfy-dialog-header">
          <DialogTitle>
            {record ? "编辑 ComfyUI 连接" : "添加 ComfyUI 连接"}
          </DialogTitle>
          <DialogDescription>
            每个连接独立运行任务，支持本地和远程 ComfyUI。
          </DialogDescription>
        </DialogHeader>
        <div className="comfy-dialog-body space-y-4 pretty-scrollbar">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="comfy-label">
              连接标识
              <Input
                value={values.name}
                onChange={(event) => set("name", event.target.value)}
                placeholder="default"
              />
            </label>
            <label className="comfy-label">
              显示名称
              <Input
                value={values.title}
                onChange={(event) => set("title", event.target.value)}
                placeholder="本地 ComfyUI"
              />
            </label>
          </div>
          <label className="comfy-label">
            服务地址
            <Input
              value={values.baseUrl}
              onChange={(event) => set("baseUrl", event.target.value)}
              placeholder="http://127.0.0.1:8188"
            />
          </label>
          <label className="flex items-center justify-between text-sm">
            启用连接
            <Switch
              checked={values.enabled}
              onCheckedChange={(value) => set("enabled", value)}
            />
          </label>
          <label className="comfy-label">
            访问令牌
            <Input
              type="password"
              autoComplete="new-password"
              value={values.authToken}
              onChange={(event) => set("authToken", event.target.value)}
              placeholder={
                record?.hasToken ? "已配置；留空保留现有令牌" : "无需认证时留空"
              }
            />
          </label>
          {record?.hasToken && (
            <label className="flex items-center justify-between text-sm text-muted-foreground">
              清除已有令牌
              <Switch checked={clearToken} onCheckedChange={setClearToken} />
            </label>
          )}
          <details className="rounded-xl border p-3">
            <summary className="text-sm cursor-pointer">认证及运行限制</summary>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <label className="comfy-label">
                认证请求头
                <Input
                  value={values.authHeader}
                  onChange={(event) => set("authHeader", event.target.value)}
                />
              </label>
              <label className="comfy-label">
                认证前缀
                <Input
                  value={values.authScheme}
                  onChange={(event) => set("authScheme", event.target.value)}
                  placeholder="Bearer"
                />
              </label>
              <label className="comfy-label">
                请求超时（秒）
                <Input
                  type="number"
                  min="1"
                  value={values.requestTimeoutSeconds}
                  onChange={(event) =>
                    set("requestTimeoutSeconds", Number(event.target.value))
                  }
                />
              </label>
              <label className="comfy-label">
                任务超时（秒）
                <Input
                  type="number"
                  min="1"
                  value={values.runTimeoutSeconds}
                  onChange={(event) =>
                    set("runTimeoutSeconds", Number(event.target.value))
                  }
                />
              </label>
              <label className="comfy-label sm:col-span-2">
                单文件上限（字节）
                <Input
                  type="number"
                  min="1"
                  value={values.maxFileBytes}
                  onChange={(event) =>
                    set("maxFileBytes", Number(event.target.value))
                  }
                />
              </label>
            </div>
          </details>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="comfy-dialog-footer">
          <Button variant="outline" disabled={busy} onClick={onClose}>
            取消
          </Button>
          <Button disabled={busy} onClick={save}>
            {busy && <Loader2 className="size-4 animate-spin" />}保存连接
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WorkflowEditor({ record, endpoint, servers, onClose, onSaved }) {
  const [inputBusy, setInputBusy] = useState(false);
  const [title, setTitle] = useState(record?.title || "");
  const [name, setName] = useState(record?.name || "");
  const [description, setDescription] = useState(record?.description || "");
  const [notes, setNotes] = useState(record?.notes || "");
  const [requireOutput, setRequireOutput] = useState(
    record?.requireOutput !== false,
  );
  const [executionMode, setExecutionMode] = useState(() =>
    executionModeForWorkflow(record),
  );
  const [graphDialog, setGraphDialog] = useState(null);
  const [raw, setRaw] = useState("");
  const [canvasRaw, setCanvasRaw] = useState("");
  const [canvasName, setCanvasName] = useState("");
  const [importServerId, setImportServerId] = useState("");
  const [graph, setGraph] = useState(record?.prompt ? record : null);
  const [bindings, setBindings] = useState(record?.bindings || []);
  const [outputs, setOutputs] = useState(record?.outputBindings || []);
  const [selectedId, setSelectedId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showSource, setShowSource] = useState(!record);
  const file = useRef(null);
  const canvasFile = useRef(null);
  const canvasOnly = workflowSourceKind(raw.trim() || canvasRaw) === "canvas";
  const openGraph = (nodeId = null) => {
    if (nodeId != null) setSelectedId(String(nodeId));
    setGraphDialog({ focusNodeId: nodeId });
  };
  const loadFile = async (event, supplemental = false) => {
    const selected = [...(event.target.files || [])];
    event.target.value = "";
    if (!selected.length) return;
    if (selected.length > 2) {
      setError("请选择一份工作流 JSON；也可同时导入 API 和对应的原始画布。");
      return;
    }
    if (selected.some((item) => item.size > 10 * 1024 * 1024)) {
      setError("工作流 JSON 文件不能超过 10 MB。");
      return;
    }
    try {
      const imported = readWorkflowFiles(
        await Promise.all(
          selected.map(async (item) => ({
            name: item.name,
            text: await item.text(),
          })),
        ),
      );
      if (supplemental) {
        if (!imported.canvas || imported.api)
          throw new Error("补充文件应为同一版本的普通画布 JSON。");
        setCanvasRaw(imported.canvas.text);
        setCanvasName(imported.canvas.name);
      } else {
        setRaw((imported.api || imported.canvas).text);
        setCanvasRaw(
          imported.api && imported.canvas ? imported.canvas.text : "",
        );
        setCanvasName(
          imported.api && imported.canvas ? imported.canvas.name : "",
        );
      }
      setError("");
    } catch (cause) {
      setError(
        cause instanceof SyntaxError
          ? "JSON 格式不正确，请检查后重新导入。"
          : cause.message,
      );
    }
  };
  const inspect = async () => {
    setBusy(true);
    setError("");
    try {
      const parsed = await apiClient.post(`${endpoint}/inspect`, {
        ...inspectWorkflowPayload(raw, canvasRaw, importServerId),
      });
      setGraph(parsed);
      setBindings(parsed.bindings || []);
      setOutputs(parsed.outputBindings || []);
      setSelectedId(null);
      setShowSource(false);
      setGraphDialog({ focusNodeId: null });
    } catch (cause) {
      setError(
        cause instanceof SyntaxError
          ? "JSON 格式不正确，请检查后重新导入。"
          : cause.message,
      );
    } finally {
      setBusy(false);
    }
  };
  const save = async () => {
    if (!graph || busy || inputBusy) return;
    setBusy(true);
    setError("");
    try {
      if (!name.trim() || !title.trim())
        throw new Error("请填写工作流标识和显示名称。");
      assertOutputSelection(requireOutput, outputs);
      const payload = {
        name: name.trim(),
        title: title.trim(),
        description,
        notes,
        requireOutput,
        executionMode,
        workflow: graph.prompt,
        uiWorkflow: graph.uiWorkflow,
        bindings: prepareBindingsForSave(bindings),
        outputBindings: outputs,
        ...(record ? { revision: record.revision } : {}),
      };
      if (record)
        await apiClient.put(
          `${endpoint}/workflows/${encodeURIComponent(record.id)}`,
          payload,
        );
      else await apiClient.post(`${endpoint}/workflows`, payload);
      await onSaved();
      onClose();
    } catch (cause) {
      setError(
        cause.code === 409
          ? `${cause.message} 请关闭并重新打开最新模板。`
          : cause.message,
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy && !inputBusy) onClose();
      }}
    >
      <DialogContent className="comfy-dialog sm:!max-w-[820px]">
        <DialogHeader className="comfy-dialog-header">
          <DialogTitle>
            {record ? "配置 ComfyUI 工作流" : "导入 ComfyUI 工作流"}
          </DialogTitle>
          <DialogDescription>
            设置工作流说明、运行方式及开放参数，通过独立流程图窗口选择输入与输出。
          </DialogDescription>
        </DialogHeader>
        <div className="comfy-dialog-body pretty-scrollbar space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="comfy-label">
              工作流标识
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="image-to-video"
                disabled={busy}
              />
            </label>
            <label className="comfy-label">
              显示名称
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="图片生成视频"
                disabled={busy}
              />
            </label>
          </div>
          <label className="comfy-label">
            说明
            <Input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="说明用途、输入要求和使用条件，供用户及 AI 查阅"
              disabled={busy}
            />
          </label>
          <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
            <label className="comfy-label">
              默认运行方式
              <Select
                value={executionMode}
                onValueChange={setExecutionMode}
                disabled={busy}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wait">等待完成并返回结果</SelectItem>
                  <SelectItem value="task">提交后台任务</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs font-normal text-muted-foreground">
                等待模式直接显示结果；后台任务可在任务页面查看进度。
              </span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-3 text-sm font-medium">
                必须选择输出节点
                <Switch
                  checked={requireOutput}
                  disabled={busy}
                  onCheckedChange={setRequireOutput}
                />
              </label>
              <p className="text-xs leading-relaxed text-muted-foreground">
                开启时至少配置一个输出节点才能保存；关闭后可不指定要收集的输出节点，仍按原始工作流执行。
              </p>
            </div>
          </div>
          <label className="comfy-label">
            使用备注
            <textarea
              className={fieldClass}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={20000}
              placeholder="说明这个工作流的用途、使用顺序、模型前提和注意事项，供用户和 AI 参考。"
              disabled={busy}
            />
          </label>
          {showSource ? (
            <div className="space-y-3 rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium">导入工作流 JSON</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    API
                    或普通画布任选一种即可，也可同时导入两份还原原始布局和子图。普通画布优先直接解析；遇到缺少定义的节点时，可选择连接补全。
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => file.current?.click()}
                  disabled={busy}
                >
                  <Upload className="size-4" />
                  选择工作流文件
                </Button>
                <input
                  ref={file}
                  type="file"
                  accept=".json,application/json"
                  multiple
                  hidden
                  onChange={loadFile}
                />
              </div>
              <textarea
                className={`${fieldClass} min-h-44 font-mono text-xs`}
                aria-label="工作流 JSON"
                value={raw}
                onChange={(event) => setRaw(event.target.value)}
                placeholder={
                  '粘贴 API 或普通画布 JSON，例如：\n{\n  "12": { "class_type": "LoadImage", "inputs": { "image": "example.png" } }\n}'
                }
                disabled={busy}
              />
              {canvasOnly && (
                <label className="comfy-label rounded-lg border p-3">
                  补全节点定义的连接（可选）
                  <Select
                    value={importServerId || ":none"}
                    onValueChange={(value) =>
                      setImportServerId(value === ":none" ? "" : value)
                    }
                    disabled={busy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择连接" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=":none">
                        自动解析，不使用连接
                      </SelectItem>
                      {servers
                        .filter((server) => server.enabled !== false)
                        .map((server) => (
                          <SelectItem key={server.id} value={server.id}>
                            {server.title || server.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <span className="text-xs font-normal text-muted-foreground">
                    若提示缺少节点定义，可选择已有连接读取定义后重试；解析过程不会提交生成任务。
                  </span>
                </label>
              )}
              {!canvasOnly && (
                <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-auto text-xs text-muted-foreground">
                      附加原始画布（可选，请与 API 从同一版本导出）
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => canvasFile.current?.click()}
                      disabled={busy}
                    >
                      选择画布 JSON
                    </Button>
                    {canvasRaw && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCanvasRaw("");
                          setCanvasName("");
                        }}
                        disabled={busy}
                      >
                        移除画布
                      </Button>
                    )}
                    <input
                      ref={canvasFile}
                      type="file"
                      accept=".json,application/json"
                      hidden
                      onChange={(event) => loadFile(event, true)}
                    />
                  </div>
                  {canvasRaw && (
                    <p className="text-xs break-all">
                      已载入：{canvasName || "原始画布"}；解析后会核对与 API
                      的对应关系。
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                {graph && (
                  <Button
                    variant="ghost"
                    onClick={() => setShowSource(false)}
                    disabled={busy}
                  >
                    返回配置
                  </Button>
                )}
                <Button
                  onClick={inspect}
                  disabled={busy || (!raw.trim() && !canvasRaw.trim())}
                >
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <FileJson className="size-4" />
                  )}
                  解析并配置流程图
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">
                    {graph.nodes?.length || 0} 个节点
                  </Badge>
                  <span>在独立窗口中配置节点，当前修改会保留在此模板中。</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy}
                  onClick={() => {
                    setCanvasRaw("");
                    setCanvasName("");
                    setRaw(
                      JSON.stringify(
                        graph.uiWorkflow
                          ? {
                              prompt: graph.prompt,
                              extra_data: {
                                extra_pnginfo: { workflow: graph.uiWorkflow },
                              },
                            }
                          : graph.prompt,
                        null,
                        2,
                      ),
                    );
                    setShowSource(true);
                  }}
                >
                  重新导入
                </Button>
              </div>
              {graph.warnings?.length > 0 && (
                <div
                  className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground space-y-1"
                  role="status"
                >
                  {graph.warnings.map((warning, index) => (
                    <p key={index}>{warning}</p>
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => openGraph()}
                disabled={busy}
              >
                <Workflow className="size-4" />
                配置输入与输出节点
              </Button>
              <ComfyParameterSummary bindings={bindings} onLocate={openGraph} />
              <div className="rounded-xl border p-4 space-y-3">
                <strong className="text-sm">已选择的输出</strong>
                {outputs.length ? (
                  <div className="flex flex-wrap gap-2">
                    {outputs.map((output) => (
                      <Button
                        key={output.nodeId}
                        size="sm"
                        variant="outline"
                        onClick={() => openGraph(output.nodeId)}
                      >
                        #{output.nodeId} ·{" "}
                        {graph.nodes.find(
                          (node) => String(node.id) === String(output.nodeId),
                        )?.title || "输出节点"}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p
                    className={`text-xs ${requireOutput ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {requireOutput
                      ? "请在流程图中选择至少一个输出节点后保存。"
                      : "未选择输出节点，允许完成执行后不返回附件。"}
                  </p>
                )}
              </div>
            </>
          )}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive whitespace-pre-wrap"
            >
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="comfy-dialog-footer">
          <span className="mr-auto text-xs text-muted-foreground self-center">
            {bindings.length} 处字段绑定 · {outputs.length} 个输出节点
          </span>
          <Button
            variant="outline"
            disabled={busy || inputBusy}
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            disabled={
              busy ||
              inputBusy ||
              !graph ||
              showSource ||
              (requireOutput && !outputs.length)
            }
            onClick={save}
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            保存模板
          </Button>
        </DialogFooter>
      </DialogContent>
      {graphDialog && graph && (
        <ComfyGraphDialog
          graph={graph}
          bindings={bindings}
          outputBindings={outputs}
          onBindingsChange={setBindings}
          onOutputsChange={setOutputs}
          onInputBusyChange={setInputBusy}
          inputBusy={inputBusy}
          onUiWorkflowChange={(uiWorkflow) =>
            setGraph((current) => applyUiLayout(current, uiWorkflow))
          }
          selectedId={selectedId}
          onSelect={setSelectedId}
          focusNodeId={graphDialog.focusNodeId}
          onClose={() => setGraphDialog(null)}
        />
      )}
    </Dialog>
  );
}

export default function ComfyUISettings({ config, onTask }) {
  const endpoint = config?.endpoint || "/comfyui";
  const [tab, setTab] = useState("workflows");
  const [servers, setServers] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [serverEditor, setServerEditor] = useState(null);
  const [workflowEditor, setWorkflowEditor] = useState(null);
  const [run, setRun] = useState(null);
  const [deletion, setDeletion] = useState(null);
  const [testResults, setTestResults] = useState({});
  const epoch = useRef(0);
  const refresh = useCallback(async () => {
    const request = ++epoch.current;
    setLoading(true);
    setError("");
    const results = await Promise.allSettled([
      apiClient.get(`${endpoint}/servers`),
      apiClient.get(`${endpoint}/workflows`),
    ]);
    if (request !== epoch.current) return;
    if (results[0].status === "fulfilled")
      setServers(results[0].value.servers || []);
    if (results[1].status === "fulfilled")
      setWorkflows(results[1].value.workflows || []);
    const failed = results.find((result) => result.status === "rejected");
    if (failed) setError(failed.reason.message);
    setLoading(false);
  }, [endpoint]);
  useEffect(() => {
    refresh();
    return () => {
      epoch.current += 1;
    };
  }, [refresh]);
  const openWorkflow = async (record, mode) => {
    setBusyId(record.id);
    setError("");
    try {
      const result = await apiClient.get(
        `${endpoint}/workflows/${encodeURIComponent(record.id)}`,
      );
      if (mode === "run") setRun(result.workflow || result);
      else setWorkflowEditor({ record: result.workflow || result });
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusyId("");
    }
  };
  const test = async (server) => {
    setBusyId(server.id);
    setError("");
    try {
      const result = await apiClient.post(
        `${endpoint}/servers/${encodeURIComponent(server.id)}/test`,
      );
      setTestResults((current) => ({
        ...current,
        [server.id]: { ok: true, message: result.message || "连接成功" },
      }));
    } catch (cause) {
      setTestResults((current) => ({
        ...current,
        [server.id]: { ok: false, message: cause.message },
      }));
    } finally {
      setBusyId("");
    }
  };
  const remove = async () => {
    if (!deletion || busyId) return;
    setBusyId(deletion.record.id);
    setError("");
    try {
      await apiClient.delete(
        `${endpoint}/${deletion.kind}/${encodeURIComponent(deletion.record.id)}?revision=${encodeURIComponent(deletion.record.revision)}`,
      );
      setDeletion(null);
      await refresh();
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusyId("");
    }
  };
  return (
    <div className="comfy-settings space-y-5">
      <div>
        <h2 className="text-lg font-semibold">ComfyUI</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          连接图片与视频工作流，配置参数后供 AI 调用或手动运行。
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="comfy-tabs">
          <Button
            size="sm"
            variant={tab === "workflows" ? "secondary" : "ghost"}
            onClick={() => setTab("workflows")}
          >
            <Workflow className="size-4" />
            工作流模板
          </Button>
          <Button
            size="sm"
            variant={tab === "servers" ? "secondary" : "ghost"}
            onClick={() => setTab("servers")}
          >
            <Server className="size-4" />
            连接
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="刷新 ComfyUI 配置"
            disabled={loading}
            onClick={refresh}
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            size="sm"
            onClick={() =>
              tab === "servers"
                ? setServerEditor({ record: null })
                : setWorkflowEditor({ record: null })
            }
          >
            <Plus className="size-4" />
            {tab === "servers" ? "添加连接" : "导入工作流"}
          </Button>
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {loading && !servers.length && !workflows.length ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          正在加载
        </div>
      ) : (
        <div className="space-y-3">
          {tab === "servers" ? (
            servers.length ? (
              servers.map((server) => (
                <div key={server.id} className="comfy-record">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium break-all">
                        {server.title || server.name}
                      </h3>
                      <Badge variant={server.enabled ? "secondary" : "outline"}>
                        {server.enabled ? "已启用" : "已停用"}
                      </Badge>
                    </div>
                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      {server.name} · {server.baseUrl}
                    </p>
                    {testResults[server.id] && (
                      <p
                        className={`mt-2 text-xs ${testResults[server.id].ok ? "text-emerald-600" : "text-destructive"}`}
                      >
                        {testResults[server.id].message}
                      </p>
                    )}
                  </div>
                  <div className="comfy-record-actions">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`测试 ${server.title || server.name}`}
                      disabled={Boolean(busyId)}
                      onClick={() => test(server)}
                    >
                      {busyId === server.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Zap className="size-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`编辑 ${server.title || server.name}`}
                      disabled={Boolean(busyId)}
                      onClick={() => setServerEditor({ record: server })}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`删除 ${server.title || server.name}`}
                      disabled={Boolean(busyId)}
                      onClick={() =>
                        setDeletion({ kind: "servers", record: server })
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
                添加第一个 ComfyUI 连接，例如本地 http://127.0.0.1:8188。
              </div>
            )
          ) : workflows.length ? (
            workflows.map((workflow) => (
              <div key={workflow.id} className="comfy-record">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium break-all">
                    {workflow.title || workflow.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground break-all">
                    {workflow.name} ·{" "}
                    {logicalInputs(workflow.bindings).length ||
                      Object.keys(workflow.inputSchema?.properties || {})
                        .length}{" "}
                    个参数 · {workflow.outputBindings?.length || 0} 个输出
                  </p>
                  {workflow.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {workflow.description}
                    </p>
                  )}
                </div>
                <div className="comfy-record-actions">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={Boolean(busyId)}
                    onClick={() => openWorkflow(workflow, "run")}
                  >
                    <Play className="size-3.5" />
                    运行
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`配置 ${workflow.title || workflow.name}`}
                    disabled={Boolean(busyId)}
                    onClick={() => openWorkflow(workflow, "edit")}
                  >
                    {busyId === workflow.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Pencil className="size-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`删除 ${workflow.title || workflow.name}`}
                    disabled={Boolean(busyId)}
                    onClick={() =>
                      setDeletion({ kind: "workflows", record: workflow })
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed px-6 py-10 text-center space-y-3">
              <Workflow className="mx-auto size-8 text-muted-foreground" />
              <h3 className="text-sm font-medium">导入你的第一个工作流</h3>
              <p className="text-sm text-muted-foreground">
                选择 API 或普通画布 JSON，在可视化流程图中配置输入和输出。
              </p>
              <Button
                variant="outline"
                onClick={() => setWorkflowEditor({ record: null })}
              >
                导入工作流 JSON
              </Button>
            </div>
          )}
        </div>
      )}
      {serverEditor && (
        <ServerEditor
          record={serverEditor.record}
          endpoint={endpoint}
          onClose={() => setServerEditor(null)}
          onSaved={refresh}
        />
      )}
      {workflowEditor && (
        <WorkflowEditor
          record={workflowEditor.record}
          endpoint={endpoint}
          servers={servers}
          onClose={() => setWorkflowEditor(null)}
          onSaved={refresh}
        />
      )}
      {run && (
        <ComfyRunDialog
          workflow={run}
          servers={servers}
          endpoint={endpoint}
          onClose={() => setRun(null)}
          onTask={onTask}
        />
      )}
      <AlertDialog
        open={Boolean(deletion)}
        onOpenChange={(open) => {
          if (!open && !busyId) setDeletion(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              删除{deletion?.kind === "servers" ? "连接" : "工作流模板"}？
            </AlertDialogTitle>
            <AlertDialogDescription>
              将删除“{deletion?.record.title || deletion?.record.name}
              ”的配置。已提交任务保留运行快照。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(busyId)}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={Boolean(busyId)}
              onClick={(event) => {
                event.preventDefault();
                remove();
              }}
            >
              {busyId && <Loader2 className="size-4 animate-spin" />}删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
