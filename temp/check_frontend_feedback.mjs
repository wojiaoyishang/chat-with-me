import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createSpeechFeedbackDispatcher, parseFrontendFeedback } from '../src/features/chat/speech/frontendFeedback.js';

const url = (path) => pathToFileURL(`${process.cwd()}/${path}`).href;
const source = fs
    .readFileSync('src/features/chat/ui/message/utils/speechContent.js', 'utf8')
    .replace('@/components/markdown/replacementProtocol.js', url('src/components/markdown/replacementProtocol.js'))
    .replace('@/features/chat/speech/frontendFeedback.js', url('src/features/chat/speech/frontendFeedback.js'));
const { getSpeakableSegments, getStreamingSpeakableSegments } = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
);
const toolid = '12345678-1234-1234-1234-123456789abc';
const marker = `[FRONTEND_FEEDBACK ID:${toolid} ONCE:true TRIGGER:next_speech_start]`;
assert.equal(parseFrontendFeedback(marker)[0].once, true);
const message = {
    content: '前一句。{{cardReplace id="call"}}后一句。再一句。',
    extraInfo: { replace: { call: { frontend: `[toolCalling]\n${marker}\n工具内部不可朗读` } } },
};
const segments = getSpeakableSegments(message, 'message');
assert.deepEqual(
    segments.map((item) => item.text),
    ['前一句。', '后一句。', '再一句。'],
);
assert.equal(segments[0].feedbackToolIds, undefined);
assert.deepEqual(segments[1].feedbackToolIds, [toolid]);
assert.equal(segments[2].feedbackToolIds, undefined);
const stream = getStreamingSpeakableSegments(message, 'message');
assert.deepEqual(
    stream.map((item) => [item.text, item.feedbackToolIds]),
    segments.map((item) => [item.text, item.feedbackToolIds]),
);
const unfinished = getStreamingSpeakableSegments(
    { ...message, content: '前一句。{{cardReplace id="call"}}还没说完' },
    'message',
);
assert.equal(unfinished.length, 1);
assert.equal(unfinished[0].feedbackToolIds, undefined);
const calls = [];
const dispatch = createSpeechFeedbackDispatcher((call) => {
    calls.push(call);
    return Promise.resolve({ success: true });
});
const playback = { conversationId: 'conversation', messageId: 'message', requestId: 'speech', segment: segments[1] };
dispatch({ ...playback, segment: segments[0] });
assert.equal(calls.length, 0);
dispatch(playback);
dispatch(playback); // pause/resume and duplicate onplaying
assert.equal(calls.length, 1);
assert.deepEqual(calls[0].payload, { msgid: 'message', toolid });
dispatch({ ...playback, requestId: 'replay' });
assert.equal(calls.length, 2); // server decides once vs unlimited
const manual = getSpeakableSegments(
    { ...message, extraInfo: { replace: { call: { frontend: marker.replace('next_speech_start', 'manual') } } } },
    'message',
);
assert.ok(manual.every((segment) => !segment.feedbackToolIds));
const nested = getSpeakableSegments(
    {
        content: '{{cardReplace id="call"}}末尾。',
        extraInfo: {
            replace: {
                call: {
                    frontend: '[toolCalling]\n{{cardReplace id="first"}}\n' + marker + '\n{{cardReplace id="second"}}',
                },
                first: { frontend: '[markdown tts]前一段。' },
                second: { frontend: '[markdown tts]后一段。' },
            },
        },
    },
    'nested',
);
assert.deepEqual(
    nested.map((item) => item.text),
    ['前一段。', '后一段。', '末尾。'],
);
assert.equal(nested[0].feedbackToolIds, undefined);
assert.deepEqual(nested[1].feedbackToolIds, [toolid]);
assert.equal(nested[2].feedbackToolIds, undefined);
console.log('frontend feedback speech anchor checks passed');
