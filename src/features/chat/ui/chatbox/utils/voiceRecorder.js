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
