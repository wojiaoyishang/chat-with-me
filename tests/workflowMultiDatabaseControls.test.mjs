import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

await build({
  stdin: { contents: 'export { default as Field } from "./src/features/workflows/WorkflowDataField.jsx"; export { default as Panel } from "./src/features/workflows/WorkflowNodePanel.jsx"; export { default as Viewer } from "./src/features/chat/ui/message/components/KnowledgeGraphViewer.jsx";', resolveDir: process.cwd(), loader: "jsx" }, outfile: "temp/workflow-multidb-controls.bundle.mjs", bundle: true, format: "esm", platform: "node", packages: "external", jsx: "automatic",
  plugins: [{ name: "mock-controls", setup(builder) {
    builder.onResolve({ filter: /^react(?:\/|$)/ }, ({path}) => ({path,external:true}));
    builder.onResolve({ filter: /\.css$/ }, () => ({path:"css",namespace:"mock"}));
    builder.onResolve({ filter: /chatKnowledgeGraphRenderer\.js$/ }, () => ({path:"renderer",namespace:"mock"}));
    builder.onResolve({ filter: /^@\// }, ({path}) => path === '@/features/knowledge/graphHistory.js' ? {path:fileURLToPath(new URL('../src/features/knowledge/graphHistory.js', import.meta.url))} : {path,namespace:"mock"});
    builder.onLoad({filter:/.*/,namespace:"mock"}, ({path}) => {
      let contents = "";
      if(path.includes("apiClient")) contents="export default {get:(...args)=>globalThis.controlTest.api.get(...args)};";
      else if(path === "renderer") contents="export const createChatKnowledgeGraph=(svg,options)=>{globalThis.controlTest.graphOptions=options;return {setData(model){this.nodes=model.nodes;},setPhysics(){},setEdgeAnimation(){},destroy(){},getNodes(){return this.nodes||[]},expanding(){},focusNetwork(){return false}}};";
      else if(path.includes("LazyVisibility")) contents="export default ({children})=>children;";
      else if(path.includes("graphSettings")) contents="export const KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY='animation';export const DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION=true;";
      else if(path.includes("tools.jsx")) contents="export const useLocalSetting=()=>[true];";
      else if(path.endsWith("/button")) contents="export const Button=({variant,size,asChild,...props})=><button {...props}/>;";
      else if(path.endsWith("/input")) contents="export const Input=({onChange,...props})=><input {...props} onChange={onChange} onInput={onChange}/>;";
      else if(path.endsWith("/checkbox")) contents="export const Checkbox=({checked,onCheckedChange,...props})=><input type='checkbox' {...props} checked={checked} onChange={event=>onCheckedChange(event.target.checked)}/>;";
      else if(path.endsWith("/switch")) contents="export const Switch=({checked,onCheckedChange,...props})=><input type='checkbox' {...props} checked={checked} onChange={event=>onCheckedChange(event.target.checked)}/>;";
      else if(path.endsWith("/popover")) contents=`import{createContext,useContext,cloneElement}from'react';const C=createContext({});export const Popover=({open,onOpenChange,children})=><C.Provider value={{open,onOpenChange}}>{children}</C.Provider>;export const PopoverTrigger=({children})=>{const c=useContext(C);return cloneElement(children,{onClick:()=>c.onOpenChange(!c.open)})};export const PopoverContent=({children})=>useContext(C).open?<section>{children}</section>:null;`;
      else if(path.endsWith("/dialog")) contents="export const Dialog=({open,onOpenChange,children})=>open?<div role='dialog'>{children}<button aria-label='关闭预览' onClick={()=>onOpenChange(false)}>关闭预览</button></div>:null;export const DialogContent=({children})=>children;export const DialogHeader=({children})=><header>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;";
      else if(path.endsWith("/select")) contents=`import{createContext,useContext}from'react';const C=createContext({});export const Select=({value,onValueChange,disabled,children})=><C.Provider value={{value,onValueChange,disabled}}>{children}</C.Provider>;export const SelectTrigger=props=><span {...props}/>;export const SelectValue=()=>null;export const SelectContent=({children})=>{const c=useContext(C);return <select value={c.value} disabled={c.disabled} onChange={event=>c.onValueChange(event.target.value)}>{children}</select>};export const SelectItem=props=><option {...props}/>;`;
      else if(path.endsWith("MultilineEditor.jsx")) contents="export default ({label,...props})=><textarea aria-label={label} {...props}/>;";
      else if(path.includes("JsonConfigEditor")) contents="export default ()=>null;";
      else if(path.includes("virtualUrl")) contents="export const resolveResourceUrl=value=>value;";
      return {contents,loader:"jsx"};
    });
  }}],
});
const {Field, Panel, Viewer} = await import("../temp/workflow-multidb-controls.bundle.mjs");
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const click=async element=>{assert.ok(element);await act(async()=>element.click());};
const select=async(element,value)=>{await act(async()=>{element.value=value;element.dispatchEvent(new window.Event("change",{bubbles:true}));});};
const flush=async(ms=230)=>await act(async()=>delay(ms));
async function mount(Component,props,initialValue,databaseRegistry) {
  const dom=new JSDOM('<div id="root"></div>',{url:"http://localhost",pretendToBeVisual:true});
  for(const key of ["window","document","HTMLElement","Node","Event"]) globalThis[key]=dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT=true;
  const state={value:initialValue,calls:[]};
  globalThis.controlTest={api:{get:async(url,options)=>{state.calls.push([url,options]);if(url==="/knowledge/databases")return{databases:databaseRegistry || [{id:"db-one",name:"renamed",title:"库一",enabled:true,legacyDefault:true},{id:"db-two",title:"库二",enabled:true},{id:"db-disabled",title:"停用库",enabled:false}]};const counts=options?.params?.databaseId==="db-one"?{childCount:2,descendantCount:5}:{childCount:0,descendantCount:0};if(url.endsWith("/extraction-snapshot"))return{...counts,content:"原文内容",extractionRevision:3,relationships:[{source:"a",target:"b",type:"关联"}],nodes:[{id:"a",name:"甲"},{id:"b",name:"乙"}]};if(url==="/knowledge/chunks/search")return{items:[{id:options.params.databaseId+"-chunk",name:options.params.databaseId+"-标题",...counts,properties:{summary:"摘要"}}],total:1,hasMore:false};return{nodes:[{id:"node-more",name:"更多"}],relationships:[]};}}};
  function Form(){const[value,setValue]=React.useState(initialValue);state.value=value;return React.createElement(Component,{...props,value,onChange:setValue});}
  const root=createRoot(document.getElementById("root"));
  await act(async()=>root.render(React.createElement(Form)));
  return {state,root,dom,close:async()=>{await act(async()=>root.unmount());dom.window.close();}};
}

test("model queue adds without duplicates and uses explicit order controls",async()=>{
  const ui=await mount(Field,{label:"模型队列",schema:{type:"array",maxItems:3,ui:{widget:"model-list-picker"}},models:[{id:"m1",name:"模型一"},{id:"m2",name:"模型二"},{id:"m3",name:"模型三"}]},["m1","m2"]);
  try{
    await select(document.querySelector("select"),"m3");assert.deepEqual(ui.state.value,["m1","m2","m3"]);
    assert.equal(document.querySelector("select").disabled,true);
    await click(document.querySelector('[aria-label="上移 模型三"]'));assert.deepEqual(ui.state.value,["m1","m3","m2"]);
    await click(document.querySelector('[aria-label="下移 模型一"]'));assert.deepEqual(ui.state.value,["m3","m1","m2"]);
    await click(document.querySelector('[aria-label="移除模型 模型一"]'));assert.deepEqual(ui.state.value,["m3","m2"]);
    assert.deepEqual([...document.querySelectorAll("option")].map(option=>option.value),["_none","m1"]);
  }finally{await ui.close();}
});

test("database selector stores stable IDs and retains a missing saved selection",async()=>{
  const ui=await mount(Field,{label:"数据库",schema:{type:"string",ui:{widget:"graph-database-picker"}}},"default");
  try{await flush(0);assert.equal(document.querySelector("select").value,"db-one");assert.equal(ui.state.value,"default");assert.equal(document.querySelector('[value="db-disabled"]').disabled,true);await select(document.querySelector("select"),"db-two");assert.equal(ui.state.value,"db-two");}finally{await ui.close();}
  const missing=await mount(Field,{schema:{type:"string",ui:{widget:"graph-database-picker"}}},"missing");
  try{await flush(0);assert.equal(document.querySelector("select").value,"missing");assert.equal(missing.state.value,"missing");assert.match(document.body.textContent,/已选数据库不可用/);}finally{await missing.close();}
});

test("database selector prefers the explicit default slug over the legacy alias",async()=>{
  const databases=[{id:"db-one",name:"renamed",title:"旧默认库",enabled:true,legacyDefault:true},{id:"db-new",name:"default",title:"新默认库",enabled:true}];
  const ui=await mount(Field,{label:"数据库",schema:{type:"string",ui:{widget:"graph-database-picker"}}},"default",databases);
  try{await flush(0);assert.equal(document.querySelector("select").value,"db-new");assert.equal(ui.state.value,"default");}finally{await ui.close();}
});

test("chunk selection is staged, preview preserves selection, and DB change clears old chunk",async()=>{
  const ui=await mount(Field,{compact:true,label:"知识片段",schema:{type:"object",ui:{widget:"knowledge-chunk-picker"}}},{databaseId:"db-one",chunkId:"",scope:"self"});
  try{
    await click(document.querySelector('[aria-label="选择知识片段"]'));await flush();
    await click(document.querySelector('[aria-label="查看知识块 db-one-标题"]'));assert.equal(ui.state.value.chunkId,"");assert.equal(document.querySelector('[aria-label="知识块原文"]').value,"原文内容");assert.match(document.querySelector('[role="dialog"]').textContent,/甲 → 关联 → 乙/);
    const snapshotCall=ui.state.calls.find(([url])=>url.endsWith("/extraction-snapshot"));assert.equal(snapshotCall[1].params.databaseId,"db-one");assert.equal(snapshotCall[1].params.scope,undefined);
    assert.match(document.querySelector('[role="dialog"]').textContent,/直接子块 2 个 · 递归子块 5 个/);
    assert.match(document.querySelector('[role="dialog"]').textContent,/全部 5 个子知识块（含递归）会一同更新/);
    await click(document.querySelector('[aria-label="关闭预览"]'));await click(document.querySelector('[aria-label="选择知识块 db-one-标题"]'));assert.equal(ui.state.value.chunkId,"");
    await click([...document.querySelectorAll("button")].find(button=>button.textContent==="确认选择"));assert.deepEqual(ui.state.value,{databaseId:"db-one",chunkId:"db-one-chunk",scope:"subtree"});
    await click(document.querySelector('[aria-label="选择知识片段"]'));await flush();await select(document.querySelector("select"),"db-two");await flush();
    assert.equal(document.querySelector('[aria-label="查看已选知识块"]'),null);await click(document.querySelector('[aria-label="选择知识块 db-two-标题"]'));assert.match(document.body.textContent,/仅更新当前知识块；没有子知识块/);await click([...document.querySelectorAll("button")].find(button=>button.textContent==="确认选择"));assert.deepEqual(ui.state.value,{databaseId:"db-two",chunkId:"db-two-chunk",scope:"subtree"});
    const searches=ui.state.calls.filter(([url])=>url==="/knowledge/chunks/search");assert.equal(searches.at(-1)[1].params.databaseId,"db-two");assert.equal(searches.at(-1)[1].params.limit,20);
  }finally{await ui.close();}
});

test("chunk rows display their title beside the selection control and keep preview independent",async()=>{
  const initialValue={databaseId:"db-one",chunkId:"",scope:"self"};
  const ui=await mount(Field,{compact:true,label:"知识片段",schema:{type:"object",ui:{widget:"knowledge-chunk-picker"}}},initialValue);
  try{
    const style=document.createElement("style");
    style.textContent=readFileSync(new URL("../src/features/workflows/workflow.css",import.meta.url),"utf8");
    document.head.appendChild(style);
    await click(document.querySelector('[aria-label="选择知识片段"]'));await flush();
    const row=document.querySelector(".workflow-resource-choice");
    const checkbox=row.querySelector('[aria-label="勾选知识块 db-one-标题"]');
    const pick=row.querySelector('[aria-label="选择知识块 db-one-标题"]');
    const preview=row.querySelector('[aria-label="查看知识块 db-one-标题"]');
    assert.equal(row.querySelector(".workflow-resource-name").textContent,"db-one-标题");
    assert.equal(window.getComputedStyle(row).display,"grid");
    assert.equal(window.getComputedStyle(checkbox).gridColumn,"1");
    assert.equal(window.getComputedStyle(pick).gridColumn,"2");
    assert.equal(window.getComputedStyle(preview).gridColumn,"3");
    assert.equal(checkbox.checked,false);

    await click(checkbox);
    assert.equal(checkbox.checked,true);
    assert.ok(row.classList.contains("is-selected"));
    assert.deepEqual(ui.state.value,initialValue);
    await click(preview);
    assert.equal(document.querySelector('[aria-label="知识块原文"]').value,"原文内容");
    assert.match(document.querySelector('[role="dialog"]').textContent,/db-one-标题/);
    assert.equal(checkbox.checked,true);
    assert.deepEqual(ui.state.value,initialValue);
    await click(document.querySelector('[aria-label="关闭预览"]'));
    await click(checkbox);
    assert.equal(checkbox.checked,false);
    assert.equal(row.classList.contains("is-selected"),false);
    assert.equal(document.querySelector('[aria-label="查看已选知识块"]'),null);
    await click(checkbox);
    await click([...document.querySelectorAll("button")].find(button=>button.textContent==="确认选择"));
    assert.deepEqual(ui.state.value,{databaseId:"db-one",chunkId:"db-one-chunk",scope:"subtree"});
  }finally{await ui.close();}
});

test("parent chunk range survives paging and legacy self selection upgrades only on confirmation",async()=>{
  const initialValue={databaseId:"db-one",chunkId:"db-one-chunk",scope:"self"};
  const ui=await mount(Field,{compact:true,label:"知识片段",schema:{type:"object",ui:{widget:"knowledge-chunk-picker"}}},initialValue);
  try{
    const normal=globalThis.controlTest.api.get;
    globalThis.controlTest.api.get=async(url,options)=>{
      if(url!=="/knowledge/chunks/search")return normal(url,options);
      ui.state.calls.push([url,options]);
      return options.params.offset===0
        ?{items:[{id:"db-one-chunk",name:"父知识块",childCount:2,descendantCount:5}],total:21,hasMore:true}
        :{items:[{id:"leaf",name:"末页子块",childCount:0,descendantCount:0}],total:21,hasMore:false};
    };
    await click(document.querySelector('[aria-label="选择知识片段"]'));await flush();
    assert.match(document.body.textContent,/直接子块 2 个 · 递归子块 5 个/);
    await click([...document.querySelectorAll("button")].find(button=>button.textContent==="下一页"));await flush();
    assert.equal(document.querySelector('[aria-label="选择知识块 父知识块"]'),null);
    assert.match(document.body.textContent,/父知识块/);
    assert.match(document.body.textContent,/当前知识块及全部 5 个子知识块（含递归）会一同更新/);
    await click(document.querySelector('[aria-label="查看已选知识块"]'));
    assert.match(document.querySelector('[role="dialog"]').textContent,/父知识块/);
    assert.match(document.querySelector('[role="dialog"]').textContent,/递归子块 5 个/);
    await click(document.querySelector('[aria-label="关闭预览"]'));
    await click(document.querySelector('[aria-label="选择知识片段"]'));
    assert.deepEqual(ui.state.value,initialValue);
    await click(document.querySelector('[aria-label="选择知识片段"]'));await flush();
    await click([...document.querySelectorAll("button")].find(button=>button.textContent==="确认选择"));
    assert.deepEqual(ui.state.value,{databaseId:"db-one",chunkId:"db-one-chunk",scope:"subtree"});
    assert.deepEqual(Object.keys(ui.state.value).sort(),["chunkId","databaseId","scope"]);
  }finally{await ui.close();}
});

test("late chunk search from previous database cannot populate the new database",async()=>{
  const ui=await mount(Field,{schema:{type:"object",ui:{widget:"knowledge-chunk-picker"}}},{databaseId:"db-one",chunkId:"saved",scope:"self"});
  let resolveOld;
  try{
    const normal=globalThis.controlTest.api.get;globalThis.controlTest.api.get=(url,options)=>url==="/knowledge/chunks/search"&&options.params.databaseId==="db-one"?new Promise(resolve=>{resolveOld=resolve;}):normal(url,options);
    await flush();await select(document.querySelector("select"),"db-two");await flush();await act(async()=>resolveOld({items:[{id:"stale",name:"旧数据库内容"}],total:1}));
    assert.equal(ui.state.value.chunkId,"");assert.ok(document.querySelector('[aria-label="选择知识块 db-two-标题"]'));assert.doesNotMatch(document.body.textContent,/旧数据库内容/);
  }finally{await ui.close();}
});

test("knowledge viewer uses graph database identity for expansion and import",async()=>{
  const msg={id:"message",databaseId:999,network:{databaseId:"db-two",nodes:[{id:"node",name:"节点"}],relationships:[]}};
  const ui=await mount(Viewer,{msg,conversationId:"conversation"},undefined);
  try{
    await act(async()=>globalThis.controlTest.graphOptions.onExpand("node"));
    const call=ui.state.calls.find(([url])=>url.includes("/knowledge/nodes/"));assert.equal(call[1].params.databaseId,"db-two");assert.equal(call[1].params.conversationId,"conversation");
    let payload;window.addEventListener("cwm.open-knowledge",event=>{payload=event.detail});await click(document.querySelector('[aria-label="在知识库中打开"]'));assert.equal(payload.databaseId,"db-two");
  }finally{await ui.close();}
});

test("node model queue inherits the global order and preserves hidden legacy config",async()=>{
  const definition={kind:"opaque_ai",version:1,display:{title:"自定义节点"},inputs:[],outputs:[],commonFields:["modelIds","modelId"],constructorSchema:{type:"object",properties:{modelIds:{type:"array",display:{title:"模型队列"},ui:{widget:"model-list-picker"}},modelId:{type:"string",ui:{hidden:true,widget:"model-picker"}}}}};
  const graph={nodes:[{id:"ai",kind:"opaque_ai",version:1,config:{modelIds:null,modelId:"legacy"}}],edges:[],settings:{commonConfig:{modelIds:["m1","m2"]}}};
  function GraphPanel({value,onChange}){return React.createElement(Panel,{graph:value,node:value.nodes[0],definitions:[definition],models:[{id:"m1",name:"模型一"},{id:"m2",name:"模型二"}],onGraphChange:onChange,onValidity:()=>{}});}
  const ui=await mount(GraphPanel,{},graph);
  try{
    assert.match(document.body.textContent,/全局值：模型一 → 模型二/);assert.equal(document.querySelector(".workflow-model-queue"),null);assert.equal(document.querySelectorAll('input[type="checkbox"]').length,1);
    await click(document.querySelector('[aria-label="模型队列 遵循全局设置"]'));assert.deepEqual(ui.state.value.nodes[0].config.modelIds,["m1","m2"]);
    await click(document.querySelector('[aria-label="上移 模型二"]'));assert.deepEqual(ui.state.value.nodes[0].config.modelIds,["m2","m1"]);assert.deepEqual(ui.state.value.settings.commonConfig.modelIds,["m1","m2"]);assert.equal(ui.state.value.nodes[0].config.modelId,"legacy");
    await click(document.querySelector('[aria-label="模型队列 遵循全局设置"]'));assert.equal(ui.state.value.nodes[0].config.modelIds,null);assert.equal(ui.state.value.nodes[0].config.modelId,"legacy");
  }finally{await ui.close();}
});

test("attachment source exposes its default-on parse order setting in the node panel",async()=>{
  const definition={kind:"attachments",version:2,display:{title:"提取附件"},source:{configField:"resources",valueSchema:{type:"array",ui:{widget:"resource-source-picker"}}},constructorSchema:{type:"object",properties:{resources:{type:"array"},preserveSelectionOrder:{type:"boolean",default:true,display:{title:"按选择顺序解析附件",description:"根据已选顺序解析。"}}}}};
  const graph={nodes:[{id:"attachments-1",kind:"attachments",version:2,config:{resources:["cwm://artifact/a","cwm://artifact/b"]}}],edges:[],settings:{}};
  function GraphPanel({value,onChange}){return React.createElement(Panel,{graph:value,node:value.nodes[0],definitions:[definition],models:[],onGraphChange:onChange,onValidity:()=>{}});}
  const ui=await mount(GraphPanel,{},graph);
  try{
    const toggle=document.querySelector('[aria-label="按选择顺序解析附件"]');
    assert.ok(toggle);
    assert.equal(toggle.checked,true);
    await click(toggle);
    assert.equal(ui.state.value.nodes[0].config.preserveSelectionOrder,false);
    assert.deepEqual(ui.state.value.nodes[0].config.resources,["cwm://artifact/a","cwm://artifact/b"]);
  }finally{await ui.close();}
});

