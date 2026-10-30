import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {
    applyBulkToolPermissionMode,
    applyToolPermissionsToStatus,
    collectToolPermissionGroups,
    collectToolPermissions,
    collectToolPermissionUsage,
    deduplicateToolPermissionGroups,
    deduplicateToolPermissionItems,
    getToolDisplayName,
    getToolCallableIdentity,
    getToolCatalogCounts,
    getToolPermissionKey,
    readToolPermission,
    readSharedToolPermission,
} from '../src/features/tools/toolPermissions.js';

test('default permission bulk changes use stable keys and preserve restricted tools', () => {
    const current = {'task.read': 'ask', 'knowledge.write': 'ask', 'system.fixed': 'allow'};
    const tools = [
        {name: 'background_job_get', permissionKey: 'task.read'},
        {name: 'knowledge.write', allowedModes: ['allow', 'ask']},
        {name: 'system.fixed', locked: true, default: 'allow'},
    ];
    const denied = applyBulkToolPermissionMode(current, tools, 'deny');
    assert.deepEqual(denied, {'task.read': 'deny', 'knowledge.write': 'ask', 'system.fixed': 'allow'});
    assert.equal(current['task.read'], 'ask');
    assert.deepEqual(applyBulkToolPermissionMode(denied, tools, 'allow'), {
        'task.read': 'allow', 'knowledge.write': 'allow', 'system.fixed': 'allow',
    });
});

test('catalog display text is independent of callable and permission identities', () => {
    const entry = {name: 'raw.remote.call', text: '自定义检索', title: 'Remote search', permissionKey: 'mcp.service.search'};
    assert.equal(getToolDisplayName(entry), '自定义检索');
    assert.equal(getToolPermissionKey(entry), 'mcp.service.search');
    assert.equal(getToolDisplayName({name: 'raw.remote.call', title: 'Remote search'}), 'Remote search');
    assert.equal(getToolDisplayName({name: 'raw.remote.call', text: ' '}), 'raw.remote.call');
});

const readTools = ['background_job_get', 'background_job_wait', 'background_job_list'].map(name => ({
    type: 'tool', name, permissionKey: 'task.read', text: '查看任务', default: 'allow',
}));
const input = [{type: 'tool-region', children: [
    {type: 'group', name: 'background_jobs', text: '后台任务', children: readTools},
    {type: 'group', name: 'background_effects', text: '任务内部操作', description: '提交任务时检查内部读写权限。', children: [
        {type: 'tool', name: 'knowledge.write', permissionKey: 'knowledge.write', permissionOnly: true,
            text: '写入知识库', default: 'ask', description: '控制后台任务对所选知识库的写入。'},
    ]},
]}];

test('permission groups retain distinct callables sharing an action and backend-only actions', () => {
    const groups = collectToolPermissionGroups(input);
    assert.equal(groups.length, 2);
    assert.equal(groups[0].tools.length, 3);
    assert.equal(groups[0].tools[0].name, 'background_job_get');
    assert.equal(getToolPermissionKey(groups[0].tools[0]), 'task.read');
    assert.deepEqual(groups[0].tools[0].permissionAliases, ['background_job_get']);
    assert.equal(groups[1].tools[0].permissionOnly, true);
    assert.equal(groups[1].description, '提交任务时检查内部读写权限。');
    assert.equal(input[0].children[0].children.length, 3, 'does not mutate the callable catalog');
    const deduped = deduplicateToolPermissionGroups([{id: 'one', tools: [readTools[0]]}, {id: 'two', tools: [readTools[1]]}]);
    assert.equal(deduped.length, 2);
    assert.deepEqual(deduped[0].tools[0].permissionAliases, ['background_job_get']);
});

