import { memo } from 'react';

import { defaultRenderMarkdown } from '../constants.jsx';
import useExpandedState from '../useExpandedState.js';

const AgentBody = memo(({
    cleanContent,
    expandedKey,
    hasContent,
    renderMarkdown = defaultRenderMarkdown,
}) => {
    const [isExpanded] = useExpandedState(expandedKey);

    if (!isExpanded || !hasContent) {
        return null;
    }

    return (
        <div className="border-t p-4 bg-white">
            {renderMarkdown(cleanContent)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.cleanContent === next.cleanContent &&
        prev.expandedKey === next.expandedKey &&
        prev.hasContent === next.hasContent &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

AgentBody.displayName = 'AgentBody';

export default AgentBody;
