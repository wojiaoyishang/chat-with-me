import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { mount, button, click, edit, ref, resource } from './helpers/settingsRuntimeHarness.mjs';
import { pageValues, validateFields } from '../src/features/settings-runtime/model.js';

test('card is a visual container with the same nested defaults and validation as a group', () => {
    const fields = [{ type: 'card', name: 'section', text: '连接资料', children: [{ type: 'text', name: 'title', text: '名称', required: true, default: '' }] }];
    assert.deepEqual(pageValues(fields), { section: { title: '' } });
    assert.deepEqual(validateFields(fields, { section: { title: '' } }), { 'section.title': '名称不能为空。' });
});

test('explicit cards and plain profile summaries render data and share ordinary actions', async () => {
    const ui = await mount([
        { type: 'profile-summary', avatar: ref('form.photo'), title: ref('form.name'), subtitle: ref('form.email'), meta: [{ label: '编号', value: ref('form.id') }], actions: [{ id: 'inspect', label: '查看', endpoint: '/inspect', method: 'GET' }] },
        { type: 'card', text: '界面显示', description: '仅影响当前设备', icon: 'palette', children: [{ type: 'switch', name: 'compact', text: '紧凑显示', default: false }] },
    ], {}, async () => ({}), {}, { photo: 'cwm://artifact/profile', name: '测试用户', email: 'user@example.test', id: 7 });
    try {
        assert.equal(document.querySelectorAll('[data-slot="card"]').length, 1);
        assert.match(document.body.textContent, /测试用户.*user@example.test.*编号.*7/s);
        assert.equal(document.querySelector('img').getAttribute('src'), 'cwm://artifact/profile');
        assert.match(document.body.textContent, /界面显示.*仅影响当前设备/s);
        await click(button('查看'));
        assert.ok(settingsUI.calls.some(([method, endpoint]) => method === 'get' && endpoint === '/inspect'));
    } finally { await ui.close(); }
});

test('resource cards retain column information and explicit tables remain available', async () => {
    const rows = { items: [{ id: 'source', title: '示例连接', active: true }] };
    const columns = [{ key: 'active', label: '状态', labels: { true: '当前连接', false: '未选择' } }];
    const first = await mount([resource({ columns })], rows);
    try {
        assert.equal(document.querySelectorAll('article').length, 1);
        assert.equal(document.querySelectorAll('[data-slot="card"]').length, 0);
        assert.equal(document.querySelector('table'), null);
        assert.match(document.querySelector('article').textContent, /示例连接.*状态.*当前连接/s);
    } finally { await first.close(); }
    const second = await mount([resource({ columns, display: 'table' })], rows);
    try {
        assert.ok(document.querySelector('table'));
        assert.match(document.querySelector('tbody').textContent, /当前连接/);
    } finally { await second.close(); }
});

test('plain groups retain readable single-row preferences without an outer card', async () => {
    const ui = await mount([{ type: 'group', text: '消息提醒', children: [{ type: 'switch', name: ['type.example'], text: '完成提醒', description: '有结果时通知', density: 'compact', default: true }] }]);
    try {
        assert.equal(document.querySelector('[data-slot="card"]'), null);
        assert.match(document.body.textContent, /完成提醒.*有结果时通知/s);
        await click(document.querySelector('[aria-label="完成提醒"]'));
        assert.equal(settingsUI.changed.at(-1)['type.example'], false);
    } finally { await ui.close(); }
});

test('secondary multiline editor cancels its draft and only applies on confirmation', async () => {
    const ui = await mount([{ type: 'text', name: 'body', text: '正文', multiline: true }], {}, null, {}, { body: '原始内容' });
    try {
        await click(document.querySelector('[aria-label="编辑正文"]'));
        await edit(document.querySelector('textarea'), '尚未确认');
        await click(button('ds.cancel'));
        assert.equal(settingsUI.changed.length, 0);
        await click(document.querySelector('[aria-label="编辑正文"]'));
        assert.equal(document.querySelector('textarea').value, '原始内容');
        await edit(document.querySelector('textarea'), '确认后的正文');
        await click(button('ds.confirm'));
        assert.equal(settingsUI.changed.at(-1).body, '确认后的正文');
        assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('template dialog keeps its fields editable and creates one item on confirmation', async () => {
    const ui = await mount([{ type: 'list', name: 'entries', text: '配置', createLabel: '加入', children: [{ type: 'text', name: 'title', text: '名称' }], addTemplates: [{ id: 'basic', label: '基础预设', values: { title: '默认名称' }, fields: [{ type: 'text', name: 'title', text: '名称' }] }] }]);
    try {
        await click(button('ds.add'));
        const field = [...document.querySelectorAll('input')].find(node => node.value === '默认名称');
        await edit(field, '新建配置');
        await click(button('加入'));
        assert.equal(settingsUI.changed.at(-1).entries.length, 1);
        assert.equal(settingsUI.changed.at(-1).entries[0].title, '新建配置');
        assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('generic list toolbar uses readable accessible names and preserves list actions', async () => {
    const ui = await mount([{ type: 'list', name: 'entries', text: '配置', itemTitleKey: 'title', children: [{ type: 'text', name: 'title', text: '名称' }] }], {}, null, {}, { entries: [{ title: '第一项' }, { title: '第二项' }] });
    try {
        const toolbar = () => document.querySelector('[data-setting-entry-id]');
        for (const label of ['上移', '下移', '复制', '删除']) {
            const control = toolbar().querySelector(`button[aria-label="${label}"]`);
            assert.ok(control);
            assert.equal(control.title, label);
        }
        assert.equal(toolbar().querySelector('[aria-label="上移"]').disabled, true);
        await click(toolbar().querySelector('[aria-label="下移"]'));
        assert.deepEqual(settingsUI.changed.at(-1).entries.map(entry => entry.title), ['第二项', '第一项']);
        await click(toolbar().querySelector('[aria-label="复制"]'));
        assert.equal(settingsUI.changed.at(-1).entries.length, 3);
        await click(toolbar().querySelector('[aria-label="删除"]'));
        assert.equal(settingsUI.changed.at(-1).entries.length, 2);
    } finally { await ui.close(); }
});

test('every literal dynamic-settings translation key exists in both bundled languages', async () => {
    const source = await readFile(new URL('../src/components/setting/DynamicSettings.jsx', import.meta.url), 'utf8');
    const keys = [...source.matchAll(/t\(['"]ds\.([^'"]+)['"]/g)].map(match => match[1]);
    for (const language of ['zh', 'en']) {
        const catalog = JSON.parse(await readFile(new URL(`../src/assets/locales/${language}.json`, import.meta.url), 'utf8'));
        for (const key of keys) assert.ok(catalog.ds[key], `${language}: ds.${key} must have a visible translation`);
    }
});
