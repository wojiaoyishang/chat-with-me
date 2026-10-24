import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createPortal } from 'react-dom';

await build({
    entryPoints: ['src/features/execution/useExecutionAutoFollow.js'], bundle: true,
    packages: 'external', format: 'esm', platform: 'node', outfile: 'temp/execution-auto-follow-test.mjs',
});
const { default: useExecutionAutoFollow } = await import('../temp/execution-auto-follow-test.mjs');

async function fixture() {
    const dom = new JSDOM('<div id="root"></div><div id="floating"></div><div id="docked"></div>', {
        url: 'http://localhost/chat', pretendToBeVisual: true,
    });
    const previous = new Map();
    for (const [key, value] of Object.entries({
        window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
        Element: dom.window.Element, IS_REACT_ACT_ENVIRONMENT: true,
    })) {
        previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
        Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    }
    const view = dom.window;
    const frames = new Map();
    let sequence = 0;
    view.requestAnimationFrame = (callback) => { const id = ++sequence; frames.set(id, callback); return id; };
    view.cancelAnimationFrame = (id) => frames.delete(id);
    const observations = [];
    class Observer {
        constructor(callback) { this.callback = callback; this.targets = new Set(); observations.push(this); }
        observe(node) { this.targets.add(node); }
        disconnect() { this.disconnected = true; }
    }
    view.ResizeObserver = Observer;
    view.MutationObserver = Observer;
    const metrics = new WeakMap();
    const positions = new WeakMap();
    const scrolls = [];
    const measure = (node) => metrics.get(node) || { height: 900, viewport: 300 };
    Object.defineProperties(view.HTMLElement.prototype, {
        scrollHeight: { configurable: true, get() { return measure(this).height; } },
        clientHeight: { configurable: true, get() { return measure(this).viewport; } },
        scrollTop: { configurable: true, get() { return positions.get(this) || 0; }, set(top) {
            positions.set(this, Math.max(0, Math.min(top, this.scrollHeight - this.clientHeight)));
        } },
    });
    view.HTMLElement.prototype.scrollTo = function ({ top, behavior }) {
        this.scrollTop = top;
        scrolls.push({ node: this, top: this.scrollTop, behavior });
    };
    function Harness({ open = true, executionId = 'exec', navigationRequest = null, mount = 'floating', text = '工具结果' }) {
        const follow = useExecutionAutoFollow({ open, executionId, navigationRequest });
        return React.createElement(React.Fragment, null,
            React.createElement('button', { 'aria-pressed': follow.autoFollow, onClick: follow.toggleAutoFollow }, '自动置底'),
            open && createPortal(React.createElement('div', { ref: follow.attachScroll, 'data-scroll': true, tabIndex: 0 },
                React.createElement('div', { ref: follow.attachContent, 'data-content': true }, text,
                    React.createElement('textarea'), React.createElement('img', { alt: '延迟图片' }))), document.getElementById(mount)),
        );
    }
    // Load the DOM renderer after installing a browser document so React uses its
    // normal input-event path rather than its legacy no-DOM input polyfill.
    const { createRoot } = await import('react-dom/client');
    const root = createRoot(document.getElementById('root'));
    let props = {};
    const render = async (next = {}) => {
        props = { ...props, ...next };
        await act(async () => root.render(React.createElement(Harness, props)));
    };
    const flushFrame = async () => {
        const current = [...frames.values()];
        frames.clear();
        await act(async () => current.forEach((callback) => callback(0)));
    };
    const flush = async () => {
        let count = 0;
        while (frames.size && count++ < 8) await flushFrame();
        assert.equal(frames.size, 0, 'following settles without an endless animation loop');
    };
    const fire = async (node, type, init = {}) => {
        const EventType = type === 'wheel' ? view.WheelEvent : type === 'keydown' ? view.KeyboardEvent : view.Event;
        const event = new EventType(type, { bubbles: true, ...init });
        for (const key of ['touches', 'button']) if (key in init) Object.defineProperty(event, key, { value: init[key] });
        await act(async () => node.dispatchEvent(event));
    };
    const notify = async (node) => act(async () => observations.filter((observer) => !observer.disconnected
        && observer.targets.has(node)).forEach((observer) => observer.callback([])));
    await render();
    return {
        view, render, flush, flushFrame, fire, notify, metrics, observations, frames, scrolls,
        get viewport() { return document.querySelector('[data-scroll]'); },
        get content() { return document.querySelector('[data-content]'); },
        get button() { return document.querySelector('button'); },
        async close() {
            await act(async () => root.unmount());
            assert.equal(frames.size, 0, 'unmount cancels pending scrolls');
            dom.window.close();
            for (const [key, descriptor] of previous) {
                if (descriptor) Object.defineProperty(globalThis, key, descriptor);
                else delete globalThis[key];
            }
        },
    };
}

