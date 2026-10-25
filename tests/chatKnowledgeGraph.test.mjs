import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { knowledgeGraphPresentation, graphEdgeGeometry, graphNodeColor } from '../src/features/chat/ui/message/components/knowledgeGraphPresentation.js';
import { createChatKnowledgeGraph } from '../src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js';
import { orderedTimeGraph } from './fixtures/orderedTimeV2.mjs';
import { backendOrderedTimeRegion } from './fixtures/orderedTimeV2BackendRegion.mjs';
import { orderedTimeForks } from './fixtures/orderedTimeForks.mjs';

const fixture = () => ({ nodes: [
    { id: 'root', elementId: 'neo-root', name: '知识节点', label: 'Event' },
    { id: 'chunk', name: '来源原文', labels: ['Knowledge', 'Chunk'] },
    { id: 'parent', name: '父片段', label: 'Chunk' },
    { id: 'other', name: '另一个节点', label: '自定义分类', labels: ['自定义分类'] },
], relationships: [
    { id: 'forward', from: 'neo-root', to: 'chunk', type: 'EXTRACTED_FROM' },
    { id: 'reverse', from: 'chunk', to: 'root', type: 'CONTAINS_KNOWLEDGE' },
    { id: 'hierarchy', source: 'chunk', target: 'parent', type: 'CHILD_OF' },
    { id: 'semantic', from: 'root', to: 'other', type: '关联' },
] });

function setup(t, { reducedMotion = false, onExpand, onOrderedNeighbors, onBeforeMove, controlsHeight = 0, edgeAnimation = true, observeVisibility = false } = {}) {
    const dom = new JSDOM(`<section><svg><g data-graph-camera><g data-graph-edges></g><g data-graph-nodes></g></g></svg>${controlsHeight ? '<div data-graph-controls></div>' : ''}</section>`, { pretendToBeVisual: true });
    const { window } = dom, svg = window.document.querySelector('svg'), frames = new Map();
    let sequence = 0, time = 0, ready = 0;
    const media = new window.EventTarget(); media.matches = reducedMotion;
    window.matchMedia = () => media;
    let visibility, observerDisconnected = false;
    if (observeVisibility) window.IntersectionObserver = class {
        constructor(callback) { visibility = callback; }
        observe() {}
        disconnect() { observerDisconnected = true; }
    };
    window.requestAnimationFrame = callback => { frames.set(++sequence, callback); return sequence; };
    window.cancelAnimationFrame = id => frames.delete(id);
    let dimensions = { width: 640, height: 300, controlsHeight };
    svg.getBoundingClientRect = () => ({ x: 0, y: 0, left: 0, top: 0, width: dimensions.width, height: dimensions.height });
    const controls = window.document.querySelector('[data-graph-controls]');
    if (controls) controls.getBoundingClientRect = () => ({ top: dimensions.height - dimensions.controlsHeight - 10, height: dimensions.controlsHeight });
    const controller = createChatKnowledgeGraph(svg, { markerId: 'test-arrow', onReady: () => ready++, onExpand, onOrderedNeighbors, onBeforeMove, edgeAnimation });
    t.after(() => { controller.destroy(); dom.window.close(); });
    return { dom, svg, controller, frames, ready: () => ready,
        setVisible(value) { visibility?.([{ isIntersecting: value }]); },
        setReducedMotion(value) { media.matches = value; media.dispatchEvent(new window.Event('change')); },
        observerDisconnected: () => observerDisconnected,
        resize(width, height = 300, controlsHeight = dimensions.controlsHeight) {
        dimensions = { width, height, controlsHeight }; window.dispatchEvent(new window.Event('resize'));
    }, run(count = 1) {
        for (let i = 0; i < count; i++) { time += 1000 / 60; const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(time)); }
    } };
}
const point = (dom, target, type, x, y, options = {}) => {
    const event = new dom.window.Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: x, clientY: y, ...options });
    target.dispatchEvent(event); return event;
};
const camera = svg => svg.querySelector('[data-graph-camera]').getAttribute('transform');
const cameraValues = svg => camera(svg).match(/-?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi).map(Number);
function screenCenter(ui, ids = ui.controller.getNodes().map(node => node.id)) {
    const [x, y, scale] = cameraValues(ui.svg), positions = ui.controller.getNodePositions().filter(node => ids.includes(node.id));
    const points = positions.map(node => ({ ...node, radius: Number(ui.svg.querySelector(`[data-node-id="${node.id}"] circle`).getAttribute('r')) }));
    return [x + scale * (Math.min(...points.map(n => n.x - n.radius)) + Math.max(...points.map(n => n.x + n.radius))) / 2,
        y + scale * (Math.min(...points.map(n => n.y - n.radius)) + Math.max(...points.map(n => n.y + n.radius))) / 2];
}
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.001, `${actual} should be near ${expected}`);

