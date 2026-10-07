import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Download, RefreshCw, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { useTaskStore } from './useTaskStore.js';
import { downloadAttachmentResource } from '@/lib/resourceDownload.js';
import { toast } from 'sonner';

export function TaskCenterTrigger({ listItem = false } = {}) {
    const { t } = useTranslation();
    const show = useTaskStore((s) => s.show);
    const tasks = useTaskStore((s) => s.tasks);
    const count = Object.values(tasks).filter((task) =>
        ['queued', 'running', 'cancel_requested'].includes(task.status),
    ).length;
    return (
        <Button
            variant="ghost"
            size={listItem ? 'default' : 'icon'}
            className={`relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}`}

            aria-label={t('taskCenter.title')}
            title={t('taskCenter.title')}
            onClick={() => show()}
        >
            <ClipboardList className="size-4 shrink-0" />
            {listItem && <span>{t('taskCenter.title')}</span>}
            {count > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                    {count}
                </span>
            )}
        </Button>
    );
}

export default function TaskCenter() {
    const { t } = useTranslation();
    const { tasks, open, selectedId, setOpen, show, merge } = useTaskStore();
    const [busy, setBusy] = useState(null);
    const selected = useRef(null);
    const selectedTaskId = tasks[selectedId]?.taskId;
    const [loadError, setLoadError] = useState(null);
    useEffect(() => {
        let disposed = false;
        const load = () =>
            apiClient
                .get(apiEndpoint.TASKS_ENDPOINT)
                .then((data) => {
                    if (!disposed) {
                        merge(data.tasks || []);
                        setLoadError(null);
                    }
                })
                .catch((error) => {
                    if (!disposed) setLoadError(error.message);
                });
        void load();
        const changed = onEvent({ event: 'task.changed' }).then(({ payload }) => merge([payload]));
        const reconnect = onEvent({ event: 'transport.connected' }).then(() => void load());
        const openTasks = onEvent({ event: 'task.center.open' }).then(({ payload }) => show(payload.taskId));
        return () => {
            disposed = true;
            changed();
            reconnect();
            openTasks();
        };
    }, [merge, show]);
    useEffect(() => {
        if (open && selectedId) {
            apiClient
                .get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(selectedId)}`)
                .then((task) => merge([task]))
                .catch((error) => toast.error(error.message));
        }
    }, [open, selectedId, merge]);
    useEffect(() => {
        if (open) selected.current?.scrollIntoView({ block: 'nearest' });
    }, [open, selectedId, selectedTaskId]);
    const action = async (task, operation) => {
        setBusy(task.taskId);
        try {
            merge([await apiClient.post(`${apiEndpoint.TASKS_ENDPOINT}/${task.taskId}/${operation}`)]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(null);
        }
    };
    const list = Object.values(tasks).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return (
        <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetContent
                className="w-full sm:max-w-lg flex flex-col p-0"
                onInteractOutside={(event) => {
                    // Notifications remain interactive without dismissing the task panel.
                    if (event.target instanceof Element && event.target.closest('[data-sonner-toaster]')) {
                        event.preventDefault();
                    }
                }}
            >
                <SheetHeader className="p-5 border-b">
                    <SheetTitle>{t('taskCenter.title')}</SheetTitle>
                    <SheetDescription>{t('taskCenter.description')}</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto space-y-3 p-4">
                    {loadError && <p className="text-sm text-destructive">{loadError}</p>}
                    {!list.length && !loadError && (
                        <p className="py-12 text-center text-muted-foreground">{t('taskCenter.empty')}</p>
                    )}
                    {list.map((task) => (
                        <article
                            key={task.taskId}
                            ref={task.taskId === selectedId ? selected : null}
                            className={`rounded-xl border p-4 space-y-3 ${task.taskId === selectedId ? 'border-primary' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="min-w-0 break-words font-medium">{task.title}</h3>
                                <span className="shrink-0 text-xs text-muted-foreground">
                                    {t(`taskCenter.${task.status}`)}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">{t(`taskCenter.${task.stage}`)}</div>
                            {['running', 'queued', 'cancel_requested'].includes(task.status) &&
                                (task.progress === null ? (
                                    <div className="h-1.5 rounded-full bg-muted animate-pulse" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Progress value={task.progress || 0} />
                                        <span className="text-xs">{task.progress || 0}%</span>
                                    </div>
                                ))}
                            <time className="block text-xs text-muted-foreground">
                                {new Date(task.createdAt).toLocaleString()}
                            </time>
                            {task.submission && (
                                <details className="text-xs text-muted-foreground">
                                    <summary className="cursor-pointer">{t('taskCenter.submission')}</summary>
                                    <dl className="mt-2 space-y-1 break-all">
                                        {Object.entries(task.submission)
                                            .filter(([, value]) => value != null)
                                            .map(([key, value]) => (
                                                <div key={key}>
                                                    <dt className="inline font-medium">{key}: </dt>
                                                    <dd className="inline">{String(value)}</dd>
                                                </div>
                                            ))}
                                    </dl>
                                </details>
                            )}
                            <details className="text-xs text-muted-foreground">
                                <summary className="cursor-pointer">{t('taskCenter.details')}</summary>
                                <ol className="mt-2 space-y-1">
                                    {(task.history || []).map((entry, index) => (
                                        <li key={index}>
                                            {new Date(entry.time).toLocaleTimeString()} ·{' '}
                                            {t(`taskCenter.${entry.stage}`)}
                                        </li>
                                    ))}
                                </ol>
                            </details>
                            {task.error && <p className="text-sm text-destructive break-words">{task.error}</p>}
                            {task.result?.warnings?.length > 0 && (
                                <ul className="text-xs text-muted-foreground space-y-1">
                                    {task.result.warnings.map((warning, index) => (
                                        <li key={index}>{warning}</li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {task.result?.url && (
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            void downloadAttachmentResource(
                                                task.result.url,
                                                task.result.filename,
                                            ).catch((error) => toast.error(error.message))
                                        }
                                    >
                                        <Download className="size-4 mr-1" />
                                        {t('taskCenter.download')}
                                    </Button>
                                )}
                                {['queued', 'running'].includes(task.status) && task.stage !== 'registering' && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={busy === task.taskId}
                                        onClick={() => void action(task, 'cancel')}
                                    >
                                        <X className="size-4 mr-1" />
                                        {t('taskCenter.cancel')}
                                    </Button>
                                )}
                                {['failed', 'cancelled'].includes(task.status) && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={busy === task.taskId}
                                        onClick={() => void action(task, 'retry')}
                                    >
                                        <RefreshCw className="size-4 mr-1" />
                                        {t('taskCenter.retry')}
                                    </Button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
