import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import {resolveImageLayout, resolveStoryMediaLayout} from '../src/features/story/media/storyMediaLayout.js';
import {releaseStoryMedia} from '../src/features/story/media/storyMediaLifecycle.js';

const fixtures = new Map([
    ['@/lib/tools.jsx', 'export const useLocalSetting=(_key,value)=>[value,()=>{}];'],
    ['@/lib/virtualUrl.js', 'export const resolveResourceUrl=value=>value;'],
    ['@/components/ui/button.tsx', 'export const Button=({variant,size,...props})=><button {...props}/>;'],
    ['@/components/ui/slider', 'export const Slider=()=>null;'],
    ['@/lib/utils', 'export const cn=(...values)=>values.filter(Boolean).join(" ");'],
    ['@/lib/windowLayers.js', 'export const useWindowPopoverLayer=()=>({zIndex:120100});'],
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
const bootstrap = new JSDOM('<div></div>', {url: 'http://localhost/stories', pretendToBeVisual: true});
globalThis.window = bootstrap.window;
globalThis.document = bootstrap.window.document;
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

async function setup(t, viewportWidth = 1440, options = {}) {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/stories', pretendToBeVisual: true});
    const keys = ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'Element', 'Node', 'localStorage', 'MutationObserver', 'CustomEvent', 'Event', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'IS_REACT_ACT_ENVIRONMENT'];
    const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
    for (const key of keys.slice(0, -1)) Object.defineProperty(globalThis, key, {configurable: true, value: ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? dom.window[key].bind(dom.window) : dom.window[key]});
    Object.defineProperty(dom.window, 'innerWidth', {configurable: true, writable: true, value: viewportWidth});
    const playback = {paused: [], loaded: [], played: []};
    Object.defineProperties(dom.window.HTMLMediaElement.prototype, {
        pause: {configurable: true, value() {playback.paused.push(this);}},
        load: {configurable: true, value() {playback.loaded.push(this);}},
        play: {configurable: true, value() {playback.played.push(this); return options.play?.(this) || Promise.resolve();}},
    });
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const host = document.getElementById('root'), root = createRoot(host);
    const parts = [
        {partId: 'one', sequence: 1, title: '第一篇', bodyMarkdown: '第一篇正文', videoUrl: '/first.mp4', videoPosition: 'right', videoAutoplay: false},
        {partId: 'two', sequence: 2, title: '第二篇', bodyMarkdown: '第二篇正文', videoUrl: '/second.mp4', videoPosition: 'right', videoAutoplay: false},
    ];
    let story = {storyId: 7, title: '视频布局故事', parts};
    const callbacks = {parts: [], closed: 0, stopped: 0};
    const props = {open: true, t: (_key, fallback) => fallback, onChangePart: sequence => callbacks.parts.push(sequence), onClose: () => callbacks.closed++, onStopSpeech: () => callbacks.stopped++};
    const render = async (overrides = {}, readerProps = {}) => {
        story = {...story, ...overrides};
        Object.assign(props, readerProps);
        await act(async () => root.render(React.createElement(React.StrictMode, null, React.createElement(StoryReader, {...props, story}))));
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
    return {dom, host, render, resize, metadata, parts, playback, callbacks};
}

test('the numeric selector opens every part and jumps using actual sequence numbers', async t => {
    const ui = await setup(t);
    await ui.render({parts: [ui.parts[0], {...ui.parts[1], sequence: 3}, {partId: 'five', sequence: 5, title: '第五篇', bodyMarkdown: '第五篇正文'}]});
    await act(async () => ui.host.querySelector('[aria-label="选择篇幅"]').click());
    const picker = document.querySelector('nav[aria-label="篇幅列表"]');
    assert.ok(picker);
    assert.deepEqual([...picker.querySelectorAll('button')].map(button => button.textContent), ['1', '3', '5']);
    assert.equal(picker.querySelector('[aria-current="page"]').textContent, '1');
    assert.equal(document.activeElement, picker.querySelector('[aria-current="page"]'));
    await act(async () => picker.querySelectorAll('button')[2].click());
    assert.equal(document.querySelector('nav[aria-label="篇幅列表"]'), null);
    assert.match(ui.host.querySelector('article').textContent, /第五篇正文/);
    assert.equal(ui.host.querySelector('[aria-label="选择篇幅"]').textContent, '5 / 3');
    assert.equal(localStorage.getItem('storyReader:position:7'), '5');
    assert.equal(ui.callbacks.parts.at(-1), 5);
    await act(async () => ui.host.querySelector('[aria-label="选择篇幅"]').click());
    assert.equal(document.querySelector('nav [aria-current="page"]').textContent, '5');
    await act(async () => document.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
    assert.equal(document.querySelector('nav[aria-label="篇幅列表"]'), null);
    assert.equal(ui.callbacks.closed, 0, 'Escape dismisses the selector before the reader');
});

test('empty stories keep the part picker disabled and gain entries after a live update', async t => {
    const ui = await setup(t);
    await ui.render({parts: []});
    assert.equal(ui.host.querySelector('[aria-label="选择篇幅"]').disabled, true);
    await ui.render({parts: ui.parts});
    assert.equal(ui.host.querySelector('[aria-label="选择篇幅"]').disabled, false);
    await act(async () => ui.host.querySelector('[aria-label="选择篇幅"]').click());
    await ui.render({parts: [...ui.parts, {partId: 'three', sequence: 3, bodyMarkdown: '新增正文'}]});
    assert.equal(document.querySelector('nav[aria-label="篇幅列表"]').querySelectorAll('button').length, 3);
});

test('switching parts releases pending resources and starts the new video before the old play settles', async t => {
    let rejectOldPlay;
    const pending = new Promise((_resolve, reject) => {rejectOldPlay = reject;});
    const ui = await setup(t, 1440, {play: video => video.getAttribute('src') === '/first.mp4' ? pending : Promise.resolve()});
    await ui.render({parts: ui.parts.map(part => ({...part, videoAutoplay: true, imageUrl: `/${part.partId}.png`}))});
    await act(async () => new Promise(resolve => setTimeout(resolve, 10)));
    const oldVideo = ui.host.querySelector('video');
    const oldImage = ui.host.querySelector('main img');
    assert.ok(ui.playback.played.includes(oldVideo));
    await act(async () => [...ui.host.querySelectorAll('button')].find(button => button.textContent.includes('下一篇')).click());
    const newVideo = ui.host.querySelector('video');
    assert.notEqual(newVideo, oldVideo);
    assert.equal(oldVideo.getAttribute('src'), null);
    assert.equal(oldImage.getAttribute('src'), null);
    assert.ok(ui.playback.loaded.includes(oldVideo));
    await act(async () => new Promise(resolve => setTimeout(resolve, 10)));
    assert.ok(ui.playback.played.includes(newVideo));
    assert.equal(newVideo.getAttribute('src'), '/second.mp4');
    await act(async () => {rejectOldPlay(new ui.dom.window.DOMException('Old media was canceled', 'AbortError'));});
    assert.equal(ui.host.querySelector('figcaption'), null, 'an old rejection cannot mark the new video as blocked');
    await ui.render({}, {open: false});
    assert.equal(newVideo.getAttribute('src'), null);
    assert.ok(ui.playback.loaded.includes(newVideo));
});

test('changing a video URL inside the same part releases the previous native player', async t => {
    const ui = await setup(t);
    await ui.render();
    const viewport = ui.host.querySelector('main');
    const oldVideo = ui.host.querySelector('video');
    await ui.render({parts: [{...ui.parts[0], videoUrl: '/replacement.mp4'}, ui.parts[1]]});
    assert.equal(ui.host.querySelector('main'), viewport);
    assert.equal(oldVideo.getAttribute('src'), null);
    assert.ok(ui.playback.loaded.includes(oldVideo));
    assert.equal(ui.host.querySelector('video').getAttribute('src'), '/replacement.mp4');
});

test('Strict Mode preserves live sources while rapid navigation releases every departing part', async t => {
    const ui = await setup(t);
    await ui.render({parts: [...ui.parts, {partId: 'three', sequence: 3, videoUrl: '/third.mp4', videoAutoplay: false}].map(part => ({...part, imageUrl: `/${part.partId}.png`}))});
    assert.equal(ui.host.querySelector('video').getAttribute('src'), '/first.mp4');
    assert.equal(ui.host.querySelector('main img').getAttribute('src'), '/one.png');
    const departed = [];
    for (const direction of ['下一篇', '下一篇', '上一篇']) {
        departed.push(...ui.host.querySelectorAll('main video, main img'));
        await act(async () => [...ui.host.querySelectorAll('button')].find(button => button.textContent.includes(direction)).click());
    }
    assert.equal(ui.host.querySelector('video').getAttribute('src'), '/second.mp4');
    assert.equal(ui.host.querySelector('main img').getAttribute('src'), '/two.png');
    for (const resource of departed) assert.equal(resource.getAttribute('src'), null);
    assert.ok(departed.filter(resource => resource.tagName === 'VIDEO').every(video => ui.playback.loaded.includes(video)));
});

test('media cleanup clears responsive images and nested audio sources', async t => {
    const ui = await setup(t);
    const container = document.createElement('div');
    container.innerHTML = '<img src="/image.png" srcset="/large.png 2x"><audio><source src="/voice.mp3"></audio>';
    releaseStoryMedia(container.querySelectorAll('img, audio'));
    assert.equal(container.querySelector('img').getAttribute('src'), null);
    assert.equal(container.querySelector('img').getAttribute('srcset'), null);
    assert.equal(container.querySelector('source').getAttribute('src'), null);
    assert.ok(ui.playback.loaded.includes(container.querySelector('audio')));
});

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
