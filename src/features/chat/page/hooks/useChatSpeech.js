import {useCallback, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';
import {generateUUID} from '@/lib/tools.jsx';
import {emitEvent} from '@/context/useEventStore.jsx';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {getSpeakableSegments} from '../../ui/message/utils/speechContent.js';
import {
    TTS_HIGHLIGHT_MAX_SYNC_WAIT_MS,
    TTS_HIGHLIGHT_MIN_CURRENT_TIME,
    TTS_HIGHLIGHT_START_DELAY_MS,
    TTS_NEXT_SEGMENT_TAIL_DELAY_MS,
} from '../../speech/playbackTiming.js';
import {createInitialSpeechControllerState, createInitialSpeechState} from '../../speech/speechState.js';
import {
    SPEECH_AUTO_HIGHLIGHT_CLASS,
    SPEECH_AUTO_HIGHLIGHT_ATTR,
    SPEECH_SEGMENT_BINDING_ATTR,
    SPEECH_SEGMENT_BOUND_ID_ATTR,
    SPEECH_SEGMENT_BOUND_IDS_ATTR,
    SPEECH_SEGMENT_BOUND_INDEX_ATTR,
    SPEECH_SEGMENT_BOUND_INDEXES_ATTR,
    SPEECH_BOUNDARY_TOKEN,
    SPEECH_TEXT_CANDIDATE_SELECTOR,
    SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR,
    SPEECH_HIGHLIGHT_INLINE_SELECTOR,
    createBackendSpeechAudioState,
    normalizeBackendAudioFormat,
    getBackendSpeechSegmentId,
    getBackendSpeechSegmentIndex,
    getBackendSpeechSegmentPosition,
    getBackendSpeechSampleRate,
    getBackendSpeechChannels,
    getBackendSpeechBitsPerSample,
    decodeBase64ToUint8Array,
    createBackendSpeechBlob,
    normalizeSpeechMatchText,
    getSpeechSegmentText,
    getSpeechSegmentTextVariants,
    resolveSpeechSegmentByLocator,
    resolveSpeechSegmentIdByLocator,
    isActiveSpeechStatus,
    getSpeechElementText,
    getSpeechTagScore,
} from '../../speech/speechRuntime.js';

export default function useChatSpeech({
    chatMarkId,
    selectedModel,
    advancedSettingsValues,
    t,
    messagesRef,
    messagesContainerRef,
    userScrollStateRef,
    userAutoScrollUnlockUntilRef,
    isAutoScrollEnabledRef,
    pendingScrollRef,
    checkScrollPosition,
    setShowScrollToBottomButton,
}) {
    // 语音朗读相关：由 useChatSpeech 统一处理播放状态和当前高亮句子。
    const [speechState, setSpeechState] = useState(createInitialSpeechState);
    const speechStateRef = useRef(speechState);
    const speechControllerRef = useRef(createInitialSpeechControllerState());
    const backendSpeechAudioRef = useRef(createBackendSpeechAudioState());
    const [speechAutoFollowEnabled, setSpeechAutoFollowEnabled] = useState(false);
    const speechAutoFollowEnabledRef = useRef(false);
    const speechFollowProgrammaticScrollUntilRef = useRef(0);
    const lastSpeechFollowTargetRef = useRef(null);
    const speechSegmentElementMapRef = useRef({
        key: null,
        byId: new Map(),
        byIndex: new Map(),
    });
    const markSpeechFollowProgrammaticScroll = useCallback((duration = 800) => {
        const until = Date.now() + duration;
        speechFollowProgrammaticScrollUntilRef.current = until;
        userScrollStateRef.current.programmaticScrollUntil = Math.max(
            userScrollStateRef.current.programmaticScrollUntil,
            until,
        );
    }, []);

    const disableSpeechAutoFollowByUser = useCallback(() => {
        if (!speechAutoFollowEnabledRef.current) return;
        speechAutoFollowEnabledRef.current = false;
        setSpeechAutoFollowEnabled(false);
        lastSpeechFollowTargetRef.current = null;
    }, []);
    const escapeSelectorValue = useCallback((value) => {
        const stringValue = String(value ?? '');
        if (typeof window !== 'undefined' && window.CSS?.escape) {
            return window.CSS.escape(stringValue);
        }
        return stringValue.replace(/[\\"']/g, '\\$&');
    }, []);

    const resolveMountedElement = useCallback((value) => {
        if (!value || typeof HTMLElement === 'undefined') return null;
        if (value instanceof HTMLElement) return value;
        if (value.current instanceof HTMLElement) return value.current;
        if (value.element instanceof HTMLElement) return value.element;
        if (value.el instanceof HTMLElement) return value.el;
        if (value.node instanceof HTMLElement) return value.node;
        return null;
    }, []);

    const queryFirstSpeechElement = useCallback((root, selectors) => {
        if (!root) return null;

        for (const selector of selectors.filter(Boolean)) {
            try {
                if (typeof root.matches === 'function' && root.matches(selector)) {
                    return root;
                }
                const element = root.querySelector?.(selector);
                if (element) return element;
            } catch (_) {
                // 忽略极端 ID / selector 造成的解析失败，继续尝试其他定位方式。
            }
        }

        return null;
    }, []);

    const getSpeechMessageElement = useCallback((container, messageId) => {
        if (!container || !messageId) return null;
        const escapedMessageId = escapeSelectorValue(messageId);
        const selectors = [
            `[data-message-id="${escapedMessageId}"]`,
            `[data-msg-id="${escapedMessageId}"]`,
            `[data-speech-message-id="${escapedMessageId}"]`,
            `[id="${escapedMessageId}"]`,
            `[id="message-${escapedMessageId}"]`,
        ];

        const element = queryFirstSpeechElement(container, selectors);
        if (element) return element;

        const message = messagesRef.current?.[messageId];
        if (message && typeof message.getComponent === 'function') {
            const componentKeys = ['messageRef', 'message', 'root', 'container', 'content'];
            for (const key of componentKeys) {
                const mountedElement = resolveMountedElement(message.getComponent(key));
                if (mountedElement) return mountedElement;
            }
        }

        return null;
    }, [escapeSelectorValue, queryFirstSpeechElement, resolveMountedElement]);

    const scoreSpeechTextCandidate = useCallback((element, textVariants) => {
        if (!element || !Array.isArray(textVariants) || textVariants.length === 0) return -Infinity;
        if (element.closest?.('button, textarea, input, select, [aria-hidden="true"]')) return -Infinity;

        const elementText = getSpeechElementText(element);
        if (!elementText) return -Infinity;

        const normalizedElementText = elementText.toLowerCase();
        let bestTextScore = -Infinity;

        for (const variant of textVariants) {
            const normalizedVariant = normalizeSpeechMatchText(variant).toLowerCase();
            if (!normalizedVariant) continue;

            const exactMatch = normalizedElementText === normalizedVariant;
            const containsSegment = normalizedElementText.includes(normalizedVariant);
            const segmentContainsElement = normalizedVariant.includes(normalizedElementText);
            const isMeaningfulReverseMatch = segmentContainsElement &&
                elementText.length >= Math.min(12, Math.max(4, Math.round(variant.length * 0.45)));

            if (!exactMatch && !containsSegment && !isMeaningfulReverseMatch) continue;

            let score = exactMatch ? 1000 : 0;
            score += containsSegment ? 420 : 0;
            score += isMeaningfulReverseMatch ? 260 : 0;
            score -= Math.abs(elementText.length - variant.length) * 0.8;

            if (elementText.length > variant.length * 4 && !exactMatch) score -= 260;
            if (element.childElementCount > 0) score -= Math.min(element.childElementCount * 4, 80);

            bestTextScore = Math.max(bestTextScore, score);
        }

        if (bestTextScore === -Infinity) return -Infinity;
        return bestTextScore + getSpeechTagScore(element);
    }, []);

    const collectSpeechTextCandidates = useCallback((searchRoot, preferredVariants = []) => {
        if (!searchRoot) return [];

        const candidates = [];
        const seen = new WeakSet();
        const addCandidate = (element) => {
            if (!element || seen.has(element)) return;
            if (element.closest?.('button, textarea, input, select, [aria-hidden="true"]')) return;
            if (!getSpeechElementText(element)) return;
            seen.add(element);
            candidates.push(element);
        };

        try {
            if (searchRoot.matches?.(SPEECH_TEXT_CANDIDATE_SELECTOR)) {
                addCandidate(searchRoot);
            }
            searchRoot.querySelectorAll?.(SPEECH_TEXT_CANDIDATE_SELECTOR).forEach(addCandidate);

            // 部分 Markdown 渲染器会把列表项/段落内容拆进 span、strong、em、div。
            // 这些只能作为兜底候选，且需要尽量排除包住整条消息的大 div，避免同文案误命中。
            searchRoot.querySelectorAll?.('span, strong, em, div').forEach((element) => {
                const tagName = element.tagName?.toLowerCase?.();
                const elementTextLength = getSpeechElementText(element).length;
                const variantLength = preferredVariants[0]?.length || 80;
                const isLeafLike = element.childElementCount <= 1;
                const isSmallEnough = elementTextLength <= Math.max(240, variantLength * 3);
                if ((tagName !== 'div' || isLeafLike) && isSmallEnough) {
                    addCandidate(element);
                }
            });
        } catch (_) {
            return [];
        }

        return candidates;
    }, []);

    const findNextSpeechCandidateIndex = useCallback((candidates, matchedElement, matchedIndex) => {
        if (!matchedElement) return Math.max(0, matchedIndex + 1);

        for (let index = matchedIndex + 1; index < candidates.length; index += 1) {
            const candidate = candidates[index];
            if (!matchedElement.contains(candidate)) return index;
        }

        return candidates.length;
    }, []);

    const canReuseSpeechCandidateForNextSegment = useCallback((element, segment) => {
        if (!element || !segment) return false;

        const elementText = getSpeechElementText(element);
        const variants = getSpeechSegmentTextVariants(segment);
        if (!elementText || variants.length === 0) return false;

        const normalizedElementText = elementText.toLowerCase();
        const normalizedVariants = variants
            .map(item => normalizeSpeechMatchText(item).toLowerCase())
            .filter(Boolean);
        const exactMatch = normalizedVariants.some(item => item === normalizedElementText);
        if (exactMatch) return false;

        const primaryLength = Math.max(...normalizedVariants.map(item => item.length));
        if (elementText.length < Math.max(primaryLength + 8, Math.ceil(primaryLength * 1.2))) return false;

        // 嵌套列表里父 li 的 innerText 会包含子列表文本；不复用父 li，避免把子列表项绑定到父项。
        const tagName = element.tagName?.toLowerCase?.();
        if (tagName === 'li' && element.querySelector?.('ol, ul')) return false;

        return true;
    }, []);

    const appendSpeechBindingToken = useCallback((element, attrName, value) => {
        if (!element || value === undefined || value === null) return;
        const token = String(value);
        const oldValue = element.getAttribute(attrName) || '';
        const tokens = oldValue.split(SPEECH_BOUNDARY_TOKEN).filter(Boolean);
        if (!tokens.includes(token)) tokens.push(token);
        element.setAttribute(attrName, tokens.join(SPEECH_BOUNDARY_TOKEN));
    }, []);

    const clearSpeechSegmentElementBindings = useCallback((root) => {
        if (!root) return;
        try {
            root.querySelectorAll?.(`[${SPEECH_SEGMENT_BINDING_ATTR}="true"]`).forEach((element) => {
                element.removeAttribute(SPEECH_SEGMENT_BINDING_ATTR);
                element.removeAttribute(SPEECH_SEGMENT_BOUND_ID_ATTR);
                element.removeAttribute(SPEECH_SEGMENT_BOUND_IDS_ATTR);
                element.removeAttribute(SPEECH_SEGMENT_BOUND_INDEX_ATTR);
                element.removeAttribute(SPEECH_SEGMENT_BOUND_INDEXES_ATTR);
            });
        } catch (_) {
            // 清理只影响本次朗读辅助定位，失败时不阻断播放器。
        }
    }, []);

    const bindSpeechSegmentElement = useCallback((map, element, segment, segmentIndex) => {
        if (!element || !segment) return;

        if (segment.id !== undefined && segment.id !== null) {
            map.byId.set(segment.id, element);
            appendSpeechBindingToken(element, SPEECH_SEGMENT_BOUND_IDS_ATTR, segment.id);
            if (!element.hasAttribute(SPEECH_SEGMENT_BOUND_ID_ATTR)) {
                element.setAttribute(SPEECH_SEGMENT_BOUND_ID_ATTR, String(segment.id));
            }
        }

        map.byIndex.set(segmentIndex, element);
        appendSpeechBindingToken(element, SPEECH_SEGMENT_BOUND_INDEXES_ATTR, segmentIndex);
        if (!element.hasAttribute(SPEECH_SEGMENT_BOUND_INDEX_ATTR)) {
            element.setAttribute(SPEECH_SEGMENT_BOUND_INDEX_ATTR, String(segmentIndex));
        }
        element.setAttribute(SPEECH_SEGMENT_BINDING_ATTR, 'true');
    }, [appendSpeechBindingToken]);

    const rebuildSpeechSegmentElementMap = useCallback((container, speech = speechStateRef.current) => {
        const map = {
            key: `${speech?.requestId || ''}:${speech?.messageId || ''}:${speech?.segments?.length || 0}`,
            byId: new Map(),
            byIndex: new Map(),
        };

        if (!container || !speech?.messageId || !Array.isArray(speech.segments) || speech.segments.length === 0) {
            speechSegmentElementMapRef.current = map;
            return map;
        }

        const messageElement = getSpeechMessageElement(container, speech.messageId);
        const searchRoot = messageElement || container;
        clearSpeechSegmentElementBindings(searchRoot);

        const candidates = collectSpeechTextCandidates(searchRoot, getSpeechSegmentTextVariants(speech.segments[0]));
        let cursor = 0;
        let currentMatch = null;
        let currentMatchCanReuse = false;

        speech.segments.forEach((segment, segmentIndex) => {
            const variants = getSpeechSegmentTextVariants(segment);
            if (variants.length === 0) return;

            let matchedElement = null;
            let matchedIndex = -1;

            if (currentMatch?.element && currentMatchCanReuse) {
                const reuseScore = scoreSpeechTextCandidate(currentMatch.element, variants);
                if (reuseScore > -Infinity) {
                    matchedElement = currentMatch.element;
                    matchedIndex = currentMatch.index;
                }
            }

            if (!matchedElement) {
                if (currentMatch?.element) {
                    cursor = Math.max(
                        cursor,
                        findNextSpeechCandidateIndex(candidates, currentMatch.element, currentMatch.index),
                    );
                }

                let bestElement = null;
                let bestIndex = -1;
                let bestScore = -Infinity;

                for (let candidateIndex = cursor; candidateIndex < candidates.length; candidateIndex += 1) {
                    const candidate = candidates[candidateIndex];
                    const rawScore = scoreSpeechTextCandidate(candidate, variants);
                    if (rawScore === -Infinity) continue;

                    // 当前分段应该优先匹配“当前消息内、当前游标之后”的第一个高质量候选。
                    // 加入距离惩罚，避免相同文字时跨过更近的真实段落去匹配后面的重复文案。
                    const score = rawScore - ((candidateIndex - cursor) * 500);
                    if (score > bestScore) {
                        bestScore = score;
                        bestElement = candidate;
                        bestIndex = candidateIndex;
                    }
                }

                if (bestElement) {
                    matchedElement = bestElement;
                    matchedIndex = bestIndex;
                }
            }

            if (!matchedElement) return;

            bindSpeechSegmentElement(map, matchedElement, segment, segmentIndex);

            currentMatch = {element: matchedElement, index: matchedIndex};
            currentMatchCanReuse = canReuseSpeechCandidateForNextSegment(matchedElement, segment);
            if (!currentMatchCanReuse) {
                cursor = findNextSpeechCandidateIndex(candidates, matchedElement, matchedIndex);
                currentMatch = null;
            }
        });

        speechSegmentElementMapRef.current = map;
        return map;
    }, [
        bindSpeechSegmentElement,
        canReuseSpeechCandidateForNextSegment,
        clearSpeechSegmentElementBindings,
        collectSpeechTextCandidates,
        findNextSpeechCandidateIndex,
        getSpeechMessageElement,
        scoreSpeechTextCandidate,
    ]);

    const getMappedSpeechSegmentElement = useCallback((container, speech = speechStateRef.current) => {
        if (!container || !speech?.messageId) return null;

        // 每次朗读段落变化时重建映射，保证 DOM 更新、重复文本和列表项都按当前消息顺序定位。
        const map = rebuildSpeechSegmentElementMap(container, speech);
        const {currentSegmentId, currentSegmentIndex, currentSegmentPosition} = speech;
        const canonicalSegmentId = resolveSpeechSegmentIdByLocator(speech.segments, {
            currentSegmentId,
            currentSegmentIndex,
            currentSegmentPosition,
        }, currentSegmentId);

        for (const segmentId of Array.from(new Set([currentSegmentId, canonicalSegmentId].filter(Boolean)))) {
            const byIdElement = map.byId.get(segmentId);
            if (byIdElement) return byIdElement;
        }

        for (const segmentIndex of Array.from(new Set([currentSegmentPosition, currentSegmentIndex]))) {
            if (Number.isInteger(segmentIndex) && segmentIndex >= 0) {
                const byIndexElement = map.byIndex.get(segmentIndex);
                if (byIndexElement) return byIndexElement;
            }
        }

        return null;
    }, [rebuildSpeechSegmentElementMap]);

    const findSpeechElementByText = useCallback((searchRoot, currentSegment) => {
        if (!searchRoot || !currentSegment) return null;

        const textVariants = getSpeechSegmentTextVariants(currentSegment);
        if (textVariants.length === 0) return null;

        const candidates = collectSpeechTextCandidates(searchRoot, textVariants);
        let bestElement = null;
        let bestScore = -Infinity;
        for (const element of candidates) {
            const score = scoreSpeechTextCandidate(element, textVariants);
            if (score > bestScore) {
                bestScore = score;
                bestElement = element;
            }
        }

        return bestScore > -Infinity ? bestElement : null;
    }, [collectSpeechTextCandidates, scoreSpeechTextCandidate]);

    const getSpeechParentFallbackElement = useCallback((container, speech = speechStateRef.current, messageElement = null) => {
        if (!container || !speech?.messageId) return null;

        const messageRoot = messageElement || getSpeechMessageElement(container, speech.messageId);
        if (!messageRoot) return null;

        const segments = Array.isArray(speech.segments) ? speech.segments : [];
        if (segments.length === 0) return null;

        const currentSegment = resolveSpeechSegmentByLocator(segments, {
            currentSegmentId: speech.currentSegmentId,
            currentSegmentIndex: speech.currentSegmentIndex,
            currentSegmentPosition: speech.currentSegmentPosition,
        });

        const currentIndexes = Array.from(new Set([
            speech.currentSegmentPosition,
            speech.currentSegmentIndex,
            currentSegment?.index,
            currentSegment ? segments.indexOf(currentSegment) : -1,
        ]
            .map(Number)
            .filter(index => Number.isInteger(index) && index >= 0 && index < segments.length)));

        if (currentIndexes.length === 0) return null;

        const isInsideMessage = (element) => element &&
            element !== container &&
            element !== messageRoot &&
            (element === messageRoot || messageRoot.contains(element));

        const toSafeParentBoundary = (element) => {
            if (!isInsideMessage(element)) return null;

            const listItem = element.closest?.('li, [role="listitem"]');
            if (isInsideMessage(listItem)) return listItem;

            if (element.matches?.(SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR) && element !== messageRoot) {
                return element;
            }

            const blockElement = element.closest?.(SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR);
            if (isInsideMessage(blockElement)) return blockElement;

            // 最后的兜底只允许回退到“当前碎片的一层父级”，不要回退到整条 message。
            const parent = element.parentElement;
            if (isInsideMessage(parent)) return parent;

            return null;
        };

        // 如果当前短句没有命中，优先借用相邻分段的边界。
        // 例如同一个 li 内的 “测试时！” 已经绑定到第 2 项，
        // 那么 “测试2！” 定位失败时只回退到第 2 个 li，而不是整条 message。
        const map = rebuildSpeechSegmentElementMap(container, speech);
        const visitedIndexes = new Set();

        for (let distance = 1; distance < segments.length; distance += 1) {
            for (const currentIndex of currentIndexes) {
                for (const neighborIndex of [currentIndex - distance, currentIndex + distance]) {
                    if (visitedIndexes.has(neighborIndex)) continue;
                    visitedIndexes.add(neighborIndex);
                    if (!Number.isInteger(neighborIndex) || neighborIndex < 0 || neighborIndex >= segments.length) continue;

                    const neighborElement = map.byIndex.get(neighborIndex);
                    const boundary = toSafeParentBoundary(neighborElement);
                    if (boundary) return boundary;
                }
            }
        }

        return null;
    }, [getSpeechMessageElement, rebuildSpeechSegmentElementMap]);

    const getSpeechSegmentElement = useCallback((container, speech = speechStateRef.current) => {
        if (!container || !speech?.messageId) return null;

        const {messageId, currentSegmentId, currentSegmentIndex, currentSegmentPosition} = speech;
        const segments = Array.isArray(speech.segments) ? speech.segments : [];
        const currentSegment = resolveSpeechSegmentByLocator(segments, {
            currentSegmentId,
            currentSegmentIndex,
            currentSegmentPosition,
        });
        const canonicalSegmentId = currentSegment?.id ?? currentSegmentId;
        const messageElement = getSpeechMessageElement(container, messageId);
        const searchRoot = messageElement || container;

        const exactSelectors = [];
        const segmentIdsForSelectors = Array.from(new Set([currentSegmentId, canonicalSegmentId].filter(Boolean).map(String)));
        segmentIdsForSelectors.forEach((segmentIdForSelector) => {
            const escapedSegmentId = escapeSelectorValue(segmentIdForSelector);
            exactSelectors.push(
                `[data-speech-segment-id="${escapedSegmentId}"]`,
                `[data-current-segment-id="${escapedSegmentId}"]`,
                `[data-segment-id="${escapedSegmentId}"]`,
                `[data-speech-id="${escapedSegmentId}"]`,
                `[id="${escapedSegmentId}"]`,
                `[id="speech-segment-${escapedSegmentId}"]`,
                `[id="${escapeSelectorValue(messageId)}-${escapedSegmentId}"]`,
            );
        });

        if (Number.isInteger(currentSegmentIndex) && currentSegmentIndex >= 0) {
            exactSelectors.push(
                `[data-speech-segment-index="${currentSegmentIndex}"]`,
                `[data-segment-index="${currentSegmentIndex}"]`,
            );
        }

        const exactElement = queryFirstSpeechElement(searchRoot, exactSelectors);
        if (exactElement) return exactElement;

        const message = messagesRef.current?.[messageId];
        if (message && typeof message.getComponent === 'function') {
            const componentKeys = [
                currentSegmentId,
                canonicalSegmentId,
                ...segmentIdsForSelectors.flatMap(segmentIdForSelector => ([
                    `speechSegment:${segmentIdForSelector}`,
                    `speech-segment:${segmentIdForSelector}`,
                    `segment:${segmentIdForSelector}`,
                ])),
                currentSegment ? `speechSegment:${currentSegment.index ?? currentSegmentIndex}` : null,
            ].filter(Boolean);

            for (const key of componentKeys) {
                const element = resolveMountedElement(message.getComponent(key));
                if (element) return element;
            }
        }

        const mappedElement = getMappedSpeechSegmentElement(container, speech);
        if (mappedElement) return mappedElement;

        const textElement = findSpeechElementByText(searchRoot, currentSegment);
        if (textElement) return textElement;

        const activeElement = queryFirstSpeechElement(searchRoot, [
            '[data-speech-current="true"]',
            '[data-speech-active="true"]',
            '.speech-current',
            '.speech-segment-current',
            '.speech-highlight-active',
            '.speech-highlight',
        ]);
        if (activeElement) return activeElement;

        const fallbackParentElement = getSpeechParentFallbackElement(container, speech, messageElement);
        if (fallbackParentElement) return fallbackParentElement;

        return null;
    }, [escapeSelectorValue, findSpeechElementByText, getMappedSpeechSegmentElement, getSpeechMessageElement, getSpeechParentFallbackElement, queryFirstSpeechElement, resolveMountedElement]);

    const getSpeechHighlightBoundaryElement = useCallback((targetElement, container) => {
        if (!targetElement || !container || targetElement === container) return null;

        const messageRoot = targetElement.closest?.(
            '[data-tts-message-id], [data-speech-message-id], [data-message-id], [data-msg-id]'
        ) || container;
        const isInsideMessage = (element) => element && (element === messageRoot || messageRoot.contains(element));

        // 列表项优先。Markdown 渲染器常把 li 内容拆进 span/strong/em，
        // 如果直接给内联元素加紫框，列表/无序列表里就容易看不到完整边界。
        const listItem = targetElement.closest?.('li, [role="listitem"]');
        if (isInsideMessage(listItem)) return listItem;

        if (targetElement.matches?.(SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR)) return targetElement;

        const blockElement = targetElement.closest?.(SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR);
        if (isInsideMessage(blockElement)) return blockElement;

        // 兜底：如果只命中了 span / strong / code 等内联碎片，仍然允许加 inline 紫框，
        // 真正的文本高亮由 SpeechOverlayHighlighter 在紫框内裁剪。
        if (targetElement.matches?.(SPEECH_HIGHLIGHT_INLINE_SELECTOR)) return targetElement;

        return targetElement;
    }, []);

    const ensureSpeechHighlightStyle = useCallback(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById('chat-speech-auto-highlight-style')) return;

        const style = document.createElement('style');
        style.id = 'chat-speech-auto-highlight-style';
        style.textContent = `
            .${SPEECH_AUTO_HIGHLIGHT_CLASS} {
                position: relative !important;
                z-index: 0;
                border-radius: 0.55rem !important;
                scroll-margin-top: 5rem;
                isolation: isolate;
            }
            .${SPEECH_AUTO_HIGHLIGHT_CLASS}::before {
                content: '';
                position: absolute;
                pointer-events: none;
                z-index: -1;
                border-radius: 0.55rem;
                background: rgba(99, 102, 241, 0.20);
                transition: background-color 160ms ease, opacity 160ms ease, inset 160ms ease;
            }
            .${SPEECH_AUTO_HIGHLIGHT_CLASS}[data-chat-speech-highlight-boundary="block"]::before {
                inset: -0.16rem -0.36rem;
            }
            li.${SPEECH_AUTO_HIGHLIGHT_CLASS}::before,
            [role="listitem"].${SPEECH_AUTO_HIGHLIGHT_CLASS}::before {
                inset: -0.16rem -0.50rem -0.16rem -0.28rem;
            }
            li.${SPEECH_AUTO_HIGHLIGHT_CLASS}::marker {
                color: rgb(79, 70, 229);
                font-weight: 700;
            }
            .${SPEECH_AUTO_HIGHLIGHT_CLASS}[data-chat-speech-highlight-boundary="inline"] {
                -webkit-box-decoration-break: clone;
                box-decoration-break: clone;
            }
            .${SPEECH_AUTO_HIGHLIGHT_CLASS}[data-chat-speech-highlight-boundary="inline"]::before {
                inset: -0.12rem -0.24rem;
            }
        `;
        document.head.appendChild(style);
    }, []);

    const clearSpeechAutoHighlights = useCallback((root = messagesContainerRef.current) => {
        if (!root) return;
        try {
            root.querySelectorAll?.(`.${SPEECH_AUTO_HIGHLIGHT_CLASS}, [${SPEECH_AUTO_HIGHLIGHT_ATTR}="true"]`).forEach((element) => {
                element.classList.remove(SPEECH_AUTO_HIGHLIGHT_CLASS);
                element.removeAttribute(SPEECH_AUTO_HIGHLIGHT_ATTR);
                element.removeAttribute('data-chat-speech-highlight-boundary');
            });
        } catch (_) {
            // DOM 可能已经被 React 卸载，忽略清理失败。
        }
    }, []);

    const applySpeechHighlight = useCallback((speech = speechStateRef.current) => {
        const container = messagesContainerRef.current;
        if (!container) return null;

        const hasActiveSegment = speech?.currentSegmentId || speech?.currentSegmentIndex >= 0;
        if (!speech?.messageId || !['loading', 'playing', 'paused'].includes(speech.status) || !hasActiveSegment) {
            clearSpeechAutoHighlights(container);
            return null;
        }

        ensureSpeechHighlightStyle();
        clearSpeechAutoHighlights(container);

        const targetElement = getSpeechSegmentElement(container, speech);
        if (!targetElement || targetElement === container) return targetElement;

        const highlightElement = getSpeechHighlightBoundaryElement(targetElement, container) || targetElement;
        if (!highlightElement || highlightElement === container) return targetElement;

        const boundaryType = highlightElement.matches?.('li, [role="listitem"]')
            ? 'list'
            : (highlightElement.matches?.(SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR) ? 'block' : 'inline');

        highlightElement.setAttribute(SPEECH_AUTO_HIGHLIGHT_ATTR, 'true');
        highlightElement.setAttribute('data-chat-speech-highlight-boundary', boundaryType);
        highlightElement.classList.add(SPEECH_AUTO_HIGHLIGHT_CLASS);

        return highlightElement;
    }, [clearSpeechAutoHighlights, ensureSpeechHighlightStyle, getSpeechHighlightBoundaryElement, getSpeechSegmentElement]);

    const scrollSpeechToCurrentSegment = useCallback((options = {}) => {
        const container = messagesContainerRef.current;
        if (!container) return false;

        const speech = options.speech || speechStateRef.current;
        if (!speech?.messageId || !['loading', 'playing', 'paused'].includes(speech.status)) return false;

        const targetElement = applySpeechHighlight(speech) || getSpeechSegmentElement(container, speech);
        if (!targetElement || targetElement === container) return false;

        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const focusOffset = Math.max(72, Math.round(container.clientHeight * 0.36));
        const targetTop = container.scrollTop + targetRect.top - containerRect.top;
        const targetCenterBias = Math.min(Math.max(targetRect.height * 0.25, 0), 80);
        const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
        const nextScrollTop = Math.min(
            Math.max(targetTop - focusOffset + targetCenterBias, 0),
            maxScrollTop,
        );

        markSpeechFollowProgrammaticScroll(options.duration || 1100);
        container.scrollTo({
            top: nextScrollTop,
            behavior: options.behavior || 'smooth',
        });
        userScrollStateRef.current.lastScrollTop = nextScrollTop;
        setShowScrollToBottomButton(false);
        window.setTimeout(() => checkScrollPosition(true), 160);
        return true;
    }, [applySpeechHighlight, checkScrollPosition, getSpeechSegmentElement, markSpeechFollowProgrammaticScroll, setShowScrollToBottomButton]);

    const handleSpeechAutoFollowToggle = useCallback((nextEnabled) => {
        const enabled = typeof nextEnabled === 'boolean'
            ? nextEnabled
            : !speechAutoFollowEnabledRef.current;

        speechAutoFollowEnabledRef.current = enabled;
        setSpeechAutoFollowEnabled(enabled);
        lastSpeechFollowTargetRef.current = null;

        if (enabled) {
            isAutoScrollEnabledRef.current = false;
            pendingScrollRef.current = false;
            userAutoScrollUnlockUntilRef.current = 0;
            requestAnimationFrame(() => {
                if (speechAutoFollowEnabledRef.current) {
                    scrollSpeechToCurrentSegment({behavior: 'smooth', duration: 1100});
                }
            });
        }
    }, [isAutoScrollEnabledRef, pendingScrollRef, scrollSpeechToCurrentSegment]);
    useEffect(() => {
        speechStateRef.current = speechState;
    }, [speechState]);

    useEffect(() => {
        speechAutoFollowEnabledRef.current = speechAutoFollowEnabled;
    }, [speechAutoFollowEnabled]);

    useEffect(() => {
        // 紫色背景改成当前边界元素上的 ::before 伪层：不包裹文本、不改变排版，
        // 但仍由浏览器基于真实 li/p 等边界元素定位，避免 overlay 坐标偏移。
        clearSpeechSegmentElementBindings(messagesContainerRef.current);
        speechSegmentElementMapRef.current = {
            key: null,
            byId: new Map(),
            byIndex: new Map(),
        };

        if (['loading', 'playing', 'paused'].includes(speechState.status)) {
            applySpeechHighlight(speechState);
        } else {
            clearSpeechAutoHighlights();
        }

        return undefined;
    }, [
        applySpeechHighlight,
        clearSpeechAutoHighlights,
        clearSpeechSegmentElementBindings,
        speechState.currentSegmentId,
        speechState.currentSegmentIndex,
        speechState.currentSegmentPosition,
        speechState.messageId,
        speechState.requestId,
        speechState.status,
    ]);

    useEffect(() => {
        if (!speechAutoFollowEnabled || !['loading', 'playing', 'paused'].includes(speechState.status)) {
            if (speechState.status === 'idle' || speechState.status === 'ended') {
                lastSpeechFollowTargetRef.current = null;
            }
            return;
        }

        const hasActiveSegment = speechState.currentSegmentId || speechState.currentSegmentIndex >= 0;
        if (!hasActiveSegment) return;

        const targetKey = `${speechState.requestId || ''}:${speechState.currentSegmentId || speechState.currentSegmentIndex}`;
        if (lastSpeechFollowTargetRef.current === targetKey) return;
        lastSpeechFollowTargetRef.current = targetKey;

        requestAnimationFrame(() => {
            if (speechAutoFollowEnabledRef.current) {
                scrollSpeechToCurrentSegment({speech: speechState, behavior: 'smooth', duration: 1100});
            }
        });
    }, [
        scrollSpeechToCurrentSegment,
        speechAutoFollowEnabled,
        speechState,
    ]);

    const normalizeSpeechRate = useCallback((value) => {
        const nextRate = Number(value);
        if (!Number.isFinite(nextRate)) return 1;
        return Math.min(Math.max(nextRate, 0.1), 10);
    }, []);

    const normalizeProgressPercent = useCallback((value, done = 0, total = 0) => {
        const explicit = Number(value);
        if (Number.isFinite(explicit)) {
            return Math.min(Math.max(explicit, 0), explicit > 1 ? 100 : 1);
        }
        const parsedDone = Number(done);
        const parsedTotal = Number(total);
        if (!Number.isFinite(parsedDone) || !Number.isFinite(parsedTotal) || parsedTotal <= 0) return 0;
        return Math.min(Math.max(parsedDone / parsedTotal, 0), 1);
    }, []);


    const readPayloadNumber = useCallback((payload = {}, keys = [], fallback = -1) => {
        for (const key of keys) {
            const value = payload?.[key];
            const parsed = Number(value);
            if (Number.isInteger(parsed) && parsed >= 0) return parsed;
        }
        const fallbackParsed = Number(fallback);
        return Number.isInteger(fallbackParsed) && fallbackParsed >= 0 ? fallbackParsed : -1;
    }, []);

    const readPayloadString = useCallback((payload = {}, keys = [], fallback = null) => {
        for (const key of keys) {
            const value = payload?.[key];
            if (value !== undefined && value !== null && String(value) !== '') return String(value);
        }
        return fallback !== undefined && fallback !== null && String(fallback) !== '' ? String(fallback) : null;
    }, []);

    const resolveBackendPayloadSegmentPosition = useCallback((payload = {}, fallback = -1) => {
        // 后端/广播层可能把 camelCase 转为 snake_case，前端播放队列必须用稳定的 position 键，
        // 不能依赖 ready 到达顺序推断，否则容易一直卡在第一句或跳句。
        return readPayloadNumber(payload, [
            'segmentPosition',
            'segment_position',
            'position',
            'segmentPos',
            'segment_pos',
            'currentSegmentPosition',
            'current_segment_position',
        ], fallback);
    }, [readPayloadNumber]);

    const resolveBackendPayloadSegmentIndex = useCallback((payload = {}, fallback = -1) => {
        return readPayloadNumber(payload, [
            'segmentIndex',
            'segment_index',
            'index',
            'currentSegmentIndex',
            'current_segment_index',
        ], fallback);
    }, [readPayloadNumber]);

    const resolveBackendPayloadSegmentId = useCallback((payload = {}, fallback = null) => {
        const explicit = readPayloadString(payload, [
            'segmentId',
            'segment_id',
            'id',
            'segmentID',
            'currentSegmentId',
            'current_segment_id',
        ], null);
        if (explicit) return explicit;

        const position = resolveBackendPayloadSegmentPosition(payload, -1);
        const index = resolveBackendPayloadSegmentIndex(payload, position);
        const resolved = resolveSpeechSegmentIdByLocator(speechControllerRef.current?.segments, {
            segmentPosition: position,
            segmentIndex: index,
        }, fallback);
        if (resolved !== undefined && resolved !== null && String(resolved) !== '') return String(resolved);
        if (Number.isInteger(position) && position >= 0) return `position:${position}`;
        if (Number.isInteger(index) && index >= 0) return `index:${index}`;
        return fallback !== undefined && fallback !== null && String(fallback) !== '' ? String(fallback) : null;
    }, [readPayloadString, resolveBackendPayloadSegmentIndex, resolveBackendPayloadSegmentPosition]);

    const getBackendSpeechTotalSegments = useCallback((payload = {}) => {
        const payloadTotal = Number(payload.total ?? payload.totalSegments);
        if (Number.isFinite(payloadTotal) && payloadTotal >= 0) return payloadTotal;
        const stateTotal = Number(speechStateRef.current?.totalSegments);
        if (Number.isFinite(stateTotal) && stateTotal >= 0) return stateTotal;
        const controllerTotal = speechControllerRef.current?.segments?.length;
        return Number.isFinite(controllerTotal) ? controllerTotal : 0;
    }, []);

    const ensureBackendProgressSets = useCallback(() => {
        const backendState = backendSpeechAudioRef.current;
        if (!backendState) return null;
        if (!backendState.generatedSegmentPositions) backendState.generatedSegmentPositions = new Set();
        if (!backendState.bufferedSegmentPositions) backendState.bufferedSegmentPositions = new Set();
        if (!backendState.playedSegmentPositions) backendState.playedSegmentPositions = new Set();
        return backendState;
    }, []);


    const ensureBackendPlaybackQueueState = useCallback(() => {
        const backendState = backendSpeechAudioRef.current;
        if (!backendState) return null;

        // v3: 播放队列必须按 segmentPosition 严格消费。生成/缓存进度只更新缓存，
        // 不能直接 shift FIFO 队列，否则后端异步生成时第 3 句先 ready 会导致前端跳播。
        if (!backendState.readySegmentsByPosition) backendState.readySegmentsByPosition = new Map();
        if (!backendState.readySegmentIds) backendState.readySegmentIds = new Set();
        // Ready 事件可能早于最后一个 Audio-Chunk 到达；先按 position/id 暂存，等 chunk 到达后再入队。
        if (!backendState.pendingReadyByPosition) backendState.pendingReadyByPosition = new Map();
        if (!backendState.pendingReadyById) backendState.pendingReadyById = new Map();
        // 如果后端确认生成结束但某些 position 没有任何音频，前端不能永久卡在该 position。
        if (!backendState.skippedSegmentPositions) backendState.skippedSegmentPositions = new Set();
        if (!Number.isInteger(backendState.nextPlaybackPosition) || backendState.nextPlaybackPosition < 0) {
            const controllerStart = Number(speechControllerRef.current?.startSegmentPosition);
            backendState.nextPlaybackPosition = Number.isInteger(controllerStart) && controllerStart >= 0 ? controllerStart : 0;
        }
        if (!Number.isInteger(backendState.playingSegmentPosition)) backendState.playingSegmentPosition = -1;
        return backendState;
    }, []);

    const getBackendPlaybackStartPosition = useCallback((fallback = 0) => {
        const backendState = backendSpeechAudioRef.current;
        const controllerStart = Number(speechControllerRef.current?.startSegmentPosition);
        const stateStart = Number(backendState?.startSegmentPosition);
        if (Number.isInteger(stateStart) && stateStart >= 0) return stateStart;
        if (Number.isInteger(controllerStart) && controllerStart >= 0) return controllerStart;
        return Number.isInteger(Number(fallback)) && Number(fallback) >= 0 ? Number(fallback) : 0;
    }, []);

    const resetSpeechState = useCallback(() => {
        setSpeechState(createInitialSpeechState());
    }, []);

    const clearBackendSpeechAudio = useCallback(({stopAudio = true} = {}) => {
        const backendState = backendSpeechAudioRef.current;

        if (backendState?.audio) {
            try {
                if (stopAudio) {
                    backendState.audio.pause();
                }
                backendState.audio.removeAttribute?.('src');
                backendState.audio.load?.();
            } catch (_) {
                // 忽略浏览器音频对象释放时的异常。
            }
        }

        backendState?.objectUrls?.forEach((url) => {
            try {
                URL.revokeObjectURL(url);
            } catch (_) {
                // 忽略重复 revoke。
            }
        });

        backendSpeechAudioRef.current = createBackendSpeechAudioState();
    }, []);

    const resetBackendSpeechPlaybackQueue = useCallback(({
                                                             stopAudio = true,
                                                             clearChunks = true,
                                                             bumpEpoch = true,
                                                         } = {}) => {
        const backendState = backendSpeechAudioRef.current;
        if (!backendState) return;

        if (bumpEpoch) {
            backendState.playbackEpoch = (backendState.playbackEpoch || 0) + 1;
        }

        if (backendState.audio) {
            try {
                if (stopAudio) backendState.audio.pause();
                backendState.audio.removeAttribute?.('src');
                backendState.audio.load?.();
            } catch (_) {
                // 忽略浏览器音频对象释放时的异常。
            }
            backendState.audio = null;
        }

        backendState.queue = [];
        backendState.queuedIds.clear?.();
        backendState.readySegmentsByPosition?.clear?.();
        backendState.readySegmentIds?.clear?.();
        backendState.pendingReadyByPosition?.clear?.();
        backendState.pendingReadyById?.clear?.();
        backendState.skippedSegmentPositions?.clear?.();
        backendState.nextPlaybackPosition = getBackendPlaybackStartPosition(0);
        backendState.playingSegmentPosition = -1;
        if (clearChunks) backendState.chunks.clear?.();

        backendState.objectUrls?.forEach((url) => {
            try {
                URL.revokeObjectURL(url);
            } catch (_) {
                // 忽略重复 revoke。
            }
        });
        backendState.objectUrls.clear?.();

        backendState.playing = false;
        backendState.currentSegmentId = null;
        backendState.currentSegmentIndex = -1;
        backendState.currentSegmentPosition = -1;
        backendState.generatedSegmentPositions?.clear?.();
        backendState.bufferedSegmentPositions?.clear?.();
        backendState.playedSegmentPositions?.clear?.();
        backendState.generatedCount = 0;
        backendState.bufferedCount = 0;
        backendState.playedCount = 0;
    }, [getBackendPlaybackStartPosition]);

    // v4: 前端不再向后端上报播放 ACK 或播放队列进度。
    // 后端只负责推送音频内容；本地播放进度只更新 ChatPage 自身状态。

    useEffect(() => () => {
        clearBackendSpeechAudio();
    }, [clearBackendSpeechAudio]);

    const cancelActiveSpeech = useCallback((notifyBackend = false) => {
        const currentController = speechControllerRef.current;
        currentController.cancelled = true;
        if (typeof window !== 'undefined') {
            if (currentController.speakTimer) {
                window.clearTimeout(currentController.speakTimer);
                currentController.speakTimer = null;
            }
            if (currentController.releaseTimer) {
                window.clearTimeout(currentController.releaseTimer);
                currentController.releaseTimer = null;
            }
        }
        currentController.currentUtterance = null;
        currentController.utteranceKeepAlive = [];

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            // cancel() 不会保证退出 paused 状态。下一次主动播放前恢复一次，避免新 utterance 入队后不出声。
            window.speechSynthesis.resume?.();
        }

        clearBackendSpeechAudio();

        if (
            notifyBackend &&
            currentController.requestId &&
            currentController.engine &&
            currentController.engine !== 'browser'
        ) {
            emitEvent({
                type: 'speech',
                target: 'TTS',
                payload: {
                    command: 'Speech-Cancel',
                    requestId: currentController.requestId,
                    messageId: speechStateRef.current?.messageId,
                    msgId: speechStateRef.current?.messageId,
                },
                markId: chatMarkId,
            });
        }

        speechControllerRef.current = {
            requestId: null,
            engine: null,
            cancelled: false,
            playToken: 0,
        };
        resetSpeechState();
    }, [chatMarkId, clearBackendSpeechAudio, resetSpeechState]);

    const pauseActiveSpeech = useCallback(() => {
        const currentController = speechControllerRef.current;
        if (!currentController?.requestId) return false;

        if (currentController.engine === 'browser') {
            currentController.paused = true;
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.pause();
            }
        } else {
            currentController.paused = true;
            const backendAudio = backendSpeechAudioRef.current?.audio;
            if (backendAudio && !backendAudio.paused) {
                backendAudio.pause();
            }

            emitEvent({
                type: 'speech',
                target: 'TTS',
                payload: {
                    command: 'Speech-Pause',
                    requestId: currentController.requestId,
                    messageId: speechStateRef.current?.messageId,
                    msgId: speechStateRef.current?.messageId,
                },
                markId: chatMarkId,
            });
        }

        setSpeechState(prev => ({
            ...prev,
            status: prev.status === 'idle' ? prev.status : 'paused',
        }));
        return true;
    }, [chatMarkId]);

    const resumeActiveSpeech = useCallback(() => {
        const currentController = speechControllerRef.current;
        if (!currentController?.requestId) return false;

        if (currentController.engine === 'browser') {
            currentController.paused = false;
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.resume();
            }
            // Safari 在某些情况下 pause 后不会自动恢复下一句；这里补一次调度。
            if (!speechStateRef.current?.currentSegmentId && typeof currentController.playNext === 'function') {
                window.setTimeout(() => {
                    if (!currentController.cancelled && !currentController.paused) {
                        currentController.playNext();
                    }
                }, 0);
            }
        } else {
            currentController.paused = false;
            const backendAudio = backendSpeechAudioRef.current?.audio;
            if (backendAudio && backendAudio.paused) {
                backendAudio.play?.().catch?.(() => {});
            }

            emitEvent({
                type: 'speech',
                target: 'TTS',
                payload: {
                    command: 'Speech-Resume',
                    requestId: currentController.requestId,
                    messageId: speechStateRef.current?.messageId,
                    msgId: speechStateRef.current?.messageId,
                },
                markId: chatMarkId,
            });
        }

        setSpeechState(prev => ({
            ...prev,
            status: prev.status === 'idle' ? prev.status : 'playing',
        }));
        return true;
    }, [chatMarkId]);

    const findBrowserSpeechVoice = useCallback((speechConfig = {}) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return null;

        const voices = window.speechSynthesis.getVoices?.() || [];
        const configuredVoice = speechConfig.voice || speechConfig.speakVoice || speechConfig.browserVoice;
        const configuredLang = speechConfig.lang || speechConfig.speakLang || navigator.language || 'zh-CN';

        if (configuredVoice) {
            const voice = voices.find(item => (
                item.name === configuredVoice ||
                item.voiceURI === configuredVoice ||
                item.lang === configuredVoice
            ));
            if (voice) return voice;
        }

        return voices.find(item => item.lang === configuredLang) ||
            voices.find(item => item.lang?.toLowerCase?.().startsWith(String(configuredLang).slice(0, 2).toLowerCase())) ||
            null;
    }, []);

    const speakWithBrowser = useCallback(({messageId, requestId, segments, speechConfig, startSegmentPosition = 0, restartReason = null}) => {
        if (typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
            toast.error(t('browser_speech_not_supported'));
            return false;
        }

        cancelActiveSpeech(false);

        const safeStartPosition = Number.isInteger(Number(startSegmentPosition))
            ? Math.min(Math.max(Number(startSegmentPosition), 0), Math.max((segments?.length || 1) - 1, 0))
            : 0;

        const synthesis = window.speechSynthesis;
        const lang = speechConfig.lang || speechConfig.speakLang || navigator.language || 'zh-CN';
        const baseRate = normalizeSpeechRate(speechConfig.rate ?? speechConfig.speakRate ?? 1);
        const pitch = Number(speechConfig.pitch ?? speechConfig.speakPitch ?? 1) || 1;
        const volume = Number(speechConfig.volume ?? speechConfig.speakVolume ?? 1);
        const isCjkSpeechLang = /^(zh|ja|ko)(-|_|$)/i.test(String(lang || ''));
        const BROWSER_SPEECH_MIN_GAP_MS = 80;
        const BROWSER_SPEECH_CANCEL_COOLDOWN_MS = 160;
        const BROWSER_UTTERANCE_KEEP_ALIVE_MS = 3000;
        const SHORT_BROWSER_SEGMENT_CHARS = isCjkSpeechLang ? 10 : 18;
        const TINY_BROWSER_SEGMENT_CHARS = isCjkSpeechLang ? 3 : 5;
        const BROWSER_SPEECH_IDLE_FRAME_COUNT = 2;
        const BROWSER_SPEECH_MAX_SETTLE_WAIT_MS = 1400;
        const BROWSER_SPEECH_NORMAL_MIN_DURATION_MS = 180;
        const BROWSER_SPEECH_SHORT_MIN_DURATION_MS = 420;
        const BROWSER_SPEECH_TINY_MIN_DURATION_MS = 560;
        const BROWSER_SPEECH_NORMAL_TAIL_GAP_MS = 80;
        const BROWSER_SPEECH_SHORT_TAIL_GAP_MS = 160;
        const BROWSER_SPEECH_TINY_TAIL_GAP_MS = 240;

        const normalizeBrowserSpeechText = (value) => String(value || '')
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const getBrowserSpeechCharCount = (value) => Array.from(
            normalizeBrowserSpeechText(value).replace(/[\s。！？!?.,，、；;：:\-—…“”"'`~（）()\[\]{}<>《》]/g, '')
        ).length;

        const buildBrowserUtteranceText = (segment = {}) => {
            const text = normalizeBrowserSpeechText(segment.text);
            if (!text) return '';
            const visibleLength = getBrowserSpeechCharCount(text);
            const hasTerminalPunctuation = /[。！？!?.…]$/.test(text);

            // 一些系统 TTS 对连续极短 utterance 的收尾状态恢复不稳定，容易出现跳读、串音或短暂乱码。
            // 给短句补一个自然结束符，让语音引擎获得稳定的短暂停顿，但不改变 UI 中显示/高亮的原始文本。
            if (visibleLength > 0 && visibleLength <= SHORT_BROWSER_SEGMENT_CHARS && !hasTerminalPunctuation) {
                return `${text}${isCjkSpeechLang ? '。' : '.'}`;
            }
            return text;
        };
        const browserSpeechOptions = {
            ...speechConfig,
            engine: 'browser',
            rate: baseRate,
            lang,
            pitch,
            volume,
        };

        const emitBrowserSpeakMessage = ({startSegmentPosition = 0, restartReason = null} = {}) => {
            // 浏览器内置 TTS 不依赖后端合成结果，但仍通知服务器记录本次朗读请求。
            // 这里刻意不 await / 不读取 reply，避免阻塞 speechSynthesis.speak。
            emitEvent({
                type: 'speech',
                target: 'TTS',
                payload: {
                    command: 'Speak-Message',
                    requestId,
                    msgId: messageId,
                    messageId,
                    engine: 'browser',
                    model: selectedModel?.id,
                    options: {
                        ...browserSpeechOptions,
                        rate: normalizeSpeechRate(controller?.rate ?? browserSpeechOptions.rate),
                        startSegmentPosition,
                        restartReason,
                    },
                    segments,
                    startSegmentPosition,
                    restartReason,
                },
                markId: chatMarkId,
            });
        };

        const controller = {
            requestId,
            engine: 'browser',
            cancelled: false,
            paused: false,
            segments,
            nextIndex: safeStartPosition,
            currentIndex: -1,
            rate: baseRate,
            pitch,
            volume,
            lang,
            playNext: null,
            playFrom: null,
            playToken: 0,
            speakTimer: null,
            releaseTimer: null,
            settleTimer: null,
            settleRaf: null,
            currentUtterance: null,
            utteranceKeepAlive: [],
        };
        speechControllerRef.current = controller;

        setSpeechState({
            status: 'loading',
            messageId,
            requestId,
            engine: 'browser',
            segments,
            currentSegmentId: null,
            currentSegmentIndex: -1,
            currentSegmentPosition: -1,
            rate: baseRate,
        });

        const finish = () => {
            if (controller.cancelled || speechControllerRef.current.requestId !== requestId) return;
            if (controller.speakTimer) {
                window.clearTimeout(controller.speakTimer);
                controller.speakTimer = null;
            }
            if (controller.releaseTimer) {
                window.clearTimeout(controller.releaseTimer);
                controller.releaseTimer = null;
            }
            if (controller.settleTimer) {
                window.clearTimeout(controller.settleTimer);
                controller.settleTimer = null;
            }
            if (controller.settleRaf) {
                window.cancelAnimationFrame(controller.settleRaf);
                controller.settleRaf = null;
            }
            controller.currentUtterance = null;
            controller.utteranceKeepAlive = [];

            setSpeechState(prev => ({
                ...prev,
                status: 'ended',
                currentSegmentId: null,
                currentSegmentIndex: -1,
                currentSegmentPosition: -1,
            }));

            window.setTimeout(() => {
                if (speechControllerRef.current.requestId === requestId) {
                    speechControllerRef.current = {
                        requestId: null,
                        engine: null,
                        cancelled: false,
                        playToken: 0,
                    };
                    resetSpeechState();
                }
            }, 300);
        };

        const releaseFinishedUtteranceLater = (utterance) => {
            if (controller.releaseTimer) window.clearTimeout(controller.releaseTimer);
            controller.releaseTimer = window.setTimeout(() => {
                controller.utteranceKeepAlive = (controller.utteranceKeepAlive || []).filter(item => item !== utterance);
                if (controller.currentUtterance === utterance) controller.currentUtterance = null;
                controller.releaseTimer = null;
            }, BROWSER_UTTERANCE_KEEP_ALIVE_MS);
        };

        const clearBrowserSpeechSettleWait = () => {
            if (controller.settleTimer) {
                window.clearTimeout(controller.settleTimer);
                controller.settleTimer = null;
            }
            if (controller.settleRaf) {
                window.cancelAnimationFrame(controller.settleRaf);
                controller.settleRaf = null;
            }
        };

        const getBrowserSpeechTimingProfile = (segment = {}) => {
            const charCount = getBrowserSpeechCharCount(segment.text);
            if (charCount > 0 && charCount <= TINY_BROWSER_SEGMENT_CHARS) {
                return {
                    minDurationMs: BROWSER_SPEECH_TINY_MIN_DURATION_MS,
                    tailGapMs: BROWSER_SPEECH_TINY_TAIL_GAP_MS,
                };
            }
            if (charCount > 0 && charCount <= SHORT_BROWSER_SEGMENT_CHARS) {
                return {
                    minDurationMs: BROWSER_SPEECH_SHORT_MIN_DURATION_MS,
                    tailGapMs: BROWSER_SPEECH_SHORT_TAIL_GAP_MS,
                };
            }
            return {
                minDurationMs: BROWSER_SPEECH_NORMAL_MIN_DURATION_MS,
                tailGapMs: BROWSER_SPEECH_NORMAL_TAIL_GAP_MS,
            };
        };

        const waitForBrowserSpeechSettled = (segment, utteranceStartedAt, playToken, onSettled) => {
            clearBrowserSpeechSettleWait();

            const {minDurationMs, tailGapMs} = getBrowserSpeechTimingProfile(segment);
            const waitStartedAt = Date.now();
            let stableIdleFrames = 0;

            const isStale = () => (
                controller.cancelled ||
                speechControllerRef.current.requestId !== requestId ||
                controller.playToken !== playToken
            );

            const finishSettled = () => {
                clearBrowserSpeechSettleWait();
                if (isStale() || controller.paused) return;

                setSpeechState(prev => {
                    if (prev.currentSegmentId !== segment.id && prev.currentSegmentIndex !== controller.currentIndex) {
                        return prev;
                    }
                    return {
                        ...prev,
                        currentSegmentId: null,
                        currentSegmentIndex: -1,
                        currentSegmentPosition: -1,
                    };
                });

                onSettled?.();
            };

            const checkSettled = () => {
                controller.settleTimer = null;
                controller.settleRaf = null;

                if (isStale()) return;

                // 暂停期间不要推进下一句。保持一个低频检查，恢复后继续等待收尾稳定。
                if (controller.paused) {
                    controller.settleTimer = window.setTimeout(checkSettled, 120);
                    return;
                }

                const elapsedFromStart = Date.now() - utteranceStartedAt;
                const elapsedFromEnd = Date.now() - waitStartedAt;
                const reachedMinDuration = elapsedFromStart >= minDurationMs;
                const forcedSettled = elapsedFromEnd >= BROWSER_SPEECH_MAX_SETTLE_WAIT_MS;
                const isIdle = !synthesis.speaking && !synthesis.pending;

                stableIdleFrames = isIdle ? stableIdleFrames + 1 : 0;

                if (reachedMinDuration && (stableIdleFrames >= BROWSER_SPEECH_IDLE_FRAME_COUNT || forcedSettled)) {
                    controller.settleTimer = window.setTimeout(finishSettled, tailGapMs);
                    return;
                }

                controller.settleRaf = window.requestAnimationFrame(checkSettled);
            };

            checkSettled();
        };

        const schedulePlayNext = (delay = BROWSER_SPEECH_MIN_GAP_MS) => {
            if (controller.cancelled || speechControllerRef.current.requestId !== requestId) return;
            clearBrowserSpeechSettleWait();
            if (controller.speakTimer) window.clearTimeout(controller.speakTimer);
            controller.speakTimer = window.setTimeout(() => {
                controller.speakTimer = null;
                playNext();
            }, Math.max(0, delay));
        };

        const playNext = () => {
            if (controller.cancelled || controller.paused || speechControllerRef.current.requestId !== requestId) return;
            if (controller.nextIndex >= segments.length) {
                finish();
                return;
            }

            const segmentIndex = controller.nextIndex;
            const segment = segments[segmentIndex];
            const utteranceText = buildBrowserUtteranceText(segment);

            if (!utteranceText) {
                controller.nextIndex = segmentIndex + 1;
                schedulePlayNext(0);
                return;
            }

            const playToken = (controller.playToken || 0) + 1;
            controller.playToken = playToken;
            controller.currentIndex = segmentIndex;
            controller.nextIndex = segmentIndex + 1;

            const utterance = new SpeechSynthesisUtterance(utteranceText);
            utterance.lang = controller.lang;
            utterance.rate = normalizeSpeechRate(controller.rate);
            utterance.pitch = Math.min(Math.max(controller.pitch, 0), 2);
            utterance.volume = Number.isFinite(controller.volume) ? Math.min(Math.max(controller.volume, 0), 1) : 1;

            const voice = findBrowserSpeechVoice(speechConfig);
            if (voice) utterance.voice = voice;

            controller.currentUtterance = utterance;
            controller.utteranceKeepAlive = [...(controller.utteranceKeepAlive || []), utterance].slice(-4);
            let utteranceStartedAt = Date.now();

            const markSegmentPlaying = () => {
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken) return;
                setSpeechState(prev => ({
                    ...prev,
                    status: controller.paused ? 'paused' : 'playing',
                    currentSegmentId: segment.id,
                    currentSegmentIndex: segmentIndex,
                    currentSegmentPosition: segmentIndex,
                    rate: normalizeSpeechRate(controller.rate),
                }));
            };

            utterance.onstart = () => {
                utteranceStartedAt = Date.now();
                markSegmentPlaying();
            };

            utterance.onend = () => {
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken) return;
                releaseFinishedUtteranceLater(utterance);

                waitForBrowserSpeechSettled(segment, utteranceStartedAt, playToken, () => {
                    schedulePlayNext(0);
                });
            };

            utterance.onerror = (event) => {
                clearBrowserSpeechSettleWait();
                releaseFinishedUtteranceLater(utterance);
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken || event?.error === 'interrupted' || event?.error === 'canceled') return;
                toast.error(t('speech_play_error', {message: event?.error || t('unknown_error')}));
                cancelActiveSpeech(false);
            };

            try {
                // Safari/Chrome 的 cancel/pause 状态有时会残留；播放前恢复一次，减少新 utterance 被静默入队或跳过。
                synthesis.resume?.();
                synthesis.speak(utterance);
                // 少数实现 onstart 不稳定；兜底也必须确认浏览器已经处于 speaking，避免 UI 比真实声音提前切段。
                window.setTimeout(() => {
                    if (controller.currentUtterance === utterance && synthesis.speaking) {
                        markSegmentPlaying();
                    }
                }, 160);
            } catch (error) {
                releaseFinishedUtteranceLater(utterance);
                toast.error(t('speech_play_error', {message: error?.message || t('unknown_error')}));
                cancelActiveSpeech(false);
            }
        };

        controller.playNext = () => schedulePlayNext(0);
        emitBrowserSpeakMessage({startSegmentPosition: safeStartPosition, restartReason});
        controller.playFrom = (targetIndex) => {
            if (controller.cancelled || speechControllerRef.current.requestId !== requestId) return false;

            const nextIndex = Math.min(Math.max(Number(targetIndex) || 0, 0), Math.max(segments.length - 1, 0));
            controller.paused = false;
            controller.nextIndex = nextIndex;
            controller.currentIndex = -1;
            // 让旧 utterance 的 onend/onerror 失效，避免 cancel 后又触发顺序播放。
            controller.playToken = (controller.playToken || 0) + 1;

            setSpeechState(prev => ({
                ...prev,
                status: 'loading',
                currentSegmentId: null,
                currentSegmentIndex: -1,
                currentSegmentPosition: -1,
                rate: normalizeSpeechRate(controller.rate),
            }));

            if (controller.speakTimer) {
                window.clearTimeout(controller.speakTimer);
                controller.speakTimer = null;
            }
            if (controller.releaseTimer) {
                window.clearTimeout(controller.releaseTimer);
                controller.releaseTimer = null;
            }
            clearBrowserSpeechSettleWait();
            controller.currentUtterance = null;
            controller.utteranceKeepAlive = [];

            synthesis.cancel();
            synthesis.resume?.();
            emitBrowserSpeakMessage({startSegmentPosition: nextIndex, restartReason: 'seek'});
            schedulePlayNext(BROWSER_SPEECH_CANCEL_COOLDOWN_MS);
            return true;
        };

        // 某些浏览器语音列表延迟加载；先触发一次，再给系统 TTS 一个很短的冷却时间后播放。
        synthesis.getVoices?.();
        synthesis.resume?.();
        schedulePlayNext(BROWSER_SPEECH_MIN_GAP_MS);
        return true;
    }, [cancelActiveSpeech, chatMarkId, findBrowserSpeechVoice, normalizeSpeechRate, resetSpeechState, selectedModel?.id, t]);

    const requestBackendSpeech = useCallback(({
                                                  messageId,
                                                  requestId,
                                                  segments,
                                                  engine,
                                                  speechConfig,
                                                  startSegmentPosition = 0,
                                                  restartReason = null,
                                              }) => {
        cancelActiveSpeech(false);

        const safeStartPosition = Number.isInteger(Number(startSegmentPosition))
            ? Math.min(Math.max(Number(startSegmentPosition), 0), Math.max((segments?.length || 1) - 1, 0))
            : 0;
        const rate = normalizeSpeechRate(speechConfig.rate ?? speechConfig.speakRate ?? 1);
        const backendOptions = {
            ...speechConfig,
            rate,
            startSegmentPosition: safeStartPosition,
            restartReason,
        };

        speechControllerRef.current = {
            requestId,
            engine,
            cancelled: false,
            paused: false,
            rate,
            segments,
            speechConfig,
            currentIndex: -1,
            startSegmentPosition: safeStartPosition,
            playToken: 0,
        };

        backendSpeechAudioRef.current = {
            ...createBackendSpeechAudioState(),
            requestId,
            messageId,
            engine,
            generatedSegmentPositions: new Set(),
            bufferedSegmentPositions: new Set(),
            playedSegmentPositions: new Set(),
            generatedCount: 0,
            bufferedCount: 0,
            playedCount: 0,
            totalSegments: segments?.length || 0,
            startSegmentPosition: safeStartPosition,
            nextPlaybackPosition: safeStartPosition,
            playingSegmentPosition: -1,
            readySegmentsByPosition: new Map(),
            readySegmentIds: new Set(),
        };

        setSpeechState({
            status: 'loading',
            messageId,
            requestId,
            engine,
            segments,
            currentSegmentId: null,
            currentSegmentIndex: -1,
            currentSegmentPosition: -1,
            rate,
            generationStatus: 'generating',
            generationPhase: 'queued',
            generatedSegmentCount: 0,
            bufferedSegmentCount: 0,
            playedSegmentCount: 0,
            totalSegments: segments?.length || 0,
            generatedSegmentPosition: -1,
            bufferedSegmentPosition: -1,
            playbackStatus: 'waiting',
            playbackSegmentPosition: -1,
            generationPercent: 0,
            bufferPercent: 0,
            playbackPercent: 0,
        });

        emitEvent({
            type: 'speech',
            target: 'TTS',
            payload: {
                command: 'Speak-Message',
                requestId,
                msgId: messageId,
                messageId,
                engine,
                model: selectedModel?.id,
                options: backendOptions,
                segments,
                startSegmentPosition: safeStartPosition,
                restartReason,
            },
            markId: chatMarkId,
        });
    }, [cancelActiveSpeech, chatMarkId, normalizeSpeechRate, selectedModel?.id]);

    const resolveSpeechSegmentPosition = useCallback((segments = [], locator = {}) => {
        if (!Array.isArray(segments) || segments.length === 0) return -1;

        const explicitPosition = locator?.segmentPosition;
        if (explicitPosition !== undefined && explicitPosition !== null && explicitPosition !== '') {
            const parsedPosition = Number(explicitPosition);
            if (Number.isInteger(parsedPosition) && parsedPosition >= 0 && parsedPosition < segments.length) {
                return parsedPosition;
            }
        }

        const segmentId = locator?.segmentId;
        if (segmentId !== undefined && segmentId !== null && segmentId !== '') {
            return segments.findIndex(item => String(item?.id) === String(segmentId));
        }

        return -1;
    }, []);

    const seekSpeechSegment = useCallback((directionOrLocator, options = {}) => {
        const currentController = speechControllerRef.current;
        const currentSpeech = speechStateRef.current;

        if (!currentController?.requestId || !currentSpeech || !['loading', 'playing', 'paused'].includes(currentSpeech.status)) {
            return false;
        }

        const segments = currentController.segments || currentSpeech.segments || [];
        if (!Array.isArray(segments) || segments.length === 0) return false;

        const isLocatorObject = directionOrLocator && typeof directionOrLocator === 'object';
        const isAbsolute = options.absolute === true || isLocatorObject;
        const backendState = backendSpeechAudioRef.current;

        let currentPosition = resolveSpeechSegmentPosition(segments, {
            segmentPosition: currentSpeech.currentSegmentPosition,
            segmentId: currentSpeech.currentSegmentId || backendState?.currentSegmentId,
        });

        if (currentPosition < 0) {
            currentPosition = resolveSpeechSegmentPosition(segments, {
                segmentPosition: backendState?.currentSegmentPosition,
                segmentId: backendState?.currentSegmentId,
            });
        }

        if (currentPosition < 0 && Number.isInteger(currentController.currentIndex) && currentController.currentIndex >= 0) {
            currentPosition = Math.min(currentController.currentIndex, segments.length - 1);
        }

        if (currentPosition < 0) currentPosition = 0;

        let targetPosition;
        if (isAbsolute) {
            targetPosition = resolveSpeechSegmentPosition(segments, isLocatorObject
                ? {segmentPosition: directionOrLocator.segmentPosition, segmentId: directionOrLocator.segmentId}
                : {segmentPosition: directionOrLocator});
            if (targetPosition < 0 && typeof directionOrLocator === 'number') {
                targetPosition = Math.min(Math.max(directionOrLocator, 0), segments.length - 1);
            }
        } else {
            const direction = Number(directionOrLocator);
            targetPosition = currentPosition + (Number.isFinite(direction) ? direction : 0);
        }

        targetPosition = Math.min(Math.max(targetPosition, 0), segments.length - 1);
        const targetSegment = segments[targetPosition];
        if (!targetSegment) return false;

        if (currentController.engine === 'browser') {
            if (typeof currentController.playFrom !== 'function') return false;
            return currentController.playFrom(targetPosition);
        }

        // 后端 TTS 跳句采用“硬重启”模式：直接清空本地旧音频、生成新 requestId，
        // 后端收到新的 Speak-Message 后会取消旧流，并从 startSegmentPosition 重新合成。
        resetBackendSpeechPlaybackQueue({stopAudio: true, clearChunks: true, bumpEpoch: true});
        const newRequestId = generateUUID();
        const direction = !isAbsolute && typeof directionOrLocator === 'number' ? directionOrLocator : 0;
        const speechConfig = {
            ...(currentController.speechConfig || {}),
            rate: currentSpeech.rate ?? currentController.rate ?? 1,
        };

        requestBackendSpeech({
            messageId: currentSpeech.messageId,
            requestId: newRequestId,
            segments,
            engine: currentController.engine,
            speechConfig,
            startSegmentPosition: targetPosition,
            restartReason: direction < 0 ? 'previous' : (direction > 0 ? 'next' : 'seek'),
        });

        return true;
    }, [requestBackendSpeech, resetBackendSpeechPlaybackQueue, resolveSpeechSegmentPosition]);


    const updateSpeechRate = useCallback((value) => {
        const nextRate = normalizeSpeechRate(value);
        const currentController = speechControllerRef.current;
        const currentSpeech = speechStateRef.current;

        if (!currentController?.requestId || !currentSpeech || !['loading', 'playing', 'paused'].includes(currentSpeech.status)) {
            setSpeechState(prev => ({
                ...prev,
                rate: nextRate,
            }));
            return true;
        }

        const segments = currentController.segments || currentSpeech.segments || [];
        if (!Array.isArray(segments) || segments.length === 0) {
            setSpeechState(prev => ({...prev, rate: nextRate}));
            return false;
        }

        const backendState = backendSpeechAudioRef.current;
        let restartPosition = resolveSpeechSegmentPosition(segments, {
            segmentPosition: currentSpeech.currentSegmentPosition,
            segmentId: currentSpeech.currentSegmentId || backendState?.currentSegmentId,
        });

        if (restartPosition < 0) {
            restartPosition = resolveSpeechSegmentPosition(segments, {
                segmentPosition: backendState?.currentSegmentPosition ?? backendState?.playingSegmentPosition,
                segmentId: backendState?.currentSegmentId,
            });
        }

        if (restartPosition < 0 && Number.isInteger(backendState?.nextPlaybackPosition)) {
            restartPosition = Math.min(Math.max(backendState.nextPlaybackPosition, 0), segments.length - 1);
        }

        if (restartPosition < 0 && Number.isInteger(currentController.currentIndex) && currentController.currentIndex >= 0) {
            restartPosition = Math.min(currentController.currentIndex, segments.length - 1);
        }

        if (restartPosition < 0) {
            restartPosition = Math.min(Math.max(Number(currentController.startSegmentPosition) || 0, 0), segments.length - 1);
        }

        const nextSpeechConfig = {
            ...(currentController.speechConfig || {}),
            rate: nextRate,
            speakRate: nextRate,
        };
        const messageId = currentSpeech.messageId;
        const engine = currentController.engine || currentSpeech.engine || 'browser';
        const wasPaused = currentController.paused || currentSpeech.status === 'paused';

        // 速率变化采用硬重启：旧音频的速度、时长、已缓存队列都不再可信，必须丢弃并重合成。
        // 这样不会出现前端 Audio.playbackRate 与后端 TTS 真实语速不一致的问题。
        cancelActiveSpeech(true);

        const newRequestId = generateUUID();
        if (engine === 'browser') {
            const success = speakWithBrowser({
                messageId,
                requestId: newRequestId,
                segments,
                speechConfig: nextSpeechConfig,
                startSegmentPosition: restartPosition,
                restartReason: 'rate-change',
            });
            if (success && wasPaused) {
                window.setTimeout(() => pauseActiveSpeech(), 0);
            }
            return success;
        }

        requestBackendSpeech({
            messageId,
            requestId: newRequestId,
            segments,
            engine,
            speechConfig: nextSpeechConfig,
            startSegmentPosition: restartPosition,
            restartReason: 'rate-change',
        });

        if (wasPaused) {
            window.setTimeout(() => pauseActiveSpeech(), 0);
        }
        return true;
    }, [
        cancelActiveSpeech,
        normalizeSpeechRate,
        pauseActiveSpeech,
        requestBackendSpeech,
        resolveSpeechSegmentPosition,
        speakWithBrowser,
    ]);

    const getSpeechBoundSegmentPositions = useCallback((element) => {
        if (!element || typeof element.getAttribute !== 'function') return [];

        const rawIndexes = element.getAttribute(SPEECH_SEGMENT_BOUND_INDEXES_ATTR) ||
            element.getAttribute(SPEECH_SEGMENT_BOUND_INDEX_ATTR) ||
            '';

        return rawIndexes
            .split(SPEECH_BOUNDARY_TOKEN)
            .map(value => Number(value))
            .filter(value => Number.isInteger(value) && value >= 0);
    }, []);

    const findSpeechSeekBoundElement = useCallback((target, boundary) => {
        if (!(target instanceof Element)) return null;

        let element = target;
        while (element) {
            if (element.getAttribute?.(SPEECH_SEGMENT_BINDING_ATTR) === 'true') {
                return element;
            }

            if (boundary && element === boundary) break;
            element = element.parentElement;
        }

        return null;
    }, []);

    const handleSpeechTextClick = useCallback((event, msgId) => {
        const currentSpeech = speechStateRef.current;
        if (currentSpeech?.messageId !== msgId || !isActiveSpeechStatus(currentSpeech?.status)) return false;

        const target = event?.target;
        if (!(target instanceof Element)) return false;

        // 朗读模式下，文本点击用于选择朗读进度；但不拦截真正的控件点击。
        if (target.closest?.('button, input, textarea, select, [role="button"], [data-message-avatar-trigger="true"], [data-radix-popper-content-wrapper]')) {
            return false;
        }

        const container = messagesContainerRef.current;
        if (!container) return false;

        // 先重建当前消息的段落映射，确保重复段落/列表项也按 DOM 顺序绑定到正确进度。
        rebuildSpeechSegmentElementMap(container, currentSpeech);

        const messageElement = getSpeechMessageElement(container, msgId) || target.closest?.('[data-tts-message-id]') || container;
        const boundElement = findSpeechSeekBoundElement(target, messageElement);
        const boundPositions = getSpeechBoundSegmentPositions(boundElement);
        if (boundPositions.length === 0) return false;

        // 一个段落里可能绑定多个句子。按“紫框段落”为点击主体时，跳到该段落绑定的第一句。
        const targetPosition = Math.min(...boundPositions);
        const didSeek = seekSpeechSegment({segmentPosition: targetPosition}, {absolute: true});

        if (didSeek) {
            event.preventDefault?.();
            event.stopPropagation?.();
        }

        return didSeek;
    }, [
        findSpeechSeekBoundElement,
        getSpeechBoundSegmentPositions,
        getSpeechMessageElement,
        rebuildSpeechSegmentElementMap,
        seekSpeechSegment,
    ]);

    const handleSpeakMessageRequest = useCallback((payload, reply) => {
        const messageId = payload?.msgId || payload?.messageId || payload?.value;
        if (!messageId) {
            reply?.({success: false, value: 'Missing message id'});
            return;
        }

        const currentSpeech = speechStateRef.current;
        if (
            currentSpeech?.messageId === messageId &&
            ['loading', 'playing', 'paused'].includes(currentSpeech?.status)
        ) {
            cancelActiveSpeech(true);
            reply?.({success: true});
            return;
        }

        const msg = messagesRef.current?.[messageId];
        if (!msg) {
            toast.error(t('message_not_found'));
            reply?.({success: false, value: 'Message not found'});
            return;
        }

        const segments = getSpeakableSegments(msg, messageId);
        if (segments.length === 0) {
            toast.warning(t('no_speakable_content'));
            reply?.({success: false, value: 'No speakable content'});
            return;
        }

        const speechConfig = {
            ...(payload?.options || {}),
        };
        const engine = advancedSettingsValues.speakEngine || 'browser';
        const requestId = payload?.requestId || generateUUID();

        if (engine === 'browser') {
            const success = speakWithBrowser({messageId, requestId, segments, speechConfig});
            reply?.({success});
            return;
        }

        requestBackendSpeech({messageId, requestId, segments, engine, speechConfig});
        reply?.({success: true});
    }, [advancedSettingsValues, cancelActiveSpeech, requestBackendSpeech, speakWithBrowser, t]);


    const applyBackendSpeechPlaybackSegment = useCallback((payload = {}) => {
        const segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        const segmentIndex = resolveBackendPayloadSegmentIndex(payload, getBackendSpeechSegmentIndex(payload, segmentPosition));
        const controllerSegments = speechControllerRef.current?.segments || [];
        const segmentId = resolveBackendPayloadSegmentId(payload, null);

        if (Number.isFinite(segmentPosition) && segmentPosition >= 0) {
            speechControllerRef.current.currentIndex = segmentPosition;
        }

        const total = getBackendSpeechTotalSegments(payload);
        const backendState = ensureBackendProgressSets();
        if (backendState && Number.isInteger(segmentPosition) && segmentPosition >= 0) {
            backendState.playedSegmentPositions.add(segmentPosition);
            backendState.playedCount = Math.max(backendState.playedSegmentPositions.size, backendState.playedCount || 0);
        }
        const playedCount = Number(payload.playbackCount ?? backendState?.playedCount ?? (segmentPosition >= 0 ? segmentPosition : 0));

        setSpeechState(prev => ({
            ...prev,
            status: prev.status === 'paused' ? 'paused' : 'playing',
            currentSegmentId: segmentId,
            currentSegmentIndex: segmentIndex,
            currentSegmentPosition: segmentPosition,
            playbackStatus: 'playing',
            playbackSegmentPosition: segmentPosition,
            playedSegmentCount: Math.max(prev.playedSegmentCount || 0, playedCount),
            totalSegments: total || prev.totalSegments || controllerSegments.length,
            playbackPercent: normalizeProgressPercent(payload.playbackPercent, playedCount, total || prev.totalSegments || controllerSegments.length),
            rate: normalizeSpeechRate(payload.rate ?? prev.rate ?? 1),
        }));
    }, [
        ensureBackendProgressSets,
        getBackendSpeechTotalSegments,
        normalizeProgressPercent,
        normalizeSpeechRate,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentIndex,
        resolveBackendPayloadSegmentPosition,
    ]);

    const finishBackendSpeechPlayback = useCallback((requestId) => {
        setSpeechState(prev => ({
            ...prev,
            status: 'ended',
            playbackStatus: 'ended',
            playbackPercent: prev.totalSegments > 0 ? 1 : prev.playbackPercent,
            currentSegmentId: null,
            currentSegmentIndex: -1,
            currentSegmentPosition: -1,
        }));

        window.setTimeout(() => {
            if (speechControllerRef.current.requestId === requestId) {
                speechControllerRef.current = {
                    requestId: null,
                    engine: null,
                    cancelled: false,
                    playToken: 0,
                };
                clearBackendSpeechAudio({stopAudio: false});
                resetSpeechState();
            }
        }, 300);
    }, [clearBackendSpeechAudio, resetSpeechState]);

    const playNextBackendSpeechSegment = useCallback(() => {
        const backendState = backendSpeechAudioRef.current;
        const controller = speechControllerRef.current;
        const requestId = backendState?.requestId;

        if (!requestId || backendState.cancelled || controller.requestId !== requestId) return;
        if (backendState.playing || controller.paused || speechStateRef.current?.status === 'paused') return;

        const queueState = ensureBackendPlaybackQueueState();
        if (!queueState) return;

        const nextPosition = queueState.nextPlaybackPosition;
        const nextItem = queueState.readySegmentsByPosition.get(nextPosition);

        // 严格按播放游标消费：后面的句子即使已缓存，也只能等待前一句真实播放结束。
        // 这样 generated/buffered progress 不会驱动 playback currentSegment 跳进度。
        if (!nextItem) {
            const total = getBackendSpeechTotalSegments({requestId});
            const laterReadyPositions = Array.from(queueState.readySegmentsByPosition.keys())
                .map(Number)
                .filter(position => Number.isInteger(position) && position > nextPosition)
                .sort((left, right) => left - right);

            // 不再自动跳过缺失 position。
            // 如果后端明确发送了 chunkCount=0 的 Speech-Segment-Ready，前端会入队一个极短静音段，
            // 让游标仍然通过 audio.onended 推进；如果这里仍然缺失，说明对应 position 的 Ready/Chunk 都没有正确进入队列，
            // 继续等待并保留日志，避免从 0 直接跳到 2 造成“不是按播放完成切换”的表现。
            if (backendState.generationEnded && nextPosition >= total) {
                finishBackendSpeechPlayback(requestId);
            }
            return;
        }

        queueState.readySegmentsByPosition.delete(nextPosition);

        const audio = new Audio(nextItem.audioUrl);
        const rate = normalizeSpeechRate(controller.rate ?? speechStateRef.current?.rate ?? 1);
        const segmentPosition = resolveBackendPayloadSegmentPosition(nextItem, 0);
        const segmentIndex = resolveBackendPayloadSegmentIndex(nextItem, segmentPosition);
        const segmentId = resolveBackendPayloadSegmentId(nextItem, nextItem.segmentId);
        const playbackEpoch = backendState.playbackEpoch || 0;

        backendState.audio = audio;
        backendState.playing = true;
        backendState.currentSegmentId = segmentId;
        backendState.currentSegmentIndex = segmentIndex;
        backendState.currentSegmentPosition = segmentPosition;
        backendState.playingSegmentPosition = segmentPosition;
        // 后端 TTS 使用被动句子进度模式：本地 Audio 队列只负责播放音频，
        // 不写入 controller.currentIndex，避免上一句/下一句基于前端播放队列自行跳转。
        audio.playbackRate = rate;

        const cleanupCurrentAudio = ({revoke = true} = {}) => {
            try {
                if (typeof clearPlaybackTimers === 'function') clearPlaybackTimers();
            } catch (_) {
                // 清理计时器失败不影响音频释放。
            }
            if (backendState.audio === audio) {
                backendState.audio = null;
            }
            backendState.playing = false;
            backendState.currentSegmentId = null;
            backendState.currentSegmentIndex = -1;
            backendState.currentSegmentPosition = -1;
            backendState.playingSegmentPosition = -1;
            backendState.queuedIds.delete(segmentId);
            backendState.readySegmentIds?.delete?.(segmentId);

            if (revoke && nextItem.revoke !== false && nextItem.audioUrl) {
                try {
                    URL.revokeObjectURL(nextItem.audioUrl);
                } catch (_) {
                    // 忽略重复释放。
                }
                backendState.objectUrls.delete(nextItem.audioUrl);
            }
        };

        const isStalePlayback = () => (
            backendState.cancelled ||
            speechControllerRef.current.requestId !== requestId ||
            (backendState.playbackEpoch || 0) !== playbackEpoch
        );

        let playbackSegmentApplied = false;
        let highlightTimer = null;
        let highlightRaf = null;
        let highlightStartedAt = 0;
        let nextSegmentTimer = null;
        const playbackPayload = {
            requestId,
            messageId: backendState.messageId,
            msgId: backendState.messageId,
            segmentId,
            segmentIndex,
            segmentPosition,
            rate,
            source: 'frontend-audio-playback',
            playback: true,
        };

        const clearPlaybackTimers = () => {
            if (highlightTimer !== null) {
                window.clearTimeout(highlightTimer);
                highlightTimer = null;
            }
            if (highlightRaf !== null) {
                window.cancelAnimationFrame(highlightRaf);
                highlightRaf = null;
            }
            if (nextSegmentTimer !== null) {
                window.clearTimeout(nextSegmentTimer);
                nextSegmentTimer = null;
            }
        };

        const applyPlaybackSegmentWhenAudible = (source = 'unknown', options = {}) => {
            if (playbackSegmentApplied || isStalePlayback()) return false;

            const force = options.force === true;
            const allowEnded = options.allowEnded === true;
            if (!force && (audio.paused || (audio.ended && !allowEnded))) return false;

            const currentTime = Number(audio.currentTime || 0);
            const hasAudibleProgress = Number.isFinite(currentTime) && currentTime >= TTS_HIGHLIGHT_MIN_CURRENT_TIME;
            const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;

            // 不是靠固定 500ms 延迟切换，而是尽量贴着真实 currentTime；
            // 超过最大同步等待或 onended 时强制补一次，避免短句高亮被清掉。
            if (!force && !hasAudibleProgress && hasDuration && audio.duration > 0.18) {
                return false;
            }

            playbackSegmentApplied = true;
            applyBackendSpeechPlaybackSegment({
                ...playbackPayload,
                highlightSource: source,
                audioCurrentTime: currentTime,
                audioDuration: audio.duration,
            });
            return true;
        };

        const schedulePlaybackSegmentHighlight = () => {
            if (highlightTimer !== null || highlightRaf !== null || playbackSegmentApplied) return;

            highlightStartedAt = Date.now();
            const syncHighlight = () => {
                highlightRaf = null;
                if (playbackSegmentApplied || isStalePlayback()) return;

                const waitedMs = Date.now() - highlightStartedAt;
                const applied = applyPlaybackSegmentWhenAudible(
                    waitedMs >= TTS_HIGHLIGHT_MAX_SYNC_WAIT_MS ? 'sync-timeout' : 'currentTime-sync',
                    {force: waitedMs >= TTS_HIGHLIGHT_MAX_SYNC_WAIT_MS},
                );

                if (!applied && !audio.ended) {
                    highlightRaf = window.requestAnimationFrame(syncHighlight);
                }
            };

            highlightTimer = window.setTimeout(() => {
                highlightTimer = null;
                syncHighlight();
            }, TTS_HIGHLIGHT_START_DELAY_MS);
        };

        audio.onplay = () => {
            if (!isStalePlayback()) schedulePlaybackSegmentHighlight();
        };

        audio.onplaying = () => {
            if (isStalePlayback()) return;
            schedulePlaybackSegmentHighlight();
        };

        audio.ontimeupdate = () => {
            applyPlaybackSegmentWhenAudible('timeupdate');
        };

        audio.onended = () => {
            if (isStalePlayback()) return;

            // 短句可能没有触发可用的 timeupdate，也可能在启动延迟前结束。
            // 结束前先补一次当前句，避免“语音读到了，高亮还停在前一句”。
            applyPlaybackSegmentWhenAudible('ended-fallback', {force: true, allowEnded: true});
            clearPlaybackTimers();
            const total = getBackendSpeechTotalSegments({requestId});
            const backendProgressState = ensureBackendProgressSets();
            backendProgressState?.playedSegmentPositions?.add?.(segmentPosition);
            if (backendProgressState) {
                backendProgressState.playedCount = Math.max(backendProgressState.playedCount || 0, backendProgressState.playedSegmentPositions?.size || 0, segmentPosition + 1);
            }
            setSpeechState(prev => ({
                ...prev,
                playbackStatus: 'end',
                playedSegmentCount: Math.max(prev.playedSegmentCount || 0, backendProgressState?.playedCount || segmentPosition + 1),
                totalSegments: total || prev.totalSegments,
                playbackPercent: normalizeProgressPercent(null, backendProgressState?.playedCount || segmentPosition + 1, total || prev.totalSegments),
            }));

            cleanupCurrentAudio();
            backendState.nextPlaybackPosition = Math.max(backendState.nextPlaybackPosition || 0, segmentPosition + 1);
            // 给音频输出缓冲一个很短的尾音释放时间，避免下一句高亮比实际听感提前。
            nextSegmentTimer = window.setTimeout(() => {
                nextSegmentTimer = null;
                playNextBackendSpeechSegment();
            }, TTS_NEXT_SEGMENT_TAIL_DELAY_MS);
        };

        audio.onerror = () => {
            if (isStalePlayback()) return;

            cleanupCurrentAudio();
            toast.error(t('speech_play_error', {message: t('unknown_error')}));
            clearBackendSpeechAudio();
            resetSpeechState();
        };

        audio.play().then(() => {
            if (!isStalePlayback()) schedulePlaybackSegmentHighlight();
        }).catch((error) => {
            if (isStalePlayback()) return;

            cleanupCurrentAudio();
            toast.error(t('speech_play_error', {message: error?.message || t('unknown_error')}));
            clearBackendSpeechAudio();
            resetSpeechState();
        });
    }, [
        applyBackendSpeechPlaybackSegment,
        clearBackendSpeechAudio,
        finishBackendSpeechPlayback,
        ensureBackendProgressSets,
        ensureBackendPlaybackQueueState,
        getBackendSpeechTotalSegments,
        normalizeProgressPercent,
        normalizeSpeechRate,
        resetSpeechState,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentIndex,
        resolveBackendPayloadSegmentPosition,
        t,
    ]);

    const enqueueBackendSpeechSegment = useCallback((payload, audioUrl, revoke = true) => {
        const backendState = backendSpeechAudioRef.current;
        const requestId = payload?.requestId || payload?.request_id || backendState.requestId;
        const queueState = ensureBackendPlaybackQueueState();
        if (!queueState) return false;

        let segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        if (!Number.isInteger(segmentPosition) || segmentPosition < 0) {
            // 只有 payload 完全没有位置字段时才使用队列游标兜底。正常后端事件必须带 segmentPosition。
            segmentPosition = queueState.nextPlaybackPosition + queueState.readySegmentsByPosition.size;
        }
        const segmentIndex = resolveBackendPayloadSegmentIndex(payload, getBackendSpeechSegmentIndex(payload, segmentPosition));
        const segmentId = resolveBackendPayloadSegmentId(payload, `position:${segmentPosition}`);

        if (!audioUrl || !requestId || backendState.cancelled) return false;
        if (!Number.isInteger(segmentPosition) || segmentPosition < 0) return false;
        if (queueState.readySegmentsByPosition.has(segmentPosition)) return true;
        if (segmentId && queueState.readySegmentIds.has(segmentId)) return true;

        backendState.requestId = requestId;
        backendState.messageId = payload?.messageId || payload?.message_id || payload?.msgId || payload?.msg_id || backendState.messageId;
        backendState.format = normalizeBackendAudioFormat(payload);
        backendState.mime = payload?.mime || backendState.mime;
        backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
        backendState.channels = getBackendSpeechChannels(payload, backendState.channels);
        backendState.bitsPerSample = getBackendSpeechBitsPerSample(payload, backendState.bitsPerSample);
        const queueItem = {
            segmentId,
            segmentIndex,
            segmentPosition,
            audioUrl,
            revoke,
        };
        queueState.readySegmentsByPosition.set(segmentPosition, queueItem);
        queueState.readySegmentIds.add(segmentId);
        // 保留 queue 仅用于调试/兼容旧 UI，不再作为播放顺序来源。
        backendState.queue = Array.from(queueState.readySegmentsByPosition.values())
            .sort((left, right) => Number(left.segmentPosition) - Number(right.segmentPosition));
        backendState.queuedIds.add(segmentId);
        ensureBackendProgressSets()?.bufferedSegmentPositions.add(segmentPosition);
        backendState.bufferedCount = Math.max(backendState.bufferedSegmentPositions?.size || 0, backendState.bufferedCount || 0);
        if (revoke) backendState.objectUrls.add(audioUrl);

        const total = getBackendSpeechTotalSegments(payload);
        setSpeechState(prev => ({
            ...prev,
            generationStatus: prev.generationStatus === 'idle' ? 'generating' : prev.generationStatus,
            bufferedSegmentCount: Math.max(prev.bufferedSegmentCount || 0, backendState.bufferedCount || 0),
            bufferedSegmentPosition: Math.max(prev.bufferedSegmentPosition ?? -1, segmentPosition),
            totalSegments: total || prev.totalSegments,
            bufferPercent: normalizeProgressPercent(payload.bufferedPercent ?? payload.buffered_percent ?? payload.readyPercent ?? payload.ready_percent, backendState.bufferedCount || 0, total || prev.totalSegments),
        }));

        playNextBackendSpeechSegment();
        return true;
    }, [
        ensureBackendProgressSets,
        ensureBackendPlaybackQueueState,
        getBackendSpeechTotalSegments,
        normalizeProgressPercent,
        playNextBackendSpeechSegment,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentIndex,
        resolveBackendPayloadSegmentPosition,
    ]);

    const finalizeBackendSpeechSegmentFromBuffer = useCallback((readyPayload, segmentBuffer, segmentId) => {
        const backendState = backendSpeechAudioRef.current;
        if (!readyPayload || !segmentBuffer) return false;

        const payloadPosition = resolveBackendPayloadSegmentPosition(readyPayload, getBackendSpeechSegmentPosition(readyPayload, -1));
        const bufferPosition = resolveBackendPayloadSegmentPosition(segmentBuffer.payload || {}, -1);
        const segmentPosition = Number.isInteger(payloadPosition) && payloadPosition >= 0 ? payloadPosition : bufferPosition;
        const resolvedSegmentId = segmentId || resolveBackendPayloadSegmentId(
            readyPayload,
            Number.isInteger(segmentPosition) && segmentPosition >= 0 ? `position:${segmentPosition}` : getBackendSpeechSegmentId(readyPayload),
        );

        const mergedPayload = {
            ...segmentBuffer.payload,
            ...readyPayload,
            segmentId: resolvedSegmentId,
            segmentPosition: Number.isInteger(segmentPosition) && segmentPosition >= 0 ? segmentPosition : segmentBuffer.payload.segmentPosition,
            segmentIndex: resolveBackendPayloadSegmentIndex(readyPayload, segmentBuffer.payload.segmentIndex ?? segmentPosition),
            sampleRate: getBackendSpeechSampleRate(readyPayload, backendState.sampleRate),
            channels: getBackendSpeechChannels(readyPayload, backendState.channels),
            bitsPerSample: getBackendSpeechBitsPerSample(readyPayload, backendState.bitsPerSample),
        };
        const chunkEntries = Array.from(segmentBuffer.chunks.entries())
            .sort(([left], [right]) => Number(left) - Number(right));
        const chunkCount = Number(readyPayload.chunkCount ?? readyPayload.chunk_count ?? chunkEntries.length);

        if (Number.isFinite(chunkCount) && chunkCount > 0 && chunkEntries.length < chunkCount) {
            // 分片还没齐时继续等待；不要把 Ready 丢掉。
            return false;
        }

        if (chunkEntries.length === 0 && (!Number.isFinite(chunkCount) || chunkCount <= 0)) {
            // 该段 Ready 已到，但没有任何音频分片。不要生成静音占位，也不要跳过；
            // 保留 pending ready，继续等待真实 Speech-Audio-Chunk。
            const queueState = ensureBackendPlaybackQueueState();
            if (Number.isInteger(segmentPosition) && segmentPosition >= 0) {
                queueState?.pendingReadyByPosition?.set?.(segmentPosition, readyPayload);
            }
            if (resolvedSegmentId) {
                queueState?.pendingReadyById?.set?.(resolvedSegmentId, readyPayload);
            }
            return false;
        }

        try {
            const byteArrays = chunkEntries.map(([, audio]) => decodeBase64ToUint8Array(audio));
            const blob = createBackendSpeechBlob(byteArrays, mergedPayload);
            const audioUrl = URL.createObjectURL(blob);
            backendState.chunks.delete(resolvedSegmentId);
            const queueState = ensureBackendPlaybackQueueState();
            queueState?.pendingReadyByPosition?.delete?.(mergedPayload.segmentPosition);
            queueState?.pendingReadyById?.delete?.(resolvedSegmentId);
            return enqueueBackendSpeechSegment(mergedPayload, audioUrl, true);
        } catch (error) {
            backendState.chunks.delete(resolvedSegmentId);
            toast.error(t('speech_play_error', {message: error?.message || t('unknown_error')}));
            return false;
        }
    }, [
        enqueueBackendSpeechSegment,
        ensureBackendPlaybackQueueState,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentIndex,
        resolveBackendPayloadSegmentPosition,
        t,
    ]);

    const handleBackendSpeechAudioChunk = useCallback((payload) => {
        if (!payload?.audio) return false;

        const backendState = backendSpeechAudioRef.current;
        const segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        const segmentIndex = resolveBackendPayloadSegmentIndex(payload, getBackendSpeechSegmentIndex(payload, segmentPosition));
        const segmentId = resolveBackendPayloadSegmentId(payload, Number.isInteger(segmentPosition) && segmentPosition >= 0 ? `position:${segmentPosition}` : getBackendSpeechSegmentId(payload));
        if (!segmentId) return false;
        let segmentBuffer = backendState.chunks.get(segmentId);

        if (!segmentBuffer) {
            segmentBuffer = {
                chunks: new Map(),
                payload: {},
            };
            backendState.chunks.set(segmentId, segmentBuffer);
        }

        const chunkIndex = Number(payload.chunkIndex ?? payload.chunk_index ?? segmentBuffer.chunks.size);
        segmentBuffer.chunks.set(Number.isFinite(chunkIndex) ? chunkIndex : segmentBuffer.chunks.size, payload.audio);
        segmentBuffer.payload = {
            ...segmentBuffer.payload,
            ...payload,
            segmentId,
            segmentIndex,
            segmentPosition,
        };

        const queueState = ensureBackendPlaybackQueueState();
        const pendingReady = (Number.isInteger(segmentPosition) && segmentPosition >= 0
            ? queueState?.pendingReadyByPosition?.get?.(segmentPosition)
            : null) || queueState?.pendingReadyById?.get?.(segmentId);

        if (pendingReady) {
            finalizeBackendSpeechSegmentFromBuffer(pendingReady, segmentBuffer, segmentId);
        }

        backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
        backendState.format = normalizeBackendAudioFormat(payload);
        backendState.mime = payload.mime || backendState.mime;
        return true;
    }, [
        ensureBackendPlaybackQueueState,
        finalizeBackendSpeechSegmentFromBuffer,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentIndex,
        resolveBackendPayloadSegmentPosition,
    ]);

    const handleBackendSpeechSegmentReady = useCallback((payload) => {
        const backendState = backendSpeechAudioRef.current;
        const queueState = ensureBackendPlaybackQueueState();
        const segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        let segmentId = resolveBackendPayloadSegmentId(payload, Number.isInteger(segmentPosition) && segmentPosition >= 0 ? `position:${segmentPosition}` : getBackendSpeechSegmentId(payload));
        let segmentBuffer = backendState.chunks.get(segmentId);

        if (!segmentBuffer && Number.isInteger(segmentPosition) && segmentPosition >= 0) {
            for (const [candidateId, candidateBuffer] of backendState.chunks.entries()) {
                const candidatePosition = resolveBackendPayloadSegmentPosition(candidateBuffer?.payload || {}, -1);
                if (candidatePosition === segmentPosition) {
                    segmentId = candidateId;
                    segmentBuffer = candidateBuffer;
                    break;
                }
            }
        }

        if (!segmentBuffer) {
            const explicitChunkCount = Number(payload.chunkCount ?? payload.chunk_count);
            const explicitByteLength = Number(payload.byteLength ?? payload.byte_length ?? payload.audioByteLength ?? payload.audio_byte_length);

            // Ready 可能先于 Audio-Chunk 到达；即使后端当前声明 chunkCount=0，
            // 也不能造静音占位或跳过该句。正确行为是保留 pending ready，
            // 等待真实 Speech-Audio-Chunk。若后端确实漏发音频，播放队列应停在该句，
            // 这样问题能被暴露出来，而不是跳句掩盖。
            if (Number.isInteger(segmentPosition) && segmentPosition >= 0) {
                queueState?.pendingReadyByPosition?.set?.(segmentPosition, payload);
            }
            if (segmentId) {
                queueState?.pendingReadyById?.set?.(segmentId, payload);
            }
            return true;
        }

        return finalizeBackendSpeechSegmentFromBuffer(payload, segmentBuffer, segmentId);
    }, [
        ensureBackendPlaybackQueueState,
        finalizeBackendSpeechSegmentFromBuffer,
        resolveBackendPayloadSegmentId,
        resolveBackendPayloadSegmentPosition,
    ]);

    const handleBackendSpeechGenerationProgress = useCallback((payload = {}) => {
        const backendState = ensureBackendProgressSets();
        const segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        if (backendState && Number.isInteger(segmentPosition) && segmentPosition >= 0) {
            backendState.generatedSegmentPositions.add(segmentPosition);
            if (payload.phase === 'segment_ready' || payload.phase === 'ready') {
                backendState.bufferedSegmentPositions.add(segmentPosition);
            }
        }

        const total = getBackendSpeechTotalSegments(payload);
        const generatedCount = Number(payload.generatedCount ?? backendState?.generatedSegmentPositions?.size ?? 0);
        const readyCount = Number(payload.readyCount ?? backendState?.bufferedSegmentPositions?.size ?? 0);
        if (backendState) {
            backendState.generatedCount = Math.max(backendState.generatedCount || 0, generatedCount);
            backendState.bufferedCount = Math.max(backendState.bufferedCount || 0, readyCount);
        }

        setSpeechState(prev => ({
            ...prev,
            generationStatus: payload.phase === 'end' ? 'ended' : 'generating',
            generationPhase: payload.phase || prev.generationPhase,
            generatedSegmentCount: Math.max(prev.generatedSegmentCount || 0, backendState?.generatedCount || generatedCount || 0),
            bufferedSegmentCount: Math.max(prev.bufferedSegmentCount || 0, backendState?.bufferedCount || readyCount || 0),
            totalSegments: total || prev.totalSegments,
            generatedSegmentPosition: Math.max(prev.generatedSegmentPosition ?? -1, segmentPosition),
            generationPercent: normalizeProgressPercent(payload.generatedPercent ?? payload.generated_percent, backendState?.generatedCount || generatedCount || 0, total || prev.totalSegments),
            bufferPercent: normalizeProgressPercent(payload.readyPercent ?? payload.ready_percent, backendState?.bufferedCount || readyCount || 0, total || prev.totalSegments),
        }));
        return true;
    }, [ensureBackendProgressSets, getBackendSpeechTotalSegments, normalizeProgressPercent, resolveBackendPayloadSegmentPosition]);

    const handleBackendSpeechBufferProgress = useCallback((payload = {}) => {
        const backendState = ensureBackendProgressSets();
        const segmentPosition = resolveBackendPayloadSegmentPosition(payload, getBackendSpeechSegmentPosition(payload, -1));
        if (backendState && Number.isInteger(segmentPosition) && segmentPosition >= 0) {
            backendState.bufferedSegmentPositions.add(segmentPosition);
            backendState.bufferedCount = Math.max(backendState.bufferedCount || 0, backendState.bufferedSegmentPositions.size);
        }

        const total = getBackendSpeechTotalSegments(payload);
        const bufferedCount = Number(payload.bufferedCount ?? payload.readyCount ?? backendState?.bufferedCount ?? 0);
        if (backendState) backendState.bufferedCount = Math.max(backendState.bufferedCount || 0, bufferedCount);

        setSpeechState(prev => ({
            ...prev,
            bufferedSegmentCount: Math.max(prev.bufferedSegmentCount || 0, backendState?.bufferedCount || bufferedCount || 0),
            bufferedSegmentPosition: Math.max(prev.bufferedSegmentPosition ?? -1, segmentPosition),
            totalSegments: total || prev.totalSegments,
            bufferPercent: normalizeProgressPercent(payload.bufferedPercent ?? payload.buffered_percent ?? payload.readyPercent ?? payload.ready_percent, backendState?.bufferedCount || bufferedCount || 0, total || prev.totalSegments),
        }));
        return true;
    }, [ensureBackendProgressSets, getBackendSpeechTotalSegments, normalizeProgressPercent, resolveBackendPayloadSegmentPosition]);

    const handleBackendSpeechEvent = useCallback((payload, reply) => {
        const requestId = payload?.requestId || payload?.request_id;
        if (requestId && speechControllerRef.current.requestId && requestId !== speechControllerRef.current.requestId) {
            reply?.({success: false, value: 'Speech request id mismatch'});
            return;
        }

        switch (payload?.command) {
            case 'Speech-Start': {
                const requestId = payload.requestId || payload.request_id || speechControllerRef.current.requestId;
                const messageId = payload.messageId || payload.message_id || payload.msgId || payload.msg_id || speechStateRef.current?.messageId;
                const backendState = backendSpeechAudioRef.current;
                backendState.requestId = requestId || backendState.requestId;
                backendState.messageId = messageId || backendState.messageId;
                backendState.engine = payload.engine || backendState.engine;
                backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
                backendState.channels = getBackendSpeechChannels(payload, backendState.channels);
                backendState.bitsPerSample = getBackendSpeechBitsPerSample(payload, backendState.bitsPerSample);
                backendState.format = normalizeBackendAudioFormat(payload);
                backendState.mime = payload.mime || backendState.mime;
                const payloadStartPosition = Number(payload.startSegmentPosition ?? payload.start_segment_position ?? payload.startPosition ?? payload.start_position);
                if (Number.isInteger(payloadStartPosition) && payloadStartPosition >= 0) {
                    backendState.startSegmentPosition = payloadStartPosition;
                    if (!Number.isInteger(backendState.nextPlaybackPosition) || backendState.nextPlaybackPosition < payloadStartPosition) {
                        backendState.nextPlaybackPosition = payloadStartPosition;
                    }
                }
                ensureBackendPlaybackQueueState();

                const total = getBackendSpeechTotalSegments(payload);
                setSpeechState(prev => ({
                    ...prev,
                    status: 'loading',
                    requestId: requestId || prev.requestId,
                    messageId: messageId || prev.messageId,
                    generationStatus: 'generating',
                    generationPhase: 'start',
                    playbackStatus: 'waiting',
                    totalSegments: total || prev.totalSegments,
                    generationPercent: 0,
                    bufferPercent: 0,
                    playbackPercent: 0,
                    rate: normalizeSpeechRate(payload.rate ?? prev.rate ?? 1),
                }));
                reply?.({success: true});
                break;
            }
            case 'Speech-Paused': {
                speechControllerRef.current.paused = true;
                const backendAudio = backendSpeechAudioRef.current?.audio;
                if (backendAudio && !backendAudio.paused) backendAudio.pause();
                setSpeechState(prev => ({...prev, status: 'paused'}));
                reply?.({success: true});
                break;
            }
            case 'Speech-Resumed': {
                speechControllerRef.current.paused = false;
                const backendAudio = backendSpeechAudioRef.current?.audio;
                if (backendAudio && backendAudio.paused) {
                    backendAudio.play?.().catch?.(() => {});
                } else {
                    playNextBackendSpeechSegment();
                }
                setSpeechState(prev => ({...prev, status: 'playing'}));
                reply?.({success: true});
                break;
            }
            case 'Speech-Generation-Progress':
                reply?.({success: handleBackendSpeechGenerationProgress(payload)});
                break;
            case 'Speech-Buffer-Progress':
                reply?.({success: handleBackendSpeechBufferProgress(payload)});
                break;
            case 'Speech-End':
                backendSpeechAudioRef.current.generationEnded = true;
                setSpeechState(prev => ({
                    ...prev,
                    generationStatus: 'ended',
                    generationPhase: 'end',
                    generationPercent: prev.totalSegments > 0 ? 1 : prev.generationPercent,
                }));
                playNextBackendSpeechSegment();
                reply?.({success: true});
                break;
            case 'Speech-Cancelled':
                cancelActiveSpeech(false);
                reply?.({success: true});
                break;
            case 'Speech-Error':
                toast.error(t('speech_play_error', {message: payload.value || payload.message || t('unknown_error')}));
                cancelActiveSpeech(false);
                reply?.({success: true});
                break;
            case 'Speech-Audio-Chunk':
                reply?.({success: handleBackendSpeechAudioChunk(payload)});
                break;
            case 'Speech-Segment-Ready':
                reply?.({success: handleBackendSpeechSegmentReady(payload)});
                break;
            default:
                reply?.({success: true, value: 'Unknown speech event ignored'});
        }
    }, [
        applyBackendSpeechPlaybackSegment,
        cancelActiveSpeech,
        ensureBackendPlaybackQueueState,
        handleBackendSpeechAudioChunk,
        handleBackendSpeechBufferProgress,
        handleBackendSpeechGenerationProgress,
        handleBackendSpeechSegmentReady,
        getBackendSpeechTotalSegments,
        normalizeSpeechRate,
        playNextBackendSpeechSegment,
        t,
    ]);
    return {
        speechState,
        speechAutoFollowEnabled,
        speechFollowProgrammaticScrollUntilRef,
        handleSpeechAutoFollowToggle,
        handleSpeechTextClick,
        handleSpeakMessageRequest,
        handleBackendSpeechEvent,
        cancelActiveSpeech,
        pauseActiveSpeech,
        resumeActiveSpeech,
        updateSpeechRate,
        seekSpeechSegment,
        disableSpeechAutoFollowByUser,
    };
}
