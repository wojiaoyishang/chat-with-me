import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const script = await readFile('../..//Python/Chat-With-Me-Backend/application/management_pages/static/resource-browser.js','utf8');
const settle = ms => new Promise(resolve => setTimeout(resolve, ms || 30));
function setup(t) {
  const dom = new JSDOM('<div id="root"></div>', { runScripts: 'outside-only', url:'http://localhost' });
  dom.window.eval(script); t.after(()=>{for(const root of dom.window.document.querySelectorAll('.cwm-resource-browser'))root._cwmResourceBrowser?.destroy();dom.window.close();}); return dom;
}
test('shared attachment browser searches on the server, pages, preserves multi-selection and ignores late responses', async t => {
  const dom=setup(t), calls=[], selections=[];
  const instance=dom.window.CWMResourceBrowser.create({multiple:true, onSelect:items=>selections.push(Array.from(items,i=>i.id)), api:async(path)=>{
    calls.push(path); const q=new URL(path,'http://localhost').searchParams;
    return {items:[{id:q.get('offset')==='12'?'second':'first',name:q.get('q')||'File',type:'text'}],total:13,hasMore:q.get('offset')==='0'};
  }});
  dom.window.document.getElementById('root').append(instance.root); await settle();
  instance.root.querySelector('.resource-browser-pick').click();
  [...instance.root.querySelectorAll('button')].find(n=>n.textContent==='下一页').click(); await settle();
  assert.match(calls.at(-1),/offset=12/);
  instance.root.querySelector('.resource-browser-pick').click(); assert.equal(selections.length,0);
  instance.root.querySelector('[data-action="confirm-resource-selection"]').click(); assert.deepEqual(selections.at(-1),['first','second']);
  const search=instance.root.querySelector('input[type=search]'); search.value='服务端关键词'; search.dispatchEvent(new dom.window.Event('input'));
  await settle(280); assert.match(decodeURIComponent(calls.at(-1)),/服务端关键词/); assert.match(calls.at(-1),/offset=0/);
  assert.equal(instance.root.querySelector('.resource-browser-pick').getAttribute('aria-pressed'),'true'); instance.destroy();
});

test('management selection, list/grid and accessible more menu preserve server query and batch ids', async t => {
  const dom=setup(t), doc=dom.window.document, removed=[], edited=[];
  const items=[{id:'a',name:'Photo.png',type:'image',uri:'cwm://artifact/a',notes:'note'},{id:'b',name:'Doc.md',type:'text'}];
  const instance=dom.window.CWMResourceBrowser.create({manage:true,api:async()=>({items,total:2}),onEdit:item=>edited.push(item.id),onDelete:items=>removed.push(Array.isArray(items)?Array.from(items,i=>i.id):[items.id])}); doc.getElementById('root').append(instance.root);t.after(()=>instance.destroy());await settle();
  assert.equal(instance.root.querySelector('.resource-browser-list').classList.contains('resource-browser-grid'),false);
  instance.root.querySelector('[aria-label="网格视图"]').click();assert.equal(instance.root.querySelector('.resource-browser-list').classList.contains('resource-browser-grid'),true);
  instance.root.querySelector('[aria-label="选择本页全部附件"]').click();
  assert.equal(instance.root.querySelectorAll('.resource-browser-card.selected').length,2);
  [...instance.root.querySelectorAll('button')].find(n=>n.textContent==='删除所选').click();assert.deepEqual(removed,[['a','b']]);
  instance.root.querySelector('[aria-haspopup=menu]').click(); const menu=doc.querySelector('[role=menu]');assert.ok(menu);
  assert.equal(doc.activeElement.textContent,'预览');menu.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(doc.activeElement.textContent,'删除');
  menu.querySelectorAll('[role=menuitem]')[2].click();assert.deepEqual(edited,['a']);assert.equal(doc.querySelector('[role=menu]'),null);
  instance.clearSelection(['a','b']);assert.equal(instance.root.querySelector('.resource-selection-bar').hidden,true);
});

test('text preview pins version for paging and aborts when closed without replacing browse state', async t => {
  const dom=setup(t), doc=dom.window.document; const calls=[];
  dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new dom.window.Event('close'));};
  const api=async(path,options={})=>{calls.push({path,...options}); const input=JSON.parse(options.body);return {source:{contentHash:'pinned'},blocks:[{text:input.offset?'second':'first'}],total:2,hasMore:!input.offset};};
  const handle=dom.window.CWMResourceBrowser.preview({id:'a',name:'A.md',type:'text',uri:'cwm://artifact/a'},'/api',{api,version:'original'});await settle();
  assert.equal(JSON.parse(calls[0].body).version,'original');assert.match(handle.root.textContent,/first/);
  [...handle.root.querySelectorAll('button')].find(n=>n.textContent==='加载更多正文').click();await settle();assert.equal(JSON.parse(calls[1].body).version,'pinned');assert.match(handle.root.textContent,/second/);
  handle.destroy();assert.equal(calls.at(-1).signal.aborted,true);assert.equal(doc.querySelector('dialog'),null);
});

