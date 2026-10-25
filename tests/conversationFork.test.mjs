import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {useTaskStore} from '../src/features/tasks/useTaskStore.js';

const translations = JSON.parse(fs.readFileSync('src/assets/locales/zh.json', 'utf8'));
await build({
    entryPoints: ['src/components/sidebar/ConversationsList.jsx'],
    outfile: 'temp/conversation-fork-react-test.mjs',
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    plugins: [{name: 'conversation-fork-fixtures', setup(builder) {
        builder.onResolve({filter: /^react(?:\/|$)/}, ({path}) => ({path, external: true}));
        builder.onResolve({filter: /^(?:@\/|react-i18next$|sonner$)/}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => {
            let contents;
            if (path === '@/lib/apiClient.js') contents = 'export default {get:(...args)=>globalThis.__forkTest.api.get(...args),post:(...args)=>globalThis.__forkTest.api.post(...args)}';
            else if (path === '@/config.js') contents = 'export const apiEndpoint={CHAT_CONVERSATIONS_ENDPOINT:"/chat/conversations",TASKS_ENDPOINT:"/tasks"}';
            else if (path === '@/context/useEventStore.jsx') contents = 'export const onEvent=({event})=>({then:callback=>{const listeners=globalThis.__forkTest.listeners;const set=listeners.get(event)||new Set();listeners.set(event,set);set.add(callback);return()=>set.delete(callback)}})';
            else if (path === '@/features/tasks/useTaskStore.js') contents = 'export const useTaskStore={getState:()=>globalThis.__forkTest.taskStore.getState()}';
            else if (path === 'react-i18next') contents = 'export const useTranslation=()=>({t:(key,args)=>globalThis.__forkTest.t(key,args),i18n:{language:"zh-CN"}})';
            else if (path === 'sonner') contents = 'export const toast={success:(...a)=>globalThis.__forkTest.toasts.push(a),error:(...a)=>globalThis.__forkTest.toasts.push(a),info:(...a)=>globalThis.__forkTest.toasts.push(a)}';
            else if (path === '@/lib/tools.jsx') contents = 'import{useState}from"react";export const generateUUID=()=>crypto.randomUUID();export const CONVERSATION_LIST_COMPACT_SETTING_KEY="compact";export const CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY="timestamps";export const useLocalSetting=(_key,value)=>useState(value);export const UnifiedErrorScreen=({title})=><div role="alert">{title}</div>;export const UnifiedLoadingScreen=({text})=><div>{text}</div>';
            else if (path.endsWith('/button')) contents = 'export const Button=({variant,size,asChild,...props})=><button {...props}/>';
            else if (path.endsWith('/input')) contents = 'import{forwardRef}from"react";export const Input=forwardRef(({onChange,...props},ref)=><input {...props} ref={ref} onInput={onChange}/>)';
            else if (path.endsWith('/badge')) contents = 'export const Badge=({variant,...props})=><span {...props}/>';
            else if (path.endsWith('/progress')) contents = 'export const Progress=({value,...props})=><div role="progressbar" aria-valuenow={value} {...props}/>';
            else if (path.endsWith('/DeleteConfirmDialog')) contents = 'export const DeleteConfirmDialog=()=>null';
            else if (path.endsWith('/dialog')) contents = 'export const Dialog=({open,children})=>open?<section role="dialog">{children}</section>:null;export const DialogContent=({children,...props})=><div {...props}>{children}</div>;export const DialogHeader=DialogContent;export const DialogFooter=DialogContent;export const DialogTitle=DialogContent;export const DialogDescription=DialogContent;';
            else if (path.endsWith('/dropdown-menu')) contents = 'import{createContext,useContext,cloneElement}from"react";const C=createContext({});export const DropdownMenu=({children,...props})=><C.Provider value={props}>{children}</C.Provider>;export const DropdownMenuTrigger=({children})=>{const c=useContext(C);return cloneElement(children,{onClick:()=>c.onOpenChange(!c.open)})};export const DropdownMenuContent=({children})=>useContext(C).open?<div role="menu">{children}</div>:null;export const DropdownMenuItem=({children,onSelect,variant,...props})=><button role="menuitem" {...props} onClick={onSelect}>{children}</button>;export const DropdownMenuLabel=({children,...props})=><div {...props}>{children}</div>;export const DropdownMenuSeparator=()=>null';
            else throw new Error(`Missing fork fixture: ${path}`);
            return {loader: 'jsx', contents};
        });
    }}],
});
const {default: ConversationsList} = await import('../temp/conversation-fork-react-test.mjs');

