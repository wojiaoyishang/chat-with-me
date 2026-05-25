import React, {memo, useEffect, useMemo, useState} from 'react';
import {normalizeSpeechText} from '../utils/speechContent.js';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'PRE', 'KBD', 'SAMP']);
const MARKDOWN_MATCH_CHARS = new Set(['`', '*', '_', '~']);
const FRAME_PADDING = 6;
const MIN_FRAME_HEIGHT = 18;
const SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR = [
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
const SPEECH_HIGHLIGHT_INLINE_SELECTOR = 'a, span, strong, em, b, i, code, mark, small';
const CHAT_SPEECH_FRAME_SELECTOR = '.chat-speech-auto-highlight, [data-chat-speech-auto-highlight="true"]';

const EMPTY_HIGHLIGHT = Object.freeze({rects: [], frame: null, boundaryType: null});
const RECT_EPSILON = 0.5;

const rectsEqual = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return Math.abs((a.left || 0) - (b.left || 0)) <= RECT_EPSILON &&
        Math.abs((a.top || 0) - (b.top || 0)) <= RECT_EPSILON &&
        Math.abs((a.width || 0) - (b.width || 0)) <= RECT_EPSILON &&
        Math.abs((a.height || 0) - (b.height || 0)) <= RECT_EPSILON;
};

const highlightEqual = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    if ((a.boundaryType || null) !== (b.boundaryType || null)) return false;
    if (!rectsEqual(a.frame, b.frame)) return false;

    const aRects = Array.isArray(a.rects) ? a.rects : [];
    const bRects = Array.isArray(b.rects) ? b.rects : [];
    if (aRects.length !== bRects.length) return false;

    for (let index = 0; index < aRects.length; index += 1) {
        if (!rectsEqual(aRects[index], bRects[index])) return false;
    }
    return true;
};

const normalizeHighlight = (highlight) => {
    if (!highlight?.frame || !Array.isArray(highlight.rects) || highlight.rects.length === 0) {
        return EMPTY_HIGHLIGHT;
    }
    return highlight;
};

const setHighlightIfChanged = (setHighlight, nextHighlight) => {
    const normalizedNext = normalizeHighlight(nextHighlight);
    setHighlight((prev) => highlightEqual(prev, normalizedNext) ? prev : normalizedNext);
};

const shouldSkipTextNode = (node, root) => {
    if (!node?.nodeValue?.trim()) return true;

    let parent = node.parentElement;
    while (parent && parent !== root) {
        if (SKIP_TAGS.has(parent.tagName)) return true;
        if (parent.dataset?.ttsIgnore === 'true') return true;
        if (parent.dataset?.ttsOverlay === 'true') return true;
        // fenced code block 通常会被渲染为 pre/code 或带 language/hljs 类名的容器，
        // 但行内 code 需要保留，否则包含 `code` 的句子无法定位高亮。
        if (parent.tagName === 'CODE' && parent.closest('pre')) return true;
        const className = typeof parent.className === 'string' ? parent.className : '';
        if (/\b(hljs|highlight|code-block|language-[^\s]+)\b/.test(className) && parent.closest('pre')) return true;
        parent = parent.parentElement;
    }

    return false;
};

const stripSpeechListMarker = (value) => normalizeSpeechText(value)
    .replace(/^\s*(?:[-*+•‣⁃]|\d+[.)、]|[a-zA-Z][.)])\s+/, '')
    .trim();

const stripMarkdownMatchChars = (value) => normalizeSpeechText(value)
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const getSpeechTextVariants = (value) => {
    const raw = normalizeSpeechText(value);
    if (!raw) return [];

    const withoutListMarker = stripSpeechListMarker(raw);
    const withoutMarkdown = stripMarkdownMatchChars(withoutListMarker);

    return Array.from(new Set([raw, withoutListMarker, withoutMarkdown].filter(Boolean)));
};

const normalizeForIndex = (value, options = {}) => {
    const normalized = normalizeSpeechText(value);
    if (!options.ignoreMarkdownSyntax) return normalized;
    return stripMarkdownMatchChars(normalized);
};

