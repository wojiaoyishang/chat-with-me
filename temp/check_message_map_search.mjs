import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Execute the actual Hook with deterministic effects, timers and deferred HTTP responses.
const slots = [], effects = [], timers = new Map(), requests = [];
let cursor = 0, dirty = false, nextTimer = 0, props, output;
const sameDeps = (a, b) => a && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
const context = vm.createContext({
    AbortController, Map,
    window: {setTimeout(callback) {const id = ++nextTimer; timers.set(id, callback); return id;}, clearTimeout(id) {timers.delete(id);}},
    useState(initial) {
        const index = cursor++;
        if (!slots[index]) slots[index] = {value: initial};
        return [slots[index].value, value => {slots[index].value = typeof value === 'function' ? value(slots[index].value) : value; dirty = true;}];
    },
    useRef(initial) {const index = cursor++; return slots[index] ||= {current: initial};},
    useEffect(callback, dependencies) {
        const index = cursor++;
        if (sameDeps(slots[index]?.dependencies, dependencies)) return;
        effects.push(() => {slots[index]?.cleanup?.(); slots[index] = {dependencies, cleanup: callback()};});
    },
    apiEndpoint: {CHAT_MESSAGE_MAP_SEARCH_ENDPOINT: '/search'},
    apiClient: {get(url, options) {return new Promise((resolve, reject) => requests.push({url, ...options, resolve, reject}));}},
});
const source = fs.readFileSync('src/features/message-map/useMessageMapSearch.js', 'utf8').replace(/^import [^\r\n]*\r?\n/gm, '').replace(/export /g, '');
vm.runInContext(`${source}\nglobalThis.searchHook = useMessageMapSearch;`, context);
function render(next = props) {
    props = next;
    let loops = 0;
    do {
        assert.ok(++loops < 20, 'effects must settle');
        dirty = false; cursor = 0; output = context.searchHook(props);
        effects.splice(0).forEach(effect => effect());
    } while (dirty);
    return output;
}
function runTimers() {const pending = [...timers.values()]; timers.clear(); pending.forEach(callback => callback());}
async function respond(request, data) {request.resolve(data); await new Promise(setImmediate); render();}
const items = (from, to) => Array.from({length: to - from}, (_, index) => ({messageId: `m${from + index}`, preview: 'match'}));
render({conversationId: 'a', query: 'needle', page: 0, append: true, enabled: false});
runTimers(); assert.equal(requests.length, 0, 'hidden search makes no requests');
render({...props, enabled: true}); assert.equal(output.loading, true);
runTimers(); assert.equal(requests[0].params.offset, 0);
await respond(requests[0], {items: items(0, 50), total: 120});
assert.equal(output.items.length, 50);
render({...props, page: 1}); runTimers(); assert.equal(requests[1].params.offset, 50);
await respond(requests[1], {items: items(49, 100), total: 120});
assert.equal(output.items.length, 100, 'append retains prior results and deduplicates overlaps');
render({...props, page: 2}); runTimers(); const stale = requests[2];
render({...props, query: 'different', page: 0}); assert.ok(stale.signal.aborted);
await respond(stale, {items: items(100, 120), total: 120});
assert.equal(output.items.length, 0, 'stale response cannot populate changed query');
runTimers(); await respond(requests[3], {items: items(200, 205), total: 5});
assert.equal(output.items[0].messageId, 'm200');
render({...props, append: false, page: 1}); runTimers();
await respond(requests[4], {items: items(50, 60), total: 60});
assert.equal(output.items.length, 10, 'dialog pagination replaces rather than appends');
render({...props, page: 0}); runTimers(); const closing = requests[5];
render({...props, enabled: false}); assert.ok(closing.signal.aborted);
await respond(closing, {items: items(0, 50), total: 120}); assert.equal(output.items.length, 0);
effects.splice(0).forEach(effect => effect()); slots.forEach(slot => slot?.cleanup?.());
console.log('Search debounce, infinite append, deduplication, stale response isolation, dialog pagination and close cancellation passed');

// Exercise the component's real scroll guard and click-outside lifecycle callbacks.
const componentSource = fs.readFileSync('src/features/message-map/MessageMapSearch.jsx', 'utf8');
const tree = ts.createSourceFile('search.jsx', componentSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
let loadMoreExpression, outsideEffect, selectExpression, scrollExpression;
function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === 'loadMore') loadMoreExpression = node.initializer;
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === 'select') selectExpression = node.initializer;
    if (ts.isCallExpression(node) && node.expression.getText(tree) === 'useEffect' && node.arguments[0].getText(tree).includes("document.addEventListener('pointerdown'")) outsideEffect = node.arguments[0];
    if (ts.isJsxAttribute(node) && node.name.text === 'onScroll') scrollExpression = node.initializer.expression;
    ts.forEachChild(node, visit);
}
visit(tree);
let page = 0, shown = true, dialogOpen = true, listener, removed = false, selected;
const inside = {};
const ui = vm.createContext({
    useCallback: callback => callback, shown: true,
    dropdown: {items: items(0, 50), total: 120, loading: false, error: ''}, loadLockRef: {current: false},
    setDropdownPage: callback => {page = callback(page);},
    rootRef: {current: {contains: target => target === inside}},
    setShown: value => {shown = value;}, setDialogOpen: value => {dialogOpen = value;},
    onSelect: item => {selected = item;}, LOAD_MORE_THRESHOLD_PX: 80,
    document: {addEventListener: (name, callback) => {assert.equal(name, 'pointerdown'); listener = callback;}, removeEventListener: (name, callback) => {removed = listener === callback;}},
});
const evaluate = expression => vm.runInContext(`(${expression.getText(tree)})`, ui);
ui.loadMore = evaluate(loadMoreExpression);
evaluate(scrollExpression)({currentTarget: {scrollHeight: 1000, scrollTop: 600, clientHeight: 200}});
assert.equal(page, 0, 'scroll far from bottom makes no request');
evaluate(scrollExpression)({currentTarget: {scrollHeight: 1000, scrollTop: 800, clientHeight: 200}});
ui.loadMore(); assert.equal(page, 1, 'repeated bottom events enqueue only one next page');
const cleanup = evaluate(outsideEffect)();
listener({target: inside}); assert.equal(shown, true);
listener({target: {}}); assert.equal(shown, false);
cleanup(); assert.ok(removed);
evaluate(selectExpression)({messageId: 'm1'});
assert.equal(selected.messageId, 'm1'); assert.equal(dialogOpen, false);
console.log('Scroll threshold, duplicate-load guard, outside dismissal, listener cleanup and result selection passed');
