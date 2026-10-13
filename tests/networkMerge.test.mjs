import test from 'node:test';
import assert from 'node:assert/strict';
import {
    hasNetworkDatabaseConflict,
    mergeNetworkData,
    removeNetworkData,
} from '../src/features/chat/page/utils/networkMerge.js';

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

    assert.deepEqual(mergeNetworkData(oldNetwork, incoming), incoming);
    assert.deepEqual(mergeNetworkData({ nodes: oldNetwork.nodes }, incoming), incoming);
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

    assert.deepEqual(mergeNetworkData(oldNetwork, incoming), {
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
