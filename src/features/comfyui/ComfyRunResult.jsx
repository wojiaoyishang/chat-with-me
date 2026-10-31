import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveResourceUrl, resolveCwmUrl } from "@/lib/virtualUrl.js";
import ResourceImage from "@/components/markdown/ResourceImage.jsx";
import ResourceVideo from "@/components/markdown/ResourceVideo.jsx";

export default function ComfyRunResult({ result }) {
  const outputs = Array.isArray(result.outputs) ? result.outputs : [];
  const inputStats = result.inputStats;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="size-6 text-emerald-600" />
        <div>
          <h3 className="font-semibold">
            工作流执行完成
            {outputs.length ? ` · ${outputs.length} 个附件` : "，无附件输出"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {outputs.length
              ? "生成结果已保存到附件库。"
              : "已按工作流设置完成执行。"}
          </p>
          {inputStats?.uploadedFiles !== undefined && (
            <p className="mt-1 text-xs text-muted-foreground">
              输入附件：复用 {inputStats.cacheHits + inputStats.checkpointFiles} 个
              {" · "}上传 {inputStats.uploadedFiles} 个
            </p>
          )}
        </div>
      </div>
      {outputs.map((item, index) => {
        const reference =
          item.url ||
          (item.artifactId ? `cwm://artifact/${item.artifactId}` : "");
        const source = resolveResourceUrl(reference);
        const download = resolveCwmUrl(reference, { download: true }) || source;
        return (
          <div
            key={`${item.artifactId || item.url || index}`}
            className="overflow-hidden rounded-xl border"
          >
            <div className="bg-muted/30 p-3">
              {item.kind === "video" ? (
                <ResourceVideo
                  src={reference}
                  title={item.filename || `视频 ${index + 1}`}
                />
              ) : item.kind === "image" ? (
                <ResourceImage
                  src={source}
                  alt={item.filename || `图片 ${index + 1}`}
                  className="max-h-[420px] w-full rounded-lg object-contain"
                />
              ) : (
                <p className="text-sm">{item.filename || "附件"}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {item.filename || `输出 ${index + 1}`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  节点 #{item.nodeId} ·{" "}
                  {item.kind === "video"
                    ? "视频"
                    : item.kind === "image"
                      ? "图片"
                      : "附件"}
                </p>
              </div>
              {download && (
                <Button asChild size="sm" variant="outline">
                  <a href={download} target="_blank" rel="noopener noreferrer">
                    <Download className="size-3.5" />
                    打开附件
                  </a>
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
