import { mergeNetworkData } from './networkMerge.js';
import {mergeMessageConfig, mergeMessageContextState} from './messageConfigUpdates.js';

const preserveMessageSettings = (snapshot, current) => {
    if (!snapshot?.messageConfig && !current?.messageConfig) return snapshot;
    const merged = {...snapshot, messageConfig: mergeMessageConfig(current?.messageConfig, snapshot.messageConfig)};
    const stateSource = (current?.contextStateRevision || 0) > (snapshot.contextStateRevision || 0) ? current : snapshot;
    return mergeMessageContextState(merged, stateSource.contextState, stateSource.contextStateRevision);
};

const HISTORY_SENTINEL = '<PREV_MORE>';

const asOrder = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
const withoutHistorySentinel = (value) => asOrder(value).filter((id) => id !== HISTORY_SENTINEL);

const mergeReplacementEntry = (snapshotEntry, liveEntry) => {
    if (!snapshotEntry || typeof snapshotEntry !== 'object') return liveEntry ?? snapshotEntry;
    if (!liveEntry || typeof liveEntry !== 'object') return snapshotEntry;

    const field = Object.hasOwn(snapshotEntry, 'content') ? 'content'
        : Object.hasOwn(snapshotEntry, 'frontend') ? 'frontend' : 'value';
    const snapshotContent = typeof snapshotEntry[field] === 'string' ? snapshotEntry[field] : null;
    const liveContent = typeof liveEntry[field] === 'string' ? liveEntry[field] : null;
    const canKeepLiveContent = (
        snapshotContent !== null
        && liveContent !== null
        && liveContent.length >= snapshotContent.length
        && liveContent.startsWith(snapshotContent)
    );

    return {
        ...liveEntry,
        ...snapshotEntry,
        ...(canKeepLiveContent ? {[field]: liveContent} : {}),
    };
};

/**
 * Merge a persisted HTTP message snapshot into the browser's live stream state
 * without regressing content that has already arrived over WebSocket.
 *
 * The persisted snapshot remains authoritative for structural/message metadata.
 * For the active live message(s), however, stream content and replacement payloads
 * are monotonic.  A shorter persisted prefix must never erase a longer browser copy.
 */
export const mergeLiveMessageWithSnapshot = (snapshotMessage, liveMessage) => {
    if (!snapshotMessage || typeof snapshotMessage !== 'object') return liveMessage ?? snapshotMessage;
    if (!liveMessage || typeof liveMessage !== 'object') return snapshotMessage;

    const merged = {...liveMessage, ...preserveMessageSettings(snapshotMessage, liveMessage)};
    if (snapshotMessage.network || liveMessage.network) {
        // A durable snapshot can lag an AI database switch already seen by the
        // browser. Retain both scopes and keep the live scope as the active one.
        merged.network = mergeNetworkData(snapshotMessage.network, liveMessage.network);
    }
    const snapshotContent = typeof snapshotMessage.content === 'string' ? snapshotMessage.content : null;
    const liveContent = typeof liveMessage.content === 'string' ? liveMessage.content : null;

    if (
        snapshotContent !== null
        && liveContent !== null
        && liveContent.length >= snapshotContent.length
        && liveContent.startsWith(snapshotContent)
    ) {
        merged.content = liveContent;
    }

    if (snapshotMessage.extraInfo || liveMessage.extraInfo) {
        merged.extraInfo = {
            ...(liveMessage.extraInfo || {}),
            ...(snapshotMessage.extraInfo || {}),
        };

        const snapshotReplace = snapshotMessage.extraInfo?.replace;
        const liveReplace = liveMessage.extraInfo?.replace;
        if (snapshotReplace || liveReplace) {
            const replace = {...(snapshotReplace || {})};
            for (const [id, liveEntry] of Object.entries(liveReplace || {})) {
                replace[id] = mergeReplacementEntry(snapshotReplace?.[id], liveEntry);
            }
            merged.extraInfo.replace = replace;
        }
    }

    return merged;
};

