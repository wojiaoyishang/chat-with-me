import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act, useState} from 'react';
import {createRoot} from 'react-dom/client';

const translations = JSON.parse(fs.readFileSync('src/assets/locales/zh.json', 'utf8'));
const realComponents = new Set(['MessageItem.jsx', 'MessageActions.jsx', 'MessageTools.jsx', 'MessageSettingsMenu.jsx', 'MessageBadges.jsx']);
await build({
    entryPoints: ['src/features/chat/ui/message/components/MessageItem.jsx'],
    outfile: 'temp/message-settings-react-test.mjs',
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    plugins: [{name: 'message-settings-fixtures', setup(builder) {
        builder.onResolve({filter: /^react(?:-dom)?(?:\/|$)/}, ({path}) => ({path, external: true}));
        builder.onResolve({filter: /^(?:@\/|react-i18next$|sonner$)/}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onResolve({filter: /\.jsx$/}, ({path}) => {
            if (!realComponents.has(path.split(/[\\/]/).at(-1))) return {path, namespace: 'fixture'};
        });
        builder.onResolve({filter: /(?:messageActions|speechContent)\.js$/}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onResolve({filter: /AttachmentShowcase$/}, ({path}) => ({path, namespace: 'fixture'}));
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path}) => {
            let contents;
            if (path === '@/lib/apiClient.js') contents = 'export default {get:(...args)=>globalThis.__messageSettings.api.get(...args),patch:(...args)=>globalThis.__messageSettings.api.patch(...args)}';
            else if (path === '@/config.js') contents = 'export const apiEndpoint={CHAT_MESSAGES_ENDPOINT:"/chat/messages",CHAT_MESSAGE_CONFIG_ENDPOINT:"/chat/message-config"}';
            else if (path === '@/context/useEventStore.jsx') contents = 'export const emitEvent=envelope=>{globalThis.__messageSettings.events.push(envelope);globalThis.__messageSettings.apply?.(envelope);return{then:()=>Promise.resolve()}}';
            else if (path === 'react-i18next') contents = 'export const useTranslation=()=>({t:(key,args)=>globalThis.__messageSettings.t(key,args)})';
            else if (path === 'sonner') contents = 'export const toast={success:(...args)=>globalThis.__messageSettings.toasts.push(args),error:(...args)=>globalThis.__messageSettings.toasts.push(args)}';
            else if (path === '@/lib/tools.jsx') contents = 'export const useIsMobile=()=>Boolean(globalThis.__messageSettings.mobile)';
            else if (path === '@/lib/virtualUrl.js') contents = 'export const resolveResourceUrl=value=>value';
            else if (path === '@/context/userContext.jsx') contents = 'export const useUserStore=selector=>selector({user:{}})';
            else if (path === '@/components/modal/universalModal.js') contents = 'export const openRemoteUniversalModal=()=>{}';
            else if (path === '@/features/chat/attachmentVision.js') contents = 'export const normalizeAttachmentList=value=>Array.isArray(value)?value:[]';
            else if (path.endsWith('messageActions.js')) contents = 'export const handleMessageAction=()=>{}';
            else if (path.endsWith('speechContent.js')) contents = 'export const canSpeakMessage=()=>false';
            else if (path.endsWith('/tooltip')) contents = 'import{createContext,useContext,useState,cloneElement}from"react";import{createPortal}from"react-dom";const C=createContext({});export const Tooltip=({children,open,onOpenChange})=>{const[state,setState]=useState(false);return <C.Provider value={{open:open??state,setOpen:onOpenChange||setState}}>{children}</C.Provider>};export const TooltipTrigger=({children})=>{const c=useContext(C);return cloneElement(children,{onMouseEnter:event=>{children.props.onMouseEnter?.(event);c.setOpen(true)},onMouseLeave:event=>{children.props.onMouseLeave?.(event);c.setOpen(false)},onFocus:event=>{children.props.onFocus?.(event);c.setOpen(true)},onBlur:event=>{children.props.onBlur?.(event);c.setOpen(false)}})};export const TooltipContent=({children})=>useContext(C).open?createPortal(<div role="tooltip">{children}</div>,document.body):null';
            else if (path.endsWith('/popover')) contents = 'import{createContext,useContext,useState,cloneElement}from"react";import{createPortal}from"react-dom";const C=createContext({});export const Popover=({children,open,onOpenChange})=>{const[state,setState]=useState(false);return <C.Provider value={{open:open??state,setOpen:onOpenChange||setState}}>{children}</C.Provider>};export const PopoverTrigger=({children,asChild,...props})=>{const c=useContext(C);return cloneElement(children,{...props,onClick:event=>{children.props.onClick?.(event);props.onClick?.(event);if(!event.defaultPrevented)c.setOpen(!c.open)}})};export const PopoverContent=({children})=>useContext(C).open?createPortal(<section role="dialog" data-test-popover="true">{children}</section>,document.body):null';
            else if (path.endsWith('/avatar')) contents = 'export const Avatar=({children})=><span>{children}</span>;export const AvatarFallback=Avatar;export const AvatarImage=()=>null';
            else if (path.endsWith('/badge')) contents = 'import{cloneElement}from"react";export const Badge=({children,asChild,variant,className,...props})=>{if(!asChild)return <span data-slot="badge" className={className} {...props}>{children}</span>;const merged={...props,"data-slot":"badge",className:[className,children.props.className].filter(Boolean).join(" ")};for(const key of Object.keys(props)){if(/^on[A-Z]/.test(key)&&typeof props[key]==="function"&&typeof children.props[key]==="function")merged[key]=event=>{children.props[key](event);props[key](event)}}return cloneElement(children,merged)}';
            else if (path.endsWith('/dropdown-menu')) contents = 'import{createContext,useContext,cloneElement}from"react";import{createPortal}from"react-dom";const C=createContext({});export const DropdownMenu=({children,...props})=><C.Provider value={props}>{children}</C.Provider>;export const DropdownMenuTrigger=({children})=>{const c=useContext(C);return cloneElement(children,{onClick:event=>{children.props.onClick?.(event);if(!children.props.disabled)c.onOpenChange(!c.open)}})};export const DropdownMenuContent=({children,side,align,sideOffset,collisionPadding,...props})=>useContext(C).open?createPortal(<section role="menu" {...props}>{children}</section>,document.body):null;export const DropdownMenuItem=({children,onSelect,...props})=><button role="menuitem" {...props} onClick={event=>onSelect?.(event)}>{children}</button>;export const DropdownMenuLabel=({children})=><header>{children}</header>;export const DropdownMenuSeparator=()=>null';
            else if (path.endsWith('TextOnlyMessageContent.jsx')) contents = 'export default ({msg})=><p>{msg.content}</p>';
            else if (path.endsWith('LeftAvatarName.jsx')) contents = 'export default ({msg})=><span>{msg.name}</span>';
            else if (path.endsWith('TooltipInfo.jsx')) contents = 'export default ({tip})=>tip?<span data-test-message-info="true">消息详情</span>:null';
            else contents = 'export default ()=>null';
            return {loader: 'jsx', contents};
        });
    }}],
});