const row = id => ({conversationId: id, title: `会话 ${id}`, updateDate: '2026-10-24T10:00:00Z', children: []});
const makeTask = (patch = {}) => ({taskId: 'fork-task', kind: 'conversation.fork', revision: 1, status: 'queued', stage: 'queued', progress: null, ...patch});
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return {promise, resolve, reject}; };

async function setup(t, api = {}, {strict = false} = {}) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat/source', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const oldTasks = useTaskStore.getState();
    useTaskStore.setState({tasks: {}, open: false, selectedId: null});
    const gets = [], posts = [], selections = [];
    let currentTask = makeTask();
    const fixture = {
        taskStore: useTaskStore, listeners: new Map(), toasts: [],
        t: (key, args) => {
            const value = key.split('.').reduce((object, part) => object?.[part], translations) || args?.defaultValue || key;
            return typeof value === 'string' ? value.replaceAll('{{count}}', String(args?.count ?? '')) : key;
        },
        api: {
            get: async (...args) => {
                gets.push(args);
                if (api.get) return api.get(...args);
                if (args[0].startsWith('/tasks/')) return currentTask;
                return {data: [row('source')], total: 1};
            },
            post: async (...args) => { posts.push(args); return api.post ? api.post(...args) : currentTask; },
        },
    };
    globalThis.__forkTest = fixture;
    const container = document.getElementById('root'), root = createRoot(container);
    const render = () => act(async () => {
        const list = React.createElement(ConversationsList, {onSelect: id => selections.push(id)});
        root.render(strict ? React.createElement(React.StrictMode, null, list) : list);
        await new Promise(resolve => setTimeout(resolve, 10));
    });
    const button = (label, scope = container) => [...scope.querySelectorAll('button')].find(item => item.textContent === label || item.getAttribute('aria-label') === label);
    const click = element => act(async () => { assert.ok(element, 'button exists'); element.click(); await new Promise(resolve => setTimeout(resolve, 5)); });
    const emit = task => act(async () => { currentTask = task; for (const callback of fixture.listeners.get('task.changed') || []) callback({payload: task}); });
    const openMenu = async (id = 'source') => click(button('更多', container.querySelector(`[data-conversation-id="${id}"]`)));
    const start = async ({confirm = true} = {}) => { await openMenu(); await click(button('复制会话')); if (confirm && button('停止生成并复制')) await click(button('停止生成并复制')); };
    const settle = (ms = 10) => act(async () => { await new Promise(resolve => setTimeout(resolve, ms)); });
    let unmounted = false;
    const unmount = async () => { if (!unmounted) { await act(async () => root.unmount()); unmounted = true; } };
    const close = async () => { await unmount(); dom.window.close(); };
    t.after(async () => {
        await close();
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
        useTaskStore.setState(oldTasks, true);
        delete globalThis.__forkTest;
        delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    });
    return {container, dom, gets, posts, selections, fixture, render, button, click, emit, openMenu, start, settle, unmount};
}

