import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {resolveImageLayout, resolveStoryMediaLayout} from '../src/features/story/media/storyMediaLayout.js';

const fixtures = new Map([
    ['@/lib/tools.jsx', 'export const useLocalSetting=(_key,value)=>[value,()=>{}];'],
    ['@/lib/virtualUrl.js', 'export const resolveResourceUrl=value=>value;'],
    ['@/components/ui/button.tsx', 'export const Button=({variant,size,...props})=><button {...props}/>;'],
    ['@/components/ui/slider', 'export const Slider=()=>null;'],
    ['@/components/ui/popover.tsx', 'export const Popover=({children})=><>{children}</>;export const PopoverTrigger=({children})=>children;export const PopoverContent=()=>null;'],
    ['@/components/markdown/MarkdownRenderer.jsx', 'export default ({content})=><p>{content}</p>;'],
    ['@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx', 'export default ()=>null;'],
    ['@/features/story/media/StoryMediaEditor.jsx', 'export default ()=>null;'],
]);
await build({
    entryPoints: ['src/features/story/StoryReader.jsx'], outfile: 'temp/story-reader-layout-test.mjs',
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic',
    plugins: [{name: 'story-reader-fixtures', setup(builder) {
        builder.onResolve({filter: /^@\//}, ({path: name}) => fixtures.has(name)
            ? {path: name, namespace: 'fixture'} : {path: path.resolve('src', name.slice(2))});
        builder.onLoad({filter: /.*/, namespace: 'fixture'}, ({path: name}) => ({contents: fixtures.get(name), loader: 'jsx', resolveDir: process.cwd()}));
    }}],
});
const {default: StoryReader} = await import('../temp/story-reader-layout-test.mjs');

test('side media follow the actual desktop breakpoint while pairs remain responsive on tablets', () => {
    for (const videoPosition of ['left', 'right']) {
        const part = {videoUrl: '/video.mp4', imageUrl: '/image.png', videoPosition, layoutHint: 'image_left'};
        for (const viewportWidth of [390, 768, 1023]) {
            const layout = resolveStoryMediaLayout({part, viewportWidth});
            assert.equal(layout.mode, 'video_stacked');
            assert.equal(layout.videoPosition, 'top');
            assert.equal(layout.imageLayout, 'image_top');
        }
        const desktop = resolveStoryMediaLayout({part, viewportWidth: 1024});
        assert.equal(desktop.mode, 'video_side');
        assert.equal(desktop.videoPosition, videoPosition);
        assert.equal(desktop.imageLayout, 'image_top');
    }
    const part = {imageUrl: '/image.png', videoUrl: '/video.mp4'};
    assert.equal(resolveStoryMediaLayout({part, viewportWidth: 767}).stacked, true);
    assert.equal(resolveStoryMediaLayout({part, viewportWidth: 768}).stacked, false);
    assert.equal(resolveStoryMediaLayout({part: {...part, videoPosition: 'bottom'}, viewportWidth: 390}).videoPosition, 'bottom');
    assert.equal(resolveImageLayout({...part, layoutHint: 'image_left'}, 1, {viewportWidth: 1023}), 'image_top');
    assert.equal(resolveImageLayout({...part, layoutHint: 'image_left'}, 1, {viewportWidth: 1024}), 'image_left');
});

async function setup(t, viewportWidth = 1440) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/stories', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'localStorage', 'IS_REACT_ACT_ENVIRONMENT'];
    const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys.slice(0, -1)) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
    Object.defineProperty(dom.window, 'innerWidth', {configurable: true, writable: true, value: viewportWidth});
    Object.defineProperties(dom.window.HTMLMediaElement.prototype, {pause: {configurable: true, value() {}}, play: {configurable: true, value: async () => {}}});
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const host = document.getElementById('root'), root = createRoot(host);
    const parts = [
        {partId: 'one', sequence: 1, title: '第一篇', bodyMarkdown: '第一篇正文', videoUrl: '/first.mp4', videoPosition: 'right', videoAutoplay: false},
        {partId: 'two', sequence: 2, title: '第二篇', bodyMarkdown: '第二篇正文', videoUrl: '/second.mp4', videoPosition: 'right', videoAutoplay: false},
    ];
    let story = {storyId: 7, title: '视频布局故事', parts};
    const render = async (overrides = {}) => {
        story = {...story, ...overrides};
        await act(async () => root.render(React.createElement(StoryReader, {open: true, story, t: (_key, fallback) => fallback})));
    };
    const resize = async width => act(async () => { window.innerWidth = width; window.dispatchEvent(new dom.window.Event('resize')); });
    const metadata = async (video, width, height) => act(async () => {
        Object.defineProperties(video, {videoWidth: {configurable: true, value: width}, videoHeight: {configurable: true, value: height}});
        video.dispatchEvent(new dom.window.Event('loadedmetadata', {bubbles: true}));
    });
    t.after(async () => {
        await act(async () => root.unmount());
        dom.window.close();
        for (const [key, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    });
    return {dom, host, render, resize, metadata, parts};
}

test('the media frame owns both reserved aspect ratio and height limit before and after metadata', async t => {
    const ui = await setup(t);
    await ui.render();
    const frame = ui.host.querySelector('[data-story-video-frame]'), video = frame.querySelector('video');
    assert.equal(parseFloat(frame.style.aspectRatio), 16 / 9, 'reserve a useful video frame before metadata loads');
    assert.equal(frame.style.maxHeight, '66vh');
    assert.equal(frame.parentElement.tagName, 'FIGURE');
    assert.equal(frame.parentElement.style.aspectRatio, '', 'the figure cannot retain an uncapped second aspect-ratio box');
    assert.match(video.className, /absolute/);
    assert.doesNotMatch(video.className, /max-h-/);
    await ui.metadata(video, 1080, 1920);
    assert.equal(ui.host.querySelector('[data-story-video-frame]'), frame, 'metadata updates the existing frame');
    assert.equal(parseFloat(frame.style.aspectRatio), 1080 / 1920);
    assert.equal(frame.style.maxHeight, '66vh', 'portrait metadata keeps the same visible height cap');
    await ui.metadata(video, 0, 0);
    assert.equal(parseFloat(frame.style.aspectRatio), 1080 / 1920, 'incomplete metadata does not collapse the frame');
});

test('switching videos cannot reuse a previous source aspect ratio', async t => {
    const ui = await setup(t);
    await ui.render();
    await ui.metadata(ui.host.querySelector('video'), 600, 1200);
    assert.equal(parseFloat(ui.host.querySelector('[data-story-video-frame]').style.aspectRatio), 0.5);
    const next = [...ui.host.querySelectorAll('button')].find(button => button.textContent.includes('下一篇'));
    await act(async () => next.click());
    const video = ui.host.querySelector('video');
    assert.equal(video.getAttribute('src'), '/second.mp4');
    assert.equal(parseFloat(ui.host.querySelector('[data-story-video-frame]').style.aspectRatio), 16 / 9);
    await ui.metadata(video, 1920, 1080);
    assert.equal(parseFloat(ui.host.querySelector('[data-story-video-frame]').style.aspectRatio), 16 / 9);
});

test('right-hand videos use the smaller desktop column and tablet layouts return to a true stacked article', async t => {
    const ui = await setup(t);
    await ui.render();
    const videoColumn = ui.host.querySelector('video').closest('figure').parentElement;
    assert.match(videoColumn.className, /lg:order-2/);
    assert.match(videoColumn.parentElement.className, /58fr.*42fr/);
    assert.doesNotMatch(videoColumn.parentElement.className, /42%|58%/);
    await ui.resize(900);
    assert.equal(ui.host.querySelector('video').closest('figure').parentElement.querySelector('article')?.textContent, '第一篇第一篇正文');
    assert.doesNotMatch(ui.host.querySelector('video').closest('figure').parentElement.className, /grid-cols-/);
});

test('paired image and video frames share their capped sizing and switch cleanly to mobile stacking', async t => {
    const ui = await setup(t);
    await ui.render({parts: [{...ui.parts[0], videoPosition: 'auto', imageUrl: '/page.png', imageWidth: 600, imageHeight: 900}]});
    let deck = ui.host.querySelector('[data-story-media-layout="media_pair"]');
    const image = deck.querySelector('img'), imageFrame = image.parentElement;
    assert.equal(parseFloat(imageFrame.style.aspectRatio), 600 / 900);
    assert.equal(imageFrame.style.maxHeight, '64vh');
    assert.equal(image.closest('figure').style.flexBasis, '0px');
    assert.match(image.className, /absolute/);
    await ui.metadata(deck.querySelector('video'), 1920, 1080);
    assert.ok(Number(deck.dataset.storyMediaImageFraction) > 0);
    await ui.resize(390);
    deck = ui.host.querySelector('[data-story-media-layout="media_pair"]');
    assert.equal(deck.querySelector('img').closest('figure').style.flexBasis, '', 'mobile media are no longer zero-basis flex items');
    assert.ok(deck.querySelector('video'));
    assert.match(ui.host.querySelector('article').textContent, /第一篇正文/);
});
