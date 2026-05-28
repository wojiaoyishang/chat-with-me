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
import RoleSelector from './chatbox/components/RoleSelector';
import FullscreenEditorModal from './chatbox/components/FullscreenEditorModal';
import {useExtraToolsMenuItems} from './chatbox/components/ExtraToolsMenuItems';
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

const normalizeVoiceRecognitionEngine = (value) => (
    String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'
);

const applyLocalSettingBackedExtraToolStatus = (status, toolsConfig = []) => {
    let result = {...status};

    const visit = (items = [], parentPath = []) => {
        items.forEach((item) => {
            if (!item?.name) return;
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
                     windowRef,
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
    const [messageContent, setMessageContent] = useState('');
    const [toolsStatus, setToolsStatus] = useState({});

    // 全屏编辑器
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 窗口模式下全屏编辑器填满 windowRef 的位置/尺寸
    const [modalPosition, setModalPosition] = useState({});

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
    const [containerWidth, setContainerWidth] = useState(0);


    // 使用 useRef 缓存频繁变化的值，避免触发重新渲染
    const messageContentRef = useRef(messageContent);
    const sendButtonStatusRef = useRef(sendButtonStatus);

    // 发送消息角色身份相关
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);


    // ========== 回调函数（使用 useCallback 缓存）==========
    const handleSendMessage = useCallback(() => {
        onSendMessage({
            messageContent: messageContentRef.current,
            toolsStatus: toolsStatus,
            isEditMessage: isEditMessage,
            editMessageId: editMessageId,
            attachments: attachmentsMeta,
            sendButtonStatus: sendButtonStatusRef.current,
            isRegenerate: false,
            role: currentRole?.name,
            isFork: isForkMode
        });
        textareaRef.current?.focus();
        setIsForkMode(false);
        setIsEditMessage(false);
    }, [onSendMessage, toolsStatus, isEditMessage, editMessageId, attachmentsMeta, currentRole]);

    const handleKeyDown = useCallback((e) => {
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
        if (sendButtonStatusRef.current !== 'normal') {
            toast.warning(t('is_generating_try_later'));
            return;
        }
        handleSendMessage();
    }, [handleSendMessage, isSmallScreen, t, tipMessageIsForNewLine]);

    const handleInputChange = useCallback((newValue) => {
        if (isReadOnly) return;

        // 更新 ref 值，不触发重新渲染
        messageContentRef.current = newValue;

        // 更新状态，触发重新渲染
        setMessageContent(newValue);

        // 防抖处理快捷选项状态更新
        if (selectedQuickOption !== null) {
            const selectedOption = quickOptions.find(opt => opt.id === selectedQuickOption);
            if (selectedOption && newValue !== selectedOption.value) {
                setSelectedQuickOption(null);
            }
        }
    }, [isReadOnly, selectedQuickOption, quickOptions]);

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
                messageContentRef.current = '';
                setMessageContent('');
                setSelectedQuickOption(null);
            } else {
                setSelectedQuickOption(null);
            }
        } else {
            messageContentRef.current = option.value;
            setMessageContent(option.value);
            setSelectedQuickOption(option.id);
            textareaRef.current?.focus();
        }
    }, [selectedQuickOption]);

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

        setMessageContent((previousValue) => {
            const separator = previousValue && !/\s$/.test(previousValue) ? ' ' : '';
            const nextValue = `${previousValue || ''}${separator}${normalizedText}`;
            messageContentRef.current = nextValue;
            return nextValue;
        });

        // 语音识别回填文本时不要主动 focus 输入框。
        // 移动端主动 blur，避免识别完成后软键盘被唤起。
        blurTextInputOnMobile();
    }, [blurTextInputOnMobile]);

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

    // ========== 工具初始化函数 ==========

    const initializeExtraTools = useCallback((toolsConfig) => {
        const processItems = (items) => {
            const status = {};
            items.forEach(item => {
                if (!item.name) return;
                if (item.type === 'toggle') {
                    status[item.name] = !!item.default;
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
                savedExtraStatus = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to parse saved extra_tools status:', error);
        }

        const mergedExtraStatus = applyLocalSettingBackedExtraToolStatus(
            deepMerge(defaultExtraStatus, savedExtraStatus),
            allExtraTools
        );

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
                    reply({value: payload.value});
                } else {
                    reply({value: sendButtonStatusRef.current});
                }
                if (payload.readOnly !== undefined) {
                    setIsReadOnly(Boolean(payload.readOnly));
                }
                break;
            case "Set-MessageContent":
                setMessageContent(payload.value);
                break;
            case "Get-MessageContent":
                reply({value: messageContentRef.current});
                break;
            case "Setup-ChatBox":
                if (payload.value.builtin_tools || payload.value.extra_tools) {
                    setToolsLoadedStatus(-1);
                }
                setTimeout(() => {
                    chatboxSetup(payload.value);
                    setToolsLoadedStatus(2);
                }, 500);
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
                            toolsStatus: toolsStatus,
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
                    setIsEditMessage(Boolean(payload.isEdit));
                    setIsForkMode(Boolean(payload.isFork));
                    if (payload.attachments) setAttachments(payload.attachments);
                    if (payload.content) setMessageContent(payload.content);
                    if (payload.msgId) setEditMessageId(payload.msgId);
                    if (payload.role) {
                        const foundRole = roles.find(item => item.name === payload.role)
                        if (foundRole) {
                            setCurrentRole(foundRole);
                        } else {
                            setCurrentRole({name: payload.role, text: "?"});
                        }
                    }
                }

                break;

            case "Clear":
                setAttachments([]);
                setMessageContent("");
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
                                            setIsEditMessage(false);
                                            setMessageContent("");
                                            setAttachments([]);
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
    }, [chatboxSetup, onSendMessage, setAttachments, toolsStatus, markId]);

    const renderMenuItems = useExtraToolsMenuItems({
        toolsStatus,
        setToolsStatus,
        highZClass,
        t,
        isMobileMenu: isSmallScreen,
        mobileOpenSections: mobileOpenMenuSections,
        setMobileOpenSections: setMobileOpenMenuSections,
    });

    // ========== 副作用 ==========

    // 更新引用值
    useEffect(() => {
        sendButtonStatusRef.current = sendButtonStatus;
        messageContentRef.current = messageContent;
        onVoiceRecordingCancelRef.current = onVoiceRecordingCancel;
    }, [sendButtonStatus, messageContent, onVoiceRecordingCancel]);

    // 窗口模式下全屏编辑器填满 windowRef（位置 + 大小）
    useLayoutEffect(() => {
        if (!isModalOpen || !isWindowMode || !windowRef?.current) {
            setModalPosition({});
            return;
        }

        const updatePosition = () => {
            const rect = windowRef.current.getBoundingClientRect();
            setModalPosition({
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                zIndex: 100001,
            });
        };

        updatePosition();

        const observer = new ResizeObserver(updatePosition);
        observer.observe(windowRef.current);

        // 滚动时也要更新位置（防止窗口滚动导致偏移）
        const handleScroll = () => updatePosition();
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [isModalOpen, isWindowMode, windowRef]);

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

    // 加载工具配置
    useEffect(() => {
        if (toolsLoadedStatus === 0) {
            if (apiEndpoint.CHATBOX_ENDPOINT.trim() === '') {
                setToolsLoadedStatus(-1);
                return;
            }
            apiClient
                .get(apiEndpoint.CHATBOX_ENDPOINT)
                .then(data => {
                    chatboxSetup(data);
                    setToolsLoadedStatus(1);
                })
                .catch(() => {
                    setToolsLoadedStatus(3);
                });
        }
    }, [toolsLoadedStatus, chatboxSetup]);

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

    // 页面切换清理
    useEffect(() => {
        setIsEditMessage(false);
    }, [markId]);

    // 更新附件高度
    useEffect(() => {
        const updateHeight = () => {
            if (attachmentRef.current) {
                requestAnimationFrame(() => {
                    setAttachmentHeight(attachmentRef.current?.scrollHeight);
                });
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [attachmentsMeta]);

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
                    onHeightChange(newHeight);
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
    }, [onHeightChange]);

    // 保存额外工具状态到本地存储
    useEffect(() => {
        if (Object.keys(toolsStatus.extra_tools || {}).length > 0) {
            try {
                localStorage.setItem('extraToolsConfig', JSON.stringify(toolsStatus.extra_tools));
            } catch (error) {
                console.error('Failed to save extra_tools status to localStorage:', error);
            }
        }
    }, [toolsStatus.extra_tools]);

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
    }), [toolsLoadedStatus, extraTools, attachmentTools, tools, toolsStatus,
        setToolsStatus, setToolsLoadedStatus, renderMenuItems, t, isWindowMode, containerWidth, voiceInputNode, isSmallScreen, mobileOpenMenuSections]);

    return (
        <>
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
            <div
                ref={rootRef}
                className="w-full max-w-225 px-4 py-4 overflow-hidden mx-auto"
                style={{
                    transition: 'height 0.3s ease-in-out, max-height 0.3s ease-in-out',
                    height: 'auto',
                    maxHeight: attachmentHeight > 0 ? `calc(100% + ${attachmentHeight}px)` : '100%',
                }}
            >
                <ChatBoxHeader {...chatBoxHeaderProps} />
                <div
                    className="border-1 bg-white rounded-2xl transition-shadow duration-200 ease-in-out hover:shadow-lg focus-within:shadow-lg pointer-events-auto">
                    {/* 文件上传进度 */}
                    <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{height: uploadFiles.length > 0 ? 'auto' : 0, minHeight: 0}}
                    >
                        <FileUploadProgress uploadFiles={uploadFiles} onRetry={onRetryUpload}
                                            onCancel={onCancelUpload}/>
                    </div>

                    {/* 附件展示 */}
                    <div
                        ref={attachmentRef}
                        className="overflow-hidden transition-all duration-300 ease-in-out"
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
                            setIsForkMode={setIsForkMode}
                            isEditMessage={isEditMessage}
                            setIsEditMessage={setIsEditMessage}
                            setAttachments={setAttachments}
                            setMessageContent={setMessageContent}
                            t={t}
                        />

                        {/* 消息输入组件 */}
                        <MessageInput
                            value={messageContent}
                            onChange={handleInputChange}
                            onPaste={handlePaste}
                            onKeyDown={handleKeyDown}
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
                    <div className="flex items-center justify-between px-4 pb-3">
                        <ToolButtons {...toolButtonsProps}/>
                        <div className="flex items-center space-x-2">

                            {/* 放大按钮 */}
                            <button
                                type="button"
                                aria-label={t('zoom_in_input_box')}
                                className="p-2.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-offset-2 transition-colors cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
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

                            {/* 发送按钮 */}
                            <SendButton
                                status={sendButtonStatus}
                                messageContent={messageContent}
                                attachmentsMeta={attachmentsMeta}
                                onClick={handleSendMessage}
                                t={t}
                            />
                        </div>
                    </div>

                </div>

                <FullscreenEditorModal
                    isOpen={isModalOpen}
                    isWindowMode={isWindowMode}
                    modalPosition={modalPosition}
                    messageContent={messageContent}
                    setMessageContent={setMessageContent}
                    isReadOnly={isReadOnly}
                    onClose={() => setIsModalOpen(false)}
                    t={t}
                />
                <VoicePermissionDialog
                    dialog={voicePermissionDialog}
                    onConfirm={() => closeVoicePermissionDialog(true)}
                    onCancel={() => closeVoicePermissionDialog(false)}
                />
            </div>
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
        prevProps.selectedModel === nextProps.selectedModel &&
        prevProps.isWindowMode === nextProps.isWindowMode &&
        prevProps.onVoicePcmReady === nextProps.onVoicePcmReady &&
        prevProps.onVoiceRecordingStart === nextProps.onVoiceRecordingStart &&
        prevProps.onVoiceRecordingCancel === nextProps.onVoiceRecordingCancel
    );
});