import test from 'node:test';
import assert from 'node:assert/strict';
import { createSettingsSessionCache, settingsCacheEvents, settingsResourceCacheKey } from '../src/features/settings-runtime/sessionCache.js';

test('session entries are copied, isolated by owner, invalidated by events and disabled without persistence', () => {
    const events = new Map();
    const cache = createSettingsSessionCache((event, callback) => { events.set(event, callback); return () => events.delete(event); }, 'account-A');
    const other = createSettingsSessionCache(undefined, 'account-B');
    const original = { title: '原始快照' };
    cache.set('page', original, ['settings.changed']);
    original.title = '外部修改';
    const copy = cache.get('page'); copy.title = '读取方修改';
    assert.equal(cache.get('page').title, '原始快照');
    assert.equal(other.get('page'), undefined);
    events.get('settings.changed')();
    assert.equal(cache.get('page'), undefined);
    cache.set('page', original);
    cache.setEnabled(false);
    assert.equal(events.size, 0);
    cache.set('page', original);
    cache.setEnabled(true);
    assert.equal(cache.get('page'), undefined);
    cache.set('page', original);
    cache.clear();
    assert.equal(cache.get('page'), undefined);
});

test('resource identities include resolved source parameters and explicit cache opt out', () => {
    const item = { id: 'entries', source: { endpoint: '/entries/{form.owner}', params: { category: { $ref: 'form.category' } } } };
    const first = settingsResourceCacheKey(item, { form: { owner: 'A', category: 'one' } });
    assert.notEqual(first, settingsResourceCacheKey(item, { form: { owner: 'B', category: 'one' } }));
    assert.notEqual(first, settingsResourceCacheKey(item, { form: { owner: 'A', category: 'two' } }));
    assert.equal(settingsResourceCacheKey({ ...item, cache: false }, { form: {} }), null);
    assert.equal(settingsResourceCacheKey({ source: {} }, {}), null);
    assert.deepEqual(settingsCacheEvents({ events: [{ event: 'page.changed' }], options: [{ type: 'tabs', tabs: [{ options: [{ type: 'resource', events: ['rows.changed'] }] }] }] }), ['page.changed', 'rows.changed']);
});