test('ordered context menu supports pointer and keyboard, stays inside the canvas, and closes without changing layout', t => {
    const selected = [], expanded = [], ui = setup(t, { onOrderedNeighbors: id => selected.push(id), onExpand: id => expanded.push(id) });
    ui.controller.setData(knowledgeGraphPresentation({ nodes: [
        { id: 'time', label: 'Time', name: '时间', labels: ['Time', 'OrderedNode'], properties: { ordered_axis: 'axis', ordered_kind: 'time', ordered_key: '1' } },
        { id: 'legacy', label: 'Time', name: '旧时间' },
    ], relationships: [] })); ui.run(420);
    const doc = ui.dom.window.document, node = ui.svg.querySelector('[data-node-id="time"]'), legacy = ui.svg.querySelector('[data-node-id="legacy"]'),
        positions = ui.controller.getNodePositions(), menu = () => doc.querySelector('[role="menu"]');
    const context = (target, x = 999, y = 999) => { const event = new ui.dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: x, clientY: y }); target.dispatchEvent(event); return event; };
    assert.equal(context(legacy).defaultPrevented, false); assert.equal(menu(), null);
    assert.equal(context(node).defaultPrevented, true); assert.ok(menu());
    assert.ok(Number.parseFloat(menu().style.left) <= 640 - 190 - 8); assert.ok(Number.parseFloat(menu().style.top) <= 300 - 40 - 8);
    assert.equal(doc.activeElement.getAttribute('role'), 'menuitem'); assert.equal(node.getAttribute('aria-expanded'), 'true');
    doc.activeElement.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(menu(), null); assert.equal(doc.activeElement, node); assert.equal(node.getAttribute('aria-expanded'), 'false');
    const keyboard = new ui.dom.window.KeyboardEvent('keydown', { key: 'F10', shiftKey: true, bubbles: true, cancelable: true }); node.dispatchEvent(keyboard);
    assert.equal(keyboard.defaultPrevented, true); assert.ok(menu());
    menu().querySelector('button').click(); assert.deepEqual(selected, ['time']); assert.equal(menu(), null);
    node.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: 'ContextMenu', bubbles: true })); assert.ok(menu());
    doc.body.click(); assert.equal(menu(), null);
    assert.deepEqual(ui.controller.getNodePositions(), positions);
    context(node); ui.resize(320); assert.equal(menu(), null);
    context(node); ui.controller.destroy(); assert.equal(menu(), null);
    assert.deepEqual(ui.controller.getNodePositions(), []);
    assert.ok(positions.length === 2); assert.deepEqual(expanded, [], 'opening the menu must not invoke all-neighbor expansion');
});

test('ordered chat nodes remain a small rigid sorted row across force, drag, focus, restore and partial queries', t => {
    const ordered = (id, key, extra = {}) => ({ id, name: id, label: 'Time', labels: ['Knowledge', 'Time', 'OrderedNode'], properties: { ordered_axis: 'timeline', ordered_kind: 'time', ordered_key: key, ordered_value: id, ...extra } });
    const network = { nodes: [ordered('late', '63745056000000002'), ordered('early', '63745056000000001'), ordered('unknown', null, { ordered_missing: true }), { id: 'entity', label: 'Event', name: 'event' }, { id: 'axis', label: 'OrderAxis' }], relationships: [
        { id: 'next', source: 'early', target: 'late', type: 'NEXT_ORDERED' },
        { id: 'internal', source: 'axis', target: 'late', type: 'HAS_ORDERED_NODE' },
        { id: 'semantic', source: 'entity', target: 'late', type: 'HAPPENS_AT' },
    ] };
    const ui = setup(t), positions = () => new Map(ui.controller.getNodePositions().map(node => [node.id, node]));
    ui.controller.setData(knowledgeGraphPresentation(network));
    const before = positions(), delta = before.get('late').x - before.get('early').x;
    assert.ok(delta > 0); assert.equal(before.get('early').y, before.get('late').y); assert.notEqual(before.get('unknown').y, before.get('late').y);
    assert.equal(ui.svg.querySelector('[data-node-id="axis"]'), null); assert.equal(ui.svg.querySelectorAll('.ordered-node').length, 3);
    assert.equal(ui.svg.querySelector('[data-node-id="late"] circle').getAttribute('r'), '8');
    assert.match(ui.svg.querySelector('[data-node-id="unknown"] text').textContent, /未定位/);
    ui.run(420); assert.equal(positions().get('late').x, before.get('late').x);
    assert.notDeepEqual(positions().get('entity'), before.get('entity'));
    point(ui.dom, ui.svg.querySelector('[data-node-id="early"]'), 'pointerdown', 200, 130);
    point(ui.dom, ui.dom.window, 'pointermove', 280, 170);
    const moved = positions(); assert.equal(moved.get('late').x - moved.get('early').x, delta); assert.equal(moved.get('late').y, moved.get('early').y);
    assert.notEqual(moved.get('late').x, before.get('late').x); assert.equal(moved.get('unknown').y, before.get('unknown').y);
    point(ui.dom, ui.dom.window, 'pointerup', 280, 170); ui.run(420);
    ui.controller.focusNetwork(['late', 'early']); ui.run(420);
    assert.equal(positions().get('late').x - positions().get('early').x, delta);
    const saved = ui.controller.getViewState(); ui.controller.relayout(); ui.controller.restoreViewState(saved); ui.run(420);
    near(positions().get('early').x, moved.get('early').x);
    ui.controller.setData(knowledgeGraphPresentation({ nodes: [network.nodes[0], ordered('later', '63745056000000004')], relationships: [] }));
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge').length, 0, 'loading two nonadjacent values must not invent a NEXT_ORDERED segment');
    assert.ok(positions().get('late').x < positions().get('later').x); assert.equal(positions().get('late').y, positions().get('later').y);
});

