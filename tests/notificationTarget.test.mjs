import test from 'node:test';
import assert from 'node:assert/strict';
import { notificationFocusSearch } from '../src/features/notification/notificationTarget.js';

test('independent reply focus never becomes an ordinary message anchor', () => {
    const query = new URLSearchParams(notificationFocusSearch({ source: { messageId: 'source-reply' },
        actions: [{ type: 'open-conversation', focus: { kind: 'self-message', id: 'record/a+b' } }] }));
    assert.equal(query.get('focusSelfMessage'), 'record/a+b');
    assert.equal(query.has('focusMessage'), false);
});

test('ordinary notification message focus and unfocused conversation navigation stay unchanged', () => {
    assert.equal(notificationFocusSearch({ source: { messageId: 'reply id' } }), 'focusMessage=reply+id');
    assert.equal(notificationFocusSearch({ actions: [{ type: 'open-conversation' }] }), '');
});
