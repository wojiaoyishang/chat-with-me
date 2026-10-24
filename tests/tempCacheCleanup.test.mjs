import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

await build({
    entryPoints: ['src/components/setting/TempCacheCleanup.jsx'],
    outfile: 'temp/temp-cache-cleanup-test.mjs',
    bundle: true, format: 'esm', platform: 'node', packages: 'external', jsx: 'automatic',
    plugins: [{ name: 'temp-cleanup-controls', setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
        builder.onResolve({ filter: /^@\// }, ({ path }) => ({ path, namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => {
            if (path.includes('apiClient')) return { contents: 'export default {get:(...args)=>globalThis.__tempCleanupApi.get(...args),post:(...args)=>globalThis.__tempCleanupApi.post(...args)};' };
            if (path.endsWith('/button')) return { contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;', loader: 'jsx' };
            if (path.endsWith('/progress')) return { contents: 'export const Progress=({value,...props})=><div role="progressbar" data-value={value} {...props}/>;', loader: 'jsx' };
            if (path.endsWith('/alert-dialog')) return { contents: `
                export const AlertDialog=({open,children})=>open?<div>{children}</div>:null;
                export const AlertDialogContent=({children})=><div role="alertdialog">{children}</div>;
                export const AlertDialogHeader=({children})=><header>{children}</header>;
                export const AlertDialogTitle=({children,...props})=><h2 {...props}>{children}</h2>;
                export const AlertDialogDescription=({children,...props})=><p {...props}>{children}</p>;
                export const AlertDialogFooter=({children})=><footer>{children}</footer>;
                export const AlertDialogCancel=({children,...props})=><button {...props}>{children}</button>;
                export const AlertDialogAction=({children,...props})=><button {...props}>{children}</button>;
            `, loader: 'jsx' };
            throw new Error(`Unexpected test dependency ${path}`);
        });
    } }],
});
const { default: TempCacheCleanup } = await import('../temp/temp-cache-cleanup-test.mjs');
const endpoint = '/setting/debug/temp-cleanup';
const idle = { operationId: null, status: 'idle', phase: 'idle', processed: 0, total: 0, deleted: 0, failed: 0, percent: null, errors: [] };
const snapshot = (overrides = {}) => ({ ...idle, operationId: 'cleanup-one', status: 'running', phase: 'scanning', ...overrides });

async function setup(t, handlers = {}) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost', pretendToBeVisual: true });
    const keys = ['window', 'document', 'HTMLElement', 'Node', 'Event', 'IS_REACT_ACT_ENVIRONMENT', '__tempCleanupApi', 'setTimeout', 'clearTimeout'];
    const saved = new Map(keys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const calls = [], timers = new Map();
    let now = 0, timerId = 0;
    const nativeSetTimeout = globalThis.setTimeout, nativeClearTimeout = globalThis.clearTimeout;
    globalThis.setTimeout = (callback, delay, ...args) => {
        if (![600, 1200, 2400, 4800, 5000].includes(delay)) return nativeSetTimeout(callback, delay, ...args);
        const id = ++timerId;
        timers.set(id, { time: now + delay, callback: () => callback(...args) });
        return id;
    };
    globalThis.clearTimeout = (id) => timers.has(id) ? timers.delete(id) : nativeClearTimeout(id);
    const state = { latest: idle, postResult: snapshot() };
    globalThis.__tempCleanupApi = {
        get: async (url, options) => { calls.push({ method: 'GET', url, options }); return handlers.get ? handlers.get(url, options, state) : state.latest; },
        post: async (url, body, options) => { calls.push({ method: 'POST', url, body, options }); return handlers.post ? handlers.post(url, body, state) : (state.latest = state.postResult); },
    };
    const root = createRoot(document.getElementById('root'));
    let unmounted = false;
    await act(async () => root.render(React.createElement(TempCacheCleanup)));
    const unmount = async () => { if (!unmounted) { unmounted = true; await act(async () => root.unmount()); } };
    t.after(async () => {
        await unmount(); dom.window.close();
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    });
    const advance = async (ms) => {
        now += ms;
        for (const [id, timer] of [...timers]) if (timer.time <= now) {
            timers.delete(id); await act(async () => { timer.callback(); });
        }
    };
    return { calls, state, advance, timers, unmount, dom };
}
const button = (label) => [...document.querySelectorAll('button')].find((node) => node.textContent.trim() === label);
const click = async (label) => { const node = button(label); assert.ok(node, label); await act(async () => node.click()); };

