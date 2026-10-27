import test from 'node:test';
import assert from 'node:assert/strict';
import { mount, button, click, edit, upload, ref } from './helpers/settingsRuntimeHarness.mjs';

const original = { id: 'workflow-1', revision: 7, title: '提示词生成图片', notes: '保留使用备注', requireOutput: true, graph: { prompt: { 1: { class_type: 'Text', inputs: { text: '旧文字' } } }, bindings: [{ name: 'positive_prompt', targets: [{ nodeId: '1', inputKey: 'text' }, { nodeId: '2', inputKey: 'text' }], description: '参数备注', defaultMode: 'random' }], outputBindings: [{ nodeId: '10' }] } };
const inspect = { id: 'inspect', label: '解析导入', method: 'POST', endpoint: '/comfyui/workflows/inspect', body: { source: ref('form.importWorkflow'), graph: ref('form.graph') }, effects: [{ type: 'patch', target: 'form.graph', value: ref('response.graph') }, { type: 'patch', target: 'form.reconciliation', value: ref('response.reconciliation') }, { type: 'patch', target: 'form.updateConfirmed', value: false }] };
const resource = { type: 'resource', id: 'workflows', source: { endpoint: '/comfyui/workflows', listPath: 'workflows' }, titleField: 'title', actions: [{ kind: 'edit', label: '编辑' }, { id: 'copy', label: '复制工作流', method: 'POST', endpoint: '/comfyui/workflows/{item.id}/copy', body: { revision: ref('item.revision') }, effects: [{ type: 'refresh', target: 'workflows' }] }], editor: {
    options: [
        { type: 'text', name: 'title', text: '工作流名称', required: true }, { type: 'text', name: 'notes', text: '使用备注' },
        { type: 'file-input', name: 'importWorkflow', text: '上传新工作流', readAs: 'json', accept: '.json' }, { type: 'actions', actions: [inspect] },
        { type: 'json', name: 'graph', text: '通用图描述' }, { type: 'switch', name: 'requireOutput', text: '需要输出节点' },
        { type: 'switch', name: 'updateConfirmed', text: '确认丢失的映射', when: { left: ref('form.reconciliation.requiresConfirmation'), op: 'truthy' } },
    ], defaults: { updateConfirmed: false },
    update: { id: 'save', method: 'PUT', endpoint: '/comfyui/workflows/{item.id}', body: { title: ref('form.title'), notes: ref('form.notes'), graph: ref('form.graph'), revision: ref('item.revision') }, disabledWhen: { any: [{ all: [{ left: ref('form.reconciliation.requiresConfirmation'), op: 'truthy' }, { not: { left: ref('form.updateConfirmed'), op: 'truthy' } }] }, { all: [{ left: ref('form.requireOutput'), op: 'truthy' }, { left: ref('form.graph.outputBindings'), op: 'empty' }] }] } },
} };
const graph = () => JSON.parse(document.querySelector('[aria-label="通用图描述"]').value);
const file = value => ({ text: async () => JSON.stringify(value) });

test('workflow reimport previews a server-reconciled graph and preserves parameter targets until save', async () => {
    const next = structuredClone(original.graph); next.prompt[1].inputs.text = '新文字';
    const ui = await mount([resource], null, (method, url) => method === 'get' ? { workflows: [original] } : url.endsWith('/inspect') ? { graph: next, reconciliation: { requiresConfirmation: false } } : {});
    try {
        await click(button('编辑')); await upload(document.querySelector('input[type="file"]'), file({ 1: { class_type: 'Text', inputs: { text: '新文字' } } }));
        await click(button('解析导入'));
        assert.deepEqual(graph().bindings, original.graph.bindings);
        assert.equal(graph().prompt[1].inputs.text, '新文字');
        assert.equal(settingsUI.calls.some(([method]) => method === 'put'), false);
        await click(button('保存'));
        const saved = settingsUI.calls.find(([method]) => method === 'put')[2];
        assert.equal(saved.notes, original.notes); assert.equal(saved.revision, 7); assert.deepEqual(saved.graph, next);
    } finally { await ui.close(); }
});

