import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeLiveMessageWithSnapshot} from '../src/features/chat/page/utils/liveMessageReconcile.js';
import {applyMessageStreamOperations} from '../src/features/chat/page/utils/messageStreamBatch.js';
import {reconcileAppendedHistory} from '../src/features/chat/page/utils/appendedHistory.js';

test('late metadata and checkpoints preserve all streamed prose and concurrent tool results', () => {
    const registerComponent = () => {};
    let messages = {answer: {role: 'assistant', content: '', extraInfo: {replace: {}}, registerComponent}};
    const operations = [];
    for (let i = 0; i < 1000; i++) {
        operations.push({event: 'message.content.delta', value: {answer: `正文${i}。`}});
        if (i % 100 === 0) operations.push({event: 'message.replacement.set', value: {answer: {[`tool${i}`]: {frontend: '结果', state: 'completed'}}}});
    }
    messages = applyMessageStreamOperations(messages, operations);
    const expected = messages.answer.content;
    const snapshot = {content: '正文0。', readonly: false, extraInfo: {replace: {analysis: {frontend: '分析完成'}},
        bodyForwarding: {revision: 2, total: 1, counts: {sending: 1}}}};
    const merged = mergeLiveMessageWithSnapshot(snapshot, messages.answer);
    assert.equal(merged.content, expected);
    assert.equal(Object.keys(merged.extraInfo.replace).length, 11);
    assert.equal(merged.registerComponent, registerComponent);
    assert.equal(merged.extraInfo.bodyForwarding.counts.sending, 1);
});

test('explicit edits remain authoritative, including clearing text and replacing a card body', () => {
    const merged = mergeLiveMessageWithSnapshot({content: '', extraInfo: {replace: {tool: {frontend: '短'}}}},
        {content: '旧正文', extraInfo: {replace: {tool: {frontend: '短但更长的旧结果'}}}}, {preserveStream: false});
    assert.equal(merged.content, '');
    assert.equal(merged.extraInfo.replace.tool.frontend, '短');
});

test('status-first creation, early deltas, append hydration and completion keep one visible full message', () => {
    const video = {role: 'assistant', content: '<video src="a.mp4" />', messages: [], getComponent: () => {}};
    let messages = {a: video, answer: {extraInfo: {bodyForwarding: {revision: 5, total: 1, counts: {sending: 1}}}}};
    messages = applyMessageStreamOperations(messages, [{event: 'message.content.delta', value: {answer: '正文完整结尾'}}]);
    const appended = reconcileAppendedHistory({currentMessages: messages, currentOrder: ['a'],
        snapshot: {branchOrder: ['a', 'answer'], messagesOrder: ['a', 'answer'], appendFrom: 'a', messages: {
            a: {...video, messages: ['answer']},
            answer: {role: 'assistant', prevMessage: 'a', content: '正文', messages: [], extraInfo: {replace: {tool: {frontend: '执行完毕'}}}},
        }}});
    appended.messages.answer = mergeLiveMessageWithSnapshot({readonly: false, extraInfo: {bodyForwarding: {revision: 6, total: 1, counts: {accepted: 1}}}}, appended.messages.answer);
    assert.deepEqual(appended.order, ['a', 'answer']);
    assert.equal(appended.messages.answer.content, '正文完整结尾');
    assert.equal(appended.messages.answer.role, 'assistant');
    assert.equal(appended.messages.answer.extraInfo.replace.tool.frontend, '执行完毕');
    assert.equal(appended.messages.answer.extraInfo.bodyForwarding.counts.accepted, 1);
    assert.equal(appended.messages.a.getComponent, video.getComponent);
});
