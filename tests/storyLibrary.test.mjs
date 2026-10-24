import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { normalizeStoryExportIds, toggleStorySelection } from '../src/features/story/storyLibraryState.js';
import { useTaskStore } from '../src/features/tasks/useTaskStore.js';

await build({
    entryPoints: ['src/features/story/StoriesPage.jsx'], outfile: 'temp/story-library-react-test.mjs',
    bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external',
    plugins: [{ name: 'story-library-fixture', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
        builder.onResolve({ filter: /^(react-i18next|sonner)$/ }, ({ path: name }) => ({ path: name, namespace: 'fixture' }));
        builder.onResolve({ filter: /StoryReader\.jsx$/ }, () => ({ path: 'reader', namespace: 'fixture' }));
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => ({ path: name, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: name }) => {
            let contents;
            if (name === '@/lib/apiClient.js') contents = 'export const isAuthRedirectError=e=>e?.isAuthRedirect;export default {get:(...a)=>globalThis.__storiesApi.get(...a),post:(...a)=>globalThis.__storiesApi.post(...a),patch:(...a)=>globalThis.__storiesApi.patch(...a),delete:(...a)=>globalThis.__storiesApi.delete(...a)}';
            else if (name === '@/config.js') contents = 'export const apiEndpoint={STORIES_ENDPOINT:"/stories",CHAT_CONVERSATIONS_ENDPOINT:"/chat/conversations"}';
            else if (name === '@/lib/virtualUrl.js') contents = 'export const resolveResourceUrl=v=>v';
            else if (name === 'sonner') contents = 'export const toast={success:(...args)=>globalThis.__storiesToasts.push(["success",...args]),warning:(...args)=>globalThis.__storiesToasts.push(["warning",...args]),error:(...args)=>globalThis.__storiesToasts.push(["error",...args])}';
            else if (name === 'react-i18next') contents = 'export const useTranslation=()=>({t:(_key,fallback)=>fallback})';
            else if (name === '@/context/useEventStore.jsx') contents = 'export const onEvent=()=>({then:cb=>{globalThis.__storiesEvent=cb;return()=>{globalThis.__storiesEvent=null}}})';
            else if (name === '@/features/tasks/useTaskStore.js') contents = 'export const useTaskStore={getState:()=>globalThis.__storiesTaskStore.getState()}';
            else if (name === 'reader') contents = 'export default function Reader({story,open,onClose,onUpdatePartMedia}){return open?<section data-reader="true" data-editable={Boolean(onUpdatePartMedia)}>{story.title}<button onClick={onClose}>关闭阅读</button></section>:null}';
            else if (name.endsWith('/button')) contents = 'export const Button=({variant,size,asChild,...props})=><button {...props}/>';
            else if (name.endsWith('/input')) contents = 'export const Input=({onChange,autoFocus,...props})=><input {...props} onInput={onChange}/>';
            else if (name.endsWith('/textarea')) contents = 'export const Textarea=({onChange,...props})=><textarea {...props} onInput={onChange}/>';
            else if (name.endsWith('/checkbox')) contents = 'export const Checkbox=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked===true} onChange={e=>onCheckedChange(e.target.checked)} {...props}/>';
            else if (name.endsWith('/select')) contents = 'import{createContext,useContext}from"react";const C=createContext({});export const Select=({children,...props})=><C.Provider value={props}>{children}</C.Provider>;export const SelectTrigger=()=>null;export const SelectValue=()=>null;export const SelectContent=({children})=>{const c=useContext(C);return <select aria-label="选择创作对话" value={c.value} disabled={c.disabled} onChange={e=>c.onValueChange(e.target.value)}><option value="">选择一个已有对话</option>{children}</select>};export const SelectItem=props=><option {...props}/>';
            else if (name.endsWith('/dialog')) contents = 'export const Dialog=({open,children})=>open?<div role="dialog">{children}</div>:null;export const DialogContent=({children})=><div>{children}</div>;export const DialogHeader=DialogContent;export const DialogFooter=DialogContent;export const DialogTitle=DialogContent;export const DialogDescription=DialogContent;';
            else if (name.endsWith('/dropdown-menu')) contents = 'export const DropdownMenu=({children})=><div>{children}</div>;export const DropdownMenuContent=DropdownMenu;export const DropdownMenuTrigger=({children})=>children;export const DropdownMenuItem=({children,...props})=><button {...props}>{children}</button>';
            else if (name.endsWith('/DeleteConfirmDialog')) contents = 'export const DeleteConfirmDialog=({open,onConfirm,description,isDeleting})=>open?<div role="alertdialog">{description}<button disabled={isDeleting} onClick={onConfirm}>确认删除</button></div>:null';
            else throw new Error(`Missing fixture ${name}`);
            return { loader: 'jsx', contents };
        });
    } }],
});
const { default: StoriesPage } = await import('../temp/story-library-react-test.mjs');

