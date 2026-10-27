import { useSyncExternalStore } from 'react';
import apiClient from '@/lib/apiClient.js';
import { backendStorageKey } from '../../runtime/backend/connection.js';

const CACHE_KEY = 'cwm-document-card-spec';
const STYLE_ATTRIBUTE = 'data-cwm-document-card-style';

function validSpec(value) {
    if (!value || typeof value !== 'object' || !Array.isArray(value.directives) || typeof value.css !== 'string') {
        return null;
    }
    return {
        version: String(value.version || ''),
        css: value.css,
        iconSymbols: value.iconSymbols && typeof value.iconSymbols === 'object' ? value.iconSymbols : {},
        features: value.features && typeof value.features === 'object' ? value.features : {},
        directives: value.directives.filter((directive) => /^study-[a-z-]+$/.test(directive?.name || '')),
    };
}

function cachedSpec() {
    try {
        return validSpec(JSON.parse(sessionStorage.getItem(backendStorageKey(CACHE_KEY, 'shared')) || 'null'));
    } catch {
        return null;
    }
}

let current = { spec: typeof window === 'undefined' ? null : cachedSpec(), loading: true, error: null };
let request = null;
const listeners = new Set();

function notify() {
    for (const listener of listeners) listener();
}

function applyStyle(spec) {
    if (!spec || typeof document === 'undefined') return;
    let style = document.querySelector(`style[${STYLE_ATTRIBUTE}]`);
    if (!style) {
        style = document.createElement('style');
        style.setAttribute(STYLE_ATTRIBUTE, spec.version);
        document.head.appendChild(style);
    }
    if (style.textContent !== spec.css) style.textContent = spec.css;
    style.setAttribute(STYLE_ATTRIBUTE, spec.version);
}

if (current.spec) applyStyle(current.spec);

function ensureLoaded() {
    if (request) return;
    request = apiClient.get('/document/card-spec')
        .then((response) => {
            const spec = validSpec(response);
            if (!spec) throw new Error('文档卡片定义无效');
            try {
                sessionStorage.setItem(backendStorageKey(CACHE_KEY, 'shared'), JSON.stringify(spec));
            } catch {
                // Private browsing and exhausted storage must not block preview.
            }
            applyStyle(spec);
            current = { spec, loading: false, error: null };
            notify();
        })
        .catch((error) => {
            request = null;
            current = { ...current, loading: false, error };
            notify();
        });
}

function subscribe(listener) {
    listeners.add(listener);
    ensureLoaded();
    return () => listeners.delete(listener);
}

function snapshot() {
    return current;
}

const EMPTY_STATE = { spec: null, loading: false, error: null };
const serverSnapshot = () => EMPTY_STATE;
const noSubscribe = () => () => {};

export function useDocumentCardSpec(enabled = true) {
    const state = useSyncExternalStore(enabled ? subscribe : noSubscribe, snapshot, serverSnapshot);
    return enabled ? state : EMPTY_STATE;
}
