import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY as key, KNOWLEDGE_GRAPH_PHYSICS_ANIMATION_SETTING_KEY as physicsKey } from '../src/features/knowledge/graphSettings.js';
import {
    WORKFLOW_EDGE_ANIMATION_SETTING_KEY as workflowKey,
    DEFAULT_WORKFLOW_EDGE_ANIMATION,
} from '../src/features/workflows/workflowSettings.js';

await build({
    stdin: { contents: `export {default as Settings} from './src/pages/SettingPage.jsx';
        export {default as Management} from './src/features/tasks/BackendManagementPage.jsx';
        export {default as Graph} from './src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx';
        export {setLocalSetting,getLocalSetting} from './src/lib/tools.jsx';`, resolveDir: process.cwd() },
    outfile: 'temp/graph-animation-settings-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', loader: { '.css': 'empty' },
    plugins: [{ name: 'preferences-integration', setup(builder) {
        const real = new Set(['@/lib/tools.jsx', '@/features/knowledge/graphSettings.js', '@/features/knowledge/graphHistory.js', '@/features/workflows/workflowSettings.js', '@/features/avatar-scene/settings.js']);
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => real.has(name)
            ? { path: path.resolve('src', name.slice(2)) } : { path: name, namespace: 'fixture' });
        builder.onResolve({ filter: /chatKnowledgeGraphRenderer\.js$/ }, () => ({ path: 'graph-renderer', namespace: 'fixture' }));
        builder.onResolve({ filter: /^(framer-motion|react-i18next|sonner)$/ }, ({ path: name }) => ({ path: name, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: name }) => {
            let contents = 'export default ()=>null;';
            if (name === 'graph-renderer') contents = `export function createChatKnowledgeGraph(_svg,options){
                const graph={options,preferences:[],physicsPreferences:[],setData(){},setPhysics(value){this.physicsPreferences.push(value);this.options.onPhysicsChange?.(value)},setEdgeAnimation(value){this.preferences.push(value)},destroy(){this.destroyed=true}};
                globalThis.graphPreferencesTest.instances.push(graph);options.onReady();return graph;}`;
            else if (name === '@/context/LazyVisibility.jsx') contents = 'export default ({children})=>children;';
            else if (name === '@/lib/apiClient.js' || name === '@/lib/apiClient') contents = 'export default {get:async()=>[]};export const isAuthRedirectError=()=>false;';
            else if (name === '@/config.js') contents = 'export const BASE_BACKEND_URL="/api";export const apiEndpoint={SETTING_TABS_ENDPOINT:"/settings"};';
            else if (name === '@/context/userContext.jsx') contents = 'const setUser=()=>{};export const useUserStore=()=>({setUser});';
            else if (name === '@/context/useEventStore.jsx') contents = 'export const onEvent=()=>({then:()=>()=>{}});';
            else if (name === '@/lib/browserHistoryLayers.js') contents = 'export const useBrowserBackLayer=()=>{};';
            else if (name === '@/components/setting/jsonEditorValidation.js') contents = 'export const validateJsonEditors=()=>true;';
            else if (name === '@/lib/virtualUrl.js') contents = 'export const artifactPreviewVirtualUrl=()=>"";export const resolveResourceUrl=value=>value;';
            else if (name === '@/components/setting/UserProfileCard.jsx') contents = 'export const UserProfileCard=()=>null;';
            else if (name === 'react-i18next') contents = 'const t=key=>key;export const useTranslation=()=>({t});';
            else if (name === 'sonner') contents = 'export const toast={error(){},info(){}};';
            else if (name === 'framer-motion') contents = `const Div=({initial,animate,exit,transition,...props})=><div {...props}/>;export const motion={div:Div};export const AnimatePresence=({children})=>children;`;
            else if (name === '@/components/ui/switch') contents = 'export const Switch=({checked,onCheckedChange,...props})=><button type="button" role="switch" aria-checked={Boolean(checked)} onClick={()=>onCheckedChange(!checked)} {...props}/>;';
            else if (name === '@/components/ui/separator') contents = 'export const Separator=()=> <hr/>;';
            else if (name === '@/components/ui/badge') contents = 'export const Badge=({variant,...props})=> <span {...props}/>;';
            else if (name === '@/components/ui/button') contents = 'export const Button=({variant,size,...props})=><button {...props}/>;';
            else if (name === '@/components/ui/card') contents = 'export const Card=({children,...props})=><div {...props}>{children}</div>;export const CardContent=Card,CardDescription=Card,CardHeader=Card,CardTitle=Card;';
            else if (name === '@/components/ui/dialog') contents = 'export const Dialog=({open,children})=>open?<div>{children}</div>:null;export const DialogContent=({children,...props})=><div {...props}>{children}</div>;export const DialogDescription=DialogContent,DialogFooter=DialogContent,DialogHeader=DialogContent,DialogTitle=DialogContent;';
            else if (name === '@/components/ui/select') contents = 'export const Select=({children})=>children;export const SelectTrigger=({children,...props})=><span {...props}>{children}</span>;export const SelectValue=()=>null;export const SelectContent=({children})=><div>{children}</div>;export const SelectItem=({children})=><span>{children}</span>;';
            return { loader: 'jsx', contents };
        });
    } }],
});
const { Settings, Management, Graph, setLocalSetting, getLocalSetting } = await import('../temp/graph-animation-settings-test.mjs');

