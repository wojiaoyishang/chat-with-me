import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import { workflowApi } from "./workflowApi.js";

/** Reference templates are explicit choices; no project schema is silently applied. */
export default function WorkflowSchemaEditor({
  value,
  onChange,
  disabled,
  onBusyChange,
}) {
  const [templates, setTemplates] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [title, setTitle] = useState("知识提取 Schema");
  const [editing, setEditing] = useState(null);
  const [text, setText] = useState(value.schemaText || "");
  const alive = useRef(true),
    latest = useRef({ value, onChange, onBusyChange });
  latest.current = { value, onChange, onBusyChange };
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      latest.current.onBusyChange?.(false);
    };
  }, []);
  useEffect(() => {
    latest.current.onBusyChange?.(busy);
  }, [busy]);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      workflowApi.schemaTemplates(controller.signal),
      workflowApi.schemas(controller.signal),
    ])
      .then(([references, mine]) => {
        if (!controller.signal.aborted) {
          setTemplates(references.templates || []);
          setSaved(mine.schemas || []);
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
    if (value.schemaText?.trim() || !value.schemaId)
      setText(value.schemaText || "");
    else {
      const item = value.schemaId?.startsWith("template:")
        ? templates.find((schema) => `template:${schema.id}` === value.schemaId)
        : saved.find((schema) => schema.id === value.schemaId);
      if (item) {
        setText(item.text || item.schemaText || "");
        setTitle(item.title);
        if (!value.schemaId.startsWith("template:")) setEditing(item);
      }
    }
  }, [value.schemaId, value.schemaText, templates, saved]);
  const choose = (id) => {
    setError("");
    setNotice("");
    const item = id.startsWith("template:")
      ? templates.find((schema) => `template:${schema.id}` === id)
      : saved.find((schema) => schema.id === id);
    setText(item?.text || "");
    if (item) setTitle(item.title);
    setEditing(item && !id.startsWith("template:") ? item : null);
    const next = { ...value };
    delete next.schemaText;
    delete next.schemaRevision;
    if (id) {
      next.schemaId = id;
      if (item?.revision) next.schemaRevision = item.revision;
    } else {
      delete next.schemaId;
      next.schemaText = "";
    }
    onChange(next);
  };
  const validate = async () => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await workflowApi.validateSchema(text);
      if (!alive.current) return;
      setNotice("Schema 校验通过。");
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  const save = async (update = false) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await workflowApi.validateSchema(text);
      if (!alive.current) return;
      const schema = await workflowApi.saveSchema(
        {
          title: title.trim(),
          text,
          description: "",
          ...(update && editing ? { revision: editing.revision } : {}),
        },
        update ? editing?.id : undefined,
      );
      const item = schema.schema || schema;
      if (!alive.current) return;
      setSaved((current) => [
        ...current.filter((entry) => entry.id !== item.id),
        item,
      ]);
      setEditing(item);
      const next = { ...latest.current.value, schemaId: item.id };
      delete next.schemaText;
      next.schemaRevision = item.revision;
      latest.current.onChange(next);
      setNotice("已保存为个人 Schema，可在其他工作流中复用。");
    } catch (cause) {
      if (alive.current) setError(cause.message);
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  return (
    <section className="space-y-3" aria-label="动态知识 Schema">
      <label className="workflow-label">知识 Schema</label>
      {loading ? (
        <p className="text-sm text-muted-foreground">正在加载参考模板…</p>
      ) : (
        <WorkflowSelect
          label="选择知识 Schema"
          value={value.schemaId || ""}
          disabled={disabled || busy}
          onChange={choose}
          options={[
            { value: "", label: "手动编写 Schema" },
            ...templates.map((item) => ({
              value: `template:${item.id}`,
              label: `参考 · ${item.title}`,
            })),
            ...saved.map((item) => ({
              value: item.id,
              label: `个人 · ${item.title}`,
            })),
          ]}
        />
      )}
      <p className="text-xs text-muted-foreground">
        选择参考模板后可以直接修改；修改内容随工作流保存，参考文件不会被覆盖。
      </p>
      <MultilineEditor
        label="Schema 定义"
        rows={12}
        value={text}
        disabled={disabled || busy}
        placeholder="请选择参考模板或填写 Schema"
        onChange={(event) => {
          const next = { ...value, schemaText: event.target.value };
          delete next.schemaId;
          delete next.schemaRevision;
          setText(event.target.value);
          onChange(next);
          setNotice("");
        }}
      />
      <Input
        aria-label="Schema 保存名称"
        value={title}
        disabled={disabled || busy}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || busy || !text.trim()}
          onClick={validate}
        >
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Check className="size-4" />
          )}
          校验 Schema
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || busy || !text.trim() || !title.trim()}
          onClick={() => save(false)}
        >
          <Save className="size-4" />
          另存 Schema
        </Button>
        {editing && (
          <Button
            variant="outline"
            size="sm"
            disabled={disabled || busy || !text.trim() || !title.trim()}
            onClick={() => save(true)}
          >
            <Save className="size-4" />
            更新 Schema
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="text-sm text-emerald-600">
          {notice}
        </p>
      )}
    </section>
  );
}
