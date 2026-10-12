import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import {
  Check,
  Copy,
  GitBranch,
  Loader2,
  Play,
  Plus,
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
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import apiClient from "@/lib/apiClient.js";
import { workflowApi } from "./workflowApi.js";
import {
  catalogNode,
  clone,
  connectWorkflow,
  createWorkflowNode,
  initializeGraph,
  normalizeGraph,
  removeWorkflowNodes,
} from "./workflowModel.js";
import WorkflowNodePanel from "./WorkflowNodePanel.jsx";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import "@xyflow/react/dist/style.css";
import "./workflow.css";

function WorkflowNode({ data, selected }) {
  const { definition, status } = data;
  return (
    <div
      className={`workflow-node ${selected ? "is-selected" : ""} ${status ? `status-${status}` : ""}`}
    >
      <div className="workflow-node-title">
        <GitBranch className="size-4 text-primary" />
        <strong>{definition?.title || data.kind}</strong>
        {status === "running" && <Loader2 className="size-3 animate-spin" />}
        {["completed", "succeeded"].includes(status) && (
          <Check className="size-3 text-emerald-600" />
        )}
      </div>
      <p className="workflow-node-id">{data.id}</p>
      <div className="workflow-node-ports">
        <div>
          {(definition?.inputs || []).map((port, index) => (
            <div className="workflow-port" key={port.name}>
              <Handle
                type="target"
                position={Position.Left}
                id={port.name}
                style={{ top: 66 + index * 23 }}
              />
              <span>{port.title || port.name}</span>
            </div>
          ))}
        </div>
        <div>
          {(definition?.outputs || []).map((port, index) => (
            <div className="workflow-port workflow-port-output" key={port.name}>
              <span>{port.title || port.name}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={port.name}
                style={{ top: 66 + index * 23 }}
              />
            </div>
          ))}
        </div>
      </div>
      {status && (
        <span className="workflow-node-state">
          {{
            pending: "等待",
            running: "运行中",
            completed: "完成",
            succeeded: "完成",
            failed: "失败",
            cancelled: "取消",
            paused: "暂停",
          }[status] || status}
        </span>
      )}
    </div>
  );
}
const nodeTypes = { workflow: WorkflowNode };
const permissionsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    conversationId: {
      type: "string",
      title: "限制到会话（可选）",
      description: "留空时当前账户的所有会话可访问。",
    },
    sharingMembers: {
      type: "array",
      title: "共享成员",
      default: [],
      items: {
        type: "object",
        additionalProperties: false,
        required: ["userId", "role"],
        properties: {
          userId: {
            type: "integer",
            title: "账户 ID",
            minimum: 1,
            maximum: 2147483647,
          },
          conversationId: {
            type: "string",
            title: "限制到成员会话（可选）",
            maxLength: 36,
          },
          role: {
            type: "string",
            title: "权限",
            enum: ["viewer", "editor", "manager"],
            enumNames: ["只读", "读写", "管理"],
            default: "viewer",
          },
        },
      },
    },
    includeSources: {
      type: "boolean",
      title: "同时共享来源片段",
      default: true,
    },
  },
};
const templateSharingSchema = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["userId", "role"],
    properties: {
      userId: { type: "integer", minimum: 1, title: "账户 ID" },
      role: {
        type: "string",
        title: "模板权限",
        enum: ["viewer", "editor"],
        enumNames: ["读取与调用", "修改与调用"],
        default: "viewer",
      },
    },
  },
};

export default function WorkflowEditor(props) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorWorkspace {...props} />
    </ReactFlowProvider>
  );
}

