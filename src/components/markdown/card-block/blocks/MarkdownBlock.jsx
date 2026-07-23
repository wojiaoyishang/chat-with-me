import { memo } from 'react';

import { defaultRenderMarkdown } from '../constants.jsx';

const MarkdownBlock = memo(({
    content = '',
    id = '',
    allowTts = false,
    renderMarkdown = defaultRenderMarkdown,
}) => {
    return (
        <div
            className="my-3"
            data-tts-source-id={id || undefined}
            data-tts-source-type="replacement"
            data-tts-ignore={allowTts ? undefined : 'true'}
        >
            {renderMarkdown(content)}
        </div>
    );
}, (prev, next) => {
    return (
        prev.content === next.content &&
        prev.id === next.id &&
        prev.allowTts === next.allowTts &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

MarkdownBlock.displayName = 'MarkdownBlock';

export default MarkdownBlock;
