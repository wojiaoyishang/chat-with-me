/** Utilities for keeping the lightweight message-overview cache authoritative. */

export const MESSAGE_SUMMARY_APPEND_OVERLAP = 2;

const asOrderIndex = (item) => {
    const value = Number(item?.orderIndex);
    return Number.isInteger(value) && value >= 0 ? value : null;
};

/**
 * Return an append cursor that deliberately overlaps the existing tail.
 *
 * The overlap lets a previously empty Assistant placeholder be replaced by
 * its durable preview after generation completes.
 */
export const getMessageSummaryAppendCursor = (
    existingItems = [],
    overlap = MESSAGE_SUMMARY_APPEND_OVERLAP,
) => {
    const lastOrderIndex = asOrderIndex(existingItems[existingItems.length - 1]);
    if (lastOrderIndex === null) return 0;

    const normalizedOverlap = Math.max(1, Number(overlap) || 1);
    return Math.max(0, lastOrderIndex - normalizedOverlap + 1);
};

const deduplicateByMessageId = (items = []) => {
    const result = [];
    const positions = new Map();

    items.forEach((item) => {
        const messageId = String(item?.messageId || '');
        if (!messageId) return;

        if (positions.has(messageId)) {
            const index = positions.get(messageId);
            result[index] = {...result[index], ...item};
            return;
        }

        positions.set(messageId, result.length);
        result.push(item);
    });

    return result;
};

/**
 * Merge one API page into the cached message overview.
 *
 * In append mode the overlapping tail is replaced, not merely de-duplicated.
 * This removes stale branch items and refreshes summaries that were loaded
 * while the Assistant message was still an empty placeholder.
 */
export const mergeMessageSummaryItems = (
    existingItems = [],
    incomingItems = [],
    {append = false} = {},
) => {
    const incoming = deduplicateByMessageId(incomingItems);
    if (!append) return incoming;
    if (incoming.length === 0) return [...existingItems];

    const incomingOrderIndexes = incoming
        .map(asOrderIndex)
        .filter((value) => value !== null);

    if (incomingOrderIndexes.length === 0) {
        return deduplicateByMessageId([...existingItems, ...incoming]);
    }

    const replaceFrom = Math.min(...incomingOrderIndexes);
    const stablePrefix = existingItems.filter((item) => {
        const orderIndex = asOrderIndex(item);
        return orderIndex !== null && orderIndex < replaceFrom;
    });

    return deduplicateByMessageId([...stablePrefix, ...incoming])
        .sort((left, right) => {
            const leftIndex = asOrderIndex(left);
            const rightIndex = asOrderIndex(right);
            if (leftIndex === null && rightIndex === null) return 0;
            if (leftIndex === null) return 1;
            if (rightIndex === null) return -1;
            return leftIndex - rightIndex;
        });
};
