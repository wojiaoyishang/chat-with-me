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

test('a fresh satellite avoids the Time spine while a saved near-rail slot keeps its layout and moves visibly clear', () => {
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
    const baseline = structuredClone(saved.graph.nodes);
    assert.equal(saved.event.orderedOrbit.slot, 0, 'an existing canvas retains its saved orbit choice');
    for (let frame = 0; frame < 360; frame++) {
        orbit.advanceAmbient(1000 / 60, { scale: 0.74 });
        if (frame >= 60 && frame % 30 === 0) {
            const point = orbit.renderPoint(saved.event, 0);
            assert.ok(Math.abs(point.y) > 21, 'the visible Event circle stays clear of the Time spine after settling');
        }
    }
    assert.deepEqual(saved.graph.nodes, baseline, 'rail avoidance remains display-only for saved canvas positions');
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

test('owned knowledge keeps moving physically after the graph settles while Time and saved coordinates stay fixed', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    const simulation = forceSimulation(graph.nodes).stop().velocityDecay(0.32).alphaDecay(0.018).force('local', alpha => orbit.tick(alpha));
    simulation.tick(600); simulation.stop();
    assert.equal(orbit.hasAmbientMotion(), true);
    const saved = structuredClone(graph.nodes), initial = orbit.renderPoint(event, 0), rendered = [initial];
    for (let frame = 1; frame <= 360; frame++) {
        orbit.advanceAmbient(1000 / 60, { scale: 1 });
        if (frame % 30 === 0) {
            const point = orbit.renderPoint(event, 0);
            rendered.push(point);
            assert.ok(Math.hypot(point.x - time.x, point.y - time.y) < 180, 'the free event remains near its own Time node');
            assert.deepEqual(orbit.renderPoint(time, 0), { x: time.x, y: time.y }, 'Time never joins the ambient physics');
        }
    }
    assert.ok(rendered.some(point => Math.hypot(point.x - initial.x, point.y - initial.y) > 12), 'a settled event must visibly move across the canvas, beyond a tiny decorative wobble');
    assert.deepEqual(graph.nodes, saved, 'ongoing physical motion never changes persisted positions, velocities, pins or orbit offsets');
});

test('ambient physics accepts interpolated points and honours pause, reduced-motion and dragging', () => {
    const graph = orderedTimeForks(), { orbit, at } = layout(graph), event = at('fork-event'), time = at('fork-afternoon');
    for (let frame = 0; frame < 150; frame++) orbit.advanceAmbient(1000 / 60, { scale: 1 });
    const point = orbit.renderPoint(event, 0), source = { ...event, x: event.x + 30, y: event.y - 40 };
    assert.deepEqual(orbit.renderPoint(source, 0), { x: point.x + 30, y: point.y - 40 });
    for (const options of [{ active: false }, { held: true }]) assert.deepEqual(orbit.renderPoint(event, 0, options), { x: event.x, y: event.y });
    assert.deepEqual(orbit.renderPoint(time, 0), { x: time.x, y: time.y }, 'ordered skeleton never moves');
    assert.deepEqual(orbit.renderPoint({ id: 'missing', x: 1, y: 2 }, 0), { x: 1, y: 2 });
    assert.deepEqual(orbit.renderPoint(event, 0), point, 'without an animation step, pause keeps the event at its last visible position');
    graph.nodes.push({ id: 'source', label: 'Chunk', x: 5, y: 6 });
    graph.relationships.push({ source: 'source', target: event.id, type: 'EXTRACTED_FROM' });
    orbit.rebuild(graph.nodes, graph.relationships);
    assert.deepEqual(orbit.renderPoint(at('source'), 0), { x: 5, y: 6 });
    assert.equal(createOrderedOrbitLayout().hasAmbientMotion(), false);
    orbit.rebuild(graph.nodes.filter(node => node.ordered), []);
    assert.equal(orbit.hasAmbientMotion(), false);
});

test('ambient physics restarts reproducibly by node identity after restore, regardless of input order', () => {
    const graph = orderedTimeForks(), other = structuredClone(graph);
    const first = layout(graph), restored = layout(other), id = 'fork-event';
    for (let frame = 0; frame < 180; frame++) first.orbit.advanceAmbient(1000 / 60, { scale: 1 });
    const moving = first.orbit.renderPoint(first.at(id), 0);
    assert.ok(Math.hypot(moving.x - first.at(id).x, moving.y - first.at(id).y) > 1, 'there is transient motion to clear');
    first.orbit.rebuild(graph.nodes, graph.relationships, { restore: true });
    assert.deepEqual(first.orbit.renderPoint(first.at(id), 0), moving, 'restoring an unchanged owner and slot within the session keeps its visible trajectory');
    assert.deepEqual(restored.orbit.renderPoint(restored.at(id), 0), { x: restored.at(id).x, y: restored.at(id).y }, 'a fresh load begins at its saved base position');
    first.orbit.resetAmbient();
    restored.orbit.resetAmbient();
    other.nodes.reverse(); other.relationships.reverse();
    restored.orbit.rebuild(other.nodes, other.relationships, { restore: true });
    first.orbit.rebuild(graph.nodes, graph.relationships, { restore: true });
    for (let frame = 0; frame < 180; frame++) {
        first.orbit.advanceAmbient(1000 / 60, { scale: 1 });
        restored.orbit.advanceAmbient(1000 / 60, { scale: 1 });
    }
    assert.deepEqual(restored.orbit.renderPoint(restored.at(id), 0), first.orbit.renderPoint(first.at(id), 0));
    assert.deepEqual(restored.orbit.renderPoint(restored.at('fork-afternoon'), 0), first.orbit.renderPoint(first.at('fork-afternoon'), 0));
});

test('both renderers use the identical ownership, orbit and rigid skeleton contract', async () => {
    const source = await readFile(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-ordered-layout.js', import.meta.url), 'utf8');
    const context = { window: {} }; vm.runInNewContext(source, context);
    const graph = orderedTimeForks(), other = structuredClone(graph);
    const chat = layout(graph), management = layout(other, context.window.CWMOrderedGraphLayout.createOrderedOrbitLayout);
    assert.deepEqual(JSON.parse(JSON.stringify(other.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))), JSON.parse(JSON.stringify(graph.nodes.map(({ id, x, y, orderedOrbit }) => ({ id, x, y, orderedOrbit })))));
    assert.equal(chat.orbit.hasAmbientMotion(), management.orbit.hasAmbientMotion());
    for (const scale of [0.3, 1, 2]) {
        for (let frame = 0; frame < 90; frame++) {
            chat.orbit.advanceAmbient(1000 / 60, { scale });
            management.orbit.advanceAmbient(1000 / 60, { scale });
        }
        const rendered = management.orbit.renderPoint(management.at('fork-event'), 0, { scale });
        assert.deepEqual({ ...rendered }, chat.orbit.renderPoint(chat.at('fork-event'), 0, { scale }));
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
