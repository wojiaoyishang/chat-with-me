import { memo } from 'react';

import { defaultRenderMarkdown } from '../constants.jsx';

const MarkdownBlock = memo(({
    content = '',
    renderMarkdown = defaultRenderMarkdown,
}) => {
    return (
        <div className="my-3">
            {renderMarkdown(content)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.content === next.content &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

MarkdownBlock.displayName = 'MarkdownBlock';

export default MarkdownBlock;
