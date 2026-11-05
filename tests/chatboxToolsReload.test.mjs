import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { applyToolPermissionsToStatus, collectToolPermissions } from '../src/features/tools/toolPermissions.js';

await build({
    stdin: { contents: 'export {default as ToolButtons} from "./src/features/chat/ui/ToolButtons.jsx";', resolveDir: process.cwd(), loader: 'jsx' },
    outfile: 'temp/chatbox-tools-reload-test.mjs', bundle: true, format: 'esm', platform: 'node', jsx: 'automatic', packages: 'external',
    plugins: [{ name: 'chatbox-tool-ui', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: requested }) => ({ path: requested, external: true }));
        builder.onResolve({ filter: /^@\/features\/tools\/toolPermissions\.js$/ }, () => ({ path: path.resolve('src/features/tools/toolPermissions.js') }));
        builder.onResolve({ filter: /^\.\/(?:BuiltinSliderButton|ToolAuditModeSwitch|ChatButton)/ }, ({ path: requested }) => ({ path: requested, namespace: 'fixture' }));
        builder.onResolve({ filter: /^@\// }, ({ path: requested }) => ({ path: requested, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: requested }) => {
            if (requested.endsWith('/dropdown-menu')) return { loader: 'jsx', contents: `
                import React from 'react';
                const Box=({children})=><div>{children}</div>;
                export const DropdownMenu=Box, DropdownMenuContent=Box, DropdownMenuItem=Box, DropdownMenuLabel=Box,
                    DropdownMenuSub=Box, DropdownMenuSubContent=Box, DropdownMenuSubTrigger=Box, DropdownMenuTrigger=Box;
            ` };
            if (requested.endsWith('/virtualUrl.js')) return { loader: 'js', contents: 'export const resolveResourceUrl=value=>value;' };
            if (requested.endsWith('/tools.jsx')) return { loader: 'js', contents: 'export const getLocalSetting=(_key,fallback)=>fallback; export const setLocalSetting=()=>{};' };
            return { loader: 'jsx', contents: 'export default function Stub(){return null;}' };
        });
    } }],
});
const { ToolButtons } = await import('../temp/chatbox-tools-reload-test.mjs');

for (const isMobileMenu of [false, true]) test(`tool retry actually invokes the reload action (${isMobileMenu ? 'mobile' : 'desktop'})`, async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
    globalThis.ResizeObserver = class { observe() {} disconnect() {} };
    globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    let retries = 0;
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(ToolButtons, {
            toolsLoadedStatus: 3, extraTools: [], tools: [], toolsStatus: {}, setToolsStatus: () => {},
            renderMenuItems: () => null, onReloadTools: () => { retries += 1; }, t: (key) => key, isMobileMenu,
        })));
        const retry = document.querySelector('[aria-label="reload_tools"]');
        assert.ok(retry, 'an error must expose a working retry control');
        await act(async () => retry.click());
        assert.equal(retries, 1);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
    }
});

const source = readFileSync(new URL('../src/features/chat/ui/ChatBox.jsx', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('ChatBox.jsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
let callback;
let refreshStatusCallback;
let permissionSelection;
const find = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'waitForToolConfiguration') callback = node.initializer.arguments[0].getText(parsed);
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'chatboxSetup') {
        const inspectSetup = (child) => {
            if (ts.isCallExpression(child) && child.expression.getText(parsed) === 'setToolsStatus') refreshStatusCallback = child.arguments[0].getText(parsed);
            if (ts.isVariableDeclaration(child) && child.name.getText(parsed) === 'serverToolPermissions') permissionSelection = child.initializer.getText(parsed);
            ts.forEachChild(child, inspectSetup);
        };
        inspectSetup(node);
    }
    ts.forEachChild(node, find);
};
find(parsed);

test('send readiness waits for the applied configuration and rejects stale scopes or failed permissions', async () => {
    const errors = [];
    let currentScope = 'backend:user';
    let resolve;
    const request = { key: 'backend:user:one', promise: new Promise((done) => { resolve = done; }) };
    const ref = { current: request };
    const wait = new Function('apiEndpoint', 'chatboxResourceScope', 'conversationId', 'toolConfigurationRequestRef', 'toast', 't', `return (${callback});`)(
        { CHATBOX_ENDPOINT: '/chat/chatbox' }, () => currentScope, 'one', ref,
        { error: (message) => errors.push(message) }, (key, fallback) => fallback || key,
    );
    let ready = false;
    const pending = wait().then(() => { ready = true; });
    await Promise.resolve();
    assert.equal(ready, false);
    resolve({ readOnly: false });
    await pending;
    assert.equal(ready, true);
    currentScope = 'other-account';
    await assert.rejects(wait(), /tool_load_failed/);
    currentScope = 'backend:user';
    ref.current = { key: request.key, promise: Promise.reject(new Error('权限读取失败')) };
    await assert.rejects(wait(), /权限读取失败/);
    ref.current = { key: request.key, promise: Promise.resolve({ readOnly: true }) };
    await assert.rejects(wait(), /只读/);
    assert.equal(errors.length, 3);
});

test('catalog refresh preserves new-chat selections and pending edits, while accepting confirmed server changes', () => {
    const tools = [{ type: 'tool', name: 'read', permissionKey: 'read', default: 'ask' }];
    const update = (conversationId, pending = new Map()) => new Function(
        'configuredExtraTools', 'mergedExtraStatus', 'preserveLocalPermissions', 'conversationId', 'toolPermissionPendingCountsRef',
        'newBuiltinStatus', 'collectToolPermissions', 'applyToolPermissionsToStatus', `return (${refreshStatusCallback});`,
    )(tools, { read: 'ask' }, true, conversationId, { current: pending }, {}, collectToolPermissions, applyToolPermissionsToStatus);
    const previous = { extra_tools: { read: 'deny' }, builtin_tools: {} };
    assert.equal(update(null)(previous).extra_tools.read, 'deny');
    assert.equal(update('one', new Map([['read', 1]]))(previous).extra_tools.read, 'deny');
    assert.equal(update('one')(previous).extra_tools.read, 'ask');

    const select = new Function('incomingPermissionRevision', 'toolPermissionRevisionRef', 'conversationToolPermissionsRef', 'data', `return (${permissionSelection});`);
    const current = { read: 'deny' };
    assert.equal(select(1, { current: 2 }, { current }, { toolPermissions: { values: { read: 'allow' } } }), current);
    assert.deepEqual(select(3, { current: 2 }, { current }, { toolPermissions: { values: { read: 'allow' } } }), { read: 'allow' });
});
