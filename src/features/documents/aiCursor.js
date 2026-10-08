import * as Y from 'yjs';
export function resolveAiCursors(doc, participants, cache) {
    const text = doc.getText('content');
    const toIndex = (position) => Array.from(text.toString()).slice(0, position).join('').length;
    return participants.map((person) => {
        if (person.kind !== 'ai' || !person.absoluteCursor) return person;
        const key = JSON.stringify(person.absoluteCursor);
        let entry = cache.get(person.clientId);
        if (!entry || entry.key !== key) {
            entry = {
                key,
                cursor: {
                    anchor: Y.relativePositionToJSON(
                        Y.createRelativePositionFromTypeIndex(text, toIndex(person.absoluteCursor.anchor)),
                    ),
                    head: Y.relativePositionToJSON(
                        Y.createRelativePositionFromTypeIndex(text, toIndex(person.absoluteCursor.head)),
                    ),
                },
            };
            cache.set(person.clientId, entry);
        }
        return { ...person, cursor: entry.cursor };
    });
}
