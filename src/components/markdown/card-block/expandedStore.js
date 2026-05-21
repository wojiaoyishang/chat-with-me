const expandedMap = new Map();
const expandedUserOverrideMap = new Map();
const expandedListeners = new Map();

export const getExpandedKey = (contextId, id, type = '') => {
    const safeId = String(id || '');

    if (safeId) {
        return contextId ? `${contextId}::${safeId}` : safeId;
    }

    return contextId ? `${contextId}::__type__${type}` : `__type__${type}`;
};

export const subscribeExpanded = (expandedKey, listener) => {
    if (!expandedListeners.has(expandedKey)) {
        expandedListeners.set(expandedKey, new Set());
    }

    const listeners = expandedListeners.get(expandedKey);
    listeners.add(listener);

    return () => {
        listeners.delete(listener);

        if (listeners.size === 0) {
            expandedListeners.delete(expandedKey);
        }
    };
};

const notifyExpandedListeners = (expandedKey) => {
    const listeners = expandedListeners.get(expandedKey);

    if (!listeners) return;

    for (const listener of listeners) {
        listener();
    }
};

export const initializeExpandedValue = (expandedKey, defaultExpanded) => {
    if (!expandedMap.has(expandedKey)) {
        expandedMap.set(expandedKey, defaultExpanded === true);
    }
};

export const getExpandedValue = (expandedKey) => {
    return expandedMap.get(expandedKey) === true;
};

export const hasExpandedUserOverride = (expandedKey) => {
    return expandedUserOverrideMap.get(expandedKey) === true;
};

export const setExpandedValue = (expandedKey, value, options = {}) => {
    const {isUserAction = false} = options;
    const nextValue = value === true;
    const currentValue = expandedMap.get(expandedKey) === true;

    if (isUserAction) {
        expandedUserOverrideMap.set(expandedKey, true);
    }

    if (expandedMap.has(expandedKey) && currentValue === nextValue) {
        return;
    }

    expandedMap.set(expandedKey, nextValue);
    notifyExpandedListeners(expandedKey);
};

export const toggleExpandedValue = (expandedKey, options = {}) => {
    setExpandedValue(expandedKey, !getExpandedValue(expandedKey), options);
};
