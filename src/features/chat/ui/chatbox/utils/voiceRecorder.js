import {MicVAD} from '@ricky0123/vad-web';

const TARGET_SAMPLE_RATE = 16000;
const DEFAULT_WAVEFORM_BARS = 56;

export class VoicePermissionFlowCancelledError extends Error {
    constructor(message = 'Microphone permission request was cancelled.') {
        super(message);
        this.name = 'VoicePermissionFlowCancelledError';
        this.code = 'VOICE_PERMISSION_FLOW_CANCELLED';
        this.isVoicePermissionFlowCancelled = true;
    }
}

export const isVoicePermissionFlowCancelled = (error) => {
    return Boolean(
        error?.isVoicePermissionFlowCancelled ||
        error?.code === 'VOICE_PERMISSION_FLOW_CANCELLED' ||
        error?.name === 'VoicePermissionFlowCancelledError'
    );
};


const getAudioContextClass = () => {
    if (typeof window === 'undefined') return null;
    return window.AudioContext || window.webkitAudioContext || null;
};

const safeQueryMicrophonePermission = async () => {
    if (typeof navigator === 'undefined' || !navigator.permissions?.query) {
        return 'prompt';
    }

    try {
        const permission = await navigator.permissions.query({name: 'microphone'});
        return permission?.state || 'prompt';
    } catch (error) {
        return 'prompt';
    }
};

const stopStream = (stream) => {
    stream?.getTracks?.().forEach(track => track.stop());
};

export const getMicrophonePermissionState = safeQueryMicrophonePermission;

export const requestMicrophoneStream = async ({
                                                   permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser permission prompt.',
                                                   permissionDeniedMessage = 'Could not access the microphone. Please allow microphone access in your browser settings and try again.',
                                                   permissionUnsupportedMessage = 'This browser does not support microphone recording.',
                                                   onPermissionIntro,
                                                   onPermissionDenied,
                                               } = {}) => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        const error = new Error(permissionUnsupportedMessage);
        await onPermissionDenied?.(error, permissionUnsupportedMessage);
        throw error;
    }

    const permissionState = await safeQueryMicrophonePermission();

    // 已经授权时不弹窗；未授权/待授权时先用业务弹窗说明，再触发浏览器授权弹窗。
    if (permissionState !== 'granted') {
        const shouldContinue = await onPermissionIntro?.(permissionIntroMessage, permissionState);
        if (shouldContinue === false) {
            throw new VoicePermissionFlowCancelledError();
        }
    }

    try {
        return await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
            },
            video: false,
        });
    } catch (error) {
        if (!isVoicePermissionFlowCancelled(error)) {
            await onPermissionDenied?.(error, permissionDeniedMessage);
        }
        throw error;
    }
};

export const ensureMicrophonePermission = async (options) => {
    const stream = await requestMicrophoneStream(options);
    stopStream(stream);
    return true;
};

const mergeFloat32Chunks = (chunks, totalLength) => {
    const merged = new Float32Array(totalLength);
    let offset = 0;

    chunks.forEach(chunk => {
        merged.set(chunk, offset);
        offset += chunk.length;
    });

    return merged;
};

const downsampleFloat32 = (input, sourceSampleRate, targetSampleRate = TARGET_SAMPLE_RATE) => {
    if (!input.length) return new Float32Array(0);
    if (sourceSampleRate === targetSampleRate) return input;

    const sampleRateRatio = sourceSampleRate / targetSampleRate;
    const outputLength = Math.max(1, Math.round(input.length / sampleRateRatio));
    const output = new Float32Array(outputLength);

    for (let i = 0; i < outputLength; i += 1) {
        const sourceIndex = i * sampleRateRatio;
        const sourceIndexFloor = Math.floor(sourceIndex);
        const sourceIndexCeil = Math.min(sourceIndexFloor + 1, input.length - 1);
        const weight = sourceIndex - sourceIndexFloor;
        output[i] = input[sourceIndexFloor] * (1 - weight) + input[sourceIndexCeil] * weight;
    }

    return output;
};

export const float32ToPcm16 = (input) => {
    const output = new Int16Array(input.length);

    for (let i = 0; i < input.length; i += 1) {
        const sample = Math.max(-1, Math.min(1, input[i]));
        output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }

    return output;
};

