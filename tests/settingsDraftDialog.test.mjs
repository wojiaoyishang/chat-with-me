import test from 'node:test';
import assert from 'node:assert/strict';

process.env.CWM_TEST_REAL_SETTINGS_DIALOGS = '1';
const { mount, button, click, edit, ref, act } = await import('./helpers/settingsRuntimeHarness.mjs');
const inside = (dialog, label) => [...dialog.querySelectorAll('button')].find((node) => node.textContent.trim() === label);
const dialogs = () => [...document.querySelectorAll('[data-slot="dialog-content"]')];
const settings = { id: 'sending', label: '对话发送设置', endpoint: '/metadata', method: 'POST', validate: false,
    body: { role: ref('form.role'), sendSettings: ref('form.sendSettings') },
    effects: [{ type: 'open-dialog', value: ref('response'), target: 'form', guardFields: ['conversationId'] }] };
const outer = { title: '外层规则', defaultOptions: { content: '原始正文', conversationId: 'chat-a', role: 'user', sendSettings: {} }, options: [
    { type: 'text', name: 'content', text: '外层正文' }, { type: 'text', name: 'conversationId', text: '目标会话' },
    { type: 'action', ...settings }], footerActions: [{ id: 'save', label: '保存外层', endpoint: '/rules', method: 'PUT',
        body: { content: ref('form.content'), conversationId: ref('form.conversationId'), role: ref('form.role'), sendSettings: ref('form.sendSettings') } }] };
function inner(defaults = { role: 'user', sendSettings: {} }) {
    return { title: '内部发送设置', defaultOptions: defaults, options: [
        { type: 'text', name: 'role', text: '内部身份' },
        { type: 'text', name: ['sendSettings', 'modelId'], text: '内部模型' },
        { type: 'action', id: 'reload', label: '载入模型选项', endpoint: '/reload', method: 'POST',
            body: { role: ref('form.role'), sendSettings: ref('form.sendSettings') },
            effects: [{ type: 'open-dialog', value: ref('response'), replace: true }] }],
        footerActions: [{ id: 'apply', label: '应用设置', endpoint: '/validate', method: 'POST',
            body: { role: ref('form.role'), sendSettings: ref('form.sendSettings') },
            effects: [{ type: 'apply-dialog', value: ref('response') }] }] };
}
const config = [{ type: 'action', id: 'open', label: '编辑规则', endpoint: '/outer', method: 'GET', effects: [{ type: 'open-dialog', value: ref('response') }] }];

test('real nested draft dialog cancels locally, reloads in place and applies only to its guarded opener', async () => {
    let saved;
    const ui = await mount(config, {}, async (_method, endpoint, body) => {
        if (endpoint === '/outer') return outer;
        if (endpoint === '/metadata') return inner(body);
        if (endpoint === '/reload') return inner(body);
        if (endpoint === '/validate') return body;
        if (endpoint === '/rules') saved = body;
        return {};
    });
    try {
        await click(button('编辑规则'));
        const parent = dialogs()[0];
        await edit(parent.querySelector('[aria-label="外层正文"]'), '尚未保存的正文');
        await click(inside(parent, '对话发送设置'));
        assert.equal(dialogs().length, 2, 'the real dialog stack retains its parent');
        await edit(dialogs().at(-1).querySelector('[aria-label="内部身份"]'), 'system');
        await click(inside(dialogs().at(-1), '关闭'));
        assert.equal(dialogs().length, 1);
        await click(inside(parent, '保存外层'));
        assert.equal(saved.role, 'user', 'cancel never changes the parent draft');
        assert.deepEqual(saved.sendSettings, {});

        await click(inside(parent, '对话发送设置'));
        await edit(dialogs().at(-1).querySelector('[aria-label="内部身份"]'), 'assistant');
        await edit(dialogs().at(-1).querySelector('[aria-label="内部模型"]'), 'model-a');
        await click(inside(dialogs().at(-1), '载入模型选项'));
        assert.equal(dialogs().length, 2, 'model metadata replacement does not add a third dialog');
        assert.equal(dialogs().at(-1).querySelector('[aria-label="内部模型"]').value, 'model-a');
        const writes = settingsUI.calls.filter(([, endpoint]) => endpoint === '/rules').length;
        await click(inside(dialogs().at(-1), '应用设置'));
        assert.equal(dialogs().length, 1);
        assert.equal(dialogs()[0], parent);
        assert.equal(parent.querySelector('[aria-label="外层正文"]').value, '尚未保存的正文');
        assert.equal(settingsUI.calls.filter(([, endpoint]) => endpoint === '/rules').length, writes, 'apply validates but never saves the outer rule');
        await click(inside(parent, '保存外层'));
        assert.deepEqual(saved, { content: '尚未保存的正文', conversationId: 'chat-a', role: 'assistant', sendSettings: { modelId: 'model-a' } });
    } finally { await ui.close(); }
});

