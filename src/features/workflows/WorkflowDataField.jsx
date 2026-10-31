import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import WorkflowSchemaInput from "./WorkflowSchemaInput.jsx";
import WorkflowModelQueue from "./WorkflowModelQueue.jsx";
import WorkflowModelOptions from "./WorkflowModelOptions.jsx";
import WorkflowKnowledgeChunkPicker, {
  WorkflowGraphDatabasePicker,
} from "./WorkflowKnowledgePicker.jsx";
import WorkflowSourcePicker, {
  WorkflowSelect,
} from "./WorkflowSourcePicker.jsx";
import {
  clone,
  normalizeWorkflowSchema,
  resolveWorkflowSchema,
  scalarSchema,
} from "./workflowModel.js";

/** The same source values are edited on nodes and in quick template forms. */
export default function WorkflowDataField({
  value,
  onChange,
  disabled,
  label = "输入内容",
  schema = {},
  rootSchema = schema,
  compact = false,
  onBusyChange,
  onValidity,
  models = [],
  fieldValues = {},
}) {
  schema = scalarSchema(
    resolveWorkflowSchema(normalizeWorkflowSchema(schema), rootSchema),
  );
  const widget = schema.ui?.widget;
  if (widget === "model-options")
    return <WorkflowModelOptions value={value} onChange={onChange} disabled={disabled}
      label={label} schema={schema} models={models}
      modelIds={fieldValues[schema.ui?.modelIdsField || "modelIds"] || []} />;
  if (widget === "graph-database-picker")
    return (
      <WorkflowGraphDatabasePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
        schema={schema}
      />
    );
  if (widget === "knowledge-chunk-picker")
    return (
      <WorkflowKnowledgeChunkPicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
        schema={schema}
        compact={compact}
      />
    );
  if (["model-queue", "model-list-picker"].includes(widget))
    return (
      <WorkflowModelQueue
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
        schema={schema}
        models={models}
      />
    );
  if (widget === "workflow-schema")
    return (
      <WorkflowSchemaInput
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
        schema={schema}
        compact={compact}
        onBusyChange={onBusyChange}
      />
    );
  if (
    [
      "resource-source-picker",
      "document-source-picker",
      "source-picker",
    ].includes(widget)
  ) {
    const resourceField = schema.ui?.valueField || "resources";
    const config =
      widget === "resource-source-picker"
        ? { [resourceField]: value || [] }
        : value || {};
    return (
      <WorkflowSourcePicker
        value={config}
        fixedType={
          widget === "resource-source-picker"
            ? "file"
            : widget === "document-source-picker"
              ? "document"
              : undefined
        }
        compact={compact}
        disabled={disabled}
        onBusyChange={onBusyChange}
        maxItems={
          widget === "resource-source-picker" ? schema.maxItems : undefined
        }
        sourceOptions={schema.ui?.sources || []}
        onChange={(next) =>
          onChange(
            widget === "resource-source-picker"
              ? next[resourceField] || []
              : clone(next),
          )
        }
      />
    );
  }
  if (widget === "model-picker")
    return (
      <WorkflowSelect
        label={label}
        value={value ?? ""}
        disabled={disabled}
        options={[
          { value: "", label: schema.ui?.emptyLabel || "自动选择可用模型" },
          ...models.map((model) => ({
            value: model.id,
            label: model.name || model.title || model.id,
          })),
        ]}
        onChange={onChange}
      />
    );
  if (schema.enum)
    return (
      <WorkflowSelect
        label={label}
        value={value ?? ""}
        disabled={disabled}
        onChange={(next) =>
          onChange(schema.enum.find((item) => String(item) === next) ?? next)
        }
        options={schema.enum.map((item, index) => ({
          value: String(item),
          label: schema.enumNames?.[index] || String(item),
        }))}
      />
    );
  if (schema.type === "boolean")
    return (
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs">{label}</span>
        <Switch
          aria-label={label}
          checked={Boolean(value)}
          disabled={disabled}
          onCheckedChange={onChange}
        />
      </div>
    );
  if (["number", "integer"].includes(schema.type))
    return (
      <Input
        aria-label={label}
        type="number"
        value={value ?? ""}
        disabled={disabled}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === "integer" ? 1 : "any"}
        onInput={(event) =>
          onChange(event.target.value === "" ? "" : Number(event.target.value))
        }
      />
    );
  if (schema.type === "string" && widget === "single-line")
    return (
      <Input
        aria-label={label}
        value={value ?? ""}
        disabled={disabled}
        maxLength={schema.maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  if (schema.type === "string")
    return (
      <MultilineEditor
        label={label}
        value={value ?? ""}
        rows={compact ? 3 : 6}
        disabled={disabled}
        maxLength={schema.maxLength}
        minLength={schema.minLength}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  return (
    <JsonConfigEditor
      label={label}
      schema={schema}
      value={value}
      readOnly={disabled}
      onChange={onChange}
      onStateChange={(state) => onValidity?.(state.valid !== false)}
    />
  );
}
