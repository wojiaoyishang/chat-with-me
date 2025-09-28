import React, {useState, useRef, useEffect, useMemo} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {Transition} from '@headlessui/react';
import {Fragment} from 'react';
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


function ChatBox({onSendMessage, readOnly = false}) {
    /*
    * 全局变量定义
    */
    const {t} = useTranslation();
    const [message, setMessage] = useState("");
    const [toolsStatus, setToolsStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);  // MD 编辑器打开
    const [isReadOnly, setIsReadOnly] = useState(readOnly || false);  // 是否只读
    const [tools, setTools] = useState([]);  // 内置工具
    const [extraTools, setExtraTools] = useState([]); // 额外工具菜单

    // -1 -- 没有工具或者正在切换工具 0 -- 发起请求等待响应 1 -- 已收到响应 2 -- 加载动画结束  3 -- 加载失败  4 -- 失败动画  5 -- 正在重试
    const [toolsLoadedStatus, setToolsLoadedStatus] = useState(0);
    const [open, setOpen] = useState(false);  // 控制 DropdownMenu 的打开和关闭

    // 发送按钮状态：'disabled', 'normal', 'loading', 'generating'
    const [sendButtonState, setSendButtonState] = useState('normal');

    const messageRef = useRef(message);
    const textareaRef = useRef(null);
    const cloneTextareaRef = useRef(null);  // 克隆用于计算高度的输入框
    const sendButtonStateRef = useRef(sendButtonState);

    useEffect(() => {
        sendButtonStateRef.current = sendButtonState;
        messageRef.current = message;
    }, [sendButtonState, message]);

    /*
    * 函数的定义
    */
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
            // 确保不会影响页面布局
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

        // 同步 textarea 的关键属性到克隆元素
        clone.value = textarea.value;
        clone.style.width = textarea.offsetWidth + 'px';

        // 同步关键样式（如果 textarea 样式可能动态变化）
        const computedStyle = getComputedStyle(textarea);
        clone.style.fontFamily = computedStyle.fontFamily;
        clone.style.fontSize = computedStyle.fontSize;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.border = computedStyle.border;
        clone.style.boxSizing = computedStyle.boxSizing;

        const height = Math.min(clone.scrollHeight, 128);
        textarea.style.height = height + 'px';

        const contentHeight = clone.scrollHeight;
        const cappedHeight = Math.min(contentHeight, 128);

        textarea.style.height = cappedHeight + 'px';

        if (contentHeight > 48) {
            textarea.style.overflowY = 'scroll';
        } else {
            textarea.style.overflowY = 'auto';
        }

    };

    const handleSendMessage = () => {
        // 只有在正常状态且消息不为空时才发送
        onSendMessage(message, toolsStatus, sendButtonState);
        textareaRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Shift + Enter：允许换行（不阻止默认行为）
                return false;
            } else {
                // 普通 Enter：发送消息
                e.preventDefault(); // 阻止换行
                handleSendMessage();
            }
        }
    };

    const renderIcon = (iconType, iconData) => {
        if (!iconData) return null;

        // 图标库类型 (react-icons)
        if (iconType === 'library') {
            const iconMap = {
                search: FaSearch,
                refresh: FaRedo,
                earth: FaEarthAmericas,
                // 可在此扩展更多图标
            };
            const IconComponent = iconMap[iconData];
            return IconComponent ? <IconComponent className="w-4 h-4 mr-2"/> : null;
        }

        // SVG 类型
        else if (iconType === 'svg') {
            return (
                <span
                    className="inline-block w-4 h-4 mr-2"
                    dangerouslySetInnerHTML={{__html: iconData}}
                />
            );
        }

        // 图片类型
        else if (iconType === 'image') {
            return <img src={iconData} alt="" className="w-4 h-4 mr-2"/>;
        }

        return null;
    };

    const renderMenuItems = (items) => {
        return items.map((item, index) => {
            // 标记型：仅标题
            if (item.type === 'label') {
                return (
                    <DropdownMenuLabel key={`label-${index}`} className="px-2 py-1.5 text-sm font-semibold">
                        {t(item.text)}
                    </DropdownMenuLabel>
                );
            }

            // 分隔线
            else if (item.type === 'separator') {
                return <DropdownMenuSeparator key={`sep-${index}`}/>;
            }

            // 修复：分组型 - 使用 DropdownMenuSub 而不是 DropdownMenuGroup
            else if (item.type === 'group') {
                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {renderMenuItems(item.children)}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            }

            // 按钮型：切换状态
            else if (item.type === 'toggle') {
                return (
                    <DropdownMenuItem
                        key={`toggle-${item.name}`}
                        onClick={() => {
                            setToolsStatus(prev => ({
                                ...prev,
                                extra_tools: {
                                    ...prev.extra_tools,
                                    [item.name]: !prev.extra_tools[item.name]
                                }
                            }));
                        }}
                        className="flex items-center cursor-pointer"
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                        {toolsStatus.extra_tools[item.name] && (
                            <CheckIcon className="ml-auto w-4 h-4 text-blue-500"/>
                        )}
                    </DropdownMenuItem>
                );
            }

            // 单选型：组内单选
            else if (item.type === 'radio') {
                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                            {/* 显示当前选中项 */}
                            {/*{toolsStatus.extra_tools[item.name] && (*/}
                            {/*    <span className="ml-auto text-xs text-gray-500">*/}
                            {/*        {item.children.find(c => c.name === toolsStatus.extra_tools[item.name])?.text || '未选择'}*/}
                            {/*    </span>*/}
                            {/*)}*/}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {item.children.map(child => (
                                <DropdownMenuItem
                                    key={`radio-${item.name}-${child.name}`}
                                    onClick={() => {
                                        setToolsStatus(prev => ({
                                            ...prev,
                                            extra_tools: {
                                                ...prev.extra_tools,
                                                [item.name]: child.name
                                            }
                                        }));
                                    }}
                                    className="flex items-center cursor-pointer"
                                >
                                    {child.iconData && renderIcon(child.iconType, child.iconData)}
                                    <span>{t(child.text)}</span>
                                    {toolsStatus.extra_tools[item.name] === child.name && (
                                        <CheckIcon className="ml-auto w-4 h-4 text-blue-500"/>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            }

            return null;
        });
    };

    const initializeExtraTools = (toolsConfig) => {
        const status = {};

        const processItems = (items) => {
            items.forEach(item => {
                if (item.type === 'toggle') {
                    status[item.name] = false;
                } else if (item.type === 'radio' && item.children?.length > 0) {
                    // 默认选中第一个选项
                    status[item.name] = item.children[0].name;
                } else if (item.type === 'group') {
                    processItems(item.children);
                }
            });
        };

        processItems(toolsConfig);
        return status;
    };

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

    const sendButtonStyle = useMemo(() => {
        // 消息为空时强制禁用
        if (!message.trim() && sendButtonState === 'normal') {
            return {
                state: 'disabled',
                className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                icon: (
                    <svg t="1758800079268" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="6097" width="24" height="24">
                        <path
                            d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                            fill="#9ca3af" // 灰色
                            p-id="6098"
                        ></path>
                    </svg>
                ),
                disabled: true
            };
        }

        // 根据当前状态返回样式
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
                                fill="#9ca3af" // 灰色
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
                            {/* 旋转的环 */}
                            <div
                                className="absolute inset-[-9px] border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>

                            {/* 中间的正方形 */}
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
                            viewBox="0 0 1024 1024"
                            version="1.1"
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

    const chatboxSetup = (data) => {

        // 为每个内置工具的启用状态设置
        const newBuiltinStatus = {};

        // 初始化额外工具状态
        const newExtraStatus = initializeExtraTools(data.extra_tools || []);

        // 工具设置部分

        if (data.builtin_tools) {

            data.builtin_tools.forEach((tool) => {
                newBuiltinStatus[tool.name] = false;
            });
            setTools(data.builtin_tools);
        }

        if (data.extra_tools) {

            // 更新状态
            setToolsStatus(prev => ({
                ...prev,
                builtin_tools: {...prev.builtin_tools, ...newBuiltinStatus},
                extra_tools: {...prev.extra_tools, ...newExtraStatus}
            }));

            setExtraTools(data.extra_tools || []); // 存储配置
        }

        // 聊天框属性设置部分
        if (data.readOnly) {
            setIsReadOnly(Boolean(data.readOnly));
        }

    }

    /*
    * 初始事件与回调
    */
    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    // 加载 JSON 配置
    useEffect(() => {
        if (toolsLoadedStatus === 0) {

            if (CHATBOX_API.trim() === '') {  // 留空则没有多余的工具
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


    /*
     * 广播事件 - 使用单一状态变量
     */
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
                    setToolsLoadedStatus(-1);

                    reply({command: 'Setup-ChatBox', success: true});

                    setTimeout(() => {
                        chatboxSetup(payload.value);
                        setToolsLoadedStatus(2);
                    }, 500)
                    break;
            }

        });
        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, []);

    return (
        <div className="w-full max-w-2xl px-4">

            <div
                className="bg-white rounded-2xl transition-shadow duration-200 ease-in-out hover:shadow-md focus-within:shadow-lg"
            >
                <div className="pt-2 pl-2 pr-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => !isReadOnly && setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (isReadOnly) return; // 只读时不响应按键
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

                    <div className="flex items-center space-x-1">  {/* 修改 space-x-2 为 space-x-1 */}

                        {/* 圆形 "+" 按钮 */}
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                    aria-label={t("拓展工具")}
                                >
                                    <IoMdAdd/>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start" className="bg-white p-1 shadow-lg rounded-md">
                                {extraTools.length > 0 ? (
                                    renderMenuItems(extraTools)
                                ) : (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">无可用工具</div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* 其他左侧按钮（例如搜索按钮） */}
                        <div className="relative">
                            <Transition
                                show={toolsLoadedStatus === 2}
                                enter="transition-opacity duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {/* 使用 Transition.Child 渲染一个 div */}
                                <Transition.Child as="div">
                                    {() => renderToolButtons()}
                                </Transition.Child>
                            </Transition>

                            <Transition
                                show={toolsLoadedStatus === 4}
                                enter="transition-opacity duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => {
                                    setToolsLoadedStatus(0);
                                }}
                            >
                                {/* 使用 Transition.Child 渲染一个 div */}
                                <Transition.Child as="div">
                                    <div className="flex items-center space-x-2 p-1">
                                        <span className="text-red-500 text-sm mb-0.5">加载工具失败</span>
                                        <button
                                            onClick={() => setToolsLoadedStatus(5)}
                                            className="text-blue-500 hover:text-blue-700 text-sm flex items-center cursor-pointer"
                                            aria-label={t("重试加载工具")}
                                        >
                                            <FaRedo className="w-4 h-4 mr-1"/>
                                            重试
                                        </button>
                                    </div>
                                </Transition.Child>
                            </Transition>

                            <Transition
                                show={toolsLoadedStatus === 0}
                                enter="transition-opacity duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => {
                                    if (toolsLoadedStatus === 3) {
                                        setToolsLoadedStatus(4);
                                    } else {
                                        setToolsLoadedStatus(2);
                                    }
                                }}
                            >
                                {/* 同样，使用 Transition.Child 渲染一个 div */}
                                <Transition.Child as="div">
                                    {() => point3Loading()}
                                </Transition.Child>
                            </Transition>
                        </div>


                    </div>


                    {/* 右侧：原有按钮（放大 + 发送） */}
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

            {/* 弹窗遮罩层 */}
            <Transition appear show={isModalOpen} as={Fragment}>
                {/* 遮罩层 - 淡入淡出 */}
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
                        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 bg-black/40`}
                    >
                        <div
                            className={`bg-white rounded-2xl w-full max-w-3xl h-[80vh] p-6 relative
                        transition-all duration-200 ease-out transform`}
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