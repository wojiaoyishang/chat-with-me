import test from 'node:test';
import assert from 'node:assert/strict';
import * as Y from 'yjs';
import {resolveAiCursors} from '../src/features/documents/aiCursor.js';
test('online AI caret stays relative through local edits and advances on new position', () => {
    const doc = new Y.Doc(); const text = doc.getText('content'); text.insert(0, '中文😀末尾');
    const cache = new Map();
    let person = {clientId:7, kind:'ai', absoluteCursor:{anchor:3,head:3,revision:1}};
    let row = resolveAiCursors(doc,[person],cache)[0];
    assert.equal(Y.createAbsolutePositionFromRelativePosition(Y.createRelativePositionFromJSON(row.cursor.head),doc).index, 4);
    text.insert(0,'A');
    row = resolveAiCursors(doc,[person],cache)[0];
    assert.equal(Y.createAbsolutePositionFromRelativePosition(Y.createRelativePositionFromJSON(row.cursor.head),doc).index, 5);
    person = {...person, absoluteCursor:{anchor:0,head:0,revision:2}};
    row = resolveAiCursors(doc,[person],cache)[0];
    assert.equal(Y.createAbsolutePositionFromRelativePosition(Y.createRelativePositionFromJSON(row.cursor.head),doc).index, 0);
    doc.destroy();
});
