import React from 'react';
import {AudioLines} from 'lucide-react';

export default function RealtimeVoiceButton({onClick, disabled = false}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
            title="实时语音对话"
            aria-label="开始实时语音对话"
        >
            <AudioLines size={19}/>
        </button>
    );
}
