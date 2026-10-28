import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, ref, act, DynamicSettings, React } from './helpers/settingsRuntimeHarness.mjs';

// Domain metadata comes from the backend. The UI under test is the same
// persisted-operation component used by any asynchronously submitted action.
const endpoint = '/setting/debug/temp-cleanup';
const watch = { endpoint: `${endpoint}/{response.operationId}`, taskIdPath: 'operationId', statusPath: 'status', messagePath: 'message', progressPath: 'percent', taskPage: '/tasks?taskId={response.taskId}', terminal: ['completed', 'completed_with_errors', 'failed', 'cancelled'], success: ['completed', 'completed_with_errors'], timeoutMs: 15000, intervalMs: 800, recovery: { endpoint, statusCodes: [404] } };
const descriptor = { type: 'async-operation', id: 'cleanup', text: 'temp 缓存清理', source: { endpoint, identityPath: 'operationId' }, watch: { ...watch, when: { left: ref('response.status'), op: 'in', right: ['queued', 'running'] } }, statusLabels: { idle: '尚未执行', queued: '等待清理', running: '正在清理', completed: '清理完成', completed_with_errors: '清理完成，部分文件未删除', failed: '清理失败' }, phasePath: 'phase', phaseLabels: { scanning: '扫描临时文件', deleting: '删除临时文件', finished: '清理结束' }, summary: [{ label: '已处理', path: 'processed' }, { label: '总数', path: 'total' }, { label: '已删除', path: 'deleted' }, { label: '删除失败', path: 'failed' }, { label: '剩余文件', path: 'remaining' }], errorsPath: 'errors', errorColumns: [{ key: 'path', label: '路径' }, { key: 'error', label: '原因' }], actions: [{ id: 'clear', label: '清空 temp 缓存', method: 'POST', endpoint, body: { confirmed: true }, timeoutMs: 15000, confirm: { title: '清空全部 temp 缓存？', description: '危险操作：删除所有文件和子目录，检查点将不可用。删除后无法恢复。', danger: true, confirmText: '确认永久删除' }, watch }] };
const idle = { operationId: null, status: 'idle', processed: 0, total: 0, deleted: 0, failed: 0, remaining: 0, errors: [] };
const snapshot = (changes = {}) => ({ ...idle, operationId: 'cleanup-one', taskId: 'cleanup-one', status: 'running', phase: 'scanning', message: '正在扫描临时文件', ...changes });
const complete = changes => snapshot({ status: 'completed', phase: 'finished', processed: 3, total: 3, deleted: 3, percent: 100, ...changes });
const tick = async (t, time = 800) => act(async () => t.mock.timers.tick(time));
const postCount = () => settingsUI.calls.filter(([method]) => method === 'post').length;

test('StrictMode can restore the idle cleanup state without leaving a loading toast', async () => {
    const ui = await mount([], null, () => idle);
    try {
        await ui.render(React.createElement(React.StrictMode, null,
            React.createElement(DynamicSettings, { config: [descriptor] })));
        assert.match(document.body.textContent, /尚未执行/);
        assert.equal(button('清空 temp 缓存').disabled, false);
        assert.doesNotMatch(document.querySelector('[data-settings-test-toaster]').textContent, /正在执行/);
        assert.equal(postCount(), 0);
    } finally { await ui.close(); }
});

test('StrictMode keeps an in-flight read alive without issuing a duplicate request', async () => {
    let release, signal;
    const ui = await mount([], null, (_method, _url, options) => {
        signal = options.signal;
        return new Promise(resolve => { release = resolve; });
    });
    try {
        await ui.render(React.createElement(React.StrictMode, null,
            React.createElement(DynamicSettings, { config: [descriptor] })));
        assert.equal(settingsUI.calls.length, 1);
        assert.equal(signal.aborted, false);
        assert.equal(button('清空 temp 缓存').disabled, true);
        await act(async () => release(idle));
        assert.match(document.body.textContent, /尚未执行/);
        assert.equal(button('清空 temp 缓存').disabled, false);
        assert.equal(postCount(), 0);
    } finally { await ui.close(); }
});