test('late metadata cannot open after source closure or a guarded target change', async () => {
    let finish;
    const ui = await mount(config, {}, async (_method, endpoint) => endpoint === '/outer' ? outer
        : endpoint === '/metadata' ? new Promise((resolve) => { finish = resolve; }) : {});
    try {
        await click(button('编辑规则'));
        await click(inside(dialogs()[0], '对话发送设置'));
        await edit(dialogs()[0].querySelector('[aria-label="目标会话"]'), 'chat-b');
        await act(async () => finish(inner()));
        assert.equal(dialogs().length, 1, 'a response for chat-a cannot appear for chat-b');
        await click(inside(dialogs()[0], '对话发送设置'));
        await click(inside(dialogs()[0], '关闭'));
        await click(button('编辑规则'));
        const reopened = dialogs()[0];
        await act(async () => finish(inner()));
        assert.equal(dialogs().length, 1);
        assert.equal(dialogs()[0], reopened, 'a closed source generation cannot attach to a reopened form');
    } finally { await ui.close(); }
});

test('unsupported and prototype result targets are rejected before a request or mutation', async () => {
    for (const target of ['clientStorage', 'form.__proto__.polluted', 'form.constructor.x', 'form..role']) {
        const ui = await mount([{ type: 'action', id: 'bad', label: '非法应用', endpoint: '/metadata', method: 'POST',
            effects: [{ type: 'open-dialog', target, value: inner() }] }], {}, async () => ({}));
        try {
            await click(button('非法应用'));
            assert.equal(settingsUI.calls.length, 0);
            assert.equal(dialogs().length, 0);
            assert.equal(settingsUI.changed.length, 0);
        } finally { await ui.close(); }
    }
});

test('late validation cannot apply after the opener changes its guarded conversation', async () => {
    let finish;
    let saved;
    const ui = await mount(config, {}, async (_method, endpoint, body) => {
        if (endpoint === '/outer') return outer;
        if (endpoint === '/metadata') return inner(body);
        if (endpoint === '/validate') return new Promise((resolve) => { finish = () => resolve(body); });
        if (endpoint === '/rules') saved = body;
        return {};
    });
    try {
        await click(button('编辑规则'));
        const parent = dialogs()[0];
        await click(inside(parent, '对话发送设置'));
        await edit(dialogs().at(-1).querySelector('[aria-label="内部身份"]'), 'system');
        await click(inside(dialogs().at(-1), '应用设置'));
        await edit(parent.querySelector('[aria-label="目标会话"]'), 'chat-new');
        await act(async () => finish());
        assert.equal(dialogs().length, 2, 'invalid apply leaves its draft open instead of claiming success');
        await click(inside(dialogs().at(-1), '关闭'));
        await click(inside(parent, '保存外层'));
        assert.equal(saved.role, 'user');
        assert.equal(saved.conversationId, 'chat-new');
        assert.deepEqual(saved.sendSettings, {});
    } finally { await ui.close(); }
});