const definition = {key: 'compressible', type: 'boolean', label: '允许压缩', enableLabel: '允许压缩', disableLabel: '设置不可压缩', protectedLabel: '不可压缩', default: true, help: '由后端提供的保留策略说明'};
const catalog = {items: [definition]};
const protectedBadge = {id: 'context.protected', label: '不可压缩', icon: 'shield-check', tone: 'warning', order: 100};
const protectedSelector = '[data-message-badge="context.protected"]';
const serverConfig = (compressible, extra = {}) => ({compressible, canConfigure: true, revision: 1, badges: compressible ? [] : [protectedBadge], ...extra});
const baseMessage = (patch = {}) => ({position: 'right', name: '用户', content: '请始终遵循这条要求', messages: [], prevMessage: 'previous', nextMessage: null, ...patch});
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return {promise, resolve, reject}; };
let moduleId = 0;

async function setup(t, api = {}, initial = {}) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat/chat-one', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'requestAnimationFrame', 'cancelAnimationFrame'];
    const saved = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const fixture = {
        gets: [], patches: [], events: [], toasts: [], mobile: false,
        t: (key, args) => key.split('.').reduce((object, part) => object?.[part], translations) || args?.defaultValue || key,
        api: {
            get: async (...args) => { fixture.gets.push(args); return api.get ? api.get(...args) : catalog; },
            patch: async (...args) => { fixture.patches.push(args); return api.patch ? api.patch(...args) : {messageId: 'message-one', messageConfig: serverConfig(args[1].compressible), restoredArtifactIds: []}; },
        },
    };
    globalThis.__messageSettings = fixture;
    const {default: MessageItem} = await import(`../temp/message-settings-react-test.mjs?test=${++moduleId}`);
    const container = document.getElementById('root'), root = createRoot(container);
    function Harness({msgId = 'message-one', conversationId = 'chat-one', message = baseMessage(), additional = []}) {
        const [patches, setPatches] = useState({});
        fixture.apply = envelope => {
            if (envelope.conversationId !== conversationId) return;
            setPatches(previous => ({...previous, [envelope.payload.messageId]: envelope.payload.messageConfig}));
        };
        return [
            {msgId, message},
            ...additional,
        ].map(item => React.createElement(MessageItem, {
            key: item.msgId, msgId: item.msgId, conversationId,
            msg: patches[item.msgId] ? {...item.message, messageConfig: patches[item.msgId]} : item.message,
            messages: {[item.msgId]: item.message}, leavingMessages: new Set(), t: fixture.t,
        }));
    }
    let props = {message: baseMessage(initial)};
    const render = patch => act(async () => { props = {...props, ...patch}; root.render(React.createElement(Harness, props)); await new Promise(resolve => setTimeout(resolve, 10)); });
    const button = label => [...document.querySelectorAll('button')].find(item => item.textContent === label || item.getAttribute('aria-label') === label);
    const click = element => act(async () => { assert.ok(element, `button exists`); element.click(); await new Promise(resolve => setTimeout(resolve, 5)); });
    const open = async (id = 'message-one') => {
        const message = container.querySelector(`[data-message-id="${id}"]`);
        await act(async () => message.dispatchEvent(new dom.window.MouseEvent('mouseover', {bubbles: true, relatedTarget: document.body})));
        await click(message.querySelector('[aria-label="消息配置"]'));
    };
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        for (const [key, descriptor] of saved) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
        delete globalThis.__messageSettings;
        delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    });
    return {container, dom, fixture, render, button, click, open};
}

