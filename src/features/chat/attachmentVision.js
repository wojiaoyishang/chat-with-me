const IMAGE_ATTACHMENT_PATTERN = /\.(?:apng|avif|bmp|gif|heic|heif|ico|jpe?g|png|svg|tiff?|webp)$/i;

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

    for (const attachment of Array.isArray(attachments) ? attachments : []) {
        if (!isAttachmentVisionEnabled(attachment)) continue;
        const attachmentId = getAttachmentId(attachment);
        if (!attachmentId || seen.has(attachmentId)) continue;
        seen.add(attachmentId);
        ids.push(attachmentId);
    }

    return ids;
};