const createNormalizedIndex = (nodes, options = {}) => {
    const map = [];
    let text = '';
    let lastWasSpace = false;

    nodes.forEach((node) => {
        const value = node.nodeValue || '';

        for (let offset = 0; offset < value.length; offset += 1) {
            const char = value[offset];

            if (/[\u200B-\u200D\uFEFF]/.test(char)) continue;
            if (options.ignoreMarkdownSyntax && MARKDOWN_MATCH_CHARS.has(char)) continue;

            if (/\s/.test(char)) {
                if (!lastWasSpace && text.length > 0) {
                    text += ' ';
                    map.push({node, offset});
                    lastWasSpace = true;
                }
            } else {
                text += char;
                map.push({node, offset});
                lastWasSpace = false;
            }
        }
    });

    return {text, map};
};

const getTextNodes = (root) => {
    if (!root || typeof document === 'undefined') return [];

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => shouldSkipTextNode(node, root)
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT,
        }
    );

    const nodes = [];
    let node = walker.nextNode();
    while (node) {
        nodes.push(node);
        node = walker.nextNode();
    }

    return nodes;
};

const collectOccurrenceIndexes = (text, segmentText, fromIndex = 0) => {
    const indexes = [];
    if (!text || !segmentText) return indexes;

    let searchFrom = Math.max(0, Number(fromIndex) || 0);
    while (searchFrom <= text.length) {
        const foundIndex = text.indexOf(segmentText, searchFrom);
        if (foundIndex < 0) break;
        indexes.push(foundIndex);
        searchFrom = foundIndex + Math.max(segmentText.length, 1);
    }

    return indexes;
};

const getNormalizedSegmentVariants = (segment, options = {}) => (
    getSpeechTextVariants(segment?.text)
        .map(variant => normalizeForIndex(variant, options))
        .filter(Boolean)
);

const pickOccurrenceStart = (text, normalizedSegment, segment = {}) => {
    const matches = collectOccurrenceIndexes(text, normalizedSegment);
    if (matches.length === 0) return -1;
    if (matches.length === 1) return matches[0];

    const occurrenceIndex = Number(segment.occurrenceIndex ?? segment.occurrence);
    if (Number.isInteger(occurrenceIndex) && occurrenceIndex >= 0 && occurrenceIndex < matches.length) {
        return matches[occurrenceIndex];
    }

    const normalizedStart = Number(segment.normalizedStart);
    if (Number.isFinite(normalizedStart)) {
        return matches.reduce((best, current) => (
            Math.abs(current - normalizedStart) < Math.abs(best - normalizedStart) ? current : best
        ), matches[0]);
    }

    return matches[0];
};

const buildRangeFromIndex = (map, startIndex, segmentLength) => {
    if (startIndex < 0 || segmentLength <= 0) return null;

    const endIndex = startIndex + segmentLength - 1;
    const start = map[startIndex];
    const end = map[endIndex];
    if (!start || !end) return null;

    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset + 1);
    return range;
};

const findBestOrderedMatch = (text, variants, cursor) => {
    let bestMatch = null;

    variants.forEach((variant) => {
        const startIndex = text.indexOf(variant, cursor);
        if (startIndex < 0) return;

        if (
            !bestMatch ||
            startIndex < bestMatch.startIndex ||
            (startIndex === bestMatch.startIndex && variant.length > bestMatch.length)
        ) {
            bestMatch = {startIndex, length: variant.length};
        }
    });

    return bestMatch;
};

const findOrderedSegmentRangeWithIndex = (text, map, segments, targetSegmentIndex, options = {}) => {
    if (!Array.isArray(segments) || targetSegmentIndex < 0 || targetSegmentIndex >= segments.length) return null;

    let cursor = 0;
    for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        const variants = getNormalizedSegmentVariants(segment, options);
        if (variants.length === 0) continue;

        const orderedMatch = findBestOrderedMatch(text, variants, cursor);
        const exactStart = orderedMatch?.startIndex ?? -1;
        const exactLength = orderedMatch?.length ?? 0;

        if (index === targetSegmentIndex) {
            if (orderedMatch) return buildRangeFromIndex(map, exactStart, exactLength);

            // 最后兜底只服务当前分段：如果上游明确给了 occurrenceIndex / normalizedStart，
            // 仍可用这些强定位字段；否则不再默认拿第一个重复文本，避免错高亮。
            for (const variant of variants) {
                const hasStrongLocator = segment?.occurrenceIndex !== undefined ||
                    segment?.occurrence !== undefined ||
                    Number.isFinite(Number(segment?.normalizedStart));
                if (!hasStrongLocator) continue;

                const fallbackStart = pickOccurrenceStart(text, variant, segment);
                const fallbackRange = buildRangeFromIndex(map, fallbackStart, variant.length);
                if (fallbackRange) return fallbackRange;
            }

            return null;
        }

        if (orderedMatch) {
            cursor = exactStart + Math.max(exactLength, 1);
        }
    }

    return null;
};