test('conversation menu submits a fork, follows real progress, refreshes and opens only on request', async t => {
    const submission = deferred();
    let copied = false;
    const ui = await setup(t, {
        post: () => submission.promise,
        get: async url => url.startsWith('/tasks/') ? makeTask() : {data: [row('source'), ...(copied ? [row('copy')] : [])], total: copied ? 2 : 1},
    });
    await ui.render();
    await ui.start();
    assert.equal(ui.posts.length, 1);
    assert.equal(ui.posts[0][0], '/chat/conversations/source/fork');
    assert.equal(ui.posts[0][1].confirmed, true);
    assert.match(ui.posts[0][1].clientRequestId, /^[a-f\d-]{36}$/i);
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /正在提交复制任务/);
    assert.equal(ui.container.querySelector('[role="progressbar"]').hasAttribute('aria-valuenow'), false);
    await act(async () => submission.resolve(makeTask()));
    await ui.emit(makeTask({revision: 2, status: 'running', stage: 'copying', progress: 38}));
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /复制消息和分支.*38%/);
    assert.equal(ui.container.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'), '38');
    await ui.emit(makeTask({revision: 1, stage: 'reading', progress: 4}));
    assert.equal(ui.container.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'), '38');
    copied = true;
    await ui.emit(makeTask({revision: 3, status: 'completed', stage: 'completed', progress: 100, result: {conversationId: 'copy', title: '副本', messageCount: 21}}));
    await ui.settle();
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /会话复制完成.*21 条消息/);
    assert.ok(ui.container.querySelector('[data-conversation-id="copy"]'));
    assert.deepEqual(ui.selections, [], 'background completion does not interrupt the current chat');
    await ui.click(ui.button('打开副本'));
    assert.deepEqual(ui.selections, ['copy']);
    assert.equal(ui.container.querySelector('[role="dialog"]'), null);
});

test('rapid menu selection and StrictMode submit the same operation only once', async t => {
    const pending = deferred();
    const ui = await setup(t, {post: () => pending.promise}, {strict: true});
    await ui.render();
    await ui.openMenu();
    const button = ui.button('复制会话');
    await act(async () => { button.click(); button.click(); });
    assert.equal(ui.posts.length, 0);
    const confirm = ui.button('停止生成并复制');
    await act(async () => { confirm.click(); confirm.click(); });
    assert.equal(ui.posts.length, 1);
    await act(async () => pending.resolve(makeTask()));
    await ui.click(ui.button('后台继续'));
    await ui.start();
    assert.equal(ui.posts.length, 1, 'reopening an active copy does not create a new operation');
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /等待后台处理/);
});

test('uncertain submission preserves request identity, errors remain visible and retry confirms once', async t => {
    let count = 0;
    const ui = await setup(t, {post: async () => { if (++count === 1) throw new Error('连接中断'); return makeTask(); }});
    await ui.render();
    await ui.start();
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /连接中断.*同一次请求不会重复创建副本/);
    assert.equal(ui.button('打开副本'), undefined);
    await ui.click(ui.button('关闭'));
    await ui.start();
    assert.equal(ui.posts.length, 1, 'reopening an unknown submission keeps its confirmation state');
    await ui.click(ui.button('重试确认'));
    assert.equal(ui.posts.length, 2);
    assert.deepEqual(ui.posts[0][1], ui.posts[1][1]);
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /等待后台处理/);
});

test('backend task failure remains visible and never offers or opens a partial copy', async t => {
    const ui = await setup(t);
    await ui.render();
    await ui.start();
    const originalListLoads = ui.gets.filter(([url]) => url === '/chat/conversations').length;
    await ui.emit(makeTask({revision: 2, status: 'failed', error: '附件引用权限检查失败'}));
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /会话复制失败/);
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /权限检查失败/);
    assert.equal(ui.button('打开副本'), undefined);
    assert.deepEqual(ui.selections, []);
    assert.equal(ui.gets.filter(([url]) => url === '/chat/conversations').length, originalListLoads);
    await ui.click(ui.button('查看后台任务'));
    assert.equal(useTaskStore.getState().selectedId, 'fork-task');
    assert.equal(useTaskStore.getState().open, true);
});

test('closing the progress window continues tracking without posting a cancellation', async t => {
    const ui = await setup(t);
    await ui.render();
    await ui.start();
    await ui.click(ui.button('后台继续'));
    assert.equal(ui.container.querySelector('[role="dialog"]'), null);
    await ui.emit(makeTask({revision: 2, status: 'completed', result: {conversationId: 'copy', messageCount: 1}}));
    assert.deepEqual(ui.selections, []);
    assert.equal(ui.posts.length, 1);
    assert.equal(useTaskStore.getState().tasks['fork-task'].status, 'completed');
});

