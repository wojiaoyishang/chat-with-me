import React, {memo} from 'react';
import {EyeOff} from 'lucide-react';
import ContextStateIndicator from './ContextStateIndicator.jsx';

const IgnoredContextIndicator = memo(({
    markId,
    messageId,
    replacementId = null,
    label = '已忽略',
    className = '',
}) => (
    <ContextStateIndicator
        icon={EyeOff}
        markId={markId}
        messageId={messageId}
        replacementId={replacementId}
        label={label}
        state="ignored"
        className={className}
    />
));

IgnoredContextIndicator.displayName = 'IgnoredContextIndicator';
export default IgnoredContextIndicator;
