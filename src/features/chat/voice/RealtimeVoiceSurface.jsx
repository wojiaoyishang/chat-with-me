import React, {useMemo, useState} from 'react';
import {
    Activity,
    ChevronDown,
    ChevronUp,
    Mic,
    MicOff,
    Minimize2,
    PhoneOff,
} from 'lucide-react';
import './RealtimeVoiceSurface.css';

const STATUS_LABELS = {
    authorizing: '正在准备',
    connecting: '正在连接',
    negotiating: '正在连接',
    requesting_microphone: '正在打开麦克风',
    listening: '正在听',
    user_speaking: '正在听',
    understanding: '正在理解',
    thinking: '思考中',
    speaking: '正在说',
    disconnected: '连接已断开',
    error: '连接出现问题',
    ended: '通话已结束',
};

const modeLabel = (mode) => ({
    native_realtime: 'NATIVE REALTIME',
    hybrid_realtime: 'HYBRID REALTIME',
    compatibility: 'COMPATIBILITY',
    degraded: 'DEGRADED',
    text_projection: 'TEXT PROJECTION',
}[mode] || String(mode || 'REALTIME').toUpperCase());

const visualStateFor = (state) => {
    if (state?.muted) return 'muted';
    if (state?.status === 'user_speaking') return 'user-speaking';
    if (state?.status === 'thinking' || state?.status === 'understanding') return 'thinking';
    if (state?.status === 'speaking') return 'assistant-speaking';
    if (state?.status === 'error' || state?.status === 'disconnected') return 'error';
    return 'listening';
};

const waveformLevel = (levels = []) => {
    if (!Array.isArray(levels) || levels.length === 0) return 0;
    const values = levels
        .map(value => Number(value))
        .filter(Number.isFinite)
        .map(value => Math.max(0, Math.min(1, value)));
    if (values.length === 0) return 0;
    const peak = Math.max(...values);
    const average = values.reduce((total, value) => total + value, 0) / values.length;
    return Math.max(average, peak * 0.72);
};

function VoiceOrb({state}) {
    const level = waveformLevel(state?.waveform);
    const visualState = visualStateFor(state);
    const animatedLevel = !state?.muted && state?.status === 'user_speaking' ? level : 0;

    return (
        <div
            className={`cwm-voice-orb cwm-voice-orb--${visualState}`}
            style={{
                '--cwm-voice-scale': 1 + animatedLevel * 0.045,
                '--cwm-voice-core-scale': 1 + animatedLevel * 0.10,
                '--cwm-voice-halo-opacity': 0.44 + animatedLevel * 0.44,
            }}
            aria-hidden="true"
        >
            <div className="cwm-voice-orb__halo cwm-voice-orb__halo--outer"/>
            <div className="cwm-voice-orb__halo cwm-voice-orb__halo--inner"/>
            <div className="cwm-voice-orb__layer cwm-voice-orb__layer--one"/>
            <div className="cwm-voice-orb__layer cwm-voice-orb__layer--two"/>
            <div className="cwm-voice-orb__layer cwm-voice-orb__layer--three"/>
            <div className="cwm-voice-orb__core">
                <div className="cwm-voice-orb__shine"/>
            </div>
        </div>
    );
}

