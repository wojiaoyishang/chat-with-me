const CARD_REPLACE_PATTERN = /\{\{\s*cardReplace\b[^}]*\}\}/g;
const FENCED_CODE_PATTERN = /(^|\n)[ \t]*(?:```|~~~)[^\n]*\n[\s\S]*?\n[ \t]*(?:```|~~~)[ \t]*(?=\n|$)/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;
const HTML_TAG_PATTERN = /<[^>]+>/g;
const MARKDOWN_TABLE_SEPARATOR_ROW_PATTERN = /^[ \t]*\|?[ \t:|.-]*-{3,}[ \t:|.-]*\|?[ \t]*$/gm;

const SENTENCE_PATTERN = /[^。！？!?\.\n]+[。！？!?\.]?|\n+/g;

export const normalizeSpeechText = (value = '') => String(value ?? '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeWhitespace = normalizeSpeechText;

const getNormalizedPrefixLength = (source, rawIndex) => {
    const prefix = String(source || '').slice(0, Math.max(0, rawIndex));
    const normalizedPrefix = normalizeSpeechText(prefix);
    if (!normalizedPrefix) return 0;

    const boundary = String(source || '').slice(Math.max(0, rawIndex - 1), rawIndex + 1);
    const shouldIncludeCollapsedSpace = /\s/.test(boundary) && !/\s$/.test(normalizedPrefix);
    return normalizedPrefix.length + (shouldIncludeCollapsedSpace ? 1 : 0);
};

export const canSpeakMessage = (msg) => msg?.allowSpeak === true;

export const getSpeakableContent = (msg) => {
    const raw = String(msg?.content || '');

    return raw
        // cardReplace 的正文来自 replacement，朗读主内容时直接跳过占位符，不读取 replacement。
        .replace(CARD_REPLACE_PATTERN, ' ')
        // 跳过 fenced code block；表格不跳过，只清理表格分隔行。
        .replace(FENCED_CODE_PATTERN, '\n')
        .replace(INLINE_CODE_PATTERN, '$1')
        .replace(MARKDOWN_TABLE_SEPARATOR_ROW_PATTERN, '\n')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^\s{0,3}#{1,6}\s+/gm, '')
        .replace(/^\s{0,3}>\s?/gm, '')
        .replace(/\|/g, ' ')
        .replace(/[\*_~]/g, '')
        .replace(HTML_TAG_PATTERN, ' ')
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

export const splitSpeakableSegments = (text, msgId) => {
    const source = String(text || '');
    const segments = [];
    const occurrenceMap = new Map();
    let match;
    let index = 0;

    SENTENCE_PATTERN.lastIndex = 0;
    while ((match = SENTENCE_PATTERN.exec(source)) !== null) {
        const text = normalizeWhitespace(match[0]);
        if (!text) continue;

        const normalizedText = normalizeSpeechText(text).toLowerCase();
        const occurrenceIndex = occurrenceMap.get(normalizedText) || 0;
        occurrenceMap.set(normalizedText, occurrenceIndex + 1);

        segments.push({
            id: `${msgId}:tts:${index}`,
            index,
            position: index,
            text,
            rawStart: match.index,
            rawEnd: match.index + match[0].length,
            normalizedStart: getNormalizedPrefixLength(source, match.index),
            occurrenceIndex,
            occurrenceKey: normalizedText,
        });
        index += 1;
    }

    if (segments.length === 0 && normalizeWhitespace(source)) {
        const text = normalizeWhitespace(source);
        segments.push({
            id: `${msgId}:tts:0`,
            index: 0,
            position: 0,
            text,
            rawStart: 0,
            rawEnd: source.length,
            normalizedStart: 0,
            occurrenceIndex: 0,
            occurrenceKey: normalizeSpeechText(text).toLowerCase(),
        });
    }

    return segments;
};

export const getSpeakableSegments = (msg, msgId) => splitSpeakableSegments(getSpeakableContent(msg), msgId);
