import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { onEvent } from '@/context/useEventStore.jsx';
import { toast } from 'sonner';
import apiClient from '@/lib/apiClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { History, Search, RotateCcw } from 'lucide-react';
import DocumentDiff from './DocumentDiff.jsx';

export default function DocumentHistory({ documentId, open, onOpenChange, restore, saving, currentContent }) {
    const { t, i18n } = useTranslation();
    const [versions, setVersions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!open) return;
        let active = true;
        setError('');
        setVersions([]);
        setQuery('');
        setSelected(null);
        setDetail(null);
        let request = 0;
        const refresh = async () => {
            const current = ++request;
            try {
                const data = await apiClient.get(`/document/${documentId}/history`);
                if (active && current === request) {
                    setVersions(data);
                    setSelected((value) => value || data[0]?.commit || null);
                }
            } catch (cause) {
                if (active && current === request) setError(cause.message);
            }
        };
        void refresh();
        const unsubscribe = onEvent({ event: 'document.version.changed', documentId, direction: 'incoming' }).then(
            () => void refresh(),
        );
        return () => {
            active = false;
            unsubscribe();
        };
    }, [documentId, open]);
    useEffect(() => {
        if (!open || !selected) return;
        let active = true;
        setDetail(null);
        setError('');
        setLoading(true);
        setConfirm(false);
        apiClient
            .get(`/document/${documentId}/history/${selected}`)
            .then((data) => {
                if (active) setDetail(data);
            })
            .catch((cause) => {
                if (active) setError(cause.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [documentId, selected, open]);
    const handleRestore = async () => {
        try {
            await restore(selected);
            toast.success(t('documents_restored_and_saved_as_a_new_version'));
            onOpenChange(false);
        } catch (cause) {
            toast.error(cause.message);
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex h-[90dvh] w-[96vw] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-[96vw]"
                aria-describedby={undefined}
            >
                <DialogHeader className="shrink-0 border-b px-5 py-4 pr-12">
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <History className="size-4 text-muted-foreground" />
                        {t('documents_version_history')}
                    </DialogTitle>
                </DialogHeader>
                {error && (
                    <p role="alert" className="border-b px-4 py-2 text-sm text-destructive">
                        {error}
                    </p>
                )}
                <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                    <aside className="flex max-h-[25vh] shrink-0 flex-col border-b bg-muted/10 md:max-h-none md:w-64 md:border-r md:border-b-0">
                        <div className="relative shrink-0 border-b p-3">
                            <Search className="pointer-events-none absolute top-5 left-5 size-4 text-muted-foreground" />
                            <Input
                                className="pl-8"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={t('documents_search_versions')}
                                aria-label={t('documents_search_versions')}
                            />
                        </div>
                        <div className="min-h-0 flex-1 overflow-auto p-2">
                            {versions
                                .filter((version) =>
                                    `${version.note} ${version.actor?.name || ''} ${new Date(version.createdAt).toLocaleString(i18n.language)}`
                                        .toLowerCase()
                                        .includes(query.toLowerCase()),
                                )
                                .map((version) => (
                                    <Button
                                        key={version.commit}
                                        variant={selected === version.commit ? 'secondary' : 'ghost'}
                                        aria-pressed={selected === version.commit}
                                        className="mb-1 h-auto w-full justify-start whitespace-normal px-3 py-3 text-left"
                                        onClick={() => setSelected(version.commit)}
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-sm">{version.note}</span>
                                            <span className="mt-1 block text-xs text-muted-foreground">
                                                {new Date(version.createdAt).toLocaleString(i18n.language)}
                                            </span>
                                            <span className="mt-1 block truncate text-xs text-muted-foreground">
                                                {version.actor?.name}
                                            </span>
                                        </span>
                                    </Button>
                                ))}
                            {!versions.length && !error && (
                                <p className="p-3 text-xs text-muted-foreground">{t('documents_no_versions')}</p>
                            )}
                        </div>
                    </aside>
                    {detail ? (
                        <DocumentDiff
                            before={detail.content}
                            current={currentContent}
                            versionLabel={new Date(
                                versions.find((version) => version.commit === selected)?.createdAt || Date.now(),
                            ).toLocaleString(i18n.language)}
                        />
                    ) : (
                        <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
                            {loading ? t('documents_loading') : t('documents_select_version')}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                    {confirm && (
                        <span className="mr-auto text-xs text-muted-foreground">
                            {t('documents_restore_content_and_attachments_while_preserving_the_current_version')}
                        </span>
                    )}
                    <Button variant="outline" onClick={() => (confirm ? setConfirm(false) : onOpenChange(false))}>
                        {confirm ? t('documents_cancel_restore') : t('documents_close')}
                    </Button>
                    <Button
                        disabled={!detail || saving}
                        onClick={() => (confirm ? void handleRestore() : setConfirm(true))}
                    >
                        <RotateCcw className="mr-1 size-4" />
                        {saving
                            ? t('documents_restoring')
                            : confirm
                              ? t('documents_confirm_restore')
                              : t('documents_restore_this_version')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
