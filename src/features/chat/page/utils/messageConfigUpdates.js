const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const revisionOf = (value) => Number.isInteger(value) && value >= 0 ? value : 0;

/** Keep persisted user settings monotonic across HTTP, stream and history delivery. */
export const mergeMessageConfig = (current, incoming) => {
    if (!isRecord(incoming)) return current;
    const hasCompressible = typeof incoming.compressible === 'boolean';
    const hasBadges = Array.isArray(incoming.badges);
    const hasCanConfigure = typeof incoming.canConfigure === 'boolean';
    if (!hasCompressible && !hasBadges && !hasCanConfigure) return current;
    const revision = revisionOf(incoming.revision);
    if (revisionOf(current?.revision) > revision) return current;
    return {
        ...(isRecord(current) ? current : {}),
        ...(hasCompressible ? {compressible: incoming.compressible} : {}),
        ...(hasCanConfigure ? {canConfigure: incoming.canConfigure} : {}),
        ...(hasBadges ? {badges: incoming.badges.map(badge => isRecord(badge) ? {...badge} : badge)} : {}),
        revision,
    };
};

export const mergeMessageContextState = (message, state, revision) => {
    if (!message || !isRecord(state)) return message;
    const version = revisionOf(revision);
    if (revision !== undefined && version < revisionOf(message.contextStateRevision)) return message;
    const nextState = {...state};
    // A stale compaction badge cannot visually undo a newer protection choice.
    if (message.messageConfig?.compressible === false) delete nextState.compactions;
    return {
        ...message,
        contextState: nextState,
        ...(revision !== undefined ? {contextStateRevision: version} : {}),
    };
};

/** Metadata updates deliberately do not create messages, affect order or scroll. */
export const applyMessageConfigUpdate = (messages, payload) => {
    if (!isRecord(payload)) return messages;
    const next = {...messages};
    const message = next[payload.messageId];
    if (message && payload.messageConfig) {
        const updated = {
            ...message,
            messageConfig: mergeMessageConfig(message.messageConfig, payload.messageConfig),
        };
        next[payload.messageId] = mergeMessageContextState(updated, updated.contextState || {}, payload.contextRevision);
    }
    const restored = new Set(Array.isArray(payload.restoredArtifactIds) ? payload.restoredArtifactIds : []);
    for (const id of Array.isArray(payload.affectedMessageIds) ? payload.affectedMessageIds : []) {
        const affected = next[id];
        if (!affected || !restored.size || !Array.isArray(affected.contextState?.compactions)) continue;
        const state = {
            ...affected.contextState,
            compactions: affected.contextState.compactions.filter(item => !restored.has(item?.artifactId)),
        };
        if (!state.compactions.length) delete state.compactions;
        next[id] = mergeMessageContextState(affected, state, payload.contextRevision);
    }
    for (const [id, state] of Object.entries(isRecord(payload.messageStates) ? payload.messageStates : {})) {
        if (next[id]) next[id] = mergeMessageContextState(next[id], state, payload.contextRevision);
    }
    return next;
};
