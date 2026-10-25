import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { compareOrderedKeys, createOrderedGraphLayout, orderedNodeInfo } from '../src/features/knowledge/orderedGraphLayout.js';

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
});
