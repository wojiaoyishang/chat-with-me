import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost', pretendToBeVisual: true });
for (const key of ['window', 'document', 'navigator', 'Element', 'HTMLElement', 'Node', 'getComputedStyle'])
    Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = clearTimeout;
HTMLElement.prototype.scrollTo = () => {};
globalThis.storedReplyEvents = [];
globalThis.storedReplyCopies = [];

const inertLiveCard = 'export default function LiveCard() { throw new Error("Stored replies cannot mount live controls"); }';
const mocks = new Map([
    ['react-i18next', 'export const useTranslation = () => ({t:(key,fallback)=>typeof fallback==="string"?fallback:key});'],
    ['tools.jsx', 'export const useLocalSetting=(_key,value)=>[value];export const copyTextToClipboard=async(text)=>{globalThis.storedReplyCopies.push(text)};export const CHAT_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="chat";export const EXECUTION_WINDOW_TOOL_CALL_AUTO_COLLAPSE_SETTING_KEY="execution";'],
    ['documentCardSpec.js', `export const useDocumentCardSpec=()=>({spec:{iconSymbols:{},directives:[{name:'study-card',kind:'card',defaultAttributes:{title:'重点',tone:'info',icon:'book'},allowedAttributes:{title:{type:'text',maxLength:120},tone:{type:'enum',values:['info']},icon:{type:'enum',values:['book']}}}]},loading:false,error:null});`],
    ['useEventStore.jsx', 'export const emitEvent=async(event)=>{globalThis.storedReplyEvents.push(event);return {success:true}};export const onEvent=(event)=>{globalThis.storedReplyEvents.push(event);return {then:()=>()=>{}};};'],
    ['ReplacementContextBadge.jsx', inertLiveCard], ['IgnoredContextIndicator.jsx', inertLiveCard],
    ['CompactedContextIndicator.jsx', inertLiveCard], ['EscWritingStatus.jsx', inertLiveCard],
    ['WorkflowTaskStatus.jsx', inertLiveCard], ['WorkspaceTransferCard.jsx', inertLiveCard],
    ['StoryCard.jsx', inertLiveCard], ['WidgetHost.jsx', inertLiveCard], ['ExecutionStatusGroup.jsx', inertLiveCard],
    ['@/features/execution', inertLiveCard.replace('export default function LiveCard', 'export function ExecutionStatus')],
    ['universalModal.js', 'export const isUniversalModalLink=(url)=>String(url).startsWith("cwm://modal/");export const openUniversalModalLink=()=>{globalThis.storedReplyEvents.push("modal")};'],
    ['useImageViewer.js', 'export const openImageViewer=()=>{};export const imageSlides=()=>[];'],
    ['ImageGallery.jsx', 'export default ()=>null;'],
    ['AttachmentShowcase.jsx', `import React from 'react';export default ({attachmentsMeta,msgMode})=>{globalThis.storedReplyAttachments=attachmentsMeta;return <div data-attachment-readonly={msgMode}>{attachmentsMeta.map((item,index)=><img key={index} alt={item.name} src={item.preview}/>)}</div>}`],
]);
const output = `temp/settings-conversation-message-${process.pid}.mjs`;
await build({ stdin: { contents: "export {default} from './src/features/settings-runtime/SettingsConversationMessage.jsx';", resolveDir: process.cwd() },
    outfile: output, bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    alias: { '@': path.resolve('src') }, loader: { '.css': 'empty', '.woff': 'empty', '.woff2': 'empty', '.ttf': 'empty' },
    plugins: [{name:'stored-reply-ui',setup(builder){
        builder.onResolve({filter:/^react(?:\/|$)/},({path:name})=>({path:name,external:true}));
        builder.onResolve({filter:/\.css$/},()=>({path:'style',namespace:'stored-style'}));
        builder.onLoad({filter:/.*/,namespace:'stored-style'},()=>({contents:'',loader:'js'}));
        builder.onResolve({filter:/.*/},({path:name})=>{const key=[...mocks.keys()].find((candidate)=>name===candidate||name.endsWith('/'+candidate));return key?{path:key,namespace:'stored-mock'}:undefined;});
        builder.onLoad({filter:/.*/,namespace:'stored-mock'},({path:name})=>({contents:mocks.get(name),loader:'jsx'}));
    }}] });
const { default: ConversationMessage } = await import(pathToFileURL(path.resolve(output)).href);

