import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';
const source = fs.readFileSync('src/features/chat/page/hooks/useChatSpeech.js', 'utf8');
const nodes = new Map();
function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier') nodes.set(node.id.name, node);
    Object.values(node).forEach((value) => (Array.isArray(value) ? value.forEach(visit) : visit(value)));
}
visit(parse(source, { sourceType: 'module', plugins: ['jsx'] }));
const normalize = new Function(
    'return ' +
        source.slice(nodes.get('normalizeSpeechVolume').init.start, nodes.get('normalizeSpeechVolume').init.end),
)();
assert.equal(normalize(0), 0);
assert.equal(normalize(-5), 0);
assert.equal(normalize(8), 1);
assert.equal(normalize('bad'), 1);
const refs = {
    speechVolumeRef: { current: 1 },
    speechControllerRef: {
        current: {
            volume: 1,
            currentUtterance: { volume: 1 },
            queuedUtterances: new Map([[0, { volume: 1 }]]),
            speechConfig: { rate: 1 },
        },
    },
    streamingSpeechRef: { current: { speechConfig: { rate: 1 } } },
    backendSpeechAudioRef: { current: { audio: { volume: 1 } } },
};
let state, persisted;
const callback = nodes.get('updateSpeechVolume').init.arguments[0];
const update = new Function(
    'normalizeSpeechVolume',
    'SPEECH_VOLUME_SETTING_KEY',
    'setSpeechVolume',
    'setLocalSetting',
    ...Object.keys(refs),
    'return ' + source.slice(callback.start, callback.end),
)(
    normalize,
    'TTSPlaybackVolume',
    (v) => (state = v),
    (key, v) => (persisted = [key, v]),
    ...Object.values(refs),
);
update(0.35);
assert.equal(state, 0.35);
assert.deepEqual(persisted, ['TTSPlaybackVolume', 0.35]);
assert.equal(refs.backendSpeechAudioRef.current.audio.volume, 0.35);
assert.equal(refs.speechControllerRef.current.currentUtterance.volume, 0.35);
assert.equal(refs.speechControllerRef.current.queuedUtterances.get(0).volume, 0.35);
assert.equal(refs.streamingSpeechRef.current.speechConfig.volume, 0.35);
update(0);
assert.equal(refs.backendSpeechAudioRef.current.audio.volume, 0);
const surface = fs.readFileSync('src/features/chat/voice/RealtimeVoiceSurface.jsx', 'utf8');
function checkButtons(node, inside = false) {
    if (!node || typeof node !== 'object') return;
    const button = node.type === 'JSXElement' && node.openingElement.name.name === 'button';
    assert.ok(!(button && inside), 'nested button');
    Object.values(node).forEach((value) =>
        Array.isArray(value)
            ? value.forEach((child) => checkButtons(child, inside || button))
            : checkButtons(value, inside || button),
    );
}
checkButtons(parse(surface, { sourceType: 'module', plugins: ['jsx'] }));
assert.ok(source.includes('audio.volume = speechVolumeRef.current'));
for (const name of ['handleSpeakMessageRequest', 'handleSpeakContentRequest', 'beginStreamingSpeech'])
    assert.ok(source.slice(nodes.get(name).start, nodes.get(name).end).includes('volume: speechVolumeRef.current'));
console.log(
    'PASS: persistent zero/clamped volume, active backend audio, browser queues, all speech entry points, no nested buttons',
);

const player = fs.readFileSync('src/features/chat/page/components/SpeechPlayer.jsx', 'utf8');
const playerNodes = [];
function collect(node) {
    if (!node || typeof node !== 'object') return;
    playerNodes.push(node);
    Object.values(node).forEach((value) => (Array.isArray(value) ? value.forEach(collect) : collect(value)));
}
collect(parse(player, { sourceType: 'module', plugins: ['jsx'] }));
const effect = playerNodes.find(
    (node) =>
        node.type === 'CallExpression' &&
        node.callee.name === 'useEffect' &&
        player.slice(node.arguments[0]?.start, node.arguments[0]?.end).includes('hasOpenSecondaryMenu'),
).arguments[0];
const menu = { current: false },
    previous = { current: false },
    pointer = { current: false };
let cleared = 0,
    collapsed = 0,
    floating = { collapsed: true };
const runMenuEffect = new Function(
    'speedMenuOpen',
    'browserVoiceMenuOpen',
    'subtitlePositionMenuOpen',
    'volumeMenuOpen',
    'secondaryMenuOpenRef',
    'wasSecondaryMenuOpenRef',
    'clearCollapseTimer',
    'setFloatingState',
    'isMobileInteraction',
    'floatingState',
    'panelPointerInsideRef',
    'scheduleDockCollapse',
    'return ' + player.slice(effect.start, effect.end),
);
const invoke = (open) =>
    runMenuEffect(
        false,
        false,
        false,
        open,
        menu,
        previous,
        () => cleared++,
        (update) => (floating = update(floating)),
        false,
        { dockedSide: 'right' },
        pointer,
        () => collapsed++,
    )();
invoke(true);
assert.equal(menu.current, true);
assert.equal(cleared, 1);
assert.equal(floating.collapsed, false);
invoke(false);
assert.equal(menu.current, false);
assert.equal(collapsed, 1);
const outside = playerNodes.find(
    (node) => node.type === 'VariableDeclarator' && node.id.name === 'handlePointerDownOutside',
).init;
const inside = {};
let outsideCollapsed = 0;
new Function(
    'interactionRef',
    'panelRef',
    'speedMenuRef',
    'volumeMenuRef',
    'browserVoiceMenuRef',
    'subtitlePositionMenuRef',
    'collapseToDock',
    'return ' + player.slice(outside.start, outside.end),
)(
    { current: { active: false } },
    { current: null },
    { current: null },
    { current: { contains: (target) => target === inside } },
    { current: null },
    { current: null },
    () => outsideCollapsed++,
)({ target: inside });
assert.equal(outsideCollapsed, 0);
console.log('PASS: TTS volume popover pins dock open and its portal does not trigger mobile outside-collapse');

assert.ok(!surface.includes('SpeechVolumeControl'), 'call window must not duplicate global volume settings');
assert.ok(player.includes('<SpeechVolumeControl'), 'global TTS player retains volume settings');
const page = fs.readFileSync('src/features/chat/ChatPage.jsx', 'utf8');
assert.ok(
    !page.includes('minimizedBottom={'),
    'composer visibility must not move the call window away from the pointer',
);
console.log('PASS: global TTS-only volume control and stable call window position');
