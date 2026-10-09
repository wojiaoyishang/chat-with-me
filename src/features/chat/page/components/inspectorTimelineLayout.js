export function buildTimelineLanes(events) {
    return [
        { id: 'messages', label: '消息', slots: events.map((event) => event.kind === 'model_call' ? null : event) },
        { id: 'model_calls', label: 'Call', slots: events.map((event) => event.kind === 'model_call' ? event : null) },
    ];
}

export function inputRelationships(events, active) {
    const calls = new Set(active?.kind === 'model_call' ? [active.modelCallId]
        : [...(active?.sentByCallIds || []), ...(active?.inheritedByCallIds || [])]);
    const sent = new Set();
    const inherited = new Set();
    for (const event of events) if (event.kind === 'model_call' && calls.has(event.modelCallId)) {
        for (const id of event.sentEventIds || []) sent.add(id);
        for (const id of event.inheritedEventIds || []) inherited.add(id);
    }
    return { calls, sent, inherited };
}

export function buildCallCoverage(events, relationships) {
    const ranges = [];
    for (const [mode, ids] of [['sent', relationships.sent], ['inherited', relationships.inherited]]) {
        let start = null;
        for (let index = 0; index <= events.length; index++) {
            if (index < events.length && ids.has(events[index].eventId)) {
                if (start === null) start = index;
            } else if (start !== null) {
                ranges.push({ mode, start, end: index });
                start = null;
            }
        }
    }
    return ranges;
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
