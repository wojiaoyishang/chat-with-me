import { useMemo, useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import WorkflowSourcePicker, {
  WorkflowSelect,
} from "./WorkflowSourcePicker.jsx";
import WorkflowSchemaEditor from "./WorkflowSchemaEditor.jsx";
import {
  bindWorkflowInput,
  catalogNode,
  connectWorkflow,
} from "./workflowModel.js";

function withoutProperties(schema, excluded) {
  return {
    ...schema,
    properties: Object.fromEntries(
      Object.entries(schema?.properties || {}).filter(
        ([key]) => !excluded.has(key),
      ),
    ),
    required: (schema?.required || []).filter((key) => !excluded.has(key)),
  };
}

export default function WorkflowNodePanel({
  graph,
  node,
  definitions,
  onGraphChange,
  onError,
  onValidity,
  models,
  disabled,
  onDelete,
  onDuplicate,
}) {
  const [tab, setTab] = useState("config");
  const definition = catalogNode(definitions, node);
  const schema = useMemo(() => {
    const excluded = new Set(
      node.kind === "input"
        ? ["sourceType", "text", "resources", "documentId", "revision"]
        : node.kind === "extract"
          ? ["schemaId", "schemaText", "schemaRevision"]
          : [],
    );
    for (const key of Object.keys(definition?.configSchema?.properties || {}))
      if (/modelId$/i.test(key)) excluded.add(key);
    return withoutProperties(
      definition?.configSchema || { type: "object" },
      excluded,
    );
  }, [definition, node.kind]);
  const updateConfig = (patch) =>
    onGraphChange({
      ...graph,
      nodes: graph.nodes.map((item) =>
        item.id === node.id ? { ...item, config: patch } : item,
      ),
    });
  const filtered = Object.fromEntries(
    Object.entries(node.config || {}).filter(([key]) =>
      Object.hasOwn(schema.properties || {}, key),
    ),
  );
  const properties = Object.keys(schema.properties || {});
  const modelFields = Object.entries(
    definition?.configSchema?.properties || {},
  ).filter(([key]) => /modelId$/i.test(key));
  if (!definition)
    return (
      <p className="text-sm text-destructive">
        节点定义不可用，请重新加载目录。
      </p>
    );
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 flex-1 truncate font-semibold">
            {definition.title}
          </h3>
          <Button
            aria-label="复制节点"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={onDuplicate}
          >
            <Copy className="size-4" />
          </Button>
          <Button
            aria-label="删除节点"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {node.id} · v{node.version}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {definition.description}
        </p>
      </div>
      <div className="workflow-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "config"}
          onClick={() => setTab("config")}
        >
          初始化参数
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "inputs"}
          onClick={() => setTab("inputs")}
        >
          调用变量
        </button>
      </div>
      {tab === "config" ? (
        <>
          {node.kind === "input" && (
            <WorkflowSourcePicker
              value={node.config || {}}
              onChange={updateConfig}
              disabled={disabled}
              onBusyChange={(busy) => onValidity(`upload:${node.id}`, !busy)}
            />
          )}
          {node.kind === "extract" && (
            <WorkflowSchemaEditor
              value={node.config || {}}
              onChange={updateConfig}
              disabled={disabled}
              onBusyChange={(busy) => onValidity(`schema:${node.id}`, !busy)}
            />
          )}
          {modelFields.map(([key, property]) => (
            <div className="space-y-2" key={key}>
              <label className="workflow-label">{property.title || key}</label>
              <WorkflowSelect
                label={property.title || key}
                value={node.config?.[key] || ""}
                disabled={disabled}
                onChange={(next) => {
                  const config = { ...node.config };
                  if (next) config[key] = next;
                  else delete config[key];
                  updateConfig(config);
                }}
                options={[
                  { value: "", label: "自动选择可用模型" },
                  ...models.map((model) => ({
                    value: model.id,
                    label: model.name || model.title || model.id,
                  })),
                  ...(node.config?.[key] &&
                  !models.some((model) => model.id === node.config[key])
                    ? [{ value: node.config[key], label: node.config[key] }]
                    : []),
                ]}
              />
              {property.description && (
                <p className="text-xs text-muted-foreground">
                  {property.description}
                </p>
              )}
            </div>
          ))}
          {properties.length > 0 && (
            <JsonConfigEditor
              label="节点初始化参数"
              value={filtered}
              schema={schema}
              readOnly={disabled}
              resetKey={node.id}
              onStateChange={(state) =>
                onValidity(`config:${node.id}`, state.valid !== false)
              }
              onChange={(next) =>
                updateConfig({
                  ...Object.fromEntries(
                    Object.entries(node.config || {}).filter(
                      ([key]) => !Object.hasOwn(schema.properties || {}, key),
                    ),
                  ),
                  ...next,
                })
              }
            />
          )}
          {!properties.length &&
            node.kind !== "input" &&
            node.kind !== "extract" &&
            !modelFields.length && (
              <p className="text-sm text-muted-foreground">
                该节点没有额外的初始化参数。
              </p>
            )}
        </>
      ) : (
        <div className="space-y-5">
          <p className="text-xs text-muted-foreground">
            初始化参数用于创建处理类；这里的变量在每次 invoke
            时传入。连线、常量和工作流变量互斥。
          </p>
          {(definition.inputs || []).map((port) => {
            const connection = graph.edges.find(
              (edge) =>
                edge.target === node.id && edge.targetPort === port.name,
            );
            const binding = node.inputs?.[port.name];
            const internal = ["source", "bundle", "extracted"].includes(
              port.type,
            );
            const mode = connection
              ? "connection"
              : binding?.type || "connection";
            const options = graph.nodes.flatMap((source) =>
              (catalogNode(definitions, source)?.outputs || [])
                .filter(
                  (output) => output.type === port.type || port.type === "any",
                )
                .filter(() => source.id !== node.id)
                .map((output) => ({
                  value: `${source.id}|${output.name}`,
                  label: `${catalogNode(definitions, source)?.title || source.id} (${source.id}) · ${output.title || output.name}`,
                })),
            );
            const bind = (next) =>
              onGraphChange(bindWorkflowInput(graph, node.id, port.name, next));
            return (
              <section
                className="space-y-2 rounded-lg border p-3"
                key={port.name}
              >
                <label className="workflow-label">
                  {port.title || port.name}
                  {port.required && " *"}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {port.type}
                  </span>
                </label>
                {port.description && (
                  <p className="text-xs text-muted-foreground">
                    {port.description}
                  </p>
                )}
                <WorkflowSelect
                  label={`${port.title || port.name} 传入方式`}
                  value={mode}
                  disabled={disabled}
                  onChange={(type) =>
                    bind(
                      type === "connection"
                        ? null
                        : type === "variable"
                          ? {
                              type,
                              name: Object.keys(graph.variables || {})[0] || "",
                            }
                          : {
                              type,
                              value:
                                port.type === "source-config"
                                  ? { sourceType: "file", resources: [] }
                                  : {},
                            },
                    )
                  }
                  options={[
                    {
                      value: "connection",
                      label:
                        node.kind === "input"
                          ? "使用初始化来源"
                          : "连接上游输出",
                    },
                    ...(!internal
                      ? [
                          { value: "literal", label: "固定值" },
                          { value: "variable", label: "工作流变量" },
                        ]
                      : []),
                  ]}
                />
                {mode === "connection" ? (
                  <WorkflowSelect
                    label={`${port.name} 上游节点`}
                    value={
                      connection
                        ? `${connection.source}|${connection.sourcePort}`
                        : ""
                    }
                    disabled={disabled}
                    onChange={(next) => {
                      if (!next) return bind(null);
                      const [source, sourcePort] = next.split("|");
                      try {
                        onGraphChange(
                          connectWorkflow(
                            graph,
                            {
                              source,
                              sourcePort,
                              target: node.id,
                              targetPort: port.name,
                            },
                            definitions,
                          ),
                        );
                      } catch (cause) {
                        onError(cause.message);
                      }
                    }}
                    options={[
                      {
                        value: "",
                        label: port.required
                          ? "请选择上游输出"
                          : "不传入（可选）",
                      },
                      ...options,
                    ]}
                  />
                ) : mode === "variable" ? (
                  <WorkflowSelect
                    label={`${port.name} 工作流变量`}
                    value={binding?.name || ""}
                    disabled={disabled}
                    onChange={(name) => bind({ type: "variable", name })}
                    options={[
                      { value: "", label: "请选择变量" },
                      ...Object.keys(graph.variables || {}).map((name) => ({
                        value: name,
                        label: name,
                      })),
                    ]}
                  />
                ) : port.type === "source-config" ? (
                  <WorkflowSourcePicker
                    value={binding?.value || {}}
                    onChange={(value) => bind({ type: "literal", value })}
                    disabled={disabled}
                    onBusyChange={(busy) =>
                      onValidity(`upload:${node.id}:${port.name}`, !busy)
                    }
                  />
                ) : (
                  <JsonConfigEditor
                    label={`${port.name} 固定值`}
                    value={binding?.value}
                    schema={
                      definition.inputSchema?.properties?.[port.name] || {
                        type: "object",
                      }
                    }
                    readOnly={disabled}
                    resetKey={`${node.id}:${port.name}`}
                    onStateChange={(state) =>
                      onValidity(
                        `input:${node.id}:${port.name}`,
                        state.valid !== false,
                      )
                    }
                    onChange={(value) => bind({ type: "literal", value })}
                  />
                )}
              </section>
            );
          })}
          {!definition.inputs?.length && (
            <p className="text-sm text-muted-foreground">
              该节点不接收调用变量。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
