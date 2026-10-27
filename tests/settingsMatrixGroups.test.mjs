import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit } from './helpers/settingsRuntimeHarness.mjs';

const columns = [{ value: 'allow', label: '允许' }, { value: 'ask', label: '询问' }, { value: 'deny', label: '拒绝' }];
const matrix = {
    type: 'matrix', name: 'permissions', text: '工具权限',
    groups: [{ id: 'knowledge', label: '知识库' }, { id: 'documents', label: '文档' }],
    rows: [
        { id: 'knowledge.read', group: 'knowledge', label: '查询节点', description: '读取知识库中的节点', value: 'ask' },
        { id: 'knowledge.fixed', group: 'knowledge', label: '固定策略', value: 'deny', disabled: true },
        { id: 'documents.create', group: 'documents', label: '创建文档', value: 'ask', allowedValues: ['allow', 'ask'] },
    ], columns,
    bulkActions: [{ label: '全部拒绝', value: 'deny' }],
};
const groupButton = id => document.querySelector(`[data-matrix-group="${id}"] button[aria-expanded]`);

test('matrix groups use backend names and search temporarily opens matches without changing expansion', async () => {
    const ui = await mount([matrix]);
    try {
        assert.match(groupButton('knowledge').textContent, /知识库/);
        assert.equal(groupButton('knowledge').getAttribute('aria-expanded'), 'true');
        assert.equal(groupButton('documents').getAttribute('aria-expanded'), 'false');
        assert.equal(document.querySelector('[aria-label="创建文档 允许"]'), null);
        await click(groupButton('knowledge'));
        await edit(document.querySelector('[aria-label="搜索选项"]'), '文档');
        assert.equal(groupButton('knowledge'), null);
        assert.equal(groupButton('documents').getAttribute('aria-expanded'), 'true');
        assert.ok(document.querySelector('[aria-label="创建文档 允许"]'));
        await edit(document.querySelector('[aria-label="搜索选项"]'), '');
        assert.equal(groupButton('knowledge').getAttribute('aria-expanded'), 'false');
        assert.equal(groupButton('documents').getAttribute('aria-expanded'), 'false');
        assert.equal(settingsUI.changed.length, 0);
    } finally { await ui.close(); }
});

test('matrix radio choices preserve permission identities, locks and hidden rows during global changes', async () => {
    const ui = await mount([matrix], {}, null, {}, { permissions: { 'knowledge.read': 'ask', 'knowledge.fixed': 'deny', 'documents.create': 'ask' } });
    try {
        assert.equal(document.querySelectorAll('[role="radiogroup"]').length, 2);
        await click(document.querySelector('[aria-label="查询节点 允许"]'));
        assert.equal(settingsUI.changed.at(-1).permissions['knowledge.read'], 'allow');
        assert.equal(document.querySelector('[aria-label="查询节点 允许"]').checked, true);
        assert.equal(document.querySelector('[aria-label="查询节点 询问"]').checked, false);
        assert.equal(document.querySelector('[aria-label="固定策略 允许"]').disabled, true);
        await edit(document.querySelector('[aria-label="搜索选项"]'), '创建');
        assert.equal(document.querySelector('[aria-label="创建文档 拒绝"]').disabled, true);
        await click(button('全部拒绝'));
        assert.deepEqual(settingsUI.changed.at(-1).permissions, { 'knowledge.read': 'deny', 'knowledge.fixed': 'deny', 'documents.create': 'ask' });
        assert.equal(Object.hasOwn(settingsUI.changed.at(-1).permissions, 'knowledge'), false);
    } finally { await ui.close(); }
});

