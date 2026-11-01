// Counts are complete snapshots. Delayed saves/reloads must not restore a
// queued count after the sender has acknowledged that same segment.
export const mergeBodyForwardingStatus = (current, incoming) => {
    if (!incoming) return current;
    if (!current) return incoming;
    return (current.revision || 0) > (incoming.revision || 0) ? current : incoming;
};

const count = (value) => Math.max(0, Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0);

// Only the visible branch contributes to the top activity indicator.
export const pendingBodyForwarding = (messages, order) => [...new Set(order || [])].reduce((total, id) => {
    const counts = messages?.[id]?.extraInfo?.bodyForwarding?.counts || {};
    return total + count(counts.queued) + count(counts.sending);
}, 0);

/** Durable delivery facts, also available when optional model audit tips are disabled. */
export const bodyForwardingDetails = (status) => {
    if (!status || (!count(status.total) && !status.lastError)) return [];
    const counts = status.counts || {};
    const fields = [
        ['已提交', count(counts.accepted)],
        ['待发送', count(counts.queued) + count(counts.sending)],
        ['发送失败', count(counts.failed)],
        ['结果待核对', count(counts.uncertain)],
        ['已取消', count(counts.cancelled)],
    ].filter(([, value]) => value > 0).map(([label, value]) => ({label, value: `${value} 条`}));
    if (status.lastError) fields.push({label: '说明', value: String(status.lastError)});
    return fields;
};
