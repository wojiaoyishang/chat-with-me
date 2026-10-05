import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { emitEvent } from '@/context/useEventStore.jsx';
import { upsertExecution } from './useExecutionStore.js';

export default function ExecutionThinkingControl({ execution }) {
    const { t } = useTranslation();
    const [pending, setPending] = useState(false);
    const thinking = execution?.thinking || {};
    const label = t(
        thinking.persistent
            ? 'executionThinking.persistent'
            : thinking.nextInFlight
              ? 'executionThinking.inFlight'
              : thinking.nextOnce
                ? 'executionThinking.enabled'
                : 'executionThinking.disabled',
    );
    const change = async () => {
        setPending(true);
        try {
            const response = await emitEvent({
                event: 'execution.thinking.set',
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: { executionId: execution.executionId, enable: !thinking.nextOnce },
            });
            if (response?.success !== true)
                throw new Error(
                    typeof response?.value === 'string'
                        ? response.value
                        : response?.message || t('executionThinking.error'),
                );
            if (response.value?.execution) upsertExecution(response.value.execution);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPending(false);
        }
    };
    const Icon = pending ? Loader2 : Brain;
    return (
        <Button
            type="button"
            size="sm"
            variant={thinking.nextOnce || thinking.persistent ? 'secondary' : 'ghost'}
            className="h-8 gap-1.5 text-xs"
            aria-pressed={!!(thinking.nextOnce || thinking.persistent)}
            disabled={
                pending ||
                !thinking.supported ||
                thinking.persistent ||
                !execution?.active ||
                execution.status === 'cancelling'
            }
            title={t(thinking.supported ? 'executionThinking.hint' : 'executionThinking.unsupported')}
            onClick={change}
        >
            <Icon className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
            {label}
        </Button>
    );
}
