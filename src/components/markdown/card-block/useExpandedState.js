import { useCallback, useSyncExternalStore } from 'react';

import {
    getExpandedValue,
    initializeExpandedValue,
    setExpandedValue,
    subscribeExpanded,
} from './expandedStore.js';

const useExpandedState = (expandedKey, defaultExpanded = false) => {
    initializeExpandedValue(expandedKey, defaultExpanded);

    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    const setIsExpanded = useCallback((nextValueOrUpdater, options = {}) => {
        const currentValue = getExpandedValue(expandedKey);

        const nextValue = typeof nextValueOrUpdater === 'function'
            ? nextValueOrUpdater(currentValue)
            : nextValueOrUpdater;

        setExpandedValue(expandedKey, nextValue, options);
    }, [expandedKey]);

    return [isExpanded, setIsExpanded];
};

export default useExpandedState;
