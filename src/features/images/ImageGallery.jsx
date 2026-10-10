import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ResourceImage from '@/components/markdown/ResourceImage.jsx';
import { imageSlides } from './useImageViewer.js';

export default function ImageGallery({ images }) {
    const slides = useMemo(() => imageSlides(images), [images]);
    const [expanded, setExpanded] = useState(false);
    if (!slides.length) return null;
    return <div className="mt-2">
        <button type="button" className="flex items-center gap-1 text-xs opacity-80 hover:opacity-100"
            aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
            <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            {expanded ? '收起图片' : `展开查看的 ${slides.length} 张图片`}
        </button>
        {expanded && <div className="cwm-image-gallery mt-2 flex flex-wrap gap-2">
            {slides.map((image, index) => <ResourceImage key={`${image.src}:${index}`} src={image.src} alt={image.alt}
                className="h-24 w-32 rounded-lg border object-contain bg-white/50" />)}
        </div>}
    </div>;
}
