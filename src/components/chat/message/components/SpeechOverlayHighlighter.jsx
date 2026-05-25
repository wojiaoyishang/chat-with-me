import React, {memo, useEffect, useMemo, useState} from 'react';
import {normalizeSpeechText} from '../utils/speechContent.js';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'PRE', 'KBD', 'SAMP']);

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

const createNormalizedIndex = (nodes) => {
    const map = [];
    let text = '';
    let lastWasSpace = false;

    nodes.forEach((node) => {
        const value = node.nodeValue || '';

        for (let offset = 0; offset < value.length; offset += 1) {
            const char = value[offset];

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

const collectOccurrenceIndexes = (text, segmentText) => {
    const indexes = [];
    if (!text || !segmentText) return indexes;

    let searchFrom = 0;
    while (searchFrom <= text.length) {
        const foundIndex = text.indexOf(segmentText, searchFrom);
        if (foundIndex < 0) break;
        indexes.push(foundIndex);
        searchFrom = foundIndex + Math.max(segmentText.length, 1);
    }

    return indexes;
};

const pickOccurrenceStart = (text, normalizedSegment, segment = {}) => {
    const matches = collectOccurrenceIndexes(text, normalizedSegment);
    if (matches.length === 0) return -1;
    if (matches.length === 1) return matches[0];

    const occurrenceIndex = Number(segment.occurrenceIndex ?? segment.occurrence ?? segment.index ?? 0);
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

const findSegmentRange = (root, segment) => {
    const normalizedSegment = normalizeSpeechText(segment?.text);
    if (!root || !normalizedSegment || typeof document === 'undefined') return null;

    const nodes = getTextNodes(root);
    const {text, map} = createNormalizedIndex(nodes);
    const startIndex = pickOccurrenceStart(text, normalizedSegment, segment);
    if (startIndex < 0) return null;

    const endIndex = startIndex + normalizedSegment.length - 1;
    const start = map[startIndex];
    const end = map[endIndex];
    if (!start || !end) return null;

    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset + 1);
    return range;
};

const rectsFromRange = (root, range) => {
    if (!root || !range) return [];

    const rootRect = root.getBoundingClientRect();
    const rootScrollLeft = root.scrollLeft || 0;
    const rootScrollTop = root.scrollTop || 0;

    return Array.from(range.getClientRects())
        .filter(rect => rect.width > 0 && rect.height > 0)
        .map(rect => ({
            left: rect.left - rootRect.left + rootScrollLeft,
            top: rect.top - rootRect.top + rootScrollTop,
            width: rect.width,
            height: rect.height,
        }));
};

const useSegmentRects = ({containerRef, segment, deps = []}) => {
    const [rects, setRects] = useState([]);

    useEffect(() => {
        const root = containerRef?.current;
        if (!root || !segment?.text || typeof window === 'undefined') {
            setRects([]);
            return undefined;
        }

        let rafId = null;
        let disposed = false;

        const measure = () => {
            if (disposed) return;
            const range = findSegmentRange(root, segment);
            const nextRects = rectsFromRange(root, range);
            setRects(nextRects);
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
            ? new MutationObserver(scheduleMeasure)
            : null;
        mutationObserver?.observe(root, {
            childList: true,
            subtree: true,
            characterData: true,
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
    }, [containerRef, segment?.id, segment?.text, segment?.occurrenceIndex, segment?.normalizedStart, ...deps]);

    return rects;
};

const resolveCurrentSegment = (segments = [], currentSegmentId, currentSegmentIndex, currentSegmentPosition) => {
    if (!Array.isArray(segments) || segments.length === 0) return null;

    if (currentSegmentId !== undefined && currentSegmentId !== null) {
        const byId = segments.find(item => String(item.id) === String(currentSegmentId));
        if (byId) return byId;
    }

    const position = Number(currentSegmentPosition);
    if (Number.isInteger(position) && position >= 0 && position < segments.length) return segments[position];

    const index = Number(currentSegmentIndex);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) return segments[index];

    return null;
};

const SpeechOverlayHighlighter = memo(({containerRef, msgId, speechState}) => {
    const isCurrentMessage = speechState?.messageId === msgId;
    const currentSegmentId = isCurrentMessage ? speechState?.currentSegmentId : null;
    const currentSegmentIndex = isCurrentMessage ? speechState?.currentSegmentIndex : -1;
    const currentSegmentPosition = isCurrentMessage ? speechState?.currentSegmentPosition : -1;
    const segments = isCurrentMessage ? (speechState?.segments || []) : [];

    const currentSegment = useMemo(
        () => resolveCurrentSegment(segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition),
        [segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition]
    );

    const rects = useSegmentRects({
        containerRef,
        segment: currentSegment,
        deps: [speechState?.status],
    });

    if (!currentSegment || rects.length === 0) return null;

    return (
        <div
            data-tts-overlay="true"
            className="absolute inset-0 pointer-events-none z-[1] overflow-visible"
            aria-hidden="true"
        >
            {rects.map((rect, index) => (
                <div
                    key={`${currentSegment.id}-${index}`}
                    className="absolute rounded bg-yellow-200/60 ring-1 ring-yellow-300/40 transition-all duration-150"
                    style={{
                        left: rect.left - 2,
                        top: rect.top + 1,
                        width: rect.width + 4,
                        height: Math.max(rect.height - 2, 12),
                    }}
                />
            ))}
        </div>
    );
});

SpeechOverlayHighlighter.displayName = 'SpeechOverlayHighlighter';

export default SpeechOverlayHighlighter;
