import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { acceptSceneCommand } from '../src/features/avatar-scene/commandGate.js';
const scope = { sceneSessionId: 'new', realtimeSessionId: 'voice', controlConnectionId: 'tab' };
const command = { ...scope, version: '1', sequence: 1, expiresAt: 1001 };
assert(acceptSceneCommand(command, scope, '1', 0, 1000));
for (const patch of [
    { sceneSessionId: 'old' },
    { realtimeSessionId: 'other' },
    { controlConnectionId: 'other' },
    { version: '2' },
    { sequence: 0 },
    { expiresAt: 1000 },
]) {
    assert(!acceptSceneCommand({ ...command, ...patch }, scope, '1', 0, 1000));
}
assert(!acceptSceneCommand(command, scope, '1', 1, 1000));
assert(!acceptSceneCommand(command, null, '1', 0, 1000));
const bytes = fs.readFileSync(new URL('../public/models/robot-expressive/RobotExpressive.glb', import.meta.url));
const gltf = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
);
for (const clip of ['Idle', 'Wave', 'Yes', 'No', 'ThumbsUp', 'Dance'])
    assert(gltf.animations.some((item) => item.name === clip));
let skinned = 0,
    expressions;
gltf.scene.traverse((object) => {
    if (object.isSkinnedMesh) skinned++;
    if (object.morphTargetDictionary) expressions = object.morphTargetDictionary;
});
assert(skinned > 0);
for (const expression of ['Angry', 'Surprised', 'Sad']) assert(expression in expressions);
console.log('PASS: fresh scene commands, bundled skeleton, animation and expression compatibility');

// Run the panel's actual request callback: disconnected operations must not queue.
const panel = fs.readFileSync(new URL('../src/features/avatar-scene/AvatarScenePanel.jsx', import.meta.url), 'utf8');
const { parse } = await import('@babel/parser');
const tree = parse(panel, { sourceType: 'module', plugins: ['jsx'] });
let callback;
function find(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator' && node.id.name === 'requestScene') callback = node.init.arguments[0];
    for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(find);
        else if (value && typeof value === 'object') find(value);
    }
}
find(tree);
const bodyStart = callback.body.start + 1;
const bodyEnd = callback.body.end - 1;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const invoke = new AsyncFunction(
    'event',
    'payload',
    'getRealtimeTransport',
    'emitEvent',
    'conversationId',
    panel.slice(bodyStart, bodyEnd),
);
let sent = 0;
const emit = async () => {
    sent++;
    return { success: true, scope: { sceneSessionId: 'test' } };
};
await assert.rejects(invoke('avatar.scene.start', {}, () => ({ isOpen: false }), emit, 'chat'));
assert.equal(sent, 0);
const result = await invoke('avatar.scene.start', {}, () => ({ isOpen: true }), emit, 'chat');
assert.equal(result.payload.scope.sceneSessionId, 'test');
assert.equal(sent, 1);
await assert.rejects(
    invoke(
        'avatar.scene.start',
        {},
        () => ({ isOpen: true }),
        async () => ({ success: false, message: 'denied' }),
        'chat',
    ),
);
console.log('PASS: independent control requests, offline queue bypass and explicit failure');
