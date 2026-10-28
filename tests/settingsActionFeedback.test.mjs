import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, act, ref, registerSettingsComponent } from './helpers/settingsRuntimeHarness.mjs';

const config = [{ type: 'actions', actions: [{
    id: 'verify', label: '验证连接', icon: 'plug', method: 'POST', endpoint: '/verify',
    effects: [{ type: 'toast', message: '连接验证成功' }],
}] }];

test('a simple request has one busy indicator and reports its declared success once', async () => {
    let release;
    const response = new Promise((resolve) => { release = resolve; });
    const ui = await mount(config, null, () => response);
    try {
        await click(button('验证连接'));
        assert.equal(button('验证连接').getAttribute('aria-busy'), 'true');
        assert.equal(button('验证连接').disabled, true);
        assert.equal(document.querySelectorAll('[data-slot="action-progress"]').length, 0);
        const loading = document.querySelector('[data-settings-test-toaster] [role="status"]');
        assert.match(loading.textContent, /正在执行/);
        assert.equal(button('验证连接').parentElement.querySelector('[data-settings-test-toast]'), null);
        assert.equal(settingsUI.successes?.length || 0, 0);
        await act(async () => release({ verified: true }));
        assert.equal(button('验证连接').disabled, false);
        assert.equal(button('验证连接').getAttribute('aria-busy'), null);
        assert.deepEqual(settingsUI.successes, [['连接验证成功']]);
    } finally { release({ verified: true }); await ui.close(); }
});

test('request failure remains visible and never emits a success notification', async () => {
    const ui = await mount(config, null, async () => { throw new Error('连接验证失败'); });
    try {
        await click(button('验证连接'));
        assert.match(document.querySelector('[role="alert"]').textContent, /连接验证失败/);
        assert.equal(settingsUI.successes?.length || 0, 0);
        assert.equal(button('验证连接').disabled, false);
    } finally { await ui.close(); }
});

test('an explicit toast takes precedence over a fallback success label', async () => {
    const action = { ...config[0].actions[0], successText: '备用成功提示' };
    const ui = await mount([{ type: 'actions', actions: [action] }], null, () => ({ verified: true }));
    try {
        await click(button('验证连接'));
        assert.deepEqual(settingsUI.successes, [['连接验证成功']]);
    } finally { await ui.close(); }
});

test('transient response data remains available to effects without persisting in watched operation state', async () => {
    const snapshots = [];
    registerSettingsComponent('transient-operation-probe', ({ context }) => { snapshots.push(JSON.stringify(context.operations)); return null; });
    const action = { id: 'watch-secret', label: '启动临时操作', endpoint: '/start', method: 'POST', retainResponse: false,
        watch: { endpoint: '/jobs/{response.taskId}', terminal: ['completed'], success: ['completed'] },
        effects: [{ type: 'open-dialog', value: { title: '临时结果', options: [{ type: 'readonly-text', name: 'value', text: '结果' }], defaultOptions: { value: ref('response.token') } } }] };
    const ui = await mount([{ type: 'actions', actions: [action] }, { type: 'transient-operation-probe' }], null,
        (method) => method === 'post' ? { taskId: 'job', token: 'private-token' } : { status: 'completed', extra: 'private-progress' });
    try {
        await click(button('启动临时操作'));
        assert.equal(document.querySelector('[aria-label="结果"]').textContent, 'private-token');
        assert.deepEqual(settingsUI.calls.map(([method, endpoint]) => [method, endpoint]), [['post', '/start'], ['get', '/jobs/job']]);
        assert.ok(snapshots.every(value => !value.includes('private-token') && !value.includes('private-progress')));
        await click(button('关闭'));
    } finally { await ui.close(); }
});
