import React, {memo} from 'react';
import {EyeOff} from 'lucide-react';
import ContextStateIndicator from './ContextStateIndicator.jsx';
import {useIgnoringDisabled} from '../MessageIgnoringContext.jsx';

const IgnoredContextIndicator = memo(({
    conversationId,
    messageId,
    replacementId = null,
    label = '已忽略',
    className = '',
}) => {
    const ignoringDisabled = useIgnoringDisabled();
    if (ignoringDisabled) return null;
    return <ContextStateIndicator
        icon={EyeOff}
        conversationId={conversationId}
        messageId={messageId}
        replacementId={replacementId}
        label={label}
        state="ignored"
        className={className}
    />;
});

IgnoredContextIndicator.displayName = 'IgnoredContextIndicator';
export default IgnoredContextIndicator;
