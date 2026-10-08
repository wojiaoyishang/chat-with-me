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

import * as Y from 'yjs';
test('accepted remote drafts can be undone without undoing other collaborators', () => {
    const doc = new Y.Doc(); const text = doc.getText('content');
    text.insert(0, 'original');
    const undo = new Y.UndoManager(text, {trackedOrigins: new Set([null, 'esc-accept'])});
    const remote = new Y.Doc(); Y.applyUpdate(remote, Y.encodeStateAsUpdate(doc));
    remote.getText('content').insert(8, ' accepted');
    Y.applyUpdate(doc, Y.encodeStateAsUpdate(remote), 'esc-accept');
    undo.stopCapturing();
    remote.getText('content').insert(0, 'other ');
    Y.applyUpdate(doc, Y.encodeStateAsUpdate(remote), 'server');
    undo.undo(); assert.equal(text.toString(), 'other original');
    undo.redo(); assert.equal(text.toString(), 'other original accepted');
    undo.destroy(); doc.destroy(); remote.destroy();
});

test('user undo follows one ordered stack for local and AI edits', () => {
    const doc = new Y.Doc(); const text = doc.getText('content'); text.insert(0, 'base');
    const undo = new Y.UndoManager(text, {trackedOrigins: new Set([null, 'document-edit'])});
    text.insert(4, ' user'); undo.stopCapturing();
    const remote = new Y.Doc(); Y.applyUpdate(remote, Y.encodeStateAsUpdate(doc));
    remote.getText('content').insert(9, ' AI');
    Y.applyUpdate(doc, Y.encodeStateAsUpdate(remote), 'document-edit'); undo.stopCapturing();
    text.insert(12, ' last'); undo.stopCapturing();
    undo.undo(); assert.equal(text.toString(), 'base user AI');
    undo.undo(); assert.equal(text.toString(), 'base user');
    undo.undo(); assert.equal(text.toString(), 'base');
    undo.redo(); undo.redo(); undo.redo(); assert.equal(text.toString(), 'base user AI last');
    undo.destroy(); doc.destroy(); remote.destroy();
});

import { escDraftData } from '../src/features/documents/escDraftData.js';
test('HTTP draft responses drop circular transport metadata', () => {
    const data = {streamId: 'one', text: 'remaining', status: 'streaming', updatedAt: '2026-10-08T00:00:00Z'};
    data._response = {data: {data}};
    const clean = escDraftData(data);
    assert.equal(clean.text, 'remaining');
    assert.equal(clean._response, undefined);
    assert.doesNotThrow(() => JSON.stringify(clean));
    assert.deepEqual(clean, escDraftData(clean));
});
