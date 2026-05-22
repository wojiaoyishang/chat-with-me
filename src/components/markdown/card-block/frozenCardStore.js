const MAX_FROZEN_CARD_ENTRIES = 500;

const frozenCardMap = new Map();

const getFrozenCardKey = (contextId, id) => {
    return `${contextId || '__default__'}::${id || '__empty__'}`;
};

const TOOL_LOG_FINAL_RE = /^\s*\[(DONE|FAILED)(?::[^\]]+)?]\s*$/im;
const SIMPLE_FINAL_RE = /\n?\[(DONE|FAILED)]\s*$/;
const AGENT_FINAL_RE = /\n?\[(AGENT-DONE|AGENT-FAILED)]\s*$/;

const hasExplicitStableFlag = (rawEntry) => {
    if (!rawEntry || typeof rawEntry !== 'object') {
        return false;
    }

    return (
        rawEntry.stable === true ||
        rawEntry.isStable === true ||
        rawEntry.frozen === true ||
        rawEntry.isFrozen === true ||
        rawEntry.finished === true ||
        rawEntry.isFinished === true
    );
};

export const isFinalCardContent = (type, content, rawEntry = null) => {
    if (hasExplicitStableFlag(rawEntry)) {
        return true;
    }

    const safeContent = String(content ?? '').trimEnd();

    switch (type) {
        case 'toolLog':
            return TOOL_LOG_FINAL_RE.test(safeContent);

        case 'toolCalling':
        case 'processing':
        case 'thinking':
        case 'coding':
        case 'doc':
            return SIMPLE_FINAL_RE.test(safeContent);

        case 'agent':
            return AGENT_FINAL_RE.test(safeContent);

        default:
            return false;
    }
};

export const getFrozenCardEntry = (contextId, id) => {
    return frozenCardMap.get(getFrozenCardKey(contextId, id)) || null;
};

export const freezeCardEntryIfFinal = ({
    contextId,
    id,
    normalized,
    rawEntry,
}) => {
    if (!normalized?.exists) {
        return normalized;
    }

    const key = getFrozenCardKey(contextId, id);
    const existing = frozenCardMap.get(key);

    if (existing) {
        return existing;
    }

    if (!isFinalCardContent(normalized.type, normalized.content, rawEntry)) {
        return normalized;
    }

    const frozen = {
        ...normalized,
        frozen: true,
    };

    if (frozenCardMap.size >= MAX_FROZEN_CARD_ENTRIES) {
        const firstKey = frozenCardMap.keys().next().value;

        if (firstKey) {
            frozenCardMap.delete(firstKey);
        }
    }

    frozenCardMap.set(key, frozen);

    return frozen;
};

export const clearFrozenCardsByContext = (contextId) => {
    const prefix = `${contextId || '__default__'}::`;

    for (const key of frozenCardMap.keys()) {
        if (key.startsWith(prefix)) {
            frozenCardMap.delete(key);
        }
    }
};