test('canonical permission values override legacy names, while conflicting aliases retain deny', () => {
    const tool = collectToolPermissionGroups(input)[0].tools[0];
    const usage = collectToolPermissionUsage(input);
    assert.equal(readSharedToolPermission(tool, usage, {'task.read': 'allow', background_job_wait: 'deny'}), 'allow');
    assert.equal(readSharedToolPermission(tool, usage, {background_job_get: 'allow', background_job_wait: 'deny'}), 'deny');
    assert.equal(readSharedToolPermission(tool, usage, {background_job_list: 'ask'}, {'task.read': 'allow'}), 'ask');
    assert.equal(readToolPermission(tool, {background_job_wait: 'deny'}), undefined, 'distinct callables are not aliases');
    assert.equal(readToolPermission(tool, {}, {background_job_get: false}), 'deny');
    assert.equal(readToolPermission({name: 'old_tool'}, {old_tool: 'allow'}), 'allow');
});

test('real ToolRef aliases collapse, while distinct sources and functions never collapse by permission key', () => {
    const ref = {source: 'builtin', toolset: 'service', name: 'read'};
    const alias = (name, toolRef = ref) => ({type: 'tool', name, toolRef, permissionKey: 'service.read'});
    const same = deduplicateToolPermissionItems([alias('old_reader'), alias('new_reader')]);
    assert.equal(same.length, 1);
    assert.deepEqual(same[0].permissionAliases, ['old_reader', 'new_reader']);
    const separate = deduplicateToolPermissionItems([alias('old_reader'),
        alias('remote_reader', {...ref, source: 'mcp'}), alias('other_reader', {...ref, name: 'other'})]);
    assert.equal(separate.length, 3);
    assert.notEqual(getToolCallableIdentity(separate[0]), getToolCallableIdentity(separate[1]));
    assert.deepEqual(separate[0].permissionAliases, ['old_reader']);
    assert.equal(deduplicateToolPermissionItems([
        {type: 'tool', name: 'path_a', accessPath: 'service.reader', permissionKey: 'service.read'},
        {type: 'tool', name: 'path_b', accessPath: 'service.reader', permissionKey: 'service.read'},
    ]).length, 1);
});

const knowledgeReadNames = ['list_databases', 'get_source_images', 'get_source_image', 'search_nodes_by_keywords',
    'get_related_graph', 'get_related_chunks', 'read_chunk_source', 'get_chunk_content', 'get_relationship_between_nodes',
    'get_nodes_extracted_from_chunk', 'get_related_chunks_from_chunk', 'get_path_between_nodes', 'get_schema',
    'find_nearest_ordered', 'get_ordered_neighbors', 'get_ordered_graph'];
const knowledgeTools = [...knowledgeReadNames.map(name => [name, 'read']),
    ['add_relationship', 'write'], ['add_node', 'write'], ['remove_relationship', 'delete'], ['remove_node', 'delete']]
    .map(([name, action]) => ({type: 'tool', name: `knowledgeNetwork_${name}`, text: name,
        toolRef: {source: 'builtin', toolset: 'knowledgeNetwork', name}, accessPath: `knowledgeNetwork.${name}`,
        permissionKey: `knowledge.${action}`, permissionLabel: action === 'read' ? '读取知识库' : action === 'write' ? '写入知识库' : '删除知识',
        default: action === 'read' ? 'allow' : 'ask'}));
const knowledgeCatalog = [{type: 'group', name: 'knowledgeNetwork', text: '知识库', children: knowledgeTools}];

test('twenty knowledge callables retain twenty rows and serialize exactly three approval actions', () => {
    const catalog = deduplicateToolPermissionItems(knowledgeCatalog);
    assert.equal(catalog[0].children.length, 20);
    assert.deepEqual(getToolCatalogCounts(catalog), {tools: 20, permissions: 3});
    assert.equal(collectToolPermissionGroups(catalog)[0].tools.length, 20);
    assert.deepEqual(Object.keys(collectToolPermissions(catalog)).sort(), ['knowledge.delete', 'knowledge.read', 'knowledge.write']);
    const withEffect = [...catalog, {type: 'tool', name: 'knowledge.write', permissionKey: 'knowledge.write', permissionOnly: true}];
    assert.deepEqual(getToolCatalogCounts(withEffect), {tools: 20, permissions: 3});
});

