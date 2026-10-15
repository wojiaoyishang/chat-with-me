import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import {
  bindWorkflowInput,
  nextWorkflowRepeatedItemId,
  setWorkflowRepeatedItems,
  workflowRepeatedItems,
} from "./workflowModel.js";

/** The same ordered list drives the displayed ports and backend collection. */
export default function WorkflowOrderedInputs({
  node,
  graph,
  definition,
  onGraphChange,
  disabled,
}) {
  const [dragging, setDragging] = useState(null);
  const repeated = definition.repeatedInputs;
  const items = workflowRepeatedItems(node, definition);
  const maxItems = repeated.maxItems || 32;
  const prefix = repeated.prefix || "item_";
  const update = (next) =>
    onGraphChange(setWorkflowRepeatedItems(graph, node.id, definition, next));
  const change = (id, patch) =>
    update(
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const move = (id, index) => {
    const from = items.findIndex((item) => item.id === id);
    if (from < 0 || index < 0 || index >= items.length || from === index)
      return;
    const next = [...items];
    next.splice(index, 0, next.splice(from, 1)[0]);
    update(next);
  };
  const bind = (name, value) =>
    onGraphChange(bindWorkflowInput(graph, node.id, name, value));
  return (
    <section className="workflow-ordered-inputs space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">内容顺序</h4>
        <span className="text-xs text-muted-foreground">
          {items.length} / {maxItems}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        按从上到下的顺序组合内容。拖动左侧手柄或使用上下按钮调整顺序，已有连线会保留。
      </p>
      <ol className="space-y-3">
        {items.map((item, index) => {
          const name = `${prefix}${item.id}`;
          const edge = graph.edges.find(
            (entry) => entry.target === node.id && entry.targetPort === name,
          );
          const source = graph.nodes.find((entry) => entry.id === edge?.source);
          const inline = node.inputs?.[name]?.type === "literal";
          const label =
            item.title ||
            `${repeated.kinds.find((kind) => kind.kind === item.kind)?.title} ${index + 1}`;
          return (
            <li
              key={item.id}
              data-input-id={item.id}
              className={`workflow-ordered-item rounded-xl border bg-background p-3 ${dragging === item.id ? "opacity-50" : ""}`}
              onDragOver={(event) => {
                if (dragging && !disabled) event.preventDefault();
              }}
              onDrop={(event) => {
                if (!dragging || disabled) return;
                event.preventDefault();
                move(dragging, index);
                setDragging(null);
              }}
            >
              <div className="mb-3 flex items-center gap-1">
                <button
                  type="button"
                  draggable={!disabled}
                  disabled={disabled}
                  className="workflow-ordered-grip flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground"
                  aria-label={`拖动 ${label}`}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", item.id);
                    setDragging(item.id);
                  }}
                  onDragEnd={() => setDragging(null)}
                >
                  <GripVertical className="size-4" />
                </button>
                <span className="mr-auto text-xs font-medium text-muted-foreground">
                  第 {index + 1} 项
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  aria-label={`上移 ${label}`}
                  disabled={disabled || index === 0}
                  onClick={() => move(item.id, index - 1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  aria-label={`下移 ${label}`}
                  disabled={disabled || index === items.length - 1}
                  onClick={() => move(item.id, index + 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive"
                  aria-label={`删除 ${label}`}
                  disabled={disabled || items.length <= (repeated.minItems || 1)}
                  onClick={() =>
                    update(items.filter((entry) => entry.id !== item.id))
                  }
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
                <Select
                  value={item.kind}
                  disabled={disabled}
                  onValueChange={(kind) => change(item.id, { kind })}
                >
                  <SelectTrigger
                    aria-label={`第 ${index + 1} 项类型`}
                    className="w-full min-w-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {repeated.kinds.map((kind) => (
                      <SelectItem key={kind.kind} value={kind.kind}>
                        {kind.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  aria-label={`第 ${index + 1} 项名称`}
                  value={item.title || ""}
                  placeholder="输入名称（可选）"
                  maxLength={100}
                  disabled={disabled}
                  onChange={(event) =>
                    change(item.id, { title: event.target.value })
                  }
                />
              </div>
              {item.kind === "text" ? (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      {inline ? "直接填写文本" : "连接文本输入节点"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      disabled={disabled}
                      onClick={() =>
                        bind(
                          name,
                          inline ? null : { type: "literal", value: "" },
                        )
                      }
                    >
                      {inline ? "改为连线" : "改为填写"}
                    </Button>
                  </div>
                  {inline && (
                    <MultilineEditor
                      label={label}
                      value={node.inputs[name].value || ""}
                      rows={3}
                      disabled={disabled}
                      onChange={(event) =>
                        bind(name, {
                          type: "literal",
                          value: event?.target?.value ?? event,
                        })
                      }
                    />
                  )}
                </div>
              ) : (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {item.kind === "source"
                    ? "在画布上连接附件或文档输入节点；附件中可选择图片、文本等文件。"
                    : "连接文档顺序解析或其他编排节点，在此位置展开其内容。"}
                </p>
              )}
              {edge && (
                <p
                  className="mt-2 truncate text-xs text-muted-foreground"
                  title={source?.name || edge.source}
                >
                  已连接：{source?.name || edge.source}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <div className="grid grid-cols-3 gap-2">
        {repeated.kinds.map((kind) => (
          <Button
            key={kind.kind}
            variant="outline"
            size="sm"
            className="min-w-0 px-2 text-xs"
            disabled={disabled || items.length >= maxItems}
            onClick={() =>
              update([
                ...items,
                { id: nextWorkflowRepeatedItemId(items), kind: kind.kind },
              ])
            }
          >
            <Plus className="size-3.5 shrink-0" />
            {kind.kind === "source" ? "附件 / 文档" : kind.title}
          </Button>
        ))}
      </div>
    </section>
  );
}
