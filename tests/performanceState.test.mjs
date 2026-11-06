import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {useTaskStore} from '../src/features/tasks/useTaskStore.js';
import {useExecutionStore} from '../src/features/execution/useExecutionStore.js';
import {subscribeMobile} from '../src/lib/mobileViewport.js';
import {registerRealtimeSubscription, hasRealtimeDemand, realtimeSubscriptions} from '../src/runtime/transport/subscriptionDemand.js';

test('incoming consumers share routing scopes and release connection demand independently', () => {
    const scope={events:['message.*'],conversationId:'chat',documentId:null,includeGlobal:false,onlyWithoutConversation:false};
    const first=registerRealtimeSubscription('first',scope,true),second=registerRealtimeSubscription('second',scope,true);
    const local=registerRealtimeSubscription('local',{...scope,directions:new Set(['local'])},true);
    try {assert.equal(hasRealtimeDemand(),true);assert.equal(realtimeSubscriptions().length,1);
        first();assert.equal(hasRealtimeDemand(),true);second();assert.equal(hasRealtimeDemand(),false);
    } finally {first();second();local();}
});

test('identical task/execution updates are silent; same-revision new fields still apply', t => {
    for (const [store, update, value] of [
        [useTaskStore, value=>useTaskStore.getState().merge([value]), {taskId:'perf',revision:1,status:'running'}],
        [useExecutionStore, value=>useExecutionStore.getState().upsertExecution(value),
            {executionId:'perf',conversationId:'chat',runId:'run',updatedAt:1,status:'running'}],
    ]) {
        const before=store.getState(); t.after(()=>store.setState(before,true));
        update(value); let notifications=0;
        const stop=store.subscribe(()=>notifications++);
        for(let i=0;i<100;i++) update({...value});
        assert.equal(notifications,0);
        update({...value,label:'changed'}); assert.equal(notifications,1); stop();
    }
});

test('an unchanged execution receipt still settles a newly restored guidance draft', t => {
    const store=useExecutionStore,before=store.getState();t.after(()=>store.setState(before,true));
    const value={executionId:'receipt',conversationId:'receipt-chat',updatedAt:1,pendingGuidance:[{id:'supplement'}]};
    store.getState().upsertExecution(value);
    const session=store.getState().sessions['receipt-chat'];
    store.setState({sessions:{...store.getState().sessions,'receipt-chat':{...session,guidanceDrafts:{draft:{
        executionId:'receipt',submissionId:'supplement',state:'submitting'}}}}});
    store.getState().upsertExecution(value);
    assert.equal(store.getState().sessions['receipt-chat'].guidanceDrafts.draft.state,'sent');
});

test('draft migration, deferred typing, backend identity and tombstones preserve recovery', () => {
    const values=new Map(), timers=new Map(); let writes=0, nextTimer=0, scope='a:';
    const context={exports:{},Date,console,Map,Set,
        backendStorageKey:key=>scope+key,getBackendConnection:()=>({id:'default'}),
        setTimeout:fn=>{timers.set(++nextTimer,fn);return nextTimer;},clearTimeout:id=>timers.delete(id),
        window:{localStorage:{getItem:key=>values.get(key)??null,
            setItem:(key,value)=>{writes++;values.set(key,value);},removeItem:key=>values.delete(key)}}};
    const source=fs.readFileSync('src/features/chat/composer/draftStore.js','utf8')
        .replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
    vm.runInNewContext(source+'\nexports.save=saveComposerSnapshot;exports.read=readComposerDraft;exports.clear=clearComposerDraft;exports.flush=flushComposerDrafts;',context);
    const app=context.exports;
    values.set('a:cwm:chat-composer-drafts:v2',JSON.stringify({conversations:{old:{normal:{content:'legacy'},messages:{}}}}));
    assert.equal(app.read({conversationId:'old'}).content,'legacy');
    const baseline=writes;
    for(let i=0;i<50;i++)app.save({conversationId:'old',content:String(i),defer:true});
    assert.equal(writes,baseline);
    assert.equal(app.read({conversationId:'old'}).content,'49');
    scope='b:'; app.flush();
    assert.equal(writes,baseline+1);
    assert.equal(app.read({conversationId:'old'}),null);
    scope='a:';app.clear({conversationId:'old'});
    assert.equal(app.read({conversationId:'old'}),null,'legacy draft must not resurrect');
});

test('hundreds of mobile consumers own only one browser listener', () => {
    const before=globalThis.window;let added=0,removed=0;
    globalThis.window={addEventListener:()=>added++,removeEventListener:()=>removed++};
    try {
        const stops=Array.from({length:300},()=>subscribeMobile(()=>{}));
        assert.equal(added,1);for(const stop of stops)stop();assert.equal(removed,1);
    } finally { if(before)globalThis.window=before;else delete globalThis.window; }
});

test('chat bootstrap starts all independent reads before waiting for the first result', async () => {
    const source=fs.readFileSync('src/features/chat/ChatPage.jsx','utf8');
    const body=source.slice(source.indexOf('const loadData = async () => {'),source.indexOf('        if (conversationId) {',source.indexOf('const loadData = async () => {')));
    const started=[];let finish;
    const pending=new Promise(resolve=>{finish=resolve;});
    const context={exports:{},performance,console,isCurrent:()=>true,setIsLoading:()=>{},setIsLoadingError:()=>{},
        requestModels:()=>{started.push('models');return pending;},requestConversation:()=>{started.push('conversation');return pending;},
        requestMessages:()=>{started.push('messages');return pending;}};
    vm.runInNewContext(body+'\nexports.load=loadData;',context);
    const work=context.exports.load();assert.deepEqual(started,['models','conversation','messages']);finish();await work;
});
