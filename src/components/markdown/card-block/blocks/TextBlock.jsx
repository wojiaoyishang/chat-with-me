import { memo } from 'react';

const TextBlock = memo(({content = '', id}) => {
    return (
        <div
            className="my-3 whitespace-pre-wrap"
            data-card-block-id={id}
        >
            {content}
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

TextBlock.displayName = 'TextBlock';

export default TextBlock;
