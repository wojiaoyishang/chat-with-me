import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

await build({
    stdin: {
        contents: 'export { default } from "./src/components/setting/KnowledgeDatabaseSettings.jsx";',
        resolveDir: process.cwd(),
        loader: 'jsx',
    },
    outfile: 'temp/knowledge-database-settings.bundle.mjs',
    bundle: true,
    format: 'esm',
    platform: 'node',
    packages: 'external',
    jsx: 'automatic',
    plugins: [{
        name: 'settings-test-controls',
        setup(builder) {
            builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
            builder.onResolve({ filter: /^@\// }, ({ path }) => ({ path, namespace: 'mock' }));
            builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path }) => {
                if (path.includes('apiClient')) {
                    return {
                        contents: 'export default {get:(...args)=>globalThis.databaseSettingsTest.api.get(...args),post:(...args)=>globalThis.databaseSettingsTest.api.post(...args),put:(...args)=>globalThis.databaseSettingsTest.api.put(...args),delete:(...args)=>globalThis.databaseSettingsTest.api.delete(...args)};',
                        loader: 'jsx',
                    };
                }
                if (path.endsWith('DynamicSettings.jsx')) {
                    return {
                        contents: `
                            import React from 'react';
                            export default function DynamicSettings({config,initialValues,onChange}) {
                                const [values,setValues]=React.useState(initialValues);
                                return <div data-testid="dynamic-form">{config.filter(field=>field.name).map(field=><label key={field.name}>
                                    {field.text}<input aria-label={field.text} type={field.inputType==='password'?'password':'text'}
                                    value={values[field.name]??''} onInput={event=>{
                                        const next={...values,[field.name]:event.target.value};setValues(next);onChange(next);
                                    }}/>
                                </label>)}</div>;
                            }
                        `,
                        loader: 'jsx',
                    };
                }
                if (path.endsWith('/badge')) return { contents: 'export const Badge=({children})=><span>{children}</span>;', loader: 'jsx' };
                if (path.endsWith('/button')) return { contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;', loader: 'jsx' };
                if (path.endsWith('/card')) return {
                    contents: 'export const Card=({children})=><section>{children}</section>;export const CardHeader=({children})=><header>{children}</header>;export const CardTitle=({children})=><h3>{children}</h3>;export const CardDescription=({children})=><p>{children}</p>;export const CardContent=({children})=><div>{children}</div>;',
                    loader: 'jsx',
                };
                if (path.endsWith('/dialog')) return {
                    contents: 'export const Dialog=({open,children})=>open?<div>{children}</div>:null;export const DialogContent=({children})=><div role="dialog">{children}</div>;export const DialogHeader=({children})=><header>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;export const DialogFooter=({children})=><footer>{children}</footer>;',
                    loader: 'jsx',
                };
                if (path.endsWith('/alert-dialog')) return {
                    contents: 'export const AlertDialog=({open,children})=>open?<div>{children}</div>:null;export const AlertDialogContent=({children})=><div role="alertdialog">{children}</div>;export const AlertDialogHeader=({children})=><header>{children}</header>;export const AlertDialogTitle=({children})=><h2>{children}</h2>;export const AlertDialogDescription=({children})=><p>{children}</p>;export const AlertDialogFooter=({children})=><footer>{children}</footer>;export const AlertDialogCancel=({children,...props})=><button {...props}>{children}</button>;export const AlertDialogAction=({children,...props})=><button {...props}>{children}</button>;',
                    loader: 'jsx',
                };
                return { contents: '', loader: 'jsx' };
            });
        },
    }],
});

const { default: KnowledgeDatabaseSettings } = await import('../temp/knowledge-database-settings.bundle.mjs');
const connection = {
    id: 'db-one', name: 'old-name', title: '旧知识库', description: '', uri: 'bolt://localhost:7687',
    database: 'neo4j', username: 'neo4j', hasPassword: true, enabled: true, readOnly: false,
    allowedUserIds: [], queryTimeoutSeconds: 30, revision: 3,
};
const config = {
    component: 'knowledge-databases', endpoint: '/knowledge/databases', databases: [connection],
    formOptions: [
        { type: 'text', name: 'title', text: '知识库名称' },
        { type: 'text', name: 'name', text: '知识库标识' },
        { type: 'text', name: 'uri', text: '连接地址' },
        { type: 'text', name: 'password', text: '密码', inputType: 'password' },
    ],
    formDefaults: { title: '', name: '', uri: '', password: '' },
};

async function mount() {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const calls = [];
    const state = { latest: { ...connection }, conflictOnPut: false, conflictOnDelete: false };
    globalThis.databaseSettingsTest = {
        api: {
            async get(url) {
                calls.push({ method: 'GET', url });
                if (url === '/knowledge/databases') {
                    if (state.listGate) {
                        const gate = state.listGate;
                        state.listGate = null;
                        return gate;
                    }
                    return { databases: [state.latest] };
                }
                return { ...state.latest };
            },
            async post(url, body) {
                calls.push({ method: 'POST', url, body });
                if (url.endsWith('/verify')) return { verified: true };
                state.latest = { ...body, id: 'db-new', revision: 1 };
                return state.latest;
            },
            async put(url, body) {
                calls.push({ method: 'PUT', url, body });
                if (state.conflictOnPut) throw Object.assign(new Error('版本冲突'), { code: 409 });
                state.latest = { ...state.latest, ...body, revision: body.revision + 1 };
                return state.latest;
            },
            async delete(url, options) {
                calls.push({ method: 'DELETE', url, options });
                if (state.conflictOnDelete) throw Object.assign(new Error('版本冲突'), { code: 409 });
                return { deleted: true };
            },
        },
    };
    const root = createRoot(document.getElementById('root'));
    await act(async () => root.render(React.createElement(KnowledgeDatabaseSettings, { config })));
    return {
        calls, state, dom,
        close: async () => { await act(async () => root.unmount()); dom.window.close(); },
    };
}