export const encodePcm16k = (float32Samples, sourceSampleRate) => {
    const pcmFloat32 = downsampleFloat32(float32Samples, sourceSampleRate, TARGET_SAMPLE_RATE);
    return float32ToPcm16(pcmFloat32);
};

export const createSilentWaveformLevels = (barCount = DEFAULT_WAVEFORM_BARS) => {
    return Array.from({length: barCount}, () => 0);
};

export const buildWaveformLevels = (samples, barCount = DEFAULT_WAVEFORM_BARS) => {
    if (!samples?.length || barCount <= 0) return createSilentWaveformLevels(barCount);

    const segmentSize = Math.max(1, Math.floor(samples.length / barCount));
    const levels = [];

    for (let i = 0; i < barCount; i += 1) {
        const start = i * segmentSize;
        const end = i === barCount - 1 ? samples.length : Math.min(samples.length, start + segmentSize);
        let sum = 0;
        let peak = 0;
        let count = 0;

        for (let j = start; j < end; j += 1) {
            const value = Math.abs(samples[j] || 0);
            sum += value * value;
            peak = Math.max(peak, value);
            count += 1;
        }

        const rms = count > 0 ? Math.sqrt(sum / count) : 0;
        // 用 RMS 保证稳定，用 peak 保留瞬态；压缩动态范围，让轻声也能看见但不伪造波形。
        const level = Math.min(1, (rms * 2.8) + (peak * 0.35));
        levels.push(level);
    }

    return levels;
};

const smoothWaveformLevels = (previousLevels, nextLevels) => {
    if (!previousLevels?.length || previousLevels.length !== nextLevels.length) return nextLevels;

    return nextLevels.map((level, index) => {
        const previous = previousLevels[index] || 0;
        // 上升快、回落慢，仍然完全由真实采样驱动。
        const factor = level > previous ? 0.72 : 0.42;
        return previous + (level - previous) * factor;
    });
};

/**
 * 创建一个录音器，stop() 会返回最终的 16kHz/16bit/mono PCM 数据。
 * 返回结构中的 pcm16k 是 Int16Array，pcm16kBuffer 可直接用于后续上传接口。
 * onWaveform 会收到由真实麦克风采样计算出的 0-1 音量条数组，用于 UI 实时绘制声波。
 */
export const createPcm16kRecorder = async (stream, {
    onWaveform,
    waveformBars = DEFAULT_WAVEFORM_BARS,
} = {}) => {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) {
        stopStream(stream);
        throw new Error('This browser does not support Web Audio recording.');
    }

    const audioContext = new AudioContextClass();
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    const chunks = [];
    let totalLength = 0;
    const startedAt = Date.now();
    let closed = false;
    let lastWaveformLevels = createSilentWaveformLevels(waveformBars);

    processor.onaudioprocess = (event) => {
        if (closed) return;
        const channelData = event.inputBuffer.getChannelData(0);
        const chunk = new Float32Array(channelData.length);
        chunk.set(channelData);
        chunks.push(chunk);
        totalLength += chunk.length;

        if (typeof onWaveform === 'function') {
            const nextLevels = buildWaveformLevels(channelData, waveformBars);
            lastWaveformLevels = smoothWaveformLevels(lastWaveformLevels, nextLevels);
            onWaveform(lastWaveformLevels);
        }
    };

    source.connect(processor);
    // ScriptProcessorNode 需要连接到输出节点才会持续触发 onaudioprocess。
    processor.connect(audioContext.destination);

    const cleanup = async () => {
        if (closed) return;
        closed = true;

        try {
            processor.disconnect();
        } catch (error) {
            // ignore
        }

        try {
            source.disconnect();
        } catch (error) {
            // ignore
        }

        stopStream(stream);

        try {
            await audioContext.close();
        } catch (error) {
            // 某些浏览器在已关闭状态会抛错，忽略即可。
        }
    };

    return {
        async stop() {
            await cleanup();
            onWaveform?.(createSilentWaveformLevels(waveformBars));

            const mergedSamples = mergeFloat32Chunks(chunks, totalLength);
            const pcm16k = encodePcm16k(mergedSamples, audioContext.sampleRate);
            const pcm16kBuffer = pcm16k.buffer.slice(
                pcm16k.byteOffset,
                pcm16k.byteOffset + pcm16k.byteLength
            );

            return {
                pcm16k,
                pcm16kBuffer,
                sampleRate: TARGET_SAMPLE_RATE,
                channels: 1,
                bitDepth: 16,
                durationMs: Date.now() - startedAt,
                mimeType: 'audio/pcm;rate=16000',
                blob: new Blob([pcm16kBuffer], {type: 'audio/pcm;rate=16000'}),
            };
        },
        async cancel() {
            await cleanup();
            onWaveform?.(createSilentWaveformLevels(waveformBars));
        },
    };
};

