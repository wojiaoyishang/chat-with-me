import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Worker} from 'node:worker_threads';
import path from 'node:path';
import {createMarkdownWorkerQueue} from '../src/components/markdown/markdownWorkerQueue.js';

await mkdir('temp',{recursive:true});
await build({entryPoints:['src/components/markdown/markdownParser.js'],outfile:'temp/markdown-syntax-pipeline-test.mjs',
    bundle:true,platform:'node',format:'esm',packages:'external',alias:{'@':path.resolve('src')}});
const {parseMarkdownSyntax}=await import('../temp/markdown-syntax-pipeline-test.mjs');

test('busy parser coalesces queued snapshots and releases its last Worker', () => {
    const posted=[],complete=[];let worker,terminated=0;
    const queue=createMarkdownWorkerQueue(()=>worker={postMessage:message=>posted.push(message),terminate:()=>terminated++});
    const owner=queue.acquire();
    for(let i=0;i<100;i++)owner.submit({content:String(i)},(tree,input)=>complete.push(input.content),()=>assert.fail('unexpected failure'));
    assert.equal(posted.length,1);
    worker.onmessage({data:{id:posted[0].id,tree:{type:'root',children:[]}}});
    assert.equal(posted.length,2);assert.equal(posted[1].content,'99');
    worker.onmessage({data:{id:posted[1].id,tree:{type:'root',children:[]}}});
    assert.deepEqual(complete,['0','99']);owner.release();assert.equal(terminated,1);
});

test('retired owners never receive a result and Worker failures explicitly request fallback', () => {
    let worker,failures=0,completed=0;
    const queue=createMarkdownWorkerQueue(()=>worker={postMessage:()=>{},terminate:()=>{}});
    const old=queue.acquire(),active=queue.acquire();
    old.submit({content:'old'},()=>completed++,()=>failures++);
    active.submit({content:'new'},()=>completed++,()=>failures++);
    old.release();worker.onmessage({data:{id:1,tree:{}}});
    assert.equal(completed,0);worker.onerror();assert.equal(failures,1);active.release();
});

test('a real syntax Worker preserves complete Markdown, controls, HTML escaping and source positions', {timeout:15000}, async () => {
    await mkdir('temp',{recursive:true});
    await build({entryPoints:['src/components/markdown/markdownSyntax.worker.js'],outfile:'temp/markdown-syntax-worker-test.mjs',
        bundle:true,platform:'node',format:'esm',packages:'external',alias:{'@':path.resolve('src')}});
    const url=new URL('../temp/markdown-syntax-worker-test.mjs',import.meta.url).href;
    const code=`import {parentPort} from 'node:worker_threads';globalThis.self={postMessage:data=>parentPort.postMessage(data)};await import(${JSON.stringify(url)});parentPort.on('message',data=>self.onmessage({data}));`;
    const worker=new Worker(new URL('data:text/javascript,'+encodeURIComponent(code)));
    try {
        const cases=[
            '[late][ref]\n\n[ref]: https://example.com/new\n\n<script>alert(1)</script>',
            '- first\n\n  nested\n- next\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n$$x^2$$',
            '{{cardReplace id=t}}\n\n正文\n\n```js\nconst text="{{cardReplace id=literal}}";\n```',
            '- [ ] task',
        ];
        for(let index=0;index<cases.length;index++) {
            const options=index===3?{renderSurface:'document',editableTasks:true,taskSourceContent:cases[index]}:{};
            const result=new Promise((resolve,reject)=>{worker.once('message',resolve);worker.once('error',reject);});
            worker.postMessage({id:index,content:cases[index],options});
            const received=await result;assert.equal(received.error,undefined);
            assert.deepEqual(received.tree,parseMarkdownSyntax(cases[index],options));
        }
    } finally {await worker.terminate();}
});
