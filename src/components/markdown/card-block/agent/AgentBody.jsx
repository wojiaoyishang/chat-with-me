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

    if (!isExpanded) {
        return null;
    }

    return (
        <div className="border-t p-4 bg-white">
            {hasContent ? (
                renderMarkdown(cleanContent)
            ) : (
                <div className="text-[12px] text-zinc-400 italic">
                    暂无正文内容
                </div>
            )}
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