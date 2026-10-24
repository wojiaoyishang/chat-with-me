import test from 'node:test';
import assert from 'node:assert/strict';
import {messageHintsBeforeActions, normalizeMessageBadges} from '../src/features/chat/ui/message/utils/messageBadgesModel.js';

test('backend badge normalization is stable, ordered and never derives badges from other settings', () => {
    const source = [
        {id: 'second', label: ' 第二项 ', icon: 'pin', tone: 'info', order: 20},
        {id: 'first', label: '第一项', order: 10},
        {id: 'tie', label: '同序后一项', order: 10},
        {id: 'first', label: '重复ID'},
        null, [], {id: 'empty', label: ' '}, {id: '', label: '无ID'},
    ];
    const normalized = normalizeMessageBadges(source);
    assert.deepEqual(normalized.map(item => item.id), ['first', 'tie', 'second']);
    assert.equal(normalized[2].label, '第二项');
    assert.equal(source[0].label, ' 第二项 ');
    assert.deepEqual(normalizeMessageBadges({compressible: false}), []);
    assert.deepEqual(normalizeMessageBadges(undefined), []);
    assert.deepEqual(normalizeMessageBadges([]), []);
});

test('explicit message roles take precedence over their visual alignment', () => {
    assert.equal(messageHintsBeforeActions({role: 'user', position: 'left'}), true);
    assert.equal(messageHintsBeforeActions({role: 'system', position: 'left'}), true);
    assert.equal(messageHintsBeforeActions({role: 'assistant', position: 'right'}), false);
    assert.equal(messageHintsBeforeActions({role: ' USER ', position: 'left'}), true);
    assert.equal(messageHintsBeforeActions({position: 'mid'}), true);
    assert.equal(messageHintsBeforeActions({position: 'right'}), true);
    assert.equal(messageHintsBeforeActions({position: 'left'}), false);
});
