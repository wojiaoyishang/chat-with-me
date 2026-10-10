import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';

test('Word view disables false spelling waves once after document readiness and rejects unrelated frames', async () => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/doc/test', pretendToBeVisual: true});
    for (const key of ['window', 'document', 'HTMLElement', 'Element']) globalThis[key] = dom.window[key];
    Object.defineProperty(globalThis, 'navigator', {configurable: true, value: dom.window.navigator});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    await build({stdin: {contents: "export {default as Editor} from './src/components/editor/CollaboraOnlineEditor.jsx';", resolveDir: process.cwd()},
        bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node', outfile: 'temp/collabora-spelling-test.mjs',
        plugins: [{name: 'fixture', setup(builder) {
            builder.onResolve({filter: /^react-i18next$|^@\/lib\/tools.jsx$/}, ({path}) => ({path, namespace: 'mock'}));
            builder.onLoad({filter: /.*/, namespace: 'mock'}, ({path}) => ({contents: path === 'react-i18next'
                ? 'export const useTranslation=()=>({t:(key)=>key});'
                : 'export const UnifiedLoadingScreen=()=>null;export const UnifiedErrorScreen=()=>null;'}));
        }}]});
    const {Editor} = await import('../temp/collabora-spelling-test.mjs');
    const root = createRoot(document.getElementById('root'));
    try {
        await act(async () => root.render(React.createElement(Editor, {iframeUrl: 'http://localhost:9980/browser/editor'})));
        const iframe = document.querySelector('iframe');
        const sent = [];
        iframe.contentWindow.postMessage = (message, origin) => sent.push({message: JSON.parse(message), origin});
        await act(async () => iframe.dispatchEvent(new window.Event('load')));
        const loaded = {MessageId: 'App_LoadingStatus', Values: {Status: 'Document_Loaded'}};
        const receive = (source, origin = 'http://localhost:9980') => window.dispatchEvent(new window.MessageEvent('message', {
            source, origin, data: JSON.stringify(loaded),
        }));
        await act(async () => { receive(window); receive(iframe.contentWindow, 'https://unrelated.example'); });
        assert.equal(sent.length, 0);
        await act(async () => receive(iframe.contentWindow));
        const commands = () => sent.filter(item => item.message.MessageId === 'Send_UNO_Command');
        assert.deepEqual(commands()[0], {origin: 'http://localhost:9980', message: {MessageId: 'Send_UNO_Command', Values: {
            Command: '.uno:SpellOnline', Args: {SpellOnline: {type: 'boolean', value: false}},
        }}});
        await act(async () => {
            receive(iframe.contentWindow);
            root.render(React.createElement(Editor, {iframeUrl: 'http://localhost:9980/browser/editor', onMessageReceived: () => {}}));
        });
        await act(async () => receive(iframe.contentWindow));
        assert.equal(commands().length, 1);
        assert.equal(document.querySelector('iframe'), iframe);
        await act(async () => iframe.dispatchEvent(new window.Event('load')));
        await act(async () => receive(iframe.contentWindow));
        assert.equal(commands().length, 2);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
    }
});
