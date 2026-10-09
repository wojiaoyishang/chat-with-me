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
const code = transformSync(`const {useRef,useEffect,useMemo,useState} = require('react'); const attachHorizontalWheel=()=>{}; const ArrowLeft=()=>null; const ChevronDown=()=>null; const ChevronLeft=()=>null; const ChevronRight=()=>null; const Loader2=()=>null; const Search=()=>null; const formatLocalTimestamp=value=>value;
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
    assert.match(html, /w-40/);
    assert.match(html, /aria-current="step"/);
    assert.match(html, /向后滚动时间线/);
    for (const label of ['系统', '用户', '助手', '模型请求', '工具调用', '工具结果']) assert.ok(html.includes(label));
    assert.match(html, /搜索消息、工具参数、结果或 ID/);
    assert.match(html, /aria-expanded="false"/);
    assert.match(html, /aria-hidden="true" inert=""/);
    assert.match(html, /返回时间线/);
    assert.match(html, /aria-label="简洁事件时间线"/);
    assert.ok(!html.includes('时间线 / 搜索'));
    assert.ok(html.indexOf('event 0') < html.indexOf('正在加载事件'));
});

test('desktop hover opens an overlay, while mobile selection and back switch between list and detail', () => {
    const slots = [];
    let cursor = 0;
    const sandbox = {
        require: createRequire(import.meta.url), exports: {},
        useState: (initial) => {
            const index = cursor++;
            if (!slots[index]) slots[index] = { value: initial };
            return [slots[index].value, (value) => { slots[index].value = value; }];
        },
        useRef: () => { const index = cursor++; return slots[index] ||= { current: null }; },
        useMemo: (factory) => factory(), useEffect: () => {},
        ArrowLeft: () => null, ChevronDown: () => null, ChevronLeft: () => null, ChevronRight: () => null,
        Search: () => null, Loader2: () => null, formatLocalTimestamp: (value) => value,
    };
    vm.runInNewContext(transformSync(`${highlight}\n${timeline}\nexports.Timeline=InspectorEventTimeline;`, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code, sandbox);
    const props = { section: { events: [{ eventId: 'user-1', kind: 'user', title: 'Question', order: 1 }, { eventId: 'user-2', kind: 'user', title: 'Next', order: 2 }] }, renderCall: () => null, renderReplacements: () => null };
    const render = () => { cursor = 0; return sandbox.exports.Timeline(props); };
    let tree = render();
    const desktop = () => tree.props.children[0];
    const panel = () => desktop().props.children[1];
    assert.equal(panel().props.inert, true);
    desktop().props.onPointerEnter({ pointerType: 'touch' });
    tree = render();
    assert.equal(panel().props.inert, true);
    desktop().props.onPointerEnter({ pointerType: 'mouse' });
    tree = render();
    assert.equal(panel().props.inert, false);
    assert.match(panel().props.className, /absolute/);
    desktop().props.onPointerLeave({ pointerType: 'mouse', currentTarget: { querySelector: () => null } });
    tree = render();
    assert.equal(panel().props.inert, true);
    const find = (node, predicate) => {
        if (!node || typeof node !== 'object') return null;
        if (predicate(node)) return node;
        for (const child of [node.props?.children].flat(Infinity)) {
            const result = find(child, predicate);
            if (result) return result;
        }
        return null;
    };
    const expandedTrack = find(desktop(), (node) => node.type === 'nav' && node.props['aria-label'] === '详细事件时间线');
    const scrolls = [];
    expandedTrack.props.ref.current = {
        clientWidth: 180,
        querySelectorAll: () => [{ dataset: { eventId: 'user-1' }, offsetLeft: 168, offsetWidth: 160 }],
        scrollTo: (options) => scrolls.push(options),
    };
    const compactBeforePreview = find(desktop(), (node) => node.type === 'nav' && node.props['aria-label'] === '简洁事件时间线');
    const firstSegment = compactBeforePreview.props.children.props.children[0][0];
    assert.match(firstSegment.props.children.props.className, /w-full rounded-sm/);
    firstSegment.props.onPointerEnter({ pointerType: 'touch' });
    assert.equal(scrolls.length, 0);
    firstSegment.props.onPointerEnter({ pointerType: 'mouse' });
    tree = render();
    assert.equal(scrolls[0].left, 158);
    assert.equal(scrolls[0].behavior, 'instant');
    assert.equal(panel().props.inert, false);
    assert.equal(find(desktop(), (node) => node.props?.['data-event-id'] === 'user-1').props['data-preview'], 'true');
    assert.equal(find(desktop(), (node) => node.type === 'button' && node.props['aria-label']?.includes('#2')).props['aria-current'], 'step');
    desktop().props.onPointerLeave({ pointerType: 'mouse', currentTarget: { querySelector: () => null } });
    tree = render();
    find(tree.props.children[1], (node) => node.type === 'button' && node.props.title === 'user-1').props.onClick({ detail: 1 });
    tree = render();
    assert.match(tree.props.children[1].props.className, /^hidden/);
    assert.match(tree.props.children[2].props.className, /^block/);
    find(tree.props.children[2], (node) => node.type === 'button' && node.props.className.includes('sm:hidden')).props.onClick();
    tree = render();
    assert.match(tree.props.children[1].props.className, /^flex/);
    assert.match(tree.props.children[2].props.className, /^hidden/);
    const compact = find(desktop(), (node) => node.type === 'nav' && node.props['aria-label'] === '简洁事件时间线');
    const dots = compact.props.children.props.children[0];
    assert.equal(dots.length, 2);
    dots[1].props.onClick({ detail: 1 });
    tree = render();
    const selectedDot = find(desktop(), (node) => node.type === 'button' && node.props['aria-label']?.includes('#2'));
    assert.equal(selectedDot.props['aria-current'], 'step');
    assert.equal(panel().props.inert, true);
});
