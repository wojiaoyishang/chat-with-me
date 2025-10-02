import React, {useState, useRef, useEffect, useLayoutEffect, useMemo, Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Transition} from '@headlessui/react';
import {IoMdAdd} from "react-icons/io";
import {FaRedo, FaSearch} from "react-icons/fa";
import {FaEarthAmericas} from 'react-icons/fa6';
import {CheckIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import point3Loading from "@/components/loading/point3.jsx";
import SimpleMDEditor from "@/components/editor/SimpleMDEditor.jsx";
import ToggleSearchButton from "@/components/chat/ChatButton.jsx";
import {emitEvent, onEvent} from "@/store/useEventStore.jsx";
import ChatBoxHeader from './ChatBoxHeader';
import ToolButtons from './ToolButtons';

function ChatBox({onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback}) {
    /*
     * 状态和引用定义
     */
    const {t} = useTranslation();
    const [message, setMessage] = useState("");
    const [toolsStatus, setToolsStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(readOnly || false);
    const [showTipMessage, setShowTipMessage] = useState(true);
    const [tipMessage, setTipMessage] = useState("按下 Shift + Enter 换行");
    const [tipMessageIsForNewLine, setTipMessageIsForNewLine] = useState(true);
    const [tools, setTools] = useState([]);
    const [extraTools, setExtraTools] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [quickOptions, setQuickOptions] = useState([
        {id: 1, label: "今天天气怎么样？", value: "今天天气怎么样？"},
        {id: 2, label: "帮我写一封邮件", value: "请帮我写一封正式的邮件，主题是项目进度汇报。"},
        {id: 3, label: "解释量子力学", value: "用通俗语言解释一下量子力学的基本概念。"},
        {id: 4, label: "23213", value: "用通俗语言解释一下量子力学的基本概念。"},
        {id: 5, label: "解释21量子力学", value: "用通俗语言解释一下量子力学的基本概念。"},
        {id: 6, label: "解释21量子力22学", value: "用通俗语言解释一下量子力学的基本概念。"},
    ]);
    const quickOptionsRef = useRef(null);
    const [displayedQuickOptions, setDisplayedQuickOptions] = useState(quickOptions);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    // -1 -- 没有工具 0 -- 加载中 1 -- 已加载 2 -- 动画结束 3 -- 加载失败 4 -- 错误动画 5 -- 重试
    const [toolsLoadedStatus, setToolsLoadedStatus] = useState(0);
    const [sendButtonState, setSendButtonState] = useState('normal');
    const messageRef = useRef(message);
    const textareaRef = useRef(null);
    const cloneTextareaRef = useRef(null);
    const sendButtonStateRef = useRef(sendButtonState);
    // 新增状态：跟踪当前选中的快捷选项
    const [selectedQuickOption, setSelectedQuickOption] = useState(null);

    /*
     * 工具函数定义
     */

    /** 初始化用于计算高度的克隆文本区域 */
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

    /** 清理克隆文本区域 */
    const cleanupTextareaClone = () => {
        if (cloneTextareaRef.current) {
            document.body.removeChild(cloneTextareaRef.current);
            cloneTextareaRef.current = null;
        }
    };

    /** 调整文本区域高度 */
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

        if (contentHeight > 48) {
            textarea.style.overflowY = 'scroll';
        } else {
            textarea.style.overflowY = 'auto';
        }
    };

    /** 处理发送消息 */
    const handleSendMessage = () => {
        onSendMessage(message, toolsStatus, sendButtonState);
        textareaRef.current?.focus();
    };

    /** 处理键盘事件 */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                if (tipMessageIsForNewLine) {
                    chatboxSetup({tipMessage: null})
                }
                return;
            } else {
                e.preventDefault();
                handleSendMessage();
            }
        }
    };

    /** 渲染图标 */
    const renderIcon = (iconType, iconData) => {
        if (!iconData) return null;
        if (iconType === 'library') {
            const iconMap = {
                search: FaSearch,
                refresh: FaRedo,
                earth: FaEarthAmericas,
            };
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
    };

    /** 渲染菜单项 */
    const renderMenuItems = (items) => {
        return items.map((item, index) => {
            if (item.type === 'label') {
                return (
                    <DropdownMenuLabel
                        key={`label-${index}`}
                        className={`px-2 py-1.5 text-sm font-semibold ${
                            item.disabled ? 'text-gray-400 cursor-not-allowed' : ''
                        }`}
                    >
                        {t(item.text)}
                    </DropdownMenuLabel>
                );
            } else if (item.type === 'separator') {
                return <DropdownMenuSeparator key={`sep-${index}`}/>;
            } else if (item.type === 'group') {
                const isDisabled = item.disabled;
                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled
                                    ? 'text-gray-400 pointer-events-none opacity-70'
                                    : 'hover:bg-gray-100'
                            }`}
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
                const isChecked = toolsStatus.extra_tools[item.name];
                return (
                    <DropdownMenuItem
                        key={`toggle-${item.name}`}
                        onClick={(e) => {
                            if (isDisabled) {
                                e.preventDefault();
                                return;
                            }
                            setToolsStatus((prev) => ({
                                ...prev,
                                extra_tools: {
                                    ...prev.extra_tools,
                                    [item.name]: !prev.extra_tools[item.name],
                                },
                            }));
                        }}
                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                            isDisabled
                                ? 'text-gray-400 pointer-events-none opacity-70'
                                : 'hover:bg-gray-100'
                        }`}
                        disabled={isDisabled}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                        {!isDisabled && isChecked && (
                            <CheckIcon className="ml-auto w-4 h-4 text-blue-500"/>
                        )}
                    </DropdownMenuItem>
                );
            } else if (item.type === 'radio') {
                const isDisabled = item.disabled;
                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled
                                    ? 'text-gray-400 pointer-events-none opacity-70'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {item.children.map((child) => {
                                const childIsDisabled = child.disabled || false;
                                const isSelected =
                                    toolsStatus.extra_tools[item.name] === child.name;
                                return (
                                    <DropdownMenuItem
                                        key={`radio-${item.name}-${child.name}`}
                                        onClick={(e) => {
                                            if (isDisabled || childIsDisabled) {
                                                e.preventDefault();
                                                return;
                                            }
                                            setToolsStatus((prev) => ({
                                                ...prev,
                                                extra_tools: {
                                                    ...prev.extra_tools,
                                                    [item.name]: child.name,
                                                },
                                            }));
                                        }}
                                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                            childIsDisabled || isDisabled
                                                ? 'text-gray-400 pointer-events-none opacity-70'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        disabled={isDisabled || childIsDisabled}
                                    >
                                        {child.iconData &&
                                            renderIcon(child.iconType, child.iconData)}
                                        <span>{t(child.text)}</span>
                                        {isSelected && !isDisabled && !childIsDisabled && (
                                            <CheckIcon className="ml-auto w-4 h-4 text-blue-500"/>
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
                        onClick={(e) => {
                            if (item.onClick) {
                                item.onClick();
                            }
                        }}
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

    /** 初始化额外工具状态 */
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

    /** 渲染工具按钮 */
    const renderToolButtons = () => {
        return tools.map((tool) => {
            const isActive = tool.isActive ?? false;
            const disabled = tool.disabled ?? false;
            if (tool.iconType === 'library') {
                const iconData = {
                    search: FaSearch,
                    refresh: FaRedo,
                    earth: FaEarthAmericas,
                }[tool.iconData];
                return (
                    <ToggleSearchButton iconType="library" iconData={iconData} key={'ToggleSearchButton-' + tool.name}
                                        onClick={(e, isActive) => {
                                            const newStatus = {...toolsStatus};
                                            newStatus.builtin_tools[tool.name] = isActive;
                                            setToolsStatus(newStatus);
                                        }}
                                        text={t(tool.text)}
                                        isActive={isActive}
                                        disabled={disabled}
                                        bgColor={tool.bgColor}></ToggleSearchButton>
                );
            } else if (tool.iconType === 'svg' && tool.iconData) {
                return (
                    <ToggleSearchButton iconType="svg" iconData={tool.iconData} key={'ToggleSearchButton-' + tool.name}
                                        onClick={(e, isActive) => {
                                            const newStatus = {...toolsStatus};
                                            newStatus.builtin_tools[tool.name] = isActive;
                                            setToolsStatus(newStatus);
                                        }}
                                        text={t(tool.text)}
                                        isActive={isActive}
                                        disabled={disabled}
                                        bgColor={tool.bgColor}></ToggleSearchButton>
                )
            } else if (tool.iconType === 'image' && tool.iconData) {
                return (
                    <ToggleSearchButton iconType="image" iconData={tool.iconData}
                                        key={'ToggleSearchButton-' + tool.name}
                                        onClick={(e, isActive) => {
                                            const newStatus = {...toolsStatus};
                                            newStatus.builtin_tools[tool.name] = isActive;
                                            setToolsStatus(newStatus);
                                        }}
                                        text={t(tool.text)}
                                        isActive={isActive}
                                        disabled={disabled}
                                        bgColor={tool.bgColor}></ToggleSearchButton>
                );
            }
            return null;
        });
    };

    /** 发送按钮样式 */
    const sendButtonStyle = useMemo(() => {
        if (!message.trim() && sendButtonState === 'normal') {
            return {
                state: 'disabled',
                className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                icon: (
                    <svg t="1758800079268" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="6097" width="24" height="24">
                        <path
                            d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                            fill="#9ca3af"
                            p-id="6098"
                        ></path>
                    </svg>
                ),
                disabled: true
            };
        }

        switch (sendButtonState) {
            case 'disabled':
                return {
                    state: 'disabled',
                    className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                    icon: (
                        <svg t="1758800079268" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="6097" width="24" height="24">
                            <path
                                d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                                fill="#9ca3af"
                                p-id="6098"
                            ></path>
                        </svg>
                    ),
                    disabled: true
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
                    disabled: false
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
                    disabled: false
                };
            case 'normal':
            default:
                return {
                    state: 'normal',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer',
                    icon: (
                        <svg
                            t="1758800079268"
                            className="icon"
                            viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="6097"
                            width="24"
                            height="24"
                        >
                            <path
                                d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                                fill="#ffffff"
                                p-id="6098"
                            ></path>
                        </svg>
                    ),
                    disabled: false
                };
        }
    }, [message, sendButtonState]);

    /** 配置聊天框 */
    const chatboxSetup = (data) => {
        const newBuiltinStatus = {};
        const newExtraStatus = initializeExtraTools(data.extra_tools || []);

        const defaultAttachmentTools = [
            {
                type: 'label',
                text: '附件选项'
            },
            {
                type: 'button',
                text: '添加图片',
                iconType: 'svg',
                iconData: '<svg t="1759404220982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4746" width="20" height="20"><path d="M247.04 373.333333a74.666667 74.666667 0 1 1 149.333333 0 74.666667 74.666667 0 0 1-149.333333 0zM321.706667 384a10.666667 10.666667 0 1 0 0-21.333333 10.666667 10.666667 0 0 0 0 21.333333z" fill="#666666" p-id="4747"></path><path d="M938.666667 796.074667c0 43.050667-33.834667 72.106667-70.4 77.653333a83.925333 83.925333 0 0 1-12.672 0.938667H168.405333a83.072 83.072 0 0 1-12.672-0.981334c-36.565333-5.546667-70.4-34.56-70.4-77.653333V232.021333C85.333333 185.898667 122.965333 149.333333 168.405333 149.333333h687.189334C901.034667 149.333333 938.666667 185.941333 938.666667 232.021333v564.053334zM170.666667 743.381333V789.333333h682.666666v-42.538666l-252.885333-250.666667-138.581333 149.930667a42.666667 42.666667 0 0 1-55.466667 5.12L333.098667 599.04 170.666667 743.424z m682.666666-99.754666V234.666667H170.666667v394.538666l131.072-116.522666a42.666667 42.666667 0 0 1 53.077333-2.901334l71.125333 50.56 138.026667-149.333333A42.666667 42.666667 0 0 1 618.666667 405.333333l234.666666 238.293334z" fill="#666666" p-id="4748"></path></svg>',
                onClick: PicPickerCallback
            },
            {
                type: 'button',
                text: '添加文件',
                iconType: 'svg',
                iconData: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>',
                onClick: FilePickerCallback
            }

        ];

        const allExtraTools = data.extra_tools
            ? [...data.extra_tools, ...defaultAttachmentTools]
            : defaultAttachmentTools;

        if (data.builtin_tools) {
            data.builtin_tools.forEach((tool) => {
                newBuiltinStatus[tool.name] = false;
            });
            setTools(data.builtin_tools);
        }


        // 更新状态
        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: {...prev.builtin_tools, ...newBuiltinStatus},
            extra_tools: {...prev.extra_tools, ...newExtraStatus}
        }));
        setExtraTools(allExtraTools); // 存储配置


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
                        setTimeout(() => {
                            setShowTipMessage(false);
                        }, parseInt(data.tipMessageFadeOutDelay))
                    }
                }, 300)
            }
        }
    }

    /**
     * 处理快捷选项点击
     * 逻辑：
     * 1. 如果点击的是已选中的选项：
     *    - 如果输入框内容未改变（仍是该选项的值），则清空输入框并取消选中
     *    - 如果输入框内容已改变，则只取消选中
     * 2. 如果点击的是未选中的选项，则选中该选项并设置输入框内容
     */
    const handleOptionClick = (option) => {
        if (selectedQuickOption === option.id) {
            // 再次点击已选中的选项
            if (message === option.value) {
                // 输入框内容未改变，清空输入框
                setMessage('');
                setSelectedQuickOption(null);
            } else {
                // 输入框内容已改变，只取消选中
                setSelectedQuickOption(null);
            }
        } else {
            // 点击新的选项
            setMessage(option.value);
            setSelectedQuickOption(option.id);
            textareaRef.current?.focus();
        }
    };

    /**
     * 处理输入框内容变化
     * 当输入框内容改变时，如果当前有选中的快捷选项且输入内容与选项值不同，则取消选中
     */
    const handleInputChange = (e) => {
        if (isReadOnly) return;

        const newValue = e.target.value;
        setMessage(newValue);

        // 如果当前有选中的快捷选项
        if (selectedQuickOption !== null) {
            const selectedOption = quickOptions.find(opt => opt.id === selectedQuickOption);
            // 如果选中选项存在且输入内容与选项值不同，则取消选中
            if (selectedOption && newValue !== selectedOption.value) {
                setSelectedQuickOption(null);
            }
        }
    };

    /*
     * 生命周期和副作用
     */

    /** 初始化快捷选项宽度计算 */
    useLayoutEffect(() => {
        const updateWidth = () => {
            if (quickOptions.length > 0 && quickOptionsRef.current?.firstElementChild) {
                const firstBtn = quickOptionsRef.current.firstElementChild;
                const width = firstBtn.offsetWidth + 8;
                // 宽度计算仅用于内部，不需要存储
            }
        };

        const timeoutId = setTimeout(() => {
            updateWidth();
        }, 100);

        window.addEventListener('resize', updateWidth);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateWidth);
        };
    }, [quickOptions]);

    /** 同步状态到引用 */
    useEffect(() => {
        sendButtonStateRef.current = sendButtonState;
        messageRef.current = message;
    }, [sendButtonState, message]);

    /** 调整文本区域高度 */
    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    /** 加载工具配置 */
    useEffect(() => {
        if (toolsLoadedStatus === 0) {
            if (CHATBOX_API.trim() === '') {
                setToolsLoadedStatus(-1);
                return;
            }
            fetch(CHATBOX_API)
                .then((response) => response.json())
                .then((data) => {
                    chatboxSetup(data);
                    setToolsLoadedStatus(1);
                })
                .catch((error) => {
                    setToolsLoadedStatus(3);
                });
        }
    }, [toolsLoadedStatus]);

    /** 处理外部事件 */
    useEffect(() => {
        const unsubscribe = onEvent("widget", "ChatBox").then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "SendButton-State":
                    const validStates = ['disabled', 'normal', 'loading', 'generating'];
                    if (validStates.includes(payload.value)) {
                        setSendButtonState(payload.value);
                        reply({command: 'SendButton-State', value: payload.value});
                    } else {
                        reply({command: 'SendButton-State', value: sendButtonStateRef.current});
                    }
                    break;
                case "Set-Message":
                    setMessage(payload.value);
                    reply({command: 'Set-Message', success: true});
                    break;
                case "Get-Message":
                    reply({command: 'Get-Message', value: messageRef.current});
                    break;
                case "Setup-ChatBox":
                    if (payload.value.builtin_tools || payload.value.extra_tools) {
                        setToolsLoadedStatus(-1);
                    }
                    reply({command: 'Setup-ChatBox', success: true});
                    setTimeout(() => {
                        chatboxSetup(payload.value);
                        setToolsLoadedStatus(2);
                    }, 500)
                    break;
                case "Set-QuickOptions":
                    setIsTransitioning(true);

                    setTimeout(()=>{
                        setQuickOptions(payload.value);
                        setIsTransitioning(false);
                    }, 500)

                    reply({command: 'Setup-QuickOptions', success: true});
                    break;
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    /** 检测屏幕大小变化 */
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 500);
            if (window.innerWidth < 500 && tipMessageIsForNewLine) {
                setTipMessage(null);
                setTipMessageIsForNewLine(false);
                setShowTipMessage(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    /** 初始化和清理克隆文本区域 */
    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, []);


    return (
        <div className="w-full max-w-2xl px-4">
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

            <div
                className="bg-white rounded-2xl transition-shadow duration-200 ease-in-out hover:shadow-md focus-within:shadow-lg">
                <div className="pt-2 pl-2 pr-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange}  // 使用新的处理函数
                        onKeyDown={(e) => {
                            if (isReadOnly) return;
                            handleKeyDown(e);
                        }}
                        placeholder={t("输入你的消息...")}
                        className="w-full min-h-[48px] max-h-[132px] p-4 pt-4 pb-2 pr-4 text-gray-800 bg-transparent border-none resize-none outline-none pretty-scrollbar"
                        rows={1}
                        style={{
                            transition: 'height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
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
                    {/* 发送区域 */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            aria-label={t("放大输入框")}
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
                            aria-label={t("发送消息")}
                            className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors 
                            ${sendButtonStyle.className}
                            `}
                        >
                            {sendButtonStyle.icon}
                        </button>
                    </div>
                </div>
            </div>

            {/* MD编辑器模态框 */}
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
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 bg-black/40">
                        <div
                            className="bg-white rounded-2xl w-full max-w-3xl h-[80vh] p-6 relative
                            transition-all duration-200 ease-out transform"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                aria-label={t("关闭")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <div className="h-full w-full">
                                <div className="h-full p-5">
                                    <SimpleMDEditor
                                        text={message}
                                        setText={setMessage}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Transition>
        </div>
    );
}

export default ChatBox;