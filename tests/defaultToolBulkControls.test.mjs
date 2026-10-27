import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, act } from './helpers/settingsRuntimeHarness.mjs';

const options = [{
    type: 'matrix', name: 'defaultToolPermissions.permissions', text: '默认工具状态',
    rows: [
        { id: 'task.read', label: '读取任务', value: 'ask' },
        { id: 'knowledge.write', label: '写入知识', value: 'deny' },
        { id: 'limited', label: '受限工具', value: 'ask', allowedValues: ['allow', 'ask'] },
        { id: 'fixed', label: '固定工具', value: 'ask', disabled: true },
    ],
    columns: [{ value: 'allow', label: '允许' }, { value: 'ask', label: '询问' }, { value: 'deny', label: '拒绝' }],
    bulkActions: [
        { label: '全部允许', value: 'allow', set: { 'defaultToolPermissions.fallbackMode': 'allow' }, confirm: { title: '确认全部允许？', description: '危险操作：可能无需询问即可调用所有可修改工具。', danger: true, confirmText: '确认全部允许' } },
        { label: '全部询问', value: 'ask', set: { 'defaultToolPermissions.fallbackMode': 'ask' } },
        { label: '全部拒绝', value: 'deny', set: { 'defaultToolPermissions.fallbackMode': 'deny' } },
    ],
}];
const initialValues = { defaultToolPermissions: { baseRevision: 7, fallbackMode: 'ask', permissions: { 'task.read': 'ask', 'knowledge.write': 'deny', limited: 'ask', fixed: 'ask' } } };
const latest = () => settingsUI.changed.at(-1)?.defaultToolPermissions;

test('backend-declared matrix bulk controls confirm allow, preserve locks and update the fallback', async () => {
    const ui = await mount(options, {}, null, {}, initialValues);
    try {
        settingsUI.autoConfirm = false;
        await click(button('全部允许'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /危险操作/);
        assert.equal(settingsUI.changed.length, 0);
        await click(button('取消'));
        assert.equal(settingsUI.changed.length, 0);
        await click(button('全部允许'));
        await click(button('确认全部允许'));
        assert.deepEqual(latest(), { baseRevision: 7, fallbackMode: 'allow', permissions: { 'task.read': 'allow', 'knowledge.write': 'allow', limited: 'allow', fixed: 'ask' } });
        await click(button('全部询问'));
        assert.deepEqual(latest(), { baseRevision: 7, fallbackMode: 'ask', permissions: { 'task.read': 'ask', 'knowledge.write': 'ask', limited: 'ask', fixed: 'ask' } });
        await click(button('全部拒绝'));
        assert.deepEqual(latest(), { baseRevision: 7, fallbackMode: 'deny', permissions: { 'task.read': 'deny', 'knowledge.write': 'deny', limited: 'ask', fixed: 'ask' } });
    } finally { await ui.close(); }
});

test('search only filters matrix presentation and rapid bulk clicks cannot replace the warning', async () => {
    const ui = await mount(options, {}, null, {}, initialValues);
    try {
        await edit(document.querySelector('[aria-label="搜索选项"]'), '读取');
        settingsUI.autoConfirm = false;
        await act(async () => { button('全部允许').click(); button('全部允许').click(); });
        assert.equal(settingsUI.confirmations.length, 1);
        await click(button('确认全部允许'));
        assert.equal(latest().permissions['knowledge.write'], 'allow');
        assert.equal(latest().permissions.fixed, 'ask');
    } finally { await ui.close(); }
});
