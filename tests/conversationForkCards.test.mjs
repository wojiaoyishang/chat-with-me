import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { normalizeReplacementEntry } from '../src/components/markdown/replacementProtocol.js';
import { remarkCardReplace } from '../src/components/markdown/remarkDirectiveToComponent.js';
import { remarkCollapseExecutionStatuses } from '../src/components/markdown/remarkCollapseExecutionStatuses.js';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost', pretendToBeVisual: true });
for (const key of ['window', 'document', 'navigator', 'Element', 'HTMLElement', 'Node', 'getComputedStyle']) {
    Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = clearTimeout;
HTMLElement.prototype.scrollTo = () => {};
globalThis.snapshotCardEvents = [];

const inertLiveCard = 'export default function LiveCard() { throw new Error("Historical cards must not mount live controls"); }';
const mocks = new Map([
    ['react-i18next', 'export const useTranslation = () => ({ t: (key, fallback) => typeof fallback === "string" ? fallback : key });'],
    ['tools.jsx', 'export const useLocalSetting = (_key, value) => [value]; export const copyTextToClipboard = async () => {}; export const CHAT_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="chat"; export const EXECUTION_WINDOW_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="execution";'],
    ['documentCardSpec.js', 'export const useDocumentCardSpec = () => ({ spec: null, loading: false, error: null });'],
    ['useEventStore.jsx', 'export const emitEvent = async (event) => { globalThis.snapshotCardEvents.push(event); return {success:true}; }; export const onEvent = (event) => {globalThis.snapshotCardEvents.push(event); return {then:()=>()=>{}};};'],
    ['ReplacementContextBadge.jsx', 'export default ({status}) => { if (status) throw new Error("Snapshot context controls must not mount"); return null; };'],
    ['IgnoredContextIndicator.jsx', inertLiveCard],
    ['CompactedContextIndicator.jsx', inertLiveCard],
    ['EscWritingStatus.jsx', inertLiveCard],
    ['WorkflowTaskStatus.jsx', inertLiveCard],
    ['WorkspaceTransferCard.jsx', inertLiveCard],
    ['StoryCard.jsx', inertLiveCard],
    ['WidgetHost.jsx', inertLiveCard],
    ['ExecutionStatusGroup.jsx', inertLiveCard],
    ['@/features/execution', inertLiveCard.replace('export default function LiveCard', 'export function ExecutionStatus')],
    ['universalModal.js', 'export const isUniversalModalLink = () => false; export const openUniversalModalLink = () => {};'],
    ['useImageViewer.js', 'export const openImageViewer = () => {}; export const imageSlides = () => [];'],
    ['ImageGallery.jsx', 'export default () => null;'],
]);

await build({
    stdin: { contents: "export {default as MarkdownRenderer, resolveMarkdownCopyContent} from './src/components/markdown/MarkdownRenderer.jsx'; export {getSpeakableSegments, getStreamingSpeakableSegments} from './src/features/chat/ui/message/utils/speechContent.js';", resolveDir: process.cwd() },
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    outfile: 'temp/conversation-fork-cards-test.mjs', alias: { '@': path.resolve('src') },
    loader: { '.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty' },
    plugins: [{ name: 'isolate-snapshot-runtime', setup(builder) {
        builder.onResolve({ filter: /\.css$/ }, () => ({ path: 'style', namespace: 'snapshot-style' }));
        builder.onLoad({ filter: /.*/, namespace: 'snapshot-style' }, () => ({ contents: '', loader: 'js' }));
        builder.onResolve({ filter: /.*/ }, (args) => {
            const key = [...mocks.keys()].find((name) => args.path === name || args.path.endsWith(`/${name}`));
            return key ? { path: key, namespace: 'snapshot-mock' } : undefined;
        });
        builder.onLoad({ filter: /.*/, namespace: 'snapshot-mock' }, (args) => ({ contents: mocks.get(args.path), loader: 'js' }));
    } }],
});
const { MarkdownRenderer, resolveMarkdownCopyContent, getSpeakableSegments, getStreamingSpeakableSegments } = await import('../temp/conversation-fork-cards-test.mjs');

const feedbackMarker = '[FRONTEND_FEEDBACK ID:12345678-1234-1234-1234-123456789abc ONCE:true TRIGGER:next_speech_start]';
async function withRenderer(run) {
    snapshotCardEvents.length = 0;
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);
    const render = async (replacement, content = '{{cardReplace id=outer}}', props = {}) => act(async () => root.render(
        React.createElement(MarkdownRenderer, { content, replacement, contextId: 'copied-message', conversationId: 'copied-chat', ...props }),
    ));
    try { await run(host, render); }
    finally { await act(async () => root.unmount()); host.remove(); }
}

