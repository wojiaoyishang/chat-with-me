import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import WorkflowSchemaEditor from "./WorkflowSchemaEditor.jsx";
import {
  catalogNode,
  nodeCategory,
  normalizeWorkflowSchema,
  scalarSchema,
} from "./workflowModel.js";
import WorkflowDataField from "./WorkflowDataField.jsx";

function objectSchema(schema, names) {
  return {
    ...schema,
    properties: Object.fromEntries(
      Object.entries(schema.properties || {}).filter(([key]) =>
        names.includes(key),
      ),
    ),
    required: (schema.required || []).filter((key) => names.includes(key)),
  };
}

/** Constructor settings and documentation; invoke values live on the canvas. */
export default function WorkflowNodePanel({
  node,
  graph,
  definitions,
  models,
  onGraphChange,
  onValidity,
  disabled,
}) {
  const definition = catalogNode(definitions, node);
  const category = nodeCategory(definition, node);
  const schema = normalizeWorkflowSchema(
    definition?.constructorSchema ||
      definition?.configSchema || { type: "object", properties: {} },
  );
  const common = useMemo(
    () =>
      (definition?.commonFields || []).map((field) =>
        typeof field === "string" ? field : field.name,
      ),
    [definition],
  );
  const modelKeys = Object.keys(schema.properties || {}).filter((key) =>
    /modelId$/i.test(key),
  );
  const regularKeys = Object.keys(schema.properties || {}).filter(
    (key) =>
      !common.includes(key) &&
      !modelKeys.includes(key) &&
      !(
        node.kind === "extract" &&
        ["schemaId", "schemaRevision", "schemaText"].includes(key)
      ),
  );
  const update = (patch) =>
    onGraphChange({
      ...graph,
      nodes: graph.nodes.map((item) =>
        item.id === node.id ? { ...item, ...patch } : item,
      ),
    });
  const updateConfig = (config) => update({ config });
  if (!definition)
    return (
      <p className="text-sm text-destructive">
        节点定义不可用，请重新加载目录。
      </p>
    );
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-semibold">{definition.title}</h3>
        <p className="text-xs text-muted-foreground">
          {definition.className || node.kind} · v{node.version}
        </p>
        <label className="workflow-label">节点名称</label>
        <Input
          aria-label="节点名称"
          value={node.name || definition.title}
          disabled={disabled}
          onChange={(event) => update({ name: event.target.value })}
        />
        {node.inputKey && (
          <p className="text-xs text-muted-foreground">
            模板输入标识：{node.inputKey} · 改名不影响参数绑定
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {definition.description}
        </p>
      </section>
      {category === "source" ? (
        <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          输入值在画布节点内配置。快速创建任务时会根据这些输入节点生成填写表单。
        </p>
      ) : (
        <>
          <h4 className="text-sm font-semibold">类初始化设置</h4>
          {common.map((key) => {
            const property = scalarSchema(schema.properties?.[key] || {});
            const inherited = node.config?.[key] == null;
            const effective =
              graph.settings?.commonConfig?.[key] ?? property.default;
            return (
              <section className="space-y-2 rounded-lg border p-3" key={key}>
                <div className="flex items-center justify-between gap-2">
                  <label className="workflow-label m-0">
                    {property.title || key}
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-xs">
                    <Checkbox
                      aria-label={`${property.title || key} 遵循全局设置`}
                      checked={inherited}
                      disabled={disabled}
                      onCheckedChange={(value) =>
                        updateConfig({
                          ...node.config,
                          [key]: value
                            ? null
                            : (effective ?? (key === "modelId" ? "" : 1)),
                        })
                      }
                    />
                    遵循全局设置
                  </label>
                </div>
                {inherited ? (
                  <p className="text-xs text-muted-foreground">
                    全局值：
                    {key === "modelId"
                      ? models.find((model) => model.id === effective)?.name ||
                        effective ||
                        "自动选择模型"
                      : String(effective ?? "默认")}
                  </p>
                ) : key === "modelId" ? (
                  <WorkflowSelect
                    label={property.title || key}
                    value={node.config?.[key] || ""}
                    disabled={disabled}
                    options={[
                      { value: "", label: "自动选择可用模型" },
                      ...models.map((model) => ({
                        value: model.id,
                        label: model.name || model.title || model.id,
                      })),
                    ]}
                    onChange={(value) =>
                      updateConfig({ ...node.config, [key]: value })
                    }
                  />
                ) : (
                  <WorkflowDataField
                    kind={
                      property.type === "integer" ? "number" : property.type
                    }
                    label={property.title || key}
                    schema={property}
                    value={node.config?.[key]}
                    disabled={disabled}
                    compact
                    onChange={(value) =>
                      updateConfig({ ...node.config, [key]: value })
                    }
                  />
                )}
                {property.description && (
                  <p className="text-xs text-muted-foreground">
                    {property.description}
                  </p>
                )}
              </section>
            );
          })}
          {node.kind === "extract" && (
            <WorkflowSchemaEditor
              value={node.config || {}}
              onChange={updateConfig}
              disabled={disabled}
              onBusyChange={(busy) => onValidity(`schema:${node.id}`, !busy)}
            />
          )}
          {modelKeys
            .filter((key) => !common.includes(key))
            .map((key) => (
              <div className="space-y-2" key={key}>
                <label className="workflow-label">
                  {schema.properties[key].title || key}
                </label>
                <WorkflowSelect
                  label={schema.properties[key].title || key}
                  value={node.config?.[key] || ""}
                  disabled={disabled}
                  options={[
                    { value: "", label: "自动选择可用模型" },
                    ...models.map((model) => ({
                      value: model.id,
                      label: model.name || model.title || model.id,
                    })),
                  ]}
                  onChange={(value) =>
                    updateConfig({ ...node.config, [key]: value })
                  }
                />
              </div>
            ))}
          {regularKeys.length > 0 && (
            <JsonConfigEditor
              label="节点初始化参数"
              schema={objectSchema(schema, regularKeys)}
              value={Object.fromEntries(
                regularKeys
                  .filter((key) => Object.hasOwn(node.config || {}, key))
                  .map((key) => [key, node.config[key]]),
              )}
              readOnly={disabled}
              resetKey={node.id}
              onStateChange={(state) =>
                onValidity(`config:${node.id}`, state.valid !== false)
              }
              onChange={(next) =>
                updateConfig({
                  ...Object.fromEntries(
                    Object.entries(node.config || {}).filter(
                      ([key]) => !regularKeys.includes(key),
                    ),
                  ),
                  ...next,
                })
              }
            />
          )}
        </>
      )}
      <section className="space-y-3 border-t pt-4">
        <h4 className="text-sm font-semibold">节点信息</h4>
        {definition.documentation && (
          <MultilineEditor
            label="类与方法说明"
            value={
              typeof definition.documentation === "string"
                ? definition.documentation
                : Object.entries(definition.documentation)
                    .map(([name, text]) => `${name}\n${text}`)
                    .join("\n\n")
            }
            rows={8}
            readOnly
          />
        )}
        {[...(definition.inputs || []), ...(definition.outputs || [])].map(
          (port, index) => (
            <div className="text-xs" key={`${port.name}:${index}`}>
              <strong>{port.title || port.name}</strong>
              <span className="ml-2 text-muted-foreground">
                {port.name} · {port.type}
              </span>
              {port.description && (
                <p className="mt-1 text-muted-foreground">{port.description}</p>
              )}
            </div>
          ),
        )}
      </section>
    </div>
  );
}
