import * as Y from 'yjs';

// Resolve against the current CRDT, never retain offsets that concurrent edits invalidate.
export function collaboratorPosition(resource, clientId) {
    const cursor = resource?.awareness.getStates().get(clientId)?.cursor;
    if (!cursor?.head) return null;
    const position = Y.createAbsolutePositionFromRelativePosition(
        Y.createRelativePositionFromJSON(cursor.head),
        resource.doc,
    );
    return position?.type === resource.text ? position.index : null;
}
