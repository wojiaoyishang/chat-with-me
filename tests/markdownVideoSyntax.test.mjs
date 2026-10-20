import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkVideoDirective from '../src/components/markdown/remarkVideoDirective.js';

const { outputFiles } = await build({
    stdin: {
        contents: "export { resolveCwmUrl } from './src/lib/virtualUrl.js';",
        resolveDir: process.cwd(),
    },
    write: false,
    bundle: true,
    platform: 'node',
    format: 'esm',
    alias: { '@': path.resolve('src') },
});
const { resolveCwmUrl } = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].contents).toString('base64')}`);

function parse(markdown, withVideo = true) {
    const processor = unified().use(remarkParse).use(remarkGfm);
    if (withVideo) processor.use(remarkVideoDirective);
    return processor.runSync(processor.parse(markdown));
}

test('explicit type marker turns a Markdown image into a video while keeping alt as its title', () => {
    const blocks = parse('前文 ![演示片段](cwm://artifact/clip-123){type=video} 后文').children;
    assert.equal(blocks.length, 3);
    assert.equal(blocks[0].type, 'paragraph');
    assert.equal(blocks[0].children[0].value, '前文 ');
    assert.equal(blocks[1].data?.hName, 'video');
    assert.equal(blocks[1].data?.hProperties?.src, 'cwm://artifact/clip-123');
    assert.equal(blocks[1].data?.hProperties?.title, '演示片段');
    assert.equal(blocks[2].type, 'paragraph');
    assert.equal(blocks[2].children[0].value, ' 后文');
});

test('ordinary Markdown images remain images regardless of alt or URL extension', () => {
    const paragraph = parse('![video](cwm://artifact/clip-123) ![动画](https://example.com/clip.mp4)').children[0];
    assert.deepEqual(paragraph.children.filter((node) => node.type === 'image').map((node) => node.alt), ['video', '动画']);
    assert.equal(paragraph.children.some((node) => node.data?.hName === 'video'), false);
});

test('video marker parsing leaves existing card blocks unchanged', () => {
    const markdown = ':::card{id=status}\n处理中\n:::\n\n![演示](cwm://artifact/clip-123){type=video}';
    const baseline = parse(markdown, false);
    const transformed = parse(markdown);
    assert.deepEqual(transformed.children[0], baseline.children[0]);
    assert.equal(transformed.children[1].data?.hName, 'video');
});

test('the marker must directly follow the image and never activates inside code', () => {
    const spaced = parse('![演示](cwm://artifact/clip-123) {type=video}');
    assert.equal(spaced.children[0].children[0].type, 'image');
    const code = parse('`![演示](cwm://artifact/clip-123){type=video}`');
    assert.equal(code.children[0].children[0].type, 'inlineCode');
});

test('ReactMarkdown renders marked media as video with resolved source while plain images stay images', () => {
    const render = (markdown, resourceBaseUrl = '') => renderToStaticMarkup(
        React.createElement(ReactMarkdown, {
            remarkPlugins: [remarkGfm, remarkVideoDirective],
            components: {
                video: ({ src, title }) => React.createElement('video', { src, title, controls: true }),
            },
            urlTransform: (uri, key, node) => {
                const safe = resolveCwmUrl(uri) ?? defaultUrlTransform(uri, key, node);
                return resourceBaseUrl && safe.startsWith('assets/')
                    ? `${resourceBaseUrl}${safe.slice('assets/'.length)}`
                    : safe;
            },
        }, markdown),
    );

    const video = render('![演示](cwm://artifact/id){type=video}');
    assert.match(video, /<video[^>]*src="\/api\/upload\/id"[^>]*title="演示"/);
    assert.doesNotMatch(video, /<img/);

    const image = render('![封面](cwm://artifact/cover)');
    assert.match(image, /<img[^>]*src="\/api\/upload\/cover"[^>]*alt="封面"/);
    assert.doesNotMatch(image, /<video/);

    const escapedMarker = render('![封面](cwm://artifact/cover)\\{type=video}');
    assert.match(escapedMarker, /<img[^>]*src="\/api\/upload\/cover"/);
    assert.doesNotMatch(escapedMarker, /<video/);

    const relativeVideo = render('![演示](assets/demo.mp4){type=video}', '/api/document/doc-1/assets/');
    assert.match(relativeVideo, /<video[^>]*src="\/api\/document\/doc-1\/assets\/demo.mp4"/);
});
