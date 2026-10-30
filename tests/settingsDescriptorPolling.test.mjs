import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref, act } from './helpers/settingsRuntimeHarness.mjs';

const pause = milliseconds => act(async () => { await new Promise(resolve => setTimeout(resolve, milliseconds)); });
const config = [{ type: 'actions', actions: [{ id: 'open', label: '扫码', endpoint: '/editor', effects: [{ type: 'open-dialog', value: ref('response') }] }] }];
const descriptor = (state = '等待扫码', polling = true) => ({
    title: '连接状态', options: [{ type: 'readonly-text', name: 'state', text: '状态' }, { type: 'text', name: 'code', text: '验证码' }],
    defaultOptions: { state, code: '' },
    ...(polling ? { poll: { action: { endpoint: '/status', method: 'GET' }, intervalMs: 500, preserveFields: ['code'] } } : {}),
});

test('descriptor polling is serial, preserves focus and drafts in the same dialog, and stops at a terminal descriptor', async () => {
    let release;
    const ui = await mount(config, {}, async (_method, url) => url === '/editor' ? descriptor() : new Promise(resolve => { release = resolve; }));
    try {
        await click(button('扫码'));
        const input = document.querySelector('input');
        await edit(input, '未提交验证码'); input.focus();
        await pause(560);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 1);
        await pause(560);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 1, 'no overlapping long polls');
        await act(async () => release(descriptor('请输入验证码', false)));
        assert.equal(document.querySelectorAll('[role="dialog"]').length, 1);
        assert.equal(document.querySelector('input'), input, 'polling keeps the existing field instance');
        assert.equal(document.activeElement, input);
        assert.equal(input.value, '未提交验证码');
        assert.match(document.body.textContent, /请输入验证码/);
        await pause(560);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 1);
        assert.equal(settingsUI.calls.some(([method]) => method === 'post'), false);
    } finally { await ui.close(); }
});

test('closing aborts its active poll and a late status response cannot reopen or replace a dialog', async () => {
    let release, signal;
    const ui = await mount(config, {}, async (_method, url, _body, options) => {
        if (url === '/editor') return descriptor();
        signal = (options || _body).signal;
        return new Promise(resolve => { release = resolve; });
    });
    try {
        await click(button('扫码')); await pause(560);
        await click(button('关闭'));
        assert.equal(signal.aborted, true);
        await act(async () => release(descriptor('已经确认', false)));
        assert.equal(document.querySelector('[role="dialog"]'), null);
        await pause(560);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 1);
    } finally { await ui.close(); }
});

test('hidden documents pause status reads and resume once visible without submitting editable fields', async () => {
    let visibility = 'hidden';
    const ui = await mount(config, {}, async (_method, url) => url === '/editor' ? descriptor() : descriptor('已连接', false));
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility });
    try {
        await click(button('扫码')); await pause(560);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 0);
        visibility = 'visible'; await pause(1080);
        assert.equal(settingsUI.calls.filter(([, url]) => url === '/status').length, 1);
        assert.equal(settingsUI.calls.some(([method]) => method !== 'get'), false);
    } finally { await ui.close(); }
});

test('resource refreshes update existing records silently and pause for hidden tabs or after unmount', async () => {
    let received = 0;
    const ui = await mount([{ type: 'resource', id: 'deliveries', text: '回复记录', source: { endpoint: '/deliveries', listPath: 'items' },
        refreshIntervalMs: 500, titleField: 'title' }], {}, async () => ({ items: [{ id: 'one', title: ++received > 1 ? '已提交' : '发送中' }] }));
    try {
        assert.match(document.body.textContent, /发送中/);
        await pause(560);
        assert.match(document.body.textContent, /已提交/);
        assert.equal(document.querySelector('[aria-busy="true"]'), null);
        document.getElementById('root').hidden = true;
        const before = settingsUI.calls.length; await pause(560);
        assert.equal(settingsUI.calls.length, before);
        document.getElementById('root').hidden = false; await pause(560);
        assert.ok(settingsUI.calls.length > before);
        await ui.close();
        const closed = settingsUI.calls.length; await pause(560);
        assert.equal(settingsUI.calls.length, closed);
    } finally { if (document.getElementById('root')) await ui.close(); }
});
