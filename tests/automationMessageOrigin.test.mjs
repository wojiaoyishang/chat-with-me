import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {messageAutomationOrigin, messageOriginSummary} from '../src/components/message/messageOriginModel.js';
import {mergeLiveMessageWithSnapshot} from '../src/features/chat/page/utils/liveMessageReconcile.js';

const origin = {
    kind: 'automation', label: '自动触发', direction: 'inbound', messageId: 'botmsg_12345678-1234-4567-8901-123456789abc',
    source: {platform: 'QQ', type: '群组', name: '产品讨论组', remark: '每周讨论产品设计。'},
    sender: {name: '小明', remark: '项目负责人'},
    context_token: 'private-token', sessionWebhook: 'https://private.invalid/callback', externalId: 'provider-message-id',
};
const metadata = () => ({messageOrigin: structuredClone(origin), automation: {dispatchId: 'dispatch', messageRole: 'user', origin: structuredClone(origin)}});

test('explicit source marks generic automation and remains independent of role or source details', () => {
    for (const role of ['user', 'system', 'assistant']) {
        const value = messageAutomationOrigin({role, messageSource: 'automation', content: '定时提醒'});
        assert.equal(value.kind, 'automation');
        assert.equal(value.label, '自动触发');
        assert.equal(value.platform, '');
    }
    assert.equal(messageAutomationOrigin({messageSource: 'model', extraInfo: metadata()}), null);
    assert.equal(messageAutomationOrigin({messageSource: 'manual', extraInfo: metadata()}), null);
});

test('persisted source survives snapshot reconciliation and incremental metadata', () => {
    const live = {id: 'message', content: '提醒内容', messageSource: 'automation', extraInfo: metadata()};
    const snapshot = JSON.parse(JSON.stringify(live));
    const partial = mergeLiveMessageWithSnapshot({id: 'message', readonly: true, extraInfo: {indicators: []}}, snapshot);
    assert.equal(partial.messageSource, 'automation');
    assert.equal(messageAutomationOrigin(partial).name, '产品讨论组');
    const restored = mergeLiveMessageWithSnapshot(snapshot, {id: 'message', content: '提醒'});
    assert.equal(restored.messageSource, 'automation');
    assert.equal(messageAutomationOrigin(restored).messageId, origin.messageId);
});

test('backend inbound identity is independent of the chosen model role and survives persisted JSON', () => {
    for (const role of ['user', 'system', 'assistant']) {
        const projected = messageAutomationOrigin(JSON.parse(JSON.stringify({role, extraInfo: metadata()})));
        assert.equal(projected.name, '产品讨论组');
        assert.equal(projected.remark, '每周讨论产品设计。');
        assert.equal(projected.messageId, origin.messageId);
        assert.equal(messageOriginSummary(projected), 'QQ · 群组：产品讨论组 · 发送者：小明');
    }
});

test('assistant result placeholders and ordinary hand-written messages are never labelled as inbound', () => {
    assert.equal(messageAutomationOrigin({role: 'assistant', extraInfo: {
        automation: {dispatchId: 'dispatch', messageRole: 'user', origin: {...origin, direction: 'outbound'}},
    }}), null);
    assert.equal(messageAutomationOrigin({role: 'assistant', extraInfo: {
        messageOrigin: {...origin, direction: 'outbound'}, automation: metadata().automation,
    }}), null);
    assert.equal(messageAutomationOrigin({role: 'user', content: '自动触发 · QQ · 产品讨论组'}), null);
    assert.equal(messageAutomationOrigin({role: 'user', extraInfo: {messageOrigin: {kind: 'widget', direction: 'inbound'}}}), null);
});

test('historic assistant metadata is not confused with historic automatic user input', () => {
    const extraInfo = {automation: {dispatchId: 'dispatch', messageRole: 'user', origin: {
        platform: 'future-platform', platformLabel: '未来通讯', contactName: '设计同事',
        contactId: 'internal-contact', senderId: 'provider-sender',
    }}};
    assert.equal(messageOriginSummary(messageAutomationOrigin({position: 'right', extraInfo})), '未来通讯 · 联系人：设计同事');
    assert.equal(messageAutomationOrigin({position: 'left', extraInfo}), null);
    assert.equal(messageOriginSummary({platformLabel: '未来通讯', contactId: 'secret-provider-id'}), '未来通讯');
});

test('an explicitly cleared remark is not resurrected from older public labels', () => {
    const projected = messageAutomationOrigin({role: 'user', extraInfo: {messageOrigin: {
        ...origin, remark: '旧备注', source: {...origin.source, remark: ''}, messageId: `  ${origin.messageId}  `,
    }}});
    assert.equal(projected.remark, '');
    assert.equal(projected.messageId, origin.messageId);
});

