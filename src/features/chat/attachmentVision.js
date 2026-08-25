const IMAGE_ATTACHMENT_PATTERN = /\.(?:apng|avif|bmp|gif|heic|heif|ico|jpe?g|png|svg|tiff?|webp)$/i;
const ATTACHMENT_RECORD_KEYS = new Set([
    'serverId', 'artifactId', 'name', 'preview', 'downloadUrl', 'fileType', 'mimeType', 'size', 'sha256',
]);

const isAttachmentRecord = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    return Object.keys(value).some((key) => ATTACHMENT_RECORD_KEYS.has(key));
};

/**
 * Normalize attachment metadata coming from realtime/history compatibility paths.
 * The UI contract is always an array, while older/partial payloads may arrive as
 * a JSON string, a single attachment object, or an id-keyed object map.
 */
export const normalizeAttachmentList = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
        const normalized = value.filter(isAttachmentRecord);
        return normalized.length === value.length ? value : normalized;
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed || !['[', '{'].includes(trimmed[0])) return [];
        try {
            return normalizeAttachmentList(JSON.parse(trimmed));
        } catch {
            return [];
        }
    }

    if (typeof value !== 'object') return [];

    if (value.attachments !== undefined && value.attachments !== value) {
        const nested = normalizeAttachmentList(value.attachments);
        if (nested.length > 0) return nested;
    }
    if (value.items !== undefined && value.items !== value) {
        const nested = normalizeAttachmentList(value.items);
        if (nested.length > 0) return nested;
    }

    if (isAttachmentRecord(value)) return [value];

    const values = Object.values(value).filter(isAttachmentRecord);
    return values;
};


export const getAttachmentId = (attachment) => (
    attachment?.serverId || attachment?.artifactId || ''
);

export const isImageAttachment = (attachment) => (
    attachment?.fileType === 'image'
    || String(attachment?.mimeType || '').toLowerCase().startsWith('image/')
    || IMAGE_ATTACHMENT_PATTERN.test(String(attachment?.name || ''))
);

export const isAttachmentVisionEnabled = (attachment) => (
    isImageAttachment(attachment) && attachment?.visionEnabled !== false
);

export const getVisionAttachmentIds = (attachments) => {
    const seen = new Set();
    const ids = [];

    for (const attachment of normalizeAttachmentList(attachments)) {
        if (!isAttachmentVisionEnabled(attachment)) continue;
        const attachmentId = getAttachmentId(attachment);
        if (!attachmentId || seen.has(attachmentId)) continue;
        seen.add(attachmentId);
        ids.push(attachmentId);
    }

    return ids;
};
