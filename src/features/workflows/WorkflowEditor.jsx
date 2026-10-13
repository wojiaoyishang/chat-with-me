import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlowProvider,
  Background,
  Controls,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import {
  Check,
  Copy,
  GitBranch,
  Loader2,
  Maximize2,
  Play,
  Plus,
  Redo2,
  Save,
  Search,
  Settings2,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import apiClient from "@/lib/apiClient.js";
import { workflowApi } from "./workflowApi.js";
import {
  bindWorkflowInput,
  catalogNode,
  clone,
  connectWorkflow,
  copyWorkflowSelection,
  createWorkflowNode,
  initializeGraph,
  isWorkflowTextEditing,
  normalizeGraph,
  pasteWorkflowSelection,
  removeWorkflowNodes,
  setWorkflowPortMode,
  sourceValueConfig,
  updateWorkflowNodePositions,
} from "./workflowModel.js";
import WorkflowSettingsFields from "./WorkflowSettingsFields.jsx";
import WorkflowCanvas from "./WorkflowCanvas.jsx";
import WorkflowContextMenu from "./WorkflowContextMenu.jsx";
import WorkflowNode from "./WorkflowNode.jsx";
import WorkflowNodePanel from "./WorkflowNodePanel.jsx";
import WorkflowMonitorPanel from "./WorkflowMonitorPanel.jsx";
import useWorkflowTask from "./useWorkflowTask.js";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import "@xyflow/react/dist/style.css";
import "./workflow.css";

const nodeTypes = { workflow: WorkflowNode };
let applicationClipboard = null;
const newDraft = () => ({
  graph: normalizeGraph(),
  title: "工作流",
  description: "",
  templateSharing: [],
  permissions: {},
});
const snapshot = (draft) => JSON.stringify(draft);

export default function WorkflowEditor(props) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorWorkspace {...props} />
    </ReactFlowProvider>
  );
}

