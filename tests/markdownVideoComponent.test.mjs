import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

await build({
    stdin: {
        contents: "export { default as ResourceVideo } from './src/components/markdown/ResourceVideo.jsx'; export { resolveMarkdownMediaUrl } from './src/components/markdown/markdownMediaUrl.js';",
        resolveDir: process.cwd(),
    },
    bundle: true,
    packages: 'external',
    jsx: 'automatic',
    platform: 'node',
    format: 'esm',
    outfile: 'temp/markdown-video-component-test.mjs',
    alias: { '@': path.resolve('src') },
});

const { ResourceVideo, resolveMarkdownMediaUrl } = await import('../temp/markdown-video-component-test.mjs');

test('Markdown video resolves authorized artifact media and renders native playback controls', () => {
    const html = renderToStaticMarkup(React.createElement(ResourceVideo, {
        src: 'cwm://artifact/clip-123',
        title: '演示视频',
        poster: 'cwm://artifact/cover-123/preview',
    }));
    assert.match(html, /<video[^>]*src="\/api\/upload\/clip-123"[^>]*controls=""/);
    assert.match(html, /poster="\/api\/upload\/preview\/cover-123"/);
    assert.match(html, /preload="metadata"/);
    assert.match(html, /<figcaption[^>]*>演示视频<\/figcaption>/);
    assert.doesNotMatch(html, /autoplay/);
});

test('Markdown video rejects non-browser virtual resources and unsafe URI schemes', () => {
    for (const src of [
        'cwm://workspace/@w/private.mp4',
        'cwm://host/secret.mp4',
        'cwm://artifact/../clip',
        'javascript:alert(1)',
        'data:video/mp4;base64,AAAA',
        '//example.com/video.mp4',
        'https://user:pass@example.com/video.mp4',
        'https://example.com/clip\n.mp4',
    ]) {
        assert.equal(resolveMarkdownMediaUrl(src), '', src);
        const html = renderToStaticMarkup(React.createElement(ResourceVideo, { src }));
        assert.doesNotMatch(html, /<video/);
        assert.match(html, /视频地址无效或不可用/);
    }
});

test('Markdown video supports explicit web URLs and same-origin relative media', () => {
    assert.equal(resolveMarkdownMediaUrl('https://example.com/video.mp4'), 'https://example.com/video.mp4');
    assert.equal(resolveMarkdownMediaUrl('/api/document/doc-1/assets/demo.mp4'), '/api/document/doc-1/assets/demo.mp4');
    assert.equal(resolveMarkdownMediaUrl('assets/demo.mp4'), 'assets/demo.mp4');
    const html = renderToStaticMarkup(React.createElement(ResourceVideo, {
        src: 'https://example.com/video.mp4',
        poster: 'javascript:alert(1)',
    }));
    assert.match(html, /<video/);
    assert.doesNotMatch(html, /poster="javascript:/);
});
