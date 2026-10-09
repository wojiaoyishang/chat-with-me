import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { transformSync } from 'esbuild';

const root = '../src/features/chat/page/components/';
const highlight = fs.readFileSync(new URL(`${root}InspectorHighlight.jsx`, import.meta.url), 'utf8').replace('export default function', 'function');
const timeline = fs.readFileSync(new URL(`${root}InspectorEventTimeline.jsx`, import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export default function', 'function');
const code = transformSync(`const {useRef,useEffect,useMemo,useState} = require('react'); const attachHorizontalWheel=()=>{}; const ChevronLeft=()=>null; const ChevronRight=()=>null; const Loader2=()=>null; const Search=()=>null; const formatLocalTimestamp=value=>value;
${highlight}
${timeline}
exports.Highlight=InspectorHighlight; exports.Timeline=InspectorEventTimeline;`, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code;
const context = { require: createRequire(import.meta.url), exports: {} };
vm.runInNewContext(code, context);

test('search highlights all literal matches without interpreting regex or HTML', () => {
    const html = renderToStaticMarkup(React.createElement(context.exports.Highlight, { text: '[A] <script> [a]', query: '[a]' }));
    assert.equal((html.match(/<mark /g) || []).length, 2);
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(!html.includes('<script>'));
    assert.equal(renderToStaticMarkup(React.createElement(context.exports.Highlight, { text: 'plain', query: '' })), 'plain');
});

test('event timeline includes every event kind and scroll controls above details', () => {
    const kinds = ['system', 'user', 'assistant', 'model_call', 'tool_call', 'tool_result'];
    const events = Array.from({ length: 20 }, (_, index) => ({ eventId: `event-${index}`, order: index + 1, kind: kinds[index % kinds.length], title: `event ${index}`, callSequence: 1, model: 'model' }));
    const html = renderToStaticMarkup(React.createElement(context.exports.Timeline, { section: { events, conversationId: 'c' }, renderCall: () => null, renderReplacements: () => null }));
    assert.match(html, /overflow-x-auto/);
    assert.match(html, /w-44/);
    assert.match(html, /aria-current="step"/);
    assert.match(html, /向后滚动时间线/);
    for (const label of ['系统', '用户', '助手', '模型请求', '工具调用', '工具结果']) assert.ok(html.includes(label));
    assert.match(html, /搜索全部消息、工具参数、结果或 ID/);
    assert.ok(html.indexOf('event 0') < html.indexOf('正在加载事件'));
});
