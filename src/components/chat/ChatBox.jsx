import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { FaRedo, FaSearch } from "react-icons/fa";
import { FaEarthAmericas } from 'react-icons/fa6';
import { CheckIcon } from "lucide-react";
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import point3Loading from "@/components/loading/point3.jsx";
import SimpleMDEditor from "@/components/editor/SimpleMDEditor.jsx";
import ToggleSearchButton from "@/components/chat/ChatButton.jsx";
import { emitEvent, onEvent } from "@/store/useEventStore.jsx";
import ChatBoxHeader from './ChatBoxHeader';
import ToolButtons from './ToolButtons';
import AttachmentShowcase from './AttachmentShowcase';
import FileUploadProgress from './FileUploadProgress';
import DropFileLayer from "@/components/chat/DropFileLayer.jsx";

/**
 * ChatBox - 一个功能丰富的聊天输入区域组件
 *
 * 该组件提供了一个完整的聊天输入界面，支持：
 * - 多行文本输入（自动高度调整）
 * - 快捷选项（Quick Options）供用户快速选择预设消息
 * - 工具按钮（内置工具 + 额外工具菜单），支持 toggle、radio、group、button 等类型
 * - 附件展示与上传进度条（图片/文件）
 * - 粘贴图片自动上传
 * - 全屏编辑模式（Modal）
 * - 国际化（i18n）
 * - 动态配置（通过事件系统接收外部指令）
 * - 响应式设计（小屏适配）
 * - 发送按钮状态管理（normal / disabled / loading / generating）
 *
 * Props:
 * @param {Function} onSendMessage - 发送消息回调 (message, toolsStatus, sendButtonState)
 * @param {boolean} [readOnly=false] - 是否只读模式
 * @param {Function} FilePickerCallback - 触发文件选择器的回调
 * @param {Function} PicPickerCallback - 触发图片选择器的回调
 * @param {string} markId - 组件唯一标识，用于事件通信
 * @param {Array} [attachmentsMeta=[]] - 已上传附件元数据列表
 * @param {Array} [uploadFiles=[]] - 正在上传的文件列表
 * @param {Function} onAttachmentRemove - 移除附件回调
 * @param {Function} onImagePaste - 粘贴图片时的处理回调
 * @param {Function} onRetryUpload - 重试上传回调
 * @param {Function} onCancelUpload - 取消上传回调
 * @param {Function} onDropFiles - 拖拽文件回调
 * @param {Function} onFolderDetected - 拖拽文件夹上传检测
 */