test('chat v2 hierarchy projects clean branches with full captions and keeps real relationship records', t => {
    const expanded = [], ui = setup(t, { onExpand: (id, mode) => expanded.push([id, mode]) }), network = orderedTimeGraph();
    ui.controller.setData(knowledgeGraphPresentation(network)); ui.run(420);
    const node = id => ui.svg.querySelector(`[data-node-id="${id}"]`), radius = id => Number(node(id).querySelector('circle').getAttribute('r'));
    assert.deepEqual(['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond'].map(radius), [18, 15, 12, 10, 8, 6, 4]);
    const hitAreas = [...ui.svg.querySelectorAll('.ordered-node .knowledge-node-hit')];
    assert.equal(hitAreas.length, network.nodes.filter(node => node.label === 'Time').length);
    assert.ok(hitAreas.every(hit => Number(hit.getAttribute('r')) >= 12));
    assert.equal(node('day').querySelector('text').textContent, '2026年9月12日');
    assert.equal(node('minute').querySelector('text').textContent, '2026年9月12日14:00');
    assert.match(node('minute').querySelector('title').textContent, /2026-09-12T14:00/);
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge').length, network.relationships.length, 'every visible line must have a real relationship');
    assert.ok(ui.svg.querySelectorAll('path[data-layout-only]').length > 0);
    assert.ok([...ui.svg.querySelectorAll('path[data-layout-only]')].every(path => !path.hasAttribute('data-edge-id') && !path.hasAttribute('marker-end')));
    assert.equal(ui.svg.querySelector('[data-edge-id="parent-minute"]').getAttribute('d'), '');
    assert.ok(ui.svg.querySelector('[data-route-kind="entry"]'));
    assert.ok([...ui.svg.querySelectorAll('.ordered-hierarchy,.ordered-link')].every(path => !path.hasAttribute('marker-end')));
    const business = ui.svg.querySelector('[data-edge-id="event-time"]');
    assert.equal(business.classList.contains('ordered-business'), true); assert.equal(business.hasAttribute('marker-end'), false);
    const raw = ui.controller.getRelationships().find(edge => edge.id === 'event-time');
    assert.equal(raw.from, 'event'); assert.equal(raw.to, 'minute');
    node('minute').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true }));
    node('event').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true }));
    assert.deepEqual(expanded, [['minute', 'region'], ['event', 'related']]);
    ui.controller.setData(knowledgeGraphPresentation({ nodes: [network.nodes.find(node => node.id === 'minute')], relationships: [] }));
    assert.equal(node('minute').querySelector('text').textContent, '2026年9月12日14:00', 'a child without loaded parent retains its full date');
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge').length, 0);
    assert.equal(ui.svg.querySelectorAll('path[data-layout-only]').length, 0, 'partial child pages never guess an unobserved lane end');
});

test('chat renders a captured backend partial-date region with real lanes, clickable small nodes and decorative convergence', t => {
    const network = backendOrderedTimeRegion(), original = structuredClone(network), ui = setup(t);
    ui.controller.setData(knowledgeGraphPresentation(network)); ui.run(420);
    const node = id => ui.svg.querySelector(`[data-node-id="backend-${id}"]`),
        positions = new Map(ui.controller.getNodePositions().map(node => [node.id, node])), at = id => positions.get(`backend-${id}`);
    assert.ok(at('month').x < at('day').x && at('day').x < at('minute').x && at('minute').x < at('next-day').x);
    assert.ok(Math.abs(at('day').y - at('next-day').y) < 1);
    assert.ok(Math.abs(at('morning').y - at('afternoon').y) < 1); assert.notEqual(at('morning').y, at('minute').y);
    assert.deepEqual(['month', 'day', 'minute', 'second'].map(id => Number(node(id).querySelector('circle').getAttribute('r'))), [15, 12, 8, 6]);
    const hits = [...ui.svg.querySelectorAll('.ordered-node .knowledge-node-hit')];
    assert.equal(hits.length, network.nodes.length); assert.ok(hits.every(hit => Number(hit.getAttribute('r')) >= 12));
    assert.equal(node('day').querySelector('text').textContent, '9月12日（年份未注明）');
    assert.equal(node('next-minute').querySelector('text').textContent, '9月12日14:00（年份未注明）');
    assert.match(node('next-minute').querySelector('title').textContent, /--09-12T14:00/);
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge').length, network.relationships.length);
    const convergence = [...ui.svg.querySelectorAll('path[data-layout-only]')];
    assert.ok(convergence.length > 3);
    assert.ok(convergence.every(path => !path.hasAttribute('data-edge-id') && !path.hasAttribute('marker-end') && / C /.test(path.getAttribute('d'))));
    assert.equal(ui.controller.getRelationships().length, network.relationships.length);
    assert.deepEqual(network, original, 'presentation must preserve the backend lane properties and graph payload');
});

