import { ArrowRight, MessageSquare, Check, Clock3, PauseCircle } from 'lucide-react';

const deferredLabels = { paused: '已保留，等待恢复', wake_hop_limit: '达到自动唤醒上限，已保留' };

/** Coordination data has distinct provenance and never inherits user-edit controls. */
export default function AgentMessageRecord({ activity }) {
    const message = activity.agentMessage || {};
    const consumed = ['injected', 'consumed', 'responded'].includes(activity.state);
    const deferred = message.deferredReason;
    const Icon = consumed ? Check : deferred ? PauseCircle : Clock3;
    const label = consumed ? '已接收' : deferredLabels[deferred] || '等待安全边界接收';
    return <div className="min-w-0 flex-1" data-agent-message-id={message.id}>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <MessageSquare className="size-3.5" aria-hidden="true" />
            <span className="font-medium text-foreground/80">{message.senderName || message.senderId || '协作者'}</span>
            <ArrowRight className="size-3" aria-hidden="true" />
            <span>{message.recipientName || message.recipientId || '当前智能体'}</span>
            <span className="ml-auto inline-flex items-center gap-1"><Icon className="size-3" aria-hidden="true" />{label}</span>
        </div>
        <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/80">{activity.content || message.content}</p>
    </div>;
}
