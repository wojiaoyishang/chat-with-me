import * as Y from 'yjs';

// Resolve against the current CRDT, never retain offsets that concurrent edits invalidate.
export function collaboratorPosition(resource, clientId) {
    const state = resource?.awareness.getStates().get(clientId);
    const cursor = state?.aiCursor || state?.cursor;
    if (!cursor?.head) return null;
    const position = Y.createAbsolutePositionFromRelativePosition(
        Y.createRelativePositionFromJSON(cursor.head),
        resource.doc,
    );
    return position?.type === resource.text ? position.index : null;
}
