import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { emitEvent } from '@/context/useEventStore.jsx';
import { upsertExecution } from './useExecutionStore.js';
import BuiltinSliderButton from '@/features/chat/ui/BuiltinSliderButton.jsx';
export default function ExecutionThinkingControl({ execution }) {
    const { t } = useTranslation();
    const [pending, setPending] = useState(false);
    const [draft, setDraft] = useState(null);
    const thinking = execution?.thinking || {};
    const items = thinking.items || [];
    const selected = thinking.nextOverride
        ? thinking.nextOnce
            ? thinking.nextEffort
            : 'none'
        : thinking.persistent
          ? thinking.defaultEffort !== 'none'
              ? thinking.defaultEffort
              : items.find((item) => item.id !== 'none')?.id
          : 'none';
    const value = items.some((item) => item.id === selected)
        ? selected
        : items.find((item) => item.id !== 'none')?.id || 'none';
    const change = async (effort) => {
        setPending(true);
        try {
            const response = await emitEvent({
                event: 'execution.thinking.set',
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: { executionId: execution.executionId, enable: effort !== 'none', effort },
            });
            if (response?.success !== true) throw new Error(response?.value || t('executionThinking.error'));
            if (response.value?.execution) upsertExecution(response.value.execution);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPending(false);
            setDraft(null);
        }
    };
    return (
        <BuiltinSliderButton
            tool={{
                mode: 'slider',
                text: 'executionThinking.nextRequest',
                items,
                disabled: pending || !thinking.supported || !execution?.active || execution.status === 'cancelling',
            }}
            value={draft ?? value}
            onChange={setDraft}
            onCommit={change}
        />
    );
}
