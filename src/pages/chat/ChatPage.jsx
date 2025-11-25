import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useImmer} from 'use-immer';
import {generateUUID, getMarkId, getLocalSetting, updateURL, useIsMobile} from "@/lib/tools";
import {toast} from "sonner";
import {Transition} from '@headlessui/react';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools";
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {FaArrowDown, FaChevronDown, FaCheckCircle} from "react-icons/fa";
import {onEvent} from "@/store/useEventStore.jsx";
import ChatBox from "@/components/chat/chatbox.jsx";
import MessageContainer from "@/components/chat/MessageContainer.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

function ChatPage({markId, setMarkId}) {
    const {t} = useTranslation();

    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);

    const [selfMarkId, setSelfMarkId] = [markId, setMarkId];
    const selfMarkIdRef = useRef(null);

    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isMessageLoaded, setIsMessageLoaded] = useState(false);
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);

    // 消息状态
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesOrderRef = useRef([]);
    const wasAtBottomRef = useRef(true);

    const [scrollButtonBottom, setScrollButtonBottom] = useState(200);

    const isMobile = useIsMobile();

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(models.length === 0 ? {name: t("no_models")} : models[0]);
    const [previewModel, setPreviewModel] = useState(null);

    const [isNewMarkId, setIsNewMarkId] = useState(false);  // 用于判断是不是请求新请求的 MarkId ，防止页面刷新
    const isNewMarkIdRef = useRef(false);

    const modelListRef = useRef(null);

    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

    const calculateIsNearBottom = () => {
        if (!messagesContainerRef.current) return true;
        const {scrollTop, scrollHeight, clientHeight} = messagesContainerRef.current;
        return scrollHeight - scrollTop - clientHeight < 100;
    };

    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
            setIsAtBottom(true);
        }
    }, []);

    // 自动滚动逻辑
    useEffect(() => {
        if (wasAtBottomRef.current) {
            scrollToBottom();
        }
    }, [messagesOrder, scrollToBottom]);

    // 监听滚动事件
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            setIsAtBottom(isNearBottom);
            setShowScrollToBottomButton(!isNearBottom);
        };

        handleScroll();
        container.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [messagesOrder]);

    const handleFolderDetected = () => {
        toast.error(t("folder_upload_not_supported"));
    };

    const handleDropFiles = (files) => {
        handleSelectedFiles(files);
    };

    const handleSendMessage = (messageContent, toolsStatus, isEditMessage, editMessageId, attachments, sendButtonStatus) => {

        if (uploadFiles.length !== 0) {
            toast.error(t("file_upload_not_complete"));
            return;
        }

        const sendMessage = (markId) => {

            if (isFirstMessageSend) {
                emitEvent(
                    {
                        type: "widget",
                        target: "Sidebar",
                        payload: {
                            command: "Update-ConversationDate"
                        },
                        markId: markId
                    }
                )
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
                    sendButtonStatus: sendButtonStatus
                },
                markId: markId
            };

            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }

            emitEvent(eventPayload);
        }

        if (!selfMarkId) {  // 如果没有 MarkId 就要去请求一个

            emitEvent(
                {
                    type: "page",
                    target: "ChatPage",
                    payload: {
                        command: "Get-MarkId"
                    }
                }
            ).then((payload, markId, isReply, id, reply) => {
                if (payload.success) {
                    setIsNewMarkId(true);
                    setSelfMarkId(payload.value);
                    updateURL("/chat/" + payload.value);
                    sendMessage(payload.value);
                } else {
                    throw payload.value;
                }
            }).catch(error => {
                toast.error(t("get_markid_error", {message: error?.message}))
            });
        } else {
            sendMessage(selfMarkId);
        }


    };

    const onAttachmentRemove = (attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
    };

    const handleSelectedFiles = (files) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const newUploadFiles = processSelectedFiles(files);
        if (newUploadFiles.length === 0) {
            isProcessingRef.current = false;
            return;
        }

        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx].progress = progress;
                    return updated;
                });
            };

            const handleComplete = (uploadId, attachment) => {
                setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                setAttachments(prev => [...prev, attachment]);
            };

            const cleanup = fileUpload(
                uploadFile,
                handleProgressUpdate,
                handleComplete,
                (error) => {
                    toast.error(t("file_upload.error", {message: error?.message || 'Upload failed'}));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
                    );
                }
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });

        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    };

    const handleImagePaste = (file) => {
        const fileList = {
            0: file,
            length: 1,
            item: (index) => (index === 0 ? file : null),
            [Symbol.iterator]: function* () {
                yield file;
            }
        };
        handleSelectedFiles(fileList);
    };

    const handleRetryUpload = (uploadId) => {
        setUploadFiles(prev => {
            const fileToRetry = prev.find(f => f.id === uploadId);
            if (!fileToRetry || !fileToRetry.file) return prev;

            const updatedFile = {
                ...fileToRetry,
                progress: 0,
                error: null
            };

            const handleProgressUpdate = (id, progress) => {
                setUploadFiles(p => p.map(f => f.id === id ? {...f, progress} : f));
            };
            const handleComplete = (id, attachment) => {
                setUploadFiles(p => p.filter(f => f.id !== id));
                setAttachments(p => [...p, attachment]);
            };
            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || t("unknown_error")}));
                setUploadFiles(p => p.map(f => f.id === uploadId ? {...f, error: true, progress: 0} : f));
            };

            const cleanup = fileUpload(
                updatedFile,
                handleProgressUpdate,
                handleComplete,
                handleError
            );
            uploadIntervals.current.set(uploadId, cleanup);

            return prev.map(f => f.id === uploadId ? updatedFile : f);
        });
    };

    const handleCancelUpload = (uploadId) => {
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    };

    const handleFilePicker = createFilePicker('*', handleSelectedFiles);
    const handlePicPicker = createFilePicker('image/*', handleSelectedFiles);

    const loadMoreHistory = async () => {
        try {
            return new Promise((resolve, reject) => {
                apiClient
                    .get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                        params: {
                            markId: selfMarkId,
                            prevId: messagesOrder[1]
                        }
                    })
                    .then(data => {
                        wasAtBottomRef.current = calculateIsNearBottom();
                        if (data.haveMore) {
                            setMessagesOrder(['<PREV_MORE>', ...data.messagesOrder, ...messagesOrder.slice(1)]);
                        } else {
                            setMessagesOrder([...data.messagesOrder, ...messagesOrder.slice(1)]);
                        }
                        setMessages(prev => ({...prev, ...data.messages}));
                        resolve(true);
                    })
                    .catch(error => reject(error));
            });
        } catch (err) {
            throw err;
        }
    };

    const switchMessage = async (msg, msgId, isNext) => {
        const msgId_index = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = msg.messages[msgId_index + (isNext ? 1 : -1)];

        let missMsg = !messages.hasOwnProperty(newMsgId);
        let newOrders = [];
        let msg_cursor = messages[newMsgId];

        if (!missMsg) {
            newOrders.push(newMsgId);
            while (msg_cursor.nextMessage) {
                newOrders.push(msg_cursor.nextMessage);
                if (messages.hasOwnProperty(msg_cursor.nextMessage)) {
                    msg_cursor = messages[msg_cursor.nextMessage];
                } else {
                    missMsg = true;
                    break;
                }
            }
        }

        const sendSwitchRequest = () => {
            if (getLocalSetting('SyncMessageSwitch', true)) {
                emitEvent({
                    type: "message",
                    target: "ChatPage",
                    payload: {
                        command: "Switch-Message",
                        msgId,
                        nextMessage: newMsgId
                    },
                    markId: selfMarkId
                });
            }
        };

        if (missMsg) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {
                        markId: selfMarkId,
                        nextId: missMsg ? newMsgId : msg_cursor.nextMessage,
                    }
                });
                wasAtBottomRef.current = calculateIsNearBottom();
                setMessages(prev => ({...prev, ...data.messages}));
                setMessagesOrder([...messagesOrder.slice(0, messagesOrder.indexOf(msgId) + 1), ...data.messagesOrder]);
                setMessages(draft => {
                    draft[msgId].nextMessage = newMsgId;
                });
                sendSwitchRequest();
                return true;
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
            }
        } else {
            wasAtBottomRef.current = calculateIsNearBottom();
            setMessagesOrder([...messagesOrder.slice(0, messagesOrder.indexOf(msgId) + 1), ...newOrders]);
            setMessages(draft => {
                draft[msgId].nextMessage = newMsgId;
            });
            sendSwitchRequest();
            return true;
        }
    };

    const LoadingScreen = () => (
        <div
            className="absolute z-51 inset-0 bg-white flex items-center justify-center"> {/* Changed fixed to absolute */}
            <div className="flex flex-col items-center">
                <ThreeDotLoading/>
                <span className="mt-2 text-sm text-gray-500">{t("loading_messages")}</span>
            </div>
        </div>
    );

    const LoadingFailedScreen = () => (
        <div
            className="absolute z-51 inset-0 bg-white flex items-center justify-center"> {/* Changed fixed to absolute */}
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <p className="text-gray-700 text-base font-medium">{t("load_error")}</p>
                <p className="text-gray-500 text-sm mt-1">{t("retry_after_network")}</p>
            </div>
        </div>
    );

    /* 状态同步 */
    useEffect(() => {
        messagesOrderRef.current = messagesOrder;
    }, [messagesOrder]);

    useEffect(() => {

        const unsubscribe1 = onEvent("message", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Add-Message":
                    if (payload.value && typeof payload.value === 'object') {
                        wasAtBottomRef.current = calculateIsNearBottom();

                        setMessages(prev => {
                            const updated = {...prev};
                            for (const [key, newValue] of Object.entries(payload.value)) {
                                if (newValue.messages === undefined) { newValue.messages = []; }
                                if (typeof newValue === 'object') {
                                    if (updated[key] && typeof updated[key] === 'object' && updated[key] !== null) {
                                        updated[key] = {...updated[key], ...newValue};
                                    } else {
                                        updated[key] = newValue;
                                    }
                                } else {
                                    updated[key] = newValue;
                                }
                            }
                            return updated;
                        });

                        reply({success: true});
                    }
                    break;

                case "MessagesOrder-Meta":
                    if (Array.isArray(payload.value) && payload.value.length > 0) {
                        wasAtBottomRef.current = calculateIsNearBottom();
                        setMessagesOrder(payload.value);
                        messagesOrderRef.current = payload.value;
                        reply({value: payload.value});
                    } else {
                        reply({value: messagesOrderRef.current});
                    }
                    break;

                case "Add-MessageContent":
                    if (payload.value && typeof payload.value === 'object') {
                        wasAtBottomRef.current = calculateIsNearBottom();
                        setMessages(draft => {
                            for (const [msgId, newContent] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    draft[msgId].content = (draft[msgId].content || '') + (newContent || '');
                                }
                            }
                        });
                        if (payload.reply) reply({success: true});
                    } else {
                        reply({success: false});
                    }
                    break;

                case "Add-Message-Messages":
                    if (payload.msgId && payload.value) {
                        setMessages(draft => {
                            if (draft[payload.msgId] === undefined) {
                                reply({success: false});
                                return;
                            }
                            draft[payload.msgId].messages = [...draft[payload.msgId].messages, payload.value];
                            if (payload.switch) {
                                draft[payload.msgId].nextMessage = payload.value;
                            }
                            reply({success: true});
                        });

                    }
                    break;

            }
        });

        const unsubscribe2 = onEvent("websocket", "onopen", selfMarkId).then(() => {
            if (isMessageLoaded) {
                emitEvent({
                    type: "message",
                    target: "ChatPage",
                    payload: {command: "Messages-Loaded"},
                    markId: selfMarkId
                });
            }
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, [attachments, selfMarkId, isMessageLoaded]);

    useEffect(() => {
        isNewMarkIdRef.current = isNewMarkId;
    }, [isNewMarkId]);

    useEffect(() => {
        selfMarkIdRef.current = selfMarkId;

        if (selfMarkId === null || selfMarkId === undefined) {
            setMessages({});
            setMessagesOrder([]);
        }

    }, [selfMarkId])

    // 页面初始化加载消息
    useEffect(() => {

        if (isNewMarkIdRef.current) {
            setIsNewMarkId(false);  // 如果是新获得 MarkId 的跳过一次加载
            return;
        }

        let modelsData = [];

        const requestModels = async () => {
            try {
                // 先请求模型
                modelsData = await apiClient.get(apiEndpoint.CHAT_MODELS_ENDPOINT, {
                    params: markId ? {markId: selfMarkId} : {}
                });
                setModels(modelsData);
                setSelectedModel(modelsData[0]);
            } catch (error) {
                toast.error(t("load_models_error", {message: error?.message || t("unknown_error")}));
            }
        };

        const requestMessages = async () => {

            try {
                const messagesData = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {markId: selfMarkId}
                });
                wasAtBottomRef.current = calculateIsNearBottom();
                setMessages(messagesData.messages);
                setMessagesOrder(messagesData.messagesOrder);
                setIsMessageLoaded(true);

                // 确定该对话使用的模型
                const foundModel = modelsData.find(item => item.id === messagesData.model)
                if (foundModel) setSelectedModel(foundModel);

                emitEvent({
                    type: "message",
                    target: "ChatPage",
                    payload: {command: "Messages-Loaded"},
                    markId: selfMarkId
                });
            } catch (error) {
                toast(t("load_messages_error", {message: error?.message || t("unknown_error")}), {
                    action: {
                        label: t("retry"),
                        onClick: () => {
                            setIsLoading(true);
                            setIsLoadingError(false);
                            loadData();
                        },
                    },
                    closeButton: false,
                    dismissible: false,
                    duration: Infinity,
                });
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
            }
        };

        const loadData = async () => {
            setIsLoading(true);
            await requestModels();
            await requestMessages();
        };

        if (selfMarkId) {
            loadData();
        } else {
            requestModels();
        }

        setIsFirstMessageSend(true);

    }, [selfMarkId]);

    useEffect(() => {
        const scrollToSelectedItem = () => {
            if (modelListRef.current) {
                const selectedItem = modelListRef.current.querySelector('[data-selected="true"]');
                if (selectedItem) {
                    // 使用 setTimeout 确保 DOM 已经更新
                    setTimeout(() => {
                        selectedItem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            // 如果元素已经在可视区域内，强制滚动到顶部
                            // block: 'center' // 或者使用 'center' 来居中显示
                        });
                    }, 0);
                }
            }
        };

        // 在弹窗打开时滚动
        if (isModelPopoverOpen) {
            scrollToSelectedItem();
        }

        // 同时在模型列表变化时也滚动（添加 models 依赖）
    }, [isModelPopoverOpen, models, selectedModel]);

    return (
        <>
            <div className="full-screen-min-height bg-white flex flex-col items-center pb-8 pretty-scrollbar">
                <header className="w-full bg-white flex items-center justify-start p-4 h-14">
                    <Popover
                        open={isModelPopoverOpen}
                        onOpenChange={(open) => {
                            setIsModelPopoverOpen(open);
                            if (!open) {
                                setPreviewModel(null);
                            } else {
                                // 展开时设置当前选中的模型为预览模型
                                setPreviewModel(selectedModel);
                                // 添加延迟确保 DOM 更新后再滚动
                                setTimeout(() => {
                                    const selectedItem = modelListRef.current?.querySelector('[data-selected="true"]');
                                    if (selectedItem) {
                                        selectedItem.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'nearest',
                                        });
                                    }
                                }, 100);
                            }
                        }}
                    >
                        <PopoverTrigger asChild>
                            <Button variant="ghost"
                                    className="justify-start px-0 hover:bg-transparent text-lg cursor-pointer">
                                {selectedModel.name}
                                <FaChevronDown
                                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${isModelPopoverOpen ? 'rotate-180' : ''}`}/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className={isMobile ? "w-[90vw] max-w-md p-4" : "w-85"}
                        >
                            <div className="flex flex-col space-y-4">
                                {/* 模型列表容器 - 添加滚动 */}
                                <div
                                    ref={modelListRef}  // Add this ref
                                    className="space-y-1 max-h-[200px] overflow-y-auto pr-1 pretty-scrollbar"
                                >
                                    {models.length === 0 ? (
                                        <p className="text-center text-gray-500 py-4">{t("no_models")}</p>
                                    ) : (
                                        models.map((model) => {
                                            const isSelected = model.id === selectedModel.id;
                                            const handleClick = () => {
                                                setSelectedModel(model);
                                                if (!isMobile) {
                                                    // 桌面端点击后关闭popover
                                                    setIsModelPopoverOpen(false);
                                                } else {
                                                    // 移动端点击后只设置预览模型，不关闭popover
                                                    setPreviewModel(model);
                                                }
                                            };

                                            const handleMouseEnter = () => {
                                                if (!isMobile) {
                                                    setPreviewModel(model); // 桌面端悬停时更新预览
                                                }
                                            };

                                            const itemContent = (
                                                <>
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={model.avatar} alt={model.name}/>
                                                        <AvatarFallback>{model.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-2 text-left">
                                                        <p className="font-medium text-sm text-gray-800">{model.name}</p>
                                                        <p className="text-xs text-gray-500 truncate w-40">{model.description}</p>
                                                    </div>
                                                    {isSelected && (
                                                        <FaCheckCircle className="ml-auto text-[#615CED] h-4 w-4"/>
                                                    )}
                                                </>
                                            );

                                            if (!isMobile) {
                                                return (
                                                    <div key={model.id} onMouseEnter={handleMouseEnter}>
                                                        <button
                                                            data-selected={isSelected ? 'true' : 'false'}  // Add this for querying
                                                            onClick={handleClick}
                                                            className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                                                                isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            {itemContent}
                                                        </button>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <button
                                                        key={model.id}
                                                        data-selected={isSelected ? 'true' : 'false'}  // Add this for querying
                                                        onClick={handleClick}
                                                        className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                                                            isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {itemContent}
                                                    </button>
                                                );
                                            }
                                        })
                                    )}
                                </div>

                                {/* 名片部分 - 不在滚动区域内 */}
                                {(!isMobile || (isMobile && previewModel)) && previewModel && (
                                    <div className="p-4 bg-gray-50 border rounded-md">
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={previewModel.avatar} alt={previewModel.name}/>
                                                    <AvatarFallback>{previewModel.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">{previewModel.name}</p>
                                                    <p className="text-xs text-gray-500">{previewModel.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {previewModel.tags.map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </header>

                <>
                    <div
                        className="flex-1 w-full overflow-y-auto relative">  {/* 添加 relative 以作为叠加层的定位参考 */}
                        <div
                            ref={messagesContainerRef}
                            className="h-full overflow-y-auto pb-20 scroll-smooth"
                            style={{maxHeight: 'calc(120vh - 256px)'}}
                        >
                            <MessageContainer
                                key={selfMarkId}
                                messagesOrder={messagesOrder}
                                messages={messages}
                                onLoadMore={loadMoreHistory}
                                onSwitchMessage={switchMessage}
                                markId={selfMarkId}
                            />
                        </div>

                        {/* 叠加 loading 屏幕 */}
                        {isLoading && <LoadingScreen/>}

                        {/* 叠加 error 屏幕 */}
                        {isLoadingError && <LoadingFailedScreen/>}
                    </div>

                    <Transition
                        show={showScrollToBottomButton}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <button
                            onClick={scrollToBottom}
                            className="cursor-pointer absolute z-50 align-middle w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg focus:outline-none transition-colors -translate-x-1/2"
                            aria-label="Scroll to bottom"
                            style={{
                                bottom: `${scrollButtonBottom}px`,
                                left: '50%',
                            }}
                        >
                            <FaArrowDown className="text-gray-500 w-3 h-3"/>
                        </button>
                    </Transition>

                    <div className="absolute z-10 inset-x-0 bottom-10">
                        <ChatBox
                            onSendMessage={handleSendMessage}
                            markIdRef={selfMarkIdRef}
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
                            onHeightChange={(newHeight) => {
                                setScrollButtonBottom(newHeight + 45);
                            }}
                        />
                    </div>
                </>

                <footer
                    className="absolute inset-x-0 bottom-0 h-12 bg-white flex items-center justify-center"> {/* Changed fixed to absolute; left-0 right-0 to inset-x-0 */}
                    <span className="text-xs text-gray-500">
                        © {new Date().getFullYear()} lovePikachu. All rights reserved.
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ChatPage;