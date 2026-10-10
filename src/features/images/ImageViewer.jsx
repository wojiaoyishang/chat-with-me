import { lazy, Suspense } from "react";
import { useImageViewer, closeImageViewer } from "./useImageViewer.js";
import { useBrowserBackLayer } from "@/lib/browserHistoryLayers.js";

const Lightbox = lazy(() => import("./Lightbox.jsx"));

export default function ImageViewer() {
  const { open, slides, index } = useImageViewer();
  useBrowserBackLayer(open, closeImageViewer, { kind: "image-viewer" });
  return open ? (
    <Suspense fallback={null}>
      <Lightbox slides={slides} index={index} close={closeImageViewer} />
    </Suspense>
  ) : null;
}
