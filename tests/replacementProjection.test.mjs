import test from 'node:test';
import assert from 'node:assert/strict';
import { executionGroupingKey, projectReplacements } from '../src/components/markdown/replacementProjection.js';

test('card projections retain nested and implicit context entries, detect additions and preserve snapshot metadata', () => {
    const content = '{{cardReplace id=outer}}';
    const snapshot = { type: 'markdown', frontend: '{{cardReplace id=inner}}', snapshot: true };
    const map = { outer: snapshot, inner: '[markdown]\nHello', 'tool-result-outer': { contextStatus: { status: 'forgotten' } }, unrelated: 'unused' };
    const first = projectReplacements(content, map);
    assert.deepEqual(Object.keys(first).sort(), ['inner', 'outer', 'tool-result-outer']);
    assert.equal(first.outer, snapshot);
    assert.equal(projectReplacements(content, { ...map, unrelated: 'changed' }, first), first);
    const changed = projectReplacements(content, { ...map, inner: '[markdown]\nWorld' }, first);
    assert.notEqual(changed, first);
    const absent = projectReplacements('{{cardReplace id=missing}}', map);
    assert.equal(projectReplacements('{{cardReplace id=missing}}', { ...map, missing: 'arrived' }, absent).missing, 'arrived');
});

test('cycles and directive references are bounded while inline tool text does not invalidate grouping topology', () => {
    const map = { a: '[markdown]\n::card{ id=b }::', b: '[markdown]\n{{cardReplace id=a}}', tool: '[toolLog]\nOne' };
    assert.deepEqual(Object.keys(projectReplacements('{{cardReplace id=a}}', map)).sort(), ['a', 'b']);
    const source = '{{cardReplace id=tool}}';
    assert.equal(executionGroupingKey(source, map), executionGroupingKey(source, { ...map, tool: '[toolLog]\nTwo' }));
    assert.notEqual(executionGroupingKey(source, map), executionGroupingKey(source, { ...map, tool: '[markdown]\n' }));
});
