import React, {useState, useRef, useEffect, useLayoutEffect, useMemo, Fragment, useCallback, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Transition} from '@headlessui/react';
import {motion, AnimatePresence} from 'framer-motion';
import {Check, X, PenLine, Trash2, Minus, Square, RotateCw, Search, Earth} from 'lucide-react';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import SimpleMDEditor from '@/components/editor/SimpleMDEditor.jsx';
import ToggleButton from '@/components/chat/ChatButton.jsx';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';
import ChatBoxHeader from './ChatBoxHeader';
import ToolButtons from './ToolButtons';
import AttachmentShowcase from './AttachmentShowcase';
import FileUploadProgress from './FileUploadProgress';
import DropFileLayer from '@/components/chat/DropFileLayer.jsx';
import {toast} from 'sonner';
import {apiEndpoint} from '@/config.js';
import apiClient from '@/lib/apiClient';
import {getLocalSetting, isMobile, setLocalSetting} from '@/lib/tools.jsx';

// ========== 对象操作辅助函数（移到外部，避免每次渲染都创建）==========

const getNestedValue = (obj, path) => {
    if (!obj || !path || path.length === 0) return undefined;
    let current = obj;
    for (const key of path) {
        if (current[key] === undefined) return undefined;
        current = current[key];
    }
    return current;
};

const setNestedValue = (obj, path, value) => {
    if (!path || path.length === 0) return obj;
    const result = {...obj};
    let current = result;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    current[path[path.length - 1]] = value;
    return result;
};

const deleteNestedValue = (obj, path) => {
    if (!path || path.length === 0) return obj;
    if (path.length === 1) {
        const result = {...obj};
        delete result[path[0]];
        return result;
    }
    const parentPath = path.slice(0, -1);
    const key = path[path.length - 1];
    const parent = getNestedValue(obj, parentPath);
    if (parent && typeof parent === 'object') {
        const newParent = {...parent};
        delete newParent[key];
        if (Object.keys(newParent).length === 0) {
            return deleteNestedValue(obj, parentPath);
        }
        return setNestedValue(obj, parentPath, newParent);
    }
    return obj;
};

const deepMerge = (target, source) => {
    if (typeof source !== 'object' || source === null) return target;
    const output = {...target};
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && typeof output[key] === 'object') {
                output[key] = deepMerge(output[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }
    }
    return output;
};

const collectTogglePaths = (items, parentPath = []) => {
    let paths = [];
    items.forEach(item => {
        if (!item.name) return;
        const currentPath = [...parentPath, item.name];
        if (item.type === 'toggle') {
            paths.push(currentPath);
        } else if (item.type === 'group' && item.children) {
            paths = [...paths, ...collectTogglePaths(item.children, currentPath)];
        }
    });
    return paths;
};

const getGroupCheckState = (extraTools, togglePaths) => {
    if (togglePaths.length === 0) return 'unchecked';
    let checkedCount = 0;
    togglePaths.forEach(path => {
        if (getNestedValue(extraTools, path)) checkedCount++;
    });
    if (checkedCount === togglePaths.length) return 'checked';
    if (checkedCount > 0) return 'indeterminate';
    return 'unchecked';
};

const toggleAllInGroup = (extraTools, togglePaths, toChecked) => {
    let newExtraTools = {...extraTools};
    togglePaths.forEach(path => {
        newExtraTools = setNestedValue(newExtraTools, path, toChecked);
    });
    return newExtraTools;
};

// ========== 独立的消息输入组件（避免打字时触发整个ChatBox重新渲染）==========