function StatusTrail({state}) {
    const active = ['authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'understanding', 'thinking']
        .includes(state?.status);
    return (
        <div className={`cwm-voice-status-trail ${active ? 'cwm-voice-status-trail--active' : ''}`} aria-hidden="true">
            <span/><span/><span/>
        </div>
    );
}

function ProtocolIndicator({profile}) {
    const [expanded, setExpanded] = useState(false);
    if (!profile?.debug?.showProtocol) return null;
    const fallbacks = Array.isArray(profile.fallbacks) ? profile.fallbacks : [];

    return (
        <div className="relative">
            <button
                type="button"
                className="cwm-voice-icon-button"
                onClick={() => setExpanded(value => !value)}
                title="查看实时语音协议"
                aria-label="查看实时语音协议"
                aria-expanded={expanded}
            >
                <Activity size={17}/>
                {expanded ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
            </button>
            {expanded && (
                <div className="cwm-voice-protocol-panel">
                    <div className="text-[11px] font-semibold tracking-[0.08em] text-slate-400">
                        {modeLabel(profile.mode)}
                    </div>
                    <div className="mt-3 grid gap-3 text-xs text-slate-600 dark:text-slate-300">
                        <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-100">Transport</div>
                            <div>{profile.transport?.protocol || '—'} · {profile.transport?.codec || '—'}</div>
                            {profile.transport?.sampleRate ? <div>{profile.transport.sampleRate}Hz</div> : null}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-100">ASR</div>
                            <div>{profile.asr?.provider || '—'} / {profile.asr?.mode || '—'}</div>
                            <div>{profile.asr?.endpoint || '—'}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-100">TTS / Barge-in</div>
                            <div>{profile.tts?.provider || '—'} / {profile.tts?.mode || '—'}</div>
                            <div>cursor: {profile.bargeIn?.cursorAccuracy || '—'}</div>
                        </div>
                        {fallbacks.length > 0 && (
                            <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                                {fallbacks.length} 项能力正在使用兼容模式
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function MiniVoiceOrb({state}) {
    return (
        <span className={`cwm-voice-mini-orb cwm-voice-mini-orb--${visualStateFor(state)}`} aria-hidden="true">
            <span/>
        </span>
    );
}

export default function RealtimeVoiceSurface({state, onEnd, onMinimize, onRestore, onToggleMute}) {
    const statusLabel = state?.muted
        ? '麦克风已静音'
        : (STATUS_LABELS[state?.status] || state?.status || '实时语音');
    const liveTranscript = String(state?.partialTranscript || '').trim();
    const recentUserUtterance = state?.recentUtterance?.role === 'user' ? state.recentUtterance : null;
    const transcript = liveTranscript
        || String(recentUserUtterance?.text || '').trim()
        || String(state?.finalTranscript || '').trim();
    const summary = useMemo(() => (
        state?.profile?.conversationModel?.model || state?.profile?.conversationModel?.id || 'Realtime Voice'
    ), [state?.profile]);
    const connectionHealthy = !['disconnected', 'error', 'ended'].includes(state?.status);

    if (!state?.open) return null;

    if (state.minimized) {
        return (
            <button
                type="button"
                onClick={onRestore}
                className="cwm-voice-minimized"
                title="恢复语音窗口"
            >
                <MiniVoiceOrb state={state}/>
                <span className="min-w-0 text-left">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {statusLabel}
                        {connectionHealthy && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>}
                    </span>
                    <span className="block max-w-40 truncate text-xs text-slate-400">{summary}</span>
                </span>
                <ChevronUp className="ml-1 text-slate-400" size={17}/>
            </button>
        );
    }

    return (
        <aside className="cwm-voice-dock">
            <section className="cwm-voice-surface">
                <header className="cwm-voice-header">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">Realtime Voice</div>
                            <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${connectionHealthy ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            />
                        </div>
                        <div className="mt-0.5 max-w-52 truncate text-xs text-slate-400">{summary}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <ProtocolIndicator profile={state.profile}/>
                        <button
                            type="button"
                            onClick={onMinimize}
                            className="cwm-voice-icon-button cwm-voice-icon-button--single"
                            title="缩小语音窗口"
                            aria-label="缩小语音窗口"
                        >
                            <Minimize2 size={18}/>
                        </button>
                    </div>
                </header>

                <main className="cwm-voice-stage">
                    <div className="cwm-voice-stage__ambient" aria-hidden="true"/>
                    <div className="cwm-voice-orb-wrap">
                        <VoiceOrb state={state}/>
                    </div>

                    <div className="cwm-voice-status">
                        <h2>{statusLabel}</h2>
                        <StatusTrail state={state}/>
                    </div>

                    <div className="cwm-voice-transcript">
                        {transcript ? (
                            <p>“{transcript}”</p>
                        ) : (
                            <p className="cwm-voice-transcript__hint">
                                {state?.muted
                                    ? '恢复麦克风后继续说话'
                                    : (state?.status === 'listening' ? '直接说话即可' : '')}
                            </p>
                        )}
                    </div>

                    {state.error && (
                        <div className="cwm-voice-error" role="status">
                            {state.error}
                        </div>
                    )}
                </main>

                <footer className="cwm-voice-controls" aria-label="实时语音控制">
                    <button
                        type="button"
                        onClick={onToggleMute}
                        className={`cwm-voice-control-button ${state.muted ? 'cwm-voice-control-button--muted' : ''}`}
                        title={state.muted ? '恢复麦克风' : '麦克风静音'}
                        aria-label={state.muted ? '恢复麦克风' : '麦克风静音'}
                    >
                        {state.muted ? <MicOff size={21}/> : <Mic size={21}/>}
                    </button>
                    <button
                        type="button"
                        onClick={onEnd}
                        className="cwm-voice-control-button cwm-voice-control-button--end"
                        title="结束语音"
                        aria-label="结束语音"
                    >
                        <PhoneOff size={22}/>
                    </button>
                </footer>
            </section>
        </aside>
    );
}
