const MESSAGE_DRAFT_COMPONENT_KEY = 'chatbox:composer-drafts:v2';
const LEGACY_MESSAGE_DRAFT_COMPONENT_KEY = 'chatbox:input-drafts:v1';

const normalizeMountedDraft = (draft) => {
    if (typeof draft === 'string') {
        return {
            content: draft,
            attachments: [],
            roleName: null,
            updatedAt: 0,
        };
    }
    if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return null;
    return {
        content: String(draft.content ?? ''),
        attachments: Array.isArray(draft.attachments) ? draft.attachments : [],
        roleName: draft.roleName ? String(draft.roleName) : null,
        updatedAt: Number(draft.updatedAt) || 0,
    };
};

const getMountedStore = (message, key = MESSAGE_DRAFT_COMPONENT_KEY) => {
    if (!message || typeof message.getComponent !== 'function') return null;
    const store = message.getComponent(key);
    return store && typeof store === 'object' && !Array.isArray(store) ? store : null;
};

export const readMountedComposerDraft = (message, mode) => {
    if (!message || !mode) return null;

    const currentStore = getMountedStore(message);
    const currentDraft = normalizeMountedDraft(currentStore?.[mode]);
    if (currentDraft) return currentDraft;

    // Hot-reload / pre-V12 compatibility. Older ChatBox versions mounted plain
    // strings under chatbox:input-drafts:v1. If such a live message object still
    // exists, treat it as the oldest possible draft and let the persistent store
    // win whenever it has a newer timestamp.
    const legacyStore = getMountedStore(message, LEGACY_MESSAGE_DRAFT_COMPONENT_KEY);
    return normalizeMountedDraft(legacyStore?.[mode]);
};

export const mountComposerDraft = (message, mode, draft) => {
    if (!message || !mode || typeof message.registerComponent !== 'function') return null;
    const normalized = normalizeMountedDraft(draft);
    if (!normalized) return null;

    const currentStore = getMountedStore(message) || {};
    message.registerComponent(MESSAGE_DRAFT_COMPONENT_KEY, {
        ...currentStore,
        [mode]: normalized,
    });
    return normalized;
};

export const clearMountedComposerDraft = (message, mode) => {
    if (!message || !mode) return;
    const currentStore = getMountedStore(message);
    if (!currentStore || !Object.prototype.hasOwnProperty.call(currentStore, mode)) return;

    const nextStore = {...currentStore};
    delete nextStore[mode];
    if (Object.keys(nextStore).length === 0) {
        if (typeof message.unregisterComponent === 'function') {
            message.unregisterComponent(MESSAGE_DRAFT_COMPONENT_KEY);
        }
        return;
    }
    if (typeof message.registerComponent === 'function') {
        message.registerComponent(MESSAGE_DRAFT_COMPONENT_KEY, nextStore);
    }
};

export const newestComposerDraft = (...drafts) => {
    const normalized = drafts.map(normalizeMountedDraft).filter(Boolean);
    if (normalized.length === 0) return null;
    return normalized.reduce((latest, candidate) => (
        candidate.updatedAt >= latest.updatedAt ? candidate : latest
    ));
};

export const messageDraftMountInfo = {
    componentKey: MESSAGE_DRAFT_COMPONENT_KEY,
    legacyComponentKey: LEGACY_MESSAGE_DRAFT_COMPONENT_KEY,
};