/**
 * Continuous 16kHz PCM streamer for realtime voice sessions.
 *
 * Unlike createPcm16kRecorder this helper never accumulates the entire call.
 * It emits short PCM chunks and a conservative local VAD signal. The VAD is
 * only a barge-in/compatibility candidate; the backend/provider remains the
 * authority that commits a user turn.
 */
export const createRealtimePcm16kStreamer = async (stream, {
    onPcmChunk,
    onWaveform,
    onSpeechStart,
    onSpeechEnd,
    onInputEnded,
    waveformBars = 28,
    vadOptions = {},
} = {}) => {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) {
        stopStream(stream);
        throw new Error('This browser does not support Web Audio recording.');
    }

    const audioTracks = stream?.getAudioTracks?.() || [];
    if (audioTracks.length === 0 || !audioTracks.some(track => track.readyState === 'live')) {
        stopStream(stream);
        throw new Error('麦克风没有可用的实时音轨，请检查录音设备后重试。');
    }

    const audioContext = new AudioContextClass();
    if (audioContext.state === 'suspended') await audioContext.resume();
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(2048, 1, 1);

    let closed = false;
    let muted = false;
    let speechActive = false;
    let samplePosition = 0;
    let levels = createSilentWaveformLevels(waveformBars);
    let lastVadProbability = 0;
    let peakVadProbability = 0;
    let speechStartedAt = 0;
    let readySettled = false;
    let resolveReady;
    let rejectReady;
    const ready = new Promise((resolve, reject) => {
        resolveReady = resolve;
        rejectReady = reject;
    });

    const markReady = () => {
        if (readySettled) return;
        readySettled = true;
        resolveReady?.({sampleRate: audioContext.sampleRate});
    };
    const failReady = (message) => {
        if (readySettled) return;
        readySettled = true;
        rejectReady?.(new Error(message));
    };

    const handleTrackEnded = () => {
        const wasReady = readySettled;
        failReady('麦克风音轨在录音初始化完成前已结束。');
        if (wasReady && !closed) onInputEnded?.();
    };
    audioTracks.forEach(track => track.addEventListener?.('ended', handleTrackEnded));

    const vadAssetBase = String(
        import.meta.env.VITE_SILERO_VAD_ASSET_BASE
        || 'https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.30/dist/'
    );
    const onnxAssetBase = String(
        import.meta.env.VITE_ONNXRUNTIME_WASM_BASE
        || 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/'
    );

    // The existing MediaStream remains the single microphone owner. MicVAD gets
    // a view of that stream and its pause/resume hooks deliberately never stop or
    // reacquire tracks; the surrounding realtime runtime owns that lifecycle.
    let vad;
    try {
        vad = await MicVAD.new({
            baseAssetPath: vadAssetBase,
            onnxWASMBasePath: onnxAssetBase,
            positiveSpeechThreshold: 0.65,
            negativeSpeechThreshold: 0.42,
            minSpeechMs: 180,
            redemptionMs: 420,
            preSpeechPadMs: 120,
            ...vadOptions,
            // Lifecycle-critical options are intentionally not overridable here.
            // The surrounding realtime recorder is the only MediaStream owner.
            model: 'v5',
            startOnLoad: false,
            getStream: async () => stream,
            pauseStream: async () => {},
            resumeStream: async () => stream,
            submitUserSpeechOnPause: false,
            onFrameProcessed: (probabilities, frame) => {
                const probability = Math.max(0, Math.min(1, Number(probabilities?.isSpeech || 0)));
                lastVadProbability = probability;
                peakVadProbability = Math.max(peakVadProbability * 0.985, probability);
                vadOptions?.onFrameProcessed?.(probabilities, frame);
            },
            onSpeechRealStart: () => {
                if (closed || muted || speechActive) return;
                speechActive = true;
                speechStartedAt = Date.now();
                onSpeechStart?.({
                    detector: 'silero_v5',
                    speechProbability: lastVadProbability,
                    peakSpeechProbability: peakVadProbability,
                    startedAt: speechStartedAt,
                });
                vadOptions?.onSpeechRealStart?.();
            },
            onSpeechEnd: (audio) => {
                if (closed || muted) return;
                const endedAt = Date.now();
                const wasActive = speechActive;
                speechActive = false;
                if (wasActive) {
                    onSpeechEnd?.({
                        detector: 'silero_v5',
                        speechProbability: lastVadProbability,
                        peakSpeechProbability: peakVadProbability,
                        durationMs: speechStartedAt ? Math.max(0, endedAt - speechStartedAt) : null,
                        endedAt,
                    });
                }
                speechStartedAt = 0;
                peakVadProbability = 0;
                vadOptions?.onSpeechEnd?.(audio);
            },
            onVADMisfire: () => {
                speechActive = false;
                speechStartedAt = 0;
                peakVadProbability = 0;
                vadOptions?.onVADMisfire?.();
            },
        });
    } catch (error) {
        audioTracks.forEach(track => track.removeEventListener?.('ended', handleTrackEnded));
        try { processor.disconnect(); } catch (_) {}
        try { source.disconnect(); } catch (_) {}
        stopStream(stream);
        try { await audioContext.close(); } catch (_) {}
        throw error;
    }

    const setVadListening = (enabled) => {
        if (closed) return;
        const action = enabled ? vad.start() : vad.pause();
        Promise.resolve(action).catch(error => {
            console.warn('[CWM Voice] Silero VAD lifecycle failed', error);
        });
    };

    const setMuted = (nextMuted) => {
        muted = Boolean(nextMuted);
        audioTracks.forEach(track => {
            track.enabled = !muted;
        });
        speechActive = false;
        speechStartedAt = 0;
        peakVadProbability = 0;
        setVadListening(!muted);
        if (muted) {
            levels = createSilentWaveformLevels(waveformBars);
            onWaveform?.(levels, 0);
        }
    };

    processor.onaudioprocess = (event) => {
        if (closed) return;
        markReady();
        const samples = event.inputBuffer.getChannelData(0);
        const pcm16 = encodePcm16k(samples, audioContext.sampleRate);
        const durationMs = Math.round((pcm16.length / TARGET_SAMPLE_RATE) * 1000);
        const timestampMs = Math.round((samplePosition / TARGET_SAMPLE_RATE) * 1000);
        samplePosition += pcm16.length;

        if (muted) return;

        onPcmChunk?.(pcm16.buffer.slice(pcm16.byteOffset, pcm16.byteOffset + pcm16.byteLength), {
            durationMs,
            timestampMs,
            vad: {
                detector: 'silero_v5',
                speechProbability: lastVadProbability,
                peakSpeechProbability: peakVadProbability,
                speechActive,
            },
        });

        if (onWaveform) {
            let sum = 0;
            for (let i = 0; i < samples.length; i += 1) sum += samples[i] * samples[i];
            const rms = samples.length ? Math.sqrt(sum / samples.length) : 0;
            levels = smoothWaveformLevels(levels, buildWaveformLevels(samples, waveformBars));
            onWaveform(levels, rms);
        }
    };
    source.connect(processor);
    processor.connect(audioContext.destination);
    await vad.start();

    const stop = async () => {
        if (closed) return;
        closed = true;
        failReady('麦克风采集已停止。');
        audioTracks.forEach(track => track.removeEventListener?.('ended', handleTrackEnded));
        try { await vad.destroy(); } catch (_) {}
        try { processor.disconnect(); } catch (_) {}
        try { source.disconnect(); } catch (_) {}
        stopStream(stream);
        try { await audioContext.close(); } catch (_) {}
        onWaveform?.(createSilentWaveformLevels(waveformBars), 0);
    };

    return {
        ready,
        stop,
        setMuted,
        get inputLive() { return audioTracks.some(track => track.readyState === 'live'); },
        get muted() { return muted; },
        get speechActive() { return speechActive; },
        get vadStats() {
            return {
                detector: 'silero_v5',
                speechProbability: lastVadProbability,
                peakSpeechProbability: peakVadProbability,
            };
        },
    };
};
