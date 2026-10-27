import { createContext, useContext, useId, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { create } from 'zustand';

const BASE = 1000000;
const STEP = 100;
/** @typedef {{id: string, active: boolean, zIndex: number, activate: () => void, backdrop?: boolean}} WindowLayer */
/** @type {import('react').Context<WindowLayer | null>} */
export const WindowLayerContext = createContext(null);
export const useWindowLayers = create(() => ({ windows: [] }));

const remove = (id) => useWindowLayers.setState((state) => ({ windows: state.windows.filter((item) => item !== id) }));
const raise = (id) => useWindowLayers.setState((state) => state.windows.at(-1) === id ? state :
    { windows: [...state.windows.filter((item) => item !== id), id] });
export const isTopWindowLayer = (id) => useWindowLayers.getState().windows.at(-1) === id;
export const isOtherWindowTarget = (event, id) => {
    const target = event.detail?.originalEvent?.target || event.target;
    const owner = target?.closest?.('[data-window-layer]')?.dataset.windowLayer;
    return Boolean(owner && owner !== id);
};

/** DOM controls can portal outside React while remaining inside one window. */
export const isOwnedWindowPopoverTarget = (event, id) => {
    const target = event.detail?.originalEvent?.target || event.target;
    const surface = target?.closest?.('[data-window-popover="true"]');
    return Boolean(id && surface?.dataset.windowLayer === id);
};

export function useWindowLayer(active) {
    const id = useId();
    const index = useWindowLayers((state) => state.windows.indexOf(id));
    const lastVisibleZIndex = useRef(BASE + STEP);
    const zIndex = active && index >= 0 ? BASE + (index + 1) * STEP : lastVisibleZIndex.current;
    useLayoutEffect(() => {
        if (active && index >= 0) lastVisibleZIndex.current = BASE + (index + 1) * STEP;
    }, [active, index]);
    useLayoutEffect(() => {
        if (!active) return undefined;
        raise(id);
        return () => remove(id);
    }, [active, id]);
    const activate = useCallback(() => { if (active) raise(id); }, [active, id]);
    // Leaving the interaction stack must not lower a still-visible exit surface
    // behind its parent. Presentation keeps the last committed visual order.
    return useMemo(() => ({ id, active, activate, zIndex }), [id, active, activate, zIndex]);
}

// Portalled menus inherit their owning window through React context.
export function useWindowPopoverLayer() {
    const owner = useContext(WindowLayerContext);
    const count = useWindowLayers((state) => state.windows.length);
    return { zIndex: (owner?.active ? owner.zIndex : BASE + count * STEP) + 20,
        'data-window-layer': owner?.active ? owner.id : undefined };
}