const story = id => ({ storyId: id, title: `故事 ${id}`, description: `简介 ${id}`, status: 'completed', partCount: 2 });
const pageData = id => ({ items: [story(id)], total: 24, page: id, pageSize: 12 });
const deferred = () => { let resolve; const promise = new Promise(value => { resolve = value; }); return { promise, resolve }; };

async function setup(t, api = {}) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/stories', pretendToBeVisual: true });
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'localStorage', 'Event', 'MouseEvent'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.__storiesToasts = [];
    const previousTasks = useTaskStore.getState();
    useTaskStore.setState({ tasks: {}, open: false, selectedId: null });
    globalThis.__storiesTaskStore = useTaskStore;
    globalThis.__storiesApi = { get: async () => pageData(1), post: async () => ({}), patch: async () => ({}), delete: async () => ({}), ...api };
    const container = document.getElementById('root'), root = createRoot(container);
    const settle = (delay = 25) => act(async () => { await new Promise(resolve => setTimeout(resolve, delay)); });
    const click = element => act(async () => { element.click(); await new Promise(resolve => setTimeout(resolve, 10)); });
    const render = props => act(async () => { root.render(React.createElement(StoriesPage, props)); await new Promise(resolve => setTimeout(resolve, 20)); });
    t.after(async () => {
        await act(async () => root.unmount()); dom.window.close();
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
        useTaskStore.setState(previousTasks, true);
        for (const key of ['__storiesApi', '__storiesToasts', '__storiesTaskStore', '__storiesEvent', 'IS_REACT_ACT_ENVIRONMENT']) delete globalThis[key];
    });
    const button = label => [...container.querySelectorAll('button')].find(item => item.textContent === label);
    return { dom, container, settle, click, render, button };
}

test('selection remains ordered and page toggles preserve selections from other pages', () => {
    const selected = toggleStorySelection(new Set(['first']), ['second', 'third'], true);
    assert.deepEqual([...selected], ['first', 'second', 'third']);
    assert.deepEqual([...toggleStorySelection(selected, ['second', 'third'], false)], ['first']);
});

test('export IDs meet the strict integer contract and oversized exports are never truncated', () => {
    assert.deepEqual(normalizeStoryExportIds(['1', 2, '2', '03']), [1, 2, 3]);
    for (const value of ['0', '-1', '1.2', 'invalid', true, '9007199254740992']) {
        assert.throws(() => normalizeStoryExportIds([value]), /故事 ID 无效/);
    }
    assert.equal(normalizeStoryExportIds(Array.from({ length: 100 }, (_, i) => String(i + 1))).length, 100);
    assert.throws(() => normalizeStoryExportIds(Array.from({ length: 101 }, (_, i) => String(i + 1))), /最多导出 100 个故事，请分批/);
});

