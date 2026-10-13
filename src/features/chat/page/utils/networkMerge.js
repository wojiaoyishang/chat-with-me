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

export const hasNetworkDatabaseConflict = (network, update) => Boolean(
    update?.databaseId && update.databaseId !== (network?.databaseId || 'default')
);

export const mergeNetworkData = (oldNetwork, incomingNetwork) => {
    const normalizedOld = normalizeNetworkData(oldNetwork);
    const normalizedIncoming = normalizeNetworkData(incomingNetwork);

    // A message can receive knowledge updates from another database after the
    // user switches scope. Node and relationship IDs are only unique per DB.
    if (hasNetworkDatabaseConflict(normalizedOld, normalizedIncoming)) {
        return normalizedIncoming;
    }

    const merged = {...normalizedOld, ...normalizedIncoming};

    if (hasOwn(normalizedIncoming, 'nodes')) {
        merged.nodes = upsertArrayByKey(
            normalizedOld.nodes || [],
            normalizedIncoming.nodes || [],
            getNodeMergeKey
        );
    }

    if (hasOwn(normalizedIncoming, 'relationships')) {
        merged.relationships = upsertArrayByKey(
            normalizedOld.relationships || [],
            normalizedIncoming.relationships || [],
            getRelationshipMergeKey
        );
    }

    return merged;
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
