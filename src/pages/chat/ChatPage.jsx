import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useImmer} from 'use-immer';
import {generateUUID, getMarkId, getLocalSetting} from "@/lib/tools";
import {toast} from "sonner";
import {Transition} from '@headlessui/react';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools";
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {FaArrowDown} from "react-icons/fa";

import {onEvent} from "@/store/useEventStore.jsx";
import ChatBox from "@/components/chat/chatbox.jsx";
import ChatContainer from "@/components/chat/ChatContainer.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";

function ChatPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);
    const [selfMarkId, setSelfMarkId] = useState(getMarkId());
    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isAtBottom, setIsAtBottom] = useState(true); // 新增状态：是否在底部
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

    // 新消息存储结构
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useImmer({});
    const messagesOrderRef = useRef([]);

    // 手动转化初始消息
    useEffect(() => {
        setMessagesOrder(["ID1", "ID2"]);
        setMessages({
                "ID0": {
                    position: null,  // 隐藏消息
                    messages: ["ID1", "ID4"],
                    nextMessage: "ID1"
                },
                "ID4": {
                    prevMessage: "ID0",  // 上一条对话的ID，如果没有是 null
                    position: 'right',   // 属于左边还是右边，右边默认为气泡
                    content: '这个是测试消息',  // 内容
                    name: 'AI Assistant',  // 昵称
                    avatar: '/src/assets/human.jpg',  // 头像
                    messages: [],  // 如果没有是空列表
                    nextMessage: null  // 目前选择的 下一条对话的ID，如果没有是 null
                },
                "ID1": {
                    prevMessage: "ID0",  // 上一条对话的ID，如果没有是 null
                    position: 'right',   // 属于左边还是右边，右边默认为气泡
                    content: '这个是第一条消息',  // 内容
                    name: 'AI Assistant',  // 昵称
                    avatar: '/src/assets/human.jpg',  // 头像
                    messages: ['ID2', 'ID3', 'ID5'],  // 如果没有是空列表
                    nextMessage: 'ID2'  // 目前选择的 下一条对话的ID，如果没有是 null
                },
                "ID2": {
                    prevMessage: "ID1",  // 上一条对话的ID，如果没有是 null
                    position: 'left',   // 属于左边还是右边，右边默认为气泡
                    content: '这个是第二条消息',  // 内容
                    name: 'AI Assistant',  // 昵称
                    avatar: '/src/assets/AI.png',  // 头像
                    messages: [],  // 如果没有是空列表
                    nextMessage: null  // 目前选择的 下一条对话的ID，如果没有是 null
                },
                "ID3": {
                    prevMessage: "ID1",  // 上一条对话的ID，如果没有是 null
                    position: 'left',   // 属于左边还是右边，右边默认为气泡
                    content: '这个是第三条消息',  // 内容
                    name: 'AI Assistant',  // 昵称
                    avatar: '/src/assets/AI.png',  // 头像
                    messages: ['ID6'],  // 如果没有是空列表
                    nextMessage: 'ID6'  // 目前选择的 下一条对话的ID，如果没有是 null
                },
                "ID6": {
                    prevMessage: "ID3",  // 上一条对话的ID，如果没有是 null
                    position: 'left',   // 属于左边还是右边，右边默认为气泡
                    content: '这个????',  // 内容
                    name: 'AI Assistant',  // 昵称
                    avatar: '/src/assets/AI.png',  // 头像
                    messages: [],  // 如果没有是空列表
                    nextMessage: null  // 目前选择的 下一条对话的ID，如果没有是 null
                }

            }
        );
    }, []);

    // 滚动到底部函数 - 直接操作容器 scrollTop
    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
            setIsAtBottom(true);
        }
    }, []);

    // 消息更新时自动滚动逻辑
    useEffect(() => {
        // 只有当用户当前在底部时才自动滚动
        if (isAtBottom && messagesContainerRef.current) {
            scrollToBottom();
        }
    }, [messagesOrder, isAtBottom, scrollToBottom]);

    // 监听消息容器的滚动事件
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            setIsAtBottom(isNearBottom);
            setShowScrollToBottomButton(!isNearBottom);
        };

        // 初始化检查
        handleScroll();

        container.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleFolderDetected = () => {
        toast.error(t("暂不支持整个文件夹上传"));
    };

    const handleDropFiles = (files) => {
        handleSelectedFiles(files);
    };

    const handleSendMessage = (message, toolsStatus, sendButtonState) => {
        console.log('发送消息:', message, toolsStatus, sendButtonState);
    };

    const onAttachmentRemove = (attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
        console.log('移除附件:', attachment);
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
                            prevId: messagesOrder[1]  // 第一项是占位的
                        }
                    })
                    .then(data => {

                        if (data.haveMore) {
                            setMessagesOrder(['<PREV_MORE>', ...data.messagesOrder, ...messagesOrder.slice(1)]);
                        } else {
                            setMessagesOrder([...data.messagesOrder, ...messagesOrder.slice(1)]);
                        }
                        setMessages(prev => ({...prev, ...data.messages}));

                        resolve(true);
                    })
                    .catch(error => reject(error));

            })

        } catch (err) {
            throw err;
        }
    };

    const switchMessage = async (msg, msgId, isNext) => {
        // msg: 消息原数据  isNext: 是否切换到下一个
        const msgId_index = msg.messages.indexOf(msg.nextMessage);
        const newMsgId = msg.messages[msgId_index + (isNext ? 1 : -1)];

        let missMsg = !messages.hasOwnProperty(newMsgId);
        let newOrders = [];  // 后面消息的新链顺序
        let msg_cursor = messages[newMsgId];

        // 寻找链中是否存在所有消息
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

        const sendSwitchRequest = async () => {
            if (getLocalSetting('SyncMessageSwitch', true)) {
                await apiClient.put(apiEndpoint.CHAT_MESSAGES_ENDPOINT,
                    {
                        markId: selfMarkId,
                        msgId: msgId,
                        nextMessage: newMsgId
                    }, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }
        }


        if (missMsg) {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGES_ENDPOINT, {
                    params: {
                        markId: selfMarkId,
                        nextId: missMsg ? newMsgId : msg_cursor.nextMessage,  // 这个是目前开始缺失的ID
                    }
                });
                setMessages(prev => ({...prev, ...data.messages}));
                setMessagesOrder([...messagesOrder.slice(0, messagesOrder.indexOf(msgId) + 1), ...data.messagesOrder]);
                setMessages(draft => {
                    draft[msgId].nextMessage = newMsgId;
                });
                await sendSwitchRequest();
            } catch (error) {
                toast.error(t("load_more_error", {message: error?.message || t("unknown_error")}));
            }
        } else {
            setMessagesOrder([...messagesOrder.slice(0, messagesOrder.indexOf(msgId) + 1), ...newOrders]);
            setMessages(draft => {
                draft[msgId].nextMessage = newMsgId;
            });
            await sendSwitchRequest();
        }
    };

    /* 状态同步 */
    useEffect(() => {
        messagesOrderRef.current = messagesOrder;
    }, [messagesOrder]);

    useEffect(() => {
        const unsubscribe1 = onEvent("widget", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Attachment-Meta":
                    if (payload.value) {
                        setAttachments(payload.value);
                        reply({command: 'Setup-QuickOptions', value: payload.value});
                    } else {
                        reply(attachments);
                    }
                    break;
            }
        });

        const unsubscribe2 = onEvent("message", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Add-Message": // 添加消息源数据
                    if (payload.value && typeof payload.value === 'object' && !Array.isArray(payload.value)) {

                        setMessages(prev => ({...prev, ...payload.value}));
                        reply({command: 'Add-Message', success: true});

                    }
                    break;

                case "MessagesOrder-Meta":  // 设置消息链条
                    if (Array.isArray(payload.value) && payload.value.length > 0) {
                        setMessagesOrder(payload.value);
                        reply({command: 'MessagesOrder-Meta', value: payload.value});
                    } else {
                        reply({command: 'MessagesOrder-Meta', value: messagesOrderRef.current});
                    }
                    break;

                case "Add-MessageContent":  // 添加内容
                    if (payload.value && typeof payload.value === 'object' && !Array.isArray(payload.value)) {
                        setMessages(draft => {
                            for (const [msgId, newContent] of Object.entries(payload.value)) {
                                if (draft[msgId]) {
                                    draft[msgId].content = (draft[msgId].content || '') + (newContent || '');
                                }
                            }
                        });

                        if (payload.reply) reply({command: 'Add-MessageContent', success: true});
                    } else {
                        reply({command: 'Add-MessageContent', success: false});
                    }
                    break;

            }
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };

    }, [attachments, selfMarkId]);

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center pb-8">
                <div className="flex-1 w-full overflow-y-auto px-4 pt-4">
                    <div
                        ref={messagesContainerRef}
                        className="h-full overflow-y-auto pb-20 scroll-smooth"
                        style={{maxHeight: 'calc(100vh - 200px)'}}
                    >
                        <ChatContainer
                            messagesOrder={messagesOrder}
                            messages={messages}
                            onLoadMore={loadMoreHistory}
                            onSwitchMessage={switchMessage}
                        />
                    </div>
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
                        className="cursor-pointer fixed bottom-45 align-middle z-99 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg focus:outline-none transition-colors"
                        aria-label="Scroll to bottom"
                    >
                        <FaArrowDown className="text-gray-500"/>
                    </button>
                </Transition>

                <div className="fixed z-50 bottom-10 left-0 right-0">
                    <ChatBox
                        onSendMessage={handleSendMessage}
                        markId={selfMarkId}
                        attachmentsMeta={attachments}
                        onAttachmentRemove={onAttachmentRemove}
                        uploadFiles={uploadFiles}
                        FilePickerCallback={handleFilePicker}
                        PicPickerCallback={handlePicPicker}
                        onImagePaste={handleImagePaste}
                        onRetryUpload={handleRetryUpload}
                        onCancelUpload={handleCancelUpload}
                        onDropFiles={handleSelectedFiles}
                        onFolderDetected={handleFolderDetected}
                    />
                </div>

                <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                        © {new Date().getFullYear()} lovePikachu. All rights reserved.
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ChatPage;