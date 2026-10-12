import { useEffect, useRef, useState } from "react";
import { FileInput, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import JsonConfigEditor from "@/components/setting/JsonConfigEditor.jsx";
import WorkflowDataField from "./WorkflowDataField.jsx";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import { workflowApi } from "./workflowApi.js";
import { clone, workflowInputFields } from "./workflowModel.js";
import { permissionsSchema } from "./workflowForms.js";
import "./workflow.css";

/** Templates expose source nodes as a form; quick runs never open a builder. */
export default function QuickTemplateRunDialog({
  request = {},
  onClose,
  onChanged,
}) {
  const [templates, setTemplates] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [templateId, setTemplateId] = useState(request.templateId || "");
  const [template, setTemplate] = useState(null);
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [title, setTitle] = useState("");
  const [permissions, setPermissions] = useState({
    sharingMembers: [],
    includeSources: true,
  });
  const [invalid, setInvalid] = useState(false);
  const [uploading, setUploading] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      workflowApi.templates(controller.signal),
      workflowApi.catalog(controller.signal),
    ])
      .then(([saved, catalog]) => {
        if (!controller.signal.aborted) {
          setTemplates(saved.templates || []);
          setDefinitions(catalog.nodes || []);
        }
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!templateId) {
      setTemplate(null);
      setFields([]);
      return;
    }
    const controller = new AbortController();
    setLoadingTemplate(true);
    setError("");
    workflowApi
      .template(templateId, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        const current = result.template;
        const inputFields =
          result.inputFields ||
          current.inputFields ||
          workflowInputFields(current.graph, definitions);
        setTemplate(current);
        setFields(inputFields);
        setValues(
          Object.fromEntries(
            inputFields.map((field) => [field.key, clone(field.default)]),
          ),
        );
        setTitle(current.title || "");
        setUploading({});
      })
      .catch((cause) => {
        if (!controller.signal.aborted) {
          setError(cause.message);
          setTemplate(null);
          setFields([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingTemplate(false);
      });
    return () => controller.abort();
  }, [templateId, definitions]);
  const submit = async () => {
    if (busy || !template || invalid || Object.values(uploading).some(Boolean))
      return;
    setBusy(true);
    setError("");
    try {
      for (const field of fields) {
        const value = values[field.key];
        if (
          field.required !== false &&
          (value == null ||
            value === "" ||
            (field.kind === "attachments" && !value.length) ||
            (field.kind === "document" && !value.documentId))
        )
          throw new Error(`请填写“${field.title || field.key}”。`);
      }
      const result = await workflowApi.run({
        templateId: template.id,
        templateRevision: template.revision,
        inputValues: values,
        title: title.trim() || template.title,
        permissions,
      });
      if (alive.current) onChanged?.({ taskId: result.task.id, monitor: true });
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="workflow-quick-dialog"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <header className="workflow-header">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileInput className="size-5 text-primary" />
          </div>
          <div>
            <DialogTitle>快速模板新建</DialogTitle>
            <DialogDescription className="mt-1">
              选择任务模板，填写输入值后开始执行。
            </DialogDescription>
          </div>
        </header>
        <div className="workflow-quick-body pretty-scrollbar">
          {loading ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              正在读取任务模板…
            </p>
          ) : (
            <>
              <label className="workflow-label">任务模板</label>
              <WorkflowSelect
                label="任务模板"
                value={templateId}
                onChange={setTemplateId}
                disabled={busy}
                options={[
                  { value: "", label: "请选择已保存的任务模板" },
                  ...templates.map((item) => ({
                    value: item.id,
                    label: `${item.title} · v${item.revision}`,
                  })),
                ]}
              />
              {!templates.length && (
                <p className="mt-3 text-sm text-muted-foreground">
                  尚无模板。请先通过“创建任务模板”保存一个工作流。
                </p>
              )}
              {loadingTemplate ? (
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  正在生成输入表单…
                </p>
              ) : (
                template && (
                  <>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <section className="mt-5 space-y-2">
                      <label className="workflow-label">任务名称</label>
                      <Input
                        aria-label="快速任务名称"
                        value={title}
                        disabled={busy}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </section>
                    <div className="mt-5 space-y-5">
                      {fields.map((field) => (
                        <section
                          className="workflow-quick-field"
                          key={field.key}
                        >
                          <h3 className="mb-2 text-sm font-semibold">
                            {field.title || field.key}
                            {field.required !== false && " *"}
                          </h3>
                          {field.description && (
                            <p className="mb-2 text-xs text-muted-foreground">
                              {field.description}
                            </p>
                          )}
                          <WorkflowDataField
                            kind={field.kind}
                            schema={field.schema}
                            label={field.title || field.key}
                            value={values[field.key]}
                            disabled={busy}
                            onChange={(value) =>
                              setValues((current) => ({
                                ...current,
                                [field.key]: value,
                              }))
                            }
                            onBusyChange={(value) =>
                              setUploading((current) => ({
                                ...current,
                                [field.key]: value,
                              }))
                            }
                          />
                        </section>
                      ))}
                      {!fields.length && (
                        <p className="text-sm text-muted-foreground">
                          该模板没有显式输入，使用预设值执行。
                        </p>
                      )}
                      <details className="rounded-lg border p-3">
                        <summary className="cursor-pointer text-sm font-medium">
                          生成知识的归属与共享
                        </summary>
                        <div className="mt-3">
                          <JsonConfigEditor
                            label="本次知识权限"
                            value={permissions}
                            schema={permissionsSchema}
                            readOnly={busy}
                            onChange={setPermissions}
                            onStateChange={(state) =>
                              setInvalid(state.valid === false)
                            }
                          />
                        </div>
                      </details>
                    </div>
                  </>
                )
              )}
            </>
          )}
        </div>
        <footer className="workflow-footer">
          <div className="min-w-0 flex-1">
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <Button variant="outline" disabled={busy} onClick={onClose}>
            取消
          </Button>
          <Button
            disabled={
              !template ||
              loading ||
              loadingTemplate ||
              busy ||
              invalid ||
              Object.values(uploading).some(Boolean)
            }
            onClick={() => void submit()}
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            创建并开始
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