const findOrderedSegmentRange = (root, segments, targetSegmentIndex) => {
    if (!root || !Array.isArray(segments) || targetSegmentIndex < 0 || typeof document === 'undefined') return null;

    const nodes = getTextNodes(root);
    if (nodes.length === 0) return null;

    const strategies = [
        {ignoreMarkdownSyntax: false},
        {ignoreMarkdownSyntax: true},
    ];

    for (const options of strategies) {
        const {text, map} = createNormalizedIndex(nodes, options);
        if (!text || map.length === 0) continue;

        const range = findOrderedSegmentRangeWithIndex(text, map, segments, targetSegmentIndex, options);
        if (range) return range;
    }

    return null;
};

const toRelativeRect = (rootRect, rootScrollLeft, rootScrollTop, rect) => ({
    left: rect.left - rootRect.left + rootScrollLeft,
    top: rect.top - rootRect.top + rootScrollTop,
    width: rect.width,
    height: rect.height,
});

const expandRect = (rect, padding) => {
    if (!rect) return null;

    const top = typeof padding === 'number' ? padding : (padding.top || 0);
    const right = typeof padding === 'number' ? padding : (padding.right || 0);
    const bottom = typeof padding === 'number' ? padding : (padding.bottom || 0);
    const left = typeof padding === 'number' ? padding : (padding.left || 0);

    return {
        left: rect.left - left,
        top: rect.top - top,
        width: rect.width + left + right,
        height: Math.max(rect.height + top + bottom, MIN_FRAME_HEIGHT),
    };
};

const mergeRects = (rects, padding = 0) => {
    if (!Array.isArray(rects) || rects.length === 0) return null;

    const left = Math.min(...rects.map(rect => rect.left));
    const top = Math.min(...rects.map(rect => rect.top));
    const right = Math.max(...rects.map(rect => rect.left + rect.width));
    const bottom = Math.max(...rects.map(rect => rect.top + rect.height));

    return expandRect({
        left,
        top,
        width: right - left,
        height: bottom - top,
    }, padding);
};

const intersectRect = (rect, bounds) => {
    if (!rect || !bounds) return null;

    const left = Math.max(rect.left, bounds.left);
    const top = Math.max(rect.top, bounds.top);
    const right = Math.min(rect.left + rect.width, bounds.left + bounds.width);
    const bottom = Math.min(rect.top + rect.height, bounds.top + bounds.height);

    if (right <= left || bottom <= top) return null;

    return {
        left,
        top,
        width: right - left,
        height: bottom - top,
    };
};

const findRangeElement = (container) => {
    if (!container || typeof Node === 'undefined' || typeof Element === 'undefined') return null;
    if (container.nodeType === Node.TEXT_NODE) return container.parentElement;
    return container instanceof Element ? container : null;
};

const getRangeElements = (range) => {
    if (!range) return [];
    return [
        findRangeElement(range.startContainer),
        findRangeElement(range.endContainer),
        findRangeElement(range.commonAncestorContainer),
    ].filter(Boolean);
};

const getMessageRoot = (root, range) => {
    const rangeElements = getRangeElements(range);
    for (const element of rangeElements) {
        const messageRoot = element.closest?.('[data-tts-message-id], [data-speech-message-id], [data-message-id], [data-msg-id]');
        if (messageRoot && root.contains(messageRoot)) return messageRoot;
    }
    return root;
};

const getClosestInside = (elements, selector, root, messageRoot) => {
    for (const element of elements) {
        const matched = element.closest?.(selector);
        if (matched && root.contains(matched) && messageRoot.contains(matched)) return matched;
    }
    return null;
};

