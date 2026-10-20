import { getAttachmentId, isImageAttachment } from './attachmentVision.js';

/** Turn an account attachment-library record into the metadata used by chat uploads. */
export const toChatAttachment = (item) => {
    const artifactId = String(item?.artifactId || item?.serverId || '').trim();
    if (!artifactId) return null;

    const uri = item.uri || `cwm://artifact/${artifactId}`;
    const attachment = {
        serverId: artifactId,
        artifactId,
        name: item.name || item.title || artifactId,
        size: item.size ?? 0,
        preview: item.preview || `cwm://artifact/${artifactId}/preview`,
        downloadUrl: uri,
        fileType: item.type === 'image' ? 'image' : (item.fileType || item.type || 'file'),
        sha256: item.sha256 || null,
        artifactStatus: 'ready',
    };
    if (isImageAttachment(attachment)) attachment.visionEnabled = true;
    return attachment;
};

export const appendLibraryAttachments = (current, records) => {
    const existing = Array.isArray(current) ? current : [];
    const seen = new Set(existing.map(getAttachmentId).filter(Boolean));
    const additions = [];

    for (const record of records) {
        const attachment = toChatAttachment(record);
        const id = getAttachmentId(attachment);
        if (!id || seen.has(id)) continue;
        seen.add(id);
        additions.push(attachment);
    }

    return additions.length ? [...existing, ...additions] : existing;
};
