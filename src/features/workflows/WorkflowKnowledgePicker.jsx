import { useEffect, useState } from "react";
import {
  ChevronDown,
  Database,
  Eye,
  FileText,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import apiClient from "@/lib/apiClient.js";
import { WorkflowSelect } from "./WorkflowSourcePicker.jsx";
import {
  knowledgeDatabaseIdentity,
  knowledgeDatabaseTitle,
} from "./workflowFieldModel.js";

const PAGE_SIZE = 20;

/** The registry is authoritative; a saved unknown selection stays visible. */
export function WorkflowGraphDatabasePicker({
  value,
  onChange,
  disabled,
  label = "图数据库",
  schema = {},
}) {
  const [registry, setRegistry] = useState({
    databases: [],
    loading: true,
    error: "",
  });
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setRegistry((current) => ({ ...current, loading: true, error: "" }));
    apiClient
      .get(schema.ui?.endpoint || "/knowledge/databases", {
        signal: controller.signal,
      })
      .then((result) => {
        if (!controller.signal.aborted)
          setRegistry({
            databases: result.databases || [],
            loading: false,
            error: "",
          });
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setRegistry({
            databases: [],
            loading: false,
            error: cause.message || "无法读取数据库列表。",
          });
      });
    return () => controller.abort();
  }, [schema.ui?.endpoint, reload]);
  const field = schema.ui?.valueField || "databaseId";
  const isObject = schema.type === "object" || Boolean(schema.properties);
  const selectedId = String((isObject ? value?.[field] : value) || "");
  const selected = registry.databases.find(
    (database) =>
      knowledgeDatabaseIdentity(database) === selectedId ||
      (selectedId === "default" && database.legacyDefault),
  );
  const selectValue = selected
    ? knowledgeDatabaseIdentity(selected)
    : selectedId;
  const options = registry.databases.map((database) => ({
    value: knowledgeDatabaseIdentity(database),
    label: `${knowledgeDatabaseTitle(database)}${database.enabled === false ? "（已停用）" : database.readOnly ? "（只读）" : ""}`,
    disabled: database.enabled === false,
  }));
  if (selectedId && !selected)
    options.unshift({
      value: selectedId,
      label: registry.loading ? "正在读取数据库…" : "已选数据库不可用",
      disabled: true,
    });
  if (!selectedId)
    options.unshift({
      value: "",
      label: schema.ui?.emptyLabel || "选择图数据库…",
      disabled: true,
    });
  return (
    <div className="workflow-database-picker space-y-1.5">
      <WorkflowSelect
        label={label}
        value={selectValue}
        disabled={disabled || registry.loading || !options.length}
        options={options}
        onChange={(databaseId) =>
          onChange(
            isObject ? { ...(value || {}), [field]: databaseId } : databaseId,
          )
        }
      />
      {registry.loading && (
        <p
          role="status"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Loader2 className="size-3 animate-spin" />
          正在读取数据库…
        </p>
      )}
      {registry.error && (
        <div className="flex items-center gap-2 text-xs">
          <p role="alert" className="min-w-0 flex-1 text-destructive">
            {registry.error}
          </p>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setReload((current) => current + 1)}
          >
            重试
          </Button>
        </div>
      )}
      {!registry.loading && !registry.error && !registry.databases.length && (
        <p className="text-xs text-muted-foreground">暂无可访问的图数据库。</p>
      )}
    </div>
  );
}