const getSpeechBoundaryElement = (root, range) => {
    if (!root || !range) return null;

    const messageRoot = getMessageRoot(root, range);
    const rangeElements = getRangeElements(range).filter(element => root.contains(element) && messageRoot.contains(element));
    if (rangeElements.length === 0) return null;

    // 优先复用 ChatPage 标在真实 DOM 边界上的伪层锚点。
    // 这样黄色 overlay 的裁剪范围与紫色 ::before 使用同一个 li/p 边界，避免两套定位体系产生偏移。
    const activeFrame = getClosestInside(rangeElements, CHAT_SPEECH_FRAME_SELECTOR, root, messageRoot);
    if (activeFrame) {
        const boundaryType = activeFrame.getAttribute('data-chat-speech-highlight-boundary') || 'block';
        return {element: activeFrame, boundaryType};
    }

    // 列表项优先，避免短文本命中后紫框退化到整条消息。
    const listItem = getClosestInside(rangeElements, 'li, [role="listitem"]', root, messageRoot);
    if (listItem) return {element: listItem, boundaryType: 'list'};

    const blockElement = getClosestInside(rangeElements, SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR, root, messageRoot);
    if (blockElement) return {element: blockElement, boundaryType: 'block'};

    const inlineElement = getClosestInside(rangeElements, SPEECH_HIGHLIGHT_INLINE_SELECTOR, root, messageRoot);
    if (inlineElement) return {element: inlineElement, boundaryType: 'inline'};

    return null;
};

const clampFrameToRoot = (frame, root) => {
    if (!frame || !root) return frame;

    const maxWidth = Math.max(root.scrollWidth || 0, root.clientWidth || 0);
    const maxHeight = Math.max(root.scrollHeight || 0, root.clientHeight || 0);
    const left = Math.max(0, frame.left);
    const top = Math.max(0, frame.top);
    const right = Math.min(maxWidth, frame.left + frame.width);
    const bottom = Math.min(maxHeight, frame.top + frame.height);

    return {
        left,
        top,
        width: Math.max(0, right - left),
        height: Math.max(MIN_FRAME_HEIGHT, bottom - top),
    };
};

const getBoundaryPadding = (boundaryType) => {
    if (boundaryType === 'list') {
        // 贴近原 li 紫框的视觉：左侧稍多一点，尽量覆盖列表 marker 附近区域。
        return {top: 4, right: 8, bottom: 4, left: 12};
    }

    if (boundaryType === 'block') {
        return {top: 4, right: 6, bottom: 4, left: 6};
    }

    return FRAME_PADDING;
};

const rectsFromRange = (root, range) => {
    if (!root || !range) return {rects: [], frame: null, boundaryType: null};

    const rootRect = root.getBoundingClientRect();
    const rootScrollLeft = root.scrollLeft || 0;
    const rootScrollTop = root.scrollTop || 0;

    const rawRects = Array.from(range.getClientRects())
        .filter(rect => rect.width > 0 && rect.height > 0)
        .map(rect => toRelativeRect(rootRect, rootScrollLeft, rootScrollTop, rect));

    if (rawRects.length === 0) return {rects: [], frame: null, boundaryType: null};

    const boundary = getSpeechBoundaryElement(root, range);
    const boundaryRect = boundary?.element
        ? toRelativeRect(rootRect, rootScrollLeft, rootScrollTop, boundary.element.getBoundingClientRect())
        : null;
    const boundaryType = boundary?.boundaryType || 'inline';

    const frameFromBoundary = boundaryRect
        ? expandRect(boundaryRect, getBoundaryPadding(boundaryType))
        : null;
    const frame = clampFrameToRoot(frameFromBoundary || mergeRects(rawRects, FRAME_PADDING), root);
    if (!frame || frame.width <= 0 || frame.height <= 0) return {rects: [], frame: null, boundaryType: null};

    const rects = rawRects
        .map(rect => intersectRect(rect, frame))
        .filter(Boolean);

    return {rects, frame, boundaryType};
};

