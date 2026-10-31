import WorkflowDataField from "./WorkflowDataField.jsx";
import {
  normalizeWorkflowSchema,
  resolveWorkflowSchema,
  scalarSchema,
} from "./workflowModel.js";

/** Render backend-defined settings without knowledge of business field names. */
export default function WorkflowSettingsFields({
  schema = {},
  rootSchema = schema,
  value = {},
  onChange,
  disabled,
  models = [],
  onValidity,
}) {
  const normalized = normalizeWorkflowSchema(schema);
  const current = value || {};
  return (
    <div className="space-y-4">
      {Object.entries(normalized.properties || {}).map(([key, raw]) => {
        const property = scalarSchema(resolveWorkflowSchema(raw, rootSchema));
        if (property.ui?.hidden) return null;
        return (
          <section className="space-y-2" key={key}>
            <label className="workflow-label">
              {property.display?.title || property.title || key}
            </label>
            {property.type === "object" &&
            property.properties &&
            !property.ui?.widget ? (
              <WorkflowSettingsFields
                schema={property}
                rootSchema={rootSchema}
                value={current[key] || {}}
                disabled={disabled}
                models={models}
                onValidity={onValidity}
                onChange={(next) => onChange({ ...current, [key]: next })}
              />
            ) : (
              <WorkflowDataField
                schema={property}
                rootSchema={rootSchema}
                label={property.display?.title || property.title || key}
                value={current[key] ?? property.default}
                disabled={disabled}
                models={models}
                fieldValues={current}
                onValidity={onValidity}
                onChange={(next) => onChange({ ...current, [key]: next })}
              />
            )}
            {(property.display?.description || property.description) && (
              <p className="text-xs text-muted-foreground">
                {property.display?.description || property.description}
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
