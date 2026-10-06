import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pause, Play, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { emitEvent } from '@/context/useEventStore.jsx';
import { upsertExecution } from './useExecutionStore.js';
import { toast } from 'sonner';
export default function ExecutionPauseControl({ execution }) {
    const { t } = useTranslation();
    const [busy, setBusy] = useState(false);
    const { pauseRequested, paused } = execution.thinking || {};
    const label = t(
        paused ? 'executionPause.resume' : pauseRequested ? 'executionPause.cancel' : 'executionPause.pause',
    );
    const Icon = busy ? Loader2 : paused ? Play : pauseRequested ? X : Pause;
    const change = async () => {
        setBusy(true);
        try {
            const response = await emitEvent({
                event: 'execution.pause.set',
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: { executionId: execution.executionId, enable: !pauseRequested },
            });
            if (response?.success !== true) throw new Error(response?.value || t('executionPause.error'));
            if (response.value?.execution) upsertExecution(response.value.execution);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(false);
        }
    };
    return (
        <Button
            variant="outline"
            size="icon"
            disabled={busy || execution.status === 'cancelling'}
            onClick={change}
            aria-label={label}
            title={label}
        >
            <Icon className={`size-4 ${busy ? 'animate-spin' : ''}`} />
        </Button>
    );
}
