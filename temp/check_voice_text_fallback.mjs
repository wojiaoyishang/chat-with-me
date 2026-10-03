import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync('src/features/chat/voice/useRealtimeVoiceConversation.js', 'utf8').replace(/^import[\s\S]*?;\r?\n/gm, '').replace('export function useRealtimeVoiceConversation', 'function useRealtimeVoiceConversation');
let state, refs = [], refIndex = 0, effects = [], handler;
const started = [], finalized = [], composer = [];
const context = {
    useCallback: fn => fn,
    useState: init => { state ??= init(); return [state, next => { state = typeof next === 'function' ? next(state) : next; }]; },
    useRef: value => refs[refIndex++] ??= {current:value},
    useEffect: fn => effects.push(fn),
    useWebSocket: () => ({connectionId:'control', isConnected:true}),
    createSilentWaveformLevels: () => [],
    EventName: new Proxy({}, {get: (_, name) => name}),
    emitEvent: event => composer.push(event),
    onEvent: () => ({then: fn => { handler = fn; return () => {}; }}),
    requestMicrophoneStream: async () => { throw Error('no microphone'); },
    toast: {warning() {}},
    setTimeout, clearTimeout, console,
};
vm.createContext(context);
vm.runInContext(source + '\nglobalThis.hook = useRealtimeVoiceConversation;', context);
function render(textInputEnabled = false) {
    refIndex = 0; effects = [];
    const hook = context.hook({conversationId:'conversation', textInputEnabled,
        speechState: {status:'idle'}, beginStreamingSpeech: args => started.push(args),
        requestStreamingSpeechFinalize: args => finalized.push(args),
        cancelStreamingSpeech() {}, cancelActiveSpeech() {}});
    effects.forEach(fn => fn());
    return hook;
}
let voice = render();
await assert.rejects(voice.start({conversationId:'conversation', model:'model', composerStatus:'normal', ttsEngine:'selected-engine'}), /no microphone/);
voice = render();
assert.equal(voice.state.open, true);
assert.equal(voice.state.outputOnly, true);
assert.equal(voice.state.status, 'text_input');
handler({event:'TURN_STARTED', payload:{messageId:'message'}, eventTurnId:'turn'});
assert.equal(started.length, 1);
assert.equal(started[0].messageId, 'message');
assert.equal(started[0].engine, 'selected-engine');
handler({event:'TURN_COMPLETED', payload:{messageId:'message'}, eventTurnId:'turn'});
assert.equal(finalized.length, 1);
assert.equal(composer.at(-1).payload.value, 'normal');
voice = render(true);
voice.toggleMute();
voice = render(true);
assert.equal(voice.state.muted, true);
await voice.stop();
voice = render();
assert.equal(voice.state.open, false);
handler({event:'TURN_STARTED', payload:{messageId:'after-hangup'}, eventTurnId:'after'});
assert.equal(started.length, 1);
console.log('PASS: microphone failure retains text/3D entry, typed turn arms streaming TTS, terminal flush and hangup stops auto TTS');
