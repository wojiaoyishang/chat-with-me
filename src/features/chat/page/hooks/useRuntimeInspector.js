import {useCallback, useEffect, useRef, useState} from 'react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

const TAB_SECTION_QUERY = Object.freeze({
    'model-request': 'model-calls',
    context: 'context',
    'raw-messages': 'raw-messages',
    tools: 'tools',
});

const isCancelledRequest = (error) => (
    error?.code === 'ERR_CANCELED'
    || error?.name === 'CanceledError'
    || error?.name === 'AbortError'
);

const mergeTabSection = (document, tabId, section) => {
    if (!document || !tabId || !section) return document;
    return {
        ...document,
        tabs: (document.tabs || []).map(tab => (
            tab.id === tabId
                ? {...tab, section: {...(tab.section || {}), ...section}}
                : tab
        )),
    };
};

const mergeModelCall = (document, tabId, modelCall) => {
    if (!document || !modelCall?.modelCallId) return document;
    return {
        ...document,
        tabs: (document.tabs || []).map(tab => {
            if (tab.id !== tabId) return tab;
            const section = tab.section || {};
            const calls = Array.isArray(section.modelCalls) ? section.modelCalls : [];
            const index = calls.findIndex(item => item?.modelCallId === modelCall.modelCallId);
            const nextCalls = [...calls];
            if (index >= 0) {
                nextCalls[index] = {...nextCalls[index], ...modelCall};
            } else {
                nextCalls.push(modelCall);
            }
            return {...tab, section: {...section, modelCalls: nextCalls}};
        }),
    };
};

/**
 * Runtime Inspector is deliberately isolated from the chat WebSocket lifecycle.
 *
 * The controller owns cancellable HTTP reads and lazy section caches. ChatPage only
 * keeps a stable `isOpenRef` / `markStale` handle inside its event listener, so
 * opening or closing the dialog can never unsubscribe that listener or invalidate
 * already queued message delta callbacks.
 */
