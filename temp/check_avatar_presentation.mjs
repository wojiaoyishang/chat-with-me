import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('src/components/window/FloatingDockWindow.jsx', 'utf8');
const helpers = source.slice(source.indexOf('const EDGE'), source.indexOf('const FloatingDockWindow'));
const context = {window: {innerWidth: 1280, innerHeight: 800}, result: null};
vm.runInNewContext(helpers + '\nresult = normalizeFloating;', context);
const normalize = context.result;
let layout = normalize({x: 9000, y: -500, width: 400, height: 400});
assert.equal(layout.x, 870); assert.equal(layout.y, 10);
const host = {getBoundingClientRect: () => ({left: 300, top: 50, width: 320, height: 480})};
layout = normalize({x: 9999, y: 9999, width: 380, height: 440}, host);
assert.equal(layout.width, 300); assert.equal(layout.x, 10); assert.equal(layout.y, 30);
assert(layout.x + layout.width <= 320 && layout.y + layout.height <= 480);
// Run the actual style selector: changing mode must retain the same portal target.
const styleStart = source.indexOf('const panelStyle = useMemo(() => {');
const bodyStart = source.indexOf('=> {', styleStart) + 4;
const bodyEnd = source.indexOf('}, [', bodyStart);
const selectStyle = new Function('expanded', 'portalTarget', 'isMobile', 'compactMobile', 'docked', 'layout', 'zIndex = 2147483200', source.slice(bodyStart, bodyEnd));
const floating = selectStyle(false, host, true, true, false, layout);
const expanded = selectStyle(true, host, true, true, false, layout);
assert.equal(floating.position, 'absolute'); assert.equal(floating.width, 300);
assert.equal(selectStyle(true, host, false, true, false, layout, 50).zIndex, 50);
assert.equal(expanded.inset, 0); assert.equal(expanded.width, '100%');
assert.equal(selectStyle(false, host, true, true, false, layout).width, floating.width);
assert.equal(selectStyle(false, null, true, false, false, layout).position, 'fixed');
assert.equal(selectStyle(false, null, false, false, true, layout).position, 'absolute');

// Execute the real hook with state, event and timer adapters; no DOM/editor copies.
let cursor = 0; const slots = [], effects = [], pending = [], listeners = new Map(), timers = new Map(); let timerId = 0;
const equal = (a, b) => a && b && a.length === b.length && a.every((v, i) => v === b[i]);
const runtime = {
    useRef: value => { const i = cursor++; return slots[i] ||= {current: value}; },
    useState: value => { const i = cursor++; if (!(i in slots)) slots[i] = value; return [slots[i], next => { slots[i] = next; }]; },
    useCallback: (fn, deps) => { const i = cursor++; if (!slots[i] || !equal(slots[i].deps, deps)) slots[i] = {fn, deps}; return slots[i].fn; },
    useEffect: (fn, deps) => { const i = cursor++; if (!effects[i] || !equal(effects[i].deps, deps)) pending.push(() => { effects[i]?.cleanup?.(); effects[i] = {deps, cleanup: fn()}; }); },
    document: {addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name)},
    setTimeout: fn => { const id = ++timerId; timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id), hook: null,
};
const hookSource = fs.readFileSync('src/features/avatar-scene/useImmersiveComposer.js', 'utf8').replace(/^import .*;\n/, '').replace('export default function', 'function');
vm.runInNewContext(hookSource + '\nhook = useImmersiveComposer;', runtime);
const hostRef = {current: {getBoundingClientRect: () => ({left: 100, right: 900, top: 100, bottom: 700})}};
let enabled = true;
const render = () => { cursor = 0; let value = runtime.hook({enabled, hostRef}); while (pending.length) pending.shift()(); cursor = 0; value = runtime.hook({enabled, hostRef}); return value; };
let hook = render(); assert.equal(hook.visible, false);
const composer = {contains: target => target === 'editor'}; hook.composerRef.current = composer;
const move = (x, y, target = 'scene') => listeners.get('pointermove')({clientX: x, clientY: y, target});
const flushTimers = () => { for (const [id, fn] of [...timers]) { timers.delete(id); fn(); } };
move(500, 670); hook = render(); assert.equal(hook.visible, true);
hook.onFocusCapture(); move(500, 200); flushTimers(); hook = render(); assert.equal(hook.visible, true);
hook.onBlurCapture({currentTarget: composer, relatedTarget: 'scene'}); move(500, 200); flushTimers(); hook = render(); assert.equal(hook.visible, false);
move(50, 699); hook = render(); assert.equal(hook.visible, false);
hook.show(); hook = render(); assert.equal(hook.visible, true);
move(500, 200, 'editor'); flushTimers(); hook = render(); assert.equal(hook.visible, true);
move(500, 200); enabled = false; render(); assert.equal(listeners.size, 0); assert.equal(timers.size, 0);
console.log('PASS: drag bounds, mobile fit, expand/restore, existing docking, hover, focus pinning, touch reveal and cleanup');

// Verify the real ChatPage composer escapes the clipped message container.
const {parse} = await import('@babel/parser');
const pageTree = parse(fs.readFileSync('src/features/chat/ChatPage.jsx', 'utf8'), {sourceType: 'module', plugins: ['jsx']});
let composerParent;
function visit(node, parentElement = null) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'JSXElement') {
        const attrs = node.openingElement.attributes;
        if (attrs.some(a => a.name?.name === 'data-avatar-composer')) composerParent = parentElement;
        parentElement = node;
    }
    for (const [key, value] of Object.entries(node)) {
        if (key === 'loc' || key === 'extra') continue;
        if (Array.isArray(value)) value.forEach(child => visit(child, parentElement));
        else if (value && typeof value === 'object') visit(value, parentElement);
    }
}
visit(pageTree);
assert.ok(composerParent?.openingElement.attributes.some(a => a.name?.name === 'ref' && a.value?.expression?.name === 'chatPageRef'));
console.log('PASS: actual ChatPage composer shares the scene host, outside clipped messages');
