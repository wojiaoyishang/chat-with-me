import React, { useRef, useState } from 'react';
import { CornerDownRight, ListEnd, LoaderCircle, MoreHorizontal, Paperclip, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { emitEvent } from '@/context/useEventStore.jsx';
import { upsertExecution } from '@/features/execution/useExecutionStore.js';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { isImageAttachment, normalizeAttachmentList } from '../../../attachmentVision.js';
import { mutatePendingGuidance, pendingGuidanceSummary } from '../../../composer/pendingGuidance.js';
import { clearComposerGuidanceEdit, readComposerGuidanceEdits, saveComposerGuidanceEdit } from '../../../composer/draftStore.js';

// A mounted retry and an older unmounted row may receive the same idempotent
// server edit receipt. Restore that operation into a draft only once.
const restoringEdits = new Map();

export default function PendingExecutionGuidanceQueue({ conversationId, items = [], onEdit, disabled = false, submitting = false, uncertain = false, onRetry }) {
    const sourceConversationId = conversationId || items[0]?.execution?.conversationId || '';
    const [busy, setBusy] = useState(() => new Set());
    const [editReceipts, setEditReceipts] = useState(() => readComposerGuidanceEdits(sourceConversationId));
    const edits = useRef(new Map(editReceipts.map((receipt) => [`${receipt.execution.executionId}:${receipt.guidanceId}`, receipt])));
    const pending = useRef(new Set());
    const mounted = useRef(true);
    const renderedConversation = useRef(sourceConversationId);
    renderedConversation.current = sourceConversationId;
    const visibleEditReceipts = editReceipts.filter((receipt) => receipt.execution.conversationId === sourceConversationId);
    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);
    React.useEffect(() => {
        const saved = readComposerGuidanceEdits(sourceConversationId);
        edits.current = new Map(saved.map((receipt) => [`${receipt.execution.executionId}:${receipt.guidanceId}`, receipt]));
        setEditReceipts(saved);
    }, [sourceConversationId]);

    const mutate = async (action, execution, guidance) => {
        const key = `${execution.executionId}:${guidance.id}`;
        if (pending.current.has(key) || disabled || execution.conversationId !== renderedConversation.current) return;
        let editReceipt = edits.current.get(key);
        if (action === 'edit' && !editReceipt) {
            const receipt = saveComposerGuidanceEdit(execution.conversationId, execution, guidance);
            if (!receipt) { toast.error('无法保存取回编辑操作，请重试。'); return; }
            editReceipt = { ...receipt, localOnly: !readComposerGuidanceEdits(execution.conversationId).some((item) => `${item.execution.executionId}:${item.guidanceId}` === key) };
            edits.current.set(key, editReceipt);
            setEditReceipts([...edits.current.values()]);
        }
        const finishEdit = () => {
            clearComposerGuidanceEdit(execution.conversationId, execution.executionId, guidance.id);
            edits.current.delete(key);
            if (mounted.current && renderedConversation.current === execution.conversationId) setEditReceipts([...edits.current.values()]);
        };
        pending.current.add(key);
        setBusy(new Set(pending.current));
        try {
            const recovered = await mutatePendingGuidance({ action, execution, guidance, emitEvent, upsert: upsertExecution });
            if (recovered) {
                if (typeof onEdit !== 'function') throw new Error('编辑器尚未就绪，请重试取回。');
                const restoreKey = `${execution.conversationId}:${key}`;
                const restoring = restoringEdits.get(restoreKey);
                if (restoring) {
                    await restoring;
                    finishEdit();
                } else if (!editReceipt?.localOnly && !readComposerGuidanceEdits(execution.conversationId)
                    .some((item) => `${item.execution.executionId}:${item.guidanceId}` === key)) {
                    // Another mounted composer already restored and committed it.
                    finishEdit();
                } else {
                    const restore = Promise.resolve().then(() => onEdit(recovered, execution));
                    restoringEdits.set(restoreKey, restore);
                    try { await restore; finishEdit(); }
                    finally { restoringEdits.delete(restoreKey); }
                }
            }
        } catch (error) {
            if (action === 'edit' && error?.definitive) finishEdit();
            if (mounted.current && renderedConversation.current === execution.conversationId) toast.error(error?.message || '操作失败，请重试。');
        } finally {
            pending.current.delete(key);
            if (mounted.current && renderedConversation.current === execution.conversationId) setBusy(new Set(pending.current));
        }
    };

    if (!items.length && !submitting && !uncertain && !visibleEditReceipts.length) return null;
    return (
        <div className="pointer-events-auto mb-1 max-h-[180px] shrink-0 space-y-1 overflow-y-auto overscroll-contain px-1 pretty-scrollbar" role="region" aria-label="待接收的补充消息" data-pending-guidance-queue>
            {items.map(({ execution, guidance }) => {
                const attachments = normalizeAttachmentList(guidance.attachments);
                const image = attachments.find(isImageAttachment);
                const preview = image ? resolveResourceUrl(image.preview || `cwm://artifact/${image.serverId || image.artifactId}/preview`) : '';
                const summary = pendingGuidanceSummary(guidance);
                const isBusy = busy.has(`${execution.executionId}:${guidance.id}`);
                const actionDisabled = disabled || isBusy || edits.current.has(`${execution.executionId}:${guidance.id}`);
                return (
                    <div key={`${execution.executionId}:${guidance.id}`} data-pending-guidance={guidance.id} className="flex h-11 min-w-0 items-center gap-2 rounded-2xl border border-neutral-200/80 bg-white/95 px-3 text-sm shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <ListEnd className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        {preview ? <img src={preview} alt={image.name || '图片附件'} className="size-7 shrink-0 rounded-md border object-cover" /> : attachments.length > 0 ? <Paperclip className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
                        <span className="min-w-0 flex-1 truncate" title={summary}>{summary}</span>
                        {attachments.length > 1 && <span className="shrink-0 text-xs text-muted-foreground">{attachments.length} 个附件</span>}
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground" title="在模型下一次接收补充内容时加入当前执行">
                            {isBusy ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" /> : <CornerDownRight className="size-3.5" aria-hidden="true" />}待接收
                        </span>
                        <button type="button" disabled={actionDisabled} aria-label="删除待接收消息" onClick={() => mutate('delete', execution, guidance)} className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-neutral-100 hover:text-destructive disabled:opacity-40 dark:hover:bg-neutral-800"><Trash2 className="size-3.5" aria-hidden="true" /></button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><button type="button" disabled={actionDisabled} aria-label="更多待接收消息操作" className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-neutral-100 disabled:opacity-40 dark:hover:bg-neutral-800"><MoreHorizontal className="size-4" aria-hidden="true" /></button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" side="top" collisionPadding={12}>
                                <DropdownMenuItem onSelect={() => mutate('edit', execution, guidance)}><Pencil />编辑后重新发送</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            })}
            {visibleEditReceipts.map((receipt) => {
                const key = `${receipt.execution.executionId}:${receipt.guidanceId}`;
                const isBusy = busy.has(key);
                return <div key={`edit:${key}`} role="status" data-guidance-edit-recovery={receipt.guidanceId} className="flex min-h-10 items-center justify-between gap-2 rounded-xl border border-neutral-200/70 bg-white/95 px-3 py-1.5 text-xs text-muted-foreground dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="min-w-0 flex-1"><span className="block">{isBusy ? '正在取回编辑内容…' : '编辑结果尚未确认'}</span><span className="block truncate" title={pendingGuidanceSummary(receipt.guidance)}>{pendingGuidanceSummary(receipt.guidance)}</span></div>
                    <button type="button" disabled={disabled || isBusy} onClick={() => mutate('edit', receipt.execution, receipt.guidance)} className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-foreground hover:bg-neutral-100 disabled:opacity-40 dark:hover:bg-neutral-800">{isBusy && <LoaderCircle className="size-3 animate-spin" aria-hidden="true" />}重试取回</button>
                </div>;
            })}
            {submitting && <div role="status" className="flex h-9 items-center gap-2 px-3 text-xs text-muted-foreground"><LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />正在提交补充内容…</div>}
            {uncertain && <div role="status" className="flex min-h-9 items-center justify-between gap-2 px-3 text-xs text-muted-foreground"><span>补充内容尚未确认，草稿已保留</span><button type="button" disabled={disabled} onClick={onRetry} className="shrink-0 rounded-md px-2 py-1 text-foreground hover:bg-neutral-100 disabled:opacity-40 dark:hover:bg-neutral-800">重试确认</button></div>}
        </div>
    );
}