test('fast result bursts and scroll anchoring never disable following before the next frame', async () => {
    const f = await fixture();
    try {
        await f.flush();
        assert.equal(f.viewport.scrollTop, 600);
        for (let index = 1; index <= 12; index++) {
            f.metrics.set(f.viewport, { height: 900 + index * 100, viewport: 300 });
            await f.fire(f.viewport, 'scroll');
            await f.notify(f.content);
            await f.render({ text: `第 ${index} 个工具已完成` });
        }
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
        assert.equal(f.frames.size, 1, 'bursty updates share the already scheduled frame');
        await f.flush();
        assert.equal(f.viewport.scrollTop, 1800);
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
        assert.ok(f.scrolls.every((entry) => entry.behavior === 'instant'));
    } finally { await f.close(); }
});

test('completion collapse, delayed media and viewport resize follow without a new execution snapshot', async () => {
    const f = await fixture();
    try {
        await f.flush();
        f.metrics.set(f.viewport, { height: 450, viewport: 300 });
        f.viewport.scrollTop = 150;
        await f.fire(f.viewport, 'scroll');
        f.metrics.set(f.viewport, { height: 1500, viewport: 300 });
        await f.fire(f.content.querySelector('img'), 'load');
        await f.flush();
        assert.equal(f.viewport.scrollTop, 1200);
        f.metrics.set(f.viewport, { height: 1500, viewport: 180 });
        await f.notify(f.viewport);
        await f.flush();
        assert.equal(f.viewport.scrollTop, 1320);
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
    } finally { await f.close(); }
});

test('docking rebinds observers to the actual new DOM and releases the detached portal', async () => {
    const f = await fixture();
    try {
        const oldViewport = f.viewport;
        const oldContent = f.content;
        await f.render({ mount: 'docked' });
        assert.notEqual(f.viewport, oldViewport);
        assert.ok(f.observations.filter((observer) => observer.targets.has(oldContent)).every((observer) => observer.disconnected));
        const newViewport = f.viewport;
        f.metrics.set(newViewport, { height: 1700, viewport: 200 });
        await f.notify(f.content);
        await f.flush();
        assert.equal(newViewport.scrollTop, 1500);
        const count = f.scrolls.length;
        await f.notify(oldContent);
        await f.fire(oldViewport, 'scroll');
        await f.flush();
        assert.equal(f.scrolls.length, count, 'detached content no longer schedules scrolling');
    } finally { await f.close(); }
});

test('intentional upward wheel cancels a pending follow; explicit resume survives subsequent scroll events', async () => {
    const f = await fixture();
    try {
        await f.flush();
        f.metrics.set(f.viewport, { height: 1800, viewport: 300 });
        await f.notify(f.content);
        await f.fire(f.viewport, 'wheel', { deltaY: -120 });
        f.viewport.scrollTop = 450;
        await f.fire(f.viewport, 'scroll');
        await f.flush();
        assert.equal(f.button.getAttribute('aria-pressed'), 'false');
        await f.notify(f.content);
        await f.render({ text: '后续结果不会抢走阅读位置' });
        await f.flush();
        assert.equal(f.viewport.scrollTop, 450);
        await act(async () => f.button.click());
        await f.fire(f.viewport, 'scroll');
        await f.flush();
        assert.equal(f.viewport.scrollTop, 1500);
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
    } finally { await f.close(); }
});

test('keyboard, touch and scrollbar upward gestures pause, while text editing does not', async () => {
    const f = await fixture();
    try {
        await f.flush();
        await f.fire(f.content.querySelector('textarea'), 'keydown', { key: 'ArrowUp' });
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
        await f.fire(f.viewport, 'keydown', { key: 'PageUp' });
        assert.equal(f.button.getAttribute('aria-pressed'), 'false');
        await act(async () => f.button.click());
        await f.flush();
        await f.fire(f.viewport, 'touchstart', { touches: [{ clientY: 100 }] });
        await f.fire(f.viewport, 'touchmove', { touches: [{ clientY: 125 }] });
        assert.equal(f.button.getAttribute('aria-pressed'), 'false');
        await act(async () => f.button.click());
        await f.flush();
        await f.fire(f.viewport, 'pointerdown', { button: 0 });
        f.viewport.scrollTop -= 150;
        await f.fire(f.viewport, 'scroll');
        assert.equal(f.button.getAttribute('aria-pressed'), 'false');
    } finally { await f.close(); }
});

test('historical navigation blocks pending follow and remains paused after navigation is consumed', async () => {
    const f = await fixture();
    try {
        await f.render({ navigationRequest: { requestId: 1, toolCallId: 'first' } });
        f.viewport.scrollTop = 120;
        await f.flush();
        assert.equal(f.viewport.scrollTop, 120);
        assert.equal(f.button.getAttribute('aria-pressed'), 'false');
        await f.render({ navigationRequest: null, text: '定位后又到达的结果' });
        await f.notify(f.content);
        await f.flush();
        assert.equal(f.viewport.scrollTop, 120);
        await f.render({ executionId: 'next-exec' });
        await f.flush();
        assert.equal(f.viewport.scrollTop, 600);
        assert.equal(f.button.getAttribute('aria-pressed'), 'true');
    } finally { await f.close(); }
});
