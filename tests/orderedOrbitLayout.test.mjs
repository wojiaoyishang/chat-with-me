import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { forceSimulation } from 'd3-force';
import { JSDOM } from 'jsdom';
import { createOrderedGraphLayout, createOrderedOrbitLayout, orderedNodeRadius } from '../src/features/knowledge/orderedGraphLayout.js';
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
    orbit.move(event, time.x, time.y - 112);
    time.x += 100; time.y += 50; time.vx = 1e6; time.vy = -1e6;
    event.x += 60; event.vx = -1e6; event.vy = 1e6;
    orbit.tick(1);
    assert.equal(time.x, time.orderedTargetX); assert.equal(time.y, time.orderedTargetY);
    assert.equal(time.vx, 0); assert.equal(time.vy, 0);
    assert.ok(Math.abs(event.vx + 7.2) < 1e-9); assert.ok(Math.abs(event.vy) < 1e-9);
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

test('ordinary satellites animate with local inertia, settle near their owner and avoid only their own group', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const start = { x: event.x, y: event.y }, anchor = { x: time.x, y: time.y };
    const simulation = forceSimulation(graph.nodes).stop().velocityDecay(0.32).alphaDecay(0.018).force('local', alpha => orbit.tick(alpha));
    simulation.tick(8);
    assert.ok(Math.hypot(event.x - start.x, event.y - start.y) > 4, 'expansion has visible motion rather than starting at an exact frozen slot');
    const speed = Math.hypot(event.vx, event.vy); assert.ok(speed > 0.1);
    simulation.tick(340);
    assert.deepEqual({ x: time.x, y: time.y }, anchor);
    assert.ok(Math.abs(Math.hypot(event.x - time.x, event.y - time.y) - 112) < 1);
    assert.equal(event.fx, null); assert.equal(event.fy, null);
    graph.nodes.push({ id: 'neighbor', label: 'Event' });
    graph.relationships.push({ id: 'neighbor-at', source: 'neighbor', target: time.id, type: 'AT' });
    orbit.rebuild(graph.nodes, graph.relationships);
    orbit.move(event, time.x, time.y - 112); orbit.move(at('neighbor'), time.x + 1, time.y - 112);
    simulation.nodes(graph.nodes).alpha(1).tick(340);
    assert.ok(Math.hypot(event.x - at('neighbor').x, event.y - at('neighbor').y) > 20, 'local collision is active even when manual target offsets overlap');
    simulation.stop();
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
