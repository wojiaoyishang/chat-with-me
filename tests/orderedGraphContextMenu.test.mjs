import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { createKnowledgeGraphContextMenu } from '../src/features/chat/ui/message/components/knowledgeGraphContextMenu.js';

const backendScript = await readFile(new URL('../../../Python/Chat-With-Me-Backend/application/management_pages/static/graph-context-menu.js', import.meta.url), 'utf8');
const settle = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };
const types = { orderedTypes: [{ label: 'Priority', displayName: '优先级', kind: 'number', count: 3 }, { label: 'Chapter', displayName: '章节', kind: 'text', count: 7 }] };
function setup(t, implementation, options = {}) {
    const dom = new JSDOM('<section><button id="origin">origin</button><button id="outside">outside</button></section>', { pretendToBeVisual: true, runScripts: 'outside-only' });
    const doc = dom.window.document, host = doc.querySelector('section'), origin = doc.querySelector('#origin');
    host.getBoundingClientRect = () => ({ left: 100, top: 80, right: 380, bottom: 260, width: 280, height: 180 });
    origin.getBoundingClientRect = () => ({ left: 210, top: 140, width: 10, height: 10 });
    origin.focus();
    let menu;
    if (implementation === 'chat') menu = createKnowledgeGraphContextMenu({ host, ...options });
    else {
        dom.window.CWMOrderedGraphLayout = { orderedNodeInfo: node => node.ordered || null };
        dom.window.eval(backendScript);
        menu = dom.window.CWMGraphContextMenu.create({ host, getCanvasNodes: () => [], getCanvasTypes: async () => [], ...options });
    }
    t.after(() => { menu.destroy(); dom.window.close(); });
    const open = node => menu.open(node ? { ...node, element: origin } : null, { clientX: 999, clientY: 999 });
    const root = () => doc.querySelector(implementation === 'chat' ? '.knowledge-compact-menu:not(.knowledge-compact-submenu)' : '.graph-context-menu');
    const submenu = () => doc.querySelector(implementation === 'chat' ? '.knowledge-compact-submenu' : '.graph-context-submenu');
    const action = (name, parent = root()) => parent.querySelector(`[data-action="${name}"]`);
    const key = (target, value, extra = {}) => target.dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: value, ...extra }));
    return { dom, doc, host, origin, menu, open, root, submenu, action, key };
}