function WorkflowChunkPreview({ item, databaseId, onClose }) {
  const [result, setResult] = useState({
    loading: true,
    snapshot: null,
    error: "",
  });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setResult({ loading: true, snapshot: null, error: "" });
    apiClient
      .get(
        `/knowledge/nodes/${encodeURIComponent(item.id)}/extraction-snapshot`,
        { params: { databaseId }, signal: controller.signal, timeout: 20000 },
      )
      .then((snapshot) => {
        if (!controller.signal.aborted)
          setResult({ loading: false, snapshot, error: "" });
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setResult({
            loading: false,
            snapshot: null,
            error: cause.message || "无法读取知识块。",
          });
      });
    return () => controller.abort();
  }, [item.id, databaseId, retry]);
  const snapshot = result.snapshot;
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="flex max-h-[82dvh] w-[min(90vw,800px)] max-w-[min(90vw,800px)] flex-col overflow-hidden sm:max-w-[min(90vw,800px)]">
        <DialogHeader>
          <DialogTitle className="truncate">
            {item.name || item.title || "知识块"}
          </DialogTitle>
          <DialogDescription>
            查看当前知识块及其抽取结果；任务启动时固定内容与抽取版本。
          </DialogDescription>
        </DialogHeader>
        <div
          className="min-h-0 space-y-4 overflow-y-auto"
          aria-busy={result.loading}
        >
          {result.loading && (
            <p
              role="status"
              className="flex items-center gap-2 p-4 text-sm text-muted-foreground"
            >
              <Loader2 className="size-4 animate-spin" />
              正在读取知识块…
            </p>
          )}
          {result.error && (
            <div className="space-y-2">
              <p role="alert" className="text-sm text-destructive">
                {result.error}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRetry((current) => current + 1)}
              >
                重试
              </Button>
            </div>
          )}
          {snapshot && (
            <>
              <MultilineEditor
                label="知识块原文"
                value={snapshot.content ?? snapshot.text ?? ""}
                readOnly
                rows={10}
              />
              <section className="space-y-2">
                <h4 className="text-sm font-medium">
                  已有抽取关系 · {snapshot.relationships?.length || 0} 条
                </h4>
                {snapshot.relationships?.length ? (
                  <ul className="space-y-1">
                    {snapshot.relationships.map((relationship, index) => {
                      const entityName = (entity) =>
                        typeof entity === "object" && entity !== null
                          ? entity.name ||
                            entity.id ||
                            entity.entity ||
                            JSON.stringify(entity)
                          : String(entity ?? "");
                      const nodeName = (identity) =>
                        snapshot.nodes?.find(
                          (node) => String(node.id) === String(identity),
                        )?.name || entityName(identity);
                      return (
                        <li
                          key={relationship.id || index}
                          className="rounded-md bg-muted/40 px-3 py-2 text-xs break-words"
                        >
                          {nodeName(relationship.source || relationship.head)} →{" "}
                          {relationship.type || relationship.relation || "关联"}{" "}
                          → {nodeName(relationship.target || relationship.tail)}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    当前知识块尚无抽取关系。
                  </p>
                )}
              </section>
              <p className="text-xs text-muted-foreground">
                仅选择当前知识块，不包含父级或子级。抽取版本：
                {snapshot.extractionRevision ??
                  snapshot.revision?.extractionRevision ??
                  "—"}
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FullWorkflowKnowledgeChunkPicker({
  value = {},
  onChange,
  disabled,
  schema = {},
  onPreviewOpenChange,
}) {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState({
    databaseId: "",
    query: "",
    offset: 0,
    items: [],
    total: 0,
    loading: false,
    error: "",
  });
  const [preview, setPreview] = useState(null);
  const [retry, setRetry] = useState(0);
  const databaseId =
    value.databaseId || schema.properties?.databaseId?.default || "";
  useEffect(() => {
    if (!databaseId) return;
    const controller = new AbortController();
    setResult({
      databaseId,
      query,
      offset,
      items: [],
      total: 0,
      loading: true,
      error: "",
    });
    const timer = setTimeout(() => {
      apiClient
        .get(schema.ui?.searchEndpoint || "/knowledge/chunks/search", {
          params: { databaseId, q: query, offset, limit: PAGE_SIZE },
          signal: controller.signal,
          timeout: 20000,
        })
        .then((response) => {
          if (!controller.signal.aborted)
            setResult({
              databaseId,
              query,
              offset,
              items: response.items || response.chunks || [],
              total: response.total || 0,
              loading: false,
              error: "",
              hasMore: response.hasMore,
            });
        })
        .catch((cause) => {
          if (!controller.signal.aborted)
            setResult({
              databaseId,
              query,
              offset,
              items: [],
              total: 0,
              loading: false,
              error: cause.message || "无法搜索知识块。",
            });
        });
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [databaseId, query, offset, retry, schema.ui?.searchEndpoint]);
  const current =
    result.databaseId === databaseId &&
    result.query === query &&
    result.offset === offset;
  const items = current ? result.items : [];
  const total = current ? result.total : 0;
  const loading = Boolean(databaseId) && (!current || result.loading);
  return (
    <section className="workflow-knowledge-chunk-picker space-y-3">
      <WorkflowGraphDatabasePicker
        label={schema.properties?.databaseId?.display?.title || "图数据库"}
        schema={{ type: "string", ui: schema.ui?.databasePicker || {} }}
        value={databaseId}
        disabled={disabled}
        onChange={(next) => {
          setOffset(0);
          setQuery("");
          onChange({ ...value, databaseId: next, chunkId: "", scope: "self" });
        }}
      />
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          aria-label="搜索知识块"
          value={query}
          disabled={!databaseId}
          placeholder="搜索知识块名称或原文"
          onChange={(event) => {
            setQuery(event.target.value);
            setOffset(0);
          }}
        />
      </div>
      {value.chunkId && (
        <div className="flex min-w-0 items-center gap-2 rounded-md bg-primary/5 px-2 py-1.5 text-xs">
          <FileText className="size-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 truncate">
            {items.find((item) => item.id === value.chunkId)?.name ||
              "已选择知识块"}
          </span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7"
            aria-label="查看已选知识块"
            onClick={() => {
              onPreviewOpenChange?.(true);
              setPreview({
                id: value.chunkId,
                name: items.find((item) => item.id === value.chunkId)?.name,
              });
            }}
          >
            <Eye className="size-3.5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7"
            disabled={disabled}
            aria-label="清除知识块选择"
            onClick={() => onChange({ ...value, chunkId: "", scope: "self" })}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      )}
      <div
        className="workflow-resource-list relative min-h-24"
        aria-busy={loading}
      >
        <div className="workflow-resource-results is-list">
          {items.map((item) => (
            <div
              key={item.id}
              className={`workflow-resource-choice ${item.id === value.chunkId ? "is-selected" : ""}`}
            >
              <Button
                type="button"
                variant="ghost"
                className="workflow-resource-pick"
                aria-label={`选择知识块 ${item.name || item.id}`}
                aria-pressed={item.id === value.chunkId}
                disabled={disabled || loading}
                onClick={() =>
                  onChange({
                    ...value,
                    databaseId,
                    chunkId: item.id,
                    scope: "self",
                  })
                }
              >
                <span className="workflow-resource-content">
                  <span className="workflow-resource-icon">
                    <FileText className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="workflow-resource-name" title={item.name}>
                      {item.name || item.id}
                    </span>
                    {item.properties?.summary && (
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.properties.summary}
                      </span>
                    )}
                  </span>
                </span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="workflow-resource-preview size-8"
                aria-label={`查看知识块 ${item.name || item.id}`}
                onClick={() => {
                  onPreviewOpenChange?.(true);
                  setPreview(item);
                }}
              >
                <Eye className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        {loading && (
          <div
            role="status"
            className="workflow-resource-loading absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Loader2 className="size-4 animate-spin" />
            正在搜索知识块…
          </div>
        )}
        {!items.length && !loading && (
          <p className="p-3 text-sm text-muted-foreground">
            {databaseId ? "没有找到知识块。" : "先选择图数据库。"}
          </p>
        )}
      </div>
      {current && result.error && (
        <div className="space-y-1">
          <p role="alert" className="text-xs text-destructive">
            {result.error}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setRetry((count) => count + 1)}
          >
            重试
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={!offset || loading}
          onClick={() =>
            setOffset((current) => Math.max(0, current - PAGE_SIZE))
          }
        >
          上一页
        </Button>
        <span className="text-xs text-muted-foreground">
          共 {total} 项 · {total ? Math.floor(offset / PAGE_SIZE) + 1 : 0} /{" "}
          {Math.ceil(total / PAGE_SIZE)}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={
            loading ||
            (result.hasMore === undefined
              ? offset + PAGE_SIZE >= total
              : !result.hasMore)
          }
          onClick={() => setOffset((current) => current + PAGE_SIZE)}
        >
          下一页
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        仅处理所选知识块；任务启动时固定原文和已有抽取结果。
      </p>
      {preview && (
        <WorkflowChunkPreview
          key={`${databaseId}:${preview.id}`}
          item={preview}
          databaseId={databaseId}
          onClose={() => {
            setPreview(null);
            onPreviewOpenChange?.(false);
          }}
        />
      )}
    </section>
  );
}

/** Canvas controls stage edits; quick-run forms edit the same typed value. */
export default function WorkflowKnowledgeChunkPicker({
  compact,
  label = "知识块",
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(props.value || {});
  const [previewOpen, setPreviewOpen] = useState(false);
  if (!compact) return <FullWorkflowKnowledgeChunkPicker {...props} />;
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (previewOpen) return;
        if (next) setDraft(props.value || {});
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={props.disabled}
          className="nodrag w-full justify-start"
          aria-label={`选择${label}`}
        >
          <Database className="size-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate">
            {props.value?.chunkId ? "已选择 1 个知识块" : "选择知识块…"}
          </span>
          <ChevronDown className="size-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="workflow-source-popover nodrag nowheel flex max-h-[min(620px,80vh)] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden p-0"
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        onInteractOutside={(event) => {
          if (previewOpen) event.preventDefault();
        }}
        onFocusOutside={(event) => {
          if (previewOpen) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (previewOpen) event.preventDefault();
        }}
      >
        <div className="min-h-0 overflow-y-auto p-3">
          <FullWorkflowKnowledgeChunkPicker
            {...props}
            value={draft}
            onChange={setDraft}
            onPreviewOpenChange={setPreviewOpen}
          />
        </div>
        <div className="flex shrink-0 items-center justify-between border-t px-3 py-2.5">
          <span className="text-xs text-muted-foreground">
            {draft.chunkId ? "已选择 1 项" : "尚未选择"}
          </span>
          <Button
            type="button"
            size="sm"
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
