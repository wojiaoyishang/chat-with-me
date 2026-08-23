import {useCallback, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';

import {EventName} from '@/runtime/protocol/events.js';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';
import {useWebSocket} from '@/context/WebSocketContext.jsx';
import {generateUUID} from '@/lib/tools.jsx';
import {RealtimeVoiceTransport} from '@/runtime/voice/RealtimeVoiceTransport.js';
import {
    createRealtimePcm16kStreamer,
    createSilentWaveformLevels,
    requestMicrophoneStream,
} from '@/features/chat/ui/chatbox/utils/voiceRecorder.js';

const VOICE_TICKET_TIMEOUT_MS = 6000;
const VOICE_CONNECT_TIMEOUT_MS = 8000;
const VOICE_START_TIMEOUT_MS = 20000;
const VOICE_STOP_ACK_TIMEOUT_MS = 900;

const initialState = () => ({
    open: false,
    minimized: false,
    status: 'idle',
    profile: null,
    partialTranscript: '',
    finalTranscript: '',
    waveform: createSilentWaveformLevels(28),
    muted: false,
    error: null,
    realtimeSessionId: null,
});

const isSpeakingState = (speechState) => ['loading', 'playing', 'paused'].includes(speechState?.status);
const VALID_COMPOSER_STATES = new Set(['disabled', 'normal', 'loading', 'generating']);
const stopMediaStream = (stream) => stream?.getTracks?.().forEach(track => track.stop());

export function useRealtimeVoiceConversation({
    conversationId,
    speechState,
    handleSpeakMessageRequest,
    pauseActiveSpeech,
    resumeActiveSpeech,
    cancelActiveSpeech,
}) {
    const {connectionId: controlConnectionId, isConnected: controlConnected} = useWebSocket() || {};
    const [state, setState] = useState(initialState);
    const transportRef = useRef(null);
    const streamerRef = useRef(null);
    const lifecycleRef = useRef(0);
    const activeTurnIdsRef = useRef(new Set());
    const currentConfigRef = useRef(null);
    const inputStreamIdRef = useRef(null);
    const bargeCandidateRef = useRef(false);
    const localSpeechActiveRef = useRef(false);
    const mutedRef = useRef(false);
    const speechStateRef = useRef(speechState);
    const profileRef = useRef(null);
    const sessionControlConnectionIdRef = useRef(null);
    const voiceStateRef = useRef(state);

    useEffect(() => {
        speechStateRef.current = speechState;
    }, [speechState]);

    useEffect(() => {
        voiceStateRef.current = state;
    }, [state]);

    const patchState = useCallback((patch) => {
        setState(current => ({...current, ...(typeof patch === 'function' ? patch(current) : patch)}));
    }, []);

    const applyComposerStatus = useCallback((status, targetConversationId = null) => {
        if (!VALID_COMPOSER_STATES.has(status)) return;
        emitEvent({
            event: EventName.COMPOSER_STATUS_CHANGED,
            payload: {value: status, readOnly: false, source: 'realtime_voice'},
            conversationId: targetConversationId || currentConfigRef.current?.conversationId || conversationId || null,
            localOnly: true,
        });
    }, [conversationId]);

    const stopMedia = useCallback(async () => {
        const streamer = streamerRef.current;
        streamerRef.current = null;
        if (streamer) await streamer.stop().catch(() => {});
    }, []);

    const clearRuntimeRefs = useCallback(() => {
        activeTurnIdsRef.current.clear();
        currentConfigRef.current = null;
        profileRef.current = null;
        sessionControlConnectionIdRef.current = null;
        inputStreamIdRef.current = null;
        bargeCandidateRef.current = false;
        localSpeechActiveRef.current = false;
        mutedRef.current = false;
    }, []);

    const stop = useCallback(async ({silent = false} = {}) => {
        // Invalidate every pending async stage before touching the network. A late
        // voice.session.started or microphone permission resolution must never reopen
        // a session the user has already ended.
        lifecycleRef.current += 1;
        const transport = transportRef.current;
        const config = currentConfigRef.current;
        const currentStatus = voiceStateRef.current?.status;
        const hadCommittedTurns = activeTurnIdsRef.current.size > 0;
        const targetConversationId = config?.conversationId || conversationId || null;
        const fallbackComposerStatus = config?.composerStatus === 'generating' ? 'generating' : 'normal';
        transportRef.current = null;

        if (!silent) setState(initialState());
        cancelActiveSpeech?.(true);
        await stopMedia();
        clearRuntimeRefs();

        const startupOnly = !hadCommittedTurns && [
            'connecting', 'negotiating', 'requesting_microphone',
            'listening', 'disconnected', 'error', 'idle',
        ].includes(currentStatus);

        if (!transport) {
            if (startupOnly) applyComposerStatus(fallbackComposerStatus, targetConversationId);
            return;
        }

        if (transport.isOpen && targetConversationId) {
            try {
                const response = await transport.request({
                    event: EventName.VOICE_SESSION_STOP,
                    payload: {},
                    conversationId: targetConversationId,
                    timeoutMs: VOICE_STOP_ACK_TIMEOUT_MS,
                });
                if (response?.payload?.composerStatus) {
                    applyComposerStatus(response.payload.composerStatus, targetConversationId);
                } else if (startupOnly) {
                    applyComposerStatus(fallbackComposerStatus, targetConversationId);
                }
            } catch {
                if (startupOnly) applyComposerStatus(fallbackComposerStatus, targetConversationId);
            } finally {
                transport.close(1000, 'Voice session stopped');
            }
        } else {
            transport.close(1000, 'Voice session stopped');
            if (startupOnly) applyComposerStatus(fallbackComposerStatus, targetConversationId);
        }
    }, [applyComposerStatus, cancelActiveSpeech, clearRuntimeRefs, conversationId, stopMedia]);

    const playbackCursor = useCallback(() => {
        const currentSpeech = speechStateRef.current;
        const segments = Array.isArray(currentSpeech?.segments) ? currentSpeech.segments : [];
        const currentPosition = Number.isInteger(currentSpeech?.currentSegmentPosition)
            && currentSpeech.currentSegmentPosition >= 0
            ? currentSpeech.currentSegmentPosition
            : null;
        const completedPosition = Number.isInteger(currentSpeech?.playbackSegmentPosition)
            ? currentSpeech.playbackSegmentPosition
            : -1;
        // Cursor V1 is segment-granular. The boundary is the first segment that is
        // not guaranteed to have been fully heard. This is deliberately
        // conservative: replaying one sentence is safer than telling the next
        // model round that the user heard content which was cut off mid-sentence.
        const boundaryPosition = currentPosition !== null
            ? currentPosition
            : Math.min(Math.max(completedPosition + 1, 0), segments.length);
        const boundarySegment = segments[boundaryPosition] || null;

        return {
            messageId: currentSpeech?.messageId || null,
            requestId: currentSpeech?.requestId || null,
            segmentPosition: boundaryPosition,
            segmentId: boundarySegment?.id || currentSpeech?.currentSegmentId || null,
            // One boundary segment is enough for the next model round to locate
            // the interruption in the complete Assistant response. Keep the
            // realtime candidate payload small instead of sending the whole
            // already-spoken prefix back over the media channel.
            segmentText: String(boundarySegment?.text || '').slice(0, 1200),
            totalSegments: segments.length,
            accuracy: 'segment',
            observedAt: Date.now(),
        };
    }, []);

    const handleVoiceEvent = useCallback((envelope) => {
        const payload = envelope.payload || {};
        switch (envelope.event) {
            case EventName.VOICE_SESSION_STARTED:
                profileRef.current = payload;
                patchState({
                    profile: payload,
                    realtimeSessionId: payload.realtimeSessionId || null,
                    error: null,
                });
                break;
            case EventName.VOICE_PROTOCOL_CHANGED:
                profileRef.current = payload;
                // A runtime fallback changes capabilities, not the current turn state.
                patchState({profile: payload, realtimeSessionId: payload.realtimeSessionId || null});
                break;
            case EventName.VOICE_INPUT_SPEECH_STARTED:
                if (!mutedRef.current) patchState({status: 'user_speaking'});
                break;
            case EventName.VOICE_INPUT_SPEECH_ENDED:
                if (!mutedRef.current) {
                    patchState(current => ({status: current.partialTranscript ? 'understanding' : 'listening'}));
                }
                break;
            case EventName.VOICE_TRANSCRIPT_PARTIAL:
                if (!mutedRef.current) {
                    patchState({partialTranscript: payload.text || '', status: 'user_speaking'});
                }
                break;
            case EventName.VOICE_TRANSCRIPT_FINAL:
                if (!mutedRef.current) {
                    patchState({
                        finalTranscript: payload.text || '',
                        partialTranscript: '',
                        status: 'thinking',
                    });
                }
                break;
            case EventName.VOICE_TURN_COMMITTED:
                if (payload.admissionAction === 'task_interrupt') {
                    // The transcript was injected into the already-running Task Mode
                    // rather than creating a second durable Turn.  Do not wait for a
                    // terminal event carrying this synthetic voice turn_id.
                    patchState({status: 'listening'});
                    break;
                }
                if (envelope.turn_id) activeTurnIdsRef.current.add(envelope.turn_id);
                patchState({status: 'thinking'});
                break;
            case EventName.VOICE_BARGE_IN_CONFIRMED:
                bargeCandidateRef.current = false;
                cancelActiveSpeech?.(true);
                if (!mutedRef.current) patchState({status: 'user_speaking'});
                break;
            case EventName.VOICE_BARGE_IN_REJECTED: {
                // Never restart TTS while the local microphone still sees speech.
                // The backend now starts its rejection grace window only after the
                // local speech-end boundary, but keep this guard for stale/legacy
                // events as well. Talking over the user is worse than staying quiet.
                const shouldResume = bargeCandidateRef.current
                    && !localSpeechActiveRef.current
                    && !mutedRef.current;
                if (shouldResume) resumeActiveSpeech?.();
                bargeCandidateRef.current = false;
                if (!mutedRef.current) {
                    patchState({status: isSpeakingState(speechStateRef.current) ? 'speaking' : 'listening'});
                }
                break;
            }
            case EventName.VOICE_SESSION_ERROR:
            case EventName.PROTOCOL_ERROR: {
                const message = payload.message || 'Realtime voice error';
                void stopMedia();
                cancelActiveSpeech?.(true);
                if (activeTurnIdsRef.current.size === 0) applyComposerStatus('normal');
                patchState({error: message, status: 'error'});
                toast.error(message);
                break;
            }
            case EventName.VOICE_SESSION_ENDED:
                if (payload.composerStatus) applyComposerStatus(payload.composerStatus);
                void stopMedia();
                cancelActiveSpeech?.(true);
                patchState({status: 'ended'});
                break;
            default:
                break;
        }
    }, [applyComposerStatus, cancelActiveSpeech, patchState, resumeActiveSpeech, stopMedia]);

    const start = useCallback(async (config) => {
        if (!config?.conversationId || !config?.model) {
            throw new Error('Realtime voice requires conversationId and model.');
        }
        if (config.composerStatus === 'loading' || config.composerStatus === 'disabled') {
            throw new Error('当前对话正在切换状态，暂时无法启动实时语音。');
        }
        if (!controlConnected || !controlConnectionId) {
            throw new Error('主实时通道尚未连接，无法启动语音对话。');
        }

        await stop({silent: true});
        const lifecycle = ++lifecycleRef.current;
        const isCurrent = () => lifecycleRef.current === lifecycle;
        currentConfigRef.current = config;
        sessionControlConnectionIdRef.current = controlConnectionId;
        // A live Voice Surface owns user input. Disable the text Composer between
        // voice turns so a second text turn cannot race startup/ASR commit.
        applyComposerStatus('disabled', config.conversationId);
        patchState({...initialState(), open: true, status: 'authorizing'});

        let transport = null;
        let microphoneStream = null;
        try {
            const ticketPayload = await emitEvent({
                event: EventName.VOICE_MEDIA_TICKET_REQUEST,
                conversationId: config.conversationId,
                payload: {},
                timeoutMs: VOICE_TICKET_TIMEOUT_MS,
            });
            if (!isCurrent()) return false;
            const mediaTicket = ticketPayload?.ticket;
            if (!mediaTicket) {
                throw new Error(ticketPayload?.message || '后端没有签发实时语音媒体凭证。');
            }

            patchState({status: 'connecting'});
            transport = new RealtimeVoiceTransport({
                ticket: mediaTicket,
                onEvent: (envelope) => {
                    if (isCurrent() && transportRef.current === transport) handleVoiceEvent(envelope);
                },
                onClose: () => {
                    if (!isCurrent() || transportRef.current !== transport) return;
                    transportRef.current = null;
                    cancelActiveSpeech?.(true);
                    void stopMedia();
                    if (activeTurnIdsRef.current.size === 0) {
                        applyComposerStatus(config.composerStatus === 'generating' ? 'generating' : 'normal', config.conversationId);
                    }
                    patchState(current => current.open ? {
                        status: 'disconnected',
                        error: current.error || '实时语音连接已断开。',
                    } : {});
                },
                onError: (error) => {
                    if (!isCurrent() || transportRef.current !== transport) return;
                    cancelActiveSpeech?.(true);
                    void stopMedia();
                    if (activeTurnIdsRef.current.size === 0) {
                        applyComposerStatus(config.composerStatus === 'generating' ? 'generating' : 'normal', config.conversationId);
                    }
                    patchState({
                        status: 'error',
                        error: error?.message || 'Realtime voice transport failed.',
                    });
                },
            });
            transportRef.current = transport;
            await transport.connect({timeoutMs: VOICE_CONNECT_TIMEOUT_MS});
            if (!isCurrent()) return false;

            patchState({status: 'negotiating'});
            const started = await transport.request({
                event: EventName.VOICE_SESSION_START,
                conversationId: config.conversationId,
                timeoutMs: VOICE_START_TIMEOUT_MS,
                payload: {
                    model: config.model,
                    asrModelId: config.asrModelId || null,
                    ttsEngine: config.ttsEngine || 'browser',
                    toolsStatus: config.toolsStatus || {},
                    options: config.options || {},
                    pageType: config.pageType || 'chat',
                    documentId: config.documentId || null,
                    controlConnectionId,
                },
            });
            if (!isCurrent()) return false;

            const profile = started.payload || {};
            profileRef.current = profile;
            if (profile?.debug?.showProtocol) {
                console.info('[CWM Realtime Voice] negotiated protocol', profile);
            }
            patchState({
                profile,
                realtimeSessionId: profile.realtimeSessionId || null,
                status: 'requesting_microphone',
                error: null,
            });

            microphoneStream = await requestMicrophoneStream(config.microphoneOptions || {});
            if (!isCurrent()) {
                stopMediaStream(microphoneStream);
                return false;
            }

            const inputStreamId = generateUUID();
            inputStreamIdRef.current = inputStreamId;
            const streamer = await createRealtimePcm16kStreamer(microphoneStream, {
                // Keep normal voice input conservative, but make barge-in react on
                // the first confident frame so the old TTS is silenced quickly.
                bargeInActive: () => (
                    isSpeakingState(speechStateRef.current)
                    || ['thinking', 'understanding', 'speaking'].includes(voiceStateRef.current?.status)
                ),
                onPcmChunk: (pcm, meta) => {
                    if (!isCurrent() || mutedRef.current || !transportRef.current?.isOpen) return;
                    try {
                        transportRef.current.sendAudio({
                            conversationId: config.conversationId,
                            streamId: inputStreamId,
                            pcm,
                            durationMs: meta.durationMs,
                            timestampMs: meta.timestampMs,
                        });
                    } catch (error) {
                        console.error('[CWM Realtime Voice] audio send failed', error);
                    }
                },
                onWaveform: (waveform) => {
                    if (isCurrent() && !mutedRef.current) patchState({waveform});
                },
                onSpeechStart: () => {
                    if (!isCurrent() || mutedRef.current) return;
                    localSpeechActiveRef.current = true;
                    patchState({status: 'user_speaking'});
                    const speechIsActive = isSpeakingState(speechStateRef.current);
                    const agentIsActive = ['thinking', 'understanding', 'speaking'].includes(voiceStateRef.current?.status);
                    if ((speechIsActive || agentIsActive) && !bargeCandidateRef.current) {
                        bargeCandidateRef.current = true;
                        // Freeze the cursor before mutating playback state so the
                        // durable delivery boundary always describes what was heard
                        // at the instant local VAD fired.
                        const cursor = playbackCursor();
                        if (speechIsActive) pauseActiveSpeech?.({bargeIn: true});
                        transportRef.current?.sendEvent({
                            event: EventName.VOICE_BARGE_IN_CANDIDATE,
                            conversationId: config.conversationId,
                            payload: {playbackCursor: cursor, phase: 'speech_start'},
                        });
                    }
                },
                onSpeechEnd: () => {
                    if (!isCurrent() || mutedRef.current) return;
                    localSpeechActiveRef.current = false;

                    // Reuse the existing candidate event to tell the backend when
                    // local speech actually ended. The backend must not start a
                    // rejection timeout while the user is still speaking.
                    if (bargeCandidateRef.current) {
                        transportRef.current?.sendEvent({
                            event: EventName.VOICE_BARGE_IN_CANDIDATE,
                            conversationId: config.conversationId,
                            payload: {phase: 'speech_end'},
                        });
                    }

                    // Always read the latest negotiated profile. Runtime fallback can
                    // change provider_semantic to client_vad after the streamer starts.
                    const activeProfile = profileRef.current;
                    const endpoint = activeProfile?.asr?.endpoint || 'manual';
                    if (endpoint === 'client_vad' || endpoint === 'manual' || activeProfile?.asr?.mode === 'batch') {
                        transportRef.current?.sendEvent({
                            event: EventName.VOICE_INPUT_COMMIT,
                            conversationId: config.conversationId,
                            payload: {},
                        });
                    }
                },
            });
            if (!isCurrent()) {
                await streamer.stop().catch(() => {});
                return false;
            }
            streamerRef.current = streamer;
            microphoneStream = null;
            patchState({status: 'listening'});
            return true;
        } catch (error) {
            if (microphoneStream) stopMediaStream(microphoneStream);
            if (!isCurrent()) return false;

            const message = error?.code === 'REALTIME_VOICE_TIMEOUT'
                ? '实时语音连接超时，请检查后端、ASR 配置或网络后重试。'
                : (error?.message || '无法启动实时语音');
            await stop({silent: true});
            applyComposerStatus(config.composerStatus === 'generating' ? 'generating' : 'normal', config.conversationId);
            setState({...initialState(), open: true, status: 'error', error: message});
            throw new Error(message, {cause: error});
        }
    }, [
        applyComposerStatus,
        cancelActiveSpeech,
        controlConnected,
        controlConnectionId,
        handleVoiceEvent,
        patchState,
        pauseActiveSpeech,
        playbackCursor,
        stop,
        stopMedia,
    ]);

    useEffect(() => {
        if (!conversationId) return undefined;
        return onEvent({
            event: [EventName.TURN_COMPLETED, EventName.TURN_CANCELLED, EventName.TURN_FAILED],
            conversationId,
            direction: 'incoming',
        }).then(({event, payload, eventTurnId}) => {
            if (!eventTurnId || !activeTurnIdsRef.current.has(eventTurnId)) return;
            // The Worker releases the Composer at turn terminal. A still-open
            // Voice Surface immediately reclaims it until the user ends voice mode.
            if (voiceStateRef.current?.open) applyComposerStatus('disabled', conversationId);
            if (event === EventName.TURN_COMPLETED) {
                const messageId = payload?.messageId;
                patchState({status: 'speaking'});
                if (messageId) {
                    globalThis.setTimeout(
                        () => handleSpeakMessageRequest?.({messageId, engine: profileRef.current?.tts?.id || 'browser'}),
                        80,
                    );
                }
            } else {
                patchState({status: 'listening'});
            }
            activeTurnIdsRef.current.delete(eventTurnId);
        });
    }, [applyComposerStatus, conversationId, handleSpeakMessageRequest, patchState]);

    useEffect(() => {
        if (!state.open) return;
        if (speechState?.status === 'playing' || speechState?.status === 'loading') {
            patchState({status: 'speaking'});
        } else if (speechState?.status === 'ended' || speechState?.status === 'idle') {
            setState(current => {
                if (!current.open || [
                    'user_speaking', 'thinking', 'understanding', 'connecting',
                    'negotiating', 'requesting_microphone', 'error',
                ].includes(current.status)) return current;
                return {...current, status: 'listening'};
            });
        }
    }, [patchState, speechState?.status, state.open]);

    useEffect(() => () => {
        void stop({silent: true});
    }, [stop]);

    useEffect(() => {
        if (!state.open || !sessionControlConnectionIdRef.current) return;
        if (!controlConnected || controlConnectionId !== sessionControlConnectionIdRef.current) {
            toast.warning('主实时连接已变化，实时语音需要重新连接。');
            void stop();
        }
    }, [controlConnected, controlConnectionId, state.open, stop]);

    const toggleMute = useCallback(() => {
        const nextMuted = !mutedRef.current;
        const hadBargeCandidate = bargeCandidateRef.current;
        mutedRef.current = nextMuted;
        localSpeechActiveRef.current = false;
        streamerRef.current?.setMuted?.(nextMuted);

        if (nextMuted) {
            // Muting is a real microphone boundary: discard any partial audio/ASR
            // input already accumulated for the current utterance. This reuses the
            // existing voice.input.commit control event instead of adding a new
            // protocol event. The frontend stops sending PCM before this is sent.
            transportRef.current?.sendEvent({
                event: EventName.VOICE_INPUT_COMMIT,
                conversationId: currentConfigRef.current?.conversationId || conversationId || null,
                payload: {discard: true, reason: 'microphone_muted'},
            });
            // Muting while a tentative barge-in is in flight means the user has
            // discarded that utterance. Resolve the temporary TTS suspension
            // locally because the backend intentionally drops the candidate.
            if (hadBargeCandidate) resumeActiveSpeech?.();
            bargeCandidateRef.current = false;
        }

        patchState(current => ({
            muted: nextMuted,
            waveform: nextMuted ? createSilentWaveformLevels(28) : current.waveform,
            partialTranscript: nextMuted ? '' : current.partialTranscript,
        }));
    }, [conversationId, patchState, resumeActiveSpeech]);

    return {
        state,
        start,
        stop,
        toggleMute,
        setMinimized: (minimized) => patchState({minimized}),
    };
}
