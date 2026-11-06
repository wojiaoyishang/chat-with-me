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
        builder.onResolve({ filter: /^(?:@\/|\.\.\/lib\/|\.\.\/runtime\/(?:backend|transport)\/)/ }, ({ path }) => ({ path, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => {
            let contents;
            if (path.endsWith('WebSocketReconnectPrompt.jsx')) contents = 'export default ({open})=>open?<div data-reconnect>Disconnected</div>:null;';
            else if (path.endsWith('apiClient.js')) contents = 'export default {post:async()=>({refreshAfterSeconds:600})};';
            else if (path.endsWith('config.js')) contents = 'export const apiEndpoint={};';
            else if (path.endsWith('tools.jsx')) contents = 'export const generateUUID=()=>crypto.randomUUID();';
            else if (path.endsWith('messageCallback.jsx')) contents = 'export default ()=>{};';
            else if (path.endsWith('useEventStore.jsx')) contents = 'export const emitEvent=()=>{},dispatchIncomingEvent=()=>{};';
            else if (path.endsWith('events.js')) contents = 'export const EventName={TRANSPORT_CONNECTED:"transport.connected",TRANSPORT_DISCONNECTED:"transport.disconnected",TRANSPORT_ERROR:"transport.error"};';
            else if (path.endsWith('WebSocketTransport.js')) contents = `
                export class WebSocketTransport {
                    constructor(url,options){this.url=url;this.options=options;this.isOpen=false;globalThis.__loginSocket.transports.push(this);}
                    setHandlers(options){this.options=options;}
                    async connect(){if(globalThis.__loginSocket.offline!==false)throw new Error('offline');this.isOpen=true;this.options.onOpen?.();}
                    sendEvent(){}
                    close(){this.isOpen=false;}
                }`;
            else if (path.endsWith('channel.js')) contents = 'export const flushRealtimeEvents=()=>{},getRealtimeTransport=()=>globalThis.__loginSocket.channel,setRealtimeTransport=value=>{globalThis.__loginSocket.channel=value};';
            else if (path.endsWith('subscriptionDemand.js')) contents = 'export const hasRealtimeDemand=()=>true,subscribeRealtimeDemand=()=>()=>{},realtimeSubscriptions=()=>[];';
            else if (path.endsWith('session.js')) contents = 'export const authenticatedSocketUrl=async()=>"ws://test";';
            else if (path.endsWith('connection.js')) contents = 'export const getBackendConnection=()=>({id:"default",epoch:0}),isCurrentConnection=()=>true,subscribeBackend=()=>()=>{};';
            else throw new Error(`Unexpected dependency ${path}`);
            return { contents, loader: 'jsx' };
        });
    } }],
});
const { WebSocketProvider, useWebSocket } = await import('../temp/login-websocket-visibility-ui.mjs');

test('login navigation owns no connection; returning to a realtime view prepares a new one', async t => {
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
    assert.equal(globalThis.__loginSocket.transports.length, 0);
    assert.equal(listeners.size, 1);
    await navigate('/chat/current');
    assert.ok(document.querySelector('[data-reconnect]'));
    await navigate('/LOGIN/');
    assert.equal(document.querySelector('[data-reconnect]'), null);
    await navigate('/doc/current');
    assert.ok(document.querySelector('[data-reconnect]'));
    assert.equal(globalThis.__loginSocket.transports.length, 2);
});

test('100 incoming data frames do not rerender a consumer of connection status', async t => {
    const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://client.example/chat'});
    const previous = new Map(['window','document','IS_REACT_ACT_ENVIRONMENT'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
    for(const key of ['window','document'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true});
    globalThis.IS_REACT_ACT_ENVIRONMENT=true;
    globalThis.__loginSocket={transports:[],channel:null,offline:false};
    let renders=0;
    const Consumer=React.memo(()=>{const {isConnected}=useWebSocket();renders++;return React.createElement('div',null,String(isConnected));});
    const root=createRoot(document.getElementById('root'));
    t.after(async()=>{await act(async()=>root.unmount());dom.window.close();
        for(const [key,value] of previous)value?Object.defineProperty(globalThis,key,value):delete globalThis[key];
        delete globalThis.__loginSocket;});
    await act(async()=>root.render(React.createElement(WebSocketProvider,null,React.createElement(Consumer))));
    const baseline=renders, transport=globalThis.__loginSocket.transports[0];
    for(let index=0;index<100;index++)await act(async()=>transport.options.onEvent({event:'message.content.delta',payload:{value:{id:String(index)}}}));
    assert.equal(renders-baseline,0);
});
