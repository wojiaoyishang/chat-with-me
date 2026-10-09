import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { transformSync } from 'esbuild';
import { renderToStaticMarkup } from 'react-dom/server';

const source = fs.readFileSync(new URL('../src/components/files/FileUploadProgress.jsx', import.meta.url), 'utf8');
const row = source.slice(source.indexOf('function UploadRow'), source.indexOf('export default'));
const code = transformSync(`const Check = () => null; const AlertCircle = () => null; const X = () => null;
${row}
exports.Row = UploadRow;`, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;

function harness(status) {
    const slots = [], timers = new Map(), dismissed = [];
    let cursor = 0, effects = [], timerId = 0;
    const context = { exports: {}, require: createRequire(import.meta.url), Date: { now: () => 10000 },
        window: { setTimeout: (callback, delay) => { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout: (id) => timers.delete(id) },
        useState: (value) => { const index = cursor++; if (!(index in slots)) slots[index] = value; return [slots[index], (next) => { slots[index] = next; }]; },
        useRef: (value) => { const index = cursor++; return slots[index] ||= { current: value }; },
        useEffect: (effect, deps) => { const index = cursor++; if (!slots[index] || !deps.every((dep, i) => Object.is(dep, slots[index].deps[i]))) effects.push(() => { slots[index]?.cleanup?.(); slots[index] = { deps, cleanup: effect() }; }); },
    };
    vm.runInNewContext(code, context);
    return { timers, dismissed,
        render: () => { cursor = 0; effects = []; const element = context.exports.Row({ item: { id: 'image', name: 'image.png', status, percent: 100, completedAt: 10000 }, onDismiss: (id) => dismissed.push(id), t: (key) => key }); effects.forEach((effect) => effect()); return element; },
        fire: (delay) => { for (const [id, timer] of timers) if (timer.delay === delay) { timers.delete(id); timer.callback(); break; } },
    };
}

test('completed image upload waits, fades, then removes its parent entry', () => {
    const view = harness('done');
    assert.match(renderToStaticMarkup(view.render()), /关闭上传提示/);
    assert.ok([...view.timers.values()].some((timer) => timer.delay === 2500));
    view.fire(2500);
    assert.match(renderToStaticMarkup(view.render()), /opacity:0/);
    assert.equal(view.dismissed.length, 0);
    view.fire(300);
    assert.equal(view.render(), null);
    assert.deepEqual(view.dismissed, ['image']);
});

test('failed upload stays visible and has a manual dismiss button', () => {
    const view = harness('error');
    const element = view.render();
    assert.equal(view.timers.size, 0);
    function findButton(node) {
        if (!node || typeof node !== 'object') return null;
        if (Array.isArray(node)) return node.map(findButton).find(Boolean);
        return node.type === 'button' ? node : findButton(node.props?.children);
    }
    findButton(element).props.onClick();
    view.render();
    view.fire(300);
    assert.deepEqual(view.dismissed, ['image']);
});
