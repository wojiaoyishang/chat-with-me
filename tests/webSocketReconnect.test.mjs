import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { transformSync } from 'esbuild';
import { test } from 'node:test';

const source = fs.readFileSync(new URL('../src/context/WebSocketContext.jsx', import.meta.url), 'utf8')
    .replace(/^import .*;\r?\n/gm, '').replaceAll('export const ', 'const ').replaceAll('import.meta.env.DEV', 'false');
const script = transformSync(`
const React = require('react');
const createContext = () => ({Provider: 'provider'});
const useContext = () => null;
let stateIndex=0, refIndex=0, states=[], refs=[], effects=[];
const useState = value => { const index=stateIndex++; if(!(index in states))states[index]=value;return [states[index], value=>{states[index]=typeof value==='function'?value(states[index]):value;}]; };
const useRef = value => { const index=refIndex++; return refs[index] ||= {current:value}; };
const useEffect = effect => effects.push(effect);
const useTranslation = () => ({t:key=>key});
const toast = {promise:()=>{}};
const EventName = {TRANSPORT_CONNECTED:'transport.connected',TRANSPORT_DISCONNECTED:'transport.disconnected',TRANSPORT_ERROR:'transport.error'};
const emitted=[], received=[];
const emitEvent = value => emitted.push(value);
const dispatchIncomingEvent = value => received.push(value);
const globalMessageCallback = value => received.push(value);
const apiClient = {}, apiEndpoint = {}, WEBSOCKET_URL='ws://test';
let backendEpoch=0, pendingTicket=null, ticketPreparations=0, ticketFailure=null;
const backendListeners=new Set();
const getBackendConnection=()=>({id:'backend-a',epoch:backendEpoch});
const isCurrentConnection=scope=>scope?.id==='backend-a'&&scope?.epoch===backendEpoch;
const subscribeBackend=fn=>{backendListeners.add(fn);return ()=>backendListeners.delete(fn)};
const authenticatedSocketUrl=async()=>{const n=++ticketPreparations;const pending=pendingTicket;if(pending)await pending;if(ticketFailure)throw ticketFailure;return 'ws://test?ticket=one-use-'+n;};
let channel=null, flushes=0;
const getRealtimeTransport=()=>channel;
const setRealtimeTransport=value=>{channel=value};
const flushRealtimeEvents=()=>{flushes++};
const FatalErrorPopoverElement={show:()=>{}};
const WebSocketReconnectPrompt='reconnect-prompt';
let failures=0, transports=[];
class WebSocketTransport {
 constructor(url,options){this.url=url;this.options=options;this.isOpen=false;transports.push(this);}
 setHandlers(options){this.options=options;return this;}
 async connect(){if(failures){failures--;this.options.onError?.(new Error('offline'));this.options.onClose?.({code:1006});throw new Error('offline');}this.isOpen=true;this.options.onOpen?.();this.options.onEvent?.({event:EventName.TRANSPORT_CONNECTED,payload:{connectionId:'connection-'+transports.length}});return this;}
 close(code=1000,reason=''){this.isOpen=false;this.options.onClose?.({code,reason});}
}
${source}
exports.render=()=>{stateIndex=0;refIndex=0;effects=[];return WebSocketProvider({children:null})};
exports.initialize=()=>effects[0]();
exports.retry=()=>retryWebSocketConnection();
exports.transports=transports;
exports.fail=value=>{failures=value};
exports.failTicket=value=>{ticketFailure=value};
exports.preparations=()=>ticketPreparations;
exports.channel=()=>channel;
exports.flushes=()=>flushes;
exports.received=received;
exports.changeBackend=()=>{backendEpoch++;for(const fn of backendListeners)fn();};
exports.deferTicket=()=>{let release;pendingTicket=new Promise(resolve=>{release=resolve;});return ()=>{pendingTicket=null;release();};};
`, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;

const settle = () => new Promise(setImmediate);
function harness() {
    const timers = new Map();
    let now = 0, nextId = 0;
    const window = new EventTarget(), document = new EventTarget(), redirects = [];
    window.location = { pathname: '/chat', replace: path => redirects.push(path) };
    window.navigator = { onLine: true };
    document.visibilityState = 'visible';
    window.setTimeout = (fn, ms) => { const id = ++nextId; timers.set(id, { at: now + ms, fn }); return id; };
    window.clearTimeout = id => timers.delete(id);
    const context = { require: createRequire(import.meta.url), exports: {}, console: { error() {} }, window, document,
        navigator: window.navigator, setTimeout: window.setTimeout, clearTimeout: window.clearTimeout };
    vm.runInNewContext(script, context);
    const app = context.exports;
    app.view = () => app.render().props.value;
    app.prompt = () => app.render().props.children[1].props;
    app.start = async () => { app.render(); const cleanup = app.initialize(); await settle(); return cleanup; };
    app.tick = async ms => {
        const end = now + ms;
        while (true) {
            const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
            if (!next) break;
            now = next[1].at; timers.delete(next[0]); next[1].fn(); await settle();
        }
        now = end; await settle();
    };
    app.timers = () => timers.size;
    app.network = async online => { window.navigator.onLine = online; window.dispatchEvent(new Event(online ? 'online' : 'offline')); await settle(); };
    app.focus = async () => { window.dispatchEvent(new Event('focus')); await settle(); };
    app.visible = async () => { document.dispatchEvent(new Event('visibilitychange')); await settle(); };
    app.redirects = redirects;
    return app;
}

test('ordinary disconnects automatically retry with backoff and fresh tickets until recovery', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        app.fail(2); app.transports[0].close(1006);
        assert.equal(app.prompt().open, true);
        await app.tick(999); assert.equal(app.transports.length, 1);
        await app.tick(1); assert.equal(app.transports.length, 2);
        await app.tick(1999); assert.equal(app.transports.length, 2);
        await app.tick(1); assert.equal(app.transports.length, 3);
        await app.tick(4000); assert.equal(app.transports.length, 4);
        assert.equal(app.view().isConnected, true);
        assert.equal(app.view().connectionId, 'connection-4');
        assert.equal(app.prompt().open, false);
        assert.equal(new Set(app.transports.map(item => item.url)).size, 4);
        assert.equal(app.flushes(), 2);
        assert.equal(app.timers(), 0);
    } finally { cleanup(); }
});