await build({
    stdin: {contents: `export {default as Origin} from './src/components/message/MessageOrigin.jsx';
        export {default as Item} from './src/features/chat/ui/message/components/MessageItem.jsx';
        export {default as TextBody} from './src/features/chat/ui/message/components/TextOnlyMessageContent.jsx';
        export {default as Actions} from './src/features/chat/ui/message/components/MessageActions.jsx';`, resolveDir: process.cwd()},
    bundle: true, packages: 'external', jsx: 'automatic', format: 'esm', platform: 'node',
    outfile: 'temp/automation-message-origin-test.mjs',
    plugins: [{name: 'isolate-message-presentation', setup(builder) {
        builder.onResolve({filter: /^@\/components\/message\//}, ({path: source}) => ({path: path.resolve('src', source.slice(2))}));
        builder.onResolve({filter: /^@\/|AttachmentShowcase$|^\.\/[^/]+\.jsx$|useExecutionStore\.js$/},
            ({path: source}) => ({path: source, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: source}) => {
            const contents = source.endsWith('tools.jsx') ? 'export const useIsMobile = () => false;'
                : source.endsWith('virtualUrl.js') ? 'export const resolveResourceUrl = (value) => value;'
                : source.endsWith('attachmentVision.js') ? 'export const normalizeAttachmentList = (value) => Array.isArray(value) ? value : [];'
                : source.endsWith('useExecutionStore.js') ? 'export const useExecutionStore = (selector) => selector({}); export const isMessageExecutionActive = () => false;'
                : source.endsWith('/avatar') ? `export const Avatar=({children})=><span data-user-avatar>{children}</span>;
                    export const AvatarImage=()=>null; export const AvatarFallback=({children})=><span>{children}</span>;`
                : source.endsWith('TextOnlyMessageContent.jsx') ? `export default function Body({msg}) {
                    return <div data-preserved-content>{msg.content}{msg.video && <video src="/existing-video.mp4"/>}</div>;
                }`
                : 'export default () => null;';
            return {loader: 'jsx', contents, resolveDir: process.cwd()};
        });
    }}],
});
const {Origin, Item, TextBody, Actions} = await import('../temp/automation-message-origin-test.mjs');

async function mount(t, Component, props) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat', pretendToBeVisual: true});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
    globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
    const root = createRoot(document.getElementById('root'));
    const render = (next) => act(async () => root.render(React.createElement(Component, next)));
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        delete globalThis.window; delete globalThis.document; delete globalThis.HTMLElement;
        delete globalThis.requestAnimationFrame; delete globalThis.cancelAnimationFrame;
    });
    await render(props);
    return {render};
}

test('source details are opt-in public fields and display remarks as inert text', async (t) => {
    await mount(t, Origin, {origin: {...origin, source: {...origin.source, remark: '<img src=x onerror=alert(1)>'}}});
    const details = document.querySelector('[data-message-origin]');
    assert.equal(details.open, false);
    assert.match(details.querySelector('summary').textContent, /自动触发.*QQ.*产品讨论组.*小明/);
    assert.doesNotMatch(document.body.innerHTML, /private-token|private.invalid|provider-message-id/);
    assert.equal(document.querySelector('img'), null);
    assert.match(details.querySelector('dl').textContent, /<img src=x onerror=alert\(1\)>/);
    await act(async () => details.querySelector('summary').click());
    assert.equal(details.open, true);
    assert.match(details.textContent, /项目负责人/);
    assert.match(details.textContent, /botmsg_/);
});

test('ordinary automatic message renders provenance without replacing its existing content or media', async (t) => {
    const message = {role: 'user', position: 'right', content: '你好？', video: true, extraInfo: metadata()};
    const props = (msg) => ({msgId: 'message', msg, messages: {message: msg}, conversationId: 'chat', leavingMessages: new Set(), t: (key) => key});
    const ui = await mount(t, Item, props(message));
    assert.ok(document.querySelector('[data-automatic-input="true"]'));
    assert.match(document.querySelector('[data-message-origin]').textContent, /自动触发.*QQ.*产品讨论组/);
    const video = document.querySelector('video');
    const body = document.querySelector('[data-preserved-content]');
    const details = document.querySelector('[data-message-origin]');
    await act(async () => details.querySelector('summary').click());
    assert.match(details.querySelector('dl').textContent, /发言人备注项目负责人/,
        'the normalized input passes through MessageItem without losing its sender remark');
    await ui.render(props({...message, readonly: true, extraInfo: JSON.parse(JSON.stringify(message.extraInfo))}));
    assert.equal(document.querySelector('video'), video);
    assert.equal(document.querySelector('[data-preserved-content]'), body);
    assert.equal(document.querySelector('[data-message-origin]'), details);
    assert.equal(details.open, true, 'a normal message update preserves the reader’s expanded source details');
    await ui.render(props({...message, role: 'assistant', position: 'left', extraInfo: {
        automation: {...message.extraInfo.automation, origin: {...origin, direction: 'outbound'}},
    }}));
    assert.equal(document.querySelector('[data-message-origin]'), null);
    assert.equal(document.querySelector('[data-automatic-input]'), null);
});

