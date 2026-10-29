import { workflowArtifacts } from "../workflows/workflowProducts.js";
import { formatLocalTimestamp } from '@/lib/clientText.js';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Download, RefreshCw, X, ArrowUpRight, Play, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { useTaskStore } from './useTaskStore.js';
import { downloadAttachmentResource } from '@/lib/resourceDownload.js';
import RunObservation from './RunObservation.jsx';
import { toast } from 'sonner';

const taskStatusNames = { queued: '排队中', pending: '等待中', running: '运行中', completed: '已完成', failed: '失败', cancelled: '已取消', cancel_requested: '取消中', pause_requested: '等待阶段暂停', paused: '已暂停' };

export function TaskCenterTrigger({ listItem = false } = {}) {
    const { t } = useTranslation();
    const show = useTaskStore((s) => s.show);
    const tasks = useTaskStore((s) => s.tasks);
    const count = Object.values(tasks).filter((task) =>
        ['queued', 'pending', 'running', 'cancel_requested', 'pause_requested'].includes(task.status),
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
    const navigate = useNavigate();
    const { tasks, open, selectedId, setOpen, show, merge } = useTaskStore();
    const [busy, setBusy] = useState(null);
    const selected = useRef(null);
    const selectedTaskId = tasks[selectedId]?.taskId;
    const [loadError, setLoadError] = useState(null);
    const [definitions, setDefinitions] = useState({});
    const stageName = (task, stage) => definitions[task.kind]?.stages?.find((item) => item.key === stage)?.name ||
        t(`taskCenter.${stage}`, { defaultValue: taskStatusNames[stage] || stage || '等待执行' });
    const openManagement = (taskId) => {
        setOpen(false);
        navigate(`/tasks${taskId ? `?taskId=${encodeURIComponent(taskId)}` : ''}`);
    };
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
        apiClient.get(`${apiEndpoint.TASKS_ENDPOINT}/definitions`).then((data) => {
            if (!disposed) setDefinitions(Object.fromEntries((data.definitions || []).map((item) => [item.kind, item])));
        }).catch(() => undefined);
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
                <div className="flex justify-end gap-2 border-b px-4 pb-3">
                    <Button size="sm" variant="ghost" onClick={() => { setOpen(false); navigate('/tasks?view=schedules'); }}>
                        <CalendarClock className="mr-1 size-4" />计划任务
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => openManagement(selectedId)}>
                        <ArrowUpRight className="mr-1 size-4" />任务管理
                    </Button>
                </div>
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
                                    {task.status === 'completed' && task.result?.partial ? '部分完成' : t(`taskCenter.${task.status}`, { defaultValue: taskStatusNames[task.status] || task.status })}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">{stageName(task, task.stage)}</div>
                            <time className="block text-xs text-muted-foreground">
                                {formatLocalTimestamp(task.createdAt)}
                            </time>
                            <RunObservation observation={task.observation} taskId={task.taskId} view="summary" compact />
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
                                            {formatLocalTimestamp(entry.time)} · {stageName(task, entry.stage)}
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
                                <Button size="sm" variant="outline" onClick={() => openManagement(task.taskId)}>
                                    <ArrowUpRight className="mr-1 size-4" />查看任务详情
                                </Button>
                                {task.kind === 'conversation.fork' && task.status === 'completed' && task.result?.conversationId && (
                                    <Button size="sm" onClick={() => {
                                        setOpen(false);
                                        navigate(`/chat/${encodeURIComponent(task.result.conversationId)}`);
                                    }}>
                                        <ArrowUpRight className="mr-1 size-4" />打开副本
                                    </Button>
                                )}
                                {task.status === 'paused' && definitions[task.kind]?.capabilities?.resume && (
                                    <Button size="sm" variant="outline" disabled={busy === task.taskId} onClick={() => void action(task, 'resume')}>
                                        <Play className="mr-1 size-4" />继续
                                    </Button>
                                )}
                                <div className="flex max-h-40 min-w-0 max-w-full flex-col gap-1 overflow-y-auto">
                                    {workflowArtifacts(task.result).map((file) => (
                                        <Button
                                            key={`${file.nodeId}:${file.artifactId}`}
                                            className="max-w-full justify-start"
                                            size="sm"
                                            onClick={() =>
                                                void downloadAttachmentResource(
                                                    file.url,
                                                    file.filename,
                                                ).catch((error) => toast.error(error.message))
                                            }
                                        >
                                            <Download className="size-4 mr-1" />
                                            <span className="truncate">{file.filename || t('taskCenter.download')}</span>
                                        </Button>
                                    ))}
                                </div>
                                {definitions[task.kind]?.capabilities?.cancel !== false && ['queued', 'pending', 'running', 'pause_requested', 'paused'].includes(task.status) && task.stage !== 'registering' && (
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
                                {definitions[task.kind]?.capabilities?.retry === true && (['failed', 'cancelled'].includes(task.status) || task.status === 'completed' && task.result?.partial) && (
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
