import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { emitEvent, onEvent } from '@/context/useEventStore.jsx';

function FeedbackButton({ item, conversationId, messageId }) {
    const [state, setState] = useState(null);
    const [pending, setPending] = useState(false);
    useEffect(() => {
        let active = true;
        const apply = (payload) => {
            if (active && payload.msgid === messageId && payload.toolid === item.toolid)
                setState((prev) => (prev?.revision > payload.revision ? prev : payload));
        };
        const unsubscribe = onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then(
            ({ payload }) => apply(payload),
        );
        emitEvent({
            event: 'frontend.feedback.status',
            conversationId,
            payload: { msgid: messageId, toolid: item.toolid },
        })
            .then((payload) => {
                if (payload.success) apply(payload);
                else if (active) setState({ status: 'expired' });
            })
            .catch(() => {});
        return () => {
            active = false;
            unsubscribe();
        };
    }, [conversationId, messageId, item.toolid]);
    const once = state?.delivery?.once ?? item.once;
    const consumed = once && state?.attempts > 0;
    const disabled = pending || consumed || state?.status === 'running' || state?.status === 'expired';
    const trigger = async (event) => {
        event.stopPropagation();
        setPending(true);
        try {
            const result = await emitEvent({
                event: 'frontend.feedback.trigger',
                conversationId,
                payload: { msgid: messageId, toolid: item.toolid },
            });
            if (!result.success) throw new Error(result.message || '调用失败');
            setState((prev) => (prev?.revision > result.revision ? prev : result));
        } catch (error) {
            toast.error(error.message || '调用失败');
        } finally {
            setPending(false);
        }
    };
    return (
        <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 shrink-0 px-2 text-xs"
            disabled={disabled}
            title={state?.message || '触发已登记的工具调用'}
            onClick={trigger}
        >
            {state?.status === 'expired'
                ? '已过期'
                : pending || state?.status === 'running'
                  ? '调用中'
                  : state?.status === 'failed'
                    ? once
                        ? '调用失败'
                        : '重试调用'
                    : consumed
                      ? '已触发'
                      : '触发调用'}
        </Button>
    );
}

export default function FrontendFeedbackButtons({ items, conversationId, messageId }) {
    if (!conversationId || !messageId || !items.length) return null;
    return (
        <span className="flex flex-wrap items-center gap-1" onClick={(event) => event.stopPropagation()}>
            {items.map((item) => (
                <FeedbackButton key={item.toolid} item={item} conversationId={conversationId} messageId={messageId} />
            ))}
        </span>
    );
}
