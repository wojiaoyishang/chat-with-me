import React, {memo} from 'react';
import IgnoredContextIndicator from './IgnoredContextIndicator.jsx';

/**
 * Fallback message-level context status for layouts without a left-side name row.
 *
 * Compaction is intentionally not rendered here:
 * - left messages show the compacted icon beside the name;
 * - middle/right messages expose compaction as a link inside message details.
 */
const MessageContextBadges = memo(({
    conversationId,
    messageId,
    state,
    align = 'left',
    showForgotten = true,
}) => {
    const normalized = state && typeof state === 'object' ? state : {};
    const forgotten = normalized.forgotten === true;
    const visibleForgotten = showForgotten && forgotten;

    if (!visibleForgotten) return null;

    return (
        <div className={`mt-1 flex w-full flex-wrap items-center gap-1.5 ${align === 'right' ? 'justify-end pr-12' : 'justify-start pl-2 lg:pl-10'}`}>
            <IgnoredContextIndicator
                conversationId={conversationId}
                messageId={messageId}
                label="已忽略"
            />
        </div>
    );
});

MessageContextBadges.displayName = 'MessageContextBadges';
export default MessageContextBadges;
