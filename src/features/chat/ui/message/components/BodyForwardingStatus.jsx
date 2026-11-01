import { memo } from 'react';
import { Check, CircleAlert, LoaderCircle, Send } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';

// A single small projection of the durable outbox, never one card per line.
export default memo(function BodyForwardingStatus({ status }) {
    const reduceMotion = useReducedMotion();
    if (!status || (!status.total && !status.lastError)) return null;
    const counts = status.counts || {};
    const pending = (counts.queued || 0) + (counts.sending || 0);
    const failed = (counts.failed || 0) + (counts.uncertain || 0);
    const Icon = pending ? LoaderCircle : failed || status.lastError ? CircleAlert : counts.accepted ? Check : Send;
    return <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : .18 }}
        className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground" role="status" aria-live="polite">
        <span className="inline-flex items-center gap-1.5">
            <Icon className={`size-3.5 ${pending ? 'motion-safe:animate-spin' : ''}`} />
            正文转发{counts.accepted ? ` · 已提交 ${counts.accepted} 条` : ''}
        </span>
        {pending > 0 && <span>待发送 {pending} 条</span>}
        {counts.failed > 0 && <span className="text-amber-600">{counts.failed} 条失败</span>}
        {counts.uncertain > 0 && <span className="text-amber-600">{counts.uncertain} 条待核对</span>}
        {counts.cancelled > 0 && <span>已取消 {counts.cancelled} 条</span>}
        {status.lastError && <span className="w-full break-words text-amber-600">{status.lastError}</span>}
    </Motion.div>;
});
