import { create } from "zustand";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";

export const imageSlides = (images = []) =>
  (Array.isArray(images) ? images : []).flatMap((image) => {
    if (!image || typeof image !== "object") return [];
    const src = resolveResourceUrl(image.src || image.uri || "");
    if (!src || !/^(https?:\/\/|blob:|data:image\/|\/)/i.test(src)) return [];
    return [
      {
        src,
        alt: image.alt || image.filename || "",
        ...(image.width > 0 && image.height > 0
          ? { width: image.width, height: image.height }
          : {}),
      },
    ];
  });

export const useImageViewer = create(() => ({
  open: false,
  slides: [],
  index: 0,
}));
export const closeImageViewer = () => useImageViewer.setState({ open: false });
export const openImageViewer = (images, index = 0) => {
  const slides = imageSlides(images);
  if (!slides.length) return;
  useImageViewer.setState({
    open: true,
    slides,
    index: Math.max(0, Math.min(index, slides.length - 1)),
  });
};
