import test from 'node:test';
import assert from 'node:assert/strict';
import { createOverflowMarquee } from '../src/features/chat/ui/message/components/overflowMarquee.js';
import { createOutputScrollBatch } from '../src/components/markdown/card-block/blocks/outputScrollBatch.js';

function frameWindow() {
    let sequence = 0;
    const frames = new Map();
    const timers = new Map();
    const listeners = new Map();
    const win = {
        requestAnimationFrame: (callback) => { frames.set(++sequence, callback); return sequence; },
        cancelAnimationFrame: (id) => frames.delete(id),
        setTimeout: (callback) => { timers.set(++sequence, callback); return sequence; },
        clearTimeout: (id) => timers.delete(id),
        addEventListener: (name, callback) => listeners.set(name, callback),
        removeEventListener: (name) => listeners.delete(name),
    };
    const frame = (time) => { const work = [...frames.values()]; frames.clear(); work.forEach((callback) => callback(time)); };
    return { win, frames, timers, listeners, frame };
}

test('badge strips do not run frame loops without overflow or outside the viewport', () => {
    const f = frameWindow();
    let intersect;
    let resize;
    f.win.IntersectionObserver = class { constructor(callback) { intersect = callback; } observe() {} disconnect() {} };
    f.win.ResizeObserver = class { constructor(callback) { resize = callback; } observe() {} disconnect() {} };
    const doc = { hidden: false, defaultView: f.win, addEventListener() {}, removeEventListener() {} };
    let width = 100;
    let reads = 0;
    const element = { ownerDocument: doc, scrollLeft: 0, clientWidth: 100,
        get scrollWidth() { reads += 1; return width; } };
    const control = createOverflowMarquee(element);
    assert.equal(f.frames.size, 0);
    intersect([{ isIntersecting: true }]);
    assert.equal(f.frames.size, 0, 'a visible strip that fits has no frame loop');
    width = 300;
    resize();
    assert.equal(f.frames.size, 1);
    const measured = reads;
    f.frame(100);
    f.frame(116);
    f.frame(132);
    assert.ok(element.scrollLeft > 0);
    assert.equal(reads, measured, 'animation uses cached dimensions instead of layout reads every frame');
    control.setPaused(true);
    assert.equal(f.frames.size, 0);
    control.setPaused(false);
    intersect([{ isIntersecting: false }]);
    assert.equal(f.frames.size, 0);
    assert.equal(f.timers.size, 0);
    control.dispose();
});

test('all card scroll geometry is read before writes and manual scroll wins', () => {
    const f = frameWindow();
    const schedule = createOutputScrollBatch(f.win);
    const order = [];
    const node = (id) => ({ isConnected: true, checkVisibility: () => true,
        get scrollHeight() { order.push(`read ${id}`); return 500; },
        set scrollTop(value) { order.push(`write ${id} ${value}`); } });
    const first = node('a');
    const second = node('b');
    const paused = node('paused');
    let following = true;
    schedule(first, () => true);
    schedule(first, () => true);
    schedule(second, () => true);
    schedule(paused, () => following);
    following = false;
    assert.equal(f.frames.size, 1);
    f.frame(100);
    assert.deepEqual(order, ['read a', 'read b', 'write a 500', 'write b 500']);
    const cancel = schedule(first, () => true);
    cancel();
    assert.equal(f.frames.size, 0);
});
