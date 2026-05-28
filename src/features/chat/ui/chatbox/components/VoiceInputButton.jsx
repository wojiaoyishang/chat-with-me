import React, {memo} from 'react';
import {Mic, Type} from 'lucide-react';

const VoiceInputButton = memo(({
                                   isMobile,
                                   isMobileVoiceMode,
                                   isRecording,
                                   isPending,
                                   disabled,
                                   onClick,
                                   labels = {},
                               }) => {
    const text = {
        input: labels.input || 'Voice input',
        switchToText: labels.switchToText || 'Switch to text input',
        cancelRecording: labels.cancelRecording || 'Cancel recording',
    };
    const isDesktopRecording = !isMobile && isRecording;
    const isDisabled = disabled || isPending;

    if (isDesktopRecording) {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={isDisabled}
                className="inline-flex h-7 items-center justify-center rounded-full border border-red-200 bg-red-50 px-3 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={text.cancelRecording}
            >
                {text.cancelRecording}
            </button>
        );
    }

    const Icon = isMobile && isMobileVoiceMode ? Type : Mic;
    const label = isMobile && isMobileVoiceMode ? text.switchToText : text.input;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={label}
            title={label}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
});

VoiceInputButton.displayName = 'VoiceInputButton';

export default VoiceInputButton;