function ChatBox({
                     onSendMessage,
                     readOnly = false,
                     FilePickerCallback,
                     PicPickerCallback,
                     markId,
                     attachmentsMeta = [],
                     uploadFiles = [],
                     onAttachmentRemove,
                     onImagePaste,
                     onRetryUpload,
                     onCancelUpload,
                     onDropFiles,
                     onFolderDetected
                 }) {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");
    const [toolsStatus, setToolsStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(readOnly);
    const [showTipMessage, setShowTipMessage] = useState(true);
    const [tipMessage, setTipMessage] = useState(t("shift_enter_newline"));
    const [tipMessageIsForNewLine, setTipMessageIsForNewLine] = useState(true);
    const [tools, setTools] = useState([]);
    const [extraTools, setExtraTools] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [quickOptions, setQuickOptions] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [toolsLoadedStatus, setToolsLoadedStatus] = useState(0);
    const [sendButtonState, setSendButtonState] = useState('normal');
    const [selectedQuickOption, setSelectedQuickOption] = useState(null);
    const [attachmentHeight, setAttachmentHeight] = useState(0);
    const [ignoreAttachmentTools, setIgnoreAttachmentTools] = useState(false);

    const quickOptionsRef = useRef(null);
    const messageRef = useRef(message);
    const textareaRef = useRef(null);
    const cloneTextareaRef = useRef(null);
    const sendButtonStateRef = useRef(sendButtonState);
    const attachmentRef = useRef(null);

    // ========== Textarea height logic ==========
    const initTextareaClone = () => {
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
            zIndex: '-1'
        });
        document.body.appendChild(clone);
        cloneTextareaRef.current = clone;
    };

    const cleanupTextareaClone = () => {
        if (cloneTextareaRef.current) {
            document.body.removeChild(cloneTextareaRef.current);
            cloneTextareaRef.current = null;
        }
    };

    const adjustTextareaHeight = () => {
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
        const cappedHeight = Math.min(contentHeight, 128);
        textarea.style.height = cappedHeight + 'px';
        textarea.style.overflowY = contentHeight > 48 ? 'scroll' : 'auto';
    };

    // ========== Message handling ==========
    const handleSendMessage = () => {
        onSendMessage(message, toolsStatus, sendButtonState);
        textareaRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                if (tipMessageIsForNewLine) chatboxSetup({ tipMessage: null });
                return;
            } else {
                e.preventDefault();
                handleSendMessage();
            }
        }
    };

    const handleInputChange = (e) => {
        if (isReadOnly) return;
        const newValue = e.target.value;
        setMessage(newValue);
        if (selectedQuickOption !== null) {
            const selectedOption = quickOptions.find(opt => opt.id === selectedQuickOption);
            if (selectedOption && newValue !== selectedOption.value) {
                setSelectedQuickOption(null);
            }
        }
    };

    const handlePaste = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (onImagePaste && typeof onImagePaste === 'function') {
                    e.preventDefault();
                    if (!ignoreAttachmentTools && !isReadOnly) onImagePaste(file);
                }
                return;
            }
        }
    };

    // ========== Quick options ==========
    const handleOptionClick = (option) => {
        if (selectedQuickOption === option.id) {
            if (message === option.value) {
                setMessage('');
                setSelectedQuickOption(null);
            } else {
                setSelectedQuickOption(null);
            }
        } else {
            setMessage(option.value);
            setSelectedQuickOption(option.id);
            textareaRef.current?.focus();
        }
    };

    // ========== Icon rendering ==========
    const renderIcon = (iconType, iconData) => {
        if (!iconData) return null;
        if (iconType === 'library') {
            const iconMap = { search: FaSearch, refresh: FaRedo, earth: FaEarthAmericas };
            const IconComponent = iconMap[iconData];
            return IconComponent ? <IconComponent className="w-4 h-4 mr-2" /> : null;
        } else if (iconType === 'svg') {
            return <span className="inline-block w-4 h-4 mr-2" dangerouslySetInnerHTML={{ __html: iconData }} />;
        } else if (iconType === 'image') {
            return <img src={iconData} alt="" className="w-4 h-4 mr-2" />;
        }
        return null;
    };

    const renderMenuItems = (items) => {
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
                return <DropdownMenuSeparator key={`sep-${index}`} />;
            } else if (item.type === 'group') {
                const isDisabled = item.disabled;
                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'}`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {isDisabled ? null : renderMenuItems(item.children)}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            } else if (item.type === 'toggle') {
                const isDisabled = item.disabled;
                const isChecked = toolsStatus.extra_tools?.[item.name];
                return (
                    <DropdownMenuItem
                        key={`toggle-${item.name}`}
                        onClick={(e) => {
                            if (isDisabled) { e.preventDefault(); return; }
                            setToolsStatus(prev => ({
                                ...prev,
                                extra_tools: {
                                    ...prev.extra_tools,
                                    [item.name]: !prev.extra_tools[item.name],
                                },
                            }));
                        }}
                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'}`}
                        disabled={isDisabled}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                        {!isDisabled && isChecked && <CheckIcon className="ml-auto w-4 h-4 text-blue-500" />}
                    </DropdownMenuItem>
                );
            } else if (item.type === 'radio') {
                const isDisabled = item.disabled;
                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'}`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {item.children.map(child => {
                                const childIsDisabled = child.disabled || false;
                                const isSelected = toolsStatus.extra_tools?.[item.name] === child.name;
                                return (
                                    <DropdownMenuItem
                                        key={`radio-${item.name}-${child.name}`}
                                        onClick={(e) => {
                                            if (isDisabled || childIsDisabled) { e.preventDefault(); return; }
                                            setToolsStatus(prev => ({
                                                ...prev,
                                                extra_tools: {
                                                    ...prev.extra_tools,
                                                    [item.name]: child.name,
                                                },
                                            }));
                                        }}
                                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${childIsDisabled || isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'}`}
                                        disabled={isDisabled || childIsDisabled}
                                    >
                                        {child.iconData && renderIcon(child.iconType, child.iconData)}
                                        <span>{t(child.text)}</span>
                                        {isSelected && !isDisabled && !childIsDisabled && (
                                            <CheckIcon className="ml-auto w-4 h-4 text-blue-500" />
                                        )}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            } else if (item.type === 'button') {
                return (
                    <DropdownMenuItem
                        key={`button-${item.text || index}`}
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
    };

    // ========== Tool initialization ==========
    const initializeExtraTools = (toolsConfig) => {
        const status = {};
        const processItems = (items) => {
            items.forEach(item => {
                if (item.type === 'toggle') {
                    status[item.name] = false;
                } else if (item.type === 'radio' && item.children?.length > 0) {
                    status[item.name] = item.children[0].name;
                } else if (item.type === 'group') {
                    processItems(item.children);
                }
            });
        };
        processItems(toolsConfig);
        return status;
    };

    // ========== Tool buttons ==========
    const renderToolButtons = () => {
        return tools.map((tool) => {
            const isActive = tool.isActive ?? false;
            const disabled = tool.disabled ?? false;
            const iconMap = { search: FaSearch, refresh: FaRedo, earth: FaEarthAmericas };
            let iconData = null;
            if (tool.iconType === 'library') {
                iconData = iconMap[tool.iconData];
            } else if (tool.iconType === 'svg' || tool.iconType === 'image') {
                iconData = tool.iconData;
            }
            if (!iconData) return null;

            return (
                <ToggleSearchButton
                    key={'ToggleSearchButton-' + tool.name}
                    iconType={tool.iconType}
                    iconData={iconData}
                    onClick={(e, isActive) => {
                        setToolsStatus(prev => ({
                            ...prev,
                            builtin_tools: { ...prev.builtin_tools, [tool.name]: isActive }
                        }));
                    }}
                    text={t(tool.text)}
                    isActive={isActive}
                    disabled={disabled}
                    bgColor={tool.bgColor}
                />
            );
        });
    };

    // ========== Send button ==========
    const sendButtonStyle = useMemo(() => {
        const isEmpty = !message.trim() && sendButtonState === 'normal';
        const baseIcon = (
            <svg t="1758800079268" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="6097" width="24" height="24">
                <path
                    d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                    fill={isEmpty ? "#9ca3af" : "#ffffff"}
                    p-id="6098"
                ></path>
            </svg>
        );

        if (isEmpty) {
            return {
                state: 'disabled',
                className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                icon: baseIcon,
                disabled: true
            };
        }

        switch (sendButtonState) {
            case 'disabled':
                return {
                    state: 'disabled',
                    className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                    icon: baseIcon,
                    disabled: true
                };
            case 'loading':
                return {
                    state: 'loading',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: (
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-[-9px] border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded"></div>
                            </div>
                        </div>
                    ),
                    disabled: false
                };
            case 'generating':
                return {
                    state: 'generating',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded"></div>
                        </div>
                    ),
                    disabled: false
                };
            default:
                return {
                    state: 'normal',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer',
                    icon: baseIcon,
                    disabled: false
                };
        }
    }, [message, sendButtonState]);

    // ========== Dynamic setup ==========
    const chatboxSetup = (data) => {
        const newBuiltinStatus = {};
        const newExtraStatus = initializeExtraTools(data.extra_tools || []);

        let defaultAttachmentTools = data.ignoreAttachmentTools ? [] : [
            { type: 'label', text: 'attachment_options' },
            {
                type: 'button',
                text: 'add_image',
                iconType: 'svg',
                iconData: '<svg t="1759404220982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4746" width="20" height="20"><path d="M247.04 373.333333a74.666667 74.666667 0 1 1 149.333333 0 74.666667 74.666667 0 0 1-149.333333 0zM321.706667 384a10.666667 10.666667 0 1 0 0-21.333333 10.666667 10.666667 0 0 0 0 21.333333z" fill="#666666" p-id="4747"></path><path d="M938.666667 796.074667c0 43.050667-33.834667 72.106667-70.4 77.653333a83.925333 83.925333 0 0 1-12.672 0.938667H168.405333a83.072 83.072 0 0 1-12.672-0.981334c-36.565333-5.546667-70.4-34.56-70.4-77.653333V232.021333C85.333333 185.898667 122.965333 149.333333 168.405333 149.333333h687.189334C901.034667 149.333333 938.666667 185.941333 938.666667 232.021333v564.053334zM170.666667 743.381333V789.333333h682.666666v-42.538666l-252.885333-250.666667-138.581333 149.930667a42.666667 42.666667 0 0 1-55.466667 5.12L333.098667 599.04 170.666667 743.424z m682.666666-99.754666V234.666667H170.666667v394.538666l131.072-116.522666a42.666667 42.666667 0 0 1 53.077333-2.901334l71.125333 50.56 138.026667-149.333333A42.666667 42.666667 0 0 1 618.666667 405.333333l234.666666 238.293334z" fill="#666666" p-id="4748"></path></svg>',
                onClick: PicPickerCallback
            },
            {
                type: 'button',
                text: 'add_file',
                iconType: 'svg',
                iconData: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>',
                onClick: FilePickerCallback
            }
        ];

        setIgnoreAttachmentTools(Boolean(data.ignoreAttachmentTools))

        const allExtraTools = data.extra_tools ? [...data.extra_tools, ...defaultAttachmentTools] : defaultAttachmentTools;

        if (data.builtin_tools) {
            data.builtin_tools.forEach(tool => {
                newBuiltinStatus[tool.name] = false;
            });
            setTools(data.builtin_tools);
        }

        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: { ...prev.builtin_tools, ...newBuiltinStatus },
            extra_tools: { ...prev.extra_tools, ...newExtraStatus }
        }));
        setExtraTools(allExtraTools);

        if (data.readOnly !== undefined) setIsReadOnly(Boolean(data.readOnly));
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
    };

    // ========== Effects ==========
    useEffect(() => {
        sendButtonStateRef.current = sendButtonState;
        messageRef.current = message;
    }, [sendButtonState, message]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.innerWidth < 500;
            setIsSmallScreen(isSmall);
            if (isSmall && tipMessageIsForNewLine) {
                setTipMessage(null);
                setTipMessageIsForNewLine(false);
                setShowTipMessage(false);
            }
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        if (toolsLoadedStatus === 0) {
            if (typeof CHATBOX_API === 'undefined' || CHATBOX_API.trim() === '') {
                setToolsLoadedStatus(-1);
                return;
            }
            fetch(CHATBOX_API)
                .then(res => res.json())
                .then(data => {
                    chatboxSetup(data);
                    setToolsLoadedStatus(1);
                })
                .catch(() => setToolsLoadedStatus(3));
        }
    }, [toolsLoadedStatus]);

    useEffect(() => {
        const unsubscribe = onEvent("widget", "ChatBox", markId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "SendButton-State":
                    const validStates = ['disabled', 'normal', 'loading', 'generating'];
                    if (validStates.includes(payload.value)) {
                        setSendButtonState(payload.value);
                        reply({ command: 'SendButton-State', value: payload.value });
                    } else {
                        reply({ command: 'SendButton-State', value: sendButtonStateRef.current });
                    }
                    break;
                case "Set-Message":
                    setMessage(payload.value);
                    reply({ command: 'Set-Message', success: true });
                    break;
                case "Get-Message":
                    reply({ command: 'Get-Message', value: messageRef.current });
                    break;
                case "Setup-ChatBox":
                    if (payload.value.builtin_tools || payload.value.extra_tools) {
                        setToolsLoadedStatus(-1);
                    }
                    reply({ command: 'Setup-ChatBox', success: true });
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
                    reply({ command: 'Setup-QuickOptions', success: true });
                    break;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const updateHeight = () => {
            if (attachmentRef.current) {
                requestAnimationFrame(() => {
                    setAttachmentHeight(attachmentRef.current.scrollHeight);
                });
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [attachmentsMeta]);

    useLayoutEffect(() => {
        const updateWidth = () => {
            if (quickOptions.length > 0 && quickOptionsRef.current?.firstElementChild) {
                // trigger layout
            }
        };
        const timeoutId = setTimeout(updateWidth, 100);
        window.addEventListener('resize', updateWidth);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateWidth);
        };
    }, [quickOptions]);

    return (
        <>
            <DropFileLayer
                onDropFiles={onDropFiles}
                onFolderDetected={onFolderDetected}
            />
            <div
                className="fixed bottom-10 left-0 right-0 z-50 w-full max-w-220 px-4 overflow-hidden mx-auto"
                style={{
                    transition: 'height 0.3s ease-in-out, max-height 0.3s ease-in-out',
                    height: 'auto',
                    maxHeight: attachmentHeight > 0 ? `calc(100% + ${attachmentHeight}px)` : '100%'
                }}
            >
                <ChatBoxHeader
                    quickOptions={quickOptions}
                    isSmallScreen={isSmallScreen}
                    showTipMessage={showTipMessage}
                    tipMessage={tipMessage}
                    isReadOnly={isReadOnly}
                    onOptionClick={handleOptionClick}
                    t={t}
                    currentPageIndex={currentPageIndex}
                    setCurrentPageIndex={setCurrentPageIndex}
                    quickOptionsRef={quickOptionsRef}
                    selectedOption={selectedQuickOption}
                    isTransitioning={isTransitioning}
                />

                <div className="border-1 bg-white rounded-2xl transition-shadow duration-200 ease-in-out hover:shadow-md focus-within:shadow-lg">
                    <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ height: uploadFiles.length > 0 ? 'auto' : 0, minHeight: 0 }}
                    >
                        <FileUploadProgress uploadFiles={uploadFiles} onRetry={onRetryUpload} onCancel={onCancelUpload} />
                    </div>

                    <div
                        ref={attachmentRef}
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            height: attachmentsMeta.length > 0 ? 'auto' : 0,
                            opacity: attachmentsMeta.length > 0 ? 1 : 0,
                            paddingTop: attachmentsMeta.length > 0 ? '0.375rem' : 0,
                            paddingBottom: attachmentsMeta.length > 0 ? '0.375rem' : 0
                        }}
                    >
                        <AttachmentShowcase
                            attachmentsMeta={attachmentsMeta}
                            onRemove={onAttachmentRemove}
                        />
                    </div>

                    <div className="pt-2 pl-2 pr-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange}
                        onPaste={handlePaste}
                        onKeyDown={(e) => !isReadOnly && handleKeyDown(e)}
                        placeholder={t("input_placeholder")}
                        className="w-full min-h-[48px] max-h-[132px] p-4 pt-4 pb-2 pr-4 text-gray-800 bg-transparent border-none resize-none outline-none pretty-scrollbar"
                        rows={1}
                        style={{ transition: 'height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                    />
                    </div>

                    <div className="flex items-center justify-between px-4 pb-3">
                        <ToolButtons
                            toolsLoadedStatus={toolsLoadedStatus}
                            extraTools={extraTools}
                            tools={tools}
                            toolsStatus={toolsStatus}
                            setToolsStatus={setToolsStatus}
                            point3Loading={point3Loading}
                            renderToolButtons={renderToolButtons}
                            renderMenuItems={renderMenuItems}
                            setToolsLoadedStatus={setToolsLoadedStatus}
                            t={t}
                        />

                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                aria-label={t("zoom_in_input_box")}
                                className="p-2.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-offset-2 transition-colors cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <svg t="1758849161791" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="18774" width="26" height="26">
                                    <path
                                        d="M463.04 896H169.152A41.152 41.152 0 0 1 128 854.848V560.96a41.152 41.152 0 1 1 82.304 0v252.8h252.736a41.152 41.152 0 1 1 0 82.24z m391.808-391.808a41.152 41.152 0 0 1-41.152-41.152v-252.8H560.96a41.152 41.152 0 1 1 0-82.24h293.888c22.72 0 41.152 18.432 41.152 41.152v293.888a41.152 41.152 0 0 1-41.152 41.152z"
                                        fill="#000000" fill-opacity=".45" p-id="18775"></path>
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={handleSendMessage}
                                disabled={sendButtonStyle.disabled}
                                aria-label={t("send_message")}
                                className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${sendButtonStyle.className}`}
                            >
                                {sendButtonStyle.icon}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition appear show={isModalOpen} as={Fragment}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 bg-black/40">
                            <div
                                className="bg-white rounded-2xl w-full max-w-3xl h-[80vh] p-6 relative transition-all duration-200 ease-out transform"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    aria-label={t("close")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <div className="h-full p-5">
                                    <SimpleMDEditor
                                        text={message}
                                        setText={setMessage}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </Transition>
            </div>
        </>

    );
}

export default ChatBox;