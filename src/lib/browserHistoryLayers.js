import {useEffect, useRef} from 'react';

const HISTORY_LAYER_KEY = '__cwmUiLayer';
let initialized = false;
let ignoreNextPopCount = 0;
let sequence = 0;
const activeLayers = [];
const routePopListeners = new Set();

const currentUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

const cloneHistoryState = () => {
    if (typeof window === 'undefined') return {};
    const state = window.history.state;
    return state && typeof state === 'object' ? {...state} : {};
};

const pushLayerEntry = (layer) => {
    if (typeof window === 'undefined') return;
    const state = cloneHistoryState();
    // Keep React Router's own history keys (usr/key/idx) untouched.  The CWM
    // layer marker is intentionally orthogonal to route navigation.
    state[HISTORY_LAYER_KEY] = {
        id: layer.id,
        kind: layer.kind,
        sequence: layer.sequence,
    };
    window.history.pushState(state, '', currentUrl());
};

const notifyRoutePop = (event) => {
    const payload = {
        event,
        url: currentUrl(),
        state: event?.state ?? window.history.state,
    };
    routePopListeners.forEach((listener) => {
        try {
            listener(payload);
        } catch (error) {
            console.error('browser route pop listener failed', error);
        }
    });
};

const ensureManager = () => {
    if (initialized || typeof window === 'undefined') return;
    initialized = true;

    window.addEventListener('popstate', (event) => {
        if (ignoreNextPopCount > 0) {
            ignoreNextPopCount -= 1;
            return;
        }

        const layer = activeLayers[activeLayers.length - 1];
        if (layer) {
            activeLayers.pop();
            let shouldConsumeLayer = true;
            try {
                // Returning false means the UI intentionally stayed open (for
                // example settings intercepted Back to show an unsaved-change
                // confirmation). Re-arm the same layer before nested dialogs
                // push their own entries.
                shouldConsumeLayer = layer.onBack?.() !== false;
            } catch (error) {
                console.error('browser history layer back handler failed', error);
            }

            if (!shouldConsumeLayer) {
                activeLayers.push(layer);
                pushLayerEntry(layer);
                return;
            }

            try {
                layer.onConsumed?.();
            } catch (error) {
                console.error('browser history layer consume handler failed', error);
            }
            return;
        }

        notifyRoutePop(event);
    });
};

export const registerBrowserHistoryLayer = ({kind = 'overlay', onBack, onConsumed} = {}) => {
    if (typeof window === 'undefined') return null;
    ensureManager();
    const layer = {
        id: `cwm-layer-${Date.now()}-${++sequence}`,
        kind,
        sequence,
        onBack,
        onConsumed,
    };
    activeLayers.push(layer);
    pushLayerEntry(layer);
    return layer.id;
};

export const releaseBrowserHistoryLayer = (id, {collapseHistory = true} = {}) => {
    if (!id || typeof window === 'undefined') return;
    ensureManager();
    const index = activeLayers.findIndex((item) => item.id === id);
    if (index < 0) return;

    const wasTop = index === activeLayers.length - 1;
    activeLayers.splice(index, 1);

    if (!collapseHistory || !wasTop) return;

    const marker = window.history.state?.[HISTORY_LAYER_KEY];
    if (marker?.id === id) {
        // Programmatic UI close should remove its synthetic same-URL entry.
        // Ignore the resulting popstate so a layer underneath is not closed too.
        ignoreNextPopCount += 1;
        window.history.back();
    }
};

export const forgetBrowserHistoryLayer = (id) => {
    if (!id) return;
    const index = activeLayers.findIndex((item) => item.id === id);
    if (index >= 0) activeLayers.splice(index, 1);
};

export const subscribeBrowserRoutePop = (listener) => {
    if (typeof listener !== 'function') return () => {};
    ensureManager();
    routePopListeners.add(listener);
    return () => routePopListeners.delete(listener);
};

/**
 * Treat an open UI surface as a same-URL browser-history layer.
 *
 * - Hardware/browser Back closes the newest layer first.
 * - Normal close buttons collapse the synthetic history entry.
 * - `onBack` may return false to keep the layer open and immediately re-arm it.
 *   This is useful for an unsaved-change confirmation flow.
 */
export const useBrowserBackLayer = (open, onBack, {kind = 'overlay'} = {}) => {
    const layerIdRef = useRef(null);
    const openRef = useRef(Boolean(open));
    const onBackRef = useRef(onBack);
    const registerTimerRef = useRef(null);

    openRef.current = Boolean(open);
    onBackRef.current = onBack;

    useEffect(() => {
        ensureManager();

        if (openRef.current && !layerIdRef.current && registerTimerRef.current === null) {
            // Deferring one task avoids duplicate synthetic entries from React
            // StrictMode's development-only effect mount/cleanup replay.
            registerTimerRef.current = window.setTimeout(() => {
                registerTimerRef.current = null;
                if (!openRef.current || layerIdRef.current) return;
                let id = null;
                id = registerBrowserHistoryLayer({
                    kind,
                    onBack: () => onBackRef.current?.(),
                    onConsumed: () => {
                        if (layerIdRef.current === id) layerIdRef.current = null;
                    },
                });
                layerIdRef.current = id;
            }, 0);
        }

        if (!openRef.current) {
            if (registerTimerRef.current !== null) {
                window.clearTimeout(registerTimerRef.current);
                registerTimerRef.current = null;
            }
            if (layerIdRef.current) {
                const id = layerIdRef.current;
                layerIdRef.current = null;
                releaseBrowserHistoryLayer(id, {collapseHistory: true});
            }
        }
    });

    useEffect(() => () => {
        if (registerTimerRef.current !== null) {
            window.clearTimeout(registerTimerRef.current);
            registerTimerRef.current = null;
        }
        if (layerIdRef.current) {
            // Unmount can be caused by a real route transition. Never navigate
            // backward from cleanup; just stop treating the old surface as active.
            forgetBrowserHistoryLayer(layerIdRef.current);
            layerIdRef.current = null;
        }
    }, []);
};
