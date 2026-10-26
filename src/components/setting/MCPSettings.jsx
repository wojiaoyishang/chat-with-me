import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ExternalLink,
  Loader2,
  Pencil,
  Plug,
  Plus,
  RefreshCw,
  Settings2,
  Trash2,
} from "lucide-react";
import apiClient from "@/lib/apiClient.js";
import { onEvent } from "@/context/useEventStore.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useConfirmation } from "@/components/ui/useConfirmation.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  policyFor,
  serverDraft,
  serverPayload,
  TERMINAL_PROBE_STATES,
  updateToolPolicy,
} from "@/features/mcp/settingsModel.js";

const areaClass =
  "min-h-24 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";
const statusLabel = {
  untested: "尚未检测",
  online: "连接正常",
  offline: "连接失败",
};

function Field({ title, hint, children }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{title}</div>
      {children}
      {hint && (
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function SecretPairs({ title, rows, onChange }) {
  return (
    <Field
      title={title}
      hint="已保存的值不会回显；留空保留原值，删除这一行会移除该项。"
    >
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              aria-label={`${title}名称 ${index + 1}`}
              placeholder="名称"
              value={row.key}
              onChange={(event) =>
                onChange(
                  rows.map((item, i) =>
                    i === index ? { ...item, key: event.target.value } : item,
                  ),
                )
              }
            />
            <Input
              aria-label={`${title}值 ${index + 1}`}
              type="password"
              autoComplete="new-password"
              placeholder="输入新值或留空保留"
              value={row.value}
              onChange={(event) =>
                onChange(
                  rows.map((item, i) =>
                    i === index ? { ...item, value: event.target.value } : item,
                  ),
                )
              }
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label={`删除${title} ${index + 1}`}
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...rows, { key: "", value: "" }])}
      >
        <Plus className="size-4" />
        添加
      </Button>
    </Field>
  );
}

