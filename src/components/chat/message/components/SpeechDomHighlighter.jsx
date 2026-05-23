import {useEffect} from 'react';

const HIGHLIGHT_ATTR = 'data-tts-dom-highlight';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'CODE', 'PRE', 'KBD', 'SAMP']);

const normalizeSpeechText = (value = '') => String(value).replace(/\s+/g, ' ').trim();

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

const highlightSegment = (root, segmentText) => {
    const normalizedSegment = normalizeSpeechText(segmentText);
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
    const startIndex = text.indexOf(normalizedSegment);
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

const SpeechDomHighlighter = ({containerRef, msgId, speechState}) => {
    const currentSegmentId = speechState?.messageId === msgId ? speechState?.currentSegmentId : null;
    const segments = speechState?.messageId === msgId ? (speechState?.segments || []) : [];

    useEffect(() => {
        const root = containerRef?.current;
        if (!root) return;

        clearHighlights(root);

        if (!currentSegmentId) return;

        const segment = segments.find(item => item.id === currentSegmentId);
        if (!segment?.text) return;

        // 等 MarkdownRenderer 完成本帧 DOM 更新后再做文本节点高亮。
        const rafId = requestAnimationFrame(() => {
            clearHighlights(root);
            highlightSegment(root, segment.text);
        });

        return () => {
            cancelAnimationFrame(rafId);
            clearHighlights(root);
        };
    }, [containerRef, currentSegmentId, segments, msgId]);

    return null;
};

export default SpeechDomHighlighter;