test('chat nested forks settle horizontally and support one-node paused drag, restore and old-pin migration', t => {
    const moves = [], ui = setup(t, { onBeforeMove: label => moves.push(label) }), network = orderedTimeForks(), model = knowledgeGraphPresentation(network);
    ui.controller.setData(model); ui.run(420);
    const positions = () => new Map(ui.controller.getNodePositions().map(node => [node.id, node])), at = id => positions().get(id);
    const order = ['fork-october', 'fork-day11', 'fork-noon', 'fork-noon10', 'fork-afternoon', 'fork-day15', 'fork-november'];
    for (let index = 1; index < order.length; index++) assert.ok(at(order[index - 1]).x < at(order[index]).x, `${order[index - 1]} precedes ${order[index]} after physics settles`);
    assert.ok(Math.abs(at('fork-noon').y - at('fork-afternoon').y) < 6, 'disjoint hour/minute/second intervals share the clock route under soft forces');
    assert.equal(ui.controller.getRelationships().length, network.relationships.length);
    assert.equal(ui.svg.querySelector('[data-edge-id="next-fork-october"]').getAttribute('d'), '');
    assert.ok(ui.svg.querySelector('[data-route-kind="join"]'));
    const caption = ui.svg.querySelector('[data-node-id="fork-afternoon"] text');
    assert.equal(caption.textContent, '2026年10月11日14:00:00'); assert.ok(caption.querySelectorAll('tspan').length > 1);
    assert.deepEqual([...caption.querySelectorAll('tspan')].map(span => span.textContent), ['2026年10月11日', '14:00:00']);
    ui.controller.zoom(0.2); assert.equal(caption.style.fontSize, '12px');
    ui.controller.setPhysics(false);
    const before = positions(), target = ui.svg.querySelector('[data-node-id="fork-noon"]');
    point(ui.dom, target, 'pointerdown', 200, 130); point(ui.dom, ui.dom.window, 'pointermove', 220, 165);
    const moved = positions(); assert.notDeepEqual(moved.get('fork-noon'), before.get('fork-noon'));
    for (const [id, position] of before) if (id !== 'fork-noon') assert.deepEqual(moved.get(id), position, `${id} must not be dragged as a group`);
    point(ui.dom, ui.dom.window, 'pointerup', 220, 165); ui.run(12);
    assert.deepEqual(at('fork-noon'), moved.get('fork-noon'), 'release while paused keeps the manual point without snapping');
    assert.deepEqual(moves, ['移动节点']);
    const saved = ui.controller.getViewState();
    assert.equal(saved.positions.find(node => node.id === 'fork-noon').fx, null);
    ui.controller.setData(knowledgeGraphPresentation({ ...network, nodes: [...network.nodes, { id: 'streamed', label: 'Event', name: '新展开' }] }));
    assert.deepEqual(at('fork-noon'), moved.get('fork-noon'), 'expansion retains the existing manual point');
    ui.controller.relayout(); ui.controller.restoreViewState(saved); ui.run(12);
    assert.deepEqual(at('fork-noon'), moved.get('fork-noon'));
    ui.controller.restoreViewState({ ...saved, positions: saved.positions.map(node => ({ ...node, fx: node.x, fy: node.y })) });
    assert.ok(ui.controller.getViewState().positions.filter(node => node.id !== 'fork-event' && node.id !== 'streamed').every(node => node.fx == null && node.fy == null), 'old rigid v2 snapshots must not revive fixed pins');
    ui.controller.relayout(); assert.notDeepEqual(at('fork-noon'), moved.get('fork-noon'), 'reset removes manual offsets');
    ui.controller.setPhysics(true); ui.run(420);
    for (let index = 1; index < order.length; index++) assert.ok(at(order[index - 1]).x < at(order[index]).x);
});

test('chat streaming during a held time drag repins just that point and restoring history cancels the gesture', t => {
    let history;
    const ui = setup(t, { onBeforeMove: () => { history = ui.controller.getViewState(); } }), network = orderedTimeForks();
    const captures = new Set(); ui.svg.setPointerCapture = id => captures.add(id); ui.svg.hasPointerCapture = id => captures.has(id); ui.svg.releasePointerCapture = id => captures.delete(id);
    ui.controller.setData(knowledgeGraphPresentation(network)); ui.run(420);
    const at = () => ui.controller.getNodePositions().find(node => node.id === 'fork-noon');
    point(ui.dom, ui.svg.querySelector('[data-node-id="fork-noon"]'), 'pointerdown', 200, 130);
    point(ui.dom, ui.dom.window, 'pointermove', 220, 160);
    const held = at();
    ui.controller.setData(knowledgeGraphPresentation({ ...network, nodes: [...network.nodes, { id: 'streamed', label: 'Event' }] })); ui.run(30);
    assert.deepEqual(at(), held, 'a new model must preserve pointer capture despite helper rebuild releasing old pins');
    ui.controller.restoreViewState(history);
    const restored = at(); assert.deepEqual(restored, history.positions.find(node => node.id === 'fork-noon') && { id: 'fork-noon', x: history.positions.find(node => node.id === 'fork-noon').x, y: history.positions.find(node => node.id === 'fork-noon').y });
    assert.equal(captures.size, 0); assert.equal(ui.svg.classList.contains('dragging'), false);
    point(ui.dom, ui.dom.window, 'pointermove', 350, 220); point(ui.dom, ui.dom.window, 'pointerup', 350, 220); ui.run(30);
    assert.deepEqual(at(), restored, 'a stale held pointer must not overwrite the restored point');
});