export default function useRuntimeInspector(conversationId) {
    const [open, setOpen] = useState(false);
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [stale, setStale] = useState(false);
    const [activeTab, setActiveTab] = useState('brief');
    const [modelCallLoadingId, setModelCallLoadingId] = useState('');
    const [toolCallLoadingId, setToolCallLoadingId] = useState('');

    const isOpenRef = useRef(false);
    const documentRef = useRef(null);
    const activeTabRef = useRef('brief');
    const abortControllerRef = useRef(null);
    const requestVersionRef = useRef(0);

    const updateDocument = useCallback((updater) => {
        setDocument(current => {
            const next = typeof updater === 'function' ? updater(current) : updater;
            documentRef.current = next;
            return next;
        });
    }, []);

    const abortRequest = useCallback(() => {
        requestVersionRef.current += 1;
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;
        setLoading(false);
        setModelCallLoadingId('');
        setToolCallLoadingId('');
    }, []);

    const requestSection = useCallback(async ({
        section,
        focusMessageId = null,
        modelCallId = null,
        silent = false,
    }) => {
        if (!conversationId) return null;

        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const requestVersion = requestVersionRef.current + 1;
        requestVersionRef.current = requestVersion;
        if (!silent) setLoading(true);
        setError('');

        try {
            const data = await apiClient.get(apiEndpoint.CHAT_RUNTIME_INSPECTOR_ENDPOINT, {
                signal: controller.signal,
                params: {
                    conversationId,
                    section,
                    ...(focusMessageId ? {focusMessageId} : {}),
                    ...(modelCallId ? {modelCallId} : {}),
                },
            });
            if (requestVersion !== requestVersionRef.current || controller.signal.aborted) return null;
            return data || null;
        } catch (requestError) {
            if (
                requestVersion !== requestVersionRef.current
                || controller.signal.aborted
                || isCancelledRequest(requestError)
            ) {
                return null;
            }
            setError(requestError?.message || '加载 Runtime Inspector 失败');
            return null;
        } finally {
            if (requestVersion === requestVersionRef.current) {
                if (abortControllerRef.current === controller) abortControllerRef.current = null;
                setLoading(false);
            }
        }
    }, [conversationId]);

    const loadOverview = useCallback(async ({focusMessageId = null, silent = false} = {}) => {
        const data = await requestSection({section: 'overview', focusMessageId, silent});
        if (!data) return null;
        updateDocument(data);
        const nextTab = data.defaultTab || data.tabs?.[0]?.id || 'brief';
        activeTabRef.current = nextTab;
        setActiveTab(nextTab);
        setStale(false);
        return data;
    }, [requestSection, updateDocument]);

    const loadTab = useCallback(async (tabId, {
        focusMessageId = null,
        force = false,
        silent = false,
    } = {}) => {
        const normalizedTabId = String(tabId || 'brief');
        activeTabRef.current = normalizedTabId;
        setActiveTab(normalizedTabId);
        if (normalizedTabId === 'brief') return null;

        const existingTab = (documentRef.current?.tabs || []).find(tab => tab.id === normalizedTabId);
        if (!force && existingTab?.section?.loaded === true) return existingTab.section;
        const section = TAB_SECTION_QUERY[normalizedTabId];
        if (!section) return null;

        const data = await requestSection({section, focusMessageId, silent});
        if (!data?.section) return null;
        updateDocument(current => mergeTabSection(current, data.tabId || normalizedTabId, data.section));
        return data.section;
    }, [requestSection, updateDocument]);

    const loadModelCall = useCallback(async (modelCallId, {silent = false} = {}) => {
        const id = String(modelCallId || '').trim();
        if (!id) return null;
        const existing = (documentRef.current?.tabs || [])
            .find(tab => tab.id === 'model-request')?.section?.modelCalls
            ?.find(item => item?.modelCallId === id);
        if (existing?.detailLoaded) return existing;

        setModelCallLoadingId(id);
        const data = await requestSection({section: 'model-call', modelCallId: id, silent});
        if (data?.modelCall) {
            updateDocument(current => {
                let next = mergeModelCall(current, 'model-request', data.modelCall);
                // A full Model Call already contains Tool state; reuse it if the Tool
                // tab has been opened instead of issuing another diagnostic query.
                next = mergeModelCall(next, 'tools', {
                    ...data.modelCall,
                    toolDetailLoaded: true,
                });
                return next;
            });
        }
        setModelCallLoadingId(current => current === id ? '' : current);
        return data?.modelCall || null;
    }, [requestSection, updateDocument]);

    const loadToolCall = useCallback(async (modelCallId, {silent = false} = {}) => {
        const id = String(modelCallId || '').trim();
        if (!id) return null;
        const existing = (documentRef.current?.tabs || [])
            .find(tab => tab.id === 'tools')?.section?.modelCalls
            ?.find(item => item?.modelCallId === id);
        if (existing?.toolDetailLoaded || existing?.detailLoaded) return existing;

        setToolCallLoadingId(id);
        const data = await requestSection({section: 'tool-call', modelCallId: id, silent});
        if (data?.modelCall) {
            updateDocument(current => {
                let next = mergeModelCall(current, 'tools', data.modelCall);
                next = mergeModelCall(next, 'model-request', data.modelCall);
                return next;
            });
        }
        setToolCallLoadingId(current => current === id ? '' : current);
        return data?.modelCall || null;
    }, [requestSection, updateDocument]);

    const openInspector = useCallback(({focusMessageId = null} = {}) => {
        isOpenRef.current = true;
        setOpen(true);
        setStale(false);
        return loadOverview({focusMessageId});
    }, [loadOverview]);

    const closeInspector = useCallback(() => {
        isOpenRef.current = false;
        setOpen(false);
        abortRequest();
    }, [abortRequest]);

    const markStale = useCallback(() => {
        if (isOpenRef.current) setStale(true);
    }, []);

    const selectTab = useCallback((tabId, {focusMessageId = null} = {}) => {
        const id = String(tabId || 'brief');
        activeTabRef.current = id;
        setActiveTab(id);
        return loadTab(id, {focusMessageId});
    }, [loadTab]);

    const refresh = useCallback(async ({focusMessageId = null} = {}) => {
        const tabId = activeTabRef.current || 'brief';
        const overview = await loadOverview({focusMessageId});
        if (!overview) return null;
        if (tabId !== 'brief') {
            activeTabRef.current = tabId;
            setActiveTab(tabId);
            await loadTab(tabId, {focusMessageId, force: true});
        }
        setStale(false);
        return documentRef.current;
    }, [loadOverview, loadTab]);

    useEffect(() => {
        isOpenRef.current = false;
        setOpen(false);
        setDocument(null);
        documentRef.current = null;
        setError('');
        setStale(false);
        activeTabRef.current = 'brief';
        setActiveTab('brief');
        abortRequest();
    }, [conversationId, abortRequest]);

    useEffect(() => () => {
        isOpenRef.current = false;
        requestVersionRef.current += 1;
        abortControllerRef.current?.abort();
    }, []);

    return {
        open,
        document,
        loading,
        error,
        stale,
        activeTab,
        modelCallLoadingId,
        toolCallLoadingId,
        isOpenRef,
        openInspector,
        closeInspector,
        markStale,
        selectTab,
        refresh,
        loadModelCall,
        loadToolCall,
    };
}