test('a server restart keeps retrying after the first failed attempt', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        app.fail(1); app.transports[0].close(1012);
        await app.tick(1000); assert.equal(app.view().isConnected, false);
        await app.tick(2000); assert.equal(app.view().isConnected, true);
        assert.equal(app.transports.length, 3);
    } finally { cleanup(); }
});

test('long outages cap the retry interval at thirty seconds and retain only one timer', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        app.fail(20); app.transports[0].close(1006);
        for (const delay of [1000, 2000, 4000, 8000, 16000, 30000, 30000]) {
            const before = app.transports.length;
            assert.equal(app.timers(), 1);
            await app.tick(delay - 1); assert.equal(app.transports.length, before);
            await app.tick(1); assert.equal(app.transports.length, before + 1);
        }
        assert.equal(app.view().isConnected, false);
    } finally { cleanup(); }
});

test('initial socket and ticket failures both enter automatic recovery', async () => {
    for (const failure of ['socket', 'ticket']) {
        const app = harness();
        if (failure === 'socket') app.fail(1); else app.failTicket(new Error('HTTP unavailable'));
        const cleanup = await app.start();
        try {
            assert.equal(app.view().isConnected, false);
            assert.equal(app.prompt().open, true);
            app.failTicket(null); await app.tick(1000);
            assert.equal(app.view().isConnected, true);
        } finally { cleanup(); }
    }
});

test('manual retry bypasses the delay and shares pending ticket preparation with all callers', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        app.transports[0].close(1006);
        const release = app.deferTicket(), attempt = app.retry();
        assert.equal(app.retry(), attempt);
        assert.equal(app.timers(), 0);
        assert.equal(app.preparations(), 2);
        await app.tick(30000); assert.equal(app.transports.length, 1);
        release(); await attempt;
        assert.equal(app.transports.length, 2);
        assert.equal(app.prompt().open, false);
    } finally { cleanup(); }
});

test('network restoration and returning to the page resume only one disconnected connection', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        await app.network(false); app.transports[0].close(1006);
        await app.tick(60000); assert.equal(app.transports.length, 1);
        await app.network(true); assert.equal(app.transports.length, 2);
        await app.focus(); await app.visible(); assert.equal(app.transports.length, 2);
        app.transports[1].close(1006); await app.focus();
        assert.equal(app.transports.length, 3);
        assert.equal(app.timers(), 0);
    } finally { cleanup(); }
});

test('authentication expiry and normal closure never enter an automatic retry loop', async () => {
    for (const code of [4401, 1000]) {
        const app = harness(), cleanup = await app.start();
        try {
            app.transports[0].close(code);
            await app.tick(60000); await app.focus(); await app.network(true);
            assert.equal(app.transports.length, 1);
            assert.equal(app.redirects.length, code === 4401 ? 1 : 0);
            if (code === 1000) { await app.retry(); assert.equal(app.view().isConnected, true); }
        } finally { cleanup(); }
    }
});

test('expired HTTP credentials stop retrying instead of continuously minting tickets', async () => {
    const app = harness(); app.failTicket(Object.assign(new Error('login expired'), { code: 401 }));
    const cleanup = await app.start();
    try {
        await app.tick(60000); await app.focus();
        assert.equal(app.preparations(), 1);
        assert.equal(app.redirects.length, 1);
    } finally { cleanup(); }
});

test('late close and message callbacks from a replaced socket cannot clear the new connection', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        const callbacks = app.transports[0].options;
        app.transports[0].close(1006); await app.retry();
        const count = app.received.length;
        callbacks.onClose({ code: 1006 }); callbacks.onEvent({ event: 'chat.delta', payload: { text: 'stale' } });
        assert.equal(app.view().isConnected, true);
        assert.equal(app.channel(), app.transports[1]);
        assert.equal(app.received.length, count);
        assert.equal(app.timers(), 0);
    } finally { cleanup(); }
});

test('unmount cancels retries and a pending ticket cannot reopen the disposed provider', async () => {
    const app = harness(), release = app.deferTicket();
    const cleanup = await app.start(); cleanup(); release(); await settle();
    assert.equal(app.transports.length, 0);
    assert.equal(app.timers(), 0);
    await assert.rejects(app.retry(), /No active/);
});

test('StrictMode remount owns its attempt while the old ticket preparation finishes', async () => {
    const app = harness(), release = app.deferTicket();
    const firstCleanup = await app.start(); firstCleanup();
    const secondCleanup = await app.start();
    try {
        release(); await settle();
        assert.equal(app.transports.length, 1);
        assert.equal(app.channel(), app.transports[0]);
        assert.equal(app.view().isConnected, true);
    } finally { secondCleanup(); }
});

test('backend changes invalidate delayed retries and pending ticket preparation', async () => {
    const app = harness(), cleanup = await app.start();
    try {
        app.transports[0].close(1006);
        const release = app.deferTicket(), attempt = app.retry();
        app.changeBackend(); release();
        await assert.rejects(attempt, /Backend changed|disposed/);
        await app.tick(60000);
        assert.equal(app.transports.length, 1);
        assert.equal(app.timers(), 0);
    } finally { cleanup(); }
});
