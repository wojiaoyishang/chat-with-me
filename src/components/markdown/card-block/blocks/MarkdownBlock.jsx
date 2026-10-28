import { memo } from 'react';

import { defaultRenderMarkdown } from '../constants.jsx';

const MarkdownBlock = memo(({
    content = '',
    id = '',
    allowTts = false,
    renderMarkdown = defaultRenderMarkdown,
}) => {
    // Cleared tool/control replacements stay in history but have no visible
    // body. An empty wrapper's margins would still spread nearby status rows.
    if (!String(content || '').trim()) return null;
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
