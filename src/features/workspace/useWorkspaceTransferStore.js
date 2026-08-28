import {create} from 'zustand';

const EMPTY_TRANSFERS = Object.freeze([]);

const normalizeTransfer = (value) => {
    if (!value || typeof value !== 'object' || !value.transferId) return null;
    return {
        ...value,
        artifactId: value.artifactId || value.serverId || null,
        progress: Number.isFinite(Number(value.progress))
            ? Math.max(0, Math.min(1, Number(value.progress)))
            : value.status === 'completed' ? 1 : null,
    };
};

export const useWorkspaceTransferStore = create((set) => ({
    transfersById: {},
    executionTransferIds: {},
    latestTransferIdByArtifact: {},

    upsertTransfer: (incoming) => set((state) => {
        const transfer = normalizeTransfer(incoming);
        if (!transfer) return state;

        const existing = state.transfersById[transfer.transferId] || {};
        const merged = {...existing, ...transfer};
        const transfersById = {...state.transfersById, [transfer.transferId]: merged};
        const executionTransferIds = {...state.executionTransferIds};
        const latestTransferIdByArtifact = {...state.latestTransferIdByArtifact};

        if (merged.executionId) {
            const current = executionTransferIds[merged.executionId] || EMPTY_TRANSFERS;
            if (!current.includes(merged.transferId)) {
                executionTransferIds[merged.executionId] = [...current, merged.transferId];
            }
        }
        if (merged.artifactId) {
            latestTransferIdByArtifact[merged.artifactId] = merged.transferId;
        }

        return {transfersById, executionTransferIds, latestTransferIdByArtifact};
    }),

    clearConversationTransfers: () => set({
        transfersById: {},
        executionTransferIds: {},
        latestTransferIdByArtifact: {},
    }),
}));

export const upsertWorkspaceTransfer = (transfer) => {
    useWorkspaceTransferStore.getState().upsertTransfer(transfer);
};

export const clearWorkspaceTransfers = () => {
    useWorkspaceTransferStore.getState().clearConversationTransfers();
};

export const selectArtifactTransfer = (state, artifactId) => {
    if (!artifactId) return null;
    const transferId = state.latestTransferIdByArtifact[artifactId];
    return transferId ? state.transfersById[transferId] || null : null;
};

export const selectExecutionTransfers = (state, executionId) => {
    if (!executionId) return EMPTY_TRANSFERS;
    return (state.executionTransferIds[executionId] || EMPTY_TRANSFERS)
        .map((id) => state.transfersById[id])
        .filter(Boolean);
};
