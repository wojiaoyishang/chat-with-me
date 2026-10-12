import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const backend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../Python/Chat-With-Me-Backend');
const [template, editor, motion, controls, browser, pageScript] = await Promise.all([
  'application/management_pages/templates/attachments.html',
  'packages/json-config-editor/compiled/editor.js',
  'application/management_pages/static/page-motion.js',
  'application/management_pages/static/select-controls.js',
  'application/management_pages/static/resource-browser.js',
  'application/management_pages/static/attachments-page.js',
].map(file => readFile(path.join(backend, file), 'utf8')));
const settle = () => new Promise(resolve => setTimeout(resolve, 25));
const files = [
  { id: 'a', name: '资料.md', type: 'text', notes: '原备注', uri: 'cwm://artifact/file-a', size: 128, createdAt: '2026-10-12T10:00:00' },
  { id: 'b', name: '图片.png', type: 'image', notes: '图片说明', uri: 'cwm://artifact/file-b', preview: 'cwm://artifact/file-b/preview', size: 512 },
];

async function setup(t, responder = () => undefined) {
  const html = template.replace('{{ config | tojson }}', JSON.stringify({ kind: 'attachments', apiBase: '/api' }))
    .replace('{{ stylesheet | safe }}', '').replace('{{ script | safe }}', '');
  const dom = new JSDOM(html, { url: 'http://localhost/api/attachments/page', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom, document = window.document, calls = [];
  window.matchMedia = () => ({ matches: true });
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
  window.fetch = async (url, options = {}) => {
    const parsed = new URL(url, window.location.href), call = { parsed, ...options }; calls.push(call);
    let result = await responder(call);
    if (result === undefined && parsed.pathname === '/api/attachments') result = { items: structuredClone(files), total: files.length };
    if (result === undefined && parsed.pathname === '/api/knowledge/source-preview') result = { source: { contentHash: 'version' }, blocks: [{ text: '正文' }], total: 1 };
    if (result?.failure) return { ok: false, status: 400, json: async () => ({ success: false, msg: result.failure }) };
    return { ok: true, status: 200, json: async () => ({ success: true, data: result }) };
  };
  window.eval(editor + '\nwindow.CWMJSONEditor = CWMJSONEditor;');
  for (const source of [motion, controls, browser, pageScript]) window.eval(source);
  t.after(() => { window.dispatchEvent(new window.Event('pagehide')); window.close(); });
  await settle();
  const action = (id, label) => {
    document.querySelector(`.resource-browser-card[data-id="${id}"] [aria-haspopup="menu"]`).click();
    [...document.querySelectorAll('[role="menuitem"]')].find(item => item.textContent === label).click();
  };
  const submitEdit = () => document.querySelector('#attachment-edit-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  const cancel = dialog => { const event = new window.Event('cancel', { cancelable: true }); dialog.dispatchEvent(event); return event; };
  return { dom, document, window, calls, action, submitEdit, cancel };
}

test('attachment edit preserves draft on API failure and reopens another file with fresh metadata and scroll', async t => {
  const ui = await setup(t, call => call.method === 'PUT' ? { failure: '名称不能写入' } : undefined);
  const { document, action, submitEdit, calls } = ui;
  action('a', '编辑信息');
  const dialog = document.querySelector('#attachment-edit');
  assert.equal(dialog.open, true);
  document.querySelector('#attachment-name').value = ' 新的名称.md ';
  document.querySelector('#attachment-notes textarea').value = ' 保留\n多行备注 ';
  submitEdit(); await settle();
  assert.equal(dialog.open, true);
  assert.equal(document.querySelector('#edit-error').textContent, '名称不能写入');
  assert.equal(document.querySelector('#attachment-name').value, ' 新的名称.md ');
  assert.equal(document.querySelector('#attachment-notes textarea').value, ' 保留\n多行备注 ');
  assert.deepEqual(JSON.parse(calls.find(call => call.method === 'PUT').body), { name: ' 新的名称.md ', notes: ' 保留\n多行备注 ' });
  dialog.querySelector('.attachment-dialog-body').scrollTop = 250;
  dialog.querySelector('[data-close]').click(); action('b', '编辑信息');
  assert.equal(dialog.querySelector('.attachment-dialog-body').scrollTop, 0);
  assert.equal(document.querySelector('#attachment-name').value, '图片.png');
  assert.equal(document.querySelector('#attachment-notes textarea').value, '图片说明');
  assert.match(document.querySelector('#attachment-resource-info').textContent, /file-b/);
  assert.equal(document.querySelector('#edit-error').textContent, '');
});

test('pending attachment save blocks Escape and cancel, failure restores interaction without closing', async t => {
  let finish;
  const ui = await setup(t, call => call.method === 'PUT' ? new Promise(resolve => { finish = resolve; }) : undefined);
  const { document, action, submitEdit, cancel } = ui;
  action('a', '编辑信息'); submitEdit(); await settle();
  const dialog = document.querySelector('#attachment-edit');
  assert.equal(document.querySelector('#save-attachment').disabled, true);
  assert.equal(document.querySelector('#attachment-name').disabled, true);
  assert.equal(document.querySelector('#attachment-notes textarea').disabled, true);
  assert.equal(cancel(dialog).defaultPrevented, true);
  assert.equal(dialog.open, true);
  dialog.querySelector('[data-close]').click(); assert.equal(dialog.open, true);
  finish({ failure: '保存失败' }); await settle();
  assert.equal(document.querySelector('#save-attachment').disabled, false);
  assert.equal(document.querySelector('#attachment-name').disabled, false);
  assert.equal(dialog.open, true);
  dialog.querySelector('[data-close]').click(); assert.equal(dialog.open, false);
});

test('single attachment deletion defaults to disk cleanup and preserves failure before retrying library-only removal', async t => {
  let failure = true;
  const ui = await setup(t, call => call.method === 'DELETE' ? failure ? { failure: '文件仍被引用' } : { deletedIds: ['a'] } : undefined);
  const { document, action, calls } = ui;
  action('a', '删除');
  const dialog = document.querySelector('#attachment-remove'), complete = document.querySelector('#attachment-complete-delete');
  assert.equal(complete.checked, true);
  document.querySelector('#confirm-remove').click(); await settle();
  assert.equal(calls.find(call => call.method === 'DELETE').parsed.searchParams.get('complete'), 'true');
  assert.equal(dialog.open, true);
  assert.equal(document.querySelector('#remove-error').textContent, '文件仍被引用');
  assert.equal(complete.checked, true);
  complete.click(); assert.equal(document.querySelector('#confirm-remove').textContent, '移出附件库');
  failure = false; document.querySelector('#confirm-remove').click(); await settle();
  assert.equal(calls.filter(call => call.method === 'DELETE').at(-1).parsed.searchParams.get('complete'), 'false');
  assert.equal(dialog.open, false);
  action('b', '删除'); assert.equal(complete.checked, true, 'each deletion starts with the default cleanup choice');
});

test('batch deletion submits all selected ids atomically and keeps selection/dialog after a failed request', async t => {
  let finish, removed = false;
  const ui = await setup(t, call => {
    if (call.parsed.pathname === '/api/attachments/batch/remove') return new Promise(resolve => { finish = resolve; });
    if (call.parsed.pathname === '/api/attachments' && removed) return { items: [], total: 0 };
  });
  const { document, calls, cancel } = ui;
  document.querySelector('[aria-label="选择本页全部附件"]').click();
  [...document.querySelectorAll('button')].find(button => button.textContent === '删除所选').click();
  const dialog = document.querySelector('#attachment-remove');
  assert.equal(document.querySelector('#remove-title').textContent, '删除 2 个附件');
  assert.equal(document.querySelectorAll('#attachment-delete-list li').length, 2);
  document.querySelector('#confirm-remove').click(); await settle();
  const first = calls.find(call => call.parsed.pathname === '/api/attachments/batch/remove');
  assert.equal(first.method, 'POST'); assert.deepEqual(JSON.parse(first.body), { ids: ['a', 'b'], complete: true });
  assert.equal(document.querySelector('#attachment-complete-delete').disabled, true);
  cancel(dialog); assert.equal(dialog.open, true);
  finish({ failure: '共享附件不能完全删除' }); await settle();
  assert.equal(dialog.open, true);
  assert.equal(document.querySelectorAll('.resource-browser-card.selected').length, 2);
  assert.equal(document.querySelector('#remove-error').textContent, '共享附件不能完全删除');
  document.querySelector('#attachment-complete-delete').click();
  document.querySelector('#confirm-remove').click(); await settle();
  assert.deepEqual(JSON.parse(calls.filter(call => call.parsed.pathname === '/api/attachments/batch/remove').at(-1).body), { ids: ['a', 'b'], complete: false });
  removed = true; finish({ deletedIds: ['a', 'b'], cleanupPending: true, warning: '附件已移除，清理稍后重试' }); await settle();
  assert.equal(dialog.open, false);
  assert.equal(document.querySelector('.resource-selection-bar').hidden, true);
  assert.match(document.querySelector('.resource-browser-status').textContent, /清理稍后重试/);
});

test('edit preview closes independently, then edit cancellation releases its media and modal lock', async t => {
  const { document, action, cancel } = await setup(t);
  action('b', '编辑信息');
  const edit = document.querySelector('#attachment-edit');
  document.querySelector('#attachment-summary button').click();
  let preview = document.querySelector('.resource-preview-dialog');
  assert.equal(preview.open, true); assert.equal(edit.open, true);
  cancel(preview);
  assert.equal(document.querySelector('.resource-preview-dialog'), null);
  assert.equal(edit.open, true);
  assert.equal(document.documentElement.classList.contains('cwm-modal-open'), true);
  document.querySelector('#attachment-summary button').click();
  preview = document.querySelector('.resource-preview-dialog');
  assert.equal(preview.open, true);
  document.querySelector('#attachment-edit [data-close]').click();
  assert.equal(edit.open, false);
  assert.equal(document.querySelector('.resource-preview-dialog'), null);
  assert.equal(document.documentElement.classList.contains('cwm-modal-open'), false);
});

test('returning from the browser page cache preserves browsing, draft, selection and server search', async t => {
  const { document, window, calls, action } = await setup(t);
  document.querySelector('.resource-row-check').click();
  action('a', '编辑信息');
  document.querySelector('#attachment-notes textarea').value = '缓存中的草稿';
  window.dispatchEvent(new window.PageTransitionEvent('pagehide', { persisted: true }));
  window.dispatchEvent(new window.PageTransitionEvent('pageshow', { persisted: true }));
  assert.equal(document.querySelector('#attachment-edit').open, true);
  assert.equal(document.querySelector('#attachment-notes textarea').value, '缓存中的草稿');
  document.querySelector('#attachment-edit [data-close]').click();
  const search = document.querySelector('input[type="search"]');
  search.value = '返回后搜索'; search.dispatchEvent(new window.Event('input'));
  await new Promise(resolve => setTimeout(resolve, 285));
  assert.equal(calls.filter(call => call.parsed.pathname === '/api/attachments').at(-1).parsed.searchParams.get('q'), '返回后搜索');
  assert.equal(document.querySelector('.resource-browser-card[data-id="a"]').classList.contains('selected'), true);
  action('b', '编辑信息');
  assert.equal(document.querySelector('#attachment-name').value, '图片.png');
});
