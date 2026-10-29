import test from 'node:test';
import assert from 'node:assert/strict';
import {isMessageExecutionActive, useExecutionStore} from '../src/features/execution/useExecutionStore.js';

test('readonly ownership is scoped to the actual message and conversation, independent of the open execution window', () => {
    const state = {sessions: {chat: {isOpen: false, activeExecutionId: 'other', executions: {
        resumed: {active: true, messageId: 'message', status: 'recovering'},
        other: {active: false, messageId: 'another', status: 'completed'},
    }}}};
    assert.equal(isMessageExecutionActive(state, 'chat', 'message'), true);
    assert.equal(isMessageExecutionActive(state, 'chat', 'another'), false);
    assert.equal(isMessageExecutionActive(state, 'different-chat', 'message'), false);
    assert.equal(isMessageExecutionActive(state, 'chat', ''), false);
});

test('bootstrap and terminal snapshots change readonly ownership without rewriting message contents', () => {
    useExecutionStore.setState({sessions: {}});
    const snapshot = {executionId: 'execution', conversationId: 'chat', assistantMessageId: 'message',
        active: true, status: 'running', runId: 'run', updatedAt: 20};
    const active = () => isMessageExecutionActive(useExecutionStore.getState(), 'chat', 'message');
    useExecutionStore.getState().upsertExecution(snapshot);
    assert.equal(active(), true);
    useExecutionStore.getState().upsertExecution({...snapshot, thinking: {paused: true, revision: 1}, updatedAt: 21});
    assert.equal(active(), true, 'pausing a running model does not permit editing its message');
    useExecutionStore.getState().upsertExecution({...snapshot, status: 'cancelling', updatedAt: 22});
    assert.equal(active(), true, 'stop must finish before message actions are released');
    useExecutionStore.getState().upsertExecution({...snapshot, active: false, status: 'cancelled', updatedAt: 23});
    assert.equal(active(), false);
    useExecutionStore.getState().upsertExecution(snapshot);
    assert.equal(active(), false, 'a stale running frame cannot reopen a finished execution');
    useExecutionStore.setState({sessions: {}});
});
