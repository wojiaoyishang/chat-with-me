import test from 'node:test';
import assert from 'node:assert/strict';
import {
    hasNetworkDatabaseConflict,
    mergeNetworkData,
    networkDatabaseViews,
    removeNetworkData,
} from '../src/features/chat/page/utils/networkMerge.js';
import { mergeLiveMessageWithSnapshot } from '../src/features/chat/page/utils/liveMessageReconcile.js';

test('switching databases replaces the graph even when node and relationship IDs overlap', () => {
    const oldNetwork = {
        databaseId: 'library-a',
        nodes: [{ id: '1', name: 'A' }, { id: '2', name: 'Only A' }],
        relationships: [{ id: 'r1', from: '1', to: '2', type: 'A' }],
    };
    const incoming = {
        databaseId: 'library-b',
        nodes: [{ id: '1', name: 'B' }],
        relationships: [{ id: 'r1', from: '1', to: '3', type: 'B' }],
    };

    const merged = mergeNetworkData(oldNetwork, incoming);
    assert.deepEqual({ ...merged, databaseViews: undefined }, { ...incoming, databaseViews: undefined });
    assert.deepEqual(merged.databaseViews['library-a'], oldNetwork);
    assert.deepEqual(merged.databaseViews['library-b'], incoming);
    const legacy = mergeNetworkData({ nodes: oldNetwork.nodes }, incoming);
    assert.deepEqual(legacy.nodes, incoming.nodes);
    assert.deepEqual(legacy.databaseViews.default.nodes, oldNetwork.nodes);
});

test('updates in the same database append without replacing earlier streamed graph data', () => {
    const oldNetwork = {
        databaseId: 'library-a',
        nodes: [{ id: '1', name: 'Original' }],
        relationships: [{ id: 'r1', from: '1', to: '2' }],
    };
    const incoming = {
        databaseId: 'library-a',
        nodes: [{ id: '1', description: 'Updated' }, { id: '2', name: 'Added' }],
        relationships: [{ id: 'r2', from: '2', to: '1' }],
    };

    const merged = mergeNetworkData(oldNetwork, incoming);
    assert.deepEqual({ ...merged, databaseViews: undefined }, {
        databaseViews: undefined,
        databaseId: 'library-a',
        nodes: [
            { id: '1', name: 'Original', description: 'Updated' },
            { id: '2', name: 'Added' },
        ],
        relationships: [
            { id: 'r1', from: '1', to: '2' },
            { id: 'r2', from: '2', to: '1' },
        ],
    });
    assert.deepEqual(mergeNetworkData(oldNetwork, { nodes: [{ id: '2', name: 'Legacy update' }] }).nodes, [
        { id: '1', name: 'Original' },
        { id: '2', name: 'Legacy update' },
    ]);
});

test('empty AI scope events retain each database and restore its earlier results on return', () => {
    const original = { databaseId: 'library-a', nodes: [{ id: 'same', name: 'A' }], relationships: [] };
    const switched = mergeNetworkData(original, { databaseId: 'library-b', nodes: [], relationships: [] });
    assert.equal(switched.databaseId, 'library-b'); assert.deepEqual(switched.nodes, []);
    assert.deepEqual(switched.databaseViews['library-a'], original);
    const populated = mergeNetworkData(switched, { nodes: [{ id: 'same', name: 'B' }] });
    assert.equal(populated.nodes[0].name, 'B'); assert.equal(populated.databaseViews['library-a'].nodes[0].name, 'A');
    assert.deepEqual(Object.keys(populated.databaseViews).sort(), ['library-a', 'library-b'], 'legacy patches inherit the current scope');
    const back = mergeNetworkData(populated, { databaseId: 'library-a', nodes: [], relationships: [] });
    assert.equal(back.nodes[0].name, 'A'); assert.equal(back.databaseViews['library-b'].nodes[0].name, 'B');
    assert.deepEqual(original, { databaseId: 'library-a', nodes: [{ id: 'same', name: 'A' }], relationships: [] });
});

test('historical database views merge without swallowing new streamed results or nesting caches', () => {
    const stream = mergeNetworkData(undefined, { databaseId: 'library-a', nodes: [{ id: 'new', name: '刚到达' }], relationships: [] });
    const history = { databaseId: 'library-a', nodes: [{ id: 'old', name: '较短快照' }], relationships: [], databaseViews: { 'library-b': { databaseId: 'library-b', nodes: [{ id: 'new', name: '其他库同名 ID' }], relationships: [] } } };
    const merged = mergeNetworkData(stream, history), views = networkDatabaseViews(merged);
    assert.deepEqual(views['library-a'].nodes.map(node => node.id), ['new', 'old']);
    assert.equal(views['library-b'].nodes[0].name, '其他库同名 ID');
    assert.ok(Object.values(views).every(view => !view.databaseViews));
    const removed = removeNetworkData(merged, { databaseId: 'library-a', nodes: ['new'] });
    assert.deepEqual(networkDatabaseViews(removed)['library-a'].nodes.map(node => node.id), ['old']);
    assert.equal(networkDatabaseViews(removed)['library-b'].nodes[0].id, 'new');
});