test('relationship highlights remain active after layout settles without extra frames and follow live geometry and streamed removal', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(420);
    assert.equal(ui.svg.dataset.edgeAnimation, 'true');
    assert.equal(ui.svg.dataset.edgeAnimationActive, 'true');
    assert.equal(ui.frames.size, 0, 'CSS highlights must not keep D3 rendering');
    const flows = [...ui.svg.querySelectorAll('.knowledge-edge-flow')];
    assert.equal(flows.length, 3);
    for (const flow of flows) {
        assert.equal(flow.getAttribute('aria-hidden'), 'true');
        assert.equal(flow.getAttribute('d'), flow.previousElementSibling.getAttribute('d'));
    }
    assert.equal(flows.filter(flow => flow.classList.contains('source-flow')).length, 1);
    const cameraBefore = camera(ui.svg), before = flows[0].getAttribute('d');
    ui.controller.setEdgeAnimation(false); ui.controller.setEdgeAnimation(true);
    assert.equal(camera(ui.svg), cameraBefore); assert.equal(ui.frames.size, 0);
    point(ui.dom, ui.svg.querySelector('[data-node-id="root"]'), 'pointerdown', 200, 130);
    point(ui.dom, ui.dom.window, 'pointermove', 280, 160); ui.run(1);
    assert.notEqual(flows[0].getAttribute('d'), before);
    for (const flow of flows) assert.equal(flow.getAttribute('d'), flow.previousElementSibling.getAttribute('d'));
    point(ui.dom, ui.dom.window, 'pointerup', 280, 160);
    ui.controller.setData(knowledgeGraphPresentation({ nodes: fixture().nodes, relationships: [] }));
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge-flow').length, 0);
});

test('relationship preference, visibility, reduced motion and graph pause gate animation and dispose observers', t => {
    const ui = setup(t, { edgeAnimation: false, observeVisibility: true });
    ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(420);
    assert.equal(ui.svg.dataset.edgeAnimation, 'false');
    ui.controller.setEdgeAnimation(true); assert.equal(ui.svg.dataset.edgeAnimation, 'true');
    ui.setVisible(false); assert.equal(ui.svg.dataset.edgeAnimationActive, 'false');
    ui.setVisible(true); assert.equal(ui.svg.dataset.edgeAnimationActive, 'true');
    ui.setReducedMotion(true); assert.equal(ui.svg.dataset.edgeAnimationActive, 'false');
    ui.setReducedMotion(false); assert.equal(ui.svg.dataset.edgeAnimationActive, 'true');
    ui.controller.setPhysics(false); assert.equal(ui.svg.dataset.edgeAnimationActive, 'false');
    ui.controller.setPhysics(true); ui.run(420); assert.equal(ui.svg.dataset.edgeAnimationActive, 'true');
    Object.defineProperty(ui.dom.window.document, 'hidden', { configurable: true, value: true });
    ui.dom.window.document.dispatchEvent(new ui.dom.window.Event('visibilitychange'));
    assert.equal(ui.svg.dataset.edgeAnimationActive, 'false');
    Object.defineProperty(ui.dom.window.document, 'hidden', { configurable: true, value: false });
    ui.dom.window.document.dispatchEvent(new ui.dom.window.Event('visibilitychange'));
    assert.equal(ui.svg.dataset.edgeAnimationActive, 'true');
    ui.controller.destroy(); assert.equal(ui.observerDisconnected(), true);
    assert.equal(ui.svg.dataset.edgeAnimationActive, 'false');
    assert.equal(ui.svg.querySelectorAll('.knowledge-edge-flow').length, 0);
});

test('initial layout remains centered until physics settles, while user zoom cancels automatic framing', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(420);
    assert.equal(ui.svg.dataset.physicsState, 'settled');
    const centered = screenCenter(ui); near(centered[0], 320); near(centered[1], 150);
    const positions = ui.controller.getNodePositions(); ui.controller.relayout(); ui.run(2); ui.controller.zoom(0.7);
    const manualCamera = camera(ui.svg); ui.run(420); assert.equal(camera(ui.svg), manualCamera);
    assert.notDeepEqual(ui.controller.getNodePositions(), positions, 'Physics continues after canceling camera tracking');
});

