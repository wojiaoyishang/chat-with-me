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
let channel=null;
const getRealtimeTransport=()=>channel;
const setRealtimeTransport=value=>{channel=value};
const flushRealtimeEvents=()=>{};
const shown=[];
const FatalErrorPopoverElement={show:config=>shown.push(config)};
const WebSocketReconnectPrompt='reconnect-prompt';
let fail=false, transports=[];
class WebSocketTransport {
 constructor(url,options){this.options=options;this.isOpen=false;transports.push(this);}
 async connect(){if(fail){this.options.onClose({code:1006});throw new Error('offline');}this.isOpen=true;this.options.onOpen();return this;}
 close(code=1000){this.isOpen=false;this.options.onClose({code});}
}
${source}
exports.render=()=>{stateIndex=0;refIndex=0;effects=[];return WebSocketProvider({children:null})};
exports.initialize=()=>effects[0]();
exports.transports=transports;
exports.shown=shown;
exports.fail=value=>{fail=value};
`,{loader:'jsx',format:'cjs',jsx:'automatic'}).code;
const context={require:createRequire(import.meta.url),exports:{},console,window:{location:{pathname:'/chat'}}};
vm.runInNewContext(script,context);
test('dismissed disconnect dialog leaves a reminder through failure and clears it on reconnect',async()=>{
 const app=context.exports;
 const prompt=()=>app.render().props.children[1].props;
 app.render();app.initialize();await Promise.resolve();
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
});
