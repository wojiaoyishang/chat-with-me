import { create } from 'zustand';

const normalizeId = (value) => String(value || '').trim();

const emptySession = () => ({
    isOpen: false,
    activeExecutionId: null,
    navigationRequest: null,
    guidanceDrafts: {},
    guidanceEditor: null,
    executions: {},
});

const mergeActivity = (activities = [], incoming = {}) => {
    const activityId = normalizeId(incoming?.id);
    if (!activityId) return Array.isArray(activities) ? activities : [];
    const source = Array.isArray(activities) ? activities : [];
    const index = source.findIndex((item) => normalizeId(item?.id) === activityId);
    if (index < 0) return [...source, incoming].slice(-80);
    const next = [...source];
    next[index] = { ...next[index], ...incoming, id: activityId };
    return next;
};

export const shouldIgnoreExecutionUpdate = (previous = {}, incoming = {}) => {
    if (previous.executionId !== incoming.executionId) return false;
    if (Number(previous.updatedAt || 0) > Number(incoming.updatedAt || 0)) return true;
    const terminal = ['completed', 'cancelled', 'failed', 'blocked'];
    return terminal.includes(previous.status) && incoming.active === true && previous.runId === incoming.runId;
};

const mergeExecution = (previous, incoming) => shouldIgnoreExecutionUpdate(previous, incoming) ? previous : ({
    ...previous,
    ...incoming,
    thinking:
        Number(previous.thinking?.revision || 0) > Number(incoming.thinking?.revision || 0)
            ? previous.thinking
            : incoming.thinking || previous.thinking,
});

const normalizeExecution = (incoming = {}) => {
    const executionId = normalizeId(incoming.executionId || incoming.execution_id);
    const conversationId = normalizeId(incoming.conversationId || incoming.conversation_id);
    if (!executionId) return null;
    return {
        ...incoming,
        executionId,
        conversationId,
        plan: Array.isArray(incoming.plan) ? incoming.plan : [],
        activities: Array.isArray(incoming.activities) ? incoming.activities : [],
        toolCards: Array.isArray(incoming.toolCards) ? incoming.toolCards : [],
        // Inline/history nodes are partial projections. Only an explicit server
        // queue (including []) can replace the current pending supplements.
        ...(Object.prototype.hasOwnProperty.call(incoming, 'pendingGuidance') ? {
            pendingGuidance: Array.isArray(incoming.pendingGuidance) ? incoming.pendingGuidance : [],
        } : {}),
        executionMode: incoming?.executionMode && typeof incoming.executionMode === 'object' ? incoming.executionMode : {},
    };
};

const sessionWithExecution = (session, incoming) => {
    const execution = mergeExecution(session.executions[incoming.executionId] || {}, incoming);
    const drafts = {...session.guidanceDrafts};
    let guidanceEditor = session.guidanceEditor || null;
    for (const [key, draft] of Object.entries(drafts)) {
        if (draft.executionId !== execution.executionId || !draft.submissionId || draft.state === 'sent') continue;
        const received = execution.pendingGuidance?.find((item) => item.id === draft.submissionId)
            || execution.activities?.find((activity) => activity.id === draft.submissionId
                && activity.kind === 'guidance' && activity.state !== 'submitting');
        if (!received) continue;
        drafts[key] = {...draft, state: 'sent', error: ''};
        if (guidanceEditor?.draftKey === key) guidanceEditor = null;
    }
    return {...session, guidanceDrafts: drafts, guidanceEditor,
        executions: {...session.executions, [execution.executionId]: execution}};
};