test('single-node focus stays at viewport center while neighbors animate and keyboard focus uses the same behavior', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    ui.controller.focusNetwork('neo-root'); const focused = ui.controller.getNodePositions().find(node => node.id === 'root');
    const other = ui.controller.getNodePositions().find(node => node.id === 'other'); ui.run(420);
    assert.deepEqual(ui.controller.getNodePositions().find(node => node.id === 'root'), focused);
    assert.notDeepEqual(ui.controller.getNodePositions().find(node => node.id === 'other'), other);
    let centered = screenCenter(ui, ['root']); near(centered[0], 320); near(centered[1], 150);
    ui.svg.querySelector('[data-node-id="other"]').dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    const keyboardTarget = ui.controller.getNodePositions().find(node => node.id === 'other'); ui.run(420);
    assert.deepEqual(ui.controller.getNodePositions().find(node => node.id === 'other'), keyboardTarget);
    centered = screenCenter(ui, ['other']); near(centered[0], 320); near(centered[1], 150);
});

test('focused view resizes around unobscured canvas and stops refitting after manual panning', t => {
    const ui = setup(t, { controlsHeight: 30 }); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2); ui.controller.focusNetwork(['root', 'other']);
    let centered = screenCenter(ui, ['root', 'other']); near(centered[0], 320); near(centered[1], 134);
    const previousScale = cameraValues(ui.svg)[2]; ui.resize(300, 300, 66);
    centered = screenCenter(ui, ['root', 'other']); near(centered[0], 150); near(centered[1], 116);
    assert.ok(cameraValues(ui.svg)[2] < previousScale, 'Narrowed viewport must also reduce zoom to keep focused nodes visible');
    point(ui.dom, ui.svg, 'pointerdown', 100, 150, { button: 1 }); point(ui.dom, ui.dom.window, 'pointermove', 130, 160, { button: 1 }); point(ui.dom, ui.dom.window, 'pointerup', 130, 160, { button: 1 });
    const [x, y, scale] = cameraValues(ui.svg); ui.resize(400, 300, 80); const after = cameraValues(ui.svg);
    near(after[0], x + 50); near(after[1], y); near(after[2], scale);
});

test('chat source views merge opposite provenance and preserve Chunk hierarchy, raw IDs and dynamic labels', () => {
    const input = fixture(), before = structuredClone(input), graph = knowledgeGraphPresentation(input);
    assert.equal(graph.edges.length, 3); assert.equal(graph.relationships.length, 4); assert.equal(graph.links.length, 3);
    const source = graph.edges.find(edge => edge.sourceLink);
    assert.deepEqual(source.members.map(edge => edge.id), ['forward', 'reverse']);
    assert.equal(source.from, 'root'); assert.equal(source.to, 'chunk'); assert.equal(source.type, '来源');
    assert.equal(graph.edges.find(edge => edge.members[0].id === 'hierarchy').sourceLink, false);
    assert.equal(graph.nodes.find(node => node.id === 'other').color, graphNodeColor('自定义分类'));
    assert.equal(graph.nodes.find(node => node.id === 'chunk').label, 'Chunk');
    assert.deepEqual(input, before);
});

test('projection drops missing endpoints, deduplicates IDs, supports legacy fields and never guesses Chunk from ordinary labels', () => {
    const data = fixture();
    data.relationship = [...data.relationships, data.relationships[0], { id: 'missing', from: 'root', to: 'private' }, { id: 'ordinary-source', from: 'root', to: 'other', type: 'EXTRACTED_FROM' }];
    delete data.relationships;
    const model = knowledgeGraphPresentation(data);
    assert.equal(model.relationships.length, 5);
    assert.equal(model.edges.filter(edge => edge.sourceLink).length, 1);
    assert.equal(model.edges.find(edge => edge.members[0].id === 'ordinary-source').sourceLink, false);
    assert.deepEqual(knowledgeGraphPresentation({ nodes: null, relationships: 'bad' }).nodes, []);
});

test('source geometry is an open clipped arc and hides safely when endpoints overlap', () => {
    const a = { x: 0, y: 0, radius: 17 }, b = { x: 200, y: 80, radius: 19 };
    const geometry = graphEdgeGeometry({ sourceLink: true }, a, b);
    assert.match(geometry.path, /^M .* Q .*$/); assert.doesNotMatch(geometry.path, /Z|NaN|Infinity/);
    const [x1, y1, , , x2, y2] = geometry.path.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.ok(Math.abs(Math.hypot(x1, y1) - 20) < 0.01);
    assert.ok(Math.abs(Math.hypot(x2 - 200, y2 - 80) - 22) < 0.01);
    assert.equal(graphEdgeGeometry({ sourceLink: true }, a, { ...b, x: 0, y: 0 }).path, '');
});

test('stream updates preserve nodes, source view, camera and actual relationship identity', t => {
    const ui = setup(t), input = fixture(); input.relationships = input.relationships.filter(edge => edge.id !== 'reverse');
    ui.controller.setData(knowledgeGraphPresentation(input)); ui.run(420);
    const root = ui.svg.querySelector('[data-node-id="root"]'), source = ui.svg.querySelector('.source-link');
    ui.controller.zoom(0.7); const before = camera(ui.svg), position = root.getAttribute('transform');
    const next = fixture(); next.nodes[0].name = '更新后的名称';
    ui.controller.setData(knowledgeGraphPresentation(next));
    assert.equal(ui.svg.querySelector('[data-node-id="root"]'), root);
    assert.equal(ui.svg.querySelector('.source-link'), source);
    assert.equal(camera(ui.svg), before); assert.equal(root.getAttribute('transform'), position);
    assert.match(root.querySelector('title').textContent, /^更新后的名称\nEvent/);
    assert.equal(source.hasAttribute('marker-end'), false);
    assert.deepEqual(JSON.parse(source.dataset.edgeIds), ['forward', 'reverse']);
    assert.equal(ui.controller.getRelationships().length, 4); assert.equal(ui.ready(), 1);
    const original = structuredClone(next); ui.run(30); assert.deepEqual(next, original, 'D3 must never mutate the chat message');
});