test('server catalog controls message menu and protecting a message immediately patches it locally', async t => {
    const ui = await setup(t);
    await ui.render();
    assert.equal(ui.fixture.gets.length, 0, 'the catalog is lazy and never fetched once per message');
    await ui.open();
    assert.equal(ui.fixture.gets[0][0], '/chat/message-config');
    await ui.click(ui.button('设置不可压缩'));
    assert.deepEqual(ui.fixture.patches[0], ['/chat/messages/message-one/config', {conversationId: 'chat-one', compressible: false}]);
    assert.equal(ui.fixture.events[0].event, 'message.updated');
    assert.equal(ui.fixture.events[0].conversationId, 'chat-one');
    assert.equal(ui.fixture.events[0].localOnly, true);
    const protectionIcon = ui.container.querySelector(protectedSelector);
    assert.equal(protectionIcon.textContent.trim(), '不可压缩', 'the badge shows the complete protection label');
    assert.equal(protectionIcon.tagName, 'SPAN', 'the label is a status badge rather than an action button');
    assert.ok(protectionIcon.closest('[data-message-action-area]'), 'protection belongs to the message toolbar');
    assert.match(ui.fixture.toasts[0][1].description, /下一轮请求生效/);
    await ui.open();
    assert.equal(ui.fixture.gets.length, 1);
    await ui.click(ui.button('允许压缩'));
    assert.equal(ui.fixture.patches[1][1].compressible, true);
    assert.equal(ui.container.querySelector(protectedSelector), null);
});

test('all messages share one concurrent catalog request and use labels from the backend', async t => {
    const pending = deferred();
    const ui = await setup(t, {get: () => pending.promise});
    await ui.render({additional: [{msgId: 'message-two', message: baseMessage()}]});
    await ui.open();
    await ui.open('message-two');
    assert.equal(ui.fixture.gets.length, 1);
    await act(async () => pending.resolve({items: [{...definition, disableLabel: '后端指定的保护选项'}]}));
    assert.ok(ui.button('后端指定的保护选项'));
    assert.equal(ui.button('设置不可压缩'), undefined);
});

test('save disables duplicate selections and reports restoration of already compacted context', async t => {
    const pending = deferred();
    const ui = await setup(t, {patch: () => pending.promise});
    await ui.render();
    await ui.open();
    const option = ui.button('设置不可压缩');
    await act(async () => { option.click(); option.click(); });
    assert.equal(ui.fixture.patches.length, 1);
    assert.equal(option.disabled, true);
    await act(async () => pending.resolve({messageId: 'message-one', messageConfig: serverConfig(false, {revision: 4}), restoredArtifactIds: ['summary-one'], messageStates: {}}));
    assert.match(ui.fixture.toasts[0][1].description, /已恢复.*摘要原文.*下一轮/);
});