test('complete archived snapshots replace deletions including an intentionally empty scope', () => {
    const old = mergeNetworkData({ databaseId: 'library-a', nodes: [{ id: 'deleted', name: '旧' }], relationships: [] }, { databaseId: 'library-b', nodes: [{ id: 'kept', name: 'B' }], relationships: [] });
    const refreshed = mergeNetworkData(old, { databaseId: 'library-b', nodes: [{ id: 'kept', name: 'B' }], relationships: [], databaseViews: { 'library-a': { databaseId: 'library-a', nodes: [], relationships: [] } } });
    assert.deepEqual(networkDatabaseViews(refreshed)['library-a'].nodes, []);
    assert.deepEqual(mergeNetworkData(refreshed, { databaseId: 'library-a', nodes: [], relationships: [] }).nodes, []);
    const currentDeleted = mergeNetworkData(refreshed, { databaseId: 'library-b', nodes: [], relationships: [], databaseViews: { 'library-b': { databaseId: 'library-b', nodes: [], relationships: [] } } });
    assert.deepEqual(currentDeleted.nodes, []);
});

test('scope identifiers are safe own keys even when a legacy database is named __proto__', () => {
    const archive = JSON.parse('{"__proto__":{"databaseId":"__proto__","nodes":[{"id":"owned"}],"relationships":[]}}');
    const merged = mergeNetworkData(undefined, { databaseId: 'library-b', nodes: [], relationships: [], databaseViews: archive });
    const views = networkDatabaseViews(merged);
    assert.ok(Object.hasOwn(views, '__proto__')); assert.equal(views.__proto__.nodes[0].id, 'owned');
    assert.equal(Object.getPrototypeOf(views), Object.prototype);
    assert.equal(mergeNetworkData(merged, { databaseId: '__proto__', nodes: [], relationships: [] }).nodes[0].id, 'owned');
});

test('a lagging durable message snapshot cannot roll back the latest live AI database scope', () => {
    const live = { id: 'msg', network: mergeNetworkData({ databaseId: 'library-a', nodes: [{ id: 'a' }], relationships: [] }, { databaseId: 'library-b', nodes: [{ id: 'b' }], relationships: [] }) };
    const snapshot = { id: 'msg', network: { databaseId: 'library-a', nodes: [{ id: 'a' }], relationships: [], databaseViews: { 'library-a': { databaseId: 'library-a', nodes: [{ id: 'a' }], relationships: [] } } } };
    const merged = mergeLiveMessageWithSnapshot(snapshot, live);
    assert.equal(merged.network.databaseId, 'library-b'); assert.deepEqual(merged.network.nodes, [{ id: 'b' }]);
    assert.deepEqual(networkDatabaseViews(merged.network)['library-a'].nodes, [{ id: 'a' }]);
});

test('deletions from another database leave the visible graph unchanged', () => {
    const network = {
        databaseId: 'library-a',
        nodes: [{ id: '1' }, { id: '2' }],
        relationships: [{ id: 'r1', from: '1', to: '2' }],
    };

    assert.equal(removeNetworkData(network, { databaseId: 'library-b', nodes: ['1'], relationships: ['r1'] }), network);
    assert.deepEqual(removeNetworkData(network, { databaseId: 'library-a', nodes: ['1'], relationships: ['r1'] }), {
        databaseId: 'library-a',
        nodes: [{ id: '2' }],
        relationships: [],
    });
    assert.deepEqual(removeNetworkData(network, { nodes: ['2'] }).nodes, [{ id: '1' }]);
});

test('database-scoped focus ignores another graph and accepts legacy node arrays', () => {
    const network = { databaseId: 'library-a', nodes: [{ id: '1' }] };
    assert.equal(hasNetworkDatabaseConflict(network, { databaseId: 'library-b', nodeIds: ['1'] }), true);
    assert.equal(hasNetworkDatabaseConflict(network, { databaseId: 'library-a', nodeIds: ['1'] }), false);
    assert.equal(hasNetworkDatabaseConflict(network, ['1']), false);
});
