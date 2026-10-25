import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY } from 'd3-force';
import { JSDOM } from 'jsdom';
import { createOrderedGraphLayout, createOrderedOrbitLayout, orderedNodeRadius } from '../src/features/knowledge/orderedGraphLayout.js';
import { orderedTimeForks } from './fixtures/orderedTimeForks.mjs';

function layout(graph, factory = createOrderedOrbitLayout) {
    const structural = createOrderedGraphLayout();
    structural.rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds });
    const orbit = factory(); orbit.rebuild(graph.nodes, graph.relationships);
    return { orbit, structural, at: id => graph.nodes.find(node => node.id === id) };
}

function localSimulation(graph, orbit, { alphaTarget = 0 } = {}) {
    return forceSimulation(graph.nodes).stop().velocityDecay(0.32).alphaDecay(0.018).alphaTarget(alphaTarget)
        .force('local', alpha => orbit.tick(alpha));
}

test('ordered skeleton ignores global forces while an Event accelerates towards its own Time', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    assert.equal(event.orderedOrbit.anchorId, time.id);
    orbit.move(event, time.x, time.y - 112);
    time.x += 100; time.y += 50; time.vx = 1e6; time.vy = -1e6;
    event.x += 60; event.vx = event.vy = 0;
    orbit.tick(1);
    assert.equal(time.x, time.orderedTargetX); assert.equal(time.y, time.orderedTargetY);
    assert.equal(time.vx, 0); assert.equal(time.vy, 0);
    assert.ok(event.vx < 0, 'the owning Time pulls an Event displaced to its right back toward its orbit');
});

test('dense remote branches and cross links do not pull an event away from its nearest anchor', () => {
    const graph = orderedTimeForks(), control = layout(orderedTimeForks()), { orbit, at } = layout(graph), event = at('fork-event'), before = { x: event.x, y: event.y, ...event.orderedOrbit };
    for (let index = 0; index < 70; index++) {
        const id = `dense-${index}`; graph.nodes.push({ id, label: 'Concept', name: id });
        graph.relationships.push({ id: `dense-time-${index}`, source: id, target: 'fork-november', type: 'OCCURRED_AT' });
        graph.relationships.push({ id: `cross-${index}`, source: 'fork-event', target: id, type: 'RELATED' });
    }
    orbit.rebuild(graph.nodes, graph.relationships); orbit.tick(1); control.orbit.tick(1);
    assert.equal(event.orderedOrbit.anchorId, 'fork-afternoon');
    assert.equal(event.x, before.x); assert.equal(event.y, before.y);
    assert.equal(event.vx, control.at('fork-event').vx); assert.equal(event.vy, control.at('fork-event').vy);
    assert.equal(at('dense-20').orderedOrbit.anchorId, 'fork-november');
});

test('ordinary satellites move through physical coordinates, stay near their owner and avoid their own group', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const start = { x: event.x, y: event.y }, anchor = { x: time.x, y: time.y };
    const simulation = localSimulation(graph, orbit);
    simulation.tick(8);
    assert.ok(Math.hypot(event.x - start.x, event.y - start.y) > 4, 'expansion has visible motion rather than starting at an exact frozen slot');
    const speed = Math.hypot(event.vx, event.vy); assert.ok(speed > 0.1);
    simulation.tick(340);
    assert.deepEqual({ x: time.x, y: time.y }, anchor);
    assert.ok(Math.hypot(event.x - time.x, event.y - time.y) < 190, 'the owner remains a bounded physical tether');
    assert.equal(event.fx, null); assert.equal(event.fy, null);
    graph.nodes.push({ id: 'neighbor', label: 'Event' });
    graph.relationships.push({ id: 'neighbor-at', source: 'neighbor', target: time.id, type: 'AT' });
    orbit.rebuild(graph.nodes, graph.relationships);
    orbit.move(event, time.x, time.y - 112); orbit.move(at('neighbor'), time.x + 1, time.y - 112);
    const nearBefore = Math.hypot(event.x - at('neighbor').x, event.y - at('neighbor').y);
    assert.ok(nearBefore < 2);
    simulation.force('collision', forceCollide(node => (node.radius || 18) + 22).strength(0.8).iterations(2));
    simulation.force('local', null).force('local', alpha => orbit.tick(alpha));
    simulation.nodes(graph.nodes).alpha(1).tick(340);
    assert.ok(Math.hypot(event.x - at('neighbor').x, event.y - at('neighbor').y) > 40,
        'same-owner collision must physically separate two Events with overlapping targets');
    simulation.stop();
});

