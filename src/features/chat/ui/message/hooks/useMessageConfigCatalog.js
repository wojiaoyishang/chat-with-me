import {useCallback, useEffect, useSyncExternalStore} from 'react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

let snapshot = {items: null, loading: false, error: ''};
let request = null;
const listeners = new Set();
const subscribe = (callback) => { listeners.add(callback); return () => listeners.delete(callback); };
const getSnapshot = () => snapshot;
const publish = (next) => { snapshot = next; listeners.forEach(callback => callback()); };

const loadCatalog = () => {
    if (snapshot.items) return Promise.resolve(snapshot.items);
    if (request) return request;
    publish({...snapshot, loading: true, error: ''});
    request = Promise.resolve().then(() => apiClient.get(apiEndpoint.CHAT_MESSAGE_CONFIG_ENDPOINT))
        .then((response) => {
            if (!Array.isArray(response?.items)) throw new Error('Invalid message configuration catalog');
            const items = response.items.filter(item => item && typeof item.key === 'string' && item.type === 'boolean');
            publish({items, loading: false, error: ''});
            return items;
        }).catch((error) => {
            publish({items: null, loading: false, error: error?.message || 'Request failed'});
            return null;
        }).finally(() => { request = null; });
    return request;
};

/** One shared, lazy catalog for every message; failures can be retried explicitly. */
export default function useMessageConfigCatalog(enabled = false) {
    const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    useEffect(() => { if (enabled) void loadCatalog(); }, [enabled]);
    const retry = useCallback(() => { void loadCatalog(); }, []);
    return {...state, retry};
}
