import { getAttachmentId, isImageAttachment, normalizeAttachmentList } from '../attachmentVision.js';

const id = (value) => String(value || '').trim();

const canonicalValue = (value) => {
    if (Array.isArray(value)) return value.map(canonicalValue);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]));
    return value;
};

export const guidanceDraftFingerprint = (draft = {}) => JSON.stringify(canonicalValue({
    content: String(draft.content || ''), attachments: normalizeAttachmentList(draft.attachments),
}));

/** Only the server-owned queue is eligible for pending-message controls. */
export const collectPendingGuidance = (executions = {}) => Object.values(executions)
    .flatMap((execution) => (Array.isArray(execution.pendingGuidance) ? execution.pendingGuidance : [])
        .filter((guidance) => guidance?.id && ['pending', 'queued'].includes(guidance.state || 'pending'))
        .map((guidance) => ({ execution, guidance })))
    .sort((a, b) => Number(a.guidance.createdAt || a.guidance.time || 0) - Number(b.guidance.createdAt || b.guidance.time || 0));

export const pendingGuidanceSummary = (guidance) => String(guidance?.content || '').trim()
    || normalizeAttachmentList(guidance?.attachments).map((attachment) => attachment.name || '附件').join('、')
    || '附件补充';

/** Editing puts the removed item back into the composer without discarding a newer draft. */
export const mergePendingGuidanceDraft = (draft = {}, guidance = {}) => {
    const currentContent = String(draft.content || '');
    const recoveredContent = String(guidance.content || '');
    const visionIds = Array.isArray(guidance.visionAttachmentIds) ? new Set(guidance.visionAttachmentIds) : null;
    const recoveredAttachments = normalizeAttachmentList(guidance.attachments).map((attachment) => (
        visionIds && isImageAttachment(attachment)
            ? { ...attachment, visionEnabled: visionIds.has(getAttachmentId(attachment)) }
            : attachment
    ));
    const attachments = [...normalizeAttachmentList(draft.attachments)];
    const seen = new Set(attachments.map(getAttachmentId).filter(Boolean));
    for (const attachment of recoveredAttachments) {
        const attachmentId = getAttachmentId(attachment);
        if (!attachmentId || seen.has(attachmentId)) continue;
        seen.add(attachmentId);
        attachments.push(attachment);
    }
    return {
        ...draft,
        content: currentContent.trim() && recoveredContent.trim()
            ? `${currentContent}\n\n${recoveredContent}` : currentContent || recoveredContent,
        attachments,
    };
};

export const clearAcceptedGuidanceDraft = (current = {}, submitted = {}) => {
    const submittedFiles = new Map(normalizeAttachmentList(submitted.attachments)
        .map((attachment) => [getAttachmentId(attachment), JSON.stringify(canonicalValue(attachment))]));
    return {
        ...current,
        content: current.content === submitted.content ? '' : String(current.content || ''),
        // An image's vision consent (or another attachment edit) may change
        // while its previous version awaits an ACK. Keep that newer draft.
        attachments: normalizeAttachmentList(current.attachments).filter((attachment) =>
            submittedFiles.get(getAttachmentId(attachment)) !== JSON.stringify(canonicalValue(attachment))),
    };
};

export const guidanceActionError = (response, fallback) => (
    typeof response?.value === 'string' ? response.value
        : response?.message || response?.value?.message || response?.code || fallback
);

export const acceptGuidanceSnapshot = (response, execution, upsert) => {
    const snapshot = response?.value?.execution || response?.execution;
    if (!snapshot) return null;
    if (id(snapshot.conversationId) !== id(execution.conversationId)
        || id(snapshot.executionId) !== id(execution.executionId)) {
        throw new Error('服务器返回的补充消息不属于对应执行，请刷新后重试。');
    }
    upsert(snapshot);
    return snapshot;
};

export const mutatePendingGuidance = async ({ action, execution, guidance, emitEvent, upsert }) => {
    if (!['delete', 'edit'].includes(action)) throw new Error('不支持的补充消息操作。');
    const response = await emitEvent({
        event: `execution.guidance.${action}`,
        conversationId: execution.conversationId,
        runId: execution.runId || null,
        turnId: execution.turnId || null,
        payload: { executionId: execution.executionId, guidanceId: guidance.id },
    });
    // Even a rejected edit can carry a newer queue after the model consumed it.
    const snapshot = acceptGuidanceSnapshot(response, execution, upsert);
    if (response?.success !== true) {
        const error = new Error(guidanceActionError(response, '补充消息状态已变化，请重试。'));
        error.definitive = response?.success === false;
        error.conflict = response?.conflict === true;
        throw error;
    }
    if (!snapshot) throw new Error('未收到补充消息的确认，请刷新后重试。');
    if (!Array.isArray(snapshot.pendingGuidance)
        || snapshot.pendingGuidance.some((item) => id(item.id) === id(guidance.id))) {
        throw new Error('补充消息尚未移出待接收列表，请刷新后重试。');
    }
    if (action === 'edit') {
        const recovered = response?.value?.guidance;
        if (!recovered || id(recovered.id) !== id(guidance.id)) throw new Error('未收到对应消息的编辑内容，请刷新后重试。');
        return recovered;
    }
    return null;
};
