// 知识图谱流式合并工具
// 说明：流式过程中 message.created 可能会携带较短的 network 快照。
// 如果直接浅合并，会把已经追加出来的节点/关系覆盖掉，导致图谱闪现后消失。
export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj || {}, key);

export const getNodeMergeKey = (node) => {
    if (!node || typeof node !== 'object') return null;
    const key = node.id ?? node.name;
    return key === undefined || key === null || key === '' ? null : String(key);
};

export const getRelationshipMergeKey = (rel) => {
    if (!rel || typeof rel !== 'object') return null;

    if (rel.id !== undefined && rel.id !== null && rel.id !== '') {
        return String(rel.id);
    }

    const from = rel.from ?? rel.source;
    const to = rel.to ?? rel.target;

    if (from === undefined || from === null || to === undefined || to === null) {
        return null;
    }

    const type = rel.type ?? rel.label ?? '';
    return `${String(from)}__${String(to)}__${String(type)}`;
};

export const upsertArrayByKey = (current = [], incoming = [], getKey) => {
    const result = [];
    const indexByKey = new Map();

    const appendOrMerge = (item) => {
        if (!item || typeof item !== 'object') return;

        const key = getKey(item);
        if (!key) return;

        if (indexByKey.has(key)) {
            const index = indexByKey.get(key);
            result[index] = {...result[index], ...item};
        } else {
            indexByKey.set(key, result.length);
            result.push(item);
        }
    };

    (Array.isArray(current) ? current : []).forEach(appendOrMerge);
    (Array.isArray(incoming) ? incoming : []).forEach(appendOrMerge);

    return result;
};

export const normalizeNetworkData = (network) => {
    if (!network || typeof network !== 'object') return {};

    const normalized = {...network};

    // 兼容后端/旧代码可能传 relationship 单数字段的情况。
    if (normalized.relationships === undefined && normalized.relationship !== undefined) {
        normalized.relationships = normalized.relationship;
    }

    delete normalized.relationship;
    return normalized;
};

export const networkDatabaseId = network => String(network?.databaseId || network?.database?.databaseId || network?.database?.id || 'default');

export const hasNetworkDatabaseConflict = (network, update) => Boolean(
    (update?.databaseId || update?.database?.databaseId || update?.database?.id) && networkDatabaseId(update) !== networkDatabaseId(network)
);

const mergeScope = (oldNetwork, incomingNetwork) => {
    const old = normalizeNetworkData(oldNetwork), incoming = normalizeNetworkData(incomingNetwork);
    const merged = { ...old, ...incoming };
    delete merged.databaseViews;
    if (hasOwn(incoming, 'nodes')) merged.nodes = upsertArrayByKey(old.nodes, incoming.nodes, getNodeMergeKey);
    if (hasOwn(incoming, 'relationships')) merged.relationships = upsertArrayByKey(old.relationships, incoming.relationships, getRelationshipMergeKey);
    return merged;
};

// The top-level graph follows the AI. Each retained view belongs to one database;
// neither matching IDs nor the user's manual view selection may cross that boundary.
export const networkDatabaseViews = network => {
    const result = new Map();
    for (const [id, view] of Object.entries(network?.databaseViews || {})) {
        if (!view || typeof view !== 'object' || Array.isArray(view)) continue;
        result.set(id, { ...mergeScope(undefined, view), databaseId: id });
    }
    if (network && (hasOwn(network, 'nodes') || hasOwn(network, 'relationships') || hasOwn(network, 'relationship'))) {
        const id = networkDatabaseId(network);
        // The top level is already a full current graph. Its arrays replace any
        // older archived copies, including an intentionally empty graph.
        result.set(id, { ...result.get(id), ...mergeScope(undefined, network), databaseId: id });
    }
    return Object.fromEntries(result);
};

export const mergeNetworkData = (oldNetwork, incomingNetwork) => {
    const normalizedOld = normalizeNetworkData(oldNetwork);
    const normalizedIncoming = normalizeNetworkData(incomingNetwork);
    if (oldNetwork && !normalizedIncoming.databaseId && !normalizedIncoming.database) normalizedIncoming.databaseId = networkDatabaseId(normalizedOld);

    const databaseViews = new Map(Object.entries(networkDatabaseViews(normalizedOld)));
    // Saved databaseViews are complete snapshots, while top-level WebSocket
    // patches are incremental. Replacing snapshots prevents deleted nodes from
    // reappearing when an archived database is refreshed.
    const incomingViews = networkDatabaseViews({ databaseViews: normalizedIncoming.databaseViews });
    for (const [id, view] of Object.entries(incomingViews)) {
        databaseViews.set(id, view);
    }
    const id = hasNetworkDatabaseConflict(normalizedOld, normalizedIncoming) ? networkDatabaseId(normalizedIncoming) : networkDatabaseId({ ...normalizedOld, ...normalizedIncoming });
    const base = hasOwn(incomingViews, id) || hasNetworkDatabaseConflict(normalizedOld, normalizedIncoming) ? databaseViews.get(id) : normalizedOld;
    const merged = mergeScope(base, normalizedIncoming);
    if (hasOwn(merged, 'nodes') || hasOwn(merged, 'relationships')) databaseViews.set(id, { ...mergeScope(undefined, merged), databaseId: id });
    return databaseViews.size ? { ...merged, databaseViews: Object.fromEntries(databaseViews) } : merged;
};

export const removeNetworkData = (network, removal) => {
    if (!network || !removal || typeof removal !== 'object') return network;
    if (hasNetworkDatabaseConflict(network, removal)) return network;

    const normalizedRemoval = normalizeNetworkData(removal);
    const result = {...network};

    if (normalizedRemoval.nodes !== undefined) {
        const keys = toDeleteKeySet(normalizedRemoval.nodes, getNodeMergeKey);
        if (Array.isArray(result.nodes) && keys.size > 0) {
            result.nodes = result.nodes.filter(node => !keys.has(getNodeMergeKey(node)));
        }
    }

    if (normalizedRemoval.relationships !== undefined) {
        const keys = toDeleteKeySet(normalizedRemoval.relationships, getRelationshipMergeKey);
        if (Array.isArray(result.relationships) && keys.size > 0) {
            result.relationships = result.relationships.filter(rel => !keys.has(getRelationshipMergeKey(rel)));
        }
    }

    if (network.databaseViews) {
        const id = networkDatabaseId(network);
        result.databaseViews = { ...network.databaseViews, [id]: { ...mergeScope(undefined, result), databaseId: id } };
    }
    return result;
};

export const toDeleteKeySet = (items, getObjectKey) => {
    return new Set(
        (Array.isArray(items) ? items : [])
            .map(item => {
                if (item && typeof item === 'object') return getObjectKey(item);
                return item === undefined || item === null || item === '' ? null : String(item);
            })
            .filter(Boolean)
    );
};