test('batch export retains selections across pages and opens the queued task without downloading a blob', async t => {
    const requests = [], downloads = [], blobRequests = [];
    const task = { taskId: 'story-export-1', kind: 'story.export', status: 'queued', revision: 1, title: '导出 2 个故事' };
    const ui = await setup(t, {
        get: async (_url, options) => pageData(options.params.page),
        post: async (...args) => { requests.push(args); return task; },
    });
    const originalCreate = URL.createObjectURL, originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = value => { blobRequests.push(value); return 'blob:story-export'; };
    URL.revokeObjectURL = () => {};
    ui.dom.window.HTMLAnchorElement.prototype.click = function () { downloads.push({ href: this.href, filename: this.download }); };
    t.after(() => { URL.createObjectURL = originalCreate; URL.revokeObjectURL = originalRevoke; });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="选择本页故事"]'));
    await ui.click(ui.container.querySelector('[aria-label="下一页故事"]'));
    await ui.click(ui.container.querySelector('[aria-label="选择本页故事"]'));
    assert.match(ui.container.textContent, /已选择 2 个故事/);
    await ui.click(ui.button('批量导出'));
    assert.equal(requests[0][0], '/stories/export');
    assert.deepEqual(requests[0][1], { storyIds: [1, 2] });
    assert.equal(requests[0].length, 2, 'the API uses its normal JSON task response');
    assert.deepEqual(downloads, []);
    assert.deepEqual(blobRequests, []);
    assert.deepEqual(useTaskStore.getState().tasks[task.taskId], task);
    assert.equal(useTaskStore.getState().open, true);
    assert.equal(useTaskStore.getState().selectedId, task.taskId);
    const success = globalThis.__storiesToasts.find(item => item[0] === 'success');
    assert.match(success[1], /已提交 2 个故事的后台导出任务/);
    assert.match(success[2].description, /任务中心查看进度/);
    assert.doesNotMatch(success[1], /已导出|已完成/);
    assert.match(ui.container.textContent, /已选择 2 个故事/);
    assert.equal(ui.button('批量导出').disabled, false, 'a queued task must not lock further submissions');
});

test('only the export submission is locked and a rapid double click submits once', async t => {
    const pending = deferred(), requests = [];
    const ui = await setup(t, { post: (...args) => { requests.push(args); return pending.promise; } });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="选择本页故事"]'));
    const button = ui.button('批量导出');
    await act(async () => { button.click(); button.click(); });
    assert.equal(requests.length, 1);
    assert.equal(ui.button('批量导出').disabled, true);
    assert.deepEqual(globalThis.__storiesToasts, []);
    await act(async () => { pending.resolve({ taskId: 'story-export-delayed', kind: 'story.export', status: 'running', revision: 2 }); });
    assert.equal(ui.button('批量导出').disabled, false);
    assert.equal(useTaskStore.getState().selectedId, 'story-export-delayed');
});

test('failed submission retains selected stories and can be retried', async t => {
    let requests = 0;
    const ui = await setup(t, { post: async () => {
        requests++;
        if (requests === 1) throw new Error('无法连接到后台');
        return { taskId: 'story-export-retry', kind: 'story.export', status: 'queued', revision: 1 };
    } });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="选择本页故事"]'));
    await ui.click(ui.button('批量导出'));
    assert.match(ui.container.textContent, /已选择 1 个故事/);
    assert.equal(ui.button('批量导出').disabled, false);
    assert.equal(useTaskStore.getState().open, false);
    assert.deepEqual(useTaskStore.getState().tasks, {});
    assert.deepEqual(globalThis.__storiesToasts[0], ['error', '无法导出故事', { description: '无法连接到后台' }]);
    await ui.click(ui.button('批量导出'));
    assert.equal(requests, 2);
    assert.equal(useTaskStore.getState().selectedId, 'story-export-retry');
});

test('an invalid submission response does not claim that export succeeded', async t => {
    const ui = await setup(t, { post: async () => ({}) });
    await ui.render();
    await ui.click(ui.button('导出 HTML 压缩包'));
    assert.equal(useTaskStore.getState().open, false);
    assert.deepEqual(useTaskStore.getState().tasks, {});
    assert.equal(globalThis.__storiesToasts.some(item => item[0] === 'success'), false);
    assert.match(globalThis.__storiesToasts[0][2].description, /未收到有效的导出任务/);
});

test('selecting more than 100 stories disables bulk export with an explicit split hint', async t => {
    let posts = 0;
    const ui = await setup(t, {
        get: async () => ({ items: Array.from({ length: 101 }, (_, i) => story(i + 1)), total: 101 }),
        post: async () => { posts++; return {}; },
    });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="选择本页故事"]'));
    const button = ui.button('批量导出');
    assert.equal(button.disabled, true);
    assert.match(button.title, /每次最多导出 100 个故事，请分批选择/);
    await ui.click(button);
    assert.equal(posts, 0);
    assert.match(ui.container.textContent, /已选择 101 个故事/);
});

