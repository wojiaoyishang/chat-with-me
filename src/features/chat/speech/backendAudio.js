import {
    DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE,
    DEFAULT_BACKEND_PCM_CHANNELS,
    DEFAULT_BACKEND_PCM_SAMPLE_RATE,
} from './constants.js';

export const createBackendSpeechAudioState = () => ({
    requestId: null,
    messageId: null,
    engine: null,
    audio: null,
    chunks: new Map(),
    queue: [],
    queuedIds: new Set(),
    objectUrls: new Set(),
    playing: false,
    generationEnded: false,
    cancelled: false,
    playbackEpoch: 0,
    seekEpoch: 0,
    lastPlaybackAckKey: null,
    sampleRate: DEFAULT_BACKEND_PCM_SAMPLE_RATE,
    channels: DEFAULT_BACKEND_PCM_CHANNELS,
    bitsPerSample: DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE,
    format: 'pcm',
    mime: 'audio/pcm',
});

export const normalizeBackendAudioFormat = (payload = {}) => String(
    payload.format || 'pcm'
).toLowerCase();

export const getBackendSpeechSegmentId = (payload = {}) => String(
    payload.segmentId || `speech-segment-${payload.segmentPosition ?? 0}`
);

export const getBackendSpeechSegmentIndex = (payload = {}, fallback = 0) => {
    const value = Number(payload.segmentIndex ?? fallback);
    return Number.isFinite(value) ? value : fallback;
};

export const getBackendSpeechSegmentPosition = (payload = {}, fallback = 0) => {
    const value = Number(payload.segmentPosition ?? fallback);
    return Number.isFinite(value) ? value : fallback;
};

export const getBackendSpeechSampleRate = (payload = {}, fallback = DEFAULT_BACKEND_PCM_SAMPLE_RATE) => {
    const value = Number(payload.sampleRate ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const getBackendSpeechChannels = (payload = {}, fallback = DEFAULT_BACKEND_PCM_CHANNELS) => {
    const value = Number(payload.channels ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const getBackendSpeechBitsPerSample = (payload = {}, fallback = DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE) => {
    const value = Number(payload.bitsPerSample ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const decodeBase64ToUint8Array = (value) => {
    const normalized = String(value || '').replace(/\s+/g, '');
    if (!normalized) return new Uint8Array(0);

    const binaryString = window.atob(normalized);
    const bytes = new Uint8Array(binaryString.length);
    for (let index = 0; index < binaryString.length; index += 1) {
        bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
};

export const concatUint8Arrays = (arrays) => {
    const totalLength = arrays.reduce((sum, item) => sum + (item?.byteLength || 0), 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    arrays.forEach((item) => {
        if (!item?.byteLength) return;
        result.set(item, offset);
        offset += item.byteLength;
    });

    return result;
};

export const writeAsciiString = (view, offset, value) => {
    for (let index = 0; index < value.length; index += 1) {
        view.setUint8(offset + index, value.charCodeAt(index));
    }
};

export const createWavBlobFromPcm = (pcmBytes, options = {}) => {
    const sampleRate = getBackendSpeechSampleRate(options);
    const channels = getBackendSpeechChannels(options);
    const bitsPerSample = getBackendSpeechBitsPerSample(options);
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = channels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const buffer = new ArrayBuffer(44 + pcmBytes.byteLength);
    const view = new DataView(buffer);

    writeAsciiString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmBytes.byteLength, true);
    writeAsciiString(view, 8, 'WAVE');
    writeAsciiString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeAsciiString(view, 36, 'data');
    view.setUint32(40, pcmBytes.byteLength, true);
    new Uint8Array(buffer, 44).set(pcmBytes);

    return new Blob([buffer], {type: 'audio/wav'});
};

export const createBackendSpeechBlob = (byteArrays, payload = {}) => {
    const rawBytes = concatUint8Arrays(byteArrays);
    const format = normalizeBackendAudioFormat(payload);
    const mime = payload.mime || (format === 'pcm' ? 'audio/pcm' : `audio/${format}`);

    if (format === 'pcm' || String(mime).toLowerCase().includes('pcm')) {
        return createWavBlobFromPcm(rawBytes, payload);
    }

    return new Blob([rawBytes], {type: mime});
};
