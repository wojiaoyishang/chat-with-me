import {create} from 'zustand';

import apiClient from '@/lib/apiClient.js';

const MODAL_SCHEMA = 'cwm.modal.v1';
const CWM_MODAL_PREFIX = 'cwm://modal/';

const decodeBase64UrlJson = (value) => {
    try {
        const normalized = String(value || '')
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
        const binary = atob(padded);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const text = new TextDecoder().decode(bytes);
        return JSON.parse(text);
    } catch {
        return null;
    }
};

const normalizeDescriptor = (value) => {
    const descriptor = value?.modal && typeof value.modal === 'object' ? value.modal : value;
    if (descriptor && typeof descriptor === 'object' && descriptor.schema === MODAL_SCHEMA) {
        return descriptor;
    }

    // Remote endpoints that have not adopted the modal descriptor contract yet
    // still remain inspectable without adding a feature-specific frontend dialog.
    return {
        schema: MODAL_SCHEMA,
        title: '服务器信息',
        description: '该接口尚未提供专用弹窗描述，以下为原始返回数据。',
        size: 'lg',
        blocks: [{
            type: 'code',
            language: 'json',
            content: JSON.stringify(value ?? null, null, 2),
        }],
    };
};

const useUniversalModalStore = create((set, get) => ({
    open: false,
    loading: false,
    descriptor: null,
    error: '',
    requestId: 0,

    close: () => set(state => ({
        open: false,
        loading: false,
        error: '',
        requestId: state.requestId + 1,
    })),

    openDescriptor: (descriptor) => set(state => ({
        open: true,
        loading: false,
        descriptor: normalizeDescriptor(descriptor),
        error: '',
        requestId: state.requestId + 1,
    })),

    openRemote: async ({endpoint, params = {}, method = 'get'}) => {
        const safeEndpoint = String(endpoint || '').trim();
        if (!safeEndpoint || !safeEndpoint.startsWith('/') || safeEndpoint.includes('://') || safeEndpoint.includes('..')) {
            set({
                open: true,
                loading: false,
                descriptor: null,
                error: '弹窗数据地址无效。',
            });
            return;
        }

        const requestId = get().requestId + 1;
        set({
            open: true,
            loading: true,
            descriptor: null,
            error: '',
            requestId,
        });

        try {
            const lowerMethod = String(method || 'get').toLowerCase();
            const payload = lowerMethod === 'post'
                ? await apiClient.post(safeEndpoint, params)
                : await apiClient.get(safeEndpoint, {params});

            if (get().requestId !== requestId) return;
            set({
                loading: false,
                descriptor: normalizeDescriptor(payload),
                error: '',
            });
        } catch (error) {
            if (get().requestId !== requestId) return;
            set({
                loading: false,
                descriptor: null,
                error: error?.message || '无法加载弹窗内容。',
            });
        }
    },
}));

export const isUniversalModalLink = (href) => {
    return typeof href === 'string' && href.trim().toLowerCase().startsWith(CWM_MODAL_PREFIX);
};

export const parseUniversalModalLink = (href) => {
    if (!isUniversalModalLink(href)) return null;

    try {
        const url = new URL(String(href).trim());
        if (url.protocol !== 'cwm:' || url.hostname.toLowerCase() !== 'modal') return null;

        const segments = url.pathname.split('/').filter(Boolean);
        const mode = String(segments[0] || '').toLowerCase();
        const payload = decodeBase64UrlJson(segments[1] || '');
        if (!payload || typeof payload !== 'object') return null;

        if (mode === 'inline') {
            return {mode: 'inline', descriptor: payload};
        }

        if (mode === 'fetch') {
            const endpoint = String(payload.endpoint || '').trim();
            if (!endpoint.startsWith('/') || endpoint.includes('://') || endpoint.includes('..')) return null;
            if (String(payload.method || 'get').toLowerCase() !== 'get') return null;
            return {
                mode: 'fetch',
                endpoint,
                params: payload.params && typeof payload.params === 'object' ? payload.params : {},
                method: 'get',
            };
        }
    } catch {
        return null;
    }

    return null;
};

export const openUniversalModal = (descriptor) => {
    useUniversalModalStore.getState().openDescriptor(descriptor);
};

export const openRemoteUniversalModal = (endpoint, params = {}, options = {}) => {
    return useUniversalModalStore.getState().openRemote({
        endpoint,
        params,
        method: options.method || 'get',
    });
};

export const openUniversalModalLink = (href) => {
    const parsed = parseUniversalModalLink(href);
    if (!parsed) return false;

    if (parsed.mode === 'inline') {
        openUniversalModal(parsed.descriptor);
    } else {
        openRemoteUniversalModal(parsed.endpoint, parsed.params, {method: parsed.method});
    }
    return true;
};

export {MODAL_SCHEMA, useUniversalModalStore};