test('cancelling a reimport preview never writes the saved workflow', async () => {
    const ui = await mount([resource], null, method => method === 'get' ? { workflows: [original] } : { graph: { ...original.graph, prompt: { preview: true } }, reconciliation: {} });
    try {
        await click(button('编辑')); await click(button('解析导入')); await click(button('取消'));
        assert.equal(settingsUI.calls.some(([method]) => method === 'put'), false);
        assert.equal(original.graph.prompt[1].inputs.text, '旧文字');
    } finally { await ui.close(); }
});

test('canvas-only uploads are parsed by the generic file field and forwarded intact', async () => {
    const canvas = { nodes: [{ id: 1, type: 'Text', widgets_values: ['新文字'] }], links: [] };
    const ui = await mount([resource], null, method => method === 'get' ? { workflows: [original] } : { graph: { ...original.graph, uiWorkflow: canvas }, reconciliation: {} });
    try {
        await click(button('编辑')); await upload(document.querySelector('input[type="file"]'), file(canvas)); await click(button('解析导入'));
        assert.deepEqual(settingsUI.calls.find(([method]) => method === 'post')[2].source, canvas);
        assert.deepEqual(graph().uiWorkflow, canvas);
    } finally { await ui.close(); }
});

test('backend conditions require confirmation for lost mappings and an output when requested', async () => {
    const ui = await mount([resource], null, method => method === 'get' ? { workflows: [original] } : { graph: { ...original.graph, outputBindings: [] }, reconciliation: { requiresConfirmation: true } });
    try {
        await click(button('编辑')); await click(button('解析导入'));
        assert.equal(button('保存').disabled, true);
        await click(document.querySelector('[aria-label="确认丢失的映射"]'));
        assert.equal(button('保存').disabled, true, 'required outputs remain a separate condition');
        await click(document.querySelector('[aria-label="需要输出节点"]'));
        assert.equal(button('保存').disabled, false);
    } finally { await ui.close(); }
});

test('copying a workflow creates an independent server record and subsequent edits use its identity', async () => {
    let rows = [original];
    const copy = { ...structuredClone(original), id: 'workflow-copy', revision: 1, title: '工作流副本' };
    const ui = await mount([resource], null, (method, url) => {
        if (method === 'get') return { workflows: rows };
        if (url.endsWith('/copy')) { rows = [copy]; return { workflow: copy }; }
        return {};
    });
    try {
        await click(button('复制工作流')); await click(button('编辑'));
        await edit(document.querySelector('[aria-label="工作流名称"]'), '修改副本'); await click(button('保存'));
        assert.equal(settingsUI.calls.find(([method]) => method === 'put')[1], '/comfyui/workflows/workflow-copy');
        assert.equal(settingsUI.calls.find(([method]) => method === 'put')[2].revision, 1);
        assert.equal(original.title, '提示词生成图片');
    } finally { await ui.close(); }
});

test('invalid files and stale saves retain the original graph and current editor values', async () => {
    const ui = await mount([resource], null, method => { if (method === 'get') return { workflows: [original] }; throw Object.assign(new Error('工作流版本冲突'), { code: 409 }); });
    try {
        await click(button('编辑')); await upload(document.querySelector('input[type="file"]'), { text: async () => '{broken' }); await click(button('保存'));
        assert.equal(settingsUI.calls.some(([method]) => method === 'put'), false);
        await upload(document.querySelector('input[type="file"]'), file({ nodes: [] }));
        await edit(document.querySelector('[aria-label="工作流名称"]'), '未保存标题'); await click(button('保存'));
        assert.ok(document.querySelector('[role="dialog"]')); assert.equal(document.querySelector('[aria-label="工作流名称"]').value, '未保存标题');
        assert.match(document.body.textContent, /工作流版本冲突/); assert.deepEqual(graph(), original.graph);
    } finally { await ui.close(); }
});

test('a second inspection receives the preceding preview graph rather than the original snapshot', async () => {
    let sequence = 0;
    const ui = await mount([resource], null, method => method === 'get' ? { workflows: [original] } : { graph: { ...original.graph, previewSequence: ++sequence }, reconciliation: {} });
    try {
        await click(button('编辑')); await click(button('解析导入')); await click(button('解析导入'));
        const calls = settingsUI.calls.filter(([method]) => method === 'post');
        assert.equal(calls[1][2].graph.previewSequence, 1); assert.equal(graph().previewSequence, 2);
    } finally { await ui.close(); }
});
