import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useImmer} from 'use-immer';
import {produce} from 'immer';
import {generateUUID, useIsMobile} from '@/lib/tools.jsx';
import {toast} from 'sonner';
import {motion} from 'framer-motion';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';
import {useTranslation} from 'react-i18next';
import ChatBox from '@/components/chat/ChatBox.jsx';
import MessageContainer from '@/components/chat/MessageContainer.jsx';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';
import {getSpeakableSegments} from '@/components/chat/message/utils/speechContent.js';
import ChatHeader from './chat/components/ChatHeader.jsx';
import RightSidebar from './chat/components/RightSidebar.jsx';
import ScrollToBottomButton from './chat/components/ScrollToBottomButton.jsx';
import SpeechPlayer from './chat/components/SpeechPlayer.jsx';
import ResizeHandles from './chat/components/ResizeHandles.jsx';
import {LoadingFailedScreen, LoadingScreen} from './chat/components/LoadingScreens.jsx';
import useChatWindowMode from './chat/hooks/useChatWindowMode.js';
import useChatScroll from './chat/hooks/useChatScroll.js';
import useFileUpload from './chat/hooks/useFileUpload.js';
import {
    getNodeMergeKey,
    getRelationshipMergeKey,
    mergeNetworkData,
    normalizeNetworkData,
    toDeleteKeySet,
} from './chat/utils/networkMerge.js';


