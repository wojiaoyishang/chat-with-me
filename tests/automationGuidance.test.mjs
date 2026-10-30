import test from 'node:test';
import assert from 'node:assert/strict';
import {executionGuidanceOriginLabel, getExecutionGuidance, isQueuedExecutionGuidance, isUserExecutionGuidance, isVisibleExecutionGuidance} from '../src/features/execution/executionStatusModel.js';
import {useExecutionStore} from '../src/features/execution/useExecutionStore.js';

test('automatic inputs are visible read-only supplements, not editable composer drafts', () => {
    const activity = {id: 'automation-event', kind: 'guidance', source: 'automation', state: 'pending', content: 'event'};
    assert.equal(isUserExecutionGuidance(activity), false);
    assert.equal(isQueuedExecutionGuidance(activity), false);
    assert.equal(isVisibleExecutionGuidance(activity), true);
    assert.equal(isVisibleExecutionGuidance({...activity, state: 'consumed'}), true);
    assert.equal(isVisibleExecutionGuidance({...activity, state: 'responded'}), true);
    assert.equal(isVisibleExecutionGuidance({...activity, state: 'removed'}), false);
    assert.equal(isVisibleExecutionGuidance({...activity, source: 'agent_message'}), false);
    const execution = {executionId: 'automatic-execution', conversationId: 'automatic-chat', active: true, status: 'running', activities: [activity]};
    useExecutionStore.getState().upsertExecution(execution);
    assert.equal(useExecutionStore.getState().openGuidanceEditor(execution, {guidanceId: activity.id, mode: 'correction'}), false);
    assert.equal(useExecutionStore.getState().sessions[execution.conversationId].guidanceEditor, null);
    assert.equal(isQueuedExecutionGuidance({...activity, source: 'user_guidance'}), true);
});

test('bot supplements preserve their anchor and source labels from persisted snapshots', () => {
    const activity = {id: 'bot-input', kind: 'guidance', source: 'automation', state: 'responded',
        anchorStatusId: 'anchor', content: '群消息', displayOrigin: {platform: 'qq', platformLabel: 'QQ', conversationType: 'group',
            contactName: '学习组', groupId: 'group-id', senderName: '小明'}};
    const snapshot = JSON.parse(JSON.stringify({executionId: 'run', statusId: 'anchor', activities: [activity]}));
    assert.deepEqual(getExecutionGuidance(snapshot).activities, [activity]);
    assert.equal(executionGuidanceOriginLabel(activity), 'QQ · 群组：学习组 · 发送者：小明');
    assert.equal(executionGuidanceOriginLabel({...activity, displayOrigin: {platform: 'wechat', platformLabel: '微信', contactId: 'peer'}}), '微信');
    assert.equal(executionGuidanceOriginLabel({...activity, displayOrigin: {platform: 'dingtalk', platformLabel: '钉钉', contactName: '同事'}}), '钉钉 · 联系人：同事');
    assert.equal(executionGuidanceOriginLabel({...activity, displayOrigin: {platform: 'enterprise_chat', platformLabel: '企业通讯', contactName: '同事'}}), '企业通讯 · 联系人：同事');
    assert.equal(executionGuidanceOriginLabel({...activity, displayOrigin: {platform: 'enterprise_chat', contactName: '同事'}}), 'enterprise_chat · 联系人：同事');
    assert.deepEqual(getExecutionGuidance({...snapshot, statusId: 'other'}).activities, []);
});
