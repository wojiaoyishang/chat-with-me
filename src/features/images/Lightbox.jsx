import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ImageLightbox({ slides, index, close, zIndex }) {
  return (
    <Lightbox
      open
      slides={slides}
      index={index}
      close={close}
      plugins={[Zoom, Fullscreen, Thumbnails]}
      styles={{ root: { zIndex } }}
      thumbnails={{ hidden: slides.length < 2, showToggle: slides.length > 1 }}
      carousel={{ finite: slides.length < 2 }}
      controller={{ closeOnBackdropClick: true }}
      labels={{
        Close: "关闭",
        Next: "下一张",
        Previous: "上一张",
        "Zoom in": "放大",
        "Zoom out": "缩小",
        "Enter Fullscreen": "全屏",
        "Exit Fullscreen": "退出全屏",
        "Show thumbnails": "显示缩略图",
        "Hide thumbnails": "隐藏缩略图",
      }}
    />
  );
}