function WorkflowEditorWorkspace({ request = {}, onClose, onChanged }) {
  const flow = useReactFlow();
  const [draft, setDraft] = useState(newDraft);
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const { graph, title, description, templateSharing, permissions } = draft;
  const [baseline, setBaseline] = useState(snapshot(draft));
  const dirty = snapshot(draft) !== baseline;
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [catalog, setCatalog] = useState({ nodes: [] });
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [builtinTemplateId, setBuiltinTemplateId] = useState("");
  const [models, setModels] = useState([]);
  const [viewMode, setViewMode] = useState(
    request.mode === "monitor" || request.taskId
      ? "monitor"
      : "template-editor",
  );
  const readOnly = viewMode === "monitor";
  const [initialTask, setInitialTask] = useState(null);
  const { task, error: refreshError } = useWorkflowTask(initialTask);
  const [selected, setSelected] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectionRequest, setSelectionRequest] = useState({ ids: [] });
  const [fitRequest, setFitRequest] = useState(0);
  const [panel, setPanel] = useState("node");
  const [mobilePane, setMobilePane] = useState("canvas");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(null);
  const [hasClipboard, setHasClipboard] = useState(
    Boolean(applicationClipboard?.nodes?.length),
  );
  const [confirmation, setConfirmation] = useState(null);
  const [invalid, setInvalid] = useState({});
  const history = useRef({ past: [], future: [] });
  const alive = useRef(true);
  const dialogRef = useRef(null);
  const pointer = useRef(null);
  const validity = useCallback(
    (key, valid) =>
      setInvalid((current) =>
        current[key] === !valid ? current : { ...current, [key]: !valid },
      ),
    [],
  );
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const installDraft = useCallback((next) => {
    draftRef.current = next;
    setDraft(next);
    setBaseline(snapshot(next));
    history.current = { past: [], future: [] };
    setInvalid({});
    setSelected(next.graph.nodes[0]?.id || "");
    setSelectedIds([]);
    setSelectedEdges([]);
    setSelectionRequest({
      ids: next.graph.nodes[0] ? [next.graph.nodes[0].id] : [],
    });
    setFitRequest((current) => current + 1);
    setMenu(null);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    Promise.all([
      workflowApi.catalog(controller.signal),
      workflowApi.templates(controller.signal),
      request.taskId
        ? workflowApi.task(request.taskId, controller.signal)
        : request.templateId && !request.templateId.startsWith("built-in:")
          ? workflowApi.template(request.templateId, controller.signal)
          : Promise.resolve(null),
    ])
      .then(([definitions, saved, detail]) => {
        if (controller.signal.aborted) return;
        setCatalog(definitions);
        setTemplates(saved.templates || []);
        const loadedTemplate = detail?.template;
        const builtinTemplate = (definitions.builtinTemplates || []).find(
          (item) => item.id === request.templateId,
        );
        const loadedTask = request.taskId ? detail?.task || detail : null;
        installDraft({
          graph: initializeGraph(
            loadedTask?.parameters?.graph ||
              builtinTemplate?.graph ||
              loadedTemplate?.graph ||
              definitions.defaultGraph ||
              definitions.standardGraph,
            definitions.nodes,
            definitions.settingsDefaults,
          ),
          title:
            loadedTask?.title ||
            builtinTemplate?.title ||
            loadedTemplate?.title ||
            definitions.defaultTitle ||
            "工作流",
          description:
            builtinTemplate?.description || loadedTemplate?.description || "",
          templateSharing: loadedTemplate?.sharingMembers || [],
          permissions:
            loadedTask?.parameters?.permissions ||
            definitions.permissionsDefaults ||
            {},
        });
        setTemplate(loadedTemplate || null);
        setBuiltinTemplateId(builtinTemplate?.id || "");
        setInitialTask(loadedTask);
        setViewMode(
          loadedTask || request.mode === "monitor"
            ? "monitor"
            : "template-editor",
        );
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    apiClient
      .get("/chat/models", { signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted)
          setModels(Array.isArray(result) ? result : result.models || []);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [request.templateId, request.taskId, request.mode, reload, installDraft]);

  const changeDraft = useCallback((update) => {
    const current = draftRef.current;
    const next = typeof update === "function" ? update(current) : update;
    if (next === current || snapshot(next) === snapshot(current)) return;
    history.current.past.push(clone(current));
    if (history.current.past.length > 100) history.current.past.shift();
    history.current.future = [];
    draftRef.current = next;
    setDraft(next);
    setNotice("");
  }, []);
  const changeGraph = useCallback(
    (update) =>
      changeDraft((current) => {
        const next =
          typeof update === "function" ? update(current.graph) : update;
        return next === current.graph ? current : { ...current, graph: next };
      }),
    [changeDraft],
  );
  const commitPositions = useCallback(
    (moved) => {
      if (!readOnly)
        changeGraph((current) => updateWorkflowNodePositions(current, moved));
    },
    [changeGraph, readOnly],
  );
  const undo = useCallback(() => {
    const previous = history.current.past.pop();
    if (previous) {
      history.current.future.push(clone(draftRef.current));
      draftRef.current = previous;
      setDraft(previous);
      setNotice("");
    }
  }, []);
  const redo = useCallback(() => {
    const next = history.current.future.pop();
    if (next) {
      history.current.past.push(clone(draftRef.current));
      draftRef.current = next;
      setDraft(next);
      setNotice("");
    }
  }, []);
  const select = useCallback((ids) => {
    setSelected(ids[0] || "");
    setSelectedIds(ids);
    setSelectedEdges([]);
    setSelectionRequest({ ids });
  }, []);
  const selectionChanged = useCallback(
    ({ nodes: chosen, edges: connected }) => {
      const ids = chosen.map((node) => node.id),
        edges = connected.map((edge) => edge.id);
      setSelectedIds((current) =>
        current.join("|") === ids.join("|") ? current : ids,
      );
      setSelectedEdges((current) =>
        current.join("|") === edges.join("|") ? current : edges,
      );
      if (ids.length === 1) setSelected(ids[0]);
      else if (!ids.length) setSelected("");
    },
    [],
  );
  const runtimeNodes = useMemo(
    () =>
      task?.workflowNodes ||
      task?.runtime?.checkpoint?.data?.workflowNodes ||
      task?.runtime?.checkpoint?.workflowNodes ||
      task?.result?.workflowNodes ||
      {},
    [task],
  );
  const runtimeStages = useMemo(() => {
    const stages = task?.stages || task?.runtime?.stages || {};
    return Array.isArray(stages) ? stages : Object.values(stages);
  }, [task]);
  const openMenu = useCallback((event, details) => {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY, ...details });
  }, []);
  const closeMenu = useCallback(() => {
    setMenu(null);
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (
        active === document.body ||
        active?.hasAttribute("data-radix-focus-guard")
      )
        dialogRef.current?.querySelector(".workflow-canvas")?.focus();
    });
  }, []);
  const onValue = useCallback(
    (id, value) =>
      changeGraph((current) => ({
        ...current,
        nodes: current.nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                config: sourceValueConfig(
                  catalogNode(catalog.nodes, node),
                  value,
                  node.config,
                ),
              }
            : node,
        ),
      })),
    [changeGraph, catalog.nodes],
  );
  const onBinding = useCallback(
    (id, port, binding) =>
      changeGraph((current) => bindWorkflowInput(current, id, port, binding)),
    [changeGraph],
  );
  const onBusy = useCallback(
    (id, busy) => validity(`upload:${id}`, !busy),
    [validity],
  );
  const onPortMenu = useCallback(
    (event, nodeId, port) => openMenu(event, { nodeId, port }),
    [openMenu],
  );
  const nodes = useMemo(
    () =>
      graph.nodes.map((node) => ({
        id: node.id,
        type: "workflow",
        position: node.position || { x: 0, y: 0 },
        data: {
          id: node.id,
          kind: node.kind,
          node,
          definition: catalogNode(catalog.nodes, node),
          status:
            runtimeNodes[node.id]?.status ||
            runtimeStages.find((stage) => stage.key === node.id)?.status,
          runtime: runtimeNodes[node.id] || {},
          readOnly: readOnly || Boolean(busy),
          onValue,
          onBinding,
          onBusy,
          onPortMenu,
        },
      })),
    [
      graph.nodes,
      catalog.nodes,
      runtimeNodes,
      runtimeStages,
      readOnly,
      busy,
      onValue,
      onBinding,
      onBusy,
      onPortMenu,
    ],
  );
  const edges = useMemo(
    () =>
      graph.edges.map((edge) => ({
        ...edge,
        sourceHandle: edge.sourcePort,
        targetHandle: edge.targetPort,
        type: "default",
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
        selected: selectedEdges.includes(edge.id),
        animated: !readOnly || runtimeNodes[edge.source]?.status === "running",
        className: `workflow-data-edge ${runtimeNodes[edge.source]?.status === "running" ? "is-active" : ""}`,
      })),
    [graph.edges, selectedEdges, readOnly, runtimeNodes],
  );

  const selectedNode = graph.nodes.find((node) => node.id === selected);
  const chosenIds = () =>
    menu?.nodeId && !selectedIds.includes(menu.nodeId)
      ? [menu.nodeId]
      : selectedIds.length
        ? selectedIds
        : selected
          ? [selected]
          : [];
  const copy = () => {
    applicationClipboard = copyWorkflowSelection(
      draftRef.current.graph,
      chosenIds(),
    );
    setHasClipboard(Boolean(applicationClipboard.nodes.length));
    setMenu(null);
  };
  const paste = (clipboard = applicationClipboard, location) => {
    const pasted = pasteWorkflowSelection(
      draftRef.current.graph,
      clipboard,
      location ||
        (menu
          ? flow.screenToFlowPosition({ x: menu.x, y: menu.y })
          : pointer.current
            ? flow.screenToFlowPosition(pointer.current)
            : undefined),
    );
    if (pasted.ids.length) {
      changeGraph(pasted.graph);
      select(pasted.ids);
    }
    setMenu(null);
  };
  const duplicate = () =>
    paste(
      copyWorkflowSelection(draftRef.current.graph, chosenIds()),
      undefined,
    );
  const deleteSelected = () => {
    const ids = menu?.edgeId ? [] : chosenIds();
    changeGraph((current) => ({
      ...removeWorkflowNodes(current, ids),
      edges: current.edges.filter(
        (edge) =>
          !ids.includes(edge.source) &&
          !ids.includes(edge.target) &&
          !(menu?.edgeId ? [menu.edgeId] : selectedEdges).includes(edge.id),
      ),
    }));
    select([]);
    setMenu(null);
  };
  const addNode = (definition, position) => {
    const current = draftRef.current.graph;
    const node = createWorkflowNode(definition, current, position);
    changeGraph({ ...current, nodes: [...current.nodes, node] });
    select([node.id]);
    setPanel("node");
    setMobilePane("canvas");
  };
  const rename = () => {
    if (menu?.nodeId) select([menu.nodeId]);
    setMenu(null);
    setPanel("node");
    setMobilePane("config");
    requestAnimationFrame(() =>
      dialogRef.current?.querySelector('[aria-label="节点名称"]')?.focus(),
    );
  };
  const close = () => {
    if (!busy)
      dirty && !readOnly ? setConfirmation({ kind: "close" }) : onClose();
  };
  const hasInvalid = () =>
    Object.entries(invalid).some(
      ([key, value]) =>
        value &&
        (["permissions", "template-sharing", "global"].includes(key) ||
          graph.nodes.some((node) => key.includes(`:${node.id}`))),
    );
  const action = async (kind, closeAfter = false) => {
    if (busy || readOnly) return false;
    setBusy(kind);
    setError("");
    setNotice("");
    try {
      if (hasInvalid())
        throw new Error("存在未完成或无效的配置，请先修正编辑器中的提示。");
      const current = draftRef.current;
      const result = await workflowApi.validate({
        graph: current.graph,
        runnable: kind === "run",
      });
      if (!alive.current) return false;
      if (kind === "validate")
        setNotice(
          `流程配置校验通过${result.inputFields?.length ? ` · ${result.inputFields.length} 个模板输入` : ""}。`,
        );
      else if (["save", "clone"].includes(kind)) {
        if (!current.title.trim()) throw new Error("请填写模板名称。");
        const id =
          kind === "save" && template?.canEdit !== false ? template?.id : null;
        const response = await workflowApi.saveTemplate(
          {
            title: current.title.trim(),
            description: current.description,
            graph: current.graph,
            ...(!id || template?.canManage !== false
              ? {
                  sharingMembers:
                    !id && template?.canManage === false
                      ? []
                      : current.templateSharing,
                }
              : {}),
            ...(id ? { revision: template.revision } : {}),
          },
          id,
        );
        if (!alive.current) return false;
        const saved = response.template;
        setTemplate(saved);
        setBuiltinTemplateId("");
        setTemplates((items) => [
          ...items.filter((item) => item.id !== saved.id),
          saved,
        ]);
        const next = {
          ...current,
          graph: initializeGraph(
            saved.graph || current.graph,
            catalog.nodes,
            catalog.settingsDefaults,
          ),
          templateSharing: saved.sharingMembers || current.templateSharing,
        };
        draftRef.current = next;
        setDraft(next);
        setBaseline(snapshot(next));
        setNotice(`已保存模板预设 · 第 ${saved.revision} 版`);
        onChanged?.({ templateId: saved.id });
        if (closeAfter) onClose();
      } else {
        const response = await workflowApi.run({
          graph: current.graph,
          title: current.title.trim(),
          permissions: current.permissions,
          ...(template && !dirty
            ? { templateId: template.id, templateRevision: template.revision }
            : {}),
        });
        if (!alive.current) return false;
        const running = response.task || response;
        if (running.parameters?.graph)
          installDraft({
            ...current,
            graph: initializeGraph(
              running.parameters.graph,
              catalog.nodes,
              catalog.settingsDefaults,
            ),
          });
        else setBaseline(snapshot(current));
        setInitialTask(running);
        setViewMode("monitor");
        setPanel("node");
        setNotice("任务已启动，可实时查看各节点的处理进度和输出。");
        onChanged?.({ taskId: running.id });
      }
      return true;
    } catch (cause) {
      if (alive.current) setError(cause.message);
      return false;
    } finally {
      if (alive.current) setBusy("");
    }
  };
  const loadTemplate = async (id, discard = false) => {
    if (dirty && !discard) {
      setConfirmation({ kind: "template", id });
      return;
    }
    setBusy("template");
    setError("");
    try {
      const builtin = (catalog.builtinTemplates || []).find(
        (item) => item.id === id,
      );
      const loaded = builtin
        ? null
        : id
          ? (await workflowApi.template(id)).template
          : null;
      if (!alive.current) return;
      installDraft({
        ...newDraft(),
        graph: initializeGraph(
          builtin?.graph ||
            loaded?.graph ||
            catalog.defaultGraph ||
            catalog.standardGraph,
          catalog.nodes,
          catalog.settingsDefaults,
        ),
        title:
          builtin?.title || loaded?.title || catalog.defaultTitle || "工作流",
        description: builtin?.description || loaded?.description || "",
        templateSharing: loaded?.sharingMembers || [],
        permissions: clone(catalog.permissionsDefaults || {}),
      });
      setTemplate(loaded);
      setBuiltinTemplateId(builtin?.id || "");
      setInitialTask(null);
      setConfirmation(null);
      setNotice("");
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };
  const deleteTemplate = async () => {
    setBusy("delete");
    setError("");
    try {
      await workflowApi.deleteTemplate(template.id, template.revision);
      if (!alive.current) return;
      setTemplates((items) => items.filter((item) => item.id !== template.id));
      setTemplate(null);
      setConfirmation(null);
      setBaseline("");
      setNotice("模板已删除，当前草稿仍然保留。");
      onChanged?.({});
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };
  const keyboard = (event) => {
    if (event.isComposing || busy || readOnly || confirmation || menu) return;
    const control = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();
    if (control && key === "s") {
      event.preventDefault();
      void action("save");
      return;
    }
    if (isWorkflowTextEditing(event.target)) return;
    if (control && key === "z") {
      event.preventDefault();
      event.shiftKey ? redo() : undo();
    } else if (control && key === "y") {
      event.preventDefault();
      redo();
    } else if (control && key === "c") {
      event.preventDefault();
      copy();
    } else if (control && key === "v") {
      event.preventDefault();
      paste();
    } else if (control && key === "d") {
      event.preventDefault();
      duplicate();
    } else if (["delete", "backspace"].includes(key)) {
      event.preventDefault();
      deleteSelected();
    }
  };
  const runtimeAction = async (kind) => {
    setBusy(kind);
    setError("");
    try {
      await workflowApi.taskAction(task.id, kind);
      const detail = await workflowApi.task(task.id);
      if (alive.current) {
        setInitialTask(detail.task);
        onChanged?.({ taskId: task.id });
      }
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent
        ref={dialogRef}
        className="workflow-dialog"
        showCloseButton={false}
        onKeyDown={keyboard}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          if (!confirmation && !menu) close();
        }}
      >
        <header className="workflow-header">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <GitBranch className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <DialogTitle>
                {readOnly ? "工作流任务监控" : "创建任务模板"}
              </DialogTitle>
              <DialogDescription className="mt-1 truncate">
                {readOnly
                  ? "查看本次任务的执行快照、进度与节点输出。"
                  : "通过具名端口连接数据与处理节点，配置可复用模板。"}
                {template && ` 模板 v${template.revision}`}
                {dirty && !readOnly && " · 有未保存修改"}
              </DialogDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="关闭工作流"
            disabled={Boolean(busy)}
            onClick={close}
          >
            <X className="size-5" />
          </Button>
        </header>
        <nav
          className="workflow-mobile-tabs workflow-tabs"
          aria-label="工作流编辑区域"
        >
          {[
            ...(!readOnly ? [["palette", "节点库"]] : []),
            ["canvas", "流程画布"],
            ["config", readOnly ? "执行详情" : "节点信息"],
          ].map(([key, label]) => (
            <button
              type="button"
              key={key}
              aria-current={mobilePane === key ? "page" : undefined}
              onClick={() => setMobilePane(key)}
            >
              {label}
            </button>
          ))}
        </nav>
        {loading ? (
          <div className="workflow-loading">
            <Loader2 className="size-5 animate-spin" />
            正在加载工作流目录…
          </div>
        ) : !catalog.nodes.length ? (
          <div className="workflow-loading">
            <p role="alert">{error || "没有可用的节点定义。"}</p>
            <Button
              variant="outline"
              onClick={() => setReload((value) => value + 1)}
            >
              重新加载
            </Button>
          </div>
        ) : (
          <div
            className={`workflow-workspace mobile-${mobilePane} ${readOnly ? "is-monitor" : ""}`}
          >
            {!readOnly && (
              <aside className="workflow-palette pretty-scrollbar">
                <label className="workflow-label">工作流模板</label>
                <WorkflowSelect
                  label="选择工作流模板"
                  value={builtinTemplateId || template?.id || ""}
                  disabled={Boolean(busy)}
                  onChange={(id) => void loadTemplate(id)}
                  options={[
                    { value: "", label: "标准提取流程" },
                    ...(catalog.builtinTemplates || []).map((item) => ({
                      value: item.id,
                      label: item.title,
                    })),
                    ...templates.map((item) => ({
                      value: item.id,
                      label: `${item.title} · v${item.revision}`,
                    })),
                  ]}
                />
                {template && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={Boolean(busy)}
                      onClick={() => void action("clone")}
                    >
                      <Copy className="size-3" />
                      另存模板
                    </Button>
                    {template.canManage !== false && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        disabled={Boolean(busy)}
                        onClick={() => setConfirmation({ kind: "delete" })}
                      >
                        <Trash2 className="size-3" />
                        删除模板
                      </Button>
                    )}
                  </div>
                )}
                <div className="my-4 space-y-2">
                  <label className="workflow-label">模板 / 任务名称</label>
                  <Input
                    aria-label="工作流名称"
                    value={title}
                    disabled={Boolean(busy)}
                    onChange={(event) =>
                      changeDraft({ ...draft, title: event.target.value })
                    }
                  />
                  <MultilineEditor
                    label="模板说明"
                    value={description}
                    rows={3}
                    disabled={Boolean(busy)}
                    onChange={(event) =>
                      changeDraft({ ...draft, description: event.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    aria-label="搜索工作流节点"
                    placeholder="搜索数据或处理节点"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                {(catalog.categories || []).map(
                  ({ id: category, title: label }) => (
                    <section className="mt-4 space-y-2" key={category}>
                      <h3 className="text-xs font-semibold text-muted-foreground">
                        {label}
                      </h3>
                      {catalog.nodes
                        .filter(
                          (definition) =>
                            !definition.hidden &&
                            definition.category === category &&
                            `${definition.title} ${definition.className} ${definition.kind} ${definition.description}`
                              .toLowerCase()
                              .includes(search.toLowerCase()),
                        )
                        .map((definition) => (
                          <button
                            key={`${definition.kind}:${definition.version}`}
                            type="button"
                            className="workflow-palette-node"
                            disabled={Boolean(busy)}
                            draggable={!busy}
                            onDragStart={(event) => {
                              event.dataTransfer.setData(
                                "application/cwm-workflow-node",
                                definition.kind,
                              );
                              event.dataTransfer.effectAllowed = "copy";
                            }}
                            onClick={() => addNode(definition)}
                          >
                            <div className="flex items-center gap-2">
                              <Plus className="size-4 shrink-0 text-primary" />
                              <strong>{definition.title}</strong>
                            </div>
                            <p>{definition.description}</p>
                          </button>
                        ))}
                    </section>
                  ),
                )}
              </aside>
            )}
            <main
              className="workflow-canvas"
              aria-label="工作流画布"
              tabIndex={0}
              onPointerMove={(event) => {
                pointer.current = { x: event.clientX, y: event.clientY };
              }}
            >
              <WorkflowCanvas
                nodes={nodes}
                selectionRequest={selectionRequest}
                fitRequest={fitRequest}
                edges={edges}
                nodeTypes={nodeTypes}
                minZoom={0.15}
                maxZoom={2}
                deleteKeyCode={null}
                multiSelectionKeyCode={["Control", "Meta"]}
                nodesDraggable={!readOnly && !busy}
                nodesConnectable={!readOnly && !busy}
                edgesReconnectable={false}
                onPositionsCommit={commitPositions}
                onNodeClick={(event, node) => {
                  setSelected(node.id);
                  if (!event.ctrlKey && !event.metaKey) {
                    setSelectedIds([node.id]);
                    setSelectedEdges([]);
                  }
                  setPanel("node");
                }}
                onNodeDoubleClick={(_event, node) => {
                  setSelected(node.id);
                  setPanel("node");
                  setMobilePane("config");
                }}
                onSelectionChange={selectionChanged}
                onPaneClick={() => {
                  setSelected("");
                  setSelectedIds([]);
                  setSelectedEdges([]);
                  setMenu(null);
                }}
                onNodeContextMenu={(event, node) => {
                  if (!readOnly && !busy) {
                    if (!selectedIds.includes(node.id)) select([node.id]);
                    openMenu(event, { nodeId: node.id });
                  }
                }}
                onPaneContextMenu={(event) => {
                  if (!readOnly && !busy) openMenu(event, {});
                }}
                onEdgeContextMenu={(event, edge) => {
                  if (!readOnly && !busy) openMenu(event, { edgeId: edge.id });
                }}
                onEdgesChange={(changes) => {
                  const selections = changes.filter(
                    (change) => change.type === "select",
                  );
                  if (selections.length)
                    setSelectedEdges((current) => {
                      const ids = new Set(current);
                      for (const change of selections)
                        change.selected
                          ? ids.add(change.id)
                          : ids.delete(change.id);
                      return [...ids];
                    });
                }}
                onConnect={(connection) => {
                  if (readOnly || busy) return;
                  try {
                    changeGraph((current) =>
                      connectWorkflow(current, connection, catalog.nodes),
                    );
                    setError("");
                  } catch (cause) {
                    setError(cause.message);
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "copy";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (busy || readOnly) return;
                  const definition = catalog.nodes.find(
                    (node) =>
                      node.kind ===
                      event.dataTransfer.getData(
                        "application/cwm-workflow-node",
                      ),
                  );
                  if (definition)
                    addNode(
                      definition,
                      flow.screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                      }),
                    );
                }}
              >
                <Background gap={22} size={1} />
                <Controls showInteractive={false} />
              </WorkflowCanvas>
              <div className="workflow-canvas-tools">
                <Button
                  variant="outline"
                  size="icon"
                  title="适应画布 · 查看全部节点"
                  aria-label="适应画布"
                  onClick={() =>
                    void flow.fitView({
                      padding: 0.18,
                      duration: 250,
                      maxZoom: 1,
                    })
                  }
                >
                  <Maximize2 className="size-4" />
                </Button>
                {!readOnly && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      title="撤销 · Ctrl Z"
                      aria-label="撤销工作流修改"
                      disabled={Boolean(busy) || !history.current.past.length}
                      onClick={undo}
                    >
                      <Undo2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="重做 · Ctrl Shift Z"
                      aria-label="重做工作流修改"
                      disabled={Boolean(busy) || !history.current.future.length}
                      onClick={redo}
                    >
                      <Redo2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="删除选中节点或连接"
                      disabled={
                        Boolean(busy) ||
                        !(selectedIds.length || selectedEdges.length)
                      }
                      onClick={deleteSelected}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="工作流全局设置"
                      onClick={() => {
                        setPanel("settings");
                        setMobilePane("config");
                      }}
                    >
                      <Settings2 className="size-4" />
                    </Button>
                  </>
                )}
              </div>
              {!graph.nodes.length && (
                <div className="workflow-canvas-empty">
                  从左侧添加数据、处理和输出节点。
                </div>
              )}
              {!readOnly && (
                <WorkflowContextMenu
                  menu={menu}
                  hasClipboard={hasClipboard}
                  onClose={closeMenu}
                  onCopy={copy}
                  onPaste={() => paste()}
                  onDuplicate={duplicate}
                  onDelete={deleteSelected}
                  onRename={rename}
                  onPortMode={(mode) => {
                    if (menu?.port)
                      changeGraph((current) =>
                        setWorkflowPortMode(
                          current,
                          menu.nodeId,
                          menu.port.name,
                          mode,
                          menu.port.schema ||
                            catalogNode(
                              catalog.nodes,
                              current.nodes.find(
                                (node) => node.id === menu.nodeId,
                              ),
                            )?.inputSchema?.properties?.[menu.port.name],
                        ),
                      );
                    setMenu(null);
                  }}
                />
              )}
            </main>
            <aside className="workflow-inspector pretty-scrollbar">
              {readOnly ? (
                <WorkflowMonitorPanel
                  task={task}
                  node={selectedNode}
                  definition={
                    selectedNode && catalogNode(catalog.nodes, selectedNode)
                  }
                  runtime={runtimeNodes[selected] || {}}
                  stages={runtimeStages}
                />
              ) : (
                <>
                  <div className="workflow-tabs mb-4" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={panel === "node"}
                      onClick={() => setPanel("node")}
                    >
                      节点信息
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={panel === "settings"}
                      onClick={() => setPanel("settings")}
                    >
                      全局设置
                    </button>
                  </div>
                  {panel === "node" ? (
                    selectedNode ? (
                      <WorkflowNodePanel
                        key={selectedNode.id}
                        graph={graph}
                        node={selectedNode}
                        definitions={catalog.nodes}
                        models={models}
                        onGraphChange={changeGraph}
                        onValidity={validity}
                        disabled={Boolean(busy)}
                      />
                    ) : (
                      <p className="py-10 text-center text-sm text-muted-foreground">
                        选择节点查看说明与类初始化设置。
                      </p>
                    )
                  ) : (
                    <div className="space-y-5">
                      <WorkflowSettingsFields
                        schema={catalog.settingsSchema}
                        value={graph.settings}
                        models={models}
                        disabled={Boolean(busy)}
                        onValidity={(valid) => validity("global", valid)}
                        onChange={(settings) =>
                          changeGraph({ ...graph, settings })
                        }
                      />
                      <JsonConfigEditor
                        label="生成知识的归属与共享"
                        schema={catalog.permissionsSchema || {}}
                        value={permissions}
                        readOnly={Boolean(busy)}
                        onStateChange={(state) =>
                          validity("permissions", state.valid !== false)
                        }
                        onChange={(values) =>
                          changeDraft({ ...draft, permissions: values })
                        }
                      />
                      <JsonConfigEditor
                        label="模板共享成员"
                        schema={catalog.templateSharingSchema || {}}
                        value={templateSharing}
                        readOnly={
                          Boolean(busy) || template?.canManage === false
                        }
                        onStateChange={(state) =>
                          validity("template-sharing", state.valid !== false)
                        }
                        onChange={(members) =>
                          changeDraft({ ...draft, templateSharing: members })
                        }
                      />
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        )}
        <footer className="workflow-footer">
          <div className="min-w-0 flex-1" aria-live="polite">
            {(error || refreshError) && !loading && (
              <p role="alert" className="text-sm text-destructive">
                {error || refreshError}
              </p>
            )}
            {notice && (
              <p role="status" className="text-sm text-emerald-600">
                {notice}
              </p>
            )}
            {!error && !notice && (
              <p className="text-xs text-muted-foreground">
                {graph.nodes.length} 个节点 · {graph.edges.length} 条连接
                {readOnly ? " · 执行快照" : ""}
              </p>
            )}
          </div>
          {readOnly ? (
            <>
              {task &&
                ["running", "queued", "pending"].includes(task.status) && (
                  <Button
                    variant="outline"
                    disabled={Boolean(busy)}
                    onClick={() => void runtimeAction("pause")}
                  >
                    阶段结束后暂停
                  </Button>
                )}
              {task?.status === "paused" && (
                <Button
                  disabled={Boolean(busy)}
                  onClick={() => void runtimeAction("resume")}
                >
                  继续执行
                </Button>
              )}
              {task &&
                !["completed", "succeeded", "failed", "cancelled"].includes(
                  task.status,
                ) && (
                  <Button
                    variant="outline"
                    disabled={Boolean(busy)}
                    onClick={() => setConfirmation({ kind: "cancel" })}
                  >
                    取消任务
                  </Button>
                )}
              <Button
                variant="outline"
                onClick={() => onChanged?.({ taskId: task?.id })}
              >
                定位到任务
              </Button>
              <Button onClick={onClose}>关闭监控</Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => void action("validate")}
              >
                <Check className="size-4" />
                校验
              </Button>
              <Button
                variant="outline"
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => void action("save")}
              >
                <Save className="size-4" />
                保存模板预设
              </Button>
              <Button
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => void action("run")}
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )}
                直接开始任务
              </Button>
            </>
          )}
        </footer>
        <AlertDialog
          open={Boolean(confirmation)}
          onOpenChange={(open) => {
            if (!open && !busy) setConfirmation(null);
          }}
        >
          {confirmation && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {confirmation?.kind === "close"
                    ? "保存修改后关闭？"
                    : confirmation?.kind === "template"
                      ? "切换工作流模板？"
                      : confirmation?.kind === "cancel"
                        ? "取消当前任务？"
                        : "删除模板？"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmation?.kind === "close"
                    ? "当前工作流有未保存的修改。可以保存模板后关闭，或继续编辑。"
                    : confirmation?.kind === "template"
                      ? "切换模板会丢弃当前未保存的修改。"
                      : "已完成的执行快照与入库内容会保留。"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <AlertDialogFooter>
                <Button
                  variant="outline"
                  disabled={Boolean(busy)}
                  onClick={() => setConfirmation(null)}
                >
                  {confirmation?.kind === "close" ? "继续编辑" : "取消"}
                </Button>
                {confirmation?.kind === "close" ? (
                  <>
                    <Button
                      variant="destructive"
                      disabled={Boolean(busy)}
                      onClick={onClose}
                    >
                      丢弃并关闭
                    </Button>
                    <Button
                      disabled={Boolean(busy)}
                      onClick={() => void action("save", true)}
                    >
                      {busy && <Loader2 className="size-4 animate-spin" />}
                      保存后关闭
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={
                      confirmation?.kind === "template"
                        ? "default"
                        : "destructive"
                    }
                    disabled={Boolean(busy)}
                    onClick={() => {
                      if (confirmation.kind === "template")
                        void loadTemplate(confirmation.id, true);
                      else if (confirmation.kind === "cancel") {
                        setConfirmation(null);
                        void runtimeAction("cancel");
                      } else void deleteTemplate();
                    }}
                  >
                    {confirmation?.kind === "template"
                      ? "丢弃并切换"
                      : confirmation?.kind === "cancel"
                        ? "取消任务"
                        : "删除模板"}
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