function WorkflowEditorWorkspace({ request = {}, onClose, onChanged }) {
  const flow = useReactFlow();
  const [loading, setLoading] = useState(true);
  const [loadGeneration, setLoadGeneration] = useState(0);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [catalog, setCatalog] = useState({ nodes: [] });
  const [graph, setGraph] = useState(normalizeGraph());
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [templateSharing, setTemplateSharing] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("知识提取工作流");
  const [description, setDescription] = useState("");
  const [models, setModels] = useState([]);
  const [panel, setPanel] = useState("node");
  const [mobilePane, setMobilePane] = useState("canvas");
  const [dirty, setDirty] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [confirmTemplate, setConfirmTemplate] = useState(null);
  const [task, setTask] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [permissions, setPermissions] = useState({
    sharingMembers: [],
    includeSources: true,
  });
  const [invalid, setInvalid] = useState({});
  const history = useRef([]);
  const alive = useRef(true);
  const activeLoad = useRef(null);
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

  useEffect(() => {
    const controller = new AbortController();
    activeLoad.current = controller;
    setLoading(true);
    setError("");
    Promise.all([
      workflowApi.catalog(controller.signal),
      workflowApi.templates(controller.signal),
      request.templateId
        ? workflowApi.template(request.templateId, controller.signal)
        : request.taskId
          ? workflowApi.task(request.taskId, controller.signal)
          : Promise.resolve(null),
    ])
      .then(([definitions, saved, detail]) => {
        if (controller.signal.aborted) return;
        setCatalog(definitions);
        setTemplates(saved.templates || []);
        const loadedTemplate = detail?.template;
        const loadedTask = request.taskId ? detail?.task || detail : null;
        const next = initializeGraph(
          loadedTemplate?.graph ||
            loadedTask?.parameters?.graph ||
            definitions.standardGraph,
          definitions.nodes,
        );
        setGraph(next);
        setSelected(next.nodes[0]?.id || "");
        setTemplate(loadedTemplate || null);
        setTemplateSharing(loadedTemplate?.sharingMembers || []);
        setTask(loadedTask);
        setTitle(
          loadedTemplate?.title || loadedTask?.title || "知识提取工作流",
        );
        setDescription(loadedTemplate?.description || "");
        setInputValues({});
        setPermissions(
          loadedTask?.parameters?.permissions || {
            sharingMembers: [],
            includeSources: true,
          },
        );
        setDirty(false);
        history.current = [];
        setInvalid({});
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
  }, [request.templateId, request.taskId, loadGeneration]);

  useEffect(() => {
    if (
      !task?.id ||
      ["completed", "succeeded", "failed", "cancelled"].includes(task.status)
    )
      return;
    const controller = new AbortController();
    const timer = setInterval(
      () =>
        workflowApi
          .task(task.id, controller.signal)
          .then((detail) => {
            if (!controller.signal.aborted) setTask(detail.task || detail);
          })
          .catch(() => {}),
      3000,
    );
    return () => {
      clearInterval(timer);
      controller.abort();
    };
  }, [task?.id, task?.status]);

  const changeGraph = useCallback((next) => {
    setGraph((current) => {
      history.current.push(clone(current));
      if (history.current.length > 50) history.current.shift();
      return next;
    });
    setDirty(true);
    setNotice("");
    setConfirmClose(false);
  }, []);
  const edit = (callback) => {
    callback();
    setDirty(true);
    setConfirmClose(false);
    setNotice("");
  };
  const close = () => {
    if (busy) return;
    if (dirty) setConfirmClose(true);
    else onClose();
  };
  const selectedNode = graph.nodes.find((node) => node.id === selected);
  const runtimeNodes = useMemo(
    () =>
      task?.workflowNodes ||
      task?.runtime?.checkpoint?.data?.workflowNodes ||
      task?.runtime?.checkpoint?.workflowNodes ||
      task?.result?.workflowNodes ||
      {},
    [task],
  );
  const runtimeStages = useMemo(
    () =>
      Array.isArray(task?.stages || task?.runtime?.stages)
        ? task.stages || task.runtime.stages
        : Object.values(task?.runtime?.stages || {}),
    [task],
  );
  const selectionChanged = useCallback(
    ({ nodes: chosen, edges: connected }) => {
      const nodeIds = chosen.map((node) => node.id),
        edgeIds = connected.map((edge) => edge.id);
      setSelectedIds((current) =>
        current.join("|") === nodeIds.join("|") ? current : nodeIds,
      );
      setSelectedEdges((current) =>
        current.join("|") === edgeIds.join("|") ? current : edgeIds,
      );
      if (nodeIds.length === 1) setSelected(nodeIds[0]);
    },
    [],
  );
  const nodes = useMemo(
    () =>
      graph.nodes.map((node) => ({
        id: node.id,
        type: "workflow",
        position: node.position || { x: 0, y: 0 },
        selected: selectedIds.length
          ? selectedIds.includes(node.id)
          : selected === node.id,
        data: {
          id: node.id,
          kind: node.kind,
          definition: catalogNode(catalog.nodes, node),
          status:
            runtimeNodes[node.id]?.status ||
            runtimeStages.find?.((stage) => stage.key === node.id)?.status,
        },
      })),
    [
      graph.nodes,
      catalog.nodes,
      selected,
      selectedIds,
      runtimeNodes,
      runtimeStages,
    ],
  );
  const edges = useMemo(
    () =>
      graph.edges.map((edge) => ({
        ...edge,
        sourceHandle: edge.sourcePort,
        targetHandle: edge.targetPort,
        type: "smoothstep",
        selected: selectedEdges.includes(edge.id),
        animated: runtimeNodes[edge.source]?.status === "running",
      })),
    [graph.edges, selectedEdges, runtimeNodes],
  );
  const addNode = (definition, position) => {
    const node = createWorkflowNode(definition, graph, position);
    changeGraph({ ...graph, nodes: [...graph.nodes, node] });
    setSelected(node.id);
    setSelectedIds([node.id]);
    setPanel("node");
    setMobilePane("config");
  };
  const deleteSelected = () => {
    const ids = selectedIds.length ? selectedIds : selected ? [selected] : [];
    const next = removeWorkflowNodes(graph, ids);
    next.edges = next.edges.filter((edge) => !selectedEdges.includes(edge.id));
    changeGraph(next);
    setSelected("");
    setSelectedIds([]);
    setSelectedEdges([]);
  };
  const undo = () => {
    const previous = history.current.pop();
    if (previous) {
      setGraph(previous);
      setDirty(true);
      setInvalid({});
    }
  };
  const graphPayload = () => {
    if (
      Object.entries(invalid).some(
        ([key, value]) =>
          value &&
          (key === "variables" ||
            key === "permissions" ||
            key === "run-values" ||
            key === "template-sharing" ||
            graph.nodes.some((node) => key.includes(`:${node.id}`))),
      )
    )
      throw new Error("存在未完成或无效的配置，请先修正编辑器中的提示。");
    return { graph, inputValues };
  };
  const action = async (kind) => {
    if (busy) return;
    setBusy(kind);
    setError("");
    setNotice("");
    try {
      const payload = graphPayload();
      await workflowApi.validate({
        ...payload,
        runnable: kind === "validate" || kind === "run",
      });
      if (!alive.current) return;
      if (kind === "validate")
        setNotice("流程配置校验通过；启动时会检查来源权限与可用模型。");
      else if (kind === "save" || kind === "clone") {
        if (!title.trim()) throw new Error("请填写模板名称。");
        const id =
          kind === "save" && template?.canEdit !== false ? template?.id : null;
        const result = await workflowApi.saveTemplate(
          {
            title: title.trim(),
            description,
            graph,
            ...(!id || template?.canManage !== false
              ? {
                  sharingMembers:
                    !id && template?.canManage === false ? [] : templateSharing,
                }
              : {}),
            ...(id ? { revision: template.revision } : {}),
          },
          id,
        );
        if (!alive.current) return;
        const saved = result.template;
        setTemplate(saved);
        setTemplateSharing(saved.sharingMembers || []);
        setTemplates((current) => [
          ...current.filter((item) => item.id !== saved.id),
          saved,
        ]);
        setDirty(false);
        setNotice(`已保存模板 · 第 ${saved.revision} 版`);
        onChanged?.({ templateId: saved.id });
      } else {
        const result = await workflowApi.run({
          ...payload,
          title: title.trim(),
          permissions,
          ...(template && !dirty
            ? { templateId: template.id, templateRevision: template.revision }
            : {}),
        });
        if (!alive.current) return;
        const running = result.task || result;
        setTask(running);
        setNotice("任务已启动，当前图是本次执行的独立快照。");
        onChanged?.({ taskId: running.id });
      }
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };

  const loadTemplate = async (id, discard = false) => {
    if (dirty && !discard) {
      setConfirmTemplate(id);
      return;
    }
    setBusy("template");
    setError("");
    try {
      const next = id ? (await workflowApi.template(id)).template : null;
      if (!alive.current) return;
      const nextGraph = initializeGraph(
        next?.graph || catalog.standardGraph,
        catalog.nodes,
      );
      setGraph(nextGraph);
      setTemplate(next);
      setTemplateSharing(next?.sharingMembers || []);
      setConfirmDelete(false);
      setSelected(nextGraph.nodes[0]?.id || "");
      setSelectedIds([]);
      setTask(null);
      setDirty(false);
      setInputValues({});
      setInvalid({});
      history.current = [];
      setTitle(next?.title || "知识提取工作流");
      setDescription(next?.description || "");
      setConfirmTemplate(null);
      setNotice("");
      requestAnimationFrame(() =>
        flow.fitView({ padding: 0.18, duration: 250 }),
      );
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };

  const deleteTemplate = async () => {
    if (!template || busy) return;
    setBusy("delete");
    setError("");
    try {
      await workflowApi.deleteTemplate(template.id, template.revision);
      if (!alive.current) return;
      setTemplates((current) =>
        current.filter((item) => item.id !== template.id),
      );
      setTemplate(null);
      setTemplateSharing([]);
      setConfirmDelete(false);
      setDirty(true);
      setNotice("模板已删除，当前流程草稿仍然保留。");
      onChanged?.({});
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
        className="workflow-dialog"
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <header className="workflow-header">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <GitBranch className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <DialogTitle>知识提取工作流</DialogTitle>
              <DialogDescription className="mt-1 truncate">
                连接处理节点，分别配置初始化参数和 invoke 变量。
                {template && ` 模板 v${template.revision}`}
                {dirty && " · 有未保存修改"}
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
            ["palette", "节点库"],
            ["canvas", "流程画布"],
            ["config", "配置"],
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
              onClick={() => setLoadGeneration((number) => number + 1)}
            >
              重新加载
            </Button>
          </div>
        ) : (
          <div className={`workflow-workspace mobile-${mobilePane}`}>
            <aside className="workflow-palette pretty-scrollbar">
              <label className="workflow-label">工作流模板</label>
              <WorkflowSelect
                label="选择工作流模板"
                value={template?.id || ""}
                disabled={Boolean(busy)}
                onChange={(id) => loadTemplate(id)}
                options={[
                  { value: "", label: "标准提取流程" },
                  ...templates.map((item) => ({
                    value: item.id,
                    label: `${item.title} · v${item.revision}`,
                  })),
                ]}
              />
              {template?.canManage !== false && template && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-destructive"
                  disabled={Boolean(busy)}
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="size-3" />
                  删除模板
                </Button>
              )}
              <div className="my-4 space-y-2">
                <label className="workflow-label">模板 / 任务名称</label>
                <Input
                  aria-label="工作流名称"
                  value={title}
                  disabled={Boolean(busy)}
                  onChange={(event) => edit(() => setTitle(event.target.value))}
                />
                <MultilineEditor
                  label="模板说明"
                  value={description}
                  rows={3}
                  disabled={Boolean(busy)}
                  onChange={(event) =>
                    edit(() => setDescription(event.target.value))
                  }
                />
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  aria-label="搜索工作流节点"
                  placeholder="搜索处理节点"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="mt-3 space-y-2">
                {catalog.nodes
                  .filter((definition) =>
                    `${definition.title} ${definition.kind} ${definition.description}`
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
              </div>
            </aside>
            <main className="workflow-canvas" aria-label="工作流画布">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.15}
                maxZoom={2}
                fitViewOptions={{ padding: 0.18 }}
                deleteKeyCode={null}
                multiSelectionKeyCode="Control"
                nodesDraggable={!busy}
                nodesConnectable={!busy}
                onNodesChange={(changes) => {
                  const selections = changes.filter(
                    (change) => change.type === "select",
                  );
                  if (selections.length)
                    setSelectedIds((current) => {
                      const ids = new Set(current);
                      for (const change of selections) {
                        if (change.selected) ids.add(change.id);
                        else ids.delete(change.id);
                      }
                      return [...ids];
                    });
                  const positions = changes.filter(
                    (change) => change.type === "position" && change.position,
                  );
                  if (positions.length) {
                    setGraph((current) => ({
                      ...current,
                      nodes: current.nodes.map((node) => {
                        const position = positions.find(
                          (change) => change.id === node.id,
                        )?.position;
                        return position ? { ...node, position } : node;
                      }),
                    }));
                    setDirty(true);
                  }
                }}
                onNodeClick={(event, node) => {
                  setSelected(node.id);
                  if (!event.ctrlKey && !event.metaKey)
                    setSelectedIds([node.id]);
                  setSelectedEdges([]);
                  setPanel("node");
                }}
                onNodeDoubleClick={(_event, node) => {
                  setSelected(node.id);
                  setPanel("node");
                  setMobilePane("config");
                }}
                onSelectionChange={selectionChanged}
                onEdgesChange={(changes) => {
                  const selections = changes.filter(
                    (change) => change.type === "select",
                  );
                  if (selections.length) {
                    setSelectedEdges((current) => {
                      const ids = new Set(current);
                      for (const change of selections) {
                        if (change.selected) ids.add(change.id);
                        else ids.delete(change.id);
                      }
                      return [...ids];
                    });
                    setSelected("");
                    setSelectedIds([]);
                  }
                }}
                onPaneClick={() => {
                  setSelected("");
                  setSelectedIds([]);
                  setSelectedEdges([]);
                }}
                onConnect={(connection) => {
                  try {
                    changeGraph(
                      connectWorkflow(graph, connection, catalog.nodes),
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
                  if (busy) return;
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
              </ReactFlow>
              <div className="workflow-canvas-tools">
                <Button
                  variant="outline"
                  size="icon"
                  title="撤销配置修改"
                  aria-label="撤销工作流修改"
                  disabled={Boolean(busy) || !history.current.length}
                  onClick={undo}
                >
                  <Undo2 className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="删除选中节点或连接"
                  disabled={
                    Boolean(busy) ||
                    !(selected || selectedIds.length || selectedEdges.length)
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
              </div>
              {!graph.nodes.length && (
                <div className="workflow-canvas-empty">
                  从左侧添加节点，或拖入画布。
                </div>
              )}
            </main>
            <aside className="workflow-inspector pretty-scrollbar">
              <div className="workflow-tabs mb-4" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={panel === "node"}
                  onClick={() => setPanel("node")}
                >
                  节点配置
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={panel === "settings"}
                  onClick={() => setPanel("settings")}
                >
                  全局与运行
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
                    onError={setError}
                    onValidity={validity}
                    disabled={Boolean(busy)}
                    onDelete={() => {
                      changeGraph(
                        removeWorkflowNodes(graph, [selectedNode.id]),
                      );
                      setSelected("");
                      setSelectedIds([]);
                    }}
                    onDuplicate={() => {
                      const duplicated = createWorkflowNode(
                        catalogNode(catalog.nodes, selectedNode),
                        graph,
                        {
                          x: (selectedNode.position?.x || 0) + 45,
                          y: (selectedNode.position?.y || 0) + 65,
                        },
                      );
                      duplicated.config = clone(selectedNode.config);
                      duplicated.inputs = clone(selectedNode.inputs || {});
                      changeGraph({
                        ...graph,
                        nodes: [...graph.nodes, duplicated],
                      });
                      setSelected(duplicated.id);
                      setSelectedIds([duplicated.id]);
                    }}
                  />
                ) : (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    选择节点查看参数，选择连线后可删除连接。
                  </p>
                )
              ) : (
                <div className="space-y-5">
                  <section className="space-y-2">
                    <label className="workflow-label">同时运行的节点数</label>
                    <Input
                      type="number"
                      min="1"
                      max="16"
                      aria-label="工作流并发数"
                      value={graph.settings.maxConcurrency}
                      disabled={Boolean(busy)}
                      onChange={(event) =>
                        changeGraph({
                          ...graph,
                          settings: {
                            ...graph.settings,
                            maxConcurrency: Number(event.target.value),
                          },
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      节点内部的 max_concurrency 在各节点中配置。服务器 Worker
                      数量由部署决定。
                    </p>
                  </section>
                  <JsonConfigEditor
                    label="工作流变量默认值"
                    schema={{
                      type: "object",
                      maxProperties: 100,
                      propertyNames: { pattern: "^[A-Za-z0-9_-]{1,64}$" },
                    }}
                    value={graph.variables}
                    readOnly={Boolean(busy)}
                    onStateChange={(state) =>
                      validity("variables", state.valid !== false)
                    }
                    onChange={(variables) =>
                      changeGraph({ ...graph, variables })
                    }
                  />
                  <JsonConfigEditor
                    label="本次运行变量覆盖"
                    schema={{
                      type: "object",
                      maxProperties: 100,
                      propertyNames: { pattern: "^[A-Za-z0-9_-]{1,64}$" },
                      properties: Object.fromEntries(
                        Object.keys(graph.variables).map((name) => [
                          name,
                          { title: name },
                        ]),
                      ),
                    }}
                    value={inputValues}
                    readOnly={Boolean(busy)}
                    onStateChange={(state) =>
                      validity("run-values", state.valid !== false)
                    }
                    onChange={(values) => edit(() => setInputValues(values))}
                  />
                  <p className="text-xs text-muted-foreground">
                    运行变量覆盖与生成知识权限只用于本次任务；模板保存节点参数和变量默认值。
                  </p>
                  <JsonConfigEditor
                    label="生成知识的归属与共享"
                    schema={permissionsSchema}
                    value={permissions}
                    readOnly={Boolean(busy)}
                    onStateChange={(state) =>
                      validity("permissions", state.valid !== false)
                    }
                    onChange={(values) => edit(() => setPermissions(values))}
                  />
                  <JsonConfigEditor
                    label="模板共享成员"
                    schema={templateSharingSchema}
                    value={templateSharing}
                    readOnly={Boolean(busy) || template?.canManage === false}
                    onStateChange={(state) =>
                      validity("template-sharing", state.valid !== false)
                    }
                    onChange={(members) =>
                      edit(() => setTemplateSharing(members))
                    }
                  />
                </div>
              )}
              {task && (
                <section className="mt-5 rounded-lg border bg-muted/30 p-3">
                  <h4 className="text-sm font-medium">本次执行</h4>
                  <p className="mt-1 break-all text-xs text-muted-foreground">
                    {task.id}
                  </p>
                  <p className="mt-2 text-sm">
                    状态：{task.status || "已提交"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    修改流程后再次启动会创建新任务。
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => onChanged?.({ taskId: task.id })}
                  >
                    定位到任务
                  </Button>
                </section>
              )}
            </aside>
          </div>
        )}
        <footer className="workflow-footer">
          <div className="min-w-0 flex-1" aria-live="polite">
            {error && !loading && (
              <p role="alert" className="text-sm text-destructive">
                {error}
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
                {task ? " · 修改后启动为新任务" : ""}
              </p>
            )}
          </div>
          {confirmClose ? (
            <>
              <span className="text-sm">关闭会丢弃未保存的修改。</span>
              <Button variant="outline" onClick={() => setConfirmClose(false)}>
                继续编辑
              </Button>
              <Button variant="destructive" onClick={onClose}>
                丢弃并关闭
              </Button>
            </>
          ) : confirmTemplate !== null ? (
            <>
              <span className="text-sm">切换模板会丢弃当前修改。</span>
              <Button
                variant="outline"
                onClick={() => setConfirmTemplate(null)}
              >
                取消
              </Button>
              <Button
                disabled={Boolean(busy)}
                onClick={() => loadTemplate(confirmTemplate, true)}
              >
                切换模板
              </Button>
            </>
          ) : confirmDelete ? (
            <>
              <span className="text-sm">
                删除模板？已有任务的执行快照会保留。
              </span>
              <Button
                variant="outline"
                disabled={Boolean(busy)}
                onClick={() => setConfirmDelete(false)}
              >
                取消
              </Button>
              <Button
                variant="destructive"
                disabled={Boolean(busy)}
                onClick={deleteTemplate}
              >
                删除模板
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => action("validate")}
              >
                <Check className="size-4" />
                校验
              </Button>
              {template && (
                <Button
                  variant="outline"
                  disabled={loading || Boolean(busy)}
                  onClick={() => action("clone")}
                >
                  <Copy className="size-4" />
                  另存
                </Button>
              )}
              <Button
                variant="outline"
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => action("save")}
              >
                <Save className="size-4" />
                保存模板
              </Button>
              <Button
                disabled={loading || Boolean(busy) || !catalog.nodes.length}
                onClick={() => action("run")}
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )}
                开始任务
              </Button>
            </>
          )}
        </footer>
      </DialogContent>
    </Dialog>
  );
}