test('StrictMode resumes an active cleanup and reaches its terminal state', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let latest = snapshot({ phase: 'deleting', percent: 25 });
    const ui = await mount([], null, () => latest);
    try {
        await ui.render(React.createElement(React.StrictMode, null,
            React.createElement(DynamicSettings, { config: [descriptor] })));
        assert.match(document.body.textContent, /正在清理/);
        assert.equal(button('清空 temp 缓存').disabled, true);
        latest = complete();
        await tick(t);
        assert.match(document.body.textContent, /清理完成/);
        assert.equal(button('清空 temp 缓存').disabled, false);
        assert.equal(postCount(), 0);
    } finally { await ui.close(); t.mock.timers.reset(); }
});

test('cleanup metadata requires danger confirmation and cancel never submits deletion', async () => {
    const ui = await mount([descriptor], null, () => idle);
    try {
        assert.equal(settingsUI.calls[0][2].timeout, 15000);
        settingsUI.autoConfirm = false;
        await click(button('清空 temp 缓存'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /危险操作.*所有文件和子目录.*检查点.*无法恢复/);
        assert.equal(postCount(), 0); await click(button('取消')); assert.equal(postCount(), 0);
        await click(button('清空 temp 缓存')); await click(button('确认永久删除'));
        assert.equal(postCount(), 1); assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post')[2], { confirmed: true });
        assert.equal(settingsUI.calls.find(([method]) => method === 'post')[3].timeout, 15000);
    } finally { await ui.close(); }
});

test('reopening restores a running operation and renders deletion progress and partial errors', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let latest = snapshot({ phase: 'deleting', processed: 25, total: 100, deleted: 24, failed: 1, percent: 25, message: '正在清理：nested/cache.bin' });
    const ui = await mount([descriptor], null, () => latest);
    try {
        assert.equal(postCount(), 0); assert.ok(settingsUI.calls.some(([, url]) => url === `${endpoint}/cleanup-one`));
        assert.match(document.querySelector('[data-settings-test-toaster] [role="status"]').textContent, /正在清理：nested\/cache\.bin（25%）/);
        await click(button('查看任务'));
        assert.equal(settingsUI.navigated.at(-1), '/tasks?taskId=cleanup-one');
        assert.equal(document.querySelector('progress'), null, 'progress is floating and adds no row to the settings layout');
        const processed = [...document.querySelectorAll('dl div')].find(node => node.textContent.startsWith('已处理'));
        assert.equal(processed.querySelector('dd').textContent, '25');
        assert.equal(button('清空 temp 缓存').disabled, true);
        latest = complete({ status: 'completed_with_errors', deleted: 99, failed: 1, total: 100, processed: 100, errors: [{ path: 'locked.tmp', error: '文件仍被占用' }] });
        await tick(t);
        assert.match(document.body.textContent, /清理完成，部分文件未删除/); assert.match(document.body.textContent, /locked.tmp/); assert.match(document.body.textContent, /文件仍被占用/);
        assert.equal(button('清空 temp 缓存').disabled, false);
        const count = settingsUI.calls.length; await tick(t, 10000); assert.equal(settingsUI.calls.length, count);
    } finally { await ui.close(); t.mock.timers.reset(); }
});

test('scanning is indeterminate and task navigation survives completed status restoration', async () => {
    const ui = await mount([descriptor], null, () => snapshot({ currentPath: 'nested', message: '正在扫描：nested', percent: null }));
    try {
        const toast = document.querySelector('[data-settings-test-toaster] [role="status"]');
        assert.match(toast.textContent, /正在扫描：nested/);
        assert.doesNotMatch(toast.textContent, /\d+%/);
        await click(button('查看任务'));
        assert.equal(settingsUI.navigated.at(-1), '/tasks?taskId=cleanup-one');
    } finally { await ui.close(); }
    const completed = await mount([descriptor], null, () => complete());
    try {
        await click(button('查看任务'));
        assert.equal(settingsUI.navigated.at(-1), '/tasks?taskId=cleanup-one');
    } finally { await completed.close(); }
});

test('disconnected progress reads back off and resume without submitting another operation', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] }); let reads = 0;
    const ui = await mount([descriptor], null, () => { reads += 1; if (reads === 2) throw new Error('网络断开'); return reads > 2 ? complete() : snapshot(); });
    try {
        assert.match(document.body.textContent, /进度读取中断/); assert.equal(button('清空 temp 缓存').disabled, true);
        await tick(t, 800); assert.equal(reads, 2);
        await tick(t, 200); assert.match(document.body.textContent, /清理完成/); assert.equal(postCount(), 0);
    } finally { await ui.close(); t.mock.timers.reset(); }
});

