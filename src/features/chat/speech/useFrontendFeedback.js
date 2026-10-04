import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { emitEvent, onEvent } from '@/context/useEventStore.jsx';

export default function useFrontendFeedback({ items, conversationId, messageId }) {
    const [states, setStates] = useState({});
    const toolidsKey = items.map((item) => item.toolid).join(',');
    const [pendingIds, setPendingIds] = useState({});
    useEffect(() => {
        setStates({});
        const toolids = toolidsKey.split(',').filter(Boolean);
        if (!toolids.length || !conversationId || !messageId) return undefined;
        let active = true;
        const apply = (payload) => {
            if (active && payload.msgid === messageId && toolids.includes(payload.toolid))
                setStates((prev) =>
                    prev[payload.toolid]?.revision > payload.revision ? prev : { ...prev, [payload.toolid]: payload },
                );
        };
        const unsubscribe = onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then(
            ({ payload }) => apply(payload),
        );
        for (const toolid of toolids)
            emitEvent({
                event: 'frontend.feedback.status',
                conversationId,
                payload: { msgid: messageId, toolid: toolid },
            })
                .then((payload) => {
                    if (payload.success) apply(payload);
                    else if (active)
                        setStates((prev) =>
                            prev[toolid]?.revision != null ? prev : { ...prev, [toolid]: { status: 'expired' } },
                        );
                })
                .catch(() => {});
        return () => {
            active = false;
            unsubscribe();
        };
    }, [conversationId, messageId, toolidsKey]);
    const trigger = async (toolid, event) => {
        event.stopPropagation();
        setPendingIds((prev) => ({ ...prev, [toolid]: true }));
        try {
            const result = await emitEvent({
                event: 'frontend.feedback.trigger',
                conversationId,
                payload: { msgid: messageId, toolid: toolid },
            });
            if (!result.success) throw new Error(result.message || '调用失败');
            setStates((prev) => (prev[toolid]?.revision > result.revision ? prev : { ...prev, [toolid]: result }));
        } catch (error) {
            toast.error(error.message || '调用失败');
        } finally {
            setPendingIds((prev) => ({ ...prev, [toolid]: false }));
        }
    };
    return { states, pendingIds, trigger };
}
