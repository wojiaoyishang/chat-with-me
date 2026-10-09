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
const timeline = fs.readFileSync(new URL(`${root}InspectorCallTimeline.jsx`, import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export default function', 'function');
const code = transformSync(`const {useRef,useEffect} = require('react'); const ChevronLeft=()=>null; const ChevronRight=()=>null;
${highlight}
${timeline}
exports.Highlight=InspectorHighlight; exports.Timeline=InspectorCallTimeline;`, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code;
const context = { require: createRequire(import.meta.url), exports: {} };
vm.runInNewContext(code, context);

test('search highlights all literal matches without interpreting regex or HTML', () => {
    const html = renderToStaticMarkup(React.createElement(context.exports.Highlight, { text: '[A] <script> [a]', query: '[a]' }));
    assert.equal((html.match(/<mark /g) || []).length, 2);
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(!html.includes('<script>'));
    assert.equal(renderToStaticMarkup(React.createElement(context.exports.Highlight, { text: 'plain', query: '' })), 'plain');
});

test('call overview has wide connected nodes and scroll controls', () => {
    const calls = Array.from({ length: 20 }, (_, index) => ({ modelCallId: `call-${index}`, sequence: index + 1, messageOrder: 2, status: 'completed', model: { name: 'model' } }));
    const html = renderToStaticMarkup(React.createElement(context.exports.Timeline, { calls, selectedId: 'call-10', messageCount: 3, onSelect: () => {} }));
    assert.match(html, /overflow-x-auto/);
    assert.match(html, /min-w-36/);
    assert.match(html, /aria-current="step"/);
    assert.match(html, /向后滚动时间线/);
    assert.match(html, /Call #20/);
});
