import { backendStorageKey, getBackendConnection } from '../../../runtime/backend/connection.js';

const STORAGE_KEY = 'cwm:chat-composer-drafts:v2';
const STORAGE_VERSION = 2;
const ENTRY_PREFIX = 'cwm:chat-composer-entry:v3:';
const pendingWrites = new Map();
let saveTimer = null;
let retireLifecycle = null;

/** Flush captured backend keys, including drafts from a view just left. */
export const flushComposerDrafts = () => {
    clearTimeout(saveTimer);
    saveTimer = null;
    for (const [key, entry] of pendingWrites) {
        try { window.localStorage.setItem(key, JSON.stringify(entry)); } catch { /* Best effort. */ }
    }
    pendingWrites.clear();
    retireLifecycle?.();
    retireLifecycle = null;
};

const queueWrite = (key, entry, defer) => {
    pendingWrites.set(key, entry);
    if (!defer) {
        try { window.localStorage.setItem(key, JSON.stringify(entry)); } catch { /* Best effort. */ }
        pendingWrites.delete(key);
        return;
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flushComposerDrafts, 300);
    if (!retireLifecycle && window.addEventListener) {
        const view = window;
        const hidden = () => { if (view.document?.hidden) flushComposerDrafts(); };
        view.addEventListener('pagehide', flushComposerDrafts);
        view.document?.addEventListener('visibilitychange', hidden);
        retireLifecycle = () => {
            view.removeEventListener('pagehide', flushComposerDrafts);
            view.document?.removeEventListener('visibilitychange', hidden);
        };
    }
};
const NEW_CONVERSATION_KEY = '__new__';
const LEGACY_PREFIX = 'chatbox-input-draft-v1';

const now = () => Date.now();

const conversationKey = (conversationId) => (
    conversationId ? String(conversationId) : NEW_CONVERSATION_KEY
);

const legacyStorageKey = (conversationId) => (
    `${LEGACY_PREFIX}:${encodeURIComponent(String(conversationId ?? 'default'))}`
);

const emptyRoot = () => ({version: STORAGE_VERSION, conversations: {}});

const readRoot = (...conversationIds) => {
    if (typeof window === 'undefined') return emptyRoot();
    const root = emptyRoot();
    const loadedKeys = new Map();
    let legacy;
    for (const id of new Set(conversationIds.map(conversationKey))) {
        const key = backendStorageKey(ENTRY_PREFIX + encodeURIComponent(id));
        loadedKeys.set(id, key);
        try {
            if (pendingWrites.has(key)) {
                if (pendingWrites.get(key)) root.conversations[id] = pendingWrites.get(key);
                continue;
            }
            const raw = window.localStorage.getItem(key);
            if (raw !== null) {
                const entry = JSON.parse(raw);
                if (entry && typeof entry === 'object') root.conversations[id] = entry;
                continue;
            }
            // Migrate lazily. A null entry is a tombstone so deleting a migrated
            // draft cannot resurrect the retained legacy root on the next read.
            legacy ??= JSON.parse(window.localStorage.getItem(backendStorageKey(STORAGE_KEY)) || 'null') || {};
            const entry = legacy.conversations?.[id] || null;
            queueWrite(key, entry, false);
            if (entry) root.conversations[id] = entry;
        } catch { /* Unavailable/malformed storage must not block the composer. */ }
    }
    Object.defineProperty(root, 'loadedKeys', {value: loadedKeys});
    return root;
};

const writeRoot = (root, defer = false) => {
    if (typeof window === 'undefined') return;
    for (const [id, key] of root.loadedKeys || []) {
        queueWrite(key, root.conversations[id] || null, defer);
    }
};

const cloneJsonSafe = (value) => {
    try {
        return JSON.parse(JSON.stringify(value));
    } catch {
        return undefined;
    }
};

const sanitizeAttachments = (attachments) => {
    if (!Array.isArray(attachments)) return [];
    const keys = [
        'serverId', 'artifactId', 'name', 'preview', 'previewType', 'downloadUrl',
        'fileType', 'mimeType', 'size', 'sha256', 'artifactStatus', 'visionEnabled',
        'source', 'workspaceId',
    ];
    return attachments
        .filter(item => item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => {
            const next = {};
            keys.forEach((key) => {
                if (item[key] === undefined) return;
                const safeValue = cloneJsonSafe(item[key]);
                if (safeValue !== undefined) next[key] = safeValue;
            });
            return next;
        })
        .filter(item => item.serverId || item.artifactId);
};

