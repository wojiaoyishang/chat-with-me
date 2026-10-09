import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

function UploadRow({ item, onDismiss, t }) {
    const [closing, setClosing] = useState(false);
    const [hidden, setHidden] = useState(false);
    const dismissRef = useRef(onDismiss);
    dismissRef.current = onDismiss;
    useEffect(() => {
        if (item.status !== 'done') return undefined;
        const remaining = item.completedAt ? Math.max(0, 2500 - (Date.now() - item.completedAt)) : 2500;
        const timer = window.setTimeout(() => setClosing(true), remaining);
        return () => window.clearTimeout(timer);
    }, [item.status, item.completedAt]);
    useEffect(() => {
        if (!closing) return undefined;
        const timer = window.setTimeout(() => {
            setHidden(true);
            dismissRef.current?.(item.id);
        }, 300);
        return () => window.clearTimeout(timer);
    }, [closing, item.id]);
    if (hidden) return null;
    return (
        <div className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out" style={{ maxHeight: closing ? 0 : 120, opacity: closing ? 0 : 1, marginTop: closing ? 0 : 8 }}>
            <div className="rounded-lg border bg-background p-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 flex-1 truncate" title={item.name}>{item.name}</span>
                    {item.status === 'done' ? <Check className="size-3 shrink-0 text-emerald-600" /> : item.status === 'error' ? <AlertCircle className="size-3 shrink-0 text-destructive" /> : <span className="shrink-0 tabular-nums">{Math.round(item.percent)}%</span>}
                    {['done', 'error'].includes(item.status) && <button type="button" aria-label="关闭上传提示" title="关闭上传提示" onClick={() => setClosing(true)} className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><X className="size-3" /></button>}
                </div>
                <div className="my-1.5 h-1 overflow-hidden rounded bg-muted" role="progressbar" aria-label={item.name} aria-valuenow={Math.round(item.percent)} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full bg-primary transition-[width]" style={{ width: `${item.percent}%` }} />
                </div>
                <span className="text-muted-foreground">{item.status === 'done' ? t('file_upload_complete') : item.status === 'error' ? t('file_upload_failed') : `${((item.speed || 0) / 1024).toFixed(1)} KB/s · ${t(item.percent === 100 ? 'file_upload_processing' : 'file_upload_running')}`}</span>
            </div>
        </div>
    );
}

export default function FileUploadProgress({ uploads = [], onDismiss }) {
    const { t } = useTranslation();
    if (!uploads.length) return null;
    return (
        <div className="max-h-36 overflow-auto" aria-live="polite">
            {uploads.map((item) => <UploadRow key={item.id} item={item} onDismiss={onDismiss} t={t} />)}
        </div>
    );
}
