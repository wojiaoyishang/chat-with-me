import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import {
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  FolderOpen,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fieldSummary,
  inputKindsForField,
  layoutGraph,
  reconcileDiagramNodes,
  withNodePositions,
} from "./graphModel.js";
import {
  fieldBindingState,
  reusableParameters,
  setFieldBinding,
  updateFieldBinding,
} from "./bindingModel.js";
import BindingDefaultEditor from "./BindingDefaultEditor.jsx";
import ComfyParameterSummary from "./ComfyParameterSummary.jsx";
import {
  childScopeNodeIds,
  graphScopes,
  scopeBreadcrumbs,
  scopedGraph,
  scopeForNode,
} from "./scopeModel.js";
import "@xyflow/react/dist/style.css";
import "./comfyui.css";

function ComfyNode({ data, selected }) {
  const literals = data.node.inputs
    .filter((input) => !input.linked)
    .slice(0, 2);
  return (
    <div className={`comfy-node ${selected ? "is-selected" : ""}`}>
      {data.targetHandles.map((handle, index, handles) => (
        <Handle
          key={handle}
          type="target"
          position={Position.Left}
          id={handle}
          isConnectable={false}
          style={{ top: `${((index + 1) / (handles.length + 1)) * 100}%` }}
        />
      ))}
      {data.handles.map((handle, index) => (
        <Handle
          key={handle}
          type="source"
          position={Position.Right}
          id={handle}
          isConnectable={false}
          style={{ top: `${((index + 1) / (data.handles.length + 1)) * 100}%` }}
        />
      ))}
      <div className="comfy-node-title">
        {data.node.title || data.node.classType}
      </div>
      <div className="comfy-node-meta">
        {data.node.classType} <span>#{data.node.id}</span>
      </div>
      <div className="comfy-node-previews">
        {literals.map((field) => (
          <div key={field.name}>
            <span>{field.name}</span>
            <p>{fieldSummary(field.value) || "空值"}</p>
          </div>
        ))}
      </div>
      <div className="comfy-node-badges">
        {data.node.subgraphId ? (
          <Badge variant="outline">子图 · {data.childCount} 个节点</Badge>
        ) : (
          data.node.displayOnly && <Badge variant="outline">画布输入</Badge>
        )}
        {data.bindingCount > 0 && (
          <Badge variant="secondary">{data.bindingCount} 个输入</Badge>
        )}
        {data.output && <Badge>收集输出</Badge>}
      </div>
      {data.node.subgraphId && (
        <Button
          className="nodrag nowheel mt-3 w-full"
          size="sm"
          variant="outline"
          onClick={(event) => {
            event.stopPropagation();
            data.onEnter(data.node.subgraphId);
          }}
        >
          <FolderOpen className="size-3.5" />
          进入子图
        </Button>
      )}
    </div>
  );
}
const NODE_TYPES = { comfy: ComfyNode };

