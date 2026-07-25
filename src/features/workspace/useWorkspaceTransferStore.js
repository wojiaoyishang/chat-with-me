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
    taskTransferIds: {},
    latestTransferIdByArtifact: {},

    upsertTransfer: (incoming) => set((state) => {
        const transfer = normalizeTransfer(incoming);
        if (!transfer) return state;

        const existing = state.transfersById[transfer.transferId] || {};
        const merged = {...existing, ...transfer};
        const transfersById = {...state.transfersById, [transfer.transferId]: merged};
        const taskTransferIds = {...state.taskTransferIds};
        const latestTransferIdByArtifact = {...state.latestTransferIdByArtifact};

        if (merged.taskRunId) {
            const current = taskTransferIds[merged.taskRunId] || EMPTY_TRANSFERS;
            if (!current.includes(merged.transferId)) {
                taskTransferIds[merged.taskRunId] = [...current, merged.transferId];
            }
        }
        if (merged.artifactId) {
            latestTransferIdByArtifact[merged.artifactId] = merged.transferId;
        }

        return {transfersById, taskTransferIds, latestTransferIdByArtifact};
    }),

    clearConversationTransfers: () => set({
        transfersById: {},
        taskTransferIds: {},
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

export const selectTaskTransfers = (state, taskRunId) => {
    if (!taskRunId) return EMPTY_TRANSFERS;
    return (state.taskTransferIds[taskRunId] || EMPTY_TRANSFERS)
        .map((id) => state.transfersById[id])
        .filter(Boolean);
};
