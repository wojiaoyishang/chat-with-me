import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {acceptSceneCommand} from '../src/features/avatar-scene/commandGate.js';
const scope = {sceneSessionId: 'new', realtimeSessionId: 'voice', controlConnectionId: 'tab'};
const command = {...scope, version: '1', sequence: 1, expiresAt: 1001};
assert(acceptSceneCommand(command, scope, '1', 0, 1000));
for (const patch of [{sceneSessionId: 'old'}, {realtimeSessionId: 'other'}, {controlConnectionId: 'other'}, {version: '2'}, {sequence: 0}, {expiresAt: 1000}]) {
    assert(!acceptSceneCommand({...command, ...patch}, scope, '1', 0, 1000));
}
assert(!acceptSceneCommand(command, scope, '1', 1, 1000));
assert(!acceptSceneCommand(command, null, '1', 0, 1000));
const bytes = fs.readFileSync(new URL('../public/models/robot-expressive/RobotExpressive.glb', import.meta.url));
const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
for (const clip of ['Idle', 'Wave', 'Yes', 'No', 'ThumbsUp', 'Dance']) assert(gltf.animations.some(item => item.name === clip));
let skinned = 0, expressions;
gltf.scene.traverse(object => { if (object.isSkinnedMesh) skinned++; if (object.morphTargetDictionary) expressions = object.morphTargetDictionary; });
assert(skinned > 0);
for (const expression of ['Angry', 'Surprised', 'Sad']) assert(expression in expressions);
console.log('PASS: fresh scene commands, bundled skeleton, animation and expression compatibility');
