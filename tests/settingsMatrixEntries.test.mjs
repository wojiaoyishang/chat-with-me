import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, ref } from './helpers/settingsRuntimeHarness.mjs';
import { matrixRows, matrixStoredValue, matrixValueMap } from '../src/features/settings-runtime/matrixValues.js';

const matrix = {
    type: 'matrix', name: 'rules', text: '工具分配', default: [],
    valueStorage: { type: 'entries', keyField: 'pattern', valueField: 'effect', unsetValue: 'inherit' },
    unlistedRows: { group: 'other', description: '已保存的其他规则' },
    columns: [{ value: 'inherit', label: '继承' }, { value: 'allow', label: '分配' }, { value: 'deny', label: '拒绝' }],
    groups: [{ id: 'global', label: '全局默认' }, { id: 'knowledge', label: '知识库', bulkActions: [{ label: '全部继承', value: 'inherit' }, { label: '全部分配', value: 'allow', confirm: { title: '分配本组？', danger: true } }] }, { id: 'other', label: '其他规则' }],
    rows: [{ id: '*', group: 'global', label: '所有工具默认' }, { id: 'knowledge.*', group: 'knowledge', label: '知识库默认' }, { id: 'knowledge.read', group: 'knowledge', label: '读取资料' }, { id: 'knowledge.write', group: 'knowledge', label: '写入资料' }],
};
const initial = [{ pattern: '*', effect: 'deny' }, { pattern: 'knowledge.*', effect: 'allow' }, { pattern: 'knowledge.write', effect: 'deny' }, { pattern: 'removed.old', effect: 'allow', note: '保留元数据' }];

test('entry matrices roundtrip literal identities and metadata, and inheritance removes only its entry', () => {
    const before = structuredClone(initial);
    const values = matrixValueMap(matrix, initial);
    assert.deepEqual(matrixStoredValue(matrix, { ...values, 'knowledge.write': 'inherit', 'knowledge.read': 'allow' }, initial), [initial[0], initial[1], initial[3], { pattern: 'knowledge.read', effect: 'allow' }]);
    assert.deepEqual(initial, before);
    assert.deepEqual(matrixValueMap({}, { a: false }), { a: false });
    assert.throws(() => matrixValueMap(matrix, {}), /数组/);
    assert.throws(() => matrixValueMap({ valueStorage: { type: 'unknown' } }, []), /存储格式/);
    assert.throws(() => matrixValueMap(matrix, [{ effect: 'allow' }]), /有效标识/);
    assert.equal(matrixValueMap(matrix, [{ pattern: '__proto__', effect: 'deny' }]).__proto__, 'deny');
    assert.deepEqual(matrixRows(matrix, matrix.rows, values).at(-1), { id: 'removed.old', label: 'removed.old', group: 'other', description: '已保存的其他规则' });
});

test('group batches edit all group rules during search and keep other stored identities intact', async () => {
    const ui = await mount([matrix, { type: 'actions', actions: [{ label: '保存分配', method: 'PUT', endpoint: '/assignments', body: { rules: ref('form.rules') } }] }], null, () => ({}), {}, { rules: initial });
    try {
        await edit(document.querySelector('[aria-label="搜索选项"]'), '读取资料');
        assert.equal(document.querySelector('[aria-label="读取资料 继承"]').checked, true);
        await click(document.querySelector('[aria-label="知识库 全部继承"]'));
        assert.deepEqual(settingsUI.changed.at(-1).rules, [initial[0], initial[3]]);
        await click(document.querySelector('[aria-label="读取资料 分配"]'));
        assert.deepEqual(settingsUI.changed.at(-1).rules.at(-1), { pattern: 'knowledge.read', effect: 'allow' });
        await click(button('保存分配'));
        const saved = settingsUI.calls.find(([method]) => method === 'put')[2].rules;
        assert.ok(Array.isArray(saved));
        assert.equal(saved.some(rule => rule.effect === 'inherit'), false);
        assert.deepEqual(saved[1], initial[3]);
        await edit(document.querySelector('[aria-label="搜索选项"]'), 'removed.old');
        await click(document.querySelector('[aria-label="removed.old 继承"]'));
        assert.equal(settingsUI.changed.at(-1).rules.some(rule => rule.pattern === 'removed.old'), false);
    } finally { await ui.close(); }
});

test('assigning a group still requires confirmation and preserves literal rule patterns', async () => {
    const ui = await mount([matrix], null, null, {}, { rules: initial });
    try {
        await edit(document.querySelector('[aria-label="搜索选项"]'), '知识库');
        settingsUI.autoConfirm = false;
        await click(document.querySelector('[aria-label="知识库 全部分配"]'));
        assert.equal(settingsUI.confirmations[0].danger, true);
        await click(button('取消'));
        assert.equal(settingsUI.changed.length, 0);
        await click(document.querySelector('[aria-label="知识库 全部分配"]'));
        await click(button('确认'));
        const rules = settingsUI.changed.at(-1).rules;
        for (const pattern of ['knowledge.*', 'knowledge.read', 'knowledge.write']) assert.ok(rules.some(rule => rule.pattern === pattern && rule.effect === 'allow'));
        assert.deepEqual(rules.find(rule => rule.pattern === '*'), initial[0]);
        assert.deepEqual(rules.find(rule => rule.pattern === 'removed.old'), initial[3]);
    } finally { await ui.close(); }
});