async function workspace(t, storedValue) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/knowledge', pretendToBeVisual: true });
    const globals = ['window','document','localStorage','CustomEvent','IS_REACT_ACT_ENVIRONMENT','graphPreferencesTest'];
    const previous = new Map(globals.map(name => [name,Object.getOwnPropertyDescriptor(globalThis,name)]));
    Object.assign(globalThis, { window:dom.window,document:dom.window.document,localStorage:dom.window.localStorage,CustomEvent:dom.window.CustomEvent,IS_REACT_ACT_ENVIRONMENT:true,graphPreferencesTest:{instances:[]} });
    dom.window.matchMedia = () => ({ matches:false });
    if (storedValue !== undefined) setLocalSetting(key,storedValue);
    const root=createRoot(document.getElementById('root')), registrations = new Map();
    const msg={id:'message',network:{nodes:[{id:'first',name:'知识',label:'Event'}],relationships:[]},registerComponent:(name,value)=>registrations.set(name,value),getComponent:name=>registrations.get(name),unregisterComponent:name=>registrations.delete(name)};
    const render=async(show=true)=>act(async()=>{root.render(React.createElement(MemoryRouter,{initialEntries:['/knowledge']},show ? React.createElement(React.Fragment,null,
        React.createElement(Settings,{open:true,onClose:()=>{}}),React.createElement(Management,{kind:'knowledge'}),React.createElement(Graph,{msg})) : null));});
    await render();
    const sent=[], frame=document.querySelector('iframe');
    frame.contentWindow.postMessage=(data,origin)=>sent.push({data,origin});
    const ready=async(origin='http://localhost',source=frame.contentWindow)=>act(async()=>window.dispatchEvent(new dom.window.MessageEvent('message',{origin,source,data:{type:'cwm.knowledge-ready'}})));
    t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const [name,descriptor] of previous)descriptor?Object.defineProperty(globalThis,name,descriptor):delete globalThis[name];});
    return {dom,render,frame,sent,ready,instances:globalThis.graphPreferencesTest.instances,registrations};
}

test('default-on interface toggle persists and updates an existing chat graph and knowledge iframe without remounting',async t=>{
    const ui=await workspace(t);const instance=ui.instances[0];
    assert.equal(instance.options.edgeAnimation,true);assert.equal(ui.registrations.get('nvlInstance'),instance);
    await act(async()=>[...document.querySelectorAll('button')].find(button=>button.textContent==='Settings.Interface').click());
    const toggle=document.querySelector('[role="switch"][aria-label="知识图谱关系动画"]');assert.equal(toggle.getAttribute('aria-checked'),'true');
    await act(async()=>ui.frame.dispatchEvent(new ui.dom.window.Event('load')));
    assert.deepEqual(ui.sent.at(-1),{data:{type:'cwm.graph-preferences',edgeAnimation:true,physicsAnimation:true},origin:'http://localhost'});
    await act(async()=>toggle.click());
    assert.equal(getLocalSetting(key),false);assert.equal(toggle.getAttribute('aria-checked'),'false');
    assert.equal(ui.instances.length,1);assert.equal(instance.preferences.at(-1),false);assert.equal(document.querySelector('iframe'),ui.frame);
    assert.deepEqual(ui.sent.at(-1),{data:{type:'cwm.graph-preferences',edgeAnimation:false,physicsAnimation:true},origin:'http://localhost'});
    await act(async()=>toggle.click());assert.equal(getLocalSetting(key),true);assert.equal(instance.preferences.at(-1),true);assert.equal(ui.instances.length,1);
});

