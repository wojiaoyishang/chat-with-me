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
  return (
    <div className="space-y-4">
      {Object.entries(normalized.properties || {}).map(([key, raw]) => {
        const property = scalarSchema(resolveWorkflowSchema(raw, rootSchema));
        return (
          <section className="space-y-2" key={key}>
            <label className="workflow-label">{property.title || key}</label>
            {property.type === "object" &&
            property.properties &&
            !property.ui?.widget ? (
              <WorkflowSettingsFields
                schema={property}
                rootSchema={rootSchema}
                value={value[key] || {}}
                disabled={disabled}
                models={models}
                onValidity={onValidity}
                onChange={(next) => onChange({ ...value, [key]: next })}
              />
            ) : (
              <WorkflowDataField
                schema={property}
                label={property.title || key}
                value={value[key]}
                disabled={disabled}
                models={models}
                onValidity={onValidity}
                onChange={(next) => onChange({ ...value, [key]: next })}
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
    </div>
  );
}
