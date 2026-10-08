import test from 'node:test';
import assert from 'node:assert/strict';
import { EditorState } from '@codemirror/state';
import { escDecorations, setEscDrafts, draftPreviewPlugin } from '../src/features/documents/escDecorations.js';

test('streaming drafts decorate the insertion point without changing stored text', () => {
    const field = escDecorations(() => {});
    let state = EditorState.create({doc: 'before after', extensions: [field]});
    state = state.update({effects: setEscDrafts.of([{displayPosition: 7, text: 'draft\nbody', status: 'streaming'}])}).state;
    assert.equal(state.doc.toString(), 'before after');
    let widget;
    state.field(field).between(0, state.doc.length, (from, to, value) => {assert.equal(from, 7); widget = value.spec.widget;});
    assert.equal(widget.lineBreaks, 1);
    state = state.update({changes: {from: 0, insert: 'new '}}).state;
    state.field(field).between(0, state.doc.length, from => assert.equal(from, 11));
    state = state.update({effects: setEscDrafts.of([])}).state;
    assert.equal(state.field(field).size, 0);
    assert.equal(state.doc.toString(), 'new before after');
});
test('rendered draft text gets temporary styling and a cursor without source markers', () => {
    const tree = {children: [{type:'text', value:'oldDRAFTtail', position:{start:{offset:0},end:{offset:12}}}]};
    draftPreviewPlugin({ranges:[{from:3,to:8,modelName:'AI'}]})(tree);
    assert.equal(tree.children[0].value, 'old');
    assert.equal(tree.children[1].tagName, 'span');
    assert.equal(tree.children[1].children[0].value, 'DRAFT');
    assert.equal(tree.children[2].children[0].value, '▏');
    assert.equal(tree.children[3].value, 'tail');
});
