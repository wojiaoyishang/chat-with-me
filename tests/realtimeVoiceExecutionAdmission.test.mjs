import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

import {EventName} from '../src/runtime/protocol/events.js';

const source = readFileSync(new URL('../src/features/chat/voice/useRealtimeVoiceConversation.js', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('useRealtimeVoiceConversation.js', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
let callback;
const findHandler = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'handleVoiceEvent') {
        callback = node.initializer.arguments[0].getText(parsed);
    }
    ts.forEachChild(node, findHandler);
};
findHandler(parsed);
assert.ok(callback, 'use the actual transport callback without starting a microphone or network session');

const createHandler = ({outputOnly = false} = {}) => {
    const voiceStateRef = {current: {outputOnly, status: 'listening', finalTranscript: ''}};
    const activeTurnIdsRef = {current: new Set(['already-running-execution-turn'])};
    const speechStarts = [];
    const scope = {
        EventName, voiceStateRef, activeTurnIdsRef,
        mutedRef: {current: false},
        terminalVoiceTurnIdsRef: {current: new Set()},
        startedTurnMessagesRef: {current: new Map([['new-durable-turn', 'assistant-message']])},
        speechStateRef: {current: {status: 'idle'}},
        generateUUID: () => 'utterance-id',
        isSpeakingState: (speech) => ['loading', 'playing', 'paused'].includes(speech?.status),
        armStreamingSpeechForTurn: (...args) => speechStarts.push(args),
        patchState: (patch) => {
            const updates = typeof patch === 'function' ? patch(voiceStateRef.current) : patch;
            voiceStateRef.current = {...voiceStateRef.current, ...updates};
        },
    };
    const handle = new Function(...Object.keys(scope), `return (${callback});`)(...Object.values(scope));
    return {handle, voiceStateRef, activeTurnIdsRef, speechStarts};
};

for (const action of ['execution_interrupt', 'execution_guidance']) {
    for (const outputOnly of [false, true]) {
        test(`${action} retains accepted guidance and returns to ${outputOnly ? 'text input' : 'listening'} without tracking a synthetic turn`, () => {
            const {handle, voiceStateRef, activeTurnIdsRef, speechStarts} = createHandler({outputOnly});
            handle({event: EventName.VOICE_TRANSCRIPT_FINAL, payload: {text: '继续核对两个来源之间的关联'}});
            assert.equal(voiceStateRef.current.status, 'thinking');
            handle({event: EventName.VOICE_TURN_COMMITTED, turn_id: 'synthetic-guidance-turn', payload: {
                admissionAction: action, executionId: 'active-execution',
            }});
            assert.equal(voiceStateRef.current.status, outputOnly ? 'text_input' : 'listening');
            assert.equal(voiceStateRef.current.finalTranscript, '继续核对两个来源之间的关联');
            assert.equal(voiceStateRef.current.recentUtterance.text, '继续核对两个来源之间的关联');
            assert.deepEqual([...activeTurnIdsRef.current], ['already-running-execution-turn']);
            assert.deepEqual(speechStarts, []);
        });
    }
}

test('a newly admitted durable voice turn still tracks its lifecycle and arms its real assistant response', () => {
    const {handle, voiceStateRef, activeTurnIdsRef, speechStarts} = createHandler();
    handle({event: EventName.VOICE_TURN_COMMITTED, turn_id: 'new-durable-turn', payload: {admissionAction: 'proceed'}});
    assert.equal(voiceStateRef.current.status, 'thinking');
    assert.equal(activeTurnIdsRef.current.has('new-durable-turn'), true);
    assert.deepEqual(speechStarts, [['new-durable-turn', 'assistant-message']]);
});
