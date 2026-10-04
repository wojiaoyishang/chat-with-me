import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';
const source = fs.readFileSync('src/features/chat/voice/useRealtimeVoiceConversation.js', 'utf8');
let callback;
function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator' && node.id.name === 'playbackCursor') callback = node.init.arguments[0];
    Object.values(node).forEach((value) => (Array.isArray(value) ? value.forEach(visit) : visit(value)));
}
visit(parse(source, { sourceType: 'module', plugins: ['jsx'] }));
const build = new Function(
    'speechStateRef',
    'getStreamingSpeechSnapshot',
    'activeAssistantMessageIdRef',
    source.slice(callback.body.start + 1, callback.body.end - 1),
);
const segments = [
    { id: 'message:tts:0', text: '第一句。' },
    { id: 'message:tts:1', text: '未完成的第二句。' },
];
let cursor = build(
    { current: { messageId: 'message', segments, currentSegmentPosition: 1 } },
    () => ({ finalized: false }),
    { current: 'message' },
);
assert.deepEqual(cursor.completedSegments, ['第一句。']);
assert.equal(cursor.segmentText, '未完成的第二句。');
assert.equal(cursor.messageFinalized, false);
cursor = build(
    { current: { messageId: 'message', segments, currentSegmentPosition: 0 } },
    () => ({ finalized: false }),
    { current: 'message' },
);
assert.deepEqual(cursor.completedSegments, []);
cursor = build(
    { current: { messageId: 'message', segments, playbackSegmentPosition: 1 } },
    () => ({ finalized: false }),
    { current: 'message' },
);
assert.deepEqual(
    cursor.completedSegments,
    segments.map((s) => s.text),
);
assert.equal(cursor.messageFinalized, false);
console.log('PASS: current segment excluded, zero heard, caught-up streaming prefix remains non-final');
