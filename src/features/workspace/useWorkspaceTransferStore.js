import {create} from 'zustand';

const EMPTY_TRANSFERS = Object.freeze([]);

const normalizeTransfer = (value) => {
    if (!value || typeof value !== 'object' || !value.transferId) return null;
    return {
        ...value,
        artifactId: value.artifactId || value.serverId || null,
        toolCallId: value.toolCallId || value.tool_call_id || null,
        executionId: value.executionId || value.execution_id || null,
        progress: Number.isFinite(Number(value.progress))
            ? Math.max(0, Math.min(1, Number(value.progress)))
            : value.status === 'completed' ? 1 : null,
    };
};

export const useWorkspaceTransferStore = create((set) => ({
    transfersById: {},
    executionTransferIds: {},
    toolCallTransferIds: {},

    upsertTransfer: (incoming) => set((state) => {
        const transfer = normalizeTransfer(incoming);
        if (!transfer) return state;

        const existing = state.transfersById[transfer.transferId] || {};
        const merged = {...existing, ...transfer};
        const transfersById = {...state.transfersById, [transfer.transferId]: merged};
        const executionTransferIds = {...state.executionTransferIds};
        const toolCallTransferIds = {...state.toolCallTransferIds};

        if (merged.executionId) {
            const current = executionTransferIds[merged.executionId] || EMPTY_TRANSFERS;
            if (!current.includes(merged.transferId)) {
                executionTransferIds[merged.executionId] = [...current, merged.transferId];
            }
        }
        if (merged.toolCallId) {
            const current = toolCallTransferIds[merged.toolCallId] || EMPTY_TRANSFERS;
            if (!current.includes(merged.transferId)) {
                toolCallTransferIds[merged.toolCallId] = [...current, merged.transferId];
            }
        }

        return {transfersById, executionTransferIds, toolCallTransferIds};
    }),

    clearConversationTransfers: () => set({
        transfersById: {},
        executionTransferIds: {},
        toolCallTransferIds: {},
    }),
}));

export const upsertWorkspaceTransfer = (transfer) => {
    useWorkspaceTransferStore.getState().upsertTransfer(transfer);
};

export const clearWorkspaceTransfers = () => {
    useWorkspaceTransferStore.getState().clearConversationTransfers();
};

export const selectToolCallTransfer = (state, toolCallId) => {
    if (!toolCallId) return null;
    const ids = state.toolCallTransferIds[toolCallId] || EMPTY_TRANSFERS;
    const transferId = ids[ids.length - 1];
    return transferId ? state.transfersById[transferId] || null : null;
};

export const selectExecutionTransfers = (state, executionId) => {
    if (!executionId) return EMPTY_TRANSFERS;
    return (state.executionTransferIds[executionId] || EMPTY_TRANSFERS)
        .map((id) => state.transfersById[id])
        .filter(Boolean);
};