test('ordinary nodes receive no ambient impulses from the shared layout', () => {
    const graph = { nodes: [{ id: 'event', label: 'Event', x: 20, y: 40, vx: 0, vy: 0 },
        { id: 'source', label: 'Chunk', x: -40, y: 20, vx: 0, vy: 0 }], relationships: [] };
    const orbit = createOrderedOrbitLayout(); orbit.rebuild(graph.nodes, []);
    for (let frame = 0; frame < 600; frame++) orbit.tick(0.06);
    for (const node of graph.nodes) assert.deepEqual({ vx: node.vx, vy: node.vy }, { vx: 0, vy: 0 });
});

test('a cooled ordinary graph appears stationary until disturbed', () => {
    const graph = { nodes: [{ id: 'first', label: 'Event', x: -100, y: 0 },
        { id: 'second', label: 'Event', x: 100, y: 0 }], relationships: [] };
    const orbit = createOrderedOrbitLayout(); orbit.rebuild(graph.nodes, graph.relationships);
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.045 })
        .force('charge', forceManyBody().strength(-120).distanceMin(35))
        .force('x', forceX(0).strength(0.035)).force('y', forceY(0).strength(0.035))
        .force('collision', forceCollide(48).strength(0.8));
    simulation.force('local', null).force('local', alpha => orbit.tick(alpha));
    simulation.tick(900);
    const start = graph.nodes.map(({ x, y }) => ({ x, y }));
    let maxStep = 0, maxExcursion = 0;
    for (let step = 0; step < 360; step++) {
        const previous = graph.nodes.map(({ x, y }) => ({ x, y })); simulation.tick();
        for (const [index, node] of graph.nodes.entries()) {
            maxStep = Math.max(maxStep, Math.hypot(node.x - previous[index].x, node.y - previous[index].y));
            maxExcursion = Math.max(maxExcursion, Math.hypot(node.x - start[index].x, node.y - start[index].y));
            assert.ok(Math.hypot(node.x, node.y) < 140, 'the ordinary graph stays near its physical center');
        }
    }
    simulation.stop();
    assert.ok(maxStep < 0.02, `settled motion must be negligible between frames (${maxStep.toFixed(3)}px)`);
    assert.ok(maxExcursion < 0.5, `untouched nodes must remain visually stationary (${maxExcursion.toFixed(3)}px)`);
});

test('new orbit slots avoid neighboring skeleton nodes and their caption band without adding another owner', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event');
    assert.equal(event.orderedOrbit.anchorId, 'fork-afternoon');
    assert.notEqual(event.orderedOrbit.slot, 0, 'the upper slot would cover the evening phase in the parallel lane');
    const clear = () => {
        for (const node of graph.nodes.filter(node => node.ordered)) {
            assert.ok(Math.hypot(event.x - node.x, event.y - node.y) > 50, `${node.id} stays unobscured`);
            const radius = orderedNodeRadius(node.ordered);
            assert.ok(Math.abs(event.x - node.x) >= 140 || event.y + 56 <= node.y - radius - 10 || event.y - 30 >= node.y + radius + 54, `${node.id} caption band stays clear`);
        }
    };
    clear();
    const simulation = forceSimulation(graph.nodes).stop().velocityDecay(0.32).alphaDecay(0.018).force('local', alpha => orbit.tick(alpha));
    simulation.tick(340); clear(); simulation.stop();
});

