import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createOrderedGraphLayout, createOrderedOrbitLayout } from '../src/features/knowledge/orderedGraphLayout.js';
import { orderedTimeForks } from './fixtures/orderedTimeForks.mjs';

function layout(graph, factory = createOrderedOrbitLayout) {
    const structural = createOrderedGraphLayout();
    structural.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds });
    const orbit = factory(); orbit.rebuild(graph.nodes, graph.relationships);
    return { orbit, structural, at: id => graph.nodes.find(node => node.id === id) };
}

test('ordered skeleton ignores global forces and a satellite receives only its owning anchor spring', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    assert.equal(event.orderedOrbit.anchorId, time.id);
    time.x += 100; time.y += 50; time.vx = 1e6; time.vy = -1e6;
    event.x += 60; event.vx = -1e6; event.vy = 1e6;
    orbit.tick(1);
    assert.equal(time.x, time.orderedTargetX); assert.equal(time.y, time.orderedTargetY);
    assert.equal(time.vx, 0); assert.equal(time.vy, 0);
    assert.ok(Math.abs(event.vx + 30) < 1e-9); assert.ok(Math.abs(event.vy) < 1e-9);
});

test('dense remote branches and cross links do not pull an event away from its nearest anchor', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), before = { x: event.x, y: event.y, ...event.orderedOrbit };
    for (let index = 0; index < 70; index++) {
        const id = `dense-${index}`; graph.nodes.push({ id, label: 'Concept', name: id });
        graph.relationships.push({ id: `dense-time-${index}`, source: id, target: 'fork-november', type: 'OCCURRED_AT' });
        graph.relationships.push({ id: `cross-${index}`, source: 'fork-event', target: id, type: 'RELATED' });
    }
    orbit.rebuild(graph.nodes, graph.relationships); orbit.tick(1);
    assert.equal(event.orderedOrbit.anchorId, 'fork-afternoon');
    assert.equal(event.x, before.x); assert.equal(event.y, before.y); assert.equal(event.vx, 0); assert.equal(event.vy, 0);
    assert.equal(at('dense-20').orderedOrbit.anchorId, 'fork-november');
});

test('shared entities choose one stable anchor and retain slots when earlier-named nodes stream in', () => {
    const graph = orderedTimeForks();
    graph.relationships.push({ id: 'shared', source: 'fork-event', target: 'fork-noon', type: 'RELATED' });
    const { orbit, at } = layout(graph), first = structuredClone(at('fork-event').orderedOrbit);
    graph.nodes.push({ id: 'aaa-new', label: 'Event', name: 'new' });
    graph.relationships.push({ id: 'new', source: 'aaa-new', target: first.anchorId, type: 'AT' });
    graph.nodes.reverse(); graph.relationships.reverse(); orbit.rebuild(graph.nodes, graph.relationships);
    assert.deepEqual(at('fork-event').orderedOrbit, first);
    assert.notEqual(at('aaa-new').orderedOrbit.slot, first.slot);
});

test('source and structural edges never propagate ownership; ordinary business descendants do', () => {
    const graph = orderedTimeForks();
    graph.nodes.push({ id: 'child', label: 'Person' }, { id: 'chunk', label: 'Chunk' }, { id: 'source-only', label: 'Concept' });
    graph.relationships.push(
        { id: 'business', source: 'fork-event', target: 'child', type: 'INVOLVES' },
        { id: 'src1', source: 'fork-afternoon', target: 'chunk', type: 'EXTRACTED_FROM' },
        { id: 'src2', source: 'source-only', target: 'chunk', type: 'EXTRACTED_FROM' },
    );
    const { orbit, at } = layout(graph);
    assert.equal(at('child').orderedOrbit.anchorId, 'fork-afternoon');
    assert.equal(orbit.controlled(at('chunk')), false); assert.equal(orbit.controlled(at('source-only')), false);
    graph.nodes = graph.nodes.filter(node => node.id !== 'fork-afternoon'); orbit.rebuild(graph.nodes, graph.relationships);
    assert.equal(at('fork-event').orderedOrbit, undefined); assert.equal(at('child').orderedOrbit, undefined);
});

test('dragging an anchor carries only its satellites and manual orbit offsets survive rebuild and restore', () => {
    const graph = orderedTimeForks(), { orbit, structural, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const old = { x: event.x, y: event.y }, other = { x: at('fork-noon').x, y: at('fork-noon').y };
    structural.move(time, time.x + 80, time.y - 20); orbit.sync();
    assert.equal(event.x, old.x + 80); assert.equal(event.y, old.y - 20);
    assert.deepEqual({ x: at('fork-noon').x, y: at('fork-noon').y }, other);
    orbit.move(event, time.x + 120, time.y + 60); const saved = structuredClone(event.orderedOrbit);
    orbit.rebuild(graph.nodes, graph.relationships, { restore: true }); orbit.tick(1);
    assert.deepEqual(event.orderedOrbit, saved); assert.equal(event.vx, 0); assert.equal(event.vy, 0);
    event.fx = event.x; event.fy = event.y;
    orbit.rebuild(graph.nodes, graph.relationships, { restore: true });
    assert.equal(event.fx, null); assert.equal(event.fy, null, 'restored legacy focus pins cannot override the owning anchor');
    orbit.rebuild(graph.nodes, graph.relationships, { reset: true });
    assert.equal(event.orderedOrbit.offset, undefined); assert.notEqual(event.y, time.y + 60);
});

test('both renderers use the identical ownership, orbit and rigid skeleton contract', async () => {
    const source = await readFile(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-ordered-layout.js', import.meta.url), 'utf8');
    const context = { window: {} }; vm.runInNewContext(source, context);
    const graph = orderedTimeForks(), other = structuredClone(graph);
    layout(graph); layout(other, context.window.CWMOrderedGraphLayout.createOrderedOrbitLayout);
    assert.deepEqual(JSON.parse(JSON.stringify(other.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))), JSON.parse(JSON.stringify(graph.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))));
});
