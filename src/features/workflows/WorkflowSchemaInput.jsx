import { useState } from "react";
import { Braces, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WorkflowSchemaEditor from "./WorkflowSchemaEditor.jsx";
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
  const definition = schema?.properties?.schemaText?.display || schema?.display;
  const changeBusy = (next) => {
    setBusy(next);
    onBusyChange?.(next);
  };
  const editor = (
    <WorkflowSchemaEditor
      value={value || {}}
      onChange={onChange}
      disabled={disabled}
      display={definition}
      rows={compact ? 10 : 7}
      onBusyChange={changeBusy}
    />
  );
  if (!compact) return editor;
  const text = value?.schemaText?.trim();
  const summary = text
    ? text.split("\n")[0]
    : value?.schemaId
      ? "已选择 Schema 模板"
      : "选择模板或编写 Schema";
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (!busy) setOpen(next);
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
      </PopoverContent>
    </Popover>
  );
}