test('new source field renders a distinct full-width automation panel for text and attachment variants', async (t) => {
    const props = (msg) => ({msgId: 'message', msg, messages: {message: msg}, conversationId: 'chat', leavingMessages: new Set(), t: (key) => key});
    const base = {role: 'user', position: 'right', messageSource: 'automation', content: '定时提醒', name: '用户'};
    const ui = await mount(t, Item, props(base));
    const panel = document.querySelector('[data-automatic-input="true"]');
    assert.ok(panel.classList.contains('border-slate-200'));
    assert.ok(panel.classList.contains('bg-slate-50/80'));
    assert.match(document.querySelector('[data-message-origin]').textContent, /自动触发/);
    assert.equal(document.querySelector('[data-user-avatar]'), null);
    await ui.render(props({...base, content: '', attachments: [{id: 'file-one'}]}));
    assert.ok(document.querySelector('[data-automatic-input="true"]'));
    assert.equal(document.querySelector('[data-user-avatar]'), null);
    await ui.render(props({...base, attachments: [{id: 'file-one'}]}));
    assert.ok(document.querySelector('[data-automatic-input="true"]'));
    assert.equal(document.querySelector('[data-user-avatar]'), null);
    await ui.render(props({...base, role: 'assistant', position: 'left'}));
    assert.ok(document.querySelector('[data-automatic-input="true"]'));
    await ui.render(props({...base, messageSource: 'manual'}));
    assert.equal(document.querySelector('[data-automatic-input]'), null);
    assert.equal(document.querySelector('[data-message-origin]'), null);
});

test('automatic text content uses its existing body without a user avatar or nested user bubble', async (t) => {
    const msg = {role: 'user', position: 'right', content: '来源：QQ\n\n你好？', name: '用户'};
    const ui = await mount(t, TextBody, {msg, msgId: 'message', automatic: true});
    const body = document.querySelector('[data-tts-message-id="message"]');
    assert.equal(document.querySelector('[data-user-avatar]'), null);
    assert.equal(body.classList.contains('shadow-sm'), false);
    assert.equal(body.textContent, msg.content);
    await ui.render({msg: {...msg, readonly: true}, msgId: 'message', automatic: true});
    assert.equal(document.querySelector('[data-tts-message-id="message"]'), body);
    await ui.render({msg, msgId: 'message', automatic: false});
    assert.ok(document.querySelector('[data-user-avatar]'));
    assert.ok(body.classList.contains('shadow-sm'));
});

test('late source metadata changes styling without remounting existing media', async (t) => {
    const message = {role: 'user', position: 'right', content: '收到的视频', video: true};
    const props = (msg) => ({msgId: 'message', msg, messages: {message: msg}, conversationId: 'chat', leavingMessages: new Set(), t: (key) => key});
    const ui = await mount(t, Item, props(message));
    const video = document.querySelector('video');
    const body = document.querySelector('[data-preserved-content]');
    await ui.render(props({...message, messageSource: 'automation', extraInfo: metadata()}));
    assert.equal(document.querySelector('video'), video);
    assert.equal(document.querySelector('[data-preserved-content]'), body);
    assert.ok(document.querySelector('[data-message-source="automation"]'));
});

test('automatic toolbar layout preserves hover and readonly summary permissions', async (t) => {
    const msg = {position: 'right', role: 'user', contextState: {compactions: [{id: 'summary'}]}};
    const props = {msg, msgId: 'message', messages: {}, automatic: true, isActionActive: false};
    const ui = await mount(t, Actions, props);
    const area = document.querySelector('[data-message-action-area]');
    assert.ok(area.classList.contains('justify-start'));
    assert.equal(area.classList.contains('pr-12'), false);
    assert.ok(area.querySelector('.invisible'), 'automatic inputs still reveal user tools only on interaction');
    await ui.render({...props, readonly: true});
    assert.ok(area.querySelector('.invisible'), 'readonly automatic inputs retain their existing context summary controls');
    await ui.render({...props, automatic: false});
    assert.ok(area.classList.contains('pr-12'), 'ordinary user toolbar alignment remains unchanged');
});
