import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { compareOrderedKeys, createOrderedGraphLayout, orderedNodeInfo, orderedNodeRadius, orderedNodeCaption, orderedEdgeStyle, orderedConvergences, orderedViewEdges } from '../src/features/knowledge/orderedGraphLayout.js';
import { orderedTimeGraph, timeNode } from './fixtures/orderedTimeV2.mjs';
import { backendOrderedTimeRegion } from './fixtures/orderedTimeV2BackendRegion.mjs';

const ordered = (id, key, extra = {}) => ({ id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], x: 42, y: 17,
    properties: { ordered_axis: 'timeline', ordered_kind: 'time', ordered_key: key, ordered_value: id, ...extra } });
const byId = nodes => new Map(nodes.map(node => [node.id, node]));
const rebuild = (graph, options = {}) => {
    const layout = createOrderedGraphLayout();
    layout.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds, ...options });
    return layout;
};
const noPin = node => assert.ok(node.fx == null && node.fy == null, `${node.id} is available to the force simulation`);
const view = graph => orderedViewEdges(graph.nodes, graph.relationships, graph.completeParentIds);
const routePair = route => `${route.from}->${route.to}`;

test('ordered keys preserve exact large microseconds, decimal numbers and Unicode text order', () => {
    for (const [a, b, kind] of [['63745056000000001', '63745056000000002', 'time'], ['-20', '-2', 'number'], ['2', '10', 'number'], ['1.000000000000000001', '1.000000000000000002', 'number'], ['0', '1e-10', 'number'], ['1e-10', '1e10', 'number'], ['\uE000', '😀', 'text']]) {
        assert.ok(compareOrderedKeys(a, b, kind) < 0, `${a} < ${b}`);
        assert.ok(compareOrderedKeys(b, a, kind) > 0, `${b} > ${a}`);
    }
    assert.equal(compareOrderedKeys('1.00', '1e0', 'number'), 0);
    assert.equal(compareOrderedKeys('-0', '0', 'number'), 0);
});

test('v1 layout sorts loaded nodes, isolates missing values and moves a rigid row through updates', () => {
    const layout = createOrderedGraphLayout(), late = ordered('late', '20'), early = ordered('early', '2'), missing = ordered('unknown', null, { ordered_missing: true });
    const legacy = { id: 'legacy', label: 'Time', x: 33, y: 48 }, another = ordered('another', '1', { ordered_axis: 'second' });
    layout.rebuild([late, legacy, missing, early, another]);
    assert.ok(early.x < late.x); assert.equal(early.y, late.y); assert.notEqual(missing.y, late.y);
    assert.notEqual(another.y, early.y); assert.equal(legacy.fx, undefined); assert.equal(orderedNodeInfo(legacy), null);
    const delta = late.x - early.x;
    assert.equal(layout.move(early, 80, 90), true);
    assert.equal(early.x, 80); assert.equal(late.x, 80 + delta); assert.equal(late.y, 90); assert.equal(missing.y, 150);
    layout.rebuild([late, legacy, missing, early, another, ordered('middle', '10')]);
    assert.equal(late.x - early.x, delta * 2); assert.equal(late.y, 90);
    const position = early.x;
    layout.rebuild([early, late], { fromPositions: true });
    assert.equal(late.x - early.x, delta); assert.equal(early.x, position);
});