test('composer serialization and server updates use stable keys without changing local settings or callable names', () => {
    const status = {background_jobs: {background_job_wait: 'deny'}, localToggle: true};
    assert.deepEqual(collectToolPermissions(input, status), {'task.read': 'deny', 'knowledge.write': 'ask'});
    const applied = applyToolPermissionsToStatus(input, status, {'task.read': 'allow', 'knowledge.write': 'deny'});
    assert.equal(applied.background_jobs['task.read'], 'allow');
    assert.equal(applied.background_effects['knowledge.write'], 'deny');
    assert.equal(applied.localToggle, true);
    assert.equal(status.background_jobs['task.read'], undefined);
    assert.deepEqual(collectToolPermissions(input, applied), {'task.read': 'allow', 'knowledge.write': 'deny'});
    const menu = deduplicateToolPermissionItems(input);
    assert.equal(menu[0].children[0].children.length, 3);
    assert.equal(menu[0].children[0].children[0].name, 'background_job_get');
});

await build({
    stdin: {
        contents: 'export {default as Dialog} from "./src/features/tools/components/ConversationToolsDialog.jsx";export {useExtraToolsMenuItems} from "./src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx";export {default as InteractionHost} from "./src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx";',
        resolveDir: process.cwd(), loader: 'jsx',
    },
    outfile: 'temp/tool-permissions-test.mjs', bundle: true, format: 'esm', platform: 'node', jsx: 'automatic', packages: 'external',
    plugins: [{name: 'tool-permission-ui', setup(builder) {
        builder.onResolve({filter: /^react(?:\/|$)/}, ({path: requested}) => ({path: requested, external: true}));
        builder.onResolve({filter: /^react-i18next$/}, ({path: requested}) => ({path: requested, namespace: 'mock'}));
        builder.onResolve({filter: /^@\/features\/tools\/toolPermissions\.js$/}, () => ({path: path.resolve('src/features/tools/toolPermissions.js')}));
        builder.onResolve({filter: /^@\//}, ({path: requested}) => ({path: requested, namespace: 'mock'}));
        builder.onLoad({filter: /.*/, namespace: 'mock'}, ({path: requested}) => {
            if (requested === 'react-i18next') return {loader: 'js', contents: 'export const useTranslation=()=>({t:(key,options)=>options?.tools?options.tools:key});'};
            if (requested.endsWith('/useEventStore.jsx')) return {loader: 'js', contents: `
                export const onEvent=()=>({then(listener){globalThis.permissionApprovalUI.listeners.push(listener);return ()=>{};}});
                export const emitEvent=async event=>{globalThis.permissionApprovalUI.calls.push(event);return {groupResolved:false};};
            `};
            if (requested.endsWith('/badge')) return {loader: 'jsx', contents: 'export const Badge=({children,variant,...props})=><span {...props}>{children}</span>;'};
            if (requested.endsWith('/card')) return {loader: 'jsx', contents: 'export const Card=({children,...props})=><div {...props}>{children}</div>;export const CardContent=Card;'};
            if (requested.endsWith('/dialog')) return {loader: 'jsx', contents: `
                export const Dialog=({open,children})=>open?<div>{children}</div>:null;
                export const DialogContent=({children})=><div role="dialog">{children}</div>;
                export const DialogHeader=({children})=><header>{children}</header>;
                export const DialogTitle=({children})=><h2>{children}</h2>;
                export const DialogDescription=({children})=><p>{children}</p>;
                export const DialogFooter=({children})=><footer>{children}</footer>;
            `};
            if (requested.endsWith('/button')) return {loader: 'jsx', contents: 'export const Button=({children,variant,...props})=><button {...props}>{children}</button>;'};
            if (requested.endsWith('/dropdown-menu')) return {loader: 'jsx', contents: `
                export const DropdownMenuItem=({children,onSelect,...props})=><div {...props}>{children}</div>;
                export const DropdownMenuLabel=({children})=><label>{children}</label>;
                export const DropdownMenuSeparator=()=>null;
                export const DropdownMenuSub=({children})=><div>{children}</div>;
                export const DropdownMenuSubContent=({children})=><div>{children}</div>;
                export const DropdownMenuSubTrigger=({children})=><div>{children}</div>;
            `};
            if (requested.endsWith('/virtualUrl.js')) return {loader: 'js', contents: 'export const resolveResourceUrl=value=>value;'};
            if (requested.endsWith('/tools.jsx')) return {loader: 'js', contents: 'export const setLocalSetting=()=>{};'};
            return {loader: 'js', contents: ''};
        });
    }}],
});
const {Dialog, useExtraToolsMenuItems, InteractionHost} = await import('../temp/tool-permissions-test.mjs');
const translate = (key, fallback) => typeof fallback === 'object'
    ? fallback.defaultValue.replace(/{{(\w+)}}/g, (_, name) => fallback[name])
    : fallback || key;

async function mount(Component, props) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/', pretendToBeVisual: true});
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const root = createRoot(document.getElementById('root'));
    await act(async () => root.render(React.createElement(Component, props)));
    return {close: async () => {await act(async () => root.unmount()); dom.window.close();}};
}
const click = async element => {assert.ok(element); await act(async () => element.click());};
const button = text => [...document.querySelectorAll('button')].find(node => node.textContent === text || node.getAttribute('aria-label') === text);

test('conversation dialog shows all callables but saves stable permission keys for task effects', async () => {
    const updates = [];
    const ui = await mount(Dialog, {open: true, onOpenChange: () => {}, t: translate, toolsConfig: input,
        currentPermissions: {background_job_wait: 'deny'}, onApply: async value => {updates.push(value);}});
    try {
        assert.match(document.body.textContent, /允许 0 · 询问 1 · 拒绝 1/);
        assert.match(document.body.textContent, /提交任务时检查内部读写权限/);
        await click(button('后台任务'));
        await click(button('任务内部操作'));
        assert.equal([...document.querySelectorAll('span')].filter(node => node.textContent === '查看任务').length, 3);
        const sections = [...document.querySelectorAll('section')];
        const writeRow = sections[1].querySelector('.divide-y').firstElementChild;
        await click([...writeRow.querySelectorAll('button')].find(node => node.textContent === '允许'));
        await click(button('应用到本对话'));
        assert.deepEqual(updates, [{'knowledge.write': 'allow'}]);
    } finally {await ui.close();}
});

test('conversation bulk changes operate once per permission and respect locked metadata', async () => {
    const updates = [];
    const config = [...input, {type: 'tool', name: 'protocol', permissionKey: 'protocol.lifecycle', locked: true, default: 'allow'}];
    const ui = await mount(Dialog, {open: true, onOpenChange: () => {}, t: translate, toolsConfig: config,
        onApply: async value => {updates.push(value);}});
    try {
        await click(button('全部拒绝'));
        assert.deepEqual(updates, [{'task.read': 'deny', 'knowledge.write': 'deny'}]);
    } finally {await ui.close();}
});

test('composer task-effect control updates stable nested state and emits the stable permission key', async () => {
    const changes = [];
    let latest;
    function Menu() {
        const [toolsStatus, setToolsStatus] = React.useState({extra_tools: {background_effects: {'knowledge.write': 'ask'}}});
        latest = toolsStatus;
        const render = useExtraToolsMenuItems({toolsStatus, setToolsStatus, t: translate,
            onToolPermissionChange: (key, mode) => changes.push([key, mode]), runtimeToolPermissions: {},
        });
        return render(input[0].children[1].children, ['background_effects']);
    }
    const ui = await mount(Menu);
    try {
        await click(document.querySelector('[aria-label="写入知识库：拒绝"]'));
        assert.deepEqual(changes, [['knowledge.write', 'deny']]);
        assert.equal(latest.extra_tools.background_effects['knowledge.write'], 'deny');
        assert.equal(document.querySelectorAll('input[type="checkbox"]').length, 0);
    } finally {await ui.close();}
});

test('knowledge composer shows every callable and changing one shared permission updates all sixteen read rows', async () => {
    const changes = [];
    let latest;
    function Menu() {
        const [toolsStatus, setToolsStatus] = React.useState({extra_tools: {}});
        latest = toolsStatus;
        return useExtraToolsMenuItems({toolsStatus, setToolsStatus, t: translate,
            onToolPermissionChange: (key, mode) => changes.push([key, mode]), runtimeToolPermissions: {},
        })(deduplicateToolPermissionItems(knowledgeCatalog));
    }
    const ui = await mount(Menu);
    try {
        assert.equal(document.querySelectorAll('[data-tool-callable]').length, 20);
        assert.match(document.body.textContent, /20 工具/);
        assert.equal([...document.querySelectorAll('div')].filter(node => node.textContent === '共享权限 · 读取知识库').length, 16);
        await click(document.querySelector('[aria-label="get_ordered_graph：拒绝"]'));
        assert.deepEqual(changes, [['knowledge.read', 'deny']]);
        assert.equal(latest.extra_tools.knowledgeNetwork['knowledge.read'], 'deny');
        for (const name of knowledgeReadNames) assert.equal(document.querySelector(`[aria-label="${name}：拒绝"]`).getAttribute('aria-pressed'), 'true');
        assert.equal(document.querySelector('[aria-label="add_node：询问"]').getAttribute('aria-pressed'), 'true');
    } finally {await ui.close();}
});

test('knowledge selector preserves legacy deny across shared rows and persists only one canonical key', async () => {
    const updates = [];
    const ui = await mount(Dialog, {open: true, onOpenChange: () => {}, t: translate, toolsConfig: knowledgeCatalog,
        currentPermissions: {knowledgeNetwork_list_databases: 'allow', knowledgeNetwork_get_ordered_graph: 'deny'},
        onApply: async value => {updates.push(value);}});
    try {
        await click(button('知识库'));
        assert.equal(document.querySelectorAll('[data-tool-callable]').length, 20);
        assert.match(document.body.textContent, /20 工具 · 3 权限/);
        for (const name of knowledgeReadNames) assert.equal(document.querySelector(`[aria-label="${name}：拒绝"]`).getAttribute('aria-pressed'), 'true');
        await click(document.querySelector('[aria-label="get_ordered_graph：询问"]'));
        for (const name of knowledgeReadNames) assert.equal(document.querySelector(`[aria-label="${name}：询问"]`).getAttribute('aria-pressed'), 'true');
        await click(button('应用到本对话'));
        assert.deepEqual(updates, [{'knowledge.read': 'ask'}]);
    } finally {await ui.close();}
});

test('shared composer permissions synchronize across toolsets without merging their callable identities', async () => {
    const groups = [{type: 'group', name: 'one', text: 'One', children: [
        {type: 'tool', name: 'first', text: 'First', permissionKey: 'shared.read', default: 'allow'},
    ]}, {type: 'group', name: 'two', text: 'Two', children: [
        {type: 'tool', name: 'second', text: 'Second', permissionKey: 'shared.read', default: 'allow'},
    ]}];
    let latest;
    function Menu() {
        const [toolsStatus, setToolsStatus] = React.useState({extra_tools: {one: {first: 'allow'}, two: {second: 'deny'}}});
        latest = toolsStatus;
        return useExtraToolsMenuItems({toolsStatus, setToolsStatus, t: translate})(groups);
    }
    const ui = await mount(Menu);
    try {
        assert.equal(document.querySelectorAll('[data-tool-callable]').length, 2);
        for (const name of ['First', 'Second']) assert.equal(document.querySelector(`[aria-label="${name}：拒绝"]`).getAttribute('aria-pressed'), 'true');
        assert.match(document.body.textContent, /共享权限/);
        await click(document.querySelector('[aria-label="Second：询问"]'));
        assert.equal(latest.extra_tools.one['shared.read'], 'ask');
        assert.equal(latest.extra_tools.two['shared.read'], 'ask');
        for (const name of ['First', 'Second']) assert.equal(document.querySelector(`[aria-label="${name}：询问"]`).getAttribute('aria-pressed'), 'true');
    } finally {await ui.close();}
});

test('conversation and composer render server labels literally without client translation collisions', async () => {
    const group = {type: 'group', name: 'custom_service', text: 'delete', description: 'confirm', children: [
        {type: 'tool', name: 'raw.remote.call', text: 'search', description: 'cancel', permissionKey: 'mcp.service.search', default: 'ask'},
    ]};
    const remoteText = new Set(['delete', 'confirm', 'search', 'cancel']);
    const translated = (key, fallback) => remoteText.has(key) ? `WRONG_${key}` : translate(key, fallback);
    const dialog = await mount(Dialog, {open: true, onOpenChange: () => {}, toolsConfig: [group], t: translated});
    try {
        await click(button('delete'));
        assert.match(document.body.textContent, /search/);
        assert.match(document.body.textContent, /confirm/);
        assert.doesNotMatch(document.querySelector('section').textContent, /WRONG_/);
    } finally {await dialog.close();}
    const changes = [];
    function Menu() {
        const [toolsStatus, setToolsStatus] = React.useState({extra_tools: {}});
        return useExtraToolsMenuItems({toolsStatus, setToolsStatus, t: translated,
            onToolPermissionChange: (key, mode) => changes.push([key, mode]),
        })([group]);
    }
    const menu = await mount(Menu);
    try {
        assert.doesNotMatch(document.body.textContent, /WRONG_/);
        assert.ok([...document.querySelectorAll('span')].some(node => node.textContent === 'delete'));
        await click(document.querySelector('[aria-label="search：拒绝"]'));
        assert.deepEqual(changes, [['mcp.service.search', 'deny']]);
    } finally {await menu.close();}
});

test('business approval displays the backend label and resolves the original item identity', async () => {
    globalThis.permissionApprovalUI = {listeners: [], calls: []};
    const ui = await mount(InteractionHost, {conversationId: 'conversation-one'});
    try {
        await act(async () => permissionApprovalUI.listeners[0]({event: 'interaction.show', payload: {value: {
            id: 'approval-one', kind: 'toolApproval', data: {approvalId: 'approval-one', approvalItems: [{
                itemId: 'effect-write', toolName: 'knowledge.write', displayName: '写入知识库', callPreview: '目标：个人知识库',
            }]},
        }}}));
        assert.match(document.body.textContent, /写入知识库/);
        assert.doesNotMatch(document.body.textContent, /knowledge\.write/);
        await click(button('tool_approval_allow'));
        assert.deepEqual(permissionApprovalUI.calls[0], {
            event: 'tool.approval.resolve', conversationId: 'conversation-one',
            payload: {approvalId: 'approval-one', itemId: 'effect-write', decision: 'allow', scope: 'once'},
        });
    } finally {await ui.close();}
});

test('approval group preserves human labels after resolution and supports label field aliases', async () => {
    globalThis.permissionApprovalUI = {listeners: [], calls: []};
    const ui = await mount(InteractionHost, {conversationId: 'conversation-one'});
    try {
        await act(async () => permissionApprovalUI.listeners[0]({event: 'interaction.show', payload: {value: {
            id: 'approval-two', kind: 'toolApproval', data: {approvalItems: [
                {itemId: 'effect-share', tool_name: 'workflow.template.share', display_name: '修改模板共享权限', status: 'resolved', decision: 'allow', callPreview: '目标：提取模板'},
                {itemId: 'effect-model', toolName: 'model.invoke', actionLabel: '任务调用模型', callPreview: '模型队列：已选模型'},
            ]},
        }}}));
        assert.match(document.body.textContent, /修改模板共享权限/);
        assert.match(document.body.textContent, /任务调用模型/);
        assert.match(document.body.textContent, /tool_approval_allowed/);
        assert.doesNotMatch(document.body.textContent, /workflow\.template\.share|model\.invoke/);
        await click(button('tool_approval_deny'));
        assert.equal(permissionApprovalUI.calls[0].payload.itemId, 'effect-model');
    } finally {await ui.close();}
});