test('failed catalog and save requests are recoverable without changing original message settings', async t => {
    let loads = 0, saves = 0;
    const ui = await setup(t, {
        get: async () => { if (++loads === 1) throw new Error('网络中断'); return catalog; },
        patch: async () => { if (++saves === 1) throw new Error('消息不存在或无权访问'); return {messageId: 'message-one', messageConfig: serverConfig(false), restoredArtifactIds: []}; },
    });
    await ui.render();
    await ui.open();
    assert.match(document.querySelector('[role="alert"]').textContent, /无法加载消息配置.*网络中断/);
    await ui.click(ui.button('重试'));
    assert.equal(loads, 2);
    await ui.click(ui.button('设置不可压缩'));
    assert.match(document.querySelector('[role="alert"]').textContent, /无权访问/);
    assert.equal(ui.container.querySelector(protectedSelector), null);
    assert.deepEqual(ui.fixture.events, []);
    await ui.click(ui.button('设置不可压缩'));
    assert.equal(saves, 2);
    assert.ok(ui.container.querySelector(protectedSelector));
});

test('the message action area remains visible while the settings menu is in its portal', async t => {
    const ui = await setup(t);
    await ui.render();
    await ui.open();
    const message = ui.container.querySelector('[data-message-id]');
    const portal = document.querySelector('[data-message-settings]');
    assert.equal(message.contains(portal), false, 'the menu really renders outside its message');
    await act(async () => message.dispatchEvent(new ui.dom.window.MouseEvent('mouseout', {bubbles: true, relatedTarget: portal})));
    const tools = message.querySelector('[class*="overscroll-x-contain"]');
    assert.match(tools.className, /pointer-events-auto/);
    assert.doesNotMatch(tools.className, /pointer-events-none/);
    await ui.click(ui.button('设置不可压缩'));
    assert.ok(message.querySelector(protectedSelector));
});

test('readonly and unconfigurable messages expose no menu, but protected readonly messages retain a static toolbar badge', async t => {
    const ui = await setup(t, {}, {readonly: true, messageConfig: serverConfig(false)});
    await ui.render();
    assert.equal(ui.button('消息配置'), undefined);
    const protectedIcon = ui.container.querySelector(protectedSelector);
    assert.ok(protectedIcon.closest('[data-message-action-area]'));
    assert.equal(protectedIcon.textContent.trim(), '不可压缩');
    assert.equal(protectedIcon.tagName, 'SPAN');
    assert.equal(ui.fixture.gets.length, 0);
    await ui.render({message: baseMessage({messageConfig: {compressible: true, canConfigure: false}})});
    assert.equal(ui.button('消息配置'), undefined);
    await ui.render({msgId: '<ROOT>', message: baseMessage()});
    assert.equal(ui.button('消息配置'), undefined);
});

test('protection is a static labelled badge that follows toolbar visibility without interaction hints', async t => {
    const ui = await setup(t, {}, {messageConfig: serverConfig(false)});
    await ui.render();
    const message = ui.container.querySelector('[data-message-id]');
    const icon = message.querySelector(protectedSelector);
    const toolbar = icon.closest('[class*="overscroll-x-contain"]');
    assert.ok(icon.closest('[data-message-action-area]'));
    assert.ok(icon.querySelector('svg'));
    assert.equal(icon.getAttribute('data-slot'), 'badge', 'the protection indicator uses the shared Badge component');
    assert.equal(icon.textContent.trim(), '不可压缩');
    assert.equal(icon.tagName, 'SPAN');
    assert.equal(icon.hasAttribute('title'), false, 'the status badge has no native tooltip');
    assert.equal(icon.getAttribute('role'), null);
    assert.match(toolbar.className, /opacity-0.*invisible.*pointer-events-none/, 'the icon hides together with the idle toolbar');
    await act(async () => message.dispatchEvent(new ui.dom.window.MouseEvent('mouseover', {bubbles: true, relatedTarget: document.body})));
    assert.match(toolbar.className, /opacity-100.*visible.*pointer-events-auto/);
    await act(async () => icon.dispatchEvent(new ui.dom.window.MouseEvent('mouseover', {bubbles: true, relatedTarget: document.body})));
    assert.equal(document.querySelector('[role="tooltip"], [data-test-popover]'), null, 'hovering the badge does not show a tooltip or popover');
    await act(async () => icon.dispatchEvent(new ui.dom.window.MouseEvent('mouseout', {bubbles: true, relatedTarget: message})));
    await ui.click(icon);
    assert.equal(document.querySelector('[data-test-popover], [role="tooltip"]'), null, 'clicking the badge does not open a description');
    assert.equal(icon.textContent.trim(), '不可压缩');
    await act(async () => message.dispatchEvent(new ui.dom.window.MouseEvent('mouseout', {bubbles: true, relatedTarget: document.body})));
    assert.match(toolbar.className, /opacity-0.*pointer-events-none/, 'leaving the message hides the badge with its toolbar');
    assert.deepEqual(ui.fixture.patches, [], 'the protection indicator is informational rather than an edit action');
});

