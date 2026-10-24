import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { JSDOM } from 'jsdom';
import { deduplicateToolLogReferences } from '../src/components/markdown/card-block/status/toolLogReferences.js';
import { getCardReplaceIdFromAttributes, normalizeReplacementEntry, parseCardReplaceAttributes } from '../src/components/markdown/replacementProtocol.js';

const refs = (id, type = '') => `{{cardReplace id="${id}"${type ? ` type=${type}` : ''}}}`;
const replacement = {
    log: { type: 'toolLog', content: '[TITLE:调用工具 comfyui_run]\n[START:2026-10-24T10:00:00Z]' },
    second: { type: 'toolLog', content: '[TITLE:调用工具 comfyui_run]\n[START:2026-10-24T10:00:00Z]' },
    inferred: '[toolLog]\n[TITLE:调用工具 comfyui_run]',
    ordinary: { type: 'markdown', content: '普通卡片' },
};

test('only the same toolLog replacement ID is deduplicated, including inferred types and quoted IDs', () => {
    const source = `${refs('log')}\n${refs('log', 'toolLog')}\n${refs('second')}\n${refs('inferred')}\n{{cardReplace id='inferred'}}`;
    assert.equal(deduplicateToolLogReferences(source, replacement), `${refs('log')}\n\n${refs('second')}\n${refs('inferred')}\n`);
    assert.equal(deduplicateToolLogReferences('{{cardReplace id="spaced log" type=toolLog}}{{cardReplace id=\'spaced log\' type=toolLog}}'), '{{cardReplace id="spaced log" type=toolLog}}');
});

test('same-title distinct IDs, explicit other types, plain Markdown and non-toolLog cards are preserved', () => {
    const source = `# 普通正文\n${refs('log')}\n${refs('second')}\n${refs('log', 'markdown')}\n${refs('ordinary')}\n${refs('ordinary')}\n${refs('unknown')}\n${refs('unknown')}`;
    assert.equal(deduplicateToolLogReferences(source, replacement), source);
});

test('inline, fenced, indented and escaped code examples remain byte-for-byte unchanged', () => {
    const source = [
        `\`${refs('log')} ${refs('log')}\``,
        '```json', refs('log'), refs('log'), '```',
        '~~~', refs('log'), refs('log'), '~~~',
        `    ${refs('log')}`, `    ${refs('log')}`, '',
        `\\${refs('log')} \\${refs('log')}`,
        refs('log'), refs('log'),
    ].join('\n');
    assert.equal(deduplicateToolLogReferences(source, replacement), source.slice(0, -refs('log').length));
});

test('replacement types can resolve after a streamed token arrives without suppressing ordinary references', () => {
    const source = `${refs('log')} ${refs('log')}`;
    assert.equal(deduplicateToolLogReferences(source, {}), source);
    assert.equal(deduplicateToolLogReferences(source, replacement), `${refs('log')} `);
});

await build({
    entryPoints: ['src/components/markdown/card-block/status/StatusWidget.jsx'], bundle: true,
    packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node', outfile: 'temp/tool-calling-log-references-test.mjs',
    plugins: [{ name: 'status-fixtures', setup(builder) {
        builder.onResolve({ filter: /useFrontendFeedback\.js$|FrontendFeedbackButtons\.jsx$|ToolLogBlock\.jsx$|StatusHeader\.jsx$|StickyStatusHeader\.jsx$|IgnoredContextIndicator\.jsx$|CompactedContextIndicator\.jsx$|^@\/lib\/tools\.jsx$|^react-i18next$/ }, ({ path: target }) => ({ path: target, namespace: 'fixture' }));
        builder.onResolve({ filter: /^@\// }, ({ path: target }) => ({ path: path.resolve(target.replace(/^@\//, 'src/')) }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: target }) => {
            const contents = target.endsWith('useFrontendFeedback.js') ? 'export default ()=>({states:{}});'
                : target === 'react-i18next' ? 'export const useTranslation=()=>({t:(key,fallback)=>fallback||key});'
                : target.endsWith('tools.jsx') ? 'export const CHAT_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="chat"; export const EXECUTION_WINDOW_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="window"; export const useLocalSetting=()=>[false];'
                : target.endsWith('StickyStatusHeader.jsx') ? 'export default ({children})=><header>{children}</header>;'
                : target.endsWith('StatusHeader.jsx') ? 'export default ({displayTitle})=><h3>{displayTitle}</h3>;'
                : 'export default ()=>null;';
            return { contents, loader: 'jsx', resolveDir: process.cwd() };
        });
    } }],
});
const { default: StatusWidget } = await import('../temp/tool-calling-log-references-test.mjs');

async function mount(t, props) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/chat', pretendToBeVisual: true });
    globalThis.window = dom.window; globalThis.document = dom.window.document; globalThis.HTMLElement = dom.window.HTMLElement; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const received = [];
    let currentReplacement = props.replacement || replacement;
    const renderMarkdown = (content) => {
        received.push(content);
        const tokens = [...content.matchAll(/\{\{cardReplace\s+([^}]+)\}\}/g)];
        return tokens.map((match, index) => {
            const attrs = parseCardReplaceAttributes(match[1]);
            const id = getCardReplaceIdFromAttributes(attrs);
            const entry = normalizeReplacementEntry(currentReplacement, id, attrs.type);
            return React.createElement(Log, { key: `${index}:${id}`, id, type: entry.type });
        });
    };
    function Log({ id, type }) { return React.createElement('div', { 'data-log': String(type).toLowerCase() === 'toollog' ? id : undefined }, '调用工具 comfyui_run'); }
    const root = createRoot(document.getElementById('root'));
    t.after(async () => { await act(async () => root.unmount()); dom.window.close(); });
    const render = async (next = {}) => {
        if (Object.hasOwn(next, 'replacement')) currentReplacement = next.replacement;
        return act(async () => root.render(React.createElement(StatusWidget, {
        title: 'Tool Calling', id: 'history-call', contextId: t.name, type: 'toolCalling', defaultExpanded: true,
        replacement, renderMarkdown, ...props, ...next,
        })));
    };
    await render();
    return { received, render, logs: () => [...document.querySelectorAll('[data-log]')].map((element) => element.dataset.log) };
}

test('real historical tool-calling card renders one loading row for two references to the same tool log', async (t) => {
    const ui = await mount(t, { content: `${refs('log')}\n${refs('log')}` });
    assert.deepEqual(ui.logs(), ['log']);
    assert.equal(ui.received.at(-1).includes(`${refs('log')}\n${refs('log')}`), false);
});

test('real tool-calling card preserves separate same-title logs and non-tool-calling content', async (t) => {
    const ui = await mount(t, { content: `${refs('log')}\n${refs('second')}` });
    assert.deepEqual(ui.logs(), ['log', 'second']);
    const repeated = `${refs('log')}\n${refs('log')}`;
    await ui.render({ content: repeated, type: 'thinking' });
    assert.equal(ui.received.at(-1), repeated);
    assert.deepEqual(ui.logs(), ['log', 'log']);
});

test('real status card recomputes clean content when replacement type arrives later', async (t) => {
    const source = `${refs('log')}\n${refs('log')}`;
    const ui = await mount(t, { content: source, replacement: {} });
    assert.equal(ui.received.at(-1), source);
    await ui.render({ replacement });
    assert.deepEqual(ui.logs(), ['log']);
});
