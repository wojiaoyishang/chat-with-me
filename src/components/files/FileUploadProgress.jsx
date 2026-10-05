import { useTranslation } from 'react-i18next';
import { Check, AlertCircle } from 'lucide-react';

export default function FileUploadProgress({ uploads = [] }) {
    const { t } = useTranslation();
    if (!uploads.length) return null;
    return (
        <div className="max-h-36 space-y-2 overflow-auto" aria-live="polite">
            {uploads.map((item) => (
                <div key={item.id} className="rounded-lg border bg-background p-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                        <span className="truncate" title={item.name}>
                            {item.name}
                        </span>
                        {item.status === 'done' ? (
                            <Check className="size-3 shrink-0 text-emerald-600" />
                        ) : item.status === 'error' ? (
                            <AlertCircle className="size-3 shrink-0 text-destructive" />
                        ) : (
                            <span className="shrink-0 tabular-nums">{Math.round(item.percent)}%</span>
                        )}
                    </div>
                    <div
                        className="my-1.5 h-1 overflow-hidden rounded bg-muted"
                        role="progressbar"
                        aria-label={item.name}
                        aria-valuenow={Math.round(item.percent)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="h-full bg-primary transition-[width]" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-muted-foreground">
                        {item.status === 'done'
                            ? t('file_upload_complete')
                            : item.status === 'error'
                              ? t('file_upload_failed')
                              : `${(item.speed / 1024).toFixed(1)} KB/s · ${t(item.percent === 100 ? 'file_upload_processing' : 'file_upload_running')}`}
                    </span>
                </div>
            ))}
        </div>
    );
}