export const useExecutionStore = create((set) => ({
    sessions: {},

    upsertExecution: (incoming) =>
        set((state) => {
            const execution = normalizeExecution(incoming);
            if (!execution?.executionId || !execution?.conversationId) return state;
            const conversationId = execution.conversationId;
            const session = state.sessions[conversationId] || emptySession();
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: {
                        ...sessionWithExecution(session, execution),
                    },
                },
            };
        }),

    openExecution: (incoming, target = null) =>
        set((state) => {
            const execution = normalizeExecution(incoming);
            if (!execution?.executionId || !execution?.conversationId) return state;
            const conversationId = execution.conversationId;
            const session = state.sessions[conversationId] || emptySession();
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: {
                        ...sessionWithExecution(session, execution),
                        isOpen: true,
                        activeExecutionId: execution.executionId,
                        navigationRequest: target ? { ...target, requestId: (session.navigationSequence || 0) + 1 } : null,
                        navigationSequence: (session.navigationSequence || 0) + 1,
                    },
                },
            };
        }),

    openById: (conversationIdValue, executionIdValue) =>
        set((state) => {
            const conversationId = normalizeId(conversationIdValue);
            const executionId = normalizeId(executionIdValue);
            const session = state.sessions[conversationId];
            if (!conversationId || !executionId || !session?.executions?.[executionId]) return state;
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: {
                        ...session,
                        isOpen: true,
                        activeExecutionId: executionId,
                        navigationRequest: null,
                    },
                },
            };
        }),

    consumeNavigation: (conversationIdValue, requestId) =>
        set((state) => {
            const conversationId = normalizeId(conversationIdValue);
            const session = state.sessions[conversationId];
            if (session?.navigationRequest?.requestId !== requestId) return state;
            return { sessions: { ...state.sessions, [conversationId]: { ...session, navigationRequest: null } } };
        }),

    upsertActivity: (executionRef = {}, activity = {}) =>
        set((state) => {
            const conversationId = normalizeId(executionRef.conversationId || executionRef.conversation_id);
            const executionId = normalizeId(executionRef.executionId || executionRef.execution_id);
            if (!conversationId || !executionId || !activity?.id) return state;
            const session = state.sessions[conversationId] || emptySession();
            const previous = session.executions[executionId] || normalizeExecution(executionRef) || {};
            const execution = {
                ...mergeExecution(previous, executionRef),
                executionId,
                conversationId,
                activities: mergeActivity(previous.activities, activity),
            };
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: {
                        ...sessionWithExecution(session, execution),
                    },
                },
            };
        }),

    patchActivity: (conversationIdValue, executionIdValue, activityIdValue, patch = {}) =>
        set((state) => {
            const conversationId = normalizeId(conversationIdValue);
            const executionId = normalizeId(executionIdValue);
            const activityId = normalizeId(activityIdValue);
            const session = state.sessions[conversationId];
            const execution = session?.executions?.[executionId];
            if (!conversationId || !executionId || !activityId || !execution) return state;
            const activities = (execution.activities || []).map((item) => {
                if (normalizeId(item?.id) !== activityId) return item;
                // A late optimistic composer acknowledgement/error cannot undo a
                // server-owned receipt, withdrawal or version replacement.
                if (item.kind === 'guidance' && item.state !== 'submitting'
                    && ['pending', 'failed'].includes(patch.state)) return item;
                return {...item, ...patch, id: activityId};
            });
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: {
                        ...session,
                        executions: {
                            ...session.executions,
                            [executionId]: { ...execution, activities },
                        },
                    },
                },
            };
        }),

    close: (conversationIdValue) =>
        set((state) => {
            const conversationId = normalizeId(conversationIdValue);
            const session = state.sessions[conversationId];
            if (!session?.isOpen) return state;
            return {
                sessions: {
                    ...state.sessions,
                    [conversationId]: { ...session, isOpen: false, navigationRequest: null },
                },
            };
        }),

    clearConversation: (conversationIdValue) =>
        set((state) => {
            const conversationId = normalizeId(conversationIdValue);
            if (!conversationId || !state.sessions[conversationId]) return state;
            const sessions = { ...state.sessions };
            delete sessions[conversationId];
            return { sessions };
        }),

    openGuidanceEditor: (incoming, {guidanceId, mode = 'rewrite'} = {}) => {
        let opened = false;
        set((state) => {
        const execution = normalizeExecution(incoming);
        if (!execution?.conversationId) return state;
        const cid = execution.conversationId;
        const existing = state.sessions[cid] || emptySession();
        const session = sessionWithExecution(existing, execution);
        const current = session.executions[execution.executionId];
        const source = current.activities?.find((activity) => activity.id === guidanceId);
        if (!current.active || current.status === 'cancelling' || !source || ['widget_response', 'agent_message'].includes(source.source)
            || source.replacedByGuidanceId || source.state === 'replaced') return state;
        if (mode === 'rewrite' && (source.state !== 'withdrawn' || source.canRewrite !== true)) return state;
        if (!['rewrite', 'correction'].includes(mode)) return state;
        const draftKey = `${execution.executionId}:${mode}:${guidanceId}`;
        const previous = session.guidanceDrafts[draftKey];
        const draft = previous && previous.state !== 'sent' ? previous : {
            executionId: execution.executionId, draftKey, sourceId: guidanceId, mode,
            content: source.content || source.label || '', state: 'editing', submissionId: null,
            attachments: Array.isArray(source.attachments) ? source.attachments.map((item) => ({...item})) : [],
            visionAttachmentIds: Array.isArray(source.visionAttachmentIds) ? [...source.visionAttachmentIds] : [],
            submittedContent: null, replacesGuidanceId: mode === 'rewrite' ? guidanceId : null, error: '',
        };
        opened = true;
        return {sessions: {...state.sessions, [cid]: {...session, isOpen: true,
            activeExecutionId: execution.executionId,
            guidanceDrafts: {...session.guidanceDrafts, [draftKey]: draft},
            guidanceEditor: {executionId: execution.executionId, draftKey},
            navigationSequence: (session.navigationSequence || 0) + 1,
            navigationRequest: {guidanceEditor: true, requestId: (session.navigationSequence || 0) + 1},
        }}};
        });
        return opened;
    },

    updateGuidanceDraft: (cid, draftKey, content) => set((state) => {
        const session = state.sessions[cid];
        const draft = session?.guidanceDrafts?.[draftKey];
        if (!draft || ['submitting', 'uncertain', 'sent'].includes(draft.state)) return state;
        return {sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: {
            ...session.guidanceDrafts, [draftKey]: {...draft, content, state: 'editing',
                submissionId: null, submittedContent: null, error: ''},
        }}}};
    }),

    patchGuidanceDraft: (cid, draftKey, patch, expectedSubmissionId = null) => set((state) => {
        const session = state.sessions[cid];
        const draft = session?.guidanceDrafts?.[draftKey];
        if (!draft || (expectedSubmissionId && draft.submissionId !== expectedSubmissionId)
            || (draft.state === 'sent' && patch.state !== 'sent')) return state;
        return {sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: {
            ...session.guidanceDrafts, [draftKey]: {...draft, ...patch},
        }, guidanceEditor: patch.state === 'sent' && session.guidanceEditor?.draftKey === draftKey
            ? null : session.guidanceEditor}}};
    }),

    closeGuidanceEditor: (cid, executionId) => set((state) => {
        const session = state.sessions[cid];
        if (session?.guidanceEditor?.executionId !== executionId) return state;
        return {sessions: {...state.sessions, [cid]: {...session, guidanceEditor: null}}};
    }),

    reopenGuidanceDraft: (cid, executionId, draftKey) => set((state) => {
        const session = state.sessions[cid];
        const draft = session?.guidanceDrafts?.[draftKey];
        if (!session?.isOpen || session.activeExecutionId !== executionId
            || draft?.executionId !== executionId || draft.state === 'sent') return state;
        const requestId = (session.navigationSequence || 0) + 1;
        return {sessions: {...state.sessions, [cid]: {...session,
            guidanceEditor: {executionId, draftKey}, navigationSequence: requestId,
            navigationRequest: {guidanceEditor: true, requestId}}}};
    }),
}));

export const upsertExecution = (execution) => useExecutionStore.getState().upsertExecution(execution);
export const openExecution = (execution, target) => useExecutionStore.getState().openExecution(execution, target);
export const consumeExecutionNavigation = (conversationId, requestId) =>
    useExecutionStore.getState().consumeNavigation(conversationId, requestId);
export const openExecutionById = (conversationId, executionId) =>
    useExecutionStore.getState().openById(conversationId, executionId);
export const upsertExecutionActivity = (execution, activity) =>
    useExecutionStore.getState().upsertActivity(execution, activity);
export const patchExecutionActivity = (conversationId, executionId, activityId, patch) =>
    useExecutionStore.getState().patchActivity(conversationId, executionId, activityId, patch);
export const closeExecution = (conversationId) => useExecutionStore.getState().close(conversationId);
export const clearExecutionConversation = (conversationId) =>
    useExecutionStore.getState().clearConversation(conversationId);
export const openGuidanceEditor = (execution, target) => useExecutionStore.getState().openGuidanceEditor(execution, target);
