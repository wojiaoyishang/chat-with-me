import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

await build({ entryPoints: ['src/components/setting/MCPSettings.jsx'], outfile: 'temp/mcp-settings-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', plugins: [{ name: 'mcp-ui', setup(builder) {
  builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: requested }) => ({ path: requested, external: true }));
  builder.onResolve({ filter: /^@\/features\/mcp\/settingsModel\.js$/ }, () => ({ path: path.resolve('src/features/mcp/settingsModel.js') }));
  builder.onResolve({ filter: /^@\// }, ({ path: requested }) => ({ path: requested, namespace: 'mock' }));
  builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: requested }) => {
    if (requested.endsWith('/apiClient.js')) return { loader: 'js', contents: 'export default {get:(...args)=>globalThis.mcpUI.get(...args),post:(...args)=>globalThis.mcpUI.post(...args),patch:(...args)=>globalThis.mcpUI.patch(...args),delete:(...args)=>globalThis.mcpUI.delete(...args)};' };
    if (requested.endsWith('/useEventStore.jsx')) return { loader: 'js', contents: 'export const onEvent=()=>({then(listener){globalThis.mcpUI.listeners.push(listener);return ()=>{globalThis.mcpUI.listeners=globalThis.mcpUI.listeners.filter(value=>value!==listener);};}});' };
    if (requested.endsWith('/useConfirmation.jsx')) return { loader: 'js', contents: 'export const useConfirmation=()=>[async(options)=>{globalThis.mcpUI.confirmations.push(options);return true;},null];' };
    if (requested.endsWith('/button')) return { loader: 'jsx', contents: 'export const Button=({children,variant,size,...props})=><button {...props}>{children}</button>;' };
    if (requested.endsWith('/badge')) return { loader: 'jsx', contents: 'export const Badge=({children,variant,...props})=><span {...props}>{children}</span>;' };
    if (requested.endsWith('/input')) return { loader: 'jsx', contents: 'export const Input=(props)=><input {...props}/>;' };
    if (requested.endsWith('/switch')) return { loader: 'jsx', contents: 'export const Switch=({checked,onCheckedChange,...props})=><input type="checkbox" checked={checked} onChange={event=>onCheckedChange?.(event.target.checked)} {...props}/>;' };
    if (requested.endsWith('/dialog')) return { loader: 'jsx', contents: 'export const Dialog=({open,children})=>open?<div>{children}</div>:null;export const DialogContent=({children,...props})=><div role="dialog" {...props}>{children}</div>;export const DialogHeader=({children,...props})=><header {...props}>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;export const DialogFooter=({children,...props})=><footer {...props}>{children}</footer>;' };
    if (requested.endsWith('/select')) return { loader: 'jsx', contents: 'export const Select=({children})=><div>{children}</div>;export const SelectContent=Select;export const SelectItem=({children})=><span>{children}</span>;export const SelectTrigger=({children})=><button type="button">{children}</button>;export const SelectValue=()=>null;' };
    throw new Error(`Unexpected import ${requested}`);
  });
} }] });

const { default: MCPSettings } = await import('../temp/mcp-settings-test.mjs');
const fixture = (changes = {}) => ({ id: 'server-id', slug: 'robot', title: 'Robot', description: 'fixture', transport: 'http', enabled: true, revision: 2, connectTimeout: 10, callTimeout: 120, maxConcurrency: 4, connection: { url: 'http://localhost:9023/mcp', headers: { Authorization: '' } }, defaults: { default: 'ask', directExposure: false }, toolPolicies: {}, tools: [], status: 'untested', needsPublish: true, ...changes });

async function mount(server) {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
  for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.mcpUI = { server, calls: [], listeners: [], confirmations: [], tasks: [],
    async get(url) { this.calls.push(['get', url]); return { servers: [this.server] }; },
    async post(url, data) { this.calls.push(['post', url, data]); return { taskId: 'probe-task' }; },
    async patch(url, data) { this.calls.push(['patch', url, data]); return { server: this.server }; },
    async delete(url, data) { this.calls.push(['delete', url, data]); return {}; },
  };
  const root = createRoot(document.getElementById('root'));
  await act(async () => root.render(React.createElement(MCPSettings, { config: { endpoint: '/mcp' }, onTask: id => mcpUI.tasks.push(id) })));
  return { close: async () => { await act(async () => root.unmount()); dom.window.close(); } };
}
const button = text => [...document.querySelectorAll('button')].find(node => node.textContent.trim() === text);
const click = async element => { assert.ok(element); await act(async () => element.click()); };

test('existing secrets remain masked when the editor saves an unchanged connection', async () => {
  const ui = await mount(fixture());
  try {
    await click(button('编辑'));
    assert.equal(document.querySelector('[aria-label="请求头值 1"]').type, 'password');
    assert.equal(document.querySelector('[aria-label="请求头值 1"]').value, '');
    await act(async () => document.querySelector('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
    const saved = mcpUI.calls.find(([method]) => method === 'patch');
    assert.deepEqual(saved[2].connection.headers, { Authorization: '' });
    assert.equal(saved[2].revision, 2);
    assert.equal(saved[2].slug, 'robot');
    assert.equal(document.querySelector('[role="dialog"]'), null);
  } finally { await ui.close(); }
});

test('rapid probe clicks submit once and expose the exact background task link', async () => {
  const ui = await mount(fixture());
  try {
    const probe = button('刷新工具');
    await act(async () => { probe.click(); probe.click(); });
    assert.equal(mcpUI.calls.filter(([method]) => method === 'post').length, 1);
    assert.deepEqual(mcpUI.calls.find(([method]) => method === 'post')[2], { revision: 2, operation: 'discover' });
    await click(button('查看任务'));
    assert.deepEqual(mcpUI.tasks, ['probe-task']);
  } finally { await ui.close(); }
});

test('candidate publication sends the candidate identity and current revision', async () => {
  const ui = await mount(fixture({ candidateId: 'candidate-id', candidateTools: [{ name: 'echo', inputSchema: {} }], diff: { added: ['echo'], changed: [], removed: [] } }));
  try {
    assert.match(document.body.textContent, /等待确认/);
    await click(button('确认发布'));
    const published = mcpUI.calls.find(([method, url]) => method === 'post' && url.endsWith('/publish'));
    assert.deepEqual(published[2], { revision: 2, candidateId: 'candidate-id' });
  } finally { await ui.close(); }
});

test('a tool named defaults opens its own advanced policy instead of server defaults', async () => {
  const ui = await mount(fixture({ tools: [{ name: 'defaults', inputSchema: {} }], toolPolicies: { defaults: { default: 'deny' } } }));
  try {
    await click(button('工具策略'));
    const advanced = [...document.querySelectorAll('button')].filter(node => node.textContent.trim() === '高级配置');
    await click(advanced[1]);
    assert.deepEqual(JSON.parse(document.querySelector('[aria-label="高级策略 JSON"]').value), { default: 'deny' });
  } finally { await ui.close(); }
});