const normalizeDraft = (draft) => {
    if (!draft || typeof draft !== 'object') return null;
    return {
        content: String(draft.content ?? ''),
        attachments: sanitizeAttachments(draft.attachments),
        roleName: draft.roleName ? String(draft.roleName) : null,
        updatedAt: Number(draft.updatedAt) || 0,
    };
};


const draftsEquivalent = (left, right) => (
    Boolean(left)
    && Boolean(right)
    && left.content === right.content
    && left.roleName === right.roleName
    && JSON.stringify(left.attachments || []) === JSON.stringify(right.attachments || [])
);

const getConversationEntry = (root, conversationId, create = false) => {
    const key = conversationKey(conversationId);
    let entry = root.conversations[key];
    if (!entry && create) {
        entry = {normal: null, messages: {}};
        root.conversations[key] = entry;
    }
    return {key, entry};
};

const readLegacyNormalDraft = (conversationId) => {
    if (typeof window === 'undefined') return null;
    if (getBackendConnection().id !== 'default') return null;
    try {
        const key = legacyStorageKey(conversationId);
        const content = window.localStorage.getItem(key);
        if (!content) return null;
        window.localStorage.removeItem(key);
        return {content, attachments: [], roleName: null, updatedAt: now()};
    } catch {
        return null;
    }
};

export const readComposerDraft = ({conversationId, mode = 'normal', messageId = null}) => {
    const root = readRoot(conversationId);
    const {entry} = getConversationEntry(root, conversationId);
    let draft = null;

    if (mode === 'normal') {
        draft = normalizeDraft(entry?.normal);
        if (!draft) {
            const legacyDraft = readLegacyNormalDraft(conversationId);
            if (legacyDraft) {
                writeComposerDraft({conversationId, mode: 'normal', draft: legacyDraft});
                draft = legacyDraft;
            }
        }
        return draft;
    }

    if (!messageId) return null;
    draft = normalizeDraft(entry?.messages?.[String(messageId)]?.[mode]);
    return draft;
};

export const writeComposerDraft = ({conversationId, mode = 'normal', messageId = null, draft, defer = false}) => {
    const normalized = normalizeDraft({...draft, updatedAt: now()});
    if (!normalized) return null;

    const root = readRoot(conversationId);
    const {entry} = getConversationEntry(root, conversationId, true);
    let existing = null;
    if (mode === 'normal') {
        existing = normalizeDraft(entry.normal);
    } else if (messageId) {
        existing = normalizeDraft(entry.messages?.[String(messageId)]?.[mode]);
    } else {
        return null;
    }

    // Preserve the revision timestamp when callers merely re-persist the same
    // snapshot (for example while switching conversations).  `updatedAt` is also
    // the local optimistic-commit token used to distinguish the submitted draft
    // from newer text/attachments typed before the server reply arrives.
    if (draftsEquivalent(existing, normalized)) return existing;

    if (mode === 'normal') {
        entry.normal = normalized;
    } else {
        const id = String(messageId);
        entry.messages ||= {};
        entry.messages[id] ||= {};
        entry.messages[id][mode] = normalized;
    }
    writeRoot(root, defer);
    return normalized;
};

export const clearComposerDraft = ({conversationId, mode = 'normal', messageId = null}) => {
    const root = readRoot(conversationId);
    const {key, entry} = getConversationEntry(root, conversationId);
    if (!entry) return;

    if (mode === 'normal') {
        entry.normal = null;
    } else if (messageId && entry.messages?.[String(messageId)]) {
        delete entry.messages[String(messageId)][mode];
        if (Object.keys(entry.messages[String(messageId)]).length === 0) {
            delete entry.messages[String(messageId)];
        }
    }

    const hasMessages = entry.messages && Object.keys(entry.messages).length > 0;
    if (!entry.normal && !hasMessages && !entry.guidanceSubmission && !Object.keys(entry.guidanceEdits || {}).length) delete root.conversations[key];
    writeRoot(root);
};

/** A pending delivery receipt belongs to the draft, never to the server queue. */
export const readComposerGuidanceSubmission = (conversationId) => {
    const { entry } = getConversationEntry(readRoot(conversationId), conversationId);
    const value = entry?.guidanceSubmission;
    if (!value?.guidanceId || !value?.execution?.executionId
        || String(value.execution.conversationId || '') !== String(conversationId || '')) return null;
    const submitted = normalizeDraft(value.submitted);
    if (!submitted) return null;
    return { ...value, submitted };
};

