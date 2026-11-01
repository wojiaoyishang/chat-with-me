// Counts are complete snapshots. Delayed saves/reloads must not restore a
// queued count after the sender has acknowledged that same segment.
export const mergeBodyForwardingStatus = (current, incoming) => {
    if (!incoming) return current;
    if (!current) return incoming;
    return (current.revision || 0) > (incoming.revision || 0) ? current : incoming;
};
