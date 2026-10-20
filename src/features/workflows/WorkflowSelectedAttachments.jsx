import { useEffect, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  GripVertical,
  ImageOff,
  Loader2,
  Paperclip,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient.js";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";
import WorkflowResourcePreview from "./WorkflowResourcePreview.jsx";

const artifactUri = (uri) =>
  typeof uri === "string" && /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/i.test(uri);

function SortableAttachmentRow({
  uri,
  index,
  count,
  item,
  unavailable,
  name,
  canReorder,
  onMove,
  onOpen,
  onRemove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: uri, disabled: !canReorder });

  return (
    <li
      ref={setNodeRef}
      className={
        canReorder
          ? `nodrag is-sortable${isDragging ? " is-dragging" : ""}`
          : undefined
      }
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...listeners}
    >
      {canReorder && (
        <button
          type="button"
          ref={setActivatorNodeRef}
          className="workflow-selected-attachment-grip nodrag"
          aria-label={`拖动 ${name} 调整顺序`}
          title="拖动调整顺序"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          {...attributes}
        >
          <GripVertical className="size-3.5" />
        </button>
      )}
      {canReorder && (
        <span className="workflow-selected-attachment-index">{index + 1}</span>
      )}
      <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="workflow-selected-attachment-name" title={item?.name || uri}>
        {name}
        {unavailable && <small>附件不可用或无权查看</small>}
      </span>
      {item?.id && !unavailable && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-6 shrink-0"
          aria-label={`查看 ${name}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onOpen(item)}
        >
          <Eye className="size-3.5" />
        </Button>
      )}
      {canReorder && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-6 shrink-0"
            aria-label={`上移 ${name}`}
            disabled={index === 0}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMove(uri, index - 1)}
          >
            <ArrowUp className="size-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-6 shrink-0"
            aria-label={`下移 ${name}`}
            disabled={index === count - 1}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMove(uri, index + 1)}
          >
            <ArrowDown className="size-3" />
          </Button>
        </>
      )}
      {onRemove && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-6 shrink-0"
          aria-label={`移除 ${uri}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onRemove(uri)}
        >
          <X className="size-3" />
        </Button>
      )}
    </li>
  );
}