test('standalone and chat helpers share numeric, target, caption and projection contracts', async () => {
    const script = await readFile(fileURLToPath(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-ordered-layout.js', import.meta.url)), 'utf8');
    const context = { window: {} }; vm.runInNewContext(script, context);
    const other = context.window.CWMOrderedGraphLayout;
    assert.equal(other.compareOrderedKeys('63745056000000001', '63745056000000002', 'time'), -1);
    const nodes = [ordered('late', '20'), ordered('early', '2')];
    other.createOrderedGraphLayout().rebuild(nodes);
    assert.equal(nodes[0].x, 56); assert.equal(nodes[1].x, -56); assert.equal(nodes[0].y, nodes[1].y);
    for (const graph of [orderedTimeGraph(), backendOrderedTimeRegion()]) {
        const expected = structuredClone(graph.nodes), options = { relationships: graph.relationships, completeParentIds: graph.completeParentIds };
        createOrderedGraphLayout().rebuild(expected, options);
        other.createOrderedGraphLayout().rebuild(graph.nodes, options);
        assert.deepEqual(graph.nodes.map(node => [node.id, node.x, node.y, node.orderedTargetX, node.orderedTargetY]), expected.map(node => [node.id, node.x, node.y, node.orderedTargetX, node.orderedTargetY]));
        assert.deepEqual(graph.nodes.map(node => other.orderedNodeInfo(node)?.lane), expected.map(node => node.ordered?.lane));
        assert.deepEqual(graph.nodes.map(node => other.orderedNodeRadius(other.orderedNodeInfo(node))), expected.map(node => orderedNodeRadius(node.ordered)));
        assert.deepEqual(graph.nodes.map(node => other.orderedNodeCaption(node, byId(graph.nodes))), expected.map(node => orderedNodeCaption(node, byId(expected))));
        assert.deepEqual(JSON.parse(JSON.stringify(other.orderedViewEdges(graph.nodes, graph.relationships, graph.completeParentIds))), orderedViewEdges(expected, graph.relationships, graph.completeParentIds));
    }
});

test('absolute fixtures use backend epoch microseconds and real interval precision', () => {
    const at = byId(orderedTimeGraph().nodes);
    assert.equal(at.get('day').properties.ordered_key, '1789171200000000');
    assert.equal(at.get('hour').properties.ordered_key, '1789207200000000');
    assert.equal(at.get('microsecond').properties.ordered_key, '1789221605000123');
    assert.equal(at.get('microsecond').properties.ordered_end, '2026-09-12T14:00:05.000124');
    assert.equal(at.get('minute').properties.ordered_end, '2026-09-12T14:01:00');
    assert.equal(backendOrderedTimeRegion().nodes.find(node => node.id === 'backend-minute').properties.ordered_key, '37200000000');
});

test('backend lanes normalize without mutating properties and clock precisions decrease in size', () => {
    const graph = orderedTimeGraph(), original = graph.nodes.map(node => structuredClone(node.properties));
    for (const node of graph.nodes.filter(node => node.label === 'Time')) {
        assert.equal(orderedNodeInfo(node).lane, node.properties.ordered_lane.split(':')[0]);
        assert.equal(orderedNodeInfo(node).precision, node.properties.ordered_precision);
    }
    rebuild(graph);
    assert.deepEqual(graph.nodes.map(node => node.properties), original);
    const at = byId(graph.nodes);
    assert.deepEqual(['year', 'month', 'day', 'morning', 'hour', 'minute', 'second', 'microsecond'].map(id => orderedNodeRadius(at.get(id).ordered)), [18, 15, 12, 11, 10, 8, 6, 4]);
    assert.equal(at.get('morning').ordered.precision, 'dayperiod');
    assert.equal(at.get('bedtime').ordered.precision, 'relative');
});

test('time v2 targets flow horizontally from calendar entry through children to the next parent', () => {
    const graph = orderedTimeGraph(); rebuild(graph);
    const at = id => byId(graph.nodes).get(id);
    assert.ok(at('year').orderedTargetX < at('month').orderedTargetX);
    assert.ok(at('month').orderedTargetX < at('day').orderedTargetX);
    assert.ok(at('day').orderedTargetX < at('next-day').orderedTargetX);
    for (const id of ['morning', 'noon', 'hour', 'minute', 'next-minute', 'second', 'microsecond']) {
        assert.ok(at('day').orderedTargetX < at(id).orderedTargetX, `day precedes ${id}`);
        assert.ok(at(id).orderedTargetX < at('next-day').orderedTargetX, `${id} precedes next day`);
    }
    assert.equal(at('day').orderedTargetY, at('next-day').orderedTargetY);
    assert.equal(at('morning').orderedTargetY, at('noon').orderedTargetY);
    assert.ok(at('morning').orderedTargetX < at('noon').orderedTargetX);
    assert.notEqual(at('morning').orderedTargetY, at('hour').orderedTargetY);
    assert.equal(at('bedtime').ordered.missing, false);
    assert.notEqual(at('bedtime').orderedTargetY, at('unplaced').orderedTargetY);
    for (const node of graph.nodes.filter(node => node.ordered)) {
        assert.ok(Number.isFinite(node.orderedBaseX) && Number.isFinite(node.orderedBaseY));
        assert.ok(Number.isFinite(node.orderedTargetX) && Number.isFinite(node.orderedTargetY));
        noPin(node);
    }
});

test('clock tracks combine nonoverlapping precision intervals and keep overlapping intervals parallel', () => {
    const graph = orderedTimeGraph(); rebuild(graph);
    const at = id => byId(graph.nodes).get(id);
    assert.equal(at('hour').orderedTargetY, at('minute').orderedTargetY);
    assert.equal(at('minute').orderedTargetY, at('next-minute').orderedTargetY);
    assert.ok(at('hour').orderedTargetX < at('minute').orderedTargetX && at('minute').orderedTargetX < at('next-minute').orderedTargetX);
    assert.notEqual(at('minute').orderedTargetY, at('second').orderedTargetY, '14:00 minute includes 14:00:05 second');
    assert.notEqual(at('second').orderedTargetY, at('microsecond').orderedTargetY, 'the second includes the microsecond');
    assert.notEqual(at('minute').orderedTargetY, at('microsecond').orderedTargetY);
    assert.ok(at('minute').orderedTargetX < at('second').orderedTargetX && at('second').orderedTargetX < at('microsecond').orderedTargetX && at('microsecond').orderedTargetX < at('next-minute').orderedTargetX, 'all clock tracks share chronological x slots');
    const sequences = view(graph).routes.filter(route => route.kind === 'clock-sequence').map(routePair);
    assert.ok(sequences.includes('hour->minute'), 'nonoverlapping different precisions form a display sequence');
    assert.ok(!sequences.includes('minute->second') && !sequences.includes('second->microsecond'));
});

test('captured partial-date region preserves missing year and combines clock tracks by interval', () => {
    const graph = backendOrderedTimeRegion(), original = structuredClone(graph.nodes); rebuild(graph);
    const at = id => byId(graph.nodes).get(`backend-${id}`);
    assert.ok(at('month').orderedTargetX < at('day').orderedTargetX);
    assert.ok(at('day').orderedTargetX < at('minute').orderedTargetX && at('next-minute').orderedTargetX < at('next-day').orderedTargetX);
    assert.equal(at('minute').orderedTargetY, at('next-minute').orderedTargetY);
    assert.notEqual(at('next-minute').orderedTargetY, at('second').orderedTargetY);
    assert.equal(at('day').ordered.value, '--09-12', 'a partial date never acquires an invented year');
    assert.deepEqual(graph.nodes.map(node => node.properties), original.map(node => node.properties));
    const joins = orderedConvergences(graph.nodes, graph.relationships, graph.completeParentIds);
    assert.deepEqual(joins.map(route => route.from).sort(), ['backend-afternoon', 'backend-bedtime', 'backend-dinner', 'backend-next-minute', 'backend-second']);
    assert.ok(joins.every(route => route.to === graph.nextId && route.layoutOnly && !Object.hasOwn(route, 'id')));
});

test('clock intervals use half-open boundaries and never sequence equal or overlapping instants', () => {
    const nodes = [
        timeNode('boundary-day', 'day', null, 'calendar:day', null, '12日', '2026-09-12'),
        timeNode('ten-hour', 'hour', 'boundary-day', 'clock:hour', null, '10时', '2026-09-12T10'),
        timeNode('eleven-minute', 'minute', 'boundary-day', 'clock:minute', null, '11:00', '2026-09-12T11:00'),
        timeNode('inside-second', 'second', 'boundary-day', 'clock:second', null, '10:59:59', '2026-09-12T10:59:59'),
        timeNode('same-second', 'second', 'boundary-day', 'clock:second', null, '10:59:59', '2026-09-12T10:59:59'),
    ], relationships = nodes.slice(1).map(node => ({ id: `contains-${node.id}`, source: 'boundary-day', target: node.id, type: 'ORDERED_CONTAINS' }));
    const graph = { nodes, relationships, completeParentIds: ['boundary-day'] }; rebuild(graph);
    const at = byId(nodes), sequences = view(graph).routes.filter(route => route.kind === 'clock-sequence').map(routePair);
    assert.equal(at.get('ten-hour').orderedTargetY, at.get('eleven-minute').orderedTargetY);
    assert.notEqual(at.get('ten-hour').orderedTargetY, at.get('inside-second').orderedTargetY);
    assert.notEqual(at.get('inside-second').orderedTargetY, at.get('same-second').orderedTargetY);
    assert.equal(at.get('inside-second').orderedTargetX, at.get('same-second').orderedTargetX);
    assert.ok(sequences.includes('ten-hour->eleven-minute'));
    assert.ok(!sequences.includes('inside-second->same-second') && !sequences.includes('same-second->inside-second'));
});

test('full time captions retain calendar context, precision and the missing-year qualifier', () => {
    const graph = orderedTimeGraph(), at = byId(graph.nodes);
    for (const [id, caption] of [
        ['year', '2026年'], ['month', '2026年9月'], ['day', '2026年9月12日'], ['hour', '2026年9月12日10时'],
        ['minute', '2026年9月12日14:00'], ['second', '2026年9月12日14:00:05'],
        ['microsecond', '2026年9月12日14:00:05.000123'], ['morning', '2026年9月12日早上'], ['bedtime', '2026年9月12日睡前'],
    ]) {
        assert.equal(orderedNodeCaption(at.get(id), at), caption);
        assert.equal(orderedNodeCaption(at.get(id), new Map()), caption, 'caption does not depend on the loaded parent');
    }
    const partial = backendOrderedTimeRegion(), partialAt = byId(partial.nodes);
    for (const [id, caption] of [['day', '9月12日（年份未注明）'], ['next-minute', '9月12日14:00（年份未注明）'], ['bedtime', '9月12日睡前（年份未注明）']])
        assert.equal(orderedNodeCaption(partialAt.get(`backend-${id}`), partialAt), caption);
    assert.equal(orderedNodeCaption(at.get('unplaced'), at), '未定位 · 昨天');
});

test('time v2 dragging changes one node and retains its manual offset through rebuild', () => {
    const graph = orderedTimeGraph(), layout = rebuild(graph), at = byId(graph.nodes), moved = at.get('minute');
    const before = new Map(graph.nodes.map(node => [node.id, { x: node.x, y: node.y, targetX: node.orderedTargetX, targetY: node.orderedTargetY }]));
    const x = moved.x + 50, y = moved.y + 80;
    assert.equal(layout.move(moved, x, y), true);
    assert.equal(moved.x, x); assert.equal(moved.y, y); noPin(moved);
    assert.deepEqual(moved.orderedManualOffset, { x: x - moved.orderedBaseX, y: y - moved.orderedBaseY });
    assert.equal(moved.orderedTargetX, moved.orderedBaseX + moved.orderedManualOffset.x);
    assert.equal(moved.orderedTargetY, moved.orderedBaseY + moved.orderedManualOffset.y);
    for (const node of graph.nodes.filter(node => node !== moved)) {
        assert.equal(node.x, before.get(node.id).x); assert.equal(node.y, before.get(node.id).y);
        assert.equal(node.orderedTargetX, before.get(node.id).targetX); assert.equal(node.orderedTargetY, before.get(node.id).targetY);
    }
    const offset = structuredClone(moved.orderedManualOffset);
    layout.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds });
    assert.deepEqual(moved.orderedManualOffset, offset);
    assert.equal(moved.x, x); assert.equal(moved.y, y);
    assert.equal(moved.orderedTargetX, moved.orderedBaseX + offset.x);
});

