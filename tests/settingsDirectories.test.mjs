import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, ref, registerSettingsComponent, DirectoryListField, act } from './helpers/settingsRuntimeHarness.mjs';

registerSettingsComponent('directory-list', DirectoryListField);
const roots = [{ id: 'a', name: 'Project', displayPath: '/srv/project' }, { id: 'b', name: 'Data', displayPath: '/srv/data' }];
const field = (extra = {}) => ({ type: 'directory-list', name: 'mounts', text: '可访问目录', roots,
    browseEndpoint: '/remote/roots/{root.id}/folders', browseTitle: '选择远端目录', browseDescription: '设备开放的目录', ...extra });

test('directory readonly inheritance is visible without overwriting individual choices', async () => {
    const ui = await mount([{ type: 'switch', name: 'readonly', text: '整个工作区只读' }, field({ readOnlySource: ref('form.readonly') })], {}, null, {}, {
        readonly: false, mounts: [{ rootId: 'a', relativePath: 'src', alias: 'project', readOnly: false }, { rootId: 'b', relativePath: 'papers', alias: 'papers', readOnly: true, inheritedReadOnly: true }],
    });
    try {
        const first = document.querySelector('[aria-label="目录 1 只读"]');
        const second = document.querySelector('[aria-label="目录 2 只读"]');
        assert.equal(first.checked, false);
        assert.equal(second.checked, true);
        assert.equal(second.disabled, true);
        await click(document.querySelector('[aria-label="整个工作区只读"]'));
        assert.equal(first.checked, true);
        assert.equal(first.disabled, true);
        assert.equal(settingsUI.changed.at(-1).mounts[0].readOnly, false);
        await click(document.querySelector('[aria-label="整个工作区只读"]'));
        assert.equal(first.checked, false);
        assert.equal(first.disabled, false);
    } finally { await ui.close(); }
});

test('remote folder selection switches roots and preserves the chosen relative path', async () => {
    const ui = await mount([field({ aliasHistory: { papers: ['a', 'old'] } })], {}, (_method, endpoint, options) => {
        const id = endpoint.includes('/b/') ? 'b' : 'a';
        const path = options?.params?.path || '.';
        return { root: { ...roots.find((root) => root.id === id), readOnly: true }, path, parentPath: path === '.' ? null : '.', entries: path === '.' ? [{ name: 'papers', path: 'papers', type: 'directory' }] : [] };
    }, {}, { mounts: [] });
    try {
        await click(button('选择目录'));
        assert.match(document.body.textContent, /选择远端目录/);
        await act(async () => {
            const select = document.querySelector('select');
            select.value = 'b';
            select.dispatchEvent(new window.Event('change', { bubbles: true }));
        });
        await click(button('papers'));
        await click(button('workspace_select_current_folder'));
        const chosen = settingsUI.changed.at(-1).mounts[0];
        assert.equal(chosen.rootId, 'b');
        assert.equal(chosen.relativePath, 'papers');
        assert.equal(chosen.alias, 'papers-2');
        assert.equal(chosen.displayPath, '/srv/data/papers');
        assert.equal(chosen.readOnly, false);
        assert.equal(chosen.inheritedReadOnly, true);
        assert.ok(settingsUI.calls.some(([, endpoint]) => endpoint === '/remote/roots/b/folders'));
    } finally { await ui.close(); }
});

test('failed browsing stays in the selector and cannot add an unverified directory', async () => {
    let failed = true;
    const ui = await mount([field()], {}, () => {
        if (failed) throw Error('远端离线');
        return { root: roots[0], path: '.', parentPath: null, selectable: false, entries: [] };
    }, {}, { mounts: [] });
    try {
        await click(button('选择目录'));
        assert.match(document.querySelector('[role="alert"]').textContent, /远端离线/);
        assert.equal(button('workspace_select_current_folder').disabled, true);
        assert.equal(settingsUI.errors.length, 0);
        failed = false;
        await click(button('retry'));
        assert.equal(document.querySelector('[role="alert"]'), null);
        assert.equal(button('workspace_select_current_folder').disabled, true);
        assert.equal(settingsUI.changed.length, 0);
    } finally { await ui.close(); }
});

test('plain multiline settings have one label and retain ordinary controlled values', async () => {
    const ui = await mount([{ type: 'text', name: 'description', text: '备注', multiline: true, multilineStyle: 'plain' }], {}, null, {}, { description: 'notes' });
    try {
        assert.equal(document.querySelector('[aria-label="备注"]').value, 'notes');
        assert.equal(document.body.textContent.split('备注').length - 1, 1);
    } finally { await ui.close(); }
});