test('a completed fork reloads both first-page history and the current paginated search', async t => {
    const searchOffsets = [];
    const historyOffsets = [];
    const ui = await setup(t, {get: async (url, options) => {
        if (url.startsWith('/tasks/')) return makeTask();
        if (url.endsWith('/search')) {
            searchOffsets.push(options.params.offset);
            const incoming = options.params.offset ? [row('older')] : [row('source')];
            return {data: incoming, total: 2, hasMore: options.params.offset === 0};
        }
        historyOffsets.push(options.params.offset);
        return {data: [row('source')], total: 1};
    }});
    await ui.render();
    const input = ui.container.querySelector('input[type="search"]');
    await act(async () => { input.value = '会话'; input.dispatchEvent(new ui.dom.window.Event('input', {bubbles: true})); });
    await ui.settle(280);
    await ui.click(ui.button('加载更多'));
    assert.deepEqual(searchOffsets, [0, 1]);
    await ui.start();
    await ui.emit(makeTask({revision: 2, status: 'completed', result: {conversationId: 'copy', messageCount: 2}}));
    await ui.settle();
    assert.deepEqual(searchOffsets, [0, 1, 0]);
    assert.deepEqual(historyOffsets, [0, 0]);
    assert.equal(input.value, '会话', 'copying preserves the user search');
});

test('lost realtime delivery falls back to task refresh after transport reconnect', async t => {
    let task = makeTask();
    const ui = await setup(t, {get: async url => url.startsWith('/tasks/') ? task : {data: [row('source')], total: 1}});
    await ui.render();
    await ui.start();
    task = makeTask({revision: 5, status: 'running', stage: 'registering', progress: 97});
    await act(async () => { for (const callback of ui.fixture.listeners.get('transport.connected') || []) callback({payload: {}}); });
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /保存会话副本.*97%/);
});

test('permission failures and invalid server responses do not claim a successful fork', async t => {
    let attempts = 0;
    const ui = await setup(t, {post: async () => {
        if (++attempts === 1) throw new Error('无权访问该会话');
        return {taskId: 'invalid', kind: 'something.else', revision: 1};
    }});
    await ui.render();
    await ui.start();
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /无权访问该会话/);
    assert.deepEqual(useTaskStore.getState().tasks, {});
    await ui.click(ui.button('重试确认'));
    assert.match(ui.container.querySelector('[role="alert"]').textContent, /Invalid fork task response/);
    assert.deepEqual(useTaskStore.getState().tasks, {});
    assert.deepEqual(ui.selections, []);
});

test('a late submission response after leaving the sidebar never navigates to the copy', async t => {
    const pending = deferred();
    const ui = await setup(t, {post: () => pending.promise});
    await ui.render();
    await ui.start();
    await ui.unmount();
    await act(async () => pending.resolve(makeTask({status: 'completed', result: {conversationId: 'copy', messageCount: 1}})));
    assert.deepEqual(ui.selections, []);
    assert.equal(useTaskStore.getState().tasks['fork-task'].status, 'completed', 'accepted background tasks remain available in the shared task center');
});


test('copy requires a second confirmation and cancelling never stops generation or posts', async t => {
    const ui = await setup(t);
    await ui.render();
    await ui.start({confirm: false});
    assert.equal(ui.posts.length, 0);
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /停止此会话中仍在生成.*正在生成或未完成.*所有设备/);
    await ui.click(ui.button('取消'));
    assert.equal(ui.posts.length, 0);
    assert.equal(ui.container.querySelector('[role="dialog"]'), null);
    await ui.start();
    assert.equal(ui.posts.length, 1);
    assert.equal(ui.posts[0][1].confirmed, true);
    await ui.emit(makeTask({revision: 2, status: 'completed', result: {conversationId: 'copy', messageCount: 8, skippedMessageCount: 2}}));
    assert.match(ui.container.querySelector('[role="dialog"]').textContent, /8 条消息.*跳过 2 条未完成/);
});