test('a fresh satellite avoids the Time spine while an old near-rail slot clears through real physics', () => {
    const graphAtLowerAnchor = () => {
        const graph = orderedTimeForks();
        createOrderedGraphLayout().rebuild(graph.nodes, { relationships: graph.relationships, completeParentIds: graph.completeParentIds });
        const anchor = graph.nodes.find(node => node.id === 'fork-afternoon');
        anchor.y = anchor.previousY = anchor.orderedTargetY = 120;
        return { graph, anchor, event: graph.nodes.find(node => node.id === 'fork-event') };
    };
    const fresh = graphAtLowerAnchor(), freshOrbit = createOrderedOrbitLayout();
    freshOrbit.rebuild(fresh.graph.nodes, fresh.graph.relationships);
    assert.notEqual(fresh.event.orderedOrbit.slot, 0, 'new Event must not occupy a slot intersecting the horizontal Time spine');
    assert.ok(Math.abs(fresh.event.y) > 24, 'new Event circle starts clear of the Time spine');

    const saved = graphAtLowerAnchor(), orbit = createOrderedOrbitLayout();
    saved.event.x = saved.event.previousX = saved.anchor.x;
    saved.event.y = saved.event.previousY = 8;
    saved.event.orderedOrbit = { anchorId: saved.anchor.id, slot: 0 };
    orbit.rebuild(saved.graph.nodes, saved.graph.relationships, { restore: true });
    const savedOrbit = structuredClone(saved.event.orderedOrbit), fixedTime = { x: saved.anchor.x, y: saved.anchor.y };
    assert.equal(saved.event.orderedOrbit.slot, 0, 'an existing canvas retains its saved orbit choice');
    const simulation = localSimulation(saved.graph, orbit, { alphaTarget: 0.08 });
    for (let frame = 0; frame < 360; frame++) {
        simulation.tick();
        if (frame >= 60 && frame % 30 === 0) {
            assert.ok(Math.abs(saved.event.y) > 21, 'the physical Event circle stays clear of the Time spine');
        }
    }
    simulation.stop();
    assert.deepEqual(saved.event.orderedOrbit, savedOrbit, 'physics preserves the saved orbit choice');
    assert.deepEqual({ x: saved.anchor.x, y: saved.anchor.y }, fixedTime, 'physics leaves the ordered axis fixed');
});

test('new slots also avoid already assigned foreign orbits without introducing cross-owner attraction', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), saved = structuredClone(event.orderedOrbit);
    for (let index = 0; index < 40; index++) {
        const id = `foreign-${index}`; graph.nodes.push({ id, label: 'Event' });
        graph.relationships.push({ id: `at-${index}`, source: id, target: 'fork-november', type: 'AT' });
    }
    orbit.rebuild(graph.nodes, graph.relationships);
    assert.deepEqual(event.orderedOrbit, saved, 'allocating another group never rearranges an existing orbit');
    const simulation = forceSimulation(graph.nodes).stop().velocityDecay(0.32).alphaDecay(0.018).force('local', alpha => orbit.tick(alpha));
    simulation.tick(340);
    for (const node of graph.nodes.filter(node => node.id.startsWith('foreign-'))) {
        assert.equal(node.orderedOrbit.anchorId, 'fork-november');
        assert.ok(Math.hypot(event.x - node.x, event.y - node.y) > 60, node.id);
    }
    simulation.stop();
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
    assert.equal(orbit.physicalLink(at('fork-afternoon'), at('chunk')), true,
        'a source Chunk must still receive a real physical spring from its Time');
    assert.equal(orbit.physicalLink(at('chunk'), at('source-only')), true,
        'a provenance edge must be able to pull its Chunk and knowledge endpoint together');
    assert.equal(orbit.physicalLink(at('fork-event'), at('fork-afternoon')), true,
        'the owning Time physically tethers its Event');
    assert.equal(orbit.physicalLink(at('fork-event'), at('fork-november')), false,
        'a different Time cannot pull this Event off its owner');
    graph.nodes = graph.nodes.filter(node => node.id !== 'fork-afternoon'); orbit.rebuild(graph.nodes, graph.relationships);
    assert.equal(at('fork-event').orderedOrbit, undefined); assert.equal(at('child').orderedOrbit, undefined);
});

