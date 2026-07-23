const PROTOCOL_MARKER_RE = /^\[([a-zA-Z][\w-]*)(?:\s+([^\]]+?))?\](.*)$/;
const FLAG_TOKEN_RE = /^[a-zA-Z][\w-]*$/;
const STREAMING_MARKDOWN_MARKER_CANDIDATES = [
    '[markdown]',
    '[markdown tts]',
];

export const normalizeReplacementLineBreaks = (value) => String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

const parseFlags = (value = '') => {
    const flags = new Set();

    String(value || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((token) => {
            if (FLAG_TOKEN_RE.test(token)) {
                flags.add(token.toLowerCase());
            }
        });

    return flags;
};

/**
 * Parses the optional transport protocol marker at the first non-empty line.
 *
 * Supported examples:
 *   [markdown]\n...
 *   [markdown tts]\n...
 *   [markdown tts]streamed text joined to the marker
 */
export const parseReplacementProtocol = (content, {isStreaming = false} = {}) => {
    const normalizedContent = normalizeReplacementLineBreaks(content);
    const lines = normalizedContent.split('\n');

    for (let index = 0; index < lines.length; index += 1) {
        const originalLine = lines[index];
        if (originalLine.trim() === '') continue;

        const leadingWhitespaceLength = originalLine.length - originalLine.trimStart().length;
        const leadingWhitespace = originalLine.slice(0, leadingWhitespaceLength);
        const body = originalLine.slice(leadingWhitespaceLength);
        const markerMatch = PROTOCOL_MARKER_RE.exec(body);

        if (markerMatch) {
            const type = markerMatch[1];
            const normalizedType = type.toLowerCase();
            const flags = parseFlags(markerMatch[2]);
            const trailingContent = markerMatch[3] || '';
            const nextLines = [...lines];

            // Only markdown transport markers are allowed to be joined to the first
            // content token. Other card types keep the legacy standalone-line rule.
            if (trailingContent && normalizedType !== 'markdown') {
                return {
                    type: null,
                    flags: new Set(),
                    content: normalizedContent,
                    hadMarker: false,
                    incomplete: false,
                };
            }

            nextLines[index] = `${leadingWhitespace}${trailingContent.replace(/^\s+/, '')}`;

            return {
                type,
                flags,
                content: nextLines.join('\n'),
                hadMarker: true,
                incomplete: false,
            };
        }

        if (isStreaming && body.startsWith('[')) {
            const normalizedBody = body.toLowerCase();
            const isIncompleteMarkdownMarker = STREAMING_MARKDOWN_MARKER_CANDIDATES.some((candidate) => {
                return candidate.startsWith(normalizedBody) && normalizedBody !== candidate;
            });

            if (isIncompleteMarkdownMarker) {
                const nextLines = [...lines];
                nextLines[index] = '';

                return {
                    type: 'markdown',
                    flags: new Set(),
                    content: nextLines.join('\n'),
                    hadMarker: false,
                    incomplete: true,
                };
            }
        }

        break;
    }

    return {
        type: null,
        flags: new Set(),
        content: normalizedContent,
        hadMarker: false,
        incomplete: false,
    };
};

const getReplacementEntryValue = (entry) => {
    if (typeof entry === 'string') {
        return {
            content: entry,
            entryType: '',
            allowTts: false,
        };
    }

    if (entry && typeof entry === 'object') {
        return {
            content: entry.content ?? entry.frontend ?? entry.value ?? '',
            entryType: entry.type || '',
            allowTts: entry.allowTts === true || entry.tts === true,
        };
    }

    return {
        content: String(entry ?? ''),
        entryType: '',
        allowTts: false,
    };
};

export const normalizeReplacementEntry = (
    replacement,
    id,
    tokenType = '',
    isStreaming = false,
) => {
    const normalizedId = String(id || '');
    const explicitTokenType = String(tokenType || '').trim();

    if (!replacement || typeof replacement !== 'object') {
        return {
            exists: false,
            id: normalizedId,
            type: explicitTokenType || 'markdown',
            flags: new Set(),
            allowTts: false,
            content: '',
            incompleteProtocol: false,
        };
    }

    const entry = replacement[normalizedId];
    if (entry == null) {
        return {
            exists: false,
            id: normalizedId,
            type: explicitTokenType || 'markdown',
            flags: new Set(),
            allowTts: false,
            content: '',
            incompleteProtocol: false,
        };
    }

    const extracted = getReplacementEntryValue(entry);
    const normalizedRawContent = normalizeReplacementLineBreaks(extracted.content);
    const protocol = parseReplacementProtocol(normalizedRawContent, {isStreaming});
    const resolvedType = String(
        explicitTokenType
        || extracted.entryType
        || protocol.type
        || 'markdown',
    ).trim();
    const normalizedType = resolvedType.toLowerCase();
    const protocolType = String(protocol.type || '').toLowerCase();
    const hasExternalType = Boolean(explicitTokenType || extracted.entryType);
    const shouldStripProtocol = protocol.hadMarker && (
        !hasExternalType
        || protocolType === normalizedType
        || protocolType === 'markdown'
    );
    const allowTts = normalizedType === 'markdown' && (
        extracted.allowTts
        || (protocolType === 'markdown' && protocol.flags.has('tts'))
    );

    return {
        exists: true,
        id: normalizedId,
        type: resolvedType,
        flags: protocol.flags,
        allowTts,
        content: shouldStripProtocol ? protocol.content : normalizedRawContent,
        inferredType: !hasExternalType && protocol.hadMarker,
        incompleteProtocol: protocol.incomplete,
    };
};

export const parseCardReplaceAttributes = (attributes = '') => {
    const result = {};
    const source = String(attributes || '').trim();
    const attrRegex = /([^\s=]+)(?:=("([^"]*)"|'([^']*)'|([^\s}]+)))?/g;
    let match;

    while ((match = attrRegex.exec(source)) !== null) {
        const key = match[1];
        const value = match[3] ?? match[4] ?? match[5] ?? '';
        if (!key) continue;

        if (value === '' && !key.includes('=')) {
            result.__tokens = [...(result.__tokens || []), key];
            continue;
        }

        result[key] = value;
    }

    if (!result.id && Array.isArray(result.__tokens)) {
        const positionalId = result.__tokens.find(token => token && token !== 'replace');
        if (positionalId) result.id = positionalId;
    }

    return result;
};

export const getCardReplaceIdFromAttributes = (attributes = {}) => String(
    attributes.id
    || attributes.cardId
    || attributes.replaceId
    || attributes.name
    || '',
).trim();
