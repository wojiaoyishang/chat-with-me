import { Button } from '@/components/ui/button';

function FeedbackButton({ item, state, pending, trigger }) {
    const once = state?.delivery?.once ?? item.once;
    const consumed = once && state?.attempts > 0;
    const disabled = pending || consumed || state?.status === 'running' || state?.status === 'expired';
    return (
        <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 shrink-0 px-2 text-xs"
            disabled={disabled}
            title={state?.message || '触发已登记的工具调用'}
            onClick={(event) => trigger(item.toolid, event)}
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

export default function FrontendFeedbackButtons({ items, feedback }) {
    if (!items.length) return null;
    return (
        <span className="inline-flex items-center gap-1">
            {items.map((item) => (
                <FeedbackButton
                    key={item.toolid}
                    item={item}
                    state={feedback.states[item.toolid]}
                    pending={feedback.pendingIds[item.toolid]}
                    trigger={feedback.trigger}
                />
            ))}
        </span>
    );
}
