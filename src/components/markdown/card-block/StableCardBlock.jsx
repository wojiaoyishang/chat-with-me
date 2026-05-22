import { memo } from 'react';

import CardBlock from './CardBlock.jsx';

const StableCardBlock = memo((props) => {
    return <CardBlock {...props}/>;
}, (prev, next) => {
    return (
        prev.contextId === next.contextId &&
        prev.id === next.id &&
        prev.type === next.type &&
        prev.content === next.content
    );
});

StableCardBlock.displayName = 'StableCardBlock';

export default StableCardBlock;