test('time v2 position restoration preserves coordinates while reset starts at fresh unpinned targets', () => {
    const graph = orderedTimeGraph();
    for (const [index, node] of graph.nodes.entries()) { node.x = 1000 + index * 7; node.y = -200 + index * 3; }
    const initial = graph.nodes.map(node => [node.x, node.y]);
    const layout = rebuild(graph, { fromPositions: true });
    assert.deepEqual(graph.nodes.map(node => [node.x, node.y]), initial);
    layout.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds, reset: true });
    for (const node of graph.nodes.filter(node => node.ordered)) {
        assert.equal(node.x, node.orderedTargetX); assert.equal(node.y, node.orderedTargetY);
        assert.equal(node.previousX, node.x); assert.equal(node.previousY, node.y);
        assert.equal(node.orderedManualOffset, undefined);
    }
    graph.nodes.filter(node => node.ordered).forEach(noPin);
});

test('first v2 layout replaces finite force seeds and releases obsolete rigid pins without snapping regular updates', () => {
    const graph = orderedTimeGraph();
    for (const node of graph.nodes) Object.assign(node, { x: -170, y: 63, fx: -170, fy: 63 });
    const layout = rebuild(graph), ordered = graph.nodes.filter(node => node.ordered);
    for (const node of ordered) {
        assert.equal(node.x, node.orderedTargetX); assert.equal(node.y, node.orderedTargetY); noPin(node);
        node.x += 17; node.y -= 4;
    }
    const positions = ordered.map(node => [node.x, node.y]);
    layout.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds });
    assert.deepEqual(ordered.map(node => [node.x, node.y]), positions);
});