test('remaining content is shown independently from scanned deletion success', async () => {
    const ui = await mount([descriptor], null, () => complete({ status: 'completed_with_errors', processed: 7, total: 7, deleted: 7, failed: 0, remaining: 2, errors: [{ path: 'temp', error: '清理期间新建内容，停止任务后重试' }] }));
    try {
        const summary = [...document.querySelectorAll('dl div')].find(node => node.textContent.startsWith('剩余文件'));
        assert.equal(summary.querySelector('dd').textContent, '2'); assert.match(document.body.textContent, /清理期间新建内容/);
    } finally { await ui.close(); }
});

test('progress requests do not overlap and closing only aborts the status read', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] }); let release, signal, reads = 0;
    const ui = await mount([descriptor], null, (_method, _url, options) => { reads += 1; if (reads === 1) return snapshot(); signal = options.signal; return new Promise(resolve => { release = resolve; }); });
    await tick(t, 10000); assert.equal(reads, 2); assert.equal(postCount(), 0);
    await ui.close(); assert.equal(signal.aborted, true); release(complete()); t.mock.timers.reset();
});

test('an uncertain mutation response is reconciled by reads and never resubmitted', async () => {
    let current = idle;
    const ui = await mount([descriptor], null, method => { if (method === 'get') return current; current = snapshot(); throw new Error('响应丢失'); });
    try {
        await click(button('清空 temp 缓存'));
        assert.equal(postCount(), 1); assert.equal(button('清空 temp 缓存').disabled, true);
        assert.match(document.body.textContent, /正在清理/); await click(button('清空 temp 缓存')); assert.equal(postCount(), 1);
    } finally { await ui.close(); }
});

test('rejected mutations keep their error even when an older completed record is displayed', async () => {
    const ui = await mount([descriptor], null, method => { if (method === 'get') return complete({ operationId: 'old-operation' }); throw Object.assign(new Error('临时目录不安全'), { code: 400 }); });
    try {
        await click(button('清空 temp 缓存')); assert.match(document.body.textContent, /临时目录不安全/);
        await click(button('重新读取状态')); assert.match(document.body.textContent, /临时目录不安全/);
        assert.equal(postCount(), 1); assert.doesNotMatch(document.body.textContent, /暂时无法确认/);
    } finally { await ui.close(); }
});

test('an old operation identity cannot falsely confirm the outcome of a timed out submission', async () => {
    let current = complete({ operationId: 'old-operation' });
    const ui = await mount([descriptor], null, method => { if (method === 'get') return current; throw Object.assign(new Error('提交超时'), { code: 'ECONNABORTED' }); });
    try {
        await click(button('清空 temp 缓存')); assert.match(document.body.textContent, /暂时无法确认/); assert.equal(button('清空 temp 缓存').disabled, true);
        await click(button('重新读取状态')); assert.equal(button('清空 temp 缓存').disabled, true); assert.equal(postCount(), 1);
        current = complete({ operationId: 'new-operation' }); await click(button('重新读取状态')); assert.equal(button('清空 temp 缓存').disabled, false);
    } finally { await ui.close(); }
});

test('an initial read timeout blocks mutation until an explicit successful read', async () => {
    let offline = true;
    const ui = await mount([descriptor], null, () => { if (offline) throw new Error('读取超时'); return idle; });
    try {
        assert.equal(button('清空 temp 缓存').disabled, true); assert.match(document.body.textContent, /读取超时/);
        await click(button('清空 temp 缓存')); assert.equal(postCount(), 0);
        offline = false; await click(button('重新读取状态')); assert.equal(button('清空 temp 缓存').disabled, false);
    } finally { await ui.close(); }
});

test('an expired operation falls back to the declared source while forbidden reads stay blocked', async () => {
    let forbidden = false;
    const ui = await mount([descriptor], null, (_method, url) => { if (url.endsWith('/cleanup-one')) throw Object.assign(new Error('操作过期'), { code: 404 }); if (forbidden) throw Object.assign(new Error('没有权限'), { code: 403 }); return settingsUI.calls.length === 1 ? snapshot() : idle; });
    try {
        assert.equal(postCount(), 0); assert.equal(button('清空 temp 缓存').disabled, false);
        assert.ok(settingsUI.calls.filter(([, url]) => url === endpoint).length >= 2);
        forbidden = true; await click(button('重新读取状态')); assert.match(document.body.textContent, /没有权限/); assert.equal(button('清空 temp 缓存').disabled, true);
    } finally { await ui.close(); }
});
