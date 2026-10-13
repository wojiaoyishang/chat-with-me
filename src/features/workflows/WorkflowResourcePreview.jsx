import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiClient from "@/lib/apiClient.js";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";

const PAGE_SIZE = 20;
const PREVIEW_TIMEOUT = 20000;

function formatSize(size) {
  if (!Number.isFinite(size)) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

/** Preview the same resource and parsed text exposed by the attachment browser. */
export default function WorkflowResourcePreview({ item, sourceKind, onClose }) {
  const [blocks, setBlocks] = useState([]);
  const [version, setVersion] = useState(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaError, setMediaError] = useState(false);
  const request = useRef(null);

  const type = item?.type;
  const name = item?.title || item?.name || "附件";
  const fileType = String(item?.fileType || item?.format || "").toLowerCase();
  const isPdf =
    type === "document" &&
    (fileType === "pdf" || String(name).toLowerCase().endsWith(".pdf"));
  const isText = type === "text" || (type === "document" && !isPdf);
  const uri =
    item?.uri || (item?.artifactId ? `cwm://artifact/${item.artifactId}` : "");
  const url = uri ? resolveResourceUrl(uri) : "";

  const read = useCallback(
    async (offset, currentVersion) => {
      if (!item?.id || request.current) return;
      const controller = new AbortController();
      request.current = controller;
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, PREVIEW_TIMEOUT);
      setLoading(true);
      setError("");
      try {
        const result = await apiClient.post(
          "/knowledge/source-preview",
          {
            sourceKind,
            id: item.id,
            version: currentVersion || undefined,
            offset,
            limit: PAGE_SIZE,
          },
          { signal: controller.signal },
        );
        if (controller.signal.aborted) return;
        setBlocks((previous) =>
          offset
            ? [...previous, ...(result.blocks || [])]
            : result.blocks || [],
        );
        setVersion(
          result.source?.commit || result.source?.contentHash || currentVersion,
        );
        setTotal(result.total || 0);
        setHasMore(Boolean(result.hasMore));
      } catch (cause) {
        if (!controller.signal.aborted || timedOut)
          setError(timedOut ? "预览读取超时，请重试。" : cause.message);
      } finally {
        clearTimeout(timeout);
        if (request.current === controller) request.current = null;
        if (!controller.signal.aborted || timedOut) setLoading(false);
      }
    },
    [item?.id, sourceKind],
  );

  useEffect(() => {
    if (isText) void read(0, null);
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, [isText, read]);

  if (!item) return null;
  const text = blocks.map((block) => block.text || "").join("\n\n");
  const mediaClass = "mx-auto max-h-full max-w-full rounded-md object-contain";

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="flex h-[min(82dvh,780px)] w-[min(90vw,900px)] max-w-[min(90vw,900px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(90vw,900px)]">
        <DialogHeader className="shrink-0 border-b px-5 py-4 pr-12 text-left">
          <DialogTitle className="truncate" title={name}>
            {name}
          </DialogTitle>
          <DialogDescription>
            {[item.fileType || item.type, formatSize(item.size)]
              .filter(Boolean)
              .join(" · ") || "资源预览"}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-auto p-5">
          {mediaError ? (
            <p role="alert" className="text-sm text-destructive">
              资源不可用或当前无权查看。
            </p>
          ) : type === "image" && url ? (
            <img
              src={url}
              alt={name}
              className={mediaClass}
              onError={() => setMediaError(true)}
            />
          ) : type === "video" && url ? (
            <video
              src={url}
              controls
              preload="metadata"
              className={mediaClass}
              aria-label={name}
              onError={() => setMediaError(true)}
            />
          ) : type === "audio" && url ? (
            <audio
              src={url}
              controls
              preload="metadata"
              className="w-full"
              aria-label={name}
              onError={() => setMediaError(true)}
            />
          ) : isPdf && url ? (
            <iframe
              src={url}
              title={`${name}预览`}
              className="h-full min-h-96 w-full rounded-md border"
            />
          ) : isText ? (
            <div className="space-y-3">
              {text && (
                <pre className="whitespace-pre-wrap break-words rounded-md bg-muted/40 p-4 text-sm leading-6">
                  {text}
                </pre>
              )}
              {!text && !loading && !error && (
                <p className="text-sm text-muted-foreground">
                  此文件暂不支持正文预览，请下载后查看。
                </p>
              )}
              {error && (
                <div className="flex items-center gap-3">
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void read(blocks.length, version)}
                  >
                    重试
                  </Button>
                </div>
              )}
              {loading && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  正在读取预览…
                </p>
              )}
              {!loading && hasMore && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void read(blocks.length, version)}
                >
                  加载更多正文
                </Button>
              )}
              {Boolean(text) && (
                <p className="text-xs text-muted-foreground">
                  已预览 {blocks.length} / {total} 个片段
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              此格式请下载后查看。
            </p>
          )}
          {item.notes && (
            <p className="mt-4 whitespace-pre-wrap border-t pt-4 text-sm text-muted-foreground">
              {item.notes}
            </p>
          )}
        </div>
        {url && (
          <div className="flex shrink-0 justify-end border-t px-5 py-3">
            <Button asChild type="button" variant="outline" size="sm">
              <a href={url} download={name}>
                <Download className="size-4" />
                下载原文件
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