test('number and text v2 axes retain flat rigid layout and directed business edges', () => {
    for (const kind of ['number', 'text']) {
        const nodes = [ordered('a', '2', { ordered_kind: kind, ordered_version: 2 }), ordered('b', '10', { ordered_kind: kind, ordered_version: 2 })];
        const layout = createOrderedGraphLayout(); layout.rebuild(nodes);
        assert.equal(nodes[0].y, nodes[1].y); assert.equal(orderedNodeRadius(nodes[0].ordered), 8); assert.equal(nodes[0].ordered.hierarchy, false);
        const delta = nodes[1].x - nodes[0].x;
        layout.move(nodes[0], 80, 90);
        assert.equal(nodes[1].x, 80 + delta); assert.equal(nodes[1].y, 90);
        assert.equal(nodes[0].fx, 80); assert.equal(nodes[0].fy, 90);
        assert.equal(orderedEdgeStyle('MEASURES', nodes[0], { label: 'Event' }).business, false);
    }
});

test('projection keeps model data intact while suppressing verified containment and replaced parent NEXT', () => {
    const graph = orderedTimeGraph(), before = structuredClone(graph), projected = view(graph);
    for (const kind of ['entry', 'clock-sequence', 'join']) assert.ok(projected.routes.some(route => route.kind === kind));
    assert.ok(projected.routes.every(route => route.layoutOnly && !Object.hasOwn(route, 'id') && route.from !== route.to));
    assert.equal(new Set(projected.routes.map(route => route.key)).size, projected.routes.length);
    const suppressedCandidates = new Set(graph.relationships.filter(edge => edge.type === 'ORDERED_CONTAINS').map(edge => edge.id));
    suppressedCandidates.add('next-day');
    assert.ok(projected.suppressedRelationshipIds.length > 0);
    assert.ok(projected.suppressedRelationshipIds.every(id => suppressedCandidates.has(id)));
    assert.ok(projected.suppressedRelationshipIds.includes('next-day'), 'a complete expanded parent has no direct shortcut to the next parent');
    assert.ok(projected.suppressedContains.every(suppressed => graph.relationships.some(edge => edge.type === 'ORDERED_CONTAINS' && edge.source === suppressed.from && edge.target === suppressed.to)));
    assert.deepEqual(graph, before, 'model relationships, IDs and node properties stay unchanged');
    assert.deepEqual(orderedConvergences(graph.nodes, graph.relationships, graph.completeParentIds), projected.routes.filter(route => route.kind === 'join'));
});