const MessageInput = memo(({
                               value,
                               onChange,
                               onPaste,
                               onKeyDown,
                               isReadOnly,
                               placeholder,
                               textareaRef,
                               isEditMessage,
                           }) => {
    const cloneTextareaRef = useRef(null);

    // 高度调整逻辑
    const initTextareaClone = useCallback(() => {
        if (cloneTextareaRef.current) return;
        const textarea = textareaRef.current;
        if (!textarea) return;
        const clone = textarea.cloneNode();
        Object.assign(clone.style, {
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            visibility: 'hidden',
            height: 'auto',
            resize: 'none',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: '-1',
        });
        document.body.appendChild(clone);
        cloneTextareaRef.current = clone;
    }, [textareaRef]);

    const cleanupTextareaClone = useCallback(() => {
        if (cloneTextareaRef.current) {
            document.body.removeChild(cloneTextareaRef.current);
            cloneTextareaRef.current = null;
        }
    }, []);

    const adjustTextareaHeight = useCallback(() => {
        const textarea = textareaRef.current;
        const clone = cloneTextareaRef.current;
        if (!textarea || !clone) return;

        clone.value = textarea.value;
        clone.style.width = textarea.offsetWidth + 'px';
        const computedStyle = getComputedStyle(textarea);
        clone.style.fontFamily = computedStyle.fontFamily;
        clone.style.fontSize = computedStyle.fontSize;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.border = computedStyle.border;
        clone.style.boxSizing = computedStyle.boxSizing;

        const contentHeight = clone.scrollHeight;
        const cappedHeight = Math.min(contentHeight, 512);
        textarea.style.height = cappedHeight + 'px';
        textarea.style.overflowY = contentHeight > 48 ? 'scroll' : 'auto';
    }, [textareaRef]);

    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, [initTextareaClone, cleanupTextareaClone]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [value, isEditMessage, adjustTextareaHeight]);

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[48px] max-h-[132px] p-4 pt-4 pb-2 pr-4 text-gray-800 bg-transparent border-none resize-none outline-none pretty-scrollbar"
            rows={1}
            style={{transition: 'height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}
        />
    );
}, (prevProps, nextProps) => {
    // 只有当必要属性变化时才重新渲染
    return (
        prevProps.value === nextProps.value &&
        prevProps.isReadOnly === nextProps.isReadOnly &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.isEditMessage === nextProps.isEditMessage &&
        prevProps.onChange === nextProps.onChange &&
        prevProps.onPaste === nextProps.onPaste &&
        prevProps.onKeyDown === nextProps.onKeyDown
    );
});

MessageInput.displayName = 'MessageInput';

// ========== 独立的编辑状态提示组件 ==========

const EditMessageIndicator = memo(({isEditMessage, setIsEditMessage, setAttachments, setMessageContent, t}) => {
    const handleCancel = useCallback(() => {
        setIsEditMessage(false);
    }, [setIsEditMessage]);

    const handleClear = useCallback(() => {
        setIsEditMessage(false);
        setAttachments([]);
        setMessageContent('');
    }, [setIsEditMessage, setAttachments, setMessageContent]);

    if (!isEditMessage) return null;

    return (
        <Transition
            show={isEditMessage}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className="bg-gray-100 text-gray-800 text-sm font-medium py-3 px-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center">
                    <PenLine className="w-4 h-4 mr-2"/>
                    <span>{t('editing_message')}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-800 focus:rounded-full p-0.5 cursor-pointer"
                        aria-label={t('cancel_editing')}
                    >
                        <X className="w-4 h-4"/>
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-gray-600 hover:text-gray-800 focus:rounded-full p-0.5 cursor-pointer"
                        aria-label={t('cancel_editing')}
                    >
                        <Trash2 className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </Transition>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isEditMessage === nextProps.isEditMessage &&
        prevProps.t === nextProps.t &&
        prevProps.setIsEditMessage === nextProps.setIsEditMessage &&
        prevProps.setAttachments === nextProps.setAttachments &&
        prevProps.setMessageContent === nextProps.setMessageContent
    );
});

EditMessageIndicator.displayName = 'EditMessageIndicator';

// ========== 发送按钮组件 ==========