test('stored-off preference initializes new graphs and survives iframe load and trusted ready handshakes',async t=>{
    const ui=await workspace(t,false);assert.equal(ui.instances[0].options.edgeAnimation,false);
    await act(async()=>ui.frame.dispatchEvent(new ui.dom.window.Event('load')));
    const before=ui.sent.length;await ui.ready('https://wrong.invalid');await ui.ready('http://localhost',window);
    assert.equal(ui.sent.length,before,'Untrusted iframe events cannot trigger the bridge');
    await ui.ready();assert.equal(ui.sent.at(-1).data.edgeAnimation,false);
    await act(async()=>ui.frame.dispatchEvent(new ui.dom.window.Event('load')));assert.equal(ui.sent.at(-1).data.edgeAnimation,false);
    await ui.render(false);await ui.render();assert.equal(ui.instances.at(-1).options.edgeAnimation,false);assert.equal(getLocalSetting(key),false);
});

test('cross-tab preference changes update chat and knowledge controls without resetting the current graph',async t=>{
    const ui=await workspace(t),instance=ui.instances[0];
    await act(async()=>{localStorage.setItem('LocalSetting',JSON.stringify({[key]:'false'}));window.dispatchEvent(new ui.dom.window.StorageEvent('storage',{key:'LocalSetting',newValue:localStorage.getItem('LocalSetting')}));});
    assert.equal(instance.preferences.at(-1),false);assert.equal(ui.instances.length,1);assert.equal(document.querySelector('iframe'),ui.frame);
    assert.deepEqual(ui.sent.at(-1).data,{type:'cwm.graph-preferences',edgeAnimation:false,physicsAnimation:true});
});

test('workflow connection animation is enabled by default and its interface toggle persists',async t=>{
    const ui=await workspace(t);
    assert.equal(DEFAULT_WORKFLOW_EDGE_ANIMATION,true);
    await act(async()=>[...document.querySelectorAll('button')].find(button=>button.textContent==='Settings.Interface').click());
    const toggle=document.querySelector('[role="switch"][aria-label="工作流连线动画"]');
    assert.equal(toggle.getAttribute('aria-checked'),'true');
    await act(async()=>toggle.click());
    assert.equal(getLocalSetting(workflowKey),false);
    assert.equal(toggle.getAttribute('aria-checked'),'false');
    await ui.render(false);
    await ui.render();
    await act(async()=>[...document.querySelectorAll('button')].find(button=>button.textContent==='Settings.Interface').click());
    assert.equal(document.querySelector('[role="switch"][aria-label="工作流连线动画"]').getAttribute('aria-checked'),'false');
});


test('node physics uses tools local settings across chat, trusted iframe messages and reloads', async t => {
    const ui = await workspace(t), instance = ui.instances[0];
    assert.equal(instance.physicsPreferences.at(-1), true);
    const notify = (enabled, source = ui.frame.contentWindow, origin = 'http://localhost') => window.dispatchEvent(new ui.dom.window.MessageEvent('message', {
        source, origin, data: {type:'cwm.graph-physics-change', enabled},
    }));
    await act(async()=>{ notify(false, window); notify(false, ui.frame.contentWindow, 'https://untrusted.invalid'); });
    assert.equal(getLocalSetting(physicsKey, true), true, 'untrusted events cannot alter persisted preferences');
    await act(async()=>notify(false));
    assert.equal(getLocalSetting(physicsKey), false); assert.equal(instance.physicsPreferences.at(-1), false);
    assert.equal(ui.sent.at(-1).data.physicsAnimation, false); assert.equal(ui.instances.length, 1);
    await ui.render(false); await ui.render();
    assert.equal(ui.instances.at(-1).physicsPreferences.at(-1), false, 'remount uses the persisted choice');
    const currentFrame = document.querySelector('iframe'); currentFrame.contentWindow.postMessage = (data, origin) => ui.sent.push({data, origin});
    await act(async()=>[...document.querySelectorAll('button')].find(button=>button.textContent==='启用动画').click());
    assert.equal(getLocalSetting(physicsKey), true); assert.equal(ui.sent.at(-1).data.physicsAnimation, true);
    await act(async()=>{ localStorage.setItem('LocalSetting', JSON.stringify({[physicsKey]:'false'})); window.dispatchEvent(new ui.dom.window.StorageEvent('storage',{key:'LocalSetting'})); });
    assert.equal(ui.instances.at(-1).physicsPreferences.at(-1), false); assert.equal(ui.sent.at(-1).data.physicsAnimation, false);
});
