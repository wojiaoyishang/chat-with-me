import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('Inspector marks media types and renders viewable attachments without embedding image bytes', async()=>{
    await build({stdin:{contents:`export {default as Badges} from './src/features/chat/page/components/InspectorMediaBadges.jsx';
        export {default as Attachments} from './src/features/chat/page/components/InspectorAttachments.jsx';`,resolveDir:process.cwd()},
        bundle:true,packages:'external',jsx:'automatic',format:'esm',platform:'node',outfile:'temp/inspector-media-test.mjs',
        plugins:[{name:'alias',setup(builder){
            builder.onResolve({filter:/^@\//},({path:modulePath})=>({path:path.resolve('src',modulePath.slice(2))}));
            builder.onResolve({filter:/^react-i18next$/},()=>({path:'i18n',namespace:'mock'}));
            builder.onLoad({filter:/.*/,namespace:'mock'},()=>({loader:'js',contents:'export const useTranslation=()=>({t:(key)=>key});'}));
        }}]});
    const {Badges,Attachments}=await import('../temp/inspector-media-test.mjs');
    const html=renderToStaticMarkup(React.createElement(Badges,{media:{text:2,image:1,audio:1,video:1,file:0}}));
    for(const label of ['文字 2','图片 1','音频 1','视频 1']) assert.ok(html.includes(`aria-label="${label}"`));
    assert.ok(!html.includes('文件 0'));
    const detail=renderToStaticMarkup(React.createElement(Attachments,{attachments:[
        {type:'image',uri:'cwm://artifact/screenshot',size:4096},
        {type:'audio',uri:'cwm://artifact/audio'}, {type:'video',uri:'cwm://artifact/video'}]}));
    assert.ok(detail.includes('/api/upload/screenshot'));
    assert.ok(detail.includes('data-image-viewer'));
    assert.ok(detail.includes('<audio controls'));
    assert.ok(detail.includes('<video controls'));
});
