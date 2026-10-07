import { memo } from 'react';
import { LoaderCircle } from 'lucide-react';

import { defaultRenderMarkdown } from '../constants.jsx';
import useExpandedState from '../useExpandedState.js';

const AgentBody = memo(
    ({ cleanContent, expandedKey, hasContent, isFinished, renderMarkdown = defaultRenderMarkdown }) => {
        const [isExpanded] = useExpandedState(expandedKey);

        if (!isExpanded && (hasContent || isFinished)) {
            return null;
        }

        return (
            <div className="border-t p-4 bg-white">
                {hasContent ? (
                    renderMarkdown(cleanContent)
                ) : (
                    <div className="flex items-center gap-2 text-[12px] text-zinc-400">
                        {!isFinished && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
                        {isFinished ? '暂无正文内容' : '等待模型响应…'}
                    </div>
                )}
            </div>
        );
    },
    (prev, next) => {
        return (
            prev.cleanContent === next.cleanContent &&
            prev.expandedKey === next.expandedKey &&
            prev.hasContent === next.hasContent &&
            prev.isFinished === next.isFinished &&
            prev.renderMarkdown === next.renderMarkdown
        );
    },
);

AgentBody.displayName = 'AgentBody';

export default AgentBody;
