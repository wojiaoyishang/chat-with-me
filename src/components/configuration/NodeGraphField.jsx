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
  FolderOpen,
  Network,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  bindingState,
  childScopeNodeIds,
  graphScopes,
  layoutGraph,
  logicalParameters,
  reconcileDiagramNodes,
  scopeBreadcrumbs,
  scopeForNode,
  scopedGraph,
  toggleBinding,
  updateBindingMetadata,
  updateGraphPositions,
} from "./nodeGraphModel.js";
import "@xyflow/react/dist/style.css";

const preview = (value) =>
  String(typeof value === "object" ? JSON.stringify(value) : (value ?? ""))
    .replace(/\s+/g, " ")
    .slice(0, 110);

function DiagramNode({ data, selected }) {
  return (
    <div
      className={`w-56 rounded-xl border bg-card p-3 shadow-sm ${selected ? "border-primary ring-2 ring-primary/15" : "border-border"}`}
    >
      {data.targets.map((id, index) => (
        <Handle
          key={id}
          id={id}
          type="target"
          isConnectable={false}
          position={Position.Left}
          style={{ top: `${(100 * (index + 1)) / (data.targets.length + 1)}%` }}
        />
      ))}
      {data.sources.map((id, index) => (
        <Handle
          key={id}
          id={id}
          type="source"
          isConnectable={false}
          position={Position.Right}
          style={{ top: `${(100 * (index + 1)) / (data.sources.length + 1)}%` }}
        />
      ))}
      <div className="flex items-start justify-between gap-2">
        <strong className="break-words text-sm">
          {data.node.title || data.node.label || data.node.id}
        </strong>
        <span className="text-xs text-muted-foreground">#{data.node.id}</span>
      </div>
      {data.node.classType && (
        <p className="mt-1 break-all text-xs text-muted-foreground">
          {data.node.classType}
        </p>
      )}
      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
        {(data.node.inputs || [])
          .filter((field) => !field.linked)
          .slice(0, 2)
          .map((field) => (
            <p className="truncate" key={field.name}>
              <span className="font-medium">{field.label || field.name}</span> ·{" "}
              {preview(field.value)}
            </p>
          ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {data.bindingCount > 0 && (
          <Badge variant="secondary">{data.bindingCount} 个参数</Badge>
        )}
        {data.output && <Badge>产物</Badge>}
        {data.node.subgraphId && (
          <Badge variant="outline">子图 · {data.childCount}</Badge>
        )}
      </div>
      {data.node.subgraphId && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="nodrag mt-3 w-full"
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
const NODE_TYPES = { diagram: DiagramNode };
const EMPTY_ITEMS = [];

function GraphCanvas({
  graph,
  onChange,
  item,
  renderFields,
  context,
  disabled,
}) {
  const [scopeId, setScope] = useState("root");
  const [selectedId, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const flow = useReactFlow();
  const initialized = useNodesInitialized();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const host = useRef(null);
  const graphSource = useRef(graph.prompt ?? graph.id);
  const bindings = graph.bindings || EMPTY_ITEMS,
    outputs = graph.outputBindings || EMPTY_ITEMS;
  const layer = useMemo(() => scopedGraph(graph, scopeId), [graph, scopeId]);
  const enter = useCallback((id) => {
    setScope(String(id));
    setSelected(null);
    setSearch("");
  }, []);
  const selected = (graph.nodes || []).find(
    (node) => String(node.id) === selectedId,
  );
  const diagram = useMemo(
    () =>
      layoutGraph(
        layer.nodes,
        layer.edges,
        layer.nodes.every(
          (node) =>
            Number.isFinite(node.position?.x) &&
            Number.isFinite(node.position?.y),
        ),
      ).map((node) => {
        const related = node.subgraphId
          ? childScopeNodeIds(graph, node.subgraphId)
          : new Set([String(node.id)]);
        return {
          id: String(node.id),
          type: "diagram",
          position: node.position,
          selected: String(node.id) === selectedId,
          data: {
            node,
            onEnter: enter,
            childCount: node.subgraphId ? related.size : 0,
            bindingCount: new Set(
              bindings
                .filter((binding) => related.has(String(binding.nodeId)))
                .map((binding) => binding.name),
            ).size,
            output: outputs.some((output) =>
              related.has(String(output.nodeId)),
            ),
            sources: [
              ...new Set(
                layer.edges
                  .filter((edge) => String(edge.source) === String(node.id))
                  .map((edge) => String(edge.sourceHandle ?? "0")),
              ),
            ],
            targets: [
              ...new Set(
                layer.edges
                  .filter((edge) => String(edge.target) === String(node.id))
                  .map((edge) => String(edge.targetHandle ?? "input")),
              ),
            ],
          },
        };
      }),
    [layer, graph, selectedId, enter, bindings, outputs],
  );
  useEffect(() => {
    const source = graph.prompt ?? graph.id;
    const reset = source !== graphSource.current;
    graphSource.current = source;
    setNodes((current) => reconcileDiagramNodes(current, diagram, reset));
  }, [diagram, graph.prompt, graph.id, setNodes]);
  useEffect(() => {
    if (!initialized) return undefined;
    const frame = requestAnimationFrame(() => flow.fitView({ padding: 0.2 }));
    return () => cancelAnimationFrame(frame);
  }, [initialized, scopeId, flow]);
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return undefined;
    let frame;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => flow.fitView({ padding: 0.2 }));
    });
    if (host.current) observer.observe(host.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [flow]);
  const update = (patch) => onChange({ ...graph, ...patch });
  const focus = (id) => {
    setScope(scopeForNode(graph, id));
    setSelected(String(id));
    setSearch("");
    requestAnimationFrame(() =>
      flow.fitView({
        nodes: [{ id: String(id) }],
        maxZoom: 1,
        padding: 0.6,
        duration: 200,
      }),
    );
  };
  const query = search.trim().toLowerCase();
  const matches = query
    ? (graph.nodes || [])
        .filter((node) =>
          `${node.id} ${node.title || ""} ${node.classType || ""} ${(node.inputs || []).map((field) => preview(field.value)).join(" ")}`
            .toLowerCase()
            .includes(query),
        )
        .slice(0, 30)
    : [];
  const setOutput = (enabled) =>
    update({
      outputBindings: enabled
        ? [
            ...outputs,
            { ...selected.defaultOutput, nodeId: String(selected.id) },
          ]
        : outputs.filter(
            (entry) => String(entry.nodeId) !== String(selected.id),
          ),
    });
  const output = outputs.find((entry) => String(entry.nodeId) === selectedId);
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {graphScopes(graph).size > 1 && (
        <nav aria-label="图位置" className="flex flex-wrap items-center gap-1">
          {scopeBreadcrumbs(graph, scopeId).map((scope, index) => (
            <span className="flex items-center gap-1" key={scope.id}>
              {index > 0 && <ChevronRight className="size-3.5" />}
              <Button
                type="button"
                variant={scope.id === scopeId ? "secondary" : "ghost"}
                size="sm"
                onClick={() => enter(scope.id)}
              >
                {scope.title || scope.id}
              </Button>
            </span>
          ))}
        </nav>
      )}
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={item.searchPlaceholder || "搜索节点标题、ID 或内容"}
          />
          {query && (
            <div className="absolute top-full z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border bg-popover p-1 shadow-lg">
              {matches.length ? (
                matches.map((node) => (
                  <button
                    type="button"
                    key={node.id}
                    className="flex w-full items-center justify-between gap-3 rounded-lg p-2 text-left text-sm hover:bg-accent"
                    onClick={() => focus(node.id)}
                  >
                    <span className="truncate">
                      {node.title || node.label || node.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      #{node.id}
                    </span>
                  </button>
                ))
              ) : (
                <p className="p-3 text-sm text-muted-foreground">没有匹配项</p>
              )}
            </div>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => flow.fitView({ padding: 0.2, duration: 200 })}
        >
          查看全部
        </Button>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,1fr)_320px]">
        <div ref={host} className="min-h-[380px] bg-muted/15 lg:min-h-0">
          <ReactFlow
            nodes={nodes}
            nodeTypes={NODE_TYPES}
            onNodesChange={onNodesChange}
            edges={layer.edges.map((edge) => ({
              ...edge,
              id: String(
                edge.id ??
                  `${edge.source}:${edge.sourceHandle}-${edge.target}:${edge.targetHandle}`,
              ),
              source: String(edge.source),
              target: String(edge.target),
              sourceHandle: String(edge.sourceHandle ?? "0"),
              targetHandle: String(edge.targetHandle ?? "input"),
              type: "default",
            }))}
            onNodeClick={(_, node) => setSelected(node.id)}
            onNodeDoubleClick={(_, node) =>
              node.data.node.subgraphId && enter(node.data.node.subgraphId)
            }
            onNodeDragStop={() =>
              onChange(
                updateGraphPositions(
                  graph,
                  flow.getNodes(),
                  item.layoutStorage || "ui-workflow",
                ),
              )
            }
            nodesDraggable={!disabled}
            nodesConnectable={false}
            edgesFocusable={false}
            deleteKeyCode={null}
            minZoom={0.05}
            maxZoom={4}
            fitView
          >
            <Background gap={22} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <aside className="pretty-scrollbar max-h-[55vh] space-y-4 overflow-y-auto border-t bg-card p-4 lg:max-h-none lg:border-l lg:border-t-0">
          {selected ? (
            <>
              <div>
                <h3 className="break-words font-semibold">
                  {selected.title || selected.label || selected.id}
                </h3>
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {selected.classType || ""} · #{selected.id}
                </p>
                {selected.description && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {selected.description}
                  </p>
                )}
              </div>
              {selected.subgraphId && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => enter(selected.subgraphId)}
                >
                  <FolderOpen className="size-4" />
                  进入子图
                </Button>
              )}
              {(selected.inputs || []).map((field) => {
                const state = bindingState(bindings, field);
                const reusable = logicalParameters(bindings).filter(
                  (parameter) =>
                    (field.allowedKinds || []).some(
                      (kind) => (kind.value ?? kind) === parameter.kind,
                    ),
                );
                const options =
                  field.parameterOptions || graph.parameterOptions || [];
                return (
                  <section
                    key={field.name}
                    className="space-y-3 rounded-xl border p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className="break-all text-sm">
                        {field.label || field.name}
                      </strong>
                      {state.targets.length ? (
                        <Checkbox
                          disabled={disabled}
                          aria-label={`开放 ${field.label || field.name}`}
                          checked={
                            state.complete && !state.mixed
                              ? true
                              : state.entries.length
                                ? "indeterminate"
                                : false
                          }
                          onCheckedChange={(enabled) =>
                            update({
                              bindings: toggleBinding(
                                bindings,
                                field,
                                enabled === true,
                              ),
                            })
                          }
                        />
                      ) : (
                        <Badge variant="outline">
                          {field.linked ? "来自上游" : "只读"}
                        </Badge>
                      )}
                    </div>
                    {field.sourceNodeId != null && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => focus(field.sourceNodeId)}
                      >
                        <ArrowUpRight className="size-3.5" />
                        节点 #{field.sourceNodeId}
                      </Button>
                    )}
                    <p className="whitespace-pre-wrap break-all rounded-lg bg-muted/40 p-2 text-xs text-muted-foreground">
                      {preview(field.value) || "空值"}
                    </p>
                    {field.description && (
                      <p className="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    )}
                    {state.targets.length > 1 && (
                      <div className="flex flex-wrap gap-1">
                        {state.targets.map((target) => (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            key={`${target.nodeId}:${target.field}`}
                            onClick={() => focus(target.nodeId)}
                          >
                            #{target.nodeId} · {target.field}
                          </Button>
                        ))}
                      </div>
                    )}
                    {state.targets.length > 0 && reusable.length > 0 && (
                      <Select
                        value={
                          reusable.some(
                            (entry) => entry.name === state.binding?.name,
                          )
                            ? state.binding.name
                            : ":none"
                        }
                        onValueChange={(name) => {
                          const parameter = reusable.find(
                            (entry) => entry.name === name,
                          );
                          if (parameter)
                            update({
                              bindings: toggleBinding(
                                bindings,
                                field,
                                true,
                                parameter,
                              ),
                            });
                        }}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="复用已有参数" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=":none" disabled>
                            复用已有参数
                          </SelectItem>
                          {reusable.map((entry) => (
                            <SelectItem key={entry.name} value={entry.name}>
                              {entry.label || entry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {state.binding &&
                      renderFields(
                        options,
                        state.binding,
                        (next) =>
                          update({
                            bindings: updateBindingMetadata(
                              bindings,
                              field,
                              next,
                            ),
                          }),
                        {
                          key: `${selected.id}:${field.name}`,
                          disabled,
                          runtimeContext: context,
                          item: field,
                        },
                      )}
                  </section>
                );
              })}
              {selected.outputSelectable === true && (
                <section className="space-y-3 rounded-xl border p-3">
                  <label className="flex items-center justify-between gap-2 text-sm">
                    <span>{selected.outputLabel || "收集节点产物"}</span>
                    <Switch
                      disabled={disabled}
                      checked={Boolean(output)}
                      onCheckedChange={setOutput}
                    />
                  </label>
                  {output &&
                    renderFields(
                      selected.outputOptions || graph.outputOptions || [],
                      output,
                      (next) =>
                        update({
                          outputBindings: outputs.map((entry) =>
                            String(entry.nodeId) === selectedId
                              ? { ...next, nodeId: selectedId }
                              : entry,
                          ),
                        }),
                      {
                        key: `output:${selectedId}`,
                        disabled,
                        runtimeContext: context,
                        item: selected,
                      },
                    )}
                </section>
              )}
            </>
          ) : (
            <p className="flex min-h-40 items-center justify-center text-center text-sm text-muted-foreground">
              点击节点查看参数
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

/** A generic graph-valued form control. The server supplies all field, binding
 * and output policies; the client owns only visual navigation and interaction. */
export default function NodeGraphField({
  item,
  value,
  onChange,
  context,
  renderFields,
}) {
  const [open, setOpen] = useState(false);
  const graph = value && typeof value === "object" ? value : {};
  const disabled =
    item.disabled === true || item.readOnly === true || context?.disabled === true;
  return (
    <div className="space-y-3 rounded-xl border bg-muted/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            {item.text || item.title || "图配置"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {graph.nodes?.length || 0} 个节点 ·{" "}
            {logicalParameters(graph.bindings || []).length} 个参数 ·{" "}
            {graph.outputBindings?.length || 0} 个产物
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={!graph.nodes?.length}
          onClick={() => setOpen(true)}
        >
          <Network className="size-4" />
          {item.openLabel || "打开图配置"}
        </Button>
      </div>
      {item.description && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
      {graph.warnings?.length > 0 && (
        <ul className="list-inside list-disc text-xs text-amber-700 dark:text-amber-300">
          {graph.warnings.map((warning, index) => (
            <li key={index}>{String(warning)}</li>
          ))}
        </ul>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[min(850px,92dvh)] w-[96vw] max-w-none flex-col overflow-hidden sm:max-w-[1600px]">
          <DialogHeader>
            <DialogTitle>
              {item.dialogTitle || item.text || "图配置"}
            </DialogTitle>
            <DialogDescription>
              {item.dialogDescription ||
                "拖动节点调整布局，点击节点配置参数和产物。"}
            </DialogDescription>
          </DialogHeader>
          {/* Radix owns mounting, including its exit animation. Clearing the
              canvas on close would expose an empty window during that exit. */}
          <ReactFlowProvider>
            <GraphCanvas
              graph={graph}
              onChange={onChange}
              item={item}
              renderFields={renderFields}
              context={context}
              disabled={disabled}
            />
          </ReactFlowProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