test('snapshot metadata preserves the original renderer type and protocol', () => {
    const card = normalizeReplacementEntry({ tool: { type: 'toolCalling', frontend: '[toolCalling]\nTool detail', backend: 'context', snapshot: true } }, 'tool');
    assert.equal(card.type, 'toolCalling');
    assert.equal(card.content.trim(), 'Tool detail');
    assert.equal(card.snapshot, true);
    assert.equal(normalizeReplacementEntry({ tool: '[thinking]\nThought' }, 'tool').snapshot, false);
});

test('copied execution-window tools retain expandable command/log cards without runtime feedback or actions', async () => {
    await withRenderer(async (host, render) => {
        await render({
            outer: { type: 'executionWindowTool', snapshot: true, frontend: '{{cardReplace id=call}}\n\n{{cardReplace id=second-call}}' },
            call: { type: 'toolCalling', frontend: `Saved tool\n${feedbackMarker}\n[ACTION NAME:Cancel original COMMAND:cancelBackgroundTool TOOL_ID:original]\n{{cardReplace id=command}}\n{{cardReplace id=log}}` },
            'second-call': { type: 'toolCalling', frontend: 'Second saved tool\n\n{{cardReplace id=second-log}}\n[DONE]' },
            command: { type: 'toolCommand', frontend: '[CODE:text]\nprint("saved command")' },
            log: { type: 'toolLog', frontend: '[TITLE:Saved output]\n[START:2026-10-25T00:00:00Z]\nSaved log body' },
            'second-log': { type: 'toolLog', frontend: '[TITLE:Second output]\nSecond log body\n[DONE]' },
        }, '{{cardReplace id=outer}}', { contextId: 'copied-tool-message' });
        assert.match(host.textContent, /Tool Calling.*历史快照/);
        assert.equal((host.textContent.match(/Tool Calling/g) || []).length, 2, 'routing host must not add a third tool header');
        assert.equal(host.querySelectorAll('[aria-label="Expand steps"]').length, 2, 'each historical call starts collapsed');
        assert.equal(host.querySelector('[data-card-block-id="command"]'), null);
        assert.equal(host.querySelector('[data-card-block-id="log"]'), null);
        await act(async () => host.querySelector('[aria-label="Expand steps"]').dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true })));
        assert.match(host.querySelector('[data-card-block-id="command"]').textContent, /saved command/);
        assert.match(host.querySelector('[data-card-block-id="log"]').textContent, /Saved log body/);
        assert.equal(host.querySelector('[data-card-block-id="second-log"]'), null, 'expanding one call must not expand another');
        assert.doesNotMatch(host.textContent, /FRONTEND_FEEDBACK|Cancel original|ACTION NAME/);
        assert.equal(host.querySelector('[aria-label="Tool log is running"]'), null);
        assert.equal(host.querySelector('[class*="animate-pulse"], [class*="animate-spin"], .card-tool-command-soft-breathe, .card-tool-log-running-breathe'), null);
        assert.deepEqual(snapshotCardEvents, []);
    });
});

test('copied statuses and interactive cards remain static even if their payload still has original runtime IDs', async () => {
    const types = ['executionStatus', 'escStatus', 'workflowTaskStatus', 'workspaceTransfer', 'widget', 'story', 'queuing'];
    await withRenderer(async (host, render) => {
        await render(Object.fromEntries(types.map((type) => [type, {
            type, snapshot: true, contextStatus: { status: 'compacted' },
            frontend: JSON.stringify({ executionId: 'original-run', statusId: 'original-status', taskId: 'original-task', streamId: 'original-stream', widgetId: 'original-widget', storyId: 42, title: `Saved ${type}`, action: 'Saved action', status: 'running' }),
        }])), types.map((type) => `{{cardReplace id=${type}}}`).join('\n\n'));
        assert.equal(host.querySelectorAll('[data-history-snapshot]').length, types.length);
        assert.match(host.textContent, /Saved executionStatus.*历史快照.*运行中（复制时）/);
        assert.match(host.textContent, /Saved action/);
        assert.equal(host.querySelector('[data-history-snapshot="executionStatus"]').dataset.historySnapshotLayout, 'inline');
        assert.equal(host.querySelector('button, a, input, iframe'), null);
        assert.doesNotMatch(host.textContent, /original-run|original-status|original-widget/);
        assert.deepEqual(snapshotCardEvents, []);
    });
});