test('rapid story switches ignore an earlier detail response and keep reading read-only', async t => {
    const first = deferred(), second = deferred();
    const ui = await setup(t, { get: async url => url === '/stories' ? { items: [story(1), story(2)], total: 2 } : url.endsWith('/1') ? first.promise : second.promise });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="阅读故事：故事 1"]'));
    await ui.click(ui.container.querySelector('[aria-label="阅读故事：故事 2"]'));
    await act(async () => { second.resolve({ story: { ...story(2), parts: [] } }); });
    assert.match(ui.container.querySelector('[data-reader]').textContent, /故事 2/);
    assert.equal(ui.container.querySelector('[data-reader]').dataset.editable, 'false');
    await act(async () => { first.resolve({ story: { ...story(1), parts: [] } }); });
    assert.match(ui.container.querySelector('[data-reader]').textContent, /故事 2/);
});

test('a newly created story and live changes refresh without navigating away', async t => {
    let nextItems = [story(1)], gets = 0;
    const ui = await setup(t, { get: async () => { gets++; return { items: nextItems, total: nextItems.length }; } });
    await ui.render();
    assert.equal(ui.container.querySelectorAll('[data-story-id]').length, 1);
    nextItems = [story(2), { ...story(1), title: '已更新的故事' }];
    await act(async () => { globalThis.__storiesEvent({ event: 'story.changed', payload: { value: { story: nextItems[0] } } }); });
    await ui.settle(250);
    assert.equal(gets, 2);
    assert.equal(ui.container.querySelectorAll('[data-story-id]').length, 2);
    assert.match(ui.container.textContent, /已更新的故事/);
    await ui.click(ui.container.querySelector('[aria-label="选择故事：故事 2"]'));
    nextItems = [nextItems[1]];
    await act(async () => { globalThis.__storiesEvent({ event: 'story.deleted', payload: { value: { storyId: 2 } } }); });
    assert.equal(ui.container.querySelector('[data-story-id="2"]'), null);
    assert.doesNotMatch(ui.container.textContent, /已选择 1 个故事/);
});

test('delete requires confirmation and leaves original assets untouched', async t => {
    const deleted = [];
    const ui = await setup(t, { delete: async url => { deleted.push(url); }, get: async () => ({ items: deleted.length ? [] : [story(1)], total: deleted.length ? 0 : 1 }) });
    await ui.render();
    await ui.click(ui.button('删除故事'));
    assert.equal(deleted.length, 0);
    assert.match(ui.container.querySelector('[role="alertdialog"]').textContent, /附件库中的原始素材会保留/);
    await ui.click(ui.button('确认删除'));
    assert.deepEqual(deleted, ['/stories/1']);
    assert.equal(ui.container.querySelector('[data-story-id="1"]'), null);
});

test('live updates do not cancel a manual reader switch and deleted pending stories cannot reopen', async t => {
    const pending = deferred();
    let pendingSignal;
    const ui = await setup(t, { get: async (url, options) => {
        if (url === '/stories') return { items: [story(1), story(2)], total: 2 };
        if (url === '/stories/1') return { story: story(1) };
        pendingSignal = options.signal;
        return pending.promise;
    } });
    await ui.render();
    await ui.click(ui.container.querySelector('[aria-label="阅读故事：故事 1"]'));
    await ui.click(ui.container.querySelector('[aria-label="阅读故事：故事 2"]'));
    await act(async () => { globalThis.__storiesEvent({ event: 'story.changed', payload: { value: story(1) } }); });
    await ui.settle(250);
    assert.equal(pendingSignal.aborted, false, 'refreshing the earlier story must not abort the new selection');
    await act(async () => { globalThis.__storiesEvent({ event: 'story.deleted', payload: { value: { storyId: 2 } } }); });
    assert.equal(pendingSignal.aborted, true);
    await act(async () => { pending.resolve({ story: story(2) }); });
    assert.equal(ui.container.querySelector('[data-reader]'), null, 'an outdated detail response cannot reopen a deleted story');
});

