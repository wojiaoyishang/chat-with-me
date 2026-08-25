const STORAGE_KEY = 'cwm:chat-composer-drafts:v2';
const STORAGE_VERSION = 2;
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

const readRoot = () => {
    if (typeof window === 'undefined') return emptyRoot();
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return emptyRoot();
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return emptyRoot();
        return {
            version: STORAGE_VERSION,
            conversations: parsed.conversations && typeof parsed.conversations === 'object'
                ? parsed.conversations
                : {},
        };
    } catch (_) {
        return emptyRoot();
    }
};

const writeRoot = (root) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
    } catch (_) {
        // Draft persistence is best-effort and must never block chat input.
    }
};

const cloneJsonSafe = (value) => {
    try {
        return JSON.parse(JSON.stringify(value));
    } catch (_) {
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
    try {
        const key = legacyStorageKey(conversationId);
        const content = window.localStorage.getItem(key);
        if (!content) return null;
        window.localStorage.removeItem(key);
        return {content, attachments: [], roleName: null, updatedAt: now()};
    } catch (_) {
        return null;
    }
};

export const readComposerDraft = ({conversationId, mode = 'normal', messageId = null}) => {
    const root = readRoot();
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

export const writeComposerDraft = ({conversationId, mode = 'normal', messageId = null, draft}) => {
    const normalized = normalizeDraft({...draft, updatedAt: now()});
    if (!normalized) return null;

    const root = readRoot();
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
    writeRoot(root);
    return normalized;
};

export const clearComposerDraft = ({conversationId, mode = 'normal', messageId = null}) => {
    const root = readRoot();
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
    if (!entry.normal && !hasMessages) delete root.conversations[key];
    writeRoot(root);
};

export const moveComposerConversationDrafts = (fromConversationId, toConversationId) => {
    const fromKey = conversationKey(fromConversationId);
    const toKey = conversationKey(toConversationId);
    if (fromKey === toKey) return;

    const root = readRoot();
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
}) => writeComposerDraft({
    conversationId,
    mode,
    messageId,
    draft: {content, attachments, roleName},
});

export const composerDraftStorageInfo = {
    storageKey: STORAGE_KEY,
    version: STORAGE_VERSION,
};
