import { useEffect, useMemo, useState } from 'react';
import { Eye, FileText, Loader2, Paperclip, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import apiClient from '@/lib/apiClient.js';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import WorkflowResourcePreview from '@/features/workflows/WorkflowResourcePreview.jsx';
import { getAttachmentId } from '../attachmentVision.js';

const PAGE_SIZE = 12;

function AttachmentThumbnail({ item }) {
    const [failed, setFailed] = useState(false);
    const src = item.preview ? resolveResourceUrl(item.preview) : '';
    const isDocument = item.type === 'document' || item.type === 'text';

    useEffect(() => setFailed(false), [src]);

    return (
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted/60 text-muted-foreground">
            {src && !failed ? (
                <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover"
                    onError={() => setFailed(true)}
                />
            ) : isDocument ? <FileText className="size-5" /> : <Paperclip className="size-5" />}
        </span>
    );
}

export default function ChatAttachmentLibraryDialog({ attachments = [], onClose, onConfirm }) {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [selected, setSelected] = useState(() => new Map());
    const [previewItem, setPreviewItem] = useState(null);

    const existingIds = useMemo(
        () => new Set(attachments.map(getAttachmentId).filter(Boolean)),
        [attachments],
    );

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError('');
        const timer = setTimeout(async () => {
            try {
                const params = new URLSearchParams({
                    q: query,
                    offset: String(offset),
                    limit: String(PAGE_SIZE),
                    sort: 'newest',
                });
                const result = await apiClient.get(`/attachments?${params}`, { signal: controller.signal });
                if (controller.signal.aborted) return;
                setItems(Array.isArray(result.items) ? result.items : []);
                setTotal(Number(result.total) || 0);
            } catch (cause) {
                if (!controller.signal.aborted) setError(cause.message || t('attachment_library_load_failed'));
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }, 180);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query, offset, refresh, t]);

    const toggle = (item) => {
        const id = item.artifactId || item.serverId;
        if (!id || existingIds.has(id)) return;
        setSelected((current) => {
            const next = new Map(current);
            if (next.has(id)) next.delete(id);
            else next.set(id, item);
            return next;
        });
    };

    const page = total ? Math.floor(offset / PAGE_SIZE) + 1 : 0;
    const pages = Math.ceil(total / PAGE_SIZE);

    return (
        <Dialog open onOpenChange={(open) => { if (!open && !previewItem) onClose(); }}>
            <DialogContent
                className="flex h-[min(82dvh,740px)] w-[min(92vw,700px)] max-w-[min(92vw,700px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(92vw,700px)]"
                onInteractOutside={(event) => { if (previewItem) event.preventDefault(); }}
                onEscapeKeyDown={(event) => { if (previewItem) event.preventDefault(); }}
            >
                <DialogHeader className="shrink-0 border-b px-5 py-4 pr-12 text-left">
                    <DialogTitle>{t('attachment_library_title', '在附件库中选择')}</DialogTitle>
                    <DialogDescription>{t('attachment_library_description', '选择已有附件并添加到当前消息。')}</DialogDescription>
                </DialogHeader>
                <div className="flex min-h-0 flex-1 flex-col gap-3 px-5 py-4">
                    <div className="relative shrink-0">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            autoFocus
                            aria-label={t('attachment_library_search', '搜索附件名称')}
                            placeholder={t('attachment_library_search', '搜索附件名称')}
                            className="pl-9"
                            value={query}
                            onChange={(event) => { setQuery(event.target.value); setOffset(0); }}
                        />
                    </div>
                    <div className="flex shrink-0 items-center justify-between text-xs text-muted-foreground">
                        <span>{t('attachment_library_total', { count: total, defaultValue: '共 {{count}} 项' })}</span>
                        <span>{t('attachment_library_pending', { count: selected.size, defaultValue: '待添加 {{count}} 项' })}</span>
                    </div>
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-md border" aria-busy={loading}>
                        <div className="h-full overflow-y-auto overscroll-contain">
                            {items.map((item) => {
                                const id = item.artifactId || item.serverId;
                                const name = item.name || item.title || id || item.id;
                                const alreadyAdded = existingIds.has(id);
                                const checked = alreadyAdded || selected.has(id);
                                return (
                                    <div key={item.id || id} className="flex min-w-0 items-center gap-2 border-b p-2 last:border-b-0 hover:bg-muted/40">
                                        <Checkbox
                                            checked={checked}
                                            disabled={loading || !id || alreadyAdded}
                                            aria-label={t('attachment_library_select_item', { name, defaultValue: '选择 {{name}}' })}
                                            onCheckedChange={() => toggle(item)}
                                        />
                                        <button
                                            type="button"
                                            disabled={loading || !id || alreadyAdded}
                                            aria-pressed={checked}
                                            onClick={() => toggle(item)}
                                            className="flex min-w-0 flex-1 items-center gap-2 rounded-md p-1 text-left text-sm hover:bg-muted/60 disabled:cursor-default disabled:opacity-70"
                                        >
                                            <AttachmentThumbnail item={item} />
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate font-medium" title={name}>{name}</span>
                                                <span className="block truncate text-xs text-muted-foreground">
                                                    {alreadyAdded
                                                        ? t('attachment_library_already_added', '已添加')
                                                        : item.type || item.fileType || t('attachment_library_file', '文件')}
                                                </span>
                                            </span>
                                        </button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 shrink-0"
                                            aria-label={t('attachment_library_preview', { name, defaultValue: '查看 {{name}}' })}
                                            onClick={() => setPreviewItem(item)}
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                    </div>
                                );
                            })}
                            {!loading && !error && items.length === 0 && (
                                <p className="p-6 text-center text-sm text-muted-foreground">{t('attachment_library_empty', '没有找到附件。')}</p>
                            )}
                        </div>
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/75 text-sm text-muted-foreground" role="status">
                                <Loader2 className="size-4 animate-spin" />
                                {t('attachment_library_loading', '正在加载附件…')}
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="flex items-center justify-between gap-2 text-sm text-destructive" role="alert">
                            <span>{error}</span>
                            <Button type="button" variant="outline" size="sm" onClick={() => setRefresh((value) => value + 1)}>
                                {t('retry')}
                            </Button>
                        </div>
                    )}
                    <div className="flex shrink-0 items-center justify-between">
                        <Button type="button" size="sm" variant="ghost" disabled={!offset || loading} onClick={() => setOffset((value) => Math.max(0, value - PAGE_SIZE))}>
                            {t('prev_page')}
                        </Button>
                        <span className="text-xs text-muted-foreground">{page} / {pages}</span>
                        <Button type="button" size="sm" variant="ghost" disabled={offset + PAGE_SIZE >= total || loading} onClick={() => setOffset((value) => value + PAGE_SIZE)}>
                            {t('next_page')}
                        </Button>
                    </div>
                </div>
                <DialogFooter className="shrink-0 border-t px-5 py-3">
                    <Button type="button" variant="outline" onClick={onClose}>{t('cancel')}</Button>
                    <Button type="button" disabled={selected.size === 0} onClick={() => onConfirm([...selected.values()])}>
                        {t('attachment_library_confirm', '添加所选附件')}
                    </Button>
                </DialogFooter>
            </DialogContent>
            {previewItem && (
                <WorkflowResourcePreview
                    key={previewItem.id || previewItem.artifactId}
                    item={previewItem}
                    sourceKind="attachment"
                    onClose={() => setPreviewItem(null)}
                />
            )}
        </Dialog>
    );
}
