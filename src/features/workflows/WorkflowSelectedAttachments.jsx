import { useEffect, useRef, useState } from "react";
import { Eye, ImageOff, Loader2, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient.js";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";
import WorkflowResourcePreview from "./WorkflowResourcePreview.jsx";

const artifactUri = (uri) =>
  typeof uri === "string" && /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/i.test(uri);

/** Display confirmed resources even when their input is read-only. */
export default function WorkflowSelectedAttachments({
  resources = [],
  knownItems = {},
  onRemove,
  disabled,
  onPreviewOpenChange,
}) {
  const signature = JSON.stringify(
    resources.filter((uri) => typeof uri === "string"),
  );
  const selected = JSON.parse(signature);
  const [resolved, setResolved] = useState({
    signature: "",
    items: {},
    unavailable: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);
  const previewChanged = useRef(onPreviewOpenChange);
  previewChanged.current = onPreviewOpenChange;

  useEffect(() => {
    const uris = [...new Set(JSON.parse(signature).filter(artifactUri))];
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
        <ul className="workflow-selected-attachment-list pretty-scrollbar">
          {selected.map((uri, index) => {
            const item = itemFor(uri);
            const unavailable = isUnavailable(uri);
            const name = item?.name || item?.title || `附件 ${index + 1}`;
            return (
              <li key={uri}>
                <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />
                <span
                  className="workflow-selected-attachment-name"
                  title={item?.name || uri}
                >
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
                    onClick={() => open(item)}
                  >
                    <Eye className="size-3.5" />
                  </Button>
                )}
                {onRemove && !disabled && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-6 shrink-0"
                    aria-label={`移除 ${uri}`}
                    onClick={() => onRemove(uri)}
                  >
                    <X className="size-3" />
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
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
