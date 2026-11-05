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

test('prose, media, approval, context badges and unsupported widgets remain visible boundaries', () => {
    for (const middle of ['**注意，必须确认。**', '![图](/image.png)', '```js\nexample()\n```', token('middle')]) {
        for (const value of [{type: 'customWidget', content: 'unknown widget'}, {type: 'toolApproval', content: 'approve'}, {type: 'markdown', content: '正文'},
            {...status('middle'), contextStatus: {status: 'ignored'}}]) {
            const r = {a: status('a'), b: status('b'), middle: value};
            const tree = parse([token('a'), middle, token('b')].join('\n\n'), r);
            assert.equal(tree.children.length, 3);
            assert.equal(tree.children[0].data.hProperties.processTail, 'false');
        }
    }
});

test('unresolved tool-result slots are transparent until visible content arrives, keeping every original host', () => {
    const source = [token('thought', 'thinking'), token('tool-result-call'), token('call')].join('\n\n');
    const r = {thought: {frontend: 'analysis\n[DONE]'}, call: status('call')};
    for (const value of [undefined, '', {frontend: '[markdown]\n'}]) {
        const replacement = value === undefined ? r : {...r, 'tool-result-call': value};
        const tree = parse(source, replacement);
        assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.processEntries).map((x) => x.id), ['thought', 'call']);
        assert.equal(tree.children.length, 3, 'grouping retains the missing result host and following host positions');
        assert.equal(tree.children[1].data.hProperties.processHidden, undefined, 'the result may become visible later');
    }
    const tree = parse(source, {...r, 'tool-result-call': {type: 'markdown', content: '下载产物'}});
    assert.deepEqual(JSON.parse(tree.children[0].data.hProperties.processEntries).map((x) => x.id), ['thought']);
    assert.equal(tree.children[2].data.hProperties.processHidden, undefined);
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

test('accepted guidance splits live work without needing assistant prose, keeping all original hosts', () => {
    const ids = ['thought', 'a', 'slot', 'b', 'nextThought', 'c'];
    const source = ids.map((id) => token(id, id.includes('Thought') || id === 'thought' ? 'thinking' : '')).join('\n\n');
    const guidance = (id, anchorStatusId) => ({id, anchorStatusId, kind: 'guidance', source: 'user_guidance', state: 'consumed', content: id});
    const replacement = {thought: {frontend: 'analysis\n[DONE]'}, a: status('a'),
        b: status('b', {inlineKind: 'continuation', toolCallId: null}), nextThought: {frontend: 'next'},
        c: status('c', {inlineKind: 'continuation', toolCallId: null, inlineState: 'running'})};
    const before = executionGroupingKey(source, replacement, true);
    replacement.a = status('a', {activities: [guidance('one', 'a')]});
    replacement.b = status('b', {inlineKind: 'continuation', toolCallId: null, activities: [guidance('two', 'b')]});
    assert.notEqual(executionGroupingKey(source, replacement, true), before, 'metadata-only supplement arrival invalidates grouping');
    const tree = parse(source, replacement);
    assert.deepEqual(tree.children.map((node) => node.data.hProperties.id), ids);
    const groups = tree.children.filter((node) => node.data.hProperties.processEntries);
    assert.deepEqual(groups.map((node) => JSON.parse(node.data.hProperties.processEntries).map((entry) => entry.id)),
        [['thought', 'a'], ['b'], ['nextThought', 'c']]);
    assert.deepEqual(groups.map((node) => node.data.hProperties.processTail), ['false', 'false', 'true']);
    const saved = structuredClone(replacement);
    assert.deepEqual(parse(source, saved), tree, 'live and reloaded grouping use identical metadata');
    // The continuation is no longer a disposable bridge once it owns guidance.
    const records = ['a', 'b', 'c'].map((id) => workProcessEntry(replacement, id));
    assert.equal(projectWorkProcess(records).records.some((entry) => entry.id === 'b'), true);
});

test('queued, withdrawn and agent messages do not create visible work boundaries', () => {
    const source = token('a') + '\n\n' + token('b');
    const original = {a: status('a'), b: status('b')};
    const key = executionGroupingKey(source, original, true);
    for (const extra of [{state: 'pending'}, {state: 'withdrawn'}, {state: 'consumed', source: 'agent_message'}]) {
        const replacement = {...original, a: status('a', {activities: [{id: 'g', anchorStatusId: 'a', kind: 'guidance',
            source: 'user_guidance', state: 'consumed', ...extra}]})};
        assert.equal(executionGroupingKey(source, replacement, true), key);
        assert.equal(JSON.parse(parse(source, replacement).children[0].data.hProperties.processEntries).length, 2);
    }
});

test('duplicate status references keep the first nested host without splitting later work', () => {
    const replacement = {a: status('a'), b: status('b')};
    const tree = parse(`> ${token('a')}\n\n${token('a')}\n\n${token('b')}`, replacement);
    const first = tree.children[0].children[0];
    assert.equal(first.data.hProperties.processHidden, undefined);
    assert.equal(tree.children[1].data.hProperties.processHidden, 'true');
    assert.deepEqual(JSON.parse(tree.children[2].data.hProperties.processEntries).map((entry) => entry.id), ['b']);
});

test('deduplication respects execution identity and leaves frozen cards and ordinary repeats alone', () => {
    const replacement = {a: status('same'), other: status('same', {runId: 'other-run'}),
        frozen: {...status('same'), snapshot: true}, text: {type: 'markdown', content: '可重复的正文'}};
    const tree = parse(['a', 'other', 'frozen', 'frozen', 'text', 'text'].map((id) => token(id)).join('\n\n'), replacement);
    assert.ok(tree.children.every((node) => node.data.hProperties.processHidden !== 'true'));
    assert.equal(parse(token('a') + '\n\n' + token('a'), replacement, {snapshot: true}).children.length, 2);
    assert.notEqual(executionGroupingKey(token('a'), replacement, true),
        executionGroupingKey(token('a'), {...replacement, a: status('new-status')}, true));
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
