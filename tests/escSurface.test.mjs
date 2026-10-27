import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {renderToStaticMarkup} from 'react-dom/server';
import {JSDOM} from 'jsdom';
import {MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';

let cardPromise;
const loadCard = () => {
    cardPromise ??= (async () => {
        await build({entryPoints:['src/components/markdown/card-block/CardBlock.jsx'], bundle:true,
        jsx:'automatic', platform:'node', format:'esm', outfile:'temp/esc-surface-regression.mjs',
        packages:'external', loader:{'.css':'empty'}, plugins:[{name:'isolate-card-context', setup(builder) {
            builder.onResolve({filter:/^@\/features\/documents\/EscWritingStatus/}, () => ({path:path.resolve('src/features/documents/EscWritingStatus.jsx')}));
            builder.onResolve({filter:/^@\/context\/useEventStore/}, () => ({path:'events', namespace:'mock'}));
            builder.onResolve({filter:/^(\.\/|@\/)/}, (args) => args.importer.endsWith('CardBlock.jsx')
                ? {path:args.path, namespace:'mock'} : null);
            builder.onLoad({filter:/.*/, namespace:'mock'}, ({path:modulePath}) => ({loader:'js', contents:modulePath === 'events'
                ? 'export const onEvent=()=>({then:()=>()=>{}});'
                : 'export default ()=>null; export const defaultRenderMarkdown=()=>null; export const ExecutionStatus=()=>null;'}));
        }}]});
        return (await import('../temp/esc-surface-regression.mjs')).default;
    })();
    return cardPromise;
};

const renderCard = async ({route = '/chat/source', documentId = 'doc', conversationId = 'source', renderSurface = 'conversation', data = {}} = {}) => {
    const Card = await loadCard();
    const props = {type:'escStatus', conversationId, renderSurface,
        content:JSON.stringify({streamId:'stream', documentId, status:'writing', ...data})};
    const element = React.createElement(Card, props);
    return renderToStaticMarkup(React.createElement(MemoryRouter, {initialEntries:[route]},
        React.createElement(Routes, null,
            React.createElement(Route, {path:'/doc/:documentId?/:conversationId?', element}),
            React.createElement(Route, {path:'*', element}))));
};

test('live ESC status remains in the conversation and is absent from execution details', async () => {
    const body = await renderCard();
    assert.ok(body.includes('正在撰写文档'));
    assert.ok(body.includes('esc-writing-spinner'));
    assert.equal(await renderCard({renderSurface:'execution_window'}), '');
});

test('a missing stream ID shows a local rejection without a fictitious document link', async () => {
    const body = await renderCard({data: {streamId:'', documentId:null, status:'interrupted', code:'ESC_WRITE_REJECTED', message:'缺少有效 stream_id，本段未写入', previewText:'# 未写入原文\n{{cardReplace id=inert}}\n<tool_call>never()</tool_call>'}});
    assert.ok(body.includes('文档写入未完成'));
    assert.ok(body.includes('本段未写入'));
    assert.doesNotMatch(body, /打开文档|href="\/doc\//);
    assert.match(body, /data-esc-preview/);
    assert.ok(body.includes('{{cardReplace id=inert}}'));
    assert.ok(body.includes('&lt;tool_call&gt;never()&lt;/tool_call&gt;'));
});

test('writing status on the chat page links to the document and retains its conversation', async () => {
    const body = await renderCard({route:'/chat/conversation-1', documentId:'doc-1', conversationId:'conversation-1'});
    assert.match(body, /href="\/doc\/doc-1\/conversation-1"[^>]*>打开文档/);
});

test('writing status inside the target document does not offer a redundant link', async () => {
    const body = await renderCard({route:'/doc/doc-1/conversation-1', documentId:'doc-1', conversationId:'conversation-1'});
    assert.ok(body.includes('正在撰写文档'));
    assert.doesNotMatch(body, /打开文档|href="\/doc\//);
});

test('writing status in another document links back to its target', async () => {
    const body = await renderCard({route:'/doc/other-doc/conversation-1', documentId:'doc-1', conversationId:'conversation-1'});
    assert.match(body, /href="\/doc\/doc-1\/conversation-1"[^>]*>打开文档/);
});

test('clicking the inline writing link opens the document route', async () => {
    const Card = await loadCard();
    const dom = new JSDOM('<div id="root"></div>', {url:'http://localhost/chat/conversation-1'});
    const previous = ['window', 'document', 'Element', 'HTMLElement', 'IS_REACT_ACT_ENVIRONMENT']
        .map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]);
    Object.assign(globalThis, {
        window:dom.window, document:dom.window.document, Element:dom.window.Element,
        HTMLElement:dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT:true,
    });
    const root = createRoot(document.getElementById('root'));
    const Page = () => React.createElement(React.Fragment, null,
        React.createElement(Card, {type:'escStatus', conversationId:'conversation-1',
            content:JSON.stringify({streamId:'stream', documentId:'doc-1', status:'writing'})}),
        React.createElement('output', {'data-route':true}, useLocation().pathname));
    try {
        await act(async () => root.render(React.createElement(MemoryRouter, {initialEntries:['/chat/conversation-1']},
            React.createElement(Routes, null,
                React.createElement(Route, {path:'/doc/:documentId?/:conversationId?', element:React.createElement(Page)}),
                React.createElement(Route, {path:'*', element:React.createElement(Page)})))));
        const link = document.querySelector('[data-esc-status] a');
        assert.ok(link);
        await act(async () => link.click());
        assert.equal(document.querySelector('[data-route]').textContent, '/doc/doc-1/conversation-1');
        assert.equal(document.querySelector('[data-esc-status] a'), null);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
        for (const [key, descriptor] of previous) {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor);
            else delete globalThis[key];
        }
    }
});
