import { useEffect, useState } from "react";
import { Braces, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WorkflowSchemaEditor from "./WorkflowSchemaEditor.jsx";
import { workflowApi } from "./workflowApi.js";
import "./workflow-schema-input.css";

/** The same schema value is edited in source nodes and quick task forms. */
export default function WorkflowSchemaInput({
  value = {},
  onChange,
  disabled,
  label,
  schema,
  compact,
  onBusyChange,
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(value || {});
  const [draftTitle, setDraftTitle] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const definition = schema?.properties?.schemaText?.display || schema?.display;
  const selectedId = value?.schemaId;
  useEffect(() => {
    if (!compact || !selectedId || selectedTitle?.id === selectedId) return;
    const controller = new AbortController();
    const reference = selectedId.startsWith("template:");
    const request = reference
      ? workflowApi.schemaTemplates(controller.signal)
      : workflowApi.schemas(controller.signal);
    request
      .then((result) => {
        if (controller.signal.aborted) return;
        const item = (
          (reference ? result.templates : result.schemas) || []
        ).find(
          (entry) =>
            (reference ? `template:${entry.id}` : entry.id) === selectedId,
        );
        setSelectedTitle({
          id: selectedId,
          title: item?.title || "已选择 Schema 模板",
        });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setSelectedTitle({ id: selectedId, title: "已选择 Schema 模板" });
      });
    return () => controller.abort();
  }, [compact, selectedId, selectedTitle]);
  const changeBusy = (next) => {
    setBusy(next);
    onBusyChange?.(next);
  };
  const editor = (
    <WorkflowSchemaEditor
      value={compact ? draft : value || {}}
      onChange={compact ? setDraft : onChange}
      disabled={disabled}
      display={definition}
      rows={compact ? 10 : 7}
      onBusyChange={changeBusy}
      onSelectionTitleChange={(id, title) =>
        setDraftTitle(id ? { id, title } : null)
      }
    />
  );
  if (!compact) return editor;
  const text = value?.schemaText?.trim();
  const summary = value?.schemaId
    ? selectedTitle?.id === value.schemaId
      ? selectedTitle.title
      : "正在读取 Schema 名称…"
    : text
      ? text.split("\n")[0]
      : "选择模板或编写 Schema";
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (busy) return;
        if (next) {
          setDraft(value || {});
          setDraftTitle(
            selectedTitle?.id === value?.schemaId ? selectedTitle : null,
          );
        }
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="workflow-schema-trigger w-full justify-start"
          aria-label={`配置${label || definition?.title || "Schema"}`}
        >
          <Braces className="size-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate" title={summary}>
            {summary}
          </span>
          <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        className="workflow-schema-popover nodrag nowheel pretty-scrollbar"
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        onInteractOutside={(event) => {
          if (busy) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        {editor}
        <div className="sticky bottom-0 mt-3 flex justify-end border-t bg-popover pt-3">
          <Button
            type="button"
            size="sm"
            disabled={busy}
            onClick={() => {
              if (!disabled) {
                onChange(draft);
                setSelectedTitle(
                  draft.schemaId && draftTitle?.id === draft.schemaId
                    ? draftTitle
                    : null,
                );
              }
              setOpen(false);
            }}
          >
            {disabled ? "关闭" : "确认选择"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
