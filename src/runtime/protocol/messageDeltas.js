const DELTA_EVENTS = new Set(['message.content.delta', 'message.replacement.delta']);
export const MAX_MESSAGE_DELTA_CHARACTERS = 64 * 1024;
const MAX_DELTA_TARGETS = 256;
const entries = (value) => value && typeof value === 'object' && !Array.isArray(value) ? Object.entries(value) : null;

/** Combine adjacent text patches only; full snapshots and typed card values are barriers. */
export function mergeMessageDeltaValues(event, left, right) {
    if (!DELTA_EVENTS.has(event)) return null;
    const first = entries(left);
    const second = entries(right);
    if (!first || !second) return null;
    const merged = new Map();
    let characters = 0;
    let targets = 0;
    for (const [id, value] of [...first, ...second]) {
        if (event === 'message.content.delta') {
            if (typeof value !== 'string') return null;
            if (!merged.has(id)) targets += 1;
            merged.set(id, (merged.get(id) || '') + value);
            characters += value.length;
        } else {
            const patches = entries(value);
            if (!patches) return null;
            const card = merged.get(id) || new Map();
            for (const [cardId, text] of patches) {
                if (typeof text !== 'string') return null;
                if (!card.has(cardId)) targets += 1;
                card.set(cardId, (card.get(cardId) || '') + text);
                characters += text.length;
            }
            merged.set(id, card);
        }
        if (characters > MAX_MESSAGE_DELTA_CHARACTERS || targets > MAX_DELTA_TARGETS) return null;
    }
    return Object.fromEntries([...merged].map(([id, value]) => [id, value instanceof Map ? Object.fromEntries(value) : value]));
}

/** Only fire-and-forget text deltas in the same protocol scope may share a callback. */
export function messageDeltaBatchKey(envelope) {
    if (!DELTA_EVENTS.has(envelope.event) || envelope.reply_to || envelope.payload?.reply
        || Object.keys(envelope.payload || {}).some((key) => !['value', 'reply'].includes(key))) return null;
    if (envelope.event === 'message.replacement.delta' && Object.values(envelope.payload?.value || {})
        .some((patch) => Object.values(patch || {}).some((value) => typeof value === 'string' && /\[(?:DONE|FAILED)(?::[^\]]*)?\]/i.test(value)))) return null;
    return JSON.stringify([envelope.event, envelope.conversation_id, envelope.document_id,
        envelope.turn_id, envelope.run_id, envelope.stream_id]);
}

export function mergeMessageDeltaEnvelopes(left, right) {
    const key = messageDeltaBatchKey(left);
    if (!key || key !== messageDeltaBatchKey(right)) return null;
    const value = mergeMessageDeltaValues(right.event, left.payload.value, right.payload.value);
    return value ? {...right, payload: {...right.payload, value}} : null;
}
