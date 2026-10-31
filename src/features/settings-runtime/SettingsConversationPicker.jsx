import { useState } from "react";
import { MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConversationsList from "@/components/sidebar/ConversationsList.jsx";

/** Reuse the shared conversation list in a selection-only, server-scoped mode. */
export default function SettingsConversationPicker({
  item,
  value,
  onChange,
  context = {},
}) {
  const [open, setOpen] = useState(false);
  const selected = (item.options || []).find(
    (option) => String(option.value) === String(value),
  );
  const unavailable = Boolean(value && (!selected || selected.disabled));
  const disabled = context.disabled || item.disabled;
  return (
    <div
      className="min-w-0 space-y-2 py-2"
      data-settings-conversation-picker="true"
    >
      <label className="text-sm font-medium">
        {item.text}
        {item.required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <Button
        type="button"
        variant="outline"
        className="h-auto min-h-11 w-full min-w-0 justify-start gap-3 px-3 py-2 text-left"
        disabled={disabled}
        aria-label={item.text || "选择会话"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1">
          <span className="block truncate">
            {selected?.label ||
              (value ? "已选会话暂不可用" : item.placeholder || "选择会话")}
          </span>
          {selected?.group && (
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {selected.group}
            </span>
          )}
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      </Button>
      {unavailable && (
        <p role="alert" className="text-xs text-destructive">
          目标已停止、失效或不可访问，请重新选择。原选择仍会保留。
        </p>
      )}
      {item.description && (
        <p className="text-xs leading-5 text-muted-foreground">
          {item.description}
        </p>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[min(600px,82dvh)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="shrink-0 border-b px-5 py-4 text-left">
            <DialogTitle>{item.text || "选择会话"}</DialogTitle>
            <DialogDescription>
              {item.pickerDescription ||
                "搜索名称或按分组选择，列表只显示当前有权使用的目标。"}
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            <ConversationsList
              selectionOptions={item.options || []}
              selectedConversationId={value}
              emptyLabel={item.emptyLabel || "暂无可用会话"}
              onSelect={(id) => {
                const candidate = (item.options || []).find(
                  (option) => String(option.value) === id,
                );
                if (!candidate || candidate.disabled) return;
                onChange(id);
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