test('incomplete pages and unverifiable complete declarations retain only verified partial membership routes', () => {
    const graph = orderedTimeGraph();
    for (const variant of [
        { ...graph, completeParentIds: [] },
        { ...graph, relationships: graph.relationships.filter(edge => edge.id !== 'parent-noon') },
        { ...graph, relationships: graph.relationships.filter(edge => edge.id !== 'parent-hour') },
        { ...graph, nodes: graph.nodes.filter(node => node.id !== 'noon') },
    ]) {
        const projected = view(variant);
        assert.equal(projected.routes.filter(route => route.kind === 'join').length, 0);
        assert.ok(projected.routes.filter(route => route.kind === 'entry').every(route => route.partial && route.basis === 'membership'));
        assert.ok(!projected.suppressedRelationshipIds.includes('next-day'));
        for (const suppressed of projected.suppressedContains) assert.ok(variant.relationships.some(edge => edge.type === 'ORDERED_CONTAINS' && edge.source === suppressed.from && edge.target === suppressed.to));
    }
});

test('partial pages enter each loaded comparable track without declaring a globally first child', () => {
    const graph = orderedTimeGraph(); graph.completeParentIds = [];
    const projected = view(graph), entries = projected.routes.filter(route => route.kind === 'entry' && route.parent === 'day');
    const children = graph.nodes.filter(node => node.properties?.ordered_parent === 'day');
    assert.ok(entries.length > 0 && entries.length < children.length, 'partial membership keeps the branch entry without restoring a fanout');
    assert.ok(entries.every(route => route.partial === true && route.basis === 'membership' && route.from === 'day'));
    const loaded = new Set(entries.map(route => route.to));
    const links = [...projected.routes.filter(route => ['sequence', 'clock-sequence'].includes(route.kind)), ...graph.relationships.filter(edge => edge.type === 'NEXT_ORDERED').map(edge => ({ from: edge.source, to: edge.target }))];
    for (let pass = 0; pass < children.length; pass++) for (const edge of links) if (loaded.has(edge.from)) loaded.add(edge.to);
    assert.ok(children.every(node => loaded.has(node.id)), 'every loaded child remains reachable through explicit comparable values');
    assert.equal(projected.routes.filter(route => route.kind === 'join').length, 0);
    assert.ok(!projected.suppressedRelationshipIds.includes('next-day'));
});

