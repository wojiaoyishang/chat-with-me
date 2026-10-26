import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import {build} from "esbuild";
import React, {act} from "react";
import {createRoot} from "react-dom/client";
import {JSDOM} from "jsdom";

test("project confirmation requires an explicit choice and cancels pending actions on unmount",async()=>{
 const dom=new JSDOM('<div id="root"></div>',{url:"http://localhost",pretendToBeVisual:true});
 for(const key of ["window","document","HTMLElement","Element","Node","CustomEvent","MutationObserver","HTMLInputElement"])
  Object.defineProperty(globalThis,key,{configurable:true,value:dom.window[key]});
 globalThis.getComputedStyle=dom.window.getComputedStyle;
 globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 dom.window.confirm=()=>{throw new Error("native confirmation is forbidden");};
 await build({entryPoints:["src/components/ui/useConfirmation.jsx"],outfile:"temp/confirmation-dialog-test.mjs",bundle:true,format:"esm",platform:"node",packages:"external",jsx:"automatic",alias:{"@":path.resolve("src")}});
 const {useConfirmation}=await import(`../temp/confirmation-dialog-test.mjs?v=${Date.now()}`);
 const results=[];
 function App(){ const [confirm,dialog]=useConfirmation(); return React.createElement(React.Fragment,null,React.createElement("button",{onClick:async()=>results.push(await confirm({title:"删除测试内容",description:"确认后才执行",confirmText:"确定删除"}))},"打开"),dialog); }
 const root=createRoot(document.getElementById("root"));
 const click=async(text)=>{const target=[...document.querySelectorAll("button")].find((node)=>node.textContent===text);assert.ok(target);await act(()=>target.click());};
 try {
  await act(()=>root.render(React.createElement(App)));
  await click("打开");assert.ok(document.querySelector('[role="alertdialog"]'));assert.deepEqual(results,[]);
  await click("取消");assert.deepEqual(results,[false]);
  await click("打开");await click("确定删除");assert.deepEqual(results,[false,true]);
  await click("打开");await act(()=>root.unmount());assert.deepEqual(results,[false,true,false]);
 } finally {dom.window.close();}
});