test('moving a Time anchor pulls its Event elastically rather than teleporting a rigid group', () => {
    const graph = orderedTimeForks(), { orbit, structural, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const controlGraph = orderedTimeForks(), control = layout(controlGraph);
    const old = { x: event.x, y: event.y }, other = { x: at('fork-noon').x, y: at('fork-noon').y };
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.08 });
    const controlSimulation = localSimulation(controlGraph, control.orbit, { alphaTarget: 0.08 });
    simulation.tick(180); controlSimulation.tick(180);
    const before = { x: event.x, y: event.y }, oldTime = { x: time.x, y: time.y };
    assert.deepEqual(before, { x: control.at('fork-event').x, y: control.at('fork-event').y });
    structural.move(time, time.x + 120, time.y); orbit.sync();
    assert.equal(time.x - oldTime.x, 120);
    assert.deepEqual({ x: event.x, y: event.y }, before,
        'moving Time must not rigidly translate its Event in the same frame');
    simulation.tick(80); controlSimulation.tick(80);
    const causalShift = event.x - control.at('fork-event').x;
    assert.ok(causalShift > 20 && causalShift < 120,
        `the owner spring should produce a delayed, bounded response relative to an unmoved control (${causalShift.toFixed(1)}px)`);
    assert.ok(Math.hypot(event.x - time.x, event.y - time.y) < 190, 'the Event remains locally tethered');
    simulation.tick(240); controlSimulation.tick(240);
    assert.ok(event.x - control.at('fork-event').x > causalShift + 15,
        'the Event continues to respond to the displaced owner across later physics frames');
    assert.deepEqual({ x: time.x, y: time.y }, { x: oldTime.x + 120, y: oldTime.y });
    assert.deepEqual({ x: at('fork-noon').x, y: at('fork-noon').y }, other);
    simulation.stop(); controlSimulation.stop();
    assert.ok(Math.hypot(event.x - old.x, event.y - old.y) > 20);
});

test('manual Event offsets survive rebuild and restore without reassigning their owner', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    orbit.move(event, time.x + 120, time.y + 60); const saved = structuredClone(event.orderedOrbit);
    orbit.rebuild(graph.nodes, graph.relationships, { restore: true }); orbit.tick(1);
    assert.deepEqual(event.orderedOrbit, saved);
    event.fx = event.x; event.fy = event.y;
    orbit.rebuild(graph.nodes, graph.relationships, { restore: true });
    assert.equal(event.fx, null); assert.equal(event.fy, null, 'restored legacy focus pins cannot override the owning anchor');
    orbit.rebuild(graph.nodes, graph.relationships, { reset: true });
    assert.equal(event.orderedOrbit.offset, undefined); assert.notEqual(event.y, time.y + 60);
});

test('owned knowledge has dynamic physical coordinates while Time stays fixed', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const originalTime = { x: time.x, y: time.y }, initial = { x: event.x, y: event.y };
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.08 });
    simulation.tick(8);
    assert.ok(Math.hypot(event.x - initial.x, event.y - initial.y) > 4,
        'movement must change the real D3 position rather than adding a draw-only offset');
    simulation.tick(350);
    assert.deepEqual({ x: time.x, y: time.y }, originalTime);
    assert.ok(Math.hypot(event.x - time.x, event.y - time.y) < 190);
    simulation.stop();
    orbit.rebuild(graph.nodes.filter(node => node.ordered), []);
});

