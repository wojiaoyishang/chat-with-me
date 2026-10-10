import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

test('live ESC status remains in the conversation and is absent from task details', async () => {
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
    const {default:Card} = await import('../temp/esc-surface-regression.mjs');
    const props = {type:'escStatus', content:JSON.stringify({streamId:'stream', documentId:'doc', status:'writing'})};
    const body = renderToStaticMarkup(React.createElement(Card, {...props, renderSurface:'conversation'}));
    assert.ok(body.includes('正在撰写文档'));
    assert.ok(body.includes('esc-writing-spinner'));
    assert.equal(renderToStaticMarkup(React.createElement(Card, {...props, renderSurface:'task_window'})), '');
});
