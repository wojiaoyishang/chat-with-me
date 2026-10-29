import {useConversationMutationGuard} from '@/features/chat/freeze/ConversationFreezeContext.jsx';
import { useEffect, useRef, useState } from 'react';
import { Loader2, MessageSquarePlus, Pencil, RotateCcw, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { emitEvent } from '@/context/useEventStore.jsx';
import { openGuidanceEditor, upsertExecution } from './useExecutionStore.js';
import { isQueuedExecutionGuidance, isUserExecutionGuidance } from './executionStatusModel.js';

export default function ExecutionGuidanceAction({ activity, execution, surface = 'conversation' }) {
    const freeze = useConversationMutationGuard(execution?.conversationId);
    const [pendingOperation, setPendingOperation] = useState(null);
    const operationRef = useRef(null);
    const identity = JSON.stringify([execution?.conversationId, execution?.executionId, activity?.id]);
    const identityRef = useRef(identity);
    identityRef.current = identity;
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const state = String(activity?.state || '').toLowerCase();
    const withdrawn = state === 'withdrawn';
    const replaced = state === 'replaced' || Boolean(activity?.replacedByGuidanceId);
    const pending = pendingOperation?.identity === identity;
    const editable = activity?.canRewrite === true;
    if (!isUserExecutionGuidance(activity) || isQueuedExecutionGuidance(activity) || replaced || !execution?.active || execution.status === 'cancelling') return null;
    if (!execution?.conversationId || !execution?.executionId || !activity?.id) return null;
    if (withdrawn && surface !== 'execution_window') return null;

    const openEditor = (target, mode) => {
        if (!freeze.canMutate()) return;
        try {
            if (openGuidanceEditor(target, {guidanceId: activity.id, mode}) === false)
                throw new Error('无法打开这条补充的编辑区，请确认执行和补充消息仍然有效。');
        } catch (error) {
            toast.error(error.message || '无法打开补充编辑区，请重试。');
        }
    };
    const change = async (operation) => {
        if (!freeze.canMutate()) return;
        // The ref also guards two clicks before React has painted the disabled state.
        if (operationRef.current?.identity === identity) return;
        const token = {identity};
        operationRef.current = token;
        setPendingOperation(token);
        try {
            const response = await emitEvent({
                event: operation === 'restore' ? 'execution.guidance.restore' : 'execution.guidance.withdraw',
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: { executionId: execution.executionId, guidanceId: activity.id },
            });
            if (response?.success !== true)
                throw new Error(typeof response?.value === 'string' ? response.value : response?.value?.message || '无法修改补充消息，请重试。');
            const snapshot = response.value?.execution;
            if (!snapshot || snapshot.executionId !== execution.executionId || snapshot.conversationId !== execution.conversationId)
                throw new Error('服务器未返回对应执行的最新状态，请刷新后重试。');
            // This ACK may hide and unmount the source bubble synchronously. Only
            // navigation that happened before it arrived should suppress editing.
            const allowOpen = mountedRef.current && identityRef.current === identity;
            // Keep the original session up to date even if navigation unmounted this row.
            upsertExecution(snapshot);
            if (operation === 'rewrite' && allowOpen) {
                const source = snapshot.activities?.find((item) => item.id === activity.id);
                if (source?.state !== 'withdrawn' || source.canRewrite !== true || source.replacedByGuidanceId)
                    throw new Error('这条补充的状态已变化，无法重新编辑，请使用补充更正。');
                openEditor(snapshot, 'rewrite');
            }
        } catch (error) {
            toast.error(error.message || '无法修改补充消息，请重试。');
        } finally {
            if (operationRef.current === token) {
                operationRef.current = null;
                if (mountedRef.current) setPendingOperation(null);
            }
        }
    };
    const actions = withdrawn ? [
        ...(editable ? [{key: 'rewrite', label: '重新编辑', Icon: Pencil, onClick: () => openEditor(execution, 'rewrite')}] : []),
        ...(activity.canToggle === true ? [{key: 'restore', label: '恢复原文', Icon: RotateCcw, onClick: () => change('restore')}] : []),
    ] : activity.canToggle === true ? [
        {key: 'withdraw', label: '撤回', Icon: Undo2, onClick: () => change('withdraw')},
        {key: 'rewrite', label: '撤回并编辑', Icon: Pencil, onClick: () => change('rewrite')},
    ] : activity.canToggle === false && !['failed', 'submitting'].includes(state) ? [
        {key: 'correction', label: '补充更正', Icon: MessageSquarePlus, onClick: () => openEditor(execution, 'correction')},
    ] : [];
    if (!actions.length) return null;
    return (
        <span className="ml-1 inline-flex flex-wrap items-center gap-0.5" data-guidance-actions={surface}>
            {actions.map((action) => (
                <Button
                    key={action.key}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1 px-1.5 text-[11px] font-normal text-gray-500 hover:text-gray-800"
                    disabled={freeze.blocked || pending}
                    title={action.label}
                    aria-label={action.label}
                    onClick={action.onClick}
                >
                    {pending ? <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> : <action.Icon className="h-3 w-3" aria-hidden="true" />}
                    {action.label}
                </Button>
            ))}
        </span>
    );
}