test('force animation and dragging move connected neighbors while preserving pointer position and no auto-fit', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(420);
    const root = ui.svg.querySelector('[data-node-id="root"]'), source = ui.svg.querySelector('.source-link');
    const before = source.getAttribute('d'), neighbor = ui.controller.getNodePositions().find(node => node.id === 'chunk');
    const cameraBefore = camera(ui.svg);
    point(ui.dom, root, 'pointerdown', 250, 140);
    point(ui.dom, ui.dom.window, 'pointermove', 330, 170); ui.run(1);
    const dragged = root.getAttribute('transform'); ui.run(30);
    assert.equal(root.getAttribute('transform'), dragged);
    assert.notEqual(source.getAttribute('d'), before); assert.equal(camera(ui.svg), cameraBefore);
    const after = ui.controller.getNodePositions().find(node => node.id === 'chunk');
    assert.ok(Math.hypot(after.x - neighbor.x, after.y - neighbor.y) > 1);
    point(ui.dom, ui.dom.window, 'pointerup', 330, 170); ui.run(30);
    assert.notEqual(root.getAttribute('transform'), dragged);
});

test('double click and Space request related data for semantic nodes, while Chunk remains manual', t => {
    const expanded = [], ui = setup(t, { onExpand: id => expanded.push(id) });
    ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    const root = ui.svg.querySelector('[data-node-id="root"]'), chunk = ui.svg.querySelector('[data-node-id="chunk"]');
    root.dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true }));
    root.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
    chunk.dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true }));
    assert.deepEqual(expanded, ['root', 'root']);
    ui.controller.expanding('root', true); assert.equal(root.classList.contains('expanding'), true);
    ui.controller.expanding('root', false); assert.equal(root.classList.contains('expanding'), false);
});

test('middle-button panning, wheel zoom and touch pinch change only camera without clearing nodes', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(420);
    const before = camera(ui.svg);
    point(ui.dom, ui.svg, 'pointerdown', 200, 150, { button: 1 });
    point(ui.dom, ui.dom.window, 'pointermove', 240, 170, { button: 1 });
    point(ui.dom, ui.dom.window, 'pointerup', 240, 170, { button: 1 });
    assert.notEqual(camera(ui.svg), before);
    const wheel = new ui.dom.window.WheelEvent('wheel', { deltaY: -50, clientX: 320, clientY: 150, cancelable: true });
    const panned = camera(ui.svg); ui.svg.dispatchEvent(wheel);
    assert.equal(wheel.defaultPrevented, true); assert.notEqual(camera(ui.svg), panned);
    const zoomed = camera(ui.svg);
    point(ui.dom, ui.svg, 'pointerdown', 240, 150, { pointerId: 2, pointerType: 'touch' });
    point(ui.dom, ui.svg, 'pointerdown', 320, 150, { pointerId: 3, pointerType: 'touch' });
    point(ui.dom, ui.dom.window, 'pointermove', 400, 150, { pointerId: 3, pointerType: 'touch' });
    assert.notEqual(camera(ui.svg), zoomed);
    point(ui.dom, ui.dom.window, 'pointerup', 240, 150, { pointerId: 2, pointerType: 'touch' });
    point(ui.dom, ui.dom.window, 'pointerup', 400, 150, { pointerId: 3, pointerType: 'touch' });
    assert.equal(ui.svg.querySelectorAll('.knowledge-node').length, 4);
});

test('model focus uses current streamed nodes, accepts aliases and keeps the path horizontal', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    assert.equal(ui.controller.focusNetwork(['missing']), false);
    const next = fixture(); next.nodes.push({ id: 'late', name: '稍后出现的节点', label: 'Person' });
    next.relationships.push({ id: 'late-edge', from: 'other', to: 'late', type: '连接' });
    ui.controller.setData(knowledgeGraphPresentation(next));
    assert.equal(ui.controller.focusNetwork(['neo-root', 'other', 'late']), true); ui.run(30);
    const positions = ui.controller.getNodePositions().filter(node => ['root', 'other', 'late'].includes(node.id));
    assert.ok(positions.every(node => node.y === 0)); assert.equal(new Set(positions.map(node => node.x)).size, 3);
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 3);
});

