import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import WorkflowSourcePicker, {
  WorkflowSelect,
} from "./WorkflowSourcePicker.jsx";
import { normalizeWorkflowSchema, scalarSchema } from "./workflowModel.js";

/** The same source values are edited on nodes and in quick template forms. */
export default function WorkflowDataField({
  kind,
  value,
  onChange,
  disabled,
  label = "输入内容",
  schema = {},
  compact = false,
  onBusyChange,
}) {
  schema = scalarSchema(normalizeWorkflowSchema(schema));
  if (kind === "attachments" || kind === "document" || kind === "input") {
    const config =
      kind === "attachments" ? { resources: value || [] } : value || {};
    return (
      <WorkflowSourcePicker
        value={config}
        fixedType={
          kind === "attachments"
            ? "file"
            : kind === "document"
              ? "document"
              : undefined
        }
        compact={compact}
        disabled={disabled}
        onBusyChange={onBusyChange}
        onChange={(next) =>
          onChange(
            kind === "attachments"
              ? next.resources || []
              : kind === "document"
                ? {
                    documentId: next.documentId || "",
                    revision: next.revision ?? null,
                  }
                : next,
          )
        }
      />
    );
  }
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
  if (["boolean", "bool"].includes(kind) || schema.type === "boolean")
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
  if (
    ["number", "int", "float", "integer"].includes(kind) ||
    ["number", "integer"].includes(schema.type)
  )
    return (
      <Input
        aria-label={label}
        type="number"
        value={value ?? ""}
        disabled={disabled}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === "integer" ? 1 : "any"}
        onChange={(event) =>
          onChange(event.target.value === "" ? "" : Number(event.target.value))
        }
      />
    );
  return (
    <MultilineEditor
      label={label}
      value={value ?? ""}
      rows={compact ? 3 : 6}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
