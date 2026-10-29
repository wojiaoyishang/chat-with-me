import test from 'node:test';
import assert from 'node:assert/strict';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {remarkCardReplace} from '../src/components/markdown/remarkDirectiveToComponent.js';
import {remarkWorkProcess} from '../src/components/markdown/remarkWorkProcess.js';
import {executionGroupingKey} from '../src/components/markdown/replacementProjection.js';
import {projectWorkProcess, workProcessEntry} from '../src/features/execution/workProcessModel.js';

const token = (id, type = '') => `{{cardReplace id=${id}${type ? ` type=${type}` : ''}}}`;
const status = (id, extra = {}) => ({type: 'executionStatus', content: JSON.stringify({
    conversationId: 'chat', runId: 'run', executionId: 'execution', statusId: id,
    inlineKind: 'tool', toolCallId: id, inlineState: 'completed', label: id, ...extra,
})});
const parse = (source, replacement, extra = {}) => {
    const p = unified().use(remarkParse).use(remarkCardReplace).use(remarkWorkProcess, {replacement, ...extra});
    return p.runSync(p.parse(source));
};

test('different tool families interleaved with reasoning share a stable anchor without altering source data', () => {
    const r = {a: {frontend: 'first\n[DONE]'}, b: status('b', {toolNames: ['read']}),
        c: {frontend: 'next\n[DONE]'}, d: status('d', {toolNames: ['write']}),
        host: {frontend: '[executionWindowTool]\ndetails'}};
    const source = [token('a', 'thinking'), token('b'), token('host'), token('c', 'thinking'), token('d')].join('\n\n');
    const before = structuredClone(r);
    const tree = parse(source, r);
    assert.equal(tree.children[0].data.hProperties.id, 'a');
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.processEntries).map((x) => x.id), ['a', 'b', 'c', 'd']);
    assert.equal(tree.children[0].data.hProperties.processTail, 'true');
    assert.deepEqual(r, before);
    assert.match(source, /id=c/);
});

test('prose, media, approval, context badges and unknown replacements remain visible boundaries', () => {
    for (const middle of ['**注意，必须确认。**', '![图](/image.png)', '```js\nexample()\n```', token('middle')]) {
        for (const value of [undefined, {type: 'toolApproval', content: 'approve'}, {type: 'markdown', content: '正文'},
            {...status('middle'), contextStatus: {status: 'ignored'}}]) {
            const r = {a: status('a'), b: status('b'), middle: value};
            const tree = parse([token('a'), middle, token('b')].join('\n\n'), r);
            assert.equal(tree.children.length, 3);
            assert.equal(tree.children[0].data.hProperties.processTail, 'false');
        }
    }
});

test('different runs and frozen snapshots never join a live work process', () => {
    const source = [token('a'), token('b')].join('\n\n');
    assert.equal(parse(source, {a: status('a'), b: status('b', {runId: 'other'})}).children.length, 2);
    const frozen = {...status('b'), snapshot: true};
    assert.equal(parse(source, {a: status('a'), b: frozen}).children.length, 2);
    assert.equal(parse(source, {a: status('a'), b: status('b')}, {renderSurface: 'execution_window'}).children.length, 2);
});

test('only grouping topology invalidates Markdown syntax, not fast reasoning or tool progress deltas', () => {
    const source = token('a', 'thinking') + '\n\n' + token('b');
    const r = {a: {frontend: 'x', workProcess: {runId: 'run'}}, b: status('b')};
    const key = executionGroupingKey(source, r, true);
    for (let i = 0; i < 1000; i++) {
        const next = {...r, a: {...r.a, frontend: 'x'.repeat(i + 1)}, b: status('b', {action: `step ${i}`, inlineState: 'running'})};
        assert.equal(executionGroupingKey(source, next, true), key);
    }
    assert.notEqual(executionGroupingKey(source, {...r, b: {...r.b, contextStatus: {status: 'ignored'}}}, true), key);
});

test('finished reasoning does not finish a running turn; late continuations do not keep it alive forever', () => {
    const r = {a: {frontend: 'x\n[DONE]'}, b: status('b'),
        bridge: status('bridge', {inlineKind: 'continuation', toolCallId: null, inlineState: 'running'}), c: status('c')};
    const records = [workProcessEntry(r, 'a', 'thinking'), ...['b', 'bridge', 'c'].map((id) => workProcessEntry(r, id))];
    const live = {conversationId: 'chat', runId: 'run', executionId: 'execution', active: true, status: 'running'};
    assert.equal(projectWorkProcess(records, {live, isStreaming: true, tail: true}).state, 'running');
    const done = projectWorkProcess(records, {live: {...live, active: false, status: 'completed'}, tail: true});
    assert.equal(done.state, 'completed');
    assert.equal(done.calls.length, 2);
    assert.equal(done.records.some((entry) => entry.id === 'bridge'), false);
});

test('parallel running calls, failures and user pause retain distinct outcomes', () => {
    const r = {a: status('a', {inlineState: 'running'}), b: status('b', {inlineState: 'failed'}), c: status('c', {inlineState: 'running'})};
    const records = Object.keys(r).map((id) => workProcessEntry(r, id));
    const live = {conversationId: 'chat', runId: 'run', executionId: 'execution', active: true, status: 'running', thinking: {paused: true}};
    const model = projectWorkProcess(records, {live, isStreaming: true, tail: true});
    assert.equal(model.state, 'paused');
    assert.equal(model.failures, 1);
    assert.equal(model.target.toolCallId, 'c');
});

test('an unresolved final failure or cancelled reasoning is never reported as success', () => {
    const r = {failed: status('failed', {inlineState: 'failed'}),
        thought: {frontend: 'partial\n[DONE]', workProcess: {kind: 'reasoning', state: 'cancelled'}}};
    assert.equal(projectWorkProcess([workProcessEntry(r, 'failed')], {tail: true}).state, 'failed');
    assert.equal(projectWorkProcess([workProcessEntry(r, 'thought', 'thinking')], {tail: true}).state, 'cancelled');
});
