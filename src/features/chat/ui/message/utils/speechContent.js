import {
    getCardReplaceIdFromAttributes,
    normalizeReplacementEntry,
    parseCardReplaceAttributes,
} from '@/components/markdown/replacementProtocol.js';

const CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE = /:{2,3}\s*(card|card-replace)\s*\{([^}]*)\}\s*:{2,3}/g;
const CARD_REPLACE_BLOCK_DIRECTIVE_RE = /:{3}\s*(card|card-replace)\s*\{([^}]*)\}\s*\n[\s\S]*?\n:{3}/g;
const CARD_REPLACE_MUSTACHE_RE = /\{\{\s*(cardReplace|card-replace|card)\s+([^{}]*?)\s*\}\}/g;
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

const isReplaceDirective = (directiveName, attributes, replacement) => {
    const normalizedName = String(directiveName || '').toLowerCase();
    if (normalizedName === 'card-replace' || normalizedName === 'cardreplace') return true;

    if (normalizedName !== 'card') return false;
    if (String(attributes?.type || '').trim().toLowerCase() === 'replace') return true;

    const id = getCardReplaceIdFromAttributes(attributes);
    return Boolean(
        id
        && replacement
        && typeof replacement === 'object'
        && Object.prototype.hasOwnProperty.call(replacement, id),
    );
};

const collectCardReplaceDirectiveMatches = (source) => {
    const matches = [];
    const directiveRegexes = [
        CARD_REPLACE_BLOCK_DIRECTIVE_RE,
        CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE,
        CARD_REPLACE_MUSTACHE_RE,
    ];

    directiveRegexes.forEach((directiveRegex) => {
        directiveRegex.lastIndex = 0;
        let match;

        while ((match = directiveRegex.exec(source)) !== null) {
            matches.push({
                start: match.index,
                end: match.index + match[0].length,
                directiveName: match[1],
                rawAttributes: match[2],
            });

            // All current directive patterns consume at least one character, but
            // keep this guard so a future protocol regex cannot loop forever.
            if (match[0].length === 0) directiveRegex.lastIndex += 1;
        }
    });

    matches.sort((left, right) => {
        if (left.start !== right.start) return left.start - right.start;
        return (right.end - right.start) - (left.end - left.start);
    });

    const nonOverlapping = [];
    let consumedUntil = -1;

    matches.forEach((match) => {
        if (match.start < consumedUntil) return;
        nonOverlapping.push(match);
        consumedUntil = match.end;
    });

    return nonOverlapping;
};

const resolveReplacementSpeechContent = (
    directiveName,
    rawAttributes,
    replacement,
    options,
) => {
    const {
        depth,
        maxDepth,
        visitedIds,
    } = options;
    const attributes = parseCardReplaceAttributes(rawAttributes);

    if (!isReplaceDirective(directiveName, attributes, replacement)) return '';

    const replacementId = getCardReplaceIdFromAttributes(attributes);
    if (!replacementId || visitedIds.includes(replacementId)) return '';

    const rawTokenType = String(attributes.type || '').trim();
    const tokenType = rawTokenType.toLowerCase() === 'replace' ? '' : rawTokenType;
    const normalized = normalizeReplacementEntry(
        replacement,
        replacementId,
        tokenType,
        false,
    );

    if (!normalized.exists) return '';

    const normalizedType = String(normalized.type || '').toLowerCase();
    const includeOwnText = normalizedType === 'markdown' && normalized.allowTts === true;

    // A non-TTS wrapper must not make its own prose speakable, but it also must
    // not hide explicitly authorised descendants. Tool-call output commonly has
    // this shape: [markdown] wrapper -> [markdown tts] child replacement.
    return resolveMarkdownSpeechContent(normalized.content, replacement, {
        depth: depth + 1,
        maxDepth,
        visitedIds: [...visitedIds, replacementId],
        includeOwnText,
    });
};

export const resolveMarkdownSpeechContent = (content, replacement = {}, options = {}) => {
    const {
        depth = 0,
        maxDepth = 10,
        visitedIds = [],
        includeOwnText = true,
    } = options;
    const source = String(content ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    if (!source) return '';

    if (depth >= maxDepth) {
        if (!includeOwnText) return '';

        return source
            .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, ' ')
            .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, ' ')
            .replace(CARD_REPLACE_MUSTACHE_RE, ' ');
    }

    const directiveMatches = collectCardReplaceDirectiveMatches(source);
    if (directiveMatches.length === 0) return includeOwnText ? source : '';

    let cursor = 0;
    let result = '';

    directiveMatches.forEach((match) => {
        if (includeOwnText && match.start > cursor) {
            result += source.slice(cursor, match.start);
        }

        const nestedContent = resolveReplacementSpeechContent(
            match.directiveName,
            match.rawAttributes,
            replacement,
            {depth, maxDepth, visitedIds},
        );

        if (nestedContent) {
            result += `\n${nestedContent}\n`;
        }

        cursor = match.end;
    });

    if (includeOwnText && cursor < source.length) {
        result += source.slice(cursor);
    }

    return result;
};

export const getSpeakableContent = (msg) => {
    const raw = resolveMarkdownSpeechContent(
        String(msg?.content || ''),
        msg?.extraInfo?.replace || {},
    );

    return raw
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