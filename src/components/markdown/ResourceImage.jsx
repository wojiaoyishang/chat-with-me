import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageOff } from 'lucide-react';

export default function ResourceImage({ src, alt, ...props }) {
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
    return <img {...props} src={src} alt={alt} onError={() => setFailed(true)} />;
}