test('join requires a real parent NEXT with matching axis, scope and precision', () => {
    for (const mutate of [
        graph => { graph.relationships = graph.relationships.filter(edge => edge.id !== 'next-day'); },
        graph => { graph.nodes.find(node => node.id === 'next-day').properties.ordered_scope = 'another-source'; },
        graph => { graph.nodes.find(node => node.id === 'next-day').properties.ordered_axis = 'another-axis'; },
        graph => { graph.nodes.find(node => node.id === 'next-day').properties.ordered_precision = 'month'; },
    ]) {
        const graph = orderedTimeGraph(); mutate(graph);
        assert.equal(orderedConvergences(graph.nodes, graph.relationships, graph.completeParentIds).length, 0);
    }
});

test('projection rejects cross-scope containment and never orders relative phrases', () => {
    const graph = orderedTimeGraph(); graph.nodes.find(node => node.id === 'noon').properties.ordered_scope = 'different-source';
    const projected = view(graph);
    assert.equal(projected.routes.filter(route => route.kind === 'join').length, 0);
    assert.ok(!projected.routes.some(route => route.from === 'noon' || route.to === 'noon'));
    assert.ok(!projected.suppressedRelationshipIds.includes('parent-noon'));
    assert.ok(!view(orderedTimeGraph()).routes.some(route => ['sequence', 'clock-sequence'].includes(route.kind) && (route.from === 'bedtime' || route.to === 'bedtime')));
});

test('projection accepts resolved relationship endpoint objects without changing its result', () => {
    const graph = orderedTimeGraph(), expected = view(graph), at = byId(graph.nodes);
    graph.relationships = graph.relationships.map(edge => ({ ...edge, source: at.get(edge.source), target: at.get(edge.target) }));
    assert.deepEqual(view(graph), expected);
});

test('a complete calendar branch enters its first child and preserves real sibling NEXT', () => {
    const graph = orderedTimeGraph(); graph.completeParentIds.push('month');
    const original = structuredClone(graph.relationships), projected = view(graph);
    assert.ok(projected.routes.some(route => route.kind === 'entry' && route.from === 'month' && route.to === 'day'));
    assert.ok(!projected.routes.some(route => route.kind === 'clock-sequence' && ['day', 'next-day'].includes(route.from)));
    assert.deepEqual(graph.relationships, original);
});

test('comparable phase values can bridge a missing sibling NEXT using a display-only sequence', () => {
    const graph = orderedTimeGraph(); graph.relationships = graph.relationships.filter(edge => edge.id !== 'next-morning');
    const original = structuredClone(graph.relationships), projected = view(graph);
    assert.ok(projected.routes.some(route => route.kind === 'sequence' && route.from === 'morning' && route.to === 'noon' && route.layoutOnly));
    assert.deepEqual(graph.relationships, original);
    assert.ok(!graph.relationships.some(edge => edge.source === 'morning' && edge.target === 'noon'));
    const at = byId(graph.nodes);
    for (const route of projected.routes.filter(route => ['sequence', 'clock-sequence'].includes(route.kind))) {
        assert.equal(orderedNodeInfo(at.get(route.from)).lane, orderedNodeInfo(at.get(route.to)).lane);
        assert.equal(orderedNodeInfo(at.get(route.from)).parent, orderedNodeInfo(at.get(route.to)).parent);
    }
});

