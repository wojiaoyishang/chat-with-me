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
        <div className="flex h-16 items-center justify-center gap-1 md:h-14" aria-hidden="true">
            {levels.map((level, index) => (
                <span
                    key={index}
                    className="w-1 rounded-full bg-current opacity-70 transition-[height] duration-75"
                    style={{height: `${Math.max(6, Math.min(54, 6 + (level || 0) * 48))}px`}}
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
        <div className="w-full rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left"
                onClick={() => setExpanded(value => !value)}
            >
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold tracking-wide">
                        <span>{modeLabel(profile.mode)}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="truncate">{profile.conversationModel?.model || profile.conversationModel?.id || 'Model'}</span>
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
                <div className="grid gap-3 border-t border-slate-200/80 px-3.5 py-3 text-xs dark:border-slate-700 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    <div><div className="font-semibold">Transport</div><div>{profile.transport?.protocol}</div><div>{profile.transport?.codec} · {profile.transport?.sampleRate}Hz</div></div>
                    <div><div className="font-semibold">Conversation</div><div>{profile.conversationModel?.provider}</div><div>{profile.conversationModel?.api}</div></div>
                    <div><div className="font-semibold">ASR</div><div>{profile.asr?.provider} / {profile.asr?.mode}</div><div>{profile.asr?.endpoint}{profile.asr?.connectionState ? ` · ${profile.asr.connectionState}` : ''}</div></div>
                    <div><div className="font-semibold">TTS / Barge-in</div><div>{profile.tts?.provider} / {profile.tts?.mode}</div><div>cursor: {profile.bargeIn?.cursorAccuracy}</div></div>
                    {fallbacks.length > 0 && (
                        <div className="sm:col-span-2 md:col-span-1 xl:col-span-2">
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
    const liveTranscript = String(state?.partialTranscript || '').trim();
    const recentUtterance = state?.recentUtterance || null;
    const transcript = liveTranscript || recentUtterance?.text || state?.finalTranscript || '';
    const transcriptLabel = liveTranscript
        ? '实时识别'
        : (recentUtterance?.role === 'assistant'
            ? (recentUtterance?.live ? '助手正在说' : '助手最近一句')
            : '最近一句');
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
                title="恢复语音窗口"
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
        <aside className="fixed inset-0 z-[10010] flex min-h-0 bg-white/96 backdrop-blur-md dark:bg-slate-950/96 md:relative md:inset-auto md:z-20 md:h-full md:w-[42%] md:min-w-[360px] md:max-w-[560px] md:flex-none md:border-l md:border-slate-200 md:bg-slate-50/70 md:backdrop-blur-none md:dark:border-slate-800 md:dark:bg-slate-950">
            <section className="pretty-scrollbar flex h-[100dvh] w-full min-h-0 flex-col overflow-y-auto bg-white px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] dark:bg-slate-950 md:h-full md:px-5 md:pb-5 md:pt-5">
                <header className="flex w-full items-center justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"/>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">CWM Realtime Voice</div>
                        </div>
                        <div className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{summary}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={onMinimize}
                            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="缩小语音窗口"
                            aria-label="缩小语音窗口"
                        >
                            <Minimize2 size={19}/>
                        </button>
                        <button
                            type="button"
                            onClick={onEnd}
                            className="rounded-full bg-red-500 p-2.5 text-white shadow-sm hover:bg-red-600"
                            title="结束语音"
                            aria-label="结束语音"
                        >
                            <PhoneOff size={19}/>
                        </button>
                    </div>
                </header>

                <div className="mt-4 w-full">
                    <ProtocolIndicator profile={state.profile}/>
                </div>

                <main className="flex min-h-0 flex-1 flex-col py-5 text-center md:py-4">
                    <div className="flex min-h-[300px] flex-1 flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-slate-50/80 px-5 py-7 shadow-inner dark:border-slate-800 dark:bg-slate-900/55">
                        <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-white ${accentClass} shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-950 dark:ring-slate-800 md:h-24 md:w-24`}>
                            {state.status === 'thinking' || state.status === 'understanding'
                                ? <Activity className="animate-pulse" size={36}/>
                                : <Waves size={38}/>} 
                        </div>
                        <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-50">{statusLabel}</h2>
                        <div className={`${accentClass} mt-1.5 w-full`}>
                            <Waveform levels={state.waveform}/>
                        </div>
                    </div>

                    <div className="mt-4 min-h-28 w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            <span>{transcriptLabel}</span>
                            {recentUtterance?.role && !liveTranscript && (
                                <span className="font-medium normal-case tracking-normal text-slate-300 dark:text-slate-600">
                                    {recentUtterance.role === 'assistant' ? 'AI' : '你'}
                                </span>
                            )}
                        </div>
                        <p className={`mt-2 whitespace-pre-wrap text-lg leading-relaxed md:text-xl ${liveTranscript ? 'text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                            {transcript || (state.muted
                                ? '麦克风已静音，恢复后可以继续说话。'
                                : (state.status === 'listening' ? '您可以直接开始说话。' : '…'))}
                        </p>
                    </div>

                    {state.error && (
                        <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                            {state.error}
                        </div>
                    )}
                </main>

                <footer className="flex w-full items-center justify-center gap-3 pb-1 pt-1">
                    <button
                        type="button"
                        onClick={onToggleMute}
                        className={`flex min-w-28 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium ${state.muted ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                    >
                        {state.muted ? <MicOff size={18}/> : <Mic size={18}/>} {state.muted ? '恢复麦克风' : '麦克风静音'}
                    </button>
                    <button type="button" onClick={onEnd} className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600">
                        结束语音
                    </button>
                </footer>
            </section>
        </aside>
    );
}
