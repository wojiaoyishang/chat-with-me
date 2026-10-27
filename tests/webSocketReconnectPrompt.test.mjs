import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { transformSync } from 'esbuild';
import { test } from 'node:test';
const source = fs.readFileSync(new URL('../src/context/WebSocketContext.jsx', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replaceAll('export const ', 'const ').replaceAll('import.meta.env.DEV', 'false');
const script = transformSync(`
const React = require('react');
const createContext = () => ({Provider: 'provider'});
const useContext = () => null;
let stateIndex=0, refIndex=0, states=[], refs=[], effects=[];
const useState = (value) => { const index=stateIndex++; if(!(index in states))states[index]=value;return [states[index], value=>{states[index]=typeof value==='function'?value(states[index]):value;}]; };
const useRef = (value) => { const index=refIndex++; return refs[index] ||= {current:value}; };
const useEffect = (effect) => effects.push(effect);
const useTranslation = () => ({t:key=>key});
const toast = {promise:()=>{}};
const EventName = {};
const emitEvent = () => {};
const dispatchIncomingEvent = () => {};
const globalMessageCallback = () => {};
const apiClient = {};
const apiEndpoint = {};
const WEBSOCKET_URL='ws://test';
let backendEpoch=0, pendingTicket=null, ticketPreparations=0;
const getBackendConnection=()=>({id:'backend-a',epoch:backendEpoch});
const isCurrentConnection=scope=>scope?.id==='backend-a'&&scope?.epoch===backendEpoch;
const authenticatedSocketUrl=async()=>{ticketPreparations++;if(pendingTicket)await pendingTicket;return 'ws://test?ticket=scoped-one-time-ticket';};
let channel=null;
const getRealtimeTransport=()=>channel;
const setRealtimeTransport=value=>{channel=value};
const flushRealtimeEvents=()=>{};
const shown=[];
const FatalErrorPopoverElement={show:config=>shown.push(config)};
const WebSocketReconnectPrompt='reconnect-prompt';
let fail=false, transports=[];
class WebSocketTransport {
 constructor(url,options){this.url=url;this.options=options;this.isOpen=false;transports.push(this);}
 async connect(){if(fail){this.options.onClose({code:1006});throw new Error('offline');}this.isOpen=true;this.options.onOpen();return this;}
 close(code=1000){this.isOpen=false;this.options.onClose({code});}
}
${source}
exports.render=()=>{stateIndex=0;refIndex=0;effects=[];return WebSocketProvider({children:null})};
exports.initialize=()=>effects[0]();
exports.transports=transports;
exports.shown=shown;
exports.fail=value=>{fail=value};
exports.preparations=()=>ticketPreparations;
exports.changeBackend=()=>{backendEpoch++;};
exports.deferTicket=()=>{let release;pendingTicket=new Promise(resolve=>{release=resolve;});return ()=>{pendingTicket=null;release();};};
`,{loader:'jsx',format:'cjs',jsx:'automatic'}).code;
const harness=()=>{
 const context={require:createRequire(import.meta.url),exports:{},console,window:{location:{pathname:'/chat'}}};
 vm.runInNewContext(script,context);
 return context.exports;
};
test('dismissed disconnect dialog leaves a reminder through failure and clears it on reconnect',async()=>{
 const app=harness();
 const prompt=()=>app.render().props.children[1].props;
 app.render();app.initialize();await new Promise(setImmediate);
 assert.equal(app.transports[0].url,'ws://test?ticket=scoped-one-time-ticket');
 app.transports[0].close(1006);
 assert.equal(app.shown.length,1);
 app.shown[0].onClose();
 assert.equal(prompt().open,true);
 app.fail(true);
 await assert.rejects(prompt().onRetry(),/offline/);
 assert.equal(prompt().open,true);
 assert.equal(app.shown.length,1,'failed retry keeps reminder instead of reopening blocking dialog');
 app.fail(false);
 await prompt().onRetry();
 assert.equal(prompt().open,false);
 assert.equal(app.preparations(),3,'each new socket obtains its own scoped ticket');
});

test('ticket preparation is shared and a backend change prevents the old socket from opening',async()=>{
 const app=harness();
 const prompt=()=>app.render().props.children[1].props;
 app.render();app.initialize();await new Promise(setImmediate);
 app.transports[0].close(1006);app.shown[0].onClose();
 const release=app.deferTicket();
 const attempt=prompt().onRetry();
 assert.equal(prompt().onRetry(),attempt);
 await Promise.resolve();
 assert.equal(app.transports.length,1,'no socket opens before its credential is ready');
 assert.equal(app.preparations(),2);
 app.changeBackend();release();
 await assert.rejects(attempt,/Backend changed/);
 assert.equal(app.transports.length,1,'a prepared credential cannot cross the connection boundary');
 assert.equal(prompt().open,true);
});
