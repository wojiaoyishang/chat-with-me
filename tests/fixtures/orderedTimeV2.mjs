export const timeNode = (id, precision, parent, lane, key, shortLabel, value = id, extra = {}) => ({
    id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], name: value,
    properties: { ordered_axis: 'time-v2-axis', ordered_kind: 'time', ordered_version: 2, ordered_scope: 'absolute',
        ordered_parent: parent, ordered_lane: lane, ordered_precision: precision, ordered_key: key, ordered_value: value,
        ordered_short_label: shortLabel, ordered_missing: false, ordered_status: 'absolute', ...extra },
});

export function orderedTimeGraph() {
    const nodes = [
        timeNode('year', 'year', null, 'calendar:year', '2026', '2026年', '2026'),
        timeNode('month', 'month', 'year', 'calendar:month', '9', '9月', '2026-09'),
        timeNode('day', 'day', 'month', 'calendar:day', '12', '12日', '2026-09-12'),
        timeNode('next-day', 'day', 'month', 'calendar:day', '13', '13日', '2026-09-13'),
        timeNode('morning', 'dayperiod', 'day', 'phase', '1', '早上', '2026-09-12@morning', { ordered_status: 'anchored-phase' }),
        timeNode('noon', 'dayperiod', 'day', 'phase', '2', '中午', '2026-09-12@noon', { ordered_status: 'anchored-phase' }),
        timeNode('hour', 'hour', 'day', 'clock:hour', '36000000000', '10时', '2026-09-12T10'),
        timeNode('minute', 'minute', 'day', 'clock:minute', '50400000000', '14:00', '2026-09-12T14:00'),
        timeNode('next-minute', 'minute', 'day', 'clock:minute', '51600000000', '14:20', '2026-09-12T14:20'),
        timeNode('second', 'second', 'day', 'clock:second', '50405000000', '14:00:05', '2026-09-12T14:00:05'),
        timeNode('microsecond', 'microsecond', 'day', 'clock:microsecond', '50405000123', '14:00:05.000123', '2026-09-12T14:00:05.000123'),
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
