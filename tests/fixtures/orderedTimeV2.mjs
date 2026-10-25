// Absolute backend keys are epoch microseconds, including calendar nodes. A
// missing year instead uses the local component rank (see the captured region).
function absoluteInterval(value, precision) {
    const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{1,6}))?)?)?)?)?)?$/.exec(value);
    if (!match || !['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond'].includes(precision)) return {};
    const [, year, month = '01', day = '01', hour = '00', minute = '00', second = '00', fraction = ''] = match;
    const start = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
    const micros = BigInt(fraction.padEnd(6, '0'));
    const key = BigInt(start.getTime()) * 1000n + micros;
    const end = new Date(start);
    if (precision === 'year') end.setUTCFullYear(end.getUTCFullYear() + 1);
    if (precision === 'month') end.setUTCMonth(end.getUTCMonth() + 1);
    const step = { day: 86_400_000_000n, hour: 3_600_000_000n, minute: 60_000_000n, second: 1_000_000n, microsecond: 1n }[precision];
    const endKey = step ? key + step : BigInt(end.getTime()) * 1000n;
    const iso = raw => {
        const suffix = String(raw % 1_000_000n).padStart(6, '0');
        return new Date(Number(raw / 1000n)).toISOString().slice(0, 19) + (suffix === '000000' ? '' : `.${suffix}`);
    };
    return { ordered_key: String(key), ordered_start: iso(key), ordered_end: iso(endKey) };
}

export const timeNode = (id, precision, parent, lane, key, shortLabel, value = id, extra = {}) => ({
    id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], name: value,
    properties: { ordered_axis: 'time-v2-axis', ordered_kind: 'time', ordered_version: 2, ordered_scope: 'absolute',
        ordered_parent: parent, ordered_lane: lane, ordered_precision: precision, ordered_key: key, ordered_value: value,
        ordered_short_label: shortLabel, ordered_missing: false, ordered_status: 'absolute', ...absoluteInterval(value, precision), ...extra },
});

export function orderedTimeGraph() {
    const nodes = [
        timeNode('year', 'year', null, 'calendar:year', null, '2026年', '2026'),
        timeNode('month', 'month', 'year', 'calendar:month', null, '9月', '2026-09'),
        timeNode('day', 'day', 'month', 'calendar:day', null, '12日', '2026-09-12'),
        timeNode('next-day', 'day', 'month', 'calendar:day', null, '13日', '2026-09-13'),
        timeNode('morning', 'dayperiod', 'day', 'phase', '1', '早上', '2026-09-12@morning', { ordered_status: 'anchored-phase' }),
        timeNode('noon', 'dayperiod', 'day', 'phase', '2', '中午', '2026-09-12@noon', { ordered_status: 'anchored-phase' }),
        timeNode('hour', 'hour', 'day', 'clock:hour', null, '10时', '2026-09-12T10'),
        timeNode('minute', 'minute', 'day', 'clock:minute', null, '14:00', '2026-09-12T14:00'),
        timeNode('next-minute', 'minute', 'day', 'clock:minute', null, '14:20', '2026-09-12T14:20'),
        timeNode('second', 'second', 'day', 'clock:second', null, '14:00:05', '2026-09-12T14:00:05'),
        timeNode('microsecond', 'microsecond', 'day', 'clock:microsecond', null, '14:00:05.000123', '2026-09-12T14:00:05.000123'),
        timeNode('bedtime', 'relative', 'day', 'relative', null, '睡前', '2026-09-12@relative:睡前', { ordered_status: 'anchored-relative' }),
        timeNode('unplaced', 'relative', null, 'relative', null, '昨天', '昨天', { ordered_status: 'unplaced', ordered_missing: true }),
        { id: 'event', name: '普通事件', label: 'Event' },
    ];
    const relationships = nodes.filter(node => node.properties?.ordered_parent).map(node => ({
        id: `parent-${node.id}`, source: node.properties.ordered_parent, target: node.id, type: 'ORDERED_CONTAINS',
    }));
    for (const [source, target] of [['day', 'next-day'], ['morning', 'noon'], ['minute', 'next-minute']])
        relationships.push({ id: `next-${source}`, source, target, type: 'NEXT_ORDERED' });
    relationships.push({ id: 'event-time', source: 'event', target: 'minute', type: 'HAPPENED_AT' });
    return { nodes, relationships, completeParentIds: ['day'] };
}
