import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { transformSync } from 'esbuild';

const source = fs.readFileSync(new URL('../src/features/chat/page/components/RuntimeInspectorDialog.jsx', import.meta.url), 'utf8');
const selector = source.slice(source.indexOf('const ModelCallSelector ='), source.indexOf('const ResponsesContinuationPanel ='));
const treeStart = source.indexOf('const ReplacementTree =');
const tree = source.slice(treeStart, source.indexOf('\n', treeStart));
const highlight = fs.readFileSync(new URL('../src/features/chat/page/components/InspectorHighlight.jsx', import.meta.url), 'utf8').replace('export default function', 'function');
const script = transformSync(`
const React = require('react');
const { useState } = React;
const Badge = ({ children }) => <span>{children}</span>;
const Cpu = () => <span />;
const Search = () => <span />;
const LazyDetails = ({ children, open }) => <details open={open}>{children}</details>;
${highlight}
${selector}
${tree}
exports.Selector = ModelCallSelector;
exports.Tree = ReplacementTree;
`, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
const context = { require: createRequire(import.meta.url), exports: {} };
vm.runInNewContext(script, context);

test('timeline preserves message order, groups rounds and displays messages without calls', () => {
    const html = renderToStaticMarkup(React.createElement(context.exports.Selector, {
        selectedId: 'call-2', onSelect: () => {},
        timeline: [
            { messageId: 'u', role: 'user', order: 1, preview: 'user question', callIds: [] },
            { messageId: 'a', role: 'assistant', order: 2, callIds: ['call-1', 'call-2'] },
        ],
        calls: [
            { modelCallId: 'call-1', sequence: 1, status: 'completed', model: { name: 'model-a' } },
            { modelCallId: 'call-2', sequence: 2, status: 'failed', model: { name: 'model-b' } },
        ],
    }));
    assert.ok(html.indexOf('user question') < html.indexOf('call-1'));
    assert.ok(html.indexOf('call-1') < html.indexOf('call-2'));
    assert.match(html, /failed/);
    assert.match(html, /model-b/);
    assert.match(html, /消息 #/);
});

test('recursive replacement details remain text and show diagnostics', () => {
    const html = renderToStaticMarkup(React.createElement(context.exports.Tree, {
        nodes: [{ id: 'outer', content: '<script>unsafe</script>', children: [
            { id: 'inner', content: 'nested text', children: [{ id: 'outer', diagnostic: '循环引用' }] },
        ] }],
    }));
    assert.match(html, /replacement: outer/);
    assert.match(html, /replacement: inner/);
    assert.match(html, /nested text/);
    assert.match(html, /循环引用/);
    assert.ok(!html.includes('<script>'));
});

test('switching branches discards inspector caches and loads the new branch', async () => {
    const hookSource = fs.readFileSync(new URL('../src/features/chat/page/hooks/useRuntimeInspector.js', import.meta.url), 'utf8')
        .replace(/^import .*;\r?\n/gm, '').replace('export default function', 'function');
    const slots = [];
    let cursor = 0;
    let effects = [];
    let branchCall = 'call-a';
    const unchanged = (a, b) => a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
    const sandbox = {
        AbortController, window: { setTimeout, clearTimeout },
        apiEndpoint: { CHAT_RUNTIME_TIMELINE_ENDPOINT: '/inspector' },
        apiClient: { get: async (_, { params }) => params.action === 'overview'
            ? { defaultTab: 'timeline', tabs: [{ id: 'timeline', section: { loaded: false } }] }
            : { tabId: 'timeline', section: { loaded: true, modelCalls: [{ modelCallId: branchCall }] } } },
        useState: (initial) => {
            const index = cursor++;
            if (!slots[index]) slots[index] = { value: initial, setter: (next) => { slots[index].value = typeof next === 'function' ? next(slots[index].value) : next; } };
            return [slots[index].value, slots[index].setter];
        },
        useRef: (initial) => { const index = cursor++; return slots[index] ||= { current: initial }; },
        useCallback: (callback, deps) => {
            const index = cursor++;
            if (!unchanged(slots[index]?.deps, deps)) slots[index] = { value: callback, deps };
            return slots[index].value;
        },
        useEffect: (effect, deps) => {
            const index = cursor++;
            if (!unchanged(slots[index]?.deps, deps)) effects.push(() => { slots[index]?.cleanup?.(); slots[index] = { deps, cleanup: effect() }; });
        },
    };
    vm.createContext(sandbox);
    vm.runInContext(hookSource, sandbox);
    const render = (key) => {
        cursor = 0;
        effects = [];
        const hook = sandbox.useRuntimeInspector('conversation', key);
        effects.forEach((effect) => effect());
        return hook;
    };
    let hook = render('u|a');
    await hook.openInspector();
    hook = render('u|a');
    assert.equal(hook.document.tabs[0].section.modelCalls[0].modelCallId, 'call-a');
    branchCall = 'call-b';
    render('u|b');
    hook = render('u|b');
    assert.equal(hook.document, null);
    await new Promise((resolve) => setTimeout(resolve, 200));
    hook = render('u|b');
    assert.equal(hook.document.tabs[0].section.modelCalls[0].modelCallId, 'call-b');
    hook.closeInspector();
});

test('search expands matching replacement and its ancestors, leaving other nodes collapsed', () => {
    const html = renderToStaticMarkup(React.createElement(context.exports.Tree, {
        query: 'needle', nodes: [
            { id: 'parent', content: 'other', children: [{ id: 'child', content: 'Needle here' }] },
            { id: 'unrelated', content: 'no match' },
        ],
    }));
    assert.equal((html.match(/<details open=""/g) || []).length, 2);
    assert.equal((html.match(/<mark /g) || []).length, 1);
});

