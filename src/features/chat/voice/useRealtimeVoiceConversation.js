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
const MICROPHONE_READY_TIMEOUT_MS = 2500;
const BARGE_PROBE_TTL_MS = 15000;

const initialState = () => ({
    open: false,
    minimized: false,
    status: 'idle',
    profile: null,
    partialTranscript: '',
    finalTranscript: '',
    recentUtterance: null,
    waveform: createSilentWaveformLevels(28),
    muted: false,
    error: null,
    realtimeSessionId: null,
});

const isSpeakingState = (speechState) => ['loading', 'playing', 'paused'].includes(speechState?.status);
const VALID_COMPOSER_STATES = new Set(['disabled', 'normal', 'loading', 'generating']);
const stopMediaStream = (stream) => stream?.getTracks?.().forEach(track => track.stop());
const waitForMicrophoneReady = async (streamer) => {
    let timerId = null;
    try {
        await Promise.race([
            streamer?.ready || Promise.resolve(),
            new Promise((_, reject) => {
                timerId = globalThis.setTimeout(() => {
                    const error = new Error('麦克风已授权，但没有收到录音数据，请检查系统录音设备后重试。');
                    error.code = 'REALTIME_VOICE_MICROPHONE_NOT_READY';
                    reject(error);
                }, MICROPHONE_READY_TIMEOUT_MS);
            }),
        ]);
    } finally {
        if (timerId !== null) globalThis.clearTimeout(timerId);
    }
};


