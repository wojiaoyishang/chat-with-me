import {useEffect} from 'react';
import {normalizeSpeechText} from '../utils/speechContent.js';

const HIGHLIGHT_ATTR = 'data-tts-dom-highlight';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'CODE', 'PRE', 'KBD', 'SAMP']);

const clearHighlights = (root) => {
    if (!root) return;

    root.querySelectorAll(`[${HIGHLIGHT_ATTR}="true"]`).forEach((node) => {
        const parent = node.parentNode;
        if (!parent) return;

        while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
        }
        parent.removeChild(node);
        parent.normalize();
    });
};

const shouldSkipTextNode = (node, root) => {
    if (!node?.nodeValue?.trim()) return true;

    let parent = node.parentElement;
    while (parent && parent !== root) {
        if (SKIP_TAGS.has(parent.tagName)) return true;
        if (parent.getAttribute(HIGHLIGHT_ATTR) === 'true') return true;
        if (parent.dataset?.ttsIgnore === 'true') return true;
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

const collectOccurrenceIndexes = (text, segmentText) => {
    const indexes = [];
    let searchFrom = 0;
    while (text && segmentText && searchFrom <= text.length) {
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

const highlightSegment = (root, segment) => {
    const normalizedSegment = normalizeSpeechText(segment?.text);
    if (!root || !normalizedSegment) return false;

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

    const {text, map} = createNormalizedIndex(nodes);
    const startIndex = pickOccurrenceStart(text, normalizedSegment, segment);
    if (startIndex < 0) return false;

    const endIndex = startIndex + normalizedSegment.length - 1;
    const start = map[startIndex];
    const end = map[endIndex];
    if (!start || !end) return false;

    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset + 1);

    const span = document.createElement('span');
    span.setAttribute(HIGHLIGHT_ATTR, 'true');
    span.className = 'bg-yellow-200/80 rounded px-0.5 transition-colors duration-200';

    try {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
        return true;
    } catch (error) {
        return false;
    }
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

const SpeechDomHighlighter = ({containerRef, msgId, speechState}) => {
    const isCurrentMessage = speechState?.messageId === msgId;
    const currentSegmentId = isCurrentMessage ? speechState?.currentSegmentId : null;
    const currentSegmentIndex = isCurrentMessage ? speechState?.currentSegmentIndex : -1;
    const currentSegmentPosition = isCurrentMessage ? speechState?.currentSegmentPosition : -1;
    const segments = isCurrentMessage ? (speechState?.segments || []) : [];

    useEffect(() => {
        const root = containerRef?.current;
        if (!root) return;

        clearHighlights(root);

        const segment = resolveCurrentSegment(segments, currentSegmentId, currentSegmentIndex, currentSegmentPosition);
        if (!segment?.text) return;

        // 等 MarkdownRenderer 完成本帧 DOM 更新后再做文本节点高亮。
        const rafId = requestAnimationFrame(() => {
            clearHighlights(root);
            highlightSegment(root, segment);
        });

        return () => {
            cancelAnimationFrame(rafId);
            clearHighlights(root);
        };
    }, [containerRef, currentSegmentId, currentSegmentIndex, currentSegmentPosition, segments, msgId]);

    return null;
};

export default SpeechDomHighlighter;
