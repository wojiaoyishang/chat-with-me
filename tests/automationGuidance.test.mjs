import test from 'node:test';
import assert from 'node:assert/strict';
import {isQueuedExecutionGuidance, isUserExecutionGuidance, isVisibleExecutionGuidance} from '../src/features/execution/executionStatusModel.js';
import {useExecutionStore} from '../src/features/execution/useExecutionStore.js';

test('automatic inputs stay in the execution window without composer drafts or transcript bubbles', () => {
    const activity = {id: 'automation-event', kind: 'guidance', source: 'automation', state: 'pending', content: 'event'};
    assert.equal(isUserExecutionGuidance(activity), false);
    assert.equal(isQueuedExecutionGuidance(activity), false);
    assert.equal(isVisibleExecutionGuidance(activity), false);
    assert.equal(isVisibleExecutionGuidance({...activity, state: 'consumed'}), false);
    const execution = {executionId: 'automatic-execution', conversationId: 'automatic-chat', active: true, status: 'running', activities: [activity]};
    useExecutionStore.getState().upsertExecution(execution);
    assert.equal(useExecutionStore.getState().openGuidanceEditor(execution, {guidanceId: activity.id, mode: 'correction'}), false);
    assert.equal(useExecutionStore.getState().sessions[execution.conversationId].guidanceEditor, null);
    assert.equal(isQueuedExecutionGuidance({...activity, source: 'user_guidance'}), true);
});
