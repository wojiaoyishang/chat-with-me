import { memo } from 'react';

import { defaultRenderMarkdown } from '../constants.jsx';
import useExpandedState from '../useExpandedState.js';

const StatusBody = memo(({
    cleanContent,
    expandedKey,
    isFailed = false,
    isFinished = false,
    isToolCalling = false,
    renderMarkdown = defaultRenderMarkdown,
}) => {
    const [isExpanded] = useExpandedState(expandedKey);

    if (!isExpanded) {
        return null;
    }

    return (
        <div
            className={`mt-2 ml-2 pl-4 border-l border-gray-200 ${isToolCalling ? 'transition-all duration-300' : ''} ${isToolCalling && !isFinished && !isFailed ? 'card-tool-body-breathe' : ''}`}
        >
            {renderMarkdown(cleanContent)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.cleanContent === next.cleanContent &&
        prev.expandedKey === next.expandedKey &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isToolCalling === next.isToolCalling &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

StatusBody.displayName = 'StatusBody';

export default StatusBody;