const button = (label) => [...document.querySelectorAll('button')].find((item) => item.textContent.includes(label));
const click = async (element) => { assert.ok(element); await act(async () => element.click()); };
const input = async (label, value) => {
    const field = document.querySelector(`[aria-label="${label}"]`);
    assert.ok(field);
    await act(async () => {
        field.value = value;
        field.dispatchEvent(new window.Event('input', { bubbles: true }));
    });
};

test('knowledge database settings renders a connection and creates one through its own form', async () => {
    const ui = await mount();
    try {
        assert.match(document.body.textContent, /旧知识库/);
        await click(button('新增连接'));
        assert.ok(document.querySelector('[role="dialog"]'));
        await input('知识库名称', '新知识库');
        await input('知识库标识', 'new-db');
        await input('连接地址', 'bolt://server:7687');
        await input('密码', 'secret');
        await click(button('保存连接'));
        const created = ui.calls.find((call) => call.method === 'POST' && call.url === '/knowledge/databases');
        assert.deepEqual(created.body, { title: '新知识库', name: 'new-db', uri: 'bolt://server:7687', password: 'secret' });
        assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await ui.close(); }
});

test('editing retains a blank password, sends revision, and tests the saved connection', async () => {
    const ui = await mount();
    try {
        await click(document.querySelector('[aria-label="测试连接 旧知识库"]'));
        assert.ok(ui.calls.some((call) => call.method === 'POST' && call.url === '/knowledge/databases/db-one/verify'));
        await click(document.querySelector('[aria-label="编辑连接 旧知识库"]'));
        assert.equal(document.querySelector('[aria-label="密码"]').getAttribute('type'), 'password');
        assert.equal(document.querySelector('[aria-label="密码"]').value, '');
        await input('知识库标识', 'renamed-db');
        await click(button('保存连接'));
        const edited = ui.calls.find((call) => call.method === 'PUT');
        assert.equal(edited.url, '/knowledge/databases/db-one');
        assert.equal(edited.body.revision, 3);
        assert.equal(edited.body.name, 'renamed-db');
        assert.equal('password' in edited.body, false);
        assert.equal('id' in edited.body, false);
    } finally { await ui.close(); }
});

test('version conflict stays visible and deletion only removes the saved connection', async () => {
    const ui = await mount();
    try {
        ui.state.conflictOnPut = true;
        await click(document.querySelector('[aria-label="编辑连接 旧知识库"]'));
        await click(button('保存连接'));
        assert.match(document.querySelector('[role="alert"]').textContent, /版本冲突/);
        assert.ok(document.querySelector('[role="dialog"]'));
        ui.state.latest = { ...ui.state.latest, revision: 4 };
        await click(button('读取最新配置'));
        assert.equal(document.querySelector('[role="alert"]'), null);
        await click(button('取消'));
        await click(document.querySelector('[aria-label="删除连接 旧知识库"]'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /不删除 Neo4j 数据库及其中的数据/);
        await click(button('仅删除连接'));
        const removed = ui.calls.find((call) => call.method === 'DELETE');
        assert.deepEqual(removed.options.params, { revision: 4 });
    } finally { await ui.close(); }
});

test('delete conflict blocks a stale retry until the connection list is refreshed', async () => {
    const ui = await mount();
    try {
        ui.state.conflictOnDelete = true;
        await click(document.querySelector('[aria-label="删除连接 旧知识库"]'));
        await click(button('仅删除连接'));
        assert.match(document.querySelector('[role="alertdialog"]').textContent, /请刷新列表后重新确认删除/);
        assert.equal(button('仅删除连接').disabled, true);
        await click(button('刷新列表'));
        assert.equal(document.querySelector('[role="alertdialog"]'), null);
        assert.equal(ui.calls.filter((call) => call.method === 'DELETE').length, 1);
    } finally { await ui.close(); }
});

test('an earlier list refresh cannot overwrite a newly saved connection', async () => {
    const ui = await mount();
    try {
        let releaseStale;
        ui.state.listGate = new Promise((resolve) => { releaseStale = resolve; });
        await click(document.querySelector('[aria-label="刷新知识库连接"]'));
        await click(button('新增连接'));
        await input('知识库名称', '新知识库');
        await input('知识库标识', 'new-db');
        await input('连接地址', 'bolt://server:7687');
        await input('密码', 'secret');
        await click(button('保存连接'));
        assert.match(document.body.textContent, /新知识库/);
        await act(async () => releaseStale({ databases: [connection] }));
        assert.match(document.body.textContent, /新知识库/);
        assert.doesNotMatch(document.body.textContent, /旧知识库/);
    } finally { await ui.close(); }
});

test('settings tab routes the server component to the manager without global save', async () => {
    const source = await readFile('src/pages/SettingPage.jsx', 'utf8');
    assert.match(source, /dynamicConfig\.component === 'knowledge-databases'/);
    assert.match(source, /<KnowledgeDatabaseSettings config=\{dynamicConfig\}/);
    const expression = source.match(/const hasUnsavedChanges = ([^;]+);/)?.[1];
    assert.ok(expression);
    const hasUnsavedChanges = new Function('isDynamicTab', 'dynamicConfig', 'isConfigPristine', `return ${expression}`);
    assert.equal(hasUnsavedChanges(true, { component: 'knowledge-databases' }, false), false);
    assert.equal(hasUnsavedChanges(true, { component: 'comfyui' }, false), false);
    assert.equal(hasUnsavedChanges(true, { component: 'ordinary-form' }, false), true);
    assert.equal(hasUnsavedChanges(true, { component: 'ordinary-form' }, true), false);
});