async function mount(value, run) {
    storedReplyEvents.length = 0; storedReplyCopies.length = 0;
    const host = document.createElement('div'); document.body.append(host);
    const root = createRoot(host);
    const render = async (next = value) => act(async () => root.render(React.createElement(ConversationMessage,
        {item:{name:'result',text:'结果'},value:next,context:{runtimeContext:{conversationId:'main-chat'}}})));
    try { await render(); await run(host, render); }
    finally { await act(async () => root.unmount()); host.remove(); }
}

test('stored reply renders chat Markdown, code copying, study cards and media without replacing a playing video on metadata refresh', async () => {
    const value = {messageId:'record-a',content:'# 观察\n\n**重点**\n\n```text\nprint("record")\n```\n\n:::study-card{title="回顾"}\n继续练习\n:::\n\n![示意](https://example.invalid/image.png)\n\n![视频](https://example.invalid/video.mp4){type=video}\n\n- [ ] 只读任务'};
    await mount(value, async (host, render) => {
        assert.equal(host.querySelector('h1').textContent,'观察');
        assert.equal(host.querySelector('strong').textContent,'重点');
        assert.match(host.querySelector('[data-card-kind]').textContent,/回顾.*继续练习/s);
        assert.equal(host.querySelector('img[alt="示意"]').getAttribute('src'),'https://example.invalid/image.png');
        assert.equal(host.querySelector('input[type="checkbox"]').disabled,true);
        await act(async () => host.querySelector('.copy-button').click());
        assert.deepEqual(storedReplyCopies,['print("record")']);
        const video=host.querySelector('video'); video.currentTime=9;
        await render({...value,updatedAt:'later'});
        assert.equal(host.querySelector('video'),video);
        assert.equal(video.currentTime,9);
        assert.deepEqual(storedReplyEvents,[]);
    });
});

test('stored tool cards expand and copy their output without executing feedback, runtime actions, HTML or widgets', async () => {
    await mount({messageId:'record-b',content:'{{cardReplace id=outer}}\n\n{{cardReplace id=html}}\n\n{{cardReplace id=widget}}\n\n[配置](cwm://modal/untrusted)',extraInfo:{replace:{
        outer:{type:'executionWindowTool',frontend:'{{cardReplace id=call}}'},
        call:{type:'toolCalling',frontend:'Saved tool\n[ACTION NAME:Cancel original COMMAND:cancelBackgroundTool TOOL_ID:original]\n{{cardReplace id=command}}\n{{cardReplace id=log}}\n[DONE]'},
        command:{type:'toolCommand',frontend:'[CODE:text]\nls -la'},
        log:{type:'toolLog',frontend:'[TITLE:目录结果]\nfile.txt\n[DONE]'},
        html:{type:'html',frontend:'<img src=x onerror="window.executed=true"><script>window.executed=true</script>'},
        widget:{type:'widget',frontend:JSON.stringify({title:'Saved widget',widgetId:'active-id',script:'window.executed=true'})},
    }}},async(host)=>{
        await act(async()=>host.querySelector('[aria-label="Expand steps"]').dispatchEvent(new window.MouseEvent('pointerdown',{bubbles:true})));
        assert.match(host.querySelector('[data-card-block-id="command"]').textContent,/ls -la/);
        assert.match(host.querySelector('[data-card-block-id="log"]').textContent,/file.txt/);
        await act(async()=>host.querySelector('[data-card-block-id="command"] [aria-label="复制调用内容"]').click());
        assert.deepEqual(storedReplyCopies,['ls -la']);
        assert.equal(host.querySelector('script,img[onerror],iframe,a[href^="cwm://modal"]'),null);
        assert.equal(window.executed,undefined);
        assert.doesNotMatch(host.textContent,/Cancel original|ACTION NAME/);
        assert.deepEqual(storedReplyEvents,[]);
    });
});

test('attachment previews use the ordinary readonly showcase while inline SVG and unsafe download URLs stay inert',async()=>{
    await mount({content:'附件',attachments:[{name:'图形',size:20,fileType:'image',previewType:'svg',preview:'<svg onload="window.executed=true"></svg>',downloadUrl:'javascript:window.executed=true'}]},async(host)=>{
        assert.equal(host.querySelector('[data-attachment-readonly]').getAttribute('data-attachment-readonly'),'true');
        assert.equal(storedReplyAttachments[0].previewType,'image');
        assert.match(storedReplyAttachments[0].preview,/^data:image\/svg\+xml;charset=utf-8,/);
        assert.equal(storedReplyAttachments[0].downloadUrl,'');
        assert.equal(host.querySelector('svg[onload]'),null);
        assert.equal(window.executed,undefined);
        assert.deepEqual(storedReplyEvents,[]);
    });
});
