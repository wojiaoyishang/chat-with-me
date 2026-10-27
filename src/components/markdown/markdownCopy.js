import { parseAgentContent } from './card-block/agent/agentContent.js';
import { stripFrontendFeedback } from '../../features/chat/speech/frontendFeedback.js';
import { getCardReplaceIdFromAttributes, normalizeReplacementLineBreaks, parseCardReplaceAttributes, parseReplacementProtocol } from './replacementProtocol.js';

const CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE = /:{2,3}\s*(card|card-replace)\s*\{([^}]*)\}\s*:{2,3}/g;
const CARD_REPLACE_BLOCK_DIRECTIVE_RE = /:{3}\s*(card|card-replace)\s*\{([^}]*)\}\s*\n[\s\S]*?\n:{3}/g;
const CARD_REPLACE_MUSTACHE_RE = /\{\{\s*(cardReplace|card-replace|card)\s+([^{}]*?)\s*\}\}/g;

const toSafeString = (value) => {
    return typeof value === 'string' ? value : String(value ?? '');
};

const normalizeLineBreaks = normalizeReplacementLineBreaks;

const normalizeCopyText = (content) => {
    return normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n');
};

const COPY_TEXT_FIELD_PRIORITY = [
    'copyContent',
    'copyMarkdown',
    'copyText',
    'markdown',
    'displayContent',
    'displayText',
    'plainText',
    'plain',
    'text',
    'content',
    'frontend',
    'value',
    'children',
];

const stripCopyTypeMarker = (content) => {
    const parsed = parseReplacementProtocol(content);
    return parsed.hadMarker ? parsed.content : normalizeLineBreaks(content);
};

const extractCopyTextFromReplacementValue = (value, seenObjects = new WeakSet()) => {
    if (value == null) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value
            .map((item) => extractCopyTextFromReplacementValue(item, seenObjects))
            .filter(Boolean)
            .join('\n');
    }

    if (typeof value !== 'object') {
        return '';
    }

    if (seenObjects.has(value)) {
        return '';
    }

    seenObjects.add(value);

    for (const fieldName of COPY_TEXT_FIELD_PRIORITY) {
        if (Object.prototype.hasOwnProperty.call(value, fieldName)) {
            const fieldText = extractCopyTextFromReplacementValue(value[fieldName], seenObjects);

            if (fieldText) {
                return fieldText;
            }
        }
    }

    return '';
};

const normalizeReplacementCopyEntry = (replacement, id, explicitType, inheritedSnapshot = false) => {
    const normalizedId = String(id || '');

    if (!replacement || typeof replacement !== 'object') {
        return {
            exists: false,
            id: normalizedId,
            content: '',
        };
    }

    if (!Object.prototype.hasOwnProperty.call(replacement, normalizedId)) {
        return {
            exists: false,
            id: normalizedId,
            content: '',
        };
    }

    const entry = replacement[normalizedId];
    const extractedCopyContent = extractCopyTextFromReplacementValue(entry);
    const snapshot = inheritedSnapshot || entry?.snapshot === true;
    const rawCopyContent = snapshot ? stripFrontendFeedback(extractedCopyContent) : extractedCopyContent;
    const protocol = parseReplacementProtocol(rawCopyContent);

    // Tool details routed exclusively to Execution Window are deliberately absent from
    // the Assistant transcript. Keep message-level copy/TTS semantics aligned with
    // what the conversation surface actually shows instead of expanding hidden
    // command/log/result payloads back into the copied answer.
    if (
        ['executionwindowtool', 'workspacetransfer', 'executionstatus', 'escstatus'].includes(
            String(explicitType || entry?.type || protocol.type || '').toLowerCase(),
        )
    ) {
        return {
            exists: true,
            id: normalizedId,
            content: '',
        };
    }

    return {
        exists: true,
        id: normalizedId,
        snapshot,
        content:
            String(explicitType || entry?.type || protocol.type || '').toLowerCase() === 'agent'
                ? parseAgentContent(stripCopyTypeMarker(rawCopyContent)).cleanContent
                : stripCopyTypeMarker(rawCopyContent),
    };
};

const isReplaceDirective = (directiveName, attributes) => {
    if (directiveName === 'card-replace') {
        return true;
    }

    if (directiveName !== 'card') {
        return false;
    }

    return String(attributes.type || '').trim() === 'replace';
};

const replaceCopyDirectives = (source, directiveRegex, replacement, options) => {
    const { depth, maxDepth, visitedIds, snapshot } = options;

    directiveRegex.lastIndex = 0;

    return source.replace(directiveRegex, (_match, directiveName, rawAttributes) => {
        const attributes = parseCardReplaceAttributes(rawAttributes);
        const finalId = getCardReplaceIdFromAttributes(attributes);
        const hasReplacementEntry = Boolean(
            finalId &&
            replacement &&
            typeof replacement === 'object' &&
            Object.prototype.hasOwnProperty.call(replacement, finalId),
        );

        // copy 走纯 Markdown 文本路径：UI card marker 本身不进入剪切板。
        // 明确的 replace marker 会展开 replacement；其它 card marker 如能命中 replacement，也按 replacement 展开；否则移除。
        if (!isReplaceDirective(directiveName, attributes) && !hasReplacementEntry) {
            return '';
        }

        if (!finalId) {
            return '';
        }

        if (visitedIds.includes(finalId)) {
            console.error(`[MarkdownRenderer] cardReplace copy 文本出现循环引用，id: ${finalId}`);
            return '';
        }

        const normalized = normalizeReplacementCopyEntry(replacement, finalId, attributes.type, snapshot);

        if (!normalized.exists) {
            return '';
        }

        return resolveMarkdownCopyContent(normalized.content, replacement, {
            depth: depth + 1,
            maxDepth,
            visitedIds: [...visitedIds, finalId],
            snapshot: normalized.snapshot,
        });
    });
};

export const resolveMarkdownCopyContent = (content, replacement = {}, options = {}) => {
    const { depth = 0, maxDepth = 10, visitedIds = [], snapshot = false } = options;

    const source = normalizeLineBreaks(snapshot ? stripFrontendFeedback(content) : content);

    if (!source) {
        return '';
    }

    if (depth >= maxDepth) {
        return normalizeCopyText(
            source
                .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '')
                .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '')
                .replace(CARD_REPLACE_MUSTACHE_RE, ''),
        );
    }

    const withoutBlockDirectives = replaceCopyDirectives(source, CARD_REPLACE_BLOCK_DIRECTIVE_RE, replacement, {
        depth,
        maxDepth,
        visitedIds,
        snapshot,
    });

    const withoutSelfClosingDirectives = replaceCopyDirectives(
        withoutBlockDirectives,
        CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE,
        replacement,
        { depth, maxDepth, visitedIds, snapshot },
    );

    const withoutMustacheDirectives = replaceCopyDirectives(
        withoutSelfClosingDirectives,
        CARD_REPLACE_MUSTACHE_RE,
        replacement,
        { depth, maxDepth, visitedIds, snapshot },
    );

    return normalizeCopyText(withoutMustacheDirectives);
};

export const createMarkdownCopyContentComponent = (copyContent) => {
    const read = typeof copyContent === 'function' ? copyContent : () => toSafeString(copyContent);
    return {
        get content() { return read(); },
        get copyContent() { return read(); },
        get markdownContent() { return read(); },
        get displayContent() { return read(); },
        get text() { return read(); },
        getContent: read,
        getCopyContent: read,
        getMarkdownContent: read,
        getDisplayContent: read,
        getText: read,
        toString: read,
    };
};

