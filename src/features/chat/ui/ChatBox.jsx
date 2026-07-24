import React, {useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, memo} from 'react';
import {useTranslation} from 'react-i18next';

import {toast} from 'sonner';
import {apiEndpoint} from '@/config.js';
import apiClient from '@/lib/apiClient';
import {getLocalSetting, setLocalSetting, useIsMobile} from '@/lib/tools.jsx';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';

import ChatBoxHeader from './ChatBoxHeader';
import ToolButtons from './ToolButtons';
import AttachmentShowcase from './AttachmentShowcase';
import FileUploadProgress from './FileUploadProgress';
import DropFileLayer from './DropFileLayer.jsx';
import MessageInput from './chatbox/components/MessageInput';
import EditMessageIndicator from './chatbox/components/EditMessageIndicator';
import SendButton from './chatbox/components/SendButton';
import VoiceInputButton from './chatbox/components/VoiceInputButton';
import VoicePermissionDialog from './chatbox/components/VoicePermissionDialog';
import ChatBoxInteractionHost from './chatbox/components/ChatBoxInteractionHost';
import RoleSelector from './chatbox/components/RoleSelector';
import FullscreenEditorModal from './chatbox/components/FullscreenEditorModal';
import {useExtraToolsMenuItems} from './chatbox/components/ExtraToolsMenuItems';
import ConversationToolsDialog from '@/features/tools/components/ConversationToolsDialog';
import {deepMerge, setNestedValue} from './chatbox/utils/toolState';
import {
    createPcm16kRecorder,
    createSilentWaveformLevels,
    ensureMicrophonePermission,
    isVoicePermissionFlowCancelled,
    requestMicrophoneStream,
} from './chatbox/utils/voiceRecorder';

const VOICE_WAVEFORM_BARS = 56;
const VOICE_RECOGNITION_ENGINE_SETTING_KEY = 'VoiceRecognitionEngine';
const CHATBOX_AUTO_HIDE_SETTING_KEY = 'ChatBoxBottomAutoHide';
const CHATBOX_COLLAPSED_HEIGHT = 30;
const CHATBOX_COLLAPSE_OVERSHOOT_PX = 24;
const CHATBOX_AUTO_HIDE_DELAY_MS = 2200;
const CHATBOX_INPUT_DRAFT_STORAGE_PREFIX = 'chatbox-input-draft-v1';
const CHATBOX_MESSAGE_DRAFTS_COMPONENT_KEY = 'chatbox:input-drafts:v1';

const getStandaloneDraftStorageKey = (markId) => (
    `${CHATBOX_INPUT_DRAFT_STORAGE_PREFIX}:${encodeURIComponent(String(markId ?? 'default'))}`
);

const readStandaloneDraft = (storageKey) => {
    if (typeof window === 'undefined') return '';
    try {
        return window.localStorage.getItem(storageKey) || '';
    } catch (_) {
        return '';
    }
};

const saveStandaloneDraft = (storageKey, content) => {
    if (typeof window === 'undefined') return;
    try {
        if (content) {
            window.localStorage.setItem(storageKey, content);
        } else {
            window.localStorage.removeItem(storageKey);
        }
    } catch (_) {
        // 输入草稿保存失败不影响正常输入。
    }
};

const getMessageDraftStore = (message, create = false) => {
    if (!message || typeof message.getComponent !== 'function') return null;

    let store = message.getComponent(CHATBOX_MESSAGE_DRAFTS_COMPONENT_KEY);
    if (!store && create && typeof message.registerComponent === 'function') {
        store = {};
        message.registerComponent(CHATBOX_MESSAGE_DRAFTS_COMPONENT_KEY, store);
    }
    return store || null;
};

const readMessageDraft = (message, mode) => {
    const store = getMessageDraftStore(message);
    return Object.prototype.hasOwnProperty.call(store || {}, mode) ? store[mode] : undefined;
};

const saveMessageDraft = (message, mode, content) => {
    const store = getMessageDraftStore(message, true);
    if (!store) return;
    store[mode] = content;
};

const clearMessageDraft = (message, mode) => {
    const store = getMessageDraftStore(message);
    if (!store) return;

    delete store[mode];
    if (
        Object.keys(store).length === 0
        && typeof message.unregisterComponent === 'function'
        && message.getComponent(CHATBOX_MESSAGE_DRAFTS_COMPONENT_KEY) === store
    ) {
        message.unregisterComponent(CHATBOX_MESSAGE_DRAFTS_COMPONENT_KEY);
    }
};

const normalizeVoiceRecognitionEngine = (value) => (
    String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'
);

const applyLocalSettingBackedExtraToolStatus = (status, toolsConfig = []) => {
    let result = {...status};

    const visit = (items = [], parentPath = []) => {
        items.forEach((item) => {
            if (!item) return;
            if (item.type === 'tool-region') {
                visit(item.children || [], parentPath);
                return;
            }
            if (!item.name) return;
            const currentPath = [...parentPath, item.name];

            if (item.type === 'radio' && item.name === VOICE_RECOGNITION_ENGINE_SETTING_KEY) {
                const allowedValues = new Set((item.children || []).map(child => child?.name).filter(Boolean));
                const fallbackValue = allowedValues.has(item.default)
                    ? item.default
                    : (allowedValues.has('remote') ? 'remote' : (item.children?.[0]?.name || 'remote'));
                const localValue = normalizeVoiceRecognitionEngine(
                    getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, fallbackValue)
                );
                const nextValue = allowedValues.size === 0 || allowedValues.has(localValue)
                    ? localValue
                    : fallbackValue;
                result = setNestedValue(result, currentPath, nextValue);
            }

            if (item.type === 'group' && item.children) {
                visit(item.children, currentPath);
            }
        });
    };

    visit(toolsConfig);
    return result;
};


const collectToolPermissions = (toolsConfig = [], status = {}) => {
    const permissions = {};

    const visit = (items = [], currentStatus = {}) => {
        items.forEach((item) => {
            if (!item) return;
            if (item.type === 'tool-region') {
                visit(item.children || [], currentStatus);
                return;
            }
            if (!item.name) return;

            const value = currentStatus?.[item.name];
            if (item.type === 'tool') {
                const mode = typeof value === 'boolean'
                    ? (value ? 'allow' : 'deny')
                    : String(value || item.default || 'ask').toLowerCase();
                permissions[item.name] = ['allow', 'deny', 'ask'].includes(mode) ? mode : 'ask';
                return;
            }

            if (item.type === 'group' && item.children) {
                visit(item.children, value && typeof value === 'object' ? value : {});
            }
        });
    };

    visit(toolsConfig, status);
    return permissions;
};

const extractLocalOnlyExtraToolStatus = (toolsConfig = [], status = {}) => {
    const visit = (items = [], currentStatus = {}) => {
        const result = {};
        items.forEach((item) => {
            if (!item) return;
            if (item.type === 'tool-region') {
                Object.assign(result, visit(item.children || [], currentStatus));
                return;
            }
            if (!item.name || item.type === 'tool') return;
            const value = currentStatus?.[item.name];
            if (item.type === 'group') {
                const child = visit(item.children || [], value && typeof value === 'object' ? value : {});
                if (Object.keys(child).length > 0) result[item.name] = child;
                return;
            }
            if (item.type === 'toggle' || item.type === 'radio') {
                if (value !== undefined) result[item.name] = value;
            }
        });
        return result;
    };
    return visit(toolsConfig, status);
};


const applyToolPermissionsToStatus = (toolsConfig = [], status = {}, permissions = {}) => {
    let result = {...(status || {})};

    const visit = (items = [], parentPath = []) => {
        items.forEach((item) => {
            if (!item) return;
            if (item.type === 'tool-region') {
                visit(item.children || [], parentPath);
                return;
            }
            if (!item.name) return;
            const currentPath = [...parentPath, item.name];

            if (item.type === 'tool' && Object.prototype.hasOwnProperty.call(permissions, item.name)) {
                result = setNestedValue(result, currentPath, permissions[item.name]);
                return;
            }

            if (item.type === 'group' && item.children) {
                visit(item.children, currentPath);
            }
        });
    };

    visit(toolsConfig);
    return result;
};

// ========== 主组件 ==========

