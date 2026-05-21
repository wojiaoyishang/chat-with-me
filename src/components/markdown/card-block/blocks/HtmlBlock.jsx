import { memo } from 'react';

import { toSafeString } from '../utils.js';

const HtmlBlock = memo(({content = '', id}) => {
    return (
        <div
            className="my-3"
            data-card-block-id={id}
            dangerouslySetInnerHTML={{
                __html: toSafeString(content),
            }}
        />
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

HtmlBlock.displayName = 'HtmlBlock';

export default HtmlBlock;
