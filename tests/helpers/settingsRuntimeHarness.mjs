import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

const bootstrap = new JSDOM('<div></div>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'Event', 'CustomEvent', 'MutationObserver']) globalThis[key] = bootstrap.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { createRoot } = await import('react-dom/client');

const bundlePath = `temp/settings-runtime-ui-${process.pid}.mjs`;
await build({ stdin: { contents: "export {default} from './src/components/setting/DynamicSettings.jsx';export {default as SettingPage} from './src/pages/SettingPage.jsx';export {default as BootstrapGate} from './src/runtime/backend/BackendBootstrapGate.jsx';export {registerSettingsComponent} from './src/features/settings-runtime/registry.js';", resolveDir: process.cwd() }, outfile: bundlePath, bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', plugins: [{ name: 'settings-ui', setup(builder) {
    builder.onResolve({ filter: /^(react(?:\/|$)|react-dom(?:\/|$))/ }, ({ path: name }) => ({ path: name, external: true }));
    builder.onResolve({ filter: /(?:apiClient\.js|session\.js|connection\.js|components\/ui\/[^/]+)$/ }, ({ path: name, importer }) => {
        if (!importer.endsWith('BackendBootstrapGate.jsx')) return null;
        if (name.endsWith('/session.js')) return { path: 'bootstrap-session', namespace: 'mock' };
        if (name.endsWith('/connection.js')) return { path: '@/runtime/backend/connection.js', namespace: 'mock' };
        if (name.endsWith('/apiClient.js')) return { path: '@/lib/apiClient.js', namespace: 'mock' };
        return { path: `@/components/ui/${name.split('/').at(-1)}`, namespace: 'mock' };
    });
    builder.onResolve({ filter: /^sonner$|^react-i18next$|^framer-motion$|^react-router-dom$/ }, ({ path: name }) => ({ path: name, namespace: 'mock' }));
    builder.onResolve({ filter: /^@\// }, ({ path: name }) => {
        if (name.includes('/components/ui/') || name.endsWith('/apiClient.js') || name.endsWith('/clientAdapter.js') || name.endsWith('/extensions.jsx') || name.endsWith('/useEventStore.jsx') || name.endsWith('/virtualUrl.js') || name.endsWith('/tools.jsx') || name.endsWith('/connection.js') || name.endsWith('/browserHistoryLayers.js') || name.endsWith('/userContext.jsx')) return { path: name, namespace: 'mock' };
        return { path: path.resolve('src', name.slice(2)) };
    });
    builder.onResolve({ filter: /JsonConfigEditor\.jsx$/ }, () => ({ path: 'json-editor', namespace: 'mock' }));
    builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => {
        if (name === 'bootstrap-session') return { loader: 'js', contents: 'export const ensureClientSession=async()=>{globalThis.settingsUI.sessionChecks=(globalThis.settingsUI.sessionChecks||0)+1;if(globalThis.settingsUI.sessionError)throw globalThis.settingsUI.sessionError;};' };
        if (name === 'sonner') return { loader: 'js', contents: 'export const toast={error:(...args)=>globalThis.settingsUI.errors.push(args),success:()=>{},info:()=>{}};' };
        if (name === 'react-i18next') return { loader: 'js', contents: 'const t=(key,options)=>options?.defaultValue??key;export const useTranslation=()=>({t});' };
        if (name === 'react-router-dom') return { loader: 'js', contents: 'export const useNavigate=()=>path=>globalThis.settingsUI.navigated.push(path);' };
        if (name === 'framer-motion') return { loader: 'jsx', contents: 'import React,{forwardRef} from "react";const cache={};export const motion=new Proxy({}, {get(_,tag){return cache[tag]||(cache[tag]=forwardRef(({children,initial,animate,exit,transition,layout,...props},ref)=>React.createElement(tag,{...props,ref},children)));}});export const AnimatePresence=({children})=><>{children}</>;' };
        if (name.endsWith('/apiClient.js')) return { loader: 'js', contents: 'export default Object.fromEntries(["get","post","put","patch","delete"].map(method=>[method,(...args)=>globalThis.settingsUI.api(method,...args)]));' };
        if (name.endsWith('/tools.jsx')) return { loader: 'js', contents: 'export const useIsMobile=()=>false;export const getLocalSetting=(_key,fallback)=>fallback;export const setLocalSetting=()=>{};' };
        if (name.endsWith('/connection.js')) return { loader: 'js', contents: 'export const BACKEND_MANAGE_EVENT="cwm:backend-manage";export const getBackendService=()=>globalThis.settingsUI.service;export const beforeBackendSwitch=()=>()=>{};export const subscribeBackend=()=>()=>{};export const getBackendConnection=()=>({id:"default",epoch:0,title:"测试后端",url:"/api"});export const setBackendManifest=value=>{globalThis.settingsUI.manifest=value;};' };
        if (name.endsWith('/browserHistoryLayers.js')) return { loader: 'js', contents: 'export const useBrowserBackLayer=()=>{};' };
        if (name.endsWith('/userContext.jsx')) return { loader: 'js', contents: 'const user={setUser:value=>{globalThis.settingsUI.user=value;}};export const useUserStore=selector=>selector(user);' };
        if (name.endsWith('/clientAdapter.js')) return { loader: 'js', contents: 'export default {read:async key=>key==="backends"?{items:globalThis.settingsUI.backendProfiles||[]}:undefined,write:async(...args)=>{(globalThis.settingsUI.localWrites||=[]).push(args);},invoke:async(...args)=>{(globalThis.settingsUI.clientCalls||=[]).push(args);return {};},subscribe:()=>()=>{}};' };
        if (name.endsWith('/extensions.jsx')) return { loader: 'js', contents: '' };
        if (name.endsWith('/useEventStore.jsx')) return { loader: 'js', contents: 'export const onEvent=()=>({then:()=>()=>{}});' };
        if (name.endsWith('/virtualUrl.js')) return { loader: 'js', contents: 'export const resolveResourceUrl=value=>value;' };
        if (name === 'json-editor') return { loader: 'jsx', contents: 'export default function Editor({value,onChange,label,readOnly}){return <textarea aria-label={label} readOnly={readOnly} value={JSON.stringify(value)} onChange={event=>onChange(JSON.parse(event.target.value))}/>;}' };
        if (name.endsWith('/useConfirmation.jsx')) return { loader: 'jsx', contents: `import React,{useCallback,useEffect,useRef,useState} from 'react'; export const useConfirmation=()=>{const [value,setValue]=useState(null);const pending=useRef();useEffect(()=>()=>pending.current?.(false),[]);const finish=(accepted)=>{const callback=pending.current;pending.current=null;setValue(null);callback?.(accepted);};const confirm=useCallback(options=>{globalThis.settingsUI.confirmations.push(options);if(globalThis.settingsUI.autoConfirm!==false)return Promise.resolve(true);return new Promise(resolve=>{pending.current=resolve;setValue(options);});},[]);return [confirm,value?<div role="alertdialog"><h2>{value.title}</h2><p>{value.description}</p><button onClick={()=>finish(false)}>取消</button><button onClick={()=>finish(true)}>{value.confirmText||'确认'}</button></div>:null];};` };
        if (name.endsWith('/input')) return { loader: 'jsx', contents: 'export const Input=props=><input {...props}/>;' };
        if (name.endsWith('/button')) return { loader: 'jsx', contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;' };
        if (name.endsWith('/badge')) return { loader: 'jsx', contents: 'export const Badge=({children,variant,...props})=><span {...props}>{children}</span>;' };
        if (name.endsWith('/card')) return { loader: 'jsx', contents: 'export const Card=({children,...props})=><section data-slot="card" {...props}>{children}</section>;export const CardContent=({children,...props})=><div {...props}>{children}</div>;export const CardHeader=CardContent;export const CardTitle=({children,...props})=><h3 {...props}>{children}</h3>;export const CardDescription=({children,...props})=><p {...props}>{children}</p>;' };
        if (name.endsWith('/dialog')) return { loader: 'jsx', contents: `import {createContext,useContext,cloneElement} from 'react'; const C=createContext({});export const Dialog=({open,onOpenChange,children})=><C.Provider value={{open,onOpenChange}}>{children}</C.Provider>;export const DialogContent=({children,...props})=>useContext(C).open?<div role="dialog" {...props}>{children}</div>:null;export const DialogHeader=({children,...props})=><header {...props}>{children}</header>;export const DialogTitle=({children,...props})=><h2 {...props}>{children}</h2>;export const DialogDescription=({children,...props})=><p {...props}>{children}</p>;export const DialogFooter=({children,...props})=><footer {...props}>{children}</footer>;export const DialogTrigger=({children})=>{const c=useContext(C);return cloneElement(children,{onClick:event=>{children.props.onClick?.(event);if(!event.defaultPrevented)c.onOpenChange?.(true);}});};` };
        if (name.endsWith('/switch')) return { loader: 'jsx', contents: 'export const Switch=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;' };
        if (name.endsWith('/checkbox')) return { loader: 'jsx', contents: 'export const Checkbox=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked} onChange={event=>onCheckedChange(event.target.checked)} {...props}/>;' };
        if (name.endsWith('/slider')) return { loader: 'jsx', contents: 'export const Slider=()=>null;' };
        if (name.endsWith('/radio-group')) return { loader: 'jsx', contents: 'export const RadioGroup=({children})=><div>{children}</div>;export const RadioGroupItem=()=>null;' };
        if (name.endsWith('/popover')) return { loader: 'jsx', contents: 'export const Popover=({children})=><>{children}</>;export const PopoverTrigger=Popover;export const PopoverContent=Popover;' };
        if (name.endsWith('/alert-dialog')) return { loader: 'jsx', contents: 'export const AlertDialog=({open,children})=>open?<div>{children}</div>:null;export const AlertDialogAction=({children,...props})=><button {...props}>{children}</button>;export const AlertDialogCancel=AlertDialogAction;export const AlertDialogContent=({children})=><div>{children}</div>;export const AlertDialogHeader=AlertDialogContent;export const AlertDialogTitle=AlertDialogContent;export const AlertDialogDescription=AlertDialogContent;export const AlertDialogFooter=AlertDialogContent;' };
        if (name.endsWith('/MultilineEditor.jsx')) return { loader: 'jsx', contents: 'export default function Editor({value,onChange,label,readOnly,disabled}){return <textarea aria-label={label} readOnly={readOnly} disabled={disabled} value={value} onChange={onChange}/>;}' };
        throw new Error(`Unexpected dependency ${name}`);
    });
} }] });
const { default: DynamicSettings, SettingPage, BootstrapGate, registerSettingsComponent } = await import(pathToFileURL(path.resolve(bundlePath)).href);

