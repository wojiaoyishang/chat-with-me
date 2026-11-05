import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import test from 'node:test';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { JSDOM } from 'jsdom';
import { build } from 'esbuild';

await mkdir('temp', { recursive: true });
await build({
    entryPoints: ['src/context/WebSocketContext.jsx'], outfile: 'temp/login-websocket-visibility-ui.mjs',
    bundle: true, format: 'esm', platform: 'node', packages: 'external', jsx: 'automatic',
    plugins: [{ name: 'login-realtime-fixtures', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
        builder.onResolve({ filter: /^(?:@\/|\.\.\/runtime\/backend\/)/ }, ({ path }) => ({ path, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => {
            let contents;
            if (path.endsWith('WebSocketReconnectPrompt.jsx')) contents = 'export default ({open})=>open?<div data-reconnect>Disconnected</div>:null;';
            else if (path.endsWith('apiClient.js')) contents = 'export default {};';
            else if (path.endsWith('config.js')) contents = 'export const apiEndpoint={};';
            else if (path.endsWith('messageCallback.jsx')) contents = 'export default ()=>{};';
            else if (path.endsWith('useEventStore.jsx')) contents = 'export const emitEvent=()=>{},dispatchIncomingEvent=()=>{};';
            else if (path.endsWith('events.js')) contents = 'export const EventName={TRANSPORT_CONNECTED:"transport.connected",TRANSPORT_DISCONNECTED:"transport.disconnected",TRANSPORT_ERROR:"transport.error"};';
            else if (path.endsWith('WebSocketTransport.js')) contents = `
                export class WebSocketTransport {
                    constructor(url,options){this.url=url;this.options=options;this.isOpen=false;globalThis.__loginSocket.transports.push(this);}
                    setHandlers(options){this.options=options;}
                    async connect(){throw new Error('offline');}
                    close(){this.isOpen=false;}
                }`;
            else if (path.endsWith('channel.js')) contents = 'export const flushRealtimeEvents=()=>{},getRealtimeTransport=()=>globalThis.__loginSocket.channel,setRealtimeTransport=value=>{globalThis.__loginSocket.channel=value};';
            else if (path.endsWith('session.js')) contents = 'export const authenticatedSocketUrl=async()=>"ws://test";';
            else if (path.endsWith('connection.js')) contents = 'export const getBackendConnection=()=>({id:"default",epoch:0}),isCurrentConnection=()=>true,subscribeBackend=()=>()=>{};';
            else throw new Error(`Unexpected dependency ${path}`);
            return { contents, loader: 'jsx' };
        });
    } }],
});
const { WebSocketProvider } = await import('../temp/login-websocket-visibility-ui.mjs');

test('router subscriptions hide and restore the prompt during SPA login navigation without reconnecting the provider', async t => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'https://client.example/login' });
    const previous = new Map(['window', 'document'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of previous.keys()) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.__loginSocket = { transports: [], channel: null };
    const listeners = new Set();
    let pathname = '/login';
    const router = {
        subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
        get state() { return { location: { pathname } }; },
    };
    const root = createRoot(document.getElementById('root'));
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        for (const [key, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
        delete globalThis.__loginSocket;
        delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    });
    const navigate = async value => act(async () => { pathname = value; for (const listener of listeners) listener(router.state); });
    await act(async () => {
        root.render(React.createElement(WebSocketProvider, { router }, React.createElement('div', null, 'Page content')));
        await new Promise(resolve => setImmediate(resolve));
    });
    assert.equal(document.querySelector('[data-reconnect]'), null);
    assert.equal(globalThis.__loginSocket.transports.length, 1);
    assert.equal(listeners.size, 1);
    await navigate('/chat/current');
    assert.ok(document.querySelector('[data-reconnect]'));
    await navigate('/LOGIN/');
    assert.equal(document.querySelector('[data-reconnect]'), null);
    await navigate('/doc/current');
    assert.ok(document.querySelector('[data-reconnect]'));
    assert.equal(globalThis.__loginSocket.transports.length, 1);
});
