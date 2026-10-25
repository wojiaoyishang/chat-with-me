import {useEffect} from 'react';
import {CheckCircle2, Copy, Loader2, TriangleAlert} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Progress} from '@/components/ui/progress';
import {useTaskStore} from '@/features/tasks/useTaskStore.js';
import useConversationFork from './useConversationFork.js';

export default function ConversationForkDialog({operation, open, onOpenChange, onComplete, onSelect, onStatusChange}) {
    const {t} = useTranslation();
    const {task, confirmed, submitting, submitError, refreshError, confirmFork, retrySubmission, terminal} = useConversationFork({
        conversationId: operation.conversationId,
        clientRequestId: operation.clientRequestId,
        onComplete: (result) => { onStatusChange?.('completed'); onComplete?.(result); },
    });
    const complete = task?.status === 'completed' && Boolean(task?.result?.conversationId);
    const failed = terminal && !complete;
    useEffect(() => {
        if (failed) onStatusChange?.('finished');
    }, [failed, onStatusChange]);
    const progress = typeof task?.progress === 'number' && Number.isFinite(task.progress)
        ? Math.max(0, Math.min(100, task.progress)) : null;
    const stage = task?.stage || task?.status || 'submitting';
    const showTask = () => {
        if (!task?.taskId) return;
        onOpenChange(false);
        useTaskStore.getState().show(task.taskId);
    };
    const close = () => {
        if (terminal || !confirmed) onStatusChange?.('finished');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={(next) => next ? onOpenChange(true) : close()}>
            <DialogContent className="sm:max-w-md" data-conversation-fork={operation.conversationId}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {complete ? <CheckCircle2 className="h-5 w-5 text-emerald-600"/>
                            : failed || submitError ? <TriangleAlert className="h-5 w-5 text-destructive"/>
                                : <Copy className="h-5 w-5"/>}
                        {t(complete ? 'conversationFork.completed' : failed ? 'conversationFork.failed' : !confirmed ? 'conversationFork.confirmTitle' : 'conversationFork.title')}
                    </DialogTitle>
                    <DialogDescription className="break-words">{operation.title}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3" aria-live="polite" aria-busy={confirmed && !terminal && !submitError}>
                    {!confirmed ? (
                        <div className="space-y-2 text-sm leading-relaxed">
                            <p>{t('conversationFork.confirmDescription')}</p>
                            <p className="text-muted-foreground">{t('conversationFork.freezeHint')}</p>
                        </div>
                    ) : complete ? (
                        <div className="space-y-1 text-sm"><p>{t('conversationFork.result', {count: Number(task.result.messageCount || 0)})}</p>{Number(task.result.skippedMessageCount || 0) > 0 && <p className="text-muted-foreground">{t('conversationFork.skippedResult', {count: Number(task.result.skippedMessageCount)})}</p>}</div>
                    ) : submitError ? (
                        <div role="alert" className="space-y-2 text-sm">
                            <p className="text-destructive">{submitError}</p>
                            <p className="text-muted-foreground">{t('conversationFork.confirmHint')}</p>
                        </div>
                    ) : failed ? (
                        <p role="alert" className="break-words text-sm text-destructive">{task.error || t(task.status === 'cancelled' ? 'conversationFork.cancelled' : 'conversationFork.failed')}</p>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/>{t(`conversationFork.stages.${stage}`, {defaultValue: t('conversationFork.stages.running')})}</span>
                                {progress !== null && <span className="shrink-0 tabular-nums">{Math.floor(progress)}%</span>}
                            </div>
                            {progress !== null
                                ? <Progress value={progress} aria-label={t('conversationFork.progress')} aria-valuenow={progress}/>
                                : <div role="progressbar" aria-label={t('conversationFork.progress')} className="h-2 animate-pulse rounded-full bg-primary/20"/>}
                            <p className="text-xs leading-relaxed text-muted-foreground">{t('conversationFork.backgroundHint')}</p>
                        </>
                    )}
                    {refreshError && !terminal && <p role="status" className="break-words text-xs text-amber-700 dark:text-amber-400">{t('conversationFork.reconnecting')} {refreshError}</p>}
                </div>
                <DialogFooter className="gap-2">
                    <Button type="button" variant="outline" onClick={close}>{t(!confirmed ? 'cancel' : terminal || submitError ? 'close' : 'conversationFork.closeWhileRunning')}</Button>
                    {!confirmed && <Button type="button" disabled={submitting} onClick={() => void confirmFork()}>{t('conversationFork.confirmAction')}</Button>}
                    {submitError && <Button type="button" disabled={submitting} onClick={() => void retrySubmission()}>{t('conversationFork.retryConfirmation')}</Button>}
                    {task?.taskId && !complete && <Button type="button" variant="outline" onClick={showTask}>{t('conversationFork.viewTask')}</Button>}
                    {complete && <Button type="button" onClick={() => { onOpenChange(false); onSelect?.(task.result.conversationId); }}>{t('conversationFork.openCopy')}</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
