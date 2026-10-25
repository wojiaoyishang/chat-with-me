import { timeNode } from './orderedTimeV2.mjs';

// A compact split/join region: comparable clocks share one visual route even
// though their real NEXT relations still retain the backend precision lanes.
export function orderedTimeForks() {
    const nodes = [
        timeNode('fork-year', 'year', null, 'calendar:year', null, '2026年', '2026'),
        timeNode('fork-october', 'month', 'fork-year', 'calendar:month', null, '10月', '2026-10'),
        timeNode('fork-november', 'month', 'fork-year', 'calendar:month', null, '11月', '2026-11'),
        timeNode('fork-day11', 'day', 'fork-october', 'calendar:day', null, '11日', '2026-10-11'),
        timeNode('fork-day15', 'day', 'fork-october', 'calendar:day', null, '15日', '2026-10-15'),
        timeNode('fork-noon', 'minute', 'fork-day11', 'clock:minute', null, '12:00', '2026-10-11T12:00'),
        timeNode('fork-noon10', 'minute', 'fork-day11', 'clock:minute', null, '12:10', '2026-10-11T12:10'),
        timeNode('fork-afternoon', 'second', 'fork-day11', 'clock:second', null, '14:00:00', '2026-10-11T14:00:00'),
        timeNode('fork-morning', 'dayperiod', 'fork-day11', 'phase', '1', '早上', '2026-10-11@morning', { ordered_status: 'anchored-phase' }),
        timeNode('fork-night', 'dayperiod', 'fork-day11', 'phase', '5', '晚上', '2026-10-11@night', { ordered_status: 'anchored-phase' }),
        ...['early', 'mid', 'late'].map((part, index) => timeNode(`fork-${part}`, 'monthperiod', 'fork-october', 'monthperiod', String(index), ['上旬', '中旬', '下旬'][index], `2026-10@monthpart:${part}`, {
            ordered_start: null, ordered_end: null, ordered_status: 'anchored-phase', ordered_phase: part,
        })),
        { id: 'fork-event', label: 'Event', name: '具体事件' },
    ];
    const relationships = nodes.filter(node => node.properties?.ordered_parent).map(node => ({
        id: `contains-${node.id}`, source: node.properties.ordered_parent, target: node.id, type: 'ORDERED_CONTAINS',
    }));
    for (const [source, target] of [
        ['fork-october', 'fork-november'], ['fork-day11', 'fork-day15'], ['fork-noon', 'fork-noon10'],
        ['fork-morning', 'fork-night'], ['fork-early', 'fork-mid'], ['fork-mid', 'fork-late'],
    ]) relationships.push({ id: `next-${source}`, source, target, type: 'NEXT_ORDERED' });
    relationships.push({ id: 'fork-event-time', source: 'fork-event', target: 'fork-afternoon', type: 'HAPPENED_AT' });
    return { nodes, relationships, completeParentIds: ['fork-year', 'fork-october', 'fork-day11'] };
}
