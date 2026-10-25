import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { compareOrderedKeys, createOrderedGraphLayout, orderedNodeInfo, orderedNodeRadius, orderedNodeCaption, orderedEdgeStyle, orderedConvergences } from '../src/features/knowledge/orderedGraphLayout.js';
import { orderedTimeGraph } from './fixtures/orderedTimeV2.mjs';
import { backendOrderedTimeRegion } from './fixtures/orderedTimeV2BackendRegion.mjs';

const ordered = (id, key, extra = {}) => ({ id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], x: 42, y: 17,
    properties: { ordered_axis: 'timeline', ordered_kind: 'time', ordered_key: key, ordered_value: id, ...extra } });

test('ordered keys preserve exact large microseconds, decimal numbers and Unicode text order', () => {
    for (const [a, b, kind] of [['63745056000000001', '63745056000000002', 'time'], ['-20', '-2', 'number'], ['2', '10', 'number'], ['1.000000000000000001', '1.000000000000000002', 'number'], ['0', '1e-10', 'number'], ['1e-10', '1e10', 'number'], ['\uE000', '😀', 'text']]) {
        assert.ok(compareOrderedKeys(a, b, kind) < 0, `${a} < ${b}`);
        assert.ok(compareOrderedKeys(b, a, kind) > 0, `${b} > ${a}`);
    }
    assert.equal(compareOrderedKeys('1.00', '1e0', 'number'), 0);
    assert.equal(compareOrderedKeys('-0', '0', 'number'), 0);
});

test('axis layout sorts only loaded nodes, isolates missing values and moves a rigid row through updates', () => {
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
    const positions = [early, late].map(node => ({ x: node.x, y: node.y }));
    layout.rebuild([early, late], { fromPositions: true });
    assert.equal(late.x - early.x, delta); assert.equal(early.x, positions[0].x);
});