test('Chunk provenance becomes a physical link without making the Chunk a rigid ordered satellite', () => {
    const graph = orderedTimeForks();
    graph.nodes.push({ id: 'source', label: 'Chunk', name: '原始段落', radius: 18 });
    graph.relationships.push({ id: 'source-event', source: 'source', target: 'fork-event', type: 'EXTRACTED_FROM' });
    const { orbit, at } = layout(graph), source = at('source'), event = at('fork-event'), time = at('fork-afternoon');
    assert.equal(source.orderedOrbit, undefined, 'provenance cannot make a Chunk inherit one arbitrary Time owner');
    assert.equal(orbit.physicalLink(source, event), true);
    assert.equal(orbit.physicalLink(event, time), true);
    source.x = time.x; source.y = time.y - 100;
    const sourceLinks = graph.relationships.filter(edge => edge.id === 'source-event' &&
        orbit.physicalLink(at(edge.source), at(edge.target))).map(edge => ({ source: edge.source, target: edge.target }));
    assert.equal(sourceLinks.length, 1, 'the real source edge must reach the D3 force link');
    const link = forceLink(sourceLinks).id(node => node.id).distance(170).strength(0.22);
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.06 }).force('source', link);
    const initialDistance = Math.hypot(source.x - event.x, source.y - event.y);
    simulation.tick(340); simulation.stop();
    const distance = Math.hypot(source.x - event.x, source.y - event.y);
    assert.ok(distance < 260 && distance < initialDistance + 80,
        `the source Chunk must remain near its connected Event, not drift to the world origin (${distance.toFixed(1)}px)`);
    assert.ok(Math.hypot(source.x, source.y) > 300, 'a Chunk connected to distant Time content must not collapse to the world origin');
});

test('an isolated Chunk participates in physics while retaining ordinary centering gravity', () => {
    const graph = orderedTimeForks();
    graph.nodes.push({ id: 'isolated-chunk', label: 'Chunk', x: 420, y: 260, vx: 0, vy: 0 });
    const { orbit, at } = layout(graph), chunk = at('isolated-chunk');
    const start = { x: chunk.x, y: chunk.y };
    assert.equal(orbit.sourceAnchored(chunk), false);
    const strength = node => node.ordered || node.orderedOrbit ? 0 : 0.035;
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.08 })
        .force('x', forceX(0).strength(strength)).force('y', forceY(0).strength(strength));
    simulation.tick(1200);
    assert.ok(Math.hypot(chunk.x, chunk.y) < 120, 'unowned nodes remain bounded by normal centering forces');
    assert.notDeepEqual({ x: chunk.x, y: chunk.y }, start);
    const warmed = { x: chunk.x, y: chunk.y }; simulation.tick(120); simulation.stop();
    assert.ok(Math.hypot(chunk.x - warmed.x, chunk.y - warmed.y) < 0.1,
        'an untouched source should appear stationary after its initial layout');
});