/**
 * Preserve a browser-only suffix when a durable history snapshot is a strict
 * prefix of the currently rendered active chain.  This is intentionally limited
 * to the tail: branch switches or historical windows are never spliced together.
 */
export const mergeSnapshotOrderWithLiveTail = (snapshotOrder, currentOrder, messages = {}) => {
    const persisted = withoutHistorySentinel(snapshotOrder);
    const current = withoutHistorySentinel(currentOrder);
    if (!persisted.length || !current.length) return [...asOrder(snapshotOrder)];

    const persistedTail = persisted[persisted.length - 1];
    const tailIndex = current.indexOf(persistedTail);
    if (tailIndex < 0) return [...asOrder(snapshotOrder)];

    const suffix = [];
    let expectedPrev = persistedTail;
    for (let index = tailIndex + 1; index < current.length; index += 1) {
        const messageId = current[index];
        const message = messages?.[messageId];
        if (!message || String(message.prevMessage || '') !== String(expectedPrev || '')) break;
        suffix.push(messageId);
        expectedPrev = messageId;
    }

    if (!suffix.length) return [...asOrder(snapshotOrder)];

    const result = [...asOrder(snapshotOrder)];
    const seen = new Set(result);
    suffix.forEach((messageId) => {
        if (!seen.has(messageId)) {
            result.push(messageId);
            seen.add(messageId);
        }
    });
    return result;
};

/**
 * Re-attach a stream target that disappeared from messagesOrder because a stale
 * history/reconcile snapshot replaced the visible order.  Only a chain extending
 * the current tail can be restored; this cannot switch branches in the middle.
 */
export const restoreMissingStreamTail = (order, messages, targetMessageId) => {
    const original = asOrder(order);
    if (!targetMessageId || original.includes(targetMessageId)) return original;

    const visible = withoutHistorySentinel(original);
    if (!visible.length) return original;

    const visibleSet = new Set(visible);
    const missingChain = [];
    let cursor = String(targetMessageId);
    const visited = new Set();

    while (cursor && !visibleSet.has(cursor)) {
        if (visited.has(cursor)) return original;
        visited.add(cursor);
        const message = messages?.[cursor];
        if (!message || !message.prevMessage) return original;
        missingChain.unshift(cursor);
        cursor = String(message.prevMessage);
    }

    if (!cursor || cursor !== String(visible[visible.length - 1])) return original;

    let expectedPrev = cursor;
    for (const messageId of missingChain) {
        const message = messages?.[messageId];
        if (!message || String(message.prevMessage || '') !== String(expectedPrev)) return original;
        expectedPrev = messageId;
    }

    return [...original, ...missingChain.filter((messageId) => !visibleSet.has(messageId))];
};

export const reconcileHistorySnapshotWithLiveState = ({
    snapshotMessages = {},
    snapshotOrder = [],
    currentMessages = {},
    currentOrder = [],
    liveMessageIds = new Set(),
}) => {
    const order = mergeSnapshotOrderWithLiveTail(snapshotOrder, currentOrder, currentMessages);
    const liveTailIds = new Set(withoutHistorySentinel(order).filter((id) => !withoutHistorySentinel(snapshotOrder).includes(id)));
    const protectedIds = new Set([...(liveMessageIds || []), ...liveTailIds]);

    const messages = {...currentMessages, ...snapshotMessages};
    for (const [messageId, snapshotMessage] of Object.entries(snapshotMessages)) {
        const current = currentMessages[messageId];
        if (!current?.messageConfig || !snapshotMessage || typeof snapshotMessage !== 'object') continue;
        messages[messageId] = preserveMessageSettings(snapshotMessage, current);
    }
    protectedIds.forEach((messageId) => {
        if (snapshotMessages?.[messageId] && currentMessages?.[messageId]) {
            messages[messageId] = mergeLiveMessageWithSnapshot(snapshotMessages[messageId], currentMessages[messageId]);
        }
    });

    return {messages, order, protectedIds};
};

export default {
    mergeLiveMessageWithSnapshot,
    mergeSnapshotOrderWithLiveTail,
    restoreMissingStreamTail,
    reconcileHistorySnapshotWithLiveState,
};