async function mount(config, response, handler, runtime = {}, initialValues = {}) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node', 'Event', 'CustomEvent', 'MutationObserver']) globalThis[key] = dom.window[key];
    globalThis.settingsUI = { calls: [], confirmations: [], errors: [], changed: [], navigated: [], api: async (method, url, body, options) => {
        settingsUI.calls.push([method, url, body, options]);
        return handler ? handler(method, url, body, options) : method === 'get' ? response : { saved: true };
    } };
    const root = createRoot(document.getElementById('root'));
    await act(async () => root.render(React.createElement(DynamicSettings, { config, initialValues, onChange: value => settingsUI.changed.push(value), runtimeContext: { navigate: path => settingsUI.navigated.push(path), ...runtime } })));
    return { render: async element => { await act(async () => root.render(element)); }, close: async () => { await act(async () => root.unmount()); dom.window.close(); } };
}
async function mountSettingsPage(handler, service = '/custom/settings-index') {
    const ui = await mount([], {}, handler);
    settingsUI.service = service;
    await ui.render(React.createElement(SettingPage, { open: true, onClose: () => { settingsUI.closed = true; } }));
    return ui;
}
async function mountBootstrapGate(handler, sessionError) {
    const ui = await mount([], {}, handler);
    settingsUI.sessionError = sessionError;
    await ui.render(React.createElement(BootstrapGate, {}, React.createElement('div', { 'data-application-ready': true }, '应用已连接')));
    return ui;
}
const button = label => [...document.querySelectorAll('button')].find(node => node.textContent.trim() === label);
const click = async node => { assert.ok(node); await act(async () => node.click()); };
const edit = async (node, value) => { assert.ok(node); await act(async () => { Object.getOwnPropertyDescriptor(node.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype, 'value').set.call(node, value); node.dispatchEvent(new window.Event('input', { bubbles: true })); }); };
const upload = async (node, file) => { assert.ok(node); await act(async () => { Object.defineProperty(node, 'files', { configurable: true, value: [file] }); node.dispatchEvent(new window.Event('change', { bubbles: true })); }); };
const ref = value => ({ $ref: value });
const resource = (extra = {}) => ({ type: 'resource', id: 'fixtures', text: '动态资源', source: { endpoint: '/fixtures', listPath: 'items' }, titleField: 'title', actions: [{ kind: 'edit', label: '编辑' }], editor: { options: [{ type: 'text', name: 'title', text: '名称', required: true }, { type: 'secret-map', name: 'connection.headers', text: '请求头' }], defaults: {}, update: { id: 'save', label: '保存', endpoint: '/fixtures/{item.id}', method: 'PATCH', body: { title: ref('form.title'), revision: ref('item.revision'), connection: ref('form.connection') } } }, ...extra });


export { mount, mountSettingsPage, mountBootstrapGate, button, click, edit, upload, ref, resource, DynamicSettings, registerSettingsComponent, React, act };