for (const withTime of [false, true]) test(`unowned Entity and Chunk remain bounded and react to displacement with Time=${withTime}`, () => {
    const graph = withTime ? orderedTimeForks() : { nodes: [], relationships: [] };
    graph.nodes.push({ id: 'unrelated-event', label: 'Event', x: 420, y: 240, vx: 0, vy: 0 },
        { id: 'unrelated-chunk', label: 'Chunk', x: 450, y: 260, vx: 0, vy: 0 });
    graph.relationships.push({ id: 'unrelated-source', source: 'unrelated-chunk', target: 'unrelated-event', type: 'EXTRACTED_FROM' });
    const { orbit, at } = layout(graph);
    assert.equal(orbit.sourceAnchored(at('unrelated-event')), false);
    assert.equal(orbit.sourceAnchored(at('unrelated-chunk')), false);
    assert.equal(orbit.sourceAnchored(at('fork-event')), false);
    const event = at('unrelated-event'), chunk = at('unrelated-chunk');
    assert.equal(orbit.physicalLink(event, chunk), true);
    const skeleton = graph.nodes.filter(node => node.ordered).map(({ x, y }) => ({ x, y }));
    const strength = node => node.ordered || node.orderedOrbit ? 0 : 0.035;
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.06 })
        .force('link', forceLink([{ source: event, target: chunk }]).distance(135).strength(0.07))
        .force('x', forceX(0).strength(strength)).force('y', forceY(0).strength(strength))
        .force('collision', forceCollide(35));
    simulation.force('local', null).force('local', alpha => orbit.tick(alpha));
    simulation.tick(900);
    const warmed = [event, chunk].map(({ x, y }) => ({ x, y }));
    simulation.stop();
    for (const node of [event, chunk]) {
        assert.ok(Math.hypot(node.x, node.y) < 500, 'unowned components retain centering gravity');
        assert.equal(node.orderedOrbit, undefined);
    }
    assert.ok(Math.hypot(event.x - chunk.x, event.y - chunk.y) < 140, 'the source spring still connects the moving nodes');
    event.x += 100; simulation.alpha(0.35).tick(12);
    assert.ok(Math.hypot(chunk.x - warmed[1].x, chunk.y - warmed[1].y) > 1, 'displacing an Event still pulls its source Chunk');
    assert.deepEqual(graph.nodes.filter(node => node.ordered).map(({ x, y }) => ({ x, y })), skeleton);
});

test('a multi-source Chunk stays in the local region of its moving source Events', () => {
    const graph = orderedTimeForks();
    graph.nodes.push({ id: 'second-event', label: 'Event', name: '另一事件' },
        { id: 'shared-chunk', label: 'Chunk', name: '共同来源', radius: 18 });
    graph.relationships.push(
        { id: 'second-time', source: 'second-event', target: 'fork-afternoon', type: 'HAPPENED_AT' },
        { id: 'source-one', source: 'shared-chunk', target: 'fork-event', type: 'EXTRACTED_FROM' },
        { id: 'source-two', source: 'shared-chunk', target: 'second-event', type: 'EXTRACTED_FROM' },
    );
    const { orbit, at } = layout(graph), chunk = at('shared-chunk'), time = at('fork-afternoon');
    chunk.x = time.x - 350; chunk.y = time.y - 480;
    const links = graph.relationships.filter(edge => orbit.physicalLink(at(edge.source), at(edge.target)))
        .map(edge => ({ source: edge.source, target: edge.target, sourceLink: edge.type === 'EXTRACTED_FROM' }));
    const simulation = localSimulation(graph, orbit, { alphaTarget: 0.06 })
        .force('link', forceLink(links).id(node => node.id)
            .distance(edge => edge.sourceLink ? 135 : 180)
            .strength(edge => edge.sourceLink ? 0.07 : 0.18))
        .force('charge', forceManyBody().strength(node => node.ordered ? 0 : -120).distanceMin(35))
        .force('collision', forceCollide(node => (node.radius || 18) + 30).strength(0.8));
    // As in both renderers, the ordered force runs after all other forces.
    simulation.force('local', null).force('local', alpha => orbit.tick(alpha));
    simulation.tick(360); simulation.stop();
    const sources = [at('fork-event'), at('second-event')];
    const center = { x: sources.reduce((sum, node) => sum + node.x, 0) / 2,
        y: sources.reduce((sum, node) => sum + node.y, 0) / 2 };
    const centerDistance = Math.hypot(chunk.x - center.x, chunk.y - center.y);
    assert.ok(centerDistance < 150,
        `a shared source must remain around the moving source centroid, rather than drifting off canvas (${centerDistance.toFixed(1)}px; chunk=${JSON.stringify({ x: chunk.x, y: chunk.y })}; sources=${JSON.stringify(sources.map(node => ({ x: node.x, y: node.y })))})`);
    assert.ok(sources.every(node => Math.hypot(chunk.x - node.x, chunk.y - node.y) < 230),
        'both provenance links stay locally readable');
    assert.deepEqual({ x: time.x, y: time.y }, { x: time.orderedTargetX, y: time.orderedTargetY });
});