const useSegmentHighlightRects = ({containerRef, segments, currentSegmentIndex, deps = []}) => {
    const [highlight, setHighlight] = useState(EMPTY_HIGHLIGHT);

    useEffect(() => {
        const root = containerRef?.current;
        const currentSegment = Array.isArray(segments) && currentSegmentIndex >= 0
            ? segments[currentSegmentIndex]
            : null;

        if (!root || !currentSegment?.text || typeof window === 'undefined') {
            setHighlightIfChanged(setHighlight, EMPTY_HIGHLIGHT);
            return undefined;
        }

        let rafId = null;
        let disposed = false;

        const measure = () => {
            if (disposed) return;
            const range = findOrderedSegmentRange(root, segments, currentSegmentIndex);
            const nextHighlight = rectsFromRange(root, range);
            setHighlightIfChanged(setHighlight, nextHighlight);
        };

        const scheduleMeasure = () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(measure);
        };

        scheduleMeasure();

        const resizeObserver = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(scheduleMeasure)
            : null;
        resizeObserver?.observe(root);

        const mutationObserver = typeof MutationObserver !== 'undefined'
            ? new MutationObserver((mutations) => {
                const onlyOverlayChanged = mutations.length > 0 && mutations.every((mutation) => {
                    const target = mutation.target;
                    return target instanceof Element && target.closest?.('[data-tts-overlay="true"]');
                });
                if (!onlyOverlayChanged) scheduleMeasure();
            })
            : null;
        mutationObserver?.observe(root, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });

        window.addEventListener('resize', scheduleMeasure);
        window.addEventListener('scroll', scheduleMeasure, true);

        return () => {
            disposed = true;
            if (rafId !== null) cancelAnimationFrame(rafId);
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
            window.removeEventListener('resize', scheduleMeasure);
            window.removeEventListener('scroll', scheduleMeasure, true);
        };
    }, [containerRef, segments, currentSegmentIndex, ...deps]);

    return highlight;
};

const resolveCurrentSegmentInfo = (segments = [], currentSegmentId, currentSegmentIndex, currentSegmentPosition) => {
    if (!Array.isArray(segments) || segments.length === 0) return {segment: null, index: -1};

    if (currentSegmentId !== undefined && currentSegmentId !== null) {
        const byIdIndex = segments.findIndex(item => String(item.id) === String(currentSegmentId));
        if (byIdIndex >= 0) return {segment: segments[byIdIndex], index: byIdIndex};
    }

    const position = Number(currentSegmentPosition);
    if (Number.isInteger(position) && position >= 0 && position < segments.length) {
        return {segment: segments[position], index: position};
    }

    const index = Number(currentSegmentIndex);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) {
        return {segment: segments[index], index};
    }

    return {segment: null, index: -1};
};

const SpeechOverlayHighlighter = memo(({containerRef, msgId, speechState}) => {
    const isCurrentMessage = speechState?.messageId === msgId;
    const currentSegmentId = isCurrentMessage ? speechState?.currentSegmentId : null;
    const currentSegmentIndex = isCurrentMessage ? speechState?.currentSegmentIndex : -1;
    const currentSegmentPosition = isCurrentMessage ? speechState?.currentSegmentPosition : -1;
    const segments = isCurrentMessage ? (speechState?.segments || []) : [];

    const currentSegmentInfo = useMemo(
        () => resolveCurrentSegmentInfo(segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition),
        [segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition]
    );
    const currentSegment = currentSegmentInfo.segment;
    const currentOrderedIndex = currentSegmentInfo.index;

    const {rects, frame, boundaryType} = useSegmentHighlightRects({
        containerRef,
        segments,
        currentSegmentIndex: currentOrderedIndex,
        deps: [speechState?.status],
    });

    if (!currentSegment || currentOrderedIndex < 0 || !frame || rects.length === 0) return null;

    return (
        <div
            data-tts-overlay="true"
            data-tts-overlay-segment-index={currentOrderedIndex}
            data-tts-overlay-segment-id={currentSegment.id ?? ''}
            className="absolute inset-0 pointer-events-none z-[1] overflow-visible"
            aria-hidden="true"
        >
            <div
                className="absolute pointer-events-none overflow-hidden transition-all duration-150"
                data-tts-overlay-frame-type={boundaryType || 'inline'}
                data-tts-overlay-ordered-index={currentOrderedIndex}
                style={{
                    left: frame.left,
                    top: frame.top,
                    width: frame.width,
                    height: frame.height,
                }}
            >
                {rects.map((rect, index) => (
                    <div
                        key={`${currentSegment.id || currentOrderedIndex}-${index}`}
                        className="absolute rounded bg-yellow-200/60 ring-1 ring-yellow-300/40 transition-all duration-150"
                        style={{
                            left: rect.left - frame.left - 2,
                            top: rect.top - frame.top + 1,
                            width: rect.width + 4,
                            height: Math.max(rect.height - 2, 12),
                        }}
                    />
                ))}
            </div>
        </div>
    );
});

SpeechOverlayHighlighter.displayName = 'SpeechOverlayHighlighter';

export default SpeechOverlayHighlighter;