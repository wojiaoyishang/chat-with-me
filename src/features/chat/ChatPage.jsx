import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useImmer} from 'use-immer';
import {produce} from 'immer';
import {
    generateUUID,
    getLocalSetting,
    MESSAGE_NAVIGATOR_SETTING_KEY,
    useIsMobile,
    useLocalSetting,
} from '@/lib/tools.jsx';
import {toast} from 'sonner';
import {motion} from 'framer-motion';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';
import {useTranslation} from 'react-i18next';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';
import RuntimeInspectorDialog from '@/features/chat/page/components/RuntimeInspectorDialog.jsx';
import QuickUserMessageNavigator from '@/features/chat/page/components/QuickUserMessageNavigator.jsx';
import StoryReader from '@/features/story/StoryReader.jsx';
import TaskMonitorHost from '@/components/markdown/card-block/task/TaskMonitorHost.jsx';
import {followTaskMonitorCard} from '@/components/markdown/card-block/task/useTaskMonitorStore.js';
import {clearWorkspaceTransfers, upsertWorkspaceTransfer} from '@/features/workspace/useWorkspaceTransferStore.js';
import {getVisionAttachmentIds, normalizeAttachmentList} from './attachmentVision.js';
import {normalizeRemoteChatModel} from './modelCapabilities.js';
import {WidgetPresentationProvider} from './widgets/WidgetPresentationContext.jsx';
import {RealtimeVoiceSurface, useRealtimeVoiceConversation} from './voice/index.js';
import {useBrowserBackLayer} from '@/lib/browserHistoryLayers.js';
import {
    getMessageSummaryAppendCursor,
    mergeMessageSummaryItems,
} from '@/features/chat/page/utils/messageSummaries.js';

import {
    ChatBox,
    ChatHeader,
    LoadingFailedScreen,
    LoadingScreen,
    MessageContainer,
    ResizeHandles,
    RightSidebar,
    ScrollToBottomButton,
    SpeechPlayer,
    SpeechSubtitleOverlay,
    getNodeMergeKey,
    getRelationshipMergeKey,
    mergeNetworkData,
    normalizeNetworkData,
    toDeleteKeySet,
    useChatScroll,
    useChatWindowMode,
    useFileUpload,
    useChatSpeech,
} from '@/features/chat';

const VOICE_RECOGNITION_ENGINE_SETTING_KEY = 'VoiceRecognitionEngine';
const VOICE_RECOGNITION_LANGUAGE_SETTING_KEY = 'VoiceRecognitionLanguage';
const MESSAGE_SUMMARY_PAGE_SIZE = 500;
const HISTORY_PAGE_SIZE = 20;
const HISTORY_JUMP_BEFORE = 12;
const HISTORY_JUMP_AFTER = 32;
const HISTORY_AUTO_LOAD_ROOT_MARGIN = '260px 0px 0px 0px';
const CHAT_BOOTSTRAP_TIMEOUT_MS = 30000;

const normalizeVoiceRecognitionEngine = (value) => {
    return String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote';
};

const getBrowserSpeechRecognitionConstructor = () => {
    if (typeof window === 'undefined') return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const normalizeSpeechRecognitionLanguage = (language) => {
    const value = String(language || '').trim();
    if (!value) return 'en-US';
    if (value.toLowerCase().startsWith('zh')) return 'zh-CN';
    if (value.toLowerCase().startsWith('en')) return 'en-US';
    return value;
};


const ASR_AUDIO_MIME_TYPE = 'audio/mpeg';
const ASR_DEFAULT_TIMEOUT_MS = 5000;
const ASR_POLL_INTERVAL_MS = 1000;

const sleep = (delay) => new Promise((resolve) => {
    const timer = typeof window !== 'undefined' ? window.setTimeout : setTimeout;
    timer(resolve, delay);
});

const getAsrEndpoint = () => String(apiEndpoint?.ASR_ENDPOINT || '').trim();

const joinAsrTaskEndpoint = (endpoint, id) => {
    const baseEndpoint = String(endpoint || '').replace(/\/+$/, '');
    return `${baseEndpoint}/${encodeURIComponent(String(id))}`;
};

const hasAsrText = (data) => (
    data &&
    typeof data === 'object' &&
    Object.prototype.hasOwnProperty.call(data, 'text') &&
    data.text !== null &&
    data.text !== undefined
);

const isAsrFinished = (data) => data?.finish === true || hasAsrText(data);

const getAsrTextResult = (data) => {
    if (!hasAsrText(data)) return null;
    return {text: String(data.text ?? '')};
};

const getAsrTimeout = (data) => {
    const timeout = Number(data?.timeout);
    return Number.isFinite(timeout) && timeout >= 0 ? timeout : ASR_DEFAULT_TIMEOUT_MS;
};

const getPcm16kRequestBody = (payload) => {
    const buffer = payload?.pcm16kBuffer;

    if (buffer instanceof ArrayBuffer) {
        return typeof Blob !== 'undefined'
            ? new Blob([buffer], {type: ASR_AUDIO_MIME_TYPE})
            : buffer;
    }

    if (ArrayBuffer.isView(payload?.pcm16k)) {
        const pcm16k = payload.pcm16k;
        const pcmBuffer = pcm16k.buffer.slice(pcm16k.byteOffset, pcm16k.byteOffset + pcm16k.byteLength);
        return typeof Blob !== 'undefined'
            ? new Blob([pcmBuffer], {type: ASR_AUDIO_MIME_TYPE})
            : pcmBuffer;
    }

    if (payload?.blob) {
        return payload.blob;
    }

    return null;
};

const translateWithFallback = (t, key, fallback, options) => {
    const translated = t(key, options);
    return translated && translated !== key ? translated : fallback;
};

const getReplacementPayloadContent = (entry) => {
    if (typeof entry === 'string') return entry;
    if (!entry || typeof entry !== 'object') return '';
    return entry.frontend ?? entry.content ?? entry.value ?? '';
};

const collectLiveTaskModeCardIds = (messageOrReplacementUpdates) => {
    const cardIds = [];
    const seen = new Set();

    Object.values(messageOrReplacementUpdates || {}).forEach((outerValue) => {
        if (!outerValue || typeof outerValue !== 'object') return;

        const replacementMap = outerValue?.extraInfo?.replace
            || outerValue?.extra_info?.replace
            || outerValue;
        if (!replacementMap || typeof replacementMap !== 'object') return;

        Object.entries(replacementMap).forEach(([replacementId, entry]) => {
            const cardId = String(replacementId || '').trim();
            const rawContent = String(getReplacementPayloadContent(entry) || '');
            if (!cardId || seen.has(cardId)) return;

            // Task Mode cards are the only replacements carrying both markers.
            // A sealed historical segment also carries TASK_SEGMENT_DONE and must
            // never steal an already-open monitor from the newly-created segment.
            if (!/\[TASK_STATUS:[^\]\r\n]+\]/i.test(rawContent)) return;
            if (!/\[TASK_RUN_ID:[^\]\r\n]+\]/i.test(rawContent)) return;
            if (/\[TASK_SEGMENT_DONE:true\]/i.test(rawContent)) return;

            seen.add(cardId);
            cardIds.push(cardId);
        });
    });

    return cardIds;
};