test('late save responses after switching conversation or message do not update the new chat', async t => {
    const pending = deferred();
    const ui = await setup(t, {patch: () => pending.promise});
    await ui.render();
    await ui.open();
    await ui.click(ui.button('设置不可压缩'));
    await ui.render({conversationId: 'chat-two', msgId: 'message-two', message: baseMessage({content: '新的聊天'})});
    await act(async () => pending.resolve({messageId: 'message-one', messageConfig: serverConfig(false)}));
    assert.deepEqual(ui.fixture.events, []);
    assert.deepEqual(ui.fixture.toasts, []);
    assert.equal(ui.container.querySelector(protectedSelector), null);
    assert.match(ui.container.textContent, /新的聊天/);
});

test('message hints group details and badges before user/system buttons and after assistant buttons', async t => {
    const ui = await setup(t);
    for (const [role, position, before] of [
        ['user', 'left', true], ['system', 'left', true], ['assistant', 'right', false],
        [undefined, 'right', true], [undefined, 'mid', true], [undefined, 'left', false],
    ]) {
        await ui.render({message: baseMessage({role, position, tip: '后台提示信息', messageConfig: serverConfig(false)})});
        const hints = ui.container.querySelector('[data-message-hints]');
        const actions = ui.container.querySelector('[data-message-buttons]');
        assert.ok(hints.querySelector('[data-test-message-info]'), 'message details are grouped with backend badges');
        assert.ok(hints.querySelector(protectedSelector));
        assert.equal(hints.parentElement.firstElementChild === hints, before, `${role || position} hint placement`);
        assert.equal(hints.parentElement.firstElementChild === actions, !before);
    }
});

test('backend arrays define multiple badges and their full labels independently from compression state', async t => {
    const ui = await setup(t);
    const badges = [
        {id: 'custom.second', label: '第二个后端标记', icon: 'bookmark', tone: 'info', order: 20},
        {id: 'custom.first', label: '很长但需要完整显示的后端状态名称'.repeat(4), icon: 'check', tone: 'success', order: 10},
    ];
    await ui.render({message: baseMessage({readonly: true, messageConfig: serverConfig(true, {badges})})});
    const rendered = [...ui.container.querySelectorAll('[data-message-badge]')];
    assert.deepEqual(rendered.map(item => item.getAttribute('data-message-badge')), ['custom.first', 'custom.second']);
    assert.equal(rendered[0].textContent, badges[1].label, 'long badge labels are preserved in full');
    assert.match(rendered[0].querySelector('span').className, /whitespace-normal/);
    assert.match(ui.container.querySelector('[data-message-badges]').className, /flex-wrap/);
    assert.equal(ui.button('消息配置'), undefined, 'readonly badge visibility never enables editing');
    assert.equal(ui.fixture.gets.length, 0, 'badge rendering needs no per-message catalog request');
    await ui.render({message: baseMessage({readonly: true, messageConfig: serverConfig(false, {badges: []})})});
    assert.equal(ui.container.querySelector('[data-message-badge]'), null, 'an empty backend list clears badges even if compressible is false');
});

test('unknown badge icons and tones fall back safely and backend labels are plain text', async t => {
    const ui = await setup(t);
    const label = '<img src=x onerror="alert(1)">';
    await ui.render({message: baseMessage({messageConfig: serverConfig(true, {badges: [
        {id: 'new.server.badge', label, icon: '__proto__', tone: 'constructor'},
    ]})})});
    const badge = ui.container.querySelector('[data-message-badge="new.server.badge"]');
    assert.equal(badge.textContent, label);
    assert.equal(badge.querySelector('img'), null);
    assert.equal(badge.getAttribute('data-badge-icon'), 'info');
    assert.equal(badge.getAttribute('data-badge-tone'), 'neutral');
    assert.equal(ui.fixture.events.length, 0);
    assert.equal(ui.fixture.patches.length, 0);
});