function ChatBox({
                     onSendMessage,
                     readOnly = false,
                     FilePickerCallback,
                     PicPickerCallback,
                     markId,
                     attachmentsMeta = [],
                     setAttachments,
                     uploadFiles = [],
                     onAttachmentRemove,
                     onImagePaste,
                     onRetryUpload,
                     onCancelUpload,
                     onDropFiles,
                     onFolderDetected,
                     onHeightChange,
                     dropTargetRef,
                     editorHostRef,
                     selectedModel,
                     isWindowMode = false,
                     onVoicePcmReady,
                     onVoiceRecordingStart,
                     onVoiceRecordingCancel,
                 }) {
    const {t} = useTranslation();
    const voiceText = useMemo(() => {
        const translate = (key, defaultValue) => t(key, {defaultValue});
        return {
            input: translate('voice_input', 'Voice input'),
            switchToText: translate('voice_input_switch_to_text', 'Switch to text input'),
            cancelRecording: translate('voice_input_cancel_recording', 'Cancel recording'),
            recordingAria: translate('voice_input_recording_aria', 'Voice input in progress'),
            recognizingAria: translate('voice_input_recognizing_aria', 'Recognizing voice input'),
            recognizingText: translate('voice_input_recognizing', 'Recognizing...'),
            holdToRecord: translate('voice_input_hold_to_record', 'Hold to record voice'),
            releaseToFinish: translate('voice_input_release_to_finish', 'Release to finish voice input'),
            permissionTitle: translate('voice_input_permission_title', 'Microphone permission required'),
            permissionIntro: translate(
                'voice_input_permission_intro',
                'Voice input needs microphone access. Please choose Allow in the browser permission prompt.'
            ),
            permissionConfirm: translate('voice_input_permission_confirm', 'Continue'),
            permissionCancel: translate('voice_input_permission_cancel', 'Not now'),
            permissionDeniedTitle: translate('voice_input_permission_denied_title', 'Microphone access failed'),
            permissionDeniedMessage: translate(
                'voice_input_permission_denied_message',
                'Could not access the microphone. Please allow microphone access in your browser settings and try again.'
            ),
            permissionDeniedConfirm: translate('voice_input_permission_denied_confirm', 'Got it'),
            microphoneUnsupported: translate(
                'voice_input_microphone_unsupported',
                'This browser does not support microphone recording.'
            ),
            recordingFailed: translate('voice_input_record_failed', 'Could not process the recording. Please try again.'),
        };
    }, [t]);
    const isMobileDevice = useIsMobile();
    const highZClass = isWindowMode ? 'z-[100000]' : '';

    // ========== 状态管理 ==========
    const [messageContent, setMessageContent] = useState(() => (
        readStandaloneDraft(getStandaloneDraftStorageKey(markId))
    ));
    const [toolsStatus, setToolsStatus] = useState({});
    const [runtimeToolPermissions, setRuntimeToolPermissions] = useState({});
    const [conversationToolDefaults, setConversationToolDefaults] = useState({});
    const [conversationToolsDialogOpen, setConversationToolsDialogOpen] = useState(false);

    // 全屏编辑器
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 是否只读
    const [isReadOnly, setIsReadOnly] = useState(readOnly);

    // 提示相关
    const [showTipMessage, setShowTipMessage] = useState(true);
    const [tipMessage, setTipMessage] = useState(t('shift_enter_newline'));
    const [tipMessageIsForNewLine, setTipMessageIsForNewLine] = useState(true);

    // 工具按钮相关
    const [tools, setTools] = useState([]);
    const [extraTools, setExtraTools] = useState([]);
    const [attachmentTools, setAttachmentTools] = useState([]);

    // 是否为小屏幕
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [mobileOpenMenuSections, setMobileOpenMenuSections] = useState({});

    // 快捷选项相关
    const [quickOptions, setQuickOptions] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [selectedQuickOption, setSelectedQuickOption] = useState(null);

    // 动画/加载相关
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [toolsLoadedStatus, setToolsLoadedStatus] = useState(0);

    // 按钮
    const [sendButtonStatus, setSendButtonStatus] = useState('normal');
    const [activeTaskMode, setActiveTaskMode] = useState(null);
    const [activeTaskModeOptions, setActiveTaskModeOptions] = useState([]);
    const [isTaskInterruptPending, setIsTaskInterruptPending] = useState(false);
    const [isBottomAutoHideEnabled, setIsBottomAutoHideEnabled] = useState(() => (
        Boolean(getLocalSetting(CHATBOX_AUTO_HIDE_SETTING_KEY, false))
    ));
    const [isChatBoxCollapsed, setIsChatBoxCollapsed] = useState(false);
    const [collapsedTranslateY, setCollapsedTranslateY] = useState(0);

    // 语音输入相关
    const [isVoiceRecording, setIsVoiceRecording] = useState(false);
    const [isVoiceRecognizing, setIsVoiceRecognizing] = useState(false);
    const [isMobileVoiceMode, setIsMobileVoiceMode] = useState(false);
    const [voiceActionPending, setVoiceActionPending] = useState(false);
    const [voiceWaveformLevels, setVoiceWaveformLevels] = useState(() => createSilentWaveformLevels(VOICE_WAVEFORM_BARS));
    const [voicePermissionDialog, setVoicePermissionDialog] = useState({open: false});

    // 固件相关
    const [attachmentHeight, setAttachmentHeight] = useState(0);
    const [ignoreAttachmentTools, setIgnoreAttachmentTools] = useState(false);

    // 编辑消息和 Fork 消息
    const [isEditMessage, setIsEditMessage] = useState(false);
    const [editMessageId, setEditMessageId] = useState(null);
    const [isForkMode, setIsForkMode] = useState(false);

    // ========== 引用 ==========
    const quickOptionsRef = useRef(null);
    const textareaRef = useRef(null);
    const attachmentRef = useRef(null);
    const rootRef = useRef(null);
    const voiceRecorderRef = useRef(null);
    const voicePointerPressedRef = useRef(false);
    const voicePointerEmitPcmOnReleaseRef = useRef(true);
    const activeVoicePointerIdRef = useRef(null);
    const voicePermissionDialogResolverRef = useRef(null);
    const onVoiceRecordingCancelRef = useRef(onVoiceRecordingCancel);
    const autoHideTimerRef = useRef(null);
    const isInputFocusedRef = useRef(false);
    const isPointerInsideChatBoxRef = useRef(false);
    const isModalOpenRef = useRef(false);
    const currentDraftStorageKeyRef = useRef(getStandaloneDraftStorageKey(markId));
    const editDraftRef = useRef(null);
    const isEditMessageRef = useRef(false);
    const pendingEditClearRef = useRef(false);
    const standaloneAttachmentsRef = useRef([]);
    const previousMarkIdRef = useRef(markId);
    const toolPermissionRevisionRef = useRef(0);
    const conversationToolPermissionsRef = useRef({});
    const runtimeToolPermissionRevisionRef = useRef(0);
    const runtimeToolPermissionStreamIdRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);


    // 使用 useRef 缓存频繁变化的值，避免触发重新渲染
    const messageContentRef = useRef(messageContent);
    const sendButtonStatusRef = useRef(sendButtonStatus);
    const activeTaskModeRef = useRef(activeTaskMode);
    const activeTaskModesRef = useRef(new Map());
    const taskInterruptPendingRef = useRef(false);

    // 发送消息角色身份相关
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);


    // ========== 回调函数（使用 useCallback 缓存）==========
    const updateMessageContent = useCallback((valueOrUpdater, {persist = true} = {}) => {
        const nextValue = typeof valueOrUpdater === 'function'
            ? valueOrUpdater(messageContentRef.current)
            : valueOrUpdater;
        const normalizedValue = nextValue == null ? '' : String(nextValue);

        messageContentRef.current = normalizedValue;
        setMessageContent(normalizedValue);

        if (!persist) return normalizedValue;

        const editDraft = editDraftRef.current;
        if (editDraft) {
            saveMessageDraft(editDraft.message, editDraft.mode, normalizedValue);
        } else {
            saveStandaloneDraft(currentDraftStorageKeyRef.current, normalizedValue);
        }

        return normalizedValue;
    }, []);

    const leaveEditMode = useCallback(({promoteToStandalone = false} = {}) => {
        const nextContent = promoteToStandalone
            ? messageContentRef.current
            : readStandaloneDraft(currentDraftStorageKeyRef.current);

        editDraftRef.current = null;
        isEditMessageRef.current = false;
        setIsEditMessage(false);
        setIsForkMode(false);
        setEditMessageId(null);
        setAttachments(standaloneAttachmentsRef.current);
        updateMessageContent(nextContent, {persist: promoteToStandalone});
    }, [setAttachments, updateMessageContent]);

    // ×：退出编辑/Fork，并把当前内容覆盖到普通输入框中。
    // 消息上的未完成草稿仍然保留，之后再次编辑/Fork 时可继续恢复。
    const handleCancelEdit = useCallback(() => {
        leaveEditMode({promoteToStandalone: true});
    }, [leaveEditMode]);

    // 垃圾桶：仅退出编辑/Fork，恢复进入编辑前的普通输入内容。
    // 不删除消息上的未完成草稿，也不把编辑内容带入普通发送。
    const handleClearEdit = useCallback(() => {
        leaveEditMode();
    }, [leaveEditMode]);

    const clearAutoHideTimer = useCallback(() => {
        if (!autoHideTimerRef.current) return;
        window.clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = null;
    }, []);

    const showCollapsedChatBox = useCallback(({focus = false} = {}) => {
        clearAutoHideTimer();
        setIsChatBoxCollapsed(false);

        if (focus) {
            requestAnimationFrame(() => textareaRef.current?.focus({preventScroll: true}));
        }
    }, [clearAutoHideTimer]);

    const scheduleAutoHide = useCallback(() => {
        clearAutoHideTimer();
        if (isSmallScreen || !isBottomAutoHideEnabled) return;

        autoHideTimerRef.current = window.setTimeout(() => {
            autoHideTimerRef.current = null;

            // 聚焦中的输入框不能随 ChatBox 一起做 transform 隐藏，否则浏览器会
            // 自动滚动以保持焦点可见，造成 ChatBox 卡在半隐藏状态。
            if (isInputFocusedRef.current || isModalOpenRef.current) return;

            setIsChatBoxCollapsed(true);
        }, CHATBOX_AUTO_HIDE_DELAY_MS);
    }, [clearAutoHideTimer, isBottomAutoHideEnabled, isSmallScreen]);

    const handleMessageInputFocus = useCallback(() => {
        isInputFocusedRef.current = true;
        showCollapsedChatBox();
    }, [showCollapsedChatBox]);

    const handleMessageInputBlur = useCallback(() => {
        isInputFocusedRef.current = false;
        if (!isPointerInsideChatBoxRef.current) {
            scheduleAutoHide();
        }
    }, [scheduleAutoHide]);

    const openFullscreenEditor = useCallback(() => {
        isModalOpenRef.current = true;
        clearAutoHideTimer();
        setIsChatBoxCollapsed(false);
        setIsModalOpen(true);
    }, [clearAutoHideTimer]);

    const closeFullscreenEditor = useCallback(() => {
        isModalOpenRef.current = false;
        setIsModalOpen(false);

        if (!isPointerInsideChatBoxRef.current && !isInputFocusedRef.current) {
            scheduleAutoHide();
        }
    }, [scheduleAutoHide]);

    const handleInputActivity = useCallback(() => {
        if (!isSmallScreen) {
            showCollapsedChatBox();
        }
    }, [isSmallScreen, showCollapsedChatBox]);

    const buildOutboundToolsStatus = useCallback(() => ({
        ...toolsStatus,
        tool_permissions: collectToolPermissions(extraTools, toolsStatus.extra_tools || {}),
    }), [extraTools, toolsStatus]);

    const applyConversationToolPermissions = useCallback((permissions, revision = 0) => {
        const normalizedRevision = Number(revision) || 0;
        if (normalizedRevision < toolPermissionRevisionRef.current) return;
        toolPermissionRevisionRef.current = normalizedRevision;
        conversationToolPermissionsRef.current = {...(permissions || {})};
        setToolsStatus(prev => ({
            ...prev,
            extra_tools: applyToolPermissionsToStatus(
                extraTools,
                prev.extra_tools || {},
                permissions || {}
            ),
        }));
    }, [extraTools]);

    const syncToolPermission = useCallback((toolName, mode) => {
        setRuntimeToolPermissions(prev => {
            if (!Object.prototype.hasOwnProperty.call(prev, toolName)) return prev;
            const next = {...prev};
            delete next[toolName];
            return next;
        });

        if (!markId) return;
        emitEvent({
            type: 'agent',
            target: 'ToolPermission',
            markId,
            payload: {
                command: 'Set-Tool-Permission',
                toolName,
                mode,
                scope: 'conversation',
                applyToPending: true,
                revision: toolPermissionRevisionRef.current,
            },
        }).then((response) => {
            if (response?.success === false) {
                console.error('Set tool permission failed:', response?.value);
                return;
            }
            const value = response?.value;
            if (value?.permissions) {
                applyConversationToolPermissions(value.permissions, value.revision);
            }
        }).catch((error) => {
            console.error('Set tool permission failed:', error);
        });
    }, [applyConversationToolPermissions, markId]);

    const syncToolPermissions = useCallback(async (updates) => {
        if (!markId || !updates || Object.keys(updates).length === 0) return true;
        try {
            const response = await emitEvent({
                type: 'agent',
                target: 'ToolPermission',
                markId,
                payload: {
                    command: 'Set-Tool-Permissions',
                    permissions: updates,
                    scope: 'conversation',
                    applyToPending: true,
                    revision: toolPermissionRevisionRef.current,
                },
            });
            if (response?.success === false) {
                toast.error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'));
                return false;
            }
            const value = response?.value;
            if (value?.permissions) {
                applyConversationToolPermissions(value.permissions, value.revision);
            }
            toast.success(t('conversation_tools_saved', '已更新本对话工具。'));
            return true;
        } catch (error) {
            console.error('Set conversation tool permissions failed:', error);
            toast.error(t('conversation_tools_save_failed', '保存本对话工具失败。'));
            return false;
        }
    }, [applyConversationToolPermissions, markId, t]);

    const currentConversationToolPermissions = useMemo(() => (
        collectToolPermissions(extraTools, toolsStatus.extra_tools || {})
    ), [extraTools, toolsStatus.extra_tools]);

    const handleSendMessage = useCallback(async () => {
        const activeEditDraft = editDraftRef.current;
        const wasEditing = isEditMessageRef.current;
        const currentContent = messageContentRef.current;
        const taskMode = activeTaskModeRef.current;
        const isTaskInterruption = (
            sendButtonStatusRef.current === 'generating'
            && taskMode?.active
            && !wasEditing
            && Boolean(currentContent.trim())
        );

        if (isTaskInterruption) {
            if (attachmentsMeta.length > 0) {
                toast.warning(t('task_mode_interrupt_no_attachments', '任务补充暂不支持附件，请先移除附件。'));
                return;
            }
            if (taskInterruptPendingRef.current) return;

            taskInterruptPendingRef.current = true;
            setIsTaskInterruptPending(true);
            try {
                const response = await emitEvent({
                    type: 'message',
                    target: 'ChatPage',
                    markId,
                    payload: {
                        command: 'Task-Interrupt',
                        taskRunId: taskMode.taskRunId,
                        content: currentContent,
                        requestId: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
                    },
                });
                if (response?.success === false) {
                    toast.error(response?.value || t('task_mode_interrupt_failed', '无法补充任务要求。'));
                    return;
                }
                updateMessageContent('');
                toast.success(t('task_mode_interrupt_sent', '已将补充要求加入当前任务。'));
            } catch (error) {
                console.error('Task interruption failed:', error);
                toast.error(t('task_mode_interrupt_failed', '无法补充任务要求。'));
            } finally {
                taskInterruptPendingRef.current = false;
                setIsTaskInterruptPending(false);
                textareaRef.current?.focus();
            }
            return;
        }

        runtimeToolPermissionRevisionRef.current = 0;
        runtimeToolPermissionStreamIdRef.current = null;
        setRuntimeToolPermissions({});

        onSendMessage({
            messageContent: currentContent,
            toolsStatus: buildOutboundToolsStatus(),
            isEditMessage: wasEditing,
            editMessageId: editMessageId,
            attachments: attachmentsMeta,
            sendButtonStatus: sendButtonStatusRef.current,
            isRegenerate: false,
            role: currentRole?.name,
            isFork: isForkMode
        });
        textareaRef.current?.focus();

        if (wasEditing) {
            if (activeEditDraft) clearMessageDraft(activeEditDraft.message, activeEditDraft.mode);
            pendingEditClearRef.current = true;
            leaveEditMode();
        }
    }, [
        onSendMessage,
        buildOutboundToolsStatus,
        editMessageId,
        attachmentsMeta,
        currentRole,
        isForkMode,
        leaveEditMode,
        markId,
        t,
        updateMessageContent,
    ]);

    const handleKeyDown = useCallback((e) => {
        handleInputActivity();
        if (e.key !== 'Enter') return;

        // 移动端 Enter 始终作为普通换行处理，不拦截默认行为，也不触发发送。
        // 这样软键盘/外接键盘在小屏幕上都能正常输入多行文本。
        if (isSmallScreen) return;

        // 输入法组合过程中不要发送消息，避免中文/日文等候选确认时误触发发送。
        if (e.isComposing || e.nativeEvent?.isComposing) return;

        if (e.shiftKey) {
            if (tipMessageIsForNewLine) {
                chatboxSetup({tipMessage: null});
                setLocalSetting('ShowShiftEnterNewlineTip', false);
            }
            return;
        }

        e.preventDefault();
        const canInterruptTask = (
            sendButtonStatusRef.current === 'generating'
            && activeTaskModeRef.current?.active
            && Boolean(messageContentRef.current.trim())
            && !taskInterruptPendingRef.current
        );
        if (sendButtonStatusRef.current !== 'normal' && !canInterruptTask) {
            toast.warning(t('is_generating_try_later'));
            return;
        }
        handleSendMessage();
    }, [handleInputActivity, handleSendMessage, isSmallScreen, t, tipMessageIsForNewLine]);

    const handleInputChange = useCallback((newValue) => {
        if (isReadOnly) return;

        handleInputActivity();

        updateMessageContent(newValue);

        // 防抖处理快捷选项状态更新
        if (selectedQuickOption !== null) {
            const selectedOption = quickOptions.find(opt => opt.id === selectedQuickOption);
            if (selectedOption && newValue !== selectedOption.value) {
                setSelectedQuickOption(null);
            }
        }
    }, [handleInputActivity, isReadOnly, selectedQuickOption, quickOptions, updateMessageContent]);

    const handlePaste = useCallback((e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (onImagePaste && typeof onImagePaste === 'function') {
                    e.preventDefault();
                    if (!ignoreAttachmentTools && !isReadOnly) {
                        onImagePaste(file);
                    }
                }
                return;
            }
        }
    }, [onImagePaste, ignoreAttachmentTools, isReadOnly]);

    const handleOptionClick = useCallback((option) => {
        if (selectedQuickOption === option.id) {
            if (messageContentRef.current === option.value) {
                updateMessageContent('');
                setSelectedQuickOption(null);
            } else {
                setSelectedQuickOption(null);
            }
        } else {
            updateMessageContent(option.value);
            setSelectedQuickOption(option.id);
            textareaRef.current?.focus();
        }
    }, [selectedQuickOption, updateMessageContent]);

    const closeVoicePermissionDialog = useCallback((result = false) => {
        const resolver = voicePermissionDialogResolverRef.current;
        voicePermissionDialogResolverRef.current = null;
        setVoicePermissionDialog(prev => (prev?.open ? {...prev, open: false} : {open: false}));

        // Resolver 只允许触发一次，避免点击取消关闭 Dialog 时又被 onOpenChange 二次触发。
        resolver?.(result);
    }, []);

    const showVoicePermissionDialog = useCallback(({
                                                       title = voiceText.input,
                                                       description,
                                                       confirmText = voiceText.permissionDeniedConfirm,
                                                       cancelText = voiceText.permissionCancel,
                                                       showCancel = false,
                                                   }) => {
        return new Promise((resolve) => {
            // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。
            voicePermissionDialogResolverRef.current?.(false);
            voicePermissionDialogResolverRef.current = resolve;
            setVoicePermissionDialog({
                open: true,
                title,
                description,
                confirmText,
                cancelText,
                showCancel,
            });
        });
    }, [voiceText.input, voiceText.permissionCancel, voiceText.permissionDeniedConfirm]);

    const getMicrophoneRequestOptions = useCallback(() => ({
        permissionIntroMessage: voiceText.permissionIntro,
        permissionDeniedMessage: voiceText.permissionDeniedMessage,
        permissionUnsupportedMessage: voiceText.microphoneUnsupported,
        onPermissionIntro: async (message) => showVoicePermissionDialog({
            title: voiceText.permissionTitle,
            description: message,
            confirmText: voiceText.permissionConfirm,
            cancelText: voiceText.permissionCancel,
            showCancel: true,
        }),
        onPermissionDenied: async (error, message) => {
            if (isVoicePermissionFlowCancelled(error)) return;
            console.error('Microphone permission failed:', error);
            await showVoicePermissionDialog({
                title: voiceText.permissionDeniedTitle,
                description: message,
                confirmText: voiceText.permissionDeniedConfirm,
            });
        },
    }), [showVoicePermissionDialog, voiceText]);

    const blurTextInputOnMobile = useCallback(() => {
        if (!isSmallScreen) return;

        requestAnimationFrame(() => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            textarea.blur?.();
        });
    }, [isSmallScreen]);

    const appendVoiceRecognitionText = useCallback((text) => {
        const normalizedText = String(text || '').trim();
        if (!normalizedText) return;

        updateMessageContent((previousValue) => {
            const separator = previousValue && !/\s$/.test(previousValue) ? ' ' : '';
            return `${previousValue || ''}${separator}${normalizedText}`;
        });

        // 语音识别回填文本时不要主动 focus 输入框。
        // 移动端主动 blur，避免识别完成后软键盘被唤起。
        blurTextInputOnMobile();
    }, [blurTextInputOnMobile, updateMessageContent]);

    const getVoiceRecognitionText = useCallback((result) => {
        if (typeof result === 'string') return result;
        if (!result) return '';
        return result.text || result.transcript || result.messageContent || '';
    }, []);

    // 最终音频处理由 ChatPage 传入；ChatBox 只负责把采集到的 16k PCM 交出去，并接收可选识别文本回填输入框。
    const handleVoicePcmReady = useCallback(async (payload) => {
        if (!payload?.pcm16k?.length) return null;

        const voicePayload = {
            ...payload,
            markId,
        };

        if (typeof onVoicePcmReady === 'function') {
            const result = await onVoicePcmReady(voicePayload);
            appendVoiceRecognitionText(getVoiceRecognitionText(result));
            return result;
        }

        console.debug('[ChatBox] voice pcm16k ready:', voicePayload);
        return null;
    }, [appendVoiceRecognitionText, getVoiceRecognitionText, markId, onVoicePcmReady]);

    const startVoiceRecording = useCallback(async () => {
        if (isReadOnly || voiceActionPending || isVoiceRecognizing || voiceRecorderRef.current) return false;

        setVoiceActionPending(true);

        try {
            setVoiceWaveformLevels(createSilentWaveformLevels(VOICE_WAVEFORM_BARS));
            const stream = await requestMicrophoneStream(getMicrophoneRequestOptions());
            const recorder = await createPcm16kRecorder(stream, {
                waveformBars: VOICE_WAVEFORM_BARS,
                onWaveform: setVoiceWaveformLevels,
            });
            voiceRecorderRef.current = recorder;
            setIsVoiceRecording(true);

            if (typeof onVoiceRecordingStart === 'function') {
                await onVoiceRecordingStart({
                    markId,
                    isMobile: isSmallScreen,
                    sampleRate: 16000,
                    channels: 1,
                    bitDepth: 16,
                });
            }

            return true;
        } catch (error) {
            const recorderToCancel = voiceRecorderRef.current;
            voiceRecorderRef.current = null;
            if (recorderToCancel) {
                try {
                    await recorderToCancel.cancel();
                } catch (cancelError) {
                    console.error('Failed to cancel voice recorder after start error:', cancelError);
                }
            }

            if (!isVoicePermissionFlowCancelled(error)) {
                console.error('Failed to start voice recording:', error);
            }
            setIsVoiceRecording(false);
            setIsVoiceRecognizing(false);
            setVoiceWaveformLevels(createSilentWaveformLevels(VOICE_WAVEFORM_BARS));
            return false;
        } finally {
            setVoiceActionPending(false);
        }
    }, [getMicrophoneRequestOptions, isReadOnly, isSmallScreen, isVoiceRecognizing, markId, onVoiceRecordingStart, voiceActionPending]);

    const stopVoiceRecording = useCallback(async ({emitPcm = true} = {}) => {
        const recorder = voiceRecorderRef.current;
        if (!recorder) {
            setIsVoiceRecording(false);
            return null;
        }

        voiceRecorderRef.current = null;
        setIsVoiceRecording(false);
        setVoiceWaveformLevels(createSilentWaveformLevels(VOICE_WAVEFORM_BARS));
        setVoiceActionPending(true);
        setIsVoiceRecognizing(Boolean(emitPcm));

        try {
            if (!emitPcm) {
                await recorder.cancel();
                await onVoiceRecordingCancel?.({markId});
                return null;
            }

            const payload = await recorder.stop();
            await handleVoicePcmReady(payload);
            return payload;
        } catch (error) {
            await onVoiceRecordingCancel?.({markId});
            console.error('Failed to stop voice recording:', error);
            toast.error(voiceText.recordingFailed);
            return null;
        } finally {
            setIsVoiceRecognizing(false);
            setVoiceActionPending(false);
            blurTextInputOnMobile();
        }
    }, [blurTextInputOnMobile, handleVoicePcmReady, markId, onVoiceRecordingCancel, voiceText.recordingFailed]);

    const handleVoiceButtonClick = useCallback(async () => {
        if (isReadOnly || voiceActionPending || isVoiceRecognizing) return;

        if (isSmallScreen) {
            if (isMobileVoiceMode) {
                if (isVoiceRecording || voiceRecorderRef.current) {
                    await stopVoiceRecording({emitPcm: true});
                }
                setIsMobileVoiceMode(false);
                requestAnimationFrame(() => textareaRef.current?.focus());
                return;
            }

            setVoiceActionPending(true);
            try {
                await ensureMicrophonePermission(getMicrophoneRequestOptions());
                setIsMobileVoiceMode(true);
            } catch (error) {
                if (!isVoicePermissionFlowCancelled(error)) {
                    // requestMicrophoneStream 已负责弹窗告知失败。
                    console.error('Failed to enable mobile voice input:', error);
                }
            } finally {
                setVoiceActionPending(false);
            }
            return;
        }

        if (isVoiceRecording || voiceRecorderRef.current) {
            await stopVoiceRecording({emitPcm: true});
            return;
        }

        await startVoiceRecording();
    }, [
        getMicrophoneRequestOptions,
        isMobileVoiceMode,
        isReadOnly,
        isSmallScreen,
        isVoiceRecognizing,
        isVoiceRecording,
        startVoiceRecording,
        stopVoiceRecording,
        voiceActionPending,
    ]);

    const handleMobileVoicePointerDown = useCallback(async (event) => {
        if (isReadOnly || voiceActionPending || isVoiceRecognizing || isVoiceRecording || voiceRecorderRef.current) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        event.preventDefault();
        activeVoicePointerIdRef.current = event.pointerId;
        voicePointerPressedRef.current = true;
        voicePointerEmitPcmOnReleaseRef.current = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);

        const started = await startVoiceRecording();
        if (started && !voicePointerPressedRef.current) {
            await stopVoiceRecording({emitPcm: voicePointerEmitPcmOnReleaseRef.current});
        }
    }, [isReadOnly, isVoiceRecognizing, isVoiceRecording, startVoiceRecording, stopVoiceRecording, voiceActionPending]);

    const finishMobileVoicePointer = useCallback(async (event, emitPcm = true) => {
        if (activeVoicePointerIdRef.current !== event.pointerId) return;

        event.preventDefault();
        voicePointerPressedRef.current = false;
        voicePointerEmitPcmOnReleaseRef.current = emitPcm;
        activeVoicePointerIdRef.current = null;
        event.currentTarget.releasePointerCapture?.(event.pointerId);

        if (voiceRecorderRef.current) {
            await stopVoiceRecording({emitPcm});
        }
    }, [stopVoiceRecording]);

    const handleAutoHideToggle = useCallback(() => {
        clearAutoHideTimer();
        if (isSmallScreen) {
            setIsBottomAutoHideEnabled(true);
            setIsChatBoxCollapsed(!isInputFocusedRef.current && !isModalOpenRef.current);
            return;
        }

        setIsBottomAutoHideEnabled((previousValue) => {
            const nextValue = !previousValue;
            setLocalSetting(CHATBOX_AUTO_HIDE_SETTING_KEY, nextValue);
            if (!nextValue) {
                setIsChatBoxCollapsed(false);
            }
            return nextValue;
        });
    }, [clearAutoHideTimer, isSmallScreen]);

    const handleChatBoxMouseEnter = useCallback(() => {
        isPointerInsideChatBoxRef.current = true;
        if (!isSmallScreen && isBottomAutoHideEnabled) {
            showCollapsedChatBox();
        }
    }, [isBottomAutoHideEnabled, isSmallScreen, showCollapsedChatBox]);

    const handleChatBoxMouseLeave = useCallback(() => {
        isPointerInsideChatBoxRef.current = false;
        scheduleAutoHide();
    }, [scheduleAutoHide]);

    // ========== 工具初始化函数 ==========

    const initializeExtraTools = useCallback((toolsConfig) => {
        const processItems = (items) => {
            const status = {};
            items.forEach(item => {
                if (!item) return;
                if (item.type === 'tool-region') {
                    Object.assign(status, processItems(item.children || []));
                    return;
                }
                if (!item.name) return;
                if (item.type === 'toggle') {
                    status[item.name] = !!item.default;
                } else if (item.type === 'tool') {
                    const defaultMode = typeof item.default === 'boolean'
                        ? (item.default ? 'allow' : 'deny')
                        : String(item.default || 'ask').toLowerCase();
                    status[item.name] = ['allow', 'deny', 'ask'].includes(defaultMode) ? defaultMode : 'ask';
                } else if (item.type === 'radio' && item.children?.length > 0) {
                    let defaultValue;
                    if (item.default) {
                        const defaultChild = item.children.find(child => child.name === item.default);
                        defaultValue = defaultChild ? defaultChild.name : (item.children[0]?.name || undefined);
                    } else {
                        defaultValue = item.children[0]?.name || undefined;
                    }
                    if (defaultValue !== undefined) {
                        status[item.name] = defaultValue;
                    }
                } else if (item.type === 'group' && item.children) {
                    const childStatus = processItems(item.children);
                    status[item.name] = Object.keys(childStatus).length > 0 ? childStatus : {};
                }
            });
            return status;
        };
        return processItems(toolsConfig);
    }, []);

    // ========== 聊天框配置函数 ==========

    const chatboxSetup = useCallback((data) => {
        const newBuiltinStatus = {};

        // 默认附件工具配置
        let defaultAttachmentTools = data.ignoreAttachmentTools
            ? []
            : [
                {type: 'label', text: 'attachment_options'},
                {
                    type: 'button',
                    text: 'add_image',
                    iconType: 'svg',
                    iconData: '<svg t="1759404220982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4746" width="20" height="20"><path d="M247.04 373.333333a74.666667 74.666667 0 1 1 149.333333 0 74.666667 74.666667 0 0 1-149.333333 0zM321.706667 384a10.666667 10.666667 0 1 0 0-21.333333 10.666667 10.666667 0 0 0 0 21.333333z" fill="#666666" p-id="4747"></path><path d="M938.666667 796.074667c0 43.050667-33.834667 72.106667-70.4 77.653333a83.925333 83.925333 0 0 1-12.672 0.938667H168.405333a83.072 83.072 0 0 1-12.672-0.981334c-36.565333-5.546667-70.4-34.56-70.4-77.653333V232.021333C85.333333 185.898667 122.965333 149.333333 168.405333 149.333333h687.189334C901.034667 149.333333 938.666667 185.941333 938.666667 232.021333v564.053334zM170.666667 743.381333V789.333333h682.666666v-42.538666l-252.885333-250.666667-138.581333 149.930667a42.666667 42.666667 0 0 1-55.466667 5.12L333.098667 599.04 170.666667 743.424z m682.666666-99.754666V234.666667H170.666667v394.538666l131.072-116.522666a42.666667 42.666667 0 0 1 53.077333-2.901334l71.125333 50.56 138.026667-149.333333A42.666667 42.666667 0 0 1 618.666667 405.333333l234.666666 238.293334z" fill="#666666" p-id="4748"></path></svg>',
                    onClick: PicPickerCallback,
                    autoClose: true,
                },
                {
                    type: 'button',
                    text: 'add_file',
                    iconType: 'svg',
                    iconData: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>',
                    onClick: FilePickerCallback,
                    autoClose: true,
                },
            ];

        if (data.ignoreAttachmentTools !== null && data.ignoreAttachmentTools !== undefined) {
            setIgnoreAttachmentTools(Boolean(data.ignoreAttachmentTools));
        }

        const configuredExtraTools = data.extra_tools ? [...data.extra_tools] : [];
        const allExtraTools = [...configuredExtraTools, ...defaultAttachmentTools];
        const defaultExtraStatus = initializeExtraTools(allExtraTools);

        let savedExtraStatus = {};
        try {
            const saved = localStorage.getItem('extraToolsConfig');
            if (saved) {
                savedExtraStatus = extractLocalOnlyExtraToolStatus(
                    allExtraTools,
                    JSON.parse(saved)
                );
            }
        } catch (error) {
            console.error('Failed to parse saved extra_tools status:', error);
        }

        let mergedExtraStatus = applyLocalSettingBackedExtraToolStatus(
            deepMerge(defaultExtraStatus, savedExtraStatus),
            allExtraTools
        );

        const serverToolPermissions = data.toolPermissions?.values || {};
        setConversationToolDefaults({...((data.toolPermissions?.defaultValues) || {})});
        if (Object.keys(serverToolPermissions).length > 0) {
            mergedExtraStatus = applyToolPermissionsToStatus(
                configuredExtraTools,
                mergedExtraStatus,
                serverToolPermissions
            );
            toolPermissionRevisionRef.current = Number(data.toolPermissions?.revision) || 0;
            conversationToolPermissionsRef.current = {...serverToolPermissions};
        }

        if (data.builtin_tools) {
            data.builtin_tools.forEach(tool => {
                newBuiltinStatus[tool.name] = tool?.isActive ?? false;
            });
            setTools(data.builtin_tools);
        }

        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: {...prev.builtin_tools, ...newBuiltinStatus},
            extra_tools: mergedExtraStatus,
        }));

        setExtraTools(configuredExtraTools);
        setAttachmentTools(defaultAttachmentTools);

        if (data.readOnly !== undefined) {
            setIsReadOnly(Boolean(data.readOnly));
        }

        if (data.tipMessage !== undefined) {
            setTipMessageIsForNewLine(false);
            if (data.tipMessage === null) {
                setShowTipMessage(false);
            } else {
                setShowTipMessage(false);
                setTimeout(() => {
                    setTipMessage(data.tipMessage || '');
                    setShowTipMessage(true);
                    if (data.tipMessageFadeOutDelay) {
                        setTimeout(() => setShowTipMessage(false), parseInt(data.tipMessageFadeOutDelay));
                    }
                }, 300);
            }
        }

        if (data.isEditMessage !== undefined) {
            setIsEditMessage(Boolean(data.isEditMessage));
        }

        if (data.roles) {
            // 设置角色列表
            setRoles(data.roles);

            // 查找默认角色
            const defaultRole = data.roles.find(role => role.default);
            if (defaultRole) {
                setCurrentRole(defaultRole);
            } else if (data.roles.length > 0) {
                setCurrentRole(data.roles[0]);
            }
        }

    }, [FilePickerCallback, PicPickerCallback, initializeExtraTools]);

    // ========== 事件处理函数 ==========

    const handleEventBroadcast = useCallback(({
                                                  payload: payload,
                                                  reply: reply
                                              }) => {
        // 事件处理逻辑
        switch (payload.command) {
            case "SendButton-Status":
                const validStates = ['disabled', 'normal', 'loading', 'generating'];
                if (validStates.includes(payload.value)) {
                    setSendButtonStatus(payload.value);
                    if (payload.value === 'normal') {
                        runtimeToolPermissionRevisionRef.current = 0;
                        runtimeToolPermissionStreamIdRef.current = null;
                        setRuntimeToolPermissions({});
                    }
                    reply({value: payload.value});
                } else {
                    reply({value: sendButtonStatusRef.current});
                }
                if (payload.readOnly !== undefined) {
                    setIsReadOnly(Boolean(payload.readOnly));
                }
                break;
            case "Task-Mode-State": {
                const value = payload.value || {};
                const taskRunId = value.taskRunId;
                const nextTasks = new Map(activeTaskModesRef.current);
                if (taskRunId) {
                    if (value.active) nextTasks.set(taskRunId, value);
                    else nextTasks.delete(taskRunId);
                }
                activeTaskModesRef.current = nextTasks;
                const options = [...nextTasks.values()];
                setActiveTaskModeOptions(options);

                let selected = activeTaskModeRef.current;
                if (value.active && (!selected || selected.taskRunId === taskRunId)) {
                    selected = value;
                } else if (!selected || !nextTasks.has(selected.taskRunId)) {
                    selected = options.at(-1) || null;
                } else {
                    selected = nextTasks.get(selected.taskRunId) || selected;
                }
                activeTaskModeRef.current = selected;
                setActiveTaskMode(selected);
                if (!selected) {
                    taskInterruptPendingRef.current = false;
                    setIsTaskInterruptPending(false);
                }
                reply({value});
                break;
            }
            case "Set-MessageContent":
                updateMessageContent(payload.value);
                break;
            case "Get-MessageContent":
                reply({value: messageContentRef.current});
                break;
            case "Setup-ChatBox":
                // 原子替换工具配置，保持上一帧工具栏高度，避免发送瞬间出现额外一行。
                chatboxSetup(payload.value);
                setToolsLoadedStatus(2);
                break;
            case "Set-QuickOptions":
                setIsTransitioning(true);
                setTimeout(() => {
                    setQuickOptions(payload.value);
                    setIsTransitioning(false);
                }, 500);
                break;
            case "Attachment-Meta":
                if (payload.value) {
                    setAttachments(payload.value);
                    reply({value: payload.value});
                } else {
                    reply({value: attachments});
                }
                break;

            case "Set-EditMessage":
                if (payload.immediate) {  // 马上发送的逻辑
                    onSendMessage(
                        {
                            messageContent: payload.content,
                            toolsStatus: buildOutboundToolsStatus(),
                            isEditMessage: true,
                            editMessageId: payload.msgId,
                            attachments: payload.attachments,
                            sendButtonStatus: sendButtonStatusRef.current,
                            isRegenerate: payload.isRegenerate,
                            isProgenerate: payload.isProgenerate,
                            role: payload.role,
                            isFork: payload.isFork
                        }
                    );
                } else {
                    if (!isEditMessageRef.current) {
                        standaloneAttachmentsRef.current = [...attachmentsMeta];
                    }

                    const draftMode = payload.isFork ? 'fork' : 'edit';
                    const targetMessage = payload.message || null;
                    const restoredDraft = readMessageDraft(targetMessage, draftMode);

                    editDraftRef.current = {message: targetMessage, mode: draftMode};
                    isEditMessageRef.current = Boolean(payload.isEdit);
                    pendingEditClearRef.current = false;

                    setIsEditMessage(Boolean(payload.isEdit));
                    setIsForkMode(Boolean(payload.isFork));
                    if (payload.attachments !== undefined) setAttachments(payload.attachments);
                    updateMessageContent(
                        restoredDraft !== undefined ? restoredDraft : (payload.content ?? ''),
                        {persist: false}
                    );
                    if (payload.msgId) setEditMessageId(payload.msgId);
                    if (payload.role) {
                        const foundRole = roles.find(item => item.name === payload.role)
                        if (foundRole) {
                            setCurrentRole(foundRole);
                        } else {
                            setCurrentRole({name: payload.role, text: "?"});
                        }
                    }
                    showCollapsedChatBox({focus: true});
                }

                break;

            case "Clear":
                if (pendingEditClearRef.current) {
                    pendingEditClearRef.current = false;
                    leaveEditMode();
                } else {
                    setAttachments([]);
                    updateMessageContent("");
                }
                break;

            case "Shot-Message":  // 原地发送消息
                if (payload.msgId && payload.value && payload.value.name) {

                    emitEvent({
                        type: "message",
                        target: "ChatPage",
                        payload: {
                            command: "MessagesOrder-Meta"
                        },
                        markId: markId,
                        fromWebsocket: true,  // 不要发到 ws 去
                        notReplyToWebsocket: true
                    }).then((messagesOrder) => {
                        messagesOrder = messagesOrder.value;

                        if (payload.value.content === undefined) payload.value.content = messageContentRef.current;
                        if (!payload.value.attachments) payload.value.attachments = attachmentsMeta;
                        if (!payload.value.allowRegenerate) payload.value.allowRegenerate = false;
                        if (!payload.value.prevMessage) payload.value.prevMessage = messagesOrder[messagesOrder.length - 1];
                        if (!payload.value.position) payload.value.position = "right";
                        if (!payload.value.nextMessage) payload.value.nextMessage = null;
                        if (!payload.value.messages) payload.value.messages = [];

                        emitEvent({
                            type: "message",
                            target: "ChatPage",
                            payload: {
                                command: "Add-Message",
                                value: {
                                    [payload.msgId]: payload.value
                                },
                                isEdit: payload.isEdit
                            },
                            markId: markId,
                            fromWebsocket: true,  // 不要发到 ws 去
                            notReplyToWebsocket: true
                        }).then((data) => {

                            if (!data.success) {
                                reply({success: false});
                                return;
                            }

                            if (payload.autoAddOrder) {

                                const prevIndex = messagesOrder.indexOf(payload.value.prevMessage);

                                let newMessagesOrder;

                                if (prevIndex !== -1) {
                                    if (payload.orderReplace) {  // 是否是替换模式
                                        newMessagesOrder = [...messagesOrder.slice(0, prevIndex + 1), payload.msgId, ...messagesOrder.slice(prevIndex + 2)];
                                    } else {
                                        newMessagesOrder = [...messagesOrder.slice(0, prevIndex + 1), payload.msgId];
                                    }
                                } else {
                                    // 找不到 prevMessage，直接追加
                                    newMessagesOrder = [...messagesOrder, payload.msgId];
                                }

                                emitEvent({
                                    type: "message",
                                    target: "ChatPage",
                                    payload: {
                                        command: "MessagesOrder-Meta",
                                        value: newMessagesOrder
                                    },
                                    markId: markId,
                                    fromWebsocket: true,  // 不要发到 ws 去
                                    notReplyToWebsocket: true
                                }).then(data => {

                                    // 修改消息链
                                    emitEvent({
                                        type: "message",
                                        target: "ChatPage",
                                        payload: {
                                            command: "Add-Message-Messages",
                                            msgId: payload.value.prevMessage,
                                            value: payload.msgId,
                                            switch: true
                                        },
                                        markId: markId,
                                        fromWebsocket: true,  // 不要发到 ws 去
                                        notReplyToWebsocket: true
                                    }).then(data => {
                                        if (!payload.noClear) {
                                            if (isEditMessageRef.current) {
                                                const editDraft = editDraftRef.current;
                                                if (editDraft) clearMessageDraft(editDraft.message, editDraft.mode);
                                                leaveEditMode();
                                            } else {
                                                updateMessageContent("");
                                                setAttachments([]);
                                            }
                                        }
                                        reply(data);
                                    })
                                })

                            }
                        })


                    })
                } else {
                    console.error('Shot-Message Failed. Need msgId, value, value.name in payload at least.');
                    reply({success: false});
                }

                break;
        }
    }, [attachmentsMeta, buildOutboundToolsStatus, chatboxSetup, leaveEditMode, markId, onSendMessage, roles, setAttachments, showCollapsedChatBox, toolsStatus, updateMessageContent]);

    const renderMenuItems = useExtraToolsMenuItems({
        toolsStatus,
        setToolsStatus,
        runtimeToolPermissions,
        onToolPermissionChange: syncToolPermission,
        highZClass,
        t,
        isMobileMenu: isSmallScreen,
        mobileOpenSections: mobileOpenMenuSections,
        setMobileOpenSections: setMobileOpenMenuSections,
    });

    // ========== 副作用 ==========

    useEffect(() => {
        toolPermissionRevisionRef.current = 0;
        conversationToolPermissionsRef.current = {};
        runtimeToolPermissionRevisionRef.current = 0;
        runtimeToolPermissionStreamIdRef.current = null;
        setRuntimeToolPermissions({});
        setConversationToolDefaults({});
        setConversationToolsDialogOpen(false);
        activeTaskModeRef.current = null;
        activeTaskModesRef.current = new Map();
        setActiveTaskMode(null);
        setActiveTaskModeOptions([]);
        taskInterruptPendingRef.current = false;
        setIsTaskInterruptPending(false);
    }, [markId]);

    useEffect(() => {
        if (Object.keys(conversationToolPermissionsRef.current).length === 0) return;
        setToolsStatus(prev => ({
            ...prev,
            extra_tools: applyToolPermissionsToStatus(
                extraTools,
                prev.extra_tools || {},
                conversationToolPermissionsRef.current
            ),
        }));
    }, [extraTools]);

    useEffect(() => onEvent({
        type: 'agent',
        target: 'ToolPermission',
        markId,
    }).then(({payload}) => {
        if (payload?.command !== 'Tool-Permission-Changed') return;

        if (payload.scope === 'conversation') {
            applyConversationToolPermissions(payload.permissions || {}, payload.revision);
            return;
        }

        if (payload.scope === 'run') {
            const revision = Number(payload.revision) || 0;
            const streamId = payload.streamId || null;
            if (payload.cleared) {
                if (
                    runtimeToolPermissionStreamIdRef.current
                    && streamId
                    && runtimeToolPermissionStreamIdRef.current !== streamId
                ) return;
                runtimeToolPermissionRevisionRef.current = 0;
                runtimeToolPermissionStreamIdRef.current = null;
                setRuntimeToolPermissions({});
                return;
            }
            if (
                runtimeToolPermissionStreamIdRef.current === streamId
                && revision < runtimeToolPermissionRevisionRef.current
            ) return;
            runtimeToolPermissionRevisionRef.current = revision;
            runtimeToolPermissionStreamIdRef.current = streamId;
            setRuntimeToolPermissions(payload.permissions || {});
        }
    }), [applyConversationToolPermissions, markId]);

    // 更新引用值
    useEffect(() => {
        sendButtonStatusRef.current = sendButtonStatus;
        messageContentRef.current = messageContent;
        isEditMessageRef.current = isEditMessage;
        onVoiceRecordingCancelRef.current = onVoiceRecordingCancel;
    }, [sendButtonStatus, messageContent, isEditMessage, onVoiceRecordingCancel]);

    // 响应式屏幕检测：复用 useIsMobile，保持桌面/移动端语音交互分支一致。
    useEffect(() => {
        const isSmall = Boolean(isMobileDevice);
        setIsSmallScreen(isSmall);
        if ((isSmall && tipMessageIsForNewLine) || !getLocalSetting('ShowShiftEnterNewlineTip', true)) {
            setTipMessage(null);
            setTipMessageIsForNewLine(false);
            setShowTipMessage(false);
        }
    }, [isMobileDevice, tipMessageIsForNewLine]);

    // 切换到桌面端时关闭移动端语音模式，避免残留“长按录音”按钮。
    useEffect(() => {
        if (!isSmallScreen) {
            setIsMobileVoiceMode(false);
        }
    }, [isSmallScreen]);

    // 桌面端为开关制靠底隐藏；移动端只保留点击隐藏/展开的按钮制。
    useEffect(() => {
        if (!isSmallScreen && !isBottomAutoHideEnabled) {
            showCollapsedChatBox();
        }
    }, [isBottomAutoHideEnabled, isSmallScreen, showCollapsedChatBox]);

    useEffect(() => () => clearAutoHideTimer(), [clearAutoHideTimer]);

    // 只读/卸载时停止录音并释放麦克风。
    useEffect(() => {
        if (isReadOnly) {
            setIsMobileVoiceMode(false);
            setIsVoiceRecognizing(false);
            stopVoiceRecording({emitPcm: false});
        }
    }, [isReadOnly, stopVoiceRecording]);

    useEffect(() => {
        return () => {
            voiceRecorderRef.current?.cancel?.();
            voiceRecorderRef.current = null;
            onVoiceRecordingCancelRef.current?.({markId});
        };
    }, [markId]);

    // 加载工具配置。markId 变化时重新读取服务器权威的会话工具权限；
    // 新对话尚无 markId 时读取用户级默认权限。
    useEffect(() => {
        if (apiEndpoint.CHATBOX_ENDPOINT.trim() === '') {
            setToolsLoadedStatus(-1);
            return undefined;
        }

        let cancelled = false;
        setToolsLoadedStatus(0);
        apiClient
            .get(apiEndpoint.CHATBOX_ENDPOINT, {
                params: markId ? {markId} : undefined,
            })
            .then(data => {
                if (cancelled) return;
                chatboxSetup(data);
                setToolsLoadedStatus(2);
            })
            .catch(() => {
                if (!cancelled) setToolsLoadedStatus(3);
            });

        return () => {
            cancelled = true;
        };
    }, [chatboxSetup, markId]);

    // 监听事件广播
    useEffect(() => {
        const unsubscribe = onEvent({
            type: "widget",
            target: "ChatBox",
            markId: markId,
            acceptReply: false,
            onlyEmpty: Boolean(!markId)
        }).then(handleEventBroadcast);
        return () => unsubscribe();
    }, [handleEventBroadcast, markId]);

    // 页面切换时恢复对应会话的普通输入草稿。
    useEffect(() => {
        const previousMarkId = previousMarkIdRef.current;
        if (previousMarkId === markId) return;

        const previousStorageKey = currentDraftStorageKeyRef.current;
        const nextStorageKey = getStandaloneDraftStorageKey(markId);
        const isNewConversationAssigned = !previousMarkId && Boolean(markId);

        previousMarkIdRef.current = markId;
        currentDraftStorageKeyRef.current = nextStorageKey;
        editDraftRef.current = null;
        isEditMessageRef.current = false;
        pendingEditClearRef.current = false;
        standaloneAttachmentsRef.current = [];
        setIsEditMessage(false);
        setIsForkMode(false);
        setEditMessageId(null);

        // 新对话首次发送时，Get-MarkId 会先让 markId 从空值切换为正式 ID。
        // 此时保留当前输入与附件，避免随后的 Shot-Message 回读到空内容；
        // 同时把普通草稿迁移到正式会话键，后端发送 Clear 后会正常删除。
        if (isNewConversationAssigned) {
            saveStandaloneDraft(previousStorageKey, '');
            saveStandaloneDraft(nextStorageKey, messageContentRef.current);
            return;
        }

        setAttachments([]);
        updateMessageContent(readStandaloneDraft(nextStorageKey), {persist: false});
    }, [markId, setAttachments, updateMessageContent]);

    // 更新附件高度。附件数量、容器宽度和过渡动画都会改变实际高度，
    // 使用 ResizeObserver 避免 rootMaxHeight 沿用旧值而裁掉附件滚动按钮。
    useLayoutEffect(() => {
        const container = attachmentRef.current;
        if (!container) return undefined;

        let frameId = 0;
        const updateHeight = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(() => {
                setAttachmentHeight(container.scrollHeight || 0);
            });
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        const resizeObserver = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(updateHeight)
            : null;
        resizeObserver?.observe(container);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('resize', updateHeight);
            resizeObserver?.disconnect();
        };
    }, [attachmentsMeta]);

    // 桌面端折叠位移必须覆盖 ChatBox 自身高度、它到 ChatPage 底部的间隙，
    // 并额外越过边界一小段安全距离。折叠把手已独立渲染，因此 ChatBox 主体无需再保留
    // collapsedHeight；这样可规避圆角、阴影、缩放和小数像素造成的残边。
    useLayoutEffect(() => {
        if (isSmallScreen) {
            setCollapsedTranslateY(0);
            return undefined;
        }

        const root = rootRef.current;
        if (!root) return undefined;

        const host = editorHostRef?.current || null;
        let animationFrameId = null;

        const readCurrentTranslateY = () => {
            const transform = window.getComputedStyle(root).transform;
            if (!transform || transform === 'none') return 0;

            try {
                return new window.DOMMatrixReadOnly(transform).m42 || 0;
            } catch (_) {
                const matrix3dMatch = transform.match(/^matrix3d\((.+)\)$/);
                if (matrix3dMatch) {
                    return Number(matrix3dMatch[1].split(',')[13]) || 0;
                }

                const matrixMatch = transform.match(/^matrix\((.+)\)$/);
                return matrixMatch ? (Number(matrixMatch[1].split(',')[5]) || 0) : 0;
            }
        };

        const measureCollapsedTranslate = () => {
            animationFrameId = null;

            const rootRect = root.getBoundingClientRect();
            const hostBottom = host?.getBoundingClientRect?.().bottom ?? window.innerHeight;
            const currentTranslateY = readCurrentTranslateY();
            const untransformedRootBottom = rootRect.bottom - currentTranslateY;
            const bottomGap = Math.max(0, hostBottom - untransformedRootBottom);
            const nextTranslateY = Math.max(
                0,
                rootRect.height + bottomGap + CHATBOX_COLLAPSE_OVERSHOOT_PX,
            );

            setCollapsedTranslateY((previousValue) => (
                Math.abs(previousValue - nextTranslateY) < 0.5
                    ? previousValue
                    : nextTranslateY
            ));
        };

        const scheduleMeasurement = () => {
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = window.requestAnimationFrame(measureCollapsedTranslate);
        };

        // 首次同步测量，避免自动隐藏开启时出现一帧错误位移。
        measureCollapsedTranslate();

        const observer = new ResizeObserver(scheduleMeasurement);
        observer.observe(root);
        if (host && host !== root) observer.observe(host);
        window.addEventListener('resize', scheduleMeasurement);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', scheduleMeasurement);
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [editorHostRef, isSmallScreen]);

    // ChatBox 宽
    useLayoutEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            setContainerWidth(entries[0]?.contentRect?.width ?? 0);
        });

        observer.observe(el);
        setContainerWidth(el.getBoundingClientRect().width); // 立即设置初始宽度

        return () => observer.disconnect();
    }, []);

    // 响应式宽度更新
    useLayoutEffect(() => {
        const updateWidth = () => {
            if (quickOptions.length > 0 && quickOptionsRef.current?.firstElementChild) {
                // 触发布局更新
            }
        };
        const timeoutId = setTimeout(updateWidth, 100);
        window.addEventListener('resize', updateWidth);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateWidth);
        };
    }, [quickOptions]);

    // 根元素高度观察
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const newHeight = entry.contentRect.height;
                if (onHeightChange) {
                    onHeightChange(isChatBoxCollapsed ? CHATBOX_COLLAPSED_HEIGHT : newHeight);
                }
            }
        });
        const currentRoot = rootRef.current;
        if (currentRoot) {
            resizeObserver.observe(currentRoot);
        }
        return () => {
            if (currentRoot) {
                resizeObserver.unobserve(currentRoot);
            }
        };
    }, [isChatBoxCollapsed, onHeightChange]);

    useEffect(() => {
        if (!onHeightChange) return;
        if (isChatBoxCollapsed) {
            onHeightChange(CHATBOX_COLLAPSED_HEIGHT);
            return;
        }

        const currentHeight = rootRef.current?.getBoundingClientRect?.().height;
        if (currentHeight) {
            onHeightChange(currentHeight);
        }
    }, [isChatBoxCollapsed, onHeightChange]);

    // 保存额外工具状态到本地存储
    useEffect(() => {
        const localOnlyStatus = extractLocalOnlyExtraToolStatus(
            [...extraTools, ...attachmentTools],
            toolsStatus.extra_tools || {}
        );
        try {
            localStorage.setItem('extraToolsConfig', JSON.stringify(localOnlyStatus));
        } catch (error) {
            console.error('Failed to save extra_tools status to localStorage:', error);
        }
    }, [attachmentTools, extraTools, toolsStatus.extra_tools]);

    // ========== 使用 useMemo 缓存不需要频繁计算的 props ==========

    const chatBoxHeaderProps = useMemo(() => ({
        quickOptions,
        isSmallScreen,
        showTipMessage,
        tipMessage,
        isReadOnly,
        onOptionClick: handleOptionClick,
        currentPageIndex,
        setCurrentPageIndex,
        quickOptionsRef,
        selectedOption: selectedQuickOption,
        isTransitioning,
    }), [
        quickOptions,
        isSmallScreen,
        showTipMessage,
        tipMessage,
        isReadOnly,
        handleOptionClick,
        currentPageIndex,
        selectedQuickOption,
        isTransitioning,
    ]);

    const voiceInputNode = useMemo(() => (
        <VoiceInputButton
            isMobile={isSmallScreen}
            isMobileVoiceMode={isMobileVoiceMode}
            isRecording={isVoiceRecording}
            isPending={voiceActionPending}
            disabled={isReadOnly}
            onClick={handleVoiceButtonClick}
            labels={{
                input: voiceText.input,
                switchToText: voiceText.switchToText,
                cancelRecording: voiceText.cancelRecording,
            }}
        />
    ), [
        handleVoiceButtonClick,
        isMobileVoiceMode,
        isReadOnly,
        isSmallScreen,
        isVoiceRecording,
        voiceActionPending,
        voiceText.cancelRecording,
        voiceText.input,
        voiceText.switchToText,
    ]);

    const toolButtonsProps = useMemo(() => ({
        toolsLoadedStatus,
        extraTools,
        attachmentTools,
        tools,
        toolsStatus,
        setToolsStatus,
        setToolsLoadedStatus,
        renderMenuItems, // 传递函数
        t,
        isWindowMode,
        containerWidth,
        voiceInputNode,
        isMobileMenu: isSmallScreen,
        mobileOpenSections: mobileOpenMenuSections,
        setMobileOpenSections: setMobileOpenMenuSections,
        onManageConversationTools: () => setConversationToolsDialogOpen(true),
        conversationToolsDisabled: isReadOnly || !markId,
    }), [toolsLoadedStatus, extraTools, attachmentTools, tools, toolsStatus,
        setToolsStatus, setToolsLoadedStatus, renderMenuItems, t, isWindowMode, containerWidth, voiceInputNode, isSmallScreen, mobileOpenMenuSections, isReadOnly, markId]);

    const autoHideButtonLabel = isSmallScreen
        ? t('chatbox_hide')
        : (
            isBottomAutoHideEnabled
                ? t('chatbox_disable_auto_hide')
                : t('chatbox_enable_auto_hide')
        );
    const collapsedButtonLabel = t('chatbox_show');
    const isMobileCollapsed = isSmallScreen && isChatBoxCollapsed;
    const rootMaxHeightStyle = attachmentHeight > 0 ? `calc(100% + ${attachmentHeight}px)` : '100%';

    return (
        <>
            <ConversationToolsDialog
                open={conversationToolsDialogOpen}
                onOpenChange={setConversationToolsDialogOpen}
                toolsConfig={extraTools}
                currentPermissions={currentConversationToolPermissions}
                defaultPermissions={conversationToolDefaults}
                onApply={syncToolPermissions}
                disabled={isReadOnly || !markId}
                t={t}
            />
            <DropFileLayer
                onDropFiles={(files, items) => {
                    if (ignoreAttachmentTools) {
                        toast.error(t('upload_files_disable'));
                        return;
                    }
                    onDropFiles(files, items);
                }}
                onFolderDetected={onFolderDetected}
                targetRef={dropTargetRef}
            />
            <ChatBoxInteractionHost markId={markId}/>
            {isMobileCollapsed && (
                <div className="mx-auto w-full max-w-225 px-4 py-2 pointer-events-auto">
                    <button
                        type="button"
                        aria-label={collapsedButtonLabel}
                        title={collapsedButtonLabel}
                        className="mx-auto flex h-8 items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-4 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 cursor-pointer"
                        onClick={showCollapsedChatBox}
                    >
                        <span className="h-1.5 w-10 rounded-full bg-gray-300"/>
                        <span>{collapsedButtonLabel}</span>
                    </button>
                </div>
            )}
            {!isSmallScreen && isChatBoxCollapsed && (
                <button
                    type="button"
                    aria-label={collapsedButtonLabel}
                    title={collapsedButtonLabel}
                    className="pointer-events-auto absolute left-1/2 -bottom-8 z-[5] flex h-5 w-16 -translate-x-1/2 items-center justify-center rounded-full opacity-40 transition-opacity duration-150 hover:opacity-100 focus:opacity-100 focus:outline-none cursor-pointer"
                    onMouseEnter={showCollapsedChatBox}
                    onClick={showCollapsedChatBox}
                >
                    <span className="h-1 w-10 rounded-full bg-gray-400/80 shadow-sm"/>
                </button>
            )}
            <div
                ref={rootRef}
                aria-hidden={!isSmallScreen && isChatBoxCollapsed ? true : undefined}
                className="pointer-events-none relative isolate mx-auto flex w-full max-w-225 flex-col overflow-hidden px-4 py-4"
                onMouseEnter={handleChatBoxMouseEnter}
                onMouseLeave={handleChatBoxMouseLeave}
                style={{
                    transitionProperty: 'max-height, transform, opacity',
                    transitionDuration: '0.3s, 0.34s, 0.14s',
                    transitionTimingFunction: 'ease-in-out, cubic-bezier(0.4, 0, 0.2, 1), ease-out',
                    transitionDelay: !isSmallScreen && isChatBoxCollapsed
                        ? '0s, 0s, 0.2s'
                        : '0s, 0s, 0s',
                    maxHeight: rootMaxHeightStyle,
                    display: isMobileCollapsed ? 'none' : undefined,
                    opacity: !isSmallScreen && isChatBoxCollapsed ? 0 : 1,
                    transform: !isSmallScreen && isChatBoxCollapsed
                        ? `translateY(${collapsedTranslateY}px)`
                        : 'translateY(0)',
                }}
            >
                <ChatBoxHeader {...chatBoxHeaderProps} />
                <div
                    className="border-1 relative flex min-h-0 flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-200 ease-in-out hover:shadow-lg focus-within:shadow-lg pointer-events-auto">
                    {/* 文件上传进度 */}
                    <div
                        className="relative z-[1] shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{height: uploadFiles.length > 0 ? 'auto' : 0, minHeight: 0}}
                    >
                        <FileUploadProgress uploadFiles={uploadFiles} onRetry={onRetryUpload}
                                            onCancel={onCancelUpload}/>
                    </div>

                    {/* 附件展示 */}
                    <div
                        ref={attachmentRef}
                        className="shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            height: attachmentsMeta.length > 0 ? 'auto' : 0,
                            opacity: attachmentsMeta.length > 0 ? 1 : 0,
                            paddingTop: attachmentsMeta.length > 0 ? '0.375rem' : 0,
                            paddingBottom: attachmentsMeta.length > 0 ? '0.375rem' : 0,
                        }}
                    >
                        <AttachmentShowcase attachmentsMeta={attachmentsMeta} onRemove={onAttachmentRemove}/>
                    </div>

                    {/* 消息编辑状态提示 */}
                    <div className="pt-2 pl-2 pr-2">
                        <EditMessageIndicator
                            isForkMode={isForkMode}
                            isEditMessage={isEditMessage}
                            onCancel={handleCancelEdit}
                            onClear={handleClearEdit}
                            t={t}
                        />

                        {/* 消息输入组件 */}
                        <MessageInput
                            value={messageContent}
                            onChange={handleInputChange}
                            onPaste={handlePaste}
                            onKeyDown={handleKeyDown}
                            onInputActivity={handleInputActivity}
                            onFocus={handleMessageInputFocus}
                            onBlur={handleMessageInputBlur}
                            isReadOnly={isReadOnly}
                            placeholder={t('input_placeholder')}
                            textareaRef={textareaRef}
                            isEditMessage={isEditMessage}
                            isSmallScreen={isSmallScreen}
                            isVoiceRecording={isVoiceRecording}
                            isVoiceRecognizing={isVoiceRecognizing}
                            voiceWaveformLevels={voiceWaveformLevels}
                            voiceRecordingLabel={voiceText.recordingAria}
                            voiceRecognizingLabel={voiceText.recognizingAria}
                            voiceRecognizingText={voiceText.recognizingText}
                        />

                        {isSmallScreen && isMobileVoiceMode && (
                            <button
                                type="button"
                                className="mt-2 mb-4 flex w-full select-none items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isReadOnly || voiceActionPending || isVoiceRecognizing}
                                onPointerDown={handleMobileVoicePointerDown}
                                onPointerUp={(event) => finishMobileVoicePointer(event, true)}
                                onPointerCancel={(event) => finishMobileVoicePointer(event, false)}
                                onContextMenu={(event) => event.preventDefault()}
                                aria-label={voiceText.holdToRecord}
                            >
                                {isVoiceRecording ? voiceText.releaseToFinish : voiceText.holdToRecord}
                            </button>
                        )}
                    </div>

                    {/* 工具按钮和发送按钮 */}
                    <div className="flex min-h-10 shrink-0 flex-nowrap items-center justify-between gap-2 px-4 pb-3">
                        <div className="h-7 min-w-0 flex-1 overflow-hidden">
                            <ToolButtons {...toolButtonsProps}/>
                        </div>
                        <div className="flex shrink-0 items-center space-x-2">

                            {/* 靠底隐藏按钮 */}
                            <button
                                type="button"
                                aria-label={autoHideButtonLabel}
                                aria-pressed={!isSmallScreen ? isBottomAutoHideEnabled : undefined}
                                title={autoHideButtonLabel}
                                className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer ${isBottomAutoHideEnabled && !isSmallScreen ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-300' : 'text-gray-600 hover:bg-gray-200 focus:ring-gray-300'}`}
                                onClick={handleAutoHideToggle}
                            >
                                <svg
                                    className="icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    aria-hidden="true"
                                >
                                    <path d="M4 5h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="m8 11 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            {/* 放大按钮 */}
                            <button
                                type="button"
                                aria-label={t('zoom_in_input_box')}
                                className="p-2.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-offset-2 transition-colors cursor-pointer"
                                onClick={openFullscreenEditor}
                            >
                                <svg
                                    t="1758849161791"
                                    className="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="18774"
                                    width="26"
                                    height="26"
                                >
                                    <path
                                        d="M463.04 896H169.152A41.152 41.152 0 0 1 128 854.848V560.96a41.152 41.152 0 1 1 82.304 0v252.8h252.736a41.152 41.152 0 1 1 0 82.24z m391.808-391.808a41.152 41.152 0 0 1-41.152-41.152v-252.8H560.96a41.152 41.152 0 1 1 0-82.24h293.888c22.72 0 41.152 18.432 41.152 41.152v293.888a41.152 41.152 0 0 1-41.152 41.152z"
                                        fill="#000000"
                                        p-id="18775"
                                    ></path>
                                </svg>
                            </button>

                            {/* 角色选择按钮 */}
                            <RoleSelector
                                roles={roles}
                                currentRole={currentRole}
                                selectedModel={selectedModel}
                                highZClass={highZClass}
                                onRoleChange={setCurrentRole}
                            />

                            {activeTaskModeOptions.length > 1 && (
                                <select
                                    value={activeTaskMode?.taskRunId || ''}
                                    onChange={(event) => {
                                        const selected = activeTaskModesRef.current.get(event.target.value) || null;
                                        activeTaskModeRef.current = selected;
                                        setActiveTaskMode(selected);
                                    }}
                                    className="max-w-36 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-400"
                                    aria-label={t('task_mode_target', '选择任务目标')}
                                    title={t('task_mode_target', '选择任务目标')}
                                >
                                    {activeTaskModeOptions.map(task => (
                                        <option key={task.taskRunId} value={task.taskRunId}>
                                            {task.title || task.taskRunId}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* 发送按钮 */}
                            <SendButton
                                status={sendButtonStatus}
                                messageContent={messageContent}
                                attachmentsMeta={attachmentsMeta}
                                onClick={handleSendMessage}
                                taskModeActive={Boolean(activeTaskMode?.active)}
                                taskInterruptPending={isTaskInterruptPending}
                                t={t}
                            />
                        </div>
                    </div>

                </div>

            </div>
            <FullscreenEditorModal
                isOpen={isModalOpen}
                portalTargetRef={editorHostRef}
                messageContent={messageContent}
                setMessageContent={updateMessageContent}
                isReadOnly={isReadOnly}
                onClose={closeFullscreenEditor}
                t={t}
            />
            <VoicePermissionDialog
                dialog={voicePermissionDialog}
                onConfirm={() => closeVoicePermissionDialog(true)}
                onCancel={() => closeVoicePermissionDialog(false)}
            />
        </>
    );
}

// 使用 React.memo 包裹主组件，并提供自定义比较函数
export default memo(ChatBox, (prevProps, nextProps) => {
    // 自定义比较函数，排除频繁变化的 props
    const prevAttachmentsMeta = prevProps.attachmentsMeta || [];
    const nextAttachmentsMeta = nextProps.attachmentsMeta || [];

    // 检查附件数组是否变化
    if (prevAttachmentsMeta.length !== nextAttachmentsMeta.length) {
        return false;
    }

    for (let i = 0; i < prevAttachmentsMeta.length; i++) {
        const prevAttachment = prevAttachmentsMeta[i];
        const nextAttachment = nextAttachmentsMeta[i];
        if (
            prevAttachment.id !== nextAttachment.id ||
            prevAttachment.name !== nextAttachment.name ||
            prevAttachment.preview !== nextAttachment.preview
        ) {
            return false;
        }
    }

    // 检查其他 props
    return (
        prevProps.readOnly === nextProps.readOnly &&
        prevProps.markId === nextProps.markId &&
        prevProps.uploadFiles === nextProps.uploadFiles &&
        prevProps.onSendMessage === nextProps.onSendMessage &&
        prevProps.FilePickerCallback === nextProps.FilePickerCallback &&
        prevProps.PicPickerCallback === nextProps.PicPickerCallback &&
        prevProps.onAttachmentRemove === nextProps.onAttachmentRemove &&
        prevProps.onImagePaste === nextProps.onImagePaste &&
        prevProps.onRetryUpload === nextProps.onRetryUpload &&
        prevProps.onCancelUpload === nextProps.onCancelUpload &&
        prevProps.onDropFiles === nextProps.onDropFiles &&
        prevProps.onFolderDetected === nextProps.onFolderDetected &&
        prevProps.onHeightChange === nextProps.onHeightChange &&
        prevProps.dropTargetRef === nextProps.dropTargetRef &&
        prevProps.editorHostRef === nextProps.editorHostRef &&
        prevProps.selectedModel === nextProps.selectedModel &&
        prevProps.isWindowMode === nextProps.isWindowMode &&
        prevProps.onVoicePcmReady === nextProps.onVoicePcmReady &&
        prevProps.onVoiceRecordingStart === nextProps.onVoiceRecordingStart &&
        prevProps.onVoiceRecordingCancel === nextProps.onVoiceRecordingCancel
    );
});
