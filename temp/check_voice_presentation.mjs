import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';
function callback(file, name, occurrence = 0) {
    const text = fs.readFileSync(file, 'utf8');
    const tree = parse(text, { sourceType: 'module', plugins: ['jsx'] });
    let found;
    function visit(node) {
        if (!node || typeof node !== 'object' || found) return;
        if (node.type === 'CallExpression' && node.callee.name === name) {
            if (occurrence-- === 0) found = node.arguments[0];
            return;
        }
        Object.values(node).forEach((value) => (Array.isArray(value) ? value.forEach(visit) : visit(value)));
    }
    visit(tree);
    return text.slice(found.body.start + 1, found.body.end - 1);
}
let bubble,
    timer,
    cleared = false;
const reveal = new Function(
    'minimizedHost',
    'utterance',
    'setBubble',
    'setTimeout',
    'clearTimeout',
    callback('src/features/chat/voice/RealtimeVoiceSurface.jsx', 'useEffect'),
);
const set = (value) => (bubble = value);
const clock = (fn) => {
    timer = fn;
    return 1;
};
const clear = () => (cleared = true);
reveal({}, { role: 'user', live: true, id: 'partial', text: 'not final' }, set, clock, clear);
assert.equal(bubble, null);
const cleanup = reveal({}, { role: 'user', live: false, id: 'final', text: '🙂'.repeat(250) }, set, clock, clear);
assert.equal(Array.from(bubble.text).length, 181);
assert.ok(bubble.text.endsWith('…'));
timer();
assert.equal(bubble, null);
cleanup();
assert.ok(cleared);
reveal(null, { role: 'user', live: false, id: 'final', text: 'outside scene' }, set, clock, clear);
assert.equal(bubble, null);
const relocate = new Function(
    'viewport',
    'open',
    'normalHost',
    'windowHost',
    callback('src/features/chat/page/components/ChatHistoryViewport.jsx', 'useLayoutEffect'),
);
let parent = null;
const viewport = { remove: () => (parent = null) };
const normal = {
    current: {
        appendChild: (node) => {
            assert.equal(node, viewport);
            parent = 'normal';
        },
    },
};
const floating = {
    current: {
        appendChild: (node) => {
            assert.equal(node, viewport);
            parent = 'window';
        },
    },
};
let detach = relocate(viewport, false, normal, floating);
assert.equal(parent, 'normal');
detach();
detach = relocate(viewport, true, normal, floating);
assert.equal(parent, 'window');
detach();
relocate(viewport, false, normal, floating);
assert.equal(parent, 'normal');
console.log('PASS: final-only bounded unicode bubble, expiry/cleanup, same viewport migrates to window and back');

const openScroll = new Function(
    'open',
    'onScrollToBottom',
    'scrollContainerRef',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    callback('src/features/chat/page/components/ChatHistoryViewport.jsx', 'useLayoutEffect', 1),
);
let scheduled,
    clicks = 0,
    cancelled = false;
const container = { scrollTop: 0, scrollHeight: 1500 };
const stopFrame = openScroll(
    true,
    () => clicks++,
    { current: container },
    (fn) => {
        scheduled = fn;
        return 1;
    },
    () => (cancelled = true),
);
assert.equal(container.scrollTop, 0);
scheduled();
assert.equal(container.scrollTop, 1500);
assert.equal(clicks, 1);
stopFrame();
assert.equal(cancelled, true);
assert.equal(
    openScroll(
        false,
        () => clicks++,
        { current: container },
        () => assert.fail('closed window scheduled scroll'),
        () => {},
    ),
    undefined,
);
console.log('PASS: opening waits for layout then jumps to latest, reuses scroll callback and cancels pending frame');