test('cleanup requires a danger confirmation and cancel never submits a deletion', async (t) => {
    const ui = await setup(t);
    assert.equal(ui.calls.length, 1);
    assert.equal(ui.calls[0].url, endpoint);
    assert.equal(ui.calls[0].options.timeout, 15000, 'a hanging progress read must have a timeout');
    await click('清空 temp 缓存');
    const dialog = document.querySelector('[role="alertdialog"]');
    assert.match(dialog.textContent, /危险操作/);
    assert.match(dialog.textContent, /所有文件和子目录/);
    assert.match(dialog.textContent, /无法恢复/);
    assert.match(dialog.textContent, /检查点/);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
    await click('取消');
    assert.equal(document.querySelector('[role="alertdialog"]'), null);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
    await click('清空 temp 缓存');
    await click('确认永久删除');
    assert.deepEqual(ui.calls.find((call) => call.method === 'POST'), { method: 'POST', url: endpoint, body: { confirmed: true }, options: { timeout: 15000 } });
    assert.equal(button('正在清理').disabled, true);
    assert.match(document.body.textContent, /正在扫描 temp 文件/);
    assert.equal(document.querySelector('[role="progressbar"]').hasAttribute('aria-valuenow'), false);
});

test('restores a running operation on entry and shows real deletion progress and partial failures', async (t) => {
    const ui = await setup(t, { get: (_url, _options, state) => state.latest.operationId ? state.latest : snapshot() });
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
    ui.state.latest = snapshot({ phase: 'deleting', processed: 25, total: 100, deleted: 24, failed: 1, percent: 25, currentPath: 'cache/item.json' });
    await ui.advance(600);
    assert.equal(ui.calls.at(-1).url, `${endpoint}/cleanup-one`);
    assert.match(document.body.textContent, /25 \/ 100 · 25%/);
    assert.match(document.body.textContent, /已删除 24 项 · 失败 1 项/);
    assert.equal(document.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'), '25');
    ui.state.latest = snapshot({ status: 'completed_with_errors', phase: 'finished', processed: 100, total: 100, deleted: 99, failed: 1, percent: 100, errors: [{ path: 'locked.tmp', error: '文件仍被占用' }] });
    await ui.advance(600);
    assert.match(document.body.textContent, /清理结束，部分内容未能删除/);
    assert.match(document.body.textContent, /locked.tmp：文件仍被占用/);
    assert.match(document.body.textContent, /停止相关任务或解除文件占用/);
    assert.equal(button('清空 temp 缓存').disabled, false);
    assert.equal(ui.timers.size, 0, 'finished operation must stop polling');
});

test('disconnected polling backs off and resumes without posting another cleanup', async (t) => {
    let attempts = 0;
    const ui = await setup(t, { get: (_url) => {
        attempts++;
        if (attempts === 2) throw new Error('网络断开');
        return attempts > 2 ? snapshot({ status: 'completed', phase: 'finished', processed: 3, total: 3, deleted: 3, percent: 100 }) : snapshot();
    } });
    await ui.advance(600);
    assert.match(document.querySelector('[role="alert"]').textContent, /可能仍在后台进行/);
    assert.equal(button('正在清理').disabled, true);
    await ui.advance(600);
    assert.equal(attempts, 2, 'retry should back off after connection failure');
    await ui.advance(600);
    assert.match(document.body.textContent, /缓存清理完成/);
    assert.equal(document.querySelector('[role="alert"]'), null);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
});

test('newly created cache content is reported as remaining even if scanned deletions all succeeded', async (t) => {
    await setup(t, { get: () => snapshot({ status: 'completed_with_errors', phase: 'finished', processed: 7, total: 7, deleted: 7, failed: 0, remaining: 2, percent: 100, errors: [{ path: 'temp', error: '本轮扫描后仍有新增内容，停止任务后重试' }] }) });
    assert.match(document.body.textContent, /清理结束，部分内容未能删除/);
    assert.match(document.body.textContent, /仍有 2 项未清理/);
    assert.match(document.body.textContent, /停止任务后重试/);
    assert.match(document.body.textContent, /清理期间新建/);
});

test('polling requests never overlap and unmount aborts only the progress read', async (t) => {
    let release, signal, requests = 0;
    const ui = await setup(t, { get: (_url, options) => {
        requests++;
        if (requests === 1) return snapshot();
        signal = options.signal;
        return new Promise((resolve) => { release = resolve; });
    } });
    await ui.advance(600);
    await ui.advance(5000);
    assert.equal(requests, 2);
    assert.equal(ui.timers.size, 0, 'only schedule after the previous request settles');
    await ui.unmount();
    assert.equal(signal.aborted, true);
    await act(async () => release(snapshot({ status: 'completed', phase: 'finished' })));
    assert.equal(ui.timers.size, 0);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
});

test('an uncertain submit outcome refreshes state and does not automatically submit again', async (t) => {
    const ui = await setup(t, { post: (_url, _body, state) => {
        state.latest = snapshot();
        throw new Error('响应丢失');
    } });
    await click('清空 temp 缓存');
    await click('确认永久删除');
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 1);
    assert.match(document.body.textContent, /正在扫描 temp 文件/);
    assert.equal(button('正在清理').disabled, true);
    await ui.advance(600);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 1);
});

