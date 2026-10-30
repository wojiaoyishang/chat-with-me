import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
await build({ entryPoints: ['src/components/setting/JsonConfigEditor.jsx'], outfile: 'temp/json-config-editor-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external' });
const { default: Editor } = await import('../temp/json-config-editor-test.mjs');
import { validateEditors as validateJsonEditors } from '@cwm/json-config-editor';
test('frontend and backend consume the identical shared editor build', async () => {
  const root = path.dirname(fileURLToPath(import.meta.url));
  const backend = path.resolve(root, '../../../Python/Chat-With-Me-Backend/packages/json-config-editor/compiled/editor.mjs');
  const frontend = path.resolve(root, '../node_modules/@cwm/json-config-editor/compiled/editor.mjs');
  assert.equal(await readFile(frontend, 'utf8'), await readFile(backend, 'utf8'));
});

async function setup(t, props) {
  const dom = new JSDOM('<div id="root"></div>', { pretendToBeVisual: true });
  const saved = Object.fromEntries(['window', 'document', 'navigator', 'Window', 'HTMLElement', 'Node', 'DOMRect', 'Range', 'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const key of Object.keys(saved)) Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key]?.bind?.(dom.window) || dom.window[key] });
  dom.window.Range.prototype.getClientRects = () => [];
  dom.window.Range.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, right: 1, bottom: 1, width: 1, height: 1 });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const container = dom.window.document.getElementById('root'), root = createRoot(container), ref = React.createRef(), changes = [];
  const render = async (next) => act(async () => root.render(React.createElement(Editor, { ...props, ...next, ref, onChange: (value) => changes.push(value) })));
  await render();
  t.after(async () => { await act(async () => root.unmount()); dom.window.close(); for (const [key, descriptor] of Object.entries(saved)) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; delete globalThis.IS_REACT_ACT_ENVIRONMENT; });
  return { container, ref, changes, render };
}
test('React editor emits only valid values and preserves draft/history across parent echoes', async (t) => {
  const { container, ref, changes, render } = await setup(t, { value: { enabled: false } });
  await act(async () => ref.current.setDraft('{'));
  assert.equal(changes.length, 0); assert.throws(() => validateJsonEditors(container));
  await render({ value: { enabled: false } }); assert.equal(ref.current.getState().draft, '{');
  await act(async () => ref.current.setDraft('{"enabled":true,"custom":null}'));
  assert.deepEqual(changes.at(-1), { enabled: true, custom: null });
  assert.doesNotThrow(() => validateJsonEditors(container));
});
test('JSON-string storage preserves bool/string/null protocol without emitting broken JSON', async (t) => {
  const { ref, changes } = await setup(t, { value: 'true', storage: 'json-string' });
  for (const text of ['false', '"false"', 'null', '{"custom":1}']) {
    await act(async () => ref.current.setDraft(text)); assert.equal(changes.at(-1), text);
  }
  const count = changes.length; await act(async () => ref.current.setDraft('{')); assert.equal(changes.length, count);
  assert.equal(ref.current.getState().valid, false);
});

test('object request fields preserve nested JSON types and reject a non-object root', async (t) => {
  const { container, ref, changes } = await setup(t, { value: {}, schema: { type: 'object' }, label: '自定义请求 JSON' });
  const value = { extra_body: { enabled: true, top_k: 12, nested: { amount: 0.25, disabled: false } } };
  await act(async () => ref.current.setDraft(JSON.stringify(value)));
  assert.deepEqual(changes.at(-1), value);
  assert.equal(typeof changes.at(-1).extra_body.top_k, 'number');
  assert.doesNotThrow(() => validateJsonEditors(container));
  const count = changes.length;
  await act(async () => ref.current.setDraft('[]'));
  assert.equal(changes.length, count);
  assert.throws(() => validateJsonEditors(container));
  await act(async () => ref.current.setDraft('{}'));
  assert.deepEqual(changes.at(-1), {});
  assert.doesNotThrow(() => validateJsonEditors(container));
});

await build({ entryPoints: ['src/features/workspace/components/commandProfile.js'], outfile: 'temp/json-command-editor-test.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', plugins: [{ name: 'ui', setup(builder) {
  builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path: name }) => ({ path: name, external: true }));
  builder.onResolve({ filter: /^@\// }, ({ path: name }) => name === '@/components/setting/JsonConfigEditor.jsx' ? { path: path.resolve('src/components/setting/JsonConfigEditor.jsx') } : { path: name, namespace: 'mock' });
  builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => ({ loader: 'jsx', contents: name.includes('button') ? 'export const Button=({variant,size,...props})=><button {...props}/>;' : 'export const Input=(props)=><input {...props}/>;' }));
} }] });
const { commandRows, commandProfileFromRows } = await import('../temp/json-command-editor-test.mjs');
test('command configuration retains argument boundaries and rejects wrong JSON shapes', () => {
  const profile = { commands: { run: { argv: ['C:\\Program Files\\Python\\python.exe', '-m', 'space argument', ''], cwd: '.', timeoutSeconds: 30, allowExtraArgs: false } } };
  const rows = commandRows(profile);
  assert.deepEqual(commandProfileFromRows(rows, profile).commands.run.argv, profile.commands.run.argv);
  for (const argv of ['{}', '[]', '[true]', '[""]', '["python",]']) assert.throws(() => commandProfileFromRows([{ ...rows[0], argv }], profile));
});
