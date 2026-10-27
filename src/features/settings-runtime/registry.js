const renderers = new Map();

/** Register an interaction primitive, never a business page or page-id alias. */
export function registerSettingsComponent(type, renderer) {
    if (typeof type !== 'string' || !type || typeof renderer !== 'function') throw new TypeError('Invalid settings component registration');
    if (renderers.has(type) && renderers.get(type) !== renderer) throw new Error(`Duplicate settings component: ${type}`);
    renderers.set(type, renderer);
    return () => { if (renderers.get(type) === renderer) renderers.delete(type); };
}

export const getSettingsComponent = (type) => renderers.get(type) || null;
