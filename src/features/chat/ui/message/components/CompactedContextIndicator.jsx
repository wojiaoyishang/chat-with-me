import React, {memo} from 'react';
import {Archive} from 'lucide-react';
import ContextStateIndicator from './ContextStateIndicator.jsx';

const CompactedContextIndicator = memo(({
    markId,
    messageId,
    replacementId = null,
    label = '已压缩',
    className = '',
}) => (
    <ContextStateIndicator
        icon={Archive}
        markId={markId}
        messageId={messageId}
        replacementId={replacementId}
        label={label}
        state="compacted"
        className={className}
    />
));

CompactedContextIndicator.displayName = 'CompactedContextIndicator';
export default CompactedContextIndicator;