function Picker({
  graph,
  bindings,
  outputBindings,
  onBindingsChange,
  onOutputsChange,
  onInputBusyChange,
  onUiWorkflowChange,
  selectedId,
  onSelect,
  focusNodeId = null,
  showSummary = true,
}) {
  const [search, setSearch] = useState("");
  const [scopeId, setScopeId] = useState(() =>
    scopeForNode(graph, focusNodeId ?? selectedId),
  );
  const [pendingFocus, setPendingFocus] = useState(focusNodeId);
  const flow = useReactFlow();
  const diagramRef = useRef(null);
  const sourcePromptRef = useRef(graph.prompt);
  const focusTargetRef = useRef(focusNodeId);
  const nodesInitialized = useNodesInitialized();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const focusScopeId = scopeForNode(graph, focusNodeId);
  useEffect(() => {
    let frame;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        flow.fitView(
          focusTargetRef.current
            ? {
                nodes: [{ id: String(focusTargetRef.current) }],
                maxZoom: 1,
                padding: 0.8,
              }
            : { padding: 0.15 },
        ),
      );
    });
    if (diagramRef.current) observer.observe(diagramRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [flow]);
  useEffect(() => {
    focusTargetRef.current = focusNodeId;
    if (focusNodeId != null) {
      setScopeId(focusScopeId);
      setPendingFocus(focusNodeId);
    }
  }, [focusNodeId, focusScopeId]);
  useEffect(() => {
    if (!nodesInitialized) return undefined;
    const frame = requestAnimationFrame(() =>
      flow.fitView(
        pendingFocus == null
          ? { padding: 0.15 }
          : {
              nodes: [{ id: String(pendingFocus) }],
              maxZoom: 1,
              padding: 0.8,
            },
      ),
    );
    return () => cancelAnimationFrame(frame);
  }, [pendingFocus, scopeId, nodesInitialized, flow]);
  const layer = useMemo(() => scopedGraph(graph, scopeId), [graph, scopeId]);
  const breadcrumbs = scopeBreadcrumbs(graph, scopeId);
  const enterScope = useCallback(
    (id) => {
      if (!graphScopes(graph).has(String(id))) return;
      focusTargetRef.current = null;
      setPendingFocus(null);
      setScopeId(String(id));
      onSelect(null);
      setSearch("");
    },
    [graph, onSelect],
  );
  const selected = layer.nodes.find((node) => String(node.id) === selectedId);
  const diagram = useMemo(() => {
    const nodes = layoutGraph(
      layer.nodes,
      layer.edges,
      Boolean(
        graph.uiWorkflow?.nodes?.some((node) => node.type) ||
        layer.nodes.some((node) =>
          graph.uiWorkflow?.nodes?.some(
            (saved) => String(saved.id) === String(node.id),
          ),
        ) ||
        layer.nodes.some(
          (node) => graph.uiWorkflow?._cwm?.positions?.[node.id],
        ),
      ),
    );
    return nodes.map((node) => ({
      id: String(node.id),
      type: "comfy",
      position: node.position,
      selected: String(node.id) === selectedId,
      data: {
        node,
        onEnter: enterScope,
        targetHandles: [
          ...new Set([
            ...node.inputs
              .filter((field) => field.linked || field.origin)
              .map((field) => field.name),
            ...layer.edges
              .filter((edge) => String(edge.target) === String(node.id))
              .map((edge) => edge.targetHandle)
              .filter(Boolean),
          ]),
        ],
        childCount: node.subgraphId
          ? childScopeNodeIds(graph, node.subgraphId).size
          : 0,
        handles: [
          ...new Set(
            layer.edges
              .filter((edge) => String(edge.source) === String(node.id))
              .map((edge) => String(edge.sourceHandle ?? "0")),
          ),
        ],
        bindingCount: node.subgraphId
          ? new Set(
              bindings
                .filter((binding) =>
                  childScopeNodeIds(graph, node.subgraphId).has(
                    String(binding.nodeId),
                  ),
                )
                .map((binding) => binding.name),
            ).size
          : node.displayOnly
            ? new Set(
                bindings
                  .filter((binding) =>
                    node.inputs.some((field) =>
                      field.targets?.some(
                        (target) =>
                          String(target.nodeId) === String(binding.nodeId) &&
                          target.field === binding.field,
                      ),
                    ),
                  )
                  .map((binding) => binding.name),
              ).size
            : bindings.filter(
                (binding) => String(binding.nodeId) === String(node.id),
              ).length,
        output: outputBindings.some((binding) =>
          node.subgraphId
            ? childScopeNodeIds(graph, node.subgraphId).has(
                String(binding.nodeId),
              )
            : String(binding.nodeId) === String(node.id),
        ),
      },
    }));
  }, [graph, layer, bindings, outputBindings, selectedId, enterScope]);
  useEffect(() => {
    const resetPositions = sourcePromptRef.current !== graph.prompt;
    sourcePromptRef.current = graph.prompt;
    setNodes((current) =>
      reconcileDiagramNodes(current, diagram, resetPositions),
    );
  }, [diagram, graph.prompt, setNodes]);
  const savePositions = (_event, draggedNode, draggedNodes) => {
    const moved = new Map(
      (draggedNodes?.length ? draggedNodes : [draggedNode]).map((node) => [
        node.id,
        node,
      ]),
    );
    const arranged = flow.getNodes().map((node) => moved.get(node.id) || node);
    onUiWorkflowChange?.(withNodePositions(graph.uiWorkflow, arranged));
  };
  const select = (id) => {
    focusTargetRef.current = id;
    setPendingFocus(String(id));
    setScopeId(scopeForNode(graph, id));
    onSelect(String(id));
  };
  const update = (nodeId, fieldName, patch) => {
    const node = graph.nodes.find((item) => String(item.id) === String(nodeId));
    const field = node?.inputs.find((item) => item.name === fieldName);
    if (field)
      onBindingsChange(updateFieldBinding(bindings, node, field, patch));
  };
  const toggle = (node, field, checked) =>
    onBindingsChange(setFieldBinding(bindings, node, field, checked === true));
  const output = outputBindings.find(
    (binding) => String(binding.nodeId) === selectedId,
  );
  const results = search.trim()
    ? (graph.nodes || [])
        .filter((node) =>
          `${node.id} ${node.title} ${node.classType} ${node.inputs
            .filter((field) => !field.linked)
            .map((field) => fieldSummary(field.value))
            .join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
        .slice(0, 30)
    : [];
  return (
    <>
      {graphScopes(graph).size > 1 && (
        <nav className="comfy-scope-breadcrumbs" aria-label="子图位置">
          {breadcrumbs.map((scope, index) => (
            <span key={scope.id}>
              {index > 0 && <ChevronRight className="size-3.5 shrink-0" />}
              <Button
                size="sm"
                variant={scope.id === scopeId ? "secondary" : "ghost"}
                onClick={() => enterScope(scope.id)}
                aria-current={scope.id === scopeId ? "page" : undefined}
                title={scope.title || scope.id}
              >
                <span className="truncate">{scope.title || scope.id}</span>
              </Button>
            </span>
          ))}
          <span className="text-xs text-muted-foreground">
            {layer.nodes.length} 个节点
          </span>
        </nav>
      )}
      <div className="comfy-picker-toolbar">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜索节点标题、类型、ID 或内容"
          />
          {search && (
            <div className="comfy-search-results">
              {results.length ? (
                results.map((node) => (
                  <button
                    type="button"
                    key={node.id}
                    onClick={() => {
                      select(node.id);
                      setSearch("");
                    }}
                  >
                    <strong>{node.title || node.classType}</strong>
                    <span>
                      {node.classType} · #{node.id}
                      {node.scopeId &&
                        node.scopeId !== "root" &&
                        ` · ${scopeBreadcrumbs(graph, node.scopeId)
                          .map((scope) => scope.title)
                          .join(" / ")}`}
                    </span>
                  </button>
                ))
              ) : (
                <p>没有匹配的节点</p>
              )}
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            focusTargetRef.current = null;
            setPendingFocus(null);
            flow.fitView({ padding: 0.15, duration: 250 });
          }}
        >
          查看全部
        </Button>
      </div>
      <div className="comfy-picker-layout">
        <div className="comfy-diagram" ref={diagramRef}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            onNodeDragStop={savePositions}
            edges={layer.edges.map((edge) => ({
              ...edge,
              source: String(edge.source),
              target: String(edge.target),
              sourceHandle: String(edge.sourceHandle ?? "0"),
              targetHandle: edge.targetHandle,
              type: "default",
            }))}
            nodeTypes={NODE_TYPES}
            nodesDraggable
            nodesConnectable={false}
            edgesFocusable={false}
            deleteKeyCode={null}
            minZoom={0.05}
            maxZoom={4}
            zoomOnScroll
            zoomOnPinch
            panOnDrag
            fitView
            onNodeClick={(_, node) => onSelect(node.id)}
            onNodeDoubleClick={(_, node) =>
              node.data.node.subgraphId && enterScope(node.data.node.subgraphId)
            }
          >
            <Background gap={22} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <aside className="comfy-fields pretty-scrollbar">
          {selected ? (
            <>
              <div className="comfy-field-heading">
                <h3>{selected.title || selected.classType}</h3>
                <p>
                  {selected.classType} · 节点 #{selected.id}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {selected.subgraphId
                  ? "这是子图入口，进入后可配置内部执行节点的参数和输出。"
                  : selected.displayOnly
                    ? selected.readonly
                      ? "这是画布辅助节点，仅用于查看原始布局和连线。"
                      : "这是在 API 导出时展开的画布节点。开放输入会同时绑定下方列出的实际字段。"
                    : "选择需要开放的字段，也可复用已有参数，让一次输入填写多个节点。"}
              </p>
              {selected.subgraphId && (
                <Button
                  className="mt-3 w-full"
                  variant="outline"
                  onClick={() => enterScope(selected.subgraphId)}
                >
                  <FolderOpen className="size-4" />
                  进入子图
                </Button>
              )}
              {selected.inputs.map((field) => {
                const state = fieldBindingState(bindings, selected, field);
                const { binding, targets } = state;
                const reusable = reusableParameters(bindings, selected, field);
                return (
                  <div key={field.name} className="comfy-field">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-sm break-all">
                        {field.name}
                      </strong>
                      {field.linked ? (
                        <Badge variant="outline">来自上游</Badge>
                      ) : field.valueType === "json" || !targets.length ? (
                        <Badge variant="outline">仅展示</Badge>
                      ) : (
                        <Checkbox
                          checked={
                            state.complete && !state.mixed
                              ? true
                              : state.entries.length
                                ? "indeterminate"
                                : false
                          }
                          onCheckedChange={(checked) =>
                            toggle(selected, field, checked)
                          }
                          aria-label={`开放 ${field.name} 为输入参数`}
                        />
                      )}
                    </div>
                    {field.linked && field.sourceNodeId != null ? (
                      <Button
                        className="mt-2 w-full justify-start"
                        size="sm"
                        variant="outline"
                        onClick={() => select(field.sourceNodeId)}
                      >
                        <ArrowUpRight className="size-3.5" />
                        自动接收节点 #{field.sourceNodeId} · 输出{" "}
                        {field.sourceOutput}
                      </Button>
                    ) : field.linked ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        仅展示画布中的转接关系。
                      </p>
                    ) : (
                      <>
                        <div
                          className="comfy-literal"
                          title={
                            typeof field.value === "string"
                              ? field.value
                              : JSON.stringify(field.value)
                          }
                        >
                          {fieldSummary(field.value) || "空值"}
                        </div>
                        {selected.displayOnly && (
                          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
                            {targets.length ? (
                              <>
                                <p>
                                  已核对原画布连线，写入以下 {targets.length} 处
                                  API 字段：
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {targets.map((target) => (
                                    <Button
                                      key={`${target.nodeId}:${target.field}`}
                                      variant="outline"
                                      size="sm"
                                      onClick={() => select(target.nodeId)}
                                    >
                                      #{target.nodeId} · {target.field}
                                      <ArrowUpRight className="size-3" />
                                    </Button>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <p>
                                未能验证此画布节点与 API
                                字段的映射，请选择实际执行节点配置。
                              </p>
                            )}
                          </div>
                        )}
                        {field.origin && (
                          <Button
                            className="mt-2"
                            variant="ghost"
                            size="sm"
                            onClick={() => select(field.origin.nodeId)}
                          >
                            来自画布节点 #{field.origin.nodeId}
                            <ArrowUpRight className="size-3" />
                          </Button>
                        )}
                        {field.valueType === "json" && (
                          <p className="text-xs text-muted-foreground">
                            复合字段保留原值；当前支持开放文本、数字、布尔值和附件文件字段。
                          </p>
                        )}
                        {state.mixed && (
                          <p className="text-xs text-muted-foreground">
                            这些字段当前绑定了不同参数，勾选后可统一为一个输入。
                          </p>
                        )}
                        {targets.length > 0 && reusable.length > 0 && (
                          <label className="comfy-label mt-3">
                            复用已有参数
                            <Select
                              value={
                                reusable.some(
                                  (item) => item.name === binding?.name,
                                )
                                  ? binding.name
                                  : ":choose"
                              }
                              onValueChange={(name) => {
                                const shared = reusable.find(
                                  (item) => item.name === name,
                                );
                                if (shared) {
                                  const { targets: _targets, ...metadata } =
                                    shared;
                                  void _targets;
                                  onBindingsChange(
                                    setFieldBinding(
                                      bindings,
                                      selected,
                                      field,
                                      true,
                                      metadata,
                                    ),
                                  );
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value=":choose" disabled>
                                  选择同一输入要复用的参数
                                </SelectItem>
                                {reusable.map((item) => (
                                  <SelectItem key={item.name} value={item.name}>
                                    {item.label || item.name} · {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="text-xs font-normal text-muted-foreground">
                              运行时只填写一次；说明、类型和必填设置保持同步。
                            </span>
                          </label>
                        )}
                        {binding && (
                          <div className="space-y-3">
                            <label className="comfy-label">
                              参数标识
                              <Input
                                value={binding.name}
                                onChange={(event) =>
                                  update(selectedId, field.name, {
                                    name: event.target.value,
                                  })
                                }
                                placeholder="reference_image"
                              />
                            </label>
                            <label className="comfy-label">
                              显示名称
                              <Input
                                value={binding.label}
                                onChange={(event) =>
                                  update(selectedId, field.name, {
                                    label: event.target.value,
                                  })
                                }
                              />
                            </label>
                            <label className="comfy-label">
                              填写说明
                              <textarea
                                className="min-h-24 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={binding.description || ""}
                                onChange={(event) =>
                                  update(selectedId, field.name, {
                                    description: event.target.value,
                                  })
                                }
                                maxLength={10000}
                                placeholder="告诉 AI 应如何填写，可加入格式、限制、用途和示例。"
                              />
                            </label>
                            <label className="comfy-label">
                              接收内容
                              <Select
                                value={binding.kind}
                                onValueChange={(kind) =>
                                  update(selectedId, field.name, { kind })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {inputKindsForField(field).map((kind) => (
                                    <SelectItem
                                      key={kind.value}
                                      value={kind.value}
                                    >
                                      {kind.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </label>
                            <label className="flex items-center justify-between text-sm">
                              必填
                              <Switch
                                checked={Boolean(binding.required)}
                                onCheckedChange={(required) =>
                                  update(selectedId, field.name, { required })
                                }
                              />
                            </label>
                            <BindingDefaultEditor
                              binding={binding}
                              field={field}
                              onChange={(patch) =>
                                update(selectedId, field.name, patch)
                              }
                              onBusyChange={onInputBusyChange}
                            />
                            {["image", "video"].includes(binding.kind) && (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                运行时上传所选附件，并将返回的文件引用填入此字段。
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {!selected.displayOnly && (
                <div className="comfy-field">
                  <label className="flex items-center justify-between gap-2 text-sm font-medium">
                    收集此节点的输出
                    <Switch
                      checked={Boolean(output)}
                      onCheckedChange={(checked) =>
                        onOutputsChange(
                          checked
                            ? [
                                ...outputBindings,
                                { nodeId: selectedId, kind: "auto" },
                              ]
                            : outputBindings.filter(
                                (binding) =>
                                  String(binding.nodeId) !== selectedId,
                              ),
                        )
                      }
                    />
                  </label>
                  {output && (
                    <Select
                      value={output.kind}
                      onValueChange={(kind) =>
                        onOutputsChange(
                          outputBindings.map((binding) =>
                            String(binding.nodeId) === selectedId
                              ? { ...binding, kind }
                              : binding,
                          ),
                        )
                      }
                    >
                      <SelectTrigger className="mt-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">自动识别图片和视频</SelectItem>
                        <SelectItem value="image">图片</SelectItem>
                        <SelectItem value="video">视频</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    请选择会保存或返回文件的节点，中间张量无法直接作为附件收集。
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="comfy-picker-empty">
              <CircleHelp className="size-7" />
              <h3>点击节点配置参数</h3>
              <p>在左侧按标题和内容找到目标节点，再勾选具体字段。</p>
            </div>
          )}
        </aside>
      </div>
      {showSummary && (
        <ComfyParameterSummary bindings={bindings} onLocate={select} />
      )}
    </>
  );
}

export default function ComfyWorkflowPicker(props) {
  return (
    <ReactFlowProvider>
      <Picker {...props} />
    </ReactFlowProvider>
  );
}
