import React, {memo} from 'react';
import IgnoredContextIndicator from './IgnoredContextIndicator.jsx';
import CompactedContextIndicator from './CompactedContextIndicator.jsx';

const isToolReplacement = (replacementId) => {
    const value = String(replacementId || '');
    return value.startsWith('workspace-transfer:')
        || value.startsWith('tool-result-')
        || value.endsWith('-toolCalling')
        || value.endsWith('-toolCommand')
        || value.endsWith('-toolLog');
};

/**
 * Replacement-local status indicator for non-tool cards.
 *
 * Tool-call status is intentionally aggregated by the enclosing `toolCalling`
 * status card so one invocation renders exactly one indicator beside
 * "Tool Calling Finished" instead of repeating on nested command/result cards.
 */
const ReplacementContextBadge = memo(({conversationId, messageId, replacementId, status}) => {
    if (isToolReplacement(replacementId)) return null;
    const effectiveStatus = status && typeof status === 'object' ? status : null;
    if (!effectiveStatus) return null;

    const value = String(effectiveStatus.status || '').toLowerCase();
    const forgotten = value === 'forgotten' || value === 'ignored';

    if (forgotten) {
        return (
            <div className="mb-1 flex justify-start" data-tts-ignore="true">
                <IgnoredContextIndicator
                    conversationId={conversationId}
                    messageId={messageId}
                    replacementId={replacementId}
                    label="已忽略"
                />
            </div>
        );
    }

    return (
        <div className="mb-1 flex justify-start" data-tts-ignore="true">
            <CompactedContextIndicator
                conversationId={conversationId}
                messageId={messageId}
                replacementId={replacementId}
                label="已压缩"
            />
        </div>
    );
});

ReplacementContextBadge.displayName = 'ReplacementContextBadge';
export default ReplacementContextBadge;
