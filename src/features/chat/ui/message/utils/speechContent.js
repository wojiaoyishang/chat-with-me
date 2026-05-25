const CARD_REPLACE_PATTERN = /\{\{\s*cardReplace\b[^}]*\}\}/g;
const FENCED_CODE_PATTERN = /(^|\n)[ \t]*(?:```|~~~)[^\n]*\n[\s\S]*?\n[ \t]*(?:```|~~~)[ \t]*(?=\n|$)/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;
const HTML_TAG_PATTERN = /<[^>]+>/g;
const MARKDOWN_TABLE_SEPARATOR_ROW_PATTERN = /^[ \t]*\|?[ \t:|.-]*-{3,}[ \t:|.-]*\|?[ \t]*$/gm;

const SENTENCE_END_CHARS = new Set(['。', '！', '？', '!', '?', '；', ';']);
const CLOSING_SENTENCE_CHARS = new Set([
    '”', '’', '"', "'", '」', '』', '）', ')', '】', ']', '》', '〉', '｝', '}',
]);
const MARKDOWN_ORDERED_LIST_PATTERN = /^\s{0,3}\d{1,4}$/;
const ASCII_ELLIPSIS = '...';
const CJK_ELLIPSIS_CHAR = '…';


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

const isDigit = (char) => /\d/.test(char || '');

const getLinePrefix = (source, index) => {
    const lineStart = source.lastIndexOf('\n', Math.max(0, index - 1)) + 1;
    return source.slice(lineStart, index);
};

const isMarkdownOrderedListDot = (source, index) => {
    if (source[index] !== '.') return false;

    const prefix = getLinePrefix(source, index);
    const nextChar = source[index + 1] || '';
    return MARKDOWN_ORDERED_LIST_PATTERN.test(prefix) && /\s/.test(nextChar);
};

const isAsciiSentenceDot = (source, index) => {
    if (source[index] !== '.') return false;

    const prevChar = source[index - 1] || '';
    const nextChar = source[index + 1] || '';

    // 3.14 / 192.168 这类小数、版本号、IP 不按句子切。
    if (isDigit(prevChar) && isDigit(nextChar)) return false;

    // Markdown 有序列表前缀：1. xxx / 23. xxx 不按句子切。
    if (isMarkdownOrderedListDot(source, index)) return false;

    // 普通英文句号要求后面是空白、闭合引号/括号或文本结束，降低误切缩写的概率。
    return !nextChar || /\s/.test(nextChar) || CLOSING_SENTENCE_CHARS.has(nextChar);
};

const consumeClosingSentenceChars = (source, index) => {
    let cursor = index;

    while (cursor < source.length) {
        const char = source[cursor];

        if (CLOSING_SENTENCE_CHARS.has(char)) {
            cursor += 1;
            continue;
        }

        // 允许句尾连续标点，如 “？！”、“!!!”。
        if (SENTENCE_END_CHARS.has(char)) {
            cursor += 1;
            continue;
        }

        if (char === CJK_ELLIPSIS_CHAR) {
            while (source[cursor] === CJK_ELLIPSIS_CHAR) cursor += 1;
            continue;
        }

        if (source.slice(cursor, cursor + ASCII_ELLIPSIS.length) === ASCII_ELLIPSIS) {
            cursor += ASCII_ELLIPSIS.length;
            continue;
        }

        break;
    }

    return cursor;
};

const getSentenceBreakEnd = (source, index) => {
    const char = source[index];

    if (char === '\n') return index;

    if (char === CJK_ELLIPSIS_CHAR) {
        let cursor = index;
        while (source[cursor] === CJK_ELLIPSIS_CHAR) cursor += 1;
        return consumeClosingSentenceChars(source, cursor);
    }

    if (source.slice(index, index + ASCII_ELLIPSIS.length) === ASCII_ELLIPSIS) {
        return consumeClosingSentenceChars(source, index + ASCII_ELLIPSIS.length);
    }

    if (SENTENCE_END_CHARS.has(char)) {
        return consumeClosingSentenceChars(source, index + 1);
    }

    if (isAsciiSentenceDot(source, index)) {
        return consumeClosingSentenceChars(source, index + 1);
    }

    return -1;
};

const createSpeechSegment = (source, rawStart, rawEnd, msgId, index, occurrenceMap) => {
    const text = normalizeWhitespace(source.slice(rawStart, rawEnd));
    if (!text) return null;

    const normalizedText = normalizeSpeechText(text).toLowerCase();
    const occurrenceIndex = occurrenceMap.get(normalizedText) || 0;
    occurrenceMap.set(normalizedText, occurrenceIndex + 1);

    return {
        id: `${msgId}:tts:${index}`,
        index,
        position: index,
        text,
        rawStart,
        rawEnd,
        normalizedStart: getNormalizedPrefixLength(source, rawStart),
        occurrenceIndex,
        occurrenceKey: normalizedText,
    };
};

const splitSourceIntoSpeechSlices = (source) => {
    const slices = [];
    let segmentStart = 0;
    let index = 0;

    while (index < source.length) {
        const breakEnd = getSentenceBreakEnd(source, index);

        if (breakEnd >= 0) {
            if (index > segmentStart || breakEnd > segmentStart) {
                slices.push({
                    rawStart: segmentStart,
                    rawEnd: breakEnd,
                });
            }

            if (source[index] === '\n') {
                let nextStart = index + 1;
                while (source[nextStart] === '\n') nextStart += 1;
                segmentStart = nextStart;
                index = nextStart;
            } else {
                segmentStart = breakEnd;
                index = breakEnd;
            }
            continue;
        }

        index += 1;
    }

    if (segmentStart < source.length) {
        slices.push({
            rawStart: segmentStart,
            rawEnd: source.length,
        });
    }

    return slices;
};

export const splitSpeakableSegments = (text, msgId) => {
    const source = String(text || '');
    const segments = [];
    const occurrenceMap = new Map();

    splitSourceIntoSpeechSlices(source).forEach((slice) => {
        const segment = createSpeechSegment(
            source,
            slice.rawStart,
            slice.rawEnd,
            msgId,
            segments.length,
            occurrenceMap,
        );

        if (segment) segments.push(segment);
    });

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