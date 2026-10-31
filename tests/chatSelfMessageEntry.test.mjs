import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const output = `temp/chat-self-message-entry-${process.pid}.mjs`;
await build({ entryPoints: ['src/features/chat/page/components/ChatHeader.jsx'], outfile: output,
    bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', plugins: [{
        name: 'header-ui', setup(builder) {
            builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
            builder.onResolve({ filter: /^@\// }, ({ path: name }) => ({ path: name, namespace: 'mock' }));
            builder.onResolve({ filter: /ModelItem\.jsx$|ModelPreviewCard\.jsx$/ }, ({ path: name }) => ({ path: name, namespace: 'mock' }));
            builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => ({ loader: 'jsx', contents:
                name.includes('/ui/button') ? 'export const Button=({variant,size,children,...props})=><button {...props}>{children}</button>;'
                    : name.includes('/ui/popover') ? 'export const Popover=({children})=><div>{children}</div>;export const PopoverTrigger=Popover;export const PopoverContent=Popover;'
                    : name.includes('NotificationCenter') ? 'export const NotificationCenterTrigger=()=>null;'
                    : name.includes('TaskCenter') ? 'export const TaskCenterTrigger=()=>null;'
                    : 'export default ()=>null;',
            }));
        },
    }] });
const { default: ChatHeader } = await import(pathToFileURL(path.resolve(output)).href);

test('the self-message entry is available in desktop and compact headers and requires a real conversation', async () => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    let resize, opened = 0;
    globalThis.ResizeObserver = class {
        constructor(callback) { resize = (width) => callback([{ contentRect: { width } }]); }
        observe() { resize(800); }
        disconnect() {}
    };
    const root = createRoot(document.getElementById('root'));
    const props = { models: [], selectedModel: { name: '模型' }, conversationId: 'conversation',
        t: (key, options) => options?.defaultValue || key, isModelPopoverOpen: false,
        onOpenSelfMessages: () => { opened += 1; }, selfMessagesOpen: true };
    try {
        await act(async () => root.render(React.createElement(ChatHeader, props)));
        let entry = document.querySelector('[aria-label="自消息"]');
        assert.equal(entry.getAttribute('aria-pressed'), 'true');
        await act(async () => entry.click());
        assert.equal(opened, 1);
        await act(async () => resize(320));
        entry = document.querySelector('[aria-label="自消息"]');
        assert.match(entry.textContent, /自消息/);
        await act(async () => entry.click());
        assert.equal(opened, 2);
        await act(async () => root.render(React.createElement(ChatHeader, { ...props, conversationId: null })));
        assert.equal(document.querySelector('[aria-label="自消息"]').disabled, true);
    } finally { await act(async () => root.unmount()); dom.window.close(); }
});