test('upload retry does not upload completed files again and destroy aborts the active transfer', async t => {
  const dom=setup(t), transfers=[];let fail=true, pending;
  const instance=dom.window.CWMResourceBrowser.create({api:async(path,options={})=>{
    if(path.includes('?'))return {items:[],total:0};const file=options.body.get('file');transfers.push(file.name);
    if(file.name==='bad.txt'&&fail){fail=false;throw new Error('network error');}
    if(file.name==='pending.txt'){pending=options.signal;return new Promise(()=>{});}return {};
  }});dom.window.document.getElementById('root').append(instance.root);t.after(()=>instance.destroy());await settle();
  const input=instance.root.querySelector('input[type=file]');
  const choose=names=>{Object.defineProperty(input,'files',{configurable:true,value:names.map(n=>new dom.window.File(['data'],n))});input.dispatchEvent(new dom.window.Event('change'));};
  choose(['ok.txt','bad.txt']);await settle();assert.deepEqual(transfers,['ok.txt','bad.txt']);assert.match(instance.root.textContent,/network error/);
  [...instance.root.querySelectorAll('button')].find(n=>n.textContent==='重试').click();await settle();assert.deepEqual(transfers,['ok.txt','bad.txt','bad.txt']);
  choose(['pending.txt']);await settle();instance.destroy();assert.equal(pending.aborted,true);
});

test('superseded search result cannot overwrite a later search',async t=>{
 const dom=setup(t), requests=[];
 const instance=dom.window.CWMResourceBrowser.create({api:(path,options)=>new Promise(resolve=>requests.push({path,signal:options.signal,resolve}))});dom.window.document.getElementById('root').append(instance.root);t.after(()=>instance.destroy());
 const search=instance.root.querySelector('input[type=search]');search.value='new';search.dispatchEvent(new dom.window.Event('input'));await settle(280);
 assert.equal(requests[0].signal.aborted,true);requests[1].resolve({items:[{id:'new',name:'New'}],total:1});await settle();requests[0].resolve({items:[{id:'old',name:'Old'}],total:1});await settle();assert.equal(instance.root.querySelector('strong').textContent,'New');
});

test('confirmed multi-selection can be cleared after individually unchecking every item', async t=>{
 const dom=setup(t),selected=[]; const instance=dom.window.CWMResourceBrowser.create({multiple:true,onSelect:items=>selected.push(Array.from(items,i=>i.id)),api:async()=>({items:[{id:'a',name:'A'}],total:1})});dom.window.document.getElementById('root').append(instance.root);await settle();
 const pick=instance.root.querySelector('.resource-browser-pick'), confirm=instance.root.querySelector('[data-action="confirm-resource-selection"]');pick.click();confirm.click();pick.click();assert.equal(confirm.disabled,false);confirm.click();assert.deepEqual(selected,[['a'],[]]);instance.destroy();
});

test('dismissed in-flight upload queue stays dismissed when the next file starts',async t=>{
 const dom=setup(t);let finishFirst, finishSecond;
 const instance=dom.window.CWMResourceBrowser.create({api:(path,options={})=>path.includes('?')?Promise.resolve({items:[],total:0}):new Promise(resolve=>{if(options.body.get('file').name==='first')finishFirst=resolve;else finishSecond=resolve;})});dom.window.document.getElementById('root').append(instance.root);await settle();
 const input=instance.root.querySelector('input[type=file]');Object.defineProperty(input,'files',{value:[new dom.window.File(['a'],'first'),new dom.window.File(['b'],'second')]});input.dispatchEvent(new dom.window.Event('change'));await settle();instance.root.querySelector('[aria-label="收起上传结果"]').click();finishFirst({});await settle();assert.equal(instance.root.querySelector('.resource-upload-queue').hidden,true);finishSecond({});await settle();instance.destroy();
});
test('document picker uses the same component and exposes only authorized server results, destroy cancels late updates', async t=>{
  const dom=setup(t); let finish, signal;
  const instance=dom.window.CWMResourceBrowser.create({sourceKind:'document',api:(path, options)=>{ assert.match(path,/attachments\/documents/);signal=options.signal;return new Promise(r=>finish=r); }});
  dom.window.document.getElementById('root').append(instance.root);
  assert.equal(instance.root.querySelector('input[type=file]'),null);
  instance.destroy(); assert.equal(signal.aborted,true); finish({items:[{id:'late',name:'Late'}],total:1}); await settle();
  assert.equal(instance.root.querySelector('.resource-browser-card'),null);
});
