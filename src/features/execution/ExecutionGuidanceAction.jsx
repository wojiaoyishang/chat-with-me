import { useState } from 'react';
import { Loader2, RotateCcw, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { emitEvent } from '@/context/useEventStore.jsx';
import { upsertExecution } from './useExecutionStore.js';

export default function ExecutionGuidanceAction({ activity, execution }) {
    const [pending, setPending] = useState(false);
    if (activity?.canToggle !== true || !execution?.active || execution.status === 'cancelling') return null;
    const withdrawn = activity.state === 'withdrawn';
    const label = withdrawn ? '恢复补充' : '撤回补充';
    const Icon = pending ? Loader2 : withdrawn ? RotateCcw : Undo2;
    const change = async () => {
        if (pending) return;
        setPending(true);
        try {
            const response = await emitEvent({
                event: withdrawn ? 'execution.guidance.restore' : 'execution.guidance.withdraw',
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: { executionId: execution.executionId, guidanceId: activity.id },
            });
            if (response?.success !== true)
                throw new Error(typeof response?.value === 'string' ? response.value : '无法修改补充消息，请重试。');
            if (response.value?.execution) upsertExecution(response.value.execution);
        } catch (error) {
            toast.error(error.message || '无法修改补充消息，请重试。');
        } finally {
            setPending(false);
        }
    };
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            disabled={pending}
            title={label}
            aria-label={label}
            onClick={change}
        >
            <Icon className={`h-3.5 w-3.5 ${pending ? 'animate-spin' : ''}`} />
        </Button>
    );
}
