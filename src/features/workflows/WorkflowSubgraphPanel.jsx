import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import WorkflowDataField from "./WorkflowDataField.jsx";
import {
  catalogNode,
  clone,
  workflowId,
  effectiveWorkflowDefinition,
  resolveWorkflowSchema,
} from "./workflowModel.js";

const keyFor = (values, prefix) => {
  let i = 1;
  while (values.some((value) => value.name === `${prefix}_${i}`)) i += 1;
  return `${prefix}_${i}`;
};

/** Public interfaces describe bindings; schemas always derive from child nodes. */
export default function WorkflowSubgraphPanel({
  node,
  graph,
  definitions,
  context = [],
  onGraphChange,
  disabled,
  onEnter,
  onSaveTemplate,
  onUpdateTemplate,
  parentInterface = {},
}) {
  const subgraph = node.subgraph;
  const inner = subgraph.graph;
  const contract = subgraph.interface || {
    inputs: [],
    outputs: [],
    parameters: [],
  };
  const update = (patch, nextGraph = graph, boundary) =>
    onGraphChange(
      {
        ...nextGraph,
        version: 3,
        nodes: nextGraph.nodes.map((item) =>
          item.id === node.id ? { ...item, ...patch } : item,
        ),
      },
      boundary,
    );
  const updateSubgraph = (patch) =>
    update({ subgraph: { ...subgraph, ...patch } });
  const updateContract = (key, values, patch = {}) =>
    update({
      ...patch,
      subgraph: { ...subgraph, interface: { ...contract, [key]: values } },
    });
  const endpointOptions = (direction) =>
    inner.nodes.flatMap((child) => {
      const definition = effectiveWorkflowDefinition(
        child,
        catalogNode(definitions, child, inner, new Set(), [
          ...context,
          { container: node, graph },
        ]),
      );
      return (definition?.[direction] || []).map((port) => ({
        value: `${child.id}\u0000${port.name}`,
        nodeId: child.id,
        port: port.name,
        schema: port.schema || {},
        label: `${child.name || definition.display?.title || child.id} · ${port.display?.title || port.name} (${port.type})`,
      }));
    });
  const parameterOptions = inner.nodes.flatMap((child) => {
    const definition = catalogNode(definitions, child),
      schema = definition?.configSchema || {};
    return Object.entries(schema.properties || {}).map(([field, property]) => ({
      value: `${child.id}\u0000${field}`,
      nodeId: child.id,
      field,
      schema: resolveWorkflowSchema(property, schema),
      label: `${child.name || definition?.display?.title || child.id} · ${property.display?.title || property.title || field}`,
    }));
  });
  const execution = {
    mode: "parallel",
    maxConcurrency: 4,
    ...subgraph.execution,
  };
  const assignedParameter = (option, exceptIndex = -1, exceptBinding = -1) =>
    (contract.parameters || []).some((parameter, index) =>
      (parameter.targets || []).some(
        (target, bindingIndex) =>
          !(index === exceptIndex && bindingIndex === exceptBinding) &&
          target.nodeId === option.nodeId &&
          target.field === option.field,
      ),
    );
  const order = [
    ...new Set([
      ...(execution.branchOrder || []),
      ...inner.nodes.map((child) => child.id),
    ]),
  ].filter((id) => inner.nodes.some((child) => child.id === id));
  const renamePort = (direction, index, name) => {
    if (
      !/^[A-Za-z0-9_-]{1,64}$/.test(name) ||
      contract[direction].some((item, i) => i !== index && item.name === name)
    )
      return;
    updateContract(
      direction,
      contract[direction].map((value, i) =>
        i === index ? { ...value, name } : value,
      ),
    );
  };
  const removePort = (direction, index) => {
    const entry = contract[direction][index];
    if (
      (parentInterface[direction] || []).some((binding) => {
        const endpoint =
          direction === "inputs" ? binding.target : binding.source;
        return endpoint?.nodeId === node.id && endpoint.port === entry.id;
      }) ||
      graph.edges.some((edge) =>
        direction === "inputs"
          ? edge.target === node.id && edge.targetPort === entry.id
          : edge.source === node.id && edge.sourcePort === entry.id,
      )
    )
      return;
    const inputs = { ...node.inputs };
    if (direction === "inputs") delete inputs[entry.id];
    updateContract(
      direction,
      contract[direction].filter((_, i) => i !== index),
      { inputs },
    );
  };
  const portSection = (direction, label) => {
    const options = endpointOptions(direction),
      entries = contract[direction] || [];
    const key = direction === "inputs" ? "target" : "source";
    return (
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">公开{label}</h4>
        {entries.map((entry, index) => {
          const connected =
            (parentInterface[direction] || []).some((binding) => {
              const endpoint =
                direction === "inputs" ? binding.target : binding.source;
              return endpoint?.nodeId === node.id && endpoint.port === entry.id;
            }) ||
            graph.edges.some((edge) =>
              direction === "inputs"
                ? edge.target === node.id && edge.targetPort === entry.id
                : edge.source === node.id && edge.sourcePort === entry.id,
            );
          const endpoint = `${entry[key]?.nodeId}\u0000${entry[key]?.port}`;
          return (
            <div
              className="space-y-2 rounded-lg border p-3"
              key={`${direction}-${index}`}
            >
              <Input
                aria-label={`${label} ${index + 1} 名称`}
                value={entry.title || ""}
                disabled={disabled}
                onChange={(event) =>
                  updateContract(
                    direction,
                    entries.map((item, i) =>
                      i === index
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
              />
              <MultilineEditor
                label={`${label} ${index + 1} 说明`}
                value={entry.description || ""}
                rows={2}
                disabled={disabled}
                onChange={(event) =>
                  updateContract(
                    direction,
                    entries.map((item, i) =>
                      i === index
                        ? { ...item, description: event.target.value }
                        : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`${label} ${index + 1} 标识`}
                value={entry.name}
                disabled={disabled}
                onChange={(event) =>
                  renamePort(direction, index, event.target.value)
                }
              />
              <select
                className="workflow-native-select"
                aria-label={`${label} ${index + 1} 内部端口`}
                value={endpoint}
                disabled={disabled || connected}
                onChange={(event) => {
                  const [nodeId, port] = event.target.value.split("\u0000");
                  updateContract(
                    direction,
                    entries.map((item, i) =>
                      i === index ? { ...item, [key]: { nodeId, port } } : item,
                    ),
                  );
                }}
              >
                {!options.some((option) => option.value === endpoint) && (
                  <option value={endpoint}>端口失效，请重新选择</option>
                )}
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="sm"
                disabled={disabled || connected}
                onClick={() => removePort(direction, index)}
              >
                <Trash2 className="size-3" />
                移除端口
              </Button>
              {connected && (
                <p className="text-xs text-muted-foreground">
                  端口已有外部连线。变更绑定或删除前，请先断开对应连接。
                </p>
              )}
            </div>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || !options.length}
          onClick={() => {
            const option = options.find(
              (candidate) =>
                !entries.some(
                  (entry) =>
                    entry[key]?.nodeId === candidate.nodeId &&
                    entry[key]?.port === candidate.port,
                ),
            );
            if (option)
              updateContract(direction, [
                ...entries,
                {
                  id: workflowId(),
                  name: keyFor(entries, direction === "inputs" ? "in" : "out"),
                  title: option.label.split(" · ").slice(1).join(" · "),
                  [key]: { nodeId: option.nodeId, port: option.port },
                },
              ]);
          }}
        >
          <Plus className="size-3" />
          公开{label}端口
        </Button>
      </section>
    );
  };
  if (subgraph.initialized === false)
    return (
      <div className="space-y-3">
        <h3 className="font-semibold">子图待配置</h3>
        <p className="text-sm text-muted-foreground">
          请在画布中的子图节点选择“新建子图”或“复制模板”，并手动确认。
          确认后即可进入子图编辑内部节点，或保存为模板。
        </p>
      </div>
    );
  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <h3 className="font-semibold">子图设置</h3>
        <Input
          aria-label="节点名称"
          value={node.name || ""}
          disabled={disabled}
          onChange={(event) => update({ name: event.target.value })}
        />
        <MultilineEditor
          label="子图说明"
          rows={3}
          value={subgraph.description || ""}
          disabled={disabled}
          onChange={(event) =>
            updateSubgraph({ description: event.target.value })
          }
        />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onEnter}>
            进入子图
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={onSaveTemplate}
          >
            保存为子图模板
          </Button>
          {subgraph.origin && (
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={onUpdateTemplate}
            >
              更新引用版本
            </Button>
          )}
        </div>
        {subgraph.origin && (
          <p className="break-all text-xs text-muted-foreground">
            引用模板 {subgraph.origin.templateId} · 固定版本{" "}
            {subgraph.origin.revision}
          </p>
        )}
      </section>
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">支路执行方式</h4>
        <select
          aria-label="子图执行方式"
          className="workflow-native-select"
          value={execution.mode}
          disabled={disabled}
          onChange={(event) =>
            updateSubgraph({
              execution: { ...execution, mode: event.target.value },
            })
          }
        >
          <option value="parallel">并行：无依赖的支路同时执行</option>
          <option value="serial">串行：按支路顺序执行</option>
        </select>
        {execution.mode === "parallel" ? (
          <WorkflowDataField
            label="子图最大并发"
            schema={{ type: "integer", minimum: 1, maximum: 16 }}
            value={execution.maxConcurrency}
            disabled={disabled}
            onChange={(value) =>
              updateSubgraph({
                execution: { ...execution, maxConcurrency: value },
              })
            }
          />
        ) : (
          <div className="space-y-1">
            {order.map((id, index) => (
              <div
                className="flex items-center gap-1 rounded border p-2"
                key={id}
              >
                <span className="min-w-0 flex-1 truncate text-xs">
                  {index + 1}.{" "}
                  {inner.nodes.find((child) => child.id === id)?.name || id}
                </span>
                {[-1, 1].map((offset) => (
                  <Button
                    key={offset}
                    size="icon"
                    variant="ghost"
                    aria-label={`${id} ${offset < 0 ? "上移" : "下移"}`}
                    disabled={disabled || !order[index + offset]}
                    onClick={() => {
                      const next = [...order];
                      [next[index], next[index + offset]] = [
                        next[index + offset],
                        next[index],
                      ];
                      updateSubgraph({
                        execution: { ...execution, branchOrder: next },
                      });
                    }}
                  >
                    {offset < 0 ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          真实连线依赖优先。并发同时受任务及模型预算限制；空支路与未选中的条件支路会明确跳过。
        </p>
      </section>
      {portSection("inputs", "输入")}
      {portSection("outputs", "输出")}
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">公开参数</h4>
        {(contract.parameters || []).map((parameter, index) => {
          const target = parameter.targets?.[0],
            selected = parameterOptions.find(
              (option) =>
                option.nodeId === target?.nodeId &&
                option.field === target?.field,
            );
          const modify = (patch, extra = {}) =>
            updateContract(
              "parameters",
              contract.parameters.map((entry, i) =>
                i === index ? { ...entry, ...patch } : entry,
              ),
              extra,
            );
          return (
            <div className="space-y-2 rounded-lg border p-3" key={index}>
              <Input
                aria-label={`公开参数 ${index + 1} 名称`}
                value={parameter.title || ""}
                disabled={disabled}
                onChange={(event) => modify({ title: event.target.value })}
              />
              <MultilineEditor
                label={`公开参数 ${index + 1} 说明`}
                value={parameter.description || ""}
                rows={2}
                disabled={disabled}
                onChange={(event) =>
                  modify({ description: event.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                标识：{parameter.id}
              </p>
              {(parameter.targets || []).map((binding, bindingIndex) => (
                <div className="flex items-center gap-1" key={bindingIndex}>
                  <select
                    aria-label={`参数 ${index + 1} 目标 ${bindingIndex + 1}`}
                    className="workflow-native-select min-w-0"
                    disabled={disabled}
                    value={`${binding.nodeId}\u0000${binding.field}`}
                    onChange={(event) => {
                      const [nodeId, field] =
                        event.target.value.split("\u0000");
                      const selectedOption = parameterOptions.find(
                        (option) =>
                          option.nodeId === nodeId && option.field === field,
                      );
                      const config = { ...node.config };
                      if (parameter.targets.length === 1)
                        delete config[parameter.id];
                      modify(
                        {
                          targets: parameter.targets.map((entry, i) =>
                            i === bindingIndex ? { nodeId, field } : entry,
                          ),
                          ...(parameter.targets.length === 1
                            ? {
                                default: clone(
                                  inner.nodes.find(
                                    (child) => child.id === nodeId,
                                  )?.config?.[field] ??
                                    selectedOption?.schema.default,
                                ),
                              }
                            : {}),
                        },
                        { config },
                      );
                    }}
                  >
                    {parameterOptions
                      .filter(
                        (option) =>
                          !assignedParameter(option, index, bindingIndex) &&
                          (parameter.targets.length === 1 ||
                            !selected ||
                            option.schema.type === selected.schema.type),
                      )
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={disabled || parameter.targets.length === 1}
                    aria-label={`删除参数目标 ${bindingIndex + 1}`}
                    onClick={() =>
                      modify({
                        targets: parameter.targets.filter(
                          (_, i) => i !== bindingIndex,
                        ),
                      })
                    }
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                disabled={
                  disabled ||
                  !selected ||
                  !parameterOptions.some(
                    (option) =>
                      !assignedParameter(option) &&
                      option.schema.type === selected.schema.type,
                  )
                }
                onClick={() => {
                  const candidate = parameterOptions.find(
                    (option) =>
                      option.schema.type === selected.schema.type &&
                      !assignedParameter(option),
                  );
                  if (candidate)
                    modify({
                      targets: [
                        ...parameter.targets,
                        { nodeId: candidate.nodeId, field: candidate.field },
                      ],
                    });
                }}
              >
                添加同类型目标
              </Button>
              <WorkflowDataField
                label={parameter.title || parameter.id}
                schema={selected?.schema || {}}
                value={
                  Object.hasOwn(node.config || {}, parameter.id)
                    ? node.config[parameter.id]
                    : parameter.default
                }
                disabled={disabled}
                onChange={(value) =>
                  update({
                    config: { ...node.config, [parameter.id]: value },
                  })
                }
              />
              <div className="flex flex-wrap gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={
                    disabled || !Object.hasOwn(node.config || {}, parameter.id)
                  }
                  onClick={() =>
                    modify({ default: clone(node.config[parameter.id]) })
                  }
                >
                  将当前值设为默认
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={
                    disabled || !Object.hasOwn(node.config || {}, parameter.id)
                  }
                  onClick={() => {
                    const config = { ...node.config };
                    delete config[parameter.id];
                    update({ config });
                  }}
                >
                  恢复默认值
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  const config = { ...node.config };
                  delete config[parameter.id];
                  updateContract(
                    "parameters",
                    contract.parameters.filter((_, i) => i !== index),
                    { config },
                  );
                }}
              >
                <Trash2 className="size-3" />
                移除参数
              </Button>
            </div>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          disabled={
            disabled ||
            !parameterOptions.some((option) => !assignedParameter(option))
          }
          onClick={() => {
            const option = parameterOptions.find(
                (candidate) => !assignedParameter(candidate),
              ),
              parameters = contract.parameters || [];
            updateContract("parameters", [
              ...parameters,
              {
                id: workflowId(),
                name: keyFor(parameters, "parameter"),
                title: option.label,
                default: clone(
                  inner.nodes.find((child) => child.id === option.nodeId)
                    ?.config?.[option.field] ?? option.schema.default,
                ),
                targets: [{ nodeId: option.nodeId, field: option.field }],
              },
            ]);
          }}
        >
          <Plus className="size-3" />
          公开内部参数
        </Button>
      </section>
    </div>
  );
}