test('a complete nested final child closes into a verified ancestor NEXT without inventing child NEXT', () => {
    const graph = orderedTimeGraph();
    graph.nodes.push(
        timeNode('next-month', 'month', 'year', 'calendar:month', null, '10月', '2026-10'),
        timeNode('next-day-minute', 'minute', 'next-day', 'clock:minute', null, '09:00', '2026-09-13T09:00'),
    );
    graph.relationships.push(
        { id: 'parent-next-month', source: 'year', target: 'next-month', type: 'ORDERED_CONTAINS' },
        { id: 'parent-next-day-minute', source: 'next-day', target: 'next-day-minute', type: 'ORDERED_CONTAINS' },
        { id: 'next-months', source: 'month', target: 'next-month', type: 'NEXT_ORDERED' },
    );
    graph.completeParentIds.push('month', 'next-day');
    const original = structuredClone(graph.relationships), projected = view(graph);
    assert.ok(projected.routes.some(route => route.kind === 'join' && route.from === 'next-day-minute' && route.to === 'next-month' && route.boundaryParent === 'month'));
    assert.ok(!projected.routes.some(route => route.kind === 'join' && route.from === 'next-day' && route.to === 'next-month'), 'nested branch replaces the direct parent shortcut');
    assert.ok(projected.suppressedRelationshipIds.includes('next-months'));
    assert.deepEqual(graph.relationships, original);
    assert.ok(!graph.relationships.some(edge => edge.source === 'next-day' && edge.type === 'NEXT_ORDERED'));
});

test('month periods sit alongside calendar children with complete readable captions', () => {
    const nodes = [
        timeNode('october', 'month', null, 'calendar:month', null, '10月', '2026-10'),
        timeNode('october-day', 'day', 'october', 'calendar:day', null, '12日', '2026-10-12'),
        timeNode('mid-month', 'monthperiod', 'october', 'monthperiod', '1', '中旬', '2026-10@monthpart:mid', { ordered_phase: 'mid', ordered_status: 'anchored-phase' }),
    ], relationships = nodes.filter(node => node.properties.ordered_parent).map(node => ({ id: `parent-${node.id}`, source: 'october', target: node.id, type: 'ORDERED_CONTAINS' }));
    const graph = { nodes, relationships, completeParentIds: ['october'] }; rebuild(graph);
    const at = byId(nodes);
    assert.equal(orderedNodeRadius(at.get('mid-month').ordered), 14);
    assert.equal(orderedNodeCaption(at.get('mid-month'), at), '2026年10月中旬');
    assert.ok(at.get('october').orderedTargetX < at.get('mid-month').orderedTargetX);
    assert.ok(at.get('october').orderedTargetX < at.get('october-day').orderedTargetX);
    assert.notEqual(at.get('october-day').orderedTargetY, at.get('mid-month').orderedTargetY);
    const partial = timeNode('partial-mid', 'monthperiod', null, 'monthperiod', '1', '中旬', '--10@monthpart:mid', { ordered_scope: 'source:diary', ordered_status: 'anchored-phase' });
    assert.equal(orderedNodeCaption(partial, new Map()), '10月中旬（年份未注明）');
});

test('malformed parent cycles stay finite and missing values remain in a separate target area', () => {
    const graph = orderedTimeGraph(); graph.nodes.find(node => node.id === 'year').properties.ordered_parent = 'month';
    rebuild(graph);
    const placed = graph.nodes.filter(node => node.ordered && !node.ordered.missing), unplaced = graph.nodes.find(node => node.id === 'unplaced');
    assert.ok(placed.every(node => Number.isFinite(node.orderedTargetX) && Number.isFinite(node.orderedTargetY)));
    assert.ok(unplaced.orderedTargetY > Math.max(...placed.map(node => node.orderedTargetY)));
});