test('Ctrl and Cmd clicks toggle multiple chat nodes, plain clicks select one and Esc clears without moving the camera', t => {
    const expanded = [], ui = setup(t, { reducedMotion: true, onExpand: id => expanded.push(id) });
    ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    const selected = () => [...ui.svg.querySelectorAll('.knowledge-node.selected')].map(node => node.dataset.nodeId).sort();
    const click = (id, options = {}) => ui.svg.querySelector(`[data-node-id="${id}"]`).dispatchEvent(new ui.dom.window.MouseEvent('click', { bubbles: true, ...options }));
    const before = camera(ui.svg);
    click('root'); click('other', { ctrlKey: true });
    assert.deepEqual(selected(), ['other', 'root']);
    click('root', { ctrlKey: true }); assert.deepEqual(selected(), ['other']);
    click('chunk', { metaKey: true }); assert.deepEqual(selected(), ['chunk', 'other']);
    ui.svg.querySelector('[data-node-id="chunk"]').dispatchEvent(new ui.dom.window.MouseEvent('dblclick', { bubbles: true, ctrlKey: true }));
    ui.svg.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: ' ', ctrlKey: true }));
    assert.deepEqual(selected(), ['chunk', 'other', 'root']); assert.deepEqual(expanded, []);
    const next = fixture(); next.nodes.push({ id: 'late', name: '新增节点', label: 'Event' });
    ui.controller.setData(knowledgeGraphPresentation(next)); assert.deepEqual(selected(), ['chunk', 'other', 'root']);
    click('root'); assert.deepEqual(selected(), ['root']);
    ui.svg.querySelector('[data-node-id="root"]').dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Escape' }));
    assert.deepEqual(selected(), []); assert.equal(camera(ui.svg), before);
});

test('Ctrl marquee adds nodes in screen coordinates, cancels cleanly and never pans or expands', t => {
    const ui = setup(t, { reducedMotion: true });
    ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    const root = ui.svg.querySelector('[data-node-id="root"]');
    root.dispatchEvent(new ui.dom.window.MouseEvent('click', { bubbles: true }));
    const before = camera(ui.svg), positions = ui.controller.getNodePositions();
    point(ui.dom, ui.svg, 'pointerdown', 0, 0, { ctrlKey: true });
    point(ui.dom, ui.dom.window, 'pointermove', 640, 300, { ctrlKey: true });
    assert.equal(ui.svg.querySelector('.graph-marquee').hasAttribute('hidden'), false);
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 4);
    ui.svg.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 1);
    assert.equal(root.getAttribute('aria-pressed'), 'true'); assert.equal(camera(ui.svg), before);
    assert.equal(ui.svg.querySelector('.graph-marquee').hasAttribute('hidden'), true);
    point(ui.dom, ui.svg, 'pointerdown', 0, 0, { ctrlKey: true });
    point(ui.dom, ui.dom.window, 'pointermove', 640, 300, { ctrlKey: true });
    point(ui.dom, ui.dom.window, 'pointerup', 640, 300, { ctrlKey: true });
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 4);
    assert.equal(camera(ui.svg), before); assert.deepEqual(ui.controller.getNodePositions(), positions);
    const trimmed = fixture(); trimmed.nodes = trimmed.nodes.filter(node => node.id !== 'other');
    ui.controller.setData(knowledgeGraphPresentation(trimmed)); assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 3);
    assert.equal(ui.svg.querySelector('.graph-marquee').hasAttribute('hidden'), true);
});

test('model focus arriving before the streamed nodes is retained until every requested node exists', t => {
    const ui = setup(t); ui.controller.setData(knowledgeGraphPresentation(fixture())); ui.run(2);
    assert.equal(ui.controller.focusNetwork(['neo-root', 'late']), false);
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 0, 'do not partially apply a focus request');
    const next = fixture(); next.nodes.push({ id: 'late', name: '新节点', label: 'Person' });
    next.relationships.push({ id: 'late-link', from: 'root', to: 'late', type: '连接' });
    ui.controller.setData(knowledgeGraphPresentation(next)); ui.run(30);
    assert.equal(ui.svg.querySelectorAll('.knowledge-node.selected').length, 2);
    const points = ui.controller.getNodePositions().filter(node => ['root', 'late'].includes(node.id));
    assert.ok(points.every(node => node.y === 0));
});

test('reduced motion, pause, hide and destroy stop work; captions remain plain text', t => {
    const ui = setup(t, { reducedMotion: true }), data = fixture(); data.nodes[0].name = '<img src=x onerror=bad()>正文';
    ui.controller.setData(knowledgeGraphPresentation(data)); ui.controller.setPhysics(false); ui.run(2);
    assert.equal(ui.ready(), 1, 'pausing before the first frame must still finish initial rendering');
    assert.equal(ui.frames.size, 0); assert.equal(ui.svg.querySelectorAll('img').length, 0);
    assert.match(ui.svg.querySelector('[data-node-id="root"] title').textContent, /<img/);
    ui.controller.setPhysics(true); ui.run(2); assert.ok(ui.frames.size > 0);
    ui.controller.setPhysics(false); assert.equal(ui.frames.size, 0);
    const next = fixture(); next.nodes = next.nodes.filter(node => node.id !== 'chunk');
    ui.controller.setData(knowledgeGraphPresentation(next));
    assert.equal(ui.svg.querySelector('.source-link'), null);
    ui.controller.destroy(); ui.controller.destroy(); assert.equal(ui.frames.size, 0);
    assert.equal(ui.svg.querySelectorAll('.knowledge-node,.knowledge-edge').length, 0);
});