const SendButton = memo(({status, messageContent, attachmentsMeta, onClick, t}) => {
    const sendButtonStyle = useMemo(() => {
        const isEmpty = !messageContent.trim() && attachmentsMeta.length === 0 && status === 'normal';
        const baseIcon = (
            <svg
                t="1758800079268"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6097"
                width="24"
                height="24"
            >
                <path
                    d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                    fill={isEmpty ? '#9ca3af' : '#ffffff'}
                    p-id="6098"
                ></path>
            </svg>
        );

        if (isEmpty) {
            return {
                state: 'disabled',
                className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                icon: baseIcon,
                disabled: true,
            };
        }

        switch (status) {
            case 'disabled':
                return {
                    state: 'disabled',
                    className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                    icon: baseIcon,
                    disabled: true,
                };
            case 'loading':
                return {
                    state: 'loading',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: (
                        <div className="relative w-6 h-6">
                            <div
                                className="absolute inset-[-9px] border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded"></div>
                            </div>
                        </div>
                    ),
                    disabled: false,
                };
            case 'generating':
                return {
                    state: 'generating',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: (
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded"></div>
                            </div>
                        </div>
                    ),
                    disabled: false,
                };
            default:
                return {
                    state: 'normal',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer',
                    icon: baseIcon,
                    disabled: false,
                };
        }
    }, [status, messageContent, attachmentsMeta]);

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={sendButtonStyle.disabled}
            aria-label={t('send_message')}
            className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${sendButtonStyle.className}`}
        >
            {sendButtonStyle.icon}
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.status === nextProps.status &&
        prevProps.messageContent === nextProps.messageContent &&
        prevProps.attachmentsMeta === nextProps.attachmentsMeta &&
        prevProps.onClick === nextProps.onClick
    );
});

SendButton.displayName = 'SendButton';

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
                 }) {
    const {t} = useTranslation();

    // ========== 状态管理 ==========
    const [messageContent, setMessageContent] = useState('');
    const [toolsStatus, setToolsStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(readOnly);
    const [showTipMessage, setShowTipMessage] = useState(true);
    const [tipMessage, setTipMessage] = useState(t('shift_enter_newline'));
    const [tipMessageIsForNewLine, setTipMessageIsForNewLine] = useState(true);
    const [tools, setTools] = useState([]);
    const [extraTools, setExtraTools] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [quickOptions, setQuickOptions] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [toolsLoadedStatus, setToolsLoadedStatus] = useState(0);
    const [sendButtonStatus, setSendButtonStatus] = useState('normal');
    const [selectedQuickOption, setSelectedQuickOption] = useState(null);
    const [attachmentHeight, setAttachmentHeight] = useState(0);
    const [ignoreAttachmentTools, setIgnoreAttachmentTools] = useState(false);
    const [isEditMessage, setIsEditMessage] = useState(false);
    const [editMessageId, setEditMessageId] = useState(null);

    // ========== 引用 ==========
    const quickOptionsRef = useRef(null);
    const textareaRef = useRef(null);
    const attachmentRef = useRef(null);
    const rootRef = useRef(null);

    // 使用 useRef 缓存频繁变化的值，避免触发重新渲染
    const messageContentRef = useRef(messageContent);
    const sendButtonStatusRef = useRef(sendButtonStatus);

    // ========== 回调函数（使用 useCallback 缓存）==========

    const handleSendMessage = useCallback(() => {
        onSendMessage(
            messageContentRef.current,
            toolsStatus,
            isEditMessage,
            editMessageId,
            attachmentsMeta,
            sendButtonStatusRef.current
        );
        textareaRef.current?.focus();
    }, [onSendMessage, toolsStatus, isEditMessage, editMessageId, attachmentsMeta]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                if (tipMessageIsForNewLine) {
                    chatboxSetup({tipMessage: null});
                    setLocalSetting('ShowShiftEnterNewlineTip', false);
                }
                return;
            } else {
                e.preventDefault();
                if (sendButtonStatusRef.current !== 'normal') {
                    toast.warning(t('is_generating_try_later'));
                    return;
                }
                handleSendMessage();
            }
        }
    }, [handleSendMessage, tipMessageIsForNewLine]);

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
                setMessageContent('');
                setSelectedQuickOption(null);
            } else {
                setSelectedQuickOption(null);
            }
        } else {
            setMessageContent(option.value);
            setSelectedQuickOption(option.id);
            textareaRef.current?.focus();
        }
    }, [selectedQuickOption]);

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
        let defaultExtraStatus = initializeExtraTools(data.extra_tools || []);

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

        const allExtraTools = data.extra_tools
            ? [...data.extra_tools, ...defaultAttachmentTools]
            : defaultAttachmentTools;

        let savedExtraStatus = {};
        try {
            const saved = localStorage.getItem('extraToolsConfig');
            if (saved) {
                savedExtraStatus = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to parse saved extra_tools status:', error);
        }

        const mergedExtraStatus = deepMerge(defaultExtraStatus, savedExtraStatus);

        if (data.builtin_tools) {
            data.builtin_tools.forEach(tool => {
                newBuiltinStatus[tool.name] = false;
            });
            setTools(data.builtin_tools);
        }

        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: {...prev.builtin_tools, ...newBuiltinStatus},
            extra_tools: mergedExtraStatus,
        }));

        if (data.extra_tools) {
            setExtraTools(allExtraTools);
        }

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
    }, [FilePickerCallback, PicPickerCallback, initializeExtraTools]);

    // ========== 事件处理函数 ==========

    const handleEventBroadcast = useCallback((payload, markId, isReply, id, reply) => {
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

                if (payload.immediate) {
                    onSendMessage(payload.content, toolsStatus, true, payload.msgId, payload.attachments, sendButtonStatusRef.current, payload.isRegenerate);
                } else {
                    setIsEditMessage(Boolean(payload.isEdit));
                    if (payload.attachments) setAttachments(payload.attachments);
                    if (payload.content) setMessageContent(payload.content);
                    if (payload.msgId) setEditMessageId(payload.msgId);
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

                            if (payload.autoAddOrder === undefined || payload.autoAddOrder) {

                                const prevIndex = messagesOrder.indexOf(payload.value.prevMessage);

                                let newMessagesOrder = [];

                                if (prevIndex !== -1) {
                                    newMessagesOrder = [...messagesOrder.slice(0, prevIndex + 1), payload.msgId];
                                } else {
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
    }, [chatboxSetup, onSendMessage, setAttachments, toolsStatus]);

    // 在 ChatBox 组件内部定义渲染菜单项的函数
    const renderMenuItems = useCallback((items, parentPath = []) => {
        return items.map((item, index) => {
            if (item.type === 'label') {
                return (
                    <DropdownMenuLabel
                        key={`label-${index}`}
                        className={`px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    >
                        {t(item.text)}
                    </DropdownMenuLabel>
                );
            } else if (item.type === 'separator') {
                return <DropdownMenuSeparator key={`sep-${index}`}/>;
            } else if (item.type === 'group') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const togglePaths = collectTogglePaths(item.children, []);
                const checkState = getGroupCheckState(
                    toolsStatus.extra_tools,
                    togglePaths.map(path => [...currentPath, ...path])
                );
                const handleToggleAll = (e) => {
                    const toChecked = checkState === 'unchecked';
                    setToolsStatus(prev => ({
                        ...prev,
                        extra_tools: toggleAllInGroup(
                            prev.extra_tools,
                            togglePaths.map(path => [...currentPath, ...path]),
                            toChecked
                        ),
                    }));
                };
                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {!isDisabled && (
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={handleToggleAll}
                                    className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    <span>{t('select_all')}</span>
                                    {checkState === 'checked' && <Check className="ml-auto w-4 h-4 text-blue-500"/>}
                                    {checkState === 'indeterminate' &&
                                        <Minus className="ml-auto w-4 h-4 text-blue-500"/>}
                                    {checkState === 'unchecked' && <Square className="ml-auto w-4 h-4 text-gray-500"/>}
                                </DropdownMenuItem>
                            )}
                            {!isDisabled && <DropdownMenuSeparator/>}
                            {isDisabled ? null : renderMenuItems(item.children, currentPath)}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            } else if (item.type === 'toggle') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const isChecked = getNestedValue(toolsStatus.extra_tools, currentPath) ?? false;
                return (
                    <DropdownMenuItem
                        key={`toggle-${item.name}`}
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => {
                            if (isDisabled) {
                                e.preventDefault();
                                return;
                            }
                            setToolsStatus(prev => {
                                const newValue = !isChecked;
                                let newExtraTools = {...prev.extra_tools};
                                newExtraTools = setNestedValue(newExtraTools, currentPath, newValue);
                                return {
                                    ...prev,
                                    extra_tools: newExtraTools,
                                };
                            });
                        }}
                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                            isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                        }`}
                        disabled={isDisabled}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                        {!isDisabled && isChecked && <Check className="ml-auto w-4 h-4 text-blue-500"/>}
                    </DropdownMenuItem>
                );
            } else if (item.type === 'radio') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const currentValue = getNestedValue(toolsStatus.extra_tools, currentPath);

                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {item.children.map(child => {
                                const childIsDisabled = child.disabled || false;
                                const isSelected = currentValue === child.name;
                                return (
                                    <DropdownMenuItem
                                        key={`radio-${item.name}-${child.name}`}
                                        onSelect={(e) => e.preventDefault()}
                                        onClick={(e) => {
                                            if (isDisabled || childIsDisabled) {
                                                e.preventDefault();
                                                return;
                                            }
                                            setToolsStatus(prev => ({
                                                ...prev,
                                                extra_tools: setNestedValue(
                                                    {...prev.extra_tools},
                                                    currentPath,
                                                    child.name
                                                ),
                                            }));
                                        }}
                                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                            childIsDisabled || isDisabled
                                                ? 'text-gray-400 pointer-events-none opacity-70'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        disabled={isDisabled || childIsDisabled}
                                    >
                                        {child.iconData && renderIcon(child.iconType, child.iconData)}
                                        <span>{t(child.text)}</span>
                                        {isSelected && !isDisabled && !childIsDisabled && (
                                            <Check className="ml-auto w-4 h-4 text-blue-500"/>
                                        )}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            } else if (item.type === 'button') {
                const onSelectHandler = item.autoClose ? undefined : (e) => e.preventDefault();
                return (
                    <DropdownMenuItem
                        key={`button-${item.text || index}`}
                        onSelect={onSelectHandler}
                        onClick={() => item.onClick?.()}
                        className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                    </DropdownMenuItem>
                );
            }
            return null;
        });
    }, [toolsStatus.extra_tools, setToolsStatus]);

    // 需要将 renderIcon 函数也定义在组件内部
    const renderIcon = useCallback((iconType, iconData) => {
        if (!iconData) return null;
        if (iconType === 'library') {
            const iconMap = {search: Search, refresh: RotateCw, earth: Earth};
            const IconComponent = iconMap[iconData];
            return IconComponent ? <IconComponent className="w-4 h-4 mr-2"/> : null;
        } else if (iconType === 'svg') {
            return (
                <span
                    className="inline-block w-4 h-4 mr-2"
                    dangerouslySetInnerHTML={{__html: iconData}}
                />
            );
        } else if (iconType === 'image') {
            return <img src={iconData} alt="" className="w-4 h-4 mr-2"/>;
        }
        return null;
    }, []);

    // ========== 副作用 ==========

    // 更新引用值
    useEffect(() => {
        sendButtonStatusRef.current = sendButtonStatus;
        messageContentRef.current = messageContent;
    }, [sendButtonStatus, messageContent]);

    // 响应式屏幕检测
    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = isMobile();
            setIsSmallScreen(isSmall);
            if ((isSmall && tipMessageIsForNewLine) || !getLocalSetting('ShowShiftEnterNewlineTip', true)) {
                setTipMessage(null);
                setTipMessageIsForNewLine(false);
                setShowTipMessage(false);
            }
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [tipMessageIsForNewLine]);

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
        const unsubscribe = onEvent('widget', 'ChatBox', markId, false, !markId).then(handleEventBroadcast);
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

    const toolButtonsProps = useMemo(() => ({
        toolsLoadedStatus,
        extraTools,
        tools,
        toolsStatus,
        setToolsStatus,
        setToolsLoadedStatus,
        renderMenuItems, // 传递函数
        t,
    }), [toolsLoadedStatus, extraTools, tools, toolsStatus, setToolsStatus, setToolsLoadedStatus, renderMenuItems]);

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
                        />
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

                {/* 全屏编辑模态框 */}
                {isModalOpen && (

                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center  pointer-events-auto"
                        style={{
                            marginLeft: !isMobile() ? 'var(--sidebar-width)' : '0',
                            transition: 'margin-left 0.3s ease-in-out',
                        }}
                    >
                        <motion.div
                            initial={{opacity: 0, x: 10}}
                            animate={{opacity: 1, x: 0}}
                            className="h-full w-full mx-auto"
                        >
                            <div
                                className="bg-white z-50 w-full h-full p-0.5 relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute z-50 top-0 right-0 m-2 rounded-full bg-gray-200 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    aria-label={t('close')}
                                >
                                    <X className="w-5 h-5"/>
                                </button>
                                <div className="h-full p-5">
                                    <SimpleMDEditor
                                        text={messageContent}
                                        setText={setMessageContent}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>

                )}
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
        prevProps.dropTargetRef === nextProps.dropTargetRef
    );
});