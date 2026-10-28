import { useEffect, useRef } from "react";
import apiClient from "@/lib/apiClient.js";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";
import { downloadAttachmentResource } from "@/lib/resourceDownload.js";
import Observation from "./observation-components.js";

/** React and the backend task page mount the same observation component tree. */
export default function RunObservation({ observation, scopeId = "task", taskId, view = "detail", compact = false }) {
  const host = useRef(null);
  const renderer = useRef(null);
  useEffect(() => {
    renderer.current = Observation.createRenderer(host.current);
    return () => { renderer.current?.dispose(); renderer.current = null; };
  }, []);
  useEffect(() => {
    renderer.current?.update(observation, {
      scopeId, taskId, view, compact,
      artifactUrl: (id) => resolveResourceUrl(`cwm://artifact/${encodeURIComponent(id)}`),
      downloadArtifact: (url, filename) => downloadAttachmentResource(url, filename),
      loadRows: ({ scope, component, offset, limit }) => apiClient.get(
        `/tasks/${encodeURIComponent(taskId)}/observation/rows?${new URLSearchParams({ scope, component, offset: String(offset), limit: String(limit) })}`,
      ),
    });
  }, [observation, scopeId, taskId, view, compact]);
  return <div ref={host} aria-label={compact ? "运行摘要" : "运行观测"} className="nodrag nopan nowheel" />;
}
