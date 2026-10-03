// Run with: node temp/check_realtime_navigation.mjs
// Exercise the actual event runtime with only transport/UUID boundaries stubbed.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import {createMemoryRouter, matchRoutes} from 'react-router-dom';
import {getIncomingEventSchedulerStats} from '../src/runtime/transport/EventDispatchScheduler.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
globalThis.window = globalThis;
globalThis.testUuid = randomUUID;
// An optional source-file argument allows reproduction against a Git baseline.
const source = await readFile(process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'src/context/useEventStore.jsx'), 'utf8');
const importUrl = (relative) => JSON.stringify(pathToFileURL(path.join(root, relative)).href);
const runnable = source
    .replace("import {create} from 'zustand';", `import {create} from ${importUrl('node_modules/zustand/esm/index.mjs')};`)
    .replace("import {generateUUID} from '@/lib/tools.jsx';", 'const generateUUID = globalThis.testUuid;')
    .replace("import {sendRealtimeEvent} from '@/runtime/transport/channel.js';", 'const sendRealtimeEvent = () => {};')
    .replaceAll(/from '@\/([^']+)'/g, (_, relative) => `from ${importUrl(`src/${relative}`)}`);
const {onEvent, dispatchIncomingEvent} = await import(`data:text/javascript;base64,${Buffer.from(runnable).toString('base64')}`);
const envelope = (event, payload = {}, conversationId = 'chat-a') => ({
    version: 1, event_id: randomUUID(), event, payload, conversation_id: conversationId,
});
const drain = async () => {
    const deadline = Date.now() + 2000;
    while (getIncomingEventSchedulerStats().pending) {
        assert.ok(Date.now() < deadline, 'event queue must keep progressing');
        await new Promise((resolve) => setTimeout(resolve, 5));
    }
};

// A render replaces its listener after arrival but before the scheduled delivery.
const old = [];
const received = [];
const cleanupOld = onEvent({event: 'message.*', conversationId: 'chat-a'}).then(({payload}) => old.push(payload.value));
for (let i = 0; i < 100; i++) dispatchIncomingEvent(envelope('message.content.delta', {value: i}));
cleanupOld();
const cleanupNew = onEvent({event: 'message.*', conversationId: 'chat-a'}).then(({payload}) => received.push(payload.value));
await drain();
assert.deepEqual(old, []);
assert.deepEqual(received, Array.from({length: 100}, (_, i) => i));
cleanupNew();

// Real navigation must not deliver the old conversation's deltas to a new view.
dispatchIncomingEvent(envelope('message.content.delta', {value: 'old chat'}));
const wrongChat = [];
const cleanupOther = onEvent({event: 'message.*', conversationId: 'chat-b'}).then(({payload}) => wrongChat.push(payload));
await drain();
assert.deepEqual(wrongChat, []);
cleanupOther();

// A slow async interaction cannot stall streaming; history reconciliation is FIFO
// with the message events it depends on, matching the server's lane assignment.
let releaseInteraction;
const held = new Promise((resolve) => { releaseInteraction = resolve; });
const delivered = [];
const cleanup = onEvent({event: ['message.*', 'conversation.messages.*', 'setting.*']}).then(async ({event}) => {
    if (event === 'setting.open') await held;
    else delivered.push(event);
});
dispatchIncomingEvent(envelope('setting.open'));
dispatchIncomingEvent(envelope('message.created'));
dispatchIncomingEvent(envelope('conversation.messages.reconciled'));
dispatchIncomingEvent(envelope('message.content.delta'));
await drain();
assert.deepEqual(delivered, ['message.created', 'conversation.messages.reconciled', 'message.content.delta']);
releaseInteraction();
cleanup();

// Read the actual route configuration, replacing only page elements. The same
// parent route must own /chat, a selected chat, and its message-map child.
const main = await readFile(path.join(root, 'src/main.jsx'), 'utf8');
const routeExpression = main.slice(main.indexOf('const router = ') + 'const router = '.length, main.indexOf('\n\nconst root'));
const compiled = ts.transpileModule(`const configured = ${routeExpression}`, {
    compilerOptions: {jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2020},
}).outputText;
const context = {
    createBrowserRouter: (routes) => routes,
    React: {createElement: () => null},
    DashboardPage: () => null, MessageHistoryMapPage: () => null, LoginPage: () => null, Navigate: () => null,
};
const routes = vm.runInNewContext(`${compiled}\nconfigured;`, context);
const router = createMemoryRouter(routes, {initialEntries: ['/chat']});
const initialParent = router.state.matches[0].route.id;
await router.navigate('/chat/chat-a');
assert.equal(router.state.matches[0].route.id, initialParent);
await router.navigate('/chat/chat-a/message-map');
assert.equal(router.state.matches[0].route.id, initialParent);
assert.equal(router.state.matches.length, 2);
await router.navigate('/chat/chat-a?message=message-1');
assert.equal(router.state.matches[0].route.id, initialParent);
assert.ok(matchRoutes(routes, '/doc/document-1/chat-a'));
router.dispose();
console.log('PASS: subscription replacement, scope isolation, async interaction, stream FIFO and persistent chat route.');
