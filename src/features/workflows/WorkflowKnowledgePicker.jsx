import { useCallback, useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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

const chunkMetadataKey = (databaseId, chunkId) =>
  JSON.stringify([databaseId, chunkId]);

function chunkCount(item, field) {
  const count = item?.[field];
  return Number.isInteger(count) && count >= 0 ? count : null;
}

function chunkUpdateSummary(item) {
  const descendants = chunkCount(item, "descendantCount");
  if (descendants === 0) return "仅更新当前知识块；没有子知识块。";
  if (descendants !== null)
    return `当前知识块及全部 ${descendants} 个子知识块（含递归）会一同更新。`;
  return "当前知识块及其全部递归子知识块会一同更新。";
}

function ChunkChildrenSummary({ item }) {
  const children = chunkCount(item, "childCount");
  const descendants = chunkCount(item, "descendantCount");
  if (children === null && descendants === null) return null;
  return (
    <span className="block text-xs text-muted-foreground">
      直接子块 {children ?? "—"} 个 · 递归子块 {descendants ?? "—"} 个
    </span>
  );
}

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
  const selected =
    registry.databases.find((database) => knowledgeDatabaseIdentity(database) === selectedId) ||
    registry.databases.find((database) => database.name === selectedId) ||
    (selectedId === "default"
      ? registry.databases.find((database) => database.legacyDefault)
      : undefined);
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

function WorkflowChunkPreview({ item, databaseId, onClose, onChunksRead }) {
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
        if (!controller.signal.aborted) {
          setResult({ loading: false, snapshot, error: "" });
          onChunksRead?.(databaseId, [
            {
              ...item,
              name: snapshot.name || item.name,
              childCount: snapshot.childCount ?? item.childCount,
              descendantCount: snapshot.descendantCount ?? item.descendantCount,
            },
          ]);
        }
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
  }, [item, databaseId, retry, onChunksRead]);
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
            查看当前知识块与更新范围；任务启动时固定当前块及全部递归子块的内容与抽取版本。
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
              <section className="space-y-1.5 rounded-md border border-primary/15 bg-primary/5 px-3 py-2.5">
                <h4 className="text-sm font-medium">更新范围</h4>
                <ChunkChildrenSummary item={{ ...item, ...snapshot }} />
                <p className="text-xs leading-relaxed">
                  {chunkUpdateSummary({ ...item, ...snapshot })}
                </p>
              </section>
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
                当前知识块抽取版本：
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
  knownChunks = {},
  onChunksRead,
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
          if (!controller.signal.aborted) {
            const chunks = response.items || response.chunks || [];
            onChunksRead?.(databaseId, chunks);
            setResult({
              databaseId,
              query,
              offset,
              items: chunks,
              total: response.total || 0,
              loading: false,
              error: "",
              hasMore: response.hasMore,
            });
          }
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
  }, [databaseId, query, offset, retry, schema.ui?.searchEndpoint, onChunksRead]);
  const current =
    result.databaseId === databaseId &&
    result.query === query &&
    result.offset === offset;
  const items = current ? result.items : [];
  const total = current ? result.total : 0;
  const loading = Boolean(databaseId) && (!current || result.loading);
  const selectedItem =
    knownChunks[chunkMetadataKey(databaseId, value.chunkId)] ||
    items.find((item) => item.id === value.chunkId);
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
          onChange({ ...value, databaseId: next, chunkId: "", scope: "subtree" });
        }}
      />
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          aria-label="搜索知识块"
          value={query}
          disabled={!databaseId}
          placeholder="搜索知识块名称或摘要"
          onChange={(event) => {
            setQuery(event.target.value);
            setOffset(0);
          }}
        />
      </div>
      {value.chunkId && (
        <div className="flex min-w-0 items-center gap-2 rounded-md bg-primary/5 px-2 py-1.5 text-xs">
          <FileText className="size-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1">
            <span className="block truncate">
              {selectedItem?.name || "已选择知识块"}
            </span>
            <span className="mt-1 block leading-relaxed text-muted-foreground">
              {chunkUpdateSummary(selectedItem)}
            </span>
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
                ...selectedItem,
                id: value.chunkId,
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
            onClick={() => onChange({ ...value, chunkId: "", scope: "subtree" })}
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
              <Checkbox
                className="workflow-resource-check"
                checked={item.id === value.chunkId}
                disabled={disabled || loading}
                aria-label={`勾选知识块 ${item.name || item.id}`}
                onCheckedChange={(checked) =>
                  onChange({
                    ...value,
                    databaseId,
                    chunkId: checked ? item.id : "",
                    scope: "subtree",
                  })
                }
              />
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
                    scope: "subtree",
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
                    <ChunkChildrenSummary item={item} />
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
        处理所选知识块及全部递归子知识块；任务启动时固定原文和已有抽取结果。
      </p>
      {preview && (
        <WorkflowChunkPreview
          key={`${databaseId}:${preview.id}`}
          item={preview}
          databaseId={databaseId}
          onChunksRead={onChunksRead}
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
  const [knownChunks, setKnownChunks] = useState({});
  const onChunksRead = useCallback((databaseId, items) => {
    setKnownChunks((current) => {
      const next = { ...current };
      for (const item of items)
        next[chunkMetadataKey(databaseId, item.id)] = {
          id: item.id,
          name: item.name || item.title,
          childCount: item.childCount,
          descendantCount: item.descendantCount,
        };
      return next;
    });
  }, []);
  if (!compact)
    return (
      <FullWorkflowKnowledgeChunkPicker
        {...props}
        knownChunks={knownChunks}
        onChunksRead={onChunksRead}
      />
    );
  const draftDatabaseId =
    draft.databaseId || props.schema?.properties?.databaseId?.default || "";
  const selectedItem =
    knownChunks[chunkMetadataKey(draftDatabaseId, draft.chunkId)];
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (previewOpen) return;
        if (next) setDraft({ ...(props.value || {}), scope: "subtree" });
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
            knownChunks={knownChunks}
            onChunksRead={onChunksRead}
          />
        </div>
        <div className="flex shrink-0 items-center justify-between border-t px-3 py-2.5">
          <span className="mr-3 min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground">
            {draft.chunkId ? chunkUpdateSummary(selectedItem) : "尚未选择"}
          </span>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              if (!props.disabled) props.onChange({ ...draft, scope: "subtree" });
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