const SPEECH_AUTO_HIGHLIGHT_CLASS = 'chat-speech-auto-highlight';
const SPEECH_AUTO_HIGHLIGHT_ATTR = 'data-chat-speech-auto-highlight';
const SPEECH_SEGMENT_BINDING_ATTR = 'data-chat-speech-segment-binding';
const SPEECH_SEGMENT_BOUND_ID_ATTR = 'data-chat-speech-segment-id';
const SPEECH_SEGMENT_BOUND_IDS_ATTR = 'data-chat-speech-segment-ids';
const SPEECH_SEGMENT_BOUND_INDEX_ATTR = 'data-chat-speech-segment-index';
const SPEECH_SEGMENT_BOUND_INDEXES_ATTR = 'data-chat-speech-segment-indexes';
const SPEECH_BOUNDARY_TOKEN = '\u001F';
const SPEECH_TEXT_CANDIDATE_SELECTOR = [
    'li',
    '[role="listitem"]',
    'p',
    'blockquote',
    'pre',
    'code',
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


const DEFAULT_BACKEND_PCM_SAMPLE_RATE = 24000;
const DEFAULT_BACKEND_PCM_CHANNELS = 1;
const DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE = 16;

const createBackendSpeechAudioState = () => ({
    requestId: null,
    messageId: null,
    engine: null,
    audio: null,
    chunks: new Map(),
    queue: [],
    queuedIds: new Set(),
    objectUrls: new Set(),
    playing: false,
    generationEnded: false,
    cancelled: false,
    playbackEpoch: 0,
    seekEpoch: 0,
    lastPlaybackAckKey: null,
    sampleRate: DEFAULT_BACKEND_PCM_SAMPLE_RATE,
    channels: DEFAULT_BACKEND_PCM_CHANNELS,
    bitsPerSample: DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE,
    format: 'pcm',
    mime: 'audio/pcm',
});

const normalizeBackendAudioFormat = (payload = {}) => String(
    payload.format || 'pcm'
).toLowerCase();

const getBackendSpeechSegmentId = (payload = {}) => String(
    payload.segmentId || `speech-segment-${payload.segmentPosition ?? 0}`
);

const getBackendSpeechSegmentIndex = (payload = {}, fallback = 0) => {
    const value = Number(payload.segmentIndex ?? fallback);
    return Number.isFinite(value) ? value : fallback;
};

const getBackendSpeechSegmentPosition = (payload = {}, fallback = 0) => {
    const value = Number(payload.segmentPosition ?? fallback);
    return Number.isFinite(value) ? value : fallback;
};

const getBackendSpeechSampleRate = (payload = {}, fallback = DEFAULT_BACKEND_PCM_SAMPLE_RATE) => {
    const value = Number(payload.sampleRate ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

const getBackendSpeechChannels = (payload = {}, fallback = DEFAULT_BACKEND_PCM_CHANNELS) => {
    const value = Number(payload.channels ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

const getBackendSpeechBitsPerSample = (payload = {}, fallback = DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE) => {
    const value = Number(payload.bitsPerSample ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

const decodeBase64ToUint8Array = (value) => {
    const normalized = String(value || '').replace(/\s+/g, '');
    if (!normalized) return new Uint8Array(0);

    const binaryString = window.atob(normalized);
    const bytes = new Uint8Array(binaryString.length);
    for (let index = 0; index < binaryString.length; index += 1) {
        bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
};

const concatUint8Arrays = (arrays) => {
    const totalLength = arrays.reduce((sum, item) => sum + (item?.byteLength || 0), 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    arrays.forEach((item) => {
        if (!item?.byteLength) return;
        result.set(item, offset);
        offset += item.byteLength;
    });

    return result;
};

const writeAsciiString = (view, offset, value) => {
    for (let index = 0; index < value.length; index += 1) {
        view.setUint8(offset + index, value.charCodeAt(index));
    }
};

const createWavBlobFromPcm = (pcmBytes, options = {}) => {
    const sampleRate = getBackendSpeechSampleRate(options);
    const channels = getBackendSpeechChannels(options);
    const bitsPerSample = getBackendSpeechBitsPerSample(options);
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = channels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const buffer = new ArrayBuffer(44 + pcmBytes.byteLength);
    const view = new DataView(buffer);

    writeAsciiString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmBytes.byteLength, true);
    writeAsciiString(view, 8, 'WAVE');
    writeAsciiString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeAsciiString(view, 36, 'data');
    view.setUint32(40, pcmBytes.byteLength, true);
    new Uint8Array(buffer, 44).set(pcmBytes);

    return new Blob([buffer], {type: 'audio/wav'});
};

const createBackendSpeechBlob = (byteArrays, payload = {}) => {
    const rawBytes = concatUint8Arrays(byteArrays);
    const format = normalizeBackendAudioFormat(payload);
    const mime = payload.mime || (format === 'pcm' ? 'audio/pcm' : `audio/${format}`);

    if (format === 'pcm' || String(mime).toLowerCase().includes('pcm')) {
        return createWavBlobFromPcm(rawBytes, payload);
    }

    return new Blob([rawBytes], {type: mime});
};

const normalizeSpeechMatchText = (value) => String(value ?? '')
    .replace(/[​-‍﻿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const stripSpeechListMarker = (value) => normalizeSpeechMatchText(value)
    .replace(/^\s*(?:[-*+•‣⁃]|\d+[.)、]|[a-zA-Z][.)])\s+/, '')
    .trim();

const getSpeechTextVariants = (value) => {
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

const getSpeechSegmentText = (segment) => String(
    segment?.text ??
    segment?.content ??
    segment?.value ??
    segment?.rawText ??
    ''
);

const getSpeechSegmentTextVariants = (segment) => getSpeechTextVariants(getSpeechSegmentText(segment));

const getSpeechElementText = (element) => normalizeSpeechMatchText(element?.innerText || element?.textContent || '');

const getSpeechTagScore = (element) => {
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

// ========== 主组件 ==========
function ChatPage({
                      chatMarkId,
                      documentMarkId,
                      pageType,
                      onNewChatMarkId,
                      showWindowButton = true,
                      showMinimizeButton = false,   // 是否显示最小化按钮（默认为 false）
                      onMinimize,                   // 最小化按钮点击回调
                      visible = true,               // 是否显示整个 ChatPage（默认为 true，变化时带动画）
                      onWindowModeChange,           // 窗口化模式变化回调
                  }) {
    const {t} = useTranslation();
    const chatPageRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const currentMessageSendRequestIDRef = useRef(generateUUID());
    const currentMessagesLoadedRequestIDRef = useRef(generateUUID());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
    const [randomMark, setRandomMark] = useState(null);
    const errorToastsIds = useRef(new Map());
    const isMessageLoadedRef = useRef(false);
    const isLoadingDataRef = useRef(false);

    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesRef = useRef({});
    const messagesOrderRef = useRef([]);

    const isMobile = useIsMobile();
    const [previewModel, setPreviewModel] = useState(null);
    const [isNewMarkId, setIsNewMarkId] = useState(false);
    const isNewMarkIdRef = useRef(false);
    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({name: t("no_models")});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [advancedSettings, setAdvancedSettings] = useState([]);
    const [initialSettingValues, setInitialSettingValues] = useState({});
    const [advancedSettingsValues, setAdvancedSettingsValues] = useState({});

    // 删除相关
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDeleteMsgId, setPendingDeleteMsgId] = useState(null);
    const [isDeletingMessage, setIsDeletingMessage] = useState(false);


    // 语音朗读相关：由 ChatPage 统一处理播放状态和当前高亮句子。
    const [speechState, setSpeechState] = useState({
        status: 'idle',
        messageId: null,
        requestId: null,
        engine: 'browser',
        segments: [],
        currentSegmentId: null,
        currentSegmentIndex: -1,
        currentSegmentPosition: -1,
        rate: 1,
    });
    const speechStateRef = useRef(speechState);
    const speechControllerRef = useRef({
        requestId: null,
        engine: null,
        cancelled: false,
        playToken: 0,
    });
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

// ========== 窗口化、滚动和上传模块 ==========
    const {
        isReady,
        isWindowMode,
        windowPos,
        windowDimensions,
        windowRef,
        isDragging,
        isDragReady,
        isResizing,
        ghostCursor,
        toggleWindowMode,
        handleDragMouseDown,
        handleDragTouchStart,
        handleDragTouchMove,
        handleDragTouchEnd,
        handleResizeMouseDown,
        handleResizeTouchStart,
    } = useChatWindowMode({onWindowModeChange});

    const {
        showScrollToBottomButton,
        setShowScrollToBottomButton,
        chatBoxHeight,
        isAutoScrollEnabledRef,
        pendingScrollRef,
        checkScrollPosition,
        smoothScrollToBottom,
        executePendingScroll,
        requestScrollToBottom,
        handleScrollToBottomClick,
        updateStreamingStatus,
        handleChatBoxHeightChange,
    } = useChatScroll(messagesContainerRef);

    // ========== Popover 相关函数 ==========
    const scrollToSelectedItem = useCallback((modelListRef) => {
        if (modelListRef?.current) {
            const selectedItem = modelListRef.current.querySelector('[data-selected="true"]');
            if (selectedItem) {
                requestAnimationFrame(() => {
                    selectedItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                });
            }
        }
    }, []);
    const handlePopoverOpenChange = useCallback((open) => {
        setIsModelPopoverOpen(open);
        if (!open) {
            setPreviewModel(null);
        } else {
            setPreviewModel(selectedModel);
        }
    }, [selectedModel]);
    const handleModelItemClick = useCallback((model) => {
        setSelectedModel(model);
        if (!isMobile) {
            setIsModelPopoverOpen(false);
        } else {
            setPreviewModel(model);
        }
    }, [isMobile]);
    const handleModelItemMouseEnter = useCallback((model) => {
        if (!isMobile) {
            setPreviewModel(model);
        }
    }, [isMobile]);

// ========= 上传相关 =========
    const {
        uploadFiles,
        attachments,
        setAttachments,
        handleFolderDetected,
        onAttachmentRemove,
        handleImagePaste,
        handleRetryUpload,
        handleCancelUpload,
        handleFilePicker,
        handlePicPicker,
        handleSelectedFiles,
    } = useFileUpload({chatMarkId, t});

    // ========= 滚动辅助 =========
    // 高频流式更新时，用户只要主动向上滚/滑，就应该立即退出自动置底，
    // 否则后续 replace/content 变化会把用户反复拉回底部，造成“难以逃脱置底”。
    const USER_SCROLL_UNLOCK_MS = 1500;
    const USER_SCROLL_UP_DELTA = 2;
    const BOTTOM_RELOCK_THRESHOLD = 24;

    const userScrollStateRef = useRef({
        lastScrollTop: 0,
        touchLastY: null,
        programmaticScrollUntil: 0,
    });
    const userAutoScrollUnlockUntilRef = useRef(0);

    const isUserAutoScrollUnlocked = useCallback(() => {
        return Date.now() < userAutoScrollUnlockUntilRef.current;
    }, []);

    const markProgrammaticScroll = useCallback((duration = 450) => {
        userScrollStateRef.current.programmaticScrollUntil = Date.now() + duration;
    }, []);

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

    const unlockAutoScrollByUser = useCallback(() => {
        userAutoScrollUnlockUntilRef.current = Date.now() + USER_SCROLL_UNLOCK_MS;
        isAutoScrollEnabledRef.current = false;
        pendingScrollRef.current = false;

        const container = messagesContainerRef.current;
        if (container && container.scrollHeight > container.clientHeight + BOTTOM_RELOCK_THRESHOLD) {
            setShowScrollToBottomButton(true);
        }
    }, [isAutoScrollEnabledRef, pendingScrollRef, setShowScrollToBottomButton]);

    const relockAutoScrollAtBottom = useCallback(() => {
        userAutoScrollUnlockUntilRef.current = 0;
        isAutoScrollEnabledRef.current = true;
        pendingScrollRef.current = false;
        checkScrollPosition(true);
    }, [checkScrollPosition, isAutoScrollEnabledRef, pendingScrollRef]);

    // replace/content/network 等更新经常只改变消息内部高度，不会改变滚动容器自身高度。
    // 因此需要在 React 提交 DOM 后再滚动，并额外监听内容区的 resize / mutation。
    const scrollToBottomAfterRender = useCallback((shouldAutoScroll = isAutoScrollEnabledRef.current, options = {}) => {
        const {streaming = false, delay = 0} = options;

        const doScroll = () => {
            const container = messagesContainerRef.current;
            if (!container) return;

            const userUnlocked = isUserAutoScrollUnlocked();
            const shouldStickToBottom = !userUnlocked && (shouldAutoScroll || pendingScrollRef.current);

            if (shouldStickToBottom) {
                // 内容变化前用户就在底部时，保持自动滚动状态，避免 scrollHeight 增加后被误判为离底。
                isAutoScrollEnabledRef.current = true;
                markProgrammaticScroll(streaming ? 700 : 450);

                if (streaming) {
                    smoothScrollToBottom(true);
                } else {
                    requestScrollToBottom();
                }

                checkScrollPosition(true);
            } else if (userUnlocked) {
                setShowScrollToBottomButton(container.scrollHeight > container.clientHeight + BOTTOM_RELOCK_THRESHOLD);
            } else {
                checkScrollPosition(true);
            }
        };

        const runAfterPaint = () => {
            requestAnimationFrame(() => {
                doScroll();
                // 很多 replace 渲染链路里会有 Markdown / 高亮 / 图表等二次布局，再补一帧更稳。
                requestAnimationFrame(doScroll);
            });
        };

        if (delay > 0) {
            setTimeout(runAfterPaint, delay);
        } else {
            runAfterPaint();
        }
    }, [
        checkScrollPosition,
        isAutoScrollEnabledRef,
        isUserAutoScrollUnlocked,
        markProgrammaticScroll,
        pendingScrollRef,
        requestScrollToBottom,
        setShowScrollToBottomButton,
        smoothScrollToBottom,
    ]);

    const handleManualScrollToBottomClick = useCallback(() => {
        userAutoScrollUnlockUntilRef.current = 0;
        isAutoScrollEnabledRef.current = true;
        pendingScrollRef.current = true;
        markProgrammaticScroll(700);
        handleScrollToBottomClick();
    }, [handleScrollToBottomClick, isAutoScrollEnabledRef, markProgrammaticScroll, pendingScrollRef]);

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
        const {currentSegmentId, currentSegmentIndex} = speech;

        if (currentSegmentId !== undefined && currentSegmentId !== null) {
            const byIdElement = map.byId.get(currentSegmentId);
            if (byIdElement) return byIdElement;
        }

        if (Number.isInteger(currentSegmentIndex) && currentSegmentIndex >= 0) {
            const byIndexElement = map.byIndex.get(currentSegmentIndex);
            if (byIndexElement) return byIndexElement;
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

    const getSpeechSegmentElement = useCallback((container, speech = speechStateRef.current) => {
        if (!container || !speech?.messageId) return null;

        const {messageId, currentSegmentId, currentSegmentIndex} = speech;
        const segments = Array.isArray(speech.segments) ? speech.segments : [];
        const currentSegment = currentSegmentId
            ? segments.find(item => item.id === currentSegmentId)
            : segments[currentSegmentIndex];
        const messageElement = getSpeechMessageElement(container, messageId);
        const searchRoot = messageElement || container;

        const exactSelectors = [];
        if (currentSegmentId) {
            const escapedSegmentId = escapeSelectorValue(currentSegmentId);
            exactSelectors.push(
                `[data-speech-segment-id="${escapedSegmentId}"]`,
                `[data-current-segment-id="${escapedSegmentId}"]`,
                `[data-segment-id="${escapedSegmentId}"]`,
                `[data-speech-id="${escapedSegmentId}"]`,
                `[id="${escapedSegmentId}"]`,
                `[id="speech-segment-${escapedSegmentId}"]`,
                `[id="${escapeSelectorValue(messageId)}-${escapedSegmentId}"]`,
            );
        }

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
                currentSegmentId ? `speechSegment:${currentSegmentId}` : null,
                currentSegmentId ? `speech-segment:${currentSegmentId}` : null,
                currentSegmentId ? `segment:${currentSegmentId}` : null,
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

        if (messageElement) return messageElement;
        return null;
    }, [escapeSelectorValue, findSpeechElementByText, getMappedSpeechSegmentElement, getSpeechMessageElement, queryFirstSpeechElement, resolveMountedElement]);

    const ensureSpeechHighlightStyle = useCallback(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById('chat-speech-auto-highlight-style')) return;

        const style = document.createElement('style');
        style.id = 'chat-speech-auto-highlight-style';
        style.textContent = `
            .${SPEECH_AUTO_HIGHLIGHT_CLASS} {
                background: rgba(99, 102, 241, 0.14) !important;
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12) !important;
                border-radius: 0.45rem !important;
                transition: background-color 160ms ease, box-shadow 160ms ease !important;
                scroll-margin-top: 5rem;
            }
            li.${SPEECH_AUTO_HIGHLIGHT_CLASS},
            [role="listitem"].${SPEECH_AUTO_HIGHLIGHT_CLASS} {
                padding-top: 0.08rem;
                padding-bottom: 0.08rem;
            }
            li.${SPEECH_AUTO_HIGHLIGHT_CLASS}::marker {
                color: rgb(79, 70, 229);
                font-weight: 700;
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

        targetElement.setAttribute(SPEECH_AUTO_HIGHLIGHT_ATTR, 'true');
        targetElement.classList.add(SPEECH_AUTO_HIGHLIGHT_CLASS);
        return targetElement;
    }, [clearSpeechAutoHighlights, ensureSpeechHighlightStyle, getSpeechSegmentElement]);

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

    // ========= 消息删除 =========
    const deleteMessageLocally = useCallback((msgId) => {
        if (!msgId) {
            toast.error(t("delete_error"));
            return false;
        }

        const currentMessages = messagesRef.current || {};
        const currentOrder = messagesOrderRef.current || [];

        const deleteOrderIndex = currentOrder.indexOf(msgId);

        if (!currentMessages[msgId] || deleteOrderIndex === -1) {
            toast.error(t("delete_error"));
            return false;
        }

        const targetMessage = currentMessages[msgId];
        const parentId = targetMessage.prevMessage;
        const parentMessage = parentId ? currentMessages[parentId] : null;

        let replacementMsgId = null;
        const newMessages = {...currentMessages};

        if (parentMessage) {
            const oldChildren = Array.isArray(parentMessage.messages)
                ? parentMessage.messages
                : [];

            const deleteChildIndex = oldChildren.indexOf(msgId);
            const newChildren = oldChildren.filter(childId => childId !== msgId);

            if (deleteChildIndex > 0) {
                replacementMsgId = oldChildren[deleteChildIndex - 1];
            }

            newMessages[parentId] = {
                ...parentMessage,
                messages: newChildren,
                nextMessage: replacementMsgId || null,
            };
        }


        setMessages(newMessages);
        messagesRef.current = newMessages;

        if (replacementMsgId) {
            loadSwitchMessage(parentId, replacementMsgId);
        } else {
            const newOrder = [
                ...currentOrder.slice(0, deleteOrderIndex),
                ...(replacementMsgId ? [replacementMsgId] : []),
            ]

            setMessagesOrder(newOrder);
            messagesOrderRef.current = newOrder;
        }

        scrollToBottomAfterRender(isAutoScrollEnabledRef.current, {delay: 50});

        return true;
    }, [
        t,
        setMessages,
        setMessagesOrder,
        isAutoScrollEnabledRef,
        scrollToBottomAfterRender,
    ]);

    // ========= 消息相关 =========
    const handleSendMessage = useCallback((
        {
            messageContent,
            toolsStatus,
            isEditMessage = false,
            editMessageId,
            attachments,
            sendButtonStatus,
            isProgenerate = false,
            isRegenerate = false,
            isFork = false,
            role
        }
    ) => {
        if (uploadFiles.length !== 0) {
            toast.error(t("file_upload_not_complete"));
            return;
        }
        const sendMessage = (markId) => {
            if (isFirstMessageSend) {
                emitEvent({
                    type: "widget",
                    target: "Sidebar",
                    payload: {command: "Update-ConversationDate"},
                    markId: markId,
                });
                setIsFirstMessageSend(false);
            }
            const eventPayload = {
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Message-Send",
                    content: messageContent,
                    toolsStatus: toolsStatus,
                    attachments: attachments,
                    isEdit: isEditMessage,
                    model: selectedModel.id,
                    sendButtonStatus: sendButtonStatus,
                    isRegenerate: isRegenerate,
                    isProgenerate: isProgenerate,
                    isFork: isFork,
                    role: role,
                    options: advancedSettingsValues,
                    pageType: pageType,
                    documentMarkId: documentMarkId,
                    requestId: currentMessageSendRequestIDRef.current
                },
                markId: markId
            };
            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }
            emitEvent(eventPayload).then((payload) => {
                if (payload.success) {
                    currentMessageSendRequestIDRef.current = generateUUID();
                } else {
                    toast.error(t("send_message_error", {message: payload.value}));
                }
            });
            setAttachments([]);
        };
        if (!chatMarkId) {
            emitEvent({
                type: "page",
                target: "ChatPage",
                payload: {
                    command: "Get-MarkId",
                    requestId: currentMessageSendRequestIDRef.current
                }
            })
                .then((payload) => {
                    if (payload.success) {
                        setIsNewMarkId(true);
                        onNewChatMarkId(payload.value);
                        sendMessage(payload.value);
                    } else {
                        throw new Error(payload.value);
                    }
                })
                .catch((error) => {
                    toast.error(t("get_markid_error", {message: error?.message}));
                });
        } else {
            sendMessage(chatMarkId);
        }
    }, [chatMarkId, documentMarkId, isFirstMessageSend, selectedModel, advancedSettingsValues, pageType, t, uploadFiles, onNewChatMarkId]);

    const loadMoreHistory = useCallback(async () => {
        try {
            return new Promise((resolve, reject) => {
                apiClient
                    .get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                        params: {
                            markId: chatMarkId,
                            prevId: messagesOrder[1]
                        }
                    })
                    .then(data => {
                        const wasAutoScroll = isAutoScrollEnabledRef.current;
                        const newMessages = {...messagesRef.current, ...data.messages};
                        setMessages(newMessages);
                        messagesRef.current = newMessages;
                        let newOrder;
                        if (data.haveMore) {
                            newOrder = ['<PREV_MORE>', ...data.messagesOrder, ...messagesOrder.slice(1)];
                        } else {
                            newOrder = [...data.messagesOrder, ...messagesOrder.slice(1)];
                        }
                        setMessagesOrder(newOrder);
                        messagesOrderRef.current = newOrder;
                        if (!wasAutoScroll) {
                            checkScrollPosition(true);
                        }
                        resolve(true);
                    })
                    .catch(error => reject(error));
            });
        } catch (err) {
            throw err;
        }
    }, [chatMarkId, checkScrollPosition, messagesOrder, setMessages]);

    const loadSwitchMessage = useCallback(async (msgId, newMsgId) => {
        if (!(msgId in messagesRef.current)) return false;
        let newOrders = [];
        let loadStartId = newMsgId;
        let needsLoad = !(newMsgId in messagesRef.current);

        if (!needsLoad) {
            let cursor = messagesRef.current[newMsgId];
            newOrders.push(newMsgId);
            while (cursor.nextMessage) {
                const nextId = cursor.nextMessage;
                if (nextId in messagesRef.current) {
                    newOrders.push(nextId);
                    cursor = messagesRef.current[nextId];
                } else {
                    needsLoad = true;
                    loadStartId = nextId;
                    break;
                }
            }
        }
        let finalMessagesMap = messagesRef.current;

        if (needsLoad) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: chatMarkId, nextId: loadStartId},
                });
                finalMessagesMap = {...finalMessagesMap, ...data.messages};
                const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
                const newOrder = [
                    ...messagesOrderRef.current.slice(0, insertPoint),
                    ...newOrders,
                    ...data.messagesOrder,
                ];
                messagesOrderRef.current = newOrder;
                setMessagesOrder(newOrder);
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
                return false;
            }
        } else {
            const insertPoint = messagesOrderRef.current.indexOf(msgId) + 1;
            const newOrder = [...messagesOrderRef.current.slice(0, insertPoint), ...newOrders];
            messagesOrderRef.current = newOrder;
            setMessagesOrder(newOrder);
        }

        const nextMessagesState = produce(finalMessagesMap, (draft) => {
            // 原有逻辑：设置 nextMessage
            if (draft[msgId]) {
                draft[msgId].nextMessage = newMsgId;
            }

            // 确保新消息也有挂载点功能（安全版本）
            if (newMsgId && draft[newMsgId]) {
                const msgDraft = draft[newMsgId];

                // 幂等保护：如果已经注入过，就不再重复注入
                if (typeof msgDraft.registerComponent === 'function') {
                    return;
                }

                // === 使用闭包存储 mountPoints，不依赖 draft ===
                const mountPoints = {};

                // 添加注册函数
                msgDraft.registerComponent = (componentKey, componentRef) => {
                    mountPoints[componentKey] = componentRef;
                };

                // 添加注销函数
                msgDraft.unregisterComponent = (componentKey) => {
                    delete mountPoints[componentKey];
                };

                // 添加获取函数
                msgDraft.getComponent = (componentKey) => {
                    return mountPoints[componentKey];
                };
            }
        });

        messagesRef.current = nextMessagesState;
        setMessages(nextMessagesState);
        return true;
    }, [chatMarkId, t, setMessages]);

    const switchMessage = useCallback(async (msg, msgId, delta) => {
        const msgId_index = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = msg.messages[msgId_index + delta];
        const sendSwitchRequest = () => {
            emitEvent({
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Switch-Message",
                    msgId,
                    nextMessage: newMsgId
                },
                markId: chatMarkId
            });
        };
        await loadSwitchMessage(msgId, newMsgId);
        sendSwitchRequest();
    }, [chatMarkId, loadSwitchMessage]);

    const emitMessagesLoaded = () => {
        setTimeout(() => {
            isMessageLoadedRef.current = true;
            emitEvent({
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Messages-Loaded",
                    requestId: currentMessagesLoadedRequestIDRef.current,
                    messagesOrder: messagesOrderRef.current[0] === '<PREV_MORE>' ? messagesOrderRef.current.slice(1) : messagesOrderRef.current
                },
                markId: chatMarkId,
                onTimeout: () => {
                    toast.warning(t("cannot_load_tasks"));
                }
            }).then((payload) => {
                if (payload.success) {
                    currentMessagesLoadedRequestIDRef.current = generateUUID();
                } else {
                    console.error("Cannot to load the tasks,", payload.value);
                }
            });
        }, 0)
    }

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        let rafId = null;
        const observedElements = new WeakSet();

        const scheduleCheck = () => {
            const userUnlocked = isUserAutoScrollUnlocked();
            const shouldAutoScroll = !userUnlocked && (isAutoScrollEnabledRef.current || pendingScrollRef.current);

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                rafId = null;

                if (shouldAutoScroll) {
                    isAutoScrollEnabledRef.current = true;
                    markProgrammaticScroll();
                    requestScrollToBottom();
                    checkScrollPosition(true);
                } else if (isUserAutoScrollUnlocked()) {
                    setShowScrollToBottomButton(container.scrollHeight > container.clientHeight + BOTTOM_RELOCK_THRESHOLD);
                } else {
                    checkScrollPosition(true);
                }
            });
        };

        const resizeObserver = new ResizeObserver(scheduleCheck);

        const observeElement = (element) => {
            if (!element || observedElements.has(element)) return;
            observedElements.add(element);
            resizeObserver.observe(element);
        };

        observeElement(container);
        Array.from(container.children).forEach(observeElement);

        const mutationObserver = new MutationObserver(() => {
            Array.from(container.children).forEach(observeElement);
            scheduleCheck();
        });

        mutationObserver.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [
        checkScrollPosition,
        isAutoScrollEnabledRef,
        isUserAutoScrollUnlocked,
        markProgrammaticScroll,
        pendingScrollRef,
        requestScrollToBottom,
        setShowScrollToBottomButton,
    ]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const state = userScrollStateRef.current;
        state.lastScrollTop = container.scrollTop;

        const getDistanceToBottom = () => {
            return container.scrollHeight - container.scrollTop - container.clientHeight;
        };

        const handleWheel = (event) => {
            if (Math.abs(event.deltaY) > USER_SCROLL_UP_DELTA) {
                disableSpeechAutoFollowByUser();
            }
            // deltaY < 0 表示用户想向上看历史内容；不要等真正滚动发生，先解除置底锁。
            if (event.deltaY < -USER_SCROLL_UP_DELTA) {
                unlockAutoScrollByUser();
            }
        };

        const handleTouchStart = (event) => {
            state.touchLastY = event.touches?.[0]?.clientY ?? null;
        };

        const handleTouchMove = (event) => {
            const currentY = event.touches?.[0]?.clientY;
            if (typeof currentY !== 'number' || typeof state.touchLastY !== 'number') {
                state.touchLastY = currentY ?? null;
                return;
            }

            const touchDeltaY = currentY - state.touchLastY;
            if (Math.abs(touchDeltaY) > USER_SCROLL_UP_DELTA) {
                disableSpeechAutoFollowByUser();
            }
            // 手指向下滑时，页面内容通常向上滚，用户是在尝试逃离底部。
            if (touchDeltaY > USER_SCROLL_UP_DELTA) {
                unlockAutoScrollByUser();
            }

            state.touchLastY = currentY;
        };

        const handleScroll = () => {
            const currentScrollTop = container.scrollTop;
            const previousScrollTop = state.lastScrollTop;
            const now = Date.now();
            const isProgrammaticScroll = now < state.programmaticScrollUntil;
            const isSpeechFollowScroll = now < speechFollowProgrammaticScrollUntilRef.current;

            if (!isProgrammaticScroll && !isSpeechFollowScroll && Math.abs(currentScrollTop - previousScrollTop) > USER_SCROLL_UP_DELTA) {
                disableSpeechAutoFollowByUser();
            }

            if (!isProgrammaticScroll && currentScrollTop < previousScrollTop - USER_SCROLL_UP_DELTA) {
                unlockAutoScrollByUser();
            }

            state.lastScrollTop = currentScrollTop;

            if (getDistanceToBottom() <= BOTTOM_RELOCK_THRESHOLD) {
                // 用户主动回到底部后，再恢复自动置底；刚触发逃逸的冷却期内不抢回控制权。
                if (!isUserAutoScrollUnlocked()) {
                    relockAutoScrollAtBottom();
                }
            } else if (!isUserAutoScrollUnlocked()) {
                checkScrollPosition(true);
            }
        };

        container.addEventListener('wheel', handleWheel, {passive: true});
        container.addEventListener('touchstart', handleTouchStart, {passive: true});
        container.addEventListener('touchmove', handleTouchMove, {passive: true});
        container.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('scroll', handleScroll);
        };
    }, [
        checkScrollPosition,
        disableSpeechAutoFollowByUser,
        isUserAutoScrollUnlocked,
        relockAutoScrollAtBottom,
        unlockAutoScrollByUser,
    ]);

    useEffect(() => {
        if (isAutoScrollEnabledRef.current && messagesOrder.length > 0 && !isUserAutoScrollUnlocked()) {
            requestAnimationFrame(() => {
                if (isUserAutoScrollUnlocked()) return;

                markProgrammaticScroll();
                if (pendingScrollRef.current) {
                    executePendingScroll();
                } else {
                    requestScrollToBottom();
                }
            });
        }
    }, [
        messagesOrder,
        executePendingScroll,
        isAutoScrollEnabledRef,
        isUserAutoScrollUnlocked,
        markProgrammaticScroll,
        pendingScrollRef,
        requestScrollToBottom,
    ]);


    useEffect(() => {
        speechStateRef.current = speechState;
    }, [speechState]);

    useEffect(() => {
        speechAutoFollowEnabledRef.current = speechAutoFollowEnabled;
    }, [speechAutoFollowEnabled]);

    useEffect(() => {
        const hasActiveSegment = speechState.currentSegmentId || speechState.currentSegmentIndex >= 0;

        if (!['loading', 'playing', 'paused'].includes(speechState.status) || !hasActiveSegment) {
            clearSpeechAutoHighlights();
            clearSpeechSegmentElementBindings(messagesContainerRef.current);
            speechSegmentElementMapRef.current = {
                key: null,
                byId: new Map(),
                byIndex: new Map(),
            };
            return undefined;
        }

        const rafId = requestAnimationFrame(() => {
            applySpeechHighlight(speechState);
        });

        return () => cancelAnimationFrame(rafId);
    }, [
        applySpeechHighlight,
        clearSpeechAutoHighlights,
        clearSpeechSegmentElementBindings,
        speechState.currentSegmentId,
        speechState.currentSegmentIndex,
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

    const resetSpeechState = useCallback(() => {
        setSpeechState({
            status: 'idle',
            messageId: null,
            requestId: null,
            engine: 'browser',
            segments: [],
            currentSegmentId: null,
            currentSegmentIndex: -1,
            currentSegmentPosition: -1,
            rate: 1,
        });
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
        backendState.lastPlaybackAckKey = null;
    }, []);

    const emitBackendSpeechPlaybackAck = useCallback((payload = {}, phase = 'start') => {
        const controller = speechControllerRef.current;
        if (!controller?.requestId || controller.engine === 'browser') return;

        const backendState = backendSpeechAudioRef.current;
        const requestId = payload.requestId || backendState?.requestId || controller.requestId;
        const messageId = payload.messageId || payload.msgId || backendState?.messageId || speechStateRef.current?.messageId;
        const segmentId = getBackendSpeechSegmentId(payload);
        const segmentIndex = getBackendSpeechSegmentIndex(payload, -1);
        const segmentPosition = getBackendSpeechSegmentPosition(payload, -1);
        const playbackEpoch = backendState?.playbackEpoch || 0;
        const ackKey = `${requestId}:${phase}:${segmentId}:${segmentPosition}:${playbackEpoch}`;

        if (backendState) {
            if (backendState.lastPlaybackAckKey === ackKey) return;
            backendState.lastPlaybackAckKey = ackKey;
        }

        emitEvent({
            type: 'speech',
            target: 'TTS',
            payload: {
                command: 'Speech-Playback-Ack',
                requestId,
                msgId: messageId,
                messageId,
                segmentId,
                segmentIndex,
                segmentPosition,
                phase,
                status: phase,
                playbackEpoch,
                timestamp: new Date().toISOString(),
            },
            markId: chatMarkId,
        });
    }, [chatMarkId]);

    useEffect(() => () => {
        clearBackendSpeechAudio();
    }, [clearBackendSpeechAudio]);

    const cancelActiveSpeech = useCallback((notifyBackend = false) => {
        const currentController = speechControllerRef.current;
        currentController.cancelled = true;

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
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

    const updateSpeechRate = useCallback((value) => {
        const nextRate = normalizeSpeechRate(value);
        const currentController = speechControllerRef.current;

        if (currentController?.requestId) {
            currentController.rate = nextRate;

            const backendAudio = backendSpeechAudioRef.current?.audio;
            if (backendAudio) {
                backendAudio.playbackRate = nextRate;
            }

            if (currentController.engine && currentController.engine !== 'browser') {
                emitEvent({
                    type: 'speech',
                    target: 'TTS',
                    payload: {
                        command: 'Speech-Set-Rate',
                        requestId: currentController.requestId,
                        messageId: speechStateRef.current?.messageId,
                        msgId: speechStateRef.current?.messageId,
                        rate: nextRate,
                    },
                    markId: chatMarkId,
                });
            }
        }

        setSpeechState(prev => ({
            ...prev,
            rate: nextRate,
        }));
    }, [chatMarkId, normalizeSpeechRate]);

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

    const speakWithBrowser = useCallback(({messageId, requestId, segments, speechConfig}) => {
        if (typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
            toast.error(t('browser_speech_not_supported'));
            return false;
        }

        cancelActiveSpeech(false);

        const synthesis = window.speechSynthesis;
        const lang = speechConfig.lang || speechConfig.speakLang || navigator.language || 'zh-CN';
        const baseRate = normalizeSpeechRate(speechConfig.rate ?? speechConfig.speakRate ?? 1);
        const pitch = Number(speechConfig.pitch ?? speechConfig.speakPitch ?? 1) || 1;
        const volume = Number(speechConfig.volume ?? speechConfig.speakVolume ?? 1);

        const controller = {
            requestId,
            engine: 'browser',
            cancelled: false,
            paused: false,
            segments,
            nextIndex: 0,
            currentIndex: -1,
            rate: baseRate,
            pitch,
            volume,
            lang,
            playNext: null,
            playFrom: null,
            playToken: 0,
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
            rate: baseRate,
        });

        const finish = () => {
            if (controller.cancelled || speechControllerRef.current.requestId !== requestId) return;

            setSpeechState(prev => ({
                ...prev,
                status: 'ended',
                currentSegmentId: null,
                currentSegmentIndex: -1,
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

        const playNext = () => {
            if (controller.cancelled || controller.paused || speechControllerRef.current.requestId !== requestId) return;
            if (controller.nextIndex >= segments.length) {
                finish();
                return;
            }

            const segmentIndex = controller.nextIndex;
            const segment = segments[segmentIndex];
            const playToken = (controller.playToken || 0) + 1;
            controller.playToken = playToken;
            controller.currentIndex = segmentIndex;
            controller.nextIndex = segmentIndex + 1;

            const utterance = new SpeechSynthesisUtterance(segment.text);
            utterance.lang = controller.lang;
            utterance.rate = normalizeSpeechRate(controller.rate);
            utterance.pitch = Math.min(Math.max(controller.pitch, 0), 2);
            utterance.volume = Number.isFinite(controller.volume) ? Math.min(Math.max(controller.volume, 0), 1) : 1;

            const voice = findBrowserSpeechVoice(speechConfig);
            if (voice) utterance.voice = voice;

            utterance.onstart = () => {
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken) return;
                setSpeechState(prev => ({
                    ...prev,
                    status: controller.paused ? 'paused' : 'playing',
                    currentSegmentId: segment.id,
                    currentSegmentIndex: segmentIndex,
                    rate: normalizeSpeechRate(controller.rate),
                }));
            };

            utterance.onend = () => {
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken) return;
                setSpeechState(prev => ({
                    ...prev,
                    currentSegmentId: null,
                    currentSegmentIndex: -1,
                }));
                if (!controller.paused) playNext();
            };

            utterance.onerror = (event) => {
                if (controller.cancelled || speechControllerRef.current.requestId !== requestId || controller.playToken !== playToken || event?.error === 'interrupted' || event?.error === 'canceled') return;
                toast.error(t('speech_play_error', {message: event?.error || t('unknown_error')}));
                cancelActiveSpeech(false);
            };

            synthesis.speak(utterance);
        };

        controller.playNext = playNext;
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
                rate: normalizeSpeechRate(controller.rate),
            }));

            synthesis.cancel();
            window.setTimeout(() => {
                if (!controller.cancelled && !controller.paused && speechControllerRef.current.requestId === requestId) {
                    playNext();
                }
            }, 0);
            return true;
        };

        // 某些浏览器语音列表延迟加载；先触发一次，下一帧再播放。
        synthesis.getVoices?.();
        window.setTimeout(playNext, 0);
        return true;
    }, [cancelActiveSpeech, findBrowserSpeechVoice, normalizeSpeechRate, resetSpeechState, t]);

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
        const segmentPosition = getBackendSpeechSegmentPosition(payload, -1);
        const segmentIndex = getBackendSpeechSegmentIndex(payload, segmentPosition);
        const segmentId = payload.segmentId || speechControllerRef.current?.segments?.[segmentPosition]?.id || null;

        if (Number.isFinite(segmentPosition) && segmentPosition >= 0) {
            speechControllerRef.current.currentIndex = segmentPosition;
        }

        setSpeechState(prev => ({
            ...prev,
            status: prev.status === 'paused' ? 'paused' : 'playing',
            currentSegmentId: segmentId,
            currentSegmentIndex: segmentIndex,
            currentSegmentPosition: segmentPosition,
            rate: normalizeSpeechRate(payload.rate ?? prev.rate ?? 1),
        }));
    }, [normalizeSpeechRate]);

    const finishBackendSpeechPlayback = useCallback((requestId) => {
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

        const nextItem = backendState.queue.shift();
        if (!nextItem) {
            if (backendState.generationEnded) {
                finishBackendSpeechPlayback(requestId);
            }
            return;
        }

        const audio = new Audio(nextItem.audioUrl);
        const rate = normalizeSpeechRate(controller.rate ?? speechStateRef.current?.rate ?? 1);
        const segmentPosition = getBackendSpeechSegmentPosition(nextItem, 0);
        const segmentIndex = getBackendSpeechSegmentIndex(nextItem, segmentPosition);
        const segmentId = nextItem.segmentId;
        const playbackEpoch = backendState.playbackEpoch || 0;

        backendState.audio = audio;
        backendState.playing = true;
        backendState.currentSegmentId = segmentId;
        backendState.currentSegmentIndex = segmentIndex;
        backendState.currentSegmentPosition = segmentPosition;
        // 后端 TTS 使用被动句子进度模式：本地 Audio 队列只负责播放音频，
        // 不写入 controller.currentIndex，避免上一句/下一句基于前端播放队列自行跳转。
        audio.playbackRate = rate;

        const cleanupCurrentAudio = ({revoke = true} = {}) => {
            if (backendState.audio === audio) {
                backendState.audio = null;
            }
            backendState.playing = false;
            backendState.currentSegmentId = null;
            backendState.currentSegmentIndex = -1;
            backendState.currentSegmentPosition = -1;
            backendState.queuedIds.delete(segmentId);

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

        audio.onplaying = () => {
            if (isStalePlayback()) return;

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

            // 只有真实开始播放这一刻才推进 UI 句子进度。
            applyBackendSpeechPlaybackSegment(playbackPayload);
            emitBackendSpeechPlaybackAck(playbackPayload, 'start');
        };

        audio.onended = () => {
            if (isStalePlayback()) return;

            emitBackendSpeechPlaybackAck({
                requestId,
                messageId: backendState.messageId,
                msgId: backendState.messageId,
                segmentId,
                segmentIndex,
                segmentPosition,
            }, 'end');

            cleanupCurrentAudio();
            // 播放完一句之后再播放下一句；下一句的高亮只会在下一段 audio.onplaying 时切换。
            playNextBackendSpeechSegment();
        };

        audio.onerror = () => {
            if (isStalePlayback()) return;

            emitBackendSpeechPlaybackAck({
                requestId,
                messageId: backendState.messageId,
                msgId: backendState.messageId,
                segmentId,
                segmentIndex,
                segmentPosition,
            }, 'error');

            cleanupCurrentAudio();
            toast.error(t('speech_play_error', {message: t('unknown_error')}));
            clearBackendSpeechAudio();
            resetSpeechState();
        };

        audio.play().catch((error) => {
            if (isStalePlayback()) return;

            emitBackendSpeechPlaybackAck({
                requestId,
                messageId: backendState.messageId,
                msgId: backendState.messageId,
                segmentId,
                segmentIndex,
                segmentPosition,
            }, 'error');

            cleanupCurrentAudio();
            toast.error(t('speech_play_error', {message: error?.message || t('unknown_error')}));
            clearBackendSpeechAudio();
            resetSpeechState();
        });
    }, [
        applyBackendSpeechPlaybackSegment,
        clearBackendSpeechAudio,
        emitBackendSpeechPlaybackAck,
        finishBackendSpeechPlayback,
        normalizeSpeechRate,
        resetSpeechState,
        t,
    ]);

    const enqueueBackendSpeechSegment = useCallback((payload, audioUrl, revoke = true) => {
        const backendState = backendSpeechAudioRef.current;
        const requestId = payload?.requestId || backendState.requestId;
        const segmentId = getBackendSpeechSegmentId(payload);

        if (!audioUrl || !requestId || backendState.cancelled) return false;
        if (backendState.queuedIds.has(segmentId)) return true;

        backendState.requestId = requestId;
        backendState.messageId = payload?.messageId || payload?.msgId || backendState.messageId;
        backendState.format = normalizeBackendAudioFormat(payload);
        backendState.mime = payload?.mime || backendState.mime;
        backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
        backendState.channels = getBackendSpeechChannels(payload, backendState.channels);
        backendState.bitsPerSample = getBackendSpeechBitsPerSample(payload, backendState.bitsPerSample);
        backendState.queue.push({
            segmentId,
            segmentIndex: getBackendSpeechSegmentIndex(payload, getBackendSpeechSegmentPosition(payload, backendState.queue.length)),
            segmentPosition: getBackendSpeechSegmentPosition(payload, backendState.queue.length),
            audioUrl,
            revoke,
        });
        backendState.queuedIds.add(segmentId);
        if (revoke) backendState.objectUrls.add(audioUrl);

        playNextBackendSpeechSegment();
        return true;
    }, [playNextBackendSpeechSegment]);

    const handleBackendSpeechAudioChunk = useCallback((payload) => {
        if (!payload?.audio) return false;

        const backendState = backendSpeechAudioRef.current;
        const segmentId = getBackendSpeechSegmentId(payload);
        let segmentBuffer = backendState.chunks.get(segmentId);

        if (!segmentBuffer) {
            segmentBuffer = {
                chunks: new Map(),
                payload: {},
            };
            backendState.chunks.set(segmentId, segmentBuffer);
        }

        const chunkIndex = Number(payload.chunkIndex ?? segmentBuffer.chunks.size);
        segmentBuffer.chunks.set(Number.isFinite(chunkIndex) ? chunkIndex : segmentBuffer.chunks.size, payload.audio);
        segmentBuffer.payload = {
            ...segmentBuffer.payload,
            ...payload,
            segmentId,
        };
        backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
        backendState.format = normalizeBackendAudioFormat(payload);
        backendState.mime = payload.mime || backendState.mime;
        return true;
    }, []);

    const handleBackendSpeechSegmentReady = useCallback((payload) => {
        const backendState = backendSpeechAudioRef.current;
        const segmentId = getBackendSpeechSegmentId(payload);
        const segmentBuffer = backendState.chunks.get(segmentId);

        if (!segmentBuffer) {
            // 允许空分段结束事件，不中断整个播放任务。
            return false;
        }

        const mergedPayload = {
            ...segmentBuffer.payload,
            ...payload,
            segmentId,
            sampleRate: getBackendSpeechSampleRate(payload, backendState.sampleRate),
            channels: getBackendSpeechChannels(payload, backendState.channels),
            bitsPerSample: getBackendSpeechBitsPerSample(payload, backendState.bitsPerSample),
        };
        const chunkEntries = Array.from(segmentBuffer.chunks.entries())
            .sort(([left], [right]) => Number(left) - Number(right));
        const chunkCount = Number(payload.chunkCount ?? chunkEntries.length);

        if (Number.isFinite(chunkCount) && chunkCount > 0 && chunkEntries.length < chunkCount) {
            toast.warning(t('speech_play_error', {message: `TTS 音频分片缺失：${segmentId}`}));
        }

        try {
            const byteArrays = chunkEntries.map(([, audio]) => decodeBase64ToUint8Array(audio));
            const blob = createBackendSpeechBlob(byteArrays, mergedPayload);
            const audioUrl = URL.createObjectURL(blob);
            backendState.chunks.delete(segmentId);
            return enqueueBackendSpeechSegment(mergedPayload, audioUrl, true);
        } catch (error) {
            backendState.chunks.delete(segmentId);
            toast.error(t('speech_play_error', {message: error?.message || t('unknown_error')}));
            return false;
        }
    }, [enqueueBackendSpeechSegment, t]);

    const handleBackendSpeechEvent = useCallback((payload, reply) => {
        const requestId = payload?.requestId;
        if (requestId && speechControllerRef.current.requestId && requestId !== speechControllerRef.current.requestId) {
            reply?.({success: false, value: 'Speech request id mismatch'});
            return;
        }

        switch (payload?.command) {
            case 'Speech-Start': {
                const requestId = payload.requestId || speechControllerRef.current.requestId;
                const messageId = payload.messageId || payload.msgId || speechStateRef.current?.messageId;
                const backendState = backendSpeechAudioRef.current;
                backendState.requestId = requestId || backendState.requestId;
                backendState.messageId = messageId || backendState.messageId;
                backendState.engine = payload.engine || backendState.engine;
                backendState.sampleRate = getBackendSpeechSampleRate(payload, backendState.sampleRate);
                backendState.channels = getBackendSpeechChannels(payload, backendState.channels);
                backendState.bitsPerSample = getBackendSpeechBitsPerSample(payload, backendState.bitsPerSample);
                backendState.format = normalizeBackendAudioFormat(payload);
                backendState.mime = payload.mime || backendState.mime;

                setSpeechState(prev => ({
                    ...prev,
                    status: 'loading',
                    requestId: requestId || prev.requestId,
                    messageId: messageId || prev.messageId,
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
            case 'Speech-End':
                backendSpeechAudioRef.current.generationEnded = true;
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
        handleBackendSpeechAudioChunk,
        handleBackendSpeechSegmentReady,
        normalizeSpeechRate,
        playNextBackendSpeechSegment,
        t,
    ]);

    useEffect(() => {
        const unsubscribe1 = onEvent({
            type: "message",
            target: "ChatPage",
            markId: chatMarkId
        })
            .then(({payload, reply}) => {
                switch (payload.command) {
                    case "Speak-Message":
                        handleSpeakMessageRequest(payload, reply);
                        break;
                    case "Stop-Speech":
                        cancelActiveSpeech(true);
                        reply({success: true});
                        break;
                    case "Pause-Speech":
                        reply({success: pauseActiveSpeech()});
                        break;
                    case "Resume-Speech":
                        reply({success: resumeActiveSpeech()});
                        break;
                    case "Set-SpeechRate":
                        updateSpeechRate(payload.value ?? payload.rate);
                        reply({success: true});
                        break;
                    case "Previous-SpeechSegment":
                        reply({success: seekSpeechSegment(-1)});
                        break;
                    case "Next-SpeechSegment":
                        reply({success: seekSpeechSegment(1)});
                        break;
                    case "Seek-SpeechSegment":
                        reply({success: seekSpeechSegment({
                                segmentId: payload.segmentId,
                                segmentPosition: payload.segmentPosition,
                            }, {absolute: true})});
                        break;
                    case "Delete-Message":
                        if (payload.value) {
                            const msgId = payload.value;
                            const silent = payload.silent === true;

                            if (!messagesRef.current?.[msgId] || !messagesOrderRef.current?.includes(msgId)) {
                                toast.error(t("delete_error"));
                                reply({success: false});
                                return;
                            }

                            if (silent) {
                                apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + msgId,
                                    {params: {markId: chatMarkId}})
                                    .then((data) => {
                                        deleteMessageLocally(msgId);
                                    })
                                    .catch((error) => {
                                        toast.error(t("delete_error", {message: error?.message || t("unknown_error")}));
                                    })
                                reply({success: true});
                            } else {
                                setPendingDeleteMsgId(msgId);
                                setShowDeleteConfirm(true);
                                reply({success: true});
                            }
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-Message":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            let newMessages = {...messagesRef.current};

                            for (const [key, newValue] of Object.entries(payload.value)) {
                                if (payload.isEdit && !newMessages[key]) {
                                    reply({success: false});
                                    return;
                                }

                                const incomingValue = newValue && typeof newValue === 'object'
                                    ? {
                                        ...newValue,
                                        messages: newValue.messages === undefined ? [] : newValue.messages,
                                    }
                                    : newValue;

                                if (incomingValue && typeof incomingValue === 'object') {
                                    const oldMessage = newMessages[key];

                                    if (oldMessage && typeof oldMessage === 'object') {
                                        const mergedMessage = {...oldMessage, ...incomingValue};

                                        // network 必须做增量合并，避免流式 Add-Message 的短快照覆盖 Add-MessageNetwork 已追加的数据。
                                        if (oldMessage.network || incomingValue.network) {
                                            mergedMessage.network = mergeNetworkData(oldMessage.network, incomingValue.network);
                                        }

                                        newMessages[key] = mergedMessage;
                                    } else {
                                        newMessages[key] = incomingValue;

                                        if (incomingValue.network) {
                                            newMessages[key].network = mergeNetworkData(undefined, incomingValue.network);
                                        }
                                    }
                                } else {
                                    newMessages[key] = incomingValue;
                                }

                                // === 安全注入 registerComponent / getComponent===
                                const msg = newMessages[key];
                                if (msg && typeof msg === 'object' && !msg.registerComponent) {
                                    const mountPoints = {};   // 真正的存储容器（不在 draft 上）

                                    msg.registerComponent = (componentKey, componentRef) => {
                                        mountPoints[componentKey] = componentRef;
                                    };

                                    msg.unregisterComponent = (componentKey) => {
                                        delete mountPoints[componentKey];
                                    };

                                    msg.getComponent = (componentKey) => {
                                        return mountPoints[componentKey];
                                    };
                                }
                            }

                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            scrollToBottomAfterRender(wasAutoScroll, {delay: 50});

                            reply({success: true});
                        }
                        break;
                    case "MessagesOrder-Meta":
                        if (Array.isArray(payload.value) && payload.value.length > 0) {
                            scrollToBottomAfterRender(isAutoScrollEnabledRef.current, {delay: 50});
                            setMessagesOrder(payload.value);
                            messagesOrderRef.current = payload.value;
                            reply({value: payload.value});
                        } else {
                            reply({value: messagesOrderRef.current});
                        }
                        break;
                    case "Set-MessageContent":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newContent] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].content = newContent || '';
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageContent":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newContent] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].content = (draft[msgId].content || '') + (newContent || '');
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Set-MessageReplace":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newReplaces] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        if (!draft[msgId].extraInfo) {
                                            draft[msgId].extraInfo = {};
                                        }
                                        const currentReplace = draft[msgId].extraInfo.replace || {};
                                        draft[msgId].extraInfo.replace = {...currentReplace, ...newReplaces};
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {delay: 50});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageReplaceContent":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, appendFields] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        if (!draft[msgId].extraInfo) {
                                            draft[msgId].extraInfo = {};
                                        }
                                        if (!draft[msgId].extraInfo.replace) {
                                            draft[msgId].extraInfo.replace = {};
                                        }
                                        for (const [key, appendString] of Object.entries(appendFields)) {
                                            const currentValue = draft[msgId].extraInfo.replace[key] || '';
                                            draft[msgId].extraInfo.replace[key] = currentValue + appendString;
                                        }
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});
                            if (payload.reply) reply({success: true});
                        } else {
                            if (payload.reply) reply({success: false});
                        }
                        break;
                    case "Insert-MessageReplaceContent":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();

                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, insertFields] of Object.entries(payload.value)) {
                                    if (draft[msgId] && insertFields && typeof insertFields === 'object') {
                                        if (!draft[msgId].extraInfo) {
                                            draft[msgId].extraInfo = {};
                                        }

                                        if (!draft[msgId].extraInfo.replace) {
                                            draft[msgId].extraInfo.replace = {};
                                        }

                                        for (const [key, insertConfig] of Object.entries(insertFields)) {
                                            if (
                                                insertConfig &&
                                                typeof insertConfig === 'object' &&
                                                typeof insertConfig.content === 'string' &&
                                                typeof insertConfig.position === 'number'
                                            ) {
                                                const currentValue = draft[msgId].extraInfo.replace[key] || '';
                                                const { content, position } = insertConfig;

                                                let insertIndex;

                                                if (position >= 0) {
                                                    insertIndex = position;
                                                } else {
                                                    insertIndex = currentValue.length + position;
                                                }

                                                // 防止越界
                                                insertIndex = Math.max(
                                                    0,
                                                    Math.min(insertIndex, currentValue.length)
                                                );

                                                draft[msgId].extraInfo.replace[key] =
                                                    currentValue.slice(0, insertIndex) +
                                                    content +
                                                    currentValue.slice(insertIndex);
                                            }
                                        }
                                    }
                                }
                            });

                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});

                            if (payload.reply) reply({ success: true });
                        } else {
                            if (payload.reply) reply({ success: false });
                        }
                        break;
                    case "Set-MessageAttachments":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newAttachments] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].attachments = newAttachments;
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {delay: 50});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-Message-Messages":
                        if (payload.msgId && payload.value) {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            if (!messagesRef.current[payload.msgId]) {
                                reply({success: false});
                                return;
                            }
                            if (messagesRef.current[payload.msgId].messages.includes(payload.value)) {
                                reply({success: false});
                                return;
                            }
                            const newMessages = produce(messagesRef.current, draft => {
                                draft[payload.msgId].messages = [...draft[payload.msgId].messages, payload.value];
                                if (payload.switch) {
                                    draft[payload.msgId].nextMessage = payload.value;
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            if (messagesRef.current[payload.value].nextMessage) {
                                emitEvent({
                                    type: "widget",
                                    target: "ChatPage",
                                    payload: {
                                        command: "Set-SwitchingMessage",
                                        value: payload.value
                                    },
                                    markId: chatMarkId,
                                    fromWebsocket: true,
                                    notReplyToWebsocket: true
                                }).then(() => {
                                    loadSwitchMessage(payload.msgId, payload.value).then(() => {
                                        emitEvent({
                                            type: "widget",
                                            target: "ChatPage",
                                            payload: {
                                                command: "Set-SwitchingMessage",
                                                value: null
                                            },
                                            markId: chatMarkId,
                                            fromWebsocket: true,
                                            notReplyToWebsocket: true
                                        })
                                        scrollToBottomAfterRender(wasAutoScroll, {delay: 50});
                                    });
                                });
                            } else {
                                scrollToBottomAfterRender(wasAutoScroll, {delay: 50});
                            }
                            reply({success: true});
                        }
                        break;
                    case "Load-Switch-Message":
                        emitEvent({
                            type: "widget",
                            target: "ChatPage",
                            payload: {
                                command: "Set-SwitchingMessage",
                                value: payload.nextMessage
                            },
                            markId: chatMarkId,
                            fromWebsocket: true,
                            notReplyToWebsocket: true
                        }).then(() => {
                            loadSwitchMessage(payload.msgId, payload.nextMessage).then(() => {
                                emitEvent({
                                    type: "widget",
                                    target: "ChatPage",
                                    payload: {
                                        command: "Set-SwitchingMessage",
                                        value: null
                                    },
                                    markId: chatMarkId,
                                    fromWebsocket: true,
                                    notReplyToWebsocket: true
                                })
                            });
                        });
                        break;
                    case "Reload-Messages":
                        setRandomMark(generateUUID());
                        break;
                    case "Re-Messages-Loaded":
                        emitMessagesLoaded();
                        break;
                    case "Add-MessageNodes":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, newNodes] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].network = mergeNetworkData(
                                            draft[msgId].network,
                                            {nodes: Array.isArray(newNodes) ? newNodes : []}
                                        );
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Add-MessageNetwork":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, networkUpdate] of Object.entries(payload.value)) {
                                    if (draft[msgId] && networkUpdate && typeof networkUpdate === 'object') {
                                        draft[msgId].network = mergeNetworkData(
                                            draft[msgId].network,
                                            networkUpdate
                                        );
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});

                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Del-MessageNetwork":
                        if (payload.value && typeof payload.value === 'object') {
                            const wasAutoScroll = isAutoScrollEnabledRef.current;
                            updateStreamingStatus();

                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, networkDelete] of Object.entries(payload.value)) {
                                    if (draft[msgId] && networkDelete && typeof networkDelete === 'object') {
                                        const network = draft[msgId].network;

                                        if (!network) {
                                            continue;
                                        }

                                        if (networkDelete.nodes !== undefined) {
                                            const deleteNodeKeys = toDeleteKeySet(networkDelete.nodes, getNodeMergeKey);

                                            if (Array.isArray(network.nodes) && deleteNodeKeys.size > 0) {
                                                network.nodes = network.nodes.filter(
                                                    node => !deleteNodeKeys.has(getNodeMergeKey(node))
                                                );
                                            }
                                        }

                                        const normalizedNetworkDelete = normalizeNetworkData(networkDelete);
                                        if (normalizedNetworkDelete.relationships !== undefined) {
                                            const deleteRelKeys = toDeleteKeySet(normalizedNetworkDelete.relationships, getRelationshipMergeKey);

                                            if (Array.isArray(network.relationships) && deleteRelKeys.size > 0) {
                                                network.relationships = network.relationships.filter(
                                                    rel => !deleteRelKeys.has(getRelationshipMergeKey(rel))
                                                );
                                            }
                                        }
                                    }
                                }
                            });

                            setMessages(newMessages);
                            messagesRef.current = newMessages;

                            scrollToBottomAfterRender(wasAutoScroll, {streaming: true});

                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case "Focus-MessageNetwork":
                        if (payload.value && typeof payload.value === 'object') {
                            for (const [msgId, nodeIds] of Object.entries(payload.value)) {
                                const msg = messagesRef.current[msgId];

                                if (msg && nodeIds) {

                                    const nvlInstance = msg.getComponent("nvlInstance");

                                    // 将需要聚焦的节点挂载到 msg 中
                                    msg.registerComponent("focusNode", nodeIds);

                                    if (nvlInstance) {
                                        if (typeof nvlInstance.focusNetwork === 'function') {
                                            nvlInstance.focusNetwork(nodeIds);
                                            // 如果成功了，就取消挂载
                                            msg.unregisterComponent("focusNode");
                                        }
                                    } else {
                                        reply({success: false})
                                    }

                                }
                            }

                            if (payload.reply) reply({success: true});
                        } else {
                            if (payload.reply) reply({success: false});
                        }
                        break;
                }
            });
        const unsubscribe2 = onEvent({
            type: "websocket",
            target: "onopen",
            markId: chatMarkId
        }).then(() => {
            if (isMessageLoadedRef.current) emitMessagesLoaded();
        });
        const unsubscribe3 = onEvent({
            type: "speech",
            target: "ChatPage",
            markId: chatMarkId
        }).then(({payload, reply}) => {
            handleBackendSpeechEvent(payload, reply);
        });
        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    }, [chatMarkId, checkScrollPosition, requestScrollToBottom, scrollToBottomAfterRender, smoothScrollToBottom, updateStreamingStatus, setMessages, loadSwitchMessage, handleSpeakMessageRequest, cancelActiveSpeech, pauseActiveSpeech, resumeActiveSpeech, updateSpeechRate, seekSpeechSegment, handleBackendSpeechEvent]);

    useEffect(() => {
        return () => {
            cancelActiveSpeech(true);
        };
    }, [cancelActiveSpeech]);

    useEffect(() => {
        isNewMarkIdRef.current = isNewMarkId;
    }, [isNewMarkId]);

    useEffect(() => {
        if (chatMarkId === null || chatMarkId === undefined) {
            const emptyMessages = {};
            setMessages(emptyMessages);
            messagesRef.current = emptyMessages;
            const emptyOrder = [];
            setMessagesOrder(emptyOrder);
            messagesOrderRef.current = emptyOrder;
            setIsLoadingError(false);
            errorToastsIds.current.forEach((id) => {
                toast.dismiss(id);
            });
        }
    }, [chatMarkId, setMessages]);

    useEffect(() => {
        if (isNewMarkIdRef.current) {
            setIsNewMarkId(false);
            return;
        }
        let modelsData = [];
        const requestConversation = async () => {
            try {
                let data = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT + "/" + chatMarkId);
                const foundModel = modelsData.find(item => item.id === data.model)
                if (foundModel) setSelectedModel(foundModel);
                if (data.options) {
                    setAdvancedSettings(data.options);
                }
                if (data.defaultOptions) {
                    setAdvancedSettingsValues(data.defaultOptions);
                    setInitialSettingValues(data.defaultOptions);
                }
            } catch (error) {
                toast.error(t("load_conversation_error", {message: error?.message || t("unknown_error")}));
            }
        }
        const requestModels = async () => {
            try {
                modelsData = await apiClient.get(apiEndpoint.CHAT_MODELS_ENDPOINT, {
                    params: {markId: chatMarkId}
                });
                setModels(modelsData);
                if (modelsData.length > 0) {
                    setSelectedModel(modelsData[0]);
                    if (modelsData[0].options) {
                        setAdvancedSettings(modelsData[0].options);
                    }
                }
            } catch (error) {
                toast.error(t("load_models_error", {message: error?.message || t("unknown_error")}));
            }
        };
        const requestMessages = async () => {
            try {
                const messagesData = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: chatMarkId}
                });

                const messages = produce(messagesData.messages, (draft) => {
                    Object.keys(draft).forEach(key => {
                        const msgDraft = draft[key];

                        // 防御：确保是有效消息对象
                        if (!msgDraft || typeof msgDraft !== 'object') return;

                        // === 幂等判断，防止重复注入 ===
                        if (typeof msgDraft.registerComponent === 'function') return;

                        // 真正的存储容器（闭包变量，不会被 Immer freeze/revoke）
                        const mountPoints = {};

                        // 添加注册函数
                        msgDraft.registerComponent = (componentKey, componentRef) => {
                            mountPoints[componentKey] = componentRef;
                        };

                        // 添加注销函数
                        msgDraft.unregisterComponent = (componentKey) => {
                            delete mountPoints[componentKey];
                        };

                        // 添加获取函数
                        msgDraft.getComponent = (componentKey) => {
                            return mountPoints[componentKey];
                        };
                    });
                });

                setMessages(messages);
                messagesRef.current = messages;

                let initOrder = messagesData.messagesOrder;
                if (messagesData.haveMore) initOrder = ["<PREV_MORE>", ...messagesData.messagesOrder];
                setMessagesOrder(initOrder);
                messagesOrderRef.current = initOrder;

                setTimeout(() => {
                    setTimeout(() => {
                        userAutoScrollUnlockUntilRef.current = 0;
                        isAutoScrollEnabledRef.current = true;
                        pendingScrollRef.current = true;
                        markProgrammaticScroll(700);
                        checkScrollPosition(true);
                        executePendingScroll();
                        const container = messagesContainerRef.current;
                        if (container) {
                            const {scrollHeight, clientHeight} = container;
                            const shouldShowButton = scrollHeight > clientHeight + 100;
                            setShowScrollToBottomButton(shouldShowButton);
                        }
                    }, 50);
                }, 100);
                emitMessagesLoaded();
            } catch (error) {
                errorToastsIds.current.set(toast(t("load_messages_error", {message: error?.message || t("unknown_error")}), {
                    action: {
                        label: t("retry"),
                        onClick: () => {
                            setIsLoading(true);
                            setIsLoadingError(false);
                            loadData();
                        },
                    },
                    closeButton: true,
                    duration: Infinity,
                }), true);
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
                setTimeout(() => {
                    if (messagesContainerRef.current) {
                        const container = messagesContainerRef.current;
                        const {scrollHeight} = container;
                        markProgrammaticScroll(700);
                        container.scrollTo({
                            top: scrollHeight,
                            behavior: 'auto'
                        });
                    }
                }, 200);
            }
        };
        const loadData = async () => {
            isLoadingDataRef.current = true;
            setIsLoading(true);
            await requestModels();
            await requestConversation();
            await requestMessages();
            isLoadingDataRef.current = false;
        };
        if (chatMarkId && !isLoadingDataRef.current) {
            setIsLoading(true);
            loadData();
        } else {
            setIsLoading(false);
            requestModels();
        }
        setIsLoadingError(false);
        setIsFirstMessageSend(true);
    }, [chatMarkId, randomMark, setMessages, t]);

    const handleSidebarToggle = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    return (
        <>
            <motion.div
                ref={windowRef}
                className={`flex overflow-hidden bg-white ${
                    isWindowMode ? 'shadow-2xl border-2 border-gray-300' : ''
                }`}
                animate={{
                    left: isWindowMode ? windowPos.left : 0,
                    top: isWindowMode ? windowPos.top : 0,
                    width: isWindowMode ? windowDimensions.width : '100%',
                    height: isWindowMode ? windowDimensions.height : '100%',
                    borderRadius: isWindowMode ? 16 : 0,
                    scale: isWindowMode && isDragReady ? 1.02 : (visible ? 1 : 0.95),
                    opacity: visible ? 1 : 0,
                    boxShadow: isWindowMode
                        ? (isDragReady ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 30px -5px rgba(0, 0, 0, 0.2)')
                        : 'none'
                }}
                style={{
                    position: isWindowMode ? 'fixed' : 'relative',
                    zIndex: isWindowMode ? 9999 : 0,
                    pointerEvents: visible ? 'auto' : 'none',
                    width: isWindowMode ? undefined : '100%',
                    height: isWindowMode ? undefined : '100%',
                }}
                initial={false}
                layout={isReady}
                transition={
                    (isResizing || isDragging)
                        ? {duration: 0}
                        : {
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1],
                            layout: {
                                duration: 0.35
                            },
                            width: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                restDelta: 0.5
                            },
                            left: {type: "tween", duration: isResizing || isDragging ? 0 : 0.35},
                            top: {type: "tween", duration: isResizing || isDragging ? 0 : 0.35},
                            opacity: {duration: 0.25},
                            scale: {duration: 0.25}
                        }
                }
            >
                <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden" ref={chatPageRef}>
                    <ChatHeader
                        models={models}
                        selectedModel={selectedModel}
                        isModelPopoverOpen={isModelPopoverOpen}
                        previewModel={previewModel}
                        isMobile={isMobile}
                        t={t}
                        handlePopoverOpenChange={handlePopoverOpenChange}
                        handleModelItemClick={handleModelItemClick}
                        handleModelItemMouseEnter={handleModelItemMouseEnter}
                        scrollToSelectedItem={scrollToSelectedItem}
                        handleSidebarToggle={handleSidebarToggle}
                        isWindowMode={isWindowMode}
                        handleDragMouseDown={handleDragMouseDown}
                        handleDragTouchStart={handleDragTouchStart}
                        handleDragTouchMove={handleDragTouchMove}
                        handleDragTouchEnd={handleDragTouchEnd}
                        isDragReady={isDragReady}
                        showWindowButton={showWindowButton}
                        onToggleWindow={toggleWindowMode}
                        showMinimizeButton={showMinimizeButton}
                        onMinimize={onMinimize}
                    />

                    <div className="flex-1 w-full relative overflow-hidden">
                        <div
                            ref={messagesContainerRef}
                            className="h-full overflow-y-auto pb-20 scroll-smooth pretty-scrollbar"
                            style={{maxHeight: 'calc(120vh - 256px)'}}
                        >
                            <MessageContainer
                                key={chatMarkId}
                                messagesOrder={messagesOrder}
                                messages={messages}
                                onLoadMore={loadMoreHistory}
                                onSwitchMessage={switchMessage}
                                markId={chatMarkId}
                                speechState={speechState}
                            />
                        </div>
                        {isLoading && <LoadingScreen t={t}/>}
                        {isLoadingError && <LoadingFailedScreen t={t}/>}
                    </div>

                    <ScrollToBottomButton
                        isVisible={showScrollToBottomButton}
                        chatBoxHeight={chatBoxHeight}
                        onClick={handleManualScrollToBottomClick}
                    />

                    <div className="absolute z-10 inset-x-0 bottom-10 pointer-events-none">
                        <SpeechPlayer
                            speechState={speechState}
                            message={speechState?.messageId ? messages?.[speechState.messageId] : null}
                            autoFollowEnabled={speechAutoFollowEnabled}
                            onAutoFollowToggle={handleSpeechAutoFollowToggle}
                            onPause={pauseActiveSpeech}
                            onResume={resumeActiveSpeech}
                            onStop={() => cancelActiveSpeech(true)}
                            onPrevious={() => seekSpeechSegment(-1)}
                            onNext={() => seekSpeechSegment(1)}
                            onRateChange={updateSpeechRate}
                            t={t}
                        />
                        <ChatBox
                            onSendMessage={handleSendMessage}
                            markId={chatMarkId}
                            attachmentsMeta={attachments}
                            setAttachments={setAttachments}
                            onAttachmentRemove={onAttachmentRemove}
                            uploadFiles={uploadFiles}
                            FilePickerCallback={handleFilePicker}
                            PicPickerCallback={handlePicPicker}
                            onImagePaste={handleImagePaste}
                            onRetryUpload={handleRetryUpload}
                            onCancelUpload={handleCancelUpload}
                            onDropFiles={handleSelectedFiles}
                            onFolderDetected={handleFolderDetected}
                            onHeightChange={handleChatBoxHeightChange}
                            dropTargetRef={chatPageRef}
                            selectedModel={selectedModel}
                            windowRef={windowRef}
                            isWindowMode={isWindowMode}
                        />
                    </div>

                    <footer
                        className="absolute inset-x-0 bottom-0 h-14 bg-white flex items-center justify-center ml-5 mr-5">
                        <span className="text-xs text-gray-500">
                          © {new Date().getFullYear()} lovePikachu. All rights reserved.
                        </span>
                    </footer>
                </div>

                <RightSidebar
                    isOpen={isSidebarOpen}
                    onClose={handleSidebarToggle}
                    advancedSettings={advancedSettings}
                    initialSettingValues={initialSettingValues || advancedSettingsValues}
                    onSettingChange={(values) => {
                        setAdvancedSettingsValues(values);
                        setInitialSettingValues(null);
                    }}
                    t={t}
                    containerRef={chatPageRef}
                    isWindowMode={isWindowMode}
                />
                {isWindowMode && (
                    <ResizeHandles
                        onResizeMouseDown={handleResizeMouseDown}
                        onResizeTouchStart={handleResizeTouchStart}
                    />
                )}
            </motion.div>

            {isWindowMode && (isDragging || isResizing) && (
                <div
                    className="fixed inset-0 bg-transparent pointer-events-auto z-[9998]"
                    style={{
                        cursor: ghostCursor,
                    }}
                />
            )}

            <DeleteConfirmDialog
                open={showDeleteConfirm}
                onOpenChange={(open) => {
                    setShowDeleteConfirm(open);

                    if (!open) {
                        setPendingDeleteMsgId(null);
                    }
                }}
                isDeleting={isDeletingMessage}
                title={t("confirm_delete_title")}
                description={t("confirm_delete_description")}
                cancelText={t("cancel")}
                confirmText={t("confirm")}
                onConfirm={() => {
                    if (!pendingDeleteMsgId) {
                        setShowDeleteConfirm(false);
                        return;
                    }

                    setIsDeletingMessage(true);

                    apiClient.delete(apiEndpoint.CHAT_MESSAGES_ENDPOINT + "/" + pendingDeleteMsgId,
                        {params: {markId: chatMarkId}}
                    )
                        .then((data) => {
                            deleteMessageLocally(pendingDeleteMsgId);
                        })
                        .catch((error) => {
                            toast.error(t("delete_error", {message: error?.message || t("unknown_error")}));
                        })

                    setIsDeletingMessage(false);
                    setPendingDeleteMsgId(null);
                    setShowDeleteConfirm(false);
                }}
            />
        </>
    );
}

export default ChatPage;