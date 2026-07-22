import {
    CARD_REPLACE_TOKEN_RE,
    PROGRESS_LINE_GLOBAL_RE,
    PROGRESS_LINE_RE,
} from './constants.jsx';

export const toSafeString = (value) => {
    return typeof value === 'string' ? value : String(value ?? '');
};

export const stripCardReplaceTokensForPreview = (content) => {
    return toSafeString(content)
        .replace(CARD_REPLACE_TOKEN_RE, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

export const stripProgressMarkers = (content) => {
    return toSafeString(content)
        .replace(PROGRESS_LINE_GLOBAL_RE, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trimEnd();
};

export const getLatestProgressMarker = (content) => {
    const safeContent = toSafeString(content);
    const matches = [...safeContent.matchAll(new RegExp(PROGRESS_LINE_RE.source, 'gi'))];
    const match = matches.at(-1);

    if (!match) {
        return null;
    }

    const rawCurrent = Number.parseInt(match[1], 10);
    const rawTotal = Number.parseInt(match[2], 10);

    if (!Number.isFinite(rawCurrent) || !Number.isFinite(rawTotal) || rawTotal <= 0) {
        return null;
    }

    const total = rawTotal;
    const current = Math.min(Math.max(rawCurrent, 0), total);

    return {
        current,
        total,
        isNotStarted: current === 0,
        isComplete: current >= total,
    };
};

export const getParagraphsForPreview = (content) => {
    const previewContent = stripCardReplaceTokensForPreview(content);

    if (!previewContent) {
        return [];
    }

    return previewContent
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph.length > 0);
};

export const getLastLineForPreview = (content) => {
    const previewContent = stripCardReplaceTokensForPreview(content);

    if (!previewContent) {
        return '';
    }

    const allLines = previewContent
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    return allLines[allLines.length - 1] || '';
};