// ========== 主组件 ==========
function ChatPage({
                      conversationId,
                      documentId,
                      pageType,
                      onNewConversationId,
                      showWindowButton = true,
                      showMinimizeButton = false,   // 是否显示最小化按钮（默认为 false）
                      onMinimize,                   // 最小化按钮点击回调
                      visible = true,               // 是否显示整个 ChatPage（默认为 true，变化时带动画）
                      onWindowModeChange,           // 窗口化模式变化回调
                      settingsRefreshVersions = {}, // 设置页关闭后按 scope 触发的定向刷新版本
                  }) {
    const {t, i18n} = useTranslation();
    const chatPageRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const currentTurnIdempotencyKeyRef = useRef(generateUUID());
    const messagesLoadedIdempotencyKeyRef = useRef(generateUUID());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [loadingStage, setLoadingStage] = useState('messages');
    const loadingStageRef = useRef('messages');
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
    const [randomMark, setRandomMark] = useState(null);
    const errorToastsIds = useRef(new Map());
    const isMessageLoadedRef = useRef(false);
    const isLoadingDataRef = useRef(false);

    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesRef = useRef({});
    const messagesOrderRef = useRef([]);

    const [showQuickUserMessageNavigator] = useLocalSetting(
        MESSAGE_NAVIGATOR_SETTING_KEY,
        true
    );
    const [messageSummaries, setMessageSummaries] = useState([]);
    const [messageSummaryLoading, setMessageSummaryLoading] = useState(false);
    const [runtimeInspectorOpen, setRuntimeInspectorOpen] = useState(false);
    const [runtimeInspectorDocument, setRuntimeInspectorDocument] = useState(null);
    const [runtimeInspectorLoading, setRuntimeInspectorLoading] = useState(false);
    const [runtimeInspectorError, setRuntimeInspectorError] = useState('');
    const runtimeInspectorRequestVersionRef = useRef(0);
    const [activeVisibleMessageId, setActiveVisibleMessageId] = useState(null);
    const [highlightedMessageId, setHighlightedMessageId] = useState(null);
    const [isMessageNavigatorWide, setIsMessageNavigatorWide] = useState(true);
    const summaryRequestVersionRef = useRef(0);
    const messageSummariesRef = useRef([]);
    const messageSummaryFingerprintRef = useRef(null);
    const messageSummaryTailIdRef = useRef(null);
    const historyNavigationLockedRef = useRef(false);
    const restoreLatestMessagesRef = useRef(null);
    const historyLoadInFlightRef = useRef(null);
    const [isLoadingMoreHistory, setIsLoadingMoreHistory] = useState(false);
    const [historyAutoLoadReady, setHistoryAutoLoadReady] = useState(false);

    const isMobile = useIsMobile();
    const [previewModel, setPreviewModel] = useState(null);
    const [isNewConversationId, setIsNewConversationId] = useState(false);
    const isNewConversationIdRef = useRef(false);
    const activeConversationIdRef = useRef(conversationId);
    activeConversationIdRef.current = conversationId;
    const previousConversationIdRef = useRef(conversationId);
    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({name: t("no_models")});
    const selectedModelRef = useRef(selectedModel);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [advancedSettings, setAdvancedSettings] = useState([]);
    const [initialSettingValues, setInitialSettingValues] = useState({});
    const [advancedSettingsValues, setAdvancedSettingsValues] = useState({});
    const [widgetChatBoxHostElement, setWidgetChatBoxHostElement] = useState(null);
    const [settingsInstanceKey, setSettingsInstanceKey] = useState(() => `conversationless-${Date.now()}`);
    const [conversationMeta, setConversationMeta] = useState(null);
    const [contextCompactionState, setContextCompactionState] = useState({});
    const contextCompactionClearTimerRef = useRef(null);
    const [stories, setStories] = useState([]);
    const [storyReaderOpen, setStoryReaderOpen] = useState(false);
    const [activeStory, setActiveStory] = useState(null);

    useEffect(() => {
        selectedModelRef.current = selectedModel;
    }, [selectedModel]);

    useEffect(() => () => {
        if (contextCompactionClearTimerRef.current) {
            clearTimeout(contextCompactionClearTimerRef.current);
            contextCompactionClearTimerRef.current = null;
        }
    }, []);

    const applyContextCompactionState = useCallback((nextState) => {
        const normalized = nextState && typeof nextState === 'object' ? nextState : {};
        if (contextCompactionClearTimerRef.current) {
            clearTimeout(contextCompactionClearTimerRef.current);
            contextCompactionClearTimerRef.current = null;
        }
        setContextCompactionState(normalized);
        const status = String(normalized?.status || '').toLowerCase();
        if (['completed', 'failed', 'discarded'].includes(status)) {
            const delay = status === 'completed' ? 1800 : 800;
            contextCompactionClearTimerRef.current = setTimeout(() => {
                setContextCompactionState((current) => (
                    current?.jobId && normalized?.jobId && current.jobId !== normalized.jobId
                        ? current
                        : {}
                ));
                contextCompactionClearTimerRef.current = null;
            }, delay);
        }
    }, []);

    // 删除相关
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDeleteMsgId, setPendingDeleteMsgId] = useState(null);
    const [isDeletingMessage, setIsDeletingMessage] = useState(false);

    // 语音识别相关：ChatBox 负责采集真实音频和 16k PCM，ChatPage 负责最终识别/上传处理。
    const activeVoiceRecognitionEngineRef = useRef('remote');
    const browserSpeechRecognitionRef = useRef(null);



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

    const decorateMessages = useCallback((sourceMessages = {}) => produce(sourceMessages, (draft) => {
        Object.keys(draft || {}).forEach((key) => {
            const msgDraft = draft[key];
            if (!msgDraft || typeof msgDraft !== 'object') return;
            if (typeof msgDraft.registerComponent === 'function') return;

            const mountPoints = {};
            msgDraft.registerComponent = (componentKey, componentRef) => {
                mountPoints[componentKey] = componentRef;
            };
            msgDraft.unregisterComponent = (componentKey) => {
                delete mountPoints[componentKey];
            };
            msgDraft.getComponent = (componentKey) => mountPoints[componentKey];
        });
    }), []);

    const loadMessageSummaries = useCallback(async ({silent = false, append = false} = {}) => {
        if (!conversationId) {
            setMessageSummaries([]);
            messageSummariesRef.current = [];
            messageSummaryFingerprintRef.current = null;
            messageSummaryTailIdRef.current = null;
            return [];
        }

        const requestVersion = summaryRequestVersionRef.current + 1;
        summaryRequestVersionRef.current = requestVersion;
        if (!silent) setMessageSummaryLoading(true);

        try {
            const collected = [];
            const existingItems = append ? messageSummariesRef.current : [];
            let cursor = append
                ? getMessageSummaryAppendCursor(existingItems)
                : 0;
            let fingerprint = null;
            do {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGE_SUMMARIES_ENDPOINT, {
                    params: {
                        conversationId: conversationId,
                        scope: 'active',
                        cursor,
                        limit: MESSAGE_SUMMARY_PAGE_SIZE,
                        previewChars: 120,
                    }
                });
                if (requestVersion !== summaryRequestVersionRef.current) return [];
                collected.push(...(data.items || []));
                fingerprint = data.orderFingerprint || fingerprint;
                cursor = data.nextCursor;
            } while (cursor !== null && cursor !== undefined);

            if (append && collected.length === 0) {
                if (fingerprint) {
                    messageSummaryFingerprintRef.current = fingerprint;
                }
                return existingItems;
            }

            const nextItems = mergeMessageSummaryItems(existingItems, collected, {append});

            setMessageSummaries(nextItems);
            messageSummariesRef.current = nextItems;
            messageSummaryFingerprintRef.current = fingerprint;
            messageSummaryTailIdRef.current = nextItems[nextItems.length - 1]?.messageId || null;
            return nextItems;
        } catch (error) {
            if (!silent) {
                toast.error(t('load_message_summaries_failed') || error?.message || '加载消息概览失败');
            }
            return [];
        } finally {
            if (requestVersion === summaryRequestVersionRef.current) {
                setMessageSummaryLoading(false);
            }
        }
    }, [conversationId, t]);

    const loadRuntimeInspector = useCallback(async ({silent = false, focusMessageId = null} = {}) => {
        if (!conversationId) {
            setRuntimeInspectorDocument(null);
            setRuntimeInspectorError('');
            return null;
        }
        const requestVersion = runtimeInspectorRequestVersionRef.current + 1;
        runtimeInspectorRequestVersionRef.current = requestVersion;
        if (!silent) setRuntimeInspectorLoading(true);
        setRuntimeInspectorError('');
        try {
            const data = await apiClient.get(apiEndpoint.CHAT_RUNTIME_INSPECTOR_ENDPOINT, {
                params: {
                    conversationId,
                    ...(focusMessageId ? {focusMessageId} : {}),
                },
            });
            if (requestVersion !== runtimeInspectorRequestVersionRef.current) return null;
            setRuntimeInspectorDocument(data || null);
            return data || null;
        } catch (error) {
            if (requestVersion !== runtimeInspectorRequestVersionRef.current) return null;
            setRuntimeInspectorError(error?.message || '加载 Runtime Inspector 失败');
            return null;
        } finally {
            if (requestVersion === runtimeInspectorRequestVersionRef.current) {
                setRuntimeInspectorLoading(false);
            }
        }
    }, [conversationId]);

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
        setAdvancedSettings(Array.isArray(model?.options) ? model.options : []);
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
    } = useFileUpload({conversationId, t});

    const getDefaultVoiceRecognitionEngine = useCallback(() => {
        return normalizeVoiceRecognitionEngine(
            getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote')
        );
    }, []);

    const getDefaultVoiceRecognitionLanguage = useCallback(() => {
        const fallbackLanguage = i18n?.language || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
        return normalizeSpeechRecognitionLanguage(
            getLocalSetting(VOICE_RECOGNITION_LANGUAGE_SETTING_KEY, fallbackLanguage)
        );
    }, [i18n?.language]);

    const stopBrowserSpeechRecognition = useCallback(({cancel = false} = {}) => {
        const current = browserSpeechRecognitionRef.current;
        if (!current) {
            return Promise.resolve({text: '', error: null});
        }

        browserSpeechRecognitionRef.current = null;
        const {recognition, session} = current;

        return new Promise((resolve) => {
            let settled = false;
            const settle = () => {
                if (settled) return;
                settled = true;
                window.clearTimeout?.(timer);
                const text = cancel ? '' : `${session.finalTranscript} ${session.interimTranscript}`.trim();
                resolve({text, error: session.error});
            };

            const timer = window.setTimeout?.(settle, 900);
            recognition.onend = settle;

            try {
                if (cancel) {
                    recognition.abort();
                } else {
                    recognition.stop();
                }
            } catch (error) {
                session.error = error;
                settle();
            }
        });
    }, []);

    const startBrowserSpeechRecognition = useCallback(() => {
        const SpeechRecognitionConstructor = getBrowserSpeechRecognitionConstructor();
        if (!SpeechRecognitionConstructor) {
            toast.error(t('voice_input_local_recognition_unsupported'));
            return false;
        }

        // 防止上一次异常残留的识别实例继续占用麦克风。
        stopBrowserSpeechRecognition({cancel: true});

        const recognition = new SpeechRecognitionConstructor();
        const session = {
            finalTranscript: '',
            interimTranscript: '',
            error: null,
        };

        recognition.lang = getDefaultVoiceRecognitionLanguage();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            let interimTranscript = '';

            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                const result = event.results[index];
                const transcript = result?.[0]?.transcript || '';

                if (result?.isFinal) {
                    session.finalTranscript = `${session.finalTranscript} ${transcript}`.trim();
                } else {
                    interimTranscript = `${interimTranscript} ${transcript}`.trim();
                }
            }

            session.interimTranscript = interimTranscript;
        };

        recognition.onerror = (event) => {
            session.error = event?.error || event;
        };

        recognition.onend = () => {};

        try {
            recognition.start();
        } catch (error) {
            session.error = error;
            toast.error(t('voice_input_local_recognition_failed'));
            return false;
        }

        browserSpeechRecognitionRef.current = {recognition, session};
        return true;
    }, [getDefaultVoiceRecognitionLanguage, stopBrowserSpeechRecognition, t]);

    const handleVoiceRecordingStart = useCallback(() => {
        const engine = getDefaultVoiceRecognitionEngine();
        activeVoiceRecognitionEngineRef.current = engine;

        if (engine !== 'local') {
            return {engine: 'remote'};
        }

        const started = startBrowserSpeechRecognition();
        if (!started) {
            // 浏览器不支持 Web Speech API 或启动失败时，不打断录音，保留 PCM 给 remote 流程兜底。
            activeVoiceRecognitionEngineRef.current = 'remote';
            return {engine: 'remote', fallback: true};
        }

        return {engine: 'local'};
    }, [getDefaultVoiceRecognitionEngine, startBrowserSpeechRecognition]);

    const handleRemoteVoicePcmReady = useCallback(async (payload) => {
        const endpoint = getAsrEndpoint();
        if (!endpoint) {
            toast.error(translateWithFallback(
                t,
                'voice_input_remote_recognition_not_configured',
                'Remote voice recognition endpoint is not configured.'
            ));
            return null;
        }

        const requestBody = getPcm16kRequestBody(payload);
        if (!requestBody) {
            toast.error(translateWithFallback(
                t,
                'voice_input_remote_recognition_no_audio',
                'No valid voice recording was captured. Please try again.'
            ));
            return null;
        }

        try {
            const initialData = await apiClient.post(endpoint, requestBody, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': ASR_AUDIO_MIME_TYPE,
                },
            });

            const initialTextResult = getAsrTextResult(initialData);
            if (initialTextResult) {
                return initialTextResult;
            }

            if (isAsrFinished(initialData)) {
                return null;
            }

            const taskId = initialData?.id;
            if (!taskId) {
                throw new Error('ASR task id is missing.');
            }

            const timeout = getAsrTimeout(initialData);
            const pollingDeadline = Date.now() + timeout;
            const pollingEndpoint = joinAsrTaskEndpoint(endpoint, taskId);

            while (Date.now() < pollingDeadline) {
                await sleep(Math.min(ASR_POLL_INTERVAL_MS, Math.max(0, pollingDeadline - Date.now())));

                const pollingData = await apiClient.get(pollingEndpoint);
                const pollingTextResult = getAsrTextResult(pollingData);
                if (pollingTextResult) {
                    return pollingTextResult;
                }

                if (isAsrFinished(pollingData)) {
                    return null;
                }
            }

            toast.info(translateWithFallback(
                t,
                'voice_input_remote_recognition_timeout',
                'Voice recognition is still processing. Please try again.'
            ));
            return null;
        } catch (error) {
            console.error('Remote voice recognition failed:', error);
            toast.error(translateWithFallback(
                t,
                'voice_input_remote_recognition_failed',
                `Remote voice recognition failed: ${error?.message || t('unknown_error')}`,
                {message: error?.message || t('unknown_error')}
            ));
            return null;
        }
    }, [t]);

    const handleVoicePcmReady = useCallback(async (payload) => {
        const engine = activeVoiceRecognitionEngineRef.current || getDefaultVoiceRecognitionEngine();

        if (engine === 'local') {
            const {text, error} = await stopBrowserSpeechRecognition({cancel: false});
            activeVoiceRecognitionEngineRef.current = 'remote';

            if (text) {
                return {text};
            }

            if (error && !['aborted', 'no-speech'].includes(String(error))) {
                toast.error(t('voice_input_local_recognition_failed'));
            } else {
                toast.info(t('voice_input_no_speech_detected'));
            }

            return null;
        }

        activeVoiceRecognitionEngineRef.current = 'remote';
        return handleRemoteVoicePcmReady(payload);
    }, [getDefaultVoiceRecognitionEngine, handleRemoteVoicePcmReady, stopBrowserSpeechRecognition, t]);

    const handleVoiceRecordingCancel = useCallback(() => {
        stopBrowserSpeechRecognition({cancel: true});
        activeVoiceRecognitionEngineRef.current = 'remote';
    }, [stopBrowserSpeechRecognition]);

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
        return historyNavigationLockedRef.current || Date.now() < userAutoScrollUnlockUntilRef.current;
    }, []);

    const markProgrammaticScroll = useCallback((duration = 450) => {
        userScrollStateRef.current.programmaticScrollUntil = Date.now() + duration;
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
        if (historyNavigationLockedRef.current) return;
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
        if (historyNavigationLockedRef.current && restoreLatestMessagesRef.current) {
            restoreLatestMessagesRef.current();
            return;
        }
        userAutoScrollUnlockUntilRef.current = 0;
        isAutoScrollEnabledRef.current = true;
        pendingScrollRef.current = true;
        markProgrammaticScroll(700);
        handleScrollToBottomClick();
    }, [handleScrollToBottomClick, isAutoScrollEnabledRef, markProgrammaticScroll, pendingScrollRef]);

    const {
        speechState,
        speechAutoFollowEnabled,
        speechSubtitlesEnabled,
        speechFollowProgrammaticScrollUntilRef,
        handleSpeechAutoFollowToggle,
        handleSpeechTextClick,
        handleSpeakMessageRequest,
        handleSpeakContentRequest,
        beginStreamingSpeech,
        syncStreamingSpeech,
        requestStreamingSpeechFinalize,
        cancelStreamingSpeech,
        getStreamingSpeechSnapshot,
        handleBackendSpeechEvent,
        cancelActiveSpeech,
        pauseActiveSpeech,
        resumeActiveSpeech,
        updateSpeechRate,
        updateSpeechSubtitlesEnabled,
        updateBrowserSpeechVoice,
        browserSpeechVoices,
        selectedBrowserSpeechVoiceURI,
        seekSpeechSegment,
        disableSpeechAutoFollowByUser,
    } = useChatSpeech({
        conversationId,
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
    });

    const realtimeVoice = useRealtimeVoiceConversation({
        conversationId,
        speechState,
        beginStreamingSpeech,
        requestStreamingSpeechFinalize,
        cancelStreamingSpeech,
        getStreamingSpeechSnapshot,
        pauseActiveSpeech,
        resumeActiveSpeech,
        cancelActiveSpeech,
    });

    // Message deltas, replacement deltas and the final readonly=false snapshot all
    // converge through the existing message state. Streaming TTS only needs one
    // synchronization point instead of adding another websocket/event pipeline.
    useEffect(() => {
        syncStreamingSpeech();
    }, [messages, syncStreamingSpeech]);

    const loadStories = useCallback(async () => {
        if (!conversationId) {
            setStories([]);
            return [];
        }
        try {
            const data = await apiClient.get(apiEndpoint.CHAT_STORIES_ENDPOINT, {params: {conversationId: conversationId}});
            const values = Array.isArray(data?.stories) ? data.stories : [];
            setStories(values);
            return values;
        } catch (error) {
            console.error('Load stories failed:', error);
            return [];
        }
    }, [conversationId]);

    const openStory = useCallback(async (storyId) => {
        if (!conversationId || !storyId) return;
        try {
            const data = await apiClient.get(`${apiEndpoint.CHAT_STORIES_ENDPOINT}/${storyId}`, {
                params: {conversationId: conversationId, includeParts: true},
            });
            if (data?.story) {
                setActiveStory(data.story);
                setStoryReaderOpen(true);
            }
        } catch (error) {
            toast.error(t('story_load_failed', {defaultValue: '无法打开故事：{{message}}', message: error?.message || t('unknown_error')}));
        }
    }, [conversationId, t]);

    const renameStory = useCallback(async (storyId, title) => {
        if (!conversationId || !storyId) return null;
        try {
            const data = await apiClient.patch(
                `${apiEndpoint.CHAT_STORIES_ENDPOINT}/${storyId}`,
                {title},
                {params: {conversationId: conversationId}},
            );
            const nextStory = data?.story;
            if (nextStory) {
                setStories(current => current.map(item => Number(item.storyId) === Number(storyId) ? {...item, ...nextStory} : item));
                setActiveStory(current => Number(current?.storyId) === Number(storyId) ? {...current, ...nextStory} : current);
            }
            toast.success(t('story_rename_success', '故事已重命名'));
            return nextStory;
        } catch (error) {
            toast.error(t('story_rename_failed', {defaultValue: '重命名失败：{{message}}', message: error?.message || t('unknown_error')}));
            throw error;
        }
    }, [conversationId, t]);

    const deleteStory = useCallback(async (storyId) => {
        if (!conversationId || !storyId) return false;
        try {
            await apiClient.delete(`${apiEndpoint.CHAT_STORIES_ENDPOINT}/${storyId}`, {params: {conversationId: conversationId}});
            setStories(current => current.filter(item => Number(item.storyId) !== Number(storyId)));
            setActiveStory(current => {
                if (Number(current?.storyId) === Number(storyId)) {
                    setStoryReaderOpen(false);
                    return null;
                }
                return current;
            });
            toast.success(t('story_delete_success', '故事已删除'));
            return true;
        } catch (error) {
            toast.error(t('story_delete_failed', {defaultValue: '删除失败：{{message}}', message: error?.message || t('unknown_error')}));
            throw error;
        }
    }, [conversationId, t]);

    const speakStoryPart = useCallback((story, part) => {
        if (!story || !part) return false;
        const text = [part.title, part.bodyMarkdown].filter(Boolean).join('\n\n');
        return handleSpeakContentRequest({
            messageId: `story:${story.storyId}:part:${part.partId}`,
            text,
        });
    }, [handleSpeakContentRequest]);

    const stopStorySpeech = useCallback(() => {
        cancelActiveSpeech(true);
    }, [cancelActiveSpeech]);

    useEffect(() => {
        loadStories();
        setStoryReaderOpen(false);
        setActiveStory(null);
    }, [conversationId, loadStories]);

    useEffect(() => onEvent({
        event: ['story.open', 'story.changed', 'story.deleted', 'story.permissions.changed'],
        conversationId,
        includeGlobal: true,
    }).then(({event, payload}) => {
        const value = payload?.value || {};
        if (event === 'story.open') {
            openStory(value.storyId);
            return;
        }
        if (event === 'story.deleted') {
            const deletedId = Number(value.storyId);
            setStories(current => current.filter(item => Number(item.storyId) !== deletedId));
            setActiveStory(current => {
                if (Number(current?.storyId) === deletedId) {
                    setStoryReaderOpen(false);
                    return null;
                }
                return current;
            });
            return;
        }

        const incomingStory = value.story || value;
        if (!incomingStory?.storyId) return;
        const operation = payload?.operation || null;

        // 故事广播是用户级资源事件；是否可见、是否可编辑仍由当前
        // Conversation 的服务端快照决定，不能从发送方权限推断。
        if (
            event === 'story.permissions.changed'
            || ['created', 'renamed'].includes(operation)
        ) {
            void loadStories().then(values => {
                setActiveStory(current => {
                    if (!current?.storyId) return current;
                    const visible = values.some(item => Number(item.storyId) === Number(current.storyId));
                    if (!visible) {
                        setStoryReaderOpen(false);
                        return null;
                    }
                    return current;
                });
            });
        }

        setStories(current => {
            const index = current.findIndex(item => Number(item.storyId) === Number(incomingStory.storyId));
            if (index < 0) return current;
            const next = [...current];
            const merged = {...next[index], ...incomingStory};
            if (incomingStory.canEdit === undefined && next[index].canEdit !== undefined) {
                merged.canEdit = next[index].canEdit;
            }
            next[index] = merged;
            return next;
        });
        setActiveStory(current => {
            if (Number(current?.storyId) !== Number(incomingStory.storyId)) return current;
            const next = {...current, ...incomingStory};
            if (incomingStory.canEdit === undefined && current.canEdit !== undefined) {
                next.canEdit = current.canEdit;
            }
            if (operation === 'part_appended' && value.part) {
                const existing = Array.isArray(current.parts) ? current.parts : [];
                next.parts = [...existing.filter(item => item.partId !== value.part.partId), value.part]
                    .sort((a, b) => a.sequence - b.sequence);
            } else if (operation === 'part_updated' && value.part) {
                next.parts = (current.parts || []).map(item => item.partId === value.part.partId ? value.part : item);
            }
            return next;
        });
    }), [conversationId, loadStories, openStory]);



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
            role,
            admissionPolicy = 'auto',
            inputSource = 'chat',
            restartTaskRunId = '',
            restartTaskMessageId = '',
            idempotencyKey = '',
        }
    ) => {
        if (uploadFiles.length !== 0) {
            toast.error(t("file_upload_not_complete"));
            return;
        }
        const outboundAttachments = normalizeAttachmentList(attachments);
        const sendMessage = (conversationId) => {
            if (isFirstMessageSend) {
                emitEvent({
                    event: 'sidebar.conversation.date_changed',
                    localOnly: true,
                    payload: {},
                    conversationId: conversationId,
                });
                setIsFirstMessageSend(false);
            }
            const eventPayload = {
                event: 'turn.start',
                turnId: generateUUID(),
                payload: {
                    content: messageContent,
                    toolsStatus: toolsStatus,
                    attachments: outboundAttachments,
                    visionAttachmentIds: getVisionAttachmentIds(outboundAttachments),
                    isEdit: isEditMessage,
                    model: selectedModel.id,
                    sendButtonStatus: sendButtonStatus,
                    isRegenerate: isRegenerate,
                    isProgenerate: isProgenerate,
                    isFork: isFork,
                    role: role,
                    options: advancedSettingsValues,
                    pageType: pageType,
                    documentId: documentId,
                    admissionPolicy: admissionPolicy,
                    inputSource: inputSource,
                    idempotencyKey: idempotencyKey || currentTurnIdempotencyKeyRef.current,
                    restartTaskRunId: restartTaskRunId || undefined,
                    restartTaskMessageId: restartTaskMessageId || undefined,
                },
                conversationId: conversationId,
                documentId: documentId,
            };
            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }
            return emitEvent(eventPayload).then((payload) => {
                if (payload.success) {
                    currentTurnIdempotencyKeyRef.current = generateUUID();
                } else {
                    toast.error(t("send_message_error", {message: payload.value}));
                }
                // Always expose the authoritative conversation used for this Turn.
                // A brand-new conversation is created inside this callback before the
                // parent ChatBox receives the updated conversationId prop, so callers
                // must not rely on a later React effect to rewrite pending draft state.
                return {
                    ...payload,
                    conversationId,
                };
            });
        };
        if (!conversationId) {
            return emitEvent({
                event: 'conversation.create',
                payload: {
                    idempotencyKey: currentTurnIdempotencyKeyRef.current
                }
            })
                .then((payload) => {
                    if (payload.success) {
                        // Mark this synchronously before the parent updates conversationId.
                        // The conversationId effect uses it to preserve the pending Workspace
                        // and advanced settings selected for the conversation being created.
                        isNewConversationIdRef.current = true;
                        setIsNewConversationId(true);
                        onNewConversationId(payload.value);
                        return sendMessage(payload.value);
                    } else {
                        throw new Error(payload.value);
                    }
                })
                .catch((error) => {
                    toast.error(t("get_conversation_id_error", {message: error?.message}));
                    return {success: false, value: error?.message || String(error)};
                });
        } else {
            return sendMessage(conversationId);
        }
    }, [conversationId, documentId, isFirstMessageSend, selectedModel, advancedSettingsValues, pageType, t, uploadFiles, onNewConversationId]);

    const handleRealtimeVoiceStart = useCallback(async ({toolsStatus = {}, composerStatus = 'normal'} = {}) => {
        if (!selectedModel?.id) {
            toast.error(t('no_models', {defaultValue: '没有可用模型'}));
            return;
        }
        if (uploadFiles.length !== 0) {
            toast.error(t('file_upload_not_complete'));
            return;
        }
        if (composerStatus === 'loading' || composerStatus === 'disabled') {
            toast.error(t('realtime_voice_composer_busy', {defaultValue: '当前对话正在切换状态，暂时无法启动实时语音。'}));
            return;
        }

        const startForConversation = async (targetConversationId) => {
            await realtimeVoice.start({
                conversationId: targetConversationId,
                model: selectedModel.id,
                toolsStatus,
                options: advancedSettingsValues,
                pageType,
                documentId,
                ttsEngine: advancedSettingsValues?.speakEngine || 'browser',
                composerStatus,
            });
        };

        try {
            // Desktop Realtime Voice is an embedded right dock. Reuse the existing
            // conversation sidebar slot instead of squeezing two right-side panels.
            setIsSidebarOpen(false);
            if (conversationId) {
                await startForConversation(conversationId);
                return;
            }
            const payload = await emitEvent({
                event: 'conversation.create',
                payload: {idempotencyKey: currentTurnIdempotencyKeyRef.current},
            });
            // emitEvent is a thenable; await resolves its reply payload.
            if (!payload?.success) throw new Error(payload?.value || 'Unable to create conversation');
            isNewConversationIdRef.current = true;
            setIsNewConversationId(true);
            onNewConversationId(payload.value);
            await startForConversation(payload.value);
        } catch (error) {
            toast.error(error?.message || '无法启动实时语音');
        }
    }, [advancedSettingsValues, conversationId, documentId, onNewConversationId, pageType, realtimeVoice, selectedModel, t, uploadFiles.length]);

    const loadMoreHistory = useCallback(async () => {
        if (historyLoadInFlightRef.current) return historyLoadInFlightRef.current;

        const currentOrder = messagesOrderRef.current;
        const firstLoadedMessageId = currentOrder[0] === '<PREV_MORE>' ? currentOrder[1] : null;
        if (!conversationId || !firstLoadedMessageId) return false;

        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight ?? 0;
        const previousScrollTop = container?.scrollTop ?? 0;

        isAutoScrollEnabledRef.current = false;
        pendingScrollRef.current = false;
        setIsLoadingMoreHistory(true);

        const request = (async () => {
            const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                params: {
                    conversationId: conversationId,
                    prevId: firstLoadedMessageId,
                    limit: HISTORY_PAGE_SIZE,
                }
            });
            if (activeConversationIdRef.current !== conversationId) return false;

            const latestOrder = messagesOrderRef.current;
            const loadedOrder = latestOrder[0] === '<PREV_MORE>' ? latestOrder.slice(1) : latestOrder;
            const loadedIds = new Set(loadedOrder);
            const prependedOrder = (data.messagesOrder || []).filter(messageId => !loadedIds.has(messageId));
            const nextOrder = data.haveMore
                ? ['<PREV_MORE>', ...prependedOrder, ...loadedOrder]
                : [...prependedOrder, ...loadedOrder];
            const nextMessages = {
                ...messagesRef.current,
                ...decorateMessages(data.messages || {}),
            };

            messagesRef.current = nextMessages;
            messagesOrderRef.current = nextOrder;
            setMessages(nextMessages);
            setMessagesOrder(nextOrder);

            await new Promise(resolve => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
            });

            if (container && messagesContainerRef.current === container) {
                const addedHeight = Math.max(0, container.scrollHeight - previousScrollHeight);
                markProgrammaticScroll(350);
                container.scrollTop = previousScrollTop + addedHeight;
                userScrollStateRef.current.lastScrollTop = container.scrollTop;
                checkScrollPosition(true);
            }
            return true;
        })().finally(() => {
            if (historyLoadInFlightRef.current === request) {
                historyLoadInFlightRef.current = null;
            }
            if (activeConversationIdRef.current === conversationId) {
                setIsLoadingMoreHistory(false);
            }
        });

        historyLoadInFlightRef.current = request;
        return request;
    }, [
        conversationId,
        checkScrollPosition,
        decorateMessages,
        isAutoScrollEnabledRef,
        markProgrammaticScroll,
        pendingScrollRef,
        setMessages,
    ]);

    useEffect(() => {
        if (!historyAutoLoadReady || !conversationId || messagesOrder[0] !== '<PREV_MORE>') {
            return undefined;
        }

        const container = messagesContainerRef.current;
        const sentinel = container?.querySelector('[data-history-load-sentinel="true"]');
        if (!container || !sentinel || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            loadMoreHistory().catch((error) => {
                toast.error(t('load_more_error', {message: error?.message || t('unknown_error')}));
            });
        }, {
            root: container,
            rootMargin: HISTORY_AUTO_LOAD_ROOT_MARGIN,
            threshold: 0.01,
        });

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [conversationId, historyAutoLoadReady, loadMoreHistory, messagesOrder, t]);

    const scrollToRenderedMessage = useCallback((messageId, behavior = 'smooth') => {
        const container = messagesContainerRef.current;
        if (!container || !messageId) return false;
        const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(String(messageId)) : String(messageId);
        const element = container.querySelector(`[data-message-id="${escaped}"]`);
        if (!element) return false;

        historyNavigationLockedRef.current = true;
        isAutoScrollEnabledRef.current = false;
        pendingScrollRef.current = false;
        setShowScrollToBottomButton(true);
        setActiveVisibleMessageId(String(messageId));
        setHighlightedMessageId(String(messageId));
        element.scrollIntoView({behavior, block: 'center'});
        window.setTimeout(() => {
            setHighlightedMessageId(current => current === String(messageId) ? null : current);
        }, 1800);
        return true;
    }, [isAutoScrollEnabledRef, pendingScrollRef, setShowScrollToBottomButton]);

    const restoreLatestMessages = useCallback(async () => {
        if (!conversationId) return false;
        try {
            const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                params: {conversationId: conversationId, limit: HISTORY_PAGE_SIZE}
            });
            const decorated = decorateMessages(data.messages || {});
            const nextMessages = {...messagesRef.current, ...decorated};
            const nextOrder = data.haveMore
                ? ['<PREV_MORE>', ...(data.messagesOrder || [])]
                : [...(data.messagesOrder || [])];

            messagesRef.current = nextMessages;
            messagesOrderRef.current = nextOrder;
            setMessages(nextMessages);
            setMessagesOrder(nextOrder);
            historyNavigationLockedRef.current = false;
            userAutoScrollUnlockUntilRef.current = 0;
            isAutoScrollEnabledRef.current = true;
            pendingScrollRef.current = true;
            setHighlightedMessageId(null);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    markProgrammaticScroll(700);
                    executePendingScroll();
                    checkScrollPosition(true);
                    setHistoryAutoLoadReady(true);
                });
            });
            return true;
        } catch (error) {
            toast.error(t('load_messages_error', {message: error?.message || t('unknown_error')}));
            return false;
        }
    }, [
        conversationId,
        checkScrollPosition,
        decorateMessages,
        executePendingScroll,
        isAutoScrollEnabledRef,
        markProgrammaticScroll,
        pendingScrollRef,
        setMessages,
        t,
    ]);

    useEffect(() => {
        restoreLatestMessagesRef.current = restoreLatestMessages;
        return () => {
            if (restoreLatestMessagesRef.current === restoreLatestMessages) {
                restoreLatestMessagesRef.current = null;
            }
        };
    }, [restoreLatestMessages]);

    const jumpToMessage = useCallback(async (messageId) => {
        if (!messageId) return false;
        setRuntimeInspectorOpen(false);

        if (scrollToRenderedMessage(messageId)) return true;

        const loadTargetWindow = async (summaryItems, expectedOrderFingerprint) => {
            const summaryIndex = summaryItems.findIndex(item => item.messageId === messageId);
            if (summaryIndex < 0) {
                throw new Error(t('jump_to_message_failed') || '跳转消息失败');
            }

            const start = Math.max(0, summaryIndex - HISTORY_JUMP_BEFORE);
            const end = Math.min(summaryItems.length, summaryIndex + HISTORY_JUMP_AFTER + 1);
            const messageIds = summaryItems.slice(start, end).map(item => item.messageId);
            const data = await apiClient.post(apiEndpoint.CHAT_MESSAGES_BATCH_ENDPOINT, {
                conversationId: conversationId,
                messageIds,
                expectedOrderFingerprint,
                requireContiguous: true,
            });
            const decorated = decorateMessages(data.messages || {});
            const nextMessages = {...messagesRef.current, ...decorated};
            const nextOrder = data.haveMoreBefore
                ? ['<PREV_MORE>', ...(data.messagesOrder || [])]
                : [...(data.messagesOrder || [])];

            messagesRef.current = nextMessages;
            messagesOrderRef.current = nextOrder;
            setMessages(nextMessages);
            setMessagesOrder(nextOrder);
            historyNavigationLockedRef.current = true;
            isAutoScrollEnabledRef.current = false;
            pendingScrollRef.current = false;
            setHistoryAutoLoadReady(true);
            setShowScrollToBottomButton(true);
            if (data.orderFingerprint) {
                messageSummaryFingerprintRef.current = data.orderFingerprint;
            }

            await new Promise(resolve => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
            });
            if (!scrollToRenderedMessage(messageId, 'auto')) {
                throw new Error(t('jump_to_message_failed') || '跳转消息失败');
            }
            return true;
        };

        try {
            let summaryItems = messageSummariesRef.current;
            if (!summaryItems.some(item => item.messageId === messageId)) {
                summaryItems = await loadMessageSummaries();
            }

            try {
                return await loadTargetWindow(summaryItems, messageSummaryFingerprintRef.current);
            } catch (error) {
                if (Number(error?.code) !== 409) throw error;
                const refreshedItems = await loadMessageSummaries({silent: true});
                return await loadTargetWindow(refreshedItems, messageSummaryFingerprintRef.current);
            }
        } catch (error) {
            toast.error(error?.message || t('jump_to_message_failed') || '跳转消息失败');
            return false;
        }
    }, [
        conversationId,
        decorateMessages,
        isAutoScrollEnabledRef,
        loadMessageSummaries,
        pendingScrollRef,
        scrollToRenderedMessage,
        setMessages,
        setShowScrollToBottomButton,
        t,
    ]);

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
                    params: {conversationId: conversationId, nextId: loadStartId},
                });
                finalMessagesMap = {
                    ...finalMessagesMap,
                    ...decorateMessages(data.messages || {}),
                };
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
    }, [conversationId, decorateMessages, t, setMessages]);

    const switchMessage = useCallback(async (msg, msgId, targetMessageOrDelta, options = {}) => {
        const currentIndex = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = typeof targetMessageOrDelta === 'number'
            ? msg.messages[currentIndex + targetMessageOrDelta]
            : targetMessageOrDelta;

        if (!newMsgId || newMsgId === msg.nextMessage) return true;

        const response = await emitEvent({
            event: 'conversation.branch.switch',
            payload: {
                msgId,
                nextMessage: newMsgId,
                expectedCurrentChildId: options.expectedCurrentChildId,
                expectedOrderFingerprint: options.expectedOrderFingerprint,
            },
            conversationId: conversationId
        });

        if (!response?.success) {
            const error = new Error(response?.value || t('switch_message_failed') || '切换消息失败');
            error.code = response?.code;
            throw error;
        }

        const loaded = await loadSwitchMessage(msgId, newMsgId);
        if (!loaded) return false;
        loadMessageSummaries({silent: true});
        return true;
    }, [conversationId, loadMessageSummaries, loadSwitchMessage, t]);

    const emitMessagesLoaded = () => {
        setTimeout(() => {
            isMessageLoadedRef.current = true;
            emitEvent({
                event: 'conversation.messages.loaded',
                payload: {
                    idempotencyKey: messagesLoadedIdempotencyKeyRef.current,
                    messagesOrder: messagesOrderRef.current[0] === '<PREV_MORE>' ? messagesOrderRef.current.slice(1) : messagesOrderRef.current
                },
                conversationId: conversationId,
                onTimeout: () => {
                    toast.warning(t("cannot_load_tasks"));
                }
            }).then((payload) => {
                if (payload.success) {
                    messagesLoadedIdempotencyKeyRef.current = generateUUID();
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
        setMessageSummaries([]);
        messageSummariesRef.current = [];
        messageSummaryFingerprintRef.current = null;
        messageSummaryTailIdRef.current = null;
        setActiveVisibleMessageId(null);
        setRuntimeInspectorOpen(false);
        setRuntimeInspectorDocument(null);
        setRuntimeInspectorError('');
        runtimeInspectorRequestVersionRef.current += 1;
        setHistoryAutoLoadReady(false);
        setIsLoadingMoreHistory(false);
        historyLoadInFlightRef.current = null;
        historyNavigationLockedRef.current = false;
        summaryRequestVersionRef.current += 1;
    }, [conversationId]);

    useEffect(() => {
        if (conversationId && showQuickUserMessageNavigator) {
            loadMessageSummaries({silent: true});
        }
    }, [conversationId, loadMessageSummaries, showQuickUserMessageNavigator]);

    const handleOpenRuntimeInspector = useCallback(() => {
        setRuntimeInspectorOpen(true);
        loadRuntimeInspector({focusMessageId: activeVisibleMessageId});
        if (!messageSummaryLoading) {
            loadMessageSummaries({
                silent: messageSummariesRef.current.length > 0,
            });
        }
    }, [activeVisibleMessageId, loadMessageSummaries, loadRuntimeInspector, messageSummaryLoading]);

    useEffect(() => {
        if (
            !conversationId
            || (!showQuickUserMessageNavigator && !runtimeInspectorOpen)
            || messageSummaryLoading
            || messageSummariesRef.current.length === 0
        ) return undefined;

        const renderedOrder = messagesOrder.filter(messageId => messageId !== '<PREV_MORE>');
        const renderedTailId = renderedOrder[renderedOrder.length - 1] || null;
        if (!renderedTailId || renderedTailId === messageSummaryTailIdRef.current) return undefined;

        let cancelled = false;
        const timer = window.setTimeout(() => {
            loadMessageSummaries({silent: true, append: true}).then((items) => {
                if (cancelled) return;
                const loadedTailId = items[items.length - 1]?.messageId || null;
                if (loadedTailId !== renderedTailId) {
                    loadMessageSummaries({silent: true});
                }
            });
        }, 350);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [
        conversationId,
        loadMessageSummaries,
        runtimeInspectorOpen,
        messageSummaryLoading,
        messagesOrder,
        showQuickUserMessageNavigator,
    ]);

    useEffect(() => {
        const host = chatPageRef.current;
        if (!host) return undefined;
        const measure = () => setIsMessageNavigatorWide(host.clientWidth >= 720);
        measure();
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
        observer?.observe(host);
        window.addEventListener('resize', measure);
        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [isWindowMode]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return undefined;
        let frameId = null;

        const updateActiveMessage = () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                const containerRect = container.getBoundingClientRect();
                const centerX = containerRect.left + containerRect.width / 2;
                const centerY = containerRect.top + containerRect.height / 2;
                const probeOffsets = [0, -48, 48, -96, 96, -160, 160];
                let activeId = null;

                for (const offset of probeOffsets) {
                    const probeY = Math.min(
                        containerRect.bottom - 1,
                        Math.max(containerRect.top + 1, centerY + offset),
                    );
                    const elements = document.elementsFromPoint(centerX, probeY);
                    const messageElement = elements
                        .map(element => element.closest?.('[data-message-id]'))
                        .find(element => element && container.contains(element));
                    if (messageElement) {
                        activeId = messageElement.getAttribute('data-message-id');
                        break;
                    }
                }

                if (activeId) {
                    setActiveVisibleMessageId(current => current === activeId ? current : activeId);
                }
            });
        };

        updateActiveMessage();
        container.addEventListener('scroll', updateActiveMessage, {passive: true});
        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateActiveMessage) : null;
        resizeObserver?.observe(container);
        return () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            container.removeEventListener('scroll', updateActiveMessage);
            resizeObserver?.disconnect();
        };
    }, [messagesOrder]);


    useEffect(() => {
        const unsubscribe1 = onEvent({
            event: [
                'message.*',
                'conversation.tree.changed',
                'conversation.deleted',
                'conversation.messages.reload_requested',
                'conversation.messages.reconciled',
                'turn.completed',
                'turn.cancelled',
                'turn.failed',
                'context.state.changed',
                'context.compaction_state.changed',
                'workspace.transfer.state_changed',
                'widget.state.changed',
                'speech.play.requested',
                'speech.stop.requested',
                'speech.pause.requested',
                'speech.resume.requested',
                'speech.rate.set',
                'speech.segment.previous',
                'speech.segment.next',
                'speech.segment.seek',
            ],
            conversationId,
        })
            .then(({event, payload, reply}) => {
                switch (event) {
                    case 'speech.play.requested':
                        handleSpeakMessageRequest(payload, reply);
                        break;
                    case 'speech.stop.requested':
                        cancelActiveSpeech(true);
                        reply({success: true});
                        break;
                    case 'speech.pause.requested':
                        reply({success: pauseActiveSpeech()});
                        break;
                    case 'speech.resume.requested':
                        reply({success: resumeActiveSpeech()});
                        break;
                    case 'speech.rate.set':
                        updateSpeechRate(payload.value ?? payload.rate);
                        reply({success: true});
                        break;
                    case 'speech.segment.previous':
                        reply({success: seekSpeechSegment(-1)});
                        break;
                    case 'speech.segment.next':
                        reply({success: seekSpeechSegment(1)});
                        break;
                    case 'speech.segment.seek':
                        reply({success: seekSpeechSegment({
                                segmentId: payload.segmentId,
                                segmentPosition: payload.segmentPosition,
                            }, {absolute: true})});
                        break;
                    case 'message.delete.requested':
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
                                    {params: {conversationId: conversationId}})
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
                    case 'message.created':
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

                                        // extraInfo 是增量协议的一部分。流式阶段可能只更新审计信息，
                                        // 不能覆盖已经累积的 replacement/task/context 等字段。
                                        if (oldMessage.extraInfo || incomingValue.extraInfo) {
                                            mergedMessage.extraInfo = {
                                                ...(oldMessage.extraInfo || {}),
                                                ...(incomingValue.extraInfo || {}),
                                            };
                                        }

                                        // network 必须做增量合并，避免message.created 的短快照覆盖 message.knowledge.network_added 已追加的数据。
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
                    case 'message.order.changed':
                        if (Array.isArray(payload.value) && payload.value.length > 0) {
                            scrollToBottomAfterRender(isAutoScrollEnabledRef.current, {delay: 50});
                            setMessagesOrder(payload.value);
                            messagesOrderRef.current = payload.value;
                            reply({value: payload.value});
                        } else {
                            reply({value: messagesOrderRef.current});
                        }
                        break;
                    case 'message.content.set':
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
                    case 'message.content.delta':
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
                    case 'message.replacement.set':
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
                            collectLiveTaskModeCardIds(payload.value).forEach((cardId) => {
                                followTaskMonitorCard(conversationId, cardId);
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            scrollToBottomAfterRender(wasAutoScroll, {delay: 50});
                            if (payload.reply) reply({success: true});
                        } else {
                            reply({success: false});
                        }
                        break;
                    case 'message.replacement.delta':
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
                    case 'workspace.transfer.state_changed': {
                        const transfer = payload.value;
                        if (transfer && typeof transfer === 'object' && transfer.transferId) {
                            upsertWorkspaceTransfer(transfer);
                            // Workspace 文件传输属于 AI 的工具执行过程。
                            // 前端继续维护附件/任务卡片中的传输状态，但不再用 Toast 打扰用户。
                            const artifactId = transfer.artifactId || transfer.serverId;
                            if (artifactId) {
                                setAttachments(current => current.map(attachment => {
                                    const currentArtifactId = attachment.artifactId || attachment.serverId;
                                    return currentArtifactId === artifactId
                                        ? {...attachment, workspaceTransfer: transfer}
                                        : attachment;
                                }));
                                const newMessages = produce(messagesRef.current, draft => {
                                    Object.values(draft).forEach(message => {
                                        if (!Array.isArray(message?.attachments)) return;
                                        message.attachments = message.attachments.map(attachment => {
                                            const currentArtifactId = attachment.artifactId || attachment.serverId;
                                            return currentArtifactId === artifactId
                                                ? {...attachment, workspaceTransfer: transfer}
                                                : attachment;
                                        });
                                    });
                                });
                                setMessages(newMessages);
                                messagesRef.current = newMessages;
                            }
                            if (payload.reply) reply({success: true});
                        } else if (payload.reply) {
                            reply({success: false});
                        }
                        break;
                    }
                    case 'message.attachments.set':
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
                    case 'message.background_tools.set':
                        if (payload.value && typeof payload.value === 'object') {
                            const newMessages = produce(messagesRef.current, draft => {
                                for (const [msgId, backgroundTools] of Object.entries(payload.value)) {
                                    if (draft[msgId]) {
                                        draft[msgId].backgroundTools = backgroundTools || {active: false};
                                    }
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                            if (payload.reply) reply({success: true});
                        } else if (payload.reply) {
                            reply({success: false});
                        }
                        break;
                    case 'message.children.changed':
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
                                    event: 'message.switching.changed',
                                    payload: {
                                        value: payload.value
                                    },
                                    conversationId: conversationId,
                                    localOnly: true,
                                }).then(() => {
                                    loadSwitchMessage(payload.msgId, payload.value).then(() => {
                                        emitEvent({
                                            event: 'message.switching.changed',
                                            payload: {
                                                value: null
                                            },
                                            conversationId: conversationId,
                                            localOnly: true,
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
                    case 'message.branch.loaded':
                        emitEvent({
                            event: 'message.switching.changed',
                            payload: {
                                value: payload.nextMessage
                            },
                            conversationId: conversationId,
                            localOnly: true,
                        }).then(() => {
                            loadSwitchMessage(payload.msgId, payload.nextMessage).then(() => {
                                emitEvent({
                                    event: 'message.switching.changed',
                                    payload: {
                                        value: null
                                    },
                                    conversationId: conversationId,
                                    localOnly: true,
                                })
                            });
                        });
                        break;
                    case 'widget.state.changed': {
                        const widget = payload.value && typeof payload.value === 'object' ? payload.value : {};
                        const messageId = String(widget.originMessageId || '');
                        const replacementId = String(widget.replacementId || '');
                        if (messageId && replacementId) {
                            const newMessages = produce(messagesRef.current, draft => {
                                const message = draft[messageId];
                                if (!message) return;
                                if (!message.extraInfo || typeof message.extraInfo !== 'object') message.extraInfo = {};
                                if (!message.extraInfo.replace || typeof message.extraInfo.replace !== 'object') {
                                    message.extraInfo.replace = {};
                                }
                                const current = message.extraInfo.replace[replacementId];
                                if (current && typeof current === 'object') {
                                    current.frontend = JSON.stringify(widget);
                                    current.type = 'widget';
                                } else {
                                    message.extraInfo.replace[replacementId] = {
                                        frontend: JSON.stringify(widget),
                                        type: 'widget',
                                    };
                                }
                            });
                            setMessages(newMessages);
                            messagesRef.current = newMessages;
                        }
                        if (payload.reply) reply({success: true});
                        break;
                    }
                    case 'context.compaction_state.changed': {
                        applyContextCompactionState(payload.value || {});
                        reply({success: true});
                        break;
                    }
                    case 'context.state.changed': {
                        const messageStates = payload.messageStates && typeof payload.messageStates === 'object'
                            ? payload.messageStates
                            : {};
                        const replacementStates = payload.replacementStates && typeof payload.replacementStates === 'object'
                            ? payload.replacementStates
                            : {};

                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [messageId, state] of Object.entries(messageStates)) {
                                if (!draft[messageId]) continue;
                                draft[messageId].contextState = state && typeof state === 'object' ? state : {};
                            }

                            for (const [messageId, replacements] of Object.entries(replacementStates)) {
                                const message = draft[messageId];
                                if (!message || !replacements || typeof replacements !== 'object') continue;
                                if (!message.extraInfo || typeof message.extraInfo !== 'object') message.extraInfo = {};
                                if (!message.extraInfo.replace || typeof message.extraInfo.replace !== 'object') {
                                    message.extraInfo.replace = {};
                                }

                                for (const [replacementId, contextStatus] of Object.entries(replacements)) {
                                    const current = message.extraInfo.replace[replacementId];
                                    if (current && typeof current === 'object') {
                                        current.contextStatus = contextStatus && typeof contextStatus === 'object'
                                            ? contextStatus
                                            : {};
                                    } else {
                                        message.extraInfo.replace[replacementId] = {
                                            frontend: typeof current === 'string' ? current : '',
                                            contextStatus: contextStatus && typeof contextStatus === 'object'
                                                ? contextStatus
                                                : {},
                                        };
                                    }
                                }
                            }
                        });

                        setMessages(newMessages);
                        messagesRef.current = newMessages;
                        if (payload.reply) reply({success: true});
                        break;
                    }
                    case 'turn.completed':
                    case 'turn.cancelled':
                    case 'turn.failed':
                        // 后端只会在最终消息写入数据库之后发送终态 Turn 事件。
                        // 重新读取摘要，替换生成开始时缓存下来的空 Assistant 占位。
                        if (
                            messageSummariesRef.current.length > 0
                            || showQuickUserMessageNavigator
                            || runtimeInspectorOpen
                        ) {
                            loadMessageSummaries({silent: true});
                        }
                        if (runtimeInspectorOpen) {
                            loadRuntimeInspector({silent: true});
                        }
                        if (payload.reply) reply({success: true});
                        break;
                    case 'conversation.tree.changed':
                        // AI 工具或其他客户端修改了对话树。统一重新加载当前活动分支，
                        // 避免本地 messagesOrder 与后端 treeRevision 不一致。
                        setRandomMark(generateUUID());
                        if (
                            messageSummariesRef.current.length > 0
                            || showQuickUserMessageNavigator
                            || runtimeInspectorOpen
                        ) {
                            loadMessageSummaries({silent: true});
                        }
                        if (runtimeInspectorOpen) {
                            loadRuntimeInspector({silent: true});
                        }
                        reply({success: true, treeRevision: payload.treeRevision});
                        break;
                    case 'conversation.deleted':
                        // 当前页面对应的子智能体会话已经被删除，返回会话列表。
                        reply({success: true});
                        window.location.assign('/chat');
                        break;
                    case 'conversation.messages.reload_requested':
                        setRandomMark(generateUUID());
                        break;
                    case 'conversation.messages.reconciled':
                        emitMessagesLoaded();
                        break;
                    case 'message.knowledge.nodes_added':
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
                    case 'message.knowledge.network_added':
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
                    case 'message.knowledge.network_removed':
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
                    case 'message.knowledge.focused':
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
            event: 'transport.connected',
        }).then(() => {
            if (isMessageLoadedRef.current) emitMessagesLoaded();
        });
        const unsubscribe3 = onEvent({
            event: 'speech.*',
            conversationId,
            direction: 'incoming',
        }).then(({event, payload, reply}) => {
            handleBackendSpeechEvent(event, payload, reply);
        });
        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    }, [conversationId, checkScrollPosition, requestScrollToBottom, scrollToBottomAfterRender, smoothScrollToBottom, updateStreamingStatus, setMessages, loadSwitchMessage, loadMessageSummaries, loadRuntimeInspector, showQuickUserMessageNavigator, runtimeInspectorOpen, handleSpeakMessageRequest, cancelActiveSpeech, pauseActiveSpeech, resumeActiveSpeech, updateSpeechRate, seekSpeechSegment, handleBackendSpeechEvent, applyContextCompactionState]);

    useEffect(() => {
        return () => {
            cancelActiveSpeech(true);
        };
    }, [cancelActiveSpeech]);

    useEffect(() => {
        isNewConversationIdRef.current = isNewConversationId;
    }, [isNewConversationId]);

    useEffect(() => {
        const previousConversationId = previousConversationIdRef.current;
        const isCreatingConversation = (
            !previousConversationId
            && Boolean(conversationId)
            && isNewConversationIdRef.current
        );
        previousConversationIdRef.current = conversationId;

        clearWorkspaceTransfers();
        setSettingsInstanceKey(`${conversationId ?? 'conversationless'}-${Date.now()}`);

        // A new conversation receives its conversationId before the first turn.start
        // finishes. Do not erase the pending Workspace/options during that
        // transition; they are the values sent with and persisted by the first
        // message. A real conversation switch still resets stale state first.
        if (!isCreatingConversation) {
            setInitialSettingValues({});
            setAdvancedSettingsValues({});
        } else {
            setInitialSettingValues(null);
        }
        setConversationMeta(null);
        applyContextCompactionState({});

        if (conversationId === null || conversationId === undefined) {
            setAdvancedSettings([]);
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
    }, [conversationId, setMessages, applyContextCompactionState]);

    useEffect(() => {
        if (!conversationId) return undefined;
        let cancelled = false;
        apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/transfers/${encodeURIComponent(conversationId)}`)
            .then((items) => {
                if (cancelled || !Array.isArray(items)) return;
                items.slice().reverse().forEach(upsertWorkspaceTransfer);
            })
            .catch(() => {
                // Workspace may not be initialized yet; chat loading should remain unaffected.
            });
        return () => {
            cancelled = true;
        };
    }, [conversationId]);

    const loadAvailableModels = useCallback(async ({preserveSelection = false, timeoutMs = null} = {}) => {
        try {
            const modelsData = await apiClient.get(apiEndpoint.CHAT_MODELS_ENDPOINT, {
                params: {conversationId: conversationId},
                ...(Number.isFinite(timeoutMs) ? {timeout: timeoutMs} : {}),
            });
            // Bind model capabilities to the remotely fetched model objects.
            // ChatBox receives selectedModel directly from this list, so keeping
            // support_vision here makes the eye toggle react to model refreshes
            // and model switches without a second settings request.
            const normalizedModels = Array.isArray(modelsData)
                ? modelsData.map(normalizeRemoteChatModel)
                : [];
            setModels(normalizedModels);

            if (normalizedModels.length === 0) {
                const emptyModel = {name: t("no_models")};
                selectedModelRef.current = emptyModel;
                setSelectedModel(emptyModel);
                setAdvancedSettings([]);
                return normalizedModels;
            }

            const currentModelId = preserveSelection ? selectedModelRef.current?.id : null;
            const nextModel = (currentModelId
                ? normalizedModels.find((item) => item.id === currentModelId)
                : null) || normalizedModels[0];

            selectedModelRef.current = nextModel;
            setSelectedModel(nextModel);
            setAdvancedSettings(Array.isArray(nextModel?.options) ? nextModel.options : []);
            return normalizedModels;
        } catch (error) {
            toast.error(t("load_models_error", {message: error?.message || t("unknown_error")}));
            return [];
        }
    }, [conversationId, t]);

    const modelSettingsRefreshRevision = Number(settingsRefreshVersions?.['chat.models'] || 0);
    const runtimeOptionsRefreshRevision = Number(settingsRefreshVersions?.['chat.runtime-options'] || 0);
    const lastSettingsModelRefreshRef = useRef(
        `${modelSettingsRefreshRevision}:${runtimeOptionsRefreshRevision}`
    );

    useEffect(() => {
        const refreshKey = `${modelSettingsRefreshRevision}:${runtimeOptionsRefreshRevision}`;
        if (lastSettingsModelRefreshRef.current === refreshKey) return;
        lastSettingsModelRefreshRef.current = refreshKey;
        loadAvailableModels({preserveSelection: true});
    }, [loadAvailableModels, modelSettingsRefreshRevision, runtimeOptionsRefreshRevision]);

    useEffect(() => {
        if (isNewConversationIdRef.current) {
            // The first message already carries the pending settings. Avoid a
            // racing GET that can replace them with defaults before persistence.
            isNewConversationIdRef.current = false;
            setIsNewConversationId(false);
            return;
        }
        let modelsData = [];
        const requestConversation = async () => {
            loadingStageRef.current = 'conversation';
            setLoadingStage('conversation');
            try {
                let data = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT + "/" + conversationId, {
                    timeout: CHAT_BOOTSTRAP_TIMEOUT_MS,
                });
                setConversationMeta(data);
                applyContextCompactionState(data?.contextCompactionState || {});
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
            loadingStageRef.current = 'models';
            setLoadingStage('models');
            modelsData = await loadAvailableModels({
                preserveSelection: false,
                timeoutMs: CHAT_BOOTSTRAP_TIMEOUT_MS,
            });
        };
        const requestMessages = async () => {
            loadingStageRef.current = 'messages';
            setLoadingStage('messages');
            try {
                setHistoryAutoLoadReady(false);
                const messagesData = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {conversationId: conversationId, limit: HISTORY_PAGE_SIZE},
                    timeout: CHAT_BOOTSTRAP_TIMEOUT_MS,
                });

                const messages = decorateMessages(messagesData.messages || {});

                setMessages(messages);
                messagesRef.current = messages;

                let initOrder = messagesData.messagesOrder;
                if (messagesData.haveMore) initOrder = ["<PREV_MORE>", ...messagesData.messagesOrder];
                setMessagesOrder(initOrder);
                messagesOrderRef.current = initOrder;
                historyNavigationLockedRef.current = false;

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
                        userAutoScrollUnlockUntilRef.current = 0;
                        isAutoScrollEnabledRef.current = true;
                        pendingScrollRef.current = true;
                        markProgrammaticScroll(1400);
                        executePendingScroll();
                    }
                    if (activeConversationIdRef.current === conversationId) {
                        setHistoryAutoLoadReady(true);
                    }
                }, 200);
            }
        };
        const loadData = async () => {
            isLoadingDataRef.current = true;
            setIsLoading(true);
            const startedAt = performance.now();
            try {
                await requestModels();
                await requestConversation();
                await requestMessages();
            } catch (error) {
                console.error('[Chat bootstrap] unexpected failure', {
                    conversationId,
                    stage: loadingStageRef.current,
                    elapsedMs: Math.round(performance.now() - startedAt),
                    error,
                });
                setIsLoadingError(true);
            } finally {
                isLoadingDataRef.current = false;
                setIsLoading(false);
            }
        };
        if (conversationId && !isLoadingDataRef.current) {
            setIsLoading(true);
            loadData();
        } else {
            setIsLoading(false);
            requestModels();
        }
        setIsLoadingError(false);
        setIsFirstMessageSend(true);
    }, [
        conversationId,
        executePendingScroll,
        isAutoScrollEnabledRef,
        loadAvailableModels,
        markProgrammaticScroll,
        pendingScrollRef,
        randomMark,
        setMessages,
        t,
    ]);

    const handleSidebarToggle = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    useBrowserBackLayer(isSidebarOpen, () => {
        setIsSidebarOpen(false);
        return true;
    }, {kind: 'chat-sidebar'});

    return (
        <WidgetPresentationProvider
            chatBoxHostElement={widgetChatBoxHostElement}
        >
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
                <div
                    className="flex-1 min-w-0 flex flex-col relative h-full w-full overflow-hidden"
                    ref={chatPageRef}
                    data-chat-page-root="true"
                    data-cwm-conversation-id={conversationId || ''}
                >
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
                        onOpenRuntimeInspector={handleOpenRuntimeInspector}
                        runtimeInspectorDisabled={!conversationId}
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
                        conversationMeta={conversationMeta}
                        contextCompactionState={contextCompactionState}
                        stories={stories}
                        onOpenStory={openStory}
                        onRenameStory={renameStory}
                        onDeleteStory={deleteStory}
                    />

                    <div className="flex-1 w-full relative overflow-hidden">
                        <div
                            ref={messagesContainerRef}
                            className="h-full overflow-y-auto pb-20 pretty-scrollbar"
                            style={{maxHeight: 'calc(120vh - 256px)'}}
                        >
                            <MessageContainer
                                key={conversationId}
                                messagesOrder={messagesOrder}
                                messages={messages}
                                onLoadMore={loadMoreHistory}
                                isLoadingMore={isLoadingMoreHistory}
                                onSwitchMessage={switchMessage}
                                conversationId={conversationId}
                                speechState={speechState}
                                onSpeechTextClick={handleSpeechTextClick}
                                highlightedMessageId={highlightedMessageId}
                            />
                        </div>

                        <TaskMonitorHost conversationId={conversationId}/>

                        <QuickUserMessageNavigator
                            items={messageSummaries}
                            activeMessageId={activeVisibleMessageId}
                            onSelect={jumpToMessage}
                            visible={Boolean(
                                conversationId &&
                                showQuickUserMessageNavigator &&
                                !isMobile &&
                                isMessageNavigatorWide
                            )}
                            t={t}
                        />

                        {isLoading && <LoadingScreen t={t} stage={loadingStage}/>}
                        {isLoadingError && <LoadingFailedScreen t={t}/>}
                    </div>

                    <ScrollToBottomButton
                        isVisible={showScrollToBottomButton}
                        chatBoxHeight={chatBoxHeight}
                        onClick={handleManualScrollToBottomClick}
                    />

                    <div className="absolute z-10 inset-x-0 bottom-10 pointer-events-none">
                        <SpeechSubtitleOverlay
                            speechState={speechState}
                            enabled={speechSubtitlesEnabled}
                            t={t}
                        />
                        <SpeechPlayer
                            speechState={speechState}
                            message={speechState?.messageId ? messages?.[speechState.messageId] : null}
                            autoFollowEnabled={speechAutoFollowEnabled}
                            onAutoFollowToggle={handleSpeechAutoFollowToggle}
                            subtitlesEnabled={speechSubtitlesEnabled}
                            onSubtitlesToggle={updateSpeechSubtitlesEnabled}
                            onPause={pauseActiveSpeech}
                            onResume={resumeActiveSpeech}
                            onStop={() => cancelActiveSpeech(true)}
                            onPrevious={() => seekSpeechSegment(-1)}
                            onNext={() => seekSpeechSegment(1)}
                            onRateChange={updateSpeechRate}
                            browserSpeechVoices={browserSpeechVoices}
                            selectedBrowserSpeechVoiceURI={selectedBrowserSpeechVoiceURI}
                            onBrowserSpeechVoiceChange={updateBrowserSpeechVoice}
                            t={t}
                        />
                        <div
                            ref={setWidgetChatBoxHostElement}
                            data-widget-chatbox-floating-host="true"
                            className="pointer-events-auto relative z-20 mx-auto w-full max-w-225 px-4"
                        />
                        <ChatBox
                            onSendMessage={handleSendMessage}
                            conversationId={conversationId}
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
                            editorHostRef={chatPageRef}
                            selectedModel={selectedModel}
                            isWindowMode={isWindowMode}
                            onVoiceRecordingStart={handleVoiceRecordingStart}
                            onVoicePcmReady={handleVoicePcmReady}
                            onVoiceRecordingCancel={handleVoiceRecordingCancel}
                            onRealtimeVoiceStart={handleRealtimeVoiceStart}
                            selectedWorkspaceIds={Array.isArray(advancedSettingsValues?.workspaceIds)
                                ? advancedSettingsValues.workspaceIds
                                : (advancedSettingsValues?.workspaceId ? [advancedSettingsValues.workspaceId] : [])}
                            onWorkspaceChange={(workspaceIds) => {
                                const normalized = Array.isArray(workspaceIds) ? workspaceIds : [];
                                setAdvancedSettingsValues(current => ({
                                    ...current,
                                    workspaceIds: normalized,
                                    workspaceId: normalized.length === 1 ? normalized[0] : null,
                                }));
                                setInitialSettingValues(null);
                            }}
                        />
                    </div>

                    <RuntimeInspectorDialog
                        open={runtimeInspectorOpen}
                        document={runtimeInspectorDocument}
                        loading={runtimeInspectorLoading}
                        error={runtimeInspectorError}
                        activeMessageId={activeVisibleMessageId}
                        onClose={() => setRuntimeInspectorOpen(false)}
                        onJumpToMessage={jumpToMessage}
                        onRefresh={() => loadRuntimeInspector({focusMessageId: activeVisibleMessageId})}
                    />

                    <footer
                        className="absolute inset-x-0 bottom-0 h-14 bg-white flex items-center justify-center ml-5 mr-5">
                        <span className="text-xs text-gray-500">
                          © {new Date().getFullYear()} lovePikachu. All rights reserved.
                        </span>
                    </footer>
                </div>

                <RealtimeVoiceSurface
                    state={realtimeVoice.state}
                    onEnd={() => realtimeVoice.stop()}
                    onMinimize={() => realtimeVoice.setMinimized(true)}
                    onRestore={() => realtimeVoice.setMinimized(false)}
                    onToggleMute={realtimeVoice.toggleMute}
                />

                <RightSidebar
                    isOpen={isSidebarOpen}
                    onClose={handleSidebarToggle}
                    advancedSettings={advancedSettings}
                    initialSettingValues={initialSettingValues || advancedSettingsValues}
                    settingsInstanceKey={settingsInstanceKey}
                    conversationId={conversationId}
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


            <StoryReader
                story={activeStory}
                open={storyReaderOpen}
                onClose={() => {
                    stopStorySpeech();
                    setStoryReaderOpen(false);
                }}
                onSpeakPart={speakStoryPart}
                onStopSpeech={stopStorySpeech}
                speechState={speechState}
                subtitlesEnabled={speechSubtitlesEnabled}
                onSubtitlesToggle={updateSpeechSubtitlesEnabled}
                t={t}
            />

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
                        {params: {conversationId: conversationId}}
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
        </WidgetPresentationProvider>
    );
}

export default ChatPage;
