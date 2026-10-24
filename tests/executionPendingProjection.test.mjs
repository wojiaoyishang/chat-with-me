import test from 'node:test';
import assert from 'node:assert/strict';
import {useExecutionStore} from '../src/features/execution/useExecutionStore.js';
import {isVisibleExecutionGuidance, isQueuedExecutionGuidance} from '../src/features/execution/executionStatusModel.js';
import {clearAcceptedGuidanceDraft} from '../src/features/chat/composer/pendingGuidance.js';

const snapshot = (overrides = {}) => ({executionId: 'execution', conversationId: 'chat', active: true,
    status: 'running', runId: 'run', updatedAt: 100, activities: [], ...overrides});
const current = () => useExecutionStore.getState().sessions.chat.executions.execution;
const reset = () => useExecutionStore.setState({sessions: {}});

test('rehydrated server queue survives partial inline projections and explicit empty snapshots clear it', () => {
    reset();
    const pending = {id: 'one', content: '查看附件', attachments: [{serverId: 'image', name: '图片.png'}]};
    useExecutionStore.getState().upsertExecution(snapshot({pendingGuidance: [pending]}));
    useExecutionStore.getState().upsertExecution(snapshot({label: '工具已完成'}));
    assert.deepEqual(current().pendingGuidance, [pending]);
    useExecutionStore.getState().upsertExecution(snapshot({updatedAt: 102, pendingGuidance: []}));
    assert.deepEqual(current().pendingGuidance, []);
});

test('a delayed snapshot cannot resurrect a supplement removed by a newer server projection', () => {
    reset();
    useExecutionStore.getState().upsertExecution(snapshot({pendingGuidance: [{id: 'one'}]}));
    useExecutionStore.getState().upsertExecution(snapshot({updatedAt: 103, pendingGuidance: []}));
    useExecutionStore.getState().upsertExecution(snapshot({updatedAt: 101, pendingGuidance: [{id: 'one'}]}));
    assert.deepEqual(current().pendingGuidance, []);
});

test('pending queue is independent of the bounded activity history and retains terminal unconsumed items', () => {
    reset();
    const pending = Array.from({length: 120}, (_, id) => ({id: String(id), content: `补充${id}`}));
    useExecutionStore.getState().upsertExecution(snapshot({pendingGuidance: pending,
        activities: Array.from({length: 80}, (_, id) => ({id: `activity-${id}`, kind: 'tool'}))}));
    useExecutionStore.getState().upsertExecution(snapshot({active: false, status: 'failed', updatedAt: 105, pendingGuidance: pending}));
    assert.equal(current().pendingGuidance.length, 120);
    assert.deepEqual(current().pendingGuidance.map(item => item.id), pending.map(item => item.id));
});

test('a pending receipt confirms an uncertain rewrite without losing the original attachment consent', () => {
    reset();
    const source = {id: 'old', kind: 'guidance', source: 'user_guidance', state: 'withdrawn', canRewrite: true,
        content: '原补充', attachments: [{serverId: 'one', name: '教材.png'}], visionAttachmentIds: ['one']};
    const execution = snapshot({activities: [source]});
    assert.equal(useExecutionStore.getState().openGuidanceEditor(execution, {guidanceId: 'old'}), true);
    let session = useExecutionStore.getState().sessions.chat;
    const key = session.guidanceEditor.draftKey;
    assert.deepEqual(session.guidanceDrafts[key].attachments, source.attachments);
    assert.notEqual(session.guidanceDrafts[key].attachments, source.attachments);
    assert.deepEqual(session.guidanceDrafts[key].visionAttachmentIds, ['one']);
    useExecutionStore.getState().patchGuidanceDraft('chat', key, {state: 'uncertain', submissionId: 'new'});
    useExecutionStore.getState().upsertExecution({...execution, updatedAt: 106,
        pendingGuidance: [{id: 'new', content: '修改后', attachments: source.attachments}]});
    session = useExecutionStore.getState().sessions.chat;
    assert.equal(session.guidanceEditor, null);
    assert.equal(session.guidanceDrafts[key].state, 'sent');
});

test('only received user guidance belongs in the transcript; widget feedback keeps its own lifecycle', () => {
    for (const state of ['pending', 'submitting', 'removed']) {
        const activity = {kind: 'guidance', source: 'user_guidance', state};
        assert.equal(isQueuedExecutionGuidance(activity), true);
        assert.equal(isVisibleExecutionGuidance(activity), false);
    }
    assert.equal(isVisibleExecutionGuidance({source: 'user_guidance', state: 'consumed'}), true);
    assert.equal(isVisibleExecutionGuidance({source: 'widget_response', state: 'pending'}), true);
    assert.equal(isQueuedExecutionGuidance({source: 'widget_response', state: 'pending'}), false);
});

test('a late acknowledgement clears only the submitted attachment version and preserves newer image consent', () => {
    const file = {serverId: 'image', name: '图片.png', fileType: 'image', visionEnabled: true};
    const submitted = {content: '原补充', attachments: [file]};
    const revised = {...file, visionEnabled: false};
    const remaining = clearAcceptedGuidanceDraft({content: '新草稿', attachments: [revised, {serverId: 'new', name: '新附件.md'}]}, submitted);
    assert.equal(remaining.content, '新草稿');
    assert.deepEqual(remaining.attachments, [revised, {serverId: 'new', name: '新附件.md'}]);
    assert.deepEqual(clearAcceptedGuidanceDraft(submitted, submitted), {content: '', attachments: []});
});
