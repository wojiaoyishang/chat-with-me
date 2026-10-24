import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act, useState } from 'react';

test('later windows cover earlier windows; focusing and dragging an earlier window preserves other dialogs', async () => {
    const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost/doc/doc',pretendToBeVisual:true});
    for(const key of ['window','document','HTMLElement','Element','Node','NodeFilter','MutationObserver','CustomEvent',
        'HTMLInputElement','HTMLTextAreaElement','getComputedStyle','requestAnimationFrame','cancelAnimationFrame']) {
        globalThis[key]=['getComputedStyle','requestAnimationFrame','cancelAnimationFrame'].includes(key)
            ?dom.window[key].bind(dom.window):dom.window[key];
    }
    Object.defineProperty(globalThis,'navigator',{configurable:true,value:dom.window.navigator});
    window.innerWidth=1600;window.innerHeight=1000;
    globalThis.IS_REACT_ACT_ENVIRONMENT=true;
    const {createRoot}=await import('react-dom/client');
    await build({stdin:{contents:`export {default as Floating} from './src/components/window/FloatingDockWindow.jsx';
        export {Dialog,DialogContent,DialogTitle} from './src/components/ui/dialog.tsx';
        export {Popover,PopoverContent,PopoverTrigger} from './src/components/ui/popover.tsx';
        export {default as Tools} from './src/features/tools/components/ConversationToolsDialog.jsx';
        export {useWindowLayers} from './src/lib/windowLayers.js';`,resolveDir:process.cwd()},
        bundle:true,packages:'external',jsx:'automatic',platform:'node',format:'esm',outfile:'temp/window-layers-test.mjs',
        plugins:[{name:'alias',setup(builder){builder.onResolve({filter:/^@\//},({path:modulePath})=>{
            const target=path.resolve('src',modulePath.slice(2));
            return {path:[target,`${target}.tsx`,`${target}.ts`,`${target}.jsx`,`${target}.js`].find(existsSync)};
        });}}]});
    const {Floating,Dialog,DialogContent,DialogTitle,Popover,PopoverContent,PopoverTrigger,useWindowLayers,Tools}=await import('../temp/window-layers-test.mjs');
    function Fixture(){
        const [open,setOpen]=useState(false);
        return React.createElement(React.Fragment,null,
            React.createElement(Floating,{open:true,title:'执行窗口',onClose:()=>{},storageKey:'test:layers'},
                React.createElement('button',{onClick:()=>setOpen(true)},'打开本轮工具'),
                React.createElement(Popover,null,React.createElement(PopoverTrigger,null,'执行菜单'),
                    React.createElement(PopoverContent,null,'菜单内容'))),
            React.createElement(Dialog,{open,onOpenChange:setOpen},
                React.createElement(DialogContent,{'aria-describedby':undefined},
                    React.createElement(DialogTitle,null,'本轮工具'),React.createElement('input',{defaultValue:'保留设置'}))));
    }
    function LiveFixture({revision}) {
        const [open,setOpen]=useState(true);
        return React.createElement(React.Fragment,null,
            React.createElement('input',{id:'page-focus',defaultValue:String(revision)}),
            React.createElement(Floating,{open:true,title:'实时执行',storageKey:'test:updates'},String(revision)),
            React.createElement(Tools,{open,onOpenChange:setOpen,t:(key,fallback)=>typeof fallback==='string'?fallback:key, toolsConfig:[]}));
    }
    const root=createRoot(document.getElementById('root'));
    const pointer=(target,type,x=20,y=20)=>target.dispatchEvent(new window.MouseEvent(type,{bubbles:true,button:0,clientX:x,clientY:y}));
    try{
        await act(async()=>root.render(React.createElement(Fixture)));
        const task=document.querySelector('section[role="dialog"]');
        await act(async()=>[...task.querySelectorAll('button')].find((button)=>button.textContent==='打开本轮工具').click());
        const tools=document.querySelector('[data-slot="dialog-content"]');
        const input=tools.querySelector('input');
        input.value='已修改设置';
        assert.ok(Number(tools.style.zIndex)>Number(task.style.zIndex));
        assert.notEqual(document.body.style.pointerEvents,'none');
        const originalX=Number.parseFloat(task.style.left), originalY=Number.parseFloat(task.style.top);
        await act(async()=>pointer(task.querySelector('header'),'pointerdown'));
        await act(async()=>pointer(window,'pointermove',70,50));
        await act(async()=>pointer(window,'pointerup',70,50));
        assert.ok(Number(task.style.zIndex)>Number(tools.style.zIndex));
        assert.equal(Number.parseFloat(task.style.left),originalX+50);
        assert.equal(Number.parseFloat(task.style.top),originalY+30);
        assert.equal(document.querySelector('[data-slot="dialog-content"] input'),input);
        assert.equal(input.value,'已修改设置');
        await act(async()=>pointer(input,'pointerdown'));
        assert.ok(Number(tools.style.zIndex)>Number(task.style.zIndex));
        await act(async()=>{pointer(task.querySelector('[data-slot="popover-trigger"]'),'pointerdown');task.querySelector('[data-slot="popover-trigger"]').click();});
        const menu=document.querySelector('[data-slot="popover-content"]');
        assert.ok(menu);
        assert.ok(Number(menu.style.zIndex)>Number(task.style.zIndex));
        assert.equal(menu.dataset.windowLayer,task.dataset.windowLayer);
        assert.ok(document.querySelector('[data-slot="dialog-content"]'));
        await act(async()=>root.render(React.createElement(LiveFixture,{revision:1})));
        const settings=document.querySelector('[data-slot="dialog-content"]');
        const search=settings.querySelector('input');
        const setValue=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
        await act(async()=>{setValue.call(search,'document_read');search.dispatchEvent(new window.Event('input',{bubbles:true}));});
        await act(async()=>root.render(React.createElement(LiveFixture,{revision:2})));
        await act(async()=>document.getElementById('page-focus').focus());
        await act(async()=>pointer(document.getElementById('page-focus'),'pointerdown'));
        assert.equal(document.querySelector('[data-slot="dialog-content"]'),settings);
        assert.equal(settings.querySelector('input').value,'document_read');
    }finally{
        await act(async()=>root.unmount());
        assert.deepEqual(useWindowLayers.getState().windows,[]);
        dom.window.close();
    }
});