export const saveComposerGuidanceSubmission = (conversationId, value) => {
    if (!conversationId || !value?.guidanceId || !value?.execution?.executionId) return null;
    const submitted = normalizeDraft(value.submitted);
    if (!submitted) return null;
    const root = readRoot(conversationId);
    const { entry } = getConversationEntry(root, conversationId, true);
    const receipt = {
        guidanceId: String(value.guidanceId), conversationId: String(conversationId),
        execution: {
            executionId: String(value.execution.executionId), conversationId: String(conversationId),
            runId: value.execution.runId || null, turnId: value.execution.turnId || null,
            statusId: value.execution.statusId || null,
        },
        submitted,
    };
    entry.guidanceSubmission = receipt;
    writeRoot(root);
    return receipt;
};

export const clearComposerGuidanceSubmission = (conversationId, guidanceId) => {
    const root = readRoot(conversationId);
    const { key, entry } = getConversationEntry(root, conversationId);
    if (!entry?.guidanceSubmission || entry.guidanceSubmission.guidanceId !== guidanceId) return;
    delete entry.guidanceSubmission;
    if (!entry.normal && !Object.keys(entry.messages || {}).length && !Object.keys(entry.guidanceEdits || {}).length) delete root.conversations[key];
    writeRoot(root);
};

/** Unknown edit delivery keeps an operation receipt, never a local pending item. */
export const readComposerGuidanceEdits = (conversationId) => {
    const { entry } = getConversationEntry(readRoot(conversationId), conversationId);
    return Object.values(entry?.guidanceEdits || {}).filter((value) => value?.guidanceId && value?.execution?.executionId
        && String(value.execution.conversationId || '') === String(conversationId || ''));
};

export const saveComposerGuidanceEdit = (conversationId, execution, guidance) => {
    if (!conversationId || !execution?.executionId || !guidance?.id
        || String(execution.conversationId || '') !== String(conversationId)) return null;
    const root = readRoot(conversationId);
    const { entry } = getConversationEntry(root, conversationId, true);
    entry.guidanceEdits ||= {};
    const key = `${execution.executionId}:${guidance.id}`;
    if (entry.guidanceEdits[key]) return entry.guidanceEdits[key];
    const receipt = {
        guidanceId: String(guidance.id),
        execution: {
            executionId: String(execution.executionId), conversationId: String(conversationId),
            runId: execution.runId || null, turnId: execution.turnId || null,
        },
        // This is a recovery label only. Actual editable text/attachments must come
        // from the successful server edit receipt, even when the source row is gone.
        guidance: { id: String(guidance.id), content: String(guidance.content || ''), attachments: sanitizeAttachments(guidance.attachments) },
    };
    entry.guidanceEdits[key] = receipt;
    writeRoot(root);
    return receipt;
};

export const clearComposerGuidanceEdit = (conversationId, executionId, guidanceId) => {
    const root = readRoot(conversationId);
    const { key, entry } = getConversationEntry(root, conversationId);
    const receiptKey = `${executionId}:${guidanceId}`;
    if (!entry?.guidanceEdits?.[receiptKey]) return;
    delete entry.guidanceEdits[receiptKey];
    if (!Object.keys(entry.guidanceEdits).length) delete entry.guidanceEdits;
    if (!entry.normal && !Object.keys(entry.messages || {}).length && !entry.guidanceSubmission && !entry.guidanceEdits) delete root.conversations[key];
    writeRoot(root);
};

export const moveComposerConversationDrafts = (fromConversationId, toConversationId) => {
    const fromKey = conversationKey(fromConversationId);
    const toKey = conversationKey(toConversationId);
    if (fromKey === toKey) return;

    const root = readRoot(fromConversationId, toConversationId);
    const source = root.conversations[fromKey];
    if (!source) return;
    const target = root.conversations[toKey] || {normal: null, messages: {}};

    if (source.normal) target.normal = source.normal;
    target.messages = {...(target.messages || {}), ...(source.messages || {})};
    root.conversations[toKey] = target;
    delete root.conversations[fromKey];
    writeRoot(root);
};

export const saveComposerSnapshot = ({
    conversationId,
    mode = 'normal',
    messageId = null,
    content = '',
    attachments = [],
    roleName = null,
    defer = false,
}) => writeComposerDraft({
    conversationId,
    mode,
    messageId,
    draft: {content, attachments, roleName},
    defer,
});

export const composerDraftStorageInfo = {
    get storageKey() { return backendStorageKey(STORAGE_KEY); },
    version: STORAGE_VERSION,
};
