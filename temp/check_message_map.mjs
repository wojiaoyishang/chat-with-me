import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('src/features/message-map/MessageHistoryMapPage.jsx', 'utf8');
const tree = ts.createSourceFile('map.jsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
const expressions = {};
let nodeElement;
function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) expressions[node.name.text] = node.initializer;
    if (ts.isJsxOpeningElement(node) && node.attributes.properties.some(attribute => attribute.name?.text === 'data-message-map-node')) nodeElement = node;
    ts.forEachChild(node, visit);
}
visit(tree);
let selected, focused, offsets = {}, timer, clears = 0, capture;
const context = vm.createContext({
    Date, Math, useCallback: callback => callback,
    NODE_HOLD_DELAY_MS: 400,
    node: {messageId: 'historical'}, nodeOffsets: {},
    setSelectedMessageId: value => {selected = value;}, setFocusedMessageId: value => {focused = value;},
    setNodeOffsets: callback => {offsets = callback(offsets);},
    suppressNodeClickUntilRef: {current: 0}, nodeHoldRef: {current: null},
    canvasRef: {current: {setPointerCapture: id => {capture = id;}, hasPointerCapture: () => false}},
    window: {setTimeout: callback => {timer = callback; return 1;}, clearTimeout: () => {clears++;}},
    viewTransformRef: {current: {scale: 2}}, activePointersRef: {current: new Map()}, gestureRef: {current: null},
    setIsCanvasDragging() {}, beginPinchGesture() {}, scheduleViewTransform() {},
});
function evaluate(expression) {
    return vm.runInContext(ts.transpileModule(`(${expression.getText(tree)})`, {compilerOptions: {target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React}}).outputText, context);
}
function attribute(name) { return evaluate(nodeElement.attributes.properties.find(item => item.name?.text === name).initializer.expression); }
attribute('onClick')();
assert.equal(selected, 'historical'); assert.equal(focused, 'historical');
// No toggleMessageBranch is injected: clicking must not expand children.
const event = {button: 0, pointerId: 1, pointerType: 'mouse', clientX: 100, clientY: 80, target: {closest: () => false}, preventDefault() {}};
attribute('onPointerDown')(event);
assert.equal(context.nodeHoldRef.current.dragging, false);
timer(); assert.equal(capture, 1);
evaluate(expressions.handleCanvasPointerMove)({...event, clientX: 140, clientY: 100});
assert.equal(offsets.historical.x, 20); assert.equal(offsets.historical.y, 10);
evaluate(expressions.endCanvasPointer)(event);
assert.equal(context.nodeHoldRef.current, null); assert.ok(clears);
context.suppressNodeClickUntilRef.current = 0;
attribute('onPointerDown')(event);
evaluate(expressions.handleCanvasPointerMove)({...event, clientX: 120});
assert.equal(context.nodeHoldRef.current, null, 'movement before long press cancels pending drag');
console.log('Message map selection, long press, zoom-adjusted drag and cleanup passed');