test('rebuild preserves a valid owner and slot without resetting the physical position', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event');
    const simulation = localSimulation(graph, orbit); simulation.tick(40); simulation.stop();
    const savedOrbit = structuredClone(event.orderedOrbit), position = { x: event.x, y: event.y };
    graph.nodes.reverse(); graph.relationships.reverse();
    orbit.rebuild(graph.nodes, graph.relationships, { restore: true });
    assert.deepEqual(event.orderedOrbit, savedOrbit);
    assert.deepEqual({ x: event.x, y: event.y }, position,
        'restoring unchanged graph data must not teleport a moving Event back to an initial orbit slot');
});

test('both renderers use the identical ownership, physical links and rigid skeleton contract', async () => {
    const source = await readFile(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-ordered-layout.js', import.meta.url), 'utf8');
    const context = { window: {} }; vm.runInNewContext(source, context);
    const graph = orderedTimeForks(), other = structuredClone(graph);
    const chat = layout(graph), management = layout(other, context.window.CWMOrderedGraphLayout.createOrderedOrbitLayout);
    assert.deepEqual(JSON.parse(JSON.stringify(other.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))), JSON.parse(JSON.stringify(graph.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))));
    for (const [left, right] of [['fork-event', 'fork-afternoon'], ['fork-event', 'fork-november'], ['fork-day11', 'fork-day15']])
        assert.equal(chat.orbit.physicalLink(chat.at(left), chat.at(right)),
            management.orbit.physicalLink(management.at(left), management.at(right)));
    const chatSimulation = localSimulation(graph, chat.orbit), managementSimulation = localSimulation(other, management.orbit);
    chatSimulation.tick(90); managementSimulation.tick(90);
    chatSimulation.stop(); managementSimulation.stop();
    for (const id of ['fork-event', 'fork-afternoon']) {
        const a = chat.at(id), b = management.at(id);
        assert.ok(Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6,
            `${id} has the same physical position in chat and management`);
    }
});

test('only skeleton lines stop flowing; ordinary ordered associations keep their dotted bidirectional highlight', async t => {
    for (const [file, animationName] of [
        ['../src/features/chat/ui/message/components/KnowledgeGraphViewer.css', 'chat-knowledge-association-flow'],
        ['../../../Python/Chat-With-Me-Backend/application/management_pages/static/management.css', 'knowledge-association-flow'],
    ]) {
        const css = await readFile(new URL(file, import.meta.url), 'utf8');
        const dom = new JSDOM(`<style>${css}</style><div class="chat-knowledge-canvas knowledge-canvas" data-edge-animation="true" data-edge-animation-active="true"><svg class="chat-knowledge-graph"><path class="knowledge-edge ordered-business"></path><path class="knowledge-edge-flow ordered-business"></path><path class="knowledge-edge-flow ordered-skeleton"></path></svg></div>`, { url: 'https://graph.invalid/' });
        t.after(() => dom.window.close());
        const root = dom.window.document.querySelector('div'), flow = root.querySelector('.knowledge-edge-flow.ordered-business');
        let style = dom.window.getComputedStyle(flow);
        assert.notEqual(style.display, 'none', file);
        assert.equal(style.animationName, animationName, file);
        assert.equal(style.animationDirection, 'alternate'); assert.equal(style.animationPlayState, 'running');
        assert.equal(dom.window.getComputedStyle(root.querySelector('.ordered-skeleton')).display, 'none');
        assert.equal(dom.window.getComputedStyle(root.querySelector('.knowledge-edge')).strokeDasharray, '1 5');
        root.dataset.edgeAnimationActive = 'false';
        assert.equal(dom.window.getComputedStyle(flow).animationPlayState, 'paused');
        root.dataset.edgeAnimation = 'false';
        assert.equal(dom.window.getComputedStyle(flow).opacity, '0');
    }
});
