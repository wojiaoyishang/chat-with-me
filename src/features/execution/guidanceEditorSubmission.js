import {upsertExecution, useExecutionStore} from './useExecutionStore.js';

export async function submitGuidanceDraft({conversationId, executionId, draftKey, emitEvent, createId}) {
    const store = useExecutionStore.getState();
    const session = store.sessions[conversationId];
    const draft = session?.guidanceDrafts?.[draftKey];
    const execution = session?.executions?.[executionId];
    if (!session?.isOpen || session.activeExecutionId !== executionId
        || session.guidanceEditor?.draftKey !== draftKey || !draft || draft.executionId !== executionId
        || ['submitting', 'sent'].includes(draft.state)) return false;
    const retry = draft.state === 'uncertain';
    const content = retry ? draft.submittedContent : String(draft.content || '').trim();
    const attachments = (retry ? draft.submittedAttachments : draft.attachments) || [];
    const visionAttachmentIds = (retry ? draft.submittedVisionAttachmentIds : draft.visionAttachmentIds) || [];
    const source = execution?.activities?.find((activity) => activity.id === draft.sourceId);
    if (!content && !attachments.length) return false;
    if (!retry && (!execution?.active || execution.status === 'cancelling'
        || (draft.mode === 'rewrite' && source?.canRewrite !== true))) {
        store.patchGuidanceDraft(conversationId, draftKey, {state: 'rejected',
            error: '执行或原补充状态已变化，当前草稿不能重发；内容仍已保留。'});
        return false;
    }
    const guidanceId = retry ? draft.submissionId : createId();
    const identity = {state: 'submitting', submissionId: guidanceId, submittedContent: content,
        submittedAttachments: attachments, submittedVisionAttachmentIds: visionAttachmentIds, error: ''};
    store.patchGuidanceDraft(conversationId, draftKey, identity);
    const payload = {executionId, guidanceId, content, attachments, visionAttachmentIds};
    if (draft.replacesGuidanceId) payload.replacesGuidanceId = draft.replacesGuidanceId;
    try {
        const response = await emitEvent({event: 'execution.guidance.add', conversationId,
            runId: execution?.runId || null, turnId: execution?.turnId || null, payload});
        if (response?.success !== true) {
            const error = typeof response?.value === 'string' ? response.value : response?.value?.message || response?.message || '无法发送补充，请重试。';
            useExecutionStore.getState().patchGuidanceDraft(conversationId, draftKey,
                {state: response?.submissionUncertain === true ? 'uncertain' : 'rejected', error}, guidanceId);
            return false;
        }
        const snapshot = response.value?.execution;
        const acceptedId = response.value?.guidanceId || response.value?.guidance?.requestId;
        if ((acceptedId && acceptedId !== guidanceId) || (snapshot && (snapshot.executionId !== executionId
            || snapshot.conversationId !== conversationId))) throw new Error('服务器返回的补充回执不属于此次提交，请重试确认。');
        if (snapshot) upsertExecution(snapshot);
        else {
            const guidance = response.value?.guidance || {};
            const current = useExecutionStore.getState().sessions[conversationId]?.executions?.[executionId];
            if (current && guidance.state === 'pending' && !guidance.staged && !guidance.locked
                && !current.activities?.some((activity) => activity.id === guidanceId)
                && !current.pendingGuidance?.some((item) => item.id === guidanceId)) {
                upsertExecution({...current, pendingGuidance: [...(current.pendingGuidance || []), {
                    id: guidanceId, content, attachments: guidance.attachments || attachments,
                    visionAttachmentIds: guidance.visionAttachmentIds || visionAttachmentIds,
                    createdAt: Number(guidance.createdAt || 0) * 1000 || Date.now(),
                    anchorStatusId: guidance.anchorStatusId || current.statusId || null,
                    canDelete: true, canEdit: true,
                }]});
            }
        }
        useExecutionStore.getState().patchGuidanceDraft(conversationId, draftKey,
            {state: 'sent', error: ''}, guidanceId);
        return true;
    } catch (error) {
        // Transport failure does not prove that the server rejected the content.
        // Preserve the exact ID/body and require explicit receipt retry first.
        useExecutionStore.getState().patchGuidanceDraft(conversationId, draftKey,
            {state: 'uncertain', error: error?.message || '尚未确认提交结果。'}, guidanceId);
        return false;
    }
}
