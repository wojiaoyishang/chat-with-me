import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageOff } from 'lucide-react';
import { openImageViewer } from '@/features/images/useImageViewer.js';

export default function ResourceImage({ src, alt, galleryId, ...props }) {
    delete props.node;
    const [failed, setFailed] = useState(false);
    const { t } = useTranslation();
    if (failed)
        return (
            <span
                role="status"
                className="inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
            >
                <ImageOff className="size-4" />
                {t('resource_unavailable')}
                {alt ? ` · ${alt}` : ''}
            </span>
        );
    const open = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const peers = galleryId
            ? [...document.querySelectorAll('img[data-image-viewer]')].filter((img) => img.dataset.imageGallery === String(galleryId))
            : [...(event.currentTarget.closest('.cwm-image-gallery')?.querySelectorAll('img[data-image-viewer]') || [])];
        const images = peers.length ? peers.map((img) => ({ src: img.currentSrc || img.src, alt: img.alt })) : [{ src, alt }];
        openImageViewer(images, Math.max(0, peers.indexOf(event.currentTarget)));
    };
    return <img {...props} src={src} alt={alt} onError={() => setFailed(true)}
        data-image-viewer data-image-gallery={galleryId} role="button" tabIndex={0} aria-label={alt || '查看图片'}
        className={`${props.className || ''} cursor-zoom-in`}
        onClick={open} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') open(event);
        }} />;
}