test('standalone graph runs the same numeric and layout contract as the chat preview', async () => {
    const script = await readFile(fileURLToPath(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-ordered-layout.js', import.meta.url)), 'utf8');
    const context = { window: {} }; vm.runInNewContext(script, context);
    const other = context.window.CWMOrderedGraphLayout;
    assert.equal(other.compareOrderedKeys('63745056000000001', '63745056000000002', 'time'), -1);
    const nodes = [ordered('late', '20'), ordered('early', '2')];
    other.createOrderedGraphLayout().rebuild(nodes);
    assert.equal(nodes[0].x, 56); assert.equal(nodes[1].x, -56); assert.equal(nodes[0].y, nodes[1].y);
    const full = orderedTimeGraph(), captured = backendOrderedTimeRegion();
    for (const graph of [full, captured]) {
        const expected = structuredClone(graph.nodes);
        createOrderedGraphLayout().rebuild(expected);
        other.createOrderedGraphLayout().rebuild(graph.nodes);
        assert.deepEqual(graph.nodes.map(node => [node.id, node.x, node.y]), expected.map(node => [node.id, node.x, node.y]));
        assert.deepEqual(graph.nodes.map(node => other.orderedNodeInfo(node)?.lane), expected.map(node => node.ordered?.lane));
        assert.deepEqual(graph.nodes.map(node => other.orderedNodeRadius(other.orderedNodeInfo(node))), expected.map(node => orderedNodeRadius(node.ordered)));
        assert.deepEqual(Array.from(other.orderedConvergences(graph.nodes, graph.relationships, graph.completeParentIds), edge => [edge.from, edge.to]),
            orderedConvergences(expected, graph.relationships, graph.completeParentIds).map(edge => [edge.from, edge.to]));
    }
});

test('backend lane names normalize for layout without changing raw properties and all clock precisions decrease in size', () => {
    const { nodes } = orderedTimeGraph(), original = nodes.map(node => structuredClone(node.properties));
    for (const node of nodes.filter(node => node.label === 'Time')) {
        const info = orderedNodeInfo(node);
        assert.equal(info.lane, node.properties.ordered_lane.split(':')[0]);
        assert.equal(info.precision, node.properties.ordered_precision);
    }
    createOrderedGraphLayout().rebuild(nodes);
    assert.deepEqual(nodes.map(node => node.properties), original);
    const byId = new Map(nodes.map(node => [node.id, node]));
    assert.deepEqual(['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond'].map(id => orderedNodeRadius(byId.get(id).ordered)), [18, 15, 12, 10, 8, 6, 4]);
    assert.equal(byId.get('morning').ordered.precision, 'dayperiod');
    assert.equal(byId.get('bedtime').ordered.precision, 'relative');
});

test('captured partial-date region puts real backend calendar and clock lanes on the fishbone and draws three convergences', () => {
    const graph = backendOrderedTimeRegion(), original = structuredClone(graph.nodes), byId = new Map(graph.nodes.map(node => [node.id, node]));
    createOrderedGraphLayout().rebuild(graph.nodes);
    const at = id => byId.get(`backend-${id}`);
    assert.ok(at('month').y < at('day').y);
    assert.equal(at('day').y, at('next-day').y); assert.ok(at('day').x < at('next-day').x);
    assert.equal(at('morning').y, at('afternoon').y); assert.ok(at('morning').x < at('afternoon').x);
    assert.equal(at('minute').y, at('next-minute').y); assert.ok(at('minute').x < at('next-minute').x);
    assert.ok(at('day').y < at('minute').y && at('minute').y < at('second').y);
    assert.notEqual(at('morning').y, at('minute').y);
    assert.equal(at('bedtime').ordered.missing, false);
    assert.equal(at('day').ordered.value, '--09-12', 'a partial date never acquires an invented year');
    assert.deepEqual(graph.nodes.map(node => node.properties), original.map(node => node.properties));
    assert.ok(graph.nodes.every(node => Number.isFinite(node.x) && Number.isFinite(node.y)));
    const convergence = orderedConvergences(graph.nodes, graph.relationships, graph.completeParentIds);
    assert.deepEqual(convergence.map(edge => edge.from).sort(), ['backend-afternoon', 'backend-next-minute', 'backend-second']);
    assert.ok(convergence.every(edge => edge.to === graph.nextId && edge.layoutOnly && !Object.hasOwn(edge, 'id')));
    assert.equal(orderedConvergences(graph.nodes, graph.relationships, []).length, 0);
});

test('time v2 fishbone keeps calendar hierarchy and independent phase, clock and relative lanes in one rigid skeleton', () => {
    const layout = createOrderedGraphLayout(), { nodes } = orderedTimeGraph(), byId = new Map(nodes.map(node => [node.id, node]));
    layout.rebuild(nodes);
    const at = id => byId.get(id);
    assert.ok(at('year').y < at('month').y && at('month').y < at('day').y);
    assert.equal(at('day').y, at('next-day').y); assert.ok(at('day').x < at('next-day').x);
    assert.equal(at('morning').y, at('noon').y); assert.ok(at('morning').x < at('noon').x);
    assert.equal(at('minute').y, at('next-minute').y); assert.notEqual(at('morning').y, at('minute').y); assert.notEqual(at('hour').y, at('minute').y);
    assert.equal(at('bedtime').ordered.missing, false, 'anchored relative time has a parent without a sortable key');
    assert.notEqual(at('bedtime').y, at('unplaced').y);
    assert.ok(orderedNodeRadius(at('year').ordered) > orderedNodeRadius(at('day').ordered));
    assert.ok(orderedNodeRadius(at('day').ordered) > orderedNodeRadius(at('minute').ordered));
    assert.equal(orderedNodeCaption(at('day'), byId), '12日');
    assert.equal(orderedNodeCaption(at('day'), new Map()), '2026-09-12');
    const before = new Map(nodes.filter(node => node.ordered && !node.ordered.missing).map(node => [node.id, { x: node.x, y: node.y }])), missingY = at('unplaced').y;
    layout.move(at('minute'), at('minute').x + 50, at('minute').y + 80);
    for (const [id, point] of before) { assert.equal(at(id).x, point.x + 50); assert.equal(at(id).y, point.y + 80); }
    assert.equal(at('unplaced').y, missingY);
});

test('number and text axes keep the flat layout, size and directed business edge treatment', () => {
    const nodes = [ordered('a', '2', { ordered_kind: 'number', ordered_version: 2 }), ordered('b', '10', { ordered_kind: 'number', ordered_version: 2 })];
    createOrderedGraphLayout().rebuild(nodes);
    assert.equal(nodes[0].y, nodes[1].y); assert.ok(nodes[0].x < nodes[1].x);
    assert.equal(orderedNodeRadius(nodes[0].ordered), 8); assert.equal(nodes[0].ordered.hierarchy, false);
    assert.equal(orderedEdgeStyle('MEASURES', nodes[0], { label: 'Event' }).business, false);
});

test('decorative convergence requires a complete parent page, real parent NEXT and all actual lane containment edges', () => {
    const data = orderedTimeGraph(), converge = (edges = data.relationships, complete = data.completeParentIds) => orderedConvergences(data.nodes, edges, complete);
    assert.equal(converge().length, 5);
    assert.deepEqual(converge().map(edge => edge.from).sort(), ['hour', 'microsecond', 'next-minute', 'noon', 'second']);
    assert.ok(converge().every(edge => edge.to === 'next-day' && edge.layoutOnly && !Object.hasOwn(edge, 'id')));
    assert.equal(converge(data.relationships, []).length, 0);
    assert.equal(converge(data.relationships.filter(edge => edge.id !== 'next-day')).length, 0);
    assert.equal(converge(data.relationships.filter(edge => edge.id !== 'parent-noon')).length, 4);
    assert.equal(data.relationships.some(edge => edge.layoutOnly), false);
});

test('the unplaced area stays below newly expanded time branches', () => {
    const layout = createOrderedGraphLayout(), { nodes } = orderedTimeGraph(), day = nodes.find(node => node.id === 'day'), unknown = nodes.find(node => node.id === 'unplaced');
    layout.rebuild([day, unknown]); const before = unknown.y;
    layout.rebuild(nodes);
    assert.ok(unknown.y > before); assert.ok(unknown.y > Math.max(...nodes.filter(node => node.ordered && !node.ordered.missing).map(node => node.y)));
});
