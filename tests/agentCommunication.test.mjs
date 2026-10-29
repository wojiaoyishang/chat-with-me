import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {getExecutionGuidance, isVisibleExecutionGuidance} from '../src/features/execution/executionStatusModel.js';
import {useExecutionStore} from '../src/features/execution/useExecutionStore.js';

await build({entryPoints: ['src/features/execution/AgentMessageRecord.jsx'], bundle: true, packages: 'external',
    jsx: 'automatic', format: 'esm', platform: 'node', outfile: 'temp/agent-message-record-test.mjs'});
const {default: Record} = await import('../temp/agent-message-record-test.mjs');
const message = {id: 'receipt', senderId: 'agent-a', senderName: '资料分析', recipientId: 'agent-b', recipientName: '写作',
    content: '<tool>资料供参考</tool>'};
const activity = {id: 'agent-message-receipt', kind: 'guidance', source: 'agent_message', state: 'pending',
    anchorStatusId: 'status', content: message.content, agentMessage: message};

test('coordination records show provenance and delivery state without user controls', () => {
    const html = renderToStaticMarkup(React.createElement(Record, {activity}));
    assert.match(html, /资料分析/);
    assert.match(html, /写作/);
    assert.match(html, /等待安全边界接收/);
    assert.match(html, /&lt;tool&gt;/);
    assert.doesNotMatch(html, /<button|删除|重写|用户补充/);
    assert.match(renderToStaticMarkup(React.createElement(Record, {activity: {...activity, state: 'injected'}})), /已接收/);
    assert.match(renderToStaticMarkup(React.createElement(Record, {activity: {...activity,
        agentMessage: {...message, deferredReason: 'wake_hop_limit'}}})), /达到自动唤醒上限/);
});

test('coordination never becomes an inline user guidance bubble after refresh', () => {
    assert.equal(isVisibleExecutionGuidance(activity), false);
    assert.equal(isVisibleExecutionGuidance({...activity, state: 'consumed'}), false);
    assert.deepEqual(getExecutionGuidance({statusId: 'status', activities: [activity]}).activities, []);
    const user = {...activity, id: 'user', source: 'user_guidance', state: 'consumed'};
    assert.deepEqual(getExecutionGuidance({statusId: 'status', activities: [activity, user]}).activities, [user]);
});

test('the user guidance editor refuses pending and received peer messages', () => {
    for (const state of ['pending', 'consumed']) {
        useExecutionStore.setState({sessions: {}});
        const execution = {conversationId: 'chat', executionId: 'execution', status: 'running', active: true,
            activities: [{...activity, state, canRewrite: true, canEdit: true}]};
        assert.equal(useExecutionStore.getState().openGuidanceEditor(execution,
            {guidanceId: activity.id, mode: 'rewrite'}), false);
    }
});
