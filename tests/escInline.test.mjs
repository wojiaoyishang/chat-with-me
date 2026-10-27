import test from 'node:test';
import assert from 'node:assert/strict';
import { EditorState } from '@codemirror/state';
import { JSDOM } from 'jsdom';
import { Awareness } from 'y-protocols/awareness';
import { aiCursorDecorations } from '../src/features/documents/aiCursorDecorations.js';
import { applyRemoteState, toBase64 } from '../src/features/documents/sync.js';

async function cursorEditor(doc) {
    const dom = new JSDOM('<div id="editor"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
    const keys = ['window', 'Window', 'document', 'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame'];
    const previous = keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]);
    for (const key of keys) globalThis[key] = dom.window[key];
    const [{ EditorView }, { yCollab }] = await Promise.all([import('@codemirror/view'), import('y-codemirror.next')]);
    const text = doc.getText('content');
    const awareness = new Awareness(doc);
    const [cursorPlugin, theme] = aiCursorDecorations(awareness);
    const editor = new EditorView({ parent: document.getElementById('editor'), state: EditorState.create({ doc: text.toString(), extensions: [yCollab(text, null), cursorPlugin, theme] }) });
    const position = index => Y.relativePositionToJSON(Y.createRelativePositionFromTypeIndex(text, index));
    return { editor, awareness, text, cursorPlugin, setCursor: async (anchor, head) => {
        awareness.setLocalState({ user: { kind: 'ai', name: 'AI', color: '#6366f1' }, aiCursor: { anchor: position(anchor), head: position(head) } });
        await Promise.resolve();
    }, close: () => {
        editor.destroy(); awareness.destroy(); dom.window.close();
        for (const [key, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    } };
}

test('streaming AI cursors decorate relative insertion points without storing a virtual draft', async () => {
    const doc = new Y.Doc(); doc.getText('content').insert(0, 'before after');
    const ui = await cursorEditor(doc);
    try {
        await ui.setCursor(7, 7);
        assert.equal(ui.editor.state.doc.toString(), 'before after');
        assert.equal(ui.text.toString(), 'before after');
        assert.equal(document.querySelector('.cm-ai-caret').getAttribute('aria-label'), 'AI 光标：AI');
        const locations = () => {
            const result = [];
            ui.editor.plugin(ui.cursorPlugin).decorations.between(0, ui.text.length, from => result.push(from));
            return result;
        };
        assert.deepEqual(locations(), [7]);
        ui.editor.dispatch({ changes: { from: 0, insert: 'new ' } });
        assert.deepEqual(locations(), [11]);
        ui.awareness.setLocalState(null); await Promise.resolve();
        assert.equal(ui.editor.plugin(ui.cursorPlugin).decorations.size, 0);
        assert.equal(ui.editor.state.doc.toString(), 'new before after');
        assert.equal(ui.text.toString(), 'new before after');
    } finally { ui.close(); doc.destroy(); }
});
test('streamed document updates write once while AI selection and caret remain out of band', async () => {
    const server = new Y.Doc(); server.getText('content').insert(0, 'oldtail');
    const doc = new Y.Doc(); applyRemoteState(doc, toBase64(Y.encodeStateAsUpdate(server)));
    const ui = await cursorEditor(doc);
    try {
        let updates = 0; doc.on('update', () => { updates += 1; });
        server.getText('content').insert(3, 'DRAFT');
        const update = Y.encodeStateAsUpdate(server, Y.encodeStateVector(doc));
        // Live edit events and repeated synchronization acknowledgements share
        // CRDT items and never render a second draft copy.
        Y.applyUpdate(doc, update, 'document-edit');
        applyRemoteState(doc, toBase64(update));
        await ui.setCursor(3, 8);
        assert.equal(updates, 1);
        assert.equal(ui.text.toString(), 'oldDRAFTtail');
        assert.equal(ui.editor.state.doc.toString(), 'oldDRAFTtail');
        assert.equal(document.querySelector('.cm-ai-selection').textContent, 'DRAFT');
        assert.equal(document.querySelectorAll('.cm-ai-caret').length, 1);
        await ui.setCursor(8, 8);
        assert.equal(document.querySelector('.cm-ai-selection'), null);
        assert.equal(ui.text.toString(), 'oldDRAFTtail');
        assert.equal(updates, 1, 'cursor-only presence must never write document text');
    } finally { ui.close(); doc.destroy(); server.destroy(); }
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

test('HTTP synchronization persists CRDT content without circular transport metadata', () => {
    const server = new Y.Doc(); server.getText('content').insert(0, 'remaining');
    const data = {state: toBase64(Y.encodeStateAsUpdate(server)), revision: 1};
    data._response = {data: {data}};
    const doc = new Y.Doc();
    try {
        // useCollaborativeDocument projects data.state into the shared document,
        // keeping Axios metadata out of the persistent collaboration data.
        applyRemoteState(doc, data.state);
        applyRemoteState(doc, data.state);
        assert.equal(doc.getText('content').toString(), 'remaining');
        assert.equal(doc.toJSON()._response, undefined);
        assert.doesNotThrow(() => JSON.stringify(doc.toJSON()));
        assert.deepEqual(doc.toJSON(), {content: 'remaining'});
    } finally { doc.destroy(); server.destroy(); }
});

test('AI marked text participates in ordinary editing and undo', () => {
    const doc = new Y.Doc(); const text = doc.getText('content'); text.insert(0, 'old');
    const undo = new Y.UndoManager(text);
    text.insert(3, 'draft', {esc:'s'}); undo.stopCapturing();
    text.delete(4, 2); undo.stopCapturing();
    assert.equal(text.toString(), 'olddft');
    undo.undo(); assert.equal(text.toString(), 'olddraft');
    text.insert(4, 'H', {esc:null});
    assert.equal(text.toDelta().filter(part => part.attributes?.esc === 's').length, 2);
    undo.destroy(); doc.destroy();
});
