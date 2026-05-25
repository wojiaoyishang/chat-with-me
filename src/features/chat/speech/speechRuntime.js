// ChatPage 只保留编排逻辑；朗读相关的纯工具收敛到 feature/speech。
export const SPEECH_AUTO_HIGHLIGHT_CLASS = 'chat-speech-auto-highlight';
export const SPEECH_AUTO_HIGHLIGHT_ATTR = 'data-chat-speech-auto-highlight';
export const SPEECH_SEGMENT_BINDING_ATTR = 'data-chat-speech-segment-binding';
export const SPEECH_SEGMENT_BOUND_ID_ATTR = 'data-chat-speech-segment-id';
export const SPEECH_SEGMENT_BOUND_IDS_ATTR = 'data-chat-speech-segment-ids';
export const SPEECH_SEGMENT_BOUND_INDEX_ATTR = 'data-chat-speech-segment-index';
export const SPEECH_SEGMENT_BOUND_INDEXES_ATTR = 'data-chat-speech-segment-indexes';
export const SPEECH_BOUNDARY_TOKEN = '\u001F';
export const SPEECH_TEXT_CANDIDATE_SELECTOR = [
    'li',
    '[role="listitem"]',
    'p',
    'blockquote',
    'pre',
    'code',
    'td',
    'th',
    'figcaption',
    'summary',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
].join(',');

// 朗读紫框必须落在一个稳定的边界元素上。列表、表格、标题等非段落结构
// 不一定有 p 包裹，所以这里显式把它们纳入紫框候选。
export const SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR = [
    'li',
    '[role="listitem"]',
    'p',
    'blockquote',
    'pre',
    'td',
    'th',
    'figcaption',
    'summary',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
].join(',');

export const SPEECH_HIGHLIGHT_INLINE_SELECTOR = 'a, span, strong, em, b, i, code, mark, small';


export const DEFAULT_BACKEND_PCM_SAMPLE_RATE = 24000;
export const DEFAULT_BACKEND_PCM_CHANNELS = 1;
export const DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE = 16;

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

export const normalizeSpeechMatchText = (value) => String(value ?? '')
    .replace(/[​-‍﻿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const stripSpeechListMarker = (value) => normalizeSpeechMatchText(value)
    .replace(/^\s*(?:[-*+•‣⁃]|\d+[.)、]|[a-zA-Z][.)])\s+/, '')
    .trim();

export const getSpeechTextVariants = (value) => {
    const raw = normalizeSpeechMatchText(value);
    if (!raw) return [];

    const withoutListMarker = stripSpeechListMarker(raw);
    const withoutMarkdown = normalizeSpeechMatchText(
        withoutListMarker
            .replace(/^[>]+\s*/, '')
            .replace(/[`*_~#]/g, '')
    );

    return Array.from(new Set([raw, withoutListMarker, withoutMarkdown].filter(Boolean)));
};

export const getSpeechSegmentText = (segment) => String(
    segment?.text ??
    segment?.content ??
    segment?.value ??
    segment?.rawText ??
    ''
);

export const getSpeechSegmentTextVariants = (segment) => getSpeechTextVariants(getSpeechSegmentText(segment));

export const resolveSpeechSegmentByLocator = (segments = [], locator = {}) => {
    if (!Array.isArray(segments) || segments.length === 0) return null;

    const id = locator.segmentId ?? locator.currentSegmentId;
    if (id !== undefined && id !== null && id !== '') {
        const byId = segments.find(item => String(item.id) === String(id));
        if (byId) return byId;
    }

    const position = Number(locator.segmentPosition ?? locator.currentSegmentPosition ?? locator.position);
    if (Number.isInteger(position) && position >= 0 && position < segments.length) return segments[position];

    const index = Number(locator.segmentIndex ?? locator.currentSegmentIndex ?? locator.index);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) return segments[index];

    return null;
};

export const resolveSpeechSegmentIdByLocator = (segments = [], locator = {}, fallback = null) => (
    resolveSpeechSegmentByLocator(segments, locator)?.id ?? fallback
);

export const isActiveSpeechStatus = (status) => ['loading', 'playing', 'paused'].includes(status);

export const getSpeechElementText = (element) => normalizeSpeechMatchText(element?.innerText || element?.textContent || '');

export const getSpeechTagScore = (element) => {
    const tagName = element?.tagName?.toLowerCase?.() || '';
    if (tagName === 'li') return 180;
    if (element?.getAttribute?.('role') === 'listitem') return 175;
    if (['p', 'blockquote', 'td', 'th', 'figcaption', 'summary'].includes(tagName)) return 140;
    if (/^h[1-6]$/.test(tagName)) return 130;
    if (['pre', 'code'].includes(tagName)) return 100;
    if (['span', 'strong', 'em'].includes(tagName)) return 30;
    if (tagName === 'div') return -60;
    return 0;
};
