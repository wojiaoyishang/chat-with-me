/** Listener-delivery policy for the frontend semantic event runtime. */

export const EventDirection = Object.freeze({
    LOCAL: 'local',
    OUTGOING: 'outgoing',
    INCOMING: 'incoming',
});

const VALID_EVENT_DIRECTIONS = new Set(Object.values(EventDirection));

/**
 * Normalize an optional listener direction filter.
 *
 * ``null`` means that the listener accepts events from every direction.
 */
export const normalizeEventDirections = (value) => {
    if (value === null || value === undefined || value === '') return null;

    const source = Array.isArray(value) ? value : [value];
    const normalized = new Set();
    source.forEach((item) => {
        const direction = String(item || '').trim().toLowerCase();
        if (!VALID_EVENT_DIRECTIONS.has(direction)) {
            throw new TypeError(`Invalid CWM event direction: ${item}`);
        }
        normalized.add(direction);
    });

    return normalized.size > 0 ? normalized : null;
};

/**
 * Decide whether one listener should receive an envelope after correlation
 * replies have already been settled by the event store.
 *
 * Reply envelopes are transport/correlation messages rather than domain
 * broadcasts. They are therefore hidden from ordinary listeners unless the
 * listener explicitly opts in with ``includeReplies``.
 */
export const shouldDeliverEventToListener = ({
    direction,
    replyTo = null,
    listenerDirections = null,
    includeReplies = false,
}) => {
    const normalizedDirection = String(direction || '').trim().toLowerCase();
    if (!VALID_EVENT_DIRECTIONS.has(normalizedDirection)) {
        throw new TypeError(`Invalid CWM event direction: ${direction}`);
    }

    if (replyTo && !includeReplies) return false;
    if (listenerDirections && !listenerDirections.has(normalizedDirection)) return false;
    return true;
};
