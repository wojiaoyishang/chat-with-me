import React, {useEffect, useState, useRef, useCallback, useMemo, memo} from 'react';
import { useImmer } from 'use-immer';
import { produce } from 'immer';
import {
    generateUUID,
    getMarkId,
    getLocalSetting,
    updateURL,
    useIsMobile,
    UnifiedErrorScreen,
    UnifiedLoadingScreen
} from "@/lib/tools.jsx";
import { toast } from "sonner";
import { Transition } from '@headlessui/react';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools.jsx";
import { emitEvent, onEvent } from "@/store/useEventStore.jsx";
import { useTranslation } from "react-i18next";
import { ArrowDown, ChevronDown, CircleCheck } from 'lucide-react';
import ChatBox from "@/components/chat/chatbox.jsx";
import MessageContainer from "@/components/chat/MessageContainer.jsx";
import apiClient from "@/lib/apiClient.js";
import { apiEndpoint } from "@/config.js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// ========== 内部组件：模型项 ==========
const ModelItem = memo(({
                            model,
                            isSelected,
                            isMobile,
                            onMouseEnter,
                            onClick,
                            dataSelected
                        }) => {
    const itemContent = useMemo(() => (
        <>
            <Avatar className="h-6 w-6">
                <AvatarImage src={model.avatar} alt={model.name} />
                <AvatarFallback>{model.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-left">
                <p className="font-medium text-sm text-gray-800">{model.name}</p>
                <p className="text-xs text-gray-500 truncate w-40">{model.description}</p>
            </div>
            {isSelected && (
                <CircleCheck className="ml-auto text-[#615CED] h-4 w-4" />
            )}
        </>
    ), [model, isSelected]);

    // 移动端和桌面端渲染方式不同
    if (!isMobile) {
        return (
            <div key={model.id} onMouseEnter={onMouseEnter}>
                <button
                    data-selected={dataSelected}
                    onClick={onClick}
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
                data-selected={dataSelected}
                onClick={onClick}
                className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                    isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                }`}
            >
                {itemContent}
            </button>
        );
    }
}, (prevProps, nextProps) => {
    return (
        prevProps.model.id === nextProps.model.id &&
        prevProps.model.name === nextProps.model.name &&
        prevProps.model.description === nextProps.model.description &&
        prevProps.model.avatar === nextProps.model.avatar &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.onMouseEnter === nextProps.onMouseEnter &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.dataSelected === nextProps.dataSelected
    );
});

ModelItem.displayName = 'ModelItem';

// ========== 内部组件：模型预览卡片 ==========
const ModelPreviewCard = React.memo(({ model, isMobile }) => {
    if (!model) return null;

    return (
        <div className="p-4 bg-gray-50 border rounded-md">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={model.avatar} alt={model.name} />
                        <AvatarFallback>{model.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{model.name}</p>
                        <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1">
                    {model.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.model === nextProps.model &&
        prevProps.isMobile === nextProps.isMobile
    );
});

ModelPreviewCard.displayName = 'ModelPreviewCard';

// ========== Header组件 ==========
const ChatHeader = memo(({
                             models,
                             selectedModel,
                             isModelPopoverOpen,
                             previewModel,
                             isMobile,
                             t,
                             handlePopoverOpenChange,
                             handleModelItemClick,
                             handleModelItemMouseEnter,
                             scrollToSelectedItem
                         }) => {
    const modelListRef = useRef(null);

    // 监听弹窗打开状态和模型列表变化，滚动到选中项
    useEffect(() => {
        if (isModelPopoverOpen) {
            scrollToSelectedItem(modelListRef);
        }
    }, [isModelPopoverOpen, models, scrollToSelectedItem]);

    // 使用useMemo缓存模型列表项的渲染
    const modelItems = useMemo(() => {
        if (!models || models.length === 0) {
            return (
                <p className="text-center text-gray-500 py-4">
                    {t("no_models")}
                </p>
            );
        }

        return models.map((model) => {
            const isSelected = model.id === selectedModel?.id;
            const handleClick = () => handleModelItemClick(model);
            const handleMouseEnter = () => handleModelItemMouseEnter(model);

            return (
                <ModelItem
                    key={model.id}
                    model={model}
                    isSelected={isSelected}
                    isMobile={isMobile}
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    dataSelected={isSelected ? 'true' : 'false'}
                />
            );
        });
    }, [models, isMobile, t, handleModelItemClick, handleModelItemMouseEnter, selectedModel]);

    return (
        <header className="w-full bg-white flex items-center justify-start p-4 h-14">
            {/* 优化后的 Popover 部分 */}
            <Popover
                open={isModelPopoverOpen}
                onOpenChange={handlePopoverOpenChange}
            >
                <PopoverTrigger asChild>
                    <Button variant="ghost"
                            className="justify-start px-0 hover:bg-transparent text-lg cursor-pointer">
                        {selectedModel?.name || t("no_models")}
                        <ChevronDown
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
                            ref={modelListRef}
                            className="space-y-1 max-h-[200px] overflow-y-auto pr-1 pretty-scrollbar"
                        >
                            {modelItems}
                        </div>
                        {/* 名片部分 - 不在滚动区域内 */}
                        {(!isMobile || (isMobile && previewModel)) && (
                            <ModelPreviewCard model={previewModel} isMobile={isMobile} />
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </header>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.models === nextProps.models &&
        prevProps.selectedModel?.id === nextProps.selectedModel?.id &&
        prevProps.isModelPopoverOpen === nextProps.isModelPopoverOpen &&
        prevProps.previewModel?.id === nextProps.previewModel?.id &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.t === nextProps.t &&
        prevProps.handlePopoverOpenChange === nextProps.handlePopoverOpenChange &&
        prevProps.handleModelItemClick === nextProps.handleModelItemClick &&
        prevProps.handleModelItemMouseEnter === nextProps.handleModelItemMouseEnter &&
        prevProps.scrollToSelectedItem === nextProps.scrollToSelectedItem
    );
});

ChatHeader.displayName = 'ChatHeader';

// ========== 主组件 ==========
function ChatPage({ markId, setMarkId }) {
    const { t } = useTranslation();
    const chatPageRef = useRef(null);
    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);
    const [selfMarkId, setSelfMarkId] = [markId, setMarkId];

    const currentMessageSendRequestIDRef = useRef(generateUUID());
    const currentMessagesLoadedRequestIDRef = useRef(generateUUID());

    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [isMessageLoaded, setIsMessageLoaded] = useState(false);
    const [isModelPopoverOpen, setIsModelPopoverOpen] = useState(false);
    const [randomMark, setRandomMark] = useState(null);

    // 消息状态
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesRef = useRef({});
    const messagesOrderRef = useRef([]);
    const isAtBottomRef = useRef(isAtBottom);
    const wasAtBottomRef = useRef(true);
    const [scrollButtonBottom, setScrollButtonBottom] = useState(200);
    const isMobile = useIsMobile();
    const [models, setModels] = useState([]);
    const selectedModelRef = useRef({ name: t("no_models") });
    const [previewModel, setPreviewModel] = useState(null);
    const [isNewMarkId, setIsNewMarkId] = useState(false);
    const isNewMarkIdRef = useRef(false);
    const [isFirstMessageSend, setIsFirstMessageSend] = useState(false);

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
            // 展开时设置当前选中的模型为预览模型
            setPreviewModel(selectedModelRef.current);
        }
    }, []);

    const handleModelItemClick = useCallback((model) => {
        selectedModelRef.current = model;
        if (!isMobile) {
            // 桌面端点击后关闭popover
            setIsModelPopoverOpen(false);
        } else {
            // 移动端点击后只设置预览模型，不关闭popover
            setPreviewModel(model);
        }
    }, [isMobile]);

    const handleModelItemMouseEnter = useCallback((model) => {
        if (!isMobile) {
            setPreviewModel(model); // 桌面端悬停时更新预览
        }
    }, [isMobile]);

    const calculateIsNearBottom = () => {
        if (!messagesContainerRef.current) return true;
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
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

    useEffect(() => {
        isAtBottomRef.current = isAtBottom;
    }, [isAtBottom]);

    // 监听滚动事件
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setIsAtBottom(isNearBottom);
            setShowScrollToBottomButton(!isNearBottom);
        };
        handleScroll();
        container.addEventListener('scroll', handleScroll, { passive: true });
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

    const handleSendMessage = (
        messageContent,
        toolsStatus,
        isEditMessage = false,
        editMessageId,
        attachments,
        sendButtonStatus,
        isRegenerate = false
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
                    payload: {
                        command: "Update-ConversationDate"
                    },
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
                    model: selectedModelRef.current.id,
                    sendButtonStatus: sendButtonStatus,
                    isRegenerate: isRegenerate,
                    requestId: currentMessageSendRequestIDRef.current
                },
                markId: markId
            };
            if (isEditMessage) {
                eventPayload.payload.msgId = editMessageId;
            }
            emitEvent(eventPayload).then((payload, markId, isReply, id, reply) => {
                if (payload.success) {
                    currentMessageSendRequestIDRef.current = generateUUID();
                } else {
                    toast.error(t("send_message_error", {message: payload.value}));
                }
            });
        };

        if (!selfMarkId) {
            emitEvent({
                type: "page",
                target: "ChatPage",
                payload: {
                    command: "Get-MarkId",
                    requestId: currentMessageSendRequestIDRef.current
                }
            })
                .then((payload, markId, isReply, id, reply) => {
                    if (payload.success) {
                        setIsNewMarkId(true);
                        setSelfMarkId(payload.value);
                        updateURL("/chat/" + payload.value);
                        sendMessage(payload.value);
                    } else {
                        throw new Error(payload.value);
                    }
                })
                .catch((error) => {
                    toast.error(t("get_markid_error", {message: error?.message}));
                });
        } else {
            sendMessage(selfMarkId);
        }
    };

    const onAttachmentRemove = (attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
    };

    const handleSelectedFiles = (files, items) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            // 处理文本拖拽
            if (item.kind === 'string' && item.type === 'text/plain') {
                item.getAsString(function (text) {
                    emitEvent({
                        type: "widget",
                        target: "ChatBox",
                        payload: {
                            command: "Get-MessageContent"
                        },
                        markId: selfMarkId,
                        fromWebsocket: true,
                        notReplyToWebsocket: true
                    }).then(payload => {
                        emitEvent({
                            type: "widget",
                            target: "ChatBox",
                            payload: {
                                command: "Set-MessageContent",
                                value: payload.value + text
                            },
                            markId: selfMarkId,
                            fromWebsocket: true
                        })
                    })
                });
            }
        }
        if (!(files && files.length > 0)) {
            return;
        }
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

    const loadMoreHistory = useCallback(async () => {
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

                        // 设置 messages
                        const newMessages = {...messagesRef.current, ...data.messages};
                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        // 设置 messagesOrder
                        let newOrder;
                        if (data.haveMore) {
                            newOrder = ['<PREV_MORE>', ...data.messagesOrder, ...messagesOrder.slice(1)];
                        } else {
                            newOrder = [...data.messagesOrder, ...messagesOrder.slice(1)];
                        }
                        setMessagesOrder(newOrder);
                        messagesOrderRef.current = newOrder;

                        resolve(true);
                    })
                    .catch(error => reject(error));
            });
        } catch (err) {
            throw err;
        }
    }, [selfMarkId]);

    const loadSwitchMessage = useCallback(async (msgId, newMsgId) => {
        if (!messagesRef.current.hasOwnProperty(msgId)) return;
        let missMsg = !messagesRef.current.hasOwnProperty(newMsgId);
        let newOrders = [];
        let msg_cursor = messagesRef.current[newMsgId];
        if (!missMsg) {
            newOrders.push(newMsgId);
            while (msg_cursor.nextMessage) {
                newOrders.push(msg_cursor.nextMessage);
                if (messagesRef.current.hasOwnProperty(msg_cursor.nextMessage)) {
                    msg_cursor = messagesRef.current[msg_cursor.nextMessage];
                } else {
                    missMsg = true;
                    break;
                }
            }
        }
        if (missMsg) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {
                        markId: selfMarkId,
                        nextId: missMsg ? newMsgId : msg_cursor.nextMessage,
                    }
                });
                wasAtBottomRef.current = calculateIsNearBottom();

                // 设置 messages
                const newMessagesFromData = {...messagesRef.current, ...data.messages};
                setMessages(newMessagesFromData);
                messagesRef.current = newMessagesFromData;

                // 设置 messagesOrder
                const newOrderFromData = [...messagesOrderRef.current.slice(0, messagesOrderRef.current.indexOf(msgId) + 1), ...data.messagesOrder];
                setMessagesOrder(newOrderFromData);
                messagesOrderRef.current = newOrderFromData;

                // 设置 messages (nextMessage 更新)
                const newMessagesWithNext = produce(messagesRef.current, draft => {
                    draft[msgId].nextMessage = newMsgId;
                });
                setMessages(newMessagesWithNext);
                messagesRef.current = newMessagesWithNext;

                return true;
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
            }
        } else {
            wasAtBottomRef.current = calculateIsNearBottom();

            // 设置 messagesOrder
            const newOrder = [...messagesOrderRef.current.slice(0, messagesOrderRef.current.indexOf(msgId) + 1), ...newOrders];
            setMessagesOrder(newOrder);
            messagesOrderRef.current = newOrder;

            // 设置 messages (nextMessage 更新)
            const newMessages = produce(messagesRef.current, draft => {
                draft[msgId].nextMessage = newMsgId;
            });
            setMessages(newMessages);
            messagesRef.current = newMessages;

            return true;
        }
    }, [selfMarkId]);

    const switchMessage = async (msg, msgId, isNext) => {
        const msgId_index = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = msg.messages[msgId_index + (isNext ? 1 : -1)];
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
        await loadSwitchMessage(msgId, newMsgId);
        sendSwitchRequest();
    };

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_messages")}
            zIndex="z-20"
        />
    );

    const LoadingFailedScreen = () => (
        <UnifiedErrorScreen
            title={t("load_error")}
            subtitle={t("retry_after_network")}
            zIndex="z-51"
        />
    );

    const emitMessagesLoaded = () => {
        setTimeout(() => {
            setIsMessageLoaded(true);
            emitEvent({
                type: "message",
                target: "ChatPage",
                payload: {
                    command: "Messages-Loaded",
                    requestId: currentMessagesLoadedRequestIDRef.current,
                    messagesOrder: messagesOrderRef.current[0] === '<PREV_MORE>' ? messagesOrderRef.current.slice(1) : messagesOrderRef.current
                },
                markId: selfMarkId,
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
        const unsubscribe1 = onEvent("message", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Add-Message":
                    if (payload.value && typeof payload.value === 'object') {
                        wasAtBottomRef.current = calculateIsNearBottom();

                        // 设置 messages
                        let newMessages = {...messagesRef.current};
                        for (const [key, newValue] of Object.entries(payload.value)) {
                            if (payload.isEdit && !newMessages[key]) {
                                reply({success: false});
                                return;
                            }
                            if (newValue.messages === undefined) {
                                newValue.messages = [];
                            }
                            if (typeof newValue === 'object') {
                                if (newMessages[key] && typeof newMessages[key] === 'object' && newMessages[key] !== null) {
                                    newMessages[key] = {...newMessages[key], ...newValue};
                                } else {
                                    newMessages[key] = newValue;
                                }
                            } else {
                                newMessages[key] = newValue;
                            }
                        }
                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        reply({success: true});
                    }
                    break;
                case "MessagesOrder-Meta":
                    if (Array.isArray(payload.value) && payload.value.length > 0) {
                        // 更新页面滚动条位置
                        setTimeout(() => {
                            wasAtBottomRef.current = calculateIsNearBottom();
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0)

                        // 设置 messagesOrder
                        setMessagesOrder(payload.value);
                        messagesOrderRef.current = payload.value;

                        console.log(payload.value);

                        reply({value: payload.value});
                    } else {
                        reply({value: messagesOrderRef.current});
                    }
                    break;
                case "Set-MessageContent":
                    if (payload.value && typeof payload.value === 'object') {
                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [msgId, newContent] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    draft[msgId].content = newContent || '';
                                }
                            }
                        });
                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        if (payload.reply) reply({success: true});
                    } else {
                        console.error("Set-MessageContent Failed. msgId, value is need at least.")
                        reply({success: false});
                    }
                    break;
                case "Add-MessageContent":
                    if (payload.value && typeof payload.value === 'object') {
                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [msgId, newContent] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    draft[msgId].content = (draft[msgId].content || '') + (newContent || '');
                                }
                            }
                        });
                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        if (payload.reply) reply({success: true});
                    } else {
                        console.error("Add-MessageContent Failed. msgId, value is need at least.")
                        reply({success: false});
                    }
                    break;
                case "Set-MessageReplace":
                    if (payload.value && typeof payload.value === 'object') {
                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [msgId, newReplaces] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    if (!draft[msgId].extraInfo) {
                                        draft[msgId].extraInfo = {};
                                    }
                                    // 获取当前 replace 对象（如果没有则为空对象）
                                    const currentReplace = draft[msgId].extraInfo.replace || {};
                                    // 合并：newReplaces 覆盖 currentReplace
                                    draft[msgId].extraInfo.replace = { ...currentReplace, ...newReplaces };
                                }
                            }
                        });
                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        if (payload.reply) reply({success: true});
                    } else {
                        console.error("Add-MessageReplace Failed. msgId, value is need at least.")
                        reply({success: false});
                    }
                    break;
                case "Add-MessageReplaceContent":
                    if (payload.value && typeof payload.value === 'object') {
                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [msgId, appendFields] of Object.entries(payload. value)) {
                                if (draft[msgId]) {
                                    if (!draft[msgId].extraInfo) {
                                        draft[msgId].extraInfo = {};
                                    }
                                    if (!draft[msgId].extraInfo.replace) {
                                        draft[msgId].extraInfo.replace = {};
                                    }

                                    // 对每个要追加的字段进行 += 操作
                                    for (const [key, appendString] of Object.entries(appendFields)) {
                                        const currentValue = draft[msgId].extraInfo.replace[key] || '';
                                        draft[msgId].extraInfo.replace[key] = currentValue + appendString;
                                    }
                                }
                            }
                        });

                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        if (payload.reply) reply({ success: true });
                    } else {
                        console.error("Add-MessageReplaceContent Failed. payload.value must be an object.");
                        if (payload.reply) reply({ success: false });
                    }
                    break;

                case "Set-MessageAttachments":
                    if (payload.value && typeof payload.value === 'object') {
                        const newMessages = produce(messagesRef.current, draft => {
                            for (const [msgId, newAttachments] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    draft[msgId].attachments = newAttachments;
                                }
                            }
                        });

                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        if (payload.reply) reply({success: true});
                    } else {
                        console.error("Add-MessageReplace Failed. msgId, value is need at least.")
                        reply({success: false});
                    }
                    break;
                case "Add-Message-Messages":
                    if (payload.msgId && payload.value) {
                        if (!messagesRef.current[payload.msgId]) {
                            reply({success: false});
                            return;
                        }
                        if (messagesRef.current[payload.msgId].messages.includes(payload.value)) {
                            reply({success: false});
                            return;
                        }

                        // 设置 messages
                        const newMessages = produce(messagesRef.current, draft => {
                            draft[payload.msgId].messages = [...draft[payload.msgId].messages, payload.value];
                            if (payload.switch) {
                                draft[payload.msgId].nextMessage = payload.value;
                            }
                        });

                        setMessages(newMessages);
                        messagesRef.current = newMessages;

                        setTimeout(() => {
                            if (isAtBottomRef.current) {
                                scrollToBottom();
                            }
                        }, 0);

                        reply({success: true});
                    } else {
                        console.error('Add-Message-Messages Failed. msgId, value is need at least.');
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
                        markId: selfMarkId,
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
                                markId: selfMarkId,
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
            }
        });
        const unsubscribe2 = onEvent("websocket", "onopen", selfMarkId).then(() => {
            if (isMessageLoaded) emitMessagesLoaded();
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, [selfMarkId, isMessageLoaded]);

    useEffect(() => {
        isNewMarkIdRef.current = isNewMarkId;
    }, [isNewMarkId]);

    useEffect(() => {
        if (selfMarkId === null || selfMarkId === undefined) {
            // 设置 messages
            const emptyMessages = {};
            setMessages(emptyMessages);
            messagesRef.current = emptyMessages;

            // 设置 messagesOrder
            const emptyOrder = [];
            setMessagesOrder(emptyOrder);
            messagesOrderRef.current = emptyOrder;
        }
    }, [selfMarkId])

    // 页面初始化加载消息
    useEffect(() => {
        if (isNewMarkIdRef.current) {
            setIsNewMarkId(false);
            return;
        }
        let modelsData = [];
        const requestModels = async () => {
            try {
                modelsData = await apiClient.get(apiEndpoint.CHAT_MODELS_ENDPOINT, {
                    params: markId ? {markId: selfMarkId} : {}
                });
                setModels(modelsData);

                if (modelsData.length > 0) selectedModelRef.current = modelsData[0];
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

                // 设置 messages
                setMessages(messagesData.messages);
                messagesRef.current = messagesData.messages;

                // 设置 messagesOrder
                let initOrder = messagesData.messagesOrder;
                if (messagesData.haveMore) initOrder = ["<PREV_MORE>", ...messagesData.messagesOrder];
                setMessagesOrder(initOrder);
                messagesOrderRef.current = initOrder;

                // 确定该对话使用的模型
                const foundModel = modelsData.find(item => item.id === messagesData.model)
                if (foundModel) selectedModelRef.current = foundModel;

                emitMessagesLoaded();

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
    }, [selfMarkId, randomMark]);

    return (
        <>
            <div className="full-screen-min-height bg-white flex flex-col items-center pb-8 pretty-scrollbar"
                 ref={chatPageRef}>
                <ChatHeader
                    models={models}
                    selectedModel={selectedModelRef.current}
                    isModelPopoverOpen={isModelPopoverOpen}
                    previewModel={previewModel}
                    isMobile={isMobile}
                    t={t}
                    handlePopoverOpenChange={handlePopoverOpenChange}
                    handleModelItemClick={handleModelItemClick}
                    handleModelItemMouseEnter={handleModelItemMouseEnter}
                    scrollToSelectedItem={scrollToSelectedItem}
                />
                <>
                    <div
                        className="flex-1 w-full relative">
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
                            className="cursor-pointer absolute z-10 align-middle w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg focus:outline-none transition-colors -translate-x-1/2"
                            aria-label="Scroll to bottom"
                            style={{
                                bottom: `${scrollButtonBottom}px`,
                                left: '50%',
                            }}
                        >
                            <ArrowDown className="text-gray-500 w-3 h-3"/>
                        </button>
                    </Transition>
                    <div className="absolute z-10 inset-x-0 bottom-10 pointer-events-none">
                        <ChatBox
                            onSendMessage={handleSendMessage}
                            markId={selfMarkId}
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
                            dropTargetRef={chatPageRef}
                        />
                    </div>
                </>
                <footer
                    className="absolute inset-x-0 bottom-0 h-14 bg-white flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                        © {new Date().getFullYear()} lovePikachu. All rights reserved.
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ChatPage;