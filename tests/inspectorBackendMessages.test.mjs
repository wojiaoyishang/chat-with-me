import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { afterEach, test } from 'node:test';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';
import { transformSync } from 'esbuild';

const root = '../src/features/chat/page/components/';
const source = fs.readFileSync(new URL(`${root}InspectorBackendMessages.jsx`, import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export default function', 'function');
const highlight = fs.readFileSync(new URL(`${root}InspectorHighlight.jsx`, import.meta.url), 'utf8').replace('export default function', 'function');
const cacheSource = fs.readFileSync(new URL(`${root}inspectorReadCache.js`, import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export function', 'function');
const context = { require: createRequire(import.meta.url), exports: {}, AbortController, setTimeout, clearTimeout,
    connection: 'default', userId: '1',
    getBackendConnection: () => ({ id: context.connection }), getConnectionUserId: () => context.userId,
    isCurrentConnection: (scope) => scope.id === context.connection,
    apiEndpoint: { CHAT_RUNTIME_TIMELINE_ENDPOINT: '/inspector' }, apiClient: { get: (...args) => context.get(...args) } };
const code = transformSync(`
const {useCallback,useEffect,useMemo,useRef,useState} = require('react');
const ChevronDown=()=>null, ChevronLeft=()=>null, ChevronRight=()=>null, Loader2=()=>null, Search=()=>null;
const Input=(props)=><input {...props}/>;
const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;
const Badge=({children})=><span>{children}</span>;
const InspectorMediaBadges=()=>null, InspectorAttachments=()=>null;
const Virtuoso=({data,itemContent})=><div>{data.map((item,index)=><div key={item.partId}>{itemContent(index,item)}</div>)}</div>;
${highlight}
${cacheSource}
${source}
exports.Browser=InspectorBackendMessages; exports.createCache=createInspectorReadCache;
`, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
vm.runInNewContext(code, context);
const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost' });
globalThis.window=dom.window;
globalThis.document=dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const { createRoot } = await import('react-dom/client');
let mounted;
afterEach(async()=>{ if(mounted) await act(()=>mounted.unmount()); mounted=null; context.connection='default'; context.userId='1'; });
const item=(index=0)=>({partId:`backend-${index}`, role:'tool', orderIndex:index, messageId:'a', source:'conversation', sourceRef:'a', contentPreview:`preview ${index}`, contentChars:100, reasoningChars:0});
const section=(items=[item()])=>({conversationId:'c',revision:'rev',items,offset:0,limit:50,total:120,totalItems:120,nextOffset:50,query:'',notice:'current branch'});
const click=async(element)=>{ assert.ok(element); await act(async()=>element.dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true}))); };
const toggle=async(element)=>{ await act(async()=>{ element.open=true; element.dispatchEvent(new dom.window.Event('toggle')); }); };
const mount=async(value)=>{mounted=createRoot(document.getElementById('root')); await act(()=>mounted.render(React.createElement(context.exports.Browser,{section:value})));};

test('opening the list reads no bodies; expanding one item fetches it once; protocol and shared source stay lazy',async()=>{
    const calls=[];
    context.get=async(_,{params})=>{
        calls.push(params);
        if(params.action==='backend-message') return {item:{...item(),content:'actual complete body',reasoningContent:''}};
        if(params.action==='backend-payload') return {text:'raw protocol needle',offset:0,nextOffset:null,totalChars:19};
        throw new Error('unexpected read');
    };
    await mount(section());
    assert.match(document.body.textContent,/preview 0/);
    assert.equal(calls.length,0);
    await click(document.querySelector('[aria-label="查看后端消息 1"]'));
    assert.equal(calls.length,1);
    assert.match(document.body.textContent,/actual complete body/);
    assert.doesNotMatch(document.body.textContent,/raw protocol needle/);
    await toggle([...document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent==='Provider 消息载荷'));
    assert.equal(calls.at(-1).action,'backend-payload');
    assert.equal(calls.at(-1).field,'provider');
    assert.match(document.body.textContent,/raw protocol needle/);
    await click(document.querySelector('[aria-label="查看后端消息 1"]'));
    await click(document.querySelector('[aria-label="查看后端消息 1"]'));
    assert.equal(calls.filter(call=>call.action==='backend-message').length,1);
});

test('search reaches unloaded rows on the server and stale search responses cannot overwrite a new query',async()=>{
    const calls=[]; const pending=[];
    context.get=async(_,{params,signal})=>{
        calls.push({params,signal});
        return new Promise(resolve=>pending.push({params,resolve}));
    };
    await mount(section());
    const input=document.querySelector('input');
    const setQuery=async(value)=>{await act(()=>{Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(input,value); input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));});};
    await setQuery('first');
    await act(()=>new Promise(resolve=>setTimeout(resolve,280)));
    assert.equal(calls[0].params.query,'first');
    assert.equal(calls[0].params.revision,'rev');
    await setQuery('second');
    await act(()=>new Promise(resolve=>setTimeout(resolve,280)));
    assert.equal(calls[0].signal.aborted,true);
    await act(()=>pending[1].resolve({section:{...section([{...item(80),matchPreview:'second needle'}]),total:1,query:'second',nextOffset:null}}));
    await act(()=>pending[0].resolve({section:{...section([{...item(70),matchPreview:'stale first'}]),total:1,query:'first',nextOffset:null}}));
    assert.match(document.body.textContent,/second needle/);
    assert.doesNotMatch(document.body.textContent,/stale first/);
    await setQuery('');
    assert.match(document.body.textContent,/preview 0/);
});

test('next page sends only pagination; search and detail requests are cancelled on unmount',async()=>{
    const calls=[];
    context.get=async(_,{params,signal})=>{calls.push({params,signal});return {section:{...section([item(50)]),offset:50,nextOffset:100}};};
    await mount(section());
    await click([...document.querySelectorAll('button')].find(el=>el.textContent.includes('下一页')));
    assert.equal(calls[0].params.offset,50);
    assert.match(document.body.textContent,/preview 50/);
    context.get=async(_,{params,signal})=>{calls.push({params,signal});return new Promise(()=>{});};
    await click(document.querySelector('[aria-label="查看后端消息 51"]'));
    await act(()=>mounted.unmount()); mounted=null;
    assert.equal(calls.at(-1).signal.aborted,true);
});

test('read cache drops transport cycles and enforces its capacity',async()=>{
    let calls=0;
    context.get=async()=>{calls++;const response={text:'payload'};response._response={data:response};return response;};
    const cache=context.exports.createCache({maxEntries:2,maxBytes:1000});
    const value=await cache.read({id:1});
    assert.equal(value._response,undefined);
    await cache.read({id:1});
    assert.equal(calls,1);
    await cache.read({id:2});
    await cache.read({id:3});
    await cache.read({id:1});
    assert.equal(calls,4);
    const small=context.exports.createCache({maxBytes:2});
    await small.read({id:1}); await small.read({id:1});
    assert.equal(calls,6);
});

test('cached diagnostics cannot be reused after changing backend or account', async()=>{
    context.get=async()=>({text:'private'});
    const cache=context.exports.createCache();
    await cache.read({id:1});
    context.connection='other';
    await assert.rejects(()=>cache.read({id:1}),/连接或账户已变更/);
    const second=context.exports.createCache();
    context.userId='2';
    await assert.rejects(()=>second.read({id:1}),/连接或账户已变更/);
});
