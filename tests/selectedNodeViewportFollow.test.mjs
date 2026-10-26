import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createSelectedNodeViewportFollow, createLocalDragInfluence } from '../src/features/knowledge/selectedNodeViewportFollow.js';

const bounds = { left: 0, top: 0, right: 640, bottom: 300 };
const camera = () => ({ x: 0, y: 0, scale: 1 });

test('selected physical movement pans only at edges, preserves scale and does not recenter an idle selection', () => {
    const follow = createSelectedNodeViewportFollow(), view = camera(), node = { id: 'chosen', x: 300, y: 150, radius: 20 };
    follow.select(node.id);
    const update = () => follow.update({ node, camera: view, bounds });
    assert.equal(update(), false);
    node.x += 10; assert.equal(update(), false);
    node.x = 610; assert.equal(update(), true);
    assert.ok(view.x < 0 && view.x >= -18, 'a buffered edge gets a gentle correction');
    assert.equal(view.scale, 1);
    node.x = 1000; update();
    assert.ok(node.x + view.x + node.radius <= bounds.right, 'large steps still keep the node visible');
    for (let i = 0; i < 80; i++) update();
    const settled = { ...view }; update();
    assert.deepEqual(view, settled, 'camera correction settles without an idle animation loop');
});

test('manual stop survives later node movement and data updates; an explicit new selection can rearm', () => {
    const follow = createSelectedNodeViewportFollow(), view = camera(), node = { id: 'chosen', x: 610, y: 150, radius: 20 };
    follow.select(node.id); follow.update({ node, camera: view, bounds });
    follow.stop(); node.x = 900;
    assert.equal(follow.update({ node, camera: view, bounds }), false);
    assert.deepEqual(view, camera());
    follow.select(node.id); follow.update({ node, camera: view, bounds }); node.x += 10;
    assert.equal(follow.update({ node, camera: view, bounds }), true);
    const paused = { ...view }; node.x += 100;
    assert.equal(follow.update({ node, camera: view, bounds, enabled: false }), false);
    assert.deepEqual(view, paused);
});

test('held pointer gestures do not compete with camera following and tracking respects control bounds', () => {
    const follow = createSelectedNodeViewportFollow(), view = camera(), node = { id: 'chosen', x: 310, y: 230, radius: 20 };
    const viewport = { ...bounds, bottom: 250 };
    follow.select(node.id); follow.update({ node, camera: view, bounds: viewport });
    node.y += 15;
    assert.equal(follow.update({ node, camera: view, bounds: viewport, blocked: true }), false);
    assert.equal(view.y, 0);
    node.y += 15; follow.update({ node, camera: view, bounds: viewport });
    assert.ok(node.y + view.y + node.radius <= 250);
});

test('drag heat reaches nearby neighbors while distant components keep their velocity at zero', () => {
    const local = createLocalDragInfluence(), dragged = { id: 'a', x: 0, y: 0 },
        neighbor = { id: 'b', x: 160, y: 0, vx: 2, vy: -3 },
        distant = { id: 'c', x: 1200, y: 0, vx: 50, vy: -10 },
        ordered = { id: 'time', x: 1600, y: 0, ordered: {}, vx: 1, vy: 1 }, nodes = [dragged, neighbor, distant, ordered];
    local.begin(dragged, nodes, [{ source: 'a', target: 'b' }]); local.tick(nodes);
    assert.deepEqual([neighbor.vx, neighbor.vy], [2, -3]);
    assert.deepEqual([distant.vx, distant.vy], [0, 0]);
    assert.deepEqual([ordered.vx, ordered.vy], [1, 1], 'ordered geometry remains owned by its existing layout');
    dragged.x = 1100; distant.vx = 4; local.update(dragged, nodes); local.tick(nodes);
    assert.equal(distant.vx, 4, 'new nearby nodes still respond to a moved drag');
    local.clear(); neighbor.vx = 5; local.tick(nodes); assert.equal(neighbor.vx, 5);
});

test('chat and standalone graph helpers share the same follow and local-drag implementation', async () => {
    const chat = await readFile(new URL('../src/features/knowledge/selectedNodeViewportFollow.js', import.meta.url), 'utf8');
    const standalone = await readFile(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-viewport-follow.js', import.meta.url), 'utf8');
    assert.ok(standalone.replaceAll('\r\n', '\n').includes(chat.replaceAll('\r\n', '\n').replaceAll('export function ', 'function ').trim()));
});
