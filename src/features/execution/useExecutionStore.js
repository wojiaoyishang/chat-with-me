import {create} from 'zustand';

const normalizeId = (value) => String(value || '').trim();

const emptySession = () => ({
    isOpen: false,
    activeExecutionId: null,
    executions: {},
});

const mergeActivity = (activities = [], incoming = {}) => {
    const activityId = normalizeId(incoming?.id);
    if (!activityId) return Array.isArray(activities) ? activities : [];
    const source = Array.isArray(activities) ? activities : [];
    const index = source.findIndex(item => normalizeId(item?.id) === activityId);
    if (index < 0) return [...source, incoming].slice(-80);
    const next = [...source];
    next[index] = {...next[index], ...incoming, id: activityId};
    return next;
};

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
        taskMode: incoming?.taskMode && typeof incoming.taskMode === 'object' ? incoming.taskMode : {},
    };
};

export const useExecutionStore = create((set) => ({
    sessions: {},

    upsertExecution: (incoming) => set((state) => {
        const execution = normalizeExecution(incoming);
        if (!execution?.executionId || !execution?.conversationId) return state;
        const conversationId = execution.conversationId;
        const session = state.sessions[conversationId] || emptySession();
        const previous = session.executions[execution.executionId] || {};
        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    executions: {
                        ...session.executions,
                        [execution.executionId]: {...previous, ...execution},
                    },
                },
            },
        };
    }),

    openExecution: (incoming) => set((state) => {
        const execution = normalizeExecution(incoming);
        if (!execution?.executionId || !execution?.conversationId) return state;
        const conversationId = execution.conversationId;
        const session = state.sessions[conversationId] || emptySession();
        const previous = session.executions[execution.executionId] || {};
        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    isOpen: true,
                    activeExecutionId: execution.executionId,
                    executions: {
                        ...session.executions,
                        [execution.executionId]: {...previous, ...execution},
                    },
                },
            },
        };
    }),

    openById: (conversationIdValue, executionIdValue) => set((state) => {
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
                },
            },
        };
    }),

    upsertActivity: (executionRef = {}, activity = {}) => set((state) => {
        const conversationId = normalizeId(executionRef.conversationId || executionRef.conversation_id);
        const executionId = normalizeId(executionRef.executionId || executionRef.execution_id);
        if (!conversationId || !executionId || !activity?.id) return state;
        const session = state.sessions[conversationId] || emptySession();
        const previous = session.executions[executionId] || normalizeExecution(executionRef) || {};
        const execution = {
            ...previous,
            ...executionRef,
            executionId,
            conversationId,
            activities: mergeActivity(previous.activities, activity),
        };
        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    executions: {...session.executions, [executionId]: execution},
                },
            },
        };
    }),

    patchActivity: (conversationIdValue, executionIdValue, activityIdValue, patch = {}) => set((state) => {
        const conversationId = normalizeId(conversationIdValue);
        const executionId = normalizeId(executionIdValue);
        const activityId = normalizeId(activityIdValue);
        const session = state.sessions[conversationId];
        const execution = session?.executions?.[executionId];
        if (!conversationId || !executionId || !activityId || !execution) return state;
        const activities = (execution.activities || []).map((item) => (
            normalizeId(item?.id) === activityId ? {...item, ...patch, id: activityId} : item
        ));
        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    executions: {
                        ...session.executions,
                        [executionId]: {...execution, activities},
                    },
                },
            },
        };
    }),

    close: (conversationIdValue) => set((state) => {
        const conversationId = normalizeId(conversationIdValue);
        const session = state.sessions[conversationId];
        if (!session?.isOpen) return state;
        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {...session, isOpen: false},
            },
        };
    }),

    clearConversation: (conversationIdValue) => set((state) => {
        const conversationId = normalizeId(conversationIdValue);
        if (!conversationId || !state.sessions[conversationId]) return state;
        const sessions = {...state.sessions};
        delete sessions[conversationId];
        return {sessions};
    }),
}));

export const upsertExecution = (execution) => useExecutionStore.getState().upsertExecution(execution);
export const openExecution = (execution) => useExecutionStore.getState().openExecution(execution);
export const openExecutionById = (conversationId, executionId) => useExecutionStore.getState().openById(conversationId, executionId);
export const upsertExecutionActivity = (execution, activity) => useExecutionStore.getState().upsertActivity(execution, activity);
export const patchExecutionActivity = (conversationId, executionId, activityId, patch) => useExecutionStore.getState().patchActivity(conversationId, executionId, activityId, patch);
export const closeExecution = (conversationId) => useExecutionStore.getState().close(conversationId);
export const clearExecutionConversation = (conversationId) => useExecutionStore.getState().clearConversation(conversationId);
