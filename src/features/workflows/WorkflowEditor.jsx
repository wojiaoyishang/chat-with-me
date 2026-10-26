import { workflowArtifacts } from "./workflowProducts.js";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ReactFlowProvider,
  Background,
  Controls,
  MarkerType,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import {
  Check,
  Copy,
  Download,
  GitBranch,
  FolderOpen,
  Group,
  Loader2,
  Maximize2,
  Pencil,
  Play,
  Plus,
  Redo2,
  Save,
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
import { downloadAttachmentResource } from "@/lib/resourceDownload.js";
import { useLocalSetting } from "@/lib/tools.jsx";
import { workflowApi } from "./workflowApi.js";
import {
  DEFAULT_WORKFLOW_EDGE_ANIMATION,
  WORKFLOW_EDGE_ANIMATION_SETTING_KEY,
} from "./workflowSettings.js";
import {
  addWorkflowNodeWithConnection,
  bindWorkflowInput,
  catalogNode,
  clone,
  connectWorkflow,
  copyWorkflowSelection,
  createWorkflowNode,
  effectiveWorkflowDefinition,
  initializeGraph,
  initializeWorkflowSubgraph,
  isWorkflowCanvasBlankTarget,
  isWorkflowTextEditing,
  normalizeGraph,
  pasteWorkflowSelection,
  removeWorkflowNodes,
  setWorkflowPortMode,
  sourceValueConfig,
  SUBGRAPH_CANVAS_DEFINITION,
  updateWorkflowNodePositions,
  workflowGraphAtPath,
  workflowGraphContext,
  updateWorkflowGraphAtPath,
  workflowRuntimeForGraph,
  wrapWorkflowSubgraph,
  unwrapWorkflowSubgraph,
  workflowUsesKnowledge,
  workflowNodeNumbers,
} from "./workflowModel.js";
import WorkflowSubgraphPanel from "./WorkflowSubgraphPanel.jsx";
import WorkflowInterfaceNode from "./WorkflowInterfaceNode.jsx";
import WorkflowInterfacePanel from "./WorkflowInterfacePanel.jsx";
import {
  addWorkflowInterface,
  connectWorkflowInterface,
  parseWorkflowInterfaceId,
  updateWorkflowInterface,
  WORKFLOW_INTERFACE_DEFINITIONS,
  workflowInterfaceContainer,
  workflowInterfaceProjection,
} from "./workflowInterfaceModel.js";
import WorkflowSettingsFields from "./WorkflowSettingsFields.jsx";
import WorkflowCanvas from "./WorkflowCanvas.jsx";
import WorkflowEdge from "./WorkflowEdge.jsx";
import WorkflowContextMenu from "./WorkflowContextMenu.jsx";
import WorkflowNodePicker from "./WorkflowNodePicker.jsx";
import WorkflowPalette from "./WorkflowPalette.jsx";
import WorkflowNode from "./WorkflowNode.jsx";
import WorkflowNodePanel from "./WorkflowNodePanel.jsx";
import WorkflowMonitorPanel from "./WorkflowMonitorPanel.jsx";
import WorkflowLogViewer from "./WorkflowLogViewer.jsx";
import { pendingWorkflowConnectionPath } from "./workflowPendingConnection.js";
import useWorkflowTask from "./useWorkflowTask.js";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import "@xyflow/react/dist/style.css";
import "./workflow.css";

const nodeTypes = {
  workflow: WorkflowNode,
  workflowInterface: WorkflowInterfaceNode,
};
const edgeTypes = { workflow: WorkflowEdge };
const PENDING_NODE_ANCHOR = { x: 72, y: 24 };
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
  const { x: viewportX, y: viewportY, zoom } = useViewport();
  const [edgeAnimationEnabled] = useLocalSetting(
    WORKFLOW_EDGE_ANIMATION_SETTING_KEY,
    DEFAULT_WORKFLOW_EDGE_ANIMATION,
  );
  const [draft, setDraft] = useState(newDraft);
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const {
    graph: editableGraph,
    title,
    description,
    templateSharing,
    permissions,
  } = draft;
  const [baseline, setBaseline] = useState(snapshot(draft));
  const dirty = snapshot(draft) !== baseline;
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState("");
  const [downloading, setDownloading] = useState(false);
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
  const { task: refreshedTask, error: refreshError } = useWorkflowTask(
    readOnly ? initialTask : null,
  );
  const task = readOnly ? refreshedTask || initialTask : null;
  const [graphPath, setGraphPath] = useState([]);
  const rootGraph = useMemo(
    () =>
      readOnly && task?.parameters?.graph
        ? initializeGraph(
            task.parameters.graph,
            catalog.nodes,
            catalog.settingsDefaults,
          )
        : editableGraph,
    [
      readOnly,
      task?.parameters?.graph,
      editableGraph,
      catalog.nodes,
      catalog.settingsDefaults,
    ],
  );
  const graph = workflowGraphAtPath(rootGraph, graphPath) || rootGraph;
  const usesKnowledge = workflowUsesKnowledge(rootGraph, catalog.nodes);
  const graphPathKey = graphPath.join("/");
  const graphContext = useMemo(
    () => workflowGraphContext(rootGraph, graphPath),
    [rootGraph, graphPath],
  );
  const interfaceContainer = workflowInterfaceContainer(rootGraph, graphPath);
  const interfaceProjection = useMemo(
    () => workflowInterfaceProjection(rootGraph, graphPath, catalog.nodes),
    [rootGraph, graphPath, catalog.nodes],
  );
  const paletteDefinitions = useMemo(
    () => [
      ...catalog.nodes.filter((node) => node.kind !== "subgraph"),
      ...[
        SUBGRAPH_CANVAS_DEFINITION,
        ...(graphPath.length ? WORKFLOW_INTERFACE_DEFINITIONS : []),
      ].map((fallback) => {
        const metadata = catalog.editorNodes?.find(
          (node) => node.kind === fallback.kind,
        );
        return {
          ...fallback,
          ...metadata,
          display: { ...fallback.display, ...metadata?.display },
        };
      }),
    ],
    [catalog.nodes, catalog.editorNodes, graphPath.length],
  );
  const paletteCategories = useMemo(
    () =>
      (catalog.categories || []).some((category) => category.id === "control")
        ? catalog.categories
        : [...(catalog.categories || []), { id: "control", title: "流程控制" }],
    [catalog.categories],
  );
  const currentEditableGraph = () =>
    workflowGraphAtPath(draftRef.current.graph, graphPath) ||
    draftRef.current.graph;
  const [selected, setSelected] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectionRequest, setSelectionRequest] = useState({ ids: [] });
  const [fitRequest, setFitRequest] = useState(0);
  const [focusRequest, setFocusRequest] = useState(null);
  const [followTask, setFollowTask] = useState(true);
  const [monitorPositions, setMonitorPositions] = useState({});
  const [submissionStep, setSubmissionStep] = useState("");
  const [panel, setPanel] = useState("node");
  const [monitorView, setMonitorView] = useState("overview");
  const [mobilePane, setMobilePane] = useState("canvas");
  const [menu, setMenu] = useState(null);
  const [picker, setPicker] = useState(null);
  const [pendingPlacement, setPendingPlacement] = useState(null);
  const [pendingLink, setPendingLink] = useState(null);
  const connectionStart = useRef(null);
  const [hasClipboard, setHasClipboard] = useState(
    Boolean(applicationClipboard?.nodes?.length),
  );
  const [confirmation, setConfirmation] = useState(null);
  const [invalid, setInvalid] = useState({});
  const history = useRef({ past: [], future: [] });
  const alive = useRef(true);
  const dialogRef = useRef(null);
  const canvasRef = useRef(null);
  const pendingNodeRef = useRef(null);
  const importFileRef = useRef(null);
  const pointer = useRef(null);
  const pickerOpen = Boolean(picker);
  const placingNode = Boolean(pendingPlacement);
  useEffect(() => {
    if (!pickerOpen && !placingNode) return;
    const trackPointer = (event) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      if (placingNode)
        setPendingPlacement((current) =>
          current ? { ...current, point: pointer.current } : current,
        );
    };
    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [pickerOpen, placingNode]);
  useLayoutEffect(() => {
    if (!pendingPlacement) {
      setPendingLink(null);
      return;
    }
    setPendingLink(
      pendingWorkflowConnectionPath(
        canvasRef.current,
        pendingNodeRef.current,
        pendingPlacement.connection,
      ),
    );
  }, [pendingPlacement, viewportX, viewportY, zoom]);
  const validity = useCallback(
    (key, valid) =>
      setInvalid((current) =>
        current[key] === !valid ? current : { ...current, [key]: !valid },
      ),
    [],
  );
  useEffect(() => {
    if (!usesKnowledge) validity("permissions", true);
  }, [usesKnowledge, validity]);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    setFollowTask(true);
  }, [request.taskId]);

  const installDraft = useCallback((next) => {
    setGraphPath([]);
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
    setFocusRequest(null);
    setMonitorPositions({});
    setMonitorView("overview");
    setMenu(null);
    setPicker(null);
    setPendingPlacement(null);
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
              normalizeGraph(undefined, definitions.settingsDefaults),
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
    (update, boundary) =>
      changeDraft((current) => {
        const next = updateWorkflowGraphAtPath(
          current.graph,
          graphPath,
          update,
          boundary,
        );
        return next === current.graph ? current : { ...current, graph: next };
      }),
    [changeDraft, graphPath],
  );
  const commitPositions = useCallback(
    (moved) => {
      if (pendingPlacement || !moved?.length) return;
      if (readOnly) {
        setMonitorPositions((current) => {
          const next = { ...current };
          for (const item of moved) {
            if (item.position) next[item.id] = item.position;
          }
          return next;
        });
      } else {
        changeDraft((current) => {
          let graph = updateWorkflowGraphAtPath(
            current.graph,
            graphPath,
            (inner) => updateWorkflowNodePositions(inner, moved),
          );
          for (const item of moved) {
            const binding = parseWorkflowInterfaceId(item.id);
            if (binding && graphPath.length && item.position)
              graph = updateWorkflowInterface(
                graph,
                graphPath,
                binding.direction,
                binding.id,
                { position: item.position },
              );
          }
          return { ...current, graph };
        });
      }
    },
    [changeDraft, graphPath, readOnly, pendingPlacement],
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
  const allRuntimeNodes = useMemo(
    () =>
      task?.workflowNodes ||
      task?.runtime?.checkpoint?.data?.workflowNodes ||
      task?.runtime?.checkpoint?.workflowNodes ||
      task?.result?.workflowNodes ||
      {},
    [task],
  );
  const runtimePaths = useMemo(
    () =>
      task?.workflowPaths ||
      task?.runtime?.checkpoint?.data?.workflowPaths ||
      task?.runtime?.checkpoint?.workflowPaths ||
      {},
    [task],
  );
  const runtimeNodes = useMemo(
    () =>
      readOnly
        ? workflowRuntimeForGraph(
            graph,
            allRuntimeNodes,
            graphPath,
            runtimePaths,
          )
        : {},
    [readOnly, graph, allRuntimeNodes, graphPath, runtimePaths],
  );
  useEffect(() => {
    if (!workflowGraphAtPath(rootGraph, graphPath)) {
      setGraphPath([]);
      select([]);
    }
  }, [rootGraph, graphPath, select]);
  const navigateGraph = useCallback(
    (path) => {
      setGraphPath(path);
      select([]);
      setMenu(null);
      setPicker(null);
      setPendingPlacement(null);
      setFitRequest((value) => value + 1);
      setMonitorPositions({});
      setFocusRequest(null);
      setMobilePane("canvas");
    },
    [select],
  );
  const enterSubgraph = useCallback(
    (id) => {
      if (busy || pendingPlacement) return;
      const node = graph.nodes.find((node) => node.id === id);
      if (node?.kind === "subgraph" && node.subgraph.initialized !== false)
        navigateGraph([...graphPath, id]);
    },
    [graph.nodes, graphPath, navigateGraph, busy, pendingPlacement],
  );
  const runtimeStages = useMemo(() => {
    const stages = task?.stages || task?.runtime?.stages || {};
    return Array.isArray(stages) ? stages : Object.values(stages);
  }, [task]);
  const openMenu = useCallback((event, details) => {
    event.preventDefault();
    setPicker(null);
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
  const initializeSubgraph = useCallback(
    async (nodeId, templateId) => {
      if (busy || pendingPlacement || readOnly) return;
      const path = [...graphPath];
      setBusy("initialize-subgraph");
      setError("");
      try {
        const saved = templateId
          ? catalog.builtinTemplates?.find((item) => item.id === templateId) ||
            (await workflowApi.template(templateId)).template
          : null;
        if (!alive.current) return;
        if (templateId && !saved) throw new Error("无法加载所选模板，请重试。");
        const root = draftRef.current.graph;
        const inner = workflowGraphAtPath(root, path);
        if (!inner) throw new Error("目标子图位置已改变，请重新选择。");
        const next = initializeWorkflowSubgraph(
          inner,
          nodeId,
          saved,
          catalog.nodes,
        );
        changeDraft((current) => ({
          ...current,
          graph: updateWorkflowGraphAtPath(current.graph, path, next),
        }));
        setNotice(
          saved
            ? `已复制模板：${saved.title}。可进入子图继续编辑。`
            : "子图已创建，可进入编辑或保存模板。",
        );
      } catch (cause) {
        if (alive.current) setError(cause.message);
      } finally {
        if (alive.current) setBusy("");
      }
    },
    [busy, pendingPlacement, readOnly, graphPath, catalog, changeDraft],
  );
  const saveSubgraphTemplate = useCallback(
    async (
      target = graph.nodes.find((node) => node.id === selected),
      targetPath = graphPath,
    ) => {
      if (!target?.subgraph || target.subgraph.initialized === false || busy)
        return;
      setBusy("save-subgraph");
      setError("");
      try {
        const wrapper = { ...clone(target), position: { x: 80, y: 80 } };
        delete wrapper.subgraph.origin;
        const source = normalizeGraph({
          version: 3,
          nodes: [wrapper],
          edges: [],
          settings: rootGraph.settings,
        });
        await workflowApi.validate({ graph: source });
        const { template: saved } = await workflowApi.saveTemplate({
          title: target.name || "可复用子图",
          description: target.subgraph.description || "",
          graph: source,
          sharingMembers: [],
        });
        if (!alive.current) return;
        setTemplates((items) => [...items, saved]);
        changeDraft((current) => ({
          ...current,
          graph: updateWorkflowGraphAtPath(
            current.graph,
            targetPath,
            (inner) => ({
              ...inner,
              nodes: inner.nodes.map((node) =>
                node.id === target.id
                  ? {
                      ...node,
                      subgraph: {
                        ...node.subgraph,
                        origin: {
                          templateId: saved.id,
                          revision: saved.revision,
                        },
                      },
                    }
                  : node,
              ),
            }),
          ),
        }));
        setNotice(`子图模板已保存 · 第 ${saved.revision} 版。`);
        onChanged?.({ templateId: saved.id });
      } catch (cause) {
        if (alive.current) setError(cause.message);
      } finally {
        if (alive.current) setBusy("");
      }
    },
    [
      graph.nodes,
      selected,
      graphPath,
      busy,
      rootGraph.settings,
      changeDraft,
      onChanged,
    ],
  );
  const nodeNumbers = useMemo(
    () => workflowNodeNumbers(rootGraph),
    [rootGraph],
  );
  const toggleOutput = useCallback(
    (id, enabled) =>
      changeGraph((current) => ({
        ...current,
        outputNodes: enabled
          ? [...new Set([...(current.outputNodes || []), id])]
          : (current.outputNodes || []).filter((key) => key !== id),
      })),
    [changeGraph],
  );
  const nodeMenu = useCallback(
    (event, id) => {
      const rect = event.currentTarget.getBoundingClientRect();
      select([id]);
      openMenu(event, { nodeId: id, x: rect.left, y: rect.bottom + 4 });
    },
    [openMenu, select],
  );
  const nodes = useMemo(
    () => [
      ...graph.nodes.map((node) => ({
        id: node.id,
        type: "workflow",
        position: (readOnly && monitorPositions[node.id]) ||
          node.position || { x: 0, y: 0 },
        data: {
          id: node.id,
          kind: node.kind,
          node,
          number: nodeNumbers[node.id],
          onMenu: nodeMenu,
          definition: effectiveWorkflowDefinition(
            node,
            catalogNode(catalog.nodes, node, graph, new Set(), graphContext),
          ),
          status:
            runtimeNodes[node.id]?.status ||
            runtimeStages.find((stage) => stage.key === node.id)?.status,
          runtime: runtimeNodes[node.id] || {},
          readOnly: readOnly || Boolean(busy || pendingPlacement),
          monitor: readOnly,
          isOutput: (graph.outputNodes || []).includes(node.id),
          onToggleOutput: toggleOutput,
          interactionDisabled: Boolean(busy || pendingPlacement),
          onValue,
          onBinding,
          onBusy,
          onPortMenu,
          onEnter: enterSubgraph,
          onInitializeSubgraph: initializeSubgraph,
          onSaveSubgraphTemplate: (id) =>
            void saveSubgraphTemplate(
              graph.nodes.find((item) => item.id === id),
            ),
          subgraphTemplates: [
            ...templates,
            ...(catalog.builtinTemplates || []).map((item) => ({
              ...item,
              builtin: true,
            })),
          ],
        },
      })),
      ...interfaceProjection.nodes.map((node) => ({
        ...node,
        position: (readOnly && monitorPositions[node.id]) || node.position,
        data: { ...node.data, readOnly: readOnly || Boolean(busy) },
      })),
    ],
    [
      graph,
      graphContext,
      monitorPositions,
      catalog.nodes,
      runtimeNodes,
      runtimeStages,
      readOnly,
      busy,
      pendingPlacement,
      onValue,
      onBinding,
      onBusy,
      onPortMenu,
      enterSubgraph,
      initializeSubgraph,
      saveSubgraphTemplate,
      templates,
      catalog.builtinTemplates,
      interfaceProjection.nodes,
      nodeNumbers,
      nodeMenu,
      toggleOutput,
    ],
  );
  const edges = useMemo(
    () =>
      [...graph.edges, ...interfaceProjection.edges].map((edge) => ({
        ...edge,
        sourceHandle: edge.sourcePort,
        targetHandle: edge.targetPort,
        type: "workflow",
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
        selected: selectedEdges.includes(edge.id),
        className: `workflow-data-edge${edge.interfaceBinding ? " workflow-interface-edge" : ""}${edgeAnimationEnabled ? " is-flowing" : ""}${runtimeNodes[edge.source]?.status === "running" ? " is-active" : ""}`,
        data: {
          flowing: edgeAnimationEnabled,
          active: runtimeNodes[edge.source]?.status === "running",
        },
      })),
    [
      edgeAnimationEnabled,
      graph.edges,
      interfaceProjection.edges,
      selectedEdges,
      runtimeNodes,
    ],
  );

  const selectedNode = graph.nodes.find((node) => node.id === selected);
  const menuNode = graph.nodes.find((node) => node.id === menu?.nodeId);
  const selectedInterface = parseWorkflowInterfaceId(selected);
  const selectedInterfaceEntry =
    selectedInterface &&
    interfaceContainer?.subgraph.interface?.[selectedInterface.direction]?.find(
      (entry) => entry.id === selectedInterface.id,
    );
  const changeInterface = (binding, patch) => {
    try {
      const next = updateWorkflowInterface(
        draftRef.current.graph,
        graphPath,
        binding.direction,
        binding.id,
        patch,
      );
      changeDraft((current) => ({ ...current, graph: next }));
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
  };
  const connectInterface = (connection) => {
    try {
      changeDraft((current) => ({
        ...current,
        graph: connectWorkflowInterface(
          current.graph,
          graphPath,
          connection,
          catalog.nodes,
        ),
      }));
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
  };
  const taskTargetId = useMemo(() => {
    if (!readOnly) return "";
    const stageStatus = new Map(
      runtimeStages.map((stage) => [stage.key, stage.status]),
    );
    const status = (node) =>
      runtimeNodes[node.id]?.status || stageStatus.get(node.id);
    const target =
      graph.nodes.find((node) => status(node) === "running") ||
      graph.nodes.find((node) => status(node) === "failed") ||
      graph.nodes.find((node) =>
        ["queued", "pending", "paused"].includes(status(node)),
      ) ||
      [...graph.nodes]
        .reverse()
        .find((node) => ["completed", "succeeded"].includes(status(node))) ||
      graph.nodes[0];
    return target?.id || "";
  }, [readOnly, graph.nodes, runtimeNodes, runtimeStages]);
  useEffect(() => {
    if (!readOnly || !followTask || !taskTargetId) return;
    select([taskTargetId]);
    setFocusRequest({ id: taskTargetId });
  }, [readOnly, followTask, taskTargetId, task?.id, select]);
  const stopFollowingTask = () => {
    if (!readOnly || !followTask) return;
    setFollowTask(false);
    setFocusRequest(null);
  };
  const locateTask = () => {
    if (followTask) {
      stopFollowingTask();
      return;
    }
    if (!taskTargetId) return;
    setMobilePane("canvas");
    setMonitorView("overview");
    setFollowTask(true);
  };
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
      currentEditableGraph(),
      chosenIds(),
    );
    setHasClipboard(Boolean(applicationClipboard.nodes.length));
    setMenu(null);
  };
  const paste = (clipboard = applicationClipboard, location) => {
    const pasted = pasteWorkflowSelection(
      currentEditableGraph(),
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
      copyWorkflowSelection(currentEditableGraph(), chosenIds()),
      undefined,
    );
  const groupSelection = () => {
    try {
      const parent = graphPath.length
        ? workflowGraphAtPath(rootGraph, graphPath.slice(0, -1))?.nodes.find(
            (node) => node.id === graphPath.at(-1),
          )
        : null;
      const result = wrapWorkflowSubgraph(
        currentEditableGraph(),
        chosenIds(),
        catalog.nodes,
        "知识处理子图",
        parent?.subgraph?.interface,
      );
      changeGraph(result.graph, result.boundary);
      select([result.node.id]);
      setPanel("node");
      setMenu(null);
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
  };
  const ungroupSelection = () => {
    try {
      const result = unwrapWorkflowSubgraph(
        currentEditableGraph(),
        menu?.nodeId || selected,
      );
      changeGraph(result.graph, result.boundary);
      select(result.ids);
      setMenu(null);
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
  };
  const updateSubgraphTemplate = async () => {
    const origin = selectedNode?.subgraph?.origin;
    if (!origin || busy) return;
    setBusy("update-subgraph");
    setError("");
    try {
      const saved =
        catalog.builtinTemplates?.find(
          (item) => item.id === origin.templateId,
        ) || (await workflowApi.template(origin.templateId)).template;
      if (!alive.current) return;
      if (saved.revision === origin.revision) {
        setNotice("当前引用已经是最新版本。");
        return;
      }
      const source = initializeGraph(saved.graph, catalog.nodes);
      const wrapper =
        source.nodes.length === 1 && source.nodes[0].kind === "subgraph"
          ? clone(source.nodes[0])
          : wrapWorkflowSubgraph(
              source,
              source.nodes.map((node) => node.id),
              catalog.nodes,
              saved.title,
            ).node;
      wrapper.id = selectedNode.id;
      wrapper.name = selectedNode.name;
      wrapper.position = selectedNode.position;
      const inputNames = new Set(
        (wrapper.subgraph.interface?.inputs || []).map((port) => port.id),
      );
      const parameterNames = new Set(
        (wrapper.subgraph.interface?.parameters || []).map(
          (parameter) => parameter.id,
        ),
      );
      wrapper.inputs = Object.fromEntries(
        Object.entries(selectedNode.inputs || {}).filter(([name]) =>
          inputNames.has(name),
        ),
      );
      wrapper.config = Object.fromEntries(
        Object.entries({ ...wrapper.config, ...selectedNode.config }).filter(
          ([name]) => parameterNames.has(name),
        ),
      );
      wrapper.subgraph.origin = {
        templateId: saved.id,
        revision: saved.revision || 1,
      };
      const next = {
        ...graph,
        nodes: graph.nodes.map((node) =>
          node.id === selectedNode.id ? wrapper : node,
        ),
      };
      await workflowApi.validate({
        graph: updateWorkflowGraphAtPath(
          draftRef.current.graph,
          graphPath,
          next,
        ),
      });
      if (!alive.current) return;
      changeGraph(next);
      setNotice(
        `子图引用已更新到第 ${saved.revision || 1} 版，可撤销；正在执行的任务不受影响。`,
      );
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };
  const exportWorkflow = () => {
    const value = { title, description, graph: rootGraph };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], {
        type: "application/json;charset=utf-8",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${[...(title || "工作流")]
      .filter((character) => character.codePointAt(0) >= 32)
      .join("")
      .replace(/[<>:"/\\|?*]/g, "_")}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const importWorkflow = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || busy) return;
    setBusy("import");
    setError("");
    try {
      if (file.size > 10 * 1024 * 1024)
        throw new Error("工作流 JSON 不能超过 10 MB。");
      const value = JSON.parse(await file.text());
      const source = value.graph || value;
      if (!Array.isArray(source.nodes) || !Array.isArray(source.edges))
        throw new Error("文件中缺少工作流节点或连线。");
      const next = initializeGraph(
        source,
        catalog.nodes,
        catalog.settingsDefaults,
      );
      await workflowApi.validate({ graph: next });
      if (!alive.current) return;
      changeDraft((current) => ({
        ...current,
        graph: next,
        title: typeof value.title === "string" ? value.title : current.title,
        description:
          typeof value.description === "string"
            ? value.description
            : current.description,
      }));
      navigateGraph([]);
      setNotice(
        "已导入工作流与全部嵌套子图，可撤销此操作。请核对模型、附件和数据库配置。",
      );
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy("");
    }
  };
  const deleteSelected = () => {
    const ids = menu?.edgeId ? [] : chosenIds();
    try {
      changeDraft((current) => {
        let graph = current.graph;
        for (const id of ids) {
          const binding = parseWorkflowInterfaceId(id);
          if (binding)
            graph = updateWorkflowInterface(
              graph,
              graphPath,
              binding.direction,
              binding.id,
              null,
            );
        }
        const edgeIds = menu?.edgeId ? [menu.edgeId] : selectedEdges;
        for (const id of edgeIds) {
          const binding = parseWorkflowInterfaceId(id);
          if (binding && !ids.includes(id))
            graph = updateWorkflowInterface(
              graph,
              graphPath,
              binding.direction,
              binding.id,
              { [binding.direction === "inputs" ? "target" : "source"]: null },
            );
        }
        graph = updateWorkflowGraphAtPath(graph, graphPath, (inner) => ({
          ...removeWorkflowNodes(inner, ids),
          edges: inner.edges.filter(
            (edge) =>
              !ids.includes(edge.source) &&
              !ids.includes(edge.target) &&
              !edgeIds.includes(edge.id),
          ),
        }));
        // A removed processing node leaves an editable, unbound public pill.
        const container = workflowInterfaceContainer(graph, graphPath);
        for (const direction of ["inputs", "outputs"])
          for (const entry of container?.subgraph.interface?.[direction] ||
            []) {
            const endpoint =
              entry[direction === "inputs" ? "target" : "source"];
            if (endpoint && ids.includes(endpoint.nodeId))
              graph = updateWorkflowInterface(
                graph,
                graphPath,
                direction,
                entry.id,
                { [direction === "inputs" ? "target" : "source"]: null },
              );
          }
        return { ...current, graph };
      });
      setError("");
    } catch (cause) {
      setError(cause.message);
    }
    select([]);
    setMenu(null);
  };
  const addNode = (definition, position) => {
    if (pendingPlacement) return;
    if (definition.virtualInterface) {
      try {
        const result = addWorkflowInterface(
          draftRef.current.graph,
          graphPath,
          definition.virtualInterface,
          position,
        );
        changeDraft((current) => ({ ...current, graph: result.graph }));
        select([result.id]);
        setPanel("node");
        setMobilePane("canvas");
        setError("");
      } catch (cause) {
        setError(cause.message);
      }
      return;
    }
    const current = currentEditableGraph();
    const node = createWorkflowNode(definition, current, position);
    changeGraph({ ...current, nodes: [...current.nodes, node] });
    select([node.id]);
    if (node.kind === "subgraph") setFocusRequest({ id: node.id });
    setPanel("node");
    setMobilePane("canvas");
  };
  const openPicker = (point, connection) => {
    if (readOnly || busy || pendingPlacement) return;
    setMenu(null);
    setPicker({
      ...point,
      position: flow.screenToFlowPosition(point),
      connection,
    });
  };
  const closePicker = () => {
    setPicker(null);
    requestAnimationFrame(() =>
      dialogRef.current?.querySelector(".workflow-canvas")?.focus(),
    );
  };
  const chooseNode = ({ definition, port }, clickPoint) => {
    if (readOnly || busy || !picker) return;
    if (definition.virtualInterface) {
      addNode(definition, picker.position);
      closePicker();
      return;
    }
    if (picker.connection) {
      const point =
        clickPoint?.x || clickPoint?.y
          ? clickPoint
          : pointer.current || { x: picker.x, y: picker.y };
      setPendingPlacement({
        definition,
        port,
        connection: picker.connection,
        point,
      });
      setError("");
      closePicker();
      return;
    }
    try {
      const result = addWorkflowNodeWithConnection(
        currentEditableGraph(),
        definition,
        picker.position,
        picker.connection,
        port,
        catalog.nodes,
        graphContext,
      );
      changeGraph(result.graph);
      select([result.node.id]);
      setPanel("node");
      setMobilePane("canvas");
      setError("");
      closePicker();
    } catch (cause) {
      setError(cause.message);
    }
  };
  const placePendingNode = (point) => {
    if (!pendingPlacement) return;
    try {
      const cursor = flow.screenToFlowPosition(point);
      const result = addWorkflowNodeWithConnection(
        currentEditableGraph(),
        pendingPlacement.definition,
        {
          x: cursor.x - PENDING_NODE_ANCHOR.x,
          y: cursor.y - PENDING_NODE_ANCHOR.y,
        },
        pendingPlacement.connection,
        pendingPlacement.port,
        catalog.nodes,
        graphContext,
      );
      changeGraph(result.graph);
      select([result.node.id]);
      setPanel("node");
      setMobilePane("canvas");
      setError("");
      setPendingPlacement(null);
    } catch (cause) {
      setError(cause.message);
    }
  };
  const finishConnection = (event, state) => {
    const start = connectionStart.current;
    connectionStart.current = null;
    if (
      !start ||
      start.connected ||
      state?.isValid ||
      state?.toNode ||
      state?.toHandle ||
      parseWorkflowInterfaceId(start.nodeId)
    )
      return;
    const point = event.changedTouches?.[0] || event;
    if (Math.hypot(point.clientX - start.x, point.clientY - start.y) < 4)
      return;
    const target =
      document.elementFromPoint?.(point.clientX, point.clientY) || event.target;
    if (!isWorkflowCanvasBlankTarget(target)) return;
    openPicker(
      { x: point.clientX, y: point.clientY },
      {
        nodeId: start.nodeId,
        handleId: start.handleId,
        handleType: start.handleType,
      },
    );
  };
  const rename = () => {
    if (menu?.nodeId) select([menu.nodeId]);
    setMenu(null);
    setPanel("node");
    setMobilePane("config");
    requestAnimationFrame(() =>
      dialogRef.current
        ?.querySelector(
          parseWorkflowInterfaceId(menu?.nodeId)
            ? '[aria-label="参数名称"]'
            : '[aria-label="节点名称"]',
        )
        ?.focus(),
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
    if (kind === "run") setSubmissionStep("validate");
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
        setSubmissionStep("start");
        const response = await workflowApi.run({
          graph: current.graph,
          title: current.title.trim(),
          permissions: usesKnowledge ? current.permissions : {},
          ...(template && !dirty
            ? { templateId: template.id, templateRevision: template.revision }
            : {}),
        });
        if (!alive.current) return false;
        const running = response.task || response;
        // Keep the editable draft and its save/undo history separate from the
        // immutable execution view. The detail refresh supplies its frozen inputs.
        setInitialTask({
          ...running,
          parameters: { ...running.parameters, graph: clone(current.graph) },
        });
        setViewMode("monitor");
        setGraphPath([]);
        setFollowTask(true);
        setFitRequest((current) => current + 1);
        setFocusRequest(null);
        setMonitorPositions({});
        setPanel("node");
        setMonitorView("overview");
        setMobilePane("canvas");
        setNotice("任务已启动，可实时查看各节点的处理进度和输出。");
        onChanged?.({ taskId: running.id });
      }
      return true;
    } catch (cause) {
      if (alive.current) setError(cause.message);
      return false;
    } finally {
      if (alive.current) {
        setBusy("");
        setSubmissionStep("");
      }
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
            normalizeGraph(undefined, catalog.settingsDefaults),
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
    if (pendingPlacement) {
      if (event.key === "Escape") {
        event.preventDefault();
        setPendingPlacement(null);
      }
      return;
    }
    if (event.isComposing || busy || readOnly || confirmation || menu || picker)
      return;
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

  const downloadResult = async (file) => {
    if (!file?.url || downloading) return;
    setDownloading(true);
    setError("");
    try {
      await downloadAttachmentResource(file.url, file.filename);
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setDownloading(false);
    }
  };

  const editAgain = () => {
    if (busy || loading) return;
    setViewMode("task-editor");
    setInitialTask(null);
    setMonitorView("overview");
    setMonitorPositions({});
    setFitRequest((current) => current + 1);
    setFocusRequest(null);
    setPanel("node");
    setMobilePane("canvas");
    setMenu(null);
    setError("");
    setNotice("可继续编辑工作流，再次开始会创建新的任务。");
    select(
      [
        editableGraph.nodes.some((node) => node.id === selected)
          ? selected
          : editableGraph.nodes[0]?.id,
      ].filter(Boolean),
    );
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
          if (pendingPlacement) setPendingPlacement(null);
          else if (!confirmation && !menu && !picker) close();
        }}
      >
        <header className="workflow-header">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <GitBranch className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <DialogTitle>
                {readOnly
                  ? "工作流任务监控"
                  : viewMode === "task-editor"
                    ? "编辑工作流"
                    : "创建任务模板"}
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
        {readOnly && (
          <nav
            className="workflow-monitor-tabs workflow-tabs"
            role="tablist"
            aria-label="任务监控页面"
          >
            <button
              type="button"
              role="tab"
              aria-selected={monitorView === "overview"}
              onClick={() => setMonitorView("overview")}
            >
              总览
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={monitorView === "logs"}
              onClick={() => setMonitorView("logs")}
            >
              日志
            </button>
          </nav>
        )}
        {(!readOnly || monitorView === "overview") && (
          <nav
            className="workflow-mobile-tabs workflow-tabs"
            aria-label="工作流编辑区域"
          >
            {[
              ...(!readOnly ? [["palette", "工作流设置"]] : []),
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
        )}
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
        ) : readOnly && monitorView === "logs" ? (
          <main className="workflow-log-page pretty-scrollbar">
            <WorkflowLogViewer
              taskId={task?.id}
              live={["running", "queued", "pending"].includes(task?.status)}
            />
          </main>
        ) : (
          <div
            className={`workflow-workspace mobile-${mobilePane} ${readOnly ? "is-monitor" : ""}`}
          >
            {!readOnly && (
              <WorkflowPalette
                controls={
                  <>
                    <label className="workflow-label">工作流模板</label>
                    <WorkflowSelect
                      label="选择工作流模板"
                      value={builtinTemplateId || template?.id || ""}
                      disabled={Boolean(busy || pendingPlacement)}
                      onChange={(id) => void loadTemplate(id)}
                      options={[
                        { value: "", label: "空白工作流" },
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
                          disabled={Boolean(busy || pendingPlacement)}
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
                            disabled={Boolean(busy || pendingPlacement)}
                            onClick={() => setConfirmation({ kind: "delete" })}
                          >
                            <Trash2 className="size-3" />
                            删除模板
                          </Button>
                        )}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <input
                        ref={importFileRef}
                        type="file"
                        accept="application/json,.json"
                        className="hidden"
                        aria-label="导入工作流 JSON 文件"
                        onChange={(event) => void importWorkflow(event)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={Boolean(busy || pendingPlacement)}
                        onClick={() => importFileRef.current?.click()}
                      >
                        导入 JSON
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={Boolean(busy || pendingPlacement)}
                        onClick={exportWorkflow}
                      >
                        导出 JSON
                      </Button>
                    </div>
                    <div className="my-4 space-y-2">
                      <label className="workflow-label">模板 / 任务名称</label>
                      <Input
                        aria-label="工作流名称"
                        value={title}
                        disabled={Boolean(busy || pendingPlacement)}
                        onChange={(event) =>
                          changeDraft({ ...draft, title: event.target.value })
                        }
                      />
                      <MultilineEditor
                        label="模板说明"
                        value={description}
                        rows={3}
                        disabled={Boolean(busy || pendingPlacement)}
                        onChange={(event) =>
                          changeDraft({
                            ...draft,
                            description: event.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                }
              />
            )}
            <main
              ref={canvasRef}
              className="workflow-canvas"
              aria-label="工作流画布"
              tabIndex={0}
              onPointerMove={(event) => {
                pointer.current = { x: event.clientX, y: event.clientY };
                if (readOnly && followTask) stopFollowingTask();
              }}
              onClickCapture={(event) => {
                if (
                  !pendingPlacement ||
                  event.button !== 0 ||
                  !event.target.closest(".react-flow") ||
                  event.target.closest(".react-flow__controls")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                placePendingNode({ x: event.clientX, y: event.clientY });
              }}
              onContextMenuCapture={(event) => {
                if (!pendingPlacement || !event.target.closest(".react-flow"))
                  return;
                event.preventDefault();
                event.stopPropagation();
                setPendingPlacement(null);
              }}
              onDoubleClick={(event) => {
                if (pendingPlacement) return;
                if (isWorkflowCanvasBlankTarget(event.target)) {
                  event.preventDefault();
                  openPicker({ x: event.clientX, y: event.clientY });
                }
              }}
            >
              <nav
                className="workflow-breadcrumbs nodrag nowheel"
                aria-label="子图路径"
                onPointerMove={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  disabled={Boolean(busy || pendingPlacement)}
                  onClick={() => navigateGraph([])}
                >
                  <GitBranch className="size-3" />
                  主工作流
                </button>
                {graphPath.map((id, index) => {
                  const parent = workflowGraphAtPath(
                    rootGraph,
                    graphPath.slice(0, index),
                  );
                  return (
                    <span key={graphPath.slice(0, index + 1).join("/")}>
                      <span aria-hidden="true">›</span>
                      <button
                        type="button"
                        aria-current={
                          index === graphPath.length - 1 ? "page" : undefined
                        }
                        disabled={Boolean(busy || pendingPlacement)}
                        onClick={() =>
                          navigateGraph(graphPath.slice(0, index + 1))
                        }
                      >
                        {parent?.nodes.find((node) => node.id === id)?.name ||
                          id}
                      </button>
                    </span>
                  );
                })}
                {!readOnly && interfaceContainer && (
                  <button
                    type="button"
                    disabled={Boolean(busy || pendingPlacement)}
                    onClick={() =>
                      void saveSubgraphTemplate(
                        interfaceContainer,
                        graphPath.slice(0, -1),
                      )
                    }
                  >
                    <Save className="size-3" />
                    保存当前子图模板
                  </button>
                )}
              </nav>
              <WorkflowCanvas
                key={graphPathKey}
                nodes={nodes}
                selectionRequest={selectionRequest}
                fitRequest={fitRequest}
                focusRequest={focusRequest}
                autoFollow={readOnly && followTask}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                minZoom={0.15}
                maxZoom={2}
                deleteKeyCode={null}
                multiSelectionKeyCode={["Control", "Meta"]}
                nodesDraggable={!busy && !pendingPlacement}
                nodesConnectable={!readOnly && !busy && !pendingPlacement}
                zoomOnDoubleClick={readOnly}
                edgesReconnectable={false}
                onPositionsCommit={commitPositions}
                onNodeDragStart={stopFollowingTask}
                onSelectionDragStart={stopFollowingTask}
                onNodeClick={(event, node) => {
                  setSelected(node.id);
                  if (!event.ctrlKey && !event.metaKey) {
                    setSelectedIds([node.id]);
                    setSelectedEdges([]);
                  }
                  setPanel("node");
                  if (readOnly) setMonitorView("overview");
                }}
                onNodeDoubleClick={(_event, node) => {
                  if (node.data.node?.kind === "subgraph") {
                    enterSubgraph(node.id);
                    return;
                  }
                  setSelected(node.id);
                  setPanel("node");
                  if (readOnly) setMonitorView("overview");
                  setMobilePane("config");
                }}
                onSelectionChange={selectionChanged}
                onPaneClick={() => {
                  if (pendingPlacement) return;
                  setSelected("");
                  setSelectedIds([]);
                  setSelectedEdges([]);
                  setMenu(null);
                  if (readOnly) setMonitorView("overview");
                }}
                onNodeContextMenu={(event, node) => {
                  if (!readOnly && !busy) {
                    if (!selectedIds.includes(node.id)) select([node.id]);
                    openMenu(event, { nodeId: node.id });
                  }
                }}
                onPaneContextMenu={(event) => {
                  if (pendingPlacement) return;
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
                  if (readOnly || busy || pendingPlacement) return;
                  if (connectionStart.current)
                    connectionStart.current.connected = true;
                  if (
                    parseWorkflowInterfaceId(connection.source) ||
                    parseWorkflowInterfaceId(connection.target)
                  ) {
                    connectInterface(connection);
                    return;
                  }
                  try {
                    if (
                      interfaceContainer?.subgraph.interface?.inputs?.some(
                        (entry) =>
                          entry.target?.nodeId === connection.target &&
                          entry.target.port ===
                            (connection.targetPort || connection.targetHandle),
                      )
                    )
                      throw new Error(
                        "此输入已由子图输入参数连接，请先断开参数连接。",
                      );
                    changeGraph((current) =>
                      connectWorkflow(
                        current,
                        connection,
                        catalog.nodes,
                        graphContext,
                      ),
                    );
                    setError("");
                  } catch (cause) {
                    setError(cause.message);
                  }
                }}
                onConnectStart={(event, params) => {
                  if (
                    readOnly ||
                    busy ||
                    pendingPlacement ||
                    !params.nodeId ||
                    !params.handleId
                  )
                    return;
                  const point = event.touches?.[0] || event;
                  setPicker(null);
                  setMenu(null);
                  connectionStart.current = {
                    ...params,
                    x: point.clientX,
                    y: point.clientY,
                    connected: false,
                  };
                }}
                onConnectEnd={finishConnection}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "copy";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (busy || readOnly || pendingPlacement) return;
                  const definition = paletteDefinitions.find(
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
              {pendingLink && (
                <svg
                  aria-label="待放置节点连接预览"
                  className="workflow-pending-link"
                >
                  <path d={pendingLink} />
                </svg>
              )}
              {pendingPlacement && (
                <div
                  ref={pendingNodeRef}
                  aria-label="待放置节点"
                  className="workflow-node pointer-events-none absolute z-20 opacity-80 shadow-lg"
                  style={{
                    left:
                      pendingPlacement.point.x -
                      PENDING_NODE_ANCHOR.x * zoom -
                      (dialogRef.current
                        ?.querySelector(".workflow-canvas")
                        ?.getBoundingClientRect().left || 0),
                    top:
                      pendingPlacement.point.y -
                      PENDING_NODE_ANCHOR.y * zoom -
                      (dialogRef.current
                        ?.querySelector(".workflow-canvas")
                        ?.getBoundingClientRect().top || 0),
                    transform: `scale(${zoom})`,
                    transformOrigin: "top left",
                  }}
                >
                  <div className="workflow-node-title">
                    <GitBranch className="size-4 text-primary" />
                    <strong>
                      {pendingPlacement.definition.display?.title}
                    </strong>
                  </div>
                  <p className="workflow-node-id">
                    {pendingPlacement.definition.display?.subtitle}
                  </p>
                  <div className="workflow-node-ports">
                    <div>
                      {(pendingPlacement.definition.inputs || []).map(
                        (port) => (
                          <div className="workflow-port" key={port.name}>
                            {port.display?.title}
                            {pendingPlacement.connection.handleType ===
                              "source" &&
                              pendingPlacement.port?.name === port.name && (
                                <span
                                  data-pending-handle
                                  className="workflow-pending-handle is-input"
                                />
                              )}
                          </div>
                        ),
                      )}
                    </div>
                    <div>
                      {(pendingPlacement.definition.outputs || []).map(
                        (port) => (
                          <div
                            className="workflow-port workflow-port-output"
                            key={port.name}
                          >
                            {port.display?.title}
                            {pendingPlacement.connection.handleType ===
                              "target" &&
                              pendingPlacement.port?.name === port.name && (
                                <span
                                  data-pending-handle
                                  className="workflow-pending-handle is-output"
                                />
                              )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    左键放置 · 右键取消
                  </p>
                </div>
              )}
              <div className="workflow-canvas-tools">
                {!readOnly && (
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="添加工作流节点"
                    title="搜索并添加节点"
                    disabled={Boolean(busy || pendingPlacement)}
                    onClick={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      openPicker({ x: rect.left, y: rect.bottom + 4 });
                    }}
                  >
                    <Plus className="size-4" />
                  </Button>
                )}
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
                      aria-label="将选中节点组合为子图"
                      title="组合为子图"
                      disabled={
                        Boolean(busy || pendingPlacement) || !selectedIds.length
                      }
                      onClick={groupSelection}
                    >
                      <Group className="size-4" />
                    </Button>
                    {selectedNode?.kind === "subgraph" &&
                      selectedNode.subgraph.initialized !== false && (
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="进入选中子图"
                          title="进入子图"
                          disabled={Boolean(busy || pendingPlacement)}
                          onClick={() => enterSubgraph(selectedNode.id)}
                        >
                          <FolderOpen className="size-4" />
                        </Button>
                      )}
                    <Button
                      variant="outline"
                      size="icon"
                      title="撤销 · Ctrl Z"
                      aria-label="撤销工作流修改"
                      disabled={
                        Boolean(busy || pendingPlacement) ||
                        !history.current.past.length
                      }
                      onClick={undo}
                    >
                      <Undo2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="重做 · Ctrl Shift Z"
                      aria-label="重做工作流修改"
                      disabled={
                        Boolean(busy || pendingPlacement) ||
                        !history.current.future.length
                      }
                      onClick={redo}
                    >
                      <Redo2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="删除选中节点或连接"
                      disabled={
                        Boolean(busy || pendingPlacement) ||
                        !(selectedIds.length || selectedEdges.length)
                      }
                      onClick={deleteSelected}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </>
                )}
              </div>
              {!nodes.length && (
                <div className="workflow-canvas-empty">
                  右键画布，添加输入、处理或输出节点。
                </div>
              )}
              {!readOnly && (
                <WorkflowContextMenu
                  menu={menu}
                  isInterface={Boolean(parseWorkflowInterfaceId(menu?.nodeId))}
                  hasClipboard={hasClipboard}
                  onClose={closeMenu}
                  onCopy={copy}
                  onPaste={() => paste()}
                  onDuplicate={duplicate}
                  onDelete={deleteSelected}
                  onRename={rename}
                  onGroup={groupSelection}
                  onUngroup={ungroupSelection}
                  onEnter={() => {
                    enterSubgraph(menu.nodeId);
                    setMenu(null);
                  }}
                  isSubgraph={graph.nodes.some(
                    (node) =>
                      node.id === menu?.nodeId &&
                      node.kind === "subgraph" &&
                      node.subgraph.initialized !== false,
                  )}
                  categories={paletteCategories}
                  definitions={paletteDefinitions}
                  onAddNode={(definition) => {
                    addNode(
                      definition,
                      flow.screenToFlowPosition({ x: menu.x, y: menu.y }),
                    );
                    setMenu(null);
                  }}
                  output={{
                    available: Boolean(
                      menuNode &&
                      catalogNode(catalog.nodes, menuNode)?.publicOutput,
                    ),
                    selected: (graph.outputNodes || []).includes(menu?.nodeId),
                  }}
                  onToggleOutput={(enabled) =>
                    toggleOutput(menu.nodeId, enabled)
                  }
                  onAdd={() => openPicker({ x: menu.x, y: menu.y })}
                  onPortMode={(mode) => {
                    if (menu?.port)
                      changeGraph((current) =>
                        setWorkflowPortMode(
                          current,
                          menu.nodeId,
                          menu.port.name,
                          mode,
                          {
                            ...(menu.port.schema || {}),
                            ...(catalogNode(
                              catalog.nodes,
                              current.nodes.find(
                                (node) => node.id === menu.nodeId,
                              ),
                            )?.inputSchema?.properties?.[menu.port.name] || {}),
                          },
                        ),
                      );
                    setMenu(null);
                  }}
                />
              )}
              {!readOnly && (
                <WorkflowNodePicker
                  picker={picker}
                  definitions={
                    picker?.connection ? catalog.nodes : paletteDefinitions
                  }
                  graph={graph}
                  context={graphContext}
                  onClose={closePicker}
                  onChoose={chooseNode}
                />
              )}
            </main>
            <aside className="workflow-inspector pretty-scrollbar">
              {readOnly ? (
                <WorkflowMonitorPanel
                  task={task}
                  node={selectedNode}
                  definition={
                    selectedNode &&
                    effectiveWorkflowDefinition(
                      selectedNode,
                      catalogNode(
                        catalog.nodes,
                        selectedNode,
                        graph,
                        new Set(),
                        graphContext,
                      ),
                    )
                  }
                  runtime={runtimeNodes[selected] || {}}
                  onEnterSubgraph={() => enterSubgraph(selected)}
                  stages={runtimeStages}
                  onOpenLogs={() => setMonitorView("logs")}
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
                    selectedInterfaceEntry ? (
                      <WorkflowInterfacePanel
                        key={selected}
                        entry={selectedInterfaceEntry}
                        direction={selectedInterface.direction}
                        graph={graph}
                        definitions={catalog.nodes}
                        context={graphContext}
                        disabled={Boolean(busy || pendingPlacement)}
                        onChange={(patch) =>
                          changeInterface(selectedInterface, patch)
                        }
                        onDelete={() => {
                          changeInterface(selectedInterface, null);
                          select([]);
                        }}
                        onConnect={(nodeId, port) =>
                          connectInterface(
                            selectedInterface.direction === "inputs"
                              ? {
                                  source: selected,
                                  sourcePort: "value",
                                  target: nodeId,
                                  targetPort: port,
                                }
                              : {
                                  source: nodeId,
                                  sourcePort: port,
                                  target: selected,
                                  targetPort: "value",
                                },
                          )
                        }
                      />
                    ) : selectedNode?.kind === "subgraph" ? (
                      <WorkflowSubgraphPanel
                        key={`${graphPathKey}/${selectedNode.id}`}
                        graph={graph}
                        node={selectedNode}
                        definitions={catalog.nodes}
                        context={graphContext}
                        onGraphChange={changeGraph}
                        parentInterface={
                          graphPath.length
                            ? workflowGraphAtPath(
                                rootGraph,
                                graphPath.slice(0, -1),
                              )?.nodes.find(
                                (node) => node.id === graphPath.at(-1),
                              )?.subgraph?.interface
                            : undefined
                        }
                        onEnter={() => enterSubgraph(selectedNode.id)}
                        onSaveTemplate={() => void saveSubgraphTemplate()}
                        onUpdateTemplate={() => void updateSubgraphTemplate()}
                        disabled={Boolean(busy || pendingPlacement)}
                      />
                    ) : selectedNode ? (
                      <WorkflowNodePanel
                        key={selectedNode.id}
                        graph={graph}
                        node={selectedNode}
                        definitions={catalog.nodes}
                        context={graphContext}
                        models={models}
                        onGraphChange={changeGraph}
                        onValidity={validity}
                        disabled={Boolean(busy || pendingPlacement)}
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
                        disabled={Boolean(busy || pendingPlacement)}
                        onValidity={(valid) => validity("global", valid)}
                        onChange={(settings) =>
                          changeGraph({ ...graph, settings })
                        }
                      />
                      {usesKnowledge && (
                        <JsonConfigEditor
                          label="生成知识的归属与共享"
                          schema={catalog.permissionsSchema || {}}
                          value={permissions}
                          readOnly={Boolean(busy || pendingPlacement)}
                          onStateChange={(state) =>
                            validity("permissions", state.valid !== false)
                          }
                          onChange={(values) =>
                            changeDraft({ ...draft, permissions: values })
                          }
                        />
                      )}
                      <JsonConfigEditor
                        label="模板共享成员"
                        schema={catalog.templateSharingSchema || {}}
                        value={templateSharing}
                        readOnly={
                          Boolean(busy || pendingPlacement) ||
                          template?.canManage === false
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
            {(error || (readOnly && refreshError)) && !loading && (
              <p role="alert" className="text-sm text-destructive">
                {error || (readOnly && refreshError)}
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
              <div className="flex max-h-32 max-w-full flex-wrap gap-2 overflow-y-auto">
                {workflowArtifacts(task?.result).map((file) => (
                  <Button
                    key={`${file.nodeId}:${file.artifactId}`}
                    variant="outline"
                    className="max-w-full"
                    disabled={downloading}
                    onClick={() => void downloadResult(file)}
                  >
                    {downloading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                    <span className="truncate">
                      {file.filename || "下载产物"}
                    </span>
                  </Button>
                ))}
              </div>
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
                variant={followTask ? "secondary" : "outline"}
                aria-pressed={followTask}
                title={
                  followTask
                    ? "持续定位已开启，点击关闭"
                    : "点击持续定位当前任务节点"
                }
                onClick={locateTask}
              >
                定位到任务
              </Button>
              <Button
                variant="outline"
                disabled={loading || Boolean(busy)}
                onClick={editAgain}
              >
                <Pencil className="size-4" />
                再次编辑
              </Button>
              <Button onClick={onClose}>关闭监控</Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={
                  loading ||
                  Boolean(busy || pendingPlacement) ||
                  !catalog.nodes.length
                }
                onClick={() => void action("validate")}
              >
                <Check className="size-4" />
                校验
              </Button>
              <Button
                variant="outline"
                disabled={
                  loading ||
                  Boolean(busy || pendingPlacement) ||
                  !catalog.nodes.length
                }
                onClick={() => void action("run")}
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )}
                直接开始任务
              </Button>
              <Button
                disabled={
                  loading ||
                  Boolean(busy || pendingPlacement) ||
                  !catalog.nodes.length
                }
                onClick={() => void action("save")}
              >
                <Save className="size-4" />
                保存模板预设
              </Button>
            </>
          )}
        </footer>
        {busy === "run" && (
          <div className="workflow-submitting" role="status" aria-live="polite">
            <div className="workflow-submitting-card">
              <Loader2 className="size-8 animate-spin text-primary" />
              <strong>
                {submissionStep === "start"
                  ? "正在提交并启动任务"
                  : "正在校验工作流"}
              </strong>
              <p>请稍候，任务启动后会自动打开执行监控。</p>
            </div>
          </div>
        )}
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
