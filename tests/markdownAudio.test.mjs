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
import { JSDOM } from 'jsdom';
import remarkAudioDirective from '../src/components/markdown/remarkAudioDirective.js';
import remarkVideoDirective from '../src/components/markdown/remarkVideoDirective.js';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
Object.defineProperty(globalThis, 'window', { configurable: true, value: dom.window });
await build({
    stdin: {
        contents: "export { default as ResourceAudio } from './src/components/markdown/ResourceAudio.jsx'; export { resolveCwmUrl } from './src/lib/virtualUrl.js'; export { setResourceTicket } from './src/runtime/backend/connection.js';",
        resolveDir: process.cwd(),
    },
    bundle: true,
    packages: 'external',
    jsx: 'automatic',
    platform: 'node',
    format: 'esm',
    outfile: 'temp/markdown-audio-test.mjs',
    alias: { '@': path.resolve('src') },
});
const { ResourceAudio, resolveCwmUrl, setResourceTicket } = await import('../temp/markdown-audio-test.mjs');

const parse = (source) => {
    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkVideoDirective).use(remarkAudioDirective);
    return processor.runSync(processor.parse(source));
};
const render = (content) => renderToStaticMarkup(React.createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm, remarkVideoDirective, remarkAudioDirective],
    components: { audio: ResourceAudio },
    urlTransform: (value, key, node) => resolveCwmUrl(value) ?? defaultUrlTransform(value, key, node),
}, content));

test('audio marker renders native controls and authorized artifact download without autoplay', () => {
    const html = render('![生成语音](cwm://artifact/audio-1){type=audio}');
    assert.match(html, /<audio[^>]*controls=""[^>]*preload="metadata"[^>]*src="\/api\/upload\/audio-1"/);
    assert.match(html, /<a[^>]*href="\/api\/upload\/audio-1"[^>]*download=""[^>]*aria-label="下载语音"/);
    assert.match(html, /<figcaption/);
    assert.doesNotMatch(html, /<img|auto[Pp]lay|cwm:\/\//);
});

test('audio marker keeps ordinary images, escaped markers, code, and raw HTML unchanged', () => {
    for (const source of [
        '![音频](cwm://artifact/audio-1)',
        '![音频](cwm://artifact/audio-1) {type=audio}',
        '![音频](cwm://artifact/audio-1)\\{type=audio}',
        '![音频](cwm://artifact/audio-1)&#123;type=audio}',
        '`![音频](cwm://artifact/audio-1){type=audio}`',
        '```text\n![音频](cwm://artifact/audio-1){type=audio}\n```',
        '<audio src="cwm://artifact/audio-1" autoplay></audio>',
    ]) assert.doesNotMatch(render(source), /<audio/);
});

test('mixed audio and video split their own blocks without losing adjacent text', () => {
    const blocks = parse('Before ![Audio](cwm://artifact/audio-1){type=audio} middle ![Video](cwm://artifact/video-1){type=video} after').children;
    assert.deepEqual(blocks.map((block) => block.data?.hName || block.type), ['paragraph', 'audio', 'paragraph', 'video', 'paragraph']);
    assert.deepEqual(blocks.filter((block) => block.type === 'paragraph').map((block) => block.children[0].value), ['Before ', ' middle ', ' after']);
});

test('unrenderable Workspace references and unsafe schemes never produce an audio request', () => {
    for (const src of [
        'cwm://workspace/@w/private.wav', 'cwm://host/secret.wav', 'cwm://artifact/../secret',
        'javascript:alert(1)', 'data:audio/wav;base64,AAAA', '//example.com/audio.wav',
        'https://user:pass@example.com/audio.wav', 'https://example.com/audio\n.wav',
    ]) {
        const html = renderToStaticMarkup(React.createElement(ResourceAudio, { src }));
        assert.doesNotMatch(html, /<audio|href=/, src);
        assert.match(html, /音频地址无效或不可用/);
    }
});

test('audio playback and download reuse the scoped resource ticket, never an external URL', () => {
    setResourceTicket('fixture-ticket');
    try {
        const html = render('![生成语音](cwm://artifact/audio-1){type=audio}');
        assert.match(html, /<audio[^>]*src="http:\/\/localhost\/api\/upload\/audio-1\?client_ticket=fixture-ticket"/);
        assert.match(html, /href="http:\/\/localhost\/api\/upload\/audio-1\?client_ticket=fixture-ticket"/);
        const external = render('![音频](https://example.com/audio.wav){type=audio}');
        assert.match(external, /src="https:\/\/example.com\/audio.wav"/);
        assert.doesNotMatch(external, /fixture-ticket/);
    } finally { setResourceTicket(''); }
});