test('creating from the library requires an explicitly selected owned conversation', async t => {
    const requests = [];
    const ui = await setup(t, {
        get: async (url, options) => {
            requests.push(['get', url, options]);
            return url === '/stories' ? { items: [], total: 0 } : { data: [{ conversationId: 'parent', title: '主对话', children: [{ conversationId: 'writer', title: '故事创作' }] }], total: 2 };
        },
        post: async (...args) => { requests.push(['post', ...args]); return { story: story(1) }; },
    });
    await ui.render();
    await ui.click(ui.button('新建故事'));
    await ui.settle();
    const input = ui.container.querySelector('#story-title');
    await act(async () => { input.value = '新故事'; input.dispatchEvent(new ui.dom.window.Event('input', { bubbles: true })); });
    assert.equal(ui.button('创建故事').disabled, true, 'a title alone must not create an uneditable draft');
    const select = ui.container.querySelector('select[aria-label="选择创作对话"]');
    assert.ok([...select.options].some(item => item.value === 'writer'), 'child conversations are selectable');
    await act(async () => { select.value = 'writer'; select.dispatchEvent(new ui.dom.window.Event('change', { bubbles: true })); });
    assert.equal(ui.button('创建故事').disabled, false);
    await act(async () => { ui.container.querySelector('form').dispatchEvent(new ui.dom.window.Event('submit', { bubbles: true, cancelable: true })); });
    const request = requests.find(item => item[0] === 'post');
    assert.deepEqual(request, ['post', '/stories', { title: '新故事', description: '', conversationId: 'writer' }]);
    const listRequest = requests.find(item => item[1] === '/chat/conversations');
    assert.deepEqual(listRequest[2].params, { offset: 0, limit: 100 });
});

test('creating while a conversation is active defaults to that conversation', async t => {
    const posts = [];
    const ui = await setup(t, {
        get: async url => url === '/stories' ? { items: [], total: 0 } : { data: [], total: 0 },
        post: async (...args) => { posts.push(args); return { story: story(1) }; },
    });
    await ui.render({ conversationId: 'current-writer' });
    await ui.click(ui.button('新建故事'));
    await ui.settle();
    const input = ui.container.querySelector('#story-title');
    await act(async () => { input.value = '当前对话的故事'; input.dispatchEvent(new ui.dom.window.Event('input', { bubbles: true })); });
    assert.equal(ui.container.querySelector('select').value, 'current-writer');
    assert.equal(ui.button('创建故事').disabled, false);
    await act(async () => { ui.container.querySelector('form').dispatchEvent(new ui.dom.window.Event('submit', { bubbles: true, cancelable: true })); });
    assert.equal(posts[0][1].conversationId, 'current-writer');
});

test('an empty conversation list guides users to create a conversation without silently creating one', async t => {
    const navigations = [], posts = [];
    const ui = await setup(t, {
        get: async url => url === '/stories' ? { items: [], total: 0 } : { data: [], total: 0 },
        post: async (...args) => { posts.push(args); },
    });
    await ui.render({ onNavigate: url => navigations.push(url) });
    await ui.click(ui.button('新建故事'));
    await ui.settle();
    assert.equal(ui.button('创建故事').disabled, true);
    assert.match(ui.container.textContent, /请先在对话页创建一个会话/);
    await ui.click(ui.button('前往对话页'));
    assert.deepEqual(navigations, ['/chat']);
    assert.deepEqual(posts, []);
});

test('creation conversation search queries the backend instead of only filtering the recent page', async t => {
    const requests = [];
    const ui = await setup(t, { get: async (url, options) => {
        requests.push([url, options]);
        if (url === '/stories') return { items: [], total: 0 };
        return { data: url.endsWith('/search') ? [{ conversationId: 'older-writer', title: '以前的写作对话' }] : [], total: 1 };
    } });
    await ui.render();
    await ui.click(ui.button('新建故事'));
    await ui.settle();
    const input = ui.container.querySelector('[aria-label="搜索创作对话"]');
    await act(async () => { input.value = '写作'; input.dispatchEvent(new ui.dom.window.Event('input', { bubbles: true })); });
    await ui.settle(300);
    const request = requests.find(item => item[0] === '/chat/conversations/search');
    assert.deepEqual(request[1].params, { q: '写作', offset: 0, limit: 100 });
    assert.ok(ui.container.querySelector('option[value="older-writer"]'));
});
