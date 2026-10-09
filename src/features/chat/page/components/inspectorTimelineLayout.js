export function buildTimelineLanes(events) {
    return [
        { id: 'messages', label: '消息', slots: events.map((event) => event.kind === 'model_call' ? null : event) },
        { id: 'model_calls', label: 'Call', slots: events.map((event) => event.kind === 'model_call' ? event : null) },
    ];
}

// Show recorded time overlap without inferring duration from reused input messages.
export function callOverlapCounts(calls) {
    const intervals = calls.map((call) => {
        const start = Date.parse(call.createdAt);
        const end = call.completedAt ? Date.parse(call.completedAt)
            : ['running', 'captured'].includes(call.status) ? Infinity : NaN;
        return { id: call.modelCallId, start, end };
    }).filter((item) => item.id && Number.isFinite(item.start) && item.end > item.start)
        .sort((a, b) => a.start - b.start);
    const counts = new Map();
    let active = [];
    for (const interval of intervals) {
        active = active.filter((item) => item.end > interval.start);
        for (const item of active) {
            counts.set(item.id, (counts.get(item.id) || 0) + 1);
            counts.set(interval.id, (counts.get(interval.id) || 0) + 1);
        }
        active.push(interval);
    }
    return counts;
}
