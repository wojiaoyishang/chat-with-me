import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ResourceImage from '@/components/markdown/ResourceImage.jsx';
import { imageSlides } from './useImageViewer.js';

export default function ImageGallery({ images, label, className = 'mt-2' }) {
    const slides = useMemo(() => imageSlides(images), [images]);
    const [expanded, setExpanded] = useState(false);
    if (!slides.length) return null;
    return <div className={className}>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-emerald-700/85 transition-colors hover:bg-emerald-100/60 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
            aria-expanded={expanded} title={expanded ? '收起图片' : '展开图片'} onClick={() => setExpanded((value) => !value)}>
            <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            {label || (expanded ? '收起图片' : `查看图片 · ${slides.length} 张`)}
        </button>
        {expanded && <div className="cwm-image-gallery mt-2 flex flex-wrap gap-2">
            {slides.map((image, index) => <ResourceImage key={`${image.src}:${index}`} src={image.src} alt={image.alt}
                className="h-24 w-32 rounded-lg border object-contain bg-white/50" />)}
        </div>}
    </div>;
}
