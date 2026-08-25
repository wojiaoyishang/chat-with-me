import {create} from 'zustand';

const normalizeId = (value) => String(value || '').trim();

const buildEmptySession = () => ({
    isOpen: false,
    activeCardId: null,
    pendingCardId: null,
    cards: {},
});

const getSession = (state, conversationId) => (
    state.sessions[conversationId] || buildEmptySession()
);

export const useTaskMonitorStore = create((set) => ({
    sessions: {},

    upsertCard: (incoming) => set((state) => {
        const conversationId = normalizeId(incoming?.conversationId);
        const cardId = normalizeId(incoming?.cardId);
        if (!conversationId || !cardId) return state;

        const session = getSession(state, conversationId);
        const card = {
            ...(session.cards[cardId] || {}),
            ...incoming,
            conversationId,
            cardId,
        };
        const cards = {
            ...session.cards,
            [cardId]: card,
        };

        const shouldResolvePending = (
            session.isOpen
            && session.pendingCardId === cardId
        );

        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    cards,
                    activeCardId: shouldResolvePending ? cardId : session.activeCardId,
                    pendingCardId: shouldResolvePending ? null : session.pendingCardId,
                },
            },
        };
    }),

    openCard: (incoming) => set((state) => {
        const conversationId = normalizeId(incoming?.conversationId);
        const cardId = normalizeId(incoming?.cardId);
        if (!conversationId || !cardId) return state;

        const session = getSession(state, conversationId);
        const card = {
            ...(session.cards[cardId] || {}),
            ...incoming,
            conversationId,
            cardId,
        };

        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    isOpen: true,
                    activeCardId: cardId,
                    pendingCardId: null,
                    cards: {
                        ...session.cards,
                        [cardId]: card,
                    },
                },
            },
        };
    }),

    followCard: (conversationIdValue, cardIdValue) => set((state) => {
        const conversationId = normalizeId(conversationIdValue);
        const cardId = normalizeId(cardIdValue);
        if (!conversationId || !cardId) return state;

        const session = state.sessions[conversationId];
        // Only an already-open monitor follows server-created Task Mode segments.
        // A closed monitor must stay closed and must not preselect a card for later.
        if (!session?.isOpen) return state;

        const hasSnapshot = Boolean(session.cards[cardId]);
        if (
            hasSnapshot
            && session.activeCardId === cardId
            && session.pendingCardId === null
        ) {
            return state;
        }
        if (!hasSnapshot && session.pendingCardId === cardId) return state;

        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    activeCardId: hasSnapshot ? cardId : session.activeCardId,
                    pendingCardId: hasSnapshot ? null : cardId,
                },
            },
        };
    }),

    close: (conversationIdValue) => set((state) => {
        const conversationId = normalizeId(conversationIdValue);
        if (!conversationId || !state.sessions[conversationId]) return state;
        const session = state.sessions[conversationId];
        if (!session.isOpen && session.pendingCardId === null) return state;

        return {
            sessions: {
                ...state.sessions,
                [conversationId]: {
                    ...session,
                    isOpen: false,
                    pendingCardId: null,
                },
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

export const registerTaskMonitorCard = (card) => {
    useTaskMonitorStore.getState().upsertCard(card);
};

export const openTaskMonitorCard = (card) => {
    useTaskMonitorStore.getState().openCard(card);
};

export const followTaskMonitorCard = (conversationId, cardId) => {
    useTaskMonitorStore.getState().followCard(conversationId, cardId);
};

export const closeTaskMonitor = (conversationId) => {
    useTaskMonitorStore.getState().close(conversationId);
};

export const clearTaskMonitorConversation = (conversationId) => {
    useTaskMonitorStore.getState().clearConversation(conversationId);
};