/** Display confirmed resources even when their input is read-only. */
export default function WorkflowSelectedAttachments({
  resources = [],
  knownItems = {},
  onRemove,
  onReorder,
  disabled,
  onPreviewOpenChange,
}) {
  const selected = resources.filter((uri) => typeof uri === "string");
  // Changing only the order must not reload metadata or interrupt a preview.
  const signature = JSON.stringify(
    [...new Set(selected.filter(artifactUri))].sort(),
  );
  const [resolved, setResolved] = useState({
    signature: "",
    items: {},
    unavailable: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const previewChanged = useRef(onPreviewOpenChange);
  previewChanged.current = onPreviewOpenChange;

  useEffect(() => {
    const uris = JSON.parse(signature);
    const controller = new AbortController();
    setError("");
    if (!uris.length) {
      setLoading(false);
      setResolved({ signature, items: {}, unavailable: [] });
      return () => controller.abort();
    }
    setLoading(true);
    const read = async () => {
      try {
        const items = {};
        const unavailable = new Set();
        // Long selections use the same bounded metadata operation in batches.
        for (let offset = 0; offset < uris.length; offset += 100) {
          const batch = uris.slice(offset, offset + 100);
          const result = await apiClient.post(
            "/attachments/resolve",
            { uris: batch },
            { signal: controller.signal },
          );
          if (controller.signal.aborted) return;
          if (!Array.isArray(result.items))
            throw new Error("附件信息暂时无法读取。");
          for (const item of result.items) {
            if (batch.includes(item.uri)) items[item.uri] = item;
          }
          for (const uri of result.unavailable || []) {
            if (batch.includes(uri)) unavailable.add(uri);
          }
        }
        if (!controller.signal.aborted)
          setResolved({ signature, items, unavailable: [...unavailable] });
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void read();
    return () => controller.abort();
  }, [signature]);

  useEffect(() => {
    setPreviewItem(null);
    previewChanged.current?.(false);
  }, [signature]);
  useEffect(() => () => previewChanged.current?.(false), []);

  const current = resolved.signature === signature ? resolved : null;
  const itemFor = (uri) =>
    current?.unavailable.includes(uri)
      ? null
      : current?.items[uri] || knownItems[uri];
  const isUnavailable = (uri) =>
    !artifactUri(uri) || current?.unavailable.includes(uri);
  const open = (item) => {
    previewChanged.current?.(true);
    setPreviewItem(item);
  };
  const reorder = (uri, targetIndex) => {
    const sourceIndex = selected.indexOf(uri);
    if (
      !onReorder ||
      disabled ||
      sourceIndex < 0 ||
      targetIndex < 0 ||
      targetIndex >= selected.length ||
      sourceIndex === targetIndex
    )
      return;
    const next = [...selected];
    next.splice(targetIndex, 0, next.splice(sourceIndex, 1)[0]);
    onReorder(next);
  };
  const canReorder = Boolean(onReorder) && !disabled && selected.length > 1;
  const single = selected.length === 1 && itemFor(selected[0]);
  const singleImage = single?.type === "image" && !isUnavailable(selected[0]);
  const singleUrl = singleImage
    ? resolveResourceUrl(single.preview || single.uri)
    : "";
  useEffect(() => setImageFailed(false), [singleUrl]);
  if (!selected.length) return null;

  return (
    <section
      className="workflow-selected-attachments"
      aria-label="已选附件"
      aria-busy={loading}
    >
      {singleImage && singleUrl ? (
        <figure className="workflow-selected-image">
          <Button
            type="button"
            variant="ghost"
            className="workflow-selected-image-open nodrag nowheel"
            aria-label={`查看 ${single.name || "图片附件"}`}
            onClick={() => open(single)}
          >
            {imageFailed ? (
              <span className="workflow-selected-image-fallback">
                <ImageOff className="size-6" />
                图片预览不可用
              </span>
            ) : (
              <img
                src={singleUrl}
                alt={single.name || "已选图片"}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
            <span className="workflow-selected-image-eye">
              <Eye className="size-3.5" />
            </span>
          </Button>
          <figcaption>
            <span title={single.name || selected[0]}>
              {single.name || "图片附件"}
            </span>
            {onRemove && !disabled && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-6 shrink-0"
                aria-label={`移除 ${selected[0]}`}
                onClick={() => onRemove(selected[0])}
              >
                <X className="size-3" />
              </Button>
            )}
          </figcaption>
        </figure>
      ) : (
        <>
          {canReorder && (
            <p className="workflow-selected-order-hint">
              已选附件 · 拖动附件行或使用上下按钮调整顺序
            </p>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (over && active.id !== over.id)
                reorder(active.id, selected.indexOf(over.id));
            }}
          >
            <SortableContext
              items={selected}
              strategy={verticalListSortingStrategy}
            >
              <ul
                className="workflow-selected-attachment-list pretty-scrollbar"
                onDragStartCapture={(event) => event.preventDefault()}
              >
                {selected.map((uri, index) => {
                  const item = itemFor(uri);
                  return (
                    <SortableAttachmentRow
                      key={uri}
                      uri={uri}
                      index={index}
                      count={selected.length}
                      item={item}
                      unavailable={isUnavailable(uri)}
                      name={item?.name || item?.title || `附件 ${index + 1}`}
                      canReorder={canReorder}
                      onMove={reorder}
                      onOpen={open}
                      onRemove={onRemove && !disabled ? onRemove : undefined}
                    />
                  );
                })}
              </ul>
            </SortableContext>
          </DndContext>
        </>
      )}
      {loading && !single && (
        <p className="workflow-selected-attachment-status">
          <Loader2 className="size-3 animate-spin" />
          正在读取附件信息…
        </p>
      )}
      {error && (
        <p className="workflow-selected-attachment-status text-muted-foreground">
          {error}
        </p>
      )}
      {previewItem && (
        <WorkflowResourcePreview
          item={previewItem}
          sourceKind="attachment"
          onClose={() => {
            setPreviewItem(null);
            previewChanged.current?.(false);
          }}
        />
      )}
    </section>
  );
}
