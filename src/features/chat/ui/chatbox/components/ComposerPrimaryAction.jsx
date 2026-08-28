import React, {memo} from 'react';

import {RealtimeVoiceButton} from '@/features/chat/voice/index.js';
import SendButton from './SendButton';

const ComposerPrimaryAction = memo(({
    status,
    messageContent,
    attachmentsMeta,
    onSend,
    executionActive = false,
    executionStatus = '',
    executionGuidancePending = false,
    isEditMessage = false,
    isForkMode = false,
    isReadOnly = false,
    selectedModel = null,
    realtimeVoiceCapability = null,
    onRealtimeVoiceStart,
    realtimeVoicePayload = null,
    voiceInputBusy = false,
    uploadPending = false,
    t,
}) => {
    const hasInput = Boolean(messageContent?.trim()) || (attachmentsMeta?.length || 0) > 0;
    const realtimeVoiceAvailable = realtimeVoiceCapability?.available === true;
    const showRealtimeVoice = (
        status === 'normal'
        && !hasInput
        && !executionActive
        && !executionGuidancePending
        && !isEditMessage
        && !isForkMode
        && !isReadOnly
        && !voiceInputBusy
        && !uploadPending
        && Boolean(selectedModel?.id)
        && realtimeVoiceAvailable
        && typeof onRealtimeVoiceStart === 'function'
    );

    if (showRealtimeVoice) {
        return (
            <RealtimeVoiceButton
                onClick={() => onRealtimeVoiceStart(realtimeVoicePayload || {})}
                t={t}
            />
        );
    }

    return (
        <SendButton
            status={status}
            messageContent={messageContent}
            attachmentsMeta={attachmentsMeta}
            onClick={onSend}
            executionActive={executionActive}
            executionStatus={executionStatus}
            executionGuidancePending={executionGuidancePending}
            t={t}
        />
    );
});

ComposerPrimaryAction.displayName = 'ComposerPrimaryAction';

export default ComposerPrimaryAction;
