import { useEffect, useRef, useState } from "react";
import {
  Eye,
  FileText,
  LayoutGrid,
  List,
  Loader2,
  Paperclip,
  Search,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import apiClient from "@/lib/apiClient.js";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";
import WorkflowResourcePreview from "./WorkflowResourcePreview.jsx";

function ResourceThumbnail({ item, sourceType }) {
  const url = item.preview ? resolveResourceUrl(item.preview) : "";
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setFailed(false); setLoaded(false); }, [url]);
  return (
    <span className={`workflow-resource-icon ${loaded && !failed ? "has-thumbnail" : ""}`} aria-hidden="true">
      {sourceType === "document" ? <FileText className="size-5" /> : <Paperclip className="size-5" />}
      {url && !failed && <img src={url} alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
    </span>
  );
}

export function WorkflowSelect({ value, onChange, options, label, disabled }) {
  const selected = value == null || value === "" ? "_none" : String(value);
  return (
    <Select
      value={selected}
      onValueChange={(next) => onChange(next === "_none" ? "" : next)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full" aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="workflow-select-content">
        {options.map((option) => (
          <SelectItem
            key={
              option.value == null || option.value === ""
                ? "_none"
                : String(option.value)
            }
            value={
              option.value == null || option.value === ""
                ? "_none"
                : String(option.value)
            }
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Keep the canvas node size stable while the account-scoped picker loads. */
export default function WorkflowSourcePicker({ compact = false, ...props }) {
  if (!compact || !props.fixedType)
    return <FullWorkflowSourcePicker {...props} compact={compact} />;

  return <CompactWorkflowSourcePicker {...props} />;
}

function CompactWorkflowSourcePicker(props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(props.value || {});
  const [busy, setBusy] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const count =
    props.fixedType === "document"
      ? Number(Boolean(props.value?.documentId))
      : props.value?.resources?.length || 0;
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (busy || previewOpen) return;
        if (next) setDraft(props.value || {});
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="workflow-source-trigger nodrag w-full justify-between"
          disabled={props.disabled}
          aria-label={
            props.fixedType === "document" ? "选择文档输入" : "选择附件输入"
          }
        >
          <span className="truncate">
            {props.fixedType === "document" ? "文档" : "附件"} · 已选择 {count}{" "}
            项
          </span>
          <Search className="size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="workflow-source-popover flex max-h-[min(540px,72vh)] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden p-0"
        onPointerDown={(event) => event.stopPropagation()}
        onInteractOutside={(event) => {
          if (busy || previewOpen) event.preventDefault();
        }}
        onFocusOutside={(event) => {
          if (previewOpen) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (busy || previewOpen) event.preventDefault();
        }}
      >
        <div className="min-h-0 overflow-y-auto p-3">
          <FullWorkflowSourcePicker
            {...props}
            value={draft}
            onChange={setDraft}
            onBusyChange={(next) => {
              setBusy(next);
              props.onBusyChange?.(next);
            }}
            onPreviewOpenChange={setPreviewOpen}
            compact={false}
          />
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 border-t px-3 py-2.5">
          <span className="text-xs text-muted-foreground">
            {props.fixedType === "document"
              ? draft.documentId
                ? "已选择 1 项"
                : "尚未选择"
              : `已选择 ${draft.resources?.length || 0} 项`}
          </span>
          <Button
            type="button"
            size="sm"
            disabled={busy}
            onClick={() => {
              if (!props.disabled) props.onChange(draft);
              setOpen(false);
            }}
          >
            {props.disabled ? "关闭" : "确认选择"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Uses the same account-scoped, paginated resources as the attachment page. */
function FullWorkflowSourcePicker({
  value,
  onChange,
  disabled,
  onBusyChange,
  onPreviewOpenChange,
  fixedType,
  sourceOptions = [],
  compact = false,
}) {
  const sourceType = fixedType || value.sourceType || sourceOptions[0]?.value;
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [resourceNames, setResourceNames] = useState({});
  const [previewItem, setPreviewItem] = useState(null);
  const upload = useRef(null);
  const activeUpload = useRef(null);
  const latest = useRef({ value, onChange });
  latest.current = { value, onChange };
  const busyChanged = useRef(onBusyChange);
  busyChanged.current = onBusyChange;
  useEffect(() => {
    busyChanged.current?.(uploading);
  }, [uploading]);
  useEffect(
    () => () => {
      activeUpload.current?.abort();
      busyChanged.current?.(false);
    },
    [],
  );

  useEffect(() => {
    if (sourceType === "text") return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query,
          offset: String(offset),
          limit: "12",
          kind: sourceType === "image" ? "image" : "",
          sort: "newest",
        });
        const result = await apiClient.get(
          `/attachments${sourceType === "document" ? "/documents" : ""}?${params}`,
          { signal: controller.signal },
        );
        if (!controller.signal.aborted) {
          setItems(result.items || []);
          setTotal(result.total || 0);
          setResourceNames((current) => ({
            ...current,
            ...Object.fromEntries(
              (result.items || []).flatMap((item) => [
                [item.id, item.title || item.name],
                [
                  item.uri || `cwm://artifact/${item.artifactId || item.id}`,
                  item.title || item.name,
                ],
              ]),
            ),
          }));
        }
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [sourceType, query, offset, refresh]);

  const pick = (item) => {
    if (sourceType === "document")
      onChange({
        ...value,
        documentId: item.id,
        revision: item.revision ?? undefined,
        documentTitle: undefined,
      });
    else {
      const uri = item.uri || `cwm://artifact/${item.artifactId || item.id}`;
      const current = value.resources || [];
      onChange({
        ...value,
        resources: current.includes(uri)
          ? current.filter((resource) => resource !== uri)
          : [...current, uri],
      });
    }
  };

  const uploadFiles = async (files) => {
    if (!files.length || uploading) return;
    setUploading(true);
    setError("");
    const controller = new AbortController();
    activeUpload.current = controller;
    const added = [];
    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        const result = await apiClient.post("/upload/", data, {
          signal: controller.signal,
        });
        const id = result.artifactId || result.serverId || result.id;
        if (!id && !result.uri)
          throw new Error(`“${file.name}”上传结果没有资源标识，请重试。`);
        added.push(result.uri || `cwm://artifact/${id}`);
        setResourceNames((current) => ({
          ...current,
          [added.at(-1)]: file.name,
        }));
      }
    } catch (cause) {
      if (!controller.signal.aborted) setError(cause.message);
    } finally {
      if (!controller.signal.aborted) {
        const current = latest.current;
        current.onChange({
          ...current.value,
          resources: [
            ...new Set([...(current.value.resources || []), ...added]),
          ],
        });
        setUploading(false);
        setRefresh((count) => count + 1);
      }
    }
  };

  return (
    <section
      className={`workflow-source space-y-3 ${compact ? "is-compact" : ""}`}
    >
      {!fixedType && (
        <>
          <label className="workflow-label">初始化来源</label>
          <WorkflowSelect
            label="初始化来源"
            value={sourceType}
            disabled={disabled || uploading}
            onChange={(next) => {
              setOffset(0);
              setQuery("");
              onChange({ ...value, sourceType: next });
            }}
            options={sourceOptions}
          />
        </>
      )}
      {sourceType === "text" ? (
        <MultilineEditor
          label="初始化文本"
          rows={9}
          value={value.text || ""}
          disabled={disabled}
          onChange={(event) => onChange({ ...value, text: event.target.value })}
        />
      ) : (
        <>
          <div className="flex min-w-0 gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                aria-label="搜索输入资源"
                className={sourceType === "document" ? "pl-9" : "pl-9 pr-11"}
                value={query}
                placeholder={
                  sourceType === "document" ? "搜索文档名称" : "搜索附件名称"
                }
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOffset(0);
                }}
              />
              {sourceType !== "document" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 size-7"
                  disabled={disabled || uploading}
                  onClick={() => upload.current?.click()}
                  aria-label="上传文件"
                >
                  {uploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </Button>
              )}
            </div>
            {sourceType === "document" && value.documentId && (
              <div className="flex items-center gap-2 rounded-md bg-primary/5 px-2 py-2 text-xs">
                <FileText className="size-4 text-primary" />
                <span className="min-w-0 flex-1 truncate">
                  {resourceNames[value.documentId] || "已选择整个文档"}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-6"
                  disabled={disabled}
                  aria-label="清除文档选择"
                  onClick={() => {
                    const next = { ...value };
                    delete next.documentId;
                    delete next.revision;
                    onChange(next);
                  }}
                >
                  <X className="size-3" />
                </Button>
              </div>
            )}
            <input
              ref={upload}
              hidden
              type="file"
              multiple
              accept={sourceType === "image" ? "image/*" : undefined}
              onChange={(event) => {
                void uploadFiles([...event.target.files]);
                event.target.value = "";
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 text-xs text-muted-foreground">
              {sourceType === "document"
                ? "选择文档全部内容；任务启动时固定内容版本。"
                : "附件会在任务启动时固定版本。"}{" "}
              共 {total} 项
            </p>
            <div className="workflow-resource-view-switch flex shrink-0 items-center rounded-md border bg-muted/40 p-0.5" role="group" aria-label="资源视图">
              <Button type="button" size="icon" variant={view === "list" ? "secondary" : "ghost"} className="size-7" aria-label="列表视图" aria-pressed={view === "list"} onClick={() => setView("list")}><List className="size-4" /></Button>
              <Button type="button" size="icon" variant={view === "grid" ? "secondary" : "ghost"} className="size-7" aria-label="网格视图" aria-pressed={view === "grid"} onClick={() => setView("grid")}><LayoutGrid className="size-4" /></Button>
            </div>
          </div>
          <div className="workflow-resource-list relative" aria-busy={loading}>
            <div className={`workflow-resource-results ${view === "grid" ? "is-grid" : "is-list"}`}>
              {items.map((item) => {
                const uri =
                  item.uri || `cwm://artifact/${item.artifactId || item.id}`;
                const selected =
                  sourceType === "document"
                    ? value.documentId === item.id
                    : (value.resources || []).includes(uri);
                return (
                  <div
                    key={item.id}
                    className={`workflow-resource-choice ${selected ? "is-selected" : ""}`}
                  >
                    <Checkbox
                      className="workflow-resource-check"
                      checked={selected}
                      disabled={disabled || uploading || loading}
                      aria-label={`选择 ${item.title || item.name || item.id}`}
                      onCheckedChange={() => pick(item)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="workflow-resource-pick"
                      aria-pressed={selected}
                      disabled={disabled || uploading || loading}
                      onClick={() => pick(item)}
                    >
                      <ResourceThumbnail item={item} sourceType={sourceType} />
                      <span className="workflow-resource-name" title={item.title || item.name || item.id}>
                        {item.title || item.name || item.id}
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="workflow-resource-preview size-8"
                      aria-label={`查看 ${item.title || item.name || item.id}`}
                      title={
                        sourceType === "document"
                          ? "查看文档内容"
                          : "查看附件内容"
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        onPreviewOpenChange?.(true);
                        setPreviewItem(item);
                      }}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                );
              })}
              {!items.length && !loading && (
                <p className="p-3 text-sm text-muted-foreground">
                  没有找到资源。
                </p>
              )}
            </div>
            {loading && <div className="workflow-resource-loading absolute inset-0 z-10 flex items-center justify-center gap-2 text-sm text-muted-foreground" role="status"><Loader2 className="size-4 animate-spin" />正在加载资源…</div>}
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={!offset || loading}
              onClick={() => setOffset((current) => Math.max(0, current - 12))}
            >
              上一页
            </Button>
            <span className="text-xs text-muted-foreground">
              {total ? Math.floor(offset / 12) + 1 : 0} /{" "}
              {Math.ceil(total / 12)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={offset + 12 >= total || loading}
              onClick={() => setOffset((current) => current + 12)}
            >
              下一页
            </Button>
          </div>
          {sourceType !== "document" && (
            <div className="space-y-1">
              {(value.resources || []).map((uri, index) => (
                <div
                  className="flex items-center gap-2 rounded-md bg-muted/60 px-2 py-1 text-xs"
                  key={uri}
                >
                  <span className="min-w-0 flex-1 truncate" title={uri}>
                    {resourceNames[uri] || `已选择附件 ${index + 1}`}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-6"
                    disabled={disabled || uploading}
                    aria-label={`移除 ${uri}`}
                    onClick={() =>
                      onChange({
                        ...value,
                        resources: value.resources.filter(
                          (resource) => resource !== uri,
                        ),
                      })
                    }
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {previewItem && (
        <WorkflowResourcePreview
          key={`${sourceType}:${previewItem.id}`}
          item={previewItem}
          sourceKind={sourceType === "document" ? "document" : "attachment"}
          onClose={() => {
            setPreviewItem(null);
            onPreviewOpenChange?.(false);
          }}
        />
      )}
    </section>
  );
}
