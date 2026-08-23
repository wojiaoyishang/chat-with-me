import React, {useMemo, useState} from 'react';
import {Activity, ChevronDown, ChevronUp, Mic, MicOff, Minimize2, PhoneOff, Waves} from 'lucide-react';

const STATUS_LABELS = {
    authorizing: '正在授权媒体通道',
    connecting: '正在连接实时语音',
    negotiating: '正在协商语音协议',
    requesting_microphone: '等待麦克风授权',
    listening: '正在听您说',
    user_speaking: '正在听您说',
    understanding: '正在理解',
    thinking: '我在想',
    speaking: '我在说',
    disconnected: '语音连接已断开',
    error: '实时语音出现错误',
    ended: '语音会话已结束',
};

const modeLabel = (mode) => ({
    native_realtime: 'NATIVE REALTIME',
    hybrid_realtime: 'HYBRID REALTIME',
    compatibility: 'COMPATIBILITY',
    degraded: 'DEGRADED',
    text_projection: 'TEXT PROJECTION',
}[mode] || String(mode || 'REALTIME').toUpperCase());

function Waveform({levels = []}) {
    return (
        <div className="flex h-20 items-center justify-center gap-1" aria-hidden="true">
            {levels.map((level, index) => (
                <span
                    key={index}
                    className="w-1 rounded-full bg-current opacity-70 transition-[height] duration-75"
                    style={{height: `${Math.max(6, Math.min(64, 6 + (level || 0) * 58))}px`}}
                />
            ))}
        </div>
    );
}