for (const implementation of ['chat', 'management']) {
    test(`${implementation}: chunk nodes can find an ordered anchor through the same dynamic type menu`, async t => {
        const nearest = [];
        const ui = setup(t, implementation, { getOrderedTypes: async () => types,
            onNearestOrdered: (...args) => nearest.push(args), onExpand() {} });
        ui.open({ id: 'source-chunk', label: 'Chunk', labels: ['Chunk'], isChunk: true });
        assert.ok(ui.action('ordered-nearest'), 'a Chunk must expose nearest ordered discovery');
        assert.equal(ui.action('ordered-neighbors'), null, 'a source Chunk is not itself an OrderedNode');
        ui.action('ordered-nearest').click(); await settle();
        ui.submenu().querySelector('[data-label="Chapter"]').click();
        assert.deepEqual(nearest, [['source-chunk', 'Chapter']]);
        assert.equal(ui.root(), null);
    });

    test(`${implementation}: blank canvas and ordinary nodes select dynamic ordered types; ordered expansion has one entry`, async t => {
        const skeletons = [], nearest = [], related = [], neighbors = [];
        const ui = setup(t, implementation, { getOrderedTypes: async () => types,
            onOrderedSkeleton: (...args) => skeletons.push(args), onNearestOrdered: (...args) => nearest.push(args),
            onExpand: (...args) => related.push(args), onOrderedNeighbors: id => neighbors.push(id) });
        ui.open(null); ui.action('ordered-skeleton').click(); await settle();
        assert.ok(ui.submenu());
        assert.deepEqual([...ui.submenu().querySelectorAll('[data-label]')].map(button => button.dataset.label).sort(), ['Chapter', 'Priority']);
        ui.submenu().querySelector('[data-label="Chapter"]').click();
        assert.deepEqual(skeletons, [[null, 'Chapter']]); assert.equal(ui.root(), null);

        ui.open({ id: 'event', label: 'Event' });
        assert.equal(ui.action('ordered-neighbors'), null);
        ui.action('ordered-nearest').click(); await settle();
        ui.submenu().querySelector('[data-label="Priority"]').click();
        assert.deepEqual(nearest, [['event', 'Priority']]);

        ui.open({ id: 'rank', label: 'Priority', ordered: { kind: 'number' } });
        assert.equal(ui.action('ordered-nearest'), null);
        assert.equal(ui.action('ordered-neighbors'), null, 'one skeleton action replaces redundant ordered expansion choices');
        assert.equal(ui.action('node-expand').textContent, '展开关联');
        ui.action('node-expand').click();
        assert.deepEqual(related, implementation === 'chat' ? [['rank', 'related']] : [['rank']]);
        ui.open({ id: 'rank', label: 'Priority', ordered: { kind: 'number' } });
        assert.equal(ui.action('ordered-neighbors'), null);
        assert.deepEqual(neighbors, [], 'removing the menu entry does not invoke the retained callback');
        ui.action('ordered-skeleton').click(); assert.deepEqual(skeletons, [[null, 'Chapter'], ['rank', 'Priority']]);
    });

    test(`${implementation}: keyboard navigation and Escape return focus; menus fit their container`, async t => {
        const ui = setup(t, implementation, { getOrderedTypes: async () => types.orderedTypes, onOrderedSkeleton() {} });
        ui.open(null);
        const root = ui.root();
        const x = parseFloat(root.style.left), y = parseFloat(root.style.top);
        assert.ok(x >= (implementation === 'chat' ? 8 : 108));
        assert.ok(y >= (implementation === 'chat' ? 8 : 88));
        assert.ok(parseFloat(root.style.maxWidth) <= 264); assert.ok(parseFloat(root.style.maxHeight) <= 164);
        const trigger = ui.action('ordered-skeleton'); trigger.focus(); ui.key(trigger, 'ArrowRight'); await settle();
        if (implementation === 'management') ui.key(ui.doc.activeElement, 'ArrowDown');
        assert.ok(ui.submenu().contains(ui.doc.activeElement));
        assert.equal(ui.doc.activeElement.getAttribute('role'), 'menuitem');
        ui.key(ui.doc.activeElement, 'ArrowDown'); assert.equal(ui.doc.activeElement.getAttribute('role'), 'menuitem');
        ui.key(ui.doc.activeElement, 'ArrowLeft'); assert.equal(ui.submenu(), null); assert.equal(ui.doc.activeElement, trigger);
        ui.key(trigger, 'Escape'); assert.equal(ui.root(), null); assert.equal(ui.doc.activeElement, ui.origin);
        ui.open(null); ui.doc.querySelector('#outside').focus(); assert.equal(ui.root(), null);
        ui.open(null); ui.dom.window.dispatchEvent(new ui.dom.window.Event('blur')); assert.equal(ui.root(), null);
    });

    test(`${implementation}: scope changes and outside clicks abort type reads and ignore late responses`, async t => {
        const reads = [];
        const ui = setup(t, implementation, { getOrderedTypes: ({ signal }) => new Promise(resolve => reads.push({ signal, resolve })), onOrderedSkeleton() {} });
        ui.open(null); ui.action('ordered-skeleton').click(); await settle();
        assert.equal(reads.length, 1); ui.menu.close(); assert.equal(reads[0].signal.aborted, true);
        ui.open(null); ui.action('ordered-skeleton').click(); await settle();
        reads[0].resolve({ orderedTypes: [{ label: 'StaleType', displayName: '旧知识库', count: 1 }] }); await settle();
        assert.equal(ui.doc.querySelector('[data-label="StaleType"]'), null);
        reads[1].resolve(types); await settle(); assert.ok(ui.doc.querySelector('[data-label="Priority"]'));
        ui.doc.querySelector('#outside').click(); assert.equal(ui.root(), null); assert.equal(reads[1].signal.aborted, true);
    });
}
