import { lazy, Suspense } from "react";
import { useImageViewer, closeImageViewer } from "./useImageViewer.js";
import { useBrowserBackLayer } from "@/lib/browserHistoryLayers.js";
import { useWindowLayer } from '@/lib/windowLayers.js';

const Lightbox = lazy(() => import("./Lightbox.jsx"));

export default function ImageViewer() {
  const { open, slides, index } = useImageViewer();
  const layer = useWindowLayer(open);
  useBrowserBackLayer(open, closeImageViewer, { kind: "image-viewer" });
  return open ? (
    <Suspense fallback={null}>
      <Lightbox slides={slides} index={index} close={closeImageViewer} zIndex={layer.zIndex} />
    </Suspense>
  ) : null;
}