function ProtocolIndicator({profile}) {
    const [expanded, setExpanded] = useState(false);
    if (!profile?.debug?.showProtocol) return null;
    const fallbacks = Array.isArray(profile.fallbacks) ? profile.fallbacks : [];
    return (
        <div className="w-full max-w-4xl rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
                onClick={() => setExpanded(value => !value)}
            >
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide">
                        <span>{modeLabel(profile.mode)}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{profile.conversationModel?.model || profile.conversationModel?.id || 'Model'}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{profile.asr?.endpoint || profile.asr?.mode || 'ASR'}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{profile.tts?.mode || 'TTS'}</span>
                    </div>
                    {fallbacks.length > 0 && (
                        <div className="mt-0.5 truncate text-[11px] text-amber-600 dark:text-amber-400">
                            {fallbacks.length} 项能力已降级
                        </div>
                    )}
                </div>
                {expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>} 
            </button>
            {expanded && (
                <div className="grid gap-3 border-t border-slate-200/80 px-4 py-3 text-xs dark:border-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                    <div><div className="font-semibold">Transport</div><div>{profile.transport?.protocol}</div><div>{profile.transport?.codec} · {profile.transport?.sampleRate}Hz</div></div>
                    <div><div className="font-semibold">Conversation</div><div>{profile.conversationModel?.provider}</div><div>{profile.conversationModel?.api}</div></div>
                    <div><div className="font-semibold">ASR</div><div>{profile.asr?.provider} / {profile.asr?.mode}</div><div>{profile.asr?.endpoint}{profile.asr?.connectionState ? ` · ${profile.asr.connectionState}` : ''}</div></div>
                    <div><div className="font-semibold">TTS / Barge-in</div><div>{profile.tts?.provider} / {profile.tts?.mode}</div><div>cursor: {profile.bargeIn?.cursorAccuracy}</div></div>
                    {fallbacks.length > 0 && (
                        <div className="sm:col-span-2 lg:col-span-4">
                            <div className="font-semibold text-amber-700 dark:text-amber-300">Fallback</div>
                            {fallbacks.map((item, index) => (
                                <div key={`${item.component}-${index}`} className="mt-1 text-slate-600 dark:text-slate-300">
                                    {item.component}: {item.requested || 'auto'} → {item.selected} · {item.reason}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function RealtimeVoiceSurface({state, onEnd, onMinimize, onRestore, onToggleMute}) {
    const statusLabel = state?.muted
        ? '麦克风已静音'
        : (STATUS_LABELS[state?.status] || state?.status || '实时语音');
    const transcript = state?.partialTranscript || state?.finalTranscript || '';
    const isSpeaking = state?.status === 'speaking';
    const accentClass = isSpeaking ? 'text-violet-500' : 'text-blue-500';
    const summary = useMemo(() => (
        state?.profile?.conversationModel?.model || state?.profile?.conversationModel?.id || 'Realtime Voice'
    ), [state?.profile]);

    if (!state?.open) return null;
    if (state.minimized) {
        return (
            <button
                type="button"
                onClick={onRestore}
                className="fixed bottom-24 right-4 z-[10020] flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
                <span className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 ${accentClass} dark:bg-slate-800`}>
                    <Waves size={18}/>
                    <span className="absolute inset-0 animate-ping rounded-full border border-current opacity-20"/>
                </span>
                <span className="text-left">
                    <span className="block text-sm font-medium text-slate-900 dark:text-slate-100">{statusLabel}</span>
                    <span className="block max-w-44 truncate text-xs text-slate-500">{summary}</span>
                </span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[10010] flex bg-white/96 backdrop-blur-md dark:bg-slate-950/96 md:items-center md:justify-center md:bg-black/35 md:p-6">
            <section className="pretty-scrollbar flex h-[100dvh] w-full min-h-0 flex-col overflow-y-auto bg-white px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] dark:bg-slate-950 md:h-[92dvh] md:max-h-[980px] md:max-w-[1500px] md:rounded-3xl md:border md:border-slate-200 md:px-8 md:py-6 md:shadow-2xl md:dark:border-slate-800">
                <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">CWM Realtime Voice</div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{summary}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={onMinimize} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" title="返回对话">
                            <Minimize2 size={19}/>
                        </button>
                        <button type="button" onClick={onEnd} className="rounded-full bg-red-500 p-2.5 text-white shadow-sm hover:bg-red-600" title="结束语音">
                            <PhoneOff size={19}/>
                        </button>
                    </div>
                </header>

                <div className="mx-auto mt-4 w-full max-w-5xl">
                    <ProtocolIndicator profile={state.profile}/>
                </div>

                <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-8 text-center md:py-12">
                    <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 ${accentClass} shadow-inner dark:bg-slate-900 md:h-28 md:w-28`}>
                        {state.status === 'thinking' || state.status === 'understanding' ? <Activity className="animate-pulse" size={38}/> : <Waves size={40}/>} 
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-50 md:text-3xl">{statusLabel}</h2>
                    <div className={`${accentClass} mt-2 w-full max-w-2xl`}>
                        <Waveform levels={state.waveform}/>
                    </div>

                    <div className="mt-5 min-h-28 w-full max-w-3xl rounded-2xl bg-slate-50 px-5 py-5 text-left dark:bg-slate-900/80">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {state.partialTranscript ? '实时识别' : '最近一句'}
                        </div>
                        <p className={`mt-2 whitespace-pre-wrap text-xl leading-relaxed md:text-2xl ${state.partialTranscript ? 'text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                            {transcript || (state.muted
                                ? '麦克风已静音，恢复后可以继续说话。'
                                : (state.status === 'listening' ? '您可以直接开始说话。' : '…'))}
                        </p>
                    </div>

                    {state.error && (
                        <div className="mt-4 w-full max-w-3xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                            {state.error}
                        </div>
                    )}
                </main>

                <footer className="mx-auto flex w-full max-w-5xl items-center justify-center gap-4 pb-2">
                    <button
                        type="button"
                        onClick={onToggleMute}
                        className={`flex min-w-28 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium ${state.muted ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                    >
                        {state.muted ? <MicOff size={18}/> : <Mic size={18}/>} {state.muted ? '恢复麦克风' : '麦克风静音'}
                    </button>
                    <button type="button" onClick={onEnd} className="rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600">
                        结束语音
                    </button>
                </footer>
            </section>
        </div>
    );
}