function ServerEditor({ record, endpoint, onClose, onSaved }) {
  const [values, setValues] = useState(() => serverDraft(record));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));
  const save = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const payload = serverPayload(values, record);
      if (record)
        await apiClient.patch(
          `${endpoint}/servers/${encodeURIComponent(record.id)}`,
          payload,
        );
      else await apiClient.post(`${endpoint}/servers`, payload);
      await onSaved();
      onClose();
    } catch (cause) {
      setError(cause.message);
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
      <DialogContent className="!flex max-h-[88dvh] flex-col gap-0 overflow-hidden !p-0 sm:!max-w-[720px]">
        <DialogHeader className="shrink-0 border-b p-6">
          <DialogTitle>
            {record ? "编辑 MCP 服务" : "添加 MCP 服务"}
          </DialogTitle>
          <DialogDescription>
            由管理员统一配置，工具权限可在用户管理和默认工具中设置。
          </DialogDescription>
        </DialogHeader>
        <form className="flex min-h-0 flex-1 flex-col" onSubmit={save}>
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6 pretty-scrollbar">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                title="工具集标识"
                hint="用于 AI 调用与授权，创建后不能修改。"
              >
                <Input
                  aria-label="工具集标识"
                  disabled={Boolean(record)}
                  value={values.slug}
                  placeholder="例如 robot"
                  onChange={(e) => set("slug", e.target.value)}
                />
              </Field>
              <Field title="服务名称">
                <Input
                  aria-label="服务名称"
                  value={values.title}
                  placeholder="例如机器人控制"
                  onChange={(e) => set("title", e.target.value)}
                />
              </Field>
            </div>
            <Field title="用途说明" hint="AI 获取工具集时可看到这段说明。">
              <textarea
                aria-label="用途说明"
                className={areaClass}
                value={values.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="说明用途、适用场景和使用方法"
              />
            </Field>
            <div className="flex items-center justify-between gap-4">
              <Field title="连接方式">
                <Select
                  value={values.transport}
                  onValueChange={(value) => set("transport", value)}
                >
                  <SelectTrigger className="min-w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">远程 HTTP</SelectItem>
                    <SelectItem value="sse">远程 SSE</SelectItem>
                    <SelectItem value="stdio">本地命令（stdio）</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <label className="flex items-center gap-3 text-sm">
                启用服务
                <Switch
                  checked={values.enabled}
                  onCheckedChange={(value) => set("enabled", value)}
                />
              </label>
            </div>
            {values.transport === "stdio" ? (
              <>
                <div className="rounded-xl border bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
                  命令在 Worker 所在机器执行。多个 Worker
                  需要安装相同程序，并能访问配置的工作目录。测试连接也会在
                  Worker 中运行。
                </div>
                <Field title="可执行命令">
                  <Input
                    aria-label="可执行命令"
                    value={values.command}
                    placeholder="python、node 或可执行文件绝对路径"
                    onChange={(e) => set("command", e.target.value)}
                  />
                </Field>
                <Field
                  title="命令参数"
                  hint={'使用 JSON 数组，例如 ["D:/tools/server.py"]。'}
                >
                  <textarea
                    aria-label="命令参数"
                    className={`${areaClass} font-mono`}
                    value={values.args}
                    onChange={(e) => set("args", e.target.value)}
                  />
                </Field>
                <Field title="工作目录（可选）">
                  <Input
                    aria-label="工作目录"
                    value={values.cwd}
                    placeholder="Worker 上的绝对路径"
                    onChange={(e) => set("cwd", e.target.value)}
                  />
                </Field>
                <SecretPairs
                  title="环境变量"
                  rows={values.env}
                  onChange={(value) => set("env", value)}
                />
              </>
            ) : (
              <>
                <Field title="服务地址">
                  <Input
                    aria-label="服务地址"
                    value={values.url}
                    placeholder="http://127.0.0.1:9023/mcp"
                    onChange={(e) => set("url", e.target.value)}
                  />
                </Field>
                <SecretPairs
                  title="请求头"
                  rows={values.headers}
                  onChange={(value) => set("headers", value)}
                />
              </>
            )}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["connectTimeout", "连接超时（秒）", 300],
                ["callTimeout", "调用超时（秒）", 7200],
                ["maxConcurrency", "每 Worker 并发上限", 64],
              ].map(([key, title, max]) => (
                <Field key={key} title={title}>
                  <Input
                    aria-label={title}
                    type="number"
                    min={1}
                    max={max}
                    value={values[key]}
                    onChange={(e) => set(key, Number(e.target.value))}
                  />
                </Field>
              ))}
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <DialogFooter className="shrink-0 border-t px-6 py-4">
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={onClose}
            >
              取消
            </Button>
            <Button type="submit" disabled={busy}>
              {busy && <Loader2 className="size-4 animate-spin" />}保存服务
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ToolPolicies({ server, endpoint, onClose, onSaved }) {
  const [defaults, setDefaults] = useState(() => ({ ...server.defaults }));
  const [policies, setPolicies] = useState(() =>
    structuredClone(server.toolPolicies || {}),
  );
  const [advanced, setAdvanced] = useState(null);
  const [advancedText, setAdvancedText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (name, key, value) =>
    setPolicies((current) => updateToolPolicy(current, name, key, value));
  const save = async () => {
    setBusy(true);
    setError("");
    try {
      await apiClient.patch(
        `${endpoint}/servers/${encodeURIComponent(server.id)}`,
        { revision: server.revision, defaults, toolPolicies: policies },
      );
      await onSaved();
      onClose();
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusy(false);
    }
  };
  const applyAdvanced = () => {
    try {
      const parsed = JSON.parse(advancedText);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
        throw new Error("策略必须是 JSON 对象。");
      if (advanced.kind === "defaults") setDefaults(parsed);
      else setPolicies((current) => ({ ...current, [advanced.name]: parsed }));
      setAdvanced(null);
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
  };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <DialogContent className="!flex max-h-[88dvh] flex-col gap-0 overflow-hidden !p-0 sm:!max-w-[900px]">
        <DialogHeader className="shrink-0 border-b p-6">
          <DialogTitle>{server.title} · 工具策略</DialogTitle>
          <DialogDescription>
            这里设置服务默认行为。用户能否获得工具仍由“用户管理”的工具分配决定。
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6 pretty-scrollbar">
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-medium">服务默认策略</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setAdvanced({ kind: "defaults" });
                  setAdvancedText(JSON.stringify(defaults, null, 2));
                }}
              >
                高级配置
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <label className="flex items-center gap-2 text-sm">
                调用审批
                <select
                  aria-label="默认调用审批"
                  className="rounded-md border bg-background px-2 py-1"
                  value={defaults.default || "ask"}
                  onChange={(e) =>
                    setDefaults((current) => ({
                      ...current,
                      default: e.target.value,
                    }))
                  }
                >
                  <option value="ask">询问</option>
                  <option value="allow">允许</option>
                  <option value="deny">拒绝</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={Boolean(defaults.locked)}
                  onCheckedChange={(value) =>
                    setDefaults((current) => ({ ...current, locked: value }))
                  }
                />
                锁定审批策略
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch
                  checked={Boolean(defaults.directExposure)}
                  onCheckedChange={(value) =>
                    setDefaults((current) => ({
                      ...current,
                      directExposure: value,
                    }))
                  }
                />
                直接暴露工具
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              锁定后用户不能改变默认审批方式。高级配置支持 execution、delivery
              和 providerAlias。
            </p>
          </div>
          {!server.tools.length && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              先刷新并发布工具清单，即可设置每个工具。
            </p>
          )}
          {server.tools.map((tool) => {
            const effective = policyFor(
              { ...server, defaults },
              tool.name,
              policies,
            );
            return (
              <div key={tool.name} className="space-y-3 rounded-xl border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="break-words font-medium">
                      {tool.title || tool.name}
                    </div>
                    <code className="break-all text-xs text-muted-foreground">
                      {server.slug}.{tool.name}
                    </code>
                  </div>
                  <label className="flex shrink-0 items-center gap-2 text-sm">
                    启用
                    <Switch
                      aria-label={`启用 ${tool.name}`}
                      checked={effective.enabled}
                      onCheckedChange={(value) =>
                        set(tool.name, "enabled", value)
                      }
                    />
                  </label>
                </div>
                {tool.description && (
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                  <select
                    aria-label={`${tool.name} 调用审批`}
                    className="rounded-md border bg-background px-2 py-1 text-sm"
                    value={policies[tool.name]?.default || "inherit"}
                    onChange={(e) =>
                      set(
                        tool.name,
                        "default",
                        e.target.value === "inherit"
                          ? undefined
                          : e.target.value,
                      )
                    }
                  >
                    <option value="inherit">继承服务审批</option>
                    <option value="ask">询问</option>
                    <option value="allow">允许</option>
                    <option value="deny">拒绝</option>
                  </select>
                  <select
                    aria-label={`${tool.name} 工具暴露`}
                    className="rounded-md border bg-background px-2 py-1 text-sm"
                    value={
                      policies[tool.name]?.directExposure === undefined
                        ? "inherit"
                        : String(policies[tool.name].directExposure)
                    }
                    onChange={(e) =>
                      set(
                        tool.name,
                        "directExposure",
                        e.target.value === "inherit"
                          ? undefined
                          : e.target.value === "true",
                      )
                    }
                  >
                    <option value="inherit">继承工具暴露</option>
                    <option value="true">直接暴露</option>
                    <option value="false">按需发现</option>
                  </select>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setAdvanced({ kind: "tool", name: tool.name });
                      setAdvancedText(
                        JSON.stringify(policies[tool.name] || {}, null, 2),
                      );
                    }}
                  >
                    高级配置
                  </Button>
                  <details className="w-full text-xs text-muted-foreground">
                    <summary className="cursor-pointer">
                      查看输入 Schema
                    </summary>
                    <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-3">
                      {JSON.stringify(tool.inputSchema, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            );
          })}
          {advanced !== null && (
            <div className="space-y-3 rounded-xl border border-primary/30 bg-muted/30 p-4">
              <div className="text-sm font-medium">
                {advanced.kind === "defaults" ? "服务默认策略" : advanced.name}{" "}
                · JSON
              </div>
              <textarea
                aria-label="高级策略 JSON"
                className={`${areaClass} min-h-48 font-mono`}
                value={advancedText}
                onChange={(e) => setAdvancedText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                支持
                enabled、default、locked、directExposure、providerAlias、execution
                和 delivery。远端 Schema 的提示不会自动改变权限。
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={applyAdvanced}>
                  应用到表单
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAdvanced(null)}
                >
                  取消
                </Button>
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="shrink-0 border-t px-6 py-4">
          <Button variant="outline" disabled={busy} onClick={onClose}>
            取消
          </Button>
          <Button disabled={busy || advanced !== null} onClick={save}>
            {busy && <Loader2 className="size-4 animate-spin" />}保存策略
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MCPSettings({ config, onTask }) {
  const endpoint = config?.endpoint || "/mcp";
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState(undefined);
  const [policies, setPolicies] = useState(null);
  const [pending, setPending] = useState({});
  const [confirm, confirmation] = useConfirmation();
  const mounted = useRef(false);
  const loadEpoch = useRef(0);
  const pollTimers = useRef(new Set());
  const busyIds = useRef(new Set());
  const load = useCallback(async () => {
    const epoch = ++loadEpoch.current;
    const data = await apiClient.get(`${endpoint}/servers`);
    if (mounted.current && epoch === loadEpoch.current) setServers(data.servers || []);
  }, [endpoint]);
  useEffect(() => {
    mounted.current = true;
    load()
      .catch((cause) => {
        if (mounted.current) setError(cause.message);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
    const timers = pollTimers.current;
    const subscription = onEvent({ event: "tool.catalog.changed" }).then(() =>
      load().catch(() => {}),
    );
    return () => {
      mounted.current = false;
      subscription();
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    };
  }, [load]);
  const perform = async (id, callback) => {
    if (busyIds.current.has(id)) return;
    busyIds.current.add(id);
    setError("");
    setPending((current) => ({ ...current, [id]: { message: "正在提交…" } }));
    try {
      await callback();
    } catch (cause) {
      if (mounted.current) setError(cause.message);
    } finally {
      busyIds.current.delete(id);
      if (mounted.current)
        setPending((current) => {
          const next = { ...current };
          if (!next[id]?.taskId) delete next[id];
          return next;
        });
    }
  };
  const poll = (id, taskId) => {
    const timer = setTimeout(async () => {
      pollTimers.current.delete(timer);
      if (!mounted.current) return;
      try {
        const task = await apiClient.get(
          `/tasks/${encodeURIComponent(taskId)}`,
        );
        if (!mounted.current) return;
        if (TERMINAL_PROBE_STATES.has(task.status)) {
          setPending((current) => {
            const next = { ...current };
            delete next[id];
            return next;
          });
          if (task.status !== "completed")
            setError(
              task.error?.message ||
                (typeof task.error === "string" ? task.error : "") ||
                task.progressMessage ||
                "检测未完成，可前往任务详情查看原因。",
            );
          await load();
        } else {
          setPending((current) => ({
            ...current,
            [id]: {
              taskId,
              message: task.progressMessage || "正在等待 Worker 检测…",
            },
          }));
          poll(id, taskId);
        }
      } catch (cause) {
        if (mounted.current) {
          setPending((current) => ({
            ...current,
            [id]: {
              taskId,
              message: "进度连接中断，正在重新获取；也可前往任务详情查看。",
            },
          }));
          setError(cause.message);
          poll(id, taskId);
        }
      }
    }, 1500);
    pollTimers.current.add(timer);
  };
  const probe = (server, operation) =>
    perform(server.id, async () => {
      const task = await apiClient.post(
        `${endpoint}/servers/${encodeURIComponent(server.id)}/probe`,
        { revision: server.revision, operation },
      );
      if (!task.taskId) throw new Error("后台未返回任务标识。");
      if (mounted.current)
        setPending((current) => ({
          ...current,
          [server.id]: { taskId: task.taskId, message: "已提交，等待 Worker…" },
        }));
      poll(server.id, task.taskId);
    });
  const remove = async (server) => {
    if (
      !(await confirm({
        title: `删除 ${server.title}？`,
        description:
          "删除后将停止后续工具调用。重新创建服务不会自动恢复旧服务的连接。",
        confirmText: "删除服务",
      }))
    )
      return;
    await perform(server.id, async () => {
      await apiClient.delete(
        `${endpoint}/servers/${encodeURIComponent(server.id)}`,
        { params: { revision: server.revision } },
      );
      await load();
    });
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">MCP 服务</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            配置后刷新工具清单，确认发布即可供已授权的 AI 使用。
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="刷新服务列表"
            onClick={() => load().catch((cause) => setError(cause.message))}
          >
            <RefreshCw className="size-4" />
          </Button>
          <Button onClick={() => setEditor(null)}>
            <Plus className="size-4" />
            添加服务
          </Button>
        </div>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          正在加载服务…
        </div>
      ) : !servers.length ? (
        <div className="rounded-2xl border border-dashed p-10 text-center">
          <Plug className="mx-auto mb-3 size-8 text-muted-foreground" />
          <p className="font-medium">还没有配置 MCP 服务</p>
          <p className="mt-2 text-sm text-muted-foreground">
            支持远程 HTTP、SSE 和 Worker 本地命令。
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setEditor(null)}
          >
            添加第一个服务
          </Button>
        </div>
      ) : (
        servers.map((server) => (
          <section
            key={server.id}
            className="space-y-4 rounded-2xl border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Plug className="size-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="break-words font-semibold">
                      {server.title}
                    </h4>
                    <Badge variant="secondary">
                      {server.transport === "stdio"
                        ? "本地命令"
                        : server.transport.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {server.enabled
                        ? statusLabel[server.status] || "尚未检测"
                        : "已停用"}
                    </Badge>
                  </div>
                  <div className="break-all text-xs text-muted-foreground">
                    {server.slug} · {server.tools.length} 个工具
                  </div>
                </div>
              </div>
              <Switch
                aria-label={`启用服务 ${server.title}`}
                checked={server.enabled}
                disabled={Boolean(pending[server.id])}
                onCheckedChange={(enabled) =>
                  perform(server.id, async () => {
                    await apiClient.patch(
                      `${endpoint}/servers/${encodeURIComponent(server.id)}`,
                      { revision: server.revision, enabled },
                    );
                    await load();
                  })
                }
              />
            </div>
            {server.description && (
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                {server.description}
              </p>
            )}
            {server.needsPublish && (
              <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
                {server.tools.length
                  ? "连接已变更，请重新刷新并发布工具。"
                  : "尚未发布工具，请先刷新工具清单。"}
              </p>
            )}
            {pending[server.id] && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm">
                <Loader2 className="size-4 animate-spin" />
                <span>{pending[server.id].message}</span>
                {pending[server.id].taskId && (
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => onTask?.(pending[server.id].taskId)}
                  >
                    查看任务
                    <ExternalLink className="size-3" />
                  </Button>
                )}
              </div>
            )}
            {server.candidateId && (
              <div className="space-y-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-medium">
                    发现 {server.candidateTools?.length || 0} 个工具 · 等待确认
                  </div>
                  <Button
                    size="sm"
                    disabled={Boolean(pending[server.id])}
                    onClick={() =>
                      perform(server.id, async () => {
                        await apiClient.post(
                          `${endpoint}/servers/${encodeURIComponent(server.id)}/publish`,
                          {
                            revision: server.revision,
                            candidateId: server.candidateId,
                          },
                        );
                        await load();
                      })
                    }
                  >
                    <Check className="size-4" />
                    确认发布
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>新增 {server.diff?.added.length || 0}</span>
                  <span>变更 {server.diff?.changed.length || 0}</span>
                  <span>移除 {server.diff?.removed.length || 0}</span>
                </div>
                <details>
                  <summary className="flex cursor-pointer items-center gap-1 text-xs text-muted-foreground">
                    <ChevronDown className="size-3" />
                    查看工具变更
                  </summary>
                  <div className="mt-3 max-h-48 space-y-2 overflow-auto text-xs">
                    {[
                      ["added", "新增"],
                      ["changed", "变更"],
                      ["removed", "移除"],
                    ].map(([key, label]) =>
                      server.diff?.[key]?.map((name) => (
                        <div key={`${key}:${name}`} className="break-all">
                          <span className="mr-2 text-muted-foreground">
                            {label}
                          </span>
                          {name}
                        </div>
                      )),
                    )}
                    {server.candidateTools?.map((tool) => (
                      <details key={tool.name}>
                        <summary className="cursor-pointer break-all">
                          {tool.title || tool.name}
                        </summary>
                        <pre className="mt-2 overflow-auto whitespace-pre-wrap break-all rounded bg-background p-3">
                          {JSON.stringify(tool, null, 2)}
                        </pre>
                      </details>
                    ))}
                  </div>
                </details>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 border-t pt-4">
              <Button
                size="sm"
                variant="outline"
                disabled={Boolean(pending[server.id])}
                onClick={() => probe(server, "test")}
              >
                测试连接
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={Boolean(pending[server.id])}
                onClick={() => probe(server, "discover")}
              >
                <RefreshCw className="size-4" />
                刷新工具
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPolicies(server)}
              >
                <Settings2 className="size-4" />
                工具策略
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditor(server)}
              >
                <Pencil className="size-4" />
                编辑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto text-muted-foreground hover:text-destructive"
                disabled={Boolean(pending[server.id])}
                onClick={() => remove(server)}
              >
                <Trash2 className="size-4" />
                删除
              </Button>
            </div>
          </section>
        ))
      )}
      {editor !== undefined && (
        <ServerEditor
          record={editor}
          endpoint={endpoint}
          onClose={() => setEditor(undefined)}
          onSaved={load}
        />
      )}
      {policies && (
        <ToolPolicies
          server={policies}
          endpoint={endpoint}
          onClose={() => setPolicies(null)}
          onSaved={load}
        />
      )}
      {confirmation}
    </div>
  );
}