test('ungrouped matrices retain row order and original non-string values', async () => {
    const ui = await mount([{ type: 'matrix', name: 'choices', rows: [{ id: 'first', group: 'a', label: '第一项', value: 1 }, { id: 'second', group: 'b', label: '第二项', value: 1 }, { id: 'third', group: 'a', label: '第三项', value: 1 }], columns: [{ value: 1, label: '一' }, { value: 2, label: '二' }] }]);
    try {
        assert.deepEqual([...document.querySelectorAll('[role="radiogroup"]')].map(node => node.getAttribute('aria-label')), ['第一项', '第二项', '第三项']);
        await click(document.querySelector('[aria-label="第二项 二"]'));
        assert.equal(settingsUI.changed.at(-1).choices.second, 2);
    } finally { await ui.close(); }
});

test('group batches confirm changes, include search-hidden rows and preserve other groups and fallback defaults', async () => {
    const allow = { label: '全部允许', value: 'allow', confirm: { title: '允许知识库工具？', description: '危险操作：本组工具将无需逐次询问。', danger: true, confirmText: '确认允许本组' }, set: { 'defaultToolPermissions.fallbackMode': 'allow' } };
    const grouped = {
        ...matrix,
        name: 'defaultToolPermissions.permissions',
        groups: [{ id: 'knowledge', label: '知识库', bulkActions: [allow, { label: '全部询问', value: 'ask' }, { label: '全部拒绝', value: 'deny' }] }, ...matrix.groups.slice(1)],
        rows: [...matrix.rows, { id: 'knowledge.hidden', group: 'knowledge', label: '写入关联', value: 'deny' }, { id: 'knowledge.limited', group: 'knowledge', label: '有限策略', value: 'ask', allowedValues: ['ask', 'deny'] }],
    };
    const initial = { defaultToolPermissions: { fallbackMode: 'ask', permissions: { 'knowledge.read': 'ask', 'knowledge.fixed': 'deny', 'documents.create': 'ask', 'knowledge.hidden': 'deny', 'knowledge.limited': 'ask' } } };
    const ui = await mount([grouped], {}, null, {}, initial);
    try {
        await edit(document.querySelector('[aria-label="搜索选项"]'), '查询节点');
        const group = document.querySelector('[data-matrix-group="knowledge"]');
        assert.match(groupButton('knowledge').textContent, /1 \/ 4/);
        assert.equal(document.querySelector('[aria-label="写入关联 允许"]'), null);
        assert.equal(group.querySelector('button button'), null);
        const action = name => document.querySelector(`[aria-label="知识库 ${name}"]`);
        assert.match(action('全部允许').title, /全部 4 项/);
        settingsUI.autoConfirm = false;
        await click(action('全部允许'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /危险操作/);
        await click(button('取消'));
        assert.equal(settingsUI.changed.length, 0);
        await click(action('全部允许'));
        await click(button('确认允许本组'));
        assert.deepEqual(settingsUI.changed.at(-1).defaultToolPermissions, {
            fallbackMode: 'ask', permissions: { 'knowledge.read': 'allow', 'knowledge.fixed': 'deny', 'documents.create': 'ask', 'knowledge.hidden': 'allow', 'knowledge.limited': 'ask' },
        });
        await click(action('全部拒绝'));
        assert.equal(settingsUI.changed.at(-1).defaultToolPermissions.permissions['knowledge.limited'], 'deny');
        assert.equal(settingsUI.changed.at(-1).defaultToolPermissions.fallbackMode, 'ask');
        assert.equal(settingsUI.changed.at(-1).defaultToolPermissions.permissions['documents.create'], 'ask');
    } finally { await ui.close(); }
});

test('read-only grouped matrices keep group batch controls disabled', async () => {
    const ui = await mount([{ type: 'group', readOnly: true, children: [{ ...matrix, groups: [{ id: 'knowledge', label: '知识库', bulkActions: [{ label: '全部允许', value: 'allow' }] }] }] }]);
    try {
        const action = document.querySelector('[aria-label="知识库 全部允许"]');
        assert.equal(action.disabled, true);
        await click(action);
        assert.equal(settingsUI.changed.length, 0);
        assert.equal(settingsUI.confirmations.length, 0);
    } finally { await ui.close(); }
});
