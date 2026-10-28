import { cloneData, requestEndpoint, resolveValue, settingsChildFields } from './model.js';

export function settingsCacheEvents(descriptor) {
    const events = new Set();
    const visit = (item) => {
        if (!item || typeof item !== 'object') return;
        for (const entry of item?.events || []) {
            const event = typeof entry === 'string' ? entry : entry.event;
            if (event) events.add(event);
        }
        const children = settingsChildFields(item);
        if (Array.isArray(children)) for (const child of children) visit(child);
    };
    visit(descriptor);
    return [...events];
}

/** Private to one settings window and connection/user; never persisted to disk. */
export function createSettingsSessionCache(subscribe = () => () => {}, scope = '') {
    const entries = new Map();
    const subscriptions = new Map();
    let enabled = true;
    const clear = () => { entries.clear(); for (const off of subscriptions.values()) off?.(); subscriptions.clear(); };
    return {
        scope,
        get: (key) => enabled && key ? cloneData(entries.get(key)?.value) : undefined,
        set(key, value, events = []) {
            if (!enabled || !key) return;
            const tags = new Set((Array.isArray(events) ? events : []).map((entry) => typeof entry === 'string' ? entry : entry?.event).filter(Boolean));
            entries.set(key, { value: cloneData(value), tags });
            for (const event of tags) if (!subscriptions.has(event)) subscriptions.set(event, subscribe(event, () => {
                for (const [identity, entry] of entries) if (entry.tags.has(event)) entries.delete(identity);
            }));
        },
        invalidate: (key) => entries.delete(key),
        invalidateEvents(events = []) {
            const tags = new Set(events);
            for (const [identity, entry] of entries) if ([...entry.tags].some((tag) => tags.has(tag))) entries.delete(identity);
        },
        clear,
        setEnabled(value) { enabled = Boolean(value); if (!enabled) clear(); },
    };
}

export function settingsResourceCacheKey(item, scope) {
    if (item.cache === false) return null;
    try {
        const source = item.source || {};
        const endpoint = source.endpoint?.startsWith('client:') ? source.endpoint : requestEndpoint(source.endpoint, scope);
        return `resource:${JSON.stringify([item.id || item.name, endpoint, resolveValue(source.params, scope), source.listPath || '', scope.parentItem?.id])}`;
    } catch { return null; }
}