test('saved thinking and sub-agent cards remain expandable without appearing to run', async () => {
    await withRenderer(async (host, render) => {
        await render({
            outer: { type: 'thinking', snapshot: true, frontend: 'Saved reasoning\n\n{{cardReplace id=agent}}' },
            agent: { type: 'agent', frontend: '[AGENT-META] {"modelName":"Saved model"}\nSaved sub-agent response' },
        }, '{{cardReplace id=outer}}', { contextId: 'copied-thinking-message' });
        assert.match(host.textContent, /Thinking.*历史快照/);
        await act(async () => host.querySelector('[aria-label="Expand steps"]').dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true })));
        assert.match(host.textContent, /Saved reasoning.*Sub-Agent.*历史快照/s);
        await act(async () => host.querySelector('[aria-label="Expand steps"]').dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true })));
        assert.match(host.textContent, /Saved sub-agent response/);
        assert.equal(host.querySelector('[class*="animate-pulse"], [class*="animate-spin"]'), null);
        assert.deepEqual(snapshotCardEvents, []);
    });
});

test('historical parents pass readonly mode to legacy nested execution cards and type-only tokens', async () => {
    await withRenderer(async (host, render) => {
        await render({
            outer: { type: 'markdown', snapshot: true, frontend: '{{cardReplace id=child}}\n\n{{cardReplace type=widget}}' },
            child: { type: 'executionStatus', frontend: JSON.stringify({ title: 'Legacy nested execution', executionId: 'original', statusId: 'status' }) },
        });
        assert.equal(host.querySelectorAll('[data-history-snapshot]').length, 1);
        assert.match(host.textContent, /Legacy nested execution/);
        assert.deepEqual(snapshotCardEvents, []);
    });
});

test('cleared continuation hosts and empty historical payloads do not render placeholder cards', async () => {
    await withRenderer(async (host, render) => {
        const values = ['', ' \n\t ', '{}', '  {}  ', 'null', '[]', '{"executionId":"old-run","inlineKind":"continuation"}'];
        await render(Object.fromEntries(values.map((frontend, index) => [`empty-${index}`, {
            type: 'executionStatus', snapshot: true, frontend,
        }])), values.map((_value, index) => `{{cardReplace id=empty-${index}}}`).join('\n\n'));
        assert.equal(host.querySelector('[data-history-snapshot]'), null);
        assert.equal(host.textContent.trim(), '');
        assert.deepEqual(snapshotCardEvents, []);
    });
});

test('historical HTML displays source without creating controls while live HTML keeps rendering', async () => {
    await withRenderer(async (host, render) => {
        const html = '<button onclick="window.originalConversationAction()">Original action</button>';
        await render({ outer: { type: 'html', snapshot: true, frontend: html } });
        assert.equal(host.querySelector('button'), null);
        assert.equal(host.textContent, html);
        assert.deepEqual(snapshotCardEvents, []);

        await render({ outer: { type: 'html', frontend: html } });
        assert.equal(host.querySelector('button')?.textContent, 'Original action');
        assert.equal(host.querySelector('button')?.getAttribute('onclick'), 'window.originalConversationAction()');
    });
});

test('historical execution rows do not join live status groups', () => {
    const entry = (snapshot) => ({ type: 'executionStatus', snapshot, frontend: JSON.stringify({ executionId: 'run', statusId: 'status', inlineState: 'completed', toolNames: ['query'] }) });
    const processor = unified().use(remarkParse).use(remarkCardReplace).use(remarkCollapseExecutionStatuses, {
        replacement: { first: entry(true), second: entry(true) },
    });
    const tree = processor.runSync(processor.parse('{{cardReplace id=first}}\n\n{{cardReplace id=second}}'));
    assert.equal(tree.children.length, 2);
    assert.equal(tree.children[0].data.hProperties.groupedIds, undefined);
});

test('manual and streaming speech cannot replay original feedback from historical cards or their descendants', () => {
    const replacement = {
        outer: { type: 'toolCalling', snapshot: true, frontend: `${feedbackMarker}\n{{cardReplace id=speech}}` },
        speech: { type: 'markdown', frontend: `[markdown tts]\n${feedbackMarker}\nSaved spoken answer.` },
    };
    const msg = { content: '{{cardReplace id=outer}}', extraInfo: { replace: replacement } };
    for (const segments of [getSpeakableSegments(msg, 'copied'), getStreamingSpeakableSegments(msg, 'copied', { final: true })]) {
        assert.match(segments.map((segment) => segment.text).join(' '), /Saved spoken answer/);
        assert.equal(segments.some((segment) => segment.feedbackToolIds?.length), false);
    }
    assert.doesNotMatch(resolveMarkdownCopyContent('{{cardReplace id=outer}}', replacement), /FRONTEND_FEEDBACK/);
});

test('live tool cards still register feedback outside historical mode', async () => {
    await withRenderer(async (_host, render) => {
        await render({ outer: { type: 'toolCalling', frontend: `Live tool\n${feedbackMarker}` } });
        assert.ok(snapshotCardEvents.some((event) => event.event === 'frontend.feedback.status'));
    });
});