export function useRealtimeVoiceConversation({
    conversationId,
    speechState,
    beginStreamingSpeech,
    requestStreamingSpeechFinalize,
    cancelStreamingSpeech,
    getStreamingSpeechSnapshot,
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
    const startedTurnMessagesRef = useRef(new Map());
    const armedSpeechTurnIdsRef = useRef(new Set());
    const terminalVoiceTurnIdsRef = useRef(new Set());
    const activeAssistantMessageIdRef = useRef(null);
    const currentConfigRef = useRef(null);
    const inputStreamIdRef = useRef(null);
    const bargeCandidateRef = useRef(false);
    const bargeProbeRef = useRef(null);
    const bargeProbeExpiryRef = useRef(null);
    const bargeResumeStatusRef = useRef(null);
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
        startedTurnMessagesRef.current.clear();
        armedSpeechTurnIdsRef.current.clear();
        terminalVoiceTurnIdsRef.current.clear();
        activeAssistantMessageIdRef.current = null;
        currentConfigRef.current = null;
        profileRef.current = null;
        sessionControlConnectionIdRef.current = null;
        inputStreamIdRef.current = null;
        bargeCandidateRef.current = false;
        if (bargeProbeExpiryRef.current !== null) {
            globalThis.clearTimeout(bargeProbeExpiryRef.current);
            bargeProbeExpiryRef.current = null;
        }
        bargeProbeRef.current = null;
        bargeResumeStatusRef.current = null;
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
        cancelStreamingSpeech?.({cancelPlayback: false});
        cancelActiveSpeech?.(true);
        await stopMedia();
        clearRuntimeRefs();

        const startupOnly = !hadCommittedTurns && [
            'authorizing', 'connecting', 'negotiating', 'requesting_microphone',
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
    }, [applyComposerStatus, cancelActiveSpeech, cancelStreamingSpeech, clearRuntimeRefs, conversationId, stopMedia]);

    const playbackCursor = useCallback(() => {
        const currentSpeech = speechStateRef.current;
        const streamingSnapshot = getStreamingSpeechSnapshot?.() || null;
        const messageId = currentSpeech?.messageId
            || streamingSnapshot?.messageId
            || activeAssistantMessageIdRef.current
            || null;
        const speechMatchesMessage = Boolean(
            messageId
            && currentSpeech?.messageId
            && String(currentSpeech.messageId) === String(messageId)
        );
        const segments = speechMatchesMessage && Array.isArray(currentSpeech?.segments)
            ? currentSpeech.segments
            : [];
        const currentPosition = speechMatchesMessage
            && Number.isInteger(currentSpeech?.currentSegmentPosition)
            && currentSpeech.currentSegmentPosition >= 0
            ? currentSpeech.currentSegmentPosition
            : null;
        const completedPosition = speechMatchesMessage && Number.isInteger(currentSpeech?.playbackSegmentPosition)
            ? currentSpeech.playbackSegmentPosition
            : -1;
        const knownSegmentCount = segments.length > 0
            ? segments.length
            : Number(streamingSnapshot?.acceptedSegmentCount || 0);
        // Cursor V1 is segment-granular. While the Assistant is still generating,
        // segmentPosition may equal knownSegmentCount: that means TTS has caught up
        // with the stable prefix, not that the whole message was delivered.
        const boundaryPosition = currentPosition !== null
            ? currentPosition
            : Math.min(Math.max(completedPosition + 1, 0), knownSegmentCount);
        const boundarySegment = segments[boundaryPosition] || null;

        return {
            messageId,
            requestId: currentSpeech?.requestId || streamingSnapshot?.requestId || null,
            segmentPosition: boundaryPosition,
            segmentId: boundarySegment?.id || currentSpeech?.currentSegmentId || null,
            segmentText: String(boundarySegment?.text || '').slice(0, 1200),
            totalSegments: knownSegmentCount,
            messageFinalized: Boolean(streamingSnapshot?.finalized),
            streaming: Boolean(streamingSnapshot && !streamingSnapshot.finalized),
            accuracy: 'segment',
            observedAt: Date.now(),
        };
    }, [getStreamingSpeechSnapshot]);

    const clearBargeProbe = useCallback(() => {
        if (bargeProbeExpiryRef.current !== null) {
            globalThis.clearTimeout(bargeProbeExpiryRef.current);
            bargeProbeExpiryRef.current = null;
        }
        bargeProbeRef.current = null;
    }, []);

    const armBargeProbe = useCallback(({resumeStatus, speechWasActive, vad}) => {
        clearBargeProbe();
        bargeProbeRef.current = {
            playbackCursor: playbackCursor(),
            resumeStatus,
            speechWasActive: Boolean(speechWasActive),
            vad: vad || null,
            observedAt: Date.now(),
            sentToBackend: false,
        };
        bargeProbeExpiryRef.current = globalThis.setTimeout(() => {
            bargeProbeExpiryRef.current = null;
            bargeProbeRef.current = null;
        }, BARGE_PROBE_TTL_MS);
    }, [clearBargeProbe, playbackCursor]);

    const armStreamingSpeechForTurn = useCallback((turnId, messageId) => {
        if (!turnId || !messageId || armedSpeechTurnIdsRef.current.has(turnId)) return false;
        armedSpeechTurnIdsRef.current.add(turnId);
        activeAssistantMessageIdRef.current = messageId;
        const ttsProfile = profileRef.current?.tts || {};
        beginStreamingSpeech?.({
            messageId,
            turnId,
            engine: ttsProfile.id || 'browser',
            options: ttsProfile.options || {},
        });
        return true;
    }, [beginStreamingSpeech]);

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
                    const text = payload.text || '';
                    patchState(current => ({
                        partialTranscript: text,
                        recentUtterance: text ? {role: 'user', text, live: true} : current.recentUtterance,
                        status: 'user_speaking',
                    }));
                }
                break;
            case EventName.VOICE_TRANSCRIPT_FINAL:
                if (!mutedRef.current) {
                    const text = payload.text || '';
                    patchState(current => ({
                        finalTranscript: text,
                        partialTranscript: '',
                        recentUtterance: text ? {role: 'user', text, live: false} : current.recentUtterance,
                        status: 'thinking',
                    }));
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
                if (envelope.turn_id && !terminalVoiceTurnIdsRef.current.has(envelope.turn_id)) {
                    activeTurnIdsRef.current.add(envelope.turn_id);
                    const startedMessageId = startedTurnMessagesRef.current.get(envelope.turn_id);
                    if (startedMessageId) armStreamingSpeechForTurn(envelope.turn_id, startedMessageId);
                    patchState({
                        status: isSpeakingState(speechStateRef.current) ? 'speaking' : 'thinking',
                    });
                }
                break;
            case EventName.VOICE_BARGE_IN_CANDIDATE: {
                // Silero only creates a local probe. The backend emits Candidate
                // after ASR has produced a usable partial/final transcript, so a
                // desktop noise burst never pauses playback by itself.
                const probe = bargeProbeRef.current;
                bargeCandidateRef.current = true;
                bargeResumeStatusRef.current = probe?.resumeStatus
                    || voiceStateRef.current?.status
                    || 'listening';
                if (probe?.speechWasActive && isSpeakingState(speechStateRef.current)) {
                    pauseActiveSpeech?.({bargeIn: true});
                }
                break;
            }
            case EventName.VOICE_BARGE_IN_CONFIRMED:
                clearBargeProbe();
                bargeCandidateRef.current = false;
                bargeResumeStatusRef.current = null;
                cancelStreamingSpeech?.({cancelPlayback: false});
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
                const resumeStatus = bargeResumeStatusRef.current || bargeProbeRef.current?.resumeStatus;
                clearBargeProbe();
                bargeCandidateRef.current = false;
                bargeResumeStatusRef.current = null;
                if (!mutedRef.current) {
                    const nextStatus = isSpeakingState(speechStateRef.current)
                        ? 'speaking'
                        : (['thinking', 'understanding'].includes(resumeStatus) ? resumeStatus : 'listening');
                    patchState({status: nextStatus});
                }
                break;
            }
            case EventName.VOICE_SESSION_ERROR:
            case EventName.PROTOCOL_ERROR: {
                const message = payload.message || 'Realtime voice error';
                clearBargeProbe();
                void stopMedia();
                cancelStreamingSpeech?.({cancelPlayback: false});
                cancelActiveSpeech?.(true);
                if (activeTurnIdsRef.current.size === 0) applyComposerStatus('normal');
                patchState({error: message, status: 'error'});
                toast.error(message);
                break;
            }
            case EventName.VOICE_SESSION_ENDED:
                clearBargeProbe();
                if (payload.composerStatus) applyComposerStatus(payload.composerStatus);
                void stopMedia();
                cancelStreamingSpeech?.({cancelPlayback: false});
                cancelActiveSpeech?.(true);
                patchState({status: 'ended'});
                break;
            default:
                break;
        }
    }, [
        applyComposerStatus,
        armStreamingSpeechForTurn,
        cancelActiveSpeech,
        cancelStreamingSpeech,
        clearBargeProbe,
        patchState,
        pauseActiveSpeech,
        resumeActiveSpeech,
        stopMedia,
    ]);

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

        // On first use, ask for the physical microphone in the original click
        // activation. Awaiting an unrelated async teardown before getUserMedia can
        // make first-open capture flaky on browsers with transient activation rules.
        if (transportRef.current || streamerRef.current) {
            await stop({silent: true});
        }
        const lifecycle = ++lifecycleRef.current;
        const isCurrent = () => lifecycleRef.current === lifecycle;
        currentConfigRef.current = config;
        sessionControlConnectionIdRef.current = controlConnectionId;
        applyComposerStatus('disabled', config.conversationId);
        patchState({...initialState(), open: true, status: 'requesting_microphone'});

        let transport = null;
        let microphoneStream = null;
        let captureActive = false;
        let microphoneEnded = false;
        try {
            microphoneStream = await requestMicrophoneStream(config.microphoneOptions || {});
            if (!isCurrent()) {
                stopMediaStream(microphoneStream);
                return false;
            }

            const inputStreamId = generateUUID();
            inputStreamIdRef.current = inputStreamId;
            const streamer = await createRealtimePcm16kStreamer(microphoneStream, {
                onPcmChunk: (pcm, meta) => {
                    if (!captureActive || !isCurrent() || mutedRef.current || !transportRef.current?.isOpen) return;
                    try {
                        const probe = bargeProbeRef.current;
                        let mediaMetadata = null;
                        if (probe && !probe.sentToBackend) {
                            probe.sentToBackend = true;
                            mediaMetadata = {
                                bargeProbe: {
                                    playbackCursor: probe.playbackCursor,
                                    detector: 'silero_v5',
                                    speechProbability: probe.vad?.speechProbability ?? meta?.vad?.speechProbability ?? null,
                                    peakSpeechProbability: probe.vad?.peakSpeechProbability ?? meta?.vad?.peakSpeechProbability ?? null,
                                    observedAt: probe.observedAt,
                                },
                            };
                        }
                        transportRef.current.sendAudio({
                            conversationId: config.conversationId,
                            streamId: inputStreamId,
                            pcm,
                            durationMs: meta.durationMs,
                            timestampMs: meta.timestampMs,
                            metadata: mediaMetadata,
                        });
                    } catch (error) {
                        console.error('[CWM Realtime Voice] audio send failed', error);
                    }
                },
                onWaveform: (waveform) => {
                    if (captureActive && isCurrent() && !mutedRef.current) patchState({waveform});
                },
                onInputEnded: () => {
                    microphoneEnded = true;
                    captureActive = false;
                    if (!isCurrent()) return;
                    patchState({
                        status: 'error',
                        error: '麦克风设备已停止录音，请检查系统录音设备后重新开启实时语音。',
                    });
                    // A dead input must also close the media runtime; otherwise the
                    // socket can look healthy while the user has no microphone.
                    void stop({silent: true});
                },
                onSpeechStart: (vad) => {
                    if (!captureActive || !isCurrent() || mutedRef.current) return;
                    const statusBeforeSpeech = voiceStateRef.current?.status || 'listening';
                    localSpeechActiveRef.current = true;
                    patchState({status: 'user_speaking'});

                    const speechIsActive = isSpeakingState(speechStateRef.current);
                    const agentIsActive = activeTurnIdsRef.current.size > 0
                        || ['thinking', 'understanding', 'speaking'].includes(statusBeforeSpeech);
                    if ((speechIsActive || agentIsActive) && !bargeCandidateRef.current) {
                        // Silero is only a local speech probe. It freezes delivery
                        // truth but deliberately does not pause TTS or send barge-in.
                        // Existing ASR evidence must promote it on the backend.
                        armBargeProbe({
                            resumeStatus: statusBeforeSpeech,
                            speechWasActive: speechIsActive,
                            vad,
                        });
                    }
                },
                onSpeechEnd: () => {
                    if (!captureActive || !isCurrent() || mutedRef.current) return;
                    localSpeechActiveRef.current = false;

                    const activeProfile = profileRef.current;
                    const endpoint = activeProfile?.asr?.endpoint || 'manual';
                    if (endpoint === 'client_vad' || endpoint === 'manual' || activeProfile?.asr?.mode === 'batch') {
                        const probe = bargeProbeRef.current;
                        transportRef.current?.sendEvent({
                            event: EventName.VOICE_INPUT_COMMIT,
                            conversationId: config.conversationId,
                            payload: probe ? {
                                bargeProbe: {
                                    playbackCursor: probe.playbackCursor,
                                    detector: 'silero_v5',
                                    speechProbability: probe.vad?.speechProbability ?? null,
                                    peakSpeechProbability: probe.vad?.peakSpeechProbability ?? null,
                                    observedAt: probe.observedAt,
                                },
                            } : {},
                        });
                    }
                },
            });
            streamerRef.current = streamer;
            microphoneStream = null;
            await waitForMicrophoneReady(streamer);
            if (!isCurrent()) return false;
            if (microphoneEnded || !streamer.inputLive) {
                throw new Error('麦克风设备没有可用的实时音轨，请重新选择录音设备。');
            }
            // The first real Web Audio frame proves the device is usable. Keep the
            // same track, but pause it while Ticket/WS negotiation completes so the
            // first utterance starts from a clean VAD boundary.
            streamer.setMuted?.(true);

            patchState({status: 'authorizing'});
            const ticketPayload = await emitEvent({
                event: EventName.VOICE_MEDIA_TICKET_REQUEST,
                conversationId: config.conversationId,
                payload: {},
                timeoutMs: VOICE_TICKET_TIMEOUT_MS,
            });
            if (!isCurrent()) return false;
            if (microphoneEnded || !streamer.inputLive) {
                throw new Error('麦克风设备在实时语音授权期间停止了录音，请重新开启。');
            }
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
                    captureActive = false;
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
                    captureActive = false;
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
            if (microphoneEnded || !streamer.inputLive) {
                throw new Error('麦克风设备在实时语音连接期间停止了录音，请重新开启。');
            }

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
            if (microphoneEnded || !streamer.inputLive) {
                throw new Error('麦克风设备在语音协议协商期间停止了录音，请重新开启。');
            }

            const profile = started.payload || {};
            profileRef.current = profile;
            if (profile?.debug?.showProtocol) {
                console.info('[CWM Realtime Voice] negotiated protocol', profile);
            }
            captureActive = true;
            streamer.setMuted?.(Boolean(mutedRef.current));
            patchState({
                profile,
                realtimeSessionId: profile.realtimeSessionId || null,
                status: mutedRef.current ? 'muted' : 'listening',
                error: null,
            });
            return true;
        } catch (error) {
            captureActive = false;
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
        armBargeProbe,
        cancelActiveSpeech,
        controlConnected,
        controlConnectionId,
        handleVoiceEvent,
        patchState,
        stop,
        stopMedia,
    ]);
    useEffect(() => {
        if (!conversationId) return undefined;
        return onEvent({
            event: [
                EventName.TURN_STARTED,
                EventName.TURN_COMPLETED,
                EventName.TURN_CANCELLED,
                EventName.TURN_FAILED,
            ],
            conversationId,
            direction: 'incoming',
        }).then(({event, payload, eventTurnId}) => {
            if (!eventTurnId) return;

            if (event === EventName.TURN_STARTED) {
                const messageId = payload?.messageId;
                if (!messageId) return;
                startedTurnMessagesRef.current.set(eventTurnId, messageId);

                // The standard chat handler emits turn.started before waiting for
                // the Celery worker acknowledgement, while voice.turn.committed is
                // emitted only after that request returns. During an open Voice
                // Surface, the next Turn started from the ASR-final thinking state
                // is therefore the earliest reliable point to arm streaming TTS.
                const expectedVoiceTurn = voiceStateRef.current?.open
                    && voiceStateRef.current?.status === 'thinking';
                if (expectedVoiceTurn) activeTurnIdsRef.current.add(eventTurnId);
                if (activeTurnIdsRef.current.has(eventTurnId)) {
                    armStreamingSpeechForTurn(eventTurnId, messageId);
                }
                return;
            }

            if (!activeTurnIdsRef.current.has(eventTurnId)) return;
            // The Worker releases the Composer at turn terminal. A still-open
            // Voice Surface immediately reclaims it until the user ends voice mode.
            if (voiceStateRef.current?.open) applyComposerStatus('disabled', conversationId);

            terminalVoiceTurnIdsRef.current.add(eventTurnId);
            const messageId = payload?.messageId || startedTurnMessagesRef.current.get(eventTurnId) || null;
            if (event === EventName.TURN_COMPLETED) {
                // Do not start TTS here. Stable segments have already been appended
                // while the model streamed. This only requests the trailing flush;
                // useChatSpeech waits for readonly=false as the stream barrier.
                requestStreamingSpeechFinalize?.({messageId, turnId: eventTurnId});
                // The superseded Run can still win a completion race after a
                // confirmed barge-in. Never let that stale terminal event move the
                // Voice Surface out of the user's current speech/ASR/new-turn phase.
                if (!['user_speaking', 'understanding', 'thinking'].includes(voiceStateRef.current?.status)) {
                    patchState({
                        status: isSpeakingState(speechStateRef.current) ? 'speaking' : 'listening',
                    });
                }
            } else {
                cancelStreamingSpeech?.({messageId, turnId: eventTurnId, cancelPlayback: true});
                // A stale cancellation from the superseded Assistant Turn must not
                // steal the surface while the user is already speaking/being ASR'd.
                if (!['user_speaking', 'understanding', 'thinking'].includes(voiceStateRef.current?.status)) {
                    patchState({status: 'listening'});
                }
            }

            activeTurnIdsRef.current.delete(eventTurnId);
            startedTurnMessagesRef.current.delete(eventTurnId);
            armedSpeechTurnIdsRef.current.delete(eventTurnId);
            if (activeAssistantMessageIdRef.current === messageId && event !== EventName.TURN_COMPLETED) {
                activeAssistantMessageIdRef.current = null;
            }
        });
    }, [
        applyComposerStatus,
        armStreamingSpeechForTurn,
        cancelStreamingSpeech,
        conversationId,
        patchState,
        requestStreamingSpeechFinalize,
    ]);


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

    // Keep unmount cleanup independent from reactive callback identity.  The
    // session's stop callback captures conversation-related helpers, so binding
    // this cleanup directly to `stop` used to tear down a brand-new voice session
    // when conversationId changed from null to the freshly-created conversation.
    const stopLatestRef = useRef(stop);
    useEffect(() => {
        stopLatestRef.current = stop;
    }, [stop]);

    useEffect(() => () => {
        void stopLatestRef.current?.({silent: true});
    }, []);

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
        const bargeResumeStatus = bargeResumeStatusRef.current || bargeProbeRef.current?.resumeStatus;
        mutedRef.current = nextMuted;
        localSpeechActiveRef.current = false;
        streamerRef.current?.setMuted?.(nextMuted);

        if (nextMuted) {
            clearBargeProbe();
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
            bargeResumeStatusRef.current = null;
        }

        patchState(current => ({
            muted: nextMuted,
            waveform: nextMuted ? createSilentWaveformLevels(28) : current.waveform,
            partialTranscript: nextMuted ? '' : current.partialTranscript,
            status: nextMuted
                ? (isSpeakingState(speechStateRef.current)
                    ? 'speaking'
                    : (['thinking', 'understanding'].includes(bargeResumeStatus) ? bargeResumeStatus : 'listening'))
                : current.status,
        }));
    }, [clearBargeProbe, conversationId, patchState, resumeActiveSpeech]);

    return {
        state,
        start,
        stop,
        toggleMute,
        setMinimized: (minimized) => patchState({minimized}),
    };
}
