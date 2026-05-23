const CARD_REPLACE_PATTERN = /\{\{\s*cardReplace\b[^}]*\}\}/g;
const FENCED_CODE_PATTERN = /(^|\n)[ \t]*(?:```|~~~)[^\n]*\n[\s\S]*?\n[ \t]*(?:```|~~~)[ \t]*(?=\n|$)/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;
const HTML_TAG_PATTERN = /<[^>]+>/g;
const MARKDOWN_TABLE_SEPARATOR_ROW_PATTERN = /^[ \t]*\|?[ \t:|.-]*-{3,}[ \t:|.-]*\|?[ \t]*$/gm;

const SENTENCE_PATTERN = /[^。！？!?\.\n]+[。！？!?\.]?|\n+/g;

const normalizeWhitespace = (value = '') => String(value).replace(/\s+/g, ' ').trim();

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
    let match;
    let index = 0;

    while ((match = SENTENCE_PATTERN.exec(source)) !== null) {
        const text = normalizeWhitespace(match[0]);
        if (!text) continue;

        segments.push({
            id: `${msgId}:tts:${index}`,
            index,
            text,
        });
        index += 1;
    }

    if (segments.length === 0 && normalizeWhitespace(source)) {
        segments.push({
            id: `${msgId}:tts:0`,
            index: 0,
            text: normalizeWhitespace(source),
        });
    }

    return segments;
};

export const getSpeakableSegments = (msg, msgId) => splitSpeakableSegments(getSpeakableContent(msg), msgId);
