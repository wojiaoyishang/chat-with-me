import React from 'react';
import {AudioLines} from 'lucide-react';

export default function RealtimeVoiceButton({onClick, disabled = false, t}) {
    const label = typeof t === 'function'
        ? t('realtime_voice_start', {defaultValue: '开始实时语音对话'})
        : '开始实时语音对话';

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="p-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            title={label}
            aria-label={label}
        >
            <AudioLines size={24}/>
        </button>
    );
}
