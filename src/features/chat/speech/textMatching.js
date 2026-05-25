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