test('a rejected new cleanup retains its error instead of presenting an old completed record as success', async (t) => {
    const previous = snapshot({ operationId: 'old-completed', status: 'completed', phase: 'finished', processed: 10, total: 10, deleted: 10, percent: 100 });
    const ui = await setup(t, {
        get: () => previous,
        post: () => { throw Object.assign(new Error('temp 根目录不安全'), { code: 400 }); },
    });
    await click('清空 temp 缓存');
    await click('确认永久删除');
    assert.match(document.querySelector('[role="alert"]').textContent, /无法启动清理：temp 根目录不安全/);
    assert.match(document.querySelector('[role="status"]').textContent, /上次清理记录：缓存清理完成/);
    assert.doesNotMatch(document.querySelector('[role="alert"]').textContent, /无法确认/);
    await click('刷新进度');
    assert.match(document.querySelector('[role="alert"]').textContent, /无法启动清理/);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 1);
});

test('a timed out new submit keeps uncertainty for an old record until a different operation is found', async (t) => {
    const previous = snapshot({ operationId: 'old-completed', status: 'completed', phase: 'finished', processed: 2, total: 2, deleted: 2, percent: 100 });
    const ui = await setup(t, {
        get: (_url, _options, state) => state.latest.operationId ? state.latest : previous,
        post: () => { throw Object.assign(new Error('请求超时'), { code: 'ECONNABORTED' }); },
    });
    await click('清空 temp 缓存');
    await click('确认永久删除');
    assert.match(document.querySelector('[role="alert"]').textContent, /无法确认清理是否已启动：请求超时/);
    assert.match(document.querySelector('[role="status"]').textContent, /上次清理记录：缓存清理完成/);
    await click('刷新进度');
    assert.match(document.querySelector('[role="alert"]').textContent, /不会自动重复提交/);
    ui.state.latest = snapshot({ operationId: 'newly-started' });
    await click('刷新进度');
    assert.equal(document.querySelector('[role="alert"]'), null);
    assert.match(document.body.textContent, /正在扫描 temp 文件/);
    assert.equal(button('正在清理').disabled, true);
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 1);
});

test('a timed out initial read stays actionable and retries without permitting a blind cleanup', async (t) => {
    let reads = 0;
    const ui = await setup(t, { get: () => {
        if (++reads === 1) throw Object.assign(new Error('读取超时'), { code: 'ECONNABORTED' });
        return idle;
    } });
    assert.match(document.querySelector('[role="alert"]').textContent, /读取超时/);
    assert.equal(button('清空 temp 缓存').disabled, true);
    assert.equal(button('刷新进度').disabled, false);
    await ui.advance(1200);
    assert.equal(document.querySelector('[role="alert"]'), null);
    assert.equal(button('清空 temp 缓存').disabled, false);
    assert.ok(ui.calls.every((call) => call.options.timeout === 15000));
    assert.equal(ui.calls.filter((call) => call.method === 'POST').length, 0);
});

test('an expired operation read falls back to current state and permission failures stay blocked', async (t) => {
    let requests = 0;
    const ui = await setup(t, { get: (_url) => {
        requests++;
        if (requests === 1) return snapshot();
        if (requests === 2) throw Object.assign(new Error('记录已过期'), { code: 404 });
        throw Object.assign(new Error('仅管理员可用'), { code: 403 });
    } });
    await ui.advance(600);
    await ui.advance(1200);
    assert.equal(ui.calls.at(-1).url, endpoint);
    assert.match(document.querySelector('[role="alert"]').textContent, /仅管理员可用/);
    assert.equal(ui.timers.size, 0);
    assert.equal(button('正在清理').disabled, true);
});
