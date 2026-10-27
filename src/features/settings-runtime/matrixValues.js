/** Matrices edit a keyed view; storage metadata keeps the actual form value an
 * entry array when required by an API. Row identities are always literal keys. */
export function matrixValueMap(item, value) {
    const storage = item.valueStorage;
    if (!storage) return value || {};
    if (storage.type !== 'entries') throw new Error('不支持的矩阵存储格式。');
    if (value == null) return {};
    if (!Array.isArray(value)) throw new Error('矩阵条目值必须是数组。');
    return Object.fromEntries(value.map((entry) => {
        const key = entry?.[storage.keyField];
        if (typeof key !== 'string' || !key) throw new Error('矩阵条目缺少有效标识。');
        return [key, entry[storage.valueField]];
    }));
}

export function matrixStoredValue(item, next, previous) {
    const storage = item.valueStorage;
    if (!storage) return next;
    if (storage.type !== 'entries') throw new Error('不支持的矩阵存储格式。');
    const originals = new Map((previous || []).map((entry) => [entry[storage.keyField], entry]));
    return Object.entries(next)
        .filter(([, value]) => value !== undefined && (!Object.hasOwn(storage, 'unsetValue') || value !== storage.unsetValue))
        .map(([key, value]) => ({ ...originals.get(key), [storage.keyField]: key, [storage.valueField]: value }));
}

/** Unlisted saved identities remain visible and editable, rather than being
 * discarded when the currently available catalog changes. */
export function matrixRows(item, rows, values) {
    if (!item.unlistedRows) return rows;
    const declared = new Set(rows.map((row) => row.id));
    const extra = Object.keys(values).filter((key) => !declared.has(key)).map((key) => ({
        id: key, label: key, group: item.unlistedRows.group, description: item.unlistedRows.description,
    }));
    return [...rows, ...extra];
}
