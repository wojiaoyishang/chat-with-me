import React, {memo, useEffect, useMemo, useRef, useState} from 'react';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'BUTTON', 'PRE', 'KBD', 'SAMP']);

const normalizeSpeechText = (value = '') => String(value).replace(/\s+/g, ' ').trim();

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

const findSegmentRange = (root, segmentText) => {
    const normalizedSegment = normalizeSpeechText(segmentText);
    if (!root || !normalizedSegment || typeof document === 'undefined') return null;

    const nodes = getTextNodes(root);
    const {text, map} = createNormalizedIndex(nodes);
    const startIndex = text.indexOf(normalizedSegment);
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
            const range = findSegmentRange(root, segment.text);
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
    }, [containerRef, segment?.id, segment?.text, ...deps]);

    return rects;
};

const SpeechOverlayHighlighter = memo(({containerRef, msgId, speechState}) => {
    const currentSegmentId = speechState?.messageId === msgId ? speechState?.currentSegmentId : null;
    const segments = speechState?.messageId === msgId ? (speechState?.segments || []) : [];

    const currentSegment = useMemo(
        () => segments.find(item => item.id === currentSegmentId) || null,
        [segments, currentSegmentId]
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
